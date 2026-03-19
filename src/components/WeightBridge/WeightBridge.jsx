// WeightBridge.jsx
import React, { useState, useEffect, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";
import Notification from "../Notification.jsx";

/* ─── Full product display name ────────────────────────────── */
function productLabel(p) {
  if (!p) return "—";
  return p.displayName || [p.productName, p.type, p.subType].filter(Boolean).join(" - ");
}

/* ─── Searchable Dropdown ──────────────────────────────────── */
function SearchDrop({ options, value, onChange, placeholder, labelKey = "label", disabled }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef(null);
  const inp = useRef(null);
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => { if (open) setTimeout(() => inp.current?.focus(), 0); }, [open]);
  const filtered = options.filter(o => (o[labelKey] || "").toLowerCase().includes(q.toLowerCase()));
  const sel = options.find(o => (o._id || o.value) === value);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button type="button" disabled={disabled}
        onClick={() => !disabled && setOpen(o => !o)}
        style={{
          width: "100%", padding: "10px 14px",
          border: `1.5px solid ${open ? "#6366f1" : "#e2e8f0"}`,
          borderRadius: 12, background: disabled ? "#f8fafc" : "#fff",
          fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13.5,
          color: sel ? "#111827" : "#9ca3af", cursor: disabled ? "default" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
          boxShadow: open ? "0 0 0 3px rgba(99,102,241,.12)" : "none", transition: ".12s",
          outline: "none",
        }}>
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          fontStyle: sel ? "normal" : "italic", textAlign: "left" }}>
          {sel ? sel[labelKey] : placeholder}
        </span>
        <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={2.5}
          style={{ flexShrink: 0, transition: ".15s", transform: open ? "rotate(180deg)" : "none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <div style={{
          position: "absolute", left: 0, top: "calc(100% + 4px)",
          width: "max(100%,280px)", zIndex: 400, background: "#fff",
          border: "1px solid #e2e8f0", borderRadius: 12,
          boxShadow: "0 12px 36px rgba(0,0,0,.14)", overflow: "hidden",
        }}>
          <div style={{ padding: 8, borderBottom: "1px solid #f1f5f9" }}>
            <input ref={inp} value={q} onChange={e => setQ(e.target.value)}
              placeholder="Search…"
              style={{ width: "100%", padding: "7px 10px", border: "1px solid #e2e8f0",
                borderRadius: 7, fontSize: 13, outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif" }}/>
          </div>
          <ul style={{ maxHeight: 220, overflowY: "auto", margin: 0, padding: 0, listStyle: "none" }}>
            {filtered.length === 0
              ? <li style={{ padding: "12px 14px", fontSize: 13, color: "#9ca3af", textAlign: "center" }}>No results</li>
              : filtered.map(o => (
                <li key={o._id || o.value}
                  onClick={() => { onChange(o); setOpen(false); setQ(""); }}
                  style={{
                    padding: "10px 14px", fontSize: 13.5, cursor: "pointer",
                    background: (o._id || o.value) === value ? "#eef2ff" : "transparent",
                    fontWeight: (o._id || o.value) === value ? 600 : 400,
                    color: "#1e293b", borderBottom: "1px solid #f8fafc",
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

/* ─── Field ─────────────────────────────────────────────────── */
function Field({ label, hint, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <label style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8",
          textTransform: "uppercase", letterSpacing: ".08em" }}>{label}</label>
        {hint && <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500 }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

/* ─── InfoTile ──────────────────────────────────────────────── */
function InfoTile({ label, value }) {
  return (
    <div style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 12,
      padding: "10px 14px" }}>
      <p style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase",
        letterSpacing: ".12em", color: "#94a3b8", marginBottom: 4 }}>{label}</p>
      <p style={{ fontSize: 13, fontWeight: 600, color: "#374151",
        fontFamily: "'JetBrains Mono',monospace", overflow: "hidden",
        textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</p>
    </div>
  );
}

/* ─── Input style ───────────────────────────────────────────── */
const inp = {
  width: "100%", padding: "10px 14px",
  border: "1.5px solid #e2e8f0", borderRadius: 12,
  fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13.5,
  color: "#111827", background: "#fff", outline: "none",
  transition: "border-color .12s, box-shadow .12s",
};

/* ─── Section header ────────────────────────────────────────── */
function SectionHead({ letter, title, accent }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase",
      letterSpacing: ".1em", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{
        width: 20, height: 20, borderRadius: "50%",
        background: accent || "#eef2ff", color: accent ? "#fff" : "#6366f1",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 10, fontWeight: 800, flexShrink: 0,
      }}>{letter}</span>
      {title}
    </p>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════════ */
export default function WeightBridge() {
  const [view, setView] = useState("new");
  const [products, setProducts] = useState([]);  // [{_id, label, ...}]
  const [vendors,  setVendors]  = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [pendingInvoices, setPendingInvoices] = useState([]); // for 2nd weight dropdown
  const [vehiclesLoading, setVehiclesLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "info" });
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    invoiceCode: "", productId: "", productName: "",
    vendorId: "", vendorName: "", vehicleNumber: "", vehicleType: "", rate: "",
    firstWeight: "", firstWeightWithDriver: true, firstWeightTime: "",
    secondWeight: "", secondWeightWithDriver: true, secondWeightTime: "",
    netWeight: "", netWeightMaund: "", netWeightTon: "", completed: false,
  });

  /* ── Load master data ── */
  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, vRes, aRes] = await Promise.all([
          authFetch(`${API_BASE_URL}/products`),
          authFetch(`${API_BASE_URL}/profile/vehicles`),
          authFetch(`${API_BASE_URL}/accounts?excludeProducts=true`),
        ]);
        const pData = await pRes.json();
        const vData = await vRes.json();
        const aData = await aRes.json();
        if (pData.success || Array.isArray(pData.products)) {
          const raw = pData.products || pData;
          setProducts(raw.map(p => ({ ...p, label: productLabel(p) })));
        }
        setVehicles((vData.vehicles || []).filter(v => v.isActive));
        const arr = Array.isArray(aData) ? aData : (aData.accounts || []);
        const vendorList = arr.filter(a =>
          !a.isProtected && !a.isProductAccount &&
          (a.category === "Supplier" || (!a.category && a.accountType === "Liabilities"))
        );
        setVendors(
          (vendorList.length > 0 ? vendorList : arr.filter(a => !a.isProtected && !a.isProductAccount))
            .map(a => ({ ...a, label: a.accountName }))
        );
      } catch (err) { console.error(err); }
      finally { setVehiclesLoading(false); }
    };
    load();
  }, []);

  /* ── Load pending invoices when 2nd weight tab is opened ── */
  useEffect(() => {
    if (view !== "second") return;
    authFetch(`${API_BASE_URL}/weight-bridge`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          const pending = (data.entries || [])
            .filter(e => !e.completed)
            .map(e => ({
              ...e,
              label: `${e.invoiceCode} — ${e.vendorName} (${e.productName || "—"})`,
              value: e.invoiceCode,
            }));
          setPendingInvoices(pending);
        }
      })
      .catch(() => {});
  }, [view]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleVehicleChange = e => {
    const vehicleType = e.target.value;
    const v = vehicles.find(x => x.vehicleType === vehicleType);
    setForm(p => ({ ...p, vehicleType, rate: v ? v.rate : 0 }));
  };

  const handleVehicleNumberChange = e => {
    const clean = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (clean.length > 0 && /^[0-9]/.test(clean)) return;
    const letters = (clean.match(/^[A-Z]+/) || [""])[0];
    const nums = clean.slice(letters.length);
    if (!letters) return;
    setForm(p => ({ ...p, vehicleNumber: nums ? `${letters}-${nums}` : letters }));
  };

  /* ── Submit first weight ── */
  const handleFirstSubmit = async e => {
    e.preventDefault();
    try {
      const res = await authFetch(`${API_BASE_URL}/weight-bridge/first`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: form.productId, vendorName: form.vendorName,
          vehicleNumber: form.vehicleNumber, vehicleType: form.vehicleType,
          firstWeight: form.firstWeight, firstWeightWithDriver: form.firstWeightWithDriver,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setForm(p => ({
          ...p, invoiceCode: data.entry.invoiceCode,
          firstWeightTime: new Date(data.entry.createdAt).toLocaleString("en-PK"),
        }));
        setSubmitted(true);
        setNotification({ message: data.message, type: "success" });
      } else {
        setNotification({ message: data.message, type: "error" });
      }
    } catch { setNotification({ message: "Server error", type: "error" }); }
  };

  const resetForm = () => {
    setForm({
      invoiceCode: "", productId: "", productName: "", vendorId: "", vendorName: "",
      vehicleNumber: "", vehicleType: "", rate: "",
      firstWeight: "", firstWeightWithDriver: true, firstWeightTime: "",
      secondWeight: "", secondWeightWithDriver: true, secondWeightTime: "",
      netWeight: "", netWeightMaund: "", netWeightTon: "", completed: false,
    });
    setSubmitted(false);
  };

  /* ── Load invoice for 2nd weight ── */
  const loadInvoice = async (code) => {
    const invoiceCode = code || form.invoiceCode;
    if (!invoiceCode) return setNotification({ message: "Select or enter invoice", type: "error" });
    try {
      const res = await authFetch(`${API_BASE_URL}/weight-bridge/${invoiceCode}`);
      const data = await res.json();
      if (data.success) {
        setForm(p => ({
          ...p, ...data.entry,
          firstWeightTime: new Date(data.entry.createdAt).toLocaleString("en-PK"),
          secondWeightTime: data.entry.secondWeightTime
            ? new Date(data.entry.secondWeightTime).toLocaleString("en-PK") : "",
        }));
      } else {
        setNotification({ message: data.message, type: "error" });
      }
    } catch { setNotification({ message: "Server error", type: "error" }); }
  };

  /* ── Submit second weight ── */
  const handleSecondSubmit = async e => {
    e.preventDefault();
    try {
      const res = await authFetch(`${API_BASE_URL}/weight-bridge/second`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceCode: form.invoiceCode, secondWeight: form.secondWeight,
          secondWeightWithDriver: form.secondWeightWithDriver,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setForm(p => ({
          ...p, secondWeightTime: new Date().toLocaleString("en-PK"),
          netWeight: data.entry.netWeight, netWeightMaund: data.entry.netWeightMaund,
          netWeightTon: data.entry.netWeightTon, completed: true,
        }));
        setPendingInvoices(prev => prev.filter(x => x.invoiceCode !== form.invoiceCode));
        setNotification({ message: data.message, type: "success" });
      } else {
        setNotification({ message: data.message, type: "error" });
      }
    } catch { setNotification({ message: "Server error", type: "error" }); }
  };

  const nowStr = new Date().toLocaleDateString("en-PK", {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });
  const hasNetWeight = form.netWeight !== "" && form.netWeight !== undefined;

  /* ── Theme tokens ── */
  const accent = "#6366f1";
  const accentLight = "#eef2ff";
  const accentText = "#4338ca";

  return (
    <SidebarLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .wb-root { font-family:'Plus Jakarta Sans',sans-serif; }
        .wb-mono { font-family:'JetBrains Mono',monospace; }
        .wb-in   { animation:wbSlide .2s cubic-bezier(.4,0,.2,1) both; }
        @keyframes wbSlide { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .wb-pop  { animation:wbPop .3s cubic-bezier(.34,1.56,.64,1) both; }
        @keyframes wbPop   { from{opacity:0;transform:scale(.93)} to{opacity:1;transform:scale(1)} }
        .wb-inp:focus { border-color:#6366f1 !important; box-shadow:0 0 0 3px rgba(99,102,241,.12); }
        .wb-toggle { display:inline-flex;align-items:center;gap:10px;cursor:pointer;user-select:none;background:none;border:none;padding:0; }
        .wbt-track { width:44px;height:24px;border-radius:999px;background:#e2e8f0;transition:background .18s;position:relative;flex-shrink:0; }
        .wbt-thumb { position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:white;box-shadow:0 1px 4px rgba(0,0,0,.15);transition:left .18s; }
        .wb-toggle-on .wbt-track { background:#6366f1; }
        .wb-toggle-on .wbt-thumb { left:23px; }
      `}</style>

      <div className="wb-root" style={{ background: "#f8fafc", minHeight: "100vh", paddingBottom: 80 }}>
        <Notification message={notification.message} type={notification.type}
          onClose={() => setNotification({ message: "", type: "info" })}/>

        {/* ── Masthead ── */}
        <div style={{ maxWidth: 680, margin: "0 auto 20px" }}>
          <div style={{ background: "#0f172a", borderRadius: 18, overflow: "hidden",
            boxShadow: "0 8px 32px rgba(15,23,42,.2)" }}>
            <div style={{ background: accent, padding: "6px 24px",
              display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#fff",
                textTransform: "uppercase", letterSpacing: ".16em" }}>Operations Module</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#c7d2fe", fontSize: 11 }}>{nowStr}</span>
            </div>
            <div style={{ padding: "24px 28px 20px", display: "flex", alignItems: "center",
              justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase",
                  letterSpacing: ".16em", marginBottom: 4 }}>Operations</p>
                <h1 style={{ fontSize: 32, fontWeight: 800, color: "#fff",
                  letterSpacing: "-.5px", lineHeight: 1, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  Weight Bridge
                </h1>
                <p style={{ fontSize: 12.5, color: "#64748b", marginTop: 4 }}>Vehicle weight recording system</p>
              </div>
              <div style={{ display: "flex", gap: 6, background: "#1e293b",
                padding: 6, borderRadius: 12 }}>
                {[{ id: "new", label: "New Entry", num: "①" },
                  { id: "second", label: "2nd Weight", num: "②" }].map(tab => (
                  <button key={tab.id}
                    onClick={() => { setView(tab.id); resetForm(); }}
                    style={{
                      padding: "8px 18px", borderRadius: 9, border: "none",
                      fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12.5, fontWeight: 700,
                      cursor: "pointer", textTransform: "uppercase", letterSpacing: ".05em",
                      background: view === tab.id ? accent : "transparent",
                      color: view === tab.id ? "#fff" : "#64748b",
                      boxShadow: view === tab.id ? "0 2px 8px rgba(99,102,241,.35)" : "none",
                      transition: ".15s",
                    }}>
                    {tab.num} {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 680, margin: "0 auto" }}>

          {/* ══ FIRST WEIGHT ══ */}
          {view === "new" && !submitted && (
            <div className="wb-in">
              <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden",
                border: "1.5px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,.05)" }}>

                {/* Section A */}
                <div style={{ padding: "20px 22px 18px", borderBottom: "1.5px solid #f8fafc" }}>
                  <SectionHead letter="A" title="Vehicle & Vendor"/>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <Field label="Vendor Name">
                      <SearchDrop
                        options={vendors}
                        value={form.vendorId || ""}
                        labelKey="label"
                        placeholder="Select vendor…"
                        onChange={v => setForm(p => ({ ...p, vendorId: v._id, vendorName: v.accountName }))}
                      />
                    </Field>
                    <Field label="Vehicle Number" hint="Plate No.">
                      <input type="text" placeholder="LEA-1234" value={form.vehicleNumber}
                        onChange={handleVehicleNumberChange}
                        className="wb-inp wb-mono" style={{ ...inp, letterSpacing: ".06em", textTransform: "uppercase" }}/>
                    </Field>
                  </div>
                </div>

                {/* Section B */}
                <div style={{ padding: "20px 22px 18px", borderBottom: "1.5px solid #f8fafc" }}>
                  <SectionHead letter="B" title="Cargo & Transport"/>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <Field label="Product">
                      <SearchDrop
                        options={products}
                        value={form.productId}
                        labelKey="label"
                        placeholder="Select product…"
                        onChange={p => setForm(prev => ({ ...prev, productId: p._id, productName: p.label }))}
                      />
                    </Field>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <Field label="Vehicle Type">
                        {vehiclesLoading ? (
                          <div style={{ ...inp, background: "#f8fafc", color: "#94a3b8" }}>Loading…</div>
                        ) : vehicles.length === 0 ? (
                          <div>
                            <div style={{ ...inp, background: "#fff7ed", color: "#92400e",
                              fontSize: 12.5, fontWeight: 600 }}>⚠ No vehicles configured</div>
                            <p style={{ fontSize: 10.5, color: "#f59e0b", marginTop: 4 }}>
                              Add in Profile → Mill Config
                            </p>
                          </div>
                        ) : (
                          <select value={form.vehicleType} onChange={handleVehicleChange}
                            className="wb-inp" style={{ ...inp, cursor: "pointer", appearance: "none" }} required>
                            <option value="">Select Type</option>
                            {vehicles.map(v => <option key={v._id} value={v.vehicleType}>{v.vehicleType}</option>)}
                          </select>
                        )}
                      </Field>
                      <Field label="Rate" hint="Auto-filled">
                        <div style={{ ...inp, background: "#f8fafc", color: "#64748b",
                          display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8" }}>Rs</span>
                          <span className="wb-mono" style={{ fontWeight: 700, color: "#374151", fontSize: 15 }}>
                            {form.rate ? Number(form.rate).toLocaleString() : "—"}
                          </span>
                        </div>
                      </Field>
                    </div>
                  </div>
                </div>

                {/* Section C */}
                <div style={{ padding: "20px 22px 18px" }}>
                  <SectionHead letter="C" title="Weight Reading" accent={accent}/>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, alignItems: "end" }}>
                    <Field label="First Weight" hint="kg">
                      <div style={{ position: "relative" }}>
                        <input type="number" name="firstWeight" placeholder="0"
                          value={form.firstWeight} onChange={handleChange}
                          className="wb-inp wb-mono"
                          style={{ ...inp, fontSize: 22, fontWeight: 700, paddingRight: 50, paddingTop: 12, paddingBottom: 12 }}
                          required/>
                        <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                          fontSize: 11, fontWeight: 700, color: "#94a3b8", pointerEvents: "none" }}>KG</span>
                      </div>
                    </Field>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8",
                        textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>Driver</p>
                      <button type="button"
                        onClick={() => setForm(p => ({ ...p, firstWeightWithDriver: !p.firstWeightWithDriver }))}
                        className={`wb-toggle ${form.firstWeightWithDriver ? "wb-toggle-on" : ""}`}>
                        <span className="wbt-track"><span className="wbt-thumb"/></span>
                        <span style={{ fontSize: 13.5, fontWeight: 600,
                          color: form.firstWeightWithDriver ? accent : "#94a3b8" }}>
                          {form.firstWeightWithDriver ? "With Driver" : "Without Driver"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div style={{ padding: "0 22px 22px" }}>
                  <button onClick={handleFirstSubmit}
                    style={{
                      width: "100%", padding: "13px 0", borderRadius: 12, border: "none",
                      background: accent, color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif",
                      fontSize: 14, fontWeight: 700, letterSpacing: ".05em", cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(99,102,241,.35)", transition: ".15s",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    }}>
                    <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    Save First Weight
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ══ SUCCESS ══ */}
          {view === "new" && submitted && (
            <div className="wb-in" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="wb-pop" style={{ background: "#0f172a", borderRadius: 16,
                overflow: "hidden", boxShadow: "0 8px 32px rgba(15,23,42,.25)" }}>
                <div style={{ padding: "24px", textAlign: "center",
                  borderBottom: "1px solid #1e293b" }}>
                  <p style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase",
                    letterSpacing: ".2em", marginBottom: 10 }}>Invoice Generated</p>
                  <p className="wb-mono" style={{ fontSize: 52, fontWeight: 800,
                    color: "#a5b4fc", letterSpacing: "-.5px" }}>{form.invoiceCode}</p>
                  <p style={{ fontSize: 11, color: "#475569", marginTop: 6,
                    fontFamily: "'JetBrains Mono',monospace" }}>{form.firstWeightTime}</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",
                  borderBottom: "1px solid #1e293b" }}>
                  {[
                    ["First Weight", `${Number(form.firstWeight).toLocaleString()} kg`],
                    ["Driver", form.firstWeightWithDriver ? "INCLUDED" : "EXCLUDED"],
                  ].map(([l, v]) => (
                    <div key={l} style={{ padding: "16px 20px", textAlign: "center",
                      borderRight: "1px solid #1e293b" }}>
                      <p style={{ fontSize: 9.5, color: "#475569", textTransform: "uppercase",
                        letterSpacing: ".14em", marginBottom: 6 }}>{l}</p>
                      <p className="wb-mono" style={{ fontSize: 22, fontWeight: 700, color: "#e2e8f0" }}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  ["Vendor", form.vendorName], ["Vehicle No.", form.vehicleNumber || "—"],
                  ["Vehicle Type", form.vehicleType], ["Product", form.productName || "—"],
                  ["Rate", `Rs ${Number(form.rate || 0).toLocaleString()}`], ["Recorded", form.firstWeightTime],
                ].map(([k, v]) => <InfoTile key={k} label={k} value={v}/>)}
              </div>
              <button onClick={resetForm}
                style={{
                  width: "100%", padding: "13px 0", borderRadius: 12,
                  border: `1.5px solid ${accent}`, background: accentLight,
                  color: accentText, fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: 14, fontWeight: 700, cursor: "pointer", transition: ".15s",
                }}>
                + New Entry
              </button>
            </div>
          )}

          {/* ══ SECOND WEIGHT ══ */}
          {view === "second" && (
            <div className="wb-in" style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Pending invoices dropdown + manual entry */}
              <div style={{ background: "#fff", borderRadius: 16, padding: "20px 22px",
                border: "1.5px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,.05)" }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8",
                  textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 14 }}>
                  Load Invoice
                </p>

                {/* Pending invoices searchable dropdown */}
                {pendingInvoices.length > 0 && (
                  <div style={{ marginBottom: 12 }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: "#64748b", marginBottom: 6 }}>
                      Pending invoices ({pendingInvoices.length})
                    </p>
                    <SearchDrop
                      options={pendingInvoices}
                      value={form.invoiceCode}
                      labelKey="label"
                      placeholder="Select pending invoice…"
                      onChange={inv => {
                        setForm(p => ({ ...p, invoiceCode: inv.invoiceCode }));
                        loadInvoice(inv.invoiceCode);
                      }}
                    />
                  </div>
                )}

                {pendingInvoices.length > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "10px 0" }}>
                    <div style={{ flex: 1, height: 1, background: "#f1f5f9" }}/>
                    <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>or enter manually</span>
                    <div style={{ flex: 1, height: 1, background: "#f1f5f9" }}/>
                  </div>
                )}

                {/* Manual entry */}
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ flex: 1, display: "flex", alignItems: "center",
                    border: "1.5px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
                    <span className="wb-mono" style={{
                      padding: "10px 14px", fontSize: 13, fontWeight: 700, color: "#94a3b8",
                      background: "#f8fafc", borderRight: "1.5px solid #e2e8f0", whiteSpace: "nowrap",
                    }}>WB-</span>
                    <input type="text"
                      value={form.invoiceCode.replace(/^WB-?/i, "")}
                      onChange={e => setForm(p => ({ ...p, invoiceCode: `WB-${e.target.value}` }))}
                      placeholder="001"
                      className="wb-mono"
                      style={{ flex: 1, padding: "10px 14px", fontSize: 15, fontWeight: 700,
                        color: "#111827", outline: "none", border: "none", background: "transparent" }}
                      onKeyDown={e => e.key === "Enter" && loadInvoice()}/>
                  </div>
                  <button onClick={() => loadInvoice()}
                    style={{
                      padding: "10px 20px", borderRadius: 12, border: "none",
                      background: accent, color: "#fff",
                      fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, fontWeight: 700,
                      cursor: "pointer", boxShadow: "0 2px 8px rgba(99,102,241,.3)",
                    }}>
                    Load
                  </button>
                </div>
              </div>

              {/* Loaded invoice details */}
              {form.productName && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                  {/* Invoice header */}
                  <div style={{ background: "#0f172a", borderRadius: 14, padding: "16px 20px",
                    display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, alignItems: "center" }}>
                    <div>
                      <p style={{ fontSize: 9.5, color: "#475569", textTransform: "uppercase",
                        letterSpacing: ".14em", marginBottom: 4 }}>Invoice</p>
                      <p className="wb-mono" style={{ fontSize: 18, fontWeight: 800, color: "#a5b4fc" }}>
                        {form.invoiceCode}
                      </p>
                    </div>
                    <div style={{ textAlign: "center", borderLeft: "1px solid #1e293b",
                      borderRight: "1px solid #1e293b", padding: "0 12px" }}>
                      <p style={{ fontSize: 9.5, color: "#475569", textTransform: "uppercase",
                        letterSpacing: ".14em", marginBottom: 4 }}>First Weight</p>
                      <p className="wb-mono" style={{ fontSize: 28, fontWeight: 800, color: "#f8fafc" }}>
                        {Number(form.firstWeight || 0).toLocaleString()}
                      </p>
                      <p style={{ fontSize: 10, color: "#475569" }}>kg</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      {form.completed
                        ? <span style={{ display: "inline-flex", alignItems: "center", gap: 6,
                            background: "#10b981", color: "#fff", fontSize: 11, fontWeight: 700,
                            padding: "6px 14px", borderRadius: 20, textTransform: "uppercase", letterSpacing: ".06em" }}>
                            ✓ Done
                          </span>
                        : <span style={{ display: "inline-flex", alignItems: "center", gap: 6,
                            background: accentLight, color: accentText, fontSize: 11, fontWeight: 700,
                            padding: "6px 14px", borderRadius: 20, textTransform: "uppercase", letterSpacing: ".06em",
                            border: `1px solid #c7d2fe` }}>
                            ⏳ Pending
                          </span>
                      }
                    </div>
                  </div>

                  {/* Info tiles */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                    {[
                      ["Vendor", form.vendorName], ["Vehicle No.", form.vehicleNumber || "—"],
                      ["Product", form.productName], ["Vehicle Type", form.vehicleType],
                      ["Rate", `Rs ${Number(form.rate || 0).toLocaleString()}`], ["1st Time", form.firstWeightTime],
                    ].map(([k, v]) => <InfoTile key={k} label={k} value={v}/>)}
                  </div>

                  {/* 2nd weight form */}
                  {!form.completed && (
                    <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden",
                      border: "1.5px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,.04)" }}>
                      <div style={{ padding: "18px 22px 16px" }}>
                        <SectionHead letter="2" title="Enter Second Weight" accent={accent}/>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, alignItems: "end" }}>
                          <Field label="Second Weight" hint="kg">
                            <div style={{ position: "relative" }}>
                              <input type="number" name="secondWeight" placeholder="0"
                                value={form.secondWeight} onChange={handleChange}
                                className="wb-inp wb-mono"
                                style={{ ...inp, fontSize: 22, fontWeight: 700, paddingRight: 50, paddingTop: 12, paddingBottom: 12 }}
                                required/>
                              <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                                fontSize: 11, fontWeight: 700, color: "#94a3b8", pointerEvents: "none" }}>KG</span>
                            </div>
                          </Field>
                          <div>
                            <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8",
                              textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>Driver</p>
                            <button type="button"
                              onClick={() => setForm(p => ({ ...p, secondWeightWithDriver: !p.secondWeightWithDriver }))}
                              className={`wb-toggle ${form.secondWeightWithDriver ? "wb-toggle-on" : ""}`}>
                              <span className="wbt-track"><span className="wbt-thumb"/></span>
                              <span style={{ fontSize: 13.5, fontWeight: 600,
                                color: form.secondWeightWithDriver ? accent : "#94a3b8" }}>
                                {form.secondWeightWithDriver ? "With Driver" : "Without Driver"}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: "0 22px 22px" }}>
                        <button onClick={handleSecondSubmit}
                          style={{
                            width: "100%", padding: "13px 0", borderRadius: 12, border: "none",
                            background: "#10b981", color: "#fff",
                            fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700,
                            cursor: "pointer", boxShadow: "0 4px 12px rgba(16,185,129,.3)", transition: ".15s",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                          }}>
                          <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                          Save Second Weight
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Net weight result */}
                  {hasNetWeight && (
                    <div className="wb-pop" style={{ background: "#0f172a", borderRadius: 16,
                      overflow: "hidden", boxShadow: "0 8px 32px rgba(15,23,42,.25)" }}>
                      <div style={{ background: "#10b981", padding: "8px 20px",
                        display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#fff",
                          textTransform: "uppercase", letterSpacing: ".12em" }}>✓ Net Weight Result</span>
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#d1fae5" }}>
                          {form.secondWeightTime}
                        </span>
                      </div>
                      <div style={{ padding: "28px 24px", textAlign: "center",
                        borderBottom: "1px solid #1e293b" }}>
                        <p style={{ fontSize: 10, color: "#475569", textTransform: "uppercase",
                          letterSpacing: ".16em", marginBottom: 8 }}>Net Weight</p>
                        <p className="wb-mono" style={{ fontSize: 60, fontWeight: 800, color: "#f8fafc", lineHeight: 1 }}>
                          {Number(form.netWeight).toLocaleString()}
                        </p>
                        <p style={{ color: "#64748b", fontSize: 14, marginTop: 6,
                          fontFamily: "'JetBrains Mono',monospace" }}>kilograms</p>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",
                        borderBottom: "1px solid #1e293b" }}>
                        {[["Maund", `${form.netWeightMaund} Mn`], ["Metric Ton", `${form.netWeightTon} T`]].map(([l, v]) => (
                          <div key={l} style={{ padding: "16px 20px", textAlign: "center",
                            borderRight: "1px solid #1e293b" }}>
                            <p style={{ fontSize: 9.5, color: "#475569", textTransform: "uppercase",
                              letterSpacing: ".14em", marginBottom: 8 }}>{l}</p>
                            <p className="wb-mono" style={{ fontSize: 28, fontWeight: 700, color: "#a5b4fc" }}>{v}</p>
                          </div>
                        ))}
                      </div>
                      <div style={{ padding: "12px 20px", background: "#020617",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                        {[
                          ["2nd Weight", `${Number(form.secondWeight).toLocaleString()} kg`],
                          ["−", null],
                          ["1st Weight", `${Number(form.firstWeight).toLocaleString()} kg`],
                          ["=", null],
                          ["Net", `${Number(form.netWeight).toLocaleString()} kg`],
                        ].map(([l, v], i) => v === null
                          ? <span key={i} className="wb-mono" style={{ color: "#334155", fontSize: 18 }}>{l}</span>
                          : (
                            <div key={l} style={{ textAlign: "center" }}>
                              <p style={{ fontSize: 9.5, color: "#334155", textTransform: "uppercase",
                                letterSpacing: ".1em", marginBottom: 2 }}>{l}</p>
                              <p className="wb-mono" style={{ fontSize: 12.5, fontWeight: 700,
                                color: l === "Net" ? "#6ee7b7" : "#94a3b8" }}>{v}</p>
                            </div>
                          )
                        )}
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