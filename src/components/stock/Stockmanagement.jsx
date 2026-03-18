import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');`;

const CSS = `
  *,*::before,*::after{box-sizing:border-box}
  .sm-wrap{font-family:'Plus Jakarta Sans',sans-serif;color:#111827;max-width:1200px;margin:0 auto}
  .sm-mono{font-family:'JetBrains Mono',monospace}

  /* Stats */
  .sm-stat{background:#fff;border:1.5px solid #f1f5f9;border-radius:14px;padding:16px 18px;transition:box-shadow .18s}
  .sm-stat:hover{box-shadow:0 4px 16px rgba(0,0,0,.06)}

  /* Ledger table */
  .sm-table{width:100%;border-collapse:collapse;font-size:12.5px}
  .sm-table thead th{
    background:#0f172a;color:#e2e8f0;padding:10px 14px;text-align:left;
    font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;
    white-space:nowrap;
  }
  .sm-table thead th.r{text-align:right}
  .sm-table thead th.c{text-align:center}
  .sm-table tbody tr{border-bottom:1px solid #f8fafc;transition:background .08s}
  .sm-table tbody tr:hover{background:#f8fafc}

  /* Purchase row (stock in) */
  .sm-row-purchase{background:#fafffe}
  .sm-row-purchase:hover{background:#f0fdf9 !important}

  /* Sale row (stock out) */
  .sm-row-sale{background:#fefcff}
  .sm-row-sale:hover{background:#f5f3ff !important}

  /* Summary total row */
  .sm-row-total td{background:#f1f5f9;font-weight:700;border-top:2px solid #e2e8f0}

  .sm-td{padding:11px 14px;vertical-align:top}
  .sm-td-r{padding:11px 14px;text-align:right;vertical-align:top;white-space:nowrap}
  .sm-td-c{padding:11px 14px;text-align:center;vertical-align:top}

  /* Type badge */
  .sm-badge-purchase{
    display:inline-flex;align-items:center;gap:4px;
    padding:2px 9px;border-radius:20px;font-size:10px;font-weight:700;
    background:#dcfce7;color:#16a34a;border:1px solid #bbf7d0;white-space:nowrap;
  }
  .sm-badge-sale{
    display:inline-flex;align-items:center;gap:4px;
    padding:2px 9px;border-radius:20px;font-size:10px;font-weight:700;
    background:#ede9fe;color:#7c3aed;border:1px solid #ddd6fe;white-space:nowrap;
  }

  /* Debit/Credit cells */
  .sm-debit{color:#0f172a;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600}
  .sm-credit{color:#0f172a;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600}
  .sm-debit-in{color:#16a34a}
  .sm-credit-out{color:#7c3aed}
  .sm-zero{color:#d1d5db}

  /* Filters */
  .sm-input,.sm-select{
    border:1.5px solid #e2e8f0;border-radius:10px;padding:8px 12px;
    font-size:13px;font-family:'Plus Jakarta Sans',sans-serif;color:#111827;
    background:#fff;outline:none;transition:border-color .12s,box-shadow .12s;
    appearance:none;
  }
  .sm-input:focus,.sm-select:focus{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.1)}
  .sm-input::placeholder{color:#9ca3af}

  /* Running balance strip */
  .sm-balance-row td{background:#fafafa;font-size:11px;color:#64748b;border-top:1px solid #f1f5f9}

  /* Print button */
  .sm-print-btn{
    display:inline-flex;align-items:center;gap:6px;
    background:#0f172a;color:#fff;border:none;border-radius:9px;
    padding:9px 16px;font-size:12.5px;font-weight:600;
    font-family:'Plus Jakarta Sans',sans-serif;cursor:pointer;
    transition:background .12s;white-space:nowrap;
  }
  .sm-print-btn:hover{background:#1e293b}

  /* Skeleton */
  @keyframes sm-shimmer{to{background-position:-200% 0}}
  .sm-sk{
    background:linear-gradient(90deg,#f3f4f6 25%,#fafafa 50%,#f3f4f6 75%);
    background-size:200% 100%;animation:sm-shimmer 1.3s infinite;border-radius:6px;
  }

  @media print{
    .sm-no-print{display:none!important}
    .sm-wrap{max-width:100%;padding:0}
    .sm-table{font-size:10px}
    .sm-td,.sm-td-r{padding:6px 8px}
  }
`;

const n   = v => isNaN(Number(v)) ? 0 : Number(v) || 0;
const fmt = (v, d = 2) => n(v).toLocaleString("en-PK", { minimumFractionDigits: d, maximumFractionDigits: d });
const fmt0 = v => n(v).toLocaleString("en-PK", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmt4 = v => n(v).toLocaleString("en-PK", { minimumFractionDigits: 4, maximumFractionDigits: 4 });

function StatCard({ label, value, sub, accent, prefix, mono }) {
  return (
    <div className="sm-stat">
      <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase",
        letterSpacing: ".08em", color: "#9ca3af", marginBottom: 8 }}>{label}</p>
      <p style={{ fontSize: 20, fontWeight: 800, color: accent || "#111827",
        lineHeight: 1, fontFamily: mono ? "'JetBrains Mono',monospace" : undefined }}>
        {prefix && <span style={{ fontSize: 13, color: accent || "#9ca3af", marginRight: 3 }}>{prefix}</span>}
        {value}
      </p>
      {sub && <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 5 }}>{sub}</p>}
    </div>
  );
}

/* ─── Print HTML ─────────────────────────────────────────── */
function buildPrintHTML(entries, summary, dateRange) {
  const rows = entries.map(e => {
    const isPurchase = e.type === "purchase";
    const debitLabel  = isPurchase ? "Stock / Product" : e.vendorName;
    const creditLabel = isPurchase ? e.vendorName      : "Stock / Product";
    return `
      <tr style="background:${isPurchase ? "#f0fdf4" : "#faf5ff"}">
        <td>${e.date}</td>
        <td>${e.invoiceNo}</td>
        <td>
          <div style="margin-bottom:4px">
            <span style="font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;background:${isPurchase?"#dcfce7":"#ede9fe"};color:${isPurchase?"#16a34a":"#7c3aed"}">DR</span>
            <strong style="margin-left:4px">${e.drAccountName}</strong>
            ${isPurchase ? `<div style="font-size:9px;color:#64748b;margin-left:26px">${e.productName}</div>` : ""}
          </div>
          <div style="padding-left:8px;border-left:2px solid #e2e8f0">
            <span style="font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;background:${!isPurchase?"#ede9fe":"#dcfce7"};color:${!isPurchase?"#7c3aed":"#16a34a"}">CR</span>
            <span style="margin-left:4px;color:#374151">${e.crAccountName}</span>
            ${!isPurchase ? `<div style="font-size:9px;color:#64748b;margin-left:26px">${e.productName}</div>` : ""}
          </div>
        </td>
        <td style="font-size:10px;color:#475569">
          ${e.quantity} bags &bull; ${fmt4(e.maund)} Maund<br>
          Rate: Rs ${fmt0(e.rate)} &bull; ${e.vehicleNo}
        </td>
        <td style="text-align:center">
          <span style="font-size:9px;font-weight:700;padding:2px 7px;border-radius:20px;background:${isPurchase?"#dcfce7":"#ede9fe"};color:${isPurchase?"#16a34a":"#7c3aed"};border:1px solid ${isPurchase?"#bbf7d0":"#ddd6fe"}">
            ${isPurchase ? "IN" : "OUT"}
          </span>
        </td>
        <td style="text-align:right;font-family:'Courier New',monospace;font-weight:700;color:#16a34a">
          <div style="font-size:8px;color:#16a34a;font-weight:400;margin-bottom:2px">DR · ${e.drAccountName}</div>
          Rs ${fmt(e.debit)}
        </td>
        <td style="text-align:right;font-family:'Courier New',monospace;font-weight:700;color:#7c3aed">
          <div style="font-size:8px;color:#7c3aed;font-weight:400;margin-bottom:2px">CR · ${e.crAccountName}</div>
          Rs ${fmt(e.credit)}
        </td>
      </tr>
    `;
  }).join("");

  return `<!DOCTYPE html><html><head><title>Stock Management Ledger</title>
<style>
@page{size:A4 landscape;margin:10mm}
body{font-family:"Segoe UI",Arial,sans-serif;color:#111;font-size:11px}
.wrap{max-width:100%;margin:auto}
.head{border-bottom:3px solid #0f172a;padding-bottom:8px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:flex-start}
.co-name{font-size:16px;font-weight:800;color:#0f172a}
.co-addr{font-size:9px;color:#64748b;margin-top:2px}
.rpt-title{text-align:right}
.rpt-title h2{margin:0;font-size:14px;color:#4f46e5}
.rpt-title p{font-size:9px;color:#94a3b8;margin-top:2px}
.summary{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px}
.sum-box{border:1px solid #e2e8f0;border-radius:6px;padding:7px 10px}
.sum-lbl{font-size:8px;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-bottom:3px}
.sum-val{font-size:13px;font-weight:700;color:#0f172a;font-family:'Courier New',monospace}
table{width:100%;border-collapse:collapse;font-size:10px}
thead tr{background:#0f172a;color:#e2e8f0}
th{padding:6px 8px;text-align:left;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em}
th.r{text-align:right}th.c{text-align:center}
td{border:1px solid #e2e8f0;padding:5px 8px;vertical-align:top}
.foot td{font-weight:700;background:#f1f5f9;border-top:2px solid #0f172a}
.foot td.r{text-align:right}
</style></head><body>
<div class="wrap">
<div class="head">
  <div>
    <div class="co-name">Al Rehman Rice Mills</div>
    <div class="co-addr">Deepalpur Road, Babarkhai, Arzanipur, Chunian, Kasur – Pakistan</div>
  </div>
  <div class="rpt-title">
    <h2>STOCK MANAGEMENT LEDGER</h2>
    <p>Printed: ${new Date().toLocaleDateString("en-PK", { day:"2-digit", month:"short", year:"numeric" })}${dateRange ? " &bull; " + dateRange : ""}</p>
  </div>
</div>
<div class="summary">
  <div class="sum-box"><div class="sum-lbl">Total Stock In (Rs)</div><div class="sum-val">Rs ${fmt(summary.totalStockIn)}</div></div>
  <div class="sum-box"><div class="sum-lbl">Total Stock Out (Rs)</div><div class="sum-val">Rs ${fmt(summary.totalStockOut)}</div></div>
  <div class="sum-box"><div class="sum-lbl">Maund In / Out</div><div class="sum-val">${fmt4(summary.totalMaundIn)} / ${fmt4(summary.totalMaundOut)}</div></div>
  <div class="sum-box"><div class="sum-lbl">Bags In / Out</div><div class="sum-val">${fmt0(summary.totalQtyIn)} / ${fmt0(summary.totalQtyOut)}</div></div>
</div>
<table>
  <thead><tr>
    <th>Date</th><th>Invoice</th><th>Particulars</th><th>Description</th>
    <th class="c">Type</th><th class="r">Debit (Stock In)</th><th class="r">Credit (Stock Out)</th>
  </tr></thead>
  <tbody>${rows}</tbody>
  <tfoot class="foot">
    <tr>
      <td colspan="5"><strong>TOTALS (${entries.length} entries)</strong></td>
      <td class="r"><strong>Rs ${fmt(summary.totalStockIn)}</strong></td>
      <td class="r"><strong>Rs ${fmt(summary.totalStockOut)}</strong></td>
    </tr>
  </tfoot>
</table>
<p style="text-align:center;margin-top:20px;font-size:9px;color:#94a3b8">
  Stock Management Ledger — Al Rehman Rice Mills &bull; This is a computer-generated report.
</p>
</div><script>window.onload=()=>window.print()</script></body></html>`;
}

/* ── Skeleton ── */
function SkeletonRow() {
  return (
    <tr>
      {[60,80,180,160,55,90,90].map((w,i)=>(
        <td key={i} className="sm-td">
          <div className="sm-sk" style={{width:w,height:13}}/>
        </td>
      ))}
    </tr>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════ */
export default function StockManagement() {
  const [entries,    setEntries]    = useState([]);
  const [summary,    setSummary]    = useState({});
  const [loading,    setLoading]    = useState(true);
  const [notification, setNotification] = useState({ message:"", type:"info" });

  /* Filters */
  const [search,    setSearch]    = useState("");
  const [fromDate,  setFromDate]  = useState("");
  const [toDate,    setToDate]    = useState("");
  const [typeFilter,setTypeFilter]= useState(""); // "" | "purchase" | "sale"
  const [productFilter, setProductFilter] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res  = await authFetch(`${API_BASE_URL}/stock/entries`);
        const data = await res.json();
        if (data.success) {
          setEntries(data.entries);
          setSummary(data.summary || {});
        } else {
          setNotification({ message: data.message || "Failed to load", type: "error" });
        }
      } catch { setNotification({ message: "Server error.", type: "error" }); }
      finally { setLoading(false); }
    })();
  }, []);

  /* Filtered entries */
  const filtered = entries.filter(e => {
    if (typeFilter && e.type !== typeFilter) return false;
    if (productFilter && e.productName !== productFilter) return false;
    if (fromDate && new Date(e.date) < new Date(fromDate)) return false;
    if (toDate   && new Date(e.date) > new Date(toDate))   return false;
    if (search) {
      const q = search.toLowerCase();
      if (!e.productName?.toLowerCase().includes(q) &&
          !e.vendorName?.toLowerCase().includes(q)  &&
          !e.invoiceNo?.toLowerCase().includes(q)   &&
          !e.vehicleNo?.toLowerCase().includes(q)   &&
          !String(e.sr).includes(q)) return false;
    }
    return true;
  });

  /* Filtered summary */
  const filteredSummary = {
    totalStockIn:  filtered.filter(e => e.type==="purchase").reduce((s,e)=>s+n(e.amount),0),
    totalStockOut: filtered.filter(e => e.type==="sale").reduce((s,e)=>s+n(e.amount),0),
    totalMaundIn:  filtered.filter(e => e.type==="purchase").reduce((s,e)=>s+n(e.maund),0),
    totalMaundOut: filtered.filter(e => e.type==="sale").reduce((s,e)=>s+n(e.maund),0),
    totalQtyIn:    filtered.filter(e => e.type==="purchase").reduce((s,e)=>s+n(e.quantity),0),
    totalQtyOut:   filtered.filter(e => e.type==="sale").reduce((s,e)=>s+n(e.quantity),0),
  };

  const productNames = [...new Set(entries.map(e => e.productName).filter(Boolean))];
  const hasFilters = search || fromDate || toDate || typeFilter || productFilter;
  const displaySummary = hasFilters ? filteredSummary : summary;

  const openPrint = () => {
    const dateRange = fromDate || toDate
      ? `${fromDate || "start"} → ${toDate || "today"}`
      : null;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(filtered, displaySummary, dateRange));
    w.document.close();
  };

  /* ── Running debit/credit totals for the table ── */
  let runningDebit = 0;
  let runningCredit = 0;

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification message={notification.message} type={notification.type}
        onClose={() => setNotification({ message:"", type:"info" })}/>

      <div className="sm-wrap">

        {/* ── Header ── */}
        <div style={{ marginBottom: 20, display: "flex", alignItems: "flex-end",
          justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: ".1em", color: "#9ca3af", marginBottom: 4 }}>Operations</p>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a",
              letterSpacing: "-.5px", lineHeight: 1, margin: 0 }}>Stock Management</h1>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 5 }}>
              Double-entry stock ledger — auto-generated from Purchase &amp; Sales invoices
            </p>
          </div>
          <div className="sm-no-print" style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {!loading && (
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
                fontWeight: 600, color: "#64748b", background: "#f1f5f9",
                padding: "5px 12px", borderRadius: 8 }}>
                {filtered.length}
                {filtered.length !== entries.length && (
                  <span style={{ color: "#9ca3af", fontWeight: 400 }}> / {entries.length}</span>
                )} entries
              </span>
            )}
            <button className="sm-print-btn" onClick={openPrint}>
              <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
              </svg>
              Print Ledger
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 10, marginBottom: 18 }}>
          <StatCard label="Stock In (Rs)"   value={`Rs ${fmt(displaySummary.totalStockIn)}`}  accent="#16a34a" mono/>
          <StatCard label="Stock Out (Rs)"  value={`Rs ${fmt(displaySummary.totalStockOut)}`} accent="#7c3aed" mono/>
          <StatCard label="Net Balance"     value={`Rs ${fmt(Math.abs(n(displaySummary.totalStockIn)-n(displaySummary.totalStockOut)))}`}
            accent={(n(displaySummary.totalStockIn)-n(displaySummary.totalStockOut))>=0?"#0284c7":"#ef4444"} mono
            sub={(n(displaySummary.totalStockIn)-n(displaySummary.totalStockOut))>=0?"surplus":"deficit"}/>
          <StatCard label="Maund In"   value={fmt4(displaySummary.totalMaundIn)}  accent="#16a34a" mono/>
          <StatCard label="Maund Out"  value={fmt4(displaySummary.totalMaundOut)} accent="#7c3aed" mono/>
          <StatCard label="Bags In / Out"
            value={`${fmt0(displaySummary.totalQtyIn)} / ${fmt0(displaySummary.totalQtyOut)}`}
            accent="#0f172a" mono/>
        </div>

        {/* ── Filters ── */}
        <div className="sm-no-print" style={{ background: "#fff", border: "1.5px solid #f1f5f9",
          borderRadius: 12, padding: "12px 14px", marginBottom: 16,
          boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr auto",
            gap: 10, alignItems: "end" }}>
            <div>
              <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: ".08em", color: "#94a3b8", display: "block", marginBottom: 5 }}>
                Search
              </label>
              <div style={{ position: "relative" }}>
                <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                  pointerEvents: "none" }} width={14} height={14} fill="none" viewBox="0 0 24 24"
                  stroke="#9ca3af" strokeWidth={2}>
                  <circle cx={11} cy={11} r={8}/>
                  <path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
                </svg>
                <input className="sm-input" value={search} onChange={e=>setSearch(e.target.value)}
                  placeholder="Invoice #, product, vendor, vehicle…"
                  style={{ width: "100%", paddingLeft: 32 }}/>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: ".08em", color: "#94a3b8", display: "block", marginBottom: 5 }}>From Date</label>
              <input type="date" className="sm-input" value={fromDate}
                onChange={e=>setFromDate(e.target.value)} style={{ width: "100%" }}/>
            </div>
            <div>
              <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: ".08em", color: "#94a3b8", display: "block", marginBottom: 5 }}>To Date</label>
              <input type="date" className="sm-input" value={toDate}
                onChange={e=>setToDate(e.target.value)} style={{ width: "100%" }}/>
            </div>
            <div>
              <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: ".08em", color: "#94a3b8", display: "block", marginBottom: 5 }}>Type</label>
              <div style={{ position: "relative" }}>
                <select className="sm-select" value={typeFilter}
                  onChange={e=>setTypeFilter(e.target.value)} style={{ width: "100%" }}>
                  <option value="">All types</option>
                  <option value="purchase">Stock In (Purchase)</option>
                  <option value="sale">Stock Out (Sale)</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: ".08em", color: "#94a3b8", display: "block", marginBottom: 5 }}>Product</label>
              <select className="sm-select" value={productFilter}
                onChange={e=>setProductFilter(e.target.value)} style={{ width: "100%" }}>
                <option value="">All products</option>
                {productNames.map(p=><option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <button onClick={() => { setSearch(""); setFromDate(""); setToDate(""); setTypeFilter(""); setProductFilter(""); }}
              style={{
                padding: "8px 14px", borderRadius: 9, border: "1.5px solid #e2e8f0",
                background: "#fff", color: "#6b7280", fontSize: 12.5, fontWeight: 600,
                cursor: hasFilters ? "pointer" : "default",
                opacity: hasFilters ? 1 : 0.4, fontFamily: "'Plus Jakarta Sans',sans-serif",
              }}>
              Clear
            </button>
          </div>
        </div>



        {/* ── Ledger Table ── */}
        <div style={{ background: "#fff", border: "1.5px solid #f1f5f9", borderRadius: 14,
          overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.05)" }}>

          {/* Table header */}
          <div style={{ overflowX: "auto" }}>
            <table className="sm-table">
              <thead>
                <tr>
                  <th style={{ width: 90 }}>Date</th>
                  <th style={{ width: 70 }}>Invoice</th>
                  <th>Particulars</th>
                  <th>Description</th>
                  <th className="c" style={{ width: 65 }}>Type</th>
                  <th className="r" style={{ width: 140 }}>
                    <span style={{ color: "#86efac" }}>DR</span> Debit Amount
                  </th>
                  <th className="r" style={{ width: 140 }}>
                    <span style={{ color: "#c4b5fd" }}>CR</span> Credit Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i}/>)
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: "48px", textAlign: "center", color: "#94a3b8" }}>
                      <div style={{ fontSize: 32, marginBottom: 10 }}>📦</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#6b7280", marginBottom: 4 }}>
                        No stock entries found
                      </div>
                      <div style={{ fontSize: 12.5 }}>
                        {entries.length === 0
                          ? "Create purchase or sales invoices to see stock entries here."
                          : "Try adjusting your filters."}
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {filtered.map((e, idx) => {
                      const isPurchase = e.type === "purchase";
                      if (isPurchase) runningDebit  += n(e.amount);
                      else           runningCredit += n(e.amount);

                      return (
                        <tr key={e._id}
                          className={isPurchase ? "sm-row-purchase" : "sm-row-sale"}>

                          {/* Date */}
                          <td className="sm-td">
                            <span className="sm-mono" style={{ fontSize: 12, fontWeight: 600,
                              color: "#374151" }}>{e.date}</span>
                          </td>

                          {/* Invoice # */}
                          <td className="sm-td">
                            <span className="sm-mono" style={{ fontSize: 12, fontWeight: 700,
                              color: isPurchase ? "#16a34a" : "#7c3aed" }}>{e.invoiceNo}</span>
                            {e.journalEntryId && (
                              <div style={{ fontSize: 9, color: "#a5b4fc", marginTop: 2, fontWeight: 600 }}>
                                ⛓ JE linked
                              </div>
                            )}
                          </td>

                          {/* Particulars — double-entry style */}
                          <td className="sm-td" style={{ minWidth: 220 }}>
                            {/* DR row */}
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 5 }}>
                              <span style={{
                                fontSize: 9.5, fontWeight: 800, letterSpacing: ".06em",
                                textTransform: "uppercase", minWidth: 22, marginTop: 1,
                                color: "#16a34a", background: "#dcfce7",
                                padding: "1px 5px", borderRadius: 4,
                              }}>DR</span>
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", lineHeight: 1.3 }}>
                                  {e.drAccountName}
                                </div>
                                {isPurchase && (
                                  <div style={{ fontSize: 10.5, color: "#64748b", marginTop: 1 }}>
                                    {e.productName}
                                  </div>
                                )}
                              </div>
                            </div>
                            {/* CR row */}
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 7,
                              paddingLeft: 8, borderLeft: "2px solid #f1f5f9" }}>
                              <span style={{
                                fontSize: 9.5, fontWeight: 800, letterSpacing: ".06em",
                                textTransform: "uppercase", minWidth: 22, marginTop: 1,
                                color: "#7c3aed", background: "#ede9fe",
                                padding: "1px 5px", borderRadius: 4,
                              }}>CR</span>
                              <div>
                                <div style={{ fontSize: 12.5, fontWeight: 600, color: "#374151", lineHeight: 1.3 }}>
                                  {e.crAccountName}
                                </div>
                                {!isPurchase && (
                                  <div style={{ fontSize: 10.5, color: "#64748b", marginTop: 1 }}>
                                    {e.productName}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Description */}
                          <td className="sm-td" style={{ minWidth: 280 }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                              gap: "2px 12px", fontSize: 11 }}>
                              {[
                                ["Invoice",  e.invoiceNo],
                                ["Bags",     fmt0(e.quantity)],
                                ["Rate/40kg",`Rs ${fmt0(e.rate)}`],
                                ["Maund",    fmt4(e.maund)],
                                ["Weight",   `${fmt(n(e.netWeightKg))} kg`],
                                ["Vehicle",  e.vehicleNo],
                              ].map(([k, v]) => (
                                <div key={k}>
                                  <div style={{ color: "#9ca3af", fontWeight: 700,
                                    fontSize: 9, textTransform: "uppercase",
                                    letterSpacing: ".06em" }}>{k}</div>
                                  <div className="sm-mono" style={{ fontSize: 11.5,
                                    fontWeight: 600, color: "#374151" }}>{v || "—"}</div>
                                </div>
                              ))}
                            </div>
                          </td>

                          {/* Type badge */}
                          <td className="sm-td-c">
                            <span className={isPurchase ? "sm-badge-purchase" : "sm-badge-sale"}>
                              {isPurchase ? "▲ IN" : "▼ OUT"}
                            </span>
                          </td>

                          {/* Debit column — DR account + amount */}
                          <td className="sm-td-r">
                            <div>
                              <div style={{ fontSize: 9, fontWeight: 700, color: "#16a34a",
                                textTransform: "uppercase", letterSpacing: ".06em",
                                marginBottom: 3 }}>DR · {e.drAccountName}</div>
                              <span style={{ fontFamily: "'JetBrains Mono',monospace",
                                fontSize: 13, fontWeight: 700, color: "#16a34a" }}>
                                Rs {fmt(e.debit)}
                              </span>
                            </div>
                          </td>

                          {/* Credit column — CR account + amount */}
                          <td className="sm-td-r">
                            <div>
                              <div style={{ fontSize: 9, fontWeight: 700, color: "#7c3aed",
                                textTransform: "uppercase", letterSpacing: ".06em",
                                marginBottom: 3 }}>CR · {e.crAccountName}</div>
                              <span style={{ fontFamily: "'JetBrains Mono',monospace",
                                fontSize: 13, fontWeight: 700, color: "#7c3aed" }}>
                                Rs {fmt(e.credit)}
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                    {/* Totals row */}
                    <tr className="sm-row-total">
                      <td className="sm-td" colSpan={5}>
                        <span style={{ fontSize: 11, fontWeight: 700,
                          textTransform: "uppercase", letterSpacing: ".08em", color: "#374151" }}>
                          Totals — {filtered.length} entr{filtered.length !== 1 ? "ies" : "y"}
                        </span>
                      </td>
                      <td className="sm-td-r">
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13.5,
                          fontWeight: 800, color: "#16a34a" }}>
                          Rs {fmt(displaySummary.totalStockIn)}
                        </span>
                      </td>
                      <td className="sm-td-r">
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13.5,
                          fontWeight: 800, color: "#7c3aed" }}>
                          Rs {fmt(displaySummary.totalStockOut)}
                        </span>
                      </td>
                    </tr>

                    {/* Net balance row */}
                    <tr>
                      <td colSpan={7} style={{ padding: "10px 14px",
                        background: "#f8fafc", borderTop: "1px solid #f1f5f9" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 20,
                          fontSize: 12, flexWrap: "wrap" }}>
                          <span style={{ color: "#64748b", fontWeight: 600 }}>Net Position:</span>
                          {(() => {
                            const net = n(displaySummary.totalStockIn) - n(displaySummary.totalStockOut);
                            const isPos = net >= 0;
                            return (
                              <span style={{ fontFamily: "'JetBrains Mono',monospace",
                                fontWeight: 800, fontSize: 14,
                                color: isPos ? "#16a34a" : "#ef4444" }}>
                                {isPos ? "+" : "−"} Rs {fmt(Math.abs(net))}
                                <span style={{ fontSize: 10, fontWeight: 600, marginLeft: 6,
                                  color: "#94a3b8" }}>
                                  ({isPos ? "Stock surplus" : "Stock deficit"})
                                </span>
                              </span>
                            );
                          })()}
                          <span style={{ color: "#9ca3af" }}>|</span>
                          <span style={{ color: "#64748b" }}>
                            Maund balance: <span className="sm-mono" style={{ fontWeight: 700,
                              color: "#0f172a" }}>
                              {fmt4(n(displaySummary.totalMaundIn) - n(displaySummary.totalMaundOut))} Mn
                            </span>
                          </span>
                          <span style={{ color: "#9ca3af" }}>|</span>
                          <span style={{ color: "#64748b" }}>
                            Bag balance: <span className="sm-mono" style={{ fontWeight: 700,
                              color: "#0f172a" }}>
                              {fmt0(n(displaySummary.totalQtyIn) - n(displaySummary.totalQtyOut))} bags
                            </span>
                          </span>
                        </div>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {!loading && filtered.length > 0 && (
          <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 12,
            marginTop: 16, fontFamily: "'JetBrains Mono',monospace" }}>
            {filtered.length} entr{filtered.length !== 1 ? "ies" : "y"}
            {hasFilters ? ` · filtered from ${entries.length} total` : ""}
            &nbsp;·&nbsp;
            {filtered.filter(e=>e.type==="purchase").length} purchases (stock in) &nbsp;·&nbsp;
            {filtered.filter(e=>e.type==="sale").length} sales (stock out)
          </p>
        )}
      </div>
    </SidebarLayout>
  );
}