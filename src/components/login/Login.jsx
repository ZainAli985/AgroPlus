import React, { useState } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import { useNavigate } from "react-router-dom";

/* ─── Fonts ── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

/* ─── CSS ── */
const CSS = `
  /* ── ORCA theme tokens ── */
  :root {
    --oc-black:    #0B0C0D;
    --oc-dark:     #141A1F;
    --oc-navy:     #212A37;
    --oc-blue:     #253240;
    --oc-slate:    #334455;
    --oc-steel:    #6E7170;
    --oc-silver:   #A5A8A6;
    --oc-light:    #DADADA;
    --oc-bg:       #F5F5F5;
    --oc-gold:     #C9A85A;
    --oc-gold-dim: #B8964A;
    --oc-gold-hi:  #D1B36A;
    --oc-white:    #FFFFFF;
  }

  .lo *, .lo *::before, .lo *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lo {
    min-height: 100vh;
    display: flex;
    font-family: 'DM Sans', sans-serif;
    background: var(--oc-black);
  }

  /* ══ LEFT PANEL ══ */
  .lo-left {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px;
    overflow: hidden;
    background: linear-gradient(145deg, #0B0C0D 0%, #141A1F 40%, #1F2A37 80%, #141A1F 100%);
  }

  /* Grid removed — clean dark background */

  /* Radial glow spots */
  .lo-glow-1 {
    position: absolute; top: -120px; right: -80px;
    width: 480px; height: 480px; border-radius: 50%; pointer-events: none;
    background: radial-gradient(circle, rgba(201,168,90,.08) 0%, transparent 65%);
  }
  .lo-glow-2 {
    position: absolute; bottom: -100px; left: -80px;
    width: 360px; height: 360px; border-radius: 50%; pointer-events: none;
    background: radial-gradient(circle, rgba(33,42,55,.8) 0%, transparent 70%);
  }

  /* Top-left brand mark */
  .lo-brand { position: relative; z-index: 2; display: flex; align-items: center; gap: 12px; }
  .lo-brand-logo {
    width: 42px; height: 42px; border-radius: 10px; overflow: hidden;
    border: 1px solid rgba(201,168,90,.25);
    box-shadow: 0 0 20px rgba(201,168,90,.12);
    flex-shrink: 0;
  }
  .lo-brand-logo img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .lo-brand-logo-fb {
    width: 100%; height: 100%;
    background: linear-gradient(135deg, #212A37, #334455);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif; font-size: 15px; font-weight: 700;
    color: var(--oc-gold); letter-spacing: -.2px;
  }
  .lo-brand-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 17px; font-weight: 700; color: var(--oc-white); letter-spacing: -.2px;
  }
  .lo-brand-name em { font-style: italic; color: var(--oc-gold); }
  .lo-brand-tag {
    font-size: 9px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase;
    color: rgba(201,168,90,.5); margin-top: 1px;
  }

  /* Centre illustration */
  .lo-art { position: relative; z-index: 2; flex: 1; display: flex; align-items: center; justify-content: center; }

  /* Bottom copy */
  .lo-copy { position: relative; z-index: 2; }
  .lo-copy-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: 38px; font-weight: 700; color: var(--oc-white);
    letter-spacing: -.8px; line-height: 1.1; margin-bottom: 14px;
  }
  .lo-copy-headline em { font-style: italic; color: var(--oc-gold); }
  .lo-copy-sub {
    font-size: 13.5px; color: var(--oc-steel); line-height: 1.65;
    max-width: 380px; font-weight: 400;
  }
  .lo-copy-pills {
    display: flex; gap: 10px; margin-top: 28px; flex-wrap: wrap;
  }
  .lo-pill {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 6px 14px; border-radius: 20px; font-size: 11.5px; font-weight: 600;
    background: rgba(201,168,90,.08); color: rgba(201,168,90,.75);
    border: 1px solid rgba(201,168,90,.18); letter-spacing: .01em;
  }
  .lo-pill-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--oc-gold); opacity: .7; }

  /* ══ RIGHT PANEL ══ */
  .lo-right {
    width: 460px; flex-shrink: 0;
    background: var(--oc-bg);
    display: flex; flex-direction: column; justify-content: center;
    padding: 60px 48px;
    position: relative;
    overflow: hidden;
  }

  /* Subtle corner accent */
  .lo-right::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, #0B0C0D, #C9A85A 40%, #334455);
  }
  .lo-right-bg { display: none; }

  /* Form content */
  .lo-form-wrap { position: relative; z-index: 1; }

  .lo-eyebrow {
    font-size: 10px; font-weight: 700; letter-spacing: .2em;
    text-transform: uppercase; color: var(--oc-gold); margin-bottom: 8px;
  }
  .lo-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px; font-weight: 700; color: var(--oc-black);
    letter-spacing: -.5px; line-height: 1.1; margin-bottom: 6px;
  }
  .lo-title em { font-style: italic; }
  .lo-subtitle {
    font-size: 13px; color: var(--oc-steel); margin-bottom: 36px;
    line-height: 1.55; font-weight: 400;
  }

  /* Fields */
  .lo-field { margin-bottom: 20px; }
  .lo-label {
    display: flex; align-items: center; gap: 7px;
    font-size: 10px; font-weight: 700; letter-spacing: .12em;
    text-transform: uppercase; color: var(--oc-navy); margin-bottom: 9px;
  }
  .lo-label-bar {
    width: 16px; height: 2px; border-radius: 2px;
    background: var(--oc-gold);
  }

  .lo-input-wrap { position: relative; }
  .lo-input-icon {
    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
    color: var(--oc-silver); pointer-events: none; display: flex;
    transition: color .15s;
  }
  .lo-input {
    width: 100%; padding: 13px 14px 13px 42px;
    border-radius: 10px; outline: none;
    font-size: 14px; font-family: 'DM Sans', sans-serif; color: var(--oc-black);
    background: var(--oc-white);
    border: 1.5px solid #E3E3E3;
    box-shadow: 0 1px 3px rgba(11,12,13,.06);
    transition: border-color .15s, box-shadow .15s;
  }
  .lo-input::placeholder { color: #BEBFBD; }
  .lo-input:focus {
    border-color: var(--oc-navy);
    box-shadow: 0 0 0 3px rgba(33,42,55,.1);
  }
  .lo-input-wrap:focus-within .lo-input-icon { color: var(--oc-navy); }

  /* CNIC mono */
  .lo-cnic { font-family: 'DM Mono', monospace !important; font-size: 14px !important; letter-spacing: .1em; }

  /* CNIC progress track */
  .lo-cnic-track {
    display: flex; gap: 3px; margin-top: 9px; align-items: center;
  }
  .lo-cnic-seg {
    flex: 1; height: 3px; border-radius: 3px;
    background: #E3E3E3; transition: background .15s, transform .1s;
  }
  .lo-cnic-seg.filled  { background: var(--oc-navy); transform: scaleY(1.1); }
  .lo-cnic-seg.complete { background: #22c55e; transform: scaleY(1.2); box-shadow: 0 0 6px rgba(34,197,94,.4); }
  .lo-cnic-count {
    font-family: 'DM Mono', monospace; font-size: 10px;
    color: var(--oc-silver); margin-left: 6px; flex-shrink: 0;
    min-width: 28px; text-align: right;
    transition: color .2s;
  }

  /* Eye toggle */
  .lo-eye {
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    color: var(--oc-silver); transition: color .12s; display: flex; padding: 3px;
  }
  .lo-eye:hover { color: var(--oc-navy); }

  /* Submit button */
  .lo-btn {
    width: 100%; padding: 14px;
    border-radius: 10px; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 9px;
    font-size: 13px; font-weight: 700; font-family: 'DM Sans', sans-serif;
    letter-spacing: .08em; text-transform: uppercase; margin-top: 8px;
    position: relative; overflow: hidden;
    background: var(--oc-navy);
    color: var(--oc-white);
    box-shadow: 0 4px 20px rgba(33,42,55,.3);
    transition: background .18s, box-shadow .18s, transform .1s;
  }
  .lo-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, transparent 40%, rgba(201,168,90,.12) 100%);
    pointer-events: none;
  }
  .lo-btn:hover {
    background: #1F2A37;
    box-shadow: 0 6px 28px rgba(33,42,55,.4);
  }
  .lo-btn:hover .lo-btn-gold { width: 100%; }
  .lo-btn:active { transform: scale(.99); }
  .lo-btn:disabled { opacity: .6; cursor: not-allowed; transform: none; }

  /* Gold sweep on hover */
  .lo-btn-gold {
    position: absolute; bottom: 0; left: 0; height: 2px; width: 0;
    background: linear-gradient(90deg, var(--oc-gold-dim), var(--oc-gold-hi));
    transition: width .35s cubic-bezier(.4,0,.2,1);
    border-radius: 0 0 10px 10px;
  }

  /* Divider */
  .lo-field-divider {
    display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
  }
  .lo-field-divider-line { flex: 1; height: 1px; background: #E3E3E3; }
  .lo-field-divider-text { font-size: 10.5px; color: var(--oc-silver); font-weight: 500; }

  /* Footer */
  .lo-footer {
    margin-top: 32px; padding-top: 20px;
    border-top: 1px solid #E3E3E3;
    display: flex; align-items: center; justify-content: space-between;
  }
  .lo-footer-brand {
    font-size: 10px; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: var(--oc-light);
  }
  .lo-footer-copy {
    font-size: 10px; color: #BEBFBD;
  }

  /* Spinner */
  @keyframes lo-spin { to { transform: rotate(360deg); } }
  .lo-spin {
    display: inline-block; width: 14px; height: 14px;
    border: 2px solid rgba(255,255,255,.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: lo-spin .7s linear infinite;
  }

  @media (max-width: 900px) {
    .lo-left { display: none; }
    .lo-right { width: 100%; min-height: 100vh; padding: 40px 28px; }
  }
  @media (max-width: 480px) {
    .lo-right { padding: 32px 20px; }
    .lo-title { font-size: 26px; }
  }
`;

/* ─── Logo display ── */
const OrcaLogo = () => {
  const [imgError, setImgError] = React.useState(false);
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:28 }}>
      {/* Logo — user places c-logo.png or c-logo.pdf export in /public */}
      {!imgError ? (
        <img
          src="/c-logo.png"
          alt="ORCA"
          onError={() => setImgError(true)}
          style={{
            width: "100%", maxWidth: 340,
            filter: "brightness(0) invert(1) opacity(0.92)",
            dropShadow: "0 0 40px rgba(201,168,90,.3)",
          }}
        />
      ) : (
        /* Fallback: inline ORCA wordmark if image missing */
        <svg viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ width:"100%", maxWidth:340 }}>
          {/* Orca silhouette */}
          <ellipse cx="180" cy="100" rx="72" ry="42" fill="#141A1F"/>
          <ellipse cx="218" cy="91" rx="42" ry="28" fill="#141A1F"/>
          <ellipse cx="230" cy="83" rx="11" ry="8" fill="rgba(245,245,245,.88)"/>
          <circle cx="232" cy="83" r="4" fill="#0B0C0D"/>
          <circle cx="233.5" cy="81.5" r="1.2" fill="white"/>
          <path d="M 166 60 Q 174 30 183 58 L 180 60 Z" fill="#141A1F"/>
          <path d="M 108 100 Q 90 85 80 93 Q 90 102 80 112 Q 90 118 108 104 Z" fill="#141A1F"/>
          <ellipse cx="186" cy="110" rx="54" ry="17" fill="rgba(220,220,220,.06)"/>
          {/* Gold circuit lines */}
          <path d="M 155 96 L 168 90 L 182 96 L 196 90" stroke="rgba(201,168,90,.45)" strokeWidth="1" fill="none"/>
          <circle cx="168" cy="90" r="1.8" fill="rgba(201,168,90,.6)"/>
          <circle cx="182" cy="96" r="1.8" fill="rgba(201,168,90,.6)"/>
          {/* ORCA text */}
          <text x="180" y="165" fontFamily="'Cormorant Garamond', serif" fontSize="42"
            fontWeight="700" fill="rgba(245,245,245,.88)" textAnchor="middle" letterSpacing="8">
            ORCA
          </text>
          <text x="180" y="183" fontFamily="'DM Mono', monospace" fontSize="9"
            fill="rgba(201,168,90,.55)" textAnchor="middle" letterSpacing="5">
            TECH. AND VENTURES
          </text>
          {/* Decorative line under text */}
          <line x1="120" y1="170" x2="156" y2="170" stroke="rgba(201,168,90,.2)" strokeWidth="0.5"/>
          <line x1="204" y1="170" x2="240" y2="170" stroke="rgba(201,168,90,.2)" strokeWidth="0.5"/>
        </svg>
      )}
      {/* Decorative ring around logo area */}
      <div style={{
        position:"absolute", width:360, height:360, borderRadius:"50%",
        border:"1px solid rgba(201,168,90,.06)",
        pointerEvents:"none",
      }}/>
    </div>
  );
};

/* ─── Formatting ── */
function formatCnic(raw) {
  const d = raw.replace(/\D/g,"").slice(0,13);
  if (d.length <= 5)  return d;
  if (d.length <= 12) return `${d.slice(0,5)}-${d.slice(5)}`;
  return `${d.slice(0,5)}-${d.slice(5,12)}-${d.slice(12)}`;
}

/* ─── Login component ── */
export default function Login() {
  const [cnic,         setCnic]         = useState("");
  const [password,     setPassword]     = useState("");
  const [showPwd,      setShowPwd]      = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [logoError,    setLogoError]    = useState(false);
  const [notification, setNotification] = useState({ message:"", type:"info" });
  const navigate = useNavigate();

  const notify = (message, type, ms=3500) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message:"", type:"info" }), ms);
  };

  const cnicDigits = cnic.replace(/\D/g,"").length;
  const cnicDone   = cnicDigits === 13;

  const handleCnicChange  = e => setCnic(formatCnic(e.target.value.replace(/\D/g,"")));
  const handleCnicKeyDown = e => {
    if (e.key === "Backspace") {
      const raw = cnic.replace(/\D/g,"");
      if (raw.length > 0) { e.preventDefault(); setCnic(formatCnic(raw.slice(0,-1))); }
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    const rawDigits = cnic.replace(/\D/g,"");
    if (rawDigits.length !== 13) { notify("Please enter a valid 13-digit CNIC","warning"); return; }
    if (!password.trim())        { notify("Please enter your password","warning"); return; }
    setLoading(true);
    try {
      const res  = await fetch(`${API_BASE_URL}/login`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ cnic: rawDigits, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token",         data.token);
        localStorage.setItem("role",          data.role);
        localStorage.setItem("name",          data.name);
        localStorage.setItem("millId",        data.millId);
        localStorage.setItem("businessName",  data.businessName);
        localStorage.setItem("logoUrl",       data.logoUrl || "");
        localStorage.setItem("allowedRoutes", JSON.stringify(data.allowedRoutes));
        notify(data.message || "Welcome back!", "success");
        const dest = data.portal === "master" ? "/master" : "/dashboard";
        setTimeout(() => navigate(dest), 900);
      } else {
        notify(data.message || "Invalid credentials", "error");
        setLoading(false);
      }
    } catch {
      notify("Server error — please try again","warning");
      setLoading(false);
    }
  };

  return (
    <>
      <style>{FONTS}{CSS}</style>
      <Notification message={notification.message} type={notification.type}
        onClose={() => setNotification({ message:"", type:"info" })} />

      <div className="lo">

        {/* ══ LEFT PANEL ══ */}
        <div className="lo-left">

          <div className="lo-glow-1"/> <div className="lo-glow-2"/>

          {/* Top brand */}
          <div className="lo-brand">
            <div className="lo-brand-logo">
              {!logoError
                ? <img src="/logo.png" alt="Agro Plus" onError={() => setLogoError(true)}/>
                : <div className="lo-brand-logo-fb">A+</div>}
            </div>
            <div>
              <div className="lo-brand-name">Agro <em>Plus</em></div>
              <div className="lo-brand-tag">by ORCA TECH</div>
            </div>
          </div>

          {/* Logo illustration */}
          <div className="lo-art" style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <OrcaLogo/>
          </div>

          {/* Bottom copy */}
          <div className="lo-copy">
            <h2 className="lo-copy-headline">
              Rice Mill<br/><em>Operations,</em><br/>Simplified.
            </h2>
            <p className="lo-copy-sub">
              The all-in-one accounting and operations platform built for rice mills —
              from paddy intake to final sale, every transaction accounted for.
            </p>
            <div className="lo-copy-pills">
              {[
                "Analytical Reports",
                "Employee Management",
                "Weight Bridge",
                // "Cheque Tracking",
                // "Weight Bridge",
                // "Financial Reports",
              ].map(t => (
                <span key={t} className="lo-pill">
                  <span className="lo-pill-dot"/>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div className="lo-right">


          <div className="lo-form-wrap">
            <p className="lo-eyebrow">Secure Access</p>
            <h1 className="lo-title">Sign <em>in</em></h1>
            <p className="lo-subtitle">Enter your credentials to access the dashboard</p>

            <form onSubmit={handleLogin}>

              {/* CNIC */}
              <div className="lo-field">
                <label className="lo-label">
                  <span className="lo-label-bar"/>
                  CNIC Number
                </label>
                <div className="lo-input-wrap">
                  <span className="lo-input-icon">
                    <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0"/>
                    </svg>
                  </span>
                  <input className="lo-input lo-cnic" type="text" inputMode="numeric"
                    placeholder="xxxxx-xxxxxxx-x"
                    value={cnic} onChange={handleCnicChange} onKeyDown={handleCnicKeyDown}
                    maxLength={15} autoFocus autoComplete="off"/>
                </div>
                <div className="lo-cnic-track">
                  {Array.from({length:13},(_,i) => (
                    <div key={i} className={`lo-cnic-seg${i < cnicDigits ? (cnicDone?" complete":" filled") : ""}`}/>
                  ))}
                  <span className="lo-cnic-count">{cnicDigits}/13</span>
                </div>
              </div>

              {/* Password */}
              <div className="lo-field">
                <label className="lo-label">
                  <span className="lo-label-bar"/>
                  Password
                </label>
                <div className="lo-input-wrap">
                  <span className="lo-input-icon">
                    <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </span>
                  <input className="lo-input" type={showPwd?"text":"password"}
                    placeholder="Enter your password"
                    value={password} onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password" style={{ paddingRight:44 }}/>
                  <button type="button" className="lo-eye" onClick={() => setShowPwd(s=>!s)} tabIndex={-1}>
                    {showPwd
                      ? <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                      : <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    }
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="lo-btn" disabled={loading}>
                <div className="lo-btn-gold"/>
                {loading ? (
                  <><div className="lo-spin"/> Authenticating…</>
                ) : (
                  <>
                    <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                    </svg>
                    Sign In
                  </>
                )}
              </button>

            </form>

            {/* Footer */}
            <div className="lo-footer">
              <span className="lo-footer-brand">ORCA TECH. &amp; VENTURES</span>
              <span className="lo-footer-copy">© {new Date().getFullYear()} Agro Plus</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}