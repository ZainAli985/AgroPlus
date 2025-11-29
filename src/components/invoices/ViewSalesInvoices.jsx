import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";

const ViewSalesInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [notification, setNotification] = useState({ message: "", type: "info" });
    const [summary, setSummary] = useState({ total: 0, phukar: 0, polish: 0, rice: 0 });

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/sales-invoice`);
                const data = await res.json();
                if (data.success) {
                    setInvoices(data.invoices);

                    const total = data.invoices.reduce((sum, inv) => sum + (inv.totalAmount2 || 0), 0);
                    const phukar = data.invoices.reduce((sum, inv) => sum + (inv.quantity || 0), 0);
                    const polish = data.invoices.reduce((sum, inv) => sum + (inv.netWeight || 0), 0);
                    const rice = data.invoices.reduce((sum, inv) => sum + (inv.amount || 0), 0);

                    const count = data.invoices.length || 1;
                    setSummary({
                        total,
                        phukar: Math.round(phukar / count),
                        polish: Math.round(polish / count),
                        rice: Math.round(rice / count)
                    });
                } else {
                    setNotification({ message: data.message || "Failed to fetch invoices", type: "error" });
                }
            } catch (error) {
                console.error(error);
                setNotification({ message: "Server error!", type: "error" });
            }
        };
        fetchInvoices();
    }, []);

    // -----------------------------------------------------------
    // NEW PROFESSIONAL INVOICE PRINT TEMPLATE
    // -----------------------------------------------------------
    const openInvoicePrint = (invoice) => {
        const logo = "/logo.png"; // your logo

        const newWindow = window.open("", "_blank");
        if (!newWindow) return;

        const content = `
        <html>
          <head>
            <title>Invoice ${invoice.builtyNo}</title>

            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
                background: #f5f7fa;
                color: #333;
              }

              .invoice-box {
                background: white;
                max-width: 750px;
                margin: auto;
                padding: 30px;
                border-radius: 12px;
                border: 1px solid #d0d7e2;
                box-shadow: 0 0 10px rgba(0,0,0,0.08);
              }

              .header {
                text-align: center;
                border-bottom: 2px solid #0a4a8a;
                padding-bottom: 10px;
                margin-bottom: 20px;
              }

              .header img {
                width: 120px;
                margin-bottom: 8px;
              }

              .title {
                font-size: 20px;
                font-weight: bold;
                color: #0a4a8a;
              }

              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 18px;
              }

              th {
                background: #0a4a8a;
                color: white;
                padding: 8px;
                font-size: 14px;
              }

              td {
                border: 1px solid #d0d7e2;
                padding: 8px;
                font-size: 14px;
              }

              .section-title {
                margin-top: 25px;
                font-size: 16px;
                font-weight: bold;
                color: #0a4a8a;
              }

              .signature-box {
                margin-top: 50px;
                border-top: 2px dashed #777;
                padding-top: 10px;
                text-align: right;
              }

              .small {
                font-size: 13px;
                color: #555;
              }
            </style>
          </head>

          <body>
            <div class="invoice-box">

              <div class="header">
                <img src="/logo.png" alt="Logo" />
                <div class="title">AL-REHMAN RICE MILLS</div>
                <div class="small">The Heart of Fine Rice</div>
              </div>

              <div>
                <strong>Invoice No:</strong> ${invoice.builtyNo} <br>
                <strong>Date:</strong> ${invoice.date} <br>
                <strong>Vehicle No:</strong> ${invoice.vehicleNo} <br>
                <strong>Vendor:</strong> ${invoice.vendorName} <br>
                <strong>Broker:</strong> ${invoice.brokerName}
              </div>

              <div class="section-title">Paddy / Weight Details</div>
              <table>
                <tr>
                  <th>Quantity</th>
                  <th>Weight</th>
                  <th>Bag Weight</th>
                  <th>Net Weight</th>
                  <th>Net Wt / 40Kg</th>
                </tr>
                <tr>
                  <td>${invoice.quantity}</td>
                  <td>${invoice.weight}</td>
                  <td>${invoice.bagWeight}</td>
                  <td>${invoice.netWeight}</td>
                  <td>${invoice.netWeight40}</td>
                </tr>
              </table>

              <div class="section-title">Rates & Amounts</div>
              <table>
                <tr>
                  <th>Rate / 40Kg</th>
                  <th>Amount</th>
                  <th>Sutli Silai Rate</th>
                  <th>Sutli Silai Amount</th>
                </tr>
                <tr>
                  <td>${invoice.rate40}</td>
                  <td>${invoice.amount}</td>
                  <td>${invoice.sutliSilaiRate}</td>
                  <td>${invoice.sutliSilaiAmount}</td>
                </tr>
              </table>

              <div class="section-title">Totals</div>
              <table>
                <tr>
                  <th>Total Amount</th>
                  <th>Brokery Rate</th>
                  <th>Brokery</th>
                  <th>Net Total</th>
                </tr>
                <tr>
                  <td>${invoice.totalAmount}</td>
                  <td>${invoice.brokeryRate}</td>
                  <td>${invoice.brokery}</td>
                  <td><strong>${invoice.totalAmount2}</strong></td>
                </tr>
              </table>

              <div class="signature-box">
                Manager Signature & Stamp
              </div>

            </div>

            <script>
              window.print();
            </script>
          </body>
        </html>
        `;

        newWindow.document.write(content);
        newWindow.document.close();
    };

    return (
        <SidebarLayout>
            <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ message: "", type: "info" })}
            />

            <h2 className="text-2xl font-bold mb-6">View Sales Invoices</h2>

            {/* Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-500 text-white p-4 rounded-lg shadow text-center">
                    <p className="font-bold text-lg">Total</p>
                    <p className="text-2xl">{summary.total}</p>
                </div>
                <div className="bg-green-500 text-white p-4 rounded-lg shadow text-center">
                    <p className="font-bold text-lg">Average Phukar</p>
                    <p className="text-2xl">{summary.phukar}</p>
                </div>
                <div className="bg-yellow-500 text-white p-4 rounded-lg shadow text-center">
                    <p className="font-bold text-lg">Average Polish</p>
                    <p className="text-2xl">{summary.polish}</p>
                </div>
                <div className="bg-red-500 text-white p-4 rounded-lg shadow text-center">
                    <p className="font-bold text-lg">Average Rice</p>
                    <p className="text-2xl">{summary.rice}</p>
                </div>
            </div>

            {invoices.length === 0 ? (
                <p>No invoices found.</p>
            ) : (
                <div className="space-y-8">
                    {invoices.map((invoice) => (
                        <div
                            key={invoice._id}
                            id={`invoice-${invoice._id}`}
                            className="bg-white shadow-md p-6 rounded-lg border border-gray-200"
                        >
                            <div className="flex justify-between mb-4">
                                <h3 className="text-xl font-semibold">
                                    Invoice: {invoice.builtyNo} ({invoice.date})
                                </h3>

                                <button
                                    onClick={() => openInvoicePrint(invoice)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                >
                                    View / Print
                                </button>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <p><strong>Vehicle No:</strong> {invoice.vehicleNo}</p>
                                    <p><strong>Vendor:</strong> {invoice.vendorName}</p>
                                    <p><strong>Broker:</strong> {invoice.brokerName}</p>
                                    <p><strong>Paddy Type:</strong> {invoice.paddyType}</p>
                                </div>

                                <div>
                                    <p><strong>Quantity:</strong> {invoice.quantity}</p>
                                    <p><strong>Weight:</strong> {invoice.weight}</p>
                                    <p><strong>Bag Weight:</strong> {invoice.bagWeight}</p>
                                    <p><strong>Net Weight:</strong> {invoice.netWeight}</p>
                                    <p><strong>Net Wt / 40Kg:</strong> {invoice.netWeight40}</p>
                                </div>

                                <div>
                                    <p><strong>Rate / 40Kg:</strong> {invoice.rate40}</p>
                                    <p><strong>Amount:</strong> {invoice.amount}</p>
                                    <p><strong>Sutli Silai Rate:</strong> {invoice.sutliSilaiRate}</p>
                                    <p><strong>Sutli Silai Amount:</strong> {invoice.sutliSilaiAmount}</p>
                                    <p><strong>Total Amount:</strong> {invoice.totalAmount}</p>
                                    <p><strong>Brokery Rate:</strong> {invoice.brokeryRate}</p>
                                    <p><strong>Brokery:</strong> {invoice.brokery}</p>
                                    <p><strong>Net Total:</strong> {invoice.totalAmount2}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </SidebarLayout>
    );
};

export default ViewSalesInvoices;
