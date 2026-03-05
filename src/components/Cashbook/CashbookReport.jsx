import React, { useState, useEffect } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";

const CASH_ACCOUNT_ID = "692fca6790d96dd63e44b12a";

function fmt(n) {
  return Number(n || 0).toLocaleString("en-PK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function Badge({ type }) {
  return type === "debit" ? (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-600">
      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
      Cash Out
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
      Cash In
    </span>
  );
}

export default function DailyCashbook() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const today = new Date().toLocaleDateString("en-PK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    fetchDailyReport();
  }, []);

  const fetchDailyReport = async () => {
    setLoading(true);

    try {
      const res = await authFetch(`${API_BASE_URL}/cashbook-daily`);

      const text = await res.text(); // read response first
      let json;

      try {
        json = JSON.parse(text); // safely parse
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        throw new Error(json.message || "Failed to fetch daily cashbook");
      }

      setData(json);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SidebarLayout>
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center h-64 gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading today's cashbook...</p>
        </div>
      </SidebarLayout>
    );
  }

  if (error) {
    return (
      <SidebarLayout>
        <div className="max-w-5xl mx-auto flex items-center justify-center h-64">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      </SidebarLayout>
    );
  }

  const {
    openingBalance = 0,
    currentBalance = 0,
    totalDebit = 0,
    totalCredit = 0,
    entries = [],
  } = data || {};

  const netMovement = totalCredit - totalDebit;

  return (
    <SidebarLayout>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Daily Cashbook</h1>
            <p className="text-sm text-gray-400 mt-0.5">{today}</p>
          </div>
          <button
            onClick={fetchDailyReport}
            className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg px-3 py-1.5 hover:bg-blue-50 transition"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {/* Opening Balance */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
              Opening Balance
            </p>
            <p className="text-2xl font-bold text-gray-700 tabular-nums">
              {fmt(openingBalance)}
            </p>
            <p className="text-[11px] text-gray-400">Start of today</p>
          </div>

          {/* Total Cash In */}
          <div className="bg-emerald-50 border border-emerald-100 shadow-sm rounded-2xl p-4 space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-500">
              Total Cash In
            </p>
            <p className="text-2xl font-bold text-emerald-700 tabular-nums">
              + {fmt(totalCredit)}
            </p>
            <p className="text-[11px] text-emerald-400">Credited today</p>
          </div>

          {/* Total Cash Out */}
          <div className="bg-orange-50 border border-orange-100 shadow-sm rounded-2xl p-4 space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-orange-500">
              Total Cash Out
            </p>
            <p className="text-2xl font-bold text-orange-700 tabular-nums">
              − {fmt(totalDebit)}
            </p>
            <p className="text-[11px] text-orange-400">Debited today</p>
          </div>

          {/* Closing / Current Balance */}
          <div className="bg-blue-600 shadow-sm rounded-2xl p-4 space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-200">
              Current Balance
            </p>
            <p className="text-2xl font-bold text-white tabular-nums">
              {fmt(currentBalance)}
            </p>
            <p className={`text-[11px] font-medium ${netMovement >= 0 ? "text-emerald-300" : "text-orange-300"}`}>
              {netMovement >= 0 ? "▲" : "▼"} {fmt(Math.abs(netMovement))} net today
            </p>
          </div>
        </div>

        {/* ── Ledger Table ── */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">

          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">
              Today's Transactions
            </h2>
            <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2.5 py-1 font-medium">
              {entries.length} {entries.length === 1 ? "entry" : "entries"}
            </span>
          </div>

          {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-2xl">
                📋
              </div>
              <p className="text-sm font-medium text-gray-500">No entries for today</p>
              <p className="text-xs text-gray-400 mt-1">
                Cash transactions recorded today will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-8">
                      #
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Account(s)
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-emerald-500 uppercase tracking-wider text-right">
                      Cash In
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-orange-500 uppercase tracking-wider text-right">
                      Cash Out
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {entries.map((entry, idx) => (
                    <tr
                      key={entry._id || idx}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-3.5 text-xs text-gray-300 font-mono">
                        {String(idx + 1).padStart(2, "0")}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-gray-400 whitespace-nowrap font-mono">
                        {entry.time || "—"}
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge type={entry.type} />
                      </td>
                      <td className="px-4 py-3.5 text-gray-700 font-medium max-w-[180px]">
                        <div className="flex flex-col gap-0.5">
                          {entry.accounts?.map((acc, i) => (
                            <span key={i} className="truncate text-xs">
                              {acc}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-gray-500 text-xs max-w-[160px] truncate">
                        {entry.description || "—"}
                      </td>
                      <td className="px-4 py-3.5 text-right tabular-nums">
                        {entry.type === "credit" ? (
                          <span className="text-emerald-600 font-semibold">
                            {fmt(entry.amount)}
                          </span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-right tabular-nums">
                        {entry.type === "debit" ? (
                          <span className="text-orange-500 font-semibold">
                            {fmt(entry.amount)}
                          </span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-gray-400 text-xs max-w-[140px] truncate">
                        {entry.comments || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>

                {/* Totals row */}
                <tfoot>
                  <tr className="bg-gray-50 border-t-2 border-gray-200">
                    <td colSpan={5} className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Daily Totals
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-600 tabular-nums text-sm">
                      {fmt(totalCredit)}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-orange-500 tabular-nums text-sm">
                      {fmt(totalDebit)}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* ── Balance Reconciliation Footer ── */}
        {entries.length > 0 && (
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl px-6 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                Opening Balance{" "}
                <span className="font-mono font-semibold text-gray-700">
                  {fmt(openingBalance)}
                </span>
                {" "}+ Cash In{" "}
                <span className="font-mono font-semibold text-emerald-600">
                  {fmt(totalCredit)}
                </span>
                {" "}− Cash Out{" "}
                <span className="font-mono font-semibold text-orange-500">
                  {fmt(totalDebit)}
                </span>
              </span>
              <span className="font-bold text-blue-700 text-base">
                = {fmt(currentBalance)}
              </span>
            </div>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}