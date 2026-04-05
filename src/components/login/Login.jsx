import React, { useState } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import { useNavigate } from "react-router-dom";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  .lg-root *, .lg-root *::before, .lg-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lg-root {
    min-height: 100vh;
    display: flex;
    font-family: 'DM Sans', sans-serif;
    background: #0b1120;
  }

  /* ══ LEFT ══ */
  .lg-left {
    flex: 1;
    background: #0b1120;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    min-width: 0;
  }

  .lg-left::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #065f46, #10b981, #065f46);
    background-size: 200% 100%;
    animation: lg-shimmer 4s linear infinite;
    z-index: 2;
  }
  @keyframes lg-shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .lg-left::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(16,185,129,.065) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
    z-index: 0;
  }

  .lg-glow {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 520px; height: 520px;
    background: radial-gradient(circle at center, rgba(6,95,70,.22) 0%, transparent 68%);
    pointer-events: none;
    z-index: 0;
  }

  .lg-left-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 44px 52px 40px;
    min-height: 100vh;
  }

  /* Company badge */
  .lg-company-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 40px;
    padding: 6px 14px 6px 6px;
    align-self: flex-start;
    animation: lg-fade-down .6s ease both;
  }
  .lg-company-logo-wrap {
    width: 28px; height: 28px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.12);
    background: #065f46;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .lg-company-logo-wrap img { width: 100%; height: 100%;  display: block; }
  .lg-company-logo-fb {
    font-family: 'DM Sans', sans-serif;
    font-size: 8px; font-weight: 800; color: #fff; letter-spacing: .04em;
  }
  .lg-company-name {
    font-size: 10px; font-weight: 700;
    letter-spacing: .16em; text-transform: uppercase;
    color: rgba(255,255,255,.42);
  }

  /* Hero */
  .lg-hero {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 32px 0 24px;
  }

  /* Product logo */
  .lg-product-logo-ring {
    position: relative;
    width: 140px; height: 140px;
    margin-bottom: 30px;
    animation: lg-fade-up .7s .1s ease both;
  }
  .lg-product-logo-ring::before {
    content: '';
    position: absolute;
    inset: -9px;
    border-radius: 38px;
    border: 1px solid rgba(16,185,129,.22);
    animation: lg-pulse-ring 3s ease-in-out infinite;
  }
  .lg-product-logo-ring::after {
    content: '';
    position: absolute;
    inset: -20px;
    border-radius: 46px;
    border: 1px solid rgba(16,185,129,.07);
    animation: lg-pulse-ring 3s .6s ease-in-out infinite;
  }
  @keyframes lg-pulse-ring {
    0%, 100% { transform: scale(1);    opacity: 1; }
    50%       { transform: scale(1.05); opacity: .45; }
  }
  .lg-product-logo-frame {
    width: 140px; height: 140px;
    border-radius: 30px;
    overflow: hidden;
    border: 1.5px solid rgba(255,255,255,.1);
    box-shadow: 0 0 56px rgba(6,95,70,.42), 0 24px 48px rgba(0,0,0,.55);
    // background: #111827;
    display: flex; align-items: center; justify-content: center;
  }
  .lg-product-logo-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .lg-product-logo-fb {
    font-family: 'Cormorant Garamond', serif;
    font-size: 52px; font-weight: 700; color: #10b981;
  }

  /* Product name */
  .lg-product-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 74px; font-weight: 700;
    color: #ffffff;
    line-height: .92;
    letter-spacing: -2.5px;
    margin-bottom: 8px;
    animation: lg-fade-up .7s .2s ease both;
  }
  .lg-product-name-green { color: #10b981; }
  .lg-product-plus {
    font-family: 'DM Mono', monospace;
    font-size: 36px; font-weight: 500; color: #065f46;
    vertical-align: super; line-height: 1;
    position: relative; top: -4px; margin-left: 2px;
  }

  /* Category pill */
  .lg-product-category {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(6,95,70,.18);
    border: 1px solid rgba(16,185,129,.25);
    border-radius: 20px;
    padding: 5px 14px;
    font-size: 10px; font-weight: 700;
    letter-spacing: .18em; text-transform: uppercase;
    color: #6ee7b7;
    margin-top: 10px;
    margin-bottom: 22px;
    animation: lg-fade-up .7s .3s ease both;
  }
  .lg-category-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #10b981;
    animation: lg-blink 2s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes lg-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: .25; }
  }

  /* Tagline */
  .lg-tagline-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 21px; font-style: italic; font-weight: 400;
    color: rgba(255,255,255,.32);
    letter-spacing: .01em;
    margin-bottom: 34px;
    animation: lg-fade-up .7s .35s ease both;
  }

  /* Feature pills */
  .lg-features {
    display: flex; flex-wrap: wrap; gap: 7px;
    justify-content: center; max-width: 400px;
    animation: lg-fade-up .7s .42s ease both;
  }
  .lg-feat-pill {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.07);
    border-radius: 20px; padding: 5px 11px;
    font-size: 11px; font-weight: 500; color: rgba(255,255,255,.32);
    white-space: nowrap;
  }
  .lg-feat-dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: #065f46; flex-shrink: 0;
  }

  /* Bottom stamp */
  .lg-bottom-stamp {
    display: flex; align-items: center; justify-content: space-between;
    animation: lg-fade-up .7s .5s ease both;
  }
  .lg-stamp-left { display: flex; align-items: center; gap: 8px; }
  .lg-stamp-bar  { width: 18px; height: 2px; background: rgba(16,185,129,.35); border-radius: 2px; }
  .lg-stamp-text {
    font-size: 8.5px; font-weight: 700;
    letter-spacing: .18em; text-transform: uppercase;
    color: rgba(255,255,255,.16);
  }
  .lg-stamp-year {
    font-family: 'DM Mono', monospace;
    font-size: 8.5px; color: rgba(255,255,255,.11); letter-spacing: .1em;
  }

  /* ══ RIGHT ══ */
  .lg-right {
    width: 460px;
    flex-shrink: 0;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 56px 52px;
    border-left: 1px solid rgba(255,255,255,.06);
    box-shadow: -12px 0 48px rgba(0,0,0,.35);
    position: relative;
  }
  .lg-right::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: #065f46;
  }

  .lg-form-wrap { width: 100%; }

  .lg-form-logo-row {
    display: flex; align-items: center; gap: 11px;
    margin-bottom: 26px;
  }
  .lg-form-logo-frame {
    width: 40px; height: 40px;
    border-radius: 10px; overflow: hidden;
    border: 1.5px solid #e5e7eb;
    // background: #111827;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .lg-form-logo-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .lg-form-logo-fb {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px; font-weight: 700; color: #10b981;
  }
  .lg-form-logo-text { display: flex; flex-direction: column; }
  .lg-form-logo-name {
    font-size: 15px; font-weight: 700; color: #111827;
    line-height: 1.2; letter-spacing: -.2px;
  }
  .lg-form-logo-by {
    font-size: 8.5px; font-weight: 700; letter-spacing: .14em;
    text-transform: uppercase; color: #9ca3af; margin-top: 1px;
  }

  .lg-rule { width: 100%; height: 1px; background: #f3f4f6; margin-bottom: 24px; }

  .lg-eyebrow {
    font-size: 10px; font-weight: 700; letter-spacing: .18em;
    text-transform: uppercase; color: #065f46;
    margin-bottom: 5px;
    display: flex; align-items: center; gap: 8px;
  }
  .lg-eyebrow::before {
    content: '';
    display: inline-block; width: 15px; height: 2px;
    background: #065f46; border-radius: 2px;
  }
  .lg-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 29px; font-weight: 700; font-style: italic;
    color: #111827; letter-spacing: -.4px; line-height: 1.1;
    margin-bottom: 5px;
  }
  .lg-sub {
    font-size: 12.5px; color: #9ca3af;
    margin-bottom: 26px; line-height: 1.5;
  }

  .lg-field { margin-bottom: 18px; }
  .lg-lbl {
    display: flex; align-items: center; gap: 7px;
    font-size: 10px; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: #9ca3af; margin-bottom: 7px;
  }
  .lg-lbl-bar { width: 10px; height: 2px; border-radius: 2px; background: #065f46; }

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

  .lg-eye {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    color: #d1d5db; display: flex; padding: 3px; transition: color .12s;
  }
  .lg-eye:hover { color: #065f46; }

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

  .lg-form-foot {
    margin-top: 26px; padding-top: 18px;
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

  @keyframes lg-fade-down {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes lg-fade-up {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 960px) {
    .lg-left  { display: none; }
    .lg-right { width: 100%; border-left: none; box-shadow: none; padding: 48px 36px; }
    .lg-right::before { border-radius: 0; }
  }
  @media (max-width: 480px) { .lg-right { padding: 36px 24px; } }
`;

function formatCnic(raw) {
  const d = raw.replace(/\D/g, "").slice(0, 13);
  if (d.length <= 5) return d;
  if (d.length <= 12) return `${d.slice(0, 5)}-${d.slice(5)}`;
  return `${d.slice(0, 5)}-${d.slice(5, 12)}-${d.slice(12)}`;
}

const FEATURES = [
  "Accounting & Ledger",
  "Purchase & Sales",
  "Weight Bridge",
  "Cheque Management",
  "Payroll & HR",
  "Inventory",
];

export default function Login() {
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [cLogoError, setCLogoError] = useState(false);
  const [formLogoError, setFormLogoError] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "info" });
  const navigate = useNavigate();

  const notify = (msg, type, ms = 3500) => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification({ message: "", type: "info" }), ms);
  };

  const cnicDigits = cnic.replace(/\D/g, "").length;
  const cnicDone = cnicDigits === 13;

  const handleCnicChange = e => setCnic(formatCnic(e.target.value.replace(/\D/g, "")));
  const handleCnicKeyDown = e => {
    if (e.key === "Backspace") {
      const raw = cnic.replace(/\D/g, "");
      if (raw.length > 0) { e.preventDefault(); setCnic(formatCnic(raw.slice(0, -1))); }
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    const rawDigits = cnic.replace(/\D/g, "");
    if (rawDigits.length !== 13) { notify("Please enter a valid 13-digit CNIC", "warning"); return; }
    if (!password.trim()) { notify("Please enter your password", "warning"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cnic: rawDigits, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);
        localStorage.setItem("millId", data.millId);
        localStorage.setItem("businessName", data.businessName);
        localStorage.setItem("logoUrl", data.logoUrl || "");
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
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}
      />

      <div className="lg-root">

        {/* ══ LEFT — branding ══ */}
        <div className="lg-left">
          <div className="lg-glow" />
          <div className="lg-left-inner">



            {/* ── HERO — product logo + name ── */}
            <div className="lg-hero">

              {/* logo.png — the star of the show */}
              <div className="lg-product-logo-ring">
                <div className="lg-product-logo-frame">
                  {!logoError
                    ? <img src="/logo-cropped.png" alt="Agro Plus" onError={() => setLogoError(true)} />
                    : <span className="lg-product-logo-fb">A+</span>}
                </div>
              </div>

              {/* "Agro Plus+" — dominant typography */}
              <h1 className="lg-product-name">
                Agro<span className="lg-product-name-green"> Plus</span><span className="lg-product-plus">+</span>
              </h1>

              {/* Platform category */}
              <div className="lg-product-category">
                <span className="lg-category-dot" />
                Rice Mill Management Platform
              </div>

              {/* Tagline — supporting role */}
              <p className="lg-tagline-text">Operations, Simplified.</p>

              {/* Capability pills */}
              <div className="lg-features">
                {FEATURES.map(f => (
                  <span key={f} className="lg-feat-pill">
                    <span className="lg-feat-dot" />
                    {f}
                  </span>
                ))}
              </div>

            </div>

            {/* ── Bottom stamp ── */}
            <div className="lg-bottom-stamp">
              <div className="lg-stamp-left">
                <div className="lg-stamp-bar" />
                <span className="lg-stamp-text">Powered by ORCA</span>
              </div>
              <span className="lg-stamp-year">© {new Date().getFullYear()}</span>
            </div>

          </div>
        </div>

        {/* ══ RIGHT — login form ══ */}
        <div className="lg-right">

          {/* ── ORCA TECH. AND VENTURES — top-right of white panel ── */}
          <div style={{
            position: "absolute",
            top: 22,
            right: 26,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              overflow: "hidden",
              border: "1.5px solid #e5e7eb",
              background: "#f3f4f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              {!cLogoError
                ? <img
                  src="/c-logo.png"
                  alt="ORCA TECH"
                  onError={() => setCLogoError(true)}
                  style={{ width: "100%", height: "100%", display: "block" }}
                />
                : <span style={{ fontSize: 10, fontWeight: 800, color: "#065f46", fontFamily: "'DM Sans',sans-serif" }}>OT</span>}
            </div>
            <div style={{ lineHeight: 1.3 }}>
              <div style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "#374151",
              }}>
                ORCA TECH.
              </div>
              <div style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: ".13em",
                textTransform: "uppercase",
                color: "#9ca3af",
              }}>
                AND VENTURES
              </div>
            </div>
          </div>

          <div className="lg-form-wrap">

            <p className="lg-eyebrow">Secure Access</p>
            <h2 className="lg-heading">Welcome back</h2>
            <p className="lg-sub">Sign in with your CNIC and password</p>

            <form onSubmit={handleLogin}>

              {/* CNIC */}
              <div className="lg-field">
                <label className="lg-lbl">
                  <span className="lg-lbl-bar" />CNIC Number
                </label>
                <div className="lg-inp-wrap">
                  <span className="lg-inp-icon">
                    <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
                    </svg>
                  </span>
                  <input
                    className="lg-inp lg-cnic-inp"
                    type="text" inputMode="numeric"
                    placeholder="xxxxx-xxxxxxx-x"
                    value={cnic}
                    onChange={handleCnicChange}
                    onKeyDown={handleCnicKeyDown}
                    maxLength={15} autoFocus autoComplete="off"
                  />
                </div>
                <div className="lg-track">
                  {Array.from({ length: 13 }, (_, i) => (
                    <div key={i} className={`lg-seg${i < cnicDigits ? (cnicDone ? " complete" : " filled") : ""}`} />
                  ))}
                  <span className="lg-count" style={cnicDone ? { color: "#059669" } : {}}>{cnicDigits}/13</span>
                </div>
              </div>

              {/* Password */}
              <div className="lg-field">
                <label className="lg-lbl">
                  <span className="lg-lbl-bar" />Password
                </label>
                <div className="lg-inp-wrap">
                  <span className="lg-inp-icon">
                    <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    className="lg-inp"
                    type={showPwd ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    style={{ paddingRight: 42 }}
                  />
                  <button type="button" className="lg-eye" onClick={() => setShowPwd(s => !s)} tabIndex={-1}>
                    {showPwd
                      ? <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      : <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    }
                  </button>
                </div>
              </div>

              <button type="submit" className="lg-btn" disabled={loading}>
                {loading
                  ? <><div className="lg-spin" /> Authenticating…</>
                  : <>
                    <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
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