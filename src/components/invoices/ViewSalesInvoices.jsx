import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');`;
const CSS = `
  *,*::before,*::after{box-sizing:border-box}
  .vsi-wrap{font-family:'Plus Jakarta Sans',sans-serif;color:#111827}
  .vsi-input,.vsi-select{width:100%;border:1.5px solid #e5e7eb;border-radius:10px;padding:9px 12px;font-size:13.5px;font-family:'Plus Jakarta Sans',sans-serif;color:#111827;background:#fff;outline:none;transition:border-color .15s,box-shadow .15s;appearance:none}
  .vsi-input::placeholder{color:#9ca3af}
  .vsi-input:focus,.vsi-select:focus{border-color:#10b981;box-shadow:0 0 0 3px rgba(16,185,129,.12)}
  .vsi-stat{background:#fff;border:1.5px solid #f3f4f6;border-radius:14px;padding:18px 20px;transition:box-shadow .2s}
  .vsi-stat:hover{box-shadow:0 4px 16px rgba(0,0,0,.07)}
  .vsi-card{background:#fff;border-radius:16px;overflow:hidden;border:1.5px solid #f3f4f6;box-shadow:0 1px 3px rgba(0,0,0,.04);transition:box-shadow .2s,transform .2s}
  .vsi-card:hover{box-shadow:0 8px 24px rgba(0,0,0,.09);transform:translateY(-1px)}
  .vsi-card-head{display:flex;align-items:center;justify-content:space-between;padding:14px 20px 13px;border-bottom:1.5px solid #f3f4f6;gap:12px;flex-wrap:wrap}
  .vsi-data-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0}
  .vsi-data-cell{padding:13px 18px;border-right:1.5px solid #f9fafb;border-bottom:1.5px solid #f9fafb}
  .vsi-data-cell:nth-child(4n){border-right:none}
  .vsi-data-cell:nth-last-child(-n+4){border-bottom:none}
  .vsi-data-label{font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#9ca3af;margin-bottom:5px}
  .vsi-data-value{font-size:13.5px;font-weight:600;color:#1f2937}
  .vsi-data-value.mono{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;color:#374151}
  .vsi-card-footer{display:flex;align-items:center;justify-content:space-between;padding:13px 20px;background:#fafafa;border-top:1.5px solid #f3f4f6;gap:12px;flex-wrap:wrap}
  .vsi-paddy{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:700;background:#d1fae5;color:#065f46;border:1px solid #a7f3d0;white-space:nowrap}
  .vsi-print-btn{display:inline-flex;align-items:center;gap:6px;background:#18181b;color:#fff;border:none;border-radius:9px;padding:8px 14px;font-size:12.5px;font-weight:600;font-family:'Plus Jakarta Sans',sans-serif;cursor:pointer;transition:background .15s,box-shadow .15s;white-space:nowrap}
  .vsi-print-btn:hover{background:#09090b;box-shadow:0 3px 10px rgba(0,0,0,.25)}
  .vsi-clear-btn{background:none;border:1.5px solid #e5e7eb;border-radius:9px;padding:8px 14px;font-size:13px;font-weight:600;color:#6b7280;font-family:'Plus Jakarta Sans',sans-serif;cursor:pointer;transition:all .15s}
  .vsi-clear-btn:hover{border-color:#d1d5db;color:#374151}
  .vsi-select-wrap{position:relative}
  .vsi-select-wrap::after{content:'';position:absolute;right:12px;top:50%;transform:translateY(-50%);pointer-events:none;border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid #9ca3af}
  @keyframes vsi-shimmer{to{background-position:-200% 0}}
  .vsi-skeleton{background:linear-gradient(90deg,#f3f4f6 25%,#fafafa 50%,#f3f4f6 75%);background-size:200% 100%;animation:vsi-shimmer 1.3s infinite;border-radius:8px}
  @keyframes vsi-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
  .vsi-card{animation:vsi-in .22s ease-out both}
  .vsi-empty{text-align:center;padding:64px 20px;color:#9ca3af}
  @media(max-width:768px){.vsi-data-grid{grid-template-columns:repeat(2,1fr)}.vsi-data-cell:nth-child(2n){border-right:none}.vsi-data-cell:nth-last-child(-n+2){border-bottom:none}}
`;

const n    = v => isNaN(Number(v)) ? 0 : Number(v) || 0;

/* Full product label — new records have ' - ' already; old ones use populated productId */
function productDisplay(inv) {
  const name = inv.paddyType || inv.productName;
  if (name && name.includes(' - ')) return name;
  const pop = inv.productId;
  if (pop && typeof pop === 'object') {
    return [pop.productName || name, pop.type, pop.subType].filter(Boolean).join(' - ');
  }
  return name || '—';
}
const fmt  = (v,d=0) => n(v).toLocaleString("en-PK",{minimumFractionDigits:d,maximumFractionDigits:d});
const fmt2 = v => fmt(v,2);

/* ─── Print HTML (new schema) ──────────────────────────────── */
function buildPrintHTML(inv) {
  const sr = String(inv.sr||"").padStart(4,"0");
  return `<!DOCTYPE html><html><head><title>Sales Invoice #${sr}</title>
<style>
@page{size:A4;margin:12mm}
body{font-family:"Segoe UI",Arial,sans-serif;background:#fff;color:#111}
.wrap{max-width:660px;margin:auto}
.head{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #1e3a8a;padding-bottom:10px;margin-bottom:16px}
.logo{display:flex;align-items:center;gap:10px}.logo img{height:55px}
.logo h1{font-size:20px;margin:0;color:#1e3a8a}.logo p{font-size:10px;margin:2px 0}
.meta{text-align:right}.meta h2{margin:0;font-size:18px;color:#1e40af}
.meta table{font-size:11px;margin-top:6px}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
.box{border:1px solid #e5e7eb;padding:8px;border-radius:6px}
.box h4{margin:0 0 6px;font-size:12px;color:#1e3a8a;border-bottom:1px solid #e5e7eb;padding-bottom:3px}
.box p{font-size:11px;margin:3px 0}
table{width:100%;border-collapse:collapse;font-size:11px;margin-top:10px}
th{background:#1e3a8a;color:#fff;padding:5px 6px;text-align:left}
td{border:1px solid #d1d5db;padding:5px 6px}
tr.sub td{font-weight:700;background:#f8fafc}
tr.grand td{font-weight:800;font-size:13px;color:#1e3a8a}
.sig{margin-top:36px;display:flex;justify-content:space-between;font-size:11px}
.sig div{width:45%;text-align:center}
.sig span{display:block;margin-top:36px;border-top:1px solid #000;padding-top:4px}
</style></head><body>
<div class="wrap">
<div class="head">
  <div class="logo"><img src="/logo.png" onerror="this.style.display='none'"/>
    <div><h1>Al Rehman Rice Mills</h1><p>Deepalpur Road, Babarkhai, Arzanipur</p>
    <p>Chunian, Kasur – Pakistan</p><p><b>0301-4349041</b> | <b>0300-8402130</b></p></div>
  </div>
  <div class="meta"><h2>SALES INVOICE</h2>
    <table>
      <tr><td><b>Invoice #</b></td><td>${sr}</td></tr>
      <tr><td><b>Date</b></td><td>${inv.date||""}</td></tr>
      <tr><td><b>Builty #</b></td><td>${inv.builtyNo||"—"}</td></tr>
    </table>
  </div>
</div>
<div class="info-grid">
  <div class="box"><h4>CUSTOMER</h4>
    <p><b>Name:</b> ${inv.vendorName||"—"}</p>
    <p><b>Vehicle:</b> ${inv.vehicleNo||"—"}</p>
    <p><b>Broker:</b> ${inv.brokerName||"—"}</p>
  </div>
  <div class="box"><h4>PRODUCT</h4>
    <p><b>Product:</b> ${productDisplay(inv)}</p>
    <p><b>Rate / 40kg:</b> Rs ${fmt2(inv.rate40)}</p>
    <p><b>Quantity:</b> ${fmt(inv.quantity)} bags</p>
  </div>
</div>
<table>
  <tr><th>Description</th><th style="text-align:right">Value</th></tr>
  <tr><td>Total Weight (kg)</td><td style="text-align:right">${fmt2(inv.weight)}</td></tr>
  <tr><td>Bag Deduction (${fmt(inv.quantity)} bags × ${fmt2(inv.bagWeight)} kg)</td><td style="text-align:right">− ${fmt2(n(inv.quantity)*n(inv.bagWeight))}</td></tr>
  <tr class="sub"><td>Net Weight (kg)</td><td style="text-align:right">${fmt2(inv.netWeight)}</td></tr>
  <tr class="sub"><td>Net Weight (Maund)</td><td style="text-align:right">${n(inv.netWeight40).toFixed(4)}</td></tr>
  <tr><td>Amount (${n(inv.netWeight40).toFixed(4)} Maund × Rs ${fmt2(inv.rate40)})</td><td style="text-align:right">Rs ${fmt2(inv.amount)}</td></tr>
  <tr><td>Sutli / Silai (Rs ${fmt2(inv.sutliSilaiRate)} × ${fmt(inv.quantity)} bags)</td><td style="text-align:right">Rs ${fmt2(inv.sutliSilaiAmount)}</td></tr>
  ${n(inv.bardanaRate)>0?`<tr><td>Bardana (Rs ${fmt2(inv.bardanaRate)} × ${fmt(inv.quantity)} bags)</td><td style="text-align:right">Rs ${fmt2(inv.bardanaAmount)}</td></tr>`:""}
  <tr class="sub"><td>Total (w/ Sutli${n(inv.bardanaRate)>0?" + Bardana":""})</td><td style="text-align:right">Rs ${fmt2(inv.totalWithBardana||inv.totalAmount)}</td></tr>
  ${n(inv.brokeryRate)>0?`<tr><td>Brokery (${n(inv.netWeight40).toFixed(4)} Maund × Rs ${fmt2(inv.brokeryRate)})</td><td style="text-align:right">− Rs ${fmt2(inv.brokery)}</td></tr>`:""}
  <tr class="grand"><td>NET PAYABLE</td><td style="text-align:right">Rs ${fmt2(inv.totalAmount2)}</td></tr>
</table>
<div class="sig">
  <div><span>Customer Signature</span></div>
  <div><span>Authorised Signatory</span></div>
</div>
<p style="text-align:center;margin-top:28px;font-size:12px">Thank you for your business — Al Rehman Rice Mills</p>
</div><script>window.print()</script></body></html>`;
}

/* ─── Icons ─────────────────────────────────────────────────── */
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

/* ─── Sub-components ─────────────────────────────────────────── */
function StatCard({ label, value, accent, prefix }) {
  return (
    <div className="vsi-stat">
      <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em",
        color:"#9ca3af", marginBottom:10 }}>{label}</p>
      <p style={{ fontSize:21, fontWeight:800, color:"#111827", lineHeight:1,
        fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-.5px" }}>
        {prefix && <span style={{ fontSize:14, color:accent||"#9ca3af", marginRight:3 }}>{prefix}</span>}
        {value}
      </p>
    </div>
  );
}

function DataCell({ label, value, mono }) {
  return (
    <div className="vsi-data-cell">
      <div className="vsi-data-label">{label}</div>
      <div className={`vsi-data-value${mono?" mono":""}`}>
        {value ?? <span style={{color:"#d1d5db"}}>—</span>}
      </div>
    </div>
  );
}

function AmtTile({ label, value, color, large }) {
  return (
    <div>
      <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em",
        color:"#9ca3af", marginBottom:2 }}>{label}</div>
      <div style={{ fontSize:large?20:13.5, fontWeight:large?800:700,
        color:color||"#374151", fontFamily:"'JetBrains Mono',monospace",
        letterSpacing:large?"-.5px":"-.2px" }}>
        {n(value)>0 ? `Rs ${fmt2(value)}` : "—"}
      </div>
    </div>
  );
}

function FilterPill({ label, onRemove }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:5,
      background:"#ecfdf5", border:"1px solid #a7f3d0", borderRadius:20,
      padding:"3px 9px 3px 10px", fontSize:12, fontWeight:600, color:"#065f46" }}>
      {label}
      <button onClick={onRemove} style={{ background:"none", border:"none", cursor:"pointer",
        padding:0, display:"flex", alignItems:"center", color:"#6ee7b7", marginLeft:1 }}>
        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="vsi-card" style={{animation:"none"}}>
      <div className="vsi-card-head">
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <div className="vsi-skeleton" style={{width:80,height:18}}/>
          <div className="vsi-skeleton" style={{width:60,height:22,borderRadius:20}}/>
        </div>
        <div className="vsi-skeleton" style={{width:110,height:34,borderRadius:9}}/>
      </div>
      <div className="vsi-data-grid">
        {Array.from({length:8}).map((_,i)=>(
          <div key={i} className="vsi-data-cell">
            <div className="vsi-skeleton" style={{width:"50%",height:10,marginBottom:8}}/>
            <div className="vsi-skeleton" style={{width:"80%",height:16}}/>
          </div>
        ))}
      </div>
      <div className="vsi-card-footer">
        <div style={{display:"flex",gap:16}}>
          {[100,80,90].map((w,i)=>(<div key={i}>
            <div className="vsi-skeleton" style={{width:60,height:9,marginBottom:5}}/>
            <div className="vsi-skeleton" style={{width:w,height:15}}/>
          </div>))}
        </div>
        <div>
          <div className="vsi-skeleton" style={{width:60,height:10,marginBottom:5}}/>
          <div className="vsi-skeleton" style={{width:120,height:22}}/>
        </div>
      </div>
    </div>
  );
}

const lbl = {
  display:"block", fontSize:11, fontWeight:700, textTransform:"uppercase",
  letterSpacing:".07em", color:"#9ca3af", marginBottom:6,
};

/* ══════════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════════ */
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

  useEffect(() => {
    (async () => {
      try {
        const res  = await authFetch(`${API_BASE_URL}/sales-invoice`);
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
        inv.vehicleNo?.toLowerCase().includes(q)  ||
        inv.brokerName?.toLowerCase().includes(q) ||
        productDisplay(inv)?.toLowerCase().includes(q)  ||
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
    const count   = list.length || 1;
    const revenue  = list.reduce((s,i) => s + n(i.totalAmount2 || 0), 0);
    const netKg    = list.reduce((s,i) => s + n(i.netWeight    || 0), 0);
    const netMaund = list.reduce((s,i) => s + n(i.netWeight40  || 0), 0);
    const avgBags  = list.reduce((s,i) => s + n(i.quantity     || 0), 0);
    setSummary({ revenue: fmt(revenue), netKg: fmt(netKg), netMaund: fmt(netMaund,3), avgBags: fmt(avgBags/count) });
  };

  const openPrint = inv => {
    const w = window.open("","_blank");
    if (!w) return;
    w.document.write(buildPrintHTML(inv));
    w.document.close();
  };

  const clearFilters = () => { setSearch(""); setFromDate(""); setToDate(""); setPaddyFilter(""); };
  const hasFilters   = search || fromDate || toDate || paddyFilter;
  const paddyTypes   = [...new Set(invoices.map(i => productDisplay(i)).filter(Boolean))];

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification message={notification.message} type={notification.type}
        onClose={() => setNotification({message:"",type:"info"})}/>

      <div className="vsi-wrap">

        {/* Header */}
        <div style={{ marginBottom:24, display:"flex", alignItems:"flex-end",
          justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <div>
            <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase",
              letterSpacing:".1em", color:"#9ca3af", marginBottom:4 }}>Sales</p>
            <h1 style={{ fontSize:26, fontWeight:800, color:"#111827",
              letterSpacing:"-.5px", lineHeight:1 }}>Sales Invoices</h1>
          </div>
          {!loading && (
            <div style={{ background:"#f3f4f6", borderRadius:10, padding:"7px 14px",
              fontSize:13, fontWeight:600, color:"#6b7280", fontFamily:"'JetBrains Mono',monospace" }}>
              {filteredInvoices.length}
              {filteredInvoices.length !== invoices.length && (
                <span style={{color:"#9ca3af",fontWeight:400}}> / {invoices.length}</span>
              )}
              <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",marginLeft:5,fontWeight:500}}>
                invoice{filteredInvoices.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
          <StatCard label="Total Revenue"  value={summary.revenue}  accent="#10b981" prefix="Rs"/>
          <StatCard label="Total Net KG"   value={summary.netKg}    accent="#0ea5e9"/>
          <StatCard label="Total Maund"    value={summary.netMaund} accent="#f59e0b"/>
          <StatCard label="Avg Bags/Invoice" value={summary.avgBags} accent="#6366f1"/>
        </div>

        {/* Filters */}
        <div style={{ background:"#fff", border:"1.5px solid #f3f4f6", borderRadius:14,
          padding:"14px 16px", marginBottom:20, boxShadow:"0 1px 3px rgba(0,0,0,.04)" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr auto", gap:10, alignItems:"end" }}>
            <div>
              <label style={lbl}>Search</label>
              <div style={{position:"relative"}}>
                <span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",
                  pointerEvents:"none",display:"flex"}}><SearchIcon/></span>
                <input className="vsi-input" value={search} onChange={e=>setSearch(e.target.value)}
                  placeholder="Invoice #, vendor, vehicle, product…" style={{paddingLeft:34}}/>
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
              <label style={lbl}>Product</label>
              <div className="vsi-select-wrap">
                <select className="vsi-select" value={paddyFilter} onChange={e=>setPaddyFilter(e.target.value)}>
                  <option value="">All products</option>
                  {paddyTypes.map(t=><option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <button className="vsi-clear-btn" onClick={clearFilters}
                style={{opacity:hasFilters?1:.35,pointerEvents:hasFilters?"auto":"none"}}>Clear</button>
            </div>
          </div>
          {hasFilters && (
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:10}}>
              {search      && <FilterPill label={`"${search}"`}      onRemove={()=>setSearch("")}/>}
              {fromDate    && <FilterPill label={`From ${fromDate}`} onRemove={()=>setFromDate("")}/>}
              {toDate      && <FilterPill label={`To ${toDate}`}     onRemove={()=>setToDate("")}/>}
              {paddyFilter && <FilterPill label={paddyFilter}        onRemove={()=>setPaddyFilter("")}/>}
            </div>
          )}
        </div>

        {/* Cards */}
        {loading ? (
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {Array.from({length:3}).map((_,i)=><SkeletonCard key={i}/>)}
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="vsi-empty">
            <svg width={48} height={48} fill="none" viewBox="0 0 24 24" stroke="#e5e7eb" strokeWidth={1.2}
              style={{margin:"0 auto 14px",display:"block"}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <p style={{fontSize:15,fontWeight:700,color:"#6b7280",marginBottom:4}}>No invoices found</p>
            <p style={{fontSize:13,color:"#9ca3af"}}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {filteredInvoices.map((inv,idx) => (
              <div key={inv._id} className="vsi-card" style={{animationDelay:`${idx*.04}s`}}>

                {/* Head */}
                <div className="vsi-card-head">
                  <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                    <div style={{display:"flex",alignItems:"baseline",gap:5}}>
                      <span style={{fontSize:11,fontWeight:700,color:"#9ca3af",
                        textTransform:"uppercase",letterSpacing:".07em"}}>Invoice</span>
                      <span style={{fontSize:17,fontWeight:800,color:"#111827",
                        fontFamily:"'JetBrains Mono',monospace"}}>
                        #{String(inv.sr||"").padStart(4,"0")}
                      </span>
                    </div>
                    <div style={{width:1,height:16,background:"#e5e7eb"}}/>
                    <span style={{fontSize:13,color:"#6b7280",fontWeight:500}}>{inv.date}</span>
                    {(inv.paddyType || inv.productName || inv.productId) && <span className="vsi-paddy">{productDisplay(inv)}</span>}
                    {inv.builtyNo && (
                      <span style={{fontSize:11.5,color:"#6b7280",fontWeight:600,
                        background:"#f3f4f6",padding:"2px 8px",borderRadius:6,
                        fontFamily:"'JetBrains Mono',monospace"}}>Builty #{inv.builtyNo}</span>
                    )}
                  </div>
                  <button className="vsi-print-btn" onClick={()=>openPrint(inv)}>
                    <PrintIcon/> Print Invoice
                  </button>
                </div>

                {/* Data grid */}
                <div className="vsi-data-grid">
                  <DataCell label="Vendor"            value={inv.vendorName}/>
                  <DataCell label="Vehicle No."       value={inv.vehicleNo} mono/>
                  <DataCell label="Broker"            value={inv.brokerName}/>
                  <DataCell label="Rate / 40 KG"      value={inv.rate40 ? `Rs ${fmt2(inv.rate40)}` : null} mono/>
                  <DataCell label="Qty (Bags)"         value={inv.quantity} mono/>
                  <DataCell label="Net Wt. (kg)"       value={inv.netWeight ? fmt2(inv.netWeight) : null} mono/>
                  <DataCell label="Net Wt. (Maund)"    value={inv.netWeight40 ? n(inv.netWeight40).toFixed(4) : null} mono/>
                  <DataCell label="Sutli Amt."         value={inv.sutliSilaiAmount ? `Rs ${fmt2(inv.sutliSilaiAmount)}` : null} mono/>
                </div>

                {/* Footer */}
                <div className="vsi-card-footer">
                  <div style={{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
                    <AmtTile label="Amount"    value={inv.amount}       color="#374151"/>
                    <div style={{width:1,height:24,background:"#e5e7eb"}}/>
                    <AmtTile label="w/ Sutli"  value={inv.totalAmount}  color="#374151"/>
                    {n(inv.bardanaAmount)>0 && (
                      <>
                        <div style={{width:1,height:24,background:"#e5e7eb"}}/>
                        <AmtTile label="+ Bardana" value={inv.bardanaAmount} color="#7c3aed"/>
                      </>
                    )}
                    {n(inv.brokery)>0 && (
                      <>
                        <div style={{width:1,height:24,background:"#e5e7eb"}}/>
                        <div>
                          <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",
                            letterSpacing:".07em",color:"#9ca3af",marginBottom:2}}>Brokery</div>
                          <div style={{fontSize:13.5,fontWeight:700,color:"#ef4444",
                            fontFamily:"'JetBrains Mono',monospace"}}>− Rs {fmt2(inv.brokery)}</div>
                        </div>
                      </>
                    )}
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",
                      letterSpacing:".07em",color:"#9ca3af",marginBottom:2}}>Net Payable</div>
                    <div style={{fontSize:20,fontWeight:800,color:"#111827",
                      fontFamily:"'JetBrains Mono',monospace",letterSpacing:"-.5px"}}>
                      Rs {fmt2(inv.totalAmount2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredInvoices.length > 0 && (
          <p style={{textAlign:"center",color:"#9ca3af",fontSize:12.5,marginTop:20,
            fontFamily:"'JetBrains Mono',monospace"}}>
            {filteredInvoices.length} invoice{filteredInvoices.length!==1?"s":""}
            {hasFilters ? ` · filtered from ${invoices.length} total` : ""}
          </p>
        )}
      </div>
    </SidebarLayout>
  );
}