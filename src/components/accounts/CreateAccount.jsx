import React, { useState, useRef, useEffect } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import { authFetch } from "../../utils/authFetch.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  .ca2 *, .ca2 *::before, .ca2 *::after { box-sizing: border-box; }
  .ca2 { font-family: 'DM Sans', sans-serif; max-width: 700px; width: 100%; margin: 0 auto; }
  .ca2-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: #065f46; margin-bottom: 4px; }
  .ca2-title   { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: #0B0C0D; letter-spacing: -.4px; line-height: 1.2; }

  /* search */
  .ca2-search-wrap { position: relative; margin: 14px 0 16px; }
  .ca2-search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; }
  .ca2-search { width: 100%; padding: 10px 12px 10px 36px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 13px; font-family: 'DM Sans', sans-serif; color: #0f172a; background: #fff; outline: none; transition: border-color .15s, box-shadow .15s; }
  .ca2-search::placeholder { color: #cbd5e1; }
  .ca2-search:focus { border-color: #065f46; box-shadow: 0 0 0 3px rgba(6,95,70,.09); }
  .ca2-search-clear { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: #f1f5f9; border: none; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #94a3b8; }
  .ca2-search-clear:hover { background: #fee2e2; color: #ef4444; }

  /* type filter row */
  .ca2-type-row { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 16px; }
  .ca2-type-btn { display: inline-flex; align-items: center; gap: 5px; padding: 6px 13px; border-radius: 20px; border: 1.5px solid #e2e8f0; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .14s; color: #475569; }
  .ca2-type-btn:hover { border-color: #065f46; color: #065f46; background: #f0fdf4; }
  .ca2-type-btn.active { border-color: var(--tc); background: var(--tbg); color: var(--tc); }
  .ca2-type-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--tc); }

  /* sub-category grid */
  .ca2-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 7px; margin-bottom: 16px; }
  .ca2-card { display: flex; flex-direction: column; align-items: flex-start; padding: 11px 12px 9px; border-radius: 11px; cursor: pointer; border: 1.5px solid #e2e8f0; background: #fff; transition: border-color .15s, box-shadow .12s, transform .1s; text-align: left; font-family: 'DM Sans', sans-serif; position: relative; overflow: hidden; }
  .ca2-card:hover { border-color: #065f46; box-shadow: 0 4px 12px rgba(33,42,55,.1); transform: translateY(-1px); }
  .ca2-card.selected { border-color: #065f46; background: #f0fdf4; box-shadow: 0 0 0 3px rgba(6,95,70,.1); }
  .ca2-card-icon { font-size: 20px; margin-bottom: 6px; line-height: 1; }
  .ca2-card-name { font-size: 12px; font-weight: 700; color: #0f172a; line-height: 1.3; }
  .ca2-card.selected .ca2-card-name { color: #0B0C0D; font-weight: 700; }
  .ca2-card-badge { margin-top: 4px; font-size: 9px; font-weight: 700; padding: 1px 6px; border-radius: 20px; letter-spacing: .04em; }
  .ca2-card-check { position: absolute; top: 7px; right: 7px; color: #065f46; opacity: 0; transition: opacity .15s; }
  .ca2-card.selected .ca2-card-check { opacity: 1; }
  .ca2-no-results { grid-column: 1/-1; text-align: center; padding: 24px; font-size: 13px; color: #cbd5e1; font-style: italic; }

  .badge-assets      { background: #dbeafe; color: #1d4ed8; }
  .badge-liabilities { background: #fee2e2; color: #b91c1c; }
  .badge-equity      { background: #ede9fe; color: #6d28d9; }
  .badge-revenue     { background: #d1fae5; color: #065f46; }
  .badge-expense     { background: #ffedd5; color: #c2410c; }

  /* form */
  .ca2-form { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,.05); animation: ca2Slide .18s cubic-bezier(.4,0,.2,1) both; }
  @keyframes ca2Slide { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
  .ca2-strip { display: flex; align-items: center; gap: 6px; padding: 7px 14px; border-bottom: 1px solid #ECECEC; background: #F5F5F5; }
  .ca2-strip-pill { font-size: 10.5px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
  .ca2-strip-sep  { color: #e2e8f0; font-size: 11px; }
  .ca2-strip-auto { font-size: 10px; color: #c7d2fe; font-style: italic; margin-left: auto; }
  .ca2-form-body  { padding: 14px; display: flex; flex-direction: column; gap: 12px; }
  .ca2-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .ca2-row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
  .ca2-lbl { display: block; font-size: 10.5px; font-weight: 700; color: #475569; margin-bottom: 4px; letter-spacing: .01em; text-transform: uppercase; }
  .ca2-lbl em { color: #ef4444; font-style: normal; margin-left: 2px; }
  .ca2-lbl small { color: #94a3b8; font-weight: 400; font-size: 10px; margin-left: 3px; text-transform: none; }
  .ca2-inp { width: 100%; padding: 8px 11px; border-radius: 8px; border: 1.5px solid #e2e8f0; font-size: 13px; color: #0f172a; font-family: 'DM Sans', sans-serif; background: #fff; outline: none; transition: border-color .15s, box-shadow .15s; }
  .ca2-inp::placeholder { color: #cbd5e1; }
  .ca2-inp:focus { border-color: #065f46; box-shadow: 0 0 0 3px rgba(6,95,70,.09); }
  .ca2-inp.mono { font-family: 'DM Mono', monospace; font-size: 12.5px; }
  .ca2-inp-note { width: 100%; padding: 8px 11px; border-radius: 8px; border: 1.5px solid #E3E3E3; background: #FAFAFA; font-size: 13px; color: #0f172a; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color .15s; }
  .ca2-inp-note::placeholder { color: #A5A8A6; font-style: italic; }
  .ca2-inp-note:focus { border-color: #065f46; box-shadow: 0 0 0 3px rgba(6,95,70,.09); }
  .ca2-note-preview { font-size: 10.5px; color: #065f46; font-weight: 600; margin-top: 3px; }

  /* OB inline */
  .ca2-ob-row { display: grid; grid-template-columns: 1fr auto; gap: 8px; align-items: start; }
  .ca2-ob-type { display: flex; border-radius: 7px; overflow: hidden; border: 1.5px solid #e2e8f0; }
  .ca2-ob-type-btn { padding: 7px 11px; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; background: #fff; color: #94a3b8; transition: all .12s; white-space: nowrap; }
  .ca2-ob-type-btn.debit-active  { background: #f0fdf4; color: #15803d; }
  .ca2-ob-type-btn.credit-active { background: #fef2f2; color: #dc2626; }
  .ca2-ob-type-btn:hover:not(.debit-active):not(.credit-active) { background: #f8fafc; color: #475569; }

  /* no spinners on number inputs */
  .ca2-no-spin::-webkit-inner-spin-button,
  .ca2-no-spin::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  .ca2-no-spin { -moz-appearance: textfield; }

  /* preview */
  .ca2-preview { display: flex; align-items: center; gap: 9px; padding: 9px 12px; background: #f8fafc; border-radius: 8px; border: 1.5px solid #e2e8f0; }
  .ca2-preview-icon { font-size: 20px; flex-shrink: 0; }
  .ca2-preview-name { font-family: 'Cormorant Garamond', serif; font-size: 14px; font-weight: 600; color: #0f172a; font-style: italic; }
  .ca2-preview-meta { font-size: 10.5px; color: #94a3b8; margin-top: 1px; }
  .ca2-preview-ref  { font-family: 'DM Mono', monospace; font-size: 10.5px; color: #065f46; background: #F5F5F5; border: 1px solid #DADADA; padding: 1px 5px; border-radius: 4px; margin-top: 2px; display: inline-block; }

  .ca2-form-foot { padding: 10px 14px; border-top: 1px solid #ECECEC; background: #F5F5F5; display: flex; justify-content: flex-end; gap: 7px; }
  .ca2-btn-primary { display: inline-flex; align-items: center; gap: 5px; padding: 8px 18px; border-radius: 8px; border: none; cursor: pointer; background: #065f46; color: #fff; font-size: 12.5px; font-weight: 700; font-family: 'DM Sans', sans-serif; box-shadow: 0 2px 8px rgba(33,42,55,.3); transition: background .14s; }
  .ca2-btn-primary:hover:not(:disabled) { background: #047857; }
  .ca2-btn-primary:disabled { opacity: .45; cursor: not-allowed; }
  .ca2-btn-ghost { display: inline-flex; align-items: center; gap: 5px; padding: 8px 14px; border-radius: 8px; border: 1.5px solid #e2e8f0; cursor: pointer; background: #fff; color: #64748b; font-size: 12.5px; font-weight: 600; font-family: 'DM Sans', sans-serif; transition: all .12s; }
  .ca2-btn-ghost:hover { border-color: #94a3b8; color: #334155; }
  @keyframes ca2-spin { to { transform: rotate(360deg); } }
  .ca2-spin { animation: ca2-spin .8s linear infinite; display: inline-block; }
  @media(max-width:500px){ .ca2-row2, .ca2-row3 { grid-template-columns: 1fr; } .ca2-grid { grid-template-columns: repeat(auto-fill, minmax(110px,1fr)); } }
`;

/* ─── Data ───────────────────────────────────────────────────────────────── */
const TYPE_DEFS = [
  { type:"Assets",      color:"#1d4ed8", bg:"#dbeafe" },
  { type:"Liabilities", color:"#b91c1c", bg:"#fee2e2" },
  { type:"Equity",      color:"#6d28d9", bg:"#ede9fe" },
  { type:"Revenue",     color:"#065f46", bg:"#d1fae5" },
  { type:"Expense",     color:"#c2410c", bg:"#ffedd5" },
];

const ACCOUNTS = [
  { label:"Bank",                  accountType:"Assets",      subAccountType:"Current Assets",       icon:"🏦", badgeClass:"badge-assets" },
  { label:"Customer",              accountType:"Assets",      subAccountType:"Current Assets",       icon:"👤", badgeClass:"badge-assets" },
  { label:"Loan Given",            accountType:"Assets",      subAccountType:"Current Assets",       icon:"💳", badgeClass:"badge-assets" },
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

const NAME_HINTS = {
  Bank:"e.g. HBL Current Account", Customer:"e.g. Ahmed Traders",
  Supplier:"e.g. Ali Rice Mills",  Employee:"e.g. Usman – Loader",
  Vehicle:"e.g. Truck LEA-1234",   Building:"e.g. Warehouse – Main Gate",
  Expense:"e.g. Electricity Bill", Inventory:"e.g. Paddy Stock",
};

const PAKISTAN_BANKS = [
  { id:1,  name:"National Bank of Pakistan",       abbr:"NBP"      },
  { id:2,  name:"The Bank of Punjab",              abbr:"BOP"      },
  { id:3,  name:"The Bank of Khyber",              abbr:"BOK"      },
  { id:4,  name:"Sindh Bank Limited",              abbr:"SBL"      },
  { id:5,  name:"First Women Bank Limited",        abbr:"FWB"      },
  { id:6,  name:"Habib Bank Limited",              abbr:"HBL"      },
  { id:7,  name:"United Bank Limited",             abbr:"UBL"      },
  { id:8,  name:"MCB Bank Limited",                abbr:"MCB"      },
  { id:9,  name:"Allied Bank Limited",             abbr:"ABL"      },
  { id:10, name:"Bank Alfalah Limited",            abbr:"BAFL"     },
  { id:11, name:"Bank Al Habib Limited",           abbr:"BAHL"     },
  { id:12, name:"Askari Bank Limited",             abbr:"ASKARI"   },
  { id:13, name:"Habib Metropolitan Bank Limited", abbr:"HabibMet" },
  { id:14, name:"Soneri Bank Limited",             abbr:"SNR"      },
  { id:15, name:"JS Bank Limited",                 abbr:"JS"       },
  { id:16, name:"Samba Bank Limited",              abbr:"SAMBA"    },
  { id:17, name:"Silkbank Limited",                abbr:"SILK"     },
  { id:18, name:"Summit Bank Limited",             abbr:"SMBL"     },
  { id:19, name:"Meezan Bank Limited",             abbr:"MBL"      },
  { id:20, name:"Faysal Bank Limited",             abbr:"FAY"      },
  { id:21, name:"BankIslami Pakistan Limited",     abbr:"BIPL"     },
  { id:22, name:"Dubai Islamic Bank Pakistan",     abbr:"DIBP"     },
  { id:23, name:"Al Baraka Bank (Pakistan)",       abbr:"ABB"      },
  { id:24, name:"MCB Islamic Bank Limited",        abbr:"MCBI"     },
  { id:25, name:"Standard Chartered Bank",         abbr:"SCB"      },
  { id:26, name:"Bank Makramah Limited",           abbr:"BMK"      },
];

/* ─── BankPicker component ───────────────────────────────────────────────── */
function BankPicker({ selectedBank, setSelectedBank, bankSearch, setBankSearch, accountName, setAccountName, nameRef }) {
  const [open, setOpen] = useState(false);
  const [hlIdx, setHlIdx] = useState(-1);
  const bRef  = useRef(null);
  const bInp  = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const h = e => { if (bRef.current && !bRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => { if (open) { setTimeout(() => bInp.current?.focus(), 0); setHlIdx(-1); } }, [open]);

  const filtered = PAKISTAN_BANKS.filter(b =>
    b.name.toLowerCase().includes(bankSearch.toLowerCase()) ||
    b.abbr.toLowerCase().includes(bankSearch.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHlIdx(i => {
        const next = Math.min(i + 1, filtered.length - 1);
        // scroll into view
        const el = listRef.current?.children[next];
        el?.scrollIntoView({ block: "nearest" });
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHlIdx(i => {
        const prev = Math.max(i - 1, 0);
        const el = listRef.current?.children[prev];
        el?.scrollIntoView({ block: "nearest" });
        return prev;
      });
    } else if (e.key === "Enter" && hlIdx >= 0 && filtered[hlIdx]) {
      e.preventDefault();
      const b = filtered[hlIdx];
      setSelectedBank(b);
      setOpen(false); setBankSearch(""); setHlIdx(-1);
      setTimeout(() => nameRef.current?.focus(), 50);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={bRef} style={{ position: "relative" }}>
      <button type="button" onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", padding: "8px 11px", borderRadius: 8,
          border: `1.5px solid ${open ? "#6366f1" : "#e2e8f0"}`,
          background: "#fff", cursor: "pointer", outline: "none",
          fontFamily: "'DM Sans',sans-serif", fontSize: 13,
          color: selectedBank ? "#0f172a" : "#94a3b8",
          display: "flex", alignItems: "center", gap: 8, transition: ".12s",
          boxShadow: open ? "0 0 0 3px rgba(99,102,241,.1)" : "none",
        }}>
        {selectedBank ? (
          <>
            <img src={`/${selectedBank.id}.png`} alt={selectedBank.abbr}
              style={{ width: 20, height: 20, objectFit: "contain", borderRadius: 3, flexShrink: 0 }}
              onError={e => { e.currentTarget.style.display = "none"; }}/>
            <span style={{ flex: 1, textAlign: "left", fontWeight: 600 }}>{selectedBank.name}</span>
            <span style={{ fontSize: 9.5, color: "#94a3b8", fontWeight: 700 }}>{selectedBank.abbr}</span>
          </>
        ) : (
          <span style={{ fontStyle: "italic", fontSize: 12.5 }}>Select bank…</span>
        )}
        <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={2.5}
          style={{ flexShrink: 0, transition: ".15s", transform: open ? "rotate(180deg)" : "none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <div style={{
          position: "absolute", left: 0, top: "calc(100% + 3px)", width: "100%",
          zIndex: 500, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 11,
          boxShadow: "0 10px 28px rgba(0,0,0,.13)", overflow: "hidden",
        }}>
          <div style={{ padding: 7, borderBottom: "1px solid #f1f5f9" }}>
            <input ref={bInp} value={bankSearch} onChange={e => { setBankSearch(e.target.value); setHlIdx(-1); }}
              onKeyDown={handleKeyDown}
              placeholder="Search bank…"
              style={{ width: "100%", padding: "6px 9px", border: "1px solid #e2e8f0",
                borderRadius: 6, fontSize: 12.5, outline: "none", fontFamily: "'DM Sans',sans-serif" }}/>
          </div>
          <ul ref={listRef} style={{ maxHeight: 210, overflowY: "auto", margin: 0, padding: 0, listStyle: "none" }}>
            {filtered.length === 0
              ? <li style={{ padding: "10px", fontSize: 12.5, color: "#94a3b8", textAlign: "center" }}>No banks found</li>
              : filtered.map(b => (
                <li key={b.id} onClick={() => {
                    setSelectedBank(b);
                    setOpen(false); setBankSearch("");
                    setTimeout(() => nameRef.current?.focus(), 50);
                  }}
                  style={{
                    padding: "8px 12px", cursor: "pointer", display: "flex",
                    alignItems: "center", gap: 9, fontSize: 13,
                    background: hlIdx === filtered.indexOf(b) ? "#eef2ff" : selectedBank?.id === b.id ? "#f0fdf4" : "transparent",
                    fontWeight: selectedBank?.id === b.id || hlIdx === filtered.indexOf(b) ? 700 : 400,
                    color: "#1e293b", borderBottom: "1px solid #f8fafc",
                  }}
                  onMouseEnter={e => { if (selectedBank?.id !== b.id) e.currentTarget.style.background = "#f8fafc"; }}
                  onMouseLeave={e => { if (selectedBank?.id !== b.id) e.currentTarget.style.background = "transparent"; }}>
                  <img src={`/${b.id}.png`} alt={b.abbr}
                    style={{ width: 20, height: 20, objectFit: "contain", borderRadius: 3, flexShrink: 0 }}
                    onError={e => { e.currentTarget.style.display = "none"; }}/>
                  <span style={{ flex: 1 }}>{b.name}</span>
                  <span style={{ fontSize: 9.5, color: "#94a3b8", fontWeight: 700 }}>{b.abbr}</span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function CreateAccount() {
  const [search,             setSearch]             = useState("");
  const [activeType,         setActiveType]         = useState("Assets"); // default to Assets on load
  const [selected,           setSelected]           = useState(null);
  const [accountName,        setAccountName]        = useState("");
  const [specialNote,        setSpecialNote]        = useState("");
  const [ledgerRef,          setLedgerRef]          = useState("");
  const [selectedBank,       setSelectedBank]       = useState(null);
  const [bankSearch,         setBankSearch]         = useState("");
  const [openingBalance,     setOpeningBalance]     = useState("");
  const [openingBalanceType, setOpeningBalanceType] = useState("debit");
  const [submitting,         setSubmitting]         = useState(false);
  const [notification,       setNotification]       = useState({ message: "", type: "info" });

  const nameRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        nameRef.current?.focus();
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 80);
    }
  }, [selected]);

  /* Derived */
  const q = search.trim().toLowerCase();

  // Visible sub-category list: filter by search OR by selected type
  const visibleAccounts = ACCOUNTS.filter(a => {
    if (q) return a.label.toLowerCase().includes(q) || a.accountType.toLowerCase().includes(q);
    if (activeType) return a.accountType === activeType;
    return false; // nothing shown until a type is picked or user searches
  });

  const isValid = selected && accountName.trim() && (selected.label !== "Bank" || selectedBank);

  const resetAll = () => {
    setSelected(null);
    setAccountName("");
    setSpecialNote("");
    setLedgerRef("");
    setSelectedBank(null);
    setBankSearch("");
    setOpeningBalance("");
    setOpeningBalanceType("debit");
  };

  const handlePick = (acct) => {
    setSelected(acct);
    setAccountName("");
    setSpecialNote("");
    setLedgerRef("");
    setSelectedBank(null);
    setBankSearch("");
    setOpeningBalance("");
    setOpeningBalanceType("debit");
  };

  const handleTypeClick = (type) => {
    setActiveType(prev => prev === type ? "" : type);
    setSearch("");
    // Don't reset selected — let user pick then switch type to compare
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/create-account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountType:        selected.accountType,
          subAccountType:     selected.subAccountType,
          accountName:        accountName.trim(),
          LedgerRef:          ledgerRef.trim(),
          category:           selected.label,
          bankLogoIndex:      selectedBank?.id ?? null,
          remarkNote:         specialNote.trim(),
          openingBalance:     openingBalance ? Math.abs(Number(openingBalance)) : 0,
          openingBalanceType: openingBalance ? openingBalanceType : "",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setNotification({ message: data.message || "Account created!", type: "success" });
        setSearch("");
        resetAll();
      } else {
        setNotification({ message: data.message || "Failed to create account.", type: "error" });
      }
    } catch {
      setNotification({ message: "Server error. Try again.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const Card = ({ acct }) => {
    const isSel = selected?.label === acct.label && selected?.subAccountType === acct.subAccountType;
    return (
      <button type="button" className={`ca2-card${isSel ? " selected" : ""}`} onClick={() => handlePick(acct)}>
        <span className="ca2-card-icon">{acct.icon}</span>
        <span className="ca2-card-name">{acct.label}</span>
        <span className={`ca2-card-badge ${acct.badgeClass}`}>{acct.subAccountType}</span>
        <span className="ca2-card-check">
          <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        </span>
      </button>
    );
  };

  const obAmt = Math.max(0, Number(openingBalance) || 0);
  const obDr  = openingBalanceType === "debit"  ? obAmt : 0;
  const obCr  = openingBalanceType === "credit" ? obAmt : 0;

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification message={notification.message} type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}/>

      <div className="ca2">
        <div style={{ marginBottom: 10 }}>
          <p className="ca2-eyebrow">Accounts</p>
          <h1 className="ca2-title">Create New Account</h1>
        </div>

        {/* Search */}
        <div className="ca2-search-wrap">
          <span className="ca2-search-icon">
            <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"/>
            </svg>
          </span>
          <input className="ca2-search" placeholder="Search account categories…"
            value={search} onChange={e => { setSearch(e.target.value); if (e.target.value) setActiveType(""); }}
            onKeyDown={e => {
              if (e.key === "Escape") setSearch("");
              if (e.key === "Enter" && visibleAccounts.length === 1) handlePick(visibleAccounts[0]);
            }}/>
          {q && (
            <button className="ca2-search-clear" onClick={() => setSearch("")} title="Clear">
              <svg width={8} height={8} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>

        {/* Type filter pills — hidden once a card is selected */}
        {!q && !selected && (
          <div className="ca2-type-row">
            {TYPE_DEFS.map(td => (
              <button key={td.type} type="button"
                className={`ca2-type-btn${activeType === td.type ? " active" : ""}`}
                style={{ "--tc": td.color, "--tbg": td.bg + "66" }}
                onClick={() => handleTypeClick(td.type)}>
                <span className="ca2-type-dot" style={{ "--tc": td.color }}/>
                {td.type}
              </button>
            ))}
          </div>
        )}

        {/* Sub-category grid — hidden once a card is selected */}
        {(q || activeType) && !selected && (
          <div className="ca2-grid">
            {visibleAccounts.length === 0
              ? <div className="ca2-no-results">No results{q ? ` for "${search}"` : ""}</div>
              : visibleAccounts.map(a => <Card key={`${a.label}-${a.subAccountType}`} acct={a}/>)}
          </div>
        )}

        {/* Selected category chip — shown instead of grid once picked */}
        {selected && (
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14,
            padding:"7px 12px", background:"#F5F5F5", borderRadius:10,
            border:"1.5px solid #DADADA", width:"fit-content" }}>
            <span style={{ fontSize:18, lineHeight:1 }}>{selected.icon}</span>
            <span style={{ fontSize:12, fontWeight:700, color:"#141A1F" }}>{selected.label}</span>
            <span style={{ fontSize:10, color:"#94a3b8", fontWeight:500 }}>· {selected.subAccountType}</span>
            <button type="button" onClick={resetAll}
              style={{ marginLeft:4, background:"none", border:"none", cursor:"pointer",
                color:"#94a3b8", display:"flex", alignItems:"center", padding:2,
                borderRadius:4, transition:".12s" }}
              title="Change category">
              <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        )}

        {/* ── Compact detail form ── */}
        {selected && (
          <div className="ca2-form" ref={formRef} style={{marginTop:0}}>
            <div className="ca2-strip">
              <span className={`ca2-strip-pill ${selected.badgeClass}`}>{selected.accountType}</span>
              <span className="ca2-strip-sep">›</span>
              <span className="ca2-strip-pill" style={{ background: "#f1f5f9", color: "#475569" }}>{selected.subAccountType}</span>
              <span className="ca2-strip-sep">›</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#475569" }}>{selected.icon} {selected.label}</span>
              <span className="ca2-strip-auto">auto-assigned</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="ca2-form-body">

                {/* Bank picker */}
                {selected.label === "Bank" && (
                  <div>
                    <label className="ca2-lbl">Select Bank <em>*</em></label>
                    <BankPicker
                      selectedBank={selectedBank} setSelectedBank={setSelectedBank}
                      bankSearch={bankSearch} setBankSearch={setBankSearch}
                      accountName={accountName} setAccountName={setAccountName}
                      nameRef={nameRef}/>
                  </div>
                )}

                {/* Account name + Special notes side by side */}
                <div className="ca2-row2">
                  <div>
                    <label className="ca2-lbl">
                      {selected.label === "Bank" ? "Account Title" : "Account Name"} <em>*</em>
                    </label>
                    <input ref={nameRef} className="ca2-inp"
                      value={accountName} onChange={e => setAccountName(e.target.value)}
                      placeholder={selected.label === "Bank"
                        ? (selectedBank ? `e.g. ${selectedBank.name} A/C` : "Enter account title…")
                        : (NAME_HINTS[selected.label] ?? `e.g. ${selected.label}`)}
                      required/>
                  </div>
                  <div>
                    <label className="ca2-lbl">Special Notes <small>opt</small></label>
                    <input className="ca2-inp-note"
                      value={specialNote} onChange={e => setSpecialNote(e.target.value)}
                      placeholder="e.g. Lahore Branch, Main Supplier…"
                      maxLength={80}/>
                    {specialNote.trim() && accountName.trim() && (
                      <p className="ca2-note-preview">→ {accountName.trim()} — {specialNote.trim()}</p>
                    )}
                  </div>
                </div>

                {/* Ledger ref + Opening balance side by side */}
                <div className="ca2-row2">
                  <div>
                    <label className="ca2-lbl">Ledger Reference <small>opt</small></label>
                    <input className="ca2-inp mono" value={ledgerRef}
                      onChange={e => setLedgerRef(e.target.value)} placeholder="e.g. ACC-001"/>
                  </div>
                  <div>
                    <label className="ca2-lbl">Opening Balance <small>opt</small></label>
                    <div className="ca2-ob-row">
                      <input className="ca2-inp ca2-no-spin" type="number" min="0" step="0.01"
                        value={openingBalance} placeholder="0"
                        onChange={e => {
                          // Strip any non-numeric chars except decimal point
                          const raw = e.target.value.replace(/[^0-9.]/g, "");
                          // Only one decimal point allowed
                          const parts = raw.split(".");
                          const cleaned = parts.length > 2
                            ? parts[0] + "." + parts.slice(1).join("")
                            : raw;
                          setOpeningBalance(cleaned);
                        }}
                        onKeyDown={e => {
                          // Block minus, plus, e, E — all non-numeric keys
                          if (["-", "+", "e", "E"].includes(e.key)) e.preventDefault();
                          if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
                        }}
                        onPaste={e => {
                          // Strip non-numeric from paste
                          e.preventDefault();
                          const text = e.clipboardData.getData("text");
                          const cleaned = text.replace(/[^0-9.]/g, "");
                          setOpeningBalance(prev => {
                            const combined = (prev + cleaned).replace(/[^0-9.]/g, "");
                            const parts = combined.split(".");
                            return parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : combined;
                          });
                        }}
                        onWheel={e => e.target.blur()}/>
                      <div className="ca2-ob-type">
                        <button type="button"
                          className={`ca2-ob-type-btn${openingBalanceType==="debit"?" debit-active":""}`}
                          onClick={() => setOpeningBalanceType("debit")} title="Cash In / Debit">In</button>
                        <button type="button"
                          className={`ca2-ob-type-btn${openingBalanceType==="credit"?" credit-active":""}`}
                          onClick={() => setOpeningBalanceType("credit")} title="Cash Out / Credit">Out</button>
                      </div>
                    </div>
                    {obAmt > 0 && (
                      <p style={{ fontSize: 10.5, color: openingBalanceType === "debit" ? "#15803d" : "#dc2626",
                        marginTop: 3, fontFamily: "'DM Mono',monospace", fontWeight: 600 }}>
                        {openingBalanceType === "debit" ? "IN" : "OUT"} PKR {obAmt.toLocaleString()}
                        <span style={{ color: "#94a3b8", fontWeight: 400 }}> → balance {openingBalanceType === "debit" ? "+" : "−"}{obAmt.toLocaleString()}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Preview */}
                {accountName.trim() && (
                  <div className="ca2-preview">
                    {selected.label === "Bank" && selectedBank ? (
                      <img src={`/${selectedBank.id}.png`} alt={selectedBank.abbr}
                        style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 7,
                          border: "1px solid #e2e8f0", background: "#fff", padding: 2, flexShrink: 0 }}
                        onError={e => { e.currentTarget.style.display = "none"; }}/>
                    ) : (
                      <span className="ca2-preview-icon">{selected.icon}</span>
                    )}
                    <div>
                      <p className="ca2-preview-name">
                        {accountName.trim()}
                        {specialNote.trim() && <span style={{ color: "#6366f1" }}> — {specialNote.trim()}</span>}
                      </p>
                      <p className="ca2-preview-meta">
                        {selected.label} · {selected.accountType} · {selected.subAccountType}
                        {selected.label === "Bank" && selectedBank && ` · ${selectedBank.abbr}`}
                        {obAmt > 0 && ` · OB: PKR ${obAmt.toLocaleString()} (${openingBalanceType==="debit"?"Dr":"Cr"})`}
                      </p>
                      {ledgerRef.trim() && <span className="ca2-preview-ref">{ledgerRef.trim()}</span>}
                    </div>
                  </div>
                )}
              </div>

              <div className="ca2-form-foot">
                <button type="button" className="ca2-btn-ghost" onClick={resetAll}>Cancel</button>
                <button type="submit" className="ca2-btn-primary" disabled={!isValid || submitting}>
                  {submitting ? (
                    <><span className="ca2-spin">
                      <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                      </svg></span> Creating…</>
                  ) : (
                    <><svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg> Create Account</>
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