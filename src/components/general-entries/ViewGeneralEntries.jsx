import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";

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
      const res = await fetch(`${API_BASE_URL}/get-journal-entries`);
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
      const res = await fetch(`${API_BASE_URL}/accounts`);
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

  // const handleDelete = async (id) => {
  //   if (!window.confirm("Are you sure you want to delete this journal entry?")) return;
  //   try {
  //     const res = await fetch(`${API_BASE_URL}/delete-journal-entry/${id}`, { method: "DELETE" });
  //     const data = await safeJsonParse(res);
  //     if (!res.ok) throw new Error(data?.message || "Delete failed");
  //     setEntries(prev => prev.filter(e => e._id !== id));
  //     setFilteredEntries(prev => prev.filter(e => e._id !== id));
  //     setNotification({ message: "Entry deleted successfully!", type: "success" });
  //   } catch (err) {
  //     setNotification({ message: err.message, type: "error" });
  //   }
  // };
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
        description: editingEntry.description || "",
        comments: editingEntry.comments || "",
        debitAccount: editingEntry.debitAccount?._id || editingEntry.debitAccount || "",
        debitAmount: editingEntry.debitAmount || 0,
        creditEntries: editingEntry.creditEntries?.map(c => ({
          account: c.account?._id || c.account || "",
          amount: c.amount || 0,
          comments: c.comments || ""
        })) || [],
        entryDate: editingEntry.entryDate?.split("T")[0] || "",
      });
    }
  }, [editingEntry]);


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
                    const res = await fetch(`${API_BASE_URL}/delete-journal-entry/${deleteModal.entryId}`, { method: "DELETE" });
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
              {/* Date */}
              <div>
                <label className="font-semibold text-gray-700">Date</label>
                <input
                  type="date"
                  value={editForm.entryDate}
                  onChange={(e) => setEditForm({ ...editForm, entryDate: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-semibold text-gray-700">Description</label>
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
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
              <div>
                <label className="font-semibold text-gray-700">Debit Account</label>
                <select
                  value={editForm.debitAccount}
                  onChange={(e) => setEditForm({ ...editForm, debitAccount: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                >
                  <option value="">Select account</option>
                  {accounts.map((a) => (
                    <option key={a._id} value={a._id}>{a.accountName}</option>
                  ))}
                </select>
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
            </div>

            {/* Credit Entries */}
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-2">Credit Entries</h4>
              {(editForm.creditEntries || []).map((c, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                  <select
                    value={c.account || ""}
                    onChange={(e) => {
                      const newCredits = [...editForm.creditEntries];
                      newCredits[i].account = e.target.value;
                      setEditForm({ ...editForm, creditEntries: newCredits });
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                  >
                    <option value="">Select account</option>
                    {accounts.map((a) => (
                      <option key={a._id} value={a._id}>{a.accountName}</option>
                    ))}
                  </select>

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

                  <input
                    type="text"
                    placeholder="Comments"
                    value={c.comments || ""}
                    onChange={(e) => {
                      const newCredits = [...editForm.creditEntries];
                      newCredits[i].comments = e.target.value;
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
                    const res = await fetch(`${API_BASE_URL}/update-journal-entry/${editingEntry._id}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(editForm),
                    });
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


      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex space-x-4">

        {/* Create Journal Entry */}
        <Link
          to="/general-journal-entry"
          className={`px-4 py-2 rounded-lg font-semibold transition 
      ${location.pathname === "/general-journal-entry"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          ✏️ Create Journal Entry
        </Link>

        {/* View Journal Entries */}
        <Link
          to="/view-general-entries"
          className={`px-4 py-2 rounded-lg font-semibold transition 
      ${location.pathname === "/view-general-entries"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          📋 View Journal Entries
        </Link>

        {/* Ledger */}
        <Link
          to="/ledger"
          className={`px-4 py-2 rounded-lg font-semibold transition 
      ${location.pathname === "/ledger"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          📘 Ledger
        </Link>

      </div>


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
          <div className="text-center text-gray-600 py-10">Loading entries...</div>
        ) : filteredEntries.length === 0 ? (
          <div className="text-center text-gray-600 py-10">No journal entries found.</div>
        ) : (

          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Account</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Debit</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Credit</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Comments</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => {
                // Debit row
                const debitRow = (
                  <tr key={entry._id + "-debit"} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{safeDate(entry.entryDate)}</td>
                    <td className="border border-gray-300 px-4 py-2">{entry.description || "-"}</td>
                    <td className="border border-gray-300 px-4 py-2">{entry.debitAccount?.accountName || entry.debitAccount || "-"}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{entry.debitAmount?.toLocaleString() || "0"}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-4 py-2">{entry.comments || "-"}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center" rowSpan={entry.creditEntries?.length + 1}>
                      <button
                        onClick={() => confirmDelete(entry._id)}

                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow-sm transition hover:shadow-md"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setEditingEntry(entry)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg shadow-sm transition hover:shadow-md mr-2"
                      >
                        Edit
                      </button>

                    </td>
                  </tr>
                );

                // Credit rows
                const creditRows = entry.creditEntries?.map((credit, i) => (
                  <tr key={entry._id + "-credit-" + i} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{/* empty */}</td>
                    <td className="border border-gray-300 px-4 py-2">{/* empty */}</td>
                    <td className="border border-gray-300 px-4 py-2">{credit.account?.accountName || credit.account || "-"}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{credit.amount?.toLocaleString() || "0"}</td>
                    <td className="border border-gray-300 px-4 py-2">{credit.comments || "-"}</td>
                  </tr>
                ));

                return [debitRow, ...creditRows];
              })}
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
