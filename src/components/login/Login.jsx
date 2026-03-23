import React, { useState } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import { useNavigate } from "react-router-dom";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  :root {
    --oc-black:#0B0C0D; --oc-dark:#141A1F; --oc-navy:#212A37;
    --oc-slate:#253240; --oc-steel:#334455; --oc-mid:#6E7170;
    --oc-silver:#A5A8A6; --oc-light:#DADADA;
    --oc-gold:#929183; --oc-g2:#7A7970; --oc-g3:#A8A79F;
    --oc-white:#FFFFFF;
  }

  .lg *, .lg *::before, .lg *::after { box-sizing:border-box; margin:0; padding:0; }

  /* ══ ROOT — full-bleed dark canvas, two-column ══ */
  .lg {
    min-height:100vh;
    display:flex;
    font-family:'DM Sans',sans-serif;
    position:relative; overflow:hidden;
    background:linear-gradient(125deg,#0B0C0D 0%,#0E1318 22%,#111B26 50%,#0D1520 78%,#0B0C0D 100%);
  }

  /* ── BG orbs ── */
  .lg-orb { position:absolute;border-radius:50%;pointer-events:none;filter:blur(90px); }
  .lg-orb-1 { width:700px;height:700px;top:-220px;left:-160px;
    background:radial-gradient(circle,rgba(146,145,131,.11) 0%,transparent 65%); }
  .lg-orb-2 { width:560px;height:560px;bottom:-180px;right:-120px;
    background:radial-gradient(circle,rgba(33,42,55,.85) 0%,rgba(14,19,26,.5) 55%,transparent 80%); }
  .lg-orb-3 { width:400px;height:400px;top:30%;left:42%;
    background:radial-gradient(circle,rgba(146,145,131,.055) 0%,transparent 70%); }
  .lg-orb-4 { width:300px;height:300px;top:10%;right:38%;
    background:radial-gradient(circle,rgba(37,50,64,.5) 0%,transparent 70%); }

  /* ── Dot grid ── */
  .lg-dots {
    position:absolute;inset:0;pointer-events:none;
    background-image:radial-gradient(circle,rgba(146,145,131,.07) 1px,transparent 1px);
    background-size:36px 36px;
    mask-image:radial-gradient(ellipse 100% 100% at 50% 50%,black 20%,transparent 100%);
  }

  /* ── Particles ── */
  .lg-particle { position:absolute;border-radius:50%;background:rgba(146,145,131,.32);animation:lg-rise linear infinite;pointer-events:none; }
  @keyframes lg-rise {
    0%   {transform:translateY(0) scale(1);opacity:0;}
    8%   {opacity:.9;}
    90%  {opacity:.4;}
    100% {transform:translateY(-100vh) scale(.4);opacity:0;}
  }

  /* ── Circuit SVG ── */
  .lg-circuit { position:absolute;inset:0;pointer-events:none;opacity:.55; }

  /* ══ LEFT PANEL ══ */
  .lg-left {
    flex:1;
    position:relative; z-index:2;
    display:flex;flex-direction:column;justify-content:space-between;
    padding:52px 56px;
    /* subtle separator */
    border-right:1px solid rgba(146,145,131,.07);
    min-height:100vh;
    padding:40px 48px;
  }

  /* top brand */
  .lg-brand { display:flex;align-items:center;gap:13px; }
  .lg-brand-logo {
    width:46px;height:46px;border-radius:12px;overflow:hidden;flex-shrink:0;
    border:1px solid rgba(146,145,131,.3);
    box-shadow:0 4px 20px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.05);
  }
  .lg-brand-logo img {width:100%;height:100%;object-fit:cover;display:block;}
  .lg-brand-fb {
    width:100%;height:100%;background:linear-gradient(135deg,#212A37,#334455);
    display:flex;align-items:center;justify-content:center;
    font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:700;color:#929183;
  }
  .lg-brand-text { display:flex;flex-direction:column; }
  .lg-brand-name { font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;color:rgba(255,255,255,.92);letter-spacing:-.2px;line-height:1.1; }
  .lg-brand-name em { font-style:italic;color:#929183; }
  .lg-brand-tag { font-size:8.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(146,145,131,.5);margin-top:2px; }

  /* ORCA art area */
  .lg-art {
    flex:1;
    display:flex;align-items:center;justify-content:center;
    position:relative;padding:32px 0;
  }

  /* bottom copy */
  .lg-headline {
    font-family:'Cormorant Garamond',serif;
    font-size:42px;font-weight:700;color:rgba(255,255,255,.92);
    letter-spacing:-.8px;line-height:1.1;margin-bottom:16px;
  }
  .lg-headline em { font-style:italic;color:#929183; }
  .lg-sub-copy { font-size:13.5px;color:rgba(110,113,112,.95);line-height:1.65;max-width:420px;font-weight:400; }
  .lg-pills { display:flex;gap:8px;margin-top:18px;flex-wrap:wrap; }
  .lg-pill {
    display:inline-flex;align-items:center;gap:7px;
    padding:5px 13px;border-radius:20px;font-size:11px;font-weight:600;
    background:rgba(146,145,131,.07);color:rgba(146,145,131,.7);
    border:1px solid rgba(146,145,131,.15);letter-spacing:.01em;
  }
  .lg-pill-dot { width:5px;height:5px;border-radius:50%;background:#929183;opacity:.7; }

  /* ══ RIGHT PANEL ══ */
  .lg-right {
    width:480px;flex-shrink:0;
    position:relative;z-index:2;
    display:flex;align-items:center;justify-content:center;
    min-height:100vh;
    padding:40px 28px;
  }

  /* glass card — compact floating card */
  .lg-card {
    width:100%;max-width:420px;
    position:relative;
    overflow:hidden;
    border-radius:18px;

    /* glass */
    background:rgba(11,16,21,.72);
    backdrop-filter:blur(32px) saturate(150%);
    -webkit-backdrop-filter:blur(32px) saturate(150%);
    border:1px solid rgba(146,145,131,.2);
    box-shadow:0 32px 80px rgba(0,0,0,.5), 0 8px 24px rgba(0,0,0,.3),
               inset 0 1px 0 rgba(255,255,255,.06);
  }

  /* top sheen line */
  .lg-card::before {
    content:'';position:absolute;top:0;left:0;right:0;height:1px;z-index:1;
    background:linear-gradient(90deg,transparent 5%,rgba(146,145,131,.6) 50%,transparent 95%);
  }

  /* accent bar */
  .lg-accent { display:flex;height:3px;position:relative;z-index:2;border-radius:18px 18px 0 0; }
  .lg-accent-seg { flex:1; }

  /* card inner */
  .lg-body {
    display:flex;flex-direction:column;
    padding:32px 36px 36px;
    position:relative;z-index:2;
  }

  /* card brand row */
  .lg-cbrand { display:flex;align-items:center;gap:12px;margin-bottom:20px; }
  .lg-cbrand-logo {
    width:42px;height:42px;border-radius:10px;overflow:hidden;flex-shrink:0;
    border:1px solid rgba(146,145,131,.28);
    box-shadow:0 4px 16px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.04);
  }
  .lg-cbrand-logo img {width:100%;height:100%;object-fit:cover;display:block;}
  .lg-cbrand-fb {
    width:100%;height:100%;background:linear-gradient(135deg,#212A37,#334455);
    display:flex;align-items:center;justify-content:center;
    font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:700;color:#929183;
  }
  .lg-cbrand-name { font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:700;color:rgba(255,255,255,.9);letter-spacing:-.2px;line-height:1.1; }
  .lg-cbrand-name em { font-style:italic;color:#929183; }
  .lg-cbrand-tag { font-size:8.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(146,145,131,.5);margin-top:2px; }

  /* ORCA mini logo in card */
  .lg-orca-mini {
    display:flex;align-items:center;justify-content:center;
    margin-bottom:28px;
  }

  .lg-divider { height:1px;background:linear-gradient(90deg,transparent,rgba(146,145,131,.18),transparent);margin-bottom:28px; }

  .lg-eyebrow { font-size:9.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#929183;margin-bottom:6px; }
  .lg-heading {
    font-family:'Cormorant Garamond',serif;
    font-size:30px;font-weight:700;font-style:italic;
    color:rgba(255,255,255,.92);letter-spacing:-.3px;line-height:1.1;margin-bottom:6px;
  }
  .lg-sub { font-size:12.5px;color:rgba(165,168,166,.6);margin-bottom:28px;line-height:1.5; }

  /* fields */
  .lg-field { margin-bottom:18px; }
  .lg-label { display:flex;align-items:center;gap:7px;font-size:9.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(146,145,131,.75);margin-bottom:8px; }
  .lg-label-bar { width:14px;height:2px;border-radius:2px;background:#929183;opacity:.7; }

  .lg-inp-wrap { position:relative; }
  .lg-inp-icon { position:absolute;left:13px;top:50%;transform:translateY(-50%);color:rgba(146,145,131,.4);pointer-events:none;display:flex;transition:color .15s; }
  .lg-inp {
    width:100%;padding:12px 14px 12px 40px;
    border-radius:10px;outline:none;
    font-size:13.5px;font-family:'DM Sans',sans-serif;
    color:rgba(245,245,245,.92);
    background:rgba(255,255,255,.055);
    border:1.5px solid rgba(146,145,131,.14);
    transition:border-color .15s,box-shadow .15s,background .15s;
  }
  .lg-inp::placeholder { color:rgba(165,168,166,.33);font-style:italic; }
  .lg-inp:focus { border-color:rgba(146,145,131,.55);box-shadow:0 0 0 3px rgba(146,145,131,.1);background:rgba(255,255,255,.08); }
  .lg-inp-wrap:focus-within .lg-inp-icon { color:rgba(146,145,131,.8); }

  .lg-cnic { font-family:'DM Mono',monospace !important;font-size:14px !important;letter-spacing:.1em; }

  .lg-track { display:flex;gap:3px;margin-top:8px;align-items:center; }
  .lg-seg { flex:1;height:3px;border-radius:3px;background:rgba(255,255,255,.08);transition:background .15s,transform .1s; }
  .lg-seg.filled   { background:rgba(146,145,131,.68);transform:scaleY(1.1); }
  .lg-seg.complete { background:#22c55e;transform:scaleY(1.2);box-shadow:0 0 6px rgba(34,197,94,.45); }
  .lg-count { font-family:'DM Mono',monospace;font-size:10px;color:rgba(165,168,166,.42);margin-left:6px;flex-shrink:0;min-width:28px;text-align:right; }

  .lg-eye { position:absolute;right:13px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:rgba(146,145,131,.38);transition:color .12s;display:flex;padding:3px; }
  .lg-eye:hover { color:rgba(146,145,131,.85); }

  /* submit */
  .lg-btn {
    width:100%;padding:13px;border-radius:10px;border:none;cursor:pointer;
    display:flex;align-items:center;justify-content:center;gap:9px;
    font-size:12.5px;font-weight:700;font-family:'DM Sans',sans-serif;
    letter-spacing:.08em;text-transform:uppercase;
    margin-top:16px;position:relative;overflow:hidden;
    background:linear-gradient(135deg,#212A37 0%,#253240 50%,#929183 100%);
    background-size:200% 100%;background-position:0% 0%;
    color:#fff;
    box-shadow:0 4px 24px rgba(33,42,55,.5),inset 0 1px 0 rgba(146,145,131,.15);
    transition:background-position .4s,box-shadow .2s,transform .1s;
  }
  .lg-btn:hover { background-position:100% 0%;box-shadow:0 6px 32px rgba(146,145,131,.3),inset 0 1px 0 rgba(146,145,131,.2); }
  .lg-btn:active { transform:scale(.99); }
  .lg-btn:disabled { opacity:.55;cursor:not-allowed;transform:none; }
  .lg-btn::after { content:'';position:absolute;top:0;left:-100%;width:55%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);transform:skewX(-20deg);transition:left .5s; }
  .lg-btn:hover::after { left:160%; }

  /* footer */
  .lg-footer { margin-top:28px;padding-top:20px;border-top:1px solid rgba(146,145,131,.1);display:flex;align-items:center;justify-content:space-between; }
  .lg-footer-brand { font-size:9.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(146,145,131,.32); }
  .lg-footer-copy  { font-size:9.5px;color:rgba(165,168,166,.28); }

  /* feature strips at bottom of card */
  .lg-features { margin-top:28px; display:flex;flex-direction:column;gap:8px; }
  .lg-feature-row { display:flex;align-items:center;gap:10px; }
  .lg-feature-dot { width:5px;height:5px;border-radius:50%;background:rgba(146,145,131,.5);flex-shrink:0; }
  .lg-feature-text { font-size:11.5px;color:rgba(165,168,166,.55);font-weight:500; }

  /* watermark */
  .lg-watermark { position:absolute;z-index:3;bottom:28px;left:40px;display:flex;flex-direction:column;gap:3px; }
  .lg-wm-title { font-family:'Cormorant Garamond',serif;font-size:13px;font-style:italic;color:rgba(146,145,131,.25);letter-spacing:.02em; }
  .lg-wm-sub   { font-size:8px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(146,145,131,.14); }

  @keyframes lg-spin {to{transform:rotate(360deg);}}
  .lg-spin { display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,.25);border-top-color:#fff;border-radius:50%;animation:lg-spin .7s linear infinite; }

  @media (max-width:960px) {
    .lg-left { display:none; }
    .lg-right { width:100%; }
    .lg-body { padding:48px 36px; }
  }
  @media (max-width:960px) { .lg-left { display:none; } .lg-right { width:100%;padding:24px 16px; } }
  @media (max-width:480px) {
    .lg-body { padding:36px 24px; }
    .lg-heading { font-size:26px; }
    .lg-watermark { display:none; }
  }
`;

const PARTICLES = [
  {left:"5%", size:3,  dur:"22s",delay:"0s" },{left:"13%",size:2.5,dur:"28s",delay:"5s" },
  {left:"26%",size:4,  dur:"19s",delay:"9s" },{left:"40%",size:2.5,dur:"32s",delay:"2s" },
  {left:"54%",size:3,  dur:"24s",delay:"7s" },{left:"67%",size:4,  dur:"17s",delay:"11s"},
  {left:"79%",size:2.5,dur:"26s",delay:"4s" },{left:"90%",size:3,  dur:"20s",delay:"8s" },
  {left:"34%",size:2,  dur:"30s",delay:"13s"},{left:"60%",size:2.5,dur:"23s",delay:"6s" },
  {left:"19%",size:3.5,dur:"21s",delay:"3s" },{left:"74%",size:2,  dur:"27s",delay:"10s"},
];

function formatCnic(raw) {
  const d = raw.replace(/\D/g,"").slice(0,13);
  if (d.length <= 5)  return d;
  if (d.length <= 12) return `${d.slice(0,5)}-${d.slice(5)}`;
  return `${d.slice(0,5)}-${d.slice(5,12)}-${d.slice(12)}`;
}



export default function Login() {
  const [cnic,         setCnic]         = useState("");
  const [password,     setPassword]     = useState("");
  const [showPwd,      setShowPwd]      = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [logoError,    setLogoError]    = useState(false);
  const [cLogoError,   setCLogoError]   = useState(false);
  const [notification, setNotification] = useState({ message:"", type:"info" });
  const navigate = useNavigate();

  const notify = (msg, type, ms=3500) => {
    setNotification({ message:msg, type });
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

      <div className="lg">

        {/* ── BG layers ── */}
        <div className="lg-orb lg-orb-1"/>
        <div className="lg-orb lg-orb-2"/>
        <div className="lg-orb lg-orb-3"/>
        <div className="lg-orb lg-orb-4"/>
        <div className="lg-dots"/>


        {/* ── Particles ── */}
        {PARTICLES.map((p,i) => (
          <div key={i} className="lg-particle" style={{
            left:p.left, bottom:`-${p.size*4}px`,
            width:p.size, height:p.size,
            animationDuration:p.dur, animationDelay:p.delay,
          }}/>
        ))}


        {/* ══ LEFT PANEL ══ */}
        <div className="lg-left">

          {/* Top brand */}
          <div className="lg-brand">
            <div className="lg-brand-logo">
              {!logoError
                ? <img src="/logo.png" alt="Agro Plus" onError={() => setLogoError(true)}/>
                : <div className="lg-brand-fb">A+</div>}
            </div>
            <div className="lg-brand-text">
              <div className="lg-brand-name">Agro <em>Plus</em></div>
              <div className="lg-brand-tag">by ORCA TECH. AND VENTURES</div>
            </div>
          </div>


          {/* Bottom copy */}
          <div>
            <h2 className="lg-headline">
              Rice Mill<br/><em>Operations,</em><br/>Simplified.
            </h2>
            <p className="lg-sub-copy">
              The all-in-one platform for rice mills — precision accounting,
              invoicing, weight bridge, and full team management in one place.
            </p>
            <div className="lg-pills">
              {["Invoicing & Billing","Financial Reports","Weight Bridge"].map(t => (
                <span key={t} className="lg-pill">
                  <span className="lg-pill-dot"/>
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* ══ RIGHT PANEL — glass ══ */}
        <div className="lg-right">
          <div className="lg-card">

            {/* Accent bar */}
            <div className="lg-accent">
              <div className="lg-accent-seg" style={{background:"#212A37",flex:2}}/>
              <div className="lg-accent-seg" style={{background:"#253240",flex:1}}/>
              <div className="lg-accent-seg" style={{background:"#929183",flex:3}}/>
              <div className="lg-accent-seg" style={{background:"#A8A79F",flex:1}}/>
              <div className="lg-accent-seg" style={{background:"#334455",flex:2}}/>
            </div>

            <div className="lg-body">

              {/* Card brand */}
              <div className="lg-cbrand">
                <div className="lg-cbrand-logo">
                  {!logoError
                    ? <img src="/logo.png" alt="Agro Plus" onError={() => setLogoError(true)}/>
                    : <div className="lg-cbrand-fb">A+</div>}
                </div>
                <div>
                  <div className="lg-cbrand-name">Agro <em>Plus</em></div>
                  <div className="lg-cbrand-tag">Rice Mill Management</div>
                </div>
              </div>


              <div className="lg-divider"/>

              <p className="lg-eyebrow">Secure Access</p>
              <h1 className="lg-heading">Welcome back</h1>
              <p className="lg-sub">Enter your credentials to access the dashboard</p>

              <form onSubmit={handleLogin}>

                {/* CNIC */}
                <div className="lg-field">
                  <label className="lg-label">
                    <span className="lg-label-bar"/>
                    CNIC Number
                  </label>
                  <div className="lg-inp-wrap">
                    <span className="lg-inp-icon">
                      <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0"/>
                      </svg>
                    </span>
                    <input className="lg-inp lg-cnic" type="text" inputMode="numeric"
                      placeholder="xxxxx-xxxxxxx-x"
                      value={cnic} onChange={handleCnicChange} onKeyDown={handleCnicKeyDown}
                      maxLength={15} autoFocus autoComplete="off"/>
                  </div>
                  <div className="lg-track">
                    {Array.from({length:13},(_,i) => (
                      <div key={i} className={`lg-seg${i < cnicDigits ? (cnicDone?" complete":" filled") : ""}`}/>
                    ))}
                    <span className="lg-count" style={cnicDone?{color:"#22c55e"}:{}}>{cnicDigits}/13</span>
                  </div>
                </div>

                {/* Password */}
                <div className="lg-field">
                  <label className="lg-label">
                    <span className="lg-label-bar"/>
                    Password
                  </label>
                  <div className="lg-inp-wrap">
                    <span className="lg-inp-icon">
                      <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                    </span>
                    <input className="lg-inp" type={showPwd?"text":"password"}
                      placeholder="Enter your password"
                      value={password} onChange={e => setPassword(e.target.value)}
                      autoComplete="current-password" style={{paddingRight:44}}/>
                    <button type="button" className="lg-eye" onClick={() => setShowPwd(s=>!s)} tabIndex={-1}>
                      {showPwd
                        ? <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                        : <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      }
                    </button>
                  </div>
                </div>

                <button type="submit" className="lg-btn" disabled={loading}>
                  {loading ? (
                    <><div className="lg-spin"/> Authenticating…</>
                  ) : (
                    <>
                      <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                      </svg>
                      Sign In to Dashboard
                    </>
                  )}
                </button>

              </form>

              <div className="lg-footer">
                <span className="lg-footer-brand">ORCA TECH. &amp; VENTURES</span>
                <span className="lg-footer-copy">© {new Date().getFullYear()} Agro Plus</span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
}