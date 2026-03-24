import React, { useState, useEffect, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";
import Notification from "../Notification";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .cb { font-family: 'DM Sans', sans-serif; color: #111827; }
  .cb-mono { font-family: 'DM Mono', monospace; }

  .cb-inp {
    width: 100%; padding: 7px 10px;
    border: 1px solid #d1d5db; border-radius: 6px;
    font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s;
  }
  .cb-inp::placeholder { color: #9ca3af; }
  .cb-inp:focus {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .cb-inp.mono { font-family: 'DM Mono', monospace; }

  /* account dropdown */
  .cb-sd-btn {
    width: 100%; padding: 7px 10px;
    border: 1px solid #d1d5db; border-radius: 6px;
    background: #fff; font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #9ca3af; cursor: pointer; outline: none;
    display: flex; align-items: center; justify-content: space-between; gap: 6px;
    transition: border-color .12s, box-shadow .12s;
  }
  .cb-sd-btn.sel { color: #111827; }
  .cb-sd-btn:focus, .cb-sd-btn.open {
    border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .cb-sd-panel {
    position: absolute; left: 0; top: calc(100% + 3px); z-index: 300;
    width: max(100%, 240px); background: #fff;
    border: 1px solid #d1d5db; border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,.1); overflow: hidden;
  }
  .cb-sd-item {
    padding: 7px 11px; font-size: 13px; cursor: pointer;
    border-bottom: 1px solid #f9fafb; color: #111827;
    transition: background .08s;
  }
  .cb-sd-item:hover { background: #f3f4f6; }
  .cb-sd-item.sel { background: #f3f4f6; font-weight: 600; }

  /* stat cards */
  .cb-stat {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; padding: 14px 16px;
    position: relative; overflow: hidden;
  }
  .cb-stat::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 3px;
  }
  .cb-stat.s-open::before  { background: #d1d5db; }
  .cb-stat.s-curr::before  { background: #1f2937; }
  .cb-stat.s-after::before { background: #15803d; }
  .cb-stat.s-neg::before   { background: #dc2626; }

  /* entry row */
  .cb-row {
    display: grid;
    grid-template-columns: 120px 1fr 1fr 120px 32px;
    gap: 8px; padding: 10px; border-radius: 7px;
    border: 1px solid #e5e7eb; background: #fff;
    align-items: start;
  }
  .cb-row.in  { background: #f0fdf4; border-color: #bbf7d0; }
  .cb-row.out { background: #fef2f2; border-color: #fecaca; }

  /* mode toggle */
  .cb-mode {
    display: flex; border-radius: 6px; overflow: hidden;
    border: 1px solid #e5e7eb; background: #fff; height: 34px;
  }
  .cb-mode-btn {
    flex: 1; display: flex; align-items: center; justify-content: center;
    gap: 4px; font-size: 11.5px; font-weight: 600; cursor: pointer;
    border: none; background: transparent; font-family: 'DM Sans', sans-serif;
    color: #9ca3af; transition: all .1s;
  }
  .cb-mode-btn.in-on  { background: #15803d; color: #fff; }
  .cb-mode-btn.out-on { background: #dc2626; color: #fff; }

  /* add row btn */
  .cb-add-row {
    width: 100%; padding: 8px 0;
    border: 1px dashed #d1d5db; border-radius: 7px;
    background: transparent; color: #6b7280;
    font-size: 12.5px; font-weight: 500;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    transition: background .1s, border-color .1s;
  }
  .cb-add-row:hover { background: #f9fafb; border-color: #9ca3af; }

  /* save btn */
  .cb-save {
    padding: 9px 22px; border-radius: 7px; border: none;
    background: #111827; color: #fff; font-size: 13px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    display: inline-flex; align-items: center; gap: 7px;
    transition: background .12s;
  }
  .cb-save:hover:not(:disabled) { background: #1f2937; }
  .cb-save:disabled { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; }

  @keyframes cb-spin { to { transform: rotate(360deg); } }
  .cb-spin { display: inline-block; animation: cb-spin .8s linear infinite; }
`;

function SearchableAccountSelect({ accounts, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);
  const containerRef = useRef(null);
  const filtered = accounts.filter(a => a.accountName.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (open && searchRef.current) setTimeout(() => searchRef.current?.focus(), 0);
  }, [open]);
  useEffect(() => {
    const h = e => { if (containerRef.current && !containerRef.current.contains(e.target)) { setOpen(false); setQuery(""); } };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div style={{ position:"relative" }} ref={containerRef}>
      <button type="button" onClick={()=>setOpen(o=>!o)}
        className={`cb-sd-btn${value?" sel":""}${open?" open":""}`}>
        <span style={{ flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", textAlign:"left" }}>
          {value || "Select account…"}
        </span>
        <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2.5}
          style={{ flexShrink:0, transform:open?"rotate(180deg)":"none", transition:".15s" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <div className="cb-sd-panel">
          <div style={{ padding:6, borderBottom:"1px solid #f3f4f6", background:"#f9fafb" }}>
            <input ref={searchRef} type="text" value={query} onChange={e=>setQuery(e.target.value)}
              placeholder="Search accounts…"
              style={{ width:"100%", padding:"6px 9px", border:"1px solid #e5e7eb", borderRadius:5, fontSize:12.5, outline:"none", fontFamily:"'DM Sans',sans-serif" }}/>
          </div>
          <ul style={{ maxHeight:200, overflowY:"auto", margin:0, padding:0, listStyle:"none" }}>
            {filtered.length===0
              ? <li style={{ padding:"8px 11px", fontSize:12.5, color:"#9ca3af", textAlign:"center" }}>No results</li>
              : filtered.map(a=>(
                <li key={a._id}
                  className={`cb-sd-item${value===a.accountName?" sel":""}`}
                  onClick={()=>{onChange(a.accountName);setOpen(false);setQuery("");}}>
                  {a.accountName}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const newEntry = () => ({ account:"", description:"", amount:"", mode:"debit" });
const fmtN = n => Number(n||0).toLocaleString("en-PK");

export default function CashbookForm() {
  const [accounts,         setAccounts]         = useState([]);
  const [openingRequired,  setOpeningRequired]  = useState(null);
  const [openingBalance,   setOpeningBalance]   = useState(0);
  const [currentBalance,   setCurrentBalance]   = useState(0);
  const [cashAccountId,    setCashAccountId]    = useState(localStorage.getItem("cashAccountId")||"");
  const [notification,     setNotification]     = useState({ message:"", type:"info" });
  const [saving,           setSaving]           = useState(false);
  const [date,             setDate]             = useState(new Date().toISOString().slice(0,10));
  const [entries,          setEntries]          = useState([newEntry()]);
  const [comment,          setComment]          = useState("");

  useEffect(() => { fetchAccounts(); checkCashbook(); }, []);

  const fetchAccounts = async () => {
    try {
      const res  = await authFetch(`${API_BASE_URL}/accounts`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message||"Failed to fetch accounts");
      setAccounts(Array.isArray(data)?data.filter(a=>!a.isProtected):[]);
    } catch(err) { setNotification({message:err.message,type:"error"}); }
  };

  const checkCashbook = async () => {
    try {
      const res  = await authFetch(`${API_BASE_URL}/cashbook-report`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message||"Failed to load cashbook");
      const year = new Date().getFullYear();
      const cb   = data.cashbooks?.find(c=>c.year===year);
      if (cb) {
        setOpeningBalance(cb.openingBalance);
        setCurrentBalance(data.currentBalance??cb.openingBalance);
        if (data.cashAccountId) { localStorage.setItem("cashAccountId",data.cashAccountId); setCashAccountId(data.cashAccountId); }
        setOpeningRequired(false);
      } else {
        if (data.cashAccountId) { localStorage.setItem("cashAccountId",data.cashAccountId); setCashAccountId(data.cashAccountId); }
        setOpeningRequired(true);
      }
    } catch(err) { setNotification({message:err.message,type:"error"}); setOpeningRequired(true); }
  };

  const updateEntry = (idx,field,val) => setEntries(prev=>prev.map((e,i)=>i===idx?{...e,[field]:val}:e));
  const removeEntry = idx => { if(entries.length===1)return; setEntries(prev=>prev.filter((_,i)=>i!==idx)); };

  const projectedBalance = entries.reduce((bal,e) => {
    const amt = Number(e.amount)||0;
    return e.mode==="debit" ? bal+amt : bal-amt;
  }, currentBalance);

  const diff = projectedBalance - currentBalance;
  const hasProjected = entries.some(e=>Number(e.amount)>0);

  const handleSave = async () => {
    for (let i=0;i<entries.length;i++) {
      const e=entries[i];
      if(!e.account) { setNotification({message:`Entry ${i+1}: Select a counter account.`,type:"error"}); return; }
      if(!Number(e.amount)||Number(e.amount)<=0) { setNotification({message:`Entry ${i+1}: Enter a valid amount.`,type:"error"}); return; }
    }
    let CASH_ID = cashAccountId||localStorage.getItem("cashAccountId")||"";
    if (!CASH_ID) {
      try {
        const r=await authFetch(`${API_BASE_URL}/cashbook-report`);
        const d=await r.json();
        if(d.cashAccountId){CASH_ID=d.cashAccountId;setCashAccountId(d.cashAccountId);localStorage.setItem("cashAccountId",d.cashAccountId);}
      } catch {}
    }
    if (!CASH_ID) { setNotification({message:"CASH IN HAND account not found. Please reload.",type:"error"}); return; }
    setSaving(true);
    let successCount=0, newBalance=currentBalance;
    for (const e of entries) {
      const acc=accounts.find(a=>a.accountName===e.account);
      if(!acc)continue;
      const amt=Number(e.amount);
      const payload = e.mode==="debit"
        ? { entryDate:date, comments:comment, debitAccount:CASH_ID, debitAmount:amt, debitLineDesc:e.description||"Cash Received", creditEntries:[{account:acc._id,amount:amt,description:e.description||"Cash Received"}], cashAccountId:CASH_ID }
        : { entryDate:date, comments:comment, debitAccount:acc._id, debitAmount:amt, debitLineDesc:e.description||"Cash Payment", creditEntries:[{account:CASH_ID,amount:amt,description:e.description||"Cash Payment"}], cashAccountId:CASH_ID };
      try {
        const res=await authFetch(`${API_BASE_URL}/create-journal-entry`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
        const data=await res.json();
        if(!res.ok){setNotification({message:`Entry failed: ${data.message}`,type:"error"});setSaving(false);return;}
        if(data.currentBalance!==undefined)newBalance=data.currentBalance;
        successCount++;
      } catch(err){setNotification({message:err.message,type:"error"});setSaving(false);return;}
    }
    setCurrentBalance(newBalance);
    setEntries([newEntry()]);
    setComment("");
    setNotification({message:`${successCount} entr${successCount===1?"y":"ies"} saved!`,type:"success"});
    setSaving(false);
  };

  if (openingRequired===null) {
    return (
      <SidebarLayout>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:200, color:"#9ca3af", fontSize:13, gap:10, fontFamily:"'DM Sans',sans-serif" }}>
          <svg style={{ animation:"cb-spin .8s linear infinite", display:"inline-block" }} width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <style>{`@keyframes cb-spin{to{transform:rotate(360deg)}}`}</style>
          Loading cashbook…
        </div>
      </SidebarLayout>
    );
  }

  if (openingRequired) {
    return (
      <SidebarLayout>
        <style>{FONTS}{CSS}</style>
        <div className="cb" style={{ maxWidth:440, margin:"60px auto" }}>
          <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:10, padding:"28px 28px 24px", boxShadow:"0 4px 16px rgba(0,0,0,.06)" }}>
            <div style={{ width:48, height:48, background:"#fefce8", border:"1px solid #fde68a", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", fontSize:22 }}>📅</div>
            <h1 style={{ fontSize:16, fontWeight:700, color:"#111827", textAlign:"center", margin:"0 0 8px" }}>No Active Season</h1>
            <p style={{ fontSize:13, color:"#6b7280", textAlign:"center", lineHeight:1.6, margin:"0 0 18px" }}>
              Create and activate a season in Profile → Seasons first.<br/>
              This sets the opening balance for your CASH IN HAND account.
            </p>
            <div style={{ background:"#f0f9ff", border:"1px solid #bae6fd", borderRadius:7, padding:"12px 14px", fontSize:12.5, color:"#0369a1", lineHeight:1.8, marginBottom:18 }}>
              <p style={{ fontWeight:600, margin:"0 0 4px" }}>How to set up:</p>
              <p style={{ margin:0 }}>1. Go to <strong>Profile → Seasons</strong><br/>
              2. Click <strong>+ New Season</strong>, set dates + opening balance<br/>
              3. Click <strong>Activate</strong><br/>
              4. Come back here to record entries</p>
            </div>
            <a href="/profile" style={{ display:"block", width:"100%", padding:"9px 0", borderRadius:7, background:"#111827", color:"#fff", fontSize:13, fontWeight:600, textAlign:"center", textDecoration:"none", transition:"background .12s" }}>
              Go to Profile → Seasons →
            </a>
          </div>
        </div>
        <Notification message={notification.message} type={notification.type} onClose={()=>setNotification({message:"",type:"info"})}/>
      </SidebarLayout>
    );
  }

  const colLbl = { fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af" };

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <div className="cb" style={{ maxWidth:960, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom:16 }}>
          <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 3px" }}>Finance</p>
          <h1 style={{ margin:0, fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px" }}>Cashbook Entries</h1>
        </div>

        {/* Stat cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:16 }}>
          <div className="cb-stat s-open">
            <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", margin:"0 0 5px" }}>Opening Balance</p>
            <p className="cb-mono" style={{ fontSize:18, fontWeight:700, color:"#374151", margin:0 }}>Rs {fmtN(openingBalance)}</p>
          </div>
          <div className="cb-stat s-curr">
            <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", margin:"0 0 5px" }}>Current Balance</p>
            <p className="cb-mono" style={{ fontSize:18, fontWeight:700, color:"#111827", margin:0 }}>Rs {fmtN(currentBalance)}</p>
          </div>
          <div className={`cb-stat ${hasProjected ? (diff>=0?"s-after":"s-neg") : "s-open"}`}>
            <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", margin:"0 0 5px" }}>After Save</p>
            <p className="cb-mono" style={{ fontSize:18, fontWeight:700, color:hasProjected?(diff>=0?"#15803d":"#dc2626"):"#9ca3af", margin:0 }}>
              {hasProjected ? `Rs ${fmtN(projectedBalance)}` : "—"}
            </p>
            {hasProjected && (
              <p style={{ fontSize:11, color:diff>=0?"#15803d":"#dc2626", marginTop:3 }}>
                {diff>=0?"+":""}{fmtN(diff)} net change
              </p>
            )}
          </div>
        </div>

        {/* Form card */}
        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, overflow:"hidden" }}>
          {/* Card header */}
          <div style={{ padding:"12px 16px", borderBottom:"1px solid #e5e7eb", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <p style={{ fontSize:13.5, fontWeight:700, color:"#111827", margin:0 }}>Record Entries</p>
              <p style={{ fontSize:11, color:"#9ca3af", margin:"2px 0 0" }}>Each line saves as an individual journal entry</p>
            </div>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)}
              style={{ border:"1px solid #d1d5db", borderRadius:6, padding:"6px 9px", fontSize:12.5, outline:"none", fontFamily:"'DM Sans',sans-serif", color:"#111827" }}/>
          </div>

          <div style={{ padding:"14px 16px", display:"flex", flexDirection:"column", gap:8 }}>
            {/* Column headers */}
            <div style={{ display:"grid", gridTemplateColumns:"120px 1fr 1fr 120px 32px", gap:8, padding:"0 2px" }}>
              <span style={colLbl}>Type</span>
              <span style={colLbl}>Counter Account</span>
              <span style={colLbl}>Description</span>
              <span style={colLbl}>Amount (Rs)</span>
              <span/>
            </div>

            {/* Entry rows */}
            {entries.map((entry,idx)=>(
              <div key={idx} className={`cb-row${entry.mode==="debit"?" in":" out"}`}>
                {/* Mode toggle */}
                <div className="cb-mode">
                  <button type="button" onClick={()=>updateEntry(idx,"mode","debit")}
                    className={`cb-mode-btn${entry.mode==="debit"?" in-on":""}`}>
                    <svg width={8} height={8} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/>
                    </svg>
                    Cash In
                  </button>
                  <button type="button" onClick={()=>updateEntry(idx,"mode","credit")}
                    className={`cb-mode-btn${entry.mode==="credit"?" out-on":""}`}>
                    <svg width={8} height={8} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                    </svg>
                    Cash Out
                  </button>
                </div>

                {/* Account */}
                <SearchableAccountSelect accounts={accounts} value={entry.account}
                  onChange={val=>updateEntry(idx,"account",val)}/>

                {/* Description */}
                <input type="text" placeholder="Description (optional)"
                  value={entry.description}
                  onChange={e=>updateEntry(idx,"description",e.target.value)}
                  className="cb-inp" style={{ fontSize:13 }}/>

                {/* Amount */}
                <input type="number" min="0" placeholder="0"
                  value={entry.amount}
                  onChange={e=>updateEntry(idx,"amount",e.target.value)}
                  style={{
                    width:"100%", padding:"7px 10px", border:`1px solid ${entry.mode==="debit"?"#bbf7d0":"#fecaca"}`,
                    borderRadius:6, fontSize:13, fontFamily:"'DM Mono',monospace", fontWeight:600, outline:"none",
                    color:entry.mode==="debit"?"#15803d":"#dc2626", background:"#fff",
                    transition:"border-color .12s",
                  }}/>

                {/* Remove */}
                <button type="button" onClick={()=>removeEntry(idx)} disabled={entries.length===1}
                  style={{ width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:6, border:"1px solid #e5e7eb", background:"#fff", color:"#9ca3af", cursor:entries.length===1?"not-allowed":"pointer", opacity:entries.length===1?.3:1, transition:"all .1s" }}
                  onMouseEnter={e=>{ if(entries.length>1){e.currentTarget.style.background="#fef2f2";e.currentTarget.style.color="#dc2626";} }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="#fff";e.currentTarget.style.color="#9ca3af"; }}>
                  <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            ))}

            {/* Add row */}
            <button type="button" onClick={()=>setEntries(p=>[...p,newEntry()])} className="cb-add-row">
              <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
              </svg>
              Add Another Entry
            </button>

            {/* Comments */}
            <input type="text" placeholder="Remarks / comments (optional, applies to all entries)"
              value={comment} onChange={e=>setComment(e.target.value)}
              className="cb-inp" style={{ fontSize:13 }}/>

            {/* Entry summary chips */}
            {entries.some(e=>Number(e.amount)>0) && (
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {entries.filter(e=>Number(e.amount)>0).map((e,i)=>(
                  <span key={i} style={{
                    display:"inline-flex", alignItems:"center", gap:5, padding:"3px 9px",
                    borderRadius:4, fontSize:11.5, fontWeight:600,
                    background:e.mode==="debit"?"#f0fdf4":"#fef2f2",
                    color:e.mode==="debit"?"#15803d":"#dc2626",
                    border:`1px solid ${e.mode==="debit"?"#bbf7d0":"#fecaca"}`,
                  }}>
                    {e.mode==="debit"?"▲":"▼"} {e.account||"…"} · Rs {Number(e.amount).toLocaleString()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ padding:"11px 16px", borderTop:"1px solid #f3f4f6", background:"#f9fafb", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <p style={{ fontSize:12.5, color:"#6b7280", margin:0 }}>
              <span style={{ fontWeight:600, color:"#111827" }}>{entries.length}</span> entr{entries.length===1?"y":"ies"} — saved individually
            </p>
            <button type="button" onClick={handleSave} disabled={saving} className="cb-save">
              {saving
                ? <><span className="cb-spin"><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg></span> Saving…</>
                : <><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Save {entries.length>1?`${entries.length} Entries`:"Entry"}</>
              }
            </button>
          </div>
        </div>

        <Notification message={notification.message} type={notification.type} onClose={()=>setNotification({message:"",type:"info"})}/>
      </div>
    </SidebarLayout>
  );
}