import{a as D,A as K,j as e,S as J,N as E}from"./index-DLvLt0Mo.js";import{b as c}from"./react-BBT0yyZ1.js";const G="@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');",H=`
  *,*::before,*::after{box-sizing:border-box}
  .vpi-wrap{font-family:'Plus Jakarta Sans',sans-serif;color:#111827}
  .vpi-input,.vpi-select{width:100%;border:1.5px solid #e5e7eb;border-radius:10px;padding:9px 12px;font-size:13.5px;font-family:'Plus Jakarta Sans',sans-serif;color:#111827;background:#fff;outline:none;transition:border-color .15s,box-shadow .15s;appearance:none}
  .vpi-input::placeholder{color:#9ca3af}
  .vpi-input:focus,.vpi-select:focus{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.12)}
  .vpi-stat{background:#fff;border:1.5px solid #f3f4f6;border-radius:14px;padding:18px 20px;transition:box-shadow .2s}
  .vpi-stat:hover{box-shadow:0 4px 16px rgba(0,0,0,.07)}
  .vpi-card{background:#fff;border-radius:16px;overflow:hidden;border:1.5px solid #f3f4f6;box-shadow:0 1px 3px rgba(0,0,0,.04);transition:box-shadow .2s,transform .2s}
  .vpi-card:hover{box-shadow:0 8px 24px rgba(0,0,0,.09);transform:translateY(-1px)}
  .vpi-card-head{display:flex;align-items:center;justify-content:space-between;padding:14px 20px 13px;border-bottom:1.5px solid #f3f4f6;gap:12px;flex-wrap:wrap}
  .vpi-data-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0}
  .vpi-data-cell{padding:13px 18px;border-right:1.5px solid #f9fafb;border-bottom:1.5px solid #f9fafb}
  .vpi-data-cell:nth-child(4n){border-right:none}
  .vpi-data-cell:nth-last-child(-n+4){border-bottom:none}
  .vpi-data-label{font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#9ca3af;margin-bottom:5px}
  .vpi-data-value{font-size:13.5px;font-weight:600;color:#1f2937}
  .vpi-data-value.mono{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;color:#374151}
  .vpi-card-footer{display:flex;align-items:center;justify-content:space-between;padding:13px 20px;background:#fafafa;border-top:1.5px solid #f3f4f6;gap:12px;flex-wrap:wrap}
  .vpi-paddy{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:700;background:#fef9c3;color:#854d0e;border:1px solid #fde68a;white-space:nowrap}
  .vpi-print-btn{display:inline-flex;align-items:center;gap:6px;background:#18181b;color:#fff;border:none;border-radius:9px;padding:8px 14px;font-size:12.5px;font-weight:600;font-family:'Plus Jakarta Sans',sans-serif;cursor:pointer;transition:background .15s,box-shadow .15s;white-space:nowrap}
  .vpi-print-btn:hover{background:#09090b;box-shadow:0 3px 10px rgba(0,0,0,.25)}
  .vpi-clear-btn{background:none;border:1.5px solid #e5e7eb;border-radius:9px;padding:8px 14px;font-size:13px;font-weight:600;color:#6b7280;font-family:'Plus Jakarta Sans',sans-serif;cursor:pointer;transition:all .15s}
  .vpi-clear-btn:hover{border-color:#d1d5db;color:#374151}
  .vpi-select-wrap{position:relative}
  .vpi-select-wrap::after{content:'';position:absolute;right:12px;top:50%;transform:translateY(-50%);pointer-events:none;border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid #9ca3af}
  @keyframes vpi-shimmer{to{background-position:-200% 0}}
  .vpi-skeleton{background:linear-gradient(90deg,#f3f4f6 25%,#fafafa 50%,#f3f4f6 75%);background-size:200% 100%;animation:vpi-shimmer 1.3s infinite;border-radius:8px}
  @keyframes vpi-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
  .vpi-card{animation:vpi-in .22s ease-out both}
  .vpi-empty{text-align:center;padding:64px 20px;color:#9ca3af}
  @media(max-width:768px){.vpi-data-grid{grid-template-columns:repeat(2,1fr)}.vpi-data-cell:nth-child(2n){border-right:none}.vpi-data-cell:nth-last-child(-n+2){border-bottom:none}}
`,n=a=>isNaN(Number(a))?0:Number(a)||0,f=(a,o=0)=>n(a).toLocaleString("en-PK",{minimumFractionDigits:o,maximumFractionDigits:o}),r=a=>f(a,2);function V(a){const d=(Array.isArray(a.rateRows)&&a.rateRows.length?a.rateRows:[{maund:n(a.netWeightMaund||a.netWeight40KG),rate:n(a.rate40kg),amount:n(a.totalAmount||a.amount)}]).filter(i=>i.maund||i.rate).map(i=>`<tr><td>${r(i.maund)} Maund × Rs ${r(i.rate)}</td><td style="text-align:right;font-weight:700">Rs ${r(i.amount)}</td></tr>`).join("");return`<!DOCTYPE html><html><head><title>Purchase Invoice #${a.sr||a.builtyNumber}</title>
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
      <tr><td><b>Invoice #</b></td><td>${String(a.sr||"").padStart(4,"0")}</td></tr>
      <tr><td><b>Date</b></td><td>${a.date||""}</td></tr>
      <tr><td><b>Builty #</b></td><td>${a.builtyNumber||"—"}</td></tr>
    </table>
  </div>
</div>

<div class="info-grid">
  <div class="box"><h4>SUPPLIER</h4>
    <p><b>Name:</b> ${a.vendorName||"—"}</p>
    <p><b>Vehicle:</b> ${a.vehicleNumber||"—"}</p>
    <p><b>Bag Status:</b> ${a.bagStatus==="return"?"Bag Return":"Bag Added"}</p>
  </div>
  <div class="box"><h4>PRODUCT</h4>
    <p><b>Product:</b> ${a.productName||"—"}</p>
    <p><b>Bag Type:</b> ${a.bagTypeName||"—"} (${r(a.bagWeightPerBag)} kg/bag)</p>
    <p><b>Moisture:</b> ${a.moisturePercent||0}% (Base: ${a.baseMoisture||0}%)</p>
  </div>
</div>

<table>
  <tr><th>Description</th><th style="text-align:right">Value</th></tr>
  <tr><td>Quantity (Bags)</td><td style="text-align:right">${f(a.quantity)}</td></tr>
  <tr><td>Gross Weight (kg)</td><td style="text-align:right">${r(a.grossWeight)}</td></tr>
  <tr><td>Total Bag Weight (${a.bagTypeName||""} × ${f(a.quantity)} bags)</td><td style="text-align:right">− ${r(a.totalBagWeight)}</td></tr>
  <tr><td>Moisture Adjustment</td><td style="text-align:right">− ${r(a.moistureAdjustment)}</td></tr>
  <tr class="sub"><td>Net Weight (kg)</td><td style="text-align:right">${r(a.netWeightKg||a.netWeight)}</td></tr>
  <tr class="sub"><td>Net Weight (Maund)</td><td style="text-align:right">${f(a.netWeightMaund||a.netWeight40KG,4)}</td></tr>
</table>

<table style="margin-top:12px">
  <tr><th>Rate Breakdown</th><th style="text-align:right">Amount</th></tr>
  ${d}
  <tr class="sub"><td>Total Amount</td><td style="text-align:right">Rs ${r(a.totalAmount||a.amount)}</td></tr>
  ${n(a.rentAdjustment)>0?`<tr><td>Rent Adjustment</td><td style="text-align:right">− Rs ${r(a.rentAdjustment)}</td></tr>`:""}
  <tr class="grand"><td>NET PAYABLE</td><td style="text-align:right">Rs ${r(a.finalAmount||a.totalAmount||a.amount)}</td></tr>
</table>

<div class="sig">
  <div><span>Supplier Signature</span></div>
  <div><span>Authorised Signatory</span></div>
</div>
<p style="text-align:center;margin-top:28px;font-size:12px">Thank you for your business — Al Rehman Rice Mills</p>
</div><script>window.print()<\/script></body></html>`}const Y=()=>e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"})}),_=()=>e.jsxs("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2,children:[e.jsx("circle",{cx:11,cy:11,r:8}),e.jsx("path",{strokeLinecap:"round",d:"M21 21l-4.35-4.35"})]});function S({label:a,value:o,accent:d,prefix:i}){return e.jsxs("div",{className:"vpi-stat",children:[e.jsx("p",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:10},children:a}),e.jsxs("p",{style:{fontSize:21,fontWeight:800,color:"#111827",lineHeight:1,fontFamily:"'JetBrains Mono',monospace",letterSpacing:"-.5px"},children:[i&&e.jsx("span",{style:{fontSize:14,color:d||"#9ca3af",marginRight:3},children:i}),o]})]})}function x({label:a,value:o,mono:d,highlight:i}){return e.jsxs("div",{className:"vpi-data-cell",style:i?{background:"#fafffe"}:{},children:[e.jsx("div",{className:"vpi-data-label",children:a}),e.jsx("div",{className:`vpi-data-value${d?" mono":""}`,style:i?{color:"#059669",fontWeight:700}:{},children:o??e.jsx("span",{style:{color:"#d1d5db"},children:"—"})})]})}function U({label:a,value:o,color:d}){return e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:1},children:a}),e.jsx("div",{style:{fontSize:13.5,fontWeight:700,color:d,fontFamily:"'JetBrains Mono',monospace"},children:o!=null&&o!==""?Number(o).toLocaleString("en-PK",{minimumFractionDigits:2}):"—"})]})}function k({label:a,onRemove:o}){return e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:5,background:"#eef2ff",border:"1px solid #c7d2fe",borderRadius:20,padding:"3px 9px 3px 10px",fontSize:12,fontWeight:600,color:"#4f46e5"},children:[a,e.jsx("button",{onClick:o,style:{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",alignItems:"center",color:"#818cf8",marginLeft:1},children:e.jsx("svg",{width:12,height:12,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",d:"M6 18L18 6M6 6l12 12"})})})]})}function q(){return e.jsxs("div",{className:"vpi-card",style:{animation:"none"},children:[e.jsxs("div",{className:"vpi-card-head",children:[e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[e.jsx("div",{className:"vpi-skeleton",style:{width:80,height:18}}),e.jsx("div",{className:"vpi-skeleton",style:{width:60,height:22,borderRadius:20}})]}),e.jsx("div",{className:"vpi-skeleton",style:{width:90,height:34,borderRadius:9}})]}),e.jsx("div",{className:"vpi-data-grid",children:Array.from({length:8}).map((a,o)=>e.jsxs("div",{className:"vpi-data-cell",children:[e.jsx("div",{className:"vpi-skeleton",style:{width:"50%",height:10,marginBottom:8}}),e.jsx("div",{className:"vpi-skeleton",style:{width:"80%",height:16}})]},o))}),e.jsxs("div",{className:"vpi-card-footer",children:[e.jsx("div",{className:"vpi-skeleton",style:{width:120,height:14}}),e.jsx("div",{className:"vpi-skeleton",style:{width:100,height:22}})]})]})}const N={display:"block",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:6};function X(){const[a,o]=c.useState([]),[d,i]=c.useState(!0),[M,W]=c.useState({message:"",type:"info"}),[m,R]=c.useState(""),[u,z]=c.useState(""),[b,B]=c.useState(""),[y,A]=c.useState(""),[h,P]=c.useState([]),[v,C]=c.useState({grossKg:"0",netKg:"0",netMaund:"0",totalAmt:"0"});c.useEffect(()=>{(async()=>{try{const s=await(await D(`${K}/purchase-invoice`)).json();s.success?(o(s.invoices),P(s.invoices),T(s.invoices)):W({message:s.message||"Failed to fetch",type:"error"})}catch{W({message:"Server error!",type:"error"})}finally{i(!1)}})()},[]),c.useEffect(()=>{let t=a;if(m){const s=m.toLowerCase();t=t.filter(g=>g.vendorName?.toLowerCase().includes(s)||g.vehicleNumber?.toLowerCase().includes(s)||g.productName?.toLowerCase().includes(s)||String(g.sr).includes(s)||String(g.builtyNumber||"").includes(s))}u&&(t=t.filter(s=>new Date(s.date)>=new Date(u))),b&&(t=t.filter(s=>new Date(s.date)<=new Date(b))),y&&(t=t.filter(s=>s.productName===y)),P(t),T(t)},[m,u,b,y,a]);const T=t=>{const s=t.reduce((p,l)=>p+n(l.grossWeight||l.finalWeight||0),0),g=t.reduce((p,l)=>p+n(l.netWeightKg||l.netWeight||0),0),w=t.reduce((p,l)=>p+n(l.netWeightMaund||l.netWeight40KG||0),0),$=t.reduce((p,l)=>p+n(l.finalAmount||l.totalAmount||l.amount||0),0);C({grossKg:f(s),netKg:f(g),netMaund:f(w,3),totalAmt:f($)})},F=t=>{const s=window.open("","_blank");s&&(s.document.write(V(t)),s.document.close())},I=()=>{R(""),z(""),B(""),A("")},j=m||u||b||y,L=[...new Set(a.map(t=>t.productName).filter(Boolean))];return e.jsxs(J,{children:[e.jsxs("style",{children:[G,H]}),e.jsx(E,{message:M.message,type:M.type,onClose:()=>W({message:"",type:"info"})}),e.jsxs("div",{className:"vpi-wrap",children:[e.jsxs("div",{style:{marginBottom:24,display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:10},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"#9ca3af",marginBottom:4},children:"Procurement"}),e.jsx("h1",{style:{fontSize:26,fontWeight:800,color:"#111827",letterSpacing:"-.5px",lineHeight:1},children:"Purchase Invoices"})]}),!d&&e.jsxs("div",{style:{background:"#f3f4f6",borderRadius:10,padding:"7px 14px",fontSize:13,fontWeight:600,color:"#6b7280",fontFamily:"'JetBrains Mono',monospace"},children:[h.length,h.length!==a.length&&e.jsxs("span",{style:{color:"#9ca3af",fontWeight:400},children:[" / ",a.length]}),e.jsxs("span",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",marginLeft:5,fontWeight:500},children:["invoice",h.length!==1?"s":""]})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20},children:[e.jsx(S,{label:"Total Gross KG",value:v.grossKg,accent:"#6366f1"}),e.jsx(S,{label:"Total Net KG",value:v.netKg,accent:"#0ea5e9"}),e.jsx(S,{label:"Total Maund",value:v.netMaund,accent:"#f59e0b"}),e.jsx(S,{label:"Total Amount",value:v.totalAmt,accent:"#10b981",prefix:"Rs"})]}),e.jsxs("div",{style:{background:"#fff",border:"1.5px solid #f3f4f6",borderRadius:14,padding:"14px 16px",marginBottom:20,boxShadow:"0 1px 3px rgba(0,0,0,.04)"},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr auto",gap:10,alignItems:"end"},children:[e.jsxs("div",{children:[e.jsx("label",{style:N,children:"Search"}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",display:"flex"},children:e.jsx(_,{})}),e.jsx("input",{className:"vpi-input",value:m,onChange:t=>R(t.target.value),placeholder:"Invoice #, vendor, vehicle, product…",style:{paddingLeft:34}})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:N,children:"From Date"}),e.jsx("input",{type:"date",className:"vpi-input",value:u,onChange:t=>z(t.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{style:N,children:"To Date"}),e.jsx("input",{type:"date",className:"vpi-input",value:b,onChange:t=>B(t.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{style:N,children:"Product"}),e.jsx("div",{className:"vpi-select-wrap",children:e.jsxs("select",{className:"vpi-select",value:y,onChange:t=>A(t.target.value),children:[e.jsx("option",{value:"",children:"All products"}),L.map(t=>e.jsx("option",{value:t,children:t},t))]})})]}),e.jsx("div",{children:e.jsx("button",{className:"vpi-clear-btn",onClick:I,style:{opacity:j?1:.35,pointerEvents:j?"auto":"none"},children:"Clear"})})]}),j&&e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginTop:10},children:[m&&e.jsx(k,{label:`"${m}"`,onRemove:()=>R("")}),u&&e.jsx(k,{label:`From ${u}`,onRemove:()=>z("")}),b&&e.jsx(k,{label:`To ${b}`,onRemove:()=>B("")}),y&&e.jsx(k,{label:y,onRemove:()=>A("")})]})]}),d?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:16},children:Array.from({length:3}).map((t,s)=>e.jsx(q,{},s))}):h.length===0?e.jsxs("div",{className:"vpi-empty",children:[e.jsx("svg",{width:48,height:48,fill:"none",viewBox:"0 0 24 24",stroke:"#e5e7eb",strokeWidth:1.2,style:{margin:"0 auto 14px",display:"block"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),e.jsx("p",{style:{fontSize:15,fontWeight:700,color:"#6b7280",marginBottom:4},children:"No invoices found"}),e.jsx("p",{style:{fontSize:13,color:"#9ca3af"},children:"Try adjusting your search or filters"})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:14},children:h.map((t,s)=>{const g=n(t.netWeightKg||t.netWeight||0),w=n(t.netWeightMaund||t.netWeight40KG||0),$=n(t.finalAmount||t.totalAmount||t.amount||0),p=Array.isArray(t.rateRows)&&t.rateRows.length>1?`${t.rateRows.length} rate rows`:t.rateRows?.[0]?.rate?`Rs ${f(t.rateRows[0].rate)}/40kg`:t.rate40kg?`Rs ${f(t.rate40kg)}/40kg`:null;return e.jsxs("div",{className:"vpi-card",style:{animationDelay:`${s*.04}s`},children:[e.jsxs("div",{className:"vpi-card-head",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:5},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".07em"},children:"Invoice"}),e.jsxs("span",{style:{fontSize:17,fontWeight:800,color:"#111827",fontFamily:"'JetBrains Mono',monospace"},children:["#",String(t.sr||"").padStart(4,"0")]})]}),e.jsx("div",{style:{width:1,height:16,background:"#e5e7eb"}}),e.jsx("span",{style:{fontSize:13,color:"#6b7280",fontWeight:500},children:t.date}),t.productName&&e.jsx("span",{className:"vpi-paddy",children:t.productName}),t.bagStatus==="return"&&e.jsx("span",{style:{fontSize:11.5,color:"#7c3aed",fontWeight:700,background:"#f5f3ff",padding:"2px 8px",borderRadius:6,border:"1px solid #ddd6fe"},children:"↩ Bag Return"}),t.builtyNumber&&e.jsxs("span",{style:{fontSize:11.5,color:"#6b7280",fontWeight:600,background:"#f3f4f6",padding:"2px 8px",borderRadius:6,fontFamily:"'JetBrains Mono',monospace"},children:["Builty #",t.builtyNumber]})]}),e.jsxs("button",{className:"vpi-print-btn",onClick:()=>F(t),children:[e.jsx(Y,{})," Print Invoice"]})]}),e.jsxs("div",{className:"vpi-data-grid",children:[e.jsx(x,{label:"Vendor",value:t.vendorName}),e.jsx(x,{label:"Vehicle No.",value:t.vehicleNumber,mono:!0}),e.jsx(x,{label:"Gross Weight (kg)",value:t.grossWeight||t.finalWeight?r(t.grossWeight||t.finalWeight):null,mono:!0}),e.jsx(x,{label:"Qty (Bags)",value:t.quantity,mono:!0}),e.jsx(x,{label:"Bag Type",value:t.bagTypeName||(t.bagWeightPerBag?`${t.bagWeightPerBag} kg/bag`:null)}),e.jsx(x,{label:"Moisture %",value:t.moisturePercent?`${t.moisturePercent}%`:null,mono:!0}),e.jsx(x,{label:"Net Wt. (kg)",value:g?r(g):null,mono:!0,highlight:!0}),e.jsx(x,{label:"Net Wt. (Maund)",value:w?w.toFixed(4):null,mono:!0})]}),e.jsxs("div",{className:"vpi-card-footer",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"},children:[p&&e.jsx(U,{label:"Rate",value:null,color:"#6366f1"}),p&&e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:1},children:"Rate"}),e.jsx("div",{style:{fontSize:13,fontWeight:700,color:"#6366f1",fontFamily:"'JetBrains Mono',monospace"},children:p})]}),n(t.rentAdjustment)>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:1,height:24,background:"#e5e7eb"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:1},children:"Rent Adj."}),e.jsxs("div",{style:{fontSize:13,fontWeight:700,color:"#ef4444",fontFamily:"'JetBrains Mono',monospace"},children:["− Rs ",r(t.rentAdjustment)]})]})]})]}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:2},children:"Net Payable"}),e.jsxs("div",{style:{fontSize:20,fontWeight:800,color:"#111827",fontFamily:"'JetBrains Mono',monospace",letterSpacing:"-.5px"},children:["Rs ",r($)]})]})]})]},t._id)})}),!d&&h.length>0&&e.jsxs("p",{style:{textAlign:"center",color:"#9ca3af",fontSize:12.5,marginTop:20,fontFamily:"'JetBrains Mono',monospace"},children:[h.length," invoice",h.length!==1?"s":"",j?` · filtered from ${a.length} total`:""]})]})]})}export{X as default};
