import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL  from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .pr { font-family: 'DM Sans', sans-serif; color: #111827; }

  /* hide number spinners globally in this component */
  .pr input[type=number]::-webkit-inner-spin-button,
  .pr input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  .pr input[type=number] { -moz-appearance: textfield; }

  @keyframes pr-up { from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none} }
  @keyframes pr-spin { to{transform:rotate(360deg)} }
  @keyframes pr-pulse { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(.82)} }

  .pr-hero {
    background: #fff; border: 1px solid #e5e7eb; border-radius: 8px;
    border-top: 3px solid #111827;
    padding: 22px 24px; margin-bottom: 14px;
    display: flex; align-items: center; gap: 20px;
  }

  .pr-avatar {
    width: 68px; height: 68px; border-radius: 10px; flex-shrink: 0;
    background: #f3f4f6; border: 1px solid #e5e7eb;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; position: relative; cursor: pointer;
    transition: box-shadow .15s;
  }
  .pr-avatar:hover { box-shadow: 0 0 0 3px rgba(107,114,128,.15); }
  .pr-avatar img { width:100%; height:100%; object-fit:cover; display:block; position:absolute; inset:0; }
  .pr-avatar-overlay {
    position:absolute; inset:0; background:rgba(0,0,0,.45);
    display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px;
    opacity:0; transition:opacity .15s;
  }
  .pr-avatar:hover .pr-avatar-overlay { opacity:1; }
  .pr-avatar-overlay span { font-size:8px; font-weight:700; color:#fff; letter-spacing:.1em; text-transform:uppercase; }
  .pr-upload-hint { font-size:9px; font-weight:600; letter-spacing:.08em; color:#9ca3af; text-align:center; margin-top:5px; text-transform:uppercase; font-family:'DM Mono',monospace; }

  .pr-hero-info { flex:1; min-width:0; }
  .pr-hero-name { font-size:18px; font-weight:700; color:#111827; margin-bottom:2px; letter-spacing:-.3px; }
  .pr-hero-biz  { font-size:12px; color:#9ca3af; margin-bottom:10px; font-family:'DM Mono',monospace; }
  .pr-hero-pills { display:flex; gap:6px; flex-wrap:wrap; }
  .pr-pill { font-family:'DM Mono',monospace; font-size:10px; font-weight:600; padding:2px 9px; border-radius:4px; border:1px solid; letter-spacing:.05em; }
  .pr-pill-green  { background:#f0fdf4; color:#15803d; border-color:#bbf7d0; }
  .pr-pill-gray   { background:#f3f4f6; color:#374151; border-color:#e5e7eb; }
  .pr-pill-amber  { background:#fef2f2; color:#dc2626; border-color:#fecaca; }
  .pr-hero-sub { font-size:10.5px; color:#d1d5db; margin-top:7px; font-family:'DM Mono',monospace; }

  .pr-tabs {
    display:flex; gap:2px; background:#f3f4f6; border-radius:8px; padding:3px;
    margin-bottom:14px; flex-wrap:wrap; border:1px solid #e5e7eb;
  }
  .pr-tab {
    flex:1; min-width:80px; padding:8px 10px; border-radius:6px; border:none;
    background:transparent; font-size:12px; font-weight:500; cursor:pointer;
    color:#6b7280; font-family:'DM Sans',sans-serif; transition:.12s;
    display:flex; align-items:center; justify-content:center; gap:5px; white-space:nowrap;
  }
  .pr-tab:hover { background:#fff; color:#111827; }
  .pr-tab.on { background:#fff; color:#111827; font-weight:700; box-shadow:0 1px 4px rgba(0,0,0,.08); }

  .pr-card {
    background:#fff; border:1px solid #e5e7eb; border-radius:8px;
    margin-bottom:10px; overflow:hidden; animation:pr-up .2s ease both;
  }
  .pr-card-title {
    padding:10px 16px; background:#f9fafb; border-bottom:1px solid #e5e7eb;
    font-size:11px; font-weight:700; color:#374151;
    text-transform:uppercase; letter-spacing:.08em;
    display:flex; align-items:center; gap:8px;
  }
  .pr-card-title::before { content:''; width:3px; height:13px; background:#111827; border-radius:2px; flex-shrink:0; }
  .pr-card-body { padding:16px; }

  .pr-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .pr-field  { display:flex; flex-direction:column; gap:5px; }
  .pr-label  { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; color:#6b7280; }
  .pr-label em { color:#ef4444; font-style:normal; margin-left:2px; }

  .pr-input {
    width:100%; padding:8px 11px; border:1px solid #d1d5db; border-radius:6px; font-size:13px;
    color:#111827; font-family:'DM Sans',sans-serif; outline:none;
    transition:border-color .12s, box-shadow .12s; background:#fff;
  }
  .pr-input:focus  { border-color:#6b7280; box-shadow:0 0 0 2px rgba(107,114,128,.12); }
  .pr-input:disabled { background:#f9fafb; color:#9ca3af; cursor:not-allowed; }
  .pr-input.mono   { font-family:'DM Mono',monospace; font-size:12.5px; }
  .pr-input::placeholder { color:#9ca3af; }

  .pr-select {
    width:100%; padding:8px 11px; border:1px solid #d1d5db; border-radius:6px; font-size:13px;
    color:#111827; font-family:'DM Sans',sans-serif; outline:none;
    transition:border-color .12s; background:#fff; cursor:pointer; appearance:none;
  }
  .pr-select:focus { border-color:#6b7280; box-shadow:0 0 0 2px rgba(107,114,128,.12); }

  .pr-textarea {
    width:100%; padding:8px 11px; border:1px solid #d1d5db; border-radius:6px;
    font-size:13px; color:#111827; font-family:'DM Sans',sans-serif;
    outline:none; transition:border-color .12s; resize:vertical; min-height:80px; background:#fff;
  }
  .pr-textarea:focus { border-color:#6b7280; box-shadow:0 0 0 2px rgba(107,114,128,.12); }

  .pr-btn {
    padding:8px 16px; border-radius:6px; border:none; font-size:12.5px; font-weight:600;
    font-family:'DM Sans',sans-serif; cursor:pointer; transition:background .12s;
    display:inline-flex; align-items:center; gap:6px;
  }
  .pr-btn-primary { background:#111827; color:#fff; }
  .pr-btn-primary:hover:not(:disabled) { background:#1f2937; }
  .pr-btn-primary:disabled { background:#f3f4f6; color:#9ca3af; cursor:not-allowed; }
  .pr-btn-green   { background:#15803d; color:#fff; }
  .pr-btn-green:hover:not(:disabled) { background:#166534; }
  .pr-btn-green:disabled { background:#f3f4f6; color:#9ca3af; cursor:not-allowed; }
  .pr-btn-outline { background:#fff; border:1px solid #e5e7eb; color:#374151; }
  .pr-btn-outline:hover { background:#f9fafb; border-color:#d1d5db; }
  .pr-btn-danger  { background:#fef2f2; border:1px solid #fecaca; color:#dc2626; }
  .pr-btn-danger:hover:not(:disabled) { background:#dc2626; color:#fff; border-color:#dc2626; }
  .pr-btn-sm { padding:5px 10px; font-size:11.5px; }

  .pr-vtable { width:100%; border-collapse:collapse; font-size:12.5px; }
  .pr-vtable thead tr { background:#f9fafb; border-bottom:1px solid #e5e7eb; }
  .pr-vtable thead th { padding:8px 12px; text-align:left; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:#9ca3af; white-space:nowrap; }
  .pr-vtable tbody tr { border-bottom:1px solid #f9fafb; transition:background .08s; }
  .pr-vtable tbody tr:last-child { border-bottom:none; }
  .pr-vtable tbody tr:hover { background:#fafafa; }
  .pr-vtable tbody td { padding:9px 12px; vertical-align:middle; }
  .pr-td-mono { font-family:'DM Mono',monospace; color:#374151; font-weight:500; }
  .pr-td-green { font-family:'DM Mono',monospace; color:#15803d; font-weight:600; }
  .pr-td-actions { display:flex; gap:5px; }
  .pr-no-data { padding:28px; text-align:center; color:#9ca3af; font-size:13px; }

  .pr-err-box { padding:11px 14px; background:#fef2f2; border:1px solid #fecaca; border-radius:6px; font-size:12.5px; color:#dc2626; margin-bottom:12px; }

  .pr-season {
    padding:12px 14px; margin-bottom:8px;
    border:1px solid #e5e7eb; border-radius:7px;
    display:flex; align-items:center; gap:12px;
    transition:border-color .12s, box-shadow .12s; background:#fff;
  }
  .pr-season:hover { border-color:#d1d5db; box-shadow:0 1px 6px rgba(0,0,0,.06); }
  .pr-season.active { border-color:#bbf7d0; background:#f0fdf4; }
  .pr-season-dot { width:8px; height:8px; border-radius:50%; background:#d1d5db; flex-shrink:0; }
  .pr-season-dot.active { background:#15803d; animation:pr-pulse 2s ease infinite; }
  .pr-season-name  { font-size:13px; font-weight:600; color:#111827; }
  .pr-season-dates { font-size:11px; color:#9ca3af; font-family:'DM Mono',monospace; margin-top:1px; }
  .pr-season-bal   { font-family:'DM Mono',monospace; font-size:12.5px; color:#15803d; font-weight:600; margin-left:auto; white-space:nowrap; background:#f0fdf4; padding:2px 9px; border-radius:4px; border:1px solid #bbf7d0; }
  .pr-season-actions { display:flex; gap:5px; }

  .pr-paytl { position:relative; padding-left:18px; }
  .pr-paytl::before { content:''; position:absolute; left:5px; top:8px; bottom:8px; width:1px; background:#e5e7eb; }
  .pr-paycard { position:relative; background:#fff; border:1px solid #e5e7eb; border-radius:7px; padding:13px 14px; margin-bottom:9px; }
  .pr-paycard:hover { border-color:#d1d5db; }
  .pr-paycard.latest { border-color:#bbf7d0; background:#f0fdf4; }
  .pr-paycard::before { content:''; position:absolute; left:-14px; top:14px; width:7px; height:7px; border-radius:50%; background:#15803d; border:2px solid #fff; box-shadow:0 0 0 1px #bbf7d0; }
  .pr-paycard.old::before { background:#d1d5db; box-shadow:none; }
  .pr-paytop { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:9px; gap:8px; flex-wrap:wrap; }
  .pr-paytid { font-family:'DM Mono',monospace; font-size:11.5px; color:#15803d; font-weight:600; }
  .pr-paytime { font-size:11px; color:#9ca3af; }
  .pr-payamt  { font-size:16px; font-weight:700; color:#111827; font-family:'DM Mono',monospace; }
  .pr-paygrid { display:grid; grid-template-columns:1fr 1fr; gap:6px; }
  .pr-payfk { font-size:9.5px; text-transform:uppercase; letter-spacing:.08em; color:#9ca3af; font-family:'DM Mono',monospace; margin-bottom:1px; }
  .pr-payfv { font-size:12.5px; color:#374151; }
  .pr-nopay { padding:28px; text-align:center; color:#9ca3af; font-size:13px; border:1px dashed #e5e7eb; border-radius:7px; }

  .pr-type-row { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px; }
  .pr-type-btn { padding:6px 13px; border-radius:6px; border:1px solid #e5e7eb; font-size:12px; font-weight:500; font-family:'DM Sans',sans-serif; cursor:pointer; transition:.12s; background:#fff; color:#374151; }
  .pr-type-btn:hover { border-color:#d1d5db; color:#111827; }
  .pr-type-btn.on     { background:#111827; color:#fff; border-color:#111827; }
  .pr-type-btn.on-red { background:#dc2626; color:#fff; border-color:#dc2626; }

  .pr-complaint { background:#f9fafb; border:1px solid #e5e7eb; border-radius:7px; padding:12px 14px; margin-bottom:8px; }
  .pr-cs { font-size:10px; font-weight:700; padding:2px 8px; border-radius:4px; border:1px solid; font-family:'DM Mono',monospace; letter-spacing:.07em; text-transform:uppercase; }
  .pr-cs-open     { background:#f3f4f6; color:#374151; border-color:#e5e7eb; }
  .pr-cs-review   { background:#fffbeb; color:#d97706; border-color:#fde68a; }
  .pr-cs-resolved { background:#f0fdf4; color:#15803d; border-color:#bbf7d0; }

  .pr-toast {
    position:fixed; bottom:20px; right:20px; z-index:9999; padding:10px 16px; border-radius:8px;
    font-size:13px; font-weight:600; background:#fff; color:#111827;
    box-shadow:0 4px 20px rgba(0,0,0,.12); display:flex; align-items:center; gap:8px;
    animation:pr-up .2s ease; border:1px solid #e5e7eb; max-width:340px;
    font-family:'DM Sans',sans-serif;
  }
  .pr-toast.ok  { border-color:#bbf7d0; border-top:3px solid #15803d; }
  .pr-toast.err { border-color:#fecaca; border-top:3px solid #dc2626; }

  /* ── Confirm dialog overlay ── */
  .pr-dlg-overlay {
    position:fixed; inset:0; z-index:1300;
    display:flex; align-items:center; justify-content:center;
    background:rgba(0,0,0,.5); padding:16px;
  }
  .pr-dlg {
    background:#fff; border-radius:10px; width:100%; max-width:380px;
    box-shadow:0 16px 48px rgba(0,0,0,.22); border:1px solid #e5e7eb; overflow:hidden;
    animation:pr-up .16s ease;
  }
  .pr-dlg-head { padding:14px 20px; border-bottom:1px solid #e5e7eb; background:#f9fafb; }
  .pr-dlg-head-title { font-size:14px; font-weight:700; color:#111827; }
  .pr-dlg-body { padding:16px 20px; font-size:13px; color:#374151; line-height:1.6; }
  .pr-dlg-foot { padding:12px 20px; border-top:1px solid #f3f4f6; background:#f9fafb; display:flex; justify-content:flex-end; gap:8px; }

  .pr-spin { animation:pr-spin .8s linear infinite; display:inline-block; }
  @media(max-width:640px){ .pr-grid2{grid-template-columns:1fr;} .pr-hero{flex-direction:column;} .pr-tabs{flex-wrap:wrap;} }
`;

/* ── helpers ── */
const fmt  = d => d ? new Date(d).toLocaleDateString("en-PK",{year:"numeric",month:"short",day:"numeric"}) : "—";
const fmtT = d => d ? new Date(d).toLocaleString("en-PK",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}) : "—";
const blockNonNumeric = e => { if (['e','E','+','-'].includes(e.key)) e.preventDefault(); };

const TABS = [
  { id:"account",  label:"Account",  icon:"👤" },
  { id:"seasons",  label:"Seasons",  icon:"📅" },
  { id:"mill",     label:"Mill",     icon:"⚙️" },
  { id:"payments", label:"Payments", icon:"💳" },
  { id:"support",  label:"Support",  icon:"📝" },
];

async function safeFetch(url, options = {}) {
  try {
    const res = await authFetch(url, options);
    if (!res) return { ok:false, error:"No response" };
    const text = await res.text();
    let data = {};
    try { data = JSON.parse(text); } catch { data = { message:text }; }
    if (!res.ok) return { ok:false, error:data.message||`HTTP ${res.status}` };
    return { ok:true, data };
  } catch(err) { return { ok:false, error:err.message||"Network error" }; }
}

function Field({ label, required, children }) {
  return (
    <div className="pr-field">
      <label className="pr-label">{label}{required && <em>*</em>}</label>
      {children}
    </div>
  );
}

function ErrBox({ msg }) {
  return msg ? <div className="pr-err-box">⚠ {msg}</div> : null;
}

function Toast({ msg, ok }) {
  return (
    <div className={`pr-toast ${ok?"ok":"err"}`}>
      {ok
        ? <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#15803d" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        : <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>}
      {msg}
    </div>
  );
}

/* ── Generic confirm dialog ─────────────────────────────────────────────── */
function ConfirmDialog({ title, description, confirmLabel = "Confirm", danger = false, onConfirm, onCancel, busy = false }) {
  return (
    <div className="pr-dlg-overlay">
      <div className="pr-dlg">
        <div className="pr-dlg-head">
          <div className="pr-dlg-head-title">{title}</div>
        </div>
        <div className="pr-dlg-body">{description}</div>
        <div className="pr-dlg-foot">
          <button className="pr-btn pr-btn-outline pr-btn-sm" onClick={onCancel} disabled={busy}>Cancel</button>
          <button
            className={`pr-btn pr-btn-sm ${danger ? "pr-btn-danger" : "pr-btn-primary"}`}
            style={{ padding:"7px 16px", ...(danger && { background:"#dc2626", color:"#fff", borderColor:"#dc2626" }) }}
            onClick={onConfirm}
            disabled={busy}>
            {busy ? <><span className="pr-spin">⟳</span> …</> : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function ReadField({ label, value, mono }) {
  return (
    <div className="pr-field">
      <label className="pr-label">{label}</label>
      <div style={{ padding:"8px 11px", background:"#f9fafb", border:"1px solid #e5e7eb", borderRadius:6, fontSize:13, color:"#6b7280", fontFamily:mono?"'DM Mono',monospace":"inherit", fontWeight:mono?500:400 }}>{value||"—"}</div>
    </div>
  );
}

function CopyField({ label, value, mono }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  };
  return (
    <div className="pr-field">
      <label className="pr-label">{label}</label>
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        <div style={{ flex:1, padding:"8px 11px", background:"#f9fafb", border:"1px solid #e5e7eb", borderRadius:6, fontSize:13, color:"#6b7280", fontFamily:mono?"'DM Mono',monospace":"inherit", fontWeight:mono?500:400, letterSpacing:mono?".04em":"inherit" }}>
          {value||"—"}
        </div>
        <button type="button" onClick={copy} title="Copy" style={{ flexShrink:0, padding:"7px 10px", border:`1px solid ${copied?"#bbf7d0":"#e5e7eb"}`, borderRadius:6, background:copied?"#f0fdf4":"#f9fafb", cursor:"pointer", display:"flex", alignItems:"center", gap:4, fontSize:11, fontWeight:600, color:copied?"#15803d":"#6b7280", transition:"all .15s", fontFamily:"'DM Sans',sans-serif" }}>
          {copied ? <><svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="#15803d" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>Copied</> : <><svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copy</>}
        </button>
      </div>
    </div>
  );
}

function pwdStrength(p) {
  if (!p) return { score:0, label:"", color:"" };
  let score = 0;
  if (p.length >= 8)           score++;
  if (p.length >= 12)          score++;
  if (/[A-Z]/.test(p))         score++;
  if (/[0-9]/.test(p))         score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  if (score <= 1) return { score, label:"Weak",       color:"#dc2626", bars:1 };
  if (score <= 2) return { score, label:"Fair",       color:"#d97706", bars:2 };
  if (score <= 3) return { score, label:"Good",       color:"#2563eb", bars:3 };
  if (score <= 4) return { score, label:"Strong",     color:"#15803d", bars:4 };
  return             { score, label:"Very Strong", color:"#15803d", bars:5 };
}

function EyeBtn({ show, onToggle }) {
  return (
    <button type="button" onClick={onToggle}
      style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)",
        background:"none", border:"none", cursor:"pointer", color:"#9ca3af", padding:3,
        display:"flex", alignItems:"center", transition:"color .12s", zIndex:1 }}
      onMouseEnter={e=>e.currentTarget.style.color="#374151"}
      onMouseLeave={e=>e.currentTarget.style.color="#9ca3af"}>
      {show
        ? <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
        : <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
      }
    </button>
  );
}

function PwdForm({ showToast }) {
  const [pwd,  setPwd]  = React.useState({ current:"", next:"", confirm:"" });
  const [show, setShow] = React.useState({ current:false, next:false, confirm:false });
  const [busy, setBusy] = React.useState(false);
  const strength = pwdStrength(pwd.next);

  const save = async () => {
    if (!pwd.current)             return showToast("Please enter your current password", false);
    if (pwd.next !== pwd.confirm) return showToast("New passwords don't match", false);
    if (pwd.next.length < 8)      return showToast("Password must be at least 8 characters", false);
    setBusy(true);
    const { ok, error } = await safeFetch(`${API_BASE_URL}/profile/password`, {
      method:"PUT", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ currentPassword: pwd.current, newPassword: pwd.next }),
    });
    if (!ok) showToast(error || "Current password is incorrect", false);
    else { showToast("Password changed successfully ✓", true); setPwd({ current:"", next:"", confirm:"" }); }
    setBusy(false);
  };

  /* ── single password field — layout fixed ── */
  const PwdField = ({ field, placeholder, label }) => (
    <div className="pr-field">
      <label className="pr-label">{label}</label>
      {/* relative wrapper so eye button aligns to the right of the input */}
      <div style={{ position:"relative", display:"block" }}>
        <input
          className="pr-input"
          type={show[field] ? "text" : "password"}
          placeholder={placeholder}
          value={pwd[field]}
          onChange={e => setPwd(p => ({...p, [field]: e.target.value}))}
          /* padding-right makes room for eye icon — 38px = icon 16px + right 10px + gap */
          style={{ paddingRight:38 }}
        />
        <EyeBtn show={show[field]} onToggle={() => setShow(p => ({...p, [field]: !p[field]}))}/>
      </div>
      {field === "next" && pwd.next && (
        <div style={{ marginTop:6 }}>
          <div style={{ display:"flex", gap:3, marginBottom:4 }}>
            {[1,2,3,4,5].map(i => (
              <div key={i} style={{ flex:1, height:3, borderRadius:3, background:i<=strength.bars?strength.color:"#e5e7eb", transition:"background .2s" }}/>
            ))}
          </div>
          <div style={{ fontSize:11, fontWeight:600, color:strength.color }}>
            {strength.label}
            {strength.score < 3 && <span style={{ color:"#9ca3af", fontWeight:400 }}> — add uppercase, numbers or symbols</span>}
          </div>
        </div>
      )}
      {field === "confirm" && pwd.confirm && pwd.next && (
        <div style={{ fontSize:11, fontWeight:600, marginTop:4, color:pwd.next===pwd.confirm?"#15803d":"#dc2626" }}>
          {pwd.next === pwd.confirm ? "✓ Passwords match" : "✗ Passwords don't match"}
        </div>
      )}
    </div>
  );

  return (
    /* maxWidth matches the pr-grid2 container width in TabAccount */
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div className="pr-grid2">
        <PwdField field="current" placeholder="Enter current password" label="Current Password"/>
        <PwdField field="next"    placeholder="Enter new password"     label="New Password"/>
      </div>
      <div style={{ maxWidth:"calc(50% - 6px)" }}>
        <PwdField field="confirm" placeholder="Confirm new password"   label="Confirm New Password"/>
      </div>
      <div>
        <button className="pr-btn pr-btn-primary"
          onClick={save}
          disabled={busy || !pwd.current || !pwd.next || pwd.next !== pwd.confirm}>
          {busy ? <><span className="pr-spin">⟳</span> Changing…</> : "Change Password"}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   TAB: Account Info
════════════════════════════════════════════════ */
function TabAccount({ profile, onSaved, showToast, logoUrl, setLogoUrl, logoError, setLogoError, logoUploading, handleLogoUpload }) {
  const [form, setForm] = useState({ businessName:"", ownerName:"", email:"", phone:"" });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (profile) setForm({
      businessName: profile.businessName||"",
      ownerName:    profile.ownerName||"",
      email:        profile.email||"",
      phone:        profile.phone||"",
    });
  }, [profile]);

  const saveInfo = async () => {
    if (form.phone && !/^\+92\d{10}$/.test(form.phone))
      return showToast("Phone must be +92XXXXXXXXXX (10 digits after +92)", false);
    setBusy(true);
    const { ok, data, error } = await safeFetch(`${API_BASE_URL}/profile`, {
      method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form),
    });
    if (!ok) showToast(error, false);
    else {
      localStorage.setItem("businessName", data.profile.businessName);
      localStorage.setItem("name", data.profile.ownerName);
      showToast("Profile updated", true);
      onSaved(data.profile);
    }
    setBusy(false);
  };

  return (
    <div>
      <div className="pr-card">
        <div className="pr-card-title">Business Information</div>
        <div className="pr-card-body">
          <div className="pr-grid2" style={{ marginBottom:16 }}>
            <Field label="Business Name" required><input className="pr-input" value={form.businessName} onChange={e=>setForm({...form,businessName:e.target.value})}/></Field>
            <Field label="Owner Name" required><input className="pr-input" value={form.ownerName} onChange={e=>setForm({...form,ownerName:e.target.value})}/></Field>
            <Field label="Email Address"><input className="pr-input" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></Field>
            <Field label="Phone (+92XXXXXXXXXX)">
              <input className="pr-input mono" value={form.phone} placeholder="+923001234567" maxLength={13}
                onChange={e=>{
                  let raw=e.target.value.replace(/[^\d+]/g,"");
                  if(!raw.startsWith("+92")){const digits=raw.replace(/^\+?9?2?/,"").replace(/^0+/,"");raw="+92"+digits;}
                  if(raw.length>13)raw=raw.slice(0,13);
                  setForm({...form,phone:raw});
                }}
                onFocus={()=>{if(!form.phone)setForm({...form,phone:"+92"});}}
                onBlur={()=>{if(form.phone==="+92")setForm({...form,phone:""}); }}
              />
            </Field>
            <CopyField label="CNIC (login key — cannot change)" value={profile?.adminCnic} mono/>
            <CopyField label="Mill ID" value={profile?.millId} mono/>
          </div>
          <div style={{ display:"flex", justifyContent:"flex-end" }}>
            <button className="pr-btn pr-btn-primary" onClick={saveInfo} disabled={busy}>
              {busy ? <><span className="pr-spin">⟳</span> Saving…</> : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      <div className="pr-card">
        <div className="pr-card-title">Mill Business Logo</div>
        <div className="pr-card-body">
          <div style={{ display:"flex", alignItems:"center", gap:18 }}>
            <label htmlFor="logo-upload" style={{ cursor:"pointer", flexShrink:0 }}>
              <div style={{ width:64, height:64, borderRadius:9, border:"1px solid #e5e7eb", background:"#f9fafb", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                {logoUrl && !logoError
                  ? <img src={logoUrl} alt="Mill logo" style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={()=>setLogoError(true)}/>
                  : <span style={{ fontSize:22, fontWeight:700, color:"#9ca3af" }}>{(profile?.businessName||"M").charAt(0).toUpperCase()}</span>
                }
              </div>
              <input id="logo-upload" type="file" accept="image/*" style={{ display:"none" }} onChange={handleLogoUpload}/>
            </label>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:"#111827", marginBottom:3 }}>Mill / Business Logo</div>
              <div style={{ fontSize:12, color:"#9ca3af", lineHeight:1.5 }}>Click the logo to upload a new one.</div>
              {logoUploading && <div style={{ marginTop:6, fontSize:12, color:"#6b7280", display:"flex", alignItems:"center", gap:5 }}><span className="pr-spin">⟳</span> Uploading…</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="pr-card">
        <div className="pr-card-title">Change Password</div>
        <div className="pr-card-body">
          <PwdForm showToast={showToast}/>
        </div>
      </div>
    </div>
  );
}

/* ── Confirm Activate Dialog ── */
function ConfirmActivateDialog({ season, currentCIHBalance, onConfirm, onCancel, busy }) {
  const [agreed, setAgreed] = React.useState(false);
  const adj    = Number(season?.openingBalance) || 0;
  const newBal = currentCIHBalance + adj;
  const fmtRs  = n => `Rs ${Number(n||0).toLocaleString()}`;

  return (
    <div className="pr-dlg-overlay">
      <div className="pr-dlg" style={{ maxWidth:420 }}>
        <div className="pr-dlg-head">
          <div className="pr-dlg-head-title">Activate Season</div>
          <div style={{ fontSize:11.5, color:"#9ca3af", marginTop:2, fontFamily:"'DM Mono',monospace" }}>{season?.name||season?._id}</div>
        </div>
        <div className="pr-dlg-body" style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:7, padding:"11px 13px", fontSize:12.5, color:"#92400e", lineHeight:1.7 }}>
            <strong>This action cannot be undone.</strong><br/>
            All current journal entries and cashbook data will be <strong>archived</strong>. A fresh season begins and all account balances carry forward.
          </div>
          <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:7, padding:"11px 13px" }}>
            <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".08em", color:"#15803d", marginBottom:8, fontFamily:"'DM Mono',monospace" }}>Cash In Hand — New Opening Balance</div>
            <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", fontSize:13, fontFamily:"'DM Mono',monospace" }}>
              <div>
                <div style={{ fontSize:9.5, color:"#9ca3af", fontWeight:700, letterSpacing:".07em", textTransform:"uppercase", marginBottom:2 }}>Current</div>
                <div style={{ fontWeight:700, color:"#374151" }}>{fmtRs(currentCIHBalance)}</div>
              </div>
              <div style={{ color:"#9ca3af", fontSize:18 }}>{adj >= 0 ? "+" : ""}</div>
              <div>
                <div style={{ fontSize:9.5, color:"#9ca3af", fontWeight:700, letterSpacing:".07em", textTransform:"uppercase", marginBottom:2 }}>Adjustment</div>
                <div style={{ fontWeight:700, color:adj>0?"#15803d":adj<0?"#dc2626":"#9ca3af" }}>
                  {adj===0?"None":(adj>0?"+":"")+fmtRs(adj)}
                </div>
              </div>
              <div style={{ marginLeft:"auto" }}>
                <div style={{ fontSize:9.5, color:"#9ca3af", fontWeight:700, letterSpacing:".07em", textTransform:"uppercase", marginBottom:2 }}>New Opening</div>
                <div style={{ fontWeight:700, color:"#15803d", fontSize:15 }}>{fmtRs(newBal)}</div>
              </div>
            </div>
          </div>
          <label style={{ display:"flex", alignItems:"flex-start", gap:10, cursor:"pointer", userSelect:"none" }}>
            <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)}
              style={{ marginTop:2, width:16, height:16, cursor:"pointer", accentColor:"#111827", flexShrink:0 }}/>
            <span style={{ fontSize:12.5, color:"#374151", lineHeight:1.6 }}>
              I understand this will archive current season data permanently and the new season will start with the opening balance shown above.
            </span>
          </label>
        </div>
        <div className="pr-dlg-foot">
          <button className="pr-btn pr-btn-outline pr-btn-sm" onClick={onCancel} disabled={busy}>Cancel</button>
          <button className="pr-btn pr-btn-green pr-btn-sm" style={{ padding:"7px 16px", opacity:agreed?1:.45, cursor:agreed?"pointer":"not-allowed" }}
            onClick={()=>agreed&&!busy&&onConfirm()} disabled={!agreed||busy}>
            {busy ? <><span className="pr-spin">⟳</span> Activating…</> : "Activate Season →"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   TAB: Seasons
════════════════════════════════════════════════ */
function TabSeasons({ showToast }) {
  const [seasons,  setSeasons]  = useState([]);
  const [archives, setArchives] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading,  setLoading]  = useState(true);
  const [apiErr,   setApiErr]   = useState("");
  const [busy,     setBusy]     = useState("");
  const [editId,   setEditId]   = useState(null);
  const [editForm, setEditForm] = useState({});
  const [form, setForm] = useState({ startDate:"", endDate:"", openingBalance:"" });
  const [confirmDialog, setConfirmDialog] = useState(null);
  // Generic confirm dialog for delete
  const [confirmDlg, setConfirmDlg] = useState(null);

  const load = async () => {
    setLoading(true); setApiErr("");
    const [sr, ar] = await Promise.all([
      safeFetch(`${API_BASE_URL}/profile/seasons`),
      safeFetch(`${API_BASE_URL}/profile/seasons/archives`),
    ]);
    if (!sr.ok) setApiErr(sr.error);
    else setSeasons(sr.data.seasons||[]);
    if (ar.ok) setArchives(ar.data.archives||[]);
    setLoading(false);
  };
  useEffect(()=>{ load(); },[]);

  /* ── Frontend date guard ──────────────────────────────────────────────────
   * A new season cannot be created while any existing season's endDate
   * is still in the future (matches backend validation).
   */
  const today = new Date(); today.setHours(0,0,0,0);
  const hasOngoingSeason = seasons.some(s => new Date(s.endDate) > today);
  const ongoingName = seasons.find(s => new Date(s.endDate) > today)?.name || "";

  const handleStart = (val, isEdit=false) => {
    let end="";
    if(val){ const d=new Date(val); d.setFullYear(d.getFullYear()+1); end=d.toISOString().split("T")[0]; }
    if(isEdit) setEditForm(p=>({...p,startDate:val,endDate:end}));
    else       setForm(p=>({...p,startDate:val,endDate:end}));
  };

  const add = async () => {
    if(!form.startDate||!form.endDate) return showToast("Start and end dates required",false);
    setBusy("add");
    const{ok,error}=await safeFetch(`${API_BASE_URL}/profile/seasons`,{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({startDate:form.startDate,endDate:form.endDate,openingBalance:Number(form.openingBalance)||0}),
    });
    if(!ok) showToast(error,false);
    else{ showToast("Season added",true); setForm({startDate:"",endDate:"",openingBalance:""}); setShowForm(false); load(); }
    setBusy("");
  };

  const saveEdit = async (id) => {
    setBusy(id);
    const{ok,error}=await safeFetch(`${API_BASE_URL}/profile/seasons/${id}`,{
      method:"PUT",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({startDate:editForm.startDate,endDate:editForm.endDate,openingBalance:Number(editForm.openingBalance)||0}),
    });
    if(!ok) showToast(error,false);
    else{ showToast("Season updated",true); setEditId(null); load(); }
    setBusy("");
  };

  const handleActivateClick = async (id) => {
    const s = seasons.find(x=>x._id===id);
    const { ok, data } = await safeFetch(`${API_BASE_URL}/cashbook-report`);
    const cihBalance = ok ? (data.currentBalance ?? 0) : 0;
    setConfirmDialog({ seasonId:id, season:s, cihBalance });
  };

  const doActivate = async () => {
    const { seasonId } = confirmDialog;
    setBusy(seasonId);
    const{ok:apiOk,data,error}=await safeFetch(`${API_BASE_URL}/profile/seasons/${seasonId}/activate`,{
      method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({}),
    });
    setConfirmDialog(null);
    if(!apiOk) showToast(error,false);
    else{ showToast(data.message,true); load(); }
    setBusy("");
  };

  const del = async (id) => {
    setBusy(id);
    const{ok,error}=await safeFetch(`${API_BASE_URL}/profile/seasons/${id}`,{method:"DELETE"});
    if(!ok) showToast(error,false); else{ showToast("Season deleted",true); load(); }
    setBusy(""); setConfirmDlg(null);
  };

  const manageableId = React.useMemo(() => {
    const inactive = seasons.filter(s => !s.isActive);
    if (!inactive.length) return null;
    return [...inactive].sort((a,b) => new Date(b.createdAt||0) - new Date(a.createdAt||0))[0]?._id || null;
  }, [seasons]);

  return (
    <div>
      {confirmDialog && (
        <ConfirmActivateDialog
          season={confirmDialog.season}
          currentCIHBalance={confirmDialog.cihBalance}
          busy={!!busy}
          onConfirm={doActivate}
          onCancel={()=>setConfirmDialog(null)}
        />
      )}
      {confirmDlg && (
        <ConfirmDialog
          title={confirmDlg.title}
          description={confirmDlg.description}
          confirmLabel={confirmDlg.confirmLabel}
          danger={confirmDlg.danger}
          busy={!!busy}
          onConfirm={confirmDlg.onConfirm}
          onCancel={()=>setConfirmDlg(null)}
        />
      )}

      <div className="pr-card">
        <div className="pr-card-title" style={{ justifyContent:"space-between" }}>
          <span style={{ display:"flex",alignItems:"center",gap:8 }}>
            <span style={{ width:3,height:13,background:"#111827",borderRadius:2,flexShrink:0 }}/>
            Mill Seasons
          </span>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            {hasOngoingSeason && (
              <span style={{ fontSize:11, color:"#d97706", background:"#fffbeb", padding:"3px 9px", borderRadius:4, border:"1px solid #fde68a", fontFamily:"'DM Mono',monospace" }}>
                {ongoingName} not yet expired
              </span>
            )}
            <button
              className="pr-btn pr-btn-primary pr-btn-sm"
              onClick={()=>{ if(hasOngoingSeason){ showToast(`Season "${ongoingName}" hasn't expired yet`,false); return; } setShowForm(f=>!f); }}
              style={{ fontSize:11, opacity: hasOngoingSeason ? 0.5 : 1 }}
              title={hasOngoingSeason ? `Cannot add while "${ongoingName}" is still ongoing` : "Add new season"}>
              {showForm?"✕ Cancel":"+ New Season"}
            </button>
          </div>
        </div>
        <div className="pr-card-body">
          <ErrBox msg={apiErr}/>

          {showForm && !hasOngoingSeason && (
            <div style={{ background:"#f9fafb", border:"1px solid #e5e7eb", borderRadius:7, padding:14, marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:".07em", marginBottom:12 }}>
                New Season #{String(seasons.length+1).padStart(3,"0")}
              </div>
              <div className="pr-grid2" style={{ gap:10 }}>
                <Field label="Start Date" required><input className="pr-input" type="date" value={form.startDate} onChange={e=>handleStart(e.target.value)}/></Field>
                <Field label="End Date"><input className="pr-input" type="date" value={form.endDate} onChange={e=>setForm(p=>({...p,endDate:e.target.value}))}/></Field>
                <div style={{ gridColumn:"span 2" }}>
                  <Field label="Cash In Hand Adjustment (Rs) — leave 0 to carry forward">
                    <input className="pr-input mono" type="number" placeholder="0 = carry forward; +ve = add; -ve = deduct"
                      value={form.openingBalance} onChange={e=>setForm(p=>({...p,openingBalance:e.target.value}))}
                      onKeyDown={blockNonNumeric}/>
                  </Field>
                </div>
              </div>
              <div style={{ marginTop:12, display:"flex", gap:8 }}>
                <button className="pr-btn pr-btn-primary pr-btn-sm" onClick={add} disabled={busy==="add"}>{busy==="add"?"Adding…":"Add Season"}</button>
                <button className="pr-btn pr-btn-outline pr-btn-sm" onClick={()=>{setShowForm(false);setForm({startDate:"",endDate:"",openingBalance:""});}}>Cancel</button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="pr-no-data">Loading…</div>
          ) : seasons.length===0 && !apiErr ? (
            <div style={{ padding:"24px", textAlign:"center", color:"#9ca3af", fontSize:13, border:"1px dashed #e5e7eb", borderRadius:7 }}>
              No seasons yet. Create your first season to start tracking cashbook.
            </div>
          ) : seasons.map(s => (
            <div key={s._id} className={`pr-season${s.isActive?" active":""}`} style={{ flexWrap:"wrap" }}>
              {editId===s._id ? (
                <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:10 }}>
                  <div style={{ fontSize:11.5, fontWeight:700, color:"#6b7280" }}>Editing {s.name}</div>
                  <div className="pr-grid2" style={{ gap:10 }}>
                    <Field label="Start Date"><input className="pr-input" type="date" value={editForm.startDate||""} onChange={e=>handleStart(e.target.value,true)}/></Field>
                    <Field label="End Date"><input className="pr-input" type="date" value={editForm.endDate||""} onChange={e=>setEditForm(p=>({...p,endDate:e.target.value}))}/></Field>
                    <div style={{ gridColumn:"span 2" }}>
                      <Field label="Cash In Hand Adjustment (Rs)">
                        <input className="pr-input mono" type="number" placeholder="0 = carry forward" value={editForm.openingBalance||0} onChange={e=>setEditForm(p=>({...p,openingBalance:e.target.value}))} onKeyDown={blockNonNumeric}/>
                      </Field>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:7 }}>
                    <button className="pr-btn pr-btn-primary pr-btn-sm" onClick={()=>saveEdit(s._id)} disabled={busy===s._id}>{busy===s._id?"Saving…":"Save Changes"}</button>
                    <button className="pr-btn pr-btn-outline pr-btn-sm" onClick={()=>setEditId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className={`pr-season-dot${s.isActive?" active":""}`}/>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:2 }}>
                      <div className="pr-season-name">{s.name||`S-${s.seasonCode||"?"}`}</div>
                      {s.isActive && <span style={{ fontSize:10, fontWeight:700, background:"#f0fdf4", color:"#15803d", padding:"1px 7px", borderRadius:4, border:"1px solid #bbf7d0", fontFamily:"'DM Mono',monospace", letterSpacing:".08em" }}>ACTIVE</span>}
                    </div>
                    <div className="pr-season-dates">{fmt(s.startDate)} → {fmt(s.endDate)}</div>
                  </div>
                  <div className="pr-season-bal">Rs {(s.openingBalance||0).toLocaleString()}</div>
                  <div className="pr-season-actions">
                    {s._id === manageableId && (
                      <>
                        <button className="pr-btn pr-btn-green pr-btn-sm"
                          onClick={()=>handleActivateClick(s._id)} disabled={busy===s._id}>
                          {busy===s._id?"…":"Activate"}
                        </button>
                        <button className="pr-btn pr-btn-outline pr-btn-sm"
                          onClick={()=>{setEditId(s._id);setEditForm({startDate:s.startDate?.split("T")[0]||"",endDate:s.endDate?.split("T")[0]||"",openingBalance:s.openingBalance||0});}}>
                          Edit
                        </button>
                        <button className="pr-btn pr-btn-danger pr-btn-sm"
                          onClick={()=>setConfirmDlg({
                            title:"Delete Season",
                            description:`Delete "${s.name}"? This action cannot be undone.`,
                            confirmLabel:"Delete",
                            danger:true,
                            onConfirm:()=>del(s._id),
                          })}>🗑</button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {archives.length>0 && (
        <div className="pr-card">
          <div className="pr-card-title">Seasonal Archive</div>
          <div style={{ border:"1px solid #e5e7eb", borderRadius:7, overflow:"hidden" }}>
            <table className="pr-vtable">
              <thead><tr><th>Season</th><th>Period</th><th>Archived</th><th>Entries</th><th>Invoices</th><th>CIH Closing</th></tr></thead>
              <tbody>
                {archives.map(a=>(
                  <tr key={a._id}>
                    <td><span className="pr-td-mono" style={{ fontWeight:700 }}>{a.seasonName}</span></td>
                    <td><span className="pr-td-mono" style={{ fontSize:11.5 }}>{fmt(a.startDate)} → {fmt(a.endDate)}</span></td>
                    <td style={{ fontSize:11.5, color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>{fmt(a.archivedAt)}</td>
                    <td><span style={{ background:"#f3f4f6", color:"#374151", padding:"2px 8px", borderRadius:4, fontSize:11.5, fontWeight:700, fontFamily:"'DM Mono',monospace" }}>{a.entryCount}</span></td>
                    <td><span style={{ background:"#f3f4f6", color:"#374151", padding:"2px 8px", borderRadius:4, fontSize:11.5, fontWeight:700, fontFamily:"'DM Mono',monospace" }}>{a.invoiceCount}</span></td>
                    <td><span className="pr-td-green">Rs {(a.cashInHandClosingBalance||0).toLocaleString()}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   TAB: Mill Config
════════════════════════════════════════════════ */
function TabMillConfig({ showToast }) {
  const [vehicles,  setVehicles]  = useState([]);
  const [vForm,     setVForm]     = useState({ vehicleType:"", rate:"" });
  const [vEditId,   setVEditId]   = useState(null);
  const [vEditForm, setVEditForm] = useState({});
  const [bags,      setBags]      = useState([]);
  const [bForm,     setBForm]     = useState({ bagTypeName:"", bagWeight:"" });
  const [bEditId,   setBEditId]   = useState(null);
  const [bEditForm, setBEditForm] = useState({});

  // Saved moisture settings (for hasMoisture check + edit mode)
  const [settings, setSettings] = useState({ baseMoisture:"", weightCut:"" });
  // Separate input state for the "add new moisture" form — prevents hasMoisture
  // from flipping to true while the user is still typing (which unmounts the form)
  const [moistureForm, setMoistureForm] = useState({ baseMoisture:"", weightCut:"" });
  const [settBusy,     setSettBusy]     = useState(false);
  const [settEditMode, setSettEditMode] = useState(false);

  const [loading, setLoading]   = useState(true);
  const [apiErr,  setApiErr]    = useState("");
  const [busy,    setBusy]      = useState("");
  // Generic confirm dialog
  const [confirmDlg, setConfirmDlg] = useState(null);

  // hasMoisture is derived ONLY from saved settings (not the live form inputs)
  const hasMoisture = Number(settings.baseMoisture) > 0 || Number(settings.weightCut) > 0;

  const load = async () => {
    setLoading(true); setApiErr("");
    const [vr, br, sr] = await Promise.all([
      safeFetch(`${API_BASE_URL}/profile/vehicles`),
      safeFetch(`${API_BASE_URL}/profile/bag-types`),
      safeFetch(`${API_BASE_URL}/profile/mill-settings`),
    ]);
    if(vr.ok) setVehicles(vr.data.vehicles||[]);
    if(br.ok) setBags(br.data.bagTypes||[]);
    if(sr.ok){ const s=sr.data.settings; setSettings({ baseMoisture:s.baseMoisture??"", weightCut:s.weightCut??"" }); }
    setLoading(false);
  };
  useEffect(()=>{ load(); },[]);

  /* ── Vehicles ── */
  const addVehicle = async () => {
    if(!vForm.vehicleType||vForm.rate==="") return showToast("Type and rate required",false);
    setBusy("vadd");
    const{ok,error}=await safeFetch(`${API_BASE_URL}/profile/vehicles`,{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({vehicleType:vForm.vehicleType.trim(),rate:Number(vForm.rate)}),
    });
    if(!ok) showToast(error,false); else{ showToast("Vehicle added",true); setVForm({vehicleType:"",rate:""}); load(); }
    setBusy("");
  };

  const saveVehicle = async (id) => {
    setBusy(id);
    const{ok,error}=await safeFetch(`${API_BASE_URL}/profile/vehicles/${id}`,{
      method:"PUT",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({vehicleType:vEditForm.vehicleType,rate:Number(vEditForm.rate),isActive:vEditForm.isActive}),
    });
    if(!ok) showToast(error,false); else{ showToast("Vehicle updated",true); setVEditId(null); load(); }
    setBusy(""); setConfirmDlg(null);
  };

  const delVehicle = async (id) => {
    setBusy(id);
    const{ok,error}=await safeFetch(`${API_BASE_URL}/profile/vehicles/${id}`,{method:"DELETE"});
    if(!ok) showToast(error,false); else{ showToast("Vehicle removed",true); load(); }
    setBusy(""); setConfirmDlg(null);
  };

  /* ── Bag types ── */
  const addBag = async () => {
    if(!bForm.bagTypeName||bForm.bagWeight==="") return showToast("Name and weight required",false);
    setBusy("badd");
    const{ok,error}=await safeFetch(`${API_BASE_URL}/profile/bag-types`,{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({bagTypeName:bForm.bagTypeName.trim(),bagWeight:Number(bForm.bagWeight)}),
    });
    if(!ok) showToast(error,false); else{ showToast("Bag type added",true); setBForm({bagTypeName:"",bagWeight:""}); load(); }
    setBusy("");
  };

  const saveBag = async (id) => {
    setBusy(id);
    const{ok,error}=await safeFetch(`${API_BASE_URL}/profile/bag-types/${id}`,{
      method:"PUT",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({bagTypeName:bEditForm.bagTypeName,bagWeight:Number(bEditForm.bagWeight),isActive:bEditForm.isActive}),
    });
    if(!ok) showToast(error,false); else{ showToast("Bag type updated",true); setBEditId(null); load(); }
    setBusy(""); setConfirmDlg(null);
  };

  const delBag = async (id) => {
    setBusy(id);
    const{ok,error}=await safeFetch(`${API_BASE_URL}/profile/bag-types/${id}`,{method:"DELETE"});
    if(!ok) showToast(error,false); else{ showToast("Bag type removed",true); load(); }
    setBusy(""); setConfirmDlg(null);
  };

  /* ── Moisture ── */
  const saveMoistureNew = async () => {
    setSettBusy(true);
    const{ok,error}=await safeFetch(`${API_BASE_URL}/profile/mill-settings`,{
      method:"PUT",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({baseMoisture:Number(moistureForm.baseMoisture||0),weightCut:Number(moistureForm.weightCut||0)}),
    });
    if(!ok) showToast(error,false);
    else{
      showToast("Moisture settings saved",true);
      setSettings({ baseMoisture:moistureForm.baseMoisture, weightCut:moistureForm.weightCut });
      setMoistureForm({ baseMoisture:"", weightCut:"" });
    }
    setSettBusy(false);
  };

  const saveMoistureEdit = async () => {
    setSettBusy(true);
    const{ok,error}=await safeFetch(`${API_BASE_URL}/profile/mill-settings`,{
      method:"PUT",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({baseMoisture:Number(settings.baseMoisture||0),weightCut:Number(settings.weightCut||0)}),
    });
    if(!ok) showToast(error,false);
    else{ showToast("Saved",true); setSettEditMode(false); }
    setSettBusy(false); setConfirmDlg(null);
  };

  const clearMoisture = async () => {
    setSettBusy(true);
    const{ok,error}=await safeFetch(`${API_BASE_URL}/profile/mill-settings`,{
      method:"PUT",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({baseMoisture:0,weightCut:0}),
    });
    if(!ok) showToast(error,false);
    else{ showToast("Cleared",true); setSettings({baseMoisture:"",weightCut:""}); }
    setSettBusy(false); setConfirmDlg(null);
  };

  const StatusBadge = ({active}) => (
    <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:4, border:"1px solid", fontFamily:"'DM Mono',monospace",
      background:active?"#f0fdf4":"#f3f4f6", color:active?"#15803d":"#9ca3af", borderColor:active?"#bbf7d0":"#e5e7eb" }}>
      {active?"Active":"Inactive"}
    </span>
  );

  /* ── number input helper — blocks letters, hides spinner ── */
  const numInp = (val, onChange, placeholder, step="1") => (
    <input className="pr-input mono" type="number" step={step} min="0" placeholder={placeholder}
      value={val} onChange={onChange}
      onKeyDown={blockNonNumeric}
      style={{ padding:"5px 9px" }}/>
  );

  return (
    <div>
      {confirmDlg && (
        <ConfirmDialog
          title={confirmDlg.title}
          description={confirmDlg.description}
          confirmLabel={confirmDlg.confirmLabel}
          danger={confirmDlg.danger}
          busy={!!busy || settBusy}
          onConfirm={confirmDlg.onConfirm}
          onCancel={()=>setConfirmDlg(null)}
        />
      )}

      <ErrBox msg={apiErr}/>

      {/* ── Vehicles ── */}
      <div className="pr-card">
        <div className="pr-card-title">Custom Vehicles & Rates</div>
        <div className="pr-card-body">
          <div style={{ display:"flex", gap:10, marginBottom:16, flexWrap:"wrap", alignItems:"flex-end" }}>
            <div style={{ flex:"1 1 160px" }}>
              <label className="pr-label" style={{ display:"block", marginBottom:5 }}>Vehicle Type</label>
              <input className="pr-input" placeholder="e.g. 20 Wheeler" value={vForm.vehicleType} onChange={e=>setVForm({...vForm,vehicleType:e.target.value})}/>
            </div>
            <div style={{ flex:"0 0 130px" }}>
              <label className="pr-label" style={{ display:"block", marginBottom:5 }}>Rate (Rs/trip)</label>
              <input className="pr-input mono" type="number" placeholder="0" value={vForm.rate}
                onChange={e=>setVForm({...vForm,rate:e.target.value})} onKeyDown={blockNonNumeric}/>
            </div>
            <button className="pr-btn pr-btn-primary" onClick={addVehicle} disabled={busy==="vadd"}>{busy==="vadd"?"Adding…":"+ Add"}</button>
          </div>
          <div style={{ border:"1px solid #e5e7eb", borderRadius:7, overflow:"hidden" }}>
            {loading ? <div className="pr-no-data">Loading…</div>
              : vehicles.length===0 ? <div className="pr-no-data">No vehicles added yet.</div>
              : <table className="pr-vtable">
                  <thead><tr><th>Vehicle Type</th><th>Rate (Rs)</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {vehicles.map(v=>(
                      <tr key={v._id}>
                        {vEditId===v._id ? (
                          <>
                            <td><input className="pr-input" style={{ padding:"5px 9px" }} value={vEditForm.vehicleType||""} onChange={e=>setVEditForm({...vEditForm,vehicleType:e.target.value})}/></td>
                            <td>{numInp(vEditForm.rate||"", e=>setVEditForm({...vEditForm,rate:e.target.value}), "Rate")}</td>
                            <td><select className="pr-select" style={{ padding:"5px 9px", fontSize:12 }} value={String(vEditForm.isActive)} onChange={e=>setVEditForm({...vEditForm,isActive:e.target.value==="true"})}><option value="true">Active</option><option value="false">Inactive</option></select></td>
                            <td><div className="pr-td-actions">
                              <button className="pr-btn pr-btn-primary pr-btn-sm"
                                onClick={()=>setConfirmDlg({
                                  title:"Save Vehicle Changes",
                                  description:`Update "${vEditForm.vehicleType}" to rate Rs ${vEditForm.rate}?`,
                                  confirmLabel:"Save",
                                  danger:false,
                                  onConfirm:()=>saveVehicle(v._id),
                                })}
                                disabled={busy===v._id}>Save</button>
                              <button className="pr-btn pr-btn-outline pr-btn-sm" onClick={()=>setVEditId(null)}>Cancel</button>
                            </div></td>
                          </>
                        ) : (
                          <>
                            <td style={{ fontWeight:600 }}>{v.vehicleType}</td>
                            <td><span className="pr-td-green">{v.rate}</span></td>
                            <td><StatusBadge active={v.isActive}/></td>
                            <td><div className="pr-td-actions">
                              <button className="pr-btn pr-btn-outline pr-btn-sm" onClick={()=>{setVEditId(v._id);setVEditForm({vehicleType:v.vehicleType,rate:v.rate,isActive:v.isActive});}}>Edit</button>
                              <button className="pr-btn pr-btn-danger pr-btn-sm"
                                onClick={()=>setConfirmDlg({
                                  title:"Delete Vehicle",
                                  description:`Remove "${v.vehicleType}" (Rs ${v.rate}/trip)?`,
                                  confirmLabel:"Delete",
                                  danger:true,
                                  onConfirm:()=>delVehicle(v._id),
                                })}>🗑</button>
                            </div></td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
            }
          </div>
        </div>
      </div>

      {/* ── Bag Types ── */}
      <div className="pr-card">
        <div className="pr-card-title">Bag Types</div>
        <div className="pr-card-body">
          <div style={{ display:"flex", gap:10, marginBottom:16, flexWrap:"wrap", alignItems:"flex-end" }}>
            <div style={{ flex:"1 1 160px" }}>
              <label className="pr-label" style={{ display:"block", marginBottom:5 }}>Bag Type Name</label>
              <input className="pr-input" placeholder="e.g. Jute Bag" value={bForm.bagTypeName} onChange={e=>setBForm({...bForm,bagTypeName:e.target.value})}/>
            </div>
            <div style={{ flex:"0 0 180px" }}>
              <label className="pr-label" style={{ display:"block", marginBottom:5 }}>Weight per Bag (kg)</label>
              <input className="pr-input mono" type="number" step="0.01" placeholder="e.g. 0.65" value={bForm.bagWeight}
                onChange={e=>setBForm({...bForm,bagWeight:e.target.value})} onKeyDown={blockNonNumeric}/>
            </div>
            <button className="pr-btn pr-btn-primary" onClick={addBag} disabled={busy==="badd"}>{busy==="badd"?"Adding…":"+ Add"}</button>
          </div>
          <div style={{ border:"1px solid #e5e7eb", borderRadius:7, overflow:"hidden" }}>
            {loading ? <div className="pr-no-data">Loading…</div>
              : bags.length===0 ? <div className="pr-no-data">No bag types added yet.</div>
              : <table className="pr-vtable">
                  <thead><tr><th>Bag Type</th><th>Weight (kg/bag)</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {bags.map(b=>(
                      <tr key={b._id}>
                        {bEditId===b._id ? (
                          <>
                            <td><input className="pr-input" style={{ padding:"5px 9px" }} value={bEditForm.bagTypeName||""} onChange={e=>setBEditForm({...bEditForm,bagTypeName:e.target.value})}/></td>
                            <td>{numInp(bEditForm.bagWeight||"", e=>setBEditForm({...bEditForm,bagWeight:e.target.value}), "Weight", "0.01")}</td>
                            <td><select className="pr-select" style={{ padding:"5px 9px", fontSize:12 }} value={String(bEditForm.isActive)} onChange={e=>setBEditForm({...bEditForm,isActive:e.target.value==="true"})}><option value="true">Active</option><option value="false">Inactive</option></select></td>
                            <td><div className="pr-td-actions">
                              <button className="pr-btn pr-btn-primary pr-btn-sm"
                                onClick={()=>setConfirmDlg({
                                  title:"Save Bag Type Changes",
                                  description:`Update "${bEditForm.bagTypeName}" (${bEditForm.bagWeight} kg/bag)?`,
                                  confirmLabel:"Save",
                                  danger:false,
                                  onConfirm:()=>saveBag(b._id),
                                })}
                                disabled={busy===b._id}>Save</button>
                              <button className="pr-btn pr-btn-outline pr-btn-sm" onClick={()=>setBEditId(null)}>Cancel</button>
                            </div></td>
                          </>
                        ) : (
                          <>
                            <td style={{ fontWeight:600 }}>{b.bagTypeName}</td>
                            <td><span className="pr-td-green">{b.bagWeight} kg</span></td>
                            <td><StatusBadge active={b.isActive}/></td>
                            <td><div className="pr-td-actions">
                              <button className="pr-btn pr-btn-outline pr-btn-sm" onClick={()=>{setBEditId(b._id);setBEditForm({bagTypeName:b.bagTypeName,bagWeight:b.bagWeight,isActive:b.isActive});}}>Edit</button>
                              <button className="pr-btn pr-btn-danger pr-btn-sm"
                                onClick={()=>setConfirmDlg({
                                  title:"Delete Bag Type",
                                  description:`Remove "${b.bagTypeName}" (${b.bagWeight} kg/bag)?`,
                                  confirmLabel:"Delete",
                                  danger:true,
                                  onConfirm:()=>delBag(b._id),
                                })}>🗑</button>
                            </div></td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
            }
          </div>
        </div>
      </div>

      {/* ── Moisture Settings ── */}
      <div className="pr-card">
        <div className="pr-card-title">Moisture Settings</div>
        <div className="pr-card-body">
          {/* "Add new" form — uses moistureForm state, NOT settings state.
              This prevents hasMoisture from flipping while the user types. */}
          {!loading && !hasMoisture && (
            <div style={{ display:"flex", gap:10, marginBottom:16, flexWrap:"wrap", alignItems:"flex-end" }}>
              <div style={{ flex:"0 0 150px" }}>
                <label className="pr-label" style={{ display:"block", marginBottom:5 }}>Base Moisture (%)</label>
                <input className="pr-input mono" type="number" step="0.1" min="0" placeholder="e.g. 24"
                  value={moistureForm.baseMoisture}
                  onChange={e => setMoistureForm(p=>({...p, baseMoisture:e.target.value}))}
                  onKeyDown={blockNonNumeric}/>
              </div>
              <div style={{ flex:"0 0 210px" }}>
                <label className="pr-label" style={{ display:"block", marginBottom:5 }}>Weight Cut / % / Bag (kg)</label>
                <input className="pr-input mono" type="number" step="0.01" min="0" placeholder="e.g. 0.5"
                  value={moistureForm.weightCut}
                  onChange={e => setMoistureForm(p=>({...p, weightCut:e.target.value}))}
                  onKeyDown={blockNonNumeric}/>
              </div>
              <button className="pr-btn pr-btn-primary" onClick={saveMoistureNew} disabled={settBusy}>
                {settBusy ? <><span className="pr-spin">⟳</span> Saving…</> : "+ Set Moisture"}
              </button>
            </div>
          )}
          <div style={{ border:"1px solid #e5e7eb", borderRadius:7, overflow:"hidden" }}>
            {loading ? <div className="pr-no-data">Loading…</div>
              : !hasMoisture ? <div className="pr-no-data">No moisture settings configured yet.</div>
              : <table className="pr-vtable">
                  <thead><tr><th>Base Moisture (%)</th><th>Weight Cut (kg/% per bag)</th><th>Actions</th></tr></thead>
                  <tbody>
                    {settEditMode ? (
                      <tr>
                        <td><input className="pr-input mono" style={{ padding:"5px 9px" }} type="number" step="0.1" min="0"
                          value={settings.baseMoisture} onChange={e=>setSettings(p=>({...p,baseMoisture:e.target.value}))}
                          onKeyDown={blockNonNumeric}/></td>
                        <td><input className="pr-input mono" style={{ padding:"5px 9px" }} type="number" step="0.01" min="0"
                          value={settings.weightCut} onChange={e=>setSettings(p=>({...p,weightCut:e.target.value}))}
                          onKeyDown={blockNonNumeric}/></td>
                        <td><div className="pr-td-actions">
                          <button className="pr-btn pr-btn-primary pr-btn-sm"
                            onClick={()=>setConfirmDlg({
                              title:"Save Moisture Settings",
                              description:`Update to Base ${settings.baseMoisture}%, Weight Cut ${settings.weightCut} kg?`,
                              confirmLabel:"Save",
                              danger:false,
                              onConfirm:saveMoistureEdit,
                            })}
                            disabled={settBusy}>Save</button>
                          <button className="pr-btn pr-btn-outline pr-btn-sm" onClick={()=>setSettEditMode(false)}>Cancel</button>
                        </div></td>
                      </tr>
                    ) : (
                      <tr>
                        <td><span className="pr-td-green">{settings.baseMoisture}%</span></td>
                        <td><span className="pr-td-green">{settings.weightCut} kg</span></td>
                        <td><div className="pr-td-actions">
                          <button className="pr-btn pr-btn-outline pr-btn-sm" onClick={()=>setSettEditMode(true)}>Edit</button>
                          <button className="pr-btn pr-btn-danger pr-btn-sm"
                            onClick={()=>setConfirmDlg({
                              title:"Clear Moisture Settings",
                              description:"Reset base moisture and weight cut to zero? This affects all future invoice calculations.",
                              confirmLabel:"Clear Settings",
                              danger:true,
                              onConfirm:clearMoisture,
                            })}>🗑</button>
                        </div></td>
                      </tr>
                    )}
                  </tbody>
                </table>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   TAB: Payments
════════════════════════════════════════════════ */
function TabPayments() {
  const [payments, setPayments] = useState([]);
  const [billing,  setBilling]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [apiErr,   setApiErr]   = useState("");

  useEffect(()=>{
    (async()=>{
      const{ok,data,error}=await safeFetch(`${API_BASE_URL}/profile/payments`);
      if(!ok) setApiErr(error);
      else{ setPayments(data.payments||[]); setBilling(data.billingDate); }
      setLoading(false);
    })();
  },[]);

  const BANK_ACCOUNTS = [
    { id:"hbl", logo:"/6.png", abbr:"HBL", name:"Habib Bank Limited", color:"#006633", bg:"#e6f4ed", title:"ALI RAZA SALEEM", acct:"02967901869503" },
    { id:"ubl", logo:"/7.png", abbr:"UBL", name:"United Bank Limited", color:"#003087", bg:"#e8eef8", title:"MUHAMMAD ZAIN ALI", acct:"0094315078538" },
  ];
  const [copiedAcct, setCopiedAcct] = useState(null);
  const copyAcct = (id, val) => { navigator.clipboard.writeText(val).then(() => { setCopiedAcct(id); setTimeout(() => setCopiedAcct(null), 1800); }); };

  return (
    <div>
      <div className="pr-card">
        <div className="pr-card-title">Send Payment To</div>
        <div className="pr-card-body" style={{ padding:14 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {BANK_ACCOUNTS.map(b => (
              <div key={b.id} style={{ border:`1px solid ${b.color}22`, borderRadius:8, background:`${b.color}07`, padding:"14px 16px", display:"flex", flexDirection:"column", gap:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:40, height:40, borderRadius:8, border:"1px solid #e5e7eb", background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", flexShrink:0 }}>
                    <img src={b.logo} alt={b.abbr} style={{ width:"100%", height:"100%", objectFit:"contain", padding:3 }} onError={e=>{e.target.style.display="none";}}/>
                  </div>
                  <div>
                    <div style={{ fontSize:12, fontWeight:700, color:b.color }}>{b.name}</div>
                    <div style={{ fontSize:10, color:"#9ca3af", fontFamily:"'DM Mono',monospace", marginTop:1 }}>{b.abbr}</div>
                  </div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <div>
                    <div style={{ fontSize:9.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".08em", color:"#9ca3af", marginBottom:2, fontFamily:"'DM Mono',monospace" }}>Account Title</div>
                    <div style={{ fontSize:12.5, fontWeight:700, color:"#111827", fontFamily:"'DM Mono',monospace" }}>{b.title}</div>
                  </div>
                  <div>
                    <div style={{ fontSize:9.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".08em", color:"#9ca3af", marginBottom:2, fontFamily:"'DM Mono',monospace" }}>Account Number</div>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ fontSize:12, fontFamily:"'DM Mono',monospace", color:"#374151", fontWeight:600, letterSpacing:".04em", flex:1 }}>{b.acct}</span>
                      <button type="button" onClick={()=>copyAcct(b.id,b.acct)} style={{ flexShrink:0, padding:"3px 8px", border:`1px solid ${copiedAcct===b.id?"#bbf7d0":"#e5e7eb"}`, borderRadius:5, background:copiedAcct===b.id?"#f0fdf4":"#fff", cursor:"pointer", fontSize:10, fontWeight:600, color:copiedAcct===b.id?"#15803d":"#6b7280", display:"flex", alignItems:"center", gap:3, transition:"all .15s", fontFamily:"'DM Sans',sans-serif" }}>
                        {copiedAcct===b.id ? <><svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="#15803d" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>Copied</> : <><svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copy</>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pr-card">
        <div className="pr-card-title" style={{ justifyContent:"space-between" }}>
          <span>Payment History</span>
          {billing && <span style={{ fontSize:10.5, background:"#fffbeb", color:"#d97706", padding:"3px 10px", borderRadius:4, border:"1px solid #fde68a", fontFamily:"'DM Mono',monospace", fontWeight:600 }}>Next billing: {fmt(billing)}</span>}
        </div>
        <div className="pr-card-body">
          <ErrBox msg={apiErr}/>
          {loading ? <div className="pr-no-data">Loading…</div>
            : payments.length===0 && !apiErr ? (
              <div style={{ padding:"24px", textAlign:"center", color:"#9ca3af", fontSize:13, border:"1px dashed #e5e7eb", borderRadius:7 }}>
                No payment records yet.
              </div>
            ) : <div className="pr-paytl">
                {payments.map((p,i)=>(
                  <div key={p.tid||i} className={`pr-paycard${i===0?" latest":" old"}`}>
                    <div className="pr-paytop">
                      <div>
                        {i===0 && <div style={{ fontSize:9.5, fontWeight:700, background:"#f0fdf4", color:"#15803d", padding:"1px 8px", borderRadius:4, display:"inline-block", marginBottom:4, fontFamily:"'DM Mono',monospace", letterSpacing:".08em", textTransform:"uppercase", border:"1px solid #bbf7d0" }}>Latest</div>}
                        <div className="pr-paytid">TXN: {p.tid||"—"}</div>
                        <div className="pr-paytime">{fmtT(p.submittedAt||p.paidDate||p.recordedAt)}</div>
                      </div>
                      <div className="pr-payamt">Rs {(p.amountSent||p.amount||7000).toLocaleString()}</div>
                    </div>
                    <div className="pr-paygrid">
                      {[["From Bank",p.senderBank||"—"],["Sent To",p.receivingBank||"—"],["Account Title",p.senderTitle||"—"],["Account No",p.senderAccount||"—"]].map(([k,v])=>(
                        <div key={k}><div className="pr-payfk">{k}</div><div className="pr-payfv">{v}</div></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
          }
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   TAB: Support
════════════════════════════════════════════════ */
function TabSupport({ showToast }) {
  const [type,    setType]    = useState("complaint");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [busy,    setBusy]    = useState(false);
  const [history, setHistory] = useState([]);
  const [apiErr,  setApiErr]  = useState("");
  const [confirmDlg, setConfirmDlg] = useState(null);

  const load = async () => {
    const{ok,data,error}=await safeFetch(`${API_BASE_URL}/profile/complaints`);
    if(!ok) setApiErr(error); else setHistory(data.complaints||[]);
  };
  useEffect(()=>{ load(); },[]);

  const submit = async () => {
    if(!subject.trim()||!message.trim()) return showToast("Subject and message required",false);
    setBusy(true);
    const{ok,data,error}=await safeFetch(`${API_BASE_URL}/profile/complaint`,{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({type,subject,message}),
    });
    if(!ok) showToast(error,false);
    else{ showToast(data.message,true); setSubject(""); setMessage(""); load(); }
    setBusy(false); setConfirmDlg(null);
  };

  const TYPE_LABELS = { complaint:"🚨 Complaint", feedback:"💬 Feedback", deletion_request:"🗑 Request Deletion" };
  const CS_CLASS    = { open:"pr-cs pr-cs-open", in_review:"pr-cs pr-cs-review", resolved:"pr-cs pr-cs-resolved" };

  return (
    <div>
      {confirmDlg && (
        <ConfirmDialog
          title={confirmDlg.title}
          description={confirmDlg.description}
          confirmLabel={confirmDlg.confirmLabel}
          danger={confirmDlg.danger}
          busy={busy}
          onConfirm={confirmDlg.onConfirm}
          onCancel={()=>setConfirmDlg(null)}
        />
      )}

      <div className="pr-card">
        <div className="pr-card-title">Submit a Request</div>
        <div className="pr-card-body">
          <ErrBox msg={apiErr}/>
          <div className="pr-type-row">
            {Object.entries(TYPE_LABELS).map(([k,v])=>(
              <button key={k} className={`pr-type-btn${type===k?(k==="deletion_request"?" on-red":" on"):""}`} onClick={()=>setType(k)}>{v}</button>
            ))}
          </div>
          {type==="deletion_request" && (
            <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:7, padding:12, marginBottom:14, fontSize:12.5, color:"#dc2626", lineHeight:1.6 }}>
              ⚠️ Submitting this will notify ORCA TECH support. Your account and all data will be reviewed before deletion.
            </div>
          )}
          <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
            <Field label="Subject"><input className="pr-input" placeholder="Brief subject line" value={subject} onChange={e=>setSubject(e.target.value)}/></Field>
            <Field label="Message"><textarea className="pr-textarea" placeholder="Describe your issue or feedback…" value={message} onChange={e=>setMessage(e.target.value)} rows={4}/></Field>
            <button
              className={`pr-btn pr-btn-sm${type==="deletion_request"?" pr-btn-danger":" pr-btn-primary"}`}
              style={{ alignSelf:"flex-start", padding:"9px 18px" }}
              onClick={()=>{
                if(type==="deletion_request"){
                  setConfirmDlg({
                    title:"Request Account Deletion",
                    description:"Are you sure you want to submit a deletion request? ORCA TECH support will review your account and data before proceeding.",
                    confirmLabel:"Submit Deletion Request",
                    danger:true,
                    onConfirm:submit,
                  });
                } else {
                  submit();
                }
              }}
              disabled={busy}>
              {busy?"Submitting…":"Submit →"}
            </button>
          </div>
        </div>
      </div>

      {history.length>0 && (
        <div className="pr-card">
          <div className="pr-card-title">Previous Requests ({history.length})</div>
          <div className="pr-card-body">
            {history.map(c=>(
              <div key={c._id} className="pr-complaint">
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:7, gap:8, flexWrap:"wrap" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap" }}>
                    <span style={{ fontSize:12.5, fontWeight:700, color:"#111827" }}>{c.subject}</span>
                    <span style={{ fontSize:10, background:"#f3f4f6", color:"#6b7280", padding:"2px 8px", borderRadius:4, fontFamily:"'DM Mono',monospace", textTransform:"uppercase", letterSpacing:".07em", fontWeight:600 }}>{c.type?.replace("_"," ")}</span>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                    <span className={CS_CLASS[c.status]||"pr-cs pr-cs-open"}>{c.status?.replace("_"," ")}</span>
                    <span style={{ fontSize:11, color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>{fmt(c.createdAt)}</span>
                  </div>
                </div>
                <div style={{ fontSize:12.5, color:"#374151", lineHeight:1.6 }}>{c.message}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN
════════════════════════════════════════════════ */
export default function AdminProfile() {
  const [tab,           setTab]           = useState("account");
  const [profile,       setProfile]       = useState(null);
  const [toast,         setToast]         = useState(null);
  const [logoUrl,         setLogoUrl]         = useState(localStorage.getItem("logoUrl")||"");
  const [logoUploading,   setLogoUploading]   = useState(false);
  const [logoError,       setLogoError]       = useState(false);
  const [profilePic,      setProfilePic]      = useState(localStorage.getItem("adminPic")||"");
  const [picUploading,    setPicUploading]    = useState(false);
  const [picError,        setPicError]        = useState(false);

  const showToast = (msg, ok=true) => { setToast({msg,ok}); setTimeout(()=>setToast(null),3500); };

  useEffect(()=>{
    safeFetch(`${API_BASE_URL}/profile`).then(({ok,data})=>{
      if(ok){
        setProfile(data.profile);
        const pic=data.profile?.profilePic||"";
        if(pic){ setProfilePic(pic); localStorage.setItem("adminPic",pic); }
        const logo=data.profile?.logoUrl||"";
        if(logo){ setLogoUrl(logo); localStorage.setItem("logoUrl",logo); }
      }
    });
  },[]);

  const handlePicUpload = async (e) => {
    const file=e.target.files?.[0];
    if(!file) return;
    if(file.size>3*1024*1024){ showToast("Image must be under 3 MB",false); return; }
    setPicUploading(true);
    const fd=new FormData(); fd.append("profilePic",file);
    const{ok,data,error}=await safeFetch(`${API_BASE_URL}/profile/profile-pic`,{method:"PUT",body:fd});
    if(!ok) showToast(error,false);
    else{ const url=data.profilePic; setProfilePic(url); localStorage.setItem("adminPic",url); setPicError(false); showToast("Profile picture updated ✓",true); }
    setPicUploading(false);
  };

  const handleLogoUpload = async (e) => {
    const file=e.target.files?.[0];
    if(!file) return;
    if(file.size>3*1024*1024){ showToast("Image must be under 3 MB",false); return; }
    setLogoUploading(true);
    const fd=new FormData(); fd.append("logo",file);
    const{ok,data,error}=await safeFetch(`${API_BASE_URL}/profile/logo`,{method:"PUT",body:fd});
    if(!ok) showToast(error,false);
    else{ const url=data.logoUrl||data.url||""; setLogoUrl(url); localStorage.setItem("logoUrl",url); setLogoError(false); showToast("Mill logo updated ✓",true); }
    setLogoUploading(false);
  };

  const daysLeft = profile?.billingDate
    ? Math.ceil((new Date(profile.billingDate)-Date.now())/(1000*60*60*24))
    : null;

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <div className="pr" style={{ maxWidth:820, margin:"0 auto", padding:"4px 0 40px" }}>

        <div className="pr-hero">
          <label htmlFor="pic-upload" style={{ cursor:"pointer", display:"block", flexShrink:0 }}>
            <div className="pr-avatar">
              {profilePic && !picError
                ? <img src={profilePic} alt="Profile" onError={()=>setPicError(true)} onLoad={()=>setPicError(false)}/>
                : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", background:"#f3f4f6", fontSize:22, fontWeight:700, color:"#374151" }}>
                    {(profile?.ownerName||localStorage.getItem("name")||"A").charAt(0).toUpperCase()}
                  </div>
              }
              <div className="pr-avatar-overlay">
                {picUploading
                  ? <span className="pr-spin" style={{ color:"#fff", fontSize:18 }}>⟳</span>
                  : <><svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><circle cx="12" cy="13" r="3"/></svg><span>Change</span></>
                }
              </div>
            </div>
            <input id="pic-upload" type="file" accept="image/*" style={{ display:"none" }} onChange={handlePicUpload}/>
            <div className="pr-upload-hint">your photo</div>
          </label>
          <div className="pr-hero-info">
            <div className="pr-hero-name">{profile?.ownerName||localStorage.getItem("name")||"Admin"}</div>
            <div className="pr-hero-biz">{profile?.businessName||localStorage.getItem("businessName")}</div>
            <div className="pr-hero-pills">
              <span className="pr-pill pr-pill-green">Admin</span>
              {profile?.approvalStatus==="approved" && <span className="pr-pill pr-pill-green">✓ Approved</span>}
              <span className="pr-pill pr-pill-gray">{profile?.plan||"monthly"}</span>
              {daysLeft!==null && <span className={`pr-pill ${daysLeft<=5?"pr-pill-amber":"pr-pill-gray"}`}>{daysLeft>0?`${daysLeft}d until billing`:"Payment overdue"}</span>}
            </div>
            {profile?.adminCnic && <div className="pr-hero-sub">CNIC: {profile.adminCnic} · Mill: {profile.millId}</div>}
          </div>
        </div>

        <div className="pr-tabs">
          {TABS.map(t=>(
            <button key={t.id} className={`pr-tab${tab===t.id?" on":""}`} onClick={()=>setTab(t.id)}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        {tab==="account"  && <TabAccount profile={profile} onSaved={setProfile} showToast={showToast} logoUrl={logoUrl} setLogoUrl={setLogoUrl} logoError={logoError} setLogoError={setLogoError} logoUploading={logoUploading} handleLogoUpload={handleLogoUpload}/>}
        {tab==="seasons"  && <TabSeasons   showToast={showToast}/>}
        {tab==="mill"     && <TabMillConfig showToast={showToast}/>}
        {tab==="payments" && <TabPayments/>}
        {tab==="support"  && <TabSupport   showToast={showToast}/>}
      </div>
      {toast && <Toast msg={toast.msg} ok={toast.ok}/>}
    </SidebarLayout>
  );
}