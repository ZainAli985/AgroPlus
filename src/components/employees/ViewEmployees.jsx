import React, { useEffect, useState, useCallback } from "react";
import SidebarLayout from "../../components/layout/SidebarLayout";
import API_BASE_URL   from "../../../config/API_BASE_URL";
import Notification   from "../../components/Notification";
import { Eye, EyeOff } from "lucide-react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;
const CSS = `
*, *::before, *::after { box-sizing: border-box; }
.ve { font-family:'DM Sans',sans-serif; color:#111827; }

/* inputs */
.ve-inp, .ve-sel, .ve-ta {
  width:100%; border:1px solid #d1d5db; border-radius:7px;
  padding:8px 11px; font-size:13px; font-family:'DM Sans',sans-serif;
  color:#111827; background:#fff; outline:none;
  transition:border-color .12s, box-shadow .12s; appearance:none;
}
.ve-inp::placeholder, .ve-ta::placeholder { color:#9ca3af; }
.ve-inp:focus, .ve-sel:focus, .ve-ta:focus { border-color:#6b7280; box-shadow:0 0 0 2px rgba(107,114,128,.12); }
.ve-inp.mono { font-family:'DM Mono',monospace; font-size:12.5px; }
.ve-ta { resize:vertical; min-height:72px; }

/* table */
.ve-table { width:100%; border-collapse:collapse; }
.ve-table thead tr { background:#f9fafb; border-bottom:1px solid #e5e7eb; }
.ve-table thead th { padding:9px 14px; font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:#9ca3af; text-align:left; white-space:nowrap; }
.ve-table tbody tr { background:#fff; border-bottom:1px solid #f3f4f6; transition:background .07s; }
.ve-table tbody tr:hover { background:#fafafa; }
.ve-table tbody td { padding:11px 14px; font-size:13px; color:#374151; vertical-align:middle; }

/* avatar */
.ve-av { width:31px; height:31px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11.5px; font-weight:700; color:#fff; flex-shrink:0; }
.ve-av-img { width:31px; height:31px; border-radius:50%; object-fit:cover; flex-shrink:0; border:1px solid #e5e7eb; }

/* badges */
.ve-badge { display:inline-flex; align-items:center; gap:4px; padding:2px 8px; border-radius:4px; font-size:11px; font-weight:600; white-space:nowrap; }
.ve-badge.active   { background:#f0fdf4; color:#15803d; border:1px solid #bbf7d0; }
.ve-badge.inactive { background:#fef2f2; color:#dc2626; border:1px solid #fecaca; }
.ve-role-tag { display:inline-block; padding:2px 8px; border-radius:4px; font-size:11px; font-weight:600; }
.ve-role-tag.admin     { background:#eff6ff; color:#1d4ed8; }
.ve-role-tag.accountant{ background:#fefce8; color:#854d0e; }
.ve-role-tag.worker    { background:#f3f4f6; color:#374151; }
.ve-role-tag.standard  { background:#f5f3ff; color:#7c3aed; }

/* action buttons */
.ve-btn { display:inline-flex; align-items:center; gap:4px; padding:5px 9px; border-radius:5px; border:1px solid transparent; font-size:11px; font-weight:500; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all .1s; white-space:nowrap; }
.ve-btn.restrict { background:#fff7ed; color:#c2410c; border-color:#fed7aa; }
.ve-btn.restrict:hover { background:#ffedd5; }
.ve-btn.enable   { background:#f0fdf4; color:#15803d; border-color:#bbf7d0; }
.ve-btn.enable:hover   { background:#dcfce7; }
.ve-btn.edit   { background:#fff; color:#374151; border-color:#d1d5db; }
.ve-btn.edit:hover   { background:#f9fafb; }
.ve-btn.del    { background:#fff; color:#dc2626; border-color:#fecaca; }
.ve-btn.del:hover    { background:#fef2f2; }

/* account pill */
.ve-acc-pill { display:inline-flex; align-items:center; gap:4px; padding:2px 7px; border-radius:4px; font-size:10.5px; font-weight:600; background:#f0fdf4; color:#15803d; border:1px solid #bbf7d0; cursor:default; white-space:nowrap; }
.ve-acc-pill.zero { background:#f9fafb; color:#9ca3af; border-color:#e5e7eb; }

/* modal */
.ve-overlay { position:fixed; inset:0; background:rgba(0,0,0,.42); display:flex; align-items:flex-start; justify-content:center; z-index:800; padding:28px 16px; overflow-y:auto; }
@keyframes ve-in { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:translateY(0); } }
.ve-modal { background:#fff; border-radius:10px; width:100%; box-shadow:0 20px 60px rgba(0,0,0,.16); animation:ve-in .17s ease-out; border:1px solid #e5e7eb; display:flex; flex-direction:column; }
.ve-modal-hd { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; border-bottom:1px solid #e5e7eb; background:#f9fafb; border-radius:10px 10px 0 0; flex-shrink:0; }
.ve-modal-body { padding:18px; overflow-y:auto; flex:1; }
.ve-modal-ft { display:flex; justify-content:flex-end; gap:8px; padding:11px 18px; border-top:1px solid #f3f4f6; background:#f9fafb; border-radius:0 0 10px 10px; flex-shrink:0; }

/* section labels in modal */
.ve-slbl { font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:.09em; color:#9ca3af; border-bottom:1px solid #f3f4f6; padding-bottom:6px; margin-bottom:11px; margin-top:18px; display:flex; align-items:center; justify-content:space-between; }
.ve-slbl:first-child { margin-top:0; }
.ve-flbl { display:block; font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:#6b7280; margin-bottom:4px; font-family:'DM Mono',monospace; }

/* route pills in modal */
.ve-rp { display:flex; align-items:center; gap:6px; padding:5px 7px; border-radius:5px; cursor:pointer; border:1px solid #e5e7eb; background:#f9fafb; transition:all .1s; user-select:none; }
.ve-rp:hover { border-color:#d1d5db; }
.ve-rp.on { border-color:#d1d5db; background:#f3f4f6; }
.ve-rp-cb { width:12px; height:12px; border-radius:3px; flex-shrink:0; border:1.5px solid #d1d5db; background:#fff; display:flex; align-items:center; justify-content:center; transition:all .1s; }
.ve-rp.on .ve-rp-cb { background:#111827; border-color:#111827; }
.ve-rp-lbl { font-size:10.5px; font-weight:500; color:#4b5563; font-family:'DM Mono',monospace; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.ve-rp.on .ve-rp-lbl { color:#111827; font-weight:600; }

/* doc card */
.ve-doc-card { border-radius:7px; border:1px solid #e5e7eb; overflow:hidden; background:#fff; width:100px; flex-shrink:0; }
.ve-doc-thumb { width:100px; height:70px; object-fit:cover; display:block; cursor:zoom-in; }
.ve-doc-ph { width:100px; height:70px; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#f9fafb; gap:3px; cursor:pointer; }
.ve-doc-ft { padding:4px 6px; border-top:1px solid #f3f4f6; display:flex; align-items:center; gap:3px; }
.ve-doc-fn { font-size:9.5px; font-weight:500; color:#374151; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; flex:1; }

/* lightbox */
.ve-lb { position:fixed; inset:0; background:rgba(0,0,0,.9); display:flex; align-items:center; justify-content:center; z-index:1200; padding:24px; cursor:zoom-out; }

/* pic circle */
.ve-pic { width:60px; height:60px; border-radius:50%; border:1px solid #e5e7eb; background:#f3f4f6; overflow:hidden; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.ve-pic img { width:100%; height:100%; object-fit:cover; }

/* pwd bars */
.ve-bar { flex:1; height:3px; border-radius:3px; transition:background .2s; }

/* skeleton */
@keyframes ve-sh { to { background-position:-200% 0; } }
.ve-sk { background:linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%); background-size:200% 100%; animation:ve-sh 1.3s infinite; border-radius:4px; }

/* delete confirm */
.ve-del-overlay { position:fixed; inset:0; background:rgba(0,0,0,.45); display:flex; align-items:center; justify-content:center; z-index:1000; padding:16px; }

@keyframes ve-spin { to { transform:rotate(360deg); } }
.ve-spin { animation:ve-spin .8s linear infinite; display:inline-block; }
.ve-g2 { display:grid; grid-template-columns:1fr 1fr; gap:11px; }
@media(max-width:600px) { .ve-g2 { grid-template-columns:1fr; } }
`;

// ── Helpers ───────────────────────────────────────────────────────────────────
const AVATAR_COLORS = ["#374151","#1d4ed8","#15803d","#b45309","#7c3aed","#0e7490","#be185d"];
const avatarColor = s => AVATAR_COLORS[(s?.charCodeAt(0)||0) % AVATAR_COLORS.length];
const initials    = (f,l) => `${f?.[0]||""}${l?.[0]||""}`.toUpperCase();
const prettyRoute = r => r.replace(/^\//,"").replace(/[/-]/g," ").replace(/\b\w/g,c=>c.toUpperCase())||"Dashboard";
const isImgUrl    = u => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(u||"");
const docName     = d => d.name || d.fileUrl?.split("/").pop() || "Document";
const fmtPKR      = n => n ? `Rs ${Number(n).toLocaleString("en-PK")}` : "Rs 0";

const pwdStrength = pwd => {
  if (!pwd) return { score:0, label:"", color:"#e5e7eb" };
  let s = 0;
  if (pwd.length >= 8)  s++;
  if (/[A-Z]/.test(pwd)) s++;
  if (/[0-9]/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  return [
    { score:1, label:"Weak",   color:"#f87171" },
    { score:2, label:"Fair",   color:"#fb923c" },
    { score:3, label:"Good",   color:"#34d399" },
    { score:4, label:"Strong", color:"#15803d" },
  ][s - 1] || { score:0, label:"", color:"#e5e7eb" };
};

const ALL_ROUTES = [
  "/dashboard","/create-account","/view-accounts","/ledger",
  "/general-entries","/view-general-entries","/products","/products/new",
  "/add-invoice-purchase","/view-purchase-invoices",
  "/add-invoice-sales","/view-sales-invoices",
  "/trialbalance","/balancesheet","/incomestatement",
  "/cashbook","/cashbook-report",
  "/employees","/employees/new",
  "/weight-bridge","/weight-bridge/invoices",
  "/cheque-book/create","/cheque-book/entry","/cheque-book/view",
];

const ROLES = ["Admin","Accountant","Worker","Standard"];

// ── CloseBtn ──────────────────────────────────────────────────────────────────
const CloseBtn = ({ onClick }) => (
  <button onClick={onClick}
    style={{ background:"#f3f4f6", border:"none", borderRadius:6, width:27, height:27, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#6b7280", flexShrink:0 }}>
    <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  </button>
);

// ── Tick ──────────────────────────────────────────────────────────────────────
const Tick = () => (
  <svg width={7} height={7} viewBox="0 0 10 10" fill="none">
    <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── DocCard ───────────────────────────────────────────────────────────────────
function DocCard({ doc, onPreview }) {
  const url  = doc.fileUrl || "";
  const name = docName(doc);
  const img  = isImgUrl(url);
  const [broken, setBroken] = useState(false);
  return (
    <div className="ve-doc-card">
      {img && !broken
        ? <img src={url} alt={name} className="ve-doc-thumb" onClick={() => onPreview(url, name)} onError={() => setBroken(true)}/>
        : <div className="ve-doc-ph" onClick={() => window.open(url, "_blank")}>
            <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <span style={{ fontSize:8.5, color:"#9ca3af", fontWeight:700, textTransform:"uppercase" }}>{url.split(".").pop()?.toUpperCase().slice(0,5)||"FILE"}</span>
          </div>
      }
      <div className="ve-doc-ft">
        <span className="ve-doc-fn" title={name}>{name}</span>
        <a href={url} target="_blank" rel="noopener noreferrer"
          style={{ width:16, height:16, display:"flex", alignItems:"center", justifyContent:"center", background:"#f0f9ff", borderRadius:3, color:"#0369a1", flexShrink:0, textDecoration:"none" }}
          onClick={e => e.stopPropagation()}>
          <svg width={8} height={8} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

// ── DocSection ────────────────────────────────────────────────────────────────
function DocSection({ label, docs, onPreview }) {
  if (!docs?.length) return (
    <div style={{ padding:"10px 12px", borderRadius:6, border:"1px dashed #e5e7eb", textAlign:"center", background:"#fafafa" }}>
      <span style={{ fontSize:12, color:"#9ca3af" }}>No {label.toLowerCase()} uploaded</span>
    </div>
  );
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
      {docs.map((doc, i) => <DocCard key={i} doc={doc} onPreview={onPreview}/>)}
    </div>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ src, name, onClose }) {
  useEffect(() => {
    const h = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div className="ve-lb" onClick={onClose}>
      <div style={{ position:"relative", maxWidth:"90vw", maxHeight:"90vh" }} onClick={e => e.stopPropagation()}>
        <img src={src} alt={name} style={{ maxWidth:"88vw", maxHeight:"85vh", borderRadius:8, objectFit:"contain", display:"block", boxShadow:"0 24px 64px rgba(0,0,0,.5)" }}/>
        <CloseBtn onClick={onClose}/>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Edit Modal
// ═══════════════════════════════════════════════════════════════════════════════
function EditModal({ emp, millRoutes, onClose, onSaved, showToast }) {
  const isStd = emp.isStandard || emp.role === "Standard";

  const [form, setForm] = useState({
    firstName:     emp.firstName     || "",
    lastName:      emp.lastName      || "",
    cnic:          emp.cnic          || "",
    mobile:        emp.mobile        || "",
    email:         emp.email         || "",
    address:       emp.address       || "",
    role:          emp.role          || "",
    notes:         emp.notes         || "",
    allowedRoutes: emp.allowedRoutes || [],
    newPassword:   "",
  });
  const [showPwd, setShowPwd]   = useState(false);
  const [saving,  setSaving]    = useState(false);
  const [lb,      setLb]        = useState(null);

  const isNowStd = form.role === "Standard";
  const strength  = pwdStrength(form.newPassword);

  // Package-filtered routes
  const availRoutes = millRoutes.length && !millRoutes.includes("*")
    ? ALL_ROUTES.filter(r => millRoutes.includes(r))
    : ALL_ROUTES;

  const setF = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleCnic = e => {
    const d = e.target.value.replace(/\D/g,"").slice(0,13);
    let f = d;
    if (d.length > 5)  f = `${d.slice(0,5)}-${d.slice(5)}`;
    if (d.length > 12) f = `${d.slice(0,5)}-${d.slice(5,12)}-${d.slice(12)}`;
    setF("cnic", f);
  };

  const handlePhone = e => {
    const raw      = e.target.value;
    const noPrefix = raw.startsWith("+923") ? raw.slice(4) : raw.replace(/^\+?9?2?3?/,"");
    setF("mobile", "+923" + noPrefix.replace(/\D/g,"").slice(0,9));
  };

  const toggleRoute = r => setF("allowedRoutes", form.allowedRoutes.includes(r)
    ? form.allowedRoutes.filter(x => x !== r)
    : [...form.allowedRoutes, r]);

  const save = async () => {
    setSaving(true);
    const token = localStorage.getItem("token");
    const body  = { ...form };
    if (!body.newPassword) delete body.newPassword;
    if (isNowStd) { body.allowedRoutes = []; body.isStandard = true; }
    else          { body.isStandard = false; }
    // rename newPassword → password for backend
    if (body.newPassword) { body.password = body.newPassword; delete body.newPassword; }

    try {
      const r = await fetch(`${API_BASE_URL}/employees/${emp._id}`, {
        method:"PUT",
        headers:{ "Content-Type":"application/json", Authorization:`Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message);
      showToast("Employee updated", "success");
      onSaved();
      onClose();
    } catch(e) { showToast(e.message, "error"); }
    setSaving(false);
  };

  return (
    <div className="ve-overlay" onClick={onClose}>
      <div className="ve-modal" style={{ maxWidth:680 }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="ve-modal-hd">
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {emp.profilePicUrl
              ? <div className="ve-pic"><img src={emp.profilePicUrl} alt=""/></div>
              : <div className="ve-av" style={{ background:avatarColor(emp.firstName) }}>{initials(emp.firstName, emp.lastName)}</div>
            }
            <div>
              <div style={{ fontSize:14.5, fontWeight:700, color:"#111827" }}>{emp.firstName} {emp.lastName}</div>
              <div style={{ fontSize:11, color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>{emp.employeeId}</div>
            </div>
            {isStd && <span style={{ fontSize:10, background:"#f5f3ff", color:"#7c3aed", border:"1px solid #ddd6fe", borderRadius:4, padding:"2px 7px", fontWeight:700, letterSpacing:".05em", textTransform:"uppercase" }}>Standard</span>}
          </div>
          <CloseBtn onClick={onClose}/>
        </div>

        {/* Body */}
        <div className="ve-modal-body" style={{ maxHeight:"72vh" }}>

          {/* Linked account */}
          {emp.linkedAccountId && (
            <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:7, padding:"8px 12px", marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
              <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#15803d" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <span style={{ fontSize:12, color:"#15803d", fontWeight:600 }}>
                Linked Account: {emp.linkedAccountId.accountName || "—"}
              </span>
              <span style={{ marginLeft:"auto", fontFamily:"'DM Mono',monospace", fontSize:12, fontWeight:700, color:"#15803d" }}>
                {fmtPKR(emp.linkedAccountId.balance)}
              </span>
            </div>
          )}

          {/* Personal Info */}
          <div className="ve-slbl"><span>Personal Information</span></div>
          <div className="ve-g2" style={{ marginBottom:11 }}>
            <div><label className="ve-flbl">First Name</label><input className="ve-inp" value={form.firstName} onChange={e=>setF("firstName",e.target.value)}/></div>
            <div><label className="ve-flbl">Last Name</label><input className="ve-inp" value={form.lastName} onChange={e=>setF("lastName",e.target.value)}/></div>
            <div>
              <label className="ve-flbl">CNIC</label>
              <input className="ve-inp mono" value={form.cnic} onChange={handleCnic} placeholder="XXXXX-XXXXXXX-X"/>
            </div>
            <div>
              <label className="ve-flbl">Mobile</label>
              <input className="ve-inp mono" value={form.mobile}
                onFocus={() => { if (!form.mobile) setF("mobile", "+923"); }}
                onBlur  ={() => { if (form.mobile === "+923") setF("mobile", ""); }}
                onChange={handlePhone} placeholder="+923XXXXXXXXX"/>
            </div>
            <div><label className="ve-flbl">Email</label><input className="ve-inp" type="email" value={form.email} onChange={e=>setF("email",e.target.value)}/></div>
            <div><label className="ve-flbl">Address</label><input className="ve-inp" value={form.address} onChange={e=>setF("address",e.target.value)}/></div>
          </div>

          {/* Role */}
          <div className="ve-slbl"><span>Role</span></div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:7, marginBottom:14 }}>
            {ROLES.map(r => (
              <div key={r}
                onClick={() => setF("role", r)}
                style={{ border:`1.5px solid ${form.role===r?"#111827":"#e5e7eb"}`, background:form.role===r?"#111827":"#f9fafb", color:form.role===r?"#fff":"#374151", borderRadius:6, padding:"7px 8px", cursor:"pointer", textAlign:"center", fontSize:12, fontWeight:600, transition:"all .1s" }}>
                {r}
              </div>
            ))}
          </div>

          {/* Notes — only for Standard */}
          {isNowStd && (
            <>
              <div className="ve-slbl"><span>Notes</span></div>
              <div style={{ marginBottom:14 }}>
                <textarea className="ve-ta"
                  placeholder="e.g. Chef · works kitchen shift · hired Mar 2025"
                  value={form.notes}
                  onChange={e => setF("notes", e.target.value)}
                  rows={3}/>
                <span style={{ fontSize:11, color:"#9ca3af", marginTop:3, display:"block" }}>For internal reference only. No system login.</span>
              </div>
            </>
          )}

          {/* Password — only for non-Standard */}
          {!isNowStd && (
            <>
              <div className="ve-slbl"><span>Change Password</span><span style={{ fontSize:11, fontWeight:400, color:"#9ca3af" }}>leave blank to keep current</span></div>
              <div style={{ maxWidth:340, marginBottom:14 }}>
                <div style={{ position:"relative" }}>
                  <input className="ve-inp" type={showPwd?"text":"password"} placeholder="New password (min 8 chars)"
                    style={{ paddingRight:38 }} value={form.newPassword} onChange={e => setF("newPassword", e.target.value)}/>
                  <button type="button" onClick={() => setShowPwd(s=>!s)}
                    style={{ position:"absolute", right:9, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#9ca3af", display:"flex", alignItems:"center" }}>
                    {showPwd ? <EyeOff size={14}/> : <Eye size={14}/>}
                  </button>
                </div>
                {form.newPassword && (
                  <>
                    <div style={{ display:"flex", gap:3, marginTop:5 }}>
                      {[1,2,3,4].map(i => <div key={i} className="ve-bar" style={{ background: i<=strength.score ? strength.color : "#f3f4f6" }}/>)}
                    </div>
                    <span style={{ fontSize:10.5, color:strength.color, fontWeight:600, marginTop:2, display:"block" }}>{strength.label}</span>
                  </>
                )}
              </div>
            </>
          )}

          {/* Routes — only for non-Standard */}
          {!isNowStd && (
            <>
              <div className="ve-slbl">
                <span>Page Permissions</span>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10.5, fontWeight:700, color:"#374151" }}>
                  {form.allowedRoutes.length} / {availRoutes.length}
                </span>
              </div>
              <div style={{ display:"flex", gap:6, marginBottom:8 }}>
                <button type="button" onClick={() => setF("allowedRoutes",[...availRoutes])}
                  style={{ fontSize:11, padding:"3px 9px", borderRadius:4, border:"1px solid #e5e7eb", background:"#fff", color:"#374151", fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}>Select All</button>
                <button type="button" onClick={() => setF("allowedRoutes",[])}
                  style={{ fontSize:11, padding:"3px 9px", borderRadius:4, border:"1px solid #e5e7eb", background:"#fff", color:"#374151", fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}>Clear</button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:4, maxHeight:180, overflowY:"auto", marginBottom:14, scrollbarWidth:"thin" }}>
                {availRoutes.map(r => {
                  const on = form.allowedRoutes.includes(r);
                  return (
                    <div key={r} className={`ve-rp${on?" on":""}`} onClick={() => toggleRoute(r)}>
                      <div className="ve-rp-cb">{on && <Tick/>}</div>
                      <span className="ve-rp-lbl">{prettyRoute(r)}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Documents — always shown (read-only view, 3 sections) */}
          <div className="ve-slbl"><span>Professional Documents</span></div>
          <DocSection label="Professional Docs" docs={emp.professionalDocs} onPreview={(s,n) => setLb({s,n})}/>

          <div style={{ marginTop:12 }}>
            <div className="ve-slbl"><span>Supporting Documents</span></div>
            <DocSection label="Supporting Docs" docs={emp.supportingDocs} onPreview={(s,n) => setLb({s,n})}/>
          </div>

          {/* Legacy docs fallback */}
          {emp.documents?.length > 0 && !emp.professionalDocs?.length && !emp.supportingDocs?.length && (
            <div style={{ marginTop:12 }}>
              <div className="ve-slbl"><span>Documents</span></div>
              <DocSection label="Documents" docs={emp.documents} onPreview={(s,n) => setLb({s,n})}/>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="ve-modal-ft">
          <button onClick={onClose} disabled={saving}
            style={{ padding:"7px 14px", borderRadius:6, border:"1px solid #e5e7eb", background:"#fff", fontSize:13, fontWeight:500, color:"#374151", fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}>
            Cancel
          </button>
          <button onClick={save} disabled={saving}
            style={{ padding:"7px 16px", borderRadius:6, border:"none", background:"#111827", color:"#fff", fontSize:13, fontWeight:600, fontFamily:"'DM Sans',sans-serif", cursor:"pointer", display:"flex", alignItems:"center", gap:6, opacity:saving?.6:1 }}>
            {saving ? <><span className="ve-spin"><svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg></span>Saving…</>
             : <><svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>Save Changes</>}
          </button>
        </div>
      </div>

      {lb && <Lightbox src={lb.s} name={lb.n} onClose={() => setLb(null)}/>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════════════════════
export default function ViewEmployees() {
  const token = localStorage.getItem("token");

  const [employees,  setEmployees]  = useState([]);
  const [filtered,   setFiltered]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState("");
  const [roleF,      setRoleF]      = useState("");
  const [statusF,    setStatusF]    = useState("");
  const [notifMsg,   setNotifMsg]   = useState("");
  const [notifType,  setNotifType]  = useState("");
  const [editEmp,    setEditEmp]    = useState(null);
  const [delTarget,  setDelTarget]  = useState(null);
  const [lb,         setLb]         = useState(null);

  const millRoutes = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem("allowedRoutes")) || []; } catch { return []; }
  }, []);

  const toast = useCallback((msg, type) => {
    setNotifMsg(msg); setNotifType(type);
    setTimeout(() => setNotifMsg(""), 4000);
  }, []);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API_BASE_URL}/employees`, { headers:{ Authorization:`Bearer ${token}` } });
      const d = await r.json();
      if (r.ok) { setEmployees(d); setFiltered(d); }
      else toast(d.message || "Failed to load", "error");
    } catch { toast("Server error", "error"); }
    setLoading(false);
  }, [token, toast]);

  useEffect(() => { fetchEmployees(); }, [fetchEmployees]);

  useEffect(() => {
    let f = [...employees];
    if (search)  f = f.filter(e => `${e.firstName} ${e.lastName} ${e.email} ${e.cnic||""}`.toLowerCase().includes(search.toLowerCase()));
    if (roleF)   f = f.filter(e => e.role === roleF);
    if (statusF) f = f.filter(e => e.isActive === (statusF === "Active"));
    setFiltered(f);
  }, [search, roleF, statusF, employees]);

  const toggleStatus = async emp => {
    try {
      await fetch(`${API_BASE_URL}/employees/${emp._id}/toggle`, { method:"PATCH", headers:{ Authorization:`Bearer ${token}` } });
      toast(`${emp.firstName} ${emp.isActive?"restricted":"enabled"}`, "success");
      fetchEmployees();
    } catch { toast("Failed", "error"); }
  };

  const doDelete = async () => {
    if (!delTarget) return;
    try {
      const r = await fetch(`${API_BASE_URL}/employees/${delTarget._id}`, { method:"DELETE", headers:{ Authorization:`Bearer ${token}` } });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message);
      toast("Employee deleted", "success");
      fetchEmployees();
    } catch(e) { toast(e.message, "error"); }
    setDelTarget(null);
  };

  const roleTagClass = r => ({
    Admin:"admin", Accountant:"accountant", Worker:"worker", Standard:"standard",
  }[r] || "worker");

  const hasFilters = search || roleF || statusF;

  const lbl = { display:"block", fontSize:9.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#6b7280", marginBottom:4, fontFamily:"'DM Mono',monospace" };

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification message={notifMsg} type={notifType}/>

      <div className="ve">
        {/* Page header */}
        <div style={{ marginBottom:16, display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <div>
            <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 2px" }}>HR Management</p>
            <h1 style={{ fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px", margin:0 }}>Employees</h1>
          </div>
          {!loading && (
            <span style={{ fontSize:11.5, color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>
              {filtered.length}{filtered.length !== employees.length && ` / ${employees.length}`} employee{filtered.length !== 1 ? "s" : ""}
              {filtered.some(e => e.isStandard) && ` · ${filtered.filter(e=>e.isStandard).length} standard`}
            </span>
          )}
        </div>

        {/* Filters */}
        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, padding:"11px 14px", marginBottom:13 }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr auto", gap:10, alignItems:"end" }}>
            <div>
              <label style={lbl}>Search</label>
              <div style={{ position:"relative" }}>
                <svg style={{ position:"absolute", left:9, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                  <circle cx={11} cy={11} r={8}/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
                </svg>
                <input className="ve-inp" style={{ paddingLeft:28 }} placeholder="Name, email, CNIC…" value={search} onChange={e => setSearch(e.target.value)}/>
              </div>
            </div>
            <div>
              <label style={lbl}>Role</label>
              <select className="ve-sel" value={roleF} onChange={e => setRoleF(e.target.value)}>
                <option value="">All roles</option>
                {ROLES.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Status</label>
              <select className="ve-sel" value={statusF} onChange={e => setStatusF(e.target.value)}>
                <option value="">All</option>
                <option>Active</option><option>Inactive</option>
              </select>
            </div>
            <div style={{ paddingTop:18 }}>
              <button onClick={() => { setSearch(""); setRoleF(""); setStatusF(""); }}
                style={{ padding:"7px 11px", borderRadius:6, border:"1px solid #e5e7eb", background:"#fff", color:"#374151", fontSize:12.5, cursor:hasFilters?"pointer":"default", opacity:hasFilters?1:.35, fontFamily:"'DM Sans',sans-serif" }}>
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, overflow:"hidden" }}>
          <table className="ve-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>CNIC</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Account</th>
                <th>Status</th>
                <th style={{ textAlign:"center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_,i) => (
                  <tr key={i}>{[180,120,160,80,130,70,120].map((w,j) => (
                    <td key={j} style={{ padding:11 }}><div className="ve-sk" style={{ height:12, width:w, maxWidth:"100%" }}/></td>
                  ))}</tr>
                ))
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7}>
                  <div style={{ textAlign:"center", padding:"52px 20px", color:"#9ca3af" }}>
                    <svg width={38} height={38} fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={1.2} style={{ margin:"0 auto 10px", display:"block" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <p style={{ fontSize:13, fontWeight:600, color:"#374151", margin:"0 0 3px" }}>No employees found</p>
                    <p style={{ fontSize:12, margin:0 }}>Adjust filters or create a new employee</p>
                  </div>
                </td></tr>
              ) : filtered.map(emp => {
                const acct = emp.linkedAccountId;
                const bal  = acct?.balance || 0;
                return (
                  <tr key={emp._id}>
                    {/* Name + ID */}
                    <td>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        {emp.profilePicUrl
                          ? <img src={emp.profilePicUrl} alt="" className="ve-av-img"/>
                          : <div className="ve-av" style={{ background:avatarColor(emp.firstName) }}>{initials(emp.firstName, emp.lastName)}</div>
                        }
                        <div>
                          <div style={{ fontWeight:600, color:"#111827", fontSize:13 }}>{emp.firstName} {emp.lastName}</div>
                          <div style={{ fontSize:11, color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>{emp.employeeId}</div>
                        </div>
                      </div>
                    </td>
                    {/* CNIC */}
                    <td style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"#6b7280" }}>{emp.cnic || "—"}</td>
                    {/* Contact */}
                    <td>
                      <div style={{ fontSize:12.5, color:"#374151" }}>{emp.email}</div>
                      {emp.mobile && <div style={{ fontSize:11, color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>{emp.mobile}</div>}
                    </td>
                    {/* Role */}
                    <td><span className={`ve-role-tag ${roleTagClass(emp.role)}`}>{emp.role}</span></td>
                    {/* Linked account */}
                    <td>
                      {acct
                        ? <span className={`ve-acc-pill${bal===0?" zero":""}`}>
                            <svg width={8} height={8} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                            {fmtPKR(bal)}
                          </span>
                        : <span style={{ fontSize:11, color:"#d1d5db" }}>—</span>
                      }
                    </td>
                    {/* Status */}
                    <td>
                      <span className={`ve-badge ${emp.isActive?"active":"inactive"}`}>
                        <span style={{ width:5, height:5, borderRadius:"50%", background:emp.isActive?"#15803d":"#dc2626", display:"inline-block" }}/>
                        {emp.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    {/* Actions */}
                    <td>
                      <div style={{ display:"flex", gap:4, justifyContent:"center" }}>
                        <button className={`ve-btn ${emp.isActive?"restrict":"enable"}`} onClick={() => toggleStatus(emp)}>
                          {emp.isActive ? "Restrict" : "Enable"}
                        </button>
                        <button className="ve-btn edit" onClick={() => setEditEmp(emp)}>
                          <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          Edit
                        </button>
                        <button className="ve-btn del" onClick={() => setDelTarget(emp)}>
                          <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          Del
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {!loading && filtered.length > 0 && (
          <p style={{ textAlign:"center", color:"#9ca3af", fontSize:11.5, marginTop:13, fontFamily:"'DM Mono',monospace" }}>
            {filtered.length} employee{filtered.length !== 1 ? "s" : ""}
            {hasFilters ? ` filtered from ${employees.length} total` : ""}
          </p>
        )}
      </div>

      {/* Edit modal */}
      {editEmp && (
        <EditModal
          emp={editEmp}
          millRoutes={millRoutes}
          onClose={() => setEditEmp(null)}
          onSaved={fetchEmployees}
          showToast={toast}
        />
      )}

      {/* Delete confirm */}
      {delTarget && (
        <div className="ve-del-overlay" onClick={() => setDelTarget(null)}>
          <div style={{ background:"#fff", borderRadius:9, maxWidth:360, width:"100%", border:"1px solid #e5e7eb", boxShadow:"0 16px 48px rgba(0,0,0,.14)" }} onClick={e => e.stopPropagation()}>
            <div style={{ padding:"13px 16px", borderBottom:"1px solid #e5e7eb", display:"flex", alignItems:"center", gap:9 }}>
              <div style={{ width:32, height:32, borderRadius:7, background:"#fef2f2", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </div>
              <span style={{ fontSize:14.5, fontWeight:700, color:"#111827" }}>Delete Employee</span>
              <CloseBtn onClick={() => setDelTarget(null)}/>
            </div>
            <div style={{ padding:"14px 16px" }}>
              <p style={{ fontSize:13.5, color:"#4b5563", lineHeight:1.6, margin:0 }}>
                Delete <strong style={{ color:"#111827" }}>{delTarget.firstName} {delTarget.lastName}</strong>? This cannot be undone.
              </p>
            </div>
            <div style={{ padding:"10px 16px", borderTop:"1px solid #f3f4f6", background:"#f9fafb", display:"flex", justifyContent:"flex-end", gap:7, borderRadius:"0 0 9px 9px" }}>
              <button onClick={() => setDelTarget(null)}
                style={{ padding:"7px 13px", borderRadius:6, border:"1px solid #e5e7eb", background:"#fff", fontSize:12.5, fontWeight:500, color:"#374151", fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}>
                Cancel
              </button>
              <button onClick={doDelete}
                style={{ padding:"7px 13px", borderRadius:6, border:"none", background:"#dc2626", color:"#fff", fontSize:12.5, fontWeight:600, fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {lb && <Lightbox src={lb.s} name={lb.n} onClose={() => setLb(null)}/>}
    </SidebarLayout>
  );
}