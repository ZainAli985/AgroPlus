import{A as v,j as t,S as j}from"./index-CaWejyk5.js";import{b as a}from"./react-CVH9iSHU.js";import{a as N}from"./authFetch-Fl9TvFNU.js";function S(){const[o,l]=a.useState([]),[d,n]=a.useState([]),[s,r]=a.useState({vendor:"",product:"",date:""});a.useEffect(()=>{c()},[]),a.useEffect(()=>{p()},[s,o]);const c=async()=>{try{const i=await(await N(`${v}/weight-bridge`)).json();i.success&&(l(i.entries),n(i.entries))}catch(e){console.error("Error loading report:",e)}},p=()=>{let e=[...o];s.vendor&&(e=e.filter(i=>i.vendorName.toLowerCase().includes(s.vendor.toLowerCase()))),s.product&&(e=e.filter(i=>i.productName.toLowerCase().includes(s.product.toLowerCase()))),s.date&&(e=e.filter(i=>new Date(i.createdAt).toDateString()===new Date(s.date).toDateString())),n(e)},g=e=>{const i=window.open("","_blank");if(!i)return;const h=Number(e.firstWeight||0),x=Number(e.secondWeight||0),m=Number(e.netWeight||0),b=Number(e.netWeightMaund||0),u=Number(e.netWeightTon||0),f=`
  <!DOCTYPE html>
  <html>
  <head>
  <title>Weight Bridge Slip</title>
  
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
    max-width: 650px;
    margin: auto;
  }
  
  /* HEADER */
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
  
  /* INFO BOX */
  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 14px;
  }
  
  .info-box {
    border: 1px solid #e5e7eb;
    padding: 8px;
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
  
  /* TABLE */
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
    margin-top: 10px;
  }
  
  th {
    background: #1e3a8a;
    color: #fff;
    padding: 5px 4px;
    text-align: center;
  }
  
  td {
    border: 1px solid #000;
    padding: 4px 4px;
  }
  
  .right {
    text-align: center;
  }
  
  .highlight {
    background: #f1f5ff;
    font-weight: bold;
  }
  
  /* SIGNATURE */
  .signature {
    margin-top: 40px;
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
      <h2>WEIGHT BRIDGE SLIP</h2>
      <p><b>Date:</b> ${new Date(e.createdAt).toLocaleString()}</p>
    </div>
  </div>
  
  <div class="info-grid">
    <div class="info-box">
      <h4>PARTY DETAILS</h4>
      <p><b>Vendor:</b> ${e.vendorName}</p>
      <p><b>Product:</b> ${e.productName}</p>
      <p><b>Mode:</b> ${e.mode}</p>
    </div>
  
    <div class="info-box">
      <h4>TRANSPORT DETAILS</h4>
      <p><b>Vehicle Type:</b> ${e.vehicleType}</p>
      <p><b>Rate:</b> Rs ${e.rate}</p>
    </div>
  </div>
  
  <table>
  <tr>
  <th>Description</th>
  <th class="right">Weight (Kgs)</th>
  </tr>
  
  <tr>
  <td>First Weight</td>
  <td class="right">${h}</td>
  </tr>
  
  <tr>
  <td>Second Weight</td>
  <td class="right">${x}</td>
  </tr>
  
  <tr class="highlight">
  <td>Net Weight</td>
  <td class="right">${m}</td>
  </tr>
  
  <tr>
  <td>Net Weight (Maund)</td>
  <td class="right">${b.toFixed(2)}</td>
  </tr>
  
  <tr>
  <td>Net Weight (Tons)</td>
  <td class="right">${u.toFixed(2)}</td>
  </tr>
  </table>
  
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
  `;i.document.write(f),i.document.close()};return t.jsx(j,{children:t.jsxs("div",{className:"max-w-7xl mx-auto",children:[t.jsx("h1",{className:"text-3xl font-bold mb-6",children:"Weight Bridge Report"}),t.jsxs("div",{className:"bg-white p-4 rounded-xl shadow mb-6 grid md:grid-cols-3 gap-4",children:[t.jsx("input",{type:"text",placeholder:"Filter by Vendor",className:"input",onChange:e=>r({...s,vendor:e.target.value})}),t.jsx("input",{type:"text",placeholder:"Filter by Product",className:"input",onChange:e=>r({...s,product:e.target.value})}),t.jsx("input",{type:"date",className:"input",onChange:e=>r({...s,date:e.target.value})})]}),d.length===0&&t.jsx("div",{className:"text-center text-gray-500",children:"No Weight Bridge Entries Found"}),t.jsx("div",{className:"grid md:grid-cols-2 gap-6",children:d.map(e=>t.jsxs("div",{id:`invoice-${e._id}`,className:"bg-white p-6 rounded-2xl shadow-lg border",children:[t.jsxs("div",{className:"flex justify-between mb-4",children:[t.jsxs("div",{children:[t.jsx("h2",{className:"text-xl font-semibold",children:e.productName}),t.jsx("p",{className:"text-sm text-gray-500",children:new Date(e.createdAt).toLocaleString()})]}),t.jsxs("div",{className:"text-right",children:[t.jsxs("p",{className:"font-bold text-lg",children:[e.netWeight," kg"]}),t.jsxs("p",{className:"text-sm text-gray-500",children:[e.netWeightTon.toFixed(2)," Tons"]})]})]}),t.jsxs("div",{className:"grid grid-cols-2 gap-4 text-sm",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"Vendor:"})," ",e.vendorName]}),t.jsxs("p",{children:[t.jsx("strong",{children:"Vehicle:"})," ",e.vehicleType]}),t.jsxs("p",{children:[t.jsx("strong",{children:"Mode:"})," ",e.mode]}),t.jsxs("p",{children:[t.jsx("strong",{children:"Rate:"})," ",e.rate]}),t.jsxs("p",{children:[t.jsx("strong",{children:"Maunds:"})," ",e.netWeightMaund.toFixed(2)]})]}),t.jsx("div",{className:"flex justify-end gap-3 mt-6",children:t.jsx("button",{onClick:()=>g(e),className:"bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700",children:"Print"})})]},e._id))})]})})}export{S as default};
