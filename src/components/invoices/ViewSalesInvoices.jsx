import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .vsi { font-family: 'DM Sans', sans-serif; color: #111827; }

  .vsi-inp, .vsi-sel {
    width: 100%; padding: 7px 10px;
    border: 1px solid #d1d5db; border-radius: 6px;
    font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s;
    appearance: none;
  }
  .vsi-inp::placeholder { color: #9ca3af; }
  .vsi-inp:focus, .vsi-sel:focus {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }

  .vsi-stat {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; padding: 14px 16px;
    position: relative; overflow: hidden;
  }
  .vsi-stat::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 3px;
  }
  .vsi-stat.s1::before { background: #15803d; }
  .vsi-stat.s2::before { background: #1f2937; }
  .vsi-stat.s3::before { background: #6b7280; }
  .vsi-stat.s4::before { background: #d1d5db; }

  .vsi-card {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; overflow: hidden;
    transition: box-shadow .12s;
    animation: vsi-in .16s ease both;
  }
  .vsi-card:hover { box-shadow: 0 2px 10px rgba(0,0,0,.07); }
  @keyframes vsi-in { from { opacity:0; transform:translateY(3px); } to { opacity:1; transform:translateY(0); } }

  .vsi-card-head {
    display: flex; align-items: center;
    justify-content: space-between; padding: 12px 16px;
    border-bottom: 1px solid #f3f4f6;
    gap: 10px; flex-wrap: wrap;
  }

  .vsi-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
  }
  .vsi-cell {
    padding: 11px 14px;
    border-right: 1px solid #f3f4f6;
    border-bottom: 1px solid #f3f4f6;
  }
  .vsi-cell:nth-child(4n) { border-right: none; }
  .vsi-cell:nth-last-child(-n+4) { border-bottom: none; }
  .vsi-clbl {
    font-size: 9.5px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: #9ca3af; margin-bottom: 4px;
    font-family: 'DM Sans', sans-serif;
  }
  .vsi-cval { font-size: 13px; font-weight: 600; color: #111827; }
  .vsi-cval.mono { font-family: 'DM Mono', monospace; font-size: 12.5px; font-weight: 500; color: #374151; }

  .vsi-foot {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 16px; background: #f9fafb;
    border-top: 1px solid #f3f4f6;
    gap: 10px; flex-wrap: wrap;
  }

  .vsi-badge {
    display: inline-flex; align-items: center;
    padding: 2px 9px; border-radius: 4px;
    font-size: 11.5px; font-weight: 600;
    background: #f3f4f6; color: #374151;
    border: 1px solid #e5e7eb;
    font-family: 'DM Mono', monospace; white-space: nowrap;
  }

  .vsi-print {
    display: inline-flex; align-items: center; gap: 6px;
    background: #111827; color: #fff; border: none;
    border-radius: 6px; padding: 6px 13px;
    font-size: 12px; font-weight: 500;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    transition: background .1s; white-space: nowrap;
  }
  .vsi-print:hover { background: #1f2937; }

  .vsi-sel-wrap { position: relative; }
  .vsi-sel-wrap::after {
    content: ''; position: absolute; right: 10px; top: 50%;
    transform: translateY(-50%); pointer-events: none;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #9ca3af;
  }

  @keyframes vsi-shimmer { to { background-position: -200% 0; } }
  .vsi-skel {
    border-radius: 5px; height: 11px;
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    background-size: 200% 100%; animation: vsi-shimmer 1.4s infinite;
  }

  @media (max-width: 900px) {
    .vsi-stats { grid-template-columns: repeat(2, 1fr) !important; }
    .vsi-filters { grid-template-columns: 1fr 1fr !important; }
    .vsi-grid { grid-template-columns: repeat(2, 1fr); }
    .vsi-cell:nth-child(4n)  { border-right: 1px solid #f3f4f6; }
    .vsi-cell:nth-child(2n)  { border-right: none; }
    .vsi-cell:nth-last-child(-n+4) { border-bottom: 1px solid #f3f4f6; }
    .vsi-cell:nth-last-child(-n+2) { border-bottom: none; }
  }
`;

const n    = v => isNaN(Number(v)) ? 0 : Number(v) || 0;
const fmt  = (v, d=0) => n(v).toLocaleString("en-PK", { minimumFractionDigits:d, maximumFractionDigits:d });
const fmt2 = v => fmt(v, 2);

function productDisplay(inv) {
  const name = inv.paddyType || inv.productName;
  if (name && name.includes(" - ")) return name;
  const pop = inv.productId;
  if (pop && typeof pop === "object")
    return [pop.productName || name, pop.type, pop.subType].filter(Boolean).join(" - ");
  return name || "—";
}

function getMillInfo(profile) {
  return {
    name:    profile?.businessName || localStorage.getItem("businessName") || "Mill",
    logo:    profile?.logoUrl      || localStorage.getItem("logoUrl")      || "",
    address: profile?.address      || profile?.millAddress || "",
    phone1:  profile?.phone        || profile?.phone1      || "",
    phone2:  profile?.phone2       || "",
  };
}

function buildPrintHTML(inv, mill) {
  const m = mill || {};
  const millName    = m.name    || localStorage.getItem("businessName") || "Mill";
  const millLogo    = m.logo    || localStorage.getItem("logoUrl")      || "";
  const millAddress = m.address || "";
  const millPhone   = [m.phone1, m.phone2].filter(Boolean).join("  |  ");
  const sr = String(inv.sr||"").padStart(4,"0");

  const logoHTML = millLogo
    ? `<img src="${millLogo}" alt="logo" style="height:48px;width:48px;object-fit:contain;border-radius:6px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);padding:3px;"/>`
    : `<div style="width:48px;height:48px;border-radius:8px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#fff;">${millName.charAt(0)}</div>`;

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Sales #${sr}</title>
<style>
  @page{size:A5;margin:7mm}*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Segoe UI",Arial,sans-serif;background:#fff;color:#111;font-size:10.5px}.wrap{max-width:130mm;margin:0 auto}
  .hd{background:#111827;padding:10px 12px;border-radius:7px 7px 0 0;display:flex;align-items:center;gap:10px}
  .hd-info{flex:1;min-width:0}.hd-name{font-size:14px;font-weight:800;color:#fff;letter-spacing:-.2px;line-height:1.2}
  .hd-sub{font-size:8.5px;color:rgba(255,255,255,.45);margin-top:2px}
  .hd-right{text-align:right;flex-shrink:0}.hd-type{font-size:9px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#4ade80;margin-bottom:4px}
  .hd-no{font-size:18px;font-weight:800;color:#fff;font-family:"Courier New",monospace;letter-spacing:1px}
  .hd-date{font-size:8.5px;color:rgba(255,255,255,.4);margin-top:2px}
  .meta{display:grid;grid-template-columns:1fr 1fr;border:1px solid #e5e7eb;border-top:none}
  .meta-cell{padding:6px 9px;border-right:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6}
  .meta-cell:nth-child(2n){border-right:none}.meta-cell:nth-last-child(-n+2){border-bottom:none}
  .mc-lbl{font-size:7.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;margin-bottom:2px}
  .mc-val{font-size:11px;font-weight:600;color:#111}.mc-val.mono{font-family:"Courier New",monospace}
  .sec-head{background:#f9fafb;border:1px solid #e5e7eb;border-bottom:none;padding:4px 9px;font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#6b7280;margin-top:6px;border-radius:5px 5px 0 0}
  table{width:100%;border-collapse:collapse;font-size:10.5px}table td,table th{padding:5px 8px;border:1px solid #e5e7eb}
  table th{background:#f3f4f6;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#6b7280}
  table td:last-child,table th:last-child{text-align:right}
  tr.sub td{background:#f9fafb;font-weight:700}tr.red td{color:#dc2626}
  .total-box{border:2px solid #111827;border-radius:0 0 7px 7px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;margin-top:-1px}
  .total-lbl{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#6b7280}
  .total-val{font-size:18px;font-weight:800;color:#111827;font-family:"Courier New",monospace}
  .ft{display:flex;justify-content:space-between;margin-top:12px;padding-top:8px;border-top:1px dashed #e5e7eb}
  .sig-line{width:44%;text-align:center}.sig-line .line{border-top:1px solid #374151;padding-top:3px;margin-top:20px;font-size:8px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body>
<div class="wrap">
  <div class="hd">${logoHTML}<div class="hd-info"><div class="hd-name">${millName}</div>${millAddress?`<div class="hd-sub">${millAddress}</div>`:""} ${millPhone?`<div class="hd-sub">${millPhone}</div>`:""}</div><div class="hd-right"><div class="hd-type">Sales</div><div class="hd-no">#${sr}</div><div class="hd-date">${inv.date||""}</div></div></div>
  <div class="meta">
    <div class="meta-cell"><div class="mc-lbl">Customer</div><div class="mc-val">${inv.vendorName||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Vehicle</div><div class="mc-val mono">${inv.vehicleNo||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Product</div><div class="mc-val">${inv.paddyType||inv.productName||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Builty #</div><div class="mc-val mono">${inv.builtyNo||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Broker</div><div class="mc-val">${inv.brokerName||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Qty (Bags)</div><div class="mc-val mono">${Number(inv.quantity||0)}</div></div>
  </div>
  <div class="sec-head">Weight & Rate</div>
  <table>
    <tr><th>Description</th><th>Value</th></tr>
    <tr><td>Total Weight</td><td>${Number(inv.weight||0).toFixed(2)} kg</td></tr>
    <tr><td>Bag Deduction</td><td>− ${Number(inv.bagWeight||0).toFixed(2)} kg</td></tr>
    <tr class="sub"><td>Net Weight</td><td>${Number(inv.netWeight||0).toFixed(2)} kg</td></tr>
    <tr class="sub"><td>Net Maund</td><td>${Number(inv.netWeight40||0).toFixed(4)} Mn</td></tr>
    <tr><td>Rate / 40 kg</td><td>Rs ${Number(inv.rate40||0).toLocaleString("en-PK")}</td></tr>
    <tr><td>Amount</td><td>Rs ${Number(inv.amount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>
    <tr><td>Sutli / Silai (Rs ${Number(inv.sutliSilaiRate||0)} × ${Number(inv.quantity||0)} bags)</td><td>Rs ${Number(inv.sutliSilaiAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>
    ${Number(inv.bardanaRate||0)>0?`<tr><td>Bardana (Rs ${Number(inv.bardanaRate)} × ${Number(inv.quantity||0)} bags)</td><td>Rs ${Number(inv.bardanaAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
    <tr class="sub"><td>Subtotal${Number(inv.bardanaRate||0)>0?" + Bardana":""}</td><td>Rs ${Number(inv.totalWithBardana||inv.totalAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>
    ${Number(inv.brokeryRate||0)>0?`<tr class="red"><td>− Brokery (${Number(inv.netWeight40||0).toFixed(4)} Mn × Rs ${Number(inv.brokeryRate||0)})</td><td>− Rs ${Number(inv.brokery||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
  </table>
  <div class="total-box"><div><div class="total-lbl">Net Payable</div></div><div class="total-val">Rs ${Number(inv.totalAmount2||inv.totalWithBardana||inv.totalAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</div></div>
  <div class="ft"><div class="sig-line"><div class="line">Customer Signature</div></div><div style="font-size:8px;color:#d1d5db;align-self:flex-end">Powered by Agro Plus</div><div class="sig-line"><div class="line">Authorised Signatory</div></div></div>
</div><script>window.print()</script></body></html>`;
}


function StatCard({ cls, label, value, prefix }) {
  return (
    <div className={`vsi-stat ${cls}`}>
      <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", margin:"0 0 5px" }}>{label}</p>
      <p style={{ fontSize:20, fontWeight:700, color:"#111827", lineHeight:1, margin:0, fontFamily:"'DM Mono',monospace" }}>
        {prefix && <span style={{ fontSize:13, color:"#6b7280", marginRight:3 }}>{prefix}</span>}
        {value}
      </p>
    </div>
  );
}

function Cell({ label, value, mono }) {
  return (
    <div className="vsi-cell">
      <div className="vsi-clbl">{label}</div>
      <div className={`vsi-cval${mono ? " mono" : ""}`}>
        {value !== undefined && value !== null && value !== "" ? value : <span style={{ color:"#d1d5db" }}>—</span>}
      </div>
    </div>
  );
}

function AmtTile({ label, value, color }) {
  return (
    <div>
      <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", marginBottom:1 }}>{label}</div>
      <div style={{ fontSize:13, fontWeight:600, color:color||"#374151", fontFamily:"'DM Mono',monospace" }}>
        {n(value) > 0 ? `Rs ${fmt2(value)}` : "—"}
      </div>
    </div>
  );
}

function FilterPill({ label, onRemove }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"#f3f4f6", border:"1px solid #e5e7eb", borderRadius:5, padding:"2px 8px 2px 9px", fontSize:12, fontWeight:500, color:"#374151" }}>
      {label}
      <button onClick={onRemove} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex", color:"#9ca3af" }}>
        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, overflow:"hidden" }}>
      <div style={{ padding:"12px 16px", borderBottom:"1px solid #f3f4f6", display:"flex", justifyContent:"space-between", gap:10 }}>
        <div style={{ display:"flex", gap:10 }}>
          <div className="vsi-skel" style={{ width:90, height:18 }}/>
          <div className="vsi-skel" style={{ width:70, height:18 }}/>
        </div>
        <div className="vsi-skel" style={{ width:100, height:30, borderRadius:6 }}/>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
        {[...Array(8)].map((_,i)=>(
          <div key={i} style={{ padding:"11px 14px", borderRight:i%4!==3?"1px solid #f3f4f6":"none", borderBottom:i<4?"1px solid #f3f4f6":"none" }}>
            <div className="vsi-skel" style={{ width:"50%", height:9, marginBottom:7 }}/>
            <div className="vsi-skel" style={{ width:"80%", height:14 }}/>
          </div>
        ))}
      </div>
      <div style={{ padding:"10px 16px", background:"#f9fafb", borderTop:"1px solid #f3f4f6", display:"flex", justifyContent:"space-between" }}>
        <div className="vsi-skel" style={{ width:120, height:12 }}/>
        <div className="vsi-skel" style={{ width:100, height:20 }}/>
      </div>
    </div>
  );
}

const lbl = { display:"block", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#6b7280", marginBottom:5 };

export default function ViewSalesInvoices() {
  const [invoices,         setInvoices]         = useState([]);
  const [loading,          setLoading]          = useState(true);
  const [notification,     setNotification]     = useState({ message:"", type:"info" });
  const [search,           setSearch]           = useState("");
  const [fromDate,         setFromDate]         = useState("");
  const [toDate,           setToDate]           = useState("");
  const [paddyFilter,      setPaddyFilter]      = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [summary,          setSummary]          = useState({ revenue:"0", netKg:"0", netMaund:"0", avgBags:"0" });
  const [millProfile,      setMillProfile]      = useState({});

  useEffect(() => {
    (async () => {
      try {
        const [invRes, profRes] = await Promise.allSettled([
          authFetch(`${API_BASE_URL}/sales-invoice`),
          authFetch(`${API_BASE_URL}/profile`),
        ]);
        if (profRes.status === "fulfilled") {
          const pd = await profRes.value.json().catch(()=>({}));
          setMillProfile(pd.profile || pd || {});
        }
        const res = invRes.status === "fulfilled" ? invRes.value : { ok: false, json: async()=>({}) };
        const data = await res.json();
        if (data.success) {
          setInvoices(data.invoices);
          setFilteredInvoices(data.invoices);
          calcSummary(data.invoices);
        } else {
          setNotification({ message: data.message || "Failed to fetch", type:"error" });
        }
      } catch { setNotification({ message:"Server error!", type:"error" }); }
      finally   { setLoading(false); }
    })();
  }, []);

  useEffect(() => {
    let d = invoices;
    if (search) {
      const q = search.toLowerCase();
      d = d.filter(inv =>
        inv.vendorName?.toLowerCase().includes(q) ||
        inv.vehicleNo?.toLowerCase().includes(q) ||
        inv.brokerName?.toLowerCase().includes(q) ||
        productDisplay(inv)?.toLowerCase().includes(q) ||
        String(inv.sr).includes(q)
      );
    }
    if (fromDate)   d = d.filter(inv => new Date(inv.date) >= new Date(fromDate));
    if (toDate)     d = d.filter(inv => new Date(inv.date) <= new Date(toDate));
    if (paddyFilter) d = d.filter(inv => productDisplay(inv) === paddyFilter);
    setFilteredInvoices(d);
    calcSummary(d);
  }, [search, fromDate, toDate, paddyFilter, invoices]);

  const calcSummary = list => {
    const count    = list.length || 1;
    const revenue  = list.reduce((s,i) => s + n(i.totalAmount2 || 0), 0);
    const netKg    = list.reduce((s,i) => s + n(i.netWeight || 0), 0);
    const netMaund = list.reduce((s,i) => s + n(i.netWeight40 || 0), 0);
    const avgBags  = list.reduce((s,i) => s + n(i.quantity || 0), 0);
    setSummary({ revenue: fmt(revenue), netKg: fmt(netKg), netMaund: fmt(netMaund, 3), avgBags: fmt(avgBags / count) });
  };

  const openPrint = inv => {
    const w = window.open("", "_blank");
    if (w) { w.document.write(buildPrintHTML(inv, getMillInfo(millProfile))); w.document.close(); }
  };

  const clearFilters = () => { setSearch(""); setFromDate(""); setToDate(""); setPaddyFilter(""); };
  const hasFilters   = search || fromDate || toDate || paddyFilter;
  const paddyTypes   = [...new Set(invoices.map(i => productDisplay(i)).filter(Boolean))];

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification message={notification.message} type={notification.type}
        onClose={() => setNotification({ message:"", type:"info" })}/>

      <div className="vsi">

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10, marginBottom:18 }}>
          <div>
            <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 3px" }}>Sales</p>
            <h1 style={{ margin:0, fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px" }}>
              Sales Invoices
            </h1>
          </div>
          {!loading && (
            <span style={{ fontSize:12, color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>
              {filteredInvoices.length}
              {filteredInvoices.length !== invoices.length && <span> / {invoices.length}</span>}
              <span style={{ fontFamily:"'DM Sans',sans-serif", marginLeft:4 }}>
                invoice{filteredInvoices.length !== 1 ? "s" : ""}
              </span>
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="vsi-stats" style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:10, marginBottom:16 }}>
          <StatCard cls="s1" label="Total Revenue"     value={summary.revenue}  prefix="Rs"/>
          <StatCard cls="s2" label="Total Net (kg)"    value={summary.netKg}/>
          <StatCard cls="s3" label="Total Maund"       value={summary.netMaund}/>
          <StatCard cls="s4" label="Avg Bags/Invoice"  value={summary.avgBags}/>
        </div>

        {/* Filters */}
        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, padding:"12px 14px", marginBottom:14 }}>
          <div className="vsi-filters" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr auto", gap:10, alignItems:"end" }}>
            <div>
              <label style={lbl}>Search</label>
              <div style={{ position:"relative" }}>
                <svg style={{ position:"absolute", left:9, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}
                  width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                  <path strokeLinecap="round" d="M21 21l-4.35-4.35"/><circle cx={11} cy={11} r={8}/>
                </svg>
                <input className="vsi-inp" value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Invoice #, vendor, vehicle, product…"
                  style={{ paddingLeft:30 }}/>
              </div>
            </div>
            <div>
              <label style={lbl}>From Date</label>
              <input type="date" className="vsi-inp" value={fromDate} onChange={e => setFromDate(e.target.value)}/>
            </div>
            <div>
              <label style={lbl}>To Date</label>
              <input type="date" className="vsi-inp" value={toDate} onChange={e => setToDate(e.target.value)}/>
            </div>
            <div>
              <label style={lbl}>Product</label>
              <div className="vsi-sel-wrap">
                <select className="vsi-sel" value={paddyFilter} onChange={e => setPaddyFilter(e.target.value)}>
                  <option value="">All products</option>
                  {paddyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div style={{ paddingTop:20 }}>
              <button onClick={clearFilters}
                style={{
                  padding:"7px 12px", borderRadius:6, fontSize:12.5, fontWeight:500,
                  border:"1px solid #e5e7eb", background:"#fff", color:"#374151",
                  cursor: hasFilters ? "pointer" : "default",
                  opacity: hasFilters ? 1 : .35, fontFamily:"'DM Sans',sans-serif",
                }}>
                Clear
              </button>
            </div>
          </div>

          {hasFilters && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:10 }}>
              {search      && <FilterPill label={`"${search}"`}      onRemove={() => setSearch("")}/>}
              {fromDate    && <FilterPill label={`From ${fromDate}`} onRemove={() => setFromDate("")}/>}
              {toDate      && <FilterPill label={`To ${toDate}`}     onRemove={() => setToDate("")}/>}
              {paddyFilter && <FilterPill label={paddyFilter}        onRemove={() => setPaddyFilter("")}/>}
            </div>
          )}
        </div>

        {/* Cards */}
        {loading ? (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {[...Array(3)].map((_,i) => <SkeletonCard key={i}/>)}
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div style={{ textAlign:"center", padding:"56px 0", background:"#fff", border:"1px solid #e5e7eb", borderRadius:8 }}>
            <svg width={40} height={40} fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={1.2}
              style={{ display:"block", margin:"0 auto 12px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <p style={{ fontSize:13, fontWeight:600, color:"#374151", margin:"0 0 4px" }}>No invoices found</p>
            <p style={{ fontSize:12, color:"#9ca3af" }}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {filteredInvoices.map((inv, idx) => (
              <div key={inv._id} className="vsi-card" style={{ animationDelay:`${idx*.04}s` }}>

                {/* head */}
                <div className="vsi-card-head">
                  <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                    <div style={{ display:"flex", alignItems:"baseline", gap:5 }}>
                      <span style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".07em" }}>Invoice</span>
                      <span style={{ fontSize:16, fontWeight:700, color:"#111827", fontFamily:"'DM Mono',monospace" }}>
                        #{String(inv.sr || "").padStart(4, "0")}
                      </span>
                    </div>
                    <div style={{ width:1, height:14, background:"#e5e7eb" }}/>
                    <span style={{ fontSize:12.5, color:"#6b7280" }}>{inv.date}</span>
                    {(inv.paddyType || inv.productName || inv.productId) && (
                      <span className="vsi-badge">{productDisplay(inv)}</span>
                    )}
                    {inv.builtyNo && (
                      <span style={{ fontSize:11.5, color:"#6b7280", background:"#f3f4f6", padding:"2px 8px", borderRadius:4, fontFamily:"'DM Mono',monospace" }}>
                        Builty #{inv.builtyNo}
                      </span>
                    )}
                  </div>
                  <button className="vsi-print" onClick={() => openPrint(inv)}>
                    <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                    </svg>
                    Print
                  </button>
                </div>

                {/* data grid */}
                <div className="vsi-grid">
                  <Cell label="Customer"          value={inv.vendorName}/>
                  <Cell label="Vehicle No."       value={inv.vehicleNo} mono/>
                  <Cell label="Broker"            value={inv.brokerName}/>
                  <Cell label="Rate / 40 kg"      value={inv.rate40 ? `Rs ${fmt2(inv.rate40)}` : null} mono/>
                  <Cell label="Qty (Bags)"        value={inv.quantity} mono/>
                  <Cell label="Net Wt. (kg)"      value={inv.netWeight ? fmt2(inv.netWeight) : null} mono/>
                  <Cell label="Net Wt. (Maund)"   value={inv.netWeight40 ? n(inv.netWeight40).toFixed(4) : null} mono/>
                  <Cell label="Sutli Amt."        value={inv.sutliSilaiAmount ? `Rs ${fmt2(inv.sutliSilaiAmount)}` : null} mono/>
                </div>

                {/* footer */}
                <div className="vsi-foot">
                  <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
                    <AmtTile label="Amount"   value={inv.amount}      color="#374151"/>
                    <div style={{ width:1, height:22, background:"#e5e7eb" }}/>
                    <AmtTile label="w/ Sutli" value={inv.totalAmount} color="#374151"/>
                    {n(inv.bardanaAmount) > 0 && (
                      <>
                        <div style={{ width:1, height:22, background:"#e5e7eb" }}/>
                        <AmtTile label="+ Bardana" value={inv.bardanaAmount} color="#374151"/>
                      </>
                    )}
                    {n(inv.brokery) > 0 && (
                      <>
                        <div style={{ width:1, height:22, background:"#e5e7eb" }}/>
                        <div>
                          <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", marginBottom:1 }}>Brokery</div>
                          <div style={{ fontSize:13, fontWeight:600, color:"#dc2626", fontFamily:"'DM Mono',monospace" }}>
                            − Rs {fmt2(inv.brokery)}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", marginBottom:2 }}>Net Payable</div>
                    <div style={{ fontSize:18, fontWeight:700, color:"#111827", fontFamily:"'DM Mono',monospace" }}>
                      Rs {fmt2(inv.totalAmount2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredInvoices.length > 0 && (
          <p style={{ textAlign:"center", color:"#9ca3af", fontSize:12, marginTop:16, fontFamily:"'DM Mono',monospace" }}>
            {filteredInvoices.length} invoice{filteredInvoices.length !== 1 ? "s" : ""}
            {hasFilters ? ` · filtered from ${invoices.length} total` : ""}
          </p>
        )}
      </div>
    </SidebarLayout>
  );
}