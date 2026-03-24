import React, { useEffect, useState, useMemo } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  :root {
    --g:   #065f46; --g-lt: #d1fae5; --g-md: #6ee7b7;
    --dk:  #1f2937; --dk2:  #374151; --dk3:  #4b5563;
    --bg:  #f9fafb; --bg2:  #f3f4f6; --bd:   #e5e7eb;
    --txt: #111827; --mid:  #6b7280; --sil:  #9ca3af;
    --wh:  #ffffff;
    --pos: #15803d; --neg: #b91c1c;
    --am:  #92400e; --am-bg: #fffbeb;
    --yw:  #e6b800;
  }

  .db *, .db *::before, .db *::after { box-sizing: border-box; }
  .db { font-family: 'DM Sans', sans-serif; color: var(--txt); max-width: 1180px; margin: 0 auto; }

  /* ── Header ── */
  .db-hdr { margin-bottom: 24px; display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
  .db-hdr-left {}
  .db-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: var(--g); margin-bottom: 4px; }
  .db-title { font-size: 22px; font-weight: 700; color: var(--txt); letter-spacing: -.4px; line-height: 1.2; }
  .db-title em { font-style: italic; color: var(--dk3); font-weight: 400; }
  .db-date { font-size: 12.5px; color: var(--mid); font-weight: 400; margin-top: 2px; }

  /* ── Section header ── */
  .db-sec {
    font-size: 9.5px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
    color: var(--sil); margin: 24px 0 12px;
    display: flex; align-items: center; gap: 10px;
  }
  .db-sec::after { content: ''; flex: 1; height: 1px; background: var(--bd); }

  /* ── Card ── */
  .db-card {
    background: var(--wh); border: 1px solid var(--bd); border-radius: 10px; padding: 18px;
    position: relative; overflow: hidden;
    transition: box-shadow .15s;
  }
  .db-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,.07); }
  .db-accent { position: absolute; top: 0; left: 0; right: 0; height: 3px; }

  /* ── Label / value ── */
  .db-lbl { font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--sil); margin-bottom: 5px; }
  .db-val { font-family: 'DM Mono', monospace; font-size: 20px; font-weight: 500; color: var(--txt); letter-spacing: -.3px; line-height: 1; }
  .db-val.pos { color: var(--pos); }
  .db-val.neg { color: var(--neg); }
  .db-val.grn { color: var(--g); }
  .db-val.dkn { color: var(--dk); }
  .db-sub { font-size: 11.5px; color: var(--sil); margin-top: 5px; }

  /* ── Period pills ── */
  .db-filter { display: flex; gap: 4px; flex-wrap: wrap; margin-top: 10px; }
  .db-fpill {
    padding: 3px 9px; border-radius: 5px; font-size: 10px; font-weight: 600;
    border: 1px solid var(--bd); background: var(--wh); color: var(--mid);
    cursor: pointer; transition: all .1s; font-family: 'DM Sans', sans-serif;
  }
  .db-fpill:hover { border-color: var(--g); color: var(--g); }
  .db-fpill.on { background: var(--g); color: var(--wh); border-color: var(--g); }
  .db-fpill-date {
    padding: 3px 7px; border-radius: 5px; font-size: 10px;
    border: 1px solid var(--bd); background: var(--wh); color: var(--txt);
    outline: none; font-family: 'DM Mono', monospace;
  }
  .db-fpill-date:focus { border-color: var(--g); }

  /* ── Account row ── */
  .db-row { display: flex; align-items: center; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--bg2); font-size: 12px; }
  .db-row:last-child { border-bottom: none; }
  .db-rn { color: var(--dk2); font-weight: 500; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .db-rb { font-family: 'DM Mono', monospace; font-size: 11.5px; font-weight: 500; flex-shrink: 0; margin-left: 10px; }
  .db-rb.pos { color: var(--pos); }
  .db-rb.neg { color: var(--neg); }

  /* ── Expand btn ── */
  .db-more { width: 100%; margin-top: 8px; padding: 5px; border: 1px solid var(--bd); border-radius: 6px; background: var(--bg); color: var(--mid); font-size: 11px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .1s; display: flex; align-items: center; justify-content: center; gap: 4px; }
  .db-more:hover { background: var(--bd); color: var(--dk); }

  /* ── Cheque row ── */
  .db-cq { display: flex; align-items: center; gap: 7px; padding: 7px 9px; border-radius: 7px; background: var(--bg); margin-bottom: 4px; font-size: 11.5px; }
  .db-cq:last-child { margin-bottom: 0; }
  .db-cq-no   { font-family: 'DM Mono', monospace; font-size: 10.5px; color: var(--sil); flex-shrink: 0; }
  .db-cq-name { flex: 1; color: var(--dk2); font-weight: 500; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .db-cq-amt  { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 600; color: var(--dk); flex-shrink: 0; }
  .db-cq-badge { font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: var(--am-bg); color: var(--am); border: 1px solid #fde68a; flex-shrink: 0; }

  /* ── Mini bar chart ── */
  .db-bar-row { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; }
  .db-bar-lbl { font-size: 10px; color: var(--mid); min-width: 28px; text-align: right; font-family: 'DM Mono', monospace; }
  .db-bar-track { flex: 1; height: 6px; background: var(--bg2); border-radius: 3px; overflow: hidden; }
  .db-bar-fill  { height: 100%; border-radius: 3px; transition: width .4s cubic-bezier(.4,0,.2,1); }
  .db-bar-val   { font-size: 10px; color: var(--mid); min-width: 56px; font-family: 'DM Mono', monospace; }

  /* ── Skeleton ── */
  @keyframes db-sk { to { background-position: -200% 0; } }
  .db-sk { background: linear-gradient(90deg,var(--bg) 25%,var(--bg2) 50%,var(--bg) 75%); background-size: 200% 100%; animation: db-sk 1.4s infinite; border-radius: 5px; }

  /* ── Grids ── */
  .db-g3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
  .db-g2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }
  .db-g4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }

  @media (max-width: 1024px) { .db-g4 { grid-template-columns: repeat(2,1fr); } .db-g3 { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 640px)  { .db-g4, .db-g3, .db-g2 { grid-template-columns: 1fr; } .db-val { font-size: 17px; } }
`;

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
  return <div style={{marginTop:12}}>
    {data.map((d,i)=>(
      <div key={i} className="db-bar-row">
        <span className="db-bar-lbl">{d.label}</span>
        <div className="db-bar-track"><div className="db-bar-fill" style={{width:`${Math.round(d.value/max*100)}%`,background:color||"#065f46"}}/></div>
        <span className="db-bar-val">{Rs(d.value)}</span>
      </div>
    ))}
  </div>;
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

  const salesP   = usePeriod("today");
  const purchP   = usePeriod("today");

  const [showBank,   setShowBank]   = useState(false);
  const [showRcv,    setShowRcv]    = useState(false);
  const [showPay,    setShowPay]    = useState(false);
  const [showLoanO,  setShowLoanO]  = useState(false);
  const [showLoanI,  setShowLoanI]  = useState(false);
  const [showInv,    setShowInv]    = useState(false);
  const [showCheq,   setShowCheq]   = useState(false);

  useEffect(()=>{
    (async()=>{
      setLoading(true);
      await Promise.allSettled([
        authFetch(`${API_BASE_URL}/accounts`).then(r=>r.ok&&r.json()).then(d=>d&&setAccounts(Array.isArray(d)?d:[])),
        authFetch(`${API_BASE_URL}/sales-invoice`).then(r=>r.ok&&r.json()).then(d=>{if(d)setSales(d.invoices||(Array.isArray(d)?d:[]));} ),
        authFetch(`${API_BASE_URL}/purchase-invoice`).then(r=>r.ok&&r.json()).then(d=>{if(d)setPurchases(d.invoices||(Array.isArray(d)?d:[]));} ),
        authFetch(`${API_BASE_URL}/cashbook-report`).then(r=>r.ok&&r.json()).then(d=>{if(d)setCashBal(d.currentBalance??0);}),
        authFetch(`${API_BASE_URL}/cheque-entries`).then(r=>r.ok&&r.json()).then(d=>{if(d)setCheques((d.chequeEntries||[]).filter(c=>c.status==="issued"));}),
        authFetch(`${API_BASE_URL}/weight-bridge`).then(r=>r.ok&&r.json()).then(d=>{if(d)setWbEntries(d.entries||(Array.isArray(d)?d:[]));} ),
      ]);
      setLoading(false);
    })();
  },[]);

  const bankAccts    = useMemo(()=>accounts.filter(a=>a.category==="Bank"||(a.accountType==="Assets"&&a.LedgerRef?.toLowerCase().includes("bank"))),[accounts]);
  const totalBank    = useMemo(()=>bankAccts.reduce((s,a)=>s+(a.balance||0),0),[bankAccts]);
  const totalCash    = (cashBal??0)+totalBank;
  const invAccts     = useMemo(()=>accounts.filter(a=>a.category?.toLowerCase().includes("invest")||a.accountName?.toLowerCase().includes("investor")),[accounts]);
  const totalInv     = useMemo(()=>invAccts.reduce((s,a)=>s+Math.abs(a.balance||0),0),[invAccts]);
  const rcvAccts     = useMemo(()=>accounts.filter(a=>a.accountType==="Assets"&&!a.isProductAccount&&!a.isProtected&&a.category!=="Bank"&&(a.balance||0)>0&&!a.LedgerRef?.toLowerCase().includes("bank")),[accounts]);
  const totalRcv     = useMemo(()=>rcvAccts.reduce((s,a)=>s+(a.balance||0),0),[rcvAccts]);
  const payAccts     = useMemo(()=>accounts.filter(a=>a.accountType==="Liabilities"&&!a.category?.includes("Employee")&&(a.balance||0)!==0),[accounts]);
  const totalPay     = useMemo(()=>payAccts.reduce((s,a)=>s+Math.abs(a.balance||0),0),[payAccts]);
  const loanOutAccts = useMemo(()=>accounts.filter(a=>a.accountName?.toLowerCase().includes("loan given")||a.category?.toLowerCase()==="loan given"),[accounts]);
  const loanInAccts  = useMemo(()=>accounts.filter(a=>a.accountName?.toLowerCase().includes("loan taken")||a.category?.toLowerCase()==="loan taken"),[accounts]);
  const totalLoanO   = useMemo(()=>loanOutAccts.reduce((s,a)=>s+Math.abs(a.balance||0),0),[loanOutAccts]);
  const totalLoanI   = useMemo(()=>loanInAccts.reduce((s,a)=>s+Math.abs(a.balance||0),0),[loanInAccts]);
  const expAccts     = useMemo(()=>accounts.filter(a=>a.accountType==="Expense"),[accounts]);
  const totalExp     = useMemo(()=>expAccts.reduce((s,a)=>s+Math.abs(a.balance||0),0),[expAccts]);

  const fInv = (list,p) => list.filter(i=>inR(i.date||i.createdAt,p.from,p.to));
  const filtSales = useMemo(()=>fInv(sales,salesP),[sales,salesP.from,salesP.to]);
  const filtPurch = useMemo(()=>fInv(purchases,purchP),[purchases,purchP.from,purchP.to]);
  const totalS = useMemo(()=>filtSales.reduce((s,i)=>s+(Number(i.totalAmount||i.amount)||0),0),[filtSales]);
  const totalP = useMemo(()=>filtPurch.reduce((s,i)=>s+(Number(i.totalAmount||i.finalAmount||i.amount)||0),0),[filtPurch]);

  const wbDone    = useMemo(()=>wbEntries.filter(e=>e.completed),[wbEntries]);
  const wbEarning = useMemo(()=>wbDone.reduce((s,e)=>s+(e.rate||0),0),[wbDone]);
  const cqTotal   = useMemo(()=>cheques.reduce((s,c)=>s+(c.amount||0),0),[cheques]);
  const netPos    = totalRcv-totalPay;

  const sChart = useMemo(()=>Array.from({length:7},(_,i)=>{
    const d=new Date(); d.setDate(d.getDate()-(6-i));
    const ds=d.toISOString().slice(0,10);
    const lbl=d.toLocaleDateString("en-PK",{weekday:"short"});
    return {label:lbl,value:sales.filter(s=>(s.date||s.createdAt||"").slice(0,10)===ds).reduce((sum,s)=>sum+(Number(s.totalAmount||s.amount)||0),0)};
  }),[sales]);

  const pChart = useMemo(()=>Array.from({length:7},(_,i)=>{
    const d=new Date(); d.setDate(d.getDate()-(6-i));
    const ds=d.toISOString().slice(0,10);
    const lbl=d.toLocaleDateString("en-PK",{weekday:"short"});
    return {label:lbl,value:purchases.filter(p=>(p.date||p.createdAt||"").slice(0,10)===ds).reduce((sum,p)=>sum+(Number(p.totalAmount||p.finalAmount||p.amount)||0),0)};
  }),[purchases]);

  const dateStr  = new Date().toLocaleDateString("en-PK",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
  const greeting = (()=>{const h=new Date().getHours();return h<12?"Good morning":h<17?"Good afternoon":h<21?"Good evening":"Good night";})();

  const Sk = () => <div className="db-sk" style={{width:"60%",height:20}}/>;

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <div className="db">

        {/* Header */}
        <div className="db-hdr">
          <div>
            <p className="db-eyebrow">{businessName||"Agro Plus"} · Operations</p>
            <h1 className="db-title">{greeting}, <em>{name.split(" ")[0]}</em></h1>
            <p className="db-date">{dateStr}</p>
          </div>
        </div>

        {/* ── CASH & BANKS ──────────────────────────────────────────── */}
        <p className="db-sec">Cash &amp; Bank Position</p>
        <div className="db-g3">

          <div className="db-card">
            <div className="db-accent" style={{background:"#065f46"}}/>
            <p className="db-lbl">Total Liquidity</p>
            {loading ? <Sk/> : <p className="db-val grn">{Rs(totalCash)}</p>}
            <p className="db-sub">Cash in hand + all bank accounts</p>
            {!loading && (
              <div style={{marginTop:10,paddingTop:10,borderTop:"1px solid var(--bg2)"}}>
                {[["Cash in Hand", cashBal??0],["Total Bank", totalBank]].map(([l,v])=>(
                  <div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--mid)",marginBottom:3}}>
                    <span>{l}</span>
                    <span style={{fontFamily:"'DM Mono',monospace",color:"var(--dk2)"}}>{Rs(v)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="db-card" style={{gridColumn:"span 2"}}>
            <div className="db-accent" style={{background:"#1f2937"}}/>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <p className="db-lbl" style={{margin:0}}>Bank Accounts</p>
              {!loading && <span style={{fontFamily:"'DM Mono',monospace",fontSize:12.5,fontWeight:600,color:"var(--dk)"}}>{Rs(totalBank)}</span>}
            </div>
            {loading ? [0,1].map(i=><div key={i} className="db-sk" style={{width:"100%",height:11,marginBottom:6}}/>) :
              bankAccts.length===0 ? <p style={{fontSize:12,color:"var(--sil)"}}>No bank accounts found.</p> : (
              <>
                {(showBank?bankAccts:bankAccts.slice(0,3)).map(a=>(
                  <div key={a._id} className="db-row">
                    <span className="db-rn">{a.accountName}</span>
                    <span className={`db-rb ${(a.balance||0)>=0?"pos":"neg"}`}>{Rs(a.balance||0)}</span>
                  </div>
                ))}
                {bankAccts.length>3 && <button className="db-more" onClick={()=>setShowBank(v=>!v)}>{showBank?"▲ Less":`▼ ${bankAccts.length-3} more`}</button>}
              </>
            )}
          </div>
        </div>

        {/* ── SALES & PURCHASES ─────────────────────────────────────── */}
        <p className="db-sec">Sales &amp; Purchases</p>
        <div className="db-g2">

          <div className="db-card">
            <div className="db-accent" style={{background:"#059669"}}/>
            <p className="db-lbl">Net Sales</p>
            {loading ? <Sk/> : <p className="db-val pos">{Rs(totalS)}</p>}
            <p className="db-sub">{filtSales.length} invoice{filtSales.length!==1?"s":""} · {sales.length} total</p>
            <PeriodPicker p={salesP}/>
            {!loading && <MiniBar data={sChart} color="#059669"/>}
          </div>

          <div className="db-card">
            <div className="db-accent" style={{background:"#1f2937"}}/>
            <p className="db-lbl">Net Purchases</p>
            {loading ? <Sk/> : <p className="db-val dkn">{Rs(totalP)}</p>}
            <p className="db-sub">{filtPurch.length} invoice{filtPurch.length!==1?"s":""} · {purchases.length} total</p>
            <PeriodPicker p={purchP}/>
            {!loading && <MiniBar data={pChart} color="#374151"/>}
          </div>
        </div>

        {/* ── FINANCIAL POSITION ────────────────────────────────────── */}
        <p className="db-sec">Financial Position</p>
        <div className="db-g4">

          <div className="db-card">
            <div className="db-accent" style={{background:"#0891b2"}}/>
            <p className="db-lbl">Receivables</p>
            {loading ? <Sk/> : <p className="db-val dkn">{Rs(totalRcv)}</p>}
            <p className="db-sub">{rcvAccts.length} account{rcvAccts.length!==1?"s":""}</p>
            {!loading && rcvAccts.length>0 && <>
              {(showRcv?rcvAccts:rcvAccts.slice(0,3)).map(a=>(
                <div key={a._id} className="db-row" style={{fontSize:11.5}}>
                  <span className="db-rn">{a.accountName}</span>
                  <span className="db-rb pos">{Rs(a.balance||0)}</span>
                </div>
              ))}
              {rcvAccts.length>3 && <button className="db-more" onClick={()=>setShowRcv(v=>!v)}>{showRcv?"▲ Less":`▼ +${rcvAccts.length-3}`}</button>}
            </>}
          </div>

          <div className="db-card">
            <div className="db-accent" style={{background:"#dc2626"}}/>
            <p className="db-lbl">Payables</p>
            {loading ? <Sk/> : <p className="db-val neg">{Rs(totalPay)}</p>}
            <p className="db-sub">{payAccts.length} account{payAccts.length!==1?"s":""}</p>
            {!loading && payAccts.length>0 && <>
              {(showPay?payAccts:payAccts.slice(0,3)).map(a=>(
                <div key={a._id} className="db-row" style={{fontSize:11.5}}>
                  <span className="db-rn">{a.accountName}</span>
                  <span className="db-rb neg">{Rs(Math.abs(a.balance||0))}</span>
                </div>
              ))}
              {payAccts.length>3 && <button className="db-more" onClick={()=>setShowPay(v=>!v)}>{showPay?"▲ Less":`▼ +${payAccts.length-3}`}</button>}
            </>}
          </div>

          <div className="db-card">
            <div className="db-accent" style={{background:netPos>=0?"#059669":"#dc2626"}}/>
            <p className="db-lbl">Net Position</p>
            {loading ? <Sk/> : <p className={`db-val ${netPos>=0?"pos":"neg"}`}>{Rs(Math.abs(netPos))}</p>}
            <p className="db-sub">{netPos>=0?"Receivables > payables":"Payables > receivables"}</p>
            {!loading && <div style={{marginTop:10}}>
              {[["Receivable","pos",totalRcv],["Payable","neg",totalPay]].map(([l,c,v])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--mid)",marginBottom:3}}>
                  <span>{l}</span>
                  <span style={{fontFamily:"'DM Mono',monospace",color:c==="pos"?"var(--pos)":"var(--neg)"}}>{Rs(v)}</span>
                </div>
              ))}
            </div>}
          </div>

          <div className="db-card">
            <div className="db-accent" style={{background:"#7c3aed"}}/>
            <p className="db-lbl">Expenses</p>
            {loading ? <Sk/> : <p className="db-val">{Rs(totalExp)}</p>}
            <p className="db-sub">{expAccts.length} expense account{expAccts.length!==1?"s":""}</p>
            {!loading && expAccts.length>0 && <div style={{marginTop:8}}>
              {expAccts.slice(0,4).map(a=>(
                <div key={a._id} className="db-row" style={{fontSize:11}}>
                  <span className="db-rn">{a.accountName.replace(" — Expense","")}</span>
                  <span className="db-rb neg">{Rs(Math.abs(a.balance||0))}</span>
                </div>
              ))}
            </div>}
          </div>
        </div>

        {/* ── INVESTMENT & LOANS ────────────────────────────────────── */}
        <p className="db-sec">Investment &amp; Loans</p>
        <div className="db-g3">

          <div className="db-card">
            <div className="db-accent" style={{background:"#065f46"}}/>
            <p className="db-lbl">Investment</p>
            {loading ? <Sk/> : <p className="db-val grn">{Rs(totalInv)}</p>}
            <p className="db-sub">{invAccts.length} investor account{invAccts.length!==1?"s":""}</p>
            {!loading && invAccts.length>0 && <>
              {(showInv?invAccts:invAccts.slice(0,3)).map(a=>(
                <div key={a._id} className="db-row" style={{fontSize:11.5}}>
                  <span className="db-rn">{a.accountName}</span>
                  <span className="db-rb pos">{Rs(Math.abs(a.balance||0))}</span>
                </div>
              ))}
              {invAccts.length>3 && <button className="db-more" onClick={()=>setShowInv(v=>!v)}>{showInv?"▲ Less":`▼ +${invAccts.length-3}`}</button>}
            </>}
          </div>

          <div className="db-card">
            <div className="db-accent" style={{background:"#0891b2"}}/>
            <p className="db-lbl">Loan Given</p>
            {loading ? <Sk/> : <p className="db-val dkn">{Rs(totalLoanO)}</p>}
            <p className="db-sub">{loanOutAccts.length} account{loanOutAccts.length!==1?"s":""}</p>
            {!loading && loanOutAccts.length>0 && <>
              {(showLoanO?loanOutAccts:loanOutAccts.slice(0,3)).map(a=>(
                <div key={a._id} className="db-row" style={{fontSize:11.5}}>
                  <span className="db-rn">{a.accountName}</span>
                  <span className="db-rb pos">{Rs(Math.abs(a.balance||0))}</span>
                </div>
              ))}
              {loanOutAccts.length>3 && <button className="db-more" onClick={()=>setShowLoanO(v=>!v)}>{showLoanO?"▲ Less":`▼ +${loanOutAccts.length-3}`}</button>}
            </>}
            {!loading && loanOutAccts.length===0 && <p style={{fontSize:11.5,color:"var(--sil)",marginTop:6}}>No loan given accounts.</p>}
          </div>

          <div className="db-card">
            <div className="db-accent" style={{background:"#dc2626"}}/>
            <p className="db-lbl">Loan Taken</p>
            {loading ? <Sk/> : <p className="db-val neg">{Rs(totalLoanI)}</p>}
            <p className="db-sub">{loanInAccts.length} account{loanInAccts.length!==1?"s":""}</p>
            {!loading && loanInAccts.length>0 && <>
              {(showLoanI?loanInAccts:loanInAccts.slice(0,3)).map(a=>(
                <div key={a._id} className="db-row" style={{fontSize:11.5}}>
                  <span className="db-rn">{a.accountName}</span>
                  <span className="db-rb neg">{Rs(Math.abs(a.balance||0))}</span>
                </div>
              ))}
              {loanInAccts.length>3 && <button className="db-more" onClick={()=>setShowLoanI(v=>!v)}>{showLoanI?"▲ Less":`▼ +${loanInAccts.length-3}`}</button>}
            </>}
            {!loading && loanInAccts.length===0 && <p style={{fontSize:11.5,color:"var(--sil)",marginTop:6}}>No loan taken accounts.</p>}
          </div>
        </div>

        {/* ── OPERATIONS ────────────────────────────────────────────── */}
        <p className="db-sec">Operations</p>
        <div className="db-g2">

          <div className="db-card">
            <div className="db-accent" style={{background:"#1f2937"}}/>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <div>
                <p className="db-lbl" style={{margin:0}}>Pending Cheques</p>
                {loading ? <div className="db-sk" style={{width:"50%",height:18,marginTop:5}}/> : <p className="db-val dkn" style={{marginTop:4}}>{Rs(cqTotal)}</p>}
              </div>
              {!loading && <div style={{textAlign:"right"}}>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:20,fontWeight:600,color:cheques.length>0?"var(--neg)":"var(--pos)"}}>{cheques.length}</span>
                <p style={{fontSize:9.5,color:"var(--sil)",margin:0}}>issued</p>
              </div>}
            </div>
            {!loading && cheques.length===0 && <p style={{fontSize:12,color:"var(--sil)"}}>✓ No pending cheques</p>}
            {!loading && cheques.length>0 && <>
              {(showCheq?cheques:cheques.slice(0,4)).map(c=>(
                <div key={c._id} className="db-cq">
                  <span className="db-cq-no">#{c.chequeNo}</span>
                  <span className="db-cq-name">{c.payeeAccountName}</span>
                  <span className="db-cq-amt">{Rs(c.amount)}</span>
                  <span className="db-cq-badge">ISSUED</span>
                </div>
              ))}
              {cheques.length>4 && <button className="db-more" style={{marginTop:8}} onClick={()=>setShowCheq(v=>!v)}>{showCheq?"▲ Less":`▼ +${cheques.length-4} more`}</button>}
            </>}
          </div>

          <div className="db-card">
            <div className="db-accent" style={{background:"#065f46"}}/>
            <p className="db-lbl">Weight Bridge</p>
            {loading ? <Sk/> : <p className="db-val grn">{Rs(wbEarning)}</p>}
            <p className="db-sub">{wbDone.length} completed · {wbEntries.length-wbDone.length} pending</p>
            {!loading && wbDone.length>0 && (()=>{
              const byType={};
              wbDone.forEach(e=>{byType[e.vehicleType]=(byType[e.vehicleType]||0)+(e.rate||0);});
              const types=Object.entries(byType).sort((a,b)=>b[1]-a[1]).slice(0,4);
              const mx=Math.max(...types.map(t=>t[1]),1);
              return <div style={{marginTop:12}}>
                {types.map(([type,total])=>(
                  <div key={type} className="db-bar-row">
                    <span style={{fontSize:10,color:"var(--mid)",minWidth:80,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{type}</span>
                    <div className="db-bar-track"><div className="db-bar-fill" style={{width:`${Math.round(total/mx*100)}%`,background:"#065f46"}}/></div>
                    <span className="db-bar-val">{Rs(total)}</span>
                  </div>
                ))}
              </div>;
            })()}
          </div>
        </div>

        <div style={{height:32}}/>
      </div>
    </SidebarLayout>
  );
}