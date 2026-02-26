import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import StarCheckbox from "../layout/StarIcon.jsx";
import { authFetch } from "../../utils/authFetch.js";

export default function ViewAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  // Modal state
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [modalType, setModalType] = useState(""); // "edit" or "delete"
  const [editForm, setEditForm] = useState({
    accountName: "",
    accountType: "",
    subAccountType: "",
    LedgerRef: ""
  });

  // Options from backend
  const [accountTypeOptions, setAccountTypeOptions] = useState([]);
  const [subAccountTypeOptions, setSubAccountTypeOptions] = useState([]);

  const safeDisplay = (value, isDate = false) => {
    if (!value) return "-";
    if (isDate) {
      const dateObj = new Date(value);
      return isNaN(dateObj) ? "-" : dateObj.toLocaleDateString();
    }
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  // Fetch accounts on mount
  useEffect(() => {
    const fetchAccounts = async () => {
      try {

        const res = await authFetch(`${API_BASE_URL}/accounts`);
        const data = await res.json();
        if (res.ok) {
          setAccounts(data);
          setFilteredAccounts(data);
        } else {
          setNotificationMessage("Failed to fetch accounts.");
          setNotificationType("error");
        }
      } catch (error) {
        console.error(error);
        setNotificationMessage("Server error while fetching accounts.");
        setNotificationType("error");
      } finally {
        setLoading(false);
      }
    };

    // Fetch account type options from backend
    const fetchAccountOptions = async () => {
      try {
        const res = await authFetch(
          `${API_BASE_URL}/update-account/${selectedAccount._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editForm),
          }
        );
        const data = await res.json();
        setAccountTypeOptions(data.accountTypes);
      } catch (error) {
        console.error("Error fetching account type options:", error);
      }
    };

    fetchAccounts();
    fetchAccountOptions();
  }, []);

  // Update subAccountType options when accountType changes
  useEffect(() => {
    if (editForm.accountType && accountTypeOptions.length) {
      const selected = accountTypeOptions.find(
        (opt) => opt.type === editForm.accountType
      );
      setSubAccountTypeOptions(selected?.subTypes || []);
      if (!selected?.subTypes.includes(editForm.subAccountType)) {
        setEditForm((prev) => ({ ...prev, subAccountType: "" }));
      }
    }
  }, [editForm.accountType, accountTypeOptions]);

  // Filtering accounts
  useEffect(() => {
    let tempAccounts = [...accounts];
    if (filterType) tempAccounts = tempAccounts.filter(acc => acc.accountType === filterType);
    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      tempAccounts = tempAccounts.filter(acc =>
        Object.values(acc).some(val =>
          safeDisplay(val).toLowerCase().includes(lowerSearch)
        )
      );
    }
    setFilteredAccounts(tempAccounts);
  }, [filterType, searchText, accounts]);

  const openModal = (account, type) => {
    setSelectedAccount(account);
    setModalType(type);
    if (type === "edit") {
      setEditForm({
        accountName: account.accountName,
        accountType: account.accountType,
        subAccountType: account.subAccountType,
        LedgerRef: account.LedgerRef,
      });
    }
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/update-account/${selectedAccount._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (data.success) {
        setNotificationMessage("Account updated successfully!");
        setNotificationType("success");
        setAccounts(accounts.map(acc => acc._id === selectedAccount._id ? { ...acc, ...editForm } : acc));
        setModalType("");
      } else {
        setNotificationMessage(data.message || "Failed to update account");
        setNotificationType("error");
      }
    } catch (error) {
      console.error(error);
      setNotificationMessage("Server error while updating account");
      setNotificationType("error");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await authFetch(
        `${API_BASE_URL}/delete-account/${selectedAccount._id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (data.success) {
        setNotificationMessage("Account deleted successfully!");
        setNotificationType("success");
        setAccounts(accounts.filter(acc => acc._id !== selectedAccount._id));
        setModalType("");
      } else {
        setNotificationMessage(data.message || "Failed to delete account");
        setNotificationType("error");
      }
    } catch (error) {
      console.error(error);
      setNotificationMessage("Server error while deleting account");
      setNotificationType("error");
    }
  };

  const handleToggleStar = async (accountId) => {
    try {
      const res = await authFetch(
        `${API_BASE_URL}/accounts/${accountId}/star`,
        { method: "PATCH" }
      );
      const data = await res.json();
      if (data.success) {
        setAccounts(accounts.map(acc =>
          acc._id === accountId ? { ...acc, starred: data.starred } : acc
        ));
        setNotificationMessage(
          data.starred ? "Account starred!" : "Account unstarred!"
        );
        setNotificationType("success");
      } else {
        setNotificationMessage("Failed to update starred status");
        setNotificationType("error");
      }
    } catch (error) {
      console.error(error);
      setNotificationMessage("Server error while updating starred status");
      setNotificationType("error");
    }
  };


  return (
    <>
      <SidebarLayout>
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <h2 className="text-3xl font-bold text-gray-800">Accounts Overview</h2>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-2 md:space-y-0">
            <div className="flex items-center space-x-3">
              <label className="font-semibold text-gray-700">Filter by Type:</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="Assets">Assets</option>
                <option value="Liabilities">Liabilities</option>
                <option value="Equity">Equity</option>
                <option value="Expense">Expense</option>
                <option value="Revenue">Revenue</option>
              </select>
            </div>
            <div className="flex items-center space-x-3">
              <label className="font-semibold text-gray-700">Search:</label>
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Table or preview loader */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          {loading ? (
            /* In-page preview skeleton: table layout only */
            <div className="animate-pulse" aria-hidden="true">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                    <th className="py-3 px-5 border-b">Auto ID</th>
                    <th className="py-3 px-5 border-b">Ledger Ref</th>
                    <th className="py-3 px-5 border-b">Account Type</th>
                    <th className="py-3 px-5 border-b">Sub Account Type</th>
                    <th className="py-3 px-5 border-b">Account Name</th>
                    <th className="py-3 px-5 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <tr key={i} className="border-b last:border-none">
                      <td className="py-3 px-5"><span className="inline-block h-5 w-12 bg-gray-200 rounded" /></td>
                      <td className="py-3 px-5"><span className="inline-block h-5 w-16 bg-gray-200 rounded" /></td>
                      <td className="py-3 px-5"><span className="inline-block h-5 w-20 bg-gray-200 rounded" /></td>
                      <td className="py-3 px-5"><span className="inline-block h-5 w-24 bg-gray-200 rounded" /></td>
                      <td className="py-3 px-5"><span className="inline-block h-5 w-36 bg-gray-200 rounded" /></td>
                      <td className="py-3 px-5 flex gap-2">
                        <span className="inline-block h-8 w-12 bg-gray-200 rounded" />
                        <span className="inline-block h-8 w-14 bg-gray-200 rounded" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : filteredAccounts.length === 0 ? (
            <p className="text-center py-6 text-gray-600">No accounts found.</p>
          ) : (
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                  <th className="py-3 px-5 border-b">Auto ID</th>
                  <th className="py-3 px-5 border-b">Ledger Ref</th>
                  <th className="py-3 px-5 border-b">Account Type</th>
                  <th className="py-3 px-5 border-b">Sub Account Type</th>
                  <th className="py-3 px-5 border-b">Account Name</th>
                  <th className="py-3 px-5 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((acc) => (
                  <tr key={acc._id} className="hover:bg-gray-50 transition border-b last:border-none">
                    <td className="py-3 px-5 font-semibold">{safeDisplay(acc.autoAccountId)}</td>
                    <td className="py-3 px-5">{safeDisplay(acc.LedgerRef)}</td>
                    <td className="py-3 px-5">{safeDisplay(acc.accountType)}</td>
                    <td className="py-3 px-5">{safeDisplay(acc.subAccountType)}</td>
                    <td className="py-3 px-5 font-medium">{safeDisplay(acc.accountName)}</td>
                    <td className="py-3 px-5">
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                        onClick={() => openModal(acc, "edit")}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => openModal(acc, "delete")}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Popup Modal */}
        {modalType && selectedAccount && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg z-50 w-96">
            {modalType === "edit" ? (
              <>
                <h3 className="text-xl font-bold mb-4">Edit Account</h3>
                <div className="flex flex-col space-y-3">
                  <input
                    type="text"
                    name="accountName"
                    placeholder="Account Name"
                    value={editForm.accountName}
                    onChange={handleEditChange}
                    className="border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                  />

                  <input
                    type="text"
                    name="LedgerRef"
                    placeholder="Ledger Ref"
                    value={editForm.LedgerRef}
                    onChange={handleEditChange}
                    className="border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                  />

                  <select
                    name="accountType"
                    value={editForm.accountType}
                    onChange={handleEditChange}
                    className="border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Account Type</option>
                    {accountTypeOptions.map(opt => (
                      <option key={opt.type} value={opt.type}>{opt.type}</option>
                    ))}
                  </select>

                  <select
                    name="subAccountType"
                    value={editForm.subAccountType}
                    onChange={handleEditChange}
                    className="border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Sub Account Type</option>
                    {subAccountTypeOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>

                  {/* ⭐ Favorite inside modal */}
                  <div className="flex items-center space-x-2">
                    <label className="font-semibold text-gray-700">Favorite:</label>
                    <StarCheckbox
                      checked={selectedAccount.starred}
                      onChange={async () => {
                        await handleToggleStar(selectedAccount._id);
                        setSelectedAccount(prev => ({ ...prev, starred: !prev.starred }));
                      }}
                    />
                  </div>

                  <div className="flex justify-end space-x-2 mt-3">
                    <button
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      onClick={() => setModalType("")}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-4 text-red-600">Delete Account</h3>
                <p>Are you sure you want to delete <strong>{selectedAccount.accountName}</strong>?</p>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => setModalType("")}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        )}

      </SidebarLayout>

      <Notification message={notificationMessage} type={notificationType} />
    </>
  );
}
