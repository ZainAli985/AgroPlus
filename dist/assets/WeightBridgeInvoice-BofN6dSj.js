import{j as e,S as D,a as C,A as S}from"./index-DLvLt0Mo.js";import{b as o}from"./react-BBT0yyZ1.js";const a=t=>Number(t||0).toLocaleString("en-PK"),p=t=>t?new Date(t).toLocaleString("en-PK",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"—",T=t=>t?new Date(t).toLocaleDateString("en-PK",{day:"2-digit",month:"short",year:"numeric"}):"—";function $({completed:t}){return t?e.jsx("span",{className:"inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-emerald-500 text-white px-2.5 py-1 rounded-full wbr-title",children:"✓ Complete"}):e.jsx("span",{className:"inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-amber-400 text-zinc-900 px-2.5 py-1 rounded-full wbr-title",children:"⏳ Pending"})}function M({e:t,onPrint:h}){const[r,c]=o.useState(!1);return e.jsxs("div",{className:"bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden transition-all hover:shadow-md",children:[e.jsxs("div",{className:"bg-zinc-900 px-5 py-4 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-zinc-500 text-[9px] uppercase tracking-[.18em] mb-0.5",children:"Invoice"}),e.jsx("p",{className:"wbr-mono text-lg font-bold text-amber-400 leading-none",children:t.invoiceCode})]}),e.jsx("div",{className:"text-center",children:t.completed?e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-zinc-500 text-[9px] uppercase tracking-widest mb-0.5",children:"Net Weight"}),e.jsx("p",{className:"wbr-mono text-3xl font-bold text-white leading-none",children:a(t.netWeight)}),e.jsx("p",{className:"text-zinc-500 text-[10px] mt-0.5",children:"kg"})]}):e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-zinc-500 text-[9px] uppercase tracking-widest mb-0.5",children:"1st Weight"}),e.jsx("p",{className:"wbr-mono text-3xl font-bold text-zinc-300 leading-none",children:a(t.firstWeight)}),e.jsx("p",{className:"text-zinc-600 text-[10px] mt-0.5",children:"kg"})]})}),e.jsx($,{completed:t.completed})]}),e.jsxs("div",{className:"px-5 py-4 border-b border-zinc-100",children:[e.jsxs("div",{className:"flex items-start justify-between gap-4",children:[e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:"font-bold text-zinc-800 text-base truncate",children:t.productName}),e.jsx("p",{className:"text-zinc-400 text-sm truncate",children:t.vendorName})]}),e.jsxs("div",{className:"text-right shrink-0",children:[e.jsx("p",{className:"wbr-mono text-xs font-semibold text-zinc-500",children:t.vehicleNumber||"—"}),e.jsx("p",{className:"text-zinc-400 text-xs",children:t.vehicleType})]})]}),t.completed&&e.jsxs("div",{className:"mt-4 space-y-1.5",children:[e.jsxs("div",{className:"flex items-center gap-3 text-xs",children:[e.jsx("span",{className:"text-zinc-400 w-20 text-right wbr-mono",children:"1st"}),e.jsx("div",{className:"flex-1 bg-zinc-100 rounded-full h-2 overflow-hidden",children:e.jsx("div",{className:"h-full bg-zinc-400 rounded-full",style:{width:`${Math.min(100,t.firstWeight/Math.max(t.firstWeight,t.secondWeight)*100)}%`}})}),e.jsxs("span",{className:"wbr-mono text-zinc-500 w-20",children:[a(t.firstWeight)," kg"]})]}),e.jsxs("div",{className:"flex items-center gap-3 text-xs",children:[e.jsx("span",{className:"text-zinc-400 w-20 text-right wbr-mono",children:"2nd"}),e.jsx("div",{className:"flex-1 bg-zinc-100 rounded-full h-2 overflow-hidden",children:e.jsx("div",{className:"h-full bg-zinc-600 rounded-full",style:{width:`${Math.min(100,t.secondWeight/Math.max(t.firstWeight,t.secondWeight)*100)}%`}})}),e.jsxs("span",{className:"wbr-mono text-zinc-500 w-20",children:[a(t.secondWeight)," kg"]})]}),e.jsxs("div",{className:"flex items-center gap-3 text-xs",children:[e.jsx("span",{className:"text-zinc-400 w-20 text-right wbr-mono font-bold",children:"Net"}),e.jsx("div",{className:"flex-1 bg-zinc-100 rounded-full h-3 overflow-hidden",children:e.jsx("div",{className:"h-full bg-emerald-500 rounded-full",style:{width:`${Math.min(100,t.netWeight/Math.max(t.firstWeight,t.secondWeight)*100)}%`}})}),e.jsxs("span",{className:"wbr-mono text-emerald-600 font-bold w-20",children:[a(t.netWeight)," kg"]})]})]}),t.completed&&e.jsxs("div",{className:"grid grid-cols-2 gap-2 mt-3",children:[e.jsxs("div",{className:"bg-zinc-50 rounded-xl px-3 py-2 text-center",children:[e.jsx("p",{className:"text-[10px] text-zinc-400 uppercase tracking-widest",children:"Maund"}),e.jsxs("p",{className:"wbr-mono font-bold text-zinc-700 text-sm",children:[t.netWeightMaund?.toFixed(2)," Mn"]})]}),e.jsxs("div",{className:"bg-zinc-50 rounded-xl px-3 py-2 text-center",children:[e.jsx("p",{className:"text-[10px] text-zinc-400 uppercase tracking-widest",children:"Metric Ton"}),e.jsxs("p",{className:"wbr-mono font-bold text-zinc-700 text-sm",children:[t.netWeightTon?.toFixed(2)," T"]})]})]})]}),e.jsxs("div",{className:"px-5 py-3 flex items-center justify-between gap-3",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[10px] text-zinc-400 uppercase tracking-widest",children:"Date"}),e.jsx("p",{className:"text-xs font-semibold text-zinc-600 wbr-mono",children:T(t.createdAt)})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-[10px] text-zinc-400 uppercase tracking-widest",children:"Rate"}),e.jsxs("p",{className:"text-xs font-semibold text-zinc-600 wbr-mono",children:["Rs ",a(t.rate)]})]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("button",{onClick:()=>c(s=>!s),className:"text-xs font-semibold text-zinc-400 hover:text-zinc-700 transition px-3 py-1.5 rounded-lg hover:bg-zinc-50 border border-zinc-100",children:r?"Less ▲":"Details ▼"}),e.jsxs("button",{onClick:()=>h(t),className:"flex items-center gap-1.5 text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-700 px-4 py-1.5 rounded-lg transition wbr-title uppercase tracking-wider",children:[e.jsx("svg",{className:"w-3.5 h-3.5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"})}),"Print"]})]})]}),r&&e.jsxs("div",{className:"border-t border-zinc-100 px-5 py-4 bg-zinc-50 space-y-3",children:[e.jsx("p",{className:"text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2",children:"Full Entry Details"}),e.jsx("div",{className:"grid grid-cols-2 gap-2 text-xs",children:[["Vendor",t.vendorName],["Vehicle No.",t.vehicleNumber||"—"],["Vehicle Type",t.vehicleType],["Product",t.productName],["Rate",`Rs ${a(t.rate)}`],["Invoice",t.invoiceCode],["1st Weight",`${a(t.firstWeight)} kg`],["1st Driver",t.firstWeightWithDriver?"With Driver":"Without Driver"],["1st Time",p(t.firstWeightTime||t.createdAt)],["2nd Weight",t.secondWeight?`${a(t.secondWeight)} kg`:"—"],["2nd Driver",t.secondWeight?t.secondWeightWithDriver?"With Driver":"Without Driver":"—"],["2nd Time",p(t.secondWeightTime)]].map(([s,d])=>e.jsxs("div",{className:"bg-white rounded-xl px-3 py-2 border border-zinc-100",children:[e.jsx("p",{className:"text-[9px] font-bold uppercase tracking-widest text-zinc-400",children:s}),e.jsx("p",{className:"font-semibold text-zinc-700 wbr-mono mt-0.5 truncate",children:d})]},s))})]})]})}function R(){const[t,h]=o.useState([]),[r,c]=o.useState([]),[s,d]=o.useState({vendor:"",product:"",date:"",status:""}),[b,f]=o.useState(!0);o.useEffect(()=>{(async()=>{try{const l=await(await C(`${S}/weight-bridge`)).json();l.success&&(h(l.entries),c(l.entries))}catch(n){console.error("Error loading report:",n)}finally{f(!1)}})()},[]),o.useEffect(()=>{let i=[...t];s.vendor&&(i=i.filter(n=>n.vendorName?.toLowerCase().includes(s.vendor.toLowerCase()))),s.product&&(i=i.filter(n=>n.productName?.toLowerCase().includes(s.product.toLowerCase()))),s.date&&(i=i.filter(n=>new Date(n.createdAt).toDateString()===new Date(s.date).toDateString())),s.status==="complete"&&(i=i.filter(n=>n.completed)),s.status==="pending"&&(i=i.filter(n=>!n.completed)),c(i)},[s,t]);const v=i=>{const n=Number(i.firstWeight||0),l=Number(i.secondWeight||0),z=Number(i.netWeight||0),W=Number(i.netWeightMaund||0),y=Number(i.netWeightTon||0),k=`<!DOCTYPE html>
<html>
<head>
<title>Weight Bridge Slip — ${i.invoiceCode}</title>
<style>
  @page { size: A4; margin: 14mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: "Segoe UI", Arial, sans-serif; color: #111; font-size: 12px; }
  .wrap { max-width: 660px; margin: auto; }

  /* Header */
  .hdr { display: flex; justify-content: space-between; align-items: flex-start;
         border-bottom: 3px solid #111; padding-bottom: 12px; margin-bottom: 16px; }
  .hdr-left h1 { font-size: 18px; font-weight: 800; color: #111; text-transform: uppercase; letter-spacing: -.3px; }
  .hdr-left p  { font-size: 10px; color: #555; margin-top: 2px; }
  .hdr-right   { text-align: right; }
  .hdr-right h2 { font-size: 14px; font-weight: 800; color: #111; text-transform: uppercase; letter-spacing: 1px; }
  .badge { display: inline-block; background: #111; color: #fff; font-size: 13px;
           font-weight: 700; padding: 4px 12px; border-radius: 6px; margin-top: 6px;
           font-family: "Courier New", monospace; letter-spacing: 1px; }

  /* Info grid */
  .info { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
  .box  { border: 1px solid #ddd; border-radius: 6px; padding: 8px 10px; }
  .box h4 { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: .12em;
            color: #555; border-bottom: 1px solid #eee; padding-bottom: 4px; margin-bottom: 6px; }
  .box p  { font-size: 11px; margin: 2px 0; }

  /* Weight table */
  table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11px; }
  thead tr { background: #111; color: #fff; }
  th { padding: 7px 8px; text-align: left; font-weight: 600; font-size: 10px;
       text-transform: uppercase; letter-spacing: .08em; }
  th.r, td.r { text-align: right; }
  td { border: 1px solid #ddd; padding: 6px 8px; }
  tr.net td { font-weight: 800; background: #f5f5f5; font-size: 13px; }
  tr.unit td { color: #555; }

  /* Signature */
  .sig { display: flex; justify-content: space-between; margin-top: 44px; font-size: 11px; }
  .sig div { text-align: center; }
  .sig span { display: block; width: 160px; border-top: 1px solid #555; padding-top: 4px; margin-top: 40px; }

  .footer { text-align: center; margin-top: 28px; font-size: 10px; color: #888; }
</style>
</head>
<body>
<div class="wrap">
  <div class="hdr">
    <div class="hdr-left">
      <h1>Al Rehman Rice Mills</h1>
      <p>Deepalpur Road, Babarkhai, Arzanipur, Chunian, Kasur – Pakistan</p>
    </div>
    <div class="hdr-right">
      <h2>Weight Bridge Slip</h2>
      <div class="badge">${i.invoiceCode}</div>
      <p style="font-size:10px;color:#555;margin-top:6px;">${new Date(i.createdAt).toLocaleString("en-PK")}</p>
    </div>
  </div>

  <div class="info">
    <div class="box">
      <h4>Party Details</h4>
      <p><b>Vendor:</b> ${i.vendorName}</p>
      <p><b>Product:</b> ${i.productName}</p>
    </div>
    <div class="box">
      <h4>Transport Details</h4>
      <p><b>Vehicle No.:</b> ${i.vehicleNumber||"—"}</p>
      <p><b>Vehicle Type:</b> ${i.vehicleType}</p>
      <p><b>Rate:</b> Rs ${a(i.rate)}</p>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th class="r">Weight (kg)</th>
        <th>Driver</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>First Weight</td>
        <td class="r">${a(n)}</td>
        <td>${i.firstWeightWithDriver?"With Driver":"Without Driver"}</td>
        <td>${p(i.firstWeightTime||i.createdAt)}</td>
      </tr>
      <tr>
        <td>Second Weight</td>
        <td class="r">${l?a(l):"—"}</td>
        <td>${i.secondWeight?i.secondWeightWithDriver?"With Driver":"Without Driver":"—"}</td>
        <td>${p(i.secondWeightTime)}</td>
      </tr>
      <tr class="net">
        <td>Net Weight</td>
        <td class="r">${a(z)}</td>
        <td colspan="2"></td>
      </tr>
      <tr class="unit">
        <td>Net Weight (Maund)</td>
        <td class="r">${W.toFixed(2)} Mn</td>
        <td colspan="2"></td>
      </tr>
      <tr class="unit">
        <td>Net Weight (Metric Ton)</td>
        <td class="r">${y.toFixed(2)} T</td>
        <td colspan="2"></td>
      </tr>
    </tbody>
  </table>

  <div class="sig">
    <div><span>Authorized Signature</span></div>
    <div><span>Receiver's Signature</span></div>
    <div><span>Stamp</span></div>
  </div>

  <p class="footer">This is a computer-generated slip. Thank you for your business.</p>
</div>
<script>window.onload = () => window.print();<\/script>
</body>
</html>`,u=window.open("","_blank");u.document.write(k),u.document.close()},m=r.length,g=r.filter(i=>i.completed).length,w=m-g,N=r.filter(i=>i.completed).reduce((i,n)=>i+(n.netWeight||0),0),j=new Date().toLocaleDateString("en-PK",{weekday:"short",day:"numeric",month:"short",year:"numeric"}),x="border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-700 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition placeholder-zinc-300 bg-white font-medium";return e.jsxs(D,{children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Barlow:wght@300;400;500;600&family=Roboto+Mono:wght@400;500;600&display=swap');
        .wbr-root  { font-family: 'Barlow', sans-serif; }
        .wbr-title { font-family: 'Barlow Condensed', sans-serif; }
        .wbr-mono  { font-family: 'Roboto Mono', monospace; }
        .card-in   { animation: cardIn .2s ease both; }
        @keyframes cardIn {
          from { opacity:0; transform:translateY(6px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}),e.jsxs("div",{className:"wbr-root min-h-screen bg-zinc-100 pb-20",children:[e.jsxs("div",{className:"bg-zinc-900 rounded-2xl mb-6 overflow-hidden shadow-2xl",children:[e.jsxs("div",{className:"bg-amber-400 px-8 py-1.5 flex items-center justify-between",children:[e.jsx("span",{className:"wbr-title text-zinc-900 text-xs font-bold uppercase tracking-[.18em]",children:"Operations Module"}),e.jsx("span",{className:"wbr-mono text-zinc-900 text-xs",children:j})]}),e.jsxs("div",{className:"px-8 py-6",children:[e.jsx("p",{className:"text-zinc-500 text-xs uppercase tracking-[.2em] mb-1",children:"Weight Bridge"}),e.jsx("h1",{className:"wbr-title text-5xl font-extrabold text-white leading-none tracking-tight",children:"INVOICES"})]}),e.jsx("div",{className:"grid grid-cols-4 divide-x divide-zinc-800 border-t border-zinc-800",children:[{label:"Total",value:m,unit:"entries",color:"text-white"},{label:"Complete",value:g,unit:"invoices",color:"text-emerald-400"},{label:"Pending",value:w,unit:"invoices",color:"text-amber-400"},{label:"Total Net",value:a(Math.round(N)),unit:"kg net",color:"text-zinc-300"}].map(i=>e.jsxs("div",{className:"px-6 py-4 text-center",children:[e.jsx("p",{className:"text-zinc-500 text-[9px] uppercase tracking-widest mb-1",children:i.label}),e.jsx("p",{className:`wbr-mono text-2xl font-bold ${i.color} leading-none`,children:i.value}),e.jsx("p",{className:"text-zinc-600 text-[10px] mt-0.5",children:i.unit})]},i.label))})]}),e.jsxs("div",{className:"bg-white rounded-2xl shadow-sm border border-zinc-100 px-6 py-4 mb-6",children:[e.jsx("p",{className:"text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3",children:"Filter Invoices"}),e.jsxs("div",{className:"flex flex-wrap gap-3 items-end",children:[e.jsx("input",{type:"text",placeholder:"Vendor name...",value:s.vendor,onChange:i=>d({...s,vendor:i.target.value}),className:x}),e.jsx("input",{type:"text",placeholder:"Product name...",value:s.product,onChange:i=>d({...s,product:i.target.value}),className:x}),e.jsx("input",{type:"date",value:s.date,onChange:i=>d({...s,date:i.target.value}),className:x}),e.jsxs("select",{value:s.status,onChange:i=>d({...s,status:i.target.value}),className:x,children:[e.jsx("option",{value:"",children:"All Status"}),e.jsx("option",{value:"complete",children:"Complete"}),e.jsx("option",{value:"pending",children:"Pending"})]}),(s.vendor||s.product||s.date||s.status)&&e.jsx("button",{onClick:()=>d({vendor:"",product:"",date:"",status:""}),className:"px-4 py-2.5 rounded-xl bg-zinc-100 text-zinc-600 text-sm font-semibold hover:bg-zinc-200 transition",children:"Clear ✕"})]})]}),b?e.jsx("div",{className:"grid md:grid-cols-2 gap-5",children:[1,2,3,4].map(i=>e.jsxs("div",{className:"bg-white rounded-2xl overflow-hidden animate-pulse",children:[e.jsx("div",{className:"h-20 bg-zinc-200"}),e.jsxs("div",{className:"p-5 space-y-3",children:[e.jsx("div",{className:"h-4 bg-zinc-100 rounded w-2/3"}),e.jsx("div",{className:"h-3 bg-zinc-100 rounded w-1/2"}),e.jsx("div",{className:"h-8 bg-zinc-100 rounded w-full mt-2"})]})]},i))}):r.length===0?e.jsxs("div",{className:"flex flex-col items-center justify-center py-28 text-center",children:[e.jsx("div",{className:"w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center text-3xl mb-4",children:"⚖️"}),e.jsx("p",{className:"wbr-title text-xl font-bold text-zinc-500 uppercase tracking-wide",children:"No Invoices Found"}),e.jsx("p",{className:"text-sm text-zinc-400 mt-1",children:"Try adjusting your filters."})]}):e.jsxs(e.Fragment,{children:[e.jsxs("p",{className:"text-xs font-semibold text-zinc-400 mb-4 wbr-mono",children:["Showing ",r.length," of ",t.length," entries"]}),e.jsx("div",{className:"grid md:grid-cols-2 gap-5",children:r.map((i,n)=>e.jsx("div",{className:"card-in",style:{animationDelay:`${n*.03}s`},children:e.jsx(M,{e:i,onPrint:v})},i._id))})]})]})]})}export{R as default};
