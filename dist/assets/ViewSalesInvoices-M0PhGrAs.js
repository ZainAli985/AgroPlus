import{a as J,A as E,j as e,S as K,N as H}from"./index-LhItWFyw.js";import{b as l}from"./react-CVH9iSHU.js";const n=a=>a==null?0:typeof a=="number"?a:typeof a=="string"&&Number(a.replace(/,/g,""))||0,i=a=>n(a).toLocaleString("en-PK",{maximumFractionDigits:0}),V="@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');",q=`
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
`;function G(a){const o=n(a.weight),r=n(a.quantity)*n(a.bagWeight),d=n(a.netWeight),v=n(a.quantity)*3,x=d-v,z=x/40,p=n(a.totalAmount),y=n(a.sutliSilaiAmount),c=n(a.totalAmount2)||p+y+n(a.brokery);return`<!DOCTYPE html><html><head><title>Sales Invoice ${a.builtyNo}</title>
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
    <table><tr><td><b>Invoice #</b></td><td>${a.builtyNo}</td></tr>
    <tr><td><b>Date</b></td><td>${a.date}</td></tr></table>
  </div>
</div>
<div class="info-grid">
  <div class="info-box"><h4>BILL TO</h4>
    <p><b>Name:</b> ${a.vendorName}</p><p><b>Company:</b> D.T Rice Mills</p>
    <p><b>City:</b> Hyderabad</p><p><b>Phone:</b> 0329-0999329</p></div>
  <div class="info-box"><h4>TRANSPORT DETAILS</h4>
    <p><b>Vehicle No:</b> ${a.vehicleNo}</p><p><b>Broker:</b> ${a.brokerName}</p>
    <p><b>Paddy Type:</b> ${a.paddyType}</p><p><b>Rate (40kg):</b> Rs ${i(a.rate40)}</p></div>
</div>
<table>
  <tr><th>Description</th><th>Details</th><th class="right">Weight (Kgs)</th></tr>
  <tr><td rowspan="3">Weight</td><td>Filled Weight</td><td class="right">${i(o)}</td></tr>
  <tr><td>Empty Weight</td><td class="right">${i(r)}</td></tr>
  <tr class="highlight"><td>Net Load Weight</td><td class="right">${i(d)}</td></tr>
  <tr><td rowspan="2">Bags</td><td>No. of Bags</td><td class="right">${i(a.quantity)}</td></tr>
  <tr><td>Bag Weight</td><td class="right">${i(a.bagWeight)}</td></tr>
  <tr><td>Deduction</td><td>3 Kg / Bag</td><td class="right">${i(v)}</td></tr>
</table>
<table class="totals">
  <tr><td>Net Weight (Kgs)</td><td class="right">${i(x)}</td></tr>
  <tr><td>Net Weight (Maund)</td><td class="right">${i(z)}</td></tr>
  <tr><td>Subtotal</td><td class="right">${i(p)}</td></tr>
  <tr><td>Bag Closing Cost</td><td class="right">${i(y)}</td></tr>
  <tr class="grand-total"><td>GRAND TOTAL</td><td class="right">Rs ${i(c)}</td></tr>
</table>
<div class="signature">
  <div><span>Authorized Signature</span></div><div><span>Stamp</span></div>
</div>
<p style="text-align:center;margin-top:30px;font-size:12px">Thank you for your business</p>
</div><script>window.print()<\/script></body></html>`}const O=()=>e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"})}),Y=()=>e.jsxs("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2,children:[e.jsx("circle",{cx:11,cy:11,r:8}),e.jsx("path",{strokeLinecap:"round",d:"M21 21l-4.35-4.35"})]});function k({label:a,value:o,prefix:r,accent:d}){return e.jsxs("div",{className:"vsi-stat",children:[e.jsx("p",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:10},children:a}),e.jsxs("p",{style:{fontSize:21,fontWeight:800,color:"#111827",lineHeight:1,fontFamily:"'JetBrains Mono',monospace",letterSpacing:"-.5px"},children:[r&&e.jsx("span",{style:{fontSize:14,color:d||"#9ca3af",marginRight:3},children:r}),o]})]})}function g({label:a,value:o,mono:r}){return e.jsxs("div",{className:"vsi-data-cell",children:[e.jsx("div",{className:"vsi-data-label",children:a}),e.jsx("div",{className:`vsi-data-value${r?" mono":""}`,children:o??e.jsx("span",{style:{color:"#d1d5db"},children:"—"})})]})}function C({label:a,value:o,color:r,large:d}){return e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:2},children:a}),e.jsx("div",{style:{fontSize:d?20:13.5,fontWeight:d?800:700,color:r||"#374151",fontFamily:"'JetBrains Mono',monospace",letterSpacing:d?"-.5px":"-.2px"},children:o?`Rs ${i(o)}`:"—"})]})}function _(){return e.jsxs("div",{className:"vsi-card",style:{animation:"none"},children:[e.jsxs("div",{className:"vsi-card-head",children:[e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[e.jsx("div",{className:"vsi-skeleton",style:{width:80,height:18}}),e.jsx("div",{className:"vsi-skeleton",style:{width:60,height:22,borderRadius:20}})]}),e.jsx("div",{className:"vsi-skeleton",style:{width:110,height:34,borderRadius:9}})]}),e.jsx("div",{className:"vsi-data-grid",children:Array.from({length:8}).map((a,o)=>e.jsxs("div",{className:"vsi-data-cell",children:[e.jsx("div",{className:"vsi-skeleton",style:{width:"50%",height:10,marginBottom:8}}),e.jsx("div",{className:"vsi-skeleton",style:{width:"80%",height:16}})]},o))}),e.jsxs("div",{className:"vsi-card-footer",children:[e.jsx("div",{style:{display:"flex",gap:16},children:[100,80,90].map((a,o)=>e.jsxs("div",{children:[e.jsx("div",{className:"vsi-skeleton",style:{width:60,height:9,marginBottom:5}}),e.jsx("div",{className:"vsi-skeleton",style:{width:a,height:15}})]},o))}),e.jsxs("div",{children:[e.jsx("div",{className:"vsi-skeleton",style:{width:60,height:10,marginBottom:5}}),e.jsx("div",{className:"vsi-skeleton",style:{width:120,height:22}})]})]})]})}function S({label:a,onRemove:o}){return e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:5,background:"#ecfdf5",border:"1px solid #a7f3d0",borderRadius:20,padding:"3px 9px 3px 10px",fontSize:12,fontWeight:600,color:"#065f46"},children:[a,e.jsx("button",{onClick:o,style:{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",alignItems:"center",color:"#6ee7b7",marginLeft:1},children:e.jsx("svg",{width:12,height:12,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",d:"M6 18L18 6M6 6l12 12"})})})]})}const N={display:"block",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:6},X=()=>{const[a,o]=l.useState([]),[r,d]=l.useState(!0),[W,v]=l.useState({message:"",type:"info"}),[x,z]=l.useState({total:0,phukar:0,polish:0,rice:0}),[p,y]=l.useState(""),[c,B]=l.useState(""),[f,T]=l.useState(""),[m,A]=l.useState(""),[h,R]=l.useState([]);l.useEffect(()=>{(async()=>{try{const s=await(await J(`${E}/sales-invoice`)).json();s.success?(o(s.invoices),R(s.invoices),$(s.invoices)):v({message:s.message||"Failed to fetch invoices",type:"error"})}catch{v({message:"Server error!",type:"error"})}finally{d(!1)}})()},[]),l.useEffect(()=>{let t=a;if(p){const s=p.toLowerCase();t=t.filter(j=>j.vendorName?.toLowerCase().includes(s)||j.vehicleNo?.toLowerCase().includes(s)||j.brokerName?.toLowerCase().includes(s)||String(j.sr)?.includes(s))}c&&(t=t.filter(s=>new Date(s.date)>=new Date(c))),f&&(t=t.filter(s=>new Date(s.date)<=new Date(f))),m&&(t=t.filter(s=>s.paddyType===m)),R(t),$(t)},[p,c,f,m,a]);const $=t=>{const s=t.length||1,j=t.reduce((u,b)=>u+n(b.totalAmount2),0),M=t.reduce((u,b)=>u+n(b.quantity),0),P=t.reduce((u,b)=>u+n(b.netWeight),0),F=t.reduce((u,b)=>u+n(b.amount),0);z({total:j,phukar:Math.round(M/s),polish:Math.round(P/s),rice:Math.round(F/s)})},I=t=>{const s=window.open("","_blank");s&&(s.document.write(G(t)),s.document.close())},D=()=>{y(""),B(""),T(""),A("")},w=p||c||f||m,L=[...new Set(a.map(t=>t.paddyType).filter(Boolean))];return e.jsxs(K,{children:[e.jsxs("style",{children:[V,q]}),e.jsx(H,{message:W.message,type:W.type,onClose:()=>v({message:"",type:"info"})}),e.jsxs("div",{className:"vsi-wrap",children:[e.jsxs("div",{style:{marginBottom:24,display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:10},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"#9ca3af",marginBottom:4},children:"Sales"}),e.jsx("h1",{style:{fontSize:26,fontWeight:800,color:"#111827",letterSpacing:"-.5px",lineHeight:1},children:"Sales Invoices"})]}),!r&&e.jsxs("div",{style:{background:"#f3f4f6",borderRadius:10,padding:"7px 14px",fontSize:13,fontWeight:600,color:"#6b7280",fontFamily:"'JetBrains Mono',monospace"},children:[h.length,h.length!==a.length&&e.jsxs("span",{style:{color:"#9ca3af",fontWeight:400},children:[" / ",a.length]}),e.jsxs("span",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",marginLeft:5,fontWeight:500},children:["invoice",h.length!==1?"s":""]})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20},children:[e.jsx(k,{label:"Total Revenue",value:i(x.total),prefix:"Rs",accent:"#10b981"}),e.jsx(k,{label:"Avg Bags / Invoice",value:i(x.phukar),accent:"#6366f1"}),e.jsx(k,{label:"Avg Net Wt. KG",value:i(x.polish),accent:"#0ea5e9"}),e.jsx(k,{label:"Avg Amount",value:i(x.rice),prefix:"Rs",accent:"#f59e0b"})]}),e.jsxs("div",{style:{background:"#fff",border:"1.5px solid #f3f4f6",borderRadius:14,padding:"14px 16px",marginBottom:20,boxShadow:"0 1px 3px rgba(0,0,0,.04)"},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr auto",gap:10,alignItems:"end"},children:[e.jsxs("div",{children:[e.jsx("label",{style:N,children:"Search"}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",display:"flex"},children:e.jsx(Y,{})}),e.jsx("input",{className:"vsi-input",value:p,onChange:t=>y(t.target.value),placeholder:"Invoice #, vendor, vehicle, broker…",style:{paddingLeft:34}})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:N,children:"From Date"}),e.jsx("input",{type:"date",className:"vsi-input",value:c,onChange:t=>B(t.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{style:N,children:"To Date"}),e.jsx("input",{type:"date",className:"vsi-input",value:f,onChange:t=>T(t.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{style:N,children:"Paddy Type"}),e.jsx("div",{className:"vsi-select-wrap",children:e.jsxs("select",{className:"vsi-select",value:m,onChange:t=>A(t.target.value),children:[e.jsx("option",{value:"",children:"All types"}),L.map(t=>e.jsx("option",{value:t,children:t},t))]})})]}),e.jsx("div",{children:e.jsx("button",{className:"vsi-clear-btn",onClick:D,style:{opacity:w?1:.35,pointerEvents:w?"auto":"none"},children:"Clear"})})]}),w&&e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginTop:10},children:[p&&e.jsx(S,{label:`"${p}"`,onRemove:()=>y("")}),c&&e.jsx(S,{label:`From ${c}`,onRemove:()=>B("")}),f&&e.jsx(S,{label:`To ${f}`,onRemove:()=>T("")}),m&&e.jsx(S,{label:m,onRemove:()=>A("")})]})]}),r?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:14},children:Array.from({length:3}).map((t,s)=>e.jsx(_,{},s))}):h.length===0?e.jsxs("div",{className:"vsi-empty",children:[e.jsx("svg",{width:48,height:48,fill:"none",viewBox:"0 0 24 24",stroke:"#e5e7eb",strokeWidth:1.2,style:{margin:"0 auto 14px",display:"block"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),e.jsx("p",{style:{fontSize:15,fontWeight:700,color:"#6b7280",marginBottom:4},children:"No invoices found"}),e.jsx("p",{style:{fontSize:13,color:"#9ca3af"},children:"Try adjusting your search or filters"})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:14},children:h.map((t,s)=>e.jsxs("div",{className:"vsi-card",style:{animationDelay:`${s*.04}s`},children:[e.jsxs("div",{className:"vsi-card-head",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:5},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".07em"},children:"Invoice"}),e.jsxs("span",{style:{fontSize:17,fontWeight:800,color:"#111827",fontFamily:"'JetBrains Mono',monospace",letterSpacing:"-.3px"},children:["#",t.sr]})]}),e.jsx("div",{style:{width:1,height:16,background:"#e5e7eb"}}),e.jsx("span",{style:{fontSize:13,color:"#6b7280",fontWeight:500},children:t.date}),t.paddyType&&e.jsx("span",{className:"vsi-paddy",children:t.paddyType}),t.builtyNo&&e.jsxs("span",{style:{fontSize:11.5,color:"#6b7280",fontWeight:600,background:"#f3f4f6",padding:"2px 8px",borderRadius:6,fontFamily:"'JetBrains Mono',monospace"},children:["Builty #",t.builtyNo]})]}),e.jsxs("button",{className:"vsi-print-btn",onClick:()=>I(t),children:[e.jsx(O,{}),"Print Invoice"]})]}),e.jsxs("div",{className:"vsi-data-grid",children:[e.jsx(g,{label:"Vendor",value:t.vendorName}),e.jsx(g,{label:"Vehicle No.",value:t.vehicleNo,mono:!0}),e.jsx(g,{label:"Broker",value:t.brokerName}),e.jsx(g,{label:"Rate / 40 KG",value:t.rate40?`Rs ${i(t.rate40)}`:null,mono:!0}),e.jsx(g,{label:"Quantity (Bags)",value:t.quantity,mono:!0}),e.jsx(g,{label:"Net Wt. (KG)",value:t.netWeight,mono:!0}),e.jsx(g,{label:"Net Wt. (40 KG)",value:t.netWeight40,mono:!0}),e.jsx(g,{label:"Sutli / Silai",value:t.sutliSilaiAmount?`Rs ${i(t.sutliSilaiAmount)}`:null,mono:!0})]}),e.jsxs("div",{className:"vsi-card-footer",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"},children:[e.jsx(C,{label:"Subtotal",value:t.totalAmount,color:"#374151"}),e.jsx("div",{style:{width:1,height:24,background:"#e5e7eb"}}),e.jsx(C,{label:"Bag Closing",value:t.sutliSilaiAmount,color:"#6b7280"}),t.brokery&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:1,height:24,background:"#e5e7eb"}}),e.jsx(C,{label:"Brokery",value:t.brokery,color:"#6b7280"})]})]}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:2},children:"Grand Total"}),e.jsxs("div",{style:{fontSize:20,fontWeight:800,color:"#111827",fontFamily:"'JetBrains Mono',monospace",letterSpacing:"-.5px"},children:["Rs ",i(t.totalAmount2)]})]})]})]},t._id))}),!r&&h.length>0&&e.jsxs("p",{style:{textAlign:"center",color:"#9ca3af",fontSize:12.5,marginTop:20,fontFamily:"'JetBrains Mono',monospace"},children:[h.length," invoice",h.length!==1?"s":"",w?` · filtered from ${a.length} total`:""]})]})]})};export{X as default};
