import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

/* ─── Google Fonts ── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@400;500;600;700&display=swap');`;

/* ─── CSS ── */
const CSS = `
  .sl-root *, .sl-root *::before, .sl-root *::after { box-sizing: border-box; }

  .sl-root {
    display: flex; min-height: 100vh;
    background: #f1f5f9;
    font-family: 'DM Sans', sans-serif;
  }

  /* ══ SIDEBAR ══ */
  .sl-sidebar {
    position: fixed; top: 0; left: 0; height: 100vh; width: 252px;
    background: #0f172a;
    display: flex; flex-direction: column;
    z-index: 50; transition: transform .28s cubic-bezier(.4,0,.2,1);
    border-right: 1px solid rgba(255,255,255,.06);
    overflow: visible;
  }
  .sl-sidebar.closed { transform: translateX(-100%); }

  /* sidebar brand */
  .sl-brand {
    padding: 0 20px;
    height: 64px; flex-shrink: 0;
    display: flex; align-items: center; gap: 11px;
    border-bottom: 1px solid rgba(255,255,255,.07);
  }
  .sl-brand-logo {
    width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
    object-fit: cover; border: 1.5px solid rgba(255,255,255,.12);
  }
  .sl-brand-logo-fallback {
    width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
    background: linear-gradient(135deg,#6366f1,#4f46e5);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Lora', serif; font-size: 14px; font-weight: 600;
    color: #fff; letter-spacing: -.3px;
  }
  .sl-brand-text { overflow: hidden; }
  .sl-brand-title {
    font-family: 'Lora', serif; font-size: 13.5px; font-weight: 600;
    color: #fff; line-height: 1.2; letter-spacing: -.1px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .sl-brand-role {
    font-size: 10px; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: rgba(255,255,255,.35);
    margin-top: 2px;
  }
  .sl-sidebar-close {
    margin-left: auto; flex-shrink: 0;
    background: rgba(255,255,255,.06); border: none; border-radius: 7px;
    width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: rgba(255,255,255,.5); transition: all .12s;
    display: none;
  }
  .sl-sidebar-close:hover { background: rgba(255,255,255,.12); color: #fff; }

  /* nav scroll area */
  .sl-nav {
    flex: 1; overflow-y: auto; overflow-x: hidden; padding: 12px 10px 20px;
    scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.08) transparent;
  }
  .sl-nav::-webkit-scrollbar { width: 4px; }
  .sl-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 4px; }

  /* section heading */
  .sl-nav-section {
    font-size: 9.5px; font-weight: 700; letter-spacing: .12em;
    text-transform: uppercase; color: rgba(255,255,255,.25);
    padding: 14px 10px 6px; user-select: none;
  }

  /* menu button (collapsible) */
  .sl-menu-btn {
    width: 100%; display: flex; align-items: center; gap: 10px;
    padding: 9px 10px; border-radius: 9px; border: none; cursor: pointer;
    background: transparent; color: rgba(255,255,255,.6);
    font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 500;
    transition: all .12s; text-align: left;
  }
  .sl-menu-btn:hover { background: rgba(255,255,255,.07); color: #fff; }
  .sl-menu-btn.open  { background: rgba(99,102,241,.15); color: #a5b4fc; }
  .sl-menu-icon {
    width: 28px; height: 28px; border-radius: 7px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,.06); transition: background .12s;
  }
  .sl-menu-btn.open .sl-menu-icon { background: rgba(99,102,241,.25); }
  .sl-menu-btn:hover .sl-menu-icon { background: rgba(255,255,255,.1); }
  .sl-menu-label { flex: 1; }
  .sl-menu-chevron {
    flex-shrink: 0; transition: transform .2s;
    color: rgba(255,255,255,.25);
  }
  .sl-menu-btn.open .sl-menu-chevron { transform: rotate(180deg); color: #a5b4fc; }

  /* sub links */
  .sl-sub {
    overflow: hidden; transition: max-height .22s cubic-bezier(.4,0,.2,1), opacity .18s;
    max-height: 0; opacity: 0;
  }
  .sl-sub.open { max-height: 400px; opacity: 1; }
  .sl-sub-inner { padding: 3px 0 3px 14px; display: flex; flex-direction: column; gap: 1px; }
  .sl-sub-link {
    display: flex; align-items: center; gap: 8px;
    padding: 7px 10px; border-radius: 8px; font-size: 13px; font-weight: 500;
    color: rgba(255,255,255,.5); text-decoration: none; transition: all .12s;
    position: relative;
  }
  .sl-sub-link::before {
    content: ''; position: absolute; left: -5px; top: 50%; transform: translateY(-50%);
    width: 1px; height: 70%; background: rgba(255,255,255,.1); border-radius: 1px;
  }
  .sl-sub-link:hover { background: rgba(255,255,255,.07); color: rgba(255,255,255,.9); }
  .sl-sub-link.active {
    background: rgba(99,102,241,.2); color: #a5b4fc; font-weight: 600;
  }
  .sl-sub-link.active::before { background: #6366f1; }

  /* direct nav link (Dashboard) */
  .sl-direct-link {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 10px; border-radius: 9px; font-size: 13.5px; font-weight: 500;
    color: rgba(255,255,255,.6); text-decoration: none; transition: all .12s;
  }
  .sl-direct-link:hover { background: rgba(255,255,255,.07); color: #fff; text-decoration: none; }
  .sl-direct-link.active { background: rgba(99,102,241,.18); color: #a5b4fc; font-weight: 600; }
  .sl-direct-icon {
    width: 28px; height: 28px; border-radius: 7px; flex-shrink: 0;
    background: rgba(255,255,255,.06);
    display: flex; align-items: center; justify-content: center;
  }
  .sl-direct-link.active .sl-direct-icon { background: rgba(99,102,241,.25); }

  /* ── sidebar footer — quick launcher ── */
  .sl-sidebar-foot {
    padding: 6px 10px 12px;
    border-top: 1px solid rgba(255,255,255,.07);
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    overflow: visible;
  }

  /* radial launcher wrapper — tall enough to contain all satellites */
  .sl-launcher {
    position: relative;
    width: 140px; height: 70px;
    display: flex; align-items: flex-end; justify-content: center;
    padding-bottom: 4px;
  }

  /* centre trigger button */
  .sl-launcher-core {
    width: 44px; height: 44px; border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    border: 2px solid rgba(255,255,255,.18);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; position: relative; z-index: 4;
    box-shadow: 0 4px 16px rgba(99,102,241,.4);
    transition: transform .18s, box-shadow .18s, background .18s;
    flex-shrink: 0;
  }
  .sl-launcher.active .sl-launcher-core {
    transform: scale(1.08);
    box-shadow: 0 6px 22px rgba(99,102,241,.55);
    background: linear-gradient(135deg, #7c3aed, #6366f1);
  }
  /* pulse ring when active */
  .sl-launcher-core::after {
    content: '';
    position: absolute; inset: -5px; border-radius: 50%;
    border: 1.5px solid rgba(99,102,241,.35);
    opacity: 0; transform: scale(.8);
    transition: opacity .2s, transform .2s;
  }
  .sl-launcher.active .sl-launcher-core::after {
    opacity: 1; transform: scale(1);
  }
  /* icon transition inside core */
  .sl-core-icon {
    transition: transform .2s, opacity .15s;
    display: flex; align-items: center; justify-content: center;
    position: absolute;
  }
  .sl-core-grid  { opacity: 1; transform: rotate(0deg) scale(1); }
  .sl-core-close { opacity: 0; transform: rotate(-90deg) scale(0.5); }
  .sl-launcher.active .sl-core-grid  { opacity: 0; transform: rotate(90deg) scale(0.5); }
  .sl-launcher.active .sl-core-close { opacity: 1; transform: rotate(0deg) scale(1); }

  /* satellite buttons */
  .sl-sat {
    position: absolute;
    width: 36px; height: 36px; border-radius: 50%;
    background: #1e293b;
    border: 1.5px solid rgba(255,255,255,.14);
    display: flex; align-items: center; justify-content: center;
    text-decoration: none; color: rgba(255,255,255,.65);
    opacity: 0; pointer-events: none;
    transform: translate(0, 0) scale(0.3);
    transition: opacity .22s, transform .22s cubic-bezier(.34,1.56,.64,1), background .12s, border-color .12s;
    box-shadow: 0 3px 10px rgba(0,0,0,.35);
    z-index: 3;
    bottom: 24px; left: 50%; margin-left: -18px;
  }
  /* staggered delays — open */
  .sl-launcher.active .sl-sat:nth-child(1) { transition-delay: 0s;   }
  .sl-launcher.active .sl-sat:nth-child(2) { transition-delay: .04s; }
  .sl-launcher.active .sl-sat:nth-child(3) { transition-delay: .08s; }
  .sl-launcher.active .sl-sat:nth-child(4) { transition-delay: .12s; }
  .sl-launcher.active .sl-sat:nth-child(5) { transition-delay: .16s; }

  .sl-launcher.active .sl-sat {
    opacity: 1; pointer-events: auto;
  }

  /* individual satellite positions — fan above core */
  .sl-launcher.active .sl-sat-0 { transform: translate(-66px, -52px) scale(1); }
  .sl-launcher.active .sl-sat-1 { transform: translate(-36px, -88px) scale(1); }
  .sl-launcher.active .sl-sat-2 { transform: translate(  0px, -98px) scale(1); }
  .sl-launcher.active .sl-sat-3 { transform: translate( 36px, -88px) scale(1); }
  .sl-launcher.active .sl-sat-4 { transform: translate( 66px, -52px) scale(1); }

  .sl-sat:hover {
    background: #334155; border-color: rgba(99,102,241,.5);
    color: #a5b4fc;
  }

  /* tooltip label on satellite */
  .sl-sat-tip {
    position: absolute; bottom: calc(100% + 7px); left: 50%; transform: translateX(-50%);
    background: #0f172a; color: #e2e8f0; border: 1px solid rgba(255,255,255,.1);
    font-size: 10px; font-weight: 700; white-space: nowrap;
    padding: 3px 8px; border-radius: 5px; pointer-events: none;
    opacity: 0; transition: opacity .12s;
    font-family: 'DM Sans', sans-serif; letter-spacing: .04em;
    text-transform: uppercase;
    box-shadow: 0 2px 8px rgba(0,0,0,.3);
  }
  .sl-sat:hover .sl-sat-tip { opacity: 1; }

  /* ══ TOPBAR ══ */
  .sl-topbar {
    height: 64px; background: #fff;
    border-bottom: 1.5px solid #e2e8f0;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 24px; position: sticky; top: 0; z-index: 40;
    box-shadow: 0 1px 3px rgba(0,0,0,.05);
    flex-shrink: 0;
  }
  .sl-topbar-left { display: flex; align-items: center; gap: 12px; }
  .sl-topbar-right { display: flex; align-items: center; gap: 12px; }

  /* hamburger */
  .sl-hamburger {
    background: none; border: 1.5px solid #e2e8f0; border-radius: 9px;
    width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #64748b; transition: all .12s;
  }
  .sl-hamburger:hover { border-color: #cbd5e1; background: #f8fafc; color: #334155; }

  /* back button */
  .sl-back-btn {
    background: none; border: 1.5px solid #e2e8f0; border-radius: 9px;
    width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #64748b; transition: all .12s;
  }
  .sl-back-btn:hover { border-color: #cbd5e1; background: #f8fafc; color: #334155; }

  /* page title in topbar */
  .sl-topbar-title {
    font-family: 'Lora', serif; font-size: 16px; font-weight: 600;
    color: #0f172a; letter-spacing: -.2px; font-style: italic;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    max-width: 320px;
  }

  /* topbar breadcrumb dot */
  .sl-topbar-sep { color: #cbd5e1; font-size: 16px; user-select: none; }

  /* company pill */
  .sl-company-pill {
    display: flex; align-items: center; gap: 7px;
    padding: 5px 11px; border-radius: 8px;
    background: #f8fafc; border: 1.5px solid #e2e8f0;
  }
  .sl-company-logo {
    width: 22px; height: 22px; border-radius: 5px;
    object-fit: cover; flex-shrink: 0;
  }
  .sl-company-logo-fb {
    width: 22px; height: 22px; border-radius: 5px; flex-shrink: 0;
    background: linear-gradient(135deg,#6366f1,#4f46e5);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Lora', serif; font-size: 9px; font-weight: 600; color: #fff;
  }
  .sl-company-name {
    font-size: 12.5px; font-weight: 700; color: #334155;
    letter-spacing: -.1px; white-space: nowrap;
  }

  /* welcome chip */
  .sl-welcome {
    font-size: 13px; color: #64748b; font-weight: 500;
    white-space: nowrap;
  }
  .sl-welcome strong { color: #4f46e5; font-weight: 700; }

  /* topbar logout */
  .sl-topbar-logout {
    display: flex; align-items: center; gap: 6px;
    padding: 7px 14px; border-radius: 9px; border: none; cursor: pointer;
    background: #fee2e2; color: #dc2626;
    font-size: 12.5px; font-weight: 700; font-family: 'DM Sans', sans-serif;
    transition: all .12s;
  }
  .sl-topbar-logout:hover { background: #fecaca; color: #b91c1c; }

  /* ══ MAIN ══ */
  .sl-main-wrap {
    flex: 1; display: flex; flex-direction: column;
    transition: margin-left .28s cubic-bezier(.4,0,.2,1);
    min-width: 0;
  }
  .sl-main-wrap.sidebar-open { margin-left: 252px; }
  .sl-content { flex: 1; padding: 28px; }

  /* overlay for mobile */
  .sl-overlay {
    display: none; position: fixed; inset: 0; background: rgba(0,0,0,.5);
    z-index: 49; backdrop-filter: blur(2px);
  }
  .sl-overlay.visible { display: block; }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .sl-main-wrap.sidebar-open { margin-left: 0 !important; }
    .sl-sidebar-close { display: flex !important; }
    .sl-topbar-title { display: none; }
    .sl-topbar-sep   { display: none; }
    .sl-company-name { display: none; }
    .sl-welcome      { display: none; }
  }
  @media (max-width: 500px) {
    .sl-content { padding: 16px; }
  }
`;

/* ─── Page title map: pathname → readable label ── */
const PAGE_LABELS = {
  "/dashboard":             "Dashboard",
  "/create-account":        "New Account",
  "/view-accounts":         "Accounts List",
  "/ledger":                "General Ledger",
  "/general-entries":       "Journal Entries",
  "/products/new":          "Add Product",
  "/products":              "Products",
  "/add-invoice-purchase":  "New Purchase",
  "/view-purchase-invoices":"Purchase Invoices",
  "/add-invoice-sales":     "New Sales Invoice",
  "/view-sales-invoices":   "Sales Invoices",
  "/employees/new":         "New Employee",
  "/employees":             "Employees",
  "/trialbalance":          "Trial Balance",
  "/balancesheet":          "Balance Sheet",
  "/incomestatement":       "Income Statement",
  "/weight-bridge":         "Weight Bridge",
  "/weight-bridge/invoices":"WB Invoices",
  "/cashbook":              "Cashbook",
  "/cashbook-report":       "Daily Cashbook",
};

/* ─── Inline SVG icons ── */
const Icons = {
  home:       <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15.75a.75.75 0 01-.75-.75v-4.5h-6V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"/></svg>,
  accounts:   <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>,
  products:   <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/></svg>,
  purchase:   <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
  sales:      <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/></svg>,
  employees:  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  reports:    <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
  weight:     <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>,
  cashbook:   <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  chevron:    <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>,
  back:       <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>,
  menu:       <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>,
  close:      <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>,
  logout:     <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>,
  dot:        <svg width={4} height={4} viewBox="0 0 4 4" fill="currentColor"><circle cx={2} cy={2} r={2}/></svg>,
};

/* ─── initials helper ── */
const initials = (name) => name?.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase() || "U";

/* ─── Collapsible menu section ── */
function MenuSection({ icon, label, menuKey, activeMenu, setActiveMenu, children }) {
  const isOpen = activeMenu === menuKey;
  return (
    <div>
      <button
        className={`sl-menu-btn${isOpen ? " open" : ""}`}
        onClick={() => setActiveMenu(isOpen ? "" : menuKey)}
      >
        <span className="sl-menu-icon">{icon}</span>
        <span className="sl-menu-label">{label}</span>
        <span className="sl-menu-chevron">{Icons.chevron}</span>
      </button>
      <div className={`sl-sub${isOpen ? " open" : ""}`}>
        <div className="sl-sub-inner">{children}</div>
      </div>
    </div>
  );
}

/* ─── Sub link — only renders if user has access ── */
function SubLink({ to, label, isActive, hasAccess }) {
  if (!hasAccess) return null;
  return (
    <Link to={to} className={`sl-sub-link${isActive ? " active" : ""}`}>
      {Icons.dot}
      {label}
    </Link>
  );
}

/* ─── Quick-access radial launcher ── */
const SHORTCUTS = [
  { path: "/dashboard",            label: "Home",     icon: <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15.75a.75.75 0 01-.75-.75v-4.5h-6V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"/></svg> },
  { path: "/cashbook",             label: "Cashbook", icon: <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
  { path: "/add-invoice-purchase", label: "Purchase", icon: <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg> },
  { path: "/add-invoice-sales",    label: "Sales",    icon: <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/></svg> },
  { path: "/weight-bridge",        label: "W-Bridge", icon: <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg> },
];

function QuickLauncher({ navigate, can, isAdmin }) {
  const [active, setActive] = React.useState(false);
  const ref = React.useRef(null);

  // close on outside click
  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setActive(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // filter to only accessible shortcuts
  const visible = SHORTCUTS.filter(s => isAdmin || can(s.path));

  return (
    <div ref={ref} className={`sl-launcher${active ? " active" : ""}`}>

      {/* Satellite links */}
      {visible.map((s, i) => (
        <Link
          key={s.path}
          to={s.path}
          className={`sl-sat sl-sat-${i}`}
          onClick={() => setActive(false)}
          title={s.label}
        >
          {s.icon}
          <span className="sl-sat-tip">{s.label}</span>
        </Link>
      ))}

      {/* Centre core — click toggles open/close */}
      <div className="sl-launcher-core" onClick={() => setActive(a => !a)}>
        {/* Grid icon — shown when closed */}
        <span className="sl-core-icon sl-core-grid">
          <svg width={17} height={17} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,.92)" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
          </svg>
        </span>
        {/* Cross icon — shown when open */}
        <span className="sl-core-icon sl-core-close">
          <svg width={17} height={17} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,.92)" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </span>
      </div>
    </div>
  );
}

/* ─── Main component ── */
export default function SidebarLayout({ children }) {
  const [isOpen,     setIsOpen]     = useState(true);
  const [activeMenu, setActiveMenu] = useState("");
  const [logoError,  setLogoError]  = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  /* ── Auth from localStorage ── */
  const role    = localStorage.getItem("role") || "Admin";
  const name    = localStorage.getItem("name") || "User";
  const isAdmin = role === "Admin";
  const allowedRoutes = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem("allowedRoutes")) || []; }
    catch { return []; }
  }, []);

  /* ── Access check ── */
  const can = (path) => isAdmin || allowedRoutes.includes(path);

  /* ── Active path ── */
  const isActive = (path) => location.pathname === path;

  /* ── Auto-expand section based on current route ── */
  useEffect(() => {
    const p = location.pathname;
    if (p === "/dashboard")                                         setActiveMenu("dashboard");
    else if (p.includes("account") || p.includes("ledger") || p.includes("general-entries")) setActiveMenu("accounts");
    else if (p.includes("product"))                                 setActiveMenu("products");
    else if (p.includes("purchase"))                                setActiveMenu("purchase");
    else if (p.includes("sales"))                                   setActiveMenu("sales");
    else if (p.includes("employee"))                                setActiveMenu("employees");
    else if (p.includes("balance") || p.includes("income") || p.includes("trial")) setActiveMenu("reports");
    else if (p.includes("weight-bridge"))                           setActiveMenu("weightBridge");
    else if (p.includes("cashbook"))                                setActiveMenu("cashbook");
  }, [location.pathname]);

  /* ── Close sidebar on mobile when navigating ── */
  const closeMobile = () => {
    if (window.innerWidth < 900) setIsOpen(false);
  };

  /* ── Logout ── */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("allowedRoutes");
    navigate("/");
  };

  const pageLabel = PAGE_LABELS[location.pathname] || "";

  return (
    <div className="sl-root">
      <style>{FONTS}{CSS}</style>

      {/* Mobile overlay */}
      <div
        className={`sl-overlay${isOpen && window.innerWidth < 900 ? " visible" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      {/* ══ SIDEBAR ══ */}
      <aside className={`sl-sidebar${isOpen ? "" : " closed"}`}>

        {/* Brand */}
        <div className="sl-brand">
          {!logoError ? (
            <img
              src="/logo.png" alt="Logo"
              className="sl-brand-logo"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="sl-brand-logo-fallback">AR</div>
          )}
          <div className="sl-brand-text">
            <div className="sl-brand-title">Al Rehman Rice Mills</div>
            <div className="sl-brand-role">{role} Panel</div>
          </div>
          <button className="sl-sidebar-close" onClick={() => setIsOpen(false)}>
            {Icons.close}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sl-nav">

          {/* Dashboard */}
          {can("/dashboard") && (
            <Link
              to="/dashboard"
              className={`sl-direct-link${isActive("/dashboard") ? " active" : ""}`}
              onClick={closeMobile}
            >
              <span className="sl-direct-icon">{Icons.home}</span>
              Dashboard
            </Link>
          )}

          {/* ── ACCOUNTS ── */}
          {(can("/create-account") || can("/view-accounts") || can("/ledger") || can("/general-entries")) && (
            <>
              <MenuSection icon={Icons.accounts} label="Accounts" menuKey="accounts" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
                <SubLink to="/create-account"  label="Add Account"      isActive={isActive("/create-account")}  hasAccess={can("/create-account")}  />
                <SubLink to="/view-accounts"   label="Accounts List"    isActive={isActive("/view-accounts")}   hasAccess={can("/view-accounts")}   />
                <SubLink to="/ledger"          label="General Ledger"   isActive={isActive("/ledger")}          hasAccess={can("/ledger")}          />
                <SubLink to="/general-entries" label="Journal Entries"  isActive={isActive("/general-entries")} hasAccess={can("/general-entries")} />
              </MenuSection>
            </>
          )}

          {/* ── PRODUCTS ── */}
          {(can("/products/new") || can("/products")) && (
            <MenuSection icon={Icons.products} label="Products" menuKey="products" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/products/new" label="Add Product"   isActive={isActive("/products/new")} hasAccess={can("/products/new")} />
              <SubLink to="/products"     label="Products List" isActive={isActive("/products")}     hasAccess={can("/products")}     />
            </MenuSection>
          )}

          {/* ── PURCHASE ── */}
          {(can("/add-invoice-purchase") || can("/view-purchase-invoices")) && (
            <MenuSection icon={Icons.purchase} label="Purchase" menuKey="purchase" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/add-invoice-purchase"   label="New Purchase Order" isActive={isActive("/add-invoice-purchase")}   hasAccess={can("/add-invoice-purchase")}   />
              <SubLink to="/view-purchase-invoices" label="All Purchases"      isActive={isActive("/view-purchase-invoices")} hasAccess={can("/view-purchase-invoices")} />
            </MenuSection>
          )}

          {/* ── SALES ── */}
          {(can("/add-invoice-sales") || can("/view-sales-invoices")) && (
            <MenuSection icon={Icons.sales} label="Sales" menuKey="sales" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/add-invoice-sales"   label="Create Invoice" isActive={isActive("/add-invoice-sales")}   hasAccess={can("/add-invoice-sales")}   />
              <SubLink to="/view-sales-invoices" label="Sales History"  isActive={isActive("/view-sales-invoices")} hasAccess={can("/view-sales-invoices")} />
            </MenuSection>
          )}

          {/* ── EMPLOYEES (Admin only) ── */}
          {isAdmin && (
            <MenuSection icon={Icons.employees} label="Employees" menuKey="employees" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/employees/new" label="New Employee"  isActive={isActive("/employees/new")} hasAccess={true} />
              <SubLink to="/employees"     label="All Employees" isActive={isActive("/employees")}     hasAccess={true} />
            </MenuSection>
          )}

          {/* ── REPORTS ── */}
          {(can("/trialbalance") || can("/balancesheet") || can("/incomestatement")) && (
            <MenuSection icon={Icons.reports} label="Reports" menuKey="reports" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/trialbalance"    label="Trial Balance"     isActive={isActive("/trialbalance")}    hasAccess={can("/trialbalance")}    />
              <SubLink to="/balancesheet"    label="Balance Sheet"     isActive={isActive("/balancesheet")}    hasAccess={can("/balancesheet")}    />
              <SubLink to="/incomestatement" label="Income Statement"  isActive={isActive("/incomestatement")} hasAccess={can("/incomestatement")} />
            </MenuSection>
          )}

          {/* ── WEIGHT BRIDGE ── */}
          {(can("/weight-bridge") || can("/weight-bridge/invoices")) && (
            <MenuSection icon={Icons.weight} label="Weight Bridge" menuKey="weightBridge" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/weight-bridge"          label="WB Entry"    isActive={isActive("/weight-bridge")}          hasAccess={can("/weight-bridge")}          />
              <SubLink to="/weight-bridge/invoices" label="WB Invoices" isActive={isActive("/weight-bridge/invoices")} hasAccess={can("/weight-bridge/invoices")} />
            </MenuSection>
          )}

          {/* ── CASHBOOK ── */}
          {(can("/cashbook") || can("/cashbook-report")) && (
            <MenuSection icon={Icons.cashbook} label="Cashbook" menuKey="cashbook" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/cashbook"        label="Cashbook Entry" isActive={isActive("/cashbook")}        hasAccess={can("/cashbook")}        />
              <SubLink to="/cashbook-report" label="Daily Cashbook" isActive={isActive("/cashbook-report")} hasAccess={can("/cashbook-report")} />
            </MenuSection>
          )}

        </nav>

        {/* ── Quick-access radial launcher ── */}
        <div className="sl-sidebar-foot">
          <QuickLauncher navigate={navigate} can={can} isAdmin={isAdmin} />
        </div>
      </aside>

      {/* ══ MAIN ══ */}
      <div className={`sl-main-wrap${isOpen ? " sidebar-open" : ""}`}>

        {/* Topbar */}
        <header className="sl-topbar">
          <div className="sl-topbar-left">
            {/* Hamburger — always visible */}
            <button className="sl-hamburger" onClick={() => setIsOpen(o => !o)} title="Toggle sidebar">
              {Icons.menu}
            </button>

            {/* Back button — all pages except dashboard */}
            {location.pathname !== "/dashboard" && (
              <button className="sl-back-btn" onClick={() => navigate(-1)} title="Go back">
                {Icons.back}
              </button>
            )}

            {/* Company pill */}
            <div className="sl-company-pill">
              {!logoError ? (
                <img src="/logo.png" alt="Logo" className="sl-company-logo" onError={() => setLogoError(true)}/>
              ) : (
                <div className="sl-company-logo-fb">AR</div>
              )}
              <span className="sl-company-name">AL REHMAN RICE MILL</span>
            </div>

            {/* Page label */}
            {pageLabel && (
              <>
                <span className="sl-topbar-sep">·</span>
                <span className="sl-topbar-title">{pageLabel}</span>
              </>
            )}
          </div>

          <div className="sl-topbar-right">
            <span className="sl-welcome">
              Welcome, <strong>{name}</strong>
            </span>
            <button className="sl-topbar-logout" onClick={handleLogout}>
              {Icons.logout}
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="sl-content">{children}</main>
      </div>
    </div>
  );
}