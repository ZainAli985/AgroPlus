import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .wbr { font-family: 'DM Sans', sans-serif; color: #111827; }
  .wbr-mono { font-family: 'DM Mono', monospace; }

  /* stat cards */
  .wbr-stat {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; padding: 14px 16px;
    position: relative; overflow: hidden;
  }
  .wbr-stat::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 3px;
  }
  .wbr-stat.s1::before { background: #1f2937; }
  .wbr-stat.s2::before { background: #15803d; }
  .wbr-stat.s3::before { background: #d1d5db; }
  .wbr-stat.s4::before { background: #374151; }

  /* inputs */
  .wbr-inp, .wbr-sel {
    width: 100%; padding: 7px 10px;
    border: 1px solid #d1d5db; border-radius: 6px;
    font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s; appearance: none;
  }
  .wbr-inp::placeholder { color: #9ca3af; }
  .wbr-inp:focus, .wbr-sel:focus {
    border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .wbr-sel-wrap { position: relative; }
  .wbr-sel-wrap::after {
    content: ''; position: absolute; right: 10px; top: 50%;
    transform: translateY(-50%); pointer-events: none;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #9ca3af;
  }

  /* invoice card */
  .wbr-card {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; overflow: hidden;
    transition: box-shadow .12s;
    animation: wbr-in .16s ease both;
  }
  .wbr-card:hover { box-shadow: 0 2px 10px rgba(0,0,0,.07); }
  @keyframes wbr-in { from { opacity:0; transform:translateY(3px); } to { opacity:1; transform:translateY(0); } }

  .wbr-card-head {
    padding: 12px 14px; border-bottom: 1px solid #f3f4f6;
    display: flex; align-items: center; justify-content: space-between;
    gap: 10px; flex-wrap: wrap;
  }
  .wbr-card-body { padding: 12px 14px; }
  .wbr-card-foot {
    padding: 10px 14px; background: #f9fafb;
    border-top: 1px solid #f3f4f6;
    display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;
  }

  /* bar track */
  .wbr-track { flex: 1; height: 4px; background: #f3f4f6; border-radius: 4px; overflow: hidden; }
  .wbr-fill-1st { height: 100%; background: #d1d5db; border-radius: 4px; transition: width .4s; }
  .wbr-fill-2nd { height: 100%; background: #6b7280; border-radius: 4px; transition: width .4s; }
  .wbr-fill-net { height: 100%; background: #15803d; border-radius: 4px; transition: width .4s; }

  /* detail cell */
  .wbr-dcell {
    background: #f9fafb; border: 1px solid #f3f4f6;
    border-radius: 6px; padding: 8px 10px;
  }

  /* print btn */
  .wbr-print {
    display: inline-flex; align-items: center; gap: 5px;
    background: #111827; color: #fff; border: none;
    border-radius: 6px; padding: 5px 12px;
    font-size: 12px; font-weight: 500;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    transition: background .1s; white-space: nowrap;
  }
  .wbr-print:hover { background: #1f2937; }

  /* skeleton */
  @keyframes wbr-shimmer { to { background-position: -200% 0; } }
  .wbr-skel {
    border-radius: 5px; height: 11px;
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    background-size: 200% 100%; animation: wbr-shimmer 1.4s infinite;
  }

  .wbr-badge { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 4px; font-size: 11.5px; font-weight: 600; white-space: nowrap; }
  .wbr-badge.done { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
  .wbr-badge.pend { background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb; }

  .wbr-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .wbr-g3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 6px; }

  @media (max-width: 900px) {
    .wbr-cards { grid-template-columns: 1fr !important; }
    .wbr-stats { grid-template-columns: repeat(2,1fr) !important; }
  }
`;

const fmtNum  = n => Number(n||0).toLocaleString("en-PK");
const fmtDate = v => v ? new Date(v).toLocaleString("en-PK",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}) : "—";
const fmtDay  = v => v ? new Date(v).toLocaleDateString("en-PK",{day:"2-digit",month:"short",year:"numeric"}) : "—";

function wbProductDisplay(e) {
  if (e.productName && e.productName.includes(" - ")) return e.productName;
  const pop = e.productId;
  if (pop && typeof pop === "object")
    return [pop.productName||e.productName,pop.type,pop.subType].filter(Boolean).join(" - ");
  return e.productName||"—";
}

function InvoiceCard({ e, onPrint }) {
  const [expanded, setExpanded] = useState(false);
  const maxW = Math.max(Number(e.firstWeight||0), Number(e.secondWeight||0));

  return (
    <div className="wbr-card">
      <div className="wbr-card-head">
        <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:5 }}>
            <span style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".07em" }}>Invoice</span>
            <span className="wbr-mono" style={{ fontSize:15, fontWeight:700, color:"#111827" }}>{e.invoiceCode}</span>
          </div>
          <div style={{ width:1, height:14, background:"#e5e7eb" }}/>
          <span style={{ fontSize:12.5, color:"#6b7280" }}>{fmtDay(e.createdAt)}</span>
          <span className="wbr-badge" style={{ background:"#f3f4f6", color:"#374151", border:"1px solid #e5e7eb", fontFamily:"'DM Mono',monospace", fontSize:11.5 }}>
            {wbProductDisplay(e)}
          </span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:7 }}>
          <span className={`wbr-badge ${e.completed?"done":"pend"}`}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:e.completed?"#15803d":"#9ca3af", display:"inline-block" }}/>
            {e.completed?"Complete":"Pending"}
          </span>
          <button className="wbr-print" onClick={()=>onPrint(e)}>
            <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
            </svg>
            Print
          </button>
        </div>
      </div>

      <div className="wbr-card-body">
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom: e.completed ? 12 : 0 }}>
          <div style={{ flex:1, minWidth:0 }}>
            <p style={{ fontWeight:600, color:"#111827", fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", margin:"0 0 2px" }}>
              {e.vendorName}
            </p>
            <p style={{ fontSize:12, color:"#6b7280", margin:0 }}>{e.vehicleNumber||"—"} · {e.vehicleType}</p>
          </div>
          <div style={{ textAlign:"right", flexShrink:0 }}>
            <p style={{ fontSize:9.5, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".08em", margin:"0 0 2px" }}>
              {e.completed?"Net Weight":"First Weight"}
            </p>
            <p className="wbr-mono" style={{ fontSize:20, fontWeight:700, color:e.completed?"#15803d":"#374151", margin:0, lineHeight:1 }}>
              {fmtNum(e.completed?e.netWeight:e.firstWeight)}
            </p>
            <p style={{ fontSize:10, color:"#9ca3af", margin:"2px 0 0" }}>kg</p>
          </div>
        </div>

        {/* Weight bars */}
        {e.completed && (
          <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            {[["1st",e.firstWeight,"wbr-fill-1st"],["2nd",e.secondWeight,"wbr-fill-2nd"],["Net",e.netWeight,"wbr-fill-net"]].map(([lbl,val,cls])=>(
              <div key={lbl} style={{ display:"flex", alignItems:"center", gap:8, fontSize:11.5 }}>
                <span className="wbr-mono" style={{ width:28, textAlign:"right", color:"#9ca3af", fontWeight:600 }}>{lbl}</span>
                <div className="wbr-track">
                  <div className={cls} style={{ width:`${Math.min(100,(Number(val)||0)/maxW*100)}%` }}/>
                </div>
                <span className="wbr-mono" style={{ width:70, color:lbl==="Net"?"#15803d":"#374151", fontWeight:lbl==="Net"?700:400 }}>
                  {fmtNum(val)} kg
                </span>
              </div>
            ))}
            <div className="wbr-g2" style={{ marginTop:6 }}>
              {[["Maund",`${Number(e.netWeightMaund||0).toFixed(2)} Mn`],["Metric Ton",`${Number(e.netWeightTon||0).toFixed(2)} T`]].map(([l,v])=>(
                <div key={l} className="wbr-dcell">
                  <p style={{ fontSize:9.5, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".08em", margin:"0 0 2px" }}>{l}</p>
                  <p className="wbr-mono" style={{ fontSize:12.5, fontWeight:600, color:"#374151", margin:0 }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="wbr-card-foot">
        <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
          <div>
            <p style={{ fontSize:9.5, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".07em", margin:"0 0 1px" }}>Rate</p>
            <p className="wbr-mono" style={{ fontSize:12.5, fontWeight:600, color:"#374151", margin:0 }}>Rs {fmtNum(e.rate)}</p>
          </div>
          <div style={{ width:1, height:22, background:"#e5e7eb", alignSelf:"center" }}/>
          <div>
            <p style={{ fontSize:9.5, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".07em", margin:"0 0 1px" }}>Date</p>
            <p className="wbr-mono" style={{ fontSize:12.5, fontWeight:600, color:"#374151", margin:0 }}>{fmtDay(e.createdAt)}</p>
          </div>
        </div>
        <button
          onClick={()=>setExpanded(v=>!v)}
          style={{ fontSize:12, fontWeight:500, color:"#6b7280", background:"none", border:"1px solid #e5e7eb", borderRadius:5, padding:"4px 10px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all .1s" }}
          onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"}
          onMouseLeave={e=>e.currentTarget.style.background="none"}>
          {expanded?"Hide details ▲":"Details ▼"}
        </button>
      </div>

      {expanded && (
        <div style={{ borderTop:"1px solid #f3f4f6", padding:"12px 14px", background:"#fafafa" }}>
          <p style={{ fontSize:10, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".08em", margin:"0 0 9px" }}>Full Entry Details</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
            {[["Vendor",e.vendorName],["Vehicle No.",e.vehicleNumber||"—"],["Vehicle Type",e.vehicleType],["Product",wbProductDisplay(e)],["Rate",`Rs ${fmtNum(e.rate)}`],["Invoice",e.invoiceCode],["1st Weight",`${fmtNum(e.firstWeight)} kg`],["1st Driver",e.firstWeightWithDriver?"With Driver":"Without Driver"],["1st Time",fmtDate(e.firstWeightTime||e.createdAt)],["2nd Weight",e.secondWeight?`${fmtNum(e.secondWeight)} kg`:"—"],["2nd Driver",e.secondWeight?(e.secondWeightWithDriver?"With Driver":"Without Driver"):"—"],["2nd Time",fmtDate(e.secondWeightTime)]].map(([k,v])=>(
              <div key={k} className="wbr-dcell" style={{ background:"#fff" }}>
                <p style={{ fontSize:9.5, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".07em", margin:"0 0 2px" }}>{k}</p>
                <p className="wbr-mono" style={{ fontSize:12, fontWeight:600, color:"#374151", margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const lbl = { display:"block", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#6b7280", marginBottom:5 };

export default function WeightBridgeReport() {
  const [entries,         setEntries]         = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [filters,         setFilters]         = useState({ vendor:"", product:"", date:"", status:"" });
  const [loading,         setLoading]         = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res  = await authFetch(`${API_BASE_URL}/weight-bridge`);
        const data = await res.json();
        if (data.success) { setEntries(data.entries); setFilteredEntries(data.entries); }
      } catch {}
      finally { setLoading(false); }
    })();
  }, []);

  useEffect(() => {
    let data = [...entries];
    if (filters.vendor)  data = data.filter(e=>e.vendorName?.toLowerCase().includes(filters.vendor.toLowerCase()));
    if (filters.product) data = data.filter(e=>wbProductDisplay(e)?.toLowerCase().includes(filters.product.toLowerCase()));
    if (filters.date)    data = data.filter(e=>new Date(e.createdAt).toDateString()===new Date(filters.date).toDateString());
    if (filters.status==="complete") data = data.filter(e=>e.completed);
    if (filters.status==="pending")  data = data.filter(e=>!e.completed);
    setFilteredEntries(data);
  }, [filters, entries]);

  const printInvoice = entry => {
    const firstWeight    = Number(entry.firstWeight||0);
    const secondWeight   = Number(entry.secondWeight||0);
    const netWeight      = Number(entry.netWeight||0);
    const netWeightMaund = Number(entry.netWeightMaund||0);
    const netWeightTon   = Number(entry.netWeightTon||0);
    const content = `<!DOCTYPE html><html><head><title>Weight Bridge Slip — ${entry.invoiceCode}</title>
<style>@page{size:A4;margin:14mm}*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Segoe UI",Arial,sans-serif;color:#111;font-size:12px}.wrap{max-width:660px;margin:auto}.hdr{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #111;padding-bottom:12px;margin-bottom:16px}.hdr-left h1{font-size:18px;font-weight:800;color:#111;text-transform:uppercase;letter-spacing:-.3px}.hdr-left p{font-size:10px;color:#555;margin-top:2px}.hdr-right{text-align:right}.hdr-right h2{font-size:14px;font-weight:800;color:#111;text-transform:uppercase;letter-spacing:1px}.badge{display:inline-block;background:#111;color:#fff;font-size:13px;font-weight:700;padding:4px 12px;border-radius:6px;margin-top:6px;font-family:"Courier New",monospace;letter-spacing:1px}.info{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}.box{border:1px solid #ddd;border-radius:6px;padding:8px 10px}.box h4{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#555;border-bottom:1px solid #eee;padding-bottom:4px;margin-bottom:6px}.box p{font-size:11px;margin:2px 0}table{width:100%;border-collapse:collapse;margin-top:10px;font-size:11px}thead tr{background:#111;color:#fff}th{padding:7px 8px;text-align:left;font-weight:600;font-size:10px;text-transform:uppercase;letter-spacing:.08em}th.r,td.r{text-align:right}td{border:1px solid #ddd;padding:6px 8px}tr.net td{font-weight:800;background:#f5f5f5;font-size:13px}tr.unit td{color:#555}.sig{display:flex;justify-content:space-between;margin-top:44px;font-size:11px}.sig div{text-align:center}.sig span{display:block;width:160px;border-top:1px solid #555;padding-top:4px;margin-top:40px}.footer{text-align:center;margin-top:28px;font-size:10px;color:#888}</style></head><body>
<div class="wrap"><div class="hdr"><div class="hdr-left"><h1>Al Rehman Rice Mills</h1><p>Deepalpur Road, Babarkhai, Arzanipur, Chunian, Kasur – Pakistan</p></div><div class="hdr-right"><h2>Weight Bridge Slip</h2><div class="badge">${entry.invoiceCode}</div><p style="font-size:10px;color:#555;margin-top:6px;">${new Date(entry.createdAt).toLocaleString("en-PK")}</p></div></div>
<div class="info"><div class="box"><h4>Party Details</h4><p><b>Vendor:</b> ${entry.vendorName}</p><p><b>Product:</b> ${wbProductDisplay(entry)}</p></div><div class="box"><h4>Transport Details</h4><p><b>Vehicle No.:</b> ${entry.vehicleNumber||"—"}</p><p><b>Vehicle Type:</b> ${entry.vehicleType}</p><p><b>Rate:</b> Rs ${fmtNum(entry.rate)}</p></div></div>
<table><thead><tr><th>Description</th><th class="r">Weight (kg)</th><th>Driver</th><th>Time</th></tr></thead><tbody>
<tr><td>First Weight</td><td class="r">${fmtNum(firstWeight)}</td><td>${entry.firstWeightWithDriver?"With Driver":"Without Driver"}</td><td>${fmtDate(entry.firstWeightTime||entry.createdAt)}</td></tr>
<tr><td>Second Weight</td><td class="r">${secondWeight?fmtNum(secondWeight):"—"}</td><td>${entry.secondWeight?(entry.secondWeightWithDriver?"With Driver":"Without Driver"):"—"}</td><td>${fmtDate(entry.secondWeightTime)}</td></tr>
<tr class="net"><td>Net Weight</td><td class="r">${fmtNum(netWeight)}</td><td colspan="2"></td></tr>
<tr class="unit"><td>Net Weight (Maund)</td><td class="r">${netWeightMaund.toFixed(2)} Mn</td><td colspan="2"></td></tr>
<tr class="unit"><td>Net Weight (Metric Ton)</td><td class="r">${netWeightTon.toFixed(2)} T</td><td colspan="2"></td></tr>
</tbody></table>
<div class="sig"><div><span>Authorized Signature</span></div><div><span>Receiver's Signature</span></div><div><span>Stamp</span></div></div>
<p class="footer">This is a computer-generated slip. Thank you for your business.</p>
</div><script>window.onload=()=>window.print();</script></body></html>`;
    const w = window.open("","_blank");
    w.document.write(content); w.document.close();
  };

  const totalEntries   = filteredEntries.length;
  const completed      = filteredEntries.filter(e=>e.completed).length;
  const pending        = totalEntries-completed;
  const totalNetWeight = filteredEntries.filter(e=>e.completed).reduce((s,e)=>s+(e.netWeight||0),0);
  const hasFilters     = filters.vendor||filters.product||filters.date||filters.status;

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>

      <div className="wbr">

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10, marginBottom:18 }}>
          <div>
            <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 3px" }}>Operations</p>
            <h1 style={{ margin:0, fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px" }}>
              Weight Bridge Invoices
            </h1>
          </div>
          {!loading && (
            <span style={{ fontSize:12, color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>
              {filteredEntries.length}
              {filteredEntries.length!==entries.length && <span> / {entries.length}</span>}
              <span style={{ fontFamily:"'DM Sans',sans-serif", marginLeft:4 }}>
                entr{filteredEntries.length!==1?"ies":"y"}
              </span>
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="wbr-stats" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:16 }}>
          {[
            { cls:"s1", label:"Total Entries",  value:totalEntries,               unit:"" },
            { cls:"s2", label:"Complete",        value:completed,                  unit:"" },
            { cls:"s3", label:"Pending",         value:pending,                    unit:"" },
            { cls:"s4", label:"Total Net Weight",value:fmtNum(Math.round(totalNetWeight)), unit:"kg" },
          ].map(s=>(
            <div key={s.cls} className={`wbr-stat ${s.cls}`}>
              <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", margin:"0 0 5px" }}>{s.label}</p>
              <p className="wbr-mono" style={{ fontSize:20, fontWeight:700, color:"#111827", lineHeight:1, margin:0 }}>
                {s.value}
                {s.unit && <span style={{ fontSize:11, color:"#9ca3af", marginLeft:4, fontFamily:"'DM Sans',sans-serif" }}>{s.unit}</span>}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, padding:"12px 14px", marginBottom:14 }}>
          <p style={{ fontSize:10, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".08em", margin:"0 0 10px" }}>Filter</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, alignItems:"flex-end" }}>
            <div style={{ flex:1, minWidth:160 }}>
              <label style={lbl}>Vendor</label>
              <input type="text" className="wbr-inp" placeholder="Vendor name…" value={filters.vendor}
                onChange={e=>setFilters({...filters,vendor:e.target.value})}/>
            </div>
            <div style={{ flex:1, minWidth:160 }}>
              <label style={lbl}>Product</label>
              <input type="text" className="wbr-inp" placeholder="Product name…" value={filters.product}
                onChange={e=>setFilters({...filters,product:e.target.value})}/>
            </div>
            <div>
              <label style={lbl}>Date</label>
              <input type="date" className="wbr-inp" value={filters.date}
                onChange={e=>setFilters({...filters,date:e.target.value})}/>
            </div>
            <div>
              <label style={lbl}>Status</label>
              <div className="wbr-sel-wrap">
                <select className="wbr-sel" value={filters.status}
                  onChange={e=>setFilters({...filters,status:e.target.value})}>
                  <option value="">All Status</option>
                  <option value="complete">Complete</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
            {hasFilters && (
              <button onClick={()=>setFilters({vendor:"",product:"",date:"",status:""})}
                style={{ padding:"7px 12px", borderRadius:6, border:"1px solid #fecaca", background:"#fef2f2", fontSize:12.5, fontWeight:500, color:"#dc2626", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Cards */}
        {loading ? (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[...Array(4)].map((_,i)=>(
              <div key={i} style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, overflow:"hidden" }}>
                <div style={{ padding:"12px 14px", borderBottom:"1px solid #f3f4f6", display:"flex", justifyContent:"space-between" }}>
                  <div className="wbr-skel" style={{ width:100 }}/>
                  <div className="wbr-skel" style={{ width:70 }}/>
                </div>
                <div style={{ padding:"12px 14px" }}>
                  <div className="wbr-skel" style={{ width:"70%", marginBottom:8 }}/>
                  <div className="wbr-skel" style={{ width:"50%" }}/>
                </div>
              </div>
            ))}
          </div>
        ) : filteredEntries.length===0 ? (
          <div style={{ textAlign:"center", padding:"56px 0", background:"#fff", border:"1px solid #e5e7eb", borderRadius:8 }}>
            <div style={{ fontSize:36, marginBottom:10 }}>⚖️</div>
            <p style={{ fontSize:13, fontWeight:600, color:"#374151", margin:"0 0 4px" }}>No entries found</p>
            <p style={{ fontSize:12, color:"#9ca3af" }}>Try adjusting your filters</p>
          </div>
        ) : (
          <>
            {filteredEntries.length>0 && (
              <p style={{ fontSize:11.5, color:"#9ca3af", margin:"0 0 12px", fontFamily:"'DM Mono',monospace" }}>
                {filteredEntries.length} entr{filteredEntries.length!==1?"ies":"y"}
                {hasFilters?` · filtered from ${entries.length} total`:""}
              </p>
            )}
            <div className="wbr-cards" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {filteredEntries.map((e,i)=>(
                <div key={e._id} style={{ animationDelay:`${i*.03}s` }}>
                  <InvoiceCard e={e} onPrint={printInvoice}/>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </SidebarLayout>
  );
}