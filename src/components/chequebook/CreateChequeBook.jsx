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
  .ccb-leaf-sep { display: flex; align-items: center; justify-content: center; padding-bottom: 9px; color: #9ca3af; font-weight: 600; font-size: 14px; }

  /* dropdown */
  .ccb-dd-btn {
    width: 100%; text-align: left; padding: 8px 11px;
    border: 1px solid #d1d5db; border-radius: 7px;
    font-size: 13px; font-family: 'DM Sans', sans-serif; color: #111827;
    background: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: space-between; gap: 8px;
    transition: border-color .12s, box-shadow .12s; outline: none;
  }
  .ccb-dd-btn.open { border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12); }
  .ccb-dd-panel {
    position: absolute; left: 0; top: calc(100% + 3px);
    width: 100%; z-index: 300; background: #fff;
    border: 1px solid #d1d5db; border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,.1); overflow: hidden;
  }
  .ccb-dd-item {
    padding: 8px 12px; font-size: 13px; cursor: pointer;
    border-bottom: 1px solid #f9fafb; color: #111827;
    display: flex; align-items: center; gap: 9px;
    transition: background .08s;
  }
  .ccb-dd-item:hover { background: #f3f4f6; }
  .ccb-dd-item.sel { background: #f3f4f6; font-weight: 600; }

  /* preview box */
  .ccb-preview {
    background: #f0fdf4; border: 1px solid #bbf7d0;
    border-radius: 7px; padding: 10px 14px;
    display: flex; align-items: center; justify-content: space-between;
    margin-top: 8px;
  }

  /* submit */
  .ccb-submit {
    padding: 9px 20px; border-radius: 7px; border: none;
    background: #111827; color: #fff; font-size: 13px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    display: inline-flex; align-items: center; gap: 7px;
    transition: background .12s;
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

  @media (max-width: 560px) { .ccb-g2, .ccb-leaf-row { grid-template-columns: 1fr; } .ccb-leaf-sep { display: none; } }
`;

const BANK_LIST = [
  {id:1, name:"National Bank of Pakistan",                    abbr:"NBP",   color:"#007940", bg:"#e6f4ec"},
  {id:2, name:"The Bank of Punjab",                           abbr:"BOP",   color:"#1a237e", bg:"#e8eaf6"},
  {id:3, name:"The Bank of Khyber",                           abbr:"BOK",   color:"#2e4057", bg:"#eaecf0"},
  {id:4, name:"Sindh Bank Limited",                           abbr:"SBL",   color:"#374151", bg:"#f3f4f6"},
  {id:5, name:"First Women Bank Limited",                     abbr:"FWBL",  color:"#7c3aed", bg:"#f5f3ff"},
  {id:6, name:"Habib Bank Limited",                           abbr:"HBL",   color:"#006633", bg:"#e6f4ed"},
  {id:7, name:"United Bank Limited",                          abbr:"UBL",   color:"#003087", bg:"#e8eef8"},
  {id:8, name:"MCB Bank Limited",                             abbr:"MCB",   color:"#c8102e", bg:"#fce8ec"},
  {id:9, name:"Allied Bank Limited",                          abbr:"ABL",   color:"#b8860b", bg:"#fdf6e3"},
  {id:10,name:"Bank Alfalah Limited",                         abbr:"BAFL",  color:"#c8102e", bg:"#fce8ec"},
  {id:11,name:"Bank Al Habib Limited",                        abbr:"BAHL",  color:"#00703c", bg:"#e6f4ed"},
  {id:12,name:"Askari Bank Limited",                          abbr:"AKBL",  color:"#004225", bg:"#e6f0ea"},
  {id:13,name:"Habib Metropolitan Bank Limited",              abbr:"HMB",   color:"#1a3c6e", bg:"#eaf0f8"},
  {id:14,name:"Soneri Bank Limited",                          abbr:"SNBL",  color:"#8b0000", bg:"#fce8e8"},
  {id:15,name:"JS Bank Limited",                              abbr:"JSBL",  color:"#d4380d", bg:"#fff2ed"},
  {id:16,name:"Samba Bank Limited",                           abbr:"SAMB",  color:"#d4001c", bg:"#fce8e8"},
  {id:17,name:"Silkbank Limited",                             abbr:"SILK",  color:"#7c3aed", bg:"#f5f3ff"},
  {id:18,name:"Summit Bank Limited",                          abbr:"SMBL",  color:"#374151", bg:"#f3f4f6"},
  {id:19,name:"Meezan Bank Limited",                          abbr:"MEBL",  color:"#1a5276", bg:"#eaf0f8"},
  {id:20,name:"Faysal Bank Limited",                          abbr:"FABL",  color:"#7b3f00", bg:"#f5ece4"},
  {id:21,name:"BankIslami Pakistan Limited",                  abbr:"BIPL",  color:"#065f46", bg:"#f0fdf4"},
  {id:22,name:"Dubai Islamic Bank Pakistan Limited",          abbr:"DIBPL", color:"#c8102e", bg:"#fce8ec"},
  {id:23,name:"Al Baraka Bank (Pakistan) Limited",            abbr:"ABPL",  color:"#2d6a4f", bg:"#e6f4ed"},
  {id:24,name:"MCB Islamic Bank Limited",                     abbr:"MIBL",  color:"#c8102e", bg:"#fce8ec"},
  {id:25,name:"Standard Chartered Bank (Pakistan) Limited",   abbr:"SCBPL", color:"#0e5c96", bg:"#e8f0f8"},
  {id:26,name:"Bank Makramah Limited",                        abbr:"BML",   color:"#374151", bg:"#f3f4f6"},
];

// Fuzzy-match bank from account name — checks abbr and name fragments
// Stop-words that must NOT trigger a bank match on their own
const _BANK_STOPWORDS = new Set(["bank","limited","pakistan","the","of","al","islamic","metropolitan"]);

function getBankMeta(accountName) {
  if (!accountName) return { abbr:"BNK", color:"#374151", bg:"#f3f4f6" };
  const n = accountName.toLowerCase().trim();

  for (const b of BANK_LIST) {
    const abbrLC = b.abbr.toLowerCase();
    // 1. Abbreviation exact-word match: "hbl" in "HBL Account" but NOT "hbl" in "Rehabilitated"
    if (new RegExp(`(^|[^a-z])${abbrLC}($|[^a-z])`).test(n)) {
      return { abbr:b.abbr, color:b.color, bg:b.bg };
    }
    // 2. Significant brand-word match: words > 5 chars that are NOT generic stop-words
    const brandWords = b.name.toLowerCase().split(/\s+/).filter(
      w => w.length > 5 && !_BANK_STOPWORDS.has(w)
    );
    if (brandWords.length > 0 && brandWords.some(w => n.includes(w))) {
      return { abbr:b.abbr, color:b.color, bg:b.bg };
    }
  }
  // Derive initials from capitalised words (skip stop-words)
  const initials = accountName.split(/\s+/)
    .filter(w => w.length > 1 && !_BANK_STOPWORDS.has(w.toLowerCase()))
    .map(w => w[0].toUpperCase())
    .join("").slice(0, 5);
  return { abbr: initials || "BNK", color:"#374151", bg:"#f3f4f6" };
}

function BankBadge({ name, logoIndex, size=28 }) {
  const m = getBankMeta(name);
  const [imgOk, setImgOk] = React.useState(true);
  if (logoIndex && imgOk) {
    return <img src={`/${logoIndex}.png`} alt={m.abbr}
      style={{ width:size, height:size, objectFit:"contain", borderRadius:Math.round(size*.25),
        border:"1px solid #e5e7eb", background:"#fff", padding:2, flexShrink:0 }}
      onError={()=>setImgOk(false)}/>;
  }
  return <div style={{ width:size, height:size, borderRadius:Math.round(size*.25), flexShrink:0,
    background:m.bg, border:`1px solid ${m.color}33`,
    display:"flex", alignItems:"center", justifyContent:"center",
    fontSize:size*.27, fontWeight:700, color:m.color,
    fontFamily:"'DM Mono',monospace" }}>{m.abbr.slice(0,3)}</div>;
}

function SearchDropdown({ options, value, onChange, placeholder, renderOption, renderSelected }) {
  const [open,   setOpen]   = useState(false);
  const [q,      setQ]      = useState("");
  const [coords, setCoords] = useState({ top:0, left:0, width:0 });
  const btnRef = useRef(null);
  const inp    = useRef(null);

  // Close on outside click
  useEffect(() => {
    const h = e => {
      if (!open) return;
      const panel = document.getElementById("ccb-dd-portal");
      if (btnRef.current && !btnRef.current.contains(e.target) && (!panel || !panel.contains(e.target)))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  // Focus search on open
  useEffect(() => { if (open) setTimeout(() => inp.current?.focus(), 0); }, [open]);

  // Recalculate position on open + scroll/resize
  useEffect(() => {
    if (!open) return;
    const calc = () => {
      const r = btnRef.current?.getBoundingClientRect();
      if (r) setCoords({ top: r.bottom + 4, left: r.left, width: r.width });
    };
    calc();
    window.addEventListener("scroll", calc, true);
    window.addEventListener("resize", calc);
    return () => { window.removeEventListener("scroll", calc, true); window.removeEventListener("resize", calc); };
  }, [open]);

  const filtered = options.filter(o => JSON.stringify(o).toLowerCase().includes(q.toLowerCase()));
  const selected = options.find(o => o._id === value || o.value === value);

  return (
    <>
      <button ref={btnRef} type="button"
        className={`ccb-dd-btn${open ? " open" : ""}`}
        onClick={() => setOpen(o => !o)}>
        <span style={{ flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", textAlign:"left", color:selected?"#111827":"#9ca3af" }}>
          {selected
            ? (renderSelected ? renderSelected(selected) : selected.label || selected.accountName)
            : <span style={{ fontStyle:"italic" }}>{placeholder}</span>}
        </span>
        <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2.5}
          style={{ flexShrink:0, transition:".15s", transform:open?"rotate(180deg)":"none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {open && (
        <div id="ccb-dd-portal" style={{
          position: "fixed",
          top:   coords.top,
          left:  coords.left,
          width: Math.max(coords.width, 280),
          zIndex: 9999,
          background: "#fff",
          border: "1px solid #d1d5db",
          borderRadius: 8,
          boxShadow: "0 4px 16px rgba(0,0,0,.12)",
          overflow: "hidden",
        }}>
          <div style={{ padding:6, borderBottom:"1px solid #f3f4f6", background:"#f9fafb" }}>
            <input ref={inp} value={q} onChange={e => setQ(e.target.value)} placeholder="Search…"
              style={{ width:"100%", padding:"6px 9px", border:"1px solid #e5e7eb",
                borderRadius:5, fontSize:12.5, outline:"none", fontFamily:"'DM Sans',sans-serif" }}/>
          </div>
          <ul style={{ maxHeight:210, overflowY:"auto", margin:0, padding:0, listStyle:"none" }}>
            {filtered.length === 0
              ? <li style={{ padding:"9px 12px", fontSize:12.5, color:"#9ca3af", textAlign:"center" }}>No results</li>
              : filtered.map(o => (
                <li key={o._id || o.value}
                  className={`ccb-dd-item${(o._id||o.value)===value?" sel":""}`}
                  onClick={() => { onChange(o); setOpen(false); setQ(""); }}>
                  {renderOption ? renderOption(o) : (o.label || o.accountName)}
                </li>
              ))}
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
      <span style={{ fontSize:10.5, fontWeight:700, color:"#374151", textTransform:"uppercase", letterSpacing:".08em" }}>{title}</span>
    </div>
  );
}

export default function CreateChequeBook() {
  const navigate = useNavigate();
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [notification, setNotification] = useState({ message:"", type:"info" });
  const [form, setForm] = useState({
    bankAccountId:"", bankAccountName:"",
    branchName:"", branchCode:"",
    accountNumber:"", iban:"", accountTitle:"",
    startLeaf:"00000001", endLeaf:"00000100",
  });

  useEffect(() => {
    authFetch(`${API_BASE_URL}/accounts?category=Bank`).then(r=>r.json()).then(d=>{
      const arr = Array.isArray(d)?d:(d.accounts||[]);
      const banks = arr.filter(a=>!a.isProtected&&!a.isProductAccount&&a.category==="Bank");
      setBankAccounts(banks.length>0?banks:arr.filter(a=>!a.isProtected&&!a.isProductAccount&&a.accountType==="Assets"&&a.subAccountType==="Current Assets"));
    });
  }, []);

  const digits   = Math.max(form.startLeaf.length, form.endLeaf.length, 8);
  const startNum = parseInt(form.startLeaf)||0;
  const endNum   = parseInt(form.endLeaf)||0;
  const leaves   = endNum>startNum ? endNum-startNum+1 : 0;
  const selBank  = bankAccounts.find(a=>a._id===form.bankAccountId);
  const pad = val => { const n=parseInt(val); return !isNaN(n)?String(n).padStart(digits,"0"):val; };

  const submit = async e => {
    e.preventDefault();
    if (!form.bankAccountId) return setNotification({ message:"Please select a bank account.", type:"error" });
    if (leaves<=0) return setNotification({ message:"End leaf must be greater than start leaf.", type:"error" });
    if (leaves>500) return setNotification({ message:"Maximum 500 leaves per cheque book.", type:"error" });
    setLoading(true);
    const res  = await authFetch(`${API_BASE_URL}/cheque-books`,{
      method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setNotification({ message:`Cheque book ${data.chequeBook.chequeBookId} created!`, type:"success" });
      setTimeout(()=>navigate("/cheque-book/view"), 1400);
    } else {
      setNotification({ message:data.message||"Failed to create.", type:"error" });
    }
  };

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification message={notification.message} type={notification.type}
        onClose={()=>setNotification({message:"",type:"info"})}/>
      <ChequeTopNav active="create-book"/>

      <div className="ccb">
        <div style={{ marginBottom:16 }}>
          <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 3px" }}>Cheque Management</p>
          <h1 style={{ margin:0, fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px" }}>
            Create New Cheque Book
          </h1>
        </div>

        <form onSubmit={submit}>

          {/* Bank Account */}
          <div className="ccb-section">
            <div className="ccb-section-head"><SHead dot="#3b82f6" title="Bank Account"/></div>
            <div className="ccb-section-body">
              <div>
                <label className="ccb-lbl">Select Bank Account <em>*</em></label>
                <SearchDropdown options={bankAccounts} value={form.bankAccountId}
                  placeholder="Search and select bank account…"
                  onChange={a=>setForm(p=>({...p,bankAccountId:a._id,bankAccountName:a.accountName,bankLogoIndex:a.bankLogoIndex||null}))}
                  renderOption={a=>{
                    const bm = getBankMeta(a.accountName);
                    return (
                      <>
                        <BankBadge name={a.accountName} logoIndex={a.bankLogoIndex}/>
                        <div style={{ minWidth:0 }}>
                          <div style={{ fontWeight:700, fontSize:12.5, color:"#111827" }}>
                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:bm.color, fontWeight:700, marginRight:5 }}>[{bm.abbr}]</span>
                            {a.accountName}
                          </div>
                          {a.remarkNote && <div style={{ fontSize:10.5, color:"#9ca3af", marginTop:1 }}>{a.remarkNote}</div>}
                        </div>
                      </>
                    );
                  }}
                  renderSelected={a=>(
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <BankBadge name={a.accountName} logoIndex={a.bankLogoIndex} size={22}/>
                      <span style={{ fontWeight:600 }}>{a.accountName}</span>
                    </div>
                  )}/>
                {selBank && (
                  <div style={{ marginTop:7, padding:"7px 11px", background:"#f0fdf4", borderRadius:6, border:"1px solid #bbf7d0", fontSize:12.5, color:"#15803d", fontWeight:500 }}>
                    Balance: <strong>PKR {Number(selBank.balance||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Branch */}
          <div className="ccb-section">
            <div className="ccb-section-head"><SHead dot="#f59e0b" title="Branch Details"/></div>
            <div className="ccb-section-body">
              <div className="ccb-g2">
                <div>
                  <label className="ccb-lbl">Branch Name <em>*</em></label>
                  <input className="ccb-inp" placeholder="e.g. Main Branch Lahore"
                    value={form.branchName} onChange={e=>setForm(p=>({...p,branchName:e.target.value}))} required/>
                </div>
                <div>
                  <label className="ccb-lbl">Branch Code <em>*</em></label>
                  <input className="ccb-inp mono" placeholder="e.g. 0296"
                    value={form.branchCode} onChange={e=>setForm(p=>({...p,branchCode:e.target.value}))} required/>
                </div>
              </div>
            </div>
          </div>

          {/* Account info */}
          <div className="ccb-section">
            <div className="ccb-section-head"><SHead dot="#10b981" title="Account Information"/></div>
            <div className="ccb-section-body">
              <div>
                <label className="ccb-lbl">Account Title <em>*</em></label>
                <input className="ccb-inp" placeholder="e.g. AL REHMAN RICE MILLS (PVT) LTD"
                  value={form.accountTitle} onChange={e=>setForm(p=>({...p,accountTitle:e.target.value}))} required/>
              </div>
              <div className="ccb-g2">
                <div>
                  <label className="ccb-lbl">Account Number <em>*</em></label>
                  <input className="ccb-inp mono" placeholder="0000000000000"
                    value={form.accountNumber} onChange={e=>setForm(p=>({...p,accountNumber:e.target.value}))} required/>
                </div>
                <div>
                  <label className="ccb-lbl">IBAN <em>*</em></label>
                  <input className="ccb-inp mono" placeholder="PK36HABB0000296701869503"
                    value={form.iban} onChange={e=>setForm(p=>({...p,iban:e.target.value.toUpperCase()}))} required/>
                </div>
              </div>
            </div>
          </div>

          {/* Leaf range */}
          <div className="ccb-section">
            <div className="ccb-section-head"><SHead dot="#8b5cf6" title="Cheque Leaf Range"/></div>
            <div className="ccb-section-body">
              <div className="ccb-leaf-row">
                <div>
                  <label className="ccb-lbl">Start Leaf <em>*</em></label>
                  <input className="ccb-inp mono" value={form.startLeaf}
                    onChange={e=>setForm(p=>({...p,startLeaf:e.target.value}))}
                    onBlur={()=>setForm(p=>({...p,startLeaf:pad(p.startLeaf)}))} required/>
                </div>
                <div className="ccb-leaf-sep">→</div>
                <div>
                  <label className="ccb-lbl">End Leaf <em>*</em></label>
                  <input className="ccb-inp mono" value={form.endLeaf}
                    onChange={e=>setForm(p=>({...p,endLeaf:e.target.value}))}
                    onBlur={()=>setForm(p=>({...p,endLeaf:pad(p.endLeaf)}))} required/>
                </div>
              </div>
              {leaves>0 && (
                <div className="ccb-preview">
                  <span style={{ fontSize:12, color:"#15803d", fontWeight:600, display:"flex", alignItems:"center", gap:6 }}>
                    <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#15803d" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    Total Cheque Leaves
                  </span>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:14, fontWeight:700, color:"#15803d" }}>
                    {leaves} leaves
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div style={{ display:"flex", justifyContent:"flex-end", gap:8, marginTop:4 }}>
            <button type="button" className="ccb-cancel" onClick={()=>navigate("/cheque-book/view")}>
              Cancel
            </button>
            <button type="submit" className="ccb-submit" disabled={loading||leaves<=0||!form.bankAccountId}>
              {loading
                ? <><span className="ccb-spin">⟳</span> Creating…</>
                : <><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Create Cheque Book</>
              }
            </button>
          </div>
        </form>
      </div>
    </SidebarLayout>
  );
}