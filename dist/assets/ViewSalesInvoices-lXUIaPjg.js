import{a as q,A as H,j as e,S as K,N as Y}from"./index-X7I1Q5Te.js";import{b as l}from"./react-BBT0yyZ1.js";const _="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",O=`
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
`,r=s=>isNaN(Number(s))?0:Number(s)||0,p=(s,a=0)=>r(s).toLocaleString("en-PK",{minimumFractionDigits:a,maximumFractionDigits:a}),o=s=>p(s,2);function y(s){const a=s.paddyType||s.productName;if(a&&a.includes(" - "))return a;const n=s.productId;return n&&typeof n=="object"?[n.productName||a,n.type,n.subType].filter(Boolean).join(" - "):a||"—"}function U(s){const a=String(s.sr||"").padStart(4,"0");return`<!DOCTYPE html><html><head><title>Sales Invoice #${a}</title>
<style>@page{size:A4;margin:12mm}body{font-family:"Segoe UI",Arial,sans-serif;background:#fff;color:#111}.wrap{max-width:660px;margin:auto}.head{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #1e3a8a;padding-bottom:10px;margin-bottom:16px}.logo{display:flex;align-items:center;gap:10px}.logo img{height:55px}.logo h1{font-size:20px;margin:0;color:#1e3a8a}.logo p{font-size:10px;margin:2px 0}.meta{text-align:right}.meta h2{margin:0;font-size:18px;color:#1e40af}.meta table{font-size:11px;margin-top:6px}.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}.box{border:1px solid #e5e7eb;padding:8px;border-radius:6px}.box h4{margin:0 0 6px;font-size:12px;color:#1e3a8a;border-bottom:1px solid #e5e7eb;padding-bottom:3px}.box p{font-size:11px;margin:3px 0}table{width:100%;border-collapse:collapse;font-size:11px;margin-top:10px}th{background:#1e3a8a;color:#fff;padding:5px 6px;text-align:left}td{border:1px solid #d1d5db;padding:5px 6px}tr.sub td{font-weight:700;background:#f8fafc}tr.grand td{font-weight:800;font-size:13px;color:#1e3a8a}.sig{margin-top:36px;display:flex;justify-content:space-between;font-size:11px}.sig div{width:45%;text-align:center}.sig span{display:block;margin-top:36px;border-top:1px solid #000;padding-top:4px}</style></head><body>
<div class="wrap"><div class="head"><div class="logo"><img src="/logo.png" onerror="this.style.display='none'"/><div><h1>Al Rehman Rice Mills</h1><p>Deepalpur Road, Babarkhai, Arzanipur</p><p>Chunian, Kasur – Pakistan</p><p><b>0301-4349041</b> | <b>0300-8402130</b></p></div></div><div class="meta"><h2>SALES INVOICE</h2><table><tr><td><b>Invoice #</b></td><td>${a}</td></tr><tr><td><b>Date</b></td><td>${s.date||""}</td></tr><tr><td><b>Builty #</b></td><td>${s.builtyNo||"—"}</td></tr></table></div></div>
<div class="info-grid"><div class="box"><h4>CUSTOMER</h4><p><b>Name:</b> ${s.vendorName||"—"}</p><p><b>Vehicle:</b> ${s.vehicleNo||"—"}</p><p><b>Broker:</b> ${s.brokerName||"—"}</p></div><div class="box"><h4>PRODUCT</h4><p><b>Product:</b> ${y(s)}</p><p><b>Rate / 40kg:</b> Rs ${o(s.rate40)}</p><p><b>Quantity:</b> ${p(s.quantity)} bags</p></div></div>
<table><tr><th>Description</th><th style="text-align:right">Value</th></tr><tr><td>Total Weight (kg)</td><td style="text-align:right">${o(s.weight)}</td></tr><tr><td>Bag Deduction</td><td style="text-align:right">− ${o(r(s.quantity)*r(s.bagWeight))}</td></tr><tr class="sub"><td>Net Weight (kg)</td><td style="text-align:right">${o(s.netWeight)}</td></tr><tr class="sub"><td>Net Weight (Maund)</td><td style="text-align:right">${r(s.netWeight40).toFixed(4)}</td></tr><tr><td>Amount (${r(s.netWeight40).toFixed(4)} Maund × Rs ${o(s.rate40)})</td><td style="text-align:right">Rs ${o(s.amount)}</td></tr><tr><td>Sutli / Silai (Rs ${o(s.sutliSilaiRate)} × ${p(s.quantity)} bags)</td><td style="text-align:right">Rs ${o(s.sutliSilaiAmount)}</td></tr>${r(s.bardanaRate)>0?`<tr><td>Bardana (Rs ${o(s.bardanaRate)} × ${p(s.quantity)} bags)</td><td style="text-align:right">Rs ${o(s.bardanaAmount)}</td></tr>`:""}<tr class="sub"><td>Total (w/ Sutli${r(s.bardanaRate)>0?" + Bardana":""})</td><td style="text-align:right">Rs ${o(s.totalWithBardana||s.totalAmount)}</td></tr>${r(s.brokeryRate)>0?`<tr><td>Brokery (${r(s.netWeight40).toFixed(4)} Maund × Rs ${o(s.brokeryRate)})</td><td style="text-align:right">− Rs ${o(s.brokery)}</td></tr>`:""}<tr class="grand"><td>NET PAYABLE</td><td style="text-align:right">Rs ${o(s.totalAmount2)}</td></tr></table>
<div class="sig"><div><span>Customer Signature</span></div><div><span>Authorised Signatory</span></div></div>
<p style="text-align:center;margin-top:28px;font-size:12px">Thank you for your business — Al Rehman Rice Mills</p>
</div><script>window.print()<\/script></body></html>`}function S({cls:s,label:a,value:n,prefix:v}){return e.jsxs("div",{className:`vsi-stat ${s}`,children:[e.jsx("p",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",margin:"0 0 5px"},children:a}),e.jsxs("p",{style:{fontSize:20,fontWeight:700,color:"#111827",lineHeight:1,margin:0,fontFamily:"'DM Mono',monospace"},children:[v&&e.jsx("span",{style:{fontSize:13,color:"#6b7280",marginRight:3},children:v}),n]})]})}function c({label:s,value:a,mono:n}){return e.jsxs("div",{className:"vsi-cell",children:[e.jsx("div",{className:"vsi-clbl",children:s}),e.jsx("div",{className:`vsi-cval${n?" mono":""}`,children:a!=null&&a!==""?a:e.jsx("span",{style:{color:"#d1d5db"},children:"—"})})]})}function W({label:s,value:a,color:n}){return e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:1},children:s}),e.jsx("div",{style:{fontSize:13,fontWeight:600,color:n||"#374151",fontFamily:"'DM Mono',monospace"},children:r(a)>0?`Rs ${o(a)}`:"—"})]})}function k({label:s,onRemove:a}){return e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:5,background:"#f3f4f6",border:"1px solid #e5e7eb",borderRadius:5,padding:"2px 8px 2px 9px",fontSize:12,fontWeight:500,color:"#374151"},children:[s,e.jsx("button",{onClick:a,style:{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",color:"#9ca3af"},children:e.jsx("svg",{width:12,height:12,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",d:"M6 18L18 6M6 6l12 12"})})})]})}function Q(){return e.jsxs("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"12px 16px",borderBottom:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between",gap:10},children:[e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsx("div",{className:"vsi-skel",style:{width:90,height:18}}),e.jsx("div",{className:"vsi-skel",style:{width:70,height:18}})]}),e.jsx("div",{className:"vsi-skel",style:{width:100,height:30,borderRadius:6}})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)"},children:[...Array(8)].map((s,a)=>e.jsxs("div",{style:{padding:"11px 14px",borderRight:a%4!==3?"1px solid #f3f4f6":"none",borderBottom:a<4?"1px solid #f3f4f6":"none"},children:[e.jsx("div",{className:"vsi-skel",style:{width:"50%",height:9,marginBottom:7}}),e.jsx("div",{className:"vsi-skel",style:{width:"80%",height:14}})]},a))}),e.jsxs("div",{style:{padding:"10px 16px",background:"#f9fafb",borderTop:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between"},children:[e.jsx("div",{className:"vsi-skel",style:{width:120,height:12}}),e.jsx("div",{className:"vsi-skel",style:{width:100,height:20}})]})]})}const N={display:"block",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#6b7280",marginBottom:5};function X(){const[s,a]=l.useState([]),[n,v]=l.useState(!0),[B,R]=l.useState({message:"",type:"info"}),[g,M]=l.useState(""),[f,z]=l.useState(""),[x,$]=l.useState(""),[h,D]=l.useState(""),[d,A]=l.useState([]),[j,C]=l.useState({revenue:"0",netKg:"0",netMaund:"0",avgBags:"0"});l.useEffect(()=>{(async()=>{try{const i=await(await q(`${H}/sales-invoice`)).json();i.success?(a(i.invoices),A(i.invoices),T(i.invoices)):R({message:i.message||"Failed to fetch",type:"error"})}catch{R({message:"Server error!",type:"error"})}finally{v(!1)}})()},[]),l.useEffect(()=>{let t=s;if(g){const i=g.toLowerCase();t=t.filter(m=>m.vendorName?.toLowerCase().includes(i)||m.vehicleNo?.toLowerCase().includes(i)||m.brokerName?.toLowerCase().includes(i)||y(m)?.toLowerCase().includes(i)||String(m.sr).includes(i))}f&&(t=t.filter(i=>new Date(i.date)>=new Date(f))),x&&(t=t.filter(i=>new Date(i.date)<=new Date(x))),h&&(t=t.filter(i=>y(i)===h)),A(t),T(t)},[g,f,x,h,s]);const T=t=>{const i=t.length||1,m=t.reduce((u,b)=>u+r(b.totalAmount2||0),0),P=t.reduce((u,b)=>u+r(b.netWeight||0),0),E=t.reduce((u,b)=>u+r(b.netWeight40||0),0),V=t.reduce((u,b)=>u+r(b.quantity||0),0);C({revenue:p(m),netKg:p(P),netMaund:p(E,3),avgBags:p(V/i)})},F=t=>{const i=window.open("","_blank");i&&(i.document.write(U(t)),i.document.close())},I=()=>{M(""),z(""),$(""),D("")},w=g||f||x||h,L=[...new Set(s.map(t=>y(t)).filter(Boolean))];return e.jsxs(K,{children:[e.jsxs("style",{children:[_,O]}),e.jsx(Y,{message:B.message,type:B.type,onClose:()=>R({message:"",type:"info"})}),e.jsxs("div",{className:"vsi",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:18},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"Sales"}),e.jsx("h1",{style:{margin:0,fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px"},children:"Sales Invoices"})]}),!n&&e.jsxs("span",{style:{fontSize:12,color:"#9ca3af",fontFamily:"'DM Mono',monospace"},children:[d.length,d.length!==s.length&&e.jsxs("span",{children:[" / ",s.length]}),e.jsxs("span",{style:{fontFamily:"'DM Sans',sans-serif",marginLeft:4},children:["invoice",d.length!==1?"s":""]})]})]}),e.jsxs("div",{className:"vsi-stats",style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:10,marginBottom:16},children:[e.jsx(S,{cls:"s1",label:"Total Revenue",value:j.revenue,prefix:"Rs"}),e.jsx(S,{cls:"s2",label:"Total Net (kg)",value:j.netKg}),e.jsx(S,{cls:"s3",label:"Total Maund",value:j.netMaund}),e.jsx(S,{cls:"s4",label:"Avg Bags/Invoice",value:j.avgBags})]}),e.jsxs("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:"12px 14px",marginBottom:14},children:[e.jsxs("div",{className:"vsi-filters",style:{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr auto",gap:10,alignItems:"end"},children:[e.jsxs("div",{children:[e.jsx("label",{style:N,children:"Search"}),e.jsxs("div",{style:{position:"relative"},children:[e.jsxs("svg",{style:{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"},width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2,children:[e.jsx("path",{strokeLinecap:"round",d:"M21 21l-4.35-4.35"}),e.jsx("circle",{cx:11,cy:11,r:8})]}),e.jsx("input",{className:"vsi-inp",value:g,onChange:t=>M(t.target.value),placeholder:"Invoice #, vendor, vehicle, product…",style:{paddingLeft:30}})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:N,children:"From Date"}),e.jsx("input",{type:"date",className:"vsi-inp",value:f,onChange:t=>z(t.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{style:N,children:"To Date"}),e.jsx("input",{type:"date",className:"vsi-inp",value:x,onChange:t=>$(t.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{style:N,children:"Product"}),e.jsx("div",{className:"vsi-sel-wrap",children:e.jsxs("select",{className:"vsi-sel",value:h,onChange:t=>D(t.target.value),children:[e.jsx("option",{value:"",children:"All products"}),L.map(t=>e.jsx("option",{value:t,children:t},t))]})})]}),e.jsx("div",{style:{paddingTop:20},children:e.jsx("button",{onClick:I,style:{padding:"7px 12px",borderRadius:6,fontSize:12.5,fontWeight:500,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",cursor:w?"pointer":"default",opacity:w?1:.35,fontFamily:"'DM Sans',sans-serif"},children:"Clear"})})]}),w&&e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginTop:10},children:[g&&e.jsx(k,{label:`"${g}"`,onRemove:()=>M("")}),f&&e.jsx(k,{label:`From ${f}`,onRemove:()=>z("")}),x&&e.jsx(k,{label:`To ${x}`,onRemove:()=>$("")}),h&&e.jsx(k,{label:h,onRemove:()=>D("")})]})]}),n?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(3)].map((t,i)=>e.jsx(Q,{},i))}):d.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"56px 0",background:"#fff",border:"1px solid #e5e7eb",borderRadius:8},children:[e.jsx("svg",{width:40,height:40,fill:"none",viewBox:"0 0 24 24",stroke:"#d1d5db",strokeWidth:1.2,style:{display:"block",margin:"0 auto 12px"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),e.jsx("p",{style:{fontSize:13,fontWeight:600,color:"#374151",margin:"0 0 4px"},children:"No invoices found"}),e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"Try adjusting your search or filters"})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:d.map((t,i)=>e.jsxs("div",{className:"vsi-card",style:{animationDelay:`${i*.04}s`},children:[e.jsxs("div",{className:"vsi-card-head",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:5},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".07em"},children:"Invoice"}),e.jsxs("span",{style:{fontSize:16,fontWeight:700,color:"#111827",fontFamily:"'DM Mono',monospace"},children:["#",String(t.sr||"").padStart(4,"0")]})]}),e.jsx("div",{style:{width:1,height:14,background:"#e5e7eb"}}),e.jsx("span",{style:{fontSize:12.5,color:"#6b7280"},children:t.date}),(t.paddyType||t.productName||t.productId)&&e.jsx("span",{className:"vsi-badge",children:y(t)}),t.builtyNo&&e.jsxs("span",{style:{fontSize:11.5,color:"#6b7280",background:"#f3f4f6",padding:"2px 8px",borderRadius:4,fontFamily:"'DM Mono',monospace"},children:["Builty #",t.builtyNo]})]}),e.jsxs("button",{className:"vsi-print",onClick:()=>F(t),children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"})}),"Print"]})]}),e.jsxs("div",{className:"vsi-grid",children:[e.jsx(c,{label:"Customer",value:t.vendorName}),e.jsx(c,{label:"Vehicle No.",value:t.vehicleNo,mono:!0}),e.jsx(c,{label:"Broker",value:t.brokerName}),e.jsx(c,{label:"Rate / 40 kg",value:t.rate40?`Rs ${o(t.rate40)}`:null,mono:!0}),e.jsx(c,{label:"Qty (Bags)",value:t.quantity,mono:!0}),e.jsx(c,{label:"Net Wt. (kg)",value:t.netWeight?o(t.netWeight):null,mono:!0}),e.jsx(c,{label:"Net Wt. (Maund)",value:t.netWeight40?r(t.netWeight40).toFixed(4):null,mono:!0}),e.jsx(c,{label:"Sutli Amt.",value:t.sutliSilaiAmount?`Rs ${o(t.sutliSilaiAmount)}`:null,mono:!0})]}),e.jsxs("div",{className:"vsi-foot",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"},children:[e.jsx(W,{label:"Amount",value:t.amount,color:"#374151"}),e.jsx("div",{style:{width:1,height:22,background:"#e5e7eb"}}),e.jsx(W,{label:"w/ Sutli",value:t.totalAmount,color:"#374151"}),r(t.bardanaAmount)>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:1,height:22,background:"#e5e7eb"}}),e.jsx(W,{label:"+ Bardana",value:t.bardanaAmount,color:"#374151"})]}),r(t.brokery)>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:1,height:22,background:"#e5e7eb"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:1},children:"Brokery"}),e.jsxs("div",{style:{fontSize:13,fontWeight:600,color:"#dc2626",fontFamily:"'DM Mono',monospace"},children:["− Rs ",o(t.brokery)]})]})]})]}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:2},children:"Net Payable"}),e.jsxs("div",{style:{fontSize:18,fontWeight:700,color:"#111827",fontFamily:"'DM Mono',monospace"},children:["Rs ",o(t.totalAmount2)]})]})]})]},t._id))}),!n&&d.length>0&&e.jsxs("p",{style:{textAlign:"center",color:"#9ca3af",fontSize:12,marginTop:16,fontFamily:"'DM Mono',monospace"},children:[d.length," invoice",d.length!==1?"s":"",w?` · filtered from ${s.length} total`:""]})]})]})}export{X as default};
