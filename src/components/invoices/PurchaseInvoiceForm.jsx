import React, { useState, useEffect, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');`;

/* ─── Vehicle number formatter ──────────────────────────────────────── */
function formatVehicleNo(raw) {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const lettersMatch = clean.match(/^[A-Z]+/);
  const letters = lettersMatch ? lettersMatch[0] : "";
  const nums    = clean.slice(letters.length);
  if (!letters) return clean;
  return nums ? `${letters}-${nums}` : letters;
}

/* ─── Searchable dropdown ──────────────────────────────────────────── */
function SearchDrop({ options, value, onChange, placeholder, labelKey = "label", disabled }) {
  const [open, setOpen] = useState(false);
  const [q, setQ]       = useState("");
  const ref = useRef(null); const inp = useRef(null);
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => { if (open) setTimeout(() => inp.current?.focus(), 0); }, [open]);
  const filtered = options.filter(o => (o[labelKey]||"").toLowerCase().includes(q.toLowerCase()));
  const sel = options.find(o => o._id === value || o.value === value);
  return (
    <div ref={ref} style={{ position:"relative" }}>
      <button type="button" disabled={disabled} onClick={() => !disabled && setOpen(o=>!o)}
        style={{ width:"100%", padding:"8px 11px", border:`1.5px solid ${open?"#3b82f6":"#e2e8f0"}`,
          borderRadius:9, background:disabled?"#f8fafc":"#fff", cursor:disabled?"default":"pointer",
          fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13.5, color:sel?"#111827":"#9ca3af",
          display:"flex", alignItems:"center", justifyContent:"space-between", gap:6, textAlign:"left",
          boxShadow:open?"0 0 0 3px rgba(59,130,246,.12)":"none", transition:".12s" }}>
        <span style={{ flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
          fontStyle:sel?"normal":"italic" }}>
          {sel ? sel[labelKey] : placeholder}
        </span>
        <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={2.5}
          style={{ flexShrink:0, transition:".15s", transform:open?"rotate(180deg)":"none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <div style={{ position:"absolute", left:0, top:"calc(100% + 4px)", width:"max(100%,260px)",
          zIndex:300, background:"#fff", border:"1px solid #e2e8f0", borderRadius:12,
          boxShadow:"0 12px 36px rgba(0,0,0,.13)", overflow:"hidden" }}>
          <div style={{ padding:8, borderBottom:"1px solid #f1f5f9" }}>
            <input ref={inp} value={q} onChange={e => setQ(e.target.value)}
              placeholder="Search…"
              style={{ width:"100%", padding:"7px 10px", border:"1px solid #e2e8f0", borderRadius:7,
                fontSize:13, outline:"none" }}/>
          </div>
          <ul style={{ maxHeight:200, overflowY:"auto", margin:0, padding:0, listStyle:"none" }}>
            {filtered.length === 0
              ? <li style={{ padding:"10px 14px", fontSize:13, color:"#9ca3af", textAlign:"center" }}>No results</li>
              : filtered.map(o => (
                <li key={o._id||o.value}
                  onClick={() => { onChange(o); setOpen(false); setQ(""); }}
                  style={{ padding:"9px 14px", fontSize:13.5, cursor:"pointer",
                    background:(o._id||o.value)===value?"#eff6ff":"transparent",
                    fontWeight:(o._id||o.value)===value?600:400, color:"#1e293b",
                    borderBottom:"1px solid #f8fafc", transition:"background .1s" }}
                  onMouseEnter={e => { if((o._id||o.value)!==value)e.currentTarget.style.background="#f8fafc"; }}
                  onMouseLeave={e => { if((o._id||o.value)!==value)e.currentTarget.style.background="transparent"; }}>
                  {o[labelKey]}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── Label + input helper ─────────────────────────────────────────── */
function Fld({ label, children, span }) {
  return (
    <div style={{ gridColumn:span?`span ${span}`:undefined, display:"flex", flexDirection:"column", gap:4 }}>
      <label style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".08em",
        color:"#94a3b8" }}>{label}</label>
      {children}
    </div>
  );
}
const inp = (extra={}) => ({
  style:{ width:"100%", padding:"8px 11px", border:"1.5px solid #e2e8f0", borderRadius:9,
    fontSize:13.5, fontFamily:"'Plus Jakarta Sans',sans-serif", color:"#111827",
    background:"#fff", outline:"none", transition:"border-color .12s",
    ...extra.style },
  onFocus: e => e.target.style.borderColor="#3b82f6",
  onBlur:  e => e.target.style.borderColor="#e2e8f0",
});
const roInp = (highlight) => ({
  style:{ width:"100%", padding:"8px 11px", border:"1.5px solid #e2e8f0", borderRadius:9,
    fontSize:13.5, fontFamily:"'JetBrains Mono',monospace", color:highlight?"#16a34a":"#475569",
    background:highlight?"#f0fdf4":"#f8fafc", outline:"none",
    borderColor:highlight?"#86efac":"#e2e8f0", fontWeight:highlight?700:500 },
  readOnly:true,
});

/* ─── Panel card ───────────────────────────────────────────────────── */
function Panel({ title, dot, children }) {
  return (
    <div style={{ background:"#fff", border:"1.5px solid #e8eaf0", borderRadius:12, overflow:"hidden" }}>
      <div style={{ padding:"9px 14px", background:"#f8fafc", borderBottom:"1.5px solid #e8eaf0",
        display:"flex", alignItems:"center", gap:7 }}>
        <div style={{ width:7, height:7, borderRadius:"50%", background:dot, flexShrink:0 }}/>
        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:700,
          textTransform:"uppercase", letterSpacing:".1em", color:"#64748b" }}>{title}</span>
      </div>
      <div style={{ padding:"14px", display:"flex", flexDirection:"column", gap:12 }}>
        {children}
      </div>
    </div>
  );
}

const g2 = { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 };
const g3 = { display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 };
const divider = <div style={{ height:1, background:"#f1f5f9", margin:"2px 0" }}/>;
const n = v => isNaN(Number(v)) ? 0 : Number(v) || 0;
const fmtN = (v, d=2) => n(v).toLocaleString("en-PK",{minimumFractionDigits:d,maximumFractionDigits:d});

/* ══════════════════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════════════════ */
export default function AddPurchaseInvoice() {
  const today = new Date().toISOString().split("T")[0];

  /* Data from server */
  const [products,  setProducts]  = useState([]);
  const [vendors,   setVendors]   = useState([]);
  const [bagTypes,  setBagTypes]  = useState([]);
  const [millSettings, setMillSettings] = useState({ baseMoisture:0, weightCut:0 });
  const [invoiceNo, setInvoiceNo] = useState("");

  /* Form state */
  const [date,        setDate]        = useState(today);
  const [vehicleNo,   setVehicleNo]   = useState("");
  const [builtyNo,    setBuiltyNo]    = useState("");
  const [vendorId,    setVendorId]    = useState("");
  const [vendorName,  setVendorName]  = useState("");
  const [productId,   setProductId]   = useState("");
  const [productName, setProductName] = useState("");
  const [bagStatus,   setBagStatus]   = useState("added"); // added | return
  const [quantity,    setQuantity]    = useState("");      // number of bags
  const [grossWeight, setGrossWeight] = useState("");      // kg
  const [bagTypeId,   setBagTypeId]   = useState("");
  const [bagTypeName, setBagTypeName] = useState("");
  const [bagWtPerBag, setBagWtPerBag] = useState(0);       // from bag type
  const [moisturePct, setMoisturePct] = useState("");
  const [moistureOverride, setMoistureOverride] = useState(false);
  const [moistureAdj, setMoistureAdj] = useState("");      // auto or manual
  const [rentAdj,     setRentAdj]     = useState("");

  /* Rate rows: [{ id, maund, rate, amount }] */
  const [rateRows, setRateRows] = useState([{ id:1, maund:"", rate:"", amount:"" }]);

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message:"", type:"info" });
  const [isMaximized, setIsMaximized] = useState(false);
  const formRef = useRef(null);

  /* ── Fetch master data ── */
  useEffect(() => {
    Promise.all([
      authFetch(`${API_BASE_URL}/products`).then(r=>r.json()),
      authFetch(`${API_BASE_URL}/accounts`).then(r=>r.json()),
      authFetch(`${API_BASE_URL}/profile/bag-types`).then(r=>r.json()),
      authFetch(`${API_BASE_URL}/profile/mill-settings`).then(r=>r.json()),
      authFetch(`${API_BASE_URL}/purchase-invoice/next-sr`).then(r=>r.json()),
    ]).then(([pd, ad, bd, sd, nd]) => {
      if (pd.success) setProducts(pd.products.map(p => ({ ...p, label:p.productName })));
      const arr = Array.isArray(ad) ? ad : (ad.accounts||[]);
      setVendors(arr.filter(a=>!a.isProtected).map(a => ({ ...a, label:a.accountName })));
      if (bd.bagTypes) setBagTypes(bd.bagTypes.filter(b=>b.isActive).map(b=>({...b,label:`${b.bagTypeName} (${b.bagWeight} kg)`})));
      if (sd.settings) setMillSettings(sd.settings);
      if (nd.success && nd.nextSr) setInvoiceNo(String(nd.nextSr));
    });
  }, []);

  /* ── Computed values ── */
  const qty       = n(quantity);
  const gross     = n(grossWeight);
  const totalBagW = qty * bagWtPerBag;  // bag weight = qty * weight-per-bag
  const baseMoist = n(millSettings.baseMoisture);
  const weightCut = n(millSettings.weightCut);

  const autoMoistAdj = moisturePct !== "" && n(moisturePct) > baseMoist
    ? (n(moisturePct) - baseMoist) * weightCut * qty
    : 0;

  const effectiveMoistAdj = moistureOverride ? n(moistureAdj) : autoMoistAdj;

  // If bag status is "return", don't deduct bag weight (they returned bags separately)
  const bagDeduction = bagStatus === "added" ? totalBagW : 0;
  const netWeightKg   = gross - bagDeduction - effectiveMoistAdj;
  const netWeightMaund= netWeightKg > 0 ? netWeightKg / 40 : 0;

  // Rate rows: auto-fill amount = maund * rate
  const computedRateRows = rateRows.map(r => ({
    ...r,
    amount: n(r.maund) * n(r.rate),
  }));
  const totalAmount = computedRateRows.reduce((s, r) => s + r.amount, 0);
  const finalAmount = totalAmount - n(rentAdj);

  /* Sync moisture adj display when not overriding */
  useEffect(() => {
    if (!moistureOverride) setMoistureAdj(autoMoistAdj.toFixed(3));
  }, [moisturePct, qty, millSettings, moistureOverride]);

  /* ── Rate row helpers ── */
  const addRateRow    = () => setRateRows(r => [...r, { id:Date.now(), maund:"", rate:"", amount:"" }]);
  const removeRateRow = id => setRateRows(r => r.filter(x => x.id !== id));
  const updateRateRow = (id, field, val) => setRateRows(r => r.map(x => x.id===id?{...x,[field]:val}:x));

  /* ── Enter → next field ── */
  const handleKeyDown = e => {
    if (e.key !== "Enter") return;
    const els = formRef.current?.querySelectorAll('input:not([readonly]):not([type=submit]),select');
    if (!els?.length) return;
    const i = [...els].indexOf(e.target);
    if (i >= 0 && i < els.length-1) { e.preventDefault(); els[i+1].focus(); }
  };

  /* ── Submit ── */
  const handleSubmit = async e => {
    e.preventDefault();
    if (!productId || !date || !vehicleNo || !vendorName || !builtyNo) {
      return setNotification({ message:"Please fill all required fields (Date, Vehicle No., Builty No., Vendor, Product).", type:"error" });
    }
    setLoading(true);
    try {
      const payload = {
        sr: Number(invoiceNo),
        date, vendorName, vendorAccountId: vendorId||undefined,
        vehicleNumber: vehicleNo, builtyNumber: builtyNo,
        productId, productName,
        bagStatus, quantity: qty,
        grossWeight: gross,
        bagTypeId: bagTypeId||undefined, bagTypeName, bagWeightPerBag: bagWtPerBag,
        totalBagWeight: totalBagW,
        moisturePercent: n(moisturePct),
        baseMoisture: baseMoist, weightCut,
        moistureAdjustment: effectiveMoistAdj, moistureOverride,
        netWeightKg: netWeightKg>0?netWeightKg:0,
        netWeightMaund: netWeightMaund>0?netWeightMaund:0,
        rateRows: computedRateRows.filter(r=>r.maund||r.rate),
        totalAmount, rentAdjustment: n(rentAdj), finalAmount,
        // legacy compat fields
        netWeight: netWeightKg>0?netWeightKg:0,
        netWeight40KG: netWeightMaund>0?netWeightMaund:0,
        amount: totalAmount, bagWeight: totalBagW, finalWeight: gross,
      };
      const res  = await authFetch(`${API_BASE_URL}/purchase-invoice/create`,{
        method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setNotification({ message:"Purchase invoice saved!", type:"success" });
        // Reset
        setDate(today); setVehicleNo(""); setBuiltyNo(""); setVendorId(""); setVendorName("");
        setProductId(""); setProductName(""); setBagStatus("added"); setQuantity("");
        setGrossWeight(""); setBagTypeId(""); setBagTypeName(""); setBagWtPerBag(0);
        setMoisturePct(""); setMoistureOverride(false); setMoistureAdj(""); setRentAdj("");
        setRateRows([{id:1,maund:"",rate:"",amount:""}]);
        authFetch(`${API_BASE_URL}/purchase-invoice/next-sr`).then(r=>r.json())
          .then(d => { if(d.success&&d.nextSr) setInvoiceNo(String(d.nextSr)); });
      } else {
        setNotification({ message:data.message||"Failed to save.", type:"error" });
      }
    } catch { setNotification({ message:"Server error.", type:"error" }); }
    finally { setLoading(false); }
  };

  /* Escape exits fullscreen */
  useEffect(() => {
    const h = e => { if(e.key==="Escape"&&isMaximized) setIsMaximized(false); };
    window.addEventListener("keydown",h); return ()=>window.removeEventListener("keydown",h);
  },[isMaximized]);

  /* ─────────────────────────────────────────────── RENDER ─── */
  const content = (
    <>
      <style>{FONTS}</style>
      <Notification message={notification.message} type={notification.type}
        onClose={() => setNotification({message:"",type:"info"})}/>

      <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:"#111827",
        maxWidth:1120, margin:"0 auto", padding:16 }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
            <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:22, fontWeight:800,
              color:"#0f172a", lineHeight:1, margin:0 }}>Purchase Invoice</h1>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, fontWeight:600,
              background:"#0f172a", color:"#34d399", padding:"3px 9px", borderRadius:4 }}>
              #{invoiceNo?String(invoiceNo).padStart(4,"0"):"----"}
            </span>
          </div>
          <button type="button" onClick={() => setIsMaximized(p=>!p)}
            style={{ fontSize:11, fontWeight:700, padding:"5px 12px", borderRadius:6,
              border:"1.5px solid #e2e8f0", background:"#fff", color:"#64748b", cursor:"pointer",
              textTransform:"uppercase", letterSpacing:".05em" }}>
            {isMaximized?"⊠ Exit":"⊞ Full Screen"}
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>

            {/* ══════════ PANEL 1: Basic Information ══════════ */}
            <Panel title="Basic Information" dot="#3b82f6">
              <div style={g2}>
                <Fld label="Date">
                  <input type="date" value={date} max={today} onChange={e=>setDate(e.target.value)} {...inp()}/>
                </Fld>
                <Fld label="Invoice #">
                  <input value={invoiceNo?"#"+String(invoiceNo).padStart(4,"0"):"—"} {...roInp(false)}/>
                </Fld>
              </div>

              <div style={g2}>
                <Fld label="Vehicle No. *">
                  <input value={vehicleNo}
                    onChange={e => setVehicleNo(formatVehicleNo(e.target.value))}
                    placeholder="e.g. LEA-1234" {...inp()}/>
                </Fld>
                <Fld label="Builty No. *">
                  <input value={builtyNo} onChange={e=>setBuiltyNo(e.target.value)}
                    placeholder="e.g. B-001" {...inp()}/>
                </Fld>
              </div>

              <Fld label="Vendor Name *">
                <SearchDrop options={vendors} value={vendorId} labelKey="label"
                  placeholder="Select vendor from accounts…"
                  onChange={v => { setVendorId(v._id); setVendorName(v.accountName); }}/>
              </Fld>

              <Fld label="Product *">
                <SearchDrop options={products} value={productId} labelKey="label"
                  placeholder="Select product…"
                  onChange={p => { setProductId(p._id); setProductName(p.productName); }}/>
              </Fld>

              {/* Bag Status toggle */}
              <Fld label="Bag Status">
                <div style={{ display:"flex", gap:8 }}>
                  {["added","return"].map(s => (
                    <button key={s} type="button" onClick={() => setBagStatus(s)}
                      style={{ flex:1, padding:"9px 0", borderRadius:9, border:"1.5px solid",
                        fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:600, cursor:"pointer",
                        transition:".15s",
                        borderColor: bagStatus===s?"#3b82f6":"#e2e8f0",
                        background:  bagStatus===s?"#eff6ff":"#fff",
                        color:       bagStatus===s?"#1d4ed8":"#6b7280",
                      }}>
                      {s === "added" ? "🛍 Bag Added" : "↩ Bag Return"}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize:11, color:"#94a3b8", marginTop:3 }}>
                  {bagStatus==="added"
                    ? "Bags weighed with product — bag weight will be deducted."
                    : "Bags returned separately — no bag weight deduction."}
                </div>
              </Fld>

              <Fld label="Product Quantity (Bags)">
                <input type="number" min="0" value={quantity} onChange={e=>setQuantity(e.target.value)}
                  placeholder="Number of bags" {...inp()}/>
              </Fld>
            </Panel>

            {/* ══════════ PANEL 2: Weight & Pricing ══════════ */}
            <Panel title="Weight & Pricing" dot="#10b981">

              {/* Gross Weight */}
              <Fld label="Gross Weight (kg)">
                <input type="number" min="0" step="0.01" value={grossWeight}
                  onChange={e=>setGrossWeight(e.target.value)} placeholder="0.00" {...inp()}/>
              </Fld>

              {/* Bag Type */}
              <div style={g2}>
                <Fld label="Bag Type">
                  <SearchDrop options={bagTypes} value={bagTypeId} labelKey="label"
                    placeholder="Select bag type…"
                    onChange={b => { setBagTypeId(b._id); setBagTypeName(b.bagTypeName); setBagWtPerBag(b.bagWeight); }}/>
                </Fld>
                <Fld label="Bag Weight (auto)">
                  <input value={bagWtPerBag?`${bagWtPerBag} kg/bag`:"—"} {...roInp(false)}/>
                </Fld>
              </div>

              {/* Total Bag Weight */}
              <div style={g2}>
                <Fld label="Total Bag Weight (kg)">
                  <input value={qty&&bagWtPerBag?fmtN(totalBagW):"—"} {...roInp(false)}/>
                </Fld>
                <Fld label="Bag Deduction Applied">
                  <input value={bagStatus==="added"?(qty&&bagWtPerBag?`− ${fmtN(totalBagW)} kg`:"—"):"None (Return)"} {...roInp(false)}/>
                </Fld>
              </div>

              {divider}

              {/* Moisture */}
              <div style={g2}>
                <Fld label="Moisture %">
                  <input type="number" min="0" step="0.01" value={moisturePct}
                    onChange={e=>setMoisturePct(e.target.value)} placeholder={`Base: ${millSettings.baseMoisture}%`} {...inp()}/>
                </Fld>
                <Fld label="Moisture Adjustment (kg)">
                  <div style={{ position:"relative" }}>
                    <input type="number" step="0.001" value={moistureAdj}
                      readOnly={!moistureOverride}
                      onChange={e => moistureOverride && setMoistureAdj(e.target.value)}
                      style={{ ...roInp(!moistureOverride).style, paddingRight:64,
                        background:moistureOverride?"#fff":"#f8fafc",
                        color:moistureOverride?"#111827":"#475569" }}/>
                    <button type="button" onClick={() => setMoistureOverride(o=>!o)}
                      style={{ position:"absolute", right:6, top:"50%", transform:"translateY(-50%)",
                        padding:"3px 7px", borderRadius:6, border:"1px solid #e2e8f0",
                        background:moistureOverride?"#fef9c3":"#f8fafc",
                        color:moistureOverride?"#92400e":"#94a3b8",
                        fontSize:10, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
                      {moistureOverride?"Manual":"Auto"}
                    </button>
                  </div>
                  {!moistureOverride && n(moisturePct) > 0 && n(moisturePct) <= n(millSettings.baseMoisture) && (
                    <div style={{ fontSize:10.5, color:"#16a34a", marginTop:2 }}>
                      ✓ Within base moisture — no deduction
                    </div>
                  )}
                </Fld>
              </div>

              {divider}

              {/* Net Weight */}
              <div style={g2}>
                <Fld label="Net Weight (kg)">
                  <input value={netWeightKg > 0 ? fmtN(netWeightKg) : "—"} {...roInp(true)}/>
                </Fld>
                <Fld label="Net Weight (Maund)">
                  <input value={netWeightMaund > 0 ? fmtN(netWeightMaund, 3) : "—"} {...roInp(true)}/>
                </Fld>
              </div>

              {divider}

              {/* Rate Rows */}
              <div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                  <label style={{ fontSize:10, fontWeight:700, textTransform:"uppercase",
                    letterSpacing:".08em", color:"#94a3b8" }}>Rate Rows (Maund × Rate)</label>
                  <button type="button" onClick={addRateRow}
                    style={{ fontSize:11.5, fontWeight:700, color:"#3b82f6", background:"#eff6ff",
                      border:"1px solid #bfdbfe", borderRadius:6, padding:"3px 9px", cursor:"pointer" }}>
                    + Add Rate
                  </button>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                  {computedRateRows.map((r, idx) => (
                    <div key={r.id} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr auto",
                      gap:7, alignItems:"center" }}>
                      <div>
                        {idx===0 && <div style={{ fontSize:9.5, color:"#94a3b8", fontWeight:700,
                          letterSpacing:".07em", textTransform:"uppercase", marginBottom:3 }}>Maund</div>}
                        <input type="number" min="0" step="0.01" value={rateRows[idx]?.maund||""}
                          onChange={e => updateRateRow(r.id,"maund",e.target.value)}
                          placeholder="0.000" {...inp()}/>
                      </div>
                      <div>
                        {idx===0 && <div style={{ fontSize:9.5, color:"#94a3b8", fontWeight:700,
                          letterSpacing:".07em", textTransform:"uppercase", marginBottom:3 }}>Rate (Rs/40kg)</div>}
                        <input type="number" min="0" step="0.01" value={rateRows[idx]?.rate||""}
                          onChange={e => updateRateRow(r.id,"rate",e.target.value)}
                          placeholder="0.00" {...inp()}/>
                      </div>
                      <div>
                        {idx===0 && <div style={{ fontSize:9.5, color:"#94a3b8", fontWeight:700,
                          letterSpacing:".07em", textTransform:"uppercase", marginBottom:3 }}>Amount (Rs)</div>}
                        <input value={r.amount > 0 ? fmtN(r.amount) : "—"} {...roInp(false)}/>
                      </div>
                      <div style={{ paddingTop:idx===0?18:0 }}>
                        {rateRows.length > 1 && (
                          <button type="button" onClick={() => removeRateRow(r.id)}
                            style={{ width:28, height:28, borderRadius:7, border:"1px solid #fca5a5",
                              background:"#fef2f2", color:"#ef4444", cursor:"pointer", fontSize:14,
                              display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {divider}

              {/* Rent + Totals */}
              <div style={g2}>
                <Fld label="Total Amount (Rs)">
                  <input value={totalAmount > 0 ? fmtN(totalAmount) : "—"} {...roInp(false)}/>
                </Fld>
                <Fld label="Rent Adjustment (Rs)">
                  <input type="number" min="0" step="0.01" value={rentAdj}
                    onChange={e=>setRentAdj(e.target.value)} placeholder="0.00" {...inp()}/>
                </Fld>
              </div>

              {/* Final Amount */}
              <div style={{ background:"#f0fdf4", border:"1.5px solid #86efac", borderRadius:10,
                padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#15803d",
                  textTransform:"uppercase", letterSpacing:".07em" }}>Net Payable</span>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:20,
                  fontWeight:800, color:"#15803d" }}>
                  Rs {finalAmount > 0 ? fmtN(finalAmount) : "0.00"}
                </span>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                style={{ width:"100%", padding:"11px 0", borderRadius:9, border:"none",
                  background:loading?"#cbd5e1":"#0f172a", color:"#fff", cursor:loading?"not-allowed":"pointer",
                  fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, fontWeight:700,
                  letterSpacing:".04em", display:"flex", alignItems:"center", justifyContent:"center",
                  gap:8, transition:".15s",
                  boxShadow:loading?"none":"0 4px 12px rgba(15,23,42,.25)" }}>
                {loading ? "Saving…" : (
                  <>
                    <svg width={13} height={13} fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    Save Invoice
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
    ? <div style={{ position:"fixed", inset:0, zIndex:50, background:"#f1f5f9",
        overflowY:"auto", padding:20 }}>{content}</div>
    : <SidebarLayout>{content}</SidebarLayout>;
}