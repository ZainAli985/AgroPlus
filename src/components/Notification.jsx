import React, { useEffect, useState, useRef } from "react";

if (typeof document !== "undefined" && !document.getElementById("ntf-css")) {
  const tag = document.createElement("style");
  tag.id = "ntf-css";
  tag.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

    @keyframes ntf-in {
      0%   { opacity:0; transform:translateX(calc(100% + 24px)); }
      70%  { opacity:1; transform:translateX(-4px); }
      100% { opacity:1; transform:translateX(0); }
    }
    @keyframes ntf-out {
      0%   { opacity:1; transform:translateX(0); }
      100% { opacity:0; transform:translateX(calc(100% + 24px)); }
    }
    @keyframes ntf-bar {
      from { transform:scaleX(1); }
      to   { transform:scaleX(0); }
    }

    .ntf-host {
      position: fixed !important;
      top: 18px !important;
      right: 18px !important;
      z-index: 2147483647 !important;
      width: 340px;
      background: none !important;
      border: none !important;
      padding: 0 !important;
      margin: 0 !important;
      pointer-events: none;
    }
    .ntf-card {
      pointer-events: auto;
      position: relative;
      overflow: hidden;
      border-radius: 9px;
      background: #fff;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 20px rgba(0,0,0,.1), 0 1px 4px rgba(0,0,0,.06);
      font-family: 'DM Sans', sans-serif;
    }
    .ntf-card.ntf-in  { animation: ntf-in  .32s cubic-bezier(.22,1.2,.5,1) both; }
    .ntf-card.ntf-out { animation: ntf-out .22s cubic-bezier(.55,0,1,1) both; }

    .ntf-close {
      background: none; border: none; cursor: pointer;
      padding: 4px; border-radius: 5px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      color: #9ca3af; transition: color .1s, background .1s;
    }
    .ntf-close:hover { color: #374151; background: #f3f4f6; }
  `;
  document.head.appendChild(tag);
}

const T = {
  success: {
    label: "Success",
    accent: "#15803d",
    barBg: "#bbf7d0",
    iconBg: "#f0fdf4",
    iconBorder: "#bbf7d0",
    iconColor: "#15803d",
    topBar: "#15803d",
    icon: (
      <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
      </svg>
    ),
  },
  error: {
    label: "Error",
    accent: "#dc2626",
    barBg: "#fecaca",
    iconBg: "#fef2f2",
    iconBorder: "#fecaca",
    iconColor: "#dc2626",
    topBar: "#dc2626",
    icon: (
      <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    ),
  },
  warning: {
    label: "Warning",
    accent: "#d97706",
    barBg: "#fde68a",
    iconBg: "#fffbeb",
    iconBorder: "#fde68a",
    iconColor: "#d97706",
    topBar: "#d97706",
    icon: (
      <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      </svg>
    ),
  },
  info: {
    label: "Info",
    accent: "#374151",
    barBg: "#e5e7eb",
    iconBg: "#f9fafb",
    iconBorder: "#e5e7eb",
    iconColor: "#374151",
    topBar: "#6b7280",
    icon: (
      <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
};

const DURATION = 3800;

export default function Notification({ message, type = "info", onClose }) {
  const [phase,   setPhase]   = useState("idle");
  const [current, setCurrent] = useState({ message: "", type: "info" });
  const [key,     setKey]     = useState(0);
  const timer = useRef(null);

  const dismiss = () => {
    clearTimeout(timer.current);
    setPhase("out");
    setTimeout(() => { setPhase("idle"); onClose?.(); }, 240);
  };

  useEffect(() => {
    if (!message) return;
    clearTimeout(timer.current);
    const show = () => {
      setCurrent({ message, type });
      setKey(k => k + 1);
      setPhase("in");
      timer.current = setTimeout(dismiss, DURATION);
    };
    if (phase === "in") {
      setPhase("out");
      setTimeout(show, 240);
    } else {
      show();
    }
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line
  }, [message]);

  if (phase === "idle") return null;

  const t = T[current.type] || T.info;

  return (
    <div className="ntf-host">
      <div
        key={key}
        role="alert"
        aria-live="polite"
        className={`ntf-card ${phase === "out" ? "ntf-out" : "ntf-in"}`}
      >
        {/* Top accent bar */}
        <div style={{
          height: 3,
          background: t.topBar,
          borderRadius: "9px 9px 0 0",
        }}/>

        {/* Body */}
        <div style={{ display:"flex", alignItems:"flex-start", gap:11, padding:"12px 13px 14px" }}>

          {/* Icon */}
          <div style={{
            width: 32, height: 32, borderRadius: 7, flexShrink: 0,
            background: t.iconBg, border: `1px solid ${t.iconBorder}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: t.iconColor,
          }}>
            {t.icon}
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9.5, fontWeight: 600, letterSpacing: ".1em",
              textTransform: "uppercase", color: t.accent, marginBottom: 4,
            }}>
              {t.label}
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 500, lineHeight: 1.5,
              color: "#111827", wordBreak: "break-word",
            }}>
              {current.message}
            </div>
          </div>

          {/* Close */}
          <button className="ntf-close" onClick={dismiss} title="Dismiss">
            <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ height: 2, background: t.barBg, position:"relative", overflow:"hidden" }}>
          <div key={`p-${key}`} style={{
            position: "absolute", inset: 0, transformOrigin: "left",
            background: t.accent,
            animation: `ntf-bar ${DURATION}ms linear both`,
          }}/>
        </div>
      </div>
    </div>
  );
}