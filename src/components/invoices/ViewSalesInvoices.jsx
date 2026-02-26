import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

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
  const [loading, setLoading] = useState(true);
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
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [paddyType, setPaddyType] = useState("");

  const [filteredInvoices, setFilteredInvoices] = useState([]);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await authFetch(`${API_BASE_URL}/sales-invoice`);
        const data = await res.json();

        if (data.success) {
          setInvoices(data.invoices);
          setFilteredInvoices(data.invoices);


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
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  useEffect(() => {
    let data = invoices;

    // 🔍 Search filter
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (inv) =>
          inv.vendorName?.toLowerCase().includes(q) ||
          inv.vehicleNo?.toLowerCase().includes(q) ||
          inv.brokerName?.toLowerCase().includes(q) ||
          String(inv.sr)?.includes(q)
      );
    }

    // 📅 Date filters
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

    // 🌾 Paddy Type
    if (paddyType) {
      data = data.filter((inv) => inv.paddyType === paddyType);
    }

    // 🔢 Recalculate summary
    const total = data.reduce(
      (sum, inv) => sum + num(inv.totalAmount2),
      0
    );
    const phukar = data.reduce(
      (sum, inv) => sum + num(inv.quantity),
      0
    );
    const polish = data.reduce(
      (sum, inv) => sum + num(inv.netWeight),
      0
    );
    const rice = data.reduce(
      (sum, inv) => sum + num(inv.amount),
      0
    );

    const count = data.length || 1;

    setSummary({
      total,
      phukar: Math.round(phukar / count),
      polish: Math.round(polish / count),
      rice: Math.round(rice / count),
    });

    setFilteredInvoices(data);
  }, [search, fromDate, toDate, paddyType, invoices]);


  /* ================= PRINT INVOICE ================= */
  const openInvoicePrint = (invoice) => {
    const newWindow = window.open("", "_blank");
    if (!newWindow) return;

    const filledWeight = num(invoice.weight);
    const emptyWeight = num(invoice.quantity) * num(invoice.bagWeight);
    const loadWeight = num(invoice.netWeight);

    const deductionPerBag = 3;
    const totalDeduction = num(invoice.quantity) * deductionPerBag;

    const netWeightKgs = loadWeight - totalDeduction;
    const netWeightMaund = netWeightKgs / 40;

    const subtotalAmount = num(invoice.totalAmount);
    const bagClosingCost = num(invoice.sutliSilaiAmount);

    const grandTotal =
      num(invoice.totalAmount2) ||
      subtotalAmount + bagClosingCost + num(invoice.brokery);

    const content = `
<!DOCTYPE html>
<html>
<head>
<title>Sales Invoice ${invoice.builtyNo}</title>

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
  max-width: 650px;   /* 👈 narrower invoice */
  margin: auto;
}

/* ===== HEADER ===== */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid #1e3a8a;
  padding-bottom: 12px;
  margin-bottom: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo img {
  height: 60px;
}

.logo h1 {
  font-size: 22px;
  margin: 0;
  color: #1e3a8a;
}

.logo p {
  font-size: 11px;
  margin: 2px 0;
}

.invoice-meta {
  text-align: right;
}

.invoice-meta h2 {
  margin: 0;
  font-size: 20px;
  color: #1e40af;
}

.invoice-meta table {
  font-size: 12px;
  margin-top: 6px;
}

/* ===== INFO BLOCKS ===== */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.info-box {
  border: 1px solid #e5e7eb;
  padding: 8px;      /* 👈 less width usage */
  border-radius: 6px;
}


.info-box h4 {
  margin: 0 0 8px 0;
  font-size: 13px;
  color: #1e3a8a;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 4px;
}

.info-box p {
  font-size: 12px;
  margin: 4px 0;
}

/* ===== TABLES ===== */
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;        /* 👈 slightly smaller */
  margin-top: 12px;
}

th {
  background: #1e3a8a;
  color: #fff;
  padding: 5px 4px;       /* 👈 less horizontal padding */
  text-align: center;    /* 👈 centered headers */
  font-size: 11px;
}

td {
  border: 1px solid #000;
  padding: 4px 4px;       /* 👈 tighter columns */
}

td {
  border: 1px solid #000;
  padding: 6px;
}

.right {
  text-align: center;    /* 👈 figures centralized */
}

.highlight {
  background: #f1f5ff;
  font-weight: bold;
}

/* ===== TOTALS ===== */
.totals {
  margin-top: 16px;
}

.totals td {
  font-weight: bold;
  font-size: 12px;
  padding: 6px 4px;
}

.grand-total {
  font-size: 15px;
  color: #1e3a8a;
  text-align: center;   /* 👈 visually strong */
}


/* ===== SIGNATURE ===== */
.signature {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.signature div {
  width: 45%;
  text-align: center;
}

.signature span {
  display: block;
  margin-top: 40px;
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
    <h2>SALE INVOICE</h2>
    <table>
      <tr><td><b>Invoice #</b></td><td>${invoice.builtyNo}</td></tr>
      <tr><td><b>Date</b></td><td>${invoice.date}</td></tr>
    </table>
  </div>
</div>

<!-- ===== INFO ===== -->
<div class="info-grid">
  <div class="info-box">
    <h4>BILL TO</h4>
    <p><b>Name:</b> ${invoice.vendorName}</p>
    <p><b>Company:</b> D.T Rice Mills</p>
    <p><b>City:</b> Hyderabad</p>
    <p><b>Phone:</b> 0329-0999329</p>
  </div>

  <div class="info-box">
    <h4>TRANSPORT DETAILS</h4>
    <p><b>Vehicle No:</b> ${invoice.vehicleNo}</p>
    <p><b>Broker:</b> ${invoice.brokerName}</p>
    <p><b>Paddy Type:</b> ${invoice.paddyType}</p>
    <p><b>Rate (40kg):</b> Rs ${fmt(invoice.rate40)}</p>
  </div>
</div>

<!-- ===== WEIGHT TABLE ===== -->
<table>
<tr>
<th>Description</th>
<th>Details</th>
<th class="right">Weight (Kgs)</th>
</tr>

<tr><td rowspan="3">Weight</td><td>Filled Weight</td><td class="right">${fmt(filledWeight)}</td></tr>
<tr><td>Empty Weight</td><td class="right">${fmt(emptyWeight)}</td></tr>
<tr class="highlight"><td>Net Load Weight</td><td class="right">${fmt(loadWeight)}</td></tr>

<tr><td rowspan="2">Bags</td><td>No. of Bags</td><td class="right">${fmt(invoice.quantity)}</td></tr>
<tr><td>Bag Weight</td><td class="right">${fmt(invoice.bagWeight)}</td></tr>

<tr><td>Deduction</td><td>3 Kg / Bag</td><td class="right">${fmt(totalDeduction)}</td></tr>
</table>

<!-- ===== TOTALS ===== -->
<table class="totals">
<tr><td>Net Weight (Kgs)</td><td class="right">${fmt(netWeightKgs)}</td></tr>
<tr><td>Net Weight (Maund)</td><td class="right">${fmt(netWeightMaund)}</td></tr>
<tr><td>Subtotal</td><td class="right">${fmt(subtotalAmount)}</td></tr>
<tr><td>Bag Closing Cost</td><td class="right">${fmt(bagClosingCost)}</td></tr>
<tr class="grand-total"><td>GRAND TOTAL</td><td class="right">Rs ${fmt(grandTotal)}</td></tr>
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

      {loading ? (
        <div className="animate-pulse" aria-hidden="true">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow">
                <div className="h-4 w-28 bg-gray-200 rounded mb-2" />
                <div className="h-8 w-20 bg-gray-200 rounded mt-2" />
              </div>
            ))}
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 mb-6 rounded-xl shadow">
              <div className="flex justify-between mb-4">
                <div className="h-6 w-28 bg-gray-200 rounded" />
                <div className="h-10 w-28 bg-gray-200 rounded" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-4/5 bg-gray-200 rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                    {j === 3 && (
                      <>
                        <div className="h-4 w-1/2 bg-gray-200 rounded" />
                        <div className="h-4 w-1/2 bg-gray-200 rounded" />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
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
          {filteredInvoices.length === 0 ? (
            <p className="text-gray-500 italic">
              No sales invoices found.
            </p>
          ) : (
            filteredInvoices.map((invoice) => (
              <div key={invoice._id} className="bg-white p-6 mb-6 rounded-xl shadow">
                <div className="flex justify-between mb-4">
                  <h3 className="text-xl font-bold">
                    Invoice #{invoice.sr}
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
                    <p><b>Paddy Type:</b> {invoice.paddyType}</p>
                    <p><b>Vehicle No:</b> {invoice.vehicleNo}</p>
                    <p><b>Net Weight:</b> {invoice.netWeight}</p>
                  </div>

                  <div>
                    <p><b>Vendor:</b> {invoice.vendorName}</p>
                    <p><b>Rate (40kg):</b> {invoice.rate40}</p>
                    <p><b>Net Weight (40kg):</b> {invoice.netWeight40}</p>
                  </div>

                  <div>
                    <p><b>Broker:</b> {invoice.brokerName}</p>
                    <p><b>No. of Bags:</b> {invoice.quantity}</p>
                    <p><b>Sutli Silai:</b> {invoice.sutliSilaiAmount}</p>
                    <p><b>Subtotal:</b> {invoice.totalAmount}</p>
                    <p><b>Grand Total:</b> {invoice.totalAmount2}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </>
      )}



    </SidebarLayout>
  );
};

export default ViewSalesInvoices;
