import React, { useEffect, useState, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import JournalNav from "../layout/JournalTopNav.jsx";
import { authFetch } from "../../utils/authFetch.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  * { box-sizing: border-box; }

  .gj-input[type=number]                              { -moz-appearance: textfield; }
  .gj-input[type=number]::-webkit-inner-spin-button,
  .gj-input[type=number]::-webkit-outer-spin-button  { -webkit-appearance: none; }

  .gj-input {
    width: 100%;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 7px 10px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: #111827;
    background: #fff;
    outline: none;
    transition: border-color .15s, box-shadow .15s;
  }
  .gj-input::placeholder { color: #9ca3af; font-style: normal; }
  .gj-input:focus {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .gj-input.mono { font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 400; }

  .gj-btn {
    width: 100%;
    text-align: left;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 7px 10px;
    background: #fff;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: #111827;
    cursor: pointer;
    outline: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: border-color .15s, box-shadow .15s;
  }
  .gj-btn:hover  { border-color: #9ca3af; }
  .gj-btn:focus,
  .gj-btn.open   {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }

  .gj-panel {
    position: absolute;
    z-index: 200;
    top: calc(100% + 2px);
    left: 0; right: 0;
    background: #fff;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,.1);
    max-height: 240px;
    overflow-y: auto;
  }
  .gj-panel::-webkit-scrollbar       { width: 4px; }
  .gj-panel::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }

  .gj-search {
    width: 100%;
    border: none;
    border-bottom: 1px solid #e5e7eb;
    padding: 8px 12px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    background: #f9fafb;
    color: #111827;
    position: sticky;
    top: 0;
    border-radius: 8px 8px 0 0;
  }

  .gj-item {
    padding: 7px 12px;
    font-size: 13px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #374151;
    transition: background .08s;
    border-bottom: 1px solid #f9fafb;
  }
  .gj-item:last-child  { border-bottom: none; }
  .gj-item:hover       { background: #f3f4f6; }
  .gj-item.hi          { background: #f3f4f6; font-weight: 600; color: #111827; }

  .gj-type-badge {
    font-size: 10px;
    color: #6b7280;
    font-family: 'DM Mono', monospace;
    background: #f3f4f6;
    padding: 1px 5px;
    border-radius: 3px;
    flex-shrink: 0;
    margin-left: auto;
  }

  @keyframes gj-fadein { from { opacity:0; transform:translateY(2px); } to { opacity:1; transform:translateY(0); } }
  .gj-fadein { animation: gj-fadein .12s ease-out; }

  @keyframes gj-rowslide { from { opacity:0; } to { opacity:1; } }
  .gj-rowslide { animation: gj-rowslide .15s ease-out; }
`;

/* icons */
const Chevron = ({ open }) => (
  <svg width={12} height={12} fill="none" viewBox="0 0 24 24"
    stroke="#9ca3af" strokeWidth={2.5}
    style={{ flexShrink:0, transition:"transform .15s", transform: open?"rotate(180deg)":"none" }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
  </svg>
);
const Check = () => (
  <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
  </svg>
);
const Trash = () => (
  <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
  </svg>
);
const Plus = () => (
  <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
  </svg>
);

/* label */
function Label({ text, required, note }) {
  return (
    <div style={{ marginBottom: 5, display:"flex", alignItems:"baseline", gap:5 }}>
      <span style={{ fontSize:11, fontWeight:600, color:"#374151", textTransform:"uppercase", letterSpacing:".06em", fontFamily:"'DM Sans',sans-serif" }}>{text}</span>
      {required && <span style={{ fontSize:11, color:"#dc2626" }}>*</span>}
      {note    && <span style={{ fontSize:11, color:"#9ca3af", fontWeight:400, textTransform:"none", letterSpacing:0 }}>{note}</span>}
    </div>
  );
}

/* section wrapper */
function Section({ label, tag, count, children }) {
  return (
    <div style={{ border:"1px solid #e5e7eb", borderRadius:8, overflow:"visible" }}>
      {/* header strip */}
      <div style={{
        background:"#f9fafb",
        borderBottom:"1px solid #e5e7eb",
        padding:"8px 16px",
        display:"flex", alignItems:"center", gap:10,
        borderRadius:"7px 7px 0 0",
      }}>
        <span style={{
          fontSize:10, fontWeight:700, letterSpacing:".04em",
          background:"#e5e7eb", color:"#374151",
          padding:"1px 6px", borderRadius:3,
          fontFamily:"'DM Mono',monospace",
        }}>{tag}</span>
        <span style={{ fontSize:12, fontWeight:600, color:"#374151", fontFamily:"'DM Sans',sans-serif" }}>
          {label}
        </span>
        {count != null && (
          <span style={{ marginLeft:"auto", fontSize:11, color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>
            {count} row{count !== 1 ? "s" : ""}
          </span>
        )}
      </div>
      <div style={{ padding:"14px 16px" }}>{children}</div>
    </div>
  );
}

/* col headers */
function ColHeaders() {
  const s = { fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", fontFamily:"'DM Sans',sans-serif" };
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:7 }}>
      <span style={s}>Account <span style={{color:"#dc2626",fontWeight:400}}>*</span></span>
      <span style={s}>Amount  <span style={{color:"#dc2626",fontWeight:400}}>*</span></span>
      <span style={s}>Description</span>
    </div>
  );
}

export default function GeneralJournalEntry() {

  const dateRef               = useRef(null);
  const debitAccountButtonRef = useRef(null);
  const debitSearchRef        = useRef(null);
  const debitListRef          = useRef(null);
  const debitAmountRef        = useRef(null);
  const debitDescRef          = useRef(null);
  const commentsRef           = useRef(null);
  const creditAccountButtonRefs = useRef([]);
  const creditSearchRefs        = useRef([]);
  const creditListRefs          = useRef([]);
  const creditAmountRefs        = useRef([]);
  const creditDescRefs          = useRef([]);

  const [accounts,            setAccounts]            = useState([]);
  const [debitAccount,        setDebitAccount]        = useState("");
  const [debitSearch,         setDebitSearch]         = useState("");
  const [debitDDOpen,         setDebitDDOpen]         = useState(false);
  const [debitActiveIdx,      setDebitActiveIdx]      = useState(0);
  const [creditActiveIdxs,    setCreditActiveIdxs]    = useState({});
  const [debitAmount,         setDebitAmount]         = useState("");
  const [debitLineDesc,       setDebitLineDesc]       = useState("");
  const [comments,            setComments]            = useState("");
  const [entryDate,           setEntryDate]           = useState(() => new Date().toISOString().slice(0,10));
  const [creditEntries,       setCreditEntries]       = useState([{ account:"", amount:"", lineDesc:"", search:"", open:false, isNew:false }]);
  const [notifMsg,            setNotifMsg]            = useState("");
  const [notifType,           setNotifType]           = useState("");

  const totalCredit  = creditEntries.reduce((s,c)=>s+(parseFloat(c.amount)||0), 0);
  const debitNum     = parseFloat(debitAmount) || 0;
  const diff         = debitNum - totalCredit;
  const balanced     = debitNum > 0 && Math.abs(diff) <= 0.001;

  const notify = (msg, type="info") => { setNotifMsg(""); setTimeout(()=>{ setNotifMsg(msg); setNotifType(type); }, 20); };

  const fmtDate = v => {
    const d = v.replace(/\D/g,"");
    if (d.length <= 4) return d;
    if (d.length <= 6) return `${d.slice(0,4)}-${d.slice(4)}`;
    return `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}`;
  };
  const fmtAmt = n => n.toLocaleString("en-PK",{minimumFractionDigits:2,maximumFractionDigits:2});

  const filterAccts = q =>
    accounts
      .filter(a => a.accountName.toLowerCase().includes(q.toLowerCase()) || a.accountType.toLowerCase().includes(q.toLowerCase()))
      .sort((a,b) => (b.starred?1:0)-(a.starred?1:0));

  const openDebitDD = () => {
    setCreditEntries(p=>p.map(e=>({...e,open:false})));
    setDebitDDOpen(true); setDebitSearch(""); setDebitActiveIdx(0);
    setTimeout(()=>debitSearchRef.current?.focus(),0);
  };
  const openCreditDD = idx => {
    setDebitDDOpen(false);
    setCreditEntries(p=>p.map((e,i)=>({...e,open:i===idx})));
    setCreditActiveIdxs(p=>({...p,[idx]:0}));
    setTimeout(()=>creditSearchRefs.current[idx]?.focus(),0);
  };
  const closeCreditDD = idx => setCreditEntries(p=>p.map((e,i)=>i===idx?{...e,open:false}:e));
  const selectCreditAcct = (idx, id) => {
    setCreditEntries(p=>p.map((e,i)=>i===idx?{...e,account:id,search:"",open:false}:e));
    setTimeout(()=>creditAmountRefs.current[idx]?.focus(),0);
  };
  const creditChange = (idx, field, val) =>
    setCreditEntries(p=>{ const c=[...p]; c[idx]={...c[idx],[field]:val}; return c; });
  const deleteCreditRow = idx => {
    if (creditEntries.length===1) { notify("At least one credit row required","warning"); return; }
    setCreditEntries(p=>p.filter((_,i)=>i!==idx));
  };
  const addCreditRow = (prefill="") => {
    const ni = creditEntries.length;
    setCreditEntries(p=>[...p,{account:prefill,amount:"",lineDesc:"",search:"",open:false,isNew:true}]);
    setTimeout(()=>openCreditDD(ni),0);
  };

  useEffect(()=>{
    (async()=>{
      try { const r=await authFetch(`${API_BASE_URL}/accounts`); const d=await r.json(); if(r.ok) setAccounts(d); else notify("Failed to load accounts","error"); }
      catch { notify("Error loading accounts","error"); }
    })();
  },[]);
  useEffect(()=>{ setTimeout(()=>dateRef.current?.focus(),100); },[]);

  const reset = () => {
    setDebitAccount(""); setDebitAmount(""); setDebitLineDesc(""); setComments("");
    setCreditEntries([{account:"",amount:"",lineDesc:"",search:"",open:false,isNew:false}]);
    creditAccountButtonRefs.current=[]; creditAmountRefs.current=[];
    creditSearchRefs.current=[]; creditDescRefs.current=[];
    setTimeout(()=>dateRef.current?.focus(),80);
  };

  const handleSubmit = async e => {
    if (e?.preventDefault) e.preventDefault();
    if (!debitAccount || !debitAmount || !debitLineDesc.trim()) { notify("Fill all required fields","warning"); return; }
    const dr = parseFloat(debitAmount)||0;
    if (Math.abs(dr-totalCredit)>0.001) { notify("Debit and credit must be equal","error"); return; }
    for (const c of creditEntries) {
      if (!c.account||!c.amount||!c.lineDesc?.trim()) { notify("Fill all credit fields","warning"); return; }
    }
    try {
      const r=await authFetch(`${API_BASE_URL}/create-journal-entry`,{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ description:debitLineDesc, debitLineDesc, debitAccount, debitAmount:dr,
          creditEntries:creditEntries.map(c=>({account:c.account,amount:parseFloat(c.amount),description:c.lineDesc||""})),
          comments, entryDate }),
      });
      const d=await r.json();
      if (r.ok) { notify(d.message||"Entry saved","success"); reset(); }
      else throw new Error(d?.message||"Failed");
    } catch(err) { notify(err.message,"error"); }
  };

  /* click-outside */
  useEffect(()=>{
    const h=e=>{
      if (debitListRef.current&&!debitListRef.current.contains(e.target)&&debitAccountButtonRef.current&&!debitAccountButtonRef.current.contains(e.target)) setDebitDDOpen(false);
      creditListRefs.current.forEach((ref,i)=>{ if(ref&&!ref.contains(e.target)&&creditAccountButtonRefs.current[i]&&!creditAccountButtonRefs.current[i].contains(e.target)) setCreditEntries(p=>p.map((en,idx)=>idx===i?{...en,open:false}:en)); });
    };
    document.addEventListener("mousedown",h);
    return()=>document.removeEventListener("mousedown",h);
  },[creditEntries]);

  /* shortcuts */
  useEffect(()=>{
    const h=e=>{
      const cmd=e.ctrlKey||e.metaKey;
      if(cmd&&e.shiftKey&&e.key==="D"){e.preventDefault();debitDDOpen?(setDebitDDOpen(false),debitAccountButtonRef.current?.focus()):openDebitDD();}
      if(cmd&&e.shiftKey&&e.key==="C"){e.preventDefault();const any=creditEntries.some(c=>c.open);if(any){setCreditEntries(p=>p.map(e=>({...e,open:false})));creditAccountButtonRefs.current[0]?.focus();}else openCreditDD(0);}
    };
    window.addEventListener("keydown",h);
    return()=>window.removeEventListener("keydown",h);
  },[debitDDOpen,creditEntries]);

  /* ─── render ─── */
  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <JournalNav />

      <div style={{ maxWidth:900, margin:"0 auto", paddingBottom:64, fontFamily:"'DM Sans',sans-serif" }}>

        {/* page title */}
        <div style={{ marginBottom:20 }}>
          <p style={{ fontSize:11, color:"#9ca3af", marginBottom:4 }}>
            Accounts <span style={{margin:"0 4px"}}>›</span> Journal Entry
          </p>
          <h1 style={{ margin:0, fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px" }}>
            New Journal Entry
          </h1>
        </div>

        {/* date + balance bar */}
        <div style={{
          display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between",
          background:"#fff", border:"1px solid #e5e7eb", borderRadius:8,
          padding:"10px 16px", marginBottom:12, gap:12,
        }}>
          {/* date */}
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <label style={{ fontSize:12, fontWeight:600, color:"#374151" }}>Date</label>
            <input
              ref={dateRef}
              type="text"
              value={entryDate}
              onChange={e=>setEntryDate(fmtDate(e.target.value))}
              placeholder="YYYY-MM-DD"
              maxLength={10}
              className="gj-input mono"
              style={{ width:120, padding:"5px 9px" }}
              onKeyDown={e=>{ if(e.key==="Enter"){e.preventDefault();openDebitDD();} }}
            />
          </div>

          {/* totals + balance */}
          <div style={{ display:"flex", alignItems:"center", gap:0 }}>
            {[{label:"DR", val:debitNum},{label:"CR", val:totalCredit}].map(({label,val},i)=>(
              <React.Fragment key={label}>
                {i>0 && <div style={{width:1,height:28,background:"#e5e7eb",margin:"0 6px"}}/>}
                <div style={{ textAlign:"center", padding:"0 8px" }}>
                  <div style={{ fontSize:10, fontWeight:700, color:"#9ca3af", letterSpacing:".08em", marginBottom:1 }}>{label}</div>
                  <div style={{ fontSize:13, fontWeight:400, color: label==="DR"?"#15803d":"#b91c1c", fontFamily:"'DM Mono',monospace" }}>{fmtAmt(val)}</div>
                </div>
              </React.Fragment>
            ))}
            <div style={{width:1,height:28,background:"#e5e7eb",margin:"0 6px"}}/>
            <div style={{ padding:"0 8px" }}>
              {balanced ? (
                <span style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, fontWeight:600, color:"#065f46", background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:5, padding:"3px 9px" }}>
                  <Check/> Balanced
                </span>
              ) : (
                <span style={{ fontSize:12, fontWeight:500, color: debitNum>0?"#92400e":"#9ca3af", fontFamily:"'DM Mono',monospace" }}>
                  {debitNum>0 ? `Diff ${fmtAmt(Math.abs(diff))}` : "—"}
                </span>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:8 }}>

          {/* ─── DEBIT ─── */}
          <Section tag="DR" label="Debit Entry">
            <ColHeaders/>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>

              {/* debit account dropdown */}
              <div style={{ position:"relative" }}>
                <button ref={debitAccountButtonRef} type="button"
                  className={`gj-btn${debitDDOpen?" open":""}`}
                  onClick={()=>debitDDOpen?setDebitDDOpen(false):openDebitDD()}
                  onKeyDown={e=>{
                    if(e.key==="Enter"||e.key===" "){e.preventDefault();debitDDOpen?setDebitDDOpen(false):openDebitDD();}
                    if(e.key==="ArrowDown"){e.preventDefault();openDebitDD();}
                    if(e.key==="Escape") setDebitDDOpen(false);
                  }}>
                  <span style={{color:debitAccount?"#111827":"#9ca3af"}}>
                    {debitAccount ? accounts.find(a=>a._id===debitAccount)?.accountName||"—" : "Select account…"}
                  </span>
                  <Chevron open={debitDDOpen}/>
                </button>
                {debitDDOpen && (
                  <div ref={debitListRef} className="gj-panel gj-fadein">
                    <input ref={debitSearchRef} type="text" value={debitSearch}
                      onChange={e=>{setDebitSearch(e.target.value);setDebitActiveIdx(0);}}
                      placeholder="Search…" className="gj-search"
                      onKeyDown={e=>{
                        const r=filterAccts(debitSearch);
                        if(e.key==="ArrowDown"){e.preventDefault();setDebitActiveIdx(i=>Math.min(i+1,r.length-1));}
                        if(e.key==="ArrowUp"){e.preventDefault();setDebitActiveIdx(i=>Math.max(i-1,0));}
                        if(e.key==="Enter"){e.preventDefault();const a=r[debitActiveIdx];if(a){setDebitAccount(a._id);setDebitDDOpen(false);setDebitSearch("");setTimeout(()=>debitAmountRef.current?.focus(),0);}}
                        if(e.key==="Escape"){setDebitDDOpen(false);debitAccountButtonRef.current?.focus();}
                        if(e.key==="Tab") setDebitDDOpen(false);
                      }}/>
                    {filterAccts(debitSearch).map((a,i)=>(
                      <div key={a._id} className={`gj-item${i===debitActiveIdx?" hi":""}`}
                        onMouseEnter={()=>setDebitActiveIdx(i)}
                        onClick={()=>{setDebitAccount(a._id);setDebitDDOpen(false);setDebitSearch("");debitAmountRef.current?.focus();}}>
                        {a.starred && <span style={{color:"#f59e0b",fontSize:10,flexShrink:0}}>★</span>}
                        <span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.accountName}</span>
                        <span className="gj-type-badge">{a.accountType}</span>
                      </div>
                    ))}
                    {filterAccts(debitSearch).length===0 && (
                      <div style={{padding:"10px 12px",fontSize:12,color:"#9ca3af",textAlign:"center"}}>No results</div>
                    )}
                  </div>
                )}
              </div>

              <input ref={debitAmountRef} type="number" min="0" step="0.01"
                value={debitAmount} onChange={e=>setDebitAmount(e.target.value)}
                placeholder="0.00" className="gj-input mono"
                onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();debitDescRef.current?.focus();}}}/>

              <input ref={debitDescRef} type="text" value={debitLineDesc}
                onChange={e=>setDebitLineDesc(e.target.value)}
                placeholder="Narration…" className="gj-input"
                onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();openCreditDD(0);}}}/>
            </div>
          </Section>

          {/* ─── CREDIT ─── */}
          <Section tag="CR" label="Credit Entries" count={creditEntries.length}>
            <ColHeaders/>
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {creditEntries.map((entry,idx)=>(
                <div key={idx} className={entry.isNew?"gj-rowslide":""}
                  style={{
                    display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8,
                    paddingTop:idx>0?10:0, marginTop:idx>0?10:0,
                    borderTop:idx>0?"1px solid #f3f4f6":"none",
                  }}>

                  {/* credit account */}
                  <div style={{ position:"relative" }}>
                    <button ref={el=>(creditAccountButtonRefs.current[idx]=el)} type="button"
                      className={`gj-btn${entry.open?" open":""}`}
                      onClick={()=>entry.open?closeCreditDD(idx):openCreditDD(idx)}
                      onKeyDown={e=>{
                        if(e.key==="Enter"||e.key===" "){e.preventDefault();entry.open?closeCreditDD(idx):openCreditDD(idx);}
                        if(e.key==="ArrowDown"){e.preventDefault();openCreditDD(idx);}
                        if(e.key==="Escape") closeCreditDD(idx);
                      }}>
                      <span style={{color:entry.account?"#111827":"#9ca3af",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                        {entry.account ? accounts.find(a=>a._id===entry.account)?.accountName||"—" : "Select account…"}
                      </span>
                      <Chevron open={entry.open}/>
                    </button>
                    {entry.open && (
                      <div ref={el=>(creditListRefs.current[idx]=el)} className="gj-panel gj-fadein">
                        <input ref={el=>(creditSearchRefs.current[idx]=el)} type="text"
                          value={entry.search}
                          onChange={e=>{creditChange(idx,"search",e.target.value);setCreditActiveIdxs(p=>({...p,[idx]:0}));}}
                          placeholder="Search… (Esc = use debit account)"
                          className="gj-search"
                          onKeyDown={e=>{
                            const r=filterAccts(entry.search); const ai=creditActiveIdxs[idx]||0;
                            if(e.key==="ArrowDown"){e.preventDefault();const n=Math.min(ai+1,r.length-1);setCreditActiveIdxs(p=>({...p,[idx]:n}));creditListRefs.current[idx]?.children[n+1]?.scrollIntoView({block:"nearest"});}
                            if(e.key==="ArrowUp"){e.preventDefault();const n=Math.max(ai-1,0);setCreditActiveIdxs(p=>({...p,[idx]:n}));creditListRefs.current[idx]?.children[n+1]?.scrollIntoView({block:"nearest"});}
                            if(e.key==="Enter"){e.preventDefault();const a=r[ai];selectCreditAcct(idx,a?a._id:(entry.account||debitAccount||""));}
                            if(e.key==="Escape"){const fb=entry.account||debitAccount||"";if(!entry.account&&fb)creditChange(idx,"account",fb);closeCreditDD(idx);setTimeout(()=>creditAmountRefs.current[idx]?.focus(),0);}
                            if(e.key==="Tab") closeCreditDD(idx);
                          }}/>
                        {filterAccts(entry.search).map((a,i)=>(
                          <div key={a._id} className={`gj-item${i===(creditActiveIdxs[idx]||0)?" hi":""}`}
                            onMouseEnter={()=>setCreditActiveIdxs(p=>({...p,[idx]:i}))}
                            onClick={()=>selectCreditAcct(idx,a._id)}>
                            {a.starred && <span style={{color:"#f59e0b",fontSize:10,flexShrink:0}}>★</span>}
                            <span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.accountName}</span>
                            <span className="gj-type-badge">{a.accountType}</span>
                          </div>
                        ))}
                        {filterAccts(entry.search).length===0&&(
                          <div style={{padding:"10px 12px",fontSize:12,color:"#9ca3af",textAlign:"center"}}>No results</div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* amount + delete */}
                  <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                    <input ref={el=>(creditAmountRefs.current[idx]=el)} type="number"
                      value={entry.amount} placeholder="0.00"
                      className="gj-input mono" style={{ flex:1 }}
                      onChange={e=>creditChange(idx,"amount",e.target.value)}
                      onKeyDown={e=>{
                        if(e.key!=="Enter") return; e.preventDefault();
                        if(!entry.account){openCreditDD(idx);return;}
                        creditDescRefs.current[idx]?.focus();
                      }}/>
                    {creditEntries.length>1 && (
                      <button type="button" onClick={()=>deleteCreditRow(idx)}
                        style={{ flexShrink:0, width:28, height:28, borderRadius:5, background:"#fef2f2", color:"#dc2626", border:"1px solid #fecaca", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"background .1s", outline:"none" }}
                        onMouseEnter={e=>e.currentTarget.style.background="#fee2e2"}
                        onMouseLeave={e=>e.currentTarget.style.background="#fef2f2"}>
                        <Trash/>
                      </button>
                    )}
                  </div>

                  {/* desc */}
                  <input ref={el=>(creditDescRefs.current[idx]=el)} type="text"
                    value={entry.lineDesc} onChange={e=>creditChange(idx,"lineDesc",e.target.value)}
                    placeholder="Narration…" className="gj-input"
                    onKeyDown={e=>{
                      if(e.key!=="Enter") return; e.preventDefault();
                      const isLast=idx===creditEntries.length-1;
                      const dr=parseFloat(debitAmount)||0;
                      const cr=creditEntries.reduce((s,c)=>s+(parseFloat(c.amount)||0),0);
                      const ok=dr>0&&Math.abs(dr-cr)<=0.001;
                      if(!isLast) openCreditDD(idx+1);
                      else if(ok) commentsRef.current?.focus();
                      else addCreditRow(entry.account||debitAccount||"");
                    }}/>
                </div>
              ))}
            </div>

            {/* add row */}
            <button type="button" onClick={()=>addCreditRow()}
              style={{
                marginTop:10, width:"100%", padding:"6px 0",
                border:"1px dashed #d1d5db", borderRadius:6,
                background:"transparent", cursor:"pointer",
                color:"#6b7280", fontSize:12.5, fontWeight:500,
                fontFamily:"'DM Sans',sans-serif",
                display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                transition:"background .1s, border-color .1s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.background="#f9fafb";e.currentTarget.style.borderColor="#9ca3af";}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="#d1d5db";}}>
              <Plus/> Add Credit Row
            </button>
          </Section>

          {/* ─── comments ─── */}
          <div style={{ border:"1px solid #e5e7eb", borderRadius:8, background:"#fff", padding:"12px 16px" }}>
            <Label text="Narration / Comments" note="optional"/>
            <textarea ref={commentsRef} value={comments} onChange={e=>setComments(e.target.value)}
              rows={2} placeholder="Additional notes… (Enter to save, Shift+Enter for new line)"
              style={{ width:"100%", border:"1px solid #d1d5db", borderRadius:6, padding:"7px 10px", fontSize:13, fontFamily:"'DM Sans',sans-serif", color:"#111827", outline:"none", resize:"vertical", transition:"border-color .15s" }}
              onFocus={e=>{e.target.style.borderColor="#6b7280";e.target.style.boxShadow="0 0 0 2px rgba(107,114,128,.12)";}}
              onBlur={e=>{e.target.style.borderColor="#d1d5db";e.target.style.boxShadow="none";}}
              onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();handleSubmit(e);}}}/>
          </div>

          {/* ─── submit ─── */}
          <div style={{ display:"flex", gap:8 }}>
            <button type="button" onClick={reset}
              style={{ padding:"9px 18px", borderRadius:7, border:"1px solid #d1d5db", background:"#fff", color:"#374151", fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"background .1s" }}
              onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"}
              onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
              Clear
            </button>
            <button type="submit"
              disabled={!balanced}
              style={{
                flex:1, padding:"9px 0", borderRadius:7, border:"none",
                cursor:balanced?"pointer":"not-allowed",
                fontSize:13, fontWeight:600, fontFamily:"'DM Sans',sans-serif",
                background:balanced?"#111827":"#f3f4f6",
                color:balanced?"#fff":"#9ca3af",
                transition:"background .15s, opacity .15s",
                display:"flex", alignItems:"center", justifyContent:"center", gap:7,
              }}
              onMouseEnter={e=>{ if(balanced) e.currentTarget.style.background="#1f2937"; }}
              onMouseLeave={e=>{ if(balanced) e.currentTarget.style.background="#111827"; }}>
              {balanced ? <><Check/> Save Journal Entry</> : "Complete the entry to save"}
            </button>
          </div>

          {/* keyboard shortcuts */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, paddingTop:4 }}>
            {[["Ctrl+Shift+D","Debit DD"],["Ctrl+Shift+C","Credit DD"],["Enter","Advance"],["↑↓","Navigate list"],["Esc","Use debit acct"]].map(([k,d])=>(
              <div key={k} style={{ display:"flex", alignItems:"center", gap:5 }}>
                <kbd style={{ background:"#f3f4f6", border:"1px solid #e5e7eb", borderRadius:4, padding:"1px 6px", fontSize:10, fontFamily:"'DM Mono',monospace", color:"#374151" }}>{k}</kbd>
                <span style={{ fontSize:11, color:"#9ca3af" }}>{d}</span>
              </div>
            ))}
          </div>

        </form>
      </div>

      <Notification message={notifMsg} type={notifType} onClose={()=>setNotifMsg("")}/>
    </SidebarLayout>
  );
}