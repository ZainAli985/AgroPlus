import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";

export default function LedgerByAccount() {
  const { accountId } = useParams();
  const [searchParams] = useSearchParams();

  const [entries, setEntries] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [accountInfo, setAccountInfo] = useState(null);


  useEffect(() => {
    const qs = searchParams.toString();

    fetch(`${API_BASE_URL}/ledger/account/${accountId}?${qs}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEntries(data.entries);
          setAccountInfo(data.account);
          setAccountName(data.account.accountName);
        }

        // if (data.success) {
        //   setEntries(data.entries);
        //   setEntries(data.entries);
        //   setAccountInfo(data.account);
        //   setAccountName(data.account.accountName);

        //   if (data.entries.length) {
        //     const firstEntry = data.entries[0];
        //     const debit = firstEntry.debitAccount;
        //     const credit = firstEntry.creditEntries.find(
        //       (c) => c.account._id === accountId
        //     );

        //     setAccountName(
        //       debit._id === accountId
        //         ? debit.accountName
        //         : credit?.account.accountName || "Account"
        //     );
        //   }
        // }
      });
  }, [accountId, searchParams]);

  let runningBalance = 0;

  return (
    <SidebarLayout>
      {/* Header */}
      {accountInfo && (
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total Debit</p>
            <p className="text-2xl font-bold text-green-600">
              {accountInfo.totalDebit.toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total Credit</p>
            <p className="text-2xl font-bold text-red-600">
              {accountInfo.totalCredit.toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Balance</p>
            <p className="text-2xl font-bold text-blue-700">
              {accountInfo.balance.toLocaleString()}
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

          // Account-specific amounts (for balance)
          const accountDebit =
            entry.debitAccount._id === accountId ? entry.debitAmount : 0;

          const accountCredit =
            creditEntries.find(
              (c) => c.account._id === accountId
            )?.amount || 0;

          runningBalance += accountDebit - accountCredit;

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
                      <th className="px-4 py-2 text-left border-r">
                        Account
                      </th>
                      <th className="px-4 py-2 text-left border-r">
                        Debit
                      </th>
                      <th className="px-4 py-2 text-left">
                        Credit
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* Debit line (ALWAYS SHOW AMOUNT) */}
                    <tr className="border-b">
                      <td className="px-4 py-2 border-r">
                        {entry.debitAccount.accountName}
                      </td>
                      <td className="px-4 py-2 border-r text-green-600 font-medium">
                        {entry.debitAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-red-600">
                        —
                      </td>
                    </tr>

                    {/* Credit lines (ALWAYS SHOW AMOUNT) */}
                    {creditEntries.map((c) => (
                      <tr key={c._id} className="border-b">
                        <td className="px-4 py-2 border-r">
                          {c.account.accountName}
                        </td>
                        <td className="px-4 py-2 border-r text-green-600">
                          —
                        </td>
                        <td className="px-4 py-2 text-red-600 font-medium">
                          {c.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Running Balance */}
              <div className="px-6 py-3 bg-gray-50 border-t text-right font-semibold">
                Balance: {runningBalance.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </SidebarLayout>
  );
}
