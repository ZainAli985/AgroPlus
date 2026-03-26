import{a as E,A as V,j as e,S as H,N as P}from"./index-BNtrSwKZ.js";import{b as d}from"./react-BBT0yyZ1.js";const G="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",Y=`
  *, *::before, *::after { box-sizing: border-box; }
  .vpi { font-family: 'DM Sans', sans-serif; color: #111827; }
  .vpi-mono { font-family: 'DM Mono', monospace; }

  /* inputs */
  .vpi-inp, .vpi-sel {
    width: 100%; padding: 7px 10px;
    border: 1px solid #d1d5db; border-radius: 6px;
    font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s;
    appearance: none;
  }
  .vpi-inp::placeholder { color: #9ca3af; }
  .vpi-inp:focus, .vpi-sel:focus {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }

  /* stat cards */
  .vpi-stat {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; padding: 14px 16px;
    position: relative; overflow: hidden;
  }
  .vpi-stat::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 3px;
  }
  .vpi-stat.s1::before { background: #1f2937; }
  .vpi-stat.s2::before { background: #374151; }
  .vpi-stat.s3::before { background: #6b7280; }
  .vpi-stat.s4::before { background: #15803d; }

  /* invoice cards */
  .vpi-card {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; overflow: hidden;
    transition: box-shadow .12s;
    animation: vpi-in .16s ease both;
  }
  .vpi-card:hover { box-shadow: 0 2px 10px rgba(0,0,0,.07); }
  @keyframes vpi-in { from { opacity:0; transform:translateY(3px); } to { opacity:1; transform:translateY(0); } }

  .vpi-card-head {
    display: flex; align-items: center;
    justify-content: space-between; padding: 12px 16px;
    border-bottom: 1px solid #f3f4f6;
    gap: 10px; flex-wrap: wrap; background: #fff;
  }

  .vpi-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
  }
  .vpi-cell {
    padding: 11px 14px;
    border-right: 1px solid #f3f4f6;
    border-bottom: 1px solid #f3f4f6;
  }
  .vpi-cell:nth-child(4n) { border-right: none; }
  .vpi-cell:nth-last-child(-n+4) { border-bottom: none; }
  .vpi-clbl {
    font-size: 9.5px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: #9ca3af; margin-bottom: 4px;
    font-family: 'DM Sans', sans-serif;
  }
  .vpi-cval {
    font-size: 13px; font-weight: 600; color: #111827;
  }
  .vpi-cval.mono {
    font-family: 'DM Mono', monospace; font-size: 12.5px; font-weight: 500; color: #374151;
  }
  .vpi-cval.hi {
    color: #15803d; font-weight: 700;
  }

  .vpi-foot {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 16px; background: #f9fafb;
    border-top: 1px solid #f3f4f6;
    gap: 10px; flex-wrap: wrap;
  }

  /* product badge */
  .vpi-badge {
    display: inline-flex; align-items: center;
    padding: 2px 9px; border-radius: 4px;
    font-size: 11.5px; font-weight: 600;
    background: #f3f4f6; color: #374151;
    border: 1px solid #e5e7eb;
    font-family: 'DM Mono', monospace;
    white-space: nowrap;
  }

  /* print button */
  .vpi-print {
    display: inline-flex; align-items: center; gap: 6px;
    background: #111827; color: #fff; border: none;
    border-radius: 6px; padding: 6px 13px;
    font-size: 12px; font-weight: 500;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    transition: background .1s; white-space: nowrap;
  }
  .vpi-print:hover { background: #1f2937; }

  /* filter pill */
  .vpi-fpill {
    display: inline-flex; align-items: center; gap: 5px;
    background: #f3f4f6; border: 1px solid #e5e7eb;
    border-radius: 5px; padding: "2px 8px 2px 9px";
    font-size: 12px; font-weight: 500; color: #374151;
  }

  /* skeleton */
  @keyframes vpi-shimmer { to { background-position: -200% 0; } }
  .vpi-skel {
    border-radius: 5px; height: 11px;
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    background-size: 200% 100%; animation: vpi-shimmer 1.4s infinite;
  }

  .vpi-sel-wrap { position: relative; }
  .vpi-sel-wrap::after {
    content: ''; position: absolute; right: 10px; top: 50%;
    transform: translateY(-50%); pointer-events: none;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #9ca3af;
  }

  @media (max-width: 900px) {
    .vpi-stats { grid-template-columns: repeat(2, 1fr) !important; }
    .vpi-filters { grid-template-columns: 1fr 1fr !important; }
    .vpi-grid { grid-template-columns: repeat(2, 1fr); }
    .vpi-cell:nth-child(4n)  { border-right: 1px solid #f3f4f6; }
    .vpi-cell:nth-child(2n)  { border-right: none; }
    .vpi-cell:nth-last-child(-n+4) { border-bottom: 1px solid #f3f4f6; }
    .vpi-cell:nth-last-child(-n+2) { border-bottom: none; }
  }
`,n=s=>isNaN(Number(s))?0:Number(s)||0,f=(s,a=0)=>n(s).toLocaleString("en-PK",{minimumFractionDigits:a,maximumFractionDigits:a}),i=s=>f(s,2);function v(s){if(s.productName&&s.productName.includes(" - "))return s.productName;const a=s.productId;return a&&typeof a=="object"?[a.productName||s.productName,a.type,a.subType].filter(Boolean).join(" - "):s.productName||"—"}function _(s){const g=(Array.isArray(s.rateRows)&&s.rateRows.length?s.rateRows:[{maund:n(s.netWeightMaund||s.netWeight40KG),rate:n(s.rate40kg),amount:n(s.totalAmount||s.amount)}]).filter(r=>r.maund||r.rate).map(r=>`<tr><td>${i(r.maund)} Maund × Rs ${i(r.rate)}</td><td style="text-align:right;font-weight:700">Rs ${i(r.amount)}</td></tr>`).join("");return`<!DOCTYPE html><html><head><title>Purchase Invoice #${s.sr||s.builtyNumber}</title>
<style>@page{size:A4;margin:12mm}body{font-family:"Segoe UI",Arial,sans-serif;background:#fff;color:#111}.wrap{max-width:660px;margin:auto}.head{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #1e3a8a;padding-bottom:10px;margin-bottom:16px}.logo{display:flex;align-items:center;gap:10px}.logo img{height:55px}.logo h1{font-size:20px;margin:0;color:#1e3a8a}.logo p{font-size:10px;margin:2px 0}.meta{text-align:right}.meta h2{margin:0;font-size:18px;color:#1e40af}.meta table{font-size:11px;margin-top:6px}.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}.box{border:1px solid #e5e7eb;padding:8px;border-radius:6px}.box h4{margin:0 0 6px;font-size:12px;color:#1e3a8a;border-bottom:1px solid #e5e7eb;padding-bottom:3px}.box p{font-size:11px;margin:3px 0}table{width:100%;border-collapse:collapse;font-size:11px;margin-top:10px}th{background:#1e3a8a;color:#fff;padding:5px 6px;text-align:left}td{border:1px solid #d1d5db;padding:5px 6px}tr.sub td{font-weight:700;background:#f8fafc}tr.grand td{font-weight:800;font-size:13px;color:#1e3a8a}.sig{margin-top:36px;display:flex;justify-content:space-between;font-size:11px}.sig div{width:45%;text-align:center}.sig span{display:block;margin-top:36px;border-top:1px solid #000;padding-top:4px}</style></head><body>
<div class="wrap"><div class="head"><div class="logo"><img src="/logo.png" onerror="this.style.display='none'"/><div><h1>Al Rehman Rice Mills</h1><p>Deepalpur Road, Babarkhai, Arzanipur</p><p>Chunian, Kasur – Pakistan</p><p><b>0301-4349041</b> | <b>0300-8402130</b></p></div></div><div class="meta"><h2>PURCHASE INVOICE</h2><table><tr><td><b>Invoice #</b></td><td>${String(s.sr||"").padStart(4,"0")}</td></tr><tr><td><b>Date</b></td><td>${s.date||""}</td></tr><tr><td><b>Builty #</b></td><td>${s.builtyNumber||"—"}</td></tr></table></div></div>
<div class="info-grid"><div class="box"><h4>SUPPLIER</h4><p><b>Name:</b> ${s.vendorName||"—"}</p><p><b>Vehicle:</b> ${s.vehicleNumber||"—"}</p><p><b>Bag Status:</b> ${s.bagStatus==="return"?"Bag Return":"Bag Added"}</p></div><div class="box"><h4>PRODUCT</h4><p><b>Product:</b> ${v(s)}</p><p><b>Bag Type:</b> ${s.bagTypeName||"—"} (${i(s.bagWeightPerBag)} kg/bag)</p><p><b>Moisture:</b> ${s.moisturePercent||0}% (Base: ${s.baseMoisture||0}%)</p></div></div>
<table><tr><th>Description</th><th style="text-align:right">Value</th></tr><tr><td>Quantity (Bags)</td><td style="text-align:right">${f(s.quantity)}</td></tr><tr><td>Gross Weight (kg)</td><td style="text-align:right">${i(s.grossWeight)}</td></tr><tr><td>Total Bag Weight</td><td style="text-align:right">− ${i(s.totalBagWeight)}</td></tr><tr><td>Moisture Adjustment</td><td style="text-align:right">− ${i(s.moistureAdjustment)}</td></tr><tr class="sub"><td>Net Weight (kg)</td><td style="text-align:right">${i(s.netWeightKg||s.netWeight)}</td></tr><tr class="sub"><td>Net Weight (Maund)</td><td style="text-align:right">${f(s.netWeightMaund||s.netWeight40KG,4)}</td></tr></table>
<table style="margin-top:12px"><tr><th>Rate Breakdown</th><th style="text-align:right">Amount</th></tr>${g}<tr class="sub"><td>Total Amount</td><td style="text-align:right">Rs ${i(s.totalAmount||s.amount)}</td></tr>${n(s.rentAdjustment)>0?`<tr><td>Rent Adjustment</td><td style="text-align:right">− Rs ${i(s.rentAdjustment)}</td></tr>`:""}<tr class="grand"><td>NET PAYABLE</td><td style="text-align:right">Rs ${i(s.finalAmount||s.totalAmount||s.amount)}</td></tr></table>
<div class="sig"><div><span>Supplier Signature</span></div><div><span>Authorised Signatory</span></div></div>
<p style="text-align:center;margin-top:28px;font-size:12px">Thank you for your business — Al Rehman Rice Mills</p>
</div><script>window.print()<\/script></body></html>`}function M({cls:s,label:a,value:g,prefix:r}){return e.jsxs("div",{className:`vpi-stat ${s}`,children:[e.jsx("p",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",margin:"0 0 5px"},children:a}),e.jsxs("p",{style:{fontSize:20,fontWeight:700,color:"#111827",lineHeight:1,margin:0,fontFamily:"'DM Mono',monospace"},children:[r&&e.jsx("span",{style:{fontSize:13,color:"#6b7280",marginRight:3},children:r}),g]})]})}function U(){return e.jsxs("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"12px 16px",borderBottom:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between",gap:10},children:[e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsx("div",{className:"vpi-skel",style:{width:90,height:18}}),e.jsx("div",{className:"vpi-skel",style:{width:70,height:18}})]}),e.jsx("div",{className:"vpi-skel",style:{width:100,height:30,borderRadius:6}})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)"},children:[...Array(8)].map((s,a)=>e.jsxs("div",{style:{padding:"11px 14px",borderRight:a%4!==3?"1px solid #f3f4f6":"none",borderBottom:a<4?"1px solid #f3f4f6":"none"},children:[e.jsx("div",{className:"vpi-skel",style:{width:"50%",height:9,marginBottom:7}}),e.jsx("div",{className:"vpi-skel",style:{width:"80%",height:14}})]},a))}),e.jsxs("div",{style:{padding:"10px 16px",background:"#f9fafb",borderTop:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between"},children:[e.jsx("div",{className:"vpi-skel",style:{width:120,height:12}}),e.jsx("div",{className:"vpi-skel",style:{width:100,height:20}})]})]})}const W={display:"block",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#6b7280",marginBottom:5};function Q(){const[s,a]=d.useState([]),[g,r]=d.useState(!0),[j,w]=d.useState({message:"",type:"info"}),[m,z]=d.useState(""),[u,A]=d.useState(""),[b,D]=d.useState(""),[y,$]=d.useState(""),[h,T]=d.useState([]),[k,F]=d.useState({grossKg:"0",netKg:"0",netMaund:"0",totalAmt:"0"});d.useEffect(()=>{(async()=>{try{const o=await(await E(`${V}/purchase-invoice`)).json();o.success?(a(o.invoices),T(o.invoices),C(o.invoices)):w({message:o.message||"Failed to fetch",type:"error"})}catch{w({message:"Server error!",type:"error"})}finally{r(!1)}})()},[]),d.useEffect(()=>{let t=s;if(m){const o=m.toLowerCase();t=t.filter(p=>p.vendorName?.toLowerCase().includes(o)||p.vehicleNumber?.toLowerCase().includes(o)||v(p)?.toLowerCase().includes(o)||String(p.sr).includes(o)||String(p.builtyNumber||"").includes(o))}u&&(t=t.filter(o=>new Date(o.date)>=new Date(u))),b&&(t=t.filter(o=>new Date(o.date)<=new Date(b))),y&&(t=t.filter(o=>v(o)===y)),T(t),C(t)},[m,u,b,y,s]);const C=t=>{const o=t.reduce((c,l)=>c+n(l.grossWeight||l.finalWeight||0),0),p=t.reduce((c,l)=>c+n(l.netWeightKg||l.netWeight||0),0),N=t.reduce((c,l)=>c+n(l.netWeightMaund||l.netWeight40KG||0),0),B=t.reduce((c,l)=>c+n(l.finalAmount||l.totalAmount||l.amount||0),0);F({grossKg:f(o),netKg:f(p),netMaund:f(N,3),totalAmt:f(B)})},I=t=>{const o=window.open("","_blank");o&&(o.document.write(_(t)),o.document.close())},L=()=>{z(""),A(""),D(""),$("")},S=m||u||b||y,K=[...new Set(s.map(t=>v(t)).filter(Boolean))];return e.jsxs(H,{children:[e.jsxs("style",{children:[G,Y]}),e.jsx(P,{message:j.message,type:j.type,onClose:()=>w({message:"",type:"info"})}),e.jsxs("div",{className:"vpi",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:18},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"Procurement"}),e.jsx("h1",{style:{margin:0,fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px"},children:"Purchase Invoices"})]}),!g&&e.jsxs("span",{style:{fontSize:12,color:"#9ca3af",fontFamily:"'DM Mono',monospace"},children:[h.length,h.length!==s.length&&e.jsxs("span",{children:[" / ",s.length]}),e.jsxs("span",{style:{fontFamily:"'DM Sans',sans-serif",marginLeft:4},children:["invoice",h.length!==1?"s":""]})]})]}),e.jsxs("div",{className:"vpi-stats",style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:10,marginBottom:16},children:[e.jsx(M,{cls:"s1",label:"Total Gross (kg)",value:k.grossKg}),e.jsx(M,{cls:"s2",label:"Total Net (kg)",value:k.netKg}),e.jsx(M,{cls:"s3",label:"Total Maund",value:k.netMaund}),e.jsx(M,{cls:"s4",label:"Total Amount",value:k.totalAmt,prefix:"Rs"})]}),e.jsxs("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:"12px 14px",marginBottom:14},children:[e.jsxs("div",{className:"vpi-filters",style:{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr auto",gap:10,alignItems:"end"},children:[e.jsxs("div",{children:[e.jsx("label",{style:W,children:"Search"}),e.jsxs("div",{style:{position:"relative"},children:[e.jsxs("svg",{style:{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"},width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2,children:[e.jsx("path",{strokeLinecap:"round",d:"M21 21l-4.35-4.35"}),e.jsx("circle",{cx:11,cy:11,r:8})]}),e.jsx("input",{className:"vpi-inp",value:m,onChange:t=>z(t.target.value),placeholder:"Invoice #, vendor, vehicle, product…",style:{paddingLeft:30}})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:W,children:"From Date"}),e.jsx("input",{type:"date",className:"vpi-inp",value:u,onChange:t=>A(t.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{style:W,children:"To Date"}),e.jsx("input",{type:"date",className:"vpi-inp",value:b,onChange:t=>D(t.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{style:W,children:"Product"}),e.jsx("div",{className:"vpi-sel-wrap",children:e.jsxs("select",{className:"vpi-sel",value:y,onChange:t=>$(t.target.value),children:[e.jsx("option",{value:"",children:"All products"}),K.map(t=>e.jsx("option",{value:t,children:t},t))]})})]}),e.jsx("div",{style:{paddingTop:20},children:e.jsx("button",{onClick:L,style:{padding:"7px 12px",borderRadius:6,fontSize:12.5,fontWeight:500,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",cursor:S?"pointer":"default",opacity:S?1:.35,fontFamily:"'DM Sans',sans-serif"},children:"Clear"})})]}),S&&e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginTop:10},children:[m&&e.jsx(R,{label:`"${m}"`,onRemove:()=>z("")}),u&&e.jsx(R,{label:`From ${u}`,onRemove:()=>A("")}),b&&e.jsx(R,{label:`To ${b}`,onRemove:()=>D("")}),y&&e.jsx(R,{label:y,onRemove:()=>$("")})]})]}),g?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(3)].map((t,o)=>e.jsx(U,{},o))}):h.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"56px 0",background:"#fff",border:"1px solid #e5e7eb",borderRadius:8},children:[e.jsx("svg",{width:40,height:40,fill:"none",viewBox:"0 0 24 24",stroke:"#d1d5db",strokeWidth:1.2,style:{display:"block",margin:"0 auto 12px"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),e.jsx("p",{style:{fontSize:13,fontWeight:600,color:"#374151",margin:"0 0 4px"},children:"No invoices found"}),e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"Try adjusting your search or filters"})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:h.map((t,o)=>{const p=n(t.netWeightKg||t.netWeight||0),N=n(t.netWeightMaund||t.netWeight40KG||0),B=n(t.finalAmount||t.totalAmount||t.amount||0),c=Array.isArray(t.rateRows)&&t.rateRows.length>1?`${t.rateRows.length} rate rows`:t.rateRows?.[0]?.rate?`Rs ${f(t.rateRows[0].rate)}/40kg`:t.rate40kg?`Rs ${f(t.rate40kg)}/40kg`:null;return e.jsxs("div",{className:"vpi-card",style:{animationDelay:`${o*.04}s`},children:[e.jsxs("div",{className:"vpi-card-head",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:5},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".07em"},children:"Invoice"}),e.jsxs("span",{style:{fontSize:16,fontWeight:700,color:"#111827",fontFamily:"'DM Mono',monospace"},children:["#",String(t.sr||"").padStart(4,"0")]})]}),e.jsx("div",{style:{width:1,height:14,background:"#e5e7eb"}}),e.jsx("span",{style:{fontSize:12.5,color:"#6b7280"},children:t.date}),(t.productName||t.productId)&&e.jsx("span",{className:"vpi-badge",children:v(t)}),t.bagStatus==="return"&&e.jsx("span",{style:{fontSize:11,color:"#6b7280",fontWeight:500,background:"#f3f4f6",padding:"2px 7px",borderRadius:4,border:"1px solid #e5e7eb"},children:"Bag Return"}),t.builtyNumber&&e.jsxs("span",{style:{fontSize:11.5,color:"#6b7280",background:"#f3f4f6",padding:"2px 8px",borderRadius:4,fontFamily:"'DM Mono',monospace"},children:["Builty #",t.builtyNumber]})]}),e.jsxs("button",{className:"vpi-print",onClick:()=>I(t),children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"})}),"Print"]})]}),e.jsxs("div",{className:"vpi-grid",children:[e.jsx(x,{label:"Vendor",value:t.vendorName}),e.jsx(x,{label:"Vehicle No.",value:t.vehicleNumber,mono:!0}),e.jsx(x,{label:"Gross Weight (kg)",value:t.grossWeight||t.finalWeight?i(t.grossWeight||t.finalWeight):null,mono:!0}),e.jsx(x,{label:"Qty (Bags)",value:t.quantity,mono:!0}),e.jsx(x,{label:"Bag Type",value:t.bagTypeName||(t.bagWeightPerBag?`${t.bagWeightPerBag} kg/bag`:null)}),e.jsx(x,{label:"Moisture %",value:t.moisturePercent?`${t.moisturePercent}%`:null,mono:!0}),e.jsx(x,{label:"Net Weight (kg)",value:p?i(p):null,mono:!0,hi:!0}),e.jsx(x,{label:"Net Weight (Maund)",value:N?N.toFixed(4):null,mono:!0})]}),e.jsxs("div",{className:"vpi-foot",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"},children:[c&&e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:1},children:"Rate"}),e.jsx("div",{style:{fontSize:13,fontWeight:600,color:"#374151",fontFamily:"'DM Mono',monospace"},children:c})]}),n(t.rentAdjustment)>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:1,height:22,background:"#e5e7eb"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:1},children:"Rent Adj."}),e.jsxs("div",{style:{fontSize:13,fontWeight:600,color:"#dc2626",fontFamily:"'DM Mono',monospace"},children:["− Rs ",i(t.rentAdjustment)]})]})]})]}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:2},children:"Net Payable"}),e.jsxs("div",{style:{fontSize:18,fontWeight:700,color:"#111827",fontFamily:"'DM Mono',monospace"},children:["Rs ",i(B)]})]})]})]},t._id)})}),!g&&h.length>0&&e.jsxs("p",{style:{textAlign:"center",color:"#9ca3af",fontSize:12,marginTop:16,fontFamily:"'DM Mono',monospace"},children:[h.length," invoice",h.length!==1?"s":"",S?` · filtered from ${s.length} total`:""]})]}),e.jsx(P,{message:j.message,type:j.type,onClose:()=>w({message:"",type:"info"})})]})}function x({label:s,value:a,mono:g,hi:r}){return e.jsxs("div",{className:"vpi-cell",children:[e.jsx("div",{className:"vpi-clbl",children:s}),e.jsx("div",{className:`vpi-cval${g?" mono":""}${r?" hi":""}`,children:a!=null&&a!==""?a:e.jsx("span",{style:{color:"#d1d5db"},children:"—"})})]})}function R({label:s,onRemove:a}){return e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:5,background:"#f3f4f6",border:"1px solid #e5e7eb",borderRadius:5,padding:"2px 8px 2px 9px",fontSize:12,fontWeight:500,color:"#374151"},children:[s,e.jsx("button",{onClick:a,style:{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",color:"#9ca3af"},children:e.jsx("svg",{width:12,height:12,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",d:"M6 18L18 6M6 6l12 12"})})})]})}export{Q as default};
