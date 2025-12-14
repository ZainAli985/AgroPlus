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

    const filledWeight = Number(invoice.filledVehicleWeight || 0);
    const emptyWeight = Number(invoice.emptyVehicleWeight || 0);
    const loadWeight = filledWeight - emptyWeight;

    const bagDeduction = Number(invoice.moistureAdjustment || 0);
    const netWeightKgs = Number(invoice.netWeight || 0);
    const netWeightMaund = netWeightKgs / 40;

    const content = `
<!DOCTYPE html>
<html>
<head>
<title>Purchase Invoice ${invoice.builtyNumber}</title>
<style>
body { font-family: Arial; background:#fff; padding:20px; }
.invoice { max-width:900px; margin:auto; }
h1 { color:#2f3f73; margin:0; }
.header { display:flex; justify-content:space-between; }
.right h2 { color:#7a87c7; margin:0; }
table { width:100%; border-collapse:collapse; margin-top:12px; font-size:13px; }
td, th { border:1px solid #000; padding:6px; }
th { background:#2f3f73; color:#fff; }
.no-border td { border:none; }
.totals td { font-weight:bold; }
.right-align { text-align:right; }
</style>
</head>

<body>
<div class="invoice">

<div class="header">
  <div>
    <h1>Al Rehman Rice Mills</h1>
    <p>Deepalpur Road, (Babarkhai) Arzanipur<br/>
    Tehsil Chunian, Zila Kasur, Pakistan</p>
    <p>Haji Muhammad Zikriya<br/>0301-4349041 | 0300-8402130</p>
    <p>Muhammad Saleem<br/>0333-5135982</p>
  </div>

  <div class="right">
    <h2>PURCHASE<br/>INVOICE</h2>
    <table class="no-border">
      <tr><td>INVOICE #</td><td>${invoice.builtyNumber}</td></tr>
      <tr><td>BUILTY #</td><td>${invoice.builtyNumber}</td></tr>
      <tr><td>DATE</td><td>${invoice.date}</td></tr>
    </table>
  </div>
</div>

<table class="no-border">
<tr><td><b>BILL TO</b></td></tr>
<tr><td>Name</td><td>${invoice.vendorName}</td></tr>
<tr><td>Company Name</td><td>Zam Zam Rice Mills</td></tr>
<tr><td>Street Address</td><td>Kore Siyal</td></tr>
<tr><td>City, ST ZIP</td><td>Kasur</td></tr>
<tr><td>Phone</td><td>0329-0999329</td></tr>
</table>

<table>
<tr>
<th>DESCRIPTION</th>
<th>DETAILS</th>
<th>Weight (Kgs)</th>
</tr>

<tr><td rowspan="4">General Information</td><td>Paddy Type</td><td>${invoice.paddyType}</td></tr>
<tr><td>Vehicle No.</td><td>${invoice.vehicleNumber}</td></tr>
<tr><td>Rate</td><td>Rs ${invoice.rate40kg}</td></tr>
<tr><td>Broker</td><td>${invoice.brokerName || "-"}</td></tr>

<tr><td rowspan="3">Weight Calculation</td><td>Filled Weight</td><td class="right-align">${filledWeight}</td></tr>
<tr><td>Empty Weight</td><td class="right-align">${emptyWeight}</td></tr>
<tr><td>Load Weight</td><td class="right-align">${loadWeight}</td></tr>

<tr><td rowspan="3">Bag Details</td><td>No. of Bags</td><td class="right-align">${invoice.quantity}</td></tr>
<tr><td>Bags (Received/Return)</td><td>Jama</td></tr>
<tr><td>Bag Weight</td><td class="right-align">${invoice.bagWeight}</td></tr>

<tr><td>Moisture Deduction</td><td>Deduction/Bag</td><td class="right-align">${bagDeduction}</td></tr>
</table>

<table>
<tr><th>Authorized Signature & Stamp</th><th></th></tr>
<tr><td></td><td>Net Weight (Kgs) ${netWeightKgs}</td></tr>
<tr><td></td><td>Net Weight (Maund) ${netWeightMaund.toFixed(2)}</td></tr>
<tr><td></td><td>TOTAL Rs ${invoice.amount}</td></tr>
</table>

<p style="text-align:center;margin-top:20px">
If you have any questions about this invoice, please contact<br/>
0301-4349041 | 0329-0999329<br/><br/>
<b>Thank You For Your Business!</b>
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
