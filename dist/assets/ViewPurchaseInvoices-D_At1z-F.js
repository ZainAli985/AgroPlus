import{a as l,j as e}from"./vendor-react-BFXNeceC.js";import{a as T,A as C,S as U,N as L}from"./index-ENuaVSaE.js";import"./vendor-react-dom-DDWplefk.js";import"./vendor-DDAwBBib.js";const _="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",Y=`
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
`,x=o=>isNaN(Number(o))?0:Number(o)||0,w=(o,s=0)=>x(o).toLocaleString("en-PK",{minimumFractionDigits:s,maximumFractionDigits:s}),z=o=>w(o,2);function $(o){if(o.productName&&o.productName.includes(" - "))return o.productName;const s=o.productId;return s&&typeof s=="object"?[s.productName||o.productName,s.type,s.subType].filter(Boolean).join(" - "):o.productName||"—"}function q(o){return{name:o?.businessName||localStorage.getItem("businessName")||"Mill",logo:o?.logoUrl||localStorage.getItem("logoUrl")||"",address:o?.address||o?.millAddress||"",phone1:o?.phone||o?.phone1||"",phone2:o?.phone2||""}}function O(o,s){const a=s||{},m=a.name||localStorage.getItem("businessName")||"Mill",v=a.logo||localStorage.getItem("logoUrl")||"",y=a.address||"",d=[a.phone1,a.phone2].filter(Boolean).join("  |  "),h=(Array.isArray(o.rateRows)&&o.rateRows.length?o.rateRows:[{maund:Number(o.netWeightMaund||o.netWeight40KG||0),rate:Number(o.rate40kg||0),amount:Number(o.totalAmount||o.amount||0)}]).filter(p=>p.maund||p.rate).map(p=>`<tr><td>${Number(p.maund||0).toFixed(4)} Mn × ${Number(p.rate||0).toLocaleString("en-PK")}</td><td>${Number(p.amount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`).join(""),N=v?`<img src="${v}" alt="logo" style="height:48px;width:48px;object-fit:contain;border-radius:6px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);padding:3px;"/>`:`<div style="width:48px;height:48px;border-radius:8px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#fff;">${m.charAt(0)}</div>`,c=String(o.sr||"").padStart(4,"0");return`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Purchase #${c}</title>
<style>
  @page{size:A5;margin:7mm}*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Segoe UI",Arial,sans-serif;background:#fff;color:#111;font-size:10.5px}.wrap{max-width:130mm;margin:0 auto}
  .hd{background:#111827;padding:10px 12px;border-radius:7px 7px 0 0;display:flex;align-items:center;gap:10px}
  .hd-info{flex:1;min-width:0}.hd-name{font-size:14px;font-weight:800;color:#fff;letter-spacing:-.2px;line-height:1.2}
  .hd-sub{font-size:8.5px;color:rgba(255,255,255,.45);margin-top:2px}
  .hd-right{text-align:right;flex-shrink:0}.hd-type{font-size:9px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#4ade80;margin-bottom:4px}
  .hd-no{font-size:18px;font-weight:800;color:#fff;font-family:"Courier New",monospace;letter-spacing:1px}
  .hd-date{font-size:8.5px;color:rgba(255,255,255,.4);margin-top:2px}
  .meta{display:grid;grid-template-columns:1fr 1fr;gap:0;border:1px solid #e5e7eb;border-top:none}
  .meta-cell{padding:6px 9px;border-right:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6}
  .meta-cell:nth-child(2n){border-right:none}.meta-cell:nth-last-child(-n+2){border-bottom:none}
  .mc-lbl{font-size:7.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;margin-bottom:2px}
  .mc-val{font-size:11px;font-weight:600;color:#111}.mc-val.mono{font-family:"Courier New",monospace}
  .sec-head{background:#f9fafb;border:1px solid #e5e7eb;border-bottom:none;padding:4px 9px;font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#6b7280;margin-top:6px;border-radius:5px 5px 0 0}
  table{width:100%;border-collapse:collapse;font-size:10.5px}table td,table th{padding:5px 8px;border:1px solid #e5e7eb}
  table th{background:#f3f4f6;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#6b7280}
  table td:last-child,table th:last-child{text-align:right}
  tr.sub td{background:#f9fafb;font-weight:700}
  .total-box{border:2px solid #111827;border-radius:0 0 7px 7px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;margin-top:-1px}
  .total-lbl{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#6b7280}
  .total-val{font-size:18px;font-weight:800;color:#111827;font-family:"Courier New",monospace}
  .ft{display:flex;justify-content:space-between;margin-top:12px;padding-top:8px;border-top:1px dashed #e5e7eb;font-size:8.5px;color:#9ca3af}
  .sig-line{width:44%;text-align:center}.sig-line .line{border-top:1px solid #374151;padding-top:3px;margin-top:20px;font-size:8px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body>
<div class="wrap">
  <div class="hd">${N}<div class="hd-info"><div class="hd-name">${m}</div>${y?`<div class="hd-sub">${y}</div>`:""} ${d?`<div class="hd-sub">${d}</div>`:""}</div><div class="hd-right"><div class="hd-type">Purchase</div><div class="hd-no">#${c}</div><div class="hd-date">${o.date||""}</div></div></div>
  <div class="meta">
    <div class="meta-cell"><div class="mc-lbl">Vendor</div><div class="mc-val">${o.vendorName||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Vehicle</div><div class="mc-val mono">${o.vehicleNumber||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Product</div><div class="mc-val">${o.productName||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Builty #</div><div class="mc-val mono">${o.builtyNumber||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Bag Type</div><div class="mc-val">${o.bagTypeName||"—"}${o.bagWeightPerBag?` (${o.bagWeightPerBag}kg)`:""}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Moisture</div><div class="mc-val mono">${o.moisturePercent||0}% (Base ${o.baseMoisture||0}%)</div></div>
  </div>
  <div class="sec-head">Weight Breakdown</div>
  <table>
    <tr><th>Description</th><th>Value</th></tr>
    <tr><td>Qty (Bags)</td><td>${Number(o.quantity||0)}</td></tr>
    <tr><td>Gross Weight</td><td>${Number(o.grossWeight||0).toFixed(2)} kg</td></tr>
    <tr><td>Bag Deduction</td><td>− ${Number(o.totalBagWeight||0).toFixed(2)} kg</td></tr>
    <tr><td>Moisture Adj.</td><td>− ${Number(o.moistureAdjustment||0).toFixed(0)} kg</td></tr>
    <tr class="sub"><td>Net Weight</td><td>${Number(o.netWeightKg||o.netWeight||0).toFixed(2)} kg</td></tr>
    <tr class="sub"><td>Net Maund</td><td>${Number(o.netWeightMaund||o.netWeight40KG||0).toFixed(4)} Mn</td></tr>
  </table>
  <div class="sec-head" style="margin-top:5px">Rate & Amount</div>
  <table>
    <tr><th>Rate Breakdown</th><th>Amount (Rs)</th></tr>
    ${h}
    <tr class="sub"><td>Total Amount</td><td>${Number(o.totalAmount||o.amount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>
    ${Number(o.rentAdjustment||0)>0?`<tr><td>− Rent Adj.</td><td>${Number(o.rentAdjustment).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
  </table>
  <div class="total-box"><div><div class="total-lbl">Net Payable</div></div><div class="total-val">Rs ${Number(o.finalAmount||o.totalAmount||o.amount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</div></div>
  <div class="ft"><div class="sig-line"><div class="line">Supplier Signature</div></div><div style="font-size:8px;color:#d1d5db;align-self:flex-end">Powered by Agro Plus</div><div class="sig-line"><div class="line">Authorised Signatory</div></div></div>
</div><script>window.print()<\/script></body></html>`}function A({cls:o,label:s,value:a,prefix:m}){return e.jsxs("div",{className:`vpi-stat ${o}`,children:[e.jsx("p",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",margin:"0 0 5px"},children:s}),e.jsxs("p",{style:{fontSize:20,fontWeight:700,color:"#111827",lineHeight:1,margin:0,fontFamily:"'DM Mono',monospace"},children:[m&&e.jsx("span",{style:{fontSize:13,color:"#6b7280",marginRight:3},children:m}),a]})]})}function Q(){return e.jsxs("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"12px 16px",borderBottom:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between",gap:10},children:[e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsx("div",{className:"vpi-skel",style:{width:90,height:18}}),e.jsx("div",{className:"vpi-skel",style:{width:70,height:18}})]}),e.jsx("div",{className:"vpi-skel",style:{width:100,height:30,borderRadius:6}})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)"},children:[...Array(8)].map((o,s)=>e.jsxs("div",{style:{padding:"11px 14px",borderRight:s%4!==3?"1px solid #f3f4f6":"none",borderBottom:s<4?"1px solid #f3f4f6":"none"},children:[e.jsx("div",{className:"vpi-skel",style:{width:"50%",height:9,marginBottom:7}}),e.jsx("div",{className:"vpi-skel",style:{width:"80%",height:14}})]},s))}),e.jsxs("div",{style:{padding:"10px 16px",background:"#f9fafb",borderTop:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between"},children:[e.jsx("div",{className:"vpi-skel",style:{width:120,height:12}}),e.jsx("div",{className:"vpi-skel",style:{width:100,height:20}})]})]})}const D={display:"block",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#6b7280",marginBottom:5};function te(){const[o,s]=l.useState([]),[a,m]=l.useState(!0),[v,y]=l.useState({message:"",type:"info"}),[d,S]=l.useState(""),[h,N]=l.useState(""),[c,p]=l.useState(""),[j,F]=l.useState(""),[u,P]=l.useState([]),[M,I]=l.useState({grossKg:"0",netKg:"0",netMaund:"0",totalAmt:"0"}),[K,V]=l.useState({});l.useEffect(()=>{(async()=>{try{const[t,i]=await Promise.allSettled([T(`${C}/purchase-invoice`),T(`${C}/profile`)]);if(i.status==="fulfilled"){const k=await i.value.json().catch(()=>({}));V(k.profile||k||{})}const f=await(t.status==="fulfilled"?t.value:{ok:!1,json:async()=>({})}).json();f.success?(s(f.invoices),P(f.invoices),B(f.invoices)):y({message:f.message||"Failed to fetch",type:"error"})}catch{y({message:"Server error!",type:"error"})}finally{m(!1)}})()},[]),l.useEffect(()=>{let t=o;if(d){const i=d.toLowerCase();t=t.filter(n=>n.vendorName?.toLowerCase().includes(i)||n.vehicleNumber?.toLowerCase().includes(i)||$(n)?.toLowerCase().includes(i)||String(n.sr).includes(i)||String(n.builtyNumber||"").includes(i))}h&&(t=t.filter(i=>new Date(i.date)>=new Date(h))),c&&(t=t.filter(i=>new Date(i.date)<=new Date(c))),j&&(t=t.filter(i=>$(i)===j)),P(t),B(t)},[d,h,c,j,o]);const B=t=>{const i=t.reduce((g,r)=>g+x(r.grossWeight||r.finalWeight||0),0),n=t.reduce((g,r)=>g+x(r.netWeightKg||r.netWeight||0),0),f=t.reduce((g,r)=>g+x(r.netWeightMaund||r.netWeight40KG||0),0),k=t.reduce((g,r)=>g+x(r.finalAmount||r.totalAmount||r.amount||0),0);I({grossKg:w(i),netKg:w(n),netMaund:w(f,3),totalAmt:w(k)})},H=t=>{const i=window.open("","_blank");i&&(i.document.write(O(t,q(K))),i.document.close())},E=()=>{S(""),N(""),p(""),F("")},W=d||h||c||j,G=[...new Set(o.map(t=>$(t)).filter(Boolean))];return e.jsxs(U,{children:[e.jsxs("style",{children:[_,Y]}),e.jsx(L,{message:v.message,type:v.type,onClose:()=>y({message:"",type:"info"})}),e.jsxs("div",{className:"vpi",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:18},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"Procurement"}),e.jsx("h1",{style:{margin:0,fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px"},children:"Purchase Invoices"})]}),!a&&e.jsxs("span",{style:{fontSize:12,color:"#9ca3af",fontFamily:"'DM Mono',monospace"},children:[u.length,u.length!==o.length&&e.jsxs("span",{children:[" / ",o.length]}),e.jsxs("span",{style:{fontFamily:"'DM Sans',sans-serif",marginLeft:4},children:["invoice",u.length!==1?"s":""]})]})]}),e.jsxs("div",{className:"vpi-stats",style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:10,marginBottom:16},children:[e.jsx(A,{cls:"s1",label:"Total Gross (kg)",value:M.grossKg}),e.jsx(A,{cls:"s2",label:"Total Net (kg)",value:M.netKg}),e.jsx(A,{cls:"s3",label:"Total Maund",value:M.netMaund}),e.jsx(A,{cls:"s4",label:"Total Amount",value:M.totalAmt,prefix:"Rs"})]}),e.jsxs("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:"12px 14px",marginBottom:14},children:[e.jsxs("div",{className:"vpi-filters",style:{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr auto",gap:10,alignItems:"end"},children:[e.jsxs("div",{children:[e.jsx("label",{style:D,children:"Search"}),e.jsxs("div",{style:{position:"relative"},children:[e.jsxs("svg",{style:{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"},width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2,children:[e.jsx("path",{strokeLinecap:"round",d:"M21 21l-4.35-4.35"}),e.jsx("circle",{cx:11,cy:11,r:8})]}),e.jsx("input",{className:"vpi-inp",value:d,onChange:t=>S(t.target.value),placeholder:"Invoice #, vendor, vehicle, product…",style:{paddingLeft:30}})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:D,children:"From Date"}),e.jsx("input",{type:"date",className:"vpi-inp",value:h,onChange:t=>N(t.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{style:D,children:"To Date"}),e.jsx("input",{type:"date",className:"vpi-inp",value:c,onChange:t=>p(t.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{style:D,children:"Product"}),e.jsx("div",{className:"vpi-sel-wrap",children:e.jsxs("select",{className:"vpi-sel",value:j,onChange:t=>F(t.target.value),children:[e.jsx("option",{value:"",children:"All products"}),G.map(t=>e.jsx("option",{value:t,children:t},t))]})})]}),e.jsx("div",{style:{paddingTop:20},children:e.jsx("button",{onClick:E,style:{padding:"7px 12px",borderRadius:6,fontSize:12.5,fontWeight:500,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",cursor:W?"pointer":"default",opacity:W?1:.35,fontFamily:"'DM Sans',sans-serif"},children:"Clear"})})]}),W&&e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginTop:10},children:[d&&e.jsx(R,{label:`"${d}"`,onRemove:()=>S("")}),h&&e.jsx(R,{label:`From ${h}`,onRemove:()=>N("")}),c&&e.jsx(R,{label:`To ${c}`,onRemove:()=>p("")}),j&&e.jsx(R,{label:j,onRemove:()=>F("")})]})]}),a?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(3)].map((t,i)=>e.jsx(Q,{},i))}):u.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"56px 0",background:"#fff",border:"1px solid #e5e7eb",borderRadius:8},children:[e.jsx("svg",{width:40,height:40,fill:"none",viewBox:"0 0 24 24",stroke:"#d1d5db",strokeWidth:1.2,style:{display:"block",margin:"0 auto 12px"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),e.jsx("p",{style:{fontSize:13,fontWeight:600,color:"#374151",margin:"0 0 4px"},children:"No invoices found"}),e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"Try adjusting your search or filters"})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:u.map((t,i)=>{const n=x(t.netWeightKg||t.netWeight||0),f=x(t.netWeightMaund||t.netWeight40KG||0),k=x(t.finalAmount||t.totalAmount||t.amount||0),g=Array.isArray(t.rateRows)&&t.rateRows.length>1?`${t.rateRows.length} rate rows`:t.rateRows?.[0]?.rate?`Rs ${w(t.rateRows[0].rate)}/40kg`:t.rate40kg?`Rs ${w(t.rate40kg)}/40kg`:null;return e.jsxs("div",{className:"vpi-card",style:{animationDelay:`${i*.04}s`},children:[e.jsxs("div",{className:"vpi-card-head",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:5},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".07em"},children:"Invoice"}),e.jsxs("span",{style:{fontSize:16,fontWeight:700,color:"#111827",fontFamily:"'DM Mono',monospace"},children:["#",String(t.sr||"").padStart(4,"0")]})]}),e.jsx("div",{style:{width:1,height:14,background:"#e5e7eb"}}),e.jsx("span",{style:{fontSize:12.5,color:"#6b7280"},children:t.date}),(t.productName||t.productId)&&e.jsx("span",{className:"vpi-badge",children:$(t)}),t.bagStatus==="return"&&e.jsx("span",{style:{fontSize:11,color:"#6b7280",fontWeight:500,background:"#f3f4f6",padding:"2px 7px",borderRadius:4,border:"1px solid #e5e7eb"},children:"Bag Return"}),t.builtyNumber&&e.jsxs("span",{style:{fontSize:11.5,color:"#6b7280",background:"#f3f4f6",padding:"2px 8px",borderRadius:4,fontFamily:"'DM Mono',monospace"},children:["Builty #",t.builtyNumber]})]}),e.jsxs("button",{className:"vpi-print",onClick:()=>H(t),children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"})}),"Print"]})]}),e.jsxs("div",{className:"vpi-grid",children:[e.jsx(b,{label:"Vendor",value:t.vendorName}),e.jsx(b,{label:"Vehicle No.",value:t.vehicleNumber,mono:!0}),e.jsx(b,{label:"Gross Weight (kg)",value:t.grossWeight||t.finalWeight?z(t.grossWeight||t.finalWeight):null,mono:!0}),e.jsx(b,{label:"Qty (Bags)",value:t.quantity,mono:!0}),e.jsx(b,{label:"Bag Type",value:t.bagTypeName||(t.bagWeightPerBag?`${t.bagWeightPerBag} kg/bag`:null)}),e.jsx(b,{label:"Moisture %",value:t.moisturePercent?`${t.moisturePercent}%`:null,mono:!0}),e.jsx(b,{label:"Net Weight (kg)",value:n?z(n):null,mono:!0,hi:!0}),e.jsx(b,{label:"Net Weight (Maund)",value:f?f.toFixed(4):null,mono:!0})]}),e.jsxs("div",{className:"vpi-foot",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"},children:[g&&e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:1},children:"Rate"}),e.jsx("div",{style:{fontSize:13,fontWeight:600,color:"#374151",fontFamily:"'DM Mono',monospace"},children:g})]}),x(t.rentAdjustment)>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:1,height:22,background:"#e5e7eb"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:1},children:"Rent Adj."}),e.jsxs("div",{style:{fontSize:13,fontWeight:600,color:"#dc2626",fontFamily:"'DM Mono',monospace"},children:["− Rs ",z(t.rentAdjustment)]})]})]})]}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:2},children:"Net Payable"}),e.jsxs("div",{style:{fontSize:18,fontWeight:700,color:"#111827",fontFamily:"'DM Mono',monospace"},children:["Rs ",z(k)]})]})]})]},t._id)})}),!a&&u.length>0&&e.jsxs("p",{style:{textAlign:"center",color:"#9ca3af",fontSize:12,marginTop:16,fontFamily:"'DM Mono',monospace"},children:[u.length," invoice",u.length!==1?"s":"",W?` · filtered from ${o.length} total`:""]})]}),e.jsx(L,{message:v.message,type:v.type,onClose:()=>y({message:"",type:"info"})})]})}function b({label:o,value:s,mono:a,hi:m}){return e.jsxs("div",{className:"vpi-cell",children:[e.jsx("div",{className:"vpi-clbl",children:o}),e.jsx("div",{className:`vpi-cval${a?" mono":""}${m?" hi":""}`,children:s!=null&&s!==""?s:e.jsx("span",{style:{color:"#d1d5db"},children:"—"})})]})}function R({label:o,onRemove:s}){return e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:5,background:"#f3f4f6",border:"1px solid #e5e7eb",borderRadius:5,padding:"2px 8px 2px 9px",fontSize:12,fontWeight:500,color:"#374151"},children:[o,e.jsx("button",{onClick:s,style:{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",color:"#9ca3af"},children:e.jsx("svg",{width:12,height:12,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",d:"M6 18L18 6M6 6l12 12"})})})]})}export{te as default};
