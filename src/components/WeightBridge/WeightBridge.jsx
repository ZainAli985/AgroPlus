import React, { useState, useEffect } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";
import Notification from "../Notification.jsx";


// ── Moved outside component to prevent React remounting on every keystroke ──
// Defining components or constants inside a render function causes React to
// treat them as new references each render, unmounting/remounting and killing focus.
function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}

const inp =
  "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-slate-300";
const readOnly = "bg-slate-50 cursor-not-allowed text-slate-500";

export default function WeightBridge() {
  const token = localStorage.getItem("token");

  const [view, setView] = useState("new");
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "info" });
  const [submitted, setSubmitted] = useState(false); // shows result card after first weight

  const [form, setForm] = useState({
    invoiceCode: "",
    productId: "",
    productName: "",
    vendorName: "",
    vehicleNumber: "",
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleVehicleChange = (e) => {
    const vehicleType = e.target.value;
    setForm((prev) => ({ ...prev, vehicleType, rate: vehicleRates[vehicleType] || 0 }));
  };

  const handleFirstSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/weight-bridge/first`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          productId: form.productId,
          vendorName: form.vendorName,
          vehicleNumber: form.vehicleNumber,
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
        setSubmitted(true);
        setNotification({ message: data.message, type: "success" });
      } else {
        setNotification({ message: data.message, type: "error" });
      }
    } catch {
      setNotification({ message: "Server error", type: "error" });
    }
  };

  const resetForm = () => {
    setForm({
      invoiceCode: "", productId: "", productName: "", vendorName: "",
      vehicleNumber: "", vehicleType: "", rate: "", firstWeight: "",
      firstWeightWithDriver: true, firstWeightTime: "", secondWeight: "",
      secondWeightWithDriver: true, secondWeightTime: "", netWeight: "",
      netWeightMaund: "", netWeightTon: "",
    });
    setSubmitted(false);
  };

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
          secondWeightTime: data.entry.secondWeightTime
            ? new Date(data.entry.secondWeightTime).toLocaleString()
            : "",
        }));
      } else {
        setNotification({ message: data.message, type: "error" });
      }
    } catch {
      setNotification({ message: "Server error", type: "error" });
    }
  };

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

  // inp and readOnly moved to module scope (see top of file)

  return (
    <SidebarLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        .wb-root { font-family: 'DM Sans', sans-serif; }
        .wb-title { font-family: 'Syne', sans-serif; }
        .wb-mono  { font-family: 'DM Mono', monospace; }
        .wb-card  { animation: wbFadeIn 0.25s ease both; }
        @keyframes wbFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .toggle-driver input[type=checkbox] { display: none; }
        .toggle-driver label {
          display: inline-flex; align-items: center; gap: 8px;
          cursor: pointer; user-select: none;
        }
        .toggle-track {
          width: 40px; height: 22px; border-radius: 999px;
          background: #e2e8f0; transition: background 0.2s; position: relative;
        }
        .toggle-thumb {
          position: absolute; top: 3px; left: 3px;
          width: 16px; height: 16px; border-radius: 50%;
          background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          transition: left 0.2s;
        }
        .toggle-driver input:checked + label .toggle-track { background: #3b82f6; }
        .toggle-driver input:checked + label .toggle-thumb { left: 21px; }
      `}</style>

      <div className="wb-root min-h-screen bg-slate-50 pb-16">
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "info" })}
        />

        {/* ── Header ── */}
        <div className="bg-slate-900 text-white rounded-2xl px-8 py-7 mb-6 shadow-xl flex items-end justify-between">
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-[0.2em] mb-1">Operations</p>
            <h1 className="wb-title text-3xl font-bold">Weight Bridge</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setView("new"); resetForm(); }}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
                view === "new"
                  ? "bg-white text-slate-900"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              New Entry
            </button>
            <button
              onClick={() => { setView("second"); resetForm(); }}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
                view === "second"
                  ? "bg-white text-slate-900"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Second Weight
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">

          {/* ════════════════════════════
              NEW ENTRY — FIRST WEIGHT
          ════════════════════════════ */}
          {view === "new" && !submitted && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden wb-card">
              {/* Card header */}
              <div className="px-7 py-5 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">1</div>
                <div>
                  <h2 className="wb-title text-lg font-bold text-slate-800">First Weight Entry</h2>
                  <p className="text-xs text-slate-400">Fill in vehicle and weight details</p>
                </div>
              </div>

              <form onSubmit={handleFirstSubmit} className="px-7 py-6 space-y-5">

                {/* Vendor + Vehicle Number */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Vendor Name">
                    <input
                      type="text" name="vendorName" placeholder="e.g. Ali Traders"
                      value={form.vendorName} onChange={handleChange}
                      className={inp} required
                    />
                  </Field>
                  <Field label="Vehicle Number">
                    <input
                      type="text" name="vehicleNumber" placeholder="e.g. LEA-1234"
                      value={form.vehicleNumber} onChange={handleChange}
                      className={`${inp} wb-mono uppercase`} required
                    />
                  </Field>
                </div>

                {/* Product */}
                <Field label="Product">
                  <select
                    name="productId" value={form.productId}
                    onChange={(e) => {
                      const selected = products.find((p) => p._id === e.target.value);
                      setForm((prev) => ({
                        ...prev,
                        productId: e.target.value,
                        productName: selected?.productName || "",
                      }));
                    }}
                    className={inp} required
                  >
                    <option value="">Select Product</option>
                    {products.map((p) => (
                      <option key={p._id} value={p._id}>{p.productName}</option>
                    ))}
                  </select>
                </Field>

                {/* Vehicle Type + Rate */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Vehicle Type">
                    <select
                      name="vehicleType" value={form.vehicleType}
                      onChange={handleVehicleChange} className={inp} required
                    >
                      <option value="">Select Type</option>
                      {Object.keys(vehicleRates).map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Rate (Rs)">
                    <input
                      type="number" name="rate" value={form.rate}
                      readOnly className={`${inp} ${readOnly} wb-mono`}
                      placeholder="Auto"
                    />
                  </Field>
                </div>

                {/* First Weight + Driver toggle */}
                <div className="grid grid-cols-2 gap-4 items-end">
                  <Field label="First Weight (kg)">
                    <input
                      type="number" name="firstWeight" placeholder="e.g. 18500"
                      value={form.firstWeight} onChange={handleChange}
                      className={`${inp} wb-mono`} required
                    />
                  </Field>
                  <div className="pb-1">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Driver</p>
                    <div className="toggle-driver">
                      <input
                        type="checkbox" id="fw-driver"
                        name="firstWeightWithDriver"
                        checked={form.firstWeightWithDriver}
                        onChange={handleChange}
                      />
                      <label htmlFor="fw-driver">
                        <span className="toggle-track">
                          <span className="toggle-thumb" />
                        </span>
                        <span className={`text-sm font-medium ${form.firstWeightWithDriver ? "text-blue-600" : "text-slate-400"}`}>
                          {form.firstWeightWithDriver ? "With Driver" : "Without Driver"}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-xl transition text-sm"
                >
                  Save First Weight →
                </button>
              </form>
            </div>
          )}

          {/* ── Success card after first weight ── */}
          {view === "new" && submitted && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center wb-card space-y-5">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-3xl">✓</div>
              <div>
                <h2 className="wb-title text-2xl font-bold text-slate-800">First Weight Saved</h2>
                <p className="text-slate-500 text-sm mt-1">Invoice has been generated successfully</p>
              </div>
              <div className="bg-slate-900 text-white rounded-xl px-6 py-4 inline-block mx-auto">
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Invoice Code</p>
                <p className="wb-mono text-2xl font-bold text-emerald-400">{form.invoiceCode}</p>
              </div>
              <div className="text-xs text-slate-400 wb-mono">{form.firstWeightTime}</div>
              <div className="grid grid-cols-2 gap-3 text-left text-sm mt-2">
                {[
                  ["Vendor", form.vendorName],
                  ["Vehicle No.", form.vehicleNumber],
                  ["Vehicle Type", form.vehicleType],
                  ["First Weight", `${Number(form.firstWeight).toLocaleString()} kg`],
                  ["Product", form.productName || "—"],
                  ["Driver", form.firstWeightWithDriver ? "With Driver" : "Without Driver"],
                ].map(([k, v]) => (
                  <div key={k} className="bg-slate-50 rounded-xl px-4 py-3">
                    <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">{k}</p>
                    <p className="text-slate-700 font-medium mt-0.5 wb-mono">{v}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={resetForm}
                className="w-full py-3 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition text-sm"
              >
                + New Entry
              </button>
            </div>
          )}

          {/* ════════════════════════════
              SECOND WEIGHT
          ════════════════════════════ */}
          {view === "second" && (
            <div className="space-y-5 wb-card">

              {/* Lookup bar */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-7 py-5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Load Invoice</p>
                <div className="flex gap-3 items-center">
                  <span className="wb-mono text-sm font-bold text-slate-500 bg-slate-100 px-3 py-2.5 rounded-xl">WB-</span>
                  <input
                    type="text"
                    value={form.invoiceCode.replace("WB-", "")}
                    onChange={(e) => setForm({ ...form, invoiceCode: `WB-${e.target.value}` })}
                    placeholder="001"
                    className={`${inp} wb-mono w-28`}
                  />
                  <button
                    onClick={loadInvoice}
                    className="px-5 py-2.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-700 transition text-sm"
                  >
                    Load
                  </button>
                </div>
              </div>

              {/* Loaded entry details */}
              {form.productName && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="px-7 py-5 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm">2</div>
                    <div>
                      <h2 className="wb-title text-lg font-bold text-slate-800">Second Weight Entry</h2>
                      <p className="text-xs text-slate-400 wb-mono">{form.invoiceCode}</p>
                    </div>
                    {form.completed && (
                      <span className="ml-auto text-xs bg-emerald-100 text-emerald-600 font-bold px-2.5 py-1 rounded-full">
                        Completed
                      </span>
                    )}
                  </div>

                  <div className="px-7 py-5 space-y-5">
                    {/* Read-only summary */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        ["Vendor", form.vendorName],
                        ["Vehicle No.", form.vehicleNumber || "—"],
                        ["Product", form.productName],
                        ["Vehicle Type", form.vehicleType],
                        ["Rate", `Rs ${Number(form.rate || 0).toLocaleString()}`],
                        ["First Weight", `${Number(form.firstWeight || 0).toLocaleString()} kg`],
                      ].map(([k, v]) => (
                        <div key={k} className="bg-slate-50 rounded-xl px-4 py-3">
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">{k}</p>
                          <p className="text-slate-700 text-sm font-medium mt-0.5 wb-mono">{v}</p>
                        </div>
                      ))}
                    </div>

                    {/* Second weight input */}
                    {!form.completed && (
                      <form onSubmit={handleSecondSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4 items-end">
                          <Field label="Second Weight (kg)">
                            <input
                              type="number" name="secondWeight" placeholder="e.g. 12500"
                              value={form.secondWeight} onChange={handleChange}
                              className={`${inp} wb-mono`} required
                            />
                          </Field>
                          <div className="pb-1">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Driver</p>
                            <div className="toggle-driver">
                              <input
                                type="checkbox" id="sw-driver"
                                name="secondWeightWithDriver"
                                checked={form.secondWeightWithDriver}
                                onChange={handleChange}
                              />
                              <label htmlFor="sw-driver">
                                <span className="toggle-track">
                                  <span className="toggle-thumb" />
                                </span>
                                <span className={`text-sm font-medium ${form.secondWeightWithDriver ? "text-blue-600" : "text-slate-400"}`}>
                                  {form.secondWeightWithDriver ? "With Driver" : "Without Driver"}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-xl transition text-sm"
                        >
                          Save Second Weight →
                        </button>
                      </form>
                    )}

                    {/* Net weight result */}
                    {form.netWeight && (
                      <div className="bg-slate-900 text-white rounded-xl px-6 py-5 space-y-3">
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Net Weight Result</p>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            ["Kilograms", `${Number(form.netWeight).toLocaleString()} kg`],
                            ["Maund", `${form.netWeightMaund} Mn`],
                            ["Ton", `${form.netWeightTon} T`],
                          ].map(([k, v]) => (
                            <div key={k} className="text-center">
                              <p className="text-slate-500 text-[10px] uppercase tracking-widest">{k}</p>
                              <p className="wb-mono text-emerald-400 font-bold text-lg mt-1">{v}</p>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 text-center wb-mono">{form.secondWeightTime}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}