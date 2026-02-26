import{j as t,S as E,N as L,A as R}from"./index-DDmwnmRS.js";import{b as i}from"./react-CVH9iSHU.js";import{a as F}from"./authFetch-Fl9TvFNU.js";const K=()=>{const[d,u]=i.useState([]),[j,w]=i.useState(!0),[b,x]=i.useState({message:"",type:"info"}),[n,S]=i.useState({total1:0,total2:0,average:0,totalPurchase:0}),[c,T]=i.useState(""),[g,W]=i.useState(""),[m,D]=i.useState(""),[p,A]=i.useState(""),[f,y]=i.useState([]);i.useEffect(()=>{(async()=>{try{const s=await(await F(`${R}/purchase-invoice`)).json();s.success?(u(s.invoices),y(s.invoices),v(s.invoices)):x({message:s.message||"Failed to fetch invoices",type:"error"})}catch{x({message:"Server error!",type:"error"})}finally{w(!1)}})()},[]),i.useEffect(()=>{let e=d;if(c){const a=c.toLowerCase();e=e.filter(s=>s.vendorName?.toLowerCase().includes(a)||s.vehicleNumber?.toLowerCase().includes(a)||s.brokerName?.toLowerCase().includes(a)||String(s.sr)?.includes(a))}g&&(e=e.filter(a=>new Date(a.date)>=new Date(g))),m&&(e=e.filter(a=>new Date(a.date)<=new Date(m))),p&&(e=e.filter(a=>a.paddyType===p)),y(e),v(e)},[c,g,m,p,d]);const v=e=>{if(e.length===0)return;let a=0,s=0,o=0,h=0;e.forEach(l=>{a+=Number(l.finalWeight||0),s+=Number(l.netWeight||0),o+=Number(l.netWeight40KG||0),h+=Number(l.weightKG||0)}),S({total1:a.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}),total2:s.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}),average:(o/e.length).toFixed(5),totalPurchase:h.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})})},I=e=>{const a=window.open("","_blank");if(!a)return;const s=Number(e.filledVehicleWeight||0),o=Number(e.emptyVehicleWeight||0),h=s-o,l=Number(e.moistureAdjustment||0),N=Number(e.netWeight||0),k=N/40,P=`
<!DOCTYPE html>
<html>
<head>
<title>Purchase Invoice ${e.builtyNumber}</title>

<style>
@page {
  size: A4;
  margin: 12mm;              /* 👈 less side margins */
}

body {
  font-family: "Segoe UI", Arial, sans-serif;
  background: #fff;
  color: #111;
}

.invoice {
  max-width: 650px;          /* 👈 narrower invoice */
  margin: auto;
}

/* ===== HEADER ===== */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid #1e3a8a;
  padding-bottom: 10px;
  margin-bottom: 16px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo img {
  height: 55px;
}

.logo h1 {
  font-size: 20px;
  margin: 0;
  color: #1e3a8a;
}

.logo p {
  font-size: 10px;
  margin: 2px 0;
}

.invoice-meta {
  text-align: right;
}

.invoice-meta h2 {
  margin: 0;
  font-size: 18px;
  color: #1e40af;
}

.invoice-meta table {
  font-size: 11px;
  margin-top: 6px;
}

/* ===== INFO BLOCKS ===== */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 14px;
}

.info-box {
  border: 1px solid #e5e7eb;
  padding: 8px;              /* 👈 tighter */
  border-radius: 6px;
}

.info-box h4 {
  margin: 0 0 6px 0;
  font-size: 12px;
  color: #1e3a8a;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 3px;
}

.info-box p {
  font-size: 11px;
  margin: 3px 0;
}

/* ===== TABLES ===== */
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;           /* 👈 smaller text */
  margin-top: 10px;
}

th {
  background: #1e3a8a;
  color: #fff;
  padding: 5px 4px;          /* 👈 compact columns */
  text-align: center;        /* 👈 centered */
}

td {
  border: 1px solid #000;
  padding: 4px 4px;          /* 👈 less width */
}

.right {
  text-align: center;        /* 👈 figures centered */
}

.highlight {
  background: #f1f5ff;
  font-weight: bold;
}

/* ===== TOTALS ===== */
.totals td {
  font-weight: bold;
  font-size: 12px;
  padding: 6px 4px;
}

.grand-total {
  font-size: 14px;
  color: #1e3a8a;
  text-align: center;
}

/* ===== SIGNATURE ===== */
.signature {
  margin-top: 36px;
  display: flex;
  justify-content: space-between;
  font-size: 11px;
}

.signature div {
  width: 45%;
  text-align: center;
}

.signature span {
  display: block;
  margin-top: 36px;
  border-top: 1px solid #000;
  padding-top: 4px;
}
</style>

</head>

<body>
<div class="invoice">

<!-- ===== HEADER ===== -->
<div class="header">
  <div class="logo">
    <img src="/logo.png" />
    <div>
      <h1>Al Rehman Rice Mills</h1>
      <p>Deepalpur Road, Babarkhai, Arzanipur</p>
      <p>Chunian, Kasur – Pakistan</p>
      <p><b>0301-4349041</b> | <b>0300-8402130</b></p>
    </div>
  </div>

  <div class="invoice-meta">
    <h2>PURCHASE INVOICE</h2>
    <table>
      <tr><td><b>Invoice #</b></td><td>${e.builtyNumber}</td></tr>
      <tr><td><b>Date</b></td><td>${e.date}</td></tr>
    </table>
  </div>
</div>

<!-- ===== INFO ===== -->
<div class="info-grid">
  <div class="info-box">
    <h4>SUPPLIER DETAILS</h4>
    <p><b>Name:</b> ${e.vendorName}</p>
    <p><b>Company:</b> Zam Zam Rice Mills</p>
    <p><b>City:</b> Kasur</p>
    <p><b>Phone:</b> 0329-0999329</p>
  </div>

  <div class="info-box">
    <h4>TRANSPORT DETAILS</h4>
    <p><b>Vehicle No:</b> ${e.vehicleNumber}</p>
    <p><b>Broker:</b> ${e.brokerName||"-"}</p>
    <p><b>Paddy Type:</b> ${e.paddyType}</p>
    <p><b>Rate (40kg):</b> Rs ${e.rate40kg}</p>
  </div>
</div>

<!-- ===== WEIGHT DETAILS ===== -->
<table>
<tr>
<th>Description</th>
<th>Details</th>
<th class="right">Weight (Kgs)</th>
</tr>

<tr><td rowspan="3">Vehicle Weight</td><td>Filled Weight</td><td class="right">${s}</td></tr>
<tr><td>Empty Weight</td><td class="right">${o}</td></tr>
<tr class="highlight"><td>Load Weight</td><td class="right">${h}</td></tr>

<tr><td rowspan="2">Bags</td><td>No. of Bags</td><td class="right">${e.quantity}</td></tr>
<tr><td>Bag Weight</td><td class="right">${e.bagWeight}</td></tr>

<tr><td>Moisture Deduction</td><td>Adjustment</td><td class="right">${l}</td></tr>
</table>

<!-- ===== TOTALS ===== -->
<table class="totals">
<tr><td>Net Weight (Kgs)</td><td class="right">${N}</td></tr>
<tr><td>Net Weight (Maund)</td><td class="right">${k.toFixed(2)}</td></tr>
<tr class="grand-total"><td>TOTAL AMOUNT</td><td class="right">Rs ${e.amount}</td></tr>
</table>

<!-- ===== SIGNATURE ===== -->
<div class="signature">
  <div>
    <span>Authorized Signature</span>
  </div>
  <div>
    <span>Stamp</span>
  </div>
</div>

<p style="text-align:center;margin-top:30px;font-size:12px">
Thank you for your business
</p>

</div>

<script>window.print()<\/script>
</body>
</html>
`;a.document.write(P),a.document.close()};return t.jsxs(E,{children:[t.jsx(L,{message:b.message,type:b.type,onClose:()=>x({message:"",type:"info"})}),t.jsx("h2",{className:"text-3xl font-bold mb-6 text-gray-800 tracking-wide",children:"Purchase Invoices"}),t.jsx("div",{className:"bg-white border border-gray-200 rounded-xl shadow-sm p-5 mb-8",children:t.jsxs("div",{className:"grid md:grid-cols-5 gap-4 items-end",children:[t.jsxs("div",{className:"md:col-span-2",children:[t.jsx("label",{className:"block text-sm font-medium mb-1",children:"Search"}),t.jsx("input",{value:c,onChange:e=>T(e.target.value),placeholder:"Invoice #, Vendor, Vehicle, Broker...",className:"w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"})]}),t.jsxs("div",{children:[t.jsx("label",{className:"block text-sm font-medium mb-1",children:"From Date"}),t.jsx("input",{type:"date",value:g,onChange:e=>W(e.target.value),className:"w-full border rounded-lg px-3 py-2"})]}),t.jsxs("div",{children:[t.jsx("label",{className:"block text-sm font-medium mb-1",children:"To Date"}),t.jsx("input",{type:"date",value:m,onChange:e=>D(e.target.value),className:"w-full border rounded-lg px-3 py-2"})]}),t.jsxs("div",{children:[t.jsx("label",{className:"block text-sm font-medium mb-1",children:"Paddy Type"}),t.jsxs("select",{value:p,onChange:e=>A(e.target.value),className:"w-full border rounded-lg px-3 py-2",children:[t.jsx("option",{value:"",children:"All"}),[...new Set(d.map(e=>e.paddyType))].map(e=>t.jsx("option",{value:e,children:e},e))]})]})]})}),t.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10",children:[{title:"Total Final Weight",value:n.total1},{title:"Total Net Weight",value:n.total2},{title:"Average Net / 40KG",value:n.average},{title:"Total Purchase KG",value:n.totalPurchase}].map((e,a)=>t.jsxs("div",{className:"bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition",children:[t.jsx("p",{className:"text-sm font-medium text-gray-500",children:e.title}),t.jsx("p",{className:"text-2xl font-bold text-gray-800 mt-2",children:e.value})]},a))}),j?t.jsxs("div",{className:"animate-pulse space-y-8","aria-hidden":"true",children:[t.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10",children:[1,2,3,4].map(e=>t.jsxs("div",{className:"bg-white border border-gray-200 p-6 rounded-xl shadow-sm",children:[t.jsx("div",{className:"h-4 w-32 bg-gray-200 rounded mb-2"}),t.jsx("div",{className:"h-8 w-24 bg-gray-200 rounded mt-2"})]},e))}),[1,2,3,4].map(e=>t.jsxs("div",{className:"bg-white border border-gray-200 rounded-2xl shadow-sm p-6",children:[t.jsxs("div",{className:"flex justify-between flex-wrap gap-4 mb-6 border-b pb-4",children:[t.jsxs("div",{className:"space-y-2",children:[t.jsx("div",{className:"h-6 w-28 bg-gray-200 rounded"}),t.jsx("div",{className:"h-4 w-20 bg-gray-200 rounded"}),t.jsx("div",{className:"h-4 w-36 bg-gray-200 rounded"})]}),t.jsx("div",{className:"h-10 w-28 bg-gray-200 rounded"})]}),t.jsx("div",{className:"grid md:grid-cols-4 gap-6 text-sm",children:[1,2,3,4].map(a=>t.jsxs("div",{className:"space-y-2",children:[t.jsx("div",{className:"h-4 w-full bg-gray-200 rounded"}),t.jsx("div",{className:"h-4 w-3/4 bg-gray-200 rounded"}),t.jsx("div",{className:"h-4 w-1/2 bg-gray-200 rounded"})]},a))})]},e))]}):f.length===0?t.jsx("p",{className:"text-gray-600 italic",children:"No purchase invoices found."}):t.jsx("div",{className:"space-y-8",children:f.map(e=>t.jsxs("div",{className:"bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-6",children:[t.jsxs("div",{className:"flex justify-between flex-wrap gap-4 mb-6 border-b pb-4",children:[t.jsxs("div",{children:[t.jsxs("h3",{className:"text-xl font-bold",children:["Invoice #",e.sr]}),t.jsx("p",{children:e.date}),t.jsx(r,{label:"Ledger Reference",value:e.ledgerReference})]}),t.jsx("button",{onClick:()=>I(e),className:"bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition font-medium",children:"View / Print"})]}),t.jsxs("div",{className:"grid md:grid-cols-4 gap-6 text-sm",children:[t.jsxs("div",{className:"space-y-2",children:[t.jsx(r,{label:"Paddy Type",value:e.paddyType}),t.jsx(r,{label:"Rate / 40KG",value:e.rate40kg}),t.jsx(r,{label:"Net Weight",value:e.netWeight})]}),t.jsxs("div",{className:"space-y-2",children:[t.jsx(r,{label:"Vendor",value:e.vendorName}),t.jsx(r,{label:"Quantity",value:e.quantity}),t.jsx(r,{label:"Net Weight (40KG)",value:e.netWeight40KG})]}),t.jsxs("div",{className:"space-y-2",children:[t.jsx(r,{label:"Broker",value:e.brokerName}),t.jsx(r,{label:"Final Weight",value:e.finalWeight})]}),t.jsxs("div",{className:"space-y-2",children:[t.jsx(r,{label:"Vehicle Number",value:e.vehicleNumber}),t.jsx(r,{label:"Moisture %",value:e.moisturePercent}),t.jsx(r,{label:"Amount",value:e.amount})]})]})]},e._id))})]})},r=({label:d,value:u})=>t.jsxs("p",{className:"text-gray-700",children:[t.jsxs("span",{className:"font-semibold text-gray-900",children:[d,":"]})," ",u]});export{K as default};
