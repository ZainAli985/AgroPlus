import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout";
import ChequeTopNav from "./ChequeTopNav";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";
import Notification from "../Notification";

const F = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');`;
const CSS = `
*,*::before,*::after{box-sizing:border-box}
.cb{font-family:'Plus Jakarta Sans',sans-serif;color:#111827;max-width:660px;margin:0 auto}
.cb-card{background:#fff;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.06)}
.cb-head{padding:22px 28px;background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 60%,#1d4ed8 100%);display:flex;align-items:center;gap:14px}
.cb-head-icon{width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.cb-head-title{font-size:16px;font-weight:800;color:#fff;letter-spacing:-.2px}
.cb-head-sub{font-size:12px;color:rgba(255,255,255,.55);margin-top:2px}
.cb-body{padding:28px;display:flex;flex-direction:column;gap:20px}
.cb-section-label{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#94a3b8;padding-bottom:8px;border-bottom:1px solid #f1f5f9;margin-bottom:4px}
.cb-label{display:block;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#6b7280;margin-bottom:6px}
.cb-label em{color:#ef4444;font-style:normal;margin-left:2px}
.cb-input,.cb-select{width:100%;padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:11px;font-size:14px;font-family:'Plus Jakarta Sans',sans-serif;color:#111827;background:#fff;outline:none;transition:.15s;appearance:none}
.cb-input::placeholder{color:#d1d5db}
.cb-input:focus,.cb-select:focus{border-color:#1d4ed8;box-shadow:0 0 0 3px rgba(29,78,216,.1)}
.cb-input.mono{font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.02em}
.cb-grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.cb-leaf-row{display:grid;grid-template-columns:1fr 28px 1fr;gap:8px;align-items:end}
.cb-leaf-sep{display:flex;align-items:center;justify-content:center;padding-bottom:12px;color:#94a3b8;font-weight:700}
.cb-preview{background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:1px solid #86efac;border-radius:11px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;margin-top:10px}
.cb-preview-lbl{font-size:12px;color:#16a34a;font-weight:700;display:flex;align-items:center;gap:6px}
.cb-preview-val{font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:800;color:#15803d}
.cb-footer{padding:18px 28px;border-top:1px solid #f1f5f9;background:#fafafa;display:flex;justify-content:flex-end;gap:10px}
.cb-btn{padding:11px 24px;border-radius:11px;border:none;cursor:pointer;font-size:13.5px;font-weight:700;font-family:'Plus Jakarta Sans',sans-serif;transition:.15s;display:inline-flex;align-items:center;gap:8px}
.cb-btn-primary{background:linear-gradient(135deg,#1e3a5f,#1d4ed8);color:#fff;box-shadow:0 4px 14px rgba(29,78,216,.3)}
.cb-btn-primary:hover{opacity:.93;transform:translateY(-1px);box-shadow:0 6px 18px rgba(29,78,216,.4)}
.cb-btn-primary:disabled{background:#cbd5e1;color:#94a3b8;cursor:not-allowed;transform:none;box-shadow:none}
.cb-btn-ghost{background:#fff;border:1.5px solid #e5e7eb;color:#6b7280}
.cb-btn-ghost:hover{border-color:#9ca3af;color:#374151}
.cb-dropdown{position:relative}
.cb-dropdown-btn{width:100%;text-align:left;padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:11px;font-size:14px;font-family:'Plus Jakarta Sans',sans-serif;color:#111827;background:#fff;cursor:pointer;transition:.15s;display:flex;align-items:center;justify-content:space-between;gap:8px}
.cb-dropdown-btn:hover,.cb-dropdown-btn.open{border-color:#1d4ed8;box-shadow:0 0 0 3px rgba(29,78,216,.1)}
.cb-dropdown-menu{position:absolute;left:0;top:calc(100% + 4px);width:100%;z-index:200;background:#fff;border:1.5px solid #e5e7eb;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.12);overflow:hidden;animation:cbDrop .12s ease}
@keyframes cbDrop{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
.cb-search-box{padding:10px;border-bottom:1px solid #f3f4f6;background:#f8fafc}
.cb-search-inp{width:100%;padding:8px 12px;border:1.5px solid #e5e7eb;border-radius:8px;font-size:13px;font-family:'Plus Jakarta Sans',sans-serif;color:#111827;outline:none;transition:.12s}
.cb-search-inp:focus{border-color:#1d4ed8}
.cb-option-list{max-height:210px;overflow-y:auto}
.cb-option{padding:10px 14px;font-size:13.5px;cursor:pointer;transition:background .1s;display:flex;align-items:center;gap:10px;color:#1e293b}
.cb-option:hover{background:#f0f9ff}
.cb-option.selected{background:#eff6ff;font-weight:700;color:#1d4ed8}
.cb-option-empty{padding:14px;font-size:13px;color:#94a3b8;text-align:center}
.cb-bank-badge{width:30px;height:30px;border-radius:7px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;letter-spacing:.05em}
@keyframes cb-spin{to{transform:rotate(360deg)}}
.cb-spin{animation:cb-spin .7s linear infinite;display:inline-block}
@media(max-width:560px){.cb-grid2,.cb-leaf-row{grid-template-columns:1fr}.cb-leaf-sep{display:none}}
`;

/* Bank metadata for visual identity */
const BANK_META = {
  hbl:  { abbr:"HBL",  color:"#006633", bg:"#e6f4ed", name:"Habib Bank" },
  ubl:  { abbr:"UBL",  color:"#003087", bg:"#e8eef8", name:"United Bank" },
  mcb:  { abbr:"MCB",  color:"#c8102e", bg:"#fce8ec", name:"MCB Bank" },
  nbp:  { abbr:"NBP",  color:"#007940", bg:"#e6f4ec", name:"National Bank" },
  meezan:{ abbr:"MBL", color:"#1a5276", bg:"#eaf0f8", name:"Meezan Bank" },
  allied:{ abbr:"ABL", color:"#b8860b", bg:"#fdf6e3", name:"Allied Bank" },
  bop:  { abbr:"BOP",  color:"#1a237e", bg:"#e8eaf6", name:"Bank of Punjab" },
  soneri:{ abbr:"SNR", color:"#8b0000", bg:"#fce8e8", name:"Soneri Bank" },
  askari:{ abbr:"ASK", color:"#004225", bg:"#e6f0ea", name:"Askari Bank" },
  faysal:{ abbr:"FAY", color:"#7b3f00", bg:"#f5ece4", name:"Faysal Bank" },
  js:   { abbr:"JS",   color:"#d4380d", bg:"#fff2ed", name:"JS Bank" },
  silk: { abbr:"SBL",  color:"#8e44ad", bg:"#f5eafb", name:"Silk Bank" },
  summit:{ abbr:"SML", color:"#145a32", bg:"#e9f7ef", name:"Summit Bank" },
  default:{ abbr:"BNK", color:"#1e3a5f", bg:"#e8eef8", name:"Bank" },
};

function getBankMeta(name) {
  if (!name) return BANK_META.default;
  const n = name.toLowerCase();
  for (const [key, meta] of Object.entries(BANK_META)) {
    if (key !== "default" && n.includes(key)) return meta;
  }
  // Try abbr match
  const words = name.split(/\s+/);
  const initials = words.map(w=>w[0]).join("").toLowerCase();
  for (const [key, meta] of Object.entries(BANK_META)) {
    if (key !== "default" && (initials.includes(key) || key.includes(initials))) return meta;
  }
  return { ...BANK_META.default, abbr: name.slice(0,3).toUpperCase() };
}

function BankBadge({ name, logoIndex, size=30 }) {
  const m = getBankMeta(name);
  const [imgOk, setImgOk] = React.useState(true);
  const imgSrc = logoIndex ? `/${logoIndex}.png` : null;
  if (imgSrc && imgOk) {
    return (
      <img src={imgSrc} alt={m.abbr}
        style={{ width:size, height:size, objectFit:"contain", borderRadius:Math.round(size*0.23),
          border:"1px solid #e2e8f0", background:"#fff", padding:2, flexShrink:0 }}
        onError={() => setImgOk(false)}/>
    );
  }
  return (
    <div style={{ width:size, height:size, borderRadius:Math.round(size*0.23), flexShrink:0,
      background:m.bg, border:`1.5px solid ${m.color}22`,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:size*0.28, fontWeight:800, color:m.color, letterSpacing:".03em",
      fontFamily:"'JetBrains Mono',monospace",
    }}>{m.abbr.slice(0,3)}</div>
  );
}

function SearchDropdown({ options, value, onChange, placeholder, renderOption, renderSelected }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef(null);
  const inp = useRef(null);

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => { if (open) setTimeout(()=>inp.current?.focus(),0); }, [open]);

  const filtered = options.filter(o =>
    JSON.stringify(o).toLowerCase().includes(q.toLowerCase())
  );
  const selected = options.find(o => o._id === value || o.value === value);

  return (
    <div className="cb-dropdown" ref={ref}>
      <button type="button" className={`cb-dropdown-btn${open?" open":""}`} onClick={()=>setOpen(o=>!o)}>
        <span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textAlign:"left"}}>
          {selected ? (renderSelected ? renderSelected(selected) : selected.label || selected.accountName)
            : <span style={{color:"#9ca3af",fontStyle:"italic"}}>{placeholder}</span>}
        </span>
        <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2.5}
          style={{flexShrink:0,transition:".15s",transform:open?"rotate(180deg)":"none"}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <div className="cb-dropdown-menu">
          <div className="cb-search-box">
            <input ref={inp} className="cb-search-inp" value={q} onChange={e=>setQ(e.target.value)}
              placeholder="Type to search…"/>
          </div>
          <div className="cb-option-list">
            {filtered.length === 0
              ? <div className="cb-option-empty">No results found</div>
              : filtered.map(o => (
                <div key={o._id||o.value}
                  className={`cb-option${(o._id||o.value)===value?" selected":""}`}
                  onClick={()=>{ onChange(o); setOpen(false); setQ(""); }}>
                  {renderOption ? renderOption(o) : (o.label||o.accountName)}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CreateChequeBook() {
  const navigate = useNavigate();
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message:"", type:"info" });
  const [form, setForm] = useState({
    bankAccountId:"", bankAccountName:"",
    branchName:"", branchCode:"",
    accountNumber:"", iban:"", accountTitle:"",
    startLeaf:"00000001", endLeaf:"00000100",
  });

  useEffect(()=>{
    authFetch(`${API_BASE_URL}/accounts?category=Bank`).then(r=>r.json()).then(d=>{
      const arr = Array.isArray(d) ? d : (d.accounts||[]);
      // Show only Bank accounts; fallback to any Current Asset non-protected if none tagged yet
      const banks = arr.filter(a => !a.isProtected && !a.isProductAccount && a.category === "Bank");
      setBankAccounts(
        banks.length > 0 ? banks : arr.filter(a => !a.isProtected && !a.isProductAccount &&
          a.accountType === "Assets" && a.subAccountType === "Current Assets")
      );
    });
  },[]);

  const digits   = Math.max(form.startLeaf.length, form.endLeaf.length, 8);
  const startNum = parseInt(form.startLeaf)||0;
  const endNum   = parseInt(form.endLeaf)||0;
  const leaves   = endNum > startNum ? endNum-startNum+1 : 0;
  const selectedBank = bankAccounts.find(a=>a._id===form.bankAccountId);

  const pad = (val) => {
    const n = parseInt(val);
    if(!isNaN(n)) return String(n).padStart(digits,"0");
    return val;
  };

  const submit = async e => {
    e.preventDefault();
    if (!form.bankAccountId) return setNotification({ message:"Please select a bank account.", type:"error" });
    if (leaves<=0) return setNotification({ message:"End leaf must be greater than start leaf.", type:"error" });
    if (leaves>500) return setNotification({ message:"Maximum 500 leaves per cheque book.", type:"error" });
    setLoading(true);
    const res  = await authFetch(`${API_BASE_URL}/cheque-books`,{
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setNotification({ message:`Cheque book ${data.chequeBook.chequeBookId} created!`, type:"success" });
      setTimeout(()=>navigate("/cheque-book/view"),1400);
    } else {
      setNotification({ message:data.message||"Failed to create.", type:"error" });
    }
  };

  return (
    <SidebarLayout>
      <style>{F}{CSS}</style>
      <Notification message={notification.message} type={notification.type}
        onClose={()=>setNotification({message:"",type:"info"})}/>
      <ChequeTopNav active="create-book"/>
      <div className="cb">
        <form onSubmit={submit}>
          <div className="cb-card">
            <div className="cb-head">
              <div className="cb-head-icon">
                <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
              </div>
              <div>
                <div className="cb-head-title">Create New Cheque Book</div>
                <div className="cb-head-sub">Link a bank account and define the leaf range</div>
              </div>
            </div>

            <div className="cb-body">
              {/* Bank Account */}
              <div>
                <div className="cb-section-label">Bank Account</div>
                <div>
                  <label className="cb-label">Select Bank Account <em>*</em></label>
                  <SearchDropdown
                    options={bankAccounts}
                    value={form.bankAccountId}
                    placeholder="Search and select bank account…"
                    onChange={a=>setForm(p=>({...p,bankAccountId:a._id,bankAccountName:a.accountName,bankLogoIndex:a.bankLogoIndex||null}))}
                    renderOption={a=>(
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <BankBadge name={a.accountName} logoIndex={a.bankLogoIndex} size={28}/>
                        <div>
                          <div style={{fontWeight:600,fontSize:13.5}}>{a.accountName}</div>
                          <div style={{fontSize:11,color:"#9ca3af"}}>{a.accountType} · {a.subAccountType}</div>
                        </div>
                      </div>
                    )}
                    renderSelected={a=>(
                      <div style={{display:"flex",alignItems:"center",gap:9}}>
                        <BankBadge name={a.accountName} logoIndex={a.bankLogoIndex} size={24}/>
                        <span style={{fontWeight:600}}>{a.accountName}</span>
                      </div>
                    )}
                  />
                  {selectedBank && (
                    <div style={{marginTop:8,padding:"8px 12px",background:"#eff6ff",borderRadius:8,
                      border:"1px solid #bfdbfe",fontSize:12.5,color:"#1d4ed8",fontWeight:500}}>
                      Current Balance: <strong>PKR {Number(selectedBank.balance||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Branch */}
              <div>
                <div className="cb-section-label">Branch Details</div>
                <div className="cb-grid2">
                  <div>
                    <label className="cb-label">Branch Name <em>*</em></label>
                    <input className="cb-input" placeholder="e.g. Main Branch Lahore"
                      value={form.branchName} onChange={e=>setForm(p=>({...p,branchName:e.target.value}))} required/>
                  </div>
                  <div>
                    <label className="cb-label">Branch Code <em>*</em></label>
                    <input className="cb-input mono" placeholder="e.g. 0296"
                      value={form.branchCode} onChange={e=>setForm(p=>({...p,branchCode:e.target.value}))} required/>
                  </div>
                </div>
              </div>

              {/* Account details */}
              <div>
                <div className="cb-section-label">Account Information</div>
                <div style={{display:"flex",flexDirection:"column",gap:14}}>
                  <div>
                    <label className="cb-label">Account Title <em>*</em></label>
                    <input className="cb-input" placeholder="e.g. AL REHMAN RICE MILLS (PVT) LTD"
                      value={form.accountTitle} onChange={e=>setForm(p=>({...p,accountTitle:e.target.value}))} required/>
                  </div>
                  <div className="cb-grid2">
                    <div>
                      <label className="cb-label">Account Number <em>*</em></label>
                      <input className="cb-input mono" placeholder="0000000000000"
                        value={form.accountNumber} onChange={e=>setForm(p=>({...p,accountNumber:e.target.value}))} required/>
                    </div>
                    <div>
                      <label className="cb-label">IBAN <em>*</em></label>
                      <input className="cb-input mono" placeholder="PK36HABB0000296701869503"
                        value={form.iban} onChange={e=>setForm(p=>({...p,iban:e.target.value.toUpperCase()}))} required/>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leaf range */}
              <div>
                <div className="cb-section-label">Cheque Leaf Range</div>
                <div className="cb-leaf-row">
                  <div>
                    <label className="cb-label">Start Leaf <em>*</em></label>
                    <input className="cb-input mono" value={form.startLeaf}
                      onChange={e=>setForm(p=>({...p,startLeaf:e.target.value}))}
                      onBlur={()=>setForm(p=>({...p,startLeaf:pad(p.startLeaf)}))} required/>
                  </div>
                  <div className="cb-leaf-sep">→</div>
                  <div>
                    <label className="cb-label">End Leaf <em>*</em></label>
                    <input className="cb-input mono" value={form.endLeaf}
                      onChange={e=>setForm(p=>({...p,endLeaf:e.target.value}))}
                      onBlur={()=>setForm(p=>({...p,endLeaf:pad(p.endLeaf)}))} required/>
                  </div>
                </div>
                {leaves>0 && (
                  <div className="cb-preview">
                    <span className="cb-preview-lbl">
                      <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                      Total Cheque Leaves
                    </span>
                    <span className="cb-preview-val">{leaves} leaves</span>
                  </div>
                )}
              </div>
            </div>

            <div className="cb-footer">
              <button type="button" className="cb-btn cb-btn-ghost" onClick={()=>navigate("/cheque-book/view")}>
                Cancel
              </button>
              <button type="submit" className="cb-btn cb-btn-primary" disabled={loading||leaves<=0||!form.bankAccountId}>
                {loading ? <><span className="cb-spin">⟳</span> Creating…</> : <>
                  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  Create Cheque Book
                </>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </SidebarLayout>
  );
}