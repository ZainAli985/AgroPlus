import React, { useState, useEffect, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";

const inputBase =
  "w-full px-3 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm";
const inputReadOnly = "bg-gray-50 border-gray-200 text-gray-700 cursor-default";

function Field({ label, name, value, onChange, readOnly, type = "text", placeholder, max }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        readOnly={readOnly}
        max={max}
        placeholder={placeholder}
        className={`${inputBase} ${readOnly ? inputReadOnly : ""}`}
      />
    </div>
  );
}

const PurchaseInvoiceForm = () => {
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    ledgerReference: "",
    vehicleNumber: "",
    builtyNumber: "",
    vendorName: "",
    brokerName: "",
    productId: "",
    paddyType: "",
    quantity: "",
    emptyVehicleWeight: "",
    filledVehicleWeight: "",
    subtractWeight: "",
    bagWeight: "",
    finalWeight: "",
    moisturePercent: "",
    moistureAdjCal: "",
    moistureAdjustment: "",
    netWeightCal: "",
    netWeight: "",
    netWeight40KG: "",
    weightKG: "",
    rate40kg: "",
    amountCal: "",
    amount: "",
    difference: "",
    rentAdjustment: ""
  });
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");


  const [notification, setNotification] = useState({ message: "", type: "info" });
  const formRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const focusables = formRef.current?.querySelectorAll(
      'input:not([type=submit]):not([readonly]), select'
    );
    if (!focusables?.length) return;
    const idx = [...focusables].indexOf(e.target);
    if (idx >= 0 && idx < focusables.length - 1) {
      e.preventDefault();
      focusables[idx + 1].focus();
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        }
      })
      .catch(console.error);
  }, []);

  // Today's date in YYYY-MM-DD format for max attribute
  const today = new Date().toISOString().split("T")[0];

  // Auto calculations whenever relevant fields change
  useEffect(() => {
    const subtractWeight =
      form.filledVehicleWeight !== "" && form.emptyVehicleWeight !== ""
        ? Number(form.filledVehicleWeight) - Number(form.emptyVehicleWeight)
        : 0;

    const finalWeight =
      subtractWeight !== "" && form.bagWeight !== ""
        ? subtractWeight - Number(form.bagWeight)
        : subtractWeight;


    const moistureAdjCal =
      finalWeight && form.moisturePercent
        ? (finalWeight * form.moisturePercent) / 100
        : 0;

    const netWeight = finalWeight - moistureAdjCal;
    const netWeight40KG = netWeight ? netWeight / 40 : 0;
    const amount = netWeight40KG && form.rate40kg ? netWeight40KG * form.rate40kg : 0;

    setForm((prev) => ({
      ...prev,
      subtractWeight,
      finalWeight,
      moistureAdjCal,
      moistureAdjustment: moistureAdjCal,
      netWeight,
      netWeight40KG,
      amountCal: amount,
      amount
    }));
  }, [
    form.emptyVehicleWeight,
    form.filledVehicleWeight,
    form.bagWeight,
    form.moisturePercent,
    form.rate40kg
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.productId || !form.date || !form.vehicleNumber || !form.vendorName || !form.builtyNumber) {
      return setNotification({ message: "Please fill required fields", type: "error" });
    }
    try {
      const response = await fetch(`${API_BASE_URL}/purchase-invoice/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (data.success) {
        setNotification({ message: "Purchase invoice saved successfully!", type: "success" });
        setForm({
          date: new Date().toISOString().split("T")[0],
          ledgerReference: "",
          vehicleNumber: "",
          builtyNumber: "",
          vendorName: "",
          brokerName: "",
          productId: "",
          paddyType: "",
          quantity: "",
          emptyVehicleWeight: "",
          filledVehicleWeight: "",
          subtractWeight: "",
          bagWeight: "",
          finalWeight: "",
          moisturePercent: "",
          moistureAdjCal: "",
          moistureAdjustment: "",
          netWeightCal: "",
          netWeight: "",
          netWeight40KG: "",
          weightKG: "",
          rate40kg: "",
          amountCal: "",
          amount: "",
          difference: "",
          rentAdjustment: ""
        });
        setSelectedProduct("");

      } else {
        setNotification({ message: data.message || "Failed to save invoice", type: "error" });
      }
    } catch (error) {
      console.error(error);
      setNotification({ message: "Server error!", type: "error" });
    }
  };

  return (
    <SidebarLayout>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}
      />

      <div className="w-full max-w-5xl mx-auto space-y-6 pb-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Purchase Invoice Entry</h1>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-6">
          {/* Invoice & Date */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Invoice & Date</h2>
            </div>
            <div className="p-5 grid md:grid-cols-2 gap-4">
              <Field label="Date" name="date" value={form.date} onChange={handleChange} type="date" max={today} />
              <Field label="Ledger Reference" name="ledgerReference" value={form.ledgerReference} onChange={handleChange} />
            </div>
          </section>

          {/* Vehicle Details */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Vehicle Details</h2>
            </div>
            <div className="p-5 grid md:grid-cols-2 gap-4">
              <Field label="Vehicle Number" name="vehicleNumber" value={form.vehicleNumber} onChange={handleChange} placeholder="e.g. ABC-1234" />
              <Field label="Builty Number" name="builtyNumber" value={form.builtyNumber} onChange={handleChange} />
            </div>
          </section>

          {/* Party Details */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Party Details</h2>
            </div>
            <div className="p-5 grid md:grid-cols-2 gap-4">
              <Field label="Vendor Name" name="vendorName" value={form.vendorName} onChange={handleChange} />
              <Field label="Broker Name" name="brokerName" value={form.brokerName} onChange={handleChange} />
            </div>
          </section>

          {/* Product & Quantity */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Product & Quantity</h2>
            </div>
            <div className="p-5 grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">Product (Paddy Type)</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => {
                    const product = products.find(p => p._id === e.target.value);
                    setSelectedProduct(e.target.value);
                    setForm(prev => ({
                      ...prev,
                      paddyType: product?.productName || "",
                      productId: product?._id || "",
                    }));
                  }}
                  className={inputBase}
                  required
                >
                  <option value="">Select Product</option>
                  {products.map(p => (
                    <option key={p._id} value={p._id}>{p.productName}</option>
                  ))}
                </select>
              </div>
              <Field label="Quantity" name="quantity" value={form.quantity} onChange={handleChange} type="number" />
            </div>
          </section>

          {/* Weight Details */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Weight Details</h2>
            </div>
            <div className="p-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Empty Vehicle Weight (kg)" name="emptyVehicleWeight" value={form.emptyVehicleWeight} onChange={handleChange} type="number" />
              <Field label="Filled Vehicle Weight (kg)" name="filledVehicleWeight" value={form.filledVehicleWeight} onChange={handleChange} type="number" />
              <Field label="Gross Weight (calc)" name="subtractWeight" value={form.subtractWeight} readOnly />
              <Field label="Bag Weight (kg)" name="bagWeight" value={form.bagWeight} onChange={handleChange} type="number" />
              <Field label="Final Weight (kg)" name="finalWeight" value={form.finalWeight} readOnly />
            </div>
          </section>

          {/* Moisture & Net Weight */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Moisture & Net Weight</h2>
            </div>
            <div className="p-5 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Field label="Moisture %" name="moisturePercent" value={form.moisturePercent} onChange={handleChange} type="number" />
              <Field label="Moisture Adj. (calc)" name="moistureAdjCal" value={form.moistureAdjCal} readOnly />
              <Field label="Net Weight (kg)" name="netWeight" value={form.netWeight} readOnly />
              <Field label="Net Weight / 40 kg" name="netWeight40KG" value={form.netWeight40KG} readOnly />
            </div>
          </section>

          {/* Pricing & Amount */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Pricing & Amount</h2>
            </div>
            <div className="p-5 grid md:grid-cols-3 gap-4">
              <Field label="Rate per 40 kg" name="rate40kg" value={form.rate40kg} onChange={handleChange} type="number" />
              <Field label="Amount (calc)" name="amountCal" value={form.amountCal} readOnly />
              <Field label="Amount" name="amount" value={form.amount} readOnly />
            </div>
          </section>

          {/* Adjustments */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Adjustments</h2>
            </div>
            <div className="p-5 grid md:grid-cols-2 gap-4">
              <Field label="Difference" name="difference" value={form.difference} onChange={handleChange} type="number" />
              <Field label="Rent Adjustment" name="rentAdjustment" value={form.rentAdjustment} onChange={handleChange} type="number" />
            </div>
          </section>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition shadow-sm"
            >
              Save Purchase Invoice
            </button>
          </div>
        </form>
      </div>
    </SidebarLayout>
  );
};

export default PurchaseInvoiceForm;
