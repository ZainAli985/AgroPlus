import React, { useEffect, useState, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { authFetch } from "../../utils/authFetch";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  .bsx * { box-sizing: border-box; }
  .bsx { font-family:'DM Sans',sans-serif; color:#1a1a2e; width:100%; max-width:1060px; margin:0 auto; }

  .bsx-eyebrow  { font-size:11px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:#9ca3af; margin-bottom:6px; }
  .bsx-title    { font-family:'Lora',serif; font-size:26px; font-weight:700; color:#0f172a; letter-spacing:-.3px; line-height:1.15; display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
  .bsx-subtitle { font-size:13px; color:#94a3b8; margin-top:5px; }

  .bsx-badge { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:600; font-family:'DM Sans',sans-serif; font-style:normal; background:#ecfdf5; color:#059669; border:1px solid #a7f3d0; }
  .bsx-badge-warn { background:#fff7ed; color:#c2410c; border-color:#fed7aa; }

  .bsx-export-btn { display:inline-flex; align-items:center; gap:7px; padding:9px 18px; border-radius:10px; border:none; cursor:pointer; background:#0f172a; color:#fff; font-size:13px; font-weight:600; font-family:'DM Sans',sans-serif; box-shadow:0 2px 8px rgba(15,23,42,.18); transition:background .15s; white-space:nowrap; }
  .bsx-export-btn:hover:not(:disabled) { background:#1e293b; }
  .bsx-export-btn:disabled { opacity:.5; cursor:not-allowed; }

  /* summary cards */
  .bsx-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:16px; }
  .bsx-card { background:#fff; border:1.5px solid #e2e8f0; border-radius:14px; padding:18px 20px; position:relative; overflow:hidden; }
  .bsx-card::before { content:''; position:absolute; left:0; top:0; bottom:0; width:4px; border-radius:14px 0 0 14px; background:var(--c,#6366f1); }
  .bsx-card-lbl { font-size:11px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:#94a3b8; margin-bottom:8px; }
  .bsx-card-val { font-family:'DM Mono',monospace; font-size:20px; font-weight:500; color:#0f172a; letter-spacing:-.4px; line-height:1; }

  /* equation bar */
  .bsx-eq { display:flex; align-items:center; gap:10px; flex-wrap:wrap; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:12px; padding:11px 18px; margin-bottom:20px; }
  .bsx-eq-lbl  { font-size:11px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:#94a3b8; }
  .bsx-eq-sep  { color:#cbd5e1; font-size:15px; font-family:'DM Mono',monospace; }
  .bsx-eq-num  { font-family:'DM Mono',monospace; font-size:13px; font-weight:500; }
  .bsx-eq-stat { margin-left:auto; font-size:11.5px; font-weight:600; }

  /* main panel */
  .bsx-panel { background:#fff; border:1.5px solid #e2e8f0; border-radius:16px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,.06); }
  .bsx-panel-head { display:flex; align-items:center; justify-content:center; gap:14px; padding:20px 24px; border-bottom:1.5px solid #f1f5f9; background:linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%); }
  .bsx-co-name  { font-family:'Lora',serif; font-size:17px; font-weight:700; color:#0f172a; }
  .bsx-rep-sub  { font-family:'Lora',serif; font-size:13px; font-style:italic; font-weight:500; color:#64748b; margin-top:2px; }
  .bsx-rep-date { font-size:11.5px; color:#94a3b8; margin-top:2px; }
  .bsx-co-logo  { width:46px; height:46px; border-radius:9px; object-fit:cover; border:1px solid #e2e8f0; flex-shrink:0; }
  .bsx-co-logo-fb { width:46px; height:46px; border-radius:9px; background:#1e293b; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:800; color:#4ade80; flex-shrink:0; font-family:'DM Sans',sans-serif; }

  /* two-column grid */
  .bsx-cols { display:grid; grid-template-columns:1fr 1fr; }
  .bsx-col-l { border-right:1.5px solid #f1f5f9; }

  /* column title bar */
  .bsx-col-title { padding:10px 20px 9px; background:#f8fafc; border-bottom:1.5px solid #e2e8f0; }
  .bsx-col-title-text { font-family:'Lora',serif; font-size:14px; font-weight:700; color:#0f172a; font-style:italic; }

  /* collapsible sub-section */
  .bsx-sec-head {
    display:flex; align-items:center; justify-content:space-between;
    padding:10px 20px; cursor:pointer; user-select:none;
    background:var(--bg,#f8fafc); border-bottom:1.5px solid var(--bdr,#f1f5f9);
    border-top:1.5px solid var(--bdr,#f1f5f9); transition:filter .1s;
  }
  .bsx-sec-head:hover { filter:brightness(.97); }
  .bsx-sec-name { display:flex; align-items:center; gap:7px; font-family:'Lora',serif; font-size:13px; font-weight:600; color:var(--ac,#6366f1); font-style:italic; }
  .bsx-sec-dot  { width:7px; height:7px; border-radius:50%; background:var(--ac,#6366f1); flex-shrink:0; }
  .bsx-sec-right { display:flex; align-items:center; gap:8px; }
  .bsx-sec-total { font-family:'DM Mono',monospace; font-size:13px; font-weight:500; color:var(--ac,#6366f1); }
  .bsx-sec-count { font-size:10.5px; font-weight:600; color:#94a3b8; background:#e2e8f0; padding:1px 6px; border-radius:4px; font-family:'DM Mono',monospace; }
  .bsx-chevron  { color:#94a3b8; transition:transform .2s; flex-shrink:0; }
  .bsx-chevron.open { transform:rotate(180deg); }

  /* rows area */
  .bsx-rows-collapse { overflow:hidden; }
  .bsx-rows-scroll   { max-height:240px; overflow-y:auto; scrollbar-width:thin; scrollbar-color:#e2e8f0 transparent; }
  .bsx-rows-scroll::-webkit-scrollbar { width:3px; }
  .bsx-rows-scroll::-webkit-scrollbar-thumb { background:#d1d5db; border-radius:4px; }

  /* category label within section */
  .bsx-cat-label { padding:5px 20px 4px 30px; font-size:10px; font-weight:800; letter-spacing:.09em; text-transform:uppercase; color:#94a3b8; background:#fafcff; border-bottom:1px solid #f1f5f9; }

  /* individual row */
  .bsx-row { display:flex; align-items:center; justify-content:space-between; padding:9px 20px; border-bottom:1px solid #f8fafc; transition:background .07s; }
  .bsx-row:hover { background:#f8fafc; }
  .bsx-row-name   { font-size:12.5px; color:#334155; flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .bsx-row-amount { font-family:'DM Mono',monospace; font-size:12.5px; color:#0f172a; font-weight:500; white-space:nowrap; margin-left:10px; flex-shrink:0; }
  .bsx-row-indent { padding-left:34px; }
  .bsx-empty-row  { padding:13px 20px; font-size:12.5px; color:#cbd5e1; font-style:italic; }

  /* section footer */
  .bsx-sec-foot { display:flex; align-items:center; justify-content:space-between; padding:9px 20px; background:var(--bg,#f8fafc); border-top:2px solid var(--bdr,#f1f5f9); }
  .bsx-sec-foot-lbl { font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:#64748b; }
  .bsx-sec-foot-val { font-family:'DM Mono',monospace; font-size:13px; font-weight:600; color:var(--ac,#6366f1); }

  /* total rows at bottom of columns */
  .bsx-col-total { display:flex; align-items:center; justify-content:space-between; padding:13px 20px; background:#1e293b; border-top:2px solid #0f172a; }
  .bsx-col-total-lbl { font-size:10.5px; font-weight:800; text-transform:uppercase; letter-spacing:.08em; color:rgba(255,255,255,.6); }
  .bsx-col-total-val { font-family:'DM Mono',monospace; font-size:14px; font-weight:600; color:#fff; }

  /* totals bar */
  .bsx-totals { display:grid; grid-template-columns:repeat(3,1fr); border-top:2px solid #f1f5f9; background:#fafcff; }
  .bsx-tot-cell { padding:14px 20px; text-align:center; }
  .bsx-tot-cell + .bsx-tot-cell { border-left:1.5px solid #f1f5f9; }
  .bsx-tot-lbl { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:#94a3b8; margin-bottom:5px; }
  .bsx-tot-val { font-family:'DM Mono',monospace; font-size:15px; font-weight:500; letter-spacing:-.3px; }

  /* sub-section divider */
  .bsx-divider { border:none; border-top:1.5px solid #e2e8f0; margin:0; }

  @keyframes bsx-shimmer { to{background-position:-200% 0} }
  .bsx-sk { background:linear-gradient(90deg,#f1f5f9 25%,#f8fafc 50%,#f1f5f9 75%); background-size:200% 100%; animation:bsx-shimmer 1.4s infinite; border-radius:8px; }
  @keyframes bsx-spin { to{transform:rotate(360deg)} }
  .bsx-spin { animation:bsx-spin 1s linear infinite; display:inline-block; }

  @media(max-width:700px) {
    .bsx-cols  { grid-template-columns:1fr !important; }
    .bsx-col-l { border-right:none !important; border-bottom:1.5px solid #f1f5f9; }
    .bsx-totals { grid-template-columns:1fr !important; }
    .bsx-tot-cell + .bsx-tot-cell { border-left:none !important; border-top:1.5px solid #f1f5f9; }
    .bsx-cards  { grid-template-columns:1fr !important; }
  }
`;

const fmt = v => "Rs " + Number(v||0).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0});
const COLLAPSE_AT = 5; // auto-collapse if rows > this

// Category names for Current Assets sub-grouping
const CAT_LABEL = { Cash:"Cash", Bank:"Banks", "Accounts Receivable":"Accounts Receivables", "Loans Given":"Loans Given", Inventory:"Inventory" };

function categorizeName(name="") {
  const n = name.toLowerCase();
  if (n.startsWith("cash"))                                   return "Cash";
  if (n.startsWith("bank |") || n.startsWith("bank|"))       return "Bank";
  if (n.startsWith("customer |"))                             return "Accounts Receivable";
  if (n.startsWith("transaction |") || n.startsWith("loan")) return "Loans Given";
  if (n.startsWith("stock |") || n.startsWith("inventory |")) return "Inventory";
  return "";
}

function groupByCat(rows) {
  const map = {};
  rows.forEach(r => {
    const cat = r.category || categorizeName(r.name);
    if (!map[cat]) map[cat] = [];
    map[cat].push(r);
  });
  const ORDER = ["Cash","Bank","Accounts Receivable","Loans Given","Inventory",""];
  const out = [];
  ORDER.forEach(k => { if (map[k]) out.push({ cat:k, rows:map[k] }); });
  Object.keys(map).filter(k => !ORDER.includes(k)).forEach(k => out.push({ cat:k, rows:map[k] }));
  return out;
}

function Chevron({ open }) {
  return (
    <svg className={`bsx-chevron${open?" open":""}`} width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
    </svg>
  );
}

function SubSection({ grp, accent, bg, border, useCats }) {
  const [open, setOpen] = useState(grp.rows.length <= COLLAPSE_AT);
  const scrollable = grp.rows.length > 8;
  const cats = useCats ? groupByCat(grp.rows) : null;

  return (
    <div style={{ "--ac":accent, "--bg":bg, "--bdr":border }}>
      <div className="bsx-sec-head" onClick={() => setOpen(o => !o)}>
        <div className="bsx-sec-name">
          <span className="bsx-sec-dot"/>
          {grp.subAccountType}
        </div>
        <div className="bsx-sec-right">
          <span className="bsx-sec-count">{grp.rows.length}</span>
          <span className="bsx-sec-total">{fmt(Math.abs(grp.total))}</span>
          <Chevron open={open}/>
        </div>
      </div>

      <div className="bsx-rows-collapse" style={{ maxHeight: open ? "9999px" : 0, overflow:"hidden" }}>
        {grp.rows.length === 0 && <p className="bsx-empty-row">No entries</p>}

        {cats
          ? (
            <div className={scrollable ? "bsx-rows-scroll" : ""}>
              {cats.map(({ cat, rows }) => (
                <React.Fragment key={cat}>
                  {cat && <div className="bsx-cat-label">{CAT_LABEL[cat] || cat}</div>}
                  {rows.map((r, i) => (
                    <div key={r.id||i} className={`bsx-row${cat?" bsx-row-indent":""}`}>
                      <span className="bsx-row-name">{r.name}</span>
                      <span className="bsx-row-amount">{fmt(Math.abs(r.amount||0))}</span>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          )
          : (
            <div className={scrollable ? "bsx-rows-scroll" : ""}>
              {grp.rows.map((r, i) => (
                <div key={r.id||i} className="bsx-row">
                  <span className="bsx-row-name">{r.name}</span>
                  <span className="bsx-row-amount">{fmt(Math.abs(r.amount||0))}</span>
                </div>
              ))}
            </div>
          )
        }

        <div className="bsx-sec-foot">
          <span className="bsx-sec-foot-lbl">Total {grp.subAccountType}</span>
          <span className="bsx-sec-foot-val">{fmt(Math.abs(grp.total))}</span>
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
    return <img src={logoUrl} alt={name} className="bsx-co-logo" onError={() => setErr(true)}/>;
  return <div className="bsx-co-logo-fb">{fb}</div>;
}

export default function BalanceSheet() {
  const [data,      setData]      = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [exporting, setExporting] = useState(false);
  const reportRef = useRef(null);

  const businessName = localStorage.getItem("businessName") || "Rice Mill";

  useEffect(() => {
    (async () => {
      try {
        const res  = await authFetch(`${API_BASE_URL}/balance-sheet`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || "Failed");
        setData(json);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    })();
  }, []);

  const handleExportPdf = async () => {
    if (!reportRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(reportRef.current, { scale:2, backgroundColor:"#ffffff", useCORS:true });
      const img    = canvas.toDataURL("image/png");
      const pdf    = new jsPDF("landscape","mm","a4");
      const pw     = pdf.internal.pageSize.getWidth();
      const ph     = pdf.internal.pageSize.getHeight();
      const ratio  = Math.min(pw/canvas.width, ph/canvas.height) * 0.93;
      pdf.addImage(img,"PNG",(pw-canvas.width*ratio)/2,(ph-canvas.height*ratio)/2,canvas.width*ratio,canvas.height*ratio);
      pdf.save(`balance-sheet-${new Date().toISOString().slice(0,10)}.pdf`);
    } catch(e) { console.error(e); }
    setExporting(false);
  };

  if (loading) return (
    <SidebarLayout><style>{FONTS}{CSS}</style>
      <div className="bsx">
        <div style={{ display:"flex",justifyContent:"space-between",marginBottom:24,alignItems:"flex-end",flexWrap:"wrap",gap:12 }}>
          <div><div className="bsx-sk" style={{ width:80,height:10,marginBottom:10 }}/><div className="bsx-sk" style={{ width:200,height:28 }}/></div>
          <div className="bsx-sk" style={{ width:130,height:38,borderRadius:10 }}/>
        </div>
        <div className="bsx-panel" style={{ minHeight:320 }}>
          <div style={{ padding:"20px 24px",background:"#f8fafc",borderBottom:"1.5px solid #f1f5f9",display:"flex",justifyContent:"center",gap:14,alignItems:"center" }}>
            <div className="bsx-sk" style={{ width:46,height:46,borderRadius:9 }}/><div><div className="bsx-sk" style={{ width:150,height:14,marginBottom:7 }}/><div className="bsx-sk" style={{ width:110,height:11 }}/></div>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr" }}>
            {[0,1].map(c=>(
              <div key={c} style={{ borderRight:c===0?"1.5px solid #f1f5f9":"none",padding:"14px 0" }}>
                {[0,1,2,3].map(r=>(
                  <div key={r} style={{ display:"flex",justifyContent:"space-between",padding:"10px 20px",borderBottom:"1px solid #f8fafc" }}>
                    <div className="bsx-sk" style={{ width:"55%",height:13 }}/><div className="bsx-sk" style={{ width:"22%",height:13 }}/>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
  if (!data) return null;

  const cur = data?.current || data;
  const isBalanced = data.isBalanced || Math.abs(cur.totalAssets - (cur.totalLiabilities + cur.totalEquity)) < 1;
  const today = new Date().toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"});

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <div className="bsx">

        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:14, marginBottom:22 }}>
          <div>
            <p className="bsx-eyebrow">Financial Reports</p>
            <h1 className="bsx-title">
              Balance Sheet
              <span className={`bsx-badge${isBalanced?"" : " bsx-badge-warn"}`}>
                {isBalanced
                  ? <><svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={{display:"inline-block",verticalAlign:"middle"}}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>&nbsp;Balanced</>
                  : "⚠ Out of balance"}
              </span>
            </h1>
            <p className="bsx-subtitle">As at {today}</p>
          </div>
          <button className="bsx-export-btn" onClick={handleExportPdf} disabled={exporting}>
            {exporting
              ? <><span className="bsx-spin"><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg></span>&nbsp;Exporting…</>
              : <><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>&nbsp;Export PDF</>}
          </button>
        </div>

        {/* Summary cards */}
        <div className="bsx-cards">
          <div className="bsx-card" style={{ "--c":"#4f46e5" }}>
            <p className="bsx-card-lbl">Total Assets</p>
            <p className="bsx-card-val">{fmt(cur.totalAssets)}</p>
          </div>
          <div className="bsx-card" style={{ "--c":"#d97706" }}>
            <p className="bsx-card-lbl">Total Liabilities</p>
            <p className="bsx-card-val">{fmt(cur.totalLiabilities)}</p>
          </div>
          <div className="bsx-card" style={{ "--c":"#059669" }}>
            <p className="bsx-card-lbl">Net Worth (Equity)</p>
            <p className="bsx-card-val">{fmt(cur.totalEquity)}</p>
          </div>
        </div>

        {/* Equation bar */}
        <div className="bsx-eq">
          <span className="bsx-eq-lbl">Equation</span>
          <span className="bsx-eq-num" style={{ color:"#4f46e5" }}>{fmt(cur.totalAssets)}</span>
          <span className="bsx-eq-sep">=</span>
          <span className="bsx-eq-num" style={{ color:"#d97706" }}>{fmt(cur.totalLiabilities)}</span>
          <span className="bsx-eq-sep">+</span>
          <span className="bsx-eq-num" style={{ color:"#059669" }}>{fmt(cur.totalEquity)}</span>
          <span className="bsx-eq-stat" style={{ color:isBalanced?"#059669":"#dc2626" }}>
            {isBalanced ? "✓ Assets = Liabilities + Equity" : "✗ Does not balance"}
          </span>
        </div>

        {/* Report panel */}
        <div ref={reportRef} className="bsx-panel">

          {/* Company header */}
          <div className="bsx-panel-head">
            <BusinessLogo name={businessName}/>
            <div style={{ textAlign:"center" }}>
              <p className="bsx-co-name">{businessName}</p>
              <p className="bsx-rep-sub">Balance Sheet</p>
              <p className="bsx-rep-date">As at {today}</p>
            </div>
          </div>

          {/* Two columns */}
          <div className="bsx-cols">

            {/* LEFT — Assets */}
            <div className="bsx-col-l">
              <div className="bsx-col-title">
                <span className="bsx-col-title-text">Assets</span>
              </div>
              {(cur.assetGroups||[]).map((grp, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <hr className="bsx-divider"/>}
                  <SubSection
                    grp={grp}
                    accent="#4f46e5"
                    bg="#f5f5ff"
                    border="#e0e7ff"
                    useCats={grp.subAccountType === "Current Assets"}
                  />
                </React.Fragment>
              ))}
              <div className="bsx-col-total">
                <span className="bsx-col-total-lbl">Total Assets</span>
                <span className="bsx-col-total-val">{fmt(cur.totalAssets)}</span>
              </div>
            </div>

            {/* RIGHT — Liabilities + Equity */}
            <div>
              <div className="bsx-col-title">
                <span className="bsx-col-title-text">Liabilities + Equity</span>
              </div>

              {/* Liabilities */}
              {(cur.liabilityGroups||[]).map((grp, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <hr className="bsx-divider"/>}
                  <SubSection grp={grp} accent="#d97706" bg="#fffbeb" border="#fde68a" useCats={false}/>
                </React.Fragment>
              ))}
              {cur.liabilityGroups?.length > 0 && (
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 20px",background:"#fffbeb",borderTop:"2px solid #fde68a" }}>
                  <span style={{ fontSize:10.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",color:"#92400e" }}>Total Liabilities</span>
                  <span style={{ fontFamily:"'DM Mono',monospace",fontSize:13.5,fontWeight:600,color:"#d97706" }}>{fmt(cur.totalLiabilities)}</span>
                </div>
              )}

              {/* Equity */}
              <hr className="bsx-divider"/>
              {(cur.equityGroups||[]).map((grp, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <hr className="bsx-divider"/>}
                  <SubSection grp={grp} accent="#059669" bg="#f0fdf4" border="#bbf7d0" useCats={false}/>
                </React.Fragment>
              ))}

              <div className="bsx-col-total">
                <span className="bsx-col-total-lbl">Total Liabilities &amp; Equity</span>
                <span className="bsx-col-total-val">{fmt(cur.totalLiabilities + cur.totalEquity)}</span>
              </div>
            </div>
          </div>

          {/* Totals bar */}
          <div className="bsx-totals">
            <div className="bsx-tot-cell">
              <p className="bsx-tot-lbl">Total Assets</p>
              <p className="bsx-tot-val" style={{ color:"#4f46e5" }}>{fmt(cur.totalAssets)}</p>
            </div>
            <div className="bsx-tot-cell">
              <p className="bsx-tot-lbl">Total Liabilities</p>
              <p className="bsx-tot-val" style={{ color:"#d97706" }}>{fmt(cur.totalLiabilities)}</p>
            </div>
            <div className="bsx-tot-cell">
              <p className="bsx-tot-lbl">Net Worth (Equity)</p>
              <p className="bsx-tot-val" style={{ color:"#059669" }}>{fmt(cur.totalEquity)}</p>
            </div>
          </div>
        </div>

        <p style={{ textAlign:"center", color:"#94a3b8", fontSize:11.5, marginTop:13, fontFamily:"'DM Mono',monospace" }}>
          Click any section header to expand or collapse
        </p>
      </div>
    </SidebarLayout>
  );
}