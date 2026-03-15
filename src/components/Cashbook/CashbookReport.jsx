import React, { useState, useEffect } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";

function fmt(n) {
  return Number(n || 0).toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// type "credit" = cash account was DEBITED = cash came IN = green ▲
// type "debit"  = cash account was CREDITED = cash went OUT = red ▼
function Badge({ type }) {
  return type === "credit" ? (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">
      <span>▲</span> Cash In
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 border border-red-200">
      <span>▼</span> Cash Out
    </span>
  );
}

export default function DailyCashbook() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const todayStr = new Date().toISOString().slice(0, 10);
  const isToday  = selectedDate === todayStr;

  const displayDate = new Date(selectedDate + "T00:00:00").toLocaleDateString("en-PK", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  useEffect(() => { fetchDailyReport(selectedDate); }, [selectedDate]);

  const fetchDailyReport = async (date) => {
    setLoading(true); setError(null);
    try {
      const qs = date && date !== todayStr ? `?date=${date}` : "";
      const res = await authFetch(`${API_BASE_URL}/cashbook-daily${qs}`);
      const text = await res.text();
      let json;
      try { json = JSON.parse(text); } catch { throw new Error("Invalid server response"); }
      if (!res.ok) throw new Error(json.message || "Failed to fetch daily cashbook");
      setData(json);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  if (loading) {
    return (
      <SidebarLayout>
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center h-64 gap-3">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"/>
          <p className="text-sm text-gray-400">Loading today's cashbook…</p>
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

  const { openingBalance = 0, currentBalance = 0, totalDebit = 0, totalCredit = 0, entries = [] } = data || {};
  const netMovement = totalCredit - totalDebit;

  return (
    <SidebarLayout>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Daily Cashbook</h1>
            <p className="text-sm text-gray-400 mt-0.5">{displayDate}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Date nav */}
            <button
              onClick={() => {
                const d = new Date(selectedDate + "T00:00:00");
                d.setDate(d.getDate() - 1);
                setSelectedDate(d.toISOString().slice(0,10));
              }}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition text-sm font-bold"
              title="Previous day"
            >‹</button>

            <input
              type="date"
              value={selectedDate}
              max={todayStr}
              onChange={e => setSelectedDate(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <button
              onClick={() => {
                const d = new Date(selectedDate + "T00:00:00");
                d.setDate(d.getDate() + 1);
                const next = d.toISOString().slice(0,10);
                if (next <= todayStr) setSelectedDate(next);
              }}
              disabled={isToday}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed"
              title="Next day"
            >›</button>

            {!isToday && (
              <button
                onClick={() => setSelectedDate(todayStr)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition"
              >Today</button>
            )}

            <button onClick={() => fetchDailyReport(selectedDate)}
              className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 border border-indigo-200 rounded-lg px-3 py-1.5 hover:bg-indigo-50 transition">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">Opening Balance</p>
            <p className="text-2xl font-bold text-gray-700 tabular-nums">{fmt(openingBalance)}</p>
            <p className="text-[11px] text-gray-400">Start of today</p>
          </div>

          {/* Cash IN = green */}
          <div className="bg-green-50 border border-green-100 shadow-sm rounded-2xl p-4 space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-green-600">Total Cash In</p>
            <p className="text-2xl font-bold text-green-700 tabular-nums">+ {fmt(totalCredit)}</p>
            <p className="text-[11px] text-green-500">▲ Received today</p>
          </div>

          {/* Cash OUT = red */}
          <div className="bg-red-50 border border-red-100 shadow-sm rounded-2xl p-4 space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-red-500">Total Cash Out</p>
            <p className="text-2xl font-bold text-red-600 tabular-nums">− {fmt(totalDebit)}</p>
            <p className="text-[11px] text-red-400">▼ Paid today</p>
          </div>

          {/* Current balance */}
          <div className="bg-indigo-600 shadow-sm rounded-2xl p-4 space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-200">Current Balance</p>
            <p className="text-2xl font-bold text-white tabular-nums">{fmt(currentBalance)}</p>
            <p className={`text-[11px] font-medium ${netMovement >= 0 ? "text-green-300" : "text-red-300"}`}>
              {netMovement >= 0 ? "▲" : "▼"} {fmt(Math.abs(netMovement))} net today
            </p>
          </div>
        </div>

        {/* ── Ledger Table ── */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Today's Transactions</h2>
            <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2.5 py-1 font-medium">
              {entries.length} {entries.length === 1 ? "entry" : "entries"}
            </span>
          </div>

          {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-2xl">📋</div>
              <p className="text-sm font-medium text-gray-500">No entries for today</p>
              <p className="text-xs text-gray-400 mt-1">Cash transactions recorded today will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-8">#</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Time</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Account(s)</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-3 text-xs font-semibold text-green-600 uppercase tracking-wider text-right">Cash In ▲</th>
                    <th className="px-4 py-3 text-xs font-semibold text-red-500 uppercase tracking-wider text-right">Cash Out ▼</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {entries.map((entry, idx) => (
                    <tr key={entry._id || idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3.5 text-xs text-gray-300 font-mono">{String(idx + 1).padStart(2, "0")}</td>
                      <td className="px-4 py-3.5 text-xs text-gray-400 whitespace-nowrap font-mono">{entry.time || "—"}</td>
                      <td className="px-4 py-3.5"><Badge type={entry.type}/></td>
                      <td className="px-4 py-3.5 text-gray-700 font-medium max-w-[180px]">
                        <div className="flex flex-col gap-0.5">
                          {entry.accounts?.map((acc, i) => (
                            <span key={i} className="truncate text-xs">{acc}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-gray-500 text-xs max-w-[160px] truncate">{entry.description || "—"}</td>
                      <td className="px-4 py-3.5 text-right tabular-nums">
                        {entry.type === "credit"
                          ? <span className="text-green-600 font-semibold">{fmt(entry.amount)}</span>
                          : <span className="text-gray-200">—</span>}
                      </td>
                      <td className="px-4 py-3.5 text-right tabular-nums">
                        {entry.type === "debit"
                          ? <span className="text-red-600 font-semibold">{fmt(entry.amount)}</span>
                          : <span className="text-gray-200">—</span>}
                      </td>
                      <td className="px-4 py-3.5 text-gray-400 text-xs max-w-[140px] truncate">{entry.comments || "—"}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 border-t-2 border-gray-200">
                    <td colSpan={5} className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Daily Totals</td>
                    <td className="px-4 py-3 text-right font-bold text-green-600 tabular-nums text-sm">{fmt(totalCredit)}</td>
                    <td className="px-4 py-3 text-right font-bold text-red-600 tabular-nums text-sm">{fmt(totalDebit)}</td>
                    <td/>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* ── Reconciliation Footer ── */}
        {entries.length > 0 && (
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl px-6 py-4">
            <div className="flex items-center justify-between text-sm flex-wrap gap-2">
              <span className="text-gray-500">
                Opening <span className="font-mono font-semibold text-gray-700">{fmt(openingBalance)}</span>
                {" "}+ Cash In <span className="font-mono font-semibold text-green-600">{fmt(totalCredit)}</span>
                {" "}− Cash Out <span className="font-mono font-semibold text-red-600">{fmt(totalDebit)}</span>
              </span>
              <span className="font-bold text-indigo-700 text-base">= {fmt(currentBalance)}</span>
            </div>
          </div>
        )}

      </div>
    </SidebarLayout>
  );
}