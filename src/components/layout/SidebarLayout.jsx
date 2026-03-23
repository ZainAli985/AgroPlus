import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

/* ─── Google Fonts ── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

/* ─── CSS ── */
const CSS = `
  /* ── ORCA theme tokens ── */
  :root {
    --oc-black:      #0B0C0D;
    --oc-dark:       #141A1F;
    --oc-navy:       #212A37;
    --oc-blue:       #253240;
    --oc-slate:      #334455;
    --oc-steel:      #6E7170;
    --oc-silver:     #A5A8A6;
    --oc-light:      #DADADA;
    --oc-bg:         #F5F5F5;
    --oc-bg2:        #ECECEC;
    --oc-gold:       #C9A85A;
    --oc-gold-dim:   #B8964A;
    --oc-gold-hi:    #D1B36A;
    --oc-white:      #FFFFFF;
  }
  .sl-root *, .sl-root *::before, .sl-root *::after { box-sizing: border-box; }

  .sl-root {
    display: flex; min-height: 100vh;
    background: var(--oc-bg);
    font-family: 'DM Sans', sans-serif;
  }

  /* ══ SIDEBAR ══ */
  .sl-sidebar {
    position: fixed; top: 0; left: 0; height: 100vh; width: 252px;
    background: linear-gradient(168deg, #0B0C0D 0%, #141A1F 40%, #1F2A37 75%, #141A1F 100%);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    display: flex; flex-direction: column;
    z-index: 50; transition: transform .28s cubic-bezier(.4,0,.2,1);
    border-right: 1px solid rgba(201,168,90,.15);
    box-shadow: 4px 0 32px rgba(0,0,0,.5), inset -1px 0 0 rgba(201,168,90,.06);
    overflow: visible;
  }
  .sl-sidebar.closed { transform: translateX(-100%); }

  /* sidebar brand */
  .sl-brand {
    padding: 0 20px;
    height: 64px; flex-shrink: 0;
    display: flex; align-items: center; gap: 11px;
    border-bottom: 1px solid rgba(201,168,90,.1);
    background: rgba(0,0,0,.15);
  }
  .sl-brand-logo {
    width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
    object-fit: cover; border: 1.5px solid rgba(255,255,255,.12);
  }
  .sl-brand-logo-fallback {
    width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
    background: linear-gradient(135deg,#212A37,#334455);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif; font-size: 14px; font-weight: 700;
    color: var(--oc-gold); letter-spacing: -.3px;
  }
  .sl-brand-text { overflow: hidden; }
  .sl-brand-title {
    font-family: 'Cormorant Garamond', serif; font-size: 14.5px; font-weight: 700;
    color: #ffffff; line-height: 1.2; letter-spacing: -.1px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .sl-brand-role {
    font-size: 10px; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: rgba(201,168,90,.65);
    margin-top: 2px;
  }
  .sl-sidebar-close {
    margin-left: auto; flex-shrink: 0;
    background: rgba(201,168,90,.08); border: none; border-radius: 7px;
    width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: rgba(201,168,90,.5); transition: all .12s;
    display: none;
  }
  .sl-sidebar-close:hover { background: rgba(201,168,90,.18); color: var(--oc-gold); }

  /* nav scroll area */
  .sl-nav {
    flex: 1; overflow-y: auto; overflow-x: hidden; padding: 12px 10px 20px;
    scrollbar-width: thin; scrollbar-color: rgba(201,168,90,.15) transparent;
  }
  .sl-nav::-webkit-scrollbar { width: 4px; }
  .sl-nav::-webkit-scrollbar-thumb { background: rgba(201,168,90,.2); border-radius: 4px; }

  /* section heading */
  .sl-nav-section {
    font-size: 9.5px; font-weight: 700; letter-spacing: .12em;
    text-transform: uppercase; color: rgba(201,168,90,.5);
    padding: 14px 10px 6px; user-select: none;
  }
  /* scrollable glow */
  .sl-nav { position: relative; }
  .sl-nav::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,168,90,.2), transparent);
    pointer-events: none;
  }

  /* menu button (collapsible) */
  .sl-menu-btn {
    width: 100%; display: flex; align-items: center; gap: 10px;
    padding: 9px 10px; border-radius: 9px; border: none; cursor: pointer;
    background: transparent; color: rgba(255,255,255,.65);
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
    transition: all .12s; text-align: left;
  }
  .sl-menu-btn:hover { background: rgba(255,255,255,.07); color: #ffffff; backdrop-filter: blur(4px); }
  .sl-menu-btn.open  { background: rgba(37,50,64,.7); color: var(--oc-gold); border: 1px solid rgba(201,168,90,.2); }
  .sl-menu-icon {
    width: 28px; height: 28px; border-radius: 7px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,.05); transition: background .12s;
  }
  .sl-menu-btn.open .sl-menu-icon { background: rgba(201,168,90,.15); }
  .sl-menu-btn:hover .sl-menu-icon { background: rgba(255,255,255,.08); }
  .sl-menu-label { flex: 1; }
  .sl-menu-chevron {
    flex-shrink: 0; transition: transform .2s;
    color: rgba(255,255,255,.25);
  }
  .sl-menu-btn.open .sl-menu-chevron { transform: rotate(180deg); color: var(--oc-gold); }

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
    color: rgba(255,255,255,.55); text-decoration: none; transition: all .12s;
    position: relative;
  }
  .sl-sub-link::before {
    content: ''; position: absolute; left: -5px; top: 50%; transform: translateY(-50%);
    width: 1px; height: 70%; background: rgba(201,168,90,.15); border-radius: 1px;
  }
  .sl-sub-link:hover { background: rgba(255,255,255,.06); color: rgba(255,255,255,.95); }
  .sl-sub-link.active {
    background: rgba(37,50,64,.85); color: var(--oc-gold-hi); font-weight: 700;
    border: 1px solid rgba(201,168,90,.22);
    box-shadow: 0 2px 8px rgba(0,0,0,.2);
  }
  .sl-sub-link.active::before { background: var(--oc-gold); }

  /* direct nav link (Dashboard) */
  .sl-direct-link {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 10px; border-radius: 9px; font-size: 13.5px; font-weight: 500;
    color: rgba(255,255,255,.65); text-decoration: none; transition: all .12s;
  }
  .sl-direct-link:hover { background: rgba(255,255,255,.07); color: #ffffff; text-decoration: none; }
  .sl-direct-link.active { background: rgba(37,50,64,.85); color: var(--oc-gold-hi); font-weight: 700;
    border: 1px solid rgba(201,168,90,.22); box-shadow: 0 2px 8px rgba(0,0,0,.2); }
  .sl-direct-icon {
    width: 28px; height: 28px; border-radius: 7px; flex-shrink: 0;
    background: rgba(255,255,255,.05);
    display: flex; align-items: center; justify-content: center;
  }
  .sl-direct-link.active .sl-direct-icon { background: rgba(201,168,90,.15); }

  /* ── sidebar footer — user chip ── */
  .sl-sidebar-foot {
    padding: 10px 10px 14px;
    border-top: 1px solid rgba(201,168,90,.1);
    flex-shrink: 0;
  }
  .sl-user-chip {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 11px; border-radius: 10px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(201,168,90,.12);
    backdrop-filter: blur(8px);
    cursor: default;
    box-shadow: 0 2px 12px rgba(0,0,0,.3), inset 0 1px 0 rgba(201,168,90,.06);
  }
  .sl-user-avatar {
    width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
    background: linear-gradient(135deg,#212A37,#334455);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; color: var(--oc-gold); letter-spacing: .02em;
  }
  .sl-user-info { flex: 1; overflow: hidden; }
  .sl-user-name {
    font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,.88);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .sl-user-role {
    font-size: 10px; font-weight: 600; letter-spacing: .08em;
    text-transform: uppercase; color: rgba(201,168,90,.6); margin-top: 1px;
  }
  .sl-user-logout {
    flex-shrink: 0; width: 28px; height: 28px; border-radius: 7px;
    background: rgba(239,68,68,.12); border: 1px solid rgba(239,68,68,.2);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: rgba(239,68,68,.7); transition: all .12s;
  }
  .sl-user-logout:hover { background: rgba(239,68,68,.22); color: #ef4444; border-color: rgba(239,68,68,.4); }

  /* ══ TOPBAR ══ */
  .sl-topbar {
    height: 64px; background: #FFFFFF;
    border-bottom: 1.5px solid #E3E3E3;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 24px; position: sticky; top: 0; z-index: 40;
    box-shadow: 0 1px 4px rgba(11,12,13,.06);
    flex-shrink: 0;
  }
  .sl-topbar-left { display: flex; align-items: center; gap: 12px; }
  .sl-topbar-right { display: flex; align-items: center; gap: 12px; }

  /* hamburger */
  .sl-hamburger {
    background: none; border: 1.5px solid #E3E3E3; border-radius: 9px;
    width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--oc-steel); transition: all .12s;
  }
  .sl-hamburger:hover { border-color: var(--oc-navy); background: var(--oc-bg); color: var(--oc-navy); }

  /* back button */
  .sl-back-btn {
    background: none; border: 1.5px solid #E3E3E3; border-radius: 9px;
    width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--oc-steel); transition: all .12s;
  }
  .sl-back-btn:hover { border-color: var(--oc-navy); background: var(--oc-bg); color: var(--oc-navy); }

  /* page title in topbar */
  .sl-topbar-title {
    font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 700;
    color: var(--oc-navy); letter-spacing: -.2px; font-style: italic;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    max-width: 320px;
  }

  /* topbar breadcrumb dot */
  .sl-topbar-sep { color: var(--oc-gold); font-size: 14px; user-select: none; }

  /* company pill */
  .sl-company-pill {
    display: flex; align-items: center; gap: 7px;
    padding: 5px 11px; border-radius: 8px;
    background: var(--oc-bg); border: 1.5px solid #E3E3E3;
  }
  .sl-company-logo {
    width: 22px; height: 22px; border-radius: 5px;
    object-fit: cover; flex-shrink: 0;
  }
  .sl-company-logo-fb {
    width: 22px; height: 22px; border-radius: 5px; flex-shrink: 0;
    background: linear-gradient(135deg,#212A37,#334455);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif; font-size: 9px; font-weight: 700; color: #F5E6C8;
  }
  .sl-company-name {
    font-size: 12.5px; font-weight: 700; color: var(--oc-navy);
    letter-spacing: -.1px; white-space: nowrap;
  }

  /* welcome chip */
  .sl-welcome {
    font-size: 13px; color: var(--oc-steel); font-weight: 500;
    white-space: nowrap;
  }
  .sl-welcome strong { color: var(--oc-navy); font-weight: 700; }

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
  "/cheque-book/create":     "New Cheque Book",
  "/cheque-book/entry":      "Issue Cheque",
  "/cheque-book/view":       "Cheque Book",
  "/stock":                  "Stock Ledger",

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
  stock:      <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 12l4-2"/></svg>,
  cheque:     <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="2" y="6" width="20" height="12" rx="2"/><path strokeLinecap="round" strokeLinejoin="round" d="M6 10h4M6 14h8"/></svg>,
};

/* ─── initials helper ── */
const initials = (name) => name?.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase() || "U";

/* ─── greeting helper ── */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  if (h < 21) return "Good Evening";
  return "Good Night";
}

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

/* ─── Mill logo helpers ── */
// SidebarLogo: 34×34 in sidebar brand bar
function SidebarLogo({ logoUrl, name }) {
  const [err, setErr] = React.useState(false);
  const fb = (name||"A").slice(0,2).toUpperCase();
  if (!err && logoUrl) {
    return (
      <img src={logoUrl} alt={name} className="sl-brand-logo"
        onError={() => setErr(true)}/>
    );
  }
  // Fall back to /logo.png (product logo)
  return (
    <LogoPngFallback size={34} fb={fb} className="sl-brand-logo"/>
  );
}

// MillLogo: 22×22 in topbar company pill
function MillLogo({ logoUrl, name }) {
  const [err, setErr] = React.useState(false);
  const fb = (name||"A").slice(0,2).toUpperCase();
  if (!err && logoUrl) {
    return (
      <img src={logoUrl} alt={name} className="sl-company-logo"
        onError={() => setErr(true)}/>
    );
  }
  return <LogoPngFallback size={22} fb={fb} className="sl-company-logo"/>;
}

// LogoPngFallback: tries /logo.png first, then shows initials block
function LogoPngFallback({ size, fb, className }) {
  const [err, setErr] = React.useState(false);
  if (!err) {
    return (
      <img src="/logo.png" alt="Logo" className={className}
        style={{ width:size, height:size }}
        onError={() => setErr(true)}/>
    );
  }
  return (
    <div className="sl-company-logo-fb" style={{ width:size, height:size,
      fontSize: size > 28 ? 10 : 8, borderRadius: size > 28 ? 9 : 5 }}>
      {fb}
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
  const role         = localStorage.getItem("role") || "Admin";
  const name         = localStorage.getItem("name") || "User";
  const isAdmin      = role === "Admin";
  const businessName = localStorage.getItem("businessName") || "Agro Plus";
  const millLogoUrl  = localStorage.getItem("logoUrl") || "";
  const allowedRoutes = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem("allowedRoutes")) || []; }
    catch { return []; }
  }, []);

  /* ── Access check ─────────────────────────────────────────────────────────
     allowedRoutes comes from login response (based on package plan).
     Admin with ["*"] can access everything.
     Admin with specific routes array → only those routes.
     Employee → only their allowedRoutes.
  ─────────────────────────────────────────────────────────────────────── */
  const can = React.useCallback((path) => {
    if (!allowedRoutes || allowedRoutes.length === 0) return true; // no restriction
    if (allowedRoutes.includes("*")) return true;                  // full access
    // Check exact match OR prefix match (e.g. /accounts/* covers /accounts/123)
    return allowedRoutes.some(r => r === path || path.startsWith(r.replace("/*", "")));
  }, [allowedRoutes]);

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
    else if (p.includes("cheque-book"))                             setActiveMenu("chequebook");
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
    localStorage.removeItem("millId");
    localStorage.removeItem("businessName");
    localStorage.removeItem("logoUrl");
    navigate("/");
  };

  /* ── Profile dropdown state ── */
  const [profileOpen, setProfileOpen] = React.useState(false);
  const profileRef = React.useRef(null);
  React.useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
          <SidebarLogo logoUrl={millLogoUrl} name={businessName}/>
          <div className="sl-brand-text">
            <div className="sl-brand-title">{businessName}</div>
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
          {(can("/create-account") || can("/view-accounts") || can("/general-entries")) && (
            <>
              <MenuSection icon={Icons.accounts} label="Accounts" menuKey="accounts" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
                <SubLink to="/create-account"  label="Add Account"      isActive={isActive("/create-account")}  hasAccess={can("/create-account")}  />
                <SubLink to="/view-accounts"   label="Accounts List"    isActive={isActive("/view-accounts")}   hasAccess={can("/view-accounts")}   />

                <SubLink to="/general-entries" label="Journal Entries"  isActive={isActive("/general-entries")} hasAccess={can("/general-entries")} />
              </MenuSection>
            </>
          )}

          {/* ── PRODUCTS ── */}
          {can("/products") && (
            <MenuSection icon={Icons.products} label="Products" menuKey="products" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/products" label="Products" isActive={isActive("/products")} hasAccess={can("/products")} />
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

          {/* ── EMPLOYEES — only if plan includes employee routes ── */}
          {(can("/employees") || can("/employees/new")) && (
            <MenuSection icon={Icons.employees} label="Employees" menuKey="employees" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/employees/new" label="New Employee"  isActive={isActive("/employees/new")} hasAccess={can("/employees/new")} />
              <SubLink to="/employees"     label="All Employees" isActive={isActive("/employees")}     hasAccess={can("/employees")}     />
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

          {/* ── STOCK ── */}
          {can("/stock") && (
            <Link
              to="/stock"
              className={`sl-direct-link${isActive("/stock") ? " active" : ""}`}
              onClick={closeMobile}
            >
              <span className="sl-direct-icon">{Icons.stock}</span>
              Stock Ledger
            </Link>
          )}

          {/* ── CHEQUE BOOK ── */}
          <MenuSection icon={Icons.cheque} label="Cheque Book" menuKey="chequebook" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
            <SubLink to="/cheque-book/create" label="Create Cheque Book" isActive={isActive("/cheque-book/create")} hasAccess={true}/>
            <SubLink to="/cheque-book/entry"  label="Issue Cheque"       isActive={isActive("/cheque-book/entry")}  hasAccess={true}/>
            <SubLink to="/cheque-book/view"   label="View All"           isActive={isActive("/cheque-book/view")}   hasAccess={true}/>
          </MenuSection>

        </nav>

        {/* ── User chip footer ── */}
        <div className="sl-sidebar-foot">
          <div className="sl-user-chip">
            <div className="sl-user-avatar">{initials(name)}</div>
            <div className="sl-user-info">
              <div className="sl-user-name">{name}</div>
              <div className="sl-user-role">{role}</div>
            </div>
            <div style={{display:"flex",gap:4}}>
              {isAdmin && (
                <button
                  onClick={() => { navigate("/profile"); closeMobile(); }}
                  title="Profile"
                  style={{
                    padding:"6px", borderRadius:8, border:"1px solid rgba(201,168,90,.18)",
                    background:"rgba(201,168,90,.07)", cursor:"pointer", display:"flex",
                    alignItems:"center", color:"rgba(201,168,90,.65)", transition:".15s",
                  }}
                >
                  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </button>
              )}
              <button className="sl-user-logout" onClick={handleLogout} title="Logout">
                <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
              </button>
            </div>
          </div>
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

            {/* Company pill — shows mill name + logo from localStorage */}
            <div className="sl-company-pill">
              <MillLogo logoUrl={millLogoUrl} name={businessName}/>
              <span className="sl-company-name">{businessName.toUpperCase()}</span>
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
              {getGreeting()}, <strong>{name}</strong>
            </span>

            {/* Profile avatar dropdown */}
            <div ref={profileRef} style={{position:"relative"}}>
              <button
                onClick={() => setProfileOpen(o => !o)}
                style={{
                  width:34, height:34, borderRadius:"50%", border:"2px solid rgba(201,168,90,.35)",
                  background:"linear-gradient(135deg,#212A37,#334455)", cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontFamily:"'Syne',sans-serif", fontSize:12, fontWeight:800, color:"#fff",
                  boxShadow:"0 2px 8px rgba(11,12,13,.25)", transition:".15s", flexShrink:0,
                }}
                title="Profile and Settings"
              >
                {initials(name)}
              </button>

              {profileOpen && (
                <div style={{
                  position:"absolute", right:0, top:"calc(100% + 8px)", width:180, zIndex:200,
                  background:"#FFFFFF", border:"1px solid #E3E3E3", borderRadius:12,
                  boxShadow:"0 8px 24px rgba(0,0,0,.12)", overflow:"hidden",
                }}>
                  <div style={{padding:"10px 14px 8px", borderBottom:"1px solid #f1f5f9"}}>
                    <div style={{fontSize:12.5, fontWeight:700, color:"#141A1F", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{name}</div>
                    <div style={{fontSize:11, color:"#6E7170"}}>{role}</div>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => { navigate("/profile"); setProfileOpen(false); }}
                      style={{
                        width:"100%", padding:"9px 14px", background:"none", border:"none",
                        textAlign:"left", fontSize:13, color:"#212A37", cursor:"pointer",
                        display:"flex", alignItems:"center", gap:8, fontWeight:500,
                      }}
                      onMouseEnter={e=>e.currentTarget.style.background="#f8fafc"}
                      onMouseLeave={e=>e.currentTarget.style.background="none"}
                    >
                      <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="#C9A85A" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                      My Profile
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    style={{
                      width:"100%", padding:"9px 14px", background:"none", border:"none",
                      textAlign:"left", fontSize:13, color:"#ef4444", cursor:"pointer",
                      display:"flex", alignItems:"center", gap:8, fontWeight:500,
                      borderTop:"1px solid #f1f5f9",
                    }}
                    onMouseEnter={e=>e.currentTarget.style.background="#fff0e8"}
                    onMouseLeave={e=>e.currentTarget.style.background="none"}
                  >
                    <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="sl-content">{children}</main>
      </div>
    </div>
  );
}