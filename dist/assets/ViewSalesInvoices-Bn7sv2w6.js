import{j as e,S as z,N as B,A as P}from"./index-BsxlFMln.js";import{b as n}from"./react-CVH9iSHU.js";import{a as F}from"./authFetch-Fl9TvFNU.js";const a=o=>o==null?0:typeof o=="number"?o:typeof o=="string"&&Number(o.replace(/,/g,""))||0,d=o=>a(o).toLocaleString("en-PK",{maximumFractionDigits:0}),q=()=>{const[o,k]=n.useState([]),[T,I]=n.useState(!0),[N,v]=n.useState({message:"",type:"info"}),[u,w]=n.useState({total:0,phukar:0,polish:0,rice:0}),[x,W]=n.useState(""),[b,D]=n.useState(""),[f,C]=n.useState(""),[y,$]=n.useState(""),[S,A]=n.useState([]);n.useEffect(()=>{(async()=>{try{const l=localStorage.getItem("token"),r=await(await F(`${P}/sales-invoice`)).json();if(r.success){k(r.invoices),A(r.invoices);const p=r.invoices.reduce((c,g)=>c+a(g.totalAmount2),0),h=r.invoices.reduce((c,g)=>c+a(g.quantity),0),s=r.invoices.reduce((c,g)=>c+a(g.netWeight),0),i=r.invoices.reduce((c,g)=>c+a(g.amount),0),m=r.invoices.length||1;w({total:p,phukar:Math.round(h/m),polish:Math.round(s/m),rice:Math.round(i/m)})}else v({message:r.message||"Failed to fetch invoices",type:"error"})}catch{v({message:"Server error!",type:"error"})}finally{I(!1)}})()},[]),n.useEffect(()=>{let t=o;if(x){const s=x.toLowerCase();t=t.filter(i=>i.vendorName?.toLowerCase().includes(s)||i.vehicleNo?.toLowerCase().includes(s)||i.brokerName?.toLowerCase().includes(s)||String(i.sr)?.includes(s))}b&&(t=t.filter(s=>new Date(s.date)>=new Date(b))),f&&(t=t.filter(s=>new Date(s.date)<=new Date(f))),y&&(t=t.filter(s=>s.paddyType===y));const l=t.reduce((s,i)=>s+a(i.totalAmount2),0),j=t.reduce((s,i)=>s+a(i.quantity),0),r=t.reduce((s,i)=>s+a(i.netWeight),0),p=t.reduce((s,i)=>s+a(i.amount),0),h=t.length||1;w({total:l,phukar:Math.round(j/h),polish:Math.round(r/h),rice:Math.round(p/h)}),A(t)},[x,b,f,y,o]);const E=t=>{const l=window.open("","_blank");if(!l)return;const j=a(t.weight),r=a(t.quantity)*a(t.bagWeight),p=a(t.netWeight),s=a(t.quantity)*3,i=p-s,m=i/40,c=a(t.totalAmount),g=a(t.sutliSilaiAmount),L=a(t.totalAmount2)||c+g+a(t.brokery),R=`
<!DOCTYPE html>
<html>
<head>
<title>Sales Invoice ${t.builtyNo}</title>

<style>
@page {
  size: A4;
  margin: 12mm;
}

body {
  font-family: "Segoe UI", Arial, sans-serif;
  background: #fff;
  color: #111;
}

.invoice {
  max-width: 650px;   /* 👈 narrower invoice */
  margin: auto;
}

/* ===== HEADER ===== */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid #1e3a8a;
  padding-bottom: 12px;
  margin-bottom: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo img {
  height: 60px;
}

.logo h1 {
  font-size: 22px;
  margin: 0;
  color: #1e3a8a;
}

.logo p {
  font-size: 11px;
  margin: 2px 0;
}

.invoice-meta {
  text-align: right;
}

.invoice-meta h2 {
  margin: 0;
  font-size: 20px;
  color: #1e40af;
}

.invoice-meta table {
  font-size: 12px;
  margin-top: 6px;
}

/* ===== INFO BLOCKS ===== */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.info-box {
  border: 1px solid #e5e7eb;
  padding: 8px;      /* 👈 less width usage */
  border-radius: 6px;
}


.info-box h4 {
  margin: 0 0 8px 0;
  font-size: 13px;
  color: #1e3a8a;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 4px;
}

.info-box p {
  font-size: 12px;
  margin: 4px 0;
}

/* ===== TABLES ===== */
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;        /* 👈 slightly smaller */
  margin-top: 12px;
}

th {
  background: #1e3a8a;
  color: #fff;
  padding: 5px 4px;       /* 👈 less horizontal padding */
  text-align: center;    /* 👈 centered headers */
  font-size: 11px;
}

td {
  border: 1px solid #000;
  padding: 4px 4px;       /* 👈 tighter columns */
}

td {
  border: 1px solid #000;
  padding: 6px;
}

.right {
  text-align: center;    /* 👈 figures centralized */
}

.highlight {
  background: #f1f5ff;
  font-weight: bold;
}

/* ===== TOTALS ===== */
.totals {
  margin-top: 16px;
}

.totals td {
  font-weight: bold;
  font-size: 12px;
  padding: 6px 4px;
}

.grand-total {
  font-size: 15px;
  color: #1e3a8a;
  text-align: center;   /* 👈 visually strong */
}


/* ===== SIGNATURE ===== */
.signature {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.signature div {
  width: 45%;
  text-align: center;
}

.signature span {
  display: block;
  margin-top: 40px;
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
    <h2>SALE INVOICE</h2>
    <table>
      <tr><td><b>Invoice #</b></td><td>${t.builtyNo}</td></tr>
      <tr><td><b>Date</b></td><td>${t.date}</td></tr>
    </table>
  </div>
</div>

<!-- ===== INFO ===== -->
<div class="info-grid">
  <div class="info-box">
    <h4>BILL TO</h4>
    <p><b>Name:</b> ${t.vendorName}</p>
    <p><b>Company:</b> D.T Rice Mills</p>
    <p><b>City:</b> Hyderabad</p>
    <p><b>Phone:</b> 0329-0999329</p>
  </div>

  <div class="info-box">
    <h4>TRANSPORT DETAILS</h4>
    <p><b>Vehicle No:</b> ${t.vehicleNo}</p>
    <p><b>Broker:</b> ${t.brokerName}</p>
    <p><b>Paddy Type:</b> ${t.paddyType}</p>
    <p><b>Rate (40kg):</b> Rs ${d(t.rate40)}</p>
  </div>
</div>

<!-- ===== WEIGHT TABLE ===== -->
<table>
<tr>
<th>Description</th>
<th>Details</th>
<th class="right">Weight (Kgs)</th>
</tr>

<tr><td rowspan="3">Weight</td><td>Filled Weight</td><td class="right">${d(j)}</td></tr>
<tr><td>Empty Weight</td><td class="right">${d(r)}</td></tr>
<tr class="highlight"><td>Net Load Weight</td><td class="right">${d(p)}</td></tr>

<tr><td rowspan="2">Bags</td><td>No. of Bags</td><td class="right">${d(t.quantity)}</td></tr>
<tr><td>Bag Weight</td><td class="right">${d(t.bagWeight)}</td></tr>

<tr><td>Deduction</td><td>3 Kg / Bag</td><td class="right">${d(s)}</td></tr>
</table>

<!-- ===== TOTALS ===== -->
<table class="totals">
<tr><td>Net Weight (Kgs)</td><td class="right">${d(i)}</td></tr>
<tr><td>Net Weight (Maund)</td><td class="right">${d(m)}</td></tr>
<tr><td>Subtotal</td><td class="right">${d(c)}</td></tr>
<tr><td>Bag Closing Cost</td><td class="right">${d(g)}</td></tr>
<tr class="grand-total"><td>GRAND TOTAL</td><td class="right">Rs ${d(L)}</td></tr>
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
`;l.document.write(R),l.document.close()};return e.jsxs(z,{children:[e.jsx(B,{message:N.message,type:N.type,onClose:()=>v({message:"",type:"info"})}),e.jsx("h2",{className:"text-3xl font-bold mb-6 text-gray-800 tracking-wide",children:"Sales Invoices"}),e.jsx("div",{className:"bg-white border border-gray-200 rounded-xl shadow-sm p-5 mb-8",children:e.jsxs("div",{className:"grid md:grid-cols-5 gap-4 items-end",children:[e.jsxs("div",{className:"md:col-span-2",children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Search"}),e.jsx("input",{value:x,onChange:t=>W(t.target.value),placeholder:"Invoice #, Vendor, Vehicle, Broker...",className:"w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"From Date"}),e.jsx("input",{type:"date",value:b,onChange:t=>D(t.target.value),className:"w-full border rounded-lg px-3 py-2"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"To Date"}),e.jsx("input",{type:"date",value:f,onChange:t=>C(t.target.value),className:"w-full border rounded-lg px-3 py-2"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Paddy Type"}),e.jsxs("select",{value:y,onChange:t=>$(t.target.value),className:"w-full border rounded-lg px-3 py-2",children:[e.jsx("option",{value:"",children:"All"}),[...new Set(o.map(t=>t.paddyType))].map(t=>e.jsx("option",{value:t,children:t},t))]})]})]})}),T?e.jsxs("div",{className:"animate-pulse","aria-hidden":"true",children:[e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10",children:[1,2,3,4].map(t=>e.jsxs("div",{className:"bg-white p-6 rounded-xl shadow",children:[e.jsx("div",{className:"h-4 w-28 bg-gray-200 rounded mb-2"}),e.jsx("div",{className:"h-8 w-20 bg-gray-200 rounded mt-2"})]},t))}),[1,2,3,4].map(t=>e.jsxs("div",{className:"bg-white p-6 mb-6 rounded-xl shadow",children:[e.jsxs("div",{className:"flex justify-between mb-4",children:[e.jsx("div",{className:"h-6 w-28 bg-gray-200 rounded"}),e.jsx("div",{className:"h-10 w-28 bg-gray-200 rounded"})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 text-sm",children:[1,2,3].map(l=>e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"h-4 w-full bg-gray-200 rounded"}),e.jsx("div",{className:"h-4 w-4/5 bg-gray-200 rounded"}),e.jsx("div",{className:"h-4 w-3/4 bg-gray-200 rounded"}),l===3&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"h-4 w-1/2 bg-gray-200 rounded"}),e.jsx("div",{className:"h-4 w-1/2 bg-gray-200 rounded"})]})]},l))})]},t))]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10",children:[{title:"Total Amount",value:d(u.total)},{title:"Average Phukar",value:d(u.phukar)},{title:"Average Polish",value:d(u.polish)},{title:"Average Rice",value:d(u.rice)}].map((t,l)=>e.jsxs("div",{className:"bg-white p-6 rounded-xl shadow",children:[e.jsx("p",{className:"text-sm text-gray-500",children:t.title}),e.jsx("p",{className:"text-2xl font-bold",children:t.value})]},l))}),S.length===0?e.jsx("p",{className:"text-gray-500 italic",children:"No sales invoices found."}):S.map(t=>e.jsxs("div",{className:"bg-white p-6 mb-6 rounded-xl shadow",children:[e.jsxs("div",{className:"flex justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-bold",children:["Invoice #",t.sr]}),e.jsx("button",{onClick:()=>E(t),className:"bg-blue-600 text-white px-4 py-2 rounded",children:"View / Print"})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700",children:[e.jsxs("div",{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Paddy Type:"})," ",t.paddyType]}),e.jsxs("p",{children:[e.jsx("b",{children:"Vehicle No:"})," ",t.vehicleNo]}),e.jsxs("p",{children:[e.jsx("b",{children:"Net Weight:"})," ",t.netWeight]})]}),e.jsxs("div",{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Vendor:"})," ",t.vendorName]}),e.jsxs("p",{children:[e.jsx("b",{children:"Rate (40kg):"})," ",t.rate40]}),e.jsxs("p",{children:[e.jsx("b",{children:"Net Weight (40kg):"})," ",t.netWeight40]})]}),e.jsxs("div",{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Broker:"})," ",t.brokerName]}),e.jsxs("p",{children:[e.jsx("b",{children:"No. of Bags:"})," ",t.quantity]}),e.jsxs("p",{children:[e.jsx("b",{children:"Sutli Silai:"})," ",t.sutliSilaiAmount]}),e.jsxs("p",{children:[e.jsx("b",{children:"Subtotal:"})," ",t.totalAmount]}),e.jsxs("p",{children:[e.jsx("b",{children:"Grand Total:"})," ",t.totalAmount2]})]})]})]},t._id))]})]})};export{q as default};
