import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";

export default function LedgerByReference() {
  const { ref } = useParams();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/ledger/ref/${ref}`)
      .then((res) => res.json())
      .then((data) => data.success && setEntry(data.entry));
  }, [ref]);

  if (!entry) return null;

  return (
    <SidebarLayout>
      <h1 className="text-3xl font-bold mb-6">Journal Voucher</h1>

      <div className="bg-white rounded-xl shadow">
        {/* Header */}
        <div className="px-6 py-4 border-b grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">Date</p>
            <p className="font-semibold">
              {new Date(entry.entryDate).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Reference</p>
            <p className="font-semibold">{entry._id}</p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <table className="w-full text-sm">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="text-left pb-2">Account</th>
                <th className="text-right pb-2">Debit</th>
                <th className="text-right pb-2">Credit</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-3 font-medium">
                  {entry.debitAccount.accountName}
                </td>
                <td className="py-3 text-right text-green-600">
                  {entry.debitAmount.toLocaleString()}
                </td>
                <td className="py-3 text-right">—</td>
              </tr>

              {entry.creditEntries.map((c) => (
                <tr key={c._id} className="border-b">
                  <td className="py-3 pl-6">
                    {c.account.accountName}
                  </td>
                  <td className="py-3 text-right">—</td>
                  <td className="py-3 text-right text-red-600">
                    {c.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 text-right font-semibold">
          Total: {entry.debitAmount.toLocaleString()}
        </div>
      </div>
    </SidebarLayout>
  );
}
