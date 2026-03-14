import React, { useState, useRef, useEffect } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import { authFetch } from "../../utils/authFetch.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  .ca2 *, .ca2 *::before, .ca2 *::after { box-sizing: border-box; }
  .ca2 { font-family: 'DM Sans', sans-serif; max-width: 640px; width: 100%; margin: 0 auto; }

  .ca2-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #94a3b8; margin-bottom: 4px; }
  .ca2-title   { font-family: 'Lora', serif; font-size: 24px; font-weight: 700; color: #0f172a; letter-spacing: -.3px; line-height: 1.2; }
  .ca2-sub     { font-size: 12.5px; color: #94a3b8; margin-top: 4px; }

  /* ── search bar ── */
  .ca2-search-wrap {
    position: relative; margin-top: 20px; margin-bottom: 18px;
  }
  .ca2-search-icon {
    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
    color: #94a3b8; pointer-events: none;
  }
  .ca2-search {
    width: 100%; padding: 11px 14px 11px 40px;
    border: 1.5px solid #e2e8f0; border-radius: 12px;
    font-size: 13.5px; font-family: 'DM Sans', sans-serif;
    color: #0f172a; background: #fff; outline: none;
    transition: border-color .15s, box-shadow .15s;
  }
  .ca2-search::placeholder { color: #cbd5e1; }
  .ca2-search:focus {
    border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.1);
  }
  .ca2-search-clear {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: #f1f5f9; border: none; border-radius: 50%; width: 22px; height: 22px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #94a3b8; transition: background .12s, color .12s;
  }
  .ca2-search-clear:hover { background: #fee2e2; color: #ef4444; }

  /* ── group label ── */
  .ca2-group-label {
    font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
    color: #cbd5e1; margin-bottom: 8px; margin-top: 4px;
    display: flex; align-items: center; gap: 8px;
  }
  .ca2-group-label::after { content:''; flex:1; height:1px; background:#f1f5f9; }

  /* ── cards grid ── */
  .ca2-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 8px; margin-bottom: 6px;
  }

  /* individual card */
  .ca2-card {
    display: flex; flex-direction: column; align-items: flex-start;
    padding: 13px 14px 11px; border-radius: 12px; cursor: pointer;
    border: 1.5px solid #e2e8f0; background: #fff;
    transition: border-color .15s, box-shadow .15s, transform .1s;
    text-align: left; font-family: 'DM Sans', sans-serif;
    position: relative; overflow: hidden;
  }
  .ca2-card:hover {
    border-color: #a5b4fc;
    box-shadow: 0 4px 14px rgba(99,102,241,.1);
    transform: translateY(-1px);
  }
  .ca2-card.selected {
    border-color: #6366f1;
    background: #eef2ff;
    box-shadow: 0 0 0 3px rgba(99,102,241,.12);
  }
  .ca2-card-icon  { font-size: 22px; margin-bottom: 8px; line-height: 1; }
  .ca2-card-name  { font-size: 12.5px; font-weight: 700; color: #0f172a; line-height: 1.3; }
  .ca2-card.selected .ca2-card-name { color: #4338ca; }
  .ca2-card-badge {
    margin-top: 5px; font-size: 9.5px; font-weight: 700; padding: 2px 7px;
    border-radius: 20px; letter-spacing: .04em;
  }
  .ca2-card-check {
    position: absolute; top: 8px; right: 8px; color: #6366f1;
    opacity: 0; transition: opacity .15s;
  }
  .ca2-card.selected .ca2-card-check { opacity: 1; }

  /* match highlight when searching */
  .ca2-card.match { order: -1; border-color: #6366f1; background: #fafafe; }
  .ca2-card.match:hover { border-color: #4f46e5; }

  .badge-assets      { background: #dbeafe; color: #1d4ed8; }
  .badge-liabilities { background: #fee2e2; color: #b91c1c; }
  .badge-equity      { background: #ede9fe; color: #6d28d9; }
  .badge-revenue     { background: #d1fae5; color: #065f46; }
  .badge-expense     { background: #ffedd5; color: #c2410c; }

  .ca2-no-results {
    grid-column: 1/-1; text-align: center; padding: 32px;
    font-size: 13px; color: #cbd5e1; font-style: italic;
  }

  /* ── detail form ── */
  .ca2-form {
    margin-top: 18px; background: #fff;
    border: 1.5px solid #e2e8f0; border-radius: 14px; overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,.05);
    animation: ca2Slide .18s cubic-bezier(.4,0,.2,1) both;
  }
  @keyframes ca2Slide {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ca2-strip {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 16px; border-bottom: 1px solid #f1f5f9; background: #f8fafc;
  }
  .ca2-strip-pill { font-size: 11px; font-weight: 700; padding: 2px 9px; border-radius: 20px; }
  .ca2-strip-sep  { color: #e2e8f0; font-size: 12px; }
  .ca2-strip-auto { font-size: 10.5px; color: #c7d2fe; font-style: italic; margin-left: auto; }
  .ca2-form-body  { padding: 16px; display: flex; flex-direction: column; gap: 14px; }
  .ca2-lbl { display: block; font-size: 11.5px; font-weight: 700; color: #475569; margin-bottom: 5px; letter-spacing: .01em; }
  .ca2-lbl em    { color: #ef4444; font-style: normal; margin-left: 2px; }
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
  .ca2-preview {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 13px; background: #f8fafc; border-radius: 9px;
    border: 1.5px solid #e2e8f0;
  }
  .ca2-preview-icon { font-size: 22px; flex-shrink: 0; }
  .ca2-preview-name { font-family: 'Lora', serif; font-size: 15px; font-weight: 600; color: #0f172a; font-style: italic; }
  .ca2-preview-meta { font-size: 11px; color: #94a3b8; margin-top: 1px; }
  .ca2-preview-ref  { font-family: 'DM Mono', monospace; font-size: 11px; color: #6366f1; background: #eef2ff; padding: 1px 6px; border-radius: 5px; margin-top: 3px; display: inline-block; }
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

  @media(max-width:480px){ .ca2-grid { grid-template-columns: repeat(auto-fill, minmax(120px,1fr)); } }
`;

const ACCOUNTS = [
  { label:"Bank",                  accountType:"Assets",      subAccountType:"Current Assets",       icon:"🏦", badgeClass:"badge-assets" },
  { label:"Customer",              accountType:"Assets",      subAccountType:"Current Assets",       icon:"👤", badgeClass:"badge-assets" },
  { label:"Inventory",             accountType:"Assets",      subAccountType:"Current Assets",       icon:"📦", badgeClass:"badge-assets" },
  { label:"Loan Given",            accountType:"Assets",      subAccountType:"Current Assets",       icon:"💳", badgeClass:"badge-assets" },
  { label:"Cash In Hand",          accountType:"Assets",      subAccountType:"Current Assets",       icon:"💵", badgeClass:"badge-assets" },
  { label:"Building",              accountType:"Assets",      subAccountType:"Fixed Assets",         icon:"🏢", badgeClass:"badge-assets" },
  { label:"Vehicle",               accountType:"Assets",      subAccountType:"Fixed Assets",         icon:"🚛", badgeClass:"badge-assets" },
  { label:"Equipment",             accountType:"Assets",      subAccountType:"Fixed Assets",         icon:"⚙️", badgeClass:"badge-assets" },
  { label:"Tool",                  accountType:"Assets",      subAccountType:"Fixed Assets",         icon:"🔧", badgeClass:"badge-assets" },
  { label:"Furniture",             accountType:"Assets",      subAccountType:"Fixed Assets",         icon:"🪑", badgeClass:"badge-assets" },
  { label:"Employee",              accountType:"Liabilities", subAccountType:"Current Liabilities",  icon:"👷", badgeClass:"badge-liabilities" },
  { label:"Supplier",              accountType:"Liabilities", subAccountType:"Current Liabilities",  icon:"🏭", badgeClass:"badge-liabilities" },
  { label:"Loan Taken",            accountType:"Liabilities", subAccountType:"Current Liabilities",  icon:"🏦", badgeClass:"badge-liabilities" },
  { label:"Tax Payable",           accountType:"Liabilities", subAccountType:"Current Liabilities",  icon:"🧾", badgeClass:"badge-liabilities" },
  { label:"Accrued Expenses",      accountType:"Liabilities", subAccountType:"Current Liabilities",  icon:"📝", badgeClass:"badge-liabilities" },
  { label:"Installments",          accountType:"Liabilities", subAccountType:"Fixed Liabilities",    icon:"📅", badgeClass:"badge-liabilities" },
  { label:"Investor",              accountType:"Equity",      subAccountType:"Equity",               icon:"💼", badgeClass:"badge-equity" },
  { label:"Shareholder's Account", accountType:"Equity",      subAccountType:"Shareholders Account", icon:"📊", badgeClass:"badge-equity" },
  { label:"Other Income",          accountType:"Revenue",     subAccountType:"Revenue",              icon:"📈", badgeClass:"badge-revenue" },
  { label:"Expense",               accountType:"Expense",     subAccountType:"Expenses",             icon:"💸", badgeClass:"badge-expense" },
];

const TYPE_ORDER = ["Assets","Liabilities","Equity","Revenue","Expense"];

const NAME_HINTS = {
  Bank:"e.g. HBL Current Account", Customer:"e.g. Ahmed Traders",
  Supplier:"e.g. Ali Rice Mills",  Employee:"e.g. Usman – Loader",
  Vehicle:"e.g. Truck LEA-1234",   Building:"e.g. Warehouse – Main Gate",
  Expense:"e.g. Electricity Bill", Inventory:"e.g. Paddy Stock",
};

export default function CreateAccount() {
  const [search,      setSearch]      = useState("");
  const [selected,    setSelected]    = useState(null);
  const [accountName, setAccountName] = useState("");
  const [ledgerRef,   setLedgerRef]   = useState("");
  const [submitting,  setSubmitting]  = useState(false);
  const [notification,setNotification]= useState({ message:"", type:"info" });

  const searchRef = useRef(null);
  const nameRef   = useRef(null);
  const formRef   = useRef(null);

  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        nameRef.current?.focus();
        formRef.current?.scrollIntoView({ behavior:"smooth", block:"nearest" });
      }, 80);
    }
  }, [selected]);

  const q = search.trim().toLowerCase();

  // Split into matches (shown first) and rest (hidden when searching)
  const matches  = q ? ACCOUNTS.filter(a => a.label.toLowerCase().includes(q)) : [];
  const showAll  = !q;

  // Groups for the "rest" section (only shown when no search)
  const groups = TYPE_ORDER.map(type => ({
    type,
    items: ACCOUNTS.filter(a => a.accountType === type),
  })).filter(g => g.items.length > 0);

  const handlePick = (acct) => {
    setSelected(acct);
    setAccountName("");
    setLedgerRef("");
  };

  const handleClear = () => {
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
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        setSelected(null); setAccountName(""); setLedgerRef(""); setSearch("");
      } else {
        setNotification({ message: data.message || "Failed to create account.", type:"error" });
      }
    } catch {
      setNotification({ message:"Server error. Try again.", type:"error" });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Card component ──────────────────────────────────────────────────────
  const Card = ({ acct, highlight }) => {
    const isSelected = selected?.label === acct.label && selected?.subAccountType === acct.subAccountType;
    return (
      <button
        type="button"
        className={`ca2-card${isSelected ? " selected" : ""}${highlight ? " match" : ""}`}
        onClick={() => handlePick(acct)}
      >
        <span className="ca2-card-icon">{acct.icon}</span>
        <span className="ca2-card-name">{acct.label}</span>
        <span className={`ca2-card-badge ${acct.badgeClass}`}>{acct.accountType}</span>
        <span className="ca2-card-check">
          <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        </span>
      </button>
    );
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
        {/* Header */}
        <div style={{marginBottom:6}}>
          <p className="ca2-eyebrow">Accounts</p>
          <h1 className="ca2-title">Create New Account</h1>
          <p className="ca2-sub">Pick a category — type &amp; sub-type fill automatically</p>
        </div>

        {/* Search */}
        <div className="ca2-search-wrap">
          <span className="ca2-search-icon">
            <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"/>
            </svg>
          </span>
          <input
            ref={searchRef}
            className="ca2-search"
            placeholder="Search account types…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Escape") setSearch("");
              if (e.key === "Enter" && matches.length === 1) handlePick(matches[0]);
            }}
          />
          {q && (
            <button className="ca2-search-clear" onClick={() => setSearch("")} title="Clear search">
              <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>

        {/* ── Search results (only when typing) ── */}
        {q && (
          <div className="ca2-grid">
            {matches.length === 0
              ? <div className="ca2-no-results">No results for "{search}"</div>
              : matches.map(acct => (
                <Card key={`${acct.label}-${acct.subAccountType}`} acct={acct} highlight={true}/>
              ))
            }
          </div>
        )}

        {/* ── All cards grouped (only when NOT searching) ── */}
        {showAll && groups.map(g => (
          <div key={g.type}>
            <div className="ca2-group-label">{g.type}</div>
            <div className="ca2-grid">
              {g.items.map(acct => (
                <Card key={`${acct.label}-${acct.subAccountType}`} acct={acct} highlight={false}/>
              ))}
            </div>
          </div>
        ))}

        {/* ── Detail form ── */}
        {selected && (
          <div className="ca2-form" ref={formRef}>
            <div className="ca2-strip">
              <span className={`ca2-strip-pill ${selected.badgeClass}`}>{selected.accountType}</span>
              <span className="ca2-strip-sep">›</span>
              <span className="ca2-strip-pill" style={{background:"#f1f5f9",color:"#475569"}}>{selected.subAccountType}</span>
              <span className="ca2-strip-auto">auto-assigned</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="ca2-form-body">
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
                <div>
                  <label className="ca2-lbl">Ledger Reference <small>(optional)</small></label>
                  <input
                    className="ca2-inp mono"
                    value={ledgerRef}
                    onChange={e => setLedgerRef(e.target.value)}
                    placeholder="e.g. ACC-001"
                  />
                </div>
                {accountName.trim() && (
                  <div className="ca2-preview">
                    <span className="ca2-preview-icon">{selected.icon}</span>
                    <div>
                      <p className="ca2-preview-name">{accountName.trim()}</p>
                      <p className="ca2-preview-meta">{selected.accountType} · {selected.subAccountType} · {selected.label}</p>
                      {ledgerRef.trim() && <span className="ca2-preview-ref">{ledgerRef.trim()}</span>}
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