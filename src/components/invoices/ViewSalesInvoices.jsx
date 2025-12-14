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
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 20px;
    font-family: "Segoe UI", Arial, sans-serif;
    background: #f2f4f8;
    color: #000;
  }

  .invoice {
    max-width: 800px;
    margin: auto;
    background: #fff;
    border: 1px solid #cfd6e0;
    padding: 24px;
  }

  /* HEADER */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 3px solid #3b4b7d;
    padding-bottom: 12px;
    margin-bottom: 15px;
  }

  .company {
    display: flex;
    gap: 12px;
  }

  .company img {
    width: 60px;
    height: 60px;
  }

  .company h1 {
    margin: 0;
    font-size: 20px;
    color: #3b4b7d;
  }

  .company p {
    margin: 2px 0;
    font-size: 12px;
  }

  .invoice-title {
    text-align: right;
  }

  .invoice-title h2 {
    margin: 0;
    font-size: 22px;
    color: #7a87c7;
    letter-spacing: 1px;
  }

  .invoice-meta {
    margin-top: 8px;
    font-size: 12px;
  }

  /* INFO ROWS */
  .info-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 12px;
  }

  .info-box {
    font-size: 12px;
  }

  .info-box strong {
    display: inline-block;
    width: 120px;
  }

  /* TABLES */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 12px;
    font-size: 12px;
  }

  th {
    background: #3b4b7d;
    color: #fff;
    padding: 6px;
    border: 1px solid #000;
    text-align: center;
  }

  td {
    border: 1px solid #000;
    padding: 6px;
    text-align: center;
  }

  .section-title {
    background: #3b4b7d;
    color: #fff;
    padding: 6px;
    font-size: 13px;
    margin-top: 15px;
    font-weight: bold;
  }

  /* TOTALS */
  .totals {
    width: 40%;
    margin-left: auto;
    margin-top: 10px;
  }

  .totals td {
    text-align: right;
  }

  .totals td:first-child {
    text-align: left;
  }

  .grand-total {
    font-weight: bold;
    background: #dbe2f3;
  }

  /* FOOTER */
  .footer {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }

  .signature {
    text-align: center;
    width: 200px;
    border-top: 1px solid #000;
    padding-top: 5px;
  }

  @media print {
    body {
      background: #fff;
    }
  }
</style>

        </head>
        <body>
          <div class="invoice">
  <!-- HEADER -->
  <div class="header">
    <div class="company">
      <img src="/logo.png" />
      <div>
        <h1>Al Rehman Rice Mills</h1>
        <p>Deepalpur Road, Babarkhail Ariznapur</p>
        <p>Tehsil Chunian, Zila Kasur, Pakistan</p>
        <p>📞 0301-4349041 | 0300-8402130</p>
      </div>
    </div>

    <div class="invoice-title">
      <h2>SALE INVOICE</h2>
      <div class="invoice-meta">
        <div><strong>Invoice #:</strong> ${invoice.builtyNo}</div>
        <div><strong>Date:</strong> ${invoice.date}</div>
      </div>
    </div>
  </div>

  <!-- BILL TO -->
  <div class="info-row">
    <div class="info-box">
      <strong>Bill To:</strong> ${invoice.vendorName}<br/>
      <strong>Broker:</strong> ${invoice.brokerName}<br/>
      <strong>Vehicle No:</strong> ${invoice.vehicleNo}
    </div>

    <div class="info-box">
      <strong>Product:</strong> ${invoice.paddyType}<br/>
      <strong>Rate:</strong> ${invoice.rate40}<br/>
    </div>
  </div>

  <!-- WEIGHT DETAILS -->
  <div class="section-title">Weight Details</div>
  <table>
    <tr>
      <th>Quantity</th>
      <th>Weight</th>
      <th>Bag Weight</th>
      <th>Net Weight</th>
      <th>Net / 40Kg</th>
    </tr>
    <tr>
      <td>${invoice.quantity}</td>
      <td>${invoice.weight}</td>
      <td>${invoice.bagWeight}</td>
      <td>${invoice.netWeight}</td>
      <td>${invoice.netWeight40}</td>
    </tr>
  </table>

  <!-- AMOUNTS -->
  <div class="section-title">Amounts</div>
  <table>
    <tr>
      <th>Amount</th>
      <th>Sutli Silai Rate</th>
      <th>Sutli Silai</th>
    </tr>
    <tr>
      <td>${invoice.amount}</td>
      <td>${invoice.sutliSilaiRate}</td>
      <td>${invoice.sutliSilaiAmount}</td>
    </tr>
  </table>

  <!-- TOTALS -->
  <table class="totals">
    <tr>
      <td>Subtotal</td>
      <td>${invoice.totalAmount}</td>
    </tr>
    <tr>
      <td>Brokery</td>
      <td>${invoice.brokery}</td>
    </tr>
    <tr class="grand-total">
      <td>GRAND TOTAL</td>
      <td>${invoice.totalAmount2}</td>
    </tr>
  </table>

  <!-- FOOTER -->
  <div class="footer">
    <div>Thank you for your business!</div>
    <div class="signature">Authorized Signature & Stamp</div>
  </div>
</div>

<script>window.print()</script>

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
