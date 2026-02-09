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

const SalesInvoice = () => {
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    vehicleNo: "",
    builtyNo: "",
    vendorName: "",
    brokerName: "",
    productId: "",
    paddyType: "",
    quantity: "",
    weight: "",
    bagWeight: "",
    netWeight: "",
    netWeight40: "",
    rate40: "",
    amount: "",
    sutliSilaiRate: "",
    sutliSilaiAmount: "",
    totalAmount: "",
    brokeryRate: "",
    brokery: "",
    totalAmount2: "",
  });
  const [products, setProducts] = useState([]);
  const [type, setType] = useState("");
  const [subType, setSubType] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "info" });
  const formRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);

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


  // Today's date for max attribute
  const today = new Date().toISOString().split("T")[0];

  // Auto calculations
  useEffect(() => {
    const netWeight = form.weight && form.bagWeight ? form.weight - form.bagWeight : "";
    const netWeight40 = netWeight ? (netWeight / 40).toFixed(2) : "";
    const amount = netWeight40 && form.rate40 ? (netWeight40 * form.rate40).toFixed(2) : "";
    const sutliSilaiAmount =
      form.sutliSilaiRate && form.quantity ? (form.sutliSilaiRate * form.quantity).toFixed(2) : "";
    const totalAmount =
      amount && sutliSilaiAmount ? (parseFloat(amount) + parseFloat(sutliSilaiAmount)).toFixed(2) : amount || "";
    const brokery =
      totalAmount && form.brokeryRate
        ? ((parseFloat(totalAmount) * parseFloat(form.brokeryRate)) / 100).toFixed(2)
        : "";
    const totalAmount2 =
      totalAmount && brokery ? (parseFloat(totalAmount) - parseFloat(brokery)).toFixed(2) : totalAmount || "";

    setForm((prev) => ({
      ...prev,
      netWeight,
      netWeight40,
      amount,
      sutliSilaiAmount,
      totalAmount,
      brokery,
      totalAmount2,
    }));
  }, [
    form.weight,
    form.bagWeight,
    form.rate40,
    form.quantity,
    form.sutliSilaiRate,
    form.brokeryRate,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const types = [...new Set(products.map((p) => p.type))];

  const subTypes = products
    .filter((p) => p.type === type)
    .map((p) => p.subType);

  useEffect(() => {
    if (type && subType) {
      setForm((prev) => ({
        ...prev,
        paddyType: `${type} - ${subType}`,
      }));
    }
  }, [type, subType]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.productId || !form.date || !form.vehicleNo || !form.vendorName || !form.builtyNo) {
      return setNotification({ message: "Please fill all required fields!", type: "error" });
    }


    try {
      const response = await fetch(`${API_BASE_URL}/sales-invoice/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (data.success) {
        setNotification({ message: "Invoice submitted successfully!", type: "success" });
        setForm({
          date: new Date().toISOString().split("T")[0],
          vehicleNo: "",
          builtyNo: "",
          vendorName: "",
          brokerName: "",
          productId: "",
          paddyType: "",
          quantity: "",
          weight: "",
          bagWeight: "",
          netWeight: "",
          netWeight40: "",
          rate40: "",
          amount: "",
          sutliSilaiRate: "",
          sutliSilaiAmount: "",
          totalAmount: "",
          brokeryRate: "",
          brokery: "",
          totalAmount2: "",
        });
        setType("");
        setSubType("");
        setSelectedProduct("");
      } else {
        setNotification({ message: data.message || "Failed to submit invoice.", type: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({ message: "Server error! Try again.", type: "error" });
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

  const content = (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}
      />

      <div className="w-full max-w-5xl mx-auto space-y-6 pb-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Sales Invoice Entry
          </h1>

          <button
            type="button"
            onClick={() => setIsMaximized(prev => !prev)}
            className="px-3 py-2 text-sm font-semibold border rounded-lg
               bg-gray-100 hover:bg-gray-200 transition"
          >
            {isMaximized ? "Exit Full Screen" : "Full Screen"}
          </button>
        </div>


        <form ref={formRef} onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-6">
          {/* Invoice & Date */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Invoice & Date</h2>
            </div>
            <div className="p-5 grid md:grid-cols-2 gap-4">
              <Field label="Date" name="date" value={form.date} onChange={handleChange} type="date" max={today} />
            </div>
          </section>

          {/* Vehicle Details */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Vehicle Details</h2>
            </div>
            <div className="p-5 grid md:grid-cols-2 gap-4">
              <Field label="Vehicle No." name="vehicleNo" value={form.vehicleNo} onChange={handleChange} placeholder="e.g. ABC-1234" />
              <Field label="Builty No." name="builtyNo" value={form.builtyNo} onChange={handleChange} />
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
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">Product</label>
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
            <div className="p-5 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Field label="Weight (kg)" name="weight" value={form.weight} onChange={handleChange} type="number" />
              <Field label="Bag Weight (kg)" name="bagWeight" value={form.bagWeight} onChange={handleChange} type="number" />
              <Field label="Net Weight (kg)" name="netWeight" value={form.netWeight} readOnly />
              <Field label="Net Weight / 40 kg" name="netWeight40" value={form.netWeight40} readOnly />
            </div>
          </section>

          {/* Pricing & Amount */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Pricing & Amount</h2>
            </div>
            <div className="p-5 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Field label="Rate per 40 kg" name="rate40" value={form.rate40} onChange={handleChange} type="number" />
              <Field label="Amount" name="amount" value={form.amount} readOnly />
              <Field label="Sutli Silai Rate" name="sutliSilaiRate" value={form.sutliSilaiRate} onChange={handleChange} type="number" />
              <Field label="Sutli Silai Amount" name="sutliSilaiAmount" value={form.sutliSilaiAmount} readOnly />
              <Field label="Total Amount" name="totalAmount" value={form.totalAmount} readOnly />
            </div>
          </section>

          {/* Brokery & Final Amount */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Brokery & Final Amount</h2>
            </div>
            <div className="p-5 grid md:grid-cols-3 gap-4">
              <Field label="Brokery Rate (%)" name="brokeryRate" value={form.brokeryRate} onChange={handleChange} type="number" />
              <Field label="Brokery" name="brokery" value={form.brokery} readOnly />
              <Field label="Total Amount (Final)" name="totalAmount2" value={form.totalAmount2} readOnly />
            </div>
          </section>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition shadow-sm"
            >
              Save Invoice
            </button>
          </div>
        </form>
      </div>
    </>
  )

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

export default SalesInvoice;
