// src/components/invoice/SalesQuotation.jsx
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
  .pq-tabs { display:flex; gap:0; border-bottom:2px solid #e5e7eb; margin-bottom:20px; }
  .pq-tab {
    padding:9px 18px; border:none; background:none; cursor:pointer;
    font-size:13px; font-weight:600; font-family:'DM Sans',sans-serif;
    color:#6b7280; border-bottom:2.5px solid transparent; margin-bottom:-2px;
    transition:all .12s; display:flex; align-items:center; gap:7px;
  }
  .pq-tab:hover { color:#374151; }
  .pq-tab.active { color:#111827; border-bottom-color:#111827; }
  .pq-tab-badge {
    font-size:10px; font-weight:700; padding:1px 6px; border-radius:10px;
    background:#f3f4f6; color:#6b7280;
  }
  .pq-tab.active .pq-tab-badge { background:#111827; color:#fff; }

  /* ── Form panels ── */
  .pq-panel { background:#fff; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; }
  .pq-panel-head {
    padding:9px 14px; background:#f9fafb; border-bottom:1px solid #e5e7eb;
    display:flex; align-items:center; gap:8px;
  }
  .pq-panel-body { padding:14px; display:flex; flex-direction:column; gap:11px; }

  /* ── Inputs ── */
  .pq-inp, .pq-ro {
    width:100%; padding:8px 11px;
    border:1px solid #d1d5db; border-radius:7px;
    font-size:13px; font-family:'DM Sans',sans-serif;
    color:#111827; background:#fff; outline:none;
    transition:border-color .12s, box-shadow .12s;
  }
  .pq-inp::placeholder { color:#9ca3af; }
  .pq-inp:focus { border-color:#6b7280; box-shadow:0 0 0 2px rgba(107,114,128,.12); }
  .pq-ro { background:#f9fafb; color:#6b7280; font-family:'DM Mono',monospace; cursor:default; }
  .pq-ro.hi { background:#f0fdf4; color:#15803d; border-color:#bbf7d0; font-weight:600; }

  /* ── SearchDrop ── */
  .pq-sd-btn {
    width:100%; padding:8px 11px;
    border:1px solid #d1d5db; border-radius:7px;
    background:#fff; font-size:13px; font-family:'DM Sans',sans-serif;
    color:#9ca3af; cursor:pointer; outline:none;
    display:flex; align-items:center; justify-content:space-between; gap:6px;
    transition:border-color .12s, box-shadow .12s;
  }
  .pq-sd-btn.sel { color:#111827; }
  .pq-sd-btn:focus, .pq-sd-btn.open { border-color:#6b7280; box-shadow:0 0 0 2px rgba(107,114,128,.12); }
  .pq-sd-panel {
    position:absolute; left:0; top:calc(100% + 3px);
    width:max(100%, 260px); z-index:300;
    background:#fff; border:1px solid #d1d5db;
    border-radius:8px; box-shadow:0 4px 16px rgba(0,0,0,.1); overflow:hidden;
  }
  .pq-sd-item {
    padding:8px 12px; font-size:13px; cursor:pointer;
    border-bottom:1px solid #f9fafb; color:#111827; transition:background .08s;
  }
  .pq-sd-item:last-child { border-bottom:none; }
  .pq-sd-item:hover { background:#f3f4f6; }
  .pq-sd-item.sel { background:#f3f4f6; font-weight:600; }

  /* ── Field label ── */
  .pq-lbl {
    display:flex; align-items:center; gap:4px;
    font-size:10px; font-weight:700; text-transform:uppercase;
    letter-spacing:.07em; color:#6b7280; margin-bottom:5px;
  }
  .pq-divider { height:1px; background:#f3f4f6; margin:2px 0; }

  /* ── Submit ── */
  .pq-submit {
    width:100%; padding:10px 0; border-radius:7px; border:none;
    background:#111827; color:#fff; font-size:13.5px; font-weight:600;
    font-family:'DM Sans',sans-serif; cursor:pointer;
    display:flex; align-items:center; justify-content:center; gap:8px;
    transition:background .12s;
  }
  .pq-submit:hover:not(:disabled) { background:#1f2937; }
  .pq-submit:disabled { background:#f3f4f6; color:#9ca3af; cursor:not-allowed; }

  /* ── View list cards ── */
  @keyframes pq-in { from{opacity:0;transform:translateY(3px)} to{opacity:1;transform:translateY(0)} }
  .pq-card {
    background:#fff; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;
    transition:box-shadow .12s; animation:pq-in .16s ease both;
    border-left:3px solid #10b981;
  }
  .pq-card:hover { box-shadow:0 2px 10px rgba(0,0,0,.07); }
  .pq-card-head {
    display:flex; align-items:center; justify-content:space-between;
    padding:12px 16px; border-bottom:1px solid #f3f4f6;
    gap:10px; flex-wrap:wrap;
  }
  .pq-card-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
  .pq-cell {
    padding:10px 14px; border-right:1px solid #f3f4f6; border-bottom:1px solid #f3f4f6;
  }
  .pq-cell:nth-child(4n)       { border-right:none; }
  .pq-cell:nth-last-child(-n+4){ border-bottom:none; }
  .pq-clbl { font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:#9ca3af; margin-bottom:3px; }
  .pq-cval { font-size:12.5px; font-weight:600; color:#111827; }
  .pq-cval.mono { font-family:'DM Mono',monospace; font-size:12px; font-weight:500; color:#374151; }
  .pq-card-foot {
    display:flex; align-items:center; justify-content:space-between;
    padding:9px 16px; background:#f0fdf4; border-top:1px solid #bbf7d0;
    gap:10px; flex-wrap:wrap;
  }

  /* ── Action buttons ── */
  .pq-btn-fulfil {
    display:inline-flex; align-items:center; gap:6px;
    background:#111827; color:#fff; border:none;
    border-radius:6px; padding:6px 13px;
    font-size:12px; font-weight:600; font-family:'DM Sans',sans-serif;
    cursor:pointer; transition:background .1s; white-space:nowrap;
  }
  .pq-btn-fulfil:hover { background:#1f2937; }
  .pq-btn-print {
    display:inline-flex; align-items:center; gap:5px;
    background:#fff; color:#374151;
    border:1px solid #d1d5db; border-radius:6px; padding:6px 11px;
    font-size:12px; font-weight:500; font-family:'DM Sans',sans-serif;
    cursor:pointer; transition:all .1s; white-space:nowrap;
  }
  .pq-btn-print:hover { background:#f9fafb; border-color:#9ca3af; }
  .pq-btn-delete {
    display:inline-flex; align-items:center; gap:5px;
    background:#fef2f2; color:#dc2626;
    border:1px solid #fecaca; border-radius:6px; padding:6px 11px;
    font-size:12px; font-weight:500; font-family:'DM Sans',sans-serif;
    cursor:pointer; transition:all .1s; white-space:nowrap;
  }
  .pq-btn-delete:hover { background:#fee2e2; }

  /* ── Search bar ── */
  .pq-search-wrap {
    background:#fff; border:1px solid #e5e7eb; border-radius:8px;
    padding:10px 13px; display:flex; flex-wrap:wrap; gap:9px;
    align-items:center; margin-bottom:12px;
  }

  /* ── Skeleton ── */
  @keyframes pq-sh { to{background-position:-200% 0} }
  .pq-sk {
    border-radius:4px; background:linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%);
    background-size:200% 100%; animation:pq-sh 1.3s infinite;
  }

  /* ── Pending badge ── */
  .pq-pending {
    display:inline-flex; align-items:center; gap:4px;
    background:#f0fdf4; color:#059669; border:1px solid #bbf7d0;
    border-radius:4px; padding:2px 8px; font-size:11px; font-weight:700;
  }

  @media(max-width:900px) { .pq-form-grid { grid-template-columns:1fr!important; } .pq-card-grid { grid-template-columns:1fr 1fr; } }
`;

// ── Helpers ───────────────────────────────────────────────────────────────────
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
const nv  = v => isNaN(Number(v)) ? 0 : Number(v) || 0;
const fmtN = (v, d=2) => nv(v).toLocaleString("en-PK", { minimumFractionDigits:d, maximumFractionDigits:d });
const g2  = { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 };
const DIV  = <div className="pq-divider"/>;
const iProps = () => ({ className:"pq-inp pq-no-spin", onWheel:noSpin, onKeyDown:noArrow });
const roProps = (hi=false) => ({ className:`pq-ro${hi?" hi":""}`, readOnly:true });

// ── SearchDrop ────────────────────────────────────────────────────────────────
function SearchDrop({ options, value, onChange, placeholder, labelKey="label" }) {
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
    <div ref={ref} style={{ position:"relative" }}>
      <button type="button" onClick={() => setOpen(o => !o)}
        className={`pq-sd-btn${sel?" sel":""}${open?" open":""}`}>
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
                <li key={o._id} className={`pq-sd-item${o._id===value?" sel":""}`}
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
    name: localStorage.getItem("businessName") || "Mill",
    logo: localStorage.getItem("logoUrl")      || "",
  };
}

// ── Print HTML builder ────────────────────────────────────────────────────────
function buildPrintHTML(quot) {
  const mill = getMillInfo();
  const sr = String(quot.sr||"").padStart(4,"0");
  const logoHTML = mill.logo
    ? `<img src="${mill.logo}" alt="logo" style="height:40px;width:40px;object-fit:contain;border-radius:5px;padding:2px;"/>`
    : `<div style="width:40px;height:40px;border-radius:7px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;color:#fff;">${mill.name.charAt(0)}</div>`;

  const maund       = Number(quot.netWeight40||0).toFixed(4);
  const finalAmt    = quot.totalAmount2 || quot.totalWithBardana || quot.totalAmount || 0;
  const hasAmt      = finalAmt > 0;

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Sales Quotation #${sr}</title>
<style>
  @page{size:A5;margin:8mm}*{box-sizing:border-box;margin:0;padding:0}
  body{font-family:"Segoe UI",Arial,sans-serif;background:#fff;color:#111;font-size:10.5px}
  .wrap{max-width:128mm;margin:0 auto}
  .hd{background:#111827;padding:9px 12px;border-radius:7px 7px 0 0;display:flex;align-items:center;gap:10px}
  .hd-info{flex:1;min-width:0}.hd-name{font-size:13px;font-weight:800;color:#fff}
  .hd-right{text-align:right;flex-shrink:0}
  .hd-type{font-size:9px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#4ade80;margin-bottom:3px}
  .hd-no{font-size:18px;font-weight:800;color:#fff;font-family:"Courier New",monospace}
  .hd-date{font-size:8px;color:rgba(255,255,255,.4);margin-top:2px}
  .meta{display:grid;grid-template-columns:1fr 1fr;border:1px solid #e5e7eb;border-top:none}
  .mc{padding:6px 9px;border-right:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6}
  .mc:nth-child(2n){border-right:none}.mc:nth-last-child(-n+2){border-bottom:none}
  .mc-l{font-size:7px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;margin-bottom:2px}
  .mc-v{font-size:11px;font-weight:600;color:#111}
  .pending-banner{background:#f0fdf4;border:1px solid #bbf7d0;border-top:none;padding:7px 12px;text-align:center;font-size:11px;font-weight:700;color:#059669;letter-spacing:.08em;text-transform:uppercase}
  table{width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-top:none;font-size:10.5px}
  th{background:#f9fafb;padding:5px 8px;text-align:left;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#6b7280}
  td{padding:5px 8px;border-top:1px solid #f3f4f6}
  tr.sub td{background:#f9fafb;font-weight:700}
  tr.red td{color:#dc2626}
  .notes{margin-top:6px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:5px;padding:8px 10px;font-size:11px;color:#374151}
  .ft{display:flex;justify-content:space-between;margin-top:12px;padding-top:8px;border-top:1px dashed #e5e7eb;font-size:8px;color:#9ca3af}
  .sig-line{width:44%;text-align:center}.sig-line .line{border-top:1px solid #374151;padding-top:3px;margin-top:18px;font-size:7.5px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body><div class="wrap">
  <div class="hd">${logoHTML}<div class="hd-info"><div class="hd-name">${mill.name}</div></div>
  <div class="hd-right"><div class="hd-type">Sales Quotation</div><div class="hd-no">#${sr}</div><div class="hd-date">${quot.date||"—"}</div></div></div>
  <div class="pending-banner">⏳ Pending — Awaiting Dispatch &amp; Confirmation</div>
  <div class="meta">
    <div class="mc"><div class="mc-l">Customer</div><div class="mc-v">${quot.vendorName||"—"}</div></div>
    <div class="mc"><div class="mc-l">Vehicle No.</div><div class="mc-v">${quot.vehicleNo||"—"}</div></div>
    <div class="mc"><div class="mc-l">Builty #</div><div class="mc-v">${quot.builtyNo||"—"}</div></div>
    <div class="mc"><div class="mc-l">Broker</div><div class="mc-v">${quot.brokerName||"—"}</div></div>
    <div class="mc"><div class="mc-l">Product</div><div class="mc-v">${quot.paddyType||quot.productName||"—"}</div></div>
    <div class="mc"><div class="mc-l">Qty (Bags)</div><div class="mc-v">${quot.quantity||"—"}</div></div>
  </div>
  <table>
    <tr><th>Description</th><th style="text-align:right">Value</th></tr>
    <tr><td>Gross Weight</td><td style="text-align:right">${Number(quot.weight||0).toFixed(2)} kg</td></tr>
    <tr><td>Bag Deduction</td><td style="text-align:right">− ${Number(quot.bagWeight||0).toFixed(2)} kg</td></tr>
    <tr class="sub"><td>Net Weight</td><td style="text-align:right">${Number(quot.netWeight||0).toFixed(2)} kg · ${maund} Mn</td></tr>
    ${quot.rate40>0?`<tr><td>Rate / 40 kg</td><td style="text-align:right">Rs ${Number(quot.rate40||0).toLocaleString("en-PK")}</td></tr>`:""}
    ${quot.amount>0?`<tr><td>Amount</td><td style="text-align:right">Rs ${Number(quot.amount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
    ${Number(quot.sutliSilaiRate||0)>0?`<tr><td>Sutli / Silai (Rs ${Number(quot.sutliSilaiRate||0)} × ${Number(quot.quantity||0)} bags)</td><td style="text-align:right">Rs ${Number(quot.sutliSilaiAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
    ${Number(quot.bardanaRate||0)>0?`<tr><td>Bardana (Rs ${Number(quot.bardanaRate)} × ${Number(quot.quantity||0)} bags)</td><td style="text-align:right">Rs ${Number(quot.bardanaAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
    ${Number(quot.brokeryRate||0)>0?`<tr class="red"><td>− Brokery (${maund} Mn × Rs ${Number(quot.brokeryRate||0)})</td><td style="text-align:right">− Rs ${Number(quot.brokery||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
    ${hasAmt?`<tr class="sub"><td>FINAL AMOUNT</td><td style="text-align:right;font-size:13px;color:#059669">Rs ${Number(finalAmt).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
  </table>
  ${quot.notes?`<div class="notes"><strong>Notes:</strong> ${quot.notes}</div>`:""}
  <div class="ft">
    <div class="sig-line"><div class="line">Customer Confirmation</div></div>
    <div style="align-self:flex-end;font-size:7.5px;color:#d1d5db">Powered by Agro Plus</div>
    <div class="sig-line"><div class="line">Issued By</div></div>
  </div>
</div><script>window.print()</script></body></html>`;
}

// ══════════════════════════════════════════════════════════════════
// ADD QUOTATION TAB
// ══════════════════════════════════════════════════════════════════
function AddQuotationTab({ onAdded }) {
  const today = new Date().toISOString().split("T")[0];
  const [products,     setProducts]     = useState([]);
  const [customers,    setCustomers]    = useState([]);
  const [quotationNo,  setQuotationNo]  = useState("");

  const [date,         setDate]         = useState(today);
  const [vehicleNo,    setVehicleNo]    = useState("");
  const [builtyNo,     setBuiltyNo]     = useState("");
  const [customerId,   setCustomerId]   = useState("");
  const [customerName, setCustomerName] = useState("");
  const [brokerName,   setBrokerName]   = useState("");
  const [productId,    setProductId]    = useState("");
  const [productName,  setProductName]  = useState("");
  const [paddyType,    setPaddyType]    = useState("");
  const [quantity,     setQuantity]     = useState("");
  const [weight,       setWeight]       = useState("");
  const [bagWeight,    setBagWeight]    = useState("");
  const [rate40,       setRate40]       = useState("");
  const [sutliRate,    setSutliRate]    = useState("");
  const [bardanaRate,  setBardanaRate]  = useState("");
  const [brokeryRate,  setBrokeryRate]  = useState("");
  const [notes,        setNotes]        = useState("");
  const [loading,      setLoading]      = useState(false);
  const [notification, setNotification] = useState({ message:"", type:"info" });

  // ── Derived calculations (mirror exactly AddSalesInvoice.jsx) ────────────
  const totalWt          = nv(weight);
  const bagWt            = nv(bagWeight);
  const netWeight        = totalWt - bagWt;
  const netWeight40      = netWeight > 0 ? netWeight / 40 : 0;
  const qty              = nv(quantity);
  const amount           = netWeight40 * nv(rate40);
  const sutliAmt         = nv(sutliRate) * qty;
  const totalAmount      = amount + sutliAmt;
  const bardanaAmt       = nv(bardanaRate) * qty;
  const totalWithBardana = totalAmount + bardanaAmt;
  const brokeryAmt       = netWeight40 * nv(brokeryRate);
  const totalAmount2     = totalWithBardana - brokeryAmt;

  useEffect(() => {
    Promise.all([
      authFetch(`${API_BASE_URL}/products?activeOnly=true`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/accounts?excludeProducts=true`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/sales-quotation/next-sr`).then(r => r.json()),
    ]).then(([pd, ad, nd]) => {
      if (pd.success) setProducts(pd.products.map(p => ({
        ...p, label: [p.productName, p.type, p.subType].filter(Boolean).join(" - "),
      })));
      const arr = Array.isArray(ad) ? ad : (ad.accounts || []);
      setCustomers(arr.filter(a => a.category === "Customer").map(a => ({ ...a, label: a.accountName })));
      if (nd.success && nd.nextSr) setQuotationNo(String(nd.nextSr));
    });
  }, []);

  const resetForm = () => {
    setDate(today); setVehicleNo(""); setBuiltyNo("");
    setCustomerId(""); setCustomerName(""); setBrokerName("");
    setProductId(""); setProductName(""); setPaddyType(""); setQuantity("");
    setWeight(""); setBagWeight(""); setRate40("");
    setSutliRate(""); setBardanaRate(""); setBrokeryRate(""); setNotes("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        date,
        vehicleNo,
        builtyNo,
        vendorName:       customerName,
        vendorAccountId:  customerId || undefined,
        brokerName,
        productId:        productId || undefined,
        productName,
        paddyType,
        quantity:         qty || null,
        weight:           totalWt || null,
        bagWeight:        bagWt   || null,
        netWeight:        netWeight    > 0 ? netWeight    : null,
        netWeight40:      netWeight40  > 0 ? netWeight40  : null,
        rate40:           nv(rate40)   || null,
        amount:           amount       > 0 ? amount       : null,
        sutliSilaiRate:   nv(sutliRate)   || null,
        sutliSilaiAmount: sutliAmt        > 0 ? sutliAmt  : null,
        totalAmount:      totalAmount     > 0 ? totalAmount : null,
        bardanaRate:      nv(bardanaRate) || null,
        bardanaAmount:    bardanaAmt      > 0 ? bardanaAmt  : null,
        totalWithBardana: totalWithBardana > 0 ? totalWithBardana : null,
        brokeryRate:      nv(brokeryRate) || null,
        brokery:          brokeryAmt      > 0 ? brokeryAmt : null,
        totalAmount2:     totalAmount2    > 0 ? totalAmount2 : null,
        notes,
      };
      const res  = await authFetch(`${API_BASE_URL}/sales-quotation/create`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setNotification({ message: data.message, type:"success" });
        resetForm();
        authFetch(`${API_BASE_URL}/sales-quotation/next-sr`).then(r => r.json())
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

          {/* ── Panel 1: Customer Information ── */}
          <Panel title="Customer Information" dot="#3b82f6">
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
            <Fld label="Customer">
              <SearchDrop options={customers} value={customerId} labelKey="label"
                placeholder="Select customer…"
                onChange={c => { setCustomerId(c._id); setCustomerName(c.accountName); }}/>
            </Fld>
            <Fld label="Broker Name (optional)">
              <input value={brokerName} onChange={e => setBrokerName(e.target.value)}
                placeholder="Broker / agent name" {...iProps()}/>
            </Fld>
            <Fld label="Product">
              <SearchDrop options={products} value={productId} labelKey="label"
                placeholder="Select product…"
                onChange={p => { setProductId(p._id); setProductName([p.productName, p.type, p.subType].filter(Boolean).join(" - ")); }}/>
            </Fld>
            <Fld label="Paddy Type / Grade">
              <input value={paddyType} onChange={e => setPaddyType(e.target.value)}
                placeholder="e.g. Super Basmati, Grade A" {...iProps()}/>
            </Fld>
            <Fld label="Quantity (Bags)">
              <input type="number" min="0" value={quantity}
                onChange={e => setQuantity(e.target.value)} placeholder="0" {...iProps()}/>
            </Fld>
          </Panel>

          {/* ── Panel 2: Weight & Calculation ── */}
          <Panel title="Weight & Calculation" dot="#f59e0b">
            <Fld label="Total / Gross Weight (kg)">
              <input type="number" min="0" step="0.01" value={weight}
                onChange={e => setWeight(e.target.value)} placeholder="0.00" {...iProps()}/>
            </Fld>
            <Fld label="Bag Weight / Deduction (kg)">
              <input type="number" min="0" step="0.01" value={bagWeight}
                onChange={e => setBagWeight(e.target.value)} placeholder="0.00" {...iProps()}/>
            </Fld>
            {DIV}
            <div style={g2}>
              <Fld label="Net Weight (kg)">
                <input value={netWeight > 0 ? fmtN(netWeight) : "—"} {...roProps(netWeight > 0)}/>
              </Fld>
              <Fld label="Net Maund (auto)">
                <input value={netWeight40 > 0 ? netWeight40.toFixed(4) : "—"} {...roProps(netWeight40 > 0)}/>
              </Fld>
            </div>
            {DIV}
            <Fld label="Rate / 40 kg (Rs.)">
              <input type="number" min="0" step="0.01" value={rate40}
                onChange={e => setRate40(e.target.value)} placeholder="0.00" {...iProps()}/>
            </Fld>
            <div style={g2}>
              <Fld label="Amount (auto)">
                <input value={amount > 0 ? fmtN(amount) : "—"} {...roProps(amount > 0)}/>
              </Fld>
              <Fld label="Sutli / Silai (per bag)">
                <input type="number" min="0" step="0.01" value={sutliRate}
                  onChange={e => setSutliRate(e.target.value)} placeholder="0.00" {...iProps()}/>
              </Fld>
            </div>
            <div style={g2}>
              <Fld label="Sutli Amount (auto)">
                <input value={sutliAmt > 0 ? fmtN(sutliAmt) : "—"} {...roProps()}/>
              </Fld>
              <Fld label="Sub-Total (auto)">
                <input value={totalAmount > 0 ? fmtN(totalAmount) : "—"} {...roProps(totalAmount > 0)}/>
              </Fld>
            </div>
          </Panel>

          {/* ── Panel 3: Charges & Final ── */}
          <Panel title="Charges & Final Amount" dot="#10b981">
            <Fld label="Bardana Rate (per bag, optional)">
              <input type="number" min="0" step="0.01" value={bardanaRate}
                onChange={e => setBardanaRate(e.target.value)} placeholder="0.00" {...iProps()}/>
            </Fld>
            <div style={g2}>
              <Fld label="Bardana Amount (auto)">
                <input value={bardanaAmt > 0 ? fmtN(bardanaAmt) : "—"} {...roProps()}/>
              </Fld>
              <Fld label="After Bardana (auto)">
                <input value={totalWithBardana > 0 ? fmtN(totalWithBardana) : "—"} {...roProps(totalWithBardana > 0)}/>
              </Fld>
            </div>
            {DIV}
            <Fld label="Brokery Rate (per maund, optional)">
              <input type="number" min="0" step="0.01" value={brokeryRate}
                onChange={e => setBrokeryRate(e.target.value)} placeholder="0.00" {...iProps()}/>
            </Fld>
            <div style={g2}>
              <Fld label="Brokery Amount (auto)">
                <input value={brokeryAmt > 0 ? `− ${fmtN(brokeryAmt)}` : "—"} {...roProps()}/>
              </Fld>
              <Fld label="Final Amount (auto)">
                <input value={totalAmount2 > 0 ? fmtN(totalAmount2) : totalWithBardana > 0 ? fmtN(totalWithBardana) : "—"} {...roProps(totalAmount2 > 0 || totalWithBardana > 0)}/>
              </Fld>
            </div>
            {DIV}
            <Fld label="Quotation Notes">
              <textarea value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="e.g. Pending confirmation, customer requested Grade A, expected dispatch in 2 days…"
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
                  Add Sales Quotation
                </>
              )}
            </button>
          </Panel>

        </div>
      </form>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════
// VIEW QUOTATIONS TAB
// ══════════════════════════════════════════════════════════════════
function ViewQuotationsTab({ refreshKey }) {
  const navigate = useNavigate();
  const [quotations,   setQuotations]   = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [search,       setSearch]       = useState("");
  const [notification, setNotification] = useState({ message:"", type:"info" });

  const load = async () => {
    setLoading(true);
    try {
      const r = await authFetch(`${API_BASE_URL}/sales-quotation`);
      const d = await r.json();
      if (d.success) setQuotations(d.quotations);
    } catch { /* silent */ }
    setLoading(false);
  };

  useEffect(() => { load(); }, [refreshKey]);

  const filtered = quotations.filter(q => {
    if (!search) return true;
    const s = search.toLowerCase();
    return [q.vendorName, q.vehicleNo, q.builtyNo, q.productName, q.paddyType, q.brokerName, String(q.sr)]
      .some(v => v && String(v).toLowerCase().includes(s));
  });

  const handleDelete = async (id, sr) => {
    if (!window.confirm(`Delete Sales Quotation #${String(sr).padStart(4,"0")}? This cannot be undone.`)) return;
    try {
      const r = await authFetch(`${API_BASE_URL}/sales-quotation/${id}`, { method:"DELETE" });
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
    // Passes full quotation data — AddSalesInvoice reads state.fromQuotation
    // and pre-fills all matching fields, then deletes the quotation on save.
    navigate("/add-invoice-sales", { state: { fromQuotation: quotation } });
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
            placeholder="Search customer, vehicle, product, broker…"
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
            <div key={i} style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, overflow:"hidden", borderLeft:"3px solid #bbf7d0" }}>
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
            {quotations.length === 0 ? "No pending sales quotations" : "No results found"}
          </p>
          <p style={{ fontSize:12.5, color:"#9ca3af" }}>
            {quotations.length === 0 ? "Quotations will appear here once added." : "Try adjusting your search."}
          </p>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {filtered.map((q, idx) => {
            const finalAmt = q.totalAmount2 || q.totalWithBardana || q.totalAmount || 0;
            return (
              <div key={q._id} className="pq-card" style={{ animationDelay:`${idx*.04}s` }}>
                {/* head */}
                <div className="pq-card-head">
                  <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                    <div style={{ display:"flex", alignItems:"baseline", gap:5 }}>
                      <span style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".07em" }}>Sales Quotation</span>
                      <span style={{ fontSize:16, fontWeight:700, color:"#111827", fontFamily:"'DM Mono',monospace" }}>
                        #{String(q.sr||"").padStart(4,"0")}
                      </span>
                    </div>
                    <div style={{ width:1, height:14, background:"#e5e7eb" }}/>
                    <span style={{ fontSize:12.5, color:"#6b7280" }}>{q.date || "No date"}</span>
                    <span className="pq-pending">⏳ Pending</span>
                    {q.paddyType && (
                      <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 9px", borderRadius:4, fontSize:11.5, fontWeight:600, background:"#f3f4f6", color:"#374151", border:"1px solid #e5e7eb", fontFamily:"'DM Mono',monospace", whiteSpace:"nowrap" }}>
                        {q.paddyType}
                      </span>
                    )}
                    {!q.paddyType && q.productName && (
                      <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 9px", borderRadius:4, fontSize:11.5, fontWeight:600, background:"#f3f4f6", color:"#374151", border:"1px solid #e5e7eb", fontFamily:"'DM Mono',monospace", whiteSpace:"nowrap" }}>
                        {q.productName}
                      </span>
                    )}
                    {q.notes && (
                      <span style={{ fontSize:11.5, color:"#059669", background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:4, padding:"2px 8px", maxWidth:220, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
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
                  <CellVal label="Customer"        value={q.vendorName}/>
                  <CellVal label="Vehicle No."     value={q.vehicleNo} mono/>
                  <CellVal label="Builty #"        value={q.builtyNo} mono/>
                  <CellVal label="Broker"          value={q.brokerName}/>
                  <CellVal label="Qty (Bags)"      value={q.quantity} mono/>
                  <CellVal label="Gross Wt. (kg)"  value={q.weight != null ? `${q.weight} kg` : null} mono/>
                  <CellVal label="Net Maund"       value={q.netWeight40 != null ? `${Number(q.netWeight40).toFixed(4)} Mn` : null} mono/>
                  <CellVal label="Rate / 40 kg"    value={q.rate40 != null ? `Rs ${Number(q.rate40).toLocaleString("en-PK")}` : null} mono/>
                </div>

                {/* footer */}
                <div className="pq-card-foot">
                  <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
                    {q.netWeight40 > 0 && (
                      <div>
                        <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", marginBottom:1 }}>Net Maund</div>
                        <div style={{ fontSize:13, fontWeight:700, color:"#15803d", fontFamily:"'DM Mono',monospace" }}>{Number(q.netWeight40).toFixed(4)} Mn</div>
                      </div>
                    )}
                    {finalAmt > 0 && (
                      <>
                        {q.netWeight40 > 0 && <div style={{ width:1, height:22, background:"#bbf7d0" }}/>}
                        <div>
                          <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", marginBottom:1 }}>Est. Amount</div>
                          <div style={{ fontSize:13, fontWeight:700, color:"#374151", fontFamily:"'DM Mono',monospace" }}>Rs {fmtN(finalAmt)}</div>
                        </div>
                      </>
                    )}
                    <div style={{ fontSize:11, color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>
                      Added {new Date(q.createdAt).toLocaleDateString("en-PK")}
                    </div>
                  </div>
                  <div style={{ fontSize:11.5, color:"#059669", fontWeight:600 }}>
                    Click "Fulfil Invoice" to complete &amp; convert →
                  </div>
                </div>
              </div>
            );
          })}
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

// ══════════════════════════════════════════════════════════════════
// PAGE ROOT
// ══════════════════════════════════════════════════════════════════
export default function SalesQuotation() {
  const [activeTab,  setActiveTab]  = useState("add");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdded = () => {
    setRefreshKey(k => k + 1);
  };

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>

      <div className="pq-wrap">
        {/* Header */}
        <div style={{ marginBottom:18 }}>
          <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 3px" }}>Sales</p>
          <h1 style={{ fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px", margin:0 }}>
            Sales Quotations
          </h1>
          <p style={{ fontSize:12.5, color:"#6b7280", margin:"4px 0 0" }}>
            Pre-record a sale before final weighing — convert to a full invoice once confirmed and dispatched.
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