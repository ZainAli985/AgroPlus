/**
 * FloatingLauncher.jsx — ORCA theme, smart boundary-aware fan.
 * 
 * Hidden on screens < 1024px (tablet/mobile).
 * Satellites fan AWAY from nearest edge — always stays inside viewport.
 * Arc radius is dynamically clamped so no satellite ever clips the edge.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

/* ─── CSS ──────────────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@600;700&family=DM+Mono:wght@500&display=swap');

  /* ── Hide entirely on tablet + mobile ── */
  @media (max-width: 1023px) {
    .fl-root { display: none !important; }
  }

  .fl-root *, .fl-root *::before, .fl-root *::after { box-sizing: border-box; }

  .fl-root {
    position: fixed;
    z-index: 9999;
    right: 28px; bottom: 28px;
    user-select: none;
    font-family: 'DM Sans', system-ui, sans-serif;
  }

  /* ── drag hint ── */
  .fl-hint {
    position: absolute; top: -22px; left: 50%; transform: translateX(-50%);
    font-size: 8.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
    color: rgba(146,145,131,.5); white-space: nowrap; pointer-events: none;
    opacity: 0; transition: opacity .15s;
    background: rgba(11,12,13,.85); padding: 2px 8px; border-radius: 4px;
    border: 1px solid rgba(146,145,131,.15);
    font-family: 'DM Mono', monospace;
  }
  .fl-root:hover .fl-hint { opacity: 1; }
  .fl-root.dragging .fl-hint { opacity: 0 !important; }

  /* ── stage ── */
  .fl-stage { position: relative; width: 54px; height: 54px; overflow: visible; }

  /* ── core button ── */
  .fl-core {
    position: absolute; bottom: 0; left: 0;
    width: 54px; height: 54px; border-radius: 50%;
    background: linear-gradient(135deg, #0B0C0D 0%, #212A37 50%, #929183 100%);
    border: 1.5px solid rgba(146,145,131,.3);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    box-shadow:
      0 6px 24px rgba(11,12,13,.45),
      0 2px 8px rgba(0,0,0,.4),
      inset 0 1px 0 rgba(209,179,106,.18);
    transition: transform .2s cubic-bezier(.34,1.4,.64,1), box-shadow .18s, background .18s;
    z-index: 2;
  }
  .fl-core:hover {
    transform: scale(1.08);
    box-shadow: 0 8px 28px rgba(146,145,131,.4), 0 2px 10px rgba(0,0,0,.4),
      inset 0 1px 0 rgba(209,179,106,.28);
  }
  .fl-root.open .fl-core {
    background: linear-gradient(135deg, #141A1F 0%, #253240 50%, #A8A79F 100%);
    transform: scale(1.06) rotate(45deg);
    border-color: rgba(146,145,131,.55);
    box-shadow: 0 0 0 8px rgba(146,145,131,.08), 0 8px 32px rgba(11,12,13,.5);
  }

  /* pulse ring */
  .fl-core::before {
    content: ''; position: absolute; inset: -8px; border-radius: 50%;
    border: 1px solid rgba(146,145,131,.2);
    opacity: 0; transform: scale(.8);
    transition: opacity .25s, transform .3s;
  }
  .fl-root.open .fl-core::before { opacity: 1; transform: scale(1); }
  
  /* second ring */
  .fl-core::after {
    content: ''; position: absolute; inset: -16px; border-radius: 50%;
    border: 1px solid rgba(146,145,131,.08);
    opacity: 0; transform: scale(.7);
    transition: opacity .3s .05s, transform .35s .05s;
  }
  .fl-root.open .fl-core::after { opacity: 1; transform: scale(1); }

  /* icon cross-fade */
  .fl-icon {
    position: absolute; display: flex; align-items: center; justify-content: center;
    transition: opacity .2s, transform .25s cubic-bezier(.34,1.4,.64,1);
  }
  .fl-icon-grid  { opacity: 1; transform: rotate(0deg) scale(1); }
  .fl-icon-close { opacity: 0; transform: rotate(135deg) scale(.3); }
  .fl-root.open .fl-icon-grid  { opacity: 0; transform: rotate(-135deg) scale(.3); }
  .fl-root.open .fl-icon-close { opacity: 1; transform: rotate(0deg) scale(1); }

  .fl-root.dragging { cursor: grabbing; }
  .fl-root.dragging .fl-core { cursor: grabbing; }

  /* ── satellites ── */
  .fl-sat {
    position: absolute;
    width: 44px; height: 44px; border-radius: 50%;
    background: rgba(11,12,13,.9);
    border: 1.5px solid rgba(146,145,131,.2);
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,.65); text-decoration: none;
    bottom: 5px; left: 5px;
    opacity: 0; pointer-events: none;
    transform: scale(0.1) translate(0,0);
    transition:
      opacity .2s cubic-bezier(.4,0,.2,1),
      transform .28s cubic-bezier(.34,1.5,.64,1),
      background .12s, border-color .12s, color .12s,
      box-shadow .12s;
    box-shadow: 0 4px 16px rgba(0,0,0,.55), inset 0 1px 0 rgba(146,145,131,.07);
    z-index: 3;
    backdrop-filter: blur(12px);
  }

  /* stagger delays */
  .fl-sat:nth-child(1) { transition-delay: 0s; }
  .fl-sat:nth-child(2) { transition-delay: .04s; }
  .fl-sat:nth-child(3) { transition-delay: .08s; }
  .fl-sat:nth-child(4) { transition-delay: .12s; }
  .fl-sat:nth-child(5) { transition-delay: .16s; }

  .fl-root.open .fl-sat {
    opacity: 1; pointer-events: auto;
  }

  .fl-sat:hover {
    background: rgba(33,42,55,.95);
    border-color: rgba(146,145,131,.65);
    color: #A8A79F;
    box-shadow:
      0 0 0 5px rgba(146,145,131,.12),
      0 0 0 9px rgba(146,145,131,.05),
      0 6px 20px rgba(0,0,0,.5),
      inset 0 1px 0 rgba(209,179,106,.15);
    /* NO transform — inline transform from JS must not be overridden */
  }
  /* Scale the icon child inside, not the satellite itself */
  .fl-sat:hover .fl-sat-icon {
    transform: scale(1.22);
    transition: transform .15s cubic-bezier(.34,1.5,.64,1);
  }

  /* active page satellite */
  .fl-sat.fl-current {
    border-color: rgba(146,145,131,.55);
    background: rgba(33,42,55,.9);
    color: #929183;
  }

  /* ── Positioned transforms — set via JS inline styles ── */
  /* (we use JS to calculate exact pixel positions so nothing clips) */

  /* ── sat icon wrapper ── */
  .fl-sat-icon {
    display: flex; align-items: center; justify-content: center;
    transition: transform .15s cubic-bezier(.34,1.5,.64,1);
  }

  /* ── tooltip ── */
  .fl-tip {
    position: absolute; left: 50%; transform: translateX(-50%);
    background: rgba(11,12,13,.95); color: #A8A79F;
    border: 1px solid rgba(146,145,131,.2);
    font-size: 9px; font-weight: 700; white-space: nowrap;
    padding: 3px 9px; border-radius: 5px; pointer-events: none;
    opacity: 0; transition: opacity .12s;
    letter-spacing: .1em; text-transform: uppercase;
    box-shadow: 0 3px 12px rgba(0,0,0,.4);
    font-family: 'DM Mono', monospace;
  }
  .fl-tip.above { bottom: calc(100% + 7px); top: auto; }
  .fl-tip.below { top: calc(100% + 7px); bottom: auto; }
  .fl-sat:hover .fl-tip { opacity: 1; }
`;

/* ─── Shortcuts ────────────────────────────────────────────────────────── */
const SHORTCUTS = [
  {
    path: "/dashboard", label: "Home",
    icon: <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15.75a.75.75 0 01-.75-.75v-4.5h-6V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"/></svg>,
  },
  {
    path: "/cashbook", label: "Cashbook",
    icon: <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  },
  {
    path: "/add-invoice-purchase", label: "Purchase",
    icon: <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
  },
  {
    path: "/add-invoice-sales", label: "Sales",
    icon: <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/></svg>,
  },
  {
    path: "/weight-bridge", label: "W·Bridge",
    icon: <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>,
  },
];

/* ──────────────────────────────────────────────────────────────────────────
 * Core geometry: given the launcher's centre point and viewport size,
 * compute clamped (x,y) pixel offsets for each satellite so none clips.
 *
 * We place satellites on a 5-point arc. The arc sweeps AWAY from the
 * nearest corner, with the radius clamped so every computed point is at
 * least `SAT_MARGIN` pixels inside the viewport.
 * ────────────────────────────────────────────────────────────────────── */
const SAT_R      = 108;  // nominal arc radius px
const SAT_MARGIN = 14;   // min px from viewport edge
const SAT_SIZE   = 44;   // satellite diameter px
const CORE_SIZE  = 54;

/**
 * Returns array of {x, y, tipAbove} for each satellite.
 * x, y are offsets from core centre (positive right/down).
 * These are applied as `transform: translate(x px, y px)` on each sat.
 */
function computeSatPositions(coreCx, coreCy, n = 5) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Normalised position (0-1)
  const rx = coreCx / vw;
  const ry = coreCy / vh;

  // Fan direction logic:
  // Default (bottom-right) → fan LEFT (180°) — user's preferred idle behaviour
  // Other quadrants → fan away from nearest corner
  let arcCentre;
  if      (rx >= .5 && ry >= .5) arcCentre = 160;  // bottom-right → mostly left (default idle)
  else if (rx <  .5 && ry >= .5) arcCentre = 20;   // bottom-left  → mostly right
  else if (rx >= .5 && ry <  .5) arcCentre = 200;  // top-right    → down-left
  else                            arcCentre = 340;  // top-left     → down-right

  // Near-edge overrides — pure directions when very close to edge
  if (rx < .12)  arcCentre = 0;    // left edge   → fan right
  if (rx > .88)  arcCentre = 160;  // right edge  → fan left (stronger leftward)
  if (ry < .12)  arcCentre = 270;  // top edge    → fan down
  if (ry > .88)  arcCentre = 90;   // bottom edge → fan up

  // Arc sweep: 5 satellites spread over 110° arc (tighter = more leftward feel)
  const sweep     = 110;
  const startAngle = arcCentre - sweep / 2;

  const positions = [];
  for (let i = 0; i < n; i++) {
    const deg = startAngle + (sweep / (n - 1)) * i;
    const rad = (deg * Math.PI) / 180;

    // Standard math → screen: x same, y negated
    let sx = Math.cos(rad) * SAT_R;
    let sy = -Math.sin(rad) * SAT_R;

    // The satellite's screen position (top-left corner)
    let satLeft = coreCx + sx - SAT_SIZE / 2;
    let satTop  = coreCy + sy - SAT_SIZE / 2;

    // Clamp so satellite stays inside viewport
    const minX = SAT_MARGIN;
    const maxX = vw - SAT_SIZE - SAT_MARGIN;
    const minY = SAT_MARGIN;
    const maxY = vh - SAT_SIZE - SAT_MARGIN;

    satLeft = Math.max(minX, Math.min(maxX, satLeft));
    satTop  = Math.max(minY, Math.min(maxY, satTop));

    // Convert back to offset from core centre
    const fx = satLeft + SAT_SIZE / 2 - coreCx;
    const fy = satTop  + SAT_SIZE / 2 - coreCy;

    // Tooltip: show above unless near top of screen
    const tipAbove = satTop > 60;

    positions.push({ x: fx, y: fy, tipAbove });
  }
  return positions;
}

/* ─── Component ────────────────────────────────────────────────────────── */
export default function FloatingLauncher() {
  const location = useLocation();
  if (location.pathname === "/") return null;

  const role    = localStorage.getItem("role") || "Admin";
  const isAdmin = role === "Admin";
  const allowedRoutes = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem("allowedRoutes")) || []; }
    catch { return []; }
  }, []);
  const can     = p => isAdmin || allowedRoutes.includes(p);
  const visible = SHORTCUTS.filter(s => can(s.path));

  // Pos = {left, top} of the widget's top-left corner (CSS top/left in px)
  const [pos,      setPos]      = useState(null);
  const [open,     setOpen]     = useState(false);
  const [dragging, setDragging] = useState(false);
  const [satPos,   setSatPos]   = useState([]);

  const wrapRef   = useRef(null);
  const dragState = useRef({ active:false, startX:0, startY:0, originX:0, originY:0, moved:false });

  // Compute satellite positions whenever pos or open changes
  const recomputeSats = useCallback((left, top) => {
    const cx = (left ?? (window.innerWidth  - CORE_SIZE - 28)) + CORE_SIZE / 2;
    const cy = (top  ?? (window.innerHeight - CORE_SIZE - 28)) + CORE_SIZE / 2;
    setSatPos(computeSatPositions(cx, cy, visible.length));
  }, [visible.length]);

  useEffect(() => {
    if (open) recomputeSats(pos?.left, pos?.top);
  }, [open, pos, recomputeSats]);

  // Recompute on window resize
  useEffect(() => {
    const h = () => { if (open) recomputeSats(pos?.left, pos?.top); };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [open, pos, recomputeSats]);

  // Close on outside click
  useEffect(() => {
    const h = e => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Drag
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

      const W = window.innerWidth  - CORE_SIZE;
      const H = window.innerHeight - CORE_SIZE;
      const cl = Math.max(0, Math.min(dragState.current.originX + dx, W));
      const ct = Math.max(0, Math.min(dragState.current.originY + dy, H));

      setPos({ left: cl, top: ct });
      if (open) recomputeSats(cl, ct);
    };

    const onUp = () => {
      dragState.current.active = false;
      setDragging(false);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup",   onUp);
    };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup",   onUp);
  }, [open, recomputeSats]);

  const onCoreClick = () => {
    if (dragState.current.moved) { dragState.current.moved = false; return; }
    setOpen(o => !o);
  };

  const posStyle = pos
    ? { left: pos.left, top: pos.top, right: "auto", bottom: "auto" }
    : {};

  const cls = ["fl-root", open?"open":"", dragging?"dragging":""].filter(Boolean).join(" ");

  return (
    <>
      <style>{CSS}</style>
      <div ref={wrapRef} className={cls} style={posStyle}>
        <span className="fl-hint">drag to move</span>

        <div className="fl-stage" onPointerDown={onPointerDown}>

          {/* Satellites — positioned via JS-computed transforms */}
          {visible.map((s, i) => {
            const sp = satPos[i];
            const isCurrent = location.pathname === s.path || location.pathname.startsWith(s.path + "/");

            // Satellite is anchored at (5,5) = core's bottom-left + padding
            // We translate from its collapsed centre to its open position
            const openTransform = sp
              ? `translate(${sp.x - (CORE_SIZE/2 - SAT_SIZE/2 - 5)}px, ${sp.y - (CORE_SIZE/2 - SAT_SIZE/2 - 5)}px) scale(1)`
              : undefined;

            return (
              <Link
                key={s.path}
                to={s.path}
                className={`fl-sat${isCurrent ? " fl-current" : ""}`}
                style={open && openTransform ? { transform: openTransform } : undefined}
                onClick={() => setOpen(false)}
                draggable={false}
              >
                <span className="fl-sat-icon" style={{display:"flex",alignItems:"center",justifyContent:"center",transition:"transform .15s cubic-bezier(.34,1.5,.64,1)"}}>
                  {s.icon}
                </span>
                <span className={`fl-tip ${sp?.tipAbove !== false ? "above" : "below"}`}>
                  {s.label}
                </span>
              </Link>
            );
          })}

          {/* Core */}
          <div className="fl-core" onClick={onCoreClick}>
            <span className="fl-icon fl-icon-grid">
              {/* ORCA logo mark — simplified orca fin shape */}
              <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="rgba(209,179,106,.92)" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 3c0 4-2 7-5 9"/>
                <circle cx="9" cy="12" r="1.2" fill="rgba(209,179,106,.92)" stroke="none"/>
              </svg>
            </span>
            <span className="fl-icon fl-icon-close">
              <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="rgba(209,179,106,.92)" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}