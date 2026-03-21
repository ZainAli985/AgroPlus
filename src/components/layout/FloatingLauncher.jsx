/**
 * FloatingLauncher.jsx — Agro Plus themed, smart quadrant-aware fan.
 *
 * Drag anywhere on screen. Satellites always fan INWARD — away from the
 * nearest corner — so they never escape the viewport regardless of position.
 *
 * Fan directions:
 *   bottom-right quadrant → fan up-left   (default)
 *   bottom-left quadrant  → fan up-right
 *   top-right quadrant    → fan down-left
 *   top-left quadrant     → fan down-right
 *   near left edge only   → fan right
 *   near right edge only  → fan left
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

/* ─── Agro Plus CSS ──────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700&display=swap');

  .fl-wrap *, .fl-wrap *::before, .fl-wrap *::after { box-sizing: border-box; }

  .fl-wrap {
    position: fixed;
    z-index: 9999;
    right: 28px; bottom: 28px;
    user-select: none;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  }

  /* drag hint */
  .fl-drag-hint {
    position: absolute; top: -20px; left: 50%; transform: translateX(-50%);
    font-size: 9px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
    color: rgba(245,230,200,.45); white-space: nowrap; pointer-events: none;
    opacity: 0; transition: opacity .15s;
    background: rgba(26,32,14,.75); padding: 2px 8px; border-radius: 4px;
    border: 1px solid rgba(212,168,67,.12);
  }
  .fl-wrap:hover .fl-drag-hint { opacity: 1; }
  .fl-wrap.dragging .fl-drag-hint { opacity: 0 !important; }

  /* stage */
  .fl-stage {
    position: relative; width: 56px; height: 56px; overflow: visible;
  }

  /* ── core ── */
  .fl-core {
    position: absolute; bottom: 0; left: 0;
    width: 56px; height: 56px; border-radius: 50%;
    background: linear-gradient(135deg, #2F4F1F 0%, #4E7A2E 45%, #D4A843 100%);
    border: 2px solid rgba(212,168,67,.35);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    box-shadow:
      0 6px 24px rgba(78,122,46,.55),
      0 2px 8px rgba(0,0,0,.4),
      inset 0 1px 0 rgba(242,198,109,.2);
    transition: transform .18s, box-shadow .18s;
    z-index: 2;
  }
  .fl-core:hover {
    transform: scale(1.07);
    box-shadow: 0 8px 30px rgba(212,168,67,.45), 0 2px 10px rgba(0,0,0,.45),
      inset 0 1px 0 rgba(242,198,109,.3);
  }
  .fl-wrap.open .fl-core {
    background: linear-gradient(135deg, #4E7A2E 0%, #D4A843 60%, #F08A3C 100%);
    transform: scale(1.08);
  }

  /* pulse ring */
  .fl-core::after {
    content: ''; position: absolute; inset: -7px; border-radius: 50%;
    border: 1.5px solid rgba(212,168,67,.35);
    opacity: 0; transform: scale(.82);
    transition: opacity .22s, transform .28s;
  }
  .fl-wrap.open .fl-core::after { opacity: 1; transform: scale(1); }

  /* icon cross-fade */
  .fl-icon {
    position: absolute; display: flex; align-items: center; justify-content: center;
    transition: opacity .18s, transform .22s;
  }
  .fl-icon-grid  { opacity: 1; transform: rotate(0deg) scale(1); }
  .fl-icon-close { opacity: 0; transform: rotate(-90deg) scale(.4); }
  .fl-wrap.open .fl-icon-grid  { opacity: 0; transform: rotate(90deg) scale(.4); }
  .fl-wrap.open .fl-icon-close { opacity: 1; transform: rotate(0deg) scale(1); }

  .fl-wrap.dragging { cursor: grabbing; }
  .fl-wrap.dragging .fl-core { cursor: grabbing; }

  /* ── satellites ── */
  .fl-sat {
    position: absolute;
    width: 46px; height: 46px; border-radius: 50%;
    background: rgba(26,32,14,.88);
    border: 1.5px solid rgba(212,168,67,.22);
    display: flex; align-items: center; justify-content: center;
    color: rgba(245,230,200,.7); text-decoration: none;
    bottom: 5px; left: 5px;
    opacity: 0; pointer-events: none; transform: scale(0.15);
    transition:
      opacity .22s cubic-bezier(.4,0,.2,1),
      transform .28s cubic-bezier(.34,1.56,.64,1),
      background .12s, border-color .12s, color .12s;
    box-shadow: 0 4px 16px rgba(0,0,0,.5), inset 0 1px 0 rgba(212,168,67,.08);
    z-index: 3;
    backdrop-filter: blur(8px);
  }
  .fl-sat:nth-child(1) { transition-delay: 0s; }
  .fl-sat:nth-child(2) { transition-delay: .04s; }
  .fl-sat:nth-child(3) { transition-delay: .08s; }
  .fl-sat:nth-child(4) { transition-delay: .12s; }
  .fl-sat:nth-child(5) { transition-delay: .16s; }

  .fl-wrap.open .fl-sat { opacity: 1; pointer-events: auto; }
  .fl-sat:hover {
    background: rgba(78,122,46,.55);
    border-color: rgba(212,168,67,.55);
    color: #F2C66D;
    box-shadow: 0 4px 18px rgba(78,122,46,.4), inset 0 1px 0 rgba(242,198,109,.15);
  }

  /* ── 4 fan directions — r=110px arc ── */

  /* UP-LEFT (bottom-right quadrant — default) */
  .fl-wrap.fan-ul.open .fl-sat-0 { transform: translate(-95px, -55px) scale(1); }
  .fl-wrap.fan-ul.open .fl-sat-1 { transform: translate(-55px, -95px) scale(1); }
  .fl-wrap.fan-ul.open .fl-sat-2 { transform: translate(  0px,-110px) scale(1); }
  .fl-wrap.fan-ul.open .fl-sat-3 { transform: translate( 55px, -95px) scale(1); }
  .fl-wrap.fan-ul.open .fl-sat-4 { transform: translate( 95px, -55px) scale(1); }

  /* UP-RIGHT (bottom-left quadrant) */
  .fl-wrap.fan-ur.open .fl-sat-0 { transform: translate(-95px, -55px) scale(1); }
  .fl-wrap.fan-ur.open .fl-sat-1 { transform: translate(-55px, -95px) scale(1); }
  .fl-wrap.fan-ur.open .fl-sat-2 { transform: translate(  0px,-110px) scale(1); }
  .fl-wrap.fan-ur.open .fl-sat-3 { transform: translate( 55px, -95px) scale(1); }
  .fl-wrap.fan-ur.open .fl-sat-4 { transform: translate( 95px, -55px) scale(1); }

  /* DOWN-LEFT (top-right quadrant) — y mirrored */
  .fl-wrap.fan-dl.open .fl-sat-0 { transform: translate(-95px,  55px) scale(1); }
  .fl-wrap.fan-dl.open .fl-sat-1 { transform: translate(-55px,  95px) scale(1); }
  .fl-wrap.fan-dl.open .fl-sat-2 { transform: translate(  0px, 110px) scale(1); }
  .fl-wrap.fan-dl.open .fl-sat-3 { transform: translate( 55px,  95px) scale(1); }
  .fl-wrap.fan-dl.open .fl-sat-4 { transform: translate( 95px,  55px) scale(1); }

  /* DOWN-RIGHT (top-left quadrant) — y mirrored */
  .fl-wrap.fan-dr.open .fl-sat-0 { transform: translate(-95px,  55px) scale(1); }
  .fl-wrap.fan-dr.open .fl-sat-1 { transform: translate(-55px,  95px) scale(1); }
  .fl-wrap.fan-dr.open .fl-sat-2 { transform: translate(  0px, 110px) scale(1); }
  .fl-wrap.fan-dr.open .fl-sat-3 { transform: translate( 55px,  95px) scale(1); }
  .fl-wrap.fan-dr.open .fl-sat-4 { transform: translate( 95px,  55px) scale(1); }

  /* PURE LEFT (right edge) */
  .fl-wrap.fan-l.open .fl-sat-0 { transform: translate(-55px, -95px) scale(1); }
  .fl-wrap.fan-l.open .fl-sat-1 { transform: translate(-95px, -55px) scale(1); }
  .fl-wrap.fan-l.open .fl-sat-2 { transform: translate(-110px,  0px) scale(1); }
  .fl-wrap.fan-l.open .fl-sat-3 { transform: translate(-95px,  55px) scale(1); }
  .fl-wrap.fan-l.open .fl-sat-4 { transform: translate(-55px,  95px) scale(1); }

  /* PURE RIGHT (left edge) */
  .fl-wrap.fan-r.open .fl-sat-0 { transform: translate( 55px, -95px) scale(1); }
  .fl-wrap.fan-r.open .fl-sat-1 { transform: translate( 95px, -55px) scale(1); }
  .fl-wrap.fan-r.open .fl-sat-2 { transform: translate(110px,   0px) scale(1); }
  .fl-wrap.fan-r.open .fl-sat-3 { transform: translate( 95px,  55px) scale(1); }
  .fl-wrap.fan-r.open .fl-sat-4 { transform: translate( 55px,  95px) scale(1); }

  /* ── tooltip ── */
  .fl-tip {
    position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);
    background: rgba(26,32,14,.92); color: #F2C66D;
    border: 1px solid rgba(212,168,67,.25);
    font-size: 9.5px; font-weight: 700; white-space: nowrap;
    padding: 3px 9px; border-radius: 5px; pointer-events: none;
    opacity: 0; transition: opacity .12s;
    letter-spacing: .07em; text-transform: uppercase;
    box-shadow: 0 2px 10px rgba(0,0,0,.4);
  }
  /* tooltip flips when fanning down */
  .fl-wrap.fan-dl .fl-tip,
  .fl-wrap.fan-dr .fl-tip {
    bottom: auto; top: calc(100% + 8px);
  }
  .fl-sat:hover .fl-tip { opacity: 1; }

  /* current-page highlight */
  .fl-sat.fl-sat-current {
    border-color: rgba(212,168,67,.6);
    background: rgba(78,122,46,.45);
    color: #D4A843;
  }
`;

/* ─── Shortcuts ────────────────────────────────────────────────────────── */
const SHORTCUTS = [
  {
    path: "/dashboard", label: "Home",
    icon: <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15.75a.75.75 0 01-.75-.75v-4.5h-6V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"/></svg>,
  },
  {
    path: "/cashbook", label: "Cashbook",
    icon: <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  },
  {
    path: "/add-invoice-purchase", label: "Purchase",
    icon: <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
  },
  {
    path: "/add-invoice-sales", label: "Sales",
    icon: <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/></svg>,
  },
  {
    path: "/weight-bridge", label: "W·Bridge",
    icon: <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>,
  },
];

/* ── Fan class from position ──────────────────────────────────────────────
   Divides viewport into zones and returns the class that fans AWAY from
   the nearest corner/edge so satellites never leave the screen.
─────────────────────────────────────────────────────────────────────── */
function getFanClass(left, top) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const rx = (left + 28) / vw;  // normalised 0-1 (centre of widget)
  const ry = (top  + 28) / vh;

  const nearLeft  = rx < 0.2;
  const nearRight = rx > 0.8;
  const nearTop   = ry < 0.25;
  const nearBot   = ry > 0.75;

  // Edge-only overrides
  if (nearLeft  && !nearTop && !nearBot) return "fan-r";
  if (nearRight && !nearTop && !nearBot) return "fan-l";

  // Quadrant-based
  if (nearTop  && rx >= 0.5) return "fan-dl";  // top-right  → down-left
  if (nearTop  && rx <  0.5) return "fan-dr";  // top-left   → down-right
  if (nearBot  && rx >= 0.5) return "fan-ul";  // bot-right  → up-left
  if (nearBot  && rx <  0.5) return "fan-ur";  // bot-left   → up-right

  // Default quadrant
  if (rx >= 0.5 && ry >= 0.5) return "fan-ul";
  if (rx <  0.5 && ry >= 0.5) return "fan-ur";
  if (rx >= 0.5 && ry <  0.5) return "fan-dl";
  return "fan-dr";
}

/* ─── Component ────────────────────────────────────────────────────────── */
export default function FloatingLauncher() {
  const location = useLocation();
  if (location.pathname === "/") return null;

  const role          = localStorage.getItem("role") || "Admin";
  const isAdmin       = role === "Admin";
  const allowedRoutes = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem("allowedRoutes")) || []; }
    catch { return []; }
  }, []);
  const can     = p => isAdmin || allowedRoutes.includes(p);
  const visible = SHORTCUTS.filter(s => can(s.path));

  const [pos,      setPos]      = useState(null);   // null = CSS default bottom-right
  const [open,     setOpen]     = useState(false);
  const [dragging, setDragging] = useState(false);
  const [fanClass, setFanClass] = useState("fan-ul");

  const wrapRef   = useRef(null);
  const dragState = useRef({ active:false, startX:0, startY:0, originX:0, originY:0, moved:false });

  // Close on outside click
  useEffect(() => {
    const h = e => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Init fan class from default position (bottom-right)
  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setFanClass(getFanClass(vw - 56, vh - 56));
  }, []);

  const onPointerDown = useCallback(e => {
    if (e.button !== 0) return;
    e.preventDefault();
    const rect = wrapRef.current.getBoundingClientRect();
    dragState.current = {
      active: true, moved: false,
      startX: e.clientX, startY: e.clientY,
      originX: rect.left, originY: rect.top,
    };
    setDragging(true);

    const onMove = ev => {
      if (!dragState.current.active) return;
      const dx = ev.clientX - dragState.current.startX;
      const dy = ev.clientY - dragState.current.startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragState.current.moved = true;

      const newLeft = dragState.current.originX + dx;
      const newTop  = dragState.current.originY + dy;
      const W = window.innerWidth  - 56;
      const H = window.innerHeight - 56;
      const cl = Math.max(0, Math.min(newLeft, W));
      const ct = Math.max(0, Math.min(newTop,  H));

      setPos({ left: cl, top: ct });
      setFanClass(getFanClass(cl, ct));
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

  const onCoreClick = () => {
    if (dragState.current.moved) { dragState.current.moved = false; return; }
    setOpen(o => !o);
  };

  const posStyle = pos
    ? { left: pos.left, top: pos.top, right: "auto", bottom: "auto" }
    : {};

  const cls = ["fl-wrap", fanClass, open?"open":"", dragging?"dragging":""].filter(Boolean).join(" ");

  return (
    <>
      <style>{CSS}</style>
      <div ref={wrapRef} className={cls} style={posStyle}>
        <span className="fl-drag-hint">drag to move</span>

        <div className="fl-stage" onPointerDown={onPointerDown}>

          {/* Satellites */}
          {visible.map((s, i) => {
            const isCurrent = location.pathname === s.path ||
              location.pathname.startsWith(s.path + "/");
            return (
              <Link
                key={s.path}
                to={s.path}
                className={`fl-sat fl-sat-${i}${isCurrent?" fl-sat-current":""}`}
                onClick={() => setOpen(false)}
                draggable={false}
              >
                {s.icon}
                <span className="fl-tip">{s.label}</span>
              </Link>
            );
          })}

          {/* Core */}
          <div className="fl-core" onClick={onCoreClick}>
            <span className="fl-icon fl-icon-grid">
              <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="rgba(245,230,200,.92)" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
              </svg>
            </span>
            <span className="fl-icon fl-icon-close">
              <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="rgba(245,230,200,.92)" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </span>
          </div>

        </div>
      </div>
    </>
  );
}