import React, { useState, useRef, useEffect } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import { authFetch } from "../../utils/authFetch.js";

/* ─── Fonts & Styles ─────────────────────────────────────────────────────── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  .ca2 *, .ca2 *::before, .ca2 *::after { box-sizing: border-box; }
  .ca2 { font-family: 'DM Sans', sans-serif; max-width: 640px; width: 100%; margin: 0 auto; }
  .ca2-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #94a3b8; margin-bottom: 4px; }
  .ca2-title   { font-family: 'Lora', serif; font-size: 24px; font-weight: 700; color: #0f172a; letter-spacing: -.3px; line-height: 1.2; }
  .ca2-sub     { font-size: 12.5px; color: #94a3b8; margin-top: 4px; }

  .ca2-search-wrap { position: relative; margin-top: 20px; margin-bottom: 18px; }
  .ca2-search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; }
  .ca2-search {
    width: 100%; padding: 11px 14px 11px 40px;
    border: 1.5px solid #e2e8f0; border-radius: 12px;
    font-size: 13.5px; font-family: 'DM Sans', sans-serif;
    color: #0f172a; background: #fff; outline: none;
    transition: border-color .15s, box-shadow .15s;
  }
  .ca2-search::placeholder { color: #cbd5e1; }
  .ca2-search:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.1); }
  .ca2-search-clear {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: #f1f5f9; border: none; border-radius: 50%; width: 22px; height: 22px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #94a3b8; transition: background .12s, color .12s;
  }
  .ca2-search-clear:hover { background: #fee2e2; color: #ef4444; }

  .ca2-group-label {
    font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
    color: #cbd5e1; margin-bottom: 8px; margin-top: 4px;
    display: flex; align-items: center; gap: 8px;
  }
  .ca2-group-label::after { content:''; flex:1; height:1px; background:#f1f5f9; }

  .ca2-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 8px; margin-bottom: 6px; }

  .ca2-card {
    display: flex; flex-direction: column; align-items: flex-start;
    padding: 13px 14px 11px; border-radius: 12px; cursor: pointer;
    border: 1.5px solid #e2e8f0; background: #fff;
    transition: border-color .15s, box-shadow .15s, transform .1s;
    text-align: left; font-family: 'DM Sans', sans-serif;
    position: relative; overflow: hidden;
  }
  .ca2-card:hover { border-color: #a5b4fc; box-shadow: 0 4px 14px rgba(99,102,241,.1); transform: translateY(-1px); }
  .ca2-card.selected { border-color: #6366f1; background: #eef2ff; box-shadow: 0 0 0 3px rgba(99,102,241,.12); }
  .ca2-card-icon  { font-size: 22px; margin-bottom: 8px; line-height: 1; }
  .ca2-card-name  { font-size: 12.5px; font-weight: 700; color: #0f172a; line-height: 1.3; }
  .ca2-card.selected .ca2-card-name { color: #4338ca; }
  .ca2-card-badge { margin-top: 5px; font-size: 9.5px; font-weight: 700; padding: 2px 7px; border-radius: 20px; letter-spacing: .04em; }
  .ca2-card-check { position: absolute; top: 8px; right: 8px; color: #6366f1; opacity: 0; transition: opacity .15s; }
  .ca2-card.selected .ca2-card-check { opacity: 1; }
  .ca2-card.match { order: -1; border-color: #6366f1; background: #fafafe; }
  .ca2-card.match:hover { border-color: #4f46e5; }
  .ca2-no-results { grid-column: 1/-1; text-align: center; padding: 32px; font-size: 13px; color: #cbd5e1; font-style: italic; }

  .badge-assets      { background: #dbeafe; color: #1d4ed8; }
  .badge-liabilities { background: #fee2e2; color: #b91c1c; }
  .badge-equity      { background: #ede9fe; color: #6d28d9; }
  .badge-revenue     { background: #d1fae5; color: #065f46; }
  .badge-expense     { background: #ffedd5; color: #c2410c; }

  .ca2-form {
    margin-top: 18px; background: #fff;
    border: 1.5px solid #e2e8f0; border-radius: 14px; overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,.05);
    animation: ca2Slide .18s cubic-bezier(.4,0,.2,1) both;
  }
  @keyframes ca2Slide { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
  .ca2-strip { display: flex; align-items: center; gap: 6px; padding: 8px 16px; border-bottom: 1px solid #f1f5f9; background: #f8fafc; }
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
  .ca2-inp.mono { font-family: 'DM Mono', monospace; font-size: 13px; }

  .ca2-note-box {
    background: #f8fafc; border: 1.5px solid #ede9fe; border-radius: 10px;
    padding: 12px 13px; display: flex; flex-direction: column; gap: 7px;
  }
  .ca2-note-hint    { font-size: 10.5px; color: #94a3b8; font-style: italic; }
  .ca2-note-preview { font-size: 11px; color: #6366f1; font-weight: 700; }

  .ca2-preview {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 13px; background: #f8fafc; border-radius: 9px; border: 1.5px solid #e2e8f0;
  }
  .ca2-preview-icon { font-size: 22px; flex-shrink: 0; }
  .ca2-preview-name { font-family: 'Lora', serif; font-size: 15px; font-weight: 600; color: #0f172a; font-style: italic; }
  .ca2-preview-meta { font-size: 11px; color: #94a3b8; margin-top: 1px; }
  .ca2-preview-ref  { font-family: 'DM Mono', monospace; font-size: 11px; color: #6366f1; background: #eef2ff; padding: 1px 6px; border-radius: 5px; margin-top: 3px; display: inline-block; }

  .ca2-form-foot { padding: 12px 16px; border-top: 1px solid #f1f5f9; background: #fafafa; display: flex; justify-content: flex-end; gap: 8px; }
  .ca2-btn-primary {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 20px; border-radius: 9px; border: none; cursor: pointer;
    background: #4f46e5; color: #fff; font-size: 12.5px; font-weight: 700;
    font-family: 'DM Sans', sans-serif; box-shadow: 0 2px 8px rgba(79,70,229,.25); transition: background .14s;
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

  .ca2-ob-toggle {
    display: inline-flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 600;
    color: #4f46e5; cursor: pointer; border: 1.5px dashed #c7d2fe; border-radius: 8px;
    padding: 6px 12px; background: #f5f3ff; transition: all .14s; user-select: none;
  }
  .ca2-ob-toggle:hover { background: #eef2ff; border-color: #818cf8; }
  .ca2-ob-section { background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 12px; }
  .ca2-ob-label { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 5px; }
  .ca2-ob-amount { width: 100%; padding: 9px 13px; border-radius: 9px; border: 1.5px solid #e2e8f0; font-size: 14px; color: #0f172a; font-family: 'DM Mono', monospace; background: #fff; outline: none; transition: border-color .15s; }
  .ca2-ob-amount:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.1); }
  .ca2-ob-amount::placeholder { color: #cbd5e1; }
  .ca2-ob-type-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .ca2-ob-type-btn { padding: 9px 12px; border-radius: 9px; border: 1.5px solid #e2e8f0; background: #fff; font-size: 12.5px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .14s; text-align: center; color: #94a3b8; }
  .ca2-ob-type-btn.debit-active  { background:#fff7ed; border-color:#fed7aa; color:#c2410c; }
  .ca2-ob-type-btn.credit-active { background:#f0fdf4; border-color:#bbf7d0; color:#065f46; }
  .ca2-ob-type-btn:hover:not(.debit-active):not(.credit-active) { border-color:#94a3b8; color:#475569; }
  .ca2-ob-preview { display: flex; gap: 10px; flex-wrap: wrap; padding: 8px 12px; background: #fff; border-radius: 8px; border: 1px solid #f1f5f9; }
  .ca2-ob-preview-item { font-size: 11.5px; font-family: 'DM Mono', monospace; }
  .ca2-ob-preview-item span { font-weight: 700; }
  .ca2-ob-preview-item .dr { color: #c2410c; }
  .ca2-ob-preview-item .cr { color: #065f46; }
  .ca2-ob-preview-item .bal-neg { color: #dc2626; }
  .ca2-ob-preview-item .bal-pos { color: #059669; }
  @media(max-width:480px){ .ca2-grid { grid-template-columns: repeat(auto-fill, minmax(120px,1fr)); } }
`;

/* ─── Account type catalogue ─────────────────────────────────────────────── */
const ACCOUNTS = [
  { label:"Bank",                  accountType:"Assets",      subAccountType:"Current Assets",       icon:"🏦", badgeClass:"badge-assets" },
  { label:"Customer",              accountType:"Assets",      subAccountType:"Current Assets",       icon:"👤", badgeClass:"badge-assets" },
  { label:"Inventory",             accountType:"Assets",      subAccountType:"Current Assets",       icon:"📦", badgeClass:"badge-assets" },
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

const TYPE_ORDER = ["Assets", "Liabilities", "Equity", "Revenue", "Expense"];

const NAME_HINTS = {
  Bank:       "e.g. HBL Current Account",
  Customer:   "e.g. Ahmed Traders",
  Supplier:   "e.g. Ali Rice Mills",
  Employee:   "e.g. Usman – Loader",
  Vehicle:    "e.g. Truck LEA-1234",
  Building:   "e.g. Warehouse – Main Gate",
  Expense:    "e.g. Electricity Bill",
  Inventory:  "e.g. Paddy Stock",
};

/* ─── Pakistani banks — index matches /1.png … /26.png in public ─────────── */
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

/* ─── BankPicker — proper component (hooks at top level, never in JSX body) ─ */
function BankPicker({ selectedBank, setSelectedBank, bankSearch, setBankSearch, accountName, setAccountName, nameRef }) {
  const [open, setOpen] = useState(false);
  const bRef = useRef(null);
  const bInp = useRef(null);

  useEffect(() => {
    const h = e => { if (bRef.current && !bRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => { if (open) setTimeout(() => bInp.current?.focus(), 0); }, [open]);

  const filtered = PAKISTAN_BANKS.filter(b =>
    b.name.toLowerCase().includes(bankSearch.toLowerCase()) ||
    b.abbr.toLowerCase().includes(bankSearch.toLowerCase())
  );

  return (
    <div ref={bRef} style={{ position: "relative" }}>
      {/* Trigger button */}
      <button type="button" onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", padding: "9px 13px", borderRadius: 9,
          border: `1.5px solid ${open ? "#6366f1" : "#e2e8f0"}`,
          background: "#fff", cursor: "pointer", outline: "none",
          fontFamily: "'DM Sans',sans-serif", fontSize: 13.5,
          color: selectedBank ? "#0f172a" : "#94a3b8",
          display: "flex", alignItems: "center", gap: 10, transition: ".12s",
          boxShadow: open ? "0 0 0 3px rgba(99,102,241,.1)" : "none",
        }}>
        {selectedBank ? (
          <>
            <img src={`/${selectedBank.id}.png`} alt={selectedBank.abbr}
              style={{ width: 22, height: 22, objectFit: "contain", borderRadius: 4, flexShrink: 0 }}
              onError={e => { e.currentTarget.style.display = "none"; }}/>
            <span style={{ flex: 1, textAlign: "left", fontWeight: 600 }}>{selectedBank.name}</span>
            <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700, letterSpacing: ".06em" }}>{selectedBank.abbr}</span>
          </>
        ) : (
          <span style={{ fontStyle: "italic" }}>Search and select bank…</span>
        )}
        <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={2.5}
          style={{ flexShrink: 0, transition: ".15s", transform: open ? "rotate(180deg)" : "none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {/* Dropdown list */}
      {open && (
        <div style={{
          position: "absolute", left: 0, top: "calc(100% + 4px)", width: "100%",
          zIndex: 500, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12,
          boxShadow: "0 12px 32px rgba(0,0,0,.14)", overflow: "hidden",
        }}>
          <div style={{ padding: 8, borderBottom: "1px solid #f1f5f9" }}>
            <input ref={bInp} value={bankSearch} onChange={e => setBankSearch(e.target.value)}
              placeholder="Search bank name or abbreviation…"
              style={{ width: "100%", padding: "7px 10px", border: "1px solid #e2e8f0",
                borderRadius: 7, fontSize: 13, outline: "none", fontFamily: "'DM Sans',sans-serif" }}/>
          </div>
          <ul style={{ maxHeight: 230, overflowY: "auto", margin: 0, padding: 0, listStyle: "none" }}>
            {filtered.length === 0
              ? <li style={{ padding: "12px", fontSize: 13, color: "#94a3b8", textAlign: "center" }}>No banks found</li>
              : filtered.map(b => (
                <li key={b.id}
                  onClick={() => {
                    setSelectedBank(b);
                    if (!accountName.trim()) setAccountName(b.name);
                    setOpen(false);
                    setBankSearch("");
                    setTimeout(() => nameRef.current?.focus(), 50);
                  }}
                  style={{
                    padding: "9px 14px", cursor: "pointer", display: "flex",
                    alignItems: "center", gap: 10, fontSize: 13.5,
                    background: selectedBank?.id === b.id ? "#eef2ff" : "transparent",
                    fontWeight: selectedBank?.id === b.id ? 700 : 400,
                    color: "#1e293b", borderBottom: "1px solid #f8fafc",
                  }}
                  onMouseEnter={e => { if (selectedBank?.id !== b.id) e.currentTarget.style.background = "#f8fafc"; }}
                  onMouseLeave={e => { if (selectedBank?.id !== b.id) e.currentTarget.style.background = "transparent"; }}>
                  <img src={`/${b.id}.png`} alt={b.abbr}
                    style={{ width: 22, height: 22, objectFit: "contain", borderRadius: 4, flexShrink: 0 }}
                    onError={e => { e.currentTarget.style.display = "none"; }}/>
                  <span style={{ flex: 1 }}>{b.name}</span>
                  <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700, letterSpacing: ".06em" }}>{b.abbr}</span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function CreateAccount() {
  /* All state declared at component top level */
  const [search,             setSearch]             = useState("");
  const [selected,           setSelected]           = useState(null);
  const [accountName,        setAccountName]        = useState("");
  const [ledgerRef,          setLedgerRef]          = useState("");
  const [specialNote,        setSpecialNote]        = useState(""); // optional — shown for ALL categories
  const [selectedBank,       setSelectedBank]       = useState(null); // only used when category === "Bank"
  const [bankSearch,         setBankSearch]         = useState("");
  const [showOB,             setShowOB]             = useState(false);
  const [openingBalance,     setOpeningBalance]     = useState("");
  const [openingBalanceType, setOpeningBalanceType] = useState("debit");
  const [submitting,         setSubmitting]         = useState(false);
  const [notification,       setNotification]       = useState({ message: "", type: "info" });

  const searchRef = useRef(null);
  const nameRef   = useRef(null);
  const formRef   = useRef(null);

  /* Auto-scroll and focus when category is selected */
  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        nameRef.current?.focus();
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 80);
    }
  }, [selected]);

  /* Derived */
  const q       = search.trim().toLowerCase();
  const matches = q ? ACCOUNTS.filter(a => a.label.toLowerCase().includes(q)) : [];
  const showAll = !q;
  const groups  = TYPE_ORDER
    .map(type => ({ type, items: ACCOUNTS.filter(a => a.accountType === type) }))
    .filter(g => g.items.length > 0);

  const isValid = selected && accountName.trim() && (selected.label !== "Bank" || selectedBank);

  /* Reset everything */
  const resetAll = () => {
    setSelected(null);
    setAccountName("");
    setLedgerRef("");
    setSpecialNote("");
    setSelectedBank(null);
    setBankSearch("");
    setShowOB(false);
    setOpeningBalance("");
    setOpeningBalanceType("debit");
  };

  /* Pick a category card */
  const handlePick = (acct) => {
    setSelected(acct);
    setAccountName("");
    setLedgerRef("");
    setSpecialNote("");
    setSelectedBank(null);
    setBankSearch("");
    setShowOB(false);
    setOpeningBalance("");
    setOpeningBalanceType("debit");
  };

  /* Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    try {
      const backendType = selected.accountType === "Cash" ? "Assets" : selected.accountType;
      const res = await authFetch(`${API_BASE_URL}/create-account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountType:        backendType,
          subAccountType:     selected.subAccountType,
          accountName:        accountName.trim(),
          LedgerRef:          ledgerRef.trim(),
          category:           selected.label,
          bankLogoIndex:      selectedBank?.id ?? null,
          remarkNote:         specialNote.trim(),
          openingBalance:     showOB && openingBalance ? Number(openingBalance) : 0,
          openingBalanceType: showOB && openingBalance ? openingBalanceType : "",
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

  /* Card sub-component — defined inside render but uses no hooks, so it's fine */
  const Card = ({ acct, highlight }) => {
    const isSelected = selected?.label === acct.label && selected?.subAccountType === acct.subAccountType;
    return (
      <button type="button"
        className={`ca2-card${isSelected ? " selected" : ""}${highlight ? " match" : ""}`}
        onClick={() => handlePick(acct)}>
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

  /* ── Render ── */
  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification message={notification.message} type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}/>

      <div className="ca2">
        {/* Page header */}
        <div style={{ marginBottom: 6 }}>
          <p className="ca2-eyebrow">Accounts</p>
          <h1 className="ca2-title">Create New Account</h1>
          <p className="ca2-sub">Pick a category — type &amp; sub-type fill automatically</p>
        </div>

        {/* Category search */}
        <div className="ca2-search-wrap">
          <span className="ca2-search-icon">
            <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"/>
            </svg>
          </span>
          <input ref={searchRef} className="ca2-search" placeholder="Search account types…"
            value={search} onChange={e => setSearch(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Escape") setSearch("");
              if (e.key === "Enter" && matches.length === 1) handlePick(matches[0]);
            }}/>
          {q && (
            <button className="ca2-search-clear" onClick={() => setSearch("")} title="Clear">
              <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>

        {/* Search results */}
        {q && (
          <div className="ca2-grid">
            {matches.length === 0
              ? <div className="ca2-no-results">No results for "{search}"</div>
              : matches.map(a => <Card key={`${a.label}-${a.subAccountType}`} acct={a} highlight={true}/>)}
          </div>
        )}

        {/* Grouped cards */}
        {showAll && groups.map(g => (
          <div key={g.type}>
            <div className="ca2-group-label">{g.type}</div>
            <div className="ca2-grid">
              {g.items.map(a => <Card key={`${a.label}-${a.subAccountType}`} acct={a} highlight={false}/>)}
            </div>
          </div>
        ))}

        {/* ── Detail form (shown after a category is picked) ── */}
        {selected && (
          <div className="ca2-form" ref={formRef}>
            {/* Category breadcrumb strip */}
            <div className="ca2-strip">
              <span className={`ca2-strip-pill ${selected.badgeClass}`}>{selected.accountType}</span>
              <span className="ca2-strip-sep">›</span>
              <span className="ca2-strip-pill" style={{ background: "#f1f5f9", color: "#475569" }}>{selected.subAccountType}</span>
              <span className="ca2-strip-auto">auto-assigned</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="ca2-form-body">

                {/* ── Bank picker — only for Bank category ── */}
                {selected.label === "Bank" && (
                  <div>
                    <label className="ca2-lbl">Select Bank <em>*</em></label>
                    <BankPicker
                      selectedBank={selectedBank}
                      setSelectedBank={setSelectedBank}
                      bankSearch={bankSearch}
                      setBankSearch={setBankSearch}
                      accountName={accountName}
                      setAccountName={setAccountName}
                      nameRef={nameRef}
                    />
                  </div>
                )}

                {/* ── Account Name ── */}
                <div>
                  <label className="ca2-lbl">
                    {selected.label === "Bank" ? "Account Title / Name" : "Account Name"} <em>*</em>
                  </label>
                  <input ref={nameRef} className="ca2-inp"
                    value={accountName} onChange={e => setAccountName(e.target.value)}
                    placeholder={
                      selected.label === "Bank"
                        ? (selectedBank ? `e.g. ${selectedBank.name} Current Account` : "Select bank first…")
                        : (NAME_HINTS[selected.label] ?? `e.g. ${selected.label} – Main`)
                    }
                    required/>
                </div>

                {/* ── Special Notes — optional, shown for ALL account types ── */}
                <div className="ca2-note-box">
                  <label className="ca2-lbl" style={{ marginBottom: 0 }}>
                    Special Notes <small>(optional)</small>
                  </label>
                  <input className="ca2-inp"
                    value={specialNote} onChange={e => setSpecialNote(e.target.value)}
                    placeholder="e.g. Lahore Branch · Main Supplier · Since 2020…"
                    maxLength={80}/>
                  {specialNote.trim() ? (
                    <p className="ca2-note-preview">
                      Saved as: <strong>
                        {selected.label} | {accountName.trim() || "Account Name"} — {specialNote.trim()}
                      </strong>
                    </p>
                  ) : (
                    <p className="ca2-note-hint">
                      Appended to name — shows everywhere as "Category | Name — Notes"
                    </p>
                  )}
                </div>

                {/* ── Ledger Reference ── */}
                <div>
                  <label className="ca2-lbl">Ledger Reference <small>(optional)</small></label>
                  <input className="ca2-inp mono" value={ledgerRef}
                    onChange={e => setLedgerRef(e.target.value)} placeholder="e.g. ACC-001"/>
                </div>

                {/* ── Opening Balance (collapsible) ── */}
                {!showOB ? (
                  <button type="button" className="ca2-ob-toggle" onClick={() => setShowOB(true)}>
                    <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                    </svg>
                    Set Opening Balance <small style={{ fontWeight: 400, color: "#94a3b8" }}>(optional)</small>
                  </button>
                ) : (
                  <div className="ca2-ob-section">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <label className="ca2-ob-label">Opening Balance</label>
                      <button type="button" onClick={() => { setShowOB(false); setOpeningBalance(""); }}
                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>
                        Remove ✕
                      </button>
                    </div>
                    <input className="ca2-ob-amount" type="number" min="0" step="0.01"
                      value={openingBalance} onChange={e => setOpeningBalance(e.target.value)} placeholder="e.g. 50000"/>
                    <div>
                      <label className="ca2-ob-label">This amount is a…</label>
                      <div className="ca2-ob-type-row">
                        <button type="button"
                          className={`ca2-ob-type-btn${openingBalanceType === "debit" ? " debit-active" : ""}`}
                          onClick={() => setOpeningBalanceType("debit")}>📥 Debit (Dr)</button>
                        <button type="button"
                          className={`ca2-ob-type-btn${openingBalanceType === "credit" ? " credit-active" : ""}`}
                          onClick={() => setOpeningBalanceType("credit")}>📤 Credit (Cr)</button>
                      </div>
                    </div>
                    {Number(openingBalance) > 0 && (() => {
                      const amt = Number(openingBalance);
                      const dr  = openingBalanceType === "debit"  ? amt : 0;
                      const cr  = openingBalanceType === "credit" ? amt : 0;
                      const bal = dr - cr;
                      return (
                        <div className="ca2-ob-preview">
                          <div className="ca2-ob-preview-item">Debit: <span className="dr">PKR {dr.toLocaleString()}</span></div>
                          <div className="ca2-ob-preview-item" style={{ color: "#94a3b8" }}>|</div>
                          <div className="ca2-ob-preview-item">Credit: <span className="cr">PKR {cr.toLocaleString()}</span></div>
                          <div className="ca2-ob-preview-item" style={{ color: "#94a3b8" }}>|</div>
                          <div className="ca2-ob-preview-item">Balance: <span className={bal >= 0 ? "bal-pos" : "bal-neg"}>PKR {bal.toLocaleString()}</span></div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* ── Live preview tile ── */}
                {accountName.trim() && (
                  <div className="ca2-preview">
                    {selected.label === "Bank" && selectedBank ? (
                      <img src={`/${selectedBank.id}.png`} alt={selectedBank.abbr}
                        style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 8,
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
                      </p>
                      {ledgerRef.trim() && <span className="ca2-preview-ref">{ledgerRef.trim()}</span>}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer buttons */}
              <div className="ca2-form-foot">
                <button type="button" className="ca2-btn-ghost" onClick={resetAll}>Cancel</button>
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