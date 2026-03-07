import React, { useEffect, useState, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { authFetch } from "../../utils/authFetch";

/* ─── Fonts ─────────────────────────────────────────────────────────────── */
const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
`;

/* ─── CSS — all classes prefixed .bsx- to avoid global conflicts ─────────── */
const CSS = `
  .bsx-wrap *, .bsx-wrap *::before, .bsx-wrap *::after { box-sizing: border-box; }

  .bsx-wrap {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
    width: 100%;
    max-width: 1080px;
  }

  /* eyebrow + title */
  .bsx-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: .12em;
    text-transform: uppercase; color: #9ca3af; margin-bottom: 6px;
  }
  .bsx-title {
    font-family: 'Lora', serif; font-size: 26px; font-weight: 700;
    color: #0f172a; letter-spacing: -.3px; line-height: 1.15;
    display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  }
  .bsx-subtitle { font-size: 13px; color: #94a3b8; margin-top: 5px; }

  /* balanced badge */
  .bsx-badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; font-style: normal;
    background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0;
  }
  .bsx-badge-warn { background: #fff7ed; color: #c2410c; border-color: #fed7aa; }

  /* export button */
  .bsx-export-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px; border-radius: 10px; border: none; cursor: pointer;
    background: #0f172a; color: #fff; font-size: 13px; font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    box-shadow: 0 2px 8px rgba(15,23,42,.18);
    transition: background .15s, box-shadow .15s; white-space: nowrap;
  }
  .bsx-export-btn:hover:not(:disabled) { background: #1e293b; box-shadow: 0 4px 14px rgba(15,23,42,.26); }
  .bsx-export-btn:disabled { opacity: .5; cursor: not-allowed; }

  /* nav pills */
  .bsx-nav-pill {
    padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600;
    border: 1.5px solid #e2e8f0; background: #fff; color: #64748b;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .12s;
    white-space: nowrap;
  }
  .bsx-nav-pill:hover { border-color: #94a3b8; color: #334155; background: #f8fafc; }

  /* equation bar */
  .bsx-eq-bar {
    display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
    background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px;
    padding: 11px 18px; margin-bottom: 20px;
  }
  .bsx-eq-label {
    font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
    color: #94a3b8; font-family: 'DM Sans', sans-serif;
  }
  .bsx-eq-sep { color: #cbd5e1; font-size: 15px; font-family: 'DM Mono', monospace; }
  .bsx-eq-num { font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 500; }
  .bsx-eq-status {
    margin-left: auto; font-size: 11.5px; font-weight: 600; font-family: 'DM Sans', sans-serif;
  }

  /* summary cards */
  .bsx-card {
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px;
    padding: 18px 20px; cursor: pointer; transition: box-shadow .15s, transform .15s;
    width: 100%; text-align: left; position: relative; overflow: hidden;
    display: block;
  }
  .bsx-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 4px; border-radius: 14px 0 0 14px; background: var(--bsx-accent, #6366f1);
  }
  .bsx-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,.07); transform: translateY(-1px); }
  .bsx-card-lbl {
    font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
    color: #94a3b8; margin-bottom: 8px;
  }
  .bsx-card-val {
    font-family: 'DM Mono', monospace; font-size: 20px; font-weight: 500;
    color: #0f172a; letter-spacing: -.4px; line-height: 1;
  }
  .bsx-delta {
    display: inline-flex; align-items: center; gap: 3px;
    margin-top: 9px; font-size: 11px; font-weight: 600; padding: 2px 7px;
    border-radius: 6px; font-family: 'DM Sans', sans-serif;
  }
  .bsx-delta-up   { background: #ecfdf5; color: #059669; }
  .bsx-delta-dn   { background: #fef2f2; color: #dc2626; }
  .bsx-delta-flat { background: #f1f5f9; color: #94a3b8; }

  /* report panel */
  .bsx-report-panel {
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 16px;
    overflow: hidden; box-shadow: 0 1px 6px rgba(0,0,0,.05);
  }
  .bsx-report-head {
    display: flex; align-items: center; justify-content: center; gap: 14px;
    padding: 20px 24px; border-bottom: 1.5px solid #f1f5f9;
    background: linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%);
  }
  .bsx-company-name { font-family: 'Lora', serif; font-size: 16px; font-weight: 600; color: #0f172a; }
  .bsx-report-date  { font-size: 11.5px; color: #94a3b8; margin-top: 2px; }

  /* two columns */
  .bsx-two-col { display: grid; grid-template-columns: 1fr 1fr; }
  .bsx-col-left { border-right: 1.5px solid #f1f5f9; }

  /* section */
  .bsx-sec-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 22px; background: var(--bsx-bg,#f8fafc); border-bottom: 1.5px solid var(--bsx-border,#f1f5f9);
  }
  .bsx-sec-name {
    display: flex; align-items: center; gap: 7px;
    font-family: 'Lora', serif; font-size: 14px; font-weight: 600;
    color: var(--bsx-accent,#6366f1); font-style: italic;
  }
  .bsx-sec-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--bsx-accent,#6366f1); flex-shrink: 0;
  }
  .bsx-sec-count {
    font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
    color: #94a3b8; font-style: normal; margin-left: 3px;
  }
  .bsx-sec-total {
    font-family: 'DM Mono', monospace; font-size: 14px; font-weight: 500;
    color: var(--bsx-accent,#6366f1);
  }

  /* row */
  .bsx-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 22px; border-bottom: 1px solid #f8fafc; transition: background .08s;
  }
  .bsx-row:last-of-type { border-bottom: none; }
  .bsx-row:hover { background: #f8fafc; }
  .bsx-row-name   { font-size: 13px; color: #334155; font-weight: 400; }
  .bsx-row-amount {
    font-family: 'DM Mono', monospace; font-size: 12.5px; color: #0f172a;
    font-weight: 500; white-space: nowrap; margin-left: 14px;
  }

  /* section footer */
  .bsx-sec-foot {
    display: flex; align-items: center; justify-content: space-between;
    padding: 11px 22px; background: var(--bsx-bg,#f8fafc); border-top: 2px solid var(--bsx-border,#f1f5f9);
  }
  .bsx-sec-foot-lbl {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .06em; color: #64748b;
  }
  .bsx-sec-foot-val {
    font-family: 'DM Mono', monospace; font-size: 13.5px; font-weight: 500;
    color: var(--bsx-accent,#6366f1);
  }

  /* prev period line */
  .bsx-prev-line {
    display: flex; align-items: center; justify-content: space-between;
    padding: 7px 22px; border-top: 1px solid #f1f5f9; background: #fafcff;
  }
  .bsx-prev-txt { font-size: 11px; color: #94a3b8; font-weight: 500; }
  .bsx-chip {
    font-size: 10.5px; font-weight: 600; padding: 1px 7px; border-radius: 5px;
  }
  .bsx-chip-up   { background: #ecfdf5; color: #059669; }
  .bsx-chip-dn   { background: #fef2f2; color: #dc2626; }
  .bsx-chip-flat { background: #f1f5f9; color: #94a3b8; }

  /* empty */
  .bsx-empty-row { padding: 16px 22px; font-size: 13px; color: #cbd5e1; font-style: italic; }

  /* totals bar */
  .bsx-totals-bar {
    display: grid; grid-template-columns: repeat(3,1fr);
    border-top: 2px solid #f1f5f9; background: #fafcff;
  }
  .bsx-total-cell { padding: 15px 22px; text-align: center; }
  .bsx-total-cell + .bsx-total-cell { border-left: 1.5px solid #f1f5f9; }
  .bsx-total-cell-lbl {
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: #94a3b8; margin-bottom: 5px;
  }
  .bsx-total-cell-val {
    font-family: 'DM Mono', monospace; font-size: 15px; font-weight: 500; letter-spacing: -.3px;
  }

  /* skeleton */
  @keyframes bsx-shimmer { to { background-position: -200% 0; } }
  .bsx-sk {
    background: linear-gradient(90deg,#f1f5f9 25%,#f8fafc 50%,#f1f5f9 75%);
    background-size: 200% 100%; animation: bsx-shimmer 1.4s infinite; border-radius: 8px;
  }
  @keyframes bsx-rotate { to { transform: rotate(360deg); } }
  .bsx-spin { animation: bsx-rotate 1s linear infinite; display: inline-block; }

  /* responsive */
  @media (max-width: 680px) {
    .bsx-two-col { grid-template-columns: 1fr !important; }
    .bsx-col-left { border-right: none !important; border-bottom: 1.5px solid #f1f5f9 !important; }
    .bsx-totals-bar { grid-template-columns: 1fr !important; }
    .bsx-total-cell + .bsx-total-cell { border-left: none !important; border-top: 1.5px solid #f1f5f9 !important; }
    .bsx-cards { grid-template-columns: 1fr !important; }
  }
`;

/* ─── Helpers ── */
const fmt  = (v) => "Rs " + Number(v||0).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0});
const dCls = (d)  => d > 0 ? "up" : d < 0 ? "dn" : "flat";
const dArr = (d)  => d > 0 ? "↑" : d < 0 ? "↓" : "—";

/* ─── Summary Card ── */
function SummaryCard({ label, value, prev, accent, onClick }) {
  const diff = value - prev;
  const cls  = dCls(diff);
  return (
    <button className="bsx-card" style={{ "--bsx-accent": accent }} onClick={onClick}>
      <p className="bsx-card-lbl">{label}</p>
      <p className="bsx-card-val">{fmt(value)}</p>
      <span className={`bsx-delta bsx-delta-${cls}`}>
        {dArr(diff)}&nbsp;
        {diff === 0
          ? "No change from last period"
          : `${fmt(Math.abs(diff))} ${diff > 0 ? "more" : "less"} than last`}
      </span>
    </button>
  );
}

/* ─── Section ── */
const BSSection = React.forwardRef(
  ({ title, rows, total, prevTotal, accent, bg, border }, ref) => {
    const diff = total - prevTotal;
    const cls  = dCls(diff);
    return (
      <div ref={ref} style={{ "--bsx-accent": accent, "--bsx-bg": bg, "--bsx-border": border }}>
        <div className="bsx-sec-head">
          <div className="bsx-sec-name">
            <span className="bsx-sec-dot"/>
            {title}
            <span className="bsx-sec-count">{rows.length} item{rows.length !== 1 ? "s" : ""}</span>
          </div>
          <span className="bsx-sec-total">{fmt(total)}</span>
        </div>

        {rows.length === 0
          ? <p className="bsx-empty-row">No entries</p>
          : rows.map((r, i) => (
            <div key={r.id || i} className="bsx-row">
              <span className="bsx-row-name">{r.name}</span>
              <span className="bsx-row-amount">{fmt(Number(r.amount) || 0)}</span>
            </div>
          ))
        }

        <div className="bsx-sec-foot">
          <span className="bsx-sec-foot-lbl">Total {title}</span>
          <span className="bsx-sec-foot-val">{fmt(total)}</span>
        </div>

        {prevTotal > 0 && (
          <div className="bsx-prev-line">
            <span className="bsx-prev-txt">
              Prev:&nbsp;<span style={{ fontFamily:"'DM Mono',monospace" }}>{fmt(prevTotal)}</span>
            </span>
            <span className={`bsx-chip bsx-chip-${cls}`}>
              {dArr(diff)}&nbsp;{diff === 0 ? "No change" : `${fmt(Math.abs(diff))} ${diff > 0 ? "more" : "less"}`}
            </span>
          </div>
        )}
      </div>
    );
  }
);

/* ─── Skeleton ── */
function Skeleton() {
  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <div className="bsx-wrap">
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:26, alignItems:"flex-end", flexWrap:"wrap", gap:12 }}>
          <div>
            <div className="bsx-sk" style={{ width:90, height:10, marginBottom:10 }}/>
            <div className="bsx-sk" style={{ width:200, height:28 }}/>
          </div>
          <div className="bsx-sk" style={{ width:130, height:38, borderRadius:10 }}/>
        </div>
        <div className="bsx-cards" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:18 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:14, padding:"18px 20px" }}>
              <div className="bsx-sk" style={{ width:"50%", height:10, marginBottom:11 }}/>
              <div className="bsx-sk" style={{ width:"70%", height:22, marginBottom:10 }}/>
              <div className="bsx-sk" style={{ width:"85%", height:9 }}/>
            </div>
          ))}
        </div>
        <div className="bsx-sk" style={{ height:44, borderRadius:12, marginBottom:20 }}/>
        <div className="bsx-report-panel" style={{ minHeight:280 }}>
          <div style={{ padding:"20px 24px", background:"#f8fafc", borderBottom:"1.5px solid #f1f5f9", display:"flex", justifyContent:"center", gap:14, alignItems:"center" }}>
            <div className="bsx-sk" style={{ width:44, height:44, borderRadius:8 }}/>
            <div>
              <div className="bsx-sk" style={{ width:150, height:14, marginBottom:7 }}/>
              <div className="bsx-sk" style={{ width:110, height:11 }}/>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
            {[0,1].map(c => (
              <div key={c} style={{ borderRight: c===0 ? "1.5px solid #f1f5f9" : "none" }}>
                <div style={{ padding:"13px 22px", background:"#f8fafc", borderBottom:"1.5px solid #f1f5f9" }}>
                  <div className="bsx-sk" style={{ width:70, height:12 }}/>
                </div>
                {[0,1,2,3].map(r => (
                  <div key={r} style={{ display:"flex", justifyContent:"space-between", padding:"10px 22px", borderBottom:"1px solid #f8fafc" }}>
                    <div className="bsx-sk" style={{ width:"55%", height:13 }}/>
                    <div className="bsx-sk" style={{ width:"22%", height:13 }}/>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function BalanceSheet() {
  const [data,      setData]      = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [exporting, setExporting] = useState(false);

  const reportRef = useRef(null);
  const assetsRef = useRef(null);
  const liabRef   = useRef(null);
  const equityRef = useRef(null);

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

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior:"smooth", block:"start" });

  const handleExportPdf = async () => {
    if (!reportRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(reportRef.current, { scale:2, backgroundColor:"#ffffff" });
      const img    = canvas.toDataURL("image/png");
      const pdf    = new jsPDF("landscape","mm","a4");
      const pw     = pdf.internal.pageSize.getWidth();
      const ph     = pdf.internal.pageSize.getHeight();
      const ratio  = Math.min(pw / canvas.width, ph / canvas.height) * 0.95;
      pdf.addImage(img,"PNG",(pw-canvas.width*ratio)/2,(ph-canvas.height*ratio)/2,canvas.width*ratio,canvas.height*ratio);
      pdf.save(`balance-sheet-${new Date().toISOString().slice(0,10)}.pdf`);
    } catch (e) { console.error(e); }
    setExporting(false);
  };

  if (loading) return <Skeleton/>;
  if (!data)   return null;

  const cur  = data?.current  || data;
  const prev = data?.previous || { assets:[], liabilities:[], equity:[], totalAssets:0, totalLiabilities:0, totalEquity:0 };

  const isBalanced = data.isBalanced ||
    Math.abs(cur.totalAssets - (cur.totalLiabilities + cur.totalEquity)) < 1;

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>

      <div className="bsx-wrap">

        {/* ── Header ── */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:14, marginBottom:26 }}>
          <div>
            <p className="bsx-eyebrow">Financial Reports</p>
            <h1 className="bsx-title">
              Balance Sheet
              <span className={`bsx-badge${isBalanced ? "" : " bsx-badge-warn"}`}>
                {isBalanced
                  ? <><svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={{display:"inline-block",verticalAlign:"middle"}}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>&nbsp;Balanced</>
                  : "⚠ Out of balance"
                }
              </span>
            </h1>
            <p className="bsx-subtitle">
              As at {new Date().toLocaleDateString("en-PK",{ year:"numeric", month:"long", day:"numeric" })}
            </p>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
            <button className="bsx-nav-pill" onClick={() => scrollTo(assetsRef)}>Assets</button>
            <button className="bsx-nav-pill" onClick={() => scrollTo(liabRef)}>Liabilities</button>
            <button className="bsx-nav-pill" onClick={() => scrollTo(equityRef)}>Equity</button>
            <button className="bsx-export-btn" onClick={handleExportPdf} disabled={exporting}>
              {exporting
                ? <><span className="bsx-spin">
                    <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                  </span>&nbsp;Exporting…</>
                : <><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>&nbsp;Export PDF</>
              }
            </button>
          </div>
        </div>

        {/* ── Summary cards ── */}
        <div className="bsx-cards" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:18 }}>
          <SummaryCard label="What we own"  value={cur.totalAssets}      prev={prev.totalAssets}      accent="#4f46e5" onClick={() => scrollTo(assetsRef)}/>
          <SummaryCard label="What we owe"  value={cur.totalLiabilities} prev={prev.totalLiabilities} accent="#d97706" onClick={() => scrollTo(liabRef)}/>
          <SummaryCard label="Net worth"    value={cur.totalEquity}      prev={prev.totalEquity}      accent="#059669" onClick={() => scrollTo(equityRef)}/>
        </div>

        {/* ── Equation bar ── */}
        <div className="bsx-eq-bar">
          <span className="bsx-eq-label">Formula</span>
          <span className="bsx-eq-num" style={{ color:"#4f46e5" }}>{fmt(cur.totalAssets)}</span>
          <span className="bsx-eq-sep">=</span>
          <span className="bsx-eq-num" style={{ color:"#d97706" }}>{fmt(cur.totalLiabilities)}</span>
          <span className="bsx-eq-sep">+</span>
          <span className="bsx-eq-num" style={{ color:"#059669" }}>{fmt(cur.totalEquity)}</span>
          <span className="bsx-eq-status" style={{ color: isBalanced ? "#059669" : "#dc2626" }}>
            {isBalanced ? "✓ Assets = Liabilities + Equity" : "✗ Does not balance"}
          </span>
        </div>

        {/* ── Report panel (PDF target) ── */}
        <div ref={reportRef} className="bsx-report-panel">

          {/* company header */}
          <div className="bsx-report-head">
            <img
              src="/logo.png" alt="logo"
              style={{ width:44, height:44, objectFit:"contain", borderRadius:8, border:"1px solid #e2e8f0" }}
              onError={e => { e.currentTarget.style.display = "none"; }}
            />
            <div style={{ textAlign:"center" }}>
              <p className="bsx-company-name">Al Rehman Rice Mills</p>
              <p className="bsx-report-date">
                Balance Sheet &middot; {new Date().toLocaleDateString("en-PK",{ year:"numeric", month:"long", day:"numeric" })}
              </p>
            </div>
          </div>

          {/* two columns */}
          <div className="bsx-two-col">
            <div className="bsx-col-left">
              <BSSection
                ref={assetsRef}
                title="Assets"
                rows={cur.assets}
                total={cur.totalAssets}
                prevTotal={prev.totalAssets}
                accent="#4f46e5"
                bg="#f5f5ff"
                border="#e0e7ff"
              />
            </div>
            <div>
              <BSSection
                ref={liabRef}
                title="Liabilities"
                rows={cur.liabilities}
                total={cur.totalLiabilities}
                prevTotal={prev.totalLiabilities}
                accent="#d97706"
                bg="#fffbeb"
                border="#fde68a"
              />
              <div style={{ borderTop:"2px solid #f1f5f9" }}>
                <BSSection
                  ref={equityRef}
                  title="Equity"
                  rows={cur.equity}
                  total={cur.totalEquity}
                  prevTotal={prev.totalEquity}
                  accent="#059669"
                  bg="#f0fdf4"
                  border="#bbf7d0"
                />
              </div>
            </div>
          </div>

          {/* totals bar */}
          <div className="bsx-totals-bar">
            <div className="bsx-total-cell">
              <p className="bsx-total-cell-lbl">Total Assets</p>
              <p className="bsx-total-cell-val" style={{ color:"#4f46e5" }}>{fmt(cur.totalAssets)}</p>
            </div>
            <div className="bsx-total-cell">
              <p className="bsx-total-cell-lbl">Total Liabilities</p>
              <p className="bsx-total-cell-val" style={{ color:"#d97706" }}>{fmt(cur.totalLiabilities)}</p>
            </div>
            <div className="bsx-total-cell">
              <p className="bsx-total-cell-lbl">Net Worth (Equity)</p>
              <p className="bsx-total-cell-val" style={{ color:"#059669" }}>{fmt(cur.totalEquity)}</p>
            </div>
          </div>

        </div>
      </div>
    </SidebarLayout>
  );
}