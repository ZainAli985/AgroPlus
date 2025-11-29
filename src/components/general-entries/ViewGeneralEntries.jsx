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
    if (filters.startDate) temp = temp.filter(e => new Date(e.createdAt) >= new Date(filters.startDate));
    if (filters.endDate) temp = temp.filter(e => new Date(e.createdAt) <= new Date(filters.endDate));
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this journal entry?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/delete-journal-entry/${id}`, { method: "DELETE" });
      const data = await safeJsonParse(res);
      if (!res.ok) throw new Error(data?.message || "Delete failed");
      setEntries(prev => prev.filter(e => e._id !== id));
      setFilteredEntries(prev => prev.filter(e => e._id !== id));
      setNotification({ message: "Entry deleted successfully!", type: "success" });
    } catch (err) {
      setNotification({ message: err.message, type: "error" });
    }
  };

  const safeDate = (val) => {
    if (!val) return "-";
    const d = new Date(val);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
  };

  return (
    <SidebarLayout>
      {/* Upper Link Bar */}
      <div className="w-full flex flex-wrap justify-center md:justify-start gap-4 bg-gray-900 px-6 py-4 rounded-2xl shadow-lg mb-6 items-center">
        <Link
          to="/general-journal-entry"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-xl font-semibold text-white shadow-md transition transform hover:-translate-y-0.5 hover:shadow-lg"
        >
          ✏️ Create Journal Entry
        </Link>
        <Link
          to="/view-general-entries"
          className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold text-white shadow-md transition transform hover:-translate-y-0.5 hover:shadow-lg"
        >
          📋 View Journal Entries
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
        <div className="flex flex-col flex-grow">
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
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          VIEW GENERAL JOURNAL ENTRIES
        </h2>

        {loading ? (
          <div className="text-center text-gray-600 py-10">Loading entries...</div>
        ) : filteredEntries.length === 0 ? (
          <div className="text-center text-gray-600 py-10">No journal entries found.</div>
        ) : (
          <div className="space-y-6">
            {filteredEntries.map((entry) => (
              <div key={entry._id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="bg-gray-100 px-6 py-3 text-lg font-semibold text-gray-800">{entry.description || "-"}</div>

                <div className="px-6 py-2 border-b text-gray-600">
                  <strong>Date:</strong> {safeDate(entry.createdAt)}
                </div>

                {/* Debit */}
                <div className="grid md:grid-cols-3 px-6 py-3 border-b">
                  <div className="text-gray-800">
                    <strong>Debit:</strong> {entry.debitAccount?.accountName || entry.debitAccount || "-"}
                  </div>
                  <div className="text-gray-800">
                    <strong>Amount:</strong> ${entry.debitAmount?.toLocaleString() || "0"}
                  </div>
                  <div className="text-gray-600">
                    <strong>Ledger Ref:</strong> {entry.debitLedgerRef || "-"}
                  </div>
                </div>

                {/* Credit */}
                {entry.creditEntries?.map((credit, i) => (
                  <div key={i} className="grid md:grid-cols-3 px-6 py-2 border-b pl-6">
                    <div className="text-gray-800">→ {credit.account?.accountName || credit.account || "-"}</div>
                    <div className="text-gray-800">${credit.amount?.toLocaleString() || "0"}</div>
                    <div className="text-gray-600">{credit.ledgerRef || "-"}</div>
                  </div>
                ))}

                {/* Delete */}
                <div className="px-6 py-3 text-right">
                  <button
                    onClick={() => handleDelete(entry._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition hover:shadow-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
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
