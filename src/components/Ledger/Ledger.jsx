import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";

export default function Ledger() {
  const [entries, setEntries] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null); // null = no filter
  const [accountSearch, setAccountSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "info" });

  const safeJsonParse = async (res) => {
    try {
      const text = await res.text();
      return text ? JSON.parse(text) : {};
    } catch {
      return null;
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/get-journal-entries`)
      .then(safeJsonParse)
      .then((data) => {
        if (Array.isArray(data)) {
          data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          setEntries(data);
        }
      });

    fetch(`${API_BASE_URL}/accounts`)
      .then(safeJsonParse)
      .then((data) => Array.isArray(data) && setAccounts(data));
  }, []);

  /** Show only after user interaction */
  const shouldShowData =
    selectedAccount !== null || searchText.trim() !== "";

  /** Filter accounts inside dropdown */
  const filteredAccounts = accounts.filter((acc) =>
    acc.accountName.toLowerCase().includes(accountSearch.toLowerCase())
  );

  /** Filter ledger entries */
  const filteredEntries = entries.filter((entry) => {
    const matchesAccount =
      selectedAccount === "ALL" ||
      selectedAccount === null ||
      entry.debitAccount?._id === selectedAccount ||
      entry.creditEntries?.some((c) => c.account?._id === selectedAccount);

    const searchable = [
      entry.description,
      entry.debitAccount?.accountName,
      entry.creditEntries?.map((c) => c.account?.accountName).join(" "),
      entry.debitAmount,
      entry.totalCredit,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchText
      ? searchable.includes(searchText.toLowerCase())
      : true;

    return matchesAccount && matchesSearch;
  });

  let runningBalance = 0;

  return (
    <SidebarLayout>
      <Notification {...notification} onClose={() => setNotification({ message: "", type: "info" })} />

      <h2 className="text-2xl font-bold mb-6">General Ledger</h2>

      {/* Filters */}
      <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-3xl">

        {/* Account Selector */}
        <div className="bg-white rounded-xl shadow p-5">
          <label className="text-sm font-semibold text-gray-600 block mb-2">
            Account
          </label>

          <input
            type="text"
            placeholder="Search account..."
            value={accountSearch}
            onChange={(e) => setAccountSearch(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mb-2"
          />

          <div className="max-h-48 overflow-y-auto border rounded-lg">
            <div
              onClick={() => setSelectedAccount("ALL")}
              className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                selectedAccount === "ALL" ? "bg-blue-100 font-semibold" : ""
              }`}
            >
              All Accounts (Show Everything)
            </div>

            {filteredAccounts.map((acc) => (
              <div
                key={acc._id}
                onClick={() => setSelectedAccount(acc._id)}
                className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                  selectedAccount === acc._id ? "bg-blue-100 font-semibold" : ""
                }`}
              >
                {acc.accountName}
              </div>
            ))}
          </div>
        </div>

        {/* Ledger Search */}
        <div className="bg-white rounded-xl shadow p-5">
          <label className="text-sm font-semibold text-gray-600 block mb-2">
            Search Ledger
          </label>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Description, amount, account..."
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* Empty State */}
      {!shouldShowData && (
        <div className="bg-white p-14 rounded-xl shadow text-center text-gray-500">
          Select an account or search to view ledger entries
        </div>
      )}

      {/* Ledger Entries */}
      {shouldShowData && (
        <div className="space-y-6">
          {filteredEntries.map((entry) => {
            const debit = entry.debitAmount || 0;
            const credit = entry.totalCredit || 0;
            runningBalance += debit - credit;

            const isMultiCredit = entry.creditEntries?.length > 1;

            return (
              <div
                key={entry._id}
                className="bg-white rounded-xl shadow border-l-4 border-blue-600"
              >
                {/* Header */}
                <div className="flex justify-between px-6 py-3 bg-gray-50 border-b">
                  <div>
                    <p className="font-semibold">
                      {entry.description || "Journal Entry"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      isMultiCredit
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {isMultiCredit ? "Multiple Credits" : "Single Entry"}
                  </span>
                </div>

                {/* Ledger Lines */}
                <div className="px-6 py-4">
                  <div className="flex justify-between py-1">
                    <span className="font-medium">
                      Debit — {entry.debitAccount?.accountName}
                    </span>
                    <span className="font-semibold text-green-600">
                      {debit.toLocaleString()}
                    </span>
                  </div>

                  {entry.creditEntries?.map((c, idx) => (
                    <div key={idx} className="flex justify-between py-1">
                      <span>Credit — {c.account?.accountName}</span>
                      <span className="text-red-600">
                        {c.amount?.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Balance */}
                <div className="flex justify-end px-6 py-3 bg-gray-50 border-t">
                  <span className="font-semibold">
                    Balance: {runningBalance.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </SidebarLayout>
  );
}
