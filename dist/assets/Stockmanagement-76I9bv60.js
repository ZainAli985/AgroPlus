import{a as F,A,j as t,S as L,N as J}from"./index-DhWBYm7P.js";import{b as p}from"./react-BBT0yyZ1.js";const E="@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');",H=`
  *,*::before,*::after{box-sizing:border-box}
  .sm-wrap{font-family:'Plus Jakarta Sans',sans-serif;color:#111827;max-width:1200px;margin:0 auto}
  .sm-mono{font-family:'JetBrains Mono',monospace}

  /* Stats */
  .sm-stat{background:#fff;border:1.5px solid #f1f5f9;border-radius:14px;padding:16px 18px;transition:box-shadow .18s}
  .sm-stat:hover{box-shadow:0 4px 16px rgba(0,0,0,.06)}

  /* Ledger table */
  .sm-table{width:100%;border-collapse:collapse;font-size:12.5px}
  .sm-table thead th{
    background:#0f172a;color:#e2e8f0;padding:10px 14px;text-align:left;
    font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;
    white-space:nowrap;
  }
  .sm-table thead th.r{text-align:right}
  .sm-table thead th.c{text-align:center}
  .sm-table tbody tr{border-bottom:1px solid #f8fafc;transition:background .08s}
  .sm-table tbody tr:hover{background:#f8fafc}

  /* Purchase row (stock in) */
  .sm-row-purchase{background:#fafffe}
  .sm-row-purchase:hover{background:#f0fdf9 !important}

  /* Sale row (stock out) */
  .sm-row-sale{background:#fefcff}
  .sm-row-sale:hover{background:#f5f3ff !important}

  /* Summary total row */
  .sm-row-total td{background:#f1f5f9;font-weight:700;border-top:2px solid #e2e8f0}

  .sm-td{padding:11px 14px;vertical-align:top}
  .sm-td-r{padding:11px 14px;text-align:right;vertical-align:top;white-space:nowrap}
  .sm-td-c{padding:11px 14px;text-align:center;vertical-align:top}

  /* Type badge */
  .sm-badge-purchase{
    display:inline-flex;align-items:center;gap:4px;
    padding:2px 9px;border-radius:20px;font-size:10px;font-weight:700;
    background:#dcfce7;color:#16a34a;border:1px solid #bbf7d0;white-space:nowrap;
  }
  .sm-badge-sale{
    display:inline-flex;align-items:center;gap:4px;
    padding:2px 9px;border-radius:20px;font-size:10px;font-weight:700;
    background:#ede9fe;color:#7c3aed;border:1px solid #ddd6fe;white-space:nowrap;
  }

  /* Debit/Credit cells */
  .sm-debit{color:#0f172a;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600}
  .sm-credit{color:#0f172a;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600}
  .sm-debit-in{color:#16a34a}
  .sm-credit-out{color:#7c3aed}
  .sm-zero{color:#d1d5db}

  /* Filters */
  .sm-input,.sm-select{
    border:1.5px solid #e2e8f0;border-radius:10px;padding:8px 12px;
    font-size:13px;font-family:'Plus Jakarta Sans',sans-serif;color:#111827;
    background:#fff;outline:none;transition:border-color .12s,box-shadow .12s;
    appearance:none;
  }
  .sm-input:focus,.sm-select:focus{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.1)}
  .sm-input::placeholder{color:#9ca3af}

  /* Running balance strip */
  .sm-balance-row td{background:#fafafa;font-size:11px;color:#64748b;border-top:1px solid #f1f5f9}

  /* Print button */
  .sm-print-btn{
    display:inline-flex;align-items:center;gap:6px;
    background:#0f172a;color:#fff;border:none;border-radius:9px;
    padding:9px 16px;font-size:12.5px;font-weight:600;
    font-family:'Plus Jakarta Sans',sans-serif;cursor:pointer;
    transition:background .12s;white-space:nowrap;
  }
  .sm-print-btn:hover{background:#1e293b}

  /* Skeleton */
  @keyframes sm-shimmer{to{background-position:-200% 0}}
  .sm-sk{
    background:linear-gradient(90deg,#f3f4f6 25%,#fafafa 50%,#f3f4f6 75%);
    background-size:200% 100%;animation:sm-shimmer 1.3s infinite;border-radius:6px;
  }

  @media print{
    .sm-no-print{display:none!important}
    .sm-wrap{max-width:100%;padding:0}
    .sm-table{font-size:10px}
    .sm-td,.sm-td-r{padding:6px 8px}
  }
`,o=n=>isNaN(Number(n))?0:Number(n)||0,c=(n,l=2)=>o(n).toLocaleString("en-PK",{minimumFractionDigits:l,maximumFractionDigits:l}),f=n=>o(n).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0}),g=n=>o(n).toLocaleString("en-PK",{minimumFractionDigits:4,maximumFractionDigits:4});function y({label:n,value:l,sub:m,accent:x,prefix:s,mono:d}){return t.jsxs("div",{className:"sm-stat",children:[t.jsx("p",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#9ca3af",marginBottom:8},children:n}),t.jsxs("p",{style:{fontSize:20,fontWeight:800,color:x||"#111827",lineHeight:1,fontFamily:d?"'JetBrains Mono',monospace":void 0},children:[s&&t.jsx("span",{style:{fontSize:13,color:x||"#9ca3af",marginRight:3},children:s}),l]}),m&&t.jsx("p",{style:{fontSize:11,color:"#9ca3af",marginTop:5},children:m})]})}function Q(n,l,m){const x=n.map(s=>{const d=s.type==="purchase";return d||s.vendorName,d&&s.vendorName,`
      <tr style="background:${d?"#f0fdf4":"#faf5ff"}">
        <td>${s.date}</td>
        <td>${s.invoiceNo}</td>
        <td>
          <div style="margin-bottom:4px">
            <span style="font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;background:${d?"#dcfce7":"#ede9fe"};color:${d?"#16a34a":"#7c3aed"}">DR</span>
            <strong style="margin-left:4px">${s.drAccountName}</strong>
            ${d?`<div style="font-size:9px;color:#64748b;margin-left:26px">${s.productName}</div>`:""}
          </div>
          <div style="padding-left:8px;border-left:2px solid #e2e8f0">
            <span style="font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;background:${d?"#dcfce7":"#ede9fe"};color:${d?"#16a34a":"#7c3aed"}">CR</span>
            <span style="margin-left:4px;color:#374151">${s.crAccountName}</span>
            ${d?"":`<div style="font-size:9px;color:#64748b;margin-left:26px">${s.productName}</div>`}
          </div>
        </td>
        <td style="font-size:10px;color:#475569">
          ${s.quantity} bags &bull; ${g(s.maund)} Maund<br>
          Rate: Rs ${f(s.rate)} &bull; ${s.vehicleNo}
        </td>
        <td style="text-align:center">
          <span style="font-size:9px;font-weight:700;padding:2px 7px;border-radius:20px;background:${d?"#dcfce7":"#ede9fe"};color:${d?"#16a34a":"#7c3aed"};border:1px solid ${d?"#bbf7d0":"#ddd6fe"}">
            ${d?"IN":"OUT"}
          </span>
        </td>
        <td style="text-align:right;font-family:'Courier New',monospace;font-weight:700;color:#16a34a">
          <div style="font-size:8px;color:#16a34a;font-weight:400;margin-bottom:2px">DR · ${s.drAccountName}</div>
          Rs ${c(s.debit)}
        </td>
        <td style="text-align:right;font-family:'Courier New',monospace;font-weight:700;color:#7c3aed">
          <div style="font-size:8px;color:#7c3aed;font-weight:400;margin-bottom:2px">CR · ${s.crAccountName}</div>
          Rs ${c(s.credit)}
        </td>
      </tr>
    `}).join("");return`<!DOCTYPE html><html><head><title>Stock Management Ledger</title>
<style>
@page{size:A4 landscape;margin:10mm}
body{font-family:"Segoe UI",Arial,sans-serif;color:#111;font-size:11px}
.wrap{max-width:100%;margin:auto}
.head{border-bottom:3px solid #0f172a;padding-bottom:8px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:flex-start}
.co-name{font-size:16px;font-weight:800;color:#0f172a}
.co-addr{font-size:9px;color:#64748b;margin-top:2px}
.rpt-title{text-align:right}
.rpt-title h2{margin:0;font-size:14px;color:#4f46e5}
.rpt-title p{font-size:9px;color:#94a3b8;margin-top:2px}
.summary{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px}
.sum-box{border:1px solid #e2e8f0;border-radius:6px;padding:7px 10px}
.sum-lbl{font-size:8px;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-bottom:3px}
.sum-val{font-size:13px;font-weight:700;color:#0f172a;font-family:'Courier New',monospace}
table{width:100%;border-collapse:collapse;font-size:10px}
thead tr{background:#0f172a;color:#e2e8f0}
th{padding:6px 8px;text-align:left;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em}
th.r{text-align:right}th.c{text-align:center}
td{border:1px solid #e2e8f0;padding:5px 8px;vertical-align:top}
.foot td{font-weight:700;background:#f1f5f9;border-top:2px solid #0f172a}
.foot td.r{text-align:right}
</style></head><body>
<div class="wrap">
<div class="head">
  <div>
    <div class="co-name">Al Rehman Rice Mills</div>
    <div class="co-addr">Deepalpur Road, Babarkhai, Arzanipur, Chunian, Kasur – Pakistan</div>
  </div>
  <div class="rpt-title">
    <h2>STOCK MANAGEMENT LEDGER</h2>
    <p>Printed: ${new Date().toLocaleDateString("en-PK",{day:"2-digit",month:"short",year:"numeric"})}${m?" &bull; "+m:""}</p>
  </div>
</div>
<div class="summary">
  <div class="sum-box"><div class="sum-lbl">Total Stock In (Rs)</div><div class="sum-val">Rs ${c(l.totalStockIn)}</div></div>
  <div class="sum-box"><div class="sum-lbl">Total Stock Out (Rs)</div><div class="sum-val">Rs ${c(l.totalStockOut)}</div></div>
  <div class="sum-box"><div class="sum-lbl">Maund In / Out</div><div class="sum-val">${g(l.totalMaundIn)} / ${g(l.totalMaundOut)}</div></div>
  <div class="sum-box"><div class="sum-lbl">Bags In / Out</div><div class="sum-val">${f(l.totalQtyIn)} / ${f(l.totalQtyOut)}</div></div>
</div>
<table>
  <thead><tr>
    <th>Date</th><th>Invoice</th><th>Particulars</th><th>Description</th>
    <th class="c">Type</th><th class="r">Debit (Stock In)</th><th class="r">Credit (Stock Out)</th>
  </tr></thead>
  <tbody>${x}</tbody>
  <tfoot class="foot">
    <tr>
      <td colspan="5"><strong>TOTALS (${n.length} entries)</strong></td>
      <td class="r"><strong>Rs ${c(l.totalStockIn)}</strong></td>
      <td class="r"><strong>Rs ${c(l.totalStockOut)}</strong></td>
    </tr>
  </tfoot>
</table>
<p style="text-align:center;margin-top:20px;font-size:9px;color:#94a3b8">
  Stock Management Ledger — Al Rehman Rice Mills &bull; This is a computer-generated report.
</p>
</div><script>window.onload=()=>window.print()<\/script></body></html>`}function K(){return t.jsx("tr",{children:[60,80,180,160,55,90,90].map((n,l)=>t.jsx("td",{className:"sm-td",children:t.jsx("div",{className:"sm-sk",style:{width:n,height:13}})},l))})}function U(){const[n,l]=p.useState([]),[m,x]=p.useState({}),[s,d]=p.useState(!0),[N,k]=p.useState({message:"",type:"info"}),[v,z]=p.useState(""),[u,R]=p.useState(""),[b,$]=p.useState(""),[j,T]=p.useState(""),[S,W]=p.useState("");p.useEffect(()=>{(async()=>{try{const a=await(await F(`${A}/stock/entries`)).json();a.success?(l(a.entries),x(a.summary||{})):k({message:a.message||"Failed to load",type:"error"})}catch{k({message:"Server error.",type:"error"})}finally{d(!1)}})()},[]);const r=n.filter(e=>{if(j&&e.type!==j||S&&e.productName!==S||u&&new Date(e.date)<new Date(u)||b&&new Date(e.date)>new Date(b))return!1;if(v){const a=v.toLowerCase();if(!e.productName?.toLowerCase().includes(a)&&!e.vendorName?.toLowerCase().includes(a)&&!e.invoiceNo?.toLowerCase().includes(a)&&!e.vehicleNo?.toLowerCase().includes(a)&&!String(e.sr).includes(a))return!1}return!0}),M={totalStockIn:r.filter(e=>e.type==="purchase").reduce((e,a)=>e+o(a.amount),0),totalStockOut:r.filter(e=>e.type==="sale").reduce((e,a)=>e+o(a.amount),0),totalMaundIn:r.filter(e=>e.type==="purchase").reduce((e,a)=>e+o(a.maund),0),totalMaundOut:r.filter(e=>e.type==="sale").reduce((e,a)=>e+o(a.maund),0),totalQtyIn:r.filter(e=>e.type==="purchase").reduce((e,a)=>e+o(a.quantity),0),totalQtyOut:r.filter(e=>e.type==="sale").reduce((e,a)=>e+o(a.quantity),0)},B=[...new Set(n.map(e=>e.productName).filter(Boolean))],w=v||u||b||j||S,i=w?M:m,C=()=>{const e=u||b?`${u||"start"} → ${b||"today"}`:null,a=window.open("","_blank");a&&(a.document.write(Q(r,i,e)),a.document.close())};let D=0,O=0;return t.jsxs(L,{children:[t.jsxs("style",{children:[E,H]}),t.jsx(J,{message:N.message,type:N.type,onClose:()=>k({message:"",type:"info"})}),t.jsxs("div",{className:"sm-wrap",children:[t.jsxs("div",{style:{marginBottom:20,display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:12},children:[t.jsxs("div",{children:[t.jsx("p",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"#9ca3af",marginBottom:4},children:"Operations"}),t.jsx("h1",{style:{fontSize:26,fontWeight:800,color:"#0f172a",letterSpacing:"-.5px",lineHeight:1,margin:0},children:"Stock Management"}),t.jsx("p",{style:{fontSize:13,color:"#64748b",marginTop:5},children:"Double-entry stock ledger — auto-generated from Purchase & Sales invoices"})]}),t.jsxs("div",{className:"sm-no-print",style:{display:"flex",gap:8,alignItems:"center"},children:[!s&&t.jsxs("span",{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:12,fontWeight:600,color:"#64748b",background:"#f1f5f9",padding:"5px 12px",borderRadius:8},children:[r.length,r.length!==n.length&&t.jsxs("span",{style:{color:"#9ca3af",fontWeight:400},children:[" / ",n.length]})," entries"]}),t.jsxs("button",{className:"sm-print-btn",onClick:C,children:[t.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"})}),"Print Ledger"]})]})]}),t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10,marginBottom:18},children:[t.jsx(y,{label:"Stock In (Rs)",value:`Rs ${c(i.totalStockIn)}`,accent:"#16a34a",mono:!0}),t.jsx(y,{label:"Stock Out (Rs)",value:`Rs ${c(i.totalStockOut)}`,accent:"#7c3aed",mono:!0}),t.jsx(y,{label:"Net Balance",value:`Rs ${c(Math.abs(o(i.totalStockIn)-o(i.totalStockOut)))}`,accent:o(i.totalStockIn)-o(i.totalStockOut)>=0?"#0284c7":"#ef4444",mono:!0,sub:o(i.totalStockIn)-o(i.totalStockOut)>=0?"surplus":"deficit"}),t.jsx(y,{label:"Maund In",value:g(i.totalMaundIn),accent:"#16a34a",mono:!0}),t.jsx(y,{label:"Maund Out",value:g(i.totalMaundOut),accent:"#7c3aed",mono:!0}),t.jsx(y,{label:"Bags In / Out",value:`${f(i.totalQtyIn)} / ${f(i.totalQtyOut)}`,accent:"#0f172a",mono:!0})]}),t.jsx("div",{className:"sm-no-print",style:{background:"#fff",border:"1.5px solid #f1f5f9",borderRadius:12,padding:"12px 14px",marginBottom:16,boxShadow:"0 1px 3px rgba(0,0,0,.04)"},children:t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr auto",gap:10,alignItems:"end"},children:[t.jsxs("div",{children:[t.jsx("label",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#94a3b8",display:"block",marginBottom:5},children:"Search"}),t.jsxs("div",{style:{position:"relative"},children:[t.jsxs("svg",{style:{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"},width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2,children:[t.jsx("circle",{cx:11,cy:11,r:8}),t.jsx("path",{strokeLinecap:"round",d:"M21 21l-4.35-4.35"})]}),t.jsx("input",{className:"sm-input",value:v,onChange:e=>z(e.target.value),placeholder:"Invoice #, product, vendor, vehicle…",style:{width:"100%",paddingLeft:32}})]})]}),t.jsxs("div",{children:[t.jsx("label",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#94a3b8",display:"block",marginBottom:5},children:"From Date"}),t.jsx("input",{type:"date",className:"sm-input",value:u,onChange:e=>R(e.target.value),style:{width:"100%"}})]}),t.jsxs("div",{children:[t.jsx("label",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#94a3b8",display:"block",marginBottom:5},children:"To Date"}),t.jsx("input",{type:"date",className:"sm-input",value:b,onChange:e=>$(e.target.value),style:{width:"100%"}})]}),t.jsxs("div",{children:[t.jsx("label",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#94a3b8",display:"block",marginBottom:5},children:"Type"}),t.jsx("div",{style:{position:"relative"},children:t.jsxs("select",{className:"sm-select",value:j,onChange:e=>T(e.target.value),style:{width:"100%"},children:[t.jsx("option",{value:"",children:"All types"}),t.jsx("option",{value:"purchase",children:"Stock In (Purchase)"}),t.jsx("option",{value:"sale",children:"Stock Out (Sale)"})]})})]}),t.jsxs("div",{children:[t.jsx("label",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#94a3b8",display:"block",marginBottom:5},children:"Product"}),t.jsxs("select",{className:"sm-select",value:S,onChange:e=>W(e.target.value),style:{width:"100%"},children:[t.jsx("option",{value:"",children:"All products"}),B.map(e=>t.jsx("option",{value:e,children:e},e))]})]}),t.jsx("button",{onClick:()=>{z(""),R(""),$(""),T(""),W("")},style:{padding:"8px 14px",borderRadius:9,border:"1.5px solid #e2e8f0",background:"#fff",color:"#6b7280",fontSize:12.5,fontWeight:600,cursor:w?"pointer":"default",opacity:w?1:.4,fontFamily:"'Plus Jakarta Sans',sans-serif"},children:"Clear"})]})}),t.jsx("div",{style:{background:"#fff",border:"1.5px solid #f1f5f9",borderRadius:14,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,.05)"},children:t.jsx("div",{style:{overflowX:"auto"},children:t.jsxs("table",{className:"sm-table",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{style:{width:90},children:"Date"}),t.jsx("th",{style:{width:70},children:"Invoice"}),t.jsx("th",{children:"Particulars"}),t.jsx("th",{children:"Description"}),t.jsx("th",{className:"c",style:{width:65},children:"Type"}),t.jsxs("th",{className:"r",style:{width:140},children:[t.jsx("span",{style:{color:"#86efac"},children:"DR"})," Debit Amount"]}),t.jsxs("th",{className:"r",style:{width:140},children:[t.jsx("span",{style:{color:"#c4b5fd"},children:"CR"})," Credit Amount"]})]})}),t.jsx("tbody",{children:s?Array.from({length:6}).map((e,a)=>t.jsx(K,{},a)):r.length===0?t.jsx("tr",{children:t.jsxs("td",{colSpan:7,style:{padding:"48px",textAlign:"center",color:"#94a3b8"},children:[t.jsx("div",{style:{fontSize:32,marginBottom:10},children:"📦"}),t.jsx("div",{style:{fontSize:14,fontWeight:700,color:"#6b7280",marginBottom:4},children:"No stock entries found"}),t.jsx("div",{style:{fontSize:12.5},children:n.length===0?"Create purchase or sales invoices to see stock entries here.":"Try adjusting your filters."})]})}):t.jsxs(t.Fragment,{children:[r.map((e,a)=>{const h=e.type==="purchase";return h?D+=o(e.amount):O+=o(e.amount),t.jsxs("tr",{className:h?"sm-row-purchase":"sm-row-sale",children:[t.jsx("td",{className:"sm-td",children:t.jsx("span",{className:"sm-mono",style:{fontSize:12,fontWeight:600,color:"#374151"},children:e.date})}),t.jsxs("td",{className:"sm-td",children:[t.jsx("span",{className:"sm-mono",style:{fontSize:12,fontWeight:700,color:h?"#16a34a":"#7c3aed"},children:e.invoiceNo}),e.journalEntryId&&t.jsx("div",{style:{fontSize:9,color:"#a5b4fc",marginTop:2,fontWeight:600},children:"⛓ JE linked"})]}),t.jsxs("td",{className:"sm-td",style:{minWidth:220},children:[t.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:7,marginBottom:5},children:[t.jsx("span",{style:{fontSize:9.5,fontWeight:800,letterSpacing:".06em",textTransform:"uppercase",minWidth:22,marginTop:1,color:"#16a34a",background:"#dcfce7",padding:"1px 5px",borderRadius:4},children:"DR"}),t.jsxs("div",{children:[t.jsx("div",{style:{fontSize:13,fontWeight:700,color:"#0f172a",lineHeight:1.3},children:e.drAccountName}),h&&t.jsx("div",{style:{fontSize:10.5,color:"#64748b",marginTop:1},children:e.productName})]})]}),t.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:7,paddingLeft:8,borderLeft:"2px solid #f1f5f9"},children:[t.jsx("span",{style:{fontSize:9.5,fontWeight:800,letterSpacing:".06em",textTransform:"uppercase",minWidth:22,marginTop:1,color:"#7c3aed",background:"#ede9fe",padding:"1px 5px",borderRadius:4},children:"CR"}),t.jsxs("div",{children:[t.jsx("div",{style:{fontSize:12.5,fontWeight:600,color:"#374151",lineHeight:1.3},children:e.crAccountName}),!h&&t.jsx("div",{style:{fontSize:10.5,color:"#64748b",marginTop:1},children:e.productName})]})]})]}),t.jsx("td",{className:"sm-td",style:{minWidth:280},children:t.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"2px 12px",fontSize:11},children:[["Invoice",e.invoiceNo],["Bags",f(e.quantity)],["Rate/40kg",`Rs ${f(e.rate)}`],["Maund",g(e.maund)],["Weight",`${c(o(e.netWeightKg))} kg`],["Vehicle",e.vehicleNo]].map(([I,P])=>t.jsxs("div",{children:[t.jsx("div",{style:{color:"#9ca3af",fontWeight:700,fontSize:9,textTransform:"uppercase",letterSpacing:".06em"},children:I}),t.jsx("div",{className:"sm-mono",style:{fontSize:11.5,fontWeight:600,color:"#374151"},children:P||"—"})]},I))})}),t.jsx("td",{className:"sm-td-c",children:t.jsx("span",{className:h?"sm-badge-purchase":"sm-badge-sale",children:h?"▲ IN":"▼ OUT"})}),t.jsx("td",{className:"sm-td-r",children:t.jsxs("div",{children:[t.jsxs("div",{style:{fontSize:9,fontWeight:700,color:"#16a34a",textTransform:"uppercase",letterSpacing:".06em",marginBottom:3},children:["DR · ",e.drAccountName]}),t.jsxs("span",{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:13,fontWeight:700,color:"#16a34a"},children:["Rs ",c(e.debit)]})]})}),t.jsx("td",{className:"sm-td-r",children:t.jsxs("div",{children:[t.jsxs("div",{style:{fontSize:9,fontWeight:700,color:"#7c3aed",textTransform:"uppercase",letterSpacing:".06em",marginBottom:3},children:["CR · ",e.crAccountName]}),t.jsxs("span",{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:13,fontWeight:700,color:"#7c3aed"},children:["Rs ",c(e.credit)]})]})})]},e._id)}),t.jsxs("tr",{className:"sm-row-total",children:[t.jsx("td",{className:"sm-td",colSpan:5,children:t.jsxs("span",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#374151"},children:["Totals — ",r.length," entr",r.length!==1?"ies":"y"]})}),t.jsx("td",{className:"sm-td-r",children:t.jsxs("span",{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:13.5,fontWeight:800,color:"#16a34a"},children:["Rs ",c(i.totalStockIn)]})}),t.jsx("td",{className:"sm-td-r",children:t.jsxs("span",{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:13.5,fontWeight:800,color:"#7c3aed"},children:["Rs ",c(i.totalStockOut)]})})]}),t.jsx("tr",{children:t.jsx("td",{colSpan:7,style:{padding:"10px 14px",background:"#f8fafc",borderTop:"1px solid #f1f5f9"},children:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:20,fontSize:12,flexWrap:"wrap"},children:[t.jsx("span",{style:{color:"#64748b",fontWeight:600},children:"Net Position:"}),(()=>{const e=o(i.totalStockIn)-o(i.totalStockOut),a=e>=0;return t.jsxs("span",{style:{fontFamily:"'JetBrains Mono',monospace",fontWeight:800,fontSize:14,color:a?"#16a34a":"#ef4444"},children:[a?"+":"−"," Rs ",c(Math.abs(e)),t.jsxs("span",{style:{fontSize:10,fontWeight:600,marginLeft:6,color:"#94a3b8"},children:["(",a?"Stock surplus":"Stock deficit",")"]})]})})(),t.jsx("span",{style:{color:"#9ca3af"},children:"|"}),t.jsxs("span",{style:{color:"#64748b"},children:["Maund balance: ",t.jsxs("span",{className:"sm-mono",style:{fontWeight:700,color:"#0f172a"},children:[g(o(i.totalMaundIn)-o(i.totalMaundOut))," Mn"]})]}),t.jsx("span",{style:{color:"#9ca3af"},children:"|"}),t.jsxs("span",{style:{color:"#64748b"},children:["Bag balance: ",t.jsxs("span",{className:"sm-mono",style:{fontWeight:700,color:"#0f172a"},children:[f(o(i.totalQtyIn)-o(i.totalQtyOut))," bags"]})]})]})})})]})})]})})}),!s&&r.length>0&&t.jsxs("p",{style:{textAlign:"center",color:"#9ca3af",fontSize:12,marginTop:16,fontFamily:"'JetBrains Mono',monospace"},children:[r.length," entr",r.length!==1?"ies":"y",w?` · filtered from ${n.length} total`:""," · ",r.filter(e=>e.type==="purchase").length," purchases (stock in)  · ",r.filter(e=>e.type==="sale").length," sales (stock out)"]})]})]})}export{U as default};
