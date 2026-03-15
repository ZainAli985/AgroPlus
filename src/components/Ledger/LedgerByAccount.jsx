import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch";

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (n) =>
  Number(n || 0).toLocaleString("en-PK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const fmtTime = (d) =>
  new Date(d).toLocaleTimeString("en-PK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

const balanceLabel = (amount, accountType) => {
  if (amount === 0) return { text: "0.00", color: "text-slate-400" };
  const isDebitNormal =
    accountType === "Assets" || accountType === "Expense";
  if (amount > 0) {
    return {
      text: `${fmt(Math.abs(amount))} ${isDebitNormal ? "DR" : "CR"}`,
      color: isDebitNormal ? "text-emerald-600" : "text-rose-500",
    };
  }
  return {
    text: `${fmt(Math.abs(amount))} ${isDebitNormal ? "CR" : "DR"}`,
    color: isDebitNormal ? "text-rose-500" : "text-emerald-600",
  };
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function LedgerByAccount() {
  const { accountId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [entries, setEntries] = useState([]);
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(searchParams.get("startDate") || "");
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");

  const fetchLedger = async () => {
    setLoading(true);
    try {
      const qs = searchParams.toString();
      const res = await authFetch(`${API_BASE_URL}/ledger/account/${accountId}?${qs}`);
      const data = await res.json();
      if (data.success) {
        setEntries(data.entries || []);
        setAccountInfo(data.account || null);
      }
    } catch (err) {
      console.error("Failed to fetch ledger:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accountId) fetchLedger();
  }, [accountId, searchParams]);

  const applyFilter = () => {
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    setSearchParams(params);
  };

  const clearFilter = () => {
    setStartDate("");
    setEndDate("");
    setSearchParams({});
  };

  // Build flat ledger rows with running balance
  const accountType = accountInfo?.accountType || "Assets";
  // Running balance starts from opening balance (set at account creation)
  // For CASH IN HAND (isProtected), openingDebit/openingCredit=0 — its opening
  // is already baked into the cashbook and reflected via stored balance.
  const obDebit  = accountInfo?.openingDebit  || 0;
  const obCredit = accountInfo?.openingCredit || 0;
  const obMovement =
    accountType === "Assets" || accountType === "Expense"
      ? obDebit - obCredit
      : obCredit - obDebit;
  let runningBalance = obMovement;

  const rows = entries.map((entry, idx) => {
    const creditEntries = entry.creditEntries || [];
    const isDebitSide = entry.debitAccount?._id === accountId ||
      entry.debitAccount?._id?.toString() === accountId;
    const creditEntry = creditEntries.find(
      (c) => c.account?._id === accountId || c.account?._id?.toString() === accountId
    );

    const debitAmt  = isDebitSide ? entry.debitAmount : 0;
    const creditAmt = creditEntry ? creditEntry.amount : 0;

    const movement =
      accountType === "Assets" || accountType === "Expense"
        ? debitAmt - creditAmt
        : creditAmt - debitAmt;

    runningBalance += movement;

    // Counter-party accounts for display
    const counterParties = isDebitSide
      ? creditEntries.map((c) => c.account?.accountName).filter(Boolean).join(", ")
      : entry.debitAccount?.accountName || "—";

    const bal = balanceLabel(runningBalance, accountType);

    return {
      idx,
      entry,
      debitAmt,
      creditAmt,
      runningBalance,
      bal,
      counterParties,
    };
  });

  const accountName  = accountInfo?.accountName  || "Account Ledger";
  const totalDebit   = accountInfo?.totalDebit   || 0;
  const totalCredit  = accountInfo?.totalCredit  || 0;
  const balance      = accountInfo?.balance      || 0;
  const openingDebit = accountInfo?.openingDebit || 0;
  const openingCredit= accountInfo?.openingCredit|| 0;
  const hasOpeningBalance = openingDebit > 0 || openingCredit > 0;
  const balLabel     = balanceLabel(balance, accountType);

  const isFiltered = searchParams.get("startDate") || searchParams.get("endDate");

  return (
    <SidebarLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ledger-root { font-family: 'DM Sans', sans-serif; }
        .ledger-title { font-family: 'DM Serif Display', serif; }
        .ledger-mono  { font-family: 'DM Mono', monospace; }

        .ledger-row { transition: background 0.15s; }
        .ledger-row:hover { background: #f8fafc; }

        .stat-card {
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
        }
        .stat-card.debit::before  { background: #10b981; }
        .stat-card.credit::before { background: #f43f5e; }
        .stat-card.balance::before{ background: #3b82f6; }

        .fade-in {
          animation: fadeUp 0.3s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="ledger-root min-h-screen bg-slate-50 pb-16">

        {/* ── Dark Masthead ── */}
        <div className="bg-slate-900 text-white px-8 py-8 mb-8 rounded-2xl shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-[0.2em] mb-1">
                Account Ledger
              </p>
              <h1 className="ledger-title text-3xl md:text-4xl leading-tight">
                {accountName}
              </h1>
              {accountInfo && (
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs bg-slate-700 text-slate-300 px-2.5 py-0.5 rounded-full">
                    {accountInfo.accountType}
                  </span>
                  <span className="text-xs text-slate-500">
                    {entries.length} transaction{entries.length !== 1 ? "s" : ""}
                    {isFiltered ? " (filtered)" : ""}
                  </span>
                </div>
              )}
            </div>

            {/* Balance pill on dark header */}
            <div className="text-right">
              <p className="text-slate-400 text-xs mb-1">Current Balance</p>
              <p className={`ledger-mono text-2xl font-medium ${
                balance >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}>
                {balLabel.text}
              </p>
            </div>
          </div>
        </div>

        <div className="px-0 md:px-0 space-y-6 fade-in">

          {/* ── Summary Stats ── */}
          {accountInfo && (
            <div className="grid grid-cols-3 gap-4">
              <div className="stat-card debit bg-white rounded-xl shadow-sm border border-slate-100 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  Total Debit
                </p>
                <p className="ledger-mono text-2xl font-medium text-emerald-600">
                  {fmt(totalDebit)}
                </p>
                <p className="text-xs text-slate-400 mt-1">Cumulative DR side</p>
              </div>

              <div className="stat-card credit bg-white rounded-xl shadow-sm border border-slate-100 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  Total Credit
                </p>
                <p className="ledger-mono text-2xl font-medium text-rose-500">
                  {fmt(totalCredit)}
                </p>
                <p className="text-xs text-slate-400 mt-1">Cumulative CR side</p>
              </div>

              <div className="stat-card balance bg-white rounded-xl shadow-sm border border-slate-100 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  Net Balance
                </p>
                <p className={`ledger-mono text-2xl font-medium ${balLabel.color}`}>
                  {balLabel.text}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {accountType === "Assets" || accountType === "Expense"
                    ? "DR normal balance"
                    : "CR normal balance"}
                </p>
              </div>
            </div>
          )}

          {/* ── Date Filter ── */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <div className="flex flex-wrap items-end gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  From
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  To
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <button
                onClick={applyFilter}
                className="px-5 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 transition"
              >
                Apply Filter
              </button>
              {isFiltered && (
                <button
                  onClick={clearFilter}
                  className="px-5 py-2 bg-slate-100 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-200 transition"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* ── Ledger Table ── */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">

            {/* Table header bar */}
            <div className="px-6 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-700">Transactions</h2>
              <span className="text-xs text-slate-400 ledger-mono">
                {entries.length} entries
              </span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-7 h-7 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : rows.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-2xl">
                  📒
                </div>
                <p className="text-sm font-medium text-slate-500">No entries found</p>
                <p className="text-xs text-slate-400 mt-1">
                  {isFiltered ? "Try adjusting the date filter." : "No transactions recorded yet."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider w-8">#</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Counter Account</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-emerald-500 uppercase tracking-wider">Debit</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-rose-500 uppercase tracking-wider">Credit</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-blue-500 uppercase tracking-wider">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {/* Opening Balance row — shown when account was created with an opening balance */}
                    {hasOpeningBalance && !accountInfo?.isProtected && (
                      <tr className="bg-amber-50 border-b border-amber-100">
                        <td className="px-4 py-3.5 text-xs text-amber-300 ledger-mono">OB</td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <p className="text-xs font-semibold text-amber-600 ledger-mono">Opening Balance</p>
                          <p className="text-[10px] text-amber-400 ledger-mono mt-0.5">Account creation</p>
                        </td>
                        <td className="px-4 py-3.5">
                          <p className="text-sm font-medium text-amber-700">Opening Balance</p>
                          <p className="text-[11px] text-amber-500 mt-0.5">Initial account balance</p>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-xs text-amber-500 italic">—</span>
                        </td>
                        <td className="px-4 py-3.5 text-right ledger-mono">
                          {openingDebit > 0
                            ? <span className="text-emerald-600 font-semibold text-sm">{fmt(openingDebit)}</span>
                            : <span className="text-slate-200 text-xs">—</span>}
                        </td>
                        <td className="px-4 py-3.5 text-right ledger-mono">
                          {openingCredit > 0
                            ? <span className="text-rose-500 font-semibold text-sm">{fmt(openingCredit)}</span>
                            : <span className="text-slate-200 text-xs">—</span>}
                        </td>
                        <td className="px-4 py-3.5 text-right ledger-mono">
                          {(() => {
                            const ob = balanceLabel(obMovement, accountType);
                            return <span className={`text-sm font-semibold ${ob.color}`}>{ob.text}</span>;
                          })()}
                        </td>
                      </tr>
                    )}
                    {rows.map(({ idx, entry, debitAmt, creditAmt, bal, counterParties }) => (
                      <tr key={entry._id} className="ledger-row">
                        <td className="px-4 py-3.5 text-xs text-slate-300 ledger-mono">
                          {String(idx + 1).padStart(2, "0")}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <p className="text-xs font-semibold text-slate-700 ledger-mono">
                            {fmtDate(entry.entryDate)}
                          </p>
                          <p className="text-[10px] text-slate-400 ledger-mono mt-0.5">
                            {fmtTime(entry.entryDate)}
                          </p>
                        </td>
                        <td className="px-4 py-3.5 max-w-[180px]">
                          <p className="text-sm font-medium text-slate-700 truncate">
                            {entry.debitLineDesc || entry.description || "—"}
                          </p>
                          {entry.comments && (
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">
                              {entry.comments}
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3.5 max-w-[160px]">
                          <span className="text-xs text-slate-500 truncate block">
                            {counterParties || "—"}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right ledger-mono">
                          {debitAmt > 0 ? (
                            <span className="text-emerald-600 font-semibold text-sm">
                              {fmt(debitAmt)}
                            </span>
                          ) : (
                            <span className="text-slate-200 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-right ledger-mono">
                          {creditAmt > 0 ? (
                            <span className="text-rose-500 font-semibold text-sm">
                              {fmt(creditAmt)}
                            </span>
                          ) : (
                            <span className="text-slate-200 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-right ledger-mono">
                          <span className={`text-sm font-semibold ${bal.color}`}>
                            {bal.text}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {/* Totals footer */}
                  <tfoot>
                    <tr className="border-t-2 border-slate-200 bg-slate-50">
                      <td colSpan={4} className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Totals
                      </td>
                      <td className="px-4 py-3 text-right ledger-mono font-bold text-emerald-600">
                        {fmt(rows.reduce((s, r) => s + r.debitAmt, 0))}
                      </td>
                      <td className="px-4 py-3 text-right ledger-mono font-bold text-rose-500">
                        {fmt(rows.reduce((s, r) => s + r.creditAmt, 0))}
                      </td>
                      <td className="px-4 py-3 text-right ledger-mono font-bold">
                        <span className={balLabel.color}>{balLabel.text}</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>

          {/* ── Reconciliation strip ── */}
          {rows.length > 0 && (
            <div className="bg-slate-900 text-white rounded-xl px-6 py-4 flex items-center justify-between">
              <span className="text-slate-400 text-sm">
                Total Debit{" "}
                <span className="text-emerald-400 ledger-mono font-medium">
                  {fmt(totalDebit)}
                </span>
                {"  −  "}
                Total Credit{" "}
                <span className="text-rose-400 ledger-mono font-medium">
                  {fmt(totalCredit)}
                </span>
              </span>
              <span className={`ledger-mono text-lg font-semibold ${balLabel.color}`}>
                = {balLabel.text}
              </span>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}