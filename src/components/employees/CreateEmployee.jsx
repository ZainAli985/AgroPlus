import React, { useState, useMemo } from "react";
import SidebarLayout from "../../components/layout/SidebarLayout";
import API_BASE_URL   from "../../../config/API_BASE_URL";
import Notification   from "../../components/Notification";
import { Eye, EyeOff } from "lucide-react";

// ── Theme CSS ─────────────────────────────────────────────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;
const CSS = `
*, *::before, *::after { box-sizing: border-box; }
.ce { font-family: 'DM Sans', sans-serif; color: #111827; max-width: 820px; margin: 0 auto; padding-bottom: 40px; }

/* Section card */
.ce-card { background:#fff; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; margin-bottom:12px; }
.ce-card-hd { display:flex; align-items:center; gap:8px; padding:10px 16px; border-bottom:1px solid #e5e7eb; background:#f9fafb; }
.ce-card-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
.ce-card-title { font-size:10.5px; font-weight:700; color:#374151; text-transform:uppercase; letter-spacing:.08em; }
.ce-card-body { padding:16px; }

/* Form fields */
.ce-lbl { display:block; font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:#6b7280; margin-bottom:4px; font-family:'DM Mono',monospace; }
.ce-lbl em { color:#ef4444; font-style:normal; margin-left:2px; }
.ce-inp, .ce-sel, .ce-textarea {
  width:100%; border:1px solid #d1d5db; border-radius:7px; padding:8px 11px; font-size:13px;
  font-family:'DM Sans',sans-serif; color:#111827; background:#fff; outline:none;
  transition:border-color .12s, box-shadow .12s; appearance:none;
}
.ce-inp::placeholder, .ce-textarea::placeholder { color:#9ca3af; }
.ce-inp:focus, .ce-sel:focus, .ce-textarea:focus { border-color:#6b7280; box-shadow:0 0 0 2px rgba(107,114,128,.12); }
.ce-inp.mono { font-family:'DM Mono',monospace; font-size:12.5px; }
.ce-inp.err  { border-color:#fca5a5; }
.ce-inp.err:focus { box-shadow:0 0 0 2px rgba(239,68,68,.1); }
.ce-textarea { resize:vertical; min-height:80px; }
.ce-err-msg { font-size:11px; color:#ef4444; margin-top:3px; font-weight:500; }
.ce-g2 { display:grid; grid-template-columns:1fr 1fr; gap:13px; }
.ce-fld { display:flex; flex-direction:column; gap:4px; }

/* Role cards */
.ce-role { border:1px solid #e5e7eb; border-radius:7px; padding:10px 12px; cursor:pointer; transition:all .1s; display:flex; align-items:center; gap:9px; background:#f9fafb; }
.ce-role:hover { border-color:#d1d5db; background:#f3f4f6; }
.ce-role.sel { border-color:#d1d5db; background:#f3f4f6; }
.ce-role-radio { width:15px; height:15px; border-radius:50%; border:1.5px solid #d1d5db; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all .1s; }
.ce-role.sel .ce-role-radio { border-color:#111827; background:#111827; }
.ce-role-name { font-size:13px; font-weight:600; color:#111827; line-height:1.2; }
.ce-role-desc { font-size:11px; color:#9ca3af; margin-top:1px; }

/* Route pills */
.ce-route { display:flex; align-items:center; gap:6px; padding:5px 8px; border-radius:6px; cursor:pointer; border:1px solid #e5e7eb; background:#f9fafb; transition:all .1s; user-select:none; }
.ce-route:hover { border-color:#d1d5db; background:#f3f4f6; }
.ce-route.on { border-color:#d1d5db; background:#f3f4f6; }
.ce-route-cb { width:13px; height:13px; border-radius:3px; flex-shrink:0; border:1.5px solid #d1d5db; background:#fff; display:flex; align-items:center; justify-content:center; transition:all .1s; }
.ce-route.on .ce-route-cb { background:#111827; border-color:#111827; }
.ce-route-lbl { font-size:11px; font-weight:500; color:#4b5563; font-family:'DM Mono',monospace; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.ce-route.on .ce-route-lbl { color:#111827; font-weight:600; }

/* Password strength bars */
.ce-bars { display:flex; gap:3px; margin-top:5px; }
.ce-bar  { flex:1; height:3px; border-radius:3px; transition:background .2s; }

/* Document dropzone */
.ce-drop { border:1.5px dashed #d1d5db; border-radius:7px; padding:14px; text-align:center; cursor:pointer; transition:all .12s; background:#f9fafb; position:relative; }
.ce-drop:hover { border-color:#9ca3af; background:#f3f4f6; }
.ce-drop input { position:absolute; inset:0; opacity:0; cursor:pointer; width:100%; height:100%; }
.ce-drop-title { font-size:12.5px; font-weight:600; color:#374151; margin-bottom:2px; }
.ce-drop-sub { font-size:11px; color:#9ca3af; }
.ce-file-item { display:flex; align-items:center; gap:7px; background:#fff; border:1px solid #e5e7eb; border-radius:5px; padding:5px 9px; font-size:12px; color:#374151; margin-top:5px; }
.ce-file-rm { margin-left:auto; background:none; border:none; color:#9ca3af; cursor:pointer; display:flex; align-items:center; transition:color .1s; padding:2px; }
.ce-file-rm:hover { color:#dc2626; }

/* Pic upload */
.ce-pic-wrap { display:flex; align-items:center; gap:14px; }
.ce-pic-circle { width:68px; height:68px; border-radius:50%; border:1px solid #e5e7eb; background:#f3f4f6; overflow:hidden; display:flex; align-items:center; justify-content:center; flex-shrink:0; cursor:pointer; position:relative; }
.ce-pic-circle img { width:100%; height:100%; object-fit:cover; }
.ce-pic-overlay { position:absolute; inset:0; background:rgba(0,0,0,.35); display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity .15s; border-radius:50%; }
.ce-pic-circle:hover .ce-pic-overlay { opacity:1; }

/* Submit */
.ce-submit { width:100%; padding:10px; border-radius:7px; border:none; background:#111827; color:#fff; font-size:13.5px; font-weight:600; font-family:'DM Sans',sans-serif; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:7px; transition:background .12s; }
.ce-submit:hover:not(:disabled) { background:#1f2937; }
.ce-submit:disabled { opacity:.5; cursor:not-allowed; }
@keyframes ce-spin { to { transform:rotate(360deg); } }
.ce-spin { animation:ce-spin .8s linear infinite; display:inline-block; }
@media(max-width:640px) { .ce-g2 { grid-template-columns:1fr; } }
`;

// ── Constants ─────────────────────────────────────────────────────────────────
const ALL_ROUTES = [
  "/dashboard","/create-account","/view-accounts","/ledger",
  "/general-entries","/view-general-entries","/products","/products/new",
  "/add-invoice-purchase","/view-purchase-invoices",
  "/add-invoice-sales","/view-sales-invoices",
  "/trialbalance","/balancesheet","/incomestatement",
  "/cashbook","/cashbook-report",
  "/employees","/employees/new",
  "/weight-bridge","/weight-bridge/invoices",
];

const prettyRoute = r =>
  r.replace(/^\//, "").replace(/[/-]/g, " ").replace(/\b\w/g, c => c.toUpperCase()) || "Dashboard";

const pwdStrength = pwd => {
  if (!pwd) return { score: 0, label: "", color: "#e5e7eb" };
  let s = 0;
  if (pwd.length >= 8)  s++;
  if (/[A-Z]/.test(pwd)) s++;
  if (/[0-9]/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  const map = [
    { score:1, label:"Weak",   color:"#f87171" },
    { score:2, label:"Fair",   color:"#fb923c" },
    { score:3, label:"Good",   color:"#34d399" },
    { score:4, label:"Strong", color:"#15803d" },
  ];
  return map[s - 1] || { score: 0, label: "", color: "#e5e7eb" };
};

const ROLES = [
  { value:"Admin",     label:"Admin",             desc:"Full system access" },
  { value:"Accountant",label:"Accountant",         desc:"Financial & accounting access" },
  { value:"Worker",    label:"Worker",             desc:"Limited operational access" },
  { value:"Standard",  label:"Standard Employee",  desc:"No system access — record only" },
];

// ── FileList component ────────────────────────────────────────────────────────
function FileList({ files, onRemove }) {
  if (!files.length) return null;
  return (
    <div>
      {files.map((f, i) => (
        <div key={i} className="ce-file-item">
          <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span style={{ flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.name}</span>
          <button type="button" className="ce-file-rm" onClick={() => onRemove(i)}>
            <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function CreateEmployee() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", cnic: "", address: "",
    mobile: "", email: "", role: "", password: "", notes: "",
    allowedRoutes: [],
  });
  const [showPwd,    setShowPwd]    = useState(false);
  const [profDocs,   setProfDocs]   = useState([]);  // Professional docs
  const [suppDocs,   setSuppDocs]   = useState([]);  // Supporting docs
  const [picFile,    setPicFile]    = useState(null); // Profile pic
  const [picPreview, setPicPreview] = useState("");
  const [errors,     setErrors]     = useState({});
  const [notifMsg,   setNotifMsg]   = useState("");
  const [notifType,  setNotifType]  = useState("");
  const [loading,    setLoading]    = useState(false);

  const isStandard = form.role === "Standard";
  const strength   = pwdStrength(form.password);

  // Filter routes to only what the mill's package allows
  const millRoutes = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("allowedRoutes")) || []; } catch { return []; }
  }, []);
  const availableRoutes = useMemo(() => {
    if (!millRoutes.length || millRoutes.includes("*")) return ALL_ROUTES;
    return ALL_ROUTES.filter(r => millRoutes.includes(r));
  }, [millRoutes]);

  const setField = (k, v) => { setErrors(p => ({...p, [k]:""})); setForm(p => ({...p, [k]: v})); };

  const handleCnic = e => {
    const d = e.target.value.replace(/\D/g,"").slice(0,13);
    let f = d;
    if (d.length > 5)  f = `${d.slice(0,5)}-${d.slice(5)}`;
    if (d.length > 12) f = `${d.slice(0,5)}-${d.slice(5,12)}-${d.slice(12)}`;
    setField("cnic", f);
  };

  const handlePhone = e => {
    // strip the +923 prefix first, then extract only digits from user input
    const raw     = e.target.value;
    const noPrefix = raw.startsWith("+923") ? raw.slice(4) : raw.replace(/^\+?9?2?3?/,"");
    const digits  = noPrefix.replace(/\D/g,"").slice(0,9);
    setField("mobile", "+923" + digits);
  };

  const toggleRoute = r => setForm(p => ({
    ...p, allowedRoutes: p.allowedRoutes.includes(r)
      ? p.allowedRoutes.filter(x => x !== r)
      : [...p.allowedRoutes, r],
  }));

  const handlePic = e => {
    const f = e.target.files?.[0];
    if (f) { setPicFile(f); setPicPreview(URL.createObjectURL(f)); }
  };

  const validate = () => {
    const e = {};
    if (form.cnic.replace(/\D/g,"").length !== 13) e.cnic = "Must be exactly 13 digits";
    if (form.mobile && !/^\+923\d{9}$/.test(form.mobile)) e.mobile = "+923 + 9 digits required";
    if (!form.role) e.role = "Select a role";
    if (!isStandard && (!form.password || form.password.length < 8)) e.password = "Min 8 characters";
    return e;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const token = localStorage.getItem("token");
    const fd    = new FormData();
    ["firstName","lastName","cnic","address","mobile","email","role","notes"].forEach(k => fd.append(k, form[k]));
    fd.append("isStandard", String(isStandard));
    if (!isStandard) fd.append("password", form.password);
    fd.append("allowedRoutes", JSON.stringify(isStandard ? [] : form.allowedRoutes));

    if (picFile) fd.append("profilePic", picFile);
    profDocs.forEach(f => fd.append("professionalDocs", f));
    suppDocs.forEach(f => fd.append("supportingDocs",   f));

    setLoading(true);
    try {
      const res  = await fetch(`${API_BASE_URL}/employees`, { method:"POST", headers:{ Authorization:`Bearer ${token}` }, body:fd });
      const data = await res.json();
      if (res.ok) {
        setNotifMsg("Employee created successfully");
        setNotifType("success");
        setForm({ firstName:"",lastName:"",cnic:"",address:"",mobile:"",email:"",role:"",password:"",notes:"",allowedRoutes:[] });
        setProfDocs([]); setSuppDocs([]); setPicFile(null); setPicPreview("");
      } else {
        setNotifMsg(data.message || "Failed to create employee");
        setNotifType("error");
      }
    } catch { setNotifMsg("Server error"); setNotifType("error"); }
    finally { setLoading(false); setTimeout(() => setNotifMsg(""), 4000); }
  };

  const Tick = () => (
    <svg width={8} height={8} viewBox="0 0 10 10" fill="none">
      <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification message={notifMsg} type={notifType}/>

      <div className="ce">
        <div style={{ marginBottom:18 }}>
          <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 2px" }}>HR Management</p>
          <h1 style={{ fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px", margin:0 }}>Create Employee</h1>
        </div>

        <form onSubmit={handleSubmit}>

          {/* ── 1. Personal Information ── */}
          <div className="ce-card">
            <div className="ce-card-hd">
              <div className="ce-card-dot" style={{ background:"#3b82f6" }}/>
              <span className="ce-card-title">Personal Information</span>
            </div>
            <div className="ce-card-body">
              <div className="ce-g2" style={{ marginBottom:12 }}>
                <div className="ce-fld">
                  <label className="ce-lbl">First Name <em>*</em></label>
                  <input className="ce-inp" placeholder="Muhammad" value={form.firstName} onChange={e => setField("firstName", e.target.value)} required/>
                </div>
                <div className="ce-fld">
                  <label className="ce-lbl">Last Name <em>*</em></label>
                  <input className="ce-inp" placeholder="Ali" value={form.lastName} onChange={e => setField("lastName", e.target.value)} required/>
                </div>
              </div>
              <div className="ce-g2" style={{ marginBottom:12 }}>
                <div className="ce-fld">
                  <label className="ce-lbl">CNIC <em>*</em></label>
                  <input className={`ce-inp mono${errors.cnic?" err":""}`} placeholder="XXXXX-XXXXXXX-X"
                    value={form.cnic} onChange={handleCnic} required/>
                  {errors.cnic && <span className="ce-err-msg">{errors.cnic}</span>}
                  {!errors.cnic && form.cnic.replace(/\D/g,"").length === 13 && (
                    <span style={{ fontSize:11, color:"#15803d", marginTop:3 }}>✓ Valid</span>
                  )}
                </div>
                <div className="ce-fld">
                  <label className="ce-lbl">Mobile</label>
                  <input className={`ce-inp mono${errors.mobile?" err":""}`} placeholder="+923001234567"
                    value={form.mobile}
                    onFocus={() => { if (!form.mobile) setField("mobile", "+923"); }}
                    onBlur ={() => { if (form.mobile === "+923") setField("mobile", ""); }}
                    onChange={handlePhone} maxLength={13}/>
                  {errors.mobile && <span className="ce-err-msg">{errors.mobile}</span>}
                  {!errors.mobile && /^\+923\d{9}$/.test(form.mobile) && (
                    <span style={{ fontSize:11, color:"#15803d", marginTop:3 }}>✓ Valid</span>
                  )}
                </div>
              </div>
              <div className="ce-g2">
                <div className="ce-fld">
                  <label className="ce-lbl">Email Address <em>*</em></label>
                  <input className="ce-inp" type="email" placeholder="name@example.com"
                    value={form.email} onChange={e => setField("email", e.target.value)} required/>
                </div>
                <div className="ce-fld">
                  <label className="ce-lbl">Home Address</label>
                  <input className="ce-inp" placeholder="Street, City"
                    value={form.address} onChange={e => setField("address", e.target.value)}/>
                </div>
              </div>
            </div>
          </div>

          {/* ── 2. Role & Access Level ── */}
          <div className="ce-card">
            <div className="ce-card-hd">
              <div className="ce-card-dot" style={{ background:"#f59e0b" }}/>
              <span className="ce-card-title">Role & Access Level</span>
            </div>
            <div className="ce-card-body">
              {errors.role && <p style={{ fontSize:11.5, color:"#ef4444", marginBottom:10, fontWeight:500 }}>{errors.role}</p>}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {ROLES.map(r => (
                  <div key={r.value}
                    className={`ce-role${form.role === r.value ? " sel" : ""}`}
                    onClick={() => { setField("role", r.value); if (r.value === "Standard") setForm(p => ({...p, role:r.value, allowedRoutes:[], password:""})); }}>
                    <div className="ce-role-radio">{form.role === r.value && <Tick/>}</div>
                    <div>
                      <div className="ce-role-name">{r.label}</div>
                      <div className="ce-role-desc">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── 3. Documents — three upload zones ── */}
          <div className="ce-card">
            <div className="ce-card-hd">
              <div className="ce-card-dot" style={{ background:"#0ea5e9" }}/>
              <span className="ce-card-title">Documents</span>
            </div>
            <div className="ce-card-body">
              <div className="ce-g2" style={{ marginBottom:14 }}>
                {/* Professional Docs */}
                <div>
                  <label className="ce-lbl">Professional Docs</label>
                  <label>
                    <div className="ce-drop">
                      <input type="file" multiple accept="image/*,.pdf" onChange={e => { setProfDocs(p => [...p, ...Array.from(e.target.files)]); }}/>
                      <div className="ce-drop-title">Upload CV / Certificates</div>
                      <div className="ce-drop-sub">PDF, images — click or drag</div>
                    </div>
                  </label>
                  <FileList files={profDocs} onRemove={i => setProfDocs(p => p.filter((_,j)=>j!==i))}/>
                </div>

                {/* Supporting Docs */}
                <div>
                  <label className="ce-lbl">Supporting Documents</label>
                  <label>
                    <div className="ce-drop">
                      <input type="file" multiple accept="image/*,.pdf" onChange={e => { setSuppDocs(p => [...p, ...Array.from(e.target.files)]); }}/>
                      <div className="ce-drop-title">Upload ID / Other Docs</div>
                      <div className="ce-drop-sub">PDF, images — click or drag</div>
                    </div>
                  </label>
                  <FileList files={suppDocs} onRemove={i => setSuppDocs(p => p.filter((_,j)=>j!==i))}/>
                </div>
              </div>

              {/* Profile Picture */}
              <label className="ce-lbl">Profile Picture</label>
              <div className="ce-pic-wrap">
                <label htmlFor="pic-upload" style={{ cursor:"pointer" }}>
                  <div className="ce-pic-circle">
                    {picPreview
                      ? <img src={picPreview} alt="preview"/>
                      : <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    }
                    <div className="ce-pic-overlay">
                      <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><circle cx="12" cy="13" r="3"/></svg>
                    </div>
                  </div>
                  <input id="pic-upload" type="file" accept="image/*" style={{ display:"none" }} onChange={handlePic}/>
                </label>
                <div>
                  <div style={{ fontSize:12.5, fontWeight:600, color:"#374151", marginBottom:3 }}>
                    {picPreview ? (picFile?.name || "Photo selected") : "No photo selected"}
                  </div>
                  <div style={{ fontSize:11.5, color:"#9ca3af" }}>Click avatar to upload. Square image recommended.</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 4. Login Credentials (hidden for Standard) ── */}
          {!isStandard && (
            <div className="ce-card">
              <div className="ce-card-hd">
                <div className="ce-card-dot" style={{ background:"#10b981" }}/>
                <span className="ce-card-title">Login Credentials</span>
              </div>
              <div className="ce-card-body">
                <div style={{ maxWidth:400 }}>
                  <div className="ce-fld">
                    <label className="ce-lbl">Password <em>*</em></label>
                    <div style={{ position:"relative" }}>
                      <input
                        className={`ce-inp${errors.password?" err":""}`}
                        type={showPwd ? "text" : "password"}
                        placeholder="Min 8 characters"
                        style={{ paddingRight:40 }}
                        value={form.password}
                        onChange={e => setField("password", e.target.value)}
                        required/>
                      <button type="button" onClick={() => setShowPwd(s => !s)}
                        style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#9ca3af", display:"flex", alignItems:"center" }}>
                        {showPwd ? <EyeOff size={15}/> : <Eye size={15}/>}
                      </button>
                    </div>
                    {errors.password && <span className="ce-err-msg">{errors.password}</span>}
                    {form.password && (
                      <>
                        <div className="ce-bars">
                          {[1,2,3,4].map(i => (
                            <div key={i} className="ce-bar" style={{ background: i <= strength.score ? strength.color : "#f3f4f6" }}/>
                          ))}
                        </div>
                        <span style={{ fontSize:10.5, marginTop:3, fontWeight:600, color:strength.color }}>{strength.label}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── 5. Page Permissions (hidden for Standard) ── */}
          {!isStandard && availableRoutes.length > 0 && (
            <div className="ce-card">
              <div className="ce-card-hd">
                <div className="ce-card-dot" style={{ background:"#8b5cf6" }}/>
                <span className="ce-card-title">Page Permissions</span>
                <span style={{ marginLeft:"auto", fontFamily:"'DM Mono',monospace", fontSize:10.5, fontWeight:700, color:"#374151", background:"#f3f4f6", border:"1px solid #e5e7eb", borderRadius:4, padding:"1px 7px" }}>
                  {form.allowedRoutes.length} / {availableRoutes.length}
                </span>
              </div>
              <div className="ce-card-body">
                <div style={{ display:"flex", gap:7, marginBottom:10 }}>
                  <button type="button" onClick={() => setForm(p => ({...p, allowedRoutes:[...availableRoutes]}))}
                    style={{ fontSize:11.5, padding:"4px 10px", borderRadius:5, border:"1px solid #e5e7eb", background:"#fff", color:"#374151", fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}>
                    Select All
                  </button>
                  <button type="button" onClick={() => setForm(p => ({...p, allowedRoutes:[]}))}
                    style={{ fontSize:11.5, padding:"4px 10px", borderRadius:5, border:"1px solid #e5e7eb", background:"#fff", color:"#374151", fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}>
                    Clear All
                  </button>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:5 }}>
                  {availableRoutes.map(route => {
                    const active = form.allowedRoutes.includes(route);
                    return (
                      <div key={route} className={`ce-route${active?" on":""}`} onClick={() => toggleRoute(route)}>
                        <div className="ce-route-cb">{active && <Tick/>}</div>
                        <span className="ce-route-lbl">{prettyRoute(route)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── 6. Notes (only for Standard Employee) ── */}
          {isStandard && (
            <div className="ce-card">
              <div className="ce-card-hd">
                <div className="ce-card-dot" style={{ background:"#6b7280" }}/>
                <span className="ce-card-title">Employee Notes</span>
              </div>
              <div className="ce-card-body">
                <div className="ce-fld">
                  <label className="ce-lbl">Notes</label>
                  <textarea className="ce-textarea"
                    placeholder="e.g. Chef · works kitchen shift · hired Mar 2025"
                    value={form.notes}
                    onChange={e => setField("notes", e.target.value)}
                    rows={4}/>
                  <span style={{ fontSize:11, color:"#9ca3af", marginTop:3 }}>
                    For internal reference only. This employee has no system login.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <div style={{ marginTop:4 }}>
            <button type="submit" className="ce-submit" disabled={loading}>
              {loading
                ? <><span className="ce-spin"><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg></span> Creating…</>
                : <><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg> Create Employee</>
              }
            </button>
          </div>

        </form>
      </div>
    </SidebarLayout>
  );
}