import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";

const ViewSalesInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    type: "info",
  });

  const [summary, setSummary] = useState({
    total: 0,
    phukar: 0,
    polish: 0,
    rice: 0,
  });

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/sales-invoice`);
        const data = await res.json();
        if (data.success) {
          setInvoices(data.invoices);

          const total = data.invoices.reduce(
            (sum, inv) => sum + (inv.totalAmount2 || 0),
            0
          );
          const phukar = data.invoices.reduce(
            (sum, inv) => sum + (inv.quantity || 0),
            0
          );
          const polish = data.invoices.reduce(
            (sum, inv) => sum + (inv.netWeight || 0),
            0
          );
          const rice = data.invoices.reduce(
            (sum, inv) => sum + (inv.amount || 0),
            0
          );

          const count = data.invoices.length || 1;
          setSummary({
            total: total.toLocaleString(),
            phukar: Math.round(phukar / count).toLocaleString(),
            polish: Math.round(polish / count).toLocaleString(),
            rice: Math.round(rice / count).toLocaleString(),
          });
        } else {
          setNotification({
            message: data.message || "Failed to fetch invoices",
            type: "error",
          });
        }
      } catch (error) {
        console.error(error);
        setNotification({ message: "Server error!", type: "error" });
      }
    };
    fetchInvoices();
  }, []);

  const openInvoicePrint = (invoice) => {
    const newWindow = window.open("", "_blank");
    if (!newWindow) return;

    const content = `
      <html>
        <head>
          <title>Sales Invoice ${invoice.builtyNo}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; background: #f5f7fa; color: #333; }
            .invoice-box { background: white; max-width: 750px; margin: auto; padding: 30px; border-radius: 12px; border: 1px solid #d0d7e2; box-shadow: 0 0 10px rgba(0,0,0,0.08); }
            .header { text-align: center; border-bottom: 2px solid #0a4a8a; padding-bottom: 10px; margin-bottom: 20px; }
            .header img { width: 120px; margin-bottom: 8px; }
            .title { font-size: 20px; font-weight: bold; color: #0a4a8a; }
            table { width: 100%; border-collapse: collapse; margin-top: 18px; }
            th { background: #0a4a8a; color: white; padding: 8px; font-size: 14px; }
            td { border: 1px solid #d0d7e2; padding: 8px; font-size: 14px; }
            .section-title { margin-top: 25px; font-size: 16px; font-weight: bold; color: #0a4a8a; }
            .signature-box { margin-top: 50px; border-top: 2px dashed #777; padding-top: 10px; text-align: right; }
            .small { font-size: 13px; color: #555; }
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
              <strong>Broker:</strong> ${invoice.brokerName} <br>
              <strong>Paddy Type:</strong> ${invoice.paddyType}
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

            <div class="signature-box">Manager Signature & Stamp</div>
          </div>
          <script>window.print();</script>
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

      <h2 className="text-3xl font-bold mb-6 text-gray-800 tracking-wide">
        Sales Invoices
      </h2>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: "Total Amount", value: summary.total.toLocaleString() },
          { title: "Average Phukar", value: summary.phukar.toLocaleString() },
          { title: "Average Polish", value: summary.polish.toLocaleString() },
          { title: "Average Rice", value: summary.rice.toLocaleString() },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <p className="text-sm font-medium text-gray-500">{item.title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      {invoices.length === 0 ? (
        <p className="text-gray-600 italic">No sales invoices found.</p>
      ) : (
        <div className="space-y-8">
          {invoices.map((invoice) => (
            <div
              key={invoice._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-6"
            >
              <div className="flex justify-between flex-wrap gap-4 mb-6 border-b pb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Invoice #{invoice.builtyNo}
                  </h3>
                  <p className="text-gray-500">{invoice.date}</p>
                </div>

                <button
                  onClick={() => openInvoicePrint(invoice)}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition font-medium"
                >
                  View / Print
                </button>
              </div>

              {/* DETAILS GRID */}
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-2">
                  <Detail label="Vehicle No" value={invoice.vehicleNo} />
                  <Detail label="Vendor" value={invoice.vendorName} />
                  <Detail label="Broker" value={invoice.brokerName} />
                  <Detail label="Paddy Type" value={invoice.paddyType} />
                </div>

                <div className="space-y-2">
                  <Detail label="Quantity" value={invoice.quantity} />
                  <Detail label="Weight" value={invoice.weight} />
                  <Detail label="Bag Weight" value={invoice.bagWeight} />
                  <Detail label="Net Weight" value={invoice.netWeight} />
                  <Detail label="Net Wt / 40Kg" value={invoice.netWeight40} />
                </div>

                <div className="space-y-2">
                  <Detail label="Rate / 40Kg" value={invoice.rate40} />
                  <Detail label="Amount" value={invoice.amount} />
                  <Detail label="Sutli Silai Rate" value={invoice.sutliSilaiRate} />
                  <Detail label="Sutli Silai Amount" value={invoice.sutliSilaiAmount} />
                  <Detail label="Total Amount" value={invoice.totalAmount} />
                  <Detail label="Brokery Rate" value={invoice.brokeryRate} />
                  <Detail label="Brokery" value={invoice.brokery} />
                  <Detail label="Net Total" value={invoice.totalAmount2} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </SidebarLayout>
  );
};

const Detail = ({ label, value }) => (
  <p className="text-gray-700">
    <span className="font-semibold text-gray-900">{label}:</span> {value}
  </p>
);

export default ViewSalesInvoices;
