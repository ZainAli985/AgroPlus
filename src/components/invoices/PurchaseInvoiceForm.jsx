import React, { useState, useEffect, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .pi-wrap { font-family: 'DM Sans', sans-serif; color: #111827; }
  .pi-no-spin::-webkit-inner-spin-button,
  .pi-no-spin::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  .pi-no-spin { -moz-appearance: textfield; }

  .pi-panel {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; overflow: hidden;
  }
  .pi-panel-head {
    padding: 9px 14px; background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    display: flex; align-items: center; gap: 8px;
  }
  .pi-panel-body {
    padding: 14px; display: flex;
    flex-direction: column; gap: 11px;
  }

  .pi-inp, .pi-ro {
    width: 100%; padding: 8px 11px;
    border: 1px solid #d1d5db; border-radius: 7px;
    font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s;
  }
  .pi-inp::placeholder { color: #9ca3af; }
  .pi-inp:focus {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .pi-inp.err { border-color: #fca5a5; background: #fff5f5; }
  .pi-inp.err:focus { box-shadow: 0 0 0 2px rgba(239,68,68,.12); }
  .pi-ro {
    background: #f9fafb; color: #6b7280;
    font-family: 'DM Mono', monospace;
    cursor: default;
  }
  .pi-ro.hi {
    background: #f0fdf4; color: #15803d;
    border-color: #bbf7d0; font-weight: 600;
  }

  .pi-sd-btn {
    width: 100%; padding: 8px 11px;
    border: 1px solid #d1d5db; border-radius: 7px;
    background: #fff; font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: #9ca3af; cursor: pointer; outline: none;
    display: flex; align-items: center;
    justify-content: space-between; gap: 6px;
    transition: border-color .12s, box-shadow .12s;
  }
  .pi-sd-btn.sel { color: #111827; }
  .pi-sd-btn.err { border-color: #fca5a5; background: #fff5f5; }
  .pi-sd-btn:focus, .pi-sd-btn.open {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .pi-sd-panel {
    position: absolute; left: 0; top: calc(100% + 3px);
    width: max(100%, 260px); z-index: 300;
    background: #fff; border: 1px solid #d1d5db;
    border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,.1);
    overflow: hidden;
  }
  .pi-sd-item {
    padding: 8px 12px; font-size: 13px; cursor: pointer;
    border-bottom: 1px solid #f9fafb; color: #111827;
    transition: background .08s;
  }
  .pi-sd-item:last-child { border-bottom: none; }
  .pi-sd-item:hover { background: #f3f4f6; }
  .pi-sd-item.sel { background: #f3f4f6; font-weight: 600; }

  .pi-lbl {
    display: flex; align-items: center; gap: 4px;
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: #6b7280; margin-bottom: 5px;
  }
  .pi-lbl.err { color: #ef4444; }
  .pi-lbl span.req { color: #ef4444; font-size: 12px; line-height: 1; }
  .pi-lbl span.errtag {
    font-size: 9.5px; background: #fef2f2; color: #ef4444;
    padding: 1px 5px; border-radius: 4px; border: 1px solid #fecaca;
    font-weight: 700; letter-spacing: .03em;
  }

  .pi-divider { height: 1px; background: #f3f4f6; margin: 2px 0; }

  .pi-net-box {
    background: #f9fafb; border: 1px solid #e5e7eb;
    border-radius: 8px; padding: 12px 14px;
    display: flex; justify-content: space-between; align-items: center;
  }

  .pi-submit {
    width: 100%; padding: 10px 0; border-radius: 7px; border: none;
    background: #111827; color: #fff; font-size: 13.5px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background .12s;
  }
  .pi-submit:hover:not(:disabled) { background: #1f2937; }
  .pi-submit:disabled { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; }

  @media (max-width: 900px)  { .inv-grid { grid-template-columns: 1fr !important; } }
  @media (max-width: 1200px) { .inv-grid { grid-template-columns: 1fr 1fr !important; } }
`;

function formatVehicleNo(raw) {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (clean.length > 0 && /^[0-9]/.test(clean)) return "";
  const lettersMatch = clean.match(/^[A-Z]+/);
  const letters = lettersMatch ? lettersMatch[0] : "";
  const nums = clean.slice(letters.length);
  if (!letters) return "";
  return nums ? `${letters}-${nums}` : letters;
}

function noSpin(e)  { e.target.blur(); }
function noArrow(e) { if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault(); }

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
  const sel = options.find(o => o._id === value || o.value === value);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button type="button" disabled={disabled}
        onClick={() => !disabled && setOpen(o => !o)}
        className={`pi-sd-btn${sel ? " sel" : ""}${error ? " err" : ""}${open ? " open" : ""}`}>
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "left" }}>
          {sel ? sel[labelKey] : placeholder}
        </span>
        <svg width={11} height={11} fill="none" viewBox="0 0 24 24"
          stroke="#9ca3af" strokeWidth={2.5} style={{ flexShrink: 0, transition: ".15s", transform: open ? "rotate(180deg)" : "none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <div className="pi-sd-panel">
          <div style={{ padding: 7, borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}>
            <input ref={inp} value={q} onChange={e => setQ(e.target.value)}
              placeholder="Search…"
              style={{ width: "100%", padding: "6px 9px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 12.5, outline: "none", fontFamily: "'DM Sans',sans-serif" }}/>
          </div>
          <ul style={{ maxHeight: 210, overflowY: "auto", margin: 0, padding: 0, listStyle: "none" }}>
            {filtered.length === 0
              ? <li style={{ padding: "9px 12px", fontSize: 12.5, color: "#9ca3af", textAlign: "center" }}>No results</li>
              : filtered.map(o => (
                <li key={o._id || o.value}
                  className={`pi-sd-item${(o._id || o.value) === value ? " sel" : ""}`}
                  onClick={() => { onChange(o); setOpen(false); setQ(""); }}>
                  {o[labelKey]}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Fld({ label, required, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={`pi-lbl${error ? " err" : ""}`}>
        {label}
        {required && <span className="req">*</span>}
        {error && <span className="errtag">Required</span>}
      </div>
      {children}
    </div>
  );
}

function Panel({ title, dot, children }) {
  return (
    <div className="pi-panel">
      <div className="pi-panel-head">
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: dot, flexShrink: 0 }}/>
        <span style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#374151" }}>
          {title}
        </span>
      </div>
      <div className="pi-panel-body">{children}</div>
    </div>
  );
}

function buildPrintHTML(inv, sr) {
  const rateRows = Array.isArray(inv.rateRows) && inv.rateRows.length
    ? inv.rateRows
    : [{ maund: inv.netWeightMaund, rate: inv.rate40kg, amount: inv.totalAmount }];
  const rateRowsHTML = rateRows.filter(r => r.maund || r.rate)
    .map(r => `<tr><td>${Number(r.maund||0).toFixed(4)} Maund × Rs ${Number(r.rate||0).toLocaleString("en-PK")}</td><td style="text-align:right;font-weight:700">Rs ${Number(r.amount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`)
    .join("");
  return `<!DOCTYPE html><html><head><title>Purchase Invoice #${String(sr).padStart(4,"0")}</title>
<style>@page{size:A4;margin:12mm}body{font-family:"Segoe UI",Arial,sans-serif;background:#fff;color:#111}.wrap{max-width:660px;margin:auto}.head{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #1e3a8a;padding-bottom:10px;margin-bottom:16px}.logo{display:flex;align-items:center;gap:10px}.logo img{height:55px}.logo h1{font-size:20px;margin:0;color:#1e3a8a}.logo p{font-size:10px;margin:2px 0}.meta{text-align:right}.meta h2{margin:0;font-size:18px;color:#1e40af}.meta table{font-size:11px;margin-top:6px}.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}.box{border:1px solid #e5e7eb;padding:8px;border-radius:6px}.box h4{margin:0 0 6px;font-size:12px;color:#1e3a8a;border-bottom:1px solid #e5e7eb;padding-bottom:3px}.box p{font-size:11px;margin:3px 0}table{width:100%;border-collapse:collapse;font-size:11px;margin-top:10px}th{background:#1e3a8a;color:#fff;padding:5px 6px;text-align:left}td{border:1px solid #d1d5db;padding:5px 6px}tr.sub td{font-weight:700;background:#f8fafc}tr.grand td{font-weight:800;font-size:13px;color:#1e3a8a}.sig{margin-top:36px;display:flex;justify-content:space-between;font-size:11px}.sig div{width:45%;text-align:center}.sig span{display:block;margin-top:36px;border-top:1px solid #000;padding-top:4px}</style></head><body>
<div class="wrap"><div class="head"><div class="logo"><img src="/logo.png" onerror="this.style.display='none'"/><div><h1>Al Rehman Rice Mills</h1><p>Deepalpur Road, Babarkhai, Arzanipur</p><p>Chunian, Kasur – Pakistan</p><p><b>0301-4349041</b> | <b>0300-8402130</b></p></div></div><div class="meta"><h2>PURCHASE INVOICE</h2><table><tr><td><b>Invoice #</b></td><td>${String(sr).padStart(4,"0")}</td></tr><tr><td><b>Date</b></td><td>${inv.date||""}</td></tr><tr><td><b>Builty #</b></td><td>${inv.builtyNumber||"—"}</td></tr></table></div></div>
<div class="info-grid"><div class="box"><h4>SUPPLIER</h4><p><b>Name:</b> ${inv.vendorName||"—"}</p><p><b>Vehicle:</b> ${inv.vehicleNumber||"—"}</p><p><b>Bag Status:</b> ${inv.bagStatus==="return"?"Bag Return":"Bag Added"}</p></div><div class="box"><h4>PRODUCT</h4><p><b>Product:</b> ${inv.productName||"—"}</p><p><b>Bag Type:</b> ${inv.bagTypeName||"—"} (${Number(inv.bagWeightPerBag||0)} kg/bag)</p><p><b>Moisture:</b> ${inv.moisturePercent||0}% (Base: ${inv.baseMoisture||0}%)</p></div></div>
<table><tr><th>Description</th><th style="text-align:right">Value</th></tr><tr><td>Quantity (Bags)</td><td style="text-align:right">${Number(inv.quantity||0)}</td></tr><tr><td>Gross Weight (kg)</td><td style="text-align:right">${Number(inv.grossWeight||0).toFixed(2)}</td></tr><tr><td>Total Bag Weight</td><td style="text-align:right">− ${Number(inv.totalBagWeight||0).toFixed(2)}</td></tr><tr><td>Moisture Adjustment</td><td style="text-align:right">− ${Number(inv.moistureAdjustment||0).toFixed(0)}</td></tr><tr class="sub"><td>Net Weight (kg)</td><td style="text-align:right">${Number(inv.netWeightKg||inv.netWeight||0).toFixed(2)}</td></tr><tr class="sub"><td>Net Weight (Maund)</td><td style="text-align:right">${Number(inv.netWeightMaund||0).toFixed(4)}</td></tr></table>
<table style="margin-top:12px"><tr><th>Rate Breakdown</th><th style="text-align:right">Amount</th></tr>${rateRowsHTML}<tr class="sub"><td>Total Amount</td><td style="text-align:right">Rs ${Number(inv.totalAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>${Number(inv.rentAdjustment||0)>0?`<tr><td>Rent Adjustment</td><td style="text-align:right">− Rs ${Number(inv.rentAdjustment).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}<tr class="grand"><td>NET PAYABLE</td><td style="text-align:right">Rs ${Number(inv.finalAmount||inv.totalAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr></table>
<div class="sig"><div><span>Supplier Signature</span></div><div><span>Authorised Signatory</span></div></div>
<p style="text-align:center;margin-top:28px;font-size:12px">Thank you for your business — Al Rehman Rice Mills</p>
</div><script>window.print()</script></body></html>`;
}

const g2  = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 };
const nv  = v => isNaN(Number(v)) ? 0 : Number(v) || 0;
const fmtN = (v, d=2) => nv(v).toLocaleString("en-PK", { minimumFractionDigits: d, maximumFractionDigits: d });
const DIV  = <div className="pi-divider"/>;

const iProps = (error) => ({
  className: `pi-inp pi-no-spin${error ? " err" : ""}`,
  onFocus: e => { if (!error) { e.target.style.borderColor = "#6b7280"; e.target.style.boxShadow = "0 0 0 2px rgba(107,114,128,.12)"; } },
  onBlur:  e => { if (!error) { e.target.style.borderColor = "#d1d5db"; e.target.style.boxShadow = "none"; } },
  onWheel: noSpin,
  onKeyDown: noArrow,
});

const roProps = (hi = false) => ({
  className: `pi-ro${hi ? " hi" : ""}`,
  readOnly: true,
});

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
  const [multiRate,    setMultiRate]    = useState(false);
  const [singleRate,   setSingleRate]   = useState("");
  const [rateRows,     setRateRows]     = useState([{ id: 1, maund: "", rate: "", amount: "" }]);
  const [errors,       setErrors]       = useState({});
  const [loading,      setLoading]      = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "info" });
  const [isMaximized,  setIsMaximized]  = useState(false);
  const [savedInvoice, setSavedInvoice] = useState(null);
  const formRef = useRef(null);

  const qty         = nv(quantity);
  const gross       = nv(grossWeight);
  const totalBagW   = qty * bagWtPerBag;
  const baseMoist   = nv(millSettings.baseMoisture);
  const weightCut   = nv(millSettings.weightCut);
  const rawMoistAdj = moisturePct !== "" && nv(moisturePct) > baseMoist
    ? (nv(moisturePct) - baseMoist) * weightCut * qty : 0;
  const autoMoistAdj       = Math.round(rawMoistAdj);
  const effectiveMoistAdj  = moistureOverride ? nv(moistureAdj) : autoMoistAdj;
  const bagDeduction        = bagStatus === "added" ? totalBagW : 0;
  const netWeightKg         = gross - bagDeduction - effectiveMoistAdj;
  const netWeightMaund      = netWeightKg > 0 ? netWeightKg / 40 : 0;

  let totalAmount = 0, computedRateRows = [];
  if (multiRate) {
    computedRateRows = rateRows.map(r => ({ ...r, amount: nv(r.maund) * nv(r.rate) }));
    totalAmount = computedRateRows.reduce((s, r) => s + r.amount, 0);
  } else {
    const amt = netWeightMaund * nv(singleRate);
    totalAmount = amt;
    computedRateRows = [{ id: 1, maund: netWeightMaund, rate: nv(singleRate), amount: amt }];
  }
  const finalAmount = totalAmount - nv(rentAdj);

  useEffect(() => {
    if (!moistureOverride) setMoistureAdj(String(autoMoistAdj));
  }, [moisturePct, qty, millSettings, moistureOverride]);

  useEffect(() => {
    Promise.all([
      authFetch(`${API_BASE_URL}/products`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/accounts?excludeProducts=true`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/profile/bag-types`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/profile/mill-settings`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/purchase-invoice/next-sr`).then(r => r.json()),
    ]).then(([pd, ad, bd, sd, nd]) => {
      if (pd.success) setProducts(pd.products.map(p => ({
        ...p, label: p.displayName || [p.productName, p.type, p.subType].filter(Boolean).join(" - "),
      })));
      const arr = Array.isArray(ad) ? ad : (ad.accounts || []);
      const vendorList = arr.filter(a => !a.isProtected && !a.isProductAccount &&
        (a.category === "Supplier" || (!a.category && a.accountType === "Liabilities")));
      setVendors((vendorList.length > 0 ? vendorList : arr.filter(a => !a.isProtected && !a.isProductAccount))
        .map(a => ({ ...a, label: a.accountName })));
      if (bd.bagTypes) setBagTypes(bd.bagTypes.filter(b => b.isActive).map(b => ({
        ...b, label: `${b.bagTypeName} (${b.bagWeight} kg)`,
      })));
      if (sd.settings) setMillSettings(sd.settings);
      if (nd.success && nd.nextSr) setInvoiceNo(String(nd.nextSr));
    });
  }, []);

  useEffect(() => {
    if (!savedInvoice) return;
    const w = window.open("", "_blank");
    if (w) { w.document.write(buildPrintHTML(savedInvoice, savedInvoice.sr)); w.document.close(); }
    setSavedInvoice(null);
  }, [savedInvoice]);

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

  const handleKeyDown = e => {
    if (e.key !== "Enter") return;
    const els = formRef.current?.querySelectorAll('input:not([readonly]):not([type=submit]),select');
    if (!els?.length) return;
    const i = [...els].indexOf(e.target);
    if (i >= 0 && i < els.length - 1) { e.preventDefault(); els[i + 1].focus(); }
  };

  const addRateRow    = () => setRateRows(r => [...r, { id: Date.now(), maund: "", rate: "", amount: "" }]);
  const removeRateRow = id => setRateRows(r => r.filter(x => x.id !== id));
  const updateRateRow = (id, field, val) => setRateRows(r => r.map(x => x.id === id ? { ...x, [field]: val } : x));

  const resetForm = () => {
    setDate(today); setVehicleNo(""); setBuiltyNo(""); setVendorId(""); setVendorName("");
    setProductId(""); setProductName(""); setBagStatus("added"); setQuantity("");
    setGrossWeight(""); setBagTypeId(""); setBagTypeName(""); setBagWtPerBag(0);
    setMoisturePct(""); setMoistureOverride(false); setMoistureAdj(""); setRentAdj("");
    setSingleRate(""); setMultiRate(false);
    setRateRows([{ id: 1, maund: "", rate: "", amount: "" }]);
    setErrors({});
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) { setNotification({ message: "Please fill all required fields", type: "error" }); return; }
    setLoading(true);
    try {
      const payload = {
        sr: Number(invoiceNo), date, vendorName, vendorAccountId: vendorId || undefined,
        vehicleNumber: vehicleNo, builtyNumber: builtyNo, productId, productName,
        bagStatus, quantity: qty, grossWeight: gross,
        bagTypeId: bagTypeId || undefined, bagTypeName, bagWeightPerBag: bagWtPerBag,
        totalBagWeight: totalBagW, moisturePercent: nv(moisturePct),
        baseMoisture: baseMoist, weightCut, moistureAdjustment: effectiveMoistAdj,
        moistureOverride, netWeightKg: netWeightKg > 0 ? netWeightKg : 0,
        netWeightMaund: netWeightMaund > 0 ? netWeightMaund : 0,
        rateRows: computedRateRows.filter(r => r.maund || r.rate),
        totalAmount, rentAdjustment: nv(rentAdj), finalAmount,
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
        setNotification({ message: `Invoice #${String(data.invoice.sr).padStart(4,"0")} saved!`, type: "success" });
        setSavedInvoice(data.invoice);
        resetForm();
        authFetch(`${API_BASE_URL}/purchase-invoice/next-sr`).then(r => r.json())
          .then(d => { if (d.success && d.nextSr) setInvoiceNo(String(d.nextSr)); });
      } else {
        setNotification({ message: data.message || "Failed to save.", type: "error" });
      }
    } catch { setNotification({ message: "Server error.", type: "error" }); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    const h = e => { if (e.key === "Escape" && isMaximized) setIsMaximized(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isMaximized]);

  const content = (
    <>
      <style>{FONTS}{CSS}</style>
      <Notification message={notification.message} type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}/>

      <div className="pi-wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 10, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 3px" }}>Procurement</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", letterSpacing: "-.3px", margin: 0 }}>
                Purchase Invoice
              </h1>
              <span style={{
                fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 600,
                background: "#f3f4f6", color: "#374151", padding: "2px 8px", borderRadius: 5,
                border: "1px solid #e5e7eb",
              }}>
                #{invoiceNo ? String(invoiceNo).padStart(4, "0") : "——"}
              </span>
            </div>
          </div>
          <button type="button" onClick={() => setIsMaximized(p => !p)}
            style={{
              fontSize: 11.5, fontWeight: 500, padding: "6px 12px", borderRadius: 6,
              border: "1px solid #e5e7eb", background: "#fff", color: "#374151",
              cursor: "pointer",
            }}>
            {isMaximized ? "Exit Full Screen" : "Full Screen"}
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <div className="inv-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, alignItems: "start" }}>

            {/* Panel 1 */}
            <Panel title="Basic Information" dot="#3b82f6">
              <div style={g2}>
                <Fld label="Date" required error={errors.date}>
                  <input type="date" value={date} max={today}
                    onChange={e => { setDate(e.target.value); setErrors(p => ({ ...p, date: false })); }}
                    {...iProps(errors.date)}/>
                </Fld>
                <Fld label="Invoice #">
                  <input value={invoiceNo ? `#${String(invoiceNo).padStart(4,"0")}` : "—"} {...roProps(false)}/>
                </Fld>
              </div>

              <div style={g2}>
                <Fld label="Vehicle No." required error={errors.vehicleNo}>
                  <input value={vehicleNo}
                    onChange={e => { setVehicleNo(formatVehicleNo(e.target.value)); setErrors(p => ({ ...p, vehicleNo: false })); }}
                    placeholder="e.g. LEA-1234" {...iProps(errors.vehicleNo)}/>
                </Fld>
                <Fld label="Builty No." required error={errors.builtyNo}>
                  <input value={builtyNo}
                    onChange={e => { setBuiltyNo(e.target.value); setErrors(p => ({ ...p, builtyNo: false })); }}
                    placeholder="e.g. B-001" {...iProps(errors.builtyNo)}/>
                </Fld>
              </div>

              <Fld label="Vendor" required error={errors.vendorId}>
                <SearchDrop options={vendors} value={vendorId} labelKey="label"
                  placeholder="Select vendor…" error={errors.vendorId}
                  onChange={v => { setVendorId(v._id); setVendorName(v.accountName); setErrors(p => ({ ...p, vendorId: false })); }}/>
              </Fld>

              <Fld label="Product" required error={errors.productId}>
                <SearchDrop options={products} value={productId} labelKey="label"
                  placeholder="Select product…" error={errors.productId}
                  onChange={p => { setProductId(p._id); setProductName(p.displayName || [p.productName, p.type, p.subType].filter(Boolean).join(" - ")); setErrors(prev => ({ ...prev, productId: false })); }}/>
              </Fld>

              <Fld label="Bag Status">
                <div style={{ display: "flex", gap: 7 }}>
                  {[["added", "Bag Added"], ["return", "Bag Return"]].map(([s, lbl]) => (
                    <button key={s} type="button" onClick={() => setBagStatus(s)}
                      style={{
                        flex: 1, padding: "8px 0", borderRadius: 7, cursor: "pointer",
                        border: `1px solid ${bagStatus === s ? "#111827" : "#e5e7eb"}`,
                        background: bagStatus === s ? "#111827" : "#fff",
                        color: bagStatus === s ? "#fff" : "#6b7280",
                        fontSize: 12.5, fontWeight: 500,
                        fontFamily: "'DM Sans',sans-serif", transition: "all .1s",
                      }}>
                      {lbl}
                    </button>
                  ))}
                </div>
              </Fld>

              <Fld label="Quantity (Bags)" required error={errors.quantity}>
                <input type="number" min="0" value={quantity}
                  onChange={e => { setQuantity(e.target.value); setErrors(p => ({ ...p, quantity: false })); }}
                  placeholder="0" {...iProps(errors.quantity)}/>
              </Fld>
            </Panel>

            {/* Panel 2 */}
            <Panel title="Weight & Moisture" dot="#f59e0b">
              <Fld label="Gross Weight (kg)" required error={errors.grossWeight}>
                <input type="number" min="0" step="0.01" value={grossWeight}
                  onChange={e => { setGrossWeight(e.target.value); setErrors(p => ({ ...p, grossWeight: false })); }}
                  placeholder="0.00" {...iProps(errors.grossWeight)}/>
              </Fld>

              <div style={g2}>
                <Fld label="Bag Type">
                  <SearchDrop options={bagTypes} value={bagTypeId} labelKey="label"
                    placeholder="Select bag type…"
                    onChange={b => { setBagTypeId(b._id); setBagTypeName(b.bagTypeName); setBagWtPerBag(b.bagWeight); }}/>
                </Fld>
                <Fld label="Bag Wt / Bag">
                  <input value={bagWtPerBag ? `${bagWtPerBag} kg` : "—"} {...roProps(false)}/>
                </Fld>
              </div>

              <div style={g2}>
                <Fld label="Total Bag Weight">
                  <input value={qty && bagWtPerBag ? `${fmtN(totalBagW)} kg` : "—"} {...roProps(false)}/>
                </Fld>
                <Fld label="Bag Deduction">
                  <input value={bagStatus === "added" ? (qty && bagWtPerBag ? `− ${fmtN(totalBagW)} kg` : "—") : "None"} {...roProps(false)}/>
                </Fld>
              </div>

              {DIV}

              <div style={g2}>
                <Fld label="Moisture %">
                  <input type="number" min="0" step="0.01" value={moisturePct}
                    onChange={e => setMoisturePct(e.target.value)}
                    placeholder={`Base: ${millSettings.baseMoisture}%`} {...iProps(false)}/>
                </Fld>
                <Fld label="Moisture Adj. (kg)">
                  <div style={{ position: "relative" }}>
                    <input type="number" step="1" value={moistureAdj}
                      readOnly={!moistureOverride}
                      onChange={e => moistureOverride && setMoistureAdj(e.target.value)}
                      className={`pi-no-spin${moistureOverride ? " pi-inp" : " pi-ro"}`}
                      style={{ width: "100%", paddingRight: 64, padding: "8px 64px 8px 11px", border: "1px solid #d1d5db", borderRadius: 7, fontSize: 13, fontFamily: moistureOverride ? "'DM Sans',sans-serif" : "'DM Mono',monospace", outline: "none", background: moistureOverride ? "#fff" : "#f9fafb", color: moistureOverride ? "#111827" : "#6b7280" }}/>
                    <button type="button" onClick={() => setMoistureOverride(o => !o)}
                      style={{
                        position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
                        padding: "2px 7px", borderRadius: 5, border: "1px solid #e5e7eb",
                        background: moistureOverride ? "#fef9c3" : "#f9fafb",
                        color: moistureOverride ? "#92400e" : "#9ca3af",
                        fontSize: 10, fontWeight: 600, cursor: "pointer",
                      }}>
                      {moistureOverride ? "Manual" : "Auto"}
                    </button>
                  </div>
                  {!moistureOverride && nv(moisturePct) > 0 && nv(moisturePct) <= baseMoist && (
                    <div style={{ fontSize: 10.5, color: "#15803d", marginTop: 2 }}>✓ Within base — no deduction</div>
                  )}
                </Fld>
              </div>

              {DIV}

              <div style={g2}>
                <Fld label="Net Weight (kg)">
                  <input value={netWeightKg > 0 ? fmtN(netWeightKg) : "—"} {...roProps(netWeightKg > 0)}/>
                </Fld>
                <Fld label="Net Weight (Maund)">
                  <input value={netWeightMaund > 0 ? netWeightMaund.toFixed(4) : "—"} {...roProps(false)}/>
                </Fld>
              </div>
            </Panel>

            {/* Panel 3 */}
            <Panel title="Pricing & Summary" dot="#10b981">

              {!multiRate ? (
                <>
                  <Fld label="Rate / 40 kg (Rs.)" required error={errors.singleRate}>
                    <input type="number" min="0" step="0.01" value={singleRate}
                      onChange={e => { setSingleRate(e.target.value); setErrors(p => ({ ...p, singleRate: false })); }}
                      placeholder="0.00" {...iProps(errors.singleRate)}/>
                  </Fld>

                  <div style={g2}>
                    <Fld label="Net Maund (auto)">
                      <input value={netWeightMaund > 0 ? netWeightMaund.toFixed(4) : "—"} {...roProps(false)}/>
                    </Fld>
                    <Fld label="Amount (Rs.)">
                      <input value={totalAmount > 0 ? fmtN(totalAmount) : "—"} {...roProps(false)}/>
                    </Fld>
                  </div>

                  <button type="button"
                    onClick={() => { setMultiRate(true); setRateRows([{ id: 1, maund: "", rate: singleRate, amount: "" }]); }}
                    style={{
                      fontSize: 12, fontWeight: 500, color: "#374151",
                      background: "#f9fafb", border: "1px solid #e5e7eb",
                      borderRadius: 7, padding: "7px 12px", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 6, width: "fit-content",
                    }}>
                    <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                    </svg>
                    Add multiple rates
                  </button>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
                    <label style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", color: "#6b7280" }}>
                      Rate Rows
                    </label>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button type="button" onClick={addRateRow}
                        style={{ fontSize: 11.5, fontWeight: 500, color: "#374151", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 5, padding: "3px 9px", cursor: "pointer" }}>
                        + Row
                      </button>
                      <button type="button" onClick={() => { setMultiRate(false); setRateRows([{ id: 1, maund: "", rate: "", amount: "" }]); }}
                        style={{ fontSize: 11.5, fontWeight: 500, color: "#6b7280", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 5, padding: "3px 9px", cursor: "pointer" }}>
                        Single Rate
                      </button>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {computedRateRows.map((r, idx) => (
                      <div key={r.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 7, alignItems: "center" }}>
                        <div>
                          {idx === 0 && <div style={{ fontSize: 9.5, color: "#9ca3af", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 3 }}>Maund</div>}
                          <input type="number" min="0" step="0.01" value={rateRows[idx]?.maund || ""}
                            onChange={e => updateRateRow(r.id, "maund", e.target.value)}
                            placeholder="0.000" {...iProps(false)}/>
                        </div>
                        <div>
                          {idx === 0 && <div style={{ fontSize: 9.5, color: "#9ca3af", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 3 }}>Rate (Rs/40kg)</div>}
                          <input type="number" min="0" step="0.01" value={rateRows[idx]?.rate || ""}
                            onChange={e => updateRateRow(r.id, "rate", e.target.value)}
                            placeholder="0.00" {...iProps(false)}/>
                        </div>
                        <div>
                          {idx === 0 && <div style={{ fontSize: 9.5, color: "#9ca3af", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 3 }}>Amount</div>}
                          <input value={r.amount > 0 ? fmtN(r.amount) : "—"} {...roProps(false)}/>
                        </div>
                        <div style={{ paddingTop: idx === 0 ? 18 : 0 }}>
                          {rateRows.length > 1 && (
                            <button type="button" onClick={() => removeRateRow(r.id)}
                              style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid #fecaca", background: "#fef2f2", color: "#dc2626", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>×</button>
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
                  <input value={totalAmount > 0 ? fmtN(totalAmount) : "—"} {...roProps(false)}/>
                </Fld>
                <Fld label="Rent Adjustment (Rs)">
                  <input type="number" min="0" step="0.01" value={rentAdj}
                    onChange={e => setRentAdj(e.target.value)} placeholder="0.00" {...iProps(false)}/>
                </Fld>
              </div>

              {/* Net payable */}
              <div className="pi-net-box">
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", color: "#6b7280" }}>
                  Net Payable
                </span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 18, fontWeight: 700, color: "#111827" }}>
                  Rs {finalAmount > 0 ? fmtN(finalAmount) : "0.00"}
                </span>
              </div>

              <button type="submit" disabled={loading} className="pi-submit">
                {loading ? "Saving…" : (
                  <>
                    <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
    ? <div style={{ position: "fixed", inset: 0, zIndex: 50, background: "#f9fafb", overflowY: "auto", padding: 20 }}>{content}</div>
    : <SidebarLayout>{content}</SidebarLayout>;
}