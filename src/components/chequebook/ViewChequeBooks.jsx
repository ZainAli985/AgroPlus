import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout";
import ChequeTopNav from "./ChequeTopNav";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";
import Notification from "../Notification";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .vcb { font-family: 'DM Sans', sans-serif; color: #111827; }

  /* inputs */
  .vcb-inp, .vcb-sel {
    border: 1px solid #d1d5db; border-radius: 6px;
    padding: 7px 10px; font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s; appearance: none;
  }
  .vcb-inp:focus, .vcb-sel:focus { border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12); }
  .vcb-inp::placeholder { color: #9ca3af; }

  /* search box */
  .vcb-search {
    display: flex; align-items: center; gap: 7px;
    background: #fff; border: 1px solid #d1d5db;
    border-radius: 6px; padding: 0 10px;
    transition: border-color .12s, box-shadow .12s;
  }
  .vcb-search:focus-within { border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12); }
  .vcb-search input { border: none; outline: none; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #111827; padding: 7px 0; background: transparent; width: 180px; }
  .vcb-search input::placeholder { color: #9ca3af; }

  /* tabs */
  .vcb-tabs { display: flex; gap: 4px; background: #f3f4f6; border-radius: 8px; padding: 4px; margin-bottom: 16px; }
  .vcb-tab {
    flex: 1; padding: 8px 12px; border-radius: 6px; border: none;
    cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13px;
    font-weight: 500; transition: all .12s; display: flex;
    align-items: center; justify-content: center; gap: 6px; white-space: nowrap;
    background: transparent; color: #6b7280;
  }
  .vcb-tab.on { background: #fff; color: #111827; font-weight: 600; box-shadow: 0 1px 4px rgba(0,0,0,.08); }

  /* card */
  .vcb-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
  .vcb-card-head {
    padding: 12px 16px; border-bottom: 1px solid #f3f4f6;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 10px; background: #f9fafb;
  }

  /* table */
  .vcb-table { width: 100%; border-collapse: collapse; }
  .vcb-table thead tr { background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
  .vcb-table thead th {
    padding: 9px 14px; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .07em;
    color: #9ca3af; text-align: left; white-space: nowrap;
  }
  .vcb-table tbody tr { border-bottom: 1px solid #f9fafb; transition: background .08s; }
  .vcb-table tbody tr:last-child { border-bottom: none; }
  .vcb-table tbody tr:hover { background: #fafafa; }
  .vcb-table tbody td { padding: 12px 14px; vertical-align: middle; font-size: 13px; color: #374151; }
  .vcb-table tfoot tr { border-top: 2px solid #e5e7eb; background: #f9fafb; }
  .vcb-table tfoot td { padding: 10px 14px; }

  /* badges */
  .vcb-badge { display: inline-flex; align-items: center; padding: 2px 9px; border-radius: 4px; font-size: 11.5px; font-weight: 600; border: 1px solid; white-space: nowrap; }

  /* buttons */
  .vcb-btn-dark {
    padding: 7px 14px; border-radius: 6px; border: none;
    background: #111827; color: #fff; font-size: 12.5px; font-weight: 500;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    display: inline-flex; align-items: center; gap: 6px; transition: background .12s;
  }
  .vcb-btn-dark:hover { background: #1f2937; }
  .vcb-btn-outline {
    padding: 7px 12px; border-radius: 6px;
    border: 1px solid #e5e7eb; background: #fff; color: #374151;
    font-size: 12.5px; font-weight: 500; font-family: 'DM Sans', sans-serif;
    cursor: pointer; display: inline-flex; align-items: center; gap: 5px;
    transition: all .1s;
  }
  .vcb-btn-outline:hover { background: #f9fafb; }
  .vcb-btn-sm { padding: 5px 10px; font-size: 12px; }
  .vcb-btn-icon { width: 30px; height: 30px; padding: 0; display: flex; align-items: center; justify-content: center; border-radius: 6px; }

  /* modal */
  .vcb-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,.4);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000; padding: 16px;
  }
  @keyframes vcb-modal-in { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }
  .vcb-modal {
    background: #fff; border-radius: 10px; width: 100%; max-width: 500px;
    box-shadow: 0 16px 48px rgba(0,0,0,.14); animation: vcb-modal-in .18s ease-out;
    overflow: hidden; border: 1px solid #e5e7eb;
  }
  .vcb-modal-head {
    padding: 14px 18px; border-bottom: 1px solid #e5e7eb; background: #fff;
    display: flex; align-items: center; justify-content: space-between;
  }
  .vcb-modal-body { padding: 18px; display: flex; flex-direction: column; gap: 13px; }
  .vcb-modal-foot {
    padding: 12px 18px; border-top: 1px solid #f3f4f6;
    background: #f9fafb; display: flex; justify-content: flex-end; gap: 8px;
  }
  .vcb-modal-lbl { display: block; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: #6b7280; margin-bottom: 5px; }
  .vcb-modal-inp {
    width: 100%; padding: 8px 11px; border: 1px solid #d1d5db; border-radius: 7px;
    font-size: 13px; font-family: 'DM Sans', sans-serif; color: #111827; background: #fff; outline: none;
    transition: border-color .12s;
  }
  .vcb-modal-inp:focus { border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12); }
  .vcb-modal-inp.mono { font-family: 'DM Mono', monospace; font-size: 12.5px; }
  .vcb-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  @keyframes vcb-spin { to { transform: rotate(360deg); } }
  .vcb-spin { display: inline-block; animation: vcb-spin .7s linear infinite; }

  .vcb-empty { padding: 48px 24px; text-align: center; }
  @media (max-width: 600px) { .vcb-g2 { grid-template-columns: 1fr; } }
`;

const fmt     = n => Number(n||0).toLocaleString("en-PK",{minimumFractionDigits:2,maximumFractionDigits:2});
const fmtDate = d => d?new Date(d).toLocaleDateString("en-PK",{day:"2-digit",month:"short",year:"numeric"}):"—";

const BANK_META = {
  hbl:{abbr:"HBL",bg:"#006633"},ubl:{abbr:"UBL",bg:"#003087"},mcb:{abbr:"MCB",bg:"#c8102e"},
  nbp:{abbr:"NBP",bg:"#007940"},meezan:{abbr:"MBL",bg:"#1a3c6e"},allied:{abbr:"ABL",bg:"#b8860b"},
  bop:{abbr:"BOP",bg:"#1a237e"},askari:{abbr:"ASK",bg:"#004225"},faysal:{abbr:"FAY",bg:"#7b3f00"},
  js:{abbr:"JSB",bg:"#d4380d"},soneri:{abbr:"SNR",bg:"#8b0000"},default:{abbr:"BNK",bg:"#374151"},
};
function getBankMeta(name){
  if(!name)return BANK_META.default;const n=name.toLowerCase();
  for(const[k,m]of Object.entries(BANK_META))if(k!=="default"&&n.includes(k))return m;
  return{...BANK_META.default,abbr:name.slice(0,3).toUpperCase()};
}

const STATUS_STYLE = {
  issued: { bg:"#eff6ff", color:"#1d4ed8", border:"#bfdbfe", label:"Issued" },
  cleared:{ bg:"#f0fdf4", color:"#15803d", border:"#bbf7d0", label:"Cleared" },
  bounced:{ bg:"#fef2f2", color:"#dc2626", border:"#fecaca", label:"Bounced" },
};

function BankChip({ name, logoIndex, size=30 }) {
  const m = getBankMeta(name);
  const [imgOk, setImgOk] = React.useState(true);
  if (logoIndex && imgOk) {
    return <img src={`/${logoIndex}.png`} alt={m.abbr}
      style={{ width:size, height:size, objectFit:"contain", borderRadius:Math.round(size*.24),
        border:"1px solid #e5e7eb", background:"#fff", padding:3, flexShrink:0 }}
      onError={()=>setImgOk(false)}/>;
  }
  return <div style={{ width:size, height:size, borderRadius:Math.round(size*.24), flexShrink:0,
    background:m.bg, display:"flex", alignItems:"center", justifyContent:"center",
    fontSize:size*.28, fontWeight:700, color:"#fff", fontFamily:"'DM Mono',monospace" }}>
    {m.abbr.slice(0,3)}
  </div>;
}

function EditChequeBookModal({ book, onClose, onSaved }) {
  const [form, setForm] = useState({
    branchName:book.branchName||"", branchCode:book.branchCode||"",
    accountNumber:book.accountNumber||"", iban:book.iban||"",
    accountTitle:book.accountTitle||"", isActive:book.isActive!==false,
  });
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault(); setLoading(true);
    const res  = await authFetch(`${API_BASE_URL}/cheque-books/${book._id}`,{
      method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form),
    });
    const data = await res.json(); setLoading(false);
    if (res.ok) onSaved(data.chequeBook);
  };

  return (
    <div className="vcb-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <form className="vcb-modal" onSubmit={submit}>
        <div className="vcb-modal-head">
          <div>
            <div style={{ fontSize:15, fontWeight:700, color:"#111827" }}>Edit Cheque Book</div>
            <div style={{ fontSize:11.5, color:"#9ca3af", marginTop:2 }}>{book.chequeBookId} — {book.bankAccountName}</div>
          </div>
          <button type="button" onClick={onClose}
            style={{ background:"#f3f4f6", border:"none", borderRadius:7, width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#6b7280" }}>
            <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="vcb-modal-body">
          <div className="vcb-g2">
            <div><label className="vcb-modal-lbl">Branch Name</label><input className="vcb-modal-inp" value={form.branchName} onChange={e=>setForm(p=>({...p,branchName:e.target.value}))}/></div>
            <div><label className="vcb-modal-lbl">Branch Code</label><input className="vcb-modal-inp mono" value={form.branchCode} onChange={e=>setForm(p=>({...p,branchCode:e.target.value}))}/></div>
          </div>
          <div><label className="vcb-modal-lbl">Account Title</label><input className="vcb-modal-inp" value={form.accountTitle} onChange={e=>setForm(p=>({...p,accountTitle:e.target.value}))}/></div>
          <div className="vcb-g2">
            <div><label className="vcb-modal-lbl">Account Number</label><input className="vcb-modal-inp mono" value={form.accountNumber} onChange={e=>setForm(p=>({...p,accountNumber:e.target.value}))}/></div>
            <div><label className="vcb-modal-lbl">IBAN</label><input className="vcb-modal-inp mono" value={form.iban} onChange={e=>setForm(p=>({...p,iban:e.target.value.toUpperCase()}))}/></div>
          </div>
          <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", fontSize:13, color:"#374151" }}>
            <input type="checkbox" checked={form.isActive} onChange={e=>setForm(p=>({...p,isActive:e.target.checked}))}
              style={{ width:14, height:14, accentColor:"#111827", cursor:"pointer" }}/>
            Active (can issue cheques from this book)
          </label>
        </div>
        <div className="vcb-modal-foot">
          <button type="button" className="vcb-btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="vcb-btn-dark" disabled={loading}>
            {loading?<><span className="vcb-spin">⟳</span> Saving…</>:<><svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Save Changes</>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ViewChequeBooks() {
  const navigate   = useNavigate();
  const [books,         setBooks]         = useState([]);
  const [entries,       setEntries]       = useState([]);
  const [view,          setView]          = useState("books");
  const [filterBook,    setFilterBook]    = useState("");
  const [bookSearch,    setBookSearch]    = useState("");
  const [entrySearch,   setEntrySearch]   = useState("");
  const [loading,       setLoading]       = useState(true);
  const [editBook,      setEditBook]      = useState(null);
  const [notification,  setNotification]  = useState({ message:"", type:"info" });

  const load = async () => {
    setLoading(true);
    const [br, er] = await Promise.all([
      authFetch(`${API_BASE_URL}/cheque-books`).then(r=>r.json()),
      authFetch(`${API_BASE_URL}/cheque-entries`).then(r=>r.json()),
    ]);
    setBooks(br.chequeBooks||[]);
    setEntries(er.chequeEntries||[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const filteredBooks   = books.filter(b=>(b.bankAccountName+b.chequeBookId+b.branchName+b.accountNumber).toLowerCase().includes(bookSearch.toLowerCase()));
  const filteredEntries = entries.filter(e=>{
    const bm=!filterBook||e.chequeBookId===filterBook;
    const sm=!entrySearch||(e.chequeNo+e.payeeAccountName+e.bankAccountName+e.branchName).toLowerCase().includes(entrySearch.toLowerCase());
    return bm&&sm;
  });

  const updateStatus = async (id,status) => {
    const res=await authFetch(`${API_BASE_URL}/cheque-entries/${id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status})});
    if(res.ok){setNotification({message:"Status updated.",type:"success"});load();}
    else{const d=await res.json();setNotification({message:d.message,type:"error"});}
  };

  const totalIssued = filteredEntries.reduce((s,e)=>s+(e.amount||0),0);

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification message={notification.message} type={notification.type}
        onClose={()=>setNotification({message:"",type:"info"})}/>
      {editBook && (
        <EditChequeBookModal book={editBook} onClose={()=>setEditBook(null)}
          onSaved={updated=>{ setBooks(bs=>bs.map(b=>b._id===updated._id?updated:b)); setEditBook(null); setNotification({message:"Cheque book updated.",type:"success"}); }}/>
      )}

      <div className="vcb">
        <div style={{ marginBottom:16 }}>
          <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 3px" }}>Cheque Management</p>
          <h1 style={{ margin:0, fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px" }}>Cheque Books</h1>
        </div>

        <ChequeTopNav active="view"/>

        {/* Sub-tabs */}
        <div className="vcb-tabs">
          {[{key:"books",label:`📒 Books (${books.length})`},{key:"entries",label:`✍️ Issued Cheques (${entries.length})`}].map(t=>(
            <button key={t.key} className={`vcb-tab${view===t.key?" on":""}`} onClick={()=>setView(t.key)}>{t.label}</button>
          ))}
        </div>

        {/* ── BOOKS TAB ── */}
        {view==="books" && (
          <div className="vcb-card">
            <div className="vcb-card-head">
              <div>
                <p style={{ fontSize:14,fontWeight:700,color:"#111827",margin:0 }}>Cheque Books</p>
                <p style={{ fontSize:11.5,color:"#9ca3af",margin:"2px 0 0" }}>{books.length} registered · {books.filter(b=>b.isActive!==false).length} active</p>
              </div>
              <div style={{ display:"flex",gap:9,alignItems:"center",flexWrap:"wrap" }}>
                <div className="vcb-search">
                  <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  <input value={bookSearch} onChange={e=>setBookSearch(e.target.value)} placeholder="Search books…"/>
                </div>
                <button onClick={()=>navigate("/cheque-book/create")} className="vcb-btn-dark">
                  <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                  New Cheque Book
                </button>
              </div>
            </div>
            {loading ? <div className="vcb-empty" style={{ color:"#9ca3af" }}>Loading…</div>
              : filteredBooks.length===0 ? (
                <div className="vcb-empty">
                  <div style={{ fontSize:36,marginBottom:12 }}>📒</div>
                  <p style={{ fontSize:13,fontWeight:600,color:"#374151",margin:"0 0 4px" }}>{bookSearch?"No books match your search":"No cheque books yet"}</p>
                  {!bookSearch && <button onClick={()=>navigate("/cheque-book/create")} className="vcb-btn-dark" style={{ marginTop:12 }}>+ Create First Cheque Book</button>}
                </div>
              ) : (
                <div style={{ overflowX:"auto" }}>
                  <table className="vcb-table">
                    <thead><tr>{["Book","Bank Account","Branch","Account No. / IBAN","Leaves","Status","Actions"].map(h=><th key={h}>{h}</th>)}</tr></thead>
                    <tbody>
                      {filteredBooks.map(b=>{
                        const issued2=b.lastIssuedLeaf?parseInt(b.lastIssuedLeaf)-parseInt(b.startLeaf)+1:0;
                        const rem=b.totalLeaves-issued2;
                        const pct=Math.round((issued2/b.totalLeaves)*100);
                        return (
                          <tr key={b._id}>
                            <td>
                              <div style={{ fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:13,color:"#111827" }}>{b.chequeBookId}</div>
                              <div style={{ fontSize:11,color:"#9ca3af",marginTop:1 }}>{b.startLeaf}–{b.endLeaf}</div>
                            </td>
                            <td>
                              <div style={{ display:"flex",alignItems:"center",gap:9 }}>
                                <BankChip name={b.bankAccountName} logoIndex={b.bankLogoIndex}/>
                                <div>
                                  <div style={{ fontWeight:600,fontSize:13 }}>{b.bankAccountName}</div>
                                  <div style={{ fontSize:11,color:"#9ca3af",marginTop:1 }}>{b.accountTitle}</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div style={{ fontWeight:500,fontSize:13 }}>{b.branchName}</div>
                              <div style={{ fontSize:11,fontFamily:"'DM Mono',monospace",color:"#9ca3af" }}>Code: {b.branchCode}</div>
                            </td>
                            <td>
                              <div style={{ fontFamily:"'DM Mono',monospace",fontSize:12.5 }}>{b.accountNumber}</div>
                              <div style={{ fontFamily:"'DM Mono',monospace",fontSize:10.5,color:"#9ca3af",marginTop:1 }}>{b.iban}</div>
                            </td>
                            <td style={{ minWidth:120 }}>
                              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
                                <span style={{ fontSize:11.5,color:"#6b7280" }}>{rem} left</span>
                                <span style={{ fontSize:11.5,color:"#9ca3af" }}>{issued2}/{b.totalLeaves}</span>
                              </div>
                              <div style={{ height:4,background:"#f3f4f6",borderRadius:4,overflow:"hidden" }}>
                                <div style={{ height:"100%",borderRadius:4,width:`${pct}%`,background:pct>80?"#ef4444":pct>50?"#f59e0b":"#22c55e",transition:".3s" }}/>
                              </div>
                            </td>
                            <td>
                              <span className="vcb-badge" style={{ background:b.isActive===false?"#fff7ed":"#f0fdf4",color:b.isActive===false?"#d97706":"#15803d",borderColor:b.isActive===false?"#fed7aa":"#bbf7d0" }}>
                                {b.isActive===false?"Inactive":"Active"}
                              </span>
                            </td>
                            <td>
                              <div style={{ display:"flex",gap:6 }}>
                                <button className="vcb-btn-outline vcb-btn-sm vcb-btn-icon" onClick={()=>setEditBook(b)} title="Edit">
                                  <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2a2 2 0 01.586-1.414z"/></svg>
                                </button>
                                <button className="vcb-btn-dark vcb-btn-sm" onClick={()=>navigate("/cheque-book/entry")}>Issue</button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        )}

        {/* ── ENTRIES TAB ── */}
        {view==="entries" && (
          <div className="vcb-card">
            <div className="vcb-card-head">
              <div>
                <p style={{ fontSize:14,fontWeight:700,color:"#111827",margin:0 }}>Issued Cheques</p>
                <p style={{ fontSize:11.5,color:"#9ca3af",margin:"2px 0 0" }}>
                  Total: <strong style={{ color:"#111827",fontFamily:"'DM Mono',monospace" }}>PKR {fmt(totalIssued)}</strong> · {filteredEntries.length} cheques
                </p>
              </div>
              <div style={{ display:"flex",gap:9,alignItems:"center",flexWrap:"wrap" }}>
                <div className="vcb-search">
                  <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  <input value={entrySearch} onChange={e=>setEntrySearch(e.target.value)} placeholder="Search cheques…"/>
                </div>
                <div style={{ position:"relative" }}>
                  <select className="vcb-sel" value={filterBook} onChange={e=>setFilterBook(e.target.value)} style={{ paddingRight:28 }}>
                    <option value="">All Books</option>
                    {books.map(b=><option key={b._id} value={b._id}>{b.chequeBookId} — {b.bankAccountName}</option>)}
                  </select>
                  <svg style={{ position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }} width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                </div>
                <button onClick={()=>navigate("/cheque-book/entry")} className="vcb-btn-dark">
                  <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                  Issue Cheque
                </button>
              </div>
            </div>
            {loading ? <div className="vcb-empty" style={{ color:"#9ca3af" }}>Loading…</div>
              : filteredEntries.length===0 ? (
                <div className="vcb-empty">
                  <div style={{ fontSize:36,marginBottom:12 }}>✍️</div>
                  <p style={{ fontSize:13,fontWeight:600,color:"#374151" }}>{entrySearch||filterBook?"No cheques match your filters":"No cheques issued yet"}</p>
                </div>
              ) : (
                <div style={{ overflowX:"auto" }}>
                  <table className="vcb-table">
                    <thead><tr>{["Cheque No.","Date","Bank / Branch","Payee","Amount (PKR)","Status","Update Status"].map(h=><th key={h}>{h}</th>)}</tr></thead>
                    <tbody>
                      {filteredEntries.map(e=>{
                        const s=STATUS_STYLE[e.status]||STATUS_STYLE.issued;
                        return (
                          <tr key={e._id}>
                            <td><div style={{ fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:13,color:"#111827" }}>{e.chequeNo}</div></td>
                            <td style={{ color:"#374151",whiteSpace:"nowrap" }}>{fmtDate(e.date)}</td>
                            <td>
                              <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                                <BankChip name={e.bankAccountName} logoIndex={e.bankLogoIndex} size={26}/>
                                <div>
                                  <div style={{ fontWeight:600,fontSize:13 }}>{e.bankAccountName}</div>
                                  <div style={{ fontSize:11,color:"#9ca3af" }}>{e.branchName}</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div style={{ fontWeight:600,fontSize:13 }}>{e.payeeAccountName}</div>
                              {e.remarks && <div style={{ fontSize:11.5,color:"#9ca3af",marginTop:1,maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{e.remarks}</div>}
                            </td>
                            <td>
                              <div style={{ fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:13,color:"#111827" }}>{fmt(e.amount)}</div>
                              <div style={{ fontSize:10.5,color:"#9ca3af",maxWidth:170,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginTop:1 }}>{e.amountInWords}</div>
                            </td>
                            <td><span className="vcb-badge" style={{ background:s.bg,color:s.color,borderColor:s.border }}>{s.label}</span></td>
                            <td>
                              <div style={{ position:"relative" }}>
                                <select className="vcb-sel" value={e.status} onChange={ev=>updateStatus(e._id,ev.target.value)} style={{ paddingRight:26,minWidth:90 }}>
                                  <option value="issued">Issued</option>
                                  <option value="cleared">Cleared</option>
                                  <option value="bounced">Bounced</option>
                                </select>
                                <svg style={{ position:"absolute",right:7,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }} width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={4} style={{ fontSize:10.5,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:".07em" }}>Total ({filteredEntries.length})</td>
                        <td><span style={{ fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:13,color:"#111827" }}>PKR {fmt(totalIssued)}</span></td>
                        <td colSpan={2}/>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}