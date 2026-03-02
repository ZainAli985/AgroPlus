import React, { useEffect, useState, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";


export default function WeightBridgeReport() {
    const [entries, setEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [filters, setFilters] = useState({
        vendor: "",
        product: "",
        date: "",
    });

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, entries]);

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

    const applyFilters = () => {
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
    };

    const openWeightBridgePrint = (entry) => {
        const newWindow = window.open("", "_blank");
        if (!newWindow) return;

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
      <p><b>Date:</b> ${new Date(entry.createdAt).toLocaleString()}</p>
    </div>
  </div>
  
  <div class="info-grid">
    <div class="info-box">
      <h4>PARTY DETAILS</h4>
      <p><b>Vendor:</b> ${entry.vendorName}</p>
      <p><b>Product:</b> ${entry.productName}</p>
      <p><b>Mode:</b> ${entry.mode}</p>
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
  </tr>
  
  <tr>
  <td>First Weight</td>
  <td class="right">${firstWeight}</td>
  </tr>
  
  <tr>
  <td>Second Weight</td>
  <td class="right">${secondWeight}</td>
  </tr>
  
  <tr class="highlight">
  <td>Net Weight</td>
  <td class="right">${netWeight}</td>
  </tr>
  
  <tr>
  <td>Net Weight (Maund)</td>
  <td class="right">${netWeightMaund.toFixed(2)}</td>
  </tr>
  
  <tr>
  <td>Net Weight (Tons)</td>
  <td class="right">${netWeightTon.toFixed(2)}</td>
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
  
  <script>window.print()</script>
  </body>
  </html>
  `;

        newWindow.document.write(content);
        newWindow.document.close();
    };

    return (
        <SidebarLayout>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Weight Bridge Report</h1>

                {/* FILTERS */}
                <div className="bg-white p-4 rounded-xl shadow mb-6 grid md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Filter by Vendor"
                        className="input"
                        onChange={(e) =>
                            setFilters({ ...filters, vendor: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Filter by Product"
                        className="input"
                        onChange={(e) =>
                            setFilters({ ...filters, product: e.target.value })
                        }
                    />
                    <input
                        type="date"
                        className="input"
                        onChange={(e) =>
                            setFilters({ ...filters, date: e.target.value })
                        }
                    />
                </div>

                {/* CARDS */}
                {filteredEntries.length === 0 && (
                    <div className="text-center text-gray-500">
                        No Weight Bridge Entries Found
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    {filteredEntries.map((e) => (
                        <div
                            key={e._id}
                            id={`invoice-${e._id}`}
                            className="bg-white p-6 rounded-2xl shadow-lg border"
                        >
                            <div className="flex justify-between mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {e.productName}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {new Date(e.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg">
                                        {e.netWeight} kg
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {e.netWeightTon.toFixed(2)} Tons
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <p><strong>Vendor:</strong> {e.vendorName}</p>
                                <p><strong>Vehicle:</strong> {e.vehicleType}</p>
                                <p><strong>Mode:</strong> {e.mode}</p>
                                <p><strong>Rate:</strong> {e.rate}</p>
                                <p><strong>Maunds:</strong> {e.netWeightMaund.toFixed(2)}</p>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => openWeightBridgePrint(e)}
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