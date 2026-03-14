import React, { useEffect, useState, useRef } from "react";

const ICONS = {
  success: (
    <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
    </svg>
  ),
  error: (
    <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  ),
  warning: (
    <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    </svg>
  ),
  info: (
    <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  ),
};

const STYLES = {
  success: {
    bar:    "#22c55e",
    icon:   "rgba(34,197,94,.18)",
    color:  "#15803d",
    border: "rgba(34,197,94,.25)",
  },
  error: {
    bar:    "#ef4444",
    icon:   "rgba(239,68,68,.15)",
    color:  "#b91c1c",
    border: "rgba(239,68,68,.25)",
  },
  warning: {
    bar:    "#f59e0b",
    icon:   "rgba(245,158,11,.15)",
    color:  "#92400e",
    border: "rgba(245,158,11,.25)",
  },
  info: {
    bar:    "#6366f1",
    icon:   "rgba(99,102,241,.15)",
    color:  "#3730a3",
    border: "rgba(99,102,241,.25)",
  },
};

const DURATION = 3500;

const CSS = `
  @keyframes ntfSlideIn {
    from { opacity:0; transform:translateX(110%); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes ntfSlideOut {
    from { opacity:1; transform:translateX(0); }
    to   { opacity:0; transform:translateX(110%); }
  }
  @keyframes ntfProgress {
    from { width:100%; }
    to   { width:0%; }
  }
  .ntf-in  { animation: ntfSlideIn  .32s cubic-bezier(.34,1.26,.64,1) both; }
  .ntf-out { animation: ntfSlideOut .26s ease-in both; }
  .ntf-progress { animation: ntfProgress linear both; }
  .ntf-close {
    background:none; border:none; cursor:pointer; padding:3px;
    border-radius:6px; display:flex; align-items:center; justify-content:center;
    opacity:.45; transition:opacity .15s, background .15s;
  }
  .ntf-close:hover { opacity:1; background:rgba(0,0,0,.07); }
`;

const Notification = ({ message, type = "info", onClose }) => {
  const [phase,   setPhase]   = useState("idle"); // idle | in | out
  const [current, setCurrent] = useState({ message: "", type: "info" });
  const [key,     setKey]     = useState(0);
  const timerRef = useRef(null);

  const dismiss = () => {
    clearTimeout(timerRef.current);
    setPhase("out");
    setTimeout(() => {
      setPhase("idle");
      onClose?.();
    }, 280);
  };

  useEffect(() => {
    if (!message) return;
    clearTimeout(timerRef.current);

    // If already showing, slide out then back in (chained animation)
    if (phase === "in") {
      setPhase("out");
      setTimeout(() => {
        setCurrent({ message, type });
        setKey(k => k + 1);
        setPhase("in");
        timerRef.current = setTimeout(dismiss, DURATION);
      }, 280);
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
        className={phase === "out" ? "ntf-out" : "ntf-in"}
        style={{
          position:     "fixed",
          top:          20,
          right:        20,
          zIndex:       99999,
          minWidth:     280,
          maxWidth:     380,
          background:   "#fff",
          border:       `1px solid ${s.border}`,
          borderRadius: 14,
          boxShadow:    "0 8px 32px rgba(0,0,0,.12), 0 2px 8px rgba(0,0,0,.06)",
          overflow:     "hidden",
          fontFamily:   "'Plus Jakarta Sans', 'DM Sans', system-ui, sans-serif",
        }}
        role="alert"
        aria-live="polite"
      >
        {/* Colored top accent bar */}
        <div style={{ height: 3, background: s.bar, borderRadius: "14px 14px 0 0" }}/>

        {/* Body */}
        <div style={{
          display:     "flex",
          alignItems:  "flex-start",
          gap:         10,
          padding:     "12px 14px 14px",
        }}>
          {/* Icon blob */}
          <div style={{
            flexShrink:     0,
            width:          34,
            height:         34,
            borderRadius:   10,
            background:     s.icon,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            color:          s.bar,
            marginTop:      1,
          }}>
            {ICONS[current.type] || ICONS.info}
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize:   11,
              fontWeight: 700,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color:      s.bar,
              marginBottom: 2,
            }}>
              {current.type === "success" ? "Success"
                : current.type === "error"   ? "Error"
                : current.type === "warning" ? "Warning"
                : "Info"}
            </div>
            <div style={{
              fontSize:   13.5,
              fontWeight: 500,
              color:      "#1e293b",
              lineHeight: 1.5,
              wordBreak:  "break-word",
            }}>
              {current.message}
            </div>
          </div>

          {/* Close button */}
          <button
            className="ntf-close"
            onClick={dismiss}
            title="Dismiss"
            style={{ color: "#94a3b8", marginTop: 1, flexShrink: 0 }}
          >
            <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ height: 3, background: "rgba(0,0,0,.05)", position: "relative", overflow: "hidden" }}>
          <div
            key={`prog-${key}`}
            className="ntf-progress"
            style={{
              position:   "absolute",
              inset:      0,
              background: s.bar,
              animationDuration: `${DURATION}ms`,
              animationTimingFunction: "linear",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Notification;