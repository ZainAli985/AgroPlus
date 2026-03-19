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
.vb{font-family:'Plus Jakarta Sans',sans-serif;color:#111827}
.vb-card{background:#fff;border:1px solid #e5e7eb;border-radius:18px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.05)}
.vb-card-head{padding:18px 22px;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;background:#fafafa}
.vb-card-title{font-size:15px;font-weight:800;color:#111827}
.vb-card-sub{font-size:12px;color:#9ca3af;margin-top:1px}
.vb-table{width:100%;border-collapse:collapse;font-size:13.5px}
.vb-th{padding:10px 16px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;border-bottom:1px solid #f1f5f9;background:#f8fafc;white-space:nowrap}
.vb-tr{border-bottom:1px solid #f8fafc;transition:background .1s}
.vb-tr:last-child{border-bottom:none}
.vb-tr:hover{background:#fafafa}
.vb-td{padding:13px 16px;vertical-align:middle}
.vb-empty{padding:52px 24px;text-align:center}
.vb-badge{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:11.5px;font-weight:700;font-family:'JetBrains Mono',monospace;border:1px solid}
.vb-search{display:flex;align-items:center;gap:8px;background:#fff;border:1.5px solid #e5e7eb;border-radius:10px;padding:0 12px;transition:.15s}
.vb-search:focus-within{border-color:#1d4ed8;box-shadow:0 0 0 3px rgba(29,78,216,.08)}
.vb-search input{border:none;outline:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:13.5px;color:#111827;padding:9px 0;background:transparent;width:200px}
.vb-search input::placeholder{color:#d1d5db}
.vb-btn{padding:9px 18px;border-radius:10px;border:none;cursor:pointer;font-size:13px;font-weight:700;font-family:'Plus Jakarta Sans',sans-serif;display:inline-flex;align-items:center;gap:7px;transition:.15s}
.vb-btn-primary{background:linear-gradient(135deg,#1e3a5f,#1d4ed8);color:#fff;box-shadow:0 3px 10px rgba(29,78,216,.25)}
.vb-btn-primary:hover{opacity:.92;transform:translateY(-1px)}
.vb-btn-outline{background:#fff;border:1.5px solid #e5e7eb;color:#6b7280}
.vb-btn-outline:hover{border-color:#94a3b8;color:#374151}
.vb-btn-sm{padding:6px 12px;font-size:12px}
.vb-btn-icon{width:32px;height:32px;padding:0;display:flex;align-items:center;justify-content:center;border-radius:8px}
.vb-tabs{display:flex;gap:3;background:#f1f5f9;border-radius:12px;padding:4px;margin-bottom:20px}
.vb-tab{flex:1;min-width:120px;padding:"9px 14px";border-radius:9px;border:none;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:500;transition:.15s;display:flex;align-items:center;justify-content:center;gap:7px;white-space:nowrap}
.vb-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);backdrop-filter:blur(4px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px}
.vb-modal{background:#fff;border-radius:20px;width:100%;max-width:520px;box-shadow:0 20px 60px rgba(0,0,0,.2);overflow:hidden;animation:vbFade .18s ease}
@keyframes vbFade{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
.vb-modal-head{padding:20px 24px;background:linear-gradient(135deg,#0f172a,#1e3a5f);display:flex;align-items:center;justify-content:space-between}
.vb-modal-body{padding:24px;display:flex;flex-direction:column;gap:16px}
.vb-modal-footer{padding:16px 24px;border-top:1px solid #f1f5f9;display:flex;justify-content:flex-end;gap:10px;background:#fafafa}
.vb-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#6b7280;display:block;margin-bottom:6px}
.vb-input{width:100%;padding:10px 13px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:'Plus Jakarta Sans',sans-serif;color:#111827;background:#fff;outline:none;transition:.15s}
.vb-input:focus{border-color:#1d4ed8;box-shadow:0 0 0 3px rgba(29,78,216,.1)}
.vb-input.mono{font-family:'JetBrains Mono',monospace;font-size:13px}
.vb-grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@keyframes vb-spin{to{transform:rotate(360deg)}}
.vb-spin{animation:vb-spin .7s linear infinite;display:inline-block}
@media(max-width:600px){.vb-grid2{grid-template-columns:1fr}}
`;

const fmt = n => Number(n||0).toLocaleString("en-PK",{minimumFractionDigits:2,maximumFractionDigits:2});
const fmtDate = d => d ? new Date(d).toLocaleDateString("en-PK",{day:"2-digit",month:"short",year:"numeric"}) : "—";

const BANK_META = {
  hbl:{abbr:"HBL",bg:"#006633"},ubl:{abbr:"UBL",bg:"#003087"},mcb:{abbr:"MCB",bg:"#c8102e"},
  nbp:{abbr:"NBP",bg:"#007940"},meezan:{abbr:"MBL",bg:"#1a3c6e"},allied:{abbr:"ABL",bg:"#b8860b"},
  bop:{abbr:"BOP",bg:"#1a237e"},askari:{abbr:"ASK",bg:"#004225"},faysal:{abbr:"FAY",bg:"#7b3f00"},
  js:{abbr:"JSB",bg:"#d4380d"},soneri:{abbr:"SNR",bg:"#8b0000"},default:{abbr:"BNK",bg:"#1e3a5f"},
};
function getBankMeta(name){
  if(!name)return BANK_META.default;
  const n=name.toLowerCase();
  for(const[k,m]of Object.entries(BANK_META)){if(k!=="default"&&n.includes(k))return m;}
  return{...BANK_META.default,abbr:name.slice(0,3).toUpperCase()};
}

const STATUS_STYLE={
  issued: {bg:"#eff6ff",color:"#1d4ed8",border:"#bfdbfe",label:"Issued"},
  cleared:{bg:"#f0fdf4",color:"#15803d",border:"#bbf7d0",label:"Cleared"},
  bounced:{bg:"#fef2f2",color:"#dc2626",border:"#fecaca",label:"Bounced"},
};

function BankChip({name, logoIndex, size=32}){
  const m=getBankMeta(name);
  const[imgOk,setImgOk]=React.useState(true);
  if(logoIndex && imgOk){
    return(
      <img src={`/${logoIndex}.png`} alt={m.abbr}
        style={{width:size,height:size,objectFit:"contain",borderRadius:Math.round(size*.24),
          border:"1px solid #e5e7eb",background:"#fff",padding:3,flexShrink:0}}
        onError={()=>setImgOk(false)}/>
    );
  }
  return(
    <div style={{width:size,height:size,borderRadius:Math.round(size*.24),flexShrink:0,
      background:m.bg,display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:size*.3,fontWeight:900,color:"#fff",fontFamily:"'JetBrains Mono',monospace",
      letterSpacing:".03em",boxShadow:`0 2px 6px ${m.bg}55`}}>
      {m.abbr.slice(0,3)}
    </div>
  );
}

/* Edit Modal */
function EditChequeBookModal({book,onClose,onSaved}){
  const[form,setForm]=useState({
    branchName:book.branchName||"",branchCode:book.branchCode||"",
    accountNumber:book.accountNumber||"",iban:book.iban||"",
    accountTitle:book.accountTitle||"",isActive:book.isActive!==false,
  });
  const[loading,setLoading]=useState(false);

  const submit=async e=>{
    e.preventDefault();
    setLoading(true);
    const res=await authFetch(`${API_BASE_URL}/cheque-books/${book._id}`,{
      method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(form),
    });
    const data=await res.json();
    setLoading(false);
    if(res.ok)onSaved(data.chequeBook);
  };

  return(
    <div className="vb-modal-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <form className="vb-modal" onSubmit={submit}>
        <div className="vb-modal-head">
          <div>
            <div style={{fontSize:15,fontWeight:800,color:"#fff"}}>Edit Cheque Book</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginTop:2}}>{book.chequeBookId} — {book.bankAccountName}</div>
          </div>
          <button type="button" onClick={onClose} style={{background:"rgba(255,255,255,.1)",border:"none",
            borderRadius:8,width:30,height:30,cursor:"pointer",display:"flex",alignItems:"center",
            justifyContent:"center",color:"rgba(255,255,255,.7)"}}>
            <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="vb-modal-body">
          <div className="vb-grid2">
            <div>
              <label className="vb-label">Branch Name</label>
              <input className="vb-input" value={form.branchName} onChange={e=>setForm(p=>({...p,branchName:e.target.value}))}/>
            </div>
            <div>
              <label className="vb-label">Branch Code</label>
              <input className="vb-input mono" value={form.branchCode} onChange={e=>setForm(p=>({...p,branchCode:e.target.value}))}/>
            </div>
          </div>
          <div>
            <label className="vb-label">Account Title</label>
            <input className="vb-input" value={form.accountTitle} onChange={e=>setForm(p=>({...p,accountTitle:e.target.value}))}/>
          </div>
          <div className="vb-grid2">
            <div>
              <label className="vb-label">Account Number</label>
              <input className="vb-input mono" value={form.accountNumber} onChange={e=>setForm(p=>({...p,accountNumber:e.target.value}))}/>
            </div>
            <div>
              <label className="vb-label">IBAN</label>
              <input className="vb-input mono" value={form.iban} onChange={e=>setForm(p=>({...p,iban:e.target.value.toUpperCase()}))}/>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <input type="checkbox" id="cbActive" checked={form.isActive}
              onChange={e=>setForm(p=>({...p,isActive:e.target.checked}))}
              style={{width:16,height:16,accentColor:"#1d4ed8",cursor:"pointer"}}/>
            <label htmlFor="cbActive" style={{fontSize:13.5,color:"#374151",cursor:"pointer",fontWeight:500}}>
              Active (can issue cheques from this book)
            </label>
          </div>
        </div>
        <div className="vb-modal-footer">
          <button type="button" className="vb-btn vb-btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="vb-btn vb-btn-primary" disabled={loading}>
            {loading?<><span className="vb-spin">⟳</span> Saving…</>:"Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ViewChequeBooks(){
  const navigate=useNavigate();
  const[books,setBooks]=useState([]);
  const[entries,setEntries]=useState([]);
  const[view,setView]=useState("books");
  const[filterBook,setFilterBook]=useState("");
  const[bookSearch,setBookSearch]=useState("");
  const[entrySearch,setEntrySearch]=useState("");
  const[loading,setLoading]=useState(true);
  const[editBook,setEditBook]=useState(null);
  const[notification,setNotification]=useState({message:"",type:"info"});

  const load=async()=>{
    setLoading(true);
    const[br,er]=await Promise.all([
      authFetch(`${API_BASE_URL}/cheque-books`).then(r=>r.json()),
      authFetch(`${API_BASE_URL}/cheque-entries`).then(r=>r.json()),
    ]);
    setBooks(br.chequeBooks||[]);
    setEntries(er.chequeEntries||[]);
    setLoading(false);
  };
  useEffect(()=>{load();},[]);

  const filteredBooks=books.filter(b=>
    (b.bankAccountName+b.chequeBookId+b.branchName+b.accountNumber).toLowerCase().includes(bookSearch.toLowerCase())
  );

  const filteredEntries=entries.filter(e=>{
    const bookMatch=!filterBook||e.chequeBookId===filterBook;
    const searchMatch=!entrySearch||(e.chequeNo+e.payeeAccountName+e.bankAccountName+e.branchName).toLowerCase().includes(entrySearch.toLowerCase());
    return bookMatch&&searchMatch;
  });

  const updateStatus=async(id,status)=>{
    const res=await authFetch(`${API_BASE_URL}/cheque-entries/${id}/status`,{
      method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status}),
    });
    if(res.ok){setNotification({message:"Status updated.",type:"success"});load();}
    else{const d=await res.json();setNotification({message:d.message,type:"error"});}
  };

  const totalIssued=filteredEntries.reduce((s,e)=>s+(e.amount||0),0);

  return(
    <SidebarLayout>
      <style>{F}{CSS}</style>
      <Notification message={notification.message} type={notification.type}
        onClose={()=>setNotification({message:"",type:"info"})}/>
      {editBook&&(
        <EditChequeBookModal book={editBook} onClose={()=>setEditBook(null)}
          onSaved={updated=>{
            setBooks(bs=>bs.map(b=>b._id===updated._id?updated:b));
            setEditBook(null);
            setNotification({message:"Cheque book updated.",type:"success"});
          }}/>
      )}

      <div className="vb">
        <ChequeTopNav active="view"/>

        {/* View tabs */}
        <div className="vb-tabs">
          {[
            {key:"books",label:`📒 Cheque Books (${books.length})`},
            {key:"entries",label:`✍️ Issued Cheques (${entries.length})`},
          ].map(t=>(
            <button key={t.key} onClick={()=>setView(t.key)}
              style={{flex:1,minWidth:120,padding:"9px 14px",borderRadius:9,border:"none",
                cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,
                fontWeight:view===t.key?700:500,background:view===t.key?"#fff":"transparent",
                color:view===t.key?"#1e3a5f":"#64748b",
                boxShadow:view===t.key?"0 2px 8px rgba(0,0,0,.08)":"none",
                transition:".15s",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ══ BOOKS TAB ══ */}
        {view==="books"&&(
          <div className="vb-card">
            <div className="vb-card-head">
              <div>
                <div className="vb-card-title">Cheque Books</div>
                <div className="vb-card-sub">{books.length} registered · {books.filter(b=>b.isActive!==false).length} active</div>
              </div>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                <div className="vb-search">
                  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  <input value={bookSearch} onChange={e=>setBookSearch(e.target.value)}
                    placeholder="Search books…"/>
                </div>
                <button onClick={()=>navigate("/cheque-book/create")} className="vb-btn vb-btn-primary">
                  <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                  </svg>
                  New Cheque Book
                </button>
              </div>
            </div>
            {loading?<div className="vb-empty" style={{color:"#9ca3af"}}>Loading…</div>
              :filteredBooks.length===0?<div className="vb-empty">
                <div style={{fontSize:40,marginBottom:14}}>📒</div>
                <div style={{fontSize:15,fontWeight:700,color:"#374151"}}>{bookSearch?"No books match your search":"No cheque books yet"}</div>
                {!bookSearch&&<button onClick={()=>navigate("/cheque-book/create")} className="vb-btn vb-btn-primary" style={{marginTop:14}}>+ Create First Cheque Book</button>}
              </div>
              :<div style={{overflowX:"auto"}}>
                <table className="vb-table">
                  <thead>
                    <tr>
                      {["Book","Bank Account","Branch","Account No. / IBAN","Leaves","Status","Actions"].map(h=>(
                        <th key={h} className="vb-th">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBooks.map(b=>{
                      const issued=b.lastIssuedLeaf?parseInt(b.lastIssuedLeaf)-parseInt(b.startLeaf)+1:0;
                      const rem=b.totalLeaves-issued;
                      const pct=Math.round((issued/b.totalLeaves)*100);
                      return(
                        <tr key={b._id} className="vb-tr">
                          <td className="vb-td">
                            <div style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:800,
                              fontSize:13,color:"#1e3a5f"}}>{b.chequeBookId}</div>
                            <div style={{fontSize:11,color:"#9ca3af",marginTop:2}}>{b.startLeaf}–{b.endLeaf}</div>
                          </td>
                          <td className="vb-td">
                            <div style={{display:"flex",alignItems:"center",gap:10}}>
                              <BankChip name={b.bankAccountName} logoIndex={b.bankLogoIndex} size={32}/>
                              <div>
                                <div style={{fontWeight:700,fontSize:13.5}}>{b.bankAccountName}</div>
                                <div style={{fontSize:11,color:"#9ca3af",marginTop:1}}>{b.accountTitle}</div>
                              </div>
                            </div>
                          </td>
                          <td className="vb-td">
                            <div style={{fontWeight:600,fontSize:13}}>{b.branchName}</div>
                            <div style={{fontSize:11,fontFamily:"'JetBrains Mono',monospace",color:"#9ca3af"}}>Code: {b.branchCode}</div>
                          </td>
                          <td className="vb-td">
                            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12.5}}>{b.accountNumber}</div>
                            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10.5,color:"#94a3b8",marginTop:1}}>{b.iban}</div>
                          </td>
                          <td className="vb-td" style={{minWidth:130}}>
                            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                              <span style={{fontSize:12,color:"#6b7280"}}>{rem} left</span>
                              <span style={{fontSize:12,color:"#9ca3af"}}>{issued}/{b.totalLeaves}</span>
                            </div>
                            <div style={{height:5,background:"#f1f5f9",borderRadius:4,overflow:"hidden"}}>
                              <div style={{height:"100%",borderRadius:4,
                                width:`${pct}%`,transition:".3s",
                                background:pct>80?"#ef4444":pct>50?"#f59e0b":"#22c55e"}}/>
                            </div>
                          </td>
                          <td className="vb-td">
                            <span className="vb-badge" style={{
                              background:b.isActive===false?"#fff7ed":"#f0fdf4",
                              color:b.isActive===false?"#d97706":"#16a34a",
                              borderColor:b.isActive===false?"#fed7aa":"#86efac",
                            }}>{b.isActive===false?"Inactive":"Active"}</span>
                          </td>
                          <td className="vb-td">
                            <div style={{display:"flex",gap:6}}>
                              <button className="vb-btn vb-btn-outline vb-btn-sm vb-btn-icon" onClick={()=>setEditBook(b)} title="Edit">
                                <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2a2 2 0 01.586-1.414z"/>
                                </svg>
                              </button>
                              <button className="vb-btn vb-btn-primary vb-btn-sm"
                                onClick={()=>navigate("/cheque-book/entry")}
                                style={{padding:"6px 11px",fontSize:11.5}}>
                                Issue
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            }
          </div>
        )}

        {/* ══ ENTRIES TAB ══ */}
        {view==="entries"&&(
          <div className="vb-card">
            <div className="vb-card-head">
              <div>
                <div className="vb-card-title">Issued Cheques</div>
                <div className="vb-card-sub">
                  Total: <strong style={{color:"#1e3a5f",fontFamily:"'JetBrains Mono',monospace"}}>
                    PKR {fmt(totalIssued)}
                  </strong> across {filteredEntries.length} cheques
                </div>
              </div>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                {/* Search */}
                <div className="vb-search">
                  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  <input value={entrySearch} onChange={e=>setEntrySearch(e.target.value)}
                    placeholder="Search cheques…"/>
                </div>
                {/* Book filter */}
                <select value={filterBook} onChange={e=>setFilterBook(e.target.value)}
                  style={{padding:"9px 12px",border:"1.5px solid #e5e7eb",borderRadius:10,
                    fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",color:"#374151",
                    background:"#fff",outline:"none",cursor:"pointer"}}>
                  <option value="">All Books</option>
                  {books.map(b=><option key={b._id} value={b._id}>{b.chequeBookId} — {b.bankAccountName}</option>)}
                </select>
                <button onClick={()=>navigate("/cheque-book/entry")} className="vb-btn vb-btn-primary">
                  <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                  </svg>
                  Issue Cheque
                </button>
              </div>
            </div>
            {loading?<div className="vb-empty" style={{color:"#9ca3af"}}>Loading…</div>
              :filteredEntries.length===0?<div className="vb-empty">
                <div style={{fontSize:40,marginBottom:14}}>✍️</div>
                <div style={{fontSize:15,fontWeight:700,color:"#374151"}}>{entrySearch||filterBook?"No cheques match your filters":"No cheques issued yet"}</div>
              </div>
              :<div style={{overflowX:"auto"}}>
                <table className="vb-table">
                  <thead>
                    <tr>
                      {["Cheque No.","Date","Bank / Branch","Payee","Amount (PKR)","Status","Update Status"].map(h=>(
                        <th key={h} className="vb-th">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEntries.map(e=>{
                      const s=STATUS_STYLE[e.status]||STATUS_STYLE.issued;
                      return(
                        <tr key={e._id} className="vb-tr">
                          <td className="vb-td">
                            <div style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:800,
                              fontSize:14,color:"#1e3a5f"}}>{e.chequeNo}</div>
                          </td>
                          <td className="vb-td" style={{color:"#374151",whiteSpace:"nowrap"}}>{fmtDate(e.date)}</td>
                          <td className="vb-td">
                            <div style={{display:"flex",alignItems:"center",gap:9}}>
                              <BankChip name={e.bankAccountName} logoIndex={e.bankLogoIndex} size={28}/>
                              <div>
                                <div style={{fontWeight:700,fontSize:13}}>{e.bankAccountName}</div>
                                <div style={{fontSize:11,color:"#9ca3af"}}>{e.branchName}</div>
                              </div>
                            </div>
                          </td>
                          <td className="vb-td">
                            <div style={{fontWeight:700,fontSize:13.5}}>{e.payeeAccountName}</div>
                            {e.remarks&&<div style={{fontSize:11.5,color:"#9ca3af",marginTop:1,maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{e.remarks}</div>}
                          </td>
                          <td className="vb-td">
                            <div style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:800,
                              fontSize:14,color:"#1e3a5f"}}>{fmt(e.amount)}</div>
                            <div style={{fontSize:10.5,color:"#94a3b8",maxWidth:170,overflow:"hidden",
                              textOverflow:"ellipsis",whiteSpace:"nowrap",marginTop:1}}>{e.amountInWords}</div>
                          </td>
                          <td className="vb-td">
                            <span className="vb-badge" style={{background:s.bg,color:s.color,borderColor:s.border}}>
                              {s.label}
                            </span>
                          </td>
                          <td className="vb-td">
                            <select value={e.status} onChange={ev=>updateStatus(e._id,ev.target.value)}
                              style={{padding:"6px 10px",border:"1.5px solid #e5e7eb",borderRadius:8,
                                fontSize:12.5,fontFamily:"'Plus Jakarta Sans',sans-serif",
                                color:"#374151",background:"#fff",outline:"none",cursor:"pointer",
                                minWidth:100}}>
                              <option value="issued">Issued</option>
                              <option value="cleared">Cleared</option>
                              <option value="bounced">Bounced</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr style={{borderTop:"2px solid #e5e7eb",background:"#f8fafc"}}>
                      <td colSpan={4} className="vb-td" style={{fontSize:12,fontWeight:700,color:"#6b7280",
                        textTransform:"uppercase",letterSpacing:".07em"}}>
                        Total ({filteredEntries.length})
                      </td>
                      <td className="vb-td">
                        <div style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:900,
                          fontSize:15,color:"#1e3a5f"}}>PKR {fmt(totalIssued)}</div>
                      </td>
                      <td colSpan={2}/>
                    </tr>
                  </tfoot>
                </table>
              </div>
            }
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}