import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import JournalNav from "../layout/JournalTopNav.jsx";
import { authFetch } from "../../utils/authFetch.js";

export default function ViewGeneralEntries() {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [filters, setFilters] = useState({ startDate: "", endDate: "", account: "" });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "info" });
  const [editingEntry, setEditingEntry] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteModal, setDeleteModal] = useState({ open: false, entryId: null });
  const [editDebitSearch, setEditDebitSearch] = useState("");
  const [editCreditSearch, setEditCreditSearch] = useState({}); // { [index]: "search text" }
  const [editCreditActiveIndexes, setEditCreditActiveIndexes] = useState({}); // for keyboard navigation
  const [editDebitDropdownOpen, setEditDebitDropdownOpen] = useState(false);
  const [editCreditDropdownOpen, setEditCreditDropdownOpen] = useState({}); // { [index]: true/false }

  const filterAccounts = (query) =>
    accounts.filter(
      (a) =>
        a.accountName.toLowerCase().includes(query.toLowerCase()) ||
        a.accountType.toLowerCase().includes(query.toLowerCase())
    );



  const safeJsonParse = async (res) => {
    try {
      const text = await res.text();
      return text ? JSON.parse(text) : {};
    } catch {
      return null;
    }
  };

  const fetchEntries = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/get-journal-entries`);
      const data = await safeJsonParse(res);

      if (!res.ok) throw new Error(data?.message || "Failed to fetch entries");

      setEntries(data);
      setFilteredEntries(data);
    } catch (err) {
      setNotification({ message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchAccounts = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/accounts`);
      const data = await safeJsonParse(res);

      if (!Array.isArray(data)) throw new Error("Failed to fetch accounts");

      setAccounts(data);
    } catch {
      setNotification({ message: "Error fetching accounts", type: "error" });
    }
  };
  useEffect(() => {
    fetchEntries();
    fetchAccounts();
  }, []);

  useEffect(() => {
    let temp = [...entries];
    if (filters.startDate)
      temp = temp.filter(e => new Date(e.entryDate) >= new Date(filters.startDate));

    if (filters.endDate)
      temp = temp.filter(e => new Date(e.entryDate) <= new Date(filters.endDate));

    if (filters.account) {
      const search = filters.account.toLowerCase();
      temp = temp.filter(e => {
        const debitName = typeof e.debitAccount === "string" ? e.debitAccount : e.debitAccount?.accountName || "";
        const creditMatch = e.creditEntries?.some(c => {
          const creditName = typeof c.account === "string" ? c.account : c.account?.accountName || "";
          return creditName.toLowerCase().includes(search);
        });
        return debitName.toLowerCase().includes(search) || creditMatch;
      });
    }
    setFilteredEntries(temp);
  }, [entries, filters]);


  const confirmDelete = (id) => {
    setDeleteModal({ open: true, entryId: id });
  };

  const safeDate = (val) => {
    if (!val) return "-";
    const d = new Date(val);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
  };
  useEffect(() => {
    if (editingEntry) {
      setEditForm({
        debitAccount: editingEntry.debitAccount?._id || editingEntry.debitAccount || "",
        debitAmount: editingEntry.debitAmount || 0,
        debitLineDesc: editingEntry.debitLineDesc || "", // NEW
        creditEntries: editingEntry.creditEntries?.map(c => ({
          account: c.account?._id || c.account || "",
          amount: c.amount || 0,
          description: c.description || "" // NEW
        })) || [],
        entryDate: editingEntry.entryDate?.split("T")[0] || "",
        comments: editingEntry.comments || ""
      });
    }
  }, [editingEntry]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".relative")) {
        setEditDebitDropdownOpen(false);
        setEditCreditDropdownOpen({});
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);



  return (
    <SidebarLayout>
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg border">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Confirm Delete</h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete this journal entry? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal({ open: false, entryId: null })}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    const res = await authFetch(
                      `${API_BASE_URL}/delete-journal-entry/${deleteModal.entryId}`,
                      { method: "DELETE" }
                    );
                    const data = await safeJsonParse(res);
                    if (!res.ok) throw new Error(data?.message || "Delete failed");

                    setEntries(prev => prev.filter(e => e._id !== deleteModal.entryId));
                    setFilteredEntries(prev => prev.filter(e => e._id !== deleteModal.entryId));
                    setNotification({ message: "Entry deleted successfully!", type: "success" });
                  } catch (err) {
                    setNotification({ message: err.message, type: "error" });
                  } finally {
                    setDeleteModal({ open: false, entryId: null });
                  }
                }}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {editingEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="bg-white w-full max-w-4xl p-6 rounded-xl shadow-lg border max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-center">Edit Journal Entry</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Entry Date */}
              <div>
                <label className="font-semibold text-gray-700">Date</label>
                <input
                  type="date"
                  value={editForm.entryDate}
                  onChange={(e) => setEditForm({ ...editForm, entryDate: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                />
              </div>

              {/* Comments */}
              <div>
                <label className="font-semibold text-gray-700">Comments</label>
                <input
                  type="text"
                  value={editForm.comments}
                  onChange={(e) => setEditForm({ ...editForm, comments: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                />
              </div>

              {/* Debit Account */}
              <div className="relative">
                <label className="font-semibold text-gray-700">Debit Account</label>
                <div
                  className="border border-gray-300 rounded-lg px-3 py-2 bg-white cursor-pointer flex justify-between items-center"
                  onClick={() => setEditDebitDropdownOpen((prev) => !prev)}
                >
                  <span>
                    {accounts.find(a => a._id === editForm.debitAccount)?.accountName || "Select account"}
                  </span>
                  <span className="text-gray-400">&#9662;</span>
                </div>

                {editDebitDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <input
                      type="text"
                      placeholder="Search account..."
                      value={editDebitSearch}
                      onChange={(e) => setEditDebitSearch(e.target.value)}
                      className="w-full border-b px-3 py-2 focus:outline-none"
                    />
                    {filterAccounts(editDebitSearch).map((a) => (
                      <div
                        key={a._id}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                        onClick={() => {
                          setEditForm({ ...editForm, debitAccount: a._id });
                          setEditDebitDropdownOpen(false);
                          setEditDebitSearch("");
                        }}
                      >
                        {a.accountName} ({a.accountType})
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Debit Amount */}
              <div>
                <label className="font-semibold text-gray-700">Debit Amount</label>
                <input
                  type="number"
                  value={editForm.debitAmount}
                  onChange={(e) => setEditForm({ ...editForm, debitAmount: Number(e.target.value) })}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                />
              </div>

              {/* Debit Description */}
              <div className="md:col-span-2">
                <label className="font-semibold text-gray-700">Debit Description</label>
                <input
                  type="text"
                  value={editForm.debitLineDesc}
                  onChange={(e) => setEditForm({ ...editForm, debitLineDesc: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                />
              </div>
            </div>

            {/* Credit Entries */}
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-2">Credit Entries</h4>
              {(editForm.creditEntries || []).map((c, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                  {/* Credit Account */}
                  <div className="relative">
                    <div
                      className="border border-gray-300 rounded-lg px-3 py-2 bg-white cursor-pointer flex justify-between items-center"
                      onClick={() => setEditCreditDropdownOpen(p => ({ ...p, [i]: !p[i] }))}
                    >
                      <span>
                        {accounts.find(a => a._id === c.account)?.accountName || "Select account"}
                      </span>
                      <span className="text-gray-400">&#9662;</span>
                    </div>

                    {editCreditDropdownOpen[i] && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        <input
                          type="text"
                          placeholder="Search account..."
                          value={editCreditSearch[i] || ""}
                          onChange={(e) => setEditCreditSearch(p => ({ ...p, [i]: e.target.value }))}
                          className="w-full border-b px-3 py-2 focus:outline-none"
                        />
                        {filterAccounts(editCreditSearch[i] || "").map((a) => (
                          <div
                            key={a._id}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                            onClick={() => {
                              const newCredits = [...editForm.creditEntries];
                              newCredits[i].account = a._id;
                              setEditForm({ ...editForm, creditEntries: newCredits });
                              setEditCreditDropdownOpen(p => ({ ...p, [i]: false }));
                              setEditCreditSearch(p => ({ ...p, [i]: "" }));
                            }}
                          >
                            {a.accountName} ({a.accountType})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Credit Amount */}
                  <input
                    type="number"
                    value={c.amount || 0}
                    onChange={(e) => {
                      const newCredits = [...editForm.creditEntries];
                      newCredits[i].amount = Number(e.target.value);
                      setEditForm({ ...editForm, creditEntries: newCredits });
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                  />

                  {/* Credit Description */}
                  <input
                    type="text"
                    placeholder="Credit description"
                    value={c.description || ""}
                    onChange={(e) => {
                      const newCredits = [...editForm.creditEntries];
                      newCredits[i].description = e.target.value;
                      setEditForm({ ...editForm, creditEntries: newCredits });
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                  />
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditingEntry(null)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const totalCredit = (editForm.creditEntries || []).reduce((sum, c) => sum + (Number(c.amount) || 0), 0);
                  if (editForm.debitAmount !== totalCredit) {
                    return setNotification({ message: "Debit and credit amounts must be equal!", type: "error" });
                  }
                  try {
                    const res = await authFetch(
                      `${API_BASE_URL}/update-journal-entry/${editingEntry._id}`,
                      {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(editForm),
                      }
                    );
                    const data = await res.json();
                    if (!res.ok) throw new Error(data?.message || "Update failed");

                    setEntries(prev => prev.map(e => e._id === data.entry._id ? data.entry : e));
                    setFilteredEntries(prev => prev.map(e => e._id === data.entry._id ? data.entry : e));

                    setNotification({ message: "Entry updated successfully!", type: "success" });
                    setEditingEntry(null);
                  } catch (err) {
                    setNotification({ message: err.message, type: "error" });
                  }
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <JournalNav />

      {/* Filters */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 mb-6 flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Start Date</label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">End Date</label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        <div className="flex flex-col grow">
          <label className="font-semibold text-gray-700">Account</label>
          <input
            type="text"
            placeholder="Search debit or credit account"
            value={filters.account}
            onChange={(e) => setFilters({ ...filters, account: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none w-full"
          />
        </div>
      </div>

      {/* Entries Table */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-8 overflow-x-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          VIEW GENERAL JOURNAL ENTRIES
        </h2>

        {loading ? (
          <div className="animate-pulse" aria-hidden="true">
            <table className="min-w-full border border-gray-400 border-collapse text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-gray-400 px-3 py-2 text-left w-[140px]">DATE</th>
                  <th className="border border-gray-400 px-3 py-2 text-left">PARTICULARS</th>
                  <th className="border border-gray-400 px-3 py-2 text-left">DESCRIPTION</th>
                  <th className="border border-gray-400 px-3 py-2 text-right w-[140px]">DEBIT</th>
                  <th className="border border-gray-400 px-3 py-2 text-right w-[140px]">CREDIT</th>
                  <th className="border border-gray-400 px-3 py-2 text-center w-[120px]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <tr key={i}>
                    <td className="border border-gray-400 px-3 py-2"><span className="inline-block h-5 w-20 bg-gray-200 rounded" /></td>
                    <td className="border border-gray-400 px-3 py-2"><span className="inline-block h-5 w-28 bg-gray-200 rounded" /></td>
                    <td className="border border-gray-400 px-3 py-2"><span className="inline-block h-5 w-40 bg-gray-200 rounded" /></td>
                    <td className="border border-gray-400 px-3 py-2 text-right"><span className="inline-block h-5 w-16 bg-gray-200 rounded ml-auto" /></td>
                    <td className="border border-gray-400 px-3 py-2 text-right"><span className="inline-block h-5 w-16 bg-gray-200 rounded ml-auto" /></td>
                    <td className="border border-gray-400 px-3 py-2 text-center">
                      <span className="inline-block h-8 w-12 bg-gray-200 rounded mr-1" />
                      <span className="inline-block h-8 w-14 bg-gray-200 rounded" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="text-center text-gray-600 py-10">No journal entries found.</div>
        ) : (

          <table className="min-w-full border border-gray-400 border-collapse text-sm">
            <thead className="bg-blue-50">
              <tr>
                <th className="border border-gray-400 px-3 py-2 text-left w-[140px]">
                  DATE
                </th>
                <th className="border border-gray-400 px-3 py-2 text-left">
                  PARTICULARS
                </th>
                <th className="border border-gray-400 px-3 py-2 text-left">DESCRIPTION
                </th>
                <th className="border border-gray-400 px-3 py-2 text-right w-[140px]">
                  DEBIT
                </th>
                <th className="border border-gray-400 px-3 py-2 text-right w-[140px]">
                  CREDIT
                </th>
                <th className="border border-gray-400 px-3 py-2 text-center w-[120px]">
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEntries.map((entry) => (
                <React.Fragment key={entry._id}>
                  {/* 🔹 Debit Row */}
                  <tr>
                    <td className="border border-gray-400 px-3 py-2 align-top">
                      {safeDate(entry.entryDate)}
                    </td>

                    <td className="border border-gray-400 px-3 py-2 font-semibold">
                      {entry.debitAccount?.accountName}
                    </td>

                    <td className="border border-gray-400 px-3 py-2">
                      {entry.debitLineDesc || "—"}
                    </td>

                    <td className="border border-gray-400 px-3 py-2 text-right font-semibold">
                      {entry.debitAmount.toLocaleString()}
                    </td>

                    <td className="border border-gray-400 px-3 py-2 text-right">—</td>

                    {/* Actions */}
                    <td
                      className="border border-gray-400 px-3 py-2 text-center align-top"
                      rowSpan={entry.creditEntries.length + 2}
                    >
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => setEditingEntry(entry)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => confirmDelete(entry._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* 🔹 Credit Rows */}
                  {entry.creditEntries.map((credit, i) => (
                    <tr key={i}>
                      <td className="border border-gray-400 px-3 py-2"></td>

                      <td className="border border-gray-400 px-3 py-2 pl-6">
                        {credit.account?.accountName}
                      </td>

                      <td className="border border-gray-400 px-3 py-2">
                        {credit.description || "—"}
                      </td>

                      <td className="border border-gray-400 px-3 py-2 text-right">—</td>

                      <td className="border border-gray-400 px-3 py-2 text-right">
                        {credit.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}

                  {/* 🔹 Optional Narration Row */}
                  <tr className="bg-gray-50">
                    <td className="border border-gray-400 px-3 py-2"></td>

                    <td colSpan={4} className="border border-gray-400 px-3 py-2 italic text-gray-700">
                      <span className="font-semibold">Narration:</span>{" "}
                      {entry.description || "—"}
                      {entry.comments && ` | ${entry.comments}`}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>

          </table>

        )}
      </div>

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}
      />
    </SidebarLayout>
  );
}
