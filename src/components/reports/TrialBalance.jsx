import React, { useEffect, useState, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { authFetch } from "../../utils/authFetch";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  .tbx * { box-sizing: border-box; }
  .tbx {
    font-family: 'DM Sans', sans-serif; color: #1a1a2e;
    width: 100%; max-width: 860px; margin: 0 auto;
  }
  .tbx-eyebrow  { font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: #9ca3af; margin-bottom: 6px; }
  .tbx-title    { font-family: 'Lora', serif; font-size: 26px; font-weight: 700; color: #0f172a; letter-spacing: -.3px; line-height: 1.15; display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
  .tbx-subtitle { font-size: 13px; color: #94a3b8; margin-top: 5px; }

  .tbx-badge { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:600; font-family:'DM Sans',sans-serif; background:#ecfdf5; color:#059669; border:1px solid #a7f3d0; }
  .tbx-badge-warn { background:#fff7ed; color:#c2410c; border-color:#fed7aa; }

  .tbx-export-btn { display:inline-flex; align-items:center; gap:7px; padding:9px 18px; border-radius:10px; border:none; cursor:pointer; background:#0f172a; color:#fff; font-size:13px; font-weight:600; font-family:'DM Sans',sans-serif; box-shadow:0 2px 8px rgba(15,23,42,.18); transition:background .15s; white-space:nowrap; }
  .tbx-export-btn:hover:not(:disabled) { background:#1e293b; }
  .tbx-export-btn:disabled { opacity:.5; cursor:not-allowed; }

  /* summary cards */
  .tbx-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:18px; }
  .tbx-card { background:#fff; border:1.5px solid #e2e8f0; border-radius:14px; padding:18px 20px; position:relative; overflow:hidden; }
  .tbx-card::before { content:''; position:absolute; left:0; top:0; bottom:0; width:4px; border-radius:14px 0 0 14px; background:var(--c,#6366f1); }
  .tbx-card-lbl { font-size:11px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:#94a3b8; margin-bottom:8px; }
  .tbx-card-val { font-family:'DM Mono',monospace; font-size:22px; font-weight:500; color:#0f172a; letter-spacing:-.4px; line-height:1; }
  .tbx-card-sub { font-size:12px; color:#94a3b8; margin-top:7px; }

  .tbx-match-chip { display:inline-flex; align-items:center; gap:6px; padding:11px 18px; border-radius:12px; font-size:12.5px; font-weight:600; font-family:'DM Sans',sans-serif; white-space:nowrap; }
  .tbx-chip-ok   { background:#f0fdf4; color:#059669; border:1.5px solid #bbf7d0; }
  .tbx-chip-warn { background:#fef9c3; color:#854d0e; border:1.5px solid #fde68a; }

  /* report panel */
  .tbx-panel { background:#fff; border:1.5px solid #e2e8f0; border-radius:16px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,.06); }
  .tbx-panel-head { display:flex; align-items:center; justify-content:center; gap:14px; padding:20px 24px; border-bottom:1.5px solid #f1f5f9; background:linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%); }
  .tbx-co-name  { font-family:'Lora',serif; font-size:17px; font-weight:700; color:#0f172a; }
  .tbx-rep-sub  { font-family:'Lora',serif; font-size:13px; font-style:italic; font-weight:500; color:#64748b; margin-top:2px; }
  .tbx-rep-date { font-size:11.5px; color:#94a3b8; margin-top:2px; }
  .tbx-co-logo  { width:46px; height:46px; border-radius:9px; object-fit:cover; border:1px solid #e2e8f0; flex-shrink:0; }
  .tbx-co-logo-fb { width:46px; height:46px; border-radius:9px; background:#1e293b; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:800; color:#4ade80; flex-shrink:0; font-family:'DM Sans',sans-serif; }

  /* collapsible group */
  .tbx-group-head {
    display:flex; align-items:center; justify-content:space-between;
    padding:10px 18px; cursor:pointer; user-select:none;
    background:#f8fafc; border-top:2px solid #f1f5f9;
    transition:background .1s;
  }
  .tbx-group-head:hover { background:#f1f5f9; }
  .tbx-group-head:first-child { border-top:none; }
  .tbx-group-label { font-size:10.5px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:#64748b; display:flex; align-items:center; gap:8px; }
  .tbx-group-right { display:flex; align-items:center; gap:0; }
  .tbx-group-count { font-size:10.5px; font-weight:600; color:#94a3b8; background:#e2e8f0; padding:1px 7px; border-radius:4px; font-family:'DM Mono',monospace; margin-left:8px; }
  .tbx-chevron { color:#94a3b8; transition:transform .2s; flex-shrink:0; margin-left:10px; }
  .tbx-chevron.open { transform:rotate(180deg); }

  /* rows container — scrollable */
  .tbx-rows-wrap { overflow:hidden; transition:max-height .25s ease; }
  .tbx-rows-scroll { max-height:260px; overflow-y:auto; scrollbar-width:thin; scrollbar-color:#e2e8f0 transparent; }
  .tbx-rows-scroll::-webkit-scrollbar { width:4px; }
  .tbx-rows-scroll::-webkit-scrollbar-thumb { background:#d1d5db; border-radius:4px; }

  /* account row */
  .tbx-row { display:flex; align-items:center; padding:9px 18px; border-bottom:1px solid #f8fafc; transition:background .08s; }
  .tbx-row:hover { background:#fafafa; }
  .tbx-row-name  { flex:1; font-size:13px; color:#334155; padding-left:12px; }
  .tbx-row-ref   { width:100px; text-align:center; font-family:'DM Mono',monospace; font-size:11px; color:#94a3b8; flex-shrink:0; }
  .tbx-row-num   { width:120px; text-align:right; font-family:'DM Mono',monospace; font-size:12.5px; color:#0f172a; font-weight:500; white-space:nowrap; flex-shrink:0; }
  .tbx-row-empty { width:120px; text-align:right; color:#e5e7eb; flex-shrink:0; font-size:12.5px; }

  /* group subtotal */
  .tbx-subtotal { display:flex; align-items:center; justify-content:space-between; padding:9px 18px; background:#f5f5ff; border-top:1.5px solid #e0e7ff; }
  .tbx-subtotal-lbl { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:#6366f1; padding-left:12px; }
  .tbx-subtotal-nums { display:flex; gap:0; }
  .tbx-subtotal-num  { width:120px; text-align:right; font-family:'DM Mono',monospace; font-size:13px; font-weight:600; color:#4f46e5; }

  /* grand total */
  .tbx-grand { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; background:#1e293b; border-top:2px solid #0f172a; }
  .tbx-grand-lbl { font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:.08em; color:rgba(255,255,255,.6); padding-left:12px; }
  .tbx-grand-nums { display:flex; gap:0; }
  .tbx-grand-num  { width:120px; text-align:right; font-family:'DM Mono',monospace; font-size:14px; font-weight:600; color:#fff; white-space:nowrap; }

  /* table header */
  .tbx-thead { display:flex; align-items:center; padding:10px 18px; background:#1e293b; }
  .tbx-thead-name { flex:1; font-size:11px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:rgba(255,255,255,.65); padding-left:12px; }
  .tbx-thead-ref  { width:100px; text-align:center; font-size:11px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:rgba(255,255,255,.45); flex-shrink:0; }
  .tbx-thead-num  { width:120px; text-align:right; font-size:11px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:rgba(255,255,255,.65); flex-shrink:0; }

  @keyframes tbx-shimmer { to{background-position:-200% 0} }
  .tbx-sk { background:linear-gradient(90deg,#f1f5f9 25%,#f8fafc 50%,#f1f5f9 75%); background-size:200% 100%; animation:tbx-shimmer 1.4s infinite; border-radius:8px; }
  @keyframes tbx-spin { to{transform:rotate(360deg)} }
  .tbx-spin { animation:tbx-spin 1s linear infinite; display:inline-block; }

  @media(max-width:600px) {
    .tbx-cards { grid-template-columns:1fr !important; }
    .tbx-row-ref { display:none; }
    .tbx-thead-ref { display:none; }
  }
`;

const fmt  = v => Number(v||0).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0});
const fmtR = v => "Rs " + fmt(v);
const COLLAPSE_THRESHOLD = 6; // collapse if group has more than this many rows

function ChevronIcon({ open }) {
  return (
    <svg className={`tbx-chevron${open?" open":""}`} width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
    </svg>
  );
}

function CollapseGroup({ group }) {
  const [open, setOpen] = useState(group.rows.length <= COLLAPSE_THRESHOLD);
  const gD = group.rows.reduce((s,r) => s+(r.debit||0),  0);
  const gC = group.rows.reduce((s,r) => s+(r.credit||0), 0);
  const scrollable = group.rows.length > 8;

  return (
    <div>
      <div className="tbx-group-head" onClick={() => setOpen(o => !o)}>
        <span className="tbx-group-label">
          {group.type}
          <span className="tbx-group-count">{group.rows.length} accounts</span>
        </span>
        <div className="tbx-group-right">
          {gD > 0 && (
            <span style={{ width:120, textAlign:"right", fontFamily:"'DM Mono',monospace", fontSize:12, fontWeight:600, color:"#4f46e5", flexShrink:0 }}>
              {fmt(gD)}
            </span>
          )}
          {gD === 0 && <span style={{ width:120, textAlign:"right", fontSize:12, color:"#e2e8f0", flexShrink:0 }}>—</span>}
          {gC > 0 && (
            <span style={{ width:120, textAlign:"right", fontFamily:"'DM Mono',monospace", fontSize:12, fontWeight:600, color:"#059669", flexShrink:0 }}>
              {fmt(gC)}
            </span>
          )}
          {gC === 0 && <span style={{ width:120, textAlign:"right", fontSize:12, color:"#e2e8f0", flexShrink:0 }}>—</span>}
          <ChevronIcon open={open}/>
        </div>
      </div>

      <div className="tbx-rows-wrap" style={{ maxHeight: open ? "9999px" : 0, overflow:"hidden" }}>
        <div className={scrollable ? "tbx-rows-scroll" : ""}>
          {group.rows.map(r => (
            <div key={r.id} className="tbx-row">
              <span className="tbx-row-name">{r.name}</span>
              <span className="tbx-row-ref">{r.ledgerRef || "—"}</span>
              <span className={r.debit  ? "tbx-row-num"   : "tbx-row-empty"}>{r.debit  ? fmt(r.debit)  : "—"}</span>
              <span className={r.credit ? "tbx-row-num"   : "tbx-row-empty"}>{r.credit ? fmt(r.credit) : "—"}</span>
            </div>
          ))}
        </div>
        <div className="tbx-subtotal">
          <span className="tbx-subtotal-lbl">Subtotal — {group.type}</span>
          <div className="tbx-subtotal-nums">
            <span className="tbx-subtotal-num">{gD > 0 ? fmt(gD) : "—"}</span>
            <span className="tbx-subtotal-num">{gC > 0 ? fmt(gC) : "—"}</span>
          </div>
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
    return <img src={logoUrl} alt={name} className="tbx-co-logo" onError={() => setErr(true)}/>;
  return <div className="tbx-co-logo-fb">{fb}</div>;
}

export default function TrialBalance() {
  const [data,      setData]      = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [exporting, setExporting] = useState(false);
  const reportRef = useRef(null);

  const businessName = localStorage.getItem("businessName") || "Rice Mill";

  useEffect(() => {
    (async () => {
      try {
        const res  = await authFetch(`${API_BASE_URL}/trial-balance`);
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
      const pdf    = new jsPDF("portrait","mm","a4");
      const pw     = pdf.internal.pageSize.getWidth();
      const ph     = pdf.internal.pageSize.getHeight();
      const ratio  = Math.min((pw*0.92)/canvas.width, (ph-20)/canvas.height);
      pdf.addImage(img,"PNG",(pw-canvas.width*ratio)/2, 10, canvas.width*ratio, canvas.height*ratio);
      pdf.save(`trial-balance-${new Date().toISOString().slice(0,10)}.pdf`);
    } catch(e) { console.error(e); }
    setExporting(false);
  };

  if (loading) return (
    <SidebarLayout><style>{FONTS}{CSS}</style>
      <div className="tbx">
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:24, alignItems:"flex-end", flexWrap:"wrap", gap:12 }}>
          <div><div className="tbx-sk" style={{ width:80,height:10,marginBottom:10 }}/><div className="tbx-sk" style={{ width:200,height:28 }}/></div>
          <div className="tbx-sk" style={{ width:130,height:38,borderRadius:10 }}/>
        </div>
        <div className="tbx-cards">
          {[0,1,2].map(i=>(
            <div key={i} style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:14, padding:"18px 20px" }}>
              <div className="tbx-sk" style={{ width:"50%",height:10,marginBottom:11 }}/><div className="tbx-sk" style={{ width:"70%",height:22,marginBottom:10 }}/><div className="tbx-sk" style={{ width:"60%",height:9 }}/>
            </div>
          ))}
        </div>
        <div className="tbx-panel" style={{ minHeight:260 }}>
          <div style={{ padding:"20px 24px", background:"#f8fafc", borderBottom:"1.5px solid #f1f5f9", display:"flex", justifyContent:"center", gap:14, alignItems:"center" }}>
            <div className="tbx-sk" style={{ width:46,height:46,borderRadius:9 }}/><div><div className="tbx-sk" style={{ width:150,height:14,marginBottom:7 }}/><div className="tbx-sk" style={{ width:110,height:11 }}/></div>
          </div>
          <div style={{ height:42,background:"#1e293b" }}/>
          {[0,1,2,3,4,5].map(r=>(
            <div key={r} style={{ display:"flex",justifyContent:"space-between",padding:"10px 18px",borderBottom:"1px solid #f8fafc" }}>
              <div className="tbx-sk" style={{ width:r%4===0?"30%":"50%",height:r%4===0?10:13 }}/>
              <div style={{ display:"flex",gap:40 }}><div className="tbx-sk" style={{ width:80,height:13 }}/><div className="tbx-sk" style={{ width:80,height:13 }}/></div>
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
  if (!data) return null;

  const isBalanced = Math.abs((data.totalDebit||0)-(data.totalCredit||0)) < 1;
  const totalRows  = data.groups?.reduce((s,g) => s+(g.rows?.length||0), 0) || 0;
  const today      = new Date().toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"});

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <div className="tbx">

        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:14, marginBottom:24 }}>
          <div>
            <p className="tbx-eyebrow">Financial Reports</p>
            <h1 className="tbx-title">
              Trial Balance
              <span className={`tbx-badge${isBalanced?"" : " tbx-badge-warn"}`}>
                {isBalanced
                  ? <><svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={{display:"inline-block",verticalAlign:"middle"}}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>&nbsp;Balanced</>
                  : "⚠ Out of balance"}
              </span>
            </h1>
            <p className="tbx-subtitle">As at {today}</p>
          </div>
          <button className="tbx-export-btn" onClick={handleExportPdf} disabled={exporting}>
            {exporting
              ? <><span className="tbx-spin"><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg></span>&nbsp;Exporting…</>
              : <><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>&nbsp;Export PDF</>}
          </button>
        </div>

        {/* Summary */}
        <div className="tbx-cards">
          <div className="tbx-card" style={{ "--c":"#4f46e5" }}>
            <p className="tbx-card-lbl">Total Debit</p>
            <p className="tbx-card-val">{fmtR(data.totalDebit)}</p>
            <p className="tbx-card-sub">Sum of all debit balances</p>
          </div>
          <div className="tbx-card" style={{ "--c":"#059669" }}>
            <p className="tbx-card-lbl">Total Credit</p>
            <p className="tbx-card-val">{fmtR(data.totalCredit)}</p>
            <p className="tbx-card-sub">Sum of all credit balances</p>
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div className={`tbx-match-chip ${isBalanced?"tbx-chip-ok":"tbx-chip-warn"}`}>
              {isBalanced
                ? <><svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Debits = Credits</>
                : <>Difference: Rs {fmt(Math.abs((data.totalDebit||0)-(data.totalCredit||0)))}</>}
            </div>
          </div>
        </div>

        {/* Report panel */}
        <div ref={reportRef} className="tbx-panel">
          {/* Company header */}
          <div className="tbx-panel-head">
            <BusinessLogo name={businessName}/>
            <div style={{ textAlign:"center" }}>
              <p className="tbx-co-name">{businessName}</p>
              <p className="tbx-rep-sub">Trial Balance</p>
              <p className="tbx-rep-date">As at {today}</p>
            </div>
          </div>

          {/* Table header */}
          <div className="tbx-thead">
            <span className="tbx-thead-name">Account Title</span>
            <span className="tbx-thead-ref">Ledger Ref (L.F.)</span>
            <span className="tbx-thead-num">Debit (PKR)</span>
            <span className="tbx-thead-num">Credit (PKR)</span>
          </div>

          {/* Collapsible groups */}
          {data.groups?.map(group => (
            <CollapseGroup key={group.type} group={group}/>
          ))}

          {/* Grand total */}
          <div className="tbx-grand">
            <span className="tbx-grand-lbl">Totals · {totalRows} accounts</span>
            <div className="tbx-grand-nums">
              <span className="tbx-grand-num">{fmtR(data.totalDebit)}</span>
              <span className="tbx-grand-num">{fmtR(data.totalCredit)}</span>
            </div>
          </div>
        </div>

        <p style={{ textAlign:"center", color:"#94a3b8", fontSize:12, marginTop:14, fontFamily:"'DM Mono',monospace" }}>
          {totalRows} account{totalRows!==1?"s":""} · {data.groups?.length||0} categories
          {" · "}
          <span style={{ color:"#94a3b8", fontSize:12, fontFamily:"'DM Mono',monospace" }}>
            Tip: click a category header to expand / collapse
          </span>
        </p>
      </div>
    </SidebarLayout>
  );
}