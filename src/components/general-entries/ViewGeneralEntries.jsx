import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import JournalNav from "../layout/JournalTopNav.jsx";
import { authFetch } from "../../utils/authFetch.js";

const fmt = n =>
  Number(n||0).toLocaleString("en-PK",{minimumFractionDigits:2,maximumFractionDigits:2});

const fmtDate = val => {
  if (!val) return "—";
  const d = new Date(val);
  return isNaN(d.getTime()) ? "—"
    : d.toLocaleDateString("en-PK",{day:"2-digit",month:"short",year:"numeric"});
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  .vge *, .vge *::before, .vge *::after { box-sizing:border-box; }
  .vge { font-family:'DM Sans',sans-serif; color:#111827; }
  .vge-mono { font-family:'DM Mono',monospace; }
  .entry-anim { animation: vge-in .16s ease both; }
  @keyframes vge-in { from{opacity:0} to{opacity:1} }
  .vge-row:hover { background:#fafafa; }
  .vge-row td   { transition:background .08s; }
  .vge-inp {
    border:1px solid #d1d5db; border-radius:6px; padding:7px 10px;
    font-size:13px; font-family:'DM Sans',sans-serif; color:#111827;
    background:#fff; outline:none; transition:border-color .15s, box-shadow .15s;
  }
  .vge-inp:focus {
    border-color:#6b7280;
    box-shadow:0 0 0 2px rgba(107,114,128,.12);
  }
  .vge-inp::placeholder { color:#9ca3af; }
`;

/* ── Account Dropdown ─────────────────────────────────────── */
function AccountDropdown({ label, accounts, value, onSelect }) {
  const [open,  setOpen]  = useState(false);
  const [query, setQuery] = useState("");
  const filtered = accounts.filter(a =>
    a.accountName.toLowerCase().includes(query.toLowerCase()) ||
    a.accountType.toLowerCase().includes(query.toLowerCase())
  );
  const selected = accounts.find(a => a._id === value);

  return (
    <div style={{ position:"relative" }}>
      {label && (
        <label style={{ display:"block", fontSize:11, fontWeight:600, color:"#374151", textTransform:"uppercase", letterSpacing:".06em", marginBottom:5, fontFamily:"'DM Sans',sans-serif" }}>
          {label}
        </label>
      )}
      <button type="button" onClick={()=>setOpen(o=>!o)}
        style={{
          width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
          border:"1px solid #d1d5db", borderRadius:6, padding:"7px 10px",
          background:"#fff", fontSize:13, fontFamily:"'DM Sans',sans-serif",
          color:selected?"#111827":"#9ca3af", cursor:"pointer", outline:"none",
          transition:"border-color .15s",
        }}
        onFocus={e=>e.target.style.borderColor="#6b7280"}
        onBlur={e=>e.target.style.borderColor="#d1d5db"}>
        <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {selected ? selected.accountName : "Select account"}
        </span>
        <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2.5} style={{flexShrink:0,marginLeft:6}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <div style={{ position:"absolute", zIndex:200, top:"calc(100% + 2px)", left:0, right:0, background:"#fff", border:"1px solid #d1d5db", borderRadius:8, boxShadow:"0 4px 16px rgba(0,0,0,.1)", overflow:"hidden" }}>
          <div style={{ padding:6, borderBottom:"1px solid #f3f4f6", background:"#f9fafb" }}>
            <input autoFocus type="text" value={query} onChange={e=>setQuery(e.target.value)}
              placeholder="Search…"
              style={{ width:"100%", padding:"6px 9px", border:"1px solid #e5e7eb", borderRadius:5, fontSize:12.5, outline:"none", fontFamily:"'DM Sans',sans-serif" }}/>
          </div>
          <ul style={{ maxHeight:200, overflowY:"auto", margin:0, padding:0, listStyle:"none" }}>
            {filtered.length === 0
              ? <li style={{padding:"9px 12px",fontSize:12.5,color:"#9ca3af"}}>No results</li>
              : filtered.map(a => (
                <li key={a._id}
                  onClick={()=>{onSelect(a._id);setOpen(false);setQuery("");}}
                  style={{ padding:"7px 12px", fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #f9fafb", fontWeight:value===a._id?600:400, background:value===a._id?"#f3f4f6":"transparent" }}
                  onMouseEnter={e=>{if(value!==a._id)e.currentTarget.style.background="#f9fafb";}}
                  onMouseLeave={e=>{if(value!==a._id)e.currentTarget.style.background="transparent";}}>
                  <span>{a.accountName}</span>
                  <span style={{fontSize:10,color:"#9ca3af",marginLeft:8,fontFamily:"'DM Mono',monospace"}}>{a.accountType}</span>
                </li>
              ))
            }
          </ul>
        </div>
      )}
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────── */
export default function ViewGeneralEntries() {
  const [entries,         setEntries]         = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [accounts,        setAccounts]        = useState([]);
  const [filters,         setFilters]         = useState({ startDate:"", endDate:"", account:"" });
  const [loading,         setLoading]         = useState(true);
  const [notification,    setNotification]    = useState({ message:"", type:"info" });
  const [editingEntry,    setEditingEntry]    = useState(null);
  const [editForm,        setEditForm]        = useState({});
  const [deleteModal,     setDeleteModal]     = useState({ open:false, entryId:null });

  // BUG FIX #3 (frontend): cashAccountId must be sent with every delete/update
  // so the backend knows which account is Cash In Hand and can recalculate its
  // balance. Without this, recalcAffected never updated Cash In Hand.
  const getCashAccountId = () => localStorage.getItem("cashAccountId") || "";

  const safeJson = async r => { try { const t=await r.text(); return t?JSON.parse(t):{}; } catch { return null; } };

  const fetchEntries = async () => {
    try {
      const r=await authFetch(`${API_BASE_URL}/get-journal-entries`);
      const d=await safeJson(r);
      if(!r.ok) throw new Error(d?.message||"Failed");
      setEntries(d); setFilteredEntries(d);
    } catch(e) { setNotification({message:e.message,type:"error"}); }
    finally { setLoading(false); }
  };
  const fetchAccounts = async () => {
    try {
      const r=await authFetch(`${API_BASE_URL}/accounts`);
      const d=await safeJson(r);
      if(Array.isArray(d)) setAccounts(d);
    } catch {}
  };

  useEffect(()=>{ fetchEntries(); fetchAccounts(); },[]);

  useEffect(()=>{
    let t=[...entries];
    if(filters.startDate) t=t.filter(e=>new Date(e.entryDate)>=new Date(filters.startDate));
    if(filters.endDate)   t=t.filter(e=>new Date(e.entryDate)<=new Date(filters.endDate));
    if(filters.account){
      const s=filters.account.toLowerCase();
      t=t.filter(e=>{
        const dn=(typeof e.debitAccount==="string"?e.debitAccount:e.debitAccount?.accountName||"").toLowerCase();
        const cm=(e.creditEntries||[]).some(c=>(typeof c.account==="string"?c.account:c.account?.accountName||"").toLowerCase().includes(s));
        return dn.includes(s)||cm;
      });
    }
    setFilteredEntries(t);
  },[entries,filters]);

  useEffect(()=>{
    if(editingEntry) setEditForm({
      debitAccount:  editingEntry.debitAccount?._id||editingEntry.debitAccount||"",
      debitAmount:   editingEntry.debitAmount||0,
      debitLineDesc: editingEntry.debitLineDesc||"",
      creditEntries: (editingEntry.creditEntries||[]).map(c=>({account:c.account?._id||c.account||"",amount:c.amount||0,description:c.description||""})),
      entryDate:     editingEntry.entryDate?.slice(0,10)||"",
      comments:      editingEntry.comments||"",
    });
  },[editingEntry]);

  const totalDebit  = filteredEntries.reduce((s,e)=>s+(e.debitAmount||0),0);
  const totalCredit = filteredEntries.reduce((s,e)=>s+(e.creditEntries||[]).reduce((cs,c)=>cs+(c.amount||0),0),0);

  const inp = { border:"1px solid #d1d5db", borderRadius:6, padding:"7px 10px", fontSize:12.5, outline:"none", fontFamily:"'DM Sans',sans-serif", color:"#111827", background:"#fff", width:"100%", transition:"border-color .15s" };
  const onFoc = e=>{ e.target.style.borderColor="#6b7280"; e.target.style.boxShadow="0 0 0 2px rgba(107,114,128,.12)"; };
  const onBlr = e=>{ e.target.style.borderColor="#d1d5db"; e.target.style.boxShadow="none"; };

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>

      {/* ─── Delete modal ─── */}
      {deleteModal.open && (
        <div style={{position:"fixed",inset:0,zIndex:1100,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.4)"}}>
          <div style={{background:"#fff",borderRadius:10,padding:"28px 28px 22px",width:"100%",maxWidth:360,boxShadow:"0 16px 48px rgba(0,0,0,.14)",border:"1px solid #e5e7eb"}}>
            <div style={{width:40,height:40,background:"#fef2f2",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}>
              <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </div>
            <h3 style={{textAlign:"center",fontSize:15,fontWeight:700,color:"#111827",marginBottom:6}}>Delete Entry?</h3>
            <p style={{textAlign:"center",fontSize:13,color:"#6b7280",marginBottom:22,lineHeight:1.6}}>
              This journal entry will be permanently removed and all affected account balances will be recalculated.
            </p>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setDeleteModal({open:false,entryId:null})}
                style={{flex:1,padding:"8px 0",borderRadius:7,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
                Cancel
              </button>
              <button
                onClick={async()=>{
                  try {
                    // BUG FIX #3: Pass cashAccountId as query param so backend can
                    // recalculate Cash In Hand balance after deletion.
                    const cashAccountId = getCashAccountId();
                    const qs = cashAccountId ? `?cashAccountId=${cashAccountId}` : "";
                    const r=await authFetch(`${API_BASE_URL}/delete-journal-entry/${deleteModal.entryId}${qs}`,{method:"DELETE"});
                    const d=await safeJson(r);
                    if(!r.ok) throw new Error(d?.message||"Delete failed");
                    setEntries(p=>p.filter(e=>e._id!==deleteModal.entryId));
                    setFilteredEntries(p=>p.filter(e=>e._id!==deleteModal.entryId));
                    setNotification({message:"Entry deleted and balances updated",type:"success"});
                  } catch(e){setNotification({message:e.message,type:"error"});}
                  finally{setDeleteModal({open:false,entryId:null});}
                }}
                style={{flex:1,padding:"8px 0",borderRadius:7,background:"#dc2626",color:"#fff",fontSize:13,fontWeight:600,border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Edit modal ─── */}
      {editingEntry && (
        <div style={{position:"fixed",inset:0,zIndex:1100,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.4)",padding:16}}>
          <div style={{background:"#fff",width:"100%",maxWidth:660,borderRadius:10,boxShadow:"0 16px 48px rgba(0,0,0,.14)",border:"1px solid #e5e7eb",maxHeight:"90vh",overflowY:"auto"}}>

            {/* header */}
            <div style={{padding:"14px 22px",borderBottom:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:"#fff",zIndex:10}}>
              <div>
                <h3 style={{margin:0,fontSize:15,fontWeight:700,color:"#111827"}}>Edit Journal Entry</h3>
                <p style={{margin:0,fontSize:11,color:"#9ca3af",marginTop:2,fontFamily:"'DM Mono',monospace"}}>{fmtDate(editingEntry.entryDate)}</p>
              </div>
              <button onClick={()=>setEditingEntry(null)}
                style={{width:28,height:28,borderRadius:6,border:"1px solid #e5e7eb",background:"#f9fafb",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#6b7280",fontSize:14}}>
                ✕
              </button>
            </div>

            <div style={{padding:"18px 22px",display:"flex",flexDirection:"column",gap:14}}>

              {/* date + narration */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div>
                  <label style={{display:"block",fontSize:11,fontWeight:600,color:"#374151",textTransform:"uppercase",letterSpacing:".06em",marginBottom:5}}>Date</label>
                  <input type="date" value={editForm.entryDate}
                    onChange={e=>setEditForm({...editForm,entryDate:e.target.value})}
                    style={inp} onFocus={onFoc} onBlur={onBlr}/>
                </div>
                <div>
                  <label style={{display:"block",fontSize:11,fontWeight:600,color:"#374151",textTransform:"uppercase",letterSpacing:".06em",marginBottom:5}}>Narration</label>
                  <input type="text" value={editForm.comments}
                    onChange={e=>setEditForm({...editForm,comments:e.target.value})}
                    style={inp} onFocus={onFoc} onBlur={onBlr}/>
                </div>
              </div>

              {/* debit */}
              <div style={{border:"1px solid #e5e7eb",borderRadius:8,padding:"12px 14px"}}>
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:12}}>
                  <span style={{fontSize:10,fontWeight:700,background:"#f3f4f6",color:"#374151",padding:"1px 6px",borderRadius:3,fontFamily:"'DM Mono',monospace"}}>DR</span>
                  <span style={{fontSize:12,fontWeight:600,color:"#374151"}}>Debit</span>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                  <AccountDropdown label="Account" accounts={accounts} value={editForm.debitAccount}
                    onSelect={id=>setEditForm({...editForm,debitAccount:id})}/>
                  <div>
                    <label style={{display:"block",fontSize:11,fontWeight:600,color:"#374151",textTransform:"uppercase",letterSpacing:".06em",marginBottom:5}}>Amount</label>
                    <input type="number" value={editForm.debitAmount}
                      onChange={e=>setEditForm({...editForm,debitAmount:Number(e.target.value)})}
                      style={{...inp,fontFamily:"'DM Mono',monospace"}}
                      onFocus={onFoc} onBlur={onBlr}/>
                  </div>
                </div>
                <div>
                  <label style={{display:"block",fontSize:11,fontWeight:600,color:"#374151",textTransform:"uppercase",letterSpacing:".06em",marginBottom:5}}>Description</label>
                  <input type="text" value={editForm.debitLineDesc}
                    onChange={e=>setEditForm({...editForm,debitLineDesc:e.target.value})}
                    style={inp} onFocus={onFoc} onBlur={onBlr}/>
                </div>
              </div>

              {/* credit */}
              <div style={{border:"1px solid #e5e7eb",borderRadius:8,padding:"12px 14px"}}>
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:12}}>
                  <span style={{fontSize:10,fontWeight:700,background:"#f3f4f6",color:"#374151",padding:"1px 6px",borderRadius:3,fontFamily:"'DM Mono',monospace"}}>CR</span>
                  <span style={{fontSize:12,fontWeight:600,color:"#374151"}}>Credit</span>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {(editForm.creditEntries||[]).map((c,i)=>(
                    <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                      <AccountDropdown accounts={accounts} value={c.account}
                        onSelect={id=>{ const nc=[...editForm.creditEntries]; nc[i].account=id; setEditForm({...editForm,creditEntries:nc}); }}/>
                      <input type="number" value={c.amount||0} placeholder="Amount"
                        onChange={e=>{ const nc=[...editForm.creditEntries]; nc[i].amount=Number(e.target.value); setEditForm({...editForm,creditEntries:nc}); }}
                        style={{...inp,fontFamily:"'DM Mono',monospace"}} onFocus={onFoc} onBlur={onBlr}/>
                      <input type="text" value={c.description||""} placeholder="Description"
                        onChange={e=>{ const nc=[...editForm.creditEntries]; nc[i].description=e.target.value; setEditForm({...editForm,creditEntries:nc}); }}
                        style={inp} onFocus={onFoc} onBlur={onBlr}/>
                    </div>
                  ))}
                </div>
                {(()=>{
                  const cr=(editForm.creditEntries||[]).reduce((s,c)=>s+Number(c.amount||0),0);
                  const ok=cr===editForm.debitAmount;
                  return (
                    <div style={{marginTop:10,padding:"6px 10px",borderRadius:6,background:ok?"#f0fdf4":"#fefce8",border:`1px solid ${ok?"#bbf7d0":"#fde68a"}`,fontSize:12,fontWeight:600,fontFamily:"'DM Mono',monospace",color:ok?"#065f46":"#92400e"}}>
                      {ok ? `✓ Balanced — ${fmt(editForm.debitAmount)}` : `Diff: ${fmt(Math.abs(editForm.debitAmount-cr))}`}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* footer */}
            <div style={{padding:"12px 22px",borderTop:"1px solid #f3f4f6",display:"flex",justifyContent:"flex-end",gap:8,background:"#f9fafb",borderRadius:"0 0 10px 10px"}}>
              <button onClick={()=>setEditingEntry(null)}
                style={{padding:"8px 16px",borderRadius:7,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
                Cancel
              </button>
              <button
                onClick={async()=>{
                  const cr=(editForm.creditEntries||[]).reduce((s,c)=>s+Number(c.amount||0),0);
                  if(editForm.debitAmount!==cr) return setNotification({message:"Debit and credit must be equal",type:"error"});
                  try {
                    // BUG FIX #3: Include cashAccountId in the PUT body so backend
                    // recalculates Cash In Hand balance after every edit.
                    const cashAccountId = getCashAccountId();
                    const payload = { ...editForm, cashAccountId };
                    const r=await authFetch(`${API_BASE_URL}/update-journal-entry/${editingEntry._id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
                    const d=await r.json();
                    if(!r.ok) throw new Error(d?.message||"Update failed");
                    setEntries(p=>p.map(e=>e._id===d.entry._id?d.entry:e));
                    setFilteredEntries(p=>p.map(e=>e._id===d.entry._id?d.entry:e));
                    setNotification({message:"Entry updated and balances recalculated",type:"success"});
                    setEditingEntry(null);
                  } catch(e){ setNotification({message:e.message,type:"error"}); }
                }}
                style={{padding:"8px 20px",borderRadius:7,background:"#111827",color:"#fff",fontSize:13,fontWeight:600,border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"background .12s"}}
                onMouseEnter={e=>e.currentTarget.style.background="#1f2937"}
                onMouseLeave={e=>e.currentTarget.style.background="#111827"}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Page ─── */}
      <div className="vge" style={{ paddingBottom:48 }}>
        <JournalNav />

        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>

          {/* header */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10, marginBottom:4 }}>
            <div>
              <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 4px" }}>Accounts › Journal</p>
              <h1 style={{ margin:0, fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px" }}>General Journal</h1>
            </div>
            <div style={{ display:"flex", gap:0, background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, overflow:"hidden" }}>
              {[["Total Debit",totalDebit,"#15803d","#f0fdf4"],["Total Credit",totalCredit,"#b91c1c","#fef2f2"]].map(([l,v,c,bg],i)=>(
                <div key={l} style={{ padding:"10px 20px", background:bg, borderLeft:i>0?"1px solid #e5e7eb":"none", textAlign:"right" }}>
                  <div style={{ fontSize:10, fontWeight:500, color:c, textTransform:"uppercase", letterSpacing:".07em", marginBottom:3, opacity:.7 }}>{l}</div>
                  <div style={{ fontSize:14, fontWeight:500, color:c, fontFamily:"'DM Mono',monospace" }}>{fmt(v)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* filters */}
          <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, padding:"12px 16px" }}>
            <p style={{ fontSize:11, fontWeight:600, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".08em", margin:"0 0 10px" }}>Filter</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10, alignItems:"flex-end" }}>
              {[["From","startDate"],["To","endDate"]].map(([lbl,key])=>(
                <div key={key}>
                  <label style={{ display:"block", fontSize:11, fontWeight:600, color:"#374151", textTransform:"uppercase", letterSpacing:".06em", marginBottom:4 }}>{lbl}</label>
                  <input type="date" value={filters[key]} onChange={e=>setFilters({...filters,[key]:e.target.value})}
                    className="vge-inp" style={{ width:"auto" }}/>
                </div>
              ))}
              <div style={{ flex:1, minWidth:200 }}>
                <label style={{ display:"block", fontSize:11, fontWeight:600, color:"#374151", textTransform:"uppercase", letterSpacing:".06em", marginBottom:4 }}>Account</label>
                <input type="text" placeholder="Search by account name…" value={filters.account}
                  onChange={e=>setFilters({...filters,account:e.target.value})}
                  className="vge-inp" style={{ width:"100%" }}/>
              </div>
              <div style={{ display:"flex", alignItems:"flex-end", gap:8 }}>
                <span style={{ fontSize:12, color:"#9ca3af", paddingBottom:8, fontFamily:"'DM Mono',monospace" }}>
                  {filteredEntries.length} result{filteredEntries.length!==1?"s":""}
                </span>
                {(filters.startDate||filters.endDate||filters.account) && (
                  <button onClick={()=>setFilters({startDate:"",endDate:"",account:""})}
                    style={{ padding:"7px 12px", borderRadius:6, background:"#f9fafb", color:"#374151", border:"1px solid #e5e7eb", fontSize:12.5, fontWeight:500, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* table */}
          <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, overflow:"hidden" }}>
            {loading ? (
              <div style={{ padding:24 }}>
                {[1,2,3].map(i=>(
                  <div key={i} style={{ marginBottom:16 }}>
                    <div style={{ height:11, background:"#f3f4f6", borderRadius:5, marginBottom:6, backgroundImage:"linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%)", backgroundSize:"200% 100%", animation:"vge-sk 1.4s infinite" }}/>
                    <div style={{ height:9, background:"#f9fafb", borderRadius:5, width:"75%", marginLeft:20 }}/>
                  </div>
                ))}
                <style>{`@keyframes vge-sk{to{background-position:-200% 0}}`}</style>
              </div>
            ) : filteredEntries.length === 0 ? (
              <div style={{ padding:"56px 0", textAlign:"center" }}>
                <div style={{ fontSize:32, marginBottom:10 }}>📒</div>
                <p style={{ fontSize:13, fontWeight:600, color:"#374151", margin:"0 0 4px" }}>No entries found</p>
                <p style={{ fontSize:12, color:"#9ca3af" }}>Try adjusting your filters.</p>
              </div>
            ) : (
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                  <thead>
                    <tr style={{ borderBottom:"1px solid #e5e7eb", background:"#f9fafb" }}>
                      {[["Date","120px","left"],["Account",null,"left"],["Description",null,"left"],["Debit",null,"right"],["Credit",null,"right"],["",null,"center"]].map(([h,w,a])=>(
                        <th key={h} style={{ padding:"8px 14px", textAlign:a, fontSize:10, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".07em", fontFamily:"'DM Sans',sans-serif", ...(w?{width:w}:{}) }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEntries.map((entry,eIdx)=>(
                      <React.Fragment key={entry._id}>

                        {/* debit row */}
                        <tr className="vge-row entry-anim"
                          style={{ borderTop:eIdx>0?"2px solid #e5e7eb":"1px solid #f3f4f6" }}>
                          <td style={{ padding:"9px 14px", verticalAlign:"top" }}>
                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11.5, color:"#6b7280", whiteSpace:"nowrap" }}>
                              {fmtDate(entry.entryDate)}
                            </span>
                          </td>
                          <td style={{ padding:"9px 14px", verticalAlign:"top" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                              <span style={{ fontWeight:600, color:"#111827", fontSize:13 }}>
                                {entry.debitAccount?.accountName||"—"}
                              </span>
                              <span style={{ fontSize:9.5, fontWeight:700, padding:"1px 5px", borderRadius:3, background:"#f3f4f6", color:"#374151", border:"1px solid #e5e7eb", fontFamily:"'DM Mono',monospace", letterSpacing:".04em" }}>DR</span>
                            </div>
                          </td>
                          <td style={{ padding:"9px 14px", verticalAlign:"top", color:"#6b7280", fontSize:12.5 }}>
                            {entry.debitLineDesc||"—"}
                          </td>
                          <td style={{ padding:"9px 14px", textAlign:"right", verticalAlign:"top", fontFamily:"'DM Mono',monospace", fontWeight:400, color:"#15803d", fontSize:13 }}>
                            {fmt(entry.debitAmount)}
                          </td>
                          <td style={{ padding:"9px 14px", textAlign:"right", verticalAlign:"top", color:"#d1d5db", fontSize:12 }}>—</td>
                          <td style={{ padding:"9px 14px", textAlign:"center", verticalAlign:"top" }}
                            rowSpan={(entry.creditEntries||[]).length+2}>
                            {(entry.description==="Opening Balance"||entry.debitLineDesc==="Opening Balance") ? (
                              <span style={{ fontSize:10.5, fontWeight:600, color:"#9ca3af", background:"#f9fafb", border:"1px solid #e5e7eb", padding:"2px 7px", borderRadius:4 }}>Locked</span>
                            ) : (
                              <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                                <button onClick={()=>setEditingEntry(entry)}
                                  style={{ fontSize:11.5, fontWeight:500, padding:"3px 10px", borderRadius:5, background:"#fff", color:"#374151", border:"1px solid #d1d5db", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"background .1s" }}
                                  onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"}
                                  onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                                  Edit
                                </button>
                                <button onClick={()=>setDeleteModal({open:true,entryId:entry._id})}
                                  style={{ fontSize:11.5, fontWeight:500, padding:"3px 10px", borderRadius:5, background:"#fff", color:"#dc2626", border:"1px solid #fecaca", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"background .1s" }}
                                  onMouseEnter={e=>e.currentTarget.style.background="#fef2f2"}
                                  onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>

                        {/* credit rows */}
                        {(entry.creditEntries||[]).map((cr,i)=>(
                          <tr key={i} className="vge-row" style={{ borderTop:"1px solid #f9fafb" }}>
                            <td style={{ padding:"6px 14px" }}/>
                            <td style={{ padding:"6px 14px 6px 24px" }}>
                              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                                <span style={{ color:"#374151", fontSize:12.5 }}>{cr.account?.accountName||"—"}</span>
                              </div>
                            </td>
                            <td style={{ padding:"6px 14px", color:"#9ca3af", fontSize:12.5 }}>{cr.description||"—"}</td>
                            <td style={{ padding:"6px 14px", textAlign:"right", color:"#d1d5db", fontSize:12 }}>—</td>
                            <td style={{ padding:"6px 14px", textAlign:"right", fontFamily:"'DM Mono',monospace", fontWeight:400, color:"#b91c1c", fontSize:13 }}>
                              {fmt(cr.amount)}
                            </td>
                          </tr>
                        ))}

                        {/* narration */}
                        <tr style={{ borderTop:"1px solid #f9fafb" }}>
                          <td style={{ padding:"4px 14px" }}/>
                          <td colSpan={4} style={{ padding:"4px 14px", fontSize:12, color:"#9ca3af" }}>
                            <span style={{ fontWeight:500, color:"#6b7280", marginRight:5 }}>Narration:</span>
                            {entry.description||"—"}
                            {entry.comments && <span style={{ marginLeft:8 }}>· {entry.comments}</span>}
                          </td>
                        </tr>

                      </React.Fragment>
                    ))}
                  </tbody>

                  <tfoot>
                    <tr style={{ borderTop:"2px solid #e5e7eb", background:"#f9fafb" }}>
                      <td colSpan={3} style={{ padding:"9px 14px", fontSize:11, fontWeight:600, color:"#6b7280", fontFamily:"'DM Sans',sans-serif" }}>
                        {filteredEntries.length} entr{filteredEntries.length!==1?"ies":"y"}
                      </td>
                      <td style={{ padding:"9px 14px", textAlign:"right", fontFamily:"'DM Mono',monospace", fontWeight:400, color:"#15803d", fontSize:13 }}>
                        {fmt(totalDebit)}
                      </td>
                      <td style={{ padding:"9px 14px", textAlign:"right", fontFamily:"'DM Mono',monospace", fontWeight:400, color:"#b91c1c", fontSize:13 }}>
                        {fmt(totalCredit)}
                      </td>
                      <td/>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <Notification message={notification.message} type={notification.type} onClose={()=>setNotification({message:"",type:"info"})}/>
    </SidebarLayout>
  );
}