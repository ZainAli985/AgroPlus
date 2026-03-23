import{a as q,A as K,j as e,S as H,N as Y}from"./index-PWmeZ259.js";import{b as l}from"./react-BBT0yyZ1.js";const _="@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",O=`
  *,*::before,*::after{box-sizing:border-box}
  .vsi-wrap{font-family:'DM Sans',sans-serif;color:#0B0C0D}

  /* inputs */
  .vsi-input,.vsi-select{width:100%;border:1.5px solid #E3E3E3;border-radius:9px;padding:9px 12px;font-size:13px;font-family:'DM Sans',sans-serif;color:#141A1F;background:#F5F5F5;outline:none;transition:border-color .15s,box-shadow .15s;appearance:none}
  .vsi-input::placeholder{color:#A5A8A6;font-style:italic}
  .vsi-input:focus,.vsi-select:focus{border-color:#212A37;box-shadow:0 0 0 3px rgba(33,42,55,.08);background:#fff}

  /* stat cards */
  .vsi-stat{background:#fff;border:1.5px solid #ECECEC;border-radius:14px;padding:18px 20px;transition:box-shadow .18s;position:relative;overflow:hidden}
  .vsi-stat::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--oc-navy,#212A37),#929183)}
  .vsi-stat:hover{box-shadow:0 4px 16px rgba(11,12,13,.08)}

  /* invoice cards */
  .vsi-card{background:#fff;border-radius:14px;overflow:hidden;border:1.5px solid #ECECEC;box-shadow:0 1px 4px rgba(11,12,13,.04);transition:box-shadow .18s,transform .15s}
  .vsi-card:hover{box-shadow:0 6px 20px rgba(11,12,13,.08);transform:translateY(-1px)}
  .vsi-card-head{display:flex;align-items:center;justify-content:space-between;padding:13px 18px 12px;border-bottom:1.5px solid #F5F5F5;gap:12px;flex-wrap:wrap;background:#fff}
  .vsi-data-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0}
  .vsi-data-cell{padding:12px 16px;border-right:1.5px solid #F5F5F5;border-bottom:1.5px solid #F5F5F5}
  .vsi-data-cell:nth-child(4n){border-right:none}
  .vsi-data-cell:nth-last-child(-n+4){border-bottom:none}
  .vsi-data-label{font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#A5A8A6;margin-bottom:5px;font-family:'DM Sans',sans-serif}
  .vsi-data-value{font-size:13px;font-weight:600;color:#212A37}
  .vsi-data-value.mono{font-family:'DM Mono',monospace;font-size:12.5px;font-weight:500;color:#334455}
  .vsi-card-footer{display:flex;align-items:center;justify-content:space-between;padding:12px 18px;background:#F5F5F5;border-top:1.5px solid #ECECEC;gap:12px;flex-wrap:wrap}

  /* product badge */
  .vsi-paddy{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;font-size:11.5px;font-weight:700;background:rgba(146,145,131,.1);color:#7A5A2B;border:1px solid rgba(146,145,131,.28);white-space:nowrap;font-family:'DM Mono',monospace}

  /* print button */
  .vsi-print-btn{display:inline-flex;align-items:center;gap:6px;background:#212A37;color:#fff;border:none;border-radius:9px;padding:7px 14px;font-size:12px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:background .15s,box-shadow .15s;white-space:nowrap}
  .vsi-print-btn:hover{background:#141A1F;box-shadow:0 4px 12px rgba(33,42,55,.3)}

  /* clear button */
  .vsi-clear-btn{background:none;border:1.5px solid #E3E3E3;border-radius:9px;padding:8px 14px;font-size:13px;font-weight:600;color:#6E7170;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all .15s}
  .vsi-clear-btn:hover{border-color:#DADADA;color:#212A37}

  .vsi-select-wrap{position:relative}
  .vsi-select-wrap::after{content:'';position:absolute;right:12px;top:50%;transform:translateY(-50%);pointer-events:none;border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid #A5A8A6}

  /* skeleton */
  @keyframes vsi-shimmer{to{background-position:-200% 0}}
  .vsi-skeleton{background:linear-gradient(90deg,#F5F5F5 25%,#ECECEC 50%,#F5F5F5 75%);background-size:200% 100%;animation:vsi-shimmer 1.4s infinite;border-radius:7px}
  @keyframes vsi-in{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
  .vsi-card{animation:vsi-in .2s ease-out both}
  .vsi-empty{text-align:center;padding:64px 20px;color:#A5A8A6}

  /* filter pills */
  .vsi-fpill{display:inline-flex;align-items:center;gap:5px;background:rgba(33,42,55,.06);border:1px solid rgba(33,42,55,.14);border-radius:20px;padding:3px 9px 3px 10px;font-size:12px;font-weight:600;color:#212A37}

  @media(max-width:900px){
    .vsi-stats-grid{grid-template-columns:repeat(2,1fr)!important}
    .vsi-filter-grid{grid-template-columns:1fr 1fr!important}
    .vsi-data-grid{grid-template-columns:repeat(2,1fr)}
    .vsi-data-cell:nth-child(4n){border-right:1.5px solid #F5F5F5}
    .vsi-data-cell:nth-child(2n){border-right:none}
    .vsi-data-cell:nth-last-child(-n+4){border-bottom:1.5px solid #F5F5F5}
    .vsi-data-cell:nth-last-child(-n+2){border-bottom:none}
  }
  @media(max-width:520px){
    .vsi-stats-grid{grid-template-columns:1fr 1fr!important}
    .vsi-filter-grid{grid-template-columns:1fr!important}
    .vsi-data-grid{grid-template-columns:1fr 1fr}
  }
`,r=a=>isNaN(Number(a))?0:Number(a)||0;function v(a){const i=a.paddyType||a.productName;if(i&&i.includes(" - "))return i;const n=a.productId;return n&&typeof n=="object"?[n.productName||i,n.type,n.subType].filter(Boolean).join(" - "):i||"—"}const d=(a,i=0)=>r(a).toLocaleString("en-PK",{minimumFractionDigits:i,maximumFractionDigits:i}),o=a=>d(a,2);function G(a){const i=String(a.sr||"").padStart(4,"0");return`<!DOCTYPE html><html><head><title>Sales Invoice #${i}</title>
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
      <tr><td><b>Invoice #</b></td><td>${i}</td></tr>
      <tr><td><b>Date</b></td><td>${a.date||""}</td></tr>
      <tr><td><b>Builty #</b></td><td>${a.builtyNo||"—"}</td></tr>
    </table>
  </div>
</div>
<div class="info-grid">
  <div class="box"><h4>CUSTOMER</h4>
    <p><b>Name:</b> ${a.vendorName||"—"}</p>
    <p><b>Vehicle:</b> ${a.vehicleNo||"—"}</p>
    <p><b>Broker:</b> ${a.brokerName||"—"}</p>
  </div>
  <div class="box"><h4>PRODUCT</h4>
    <p><b>Product:</b> ${v(a)}</p>
    <p><b>Rate / 40kg:</b> Rs ${o(a.rate40)}</p>
    <p><b>Quantity:</b> ${d(a.quantity)} bags</p>
  </div>
</div>
<table>
  <tr><th>Description</th><th style="text-align:right">Value</th></tr>
  <tr><td>Total Weight (kg)</td><td style="text-align:right">${o(a.weight)}</td></tr>
  <tr><td>Bag Deduction (${d(a.quantity)} bags × ${o(a.bagWeight)} kg)</td><td style="text-align:right">− ${o(r(a.quantity)*r(a.bagWeight))}</td></tr>
  <tr class="sub"><td>Net Weight (kg)</td><td style="text-align:right">${o(a.netWeight)}</td></tr>
  <tr class="sub"><td>Net Weight (Maund)</td><td style="text-align:right">${r(a.netWeight40).toFixed(4)}</td></tr>
  <tr><td>Amount (${r(a.netWeight40).toFixed(4)} Maund × Rs ${o(a.rate40)})</td><td style="text-align:right">Rs ${o(a.amount)}</td></tr>
  <tr><td>Sutli / Silai (Rs ${o(a.sutliSilaiRate)} × ${d(a.quantity)} bags)</td><td style="text-align:right">Rs ${o(a.sutliSilaiAmount)}</td></tr>
  ${r(a.bardanaRate)>0?`<tr><td>Bardana (Rs ${o(a.bardanaRate)} × ${d(a.quantity)} bags)</td><td style="text-align:right">Rs ${o(a.bardanaAmount)}</td></tr>`:""}
  <tr class="sub"><td>Total (w/ Sutli${r(a.bardanaRate)>0?" + Bardana":""})</td><td style="text-align:right">Rs ${o(a.totalWithBardana||a.totalAmount)}</td></tr>
  ${r(a.brokeryRate)>0?`<tr><td>Brokery (${r(a.netWeight40).toFixed(4)} Maund × Rs ${o(a.brokeryRate)})</td><td style="text-align:right">− Rs ${o(a.brokery)}</td></tr>`:""}
  <tr class="grand"><td>NET PAYABLE</td><td style="text-align:right">Rs ${o(a.totalAmount2)}</td></tr>
</table>
<div class="sig">
  <div><span>Customer Signature</span></div>
  <div><span>Authorised Signatory</span></div>
</div>
<p style="text-align:center;margin-top:28px;font-size:12px">Thank you for your business — Al Rehman Rice Mills</p>
</div><script>window.print()<\/script></body></html>`}const U=()=>e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"})}),Q=()=>e.jsxs("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2,children:[e.jsx("circle",{cx:11,cy:11,r:8}),e.jsx("path",{strokeLinecap:"round",d:"M21 21l-4.35-4.35"})]});function A({label:a,value:i,accent:n,prefix:c}){return e.jsxs("div",{className:"vsi-stat",children:[e.jsx("p",{style:{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",color:"#A5A8A6",marginBottom:10},children:a}),e.jsxs("p",{style:{fontSize:22,fontWeight:700,color:"#0B0C0D",lineHeight:1,fontFamily:"'DM Mono',monospace",letterSpacing:"-.5px"},children:[c&&e.jsx("span",{style:{fontSize:14,color:n||"#9ca3af",marginRight:3},children:c}),i]})]})}function g({label:a,value:i,mono:n}){return e.jsxs("div",{className:"vsi-data-cell",children:[e.jsx("div",{className:"vsi-data-label",children:a}),e.jsx("div",{className:`vsi-data-value${n?" mono":""}`,children:i??e.jsx("span",{style:{color:"#d1d5db"},children:"—"})})]})}function z({label:a,value:i,color:n,large:c}){return e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"#A5A8A6",marginBottom:2},children:a}),e.jsx("div",{style:{fontSize:c?20:13.5,fontWeight:c?800:700,color:n||"#374151",fontFamily:"'DM Mono',monospace",letterSpacing:c?"-.5px":"-.2px"},children:r(i)>0?`Rs ${o(i)}`:"—"})]})}function S({label:a,onRemove:i}){return e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(33,42,55,.06)",border:"1px solid rgba(33,42,55,.14)",borderRadius:20,padding:"3px 9px 3px 10px",fontSize:12,fontWeight:600,color:"#212A37"},children:[a,e.jsx("button",{onClick:i,style:{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",alignItems:"center",color:"#A5A8A6",marginLeft:1},children:e.jsx("svg",{width:12,height:12,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",d:"M6 18L18 6M6 6l12 12"})})})]})}function J(){return e.jsxs("div",{className:"vsi-card",style:{animation:"none"},children:[e.jsxs("div",{className:"vsi-card-head",children:[e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[e.jsx("div",{className:"vsi-skeleton",style:{width:80,height:18}}),e.jsx("div",{className:"vsi-skeleton",style:{width:60,height:22,borderRadius:20}})]}),e.jsx("div",{className:"vsi-skeleton",style:{width:110,height:34,borderRadius:9}})]}),e.jsx("div",{className:"vsi-data-grid",children:Array.from({length:8}).map((a,i)=>e.jsxs("div",{className:"vsi-data-cell",children:[e.jsx("div",{className:"vsi-skeleton",style:{width:"50%",height:10,marginBottom:8}}),e.jsx("div",{className:"vsi-skeleton",style:{width:"80%",height:16}})]},i))}),e.jsxs("div",{className:"vsi-card-footer",children:[e.jsx("div",{style:{display:"flex",gap:16},children:[100,80,90].map((a,i)=>e.jsxs("div",{children:[e.jsx("div",{className:"vsi-skeleton",style:{width:60,height:9,marginBottom:5}}),e.jsx("div",{className:"vsi-skeleton",style:{width:a,height:15}})]},i))}),e.jsxs("div",{children:[e.jsx("div",{className:"vsi-skeleton",style:{width:60,height:10,marginBottom:5}}),e.jsx("div",{className:"vsi-skeleton",style:{width:120,height:22}})]})]})]})}const k={display:"block",fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"#A5A8A6",marginBottom:6};function ee(){const[a,i]=l.useState([]),[n,c]=l.useState(!0),[R,N]=l.useState({message:"",type:"info"}),[x,F]=l.useState(""),[h,D]=l.useState(""),[m,C]=l.useState(""),[f,M]=l.useState(""),[p,W]=l.useState([]),[j,E]=l.useState({revenue:"0",netKg:"0",netMaund:"0",avgBags:"0"});l.useEffect(()=>{(async()=>{try{const s=await(await q(`${K}/sales-invoice`)).json();s.success?(i(s.invoices),W(s.invoices),B(s.invoices)):N({message:s.message||"Failed to fetch",type:"error"})}catch{N({message:"Server error!",type:"error"})}finally{c(!1)}})()},[]),l.useEffect(()=>{let t=a;if(x){const s=x.toLowerCase();t=t.filter(u=>u.vendorName?.toLowerCase().includes(s)||u.vehicleNo?.toLowerCase().includes(s)||u.brokerName?.toLowerCase().includes(s)||v(u)?.toLowerCase().includes(s)||String(u.sr).includes(s))}h&&(t=t.filter(s=>new Date(s.date)>=new Date(h))),m&&(t=t.filter(s=>new Date(s.date)<=new Date(m))),f&&(t=t.filter(s=>v(s)===f)),W(t),B(t)},[x,h,m,f,a]);const B=t=>{const s=t.length||1,u=t.reduce((b,y)=>b+r(y.totalAmount2||0),0),L=t.reduce((b,y)=>b+r(y.netWeight||0),0),P=t.reduce((b,y)=>b+r(y.netWeight40||0),0),V=t.reduce((b,y)=>b+r(y.quantity||0),0);E({revenue:d(u),netKg:d(L),netMaund:d(P,3),avgBags:d(V/s)})},$=t=>{const s=window.open("","_blank");s&&(s.document.write(G(t)),s.document.close())},T=()=>{F(""),D(""),C(""),M("")},w=x||h||m||f,I=[...new Set(a.map(t=>v(t)).filter(Boolean))];return e.jsxs(H,{children:[e.jsxs("style",{children:[_,O]}),e.jsx(Y,{message:R.message,type:R.type,onClose:()=>N({message:"",type:"info"})}),e.jsxs("div",{className:"vsi-wrap",children:[e.jsxs("div",{style:{marginBottom:24,display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:10},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".18em",color:"#929183",marginBottom:4},children:"Sales"}),e.jsx("h1",{style:{fontSize:26,fontWeight:700,color:"#0B0C0D",letterSpacing:"-.4px",lineHeight:1,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic"},children:"Sales Invoices"})]}),!n&&e.jsxs("div",{style:{background:"#F5F5F5",border:"1.5px solid #ECECEC",borderRadius:10,padding:"5px 14px",fontSize:12.5,fontWeight:500,color:"#6E7170",fontFamily:"'DM Mono',monospace"},children:[p.length,p.length!==a.length&&e.jsxs("span",{style:{color:"#9ca3af",fontWeight:400},children:[" / ",a.length]}),e.jsxs("span",{style:{fontFamily:"'DM Sans',sans-serif",marginLeft:5,fontWeight:500},children:["invoice",p.length!==1?"s":""]})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20},children:[e.jsx(A,{label:"Total Revenue",value:j.revenue,accent:"#22c55e",prefix:"Rs"}),e.jsx(A,{label:"Total Net KG",value:j.netKg,accent:"#334455"}),e.jsx(A,{label:"Total Maund",value:j.netMaund,accent:"#929183"}),e.jsx(A,{label:"Avg Bags/Invoice",value:j.avgBags,accent:"#212A37"})]}),e.jsxs("div",{style:{background:"#fff",border:"1.5px solid #ECECEC",borderRadius:12,padding:"12px 16px",marginBottom:20,boxShadow:"0 1px 4px rgba(11,12,13,.04)"},children:[e.jsxs("div",{className:"vsi-filter-grid",style:{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr auto",gap:10,alignItems:"end"},children:[e.jsxs("div",{children:[e.jsx("label",{style:k,children:"Search"}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",display:"flex"},children:e.jsx(Q,{})}),e.jsx("input",{className:"vsi-input",value:x,onChange:t=>F(t.target.value),placeholder:"Invoice #, vendor, vehicle, product…",style:{paddingLeft:34}})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:k,children:"From Date"}),e.jsx("input",{type:"date",className:"vsi-input",value:h,onChange:t=>D(t.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{style:k,children:"To Date"}),e.jsx("input",{type:"date",className:"vsi-input",value:m,onChange:t=>C(t.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{style:k,children:"Product"}),e.jsx("div",{className:"vsi-select-wrap",children:e.jsxs("select",{className:"vsi-select",value:f,onChange:t=>M(t.target.value),children:[e.jsx("option",{value:"",children:"All products"}),I.map(t=>e.jsx("option",{value:t,children:t},t))]})})]}),e.jsx("div",{children:e.jsx("button",{className:"vsi-clear-btn",onClick:T,style:{opacity:w?1:.35,pointerEvents:w?"auto":"none"},children:"Clear"})})]}),w&&e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginTop:10},children:[x&&e.jsx(S,{label:`"${x}"`,onRemove:()=>F("")}),h&&e.jsx(S,{label:`From ${h}`,onRemove:()=>D("")}),m&&e.jsx(S,{label:`To ${m}`,onRemove:()=>C("")}),f&&e.jsx(S,{label:f,onRemove:()=>M("")})]})]}),n?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:14},children:Array.from({length:3}).map((t,s)=>e.jsx(J,{},s))}):p.length===0?e.jsxs("div",{className:"vsi-empty",children:[e.jsx("svg",{width:48,height:48,fill:"none",viewBox:"0 0 24 24",stroke:"#e5e7eb",strokeWidth:1.2,style:{margin:"0 auto 14px",display:"block"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),e.jsx("p",{style:{fontSize:14,fontWeight:700,color:"#334455",marginBottom:4},children:"No invoices found"}),e.jsx("p",{style:{fontSize:13,color:"#A5A8A6"},children:"Try adjusting your search or filters"})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:14},children:p.map((t,s)=>e.jsxs("div",{className:"vsi-card",style:{animationDelay:`${s*.04}s`},children:[e.jsxs("div",{className:"vsi-card-head",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:5},children:[e.jsx("span",{style:{fontSize:10,fontWeight:700,color:"#A5A8A6",textTransform:"uppercase",letterSpacing:".1em"},children:"Invoice"}),e.jsxs("span",{style:{fontSize:16,fontWeight:700,color:"#0B0C0D",fontFamily:"'DM Mono',monospace"},children:["#",String(t.sr||"").padStart(4,"0")]})]}),e.jsx("div",{style:{width:1,height:16,background:"#DADADA"}}),e.jsx("span",{style:{fontSize:12.5,color:"#6E7170",fontWeight:500},children:t.date}),(t.paddyType||t.productName||t.productId)&&e.jsx("span",{className:"vsi-paddy",children:v(t)}),t.builtyNo&&e.jsxs("span",{style:{fontSize:11,color:"#6E7170",fontWeight:600,background:"#F5F5F5",border:"1px solid #ECECEC",padding:"2px 8px",borderRadius:6,fontFamily:"'DM Mono',monospace"},children:["Builty #",t.builtyNo]})]}),e.jsxs("button",{className:"vsi-print-btn",onClick:()=>$(t),children:[e.jsx(U,{})," Print Invoice"]})]}),e.jsxs("div",{className:"vsi-data-grid",children:[e.jsx(g,{label:"Vendor",value:t.vendorName}),e.jsx(g,{label:"Vehicle No.",value:t.vehicleNo,mono:!0}),e.jsx(g,{label:"Broker",value:t.brokerName}),e.jsx(g,{label:"Rate / 40 KG",value:t.rate40?`Rs ${o(t.rate40)}`:null,mono:!0}),e.jsx(g,{label:"Qty (Bags)",value:t.quantity,mono:!0}),e.jsx(g,{label:"Net Wt. (kg)",value:t.netWeight?o(t.netWeight):null,mono:!0}),e.jsx(g,{label:"Net Wt. (Maund)",value:t.netWeight40?r(t.netWeight40).toFixed(4):null,mono:!0}),e.jsx(g,{label:"Sutli Amt.",value:t.sutliSilaiAmount?`Rs ${o(t.sutliSilaiAmount)}`:null,mono:!0})]}),e.jsxs("div",{className:"vsi-card-footer",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"},children:[e.jsx(z,{label:"Amount",value:t.amount,color:"#374151"}),e.jsx("div",{style:{width:1,height:24,background:"#DADADA"}}),e.jsx(z,{label:"w/ Sutli",value:t.totalAmount,color:"#374151"}),r(t.bardanaAmount)>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:1,height:24,background:"#DADADA"}}),e.jsx(z,{label:"+ Bardana",value:t.bardanaAmount,color:"#7c3aed"})]}),r(t.brokery)>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:1,height:24,background:"#DADADA"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:2},children:"Brokery"}),e.jsxs("div",{style:{fontSize:13.5,fontWeight:700,color:"#ef4444",fontFamily:"'DM Mono',monospace"},children:["− Rs ",o(t.brokery)]})]})]})]}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("div",{style:{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"#A5A8A6",marginBottom:2},children:"Net Payable"}),e.jsxs("div",{style:{fontSize:20,fontWeight:700,color:"#929183",fontFamily:"'DM Mono',monospace",letterSpacing:"-.5px"},children:["Rs ",o(t.totalAmount2)]})]})]})]},t._id))}),!n&&p.length>0&&e.jsxs("p",{style:{textAlign:"center",color:"#A5A8A6",fontSize:12,marginTop:20,fontFamily:"'DM Mono',monospace"},children:[p.length," invoice",p.length!==1?"s":"",w?` · filtered from ${a.length} total`:""]})]})]})}export{ee as default};
