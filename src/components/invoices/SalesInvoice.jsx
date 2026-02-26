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
  const token = localStorage.getItem("token");

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
    const token = localStorage.getItem("token");

    fetch(`${API_BASE_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
    const netWeight = form.weight && form.bagWeight ? form.weight - (form.bagWeight * form.quantity) : "";
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-800">
              Sales Invoice Entry
            </h1>

            <button
              type="button"
              onClick={() => setIsMaximized(prev => !prev)}
              className="px-3 py-1.5 text-xs font-semibold rounded-md 
                bg-white border border-gray-300 
                hover:bg-blue-50 hover:border-blue-400 transition"
            >
              {isMaximized ? "Exit Full Screen" : "Full Screen"}
            </button>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

              {/* ================= LEFT SIDE ================= */}
              <div className="lg:col-span-2 space-y-4">

                {/* ===== BASIC DETAILS ===== */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                  <h2 className="text-xs font-bold text-gray-600 uppercase mb-3 border-b pb-2">
                    Basic Details
                  </h2>

                  <div className="grid md:grid-cols-3 gap-3">
                    <Field label="Date" name="date" value={form.date} onChange={handleChange} type="date" max={today} />
                    <Field label="Vehicle No" name="vehicleNo" value={form.vehicleNo} onChange={handleChange} />
                    <Field label="Builty No" name="builtyNo" value={form.builtyNo} onChange={handleChange} />
                    <Field label="Vendor Name" name="vendorName" value={form.vendorName} onChange={handleChange} />
                    <Field label="Broker Name" name="brokerName" value={form.brokerName} onChange={handleChange} />

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-gray-600 uppercase">
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
                        className={`${inputBase} hover:border-blue-400`}
                        required
                      >
                        <option value="">Select Product</option>
                        {products.map(p => (
                          <option key={p._id} value={p._id}>{p.productName}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* ===== PRICING & WEIGHT CALCULATION ===== */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                  <h2 className="text-xs font-bold text-gray-600 uppercase mb-3 border-b pb-2">
                    Weight Calculation
                  </h2>

                  <div className="grid md:grid-cols-3 gap-3">
                    {/* <Field label="Rate / 40kg" name="rate40" value={form.rate40} onChange={handleChange} type="number" /> */}
                    {/* <Field label="Sutli Rate" name="sutliSilaiRate" value={form.sutliSilaiRate} onChange={handleChange} type="number" /> */}
                    {/* <Field label="Brokery %" name="brokeryRate" value={form.brokeryRate} onChange={handleChange} type="number" /> */}
                    <Field label="Quantity" name="quantity" value={form.quantity} onChange={handleChange} type="number" />
                    <Field label="Weight (kg)" name="weight" value={form.weight} onChange={handleChange} type="number" />
                    <Field label="Bag Weight (kg)" name="bagWeight" value={form.bagWeight} onChange={handleChange} type="number" />

                    <div className="md:col-span-3 grid grid-cols-3 gap-3">
                      <Field label="Net Weight (kg)" name="netWeight" value={form.netWeight} readOnly />
                      <Field
                        label="Net Weight (Maund)"
                        name="maund"
                        value={form.netWeight ? (form.netWeight / 40).toFixed(2) : ""}
                        readOnly
                      />
                      <Field
                        label="Net Weight (Ton)"
                        name="ton"
                        value={form.netWeight ? (form.netWeight / 1000).toFixed(3) : ""}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                {/* ===== MINI PRICING BOX ===== */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                  <h2 className="text-xs font-bold text-gray-600 uppercase mb-3 border-b pb-2">
                    Pricing Details
                  </h2>

                  <div className="grid md:grid-cols-3 gap-3">
                    <Field label="Rate / 40kg" name="rate40" value={form.rate40} onChange={handleChange} type="number" />
                    <Field label="Sutli Rate" name="sutliSilaiRate" value={form.sutliSilaiRate} onChange={handleChange} type="number" />
                    <Field label="Brokery %" name="brokeryRate" value={form.brokeryRate} onChange={handleChange} type="number" />
                  </div>
                </div>



              </div>

              {/* ================= RIGHT BOX ================= */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 h-full flex flex-col">

                  <h2 className="text-xs font-bold text-gray-600 uppercase mb-3 border-b pb-2">
                    Final Calculation
                  </h2>

                  <div className="space-y-3 flex-1">
                    <Field label="Quantity" name="quantity" value={form.quantity} readOnly />
                    <Field label="Sutli Amount" name="sutliSilaiAmount" value={form.sutliSilaiAmount} readOnly />
                    <Field label="Brokery Amount" name="brokery" value={form.brokery} readOnly />

                    <div className="grid grid-cols-1 gap-2">
                      <Field label="Net Weight (kg)" name="netWeight" value={form.netWeight} readOnly />
                      <Field
                        label="Net Weight (Maund)"
                        name="maund2"
                        value={form.netWeight ? (form.netWeight / 40).toFixed(2) : ""}
                        readOnly
                      />
                      <Field
                        label="Net Weight (Ton)"
                        name="ton2"
                        value={form.netWeight ? (form.netWeight / 1000).toFixed(3) : ""}
                        readOnly
                      />
                      <Field
                        label="Final Amount"
                        name="totalAmount2"
                        value={form.totalAmount2}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-2 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 
        text-white rounded-lg font-semibold 
        hover:from-blue-700 hover:to-indigo-700 transition"
                    >
                      Save Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
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

export default SalesInvoice;
