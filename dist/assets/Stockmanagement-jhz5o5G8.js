import{a as F,A as L,j as t,S as A,N as J}from"./index-C0C5eGGh.js";import{b as m}from"./react-BBT0yyZ1.js";const E="@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');",Q=`
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
`,a=o=>isNaN(Number(o))?0:Number(o)||0,d=(o,l=2)=>a(o).toLocaleString("en-PK",{minimumFractionDigits:l,maximumFractionDigits:l}),f=o=>a(o).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0}),g=o=>a(o).toLocaleString("en-PK",{minimumFractionDigits:4,maximumFractionDigits:4});function y({label:o,value:l,sub:h,accent:u,prefix:r,mono:c}){return t.jsxs("div",{className:"sm-stat",children:[t.jsx("p",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#9ca3af",marginBottom:8},children:o}),t.jsxs("p",{style:{fontSize:20,fontWeight:800,color:u||"#111827",lineHeight:1,fontFamily:c?"'JetBrains Mono',monospace":void 0},children:[r&&t.jsx("span",{style:{fontSize:13,color:u||"#9ca3af",marginRight:3},children:r}),l]}),h&&t.jsx("p",{style:{fontSize:11,color:"#9ca3af",marginTop:5},children:h})]})}function K(o,l,h){const u=o.map(r=>{const c=r.type==="purchase";return c||r.vendorName,c&&r.vendorName,`
      <tr style="background:${c?"#f0fdf4":"#faf5ff"}">
        <td>${r.date}</td>
        <td>${r.invoiceNo}</td>
        <td>
          <strong>${r.productName}</strong><br>
          <span style="color:#64748b">${r.vendorName}</span>
        </td>
        <td style="font-size:10px;color:#475569">
          ${r.quantity} bags &bull; ${g(r.maund)} Maund<br>
          Rate: Rs ${f(r.rate)} &bull; ${r.vehicleNo}
        </td>
        <td style="text-align:center">
          <span style="font-size:9px;font-weight:700;padding:2px 7px;border-radius:20px;background:${c?"#dcfce7":"#ede9fe"};color:${c?"#16a34a":"#7c3aed"};border:1px solid ${c?"#bbf7d0":"#ddd6fe"}">
            ${c?"IN":"OUT"}
          </span>
        </td>
        <td style="text-align:right;font-family:'Courier New',monospace;font-weight:700;color:${c?"#16a34a":"#64748b"}">
          ${c?`Rs ${d(r.debit)}`:"—"}
        </td>
        <td style="text-align:right;font-family:'Courier New',monospace;font-weight:700;color:${c?"#64748b":"#7c3aed"}">
          ${c?"—":`Rs ${d(r.credit)}`}
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
    <p>Printed: ${new Date().toLocaleDateString("en-PK",{day:"2-digit",month:"short",year:"numeric"})}${h?" &bull; "+h:""}</p>
  </div>
</div>
<div class="summary">
  <div class="sum-box"><div class="sum-lbl">Total Stock In (Rs)</div><div class="sum-val">Rs ${d(l.totalStockIn)}</div></div>
  <div class="sum-box"><div class="sum-lbl">Total Stock Out (Rs)</div><div class="sum-val">Rs ${d(l.totalStockOut)}</div></div>
  <div class="sum-box"><div class="sum-lbl">Maund In / Out</div><div class="sum-val">${g(l.totalMaundIn)} / ${g(l.totalMaundOut)}</div></div>
  <div class="sum-box"><div class="sum-lbl">Bags In / Out</div><div class="sum-val">${f(l.totalQtyIn)} / ${f(l.totalQtyOut)}</div></div>
</div>
<table>
  <thead><tr>
    <th>Date</th><th>Invoice</th><th>Particulars</th><th>Description</th>
    <th class="c">Type</th><th class="r">Debit (Stock In)</th><th class="r">Credit (Stock Out)</th>
  </tr></thead>
  <tbody>${u}</tbody>
  <tfoot class="foot">
    <tr>
      <td colspan="5"><strong>TOTALS (${o.length} entries)</strong></td>
      <td class="r"><strong>Rs ${d(l.totalStockIn)}</strong></td>
      <td class="r"><strong>Rs ${d(l.totalStockOut)}</strong></td>
    </tr>
  </tfoot>
</table>
<p style="text-align:center;margin-top:20px;font-size:9px;color:#94a3b8">
  Stock Management Ledger — Al Rehman Rice Mills &bull; This is a computer-generated report.
</p>
</div><script>window.onload=()=>window.print()<\/script></body></html>`}function H(){return t.jsx("tr",{children:[60,80,180,160,55,90,90].map((o,l)=>t.jsx("td",{className:"sm-td",children:t.jsx("div",{className:"sm-sk",style:{width:o,height:13}})},l))})}function _(){const[o,l]=m.useState([]),[h,u]=m.useState({}),[r,c]=m.useState(!0),[N,k]=m.useState({message:"",type:"info"}),[j,z]=m.useState(""),[x,R]=m.useState(""),[b,I]=m.useState(""),[v,$]=m.useState(""),[S,W]=m.useState("");m.useEffect(()=>{(async()=>{try{const s=await(await F(`${L}/stock/entries`)).json();s.success?(l(s.entries),u(s.summary||{})):k({message:s.message||"Failed to load",type:"error"})}catch{k({message:"Server error.",type:"error"})}finally{c(!1)}})()},[]);const i=o.filter(e=>{if(v&&e.type!==v||S&&e.productName!==S||x&&new Date(e.date)<new Date(x)||b&&new Date(e.date)>new Date(b))return!1;if(j){const s=j.toLowerCase();if(!e.productName?.toLowerCase().includes(s)&&!e.vendorName?.toLowerCase().includes(s)&&!e.invoiceNo?.toLowerCase().includes(s)&&!e.vehicleNo?.toLowerCase().includes(s)&&!String(e.sr).includes(s))return!1}return!0}),C={totalStockIn:i.filter(e=>e.type==="purchase").reduce((e,s)=>e+a(s.amount),0),totalStockOut:i.filter(e=>e.type==="sale").reduce((e,s)=>e+a(s.amount),0),totalMaundIn:i.filter(e=>e.type==="purchase").reduce((e,s)=>e+a(s.maund),0),totalMaundOut:i.filter(e=>e.type==="sale").reduce((e,s)=>e+a(s.maund),0),totalQtyIn:i.filter(e=>e.type==="purchase").reduce((e,s)=>e+a(s.quantity),0),totalQtyOut:i.filter(e=>e.type==="sale").reduce((e,s)=>e+a(s.quantity),0)},M=[...new Set(o.map(e=>e.productName).filter(Boolean))],w=j||x||b||v||S,n=w?C:h,D=()=>{const e=x||b?`${x||"start"} → ${b||"today"}`:null,s=window.open("","_blank");s&&(s.document.write(K(i,n,e)),s.document.close())};let B=0,P=0;return t.jsxs(A,{children:[t.jsxs("style",{children:[E,Q]}),t.jsx(J,{message:N.message,type:N.type,onClose:()=>k({message:"",type:"info"})}),t.jsxs("div",{className:"sm-wrap",children:[t.jsxs("div",{style:{marginBottom:20,display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:12},children:[t.jsxs("div",{children:[t.jsx("p",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"#9ca3af",marginBottom:4},children:"Operations"}),t.jsx("h1",{style:{fontSize:26,fontWeight:800,color:"#0f172a",letterSpacing:"-.5px",lineHeight:1,margin:0},children:"Stock Management"}),t.jsx("p",{style:{fontSize:13,color:"#64748b",marginTop:5},children:"Double-entry stock ledger — auto-generated from Purchase & Sales invoices"})]}),t.jsxs("div",{className:"sm-no-print",style:{display:"flex",gap:8,alignItems:"center"},children:[!r&&t.jsxs("span",{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:12,fontWeight:600,color:"#64748b",background:"#f1f5f9",padding:"5px 12px",borderRadius:8},children:[i.length,i.length!==o.length&&t.jsxs("span",{style:{color:"#9ca3af",fontWeight:400},children:[" / ",o.length]})," entries"]}),t.jsxs("button",{className:"sm-print-btn",onClick:D,children:[t.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"})}),"Print Ledger"]})]})]}),t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10,marginBottom:18},children:[t.jsx(y,{label:"Stock In (Rs)",value:`Rs ${d(n.totalStockIn)}`,accent:"#16a34a",mono:!0}),t.jsx(y,{label:"Stock Out (Rs)",value:`Rs ${d(n.totalStockOut)}`,accent:"#7c3aed",mono:!0}),t.jsx(y,{label:"Net Balance",value:`Rs ${d(Math.abs(a(n.totalStockIn)-a(n.totalStockOut)))}`,accent:a(n.totalStockIn)-a(n.totalStockOut)>=0?"#0284c7":"#ef4444",mono:!0,sub:a(n.totalStockIn)-a(n.totalStockOut)>=0?"surplus":"deficit"}),t.jsx(y,{label:"Maund In",value:g(n.totalMaundIn),accent:"#16a34a",mono:!0}),t.jsx(y,{label:"Maund Out",value:g(n.totalMaundOut),accent:"#7c3aed",mono:!0}),t.jsx(y,{label:"Bags In / Out",value:`${f(n.totalQtyIn)} / ${f(n.totalQtyOut)}`,accent:"#0f172a",mono:!0})]}),t.jsx("div",{className:"sm-no-print",style:{background:"#fff",border:"1.5px solid #f1f5f9",borderRadius:12,padding:"12px 14px",marginBottom:16,boxShadow:"0 1px 3px rgba(0,0,0,.04)"},children:t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr auto",gap:10,alignItems:"end"},children:[t.jsxs("div",{children:[t.jsx("label",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#94a3b8",display:"block",marginBottom:5},children:"Search"}),t.jsxs("div",{style:{position:"relative"},children:[t.jsxs("svg",{style:{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"},width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2,children:[t.jsx("circle",{cx:11,cy:11,r:8}),t.jsx("path",{strokeLinecap:"round",d:"M21 21l-4.35-4.35"})]}),t.jsx("input",{className:"sm-input",value:j,onChange:e=>z(e.target.value),placeholder:"Invoice #, product, vendor, vehicle…",style:{width:"100%",paddingLeft:32}})]})]}),t.jsxs("div",{children:[t.jsx("label",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#94a3b8",display:"block",marginBottom:5},children:"From Date"}),t.jsx("input",{type:"date",className:"sm-input",value:x,onChange:e=>R(e.target.value),style:{width:"100%"}})]}),t.jsxs("div",{children:[t.jsx("label",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#94a3b8",display:"block",marginBottom:5},children:"To Date"}),t.jsx("input",{type:"date",className:"sm-input",value:b,onChange:e=>I(e.target.value),style:{width:"100%"}})]}),t.jsxs("div",{children:[t.jsx("label",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#94a3b8",display:"block",marginBottom:5},children:"Type"}),t.jsx("div",{style:{position:"relative"},children:t.jsxs("select",{className:"sm-select",value:v,onChange:e=>$(e.target.value),style:{width:"100%"},children:[t.jsx("option",{value:"",children:"All types"}),t.jsx("option",{value:"purchase",children:"Stock In (Purchase)"}),t.jsx("option",{value:"sale",children:"Stock Out (Sale)"})]})})]}),t.jsxs("div",{children:[t.jsx("label",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#94a3b8",display:"block",marginBottom:5},children:"Product"}),t.jsxs("select",{className:"sm-select",value:S,onChange:e=>W(e.target.value),style:{width:"100%"},children:[t.jsx("option",{value:"",children:"All products"}),M.map(e=>t.jsx("option",{value:e,children:e},e))]})]}),t.jsx("button",{onClick:()=>{z(""),R(""),I(""),$(""),W("")},style:{padding:"8px 14px",borderRadius:9,border:"1.5px solid #e2e8f0",background:"#fff",color:"#6b7280",fontSize:12.5,fontWeight:600,cursor:w?"pointer":"default",opacity:w?1:.4,fontFamily:"'Plus Jakarta Sans',sans-serif"},children:"Clear"})]})}),t.jsxs("div",{className:"sm-no-print",style:{display:"flex",gap:16,marginBottom:12,padding:"8px 14px",background:"#f8fafc",borderRadius:9,border:"1px solid #f1f5f9",fontSize:11.5,color:"#64748b",flexWrap:"wrap"},children:[t.jsx("span",{style:{fontWeight:700,color:"#374151"},children:"Accounting basis:"}),t.jsxs("span",{children:[t.jsx("span",{className:"sm-badge-purchase",style:{marginRight:5},children:"IN"}),"Purchase Invoice → ",t.jsx("strong",{style:{color:"#16a34a"},children:"DR"})," Stock/Product  | ",t.jsx("strong",{style:{color:"#64748b"},children:"CR"})," Vendor (Accounts Payable)"]}),t.jsx("span",{style:{color:"#d1d5db"},children:"|"}),t.jsxs("span",{children:[t.jsx("span",{className:"sm-badge-sale",style:{marginRight:5},children:"OUT"}),"Sales Invoice → ",t.jsx("strong",{style:{color:"#7c3aed"},children:"DR"})," Customer (Accounts Receivable)  | ",t.jsx("strong",{style:{color:"#64748b"},children:"CR"})," Stock/Product"]})]}),t.jsx("div",{style:{background:"#fff",border:"1.5px solid #f1f5f9",borderRadius:14,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,.05)"},children:t.jsx("div",{style:{overflowX:"auto"},children:t.jsxs("table",{className:"sm-table",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{style:{width:90},children:"Date"}),t.jsx("th",{style:{width:70},children:"Invoice"}),t.jsx("th",{children:"Particulars"}),t.jsx("th",{children:"Description"}),t.jsx("th",{className:"c",style:{width:65},children:"Type"}),t.jsxs("th",{className:"r",style:{width:130},children:[t.jsx("span",{style:{color:"#86efac"},children:"DR"})," Debit"]}),t.jsxs("th",{className:"r",style:{width:130},children:[t.jsx("span",{style:{color:"#c4b5fd"},children:"CR"})," Credit"]})]})}),t.jsx("tbody",{children:r?Array.from({length:6}).map((e,s)=>t.jsx(H,{},s)):i.length===0?t.jsx("tr",{children:t.jsxs("td",{colSpan:7,style:{padding:"48px",textAlign:"center",color:"#94a3b8"},children:[t.jsx("div",{style:{fontSize:32,marginBottom:10},children:"📦"}),t.jsx("div",{style:{fontSize:14,fontWeight:700,color:"#6b7280",marginBottom:4},children:"No stock entries found"}),t.jsx("div",{style:{fontSize:12.5},children:o.length===0?"Create purchase or sales invoices to see stock entries here.":"Try adjusting your filters."})]})}):t.jsxs(t.Fragment,{children:[i.map((e,s)=>{const p=e.type==="purchase";return p?B+=a(e.amount):P+=a(e.amount),t.jsxs("tr",{className:p?"sm-row-purchase":"sm-row-sale",children:[t.jsx("td",{className:"sm-td",children:t.jsx("span",{className:"sm-mono",style:{fontSize:12,fontWeight:600,color:"#374151"},children:e.date})}),t.jsx("td",{className:"sm-td",children:t.jsx("span",{className:"sm-mono",style:{fontSize:12,fontWeight:700,color:p?"#16a34a":"#7c3aed"},children:e.invoiceNo})}),t.jsxs("td",{className:"sm-td",style:{minWidth:200},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:4},children:[t.jsx("span",{style:{fontSize:10,fontWeight:700,color:p?"#16a34a":"#7c3aed",textTransform:"uppercase",letterSpacing:".06em",minWidth:28},children:p?"DR":"CR"}),t.jsx("span",{style:{fontSize:13,fontWeight:700,color:"#0f172a"},children:e.productName})]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[t.jsx("span",{style:{fontSize:10,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".06em",minWidth:28},children:p?"CR":"DR"}),t.jsx("span",{style:{fontSize:12,color:"#64748b",fontWeight:500},children:e.vendorName})]})]}),t.jsx("td",{className:"sm-td",style:{minWidth:280},children:t.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"2px 12px",fontSize:11},children:[["Invoice",e.invoiceNo],["Bags",f(e.quantity)],["Rate/40kg",`Rs ${f(e.rate)}`],["Maund",g(e.maund)],["Weight",`${d(a(e.netWeightKg))} kg`],["Vehicle",e.vehicleNo]].map(([T,O])=>t.jsxs("div",{children:[t.jsx("div",{style:{color:"#9ca3af",fontWeight:700,fontSize:9,textTransform:"uppercase",letterSpacing:".06em"},children:T}),t.jsx("div",{className:"sm-mono",style:{fontSize:11.5,fontWeight:600,color:"#374151"},children:O||"—"})]},T))})}),t.jsx("td",{className:"sm-td-c",children:t.jsx("span",{className:p?"sm-badge-purchase":"sm-badge-sale",children:p?"▲ IN":"▼ OUT"})}),t.jsx("td",{className:"sm-td-r",children:p?t.jsxs("span",{className:"sm-debit sm-debit-in",children:["Rs ",d(e.debit)]}):t.jsx("span",{className:"sm-zero",children:"—"})}),t.jsx("td",{className:"sm-td-r",children:p?t.jsx("span",{className:"sm-zero",children:"—"}):t.jsxs("span",{className:"sm-credit sm-credit-out",children:["Rs ",d(e.credit)]})})]},e._id)}),t.jsxs("tr",{className:"sm-row-total",children:[t.jsx("td",{className:"sm-td",colSpan:5,children:t.jsxs("span",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#374151"},children:["Totals — ",i.length," entr",i.length!==1?"ies":"y"]})}),t.jsx("td",{className:"sm-td-r",children:t.jsxs("span",{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:13.5,fontWeight:800,color:"#16a34a"},children:["Rs ",d(n.totalStockIn)]})}),t.jsx("td",{className:"sm-td-r",children:t.jsxs("span",{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:13.5,fontWeight:800,color:"#7c3aed"},children:["Rs ",d(n.totalStockOut)]})})]}),t.jsx("tr",{children:t.jsx("td",{colSpan:7,style:{padding:"10px 14px",background:"#f8fafc",borderTop:"1px solid #f1f5f9"},children:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:20,fontSize:12,flexWrap:"wrap"},children:[t.jsx("span",{style:{color:"#64748b",fontWeight:600},children:"Net Position:"}),(()=>{const e=a(n.totalStockIn)-a(n.totalStockOut),s=e>=0;return t.jsxs("span",{style:{fontFamily:"'JetBrains Mono',monospace",fontWeight:800,fontSize:14,color:s?"#16a34a":"#ef4444"},children:[s?"+":"−"," Rs ",d(Math.abs(e)),t.jsxs("span",{style:{fontSize:10,fontWeight:600,marginLeft:6,color:"#94a3b8"},children:["(",s?"Stock surplus":"Stock deficit",")"]})]})})(),t.jsx("span",{style:{color:"#9ca3af"},children:"|"}),t.jsxs("span",{style:{color:"#64748b"},children:["Maund balance: ",t.jsxs("span",{className:"sm-mono",style:{fontWeight:700,color:"#0f172a"},children:[g(a(n.totalMaundIn)-a(n.totalMaundOut))," Mn"]})]}),t.jsx("span",{style:{color:"#9ca3af"},children:"|"}),t.jsxs("span",{style:{color:"#64748b"},children:["Bag balance: ",t.jsxs("span",{className:"sm-mono",style:{fontWeight:700,color:"#0f172a"},children:[f(a(n.totalQtyIn)-a(n.totalQtyOut))," bags"]})]})]})})})]})})]})})}),!r&&i.length>0&&t.jsxs("p",{style:{textAlign:"center",color:"#9ca3af",fontSize:12,marginTop:16,fontFamily:"'JetBrains Mono',monospace"},children:[i.length," entr",i.length!==1?"ies":"y",w?` · filtered from ${o.length} total`:""," · ",i.filter(e=>e.type==="purchase").length," purchases (stock in)  · ",i.filter(e=>e.type==="sale").length," sales (stock out)"]})]})]})}export{_ as default};
