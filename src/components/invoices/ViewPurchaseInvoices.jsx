import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";

const ViewPurchaseInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    type: "info",
  });

  const [summary, setSummary] = useState({
    total1: 0,
    total2: 0,
    average: 0,
    totalPurchase: 0,
  });

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/purchase-invoice`);
        const data = await res.json();
        if (data.success) {
          setInvoices(data.invoices);
          calculateSummary(data.invoices);
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

  const calculateSummary = (invoices) => {
    if (invoices.length === 0) return;

    let total1 = 0;
    let total2 = 0;
    let sumForAverage = 0;
    let totalPurchase = 0;

    invoices.forEach((inv) => {
      total1 += Number(inv.finalWeight || 0);
      total2 += Number(inv.netWeight || 0);
      sumForAverage += Number(inv.netWeight40KG || 0);
      totalPurchase += Number(inv.weightKG || 0);
    });

    setSummary({
      total1: total1.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      total2: total2.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      average: (sumForAverage / invoices.length).toFixed(5),
      totalPurchase: totalPurchase.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    });
  };

  const openInvoicePrint = (invoice) => {
    const newWindow = window.open("", "_blank");
    if (!newWindow) return;

    const content = `
      <html>
        <head>
          <title>Purchase Invoice ${invoice.builtyNumber}</title>
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
              <strong>Invoice No:</strong> ${invoice.builtyNumber} <br>
              <strong>Date:</strong> ${invoice.date} <br>
              <strong>Ledger Reference:</strong> ${invoice.ledgerReference} <br>
              <strong>Vehicle No:</strong> ${invoice.vehicleNumber} <br>
              <strong>Vendor:</strong> ${invoice.vendorName} <br>
              <strong>Broker:</strong> ${invoice.brokerName} <br>
              <strong>Paddy Type:</strong> ${invoice.paddyType}
            </div>

            <div class="section-title">Weight & Moisture Details</div>
            <table>
              <tr>
                <th>Quantity</th>
                <th>Empty Vehicle</th>
                <th>Filled Vehicle</th>
                <th>Subtract Weight</th>
              </tr>
              <tr>
                <td>${invoice.quantity}</td>
                <td>${invoice.emptyVehicleWeight}</td>
                <td>${invoice.filledVehicleWeight}</td>
                <td>${invoice.subtractWeight}</td>
              </tr>
            </table>

            <table>
              <tr>
                <th>Bag Weight</th>
                <th>Final Weight</th>
                <th>Moisture %</th>
                <th>Moisture Adj. Cal.</th>
              </tr>
              <tr>
                <td>${invoice.bagWeight}</td>
                <td>${invoice.finalWeight}</td>
                <td>${invoice.moisturePercent}</td>
                <td>${invoice.moistureAdjCal}</td>
              </tr>
            </table>

            <table>
              <tr>
                <th>Moisture Adjustment</th>
                <th>Net Weight Cal.</th>
                <th>Net Weight</th>
                <th>Net Weight 40KG</th>
              </tr>
              <tr>
                <td>${invoice.moistureAdjustment}</td>
                <td>${invoice.netWeightCal}</td>
                <td>${invoice.netWeight}</td>
                <td>${invoice.netWeight40KG}</td>
              </tr>
            </table>

            <div class="section-title">Rates & Amounts</div>
            <table>
              <tr>
                <th>Weight KG</th>
                <th>Rate / 40kg</th>
                <th>Amount Cal.</th>
                <th>Amount</th>
              </tr>
              <tr>
                <td>${invoice.weightKG}</td>
                <td>${invoice.rate40kg}</td>
                <td>${invoice.amountCal}</td>
                <td>${invoice.amount}</td>
              </tr>
            </table>

            <div class="section-title">Adjustments</div>
            <table>
              <tr>
                <th>Difference</th>
                <th>Rent Adjustment</th>
              </tr>
              <tr>
                <td>${invoice.difference}</td>
                <td>${invoice.rentAdjustment}</td>
              </tr>
            </table>

            <div class="signature-box">
              Manager Signature & Stamp
            </div>
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
        Purchase Invoices
      </h2>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: "Total Final Weight", value: summary.total1 },
          { title: "Total Net Weight", value: summary.total2 },
          { title: "Average Net / 40KG", value: summary.average },
          { title: "Total Purchase KG", value: summary.totalPurchase },
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
        <p className="text-gray-600 italic">No purchase invoices found.</p>
      ) : (
        <div className="space-y-8">
          {invoices.map((invoice) => (
            <div
              key={invoice._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-6"
            >
              {/* Header */}
              <div className="flex justify-between flex-wrap gap-4 mb-6 border-b pb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Invoice #{invoice.builtyNumber}
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
              <div className="grid md:grid-cols-4 gap-6 text-sm">
                {/* SECTION 1 */}
                <div className="space-y-2">
                  <Detail label="Ledger Reference" value={invoice.ledgerReference} />
                  <Detail label="Vehicle Number" value={invoice.vehicleNumber} />
                  <Detail label="Vendor" value={invoice.vendorName} />
                  <Detail label="Broker" value={invoice.brokerName} />
                  <Detail label="Paddy Type" value={invoice.paddyType} />
                </div>

                {/* SECTION 2 */}
                <div className="space-y-2">
                  <Detail label="Quantity" value={invoice.quantity} />
                  <Detail label="Empty Vehicle Weight" value={invoice.emptyVehicleWeight} />
                  <Detail label="Filled Vehicle Weight" value={invoice.filledVehicleWeight} />
                  <Detail label="Subtract Weight" value={invoice.subtractWeight} />
                  <Detail label="Bag Weight" value={invoice.bagWeight} />
                </div>

                {/* SECTION 3 */}
                <div className="space-y-2">
                  <Detail label="Final Weight" value={invoice.finalWeight} />
                  <Detail label="Moisture %" value={invoice.moisturePercent} />
                  <Detail label="Moisture Adj. Cal." value={invoice.moistureAdjCal} />
                  <Detail label="Moisture Adjustment" value={invoice.moistureAdjustment} />
                  <Detail label="Net Weight Cal." value={invoice.netWeightCal} />
                  <Detail label="Net Weight" value={invoice.netWeight} />
                  <Detail label="Net Weight 40KG" value={invoice.netWeight40KG} />
                </div>

                {/* SECTION 4 */}
                <div className="space-y-2">
                  <Detail label="Weight KG" value={invoice.weightKG} />
                  <Detail label="Rate / 40KG" value={invoice.rate40kg} />
                  <Detail label="Amount Cal." value={invoice.amountCal} />
                  <Detail label="Amount" value={invoice.amount} />
                  <Detail label="Difference" value={invoice.difference} />
                  <Detail label="Rent Adjustment" value={invoice.rentAdjustment} />
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

export default ViewPurchaseInvoices;
