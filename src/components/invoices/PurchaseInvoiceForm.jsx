import React, { useState, useEffect, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

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
  const [isMaximized, setIsMaximized] = useState(false);
  const token = localStorage.getItem("token");
  const [invoiceNumber, setInvoiceNumber] = useState("");



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
    const fetchProducts = async () => {
      try {
        const data = await authFetch(`${API_BASE_URL}/products`);
        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);
  // Today's date in YYYY-MM-DD format for max attribute
  const today = new Date().toISOString().split("T")[0];

  // Auto calculations whenever relevant fields change
  useEffect(() => {
    const bagQuantity = Number(form.quantity) || 0;
    const bagWeightPerBag = Number(form.bagWeight) || 0;
    const moisturePercent = Number(form.moisturePercent) || 0;
    const rate40kg = Number(form.rate40kg) || 0;

    // 1️⃣ Final Weight = Bag weight * quantity
    const finalWeight = bagWeightPerBag * bagQuantity;

    // 2️⃣ Moisture Adjustment
    const moistureAdjCal = (finalWeight * moisturePercent) / 100;

    // 3️⃣ Net Weight
    const netWeight = finalWeight - moistureAdjCal;

    // 4️⃣ Convert to 40kg (Maund)
    const netWeight40KG = netWeight / 40;

    // 5️⃣ Amount
    const amount = netWeight40KG * rate40kg;

    setForm(prev => ({
      ...prev,
      subtractWeight: finalWeight, // optional: can keep same field for backward compatibility
      finalWeight,
      moistureAdjCal,
      moistureAdjustment: moistureAdjCal,
      netWeight,
      netWeight40KG,
      amountCal: amount,
      amount
    }));
  }, [form.bagWeight, form.quantity, form.moisturePercent, form.rate40kg]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.productId || !form.date || !form.vehicleNumber || !form.vendorName || !form.builtyNumber) {
      return setNotification({ message: "Please fill required fields", type: "error" });
    }

    try {
      // Include invoice number (sr) in the payload
      const payload = { ...form, sr: Number(invoiceNumber) };
      const response = await fetch(`${API_BASE_URL}/purchase-invoice/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
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

        // Increment invoice number locally for next entry  
        if (data.success) {
          // reset form etc.

          // Fetch next invoice number from backend
          const res = await fetch(`${API_BASE_URL}/purchase-invoice/next-sr`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });
          const nextData = await res.json();
          if (nextData.success) setInvoiceNumber(nextData.nextSr);
        }

      } else {
        setNotification({ message: data.message || "Failed to save invoice", type: "error" });
      }
    } catch (error) {
      console.error(error);
      setNotification({ message: "Server error!", type: "error" });
    }
  };
  useEffect(() => {
    if (isMaximized && formRef.current) {
      const firstInput = formRef.current.querySelector("input, select");
      firstInput?.focus();
    }
  }, [isMaximized]);
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && isMaximized) {
        setIsMaximized(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isMaximized]);
  useEffect(() => {
    const fetchInvoiceNumber = async () => {
      if (!token) {
        console.error("No auth token, cannot fetch invoice number");
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/purchase-invoice/next-sr`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        const data = await res.json();
        if (data.success && data.nextSr != null) {
          setInvoiceNumber(data.nextSr.toString());
        } else {
          console.error("Invalid response from next-sr:", data);
        }
      } catch (err) {
        console.error("Error fetching next invoice number:", err);
      }
    };

    fetchInvoiceNumber();
  }, [token]);

  const content = (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}
      />

      <div className="w-full max-w-7xl mx-auto space-y-4 pb-8 px-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">
            Purchase Invoice Entry
          </h1>

          <button
            type="button"
            onClick={() => setIsMaximized(prev => !prev)}
            className="px-3 py-1.5 text-xs font-semibold border rounded-md
            bg-gray-100 hover:bg-gray-200 transition"
          >
            {isMaximized ? "Exit Full Screen" : "Full Screen"}
          </button>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          className="space-y-4"
        >

          {/* ===== TOP TWO BOXES ===== */}
          <div className="grid lg:grid-cols-2 gap-4">

            {/* ================= BOX 1 - BASIC INFO ================= */}
            <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <h2 className="text-xs font-bold text-gray-600 uppercase mb-3 tracking-wide">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                <Field label="Date" name="date" value={form.date} onChange={handleChange} type="date" max={today} />
                {/* <Field label="Ledger Reference" name="ledgerReference" value={form.ledgerReference} onChange={handleChange} /> */}
                <Field label="Invoice Number" name="sr" value={invoiceNumber || "Loading..."} readOnly />

                <Field label="Vehicle Number" name="vehicleNumber" value={form.vehicleNumber} onChange={handleChange} />
                <Field label="Builty Number" name="builtyNumber" value={form.builtyNumber} onChange={handleChange} />

                <Field label="Vendor Name" name="vendorName" value={form.vendorName} onChange={handleChange} />
                {/* <Field label="Broker Name" name="brokerName" value={form.brokerName} onChange={handleChange} /> */}

                {/* Product */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Product
                  </label>
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
                      <option key={p._id} value={p._id}>
                        {p.productName}
                      </option>
                    ))}
                  </select>
                </div>

                <Field
                  label="Bag Quantity"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  type="number"
                />

              </div>
            </section>

            {/* ================= BOX 2 - WEIGHT & MOISTURE ================= */}
            <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <h2 className="text-xs font-bold text-gray-600 uppercase mb-3 tracking-wide">
                Weight & Moisture Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                {/* <Field label="Empty Vehicle Weight (kg)" name="emptyVehicleWeight" value={form.emptyVehicleWeight} onChange={handleChange} type="number" /> */}

                {/* <Field label="Filled Vehicle Weight (kg)" name="filledVehicleWeight" value={form.filledVehicleWeight} onChange={handleChange} type="number" /> */}

                <Field label="Total Bag Weight (kg)" name="subtractWeight" value={form.subtractWeight} readOnly />

                <Field label="Bag Weight (kg)" name="bagWeight" value={form.bagWeight} onChange={handleChange} type="number" />

                <Field label="Final Weight (kg)" name="finalWeight" value={form.finalWeight} readOnly />

                <Field label="Moisture Percentage (%)" name="moisturePercent" value={form.moisturePercent} onChange={handleChange} type="number" />

                <Field label="Moisture Adjustment (kg)" name="moistureAdjCal" value={form.moistureAdjCal} readOnly />

                <Field label="Net Weight (kg)" name="netWeight" value={form.netWeight} readOnly />

                <Field label="Net Weight per 40 kg (Maund)" name="netWeight40KG" value={form.netWeight40KG} readOnly />

              </div>
            </section>
          </div>

          {/* ================= BOX 3 - PRICING & ADJUSTMENT ================= */}
          <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h2 className="text-xs font-bold text-gray-600 uppercase mb-3 tracking-wide">
              Pricing & Adjustments
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

              <Field
                label="Rate per 40 kg (Rs.)"
                name="rate40kg"
                value={form.rate40kg}
                onChange={handleChange}
                type="number"
              />

              <Field
                label="Calculated Amount (Rs.)"
                name="amountCal"
                value={form.amountCal}
                readOnly
              />

              <Field
                label="Final Amount (Rs.)"
                name="amount"
                value={form.amount}
                readOnly
              />

              {/* <Field
                label="Difference (Rs.)"
                name="difference"
                value={form.difference}
                onChange={handleChange}
                type="number"
              /> */}

              <Field
                label="Rent Adjustment (Rs.)"
                name="rentAdjustment"
                value={form.rentAdjustment}
                onChange={handleChange}
                type="number"
              />

            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white text-sm rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Save Purchase Invoice
              </button>
            </div>
          </section>

        </form>
      </div>
    </>
  );


  return isMaximized ? (
    <div className="fixed inset-0 z-50 bg-gray-100 overflow-auto">
      {content}
    </div>
  ) : (
    <SidebarLayout>
      {content}
    </SidebarLayout>
  );
};

export default PurchaseInvoiceForm;
