// AdminProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL  from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');`;

const CSS = `
  @keyframes prFadeUp { from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none} }
  @keyframes prSpin   { to{transform:rotate(360deg)} }
  @keyframes prPulse  { 0%,100%{opacity:1}50%{opacity:.5} }
  .pr { font-family:'Plus Jakarta Sans',sans-serif; color:#1e293b; }

  /* ── Hero ── */
  .pr-hero {
    background: linear-gradient(145deg,#0a1628 0%,#0f2240 40%,#0a2e1a 100%);
    border-radius:24px; padding:28px 32px; margin-bottom:24px;
    display:flex; align-items:center; gap:24px; position:relative; overflow:hidden;
    border:1px solid rgba(255,255,255,.06);
    box-shadow: 0 20px 60px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.06);
  }
  .pr-hero::before {
    content:''; position:absolute; right:-60px; top:-60px; width:280px; height:280px;
    border-radius:50%; pointer-events:none;
    background:radial-gradient(circle,rgba(16,185,129,.12) 0%,transparent 65%);
  }
  .pr-hero::after {
    content:''; position:absolute; left:30%; bottom:-40px; width:180px; height:180px;
    border-radius:50%; pointer-events:none;
    background:radial-gradient(circle,rgba(99,102,241,.08) 0%,transparent 70%);
  }

  /* ── Avatar ── */
  .pr-avatar {
    width:76px; height:76px; border-radius:18px; flex-shrink:0;
    background:linear-gradient(135deg,#065f46,#059669);
    display:flex; align-items:center; justify-content:center;
    border:2px solid rgba(255,255,255,.12);
    box-shadow:0 8px 24px rgba(16,185,129,.25), 0 0 0 4px rgba(16,185,129,.08);
    overflow:hidden; position:relative; cursor:pointer; transition:.2s;
  }
  .pr-avatar:hover { box-shadow:0 8px 28px rgba(16,185,129,.4), 0 0 0 4px rgba(16,185,129,.15); transform:scale(1.03); }
  .pr-avatar img { width:100%; height:100%; object-fit:cover; display:block; position:absolute; inset:0; }
  .pr-avatar-overlay {
    position:absolute; inset:0; background:rgba(0,0,0,.55); display:flex; flex-direction:column;
    align-items:center; justify-content:center; gap:3px;
    opacity:0; transition:opacity .2s; border-radius:16px;
  }
  .pr-avatar:hover .pr-avatar-overlay { opacity:1; }
  .pr-avatar-overlay span { font-size:9px; font-weight:700; color:#fff; letter-spacing:.08em; text-transform:uppercase; }

  .pr-hero-info { flex:1; min-width:0; position:relative; z-index:1; }
  .pr-hero-name { font-family:'Syne',sans-serif; font-size:22px; font-weight:800; color:#fff; margin-bottom:2px; letter-spacing:-.3px; }
  .pr-hero-biz  { font-size:12.5px; color:rgba(255,255,255,.45); margin-bottom:10px; }
  .pr-hero-pills { display:flex; gap:7px; flex-wrap:wrap; }
  .pr-pill { font-family:'JetBrains Mono',monospace; font-size:10px; font-weight:600; padding:3px 10px; border-radius:20px; border:1px solid; }
  .pr-pill-green { background:rgba(16,185,129,.15); color:#34d399; border-color:rgba(16,185,129,.3); }
  .pr-pill-blue  { background:rgba(99,102,241,.15);  color:#a5b4fc; border-color:rgba(99,102,241,.3); }
  .pr-pill-amber { background:rgba(245,158,11,.15);  color:#fbbf24; border-color:rgba(245,158,11,.3); }
  .pr-hero-billing { font-size:11px; color:rgba(255,255,255,.25); margin-top:8px; font-family:'JetBrains Mono',monospace; }
  .pr-upload-hint { font-size:10px; color:rgba(255,255,255,.3); text-align:center; margin-top:5px; font-family:'JetBrains Mono',monospace; letter-spacing:.05em; }

  /* ── Tabs ── */
  .pr-tabs {
    display:flex; gap:2px; background:#f1f5f9; border-radius:14px; padding:4px;
    margin-bottom:24px; flex-wrap:wrap;
    box-shadow:inset 0 1px 3px rgba(0,0,0,.06);
  }
  .pr-tab {
    flex:1; min-width:90px; padding:10px 12px; border-radius:10px; border:none;
    background:transparent; font-size:12px; font-weight:600; cursor:pointer;
    color:#64748b; font-family:'Plus Jakarta Sans',sans-serif; transition:.18s;
    display:flex; align-items:center; justify-content:center; gap:5px; white-space:nowrap;
  }
  .pr-tab:hover { background:rgba(255,255,255,.7); color:#0f172a; }
  .pr-tab.on    { background:#fff; color:#0f172a; box-shadow:0 2px 8px rgba(0,0,0,.08); font-weight:700; }
  /* ── Cards ── */
  .pr-card {
    background:#fff; border:1px solid #e8edf5; border-radius:18px; padding:24px;
    margin-bottom:16px; animation:prFadeUp .25s ease both;
    box-shadow:0 2px 12px rgba(0,0,0,.04), 0 1px 3px rgba(0,0,0,.03);
    transition:box-shadow .2s;
  }
  .pr-card:hover { box-shadow:0 4px 20px rgba(0,0,0,.07), 0 1px 3px rgba(0,0,0,.04); }
  .pr-card-title {
    font-family:'Syne',sans-serif; font-size:14px; font-weight:700; color:#0f172a;
    margin-bottom:18px; display:flex; align-items:center; gap:10px;
    padding-bottom:14px; border-bottom:1.5px solid #f1f5f9;
  }
  .pr-card-title::before { content:''; width:3px; height:16px; background:linear-gradient(180deg,#059669,#34d399); border-radius:2px; flex-shrink:0; }
  .pr-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .pr-field  { display:flex; flex-direction:column; gap:6px; }
  .pr-label  { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:#94a3b8; }
  .pr-input  {
    padding:11px 14px; border:1.5px solid #e8edf5; border-radius:11px; font-size:13.5px;
    color:#0f172a; font-family:'Plus Jakarta Sans',sans-serif; outline:none;
    transition:.15s; background:#f8fafc;
  }
  .pr-input:focus  { border-color:#059669; background:#fff; box-shadow:0 0 0 3px rgba(5,150,105,.1); }
  .pr-input:disabled { background:#f1f5f9; color:#94a3b8; cursor:not-allowed; border-color:#f1f5f9; }
  .pr-input.mono   { font-family:'JetBrains Mono',monospace; font-size:12.5px; }
  .pr-select {
    padding:11px 14px; border:1.5px solid #e8edf5; border-radius:11px; font-size:13.5px;
    color:#0f172a; font-family:'Plus Jakarta Sans',sans-serif; outline:none;
    transition:.15s; background:#f8fafc; cursor:pointer;
  }
  .pr-select:focus { border-color:#059669; box-shadow:0 0 0 3px rgba(5,150,105,.1); }
  .pr-textarea {
    width:100%; padding:11px 14px; border:1.5px solid #e8edf5; border-radius:11px;
    font-size:13.5px; color:#0f172a; font-family:'Plus Jakarta Sans',sans-serif;
    outline:none; transition:.15s; resize:vertical; min-height:90px; background:#f8fafc;
  }
  .pr-textarea:focus { border-color:#059669; box-shadow:0 0 0 3px rgba(5,150,105,.1); background:#fff; }

  /* ── Buttons ── */
  .pr-btn {
    padding:10px 20px; border-radius:11px; border:none; font-size:13px; font-weight:700;
    font-family:'Plus Jakarta Sans',sans-serif; cursor:pointer; transition:.18s;
    display:inline-flex; align-items:center; gap:7px; letter-spacing:.01em;
  }
  .pr-btn-primary { background:linear-gradient(135deg,#0f172a,#1e293b); color:#fff; box-shadow:0 2px 8px rgba(15,23,42,.2); }
  .pr-btn-primary:hover { background:linear-gradient(135deg,#1e293b,#334155); box-shadow:0 4px 14px rgba(15,23,42,.3); transform:translateY(-1px); }
  .pr-btn-primary:disabled { background:#cbd5e1; cursor:not-allowed; transform:none; box-shadow:none; }
  .pr-btn-green  { background:linear-gradient(135deg,#059669,#047857); color:#fff; box-shadow:0 2px 8px rgba(5,150,105,.25); }
  .pr-btn-green:hover  { background:linear-gradient(135deg,#047857,#065f46); box-shadow:0 4px 14px rgba(5,150,105,.35); transform:translateY(-1px); }
  .pr-btn-green:disabled { background:#a7f3d0; cursor:not-allowed; transform:none; box-shadow:none; }
  .pr-btn-outline { background:#fff; border:1.5px solid #e8edf5; color:#475569; box-shadow:0 1px 3px rgba(0,0,0,.05); }
  .pr-btn-outline:hover { border-color:#94a3b8; color:#0f172a; background:#f8fafc; }
  .pr-btn-danger  { background:#fff5f5; border:1.5px solid #fecaca; color:#dc2626; }
  .pr-btn-danger:hover  { background:#dc2626; color:#fff; border-color:#dc2626; transform:translateY(-1px); }
  .pr-btn-sm { padding:7px 14px; font-size:11.5px; }
  .pr-vtable { width:100%; border-collapse:collapse; }
  .pr-vtable thead th { padding:9px 14px; text-align:left; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:#94a3b8; border-bottom:1px solid #f1f5f9; background:#f8fafc; font-family:'JetBrains Mono',monospace; }
  .pr-vtable tbody tr { border-bottom:1px solid #f8fafc; transition:background .1s; }
  .pr-vtable tbody tr:last-child { border-bottom:none; }
  .pr-vtable tbody tr:hover { background:#f8fafc; }
  .pr-vtable tbody td { padding:11px 14px; font-size:13px; color:#1e293b; vertical-align:middle; }
  .pr-td-rate { font-family:'JetBrains Mono',monospace; color:#059669; font-weight:600; }
  .pr-td-actions { display:flex; gap:6px; }
  .pr-no-data { padding:32px; text-align:center; color:#94a3b8; font-size:13.5px; }
  .pr-err-box { padding:16px 18px; background:#fef2f2; border:1px solid #fca5a5; border-radius:10px; font-size:13px; color:#991b1b; margin-bottom:16px; }
  .pr-season {
    background:#f8fafc; border:1.5px solid #e8edf5; border-radius:14px; padding:16px 18px;
    margin-bottom:10px; display:flex; align-items:center; gap:14px; transition:.18s;
    box-shadow:0 1px 4px rgba(0,0,0,.03);
  }
  .pr-season:hover { border-color:#c8d9f0; box-shadow:0 3px 12px rgba(0,0,0,.07); transform:translateY(-1px); }
  .pr-season.active { border-color:#059669; background:linear-gradient(135deg,#f0fdf4,#ecfdf5); box-shadow:0 4px 16px rgba(5,150,105,.1); }
  .pr-season-dot { width:10px; height:10px; border-radius:50%; background:#cbd5e1; flex-shrink:0; }
  .pr-season-dot.active { background:#059669; box-shadow:0 0 0 4px rgba(5,150,105,.18); animation:prPulse 2s ease infinite; }
  .pr-season-name { font-family:'Syne',sans-serif; font-size:14px; font-weight:700; color:#0f172a; }
  .pr-season-dates { font-size:11px; color:#64748b; font-family:'JetBrains Mono',monospace; }
  .pr-season-bal { font-family:'JetBrains Mono',monospace; font-size:13.5px; color:#059669; font-weight:700; margin-left:auto; white-space:nowrap; background:rgba(5,150,105,.08); padding:3px 10px; border-radius:20px; }
  .pr-season-actions { display:flex; gap:6px; }
  .pr-paytl { position:relative; padding-left:20px; }
  .pr-paytl::before { content:''; position:absolute; left:6px; top:8px; bottom:8px; width:1px; background:#e2e8f0; }
  .pr-paycard { position:relative; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:14px 16px; margin-bottom:12px; transition:.15s; }
  .pr-paycard:hover { border-color:#cbd5e1; background:#fff; }
  .pr-paycard.latest { border-color:#059669; background:#f0fdf4; }
  .pr-paycard::before { content:''; position:absolute; left:-16px; top:16px; width:8px; height:8px; border-radius:50%; background:#059669; border:2px solid #fff; box-shadow:0 0 0 2px rgba(5,150,105,.2); }
  .pr-paycard.old::before { background:#cbd5e1; box-shadow:none; }
  .pr-paytop { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px; gap:8px; flex-wrap:wrap; }
  .pr-paytid { font-family:'JetBrains Mono',monospace; font-size:12px; color:#059669; font-weight:600; }
  .pr-paytime { font-size:11px; color:#94a3b8; }
  .pr-payamt  { font-family:'Syne',sans-serif; font-size:16px; font-weight:800; color:#0f172a; }
  .pr-paygrid { display:grid; grid-template-columns:1fr 1fr; gap:6px; }
  .pr-payfk { font-size:9.5px; text-transform:uppercase; letter-spacing:.07em; color:#94a3b8; font-family:'JetBrains Mono',monospace; margin-bottom:1px; }
  .pr-payfv { font-size:12.5px; color:#334155; }
  .pr-nopay { padding:32px; text-align:center; color:#94a3b8; font-size:13.5px; border:2px dashed #e2e8f0; border-radius:12px; }
  .pr-type-row { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px; }
  .pr-type-btn { padding:8px 16px; border-radius:9px; border:1.5px solid #e2e8f0; font-size:12px; font-weight:600; font-family:'Plus Jakarta Sans',sans-serif; cursor:pointer; transition:.15s; background:#fff; color:#64748b; }
  .pr-type-btn:hover { border-color:#94a3b8; color:#0f172a; }
  .pr-type-btn.on     { background:#0f172a; color:#fff; border-color:#0f172a; }
  .pr-type-btn.on-red { background:#dc2626; color:#fff; border-color:#dc2626; }
  .pr-complaint { background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:14px 16px; margin-bottom:10px; }
  .pr-cs { font-size:10px; font-weight:700; padding:2px 8px; border-radius:20px; border:1px solid; font-family:'JetBrains Mono',monospace; letter-spacing:.08em; text-transform:uppercase; }
  .pr-cs-open     { background:rgba(245,158,11,.1); color:#d97706; border-color:rgba(245,158,11,.3); }
  .pr-cs-review   { background:rgba(99,102,241,.1); color:#6366f1; border-color:rgba(99,102,241,.3); }
  .pr-cs-resolved { background:rgba(5,150,105,.1);  color:#059669; border-color:rgba(5,150,105,.3); }
  .pr-toast { position:fixed; bottom:24px; right:24px; z-index:9999; padding:11px 18px; border-radius:12px; font-size:13px; font-weight:600; background:#0f172a; color:#fff; box-shadow:0 8px 32px rgba(0,0,0,.25); display:flex; align-items:center; gap:8px; animation:prFadeUp .2s ease; border:1px solid rgba(255,255,255,.1); max-width:340px; }
  .pr-toast.ok  { border-color:rgba(5,150,105,.4); }
  .pr-toast.err { border-color:rgba(220,38,38,.4); }
  .pr-spin { animation:prSpin .8s linear infinite; display:inline-block; }
  @media(max-width:640px){ .pr-grid2{grid-template-columns:1fr;} .pr-hero{flex-direction:column;} .pr-tabs{flex-wrap:wrap;} }
`;

const fmt  = d => d ? new Date(d).toLocaleDateString("en-PK",{year:"numeric",month:"short",day:"numeric"}) : "—";
const fmtT = d => d ? new Date(d).toLocaleString("en-PK",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}) : "—";

const TABS = [
  { id:"account",  label:"Account Info", icon:"👤" },
  { id:"seasons",  label:"Seasons",      icon:"📅" },
  { id:"vehicles", label:"Vehicles",     icon:"🚛" },
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
        ? <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#34d399" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
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
  const [showForm, setShowForm] = useState(false);
  const [loading,  setLoading]  = useState(true);
  const [apiErr,   setApiErr]   = useState("");
  const [busy,     setBusy]     = useState("");
  const [editId,   setEditId]   = useState(null);
  const [editForm, setEditForm] = useState({});
  const [form, setForm] = useState({ startDate:"", endDate:"", openingBalance:"" });

  const load = async () => {
    setLoading(true); setApiErr("");
    const { ok, data, error } = await safeFetch(`${API_BASE_URL}/profile/seasons`);
    if (!ok) setApiErr(error);
    else setSeasons(data.seasons || []);
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
    const blocked = seasons.some(s => new Date(s.endDate) >= today);
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
    setBusy(id);
    const { ok, data, error } = await safeFetch(`${API_BASE_URL}/profile/seasons/${id}/activate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (!ok) showToast(error, false);
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
            const hasOngoing = seasons.some(s => new Date(s.endDate) >= today);
            return hasOngoing ? (
              <span style={{fontSize:11.5,color:"#d97706",background:"#fffbeb",border:"1px solid #fde68a",padding:"5px 12px",borderRadius:20,fontWeight:600,fontFamily:"'JetBrains Mono',monospace"}}>
                🔒 Season active until {seasons.filter(s=>new Date(s.endDate)>=today).sort((a,b)=>new Date(b.endDate)-new Date(a.endDate))[0]?.endDate?.split("T")[0]}
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
        <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:10,padding:"10px 14px",marginBottom:16,fontSize:12.5,color:"#166534",lineHeight:1.6}}>
          💡 <strong>How it works:</strong> Adding a season sets the <strong>Cash In Hand</strong> opening balance when you activate it. You must activate a season before recording cashbook entries.
        </div>

        {showForm && (
          <div style={{background:"#f8fafc",border:"1.5px solid #e2e8f0",borderRadius:12,padding:18,marginBottom:18}}>
            <div style={{fontSize:13,fontWeight:700,color:"#0f172a",marginBottom:14,display:"flex",alignItems:"center",gap:7}}>
              <span style={{background:"#f0fdf4",color:"#059669",padding:"2px 9px",borderRadius:20,fontSize:11,fontFamily:"'JetBrains Mono',monospace",border:"1px solid #bbf7d0"}}>
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
                  <div style={{fontSize:11,color:"#059669",marginTop:4}}>
                    When activated, the CASH IN HAND account balance will be set to this amount.
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
                <div style={{fontSize:12.5,fontWeight:700,color:"#059669"}}>Editing {s.name}</div>
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
                    {s.isActive && <span style={{fontSize:10,fontWeight:700,background:"rgba(5,150,105,.12)",color:"#059669",padding:"1px 7px",borderRadius:20,border:"1px solid rgba(5,150,105,.25)",fontFamily:"'JetBrains Mono',monospace",letterSpacing:".1em"}}>ACTIVE</span>}
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
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// TAB: Vehicles & Rates
// ═════════════════════════════════════════════════════════════════════════════
function TabVehicles({ showToast }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [apiErr,   setApiErr]   = useState("");
  const [form,     setForm]     = useState({ vehicleType:"", rate:"" });
  const [editId,   setEditId]   = useState(null);
  const [editForm, setEditForm] = useState({});
  const [busy,     setBusy]     = useState("");

  const load = async () => {
    setLoading(true); setApiErr("");
    const { ok, data, error } = await safeFetch(`${API_BASE_URL}/profile/vehicles`);
    if (!ok) setApiErr(error);
    else setVehicles(data.vehicles || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.vehicleType || form.rate === "") return showToast("Type and rate required", false);
    setBusy("add");
    const { ok, error } = await safeFetch(`${API_BASE_URL}/profile/vehicles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vehicleType: form.vehicleType.trim(), rate: Number(form.rate) }),
    });
    if (!ok) showToast(error, false);
    else { showToast("Vehicle added ✓", true); setForm({ vehicleType:"", rate:"" }); load(); }
    setBusy("");
  };

  const save = async (id) => {
    setBusy(id);
    const { ok, error } = await safeFetch(`${API_BASE_URL}/profile/vehicles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vehicleType: editForm.vehicleType, rate: Number(editForm.rate), isActive: editForm.isActive }),
    });
    if (!ok) showToast(error, false);
    else { showToast("Updated ✓", true); setEditId(null); load(); }
    setBusy("");
  };

  const del = async (id) => {
    if (!window.confirm("Remove this vehicle?")) return;
    const { ok, error } = await safeFetch(`${API_BASE_URL}/profile/vehicles/${id}`, { method: "DELETE" });
    if (!ok) showToast(error, false);
    else { showToast("Removed", true); load(); }
  };

  return (
    <div>
      <div className="pr-card">
        <div className="pr-card-title">Custom Vehicles & Rates</div>
        <p style={{fontSize:12.5,color:"#64748b",marginBottom:18,lineHeight:1.6}}>
          These vehicles appear in the Weight Bridge dropdown. Each mill can define different vehicle types and rates.
        </p>

        <ErrBox msg={apiErr}/>

        <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap",alignItems:"flex-end"}}>
          <div style={{flex:"1 1 180px"}}>
            <label className="pr-label" style={{display:"block",marginBottom:5}}>Vehicle Type</label>
            <input className="pr-input" placeholder="e.g. 20 Wheeler" value={form.vehicleType} onChange={e=>setForm({...form,vehicleType:e.target.value})}/>
          </div>
          <div style={{flex:"0 0 140px"}}>
            <label className="pr-label" style={{display:"block",marginBottom:5}}>Rate (Rs/trip)</label>
            <input className="pr-input mono" type="number" placeholder="0" value={form.rate} onChange={e=>setForm({...form,rate:e.target.value})}/>
          </div>
          <button className="pr-btn pr-btn-green" onClick={add} disabled={busy==="add"}>
            {busy==="add" ? "Adding…" : "+ Add Vehicle"}
          </button>
        </div>

        <div style={{border:"1px solid #e2e8f0",borderRadius:12,overflow:"hidden"}}>
          {loading ? (
            <div className="pr-no-data">Loading vehicles…</div>
          ) : vehicles.length === 0 && !apiErr ? (
            <div className="pr-no-data">No vehicles yet. Add your first vehicle above.</div>
          ) : (
            <table className="pr-vtable">
              <thead>
                <tr><th>Vehicle Type</th><th>Rate (Rs)</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {vehicles.map(v => (
                  <tr key={v._id}>
                    {editId === v._id ? (
                      <>
                        <td><input className="pr-input" style={{padding:"6px 10px"}} value={editForm.vehicleType} onChange={e=>setEditForm({...editForm,vehicleType:e.target.value})}/></td>
                        <td><input className="pr-input mono" style={{padding:"6px 10px",width:100}} type="number" value={editForm.rate} onChange={e=>setEditForm({...editForm,rate:e.target.value})}/></td>
                        <td>
                          <select className="pr-select" style={{padding:"6px 10px",fontSize:12}} value={String(editForm.isActive)} onChange={e=>setEditForm({...editForm,isActive:e.target.value==="true"})}>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                          </select>
                        </td>
                        <td>
                          <div className="pr-td-actions">
                            <button className="pr-btn pr-btn-green pr-btn-sm" onClick={()=>save(v._id)} disabled={busy===v._id}>{busy===v._id?"…":"Save"}</button>
                            <button className="pr-btn pr-btn-outline pr-btn-sm" onClick={()=>setEditId(null)}>Cancel</button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{fontWeight:600}}>{v.vehicleType}</td>
                        <td><span className="pr-td-rate">Rs {(v.rate||0).toLocaleString()}</span></td>
                        <td>
                          <span style={{fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:20,border:"1px solid",fontFamily:"'JetBrains Mono',monospace",
                            background: v.isActive?"rgba(5,150,105,.1)":"rgba(100,116,139,.1)",
                            color:       v.isActive?"#059669":"#64748b",
                            borderColor: v.isActive?"rgba(5,150,105,.3)":"rgba(100,116,139,.2)",
                          }}>
                            {v.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <div className="pr-td-actions">
                            <button className="pr-btn pr-btn-outline pr-btn-sm" onClick={()=>{ setEditId(v._id); setEditForm({vehicleType:v.vehicleType,rate:v.rate,isActive:v.isActive}); }}>Edit</button>
                            <button className="pr-btn pr-btn-danger pr-btn-sm" onClick={()=>del(v._id)}>🗑</button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
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
            <span style={{fontSize:11.5,background:"#fef9c3",color:"#92400e",padding:"4px 12px",borderRadius:20,border:"1px solid #fde68a",fontFamily:"'JetBrains Mono',monospace",fontWeight:600}}>
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
                    {i === 0 && <div style={{fontSize:9.5,fontWeight:700,background:"rgba(5,150,105,.1)",color:"#059669",padding:"2px 8px",borderRadius:20,display:"inline-block",marginBottom:4,fontFamily:"'JetBrains Mono',monospace",letterSpacing:".1em",textTransform:"uppercase"}}>Latest</div>}
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
                      <div className="pr-payfv" style={{fontFamily:k==="Account No"?"'JetBrains Mono',monospace":undefined}}>{v}</div>
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
                  <span style={{fontSize:10.5,background:"rgba(100,116,139,.1)",color:"#64748b",padding:"2px 8px",borderRadius:20,fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",letterSpacing:".08em",fontWeight:600}}>
                    {c.type?.replace("_"," ")}
                  </span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span className={CS_CLASS[c.status] || "pr-cs pr-cs-open"}>{c.status?.replace("_"," ")}</span>
                  <span style={{fontSize:11,color:"#94a3b8",fontFamily:"'JetBrains Mono',monospace"}}>{fmt(c.createdAt)}</span>
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
          <label htmlFor="logo-upload" style={{cursor:"pointer",display:"block",flexShrink:0}}>
            <div className="pr-avatar">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" onError={e => { e.currentTarget.style.display="none"; }}/>
              ) : (
                <svg width={36} height={36} fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4" fill="rgba(255,255,255,0.95)"/>
                  <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" fill="rgba(255,255,255,0.85)" stroke="none"/>
                </svg>
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
              {profile?.approvalStatus === "approved" && <span className="pr-pill pr-pill-green">● Approved</span>}
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
        {tab === "vehicles" && <TabVehicles showToast={showToast}/>}
        {tab === "payments" && <TabPayments/>}
        {tab === "support"  && <TabSupport  showToast={showToast}/>}

      </div>
      {toast && <Toast msg={toast.msg} ok={toast.ok}/>}
    </SidebarLayout>
  );
}