import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout";
import ChequeTopNav from "./ChequeTopNav";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";
import Notification from "../Notification";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .ccb { font-family: 'DM Sans', sans-serif; color: #111827; max-width: 640px; margin: 0 auto; }

  .ccb-inp {
    width: 100%; padding: 8px 11px;
    border: 1px solid #d1d5db; border-radius: 7px;
    font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s; appearance: none;
  }
  .ccb-inp::placeholder { color: #9ca3af; }
  .ccb-inp:focus { border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12); }
  .ccb-inp.mono { font-family: 'DM Mono', monospace; font-size: 12.5px; }

  .ccb-lbl {
    display: block; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .07em;
    color: #6b7280; margin-bottom: 5px;
  }
  .ccb-lbl em { color: #ef4444; font-style: normal; margin-left: 2px; }

  .ccb-section { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 10px; }
  .ccb-section-head {
    padding: 9px 14px; background: #f9fafb; border-bottom: 1px solid #e5e7eb;
    display: flex; align-items: center; gap: 7px;
  }
  .ccb-section-body { padding: 14px; display: flex; flex-direction: column; gap: 12px; }

  .ccb-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .ccb-leaf-row { display: grid; grid-template-columns: 1fr 22px 1fr; gap: 8px; align-items: end; }
  .ccb-leaf-sep { display: flex; align-items: center; justify-content: center;
    padding-bottom: 9px; color: #9ca3af; font-weight: 600; font-size: 14px; }

  .ccb-dd-btn {
    width: 100%; text-align: left; padding: 8px 11px;
    border: 1px solid #d1d5db; border-radius: 7px;
    font-size: 13px; font-family: 'DM Sans', sans-serif; color: #111827;
    background: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: space-between; gap: 8px;
    transition: border-color .12s, box-shadow .12s; outline: none;
  }
  .ccb-dd-btn.open { border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12); }

  .ccb-dd-item {
    padding: 9px 12px; cursor: pointer;
    border-bottom: 1px solid #f9fafb; color: #111827;
    display: flex; align-items: center; gap: 10px;
    transition: background .08s;
  }
  .ccb-dd-item:last-child { border-bottom: none; }
  .ccb-dd-item:hover { background: #f3f4f6; }
  .ccb-dd-item.sel  { background: #f0fdf4; }

  .ccb-hl { background: #fef9c3; border-radius: 2px; padding: 0 1px; font-weight: 700; }

  .ccb-preview {
    background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 7px;
    padding: 10px 14px; display: flex; align-items: center; justify-content: space-between;
    margin-top: 4px;
  }

  .ccb-submit {
    padding: 9px 20px; border-radius: 7px; border: none;
    background: #111827; color: #fff; font-size: 13px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    display: inline-flex; align-items: center; gap: 7px; transition: background .12s;
  }
  .ccb-submit:hover:not(:disabled) { background: #1f2937; }
  .ccb-submit:disabled { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; }

  .ccb-cancel {
    padding: 9px 16px; border-radius: 7px;
    border: 1px solid #e5e7eb; background: #fff;
    color: #374151; font-size: 13px; font-weight: 500;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    transition: background .1s;
  }
  .ccb-cancel:hover { background: #f9fafb; }

  @keyframes ccb-spin { to { transform: rotate(360deg); } }
  .ccb-spin { display: inline-block; animation: ccb-spin .7s linear infinite; }

  @media (max-width: 560px) {
    .ccb-g2, .ccb-leaf-row { grid-template-columns: 1fr; }
    .ccb-leaf-sep { display: none; }
  }
`;

// ── Bank catalogue — mirrors backend/utils/bankMeta.js ──────────────────────
// Single source of truth: any change here must also update the backend util.
const BANKS = [
  { id:1,  abbr:"NBP",   fullName:"National Bank of Pakistan",                  color:"#007940", bg:"#e6f4ec",  keys:["national bank","nbp"],  terms:["nbp","national"] },
  { id:2,  abbr:"BOP",   fullName:"The Bank of Punjab",                         color:"#1a237e", bg:"#e8eaf6",  keys:["bank of punjab","bop"],  terms:["bop","punjab"] },
  { id:3,  abbr:"BOK",   fullName:"The Bank of Khyber",                         color:"#2e4057", bg:"#eaecf0",  keys:["bank of khyber","bok"],  terms:["bok","khyber"] },
  { id:4,  abbr:"SBL",   fullName:"Sindh Bank Limited",                         color:"#374151", bg:"#f3f4f6",  keys:["sindh bank","sbl"],      terms:["sbl","sindh"] },
  { id:5,  abbr:"FWBL",  fullName:"First Women Bank Limited",                   color:"#7c3aed", bg:"#f5f3ff",  keys:["first women","fwbl"],    terms:["fwbl","first women"] },
  { id:6,  abbr:"HBL",   fullName:"Habib Bank Limited",                         color:"#006633", bg:"#e6f4ed",  keys:["habib bank","hbl"],      terms:["hbl","habib"] },
  { id:7,  abbr:"UBL",   fullName:"United Bank Limited",                        color:"#003087", bg:"#e8eef8",  keys:["united bank","ubl"],     terms:["ubl","united"] },
  { id:8,  abbr:"MCB",   fullName:"MCB Bank Limited",                           color:"#c8102e", bg:"#fce8ec",  keys:["mcb bank","mcb"],        terms:["mcb"] },
  { id:9,  abbr:"ABL",   fullName:"Allied Bank Limited",                        color:"#b8860b", bg:"#fdf6e3",  keys:["allied bank","abl"],     terms:["abl","allied"] },
  { id:10, abbr:"BAFL",  fullName:"Bank Alfalah Limited",                       color:"#c8102e", bg:"#fce8ec",  keys:["bank alfalah","alfalah","bafl"], terms:["bafl","alfalah"] },
  { id:11, abbr:"BAHL",  fullName:"Bank Al Habib Limited",                      color:"#00703c", bg:"#e6f4ed",  keys:["bank al habib","bahl"],  terms:["bahl","al habib"] },
  { id:12, abbr:"AKBL",  fullName:"Askari Bank Limited",                        color:"#004225", bg:"#e6f0ea",  keys:["askari","akbl"],         terms:["akbl","askari","ask"] },
  { id:13, abbr:"HMB",   fullName:"Habib Metropolitan Bank Limited",            color:"#1a3c6e", bg:"#eaf0f8",  keys:["habib metropolitan","hmb","habibmetro"], terms:["hmb","habib metro","metro"] },
  { id:14, abbr:"SNBL",  fullName:"Soneri Bank Limited",                        color:"#8b0000", bg:"#fce8e8",  keys:["soneri","snbl"],         terms:["snbl","soneri"] },
  { id:15, abbr:"JSBL",  fullName:"JS Bank Limited",                            color:"#d4380d", bg:"#fff2ed",  keys:["js bank","jsbl"],        terms:["jsbl","js"] },
  { id:16, abbr:"SAMB",  fullName:"Samba Bank Limited",                         color:"#d4001c", bg:"#fce8e8",  keys:["samba","samb"],          terms:["samb","samba"] },
  { id:17, abbr:"SILK",  fullName:"Silkbank Limited",                           color:"#7c3aed", bg:"#f5f3ff",  keys:["silkbank","silk"],       terms:["silk"] },
  { id:18, abbr:"SMBL",  fullName:"Summit Bank Limited",                        color:"#374151", bg:"#f3f4f6",  keys:["summit","smbl"],         terms:["smbl","summit"] },
  { id:19, abbr:"MEBL",  fullName:"Meezan Bank Limited",                        color:"#1a5276", bg:"#eaf0f8",  keys:["meezan","mebl"],         terms:["mebl","meezan"] },
  { id:20, abbr:"FABL",  fullName:"Faysal Bank Limited",                        color:"#7b3f00", bg:"#f5ece4",  keys:["faysal","fabl"],         terms:["fabl","faysal"] },
  { id:21, abbr:"BIPL",  fullName:"BankIslami Pakistan Limited",                color:"#065f46", bg:"#f0fdf4",  keys:["bankislami","bipl"],     terms:["bipl","bankislami","bank islami"] },
  { id:22, abbr:"DIBPL", fullName:"Dubai Islamic Bank Pakistan Limited",        color:"#c8102e", bg:"#fce8ec",  keys:["dubai islamic","dibpl","dib"], terms:["dibpl","dubai islamic","dib"] },
  { id:23, abbr:"ABPL",  fullName:"Al Baraka Bank (Pakistan) Limited",          color:"#2d6a4f", bg:"#e6f4ed",  keys:["al baraka","abpl"],      terms:["abpl","al baraka","baraka"] },
  { id:24, abbr:"MIBL",  fullName:"MCB Islamic Bank Limited",                   color:"#c8102e", bg:"#fce8ec",  keys:["mcb islamic","mibl"],    terms:["mibl","mcb islamic"] },
  { id:25, abbr:"SCBPL", fullName:"Standard Chartered Bank (Pakistan) Limited", color:"#0e5c96", bg:"#e8f0f8",  keys:["standard chartered","scbpl","scb"], terms:["scbpl","standard chartered","scb"] },
  { id:26, abbr:"BML",   fullName:"Bank Makramah Limited",                      color:"#374151", bg:"#f3f4f6",  keys:["bank makramah","bml"],   terms:["bml","makramah"] },
];

const BANKS_BY_IDX = Object.fromEntries(BANKS.map(b => [b.id, b]));

/**
 * Resolve bank metadata for an account.
 * Priority: logoIndex → stored bankName → keyword match on accountName
 */
function resolveBankMeta(account) {
  if (!account) return null;
  // 1. Logo index (user explicitly selected it)
  if (account.bankLogoIndex && BANKS_BY_IDX[account.bankLogoIndex]) {
    return BANKS_BY_IDX[account.bankLogoIndex];
  }
  // 2. Stored bankName (populated by backend on create/backfill)
  if (account.bankName) {
    const bn = account.bankName.toLowerCase();
    for (const b of BANKS) {
      if (b.fullName.toLowerCase() === bn) return b;
      if (b.keys.some(k => bn.includes(k))) return b;
    }
  }
  // 3. Keyword match on account name
  const n = (account.accountName || "").toLowerCase();
  for (const b of BANKS) {
    if (b.keys.some(k => n.includes(k))) return b;
  }
  return null;
}

/**
 * Search: returns true if query matches ANY of:
 *   bank full name, abbr, search terms — OR — account name / remark note
 * This lets users type "askari", "ask", "hbl", "habib", "united", "Al Rehman", "Lahore"
 */
function matchesQuery(acc, q) {
  if (!q?.trim()) return true;
  const lq = q.toLowerCase().trim();
  const meta = resolveBankMeta(acc);
  if (meta) {
    if (meta.fullName.toLowerCase().includes(lq)) return true;
    if (meta.abbr.toLowerCase().includes(lq)) return true;
    if (meta.terms.some(t => t.includes(lq))) return true;
  }
  // Stored bankName
  if ((acc.bankName || "").toLowerCase().includes(lq)) return true;
  // Account title and remark
  if ((acc.accountName || "").toLowerCase().includes(lq)) return true;
  if ((acc.remarkNote  || "").toLowerCase().includes(lq)) return true;
  return false;
}

// Legacy wrapper kept for BankBadge
function getBankMeta(accountName) {
  const fake = { accountName, bankLogoIndex: null, bankName: null };
  const m = resolveBankMeta(fake);
  if (m) return { abbr:m.abbr, color:m.color, bg:m.bg, fullName:m.fullName };
  return { abbr:"BNK", color:"#374151", bg:"#f3f4f6", fullName:"" };
}


// ── Inline text highlighter ─────────────────────────────────────────────────
function Hl({ text, q }) {
  if (!q || !text) return <>{text || ""}</>;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="ccb-hl">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

// ── Bank logo / initial badge ────────────────────────────────────────────────
function BankBadge({ accountName, logoIndex, size = 32 }) {
  const m = getBankMeta(accountName);
  const [ok, setOk] = useState(true);
  if (logoIndex && ok) {
    return (
      <img src={`/${logoIndex}.png`} alt={m.abbr}
        style={{
          width: size, height: size, objectFit: "contain",
          borderRadius: Math.round(size * .25), border: "1px solid #e5e7eb",
          background: "#fff", padding: 2, flexShrink: 0,
        }}
        onError={() => setOk(false)}/>
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: Math.round(size * .25), flexShrink: 0,
      background: m.bg, border: `1px solid ${m.color}40`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * .28, fontWeight: 800, color: m.color,
      fontFamily: "'DM Mono', monospace", letterSpacing: "-.5px",
    }}>
      {m.abbr.slice(0, 5)}
    </div>
  );
}

// ── Dedicated bank-account dropdown ──────────────────────────────────────────
function BankAccountDropdown({ accounts, value, onChange }) {
  const [open,   setOpen]   = useState(false);
  const [q,      setQ]      = useState("");
  const [pos,    setPos]    = useState({ top:0, left:0, width:0 });
  const btnRef = useRef(null);
  const inpRef = useRef(null);

  const selected = accounts.find(a => a._id === value);
  const filtered = accounts.filter(a => matchesQuery(a, q));
  const selMeta  = selected ? resolveBankMeta(selected) : null;

  // Close on outside click
  useEffect(() => {
    const h = e => {
      if (!open) return;
      const p = document.getElementById("ccb-bank-portal");
      if (btnRef.current && !btnRef.current.contains(e.target) &&
         (!p || !p.contains(e.target))) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  // Focus search on open
  useEffect(() => { if (open) setTimeout(() => inpRef.current?.focus(), 0); }, [open]);

  // Recompute portal position
  useEffect(() => {
    if (!open) return;
    const calc = () => {
      const r = btnRef.current?.getBoundingClientRect();
      if (r) setPos({ top: r.bottom + 4, left: r.left, width: r.width });
    };
    calc();
    window.addEventListener("scroll", calc, true);
    window.addEventListener("resize", calc);
    return () => { window.removeEventListener("scroll", calc, true); window.removeEventListener("resize", calc); };
  }, [open]);

  return (
    <>
      {/* ── Trigger button ── */}
      <button ref={btnRef} type="button"
        className={`ccb-dd-btn${open ? " open" : ""}`}
        onClick={() => setOpen(o => !o)}>

        {selected ? (
          <div style={{ display:"flex", alignItems:"center", gap:9, flex:1, minWidth:0 }}>
            <BankBadge accountName={selected.accountName} logoIndex={selected.bankLogoIndex} size={24}/>
            <div style={{ minWidth:0 }}>
              {/* L1: Full bank name */}
              <div style={{ fontWeight:700, fontSize:12.5,
                color: selMeta?.color || "#111827",
                overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                {selMeta?.fullName || selected.accountName}
              </div>
              {/* L2: Account title — remark */}
              <div style={{ fontSize:10.5, color:"#6b7280", marginTop:1,
                lineHeight:1.3,
                overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                {selected.accountName}{selected.remarkNote ? ` — ${selected.remarkNote}` : ""}
              </div>
            </div>
          </div>
        ) : (
          <span style={{ color:"#9ca3af", fontStyle:"italic", flex:1, fontSize:13 }}>
            Search by account name, UBL, United Bank, branch…
          </span>
        )}

        <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2.5}
          style={{ flexShrink:0, transition:".15s", transform:open ? "rotate(180deg)" : "none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {/* ── Portal panel ── */}
      {open && (
        <div id="ccb-bank-portal" style={{
          position:"fixed", top:pos.top, left:pos.left,
          width: Math.max(pos.width, 360), zIndex:9999,
          background:"#fff", border:"1px solid #d1d5db",
          borderRadius:8, boxShadow:"0 6px 24px rgba(0,0,0,.13)", overflow:"hidden",
        }}>

          {/* Search */}
          <div style={{ padding:8, borderBottom:"1px solid #f3f4f6", background:"#f9fafb" }}>
            <div style={{ position:"relative" }}>
              <svg style={{ position:"absolute", left:9, top:"50%",
                transform:"translateY(-50%)", pointerEvents:"none" }}
                width={13} height={13} fill="none" viewBox="0 0 24 24"
                stroke="#9ca3af" strokeWidth={2}>
                <path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
                <circle cx={11} cy={11} r={8}/>
              </svg>
              <input ref={inpRef} value={q} onChange={e => setQ(e.target.value)}
                placeholder="Search by name, UBL, United Bank, HBL…"
                style={{ width:"100%", padding:"7px 9px 7px 28px",
                  border:"1px solid #e5e7eb", borderRadius:6, fontSize:12.5,
                  outline:"none", fontFamily:"'DM Sans',sans-serif", background:"#fff" }}/>
            </div>
            <div style={{ marginTop:5, fontSize:10.5, color:"#9ca3af", paddingLeft:1 }}>
              {filtered.length} of {accounts.length} account{accounts.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Results */}
          <ul style={{ maxHeight:270, overflowY:"auto", margin:0, padding:0, listStyle:"none" }}>
            {filtered.length === 0 ? (
              <li style={{ padding:"16px 12px", fontSize:12.5, color:"#9ca3af", textAlign:"center" }}>
                No accounts match — try "UBL", "United", or account name
              </li>
            ) : filtered.map(acc => {
              const meta  = resolveBankMeta(acc);
              const bal   = Number(acc.balance || 0);
              const isNeg = bal < 0;
              const isSelected = acc._id === value;
              return (
                <li key={acc._id}
                  className={`ccb-dd-item${isSelected ? " sel" : ""}`}
                  onClick={() => { onChange(acc); setOpen(false); setQ(""); }}>

                  <BankBadge accountName={acc.accountName} logoIndex={acc.bankLogoIndex} size={38}/>

                  <div style={{ flex:1, minWidth:0 }}>
                    {/* Line 1: Full Bank Name (e.g. "Habib Bank Limited") */}
                    <div style={{ fontSize:12.5, fontWeight:700,
                      color: meta ? meta.color : "#111827",
                      overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      {meta ? <Hl text={meta.fullName} q={q}/> : <Hl text={acc.accountName} q={q}/>}
                      {isSelected && (
                        <span style={{ marginLeft:6, fontSize:10, fontWeight:700,
                          color:"#15803d", background:"#f0fdf4", padding:"1px 5px",
                          borderRadius:4, border:"1px solid #bbf7d0" }}>Selected</span>
                      )}
                    </div>
                    {/* Line 2: Account Title — Remark (e.g. "Al Rehman Rice Mills — Lahore") */}
                    <div style={{ fontSize:11, color:"#6b7280", marginTop:2,
                      overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      <Hl text={acc.accountName} q={q}/>
                      {acc.remarkNote && (
                        <span style={{ color:"#9ca3af" }}>
                          {" — "}<Hl text={acc.remarkNote} q={q}/>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Balance */}
                  <div style={{ textAlign:"right", flexShrink:0, marginLeft:8 }}>
                    <div style={{ fontSize:9, fontWeight:700, textTransform:"uppercase",
                      letterSpacing:".06em", color:"#9ca3af", marginBottom:2 }}>Balance</div>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:12,
                      fontWeight:700, color: isNeg ? "#dc2626" : "#15803d" }}>
                      {isNeg ? "−" : ""}Rs{" "}
                      {Math.abs(bal).toLocaleString("en-PK",{ minimumFractionDigits:2 })}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

function SHead({ dot, title }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:7 }}>
      <div style={{ width:7, height:7, borderRadius:"50%", background:dot, flexShrink:0 }}/>
      <span style={{ fontSize:10.5, fontWeight:700, color:"#374151",
        textTransform:"uppercase", letterSpacing:".08em" }}>{title}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function CreateChequeBook() {
  const navigate = useNavigate();
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [notification, setNotification] = useState({ message:"", type:"info" });
  const [form, setForm] = useState({
    bankAccountId:"", bankAccountName:"", bankLogoIndex:null,
    branchName:"", branchCode:"",
    accountNumber:"", iban:"", accountTitle:"",
    startLeaf:"00000001", endLeaf:"00000100",
  });

  useEffect(() => {
    authFetch(`${API_BASE_URL}/accounts?category=Bank`)
      .then(r => r.json())
      .then(d => {
        const arr   = Array.isArray(d) ? d : (d.accounts || []);
        const banks = arr.filter(a => !a.isProtected && !a.isProductAccount && a.category === "Bank");
        setBankAccounts(
          banks.length > 0
            ? banks
            : arr.filter(a => !a.isProtected && !a.isProductAccount &&
                a.accountType === "Assets" && a.subAccountType === "Current Assets")
        );
      });
  }, []);

  const digits   = Math.max(form.startLeaf.length, form.endLeaf.length, 8);
  const startNum = parseInt(form.startLeaf) || 0;
  const endNum   = parseInt(form.endLeaf)   || 0;
  const leaves   = endNum > startNum ? endNum - startNum + 1 : 0;
  const selBank  = bankAccounts.find(a => a._id === form.bankAccountId);
  const selMeta  = selBank ? resolveBankMeta(selBank) : null;

  const pad = val => {
    const n = parseInt(val);
    return !isNaN(n) ? String(n).padStart(digits, "0") : val;
  };

  const submit = async e => {
    e.preventDefault();
    if (!form.bankAccountId)
      return setNotification({ message:"Please select a bank account.", type:"error" });
    if (leaves <= 0)
      return setNotification({ message:"End leaf must be greater than start leaf.", type:"error" });
    if (leaves > 500)
      return setNotification({ message:"Maximum 500 leaves per cheque book.", type:"error" });

    setLoading(true);
    const res  = await authFetch(`${API_BASE_URL}/cheque-books`, {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setNotification({ message:`Cheque book ${data.chequeBook.chequeBookId} created!`, type:"success" });
      setTimeout(() => navigate("/cheque-book/view"), 1400);
    } else {
      setNotification({ message: data.message || "Failed to create.", type:"error" });
    }
  };

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification message={notification.message} type={notification.type}
        onClose={() => setNotification({ message:"", type:"info" })}/>
      <ChequeTopNav active="create-book"/>

      <div className="ccb">
        <div style={{ marginBottom:16 }}>
          <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 3px" }}>Cheque Management</p>
          <h1 style={{ margin:0, fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px" }}>
            Create New Cheque Book
          </h1>
        </div>

        <form onSubmit={submit}>

          {/* ── Bank Account ──────────────────────────────────── */}
          <div className="ccb-section">
            <div className="ccb-section-head"><SHead dot="#3b82f6" title="Bank Account"/></div>
            <div className="ccb-section-body">
              <div>
                <label className="ccb-lbl">Select Bank Account <em>*</em></label>
                <BankAccountDropdown
                  accounts={bankAccounts}
                  value={form.bankAccountId}
                  onChange={acc => setForm(p => ({
                    ...p,
                    bankAccountId:   acc._id,
                    bankAccountName: acc.accountName,
                    bankLogoIndex:   acc.bankLogoIndex || null,
                  }))}/>
              </div>

              {/* Selected account info strip */}
              {selBank && (
                <div style={{ display:"flex", alignItems:"center", gap:12,
                  padding:"11px 13px", background:"#f9fafb",
                  borderRadius:7, border:"1px solid #e5e7eb" }}>
                  <BankBadge accountName={selBank.accountName}
                    logoIndex={selBank.bankLogoIndex} size={40}/>
                  <div style={{ flex:1, minWidth:0 }}>
                    {/* L1: Full bank name */}
                    <div style={{ fontWeight:700, fontSize:13,
                      color: selMeta?.color || "#111827" }}>
                      {selMeta?.fullName || selBank.accountName}
                    </div>
                    {/* L2: Account title — remark */}
                    <div style={{ fontSize:11, color:"#6b7280", marginTop:2 }}>
                      {selBank.accountName}{selBank.remarkNote ? ` — ${selBank.remarkNote}` : ""}
                    </div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:9, fontWeight:700, textTransform:"uppercase",
                      letterSpacing:".07em", color:"#9ca3af", marginBottom:2 }}>Balance</div>
                    <div style={{
                      fontFamily:"'DM Mono',monospace", fontSize:15, fontWeight:700,
                      color: Number(selBank.balance || 0) < 0 ? "#dc2626" : "#15803d",
                    }}>
                      {Number(selBank.balance||0) < 0 ? "−" : ""}Rs{" "}
                      {Math.abs(Number(selBank.balance||0)).toLocaleString("en-PK",{ minimumFractionDigits:2 })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Branch Details ────────────────────────────────── */}
          <div className="ccb-section">
            <div className="ccb-section-head"><SHead dot="#f59e0b" title="Branch Details"/></div>
            <div className="ccb-section-body">
              <div className="ccb-g2">
                <div>
                  <label className="ccb-lbl">Branch Name <em>*</em></label>
                  <input className="ccb-inp" placeholder="e.g. Main Branch Lahore"
                    value={form.branchName}
                    onChange={e => setForm(p => ({...p, branchName:e.target.value}))} required/>
                </div>
                <div>
                  <label className="ccb-lbl">Branch Code <em>*</em></label>
                  <input className="ccb-inp mono" placeholder="e.g. 0296"
                    value={form.branchCode}
                    onChange={e => setForm(p => ({...p, branchCode:e.target.value}))} required/>
                </div>
              </div>
            </div>
          </div>

          {/* ── Account Information ───────────────────────────── */}
          <div className="ccb-section">
            <div className="ccb-section-head"><SHead dot="#10b981" title="Account Information"/></div>
            <div className="ccb-section-body">
              <div>
                <label className="ccb-lbl">Account Title <em>*</em></label>
                <input className="ccb-inp" placeholder="e.g. AL REHMAN RICE MILLS (PVT) LTD"
                  value={form.accountTitle}
                  onChange={e => setForm(p => ({...p, accountTitle:e.target.value}))} required/>
              </div>
              <div className="ccb-g2">
                <div>
                  <label className="ccb-lbl">Account Number <em>*</em></label>
                  <input className="ccb-inp mono" placeholder="0000000000000"
                    value={form.accountNumber}
                    onChange={e => setForm(p => ({...p, accountNumber:e.target.value}))} required/>
                </div>
                <div>
                  <label className="ccb-lbl">IBAN <em>*</em></label>
                  <input className="ccb-inp mono" placeholder="PK36HABB0000296701869503"
                    value={form.iban}
                    onChange={e => setForm(p => ({...p, iban:e.target.value.toUpperCase()}))} required/>
                </div>
              </div>
            </div>
          </div>

          {/* ── Cheque Leaf Range ─────────────────────────────── */}
          <div className="ccb-section">
            <div className="ccb-section-head"><SHead dot="#8b5cf6" title="Cheque Leaf Range"/></div>
            <div className="ccb-section-body">
              <div className="ccb-leaf-row">
                <div>
                  <label className="ccb-lbl">Start Leaf <em>*</em></label>
                  <input className="ccb-inp mono" value={form.startLeaf}
                    onChange={e => setForm(p => ({...p, startLeaf:e.target.value}))}
                    onBlur={() => setForm(p => ({...p, startLeaf:pad(p.startLeaf)}))} required/>
                </div>
                <div className="ccb-leaf-sep">→</div>
                <div>
                  <label className="ccb-lbl">End Leaf <em>*</em></label>
                  <input className="ccb-inp mono" value={form.endLeaf}
                    onChange={e => setForm(p => ({...p, endLeaf:e.target.value}))}
                    onBlur={() => setForm(p => ({...p, endLeaf:pad(p.endLeaf)}))} required/>
                </div>
              </div>

              {leaves > 0 && (
                <div className="ccb-preview">
                  <span style={{ fontSize:12, color:"#15803d", fontWeight:600,
                    display:"flex", alignItems:"center", gap:6 }}>
                    <svg width={13} height={13} fill="none" viewBox="0 0 24 24"
                      stroke="#15803d" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    Total Cheque Leaves
                  </span>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:14,
                    fontWeight:700, color:"#15803d" }}>
                    {leaves} leaves
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── Footer ────────────────────────────────────────── */}
          <div style={{ display:"flex", justifyContent:"flex-end", gap:8, marginTop:4 }}>
            <button type="button" className="ccb-cancel"
              onClick={() => navigate("/cheque-book/view")}>Cancel</button>
            <button type="submit" className="ccb-submit"
              disabled={loading || leaves <= 0 || !form.bankAccountId}>
              {loading ? (
                <><span className="ccb-spin">⟳</span> Creating…</>
              ) : (
                <>
                  <svg width={13} height={13} fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  Create Cheque Book
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </SidebarLayout>
  );
}