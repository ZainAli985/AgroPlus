import{a as L,A as K,j as e,S as G,N as H}from"./index-PWmeZ259.js";import{b as c}from"./react-BBT0yyZ1.js";const V="@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",Y=`
  *,*::before,*::after{box-sizing:border-box}
  .vpi-wrap{font-family:'DM Sans',sans-serif;color:#0B0C0D}

  /* inputs */
  .vpi-input,.vpi-select{width:100%;border:1.5px solid #E3E3E3;border-radius:9px;padding:9px 12px;font-size:13px;font-family:'DM Sans',sans-serif;color:#141A1F;background:#F5F5F5;outline:none;transition:border-color .15s,box-shadow .15s;appearance:none}
  .vpi-input::placeholder{color:#A5A8A6;font-style:italic}
  .vpi-input:focus,.vpi-select:focus{border-color:#212A37;box-shadow:0 0 0 3px rgba(33,42,55,.08);background:#fff}

  /* stat cards */
  .vpi-stat{background:#fff;border:1.5px solid #ECECEC;border-radius:14px;padding:18px 20px;transition:box-shadow .18s;position:relative;overflow:hidden}
  .vpi-stat::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--oc-navy,#212A37),#929183)}
  .vpi-stat:hover{box-shadow:0 4px 16px rgba(11,12,13,.08)}

  /* invoice cards */
  .vpi-card{background:#fff;border-radius:14px;overflow:hidden;border:1.5px solid #ECECEC;box-shadow:0 1px 4px rgba(11,12,13,.04);transition:box-shadow .18s,transform .15s}
  .vpi-card:hover{box-shadow:0 6px 20px rgba(11,12,13,.08);transform:translateY(-1px)}
  .vpi-card-head{display:flex;align-items:center;justify-content:space-between;padding:13px 18px 12px;border-bottom:1.5px solid #F5F5F5;gap:12px;flex-wrap:wrap;background:#fff}
  .vpi-data-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0}
  .vpi-data-cell{padding:12px 16px;border-right:1.5px solid #F5F5F5;border-bottom:1.5px solid #F5F5F5}
  .vpi-data-cell:nth-child(4n){border-right:none}
  .vpi-data-cell:nth-last-child(-n+4){border-bottom:none}
  .vpi-data-label{font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#A5A8A6;margin-bottom:5px;font-family:'DM Sans',sans-serif}
  .vpi-data-value{font-size:13px;font-weight:600;color:#212A37}
  .vpi-data-value.mono{font-family:'DM Mono',monospace;font-size:12.5px;font-weight:500;color:#334455}
  .vpi-card-footer{display:flex;align-items:center;justify-content:space-between;padding:12px 18px;background:#F5F5F5;border-top:1.5px solid #ECECEC;gap:12px;flex-wrap:wrap}

  /* product badge */
  .vpi-paddy{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;font-size:11.5px;font-weight:700;background:rgba(146,145,131,.1);color:#7A5A2B;border:1px solid rgba(146,145,131,.28);white-space:nowrap;font-family:'DM Mono',monospace}

  /* print button */
  .vpi-print-btn{display:inline-flex;align-items:center;gap:6px;background:#212A37;color:#fff;border:none;border-radius:9px;padding:7px 14px;font-size:12px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:background .15s,box-shadow .15s;white-space:nowrap}
  .vpi-print-btn:hover{background:#141A1F;box-shadow:0 4px 12px rgba(33,42,55,.3)}

  /* clear button */
  .vpi-clear-btn{background:none;border:1.5px solid #E3E3E3;border-radius:9px;padding:8px 14px;font-size:13px;font-weight:600;color:#6E7170;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all .15s}
  .vpi-clear-btn:hover{border-color:#DADADA;color:#212A37}

  .vpi-select-wrap{position:relative}
  .vpi-select-wrap::after{content:'';position:absolute;right:12px;top:50%;transform:translateY(-50%);pointer-events:none;border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid #A5A8A6}

  /* skeleton */
  @keyframes vpi-shimmer{to{background-position:-200% 0}}
  .vpi-skeleton{background:linear-gradient(90deg,#F5F5F5 25%,#ECECEC 50%,#F5F5F5 75%);background-size:200% 100%;animation:vpi-shimmer 1.4s infinite;border-radius:7px}
  @keyframes vpi-in{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
  .vpi-card{animation:vpi-in .2s ease-out both}
  .vpi-empty{text-align:center;padding:64px 20px;color:#A5A8A6}

  /* filter pills */
  .vpi-fpill{display:inline-flex;align-items:center;gap:5px;background:rgba(33,42,55,.06);border:1px solid rgba(33,42,55,.14);border-radius:20px;padding:3px 9px 3px 10px;font-size:12px;font-weight:600;color:#212A37}

  @media(max-width:900px){
    .vpi-stats-grid{grid-template-columns:repeat(2,1fr)!important}
    .vpi-filter-grid{grid-template-columns:1fr 1fr!important}
    .vpi-data-grid{grid-template-columns:repeat(2,1fr)}
    .vpi-data-cell:nth-child(4n){border-right:1.5px solid #F5F5F5}
    .vpi-data-cell:nth-child(2n){border-right:none}
    .vpi-data-cell:nth-last-child(-n+4){border-bottom:1.5px solid #F5F5F5}
    .vpi-data-cell:nth-last-child(-n+2){border-bottom:none}
  }
  @media(max-width:520px){
    .vpi-stats-grid{grid-template-columns:1fr 1fr!important}
    .vpi-filter-grid{grid-template-columns:1fr!important}
    .vpi-data-grid{grid-template-columns:1fr 1fr}
  }
`,n=t=>isNaN(Number(t))?0:Number(t)||0;function A(t){if(t.productName&&t.productName.includes(" - "))return t.productName;const r=t.productId;return r&&typeof r=="object"?[r.productName||t.productName,r.type,r.subType].filter(Boolean).join(" - "):t.productName||"—"}const m=(t,r=0)=>n(t).toLocaleString("en-PK",{minimumFractionDigits:r,maximumFractionDigits:r}),s=t=>m(t,2);function _(t){const d=(Array.isArray(t.rateRows)&&t.rateRows.length?t.rateRows:[{maund:n(t.netWeightMaund||t.netWeight40KG),rate:n(t.rate40kg),amount:n(t.totalAmount||t.amount)}]).filter(i=>i.maund||i.rate).map(i=>`<tr><td>${s(i.maund)} Maund × Rs ${s(i.rate)}</td><td style="text-align:right;font-weight:700">Rs ${s(i.amount)}</td></tr>`).join("");return`<!DOCTYPE html><html><head><title>Purchase Invoice #${t.sr||t.builtyNumber}</title>
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
  <div class="meta"><h2>PURCHASE INVOICE</h2>
    <table>
      <tr><td><b>Invoice #</b></td><td>${String(t.sr||"").padStart(4,"0")}</td></tr>
      <tr><td><b>Date</b></td><td>${t.date||""}</td></tr>
      <tr><td><b>Builty #</b></td><td>${t.builtyNumber||"—"}</td></tr>
    </table>
  </div>
</div>

<div class="info-grid">
  <div class="box"><h4>SUPPLIER</h4>
    <p><b>Name:</b> ${t.vendorName||"—"}</p>
    <p><b>Vehicle:</b> ${t.vehicleNumber||"—"}</p>
    <p><b>Bag Status:</b> ${t.bagStatus==="return"?"Bag Return":"Bag Added"}</p>
  </div>
  <div class="box"><h4>PRODUCT</h4>
    <p><b>Product:</b> ${t.productName&&t.productName.includes(" - ")?t.productName:t.productId&&typeof t.productId=="object"?[t.productId.productName||t.productName,t.productId.type,t.productId.subType].filter(Boolean).join(" - "):t.productName||"—"}</p>
    <p><b>Bag Type:</b> ${t.bagTypeName||"—"} (${s(t.bagWeightPerBag)} kg/bag)</p>
    <p><b>Moisture:</b> ${t.moisturePercent||0}% (Base: ${t.baseMoisture||0}%)</p>
  </div>
</div>

<table>
  <tr><th>Description</th><th style="text-align:right">Value</th></tr>
  <tr><td>Quantity (Bags)</td><td style="text-align:right">${m(t.quantity)}</td></tr>
  <tr><td>Gross Weight (kg)</td><td style="text-align:right">${s(t.grossWeight)}</td></tr>
  <tr><td>Total Bag Weight (${t.bagTypeName||""} × ${m(t.quantity)} bags)</td><td style="text-align:right">− ${s(t.totalBagWeight)}</td></tr>
  <tr><td>Moisture Adjustment</td><td style="text-align:right">− ${s(t.moistureAdjustment)}</td></tr>
  <tr class="sub"><td>Net Weight (kg)</td><td style="text-align:right">${s(t.netWeightKg||t.netWeight)}</td></tr>
  <tr class="sub"><td>Net Weight (Maund)</td><td style="text-align:right">${m(t.netWeightMaund||t.netWeight40KG,4)}</td></tr>
</table>

<table style="margin-top:12px">
  <tr><th>Rate Breakdown</th><th style="text-align:right">Amount</th></tr>
  ${d}
  <tr class="sub"><td>Total Amount</td><td style="text-align:right">Rs ${s(t.totalAmount||t.amount)}</td></tr>
  ${n(t.rentAdjustment)>0?`<tr><td>Rent Adjustment</td><td style="text-align:right">− Rs ${s(t.rentAdjustment)}</td></tr>`:""}
  <tr class="grand"><td>NET PAYABLE</td><td style="text-align:right">Rs ${s(t.finalAmount||t.totalAmount||t.amount)}</td></tr>
</table>

<div class="sig">
  <div><span>Supplier Signature</span></div>
  <div><span>Authorised Signatory</span></div>
</div>
<p style="text-align:center;margin-top:28px;font-size:12px">Thank you for your business — Al Rehman Rice Mills</p>
</div><script>window.print()<\/script></body></html>`}const U=()=>e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"})}),q=()=>e.jsxs("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2,children:[e.jsx("circle",{cx:11,cy:11,r:8}),e.jsx("path",{strokeLinecap:"round",d:"M21 21l-4.35-4.35"})]});function S({label:t,value:r,accent:d,prefix:i}){return e.jsxs("div",{className:"vpi-stat",children:[e.jsx("p",{style:{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",color:"#A5A8A6",marginBottom:10},children:t}),e.jsxs("p",{style:{fontSize:22,fontWeight:700,color:"#0B0C0D",lineHeight:1,fontFamily:"'DM Mono',monospace",letterSpacing:"-.5px"},children:[i&&e.jsx("span",{style:{fontSize:14,color:d||"#9ca3af",marginRight:3},children:i}),r]})]})}function x({label:t,value:r,mono:d,highlight:i}){return e.jsxs("div",{className:"vpi-data-cell",style:i?{background:"rgba(146,145,131,.04)"}:{},children:[e.jsx("div",{className:"vpi-data-label",children:t}),e.jsx("div",{className:`vpi-data-value${d?" mono":""}`,style:i?{color:"#929183",fontWeight:700}:{},children:r??e.jsx("span",{style:{color:"#d1d5db"},children:"—"})})]})}function O({label:t,value:r,color:d}){return e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:1},children:t}),e.jsx("div",{style:{fontSize:13.5,fontWeight:700,color:d,fontFamily:"'DM Mono',monospace"},children:r!=null&&r!==""?Number(r).toLocaleString("en-PK",{minimumFractionDigits:2}):"—"})]})}function N({label:t,onRemove:r}){return e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(33,42,55,.06)",border:"1px solid rgba(33,42,55,.14)",borderRadius:20,padding:"3px 9px 3px 10px",fontSize:12,fontWeight:600,color:"#212A37"},children:[t,e.jsx("button",{onClick:r,style:{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",alignItems:"center",color:"#A5A8A6",marginLeft:1},children:e.jsx("svg",{width:12,height:12,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",d:"M6 18L18 6M6 6l12 12"})})})]})}function Q(){return e.jsxs("div",{className:"vpi-card",style:{animation:"none"},children:[e.jsxs("div",{className:"vpi-card-head",children:[e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[e.jsx("div",{className:"vpi-skeleton",style:{width:80,height:18}}),e.jsx("div",{className:"vpi-skeleton",style:{width:60,height:22,borderRadius:20}})]}),e.jsx("div",{className:"vpi-skeleton",style:{width:90,height:34,borderRadius:9}})]}),e.jsx("div",{className:"vpi-data-grid",children:Array.from({length:8}).map((t,r)=>e.jsxs("div",{className:"vpi-data-cell",children:[e.jsx("div",{className:"vpi-skeleton",style:{width:"50%",height:10,marginBottom:8}}),e.jsx("div",{className:"vpi-skeleton",style:{width:"80%",height:16}})]},r))}),e.jsxs("div",{className:"vpi-card-footer",children:[e.jsx("div",{className:"vpi-skeleton",style:{width:120,height:14}}),e.jsx("div",{className:"vpi-skeleton",style:{width:100,height:22}})]})]})}const k={display:"block",fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"#A5A8A6",marginBottom:6};function Z(){const[t,r]=c.useState([]),[d,i]=c.useState(!0),[z,W]=c.useState({message:"",type:"info"}),[u,F]=c.useState(""),[f,D]=c.useState(""),[b,M]=c.useState(""),[y,C]=c.useState(""),[h,B]=c.useState([]),[v,$]=c.useState({grossKg:"0",netKg:"0",netMaund:"0",totalAmt:"0"});c.useEffect(()=>{(async()=>{try{const o=await(await L(`${K}/purchase-invoice`)).json();o.success?(r(o.invoices),B(o.invoices),E(o.invoices)):W({message:o.message||"Failed to fetch",type:"error"})}catch{W({message:"Server error!",type:"error"})}finally{i(!1)}})()},[]),c.useEffect(()=>{let a=t;if(u){const o=u.toLowerCase();a=a.filter(g=>g.vendorName?.toLowerCase().includes(o)||g.vehicleNumber?.toLowerCase().includes(o)||A(g)?.toLowerCase().includes(o)||String(g.sr).includes(o)||String(g.builtyNumber||"").includes(o))}f&&(a=a.filter(o=>new Date(o.date)>=new Date(f))),b&&(a=a.filter(o=>new Date(o.date)<=new Date(b))),y&&(a=a.filter(o=>A(o)===y)),B(a),E(a)},[u,f,b,y,t]);const E=a=>{const o=a.reduce((p,l)=>p+n(l.grossWeight||l.finalWeight||0),0),g=a.reduce((p,l)=>p+n(l.netWeightKg||l.netWeight||0),0),w=a.reduce((p,l)=>p+n(l.netWeightMaund||l.netWeight40KG||0),0),R=a.reduce((p,l)=>p+n(l.finalAmount||l.totalAmount||l.amount||0),0);$({grossKg:m(o),netKg:m(g),netMaund:m(w,3),totalAmt:m(R)})},T=a=>{const o=window.open("","_blank");o&&(o.document.write(_(a)),o.document.close())},I=()=>{F(""),D(""),M(""),C("")},j=u||f||b||y,P=[...new Set(t.map(a=>A(a)).filter(Boolean))];return e.jsxs(G,{children:[e.jsxs("style",{children:[V,Y]}),e.jsx(H,{message:z.message,type:z.type,onClose:()=>W({message:"",type:"info"})}),e.jsxs("div",{className:"vpi-wrap",children:[e.jsxs("div",{style:{marginBottom:24,display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:10},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".18em",color:"#929183",marginBottom:4},children:"Procurement"}),e.jsx("h1",{style:{fontSize:26,fontWeight:700,color:"#0B0C0D",letterSpacing:"-.4px",lineHeight:1,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic"},children:"Purchase Invoices"})]}),!d&&e.jsxs("div",{style:{background:"#F5F5F5",border:"1.5px solid #ECECEC",borderRadius:10,padding:"5px 14px",fontSize:12.5,fontWeight:500,color:"#6E7170",fontFamily:"'DM Mono',monospace"},children:[h.length,h.length!==t.length&&e.jsxs("span",{style:{color:"#9ca3af",fontWeight:400},children:[" / ",t.length]}),e.jsxs("span",{style:{fontFamily:"'DM Sans',sans-serif",marginLeft:5,fontWeight:500},children:["invoice",h.length!==1?"s":""]})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20},children:[e.jsx(S,{label:"Total Gross KG",value:v.grossKg,accent:"#212A37"}),e.jsx(S,{label:"Total Net KG",value:v.netKg,accent:"#334455"}),e.jsx(S,{label:"Total Maund",value:v.netMaund,accent:"#929183"}),e.jsx(S,{label:"Total Amount",value:v.totalAmt,accent:"#22c55e",prefix:"Rs"})]}),e.jsxs("div",{style:{background:"#fff",border:"1.5px solid #ECECEC",borderRadius:12,padding:"12px 16px",marginBottom:20,boxShadow:"0 1px 4px rgba(11,12,13,.04)"},children:[e.jsxs("div",{className:"vpi-filter-grid",style:{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr auto",gap:10,alignItems:"end"},children:[e.jsxs("div",{children:[e.jsx("label",{style:k,children:"Search"}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",display:"flex"},children:e.jsx(q,{})}),e.jsx("input",{className:"vpi-input",value:u,onChange:a=>F(a.target.value),placeholder:"Invoice #, vendor, vehicle, product…",style:{paddingLeft:34}})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:k,children:"From Date"}),e.jsx("input",{type:"date",className:"vpi-input",value:f,onChange:a=>D(a.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{style:k,children:"To Date"}),e.jsx("input",{type:"date",className:"vpi-input",value:b,onChange:a=>M(a.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{style:k,children:"Product"}),e.jsx("div",{className:"vpi-select-wrap",children:e.jsxs("select",{className:"vpi-select",value:y,onChange:a=>C(a.target.value),children:[e.jsx("option",{value:"",children:"All products"}),P.map(a=>e.jsx("option",{value:a,children:a},a))]})})]}),e.jsx("div",{children:e.jsx("button",{className:"vpi-clear-btn",onClick:I,style:{opacity:j?1:.35,pointerEvents:j?"auto":"none"},children:"Clear"})})]}),j&&e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginTop:10},children:[u&&e.jsx(N,{label:`"${u}"`,onRemove:()=>F("")}),f&&e.jsx(N,{label:`From ${f}`,onRemove:()=>D("")}),b&&e.jsx(N,{label:`To ${b}`,onRemove:()=>M("")}),y&&e.jsx(N,{label:y,onRemove:()=>C("")})]})]}),d?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:16},children:Array.from({length:3}).map((a,o)=>e.jsx(Q,{},o))}):h.length===0?e.jsxs("div",{className:"vpi-empty",children:[e.jsx("svg",{width:48,height:48,fill:"none",viewBox:"0 0 24 24",stroke:"#e5e7eb",strokeWidth:1.2,style:{margin:"0 auto 14px",display:"block"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),e.jsx("p",{style:{fontSize:14,fontWeight:700,color:"#334455",marginBottom:4},children:"No invoices found"}),e.jsx("p",{style:{fontSize:13,color:"#A5A8A6"},children:"Try adjusting your search or filters"})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:14},children:h.map((a,o)=>{const g=n(a.netWeightKg||a.netWeight||0),w=n(a.netWeightMaund||a.netWeight40KG||0),R=n(a.finalAmount||a.totalAmount||a.amount||0),p=Array.isArray(a.rateRows)&&a.rateRows.length>1?`${a.rateRows.length} rate rows`:a.rateRows?.[0]?.rate?`Rs ${m(a.rateRows[0].rate)}/40kg`:a.rate40kg?`Rs ${m(a.rate40kg)}/40kg`:null;return e.jsxs("div",{className:"vpi-card",style:{animationDelay:`${o*.04}s`},children:[e.jsxs("div",{className:"vpi-card-head",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:5},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".07em"},children:"Invoice"}),e.jsxs("span",{style:{fontSize:17,fontWeight:800,color:"#111827",fontFamily:"'DM Mono',monospace"},children:["#",String(a.sr||"").padStart(4,"0")]})]}),e.jsx("div",{style:{width:1,height:16,background:"#DADADA"}}),e.jsx("span",{style:{fontSize:12.5,color:"#6E7170",fontWeight:500},children:a.date}),(a.productName||a.productId)&&e.jsx("span",{className:"vpi-paddy",children:A(a)}),a.bagStatus==="return"&&e.jsx("span",{style:{fontSize:11,color:"#6E7170",fontWeight:700,background:"#F5F5F5",padding:"2px 8px",borderRadius:6,border:"1px solid #DADADA"},children:"↩ Bag Return"}),a.builtyNumber&&e.jsxs("span",{style:{fontSize:11.5,color:"#6b7280",fontWeight:600,background:"#f3f4f6",padding:"2px 8px",borderRadius:6,fontFamily:"'DM Mono',monospace"},children:["Builty #",a.builtyNumber]})]}),e.jsxs("button",{className:"vpi-print-btn",onClick:()=>T(a),children:[e.jsx(U,{})," Print Invoice"]})]}),e.jsxs("div",{className:"vpi-data-grid",children:[e.jsx(x,{label:"Vendor",value:a.vendorName}),e.jsx(x,{label:"Vehicle No.",value:a.vehicleNumber,mono:!0}),e.jsx(x,{label:"Gross Weight (kg)",value:a.grossWeight||a.finalWeight?s(a.grossWeight||a.finalWeight):null,mono:!0}),e.jsx(x,{label:"Qty (Bags)",value:a.quantity,mono:!0}),e.jsx(x,{label:"Bag Type",value:a.bagTypeName||(a.bagWeightPerBag?`${a.bagWeightPerBag} kg/bag`:null)}),e.jsx(x,{label:"Moisture %",value:a.moisturePercent?`${a.moisturePercent}%`:null,mono:!0}),e.jsx(x,{label:"Net Wt. (kg)",value:g?s(g):null,mono:!0,highlight:!0}),e.jsx(x,{label:"Net Wt. (Maund)",value:w?w.toFixed(4):null,mono:!0})]}),e.jsxs("div",{className:"vpi-card-footer",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"},children:[p&&e.jsx(O,{label:"Rate",value:null,color:"#6366f1"}),p&&e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"#A5A8A6",marginBottom:1},children:"Rate"}),e.jsx("div",{style:{fontSize:13,fontWeight:700,color:"#212A37",fontFamily:"'DM Mono',monospace"},children:p})]}),n(a.rentAdjustment)>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:1,height:24,background:"#DADADA"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:1},children:"Rent Adj."}),e.jsxs("div",{style:{fontSize:13,fontWeight:700,color:"#ef4444",fontFamily:"'DM Mono',monospace"},children:["− Rs ",s(a.rentAdjustment)]})]})]})]}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:2},children:"Net Payable"}),e.jsxs("div",{style:{fontSize:20,fontWeight:800,color:"#111827",fontFamily:"'DM Mono',monospace",letterSpacing:"-.5px"},children:["Rs ",s(R)]})]})]})]},a._id)})}),!d&&h.length>0&&e.jsxs("p",{style:{textAlign:"center",color:"#A5A8A6",fontSize:12,marginTop:20,fontFamily:"'DM Mono',monospace"},children:[h.length," invoice",h.length!==1?"s":"",j?` · filtered from ${t.length} total`:""]})]})]})}export{Z as default};
