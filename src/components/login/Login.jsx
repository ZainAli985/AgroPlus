import React, { useState } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import { useNavigate } from "react-router-dom";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  .lg-root *, .lg-root *::before, .lg-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lg-root {
    min-height: 100vh;
    display: flex;
    font-family: 'DM Sans', sans-serif;
    background: #f9fafb;
  }

  /* ══ LEFT — dark branding panel ══ */
  .lg-left {
    flex: 1;
    background: #111827;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 52px 60px 48px;
    position: relative;
    overflow: hidden;
    min-width: 0;
  }

  /* top accent bar */
  .lg-left::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: #065f46;
  }

  /* subtle dot grid */
  .lg-left::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,.04) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
    z-index: 0;
  }

  .lg-left-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }

  /* brand */
  .lg-brand { display: flex; align-items: center; gap: 12px; }
  .lg-brand-logo {
    width: 40px; height: 40px; border-radius: 9px;
    border: 1px solid rgba(255,255,255,.1);
    overflow: hidden; flex-shrink: 0;
  }
  .lg-brand-logo img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .lg-brand-fb {
    width: 100%; height: 100%;
    background: #065f46;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 14px; font-weight: 700; color: #ffffff;
  }
  .lg-brand-text { display: flex; flex-direction: column; }
  .lg-brand-name {
    font-family: 'DM Sans', sans-serif;
    font-size: 17px; font-weight: 700;
    color: rgba(255,255,255,.92); line-height: 1.2;
  }
  .lg-brand-by {
    font-size: 9px; font-weight: 700;
    letter-spacing: .15em; text-transform: uppercase;
    color: rgba(255,255,255,.28); margin-top: 2px;
  }

  /* copy block */
  .lg-copy { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 48px 0 32px; }
  .lg-tagline {
    font-size: 10px; font-weight: 700; letter-spacing: .18em;
    text-transform: uppercase; color: #065f46;
    margin-bottom: 18px;
    display: flex; align-items: center; gap: 10px;
  }
  .lg-tagline::before {
    content: '';
    display: inline-block;
    width: 24px; height: 2px;
    background: #065f46; border-radius: 2px;
  }
  .lg-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: 46px; font-weight: 700;
    color: rgba(255,255,255,.92);
    line-height: 1.1; letter-spacing: -.6px;
    margin-bottom: 18px;
  }
  .lg-headline em { font-style: italic; color: #6ee7b7; }
  .lg-desc {
    font-size: 13.5px; color: rgba(255,255,255,.45);
    line-height: 1.75; font-weight: 400;
    max-width: 360px; margin-bottom: 32px;
  }

  /* feature list */
  .lg-features { display: flex; flex-direction: column; gap: 10px; }
  .lg-feat {
    display: flex; align-items: center; gap: 10px;
    font-size: 13px; color: rgba(255,255,255,.4); font-weight: 500;
  }
  .lg-feat-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #065f46; flex-shrink: 0;
  }

  /* stamp */
  .lg-left-stamp {
    font-size: 9px; font-weight: 700;
    letter-spacing: .16em; text-transform: uppercase;
    color: rgba(255,255,255,.15);
  }

  /* ══ RIGHT — form panel ══ */
  .lg-right {
    width: 440px;
    flex-shrink: 0;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 52px 52px;
    border-left: 1px solid #e5e7eb;
    box-shadow: -6px 0 24px rgba(0,0,0,.05);
  }

  .lg-form-wrap { width: 100%; }

  /* eyebrow */
  .lg-eyebrow {
    font-size: 10px; font-weight: 700;
    letter-spacing: .2em; text-transform: uppercase;
    color: #065f46; margin-bottom: 7px;
    display: flex; align-items: center; gap: 8px;
  }
  .lg-eyebrow::before {
    content: '';
    display: inline-block;
    width: 18px; height: 2px;
    background: #065f46; border-radius: 2px;
  }

  .lg-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px; font-weight: 700; font-style: italic;
    color: #111827; letter-spacing: -.4px; line-height: 1.1;
    margin-bottom: 6px;
  }
  .lg-sub {
    font-size: 13px; color: #6b7280;
    margin-bottom: 32px; line-height: 1.5;
  }

  /* rule */
  .lg-rule {
    width: 32px; height: 2px;
    background: #e5e7eb; border-radius: 2px;
    margin-bottom: 28px;
  }

  /* field */
  .lg-field { margin-bottom: 20px; }
  .lg-lbl {
    display: flex; align-items: center; gap: 7px;
    font-size: 10px; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: #9ca3af; margin-bottom: 8px;
  }
  .lg-lbl-bar { width: 12px; height: 2px; border-radius: 2px; background: #065f46; }

  .lg-inp-wrap { position: relative; }
  .lg-inp-icon {
    position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
    color: #d1d5db; pointer-events: none; display: flex;
    transition: color .15s;
  }
  .lg-inp {
    width: 100%; padding: 11px 14px 11px 40px;
    border: 1.5px solid #e5e7eb; border-radius: 8px;
    font-size: 13.5px; font-family: 'DM Sans', sans-serif;
    color: #111827; background: #f9fafb;
    outline: none; transition: border-color .15s, background .12s, box-shadow .15s;
  }
  .lg-inp::placeholder { color: #d1d5db; font-style: italic; }
  .lg-inp:focus {
    border-color: #065f46;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(6,95,70,.09);
  }
  .lg-inp-wrap:focus-within .lg-inp-icon { color: #065f46; }

  .lg-cnic-inp {
    font-family: 'DM Mono', monospace !important;
    font-size: 14px !important;
    letter-spacing: .06em;
  }

  /* CNIC progress track */
  .lg-track { display: flex; gap: 3px; margin-top: 7px; align-items: center; }
  .lg-seg {
    flex: 1; height: 3px; border-radius: 3px;
    background: #e5e7eb; transition: background .14s, transform .1s;
  }
  .lg-seg.filled   { background: #6b7280; transform: scaleY(1.15); }
  .lg-seg.complete { background: #059669; transform: scaleY(1.2); box-shadow: 0 0 6px rgba(5,150,105,.25); }
  .lg-count {
    font-family: 'DM Mono', monospace; font-size: 9.5px;
    color: #d1d5db; margin-left: 6px; flex-shrink: 0;
    min-width: 28px; text-align: right; transition: color .15s;
  }

  /* eye toggle */
  .lg-eye {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    color: #d1d5db; display: flex; padding: 3px; transition: color .12s;
  }
  .lg-eye:hover { color: #065f46; }

  /* submit */
  .lg-btn {
    width: 100%; padding: 12px;
    border-radius: 8px; border: none; cursor: pointer;
    background: #065f46; color: #fff;
    font-size: 12.5px; font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: .07em; text-transform: uppercase;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    margin-top: 4px;
    box-shadow: 0 1px 8px rgba(6,95,70,.25);
    transition: background .15s, box-shadow .15s, transform .1s;
  }
  .lg-btn:hover:not(:disabled) {
    background: #047857;
    box-shadow: 0 3px 16px rgba(6,95,70,.35);
    transform: translateY(-1px);
  }
  .lg-btn:active:not(:disabled) { transform: translateY(0); }
  .lg-btn:disabled { opacity: .5; cursor: not-allowed; }

  /* form footer */
  .lg-form-foot {
    margin-top: 32px; padding-top: 20px;
    border-top: 1px solid #f3f4f6;
    display: flex; align-items: center; justify-content: space-between;
  }
  .lg-form-foot-brand { font-size: 8.5px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #d1d5db; }
  .lg-form-foot-copy  { font-size: 8.5px; color: #d1d5db; }

  .lg-spin {
    display: inline-block; width: 13px; height: 13px;
    border: 2px solid rgba(255,255,255,.3); border-top-color: #fff;
    border-radius: 50%; animation: lg-spin .7s linear infinite;
  }
  @keyframes lg-spin { to { transform: rotate(360deg); } }

  @media (max-width: 900px) {
    .lg-left  { display: none; }
    .lg-right { width: 100%; border-left: none; box-shadow: none; padding: 48px 36px; }
  }
  @media (max-width: 480px) { .lg-right { padding: 36px 24px; } }
`;

function formatCnic(raw) {
  const d = raw.replace(/\D/g,"").slice(0,13);
  if (d.length <= 5)  return d;
  if (d.length <= 12) return `${d.slice(0,5)}-${d.slice(5)}`;
  return `${d.slice(0,5)}-${d.slice(5,12)}-${d.slice(12)}`;
}

const FEATURES = [
  "Precision accounting & general ledger",
  "Purchase & sales invoicing",
  "Weight bridge management",
  "Cheque book tracking",
  "Employee payroll & HR",
];

export default function Login() {
  const [cnic,         setCnic]         = useState("");
  const [password,     setPassword]     = useState("");
  const [showPwd,      setShowPwd]      = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [logoError,    setLogoError]    = useState(false);
  const [notification, setNotification] = useState({ message:"", type:"info" });
  const navigate = useNavigate();

  const notify = (msg, type, ms = 3500) => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification({ message: "", type: "info" }), ms);
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
        method: "POST", headers: { "Content-Type": "application/json" },
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
        setTimeout(() => navigate(data.portal === "master" ? "/master" : "/dashboard"), 900);
      } else {
        notify(data.message || "Invalid credentials", "error");
        setLoading(false);
      }
    } catch {
      notify("Server error — please try again", "warning");
      setLoading(false);
    }
  };

  return (
    <>
      <style>{FONTS}{CSS}</style>
      <Notification message={notification.message} type={notification.type}
        onClose={() => setNotification({ message:"", type:"info" })} />

      <div className="lg-root">

        {/* ══ LEFT ══ */}
        <div className="lg-left">
          <div className="lg-left-inner">

            <div className="lg-brand">
              <div className="lg-brand-logo">
                {!logoError
                  ? <img src="/logo.png" alt="Agro Plus" onError={() => setLogoError(true)}/>
                  : <div className="lg-brand-fb">A+</div>}
              </div>
              <div className="lg-brand-text">
                <div className="lg-brand-name">Agro Plus</div>
                <div className="lg-brand-by">by ORCA TECH. AND VENTURES</div>
              </div>
            </div>

            <div className="lg-copy">
              <div className="lg-tagline">Rice Mill Platform</div>
              <h2 className="lg-headline">
                Operations,<br/><em>Simplified.</em>
              </h2>
              <p className="lg-desc">
                The all-in-one management platform for rice mills — precision accounting,
                invoicing, weight bridge, and full team control in one place.
              </p>
              <div className="lg-features">
                {FEATURES.map(f => (
                  <div key={f} className="lg-feat">
                    <span className="lg-feat-dot"/>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg-left-stamp">ORCA TECH. AND VENTURES · AGRO PLUS</div>
          </div>
        </div>

        {/* ══ RIGHT ══ */}
        <div className="lg-right">
          <div className="lg-form-wrap">

            <p className="lg-eyebrow">Secure Access</p>
            <h1 className="lg-heading">Welcome back</h1>
            <p className="lg-sub">Sign in with your CNIC and password</p>
            <div className="lg-rule"/>

            <form onSubmit={handleLogin}>

              {/* CNIC */}
              <div className="lg-field">
                <label className="lg-lbl">
                  <span className="lg-lbl-bar"/>CNIC Number
                </label>
                <div className="lg-inp-wrap">
                  <span className="lg-inp-icon">
                    <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0"/>
                    </svg>
                  </span>
                  <input
                    className="lg-inp lg-cnic-inp"
                    type="text" inputMode="numeric"
                    placeholder="xxxxx-xxxxxxx-x"
                    value={cnic} onChange={handleCnicChange} onKeyDown={handleCnicKeyDown}
                    maxLength={15} autoFocus autoComplete="off"
                  />
                </div>
                <div className="lg-track">
                  {Array.from({length:13}, (_,i) => (
                    <div key={i} className={`lg-seg${i<cnicDigits?(cnicDone?" complete":" filled"):""}`}/>
                  ))}
                  <span className="lg-count" style={cnicDone?{color:"#059669"}:{}}>{cnicDigits}/13</span>
                </div>
              </div>

              {/* Password */}
              <div className="lg-field">
                <label className="lg-lbl">
                  <span className="lg-lbl-bar"/>Password
                </label>
                <div className="lg-inp-wrap">
                  <span className="lg-inp-icon">
                    <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </span>
                  <input
                    className="lg-inp"
                    type={showPwd ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password} onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    style={{paddingRight:42}}
                  />
                  <button type="button" className="lg-eye" onClick={() => setShowPwd(s=>!s)} tabIndex={-1}>
                    {showPwd
                      ? <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                      : <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    }
                  </button>
                </div>
              </div>

              <button type="submit" className="lg-btn" disabled={loading}>
                {loading
                  ? <><div className="lg-spin"/> Authenticating…</>
                  : <>
                      <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                      </svg>
                      Sign In to Dashboard
                    </>
                }
              </button>

            </form>

            <div className="lg-form-foot">
              <span className="lg-form-foot-brand">ORCA TECH. &amp; VENTURES</span>
              <span className="lg-form-foot-copy">© {new Date().getFullYear()} Agro Plus</span>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}