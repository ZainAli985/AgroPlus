import React, { useEffect, useRef, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { authFetch } from "../../utils/authFetch";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  .isx * { box-sizing: border-box; }
  .isx { font-family:'DM Sans',sans-serif; color:#1a1a2e; width:100%; max-width:820px; margin:0 auto; }

  .isx-eyebrow  { font-size:11px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:#9ca3af; margin-bottom:6px; }
  .isx-title    { font-family:'Lora',serif; font-size:26px; font-weight:700; color:#0f172a; letter-spacing:-.3px; line-height:1.15; }
  .isx-subtitle { font-size:13px; color:#94a3b8; margin-top:5px; }

  .isx-export-btn { display:inline-flex; align-items:center; gap:7px; padding:9px 18px; border-radius:10px; border:none; cursor:pointer; background:#0f172a; color:#fff; font-size:13px; font-weight:600; font-family:'DM Sans',sans-serif; box-shadow:0 2px 8px rgba(15,23,42,.18); transition:background .15s; white-space:nowrap; }
  .isx-export-btn:hover:not(:disabled) { background:#1e293b; }
  .isx-export-btn:disabled { opacity:.5; cursor:not-allowed; }
  .isx-nav-pill { padding:6px 14px; border-radius:20px; font-size:12px; font-weight:600; border:1.5px solid #e2e8f0; background:#fff; color:#64748b; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .12s; white-space:nowrap; }
  .isx-nav-pill:hover { border-color:#94a3b8; color:#334155; }

  /* summary cards */
  .isx-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:22px; }
  .isx-card { background:#fff; border:1.5px solid #e2e8f0; border-radius:14px; padding:18px 20px; cursor:pointer; transition:box-shadow .15s,transform .15s; width:100%; text-align:left; position:relative; overflow:hidden; display:block; }
  .isx-card::before { content:''; position:absolute; left:0; top:0; bottom:0; width:4px; border-radius:14px 0 0 14px; background:var(--c,#6366f1); }
  .isx-card:hover { box-shadow:0 6px 20px rgba(0,0,0,.07); transform:translateY(-1px); }
  .isx-card-static { cursor:default; }
  .isx-card-static:hover { box-shadow:none; transform:none; }
  .isx-card-lbl  { font-size:11px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:#94a3b8; margin-bottom:8px; }
  .isx-card-val  { font-family:'DM Mono',monospace; font-size:20px; font-weight:500; color:#0f172a; letter-spacing:-.4px; line-height:1; }
  .isx-card-desc { font-size:12px; color:#94a3b8; margin-top:8px; }
  .isx-chip { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:6px; font-size:11.5px; font-weight:700; margin-top:8px; font-family:'DM Sans',sans-serif; }
  .isx-chip-profit { background:#ecfdf5; color:#059669; }
  .isx-chip-loss   { background:#fef2f2; color:#dc2626; }

  /* report panel */
  .isx-panel { background:#fff; border:1.5px solid #e2e8f0; border-radius:16px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,.06); }
  .isx-panel-head { display:flex; align-items:center; justify-content:center; gap:14px; padding:20px 24px; border-bottom:1.5px solid #f1f5f9; background:linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%); }
  .isx-co-name  { font-family:'Lora',serif; font-size:17px; font-weight:700; color:#0f172a; }
  .isx-rep-sub  { font-family:'Lora',serif; font-size:13px; font-style:italic; font-weight:500; color:#64748b; margin-top:2px; }
  .isx-rep-date { font-size:11.5px; color:#94a3b8; margin-top:2px; }
  .isx-co-logo  { width:46px; height:46px; border-radius:9px; object-fit:cover; border:1px solid #e2e8f0; flex-shrink:0; }
  .isx-co-logo-fb { width:46px; height:46px; border-radius:9px; background:#1e293b; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:800; color:#4ade80; flex-shrink:0; font-family:'DM Sans',sans-serif; }

  /* collapsible section */
  .isx-sec-head {
    display:flex; align-items:center; justify-content:space-between;
    padding:12px 22px; cursor:pointer; user-select:none;
    background:var(--bg,#f8fafc); border-bottom:1.5px solid var(--bdr,#f1f5f9);
    transition:filter .1s;
  }
  .isx-sec-head:hover { filter:brightness(.97); }
  .isx-sec-name  { display:flex; align-items:center; gap:7px; font-family:'Lora',serif; font-size:14px; font-weight:600; color:var(--ac,#6366f1); font-style:italic; }
  .isx-sec-dot   { width:7px; height:7px; border-radius:50%; background:var(--ac,#6366f1); flex-shrink:0; }
  .isx-sec-right { display:flex; align-items:center; gap:8px; }
  .isx-sec-total { font-family:'DM Mono',monospace; font-size:14px; font-weight:500; color:var(--ac,#6366f1); }
  .isx-sec-count { font-size:10.5px; font-weight:600; color:#94a3b8; background:#e2e8f0; padding:1px 6px; border-radius:4px; font-family:'DM Mono',monospace; }
  .isx-chevron   { color:#94a3b8; transition:transform .2s; flex-shrink:0; }
  .isx-chevron.open { transform:rotate(180deg); }

  /* rows */
  .isx-rows-collapse { overflow:hidden; }
  .isx-rows-scroll   { max-height:240px; overflow-y:auto; scrollbar-width:thin; scrollbar-color:#e2e8f0 transparent; }
  .isx-rows-scroll::-webkit-scrollbar { width:3px; }
  .isx-rows-scroll::-webkit-scrollbar-thumb { background:#d1d5db; border-radius:4px; }
  .isx-row { display:flex; align-items:center; justify-content:space-between; padding:10px 22px; border-bottom:1px solid #f8fafc; transition:background .08s; }
  .isx-row:hover { background:#f8fafc; }
  .isx-row-name   { font-size:13px; color:#334155; flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .isx-row-amount { font-family:'DM Mono',monospace; font-size:12.5px; color:#0f172a; font-weight:500; white-space:nowrap; margin-left:14px; flex-shrink:0; }
  .isx-empty-row  { padding:16px 22px; font-size:12.5px; color:#cbd5e1; font-style:italic; }

  /* section footer */
  .isx-sec-foot { display:flex; align-items:center; justify-content:space-between; padding:11px 22px; background:var(--bg,#f8fafc); border-top:2px solid var(--bdr,#f1f5f9); }
  .isx-sec-foot-lbl { font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:#64748b; }
  .isx-sec-foot-val { font-family:'DM Mono',monospace; font-size:13.5px; font-weight:500; color:var(--ac,#6366f1); }

  /* computed line (Operating Income etc.) */
  .isx-computed { display:flex; align-items:center; justify-content:space-between; padding:13px 22px; background:var(--cbg,#f0fdf4); border-top:2px solid var(--cbdr,#bbf7d0); }
  .isx-computed-lbl { font-family:'Lora',serif; font-size:14px; font-weight:600; color:var(--ccolor,#059669); font-style:italic; }
  .isx-computed-val { font-family:'DM Mono',monospace; font-size:15px; font-weight:600; color:var(--ccolor,#059669); }

  .isx-divider { border:none; border-top:2px solid #f1f5f9; margin:0; }

  /* net footer */
  .isx-net-footer { display:flex; align-items:center; justify-content:space-between; padding:17px 22px; border-top:2px solid #f1f5f9; }
  .isx-net-profit { background:#f0fdf4; }
  .isx-net-loss   { background:#fef2f2; }
  .isx-net-lbl    { display:flex; align-items:center; gap:10px; }
  .isx-net-icon { width:34px; height:34px; border-radius:10px; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
  .isx-net-icon-profit { background:#dcfce7; color:#059669; }
  .isx-net-icon-loss   { background:#fee2e2; color:#dc2626; }
  .isx-net-title { font-family:'Lora',serif; font-size:15px; font-weight:600; }
  .isx-net-title-profit { color:#059669; }
  .isx-net-title-loss   { color:#dc2626; }
  .isx-net-sub { font-size:12px; color:#94a3b8; margin-top:2px; }
  .isx-net-val { font-family:'DM Mono',monospace; font-size:20px; font-weight:500; letter-spacing:-.5px; }
  .isx-net-val-profit { color:#059669; }
  .isx-net-val-loss   { color:#dc2626; }

  .isx-margin-strip { display:flex; align-items:center; justify-content:space-between; padding:9px 22px; border-top:1px solid #f1f5f9; background:#fafcff; }
  .isx-margin-txt  { font-size:12px; color:#94a3b8; font-weight:500; }
  .isx-margin-chip { font-size:11.5px; font-weight:700; padding:2px 8px; border-radius:6px; }
  .isx-margin-profit { background:#ecfdf5; color:#059669; }
  .isx-margin-loss   { background:#fef2f2; color:#dc2626; }

  @keyframes isx-shimmer { to{background-position:-200% 0} }
  .isx-sk { background:linear-gradient(90deg,#f1f5f9 25%,#f8fafc 50%,#f1f5f9 75%); background-size:200% 100%; animation:isx-shimmer 1.4s infinite; border-radius:8px; }
  @keyframes isx-spin { to{transform:rotate(360deg)} }
  .isx-spin { animation:isx-spin 1s linear infinite; display:inline-block; }
  @media(max-width:600px) { .isx-cards { grid-template-columns:1fr !important; } }
`;

const fmt  = v => "Rs " + Number(v||0).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0});
const COLLAPSE_AT = 5;

function Chevron({ open }) {
  return (
    <svg className={`isx-chevron${open?" open":""}`} width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
    </svg>
  );
}

function Section({ title, rows, total, accent, bg, border, refProp }) {
  const [open, setOpen] = useState(rows.length <= COLLAPSE_AT);
  const scrollable = rows.length > 8;

  return (
    <div ref={refProp} style={{ "--ac":accent, "--bg":bg, "--bdr":border }}>
      <div className="isx-sec-head" onClick={() => setOpen(o => !o)}>
        <div className="isx-sec-name">
          <span className="isx-sec-dot"/>
          {title}
        </div>
        <div className="isx-sec-right">
          <span className="isx-sec-count">{rows.length} items</span>
          <span className="isx-sec-total">{fmt(Math.abs(total))}</span>
          <Chevron open={open}/>
        </div>
      </div>

      <div className="isx-rows-collapse" style={{ maxHeight:open?"9999px":0, overflow:"hidden" }}>
        {rows.length === 0
          ? <p className="isx-empty-row">No entries</p>
          : (
            <div className={scrollable?"isx-rows-scroll":""}>
              {rows.map((r, i) => (
                <div key={r.id||i} className="isx-row">
                  <span className="isx-row-name">{r.name}</span>
                  <span className="isx-row-amount">{fmt(Math.abs(Number(r.amount)||0))}</span>
                </div>
              ))}
            </div>
          )}
        <div className="isx-sec-foot">
          <span className="isx-sec-foot-lbl">Total {title}</span>
          <span className="isx-sec-foot-val">{fmt(Math.abs(total))}</span>
        </div>
      </div>
    </div>
  );
}

function BusinessLogo({ name }) {
  const logoUrl = localStorage.getItem("logoUrl") || "";
  const [err, setErr] = useState(false);
  const fb = (name||"R").slice(0,2).toUpperCase();
  if (logoUrl && !err)
    return <img src={logoUrl} alt={name} className="isx-co-logo" onError={() => setErr(true)}/>;
  return <div className="isx-co-logo-fb">{fb}</div>;
}

// Tax-related keywords for auto-detecting tax expenses
const TAX_KEYWORDS = ["tax","income tax","market fee","social security","stamp","duty","zakat","levy","cess","withholding"];

export default function IncomeStatement() {
  const [data,      setData]      = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [exporting, setExporting] = useState(false);
  const reportRef  = useRef(null);
  const revenueRef = useRef(null);
  const expenseRef = useRef(null);

  const businessName = localStorage.getItem("businessName") || "Rice Mill";

  useEffect(() => {
    (async () => {
      try {
        const res  = await authFetch(`${API_BASE_URL}/incomestatement`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || "Failed");
        setData(json);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    })();
  }, []);

  const scrollTo = r => r.current?.scrollIntoView({ behavior:"smooth", block:"start" });

  const handleExportPdf = async () => {
    if (!reportRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(reportRef.current, { scale:2, backgroundColor:"#ffffff", useCORS:true });
      const img    = canvas.toDataURL("image/png");
      const pdf    = new jsPDF("portrait","mm","a4");
      const pw     = pdf.internal.pageSize.getWidth();
      const ratio  = (pw * 0.92) / canvas.width;
      pdf.addImage(img,"PNG",(pw-canvas.width*ratio)/2, 10, canvas.width*ratio, canvas.height*ratio);
      pdf.save(`income-statement-${new Date().toISOString().slice(0,10)}.pdf`);
    } catch(e) { console.error(e); }
    setExporting(false);
  };

  if (loading) return (
    <SidebarLayout><style>{FONTS}{CSS}</style>
      <div className="isx">
        <div style={{ display:"flex",justifyContent:"space-between",marginBottom:24,alignItems:"flex-end",flexWrap:"wrap",gap:12 }}>
          <div><div className="isx-sk" style={{ width:80,height:10,marginBottom:10 }}/><div className="isx-sk" style={{ width:210,height:28 }}/></div>
          <div className="isx-sk" style={{ width:130,height:38,borderRadius:10 }}/>
        </div>
        <div className="isx-panel" style={{ minHeight:260 }}>
          <div style={{ padding:"20px 24px",background:"#f8fafc",borderBottom:"1.5px solid #f1f5f9",display:"flex",justifyContent:"center",gap:14,alignItems:"center" }}>
            <div className="isx-sk" style={{ width:46,height:46,borderRadius:9 }}/><div><div className="isx-sk" style={{ width:150,height:14,marginBottom:7 }}/><div className="isx-sk" style={{ width:110,height:11 }}/></div>
          </div>
          {[0,1,2,3].map(r=>(
            <div key={r} style={{ display:"flex",justifyContent:"space-between",padding:"10px 22px",borderBottom:"1px solid #f8fafc" }}>
              <div className="isx-sk" style={{ width:"55%",height:13 }}/><div className="isx-sk" style={{ width:"22%",height:13 }}/>
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
  if (!data) return null;

  const isProfit = data.netIncome >= 0;
  const profCls  = isProfit ? "profit" : "loss";
  const margin   = data.totalRevenue > 0
    ? ((data.netIncome / data.totalRevenue) * 100).toFixed(1) : null;
  const today    = new Date().toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"});

  // Split expenses into operating + tax
  const taxExpenses = (data.expenseAccounts||[]).filter(a =>
    TAX_KEYWORDS.some(k => a.name.toLowerCase().includes(k))
  );
  const opExpenses  = (data.expenseAccounts||[]).filter(a =>
    !TAX_KEYWORDS.some(k => a.name.toLowerCase().includes(k))
  );
  const totalOp  = opExpenses.reduce((s,a) => s+(Number(a.amount)||0), 0);
  const totalTax = taxExpenses.reduce((s,a) => s+(Number(a.amount)||0), 0);
  const showSplit = taxExpenses.length > 0;
  const opIncome = data.totalRevenue - totalOp;

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <div className="isx">

        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:14, marginBottom:24 }}>
          <div>
            <p className="isx-eyebrow">Financial Reports</p>
            <h1 className="isx-title">Income Statement</h1>
            <p className="isx-subtitle">For the period ending {today}</p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
            <button className="isx-nav-pill" onClick={() => scrollTo(revenueRef)}>Revenue</button>
            <button className="isx-nav-pill" onClick={() => scrollTo(expenseRef)}>Expenses</button>
            <button className="isx-export-btn" onClick={handleExportPdf} disabled={exporting}>
              {exporting
                ? <><span className="isx-spin"><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg></span>&nbsp;Exporting…</>
                : <><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>&nbsp;Export PDF</>}
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="isx-cards">
          <button className="isx-card" style={{ "--c":"#4f46e5" }} onClick={() => scrollTo(revenueRef)}>
            <p className="isx-card-lbl">Total Revenue</p>
            <p className="isx-card-val">{fmt(data.totalRevenue)}</p>
            <p className="isx-card-desc">{data.revenueAccounts?.length||0} revenue accounts</p>
          </button>
          <button className="isx-card" style={{ "--c":"#d97706" }} onClick={() => scrollTo(expenseRef)}>
            <p className="isx-card-lbl">Total Expenses</p>
            <p className="isx-card-val">{fmt(data.totalExpenses)}</p>
            <p className="isx-card-desc">{data.expenseAccounts?.length||0} expense accounts</p>
          </button>
          <div className="isx-card isx-card-static" style={{ "--c": isProfit?"#059669":"#dc2626" }}>
            <p className="isx-card-lbl">{isProfit?"Net Profit":"Net Loss"}</p>
            <p className="isx-card-val" style={{ color:isProfit?"#059669":"#dc2626" }}>{fmt(Math.abs(data.netIncome))}</p>
            <span className={`isx-chip isx-chip-${profCls}`}>
              {isProfit
                ? <><svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={{display:"inline-block",verticalAlign:"middle"}}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>&nbsp;Profitable period</>
                : <><svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={{display:"inline-block",verticalAlign:"middle"}}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>&nbsp;Loss period</>}
            </span>
            {margin !== null && <p className="isx-card-desc" style={{ marginTop:6 }}>{Math.abs(margin)}% {isProfit?"profit":"loss"} margin</p>}
          </div>
        </div>

        {/* Report panel */}
        <div ref={reportRef} className="isx-panel">

          {/* Company header */}
          <div className="isx-panel-head">
            <BusinessLogo name={businessName}/>
            <div style={{ textAlign:"center" }}>
              <p className="isx-co-name">{businessName}</p>
              <p className="isx-rep-sub">Income Statement</p>
              <p className="isx-rep-date">For the period ending {today}</p>
            </div>
          </div>

          {/* Revenue */}
          <Section
            refProp={revenueRef}
            title="Sale / Revenue"
            rows={data.revenueAccounts||[]}
            total={data.totalRevenue}
            accent="#4f46e5" bg="#f5f5ff" border="#e0e7ff"
          />

          <hr className="isx-divider"/>

          {/* Operating Expenses */}
          <Section
            refProp={expenseRef}
            title={showSplit ? "Operating Expenses" : "Expenses"}
            rows={showSplit ? opExpenses : (data.expenseAccounts||[])}
            total={showSplit ? totalOp : data.totalExpenses}
            accent="#d97706" bg="#fffbeb" border="#fde68a"
          />

          {/* Operating Income computed row */}
          <div className="isx-computed" style={{
            "--cbg":  opIncome>=0 ? "#f0fdf4" : "#fef2f2",
            "--cbdr": opIncome>=0 ? "#bbf7d0" : "#fecaca",
            "--ccolor": opIncome>=0 ? "#059669" : "#dc2626",
          }}>
            <span className="isx-computed-lbl">Operating Income</span>
            <span className="isx-computed-val">{fmt(opIncome)}</span>
          </div>

          {/* Tax / Other Expenses (if detected) */}
          {showSplit && (
            <>
              <hr className="isx-divider"/>
              <Section
                title="Tax &amp; Other Expenses"
                rows={taxExpenses}
                total={totalTax}
                accent="#7c3aed" bg="#faf5ff" border="#e9d5ff"
              />
            </>
          )}

          {/* Net income footer */}
          <div className={`isx-net-footer isx-net-${profCls}`}>
            <div className="isx-net-lbl">
              <div className={`isx-net-icon isx-net-icon-${profCls}`}>
                {isProfit
                  ? <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                  : <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/></svg>}
              </div>
              <div>
                <p className={`isx-net-title isx-net-title-${profCls}`}>{isProfit?"Net Profit":"Net Loss"}</p>
                <p className="isx-net-sub">Revenue minus Total Expenses</p>
              </div>
            </div>
            <span className={`isx-net-val isx-net-val-${profCls}`}>{fmt(data.netIncome)}</span>
          </div>

          {/* Margin strip */}
          {margin !== null && (
            <div className="isx-margin-strip">
              <span className="isx-margin-txt">{isProfit?"Profit":"Loss"} margin — {Math.abs(margin)}% of total revenue</span>
              <span className={`isx-margin-chip isx-margin-${profCls}`}>{isProfit?"+":"-"}{Math.abs(margin)}%</span>
            </div>
          )}
        </div>

        <p style={{ textAlign:"center", color:"#94a3b8", fontSize:11.5, marginTop:13, fontFamily:"'DM Mono',monospace" }}>
          Click any section header to expand or collapse
        </p>
      </div>
    </SidebarLayout>
  );
}