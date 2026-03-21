// import React, { useState } from "react";
// import API_BASE_URL from "../../../config/API_BASE_URL.js";
// import Notification from "../Notification.jsx";
// import { useNavigate, Link } from "react-router-dom";

// const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

// const CSS = `
//   .lg-root *, .lg-root *::before, .lg-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
//   .lg-root {
//     min-height: 100vh; display: flex;
//     font-family: 'DM Sans', sans-serif; background: #0c0f1a;
//   }

//   /* ══ LEFT ══ */
//   .lg-left {
//     flex: 1.1; position: relative; overflow: hidden;
//     display: flex; flex-direction: column; justify-content: flex-end; padding: 48px;
//   }
//   .lg-left-bg {
//     position: absolute; inset: 0;
//     background: linear-gradient(145deg, #0d1425 0%, #111827 40%, #0f1f14 100%);
//   }
//   .lg-glow-green {
//     position: absolute; right: -80px; top: -80px; width: 420px; height: 420px; border-radius: 50%;
//     background: radial-gradient(circle, rgba(16,185,129,.18) 0%, transparent 70%); pointer-events: none;
//   }
//   .lg-glow-indigo {
//     position: absolute; left: -60px; bottom: -60px; width: 320px; height: 320px; border-radius: 50%;
//     background: radial-gradient(circle, rgba(99,102,241,.14) 0%, transparent 70%); pointer-events: none;
//   }
//   .lg-grain {
//     position: absolute; inset: 0; pointer-events: none; opacity: .45;
//     background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
//     background-repeat: repeat; background-size: 200px; mix-blend-mode: overlay;
//   }
//   .lg-rice-art { position: absolute; inset: 0; pointer-events: none; opacity: .12; }

//   .lg-brand { position: relative; z-index: 2; }
//   .lg-logo-wrap {
//     width: 72px; height: 72px; border-radius: 18px; margin-bottom: 24px;
//     overflow: hidden; border: 1.5px solid rgba(255,255,255,.12); box-shadow: 0 8px 32px rgba(0,0,0,.4);
//   }
//   .lg-logo { width: 100%; height: 100%; object-fit: cover; display: block; }
//   .lg-logo-fallback {
//     width: 100%; height: 100%; background: linear-gradient(135deg,#059669,#6366f1);
//     display: flex; align-items: center; justify-content: center;
//     font-family: 'Lora', serif; font-size: 18px; font-weight: 700; color: #fff; letter-spacing: -.5px;
//   }
//   .lg-tagline { font-size: 11px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: rgba(16,185,129,.75); margin-bottom: 10px; }
//   .lg-company { font-family: 'Lora', serif; font-size: 38px; font-weight: 700; color: #fff; line-height: 1.1; letter-spacing: -.8px; margin-bottom: 12px; }
//   .lg-company em { font-style: italic; color: #34d399; }
//   .lg-desc { font-size: 14px; color: rgba(255,255,255,.4); line-height: 1.65; max-width: 340px; }

//   .lg-stats { position: relative; z-index: 2; margin-top: 40px; display: flex; gap: 28px; flex-wrap: wrap; }
//   .lg-stat-val { font-family: 'DM Mono', monospace; font-size: 22px; font-weight: 500; color: #fff; letter-spacing: -.5px; line-height: 1; }
//   .lg-stat-lbl { font-size: 11px; color: rgba(255,255,255,.3); margin-top: 4px; font-weight: 500; }
//   .lg-stat-sep { width: 1px; background: rgba(255,255,255,.08); align-self: stretch; margin: 2px 0; }

//   .lg-bottom { position: relative; z-index: 2; margin-top: 40px; display: flex; flex-direction: column; gap: 4px; }
//   .lg-bottom-brand { font-size: 11px; color: rgba(255,255,255,.15); font-weight: 500; }
//   .lg-bottom-brand span { color: rgba(16,185,129,.5); font-weight: 700; letter-spacing: .04em; }

//   /* ══ RIGHT ══ */
//   .lg-right {
//     width: 440px; flex-shrink: 0; background: #fff;
//     display: flex; flex-direction: column; justify-content: center;
//     padding: 56px 44px; position: relative; overflow-y: auto;
//   }
//   .lg-right::before {
//     content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
//     background: linear-gradient(90deg, #059669, #6366f1, #059669);
//     background-size: 200%; animation: lg-shimmer-line 3s linear infinite;
//   }
//   @keyframes lg-shimmer-line { to { background-position: 200%; } }

//   .lg-form-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #059669; margin-bottom: 8px; }
//   .lg-form-title { font-family: 'Lora', serif; font-size: 26px; font-weight: 700; color: #0f172a; letter-spacing: -.4px; line-height: 1.2; margin-bottom: 6px; }
//   .lg-form-sub { font-size: 13px; color: #94a3b8; margin-bottom: 28px; line-height: 1.5; }

//   .lg-field { margin-bottom: 18px; }
//   .lg-label { display: block; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #64748b; margin-bottom: 7px; }
//   .lg-input-wrap { position: relative; }
//   .lg-input-icon {
//     position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
//     color: #94a3b8; pointer-events: none; display: flex; transition: color .15s;
//   }
//   .lg-input {
//     width: 100%; padding: 12px 14px 12px 42px;
//     border: 1.5px solid #e2e8f0; border-radius: 11px;
//     font-size: 14px; font-family: 'DM Sans', sans-serif; color: #0f172a;
//     background: #f8fafc; outline: none;
//     transition: border-color .15s, box-shadow .15s, background .15s;
//   }
//   .lg-input::placeholder { color: #c4cbd8; }
//   .lg-input:focus { border-color: #059669; box-shadow: 0 0 0 3px rgba(5,150,105,.12); background: #fff; }
//   .lg-input-wrap:focus-within .lg-input-icon { color: #059669; }

//   /* CNIC input — monospace so digits align neatly */
//   .lg-cnic-input {
//     font-family: 'DM Mono', monospace !important;
//     font-size: 15px !important;
//     letter-spacing: .08em;
//   }

//   /* CNIC progress indicator */
//   .lg-cnic-dots {
//     display: flex; gap: 3px; margin-top: 6px; padding-left: 2px;
//   }
//   .lg-cnic-dot {
//     width: 5px; height: 5px; border-radius: 50%;
//     background: #e2e8f0; transition: background .15s;
//   }
//   .lg-cnic-dot.filled { background: #059669; }

//   .lg-pwd-toggle {
//     position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
//     background: none; border: none; cursor: pointer; color: #94a3b8;
//     display: flex; padding: 2px; transition: color .12s;
//   }
//   .lg-pwd-toggle:hover { color: #475569; }

//   .lg-submit {
//     width: 100%; padding: 13px; border-radius: 11px; border: none; cursor: pointer;
//     background: #0f172a; color: #fff; font-size: 14px; font-weight: 700;
//     font-family: 'DM Sans', sans-serif; letter-spacing: .04em; text-transform: uppercase;
//     display: flex; align-items: center; justify-content: center; gap: 9px;
//     transition: background .15s, box-shadow .15s, transform .1s;
//     box-shadow: 0 4px 14px rgba(15,23,42,.25); margin-top: 8px;
//     position: relative; overflow: hidden;
//   }
//   .lg-submit::after {
//     content: ''; position: absolute; inset: 0;
//     background: linear-gradient(90deg, transparent, rgba(255,255,255,.06), transparent);
//     transform: translateX(-100%); transition: transform .4s;
//   }
//   .lg-submit:hover::after { transform: translateX(100%); }
//   .lg-submit:hover { background: #1e293b; box-shadow: 0 6px 20px rgba(15,23,42,.35); }
//   .lg-submit:active { transform: scale(.99); }
//   .lg-submit:disabled { opacity: .65; cursor: not-allowed; transform: none; }
//   .lg-submit-line { position: absolute; bottom: 0; left: 0; height: 2px; width: 0; background: #059669; transition: width .3s; }
//   .lg-submit:hover .lg-submit-line { width: 100%; }

//   @keyframes lg-spin { to { transform: rotate(360deg); } }
//   .lg-spin { animation: lg-spin .8s linear infinite; display: inline-block; }

//   .lg-signup-row { margin-top: 20px; text-align: center; font-size: 13px; color: #94a3b8; }
//   .lg-signup-row a { color: #059669; font-weight: 700; text-decoration: none; }
//   .lg-signup-row a:hover { text-decoration: underline; }

//   .lg-footer { margin-top: 20px; padding-top: 18px; border-top: 1px solid #f1f5f9; font-size: 11px; color: #cbd5e1; text-align: center; line-height: 1.6; }
//   .lg-footer-orca { font-weight: 700; color: #94a3b8; letter-spacing: .03em; }

//   @media (max-width: 900px) { .lg-left { display: none; } .lg-right { width: 100%; min-height: 100vh; padding: 40px 28px; } }
//   @media (max-width: 480px) { .lg-right { padding: 32px 20px; } }
// `;

// const RiceGrains = () => (
//   <svg className="lg-rice-art" viewBox="0 0 600 700" fill="none" xmlns="http://www.w3.org/2000/svg">
//     {[[80,80,4,12,-30],[150,200,3,9,20],[240,120,5,14,-15],[320,60,3,8,40],[420,150,4,11,-25],
//       [500,90,3,9,15],[60,320,5,13,30],[180,380,3,8,-20],[280,280,4,12,-35],[380,360,3,9,25],
//       [480,290,5,14,-10],[540,400,3,8,35],[100,500,4,11,-25],[220,560,3,9,20],[340,480,5,13,-15],
//       [450,540,4,11,30],[560,500,3,8,-30],[130,650,5,14,15],[270,620,3,9,-20],[410,600,4,12,25],
//       [520,650,3,8,-35]
//     ].map(([cx,cy,rx,ry,angle],i) => (
//       <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="white" transform={`rotate(${angle} ${cx} ${cy})`}/>
//     ))}
//   </svg>
// );

// /**
//  * Formats a raw digit string into xxxxx-xxxxxxx-x pattern.
//  * Works as the user types — only adds dashes at the right positions.
//  */
// function formatCnic(raw) {
//   const digits = raw.replace(/\D/g, "").slice(0, 13);
//   if (digits.length <= 5)  return digits;
//   if (digits.length <= 12) return `${digits.slice(0,5)}-${digits.slice(5)}`;
//   return `${digits.slice(0,5)}-${digits.slice(5,12)}-${digits.slice(12)}`;
// }

// export default function Login() {
//   const [cnic,         setCnic]         = useState("");
//   const [password,     setPassword]     = useState("");
//   const [showPwd,      setShowPwd]      = useState(false);
//   const [loading,      setLoading]      = useState(false);
//   const [logoError,    setLogoError]    = useState(false);
//   const [notification, setNotification] = useState({ message: "", type: "info" });
//   const navigate = useNavigate();

//   const notify = (message, type, ms = 3000) => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification({ message: "", type: "info" }), ms);
//   };

//   // Count raw digits for the progress dots
//   const cnicDigits = cnic.replace(/\D/g, "").length;

//   const handleCnicChange = (e) => {
//     const raw = e.target.value.replace(/\D/g, "");
//     setCnic(formatCnic(raw));
//   };

//   // Handle backspace correctly — don't leave a trailing dash
//   const handleCnicKeyDown = (e) => {
//     if (e.key === "Backspace") {
//       const raw = cnic.replace(/\D/g, "");
//       if (raw.length > 0) {
//         e.preventDefault();
//         setCnic(formatCnic(raw.slice(0, -1)));
//       }
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const rawDigits = cnic.replace(/\D/g, "");
//     if (rawDigits.length !== 13) { notify("Please enter a valid 13-digit CNIC", "warning"); return; }
//     if (!password.trim())        { notify("Please enter your password",          "warning"); return; }

//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/login`, {
//         method:  "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ cnic: rawDigits, password }),
//       });
//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("token",         data.token);
//         localStorage.setItem("role",          data.role);
//         localStorage.setItem("name",          data.name);
//         localStorage.setItem("millId",        data.millId);
//         localStorage.setItem("businessName",  data.businessName);
//         localStorage.setItem("logoUrl",       data.logoUrl || "");
//         localStorage.setItem("allowedRoutes", JSON.stringify(data.allowedRoutes));
//         notify(data.message || "Login successful", "success");
//         const dest = data.portal === "master" ? "/master" : "/dashboard";
//         setTimeout(() => navigate(dest), 900);
//       } else {
//         notify(data.message || "Invalid credentials", "error");
//         setLoading(false);
//       }
//     } catch {
//       notify("Server error — please try again", "warning");
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{FONTS}{CSS}</style>
//       <Notification message={notification.message} type={notification.type}
//         onClose={() => setNotification({ message: "", type: "info" })} />

//       <div className="lg-root">

//         {/* ══ LEFT ══ */}
//         <div className="lg-left">
//           <div className="lg-left-bg"/>
//           <div className="lg-glow-green"/> <div className="lg-glow-indigo"/>
//           <div className="lg-grain"/> <RiceGrains/>

//           <div className="lg-brand">
//             <div className="lg-logo-wrap">
//               {!logoError
//                 ? <img src="/logo.png" alt="Agro Plus" className="lg-logo" onError={() => setLogoError(true)}/>
//                 : <div className="lg-logo-fallback">Agro+</div>}
//             </div>
//             <p className="lg-tagline">Rice Mill Management Platform</p>
//             <h1 className="lg-company">Agro<em> Plus</em></h1>
//             <p className="lg-desc">
//               Complete rice mill operations — paddy processing, precision accounting,
//               invoicing, weight bridge, and team management. All in one platform.
//             </p>
//           </div>

//           <div className="lg-stats">
//             <div><div className="lg-stat-val">Multi</div><div className="lg-stat-lbl">Mill Support</div></div>
//             <div className="lg-stat-sep"/>
//             <div><div className="lg-stat-val">24/7</div><div className="lg-stat-lbl">Operations</div></div>
//             <div className="lg-stat-sep"/>
//             <div><div className="lg-stat-val">Live</div><div className="lg-stat-lbl">Financial Data</div></div>
//           </div>

//           <div className="lg-bottom">
//             <div className="lg-bottom-brand">
//               A product of <span>ORCA TECH. AND VENTURES</span>
//             </div>
//             <div className="lg-bottom-brand" style={{ color: "rgba(255,255,255,.1)" }}>
//               © {new Date().getFullYear()} Agro Plus · All rights reserved
//             </div>
//           </div>
//         </div>

//         {/* ══ RIGHT ══ */}
//         <div className="lg-right">
//           <p className="lg-form-eyebrow">Secure Access</p>
//           <h2 className="lg-form-title">Welcome back</h2>
//           <p className="lg-form-sub">Sign in with your CNIC and password</p>

//           <form onSubmit={handleLogin}>

//             {/* CNIC */}
//             <div className="lg-field">
//               <label className="lg-label">CNIC</label>
//               <div className="lg-input-wrap">
//                 <input
//                   className="lg-input lg-cnic-input"
//                   type="text"
//                   inputMode="numeric"
//                   placeholder="xxxxx-xxxxxxx-x"
//                   value={cnic}
//                   onChange={handleCnicChange}
//                   onKeyDown={handleCnicKeyDown}
//                   maxLength={15}
//                   autoFocus
//                   autoComplete="off"
//                 />
//                 <span className="lg-input-icon">
//                   <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/>
//                   </svg>
//                 </span>
//               </div>
//               {/* 13-dot progress indicator */}
//               <div className="lg-cnic-dots">
//                 {Array.from({ length: 13 }, (_, i) => (
//                   <div key={i} className={`lg-cnic-dot${i < cnicDigits ? " filled" : ""}`}/>
//                 ))}
//               </div>
//             </div>

//             {/* Password */}
//             <div className="lg-field">
//               <label className="lg-label">Password</label>
//               <div className="lg-input-wrap">
//                 <input className="lg-input" type={showPwd ? "text" : "password"}
//                   placeholder="Enter your password" value={password}
//                   onChange={e => setPassword(e.target.value)}
//                   autoComplete="current-password" style={{ paddingRight: 44 }}/>
//                 <span className="lg-input-icon">
//                   <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
//                   </svg>
//                 </span>
//                 <button type="button" className="lg-pwd-toggle" onClick={() => setShowPwd(s => !s)} tabIndex={-1}>
//                   {showPwd
//                     ? <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
//                     : <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
//                   }
//                 </button>
//               </div>
//             </div>

//             <button type="submit" className="lg-submit" disabled={loading}>
//               <div className="lg-submit-line"/>
//               {loading ? (
//                 <><span className="lg-spin"><svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg></span>Signing in…</>
//               ) : (
//                 <><svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>Sign In</>
//               )}
//             </button>

//           </form>

//           <div className="lg-footer">
//             A product of <span className="lg-footer-orca">ORCA TECH. AND VENTURES</span>
//             <br/>© {new Date().getFullYear()} Agro Plus · All rights reserved
//           </div>
//         </div>

//       </div>
//     </>
//   );
// }
import React, { useState } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import { useNavigate } from "react-router-dom";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  .lg2 *, .lg2 *::before, .lg2 *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lg2 {
    min-height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-family: 'Outfit', sans-serif;
    overflow: hidden;
  }

  /* ── Full-bleed background ── */
  .lg2-bg {
    position: absolute; inset: 0; z-index: 0;
    background: url('/bg.png') center center / cover no-repeat;
  }
  /* Subtle overlay to deepen the image without killing it */
  .lg2-bg::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(
      135deg,
      rgba(15, 20, 10, 0.45) 0%,
      rgba(47, 79, 31, 0.25) 40%,
      rgba(90, 60, 20, 0.30) 70%,
      rgba(15, 20, 10, 0.50) 100%
    );
  }

  /* ── Floating dust particles ── */
  .lg2-particles {
    position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden;
  }
  .lg2-particle {
    position: absolute; border-radius: 50%;
    background: rgba(212, 168, 67, 0.4);
    animation: lg2-float linear infinite;
  }
  @keyframes lg2-float {
    0%   { transform: translateY(0) scale(1);   opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 0.6; }
    100% { transform: translateY(-100vh) scale(0.6); opacity: 0; }
  }

  /* ── Bottom-left branding watermark ── */
  .lg2-watermark {
    position: absolute; bottom: 28px; left: 36px; z-index: 3;
    display: flex; flex-direction: column; gap: 4px;
  }
  .lg2-wm-product {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px; font-style: italic;
    color: rgba(245, 230, 200, 0.55);
    letter-spacing: .02em;
  }
  .lg2-wm-orca {
    font-size: 9.5px; font-weight: 700; letter-spacing: .18em;
    text-transform: uppercase;
    color: rgba(212, 168, 67, 0.45);
  }

  /* ── Glass card ── */
  .lg2-card {
    position: relative; z-index: 4;
    width: 420px;
    margin: 32px 64px 32px 0;
    border-radius: 24px;
    padding: 44px 40px 36px;
    overflow: hidden;

    /* Glassmorphism */
    background: rgba(15, 18, 12, 0.32);
    backdrop-filter: blur(5px) saturate(120%);
    -webkit-backdrop-filter: blur(32px) saturate(160%);
    border: 1px solid rgba(212, 168, 67, 0.22);
    box-shadow:
      0 32px 80px rgba(0, 0, 0, 0.5),
      0 0 0 0.5px rgba(255,255,255,0.06) inset,
      0 1px 0 rgba(212, 168, 67, 0.12) inset;
  }

  /* Inner glass sheen */
  .lg2-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(212, 168, 67, 0.5) 30%,
      rgba(240, 138, 60, 0.4) 60%,
      transparent 100%
    );
  }
  /* Subtle card glow */
  .lg2-card::after {
    content: '';
    position: absolute; inset: 0; z-index: -1; border-radius: 24px;
    box-shadow: 0 0 80px rgba(78, 122, 46, 0.15) inset;
    pointer-events: none;
  }

  /* ── Top accent bar ── */
  .lg2-accent-bar {
    display: flex; gap: 5px; margin-bottom: 32px;
  }
  .lg2-accent-seg {
    height: 3px; border-radius: 3px; flex: 1;
  }

  /* ── Logo ── */
  .lg2-logo-row {
    display: flex; align-items: center; gap: 12px; margin-bottom: 28px;
  }
  .lg2-logo-frame {
    width: 46px; height: 46px; border-radius: 12px; overflow: hidden; flex-shrink: 0;
    border: 1px solid rgba(212, 168, 67, 0.3);
    box-shadow: 0 4px 16px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset;
  }
  .lg2-logo-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .lg2-logo-fb {
    width: 100%; height: 100%;
    background: linear-gradient(135deg, #4E7A2E, #6FA43A);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px; font-weight: 700; color: #F5E6C8;
  }
  .lg2-logo-text { display: flex; flex-direction: column; }
  .lg2-logo-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px; font-weight: 700;
    color: #F5E6C8; letter-spacing: -.2px; line-height: 1.1;
  }
  .lg2-logo-name em { font-style: italic; color: #D4A843; }
  .lg2-logo-sub {
    font-size: 9.5px; font-weight: 600; letter-spacing: .14em;
    text-transform: uppercase; color: rgba(212, 168, 67, 0.55);
    margin-top: 2px;
  }

  /* ── Divider ── */
  .lg2-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212,168,67,.2), transparent);
    margin-bottom: 24px;
  }

  /* ── Heading ── */
  .lg2-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 600; font-style: italic;
    color: #F5E6C8; letter-spacing: -.3px; line-height: 1.15;
    margin-bottom: 6px;
  }
  .lg2-subheading {
    font-size: 12.5px; color: rgba(245, 230, 200, 0.45);
    margin-bottom: 28px; line-height: 1.5; font-weight: 400;
  }

  /* ── Fields ── */
  .lg2-field { margin-bottom: 16px; }
  .lg2-label {
    display: flex; align-items: center; gap: 6px;
    font-size: 10px; font-weight: 700; letter-spacing: .12em;
    text-transform: uppercase; color: rgba(212, 168, 67, 0.7);
    margin-bottom: 8px;
  }
  .lg2-label-dot {
    width: 4px; height: 4px; border-radius: 50%; background: #D4A843; opacity: .7;
  }
  .lg2-input-wrap { position: relative; }
  .lg2-input-icon {
    position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
    color: rgba(212, 168, 67, 0.45); pointer-events: none; display: flex;
    transition: color .15s;
  }
  .lg2-input {
    width: 100%; padding: 12px 14px 12px 40px;
    border-radius: 11px; outline: none;
    font-size: 13.5px; font-family: 'Outfit', sans-serif; color: #F5E6C8;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(212, 168, 67, 0.18);
    transition: border-color .15s, box-shadow .15s, background .15s;
  }
  .lg2-input::placeholder { color: rgba(245,230,200,.25); font-style: italic; }
  .lg2-input:focus {
    border-color: rgba(212, 168, 67, 0.55);
    box-shadow: 0 0 0 3px rgba(212, 168, 67, 0.1), 0 0 16px rgba(212,168,67,0.08) inset;
    background: rgba(255,255,255,.09);
  }
  .lg2-input-wrap:focus-within .lg2-input-icon { color: rgba(212,168,67,.75); }

  /* CNIC mono */
  .lg2-cnic { font-family: 'DM Mono', monospace !important; font-size: 14px !important; letter-spacing: .1em; }

  /* CNIC progress dots */
  .lg2-cnic-track {
    display: flex; gap: 4px; margin-top: 8px; padding-left: 1px;
    align-items: center;
  }
  .lg2-cnic-seg {
    height: 3px; border-radius: 3px; flex: 1;
    background: rgba(255,255,255,.08); transition: background .15s, transform .1s;
  }
  .lg2-cnic-seg.filled { background: #6FA43A; }
  .lg2-cnic-seg.complete { background: #D4A843; }
  .lg2-cnic-count {
    font-family: 'DM Mono', monospace; font-size: 10px;
    color: rgba(245,230,200,.35); margin-left: 5px; flex-shrink: 0;
  }

  /* Eye toggle */
  .lg2-eye {
    position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    color: rgba(212,168,67,.4); transition: color .12s; display: flex; padding: 3px;
  }
  .lg2-eye:hover { color: rgba(212,168,67,.8); }

  /* ── Submit ── */
  .lg2-btn {
    width: 100%; padding: 14px;
    border-radius: 12px; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 9px;
    font-size: 13px; font-weight: 700; font-family: 'Outfit', sans-serif;
    letter-spacing: .06em; text-transform: uppercase;
    margin-top: 24px; position: relative; overflow: hidden;

    background: linear-gradient(135deg, #4E7A2E 0%, #6FA43A 50%, #D4A843 100%);
    background-size: 200% 100%; background-position: 0% 0%;
    color: #1a1a0e;
    box-shadow: 0 4px 24px rgba(78, 122, 46, 0.35), 0 1px 0 rgba(255,255,255,.15) inset;
    transition: background-position .4s, box-shadow .2s, transform .1s;
  }
  .lg2-btn:hover {
    background-position: 100% 0%;
    box-shadow: 0 6px 32px rgba(212, 168, 67, 0.35), 0 1px 0 rgba(255,255,255,.2) inset;
  }
  .lg2-btn:active { transform: scale(.98); }
  .lg2-btn:disabled { opacity: .55; cursor: not-allowed; transform: none; }

  /* Shine sweep on btn */
  .lg2-btn::after {
    content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
    transform: skewX(-20deg);
    transition: left .5s;
  }
  .lg2-btn:hover::after { left: 160%; }

  /* ── Footer ── */
  .lg2-footer {
    margin-top: 22px; padding-top: 18px;
    border-top: 1px solid rgba(212,168,67,.1);
    text-align: center;
    font-size: 10.5px; color: rgba(245,230,200,.25);
    line-height: 1.7;
  }

  /* ── Spinner ── */
  @keyframes lg2-spin { to { transform: rotate(360deg); } }
  .lg2-spin {
    display: inline-block; width: 14px; height: 14px;
    border: 2px solid rgba(26,26,14,.3);
    border-top-color: #1a1a0e;
    border-radius: 50%;
    animation: lg2-spin .7s linear infinite;
  }

  @media (max-width: 540px) {
    .lg2-card { width: 100%; margin: 0; border-radius: 0; min-height: 100vh;
      display: flex; flex-direction: column; justify-content: center; }
    .lg2 { justify-content: center; }
    .lg2-watermark { display: none; }
  }
`;

/* Floating particles */
const PARTICLES = [
  { left:"8%",  size:4, duration:"18s", delay:"0s"   },
  { left:"22%", size:3, duration:"22s", delay:"3s"   },
  { left:"38%", size:5, duration:"16s", delay:"7s"   },
  { left:"55%", size:3, duration:"25s", delay:"1s"   },
  { left:"68%", size:4, duration:"20s", delay:"5s"   },
  { left:"82%", size:6, duration:"14s", delay:"9s"   },
  { left:"91%", size:3, duration:"19s", delay:"2s"   },
  { left:"14%", size:4, duration:"23s", delay:"11s"  },
  { left:"47%", size:5, duration:"17s", delay:"4s"   },
  { left:"73%", size:3, duration:"21s", delay:"8s"   },
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
  const [notification, setNotification] = useState({ message:"", type:"info" });
  const navigate = useNavigate();

  const notify = (message, type, ms=3500) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message:"", type:"info" }), ms);
  };

  const cnicDigits = cnic.replace(/\D/g,"").length;

  const handleCnicChange = e => setCnic(formatCnic(e.target.value.replace(/\D/g,"")));
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

      <div className="lg2">

        {/* Background image */}
        <div className="lg2-bg"/>

        {/* Floating particles */}
        <div className="lg2-particles">
          {PARTICLES.map((p, i) => (
            <div key={i} className="lg2-particle" style={{
              left: p.left, bottom: `-${p.size * 3}px`,
              width: p.size, height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}/>
          ))}
        </div>

        {/* Bottom-left watermark — minimal, tasteful */}
        <div className="lg2-watermark">
          <div className="lg2-wm-product">Agro Plus</div>
          <div className="lg2-wm-orca">ORCA TECH. AND VENTURES</div>
        </div>

        {/* ── Glass card ── */}
        <div className="lg2-card">

          {/* Accent bar */}
          <div className="lg2-accent-bar">
            <div className="lg2-accent-seg" style={{ background:"#4E7A2E", flex:2 }}/>
            <div className="lg2-accent-seg" style={{ background:"#6FA43A", flex:3 }}/>
            <div className="lg2-accent-seg" style={{ background:"#D4A843", flex:2 }}/>
            <div className="lg2-accent-seg" style={{ background:"#F08A3C", flex:1 }}/>
          </div>

          {/* Logo row */}
          <div className="lg2-logo-row">
            <div className="lg2-logo-frame">
              {!logoError
                ? <img src="/logo.png" alt="Agro Plus" onError={() => setLogoError(true)}/>
                : <div className="lg2-logo-fb">A+</div>}
            </div>
            <div className="lg2-logo-text">
              <span className="lg2-logo-name">Agro <em>Plus</em></span>
              <span className="lg2-logo-sub">Rice Mill Management</span>
            </div>
          </div>

          <div className="lg2-divider"/>

          {/* Heading */}
          <h2 className="lg2-heading">Welcome back</h2>
          <p className="lg2-subheading">Sign in to continue to your dashboard</p>

          <form onSubmit={handleLogin}>

            {/* CNIC */}
            <div className="lg2-field">
              <label className="lg2-label">
                <span className="lg2-label-dot"/>
                CNIC
              </label>
              <div className="lg2-input-wrap">
                <span className="lg2-input-icon">
                  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0"/>
                  </svg>
                </span>
                <input className="lg2-input lg2-cnic" type="text" inputMode="numeric"
                  placeholder="xxxxx-xxxxxxx-x"
                  value={cnic} onChange={handleCnicChange} onKeyDown={handleCnicKeyDown}
                  maxLength={15} autoFocus autoComplete="off"/>
              </div>
              {/* Segmented progress indicator */}
              <div className="lg2-cnic-track">
                {Array.from({length:13},(_,i) => (
                  <div key={i} className={`lg2-cnic-seg${i < cnicDigits ? (cnicDigits===13?" complete":" filled") : ""}`}/>
                ))}
                <span className="lg2-cnic-count">{cnicDigits}/13</span>
              </div>
            </div>

            {/* Password */}
            <div className="lg2-field">
              <label className="lg2-label">
                <span className="lg2-label-dot"/>
                Password
              </label>
              <div className="lg2-input-wrap">
                <span className="lg2-input-icon">
                  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </span>
                <input className="lg2-input" type={showPwd?"text":"password"}
                  placeholder="Enter your password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password" style={{ paddingRight:44 }}/>
                <button type="button" className="lg2-eye" onClick={() => setShowPwd(s => !s)} tabIndex={-1}>
                  {showPwd
                    ? <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                    : <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="lg2-btn" disabled={loading}>
              {loading ? (
                <><div className="lg2-spin"/> Signing in…</>
              ) : (
                <>
                  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                  </svg>
                  Sign In to Dashboard
                </>
              )}
            </button>

          </form>

          {/* Footer */}
          <div className="lg2-footer">
            © {new Date().getFullYear()} Agro Plus · ORCA TECH. AND VENTURES
            <br/>All rights reserved · Secure Login
          </div>
        </div>

      </div>
    </>
  );
}