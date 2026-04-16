import React, { useState } from "react";
import SidebarLayout from "../../components/layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import Notification from "../../components/Notification";
import { Eye, EyeOff } from "lucide-react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .ce { font-family: 'DM Sans', sans-serif; color: #111827; max-width: 860px; margin: 0 auto; }

  .ce-lbl { display: block; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: #6b7280; margin-bottom: 5px; }

  .ce-inp, .ce-sel {
    width: 100%; border: 1px solid #d1d5db; border-radius: 7px;
    padding: 8px 11px; font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s; appearance: none;
  }
  .ce-inp::placeholder { color: #9ca3af; }
  .ce-inp:focus, .ce-sel:focus {
    border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .ce-inp.mono { font-family: 'DM Mono', monospace; font-size: 12.5px; }
  .ce-inp.err  { border-color: #fca5a5; background: #fff5f5; }
  .ce-inp.err:focus { box-shadow: 0 0 0 2px rgba(239,68,68,.12); }

  /* section card */
  .ce-section {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; overflow: hidden; margin-bottom: 12px;
  }
  .ce-section-head {
    display: flex; align-items: center; gap: 9px;
    padding: 10px 16px; border-bottom: 1px solid #e5e7eb;
    background: #f9fafb;
  }
  .ce-section-dot { width: 7px; height: 7px; border-radius: "50%"; flex-shrink: 0; }
  .ce-section-title { font-size: 10.5px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: .08em; }
  .ce-section-badge {
    margin-left: auto; font-size: 10.5px; font-weight: 700;
    background: #f3f4f6; color: #374151; padding: "1px 7px";
    border-radius: 4px; border: 1px solid #e5e7eb;
    font-family: 'DM Mono', monospace; min-width: 22px; text-align: center;
  }
  .ce-section-body { padding: 16px; }

  /* route pills */
  .ce-route-pill {
    display: flex; align-items: center; gap: 7px; padding: 6px 9px;
    border-radius: 6px; cursor: pointer; border: 1px solid #e5e7eb;
    background: #f9fafb; transition: all .1s; user-select: none;
  }
  .ce-route-pill:hover  { border-color: #d1d5db; background: #f3f4f6; }
  .ce-route-pill.active { border-color: #d1d5db; background: #f3f4f6; }
  .ce-route-check {
    width: 13px; height: 13px; border-radius: 3px; flex-shrink: 0;
    border: 1px solid #d1d5db; background: #fff;
    display: flex; align-items: center; justify-content: center; transition: all .1s;
  }
  .ce-route-pill.active .ce-route-check { background: #111827; border-color: #111827; }
  .ce-route-label {
    font-size: 11px; font-weight: 500; color: #4b5563;
    font-family: 'DM Mono', monospace; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis;
  }
  .ce-route-pill.active .ce-route-label { color: #111827; font-weight: 600; }

  /* role card */
  .ce-role-card {
    border: 1px solid #e5e7eb; border-radius: 7px; padding: 11px 14px; cursor: pointer;
    transition: all .1s; display: flex; align-items: center; gap: 10px; background: #f9fafb;
  }
  .ce-role-card:hover { border-color: #d1d5db; }
  .ce-role-card.sel   { border-color: #d1d5db; background: #f3f4f6; }
  .ce-role-dot {
    width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid #d1d5db;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all .1s;
  }
  .ce-role-card.sel .ce-role-dot { border-color: #111827; background: #111827; }

  /* dropzone */
  .ce-dropzone {
    border: 1px dashed #d1d5db; border-radius: 8px; padding: 22px;
    text-align: center; cursor: pointer; transition: border-color .12s, background .12s;
    background: #f9fafb; position: relative;
  }
  .ce-dropzone:hover { border-color: #9ca3af; background: #f3f4f6; }
  .ce-dropzone input[type=file] { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; }

  /* password strength */
  .ce-pwd-bar { flex: 1; height: 3px; border-radius: 3px; transition: background .3s; }

  /* submit */
  .ce-submit {
    width: 100%; padding: 10px 0; border-radius: 7px; border: none;
    background: #111827; color: #fff; font-size: 13.5px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background .12s;
  }
  .ce-submit:hover:not(:disabled) { background: #1f2937; }
  .ce-submit:disabled { opacity: .6; cursor: not-allowed; }

  @keyframes ce-spin { to { transform: rotate(360deg); } }
  .ce-spin { animation: ce-spin .8s linear infinite; display: inline-block; }

  .ce-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .ce-g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
  .ce-routes-preview {
    margin-top: 12px; padding: 9px 12px; border-radius: 7px;
    background: #f0fdf4; border: 1px solid #bbf7d0;
    font-size: 11.5px; color: #15803d; font-family: 'DM Mono', monospace;
    line-height: 1.7; word-break: break-all;
  }
  @media (max-width: 640px) { .ce-g2, .ce-g3 { grid-template-columns: 1fr; } }
`;

const prettyRoute = r =>
  r.replace(/^\//, "").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) || "Dashboard";

const pwdStrength = pwd => {
  if (!pwd) return { score:0, label:"", color:"#e5e7eb" };
  let s = 0;
  if (pwd.length >= 8) s++;
  if (/[A-Z]/.test(pwd)) s++;
  if (/[0-9]/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  return [
    { score:1, label:"Weak",   color:"#f87171" },
    { score:2, label:"Fair",   color:"#fb923c" },
    { score:3, label:"Good",   color:"#34d399" },
    { score:4, label:"Strong", color:"#15803d" },
  ][s-1] || { score:0, label:"", color:"#e5e7eb" };
};

function Section({ dot, title, badge, children }) {
  return (
    <div className="ce-section">
      <div className="ce-section-head">
        <div className="ce-section-dot" style={{ background:dot, borderRadius:"50%", width:7, height:7 }}/>
        <span className="ce-section-title">{title}</span>
        {badge != null && (
          <span className="ce-section-badge" style={{ marginLeft:"auto", fontSize:10.5, fontWeight:700, background:"#f3f4f6", color:"#374151", padding:"1px 7px", borderRadius:4, border:"1px solid #e5e7eb", fontFamily:"'DM Mono',monospace" }}>
            {badge}
          </span>
        )}
      </div>
      <div className="ce-section-body">{children}</div>
    </div>
  );
}

function Fld({ label, error, children }) {
  return (
    <div>
      {label && <label className="ce-lbl">{label}</label>}
      {children}
      {error && <p style={{ fontSize:11, color:"#ef4444", marginTop:3, fontWeight:500 }}>{error}</p>}
    </div>
  );
}

export default function CreateEmployee() {
  const [formData, setFormData] = useState({
    firstName:"", lastName:"", cnic:"", address:"",
    mobile:"+92", email:"", role:"", password:"", allowedRoutes:[],
  });
  const [documents,        setDocuments]        = useState([]);
  const [documentPreviews, setDocumentPreviews] = useState([]);
  const [notifMsg,         setNotifMsg]         = useState("");
  const [notifType,        setNotifType]        = useState("");
  const [showPassword,     setShowPassword]     = useState(false);
  const [errors,           setErrors]           = useState({});
  const [loading,          setLoading]          = useState(false);

  const ALL_ROUTES = [
    "/dashboard","/create-account","/view-accounts","/ledger",
    "/general-entries","/view-general-entries","/products","/products/new",
    "/add-invoice-purchase","/view-purchase-invoices","/purchase-quotation",
    "/add-invoice-sales","/view-sales-invoices","/sales-quotation",
    "/trialbalance","/balancesheet","/incomestatement",
    "/cashbook","/cashbook-report",
    "/employees","/employees/new",
    "/weight-bridge","/weight-bridge/invoices",
    "/cheque-book/create","/cheque-book/entry","/cheque-book/view",
    "/stock",
  ];

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

  const handleChange = e => {
    const { name, value } = e.target;
    setErrors(p => ({...p,[name]:""}));
    if (name==="cnic") {
      const d = value.replace(/\D/g,"").slice(0,13);
      let f = d;
      if (d.length>5)  f = `${d.slice(0,5)}-${d.slice(5)}`;
      if (d.length>12) f = `${d.slice(0,5)}-${d.slice(5,12)}-${d.slice(12)}`;
      setFormData(p=>({...p,cnic:f})); return;
    }
    if (name==="mobile") {
      let d = value.replace(/\D/g,"");
      if (d.startsWith("92")) d = d.slice(2);
      if (d.length>10) d = d.slice(0,10);
      setFormData(p=>({...p,mobile:`+92${d}`})); return;
    }
    setFormData(p=>({...p,[name]:value}));
  };

  const toggleRoute = route => setFormData(p=>({
    ...p, allowedRoutes: p.allowedRoutes.includes(route)
      ? p.allowedRoutes.filter(r=>r!==route)
      : [...p.allowedRoutes,route],
  }));

  const handleFilesChange = e => {
    const files = Array.from(e.target.files);
    setDocuments(files);
    setDocumentPreviews(files.map(f=>URL.createObjectURL(f)));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newErrors = {};
    if (formData.cnic.replace(/\D/g,"").length!==13) newErrors.cnic="Must be exactly 13 digits";
    if (formData.mobile.replace(/\D/g,"").slice(2).length!==10) newErrors.mobile="Must be 10 digits after +92";
    if (!formData.role) newErrors.role="Please select a role";
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    const token = localStorage.getItem("token");
    const data  = new FormData();
    ["firstName","lastName","cnic","address","mobile","email","role","password"]
      .forEach(key => data.append(key,formData[key]));
    data.append("allowedRoutes",JSON.stringify(formData.allowedRoutes));
    formData.allowedRoutes.forEach(route=>data.append("allowedRoutes[]",route));
    documents.forEach(f=>data.append("documents",f));

    setLoading(true);
    try {
      const res    = await fetch(`${API_BASE_URL}/employees`,{method:"POST",headers:{Authorization:`Bearer ${token}`},body:data});
      const result = await res.json();
      if (res.ok) {
        setNotifMsg(`Employee created — ${formData.allowedRoutes.length} route(s) assigned`);
        setNotifType("success");
        setFormData({ firstName:"",lastName:"",cnic:"",address:"",mobile:"+92",email:"",role:"",password:"",allowedRoutes:[] });
        setDocuments([]); setDocumentPreviews([]);
      } else {
        setNotifMsg(result.message||"Failed to create employee"); setNotifType("error");
      }
    } catch { setNotifMsg("Server error"); setNotifType("error"); }
    finally { setLoading(false); setTimeout(()=>setNotifMsg(""),4000); }
  };

  const strength = pwdStrength(formData.password);

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification message={notifMsg} type={notifType}/>

      <div className="ce">
        <div style={{ marginBottom:20 }}>
          <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 3px" }}>HR Management</p>
          <h1 style={{ fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px", margin:0 }}>
            Create New Employee
          </h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column" }}>

          {/* Personal Info */}
          <Section dot="#3b82f6" title="Personal Information">
            <div className="ce-g2" style={{ marginBottom:12 }}>
              <Fld label="First Name"><input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="e.g. Muhammad" className="ce-inp" required/></Fld>
              <Fld label="Last Name"><input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="e.g. Ali" className="ce-inp" required/></Fld>
            </div>
            <div className="ce-g2" style={{ marginBottom:12 }}>
              <Fld label="CNIC" error={errors.cnic}>
                <input name="cnic" value={formData.cnic} onChange={handleChange} placeholder="xxxxx-xxxxxxx-x" className={`ce-inp mono${errors.cnic?" err":""}`} required/>
              </Fld>
              <Fld label="Mobile" error={errors.mobile}>
                <input name="mobile" value={formData.mobile} onChange={handleChange} className={`ce-inp mono${errors.mobile?" err":""}`} required/>
              </Fld>
            </div>
            <div className="ce-g2">
              <Fld label="Email Address"><input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" className="ce-inp" required/></Fld>
              <Fld label="Home Address"><input name="address" value={formData.address} onChange={handleChange} placeholder="Street, City" className="ce-inp"/></Fld>
            </div>
          </Section>

          {/* Role */}
          <Section dot="#f59e0b" title="Role & Access Level">
            {errors.role && <p style={{ fontSize:11.5, color:"#ef4444", marginBottom:10, fontWeight:500 }}>{errors.role}</p>}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
              {roles.map(r=>(
                <div key={r.value}
                  className={`ce-role-card${formData.role===r.value?" sel":""}`}
                  onClick={()=>{ setFormData(p=>({...p,role:r.value})); setErrors(p=>({...p,role:""})); }}>
                  <div className="ce-role-dot">
                    {formData.role===r.value && <svg width={8} height={8} viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>}
                  </div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:formData.role===r.value?"#111827":"#374151" }}>{r.label}</div>
                    <div style={{ fontSize:11.5, color:"#9ca3af", marginTop:1 }}>{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Credentials */}
          <Section dot="#10b981" title="Login Credentials">
            <div style={{ maxWidth:420 }}>
              <Fld label="Password">
                <div style={{ position:"relative" }}>
                  <input name="password" type={showPassword?"text":"password"} value={formData.password}
                    onChange={handleChange} placeholder="Min. 8 characters"
                    className="ce-inp" style={{ paddingRight:42 }} required/>
                  <button type="button" onClick={()=>setShowPassword(s=>!s)}
                    style={{ position:"absolute", right:11, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#9ca3af", display:"flex", alignItems:"center", transition:"color .12s" }}
                    onMouseEnter={e=>e.currentTarget.style.color="#374151"}
                    onMouseLeave={e=>e.currentTarget.style.color="#9ca3af"}>
                    {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
                {formData.password && (
                  <div>
                    <div style={{ display:"flex", gap:3, marginTop:6 }}>
                      {[1,2,3,4].map(i=>(
                        <div key={i} className="ce-pwd-bar" style={{ background:i<=strength.score?strength.color:"#f3f4f6" }}/>
                      ))}
                    </div>
                    <p style={{ fontSize:10.5, marginTop:3, fontWeight:600, color:strength.color }}>{strength.label}</p>
                  </div>
                )}
              </Fld>
            </div>
          </Section>

          {/* Permissions */}
          <Section dot="#8b5cf6" title="Page Permissions" badge={formData.allowedRoutes.length}>
            <div style={{ display:"flex", gap:7, marginBottom:10 }}>
              <button type="button" onClick={()=>setFormData(p=>({...p,allowedRoutes:[...routesList]}))}
                style={{ fontSize:11.5, fontWeight:500, padding:"4px 10px", borderRadius:5, border:"1px solid #e5e7eb", background:"#fff", color:"#374151", fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}>
                Select All
              </button>
              <button type="button" onClick={()=>setFormData(p=>({...p,allowedRoutes:[]}))}
                style={{ fontSize:11.5, fontWeight:500, padding:"4px 10px", borderRadius:5, border:"1px solid #e5e7eb", background:"#fff", color:"#374151", fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}>
                Clear All
              </button>
              <span style={{ marginLeft:"auto", fontSize:11.5, color:"#9ca3af", alignSelf:"center" }}>
                {formData.allowedRoutes.length} / {routesList.length}
              </span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:5, maxHeight:230, overflowY:"auto", scrollbarWidth:"thin" }}>
              {routesList.map(route=>{
                const active = formData.allowedRoutes.includes(route);
                return (
                  <div key={route} className={`ce-route-pill${active?" active":""}`}
                    onClick={()=>toggleRoute(route)} title={route}>
                    <div className="ce-route-check">
                      {active && <svg width={8} height={8} viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>}
                    </div>
                    <span className="ce-route-label">{prettyRoute(route)}</span>
                  </div>
                );
              })}
            </div>
            {formData.allowedRoutes.length > 0 && (
              <div className="ce-routes-preview">
                <strong style={{ fontFamily:"'DM Sans',sans-serif" }}>Will be assigned: </strong>
                {formData.allowedRoutes.join(", ")}
              </div>
            )}
          </Section>

          {/* Documents */}
          <Section dot="#0ea5e9" title="Documents">
            <div className="ce-dropzone">
              <input type="file" multiple onChange={handleFilesChange} accept="image/*,.pdf"/>
              <svg width={28} height={28} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={1.5}
                style={{ margin:"0 auto 9px", display:"block" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              <p style={{ fontSize:13, fontWeight:500, color:"#6b7280", margin:"0 0 3px" }}>
                Drop files here or <span style={{ color:"#374151", fontWeight:600 }}>browse</span>
              </p>
              <p style={{ fontSize:11.5, color:"#9ca3af", margin:0 }}>PNG, JPG, PDF accepted</p>
            </div>
            {documentPreviews.length > 0 && (
              <div style={{ display:"flex", flexWrap:"wrap", gap:9, marginTop:12, alignItems:"center" }}>
                {documentPreviews.map((src,i)=>(
                  <div key={i} style={{ width:56, height:56, borderRadius:7, border:"1px solid #e5e7eb", overflow:"hidden", flexShrink:0 }}>
                    <img src={src} alt={`doc-${i}`} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                  </div>
                ))}
                <span style={{ fontSize:12, color:"#9ca3af" }}>{documents.length} file{documents.length!==1?"s":""} selected</span>
              </div>
            )}
          </Section>

          {/* Submit */}
          <div style={{ marginTop:4 }}>
            <button type="submit" className="ce-submit" disabled={loading}>
              {loading ? (
                <><span className="ce-spin"><svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg></span> Creating Employee…</>
              ) : (
                <><svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg> Create Employee</>
              )}
            </button>
          </div>
        </form>
      </div>
    </SidebarLayout>
  );
}