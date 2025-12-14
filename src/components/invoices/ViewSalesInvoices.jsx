import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";

/* ================= SAFE NUMBER HELPERS ================= */
const num = (v) => {
  if (v === null || v === undefined) return 0;
  if (typeof v === "number") return v;
  if (typeof v === "string") return Number(v.replace(/,/g, "")) || 0;
  return 0;
};

const fmt = (v) =>
  num(v).toLocaleString("en-PK", {
    maximumFractionDigits: 0,
  });

/* ================= MAIN COMPONENT ================= */
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

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/sales-invoice`);
        const data = await res.json();

        if (data.success) {
          setInvoices(data.invoices);

          const total = data.invoices.reduce(
            (sum, inv) => sum + num(inv.totalAmount2),
            0
          );
          const phukar = data.invoices.reduce(
            (sum, inv) => sum + num(inv.quantity),
            0
          );
          const polish = data.invoices.reduce(
            (sum, inv) => sum + num(inv.netWeight),
            0
          );
          const rice = data.invoices.reduce(
            (sum, inv) => sum + num(inv.amount),
            0
          );

          const count = data.invoices.length || 1;

          setSummary({
            total,
            phukar: Math.round(phukar / count),
            polish: Math.round(polish / count),
            rice: Math.round(rice / count),
          });
        } else {
          setNotification({
            message: data.message || "Failed to fetch invoices",
            type: "error",
          });
        }
      } catch (error) {
        setNotification({ message: "Server error!", type: "error" });
      }
    };

    fetchInvoices();
  }, []);

  /* ================= PRINT INVOICE ================= */
  const openInvoicePrint = (invoice) => {
    const newWindow = window.open("", "_blank");
    if (!newWindow) return;

    /* ===== DERIVED VALUES (DEMO MATCH) ===== */
    const filledWeight = num(invoice.weight);
    const emptyWeight = num(invoice.quantity) * num(invoice.bagWeight);
    const loadWeight = num(invoice.netWeight);

    const deductionPerBag = 3;
    const totalDeduction = num(invoice.quantity) * deductionPerBag;

    const netWeightKgs = loadWeight - totalDeduction;
    const netWeightMaund = netWeightKgs / 40;

    const subtotalAmount = num(invoice.totalAmount);
    const bagClosingCost = num(invoice.sutliSilaiAmount);

    /* ===== FINAL GRAND TOTAL FAILSAFE ===== */
    const grandTotal =
      num(invoice.totalAmount2) ||
      subtotalAmount + bagClosingCost + num(invoice.brokery);

    const content = `
<!DOCTYPE html>
<html>
<head>
<title>Sales Invoice ${invoice.builtyNo}</title>
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
    <h2>SALE<br/>INVOICE</h2>
    <table class="no-border">
      <tr><td>INVOICE #</td><td>${invoice.builtyNo}</td></tr>
      <tr><td>BUILTY #</td><td>${invoice.builtyNo}</td></tr>
      <tr><td>DATE</td><td>${invoice.date}</td></tr>
    </table>
  </div>
</div>

<table class="no-border">
<tr><td><b>BILL TO</b></td></tr>
<tr><td>Name</td><td>${invoice.vendorName}</td></tr>
<tr><td>Company Name</td><td>D.T Rice Mills</td></tr>
<tr><td>Street Address</td><td>XYZ Street, FGH Market</td></tr>
<tr><td>City, ST ZIP</td><td>Hyderabad</td></tr>
<tr><td>Phone</td><td>0329-0999329</td></tr>
</table>

<table>
<tr>
<th>DESCRIPTION</th>
<th>DETAILS</th>
<th>Weight (Kgs)</th>
</tr>

<tr><td rowspan="5">General Information</td><td>Product Type</td><td>${invoice.paddyType}</td></tr>
<tr><td>Subtype</td><td>Rice | Polish | Phukar</td></tr>
<tr><td>Rate</td><td>Rs ${fmt(invoice.rate40)}</td></tr>
<tr><td>Vehicle No.</td><td>${invoice.vehicleNo}</td></tr>
<tr><td>Broker</td><td>${invoice.brokerName}</td></tr>

<tr><td rowspan="3">Weight Calculation</td><td>Filled Weight</td><td class="right-align">${fmt(filledWeight)}</td></tr>
<tr><td>Empty Weight</td><td class="right-align">${fmt(emptyWeight)}</td></tr>
<tr><td>Load Weight</td><td class="right-align">${fmt(loadWeight)}</td></tr>

<tr><td rowspan="2">Bag Details</td><td>No. of Bags</td><td class="right-align">${fmt(invoice.quantity)}</td></tr>
<tr><td>Bag Weight</td><td class="right-align">${fmt(invoice.bagWeight)}</td></tr>

<tr><td>Bagging/Sewing</td><td>Deduction/Bag</td><td class="right-align">3</td></tr>
</table>

<table>
<tr><th>Authorized Signature & Stamp</th><th></th></tr>
<tr><td></td><td>Net Weight (Kgs) ${fmt(netWeightKgs)}</td></tr>
<tr><td></td><td>Net Weight (Maund) ${fmt(netWeightMaund)}</td></tr>
<tr><td></td><td>Subtotal Amount ${fmt(subtotalAmount)}</td></tr>
<tr><td></td><td>Bag Closing Cost ${fmt(bagClosingCost)}</td></tr>
<tr class="totals"><td></td><td>TOTAL ${fmt(grandTotal)}</td></tr>
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

  /* ================= UI ================= */
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: "Total Amount", value: fmt(summary.total) },
          { title: "Average Phukar", value: fmt(summary.phukar) },
          { title: "Average Polish", value: fmt(summary.polish) },
          { title: "Average Rice", value: fmt(summary.rice) },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500">{item.title}</p>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>
      {invoices.map((invoice) => (
        <div key={invoice._id} className="bg-white p-6 mb-6 rounded-xl shadow">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-bold">
              Invoice #{invoice.builtyNo}
            </h3>
            <button
              onClick={() => openInvoicePrint(invoice)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              View / Print
            </button>
          </div>

          {/* ===== DETAILS BACK ON CARD ===== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
            <div>
              <p><b>Vendor:</b> {invoice.vendorName}</p>
              <p><b>Vehicle No:</b> {invoice.vehicleNo}</p>
              <p><b>Broker:</b> {invoice.brokerName}</p>
              <p><b>Paddy Type:</b> {invoice.paddyType}</p>
            </div>

            <div>
              <p><b>No. of Bags:</b> {invoice.quantity}</p>
              <p><b>Bag Weight:</b> {invoice.bagWeight}</p>
              <p><b>Filled Weight:</b> {invoice.weight}</p>
              <p><b>Net Weight:</b> {invoice.netWeight}</p>
            </div>

            <div>
              <p><b>Rate (40kg):</b> {invoice.rate40}</p>
              <p><b>Subtotal:</b> {invoice.totalAmount}</p>
              <p><b>Sutli Silai:</b> {invoice.sutliSilaiAmount}</p>
              <p><b>Grand Total:</b> {invoice.totalAmount2}</p>
            </div>
          </div>
        </div>
      ))}

    </SidebarLayout>
  );
};

export default ViewSalesInvoices;
