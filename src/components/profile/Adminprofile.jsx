// AdminProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL  from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  /* ── ORCA tokens ── */
  :root {
    --oc-black:#0B0C0D; --oc-dark:#141A1F; --oc-navy:#212A37;
    --oc-slate:#253240; --oc-steel:#334455; --oc-mid:#6E7170;
    --oc-silver:#A5A8A6; --oc-light:#DADADA; --oc-bg:#F5F5F5; --oc-bg2:#ECECEC;
    --oc-gold:#929183; --oc-g2:#7A7970; --oc-g3:#A8A79F; --oc-white:#FFFFFF;
  }

  @keyframes prFadeUp { from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none} }
  @keyframes prSpin   { to{transform:rotate(360deg)} }
  @keyframes prPulse  { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.85)} }

  .pr { font-family:'DM Sans',sans-serif; color:var(--oc-black); }

  /* ── Hero ── */
  .pr-hero {
    background:linear-gradient(140deg,#0B0C0D 0%,#141A1F 45%,#1A2230 80%,#141A1F 100%);
    border-radius:20px; padding:28px 32px; margin-bottom:20px;
    display:flex; align-items:center; gap:24px; position:relative; overflow:hidden;
    border:1px solid rgba(146,145,131,.14);
    box-shadow:0 20px 60px rgba(0,0,0,.4), inset 0 1px 0 rgba(146,145,131,.08);
  }
  .pr-hero::before {
    content:''; position:absolute; right:-60px; top:-60px; width:320px; height:320px;
    border-radius:50%; pointer-events:none;
    background:radial-gradient(circle,rgba(146,145,131,.08) 0%,transparent 65%);
  }
  .pr-hero::after {
    content:''; position:absolute; left:28%; bottom:-50px; width:200px; height:200px;
    border-radius:50%; pointer-events:none;
    background:radial-gradient(circle,rgba(33,42,55,.6) 0%,transparent 70%);
  }
  /* accent bar on hero */
  .pr-hero-accent {
    position:absolute; top:0; left:0; right:0; height:3px;
    background:linear-gradient(90deg,#141A1F,#929183 35%,#A8A79F 55%,#334455);
  }

  /* ── Avatar ── */
  .pr-avatar {
    width:78px; height:78px; border-radius:18px; flex-shrink:0;
    background:linear-gradient(135deg,#212A37,#334455);
    display:flex; align-items:center; justify-content:center;
    border:1.5px solid rgba(146,145,131,.3);
    box-shadow:0 8px 28px rgba(0,0,0,.4), 0 0 0 4px rgba(146,145,131,.07);
    overflow:hidden; position:relative; cursor:pointer; transition:.2s;
  }
  .pr-avatar:hover { box-shadow:0 8px 32px rgba(146,145,131,.25), 0 0 0 4px rgba(146,145,131,.14); transform:scale(1.03); }
  .pr-avatar img  { width:100%; height:100%; object-fit:cover; display:block; position:absolute; inset:0; border-radius:16px; }
  .pr-avatar-overlay {
    position:absolute; inset:0; background:rgba(0,0,0,.6);
    display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px;
    opacity:0; transition:opacity .2s; border-radius:16px;
  }
  .pr-avatar:hover .pr-avatar-overlay { opacity:1; }
  .pr-avatar-overlay span { font-size:8.5px; font-weight:700; color:rgba(146,145,131,.9); letter-spacing:.1em; text-transform:uppercase; }
  .pr-upload-hint { font-size:9px; font-weight:600; letter-spacing:.1em; color:rgba(146,145,131,.35); text-align:center; margin-top:5px; text-transform:uppercase; font-family:'DM Mono',monospace; }

  .pr-hero-info { flex:1; min-width:0; position:relative; z-index:1; }
  .pr-hero-name { font-family:'Cormorant Garamond',serif; font-size:24px; font-weight:700; color:rgba(255,255,255,.92); margin-bottom:2px; letter-spacing:-.3px; }
  .pr-hero-biz  { font-size:12px; color:rgba(146,145,131,.5); margin-bottom:10px; font-family:'DM Mono',monospace; letter-spacing:.06em; }
  .pr-hero-pills { display:flex; gap:7px; flex-wrap:wrap; }
  .pr-pill { font-family:'DM Mono',monospace; font-size:9.5px; font-weight:500; padding:3px 10px; border-radius:20px; border:1px solid; letter-spacing:.06em; }
  .pr-pill-green { background:rgba(34,197,94,.1);  color:#22c55e; border-color:rgba(34,197,94,.25); }
  .pr-pill-blue  { background:rgba(146,145,131,.1); color:#929183; border-color:rgba(146,145,131,.25); }
  .pr-pill-amber { background:rgba(239,68,68,.1);  color:#ef4444; border-color:rgba(239,68,68,.25); }
  .pr-hero-billing { font-size:10.5px; color:rgba(255,255,255,.2); margin-top:8px; font-family:'DM Mono',monospace; letter-spacing:.05em; }

  /* ── Tabs ── */
  .pr-tabs {
    display:flex; gap:2px; background:var(--oc-bg); border-radius:14px; padding:4px;
    margin-bottom:20px; flex-wrap:wrap;
    border:1.5px solid var(--oc-bg2);
    box-shadow:inset 0 1px 3px rgba(11,12,13,.06);
  }
  .pr-tab {
    flex:1; min-width:90px; padding:9px 12px; border-radius:10px; border:none;
    background:transparent; font-size:12px; font-weight:600; cursor:pointer;
    color:var(--oc-mid); font-family:'DM Sans',sans-serif; transition:.15s;
    display:flex; align-items:center; justify-content:center; gap:5px; white-space:nowrap;
  }
  .pr-tab:hover { background:rgba(33,42,55,.06); color:var(--oc-navy); }
  .pr-tab.on    { background:var(--oc-navy); color:#fff; box-shadow:0 2px 10px rgba(33,42,55,.3); font-weight:700; }

  /* ── Cards ── */
  .pr-card {
    background:#fff; border:1.5px solid var(--oc-bg2); border-radius:16px; padding:22px;
    margin-bottom:14px; animation:prFadeUp .22s ease both;
    box-shadow:0 2px 10px rgba(11,12,13,.04);
    transition:box-shadow .18s;
  }
  .pr-card:hover { box-shadow:0 4px 18px rgba(11,12,13,.07); }
  .pr-card-title {
    font-family:'DM Sans',sans-serif; font-size:13px; font-weight:700; color:var(--oc-black);
    margin-bottom:18px; display:flex; align-items:center; gap:10px;
    padding-bottom:13px; border-bottom:1.5px solid var(--oc-bg);
  }
  .pr-card-title::before { content:''; width:3px; height:15px; background:linear-gradient(180deg,#929183,#A8A79F); border-radius:2px; flex-shrink:0; }

  .pr-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .pr-field  { display:flex; flex-direction:column; gap:6px; }
  .pr-label  { font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:.12em; color:var(--oc-silver); }
  .pr-input  {
    padding:10px 13px; border:1.5px solid var(--oc-bg2); border-radius:9px; font-size:13px;
    color:var(--oc-black); font-family:'DM Sans',sans-serif; outline:none;
    transition:.15s; background:var(--oc-bg);
  }
  .pr-input:focus  { border-color:var(--oc-navy); background:#fff; box-shadow:0 0 0 3px rgba(33,42,55,.08); }
  .pr-input:disabled { background:var(--oc-bg); color:var(--oc-silver); cursor:not-allowed; border-color:var(--oc-bg2); }
  .pr-input.mono   { font-family:'DM Mono',monospace; font-size:12.5px; }
  .pr-select {
    padding:10px 13px; border:1.5px solid var(--oc-bg2); border-radius:9px; font-size:13px;
    color:var(--oc-black); font-family:'DM Sans',sans-serif; outline:none;
    transition:.15s; background:var(--oc-bg); cursor:pointer;
  }
  .pr-select:focus { border-color:var(--oc-navy); box-shadow:0 0 0 3px rgba(33,42,55,.08); }
  .pr-textarea {
    width:100%; padding:10px 13px; border:1.5px solid var(--oc-bg2); border-radius:9px;
    font-size:13px; color:var(--oc-black); font-family:'DM Sans',sans-serif;
    outline:none; transition:.15s; resize:vertical; min-height:88px; background:var(--oc-bg);
  }
  .pr-textarea:focus { border-color:var(--oc-navy); box-shadow:0 0 0 3px rgba(33,42,55,.08); background:#fff; }

  /* ── Buttons ── */
  .pr-btn {
    padding:9px 18px; border-radius:9px; border:none; font-size:12.5px; font-weight:700;
    font-family:'DM Sans',sans-serif; cursor:pointer; transition:.15s;
    display:inline-flex; align-items:center; gap:7px; letter-spacing:.02em;
  }
  .pr-btn-primary { background:var(--oc-navy); color:#fff; box-shadow:0 2px 10px rgba(33,42,55,.25); }
  .pr-btn-primary:hover { background:var(--oc-dark); box-shadow:0 4px 16px rgba(33,42,55,.35); transform:translateY(-1px); }
  .pr-btn-primary:disabled { background:var(--oc-light); color:var(--oc-silver); cursor:not-allowed; transform:none; box-shadow:none; }
  .pr-btn-green  { background:linear-gradient(135deg,#929183,#7A7970); color:#fff; box-shadow:0 2px 10px rgba(146,145,131,.3); }
  .pr-btn-green:hover  { background:linear-gradient(135deg,#7A7970,#9A7A38); box-shadow:0 4px 16px rgba(146,145,131,.4); transform:translateY(-1px); }
  .pr-btn-green:disabled { background:var(--oc-light); color:var(--oc-silver); cursor:not-allowed; transform:none; box-shadow:none; }
  .pr-btn-outline { background:#fff; border:1.5px solid var(--oc-bg2); color:var(--oc-mid); box-shadow:0 1px 3px rgba(11,12,13,.05); }
  .pr-btn-outline:hover { border-color:var(--oc-light); color:var(--oc-navy); background:var(--oc-bg); }
  .pr-btn-danger  { background:#fff5f5; border:1.5px solid #fecaca; color:#dc2626; }
  .pr-btn-danger:hover  { background:#dc2626; color:#fff; border-color:#dc2626; transform:translateY(-1px); }
  .pr-btn-sm { padding:6px 12px; font-size:11.5px; }

  /* ── Table ── */
  .pr-vtable { width:100%; border-collapse:collapse; }
  .pr-vtable thead th { padding:8px 13px; text-align:left; font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:var(--oc-silver); border-bottom:1px solid var(--oc-bg2); background:var(--oc-bg); font-family:'DM Mono',monospace; }
  .pr-vtable tbody tr { border-bottom:1px solid var(--oc-bg); transition:background .1s; }
  .pr-vtable tbody tr:last-child { border-bottom:none; }
  .pr-vtable tbody tr:hover { background:var(--oc-bg); }
  .pr-vtable tbody td { padding:10px 13px; font-size:12.5px; color:var(--oc-black); vertical-align:middle; }
  .pr-td-rate { font-family:'DM Mono',monospace; color:#929183; font-weight:600; }
  .pr-td-actions { display:flex; gap:6px; }
  .pr-no-data { padding:28px; text-align:center; color:var(--oc-silver); font-size:13px; }

  /* ── Error ── */
  .pr-err-box { padding:13px 16px; background:#fef2f2; border:1px solid #fecaca; border-radius:9px; font-size:12.5px; color:#991b1b; margin-bottom:14px; }

  /* ── Seasons ── */
  .pr-season {
    background:var(--oc-bg); border:1.5px solid var(--oc-bg2); border-radius:12px; padding:14px 16px;
    margin-bottom:10px; display:flex; align-items:center; gap:12px; transition:.18s;
  }
  .pr-season:hover { border-color:var(--oc-light); box-shadow:0 3px 14px rgba(11,12,13,.07); transform:translateY(-1px); }
  .pr-season.active { border-color:rgba(146,145,131,.45); background:rgba(146,145,131,.05); box-shadow:0 4px 16px rgba(146,145,131,.1); }
  .pr-season-dot { width:9px; height:9px; border-radius:50%; background:var(--oc-light); flex-shrink:0; }
  .pr-season-dot.active { background:#929183; box-shadow:0 0 0 4px rgba(146,145,131,.18); animation:prPulse 2s ease infinite; }
  .pr-season-name  { font-family:'DM Sans',sans-serif; font-size:13.5px; font-weight:700; color:var(--oc-black); }
  .pr-season-dates { font-size:11px; color:var(--oc-mid); font-family:'DM Mono',monospace; }
  .pr-season-bal   { font-family:'DM Mono',monospace; font-size:13px; color:#929183; font-weight:700; margin-left:auto; white-space:nowrap; background:rgba(146,145,131,.08); padding:3px 10px; border-radius:20px; border:1px solid rgba(146,145,131,.2); }
  .pr-season-actions { display:flex; gap:6px; }

  /* ── Payment timeline ── */
  .pr-paytl { position:relative; padding-left:20px; }
  .pr-paytl::before { content:''; position:absolute; left:6px; top:8px; bottom:8px; width:1px; background:var(--oc-bg2); }
  .pr-paycard { position:relative; background:var(--oc-bg); border:1.5px solid var(--oc-bg2); border-radius:12px; padding:14px 16px; margin-bottom:10px; transition:.15s; }
  .pr-paycard:hover { border-color:var(--oc-light); background:#fff; }
  .pr-paycard.latest { border-color:rgba(146,145,131,.35); background:rgba(146,145,131,.04); }
  .pr-paycard::before { content:''; position:absolute; left:-16px; top:16px; width:8px; height:8px; border-radius:50%; background:#929183; border:2px solid #fff; box-shadow:0 0 0 2px rgba(146,145,131,.2); }
  .pr-paycard.old::before { background:var(--oc-light); box-shadow:none; }
  .pr-paytop { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px; gap:8px; flex-wrap:wrap; }
  .pr-paytid { font-family:'DM Mono',monospace; font-size:11.5px; color:#929183; font-weight:600; }
  .pr-paytime { font-size:11px; color:var(--oc-silver); }
  .pr-payamt  { font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:700; color:var(--oc-black); }
  .pr-paygrid { display:grid; grid-template-columns:1fr 1fr; gap:6px; }
  .pr-payfk { font-size:9px; text-transform:uppercase; letter-spacing:.1em; color:var(--oc-silver); font-family:'DM Mono',monospace; margin-bottom:1px; }
  .pr-payfv { font-size:12.5px; color:var(--oc-steel); }
  .pr-nopay { padding:28px; text-align:center; color:var(--oc-silver); font-size:13px; border:2px dashed var(--oc-bg2); border-radius:12px; }

  /* ── Support type btns ── */
  .pr-type-row { display:flex; gap:7px; flex-wrap:wrap; margin-bottom:14px; }
  .pr-type-btn { padding:7px 15px; border-radius:8px; border:1.5px solid var(--oc-bg2); font-size:12px; font-weight:600; font-family:'DM Sans',sans-serif; cursor:pointer; transition:.15s; background:#fff; color:var(--oc-mid); }
  .pr-type-btn:hover { border-color:var(--oc-light); color:var(--oc-navy); }
  .pr-type-btn.on     { background:var(--oc-navy); color:#fff; border-color:var(--oc-navy); }
  .pr-type-btn.on-red { background:#dc2626; color:#fff; border-color:#dc2626; }

  /* ── Complaint card ── */
  .pr-complaint { background:var(--oc-bg); border:1.5px solid var(--oc-bg2); border-radius:10px; padding:13px 15px; margin-bottom:10px; }
  .pr-cs { font-size:9.5px; font-weight:700; padding:2px 8px; border-radius:20px; border:1px solid; font-family:'DM Mono',monospace; letter-spacing:.08em; text-transform:uppercase; }
  .pr-cs-open     { background:rgba(146,145,131,.1); color:#7A7970; border-color:rgba(146,145,131,.3); }
  .pr-cs-review   { background:rgba(33,42,55,.08);  color:var(--oc-navy); border-color:rgba(33,42,55,.2); }
  .pr-cs-resolved { background:rgba(34,197,94,.1);  color:#15803d; border-color:rgba(34,197,94,.3); }

  /* ── Toast ── */
  .pr-toast {
    position:fixed; bottom:22px; right:22px; z-index:9999; padding:11px 18px; border-radius:12px;
    font-size:13px; font-weight:600; background:rgba(11,16,21,.92); color:#fff;
    box-shadow:0 8px 32px rgba(0,0,0,.4); display:flex; align-items:center; gap:8px;
    animation:prFadeUp .2s ease; border:1px solid rgba(146,145,131,.15); max-width:340px;
    backdrop-filter:blur(16px); font-family:'DM Sans',sans-serif;
  }
  .pr-toast.ok  { border-color:rgba(34,197,94,.3); }
  .pr-toast.err { border-color:rgba(239,68,68,.3); }

  .pr-spin { animation:prSpin .8s linear infinite; display:inline-block; }
  @media(max-width:640px){ .pr-grid2{grid-template-columns:1fr;} .pr-hero{flex-direction:column;} .pr-tabs{flex-wrap:wrap;} }
`;

const fmt  = d => d ? new Date(d).toLocaleDateString("en-PK",{year:"numeric",month:"short",day:"numeric"}) : "—";
const fmtT = d => d ? new Date(d).toLocaleString("en-PK",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}) : "—";

const TABS = [
  { id:"account",  label:"Account Info", icon:"👤" },
  { id:"seasons",  label:"Seasons",      icon:"📅" },
  { id:"mill",     label:"Mill Config",  icon:"⚙️" },
  { id:"payments", label:"Payments",     icon:"💳" },
  { id:"support",  label:"Support",      icon:"📝" },
];

// ─── safe wrapper: calls authFetch but NEVER lets a failed response redirect ─
// Returns { ok: true, data } or { ok: false, error: string }
async function safeFetch(url, options = {}) {
  try {
    const res = await authFetch(url, options);
    // authFetch may return undefined if it already navigated away — guard it
    if (!res) return { ok: false, error: "No response (check backend is running)" };
    const text = await res.text();
    let data = {};
    try { data = JSON.parse(text); } catch { data = { message: text }; }
    if (!res.ok) return { ok: false, error: data.message || `HTTP ${res.status}` };
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err.message || "Network error" };
  }
}

function Field({ label, children }) {
  return (
    <div className="pr-field">
      <label className="pr-label">{label}</label>
      {children}
    </div>
  );
}

function ErrBox({ msg }) {
  return msg
    ? <div className="pr-err-box">⚠ {msg}</div>
    : null;
}

function Toast({ msg, ok }) {
  return (
    <div className={`pr-toast ${ok ? "ok" : "err"}`}>
      {ok
        ? <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#A8A79F" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        : <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#f87171" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>}
      {msg}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// TAB: Account Info
// ═════════════════════════════════════════════════════════════════════════════
function TabAccount({ profile, onSaved, showToast }) {
  const [form, setForm] = useState({ businessName:"", ownerName:"", email:"", phone:"" });
  const [pwd,  setPwd]  = useState({ current:"", next:"", confirm:"" });
  const [busy, setBusy] = useState(false);
  const [pwdBusy, setPwdBusy] = useState(false);

  useEffect(() => {
    if (profile) setForm({
      businessName: profile.businessName || "",
      ownerName:    profile.ownerName    || "",
      email:        profile.email        || "",
      phone:        profile.phone        || "",
    });
  }, [profile]);

  const saveInfo = async () => {
    // Validate phone
    if (form.phone && !/^\+92\d{10}$/.test(form.phone)) {
      return showToast("Phone must be in format +92XXXXXXXXXX (exactly 10 digits after +92)", false);
    }
    setBusy(true);
    const { ok, data, error } = await safeFetch(`${API_BASE_URL}/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!ok) { showToast(error, false); }
    else {
      localStorage.setItem("businessName", data.profile.businessName);
      localStorage.setItem("name", data.profile.ownerName);
      showToast("Profile updated ✓", true);
      onSaved(data.profile);
    }
    setBusy(false);
  };

  const savePassword = async () => {
    if (pwd.next !== pwd.confirm) return showToast("New passwords don't match", false);
    if (pwd.next.length < 8)       return showToast("Password must be at least 8 characters", false);
    setPwdBusy(true);
    const { ok, error } = await safeFetch(`${API_BASE_URL}/profile/password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: pwd.current, newPassword: pwd.next }),
    });
    if (!ok) showToast(error, false);
    else { showToast("Password changed ✓", true); setPwd({ current:"", next:"", confirm:"" }); }
    setPwdBusy(false);
  };

  return (
    <div>
      <div className="pr-card">
        <div className="pr-card-title">Business Information</div>
        <div className="pr-grid2">
          <Field label="Business Name">
            <input className="pr-input" value={form.businessName} onChange={e=>setForm({...form,businessName:e.target.value})}/>
          </Field>
          <Field label="Owner Name">
            <input className="pr-input" value={form.ownerName} onChange={e=>setForm({...form,ownerName:e.target.value})}/>
          </Field>
          <Field label="Email Address">
            <input className="pr-input" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          </Field>
          <Field label="Phone (+92XXXXXXXXXX)">
            <input
              className="pr-input mono"
              value={form.phone}
              placeholder="+923001234567"
              maxLength={13}
              onChange={e => {
                // Strip everything except digits and leading +
                let raw = e.target.value.replace(/[^\d+]/g, "");
                // If user deleted into the prefix area, re-anchor to +92
                if (!raw.startsWith("+92")) {
                  const digits = raw.replace(/^\+?9?2?/, "").replace(/^0+/, "");
                  raw = "+92" + digits;
                }
                // Hard cap: +92 + exactly 10 digits = 13 chars max
                if (raw.length > 13) raw = raw.slice(0, 13);
                setForm({ ...form, phone: raw });
              }}
              onFocus={() => {
                if (!form.phone || form.phone === "") setForm({ ...form, phone: "+92" });
              }}
              onBlur={() => {
                // If user left it as bare "+92" with no digits, clear it
                if (form.phone === "+92") setForm({ ...form, phone: "" });
              }}
            />
          </Field>
          <Field label="CNIC (login key — cannot change)">
            <input className="pr-input mono" value={profile?.adminCnic || "—"} disabled/>
          </Field>
          <Field label="Mill ID">
            <input className="pr-input mono" value={profile?.millId || "—"} disabled/>
          </Field>
        </div>
        <div style={{marginTop:18,display:"flex",justifyContent:"flex-end"}}>
          <button className="pr-btn pr-btn-primary" onClick={saveInfo} disabled={busy}>
            {busy ? <span className="pr-spin">⟳</span> : null}
            {busy ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="pr-card">
        <div className="pr-card-title">Change Password</div>
        <div style={{display:"flex",flexDirection:"column",gap:14,maxWidth:440}}>
          <Field label="Current Password">
            <input className="pr-input" type="password" placeholder="Enter current password" value={pwd.current} onChange={e=>setPwd({...pwd,current:e.target.value})}/>
          </Field>
          <Field label="New Password (min 8 chars)">
            <input className="pr-input" type="password" placeholder="Enter new password" value={pwd.next} onChange={e=>setPwd({...pwd,next:e.target.value})}/>
          </Field>
          <Field label="Confirm New Password">
            <input className="pr-input" type="password" placeholder="Confirm new password" value={pwd.confirm} onChange={e=>setPwd({...pwd,confirm:e.target.value})}/>
          </Field>
          <button className="pr-btn pr-btn-green" style={{alignSelf:"flex-start"}} onClick={savePassword} disabled={pwdBusy || !pwd.current || !pwd.next}>
            {pwdBusy ? "Changing…" : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// TAB: Seasons
// ═════════════════════════════════════════════════════════════════════════════
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

  const load = async () => {
    setLoading(true); setApiErr("");
    const [seasonsRes, archivesRes] = await Promise.all([
      safeFetch(`${API_BASE_URL}/profile/seasons`),
      safeFetch(`${API_BASE_URL}/profile/seasons/archives`),
    ]);
    if (!seasonsRes.ok) setApiErr(seasonsRes.error);
    else setSeasons(seasonsRes.data.seasons || []);
    if (archivesRes.ok) setArchives(archivesRes.data.archives || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  // When start date changes, auto-set end date to 1 year later
  const handleStartChange = (val, isEdit = false) => {
    let endVal = "";
    if (val) {
      const d = new Date(val);
      d.setFullYear(d.getFullYear() + 1);
      endVal = d.toISOString().split("T")[0];
    }
    if (isEdit) setEditForm(p => ({ ...p, startDate: val, endDate: endVal }));
    else        setForm(p => ({ ...p, startDate: val, endDate: endVal }));
  };

  const add = async () => {
    if (!form.startDate || !form.endDate) return showToast("Start and end dates are required", false);
    // Block if any season's end date is in the future (still active/ongoing)
    const today = new Date(); today.setHours(0,0,0,0);
    const blocked = seasons.some(s => new Date(s.endDate) > today);
    if (blocked) {
      showToast("Cannot add a new season while an existing season is still active or ongoing. Wait until its end date passes.", false);
      return;
    }
    setBusy("add");
    const { ok, error } = await safeFetch(`${API_BASE_URL}/profile/seasons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate:      form.startDate,
        endDate:        form.endDate,
        openingBalance: Number(form.openingBalance) || 0,
      }),
    });
    if (!ok) showToast(error, false);
    else {
      showToast("Season added ✓", true);
      setForm({ startDate:"", endDate:"", openingBalance:"" });
      setShowForm(false);
      load();
    }
    setBusy("");
  };

  const saveEdit = async (id) => {
    setBusy(id);
    const { ok, error } = await safeFetch(`${API_BASE_URL}/profile/seasons/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate:      editForm.startDate,
        endDate:        editForm.endDate,
        openingBalance: Number(editForm.openingBalance) || 0,
      }),
    });
    if (!ok) showToast(error, false);
    else { showToast("Season updated ✓", true); setEditId(null); load(); }
    setBusy("");
  };

  const activate = async (id) => {
    const s = seasons.find(x => x._id === id);
    const hasPrev = seasons.some(x => x.isActive);
    if (hasPrev) {
      const ok = window.confirm(
        `Activating "${s?.name}" will:\n\n` +
        `• Archive all current entries, invoices & cashbook to seasonal backup\n` +
        `• Carry forward all account balances as new opening balances\n` +
        `• Cash In Hand will be: current balance + Rs ${(s?.openingBalance||0).toLocaleString()}\n` +
        `• Clear all journal entries, invoices & cashbook from live records\n\n` +
        `This cannot be undone. Proceed?`
      );
      if (!ok) return;
    }
    setBusy(id);
    const { ok: apiOk, data, error } = await safeFetch(`${API_BASE_URL}/profile/seasons/${id}/activate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (!apiOk) showToast(error, false);
    else { showToast(data.message, true); load(); }
    setBusy("");
  };

  const del = async (id) => {
    if (!window.confirm("Delete this season?")) return;
    const { ok, error } = await safeFetch(`${API_BASE_URL}/profile/seasons/${id}`, { method: "DELETE" });
    if (!ok) showToast(error, false);
    else { showToast("Season deleted", true); load(); }
  };

  return (
    <div>
      <div className="pr-card">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <div className="pr-card-title" style={{margin:0}}>Mill Seasons</div>
          {(() => {
            const today = new Date(); today.setHours(0,0,0,0);
            const hasOngoing = seasons.some(s => new Date(s.endDate) > today);
            return hasOngoing ? (
              <span style={{fontSize:11.5,color:"#929183",background:"rgba(146,145,131,.08)",border:"1px solid rgba(146,145,131,.25)",padding:"5px 12px",borderRadius:20,fontWeight:600,fontFamily:"'DM Mono',monospace"}}>
                🔒 Season active until {seasons.filter(s=>new Date(s.endDate)>today).sort((a,b)=>new Date(b.endDate)-new Date(a.endDate))[0]?.endDate?.split("T")[0]}
              </span>
            ) : (
              <button className="pr-btn pr-btn-green pr-btn-sm" onClick={()=>setShowForm(f=>!f)}>
                {showForm ? "✕ Cancel" : "+ New Season"}
              </button>
            );
          })()}
        </div>

        <ErrBox msg={apiErr}/>

        {/* info banner */}
        <div style={{background:"rgba(146,145,131,.06)",border:"1px solid rgba(146,145,131,.2)",borderRadius:10,padding:"10px 14px",marginBottom:16,fontSize:12.5,color:"#7A5A2B",lineHeight:1.6}}>
          💡 <strong>How it works:</strong> Adding a season sets the <strong>Cash In Hand</strong> opening balance when you activate it. You must activate a season before recording cashbook entries.
        </div>

        {showForm && (
          <div style={{background:"#f8fafc",border:"1.5px solid #e2e8f0",borderRadius:12,padding:18,marginBottom:18}}>
            <div style={{fontSize:13,fontWeight:700,color:"#0f172a",marginBottom:14,display:"flex",alignItems:"center",gap:7}}>
              <span style={{background:"rgba(146,145,131,.08)",color:"#929183",padding:"2px 9px",borderRadius:20,fontSize:11,fontFamily:"'DM Mono',monospace",border:"1px solid rgba(146,145,131,.3)"}}>
                New Season #{String((seasons.length)+1).padStart(3,"0")}
              </span>
              will be auto-named
            </div>
            <div className="pr-grid2" style={{gap:12}}>
              <Field label="Start Date">
                <input className="pr-input" type="date" value={form.startDate}
                  onChange={e => handleStartChange(e.target.value)}/>
              </Field>
              <Field label="End Date (auto: 1 year after start)">
                <input className="pr-input" type="date" value={form.endDate}
                  onChange={e => setForm(p => ({...p, endDate: e.target.value}))}/>
              </Field>
              <div style={{gridColumn:"span 2"}}>
                <Field label="Opening Balance — Cash In Hand (Rs)">
                  <input className="pr-input mono" type="number" min="0" placeholder="e.g. 50000"
                    value={form.openingBalance} onChange={e=>setForm(p=>({...p,openingBalance:e.target.value}))}/>
                  <div style={{fontSize:11,color:"#929183",marginTop:4,lineHeight:1.6}}>
                    {seasons.some(s=>s.isActive)
                      ? "⚡ New season: Cash In Hand = (closing balance of last season) + this amount."
                      : "First season: Cash In Hand will be set exactly to this amount."}
                  </div>
                </Field>
              </div>
            </div>
            <div style={{marginTop:14,display:"flex",gap:9}}>
              <button className="pr-btn pr-btn-primary" onClick={add} disabled={busy==="add"}>
                {busy==="add" ? "Adding…" : "Add Season"}
              </button>
              <button className="pr-btn pr-btn-outline" onClick={()=>{setShowForm(false);setForm({startDate:"",endDate:"",openingBalance:""});}}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="pr-no-data">Loading seasons…</div>
        ) : seasons.length === 0 && !apiErr ? (
          <div className="pr-no-data" style={{borderRadius:12,border:"1.5px dashed #e2e8f0",padding:28}}>
            No seasons yet. Create your first season to start tracking cashbook.
          </div>
        ) : seasons.map(s => (
          <div key={s._id} className={`pr-season${s.isActive ? " active" : ""}`} style={{flexWrap:"wrap",gap:8}}>
            {editId === s._id ? (
              /* inline edit row */
              <div style={{width:"100%",display:"flex",flexDirection:"column",gap:10}}>
                <div style={{fontSize:12.5,fontWeight:700,color:"#929183"}}>Editing {s.name}</div>
                <div className="pr-grid2" style={{gap:10}}>
                  <Field label="Start Date">
                    <input className="pr-input" type="date" value={editForm.startDate||""}
                      onChange={e=>handleStartChange(e.target.value,true)}/>
                  </Field>
                  <Field label="End Date">
                    <input className="pr-input" type="date" value={editForm.endDate||""}
                      onChange={e=>setEditForm(p=>({...p,endDate:e.target.value}))}/>
                  </Field>
                  <div style={{gridColumn:"span 2"}}>
                    <Field label="Opening Balance (Rs)">
                      <input className="pr-input mono" type="number" value={editForm.openingBalance||0}
                        onChange={e=>setEditForm(p=>({...p,openingBalance:e.target.value}))}/>
                    </Field>
                  </div>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button className="pr-btn pr-btn-green pr-btn-sm" onClick={()=>saveEdit(s._id)} disabled={busy===s._id}>{busy===s._id?"Saving…":"Save"}</button>
                  <button className="pr-btn pr-btn-outline pr-btn-sm" onClick={()=>setEditId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className={`pr-season-dot${s.isActive ? " active" : ""}`}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
                    <div className="pr-season-name">{s.name || `S-${s.seasonCode||"?"}`}</div>
                    {s.isActive && <span style={{fontSize:10,fontWeight:700,background:"rgba(146,145,131,.1)",color:"#929183",padding:"1px 7px",borderRadius:20,border:"1px solid rgba(146,145,131,.2)",fontFamily:"'DM Mono',monospace",letterSpacing:".1em"}}>ACTIVE</span>}
                  </div>
                  <div className="pr-season-dates">{fmt(s.startDate)} → {fmt(s.endDate)}</div>
                </div>
                <div className="pr-season-bal">Rs {(s.openingBalance||0).toLocaleString()}</div>
                <div className="pr-season-actions">
                  {!s.isActive && (
                    <button className="pr-btn pr-btn-green pr-btn-sm" onClick={()=>activate(s._id)} disabled={busy===s._id}>
                      {busy===s._id ? "…" : "Activate"}
                    </button>
                  )}
                  {!s.isActive && <button className="pr-btn pr-btn-outline pr-btn-sm" onClick={()=>{setEditId(s._id);setEditForm({startDate:s.startDate?.split("T")[0]||"",endDate:s.endDate?.split("T")[0]||"",openingBalance:s.openingBalance||0});}}>Edit</button>}
                  {!s.isActive && <button className="pr-btn pr-btn-danger pr-btn-sm" onClick={()=>del(s._id)}>🗑</button>}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* ── Seasonal Archive History ── */}
      {archives.length > 0 && (
        <div className="pr-card" style={{marginTop:16}}>
          <div className="pr-card-title">Seasonal Archive</div>
          <p style={{fontSize:12.5,color:"#64748b",marginBottom:14,lineHeight:1.6}}>
            All past season data is preserved in a secure archive. Each row shows a snapshot of that season's activity.
          </p>
          <div style={{border:"1px solid #e2e8f0",borderRadius:12,overflow:"hidden"}}>
            <table className="pr-vtable">
              <thead>
                <tr><th>Season</th><th>Period</th><th>Archived</th><th>Entries</th><th>Invoices</th><th>Cash In Hand (closing)</th></tr>
              </thead>
              <tbody>
                {archives.map(a => (
                  <tr key={a._id}>
                    <td><span style={{fontFamily:"'DM Mono',monospace",fontWeight:700,color:"#929183"}}>{a.seasonName}</span></td>
                    <td style={{fontFamily:"'DM Mono',monospace",fontSize:11.5,color:"#64748b"}}>
                      {fmt(a.startDate)} → {fmt(a.endDate)}
                    </td>
                    <td style={{fontSize:11.5,color:"#94a3b8",fontFamily:"'DM Mono',monospace"}}>{fmt(a.archivedAt)}</td>
                    <td><span style={{background:"rgba(33,42,55,.08)",color:"#334455",padding:"2px 9px",borderRadius:20,fontSize:11.5,fontWeight:700,fontFamily:"'DM Mono',monospace"}}>{a.entryCount}</span></td>
                    <td><span style={{background:"rgba(146,145,131,.08)",color:"#929183",padding:"2px 9px",borderRadius:20,fontSize:11.5,fontWeight:700,fontFamily:"'DM Mono',monospace"}}>{a.invoiceCount}</span></td>
                    <td className="pr-td-rate">Rs {(a.cashInHandClosingBalance||0).toLocaleString()}</td>
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

// ═════════════════════════════════════════════════════════════════════════════
// TAB: Mill Config (Vehicles + Bag Types + Moisture Settings)
// ═════════════════════════════════════════════════════════════════════════════
function TabMillConfig({ showToast }) {
  // --- Vehicles ---
  const [vehicles, setVehicles] = useState([]);
  const [vForm,    setVForm]    = useState({ vehicleType:"", rate:"" });
  const [vEditId,  setVEditId]  = useState(null);
  const [vEditForm,setVEditForm]= useState({});
  // --- Bag Types ---
  const [bags,     setBags]     = useState([]);
  const [bForm,    setBForm]    = useState({ bagTypeName:"", bagWeight:"" });
  const [bEditId,  setBEditId]  = useState(null);
  const [bEditForm,setBEditForm]= useState({});
  // --- Moisture Settings ---
  const [settings,     setSettings]     = useState({ baseMoisture:"", weightCut:"" });
  const [settBusy,     setSettBusy]     = useState(false);
  const [settEditMode, setSettEditMode] = useState(false);
  // shared
  const [loading, setLoading]  = useState(true);
  const [apiErr,  setApiErr]   = useState("");
  const [busy,    setBusy]     = useState("");

  const load = async () => {
    setLoading(true); setApiErr("");
    const [vr, br, sr] = await Promise.all([
      safeFetch(`${API_BASE_URL}/profile/vehicles`),
      safeFetch(`${API_BASE_URL}/profile/bag-types`),
      safeFetch(`${API_BASE_URL}/profile/mill-settings`),
    ]);
    if (vr.ok) setVehicles(vr.data.vehicles || []);
    if (br.ok) setBags(br.data.bagTypes || []);
    if (sr.ok) {
      const s = sr.data.settings;
      setSettings({ baseMoisture: s.baseMoisture ?? "", weightCut: s.weightCut ?? "" });
    }
    setLoading(false);
  };
  useEffect(()=>{ load(); },[]);

  /* ── Vehicles ── */
  const addVehicle = async () => {
    if (!vForm.vehicleType || vForm.rate === "") return showToast("Type and rate required", false);
    setBusy("vadd");
    const { ok, error } = await safeFetch(`${API_BASE_URL}/profile/vehicles`,{
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ vehicleType:vForm.vehicleType.trim(), rate:Number(vForm.rate) }),
    });
    if (!ok) showToast(error, false);
    else { showToast("Vehicle added ✓", true); setVForm({ vehicleType:"", rate:"" }); load(); }
    setBusy("");
  };
  const saveVehicle = async (id) => {
    setBusy(id);
    const { ok, error } = await safeFetch(`${API_BASE_URL}/profile/vehicles/${id}`,{
      method:"PUT", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ vehicleType:vEditForm.vehicleType, rate:Number(vEditForm.rate), isActive:vEditForm.isActive }),
    });
    if (!ok) showToast(error, false);
    else { showToast("Updated ✓", true); setVEditId(null); load(); }
    setBusy("");
  };
  const delVehicle = async (id) => {
    if (!window.confirm("Remove this vehicle?")) return;
    const { ok, error } = await safeFetch(`${API_BASE_URL}/profile/vehicles/${id}`,{ method:"DELETE" });
    if (!ok) showToast(error, false); else { showToast("Removed", true); load(); }
  };

  /* ── Bag Types ── */
  const addBag = async () => {
    if (!bForm.bagTypeName || bForm.bagWeight === "") return showToast("Name and weight required", false);
    setBusy("badd");
    const { ok, error } = await safeFetch(`${API_BASE_URL}/profile/bag-types`,{
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ bagTypeName:bForm.bagTypeName.trim(), bagWeight:Number(bForm.bagWeight) }),
    });
    if (!ok) showToast(error, false);
    else { showToast("Bag type added ✓", true); setBForm({ bagTypeName:"", bagWeight:"" }); load(); }
    setBusy("");
  };
  const saveBag = async (id) => {
    setBusy(id);
    const { ok, error } = await safeFetch(`${API_BASE_URL}/profile/bag-types/${id}`,{
      method:"PUT", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ bagTypeName:bEditForm.bagTypeName, bagWeight:Number(bEditForm.bagWeight), isActive:bEditForm.isActive }),
    });
    if (!ok) showToast(error, false);
    else { showToast("Updated ✓", true); setBEditId(null); load(); }
    setBusy("");
  };
  const delBag = async (id) => {
    if (!window.confirm("Remove this bag type?")) return;
    const { ok, error } = await safeFetch(`${API_BASE_URL}/profile/bag-types/${id}`,{ method:"DELETE" });
    if (!ok) showToast(error, false); else { showToast("Removed", true); load(); }
  };

  /* ── Moisture Settings save (used by add form only) ── */
  const saveMoisture = async () => {
    setSettBusy(true);
    const { ok, error } = await safeFetch(`${API_BASE_URL}/profile/mill-settings`,{
      method:"PUT", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ baseMoisture:Number(settings.baseMoisture||0), weightCut:Number(settings.weightCut||0) }),
    });
    if (!ok) showToast(error, false);
    else showToast("Moisture settings saved ✓", true);
    setSettBusy(false);
  };

  /* ── Shared table renderer ── */
  const configTable = (rows, editId, editFormVal, onEdit, setEditId, setEditFormVal, colDefs, onSave, onDel, saveLabel) => (
    <div style={{border:"1px solid #e2e8f0",borderRadius:12,overflow:"hidden"}}>
      {loading ? <div className="pr-no-data">Loading…</div>
        : rows.length === 0 ? <div className="pr-no-data">None added yet.</div>
        : (
        <table className="pr-vtable">
          <thead><tr>{colDefs.map(h=><th key={h}>{h}</th>)}<th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {rows.map(row => (
              <tr key={row._id}>
                {editId === row._id ? (
                  <>
                    {colDefs.slice(0,-1).map((h,i) => {
                      const key = Object.keys(editFormVal).filter(k=>k!=="isActive")[i];
                      return <td key={h}><input className="pr-input" style={{padding:"6px 10px"}} type={typeof row[key]==="number"?"number":"text"} value={editFormVal[key]??""} onChange={e=>setEditFormVal({...editFormVal,[key]:e.target.value})}/></td>;
                    })}
                    <td><select className="pr-select" style={{padding:"6px 10px",fontSize:12}} value={String(editFormVal.isActive)} onChange={e=>setEditFormVal({...editFormVal,isActive:e.target.value==="true"})}><option value="true">Active</option><option value="false">Inactive</option></select></td>
                    <td><div className="pr-td-actions"><button className="pr-btn pr-btn-green pr-btn-sm" onClick={()=>onSave(row._id)} disabled={busy===row._id}>{busy===row._id?"…":"Save"}</button><button className="pr-btn pr-btn-outline pr-btn-sm" onClick={()=>setEditId(null)}>Cancel</button></div></td>
                  </>
                ) : (
                  <>
                    {colDefs.slice(0,-1).map((h,i) => {
                      const key = Object.keys(row).filter(k=>!["_id","isActive","createdAt","updatedAt","__v"].includes(k))[i];
                      const val = row[key];
                      return <td key={h} style={{fontWeight:i===0?600:400}}>{typeof val==="number"?<span className="pr-td-rate">{val}</span>:val}</td>;
                    })}
                    <td><span style={{fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:20,border:"1px solid",fontFamily:"'DM Mono',monospace",background:row.isActive?"rgba(146,145,131,.08)":"rgba(110,113,112,.08)",color:row.isActive?"#929183":"#A5A8A6",borderColor:row.isActive?"rgba(146,145,131,.25)":"rgba(165,168,166,.2)"}}>{row.isActive?"Active":"Inactive"}</span></td>
                    <td><div className="pr-td-actions"><button className="pr-btn pr-btn-outline pr-btn-sm" onClick={()=>{ onEdit(row._id); setEditFormVal(Object.fromEntries(Object.entries(row).filter(([k])=>!["_id","createdAt","updatedAt","__v"].includes(k)))); }}>Edit</button><button className="pr-btn pr-btn-danger pr-btn-sm" onClick={()=>onDel(row._id)}>🗑</button></div></td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div>
      <ErrBox msg={apiErr}/>

      {/* ── Vehicles ── */}
      <div className="pr-card">
        <div className="pr-card-title">Custom Vehicles & Rates</div>
        <p style={{fontSize:12.5,color:"#64748b",marginBottom:16,lineHeight:1.6}}>Vehicle types appear in the Weight Bridge dropdown.</p>
        <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap",alignItems:"flex-end"}}>
          <div style={{flex:"1 1 180px"}}>
            <label className="pr-label" style={{display:"block",marginBottom:5}}>Vehicle Type</label>
            <input className="pr-input" placeholder="e.g. 20 Wheeler" value={vForm.vehicleType} onChange={e=>setVForm({...vForm,vehicleType:e.target.value})}/>
          </div>
          <div style={{flex:"0 0 140px"}}>
            <label className="pr-label" style={{display:"block",marginBottom:5}}>Rate (Rs/trip)</label>
            <input className="pr-input mono" type="number" placeholder="0" value={vForm.rate} onChange={e=>setVForm({...vForm,rate:e.target.value})}/>
          </div>
          <button className="pr-btn pr-btn-green" onClick={addVehicle} disabled={busy==="vadd"}>{busy==="vadd"?"Adding…":"+ Add Vehicle"}</button>
        </div>
        {configTable(vehicles, vEditId, vEditForm, setVEditId, setVEditId, setVEditForm, ["Vehicle Type","Rate (Rs)",""], saveVehicle, delVehicle, "Save")}
      </div>

      {/* ── Bag Types ── */}
      <div className="pr-card">
        <div className="pr-card-title">Bag Types</div>
        <p style={{fontSize:12.5,color:"#64748b",marginBottom:16,lineHeight:1.6}}>Bag types and their weights per bag (kg) are used in Purchase Invoice calculations.</p>
        <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap",alignItems:"flex-end"}}>
          <div style={{flex:"1 1 180px"}}>
            <label className="pr-label" style={{display:"block",marginBottom:5}}>Bag Type Name</label>
            <input className="pr-input" placeholder="e.g. Jute Bag" value={bForm.bagTypeName} onChange={e=>setBForm({...bForm,bagTypeName:e.target.value})}/>
          </div>
          <div style={{flex:"0 0 160px"}}>
            <label className="pr-label" style={{display:"block",marginBottom:5}}>Weight per Bag (kg)</label>
            <input className="pr-input mono" type="number" step="0.01" placeholder="e.g. 0.65" value={bForm.bagWeight} onChange={e=>setBForm({...bForm,bagWeight:e.target.value})}/>
          </div>
          <button className="pr-btn pr-btn-green" onClick={addBag} disabled={busy==="badd"}>{busy==="badd"?"Adding…":"+ Add Bag Type"}</button>
        </div>
        {configTable(bags, bEditId, bEditForm, setBEditId, setBEditId, setBEditForm, ["Bag Type","Weight (kg/bag)",""], saveBag, delBag, "Save")}
      </div>

      {/* ── Moisture Settings ── */}
      <div className="pr-card">
        <div className="pr-card-title">Moisture Settings</div>
        <p style={{fontSize:12.5,color:"#64748b",marginBottom:16,lineHeight:1.6}}>
          Set the acceptable moisture threshold. Moisture above base will deduct weight using the formula:<br/>
          <strong>Moisture Adj = (Moisture% − Base%) × Weight Cut × Quantity</strong>
        </p>

        {/* ── Add form — only shown when no settings saved yet ── */}
        {!loading && !(settings.baseMoisture !== "" && settings.baseMoisture !== null && settings.baseMoisture !== undefined && (Number(settings.baseMoisture) > 0 || Number(settings.weightCut) > 0)) && (
          <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap",alignItems:"flex-end"}}>
            <div style={{flex:"0 0 160px"}}>
              <label className="pr-label" style={{display:"block",marginBottom:5}}>Base Moisture (%)</label>
              <input className="pr-input mono" type="number" step="0.1" min="0" placeholder="e.g. 24"
                value={settings.baseMoisture} onChange={e=>setSettings({...settings,baseMoisture:e.target.value})}/>
            </div>
            <div style={{flex:"0 0 200px"}}>
              <label className="pr-label" style={{display:"block",marginBottom:5}}>Weight Cut per % per Bag (kg)</label>
              <input className="pr-input mono" type="number" step="0.01" min="0" placeholder="e.g. 0.5"
                value={settings.weightCut} onChange={e=>setSettings({...settings,weightCut:e.target.value})}/>
            </div>
            <button className="pr-btn pr-btn-green" onClick={saveMoisture} disabled={settBusy}>
              {settBusy?"Saving…":"+ Set Moisture"}
            </button>
          </div>
        )}

        {/* ── Table row — shown once settings exist ── */}
        <div style={{border:"1px solid #e2e8f0",borderRadius:12,overflow:"hidden"}}>
          {loading ? (
            <div className="pr-no-data">Loading…</div>
          ) : !(Number(settings.baseMoisture) > 0 || Number(settings.weightCut) > 0) ? (
            <div className="pr-no-data">No moisture settings configured yet.</div>
          ) : (
            <table className="pr-vtable">
              <thead>
                <tr>
                  <th>Base Moisture (%)</th>
                  <th>Weight Cut (kg/% per bag)</th>
                  <th>Formula Preview</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {settEditMode ? (
                  <tr>
                    <td>
                      <input className="pr-input mono" style={{padding:"6px 10px"}} type="number" step="0.1" min="0"
                        value={settings.baseMoisture} onChange={e=>setSettings({...settings,baseMoisture:e.target.value})}/>
                    </td>
                    <td>
                      <input className="pr-input mono" style={{padding:"6px 10px"}} type="number" step="0.01" min="0"
                        value={settings.weightCut} onChange={e=>setSettings({...settings,weightCut:e.target.value})}/>
                    </td>
                    <td style={{fontSize:12,color:"#64748b",fontFamily:"'DM Mono',monospace"}}>
                      (M% − {settings.baseMoisture||"?"}) × {settings.weightCut||"?"} × qty
                    </td>
                    <td>
                      <div className="pr-td-actions">
                        <button className="pr-btn pr-btn-green pr-btn-sm" onClick={async()=>{setSettBusy(true);const{ok,error}=await safeFetch(`${API_BASE_URL}/profile/mill-settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({baseMoisture:Number(settings.baseMoisture||0),weightCut:Number(settings.weightCut||0)})});if(!ok)showToast(error,false);else{showToast("Moisture settings saved ✓",true);setSettEditMode(false);}setSettBusy(false);}} disabled={settBusy}>{settBusy?"…":"Save"}</button>
                        <button className="pr-btn pr-btn-outline pr-btn-sm" onClick={()=>setSettEditMode(false)}>Cancel</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td><span className="pr-td-rate">{settings.baseMoisture}%</span></td>
                    <td><span className="pr-td-rate">{settings.weightCut} kg</span></td>
                    <td style={{fontSize:12,color:"#64748b",fontFamily:"'DM Mono',monospace"}}>
                      (M% − {settings.baseMoisture}) × {settings.weightCut} × qty bags
                    </td>
                    <td>
                      <div className="pr-td-actions">
                        <button className="pr-btn pr-btn-outline pr-btn-sm" onClick={()=>setSettEditMode(true)}>Edit</button>
                        <button className="pr-btn pr-btn-danger pr-btn-sm" onClick={async()=>{
                          if(!window.confirm("Clear moisture settings?"))return;
                          setSettBusy(true);
                          const{ok,error}=await safeFetch(`${API_BASE_URL}/profile/mill-settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({baseMoisture:0,weightCut:0})});
                          if(!ok)showToast(error,false);
                          else{showToast("Moisture settings cleared",true);setSettings({baseMoisture:"",weightCut:""});}
                          setSettBusy(false);
                        }}>🗑</button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// TAB: Payment History
// ═════════════════════════════════════════════════════════════════════════════
function TabPayments() {
  const [payments, setPayments] = useState([]);
  const [billing,  setBilling]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [apiErr,   setApiErr]   = useState("");

  useEffect(() => {
    (async () => {
      const { ok, data, error } = await safeFetch(`${API_BASE_URL}/profile/payments`);
      if (!ok) setApiErr(error);
      else { setPayments(data.payments || []); setBilling(data.billingDate); }
      setLoading(false);
    })();
  }, []);

  const BASE  = API_BASE_URL.replace(/\/api\/?$/, "");  // kept for future use

  return (
    <div>
      <div className="pr-card">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <div className="pr-card-title" style={{margin:0}}>Payment History</div>
          {billing && (
            <span style={{fontSize:11.5,background:"#fef9c3",color:"#92400e",padding:"4px 12px",borderRadius:20,border:"1px solid #fde68a",fontFamily:"'DM Mono',monospace",fontWeight:600}}>
              Next billing: {fmt(billing)}
            </span>
          )}
        </div>

        <ErrBox msg={apiErr}/>

        {loading ? (
          <div className="pr-no-data">Loading payments…</div>
        ) : payments.length === 0 && !apiErr ? (
          <div className="pr-nopay">No payment records found.</div>
        ) : (
          <div className="pr-paytl">
            {payments.map((p, i) => (
              <div key={p.tid || i} className={`pr-paycard${i === 0 ? " latest" : " old"}`}>
                <div className="pr-paytop">
                  <div>
                    {i === 0 && <div style={{fontSize:9.5,fontWeight:700,background:"rgba(146,145,131,.08)",color:"#929183",padding:"2px 8px",borderRadius:20,display:"inline-block",marginBottom:4,fontFamily:"'DM Mono',monospace",letterSpacing:".1em",textTransform:"uppercase"}}>Latest</div>}
                    <div className="pr-paytid">TXN: {p.tid || "—"}</div>
                    <div className="pr-paytime">{fmtT(p.submittedAt)}</div>
                  </div>
                  <div className="pr-payamt">Rs {(p.amountSent || 7000).toLocaleString()}</div>
                </div>
                <div className="pr-paygrid">
                  {[
                    ["From Bank",     p.senderBank    || "—"],
                    ["Sent To",       p.receivingBank || "—"],
                    ["Account Title", p.senderTitle   || "—"],
                    ["Account No",    p.senderAccount || "—"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div className="pr-payfk">{k}</div>
                      <div className="pr-payfv" style={{fontFamily:k==="Account No"?"'DM Mono',monospace":undefined}}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// TAB: Support
// ═════════════════════════════════════════════════════════════════════════════
function TabSupport({ showToast }) {
  const [type,    setType]    = useState("complaint");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [busy,    setBusy]    = useState(false);
  const [history, setHistory] = useState([]);
  const [apiErr,  setApiErr]  = useState("");

  const load = async () => {
    const { ok, data, error } = await safeFetch(`${API_BASE_URL}/profile/complaints`);
    if (!ok) setApiErr(error);
    else setHistory(data.complaints || []);
  };
  useEffect(() => { load(); }, []);

  const submit = async () => {
    if (!subject.trim() || !message.trim()) return showToast("Subject and message are required", false);
    if (type === "deletion_request" && !window.confirm("Are you sure you want to request account deletion?")) return;
    setBusy(true);
    const { ok, data, error } = await safeFetch(`${API_BASE_URL}/profile/complaint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, subject, message }),
    });
    if (!ok) showToast(error, false);
    else { showToast(data.message, true); setSubject(""); setMessage(""); load(); }
    setBusy(false);
  };

  const TYPE_LABELS = { complaint:"🚨 Complaint", feedback:"💬 Feedback", deletion_request:"🗑 Request Deletion" };
  const CS_CLASS    = { open:"pr-cs pr-cs-open", in_review:"pr-cs pr-cs-review", resolved:"pr-cs pr-cs-resolved" };

  return (
    <div>
      <div className="pr-card">
        <div className="pr-card-title">Submit a Request</div>
        <ErrBox msg={apiErr}/>

        <div className="pr-type-row">
          {Object.entries(TYPE_LABELS).map(([k, v]) => (
            <button key={k}
              className={`pr-type-btn${type===k ? (k==="deletion_request" ? " on-red" : " on") : ""}`}
              onClick={() => setType(k)}>
              {v}
            </button>
          ))}
        </div>

        {type === "deletion_request" && (
          <div style={{background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:10,padding:14,marginBottom:16,fontSize:13,color:"#991b1b",lineHeight:1.6}}>
            ⚠️ <strong>Account Deletion:</strong> Submitting this will notify ORCA TECH support. Your account and all data will be reviewed before deletion. This cannot be automatically reversed.
          </div>
        )}

        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <Field label="Subject">
            <input className="pr-input" placeholder={type==="deletion_request"?"Reason for deletion request":"Brief subject line"} value={subject} onChange={e=>setSubject(e.target.value)}/>
          </Field>
          <Field label="Message">
            <textarea className="pr-textarea" placeholder="Describe your issue or feedback in detail…" value={message} onChange={e=>setMessage(e.target.value)} rows={4}/>
          </Field>
          <button
            className={`pr-btn pr-btn-sm ${type==="deletion_request" ? "pr-btn-danger" : "pr-btn-primary"}`}
            style={{alignSelf:"flex-start",padding:"10px 20px"}}
            onClick={submit} disabled={busy}>
            {busy ? "Submitting…" : "Submit →"}
          </button>
        </div>
      </div>

      {history.length > 0 && (
        <div className="pr-card">
          <div className="pr-card-title">Previous Requests ({history.length})</div>
          {history.map(c => (
            <div key={c._id} className="pr-complaint">
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,gap:8,flexWrap:"wrap"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                  <span style={{fontSize:12.5,fontWeight:700,color:"#0f172a"}}>{c.subject}</span>
                  <span style={{fontSize:10.5,background:"rgba(100,116,139,.1)",color:"#64748b",padding:"2px 8px",borderRadius:20,fontFamily:"'DM Mono',monospace",textTransform:"uppercase",letterSpacing:".08em",fontWeight:600}}>
                    {c.type?.replace("_"," ")}
                  </span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span className={CS_CLASS[c.status] || "pr-cs pr-cs-open"}>{c.status?.replace("_"," ")}</span>
                  <span style={{fontSize:11,color:"#94a3b8",fontFamily:"'DM Mono',monospace"}}>{fmt(c.createdAt)}</span>
                </div>
              </div>
              <div style={{fontSize:13,color:"#475569",lineHeight:1.6}}>{c.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN
// ═════════════════════════════════════════════════════════════════════════════
export default function AdminProfile() {
  const [tab,         setTab]        = useState("account");
  const [profile,     setProfile]    = useState(null);
  const [accounts,    setAccounts]   = useState([]);
  const [toast,       setToast]      = useState(null);
  const [logoUrl,     setLogoUrl]    = useState(localStorage.getItem("logoUrl") || "");
  const [logoUploading, setLogoUploading] = useState(false);
  const [avatarError,   setAvatarError]   = useState(false);

  const showToast = (msg, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    // Use safeFetch here too so initial load errors don't redirect
    safeFetch(`${API_BASE_URL}/profile`)
      .then(({ ok, data }) => { if (ok) setProfile(data.profile); });
    safeFetch(`${API_BASE_URL}/accounts`)
      .then(({ ok, data }) => { if (ok) setAccounts(Array.isArray(data) ? data : (data?.accounts || [])); });
  }, []);

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) { showToast("Image must be under 3 MB", false); return; }
    setLogoUploading(true);
    const fd = new FormData();
    fd.append("logo", file);
    const { ok, data, error } = await safeFetch(`${API_BASE_URL}/profile/logo`, {
      method: "PUT",
      body: fd,
    });
    if (!ok) showToast(error, false);
    else {
      const url = data.logoUrl.replace(/\\/g, "/");
      const serverRoot = API_BASE_URL.replace(/\/api\/?$/, "");
      const fullUrl = /^https?:\/\//.test(url) ? url : `${serverRoot}/${url.replace(/^\//, "")}`;
      setLogoUrl(fullUrl);
      localStorage.setItem("logoUrl", fullUrl);
      setAvatarError(false);
      showToast("Profile picture updated ✓", true);
    }
    setLogoUploading(false);
  };

  const daysLeft = profile?.billingDate
    ? Math.ceil((new Date(profile.billingDate) - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <div className="pr" style={{maxWidth:820,margin:"0 auto",padding:"4px 0 40px"}}>

        {/* Hero */}
        <div className="pr-hero">
          <div className="pr-hero-accent"/>
          <label htmlFor="logo-upload" style={{cursor:"pointer",display:"block",flexShrink:0}}>
            <div className="pr-avatar">
              {logoUrl && !avatarError ? (
                <img src={logoUrl} alt="Logo"
                  onError={() => setAvatarError(true)}
                  onLoad={() => setAvatarError(false)}/>
              ) : (
                /* Fallback: gold initials on dark */
                <div style={{
                  width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",
                  background:"linear-gradient(135deg,#212A37,#334455)",
                  fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,
                  color:"#929183",letterSpacing:"-.5px",
                }}>
                  {(profile?.ownerName||localStorage.getItem("name")||"A").charAt(0).toUpperCase()}
                </div>
              )}
              <div className="pr-avatar-overlay">
                {logoUploading ? (
                  <span className="pr-spin" style={{color:"#fff"}}>⟳</span>
                ) : (
                  <>
                    <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                      <circle cx="12" cy="13" r="3" stroke="#fff" strokeWidth={2}/>
                    </svg>
                    <span>Change</span>
                  </>
                )}
              </div>
            </div>
            <input id="logo-upload" type="file" accept="image/*" style={{display:"none"}} onChange={handleLogoUpload}/>
            <div className="pr-upload-hint">click to change</div>
          </label>
          <div className="pr-hero-info">
            <div className="pr-hero-name">{profile?.ownerName || localStorage.getItem("name") || "Admin"}</div>
            <div className="pr-hero-biz">{profile?.businessName || localStorage.getItem("businessName")}</div>
            <div className="pr-hero-pills">
              <span className="pr-pill pr-pill-green">Admin</span>
              {profile?.approvalStatus === "approved" && <span className="pr-pill pr-pill-green">✓ Approved</span>}
              <span className="pr-pill pr-pill-blue">{profile?.plan || "monthly"}</span>
              {daysLeft !== null && (
                <span className={`pr-pill ${daysLeft <= 5 ? "pr-pill-amber" : "pr-pill-blue"}`}>
                  {daysLeft > 0 ? `${daysLeft}d until billing` : "Payment overdue"}
                </span>
              )}
            </div>
            {profile?.adminCnic && (
              <div className="pr-hero-billing">CNIC: {profile.adminCnic} · Mill: {profile.millId}</div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="pr-tabs">
          {TABS.map(t => (
            <button key={t.id} className={`pr-tab${tab === t.id ? " on" : ""}`} onClick={() => setTab(t.id)}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === "account"  && <TabAccount  profile={profile} onSaved={setProfile} showToast={showToast}/>}
        {tab === "seasons"  && <TabSeasons  showToast={showToast}/>}
        {tab === "mill"     && <TabMillConfig showToast={showToast}/>}
        {tab === "payments" && <TabPayments/>}
        {tab === "support"  && <TabSupport  showToast={showToast}/>}

      </div>
      {toast && <Toast msg={toast.msg} ok={toast.ok}/>}
    </SidebarLayout>
  );
}