import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch";

export default function LedgerByAccount() {
  const { accountId } = useParams();
  const [searchParams] = useSearchParams();

  const [entries, setEntries] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const qs = searchParams.toString();
        const res = await authFetch(
          `${API_BASE_URL}/ledger/account/${accountId}?${qs}`
        );
        const data = await res.json();

        if (data.success) {
          setEntries(data.entries || []);
          setAccountInfo(data.account || null);
          setAccountName(data.account?.accountName || "Account");
        }
      } catch (err) {
        console.error("Failed to fetch ledger:", err);
      }
    };

    if (accountId) fetchLedger();
  }, [accountId, searchParams]);

  // Running balance initialization
  let runningBalance = 0;

  // Helper to format balance with DR/CR notation
  const formatBalance = (amount) => {
    if (amount === 0) return "0";
    return amount > 0 ? `${amount.toLocaleString()} DR` : `${Math.abs(amount).toLocaleString()} CR`;
  };

  return (
    <SidebarLayout>
      {/* Header */}
      {accountInfo && (
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total Debit</p>
            <p className="text-2xl font-bold text-green-600">
              {accountInfo.totalDebit?.toLocaleString() || 0}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total Credit</p>
            <p className="text-2xl font-bold text-red-600">
              {accountInfo.totalCredit?.toLocaleString() || 0}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Balance</p>
            <p
              className={`text-2xl font-bold ${
                accountInfo.balance >= 0 ? "text-blue-700" : "text-red-600"
              }`}
            >
              {formatBalance(accountInfo.balance)}
            </p>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{accountName}</h1>
        <p className="text-sm text-gray-500">Ledger Account Entries</p>
      </div>

      <div className="space-y-6">
        {entries.map((entry) => {
          const creditEntries = entry.creditEntries || [];

          // Account-specific amounts for running balance
          const accountDebit =
            entry.debitAccount?._id === accountId ? entry.debitAmount : 0;

          const accountCredit =
            creditEntries.find((c) => c.account?._id === accountId)?.amount || 0;

          // Adjust balance based on account type
          const normalBalance =
            accountInfo?.accountType === "Assets" ||
            accountInfo?.accountType === "Expense"
              ? accountDebit - accountCredit
              : accountCredit - accountDebit;

          runningBalance += normalBalance;

          return (
            <div
              key={entry._id}
              className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden"
            >
              {/* Entry Header */}
              <div className="px-6 py-3 bg-gray-50 border-b">
                <h3 className="font-semibold text-lg">
                  {entry.description || "Journal Entry"}
                </h3>
                <p className="text-xs text-gray-500">
                  {new Date(entry.entryDate).toLocaleDateString()}
                </p>
              </div>

              {/* Ledger Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 border-b">
                      <th className="px-4 py-2 text-left border-r">Account</th>
                      <th className="px-4 py-2 text-left border-r">Debit</th>
                      <th className="px-4 py-2 text-left">Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Debit line */}
                    {entry.debitAccount && (
                      <tr className="border-b">
                        <td className="px-4 py-2 border-r">
                          {entry.debitAccount.accountName}
                        </td>
                        <td className="px-4 py-2 border-r text-green-600 font-medium">
                          {entry.debitAmount.toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-red-600">—</td>
                      </tr>
                    )}

                    {/* Credit lines */}
                    {creditEntries.map((c) => (
                      <tr key={c._id} className="border-b">
                        <td className="px-4 py-2 border-r">
                          {c.account?.accountName || "-"}
                        </td>
                        <td className="px-4 py-2 border-r text-green-600">—</td>
                        <td className="px-4 py-2 text-red-600 font-medium">
                          {c.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Running Balance */}
              <div
                className={`px-6 py-3 bg-gray-50 border-t text-right font-semibold ${
                  runningBalance < 0 ? "text-red-600" : "text-blue-700"
                }`}
              >
                Balance: {formatBalance(runningBalance)}
              </div>
            </div>
          );
        })}
      </div>
    </SidebarLayout>
  );
}