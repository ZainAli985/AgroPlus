import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";

export default function Ledger() {
  const [entries, setEntries] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("all");
  const [notification, setNotification] = useState({ message: "", type: "info" });

  const safeJsonParse = async (res) => {
    try {
      const text = await res.text();
      return text ? JSON.parse(text) : {};
    } catch {
      return null;
    }
  };

  // Fetch ledger entries (from journal entries)
  const fetchLedgerEntries = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/get-journal-entries`);
      const data = await safeJsonParse(res);
      if (!Array.isArray(data)) throw new Error("Failed to fetch entries");

      // Sort by date
      const sorted = data.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setEntries(sorted);
    } catch (err) {
      console.error(err);
      setNotification({ message: err.message, type: "error" });
    }
  };

  // Fetch accounts
  const fetchAccounts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/get-accounts`);
      const data = await safeJsonParse(res);
      if (!Array.isArray(data)) throw new Error("Failed to fetch accounts");

      setAccounts(data);
    } catch (err) {
      console.error(err);
      setNotification({ message: "Error fetching accounts", type: "error" });
    }
  };

  useEffect(() => {
    fetchLedgerEntries();
    fetchAccounts();
  }, []);

  // Filter entries by selected account
  const filteredEntries = selectedAccount === "all"
    ? entries
    : entries.filter((entry) => {
        // Match debit account
        if (entry.debitAccount?._id === selectedAccount) return true;
        // Match any credit account
        return entry.creditEntries?.some((c) => c.account?._id === selectedAccount);
      });

  // Running balance per entry
  let balance = 0;
  const runningEntries = filteredEntries.map((entry) => {
    const debit = entry.debitAmount || 0;
    const totalCredit = entry.totalCredit || 0;
    balance += debit - totalCredit;
    return { ...entry, debit, totalCredit, balance };
  });

  // Grand totals
  const totalDebit = runningEntries.reduce((sum, e) => sum + e.debit, 0);
  const totalCredit = runningEntries.reduce((sum, e) => sum + e.totalCredit, 0);

  // Safe date formatter
  const formatDate = (d) => {
    if (!d) return "-";
    const date = new Date(d);
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleDateString();
  };

  return (
    <SidebarLayout>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}
      />

      <h2 className="text-2xl font-bold mb-4">Ledger</h2>

      {/* Account Filter */}
      <div className="bg-white shadow-md p-4 rounded-lg mb-6 max-w-lg">
        <label className="font-semibold block mb-2">Filter by Account</label>
        <select
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="all">All Accounts</option>
          {accounts.map((acc) => (
            <option key={acc._id} value={acc._id}>{acc.accountName}</option>
          ))}
        </select>
      </div>

      {/* Ledger Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Debit Account</th>
              <th className="border px-4 py-2">Debit Amount</th>
              <th className="border px-4 py-2">Credit Accounts</th>
              <th className="border px-4 py-2">Credit Amounts</th>
              <th className="border px-4 py-2">Balance</th>
            </tr>
          </thead>
          <tbody>
            {runningEntries.map((entry, i) => (
              <tr
                key={entry._id}
                className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-100 transition`}
              >
                <td className="border px-4 py-2">{formatDate(entry.createdAt)}</td>
                <td className="border px-4 py-2">{entry.description || "-"}</td>
                <td className="border px-4 py-2">{entry.debitAccount?.accountName || "-"}</td>
                <td className="border px-4 py-2 text-right">{entry.debit.toLocaleString()}</td>
                <td className="border px-4 py-2">
                  {entry.creditEntries?.map((c, idx) => (
                    <div key={idx} className="ml-4">{c.account?.accountName || "-"}</div>
                  ))}
                </td>
                <td className="border px-4 py-2 text-right">
                  {entry.creditEntries?.map((c, idx) => (
                    <div key={idx} className="ml-4">{c.amount?.toLocaleString() || "-"}</div>
                  ))}
                </td>
                <td className="border px-4 py-2 text-right">{entry.balance.toLocaleString()}</td>
              </tr>
            ))}

            <tr className="bg-gray-100 font-bold">
              <td className="border px-4 py-2" colSpan={3}>Grand Total</td>
              <td className="border px-4 py-2 text-right">{totalDebit.toLocaleString()}</td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2 text-right">{totalCredit.toLocaleString()}</td>
              <td className="border px-4 py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </SidebarLayout>
  );
}
