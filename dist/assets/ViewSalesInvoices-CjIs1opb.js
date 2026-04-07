import{a as r,j as e}from"./vendor-react-BFXNeceC.js";import{a as L,A as P,S as _,N as Y}from"./index-CaKzjFRj.js";import"./vendor-react-dom-DDWplefk.js";import"./vendor-DDAwBBib.js";const O="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",Q=`
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
`,d=t=>isNaN(Number(t))?0:Number(t)||0,S=(t,o=0)=>d(t).toLocaleString("en-PK",{minimumFractionDigits:o,maximumFractionDigits:o}),j=t=>S(t,2);function M(t){const o=t.paddyType||t.productName;if(o&&o.includes(" - "))return o;const a=t.productId;return a&&typeof a=="object"?[a.productName||o,a.type,a.subType].filter(Boolean).join(" - "):o||"—"}function G(t){return{name:t?.businessName||localStorage.getItem("businessName")||"Mill",logo:t?.logoUrl||localStorage.getItem("logoUrl")||"",address:t?.address||t?.millAddress||"",phone1:t?.phone||t?.phone1||"",phone2:t?.phone2||""}}function J(t,o){const a=o||{},m=a.name||localStorage.getItem("businessName")||"Mill",w=a.logo||localStorage.getItem("logoUrl")||"",v=a.address||"",l=[a.phone1,a.phone2].filter(Boolean).join("  |  "),y=String(t.sr||"").padStart(4,"0"),n=w?`<img src="${w}" alt="logo" style="height:48px;width:48px;object-fit:contain;border-radius:6px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);padding:3px;"/>`:`<div style="width:48px;height:48px;border-radius:8px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#fff;">${m.charAt(0)}</div>`;return`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Sales #${y}</title>
<style>
  @page{size:A5;margin:7mm}*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Segoe UI",Arial,sans-serif;background:#fff;color:#111;font-size:10.5px}.wrap{max-width:130mm;margin:0 auto}
  .hd{background:#111827;padding:10px 12px;border-radius:7px 7px 0 0;display:flex;align-items:center;gap:10px}
  .hd-info{flex:1;min-width:0}.hd-name{font-size:14px;font-weight:800;color:#fff;letter-spacing:-.2px;line-height:1.2}
  .hd-sub{font-size:8.5px;color:rgba(255,255,255,.45);margin-top:2px}
  .hd-right{text-align:right;flex-shrink:0}.hd-type{font-size:9px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#4ade80;margin-bottom:4px}
  .hd-no{font-size:18px;font-weight:800;color:#fff;font-family:"Courier New",monospace;letter-spacing:1px}
  .hd-date{font-size:8.5px;color:rgba(255,255,255,.4);margin-top:2px}
  .meta{display:grid;grid-template-columns:1fr 1fr;border:1px solid #e5e7eb;border-top:none}
  .meta-cell{padding:6px 9px;border-right:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6}
  .meta-cell:nth-child(2n){border-right:none}.meta-cell:nth-last-child(-n+2){border-bottom:none}
  .mc-lbl{font-size:7.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;margin-bottom:2px}
  .mc-val{font-size:11px;font-weight:600;color:#111}.mc-val.mono{font-family:"Courier New",monospace}
  .sec-head{background:#f9fafb;border:1px solid #e5e7eb;border-bottom:none;padding:4px 9px;font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#6b7280;margin-top:6px;border-radius:5px 5px 0 0}
  table{width:100%;border-collapse:collapse;font-size:10.5px}table td,table th{padding:5px 8px;border:1px solid #e5e7eb}
  table th{background:#f3f4f6;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#6b7280}
  table td:last-child,table th:last-child{text-align:right}
  tr.sub td{background:#f9fafb;font-weight:700}tr.red td{color:#dc2626}
  .total-box{border:2px solid #111827;border-radius:0 0 7px 7px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;margin-top:-1px}
  .total-lbl{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#6b7280}
  .total-val{font-size:18px;font-weight:800;color:#111827;font-family:"Courier New",monospace}
  .ft{display:flex;justify-content:space-between;margin-top:12px;padding-top:8px;border-top:1px dashed #e5e7eb}
  .sig-line{width:44%;text-align:center}.sig-line .line{border-top:1px solid #374151;padding-top:3px;margin-top:20px;font-size:8px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body>
<div class="wrap">
  <div class="hd">${n}<div class="hd-info"><div class="hd-name">${m}</div>${v?`<div class="hd-sub">${v}</div>`:""} ${l?`<div class="hd-sub">${l}</div>`:""}</div><div class="hd-right"><div class="hd-type">Sales</div><div class="hd-no">#${y}</div><div class="hd-date">${t.date||""}</div></div></div>
  <div class="meta">
    <div class="meta-cell"><div class="mc-lbl">Customer</div><div class="mc-val">${t.vendorName||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Vehicle</div><div class="mc-val mono">${t.vehicleNo||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Product</div><div class="mc-val">${t.paddyType||t.productName||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Builty #</div><div class="mc-val mono">${t.builtyNo||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Broker</div><div class="mc-val">${t.brokerName||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Qty (Bags)</div><div class="mc-val mono">${Number(t.quantity||0)}</div></div>
  </div>
  <div class="sec-head">Weight & Rate</div>
  <table>
    <tr><th>Description</th><th>Value</th></tr>
    <tr><td>Total Weight</td><td>${Number(t.weight||0).toFixed(2)} kg</td></tr>
    <tr><td>Bag Deduction</td><td>− ${Number(t.bagWeight||0).toFixed(2)} kg</td></tr>
    <tr class="sub"><td>Net Weight</td><td>${Number(t.netWeight||0).toFixed(2)} kg</td></tr>
    <tr class="sub"><td>Net Maund</td><td>${Number(t.netWeight40||0).toFixed(4)} Mn</td></tr>
    <tr><td>Rate / 40 kg</td><td>Rs ${Number(t.rate40||0).toLocaleString("en-PK")}</td></tr>
    <tr><td>Amount</td><td>Rs ${Number(t.amount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>
    <tr><td>Sutli / Silai (Rs ${Number(t.sutliSilaiRate||0)} × ${Number(t.quantity||0)} bags)</td><td>Rs ${Number(t.sutliSilaiAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>
    ${Number(t.bardanaRate||0)>0?`<tr><td>Bardana (Rs ${Number(t.bardanaRate)} × ${Number(t.quantity||0)} bags)</td><td>Rs ${Number(t.bardanaAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
    <tr class="sub"><td>Subtotal${Number(t.bardanaRate||0)>0?" + Bardana":""}</td><td>Rs ${Number(t.totalWithBardana||t.totalAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>
    ${Number(t.brokeryRate||0)>0?`<tr class="red"><td>− Brokery (${Number(t.netWeight40||0).toFixed(4)} Mn × Rs ${Number(t.brokeryRate||0)})</td><td>− Rs ${Number(t.brokery||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
  </table>
  <div class="total-box"><div><div class="total-lbl">Net Payable</div></div><div class="total-val">Rs ${Number(t.totalAmount2||t.totalWithBardana||t.totalAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</div></div>
  <div class="ft"><div class="sig-line"><div class="line">Customer Signature</div></div><div style="font-size:8px;color:#d1d5db;align-self:flex-end">Powered by Agro Plus</div><div class="sig-line"><div class="line">Authorised Signatory</div></div></div>
</div><script>window.print()<\/script></body></html>`}function $({cls:t,label:o,value:a,prefix:m}){return e.jsxs("div",{className:`vsi-stat ${t}`,children:[e.jsx("p",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",margin:"0 0 5px"},children:o}),e.jsxs("p",{style:{fontSize:20,fontWeight:700,color:"#111827",lineHeight:1,margin:0,fontFamily:"'DM Mono',monospace"},children:[m&&e.jsx("span",{style:{fontSize:13,color:"#6b7280",marginRight:3},children:m}),a]})]})}function f({label:t,value:o,mono:a}){return e.jsxs("div",{className:"vsi-cell",children:[e.jsx("div",{className:"vsi-clbl",children:t}),e.jsx("div",{className:`vsi-cval${a?" mono":""}`,children:o!=null&&o!==""?o:e.jsx("span",{style:{color:"#d1d5db"},children:"—"})})]})}function A({label:t,value:o,color:a}){return e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:1},children:t}),e.jsx("div",{style:{fontSize:13,fontWeight:600,color:a||"#374151",fontFamily:"'DM Mono',monospace"},children:d(o)>0?`Rs ${j(o)}`:"—"})]})}function D({label:t,onRemove:o}){return e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:5,background:"#f3f4f6",border:"1px solid #e5e7eb",borderRadius:5,padding:"2px 8px 2px 9px",fontSize:12,fontWeight:500,color:"#374151"},children:[t,e.jsx("button",{onClick:o,style:{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",color:"#9ca3af"},children:e.jsx("svg",{width:12,height:12,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",d:"M6 18L18 6M6 6l12 12"})})})]})}function X(){return e.jsxs("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"12px 16px",borderBottom:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between",gap:10},children:[e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsx("div",{className:"vsi-skel",style:{width:90,height:18}}),e.jsx("div",{className:"vsi-skel",style:{width:70,height:18}})]}),e.jsx("div",{className:"vsi-skel",style:{width:100,height:30,borderRadius:6}})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)"},children:[...Array(8)].map((t,o)=>e.jsxs("div",{style:{padding:"11px 14px",borderRight:o%4!==3?"1px solid #f3f4f6":"none",borderBottom:o<4?"1px solid #f3f4f6":"none"},children:[e.jsx("div",{className:"vsi-skel",style:{width:"50%",height:9,marginBottom:7}}),e.jsx("div",{className:"vsi-skel",style:{width:"80%",height:14}})]},o))}),e.jsxs("div",{style:{padding:"10px 16px",background:"#f9fafb",borderTop:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between"},children:[e.jsx("div",{className:"vsi-skel",style:{width:120,height:12}}),e.jsx("div",{className:"vsi-skel",style:{width:100,height:20}})]})]})}const R={display:"block",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#6b7280",marginBottom:5};function oe(){const[t,o]=r.useState([]),[a,m]=r.useState(!0),[w,v]=r.useState({message:"",type:"info"}),[l,y]=r.useState(""),[n,W]=r.useState(""),[g,F]=r.useState(""),[x,B]=r.useState(""),[c,C]=r.useState([]),[k,I]=r.useState({revenue:"0",netKg:"0",netMaund:"0",avgBags:"0"}),[K,E]=r.useState({});r.useEffect(()=>{(async()=>{try{const[s,i]=await Promise.allSettled([L(`${P}/sales-invoice`),L(`${P}/profile`)]);if(i.status==="fulfilled"){const z=await i.value.json().catch(()=>({}));E(z.profile||z||{})}const h=await(s.status==="fulfilled"?s.value:{ok:!1,json:async()=>({})}).json();h.success?(o(h.invoices),C(h.invoices),T(h.invoices)):v({message:h.message||"Failed to fetch",type:"error"})}catch{v({message:"Server error!",type:"error"})}finally{m(!1)}})()},[]),r.useEffect(()=>{let s=t;if(l){const i=l.toLowerCase();s=s.filter(p=>p.vendorName?.toLowerCase().includes(i)||p.vehicleNo?.toLowerCase().includes(i)||p.brokerName?.toLowerCase().includes(i)||M(p)?.toLowerCase().includes(i)||String(p.sr).includes(i))}n&&(s=s.filter(i=>new Date(i.date)>=new Date(n))),g&&(s=s.filter(i=>new Date(i.date)<=new Date(g))),x&&(s=s.filter(i=>M(i)===x)),C(s),T(s)},[l,n,g,x,t]);const T=s=>{const i=s.length||1,p=s.reduce((u,b)=>u+d(b.totalAmount2||0),0),h=s.reduce((u,b)=>u+d(b.netWeight||0),0),z=s.reduce((u,b)=>u+d(b.netWeight40||0),0),U=s.reduce((u,b)=>u+d(b.quantity||0),0);I({revenue:S(p),netKg:S(h),netMaund:S(z,3),avgBags:S(U/i)})},H=s=>{const i=window.open("","_blank");i&&(i.document.write(J(s,G(K))),i.document.close())},V=()=>{y(""),W(""),F(""),B("")},N=l||n||g||x,q=[...new Set(t.map(s=>M(s)).filter(Boolean))];return e.jsxs(_,{children:[e.jsxs("style",{children:[O,Q]}),e.jsx(Y,{message:w.message,type:w.type,onClose:()=>v({message:"",type:"info"})}),e.jsxs("div",{className:"vsi",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:18},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"Sales"}),e.jsx("h1",{style:{margin:0,fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px"},children:"Sales Invoices"})]}),!a&&e.jsxs("span",{style:{fontSize:12,color:"#9ca3af",fontFamily:"'DM Mono',monospace"},children:[c.length,c.length!==t.length&&e.jsxs("span",{children:[" / ",t.length]}),e.jsxs("span",{style:{fontFamily:"'DM Sans',sans-serif",marginLeft:4},children:["invoice",c.length!==1?"s":""]})]})]}),e.jsxs("div",{className:"vsi-stats",style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:10,marginBottom:16},children:[e.jsx($,{cls:"s1",label:"Total Revenue",value:k.revenue,prefix:"Rs"}),e.jsx($,{cls:"s2",label:"Total Net (kg)",value:k.netKg}),e.jsx($,{cls:"s3",label:"Total Maund",value:k.netMaund}),e.jsx($,{cls:"s4",label:"Avg Bags/Invoice",value:k.avgBags})]}),e.jsxs("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:"12px 14px",marginBottom:14},children:[e.jsxs("div",{className:"vsi-filters",style:{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr auto",gap:10,alignItems:"end"},children:[e.jsxs("div",{children:[e.jsx("label",{style:R,children:"Search"}),e.jsxs("div",{style:{position:"relative"},children:[e.jsxs("svg",{style:{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"},width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2,children:[e.jsx("path",{strokeLinecap:"round",d:"M21 21l-4.35-4.35"}),e.jsx("circle",{cx:11,cy:11,r:8})]}),e.jsx("input",{className:"vsi-inp",value:l,onChange:s=>y(s.target.value),placeholder:"Invoice #, vendor, vehicle, product…",style:{paddingLeft:30}})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:R,children:"From Date"}),e.jsx("input",{type:"date",className:"vsi-inp",value:n,onChange:s=>W(s.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{style:R,children:"To Date"}),e.jsx("input",{type:"date",className:"vsi-inp",value:g,onChange:s=>F(s.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{style:R,children:"Product"}),e.jsx("div",{className:"vsi-sel-wrap",children:e.jsxs("select",{className:"vsi-sel",value:x,onChange:s=>B(s.target.value),children:[e.jsx("option",{value:"",children:"All products"}),q.map(s=>e.jsx("option",{value:s,children:s},s))]})})]}),e.jsx("div",{style:{paddingTop:20},children:e.jsx("button",{onClick:V,style:{padding:"7px 12px",borderRadius:6,fontSize:12.5,fontWeight:500,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",cursor:N?"pointer":"default",opacity:N?1:.35,fontFamily:"'DM Sans',sans-serif"},children:"Clear"})})]}),N&&e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginTop:10},children:[l&&e.jsx(D,{label:`"${l}"`,onRemove:()=>y("")}),n&&e.jsx(D,{label:`From ${n}`,onRemove:()=>W("")}),g&&e.jsx(D,{label:`To ${g}`,onRemove:()=>F("")}),x&&e.jsx(D,{label:x,onRemove:()=>B("")})]})]}),a?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(3)].map((s,i)=>e.jsx(X,{},i))}):c.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"56px 0",background:"#fff",border:"1px solid #e5e7eb",borderRadius:8},children:[e.jsx("svg",{width:40,height:40,fill:"none",viewBox:"0 0 24 24",stroke:"#d1d5db",strokeWidth:1.2,style:{display:"block",margin:"0 auto 12px"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),e.jsx("p",{style:{fontSize:13,fontWeight:600,color:"#374151",margin:"0 0 4px"},children:"No invoices found"}),e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"Try adjusting your search or filters"})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:c.map((s,i)=>e.jsxs("div",{className:"vsi-card",style:{animationDelay:`${i*.04}s`},children:[e.jsxs("div",{className:"vsi-card-head",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:5},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".07em"},children:"Invoice"}),e.jsxs("span",{style:{fontSize:16,fontWeight:700,color:"#111827",fontFamily:"'DM Mono',monospace"},children:["#",String(s.sr||"").padStart(4,"0")]})]}),e.jsx("div",{style:{width:1,height:14,background:"#e5e7eb"}}),e.jsx("span",{style:{fontSize:12.5,color:"#6b7280"},children:s.date}),(s.paddyType||s.productName||s.productId)&&e.jsx("span",{className:"vsi-badge",children:M(s)}),s.builtyNo&&e.jsxs("span",{style:{fontSize:11.5,color:"#6b7280",background:"#f3f4f6",padding:"2px 8px",borderRadius:4,fontFamily:"'DM Mono',monospace"},children:["Builty #",s.builtyNo]})]}),e.jsxs("button",{className:"vsi-print",onClick:()=>H(s),children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"})}),"Print"]})]}),e.jsxs("div",{className:"vsi-grid",children:[e.jsx(f,{label:"Customer",value:s.vendorName}),e.jsx(f,{label:"Vehicle No.",value:s.vehicleNo,mono:!0}),e.jsx(f,{label:"Broker",value:s.brokerName}),e.jsx(f,{label:"Rate / 40 kg",value:s.rate40?`Rs ${j(s.rate40)}`:null,mono:!0}),e.jsx(f,{label:"Qty (Bags)",value:s.quantity,mono:!0}),e.jsx(f,{label:"Net Wt. (kg)",value:s.netWeight?j(s.netWeight):null,mono:!0}),e.jsx(f,{label:"Net Wt. (Maund)",value:s.netWeight40?d(s.netWeight40).toFixed(4):null,mono:!0}),e.jsx(f,{label:"Sutli Amt.",value:s.sutliSilaiAmount?`Rs ${j(s.sutliSilaiAmount)}`:null,mono:!0})]}),e.jsxs("div",{className:"vsi-foot",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"},children:[e.jsx(A,{label:"Amount",value:s.amount,color:"#374151"}),e.jsx("div",{style:{width:1,height:22,background:"#e5e7eb"}}),e.jsx(A,{label:"w/ Sutli",value:s.totalAmount,color:"#374151"}),d(s.bardanaAmount)>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:1,height:22,background:"#e5e7eb"}}),e.jsx(A,{label:"+ Bardana",value:s.bardanaAmount,color:"#374151"})]}),d(s.brokery)>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:1,height:22,background:"#e5e7eb"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:1},children:"Brokery"}),e.jsxs("div",{style:{fontSize:13,fontWeight:600,color:"#dc2626",fontFamily:"'DM Mono',monospace"},children:["− Rs ",j(s.brokery)]})]})]})]}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:2},children:"Net Payable"}),e.jsxs("div",{style:{fontSize:18,fontWeight:700,color:"#111827",fontFamily:"'DM Mono',monospace"},children:["Rs ",j(s.totalAmount2)]})]})]})]},s._id))}),!a&&c.length>0&&e.jsxs("p",{style:{textAlign:"center",color:"#9ca3af",fontSize:12,marginTop:16,fontFamily:"'DM Mono',monospace"},children:[c.length," invoice",c.length!==1?"s":"",N?` · filtered from ${t.length} total`:""]})]})]})}export{oe as default};
