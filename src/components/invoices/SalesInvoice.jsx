import React, { useState, useEffect, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .si-wrap { font-family: 'DM Sans', sans-serif; color: #111827; }
  .si-no-spin::-webkit-inner-spin-button,
  .si-no-spin::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  .si-no-spin { -moz-appearance: textfield; }

  .si-panel {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; overflow: hidden;
  }
  .si-panel-head {
    padding: 9px 14px; background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    display: flex; align-items: center; gap: 8px;
  }
  .si-panel-body {
    padding: 14px; display: flex;
    flex-direction: column; gap: 11px;
  }

  .si-inp, .si-ro {
    width: 100%; padding: 8px 11px;
    border: 1px solid #d1d5db; border-radius: 7px;
    font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s;
  }
  .si-inp::placeholder { color: #9ca3af; }
  .si-inp:focus {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .si-inp.err { border-color: #fca5a5; background: #fff5f5; }
  .si-inp.err:focus { box-shadow: 0 0 0 2px rgba(239,68,68,.12); }
  .si-ro {
    background: #f9fafb; color: #6b7280;
    font-family: 'DM Mono', monospace; cursor: default;
  }
  .si-ro.hi {
    background: #f0fdf4; color: #15803d;
    border-color: #bbf7d0; font-weight: 600;
  }

  .si-sd-btn {
    width: 100%; padding: 8px 11px;
    border: 1px solid #d1d5db; border-radius: 7px;
    background: #fff; font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: #9ca3af; cursor: pointer; outline: none;
    display: flex; align-items: center;
    justify-content: space-between; gap: 6px;
    transition: border-color .12s, box-shadow .12s;
  }
  .si-sd-btn.sel { color: #111827; }
  .si-sd-btn.err { border-color: #fca5a5; background: #fff5f5; }
  .si-sd-btn:focus, .si-sd-btn.open {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .si-sd-panel {
    position: absolute; left: 0; top: calc(100% + 3px);
    width: max(100%, 260px); z-index: 300;
    background: #fff; border: 1px solid #d1d5db;
    border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,.1);
    overflow: hidden;
  }
  .si-sd-item {
    padding: 8px 12px; font-size: 13px; cursor: pointer;
    border-bottom: 1px solid #f9fafb; color: #111827;
    transition: background .08s;
  }
  .si-sd-item:last-child { border-bottom: none; }
  .si-sd-item:hover { background: #f3f4f6; }
  .si-sd-item.sel { background: #f3f4f6; font-weight: 600; }

  .si-lbl {
    display: flex; align-items: center; gap: 4px;
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: #6b7280; margin-bottom: 5px;
  }
  .si-lbl.err { color: #ef4444; }
  .si-lbl span.req { color: #ef4444; font-size: 12px; line-height: 1; }
  .si-lbl span.errtag {
    font-size: 9.5px; background: #fef2f2; color: #ef4444;
    padding: 1px 5px; border-radius: 4px; border: 1px solid #fecaca;
    font-weight: 700; letter-spacing: .03em;
  }

  .si-divider { height: 1px; background: #f3f4f6; margin: 2px 0; }

  .si-summary-box {
    background: #f9fafb; border: 1px solid #e5e7eb;
    border-radius: 8px; padding: 12px 14px;
  }

  .si-submit {
    width: 100%; padding: 10px 0; border-radius: 7px; border: none;
    background: #111827; color: #fff; font-size: 13.5px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background .12s;
  }
  .si-submit:hover:not(:disabled) { background: #1f2937; }
  .si-submit:disabled { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; }

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
  const sel = options.find(o => o._id === value || o.value === value);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button type="button" onClick={() => setOpen(o => !o)}
        className={`si-sd-btn${sel ? " sel" : ""}${error ? " err" : ""}${open ? " open" : ""}`}>
        <span style={{ flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", textAlign:"left" }}>
          {sel ? sel[labelKey] : placeholder}
        </span>
        <svg width={11} height={11} fill="none" viewBox="0 0 24 24"
          stroke="#9ca3af" strokeWidth={2.5}
          style={{ flexShrink:0, transition:".15s", transform:open?"rotate(180deg)":"none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <div className="si-sd-panel">
          <div style={{ padding:7, borderBottom:"1px solid #f3f4f6", background:"#f9fafb" }}>
            <input ref={inp} value={q} onChange={e => setQ(e.target.value)}
              placeholder="Search…"
              style={{ width:"100%", padding:"6px 9px", border:"1px solid #e5e7eb", borderRadius:6, fontSize:12.5, outline:"none", fontFamily:"'DM Sans',sans-serif" }}/>
          </div>
          <ul style={{ maxHeight:210, overflowY:"auto", margin:0, padding:0, listStyle:"none" }}>
            {filtered.length === 0
              ? <li style={{ padding:"9px 12px", fontSize:12.5, color:"#9ca3af", textAlign:"center" }}>No results</li>
              : filtered.map(o => (
                <li key={o._id || o.value}
                  className={`si-sd-item${(o._id || o.value) === value ? " sel" : ""}`}
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
    <div style={{ display:"flex", flexDirection:"column" }}>
      <div className={`si-lbl${error ? " err" : ""}`}>
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
    <div className="si-panel">
      <div className="si-panel-head">
        <div style={{ width:7, height:7, borderRadius:"50%", background:dot, flexShrink:0 }}/>
        <span style={{ fontSize:10.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".08em", color:"#374151" }}>
          {title}
        </span>
      </div>
      <div className="si-panel-body">{children}</div>
    </div>
  );
}

function getMillInfo(profile) {
  return {
    name:    profile?.businessName || localStorage.getItem("businessName") || "Mill",
    logo:    profile?.logoUrl      || localStorage.getItem("logoUrl")      || "",
    address: profile?.address      || profile?.millAddress || "",
    phone1:  profile?.phone        || profile?.phone1      || "",
    phone2:  profile?.phone2       || "",
  };
}

function buildPrintHTML(inv, sr, mill) {
  const m = mill || {};
  const millName    = m.name    || localStorage.getItem("businessName") || "Mill";
  const millLogo    = m.logo    || localStorage.getItem("logoUrl")      || "";
  const millAddress = m.address || "";
  const millPhone   = [m.phone1, m.phone2].filter(Boolean).join("  |  ");
  const srPad = String(sr).padStart(4,"0");

  const logoHTML = millLogo
    ? `<img src="${millLogo}" alt="logo" style="height:48px;width:48px;object-fit:contain;border-radius:6px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);padding:3px;"/>`
    : `<div style="width:48px;height:48px;border-radius:8px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#fff;">${millName.charAt(0)}</div>`;

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Sales #${srPad}</title>
<style>
  @page{size:A5;margin:7mm}*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Segoe UI",Arial,sans-serif;background:#fff;color:#111;font-size:10.5px}.wrap{max-width:130mm;margin:0 auto}
  .hd{background:#111827;padding:10px 12px;border-radius:7px 7px 0 0;display:flex;align-items:center;gap:10px}
  .hd-info{flex:1;min-width:0}.hd-name{font-size:14px;font-weight:800;color:#fff;letter-spacing:-.2px;line-height:1.2}
  .hd-sub{font-size:8.5px;color:rgba(255,255,255,.45);margin-top:2px}
  .hd-right{text-align:right;flex-shrink:0}.hd-type{font-size:9px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#4ade80;margin-bottom:4px}
  .hd-no{font-size:18px;font-weight:800;color:#fff;font-family:"Courier New",monospace;letter-spacing:1px}
  .hd-date{font-size:8.5px;color:rgba(255,255,255,.4);margin-top:2px}
  .meta{display:grid;grid-template-columns:1fr 1fr;border:1px solid #e5e7eb;border-top:none}
  .meta-cell{padding:6px 9px;border-right:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6}
  .meta-cell:nth-child(2n){border-right:none}.meta-cell:nth-last-child(-n+2){border-bottom:none}
  .mc-lbl{font-size:7.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;margin-bottom:2px}
  .mc-val{font-size:11px;font-weight:600;color:#111}.mc-val.mono{font-family:"Courier New",monospace}
  .sec-head{background:#f9fafb;border:1px solid #e5e7eb;border-bottom:none;padding:4px 9px;font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#6b7280;margin-top:6px;border-radius:5px 5px 0 0}
  table{width:100%;border-collapse:collapse;font-size:10.5px}table td,table th{padding:5px 8px;border:1px solid #e5e7eb}
  table th{background:#f3f4f6;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#6b7280}
  table td:last-child,table th:last-child{text-align:right}
  tr.sub td{background:#f9fafb;font-weight:700}tr.red td{color:#dc2626}
  .total-box{border:2px solid #111827;border-radius:0 0 7px 7px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;margin-top:-1px}
  .total-lbl{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#6b7280}
  .total-val{font-size:18px;font-weight:800;color:#111827;font-family:"Courier New",monospace}
  .ft{display:flex;justify-content:space-between;margin-top:12px;padding-top:8px;border-top:1px dashed #e5e7eb}
  .sig-line{width:44%;text-align:center}.sig-line .line{border-top:1px solid #374151;padding-top:3px;margin-top:20px;font-size:8px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body>
<div class="wrap">
  <div class="hd">${logoHTML}<div class="hd-info"><div class="hd-name">${millName}</div>${millAddress?`<div class="hd-sub">${millAddress}</div>`:""} ${millPhone?`<div class="hd-sub">${millPhone}</div>`:""}</div><div class="hd-right"><div class="hd-type">Sales</div><div class="hd-no">#${srPad}</div><div class="hd-date">${inv.date||""}</div></div></div>
  <div class="meta">
    <div class="meta-cell"><div class="mc-lbl">Customer</div><div class="mc-val">${inv.vendorName||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Vehicle</div><div class="mc-val mono">${inv.vehicleNo||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Product</div><div class="mc-val">${inv.paddyType||inv.productName||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Builty #</div><div class="mc-val mono">${inv.builtyNo||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Broker</div><div class="mc-val">${inv.brokerName||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Qty (Bags)</div><div class="mc-val mono">${Number(inv.quantity||0)}</div></div>
  </div>
  <div class="sec-head">Weight & Rate</div>
  <table>
    <tr><th>Description</th><th>Value</th></tr>
    <tr><td>Total Weight</td><td>${Number(inv.weight||0).toFixed(2)} kg</td></tr>
    <tr><td>Bag Deduction</td><td>− ${Number(inv.bagWeight||0).toFixed(2)} kg</td></tr>
    <tr class="sub"><td>Net Weight</td><td>${Number(inv.netWeight||0).toFixed(2)} kg</td></tr>
    <tr class="sub"><td>Net Maund</td><td>${Number(inv.netWeight40||0).toFixed(4)} Mn</td></tr>
    <tr><td>Rate / 40 kg</td><td>Rs ${Number(inv.rate40||0).toLocaleString("en-PK")}</td></tr>
    <tr><td>Amount</td><td>Rs ${Number(inv.amount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>
    <tr><td>Sutli / Silai (Rs ${Number(inv.sutliSilaiRate||0)} × ${Number(inv.quantity||0)} bags)</td><td>Rs ${Number(inv.sutliSilaiAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>
    ${Number(inv.bardanaRate||0)>0?`<tr><td>Bardana (Rs ${Number(inv.bardanaRate)} × ${Number(inv.quantity||0)} bags)</td><td>Rs ${Number(inv.bardanaAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
    <tr class="sub"><td>Subtotal${Number(inv.bardanaRate||0)>0?" + Bardana":""}</td><td>Rs ${Number(inv.totalWithBardana||inv.totalAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>
    ${Number(inv.brokeryRate||0)>0?`<tr class="red"><td>− Brokery (${Number(inv.netWeight40||0).toFixed(4)} Mn × Rs ${Number(inv.brokeryRate||0)})</td><td>− Rs ${Number(inv.brokery||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
  </table>
  <div class="total-box"><div><div class="total-lbl">Net Payable</div></div><div class="total-val">Rs ${Number(inv.totalAmount2||inv.totalWithBardana||inv.totalAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</div></div>
  <div class="ft"><div class="sig-line"><div class="line">Customer Signature</div></div><div style="font-size:8px;color:#d1d5db;align-self:flex-end">Powered by Agro Plus</div><div class="sig-line"><div class="line">Authorised Signatory</div></div></div>
</div><script>window.print()</script></body></html>`;
}


const g2   = { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 };
const g3   = { display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 };
const nv   = v => isNaN(Number(v)) ? 0 : Number(v) || 0;
const fmtN = (v, d=2) => nv(v).toLocaleString("en-PK", { minimumFractionDigits:d, maximumFractionDigits:d });
const DIV  = <div className="si-divider"/>;

const iProps = (error) => ({
  className: `si-inp si-no-spin${error ? " err" : ""}`,
  onFocus: e => { if (!error) { e.target.style.borderColor="#6b7280"; e.target.style.boxShadow="0 0 0 2px rgba(107,114,128,.12)"; } },
  onBlur:  e => { if (!error) { e.target.style.borderColor="#d1d5db"; e.target.style.boxShadow="none"; } },
  onWheel: noSpin,
  onKeyDown: noArrow,
});

const roProps = (hi=false) => ({ className:`si-ro${hi?" hi":""}`, readOnly:true });

export default function AddSalesInvoice() {
  const today = new Date().toISOString().split("T")[0];

  const [products,     setProducts]     = useState([]);
  const [vendors,      setVendors]      = useState([]);
  const [invoiceNo,    setInvoiceNo]    = useState("");
  const [date,         setDate]         = useState(today);
  const [vehicleNo,    setVehicleNo]    = useState("");
  const [builtyNo,     setBuiltyNo]     = useState("");
  const [vendorId,     setVendorId]     = useState("");
  const [vendorName,   setVendorName]   = useState("");
  const [brokerName,   setBrokerName]   = useState("");
  const [productId,    setProductId]    = useState("");
  const [paddyType,    setPaddyType]    = useState("");
  const [quantity,     setQuantity]     = useState("");
  const [weight,       setWeight]       = useState("");
  const [bagWeight,    setBagWeight]    = useState("");
  const [rate40,       setRate40]       = useState("");
  const [sutliRate,    setSutliRate]    = useState("");
  const [bardanaRate,  setBardanaRate]  = useState("");
  const [brokeryRate,  setBrokeryRate]  = useState("");
  const [errors,       setErrors]       = useState({});
  const [loading,      setLoading]      = useState(false);
  const [notification, setNotification] = useState({ message:"", type:"info" });
  const [isMaximized,  setIsMaximized]  = useState(false);
  const [savedInvoice, setSavedInvoice] = useState(null);
  const [millProfile, setMillProfile]   = useState({});
  const formRef = useRef(null);

  const totalWt       = nv(weight);
  const bagWt         = nv(bagWeight);
  const netWeight     = totalWt - bagWt;
  const netWeight40   = netWeight > 0 ? netWeight / 40 : 0;
  const qty           = nv(quantity);
  const amount        = netWeight40 * nv(rate40);
  const sutliAmt      = nv(sutliRate) * qty;
  const totalAmount   = amount + sutliAmt;
  const bardanaAmt    = nv(bardanaRate) * qty;
  const totalWithBardana = totalAmount + bardanaAmt;
  const brokeryAmt    = netWeight40 * nv(brokeryRate);
  const totalAmount2  = totalWithBardana - brokeryAmt;

  useEffect(() => {
    Promise.all([
      authFetch(`${API_BASE_URL}/products?activeOnly=true`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/accounts?excludeProducts=true`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/sales-invoice/next-sr`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/profile`).then(r => r.json()).catch(()=>({})),
    ]).then(([pd, ad, nd, prof]) => {
      if (prof) setMillProfile(prof.profile || prof || {});
      if (pd.success) setProducts(pd.products.map(p => ({
        ...p, label: p.displayName || [p.productName, p.type, p.subType].filter(Boolean).join(" - "),
      })));
      const arr = Array.isArray(ad) ? ad : (ad.accounts || []);
      // Strict category filter — only "Customer" accounts, no fallback
      const customerList = arr.filter(a => a.category === "Customer");
      setVendors(customerList.map(a => ({ ...a, label: a.accountName })));
      if (nd.success && nd.nextSr) setInvoiceNo(String(nd.nextSr));
    });
  }, []);

  useEffect(() => {
    if (!savedInvoice) return;
    const w = window.open("", "_blank");
    if (w) { w.document.write(buildPrintHTML(savedInvoice, savedInvoice.sr, getMillInfo(millProfile))); w.document.close(); }
    setSavedInvoice(null);
  }, [savedInvoice]);

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

  const handleKeyDown = e => {
    if (e.key !== "Enter") return;
    const els = formRef.current?.querySelectorAll('input:not([readonly]):not([type=submit]),select');
    if (!els?.length) return;
    const i = [...els].indexOf(e.target);
    if (i >= 0 && i < els.length - 1) { e.preventDefault(); els[i + 1].focus(); }
  };

  const resetForm = () => {
    setDate(today); setVehicleNo(""); setBuiltyNo(""); setVendorId(""); setVendorName("");
    setBrokerName(""); setProductId(""); setPaddyType(""); setQuantity("");
    setWeight(""); setBagWeight(""); setRate40(""); setSutliRate(""); setBardanaRate(""); setBrokeryRate("");
    setErrors({});
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) { setNotification({ message:"Please fill all required fields", type:"error" }); return; }
    setLoading(true);
    try {
      const payload = {
        date, vehicleNo, builtyNo, vendorName, vendorAccountId: vendorId || undefined,
        brokerName, productId, paddyType, quantity: qty,
        weight: totalWt, bagWeight: bagWt,
        netWeight: netWeight > 0 ? netWeight : 0,
        netWeight40: netWeight40 > 0 ? netWeight40 : 0,
        rate40: nv(rate40), amount,
        sutliSilaiRate: nv(sutliRate), sutliSilaiAmount: sutliAmt,
        totalAmount,
        bardanaRate: nv(bardanaRate) || undefined, bardanaAmount: bardanaAmt || undefined,
        totalWithBardana,
        brokeryRate: nv(brokeryRate) || undefined, brokery: brokeryAmt || undefined,
        totalAmount2, sr: Number(invoiceNo),
      };
      const res  = await authFetch(`${API_BASE_URL}/sales-invoice/create`, {
        method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setNotification({ message:`Invoice #${String(data.invoice.sr).padStart(4,"0")} saved!`, type:"success" });
        setSavedInvoice(data.invoice);
        resetForm();
        authFetch(`${API_BASE_URL}/sales-invoice/next-sr`).then(r => r.json())
          .then(d => { if (d.success && d.nextSr) setInvoiceNo(String(d.nextSr)); });
      } else {
        setNotification({ message: data.message || "Failed to save.", type:"error" });
      }
    } catch { setNotification({ message:"Server error.", type:"error" }); }
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
        onClose={() => setNotification({ message:"", type:"info" })}/>

      <div className="si-wrap" style={{ maxWidth:1100, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, gap:10, flexWrap:"wrap" }}>
          <div>
            <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 3px" }}>Sales</p>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <h1 style={{ fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px", margin:0 }}>
                Sales Invoice
              </h1>
              <span style={{
                fontFamily:"'DM Mono',monospace", fontSize:11, fontWeight:600,
                background:"#f3f4f6", color:"#374151", padding:"2px 8px",
                borderRadius:5, border:"1px solid #e5e7eb",
              }}>
                #{invoiceNo ? String(invoiceNo).padStart(4,"0") : "——"}
              </span>
            </div>
          </div>
          <button type="button" onClick={() => setIsMaximized(p => !p)}
            style={{ fontSize:11.5, fontWeight:500, padding:"6px 12px", borderRadius:6, border:"1px solid #e5e7eb", background:"#fff", color:"#374151", cursor:"pointer" }}>
            {isMaximized ? "Exit Full Screen" : "Full Screen"}
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <div className="inv-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12, alignItems:"start" }}>

            {/* Panel 1 */}
            <Panel title="Basic Information" dot="#6366f1">
              <div style={g2}>
                <Fld label="Date" required error={errors.date}>
                  <input type="date" value={date} max={today}
                    onChange={e => { setDate(e.target.value); setErrors(p => ({...p, date:false})); }}
                    {...iProps(errors.date)}/>
                </Fld>
                <Fld label="Invoice #">
                  <input value={invoiceNo ? `#${String(invoiceNo).padStart(4,"0")}` : "—"} {...roProps(false)}/>
                </Fld>
              </div>

              <div style={g2}>
                <Fld label="Broker Name">
                  <input value={brokerName} onChange={e => setBrokerName(e.target.value)}
                    placeholder="Optional" {...iProps(false)}/>
                </Fld>
                <Fld label="Builty No." required error={errors.builtyNo}>
                  <input value={builtyNo}
                    onChange={e => { setBuiltyNo(e.target.value); setErrors(p => ({...p, builtyNo:false})); }}
                    placeholder="e.g. B-001" {...iProps(errors.builtyNo)}/>
                </Fld>
              </div>

              <Fld label="Vehicle No." required error={errors.vehicleNo}>
                <input value={vehicleNo}
                  onChange={e => { setVehicleNo(formatVehicleNo(e.target.value)); setErrors(p => ({...p, vehicleNo:false})); }}
                  placeholder="e.g. LEA-1234" {...iProps(errors.vehicleNo)}/>
              </Fld>

              <Fld label="Customer" required error={errors.vendorId}>
                <SearchDrop options={vendors} value={vendorId} labelKey="label"
                  placeholder="Select customer…" error={errors.vendorId}
                  onChange={v => { setVendorId(v._id); setVendorName(v.accountName); setErrors(p => ({...p, vendorId:false})); }}/>
              </Fld>

              <Fld label="Product" required error={errors.productId}>
                <SearchDrop options={products} value={productId} labelKey="label"
                  placeholder="Select product…" error={errors.productId}
                  onChange={p => { setProductId(p._id); setPaddyType(p.label || p.productName); setErrors(prev => ({...prev, productId:false})); }}/>
              </Fld>

              <div style={g3}>
                <Fld label="Qty (Bags)" required error={errors.quantity}>
                  <input type="number" min="0" value={quantity}
                    onChange={e => { setQuantity(e.target.value); setErrors(p => ({...p, quantity:false})); }}
                    placeholder="0" {...iProps(errors.quantity)}/>
                </Fld>
                <Fld label="Total Wt (kg)" required error={errors.weight}>
                  <input type="number" min="0" step="0.01" value={weight}
                    onChange={e => { setWeight(e.target.value); setErrors(p => ({...p, weight:false})); }}
                    placeholder="0.00" {...iProps(errors.weight)}/>
                </Fld>
                <Fld label="Bag Wt (kg)" required error={errors.bagWeight}>
                  <input type="number" min="0" step="0.01" value={bagWeight}
                    onChange={e => { setBagWeight(e.target.value); setErrors(p => ({...p, bagWeight:false})); }}
                    placeholder="0.00" {...iProps(errors.bagWeight)}/>
                </Fld>
              </div>
            </Panel>

            {/* Panel 2 */}
            <Panel title="Weight & Rates" dot="#f59e0b">
              <div style={g2}>
                <Fld label="Net Weight (kg)">
                  <input value={netWeight > 0 ? fmtN(netWeight) : "—"} {...roProps(netWeight > 0)}/>
                </Fld>
                <Fld label="Net Weight (Maund)">
                  <input value={netWeight40 > 0 ? netWeight40.toString() : "—"} {...roProps(false)}/>
                </Fld>
              </div>

              <Fld label="Net Weight (Ton)">
                <input value={netWeight > 0 ? (netWeight / 1000).toString() : "—"} {...roProps(false)}/>
              </Fld>

              {DIV}

              <Fld label="Rate / 40 kg (Rs.)" required error={errors.rate40}>
                <input type="number" min="0" step="0.01" value={rate40}
                  onChange={e => { setRate40(e.target.value); setErrors(p => ({...p, rate40:false})); }}
                  placeholder="0.00" {...iProps(errors.rate40)}/>
              </Fld>

              <div style={g2}>
                <Fld label="Amount (Rs.)">
                  <input value={amount > 0 ? fmtN(amount) : "—"} {...roProps(false)}/>
                </Fld>
                <Fld label="Sutli Rate (Rs./bag)">
                  <input type="number" min="0" step="0.01" value={sutliRate}
                    onChange={e => setSutliRate(e.target.value)}
                    placeholder="0.00" {...iProps(false)}/>
                </Fld>
              </div>

              <div style={g2}>
                <Fld label="Sutli Amount (Rs.)">
                  <input value={sutliAmt > 0 ? fmtN(sutliAmt) : "—"} {...roProps(false)}/>
                </Fld>
                <Fld label="Total w/ Sutli (Rs.)">
                  <input value={totalAmount > 0 ? fmtN(totalAmount) : "—"} {...roProps(false)}/>
                </Fld>
              </div>

              {DIV}

              <div style={g2}>
                <Fld label="Bardana Rate (Rs./bag)">
                  <input type="number" min="0" step="0.01" value={bardanaRate}
                    onChange={e => setBardanaRate(e.target.value)}
                    placeholder="Optional" {...iProps(false)}/>
                </Fld>
                <Fld label="Bardana Amount (Rs.)">
                  <input value={bardanaAmt > 0 ? fmtN(bardanaAmt) : "—"} {...roProps(false)}/>
                </Fld>
              </div>

              {nv(bardanaRate) > 0 && (
                <Fld label="Total w/ Bardana (Rs.)">
                  <input value={totalWithBardana > 0 ? fmtN(totalWithBardana) : "—"} {...roProps(false)}/>
                </Fld>
              )}
            </Panel>

            {/* Panel 3 */}
            <Panel title="Brokery & Summary" dot="#10b981">
              <Fld label="Brokery Rate (Rs./Maund)">
                <input type="number" min="0" step="0.01" value={brokeryRate}
                  onChange={e => setBrokeryRate(e.target.value)}
                  placeholder="e.g. 2.50" {...iProps(false)}/>
              </Fld>

              {nv(brokeryRate) > 0 && (
                <div style={{ fontSize:11.5, color:"#6b7280", lineHeight:1.6 }}>
                  {netWeight40 > 0 ? netWeight40.toFixed(4) : "0"} Maund × Rs {nv(brokeryRate)} ={" "}
                  <strong style={{ color:"#374151" }}>Rs {fmtN(brokeryAmt)}</strong>
                </div>
              )}

              <div style={g2}>
                <Fld label="Brokery Amount (Rs.)">
                  <input value={brokeryAmt > 0 ? fmtN(brokeryAmt) : "—"} {...roProps(false)}/>
                </Fld>
                <Fld label="Net After Brokery">
                  <input value={totalAmount2 !== 0 ? fmtN(totalAmount2) : "—"} {...roProps(totalAmount2 > 0)}/>
                </Fld>
              </div>

              {DIV}

              {/* Summary breakdown */}
              <div className="si-summary-box">
                <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                  {[
                    ["Amount",     fmtN(amount),            "#374151"],
                    ["+ Sutli",    fmtN(sutliAmt),          "#374151"],
                    ...(nv(bardanaRate) > 0 ? [["+ Bardana", fmtN(bardanaAmt), "#374151"]] : []),
                    ["Subtotal",   fmtN(totalWithBardana),  "#111827"],
                    ["− Brokery",  fmtN(brokeryAmt),        "#dc2626"],
                  ].map(([l, v, col]) => (
                    <div key={l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:10, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".06em" }}>{l}</span>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12.5, color:col, fontWeight: l==="Subtotal"?600:400 }}>
                        Rs {v}
                      </span>
                    </div>
                  ))}
                  <div style={{ height:1, background:"#e5e7eb", margin:"2px 0" }}/>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:11, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:".06em" }}>
                      Net Payable
                    </span>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:18, fontWeight:700, color:"#111827" }}>
                      Rs {fmtN(totalAmount2)}
                    </span>
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading} className="si-submit">
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
    ? <div style={{ position:"fixed", inset:0, zIndex:50, background:"#f9fafb", overflowY:"auto", padding:20 }}>{content}</div>
    : <SidebarLayout>{content}</SidebarLayout>;
}