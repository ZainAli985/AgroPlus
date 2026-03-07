import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

/* ── Number helpers ─────────────────────────────────────────────────────────── */
const num = (v) => {
  if (v === null || v === undefined) return 0;
  if (typeof v === "number") return v;
  if (typeof v === "string") return Number(v.replace(/,/g, "")) || 0;
  return 0;
};
const fmt  = (v) => num(v).toLocaleString("en-PK", { maximumFractionDigits: 0 });
const fmt2 = (v) => num(v).toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ── Fonts ─────────────────────────────────────────────────────────────────── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');`;

/* ── Global styles ──────────────────────────────────────────────────────────── */
const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .vsi-wrap { font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; }

  .vsi-input, .vsi-select {
    width: 100%; border: 1.5px solid #e5e7eb; border-radius: 10px;
    padding: 9px 12px; font-size: 13.5px; font-family: 'Plus Jakarta Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .15s, box-shadow .15s; appearance: none;
  }
  .vsi-input::placeholder { color: #9ca3af; }
  .vsi-input:focus, .vsi-select:focus {
    border-color: #10b981; box-shadow: 0 0 0 3px rgba(16,185,129,.12);
  }

  .vsi-stat {
    background: #fff; border: 1.5px solid #f3f4f6; border-radius: 14px;
    padding: 18px 20px; transition: box-shadow .2s;
  }
  .vsi-stat:hover { box-shadow: 0 4px 16px rgba(0,0,0,.07); }

  .vsi-card {
    background: #fff; border-radius: 16px; overflow: hidden;
    border: 1.5px solid #f3f4f6;
    box-shadow: 0 1px 3px rgba(0,0,0,.04), 0 1px 2px rgba(0,0,0,.03);
    transition: box-shadow .2s, transform .2s;
  }
  .vsi-card:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,.09), 0 2px 6px rgba(0,0,0,.05);
    transform: translateY(-1px);
  }

  .vsi-card-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 20px 13px; border-bottom: 1.5px solid #f3f4f6;
    gap: 12px; flex-wrap: wrap;
  }

  .vsi-data-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
  }
  .vsi-data-cell {
    padding: 14px 20px; border-right: 1.5px solid #f9fafb;
    border-bottom: 1.5px solid #f9fafb;
  }
  .vsi-data-cell:nth-child(4n)      { border-right: none; }
  .vsi-data-cell:nth-last-child(-n+4) { border-bottom: none; }
  .vsi-data-label {
    font-size: 10.5px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: #9ca3af; margin-bottom: 5px;
  }
  .vsi-data-value { font-size: 13.5px; font-weight: 600; color: #1f2937; }
  .vsi-data-value.mono {
    font-family: 'JetBrains Mono', monospace; font-size: 13px;
    font-weight: 500; color: #374151;
  }

  .vsi-card-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 20px; background: #fafafa; border-top: 1.5px solid #f3f4f6;
    gap: 12px; flex-wrap: wrap;
  }

  /* emerald paddy badge for sales */
  .vsi-paddy {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 700;
    background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;
    white-space: nowrap;
  }

  .vsi-print-btn {
    display: inline-flex; align-items: center; gap: 6px;
    background: #18181b; color: #fff; border: none; border-radius: 9px;
    padding: 8px 14px; font-size: 12.5px; font-weight: 600;
    font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer;
    transition: background .15s, box-shadow .15s; white-space: nowrap;
  }
  .vsi-print-btn:hover { background: #09090b; box-shadow: 0 3px 10px rgba(0,0,0,.25); }

  .vsi-clear-btn {
    background: none; border: 1.5px solid #e5e7eb; border-radius: 9px;
    padding: 8px 14px; font-size: 13px; font-weight: 600; color: #6b7280;
    font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer;
    transition: all .15s;
  }
  .vsi-clear-btn:hover { border-color: #d1d5db; color: #374151; }

  .vsi-select-wrap { position: relative; }
  .vsi-select-wrap::after {
    content: ''; position: absolute; right: 12px; top: 50%;
    transform: translateY(-50%); pointer-events: none;
    border-left: 4px solid transparent; border-right: 4px solid transparent;
    border-top: 5px solid #9ca3af;
  }

  @keyframes vsi-shimmer { to { background-position: -200% 0; } }
  .vsi-skeleton {
    background: linear-gradient(90deg,#f3f4f6 25%,#fafafa 50%,#f3f4f6 75%);
    background-size: 200% 100%; animation: vsi-shimmer 1.3s infinite;
    border-radius: 8px;
  }

  @keyframes vsi-in { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
  .vsi-card { animation: vsi-in .22s ease-out both; }

  .vsi-empty { text-align: center; padding: 64px 20px; color: #9ca3af; }

  @media (max-width: 768px) {
    .vsi-data-grid { grid-template-columns: repeat(2, 1fr); }
    .vsi-data-cell:nth-child(2n) { border-right: none; }
    .vsi-data-cell:nth-last-child(-n+2) { border-bottom: none; }
    .vsi-data-cell:nth-child(2n+1):not(:nth-last-child(-n+2)) { border-bottom: 1.5px solid #f9fafb; }
  }
`;

/* ── Print HTML builder ──────────────────────────────────────────────────────── */
function buildPrintHTML(invoice) {
  const filledWeight    = num(invoice.weight);
  const emptyWeight     = num(invoice.quantity) * num(invoice.bagWeight);
  const loadWeight      = num(invoice.netWeight);
  const deductionPerBag = 3;
  const totalDeduction  = num(invoice.quantity) * deductionPerBag;
  const netWeightKgs    = loadWeight - totalDeduction;
  const netWeightMaund  = netWeightKgs / 40;
  const subtotalAmount  = num(invoice.totalAmount);
  const bagClosingCost  = num(invoice.sutliSilaiAmount);
  const grandTotal      = num(invoice.totalAmount2) || subtotalAmount + bagClosingCost + num(invoice.brokery);

  return `<!DOCTYPE html><html><head><title>Sales Invoice ${invoice.builtyNo}</title>
<style>
@page{size:A4;margin:12mm}
body{font-family:"Segoe UI",Arial,sans-serif;background:#fff;color:#111}
.invoice{max-width:650px;margin:auto}
.header{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #1e3a8a;padding-bottom:12px;margin-bottom:20px}
.logo{display:flex;align-items:center;gap:12px}.logo img{height:60px}
.logo h1{font-size:22px;margin:0;color:#1e3a8a}.logo p{font-size:11px;margin:2px 0}
.invoice-meta{text-align:right}.invoice-meta h2{margin:0;font-size:20px;color:#1e40af}
.invoice-meta table{font-size:12px;margin-top:6px}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}
.info-box{border:1px solid #e5e7eb;padding:8px;border-radius:6px}
.info-box h4{margin:0 0 8px;font-size:13px;color:#1e3a8a;border-bottom:1px solid #e5e7eb;padding-bottom:4px}
.info-box p{font-size:12px;margin:4px 0}
table{width:100%;border-collapse:collapse;font-size:11px;margin-top:12px}
th{background:#1e3a8a;color:#fff;padding:5px 4px;text-align:center;font-size:11px}
td{border:1px solid #000;padding:4px 6px}
.right{text-align:center}.highlight{background:#f1f5ff;font-weight:bold}
.totals{margin-top:16px}.totals td{font-weight:bold;font-size:12px;padding:6px 4px}
.grand-total{font-size:15px;color:#1e3a8a;text-align:center}
.signature{margin-top:40px;display:flex;justify-content:space-between;font-size:12px}
.signature div{width:45%;text-align:center}
.signature span{display:block;margin-top:40px;border-top:1px solid #000;padding-top:4px}
</style></head><body>
<div class="invoice">
<div class="header">
  <div class="logo"><img src="/logo.png"/>
    <div><h1>Al Rehman Rice Mills</h1><p>Deepalpur Road, Babarkhai, Arzanipur</p>
    <p>Chunian, Kasur – Pakistan</p><p><b>0301-4349041</b> | <b>0300-8402130</b></p></div>
  </div>
  <div class="invoice-meta"><h2>SALE INVOICE</h2>
    <table><tr><td><b>Invoice #</b></td><td>${invoice.builtyNo}</td></tr>
    <tr><td><b>Date</b></td><td>${invoice.date}</td></tr></table>
  </div>
</div>
<div class="info-grid">
  <div class="info-box"><h4>BILL TO</h4>
    <p><b>Name:</b> ${invoice.vendorName}</p><p><b>Company:</b> D.T Rice Mills</p>
    <p><b>City:</b> Hyderabad</p><p><b>Phone:</b> 0329-0999329</p></div>
  <div class="info-box"><h4>TRANSPORT DETAILS</h4>
    <p><b>Vehicle No:</b> ${invoice.vehicleNo}</p><p><b>Broker:</b> ${invoice.brokerName}</p>
    <p><b>Paddy Type:</b> ${invoice.paddyType}</p><p><b>Rate (40kg):</b> Rs ${fmt(invoice.rate40)}</p></div>
</div>
<table>
  <tr><th>Description</th><th>Details</th><th class="right">Weight (Kgs)</th></tr>
  <tr><td rowspan="3">Weight</td><td>Filled Weight</td><td class="right">${fmt(filledWeight)}</td></tr>
  <tr><td>Empty Weight</td><td class="right">${fmt(emptyWeight)}</td></tr>
  <tr class="highlight"><td>Net Load Weight</td><td class="right">${fmt(loadWeight)}</td></tr>
  <tr><td rowspan="2">Bags</td><td>No. of Bags</td><td class="right">${fmt(invoice.quantity)}</td></tr>
  <tr><td>Bag Weight</td><td class="right">${fmt(invoice.bagWeight)}</td></tr>
  <tr><td>Deduction</td><td>3 Kg / Bag</td><td class="right">${fmt(totalDeduction)}</td></tr>
</table>
<table class="totals">
  <tr><td>Net Weight (Kgs)</td><td class="right">${fmt(netWeightKgs)}</td></tr>
  <tr><td>Net Weight (Maund)</td><td class="right">${fmt(netWeightMaund)}</td></tr>
  <tr><td>Subtotal</td><td class="right">${fmt(subtotalAmount)}</td></tr>
  <tr><td>Bag Closing Cost</td><td class="right">${fmt(bagClosingCost)}</td></tr>
  <tr class="grand-total"><td>GRAND TOTAL</td><td class="right">Rs ${fmt(grandTotal)}</td></tr>
</table>
<div class="signature">
  <div><span>Authorized Signature</span></div><div><span>Stamp</span></div>
</div>
<p style="text-align:center;margin-top:30px;font-size:12px">Thank you for your business</p>
</div><script>window.print()</script></body></html>`;
}

/* ── Icons ───────────────────────────────────────────────────────────────────── */
const PrintIcon = () => (
  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
  </svg>
);
const SearchIcon = () => (
  <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
    <circle cx={11} cy={11} r={8}/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
  </svg>
);

/* ── Stat card ──────────────────────────────────────────────────────────────── */
function StatCard({ label, value, prefix, accent }) {
  return (
    <div className="vsi-stat">
      <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em",
        color:"#9ca3af", marginBottom:10 }}>{label}</p>
      <p style={{ fontSize:21, fontWeight:800, color:"#111827", lineHeight:1,
        fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-.5px" }}>
        {prefix && <span style={{ fontSize:14, color: accent || "#9ca3af", marginRight:3 }}>{prefix}</span>}
        {value}
      </p>
    </div>
  );
}

/* ── Data cell ──────────────────────────────────────────────────────────────── */
function DataCell({ label, value, mono }) {
  return (
    <div className="vsi-data-cell">
      <div className="vsi-data-label">{label}</div>
      <div className={`vsi-data-value${mono ? " mono" : ""}`}>
        {value ?? <span style={{ color:"#d1d5db" }}>—</span>}
      </div>
    </div>
  );
}

/* ── Amount tile in footer ──────────────────────────────────────────────────── */
function AmtTile({ label, value, color, large }) {
  return (
    <div>
      <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em",
        color:"#9ca3af", marginBottom:2 }}>{label}</div>
      <div style={{ fontSize: large ? 20 : 13.5, fontWeight: large ? 800 : 700,
        color: color || "#374151", fontFamily:"'JetBrains Mono',monospace",
        letterSpacing: large ? "-.5px" : "-.2px" }}>
        {value ? `Rs ${fmt(value)}` : "—"}
      </div>
    </div>
  );
}

/* ── Skeleton card ──────────────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="vsi-card" style={{ animation:"none" }}>
      <div className="vsi-card-head">
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <div className="vsi-skeleton" style={{ width:80, height:18 }} />
          <div className="vsi-skeleton" style={{ width:60, height:22, borderRadius:20 }} />
        </div>
        <div className="vsi-skeleton" style={{ width:110, height:34, borderRadius:9 }} />
      </div>
      <div className="vsi-data-grid">
        {Array.from({length:8}).map((_,i) => (
          <div key={i} className="vsi-data-cell">
            <div className="vsi-skeleton" style={{ width:"50%", height:10, marginBottom:8 }} />
            <div className="vsi-skeleton" style={{ width:"80%", height:16 }} />
          </div>
        ))}
      </div>
      <div className="vsi-card-footer">
        <div style={{ display:"flex", gap:16 }}>
          {[100,80,90].map((w,i) => (
            <div key={i}><div className="vsi-skeleton" style={{ width:60, height:9, marginBottom:5 }}/>
            <div className="vsi-skeleton" style={{ width:w, height:15 }}/></div>
          ))}
        </div>
        <div><div className="vsi-skeleton" style={{ width:60, height:10, marginBottom:5 }}/>
        <div className="vsi-skeleton" style={{ width:120, height:22 }}/></div>
      </div>
    </div>
  );
}

/* ── Filter pill ────────────────────────────────────────────────────────────── */
function FilterPill({ label, onRemove }) {
  return (
    <div style={{
      display:"inline-flex", alignItems:"center", gap:5,
      background:"#ecfdf5", border:"1px solid #a7f3d0",
      borderRadius:20, padding:"3px 9px 3px 10px",
      fontSize:12, fontWeight:600, color:"#065f46",
    }}>
      {label}
      <button onClick={onRemove} style={{
        background:"none", border:"none", cursor:"pointer", padding:0,
        display:"flex", alignItems:"center", color:"#6ee7b7", marginLeft:1,
      }}>
        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
}

/* ── Label style ─────────────────────────────────────────────────────────────── */
const lbl = {
  display:"block", fontSize:11, fontWeight:700, textTransform:"uppercase",
  letterSpacing:".07em", color:"#9ca3af", marginBottom:6,
};

/* ── MAIN COMPONENT ─────────────────────────────────────────────────────────── */
const ViewSalesInvoices = () => {
  const [invoices,         setInvoices]         = useState([]);
  const [loading,          setLoading]          = useState(true);
  const [notification,     setNotification]     = useState({ message:"", type:"info" });
  const [summary,          setSummary]          = useState({ total:0, phukar:0, polish:0, rice:0 });
  const [search,           setSearch]           = useState("");
  const [fromDate,         setFromDate]         = useState("");
  const [toDate,           setToDate]           = useState("");
  const [paddyType,        setPaddyType]        = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  /* fetch */
  useEffect(() => {
    (async () => {
      try {
        const res  = await authFetch(`${API_BASE_URL}/sales-invoice`);
        const data = await res.json();
        if (data.success) {
          setInvoices(data.invoices);
          setFilteredInvoices(data.invoices);
          recalcSummary(data.invoices);
        } else {
          setNotification({ message: data.message || "Failed to fetch invoices", type:"error" });
        }
      } catch { setNotification({ message:"Server error!", type:"error" }); }
      finally  { setLoading(false); }
    })();
  }, []);

  /* filter */
  useEffect(() => {
    let data = invoices;
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(inv =>
        inv.vendorName?.toLowerCase().includes(q) ||
        inv.vehicleNo?.toLowerCase().includes(q)  ||
        inv.brokerName?.toLowerCase().includes(q) ||
        String(inv.sr)?.includes(q)
      );
    }
    if (fromDate) data = data.filter(inv => new Date(inv.date) >= new Date(fromDate));
    if (toDate)   data = data.filter(inv => new Date(inv.date) <= new Date(toDate));
    if (paddyType) data = data.filter(inv => inv.paddyType === paddyType);
    setFilteredInvoices(data);
    recalcSummary(data);
  }, [search, fromDate, toDate, paddyType, invoices]);

  const recalcSummary = (list) => {
    const count = list.length || 1;
    const total  = list.reduce((s, inv) => s + num(inv.totalAmount2), 0);
    const phukar = list.reduce((s, inv) => s + num(inv.quantity),     0);
    const polish = list.reduce((s, inv) => s + num(inv.netWeight),    0);
    const rice   = list.reduce((s, inv) => s + num(inv.amount),       0);
    setSummary({ total, phukar: Math.round(phukar/count), polish: Math.round(polish/count), rice: Math.round(rice/count) });
  };

  const openPrint = (invoice) => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(invoice));
    w.document.close();
  };

  const clearFilters = () => { setSearch(""); setFromDate(""); setToDate(""); setPaddyType(""); };
  const hasFilters   = search || fromDate || toDate || paddyType;
  const paddyTypes   = [...new Set(invoices.map(i => i.paddyType).filter(Boolean))];

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message:"", type:"info" })}
      />

      <div className="vsi-wrap">

        {/* ── Page header ── */}
        <div style={{ marginBottom:24, display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <div>
            <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:"#9ca3af", marginBottom:4 }}>
              Sales
            </p>
            <h1 style={{ fontSize:26, fontWeight:800, color:"#111827", letterSpacing:"-.5px", lineHeight:1 }}>
              Sales Invoices
            </h1>
          </div>
          {!loading && (
            <div style={{
              background:"#f3f4f6", borderRadius:10, padding:"7px 14px",
              fontSize:13, fontWeight:600, color:"#6b7280",
              fontFamily:"'JetBrains Mono',monospace",
            }}>
              {filteredInvoices.length}
              {filteredInvoices.length !== invoices.length && (
                <span style={{ color:"#9ca3af", fontWeight:400 }}> / {invoices.length}</span>
              )}
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", marginLeft:5, fontWeight:500 }}>
                invoice{filteredInvoices.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        {/* ── Stats ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
          <StatCard label="Total Revenue"    value={fmt(summary.total)}   prefix="Rs" accent="#10b981" />
          <StatCard label="Avg Bags / Invoice" value={fmt(summary.phukar)}              accent="#6366f1" />
          <StatCard label="Avg Net Wt. KG"   value={fmt(summary.polish)}              accent="#0ea5e9" />
          <StatCard label="Avg Amount"       value={fmt(summary.rice)}    prefix="Rs" accent="#f59e0b" />
        </div>

        {/* ── Filters ── */}
        <div style={{
          background:"#fff", border:"1.5px solid #f3f4f6", borderRadius:14,
          padding:"14px 16px", marginBottom:20,
          boxShadow:"0 1px 3px rgba(0,0,0,.04)",
        }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr auto", gap:10, alignItems:"end" }}>

            <div>
              <label style={lbl}>Search</label>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", display:"flex" }}>
                  <SearchIcon/>
                </span>
                <input
                  className="vsi-input"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Invoice #, vendor, vehicle, broker…"
                  style={{ paddingLeft:34 }}
                />
              </div>
            </div>

            <div>
              <label style={lbl}>From Date</label>
              <input type="date" className="vsi-input" value={fromDate} onChange={e=>setFromDate(e.target.value)}/>
            </div>

            <div>
              <label style={lbl}>To Date</label>
              <input type="date" className="vsi-input" value={toDate} onChange={e=>setToDate(e.target.value)}/>
            </div>

            <div>
              <label style={lbl}>Paddy Type</label>
              <div className="vsi-select-wrap">
                <select className="vsi-select" value={paddyType} onChange={e=>setPaddyType(e.target.value)}>
                  <option value="">All types</option>
                  {paddyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <button className="vsi-clear-btn" onClick={clearFilters}
                style={{ opacity:hasFilters?1:.35, pointerEvents:hasFilters?"auto":"none" }}>
                Clear
              </button>
            </div>
          </div>

          {/* Active filter pills */}
          {hasFilters && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:10 }}>
              {search    && <FilterPill label={`"${search}"`}      onRemove={() => setSearch("")} />}
              {fromDate  && <FilterPill label={`From ${fromDate}`} onRemove={() => setFromDate("")} />}
              {toDate    && <FilterPill label={`To ${toDate}`}     onRemove={() => setToDate("")} />}
              {paddyType && <FilterPill label={paddyType}          onRemove={() => setPaddyType("")} />}
            </div>
          )}
        </div>

        {/* ── Cards ── */}
        {loading ? (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {Array.from({length:3}).map((_,i) => <SkeletonCard key={i}/>)}
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="vsi-empty">
            <svg width={48} height={48} fill="none" viewBox="0 0 24 24" stroke="#e5e7eb" strokeWidth={1.2}
              style={{ margin:"0 auto 14px", display:"block" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <p style={{ fontSize:15, fontWeight:700, color:"#6b7280", marginBottom:4 }}>No invoices found</p>
            <p style={{ fontSize:13, color:"#9ca3af" }}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {filteredInvoices.map((invoice, idx) => (
              <div
                key={invoice._id}
                className="vsi-card"
                style={{ animationDelay:`${idx * 0.04}s` }}
              >

                {/* ── Card header ── */}
                <div className="vsi-card-head">
                  <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>

                    {/* Invoice # */}
                    <div style={{ display:"flex", alignItems:"baseline", gap:5 }}>
                      <span style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".07em" }}>Invoice</span>
                      <span style={{
                        fontSize:17, fontWeight:800, color:"#111827",
                        fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-.3px",
                      }}>#{invoice.sr}</span>
                    </div>

                    <div style={{ width:1, height:16, background:"#e5e7eb" }} />

                    {/* Date */}
                    <span style={{ fontSize:13, color:"#6b7280", fontWeight:500 }}>{invoice.date}</span>

                    {/* Paddy badge — emerald for sales */}
                    {invoice.paddyType && (
                      <span className="vsi-paddy">{invoice.paddyType}</span>
                    )}

                    {/* Builty # */}
                    {invoice.builtyNo && (
                      <span style={{
                        fontSize:11.5, color:"#6b7280", fontWeight:600,
                        background:"#f3f4f6", padding:"2px 8px", borderRadius:6,
                        fontFamily:"'JetBrains Mono',monospace",
                      }}>Builty #{invoice.builtyNo}</span>
                    )}
                  </div>

                  {/* Print */}
                  <button className="vsi-print-btn" onClick={() => openPrint(invoice)}>
                    <PrintIcon/>
                    Print Invoice
                  </button>
                </div>

                {/* ── Data grid ── */}
                <div className="vsi-data-grid">
                  <DataCell label="Vendor"           value={invoice.vendorName} />
                  <DataCell label="Vehicle No."      value={invoice.vehicleNo}  mono />
                  <DataCell label="Broker"           value={invoice.brokerName} />
                  <DataCell label="Rate / 40 KG"     value={invoice.rate40 ? `Rs ${fmt(invoice.rate40)}` : null} mono />

                  <DataCell label="Quantity (Bags)"  value={invoice.quantity}   mono />
                  <DataCell label="Net Wt. (KG)"     value={invoice.netWeight}  mono />
                  <DataCell label="Net Wt. (40 KG)"  value={invoice.netWeight40} mono />
                  <DataCell label="Sutli / Silai"    value={invoice.sutliSilaiAmount ? `Rs ${fmt(invoice.sutliSilaiAmount)}` : null} mono />
                </div>

                {/* ── Footer: amounts ── */}
                <div className="vsi-card-footer">
                  {/* Subtotal + bag cost breakdown */}
                  <div style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
                    <AmtTile label="Subtotal"        value={invoice.totalAmount}  color="#374151" />
                    <div style={{ width:1, height:24, background:"#e5e7eb" }}/>
                    <AmtTile label="Bag Closing"     value={invoice.sutliSilaiAmount} color="#6b7280" />
                    {invoice.brokery && (
                      <>
                        <div style={{ width:1, height:24, background:"#e5e7eb" }}/>
                        <AmtTile label="Brokery" value={invoice.brokery} color="#6b7280" />
                      </>
                    )}
                  </div>

                  {/* Grand total */}
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", marginBottom:2 }}>Grand Total</div>
                    <div style={{
                      fontSize:20, fontWeight:800, color:"#111827",
                      fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-.5px",
                    }}>
                      Rs {fmt(invoice.totalAmount2)}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* ── Footer count ── */}
        {!loading && filteredInvoices.length > 0 && (
          <p style={{
            textAlign:"center", color:"#9ca3af", fontSize:12.5, marginTop:20,
            fontFamily:"'JetBrains Mono',monospace",
          }}>
            {filteredInvoices.length} invoice{filteredInvoices.length!==1?"s":""}
            {hasFilters ? ` · filtered from ${invoices.length} total` : ""}
          </p>
        )}

      </div>
    </SidebarLayout>
  );
};

export default ViewSalesInvoices;