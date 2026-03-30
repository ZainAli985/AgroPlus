// src/components/master/MasterRegister.jsx
// ─── FOCUS FIX ────────────────────────────────────────────────────────────────
// Defining `const S0 = () => ...` INSIDE a parent component creates a NEW React
// component type on every render, causing React to unmount+remount the subtree
// and kill input focus after every keystroke.
// Fix: renderStep() returns JSX directly (no nested component definitions).
import React, { useState, useCallback } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { Spin, EyeBtn, fmtPKR } from "./masterStyles.jsx";

const getToken = () => localStorage.getItem("token");

const STEPS = [{ label:"Business" },{ label:"Security" },{ label:"Documents" },{ label:"Package" },{ label:"Review" }];

function pwdScore(p) {
  let s = 0;
  if (p.length >= 8)  s++;
  if (p.length >= 12) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)) s++;
  return s;
}
const SC = ["","#dc2626","#d97706","#2563eb","#15803d"];
const SL = ["","Weak","Fair","Good","Strong"];

function calcInstallments(price, planType) {
  if (!price) return { per:0 };
  const periods = { full:1, quarterly:4, biannual:2, annual:1 }[planType] || 1;
  return { per: Math.round(price / periods) };
}

export default function MasterRegister({ packages, showToast, onCreated }) {
  const [step,      setStep]      = useState(0);
  const [busy,      setBusy]      = useState(false);
  const [bizName,   setBizName]   = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email,     setEmail]     = useState("");
  const [phone,     setPhone]     = useState("");
  const [ntn,       setNtn]       = useState("");
  const [logo,      setLogo]      = useState(null);
  const [logoPrev,  setLogoPrev]  = useState("");
  const [cnic,      setCnic]      = useState("");
  const [password,  setPassword]  = useState("");
  const [showPwd,   setShowPwd]   = useState(false);
  const [docs,      setDocs]      = useState([]);
  const [packageId, setPackageId] = useState("");
  const [planType,  setPlanType]  = useState("full");

  const score   = pwdScore(password);
  const rawCnic = cnic.replace(/\D/g,"");
  const selPkg  = packages.find(p => p._id === packageId);
  const inst    = selPkg ? calcInstallments(selPkg.price, planType) : null;

  const handleCnicChange = e => {
    const d = e.target.value.replace(/\D/g,"").slice(0,13);
    let f = d;
    if (d.length > 5)  f = `${d.slice(0,5)}-${d.slice(5)}`;
    if (d.length > 12) f = `${d.slice(0,5)}-${d.slice(5,12)}-${d.slice(12)}`;
    setCnic(f);
  };

  const handlePhoneChange = e => {
    const after = e.target.value.replace(/\D/g,"").slice(0,9);
    setPhone("+923" + after);
  };

  const validate = useCallback(() => {
    if (step === 0) {
      if (!bizName.trim())   return "Business name is required";
      if (!ownerName.trim()) return "Owner name is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Valid email required";
      if (phone && !/^\+923\d{9}$/.test(phone)) return "Phone must be +923XXXXXXXXX";
    }
    if (step === 1) {
      if (rawCnic.length !== 13) return "CNIC must be 13 digits";
      if (password.length < 8)   return "Password min 8 characters";
      if (score < 2)             return "Password too weak — add uppercase & numbers";
    }
    if (step === 3 && !packageId) return "Select a package";
    return null;
  }, [step, bizName, ownerName, email, phone, rawCnic, password, score, packageId]);

  const next = () => { const err = validate(); if (err) { showToast(err, false); return; } setStep(s=>s+1); };
  const back = () => setStep(s => s-1);

  const reset = () => {
    setStep(0); setBusy(false);
    setBizName(""); setOwnerName(""); setEmail(""); setPhone(""); setNtn("");
    setLogo(null); setLogoPrev(""); setCnic(""); setPassword(""); setShowPwd(false);
    setDocs([]); setPackageId(""); setPlanType("full");
  };

  const submit = async () => {
    setBusy(true);
    try {
      const fd = new FormData();
      if (bizName)   fd.append("businessName", bizName);
      if (ownerName) fd.append("ownerName", ownerName);
      if (email)     fd.append("email", email);
      if (phone)     fd.append("phone", phone);
      if (ntn)       fd.append("ntnNumber", ntn);
      fd.append("cnic", rawCnic);
      fd.append("password", password);
      fd.append("packageId", packageId);
      fd.append("paymentPlanType", planType);
      if (logo) fd.append("logo", logo);
      docs.forEach((d,i) => fd.append(`doc_${i}`, d.file));
      const r = await fetch(`${API_BASE_URL}/master/mills`, { method:"POST", headers:{ Authorization:`Bearer ${getToken()}` }, body:fd });
      const data = await r.json();
      if (!r.ok) throw new Error(data.message);
      showToast(`${bizName} registered! Welcome email sent ✓`, true);
      onCreated && onCreated();
      reset();
    } catch(e) { showToast(e.message, false); }
    setBusy(false);
  };

  // ─── renderStep: returns JSX directly, NEVER defines components inside ───────
  const renderStep = () => {
    if (step === 0) return (
      <div>
        <div style={{fontSize:14,fontWeight:700,color:"#111827",marginBottom:2}}>Business Information</div>
        <div style={{fontSize:12,color:"#9ca3af",marginBottom:14}}>Mill details and owner info</div>
        <div className="mp-g2">
          <div className="mp-field">
            <label className="mp-lbl">Business Name <em>*</em></label>
            <input className="mp-inp" placeholder="Al-Rehman Rice Mills" value={bizName} onChange={e=>setBizName(e.target.value)}/>
          </div>
          <div className="mp-field">
            <label className="mp-lbl">Owner Name <em>*</em></label>
            <input className="mp-inp" placeholder="Muhammad Zain Ali" value={ownerName} onChange={e=>setOwnerName(e.target.value)}/>
          </div>
          <div className="mp-field">
            <label className="mp-lbl">Email <em>*</em></label>
            <input className="mp-inp" type="email" placeholder="owner@mill.com" value={email} onChange={e=>setEmail(e.target.value)}/>
          </div>
          <div className="mp-field">
            <label className="mp-lbl">Phone</label>
            <input className="mp-inp mono" placeholder="+923001234567" maxLength={13}
              value={phone}
              onFocus={()=>{ if(!phone) setPhone("+923"); }}
              onBlur={()=>{ if(phone==="+923") setPhone(""); }}
              onChange={handlePhoneChange}/>
            {phone && phone.length>4 && !/^\+923\d{9}$/.test(phone) && <div className="mp-hint-er">Format: +923XXXXXXXXX</div>}
            {/^\+923\d{9}$/.test(phone) && <div className="mp-hint-ok">✓ Valid</div>}
          </div>
          <div className="mp-field">
            <label className="mp-lbl">NTN Number</label>
            <input className="mp-inp mono" placeholder="1234567-8" value={ntn} onChange={e=>setNtn(e.target.value)}/>
          </div>
          <div className="mp-field">
            <label className="mp-lbl">Logo</label>
            <label style={{cursor:"pointer",display:"block"}}>
              <div className="mp-dropzone" style={{padding:"8px 12px",minHeight:42,display:"flex",alignItems:"center",gap:10}}>
                <input type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0];if(f){setLogo(f);setLogoPrev(URL.createObjectURL(f));}}}/>
                {logoPrev
                  ? <><img src={logoPrev} alt="" style={{width:26,height:26,objectFit:"cover",borderRadius:4,border:"1px solid #e5e7eb",flexShrink:0}}/><span style={{fontSize:12,color:"#374151"}}>{logo?.name}</span></>
                  : <span style={{fontSize:12,color:"#9ca3af"}}>Upload Logo (optional)</span>}
              </div>
            </label>
          </div>
        </div>
      </div>
    );

    if (step === 1) return (
      <div>
        <div style={{fontSize:14,fontWeight:700,color:"#111827",marginBottom:2}}>Security Credentials</div>
        <div style={{fontSize:12,color:"#9ca3af",marginBottom:14}}>CNIC is the login key — password is emailed to the owner</div>
        <div style={{display:"flex",flexDirection:"column",gap:12,maxWidth:400}}>
          <div className="mp-field">
            <label className="mp-lbl">CNIC <em>*</em></label>
            <input className="mp-inp mono" placeholder="XXXXX-XXXXXXX-X" maxLength={15} value={cnic} onChange={handleCnicChange}/>
            <div style={{display:"flex",gap:2,marginTop:4}}>
              {Array.from({length:13},(_,i)=>(
                <div key={i} style={{width:7,height:3,borderRadius:2,background:i<rawCnic.length?"#111827":"#e5e7eb",transition:".1s"}}/>
              ))}
              <span style={{fontSize:9,color:"#9ca3af",marginLeft:4,fontFamily:"'DM Mono',monospace"}}>{rawCnic.length}/13</span>
            </div>
            {rawCnic.length===13 && <div className="mp-hint-ok">✓ Valid CNIC</div>}
          </div>
          <div className="mp-field">
            <label className="mp-lbl">Password <em>*</em></label>
            <div className="mp-pwd-wrap">
              <input className="mp-inp" type={showPwd?"text":"password"} placeholder="Min 8 characters" value={password} onChange={e=>setPassword(e.target.value)} style={{paddingRight:38}}/>
              <EyeBtn show={showPwd} onToggle={()=>setShowPwd(s=>!s)}/>
            </div>
            {password.length>0 && (
              <>
                <div className="mp-pwd-bars" style={{marginTop:4}}>
                  {[1,2,3,4].map(n=><div key={n} className="mp-pwd-bar" style={{background:score>=n?SC[score]:"#f3f4f6"}}/>)}
                </div>
                <div style={{fontSize:10.5,color:SC[score],marginTop:3,fontWeight:600}}>{SL[score]}</div>
              </>
            )}
          </div>
        </div>
        <div className="mp-warn-box" style={{marginTop:12}}>Password will be emailed to <strong>{email}</strong> on creation.</div>
      </div>
    );

    if (step === 2) return (
      <div>
        <div style={{fontSize:14,fontWeight:700,color:"#111827",marginBottom:2}}>Documents</div>
        <div style={{fontSize:12,color:"#9ca3af",marginBottom:12}}>NTN certificate, CNIC copies, trade license — all optional</div>
        <label style={{cursor:"pointer",display:"block",marginBottom:8}}>
          <div className="mp-dropzone">
            <input type="file" multiple accept="image/*,.pdf" onChange={e=>{
              setDocs(p=>[...p,...Array.from(e.target.files).map(f=>({file:f,name:f.name}))]);
            }}/>
            <div style={{fontSize:12.5,color:"#6b7280",marginBottom:2}}>Upload Docs</div>
            <div style={{fontSize:11,color:"#9ca3af"}}>Images & PDF</div>
          </div>
        </label>
        {docs.map((d,i)=>(
          <div key={i} className="mp-doc-item">
            <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span style={{flex:1,fontSize:12,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.name}</span>
            <button type="button" className="mp-doc-rm" onClick={()=>setDocs(p=>p.filter((_,j)=>j!==i))}>
              <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        ))}
        {docs.length===0 && <div style={{fontSize:12,color:"#9ca3af",textAlign:"center",padding:"8px 0"}}>No documents — you can skip this step.</div>}
      </div>
    );

    if (step === 3) return (
      <div>
        <div style={{fontSize:14,fontWeight:700,color:"#111827",marginBottom:2}}>Package & Payment Plan</div>
        <div style={{fontSize:12,color:"#9ca3af",marginBottom:12}}>Select a package and payment schedule</div>
        {packages.length===0 ? (
          <div className="mp-warn-box">No packages available. Create packages first in the Packages section.</div>
        ) : (
          <>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:8,marginBottom:14}}>
              {packages.map(pkg=>(
                <div key={pkg._id} onClick={()=>setPackageId(pkg._id)}
                  className={`pkg-card${packageId===pkg._id?" selected":""}`}
                  style={{"--pc":pkg.color,padding:12}}>
                  <div className="pkg-card-accent"/>
                  <div className="pkg-card-sel-dot"><svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg></div>
                  <div style={{fontSize:8,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:pkg.color,fontFamily:"'DM Mono',monospace",marginBottom:2}}>{pkg.tier}</div>
                  <div style={{fontSize:13,fontWeight:700,color:"#111827",marginBottom:2}}>{pkg.name}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:14,fontWeight:700,color:"#111827",marginBottom:4}}>
                    {fmtPKR(pkg.price)} <span style={{fontSize:10,color:"#9ca3af",fontWeight:400}}>setup</span>
                  </div>
                  {pkg.maintenanceFee>0 && <div style={{fontSize:10,color:pkg.color,fontFamily:"'DM Mono',monospace",marginBottom:5}}>{fmtPKR(pkg.maintenanceFee)}/mo maintenance</div>}
                  {(pkg.features||[]).slice(0,3).map((f,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#374151",marginBottom:2}}>
                      <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke={pkg.color} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      {f}
                    </div>
                  ))}
                  {(pkg.features||[]).length>3 && <div style={{fontSize:10,color:"#9ca3af",marginTop:2}}>+{pkg.features.length-3} more</div>}
                </div>
              ))}
            </div>
            {selPkg && (
              <>
                <div style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:8}}>Setup Fee Payment Schedule</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:12}}>
                  {[
                    {key:"full",      label:"Full",       sub:`${fmtPKR(selPkg.price)} once`},
                    {key:"quarterly", label:"Quarterly",  sub:`${fmtPKR(Math.round(selPkg.price/4))}/qtr`},
                    {key:"biannual",  label:"Bi-Annual",  sub:`${fmtPKR(Math.round(selPkg.price/2))}/6mo`},
                    {key:"annual",    label:"Annual",     sub:`${fmtPKR(selPkg.price)}/yr`},
                  ].map(pt=>(
                    <button key={pt.key} type="button" onClick={()=>setPlanType(pt.key)}
                      style={{border:`1.5px solid ${planType===pt.key?"#111827":"#e5e7eb"}`,background:planType===pt.key?"#111827":"#fff",color:planType===pt.key?"#fff":"#6b7280",borderRadius:7,padding:"8px 5px",cursor:"pointer",textAlign:"center",fontFamily:"'DM Sans',sans-serif",transition:".12s"}}>
                      <div style={{fontSize:11.5,fontWeight:700,marginBottom:2}}>{pt.label}</div>
                      <div style={{fontSize:9.5,opacity:.7}}>{pt.sub}</div>
                    </button>
                  ))}
                </div>
                <div style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:7,padding:"10px 13px"}}>
                  <div style={{fontSize:9,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#9ca3af",fontFamily:"'DM Mono',monospace",marginBottom:7}}>Summary</div>
                  {planType==="full"
                    ? <div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontWeight:700,color:"#111827"}}><span>Setup (one-time)</span><span style={{fontFamily:"'DM Mono',monospace",color:"#15803d"}}>{fmtPKR(selPkg.price)}</span></div>
                    : <><div style={{display:"flex",justifyContent:"space-between",fontSize:12.5,color:"#6b7280",marginBottom:4}}><span>Per installment</span><span style={{fontFamily:"'DM Mono',monospace",fontWeight:600,color:"#374151"}}>{fmtPKR(inst?.per)}</span></div>
                       <div style={{display:"flex",justifyContent:"space-between",fontSize:12.5,color:"#6b7280"}}><span>Total setup</span><span style={{fontFamily:"'DM Mono',monospace",fontWeight:600,color:"#374151"}}>{fmtPKR(selPkg.price)}</span></div></>
                  }
                  {selPkg.maintenanceFee>0 && <div style={{display:"flex",justifyContent:"space-between",fontSize:12.5,color:"#6b7280",paddingTop:5,borderTop:"1px solid #e5e7eb",marginTop:5}}><span>Maintenance / mo</span><span style={{fontFamily:"'DM Mono',monospace",fontWeight:600,color:"#374151"}}>{fmtPKR(selPkg.maintenanceFee)}</span></div>}
                </div>
              </>
            )}
          </>
        )}
      </div>
    );

    if (step === 4) return (
      <div>
        <div style={{fontSize:14,fontWeight:700,color:"#111827",marginBottom:2}}>Review & Confirm</div>
        <div style={{fontSize:12,color:"#9ca3af",marginBottom:12}}>Verify details before creating</div>
        {[
          {title:"Business",rows:[["Business Name",bizName],["Owner",ownerName],["Email",email],["Phone",phone||"—"],["NTN",ntn||"—"]]},
          {title:"Security",rows:[["CNIC",cnic],["Password","•".repeat(Math.min(password.length,16))+" ("+SL[score]+")"]]},
          {title:"Package",rows:[["Package",selPkg?.name||"—"],["Setup Fee",selPkg?fmtPKR(selPkg.price):"—"],["Maintenance",selPkg?.maintenanceFee>0?fmtPKR(selPkg.maintenanceFee)+"/mo":"—"],["Plan",planType.charAt(0).toUpperCase()+planType.slice(1)],["First Payment",inst?fmtPKR(inst.per):"—"]]},
          {title:"Documents",rows:[["Files",docs.length>0?`${docs.length} file(s)`:"None"]]},
        ].map(({title,rows})=>(
          <div key={title} style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:7,marginBottom:7,overflow:"hidden"}}>
            <div style={{padding:"5px 11px",background:"#f3f4f6",borderBottom:"1px solid #e5e7eb",fontSize:10,fontWeight:700,color:"#374151",textTransform:"uppercase",letterSpacing:".08em",fontFamily:"'DM Mono',monospace"}}>{title}</div>
            <div style={{padding:"7px 11px"}}>
              {rows.map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:"1px solid #f3f4f6",fontSize:12.5}}>
                  <span style={{color:"#9ca3af"}}>{k}</span>
                  <span style={{color:"#111827",fontWeight:500,maxWidth:260,textAlign:"right",wordBreak:"break-all"}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="mp-info-box">Welcome email with credentials will be sent to <strong>{email}</strong>.</div>
      </div>
    );
    return null;
  };

  return (
    <div style={{maxWidth:680}}>
      <div className="mp-page-h">Register New Mill</div>
      <div className="mp-page-sub">Onboard a mill — credentials and welcome email sent on creation</div>

      {/* Step indicator */}
      <div style={{display:"flex",alignItems:"center",marginBottom:18}}>
        {STEPS.map((s,i)=>{
          const state = step>i?"done":step===i?"active":"idle";
          return (
            <React.Fragment key={i}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",minWidth:50}}>
                <div style={{width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid ${state==="done"?"#15803d":state==="active"?"#111827":"#e5e7eb"}`,background:state==="done"?"#15803d":state==="active"?"#111827":"#fff",transition:".2s"}}>
                  {state==="done"
                    ? <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    : <span style={{fontSize:10,fontWeight:700,color:state==="active"?"#fff":"#9ca3af",fontFamily:"'DM Mono',monospace"}}>{i+1}</span>}
                </div>
                <div style={{fontSize:8.5,fontWeight:700,marginTop:3,textTransform:"uppercase",letterSpacing:".07em",color:state==="idle"?"#9ca3af":"#111827",whiteSpace:"nowrap",fontFamily:"'DM Mono',monospace"}}>{s.label}</div>
              </div>
              {i<STEPS.length-1 && <div style={{flex:1,height:2,background:step>i?"#15803d":"#e5e7eb",margin:"0 3px 14px",transition:".2s"}}/>}
            </React.Fragment>
          );
        })}
      </div>

      <div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:"20px 22px",marginBottom:12}}>
        {renderStep()}
      </div>

      <div style={{display:"flex",gap:8}}>
        {step>0 && <button className="mp-btn mp-btn-outline" onClick={back} style={{minWidth:78}}>← Back</button>}
        {step<STEPS.length-1
          ? <button className="mp-btn mp-btn-primary" onClick={next} style={{flex:1,justifyContent:"center"}}>Next: {STEPS[step+1].label} →</button>
          : <button className="mp-btn mp-btn-green" onClick={submit} disabled={busy} style={{flex:1,justifyContent:"center"}}>{busy?<><Spin/> Creating…</>:"✓ Create Mill & Send Email"}</button>
        }
      </div>
    </div>
  );
}