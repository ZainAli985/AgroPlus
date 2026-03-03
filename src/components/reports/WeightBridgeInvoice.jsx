import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

export default function WeightBridgeReport() {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [filters, setFilters] = useState({ vendor: "", product: "", date: "" });

  // Load all entries
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authFetch(`${API_BASE_URL}/weight-bridge`);
        const data = await res.json();
        if (data.success) {
          setEntries(data.entries);
          setFilteredEntries(data.entries);
        }
      } catch (err) {
        console.error("Error loading report:", err);
      }
    };
    fetchData();
  }, []);

  // Apply filters
  useEffect(() => {
    let data = [...entries];
    if (filters.vendor)
      data = data.filter((e) =>
        e.vendorName.toLowerCase().includes(filters.vendor.toLowerCase())
      );
    if (filters.product)
      data = data.filter((e) =>
        e.productName.toLowerCase().includes(filters.product.toLowerCase())
      );
    if (filters.date)
      data = data.filter(
        (e) =>
          new Date(e.createdAt).toDateString() ===
          new Date(filters.date).toDateString()
      );
    setFilteredEntries(data);
  }, [filters, entries]);

  // Print function
  const printInvoice = (entry) => {
    const firstWeight = Number(entry.firstWeight || 0);
    const secondWeight = Number(entry.secondWeight || 0);
    const netWeight = Number(entry.netWeight || 0);
    const netWeightMaund = Number(entry.netWeightMaund || 0);
    const netWeightTon = Number(entry.netWeightTon || 0);

    const content = `
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
            <p><b>Invoice:</b> ${entry.invoiceCode}</p>
            <p><b>Invoice Created:</b> ${new Date(entry.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div class="info-grid">
          <div class="info-box">
            <h4>PARTY DETAILS</h4>
            <p><b>Vendor:</b> ${entry.vendorName}</p>
            <p><b>Product:</b> ${entry.productName}</p>
          </div>
          <div class="info-box">
            <h4>TRANSPORT DETAILS</h4>
            <p><b>Vehicle Type:</b> ${entry.vehicleType}</p>
            <p><b>Rate:</b> Rs ${entry.rate}</p>
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
            <td class="right">${firstWeight}</td>
            <td class="right">${entry.firstWeightWithDriver ? "With Driver" : "Without Driver"}</td>
            <td class="right">${new Date(entry.firstWeightTime || entry.createdAt).toLocaleString()}</td>
          </tr>
          <tr>
            <td>Second Weight</td>
            <td class="right">${secondWeight}</td>
            <td class="right">${entry.secondWeightWithDriver ? "With Driver" : "Without Driver"}</td>
            <td class="right">${entry.secondWeightTime ? new Date(entry.secondWeightTime).toLocaleString() : "-"}</td>
          </tr>
          <tr class="highlight">
            <td>Net Weight</td>
            <td class="right">${netWeight}</td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td>Net Weight (Maund)</td>
            <td class="right">${netWeightMaund.toFixed(2)}</td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td>Net Weight (Tons)</td>
            <td class="right">${netWeightTon.toFixed(2)}</td>
            <td colspan="2"></td>
          </tr>
        </table>

        <div class="signature">
          <div><span>Authorized Signature</span></div>
          <div><span>Stamp</span></div>
        </div>

        <p style="text-align:center;margin-top:30px;font-size:12px">Thank you for your business</p>
      </div>
      <script>window.print()</script>
    </body>
    </html>
    `;

    const newWindow = window.open("", "_blank");
    newWindow.document.write(content);
    newWindow.document.close();
  };

  return (
    <SidebarLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Weight Bridge Invoices</h1>

        {/* FILTERS */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Filter by Vendor"
            className="input"
            onChange={(e) => setFilters({ ...filters, vendor: e.target.value })}
          />
          <input
            type="text"
            placeholder="Filter by Product"
            className="input"
            onChange={(e) => setFilters({ ...filters, product: e.target.value })}
          />
          <input
            type="date"
            className="input"
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
        </div>

        {/* INVOICE CARDS */}
        {filteredEntries.length === 0 && <div className="text-center text-gray-500">No Weight Bridge Entries Found</div>}

        <div className="grid md:grid-cols-2 gap-6">
          {filteredEntries.map((e) => (
            <div key={e._id} className="bg-white p-6 rounded-2xl shadow-lg border relative">
              {/* Top-right latest weight */}
              <div className="absolute top-4 right-4 text-right">
                <p className="font-bold text-lg text-blue-700">
                  {e.secondWeight || e.firstWeight} kg
                </p>
                <p className="text-sm text-gray-500">
                  {e.secondWeight ? "Second Weight" : "First Weight"}
                </p>
              </div>

              <div className="flex justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{e.productName}</h2>
                  <p className="text-sm text-gray-500">{new Date(e.createdAt).toLocaleString()}</p>
                  <p className="text-sm font-medium">Invoice: {e.invoiceCode}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                <p><strong>Vendor:</strong> {e.vendorName}</p>
                <p><strong>Vehicle:</strong> {e.vehicleType}</p>
                <p><strong>Rate:</strong> Rs {e.rate}</p>
                <p><strong>Invoice Created:</strong> {new Date(e.createdAt).toLocaleString()}</p>
                <p><strong>First Weight:</strong> {e.firstWeight} kg ({e.firstWeightWithDriver ? "With Driver" : "Without Driver"})</p>
                <p><strong>First Weight Time:</strong> {new Date(e.firstWeightTime || e.createdAt).toLocaleString()}</p>
                <p><strong>Second Weight:</strong> {e.secondWeight || "-"} kg ({e.secondWeightWithDriver ? "With Driver" : "Without Driver"})</p>
                <p><strong>Second Weight Time:</strong> {e.secondWeightTime ? new Date(e.secondWeightTime).toLocaleString() : "-"}</p>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => printInvoice(e)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Print
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
}