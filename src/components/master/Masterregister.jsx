// src/components/master/MasterRegister.jsx
import React, { useState, useCallback } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { Spin, EyeBtn, fmtPKR } from "./masterStyles.jsx";

const getToken = () => localStorage.getItem("token");

const STEPS = [
  { label:"Business",   icon:"🏭" },
  { label:"Security",   icon:"🔑" },
  { label:"Documents",  icon:"📎" },
  { label:"Package",    icon:"📦" },
  { label:"Review",     icon:"✓"  },
];

function pwdScore(p) {
  let s = 0;
  if (p.length >= 8)  s++;
  if (p.length >= 12) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)) s++;
  return s;
}
const SCORE_COLOR = ["","#dc2626","#d97706","#2563eb","#15803d"];
const SCORE_LABEL = ["","Weak","Fair","Good","Strong"];

// ── Installment math ──────────────────────────────────────────────────────────
function calcInstallments(price, planType) {
  if (!price) return { per:0, total:price, periods:0 };
  const map = { full:{ periods:1 }, quarterly:{ periods:4 }, biannual:{ periods:2 }, annual:{ periods:1 } };
  const { periods } = map[planType] || { periods:1 };
  return { per: Math.round(price / periods), periods, total: price };
}

export default function MasterRegister({ packages, showToast, onCreated }) {
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);

  // Form state
  const [biz, setBiz] = useState({
    businessName:"", ownerName:"", email:"", phone:"", ntnNumber:"",
  });
  const [logo,        setLogo]        = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [cnic,        setCnic]        = useState("");
  const [password,    setPassword]    = useState("");
  const [showPwd,     setShowPwd]     = useState(false);
  const [docs,        setDocs]        = useState([]);
  const [packageId,   setPackageId]   = useState("");
  const [planType,    setPlanType]    = useState("full");

  const score    = pwdScore(password);
  const rawCnic  = cnic.replace(/\D/g, "");
  const selPkg   = packages.find(p => p._id === packageId);
  const instData = selPkg ? calcInstallments(selPkg.price, planType) : null;

  // Format CNIC as XXXXX-XXXXXXX-X
  const handleCnicChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 13);
    let formatted = digits;
    if (digits.length > 5)  formatted = `${digits.slice(0,5)}-${digits.slice(5)}`;
    if (digits.length > 12) formatted = `${digits.slice(0,5)}-${digits.slice(5,12)}-${digits.slice(12)}`;
    setCnic(formatted);
  };

  // Phone input — only +923 + 9 digits
  const handlePhoneChange = (e) => {
    let raw = e.target.value.replace(/[^\d+]/g, "");
    if (!raw.startsWith("+92")) {
      const digits = raw.replace(/^\+?9?2?/, "").replace(/^0+/, "");
      raw = "+923" + digits.replace(/^3/, "");
    }
    if (raw.startsWith("+92") && !raw.startsWith("+923")) {
      raw = "+923" + raw.slice(3).replace(/^3?/, "");
    }
    // Enforce: +923 + exactly 9 digits
    const after = raw.slice(4).replace(/\D/g, "").slice(0, 9);
    raw = "+923" + after;
    setBiz(p => ({ ...p, phone: raw }));
  };

  const validate = useCallback(() => {
    if (step === 0) {
      if (!biz.businessName.trim()) return "Business name is required";
      if (!biz.ownerName.trim())    return "Owner name is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(biz.email)) return "Valid email address required";
      if (biz.phone && !/^\+923\d{9}$/.test(biz.phone))  return "Phone must be +923XXXXXXXXX (9 digits after +923)";
    }
    if (step === 1) {
      if (rawCnic.length !== 13)      return "CNIC must be exactly 13 digits";
      if (password.length < 8)        return "Password must be at least 8 characters";
      if (score < 2)                  return "Password too weak — add uppercase, numbers or symbols";
    }
    if (step === 3) {
      if (!packageId)                 return "Please select a package";
    }
    return null;
  }, [step, biz, rawCnic, password, score, packageId]);

  const next = () => {
    const err = validate();
    if (err) { showToast(err, false); return; }
    setStep(s => s + 1);
    window.scrollTo(0, 0);
  };

  const back = () => { setStep(s => s - 1); window.scrollTo(0, 0); };

  const reset = () => {
    setStep(0); setBusy(false);
    setBiz({ businessName:"", ownerName:"", email:"", phone:"", ntnNumber:"" });
    setLogo(null); setLogoPreview(""); setCnic(""); setPassword("");
    setDocs([]); setPackageId(""); setPlanType("full");
  };

  const submit = async () => {
    setBusy(true);
    try {
      const fd = new FormData();
      Object.entries(biz).forEach(([k, v]) => v && fd.append(k, v));
      fd.append("cnic",             rawCnic);
      fd.append("password",         password);
      fd.append("packageId",        packageId);
      fd.append("paymentPlanType",  planType);
      if (logo) fd.append("logo", logo);
      docs.forEach((d, i) => fd.append(`doc_${i}`, d.file));

      const r = await fetch(`${API_BASE_URL}/master/mills`, {
        method:"POST",
        headers:{ Authorization:`Bearer ${getToken()}` },
        body: fd,
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.message);
      showToast(`${biz.businessName} registered! Welcome email sent to ${biz.email} ✓`, true);
      onCreated && onCreated();
      reset();
    } catch (e) { showToast(e.message, false); }
    setBusy(false);
  };

  // ── Step renderers ─────────────────────────────────────────────────────────
  const S0 = () => (
    <div>
      <div style={{ fontSize:14, fontWeight:700, color:"#111827", marginBottom:2 }}>Business Information</div>
      <div style={{ fontSize:12.5, color:"#9ca3af", marginBottom:20 }}>Details about the mill and its owner</div>
      <div className="mp-g2">
        <div className="mp-field">
          <label className="mp-lbl">Business Name <em>*</em></label>
          <input className="mp-inp" placeholder="Al-Rehman Rice Mills" value={biz.businessName} onChange={e=>setBiz(p=>({...p,businessName:e.target.value}))}/>
        </div>
        <div className="mp-field">
          <label className="mp-lbl">Owner Name <em>*</em></label>
          <input className="mp-inp" placeholder="Muhammad Zain Ali" value={biz.ownerName} onChange={e=>setBiz(p=>({...p,ownerName:e.target.value}))}/>
        </div>
        <div className="mp-field">
          <label className="mp-lbl">Email Address <em>*</em></label>
          <input className="mp-inp" type="email" placeholder="owner@mill.com" value={biz.email} onChange={e=>setBiz(p=>({...p,email:e.target.value}))}/>
        </div>
        <div className="mp-field">
          <label className="mp-lbl">Phone</label>
          <input className="mp-inp mono" type="text" placeholder="+923001234567"
            value={biz.phone}
            onFocus={() => { if (!biz.phone) setBiz(p=>({...p,phone:"+923"})); }}
            onBlur  ={() => { if (biz.phone === "+923") setBiz(p=>({...p,phone:""})); }}
            onChange={handlePhoneChange}
            maxLength={13}/>
          {biz.phone && !/^\+923\d{9}$/.test(biz.phone) && biz.phone.length > 4 && (
            <div className="mp-hint-er">Format: +923XXXXXXXXX (9 digits after +923)</div>
          )}
          {/^\+923\d{9}$/.test(biz.phone) && <div className="mp-hint-ok">✓ Valid</div>}
        </div>
        <div className="mp-field">
          <label className="mp-lbl">NTN Number</label>
          <input className="mp-inp mono" placeholder="1234567-8" value={biz.ntnNumber} onChange={e=>setBiz(p=>({...p,ntnNumber:e.target.value}))}/>
        </div>
        <div className="mp-field">
          <label className="mp-lbl">Logo</label>
          <label style={{ cursor:"pointer", display:"block" }}>
            <div className="mp-dropzone" style={{ padding:"10px 14px", minHeight:48, display:"flex", alignItems:"center", gap:12 }}>
              <input type="file" accept="image/*" onChange={e => {
                const f = e.target.files?.[0];
                if (f) { setLogo(f); setLogoPreview(URL.createObjectURL(f)); }
              }}/>
              {logoPreview
                ? <><img src={logoPreview} alt="" style={{ width:34, height:34, objectFit:"cover", borderRadius:5, border:"1px solid #e5e7eb", flexShrink:0 }}/>
                    <span style={{ fontSize:12, color:"#374151" }}>{logo?.name}</span></>
                : <span style={{ fontSize:12.5, color:"#9ca3af" }}>Upload Logo</span>}
            </div>
          </label>
        </div>
      </div>
    </div>
  );

  const S1 = () => (
    <div>
      <div style={{ fontSize:14, fontWeight:700, color:"#111827", marginBottom:2 }}>Security Credentials</div>
      <div style={{ fontSize:12.5, color:"#9ca3af", marginBottom:20 }}>CNIC is the login identifier — password will be emailed to the owner</div>
      <div style={{ maxWidth:440, display:"flex", flexDirection:"column", gap:16 }}>
        <div className="mp-field">
          <label className="mp-lbl">CNIC <em>*</em></label>
          <input className="mp-inp mono" placeholder="XXXXX-XXXXXXX-X" maxLength={15}
            value={cnic} onChange={handleCnicChange}/>
          <div style={{ display:"flex", gap:2, marginTop:5 }}>
            {Array.from({ length:13 }, (_, i) => (
              <div key={i} style={{ width:8, height:4, borderRadius:2, background: i < rawCnic.length ? "#111827" : "#e5e7eb", transition:".1s" }}/>
            ))}
            <span style={{ fontSize:9.5, color:"#9ca3af", marginLeft:5, fontFamily:"'DM Mono',monospace" }}>{rawCnic.length}/13</span>
          </div>
          {rawCnic.length === 13 && <div className="mp-hint-ok">✓ Valid CNIC</div>}
        </div>

        <div className="mp-field">
          <label className="mp-lbl">Password <em>*</em></label>
          <div className="mp-pwd-wrap">
            <input className="mp-inp" type={showPwd ? "text" : "password"} placeholder="Minimum 8 characters"
              value={password} onChange={e=>setPassword(e.target.value)} style={{ paddingRight:38 }}/>
            <EyeBtn show={showPwd} onToggle={() => setShowPwd(s => !s)}/>
          </div>
          {password.length > 0 && (
            <>
              <div className="mp-pwd-bars" style={{ marginTop:5 }}>
                {[1,2,3,4].map(n => (
                  <div key={n} className="mp-pwd-bar" style={{ background: score >= n ? SCORE_COLOR[score] : "#f3f4f6" }}/>
                ))}
              </div>
              <div style={{ fontSize:10.5, color:SCORE_COLOR[score], marginTop:3, fontWeight:600 }}>
                {SCORE_LABEL[score]}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mp-warn-box" style={{ marginTop:16 }}>
        Password will be hashed and stored securely. It will be emailed to the owner at <strong>{biz.email}</strong>. Store it before proceeding.
      </div>
    </div>
  );

  const S2 = () => (
    <div>
      <div style={{ fontSize:14, fontWeight:700, color:"#111827", marginBottom:2 }}>Documents</div>
      <div style={{ fontSize:12.5, color:"#9ca3af", marginBottom:20 }}>
        Upload business registration, NTN certificate, CNIC copies — all optional
      </div>
      <label style={{ cursor:"pointer", display:"block", marginBottom:10 }}>
        <div className="mp-dropzone">
          <input type="file" multiple accept="image/*,.pdf" onChange={e => {
            const newFiles = Array.from(e.target.files).map(f => ({ file:f, name:f.name }));
            setDocs(p => [...p, ...newFiles]);
          }}/>
          <div style={{ fontSize:13, color:"#6b7280", marginBottom:2 }}>Upload Docs</div>
          <div style={{ fontSize:11, color:"#9ca3af" }}>Images & PDF — click or drag & drop</div>
        </div>
      </label>
      {docs.length > 0 && (
        <div style={{ display:"flex", flexDirection:"column", gap:5, marginTop:8 }}>
          {docs.map((d, i) => (
            <div key={i} className="mp-doc-item">
              <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <span style={{ flex:1, fontSize:12.5, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{d.name}</span>
              <button className="mp-doc-rm" onClick={() => setDocs(p => p.filter((_, j) => j !== i))}>
                <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          ))}
        </div>
      )}
      {docs.length === 0 && (
        <div style={{ fontSize:12.5, color:"#9ca3af", textAlign:"center", padding:"14px 0" }}>
          No documents uploaded — you can skip this step.
        </div>
      )}
    </div>
  );

  const S3 = () => (
    <div>
      <div style={{ fontSize:14, fontWeight:700, color:"#111827", marginBottom:2 }}>Package & Payment Plan</div>
      <div style={{ fontSize:12.5, color:"#9ca3af", marginBottom:20 }}>Select a package and payment schedule for this mill</div>

      {packages.length === 0 ? (
        <div className="mp-warn-box">No packages available. Create at least one package first.</div>
      ) : (
        <>
          {/* Package selection */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:10, marginBottom:20 }}>
            {packages.map(pkg => (
              <div key={pkg._id}
                onClick={() => setPackageId(pkg._id)}
                className={`pkg-card${packageId === pkg._id ? " selected" : ""}`}
                style={{ "--pc": pkg.color }}>
                <div className="pkg-card-accent"/>
                <div className="pkg-card-sel-dot">
                  <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
                <div style={{ fontSize:8.5, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:pkg.color, fontFamily:"'DM Mono',monospace", marginBottom:3 }}>{pkg.tier}</div>
                <div style={{ fontSize:15, fontWeight:700, color:"#111827", marginBottom:4 }}>{pkg.name}</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:18, fontWeight:700, color:"#111827", marginBottom:10 }}>
                  {fmtPKR(pkg.price)} <span style={{ fontSize:11, color:"#9ca3af", fontWeight:400 }}>setup</span>
                </div>
                {(pkg.features || []).slice(0, 4).map((f, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, color:"#374151", marginBottom:3 }}>
                    <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke={pkg.color} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    {f}
                  </div>
                ))}
                {(pkg.features||[]).length > 4 && <div style={{ fontSize:11, color:"#9ca3af", marginLeft:15, marginTop:2 }}>+{pkg.features.length-4} more</div>}
              </div>
            ))}
          </div>

          {selPkg && (
            <>
              {/* Plan type */}
              <div style={{ fontSize:12.5, fontWeight:700, color:"#374151", marginBottom:10 }}>Payment Schedule</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:18 }}>
                {[
                  { key:"full",      label:"Full",       sub:`${fmtPKR(selPkg.price)} once` },
                  { key:"quarterly", label:"Quarterly",  sub:`${fmtPKR(Math.round(selPkg.price/4))} / qtr` },
                  { key:"biannual",  label:"Bi-Annual",  sub:`${fmtPKR(Math.round(selPkg.price/2))} / 6mo` },
                  { key:"annual",    label:"Annual",     sub:`${fmtPKR(selPkg.price)} / yr` },
                ].map(pt => (
                  <button key={pt.key} type="button" onClick={() => setPlanType(pt.key)}
                    style={{
                      border:`1.5px solid ${planType===pt.key?"#111827":"#e5e7eb"}`,
                      background:planType===pt.key?"#111827":"#fff",
                      color:planType===pt.key?"#fff":"#6b7280",
                      borderRadius:7, padding:"10px 8px", cursor:"pointer",
                      textAlign:"center", fontFamily:"'DM Sans',sans-serif", transition:".12s",
                    }}>
                    <div style={{ fontSize:12.5, fontWeight:700, marginBottom:2 }}>{pt.label}</div>
                    <div style={{ fontSize:10.5, opacity:.7 }}>{pt.sub}</div>
                  </button>
                ))}
              </div>

              {/* Payment summary */}
              <div style={{ background:"#f9fafb", border:"1px solid #e5e7eb", borderRadius:7, padding:"14px 16px" }}>
                <div style={{ fontSize:9.5, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#9ca3af", fontFamily:"'DM Mono',monospace", marginBottom:10 }}>
                  Payment Summary
                </div>
                {planType === "full" ? (
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:14, fontWeight:700, color:"#111827" }}>
                    <span>One-time Setup</span>
                    <span style={{ fontFamily:"'DM Mono',monospace", color:"#15803d" }}>{fmtPKR(selPkg.price)}</span>
                  </div>
                ) : (
                  <>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#6b7280", marginBottom:7 }}>
                      <span>Per period ({["quarterly","biannual","annual"].indexOf(planType)+1 === 0 ? "—" : ["quarterly→3mo","biannual→6mo","annual→12mo"][["quarterly","biannual","annual"].indexOf(planType)]})</span>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontWeight:600, color:"#374151" }}>{fmtPKR(instData?.per)}</span>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#6b7280", marginBottom:7 }}>
                      <span>Total setup fee</span>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontWeight:600, color:"#374151" }}>{fmtPKR(selPkg.price)}</span>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:14, fontWeight:700, color:"#111827", paddingTop:8, borderTop:"1px solid #e5e7eb" }}>
                      <span>First payment due</span>
                      <span style={{ fontFamily:"'DM Mono',monospace", color:"#15803d" }}>{fmtPKR(instData?.per)}</span>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );

  const S4 = () => (
    <div>
      <div style={{ fontSize:14, fontWeight:700, color:"#111827", marginBottom:2 }}>Review & Create</div>
      <div style={{ fontSize:12.5, color:"#9ca3af", marginBottom:20 }}>Verify all details before creating the mill</div>

      {[
        { title:"Business", items:[
          ["Business Name", biz.businessName],
          ["Owner",         biz.ownerName],
          ["Email",         biz.email],
          ["Phone",         biz.phone || "—"],
          ["NTN",           biz.ntnNumber || "—"],
        ]},
        { title:"Security", items:[
          ["CNIC",    cnic || rawCnic],
          ["Password","•".repeat(Math.min(password.length, 16))+" ("+SCORE_LABEL[score]+")"],
        ]},
        { title:"Package", items:[
          ["Package", selPkg?.name || "—"],
          ["Price",   selPkg ? fmtPKR(selPkg.price) : "—"],
          ["Plan",    planType.charAt(0).toUpperCase() + planType.slice(1)],
          ["First Payment", instData ? fmtPKR(instData.per) : "—"],
        ]},
        { title:"Documents", items:[
          ["Files", docs.length > 0 ? `${docs.length} document(s)` : "None"],
        ]},
      ].map(({ title, items }) => (
        <div key={title} style={{ background:"#f9fafb", border:"1px solid #e5e7eb", borderRadius:7, marginBottom:10, overflow:"hidden" }}>
          <div style={{ padding:"8px 14px", background:"#f3f4f6", borderBottom:"1px solid #e5e7eb", fontSize:10.5, fontWeight:700, color:"#374151", textTransform:"uppercase", letterSpacing:".08em", fontFamily:"'DM Mono',monospace" }}>{title}</div>
          <div style={{ padding:"10px 14px" }}>
            {items.map(([k, v]) => (
              <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", borderBottom:"1px solid #f3f4f6", fontSize:12.5 }}>
                <span style={{ color:"#9ca3af" }}>{k}</span>
                <span style={{ color:"#111827", fontWeight:500, maxWidth:260, textAlign:"right", wordBreak:"break-all", fontFamily:k==="CNIC"||k==="Phone"?"'DM Mono',monospace":"inherit" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="mp-info-box">
        A welcome email with login credentials and payment instructions will be sent to <strong>{biz.email}</strong> upon creation.
      </div>
    </div>
  );

  const steps = [<S0/>, <S1/>, <S2/>, <S3/>, <S4/>];

  return (
    <div style={{ maxWidth:740 }}>
      <div className="mp-page-h">Register New Mill</div>
      <div className="mp-page-sub">Onboard a mill — credentials and welcome email sent automatically on creation</div>

      {/* Step indicator */}
      <div style={{ display:"flex", alignItems:"center", marginBottom:24 }}>
        {STEPS.map((s, i) => {
          const state = step > i ? "done" : step === i ? "active" : "idle";
          return (
            <React.Fragment key={i}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", minWidth:56 }}>
                <div style={{
                  width:32, height:32, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
                  border:`2px solid ${state==="done"?"#15803d":state==="active"?"#111827":"#e5e7eb"}`,
                  background:state==="done"?"#15803d":state==="active"?"#111827":"#fff",
                  transition:".2s",
                }}>
                  {state === "done"
                    ? <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    : <span style={{ fontSize:12, fontWeight:700, color:state==="active"?"#fff":"#9ca3af", fontFamily:"'DM Mono',monospace" }}>{i+1}</span>}
                </div>
                <div style={{ fontSize:9, fontWeight:700, marginTop:4, textTransform:"uppercase", letterSpacing:".08em", color:state==="idle"?"#9ca3af":"#111827", whiteSpace:"nowrap", fontFamily:"'DM Mono',monospace" }}>
                  {s.label}
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex:1, height:2, background:step > i ? "#15803d" : "#e5e7eb", margin:"0 4px 18px", transition:".2s" }}/>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step content */}
      <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, padding:"24px 28px", marginBottom:16 }}>
        {steps[step]}
      </div>

      {/* Nav */}
      <div style={{ display:"flex", gap:8 }}>
        {step > 0 && (
          <button className="mp-btn mp-btn-outline" onClick={back} style={{ minWidth:90 }}>← Back</button>
        )}
        {step < STEPS.length - 1 ? (
          <button className="mp-btn mp-btn-primary" onClick={next} style={{ flex:1, justifyContent:"center" }}>
            Next: {STEPS[step + 1].label} →
          </button>
        ) : (
          <button className="mp-btn mp-btn-green" onClick={submit} disabled={busy} style={{ flex:1, justifyContent:"center" }}>
            {busy ? <><Spin/> Creating Mill…</> : "✓ Create Mill & Send Email"}
          </button>
        )}
      </div>
    </div>
  );
}