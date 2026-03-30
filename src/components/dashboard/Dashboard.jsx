import React, { useEffect, useState, useMemo, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .db { font-family: 'DM Sans', sans-serif; color: #111827; max-width: 1180px; margin: 0 auto; }

  /* ── Section header ── */
  .db-sec {
    font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
    color: #9ca3af; margin: 22px 0 10px;
    display: flex; align-items: center; gap: 10px;
  }
  .db-sec::after { content:''; flex:1; height:1px; background:#e5e7eb; }

  /* ── Card ── */
  .db-card {
    background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;
    position: relative; overflow: hidden; transition: box-shadow .15s;
  }
  .db-card:hover { box-shadow: 0 3px 14px rgba(0,0,0,.07); }
  .db-accent { position: absolute; top: 0; left: 0; right: 0; height: 3px; }

  /* ── Card heading ── */
  .db-lbl {
    font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
    color: #6b7280; margin-bottom: 6px;
  }
  .db-val {
    font-family: 'DM Mono', monospace; font-size: 22px; font-weight: 700;
    color: #111827; letter-spacing: -.5px; line-height: 1;
  }
  .db-val.pos { color: #15803d; }
  .db-val.neg { color: #b91c1c; }
  .db-val.dk  { color: #1f2937; }
  .db-sub { font-size: 11.5px; color: #9ca3af; margin-top: 5px; }

  /* ── Period pills ── */
  .db-filter { display: flex; gap: 4px; flex-wrap: wrap; margin-top: 10px; }
  .db-fpill {
    padding: 3px 9px; border-radius: 5px; font-size: 10px; font-weight: 600;
    border: 1px solid #e5e7eb; background: #fff; color: #6b7280;
    cursor: pointer; transition: all .1s; font-family: 'DM Sans', sans-serif;
  }
  .db-fpill:hover { border-color: #374151; color: #111827; }
  .db-fpill.on { background: #111827; color: #fff; border-color: #111827; }
  .db-fpill-date {
    padding: 3px 7px; border-radius: 5px; font-size: 10px;
    border: 1px solid #e5e7eb; background: #fff; color: #111827;
    outline: none; font-family: 'DM Mono', monospace;
  }
  .db-fpill-date:focus { border-color: #6b7280; }

  /* ── Account row ── */
  .db-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 5px 0; border-bottom: 1px solid #f9fafb; font-size: 12px;
  }
  .db-row:last-child { border-bottom: none; }
  .db-rn { color: #374151; font-weight: 500; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .db-rb { font-family: 'DM Mono', monospace; font-size: 11.5px; font-weight: 600; flex-shrink: 0; margin-left: 8px; }
  .db-rb.pos { color: #15803d; }
  .db-rb.neg { color: #b91c1c; }

  /* ── Expand btn ── */
  .db-more {
    width: 100%; margin-top: 7px; padding: 4px; border: 1px solid #e5e7eb;
    border-radius: 5px; background: #f9fafb; color: #6b7280;
    font-size: 11px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all .1s; display: flex; align-items: center; justify-content: center; gap: 4px;
  }
  .db-more:hover { background: #e5e7eb; color: #111827; }

  /* ── Cheque row ── */
  .db-cq { display: flex; align-items: center; gap: 7px; padding: 6px 8px; border-radius: 6px; background: #f9fafb; margin-bottom: 4px; font-size: 11.5px; }
  .db-cq:last-child { margin-bottom: 0; }
  .db-cq-no   { font-family: 'DM Mono', monospace; font-size: 10px; color: #9ca3af; flex-shrink: 0; }
  .db-cq-name { flex: 1; color: #374151; font-weight: 500; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .db-cq-amt  { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 600; color: #1f2937; flex-shrink: 0; }
  .db-cq-badge { font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: #fffbeb; color: #92400e; border: 1px solid #fde68a; flex-shrink: 0; }

  /* ── Mini bar ── */
  .db-bar-row { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; }
  .db-bar-lbl { font-size: 10px; color: #9ca3af; min-width: 32px; text-align: right; font-family: 'DM Mono', monospace; }
  .db-bar-track { flex: 1; height: 5px; background: #f3f4f6; border-radius: 3px; overflow: hidden; }
  .db-bar-fill  { height: 100%; border-radius: 3px; transition: width .4s ease; }
  .db-bar-val   { font-size: 10px; color: #9ca3af; min-width: 60px; font-family: 'DM Mono', monospace; }

  /* ── Skeleton ── */
  @keyframes db-sk { to { background-position: -200% 0; } }
  .db-sk {
    background: linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%);
    background-size: 200% 100%; animation: db-sk 1.4s infinite; border-radius: 5px;
  }

  /* ── Bank row ── */
  .db-bank-row {
    display: flex; align-items: center; gap: 9px;
    padding: 6px 0; border-bottom: 1px solid #f9fafb; font-size: 12px;
  }
  .db-bank-row:last-child { border-bottom: none; }
  .db-bank-badge {
    width: 28px; height: 28px; border-radius: 6px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Mono', monospace; font-size: 8px; font-weight: 700;
    border: 1px solid #e5e7eb; overflow: hidden; background: #f9fafb;
  }
  .db-bank-badge img { width: 100%; height: 100%; object-fit: contain; padding: 2px; }
  .db-bank-info { flex: 1; min-width: 0; }
  .db-bank-full { font-size: 10px; font-weight: 600; color: #6b7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .db-bank-name { font-size: 12px; font-weight: 700; color: #111827; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  /* ── Product filter dropdown ── */
  .db-prod-wrap { position: relative; margin-top: 10px; }
  .db-prod-btn {
    width: 100%; text-align: left; padding: 6px 10px;
    border: 1px solid #e5e7eb; border-radius: 6px;
    font-size: 11.5px; font-family: 'DM Sans', sans-serif; color: #374151;
    background: #f9fafb; cursor: pointer;
    display: flex; align-items: center; justify-content: space-between; gap: 6px;
    transition: border-color .12s;
  }
  .db-prod-btn:hover { border-color: #d1d5db; background: #fff; }
  .db-prod-btn.open { border-color: #6b7280; background: #fff; box-shadow: 0 0 0 2px rgba(107,114,128,.1); }
  .db-prod-panel {
    position: fixed; z-index: 9500;
    background: #fff; border: 1px solid #d1d5db; border-radius: 7px;
    box-shadow: 0 4px 16px rgba(0,0,0,.1); overflow: hidden;
  }
  .db-prod-search {
    width: 100%; padding: 7px 10px; border: none; border-bottom: 1px solid #f3f4f6;
    font-size: 12px; font-family: 'DM Sans', sans-serif; outline: none;
    background: #f9fafb;
  }
  .db-prod-item {
    padding: 7px 12px; font-size: 12px; cursor: pointer; color: #374151;
    border-bottom: 1px solid #f9fafb; transition: background .08s;
    display: flex; align-items: center; gap: 7px;
  }
  .db-prod-item:hover { background: #f3f4f6; }
  .db-prod-item.sel { background: #f0fdf4; color: #15803d; font-weight: 600; }
  .db-prod-item:last-child { border-bottom: none; }
  .db-prod-check { width: 14px; height: 14px; border-radius: 3px; border: 1.5px solid #d1d5db; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .db-prod-check.on { background: #15803d; border-color: #15803d; }

  /* ── Grids ── */
  .db-g3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
  .db-g2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }
  .db-g4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }

  @media (max-width: 1024px) { .db-g4{grid-template-columns:repeat(2,1fr);} .db-g3{grid-template-columns:repeat(2,1fr);} }
  @media (max-width: 640px)  { .db-g4,.db-g3,.db-g2{grid-template-columns:1fr;} .db-val{font-size:18px;} }
`;

/* ── Bank metadata — SHARED with backend/utils/bankMeta.js ──────────────────
   Source of truth: 26 Pakistani banks, indexed by logoIndex (1-26 = /1.png-/26.png)
   Any change to bank list must be mirrored in backend/utils/bankMeta.js
   ─────────────────────────────────────────────────────────────────────────── */
const BANKS = [
  { id:1,  abbr:"NBP",   fullName:"National Bank of Pakistan",                  color:"#007940", bg:"#e6f4ec",  keys:["national bank","nbp"] },
  { id:2,  abbr:"BOP",   fullName:"The Bank of Punjab",                         color:"#1a237e", bg:"#e8eaf6",  keys:["bank of punjab","bop"] },
  { id:3,  abbr:"BOK",   fullName:"The Bank of Khyber",                         color:"#2e4057", bg:"#eaecf0",  keys:["bank of khyber","bok"] },
  { id:4,  abbr:"SBL",   fullName:"Sindh Bank Limited",                         color:"#374151", bg:"#f3f4f6",  keys:["sindh bank","sbl"] },
  { id:5,  abbr:"FWBL",  fullName:"First Women Bank Limited",                   color:"#7c3aed", bg:"#f5f3ff",  keys:["first women","fwbl"] },
  { id:6,  abbr:"HBL",   fullName:"Habib Bank Limited",                         color:"#006633", bg:"#e6f4ed",  keys:["habib bank","hbl"] },
  { id:7,  abbr:"UBL",   fullName:"United Bank Limited",                        color:"#003087", bg:"#e8eef8",  keys:["united bank","ubl"] },
  { id:8,  abbr:"MCB",   fullName:"MCB Bank Limited",                           color:"#c8102e", bg:"#fce8ec",  keys:["mcb bank","mcb"] },
  { id:9,  abbr:"ABL",   fullName:"Allied Bank Limited",                        color:"#b8860b", bg:"#fdf6e3",  keys:["allied bank","abl"] },
  { id:10, abbr:"BAFL",  fullName:"Bank Alfalah Limited",                       color:"#c8102e", bg:"#fce8ec",  keys:["bank alfalah","alfalah","bafl"] },
  { id:11, abbr:"BAHL",  fullName:"Bank Al Habib Limited",                      color:"#00703c", bg:"#e6f4ed",  keys:["bank al habib","bahl"] },
  { id:12, abbr:"AKBL",  fullName:"Askari Bank Limited",                        color:"#004225", bg:"#e6f0ea",  keys:["askari","akbl"] },
  { id:13, abbr:"HMB",   fullName:"Habib Metropolitan Bank Limited",            color:"#1a3c6e", bg:"#eaf0f8",  keys:["habib metropolitan","hmb","habibmetro"] },
  { id:14, abbr:"SNBL",  fullName:"Soneri Bank Limited",                        color:"#8b0000", bg:"#fce8e8",  keys:["soneri","snbl"] },
  { id:15, abbr:"JSBL",  fullName:"JS Bank Limited",                            color:"#d4380d", bg:"#fff2ed",  keys:["js bank","jsbl"] },
  { id:16, abbr:"SAMB",  fullName:"Samba Bank Limited",                         color:"#d4001c", bg:"#fce8e8",  keys:["samba","samb"] },
  { id:17, abbr:"SILK",  fullName:"Silkbank Limited",                           color:"#7c3aed", bg:"#f5f3ff",  keys:["silkbank","silk"] },
  { id:18, abbr:"SMBL",  fullName:"Summit Bank Limited",                        color:"#374151", bg:"#f3f4f6",  keys:["summit","smbl"] },
  { id:19, abbr:"MEBL",  fullName:"Meezan Bank Limited",                        color:"#1a5276", bg:"#eaf0f8",  keys:["meezan","mebl"] },
  { id:20, abbr:"FABL",  fullName:"Faysal Bank Limited",                        color:"#7b3f00", bg:"#f5ece4",  keys:["faysal","fabl"] },
  { id:21, abbr:"BIPL",  fullName:"BankIslami Pakistan Limited",                color:"#065f46", bg:"#f0fdf4",  keys:["bankislami","bipl"] },
  { id:22, abbr:"DIBPL", fullName:"Dubai Islamic Bank Pakistan Limited",        color:"#c8102e", bg:"#fce8ec",  keys:["dubai islamic","dibpl","dib"] },
  { id:23, abbr:"ABPL",  fullName:"Al Baraka Bank (Pakistan) Limited",          color:"#2d6a4f", bg:"#e6f4ed",  keys:["al baraka","abpl"] },
  { id:24, abbr:"MIBL",  fullName:"MCB Islamic Bank Limited",                   color:"#c8102e", bg:"#fce8ec",  keys:["mcb islamic","mibl"] },
  { id:25, abbr:"SCBPL", fullName:"Standard Chartered Bank (Pakistan) Limited", color:"#0e5c96", bg:"#e8f0f8",  keys:["standard chartered","scbpl","scb"] },
  { id:26, abbr:"BML",   fullName:"Bank Makramah Limited",                      color:"#374151", bg:"#f3f4f6",  keys:["bank makramah","bml"] },
];

// O(1) lookup by logoIndex
const BANKS_BY_IDX = Object.fromEntries(BANKS.map(b => [b.id, b]));

/**
 * Resolve bank metadata from account object.
 * Priority: logoIndex (stored by user) → bankName (stored by backend) → keyword match on accountName
 * Returns full metadata or a fallback with derived initials.
 */
function resolveBankMeta(account) {
  // 1. Logo index — most reliable
  if (account?.bankLogoIndex && BANKS_BY_IDX[account.bankLogoIndex]) {
    return BANKS_BY_IDX[account.bankLogoIndex];
  }
  // 2. bankName stored by backend (set via accountController + bankMeta.js)
  if (account?.bankName) {
    const stored = account.bankName.toLowerCase();
    for (const b of BANKS) {
      if (b.fullName.toLowerCase() === stored) return b;
      if (b.keys.some(k => stored.includes(k))) return b;
    }
  }
  // 3. Keyword match on accountName (fallback for old records without bankName)
  const n = (account?.accountName || "").toLowerCase();
  for (const b of BANKS) {
    if (b.keys.some(k => n.includes(k))) return b;
  }
  return null;
}

/**
 * Returns display object for a bank account:
 *   line1 = Full bank name  (e.g. "Habib Bank Limited")
 *   line2 = Account title — remark  (e.g. "Al Rehman Rice Mills — Lahore")
 *   abbr, color, bg, logoIndex
 */
function getBankDisplay(account) {
  const meta = resolveBankMeta(account);
  const accountTitle = account?.accountName || "";
  const remark = account?.remarkNote ? ` — ${account.remarkNote}` : "";
  const line2 = `${accountTitle}${remark}`;

  if (meta) {
    return {
      line1: meta.fullName,
      line2,
      abbr:       meta.abbr,
      color:      meta.color,
      bg:         meta.bg,
      logoIndex:  account?.bankLogoIndex || null,
    };
  }

  // Unknown bank — show accountName as line1, no line2
  return {
    line1: accountTitle,
    line2: account?.remarkNote || "",
    abbr:  (accountTitle.match(/[A-Z]/g)||[]).join("").slice(0,5) || "BNK",
    color: "#6b7280",
    bg:    "#f3f4f6",
    logoIndex: null,
  };
}


function BankBadge({ account }) {
  const meta    = resolveBankMeta(account);
  const abbr    = meta?.abbr || "BNK";
  const color   = meta?.color || "#6b7280";
  const logoIdx = account?.bankLogoIndex;
  const [imgOk, setImgOk] = useState(true);
  if (logoIdx && imgOk) {
    return (
      <div className="db-bank-badge">
        <img src={`/${logoIdx}.png`} alt={abbr} onError={() => setImgOk(false)}/>
      </div>
    );
  }
  return (
    <div className="db-bank-badge" style={{ color, background:`${color}14`, borderColor:`${color}30` }}>
      {abbr.slice(0,5)}
    </div>
  );
}

const Rs  = v => "Rs " + Number(v||0).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0});
const tod = () => new Date().toISOString().slice(0,10);
const sow = () => { const d=new Date(); d.setDate(d.getDate()-d.getDay()); return d.toISOString().slice(0,10); };
const som = () => new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().slice(0,10);
const inR = (ds,f,t) => { if(!ds) return false; const d=(ds||"").slice(0,10); return (!f||d>=f)&&(!t||d<=t); };

function usePeriod(def="today") {
  const [mode,setMode] = useState(def);
  const [custom,setCustom] = useState({from:tod(),to:tod()});
  const {from,to} = useMemo(()=>{
    if(mode==="today")  return {from:tod(),to:tod()};
    if(mode==="week")   return {from:sow(),to:tod()};
    if(mode==="month")  return {from:som(),to:tod()};
    if(mode==="custom") return {from:custom.from,to:custom.to};
    return {from:null,to:null};
  },[mode,custom]);
  return {mode,setMode,from,to,custom,setCustom};
}

function PeriodPicker({p}) {
  const pills=["today","week","month","all"];
  const lbl={today:"Today",week:"Week",month:"Month",all:"All time"};
  return (
    <div className="db-filter">
      {pills.map(m=><button key={m} className={`db-fpill${p.mode===m?" on":""}`} onClick={()=>p.setMode(m)}>{lbl[m]}</button>)}
      <button className={`db-fpill${p.mode==="custom"?" on":""}`} onClick={()=>p.setMode("custom")}>Custom</button>
      {p.mode==="custom" && <>
        <input type="date" className="db-fpill-date" value={p.custom.from} onChange={e=>p.setCustom(c=>({...c,from:e.target.value}))}/>
        <input type="date" className="db-fpill-date" value={p.custom.to}   onChange={e=>p.setCustom(c=>({...c,to:e.target.value}))}/>
      </>}
    </div>
  );
}

function MiniBar({data,color}) {
  const max=Math.max(...data.map(d=>d.value),1);
  return <div style={{marginTop:10}}>
    {data.map((d,i)=>(
      <div key={i} className="db-bar-row">
        <span className="db-bar-lbl">{d.label}</span>
        <div className="db-bar-track"><div className="db-bar-fill" style={{width:`${Math.round(d.value/max*100)}%`,background:color||"#111827"}}/></div>
        <span className="db-bar-val">{Rs(d.value)}</span>
      </div>
    ))}
  </div>;
}

/* ── Product filter dropdown ── */
function ProductFilter({ products, selected, onChange }) {
  const [open, setOpen]  = useState(false);
  const [q,    setQ]     = useState("");
  const btnRef = useRef(null);
  const panelRef = useRef(null);
  const [coords, setCoords] = useState({ top:0, left:0, width:0 });

  useEffect(() => {
    const h = e => {
      if (!btnRef.current?.contains(e.target) && !panelRef.current?.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    if (!open) return;
    const calc = () => {
      const r = btnRef.current?.getBoundingClientRect();
      if (r) setCoords({ top:r.bottom+3, left:r.left, width:r.width });
    };
    calc();
    window.addEventListener("scroll", calc, true);
    window.addEventListener("resize", calc);
    return () => { window.removeEventListener("scroll", calc, true); window.removeEventListener("resize", calc); };
  }, [open]);

  const filtered = products.filter(p => p.toLowerCase().includes(q.toLowerCase()));
  const label = selected.length===0 ? "All Products" : selected.length===1 ? selected[0] : `${selected.length} products`;

  const toggle = (p) => {
    if (selected.includes(p)) onChange(selected.filter(x=>x!==p));
    else onChange([...selected, p]);
  };

  return (
    <div className="db-prod-wrap">
      <button ref={btnRef} className={`db-prod-btn${open?" open":""}`} onClick={()=>setOpen(o=>!o)}>
        <span style={{ color:selected.length>0?"#15803d":"#9ca3af", fontWeight:selected.length>0?600:400 }}>
          {selected.length>0 && "🔽 "}{label}
        </span>
        <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2.5}
          style={{ flexShrink:0, transition:".12s", transform:open?"rotate(180deg)":"none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <div ref={panelRef} className="db-prod-panel" style={{ top:coords.top, left:coords.left, width:Math.max(coords.width,200) }}>
          <input autoFocus className="db-prod-search" placeholder="Search product…" value={q} onChange={e=>setQ(e.target.value)}/>
          <div style={{ maxHeight:180, overflowY:"auto" }}>
            <div className={`db-prod-item${selected.length===0?" sel":""}`} onClick={()=>{ onChange([]); setOpen(false); }}>
              <div className={`db-prod-check${selected.length===0?" on":""}`}>
                {selected.length===0 && <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
              </div>
              All Products
            </div>
            {filtered.map(p=>(
              <div key={p} className={`db-prod-item${selected.includes(p)?" sel":""}`} onClick={()=>toggle(p)}>
                <div className={`db-prod-check${selected.includes(p)?" on":""}`}>
                  {selected.includes(p) && <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                </div>
                {p}
              </div>
            ))}
            {filtered.length===0 && <div style={{ padding:"10px 12px", fontSize:12, color:"#9ca3af", textAlign:"center" }}>No products</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const name         = localStorage.getItem("name")||"User";
  const businessName = localStorage.getItem("businessName")||"";

  const [loading,   setLoading]   = useState(true);
  const [accounts,  setAccounts]  = useState([]);
  const [sales,     setSales]     = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [cashBal,   setCashBal]   = useState(null);
  const [cheques,   setCheques]   = useState([]);
  const [wbEntries, setWbEntries] = useState([]);

  const salesP = usePeriod("today");
  const purchP = usePeriod("today");

  const [showBank,  setShowBank]  = useState(false);
  const [showRcv,   setShowRcv]   = useState(false);
  const [showPay,   setShowPay]   = useState(false);
  const [showInv,   setShowInv]   = useState(false);
  const [showCheq,  setShowCheq]  = useState(false);

  // Product filters for Sales & Purchases
  const [salesProd, setSalesProd] = useState([]);
  const [purchProd, setPurchProd] = useState([]);

  useEffect(()=>{
    (async()=>{
      setLoading(true);
      await Promise.allSettled([
        authFetch(`${API_BASE_URL}/accounts`).then(r=>r.ok&&r.json()).then(d=>d&&setAccounts(Array.isArray(d)?d:[])),
        authFetch(`${API_BASE_URL}/sales-invoice`).then(r=>r.ok&&r.json()).then(d=>{ if(d)setSales(d.invoices||(Array.isArray(d)?d:[])); }),
        authFetch(`${API_BASE_URL}/purchase-invoice`).then(r=>r.ok&&r.json()).then(d=>{ if(d)setPurchases(d.invoices||(Array.isArray(d)?d:[])); }),
        authFetch(`${API_BASE_URL}/cashbook-report`).then(r=>r.ok&&r.json()).then(d=>{ if(d)setCashBal(d.currentBalance??0); }),
        authFetch(`${API_BASE_URL}/cheque-entries`).then(r=>r.ok&&r.json()).then(d=>{ if(d)setCheques((d.chequeEntries||[]).filter(c=>c.status==="issued")); }),
        authFetch(`${API_BASE_URL}/weight-bridge`).then(r=>r.ok&&r.json()).then(d=>{ if(d)setWbEntries(d.entries||(Array.isArray(d)?d:[])); }),
      ]);
      setLoading(false);
    })();
  },[]);

  /* Accounts */
  const bankAccts = useMemo(()=>accounts.filter(a=>a.category==="Bank"||(a.accountType==="Assets"&&a.LedgerRef?.toLowerCase().includes("bank"))),[accounts]);
  const totalBank = useMemo(()=>bankAccts.reduce((s,a)=>s+(a.balance||0),0),[bankAccts]);
  const totalCash = (cashBal??0)+totalBank;

  const invAccts  = useMemo(()=>accounts.filter(a=>a.category?.toLowerCase().includes("invest")||a.accountName?.toLowerCase().includes("investor")),[accounts]);
  const totalInv  = useMemo(()=>invAccts.reduce((s,a)=>s+Math.abs(a.balance||0),0),[invAccts]);

  // Receivables = Assets with positive balance (non-bank, non-product) + Loan Given
  const rcvAccts  = useMemo(()=>accounts.filter(a=>
    !a.isProtected && !a.isProductAccount && (a.balance||0)>0 &&
    (a.accountType==="Assets" || a.category?.toLowerCase().includes("loan given")) &&
    a.category!=="Bank" && !a.LedgerRef?.toLowerCase().includes("bank")
  ),[accounts]);
  const totalRcv  = useMemo(()=>rcvAccts.reduce((s,a)=>s+(a.balance||0),0),[rcvAccts]);

  // Payables = Liabilities (non-employee) + Loan Taken
  const payAccts  = useMemo(()=>accounts.filter(a=>
    !a.isProtected && (a.balance||0)!==0 &&
    (a.accountType==="Liabilities" || a.category?.toLowerCase().includes("loan taken")) &&
    !a.category?.includes("Employee")
  ),[accounts]);
  const totalPay  = useMemo(()=>payAccts.reduce((s,a)=>s+Math.abs(a.balance||0),0),[payAccts]);

  const netPos    = totalRcv - totalPay;

  const expAccts  = useMemo(()=>accounts.filter(a=>a.accountType==="Expense"),[accounts]);
  const totalExp  = useMemo(()=>expAccts.reduce((s,a)=>s+Math.abs(a.balance||0),0),[expAccts]);

  /* Unique products from invoices */
  const saleProducts = useMemo(()=>{
    const s=new Set();
    sales.forEach(i=>{ const p=i.productName||i.product; if(p)s.add(p); (i.items||[]).forEach(it=>{ if(it.productName)s.add(it.productName); }); });
    return [...s].sort();
  },[sales]);
  const purchProducts = useMemo(()=>{
    const s=new Set();
    purchases.forEach(i=>{ const p=i.productName||i.product; if(p)s.add(p); (i.items||[]).forEach(it=>{ if(it.productName)s.add(it.productName); }); });
    return [...s].sort();
  },[purchases]);

  /* Filter invoices by period + product */
  const matchesProd = (inv, prods) => {
    if (prods.length===0) return true;
    const p = inv.productName||inv.product||"";
    if (prods.includes(p)) return true;
    return (inv.items||[]).some(it=>prods.includes(it.productName));
  };
  const filtSales = useMemo(()=>sales.filter(i=>inR(i.date||i.createdAt,salesP.from,salesP.to)&&matchesProd(i,salesProd)),[sales,salesP.from,salesP.to,salesProd]);
  const filtPurch = useMemo(()=>purchases.filter(i=>inR(i.date||i.createdAt,purchP.from,purchP.to)&&matchesProd(i,purchProd)),[purchases,purchP.from,purchP.to,purchProd]);

  const totalS = useMemo(()=>filtSales.reduce((s,i)=>s+(Number(i.totalAmount||i.amount)||0),0),[filtSales]);
  const totalP = useMemo(()=>filtPurch.reduce((s,i)=>s+(Number(i.totalAmount||i.finalAmount||i.amount)||0),0),[filtPurch]);

  /* Weight bridge — each completed entry earns vehicle rate */
  const wbDone     = useMemo(()=>wbEntries.filter(e=>e.completed),[wbEntries]);
  const wbEarning  = useMemo(()=>wbDone.reduce((s,e)=>s+(e.rate||0),0),[wbDone]);

  // Breakdown by vehicle type: count entries + total earnings
  const wbByType   = useMemo(()=>{
    const map={};
    wbDone.forEach(e=>{ const t=e.vehicleType||"Unknown"; if(!map[t])map[t]={count:0,total:0}; map[t].count++; map[t].total+=(e.rate||0); });
    return Object.entries(map).sort((a,b)=>b[1].total-a[1].total);
  },[wbDone]);

  const cqTotal    = useMemo(()=>cheques.reduce((s,c)=>s+(c.amount||0),0),[cheques]);

  const sChart = useMemo(()=>Array.from({length:7},(_,i)=>{
    const d=new Date(); d.setDate(d.getDate()-(6-i));
    const ds=d.toISOString().slice(0,10);
    const lbl=d.toLocaleDateString("en-PK",{weekday:"short"});
    return {label:lbl,value:sales.filter(s=>(s.date||s.createdAt||"").slice(0,10)===ds&&matchesProd(s,salesProd)).reduce((sum,s)=>sum+(Number(s.totalAmount||s.amount)||0),0)};
  }),[sales,salesProd]);

  const pChart = useMemo(()=>Array.from({length:7},(_,i)=>{
    const d=new Date(); d.setDate(d.getDate()-(6-i));
    const ds=d.toISOString().slice(0,10);
    const lbl=d.toLocaleDateString("en-PK",{weekday:"short"});
    return {label:lbl,value:purchases.filter(p=>(p.date||p.createdAt||"").slice(0,10)===ds&&matchesProd(p,purchProd)).reduce((sum,p)=>sum+(Number(p.totalAmount||p.finalAmount||p.amount)||0),0)};
  }),[purchases,purchProd]);

  const dateStr  = new Date().toLocaleDateString("en-PK",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
  const greeting = (()=>{ const h=new Date().getHours(); return h<12?"Good morning":h<17?"Good afternoon":h<21?"Good evening":"Good night"; })();

  const Sk = () => <div className="db-sk" style={{width:"60%",height:20}}/>;

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <div className="db">

        {/* Header */}
        <div style={{ marginBottom:20, display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div>
            <p style={{ fontSize:10.5, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#9ca3af", margin:"0 0 3px" }}>
              {businessName||"Agro Plus"} · Operations
            </p>
            <h1 style={{ fontSize:22, fontWeight:700, color:"#111827", letterSpacing:"-.4px", margin:0 }}>
              {greeting}, <span style={{ color:"#6b7280", fontWeight:400, fontStyle:"italic" }}>{name.split(" ")[0]}</span>
            </h1>
            <p style={{ fontSize:12, color:"#9ca3af", margin:"3px 0 0" }}>{dateStr}</p>
          </div>
        </div>

        {/* ── CASH & BANKS ── */}
        <p className="db-sec">Cash &amp; Bank Position</p>
        <div className="db-g3">

          <div className="db-card" style={{ display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
            <div className="db-accent" style={{background:"#15803d"}}/>
            <div>
              <p className="db-lbl">Total Liquidity</p>
              {loading ? <Sk/> : <p className={`db-val ${totalCash>=0?"pos":"neg"}`} style={{fontSize:28}}>{Rs(totalCash)}</p>}
              <p className="db-sub">Cash in hand + all bank accounts</p>
            </div>
            {!loading && (
              <div style={{ marginTop:16, display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {[
                  { label:"Cash in Hand", value:cashBal??0, color:(cashBal??0)>=0?"#15803d":"#b91c1c", accent:(cashBal??0)>=0?"#f0fdf4":"#fef2f2", border:(cashBal??0)>=0?"#bbf7d0":"#fecaca" },
                  { label:"Total Bank",   value:totalBank,  color:totalBank>=0?"#1f2937":"#b91c1c", accent:totalBank>=0?"#f9fafb":"#fef2f2", border:totalBank>=0?"#e5e7eb":"#fecaca" },
                ].map(({label,value,color,accent,border})=>(
                  <div key={label} style={{ background:accent, border:`1px solid ${border}`, borderRadius:7, padding:"10px 12px" }}>
                    <p style={{ fontSize:9.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".08em", color:"#9ca3af", margin:"0 0 4px" }}>{label}</p>
                    <p style={{ fontFamily:"'DM Mono',monospace", fontSize:15, fontWeight:700, color, margin:0, letterSpacing:"-.3px" }}>{Rs(value)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="db-card" style={{ gridColumn:"span 2" }}>
            <div className="db-accent" style={{background:"#1f2937"}}/>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <p className="db-lbl" style={{margin:0}}>Bank Accounts</p>
              {!loading && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, color:"#1f2937" }}>{Rs(totalBank)}</span>}
            </div>
            {loading
              ? [0,1].map(i=><div key={i} className="db-sk" style={{width:"100%",height:11,marginBottom:6}}/>)
              : bankAccts.length===0
              ? <p style={{ fontSize:12, color:"#9ca3af" }}>No bank accounts found.</p>
              : <>
                  {(showBank?bankAccts:bankAccts.slice(0,4)).map(a=>{
                    const disp = getBankDisplay(a);
                    return (
                      <div key={a._id} className="db-bank-row">
                        <BankBadge account={a}/>
                        <div className="db-bank-info">
                          <div className="db-bank-full">{disp.line1}</div>
                          <div className="db-bank-name">{disp.line2}</div>
                        </div>
                        <span className={`db-rb ${(a.balance||0)>=0?"pos":"neg"}`}>{Rs(a.balance||0)}</span>
                      </div>
                    );
                  })}
                  {bankAccts.length>4 && <button className="db-more" onClick={()=>setShowBank(v=>!v)}>{showBank?"▲ Less":`▼ ${bankAccts.length-4} more`}</button>}
                </>
            }
          </div>
        </div>

        {/* ── SALES & PURCHASES ── */}
        <p className="db-sec">Sales &amp; Purchases</p>
        <div className="db-g2">

          <div className="db-card">
            <div className="db-accent" style={{background:"#15803d"}}/>
            <p className="db-lbl">Net Sales</p>
            {loading ? <Sk/> : <p className="db-val pos">{Rs(totalS)}</p>}
            <p className="db-sub">{filtSales.length} invoice{filtSales.length!==1?"s":""}{salesProd.length>0?` · ${salesProd.join(", ")}`:` · ${sales.length} total`}</p>
            <PeriodPicker p={salesP}/>
            {!loading && saleProducts.length>0 && <ProductFilter products={saleProducts} selected={salesProd} onChange={setSalesProd}/>}
            {!loading && <MiniBar data={sChart} color="#15803d"/>}
          </div>

          <div className="db-card">
            <div className="db-accent" style={{background:"#1f2937"}}/>
            <p className="db-lbl">Net Purchases</p>
            {loading ? <Sk/> : <p className="db-val dk">{Rs(totalP)}</p>}
            <p className="db-sub">{filtPurch.length} invoice{filtPurch.length!==1?"s":""}{purchProd.length>0?` · ${purchProd.join(", ")}`:` · ${purchases.length} total`}</p>
            <PeriodPicker p={purchP}/>
            {!loading && purchProducts.length>0 && <ProductFilter products={purchProducts} selected={purchProd} onChange={setPurchProd}/>}
            {!loading && <MiniBar data={pChart} color="#374151"/>}
          </div>
        </div>

        {/* ── FINANCIAL POSITION (merged: receivables + payables + net) ── */}
        <p className="db-sec">Financial Position</p>
        <div className="db-card" style={{ padding:0, overflow:"hidden" }}>
          {/* Top summary strip */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", borderBottom:"1px solid #f3f4f6" }}>
            {[
              { label:"Receivables", value:totalRcv, color:"#15803d", accent:"#15803d" },
              { label:"Payables",    value:totalPay, color:"#b91c1c", accent:"#b91c1c" },
              { label:"Net Position",value:Math.abs(netPos), color:netPos>=0?"#15803d":"#b91c1c", accent:netPos>=0?"#15803d":"#b91c1c",
                sub: netPos>=0?"Receivables exceed payables":"Payables exceed receivables" },
            ].map((s,i)=>(
              <div key={s.label} style={{
                padding:"14px 16px", position:"relative", overflow:"hidden",
                borderRight: i<2 ? "1px solid #f3f4f6" : "none",
              }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:s.accent }}/>
                <p className="db-lbl">{s.label}</p>
                {loading ? <Sk/> : <p className="db-val" style={{ color:s.color }}>{Rs(s.value)}</p>}
                {s.sub && <p className="db-sub" style={{ fontSize:10.5 }}>{s.sub}</p>}
              </div>
            ))}
          </div>
          {/* Account lists */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
            {/* Receivables list */}
            <div style={{ padding:"12px 16px", borderRight:"1px solid #f3f4f6" }}>
              <p style={{ fontSize:10, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".08em", marginBottom:8 }}>
                {rcvAccts.length} Receivable Account{rcvAccts.length!==1?"s":""}
              </p>
              {loading ? <div className="db-sk" style={{width:"80%",height:10}}/> :
               rcvAccts.length===0 ? <p style={{fontSize:12,color:"#9ca3af"}}>No receivables.</p> : <>
                {(showRcv?rcvAccts:rcvAccts.slice(0,5)).map(a=>(
                  <div key={a._id} className="db-row">
                    <span className="db-rn">{a.accountName}</span>
                    <span className="db-rb pos">{Rs(a.balance||0)}</span>
                  </div>
                ))}
                {rcvAccts.length>5 && <button className="db-more" onClick={()=>setShowRcv(v=>!v)}>{showRcv?"▲ Less":`▼ +${rcvAccts.length-5}`}</button>}
              </>}
            </div>
            {/* Payables list */}
            <div style={{ padding:"12px 16px" }}>
              <p style={{ fontSize:10, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".08em", marginBottom:8 }}>
                {payAccts.length} Payable Account{payAccts.length!==1?"s":""}
              </p>
              {loading ? <div className="db-sk" style={{width:"80%",height:10}}/> :
               payAccts.length===0 ? <p style={{fontSize:12,color:"#9ca3af"}}>No payables.</p> : <>
                {(showPay?payAccts:payAccts.slice(0,5)).map(a=>(
                  <div key={a._id} className="db-row">
                    <span className="db-rn">{a.accountName}</span>
                    <span className="db-rb neg">{Rs(Math.abs(a.balance||0))}</span>
                  </div>
                ))}
                {payAccts.length>5 && <button className="db-more" onClick={()=>setShowPay(v=>!v)}>{showPay?"▲ Less":`▼ +${payAccts.length-5}`}</button>}
              </>}
            </div>
          </div>
        </div>

        {/* ── INVESTMENT & EXPENSES ── */}
        <p className="db-sec">Investment &amp; Expenses</p>
        <div className="db-g2">

          <div className="db-card">
            <div className="db-accent" style={{background:"#1f2937"}}/>
            <p className="db-lbl">Investment</p>
            {loading ? <Sk/> : <p className="db-val dk">{Rs(totalInv)}</p>}
            <p className="db-sub">{invAccts.length} investor account{invAccts.length!==1?"s":""}</p>
            {!loading && invAccts.length>0 && <>
              {(showInv?invAccts:invAccts.slice(0,4)).map(a=>(
                <div key={a._id} className="db-row">
                  <span className="db-rn">{a.accountName}</span>
                  <span className="db-rb pos">{Rs(Math.abs(a.balance||0))}</span>
                </div>
              ))}
              {invAccts.length>4 && <button className="db-more" onClick={()=>setShowInv(v=>!v)}>{showInv?"▲ Less":`▼ +${invAccts.length-4}`}</button>}
            </>}
          </div>

          <div className="db-card">
            <div className="db-accent" style={{background:"#7c3aed"}}/>
            <p className="db-lbl">Expenses</p>
            {loading ? <Sk/> : <p className="db-val" style={{color:"#7c3aed"}}>{Rs(totalExp)}</p>}
            <p className="db-sub">{expAccts.length} expense account{expAccts.length!==1?"s":""}</p>
            {!loading && expAccts.length>0 && <>
              {expAccts.slice(0,5).map(a=>(
                <div key={a._id} className="db-row">
                  <span className="db-rn">{a.accountName.replace(" — Expense","")}</span>
                  <span className="db-rb neg">{Rs(Math.abs(a.balance||0))}</span>
                </div>
              ))}
            </>}
          </div>
        </div>

        {/* ── OPERATIONS ── */}
        <p className="db-sec">Operations</p>
        <div className="db-g2">

          <div className="db-card">
            <div className="db-accent" style={{background:"#1f2937"}}/>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <div>
                <p className="db-lbl" style={{margin:0}}>Pending Cheques</p>
                {loading ? <div className="db-sk" style={{width:"50%",height:18,marginTop:5}}/> : <p className="db-val dk" style={{marginTop:4}}>{Rs(cqTotal)}</p>}
              </div>
              {!loading && <div style={{textAlign:"right"}}>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:20,fontWeight:700,color:cheques.length>0?"#b91c1c":"#15803d"}}>{cheques.length}</span>
                <p style={{fontSize:9.5,color:"#9ca3af",margin:0}}>issued</p>
              </div>}
            </div>
            {!loading && cheques.length===0 && <p style={{fontSize:12,color:"#9ca3af"}}>✓ No pending cheques</p>}
            {!loading && cheques.length>0 && <>
              {(showCheq?cheques:cheques.slice(0,4)).map(c=>(
                <div key={c._id} className="db-cq">
                  <span className="db-cq-no">#{c.chequeNo}</span>
                  <span className="db-cq-name">{c.payeeAccountName}</span>
                  <span className="db-cq-amt">{Rs(c.amount)}</span>
                  <span className="db-cq-badge">ISSUED</span>
                </div>
              ))}
              {cheques.length>4 && <button className="db-more" onClick={()=>setShowCheq(v=>!v)}>{showCheq?"▲ Less":`▼ +${cheques.length-4} more`}</button>}
            </>}
          </div>

          <div className="db-card">
            <div className="db-accent" style={{background:"#15803d"}}/>
            <p className="db-lbl">Weight Bridge Earnings</p>
            {loading ? <Sk/> : <p className="db-val pos">{Rs(wbEarning)}</p>}
            <p className="db-sub">{wbDone.length} completed invoice{wbDone.length!==1?"s":""} · {wbEntries.length-wbDone.length} pending</p>
            {!loading && wbByType.length>0 && (()=>{
              const mx = Math.max(...wbByType.map(([,v])=>v.total),1);
              return (
                <div style={{marginTop:12}}>
                  {wbByType.slice(0,5).map(([type,data])=>(
                    <div key={type} className="db-bar-row">
                      <span style={{fontSize:10,color:"#9ca3af",minWidth:80,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{type}</span>
                      <div className="db-bar-track"><div className="db-bar-fill" style={{width:`${Math.round(data.total/mx*100)}%`,background:"#15803d"}}/></div>
                      <span style={{fontSize:10,color:"#9ca3af",minWidth:80,fontFamily:"'DM Mono',monospace"}}>
                        {Rs(data.total)} <span style={{color:"#d1d5db"}}>·</span> {data.count}×
                      </span>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>

        <div style={{height:32}}/>
      </div>
    </SidebarLayout>
  );
}