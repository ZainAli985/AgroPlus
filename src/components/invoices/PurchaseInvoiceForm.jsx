import React, { useState, useEffect, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');`;
const NUM_CSS = `
  .pi-no-spin::-webkit-inner-spin-button,
  .pi-no-spin::-webkit-outer-spin-button { -webkit-appearance:none; margin:0; }
  .pi-no-spin { -moz-appearance:textfield; }
`;

/* ─── Vehicle number (same rule as sales invoice) ────────── */
function formatVehicleNo(raw) {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (clean.length > 0 && /^[0-9]/.test(clean)) return "";
  const lettersMatch = clean.match(/^[A-Z]+/);
  const letters = lettersMatch ? lettersMatch[0] : "";
  const nums    = clean.slice(letters.length);
  if (!letters) return "";
  return nums ? `${letters}-${nums}` : letters;
}

/* ─── Prevent scroll/arrow changing number inputs ──────── */
function noSpin(e)  { e.target.blur(); }
function noArrow(e) { if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault(); }

/* ─── Searchable dropdown ───────────────────────────────── */
function SearchDrop({ options, value, onChange, placeholder, labelKey = "label", error, disabled }) {
  const [open, setOpen] = useState(false);
  const [q,    setQ]    = useState("");
  const ref = useRef(null); const inp = useRef(null);
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => { if (open) setTimeout(() => inp.current?.focus(), 0); }, [open]);
  const filtered = options.filter(o => (o[labelKey] || "").toLowerCase().includes(q.toLowerCase()));
  const sel      = options.find(o => o._id === value || o.value === value);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button type="button" disabled={disabled} onClick={() => !disabled && setOpen(o => !o)}
        style={{
          width: "100%", padding: "8px 11px",
          border: `1.5px solid ${error ? "#fca5a5" : open ? "#3b82f6" : "#e2e8f0"}`,
          borderRadius: 9, background: disabled ? "#f8fafc" : error ? "#fff5f5" : "#fff",
          cursor: disabled ? "default" : "pointer",
          fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13.5,
          color: sel ? "#111827" : "#9ca3af",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6,
          boxShadow: open ? "0 0 0 3px rgba(59,130,246,.12)" : error ? "0 0 0 3px rgba(239,68,68,.1)" : "none",
          transition: ".12s",
        }}>
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis",
          whiteSpace: "nowrap", fontStyle: sel ? "normal" : "italic", textAlign: "left" }}>
          {sel ? sel[labelKey] : <span style={{ color: error ? "#f87171" : "#9ca3af" }}>{placeholder}</span>}
        </span>
        <svg width={11} height={11} fill="none" viewBox="0 0 24 24"
          stroke={error ? "#fca5a5" : "#94a3b8"} strokeWidth={2.5}
          style={{ flexShrink: 0, transition: ".15s", transform: open ? "rotate(180deg)" : "none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <div style={{
          position: "absolute", left: 0, top: "calc(100% + 4px)",
          width: "max(100%,260px)", zIndex: 300, background: "#fff",
          border: "1px solid #e2e8f0", borderRadius: 12,
          boxShadow: "0 12px 36px rgba(0,0,0,.13)", overflow: "hidden",
        }}>
          <div style={{ padding: 8, borderBottom: "1px solid #f1f5f9" }}>
            <input ref={inp} value={q} onChange={e => setQ(e.target.value)} placeholder="Search…"
              style={{ width: "100%", padding: "7px 10px", border: "1px solid #e2e8f0",
                borderRadius: 7, fontSize: 13, outline: "none" }}/>
          </div>
          <ul style={{ maxHeight: 210, overflowY: "auto", margin: 0, padding: 0, listStyle: "none" }}>
            {filtered.length === 0
              ? <li style={{ padding: "10px 14px", fontSize: 13, color: "#9ca3af", textAlign: "center" }}>No results</li>
              : filtered.map(o => (
                <li key={o._id || o.value}
                  onClick={() => { onChange(o); setOpen(false); setQ(""); }}
                  style={{
                    padding: "9px 14px", fontSize: 13.5, cursor: "pointer",
                    background: (o._id || o.value) === value ? "#eff6ff" : "transparent",
                    fontWeight: (o._id || o.value) === value ? 600 : 400, color: "#1e293b",
                    borderBottom: "1px solid #f8fafc", transition: "background .1s",
                  }}
                  onMouseEnter={e => { if ((o._id || o.value) !== value) e.currentTarget.style.background = "#f8fafc"; }}
                  onMouseLeave={e => { if ((o._id || o.value) !== value) e.currentTarget.style.background = "transparent"; }}>
                  {o[labelKey]}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── Field wrapper ─────────────────────────────────────── */
function Fld({ label, required, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{
        fontSize: 10, fontWeight: 700, textTransform: "uppercase",
        letterSpacing: ".08em", color: error ? "#ef4444" : "#94a3b8",
        display: "flex", alignItems: "center", gap: 4,
      }}>
        {label}
        {required && <span style={{ color: "#ef4444", fontSize: 12, lineHeight: 1 }}>*</span>}
        {error && (
          <span style={{
            color: "#ef4444", fontSize: 9.5, fontWeight: 700,
            background: "#fef2f2", padding: "1px 6px", borderRadius: 4,
            border: "1px solid #fecaca", letterSpacing: ".04em",
          }}>Required</span>
        )}
      </label>
      {children}
    </div>
  );
}

/* ─── Input helpers ─────────────────────────────────────── */
const sI = (error) => ({
  className: "pi-no-spin",
  style: {
    width: "100%", padding: "8px 11px",
    border: `1.5px solid ${error ? "#fca5a5" : "#e2e8f0"}`,
    borderRadius: 9, fontSize: 13.5,
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    color: "#111827", background: error ? "#fff5f5" : "#fff",
    outline: "none", transition: "border-color .12s, box-shadow .12s",
    boxShadow: error ? "0 0 0 3px rgba(239,68,68,.1)" : "none",
  },
  onFocus: e => { if (!error) e.target.style.borderColor = "#3b82f6"; },
  onBlur:  e => { if (!error) e.target.style.borderColor = "#e2e8f0"; },
  onWheel: noSpin,
  onKeyDown: noArrow,
});

const sRo = (highlight) => ({
  style: {
    width: "100%", padding: "8px 11px",
    border: `1.5px solid ${highlight ? "#86efac" : "#e2e8f0"}`,
    borderRadius: 9, fontSize: 13.5,
    fontFamily: "'JetBrains Mono',monospace",
    color: highlight ? "#15803d" : "#475569",
    background: highlight ? "#f0fdf4" : "#f8fafc",
    outline: "none", fontWeight: highlight ? 700 : 500,
  },
  readOnly: true,
});

/* ─── Panel ─────────────────────────────────────────────── */
function Panel({ title, dot, children }) {
  return (
    <div style={{ background: "#fff", border: "1.5px solid #e8eaf0", borderRadius: 12, overflow: "hidden" }}>
      <div style={{
        padding: "9px 14px", background: "#f8fafc",
        borderBottom: "1.5px solid #e8eaf0",
        display: "flex", alignItems: "center", gap: 7,
      }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: dot, flexShrink: 0 }}/>
        <span style={{
          fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: ".1em", color: "#64748b",
        }}>{title}</span>
      </div>
      <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: 11 }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Print HTML ────────────────────────────────────────── */
function buildPrintHTML(inv, sr) {
  const rateRows = Array.isArray(inv.rateRows) && inv.rateRows.length
    ? inv.rateRows
    : [{ maund: inv.netWeightMaund, rate: inv.rate40kg, amount: inv.totalAmount }];

  const rateRowsHTML = rateRows
    .filter(r => r.maund || r.rate)
    .map(r => `<tr><td>${Number(r.maund || 0).toFixed(4)} Maund × Rs ${Number(r.rate || 0).toLocaleString("en-PK")}</td>
      <td style="text-align:right;font-weight:700">Rs ${Number(r.amount || 0).toLocaleString("en-PK", { minimumFractionDigits: 2 })}</td></tr>`)
    .join("");

  return `<!DOCTYPE html><html><head><title>Purchase Invoice #${String(sr).padStart(4, "0")}</title>
<style>
@page{size:A4;margin:12mm}
body{font-family:"Segoe UI",Arial,sans-serif;background:#fff;color:#111}
.wrap{max-width:660px;margin:auto}
.head{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #1e3a8a;padding-bottom:10px;margin-bottom:16px}
.logo{display:flex;align-items:center;gap:10px}.logo img{height:55px}
.logo h1{font-size:20px;margin:0;color:#1e3a8a}.logo p{font-size:10px;margin:2px 0}
.meta{text-align:right}.meta h2{margin:0;font-size:18px;color:#1e40af}
.meta table{font-size:11px;margin-top:6px}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
.box{border:1px solid #e5e7eb;padding:8px;border-radius:6px}
.box h4{margin:0 0 6px;font-size:12px;color:#1e3a8a;border-bottom:1px solid #e5e7eb;padding-bottom:3px}
.box p{font-size:11px;margin:3px 0}
table{width:100%;border-collapse:collapse;font-size:11px;margin-top:10px}
th{background:#1e3a8a;color:#fff;padding:5px 6px;text-align:left}
td{border:1px solid #d1d5db;padding:5px 6px}
tr.sub td{font-weight:700;background:#f8fafc}
tr.grand td{font-weight:800;font-size:13px;color:#1e3a8a}
.sig{margin-top:36px;display:flex;justify-content:space-between;font-size:11px}
.sig div{width:45%;text-align:center}
.sig span{display:block;margin-top:36px;border-top:1px solid #000;padding-top:4px}
</style></head><body>
<div class="wrap">
<div class="head">
  <div class="logo"><img src="/logo.png" onerror="this.style.display='none'"/>
    <div><h1>Al Rehman Rice Mills</h1><p>Deepalpur Road, Babarkhai, Arzanipur</p>
    <p>Chunian, Kasur – Pakistan</p><p><b>0301-4349041</b> | <b>0300-8402130</b></p></div>
  </div>
  <div class="meta"><h2>PURCHASE INVOICE</h2>
    <table>
      <tr><td><b>Invoice #</b></td><td>${String(sr).padStart(4, "0")}</td></tr>
      <tr><td><b>Date</b></td><td>${inv.date || ""}</td></tr>
      <tr><td><b>Builty #</b></td><td>${inv.builtyNumber || "—"}</td></tr>
    </table>
  </div>
</div>
<div class="info-grid">
  <div class="box"><h4>SUPPLIER</h4>
    <p><b>Name:</b> ${inv.vendorName || "—"}</p>
    <p><b>Vehicle:</b> ${inv.vehicleNumber || "—"}</p>
    <p><b>Bag Status:</b> ${inv.bagStatus === "return" ? "Bag Return" : "Bag Added"}</p>
  </div>
  <div class="box"><h4>PRODUCT</h4>
    <p><b>Product:</b> ${inv.productName || "—"}</p>
    <p><b>Bag Type:</b> ${inv.bagTypeName || "—"} (${Number(inv.bagWeightPerBag || 0)} kg/bag)</p>
    <p><b>Moisture:</b> ${inv.moisturePercent || 0}% (Base: ${inv.baseMoisture || 0}%)</p>
  </div>
</div>
<table>
  <tr><th>Description</th><th style="text-align:right">Value</th></tr>
  <tr><td>Quantity (Bags)</td><td style="text-align:right">${Number(inv.quantity || 0)}</td></tr>
  <tr><td>Gross Weight (kg)</td><td style="text-align:right">${Number(inv.grossWeight || 0).toFixed(2)}</td></tr>
  <tr><td>Total Bag Weight (${inv.bagTypeName || ""} × ${Number(inv.quantity || 0)} bags)</td>
    <td style="text-align:right">− ${Number(inv.totalBagWeight || 0).toFixed(2)}</td></tr>
  <tr><td>Moisture Adjustment (rounded)</td>
    <td style="text-align:right">− ${Number(inv.moistureAdjustment || 0).toFixed(0)}</td></tr>
  <tr class="sub"><td>Net Weight (kg)</td>
    <td style="text-align:right">${Number(inv.netWeightKg || inv.netWeight || 0).toFixed(2)}</td></tr>
  <tr class="sub"><td>Net Weight (Maund)</td>
    <td style="text-align:right">${Number(inv.netWeightMaund || 0).toFixed(4)}</td></tr>
</table>
<table style="margin-top:12px">
  <tr><th>Rate Breakdown</th><th style="text-align:right">Amount</th></tr>
  ${rateRowsHTML}
  <tr class="sub"><td>Total Amount</td>
    <td style="text-align:right">Rs ${Number(inv.totalAmount || 0).toLocaleString("en-PK", { minimumFractionDigits: 2 })}</td></tr>
  ${Number(inv.rentAdjustment || 0) > 0
    ? `<tr><td>Rent Adjustment</td><td style="text-align:right">− Rs ${Number(inv.rentAdjustment).toLocaleString("en-PK", { minimumFractionDigits: 2 })}</td></tr>`
    : ""}
  <tr class="grand"><td>NET PAYABLE</td>
    <td style="text-align:right">Rs ${Number(inv.finalAmount || inv.totalAmount || 0).toLocaleString("en-PK", { minimumFractionDigits: 2 })}</td></tr>
</table>
<div class="sig">
  <div><span>Supplier Signature</span></div>
  <div><span>Authorised Signatory</span></div>
</div>
<p style="text-align:center;margin-top:28px;font-size:12px">Thank you for your business — Al Rehman Rice Mills</p>
</div><script>window.print()</script></body></html>`;
}

/* ─── Helpers ───────────────────────────────────────────── */
const g2  = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 };
const g3  = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 };
const DIV = <div style={{ height: 1, background: "#f1f5f9", margin: "2px 0" }}/>;
const nv  = v => isNaN(Number(v)) ? 0 : Number(v) || 0;
const fmtN = (v, d = 2) => nv(v).toLocaleString("en-PK", { minimumFractionDigits: d, maximumFractionDigits: d });

/* ══════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════ */
export default function AddPurchaseInvoice() {
  const today = new Date().toISOString().split("T")[0];

  const [products,     setProducts]     = useState([]);
  const [vendors,      setVendors]      = useState([]);
  const [bagTypes,     setBagTypes]     = useState([]);
  const [millSettings, setMillSettings] = useState({ baseMoisture: 0, weightCut: 0 });
  const [invoiceNo,    setInvoiceNo]    = useState("");

  const [date,         setDate]         = useState(today);
  const [vehicleNo,    setVehicleNo]    = useState("");
  const [builtyNo,     setBuiltyNo]     = useState("");
  const [vendorId,     setVendorId]     = useState("");
  const [vendorName,   setVendorName]   = useState("");
  const [productId,    setProductId]    = useState("");
  const [productName,  setProductName]  = useState("");
  const [bagStatus,    setBagStatus]    = useState("added");
  const [quantity,     setQuantity]     = useState("");
  const [grossWeight,  setGrossWeight]  = useState("");
  const [bagTypeId,    setBagTypeId]    = useState("");
  const [bagTypeName,  setBagTypeName]  = useState("");
  const [bagWtPerBag,  setBagWtPerBag]  = useState(0);
  const [moisturePct,  setMoisturePct]  = useState("");
  const [moistureOverride, setMoistureOverride] = useState(false);
  const [moistureAdj,  setMoistureAdj]  = useState("");
  const [rentAdj,      setRentAdj]      = useState("");

  /* Multi-rate: starts with single row; user can enable multi-rate */
  const [multiRate,    setMultiRate]    = useState(false);
  const [singleRate,   setSingleRate]   = useState("");
  const [rateRows,     setRateRows]     = useState([{ id: 1, maund: "", rate: "", amount: "" }]);

  const [errors,       setErrors]       = useState({});
  const [loading,      setLoading]      = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "info" });
  const [isMaximized,  setIsMaximized]  = useState(false);
  const [savedInvoice, setSavedInvoice] = useState(null);
  const formRef = useRef(null);

  /* ── Computed ── */
  const qty          = nv(quantity);
  const gross        = nv(grossWeight);
  const totalBagW    = qty * bagWtPerBag;
  const baseMoist    = nv(millSettings.baseMoisture);
  const weightCut    = nv(millSettings.weightCut);

  const rawMoistAdj  = moisturePct !== "" && nv(moisturePct) > baseMoist
    ? (nv(moisturePct) - baseMoist) * weightCut * qty
    : 0;
  // Rounding: x.5 and above → round up, x.4 and below → round down
  const autoMoistAdj = Math.round(rawMoistAdj);

  const effectiveMoistAdj = moistureOverride ? nv(moistureAdj) : autoMoistAdj;
  const bagDeduction  = bagStatus === "added" ? totalBagW : 0;
  const netWeightKg   = gross - bagDeduction - effectiveMoistAdj;
  const netWeightMaund = netWeightKg > 0 ? netWeightKg / 40 : 0;

  /* Rate computation */
  let totalAmount = 0;
  let computedRateRows = [];

  if (multiRate) {
    computedRateRows = rateRows.map(r => ({ ...r, amount: nv(r.maund) * nv(r.rate) }));
    totalAmount = computedRateRows.reduce((s, r) => s + r.amount, 0);
  } else {
    // Single rate: auto-fill maund with net weight maund
    const amt = netWeightMaund * nv(singleRate);
    totalAmount = amt;
    computedRateRows = [{ id: 1, maund: netWeightMaund, rate: nv(singleRate), amount: amt }];
  }

  const finalAmount = totalAmount - nv(rentAdj);

  /* Sync moisture adj display */
  useEffect(() => {
    if (!moistureOverride) setMoistureAdj(String(autoMoistAdj));
  }, [moisturePct, qty, millSettings, moistureOverride]);

  /* Fetch master data */
  useEffect(() => {
    Promise.all([
      authFetch(`${API_BASE_URL}/products`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/accounts`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/profile/bag-types`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/profile/mill-settings`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/purchase-invoice/next-sr`).then(r => r.json()),
    ]).then(([pd, ad, bd, sd, nd]) => {
      if (pd.success) setProducts(pd.products.map(p => ({
        ...p, label: p.displayName || [p.productName, p.type, p.subType].filter(Boolean).join(" - "),
      })));
      const arr = Array.isArray(ad) ? ad : (ad.accounts || []);
      setVendors(arr.filter(a => !a.isProtected).map(a => ({ ...a, label: a.accountName })));
      if (bd.bagTypes) setBagTypes(bd.bagTypes.filter(b => b.isActive).map(b => ({
        ...b, label: `${b.bagTypeName} (${b.bagWeight} kg)`,
      })));
      if (sd.settings) setMillSettings(sd.settings);
      if (nd.success && nd.nextSr) setInvoiceNo(String(nd.nextSr));
    });
  }, []);

  /* Auto-print on save */
  useEffect(() => {
    if (!savedInvoice) return;
    const w = window.open("", "_blank");
    if (w) { w.document.write(buildPrintHTML(savedInvoice, savedInvoice.sr)); w.document.close(); }
    setSavedInvoice(null);
  }, [savedInvoice]);

  /* Validation */
  const validate = () => {
    const e = {};
    if (!date)       e.date = true;
    if (!vehicleNo)  e.vehicleNo = true;
    if (!builtyNo)   e.builtyNo = true;
    if (!vendorId)   e.vendorId = true;
    if (!productId)  e.productId = true;
    if (!quantity)   e.quantity = true;
    if (!grossWeight) e.grossWeight = true;
    if (!multiRate && !singleRate) e.singleRate = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* Enter → next field */
  const handleKeyDown = e => {
    if (e.key !== "Enter") return;
    const els = formRef.current?.querySelectorAll('input:not([readonly]):not([type=submit]),select');
    if (!els?.length) return;
    const i = [...els].indexOf(e.target);
    if (i >= 0 && i < els.length - 1) { e.preventDefault(); els[i + 1].focus(); }
  };

  /* Rate row helpers */
  const addRateRow    = () => setRateRows(r => [...r, { id: Date.now(), maund: "", rate: "", amount: "" }]);
  const removeRateRow = id => setRateRows(r => r.filter(x => x.id !== id));
  const updateRateRow = (id, field, val) => setRateRows(r => r.map(x => x.id === id ? { ...x, [field]: val } : x));

  /* Submit */
  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) {
      setNotification({ message: "Please fill all required fields marked with *", type: "error" });
      return;
    }
    setLoading(true);
    try {
      const payload = {
        sr: Number(invoiceNo),
        date, vendorName, vendorAccountId: vendorId || undefined,
        vehicleNumber: vehicleNo, builtyNumber: builtyNo,
        productId, productName,
        bagStatus, quantity: qty,
        grossWeight: gross,
        bagTypeId: bagTypeId || undefined, bagTypeName, bagWeightPerBag: bagWtPerBag,
        totalBagWeight: totalBagW,
        moisturePercent: nv(moisturePct),
        baseMoisture: baseMoist, weightCut,
        moistureAdjustment: effectiveMoistAdj, moistureOverride,
        netWeightKg: netWeightKg > 0 ? netWeightKg : 0,
        netWeightMaund: netWeightMaund > 0 ? netWeightMaund : 0,
        rateRows: computedRateRows.filter(r => r.maund || r.rate),
        totalAmount, rentAdjustment: nv(rentAdj), finalAmount,
        // legacy compat
        netWeight: netWeightKg > 0 ? netWeightKg : 0,
        netWeight40KG: netWeightMaund > 0 ? netWeightMaund : 0,
        amount: totalAmount, bagWeight: totalBagW, finalWeight: gross,
        rate40kg: nv(singleRate) || (computedRateRows[0]?.rate || 0),
      };
      const res  = await authFetch(`${API_BASE_URL}/purchase-invoice/create`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setNotification({ message: `Invoice #${String(data.invoice.sr).padStart(4, "0")} saved! Printing…`, type: "success" });
        setSavedInvoice(data.invoice);
        setDate(today); setVehicleNo(""); setBuiltyNo(""); setVendorId(""); setVendorName("");
        setProductId(""); setProductName(""); setBagStatus("added"); setQuantity("");
        setGrossWeight(""); setBagTypeId(""); setBagTypeName(""); setBagWtPerBag(0);
        setMoisturePct(""); setMoistureOverride(false); setMoistureAdj(""); setRentAdj("");
        setSingleRate(""); setMultiRate(false);
        setRateRows([{ id: 1, maund: "", rate: "", amount: "" }]);
        setErrors({});
        authFetch(`${API_BASE_URL}/purchase-invoice/next-sr`).then(r => r.json())
          .then(d => { if (d.success && d.nextSr) setInvoiceNo(String(d.nextSr)); });
      } else {
        setNotification({ message: data.message || "Failed to save.", type: "error" });
      }
    } catch {
      setNotification({ message: "Server error.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const h = e => { if (e.key === "Escape" && isMaximized) setIsMaximized(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isMaximized]);

  /* ──────────────────────────── RENDER ────────────── */
  const content = (
    <>
      <style>{FONTS}{NUM_CSS}</style>
      <Notification message={notification.message} type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}/>

      <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#111827",
        maxWidth: 1100, margin: "0 auto", padding: 16 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 800,
              color: "#0f172a", lineHeight: 1, margin: 0 }}>Purchase Invoice</h1>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 600,
              background: "#0f172a", color: "#34d399", padding: "3px 9px", borderRadius: 4 }}>
              #{invoiceNo ? String(invoiceNo).padStart(4, "0") : "----"}
            </span>
          </div>
          <button type="button" onClick={() => setIsMaximized(p => !p)}
            style={{ fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 6,
              border: "1.5px solid #e2e8f0", background: "#fff", color: "#64748b",
              cursor: "pointer", textTransform: "uppercase", letterSpacing: ".05em" }}>
            {isMaximized ? "⊠ Exit" : "⊞ Full Screen"}
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr 0.95fr", gap: 12, alignItems: "start" }}>

            {/* ══ PANEL 1: Basic Information ══ */}
            <Panel title="Basic Information" dot="#3b82f6">

              <div style={g2}>
                <Fld label="Date" required error={errors.date}>
                  <input type="date" value={date} max={today}
                    onChange={e => { setDate(e.target.value); setErrors(p => ({ ...p, date: false })); }}
                    {...sI(errors.date)}/>
                </Fld>
                <Fld label="Invoice #">
                  <input value={invoiceNo ? "#" + String(invoiceNo).padStart(4, "0") : "—"} {...sRo(false)}/>
                </Fld>
              </div>

              <div style={g2}>
                <Fld label="Vehicle No." required error={errors.vehicleNo}>
                  <input value={vehicleNo}
                    onChange={e => {
                      setVehicleNo(formatVehicleNo(e.target.value));
                      setErrors(p => ({ ...p, vehicleNo: false }));
                    }}
                    placeholder="e.g. LEA-1234" {...sI(errors.vehicleNo)}/>
                </Fld>
                <Fld label="Builty No." required error={errors.builtyNo}>
                  <input value={builtyNo}
                    onChange={e => { setBuiltyNo(e.target.value); setErrors(p => ({ ...p, builtyNo: false })); }}
                    placeholder="e.g. B-001" {...sI(errors.builtyNo)}/>
                </Fld>
              </div>

              <Fld label="Vendor Name" required error={errors.vendorId}>
                <SearchDrop options={vendors} value={vendorId} labelKey="label"
                  placeholder="Select vendor from accounts…" error={errors.vendorId}
                  onChange={v => { setVendorId(v._id); setVendorName(v.accountName); setErrors(p => ({ ...p, vendorId: false })); }}/>
              </Fld>

              <Fld label="Product" required error={errors.productId}>
                <SearchDrop options={products} value={productId} labelKey="label"
                  placeholder="Select product…" error={errors.productId}
                  onChange={p => { setProductId(p._id); setProductName(p.displayName || [p.productName, p.type, p.subType].filter(Boolean).join(' - ')); setErrors(prev => ({ ...prev, productId: false })); }}/>
              </Fld>

              {/* Bag Status toggle — no helper text */}
              <Fld label="Bag Status">
                <div style={{ display: "flex", gap: 8 }}>
                  {["added", "return"].map(s => (
                    <button key={s} type="button" onClick={() => setBagStatus(s)}
                      style={{
                        flex: 1, padding: "9px 0", borderRadius: 9,
                        border: `1.5px solid ${bagStatus === s ? "#3b82f6" : "#e2e8f0"}`,
                        fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13,
                        fontWeight: 600, cursor: "pointer", transition: ".15s",
                        background: bagStatus === s ? "#eff6ff" : "#fff",
                        color: bagStatus === s ? "#1d4ed8" : "#6b7280",
                      }}>
                      {s === "added" ? "🛍 Bag Added" : "↩ Bag Return"}
                    </button>
                  ))}
                </div>
              </Fld>

              <Fld label="Product Quantity (Bags)" required error={errors.quantity}>
                <input type="number" min="0" value={quantity}
                  onChange={e => { setQuantity(e.target.value); setErrors(p => ({ ...p, quantity: false })); }}
                  placeholder="0" {...sI(errors.quantity)}/>
              </Fld>
            </Panel>

            {/* ══ PANEL 2: Weight & Moisture ══ */}
            <Panel title="Weight & Moisture" dot="#f59e0b">

              <Fld label="Gross Weight (kg)" required error={errors.grossWeight}>
                <input type="number" min="0" step="0.01" value={grossWeight}
                  onChange={e => { setGrossWeight(e.target.value); setErrors(p => ({ ...p, grossWeight: false })); }}
                  placeholder="0.00" {...sI(errors.grossWeight)}/>
              </Fld>

              <div style={g2}>
                <Fld label="Bag Type">
                  <SearchDrop options={bagTypes} value={bagTypeId} labelKey="label"
                    placeholder="Select bag type…"
                    onChange={b => { setBagTypeId(b._id); setBagTypeName(b.bagTypeName); setBagWtPerBag(b.bagWeight); }}/>
                </Fld>
                <Fld label="Bag Weight (auto)">
                  <input value={bagWtPerBag ? `${bagWtPerBag} kg/bag` : "—"} {...sRo(false)}/>
                </Fld>
              </div>

              <div style={g2}>
                <Fld label="Total Bag Weight (kg)">
                  <input value={qty && bagWtPerBag ? fmtN(totalBagW) : "—"} {...sRo(false)}/>
                </Fld>
                <Fld label="Bag Deduction">
                  <input value={bagStatus === "added" ? (qty && bagWtPerBag ? `− ${fmtN(totalBagW)} kg` : "—") : "None (Return)"} {...sRo(false)}/>
                </Fld>
              </div>

              {DIV}

              <div style={g2}>
                <Fld label="Moisture %">
                  <input type="number" min="0" step="0.01" value={moisturePct}
                    onChange={e => setMoisturePct(e.target.value)}
                    placeholder={`Base: ${millSettings.baseMoisture}%`} {...sI(false)}/>
                </Fld>
                <Fld label="Moisture Adj. (kg)">
                  <div style={{ position: "relative" }}>
                    <input type="number" step="1" value={moistureAdj}
                      readOnly={!moistureOverride}
                      onChange={e => moistureOverride && setMoistureAdj(e.target.value)}
                      style={{
                        ...sRo(!moistureOverride).style, paddingRight: 68,
                        background: moistureOverride ? "#fff" : "#f8fafc",
                        color: moistureOverride ? "#111827" : "#475569",
                      }}/>
                    <button type="button" onClick={() => setMoistureOverride(o => !o)}
                      style={{
                        position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
                        padding: "3px 7px", borderRadius: 6, border: "1px solid #e2e8f0",
                        background: moistureOverride ? "#fef9c3" : "#f8fafc",
                        color: moistureOverride ? "#92400e" : "#94a3b8",
                        fontSize: 10, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
                      }}>
                      {moistureOverride ? "Manual" : "Auto"}
                    </button>
                  </div>
                  {!moistureOverride && nv(moisturePct) > 0 && nv(moisturePct) <= baseMoist && (
                    <div style={{ fontSize: 10.5, color: "#16a34a", marginTop: 2 }}>
                      ✓ Within base moisture — no deduction
                    </div>
                  )}
                  {!moistureOverride && rawMoistAdj > 0 && rawMoistAdj !== autoMoistAdj && (
                    <div style={{ fontSize: 10.5, color: "#64748b", marginTop: 2 }}>
                      Raw: {rawMoistAdj.toFixed(3)} → Rounded: {autoMoistAdj}
                    </div>
                  )}
                </Fld>
              </div>

              {DIV}

              <div style={g2}>
                <Fld label="Net Weight (kg)">
                  <input value={netWeightKg > 0 ? fmtN(netWeightKg) : "—"} {...sRo(true)}/>
                </Fld>
                <Fld label="Net Weight (Maund)">
                  <input value={netWeightMaund > 0 ? netWeightMaund.toFixed(4) : "—"} {...sRo(false)}/>
                </Fld>
              </div>
            </Panel>

            {/* ══ PANEL 3: Pricing & Summary ══ */}
            <Panel title="Pricing & Summary" dot="#10b981">

              {/* Single Rate — default */}
              {!multiRate ? (
                <>
                  <Fld label="Rate / 40 kg (Rs.)" required error={errors.singleRate}>
                    <input type="number" min="0" step="0.01" value={singleRate}
                      onChange={e => { setSingleRate(e.target.value); setErrors(p => ({ ...p, singleRate: false })); }}
                      placeholder="0.00" {...sI(errors.singleRate)}/>
                  </Fld>

                  {/* Auto-filled outputs */}
                  <div style={g2}>
                    <Fld label="Net Maund (auto)">
                      <input value={netWeightMaund > 0 ? netWeightMaund.toFixed(4) : "—"} {...sRo(false)}/>
                    </Fld>
                    <Fld label="Amount (Rs.)">
                      <input value={totalAmount > 0 ? fmtN(totalAmount) : "—"} {...sRo(false)}/>
                    </Fld>
                  </div>

                  {/* Option to add multiple rates */}
                  <button type="button" onClick={() => {
                    setMultiRate(true);
                    setRateRows([{ id: 1, maund: "", rate: singleRate, amount: "" }]);
                  }}
                    style={{
                      fontSize: 12, fontWeight: 700, color: "#3b82f6",
                      background: "#eff6ff", border: "1px solid #bfdbfe",
                      borderRadius: 8, padding: "7px 12px", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 6, width: "fit-content",
                    }}>
                    <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                    </svg>
                    Add different rates for portions
                  </button>
                </>
              ) : (
                /* Multi-rate rows */
                <>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                      letterSpacing: ".08em", color: "#94a3b8" }}>Rate Rows (Maund × Rate)</label>
                    <div style={{ display: "flex", gap: 7 }}>
                      <button type="button" onClick={addRateRow}
                        style={{ fontSize: 11.5, fontWeight: 700, color: "#3b82f6", background: "#eff6ff",
                          border: "1px solid #bfdbfe", borderRadius: 6, padding: "3px 9px", cursor: "pointer" }}>
                        + Rate
                      </button>
                      <button type="button" onClick={() => { setMultiRate(false); setRateRows([{ id: 1, maund: "", rate: "", amount: "" }]); }}
                        style={{ fontSize: 11.5, fontWeight: 700, color: "#64748b", background: "#f8fafc",
                          border: "1px solid #e2e8f0", borderRadius: 6, padding: "3px 9px", cursor: "pointer" }}>
                        ✕ Single Rate
                      </button>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {computedRateRows.map((r, idx) => (
                      <div key={r.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto",
                        gap: 7, alignItems: "center" }}>
                        <div>
                          {idx === 0 && <div style={{ fontSize: 9.5, color: "#94a3b8", fontWeight: 700,
                            letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 3 }}>Maund</div>}
                          <input type="number" min="0" step="0.01" value={rateRows[idx]?.maund || ""}
                            onChange={e => updateRateRow(r.id, "maund", e.target.value)}
                            placeholder="0.000" {...sI(false)}/>
                        </div>
                        <div>
                          {idx === 0 && <div style={{ fontSize: 9.5, color: "#94a3b8", fontWeight: 700,
                            letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 3 }}>Rate (Rs/40kg)</div>}
                          <input type="number" min="0" step="0.01" value={rateRows[idx]?.rate || ""}
                            onChange={e => updateRateRow(r.id, "rate", e.target.value)}
                            placeholder="0.00" {...sI(false)}/>
                        </div>
                        <div>
                          {idx === 0 && <div style={{ fontSize: 9.5, color: "#94a3b8", fontWeight: 700,
                            letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 3 }}>Amount (Rs)</div>}
                          <input value={r.amount > 0 ? fmtN(r.amount) : "—"} {...sRo(false)}/>
                        </div>
                        <div style={{ paddingTop: idx === 0 ? 18 : 0 }}>
                          {rateRows.length > 1 && (
                            <button type="button" onClick={() => removeRateRow(r.id)}
                              style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid #fca5a5",
                                background: "#fef2f2", color: "#ef4444", cursor: "pointer", fontSize: 14,
                                display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {DIV}

              <div style={g2}>
                <Fld label="Total Amount (Rs)">
                  <input value={totalAmount > 0 ? fmtN(totalAmount) : "—"} {...sRo(false)}/>
                </Fld>
                <Fld label="Rent Adjustment (Rs)">
                  <input type="number" min="0" step="0.01" value={rentAdj}
                    onChange={e => setRentAdj(e.target.value)} placeholder="0.00" {...sI(false)}/>
                </Fld>
              </div>

              {/* Net Payable */}
              <div style={{
                background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 10,
                padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#15803d",
                  textTransform: "uppercase", letterSpacing: ".07em" }}>Net Payable</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 20,
                  fontWeight: 800, color: "#15803d" }}>
                  Rs {finalAmount > 0 ? fmtN(finalAmount) : "0.00"}
                </span>
              </div>

              {/* Save & Print */}
              <button type="submit" disabled={loading}
                style={{
                  width: "100%", padding: "11px 0", borderRadius: 9, border: "none",
                  background: loading ? "#cbd5e1" : "#0f172a", color: "#fff",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700,
                  letterSpacing: ".04em", display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 8, transition: ".15s",
                  boxShadow: loading ? "none" : "0 4px 12px rgba(15,23,42,.25)",
                }}>
                {loading ? "Saving…" : (
                  <>
                    <svg width={13} height={13} fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    Save &amp; Print Invoice
                  </>
                )}
              </button>
            </Panel>

          </div>
        </form>
      </div>
    </>
  );

  return isMaximized
    ? <div style={{ position: "fixed", inset: 0, zIndex: 50, background: "#f1f5f9",
        overflowY: "auto", padding: 20 }}>{content}</div>
    : <SidebarLayout>{content}</SidebarLayout>;
}