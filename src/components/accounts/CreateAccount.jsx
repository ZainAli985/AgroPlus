import React, { useState, useRef, useEffect } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import { authFetch } from "../../utils/authFetch.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  .ca2 *, .ca2 *::before, .ca2 *::after { box-sizing: border-box; }
  .ca2 {
    font-family: 'DM Sans', sans-serif;
    max-width: 480px; width: 100%; margin: 0 auto;
  }
  .ca2-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #94a3b8; margin-bottom: 4px; }
  .ca2-title   { font-family: 'Lora', serif; font-size: 24px; font-weight: 700; color: #0f172a; letter-spacing: -.3px; line-height: 1.2; }
  .ca2-sub     { font-size: 12.5px; color: #94a3b8; margin-top: 4px; }

  /* ── combobox ── */
  .ca2-combo { position: relative; margin-top: 24px; }

  .ca2-trigger {
    width: 100%; display: flex; align-items: center; gap: 10px;
    padding: 11px 14px; border: 1.5px solid #e2e8f0; border-radius: 12px;
    background: #fff; cursor: pointer; text-align: left;
    transition: border-color .15s, box-shadow .15s; outline: none;
    font-family: 'DM Sans', sans-serif;
  }
  .ca2-trigger:focus, .ca2-trigger.open {
    border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.1);
  }
  .ca2-trigger-icon { font-size: 17px; flex-shrink: 0; width: 26px; text-align: center; }
  .ca2-trigger-text { flex: 1; }
  .ca2-trigger-label { font-size: 13.5px; font-weight: 600; color: #0f172a; }
  .ca2-trigger-meta  { font-size: 11px; color: #94a3b8; margin-top: 1px; }
  .ca2-trigger-placeholder { font-size: 13.5px; color: #cbd5e1; flex: 1; }
  .ca2-trigger-chevron { color: #94a3b8; flex-shrink: 0; transition: transform .18s; }
  .ca2-trigger.open .ca2-trigger-chevron { transform: rotate(180deg); }
  .ca2-trigger-clear {
    flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%;
    background: #f1f5f9; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center; color: #94a3b8;
    transition: background .12s, color .12s;
  }
  .ca2-trigger-clear:hover { background: #fee2e2; color: #ef4444; }

  /* dropdown panel */
  .ca2-panel {
    position: absolute; top: calc(100% + 6px); left: 0; right: 0; z-index: 100;
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px;
    box-shadow: 0 8px 30px rgba(0,0,0,.12); overflow: hidden;
  }

  /* search inside panel */
  .ca2-panel-search-wrap { padding: 10px 10px 6px; border-bottom: 1px solid #f1f5f9; }
  .ca2-panel-search {
    width: 100%; padding: 8px 12px 8px 34px; border: 1.5px solid #e2e8f0;
    border-radius: 8px; font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #0f172a; outline: none; background: #f8fafc;
    transition: border-color .12s, box-shadow .12s;
  }
  .ca2-panel-search:focus { border-color: #6366f1; box-shadow: 0 0 0 2px rgba(99,102,241,.1); background: #fff; }
  .ca2-panel-search-icon { position: absolute; left: 22px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; }
  .ca2-panel-search-wrap { position: relative; padding: 10px 10px 6px; }

  /* list */
  .ca2-list { max-height: 260px; overflow-y: auto; padding: 6px 6px; scrollbar-width: thin; scrollbar-color: #e2e8f0 transparent; }
  .ca2-list::-webkit-scrollbar { width: 4px; }
  .ca2-list::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }

  /* group label inside list */
  .ca2-list-group {
    font-size: 9.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
    color: #cbd5e1; padding: 8px 8px 4px; user-select: none;
  }

  /* option row */
  .ca2-opt {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 10px; border-radius: 9px; cursor: pointer;
    transition: background .1s; border: none; background: none;
    width: 100%; text-align: left; font-family: 'DM Sans', sans-serif;
  }
  .ca2-opt:hover   { background: #f5f3ff; }
  .ca2-opt.active  { background: #eef2ff; }
  .ca2-opt-icon    { font-size: 15px; width: 22px; text-align: center; flex-shrink: 0; }
  .ca2-opt-label   { font-size: 13px; font-weight: 600; color: #374151; flex: 1; }
  .ca2-opt.active .ca2-opt-label { color: #4338ca; }
  .ca2-opt-badge {
    font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 10px;
    flex-shrink: 0;
  }
  .ca2-opt-check { color: #6366f1; flex-shrink: 0; }

  .badge-assets      { background: #dbeafe; color: #1d4ed8; }
  .badge-liabilities { background: #fee2e2; color: #b91c1c; }
  .badge-equity      { background: #ede9fe; color: #6d28d9; }
  .badge-revenue     { background: #d1fae5; color: #065f46; }
  .badge-expense     { background: #ffedd5; color: #c2410c; }

  .ca2-no-results { text-align: center; padding: 20px; font-size: 12.5px; color: #cbd5e1; font-style: italic; }

  /* ── detail form (inline, below trigger) ── */
  .ca2-form {
    margin-top: 12px; background: #fff;
    border: 1.5px solid #e2e8f0; border-radius: 14px; overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,.05);
    animation: ca2Slide .18s cubic-bezier(.4,0,.2,1) both;
  }
  @keyframes ca2Slide {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* type strip */
  .ca2-strip {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 16px; border-bottom: 1px solid #f1f5f9; background: #f8fafc;
  }
  .ca2-strip-pill { font-size: 11px; font-weight: 700; padding: 2px 9px; border-radius: 20px; }
  .ca2-strip-sep  { color: #e2e8f0; font-size: 12px; }
  .ca2-strip-auto { font-size: 10.5px; color: #c7d2fe; font-style: italic; margin-left: auto; }

  .ca2-form-body { padding: 16px; display: flex; flex-direction: column; gap: 14px; }

  .ca2-lbl { display: block; font-size: 11.5px; font-weight: 700; color: #475569; margin-bottom: 5px; letter-spacing: .01em; }
  .ca2-lbl em { color: #ef4444; font-style: normal; margin-left: 2px; }
  .ca2-lbl small { color: #94a3b8; font-weight: 400; font-size: 11px; margin-left: 4px; }
  .ca2-inp {
    width: 100%; padding: 9px 13px; border-radius: 9px;
    border: 1.5px solid #e2e8f0; font-size: 13.5px; color: #0f172a;
    font-family: 'DM Sans', sans-serif; background: #fff;
    outline: none; transition: border-color .15s, box-shadow .15s;
  }
  .ca2-inp::placeholder { color: #cbd5e1; }
  .ca2-inp:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.1); }
  .ca2-inp.mono  { font-family: 'DM Mono', monospace; font-size: 13px; }

  /* preview row */
  .ca2-preview {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 13px; background: #f8fafc; border-radius: 9px;
    border: 1.5px solid #e2e8f0;
  }
  .ca2-preview-icon { font-size: 22px; flex-shrink: 0; }
  .ca2-preview-name { font-family: 'Lora', serif; font-size: 15px; font-weight: 600; color: #0f172a; font-style: italic; }
  .ca2-preview-meta { font-size: 11px; color: #94a3b8; margin-top: 1px; }
  .ca2-preview-ref  { font-family: 'DM Mono', monospace; font-size: 11px; color: #6366f1; background: #eef2ff; padding: 1px 6px; border-radius: 5px; margin-top: 3px; display: inline-block; }

  /* form footer */
  .ca2-form-foot {
    padding: 12px 16px; border-top: 1px solid #f1f5f9;
    background: #fafafa; display: flex; justify-content: flex-end; gap: 8px;
  }
  .ca2-btn-primary {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 20px; border-radius: 9px; border: none; cursor: pointer;
    background: #4f46e5; color: #fff; font-size: 12.5px; font-weight: 700;
    font-family: 'DM Sans', sans-serif; box-shadow: 0 2px 8px rgba(79,70,229,.25);
    transition: background .14s;
  }
  .ca2-btn-primary:hover:not(:disabled) { background: #4338ca; }
  .ca2-btn-primary:disabled { opacity: .45; cursor: not-allowed; }
  .ca2-btn-ghost {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 16px; border-radius: 9px; border: 1.5px solid #e2e8f0;
    cursor: pointer; background: #fff; color: #64748b; font-size: 12.5px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; transition: all .12s;
  }
  .ca2-btn-ghost:hover { border-color: #94a3b8; color: #334155; }

  @keyframes ca2-spin { to { transform: rotate(360deg); } }
  .ca2-spin { animation: ca2-spin .8s linear infinite; display: inline-block; }
`;

/* ─── Catalogue ───────────────────────────────────────────────────────────── */
const ACCOUNTS = [
  { label:"Bank",                 accountType:"Assets",      subAccountType:"Current Assets",      icon:"🏦", badgeClass:"badge-assets",      typeClass:"badge-assets" },
  { label:"Customer",             accountType:"Assets",      subAccountType:"Current Assets",      icon:"👤", badgeClass:"badge-assets",      typeClass:"badge-assets" },
  { label:"Inventory",            accountType:"Assets",      subAccountType:"Current Assets",      icon:"📦", badgeClass:"badge-assets",      typeClass:"badge-assets" },
  { label:"Loan Given",           accountType:"Assets",      subAccountType:"Current Assets",      icon:"💳", badgeClass:"badge-assets",      typeClass:"badge-assets" },
  { label:"Cash In Hand",         accountType:"Assets",      subAccountType:"Current Assets",      icon:"💵", badgeClass:"badge-assets",      typeClass:"badge-assets" },
  { label:"Building",             accountType:"Assets",      subAccountType:"Fixed Assets",        icon:"🏢", badgeClass:"badge-assets",      typeClass:"badge-assets" },
  { label:"Vehicle",              accountType:"Assets",      subAccountType:"Fixed Assets",        icon:"🚛", badgeClass:"badge-assets",      typeClass:"badge-assets" },
  { label:"Equipment",            accountType:"Assets",      subAccountType:"Fixed Assets",        icon:"⚙️", badgeClass:"badge-assets",      typeClass:"badge-assets" },
  { label:"Tool",                 accountType:"Assets",      subAccountType:"Fixed Assets",        icon:"🔧", badgeClass:"badge-assets",      typeClass:"badge-assets" },
  { label:"Furniture",            accountType:"Assets",      subAccountType:"Fixed Assets",        icon:"🪑", badgeClass:"badge-assets",      typeClass:"badge-assets" },
  { label:"Employee",             accountType:"Liabilities", subAccountType:"Current Liabilities", icon:"👷", badgeClass:"badge-liabilities", typeClass:"badge-liabilities" },
  { label:"Supplier",             accountType:"Liabilities", subAccountType:"Current Liabilities", icon:"🏭", badgeClass:"badge-liabilities", typeClass:"badge-liabilities" },
  { label:"Loan Taken",           accountType:"Liabilities", subAccountType:"Current Liabilities", icon:"🏦", badgeClass:"badge-liabilities", typeClass:"badge-liabilities" },
  { label:"Tax Payable",          accountType:"Liabilities", subAccountType:"Current Liabilities", icon:"🧾", badgeClass:"badge-liabilities", typeClass:"badge-liabilities" },
  { label:"Accrued Expenses",     accountType:"Liabilities", subAccountType:"Current Liabilities", icon:"📝", badgeClass:"badge-liabilities", typeClass:"badge-liabilities" },
  { label:"Installments",         accountType:"Liabilities", subAccountType:"Fixed Liabilities",   icon:"📅", badgeClass:"badge-liabilities", typeClass:"badge-liabilities" },
  { label:"Investor",             accountType:"Equity",      subAccountType:"Equity",              icon:"💼", badgeClass:"badge-equity",      typeClass:"badge-equity" },
  { label:"Shareholder's Account",accountType:"Equity",      subAccountType:"Shareholders Account",icon:"📊", badgeClass:"badge-equity",      typeClass:"badge-equity" },
  { label:"Other Income",         accountType:"Revenue",     subAccountType:"Revenue",             icon:"📈", badgeClass:"badge-revenue",     typeClass:"badge-revenue" },
  { label:"Expense",              accountType:"Expense",     subAccountType:"Expenses",            icon:"💸", badgeClass:"badge-expense",     typeClass:"badge-expense" },
];

const TYPE_ORDER = ["Assets","Liabilities","Equity","Revenue","Expense"];
const SUB_LABEL  = { "Current Assets":"Current","Fixed Assets":"Fixed","Current Liabilities":"Current","Fixed Liabilities":"Fixed","Equity":"Equity","Shareholders Account":"Shareholders","Revenue":"Revenue","Expenses":"Expense" };

function buildGroups(list) {
  const map = {};
  list.forEach(a => {
    const key = `${a.accountType}||${a.subAccountType}`;
    if (!map[key]) map[key] = { type:a.accountType, subType:a.subAccountType, items:[] };
    map[key].items.push(a);
  });
  return Object.values(map).sort((a,b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type));
}

const NAME_HINTS = {
  Bank:"e.g. HBL Current Account", Customer:"e.g. Ahmed Traders",
  Supplier:"e.g. Ali Rice Mills",  Employee:"e.g. Usman – Loader",
  Vehicle:"e.g. Truck LEA-1234",   Building:"e.g. Warehouse – Main Gate",
  Expense:"e.g. Electricity Bill", Inventory:"e.g. Paddy Stock",
};

export default function CreateAccount() {
  const [open,        setOpen]        = useState(false);
  const [search,      setSearch]      = useState("");
  const [selected,    setSelected]    = useState(null);
  const [accountName, setAccountName] = useState("");
  const [ledgerRef,   setLedgerRef]   = useState("");
  const [submitting,  setSubmitting]  = useState(false);
  const [notification,setNotification]= useState({ message:"", type:"info" });

  const comboRef   = useRef(null);
  const searchRef  = useRef(null);
  const nameRef    = useRef(null);

  /* close dropdown on outside click */
  useEffect(() => {
    const h = e => { if (comboRef.current && !comboRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  /* focus search when dropdown opens */
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 60);
  }, [open]);

  /* focus name field when account selected */
  useEffect(() => {
    if (selected) setTimeout(() => nameRef.current?.focus(), 80);
  }, [selected]);

  const filtered = search.trim()
    ? ACCOUNTS.filter(a => a.label.toLowerCase().includes(search.toLowerCase()))
    : ACCOUNTS;
  const groups = buildGroups(filtered);

  const handlePick = (acct) => {
    setSelected(acct);
    setAccountName("");
    setLedgerRef("");
    setOpen(false);
    setSearch("");
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setSelected(null);
    setAccountName("");
    setLedgerRef("");
  };

  const isValid = selected && accountName.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    try {
      const res  = await authFetch(`${API_BASE_URL}/create-account`, {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          accountType:    selected.accountType,
          subAccountType: selected.subAccountType,
          accountName:    accountName.trim(),
          LedgerRef:      ledgerRef.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setNotification({ message: data.message || "Account created!", type:"success" });
        setSelected(null); setAccountName(""); setLedgerRef("");
      } else {
        setNotification({ message: data.message || "Failed to create account.", type:"error" });
      }
    } catch {
      setNotification({ message:"Server error. Try again.", type:"error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message:"", type:"info" })}
      />

      <div className="ca2">

        {/* header */}
        <div style={{ marginBottom: 6 }}>
          <p className="ca2-eyebrow">Accounts</p>
          <h1 className="ca2-title">Create New Account</h1>
          <p className="ca2-sub">Choose a category — type &amp; sub-type fill automatically</p>
        </div>

        {/* ── Combobox ── */}
        <div className="ca2-combo" ref={comboRef}>

          {/* Trigger button */}
          <button
            type="button"
            className={`ca2-trigger${open ? " open" : ""}`}
            onClick={() => setOpen(o => !o)}
          >
            {selected ? (
              <>
                <span className="ca2-trigger-icon">{selected.icon}</span>
                <span className="ca2-trigger-text">
                  <span className="ca2-trigger-label">{selected.label}</span>
                  <span className="ca2-trigger-meta">{selected.accountType} · {SUB_LABEL[selected.subAccountType] ?? selected.subAccountType}</span>
                </span>
                <button className="ca2-trigger-clear" onClick={handleClear} title="Clear">
                  <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </>
            ) : (
              <span className="ca2-trigger-placeholder">Select account category…</span>
            )}
            <span className="ca2-trigger-chevron">
              <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </span>
          </button>

          {/* Dropdown panel */}
          {open && (
            <div className="ca2-panel">
              <div className="ca2-panel-search-wrap">
                <span className="ca2-panel-search-icon">
                  <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"/>
                  </svg>
                </span>
                <input
                  ref={searchRef}
                  className="ca2-panel-search"
                  placeholder="Search…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Escape") setOpen(false);
                    if (e.key === "Enter" && filtered.length === 1) handlePick(filtered[0]);
                  }}
                />
              </div>
              <div className="ca2-list">
                {groups.length === 0 ? (
                  <div className="ca2-no-results">No accounts found</div>
                ) : (
                  groups.map(group => (
                    <div key={`${group.type}||${group.subType}`}>
                      <div className="ca2-list-group">
                        {group.type} · {group.subType}
                      </div>
                      {group.items.map(acct => {
                        const isActive = selected?.label === acct.label && selected?.subAccountType === acct.subAccountType;
                        return (
                          <button
                            key={`${acct.label}-${acct.subAccountType}`}
                            type="button"
                            className={`ca2-opt${isActive ? " active" : ""}`}
                            onClick={() => handlePick(acct)}
                          >
                            <span className="ca2-opt-icon">{acct.icon}</span>
                            <span className="ca2-opt-label">{acct.label}</span>
                            <span className={`ca2-opt-badge ${acct.badgeClass}`}>{acct.accountType}</span>
                            {isActive && (
                              <span className="ca2-opt-check">
                                <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                                </svg>
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Inline form — appears after selection ── */}
        {selected && (
          <div className="ca2-form">

            {/* auto-assigned type strip */}
            <div className="ca2-strip">
              <span className={`ca2-strip-pill ${selected.typeClass}`}>{selected.accountType}</span>
              <span className="ca2-strip-sep">›</span>
              <span className="ca2-strip-pill" style={{ background:"#f1f5f9", color:"#475569" }}>{selected.subAccountType}</span>
              <span className="ca2-strip-auto">auto-assigned</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="ca2-form-body">

                {/* Name */}
                <div>
                  <label className="ca2-lbl">Account Name <em>*</em></label>
                  <input
                    ref={nameRef}
                    className="ca2-inp"
                    value={accountName}
                    onChange={e => setAccountName(e.target.value)}
                    placeholder={NAME_HINTS[selected.label] ?? `e.g. ${selected.label} – Main`}
                    required
                  />
                </div>

                {/* Ledger ref */}
                <div>
                  <label className="ca2-lbl">Ledger Reference <small>(optional)</small></label>
                  <input
                    className="ca2-inp mono"
                    value={ledgerRef}
                    onChange={e => setLedgerRef(e.target.value)}
                    placeholder="e.g. ACC-001"
                  />
                </div>

                {/* Live preview — only when name typed */}
                {accountName.trim() && (
                  <div className="ca2-preview">
                    <span className="ca2-preview-icon">{selected.icon}</span>
                    <div>
                      <p className="ca2-preview-name">{accountName.trim()}</p>
                      <p className="ca2-preview-meta">
                        {selected.accountType} · {selected.subAccountType} · {selected.label}
                      </p>
                      {ledgerRef.trim() && (
                        <span className="ca2-preview-ref">{ledgerRef.trim()}</span>
                      )}
                    </div>
                  </div>
                )}

              </div>

              <div className="ca2-form-foot">
                <button type="button" className="ca2-btn-ghost" onClick={handleClear}>Cancel</button>
                <button type="submit" className="ca2-btn-primary" disabled={!isValid || submitting}>
                  {submitting ? (
                    <>
                      <span className="ca2-spin">
                        <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                      </span>
                      Creating…
                    </>
                  ) : (
                    <>
                      <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                      Create Account
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </SidebarLayout>
  );
}