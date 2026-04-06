import{a as c,j as e}from"./vendor-react-BFXNeceC.js";import{a as T,A as M,S as C}from"./index-cZ7zb13t.js";import"./vendor-react-dom-DDWplefk.js";import"./vendor-DDAwBBib.js";const $="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",F=`
  *, *::before, *::after { box-sizing: border-box; }
  .wbr { font-family: 'DM Sans', sans-serif; color: #111827; }
  .wbr-mono { font-family: 'DM Mono', monospace; }

  /* stat cards */
  .wbr-stat {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; padding: 14px 16px;
    position: relative; overflow: hidden;
  }
  .wbr-stat::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 3px;
  }
  .wbr-stat.s1::before { background: #1f2937; }
  .wbr-stat.s2::before { background: #15803d; }
  .wbr-stat.s3::before { background: #d1d5db; }
  .wbr-stat.s4::before { background: #374151; }

  /* inputs */
  .wbr-inp, .wbr-sel {
    width: 100%; padding: 7px 10px;
    border: 1px solid #d1d5db; border-radius: 6px;
    font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s; appearance: none;
  }
  .wbr-inp::placeholder { color: #9ca3af; }
  .wbr-inp:focus, .wbr-sel:focus {
    border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .wbr-sel-wrap { position: relative; }
  .wbr-sel-wrap::after {
    content: ''; position: absolute; right: 10px; top: 50%;
    transform: translateY(-50%); pointer-events: none;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #9ca3af;
  }

  /* invoice card */
  .wbr-card {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; overflow: hidden;
    transition: box-shadow .12s;
    animation: wbr-in .16s ease both;
  }
  .wbr-card:hover { box-shadow: 0 2px 10px rgba(0,0,0,.07); }
  @keyframes wbr-in { from { opacity:0; transform:translateY(3px); } to { opacity:1; transform:translateY(0); } }

  .wbr-card-head {
    padding: 12px 14px; border-bottom: 1px solid #f3f4f6;
    display: flex; align-items: center; justify-content: space-between;
    gap: 10px; flex-wrap: wrap;
  }
  .wbr-card-body { padding: 12px 14px; }
  .wbr-card-foot {
    padding: 10px 14px; background: #f9fafb;
    border-top: 1px solid #f3f4f6;
    display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;
  }

  /* bar track */
  .wbr-track { flex: 1; height: 4px; background: #f3f4f6; border-radius: 4px; overflow: hidden; }
  .wbr-fill-1st { height: 100%; background: #d1d5db; border-radius: 4px; transition: width .4s; }
  .wbr-fill-2nd { height: 100%; background: #6b7280; border-radius: 4px; transition: width .4s; }
  .wbr-fill-net { height: 100%; background: #15803d; border-radius: 4px; transition: width .4s; }

  /* detail cell */
  .wbr-dcell {
    background: #f9fafb; border: 1px solid #f3f4f6;
    border-radius: 6px; padding: 8px 10px;
  }

  /* print btn */
  .wbr-print {
    display: inline-flex; align-items: center; gap: 5px;
    background: #111827; color: #fff; border: none;
    border-radius: 6px; padding: 5px 12px;
    font-size: 12px; font-weight: 500;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    transition: background .1s; white-space: nowrap;
  }
  .wbr-print:hover { background: #1f2937; }

  /* skeleton */
  @keyframes wbr-shimmer { to { background-position: -200% 0; } }
  .wbr-skel {
    border-radius: 5px; height: 11px;
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    background-size: 200% 100%; animation: wbr-shimmer 1.4s infinite;
  }

  .wbr-badge { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 4px; font-size: 11.5px; font-weight: 600; white-space: nowrap; }
  .wbr-badge.done { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
  .wbr-badge.pend { background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb; }

  .wbr-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .wbr-g3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 6px; }

  @media (max-width: 900px) {
    .wbr-cards { grid-template-columns: 1fr !important; }
    .wbr-stats { grid-template-columns: repeat(2,1fr) !important; }
  }
`,o=t=>Number(t||0).toLocaleString("en-PK"),g=t=>t?new Date(t).toLocaleString("en-PK",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"—",v=t=>t?new Date(t).toLocaleDateString("en-PK",{day:"2-digit",month:"short",year:"numeric"}):"—";function h(t){if(t.productName&&t.productName.includes(" - "))return t.productName;const d=t.productId;return d&&typeof d=="object"?[d.productName||t.productName,d.type,d.subType].filter(Boolean).join(" - "):t.productName||"—"}function A({e:t,onPrint:d}){const[a,p]=c.useState(!1),r=Math.max(Number(t.firstWeight||0),Number(t.secondWeight||0));return e.jsxs("div",{className:"wbr-card",children:[e.jsxs("div",{className:"wbr-card-head",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:5},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".07em"},children:"Invoice"}),e.jsx("span",{className:"wbr-mono",style:{fontSize:15,fontWeight:700,color:"#111827"},children:t.invoiceCode})]}),e.jsx("div",{style:{width:1,height:14,background:"#e5e7eb"}}),e.jsx("span",{style:{fontSize:12.5,color:"#6b7280"},children:v(t.createdAt)}),e.jsx("span",{className:"wbr-badge",style:{background:"#f3f4f6",color:"#374151",border:"1px solid #e5e7eb",fontFamily:"'DM Mono',monospace",fontSize:11.5},children:h(t)})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7},children:[e.jsxs("span",{className:`wbr-badge ${t.completed?"done":"pend"}`,children:[e.jsx("span",{style:{width:5,height:5,borderRadius:"50%",background:t.completed?"#15803d":"#9ca3af",display:"inline-block"}}),t.completed?"Complete":"Pending"]}),e.jsxs("button",{className:"wbr-print",onClick:()=>d(t),children:[e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"})}),"Print"]})]})]}),e.jsxs("div",{className:"wbr-card-body",children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,marginBottom:t.completed?12:0},children:[e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("p",{style:{fontWeight:600,color:"#111827",fontSize:13,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",margin:"0 0 2px"},children:t.vendorName}),e.jsxs("p",{style:{fontSize:12,color:"#6b7280",margin:0},children:[t.vehicleNumber||"—"," · ",t.vehicleType]})]}),e.jsxs("div",{style:{textAlign:"right",flexShrink:0},children:[e.jsx("p",{style:{fontSize:9.5,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".08em",margin:"0 0 2px"},children:t.completed?"Net Weight":"First Weight"}),e.jsx("p",{className:"wbr-mono",style:{fontSize:20,fontWeight:700,color:t.completed?"#15803d":"#374151",margin:0,lineHeight:1},children:o(t.completed?t.netWeight:t.firstWeight)}),e.jsx("p",{style:{fontSize:10,color:"#9ca3af",margin:"2px 0 0"},children:"kg"})]})]}),t.completed&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:5},children:[[["1st",t.firstWeight,"wbr-fill-1st"],["2nd",t.secondWeight,"wbr-fill-2nd"],["Net",t.netWeight,"wbr-fill-net"]].map(([s,l,x])=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,fontSize:11.5},children:[e.jsx("span",{className:"wbr-mono",style:{width:28,textAlign:"right",color:"#9ca3af",fontWeight:600},children:s}),e.jsx("div",{className:"wbr-track",children:e.jsx("div",{className:x,style:{width:`${Math.min(100,(Number(l)||0)/r*100)}%`}})}),e.jsxs("span",{className:"wbr-mono",style:{width:70,color:s==="Net"?"#15803d":"#374151",fontWeight:s==="Net"?700:400},children:[o(l)," kg"]})]},s)),e.jsx("div",{className:"wbr-g2",style:{marginTop:6},children:[["Maund",`${Number(t.netWeightMaund||0).toFixed(2)} Mn`],["Metric Ton",`${Number(t.netWeightTon||0).toFixed(2)} T`]].map(([s,l])=>e.jsxs("div",{className:"wbr-dcell",children:[e.jsx("p",{style:{fontSize:9.5,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".08em",margin:"0 0 2px"},children:s}),e.jsx("p",{className:"wbr-mono",style:{fontSize:12.5,fontWeight:600,color:"#374151",margin:0},children:l})]},s))})]})]}),e.jsxs("div",{className:"wbr-card-foot",children:[e.jsxs("div",{style:{display:"flex",gap:14,flexWrap:"wrap"},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:9.5,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".07em",margin:"0 0 1px"},children:"Rate"}),e.jsxs("p",{className:"wbr-mono",style:{fontSize:12.5,fontWeight:600,color:"#374151",margin:0},children:["Rs ",o(t.rate)]})]}),e.jsx("div",{style:{width:1,height:22,background:"#e5e7eb",alignSelf:"center"}}),e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:9.5,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".07em",margin:"0 0 1px"},children:"Date"}),e.jsx("p",{className:"wbr-mono",style:{fontSize:12.5,fontWeight:600,color:"#374151",margin:0},children:v(t.createdAt)})]})]}),e.jsx("button",{onClick:()=>p(s=>!s),style:{fontSize:12,fontWeight:500,color:"#6b7280",background:"none",border:"1px solid #e5e7eb",borderRadius:5,padding:"4px 10px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all .1s"},onMouseEnter:s=>s.currentTarget.style.background="#f9fafb",onMouseLeave:s=>s.currentTarget.style.background="none",children:a?"Hide details ▲":"Details ▼"})]}),a&&e.jsxs("div",{style:{borderTop:"1px solid #f3f4f6",padding:"12px 14px",background:"#fafafa"},children:[e.jsx("p",{style:{fontSize:10,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".08em",margin:"0 0 9px"},children:"Full Entry Details"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6},children:[["Vendor",t.vendorName],["Vehicle No.",t.vehicleNumber||"—"],["Vehicle Type",t.vehicleType],["Product",h(t)],["Rate",`Rs ${o(t.rate)}`],["Invoice",t.invoiceCode],["1st Weight",`${o(t.firstWeight)} kg`],["1st Driver",t.firstWeightWithDriver?"With Driver":"Without Driver"],["1st Time",g(t.firstWeightTime||t.createdAt)],["2nd Weight",t.secondWeight?`${o(t.secondWeight)} kg`:"—"],["2nd Driver",t.secondWeight?t.secondWeightWithDriver?"With Driver":"Without Driver":"—"],["2nd Time",g(t.secondWeightTime)]].map(([s,l])=>e.jsxs("div",{className:"wbr-dcell",style:{background:"#fff"},children:[e.jsx("p",{style:{fontSize:9.5,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".07em",margin:"0 0 2px"},children:s}),e.jsx("p",{className:"wbr-mono",style:{fontSize:12,fontWeight:600,color:"#374151",margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:l})]},s))})]})]})}const f={display:"block",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#6b7280",marginBottom:5};function I(){const[t,d]=c.useState([]),[a,p]=c.useState([]),[r,s]=c.useState({vendor:"",product:"",date:"",status:""}),[l,x]=c.useState(!0);c.useEffect(()=>{(async()=>{try{const n=await(await T(`${M}/weight-bridge`)).json();n.success&&(d(n.entries),p(n.entries))}catch{}finally{x(!1)}})()},[]),c.useEffect(()=>{let i=[...t];r.vendor&&(i=i.filter(n=>n.vendorName?.toLowerCase().includes(r.vendor.toLowerCase()))),r.product&&(i=i.filter(n=>h(n)?.toLowerCase().includes(r.product.toLowerCase()))),r.date&&(i=i.filter(n=>new Date(n.createdAt).toDateString()===new Date(r.date).toDateString())),r.status==="complete"&&(i=i.filter(n=>n.completed)),r.status==="pending"&&(i=i.filter(n=>!n.completed)),p(i)},[r,t]);const j=i=>{const n=Number(i.firstWeight||0),w=Number(i.secondWeight||0),N=Number(i.netWeight||0),k=Number(i.netWeightMaund||0),z=Number(i.netWeightTon||0),D=`<!DOCTYPE html><html><head><title>Weight Bridge Slip — ${i.invoiceCode}</title>
<style>@page{size:A4;margin:14mm}*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Segoe UI",Arial,sans-serif;color:#111;font-size:12px}.wrap{max-width:660px;margin:auto}.hdr{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #111;padding-bottom:12px;margin-bottom:16px}.hdr-left h1{font-size:18px;font-weight:800;color:#111;text-transform:uppercase;letter-spacing:-.3px}.hdr-left p{font-size:10px;color:#555;margin-top:2px}.hdr-right{text-align:right}.hdr-right h2{font-size:14px;font-weight:800;color:#111;text-transform:uppercase;letter-spacing:1px}.badge{display:inline-block;background:#111;color:#fff;font-size:13px;font-weight:700;padding:4px 12px;border-radius:6px;margin-top:6px;font-family:"Courier New",monospace;letter-spacing:1px}.info{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}.box{border:1px solid #ddd;border-radius:6px;padding:8px 10px}.box h4{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#555;border-bottom:1px solid #eee;padding-bottom:4px;margin-bottom:6px}.box p{font-size:11px;margin:2px 0}table{width:100%;border-collapse:collapse;margin-top:10px;font-size:11px}thead tr{background:#111;color:#fff}th{padding:7px 8px;text-align:left;font-weight:600;font-size:10px;text-transform:uppercase;letter-spacing:.08em}th.r,td.r{text-align:right}td{border:1px solid #ddd;padding:6px 8px}tr.net td{font-weight:800;background:#f5f5f5;font-size:13px}tr.unit td{color:#555}.sig{display:flex;justify-content:space-between;margin-top:44px;font-size:11px}.sig div{text-align:center}.sig span{display:block;width:160px;border-top:1px solid #555;padding-top:4px;margin-top:40px}.footer{text-align:center;margin-top:28px;font-size:10px;color:#888}</style></head><body>
<div class="wrap"><div class="hdr"><div class="hdr-left"><h1>Al Rehman Rice Mills</h1><p>Deepalpur Road, Babarkhai, Arzanipur, Chunian, Kasur – Pakistan</p></div><div class="hdr-right"><h2>Weight Bridge Slip</h2><div class="badge">${i.invoiceCode}</div><p style="font-size:10px;color:#555;margin-top:6px;">${new Date(i.createdAt).toLocaleString("en-PK")}</p></div></div>
<div class="info"><div class="box"><h4>Party Details</h4><p><b>Vendor:</b> ${i.vendorName}</p><p><b>Product:</b> ${h(i)}</p></div><div class="box"><h4>Transport Details</h4><p><b>Vehicle No.:</b> ${i.vehicleNumber||"—"}</p><p><b>Vehicle Type:</b> ${i.vehicleType}</p><p><b>Rate:</b> Rs ${o(i.rate)}</p></div></div>
<table><thead><tr><th>Description</th><th class="r">Weight (kg)</th><th>Driver</th><th>Time</th></tr></thead><tbody>
<tr><td>First Weight</td><td class="r">${o(n)}</td><td>${i.firstWeightWithDriver?"With Driver":"Without Driver"}</td><td>${g(i.firstWeightTime||i.createdAt)}</td></tr>
<tr><td>Second Weight</td><td class="r">${w?o(w):"—"}</td><td>${i.secondWeight?i.secondWeightWithDriver?"With Driver":"Without Driver":"—"}</td><td>${g(i.secondWeightTime)}</td></tr>
<tr class="net"><td>Net Weight</td><td class="r">${o(N)}</td><td colspan="2"></td></tr>
<tr class="unit"><td>Net Weight (Maund)</td><td class="r">${k.toFixed(2)} Mn</td><td colspan="2"></td></tr>
<tr class="unit"><td>Net Weight (Metric Ton)</td><td class="r">${z.toFixed(2)} T</td><td colspan="2"></td></tr>
</tbody></table>
<div class="sig"><div><span>Authorized Signature</span></div><div><span>Receiver's Signature</span></div><div><span>Stamp</span></div></div>
<p class="footer">This is a computer-generated slip. Thank you for your business.</p>
</div><script>window.onload=()=>window.print();<\/script></body></html>`,y=window.open("","_blank");y.document.write(D),y.document.close()},m=a.length,b=a.filter(i=>i.completed).length,W=m-b,S=a.filter(i=>i.completed).reduce((i,n)=>i+(n.netWeight||0),0),u=r.vendor||r.product||r.date||r.status;return e.jsxs(C,{children:[e.jsxs("style",{children:[$,F]}),e.jsxs("div",{className:"wbr",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:18},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"Operations"}),e.jsx("h1",{style:{margin:0,fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px"},children:"Weight Bridge Invoices"})]}),!l&&e.jsxs("span",{style:{fontSize:12,color:"#9ca3af",fontFamily:"'DM Mono',monospace"},children:[a.length,a.length!==t.length&&e.jsxs("span",{children:[" / ",t.length]}),e.jsxs("span",{style:{fontFamily:"'DM Sans',sans-serif",marginLeft:4},children:["entr",a.length!==1?"ies":"y"]})]})]}),e.jsx("div",{className:"wbr-stats",style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16},children:[{cls:"s1",label:"Total Entries",value:m,unit:""},{cls:"s2",label:"Complete",value:b,unit:""},{cls:"s3",label:"Pending",value:W,unit:""},{cls:"s4",label:"Total Net Weight",value:o(Math.round(S)),unit:"kg"}].map(i=>e.jsxs("div",{className:`wbr-stat ${i.cls}`,children:[e.jsx("p",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",margin:"0 0 5px"},children:i.label}),e.jsxs("p",{className:"wbr-mono",style:{fontSize:20,fontWeight:700,color:"#111827",lineHeight:1,margin:0},children:[i.value,i.unit&&e.jsx("span",{style:{fontSize:11,color:"#9ca3af",marginLeft:4,fontFamily:"'DM Sans',sans-serif"},children:i.unit})]})]},i.cls))}),e.jsxs("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:"12px 14px",marginBottom:14},children:[e.jsx("p",{style:{fontSize:10,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".08em",margin:"0 0 10px"},children:"Filter"}),e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:10,alignItems:"flex-end"},children:[e.jsxs("div",{style:{flex:1,minWidth:160},children:[e.jsx("label",{style:f,children:"Vendor"}),e.jsx("input",{type:"text",className:"wbr-inp",placeholder:"Vendor name…",value:r.vendor,onChange:i=>s({...r,vendor:i.target.value})})]}),e.jsxs("div",{style:{flex:1,minWidth:160},children:[e.jsx("label",{style:f,children:"Product"}),e.jsx("input",{type:"text",className:"wbr-inp",placeholder:"Product name…",value:r.product,onChange:i=>s({...r,product:i.target.value})})]}),e.jsxs("div",{children:[e.jsx("label",{style:f,children:"Date"}),e.jsx("input",{type:"date",className:"wbr-inp",value:r.date,onChange:i=>s({...r,date:i.target.value})})]}),e.jsxs("div",{children:[e.jsx("label",{style:f,children:"Status"}),e.jsx("div",{className:"wbr-sel-wrap",children:e.jsxs("select",{className:"wbr-sel",value:r.status,onChange:i=>s({...r,status:i.target.value}),children:[e.jsx("option",{value:"",children:"All Status"}),e.jsx("option",{value:"complete",children:"Complete"}),e.jsx("option",{value:"pending",children:"Pending"})]})})]}),u&&e.jsx("button",{onClick:()=>s({vendor:"",product:"",date:"",status:""}),style:{padding:"7px 12px",borderRadius:6,border:"1px solid #fecaca",background:"#fef2f2",fontSize:12.5,fontWeight:500,color:"#dc2626",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"},children:"Clear"})]})]}),l?e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[...Array(4)].map((i,n)=>e.jsxs("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"12px 14px",borderBottom:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between"},children:[e.jsx("div",{className:"wbr-skel",style:{width:100}}),e.jsx("div",{className:"wbr-skel",style:{width:70}})]}),e.jsxs("div",{style:{padding:"12px 14px"},children:[e.jsx("div",{className:"wbr-skel",style:{width:"70%",marginBottom:8}}),e.jsx("div",{className:"wbr-skel",style:{width:"50%"}})]})]},n))}):a.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"56px 0",background:"#fff",border:"1px solid #e5e7eb",borderRadius:8},children:[e.jsx("div",{style:{fontSize:36,marginBottom:10},children:"⚖️"}),e.jsx("p",{style:{fontSize:13,fontWeight:600,color:"#374151",margin:"0 0 4px"},children:"No entries found"}),e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"Try adjusting your filters"})]}):e.jsxs(e.Fragment,{children:[a.length>0&&e.jsxs("p",{style:{fontSize:11.5,color:"#9ca3af",margin:"0 0 12px",fontFamily:"'DM Mono',monospace"},children:[a.length," entr",a.length!==1?"ies":"y",u?` · filtered from ${t.length} total`:""]}),e.jsx("div",{className:"wbr-cards",style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:a.map((i,n)=>e.jsx("div",{style:{animationDelay:`${n*.03}s`},children:e.jsx(A,{e:i,onPrint:j})},i._id))})]})]})]})}export{I as default};
