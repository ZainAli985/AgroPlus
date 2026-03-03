import React, { useState, useEffect } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";
import Notification from "../Notification.jsx";

const inputStyle =
  "w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none";
const readOnlyStyle = "bg-gray-100 cursor-not-allowed";

export default function WeightBridge() {
  const token = localStorage.getItem("token");

  const [view, setView] = useState("new");
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "info" });

  const [form, setForm] = useState({
    invoiceCode: "",
    date: new Date().toLocaleString(),
    productId: "",
    productName: "",
    vendorName: "",
    vehicleType: "",
    rate: "",
    firstWeight: "",
    firstWeightWithDriver: true,
    firstWeightTime: "",
    secondWeight: "",
    secondWeightWithDriver: true,
    secondWeightTime: "",
    netWeight: "",
    netWeightMaund: "",
    netWeightTon: "",
  });

  const vehicleRates = {
    "22 Wheeler": 700,
    "10 Wheeler": 500,
    "06 Wheeler": 350,
    "Phukar Tralla": 350,
    "Tractor Tralla": 250,
    Mazda: 150,
    Shehzor: 100,
    "Rickshaw/Ggari": 100,
  };

  /* ===================== LOAD PRODUCTS ===================== */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await authFetch(`${API_BASE_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setProducts(data.products);
      } catch (err) {
        console.error(err);
      }
    };
    loadProducts();
  }, []);

  /* ===================== INPUT CHANGE ===================== */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleVehicleChange = (e) => {
    const vehicleType = e.target.value;
    setForm((prev) => ({
      ...prev,
      vehicleType,
      rate: vehicleRates[vehicleType] || 0,
    }));
  };

  /* ===================== FIRST WEIGHT ===================== */
  const handleFirstSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/weight-bridge/first`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: form.productId,
          vendorName: form.vendorName,
          vehicleType: form.vehicleType,
          firstWeight: form.firstWeight,
          firstWeightWithDriver: form.firstWeightWithDriver,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setForm((prev) => ({
          ...prev,
          invoiceCode: data.entry.invoiceCode,
          firstWeightTime: new Date(data.entry.createdAt).toLocaleString(),
        }));
        setNotification({ message: data.message, type: "success" });
      } else {
        setNotification({ message: data.message, type: "error" });
      }
    } catch {
      setNotification({ message: "Server error", type: "error" });
    }
  };

  /* ===================== LOAD INVOICE ===================== */
  const loadInvoice = async () => {
    if (!form.invoiceCode) return setNotification({ message: "Enter invoice number", type: "error" });
    try {
      const res = await authFetch(`${API_BASE_URL}/weight-bridge/${form.invoiceCode}`);
      const data = await res.json();
      if (data.success) {
        setForm((prev) => ({
          ...prev,
          ...data.entry,
          firstWeightTime: new Date(data.entry.createdAt).toLocaleString(),
          secondWeightTime: data.entry.secondWeightTime ? new Date(data.entry.secondWeightTime).toLocaleString() : "",
        }));
      } else {
        setNotification({ message: data.message, type: "error" });
      }
    } catch {
      setNotification({ message: "Server error", type: "error" });
    }
  };

  /* ===================== SECOND WEIGHT ===================== */
  const handleSecondSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/weight-bridge/second`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          invoiceCode: form.invoiceCode,
          secondWeight: form.secondWeight,
          secondWeightWithDriver: form.secondWeightWithDriver,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setForm((prev) => ({
          ...prev,
          secondWeightTime: new Date().toLocaleString(),
          netWeight: data.entry.netWeight,
          netWeightMaund: data.entry.netWeightMaund,
          netWeightTon: data.entry.netWeightTon,
        }));
        setNotification({ message: data.message, type: "success" });
      } else {
        setNotification({ message: data.message, type: "error" });
      }
    } catch {
      setNotification({ message: "Server error", type: "error" });
    }
  };

  /* ===================== UI ===================== */
  return (
    <SidebarLayout>
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "info" })} />

      {/* TOP BUTTONS CENTER */}
      <div className="flex justify-center gap-6 mb-8">
        <button onClick={() => setView("new")} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">New Entry</button>
        <button onClick={() => setView("second")} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Second Weight</button>
      </div>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        {view === "new" && (
          <>
            <h2 className="text-xl font-bold text-center text-blue-700 mb-6">Add First Weight</h2>
            {form.invoiceCode && <div className="text-center mb-4 font-semibold text-blue-600">Invoice: {form.invoiceCode}</div>}

            <form onSubmit={handleFirstSubmit} className="space-y-4">
              <select name="productId" value={form.productId} onChange={handleChange} className={inputStyle} required>
                <option value="">Select Product</option>
                {products.map((p) => <option key={p._id} value={p._id}>{p.productName}</option>)}
              </select>

              <input type="text" name="vendorName" placeholder="Vendor Name" value={form.vendorName} onChange={handleChange} className={inputStyle} required />

              <div className="grid grid-cols-2 gap-4">
                <select name="vehicleType" value={form.vehicleType} onChange={handleVehicleChange} className={inputStyle} required>
                  <option value="">Select Vehicle</option>
                  {Object.keys(vehicleRates).map((v) => <option key={v}>{v}</option>)}
                </select>

                <input type="number" name="rate" placeholder="Rate" value={form.rate} readOnly className={`${inputStyle} ${readOnlyStyle}`} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input type="number" name="firstWeight" placeholder="First Weight (kg)" value={form.firstWeight} onChange={handleChange} className={inputStyle} required />
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="firstWeightWithDriver" checked={form.firstWeightWithDriver} onChange={handleChange} /> With Driver
                </label>
              </div>

              <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save First Weight</button>
            </form>
          </>
        )}

        {view === "second" && (
          <>
            <h2 className="text-xl font-bold text-center text-blue-700 mb-6">Add Second Weight</h2>

            {/* WB- PREFIX */}
            <div className="flex justify-center items-center gap-2 mb-6">
              <span className="font-semibold text-blue-700">WB-</span>
              <input type="text" value={form.invoiceCode.replace("WB-", "")} onChange={(e) => setForm({ ...form, invoiceCode: `WB-${e.target.value}` })} className="w-24 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-600" />
              <button onClick={loadInvoice} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Load</button>
            </div>

            {form.productName && (
              <form onSubmit={handleSecondSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input value={form.vendorName} readOnly className={`${inputStyle} ${readOnlyStyle}`} />
                  <input value={form.productName} readOnly className={`${inputStyle} ${readOnlyStyle}`} />
                  <input value={form.vehicleType} readOnly className={`${inputStyle} ${readOnlyStyle}`} />
                  <input value={`Rs ${form.rate}`} readOnly className={`${inputStyle} ${readOnlyStyle}`} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input value={form.firstWeight} readOnly className={`${inputStyle} ${readOnlyStyle}`} />
                  <span className="flex items-center">{form.firstWeightWithDriver ? "With Driver" : "Without Driver"}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input type="number" name="secondWeight" placeholder="Second Weight (kg)" value={form.secondWeight} onChange={handleChange} className={inputStyle} required />
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="secondWeightWithDriver" checked={form.secondWeightWithDriver} onChange={handleChange} /> With Driver
                  </label>
                </div>

                <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Second Weight</button>
              </form>
            )}
          </>
        )}
      </div>
    </SidebarLayout>
  );
}