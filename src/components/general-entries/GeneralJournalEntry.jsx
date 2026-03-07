import React, { useEffect, useState, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import JournalNav from "../layout/JournalTopNav.jsx";
import { authFetch } from "../../utils/authFetch.js";

// ── Shared style constants (module scope — never recreated on render) ─────────
const inp      = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-300 bg-white";
const inpGreen = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition placeholder-gray-300 bg-white";

// ── Small reusable components ─────────────────────────────────────────────────
function Label({ children, required }) {
  return (
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
      {children}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  );
}

function Section({ label, color = "blue", children }) {
  const colors = {
    blue:  { border: "border-blue-200",  bg: "bg-blue-50",  dot: "bg-blue-500",  text: "text-blue-700"  },
    green: { border: "border-green-200", bg: "bg-green-50", dot: "bg-green-500", text: "text-green-700" },
  };
  const c = colors[color];
  return (
    <div className={`border ${c.border} rounded-2xl overflow-visible`}>
      <div className={`${c.bg} px-5 py-2.5 flex items-center gap-2 border-b ${c.border}`}>
        <span className={`w-2 h-2 rounded-full ${c.dot}`} />
        <span className={`text-xs font-bold uppercase tracking-widest ${c.text}`}>{label}</span>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// Flow: Date → Debit Account → Debit Amount → Debit Desc
//       → Credit Account → Credit Amount → Credit Desc
//       → (balanced) Comments   OR   (unbalanced) new Credit row (same flow)
// ─────────────────────────────────────────────────────────────────────────────
export default function GeneralJournalEntry() {

  // ── Refs ───────────────────────────────────────────────────────────────────
  const dateRef               = useRef(null);
  const debitAccountButtonRef = useRef(null);
  const debitSearchRef        = useRef(null);
  const debitListRef          = useRef(null);
  const debitAmountRef        = useRef(null);
  const debitDescRef          = useRef(null);
  const commentsRef           = useRef(null);
  const bulkFileRef           = useRef(null);                  // kept for potential bulk-upload UI

  // Per-credit-row refs (arrays)
  const creditAccountButtonRefs = useRef([]);
  const creditSearchRefs        = useRef([]);
  const creditListRefs          = useRef([]);
  const creditAmountRefs        = useRef([]);
  const creditDescRefs          = useRef([]);
  const deleteButtonRefs        = useRef([]);

  // ── State ──────────────────────────────────────────────────────────────────
  const [accounts,            setAccounts]            = useState([]);
  const [debitAccount,        setDebitAccount]        = useState("");
  const [debitSearch,         setDebitSearch]         = useState("");
  const [debitDropdownOpen,   setDebitDropdownOpen]   = useState(false);
  const [debitActiveIndex,    setDebitActiveIndex]    = useState(0);
  const [creditActiveIndexes, setCreditActiveIndexes] = useState({});
  const [debitAmount,         setDebitAmount]         = useState("");
  const [debitLineDesc,       setDebitLineDesc]       = useState("");
  const [comments,            setComments]            = useState("");
  const [entryDate,           setEntryDate]           = useState(() => new Date().toISOString().split("T")[0]);
  const [creditEntries,       setCreditEntries]       = useState([
    { account: "", amount: "", lineDesc: "", search: "", open: false },
  ]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType,    setNotificationType]    = useState("");
  const [bulkFile,            setBulkFile]            = useState(null);

  // ── Derived ────────────────────────────────────────────────────────────────
  const totalCredit  = creditEntries.reduce((s, c) => s + (parseFloat(String(c.amount).trim()) || 0), 0);
  const debitNumeric = parseFloat(String(debitAmount).trim()) || 0;
  const balanced     = debitNumeric > 0 && Math.abs(debitNumeric - totalCredit) <= 0.001;

  // ── Helpers ────────────────────────────────────────────────────────────────
  const notify = (msg, type = "info") => {
    setNotificationMessage("");
    setTimeout(() => { setNotificationMessage(msg); setNotificationType(type); }, 20);
  };

  const fmtDate = (v) => {
    const d = v.replace(/\D/g, "");
    if (d.length <= 4) return d;
    if (d.length <= 6) return `${d.slice(0,4)}-${d.slice(4)}`;
    return `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}`;
  };

  const filterAccounts = (q) =>
    accounts
      .filter(a =>
        a.accountName.toLowerCase().includes(q.toLowerCase()) ||
        a.accountType.toLowerCase().includes(q.toLowerCase())
      )
      .sort((a, b) => (b.starred ? 1 : 0) - (a.starred ? 1 : 0));

  // ── Dropdown helpers ───────────────────────────────────────────────────────
  /** Open debit dropdown (closes all credit dropdowns first) */
  const openDebitDD = () => {
    setCreditEntries(prev => prev.map(e => ({ ...e, open: false })));
    setDebitDropdownOpen(true);
    setDebitSearch("");
    setDebitActiveIndex(0);
    setTimeout(() => debitSearchRef.current?.focus(), 0);
  };

  /** Open credit dropdown at `index` (closes debit + all other credit dropdowns) */
  const openCreditDD = (index) => {
    setDebitDropdownOpen(false);
    setCreditEntries(prev => prev.map((e, i) => ({ ...e, open: i === index })));
    setCreditActiveIndexes(p => ({ ...p, [index]: 0 }));
    setTimeout(() => creditSearchRefs.current[index]?.focus(), 0);
  };

  /** Close a specific credit dropdown */
  const closeCreditDD = (index) =>
    setCreditEntries(prev => prev.map((e, i) => i === index ? { ...e, open: false } : e));

  /** Select a credit account — close dropdown, move focus to credit amount */
  const selectCreditAccount = (index, accId) => {
    setCreditEntries(prev => prev.map((e, i) =>
      i === index ? { ...e, account: accId, search: "", open: false } : e
    ));
    setTimeout(() => creditAmountRefs.current[index]?.focus(), 0);
  };

  // ── Credit row helpers ─────────────────────────────────────────────────────
  const creditChange = (index, field, value) =>
    setCreditEntries(prev => {
      const c = [...prev];
      c[index] = { ...c[index], [field]: value };
      return c;
    });

  const deleteCreditRow = (index) => {
    if (creditEntries.length === 1) { notify("At least one credit entry is required!", "warning"); return; }
    setCreditEntries(prev => prev.filter((_, i) => i !== index));
  };

  /**
   * Add a new credit row and immediately open its Account dropdown.
   * `prefillAccount` optionally pre-selects an account (still opens dropdown so user can change).
   */
  const addCreditRow = (prefillAccount = "") => {
    const newIdx = creditEntries.length;
    setCreditEntries(prev => [
      ...prev,
      { account: prefillAccount, amount: "", lineDesc: "", search: "", open: false },
    ]);
    // Open the new row's dropdown after state settles
    setTimeout(() => openCreditDD(newIdx), 0);
  };

  // ── Data fetch ─────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const res  = await authFetch(`${API_BASE_URL}/accounts`);
        const data = await res.json();
        if (res.ok) setAccounts(data);
        else notify("Failed to fetch accounts", "error");
      } catch { notify("Error fetching accounts", "error"); }
    })();
  }, []);

  // Auto-focus Date on mount
  useEffect(() => { setTimeout(() => dateRef.current?.focus(), 150); }, []);

  // ── Reset form ─────────────────────────────────────────────────────────────
  const resetForm = () => {
    setDebitAccount(""); setDebitAmount(""); setDebitLineDesc(""); setComments("");
    setCreditEntries([{ account: "", amount: "", lineDesc: "", search: "", open: false }]);
    creditAccountButtonRefs.current = [];
    creditAmountRefs.current        = [];
    creditSearchRefs.current        = [];
    creditDescRefs.current          = [];
    deleteButtonRefs.current        = [];
    setTimeout(() => dateRef.current?.focus(), 100);
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (!debitAccount || !String(debitAmount).trim() || !debitLineDesc.trim()) {
      notify("Please fill all required fields", "warning"); return;
    }
    const debit = parseFloat(String(debitAmount).trim()) || 0;
    if (Math.abs(debit - totalCredit) > 0.001) {
      notify("Debit and Credit amounts must be equal!", "error"); return;
    }
    for (const c of creditEntries) {
      if (!c.account || !String(c.amount).trim() || !c.lineDesc?.trim()) {
        notify("Please fill all required credit fields", "warning"); return;
      }
      if (parseFloat(String(c.amount)) <= 0) {
        notify("Credit amounts must be greater than 0", "warning"); return;
      }
    }
    try {
      const res = await authFetch(`${API_BASE_URL}/create-journal-entry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: debitLineDesc, debitLineDesc, debitAccount,
          debitAmount: debit,
          creditEntries: creditEntries.map(c => ({
            account: c.account,
            amount:  parseFloat(String(c.amount)),
            description: c.lineDesc || "",
          })),
          comments, entryDate,
        }),
      });
      const data = await res.json();
      if (res.ok) { notify(data.message || "Journal entry created!", "success"); resetForm(); }
      else throw new Error(data?.message || "Failed");
    } catch (err) { notify(err.message || "Server error", "error"); }
  };

  // ── Bulk upload ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!bulkFile) return;
    (async () => {
      const fd = new FormData();
      fd.append("file", bulkFile);
      try {
        const res  = await authFetch(`${API_BASE_URL}/bulk-upload-journal-entries`, { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Upload failed");
        notify(data.message, "success");
        if (data.failedRows?.length)
          notify("Some rows failed:\n" + data.failedRows.map(r => `Row ${r.row}: ${r.error}`).join("\n"), "warning");
        setBulkFile(null);
      } catch (err) { notify(err.message, "error"); }
    })();
  }, [bulkFile]);

  // ── Global keyboard shortcuts ──────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      const cmd = e.ctrlKey || e.metaKey;
      if (cmd && e.shiftKey && e.key === "D") {
        e.preventDefault();
        debitDropdownOpen ? (setDebitDropdownOpen(false), debitAccountButtonRef.current?.focus()) : openDebitDD();
      }
      if (cmd && e.shiftKey && e.key === "C") {
        e.preventDefault();
        const anyOpen = creditEntries.some(c => c.open);
        if (anyOpen) { setCreditEntries(prev => prev.map(e => ({ ...e, open: false }))); creditAccountButtonRefs.current[0]?.focus(); }
        else openCreditDD(0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [debitDropdownOpen, creditEntries]);

  // ── Click-outside to close dropdowns ──────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (debitListRef.current && !debitListRef.current.contains(e.target) &&
          debitAccountButtonRef.current && !debitAccountButtonRef.current.contains(e.target))
        setDebitDropdownOpen(false);
      creditListRefs.current.forEach((ref, i) => {
        if (ref && !ref.contains(e.target) &&
            creditAccountButtonRefs.current[i] && !creditAccountButtonRefs.current[i].contains(e.target))
          setCreditEntries(prev => prev.map((entry, idx) => idx === i ? { ...entry, open: false } : entry));
      });
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [creditEntries]);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <SidebarLayout>
      <JournalNav />

      <div className="max-w-5xl mx-auto pb-16">

        {/* Page header */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Accounts Module</p>
          <h1 className="text-2xl font-bold text-gray-800">General Journal Entry</h1>
          <p className="text-xs text-gray-400 mt-1">
            <kbd className="bg-gray-100 border border-gray-200 rounded px-1 py-0.5 font-mono text-[10px]">Ctrl+Shift+D</kbd> debit account &nbsp;·&nbsp;
            <kbd className="bg-gray-100 border border-gray-200 rounded px-1 py-0.5 font-mono text-[10px]">Ctrl+Shift+C</kbd> credit account &nbsp;·&nbsp;
            <kbd className="bg-gray-100 border border-gray-200 rounded px-1 py-0.5 font-mono text-[10px]">Enter</kbd> next field &nbsp;·&nbsp;
            <kbd className="bg-gray-100 border border-gray-200 rounded px-1 py-0.5 font-mono text-[10px]">↑↓</kbd> navigate dropdown
          </p>
        </div>

        {/* Date + Balance strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">

          {/* Date */}
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Entry Date</label>
            <input
              ref={dateRef}
              type="text"
              value={entryDate}
              onChange={(e) => setEntryDate(fmtDate(e.target.value))}
              placeholder="YYYY-MM-DD"
              maxLength={10}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-32 focus:ring-2 focus:ring-blue-500 outline-none transition font-mono"
              onKeyDown={(e) => {
                // Date ──► Debit Account dropdown
                if (e.key === "Enter") { e.preventDefault(); openDebitDD(); }
              }}
            />
          </div>

          {/* Balance chip */}
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-2.5 shadow-sm">
            <div className="text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Debit</p>
              <p className="text-sm font-bold text-blue-600 font-mono">
                Rs {debitNumeric.toLocaleString("en-PK", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Credit</p>
              <p className="text-sm font-bold text-green-600 font-mono">
                Rs {totalCredit.toLocaleString("en-PK", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            {balanced ? (
              <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Balanced
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {debitNumeric > 0 ? `Off by Rs ${Math.abs(debitNumeric - totalCredit).toFixed(2)}` : "Enter amounts"}
              </span>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* ══════════════════════════════════════════════════════════════════
              DEBIT SECTION
              Columns : Account | Amount | Line Desc
              Flow    : (Date →) Debit Account dropdown → Debit Amount → Debit Desc
                        (Debit Desc Enter →) Credit Account[0] dropdown
          ══════════════════════════════════════════════════════════════════ */}
          <Section label="Debit Entry" color="blue">
            <div className="grid md:grid-cols-3 gap-4">

              {/* ── Debit Account ── */}
              <div className="relative">
                <Label required>Debit Account</Label>
                <button
                  ref={debitAccountButtonRef}
                  type="button"
                  className="w-full text-left border border-gray-200 rounded-xl px-4 py-2.5 bg-white text-sm hover:ring-2 hover:ring-blue-400 focus:ring-2 focus:ring-blue-500 outline-none transition flex justify-between items-center"
                  onClick={() => debitDropdownOpen ? setDebitDropdownOpen(false) : openDebitDD()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); debitDropdownOpen ? setDebitDropdownOpen(false) : openDebitDD(); }
                    if (e.key === "ArrowDown") { e.preventDefault(); openDebitDD(); }
                    if (e.key === "Escape")    setDebitDropdownOpen(false);
                  }}
                >
                  <span className={debitAccount ? "text-gray-800 font-medium" : "text-gray-300"}>
                    {debitAccount ? accounts.find(a => a._id === debitAccount)?.accountName || "Select" : "Select debit account"}
                  </span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>

                {debitDropdownOpen && (
                  <div ref={debitListRef} className="absolute z-30 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                    <input
                      ref={debitSearchRef}
                      type="text"
                      value={debitSearch}
                      onChange={(e) => { setDebitSearch(e.target.value); setDebitActiveIndex(0); }}
                      placeholder="Search account…"
                      className="w-full border-b border-gray-100 px-4 py-2.5 text-sm outline-none rounded-t-xl sticky top-0 bg-white"
                      onKeyDown={(e) => {
                        const results = filterAccounts(debitSearch);
                        if (e.key === "ArrowDown") { e.preventDefault(); setDebitActiveIndex(i => Math.min(i + 1, results.length - 1)); }
                        if (e.key === "ArrowUp")   { e.preventDefault(); setDebitActiveIndex(i => Math.max(i - 1, 0)); }
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const acc = results[debitActiveIndex];
                          if (acc) {
                            setDebitAccount(acc._id);
                            setDebitDropdownOpen(false);
                            setDebitSearch("");
                            // Debit Account ──► Debit Amount
                            setTimeout(() => debitAmountRef.current?.focus(), 0);
                          }
                        }
                        if (e.key === "Escape") { setDebitDropdownOpen(false); debitAccountButtonRef.current?.focus(); }
                        if (e.key === "Tab")    setDebitDropdownOpen(false);
                      }}
                    />
                    {filterAccounts(debitSearch).map((acc, i) => (
                      <div
                        key={acc._id}
                        className={`px-4 py-2.5 text-sm cursor-pointer flex items-center gap-2 ${i === debitActiveIndex ? "bg-blue-50 text-blue-800 font-semibold" : "hover:bg-gray-50"}`}
                        onMouseEnter={() => setDebitActiveIndex(i)}
                        onClick={() => { setDebitAccount(acc._id); setDebitDropdownOpen(false); setDebitSearch(""); debitAmountRef.current?.focus(); }}
                      >
                        {acc.starred && <span className="text-yellow-400 text-xs">★</span>}
                        <span className="flex-1">{acc.accountName}</span>
                        <span className="text-xs text-gray-400">{acc.accountType}</span>
                      </div>
                    ))}
                    {filterAccounts(debitSearch).length === 0 && (
                      <div className="px-4 py-3 text-sm text-gray-400 text-center">No accounts found</div>
                    )}
                  </div>
                )}
              </div>

              {/* ── Debit Amount ── */}
              <div>
                <Label required>Debit Amount</Label>
                <input
                  ref={debitAmountRef}
                  type="number"
                  min="0"
                  step="0.01"
                  value={debitAmount}
                  onChange={(e) => setDebitAmount(e.target.value)}
                  placeholder="0.00"
                  className={inp}
                  onKeyDown={(e) => {
                    // Debit Amount ──► Debit Line Desc
                    if (e.key === "Enter") { e.preventDefault(); debitDescRef.current?.focus(); }
                  }}
                />
              </div>

              {/* ── Debit Line Desc ── */}
              <div>
                <Label>Line Description</Label>
                <input
                  ref={debitDescRef}
                  type="text"
                  value={debitLineDesc}
                  onChange={(e) => setDebitLineDesc(e.target.value)}
                  placeholder="Debit line narration"
                  className={inp}
                  onKeyDown={(e) => {
                    // Debit Line Desc ──► Credit Account[0] dropdown
                    if (e.key === "Enter") { e.preventDefault(); openCreditDD(0); }
                  }}
                />
              </div>
            </div>
          </Section>

          {/* ══════════════════════════════════════════════════════════════════
              CREDIT SECTION
              Columns : Account | Amount | Line Desc
              Flow per row:
                Credit Account dropdown ──► Credit Amount ──► Credit Line Desc
                Credit Line Desc Enter:
                  • not last row  ──► next row's Credit Account dropdown
                  • last row + balanced   ──► Comments
                  • last row + unbalanced ──► new row (opens Credit Account dropdown)
          ══════════════════════════════════════════════════════════════════ */}
          <Section label={`Credit Entries (${creditEntries.length})`} color="green">
            <div className="space-y-3">
              {creditEntries.map((entry, index) => (
                <div
                  key={index}
                  className={`grid md:grid-cols-3 gap-4 ${index > 0 ? "pt-3 border-t border-gray-100" : ""}`}
                >

                  {/* ── Credit Account ── */}
                  <div className="relative">
                    {index === 0 && <Label required>Credit Account</Label>}
                    <button
                      ref={(el) => (creditAccountButtonRefs.current[index] = el)}
                      type="button"
                      className="w-full text-left border border-gray-200 rounded-xl px-4 py-2.5 bg-white text-sm hover:ring-2 hover:ring-green-400 focus:ring-2 focus:ring-green-500 outline-none transition flex justify-between items-center"
                      onClick={() => entry.open ? closeCreditDD(index) : openCreditDD(index)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); entry.open ? closeCreditDD(index) : openCreditDD(index); }
                        if (e.key === "ArrowDown") { e.preventDefault(); openCreditDD(index); }
                        if (e.key === "Escape")    closeCreditDD(index);
                      }}
                    >
                      <span className={entry.account ? "text-gray-800 font-medium" : "text-gray-300"}>
                        {entry.account ? accounts.find(a => a._id === entry.account)?.accountName || "Select" : "Select credit account"}
                      </span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                      </svg>
                    </button>

                    {entry.open && (
                      <div ref={(el) => (creditListRefs.current[index] = el)} className="absolute z-30 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                        <input
                          ref={(el) => (creditSearchRefs.current[index] = el)}
                          type="text"
                          value={entry.search}
                          onChange={(e) => { creditChange(index, "search", e.target.value); setCreditActiveIndexes(p => ({ ...p, [index]: 0 })); }}
                          placeholder="Search or Esc to keep debit account…"
                          className="w-full border-b border-gray-100 px-4 py-2.5 text-sm outline-none rounded-t-xl sticky top-0 bg-white"
                          onKeyDown={(e) => {
                            const results = filterAccounts(entry.search);
                            const active  = creditActiveIndexes[index] || 0;
                            if (e.key === "ArrowDown") {
                              e.preventDefault();
                              const n = Math.min(active + 1, results.length - 1);
                              setCreditActiveIndexes(p => ({ ...p, [index]: n }));
                              creditListRefs.current[index]?.children[n + 1]?.scrollIntoView({ block: "nearest" });
                            }
                            if (e.key === "ArrowUp") {
                              e.preventDefault();
                              const n = Math.max(active - 1, 0);
                              setCreditActiveIndexes(p => ({ ...p, [index]: n }));
                              creditListRefs.current[index]?.children[n + 1]?.scrollIntoView({ block: "nearest" });
                            }
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const acc = results[active];
                              // If user selected an account → use it; else fall back to debit account
                              const chosenId = acc ? acc._id : (entry.account || debitAccount || "");
                              selectCreditAccount(index, chosenId);
                            }
                            if (e.key === "Escape") {
                              // Escape = keep current account (or default to debit account), go to amount
                              const fallback = entry.account || debitAccount || "";
                              if (!entry.account && fallback) creditChange(index, "account", fallback);
                              closeCreditDD(index);
                              setTimeout(() => creditAmountRefs.current[index]?.focus(), 0);
                            }
                            if (e.key === "Tab") closeCreditDD(index);
                          }}
                        />
                        {filterAccounts(entry.search).map((acc, i) => (
                          <div
                            key={acc._id}
                            className={`px-4 py-2.5 text-sm cursor-pointer flex items-center gap-2 ${i === (creditActiveIndexes[index] || 0) ? "bg-green-50 text-green-800 font-semibold" : "hover:bg-gray-50"}`}
                            onMouseEnter={() => setCreditActiveIndexes(p => ({ ...p, [index]: i }))}
                            onClick={() => selectCreditAccount(index, acc._id)}
                          >
                            {acc.starred && <span className="text-yellow-400 text-xs">★</span>}
                            <span className="flex-1">{acc.accountName}</span>
                            <span className="text-xs text-gray-400">{acc.accountType}</span>
                          </div>
                        ))}
                        {filterAccounts(entry.search).length === 0 && (
                          <div className="px-4 py-3 text-sm text-gray-400 text-center">
                            No accounts found — press <kbd className="bg-gray-100 px-1 rounded text-xs">Esc</kbd> to use debit account
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ── Credit Amount ── */}
                  <div>
                    {index === 0 && <Label required>Credit Amount</Label>}
                    <div className="flex items-center gap-2">
                      <input
                        ref={(el) => (creditAmountRefs.current[index] = el)}
                        type="number"
                        value={entry.amount}
                        placeholder="0.00"
                        className={inpGreen}
                        onChange={(e) => creditChange(index, "amount", e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key !== "Enter") return;
                          e.preventDefault();
                          // No account yet → open dropdown first
                          if (!entry.account) { openCreditDD(index); return; }
                          // Credit Amount ──► Credit Line Desc
                          creditDescRefs.current[index]?.focus();
                        }}
                      />
                      {creditEntries.length > 1 && (
                        <button
                          ref={(el) => (deleteButtonRefs.current[index] = el)}
                          type="button"
                          onClick={() => deleteCreditRow(index)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              deleteCreditRow(index);
                              setTimeout(() => (index > 0 ? creditAmountRefs.current[index - 1] : debitAmountRef.current)?.focus(), 0);
                            }
                          }}
                          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 border border-red-200 transition text-sm focus:ring-2 focus:ring-red-400 outline-none"
                          title="Delete row"
                        >✕</button>
                      )}
                    </div>
                  </div>

                  {/* ── Credit Line Desc ── */}
                  <div>
                    {index === 0 && <Label>Line Description</Label>}
                    <input
                      ref={(el) => (creditDescRefs.current[index] = el)}
                      type="text"
                      value={entry.lineDesc}
                      onChange={(e) => creditChange(index, "lineDesc", e.target.value)}
                      placeholder="Credit line description"
                      className={inpGreen}
                      onKeyDown={(e) => {
                        if (e.key !== "Enter") return;
                        e.preventDefault();

                        const isLastRow    = index === creditEntries.length - 1;
                        const latestDebit  = parseFloat(String(debitAmount).trim()) || 0;
                        const latestCredit = creditEntries.reduce((s, c) => s + (parseFloat(String(c.amount).trim()) || 0), 0);
                        const isBalanced   = latestDebit > 0 && Math.abs(latestDebit - latestCredit) <= 0.001;

                        if (!isLastRow) {
                          // Not last row ──► next row's Credit Account dropdown
                          openCreditDD(index + 1);
                        } else if (isBalanced) {
                          // Last row + balanced ──► Comments
                          commentsRef.current?.focus();
                        } else {
                          // Last row + unbalanced ──► add new row, open its Credit Account dropdown
                          addCreditRow(entry.account || debitAccount || "");
                        }
                      }}
                    />
                  </div>

                </div>
              ))}
            </div>

            {/* Manual "Add Credit Row" button */}
            <button
              type="button"
              onClick={() => addCreditRow()}
              className="mt-4 flex items-center gap-2 text-xs font-bold text-green-600 hover:text-green-800 border border-dashed border-green-300 hover:border-green-500 rounded-xl px-4 py-2 transition w-full justify-center"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
              </svg>
              Add Credit Row
            </button>
          </Section>

          {/* ── Comments ── */}
          <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4">
            <Label>Comments / Narration</Label>
            <textarea
              ref={commentsRef}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={2}
              placeholder="Optional notes or narration for this entry…"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-gray-400 outline-none transition resize-none placeholder-gray-300"
              onKeyDown={(e) => {
                // Comments Enter (no Shift) ──► Save
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(e); }
              }}
            />
          </div>

          {/* ── Submit button ── */}
          <button
            type="submit"
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition ${
              balanced
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {balanced ? "Save Journal Entry →" : "Complete entry to save"}
          </button>

        </form>
      </div>

      <Notification
        message={notificationMessage}
        type={notificationType}
        onClose={() => setNotificationMessage("")}
      />
    </SidebarLayout>
  );
}