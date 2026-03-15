import React, { useState, useEffect, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";
import Notification from "../Notification";

// ─── Searchable Account Select ────────────────────────────────────────────────
function SearchableAccountSelect({ accounts, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);
  const containerRef = useRef(null);

  const filtered = accounts.filter((a) =>
    a.accountName.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open && searchRef.current) setTimeout(() => searchRef.current?.focus(), 0);
  }, [open]);

  useEffect(() => {
    const h = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false); setQuery("");
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left border border-gray-200 rounded-lg px-3 py-2 bg-white text-sm truncate focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-gray-300 transition"
      >
        {value || <span className="text-gray-300">Select account…</span>}
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <div className="p-2 border-b bg-gray-50">
            <input ref={searchRef} type="text" value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search accounts…"
              className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>
          <ul className="max-h-48 overflow-y-auto">
            {filtered.length === 0
              ? <li className="px-3 py-2 text-sm text-gray-400">No accounts found</li>
              : filtered.map((a) => (
                <li key={a._id}
                  onClick={() => { onChange(a.accountName); setOpen(false); setQuery(""); }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-indigo-50 transition ${value === a.accountName ? "bg-indigo-100 font-semibold text-indigo-700" : "text-gray-700"}`}
                >
                  {a.accountName}
                </li>
              ))
            }
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Empty entry factory ──────────────────────────────────────────────────────
const newEntry = () => ({ account: "", description: "", amount: "", mode: "debit" });

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CashbookForm() {
  const [accounts, setAccounts] = useState([]);
  const [openingRequired, setOpeningRequired] = useState(null);
  const [openingBalance, setOpeningBalance] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [cashAccountId, setCashAccountId] = useState(localStorage.getItem("cashAccountId") || "");
  const [notification, setNotification] = useState({ message: "", type: "info" });
  const [saving, setSaving] = useState(false);

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [entries, setEntries] = useState([newEntry()]);
  const [comment, setComment] = useState("");

  useEffect(() => { fetchAccounts(); checkCashbook(); }, []);

  const fetchAccounts = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/accounts`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch accounts");
      setAccounts(Array.isArray(data) ? data.filter(a => !a.isProtected) : []);
    } catch (err) { setNotification({ message: err.message, type: "error" }); }
  };

  const checkCashbook = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/cashbook-report`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load cashbook");
      const year = new Date().getFullYear();
      const cb = data.cashbooks?.find(c => c.year === year);
      if (cb) {
        setOpeningBalance(cb.openingBalance);
        setCurrentBalance(data.currentBalance ?? cb.openingBalance);
        if (data.cashAccountId) { localStorage.setItem("cashAccountId", data.cashAccountId); setCashAccountId(data.cashAccountId); }
        setOpeningRequired(false);
      } else {
        if (data.cashAccountId) { localStorage.setItem("cashAccountId", data.cashAccountId); setCashAccountId(data.cashAccountId); }
        setOpeningRequired(true);
      }
    } catch (err) { setNotification({ message: err.message, type: "error" }); setOpeningRequired(true); }
  };

  const updateEntry = (idx, field, val) => {
    setEntries(prev => prev.map((e, i) => i === idx ? { ...e, [field]: val } : e));
  };

  const removeEntry = (idx) => {
    if (entries.length === 1) return;
    setEntries(prev => prev.filter((_, i) => i !== idx));
  };

  // Running projected balance across all entries
  const projectedBalance = entries.reduce((bal, e) => {
    const amt = Number(e.amount) || 0;
    return e.mode === "debit" ? bal + amt : bal - amt;  // debit=cash IN=+, credit=cash OUT=-
  }, currentBalance);

  const handleSave = async () => {
    // Validate all lines
    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      if (!e.account) { setNotification({ message: `Entry ${i + 1}: Select a counter account.`, type: "error" }); return; }
      if (!Number(e.amount) || Number(e.amount) <= 0) { setNotification({ message: `Entry ${i + 1}: Enter a valid amount.`, type: "error" }); return; }
    }

    // Resolve cashAccountId
    let CASH_ID = cashAccountId || localStorage.getItem("cashAccountId") || "";
    if (!CASH_ID) {
      try {
        const r = await authFetch(`${API_BASE_URL}/cashbook-report`);
        const d = await r.json();
        if (d.cashAccountId) { CASH_ID = d.cashAccountId; setCashAccountId(d.cashAccountId); localStorage.setItem("cashAccountId", d.cashAccountId); }
      } catch (_) {}
    }
    if (!CASH_ID) { setNotification({ message: "CASH IN HAND account not found. Please reload.", type: "error" }); return; }

    setSaving(true);
    let successCount = 0;
    let newBalance = currentBalance;

    for (const e of entries) {
      const acc = accounts.find(a => a.accountName === e.account);
      if (!acc) continue;
      const amt = Number(e.amount);

      let payload;
      if (e.mode === "debit") {
        // Cash DEBITED = cash coming IN → debit CASH IN HAND, credit counter account
        payload = {
          entryDate: date,
          comments: comment,
          debitAccount: CASH_ID,
          debitAmount: amt,
          debitLineDesc: e.description || "Cash Received",
          creditEntries: [{ account: acc._id, amount: amt, description: e.description || "Cash Received" }],
          cashAccountId: CASH_ID,   // triggers balance recompute in controller
        };
        newBalance += amt;
      } else {
        // Cash CREDITED = cash going OUT → debit counter account, credit CASH IN HAND
        payload = {
          entryDate: date,
          comments: comment,
          debitAccount: acc._id,
          debitAmount: amt,
          debitLineDesc: e.description || "Cash Payment",
          creditEntries: [{ account: CASH_ID, amount: amt, description: e.description || "Cash Payment" }],
          cashAccountId: CASH_ID,   // triggers balance recompute in controller
        };
        newBalance -= amt;
      }

      try {
        const res = await authFetch(`${API_BASE_URL}/create-journal-entry`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) { setNotification({ message: `Entry failed: ${data.message}`, type: "error" }); setSaving(false); return; }
        if (data.currentBalance !== undefined) newBalance = data.currentBalance;
        successCount++;
      } catch (err) { setNotification({ message: err.message, type: "error" }); setSaving(false); return; }
    }

    setCurrentBalance(newBalance);
    setEntries([newEntry()]);
    setComment("");
    setNotification({ message: `${successCount} entr${successCount === 1 ? "y" : "ies"} saved successfully!`, type: "success" });
    setSaving(false);
  };

  // ── Loading ──
  if (openingRequired === null) {
    return (
      <SidebarLayout>
        <div className="max-w-4xl mx-auto flex items-center justify-center h-48 text-gray-400 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"/>
            Loading cashbook…
          </div>
        </div>
      </SidebarLayout>
    );
  }

  // ── No active season gate ──
  if (openingRequired) {
    return (
      <SidebarLayout>
        <div className="max-w-md mx-auto mt-20">
          <div className="bg-white shadow-xl rounded-2xl p-8 space-y-5 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center mx-auto">
              <span className="text-3xl">📅</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 mb-2">No Active Season</h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                Create and activate a season in Profile → Seasons first.<br/>
                This sets the opening balance for your CASH IN HAND account.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-left text-sm text-blue-700 space-y-1">
              <p className="font-semibold">How to set up:</p>
              <p>1. Go to <strong>Profile → Seasons</strong></p>
              <p>2. Click <strong>+ New Season</strong>, set dates + opening balance</p>
              <p>3. Click <strong>Activate</strong></p>
              <p>4. Come back here to record entries</p>
            </div>
            <a href="/profile" className="block w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition text-sm">
              Go to Profile → Seasons →
            </a>
          </div>
        </div>
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "info" })}/>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <div className="max-w-4xl mx-auto">

        {/* ── Balance bar ── */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Opening Balance</p>
            <p className="text-xl font-bold text-gray-700 tabular-nums">Rs {Number(openingBalance).toLocaleString()}</p>
          </div>
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">Current Balance</p>
            <p className="text-xl font-bold text-indigo-700 tabular-nums">Rs {Number(currentBalance).toLocaleString()}</p>
          </div>
          <div className={`border shadow-sm rounded-2xl p-4 transition-colors ${
            projectedBalance !== currentBalance
              ? projectedBalance >= currentBalance ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"
              : "bg-gray-50 border-gray-100"
          }`}>
            <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
              projectedBalance !== currentBalance
                ? projectedBalance >= currentBalance ? "text-green-500" : "text-red-400"
                : "text-gray-400"
            }`}>After Save</p>
            <p className={`text-xl font-bold tabular-nums ${
              projectedBalance !== currentBalance
                ? projectedBalance >= currentBalance ? "text-green-700" : "text-red-600"
                : "text-gray-400"
            }`}>
              {projectedBalance !== currentBalance ? `Rs ${Number(projectedBalance).toLocaleString()}` : "—"}
            </p>
          </div>
        </div>

        {/* ── Form card ── */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-800">Cashbook Entries</h1>
              <p className="text-xs text-gray-400 mt-0.5">Each line saves as an individual journal entry</p>
            </div>
            <input
              type="date" value={date} onChange={e => setDate(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div className="p-6 space-y-3">
            {/* ── Column headers ── */}
            <div className="grid grid-cols-[130px_1fr_1fr_130px_36px] gap-2 px-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Type</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Counter Account</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Description</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Amount (Rs)</p>
              <span/>
            </div>

            {/* ── Entry rows ── */}
            {entries.map((entry, idx) => (
              <div key={idx} className={`grid grid-cols-[130px_1fr_1fr_130px_36px] gap-2 p-3 rounded-xl border transition ${
                entry.mode === "debit"
                  ? "bg-green-50 border-green-100"
                  : "bg-red-50 border-red-100"
              }`}>
                {/* Debit / Credit toggle */}
                <div className="flex rounded-lg overflow-hidden border border-gray-200 bg-white text-xs font-semibold h-9">
                  <button type="button"
                    onClick={() => updateEntry(idx, "mode", "debit")}
                    className={`flex-1 flex items-center justify-center gap-1 transition ${
                      entry.mode === "debit" ? "bg-green-500 text-white" : "text-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-[10px]">▲</span> Cash In
                  </button>
                  <button type="button"
                    onClick={() => updateEntry(idx, "mode", "credit")}
                    className={`flex-1 flex items-center justify-center gap-1 transition ${
                      entry.mode === "credit" ? "bg-red-500 text-white" : "text-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-[10px]">▼</span> Cash Out
                  </button>
                </div>

                {/* Counter account */}
                <SearchableAccountSelect
                  accounts={accounts}
                  value={entry.account}
                  onChange={val => updateEntry(idx, "account", val)}
                />

                {/* Description */}
                <input
                  type="text" placeholder="Description (optional)"
                  value={entry.description}
                  onChange={e => updateEntry(idx, "description", e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none bg-white"
                />

                {/* Amount */}
                <input
                  type="number" min="0" placeholder="0"
                  value={entry.amount}
                  onChange={e => updateEntry(idx, "amount", e.target.value)}
                  className={`border rounded-lg px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-indigo-400 outline-none bg-white tabular-nums ${
                    entry.mode === "debit" ? "border-green-200 text-green-700" : "border-red-200 text-red-600"
                  }`}
                />

                {/* Remove */}
                <button type="button" onClick={() => removeEntry(idx)}
                  disabled={entries.length === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-300 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            ))}

            {/* ── Add entry ── */}
            <button type="button"
              onClick={() => setEntries(p => [...p, newEntry()])}
              className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm font-medium text-gray-400 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50 transition flex items-center justify-center gap-2"
            >
              <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
              </svg>
              Add Another Entry
            </button>

            {/* ── Comment + summary ── */}
            <div className="flex flex-col gap-3 pt-2">
              <input
                type="text" placeholder="Remarks / comments (optional, applies to all entries)"
                value={comment} onChange={e => setComment(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
              />

              {/* Entry summary line */}
              {entries.some(e => Number(e.amount) > 0) && (
                <div className="flex flex-wrap gap-2 text-xs">
                  {entries.filter(e => Number(e.amount) > 0).map((e, i) => (
                    <span key={i} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold border ${
                      e.mode === "debit"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-600 border-red-200"
                    }`}>
                      {e.mode === "debit" ? "▲" : "▼"}
                      {e.account || "…"} · Rs {Number(e.amount).toLocaleString()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Footer / Save ── */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">{entries.length}</span> entr{entries.length === 1 ? "y" : "ies"} — will be saved individually
            </div>
            <button
              type="button" onClick={handleSave} disabled={saving}
              className="px-7 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm shadow-indigo-200"
            >
              {saving ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> Saving…</>
              ) : (
                <><svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>Save {entries.length > 1 ? `${entries.length} Entries` : "Entry"}</>
              )}
            </button>
          </div>
        </div>

        <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "info" })}/>
      </div>
    </SidebarLayout>
  );
}