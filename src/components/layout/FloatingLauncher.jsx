import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600;700&family=DM+Mono:wght@500&display=swap');

  @media (max-width: 1023px) { .fl-wrap, .fl-sat { display: none !important; } }

  .fl-wrap {
    position: fixed; z-index: 9000;
    width: 50px; height: 50px;
    user-select: none;
  }
  .fl-core {
    width: 50px; height: 50px; border-radius: 50%;
    background: #111827; border: 1.5px solid #374151;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; position: relative;
    box-shadow: 0 4px 16px rgba(0,0,0,.3), 0 1px 4px rgba(0,0,0,.18);
    transition: transform .18s cubic-bezier(.34,1.4,.64,1), box-shadow .15s, background .15s;
  }
  .fl-core:hover { background: #1f2937; box-shadow: 0 6px 22px rgba(0,0,0,.35); transform: scale(1.07); }
  .fl-open .fl-core {
    background: #1f2937; border-color: #4b5563;
    transform: scale(1.05) rotate(45deg);
    box-shadow: 0 0 0 7px rgba(107,114,128,.12), 0 6px 24px rgba(0,0,0,.3);
  }

  .fl-ico {
    position: absolute; display: flex; align-items: center; justify-content: center;
    transition: opacity .18s, transform .2s cubic-bezier(.34,1.4,.64,1);
  }
  .fl-ico-menu  { opacity:1; transform:scale(1) rotate(0); }
  .fl-ico-close { opacity:0; transform:scale(.25) rotate(-90deg); }
  .fl-open .fl-ico-menu  { opacity:0; transform:scale(.25) rotate(90deg); }
  .fl-open .fl-ico-close { opacity:1; transform:scale(1) rotate(0); }

  .fl-sat {
    position: fixed; z-index: 8999;
    width: 42px; height: 42px; border-radius: 50%;
    background: #fff; border: 1px solid #e5e7eb; color: #374151;
    display: flex; align-items: center; justify-content: center;
    text-decoration: none; pointer-events: none; opacity: 0;
    box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 1px 3px rgba(0,0,0,.07);
    transition:
      left    .32s cubic-bezier(.34,1.55,.64,1),
      top     .32s cubic-bezier(.34,1.55,.64,1),
      opacity .22s ease,
      transform .15s ease;
  }
  .fl-sat.fl-s1 { transition-delay:.00s }
  .fl-sat.fl-s2 { transition-delay:.05s }
  .fl-sat.fl-s3 { transition-delay:.10s }
  .fl-sat.fl-s4 { transition-delay:.15s }
  .fl-sat.fl-s5 { transition-delay:.20s }
  .fl-sat.fl-closing.fl-s1 { transition-delay:.20s }
  .fl-sat.fl-closing.fl-s2 { transition-delay:.15s }
  .fl-sat.fl-closing.fl-s3 { transition-delay:.10s }
  .fl-sat.fl-closing.fl-s4 { transition-delay:.05s }
  .fl-sat.fl-closing.fl-s5 { transition-delay:.00s }

  .fl-sat.fl-visible { opacity:1; pointer-events:auto; }
  .fl-sat:hover {
    background: #f9fafb; border-color: #d1d5db; color: #111827;
    box-shadow: 0 4px 16px rgba(0,0,0,.14), 0 0 0 5px rgba(107,114,128,.08);
    transform: scale(1.1);
  }
  .fl-sat.fl-active { background: #f3f4f6; border-color: #9ca3af; color: #111827; }

  .fl-tip {
    position: absolute; left: 50%; transform: translateX(-50%);
    background: #111827; color: #f9fafb;
    font-size: 9.5px; font-weight: 600; white-space: nowrap;
    padding: 3px 8px; border-radius: 5px; pointer-events: none;
    opacity: 0; transition: opacity .1s; letter-spacing: .06em;
    text-transform: uppercase; font-family: 'DM Mono', monospace;
    box-shadow: 0 2px 8px rgba(0,0,0,.18);
    bottom: calc(100% + 6px); z-index: 1;
  }
  .fl-tip.below { bottom: auto; top: calc(100% + 6px); }
  .fl-sat:hover .fl-tip { opacity: 1; }
`;

const SHORTCUTS = [
  { path:"/dashboard",            label:"Home",
    icon:<svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15.75a.75.75 0 01-.75-.75v-4.5h-6V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"/></svg> },
  { path:"/cashbook",             label:"Cashbook",
    icon:<svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
  { path:"/add-invoice-purchase", label:"Purchase",
    icon:<svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg> },
  { path:"/add-invoice-sales",    label:"Sales",
    icon:<svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/></svg> },
  { path:"/weight-bridge",        label:"W·Bridge",
    icon:<svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg> },
];

// Fixed position — bottom-right corner, above the sidebar footer
const POS = { right: 28, bottom: 72 };

const SIDEBAR_W = 240;
const TOPNAV_H  = 56;
const CORE_D    = 50;
const SAT_D     = 42;
const ARC_R     = 90;
const MIN_GAP   = 28;
const EDGE_PAD  = 14;

function getArcAngle(cx, cy) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const sL = Math.max(0, cx - SIDEBAR_W - EDGE_PAD - SAT_D / 2);
  const sR = Math.max(0, vw - cx - EDGE_PAD - SAT_D / 2);
  const sU = Math.max(0, cy - TOPNAV_H  - EDGE_PAD - SAT_D / 2);
  const sD = Math.max(0, vh - cy - EDGE_PAD - SAT_D / 2);
  const vx = sR - sL;
  const vy = sU - sD;
  let deg = Math.atan2(vy, vx) * (180 / Math.PI);
  deg = Math.round(deg / 5) * 5;
  return deg;
}

function computeArc(cx, cy, n, centreAngle) {
  const spread = Math.max((n - 1) * MIN_GAP + 10, 90);
  const step   = n > 1 ? spread / (n - 1) : 0;
  const start  = centreAngle - spread / 2;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const minX = SIDEBAR_W + EDGE_PAD + SAT_D / 2;
  const maxX = vw - EDGE_PAD - SAT_D / 2;
  const minY = TOPNAV_H  + EDGE_PAD + SAT_D / 2;
  const maxY = vh - EDGE_PAD - SAT_D / 2;

  return Array.from({ length: n }, (_, i) => {
    const rad = (start + step * i) * Math.PI / 180;
    let sx = cx + Math.cos(rad) * ARC_R;
    let sy = cy - Math.sin(rad) * ARC_R;
    sx = Math.max(minX, Math.min(maxX, sx));
    sy = Math.max(minY, Math.min(maxY, sy));
    return { left: sx - SAT_D / 2, top: sy - SAT_D / 2, tipAbove: sy > TOPNAV_H + 70 };
  });
}

// Compute core centre from the fixed position
function coreCenter() {
  return {
    cx: window.innerWidth  - POS.right  - CORE_D / 2,
    cy: window.innerHeight - POS.bottom - CORE_D / 2,
  };
}

export default function FloatingLauncher() {
  const location = useLocation();
  if (location.pathname === "/") return null;

  const isAdmin = (localStorage.getItem("role") || "Admin") === "Admin";
  const allowedRoutes = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("allowedRoutes")) || []; }
    catch { return []; }
  }, []);
  const visible = SHORTCUTS.filter(s => isAdmin || allowedRoutes.includes(s.path));

  const [open,    setOpen]    = useState(false);
  const [closing, setClosing] = useState(false);
  const [satPos,  setSatPos]  = useState([]);

  const recompute = useCallback(() => {
    const { cx, cy } = coreCenter();
    const angle = getArcAngle(cx, cy);
    setSatPos(computeArc(cx, cy, visible.length, angle));
  }, [visible.length]);

  // Recompute on open and on window resize
  useEffect(() => { if (open) recompute(); }, [open, recompute]);
  useEffect(() => {
    const h = () => { if (open) recompute(); };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [open, recompute]);

  // Close on outside click
  useEffect(() => {
    const h = e => {
      const isCore = e.target.closest(".fl-wrap");
      const isSat  = e.target.closest(".fl-sat");
      if (!isCore && !isSat) doClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const doClose = () => {
    setClosing(true);
    setOpen(false);
    setTimeout(() => setClosing(false), 500);
  };

  const onCoreClick = () => {
    if (open) doClose(); else setOpen(true);
  };

  // Collapsed position: all satellites sit behind the core
  const { cx: coreCx, cy: coreCy } = coreCenter();
  const collL = coreCx - SAT_D / 2;
  const collT = coreCy - SAT_D / 2;

  return (
    <>
      <style>{CSS}</style>

      {/* Core button — fixed, no drag */}
      <div
        className={["fl-wrap", open ? "fl-open" : ""].filter(Boolean).join(" ")}
        style={{ right: POS.right, bottom: POS.bottom }}
      >
        <div className="fl-core" onClick={onCoreClick}>
          <span className="fl-ico fl-ico-menu">
            <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,.85)" strokeWidth={1.7}>
              <rect x={3}  y={5}  width={7} height={7} rx={1.5} fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.8)" strokeWidth={1.5}/>
              <rect x={14} y={5}  width={7} height={7} rx={1.5} fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.8)" strokeWidth={1.5}/>
              <rect x={3}  y={14} width={7} height={7} rx={1.5} fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.8)" strokeWidth={1.5}/>
              <rect x={14} y={14} width={7} height={7} rx={1.5} fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.8)" strokeWidth={1.5}/>
            </svg>
          </span>
          <span className="fl-ico fl-ico-close">
            <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,.85)" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </span>
        </div>
      </div>

      {/* Satellites */}
      {visible.map((s, i) => {
        const sp     = satPos[i];
        const isOpen = open && sp;
        const cls    = [
          "fl-sat",
          `fl-s${i + 1}`,
          isOpen  ? "fl-visible" : "",
          closing ? "fl-closing" : "",
          (location.pathname === s.path || location.pathname.startsWith(s.path + "/")) ? "fl-active" : "",
        ].filter(Boolean).join(" ");

        return (
          <Link
            key={s.path} to={s.path} className={cls}
            style={{ left: isOpen ? sp.left : collL, top: isOpen ? sp.top : collT }}
            onClick={() => doClose()}
            draggable={false}
          >
            <span style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
              {s.icon}
            </span>
            <span className={`fl-tip${sp && !sp.tipAbove ? " below" : ""}`}>
              {s.label}
            </span>
          </Link>
        );
      })}
    </>
  );
}