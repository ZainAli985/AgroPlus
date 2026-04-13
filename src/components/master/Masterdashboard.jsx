// src/components/master/MasterDashboard.jsx
import React, { useState, useCallback } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { Badge, Spin, ConfirmDialog, fmtDate, fmtFull, fmtPKR, fmtCnic, PAY_STYLE } from "./masterStyles.jsx";
import { authFetch } from "./Masterportal.jsx";

// ─────────────────────────────────────────────────────────────────────────────
// EInp — MUST be defined at module level (outside MillModal).
// If defined inside MillModal, React creates a new component type on every
// render, unmounts/remounts the input, and the cursor disappears mid-typing.
// ─────────────────────────────────────────────────────────────────────────────
function EInp({ field, label, type="text", mono=false, danger=false,
                placeholder="", hint="", editForm, setEditForm }) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:4}}>
      <label style={{
        fontSize:9.5, fontWeight:700, textTransform:"uppercase",
        letterSpacing:".08em", fontFamily:"'DM Mono',monospace",
        color: danger ? "#dc2626" : "#6b7280",
        display:"flex", alignItems:"center", gap:5,
      }}>
        {label}
        {danger && (
          <span style={{
            fontSize:8, background:"#fef2f2", color:"#dc2626",
            border:"1px solid #fecaca", borderRadius:3,
            padding:"1px 5px", fontWeight:700,
          }}>SENSITIVE</span>
        )}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={editForm[field] || ""}
        onChange={e => setEditForm(f => ({...f, [field]: e.target.value}))}
        style={{
          width:"100%", padding:"8px 11px",
          border:`1px solid ${danger ? "#fecaca" : "#d1d5db"}`,
          borderRadius:6, fontSize:13,
          fontFamily: mono ? "'DM Mono',monospace" : "'DM Sans',sans-serif",
          outline:"none",
          background: danger ? "#fffcfc" : "#fff",
          color:"#111827",
          transition:"border-color .12s, box-shadow .12s",
        }}
        onFocus={e => {
          e.target.style.borderColor = danger ? "#fca5a5" : "#374151";
          e.target.style.boxShadow = `0 0 0 2px ${danger ? "rgba(220,38,38,.08)" : "rgba(55,65,81,.08)"}`;
        }}
        onBlur={e => {
          e.target.style.borderColor = danger ? "#fecaca" : "#d1d5db";
          e.target.style.boxShadow = "none";
        }}
      />
      {hint && <div style={{fontSize:10,color:"#9ca3af",lineHeight:1.4}}>{hint}</div>}
    </div>
  );
}

// ── Expandable payment entry ──────────────────────────────────────────────────
function PaymentEntry({ p }) {
  const [open, setOpen] = useState(false);
  const s = PAY_STYLE[p.category] || PAY_STYLE.other;
  return (
    <div className="mp-pe" onClick={()=>setOpen(o=>!o)}>
      <div className="mp-pe-top">
        <span className="mp-pe-cat" style={{background:s.bg,color:s.color,borderColor:s.border}}>{s.label}</span>
        <span style={{flex:1,fontFamily:"'DM Mono',monospace",fontSize:13,fontWeight:700,color:"#111827"}}>{fmtPKR(p.amount)}</span>
        <span style={{fontSize:10,color:"#9ca3af",fontFamily:"'DM Mono',monospace"}}>{fmtDate(p.paidDate||p.recordedAt)}</span>
        <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2.5}
          style={{flexShrink:0,transition:"transform .14s",transform:open?"rotate(180deg)":"none"}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
      {open && (
        <div className="mp-pe-body">
          {p.tid           && <div className="mp-pe-row">TID: <span>{p.tid}</span></div>}
          {p.senderBank    && <div className="mp-pe-row">Sender Bank: <span>{p.senderBank}</span></div>}
          {p.senderTitle   && <div className="mp-pe-row">Sender: <span>{p.senderTitle}</span></div>}
          {p.senderAccount && <div className="mp-pe-row">A/C: <span style={{fontFamily:"'DM Mono',monospace"}}>{p.senderAccount}</span></div>}
          {p.notes         && <div className="mp-pe-row">Notes: <span>{p.notes}</span></div>}
          {p.invoiceNo     && <div className="mp-pe-row">Invoice: <span style={{color:"#15803d"}}>{p.invoiceNo}</span></div>}
          {p.invoiceUrl    && <div className="mp-pe-row" style={{gridColumn:"span 2"}}><a href={p.invoiceUrl} target="_blank" rel="noreferrer" style={{color:"#1d4ed8",fontSize:11}}>↗ Download Invoice</a></div>}
          <div className="mp-pe-row">Recorded: <span>{fmtFull(p.recordedAt)}</span></div>
        </div>
      )}
    </div>
  );
}

// ── Record Payment Modal ──────────────────────────────────────────────────────
function RecordPaymentModal({ mill, onClose, onSaved, showToast }) {
  const [form, setForm] = useState({
    paymentCategory: mill.paymentPlanType==="full"?"setup_full":"setup_installment",
    tid:"", amount:"", senderBank:"", senderTitle:"", senderAccount:"", notes:"",
    paidDate: new Date().toISOString().split("T")[0],
  });
  const [busy, setBusy] = useState(false);
  const upd = k => e => setForm(p=>({...p,[k]:e.target.value}));

  const submit = async () => {
    if (!form.tid.trim())     return showToast("Transaction ID required", false);
    if (!Number(form.amount)) return showToast("Valid amount required", false);
    setBusy(true);
    try {
      const r = await authFetch(`${API_BASE_URL}/master/mills/${mill.millId}/record-payment`,
        { method:"POST", body:JSON.stringify(form) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message);
      showToast(d.message, true);
      onSaved && onSaved(d.mill);
      onClose();
    } catch(e) { showToast(e.message, false); }
    setBusy(false);
  };

  return (
    <div className="mp-modal-overlay" style={{zIndex:1400}} onClick={onClose}>
      <div className="mp-modal" style={{maxWidth:500}} onClick={e=>e.stopPropagation()}>
        <div className="mp-modal-hd">
          <div className="mp-modal-title">Record Payment — {mill.businessName}</div>
          <button className="mp-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="mp-modal-body">
          <div className="mp-g2">
            <div className="mp-field">
              <label className="mp-lbl">Payment Type</label>
              <select className="mp-sel" value={form.paymentCategory} onChange={upd("paymentCategory")}>
                <option value="setup_full">Setup — Full Payment</option>
                <option value="setup_installment">Setup — Installment</option>
                <option value="quarterly">Quarterly Maintenance</option>
                <option value="biannual">Bi-Annual Maintenance</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mp-field">
              <label className="mp-lbl">Amount (Rs) <em>*</em></label>
              <input className="mp-inp mono" type="number" placeholder="0" value={form.amount} onChange={upd("amount")}/>
            </div>
            <div className="mp-field">
              <label className="mp-lbl">Transaction ID <em>*</em></label>
              <input className="mp-inp mono" placeholder="TID / Ref No." value={form.tid} onChange={upd("tid")}/>
            </div>
            <div className="mp-field">
              <label className="mp-lbl">Date Paid</label>
              <input className="mp-inp" type="date" value={form.paidDate} onChange={upd("paidDate")}/>
            </div>
            <div className="mp-field">
              <label className="mp-lbl">Sender Bank</label>
              <input className="mp-inp" placeholder="e.g. UBL" value={form.senderBank} onChange={upd("senderBank")}/>
            </div>
            <div className="mp-field">
              <label className="mp-lbl">Sender Name</label>
              <input className="mp-inp" placeholder="Account holder" value={form.senderTitle} onChange={upd("senderTitle")}/>
            </div>
            <div className="mp-field" style={{gridColumn:"span 2"}}>
              <label className="mp-lbl">Sender Account No.</label>
              <input className="mp-inp mono" placeholder="Account number" value={form.senderAccount} onChange={upd("senderAccount")}/>
            </div>
            <div className="mp-field" style={{gridColumn:"span 2"}}>
              <label className="mp-lbl">Notes</label>
              <input className="mp-inp" placeholder="Optional" value={form.notes} onChange={upd("notes")}/>
            </div>
          </div>
          <div className="mp-info-box" style={{marginTop:4}}>
            Received into: <strong>HBL — ALI RAZA SALEEM — A/C: 02967901869503</strong><br/>
            Invoice auto-generated and emailed to <strong>{mill.email}</strong>.
          </div>
        </div>
        <div className="mp-modal-foot">
          <button className="mp-btn mp-btn-outline mp-btn-sm" onClick={onClose}>Cancel</button>
          <button className="mp-btn mp-btn-green mp-btn-sm" onClick={submit} disabled={busy}>
            {busy?<><Spin/> Recording…</>:"✓ Record Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Validation helpers ────────────────────────────────────────────────────────
const isValidEmail  = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isValidPhone  = v => !v || /^\+92\d{10}$/.test(v.trim());  // +92XXXXXXXXXX or empty
const isValidCnic   = v => !v || /^\d{13}$/.test(v.replace(/-/g,"").trim());

// ── Mill Detail Modal ─────────────────────────────────────────────────────────
function MillModal({ mill: initMill, onClose, onAction, showToast, onMillUpdate }) {
  const [mill,      setMill]      = useState(initMill);
  const [billing,   setBilling]   = useState(
    initMill.billingDate ? new Date(initMill.billingDate).toISOString().split("T")[0] : ""
  );
  const [showPay,   setShowPay]   = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetPwd,  setResetPwd]  = useState("");
  const [resetBusy, setResetBusy] = useState(false);
  const [confirm,   setConfirm]   = useState(null);
  const [actBusy,   setActBusy]   = useState("");

  // ── Edit mode ──────────────────────────────────────────────────────────────
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [editBusy, setEditBusy] = useState(false);
  // Per-field inline validation errors shown while typing
  const [fieldErr, setFieldErr] = useState({});

  const payments  = [...(mill.payments||[])].sort(
    (a,b) => new Date(b.paidDate||b.recordedAt) - new Date(a.paidDate||a.recordedAt)
  );
  const totalPaid = payments.reduce((s,p) => s+(p.amount||0), 0);
  const pkg       = mill.packageId || {};
  const docs      = mill.documents || [];
  const hasPay    = payments.length > 0;

  // ── Edit helpers ───────────────────────────────────────────────────────────
  const openEdit = () => {
    setEditForm({
      businessName: mill.businessName || "",
      ownerName:    mill.ownerName    || "",
      email:        mill.email        || "",
      phone:        mill.phone        || "",
      ntnNumber:    mill.ntnNumber    || "",
      adminCnic:    mill.adminCnic    || "",
    });
    setFieldErr({});
    setEditMode(true);
  };

  const cancelEdit = () => { setEditMode(false); setEditForm({}); setFieldErr({}); };

  // Live validation on change
  const handleFieldChange = (field, value) => {
    setEditForm(f => ({...f, [field]: value}));
    // Clear error as soon as user starts correcting
    setFieldErr(e => ({...e, [field]: ""}));
  };

  const validate = () => {
    const errs = {};
    if (!editForm.businessName?.trim()) errs.businessName = "Required";
    if (!editForm.ownerName?.trim())    errs.ownerName    = "Required";
    if (!editForm.email?.trim())        errs.email        = "Required";
    else if (!isValidEmail(editForm.email)) errs.email    = "Invalid email format";
    if (!isValidPhone(editForm.phone))  errs.phone        = "Must be +92XXXXXXXXXX (10 digits after +92) or empty";
    const cnicRaw = (editForm.adminCnic||"").replace(/-/g,"").trim();
    if (cnicRaw && !/^\d{13}$/.test(cnicRaw)) errs.adminCnic = "Must be exactly 13 digits";
    setFieldErr(errs);
    return Object.keys(errs).length === 0;
  };

  const saveEdit = async () => {
    if (!validate()) return;
    const cnicRaw = (editForm.adminCnic||"").replace(/-/g,"").trim();
    setEditBusy(true);
    try {
      const r = await authFetch(
        `${API_BASE_URL}/master/mills/${mill.millId}/details`,
        { method:"PUT", body:JSON.stringify({ ...editForm, adminCnic: cnicRaw || editForm.adminCnic }) }
      );
      const d = await r.json();
      if (!r.ok) throw new Error(d.message);
      showToast(d.message, true);
      setMill(d.mill);
      if (d.mill.billingDate) setBilling(new Date(d.mill.billingDate).toISOString().split("T")[0]);
      onMillUpdate && onMillUpdate(d.mill);
      setEditMode(false); setEditForm({}); setFieldErr({});
    } catch(e) { showToast(e.message, false); }
    setEditBusy(false);
  };

  // ── Approve / Restrict / Delete ────────────────────────────────────────────
  const doAction = async action => {
    setActBusy(action);
    const ok = await onAction(mill.millId, action);
    if (ok && action==="delete") { onClose(); return; }
    if (ok) {
      try {
        const r = await authFetch(`${API_BASE_URL}/master/mills/${mill.millId}`);
        if (r.ok) { const d = await r.json(); setMill(d); onMillUpdate&&onMillUpdate(d); }
      } catch {}
    }
    setActBusy("");
  };

  const doReset = async () => {
    if (!resetPwd || resetPwd.length < 8) return showToast("Minimum 8 characters required", false);
    setResetBusy(true);
    const r = await authFetch(
      `${API_BASE_URL}/master/mills/${mill.millId}/reset-password`,
      { method:"POST", body:JSON.stringify({newPassword: resetPwd}) }
    );
    const d = await r.json();
    if (r.ok) { showToast("Password reset & email sent ✓", true); setShowReset(false); setResetPwd(""); }
    else showToast(d.message, false);
    setResetBusy(false);
  };

  const saveBilling = async () => {
    if (!billing) return;
    const r = await authFetch(
      `${API_BASE_URL}/master/mills/${mill.millId}/billing-date`,
      { method:"POST", body:JSON.stringify({billingDate: billing}) }
    );
    const d = await r.json();
    showToast(d.message, r.ok);
  };

  const Section = ({title}) => (
    <div style={{
      fontSize:9, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase",
      color:"#9ca3af", fontFamily:"'DM Mono',monospace",
      paddingBottom:6, marginBottom:9, marginTop:16,
      borderBottom:"1px solid #f3f4f6",
      display:"flex", alignItems:"center", gap:5,
    }}>
      <span style={{width:3,height:10,background:"#111827",borderRadius:2,display:"inline-block"}}/>
      {title}
    </div>
  );

  // Shared EInp props builder — passes editForm/setEditForm down
  const eProps = (field, label, extra={}) => ({
    field, label, editForm,
    setEditForm: (updater) => {
      const next = typeof updater === "function" ? updater(editForm) : updater;
      handleFieldChange(field, next[field]);
    },
    ...extra,
  });

  // Phone format helper — enforce +92XXXXXXXXXX on change
  const handlePhoneChange = (val) => {
    let raw = val.replace(/[^\d+]/g,"");
    if (!raw.startsWith("+92")) {
      const digits = raw.replace(/^\+?9?2?/,"").replace(/^0+/,"");
      raw = "+92" + digits;
    }
    if (raw.length > 13) raw = raw.slice(0,13);
    handleFieldChange("phone", raw);
  };

  return (
    <>
      {confirm && (
        <ConfirmDialog
          open title={`Confirm — ${confirm.label}`}
          message={confirm.action==="delete"
            ? `Permanently delete "${mill.businessName}"? This cannot be undone.`
            : `Are you sure you want to ${confirm.label.toLowerCase()} "${mill.businessName}"?`}
          danger={confirm.action==="delete"||confirm.action==="restrict"}
          onConfirm={()=>{ doAction(confirm.action); setConfirm(null); }}
          onCancel={()=>setConfirm(null)}
        />
      )}

      <div className="mp-modal-overlay" style={{alignItems:"flex-start",paddingTop:32}} onClick={onClose}>
        <div className="mp-modal" style={{maxWidth:780,width:"100%"}} onClick={e=>e.stopPropagation()}>

          {/* ── Header ── */}
          <div style={{
            padding:"14px 20px",
            background:"#111827",
            borderBottom:"1px solid rgba(255,255,255,.1)",
            display:"flex", alignItems:"center", gap:12,
          }}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
                <div style={{fontSize:16,fontWeight:700,color:"#fff"}}>
                  {editMode
                    ? <span style={{color:"#4ade80"}}>{editForm.businessName||mill.businessName}</span>
                    : mill.businessName}
                </div>
                <Badge status={mill.approvalStatus}/>
                {pkg.name && (
                  <span className="t-pkg" style={{
                    color:pkg.color||"#9ca3af",
                    borderColor:(pkg.color||"#9ca3af")+"44",
                    background:(pkg.color||"#9ca3af")+"18",
                  }}>{pkg.tier||pkg.name}</span>
                )}
                <span style={{
                  fontSize:10, fontWeight:600, fontFamily:"'DM Mono',monospace",
                  color: mill.isActive ? "#4ade80" : "#6b7280",
                }}>
                  {mill.isActive ? "● Live" : "○ Inactive"}
                </span>
              </div>
              <div style={{fontSize:10,color:"rgba(255,255,255,.35)",fontFamily:"'DM Mono',monospace"}}>
                {mill.millId}
              </div>
            </div>

            {/* Edit / Save / Cancel controls */}
            <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
              {!editMode ? (
                <button onClick={openEdit} style={{
                  padding:"7px 14px",
                  background:"rgba(74,222,128,.12)",
                  border:"1px solid rgba(74,222,128,.35)",
                  borderRadius:6, color:"#4ade80",
                  fontSize:12, fontWeight:600, cursor:"pointer",
                  display:"flex", alignItems:"center", gap:5,
                  fontFamily:"'DM Sans',sans-serif", transition:".12s",
                }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(74,222,128,.22)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(74,222,128,.12)"}>
                  <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Edit Details
                </button>
              ) : (
                <>
                  <button onClick={cancelEdit} style={{
                    padding:"7px 12px",
                    background:"rgba(255,255,255,.07)",
                    border:"1px solid rgba(255,255,255,.18)",
                    borderRadius:6, color:"#e5e7eb",
                    fontSize:12, fontWeight:600, cursor:"pointer",
                    fontFamily:"'DM Sans',sans-serif",
                  }}>
                    ✕ Cancel
                  </button>
                  <button onClick={saveEdit} disabled={editBusy} style={{
                    padding:"7px 14px",
                    background: editBusy ? "rgba(74,222,128,.2)" : "#4ade80",
                    border:"none", borderRadius:6,
                    color: editBusy ? "#4ade80" : "#111827",
                    fontSize:12, fontWeight:700,
                    cursor: editBusy ? "not-allowed" : "pointer",
                    display:"flex", alignItems:"center", gap:5,
                    fontFamily:"'DM Sans',sans-serif",
                  }}>
                    {editBusy
                      ? <><span style={{display:"inline-block",animation:"mp-spin .7s linear infinite"}}>⟳</span> Saving…</>
                      : "✓ Save Changes"}
                  </button>
                </>
              )}
              {/* ✕ Close — white and clearly visible on dark header */}
              <button onClick={onClose} style={{
                width:30, height:30,
                background:"rgba(255,255,255,.08)",
                border:"1px solid rgba(255,255,255,.18)",
                borderRadius:6, cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"#e5e7eb", fontSize:14, fontWeight:700,
                fontFamily:"'DM Sans',sans-serif", transition:".12s",
                flexShrink:0,
              }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.18)";e.currentTarget.style.color="#fff";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.08)";e.currentTarget.style.color="#e5e7eb";}}>
                ✕
              </button>
            </div>
          </div>

          {/* ── Body ── */}
          <div style={{padding:"18px 22px",maxHeight:"74vh",overflowY:"auto"}}>

            {/* ══ EDIT FORM ══ */}
            {editMode && (
              <div style={{
                background:"#f9fafb",
                border:"1px solid #e5e7eb",
                borderTop:"3px solid #4ade80",
                borderRadius:8, padding:"16px 18px", marginBottom:18,
              }}>
                <div style={{
                  fontSize:9.5, fontWeight:700, letterSpacing:".12em",
                  textTransform:"uppercase", color:"#15803d",
                  fontFamily:"'DM Mono',monospace", marginBottom:14,
                  display:"flex", alignItems:"center", gap:6,
                }}>
                  <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Editing Mill Details — changes will be emailed to {mill.email}
                </div>

                {/* Row 1: Business Name + Owner Name */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                  <div>
                    <EInp field="businessName" label="Business Name *"
                      editForm={editForm} setEditForm={f=>handleFieldChange("businessName", typeof f==="function"?f(editForm).businessName:f.businessName)}/>
                    {fieldErr.businessName && <div style={{color:"#dc2626",fontSize:11,marginTop:3}}>{fieldErr.businessName}</div>}
                  </div>
                  <div>
                    <EInp field="ownerName" label="Owner Name *"
                      editForm={editForm} setEditForm={f=>handleFieldChange("ownerName", typeof f==="function"?f(editForm).ownerName:f.ownerName)}/>
                    {fieldErr.ownerName && <div style={{color:"#dc2626",fontSize:11,marginTop:3}}>{fieldErr.ownerName}</div>}
                  </div>
                </div>

                {/* Row 2: Email + Phone */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                  <div>
                    <EInp field="email" label="Email Address *" type="email"
                      hint="Notification sent to this address"
                      editForm={editForm} setEditForm={f=>handleFieldChange("email", typeof f==="function"?f(editForm).email:f.email)}/>
                    {fieldErr.email && <div style={{color:"#dc2626",fontSize:11,marginTop:3}}>{fieldErr.email}</div>}
                  </div>
                  <div>
                    {/* Phone — custom onChange for format enforcement */}
                    <div style={{display:"flex",flexDirection:"column",gap:4}}>
                      <label style={{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",fontFamily:"'DM Mono',monospace",color:"#6b7280"}}>
                        Phone
                      </label>
                      <input
                        type="text"
                        placeholder="+923001234567"
                        value={editForm.phone||""}
                        maxLength={13}
                        onChange={e=>handlePhoneChange(e.target.value)}
                        onFocus={e=>{ if(!editForm.phone) handleFieldChange("phone","+92"); e.target.style.borderColor="#374151"; e.target.style.boxShadow="0 0 0 2px rgba(55,65,81,.08)"; }}
                        onBlur={e=>{ if(editForm.phone==="+92") handleFieldChange("phone",""); e.target.style.borderColor="#d1d5db"; e.target.style.boxShadow="none"; }}
                        style={{width:"100%",padding:"8px 11px",border:"1px solid #d1d5db",borderRadius:6,fontSize:13,fontFamily:"'DM Mono',monospace",outline:"none",background:"#fff",color:"#111827",transition:"border-color .12s"}}
                      />
                      <div style={{fontSize:10,color:"#9ca3af"}}>Format: +92XXXXXXXXXX</div>
                      {fieldErr.phone && <div style={{color:"#dc2626",fontSize:11}}>{fieldErr.phone}</div>}
                    </div>
                  </div>
                </div>

                {/* Row 3: NTN + CNIC */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div>
                    <EInp field="ntnNumber" label="NTN Number" mono placeholder="e.g. 1234567"
                      editForm={editForm} setEditForm={f=>handleFieldChange("ntnNumber", typeof f==="function"?f(editForm).ntnNumber:f.ntnNumber)}/>
                  </div>
                  <div>
                    <EInp field="adminCnic" label="Login CNIC" mono danger
                      placeholder="0000000000000"
                      hint="13 digits only, no dashes — changing this changes the login key"
                      editForm={editForm} setEditForm={f=>handleFieldChange("adminCnic", typeof f==="function"?f(editForm).adminCnic:f.adminCnic)}/>
                    {fieldErr.adminCnic && <div style={{color:"#dc2626",fontSize:11,marginTop:3}}>{fieldErr.adminCnic}</div>}
                  </div>
                </div>

                {/* Live change warnings */}
                {editForm.adminCnic && editForm.adminCnic.replace(/-/g,"").trim() !== mill.adminCnic && (
                  <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:6,padding:"9px 13px",marginTop:12,fontSize:12,color:"#dc2626",lineHeight:1.6}}>
                    ⚠ <strong>CNIC changing:</strong>{" "}
                    <code style={{fontFamily:"monospace",background:"#fff0f0",padding:"1px 4px",borderRadius:3}}>{mill.adminCnic}</code>
                    {" → "}
                    <code style={{fontFamily:"monospace",background:"#f0fff4",color:"#15803d",padding:"1px 4px",borderRadius:3}}>{editForm.adminCnic.replace(/-/g,"").trim()}</code>
                    {" — new login key will be emailed to admin."}
                  </div>
                )}
                {editForm.email && editForm.email.trim() !== mill.email && (
                  <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:6,padding:"9px 13px",marginTop:8,fontSize:12,color:"#92400e",lineHeight:1.6}}>
                    ⚠ <strong>Email changing to:</strong> <strong>{editForm.email}</strong> — notification will be sent to this new address.
                  </div>
                )}
              </div>
            )}

            {/* No-payment warning */}
            {!hasPay && (
              <div className="mp-warn-box" style={{marginBottom:14}}>
                ⚠️ No payment recorded. Approval is blocked until at least one payment is entered.
              </div>
            )}

            {/* ── Business & Plan grid ── */}
            <Section title="Business & Plan"/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
              {[
                ["Business Name", mill.businessName],
                ["Owner",         mill.ownerName],
                ["Email",         mill.email],
                ["Phone",         mill.phone||"—"],
                ["CNIC",          fmtCnic(mill.adminCnic||"")],
                ["NTN",           mill.ntnNumber||"—"],
                ["Package",       pkg.name||mill.plan||"—"],
                ["Plan Type",     mill.paymentPlanType||"full"],
                ["Package Price", fmtPKR(mill.packagePrice)],
                ["Maintenance",   mill.packageId?.maintenanceFee>0?fmtPKR(mill.packageId.maintenanceFee)+"/mo":"—"],
                ["Next Billing",  fmtDate(mill.nextBillingDate||mill.billingDate)],
                ["Registered",    fmtDate(mill.createdAt)],
                ["Activated",     mill.activatedAt?fmtDate(mill.activatedAt):"Not yet"],
              ].map(([k,v])=>(
                <div key={k} style={{background:"#f9fafb",border:"1px solid #f3f4f6",borderRadius:5,padding:"6px 9px"}}>
                  <div style={{fontSize:8,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#9ca3af",fontFamily:"'DM Mono',monospace",marginBottom:2}}>{k}</div>
                  <div style={{fontSize:12,color:"#111827",fontWeight:500,wordBreak:"break-all",lineHeight:1.4}}>{v}</div>
                </div>
              ))}
            </div>

            {/* ── Password reset ── */}
            <Section title="Access"/>
            {!showReset ? (
              <button onClick={()=>setShowReset(true)} className="mp-btn mp-btn-outline mp-btn-sm">
                🔑 Reset Admin Password
              </button>
            ) : (
              <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:7,padding:"11px 13px"}}>
                <div style={{fontSize:9.5,fontWeight:700,color:"#dc2626",letterSpacing:".07em",textTransform:"uppercase",fontFamily:"'DM Mono',monospace",marginBottom:7}}>
                  Set New Password (min 8 characters)
                </div>
                <div style={{display:"flex",gap:6}}>
                  <input className="mp-inp mono" type="text" placeholder="Min 8 characters"
                    style={{flex:1,border:"1px solid #fecaca"}}
                    value={resetPwd} onChange={e=>setResetPwd(e.target.value)}/>
                  <button onClick={doReset} disabled={resetBusy} className="mp-btn mp-btn-danger mp-btn-sm">
                    {resetBusy?<Spin/>:"Set"}
                  </button>
                  <button onClick={()=>{setShowReset(false);setResetPwd("");}} className="mp-btn mp-btn-outline mp-btn-sm">✕</button>
                </div>
                <div style={{fontSize:10,color:"#dc2626",marginTop:5}}>New password will be emailed to the admin.</div>
              </div>
            )}

            {/* ── Documents ── */}
            {docs.length > 0 && (
              <>
                <Section title={`Documents (${docs.length})`}/>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}}>
                  {docs.map((doc,i)=>{
                    const isImg = /\.(png|jpg|jpeg|webp|gif)$/i.test(doc.fileUrl||"");
                    return (
                      <a key={i} href={doc.fileUrl||"#"} target="_blank" rel="noreferrer"
                        style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:5,padding:7,textDecoration:"none",display:"block",textAlign:"center"}}>
                        {isImg
                          ? <img src={doc.fileUrl} alt="" style={{width:"100%",height:36,objectFit:"cover",borderRadius:3,marginBottom:3}} onError={e=>e.target.style.display="none"}/>
                          : <div style={{height:36,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,marginBottom:3}}>📄</div>}
                        <div style={{fontSize:9,color:"#6b7280",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{doc.name||`Doc ${i+1}`}</div>
                      </a>
                    );
                  })}
                </div>
              </>
            )}

            {/* ── Payments ── */}
            <Section title="Payments"/>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
              <span style={{fontSize:11,color:"#6b7280"}}>{payments.length} payment(s)</span>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:700,color:"#15803d"}}>{fmtPKR(totalPaid)} total</span>
            </div>
            {payments.length===0
              ? <div style={{padding:"12px",textAlign:"center",color:"#9ca3af",fontSize:12.5,background:"#f9fafb",borderRadius:6,border:"1px dashed #e5e7eb"}}>No payments recorded yet</div>
              : payments.slice(0,6).map((p,i)=><PaymentEntry key={i} p={p}/>)
            }
            <button onClick={()=>setShowPay(true)} className="mp-btn mp-btn-outline mp-btn-sm"
              style={{width:"100%",marginTop:7,justifyContent:"center"}}>
              + Record Payment
            </button>

            {/* ── Billing date ── */}
            <Section title="Next Billing Date"/>
            <div style={{display:"flex",gap:7,maxWidth:360}}>
              <input type="date" className="mp-inp" value={billing}
                onChange={e=>setBilling(e.target.value)} style={{flex:1}}/>
              <button onClick={saveBilling} className="mp-btn mp-btn-primary mp-btn-sm">Update</button>
            </div>

          </div>

          {/* ── Footer actions ── */}
          <div style={{padding:"11px 22px",borderTop:"1px solid #e5e7eb",display:"flex",gap:7,flexWrap:"wrap",background:"#f9fafb"}}>
            {mill.approvalStatus==="pending" && (
              <button
                className="mp-btn mp-btn-green mp-btn-sm"
                style={{flex:1,justifyContent:"center",opacity:!hasPay?0.45:1,cursor:!hasPay?"not-allowed":"pointer"}}
                disabled={actBusy==="approve"||!hasPay}
                onClick={()=>hasPay?setConfirm({action:"approve",label:"Approve Mill"}):showToast("Record first payment before approving",false)}>
                {actBusy==="approve"?<><Spin/> …</>:"✓ Approve Mill"}
              </button>
            )}
            {mill.approvalStatus==="approved" && (
              <button className="mp-btn mp-btn-danger mp-btn-sm" style={{flex:1,justifyContent:"center"}}
                disabled={actBusy==="restrict"}
                onClick={()=>setConfirm({action:"restrict",label:"Restrict Mill"})}>
                {actBusy==="restrict"?<><Spin/> …</>:"🚫 Restrict"}
              </button>
            )}
            {mill.approvalStatus==="restricted" && (
              <button className="mp-btn mp-btn-green mp-btn-sm" style={{flex:1,justifyContent:"center"}}
                disabled={actBusy==="unrestrict"}
                onClick={()=>setConfirm({action:"unrestrict",label:"Restore Mill"})}>
                {actBusy==="unrestrict"?<><Spin/> …</>:"✅ Restore"}
              </button>
            )}
            <button className="mp-btn mp-btn-outline mp-btn-sm" style={{padding:"6px 10px"}}
              onClick={()=>setConfirm({action:"delete",label:"Delete Mill"})}>
              <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showPay && (
        <RecordPaymentModal
          mill={mill}
          onClose={()=>setShowPay(false)}
          showToast={showToast}
          onSaved={upd=>{ setMill(m=>({...m,...upd})); onMillUpdate&&onMillUpdate({...mill,...upd}); }}
        />
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════
export default function MasterDashboard({ mills, stats, packages, loading, filter, setFilter, search, setSearch, doAction, showToast, fetchMills, onRegister }) {
  const [selected, setSelected] = useState(null);

  const openMill = useCallback(async m => {
    try {
      const r = await authFetch(`${API_BASE_URL}/master/mills/${m.millId}`);
      if (r.ok) setSelected(await r.json());
      else setSelected(m);
    } catch { setSelected(m); }
  }, []);

  const revenue = (stats.approved||0) * 7500;

  return (
    <div>
      <div className="mp-page-h">Dashboard</div>
      <div className="mp-page-sub">Platform overview and mill management</div>

      <div className="mp-stats">
        {[
          {lbl:"Total Mills",  num:stats.total||0,      ac:"#374151"},
          {lbl:"Pending",      num:stats.pending||0,    ac:"#d97706"},
          {lbl:"Active",       num:stats.approved||0,   ac:"#15803d"},
          {lbl:"Restricted",   num:stats.restricted||0, ac:"#dc2626"},
        ].map(s=>(
          <div key={s.lbl} className="mp-sc" style={{"--ac":s.ac}}>
            <div className="mp-sc-lbl">{s.lbl}</div>
            <div className="mp-sc-num">{s.num}</div>
          </div>
        ))}
      </div>

      <div className="mp-rev" style={{marginBottom:18}}>
        <div style={{flex:1}}>
          <div className="mp-rev-lbl">Estimated Monthly Revenue</div>
          <div className="mp-rev-num">{fmtPKR(revenue)}</div>
          <div className="mp-rev-sub">{stats.approved||0} active mills</div>
        </div>
        <button onClick={onRegister} className="mp-btn mp-btn-green">
          <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          Register New Mill
        </button>
      </div>

      {/* Toolbar */}
      <div className="mp-toolbar">
        <div className="mp-srch">
          <span className="mp-srch-ico">
            <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </span>
          <input placeholder="Search mill, owner, email…" value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        {["all","pending","approved","restricted"].map(f=>(
          <button key={f}
            className={`mp-tab-btn${filter===f?(f==="pending"?" on-warn":f==="restricted"?" on-err":" on"):""}`}
            onClick={()=>setFilter(f)}>
            {f==="all"?"All":f.charAt(0).toUpperCase()+f.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="mp-card">
        {loading ? (
          <div className="mp-empty"><Spin/> Loading…</div>
        ) : mills.length===0 ? (
          <div className="mp-empty">No mills found.</div>
        ) : (
          <table>
            <thead>
              <tr><th>Business</th><th>Owner</th><th>Package</th><th>Status</th><th>Next Billing</th><th>Payments</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {mills.map(m=>{
                const mpkg = m.packageId||{};
                return (
                  <tr key={m._id} onClick={()=>openMill(m)} style={{cursor:"pointer"}}>
                    <td>
                      <div className="t-biz">{m.businessName}</div>
                      <div className="t-id">{m.millId}</div>
                    </td>
                    <td className="t-dim">{m.ownerName}</td>
                    <td>
                      {mpkg.name&&<span className="t-pkg" style={{color:mpkg.color||"#374151",borderColor:(mpkg.color||"#374151")+"33",background:(mpkg.color||"#374151")+"10"}}>{mpkg.tier||mpkg.name}</span>}
                    </td>
                    <td><Badge status={m.approvalStatus}/></td>
                    <td className="t-dim">{fmtDate(m.nextBillingDate||m.billingDate)}</td>
                    <td>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:600,color:(m.payments?.length||0)>0?"#15803d":"#9ca3af"}}>
                        {m.payments?.length||0} recorded
                      </span>
                    </td>
                    <td onClick={e=>e.stopPropagation()}>
                      <div className="qbtns">
                        {m.approvalStatus==="pending"    && <button className="qbtn qbtn-app" onClick={()=>{if((m.payments?.length||0)>0)doAction(m.millId,"approve");else showToast("Record payment first",false);}}>Approve</button>}
                        {m.approvalStatus==="approved"   && <button className="qbtn qbtn-res" onClick={()=>doAction(m.millId,"restrict")}>Restrict</button>}
                        {m.approvalStatus==="restricted" && <button className="qbtn qbtn-unr" onClick={()=>doAction(m.millId,"unrestrict")}>Restore</button>}
                        <button className="qbtn" style={{background:"#f9fafb",borderColor:"#e5e7eb",color:"#374151",fontSize:10}} onClick={()=>openMill(m)}>View →</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <MillModal
          mill={selected}
          onClose={()=>setSelected(null)}
          onAction={doAction}
          showToast={showToast}
          onMillUpdate={upd=>{ setSelected(upd); fetchMills(); }}
        />
      )}
    </div>
  );
}