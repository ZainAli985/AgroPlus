import React, { useEffect, useState, useMemo, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .sm { font-family: 'DM Sans', sans-serif; color: #111827; }

  /* inputs */
  .sm-inp {
    border: 1px solid #d1d5db; border-radius: 6px; padding: 7px 10px;
    font-size: 12.5px; font-family: 'DM Sans', sans-serif; color: #111827;
    background: #fff; outline: none; transition: border-color .12s, box-shadow .12s;
    appearance: none; width: 100%;
  }
  .sm-inp::placeholder { color: #9ca3af; }
  .sm-inp:focus { border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12); }

  /* stat bar */
  .sm-statbar {
    display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; margin-bottom: 12px;
  }
  @media (max-width: 1100px) { .sm-statbar { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 560px)  { .sm-statbar { grid-template-columns: repeat(2, 1fr); } }

  .sm-stat {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 7px; padding: 10px 12px; position: relative; overflow: hidden;
  }
  .sm-stat::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background: var(--ac, #d1d5db); }

  /* product pill bar */
  .sm-pill-bar {
    display: flex; gap: 6px; overflow-x: auto; padding-bottom: 2px;
    scrollbar-width: none;
  }
  .sm-pill-bar::-webkit-scrollbar { display: none; }
  .sm-pill {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 10px; border-radius: 5px; white-space: nowrap;
    border: 1px solid #e5e7eb; background: #fff; cursor: pointer;
    font-size: 12px; font-weight: 500; color: #374151;
    font-family: 'DM Sans', sans-serif; transition: all .1s; flex-shrink: 0;
  }
  .sm-pill:hover { border-color: #d1d5db; background: #f9fafb; }
  .sm-pill.on { background: #111827; color: #fff; border-color: #111827; }
  .sm-pill-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .sm-pill-count {
    font-size: 10px; font-family: 'DM Mono', monospace;
    opacity: .65; margin-left: 1px;
  }

  /* product mini-stats strip (shown when a product is active) */
  .sm-prod-stats {
    display: flex; gap: 0; background: #fff;
    border: 1px solid #e5e7eb; border-radius: 7px; overflow: hidden;
    margin-bottom: 10px;
  }
  .sm-prod-stat-cell {
    flex: 1; padding: 8px 12px; border-right: 1px solid #f3f4f6;
    min-width: 0;
  }
  .sm-prod-stat-cell:last-child { border-right: none; }

  /* filter row */
  .sm-filter-grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr 1fr auto;
    gap: 9px; align-items: end;
  }
  @media (max-width: 700px) {
    .sm-filter-grid { grid-template-columns: 1fr 1fr; }
  }

  /* table */
  .sm-tbl { width: 100%; border-collapse: collapse; font-size: 12.5px; }
  .sm-tbl thead tr { background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
  .sm-tbl thead th {
    padding: 9px 11px; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .07em;
    color: #9ca3af; text-align: left; white-space: nowrap;
  }
  .sm-tbl thead th.r { text-align: right; }
  .sm-tbl tbody tr { border-bottom: 1px solid #f9fafb; transition: background .08s; }
  .sm-tbl tbody tr:hover { background: #fafafa; }
  .sm-td   { padding: 9px 11px; vertical-align: middle; }
  .sm-td-r { padding: 9px 11px; text-align: right; vertical-align: middle; white-space: nowrap; }

  /* badges */
  .sm-badge-in  { display:inline-flex; align-items:center; padding:2px 7px; border-radius:4px; font-size:10.5px; font-weight:600; background:#f0fdf4; color:#15803d; border:1px solid #bbf7d0; white-space:nowrap; }
  .sm-badge-out { display:inline-flex; align-items:center; padding:2px 7px; border-radius:4px; font-size:10.5px; font-weight:600; background:#fef2f2; color:#dc2626; border:1px solid #fecaca; white-space:nowrap; }

  .sm-dr { font-size:9px; font-weight:700; padding:1px 5px; border-radius:3px; background:#f0fdf4; color:#15803d; text-transform:uppercase; letter-spacing:.04em; flex-shrink:0; }
  .sm-cr { font-size:9px; font-weight:700; padding:1px 5px; border-radius:3px; background:#fef2f2; color:#dc2626; text-transform:uppercase; letter-spacing:.04em; flex-shrink:0; }

  .sm-tot td { background: #f9fafb; font-weight: 700; border-top: 2px solid #e5e7eb; }

  @keyframes sm-shimmer { to { background-position: -200% 0; } }
  .sm-sk {
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    background-size: 200%; animation: sm-shimmer 1.3s infinite; border-radius: 5px;
  }

  @media print {
    .sm-nopr { display: none !important; }
    .sm-tbl { font-size: 10px; }
    .sm-td, .sm-td-r { padding: 5px 7px; }
  }
`;

const nv   = v => isNaN(Number(v)) ? 0 : Number(v) || 0;
const fmt  = (v,d=2) => nv(v).toLocaleString("en-PK",{minimumFractionDigits:d,maximumFractionDigits:d});
const fmt0 = v => nv(v).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0});
const fmt4 = v => nv(v).toLocaleString("en-PK",{minimumFractionDigits:4,maximumFractionDigits:4});

const COLORS = ["#374151","#15803d","#b45309","#1d4ed8","#7c3aed","#0e7490","#be185d","#dc2626"];
const pColor = i => COLORS[i % COLORS.length];

function buildPrint(filtered, activeName, ds) {
  const rows = filtered.map(e => {
    const isP = e.type === "purchase";
    return `<tr style="background:${isP?"#f0fdf4":"#fef2f2"}">
      <td>${e.date}</td>
      <td style="font-weight:700;color:${isP?"#15803d":"#dc2626"}">${e.invoiceNo}</td>
      <td>
        <div style="margin-bottom:3px"><span style="font-size:8px;font-weight:700;padding:1px 4px;border-radius:3px;background:#f0fdf4;color:#15803d">DR</span>
        <strong style="margin-left:4px">${e.drAccountName}</strong></div>
        <div style="padding-left:8px;border-left:2px solid #e5e7eb"><span style="font-size:8px;font-weight:700;padding:1px 4px;border-radius:3px;background:#fef2f2;color:#dc2626">CR</span>
        <span style="margin-left:4px">${e.crAccountName}</span></div>
      </td>
      <td style="font-size:10px">${e.bags} bags · ${fmt4(e.maund)} Maund<br>Rate: Rs ${fmt0(e.rate)}</td>
      <td style="text-align:center;font-size:9px;font-weight:700;color:${isP?"#15803d":"#dc2626"}">${isP?"▲ IN":"▼ OUT"}</td>
      <td style="text-align:right;font-weight:700;color:#15803d">Rs ${fmt(e.debit)}</td>
      <td style="text-align:right;font-weight:700;color:#dc2626">Rs ${fmt(e.credit)}</td>
    </tr>`;
  }).join("");
  return `<!DOCTYPE html><html><head><title>Stock Ledger${activeName?" — "+activeName:""}</title>
<style>@page{size:A4 landscape;margin:10mm}body{font-family:"Segoe UI",Arial,sans-serif;color:#111;font-size:10px}
.hd{display:flex;justify-content:space-between;border-bottom:3px solid #111;padding-bottom:8px;margin-bottom:12px}
.co{font-size:15px;font-weight:800}.ca{font-size:9px;color:#6b7280;margin-top:2px}
.sum{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px}
.sb{border:1px solid #e5e7eb;border-radius:5px;padding:6px 9px}
.sl{font-size:7.5px;text-transform:uppercase;letter-spacing:.05em;color:#9ca3af}
.sv{font-size:12px;font-weight:700}
table{width:100%;border-collapse:collapse}
thead tr{background:#111;color:#fff}
th{padding:5px 7px;text-align:left;font-size:8.5px;font-weight:700;text-transform:uppercase}
th.r{text-align:right}
td{border:1px solid #e5e7eb;padding:5px 7px;vertical-align:top}
.ft td{font-weight:700;background:#f9fafb;border-top:2px solid #111}
</style></head><body>
<div class="hd">
  <div><div class="co">Al Rehman Rice Mills</div><div class="ca">Deepalpur Road, Babarkhai, Arzanipur, Chunian, Kasur – Pakistan</div></div>
  <div style="text-align:right"><strong>STOCK MANAGEMENT LEDGER${activeName?" — "+activeName:""}</strong><br>
  <span style="font-size:9px;color:#9ca3af">Printed: ${new Date().toLocaleDateString("en-PK",{day:"2-digit",month:"short",year:"numeric"})}</span></div>
</div>
<div class="sum">
  <div class="sb"><div class="sl">Stock In</div><div class="sv">Rs ${fmt(ds.totalStockIn)}</div></div>
  <div class="sb"><div class="sl">Stock Out</div><div class="sv">Rs ${fmt(ds.totalStockOut)}</div></div>
  <div class="sb"><div class="sl">Maund In / Out</div><div class="sv">${fmt4(ds.totalMaundIn)} / ${fmt4(ds.totalMaundOut)}</div></div>
  <div class="sb"><div class="sl">Bags In / Out</div><div class="sv">${fmt0(ds.totalQtyIn)} / ${fmt0(ds.totalQtyOut)}</div></div>
</div>
<table>
  <thead><tr><th>Date</th><th>Invoice</th><th>Particulars</th><th>Description</th>
  <th>Type</th><th class="r">Debit (DR)</th><th class="r">Credit (CR)</th></tr></thead>
  <tbody>${rows}</tbody>
  <tfoot class="ft"><tr>
    <td colspan="5"><strong>Totals — ${filtered.length} entries</strong></td>
    <td style="text-align:right"><strong>Rs ${fmt(ds.totalStockIn)}</strong></td>
    <td style="text-align:right"><strong>Rs ${fmt(ds.totalStockOut)}</strong></td>
  </tr></tfoot>
</table>
</body></html>`;
}

function SkRow() {
  return (
    <tr>
      {[70,60,170,140,50,110,110].map((w,i)=>(
        <td key={i} className="sm-td"><div className="sm-sk" style={{ width:w, height:11 }}/></td>
      ))}
    </tr>
  );
}

export default function StockManagement() {
  const [entries,    setEntries]    = useState([]);
  const [perProduct, setPerProduct] = useState([]);
  const [summary,    setSummary]    = useState({});
  const [loading,    setLoading]    = useState(true);
  const [notif,      setNotif]      = useState({ message:"", type:"info" });

  const [activeProd, setActiveProd] = useState("");
  const [search,     setSearch]     = useState("");
  const [fromDate,   setFromDate]   = useState("");
  const [toDate,     setToDate]     = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res  = await authFetch(`${API_BASE_URL}/stock/entries`);
        const data = await res.json();
        if (data.success) {
          setEntries(data.entries);
          setPerProduct(data.perProduct || []);
          setSummary(data.summary || {});
        } else setNotif({ message:data.message||"Failed to load", type:"error" });
      } catch { setNotif({ message:"Server error.", type:"error" }); }
      finally  { setLoading(false); }
    })();
  }, []);

  const filtered = useMemo(() => entries.filter(e => {
    if (activeProd && e.productName !== activeProd) return false;
    if (typeFilter && e.type !== typeFilter) return false;
    if (fromDate && new Date(e.date) < new Date(fromDate)) return false;
    if (toDate   && new Date(e.date) > new Date(toDate))   return false;
    if (search) {
      const q = search.toLowerCase();
      if (!e.productName?.toLowerCase().includes(q) &&
          !e.vendorName?.toLowerCase().includes(q)  &&
          !e.invoiceNo?.toLowerCase().includes(q)   &&
          !e.vehicleNo?.toLowerCase().includes(q))  return false;
    }
    return true;
  }), [entries, activeProd, typeFilter, fromDate, toDate, search]);

  const hasFilter = activeProd || search || fromDate || toDate || typeFilter;

  const ds = hasFilter ? {
    totalStockIn:  filtered.filter(e=>e.type==="purchase").reduce((s,e)=>s+nv(e.amount),0),
    totalStockOut: filtered.filter(e=>e.type==="sale").reduce((s,e)=>s+nv(e.amount),0),
    totalMaundIn:  filtered.filter(e=>e.type==="purchase").reduce((s,e)=>s+nv(e.maund),0),
    totalMaundOut: filtered.filter(e=>e.type==="sale").reduce((s,e)=>s+nv(e.maund),0),
    totalQtyIn:    filtered.filter(e=>e.type==="purchase").reduce((s,e)=>s+nv(e.bags),0),
    totalQtyOut:   filtered.filter(e=>e.type==="sale").reduce((s,e)=>s+nv(e.bags),0),
  } : summary;

  const netBalance = nv(ds.totalStockIn) - nv(ds.totalStockOut);
  const netMaund   = nv(ds.totalMaundIn) - nv(ds.totalMaundOut);

  const openPrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildPrint(filtered, activeProd || null, ds));
    w.document.close();
  };

  const clearAll = () => { setSearch(""); setFromDate(""); setToDate(""); setTypeFilter(""); setActiveProd(""); };

  const activePP = perProduct.find(p => p.productName === activeProd);

  const lbl = { fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#6b7280", display:"block", marginBottom:5 };

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification message={notif.message} type={notif.type}
        onClose={() => setNotif({ message:"", type:"info" })}/>

      <div className="sm">

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10, marginBottom:14 }}>
          <div>
            <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 3px" }}>Operations</p>
            <h1 style={{ margin:0, fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px" }}>Stock Ledger</h1>
          </div>
          <div className="sm-nopr" style={{ display:"flex", alignItems:"center", gap:8 }}>
            {!loading && (
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11.5, color:"#9ca3af", background:"#f3f4f6", padding:"4px 10px", borderRadius:5, border:"1px solid #e5e7eb" }}>
                {filtered.length}
                {filtered.length !== entries.length && <span style={{ color:"#d1d5db" }}> / {entries.length}</span>}
                <span style={{ fontFamily:"'DM Sans',sans-serif", marginLeft:4 }}>entries</span>
              </span>
            )}
            <button onClick={openPrint}
              style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#111827", color:"#fff", border:"none", borderRadius:6, padding:"7px 14px", fontSize:12.5, fontWeight:500, fontFamily:"'DM Sans',sans-serif", cursor:"pointer", transition:"background .1s", whiteSpace:"nowrap" }}
              onMouseEnter={e=>e.currentTarget.style.background="#1f2937"}
              onMouseLeave={e=>e.currentTarget.style.background="#111827"}>
              <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
              </svg>
              Print Ledger
            </button>
          </div>
        </div>

        {/* Stat bar */}
        <div className="sm-statbar">
          {[
            { label:"Stock In",    value:`Rs ${fmt(ds.totalStockIn)}`,       ac:"#15803d" },
            { label:"Stock Out",   value:`Rs ${fmt(ds.totalStockOut)}`,      ac:"#dc2626" },
            { label:"Net Balance", value:`Rs ${fmt(Math.abs(netBalance))}`,  ac:netBalance>=0?"#15803d":"#dc2626", sub:netBalance>=0?"surplus":"deficit" },
            { label:"Maund In",    value:fmt4(ds.totalMaundIn),              ac:"#15803d" },
            { label:"Maund Out",   value:fmt4(ds.totalMaundOut),             ac:"#dc2626" },
            { label:"Net Maund",   value:fmt4(Math.abs(netMaund)),           ac:netMaund>=0?"#15803d":"#dc2626",
              sub:`${fmt0(ds.totalQtyIn)} / ${fmt0(ds.totalQtyOut)} bags` },
          ].map(s=>(
            <div key={s.label} className="sm-stat" style={{ "--ac":s.ac }}>
              <p style={{ fontSize:9.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", margin:"0 0 4px" }}>{s.label}</p>
              <p style={{ fontFamily:"'DM Mono',monospace", fontSize:14, fontWeight:700, color:"#111827", lineHeight:1, margin:0 }}>{s.value}</p>
              {s.sub && <p style={{ fontSize:10.5, color:"#9ca3af", margin:"3px 0 0" }}>{s.sub}</p>}
            </div>
          ))}
        </div>

        {/* Product pill bar */}
        {!loading && perProduct.length > 0 && (
          <div className="sm-nopr" style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, padding:"10px 12px", marginBottom:10 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:10, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".07em", flexShrink:0 }}>Product</span>
              <div className="sm-pill-bar">
                {/* All */}
                <button className={`sm-pill${!activeProd?" on":""}`} onClick={()=>setActiveProd("")}>
                  <span>All</span>
                  <span className="sm-pill-count">{entries.length}</span>
                </button>
                {perProduct.map((pp, i) => {
                  const on = activeProd === pp.productName;
                  const c  = pColor(i);
                  const cnt = entries.filter(e=>e.productName===pp.productName).length;
                  return (
                    <button key={pp.accountId||i} className={`sm-pill${on?" on":""}`}
                      onClick={()=>setActiveProd(on?"":pp.productName)}>
                      <span className="sm-pill-dot" style={{ background:on?"rgba(255,255,255,.7)":c }}/>
                      {pp.productName}
                      <span className="sm-pill-count">{cnt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Active product mini-stats */}
        {activeProd && activePP && (
          <div className="sm-prod-stats sm-nopr" style={{ marginBottom:10 }}>
            {[
              ["Purchased", `Rs ${fmt(activePP.totalStockIn)}`,  "#15803d"],
              ["Sold",      `Rs ${fmt(activePP.totalStockOut)}`, "#dc2626"],
              ["Maund In",  fmt4(activePP.totalMaundIn),         "#15803d"],
              ["Maund Out", fmt4(activePP.totalMaundOut),        "#dc2626"],
              ["Net",       `Rs ${fmt(Math.abs(nv(activePP.totalStockIn)-nv(activePP.totalStockOut)))}`,
               nv(activePP.totalStockIn)>=nv(activePP.totalStockOut)?"#15803d":"#dc2626"],
            ].map(([l,v,c])=>(
              <div key={l} className="sm-prod-stat-cell">
                <p style={{ fontSize:9.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", margin:"0 0 2px" }}>{l}</p>
                <p style={{ fontFamily:"'DM Mono',monospace", fontSize:12.5, fontWeight:700, color:c, margin:0 }}>{v}</p>
              </div>
            ))}
            <div className="sm-prod-stat-cell" style={{ display:"flex", alignItems:"center" }}>
              <button onClick={()=>setActiveProd("")}
                style={{ padding:"4px 9px", borderRadius:5, border:"1px solid #e5e7eb", background:"#fff", color:"#374151", fontSize:11.5, fontWeight:500, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", whiteSpace:"nowrap" }}>
                ✕ Clear
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="sm-nopr" style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, padding:"11px 12px", marginBottom:10 }}>
          <div className="sm-filter-grid">
            <div>
              <label style={lbl}>Search</label>
              <div style={{ position:"relative" }}>
                <svg style={{ position:"absolute", left:9, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}
                  width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                  <circle cx={11} cy={11} r={8}/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
                </svg>
                <input className="sm-inp" value={search} onChange={e=>setSearch(e.target.value)}
                  placeholder="Invoice, vendor, vehicle…" style={{ paddingLeft:28 }}/>
              </div>
            </div>
            <div>
              <label style={lbl}>From</label>
              <input type="date" className="sm-inp" value={fromDate} onChange={e=>setFromDate(e.target.value)}/>
            </div>
            <div>
              <label style={lbl}>To</label>
              <input type="date" className="sm-inp" value={toDate} onChange={e=>setToDate(e.target.value)}/>
            </div>
            <div>
              <label style={lbl}>Type</label>
              <div style={{ position:"relative" }}>
                <select className="sm-inp" value={typeFilter} onChange={e=>setTypeFilter(e.target.value)} style={{ paddingRight:26 }}>
                  <option value="">All</option>
                  <option value="purchase">Stock In</option>
                  <option value="sale">Stock Out</option>
                </select>
                <svg style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}
                  width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
            <div style={{ paddingTop:20 }}>
              <button onClick={clearAll}
                style={{ padding:"7px 11px", borderRadius:6, border:"1px solid #e5e7eb", background:"#fff", fontSize:12.5, fontWeight:500, cursor:hasFilter?"pointer":"default", color:hasFilter?"#dc2626":"#9ca3af", opacity:hasFilter?1:.4, fontFamily:"'DM Sans',sans-serif", transition:"all .1s", whiteSpace:"nowrap" }}>
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, overflow:"hidden" }}>
          <div style={{ overflowX:"auto" }}>
            <table className="sm-tbl">
              <thead>
                <tr>
                  <th style={{ width:82 }}>Date</th>
                  <th style={{ width:66 }}>Invoice</th>
                  <th style={{ minWidth:190 }}>Particulars</th>
                  <th style={{ minWidth:180 }}>Description</th>
                  <th style={{ width:56, textAlign:"center" }}>Type</th>
                  <th className="r" style={{ width:120 }}>Debit (DR)</th>
                  <th className="r" style={{ width:120 }}>Credit (CR)</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(6)].map((_,i)=><SkRow key={i}/>)
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={7} style={{ padding:"48px", textAlign:"center" }}>
                    <div style={{ fontSize:30, marginBottom:10 }}>📦</div>
                    <p style={{ fontSize:13, fontWeight:600, color:"#374151", margin:"0 0 4px" }}>No entries found</p>
                    <p style={{ fontSize:12, color:"#9ca3af" }}>
                      {entries.length===0 ? "Create products and save invoices to see stock entries here." : "Try adjusting your filters."}
                    </p>
                  </td></tr>
                ) : (
                  <>
                    {filtered.map(e => {
                      const isP = e.type === "purchase";
                      return (
                        <tr key={e._id} style={{ background:isP?"#fafffe":"#fffafa" }}>

                          <td className="sm-td">
                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11.5, fontWeight:500, color:"#374151" }}>{e.date}</span>
                          </td>

                          <td className="sm-td">
                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, fontWeight:700, color:isP?"#15803d":"#dc2626" }}>{e.invoiceNo}</span>
                          </td>

                          <td className="sm-td">
                            <div style={{ display:"flex", alignItems:"flex-start", gap:5, marginBottom:5 }}>
                              <span className="sm-dr">DR</span>
                              <div>
                                <div style={{ fontSize:12.5, fontWeight:600, color:"#111827", lineHeight:1.3 }}>{e.drAccountName}</div>
                                {isP && <div style={{ fontSize:10.5, color:"#9ca3af", marginTop:1 }}>{e.productName}</div>}
                              </div>
                            </div>
                            <div style={{ display:"flex", alignItems:"flex-start", gap:5, paddingLeft:5, borderLeft:"2px solid #f3f4f6" }}>
                              <span className="sm-cr">CR</span>
                              <div>
                                <div style={{ fontSize:12, fontWeight:500, color:"#374151", lineHeight:1.3 }}>{e.crAccountName}</div>
                                {!isP && <div style={{ fontSize:10.5, color:"#9ca3af", marginTop:1 }}>{e.productName}</div>}
                              </div>
                            </div>
                          </td>

                          <td className="sm-td">
                            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2px 8px" }}>
                              {[
                                ["Bags",      fmt0(e.bags)],
                                ["Rate/40kg", `Rs ${fmt0(e.rate)}`],
                                ["Maund",     fmt4(e.maund)],
                                ["Weight",    `${fmt(e.netWeightKg)} kg`],
                                ["Vehicle",   e.vehicleNo],
                                ["Vendor",    e.vendorName],
                              ].map(([k,v])=>(
                                <div key={k}>
                                  <div style={{ fontSize:8.5, color:"#9ca3af", fontWeight:700, textTransform:"uppercase", letterSpacing:".05em" }}>{k}</div>
                                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, fontWeight:500, color:"#374151" }}>{v||"—"}</div>
                                </div>
                              ))}
                            </div>
                          </td>

                          <td className="sm-td" style={{ textAlign:"center" }}>
                            <span className={isP?"sm-badge-in":"sm-badge-out"}>
                              {isP?"▲ IN":"▼ OUT"}
                            </span>
                          </td>

                          <td className="sm-td-r">
                            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, color:"#15803d" }}>Rs {fmt(e.debit)}</div>
                            <div style={{ fontSize:9.5, color:"#9ca3af", marginTop:1 }}>{e.drAccountName}</div>
                          </td>

                          <td className="sm-td-r">
                            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, color:"#dc2626" }}>Rs {fmt(e.credit)}</div>
                            <div style={{ fontSize:9.5, color:"#9ca3af", marginTop:1 }}>{e.crAccountName}</div>
                          </td>
                        </tr>
                      );
                    })}

                    {/* Totals */}
                    <tr className="sm-tot">
                      <td className="sm-td" colSpan={5}>
                        <span style={{ fontSize:10.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#374151" }}>
                          Totals — {filtered.length} entr{filtered.length!==1?"ies":"y"}
                          {activeProd && ` · ${activeProd}`}
                        </span>
                      </td>
                      <td className="sm-td-r">
                        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, color:"#15803d" }}>Rs {fmt(ds.totalStockIn)}</div>
                        <div style={{ fontSize:9.5, color:"#9ca3af", marginTop:1 }}>{fmt4(ds.totalMaundIn)} Maund</div>
                      </td>
                      <td className="sm-td-r">
                        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, color:"#dc2626" }}>Rs {fmt(ds.totalStockOut)}</div>
                        <div style={{ fontSize:9.5, color:"#9ca3af", marginTop:1 }}>{fmt4(ds.totalMaundOut)} Maund</div>
                      </td>
                    </tr>

                    {/* Net strip */}
                    <tr>
                      <td colSpan={7} style={{ padding:"8px 11px", background:"#f9fafb", borderTop:"1px solid #f3f4f6" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:14, fontSize:12, flexWrap:"wrap" }}>
                          <span style={{ color:"#6b7280", fontWeight:500 }}>Net:</span>
                          <span style={{ fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:12.5, color:netBalance>=0?"#15803d":"#dc2626" }}>
                            {netBalance>=0?"+":"−"} Rs {fmt(Math.abs(netBalance))}
                            <span style={{ fontSize:10, fontWeight:400, marginLeft:5, color:"#9ca3af" }}>({netBalance>=0?"surplus":"deficit"})</span>
                          </span>
                          <span style={{ color:"#e5e7eb" }}>·</span>
                          <span style={{ color:"#6b7280" }}>Maund: <span style={{ fontFamily:"'DM Mono',monospace", fontWeight:600, color:"#374151" }}>{fmt4(Math.abs(netMaund))} {netMaund>=0?"in surplus":"out deficit"}</span></span>
                          <span style={{ color:"#e5e7eb" }}>·</span>
                          <span style={{ color:"#6b7280" }}>Bags: <span style={{ fontFamily:"'DM Mono',monospace", fontWeight:600, color:"#374151" }}>{fmt0(ds.totalQtyIn)} in / {fmt0(ds.totalQtyOut)} out</span></span>
                        </div>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}