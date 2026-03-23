import React, { useEffect, useState, useRef } from "react";

/* ─── Inject styles once at module level — never as a render child ─────── */
if (typeof document !== "undefined" && !document.getElementById("ntf-orca-css")) {
  const tag = document.createElement("style");
  tag.id = "ntf-orca-css";
  tag.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

    @keyframes ntf-in {
      0%   { opacity:0; transform:translateX(120%) scale(.94); }
      65%  { opacity:1; transform:translateX(-5px) scale(1.01); }
      100% { opacity:1; transform:translateX(0)   scale(1); }
    }
    @keyframes ntf-out {
      0%   { opacity:1; transform:translateX(0)   scale(1); }
      100% { opacity:0; transform:translateX(120%) scale(.94); }
    }
    @keyframes ntf-bar {
      from { transform:scaleX(1); }
      to   { transform:scaleX(0); }
    }
    @keyframes ntf-pulse {
      0%,100% { opacity:.55; transform:scale(1); }
      50%     { opacity:1;   transform:scale(1.22); }
    }
    @keyframes ntf-shimmer {
      0%   { left:-80%; }
      100% { left:140%; }
    }

    .ntf-host {
      position:fixed !important;
      top:20px !important;
      right:20px !important;
      z-index:2147483647 !important;
      min-width:300px;
      max-width:390px;
      /* no background, no display:block layout — just a fixed anchor */
      background:none !important;
      border:none !important;
      padding:0 !important;
      margin:0 !important;
      pointer-events:none;
    }
    .ntf-card {
      pointer-events:auto;
      position:relative;
      overflow:hidden;
      border-radius:15px;
      background:rgba(10,14,18,.9);
      backdrop-filter:blur(28px) saturate(150%);
      -webkit-backdrop-filter:blur(28px) saturate(150%);
      border:1px solid rgba(201,168,90,.15);
      font-family:'DM Sans',system-ui,sans-serif;
    }
    .ntf-card.ntf-in  { animation:ntf-in  .38s cubic-bezier(.22,1.2,.5,1) both; }
    .ntf-card.ntf-out { animation:ntf-out .26s cubic-bezier(.55,0,1,1) both; }

    .ntf-shimmer {
      position:absolute; top:0; width:40%; height:100%;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.035),transparent);
      pointer-events:none;
      animation:ntf-shimmer 3.4s ease-in-out infinite;
    }
    .ntf-close {
      background:none; border:none; cursor:pointer;
      padding:4px; border-radius:6px; flex-shrink:0;
      display:flex; align-items:center; justify-content:center;
      color:rgba(165,168,166,.45);
      transition:color .12s, background .12s;
    }
    .ntf-close:hover { color:rgba(245,245,245,.8); background:rgba(255,255,255,.07); }
  `;
  document.head.appendChild(tag);
}

/* ─── Type config ────────────────────────────────────────────────────────── */
const T = {
  success: {
    label:"Success", accent:"#22c55e", glow:"rgba(34,197,94,.22)",
    iconBg:"rgba(34,197,94,.11)", iconBorder:"rgba(34,197,94,.28)", iconColor:"#22c55e",
    icon:<svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>,
  },
  error: {
    label:"Error", accent:"#ef4444", glow:"rgba(239,68,68,.2)",
    iconBg:"rgba(239,68,68,.1)", iconBorder:"rgba(239,68,68,.28)", iconColor:"#ef4444",
    icon:<svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>,
  },
  warning: {
    label:"Warning", accent:"#C9A85A", glow:"rgba(201,168,90,.2)",
    iconBg:"rgba(201,168,90,.1)", iconBorder:"rgba(201,168,90,.3)", iconColor:"#C9A85A",
    icon:<svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>,
  },
  info: {
    label:"Notice", accent:"#A5A8A6", glow:"rgba(37,50,64,.35)",
    iconBg:"rgba(37,50,64,.2)", iconBorder:"rgba(37,50,64,.4)", iconColor:"#A5A8A6",
    icon:<svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  },
};

const DURATION = 3800;

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function Notification({ message, type = "info", onClose }) {
  const [phase,   setPhase]   = useState("idle");
  const [current, setCurrent] = useState({ message:"", type:"info" });
  const [key,     setKey]     = useState(0);
  const timer = useRef(null);

  const dismiss = () => {
    clearTimeout(timer.current);
    setPhase("out");
    setTimeout(() => { setPhase("idle"); onClose?.(); }, 280);
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
      setTimeout(show, 280);
    } else {
      show();
    }
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line
  }, [message]);

  /* Nothing in DOM when idle — no white space, no block element */
  if (phase === "idle") return null;

  const t = T[current.type] || T.info;

  return (
    <div className="ntf-host">
      <div
        key={key}
        role="alert"
        aria-live="polite"
        className={`ntf-card ${phase === "out" ? "ntf-out" : "ntf-in"}`}
        style={{
          boxShadow:`0 0 0 .5px rgba(255,255,255,.04) inset, 0 20px 56px rgba(0,0,0,.6), 0 4px 18px rgba(0,0,0,.4), 0 0 28px ${t.glow}`,
        }}
      >
        {/* Shimmer */}
        <div className="ntf-shimmer"/>

        {/* Top typed bar */}
        <div style={{
          height:3,
          background:`linear-gradient(90deg, ${t.accent} 0%, ${t.accent}80 55%, transparent 100%)`,
        }}/>

        {/* Left typed bar */}
        <div style={{
          position:"absolute", left:0, top:3, bottom:0, width:3, borderRadius:"0 0 0 15px",
          background:`linear-gradient(180deg, ${t.accent} 0%, ${t.accent}40 65%, transparent 100%)`,
        }}/>

        {/* Body */}
        <div style={{display:"flex", alignItems:"flex-start", gap:12, padding:"13px 15px 15px 17px"}}>

          {/* Icon */}
          <div style={{position:"relative", flexShrink:0}}>
            {/* Pulse dot */}
            <div style={{
              position:"absolute", top:-2, right:-2, zIndex:2,
              width:7, height:7, borderRadius:"50%",
              background:t.accent, boxShadow:`0 0 8px ${t.accent}`,
              animation:"ntf-pulse 2s ease-in-out infinite",
            }}/>
            <div style={{
              width:36, height:36, borderRadius:10,
              background:t.iconBg, border:`1px solid ${t.iconBorder}`,
              display:"flex", alignItems:"center", justifyContent:"center",
              color:t.iconColor,
              boxShadow:`0 0 14px ${t.glow}, inset 0 1px 0 rgba(255,255,255,.06)`,
            }}>
              {t.icon}
            </div>
          </div>

          {/* Text */}
          <div style={{flex:1, minWidth:0}}>
            <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:5}}>
              <span style={{
                fontFamily:"'DM Mono',monospace",
                fontSize:9, fontWeight:500, letterSpacing:".16em",
                textTransform:"uppercase", color:t.accent,
              }}>{t.label}</span>
              <div style={{flex:1, height:1, background:`linear-gradient(90deg, ${t.accent}40, transparent)`}}/>
            </div>
            <div style={{
              fontFamily:"'DM Sans',sans-serif",
              fontSize:13, fontWeight:500, lineHeight:1.55,
              color:"rgba(242,242,242,.9)", wordBreak:"break-word",
            }}>
              {current.message}
            </div>
          </div>

          {/* Close */}
          <button className="ntf-close" onClick={dismiss} title="Dismiss">
            <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div style={{height:2, background:"rgba(255,255,255,.05)", position:"relative", overflow:"hidden"}}>
          <div key={`p-${key}`} style={{
            position:"absolute", inset:0, transformOrigin:"left",
            background:`linear-gradient(90deg, ${t.accent}, ${t.accent}70)`,
            animation:`ntf-bar ${DURATION}ms linear both`,
          }}/>
        </div>

      </div>
    </div>
  );
}