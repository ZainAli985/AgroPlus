/**
 * FloatingLauncher.jsx
 *
 * Draggable floating quick-access launcher.
 * Sits at bottom-right by default. Drag to reposition anywhere.
 * Click core to fan out satellite shortcuts, click outside to close.
 *
 * Usage (add once in App.jsx or your root layout, outside SidebarLayout):
 *
 *   import FloatingLauncher from "./components/FloatingLauncher.jsx";
 *   ...
 *   <FloatingLauncher />
 *
 * Access-awareness: reads `role` and `allowedRoutes` from localStorage —
 * the same values set at login — so non-admin users only see their shortcuts.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

/* ─── CSS ────────────────────────────────────────────────────────────────── */
const CSS = `
  .fl-wrap *, .fl-wrap *::before, .fl-wrap *::after { box-sizing: border-box; }

  /* Fixed container — position is overridden by inline style via drag */
  .fl-wrap {
    position: fixed;
    z-index: 9999;
    /* default position: bottom-right — overridden by state */
    right: 28px;
    bottom: 28px;
    user-select: none;
    font-family: 'DM Sans', system-ui, sans-serif;
  }

  /* ── drag handle strip (shows on hover of whole widget) ── */
  .fl-drag-hint {
    position: absolute;
    top: -18px; left: 50%; transform: translateX(-50%);
    font-size: 9px; font-weight: 700; letter-spacing: .08em;
    text-transform: uppercase; color: rgba(255,255,255,.35);
    white-space: nowrap; pointer-events: none;
    opacity: 0; transition: opacity .15s;
    background: rgba(15,23,42,.7); padding: 2px 8px; border-radius: 4px;
  }
  .fl-wrap:hover .fl-drag-hint { opacity: 1; }

  /* ── stage — the area satellites live in ── */
  .fl-stage {
    position: relative;
    width: 56px; height: 56px;
    /* expands via overflow:visible so satellites are visible */
    overflow: visible;
  }

  /* ── core button ── */
  .fl-core {
    position: absolute; bottom: 0; left: 0;
    width: 56px; height: 56px; border-radius: 50%;
    background: linear-gradient(135deg,#6366f1,#4338ca);
    border: 2px solid rgba(255,255,255,.2);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    box-shadow: 0 6px 24px rgba(99,102,241,.5), 0 2px 8px rgba(0,0,0,.3);
    transition: transform .18s, box-shadow .18s, background .18s;
    z-index: 2;
  }
  .fl-core:hover {
    transform: scale(1.07);
    box-shadow: 0 8px 28px rgba(99,102,241,.6), 0 2px 10px rgba(0,0,0,.35);
  }
  .fl-wrap.open .fl-core {
    background: linear-gradient(135deg,#7c3aed,#6366f1);
    transform: scale(1.1);
  }

  /* pulse ring */
  .fl-core::after {
    content: '';
    position: absolute; inset: -6px; border-radius: 50%;
    border: 1.5px solid rgba(99,102,241,.4);
    opacity: 0; transform: scale(.85);
    transition: opacity .2s, transform .25s;
  }
  .fl-wrap.open .fl-core::after { opacity: 1; transform: scale(1); }

  /* icon cross-fade */
  .fl-icon {
    position: absolute;
    display: flex; align-items: center; justify-content: center;
    transition: opacity .18s, transform .22s;
  }
  .fl-icon-grid  { opacity: 1; transform: rotate(0deg) scale(1); }
  .fl-icon-close { opacity: 0; transform: rotate(-90deg) scale(.5); }
  .fl-wrap.open .fl-icon-grid  { opacity: 0; transform: rotate(90deg) scale(.5); }
  .fl-wrap.open .fl-icon-close { opacity: 1; transform: rotate(0deg) scale(1); }

  /* ── dragging cursor ── */
  .fl-wrap.dragging { cursor: grabbing; }
  .fl-wrap.dragging .fl-core { cursor: grabbing; }

  /* ── satellite buttons ── */
  .fl-sat {
    position: absolute;
    width: 48px; height: 48px; border-radius: 50%;
    background: #1e293b;
    border: 1.5px solid rgba(255,255,255,.15);
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,.75); text-decoration: none;
    /* collapsed — stacked on core centre */
    bottom: 4px; left: 4px;
    opacity: 0; pointer-events: none;
    transform: scale(0.2);
    transition:
      opacity .22s cubic-bezier(.4,0,.2,1),
      transform .26s cubic-bezier(.34,1.56,.64,1),
      background .12s, border-color .12s;
    box-shadow: 0 3px 14px rgba(0,0,0,.45);
    z-index: 3;
  }
  /* stagger delays */
  .fl-sat:nth-child(1) { transition-delay: 0s; }
  .fl-sat:nth-child(2) { transition-delay: .04s; }
  .fl-sat:nth-child(3) { transition-delay: .08s; }
  .fl-sat:nth-child(4) { transition-delay: .12s; }
  .fl-sat:nth-child(5) { transition-delay: .16s; }

  .fl-wrap.open .fl-sat { opacity: 1; pointer-events: auto; }

  /*
   * Arc radius = 112px, 5 satellites evenly at 30° steps
   * Angles (standard math CCW): 210° 240° 270° 300° 330°
   * CSS: tx = r·cos(a), ty = -r·sin(a)  (negative y = upward in CSS)
   */
  .fl-wrap.open .fl-sat-0 { transform: translate(-97px, -56px) scale(1); }
  .fl-wrap.open .fl-sat-1 { transform: translate(-56px, -97px) scale(1); }
  .fl-wrap.open .fl-sat-2 { transform: translate(  0px,-112px) scale(1); }
  .fl-wrap.open .fl-sat-3 { transform: translate( 56px, -97px) scale(1); }
  .fl-wrap.open .fl-sat-4 { transform: translate( 97px, -56px) scale(1); }

  /* when widget is near top of screen — fan DOWNWARD (mirror y) */
  .fl-wrap.fan-down.open .fl-sat-0 { transform: translate(-97px,  56px) scale(1); }
  .fl-wrap.fan-down.open .fl-sat-1 { transform: translate(-56px,  97px) scale(1); }
  .fl-wrap.fan-down.open .fl-sat-2 { transform: translate(  0px, 112px) scale(1); }
  .fl-wrap.fan-down.open .fl-sat-3 { transform: translate( 56px,  97px) scale(1); }
  .fl-wrap.fan-down.open .fl-sat-4 { transform: translate( 97px,  56px) scale(1); }

  .fl-sat:hover {
    background: #334155; border-color: rgba(99,102,241,.55);
    color: #a5b4fc;
  }

  /* tooltip */
  .fl-tip {
    position: absolute;
    bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);
    background: #0f172a; color: #e2e8f0;
    border: 1px solid rgba(255,255,255,.1);
    font-size: 10px; font-weight: 700; white-space: nowrap;
    padding: 3px 9px; border-radius: 5px;
    pointer-events: none; opacity: 0; transition: opacity .12s;
    letter-spacing: .05em; text-transform: uppercase;
    box-shadow: 0 2px 8px rgba(0,0,0,.35);
  }
  .fl-wrap.fan-down .fl-tip {
    bottom: auto; top: calc(100% + 8px);
  }
  .fl-sat:hover .fl-tip { opacity: 1; }
`;

/* ─── Shortcuts ───────────────────────────────────────────────────────────── */
const SHORTCUTS = [
  {
    path: "/dashboard", label: "Home",
    icon: <svg width={17} height={17} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15.75a.75.75 0 01-.75-.75v-4.5h-6V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"/></svg>,
  },
  {
    path: "/cashbook", label: "Cashbook",
    icon: <svg width={17} height={17} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  },
  {
    path: "/add-invoice-purchase", label: "Purchase",
    icon: <svg width={17} height={17} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
  },
  {
    path: "/add-invoice-sales", label: "Sales",
    icon: <svg width={17} height={17} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/></svg>,
  },
  {
    path: "/weight-bridge", label: "W-Bridge",
    icon: <svg width={17} height={17} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>,
  },
];

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function FloatingLauncher() {
  /* ── Access check ── */
  const role = localStorage.getItem("role") || "Admin";
  const isAdmin = role === "Admin";
  const allowedRoutes = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem("allowedRoutes")) || []; }
    catch { return []; }
  }, []);
  const can = (path) => isAdmin || allowedRoutes.includes(path);
  const visible = SHORTCUTS.filter(s => isAdmin || can(s.path));

  /* ── Position state — bottom-right default ── */
  const [pos, setPos] = useState(null); // null = use CSS default (bottom-right)
  const [open, setOpen] = useState(false);
  const [dragging, setDragging] = useState(false);

  /* Detect fan direction: if near top 30% of screen, fan downward */
  const [fanDown, setFanDown] = useState(false);

  const wrapRef   = useRef(null);
  const dragState = useRef({ active: false, startX: 0, startY: 0, originX: 0, originY: 0, moved: false });

  /* ── Close on outside click ── */
  useEffect(() => {
    const h = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  /* ── Drag: pointer events ── */
  const onPointerDown = useCallback((e) => {
    // only primary button
    if (e.button !== 0) return;
    e.preventDefault();

    const rect = wrapRef.current.getBoundingClientRect();
    dragState.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: rect.left,
      originY: rect.top,
      moved: false,
    };

    setDragging(true);

    const onMove = (ev) => {
      if (!dragState.current.active) return;
      const dx = ev.clientX - dragState.current.startX;
      const dy = ev.clientY - dragState.current.startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragState.current.moved = true;

      const newLeft = dragState.current.originX + dx;
      const newTop  = dragState.current.originY + dy;

      // clamp to viewport
      const W = window.innerWidth  - 56;
      const H = window.innerHeight - 56;
      const clampedLeft = Math.max(0, Math.min(newLeft, W));
      const clampedTop  = Math.max(0, Math.min(newTop,  H));

      setPos({ left: clampedLeft, top: clampedTop });
      setFanDown(clampedTop < window.innerHeight * 0.3);
    };

    const onUp = () => {
      dragState.current.active = false;
      setDragging(false);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup",   onUp);
    };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup",   onUp);
  }, []);

  /* ── Toggle open — only if not a drag ── */
  const onCoreClick = () => {
    if (dragState.current.moved) {
      dragState.current.moved = false;
      return;
    }
    setOpen(o => !o);
  };

  /* ── Inline position style ── */
  const posStyle = pos
    ? { left: pos.left, top: pos.top, right: "auto", bottom: "auto" }
    : {};

  const classes = [
    "fl-wrap",
    open     ? "open"     : "",
    dragging ? "dragging" : "",
    fanDown  ? "fan-down" : "",
  ].filter(Boolean).join(" ");

  return (
    <>
      <style>{CSS}</style>
      <div
        ref={wrapRef}
        className={classes}
        style={posStyle}
      >
        {/* Drag hint */}
        <span className="fl-drag-hint">drag to move</span>

        {/* Stage */}
        <div
          className="fl-stage"
          onPointerDown={onPointerDown}
        >
          {/* Satellites */}
          {visible.map((s, i) => (
            <Link
              key={s.path}
              to={s.path}
              className={`fl-sat fl-sat-${i}`}
              onClick={() => { setOpen(false); }}
              draggable={false}
            >
              {s.icon}
              <span className="fl-tip">{s.label}</span>
            </Link>
          ))}

          {/* Core button */}
          <div className="fl-core" onClick={onCoreClick}>
            <span className="fl-icon fl-icon-grid">
              <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,.92)" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
            </span>
            <span className="fl-icon fl-icon-close">
              <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,.92)" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}