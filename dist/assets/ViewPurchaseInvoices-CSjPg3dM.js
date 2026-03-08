import{a as D,A,j as e,S as K,N as E}from"./index-D48Lr9Ja.js";import{b as o}from"./react-CVH9iSHU.js";const J="@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');",V=`
  *, *::before, *::after { box-sizing: border-box; }
  .vpi-wrap { font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; }

  /* ── inputs ── */
  .vpi-input, .vpi-select {
    width: 100%; border: 1.5px solid #e5e7eb; border-radius: 10px;
    padding: 9px 12px; font-size: 13.5px; font-family: 'Plus Jakarta Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .15s, box-shadow .15s; appearance: none;
  }
  .vpi-input::placeholder { color: #9ca3af; }
  .vpi-input:focus, .vpi-select:focus {
    border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.12);
  }

  /* ── stat cards ── */
  .vpi-stat {
    background: #fff; border: 1.5px solid #f3f4f6; border-radius: 14px;
    padding: 18px 20px; transition: box-shadow .2s;
  }
  .vpi-stat:hover { box-shadow: 0 4px 16px rgba(0,0,0,.07); }

  /* ── invoice card ── */
  .vpi-card {
    background: #fff; border-radius: 16px; overflow: hidden;
    border: 1.5px solid #f3f4f6;
    box-shadow: 0 1px 3px rgba(0,0,0,.04), 0 1px 2px rgba(0,0,0,.03);
    transition: box-shadow .2s, transform .2s;
  }
  .vpi-card:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,.09), 0 2px 6px rgba(0,0,0,.05);
    transform: translateY(-1px);
  }

  /* ── card header band ── */
  .vpi-card-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 20px 13px; border-bottom: 1.5px solid #f3f4f6;
    gap: 12px; flex-wrap: wrap;
  }

  /* ── data rows inside card ── */
  .vpi-data-grid {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 0;
  }
  .vpi-data-cell {
    padding: 14px 20px; border-right: 1.5px solid #f9fafb;
    border-bottom: 1.5px solid #f9fafb;
  }
  .vpi-data-cell:nth-child(4n) { border-right: none; }
  .vpi-data-cell:nth-last-child(-n+4) { border-bottom: none; }
  .vpi-data-label {
    font-size: 10.5px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: #9ca3af; margin-bottom: 5px;
  }
  .vpi-data-value {
    font-size: 13.5px; font-weight: 600; color: #1f2937;
  }
  .vpi-data-value.mono {
    font-family: 'JetBrains Mono', monospace; font-size: 13px;
    font-weight: 500; color: #374151;
  }

  /* ── amount footer ── */
  .vpi-card-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 20px; background: #fafafa; border-top: 1.5px solid #f3f4f6;
    gap: 12px; flex-wrap: wrap;
  }

  /* ── paddy badge ── */
  .vpi-paddy {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 700;
    background: #fef9c3; color: #854d0e; border: 1px solid #fde68a;
    white-space: nowrap;
  }

  /* ── print btn ── */
  .vpi-print-btn {
    display: inline-flex; align-items: center; gap: 6px;
    background: #18181b; color: #fff; border: none; border-radius: 9px;
    padding: 8px 14px; font-size: 12.5px; font-weight: 600;
    font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer;
    transition: background .15s, box-shadow .15s; white-space: nowrap;
  }
  .vpi-print-btn:hover { background: #09090b; box-shadow: 0 3px 10px rgba(0,0,0,.25); }

  /* ── clear btn ── */
  .vpi-clear-btn {
    background: none; border: 1.5px solid #e5e7eb; border-radius: 9px;
    padding: 8px 14px; font-size: 13px; font-weight: 600; color: #6b7280;
    font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer;
    transition: all .15s;
  }
  .vpi-clear-btn:hover { border-color: #d1d5db; color: #374151; }

  /* ── select wrapper ── */
  .vpi-select-wrap { position: relative; }
  .vpi-select-wrap::after {
    content: ''; position: absolute; right: 12px; top: 50%;
    transform: translateY(-50%); pointer-events: none;
    border-left: 4px solid transparent; border-right: 4px solid transparent;
    border-top: 5px solid #9ca3af;
  }

  /* ── shimmer skeleton ── */
  @keyframes vpi-shimmer { to { background-position: -200% 0; } }
  .vpi-skeleton {
    background: linear-gradient(90deg,#f3f4f6 25%,#fafafa 50%,#f3f4f6 75%);
    background-size: 200% 100%; animation: vpi-shimmer 1.3s infinite;
    border-radius: 8px;
  }

  /* ── card entrance ── */
  @keyframes vpi-in { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
  .vpi-card { animation: vpi-in .22s ease-out both; }

  /* ── empty state ── */
  .vpi-empty {
    text-align: center; padding: 64px 20px; color: #9ca3af;
  }

  @media (max-width: 768px) {
    .vpi-data-grid { grid-template-columns: repeat(2, 1fr); }
    .vpi-data-cell:nth-child(2n) { border-right: none; }
    .vpi-data-cell:nth-last-child(-n+2) { border-bottom: none; }
    .vpi-data-cell:nth-child(2n+1):not(:nth-last-child(-n+2)) { border-bottom: 1.5px solid #f9fafb; }
  }
`;function G(a){const s=Number(a.filledVehicleWeight||0),r=Number(a.emptyVehicleWeight||0),n=s-r,u=Number(a.moistureAdjustment||0),x=Number(a.netWeight||0),m=x/40;return`<!DOCTYPE html><html><head><title>Purchase Invoice ${a.builtyNumber}</title>
<style>
@page{size:A4;margin:12mm}
body{font-family:"Segoe UI",Arial,sans-serif;background:#fff;color:#111}
.invoice{max-width:650px;margin:auto}
.header{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #1e3a8a;padding-bottom:10px;margin-bottom:16px}
.logo{display:flex;align-items:center;gap:10px}.logo img{height:55px}
.logo h1{font-size:20px;margin:0;color:#1e3a8a}.logo p{font-size:10px;margin:2px 0}
.invoice-meta{text-align:right}.invoice-meta h2{margin:0;font-size:18px;color:#1e40af}
.invoice-meta table{font-size:11px;margin-top:6px}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
.info-box{border:1px solid #e5e7eb;padding:8px;border-radius:6px}
.info-box h4{margin:0 0 6px;font-size:12px;color:#1e3a8a;border-bottom:1px solid #e5e7eb;padding-bottom:3px}
.info-box p{font-size:11px;margin:3px 0}
table{width:100%;border-collapse:collapse;font-size:11px;margin-top:10px}
th{background:#1e3a8a;color:#fff;padding:5px 4px;text-align:center}
td{border:1px solid #000;padding:4px}.right{text-align:center}
.highlight{background:#f1f5ff;font-weight:bold}
.totals td{font-weight:bold;font-size:12px;padding:6px 4px}
.grand-total{font-size:14px;color:#1e3a8a;text-align:center}
.signature{margin-top:36px;display:flex;justify-content:space-between;font-size:11px}
.signature div{width:45%;text-align:center}
.signature span{display:block;margin-top:36px;border-top:1px solid #000;padding-top:4px}
</style></head><body>
<div class="invoice">
<div class="header">
  <div class="logo"><img src="/logo.png"/>
    <div><h1>Al Rehman Rice Mills</h1><p>Deepalpur Road, Babarkhai, Arzanipur</p>
    <p>Chunian, Kasur – Pakistan</p><p><b>0301-4349041</b> | <b>0300-8402130</b></p></div>
  </div>
  <div class="invoice-meta"><h2>PURCHASE INVOICE</h2>
    <table><tr><td><b>Invoice #</b></td><td>${a.builtyNumber}</td></tr>
    <tr><td><b>Date</b></td><td>${a.date}</td></tr></table>
  </div>
</div>
<div class="info-grid">
  <div class="info-box"><h4>SUPPLIER DETAILS</h4>
    <p><b>Name:</b> ${a.vendorName}</p><p><b>Company:</b> Zam Zam Rice Mills</p>
    <p><b>City:</b> Kasur</p><p><b>Phone:</b> 0329-0999329</p></div>
  <div class="info-box"><h4>TRANSPORT DETAILS</h4>
    <p><b>Vehicle No:</b> ${a.vehicleNumber}</p><p><b>Broker:</b> ${a.brokerName||"-"}</p>
    <p><b>Paddy Type:</b> ${a.paddyType}</p><p><b>Rate (40kg):</b> Rs ${a.rate40kg}</p></div>
</div>
<table>
  <tr><th>Description</th><th>Details</th><th class="right">Weight (Kgs)</th></tr>
  <tr><td rowspan="3">Vehicle Weight</td><td>Filled Weight</td><td class="right">${s}</td></tr>
  <tr><td>Empty Weight</td><td class="right">${r}</td></tr>
  <tr class="highlight"><td>Load Weight</td><td class="right">${n}</td></tr>
  <tr><td rowspan="2">Bags</td><td>No. of Bags</td><td class="right">${a.quantity}</td></tr>
  <tr><td>Bag Weight</td><td class="right">${a.bagWeight}</td></tr>
  <tr><td>Moisture Deduction</td><td>Adjustment</td><td class="right">${u}</td></tr>
</table>
<table class="totals">
  <tr><td>Net Weight (Kgs)</td><td class="right">${x}</td></tr>
  <tr><td>Net Weight (Maund)</td><td class="right">${m.toFixed(2)}</td></tr>
  <tr class="grand-total"><td>TOTAL AMOUNT</td><td class="right">Rs ${a.amount}</td></tr>
</table>
<div class="signature">
  <div><span>Authorized Signature</span></div><div><span>Stamp</span></div>
</div>
<p style="text-align:center;margin-top:30px;font-size:12px">Thank you for your business</p>
</div><script>window.print()<\/script></body></html>`}const H=()=>e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"})}),O=()=>e.jsxs("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2,children:[e.jsx("circle",{cx:11,cy:11,r:8}),e.jsx("path",{strokeLinecap:"round",d:"M21 21l-4.35-4.35"})]}),Y=()=>e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"})});function y({label:a,value:s,icon:r,accent:n}){return e.jsxs("div",{className:"vpi-stat",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10},children:[e.jsx("p",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af"},children:a}),r&&e.jsx("div",{style:{width:30,height:30,borderRadius:8,background:n?`${n}18`:"#f3f4f6",color:n||"#6b7280",display:"flex",alignItems:"center",justifyContent:"center"},children:r})]}),e.jsx("p",{style:{fontSize:21,fontWeight:800,color:"#111827",lineHeight:1,fontFamily:"'JetBrains Mono', monospace",letterSpacing:"-.5px"},children:s})]})}function d({label:a,value:s,mono:r,highlight:n}){return e.jsxs("div",{className:"vpi-data-cell",style:n?{background:"#fafffe"}:{},children:[e.jsx("div",{className:"vpi-data-label",children:a}),e.jsx("div",{className:`vpi-data-value${r?" mono":""}`,style:n?{color:"#059669",fontWeight:700}:{},children:s??e.jsx("span",{style:{color:"#d1d5db"},children:"—"})})]})}function _(){return e.jsxs("div",{className:"vpi-card",style:{animation:"none"},children:[e.jsxs("div",{className:"vpi-card-head",children:[e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[e.jsx("div",{className:"vpi-skeleton",style:{width:80,height:18}}),e.jsx("div",{className:"vpi-skeleton",style:{width:60,height:22,borderRadius:20}})]}),e.jsx("div",{className:"vpi-skeleton",style:{width:90,height:34,borderRadius:9}})]}),e.jsx("div",{className:"vpi-data-grid",children:Array.from({length:8}).map((a,s)=>e.jsxs("div",{className:"vpi-data-cell",children:[e.jsx("div",{className:"vpi-skeleton",style:{width:"50%",height:10,marginBottom:8}}),e.jsx("div",{className:"vpi-skeleton",style:{width:"80%",height:16}})]},s))}),e.jsxs("div",{className:"vpi-card-footer",children:[e.jsx("div",{className:"vpi-skeleton",style:{width:120,height:14}}),e.jsx("div",{className:"vpi-skeleton",style:{width:100,height:22}})]})]})}const Z=()=>{const[a,s]=o.useState([]),[r,n]=o.useState(!0),[u,x]=o.useState({message:"",type:"info"}),[m,R]=o.useState({total1:"0",total2:"0",average:"0",totalPurchase:"0"}),[p,k]=o.useState(""),[c,S]=o.useState(""),[h,N]=o.useState(""),[f,W]=o.useState(""),[l,T]=o.useState([]);o.useEffect(()=>{(async()=>{try{const i=await(await D(`${A}/purchase-invoice`)).json();i.success?(s(i.invoices),T(i.invoices),B(i.invoices)):x({message:i.message||"Failed to fetch invoices",type:"error"})}catch{x({message:"Server error!",type:"error"})}finally{n(!1)}})()},[]),o.useEffect(()=>{let t=a;if(p){const i=p.toLowerCase();t=t.filter(g=>g.vendorName?.toLowerCase().includes(i)||g.vehicleNumber?.toLowerCase().includes(i)||g.brokerName?.toLowerCase().includes(i)||String(g.sr)?.includes(i))}c&&(t=t.filter(i=>new Date(i.date)>=new Date(c))),h&&(t=t.filter(i=>new Date(i.date)<=new Date(h))),f&&(t=t.filter(i=>i.paddyType===f)),T(t),B(t)},[p,c,h,f,a]);const B=t=>{if(!t.length)return;let i=0,g=0,P=0,C=0;t.forEach(b=>{i+=Number(b.finalWeight||0),g+=Number(b.netWeight||0),P+=Number(b.netWeight40KG||0),C+=Number(b.weightKG||0)});const z=b=>b.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2});R({total1:z(i),total2:z(g),average:(P/t.length).toFixed(3),totalPurchase:z(C)})},L=t=>{const i=window.open("","_blank");i&&(i.document.write(G(t)),i.document.close())},F=()=>{k(""),S(""),N(""),W("")},v=p||c||h||f,M=[...new Set(a.map(t=>t.paddyType).filter(Boolean))],$=t=>Number(t||0).toLocaleString("en-PK",{minimumFractionDigits:0});return e.jsxs(K,{children:[e.jsxs("style",{children:[J,V]}),e.jsx(E,{message:u.message,type:u.type,onClose:()=>x({message:"",type:"info"})}),e.jsxs("div",{className:"vpi-wrap",children:[e.jsxs("div",{style:{marginBottom:24,display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:10},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"#9ca3af",marginBottom:4},children:"Procurement"}),e.jsx("h1",{style:{fontSize:26,fontWeight:800,color:"#111827",letterSpacing:"-.5px",lineHeight:1},children:"Purchase Invoices"})]}),!r&&e.jsxs("div",{style:{background:"#f3f4f6",borderRadius:10,padding:"7px 14px",fontSize:13,fontWeight:600,color:"#6b7280",fontFamily:"'JetBrains Mono', monospace"},children:[l.length,l.length!==a.length&&e.jsxs("span",{style:{color:"#9ca3af",fontWeight:400},children:[" / ",a.length]}),e.jsxs("span",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",marginLeft:5,fontWeight:500},children:["invoice",l.length!==1?"s":""]})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20},children:[e.jsx(y,{label:"Final Weight KG",value:m.total1,accent:"#6366f1",icon:e.jsx(Y,{})}),e.jsx(y,{label:"Net Weight KG",value:m.total2,accent:"#0ea5e9"}),e.jsx(y,{label:"Avg / 40 KG",value:m.average,accent:"#f59e0b"}),e.jsx(y,{label:"Total Purchase KG",value:m.totalPurchase,accent:"#10b981"})]}),e.jsxs("div",{style:{background:"#fff",border:"1.5px solid #f3f4f6",borderRadius:14,padding:"14px 16px",marginBottom:20,boxShadow:"0 1px 3px rgba(0,0,0,.04)"},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr auto",gap:10,alignItems:"end"},children:[e.jsxs("div",{children:[e.jsx("label",{style:w,children:"Search"}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",display:"flex"},children:e.jsx(O,{})}),e.jsx("input",{className:"vpi-input",value:p,onChange:t=>k(t.target.value),placeholder:"Invoice #, vendor, vehicle, broker…",style:{paddingLeft:34}})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:w,children:"From Date"}),e.jsx("input",{type:"date",className:"vpi-input",value:c,onChange:t=>S(t.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{style:w,children:"To Date"}),e.jsx("input",{type:"date",className:"vpi-input",value:h,onChange:t=>N(t.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{style:w,children:"Paddy Type"}),e.jsx("div",{className:"vpi-select-wrap",children:e.jsxs("select",{className:"vpi-select",value:f,onChange:t=>W(t.target.value),children:[e.jsx("option",{value:"",children:"All types"}),M.map(t=>e.jsx("option",{value:t,children:t},t))]})})]}),e.jsx("div",{children:e.jsx("button",{className:"vpi-clear-btn",onClick:F,style:{opacity:v?1:.35,pointerEvents:v?"auto":"none"},children:"Clear"})})]}),v&&e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginTop:10},children:[p&&e.jsx(j,{label:`"${p}"`,onRemove:()=>k("")}),c&&e.jsx(j,{label:`From ${c}`,onRemove:()=>S("")}),h&&e.jsx(j,{label:`To ${h}`,onRemove:()=>N("")}),f&&e.jsx(j,{label:f,onRemove:()=>W("")})]})]}),r?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:16},children:Array.from({length:3}).map((t,i)=>e.jsx(_,{},i))}):l.length===0?e.jsxs("div",{className:"vpi-empty",children:[e.jsx("svg",{width:48,height:48,fill:"none",viewBox:"0 0 24 24",stroke:"#e5e7eb",strokeWidth:1.2,style:{margin:"0 auto 14px",display:"block"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),e.jsx("p",{style:{fontSize:15,fontWeight:700,color:"#6b7280",marginBottom:4},children:"No invoices found"}),e.jsx("p",{style:{fontSize:13,color:"#9ca3af"},children:"Try adjusting your search or filters"})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:14},children:l.map((t,i)=>e.jsxs("div",{className:"vpi-card",style:{animationDelay:`${i*.04}s`},children:[e.jsxs("div",{className:"vpi-card-head",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:5},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".07em"},children:"Invoice"}),e.jsxs("span",{style:{fontSize:17,fontWeight:800,color:"#111827",fontFamily:"'JetBrains Mono',monospace",letterSpacing:"-.3px"},children:["#",t.sr]})]}),e.jsx("div",{style:{width:1,height:16,background:"#e5e7eb"}}),e.jsx("span",{style:{fontSize:13,color:"#6b7280",fontWeight:500},children:t.date}),t.paddyType&&e.jsxs("span",{className:"vpi-paddy",children:[e.jsx("svg",{width:10,height:10,viewBox:"0 0 24 24",fill:"#854d0e",children:e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"})}),t.paddyType]}),t.ledgerReference&&e.jsxs("span",{style:{fontSize:11.5,color:"#6366f1",fontWeight:600,background:"#eef2ff",padding:"2px 8px",borderRadius:6},children:["Ref: ",t.ledgerReference]})]}),e.jsxs("button",{className:"vpi-print-btn",onClick:()=>L(t),children:[e.jsx(H,{}),"Print Invoice"]})]}),e.jsxs("div",{className:"vpi-data-grid",children:[e.jsx(d,{label:"Vendor",value:t.vendorName}),e.jsx(d,{label:"Vehicle No.",value:t.vehicleNumber,mono:!0}),e.jsx(d,{label:"Broker",value:t.brokerName}),e.jsx(d,{label:"Rate / 40 KG",value:t.rate40kg?`Rs ${t.rate40kg}`:null,mono:!0}),e.jsx(d,{label:"Quantity (Bags)",value:t.quantity,mono:!0}),e.jsx(d,{label:"Net Wt. (KG)",value:t.netWeight,mono:!0}),e.jsx(d,{label:"Net Wt. (40 KG)",value:t.netWeight40KG,mono:!0}),e.jsx(d,{label:"Moisture %",value:t.moisturePercent?`${t.moisturePercent}%`:null,mono:!0})]}),e.jsxs("div",{className:"vpi-card-footer",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"},children:[e.jsx(I,{label:"Final Wt.",value:t.finalWeight,color:"#6366f1"}),e.jsx("div",{style:{width:1,height:24,background:"#e5e7eb"}}),e.jsx(I,{label:"Net Wt.",value:t.netWeight,color:"#0ea5e9"}),t.builtyNumber&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:1,height:24,background:"#e5e7eb"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:1},children:"Builty #"}),e.jsx("div",{style:{fontSize:12,fontWeight:600,color:"#374151",fontFamily:"'JetBrains Mono',monospace"},children:t.builtyNumber})]})]})]}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:2},children:"Total Amount"}),e.jsxs("div",{style:{fontSize:20,fontWeight:800,color:"#111827",fontFamily:"'JetBrains Mono',monospace",letterSpacing:"-.5px"},children:["Rs ",$(t.amount)]})]})]})]},t._id))}),!r&&l.length>0&&e.jsxs("p",{style:{textAlign:"center",color:"#9ca3af",fontSize:12.5,marginTop:20,fontFamily:"'JetBrains Mono',monospace"},children:[l.length," invoice",l.length!==1?"s":"",v?` · filtered from ${a.length} total`:""]})]})]})};function I({label:a,value:s,color:r}){return e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:1},children:a}),e.jsx("div",{style:{fontSize:13.5,fontWeight:700,color:r,fontFamily:"'JetBrains Mono',monospace"},children:s?Number(s).toLocaleString():"—"})]})}function j({label:a,onRemove:s}){return e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:5,background:"#eef2ff",border:"1px solid #c7d2fe",borderRadius:20,padding:"3px 9px 3px 10px",fontSize:12,fontWeight:600,color:"#4f46e5"},children:[a,e.jsx("button",{onClick:s,style:{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",alignItems:"center",color:"#818cf8",marginLeft:1},children:e.jsx("svg",{width:12,height:12,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",d:"M6 18L18 6M6 6l12 12"})})})]})}const w={display:"block",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:6};export{Z as default};
