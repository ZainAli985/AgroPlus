import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

const ViewPurchaseInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [paddyType, setPaddyType] = useState("");

  const [filteredInvoices, setFilteredInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await authFetch(`${API_BASE_URL}/purchase-invoice`);
        const data = await res.json();

        if (data.success) {
          setInvoices(data.invoices);
          setFilteredInvoices(data.invoices);
          calculateSummary(data.invoices);
        } else {
          setNotification({
            message: data.message || "Failed to fetch invoices",
            type: "error",
          });
        }
      } catch {
        setNotification({ message: "Server error!", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);
  useEffect(() => {
    let data = invoices;

    // Search filter
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (inv) =>
          inv.vendorName?.toLowerCase().includes(q) ||
          inv.vehicleNumber?.toLowerCase().includes(q) ||
          inv.brokerName?.toLowerCase().includes(q) ||
          String(inv.sr)?.includes(q)
      );
    }

    // Date filter
    if (fromDate) {
      data = data.filter(
        (inv) => new Date(inv.date) >= new Date(fromDate)
      );
    }

    if (toDate) {
      data = data.filter(
        (inv) => new Date(inv.date) <= new Date(toDate)
      );
    }

    // Paddy type filter
    if (paddyType) {
      data = data.filter((inv) => inv.paddyType === paddyType);
    }

    setFilteredInvoices(data);
    calculateSummary(data);
  }, [search, fromDate, toDate, paddyType, invoices]);

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
@page {
  size: A4;
  margin: 12mm;              /* 👈 less side margins */
}

body {
  font-family: "Segoe UI", Arial, sans-serif;
  background: #fff;
  color: #111;
}

.invoice {
  max-width: 650px;          /* 👈 narrower invoice */
  margin: auto;
}

/* ===== HEADER ===== */
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

.invoice-meta table {
  font-size: 11px;
  margin-top: 6px;
}

/* ===== INFO BLOCKS ===== */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 14px;
}

.info-box {
  border: 1px solid #e5e7eb;
  padding: 8px;              /* 👈 tighter */
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

/* ===== TABLES ===== */
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;           /* 👈 smaller text */
  margin-top: 10px;
}

th {
  background: #1e3a8a;
  color: #fff;
  padding: 5px 4px;          /* 👈 compact columns */
  text-align: center;        /* 👈 centered */
}

td {
  border: 1px solid #000;
  padding: 4px 4px;          /* 👈 less width */
}

.right {
  text-align: center;        /* 👈 figures centered */
}

.highlight {
  background: #f1f5ff;
  font-weight: bold;
}

/* ===== TOTALS ===== */
.totals td {
  font-weight: bold;
  font-size: 12px;
  padding: 6px 4px;
}

.grand-total {
  font-size: 14px;
  color: #1e3a8a;
  text-align: center;
}

/* ===== SIGNATURE ===== */
.signature {
  margin-top: 36px;
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

<!-- ===== HEADER ===== -->
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
    <h2>PURCHASE INVOICE</h2>
    <table>
      <tr><td><b>Invoice #</b></td><td>${invoice.builtyNumber}</td></tr>
      <tr><td><b>Date</b></td><td>${invoice.date}</td></tr>
    </table>
  </div>
</div>

<!-- ===== INFO ===== -->
<div class="info-grid">
  <div class="info-box">
    <h4>SUPPLIER DETAILS</h4>
    <p><b>Name:</b> ${invoice.vendorName}</p>
    <p><b>Company:</b> Zam Zam Rice Mills</p>
    <p><b>City:</b> Kasur</p>
    <p><b>Phone:</b> 0329-0999329</p>
  </div>

  <div class="info-box">
    <h4>TRANSPORT DETAILS</h4>
    <p><b>Vehicle No:</b> ${invoice.vehicleNumber}</p>
    <p><b>Broker:</b> ${invoice.brokerName || "-"}</p>
    <p><b>Paddy Type:</b> ${invoice.paddyType}</p>
    <p><b>Rate (40kg):</b> Rs ${invoice.rate40kg}</p>
  </div>
</div>

<!-- ===== WEIGHT DETAILS ===== -->
<table>
<tr>
<th>Description</th>
<th>Details</th>
<th class="right">Weight (Kgs)</th>
</tr>

<tr><td rowspan="3">Vehicle Weight</td><td>Filled Weight</td><td class="right">${filledWeight}</td></tr>
<tr><td>Empty Weight</td><td class="right">${emptyWeight}</td></tr>
<tr class="highlight"><td>Load Weight</td><td class="right">${loadWeight}</td></tr>

<tr><td rowspan="2">Bags</td><td>No. of Bags</td><td class="right">${invoice.quantity}</td></tr>
<tr><td>Bag Weight</td><td class="right">${invoice.bagWeight}</td></tr>

<tr><td>Moisture Deduction</td><td>Adjustment</td><td class="right">${bagDeduction}</td></tr>
</table>

<!-- ===== TOTALS ===== -->
<table class="totals">
<tr><td>Net Weight (Kgs)</td><td class="right">${netWeightKgs}</td></tr>
<tr><td>Net Weight (Maund)</td><td class="right">${netWeightMaund.toFixed(2)}</td></tr>
<tr class="grand-total"><td>TOTAL AMOUNT</td><td class="right">Rs ${invoice.amount}</td></tr>
</table>

<!-- ===== SIGNATURE ===== -->
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
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}
      />

      <h2 className="text-3xl font-bold mb-6 text-gray-800 tracking-wide">
        Purchase Invoices
      </h2>
      {/* FILTERS */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mb-8">
        <div className="grid md:grid-cols-5 gap-4 items-end">

          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Search
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Invoice #, Vendor, Vehicle, Broker..."
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* From Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* To Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Paddy Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Paddy Type
            </label>
            <select
              value={paddyType}
              onChange={(e) => setPaddyType(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">All</option>
              {[...new Set(invoices.map((i) => i.paddyType))].map(
                (type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>


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

      {loading ? (
        <div className="animate-pulse space-y-8" aria-hidden="true">
          {/* Summary cards skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm"
              >
                <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                <div className="h-8 w-24 bg-gray-200 rounded mt-2" />
              </div>
            ))}
          </div>
          {/* Invoice cards skeleton */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6"
            >
              <div className="flex justify-between flex-wrap gap-4 mb-6 border-b pb-4">
                <div className="space-y-2">
                  <div className="h-6 w-28 bg-gray-200 rounded" />
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                  <div className="h-4 w-36 bg-gray-200 rounded" />
                </div>
                <div className="h-10 w-28 bg-gray-200 rounded" />
              </div>
              <div className="grid md:grid-cols-4 gap-6 text-sm">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                    <div className="h-4 w-1/2 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : filteredInvoices.length === 0 ? (
        <p className="text-gray-600 italic">No purchase invoices found.</p>
      ) : (
        <div className="space-y-8">
          {filteredInvoices.map((invoice) => (
            <div
              key={invoice._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-6"
            >
              {/* Header */}
              <div className="flex justify-between flex-wrap gap-4 mb-6 border-b pb-4">
                <div>
                  <h3 className="text-xl font-bold">
                    Invoice #{invoice.sr}
                  </h3>
                  <p>{invoice.date}</p>
                  <Detail label="Ledger Reference" value={invoice.ledgerReference} />

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
                  <Detail label="Paddy Type" value={invoice.paddyType} />
                  <Detail label="Rate / 40KG" value={invoice.rate40kg} />
                  <Detail label="Net Weight" value={invoice.netWeight} />
                </div>

                {/* SECTION 2 */}
                <div className="space-y-2">
                  <Detail label="Vendor" value={invoice.vendorName} />
                  <Detail label="Quantity" value={invoice.quantity} />
                  <Detail label="Net Weight (40KG)" value={invoice.netWeight40KG} />
                  {/* <Detail label="Empty Vehicle Weight" value={invoice.emptyVehicleWeight} />
                  <Detail label="Filled Vehicle Weight" value={invoice.filledVehicleWeight} />
                  <Detail label="Subtract Weight" value={invoice.subtractWeight} />
                  <Detail label="Bag Weight" value={invoice.bagWeight} /> */}
                </div>

                {/* SECTION 3 */}
                <div className="space-y-2">
                  <Detail label="Broker" value={invoice.brokerName} />
                  <Detail label="Final Weight" value={invoice.finalWeight} />
                  {/* <Detail label="Moisture Adj. Cal." value={invoice.moistureAdjCal} /> */}
                  {/* <Detail label="Moisture Adjustment" value={invoice.moistureAdjustment} /> */}
                  {/* <Detail label="Net Weight Cal." value={invoice.netWeightCal} /> */}
                </div>

                {/* SECTION 4 */}
                <div className="space-y-2">
                  <Detail label="Vehicle Number" value={invoice.vehicleNumber} />
                  <Detail label="Moisture %" value={invoice.moisturePercent} />
                  <Detail label="Amount" value={invoice.amount} />
                  {/* <Detail label="Weight KG" value={invoice.weightKG} /> */}
                  {/* <Detail label="Amount Cal." value={invoice.amountCal} /> */}
                  {/* <Detail label="Difference" value={invoice.difference} /> */}
                  {/* <Detail label="Rent Adjustment" value={invoice.rentAdjustment} /> */}
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
