import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";
import Notification from "../Notification.jsx";

export default function CashbookReport() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    message: "",
    type: "info",
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/cashbook-report`);
      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Failed to fetch cashbook");

      setEntries(data.cashbooks || []);
    } catch (err) {
      setNotification({ message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const safeDate = (val) => {
    if (!val) return "-";
    const d = new Date(val);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
  };

  /* =========================
     Ledger Calculation
  ========================== */
  let runningBalance = 0;
  let totalDebit = 0;
  let totalCredit = 0;
  const ledgerRows = [];

  entries.forEach((entry, index) => {
    if (index === 0) {
      runningBalance = entry.openingBalance;
      ledgerRows.push({
        type: "opening",
        date: entry.date,
        description: "Opening Balance",
        balance: runningBalance,
      });
    }

    entry.transactions.forEach((t) => {
      totalDebit += Number(t.debit);
      totalCredit += Number(t.credit);

      runningBalance += Number(t.credit);
      runningBalance -= Number(t.debit);

      ledgerRows.push({
        type: "transaction",
        date: entry.date,
        account: t.account,
        description: t.description,
        debit: t.debit,
        credit: t.credit,
        balance: runningBalance,
      });
    });
  });

  const closingBalance =
    entries.length > 0
      ? entries[entries.length - 1].closingBalance
      : 0;

  return (
    <SidebarLayout>
      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">

          {/* Header */}
          <div className="border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Cashbook Ledger
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Complete cash movement with running balance.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">
              Loading cashbook data...
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              No cashbook entries found.
            </div>
          ) : (
            <>
              {/* Summary Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-5 border">
                  <p className="text-sm text-gray-500">Total Debit</p>
                  <p className="text-xl font-semibold text-red-600 mt-1">
                    {totalDebit.toLocaleString()}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 border">
                  <p className="text-sm text-gray-500">Total Credit</p>
                  <p className="text-xl font-semibold text-green-600 mt-1">
                    {totalCredit.toLocaleString()}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                  <p className="text-sm text-gray-600">Closing Balance</p>
                  <p className="text-xl font-bold text-blue-700 mt-1">
                    {closingBalance.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Ledger Table */}
              <div className="overflow-x-auto border rounded-xl">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Account</th>
                      <th className="px-4 py-3 text-left">Description</th>
                      <th className="px-4 py-3 text-right">Debit</th>
                      <th className="px-4 py-3 text-right">Credit</th>
                      <th className="px-4 py-3 text-right">Balance</th>
                    </tr>
                  </thead>

                  <tbody>
                    {ledgerRows.map((row, index) => (
                      <tr
                        key={index}
                        className={`border-t ${
                          row.type === "opening"
                            ? "bg-yellow-50 font-semibold"
                            : index % 2 === 0
                            ? "bg-white"
                            : "bg-gray-50"
                        }`}
                      >
                        <td className="px-4 py-3">
                          {safeDate(row.date)}
                        </td>

                        <td className="px-4 py-3">
                          {row.account || "-"}
                        </td>

                        <td className="px-4 py-3 text-gray-600">
                          {row.description || "-"}
                        </td>

                        <td className="px-4 py-3 text-right text-red-600">
                          {row.debit
                            ? Number(row.debit).toLocaleString()
                            : "-"}
                        </td>

                        <td className="px-4 py-3 text-right text-green-600">
                          {row.credit
                            ? Number(row.credit).toLocaleString()
                            : "-"}
                        </td>

                        <td className="px-4 py-3 text-right font-semibold">
                          {Number(row.balance).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() =>
            setNotification({ message: "", type: "info" })
          }
        />
      </div>
    </SidebarLayout>
  );
}