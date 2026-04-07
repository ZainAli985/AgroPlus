import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .pq-wrap { font-family: 'DM Sans', sans-serif; color: #111827; }
  .pq-no-spin::-webkit-inner-spin-button,
  .pq-no-spin::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  .pq-no-spin { -moz-appearance: textfield; }

  /* ── Tab nav ── */
  .pq-tabs {
    display: flex; gap: 0;
    border-bottom: 2px solid #e5e7eb;
    margin-bottom: 20px;
  }
  .pq-tab {
    padding: 9px 18px; border: none; background: none; cursor: pointer;
    font-size: 13px; font-weight: 600; font-family: 'DM Sans', sans-serif;
    color: #6b7280; border-bottom: 2.5px solid transparent; margin-bottom: -2px;
    transition: all .12s; display: flex; align-items: center; gap: 7px;
  }
  .pq-tab:hover { color: #374151; }
  .pq-tab.active { color: #111827; border-bottom-color: #111827; }
  .pq-tab-badge {
    font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 10px;
    background: #f3f4f6; color: #6b7280;
  }
  .pq-tab.active .pq-tab-badge { background: #111827; color: #fff; }

  /* ── Form panels ── */
  .pq-panel { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
  .pq-panel-head {
    padding: 9px 14px; background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    display: flex; align-items: center; gap: 8px;
  }
  .pq-panel-body { padding: 14px; display: flex; flex-direction: column; gap: 11px; }

  /* ── Inputs ── */
  .pq-inp, .pq-ro {
    width: 100%; padding: 8px 11px;
    border: 1px solid #d1d5db; border-radius: 7px;
    font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s;
  }
  .pq-inp::placeholder { color: #9ca3af; }
  .pq-inp:focus { border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12); }
  .pq-ro { background: #f9fafb; color: #6b7280; font-family: 'DM Mono', monospace; cursor: default; }
  .pq-ro.hi { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; font-weight: 600; }

  /* ── SearchDrop ── */
  .pq-sd-btn {
    width: 100%; padding: 8px 11px;
    border: 1px solid #d1d5db; border-radius: 7px;
    background: #fff; font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #9ca3af; cursor: pointer; outline: none;
    display: flex; align-items: center; justify-content: space-between; gap: 6px;
    transition: border-color .12s, box-shadow .12s;
  }
  .pq-sd-btn.sel { color: #111827; }
  .pq-sd-btn:focus, .pq-sd-btn.open { border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12); }
  .pq-sd-panel {
    position: absolute; left: 0; top: calc(100% + 3px);
    width: max(100%, 260px); z-index: 300;
    background: #fff; border: 1px solid #d1d5db;
    border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,.1); overflow: hidden;
  }
  .pq-sd-item {
    padding: 8px 12px; font-size: 13px; cursor: pointer;
    border-bottom: 1px solid #f9fafb; color: #111827; transition: background .08s;
  }
  .pq-sd-item:last-child { border-bottom: none; }
  .pq-sd-item:hover { background: #f3f4f6; }
  .pq-sd-item.sel { background: #f3f4f6; font-weight: 600; }

  /* ── Field label ── */
  .pq-lbl {
    display: flex; align-items: center; gap: 4px;
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: #6b7280; margin-bottom: 5px;
  }
  .pq-divider { height: 1px; background: #f3f4f6; margin: 2px 0; }

  /* ── Submit ── */
  .pq-submit {
    width: 100%; padding: 10px 0; border-radius: 7px; border: none;
    background: #111827; color: #fff; font-size: 13.5px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background .12s;
  }
  .pq-submit:hover:not(:disabled) { background: #1f2937; }
  .pq-submit:disabled { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; }

  /* ── View list ── */
  @keyframes pq-in { from{opacity:0;transform:translateY(3px)} to{opacity:1;transform:translateY(0)} }
  .pq-card {
    background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;
    transition: box-shadow .12s; animation: pq-in .16s ease both;
    border-left: 3px solid #f59e0b;
  }
  .pq-card:hover { box-shadow: 0 2px 10px rgba(0,0,0,.07); }
  .pq-card-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 16px; border-bottom: 1px solid #f3f4f6;
    gap: 10px; flex-wrap: wrap;
  }
  .pq-card-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; }
  .pq-cell {
    padding: 10px 14px; border-right: 1px solid #f3f4f6; border-bottom: 1px solid #f3f4f6;
  }
  .pq-cell:nth-child(4n)  { border-right: none; }
  .pq-cell:nth-last-child(-n+4) { border-bottom: none; }
  .pq-clbl { font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: #9ca3af; margin-bottom: 3px; }
  .pq-cval { font-size: 12.5px; font-weight: 600; color: #111827; }
  .pq-cval.mono { font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500; color: #374151; }
  .pq-card-foot {
    display: flex; align-items: center; justify-content: space-between;
    padding: 9px 16px; background: #fffbeb; border-top: 1px solid #fef3c7;
    gap: 10px; flex-wrap: wrap;
  }

  /* ── Buttons ── */
  .pq-btn-fulfil {
    display: inline-flex; align-items: center; gap: 6px;
    background: #111827; color: #fff; border: none;
    border-radius: 6px; padding: 6px 13px;
    font-size: 12px; font-weight: 600; font-family: 'DM Sans', sans-serif;
    cursor: pointer; transition: background .1s; white-space: nowrap;
  }
  .pq-btn-fulfil:hover { background: #1f2937; }
  .pq-btn-print {
    display: inline-flex; align-items: center; gap: 5px;
    background: #fff; color: #374151;
    border: 1px solid #d1d5db; border-radius: 6px; padding: 6px 11px;
    font-size: 12px; font-weight: 500; font-family: 'DM Sans', sans-serif;
    cursor: pointer; transition: all .1s; white-space: nowrap;
  }
  .pq-btn-print:hover { background: #f9fafb; border-color: #9ca3af; }
  .pq-btn-delete {
    display: inline-flex; align-items: center; gap: 5px;
    background: #fef2f2; color: #dc2626;
    border: 1px solid #fecaca; border-radius: 6px; padding: 6px 11px;
    font-size: 12px; font-weight: 500; font-family: 'DM Sans', sans-serif;
    cursor: pointer; transition: all .1s; white-space: nowrap;
  }
  .pq-btn-delete:hover { background: #fee2e2; }

  /* ── Search bar ── */
  .pq-search-wrap {
    background: #fff; border: 1px solid #e5e7eb; border-radius: 8px;
    padding: 10px 13px; display: flex; flex-wrap: wrap; gap: 9px;
    align-items: center; margin-bottom: 12px;
  }

  /* ── Skeleton ── */
  @keyframes pq-sh { to{background-position:-200% 0} }
  .pq-sk {
    border-radius: 4px; background: linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%);
    background-size: 200% 100%; animation: pq-sh 1.3s infinite;
  }

  /* ── Pending badge ── */
  .pq-pending {
    display: inline-flex; align-items: center; gap: 4px;
    background: #fffbeb; color: #b45309; border: 1px solid #fde68a;
    border-radius: 4px; padding: 2px 8px; font-size: 11px; font-weight: 700;
  }

  /* ── OB row ── */
  .pq-ob-row { display: grid; grid-template-columns: 1fr auto; gap: 8px; align-items: start; }
  .pq-ob-type { display: flex; border-radius: 7px; overflow: hidden; border: 1px solid #e2e8f0; }
  .pq-ob-btn { padding: 7px 11px; border: none; cursor: pointer; font-family: 'DM Sans',sans-serif; font-size: 12px; font-weight: 600; background: #fff; color: #94a3b8; transition: all .12s; white-space: nowrap; }
  .pq-ob-btn.active-add { background: #f0fdf4; color: #15803d; }
  .pq-ob-btn.active-ret { background: #fef2f2; color: #dc2626; }

  /* Notes box */
  .pq-notes-box {
    background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px;
    padding: 12px 14px; display: flex; justify-content: space-between; align-items: flex-start;
  }

  @media(max-width:900px) { .pq-form-grid { grid-template-columns:1fr!important; } .pq-card-grid { grid-template-columns:1fr 1fr; } }
`;

function formatVehicleNo(raw) {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (clean.length > 0 && /^[0-9]/.test(clean)) return "";
  const m = clean.match(/^[A-Z]+/);
  const letters = m ? m[0] : "";
  const nums = clean.slice(letters.length);
  if (!letters) return "";
  return nums ? `${letters}-${nums}` : letters;
}

function noSpin(e)  { e.target.blur(); }
function noArrow(e) { if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault(); }

function SearchDrop({ options, value, onChange, placeholder, labelKey = "label" }) {
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
  const sel = options.find(o => o._id === value);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button type="button" onClick={() => setOpen(o => !o)}
        className={`pq-sd-btn${sel ? " sel" : ""}${open ? " open" : ""}`}>
        <span style={{ flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", textAlign:"left" }}>
          {sel ? sel[labelKey] : placeholder}
        </span>
        <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2.5}
          style={{ flexShrink:0, transition:".15s", transform:open?"rotate(180deg)":"none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <div className="pq-sd-panel">
          <div style={{ padding:7, borderBottom:"1px solid #f3f4f6", background:"#f9fafb" }}>
            <input ref={inp} value={q} onChange={e => setQ(e.target.value)} placeholder="Search…"
              style={{ width:"100%", padding:"6px 9px", border:"1px solid #e5e7eb", borderRadius:6, fontSize:12.5, outline:"none", fontFamily:"'DM Sans',sans-serif" }}/>
          </div>
          <ul style={{ maxHeight:210, overflowY:"auto", margin:0, padding:0, listStyle:"none" }}>
            {filtered.length === 0
              ? <li style={{ padding:"9px 12px", fontSize:12.5, color:"#9ca3af", textAlign:"center" }}>No results</li>
              : filtered.map(o => (
                <li key={o._id} className={`pq-sd-item${o._id === value ? " sel" : ""}`}
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

function Fld({ label, children }) {
  return (
    <div style={{ display:"flex", flexDirection:"column" }}>
      <div className="pq-lbl">{label}</div>
      {children}
    </div>
  );
}

function Panel({ title, dot, children }) {
  return (
    <div className="pq-panel">
      <div className="pq-panel-head">
        <div style={{ width:7, height:7, borderRadius:"50%", background:dot, flexShrink:0 }}/>
        <span style={{ fontSize:10.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".08em", color:"#374151" }}>{title}</span>
      </div>
      <div className="pq-panel-body">{children}</div>
    </div>
  );
}

function getMillInfo() {
  return {
    name:    localStorage.getItem("businessName") || "Mill",
    logo:    localStorage.getItem("logoUrl")      || "",
  };
}

function buildPrintHTML(quot) {
  const mill = getMillInfo();
  const sr = String(quot.sr||"").padStart(4,"0");
  const logoHTML = mill.logo
    ? `<img src="${mill.logo}" alt="logo" style="height:40px;width:40px;object-fit:contain;border-radius:5px;padding:2px;"/>`
    : `<div style="width:40px;height:40px;border-radius:7px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;color:#fff;">${mill.name.charAt(0)}</div>`;

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Quotation #${sr}</title>
<style>
  @page{size:A5;margin:8mm}*{box-sizing:border-box;margin:0;padding:0}
  body{font-family:"Segoe UI",Arial,sans-serif;background:#fff;color:#111;font-size:10.5px}
  .wrap{max-width:128mm;margin:0 auto}
  .hd{background:#111827;padding:9px 12px;border-radius:7px 7px 0 0;display:flex;align-items:center;gap:10px}
  .hd-info{flex:1;min-width:0}.hd-name{font-size:13px;font-weight:800;color:#fff}
  .hd-right{text-align:right;flex-shrink:0}
  .hd-type{font-size:9px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#fbbf24;margin-bottom:3px}
  .hd-no{font-size:18px;font-weight:800;color:#fff;font-family:"Courier New",monospace}
  .hd-date{font-size:8px;color:rgba(255,255,255,.4);margin-top:2px}
  .meta{display:grid;grid-template-columns:1fr 1fr;border:1px solid #e5e7eb;border-top:none}
  .mc{padding:6px 9px;border-right:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6}
  .mc:nth-child(2n){border-right:none}.mc:nth-last-child(-n+2){border-bottom:none}
  .mc-l{font-size:7px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;margin-bottom:2px}
  .mc-v{font-size:11px;font-weight:600;color:#111}
  .pending-banner{background:#fffbeb;border:1px solid #fde68a;border-top:none;padding:7px 12px;text-align:center;font-size:11px;font-weight:700;color:#b45309;letter-spacing:.08em;text-transform:uppercase}
  .notes{margin-top:6px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:5px;padding:8px 10px;font-size:11px;color:#374151}
  .ft{display:flex;justify-content:space-between;margin-top:12px;padding-top:8px;border-top:1px dashed #e5e7eb;font-size:8px;color:#9ca3af}
  .sig-line{width:44%;text-align:center}.sig-line .line{border-top:1px solid #374151;padding-top:3px;margin-top:18px;font-size:7.5px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body><div class="wrap">
  <div class="hd">${logoHTML}<div class="hd-info"><div class="hd-name">${mill.name}</div></div>
  <div class="hd-right"><div class="hd-type">Quotation</div><div class="hd-no">#${sr}</div><div class="hd-date">${quot.date||"—"}</div></div></div>
  <div class="pending-banner">⏳ Pending — Awaiting Delivery &amp; Weighing</div>
  <div class="meta">
    <div class="mc"><div class="mc-l">Vendor</div><div class="mc-v">${quot.vendorName||"—"}</div></div>
    <div class="mc"><div class="mc-l">Vehicle No.</div><div class="mc-v">${quot.vehicleNumber||"—"}</div></div>
    <div class="mc"><div class="mc-l">Builty #</div><div class="mc-v">${quot.builtyNumber||"—"}</div></div>
    <div class="mc"><div class="mc-l">Product</div><div class="mc-v">${quot.productName||"—"}</div></div>
    <div class="mc"><div class="mc-l">Qty (Bags)</div><div class="mc-v">${quot.quantity||"—"}</div></div>
    <div class="mc"><div class="mc-l">Bag Status</div><div class="mc-v">${quot.bagStatus==="return"?"Bag Return":"Bag Added"}</div></div>
    <div class="mc"><div class="mc-l">Gross Wt.</div><div class="mc-v">${quot.grossWeight!=null?`${quot.grossWeight} kg`:"—"}</div></div>
  </div>
  ${quot.notes ? `<div class="notes"><strong>Notes:</strong> ${quot.notes}</div>` : ""}
  <div class="ft">
    <div class="sig-line"><div class="line">Supplier Confirmation</div></div>
    <div style="align-self:flex-end;font-size:7.5px;color:#d1d5db">Powered by Agro Plus</div>
    <div class="sig-line"><div class="line">Received By</div></div>
  </div>
</div><script>window.print()</script></body></html>`;
}

const g2  = { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 };
const nv  = v => isNaN(Number(v)) ? 0 : Number(v) || 0;
const fmtN = (v, d=2) => nv(v).toLocaleString("en-PK", { minimumFractionDigits:d, maximumFractionDigits:d });
const DIV  = <div className="pq-divider"/>;
const iProps = () => ({
  className: "pq-inp pq-no-spin",
  onWheel: noSpin, onKeyDown: noArrow,
});
const roProps = (hi=false) => ({ className:`pq-ro${hi?" hi":""}`, readOnly:true });

// ── Add Quotation Tab ─────────────────────────────────────────────────────────
function AddQuotationTab({ onAdded }) {
  const today = new Date().toISOString().split("T")[0];
  const [products,     setProducts]     = useState([]);
  const [vendors,      setVendors]      = useState([]);
  const [bagTypes,     setBagTypes]     = useState([]);
  const [millSettings, setMillSettings] = useState({ baseMoisture:0, weightCut:0 });
  const [quotationNo,  setQuotationNo]  = useState("");

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
  const [singleRate,   setSingleRate]   = useState("");
  const [notes,        setNotes]        = useState("");
  const [loading,      setLoading]      = useState(false);
  const [notification, setNotification] = useState({ message:"", type:"info" });

  const qty       = nv(quantity);
  const gross     = nv(grossWeight);
  const totalBagW = qty * bagWtPerBag;
  const baseMoist = nv(millSettings.baseMoisture);
  const weightCut = nv(millSettings.weightCut);
  const rawMoistAdj = moisturePct !== "" && nv(moisturePct) > baseMoist
    ? (nv(moisturePct) - baseMoist) * weightCut * qty : 0;
  const autoMoistAdj      = Math.round(rawMoistAdj);
  const effectiveMoistAdj = moistureOverride ? nv(moistureAdj) : autoMoistAdj;
  const bagDeduction      = bagStatus === "added" ? totalBagW : 0;
  const netWeightKg       = gross - bagDeduction - effectiveMoistAdj;
  const netWeightMaund    = netWeightKg > 0 ? netWeightKg / 40 : 0;
  const totalAmount       = netWeightMaund * nv(singleRate);
  const finalAmount       = totalAmount - nv(rentAdj);

  useEffect(() => {
    if (!moistureOverride) setMoistureAdj(String(autoMoistAdj));
  }, [moisturePct, qty, millSettings, moistureOverride]);

  useEffect(() => {
    Promise.all([
      authFetch(`${API_BASE_URL}/products?activeOnly=true`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/accounts?excludeProducts=true`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/profile/bag-types`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/profile/mill-settings`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/purchase-quotation/next-sr`).then(r => r.json()),
    ]).then(([pd, ad, bd, sd, nd]) => {
      if (pd.success) setProducts(pd.products.map(p => ({
        ...p, label: [p.productName, p.type, p.subType].filter(Boolean).join(" - "),
      })));
      const arr = Array.isArray(ad) ? ad : (ad.accounts || []);
      setVendors(arr.filter(a => a.category === "Supplier").map(a => ({ ...a, label: a.accountName })));
      if (bd.bagTypes) setBagTypes(bd.bagTypes.filter(b => b.isActive).map(b => ({
        ...b, label: `${b.bagTypeName} (${b.bagWeight} kg)`,
      })));
      if (sd.settings) setMillSettings(sd.settings);
      if (nd.success && nd.nextSr) setQuotationNo(String(nd.nextSr));
    });
  }, []);

  const resetForm = () => {
    setDate(today); setVehicleNo(""); setBuiltyNo("");
    setVendorId(""); setVendorName(""); setProductId(""); setProductName("");
    setBagStatus("added"); setQuantity(""); setGrossWeight("");
    setBagTypeId(""); setBagTypeName(""); setBagWtPerBag(0);
    setMoisturePct(""); setMoistureOverride(false); setMoistureAdj("");
    setRentAdj(""); setSingleRate(""); setNotes("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        date, vendorName, vendorAccountId: vendorId || undefined,
        vehicleNumber: vehicleNo, builtyNumber: builtyNo,
        productId: productId || undefined, productName,
        bagStatus, quantity: qty || null, grossWeight: gross || null,
        bagTypeId: bagTypeId || undefined, bagTypeName, bagWeightPerBag: bagWtPerBag || null,
        totalBagWeight: totalBagW || null,
        moisturePercent: nv(moisturePct) || null,
        baseMoisture: baseMoist, weightCut,
        moistureAdjustment: effectiveMoistAdj || null,
        moistureOverride,
        netWeightKg:    netWeightKg    > 0 ? netWeightKg    : null,
        netWeightMaund: netWeightMaund > 0 ? netWeightMaund : null,
        rateRows: singleRate ? [{ maund: netWeightMaund, rate: nv(singleRate), amount: totalAmount }] : [],
        totalAmount:    totalAmount    > 0 ? totalAmount    : null,
        rentAdjustment: nv(rentAdj)   > 0 ? nv(rentAdj)   : null,
        finalAmount:    finalAmount    > 0 ? finalAmount    : null,
        notes,
      };
      const res  = await authFetch(`${API_BASE_URL}/purchase-quotation/create`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setNotification({ message: data.message, type:"success" });
        resetForm();
        // Refresh quotation number
        authFetch(`${API_BASE_URL}/purchase-quotation/next-sr`).then(r=>r.json())
          .then(d => { if (d.success) setQuotationNo(String(d.nextSr)); });
        onAdded?.();
      } else {
        setNotification({ message: data.message || "Failed to create quotation.", type:"error" });
      }
    } catch {
      setNotification({ message:"Server error.", type:"error" });
    } finally { setLoading(false); }
  };

  return (
    <>
      <Notification message={notification.message} type={notification.type}
        onClose={() => setNotification({ message:"", type:"info" })}/>


      <form onSubmit={handleSubmit}>
        <div className="pq-form-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, alignItems:"start" }}>

          {/* Panel 1 */}
          <Panel title="Dealer Information" dot="#3b82f6">
            <div style={g2}>
              <Fld label="Date">
                <input type="date" value={date} max={today}
                  onChange={e => setDate(e.target.value)} {...iProps()}/>
              </Fld>
              <Fld label="Quotation #">
                <input value={quotationNo ? `#${String(quotationNo).padStart(4,"0")}` : "—"} {...roProps()}/>
              </Fld>
            </div>
            <div style={g2}>
              <Fld label="Vehicle No.">
                <input value={vehicleNo} onChange={e => setVehicleNo(formatVehicleNo(e.target.value))}
                  placeholder="e.g. LEA-1234" {...iProps()}/>
              </Fld>
              <Fld label="Builty No.">
                <input value={builtyNo} onChange={e => setBuiltyNo(e.target.value)}
                  placeholder="e.g. B-001" {...iProps()}/>
              </Fld>
            </div>

            <Fld label="Vendor / Supplier">
              <SearchDrop options={vendors} value={vendorId} labelKey="label"
                placeholder="Select vendor…"
                onChange={v => { setVendorId(v._id); setVendorName(v.accountName); }}/>
            </Fld>
            <Fld label="Product">
              <SearchDrop options={products} value={productId} labelKey="label"
                placeholder="Select product…"
                onChange={p => { setProductId(p._id); setProductName([p.productName, p.type, p.subType].filter(Boolean).join(" - ")); }}/>
            </Fld>
            <Fld label="Bag Status">
              <div style={{ display:"flex", gap:7 }}>
                {[["added","Bag Added"],["return","Bag Return"]].map(([s,lbl]) => (
                  <button key={s} type="button" onClick={() => setBagStatus(s)}
                    style={{ flex:1, padding:"8px 0", borderRadius:7, cursor:"pointer", border:`1px solid ${bagStatus===s?"#111827":"#e5e7eb"}`, background:bagStatus===s?"#111827":"#fff", color:bagStatus===s?"#fff":"#6b7280", fontSize:12.5, fontWeight:500, fontFamily:"'DM Sans',sans-serif", transition:"all .1s" }}>
                    {lbl}
                  </button>
                ))}
              </div>
            </Fld>
            <Fld label="Quantity (Bags)">
              <input type="number" min="0" value={quantity} onChange={e => setQuantity(e.target.value)}
                placeholder="0" {...iProps()}/>
            </Fld>
          </Panel>

          {/* Panel 2 */}
          <Panel title="Weight & Moisture" dot="#f59e0b">
            <Fld label="Gross Weight (kg)">
              <input type="number" min="0" step="0.01" value={grossWeight}
                onChange={e => setGrossWeight(e.target.value)} placeholder="0.00" {...iProps()}/>
            </Fld>
            <div style={g2}>
              <Fld label="Bag Type">
                <SearchDrop options={bagTypes} value={bagTypeId} labelKey="label"
                  placeholder="Select bag type…"
                  onChange={b => { setBagTypeId(b._id); setBagTypeName(b.bagTypeName); setBagWtPerBag(b.bagWeight); }}/>
              </Fld>
              <Fld label="Bag Wt / Bag">
                <input value={bagWtPerBag ? `${bagWtPerBag} kg` : "—"} {...roProps()}/>
              </Fld>
            </div>
            <div style={g2}>
              <Fld label="Total Bag Weight">
                <input value={qty && bagWtPerBag ? `${fmtN(totalBagW)} kg` : "—"} {...roProps()}/>
              </Fld>
              <Fld label="Bag Deduction">
                <input value={bagStatus==="added" ? (qty && bagWtPerBag ? `− ${fmtN(totalBagW)} kg` : "—") : "None"} {...roProps()}/>
              </Fld>
            </div>
            {DIV}
            <div style={g2}>
              <Fld label="Moisture %">
                <input type="number" min="0" step="0.01" value={moisturePct}
                  onChange={e => setMoisturePct(e.target.value)}
                  placeholder={`Base: ${millSettings.baseMoisture}%`} {...iProps()}/>
              </Fld>
              <Fld label="Moisture Adj. (kg)">
                <div style={{ position:"relative" }}>
                  <input type="number" step="1" value={moistureAdj}
                    readOnly={!moistureOverride}
                    onChange={e => moistureOverride && setMoistureAdj(e.target.value)}
                    className={`pq-no-spin${moistureOverride?" pq-inp":" pq-ro"}`}
                    style={{ width:"100%", padding:"8px 64px 8px 11px", border:"1px solid #d1d5db", borderRadius:7, fontSize:13, fontFamily:moistureOverride?"'DM Sans',sans-serif":"'DM Mono',monospace", outline:"none", background:moistureOverride?"#fff":"#f9fafb", color:moistureOverride?"#111827":"#6b7280" }}/>
                  <button type="button" onClick={() => setMoistureOverride(o=>!o)}
                    style={{ position:"absolute", right:6, top:"50%", transform:"translateY(-50%)", padding:"2px 7px", borderRadius:5, border:"1px solid #e5e7eb", background:moistureOverride?"#fef9c3":"#f9fafb", color:moistureOverride?"#92400e":"#9ca3af", fontSize:10, fontWeight:600, cursor:"pointer" }}>
                    {moistureOverride?"Manual":"Auto"}
                  </button>
                </div>
              </Fld>
            </div>
            {DIV}
            <div style={g2}>
              <Fld label="Net Weight (kg)">
                <input value={netWeightKg > 0 ? fmtN(netWeightKg) : "—"} {...roProps(netWeightKg > 0)}/>
              </Fld>
              <Fld label="Net Weight (Maund)">
                <input value={netWeightMaund > 0 ? netWeightMaund.toFixed(4) : "—"} {...roProps()}/>
              </Fld>
            </div>
          </Panel>

          {/* Panel 3 */}
          <Panel title="Pricing & Notes" dot="#10b981">
            <Fld label="Rate / 40 kg (Rs.)">
              <input type="number" min="0" step="0.01" value={singleRate}
                onChange={e => setSingleRate(e.target.value)} placeholder="0.00 (optional)" {...iProps()}/>
            </Fld>
            <div style={g2}>
              <Fld label="Net Maund (auto)">
                <input value={netWeightMaund > 0 ? netWeightMaund.toFixed(4) : "—"} {...roProps()}/>
              </Fld>
              <Fld label="Amount (Rs.)">
                <input value={totalAmount > 0 ? fmtN(totalAmount) : "—"} {...roProps()}/>
              </Fld>
            </div>
            {DIV}
            <div style={g2}>
              <Fld label="Total Amount (Rs)">
                <input value={totalAmount > 0 ? fmtN(totalAmount) : "—"} {...roProps()}/>
              </Fld>
              <Fld label="Rent Adjustment (Rs)">
                <input type="number" min="0" step="0.01" value={rentAdj}
                  onChange={e => setRentAdj(e.target.value)} placeholder="0.00" {...iProps()}/>
              </Fld>
            </div>
            {DIV}
            <Fld label="Quotation Notes">
              <textarea value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="e.g. Coming from Lahore, expected 2 days, quality: Grade A…"
                rows={4}
                style={{ width:"100%", padding:"8px 11px", border:"1px solid #d1d5db", borderRadius:7, fontSize:13, fontFamily:"'DM Sans',sans-serif", outline:"none", resize:"vertical", color:"#111827", transition:"border-color .12s" }}
                onFocus={e => { e.target.style.borderColor="#6b7280"; e.target.style.boxShadow="0 0 0 2px rgba(107,114,128,.12)"; }}
                onBlur={e => { e.target.style.borderColor="#d1d5db"; e.target.style.boxShadow="none"; }}/>
            </Fld>
            <button type="submit" disabled={loading} className="pq-submit">
              {loading ? "Saving…" : (
                <>
                  <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  Add Quotation
                </>
              )}
            </button>
          </Panel>
        </div>
      </form>
    </>
  );
}

// ── View Quotations Tab ───────────────────────────────────────────────────────
function ViewQuotationsTab({ refreshKey }) {
  const navigate = useNavigate();
  const [quotations,  setQuotations]  = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [search,      setSearch]      = useState("");
  const [notification,setNotification]= useState({ message:"", type:"info" });

  const load = async () => {
    setLoading(true);
    try {
      const r = await authFetch(`${API_BASE_URL}/purchase-quotation`);
      const d = await r.json();
      if (d.success) setQuotations(d.quotations);
    } catch { /* silent */ }
    setLoading(false);
  };

  useEffect(() => { load(); }, [refreshKey]);

  const filtered = quotations.filter(q => {
    if (!search) return true;
    const s = search.toLowerCase();
    return [q.vendorName, q.vehicleNumber, q.builtyNumber, q.productName, String(q.sr)]
      .some(v => v && String(v).toLowerCase().includes(s));
  });

  const handleDelete = async (id, sr) => {
    if (!window.confirm(`Delete Quotation #${String(sr).padStart(4,"0")}? This cannot be undone.`)) return;
    try {
      const r = await authFetch(`${API_BASE_URL}/purchase-quotation/${id}`, { method:"DELETE" });
      const d = await r.json();
      if (d.success) {
        setNotification({ message:"Quotation deleted.", type:"success" });
        setQuotations(p => p.filter(q => q._id !== id));
      } else {
        setNotification({ message: d.message||"Failed.", type:"error" });
      }
    } catch {
      setNotification({ message:"Server error.", type:"error" });
    }
  };

  const handleFulfil = (quotation) => {
    navigate("/add-invoice-purchase", { state: { fromQuotation: quotation } });
  };

  const openPrint = (q) => {
    const w = window.open("", "_blank");
    if (w) { w.document.write(buildPrintHTML(q)); w.document.close(); }
  };

  const CellVal = ({ label, value, mono }) => (
    <div className="pq-cell">
      <div className="pq-clbl">{label}</div>
      <div className={`pq-cval${mono?" mono":""}`}>
        {value != null && value !== "" ? value : <span style={{ color:"#e5e7eb" }}>—</span>}
      </div>
    </div>
  );

  return (
    <>
      <Notification message={notification.message} type={notification.type}
        onClose={() => setNotification({ message:"", type:"info" })}/>

      <div className="pq-search-wrap">
        <div style={{ position:"relative", flex:1, minWidth:220 }}>
          <svg style={{ position:"absolute", left:9, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}
            width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
            <circle cx={11} cy={11} r={8}/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
          </svg>
          <input className="pq-inp" style={{ paddingLeft:30 }}
            placeholder="Search vendor, vehicle, driver, product…"
            value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        {search && (
          <button onClick={() => setSearch("")}
            style={{ padding:"6px 11px", border:"1px solid #fecaca", borderRadius:6, background:"#fef2f2", fontSize:11.5, fontWeight:600, color:"#dc2626", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
            Clear ✕
          </button>
        )}
        <span style={{ fontSize:11.5, fontFamily:"'DM Mono',monospace", color:"#6b7280", background:"#f3f4f6", border:"1px solid #e5e7eb", borderRadius:6, padding:"5px 11px" }}>
          {filtered.length}{filtered.length !== quotations.length && ` / ${quotations.length}`} quotation{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {loading ? (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {[...Array(3)].map((_,i) => (
            <div key={i} style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, overflow:"hidden", borderLeft:"3px solid #fde68a" }}>
              <div style={{ padding:"12px 16px", borderBottom:"1px solid #f3f4f6", display:"flex", justifyContent:"space-between", gap:10 }}>
                <div style={{ display:"flex", gap:10 }}>
                  {[90,70,140,100].map((w,j) => <div key={j} className="pq-sk" style={{ height:18, width:w, borderRadius:5 }}/>)}
                </div>
                <div className="pq-sk" style={{ height:30, width:90, borderRadius:6 }}/>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
                {[...Array(8)].map((_,j) => (
                  <div key={j} style={{ padding:"10px 14px", borderRight:j%4!==3?"1px solid #f3f4f6":"none", borderBottom:j<4?"1px solid #f3f4f6":"none" }}>
                    <div className="pq-sk" style={{ width:"50%", height:9, marginBottom:7 }}/>
                    <div className="pq-sk" style={{ width:"80%", height:13 }}/>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign:"center", padding:"56px 0", background:"#fff", border:"1px solid #e5e7eb", borderRadius:8 }}>
          <div style={{ fontSize:36, marginBottom:12 }}>📋</div>
          <p style={{ fontSize:13.5, fontWeight:600, color:"#374151", margin:"0 0 4px" }}>
            {quotations.length === 0 ? "No pending quotations" : "No results found"}
          </p>
          <p style={{ fontSize:12.5, color:"#9ca3af" }}>
            {quotations.length === 0 ? "Quotations will appear here once added." : "Try adjusting your search."}
          </p>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {filtered.map((q, idx) => (
            <div key={q._id} className="pq-card" style={{ animationDelay:`${idx*.04}s` }}>
              {/* head */}
              <div className="pq-card-head">
                <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                  <div style={{ display:"flex", alignItems:"baseline", gap:5 }}>
                    <span style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".07em" }}>Quotation</span>
                    <span style={{ fontSize:16, fontWeight:700, color:"#111827", fontFamily:"'DM Mono',monospace" }}>
                      #{String(q.sr||"").padStart(4,"0")}
                    </span>
                  </div>
                  <div style={{ width:1, height:14, background:"#e5e7eb" }}/>
                  <span style={{ fontSize:12.5, color:"#6b7280" }}>{q.date || "No date"}</span>
                  <span className="pq-pending">⏳ Pending</span>
                  {q.productName && (
                    <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 9px", borderRadius:4, fontSize:11.5, fontWeight:600, background:"#f3f4f6", color:"#374151", border:"1px solid #e5e7eb", fontFamily:"'DM Mono',monospace", whiteSpace:"nowrap" }}>
                      {q.productName}
                    </span>
                  )}
                  {q.notes && (
                    <span style={{ fontSize:11.5, color:"#b45309", background:"#fffbeb", border:"1px solid #fde68a", borderRadius:4, padding:"2px 8px", maxWidth:220, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      📝 {q.notes}
                    </span>
                  )}
                </div>
                <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                  <button className="pq-btn-print" onClick={() => openPrint(q)}>
                    <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                    </svg>
                    Print
                  </button>
                  <button className="pq-btn-delete" onClick={() => handleDelete(q._id, q.sr)}>
                    <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    Delete
                  </button>
                  <button className="pq-btn-fulfil" onClick={() => handleFulfil(q)}>
                    <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Fulfil Invoice
                  </button>
                </div>
              </div>

              {/* data grid */}
              <div className="pq-card-grid">
                <CellVal label="Vendor"          value={q.vendorName}/>
                <CellVal label="Vehicle No."     value={q.vehicleNumber} mono/>
                <CellVal label="Builty #"        value={q.builtyNumber} mono/>
                <CellVal label="Qty (Bags)"      value={q.quantity} mono/>
                <CellVal label="Gross Wt. (kg)"  value={q.grossWeight != null ? `${q.grossWeight} kg` : null} mono/>
                <CellVal label="Moisture %"      value={q.moisturePercent != null ? `${q.moisturePercent}%` : null} mono/>
                <CellVal label="Bag Type"        value={q.bagTypeName}/>
              </div>

              {/* footer */}
              <div className="pq-card-foot">
                <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
                  {q.netWeightMaund > 0 && (
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", marginBottom:1 }}>Net Maund</div>
                      <div style={{ fontSize:13, fontWeight:700, color:"#15803d", fontFamily:"'DM Mono',monospace" }}>{Number(q.netWeightMaund).toFixed(4)} Mn</div>
                    </div>
                  )}
                  {q.finalAmount > 0 && (
                    <>
                      {q.netWeightMaund > 0 && <div style={{ width:1, height:22, background:"#fde68a" }}/>}
                      <div>
                        <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", marginBottom:1 }}>Est. Amount</div>
                        <div style={{ fontSize:13, fontWeight:700, color:"#374151", fontFamily:"'DM Mono',monospace" }}>Rs {fmtN(q.finalAmount)}</div>
                      </div>
                    </>
                  )}
                  <div style={{ fontSize:11, color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>
                    Added {new Date(q.createdAt).toLocaleDateString("en-PK")}
                  </div>
                </div>
                <div style={{ fontSize:11.5, color:"#b45309", fontWeight:600 }}>
                  Click "Fulfil Invoice" to complete &amp; convert →
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <p style={{ textAlign:"center", color:"#9ca3af", fontSize:11.5, marginTop:14, fontFamily:"'DM Mono',monospace" }}>
          {filtered.length} quotation{filtered.length !== 1 ? "s" : ""} pending
          {search ? ` · filtered from ${quotations.length} total` : ""}
        </p>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function PurchaseQuotation() {
  const [activeTab, setActiveTab] = useState("add");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdded = () => {
    setRefreshKey(k => k + 1);
    // Stay on add tab but the view count will refresh when switching
  };

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>

      <div className="pq-wrap">
        {/* Header */}
        <div style={{ marginBottom:18 }}>
          <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 3px" }}>Procurement</p>
          <h1 style={{ fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px", margin:0 }}>
            Purchase Quotations
          </h1>
          <p style={{ fontSize:12.5, color:"#6b7280", margin:"4px 0 0" }}>
            Record Partial Delivery Info
          </p>
        </div>

        {/* Tab nav */}
        <div className="pq-tabs">
          <button className={`pq-tab${activeTab==="add"?" active":""}`} onClick={() => setActiveTab("add")}>
            <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            Add Quotation
          </button>
          <button className={`pq-tab${activeTab==="view"?" active":""}`} onClick={() => setActiveTab("view")}>
            <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            View Quotations
          </button>
        </div>

        {activeTab === "add"  && <AddQuotationTab   onAdded={handleAdded}/>}
        {activeTab === "view" && <ViewQuotationsTab refreshKey={refreshKey}/>}
      </div>
    </SidebarLayout>
  );
}