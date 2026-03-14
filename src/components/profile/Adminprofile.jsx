// AdminProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL  from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');`;

const CSS = `
  @keyframes prFadeUp { from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none} }
  @keyframes prSpin   { to{transform:rotate(360deg)} }
  .pr { font-family:'Plus Jakarta Sans',sans-serif; color:#1e293b; }
  .pr-hero { background:linear-gradient(135deg,#0f172a 0%,#1e293b 55%,#0f2012 100%); border-radius:20px; padding:26px 30px; margin-bottom:22px; display:flex; align-items:center; gap:22px; position:relative; overflow:hidden; border:1px solid rgba(255,255,255,.07); }
  .pr-hero::before { content:''; position:absolute; right:-80px; top:-80px; width:240px; height:240px; border-radius:50%; background:radial-gradient(circle,rgba(16,185,129,.15) 0%,transparent 70%); pointer-events:none; }
  .pr-avatar { width:68px; height:68px; border-radius:16px; flex-shrink:0; background:linear-gradient(135deg,#059669,#34d399); display:flex; align-items:center; justify-content:center; border:2px solid rgba(255,255,255,.15); box-shadow:0 6px 20px rgba(16,185,129,.3); overflow:hidden; position:relative; }
  .pr-avatar img { width:100%; height:100%; object-fit:cover; display:block; position:absolute; inset:0; }
  .pr-hero-info { flex:1; min-width:0; position:relative; z-index:1; }
  .pr-hero-name { font-family:'Syne',sans-serif; font-size:20px; font-weight:800; color:#fff; margin-bottom:2px; }
  .pr-hero-biz  { font-size:12.5px; color:rgba(255,255,255,.5); margin-bottom:8px; }
  .pr-hero-pills { display:flex; gap:7px; flex-wrap:wrap; }
  .pr-pill { font-family:'JetBrains Mono',monospace; font-size:10px; font-weight:600; padding:3px 9px; border-radius:20px; border:1px solid; }
  .pr-pill-green { background:rgba(16,185,129,.15); color:#34d399; border-color:rgba(16,185,129,.3); }
  .pr-pill-blue  { background:rgba(99,102,241,.15);  color:#a5b4fc; border-color:rgba(99,102,241,.3); }
  .pr-pill-amber { background:rgba(245,158,11,.15);  color:#fbbf24; border-color:rgba(245,158,11,.3); }
  .pr-hero-billing { font-size:11px; color:rgba(255,255,255,.3); margin-top:6px; font-family:'JetBrains Mono',monospace; }
  .pr-tabs { display:flex; gap:3px; background:#f1f5f9; border-radius:13px; padding:4px; margin-bottom:22px; flex-wrap:wrap; }
  .pr-tab { flex:1; min-width:90px; padding:9px 12px; border-radius:9px; border:none; background:transparent; font-size:12px; font-weight:600; cursor:pointer; color:#64748b; font-family:'Plus Jakarta Sans',sans-serif; transition:.15s; display:flex; align-items:center; justify-content:center; gap:5px; white-space:nowrap; }
  .pr-tab:hover { background:rgba(255,255,255,.8); color:#0f172a; }
  .pr-tab.on    { background:#fff; color:#0f172a; box-shadow:0 1px 4px rgba(0,0,0,.1); }
  .pr-card { background:#fff; border:1px solid #e2e8f0; border-radius:16px; padding:22px; margin-bottom:16px; animation:prFadeUp .22s ease; }
  .pr-card-title { font-family:'Syne',sans-serif; font-size:14.5px; font-weight:700; color:#0f172a; margin-bottom:16px; display:flex; align-items:center; gap:8px; }
  .pr-card-title::before { content:''; width:3px; height:15px; background:#059669; border-radius:2px; flex-shrink:0; }
  .pr-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .pr-field  { display:flex; flex-direction:column; gap:5px; }
  .pr-label  { font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; color:#64748b; }
  .pr-input  { padding:10px 13px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:13.5px; color:#0f172a; font-family:'Plus Jakarta Sans',sans-serif; outline:none; transition:.15s; background:#fafafa; }
  .pr-input:focus  { border-color:#059669; background:#fff; box-shadow:0 0 0 3px rgba(5,150,105,.08); }
  .pr-input:disabled { background:#f1f5f9; color:#94a3b8; cursor:not-allowed; }
  .pr-input.mono   { font-family:'JetBrains Mono',monospace; font-size:12.5px; }
  .pr-select { padding:10px 13px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:13.5px; color:#0f172a; font-family:'Plus Jakarta Sans',sans-serif; outline:none; transition:.15s; background:#fafafa; cursor:pointer; }
  .pr-select:focus { border-color:#059669; }
  .pr-textarea { width:100%; padding:10px 13px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:13.5px; color:#0f172a; font-family:'Plus Jakarta Sans',sans-serif; outline:none; transition:.15s; resize:vertical; min-height:90px; }
  .pr-textarea:focus { border-color:#059669; box-shadow:0 0 0 3px rgba(5,150,105,.08); }
  .pr-btn { padding:10px 20px; border-radius:10px; border:none; font-size:13px; font-weight:700; font-family:'Plus Jakarta Sans',sans-serif; cursor:pointer; transition:.15s; display:inline-flex; align-items:center; gap:6px; }
  .pr-btn-primary { background:#0f172a; color:#fff; }
  .pr-btn-primary:hover { background:#1e293b; }
  .pr-btn-primary:disabled { background:#cbd5e1; cursor:not-allowed; }
  .pr-btn-green  { background:#059669; color:#fff; }
  .pr-btn-green:hover  { background:#047857; }
  .pr-btn-green:disabled { background:#a7f3d0; cursor:not-allowed; }
  .pr-btn-outline { background:#fff; border:1.5px solid #e2e8f0; color:#475569; }
  .pr-btn-outline:hover { border-color:#94a3b8; color:#0f172a; }
  .pr-btn-danger  { background:#fef2f2; border:1.5px solid #fca5a5; color:#dc2626; }
  .pr-btn-danger:hover  { background:#dc2626; color:#fff; border-color:#dc2626; }
  .pr-btn-sm { padding:6px 13px; font-size:11.5px; }
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
  .pr-season { background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:12px; padding:14px 16px; margin-bottom:10px; display:flex; align-items:center; gap:12px; transition:.15s; }
  .pr-season:hover { border-color:#cbd5e1; }
  .pr-season.active { border-color:#059669; background:#f0fdf4; }
  .pr-season-dot { width:9px; height:9px; border-radius:50%; background:#cbd5e1; flex-shrink:0; }
  .pr-season-dot.active { background:#059669; box-shadow:0 0 0 3px rgba(5,150,105,.2); }
  .pr-season-name { font-family:'Syne',sans-serif; font-size:14px; font-weight:700; color:#0f172a; }
  .pr-season-dates { font-size:11px; color:#64748b; font-family:'JetBrains Mono',monospace; }
  .pr-season-bal { font-family:'JetBrains Mono',monospace; font-size:13px; color:#059669; font-weight:600; margin-left:auto; white-space:nowrap; }
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
function TabSeasons({ accounts, showToast }) {
  const [seasons,  setSeasons]  = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading,  setLoading]  = useState(true);
  const [apiErr,   setApiErr]   = useState("");
  const [busy,     setBusy]     = useState("");
  const [form, setForm] = useState({
    name:"", startDate:"", endDate:"", openingBalance:"",
    cashAccountId:"", openingBalanceAccountId:"",
  });

  const load = async () => {
    setLoading(true); setApiErr("");
    const { ok, data, error } = await safeFetch(`${API_BASE_URL}/profile/seasons`);
    if (!ok) setApiErr(error);
    else setSeasons(data.seasons || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.name || !form.startDate || !form.endDate) return showToast("Name and dates are required", false);
    setBusy("add");
    const { ok, error } = await safeFetch(`${API_BASE_URL}/profile/seasons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!ok) showToast(error, false);
    else {
      showToast("Season added ✓", true);
      setForm({ name:"", startDate:"", endDate:"", openingBalance:"", cashAccountId:"", openingBalanceAccountId:"" });
      setShowForm(false);
      load();
    }
    setBusy("");
  };

  const activate = async (id) => {
    setBusy(id);
    const s = seasons.find(x => x._id === id);
    const { ok, data, error } = await safeFetch(`${API_BASE_URL}/profile/seasons/${id}/activate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cashAccountId: s?.cashAccountId || "",
        openingBalanceAccountId: s?.openingBalanceAccountId || "",
      }),
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

  const cashAccounts   = accounts.filter(a => a.accountType === "Assets");
  const equityAccounts = accounts.filter(a => ["Equity","Liabilities"].includes(a.accountType));

  return (
    <div>
      <div className="pr-card">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <div className="pr-card-title" style={{margin:0}}>Mill Seasons</div>
          <button className="pr-btn pr-btn-green pr-btn-sm" onClick={()=>setShowForm(f=>!f)}>
            {showForm ? "✕ Cancel" : "+ Add Season"}
          </button>
        </div>

        <ErrBox msg={apiErr}/>

        {showForm && (
          <div style={{background:"#f8fafc",border:"1.5px solid #e2e8f0",borderRadius:12,padding:18,marginBottom:18}}>
            <div style={{fontSize:12.5,fontWeight:700,color:"#0f172a",marginBottom:14,fontFamily:"'Syne',sans-serif"}}>New Season</div>
            <div className="pr-grid2" style={{gap:12}}>
              <Field label="Season Name">
                <input className="pr-input" placeholder="e.g. Kharif 2025" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
              </Field>
              <Field label="Opening Balance (Rs)">
                <input className="pr-input mono" type="number" placeholder="0" value={form.openingBalance} onChange={e=>setForm({...form,openingBalance:e.target.value})}/>
              </Field>
              <Field label="Start Date">
                <input className="pr-input" type="date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})}/>
              </Field>
              <Field label="End Date">
                <input className="pr-input" type="date" value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})}/>
              </Field>
              <Field label="Cash Account (for OB entry)">
                <select className="pr-select" value={form.cashAccountId} onChange={e=>setForm({...form,cashAccountId:e.target.value})}>
                  <option value="">Select cash account…</option>
                  {cashAccounts.map(a=><option key={a._id} value={a._id}>{a.accountName}</option>)}
                </select>
              </Field>
              <Field label="Opening Balance Account">
                <select className="pr-select" value={form.openingBalanceAccountId} onChange={e=>setForm({...form,openingBalanceAccountId:e.target.value})}>
                  <option value="">Select account…</option>
                  {equityAccounts.map(a=><option key={a._id} value={a._id}>{a.accountName}</option>)}
                </select>
              </Field>
            </div>
            <div style={{marginTop:14}}>
              <button className="pr-btn pr-btn-primary" onClick={add} disabled={busy==="add"}>
                {busy==="add" ? "Adding…" : "Add Season"}
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="pr-no-data">Loading seasons…</div>
        ) : seasons.length === 0 && !apiErr ? (
          <div className="pr-no-data">No seasons yet. Add your first season above.</div>
        ) : seasons.map(s => (
          <div key={s._id} className={`pr-season${s.isActive ? " active" : ""}`}>
            <div className={`pr-season-dot${s.isActive ? " active" : ""}`}/>
            <div style={{flex:1,minWidth:0}}>
              <div className="pr-season-name">{s.name}</div>
              <div className="pr-season-dates">{fmt(s.startDate)} → {fmt(s.endDate)}</div>
              {s.isActive && <div style={{fontSize:10.5,color:"#059669",fontWeight:700,marginTop:2}}>● ACTIVE SEASON</div>}
            </div>
            <div className="pr-season-bal">Rs {(s.openingBalance||0).toLocaleString()}</div>
            <div className="pr-season-actions">
              {!s.isActive && (
                <button className="pr-btn pr-btn-green pr-btn-sm" onClick={()=>activate(s._id)} disabled={busy===s._id}>
                  {busy===s._id ? "…" : "Activate"}
                </button>
              )}
              <button className="pr-btn pr-btn-danger pr-btn-sm" onClick={()=>del(s._id)}>🗑</button>
            </div>
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
  const [tab,      setTab]     = useState("account");
  const [profile,  setProfile] = useState(null);
  const [accounts, setAccounts]= useState([]);
  const [toast,    setToast]   = useState(null);

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

  const logoUrl = localStorage.getItem("logoUrl");
  const daysLeft = profile?.billingDate
    ? Math.ceil((new Date(profile.billingDate) - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <div className="pr" style={{maxWidth:820,margin:"0 auto",padding:"4px 0 40px"}}>

        {/* Hero */}
        <div className="pr-hero">
          <div className="pr-avatar">
            {/* Person icon always shown as base */}
            <svg width={36} height={36} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="4" fill="rgba(255,255,255,0.95)"/>
              <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" fill="rgba(255,255,255,0.85)" stroke="none"/>
            </svg>
            {/* If mill has a logo, overlay it */}
            {logoUrl && <img src={logoUrl} alt="" onError={e => { e.target.style.display="none"; }}/>}
          </div>
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
        {tab === "seasons"  && <TabSeasons  accounts={accounts} showToast={showToast}/>}
        {tab === "vehicles" && <TabVehicles showToast={showToast}/>}
        {tab === "payments" && <TabPayments/>}
        {tab === "support"  && <TabSupport  showToast={showToast}/>}

      </div>
      {toast && <Toast msg={toast.msg} ok={toast.ok}/>}
    </SidebarLayout>
  );
}