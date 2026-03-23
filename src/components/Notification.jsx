import React, { useEffect, useState, useRef } from "react";

const ICONS = {
  success: (
    <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
    </svg>
  ),
  error: (
    <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  ),
  warning: (
    <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    </svg>
  ),
  info: (
    <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  ),
};

// ORCA theme palette applied to each type
const STYLES = {
  success: {
    bar:      "#22c55e",
    iconBg:   "rgba(34,197,94,.12)",
    iconColor:"#15803d",
    label:    "#15803d",
    border:   "rgba(34,197,94,.2)",
    bg:       "#fafffe",
  },
  error: {
    bar:      "#ef4444",
    iconBg:   "rgba(239,68,68,.1)",
    iconColor:"#b91c1c",
    label:    "#b91c1c",
    border:   "rgba(239,68,68,.2)",
    bg:       "#fffafa",
  },
  warning: {
    bar:      "#C9A85A",          // ← ORCA gold
    iconBg:   "rgba(201,168,90,.12)",
    iconColor:"#7A5A2B",
    label:    "#7A5A2B",
    border:   "rgba(201,168,90,.28)",
    bg:       "#fdfaf4",
  },
  info: {
    bar:      "#253240",          // ← ORCA navy
    iconBg:   "rgba(37,50,64,.1)",
    iconColor:"#212A37",
    label:    "#212A37",
    border:   "rgba(37,50,64,.18)",
    bg:       "#f7f8fa",
  },
};

const DURATION = 3500;

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  @keyframes ntfIn {
    from { opacity:0; transform:translateX(110%) scale(.96); }
    to   { opacity:1; transform:translateX(0)   scale(1); }
  }
  @keyframes ntfOut {
    from { opacity:1; transform:translateX(0)   scale(1); }
    to   { opacity:0; transform:translateX(110%) scale(.96); }
  }
  @keyframes ntfProgress {
    from { transform: scaleX(1); }
    to   { transform: scaleX(0); }
  }

  .ntf-wrap {
    font-family: 'DM Sans', system-ui, sans-serif;
  }
  .ntf-in  { animation: ntfIn  .3s cubic-bezier(.34,1.2,.64,1) both; }
  .ntf-out { animation: ntfOut .24s ease-in both; }

  .ntf-close {
    background: none; border: none; cursor: pointer; padding: 4px;
    border-radius: 6px; display: flex; align-items: center; justify-content: center;
    color: #A5A8A6; transition: color .12s, background .12s; flex-shrink: 0;
  }
  .ntf-close:hover { color: #334455; background: rgba(33,42,55,.07); }

  .ntf-progress-track {
    height: 2px; background: rgba(33,42,55,.06);
    position: relative; overflow: hidden; border-radius: 0 0 14px 14px;
  }
  .ntf-progress-fill {
    position: absolute; inset: 0;
    transform-origin: left;
    animation: ntfProgress linear both;
  }
`;

const LABEL = {
  success: "Success",
  error:   "Error",
  warning: "Warning",
  info:    "Notice",
};

const Notification = ({ message, type = "info", onClose }) => {
  const [phase,   setPhase]   = useState("idle");
  const [current, setCurrent] = useState({ message: "", type: "info" });
  const [key,     setKey]     = useState(0);
  const timerRef = useRef(null);

  const dismiss = () => {
    clearTimeout(timerRef.current);
    setPhase("out");
    setTimeout(() => { setPhase("idle"); onClose?.(); }, 260);
  };

  useEffect(() => {
    if (!message) return;
    clearTimeout(timerRef.current);
    if (phase === "in") {
      setPhase("out");
      setTimeout(() => {
        setCurrent({ message, type });
        setKey(k => k + 1);
        setPhase("in");
        timerRef.current = setTimeout(dismiss, DURATION);
      }, 260);
    } else {
      setCurrent({ message, type });
      setKey(k => k + 1);
      setPhase("in");
      timerRef.current = setTimeout(dismiss, DURATION);
    }
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  if (phase === "idle") return null;

  const s = STYLES[current.type] || STYLES.info;

  return (
    <>
      <style>{CSS}</style>
      <div
        key={key}
        className={`ntf-wrap ${phase === "out" ? "ntf-out" : "ntf-in"}`}
        role="alert"
        aria-live="polite"
        style={{
          position:     "fixed",
          top:          20,
          right:        20,
          zIndex:       99999,
          minWidth:     300,
          maxWidth:     400,
          background:   s.bg,
          border:       `1px solid ${s.border}`,
          borderRadius: 14,
          boxShadow:    `0 8px 32px rgba(11,12,13,.12), 0 2px 8px rgba(11,12,13,.06), 0 0 0 1px rgba(255,255,255,.5) inset`,
          overflow:     "hidden",
        }}
      >
        {/* Top accent line */}
        <div style={{
          height:           3,
          background:       s.bar,
          borderRadius:     "14px 14px 0 0",
        }}/>

        {/* Body */}
        <div style={{
          display:     "flex",
          alignItems:  "flex-start",
          gap:         11,
          padding:     "13px 14px 15px",
        }}>
          {/* Icon */}
          <div style={{
            flexShrink:     0,
            width:          32,
            height:         32,
            borderRadius:   9,
            background:     s.iconBg,
            border:         `1px solid ${s.border}`,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            color:          s.iconColor,
          }}>
            {ICONS[current.type] || ICONS.info}
          </div>

          {/* Text block */}
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{
              fontFamily:    "'DM Mono', monospace",
              fontSize:      9.5,
              fontWeight:    500,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color:         s.bar,
              marginBottom:  3,
            }}>
              {LABEL[current.type] || "Notice"}
            </div>
            <div style={{
              fontSize:   13,
              fontWeight: 500,
              color:      "#141A1F",
              lineHeight: 1.55,
              wordBreak:  "break-word",
            }}>
              {current.message}
            </div>
          </div>

          {/* Close */}
          <button className="ntf-close" onClick={dismiss} title="Dismiss">
            <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="ntf-progress-track">
          <div
            key={`p-${key}`}
            className="ntf-progress-fill"
            style={{
              background:              s.bar,
              animationDuration:       `${DURATION}ms`,
              animationTimingFunction: "linear",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Notification;