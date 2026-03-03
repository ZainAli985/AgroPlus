import{j as e,S as b,A as v}from"./index-B8OePmeB.js";import{b as d}from"./react-CVH9iSHU.js";import{a as f}from"./authFetch-Fl9TvFNU.js";function N(){const[o,h]=d.useState([]),[n,c]=d.useState([]),[i,a]=d.useState({vendor:"",product:"",date:""});d.useEffect(()=>{(async()=>{try{const r=await(await f(`${v}/weight-bridge`)).json();r.success&&(h(r.entries),c(r.entries))}catch(s){console.error("Error loading report:",s)}})()},[]),d.useEffect(()=>{let t=[...o];i.vendor&&(t=t.filter(s=>s.vendorName.toLowerCase().includes(i.vendor.toLowerCase()))),i.product&&(t=t.filter(s=>s.productName.toLowerCase().includes(i.product.toLowerCase()))),i.date&&(t=t.filter(s=>new Date(s.createdAt).toDateString()===new Date(i.date).toDateString())),c(t)},[i,o]);const g=t=>{const s=Number(t.firstWeight||0),r=Number(t.secondWeight||0),p=Number(t.netWeight||0),x=Number(t.netWeightMaund||0),m=Number(t.netWeightTon||0),u=`
    <!DOCTYPE html>
    <html>
    <head>
    <title>Weight Bridge Slip</title>
    <style>
      @page { size: A4; margin: 12mm; }
      body { font-family: "Segoe UI", Arial, sans-serif; color: #111; }
      .invoice { max-width: 650px; margin: auto; }
      .header { display: flex; justify-content: space-between; border-bottom: 3px solid #1e3a8a; padding-bottom: 10px; margin-bottom: 16px; }
      .logo h1 { font-size: 20px; color: #1e3a8a; margin: 0; }
      .invoice-meta h2 { margin: 0; font-size: 18px; color: #1e40af; }
      .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }
      .info-box { border: 1px solid #e5e7eb; padding: 8px; border-radius: 6px; }
      .info-box h4 { font-size: 12px; color: #1e3a8a; border-bottom: 1px solid #e5e7eb; margin: 0 0 6px 0; padding-bottom: 3px; }
      table { width: 100%; border-collapse: collapse; font-size: 11px; margin-top: 10px; }
      th { background: #1e3a8a; color: #fff; padding: 5px 4px; text-align: center; }
      td { border: 1px solid #000; padding: 4px 4px; }
      .right { text-align: center; }
      .highlight { background: #f1f5ff; font-weight: bold; }
      .signature { margin-top: 40px; display: flex; justify-content: space-between; font-size: 11px; }
      .signature span { display: block; margin-top: 36px; border-top: 1px solid #000; padding-top: 4px; }
    </style>
    </head>
    <body>
      <div class="invoice">
        <div class="header">
          <div>
            <h1>Al Rehman Rice Mills</h1>
            <p>Deepalpur Road, Babarkhai, Arzanipur</p>
            <p>Chunian, Kasur – Pakistan</p>
          </div>
          <div class="invoice-meta">
            <h2>WEIGHT BRIDGE SLIP</h2>
            <p><b>Invoice:</b> ${t.invoiceCode}</p>
            <p><b>Invoice Created:</b> ${new Date(t.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div class="info-grid">
          <div class="info-box">
            <h4>PARTY DETAILS</h4>
            <p><b>Vendor:</b> ${t.vendorName}</p>
            <p><b>Product:</b> ${t.productName}</p>
          </div>
          <div class="info-box">
            <h4>TRANSPORT DETAILS</h4>
            <p><b>Vehicle Type:</b> ${t.vehicleType}</p>
            <p><b>Rate:</b> Rs ${t.rate}</p>
          </div>
        </div>

        <table>
          <tr>
            <th>Description</th>
            <th class="right">Weight (Kgs)</th>
            <th class="right">Driver</th>
            <th class="right">Time</th>
          </tr>
          <tr>
            <td>First Weight</td>
            <td class="right">${s}</td>
            <td class="right">${t.firstWeightWithDriver?"With Driver":"Without Driver"}</td>
            <td class="right">${new Date(t.firstWeightTime||t.createdAt).toLocaleString()}</td>
          </tr>
          <tr>
            <td>Second Weight</td>
            <td class="right">${r}</td>
            <td class="right">${t.secondWeightWithDriver?"With Driver":"Without Driver"}</td>
            <td class="right">${t.secondWeightTime?new Date(t.secondWeightTime).toLocaleString():"-"}</td>
          </tr>
          <tr class="highlight">
            <td>Net Weight</td>
            <td class="right">${p}</td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td>Net Weight (Maund)</td>
            <td class="right">${x.toFixed(2)}</td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td>Net Weight (Tons)</td>
            <td class="right">${m.toFixed(2)}</td>
            <td colspan="2"></td>
          </tr>
        </table>

        <div class="signature">
          <div><span>Authorized Signature</span></div>
          <div><span>Stamp</span></div>
        </div>

        <p style="text-align:center;margin-top:30px;font-size:12px">Thank you for your business</p>
      </div>
      <script>window.print()<\/script>
    </body>
    </html>
    `,l=window.open("","_blank");l.document.write(u),l.document.close()};return e.jsx(b,{children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsx("h1",{className:"text-3xl font-bold mb-6 text-center",children:"Weight Bridge Invoices"}),e.jsxs("div",{className:"bg-white p-4 rounded-xl shadow mb-6 grid md:grid-cols-3 gap-4",children:[e.jsx("input",{type:"text",placeholder:"Filter by Vendor",className:"input",onChange:t=>a({...i,vendor:t.target.value})}),e.jsx("input",{type:"text",placeholder:"Filter by Product",className:"input",onChange:t=>a({...i,product:t.target.value})}),e.jsx("input",{type:"date",className:"input",onChange:t=>a({...i,date:t.target.value})})]}),n.length===0&&e.jsx("div",{className:"text-center text-gray-500",children:"No Weight Bridge Entries Found"}),e.jsx("div",{className:"grid md:grid-cols-2 gap-6",children:n.map(t=>e.jsxs("div",{className:"bg-white p-6 rounded-2xl shadow-lg border relative",children:[e.jsxs("div",{className:"absolute top-4 right-4 text-right",children:[e.jsxs("p",{className:"font-bold text-lg text-blue-700",children:[t.secondWeight||t.firstWeight," kg"]}),e.jsx("p",{className:"text-sm text-gray-500",children:t.secondWeight?"Second Weight":"First Weight"})]}),e.jsx("div",{className:"flex justify-between mb-4",children:e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-semibold",children:t.productName}),e.jsx("p",{className:"text-sm text-gray-500",children:new Date(t.createdAt).toLocaleString()}),e.jsxs("p",{className:"text-sm font-medium",children:["Invoice: ",t.invoiceCode]})]})}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 text-sm mt-4",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Vendor:"})," ",t.vendorName]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Vehicle:"})," ",t.vehicleType]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Rate:"})," Rs ",t.rate]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Invoice Created:"})," ",new Date(t.createdAt).toLocaleString()]}),e.jsxs("p",{children:[e.jsx("strong",{children:"First Weight:"})," ",t.firstWeight," kg (",t.firstWeightWithDriver?"With Driver":"Without Driver",")"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"First Weight Time:"})," ",new Date(t.firstWeightTime||t.createdAt).toLocaleString()]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Second Weight:"})," ",t.secondWeight||"-"," kg (",t.secondWeightWithDriver?"With Driver":"Without Driver",")"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Second Weight Time:"})," ",t.secondWeightTime?new Date(t.secondWeightTime).toLocaleString():"-"]})]}),e.jsx("div",{className:"flex justify-end gap-3 mt-6",children:e.jsx("button",{onClick:()=>g(t),className:"bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700",children:"Print"})})]},t._id))})]})})}export{N as default};
