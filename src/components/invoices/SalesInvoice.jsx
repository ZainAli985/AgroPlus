import React, { useState, useEffect, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');`;

/* ── Hide number spinners globally in this form ───────────── */
const NUM_CSS = `
  .si-no-spin::-webkit-inner-spin-button,
  .si-no-spin::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  .si-no-spin { -moz-appearance: textfield; }
`;

/* ─── Vehicle number formatter ──────────────────────────────── */
function formatVehicleNo(raw) {
  // Strip anything not letter/digit
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  // Must start with letters — reject if first char is digit
  if (clean.length > 0 && /^[0-9]/.test(clean)) return "";
  const lettersMatch = clean.match(/^[A-Z]+/);
  const letters = lettersMatch ? lettersMatch[0] : "";
  const nums    = clean.slice(letters.length);
  if (!letters) return "";
  return nums ? `${letters}-${nums}` : letters;
}

/* ─── Prevent arrow keys + scroll from changing number inputs ─ */
function noSpin(e) { e.target.blur(); }          // onWheel
function noArrow(e) {                             // onKeyDown for numbers
  if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
}

/* ─── Searchable dropdown ───────────────────────────────────── */
function SearchDrop({ options, value, onChange, placeholder, labelKey = "label", error }) {
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
      <button type="button" onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", padding: "8px 11px",
          border: `1.5px solid ${error ? "#fca5a5" : open ? "#3b82f6" : "#e2e8f0"}`,
          borderRadius: 9, background: "#fff", cursor: "pointer",
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
          width: "max(100%,280px)", zIndex: 300, background: "#fff",
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

/* ─── Field wrapper ─────────────────────────────────────────── */
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
          }}>
            Required
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

/* ─── Input helpers ─────────────────────────────────────────── */
const sI = (error) => ({
  className: "si-no-spin",
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

/* ─── Panel ─────────────────────────────────────────────────── */
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

/* ─── Print HTML ────────────────────────────────────────────── */
function buildPrintHTML(inv, sr) {
  return `<!DOCTYPE html><html><head><title>Sales Invoice #${String(sr).padStart(4, "0")}</title>
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
  <div class="meta"><h2>SALES INVOICE</h2>
    <table>
      <tr><td><b>Invoice #</b></td><td>${String(sr).padStart(4, "0")}</td></tr>
      <tr><td><b>Date</b></td><td>${inv.date}</td></tr>
      <tr><td><b>Builty #</b></td><td>${inv.builtyNo || "—"}</td></tr>
    </table>
  </div>
</div>
<div class="info-grid">
  <div class="box"><h4>CUSTOMER</h4>
    <p><b>Name:</b> ${inv.vendorName}</p>
    <p><b>Vehicle:</b> ${inv.vehicleNo}</p>
    <p><b>Broker:</b> ${inv.brokerName || "—"}</p>
  </div>
  <div class="box"><h4>PRODUCT</h4>
    <p><b>Product:</b> ${inv.paddyType}</p>
    <p><b>Rate / 40 kg:</b> Rs ${Number(inv.rate40 || 0).toLocaleString("en-PK", { minimumFractionDigits: 2 })}</p>
    <p><b>Quantity:</b> ${Number(inv.quantity || 0)} bags</p>
  </div>
</div>
<table>
  <tr><th>Description</th><th style="text-align:right">Value</th></tr>
  <tr><td>Total Weight (kg)</td><td style="text-align:right">${Number(inv.weight || 0).toFixed(2)}</td></tr>
  <tr><td>Bag Weight (kg)</td><td style="text-align:right">− ${Number(inv.bagWeight || 0).toFixed(2)}</td></tr>
  <tr class="sub"><td>Net Weight (kg)</td><td style="text-align:right">${Number(inv.netWeight || 0).toFixed(2)}</td></tr>
  <tr><td>Net Weight (Maund)</td><td style="text-align:right">${Number(inv.netWeight40 || 0).toFixed(6)}</td></tr>
  <tr><td>Amount (${Number(inv.netWeight40 || 0).toFixed(4)} Maund × Rs ${Number(inv.rate40 || 0).toLocaleString("en-PK")})</td>
    <td style="text-align:right">Rs ${Number(inv.amount || 0).toLocaleString("en-PK", { minimumFractionDigits: 2 })}</td></tr>
  <tr><td>Sutli / Silai (Rs ${Number(inv.sutliSilaiRate || 0)} × ${Number(inv.quantity || 0)} bags)</td>
    <td style="text-align:right">Rs ${Number(inv.sutliSilaiAmount || 0).toLocaleString("en-PK", { minimumFractionDigits: 2 })}</td></tr>
  ${inv.bardanaRate ? `<tr><td>Bardana (Rs ${Number(inv.bardanaRate || 0)} × ${Number(inv.quantity || 0)} bags)</td>
    <td style="text-align:right">Rs ${Number(inv.bardanaAmount || 0).toLocaleString("en-PK", { minimumFractionDigits: 2 })}</td></tr>` : ""}
  <tr class="sub"><td>Total w/ Sutli${inv.bardanaRate ? " + Bardana" : ""}</td>
    <td style="text-align:right">Rs ${Number(inv.totalWithBardana || inv.totalAmount || 0).toLocaleString("en-PK", { minimumFractionDigits: 2 })}</td></tr>
  ${inv.brokeryRate ? `<tr><td>Brokery (${Number(inv.netWeight40 || 0).toFixed(4)} Maund × Rs ${Number(inv.brokeryRate || 0)})</td>
    <td style="text-align:right">− Rs ${Number(inv.brokery || 0).toLocaleString("en-PK", { minimumFractionDigits: 2 })}</td></tr>` : ""}
  <tr class="grand"><td>NET PAYABLE</td>
    <td style="text-align:right">Rs ${Number(inv.totalAmount2 || 0).toLocaleString("en-PK", { minimumFractionDigits: 2 })}</td></tr>
</table>
<div class="sig">
  <div><span>Customer Signature</span></div>
  <div><span>Authorised Signatory</span></div>
</div>
<p style="text-align:center;margin-top:28px;font-size:12px">Thank you for your business — Al Rehman Rice Mills</p>
</div><script>window.print()</script></body></html>`;
}

/* ─── Layout helpers ────────────────────────────────────────── */
const g2  = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 };
const g3  = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 };
const DIV = <div style={{ height: 1, background: "#f1f5f9", margin: "2px 0" }}/>;
const nv  = v => isNaN(Number(v)) ? 0 : Number(v) || 0;
const fmtN = (v, d = 2) => nv(v).toLocaleString("en-PK", { minimumFractionDigits: d, maximumFractionDigits: d });

/* ══════════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════════ */
export default function AddSalesInvoice() {
  const today = new Date().toISOString().split("T")[0];

  const [products,    setProducts]    = useState([]);
  const [vendors,     setVendors]     = useState([]);
  const [invoiceNo,   setInvoiceNo]   = useState("");

  const [date,        setDate]        = useState(today);
  const [vehicleNo,   setVehicleNo]   = useState("");
  const [builtyNo,    setBuiltyNo]    = useState("");
  const [vendorId,    setVendorId]    = useState("");
  const [vendorName,  setVendorName]  = useState("");
  const [brokerName,  setBrokerName]  = useState("");
  const [productId,   setProductId]   = useState("");
  const [paddyType,   setPaddyType]   = useState("");
  const [quantity,    setQuantity]    = useState("");
  const [weight,      setWeight]      = useState("");     // total weight kg
  const [bagWeight,   setBagWeight]   = useState("");     // total bag weight kg (direct input)
  const [rate40,      setRate40]      = useState("");
  const [sutliRate,   setSutliRate]   = useState("");
  const [bardanaRate, setBardanaRate] = useState("");
  const [brokeryRate, setBrokeryRate] = useState("");

  const [errors,      setErrors]      = useState({});
  const [loading,     setLoading]     = useState(false);
  const [notification,setNotification]= useState({ message: "", type: "info" });
  const [isMaximized, setIsMaximized] = useState(false);
  const [savedInvoice,setSavedInvoice]= useState(null);
  const formRef = useRef(null);

  /* ── Computed values ── */
  // CORRECTED: Net Weight = Total Weight - Bag Weight (direct subtraction, no ×qty)
  const totalWt      = nv(weight);
  const bagWt        = nv(bagWeight);
  const netWeight    = totalWt - bagWt;
  const netWeight40  = netWeight > 0 ? netWeight / 40 : 0;   // NO rounding
  const qty          = nv(quantity);
  const amount       = netWeight40 * nv(rate40);
  const sutliAmt     = nv(sutliRate) * qty;
  const totalAmount  = amount + sutliAmt;
  const bardanaAmt   = nv(bardanaRate) * qty;
  const totalWithBardana = totalAmount + bardanaAmt;
  const brokeryAmt   = netWeight40 * nv(brokeryRate);        // flat rate × maund
  const totalAmount2 = totalWithBardana - brokeryAmt;

  /* ── Fetch master data ── */
  useEffect(() => {
    Promise.all([
      authFetch(`${API_BASE_URL}/products`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/accounts`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/sales-invoice/next-sr`).then(r => r.json()),
    ]).then(([pd, ad, nd]) => {
      if (pd.success) {
        setProducts(pd.products.map(p => ({
          ...p,
          label: p.displayName || [p.productName, p.type, p.subType].filter(Boolean).join(" - "),
        })));
      }
      const arr = Array.isArray(ad) ? ad : (ad.accounts || []);
      setVendors(arr.filter(a => !a.isProtected).map(a => ({ ...a, label: a.accountName })));
      if (nd.success && nd.nextSr) setInvoiceNo(String(nd.nextSr));
    });
  }, []);

  /* ── Auto-print on save ── */
  useEffect(() => {
    if (!savedInvoice) return;
    const w = window.open("", "_blank");
    if (w) { w.document.write(buildPrintHTML(savedInvoice, savedInvoice.sr)); w.document.close(); }
    setSavedInvoice(null);
  }, [savedInvoice]);

  /* ── Validate — sets red borders, no popup for missing fields ── */
  const validate = () => {
    const e = {};
    if (!date)      e.date = true;
    if (!vehicleNo) e.vehicleNo = true;
    if (!builtyNo)  e.builtyNo = true;
    if (!vendorId)  e.vendorId = true;
    if (!productId) e.productId = true;
    if (!quantity)  e.quantity = true;
    if (!weight)    e.weight = true;
    if (!bagWeight) e.bagWeight = true;
    if (!rate40)    e.rate40 = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ── Enter → next field ── */
  const handleKeyDown = e => {
    if (e.key !== "Enter") return;
    const els = formRef.current?.querySelectorAll('input:not([readonly]):not([type=submit]),select');
    if (!els?.length) return;
    const i = [...els].indexOf(e.target);
    if (i >= 0 && i < els.length - 1) { e.preventDefault(); els[i + 1].focus(); }
  };

  /* ── Submit ── */
  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) {
      setNotification({ message: "Please fill all required fields marked with *", type: "error" });
      return;
    }
    setLoading(true);
    try {
      const payload = {
        date, vehicleNo, builtyNo,
        vendorName, vendorAccountId: vendorId || undefined,
        brokerName, productId, paddyType,
        quantity: qty,
        weight: totalWt,
        bagWeight: bagWt,                                          // total bag weight
        netWeight:    netWeight > 0 ? netWeight : 0,
        netWeight40:  netWeight40 > 0 ? netWeight40 : 0,
        rate40: nv(rate40), amount,
        sutliSilaiRate: nv(sutliRate), sutliSilaiAmount: sutliAmt,
        totalAmount,
        bardanaRate: nv(bardanaRate) || undefined, bardanaAmount: bardanaAmt || undefined,
        totalWithBardana,
        brokeryRate: nv(brokeryRate) || undefined, brokery: brokeryAmt || undefined,
        totalAmount2,
        sr: Number(invoiceNo),
      };
      const res  = await authFetch(`${API_BASE_URL}/sales-invoice/create`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setNotification({ message: `Invoice #${String(data.invoice.sr).padStart(4, "0")} saved! Printing…`, type: "success" });
        setSavedInvoice(data.invoice);
        setDate(today); setVehicleNo(""); setBuiltyNo("");
        setVendorId(""); setVendorName(""); setBrokerName("");
        setProductId(""); setPaddyType(""); setQuantity("");
        setWeight(""); setBagWeight(""); setRate40("");
        setSutliRate(""); setBardanaRate(""); setBrokeryRate("");
        setErrors({});
        authFetch(`${API_BASE_URL}/sales-invoice/next-sr`).then(r => r.json())
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

  /* ─────────────────── RENDER ───── */
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
              color: "#0f172a", lineHeight: 1, margin: 0 }}>Sales Invoice</h1>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 600,
              background: "#0f172a", color: "#818cf8", padding: "3px 9px", borderRadius: 4 }}>
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
            <Panel title="Basic Information" dot="#6366f1">

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

              {/* Broker Name LEFT, Builty No RIGHT */}
              <div style={g2}>
                <Fld label="Broker Name">
                  <input value={brokerName} onChange={e => setBrokerName(e.target.value)}
                    placeholder="Optional" {...sI(false)}/>
                </Fld>
                <Fld label="Builty No." required error={errors.builtyNo}>
                  <input value={builtyNo}
                    onChange={e => { setBuiltyNo(e.target.value); setErrors(p => ({ ...p, builtyNo: false })); }}
                    placeholder="e.g. B-001" {...sI(errors.builtyNo)}/>
                </Fld>
              </div>

              <Fld label="Vehicle No." required error={errors.vehicleNo}>
                <input value={vehicleNo}
                  onChange={e => {
                    const formatted = formatVehicleNo(e.target.value);
                    setVehicleNo(formatted);
                    setErrors(p => ({ ...p, vehicleNo: false }));
                  }}
                  placeholder="e.g. LEA-1234" {...sI(errors.vehicleNo)}/>
              </Fld>

              <Fld label="Vendor Name" required error={errors.vendorId}>
                <SearchDrop options={vendors} value={vendorId} labelKey="label"
                  placeholder="Select vendor from accounts…" error={errors.vendorId}
                  onChange={v => {
                    setVendorId(v._id); setVendorName(v.accountName);
                    setErrors(p => ({ ...p, vendorId: false }));
                  }}/>
              </Fld>

              {/* Product: ProductName - Type - SubType */}
              <Fld label="Product" required error={errors.productId}>
                <SearchDrop options={products} value={productId} labelKey="label"
                  placeholder="Select product…" error={errors.productId}
                  onChange={p => {
                    setProductId(p._id);
                    setPaddyType(p.label || p.productName);
                    setErrors(prev => ({ ...prev, productId: false }));
                  }}/>
              </Fld>

              <div style={g3}>
                <Fld label="Quantity (Bags)" required error={errors.quantity}>
                  <input type="number" min="0" value={quantity}
                    onChange={e => { setQuantity(e.target.value); setErrors(p => ({ ...p, quantity: false })); }}
                    placeholder="0" {...sI(errors.quantity)}/>
                </Fld>
                <Fld label="Total Wt (kg)" required error={errors.weight}>
                  <input type="number" min="0" step="0.01" value={weight}
                    onChange={e => { setWeight(e.target.value); setErrors(p => ({ ...p, weight: false })); }}
                    placeholder="0.00" {...sI(errors.weight)}/>
                </Fld>
                {/* CHANGED: Bag Weight is now total bag weight, not per-bag */}
                <Fld label="Bag Weight (kg)" required error={errors.bagWeight}>
                  <input type="number" min="0" step="0.01" value={bagWeight}
                    onChange={e => { setBagWeight(e.target.value); setErrors(p => ({ ...p, bagWeight: false })); }}
                    placeholder="0.00" {...sI(errors.bagWeight)}/>
                </Fld>
              </div>
            </Panel>

            {/* ══ PANEL 2: Weight & Rates ══ */}
            <Panel title="Weight & Rates" dot="#f59e0b">

              {/* Net Weight = Total Wt - Bag Weight (direct subtraction) */}
              <div style={g2}>
                <Fld label="Net Weight (kg)">
                  <input value={netWeight > 0 ? fmtN(netWeight) : "—"} {...sRo(true)}/>
                </Fld>
                <Fld label="Net Weight (Maund)">
                  {/* Full precision — no rounding */}
                  <input value={netWeight40 > 0 ? netWeight40.toString() : "—"} {...sRo(false)}/>
                </Fld>
              </div>

              <Fld label="Net Weight (Ton)">
                <input value={netWeight > 0 ? (netWeight / 1000).toString() : "—"} {...sRo(false)}/>
              </Fld>

              {DIV}

              <Fld label="Rate / 40 kg (Rs.)" required error={errors.rate40}>
                <input type="number" min="0" step="0.01" value={rate40}
                  onChange={e => { setRate40(e.target.value); setErrors(p => ({ ...p, rate40: false })); }}
                  placeholder="0.00" {...sI(errors.rate40)}/>
              </Fld>

              <div style={g2}>
                <Fld label="Amount (Rs.)">
                  <input value={amount > 0 ? fmtN(amount) : "—"} {...sRo(false)}/>
                </Fld>
                <Fld label="Sutli Rate (Rs./bag)">
                  <input type="number" min="0" step="0.01" value={sutliRate}
                    onChange={e => setSutliRate(e.target.value)}
                    placeholder="0.00" {...sI(false)}/>
                </Fld>
              </div>

              <div style={g2}>
                <Fld label="Sutli Amount (Rs.)">
                  <input value={sutliAmt > 0 ? fmtN(sutliAmt) : "—"} {...sRo(false)}/>
                </Fld>
                <Fld label="Total w/ Sutli (Rs.)">
                  <input value={totalAmount > 0 ? fmtN(totalAmount) : "—"} {...sRo(false)}/>
                </Fld>
              </div>

              {DIV}

              {/* Bardana */}
              <div style={g2}>
                <Fld label="Bardana Rate (Rs./bag)">
                  <input type="number" min="0" step="0.01" value={bardanaRate}
                    onChange={e => setBardanaRate(e.target.value)}
                    placeholder="Optional" {...sI(false)}/>
                </Fld>
                <Fld label="Bardana Amount (Rs.)">
                  <input value={bardanaAmt > 0 ? fmtN(bardanaAmt) : "—"} {...sRo(false)}/>
                </Fld>
              </div>

              {nv(bardanaRate) > 0 && (
                <Fld label="Total w/ Bardana (Rs.)">
                  <input value={totalWithBardana > 0 ? fmtN(totalWithBardana) : "—"} {...sRo(false)}/>
                </Fld>
              )}
            </Panel>

            {/* ══ PANEL 3: Brokery & Summary ══ */}
            <Panel title="Brokery & Summary" dot="#10b981">

              <Fld label="Brokery Rate (Rs./Maund)">
                <input type="number" min="0" step="0.01" value={brokeryRate}
                  onChange={e => setBrokeryRate(e.target.value)}
                  placeholder="e.g. 2.50" {...sI(false)}/>
              </Fld>

              {nv(brokeryRate) > 0 && (
                <div style={{ fontSize: 11, color: "#64748b", marginTop: -4, lineHeight: 1.6 }}>
                  {netWeight40 > 0 ? netWeight40.toFixed(4) : "0"} Maund × Rs {nv(brokeryRate)} ={" "}
                  <strong>Rs {fmtN(brokeryAmt)}</strong>
                </div>
              )}

              <div style={g2}>
                <Fld label="Brokery Amount (Rs.)">
                  <input value={brokeryAmt > 0 ? fmtN(brokeryAmt) : "—"} {...sRo(false)}/>
                </Fld>
                <Fld label="Net After Brokery">
                  <input value={totalAmount2 !== 0 ? fmtN(totalAmount2) : "—"} {...sRo(true)}/>
                </Fld>
              </div>

              {DIV}

              {/* Summary breakdown */}
              <div style={{ padding: "12px 14px", borderRadius: 10,
                background: "#f5f3ff", border: "1.5px solid #ddd6fe" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {[
                    ["Amount",     fmtN(amount),           "#475569"],
                    ["+ Sutli",    fmtN(sutliAmt),         "#475569"],
                    ...(nv(bardanaRate) > 0 ? [["+ Bardana", fmtN(bardanaAmt), "#475569"]] : []),
                    ["= Subtotal", fmtN(totalWithBardana), "#374151"],
                    ["− Brokery",  fmtN(brokeryAmt),       "#ef4444"],
                  ].map(([l, v, col]) => (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8",
                        textTransform: "uppercase", letterSpacing: ".06em" }}>{l}</span>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace",
                        fontSize: 12, color: col }}>Rs {v}</span>
                    </div>
                  ))}
                  <div style={{ height: 1, background: "#ddd6fe" }}/>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#6d28d9",
                      textTransform: "uppercase", letterSpacing: ".06em" }}>Net Payable</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 17, fontWeight: 800, color: "#6d28d9" }}>
                      Rs {fmtN(totalAmount2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                style={{
                  width: "100%", padding: "11px 0", borderRadius: 9, border: "none",
                  background: loading ? "#cbd5e1" : "#4f46e5", color: "#fff",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700,
                  letterSpacing: ".04em", display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 8, transition: ".15s",
                  boxShadow: loading ? "none" : "0 4px 14px rgba(79,70,229,.3)",
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