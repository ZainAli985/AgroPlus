import React, { useEffect, useState, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import JournalNav from "../layout/JournalTopNav.jsx";
import { authFetch } from "../../utils/authFetch.js";

// ── Google Fonts injection ────────────────────────────────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

// ── Design tokens + utility classes ──────────────────────────────────────────
const CSS = `
:root {
  --ink:          #0B0C0D;
  --ink-2:        #212A37;
  --ink-3:        #6E7170;
  --ink-4:        #A5A8A6;
  --surface:      #ffffff;
  --surface-2:    #F5F5F5;
  --surface-3:    #ECECEC;
  --border:       #e4e7ed;
  --border-2:     #d0d5de;
  --debit:        #212A37;
  --debit-bg:     #F5F5F5;
  --debit-border: #DADADA;
  --credit:       #C9A85A;
  --credit-bg:    rgba(201,168,90,.08);
  --credit-border:rgba(201,168,90,.3);
  --danger:       #dc2626;
  --danger-bg:    #fef2f2;
}
* { box-sizing: border-box; }

/* number input — hide spinners */
.gj-input[type=number] { -moz-appearance: textfield; }
.gj-input[type=number]::-webkit-outer-spin-button,
.gj-input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }

/* base input */
.gj-input {
  width: 100%; border: 1.5px solid var(--border); border-radius: 10px;
  padding: 9px 13px; font-size: 13.5px; font-family: 'DM Sans', sans-serif;
  color: var(--ink); background: var(--surface); outline: none;
  transition: border-color .15s, box-shadow .15s;
}
.gj-input::placeholder { color: var(--ink-4); }
.gj-input:focus {
  border-color: var(--debit);
  box-shadow: 0 0 0 3px rgba(29,78,216,.1);
}
.gj-input.credit:focus {
  border-color: var(--credit);
  box-shadow: 0 0 0 3px rgba(201,168,90,.12);
}
.gj-input.mono { font-family: 'DM Mono', monospace; font-size: 13px; letter-spacing: -.2px; }

/* dropdown trigger button */
.gj-btn {
  width: 100%; text-align: left; border: 1.5px solid var(--border);
  border-radius: 10px; padding: 9px 13px; background: var(--surface);
  font-size: 13.5px; font-family: 'DM Sans', sans-serif; color: var(--ink);
  cursor: pointer; outline: none;
  display: flex; justify-content: space-between; align-items: center;
  transition: border-color .15s, box-shadow .15s;
}
.gj-btn:hover  { border-color: var(--border-2); }
.gj-btn:focus,
.gj-btn.open   { border-color: var(--debit); box-shadow: 0 0 0 3px rgba(29,78,216,.1); }
.gj-btn.credit:focus,
.gj-btn.credit.open { border-color: var(--credit); box-shadow: 0 0 0 3px rgba(201,168,90,.12); }

/* dropdown panel */
.gj-panel {
  position: absolute; z-index: 50; top: calc(100% + 5px); left: 0; right: 0;
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: 12px; box-shadow: 0 12px 32px rgba(15,17,23,.12), 0 4px 8px rgba(15,17,23,.06);
  max-height: 240px; overflow-y: auto;
}
.gj-panel::-webkit-scrollbar { width: 3px; }
.gj-panel::-webkit-scrollbar-thumb { background: var(--border-2); border-radius: 3px; }

.gj-search {
  width: 100%; border: none; border-bottom: 1.5px solid var(--border);
  padding: 10px 14px; font-size: 13px; font-family: 'DM Sans', sans-serif;
  outline: none; background: var(--surface); color: var(--ink);
  position: sticky; top: 0; border-radius: 12px 12px 0 0;
}
.gj-item {
  padding: 9px 14px; font-size: 13px; cursor: pointer;
  display: flex; align-items: center; gap: 8px; color: var(--ink-2);
  transition: background .1s;
}
.gj-item:hover           { background: var(--surface-2); }
.gj-item.hi-debit        { background: var(--debit-bg); color: var(--debit); font-weight: 600; }
.gj-item.hi-credit       { background: var(--credit-bg); color: var(--credit); font-weight: 600; }

/* animations */
@keyframes fadeUp   { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:translateY(0); } }
@keyframes rowIn    { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }
@keyframes chipPop  { from { opacity:0; transform:scale(.92); } to { opacity:1; transform:scale(1); } }
.anim-fadeup  { animation: fadeUp  .18s ease-out; }
.anim-rowin   { animation: rowIn   .2s  ease-out; }
.anim-chippop { animation: chipPop .16s ease-out; }
`;

// ── Tiny icon components ──────────────────────────────────────────────────────
const ChevronDown = ({ color = "var(--ink-4)" }) => (
  <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
  </svg>
);
const CheckIcon = () => (
  <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
  </svg>
);
const TrashIcon = () => (
  <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
  </svg>
);
const PlusIcon = () => (
  <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
  </svg>
);
const CalIcon = () => (
  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="var(--ink-3)" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
  </svg>
);

// ── Label ────────────────────────────────────────────────────────────────────
function FieldLabel({ text, required, dim }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:7 }}>
      <span style={{ fontSize:11, fontWeight:700, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".065em", fontFamily:"DM Sans,sans-serif" }}>
        {text}
      </span>
      {required && <span style={{ fontSize:11, color:"var(--danger)" }}>*</span>}
      {dim && <span style={{ fontSize:10.5, color:"var(--ink-4)", fontStyle:"italic" }}>{dim}</span>}
    </div>
  );
}

// ── Section card ─────────────────────────────────────────────────────────────
function SectionCard({ accent = "debit", title, badge, children }) {
  const d = accent === "debit";
  return (
    <div style={{
      border: `1.5px solid ${d ? "var(--debit-border)" : "var(--credit-border)"}`,
      borderRadius: 16, background: "var(--surface)", overflow: "visible",
    }}>
      <div style={{
        background: d ? "var(--debit-bg)" : "var(--credit-bg)",
        borderBottom: `1.5px solid ${d ? "var(--debit-border)" : "var(--credit-border)"}`,
        padding: "11px 22px", borderRadius: "14px 14px 0 0",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background: d ? "var(--debit)" : "var(--credit)" }} />
          <span style={{
            fontSize:11, fontWeight:700, letterSpacing:".09em", textTransform:"uppercase",
            color: d ? "var(--debit)" : "var(--credit)", fontFamily:"DM Sans,sans-serif",
          }}>{title}</span>
        </div>
        {badge != null && (
          <span style={{
            fontSize:10.5, fontWeight:600, padding:"2px 9px", borderRadius:20,
            fontFamily:"'DM Mono',monospace",
            background: d ? "#dbeafe" : "#d1fae5",
            color: d ? "var(--debit)" : "var(--credit)",
          }}>{badge}</span>
        )}
      </div>
      <div style={{ padding:"20px 22px" }}>{children}</div>
    </div>
  );
}

// ── Grid column headers ───────────────────────────────────────────────────────
function GridHeaders({ accent }) {
  const c = accent === "debit" ? "var(--debit)" : "var(--credit)";
  const s = { fontSize:10.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:c, opacity:.65, fontFamily:"DM Sans,sans-serif" };
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:8, paddingLeft: accent === "credit" && "0" }}>
      <span style={s}>Account <span style={{ color:"var(--danger)" }}>*</span></span>
      <span style={s}>Amount <span style={{ color:"var(--danger)" }}>*</span></span>
      <span style={s}>Line Description</span>
    </div>
  );
}

// ── Type badge ────────────────────────────────────────────────────────────────
function TypeBadge({ text }) {
  return (
    <span style={{
      fontSize:10.5, color:"var(--ink-4)", fontFamily:"'DM Mono',monospace",
      background:"var(--surface-3)", padding:"1px 6px", borderRadius:4, flexShrink:0,
    }}>{text}</span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// Flow: Date → Debit Acct DD → Debit Amt → Debit Desc
//       → Credit Acct DD → Credit Amt → Credit Desc
//       → (balanced) Comments  |  (unbalanced) new credit row
// ─────────────────────────────────────────────────────────────────────────────
export default function GeneralJournalEntry() {

  // ── Refs ───────────────────────────────────────────────────────────────────
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
  const deleteButtonRefs        = useRef([]);

  // ── State ──────────────────────────────────────────────────────────────────
  const [accounts,            setAccounts]            = useState([]);
  const [debitAccount,        setDebitAccount]        = useState("");
  const [debitSearch,         setDebitSearch]         = useState("");
  const [debitDropdownOpen,   setDebitDropdownOpen]   = useState(false);
  const [debitActiveIndex,    setDebitActiveIndex]    = useState(0);
  const [creditActiveIndexes, setCreditActiveIndexes] = useState({});
  const [debitAmount,         setDebitAmount]         = useState("");
  const [debitLineDesc,       setDebitLineDesc]       = useState("");
  const [comments,            setComments]            = useState("");
  const [entryDate,           setEntryDate]           = useState(() => new Date().toISOString().split("T")[0]);
  const [creditEntries,       setCreditEntries]       = useState([
    { account:"", amount:"", lineDesc:"", search:"", open:false, isNew:false },
  ]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType,    setNotificationType]    = useState("");
  const [bulkFile,            setBulkFile]            = useState(null);

  // ── Derived ────────────────────────────────────────────────────────────────
  const totalCredit  = creditEntries.reduce((s,c) => s+(parseFloat(String(c.amount).trim())||0), 0);
  const debitNumeric = parseFloat(String(debitAmount).trim()) || 0;
  const diff         = debitNumeric - totalCredit;
  const balanced     = debitNumeric > 0 && Math.abs(diff) <= 0.001;

  // ── Utility ────────────────────────────────────────────────────────────────
  const notify = (msg, type="info") => {
    setNotificationMessage(""); setTimeout(() => { setNotificationMessage(msg); setNotificationType(type); }, 20);
  };
  const fmtDate = (v) => {
    const d = v.replace(/\D/g,"");
    if (d.length<=4) return d;
    if (d.length<=6) return `${d.slice(0,4)}-${d.slice(4)}`;
    return `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}`;
  };
  const fmtAmt = (n) => n.toLocaleString("en-PK",{ minimumFractionDigits:2, maximumFractionDigits:2 });
  const filterAccounts = (q) =>
    accounts
      .filter(a => a.accountName.toLowerCase().includes(q.toLowerCase()) || a.accountType.toLowerCase().includes(q.toLowerCase()))
      .sort((a,b)=>(b.starred?1:0)-(a.starred?1:0));

  // ── Dropdown logic ─────────────────────────────────────────────────────────
  const openDebitDD = () => {
    setCreditEntries(prev=>prev.map(e=>({...e,open:false})));
    setDebitDropdownOpen(true); setDebitSearch(""); setDebitActiveIndex(0);
    setTimeout(()=>debitSearchRef.current?.focus(),0);
  };
  const openCreditDD = (index) => {
    setDebitDropdownOpen(false);
    setCreditEntries(prev=>prev.map((e,i)=>({...e,open:i===index})));
    setCreditActiveIndexes(p=>({...p,[index]:0}));
    setTimeout(()=>creditSearchRefs.current[index]?.focus(),0);
  };
  const closeCreditDD = (index) =>
    setCreditEntries(prev=>prev.map((e,i)=>i===index?{...e,open:false}:e));
  const selectCreditAccount = (index, accId) => {
    setCreditEntries(prev=>prev.map((e,i)=>i===index?{...e,account:accId,search:"",open:false}:e));
    setTimeout(()=>creditAmountRefs.current[index]?.focus(),0);
  };

  // ── Credit row helpers ─────────────────────────────────────────────────────
  const creditChange = (index, field, value) =>
    setCreditEntries(prev=>{ const c=[...prev]; c[index]={...c[index],[field]:value}; return c; });
  const deleteCreditRow = (index) => {
    if (creditEntries.length===1) { notify("At least one credit entry is required!","warning"); return; }
    setCreditEntries(prev=>prev.filter((_,i)=>i!==index));
  };
  const addCreditRow = (prefillAccount="") => {
    const newIdx = creditEntries.length;
    setCreditEntries(prev=>[...prev,{account:prefillAccount,amount:"",lineDesc:"",search:"",open:false,isNew:true}]);
    setTimeout(()=>openCreditDD(newIdx),0);
  };

  // ── Data fetch ─────────────────────────────────────────────────────────────
  useEffect(()=>{
    (async()=>{
      try {
        const res=await authFetch(`${API_BASE_URL}/accounts`);
        const data=await res.json();
        if(res.ok) setAccounts(data); else notify("Failed to fetch accounts","error");
      } catch { notify("Error fetching accounts","error"); }
    })();
  },[]);
  useEffect(()=>{ setTimeout(()=>dateRef.current?.focus(),150); },[]);

  // ── Reset ──────────────────────────────────────────────────────────────────
  const resetForm = () => {
    setDebitAccount(""); setDebitAmount(""); setDebitLineDesc(""); setComments("");
    setCreditEntries([{account:"",amount:"",lineDesc:"",search:"",open:false,isNew:false}]);
    creditAccountButtonRefs.current=[]; creditAmountRefs.current=[];
    creditSearchRefs.current=[]; creditDescRefs.current=[]; deleteButtonRefs.current=[];
    setTimeout(()=>dateRef.current?.focus(),100);
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (!debitAccount||!String(debitAmount).trim()||!debitLineDesc.trim()) {
      notify("Please fill all required fields","warning"); return;
    }
    const debit = parseFloat(String(debitAmount).trim())||0;
    if (Math.abs(debit-totalCredit)>0.001) { notify("Debit and Credit must be equal!","error"); return; }
    for (const c of creditEntries) {
      if (!c.account||!String(c.amount).trim()||!c.lineDesc?.trim()) { notify("Please fill all required credit fields","warning"); return; }
      if (parseFloat(String(c.amount))<=0) { notify("Credit amounts must be > 0","warning"); return; }
    }
    try {
      const res = await authFetch(`${API_BASE_URL}/create-journal-entry`,{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          description:debitLineDesc, debitLineDesc, debitAccount, debitAmount:debit,
          creditEntries:creditEntries.map(c=>({account:c.account,amount:parseFloat(String(c.amount)),description:c.lineDesc||""})),
          comments, entryDate,
        }),
      });
      const data=await res.json();
      if(res.ok) { notify(data.message||"Journal entry created!","success"); resetForm(); }
      else throw new Error(data?.message||"Failed");
    } catch(err) { notify(err.message||"Server error","error"); }
  };

  // ── Bulk upload ────────────────────────────────────────────────────────────
  useEffect(()=>{
    if (!bulkFile) return;
    (async()=>{
      const fd=new FormData(); fd.append("file",bulkFile);
      try {
        const res=await authFetch(`${API_BASE_URL}/bulk-upload-journal-entries`,{method:"POST",body:fd});
        const data=await res.json();
        if(!res.ok) throw new Error(data.message||"Upload failed");
        notify(data.message,"success");
        if(data.failedRows?.length) notify("Some rows failed:\n"+data.failedRows.map(r=>`Row ${r.row}: ${r.error}`).join("\n"),"warning");
        setBulkFile(null);
      } catch(err) { notify(err.message,"error"); }
    })();
  },[bulkFile]);

  // ── Global shortcuts ───────────────────────────────────────────────────────
  useEffect(()=>{
    const h=(e)=>{
      const cmd=e.ctrlKey||e.metaKey;
      if(cmd&&e.shiftKey&&e.key==="D"){
        e.preventDefault();
        debitDropdownOpen?(setDebitDropdownOpen(false),debitAccountButtonRef.current?.focus()):openDebitDD();
      }
      if(cmd&&e.shiftKey&&e.key==="C"){
        e.preventDefault();
        const any=creditEntries.some(c=>c.open);
        if(any){setCreditEntries(prev=>prev.map(e=>({...e,open:false})));creditAccountButtonRefs.current[0]?.focus();}
        else openCreditDD(0);
      }
    };
    window.addEventListener("keydown",h);
    return()=>window.removeEventListener("keydown",h);
  },[debitDropdownOpen,creditEntries]);

  // ── Click-outside ──────────────────────────────────────────────────────────
  useEffect(()=>{
    const h=(e)=>{
      if(debitListRef.current&&!debitListRef.current.contains(e.target)&&
         debitAccountButtonRef.current&&!debitAccountButtonRef.current.contains(e.target))
        setDebitDropdownOpen(false);
      creditListRefs.current.forEach((ref,i)=>{
        if(ref&&!ref.contains(e.target)&&creditAccountButtonRefs.current[i]&&!creditAccountButtonRefs.current[i].contains(e.target))
          setCreditEntries(prev=>prev.map((entry,idx)=>idx===i?{...entry,open:false}:entry));
      });
    };
    document.addEventListener("mousedown",h);
    return()=>document.removeEventListener("mousedown",h);
  },[creditEntries]);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <JournalNav />

      <div style={{ maxWidth:920, margin:"0 auto", paddingBottom:80, fontFamily:"DM Sans,sans-serif" }}>

        {/* ── Page header ── */}
        <div style={{ marginBottom:28 }}>
          {/* Breadcrumb */}
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
            <span style={{ fontSize:11, fontWeight:600, color:"var(--ink-4)", textTransform:"uppercase", letterSpacing:".1em" }}>Accounts</span>
            <span style={{ color:"var(--border-2)", fontSize:12 }}>›</span>
            <span style={{ fontSize:11, fontWeight:600, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".1em" }}>Journal Entry</span>
          </div>
          <h1 style={{
            margin:0, fontSize:27, fontWeight:700, color:"var(--ink)",
            fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", letterSpacing:"-.3px",
          }}>New Journal Entry</h1>

          {/* Keyboard hints */}
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:12, marginTop:12 }}>
            {[["Ctrl+Shift+D","Debit"],["Ctrl+Shift+C","Credit"],["Enter","Advance"],["↑↓","Navigate"],["Esc","Default account"]].map(([k,d])=>(
              <div key={k} style={{ display:"flex", alignItems:"center", gap:5 }}>
                <kbd style={{
                  background:"var(--surface-3)", border:"1px solid var(--border-2)", borderRadius:5,
                  padding:"2px 7px", fontSize:10, fontFamily:"'DM Mono',monospace",
                  color:"var(--ink-2)", boxShadow:"0 1px 0 var(--border-2)",
                }}>{k}</kbd>
                <span style={{ fontSize:11, color:"var(--ink-4)" }}>{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Topbar: Date + Balance ── */}
        <div style={{
          display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between",
          gap:12, marginBottom:18,
          background:"var(--surface)", border:"1.5px solid var(--border)",
          borderRadius:14, padding:"13px 18px",
          boxShadow:"0 1px 3px rgba(15,17,23,.05)",
        }}>
          {/* Date */}
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <CalIcon />
            <span style={{ fontSize:11, fontWeight:700, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".07em" }}>Date</span>
            <input
              ref={dateRef}
              type="text"
              value={entryDate}
              onChange={(e)=>setEntryDate(fmtDate(e.target.value))}
              placeholder="YYYY-MM-DD"
              maxLength={10}
              className="gj-input mono"
              style={{ width:118, padding:"6px 11px" }}
              onKeyDown={(e)=>{ if(e.key==="Enter"){e.preventDefault();openDebitDD();} }}
            />
          </div>

          {/* Balance */}
          <div style={{ display:"flex", alignItems:"center", gap:0 }}>
            {[
              { label:"DR", val:debitNumeric, color:"var(--debit)" },
              { label:"CR", val:totalCredit,  color:"var(--credit)" },
            ].map(({ label, val, color }, i) => (
              <React.Fragment key={label}>
                {i>0 && <div style={{ width:1, height:30, background:"var(--border)" }} />}
                <div style={{ padding:"0 20px", textAlign:"center" }}>
                  <div style={{ fontSize:10, fontWeight:700, color:"var(--ink-4)", textTransform:"uppercase", letterSpacing:".09em", marginBottom:3 }}>{label}</div>
                  <div style={{ fontSize:14.5, fontWeight:700, color, fontFamily:"'DM Mono',monospace", letterSpacing:"-.3px" }}>
                    {fmtAmt(val)}
                  </div>
                </div>
              </React.Fragment>
            ))}
            <div style={{ width:1, height:30, background:"var(--border)" }} />
            <div style={{ padding:"0 16px" }}>
              <div key={balanced?"b":`u${diff.toFixed(2)}`} className="anim-chippop">
                {balanced ? (
                  <div style={{
                    display:"flex", alignItems:"center", gap:6, padding:"5px 11px",
                    background:"#dcfce7", borderRadius:20, color:"#15803d",
                  }}>
                    <CheckIcon />
                    <span style={{ fontSize:12, fontWeight:700 }}>Balanced</span>
                  </div>
                ) : (
                  <div style={{
                    display:"flex", alignItems:"center", gap:7, padding:"5px 11px",
                    background: debitNumeric>0 ? "#fff7ed" : "var(--surface-3)",
                    borderRadius:20,
                  }}>
                    <div style={{
                      width:6, height:6, borderRadius:"50%",
                      background: debitNumeric>0 ? "#f97316" : "var(--border-2)",
                    }} />
                    <span style={{
                      fontSize:11.5, fontWeight:700, letterSpacing:"-.2px",
                      fontFamily:"'DM Mono',monospace",
                      color: debitNumeric>0 ? "#c2410c" : "var(--ink-4)",
                    }}>
                      {debitNumeric>0 ? `${diff>0?"DR ":"CR "}${fmtAmt(Math.abs(diff))}` : "—"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Main form ── */}
        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:14 }}>

          {/* ════════════ DEBIT SECTION ════════════
              Date → Debit Acct → Debit Amt → Debit Desc → (Credit Acct[0])
          ═══════════════════════════════════════════ */}
          <SectionCard title="Debit Entry" accent="debit">
            <GridHeaders accent="debit" />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>

              {/* Debit Account dropdown */}
              <div style={{ position:"relative" }}>
                <button
                  ref={debitAccountButtonRef}
                  type="button"
                  className={`gj-btn${debitDropdownOpen?" open":""}`}
                  onClick={()=>debitDropdownOpen?setDebitDropdownOpen(false):openDebitDD()}
                  onKeyDown={(e)=>{
                    if(e.key==="Enter"||e.key===" "){e.preventDefault();debitDropdownOpen?setDebitDropdownOpen(false):openDebitDD();}
                    if(e.key==="ArrowDown"){e.preventDefault();openDebitDD();}
                    if(e.key==="Escape") setDebitDropdownOpen(false);
                  }}
                >
                  <span style={{ color:debitAccount?"var(--ink)":"var(--ink-4)", fontWeight:debitAccount?500:400 }}>
                    {debitAccount?accounts.find(a=>a._id===debitAccount)?.accountName||"Select":"Select account…"}
                  </span>
                  <ChevronDown color={debitDropdownOpen?"var(--debit)":"var(--ink-4)"} />
                </button>

                {debitDropdownOpen && (
                  <div ref={debitListRef} className="gj-panel anim-fadeup">
                    <input
                      ref={debitSearchRef}
                      type="text"
                      value={debitSearch}
                      onChange={(e)=>{setDebitSearch(e.target.value);setDebitActiveIndex(0);}}
                      placeholder="Search accounts…"
                      className="gj-search"
                      onKeyDown={(e)=>{
                        const r=filterAccounts(debitSearch);
                        if(e.key==="ArrowDown"){e.preventDefault();setDebitActiveIndex(i=>Math.min(i+1,r.length-1));}
                        if(e.key==="ArrowUp"){e.preventDefault();setDebitActiveIndex(i=>Math.max(i-1,0));}
                        if(e.key==="Enter"){
                          e.preventDefault();
                          const acc=r[debitActiveIndex];
                          if(acc){setDebitAccount(acc._id);setDebitDropdownOpen(false);setDebitSearch("");setTimeout(()=>debitAmountRef.current?.focus(),0);}
                        }
                        if(e.key==="Escape"){setDebitDropdownOpen(false);debitAccountButtonRef.current?.focus();}
                        if(e.key==="Tab") setDebitDropdownOpen(false);
                      }}
                    />
                    {filterAccounts(debitSearch).map((acc,i)=>(
                      <div
                        key={acc._id}
                        className={`gj-item${i===debitActiveIndex?" hi-debit":""}`}
                        onMouseEnter={()=>setDebitActiveIndex(i)}
                        onClick={()=>{setDebitAccount(acc._id);setDebitDropdownOpen(false);setDebitSearch("");debitAmountRef.current?.focus();}}
                      >
                        {acc.starred&&<span style={{color:"#f59e0b",fontSize:11}}>★</span>}
                        <span style={{flex:1}}>{acc.accountName}</span>
                        <TypeBadge text={acc.accountType}/>
                      </div>
                    ))}
                    {filterAccounts(debitSearch).length===0&&(
                      <div style={{padding:"12px 14px",fontSize:12.5,color:"var(--ink-4)",textAlign:"center",fontStyle:"italic"}}>No accounts found</div>
                    )}
                  </div>
                )}
              </div>

              {/* Debit Amount */}
              <input
                ref={debitAmountRef}
                type="number" min="0" step="0.01"
                value={debitAmount}
                onChange={(e)=>setDebitAmount(e.target.value)}
                placeholder="0.00"
                className="gj-input mono"
                onKeyDown={(e)=>{if(e.key==="Enter"){e.preventDefault();debitDescRef.current?.focus();}}}
              />

              {/* Debit Line Desc */}
              <input
                ref={debitDescRef}
                type="text"
                value={debitLineDesc}
                onChange={(e)=>setDebitLineDesc(e.target.value)}
                placeholder="Brief narration…"
                className="gj-input"
                onKeyDown={(e)=>{if(e.key==="Enter"){e.preventDefault();openCreditDD(0);}}}
              />
            </div>
          </SectionCard>

          {/* ════════════ CREDIT SECTION ════════════
              Per row: Credit Acct → Credit Amt → Credit Desc
              Desc Enter: not-last→next acct | balanced→Comments | else→new row
          ═══════════════════════════════════════════ */}
          <SectionCard title="Credit Entries" accent="credit" badge={`${creditEntries.length} row${creditEntries.length>1?"s":""}`}>
            <GridHeaders accent="credit" />
            <div style={{ display:"flex", flexDirection:"column" }}>
              {creditEntries.map((entry,index)=>(
                <div
                  key={index}
                  className={entry.isNew?"anim-rowin":""}
                  style={{
                    display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14,
                    paddingTop:index>0?14:0, marginTop:index>0?14:0,
                    borderTop:index>0?"1.5px dashed var(--border)":"none",
                    position:"relative",
                  }}
                >
                  {/* Row number — only for multi-row */}
                  {creditEntries.length>1&&(
                    <div style={{
                      position:"absolute", top:"50%", left:-24, transform:"translateY(-50%)",
                      width:17, height:17, borderRadius:"50%",
                      background:"var(--credit-bg)", border:"1.5px solid var(--credit-border)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:9, fontWeight:700, color:"var(--credit)", fontFamily:"'DM Mono',monospace",
                    }}>{index+1}</div>
                  )}

                  {/* Credit Account */}
                  <div style={{ position:"relative" }}>
                    <button
                      ref={(el)=>(creditAccountButtonRefs.current[index]=el)}
                      type="button"
                      className={`gj-btn credit${entry.open?" open":""}`}
                      onClick={()=>entry.open?closeCreditDD(index):openCreditDD(index)}
                      onKeyDown={(e)=>{
                        if(e.key==="Enter"||e.key===" "){e.preventDefault();entry.open?closeCreditDD(index):openCreditDD(index);}
                        if(e.key==="ArrowDown"){e.preventDefault();openCreditDD(index);}
                        if(e.key==="Escape") closeCreditDD(index);
                      }}
                    >
                      <span style={{color:entry.account?"var(--ink)":"var(--ink-4)",fontWeight:entry.account?500:400}}>
                        {entry.account?accounts.find(a=>a._id===entry.account)?.accountName||"Select":"Select account…"}
                      </span>
                      <ChevronDown color={entry.open?"var(--credit)":"var(--ink-4)"}/>
                    </button>

                    {entry.open&&(
                      <div ref={(el)=>(creditListRefs.current[index]=el)} className="gj-panel anim-fadeup">
                        <input
                          ref={(el)=>(creditSearchRefs.current[index]=el)}
                          type="text"
                          value={entry.search}
                          onChange={(e)=>{creditChange(index,"search",e.target.value);setCreditActiveIndexes(p=>({...p,[index]:0}));}}
                          placeholder="Search · Esc = debit account…"
                          className="gj-search"
                          onKeyDown={(e)=>{
                            const r=filterAccounts(entry.search);
                            const active=creditActiveIndexes[index]||0;
                            if(e.key==="ArrowDown"){
                              e.preventDefault();
                              const n=Math.min(active+1,r.length-1);
                              setCreditActiveIndexes(p=>({...p,[index]:n}));
                              creditListRefs.current[index]?.children[n+1]?.scrollIntoView({block:"nearest"});
                            }
                            if(e.key==="ArrowUp"){
                              e.preventDefault();
                              const n=Math.max(active-1,0);
                              setCreditActiveIndexes(p=>({...p,[index]:n}));
                              creditListRefs.current[index]?.children[n+1]?.scrollIntoView({block:"nearest"});
                            }
                            if(e.key==="Enter"){
                              e.preventDefault();
                              const acc=r[active];
                              selectCreditAccount(index,acc?acc._id:(entry.account||debitAccount||""));
                            }
                            if(e.key==="Escape"){
                              const fb=entry.account||debitAccount||"";
                              if(!entry.account&&fb) creditChange(index,"account",fb);
                              closeCreditDD(index);
                              setTimeout(()=>creditAmountRefs.current[index]?.focus(),0);
                            }
                            if(e.key==="Tab") closeCreditDD(index);
                          }}
                        />
                        {filterAccounts(entry.search).map((acc,i)=>(
                          <div
                            key={acc._id}
                            className={`gj-item${i===(creditActiveIndexes[index]||0)?" hi-credit":""}`}
                            onMouseEnter={()=>setCreditActiveIndexes(p=>({...p,[index]:i}))}
                            onClick={()=>selectCreditAccount(index,acc._id)}
                          >
                            {acc.starred&&<span style={{color:"#f59e0b",fontSize:11}}>★</span>}
                            <span style={{flex:1}}>{acc.accountName}</span>
                            <TypeBadge text={acc.accountType}/>
                          </div>
                        ))}
                        {filterAccounts(entry.search).length===0&&(
                          <div style={{padding:"12px 14px",fontSize:12.5,color:"var(--ink-4)",textAlign:"center",fontStyle:"italic"}}>
                            No accounts · press{" "}
                            <kbd style={{background:"var(--surface-3)",border:"1px solid var(--border)",borderRadius:4,padding:"1px 5px",fontSize:10,fontFamily:"'DM Mono',monospace"}}>Esc</kbd>
                            {" "}for debit account
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Credit Amount */}
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <input
                      ref={(el)=>(creditAmountRefs.current[index]=el)}
                      type="number"
                      value={entry.amount}
                      placeholder="0.00"
                      className="gj-input credit mono"
                      style={{ flex:1 }}
                      onChange={(e)=>creditChange(index,"amount",e.target.value)}
                      onKeyDown={(e)=>{
                        if(e.key!=="Enter") return;
                        e.preventDefault();
                        if(!entry.account){openCreditDD(index);return;}
                        creditDescRefs.current[index]?.focus();
                      }}
                    />
                    {creditEntries.length>1&&(
                      <button
                        ref={(el)=>(deleteButtonRefs.current[index]=el)}
                        type="button"
                        onClick={()=>deleteCreditRow(index)}
                        onKeyDown={(e)=>{
                          if(e.key==="Enter"||e.key===" "){
                            e.preventDefault(); deleteCreditRow(index);
                            setTimeout(()=>(index>0?creditAmountRefs.current[index-1]:debitAmountRef.current)?.focus(),0);
                          }
                        }}
                        style={{
                          flexShrink:0, width:32, height:32, borderRadius:8,
                          background:"var(--danger-bg)", color:"var(--danger)",
                          border:"1.5px solid #fecaca", cursor:"pointer",
                          display:"flex", alignItems:"center", justifyContent:"center",
                          transition:"all .15s", outline:"none",
                        }}
                        onMouseEnter={e=>{e.currentTarget.style.background="#fee2e2";e.currentTarget.style.borderColor="#fca5a5";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="var(--danger-bg)";e.currentTarget.style.borderColor="#fecaca";}}
                        title="Remove row"
                      ><TrashIcon/></button>
                    )}
                  </div>

                  {/* Credit Line Desc */}
                  <input
                    ref={(el)=>(creditDescRefs.current[index]=el)}
                    type="text"
                    value={entry.lineDesc}
                    onChange={(e)=>creditChange(index,"lineDesc",e.target.value)}
                    placeholder="Brief narration…"
                    className="gj-input credit"
                    onKeyDown={(e)=>{
                      if(e.key!=="Enter") return;
                      e.preventDefault();
                      const isLastRow   = index===creditEntries.length-1;
                      const latestDebit = parseFloat(String(debitAmount).trim())||0;
                      const latestTotal = creditEntries.reduce((s,c)=>s+(parseFloat(String(c.amount).trim())||0),0);
                      const isBalanced  = latestDebit>0&&Math.abs(latestDebit-latestTotal)<=0.001;
                      if(!isLastRow)       openCreditDD(index+1);
                      else if(isBalanced)  commentsRef.current?.focus();
                      else                 addCreditRow(entry.account||debitAccount||"");
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Add credit row */}
            <button
              type="button"
              onClick={()=>addCreditRow()}
              style={{
                marginTop:16, width:"100%", padding:"9px 0",
                border:"1.5px dashed var(--credit-border)", borderRadius:10,
                background:"transparent", cursor:"pointer",
                color:"var(--credit)", fontSize:12.5, fontWeight:600,
                fontFamily:"DM Sans,sans-serif",
                display:"flex", alignItems:"center", justifyContent:"center", gap:7,
                transition:"background .15s, border-color .15s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.background="var(--credit-bg)";e.currentTarget.style.borderColor="#34d399";}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="var(--credit-border)";}}
            >
              <PlusIcon/>Add Credit Row
            </button>
          </SectionCard>

          {/* ── Comments ── */}
          <div style={{
            background:"var(--surface)", border:"1.5px solid var(--border)",
            borderRadius:14, padding:"16px 22px",
          }}>
            <FieldLabel text="Comments / Narration" dim="optional"/>
            <textarea
              ref={commentsRef}
              value={comments}
              onChange={(e)=>setComments(e.target.value)}
              rows={2}
              placeholder="Additional notes for this entry… (Enter to save · Shift+Enter for new line)"
              style={{
                width:"100%", border:"1.5px solid var(--border)", borderRadius:10,
                padding:"10px 14px", fontSize:13.5, fontFamily:"DM Sans,sans-serif",
                color:"var(--ink)", outline:"none", resize:"vertical",
                transition:"border-color .15s, box-shadow .15s",
              }}
              onFocus={e=>{e.target.style.borderColor="var(--border-2)";e.target.style.boxShadow="0 0 0 3px rgba(107,114,128,.08)";}}
              onBlur={e=>{e.target.style.borderColor="var(--border)";e.target.style.boxShadow="none";}}
              onKeyDown={(e)=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();handleSubmit(e);}}}
            />
          </div>

          {/* ── Save button ── */}
          <button
            type="submit"
            style={{
              width:"100%", padding:"13px 0", borderRadius:12, border:"none",
              cursor:balanced?"pointer":"not-allowed",
              fontSize:14, fontWeight:700, fontFamily:"DM Sans,sans-serif", letterSpacing:"-.1px",
              background: balanced
                ? "linear-gradient(135deg,#1d4ed8 0%,#2563eb 100%)"
                : "var(--surface-3)",
              color: balanced?"#fff":"var(--ink-4)",
              boxShadow: balanced
                ? "0 2px 12px rgba(29,78,216,.22),0 1px 3px rgba(29,78,216,.12)"
                : "none",
              transition:"box-shadow .2s, transform .1s",
            }}
            onMouseEnter={e=>{ if(balanced){e.currentTarget.style.boxShadow="0 6px 20px rgba(29,78,216,.3),0 2px 6px rgba(29,78,216,.18)";e.currentTarget.style.transform="translateY(-1px)";}}}
            onMouseLeave={e=>{ if(balanced){e.currentTarget.style.boxShadow="0 2px 12px rgba(29,78,216,.22),0 1px 3px rgba(29,78,216,.12)";e.currentTarget.style.transform="translateY(0)";}}}
          >
            {balanced
              ? <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <CheckIcon/>Save Journal Entry
                </span>
              : "Complete the entry to save"
            }
          </button>

        </form>
      </div>

      <Notification
        message={notificationMessage}
        type={notificationType}
        onClose={()=>setNotificationMessage("")}
      />
    </SidebarLayout>
  );
}