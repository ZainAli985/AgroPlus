import React, { useState, useEffect } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";
import Notification from "../Notification.jsx";

// ── Module-level: never recreated on render ───────────────────────────────────
function Field({ label, hint, children }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
          {label}
        </label>
        {hint && <span className="text-[10px] text-zinc-400 font-medium">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function InfoTile({ label, value }) {
  return (
    <div className="bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3">
      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">{label}</p>
      <p className="text-sm font-semibold text-zinc-700 wb-mono truncate">{value}</p>
    </div>
  );
}

const inp =
  "w-full border border-zinc-200 bg-white rounded-xl px-4 py-3 text-sm text-zinc-800 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition placeholder-zinc-300 font-medium";

const VEHICLE_RATES = {
  "22 Wheeler": 700,
  "10 Wheeler": 500,
  "06 Wheeler": 350,
  "Phukar Tralla": 350,
  "Tractor Tralla": 250,
  Mazda: 150,
  Shehzor: 100,
  "Rickshaw/Ggari": 100,
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function WeightBridge() {

  const [view, setView] = useState("new");
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "info" });
  const [submitted, setSubmitted] = useState(false);

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
    completed: false,
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await authFetch(`${API_BASE_URL}/products`);
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
    setForm((prev) => ({ ...prev, vehicleType, rate: VEHICLE_RATES[vehicleType] || 0 }));
  };

  const handleVehicleNumberChange = (e) => {
    let raw = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, "");
    // Auto-insert dash between trailing letters and first digit
    // Pattern: letters then digits → insert dash automatically
    raw = raw.replace(/^([A-Z]+)([0-9])/, "$1-$2");
    // Prevent double dashes
    raw = raw.replace(/-{2,}/g, "-");
    setForm((prev) => ({ ...prev, vehicleNumber: raw }));
  };

  const handleFirstSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authFetch(`${API_BASE_URL}/weight-bridge/first`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          firstWeightTime: new Date(data.entry.createdAt).toLocaleString("en-PK"),
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
      netWeightMaund: "", netWeightTon: "", completed: false,
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
          firstWeightTime: new Date(data.entry.createdAt).toLocaleString("en-PK"),
          secondWeightTime: data.entry.secondWeightTime
            ? new Date(data.entry.secondWeightTime).toLocaleString("en-PK")
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
      const res = await authFetch(`${API_BASE_URL}/weight-bridge/second`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          secondWeightTime: new Date().toLocaleString("en-PK"),
          netWeight: data.entry.netWeight,
          netWeightMaund: data.entry.netWeightMaund,
          netWeightTon: data.entry.netWeightTon,
          completed: true,
        }));
        setNotification({ message: data.message, type: "success" });
      } else {
        setNotification({ message: data.message, type: "error" });
      }
    } catch {
      setNotification({ message: "Server error", type: "error" });
    }
  };

  const nowStr = new Date().toLocaleDateString("en-PK", {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });

  const hasNetWeight = form.netWeight !== "" && form.netWeight !== undefined && form.netWeight !== null;

  return (
    <SidebarLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Barlow:wght@300;400;500;600&family=Roboto+Mono:wght@400;500;600&display=swap');
        .wb-root  { font-family: 'Barlow', sans-serif; }
        .wb-title { font-family: 'Barlow Condensed', sans-serif; }
        .wb-mono  { font-family: 'Roboto Mono', monospace; }
        .wb-in    { animation: wbSlide .22s cubic-bezier(.4,0,.2,1) both; }
        @keyframes wbSlide {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .wb-pop { animation: wbPop .35s cubic-bezier(.34,1.56,.64,1) both; }
        @keyframes wbPop {
          from { opacity:0; transform:scale(.9); }
          to   { opacity:1; transform:scale(1); }
        }
        .wb-toggle {
          display:inline-flex; align-items:center; gap:10px;
          cursor:pointer; user-select:none; background:none; border:none; padding:0;
        }
        .wbt-track {
          width:46px; height:26px; border-radius:999px;
          background:#e4e4e7; transition:background .2s; position:relative; flex-shrink:0;
        }
        .wbt-thumb {
          position:absolute; top:3px; left:3px;
          width:20px; height:20px; border-radius:50%;
          background:white; box-shadow:0 1px 4px rgba(0,0,0,.2);
          transition:left .2s;
        }
        .wb-toggle-on .wbt-track { background:#f59e0b; }
        .wb-toggle-on .wbt-thumb  { left:23px; }
        .plate-input { text-transform:uppercase; letter-spacing:.08em; }
      `}</style>

      <div className="wb-root min-h-screen bg-zinc-100 pb-20">
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "info" })}
        />

        {/* ── Masthead ── */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="bg-zinc-900 rounded-2xl shadow-2xl" style={{overflow:"visible"}}>
            <div className="bg-amber-400 px-8 py-1.5 flex items-center justify-between rounded-t-2xl">
              <span className="wb-title text-zinc-900 text-xs font-bold uppercase tracking-[.18em]">
                Operations Module
              </span>
              <span className="wb-mono text-zinc-900 text-xs">{nowStr}</span>
            </div>
            <div className="px-8 pt-7 pb-7 flex items-center justify-between">
              <div>
                <h1 className="wb-title text-5xl font-extrabold text-white tracking-tight" style={{lineHeight:"1.15"}}>
                  WEIGHT BRIDGE
                </h1>
                <p className="text-zinc-400 text-sm mt-1.5 font-light tracking-wide">
                  Vehicle weight recording system
                </p>
              </div>
              <div className="flex gap-1.5 bg-zinc-800 p-1.5 rounded-2xl">
                {[
                  { id: "new",    label: "New Entry",   num: "①" },
                  { id: "second", label: "2nd Weight",  num: "②" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setView(tab.id); resetForm(); }}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all wb-title uppercase tracking-wider ${
                      view === tab.id
                        ? "bg-amber-400 text-zinc-900 shadow"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {tab.num} {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">

          {/* ════════════ FIRST WEIGHT FORM ════════════ */}
          {view === "new" && !submitted && (
            <div className="wb-in">
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">

                {/* Section: Vehicle & Vendor */}
                <div className="px-6 pt-6 pb-5 border-b border-zinc-100">
                  <p className="wb-title text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] text-zinc-500 font-bold">A</span>
                    Vehicle & Vendor
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Vendor Name">
                      <input
                        type="text" name="vendorName" placeholder="e.g. Ali Traders"
                        value={form.vendorName} onChange={handleChange}
                        className={inp} required
                      />
                    </Field>
                    <Field label="Vehicle Number" hint="Plate No.">
                      <input
                        type="text" name="vehicleNumber" placeholder="LEA-1234"
                        value={form.vehicleNumber} onChange={handleVehicleNumberChange}
                        className={`${inp} wb-mono plate-input`} required
                      />
                    </Field>
                  </div>
                </div>

                {/* Section: Cargo & Vehicle Type */}
                <div className="px-6 py-5 border-b border-zinc-100">
                  <p className="wb-title text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] text-zinc-500 font-bold">B</span>
                    Cargo & Transport
                  </p>
                  <div className="space-y-4">
                    <Field label="Product">
                      <select
                        name="productId" value={form.productId}
                        onChange={(e) => {
                          const sel = products.find((p) => p._id === e.target.value);
                          setForm((prev) => ({ ...prev, productId: e.target.value, productName: sel?.productName || "" }));
                        }}
                        className={inp} required
                      >
                        <option value="">Select Product</option>
                        {products.map((p) => <option key={p._id} value={p._id}>{p.productName}</option>)}
                      </select>
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Vehicle Type">
                        <select name="vehicleType" value={form.vehicleType} onChange={handleVehicleChange} className={inp} required>
                          <option value="">Select Type</option>
                          {Object.keys(VEHICLE_RATES).map((v) => <option key={v}>{v}</option>)}
                        </select>
                      </Field>
                      <Field label="Rate" hint="Auto-filled">
                        <div className={`${inp} bg-zinc-50 border-zinc-100 cursor-default flex items-center gap-2`}>
                          <span className="text-zinc-400 text-xs font-semibold">Rs</span>
                          <span className="wb-mono font-semibold text-zinc-600 text-base">
                            {form.rate ? Number(form.rate).toLocaleString() : "—"}
                          </span>
                        </div>
                      </Field>
                    </div>
                  </div>
                </div>

                {/* Section: Weight — most important, most visual emphasis */}
                <div className="px-6 py-5">
                  <p className="wb-title text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-[10px] text-amber-600 font-bold">C</span>
                    Weight Reading
                  </p>
                  <div className="grid grid-cols-2 gap-4 items-end">
                    <Field label="First Weight" hint="kg">
                      <div className="relative">
                        <input
                          type="number" name="firstWeight" placeholder="0"
                          value={form.firstWeight} onChange={handleChange}
                          className={`${inp} wb-mono text-2xl font-bold pr-14 py-4`} required
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 pointer-events-none">
                          KG
                        </span>
                      </div>
                    </Field>
                    <div>
                      <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Driver</p>
                      <button
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, firstWeightWithDriver: !p.firstWeightWithDriver }))}
                        className={`wb-toggle ${form.firstWeightWithDriver ? "wb-toggle-on" : ""}`}
                      >
                        <span className="wbt-track"><span className="wbt-thumb" /></span>
                        <span className={`text-sm font-semibold ${form.firstWeightWithDriver ? "text-amber-500" : "text-zinc-400"}`}>
                          {form.firstWeightWithDriver ? "With Driver" : "Without Driver"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <button
                    onClick={handleFirstSubmit}
                    className="w-full py-4 bg-zinc-900 hover:bg-zinc-700 active:scale-[.99] text-white font-bold rounded-xl transition wb-title text-lg uppercase tracking-widest"
                  >
                    Save First Weight →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ════════════ SUCCESS CARD ════════════ */}
          {view === "new" && submitted && (
            <div className="wb-in space-y-4">
              {/* Invoice hero */}
              <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl wb-pop">
                <div className="px-8 pt-8 pb-6 text-center border-b border-zinc-800">
                  <p className="text-zinc-500 text-[10px] uppercase tracking-[.2em] mb-3">Invoice Generated</p>
                  <p className="wb-mono text-6xl font-bold text-amber-400 tracking-tight">{form.invoiceCode}</p>
                  <p className="text-zinc-500 text-xs mt-3 wb-mono">{form.firstWeightTime}</p>
                </div>
                {/* Weight + driver inline */}
                <div className="grid grid-cols-2 divide-x divide-zinc-800">
                  <div className="px-8 py-5 text-center">
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">First Weight</p>
                    <p className="wb-mono text-4xl font-bold text-white">
                      {Number(form.firstWeight).toLocaleString()}
                    </p>
                    <p className="text-zinc-500 text-xs mt-1">kilograms</p>
                  </div>
                  <div className="px-8 py-5 text-center">
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Driver</p>
                    <p className={`wb-title text-2xl font-bold ${form.firstWeightWithDriver ? "text-amber-400" : "text-zinc-500"}`}>
                      {form.firstWeightWithDriver ? "INCLUDED" : "EXCLUDED"}
                    </p>
                    <p className="text-zinc-500 text-xs mt-1">in weight</p>
                  </div>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Vendor", form.vendorName],
                  ["Vehicle No.", form.vehicleNumber],
                  ["Vehicle Type", form.vehicleType],
                  ["Product", form.productName || "—"],
                  ["Rate", `Rs ${Number(form.rate || 0).toLocaleString()}`],
                  ["Recorded", form.firstWeightTime],
                ].map(([k, v]) => <InfoTile key={k} label={k} value={v} />)}
              </div>

              <button
                onClick={resetForm}
                className="w-full py-4 border-2 border-zinc-200 text-zinc-600 font-bold rounded-xl hover:bg-zinc-50 active:scale-[.99] transition wb-title text-lg uppercase tracking-widest"
              >
                + New Entry
              </button>
            </div>
          )}

          {/* ════════════ SECOND WEIGHT ════════════ */}
          {view === "second" && (
            <div className="wb-in space-y-4">

              {/* Invoice lookup */}
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 px-6 py-5">
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Load Invoice</p>
                <div className="flex gap-3">
                  <div className="flex flex-1 items-center border border-zinc-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-amber-400 focus-within:border-amber-400 transition">
                    <span className="wb-mono text-sm font-bold text-zinc-400 bg-zinc-50 px-4 py-3.5 border-r border-zinc-200 whitespace-nowrap select-none">
                      WB-
                    </span>
                    <input
                      type="text"
                      value={form.invoiceCode.replace("WB-", "")}
                      onChange={(e) => setForm({ ...form, invoiceCode: `WB-${e.target.value}` })}
                      placeholder="001"
                      className="flex-1 px-4 py-3.5 text-base wb-mono outline-none font-bold text-zinc-800 placeholder-zinc-300"
                      onKeyDown={(e) => e.key === "Enter" && loadInvoice()}
                    />
                  </div>
                  <button
                    onClick={loadInvoice}
                    className="px-7 py-3.5 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-700 active:scale-[.98] transition wb-title uppercase tracking-wider"
                  >
                    Load
                  </button>
                </div>
              </div>

              {form.productName && (
                <div className="space-y-4">
                  {/* Invoice header — dark, prominent */}
                  <div className="bg-zinc-900 rounded-2xl px-6 py-5 grid grid-cols-3 gap-4 items-center">
                    <div>
                      <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Invoice</p>
                      <p className="wb-mono text-xl font-bold text-amber-400">{form.invoiceCode}</p>
                    </div>
                    <div className="text-center border-x border-zinc-800 px-4">
                      <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">First Weight</p>
                      <p className="wb-mono text-3xl font-bold text-white">
                        {Number(form.firstWeight || 0).toLocaleString()}
                      </p>
                      <p className="text-zinc-600 text-xs">kg</p>
                    </div>
                    <div className="text-right">
                      {form.completed ? (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full wb-title uppercase tracking-wider">
                          ✓ Done
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-amber-400 text-zinc-900 text-xs font-bold px-3 py-1.5 rounded-full wb-title uppercase tracking-wider">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      ["Vendor", form.vendorName],
                      ["Vehicle No.", form.vehicleNumber || "—"],
                      ["Product", form.productName],
                      ["Vehicle Type", form.vehicleType],
                      ["Rate", `Rs ${Number(form.rate || 0).toLocaleString()}`],
                      ["1st Time", form.firstWeightTime],
                    ].map(([k, v]) => <InfoTile key={k} label={k} value={v} />)}
                  </div>

                  {/* Second weight input */}
                  {!form.completed && (
                    <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
                      <div className="px-6 pt-6 pb-5">
                        <p className="wb-title text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-[10px] text-amber-600 font-bold">2</span>
                          Enter Second Weight
                        </p>
                        <div className="grid grid-cols-2 gap-4 items-end">
                          <Field label="Second Weight" hint="kg">
                            <div className="relative">
                              <input
                                type="number" name="secondWeight" placeholder="0"
                                value={form.secondWeight} onChange={handleChange}
                                className={`${inp} wb-mono text-2xl font-bold pr-14 py-4`} required
                              />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 pointer-events-none">KG</span>
                            </div>
                          </Field>
                          <div>
                            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Driver</p>
                            <button
                              type="button"
                              onClick={() => setForm((p) => ({ ...p, secondWeightWithDriver: !p.secondWeightWithDriver }))}
                              className={`wb-toggle ${form.secondWeightWithDriver ? "wb-toggle-on" : ""}`}
                            >
                              <span className="wbt-track"><span className="wbt-thumb" /></span>
                              <span className={`text-sm font-semibold ${form.secondWeightWithDriver ? "text-amber-500" : "text-zinc-400"}`}>
                                {form.secondWeightWithDriver ? "With Driver" : "Without Driver"}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 pb-6">
                        <button
                          onClick={handleSecondSubmit}
                          className="w-full py-4 bg-zinc-900 hover:bg-zinc-700 active:scale-[.99] text-white font-bold rounded-xl transition wb-title text-lg uppercase tracking-widest"
                        >
                          Save Second Weight →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── Net Weight Result — visual climax of the entire workflow ── */}
                  {hasNetWeight && (
                    <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl wb-pop">
                      {/* Green header bar */}
                      <div className="bg-emerald-500 px-6 py-2.5 flex items-center justify-between">
                        <span className="wb-title text-white text-xs font-bold uppercase tracking-[.15em]">
                          ✓ Net Weight Result
                        </span>
                        <span className="wb-mono text-emerald-100 text-xs">{form.secondWeightTime}</span>
                      </div>

                      {/* The big number */}
                      <div className="px-8 py-8 text-center border-b border-zinc-800">
                        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Net Weight</p>
                        <p className="wb-mono font-bold text-white leading-none" style={{ fontSize: "4.5rem" }}>
                          {Number(form.netWeight).toLocaleString()}
                        </p>
                        <p className="text-zinc-400 text-lg mt-2 wb-mono">kilograms</p>
                      </div>

                      {/* Maund + Ton */}
                      <div className="grid grid-cols-2 divide-x divide-zinc-800">
                        <div className="px-8 py-5 text-center">
                          <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">Maund</p>
                          <p className="wb-mono text-4xl font-bold text-amber-400">{form.netWeightMaund}</p>
                          <p className="text-zinc-600 text-xs mt-1 uppercase tracking-widest">Mn</p>
                        </div>
                        <div className="px-8 py-5 text-center">
                          <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">Metric Ton</p>
                          <p className="wb-mono text-4xl font-bold text-amber-400">{form.netWeightTon}</p>
                          <p className="text-zinc-600 text-xs mt-1 uppercase tracking-widest">T</p>
                        </div>
                      </div>

                      {/* Calculation breakdown */}
                      <div className="px-6 py-4 bg-zinc-950 flex items-center justify-center gap-4 text-sm wb-mono">
                        <div className="text-center">
                          <p className="text-zinc-600 text-[10px] uppercase mb-0.5">2nd Weight</p>
                          <p className="text-zinc-300 font-semibold">{Number(form.secondWeight).toLocaleString()} kg</p>
                        </div>
                        <span className="text-zinc-600 text-xl">−</span>
                        <div className="text-center">
                          <p className="text-zinc-600 text-[10px] uppercase mb-0.5">1st Weight</p>
                          <p className="text-zinc-300 font-semibold">{Number(form.firstWeight).toLocaleString()} kg</p>
                        </div>
                        <span className="text-zinc-600 text-xl">=</span>
                        <div className="text-center">
                          <p className="text-zinc-600 text-[10px] uppercase mb-0.5">Net</p>
                          <p className="text-emerald-400 font-bold text-base">{Number(form.netWeight).toLocaleString()} kg</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}