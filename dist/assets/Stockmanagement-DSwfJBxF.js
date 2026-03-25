import{a as Q,A as K,j as t,S as H,N as _}from"./index-TwQyCzAv.js";import{b as c}from"./react-BBT0yyZ1.js";const U="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",V=`
  *, *::before, *::after { box-sizing: border-box; }
  .sm { font-family: 'DM Sans', sans-serif; color: #111827; }

  /* inputs */
  .sm-inp {
    border: 1px solid #d1d5db; border-radius: 6px; padding: 7px 10px;
    font-size: 12.5px; font-family: 'DM Sans', sans-serif; color: #111827;
    background: #fff; outline: none; transition: border-color .12s, box-shadow .12s;
    appearance: none; width: 100%;
  }
  .sm-inp::placeholder { color: #9ca3af; }
  .sm-inp:focus { border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12); }

  /* stat bar */
  .sm-statbar {
    display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; margin-bottom: 12px;
  }
  @media (max-width: 1100px) { .sm-statbar { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 560px)  { .sm-statbar { grid-template-columns: repeat(2, 1fr); } }

  .sm-stat {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 7px; padding: 10px 12px; position: relative; overflow: hidden;
  }
  .sm-stat::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background: var(--ac, #d1d5db); }

  /* product pill bar */
  .sm-pill-bar {
    display: flex; gap: 6px; overflow-x: auto; padding-bottom: 2px;
    scrollbar-width: none;
  }
  .sm-pill-bar::-webkit-scrollbar { display: none; }
  .sm-pill {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 10px; border-radius: 5px; white-space: nowrap;
    border: 1px solid #e5e7eb; background: #fff; cursor: pointer;
    font-size: 12px; font-weight: 500; color: #374151;
    font-family: 'DM Sans', sans-serif; transition: all .1s; flex-shrink: 0;
  }
  .sm-pill:hover { border-color: #d1d5db; background: #f9fafb; }
  .sm-pill.on { background: #111827; color: #fff; border-color: #111827; }
  .sm-pill-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .sm-pill-count {
    font-size: 10px; font-family: 'DM Mono', monospace;
    opacity: .65; margin-left: 1px;
  }

  /* product mini-stats strip (shown when a product is active) */
  .sm-prod-stats {
    display: flex; gap: 0; background: #fff;
    border: 1px solid #e5e7eb; border-radius: 7px; overflow: hidden;
    margin-bottom: 10px;
  }
  .sm-prod-stat-cell {
    flex: 1; padding: 8px 12px; border-right: 1px solid #f3f4f6;
    min-width: 0;
  }
  .sm-prod-stat-cell:last-child { border-right: none; }

  /* filter row */
  .sm-filter-grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr 1fr auto;
    gap: 9px; align-items: end;
  }
  @media (max-width: 700px) {
    .sm-filter-grid { grid-template-columns: 1fr 1fr; }
  }

  /* table */
  .sm-tbl { width: 100%; border-collapse: collapse; font-size: 12.5px; }
  .sm-tbl thead tr { background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
  .sm-tbl thead th {
    padding: 9px 11px; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .07em;
    color: #9ca3af; text-align: left; white-space: nowrap;
  }
  .sm-tbl thead th.r { text-align: right; }
  .sm-tbl tbody tr { border-bottom: 1px solid #f9fafb; transition: background .08s; }
  .sm-tbl tbody tr:hover { background: #fafafa; }
  .sm-td   { padding: 9px 11px; vertical-align: middle; }
  .sm-td-r { padding: 9px 11px; text-align: right; vertical-align: middle; white-space: nowrap; }

  /* badges */
  .sm-badge-in  { display:inline-flex; align-items:center; padding:2px 7px; border-radius:4px; font-size:10.5px; font-weight:600; background:#f0fdf4; color:#15803d; border:1px solid #bbf7d0; white-space:nowrap; }
  .sm-badge-out { display:inline-flex; align-items:center; padding:2px 7px; border-radius:4px; font-size:10.5px; font-weight:600; background:#fef2f2; color:#dc2626; border:1px solid #fecaca; white-space:nowrap; }

  .sm-dr { font-size:9px; font-weight:700; padding:1px 5px; border-radius:3px; background:#f0fdf4; color:#15803d; text-transform:uppercase; letter-spacing:.04em; flex-shrink:0; }
  .sm-cr { font-size:9px; font-weight:700; padding:1px 5px; border-radius:3px; background:#fef2f2; color:#dc2626; text-transform:uppercase; letter-spacing:.04em; flex-shrink:0; }

  .sm-tot td { background: #f9fafb; font-weight: 700; border-top: 2px solid #e5e7eb; }

  @keyframes sm-shimmer { to { background-position: -200% 0; } }
  .sm-sk {
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    background-size: 200%; animation: sm-shimmer 1.3s infinite; border-radius: 5px;
  }

  @media print {
    .sm-nopr { display: none !important; }
    .sm-tbl { font-size: 10px; }
    .sm-td, .sm-td-r { padding: 5px 7px; }
  }
`,i=a=>isNaN(Number(a))?0:Number(a)||0,o=(a,f=2)=>i(a).toLocaleString("en-PK",{minimumFractionDigits:f,maximumFractionDigits:f}),x=a=>i(a).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0}),p=a=>i(a).toLocaleString("en-PK",{minimumFractionDigits:4,maximumFractionDigits:4}),T=["#374151","#15803d","#b45309","#1d4ed8","#7c3aed","#0e7490","#be185d","#dc2626"],Y=a=>T[a%T.length];function G(a,f,l){const z=a.map(d=>{const b=d.type==="purchase";return`<tr style="background:${b?"#f0fdf4":"#fef2f2"}">
      <td>${d.date}</td>
      <td style="font-weight:700;color:${b?"#15803d":"#dc2626"}">${d.invoiceNo}</td>
      <td>
        <div style="margin-bottom:3px"><span style="font-size:8px;font-weight:700;padding:1px 4px;border-radius:3px;background:#f0fdf4;color:#15803d">DR</span>
        <strong style="margin-left:4px">${d.drAccountName}</strong></div>
        <div style="padding-left:8px;border-left:2px solid #e5e7eb"><span style="font-size:8px;font-weight:700;padding:1px 4px;border-radius:3px;background:#fef2f2;color:#dc2626">CR</span>
        <span style="margin-left:4px">${d.crAccountName}</span></div>
      </td>
      <td style="font-size:10px">${d.bags} bags · ${p(d.maund)} Maund<br>Rate: Rs ${x(d.rate)}</td>
      <td style="text-align:center;font-size:9px;font-weight:700;color:${b?"#15803d":"#dc2626"}">${b?"▲ IN":"▼ OUT"}</td>
      <td style="text-align:right;font-weight:700;color:#15803d">Rs ${o(d.debit)}</td>
      <td style="text-align:right;font-weight:700;color:#dc2626">Rs ${o(d.credit)}</td>
    </tr>`}).join("");return`<!DOCTYPE html><html><head><title>Stock Ledger${f?" — "+f:""}</title>
<style>@page{size:A4 landscape;margin:10mm}body{font-family:"Segoe UI",Arial,sans-serif;color:#111;font-size:10px}
.hd{display:flex;justify-content:space-between;border-bottom:3px solid #111;padding-bottom:8px;margin-bottom:12px}
.co{font-size:15px;font-weight:800}.ca{font-size:9px;color:#6b7280;margin-top:2px}
.sum{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px}
.sb{border:1px solid #e5e7eb;border-radius:5px;padding:6px 9px}
.sl{font-size:7.5px;text-transform:uppercase;letter-spacing:.05em;color:#9ca3af}
.sv{font-size:12px;font-weight:700}
table{width:100%;border-collapse:collapse}
thead tr{background:#111;color:#fff}
th{padding:5px 7px;text-align:left;font-size:8.5px;font-weight:700;text-transform:uppercase}
th.r{text-align:right}
td{border:1px solid #e5e7eb;padding:5px 7px;vertical-align:top}
.ft td{font-weight:700;background:#f9fafb;border-top:2px solid #111}
</style></head><body>
<div class="hd">
  <div><div class="co">Al Rehman Rice Mills</div><div class="ca">Deepalpur Road, Babarkhai, Arzanipur, Chunian, Kasur – Pakistan</div></div>
  <div style="text-align:right"><strong>STOCK MANAGEMENT LEDGER${f?" — "+f:""}</strong><br>
  <span style="font-size:9px;color:#9ca3af">Printed: ${new Date().toLocaleDateString("en-PK",{day:"2-digit",month:"short",year:"numeric"})}</span></div>
</div>
<div class="sum">
  <div class="sb"><div class="sl">Stock In</div><div class="sv">Rs ${o(l.totalStockIn)}</div></div>
  <div class="sb"><div class="sl">Stock Out</div><div class="sv">Rs ${o(l.totalStockOut)}</div></div>
  <div class="sb"><div class="sl">Maund In / Out</div><div class="sv">${p(l.totalMaundIn)} / ${p(l.totalMaundOut)}</div></div>
  <div class="sb"><div class="sl">Bags In / Out</div><div class="sv">${x(l.totalQtyIn)} / ${x(l.totalQtyOut)}</div></div>
</div>
<table>
  <thead><tr><th>Date</th><th>Invoice</th><th>Particulars</th><th>Description</th>
  <th>Type</th><th class="r">Debit (DR)</th><th class="r">Credit (CR)</th></tr></thead>
  <tbody>${z}</tbody>
  <tfoot class="ft"><tr>
    <td colspan="5"><strong>Totals — ${a.length} entries</strong></td>
    <td style="text-align:right"><strong>Rs ${o(l.totalStockIn)}</strong></td>
    <td style="text-align:right"><strong>Rs ${o(l.totalStockOut)}</strong></td>
  </tr></tfoot>
</table>
</body></html>`}function q(){return t.jsx("tr",{children:[70,60,170,140,50,110,110].map((a,f)=>t.jsx("td",{className:"sm-td",children:t.jsx("div",{className:"sm-sk",style:{width:a,height:11}})},f))})}function Z(){const[a,f]=c.useState([]),[l,z]=c.useState([]),[d,b]=c.useState({}),[D,L]=c.useState(!0),[$,R]=c.useState({message:"",type:"info"}),[m,k]=c.useState(""),[y,W]=c.useState(""),[v,O]=c.useState(""),[j,C]=c.useState(""),[S,F]=c.useState("");c.useEffect(()=>{(async()=>{try{const s=await(await Q(`${K}/stock/entries`)).json();s.success?(f(s.entries),z(s.perProduct||[]),b(s.summary||{})):R({message:s.message||"Failed to load",type:"error"})}catch{R({message:"Server error.",type:"error"})}finally{L(!1)}})()},[]);const r=c.useMemo(()=>a.filter(e=>{if(m&&e.productName!==m||S&&e.type!==S||v&&new Date(e.date)<new Date(v)||j&&new Date(e.date)>new Date(j))return!1;if(y){const s=y.toLowerCase();if(!e.productName?.toLowerCase().includes(s)&&!e.vendorName?.toLowerCase().includes(s)&&!e.invoiceNo?.toLowerCase().includes(s)&&!e.vehicleNo?.toLowerCase().includes(s))return!1}return!0}),[a,m,S,v,j,y]),w=m||y||v||j||S,n=w?{totalStockIn:r.filter(e=>e.type==="purchase").reduce((e,s)=>e+i(s.amount),0),totalStockOut:r.filter(e=>e.type==="sale").reduce((e,s)=>e+i(s.amount),0),totalMaundIn:r.filter(e=>e.type==="purchase").reduce((e,s)=>e+i(s.maund),0),totalMaundOut:r.filter(e=>e.type==="sale").reduce((e,s)=>e+i(s.maund),0),totalQtyIn:r.filter(e=>e.type==="purchase").reduce((e,s)=>e+i(s.bags),0),totalQtyOut:r.filter(e=>e.type==="sale").reduce((e,s)=>e+i(s.bags),0)}:d,u=i(n.totalStockIn)-i(n.totalStockOut),M=i(n.totalMaundIn)-i(n.totalMaundOut),P=()=>{const e=window.open("","_blank");e&&(e.document.write(G(r,m||null,n)),e.document.close())},A=()=>{W(""),O(""),C(""),F(""),k("")},h=l.find(e=>e.productName===m),N={fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#6b7280",display:"block",marginBottom:5};return t.jsxs(H,{children:[t.jsxs("style",{children:[U,V]}),t.jsx(_,{message:$.message,type:$.type,onClose:()=>R({message:"",type:"info"})}),t.jsxs("div",{className:"sm",children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:14},children:[t.jsxs("div",{children:[t.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"Operations"}),t.jsx("h1",{style:{margin:0,fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px"},children:"Stock Ledger"})]}),t.jsxs("div",{className:"sm-nopr",style:{display:"flex",alignItems:"center",gap:8},children:[!D&&t.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:11.5,color:"#9ca3af",background:"#f3f4f6",padding:"4px 10px",borderRadius:5,border:"1px solid #e5e7eb"},children:[r.length,r.length!==a.length&&t.jsxs("span",{style:{color:"#d1d5db"},children:[" / ",a.length]}),t.jsx("span",{style:{fontFamily:"'DM Sans',sans-serif",marginLeft:4},children:"entries"})]}),t.jsxs("button",{onClick:P,style:{display:"inline-flex",alignItems:"center",gap:6,background:"#111827",color:"#fff",border:"none",borderRadius:6,padding:"7px 14px",fontSize:12.5,fontWeight:500,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",transition:"background .1s",whiteSpace:"nowrap"},onMouseEnter:e=>e.currentTarget.style.background="#1f2937",onMouseLeave:e=>e.currentTarget.style.background="#111827",children:[t.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"})}),"Print Ledger"]})]})]}),t.jsx("div",{className:"sm-statbar",children:[{label:"Stock In",value:`Rs ${o(n.totalStockIn)}`,ac:"#15803d"},{label:"Stock Out",value:`Rs ${o(n.totalStockOut)}`,ac:"#dc2626"},{label:"Net Balance",value:`Rs ${o(Math.abs(u))}`,ac:u>=0?"#15803d":"#dc2626",sub:u>=0?"surplus":"deficit"},{label:"Maund In",value:p(n.totalMaundIn),ac:"#15803d"},{label:"Maund Out",value:p(n.totalMaundOut),ac:"#dc2626"},{label:"Net Maund",value:p(Math.abs(M)),ac:M>=0?"#15803d":"#dc2626",sub:`${x(n.totalQtyIn)} / ${x(n.totalQtyOut)} bags`}].map(e=>t.jsxs("div",{className:"sm-stat",style:{"--ac":e.ac},children:[t.jsx("p",{style:{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",margin:"0 0 4px"},children:e.label}),t.jsx("p",{style:{fontFamily:"'DM Mono',monospace",fontSize:14,fontWeight:700,color:"#111827",lineHeight:1,margin:0},children:e.value}),e.sub&&t.jsx("p",{style:{fontSize:10.5,color:"#9ca3af",margin:"3px 0 0"},children:e.sub})]},e.label))}),!D&&l.length>0&&t.jsx("div",{className:"sm-nopr",style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:"10px 12px",marginBottom:10},children:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[t.jsx("span",{style:{fontSize:10,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".07em",flexShrink:0},children:"Product"}),t.jsxs("div",{className:"sm-pill-bar",children:[t.jsxs("button",{className:`sm-pill${m?"":" on"}`,onClick:()=>k(""),children:[t.jsx("span",{children:"All"}),t.jsx("span",{className:"sm-pill-count",children:a.length})]}),l.map((e,s)=>{const g=m===e.productName,I=Y(s),B=a.filter(E=>E.productName===e.productName).length;return t.jsxs("button",{className:`sm-pill${g?" on":""}`,onClick:()=>k(g?"":e.productName),children:[t.jsx("span",{className:"sm-pill-dot",style:{background:g?"rgba(255,255,255,.7)":I}}),e.productName,t.jsx("span",{className:"sm-pill-count",children:B})]},e.accountId||s)})]})]})}),m&&h&&t.jsxs("div",{className:"sm-prod-stats sm-nopr",style:{marginBottom:10},children:[[["Purchased",`Rs ${o(h.totalStockIn)}`,"#15803d"],["Sold",`Rs ${o(h.totalStockOut)}`,"#dc2626"],["Maund In",p(h.totalMaundIn),"#15803d"],["Maund Out",p(h.totalMaundOut),"#dc2626"],["Net",`Rs ${o(Math.abs(i(h.totalStockIn)-i(h.totalStockOut)))}`,i(h.totalStockIn)>=i(h.totalStockOut)?"#15803d":"#dc2626"]].map(([e,s,g])=>t.jsxs("div",{className:"sm-prod-stat-cell",children:[t.jsx("p",{style:{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",margin:"0 0 2px"},children:e}),t.jsx("p",{style:{fontFamily:"'DM Mono',monospace",fontSize:12.5,fontWeight:700,color:g,margin:0},children:s})]},e)),t.jsx("div",{className:"sm-prod-stat-cell",style:{display:"flex",alignItems:"center"},children:t.jsx("button",{onClick:()=>k(""),style:{padding:"4px 9px",borderRadius:5,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",fontSize:11.5,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap"},children:"✕ Clear"})})]}),t.jsx("div",{className:"sm-nopr",style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:"11px 12px",marginBottom:10},children:t.jsxs("div",{className:"sm-filter-grid",children:[t.jsxs("div",{children:[t.jsx("label",{style:N,children:"Search"}),t.jsxs("div",{style:{position:"relative"},children:[t.jsxs("svg",{style:{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"},width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2,children:[t.jsx("circle",{cx:11,cy:11,r:8}),t.jsx("path",{strokeLinecap:"round",d:"M21 21l-4.35-4.35"})]}),t.jsx("input",{className:"sm-inp",value:y,onChange:e=>W(e.target.value),placeholder:"Invoice, vendor, vehicle…",style:{paddingLeft:28}})]})]}),t.jsxs("div",{children:[t.jsx("label",{style:N,children:"From"}),t.jsx("input",{type:"date",className:"sm-inp",value:v,onChange:e=>O(e.target.value)})]}),t.jsxs("div",{children:[t.jsx("label",{style:N,children:"To"}),t.jsx("input",{type:"date",className:"sm-inp",value:j,onChange:e=>C(e.target.value)})]}),t.jsxs("div",{children:[t.jsx("label",{style:N,children:"Type"}),t.jsxs("div",{style:{position:"relative"},children:[t.jsxs("select",{className:"sm-inp",value:S,onChange:e=>F(e.target.value),style:{paddingRight:26},children:[t.jsx("option",{value:"",children:"All"}),t.jsx("option",{value:"purchase",children:"Stock In"}),t.jsx("option",{value:"sale",children:"Stock Out"})]}),t.jsx("svg",{style:{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"},width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2.5,children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]})]}),t.jsx("div",{style:{paddingTop:20},children:t.jsx("button",{onClick:A,style:{padding:"7px 11px",borderRadius:6,border:"1px solid #e5e7eb",background:"#fff",fontSize:12.5,fontWeight:500,cursor:w?"pointer":"default",color:w?"#dc2626":"#9ca3af",opacity:w?1:.4,fontFamily:"'DM Sans',sans-serif",transition:"all .1s",whiteSpace:"nowrap"},children:"Clear"})})]})}),t.jsx("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden"},children:t.jsx("div",{style:{overflowX:"auto"},children:t.jsxs("table",{className:"sm-tbl",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{style:{width:82},children:"Date"}),t.jsx("th",{style:{width:66},children:"Invoice"}),t.jsx("th",{style:{minWidth:190},children:"Particulars"}),t.jsx("th",{style:{minWidth:180},children:"Description"}),t.jsx("th",{style:{width:56,textAlign:"center"},children:"Type"}),t.jsx("th",{className:"r",style:{width:120},children:"Debit (DR)"}),t.jsx("th",{className:"r",style:{width:120},children:"Credit (CR)"})]})}),t.jsx("tbody",{children:D?[...Array(6)].map((e,s)=>t.jsx(q,{},s)):r.length===0?t.jsx("tr",{children:t.jsxs("td",{colSpan:7,style:{padding:"48px",textAlign:"center"},children:[t.jsx("div",{style:{fontSize:30,marginBottom:10},children:"📦"}),t.jsx("p",{style:{fontSize:13,fontWeight:600,color:"#374151",margin:"0 0 4px"},children:"No entries found"}),t.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:a.length===0?"Create products and save invoices to see stock entries here.":"Try adjusting your filters."})]})}):t.jsxs(t.Fragment,{children:[r.map(e=>{const s=e.type==="purchase";return t.jsxs("tr",{style:{background:s?"#fafffe":"#fffafa"},children:[t.jsx("td",{className:"sm-td",children:t.jsx("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:11.5,fontWeight:500,color:"#374151"},children:e.date})}),t.jsx("td",{className:"sm-td",children:t.jsx("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:700,color:s?"#15803d":"#dc2626"},children:e.invoiceNo})}),t.jsxs("td",{className:"sm-td",children:[t.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:5,marginBottom:5},children:[t.jsx("span",{className:"sm-dr",children:"DR"}),t.jsxs("div",{children:[t.jsx("div",{style:{fontSize:12.5,fontWeight:600,color:"#111827",lineHeight:1.3},children:e.drAccountName}),s&&t.jsx("div",{style:{fontSize:10.5,color:"#9ca3af",marginTop:1},children:e.productName})]})]}),t.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:5,paddingLeft:5,borderLeft:"2px solid #f3f4f6"},children:[t.jsx("span",{className:"sm-cr",children:"CR"}),t.jsxs("div",{children:[t.jsx("div",{style:{fontSize:12,fontWeight:500,color:"#374151",lineHeight:1.3},children:e.crAccountName}),!s&&t.jsx("div",{style:{fontSize:10.5,color:"#9ca3af",marginTop:1},children:e.productName})]})]})]}),t.jsx("td",{className:"sm-td",children:t.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px 8px"},children:[["Bags",x(e.bags)],["Rate/40kg",`Rs ${x(e.rate)}`],["Maund",p(e.maund)],["Weight",`${o(e.netWeightKg)} kg`],["Vehicle",e.vehicleNo],["Vendor",e.vendorName]].map(([g,I])=>t.jsxs("div",{children:[t.jsx("div",{style:{fontSize:8.5,color:"#9ca3af",fontWeight:700,textTransform:"uppercase",letterSpacing:".05em"},children:g}),t.jsx("div",{style:{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:500,color:"#374151"},children:I||"—"})]},g))})}),t.jsx("td",{className:"sm-td",style:{textAlign:"center"},children:t.jsx("span",{className:s?"sm-badge-in":"sm-badge-out",children:s?"▲ IN":"▼ OUT"})}),t.jsxs("td",{className:"sm-td-r",children:[t.jsxs("div",{style:{fontFamily:"'DM Mono',monospace",fontSize:13,fontWeight:700,color:"#15803d"},children:["Rs ",o(e.debit)]}),t.jsx("div",{style:{fontSize:9.5,color:"#9ca3af",marginTop:1},children:e.drAccountName})]}),t.jsxs("td",{className:"sm-td-r",children:[t.jsxs("div",{style:{fontFamily:"'DM Mono',monospace",fontSize:13,fontWeight:700,color:"#dc2626"},children:["Rs ",o(e.credit)]}),t.jsx("div",{style:{fontSize:9.5,color:"#9ca3af",marginTop:1},children:e.crAccountName})]})]},e._id)}),t.jsxs("tr",{className:"sm-tot",children:[t.jsx("td",{className:"sm-td",colSpan:5,children:t.jsxs("span",{style:{fontSize:10.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#374151"},children:["Totals — ",r.length," entr",r.length!==1?"ies":"y",m&&` · ${m}`]})}),t.jsxs("td",{className:"sm-td-r",children:[t.jsxs("div",{style:{fontFamily:"'DM Mono',monospace",fontSize:13,fontWeight:700,color:"#15803d"},children:["Rs ",o(n.totalStockIn)]}),t.jsxs("div",{style:{fontSize:9.5,color:"#9ca3af",marginTop:1},children:[p(n.totalMaundIn)," Maund"]})]}),t.jsxs("td",{className:"sm-td-r",children:[t.jsxs("div",{style:{fontFamily:"'DM Mono',monospace",fontSize:13,fontWeight:700,color:"#dc2626"},children:["Rs ",o(n.totalStockOut)]}),t.jsxs("div",{style:{fontSize:9.5,color:"#9ca3af",marginTop:1},children:[p(n.totalMaundOut)," Maund"]})]})]}),t.jsx("tr",{children:t.jsx("td",{colSpan:7,style:{padding:"8px 11px",background:"#f9fafb",borderTop:"1px solid #f3f4f6"},children:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,fontSize:12,flexWrap:"wrap"},children:[t.jsx("span",{style:{color:"#6b7280",fontWeight:500},children:"Net:"}),t.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:12.5,color:u>=0?"#15803d":"#dc2626"},children:[u>=0?"+":"−"," Rs ",o(Math.abs(u)),t.jsxs("span",{style:{fontSize:10,fontWeight:400,marginLeft:5,color:"#9ca3af"},children:["(",u>=0?"surplus":"deficit",")"]})]}),t.jsx("span",{style:{color:"#e5e7eb"},children:"·"}),t.jsxs("span",{style:{color:"#6b7280"},children:["Maund: ",t.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontWeight:600,color:"#374151"},children:[p(Math.abs(M))," ",M>=0?"in surplus":"out deficit"]})]}),t.jsx("span",{style:{color:"#e5e7eb"},children:"·"}),t.jsxs("span",{style:{color:"#6b7280"},children:["Bags: ",t.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontWeight:600,color:"#374151"},children:[x(n.totalQtyIn)," in / ",x(n.totalQtyOut)," out"]})]})]})})})]})})]})})})]})]})}export{Z as default};
