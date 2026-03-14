import React, { useState } from "react";
import SidebarLayout from "../../components/layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import Notification from "../../components/Notification";
import { Eye, EyeOff } from "lucide-react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .ce-wrap { font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; max-width: 860px; margin: 0 auto; }
  .ce-label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: #9ca3af; margin-bottom: 6px; }
  .ce-input, .ce-select { width: 100%; border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 10px 13px; font-size: 14px; font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; background: #fff; outline: none; transition: border-color .15s, box-shadow .15s; appearance: none; }
  .ce-input::placeholder { color: #c4c4c4; }
  .ce-input:focus, .ce-select:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.12); }
  .ce-input.mono { font-family: 'JetBrains Mono', monospace; font-size: 13px; }
  .ce-input-err { border-color: #f87171 !important; box-shadow: 0 0 0 3px rgba(248,113,113,.1) !important; }
  .ce-select-wrap { position: relative; }
  .ce-select-wrap::after { content: ''; position: absolute; right: 13px; top: 50%; transform: translateY(-50%); pointer-events: none; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 5px solid #9ca3af; }
  .ce-section { background: #fff; border: 1.5px solid #f3f4f6; border-radius: 16px; overflow: hidden; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,.04); }
  .ce-section-head { display: flex; align-items: center; gap: 10px; padding: 14px 20px; border-bottom: 1.5px solid #f3f4f6; background: #fafafa; }
  .ce-section-icon { width: 32px; height: 32px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .ce-section-title { font-size: 13px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: .06em; }
  .ce-section-body { padding: 20px; }
  .ce-route-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; max-height: 260px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #e5e7eb transparent; }
  .ce-route-pill { display: flex; align-items: center; gap: 8px; padding: 8px 11px; border-radius: 9px; cursor: pointer; border: 1.5px solid #f3f4f6; background: #fafafa; transition: all .12s; user-select: none; }
  .ce-route-pill:hover { border-color: #e0e7ff; background: #eef2ff; }
  .ce-route-pill.active { border-color: #c7d2fe; background: #eef2ff; color: #4338ca; }
  .ce-route-check { width: 16px; height: 16px; border-radius: 5px; flex-shrink: 0; border: 1.5px solid #d1d5db; background: #fff; display: flex; align-items: center; justify-content: center; transition: all .12s; }
  .ce-route-pill.active .ce-route-check { background: #6366f1; border-color: #6366f1; }
  .ce-route-label { font-size: 12px; font-weight: 500; color: #4b5563; font-family: 'JetBrains Mono', monospace; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ce-route-pill.active .ce-route-label { color: #4338ca; font-weight: 600; }
  .ce-route-actions { display: flex; gap: 8px; margin-bottom: 12px; }
  .ce-route-action-btn { font-size: 11.5px; font-weight: 600; padding: 5px 12px; border-radius: 7px; border: 1.5px solid #e5e7eb; background: #fff; color: #6b7280; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; transition: all .12s; }
  .ce-route-action-btn:hover { border-color: #c7d2fe; color: #4338ca; background: #eef2ff; }
  .ce-dropzone { border: 2px dashed #e5e7eb; border-radius: 12px; padding: 24px; text-align: center; cursor: pointer; transition: border-color .15s, background .15s; background: #fafafa; position: relative; }
  .ce-dropzone:hover { border-color: #a5b4fc; background: #f5f3ff; }
  .ce-dropzone input[type=file] { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; }
  .ce-doc-preview { width: 60px; height: 60px; border-radius: 9px; border: 1.5px solid #e5e7eb; overflow: hidden; flex-shrink: 0; position: relative; background: #f3f4f6; }
  .ce-submit { width: 100%; padding: 13px; border-radius: 12px; border: none; background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%); color: #fff; font-size: 15px; font-weight: 700; font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer; transition: opacity .15s, box-shadow .15s, transform .15s; box-shadow: 0 4px 14px rgba(99,102,241,.35); letter-spacing: .01em; display: flex; align-items: center; justify-content: center; gap: 8px; }
  .ce-submit:hover { opacity: .93; box-shadow: 0 6px 20px rgba(99,102,241,.45); transform: translateY(-1px); }
  .ce-submit:active { transform: translateY(0); }
  .ce-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }
  @keyframes ce-spin { to { transform: rotate(360deg); } }
  .ce-spin { animation: ce-spin .8s linear infinite; display: inline-block; }
  .ce-role-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .ce-role-card { border: 1.5px solid #f3f4f6; border-radius: 12px; padding: 14px 16px; cursor: pointer; transition: all .15s; display: flex; align-items: center; gap: 12px; background: #fafafa; }
  .ce-role-card:hover { border-color: #c7d2fe; background: #eef2ff; }
  .ce-role-card.selected { border-color: #6366f1; background: #eef2ff; box-shadow: 0 0 0 3px rgba(99,102,241,.12); }
  .ce-role-dot { width: 20px; height: 20px; border-radius: 50%; border: 2px solid #d1d5db; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all .15s; }
  .ce-role-card.selected .ce-role-dot { border-color: #6366f1; background: #6366f1; }
  .ce-role-name { font-size: 14px; font-weight: 700; color: #374151; }
  .ce-role-desc { font-size: 12px; color: #9ca3af; margin-top: 1px; }
  .ce-role-card.selected .ce-role-name { color: #4338ca; }
  .ce-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .ce-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  @media (max-width: 640px) { .ce-grid-2, .ce-grid-3 { grid-template-columns: 1fr; } .ce-route-grid { grid-template-columns: 1fr 1fr; } .ce-role-grid { grid-template-columns: 1fr; } }
  .ce-badge { display: inline-flex; align-items: center; justify-content: center; min-width: 20px; height: 20px; padding: 0 6px; border-radius: 10px; font-size: 11px; font-weight: 700; background: #6366f1; color: #fff; }
  .ce-routes-preview { margin-top: 14px; padding: 10px 14px; border-radius: 10px; background: #f0fdf4; border: 1.5px solid #bbf7d0; font-size: 12px; color: #166534; font-family: 'JetBrains Mono', monospace; line-height: 1.7; word-break: break-all; }
`;

const prettyRoute = (r) =>
  r.replace(/^\//, "").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) || "Dashboard";

const pwdStrength = (pwd) => {
  if (!pwd) return { score: 0, label: "", color: "#e5e7eb" };
  let s = 0;
  if (pwd.length >= 8)           s++;
  if (/[A-Z]/.test(pwd))        s++;
  if (/[0-9]/.test(pwd))        s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  const map = [
    { score:1, label:"Weak",   color:"#f87171" },
    { score:2, label:"Fair",   color:"#fb923c" },
    { score:3, label:"Good",   color:"#34d399" },
    { score:4, label:"Strong", color:"#10b981" },
  ];
  return map[s - 1] || { score:0, label:"", color:"#e5e7eb" };
};

function Section({ icon, iconBg, title, badge, children }) {
  return (
    <div className="ce-section">
      <div className="ce-section-head">
        <div className="ce-section-icon" style={{ background: iconBg }}>{icon}</div>
        <span className="ce-section-title">{title}</span>
        {badge != null && <span className="ce-badge" style={{ marginLeft:"auto" }}>{badge}</span>}
      </div>
      <div className="ce-section-body">{children}</div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      {label && <label className="ce-label">{label}</label>}
      {children}
      {error && <p style={{ fontSize:11.5, color:"#ef4444", marginTop:4, fontWeight:500 }}>{error}</p>}
    </div>
  );
}

export default function CreateEmployee() {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", cnic: "", address: "",
    mobile: "+92", email: "", role: "", username: "", password: "",
    allowedRoutes: [],
  });

  const [documents,        setDocuments]        = useState([]);
  const [documentPreviews, setDocumentPreviews] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType,    setNotificationType]    = useState("");
  const [showPassword,     setShowPassword]     = useState(false);
  const [errors,           setErrors]           = useState({});
  const [loading,          setLoading]          = useState(false);

  // All grantable routes
  const ALL_ROUTES = [
    "/dashboard", "/create-account", "/view-accounts", "/ledger",
    "/general-entries", "/view-general-entries", "/products", "/products/new",
    "/add-invoice-purchase", "/view-purchase-invoices",
    "/add-invoice-sales", "/view-sales-invoices",
    "/trialbalance", "/balancesheet", "/incomestatement",
    "/cashbook", "/cashbook-report",
    "/employees", "/employees/new",
    "/weight-bridge", "/weight-bridge/invoices",
  ];

  // Only show routes that the mill's own plan allows
  // (e.g. BASIC plan can't grant employees/weight-bridge to employees)
  const millAllowedRoutes = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem("allowedRoutes")) || []; }
    catch { return []; }
  }, []);

  const routesList = React.useMemo(() => {
    if (!millAllowedRoutes.length || millAllowedRoutes.includes("*")) return ALL_ROUTES;
    return ALL_ROUTES.filter(r => millAllowedRoutes.includes(r));
  }, [millAllowedRoutes]);

  const roles = [
    { value:"Accountant", label:"Accountant", desc:"Full financial access" },
    { value:"Worker",     label:"Worker",     desc:"Limited operational access" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: "" }));
    if (name === "cnic") {
      const digits = value.replace(/\D/g, "").slice(0, 13);
      let f = digits;
      if (digits.length > 5)  f = `${digits.slice(0,5)}-${digits.slice(5)}`;
      if (digits.length > 12) f = `${digits.slice(0,5)}-${digits.slice(5,12)}-${digits.slice(12)}`;
      setFormData(p => ({ ...p, cnic: f }));
      return;
    }
    if (name === "mobile") {
      let digits = value.replace(/\D/g, "");
      if (digits.startsWith("92")) digits = digits.slice(2);
      if (digits.length > 10) digits = digits.slice(0, 10);
      setFormData(p => ({ ...p, mobile: `+92${digits}` }));
      return;
    }
    setFormData(p => ({ ...p, [name]: value }));
  };

  const handleRouteToggle = (route) => {
    setFormData(p => ({
      ...p,
      allowedRoutes: p.allowedRoutes.includes(route)
        ? p.allowedRoutes.filter(r => r !== route)
        : [...p.allowedRoutes, route],
    }));
  };

  const selectAllRoutes = () => setFormData(p => ({ ...p, allowedRoutes: [...routesList] }));
  const clearAllRoutes  = () => setFormData(p => ({ ...p, allowedRoutes: [] }));

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setDocuments(files);
    setDocumentPreviews(files.map(f => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    const cnicDigits = formData.cnic.replace(/\D/g, "");
    if (cnicDigits.length !== 13) newErrors.cnic = "Must be exactly 13 digits";

    const mobileDigits = formData.mobile.replace(/\D/g, "").slice(2);
    if (mobileDigits.length !== 10) newErrors.mobile = "Must be 10 digits after +92";

    if (!formData.role) newErrors.role = "Please select a role";

    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    const token = localStorage.getItem("token");
    const data  = new FormData();

    // ── Scalar fields ──
    ["firstName","lastName","cnic","address","mobile","email","role","username","password"]
      .forEach(key => data.append(key, formData[key]));

    // ── allowedRoutes: send as JSON string (for controllers that JSON.parse it)
    //    AND as repeated allowedRoutes[] entries (for multer array handling) ──
    data.append("allowedRoutes", JSON.stringify(formData.allowedRoutes));
    formData.allowedRoutes.forEach(route => data.append("allowedRoutes[]", route));

    // ── Documents ──
    documents.forEach(f => data.append("documents", f));

    setLoading(true);
    try {
      const res    = await fetch(`${API_BASE_URL}/employees`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      const result = await res.json();

      if (res.ok) {
        setNotificationMessage(`Employee created — ${formData.allowedRoutes.length} route(s) assigned`);
        setNotificationType("success");
        setFormData({ firstName:"", lastName:"", cnic:"", address:"", mobile:"+92",
          email:"", role:"", username:"", password:"", allowedRoutes:[] });
        setDocuments([]); setDocumentPreviews([]);
      } else {
        setNotificationMessage(result.message || "Failed to create employee");
        setNotificationType("error");
      }
    } catch {
      setNotificationMessage("Server error — please try again");
      setNotificationType("error");
    } finally {
      setLoading(false);
      setTimeout(() => setNotificationMessage(""), 4000);
    }
  };

  const strength = pwdStrength(formData.password);

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification message={notificationMessage} type={notificationType} />

      <div className="ce-wrap">
        <div style={{ marginBottom:24 }}>
          <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:"#9ca3af", marginBottom:4 }}>HR Management</p>
          <h1 style={{ fontSize:26, fontWeight:800, color:"#111827", letterSpacing:"-.5px", lineHeight:1 }}>Create New Employee</h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:0 }}>

          {/* 1. Personal Info */}
          <Section
            icon={<svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>}
            iconBg="#eef2ff" title="Personal Information"
          >
            <div className="ce-grid-2" style={{ marginBottom:16 }}>
              <Field label="First Name"><input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="e.g. Muhammad" className="ce-input" required /></Field>
              <Field label="Last Name"><input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="e.g. Ali" className="ce-input" required /></Field>
            </div>
            <div className="ce-grid-2" style={{ marginBottom:16 }}>
              <Field label="CNIC" error={errors.cnic}>
                <input name="cnic" value={formData.cnic} onChange={handleChange} placeholder="xxxxx-xxxxxxx-x" className={`ce-input mono${errors.cnic ? " ce-input-err" : ""}`} required />
              </Field>
              <Field label="Mobile" error={errors.mobile}>
                <input name="mobile" value={formData.mobile} onChange={handleChange} className={`ce-input mono${errors.mobile ? " ce-input-err" : ""}`} required />
              </Field>
            </div>
            <div className="ce-grid-2">
              <Field label="Email Address"><input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" className="ce-input" required /></Field>
              <Field label="Home Address"><input name="address" value={formData.address} onChange={handleChange} placeholder="Street, City" className="ce-input" /></Field>
            </div>
          </Section>

          {/* 2. Role */}
          <Section
            icon={<svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#f59e0b" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>}
            iconBg="#fffbeb" title="Role & Access Level"
          >
            {errors.role && <p style={{ fontSize:11.5, color:"#ef4444", marginBottom:10, fontWeight:500 }}>{errors.role}</p>}
            <div className="ce-role-grid">
              {roles.map(r => (
                <div key={r.value} className={`ce-role-card${formData.role === r.value ? " selected" : ""}`}
                  onClick={() => { setFormData(p => ({ ...p, role:r.value })); setErrors(p => ({ ...p, role:"" })); }}>
                  <div className="ce-role-dot">
                    {formData.role === r.value && (
                      <svg width={10} height={10} viewBox="0 0 10 10" fill="#fff">
                        <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="ce-role-name">{r.label}</div>
                    <div className="ce-role-desc">{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* 3. Credentials */}
          <Section
            icon={<svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>}
            iconBg="#ecfdf5" title="Login Credentials"
          >
            <div className="ce-grid-2">
              <Field label="Username">
                <input name="username" value={formData.username} onChange={handleChange} placeholder="e.g. m.ali" className="ce-input mono" required />
              </Field>
              <Field label="Password">
                <div style={{ position:"relative" }}>
                  <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange}
                    placeholder="Min. 8 characters" className="ce-input" style={{ paddingRight:44 }} required />
                  <button type="button" onClick={() => setShowPassword(s => !s)}
                    style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#9ca3af", display:"flex", alignItems:"center", transition:"color .15s" }}
                    onMouseEnter={e => e.currentTarget.style.color="#6366f1"}
                    onMouseLeave={e => e.currentTarget.style.color="#9ca3af"}>
                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
                {formData.password && (
                  <div>
                    <div style={{ display:"flex", gap:4, marginTop:7 }}>
                      {[1,2,3,4].map(i => (
                        <div key={i} style={{ flex:1, height:3, borderRadius:3, background: i <= strength.score ? strength.color : "#f3f4f6", transition:"background .3s" }}/>
                      ))}
                    </div>
                    <p style={{ fontSize:11, marginTop:4, fontWeight:600, color: strength.color }}>{strength.label}</p>
                  </div>
                )}
              </Field>
            </div>
          </Section>

          {/* 4. Routes */}
          <Section
            icon={<svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#8b5cf6" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}
            iconBg="#f5f3ff" title="Page Permissions" badge={formData.allowedRoutes.length}
          >
            <div className="ce-route-actions">
              <button type="button" className="ce-route-action-btn" onClick={selectAllRoutes}>Select All</button>
              <button type="button" className="ce-route-action-btn" onClick={clearAllRoutes}>Clear All</button>
              <span style={{ marginLeft:"auto", fontSize:12, color:"#9ca3af", alignSelf:"center" }}>
                {formData.allowedRoutes.length} / {routesList.length} selected
              </span>
            </div>
            <div className="ce-route-grid">
              {routesList.map(route => {
                const active = formData.allowedRoutes.includes(route);
                return (
                  <div key={route} className={`ce-route-pill${active ? " active" : ""}`}
                    onClick={() => handleRouteToggle(route)} title={route}>
                    <div className="ce-route-check">
                      {active && (
                        <svg width={10} height={10} viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="ce-route-label">{prettyRoute(route)}</span>
                  </div>
                );
              })}
            </div>

            {formData.allowedRoutes.length > 0 && (
              <div className="ce-routes-preview">
                <span style={{ fontWeight:700, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                  ✓ Will be assigned:&nbsp;
                </span>
                {formData.allowedRoutes.join(", ")}
              </div>
            )}
          </Section>

          {/* 5. Documents */}
          <Section
            icon={<svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#0ea5e9" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>}
            iconBg="#f0f9ff" title="Documents"
          >
            <div className="ce-dropzone">
              <input type="file" multiple onChange={handleFilesChange} accept="image/*,.pdf" />
              <svg width={32} height={32} fill="none" viewBox="0 0 24 24" stroke="#c7d2fe" strokeWidth={1.5} style={{ margin:"0 auto 10px", display:"block" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              <p style={{ fontSize:13.5, fontWeight:600, color:"#6b7280", marginBottom:3 }}>
                Drop files here or <span style={{ color:"#6366f1" }}>browse</span>
              </p>
              <p style={{ fontSize:12, color:"#9ca3af" }}>PNG, JPG, PDF accepted</p>
            </div>
            {documentPreviews.length > 0 && (
              <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginTop:14 }}>
                {documentPreviews.map((src, i) => (
                  <div key={i} className="ce-doc-preview">
                    <img src={src} alt={`doc-${i}`} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                  </div>
                ))}
                <div style={{ display:"flex", alignItems:"center" }}>
                  <span style={{ fontSize:12, color:"#9ca3af" }}>{documents.length} file{documents.length !== 1 ? "s" : ""} selected</span>
                </div>
              </div>
            )}
          </Section>

          {/* Submit */}
          <div style={{ marginTop:4 }}>
            <button type="submit" className="ce-submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="ce-spin">
                    <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                  </span>
                  Creating Employee…
                </>
              ) : (
                <>
                  <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                  </svg>
                  Create Employee
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </SidebarLayout>
  );
}