import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .sl-root {
    display: flex; min-height: 100vh;
    background: #f9fafb;
    font-family: 'DM Sans', sans-serif;
  }

  /* ══ SIDEBAR ══ */
  .sl-sidebar {
    position: fixed; top: 0; left: 0; height: 100vh; width: 242px;
    background: #111827;
    display: flex; flex-direction: column;
    z-index: 50;
    transition: transform .25s cubic-bezier(.4,0,.2,1);
    border-right: 1px solid rgba(255,255,255,.06);
    box-shadow: 4px 0 24px rgba(0,0,0,.35);
  }
  .sl-sidebar.closed { transform: translateX(-100%); }

  /* brand bar */
  .sl-brand {
    height: 60px; flex-shrink: 0;
    display: flex; align-items: center; gap: 10px;
    padding: 0 14px 0 12px;
    border-bottom: 1px solid rgba(255,255,255,.07);
    background: #0d1117;
  }
  .sl-brand-logo {
    width: 30px; height: 30px; border-radius: 7px; flex-shrink: 0;
    object-fit: cover; border: 1px solid rgba(255,255,255,.1);
  }
  .sl-brand-logo-fb {
    width: 30px; height: 30px; border-radius: 7px; flex-shrink: 0;
    background: #1f2937; border: 1px solid rgba(255,255,255,.08);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; color: #fff;
  }

  /* AgroPlus+ wordmark */
  .sl-wordmark {
    flex: 1; display: flex; align-items: baseline; gap: 0;
    font-size: 15px; font-weight: 700; letter-spacing: -.2px;
    line-height: 1; user-select: none;
  }
  .sl-wordmark-agro { color: #ffffff; }
  .sl-wordmark-p    { color: #4ade80; }  /* green P */
  .sl-wordmark-lus  { color: #ffffff; }  /* lus */
  .sl-wordmark-plus { color: #4ade80; }  /* + */
  .sl-brand-sub {
    font-size: 9px; font-weight: 600; letter-spacing: .1em;
    text-transform: uppercase; color: rgba(255,255,255,.3);
    margin-top: 1px;
  }

  .sl-sidebar-close {
    margin-left: auto; flex-shrink: 0;
    background: rgba(255,255,255,.06); border: none; border-radius: 6px;
    width: 26px; height: 26px; display: none;
    align-items: center; justify-content: center;
    cursor: pointer; color: rgba(255,255,255,.4); transition: all .12s;
  }
  .sl-sidebar-close:hover { background: rgba(255,255,255,.12); color: #fff; }

  /* nav */
  .sl-nav {
    flex: 1; overflow-y: auto; overflow-x: hidden;
    padding: 8px 8px 14px;
    scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.07) transparent;
  }
  .sl-nav::-webkit-scrollbar { width: 3px; }
  .sl-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,.07); border-radius: 3px; }

  /* section label */
  .sl-section-lbl {
    font-size: 8.5px; font-weight: 700; letter-spacing: .13em;
    text-transform: uppercase; color: rgba(255,255,255,.2);
    padding: 14px 10px 4px; user-select: none;
  }

  /* collapsible menu button */
  .sl-menu-btn {
    width: 100%; display: flex; align-items: center; gap: 8px;
    padding: 7px 9px; border-radius: 6px; border: none; cursor: pointer;
    background: transparent; color: rgba(255,255,255,.55);
    font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500;
    transition: all .12s; text-align: left;
  }
  .sl-menu-btn:hover { background: rgba(255,255,255,.07); color: #ffffff; }
  .sl-menu-btn.open  { background: rgba(255,255,255,.06); color: #ffffff; }
  .sl-menu-icon {
    width: 24px; height: 24px; border-radius: 5px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,.05);
  }
  .sl-menu-btn.open .sl-menu-icon { background: rgba(255,255,255,.09); }
  .sl-menu-label { flex: 1; }
  .sl-menu-chevron { flex-shrink: 0; transition: transform .18s; color: rgba(255,255,255,.25); }
  .sl-menu-btn.open .sl-menu-chevron { transform: rotate(180deg); color: rgba(255,255,255,.4); }

  /* sub-menu */
  .sl-sub { overflow: hidden; transition: max-height .2s cubic-bezier(.4,0,.2,1), opacity .16s; max-height: 0; opacity: 0; }
  .sl-sub.open { max-height: 500px; opacity: 1; }
  .sl-sub-inner { padding: 2px 0 2px 10px; display: flex; flex-direction: column; gap: 1px; }
  .sl-sub-link {
    display: flex; align-items: center; gap: 7px;
    padding: 6px 10px; border-radius: 5px;
    font-size: 12px; font-weight: 500;
    color: rgba(255,255,255,.5); text-decoration: none; transition: all .1s;
    position: relative;
  }
  .sl-sub-link::before {
    content: ''; position: absolute; left: -2px; top: 50%; transform: translateY(-50%);
    width: 1px; height: 60%; background: rgba(255,255,255,.08); border-radius: 1px;
  }
  .sl-sub-link:hover { background: rgba(255,255,255,.07); color: #fff; }
  .sl-sub-link.active {
    background: rgba(74,222,128,.12); color: #4ade80; font-weight: 600;
  }
  .sl-sub-link.active::before { background: #4ade80; }
  .sl-sub-link.soon { opacity: .45; cursor: default; }
  .sl-sub-link.soon:hover { background: transparent; color: rgba(255,255,255,.5); }

  /* direct link */
  .sl-direct-link {
    display: flex; align-items: center; gap: 8px;
    padding: 7px 9px; border-radius: 6px;
    font-size: 12.5px; font-weight: 500;
    color: rgba(255,255,255,.55); text-decoration: none; transition: all .12s;
  }
  .sl-direct-link:hover { background: rgba(255,255,255,.07); color: #fff; }
  .sl-direct-link.active { background: rgba(74,222,128,.12); color: #4ade80; font-weight: 600; }
  .sl-direct-icon {
    width: 24px; height: 24px; border-radius: 5px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,.05);
  }

  /* user chip */
  .sl-sidebar-foot {
    padding: 8px 8px 10px;
    border-top: 1px solid rgba(255,255,255,.07); flex-shrink: 0;
  }
  .sl-user-chip {
    display: flex; align-items: center; gap: 8px;
    padding: 7px 9px; border-radius: 7px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.07);
  }
  .sl-user-avatar {
    width: 28px; height: 28px; border-radius: 6px; flex-shrink: 0;
    background: #1f2937; border: 1px solid rgba(255,255,255,.12);
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 700; color: #4ade80;
  }
  .sl-user-info { flex: 1; overflow: hidden; }
  .sl-user-name { font-size: 12px; font-weight: 600; color: rgba(255,255,255,.85); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sl-user-role { font-size: 9px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: rgba(255,255,255,.28); margin-top: 1px; }
  .sl-user-logout {
    flex-shrink: 0; width: 24px; height: 24px; border-radius: 5px;
    background: rgba(239,68,68,.09); border: 1px solid rgba(239,68,68,.15);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: rgba(239,68,68,.55); transition: all .12s;
  }
  .sl-user-logout:hover { background: rgba(239,68,68,.18); color: #ef4444; }
  .sl-profile-btn {
    flex-shrink: 0; width: 24px; height: 24px; border-radius: 5px;
    background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: rgba(255,255,255,.35); transition: all .12s; margin-right: 3px;
  }
  .sl-profile-btn:hover { background: rgba(255,255,255,.1); color: #fff; }

  /* ══ TOPBAR ══ */
  .sl-topbar {
    height: 56px; background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 20px; position: sticky; top: 0; z-index: 40;
    box-shadow: 0 1px 3px rgba(0,0,0,.05); flex-shrink: 0;
  }
  .sl-topbar-left  { display: flex; align-items: center; gap: 8px; }
  .sl-topbar-right { display: flex; align-items: center; gap: 8px; }

  .sl-hamburger {
    background: none; border: 1px solid #e5e7eb; border-radius: 6px;
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #6b7280; transition: all .12s;
  }
  .sl-hamburger:hover { border-color: #374151; color: #111827; background: #f9fafb; }
  .sl-back-btn {
    background: none; border: 1px solid #e5e7eb; border-radius: 6px;
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #6b7280; transition: all .12s;
  }
  .sl-back-btn:hover { border-color: #374151; color: #111827; background: #f9fafb; }
  .sl-topbar-title { font-size: 13.5px; font-weight: 600; color: #111827; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 280px; }
  .sl-topbar-sep   { color: #d1d5db; font-size: 14px; user-select: none; }

  .sl-company-pill {
    display: flex; align-items: center; gap: 6px;
    padding: 4px 10px; border-radius: 6px;
    background: #f3f4f6; border: 1px solid #e5e7eb;
  }
  .sl-company-logo    { width: 18px; height: 18px; border-radius: 4px; object-fit: cover; flex-shrink: 0; }
  .sl-company-logo-fb {
    width: 18px; height: 18px; border-radius: 4px; flex-shrink: 0;
    background: #1f2937; display: flex; align-items: center; justify-content: center;
    font-size: 7px; font-weight: 700; color: #4ade80;
  }
  .sl-company-name { font-size: 12px; font-weight: 700; color: #111827; white-space: nowrap; }
  .sl-welcome      { font-size: 12px; color: #6b7280; font-weight: 500; white-space: nowrap; }
  .sl-welcome strong { color: #111827; font-weight: 700; }

  /* ══ MAIN ══ */
  .sl-main-wrap { flex: 1; display: flex; flex-direction: column; transition: margin-left .25s cubic-bezier(.4,0,.2,1); min-width: 0; }
  .sl-main-wrap.sidebar-open { margin-left: 242px; }
  .sl-content { flex: 1; padding: 24px; }

  .sl-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 49; }
  .sl-overlay.visible { display: block; }

  /* soon badge */
  .sl-soon-badge {
    font-size: 8px; font-weight: 700; padding: 1px 5px; border-radius: 3px;
    background: rgba(255,255,255,.08); color: rgba(255,255,255,.3);
    letter-spacing: .06em; text-transform: uppercase; margin-left: auto;
  }

  @media (max-width: 900px) {
    .sl-main-wrap.sidebar-open { margin-left: 0 !important; }
    .sl-sidebar-close { display: flex !important; }
    .sl-topbar-title  { display: none; }
    .sl-topbar-sep    { display: none; }
    .sl-company-name  { display: none; }
    .sl-welcome       { display: none; }
  }
  @media (max-width: 500px) { .sl-content { padding: 14px; } }
`;

const PAGE_LABELS = {
  "/dashboard":"Dashboard",
  "/create-account":"Add Account","/view-accounts":"Chart of Accounts",
  "/general-entries":"Journal Entries","/cashbook":"Cashbook Entry","/cashbook-report":"Daily Cashbook",
  "/add-account-bank":"Add Bank Account","/cheque-book/create":"Create Cheque Book",
  "/cheque-book/entry":"Issue Cheque","/cheque-book/view":"Cheque Management",
  "/add-invoice-purchase":"New Purchase","/view-purchase-invoices":"All Purchases",
  "/add-invoice-sales":"Create Invoice","/view-sales-invoices":"Sales History",
  "/products":"Products List","/stock":"Inventory",
  "/weight-bridge":"Weight Bridge Entry","/weight-bridge/invoices":"WB Invoices",
  "/employees/new":"New Employee","/employees":"All Employees",
  "/trialbalance":"Trial Balance","/balancesheet":"Balance Sheet","/incomestatement":"Income Statement",
  "/profile":"My Profile","/ledger":"Ledger",
};

/* ── Icons ── */
const Ico = {
  home:     <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15.75a.75.75 0 01-.75-.75v-4.5h-6V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"/></svg>,
  accounts: <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>,
  cash:     <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  bank:     <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>,
  purchase: <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
  sales:    <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/></svg>,
  products: <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/></svg>,
  weight:   <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>,
  employees:<svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  reports:  <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
  chevron:  <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>,
  back:     <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>,
  menu:     <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>,
  close:    <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>,
  dot:      <svg width={4} height={4} viewBox="0 0 4 4" fill="currentColor"><circle cx={2} cy={2} r={2}/></svg>,
  profile:  <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>,
  logout:   <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>,
};

const initials    = n => (n||"U").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
const getGreeting = () => { const h=new Date().getHours(); return h<12?"Good morning":h<17?"Good afternoon":h<21?"Good evening":"Good night"; };

/* ── AgroPlus+ Wordmark ── */
function Wordmark() {
  return (
    <div style={{ display:"flex", flexDirection:"column" }}>
      <div className="sl-wordmark">
        <span className="sl-wordmark-agro">Agro</span>
        <span className="sl-wordmark-p">P</span>
        <span className="sl-wordmark-lus">lus</span>
        <span className="sl-wordmark-plus">+</span>
      </div>
      <div className="sl-brand-sub">Mill Management</div>
    </div>
  );
}

/* ── Brand logo: tries /logo.png, falls back to initials ── */
function BrandLogo() {
  const [err, setErr] = useState(false);
  if (!err) {
    return <img src="/logo.png" alt="AgroPlus+" className="sl-brand-logo" onError={()=>setErr(true)}/>;
  }
  return <div className="sl-brand-logo-fb">A+</div>;
}

/* ── Top-nav company logo: same /logo.png ── */
function CompanyLogo({ businessName }) {
  const [err, setErr] = useState(false);
  const fb = (businessName||"A").slice(0,2).toUpperCase();
  if (!err) {
    return <img src="/logo.png" alt={businessName} className="sl-company-logo" onError={()=>setErr(true)}/>;
  }
  return <div className="sl-company-logo-fb">{fb}</div>;
}

/* ── Collapsible menu section ── */
function MenuSection({ icon, label, menuKey, activeMenu, setActiveMenu, children }) {
  const open = activeMenu === menuKey;
  return (
    <div>
      <button className={`sl-menu-btn${open?" open":""}`} onClick={()=>setActiveMenu(open?"":menuKey)}>
        <span className="sl-menu-icon">{icon}</span>
        <span className="sl-menu-label">{label}</span>
        <span className="sl-menu-chevron">{Ico.chevron}</span>
      </button>
      <div className={`sl-sub${open?" open":""}`}>
        <div className="sl-sub-inner">{children}</div>
      </div>
    </div>
  );
}

/* ── Sub-link: `soon` = not built yet (links to #) ── */
function SubLink({ to, label, isActive, hasAccess, soon }) {
  if (!hasAccess) return null;
  if (soon) {
    return (
      <span className="sl-sub-link soon">
        {Ico.dot}{label}
        <span className="sl-soon-badge">soon</span>
      </span>
    );
  }
  return (
    <Link to={to} className={`sl-sub-link${isActive?" active":""}`}>
      {Ico.dot}{label}
    </Link>
  );
}

export default function SidebarLayout({ children }) {
  const [isOpen,     setIsOpen]     = useState(true);
  const [activeMenu, setActiveMenu] = useState("");
  const [profileOpen,setProfileOpen]= useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const profileRef = useRef(null);

  const role         = localStorage.getItem("role")         || "Admin";
  const name         = localStorage.getItem("name")         || "User";
  const businessName = localStorage.getItem("businessName") || "Agro Plus";
  const isAdmin      = role === "Admin";
  const allowedRoutes = React.useMemo(()=>{ try{return JSON.parse(localStorage.getItem("allowedRoutes"))||[];}catch{return [];} },[]);

  const can = React.useCallback(path => {
    if (!allowedRoutes?.length) return true;
    if (allowedRoutes.includes("*")) return true;
    return allowedRoutes.some(r => r===path || path.startsWith(r.replace("/*","")));
  }, [allowedRoutes]);

  const isAt = path => location.pathname === path;

  // Auto-expand the right section based on current route
  useEffect(()=>{
    const p = location.pathname;
    if (p==="/dashboard") setActiveMenu("dashboard");
    else if (p.includes("account")||p.includes("ledger")) setActiveMenu("accounts");
    else if (p.includes("cashbook")||p.includes("general-entries")||p.includes("journal")) setActiveMenu("cash");
    else if (p.includes("cheque")||p.includes("bank")) setActiveMenu("bank");
    else if (p.includes("purchase")) setActiveMenu("purchase");
    else if (p.includes("sales")||p.includes("sales-invoices")) setActiveMenu("sales");
    else if (p.includes("product")||p.includes("stock")) setActiveMenu("products");
    else if (p.includes("weight-bridge")) setActiveMenu("weight");
    else if (p.includes("employee")) setActiveMenu("employees");
    else if (p.includes("balance")||p.includes("income")||p.includes("trial")) setActiveMenu("reports");
  },[location.pathname]);

  useEffect(()=>{
    const h = e => { if(profileRef.current&&!profileRef.current.contains(e.target)) setProfileOpen(false); };
    document.addEventListener("mousedown",h);
    return ()=>document.removeEventListener("mousedown",h);
  },[]);

  const closeMobile = () => { if(window.innerWidth<900) setIsOpen(false); };

  const handleLogout = () => {
    ["token","role","name","allowedRoutes","millId","businessName","logoUrl"].forEach(k=>localStorage.removeItem(k));
    navigate("/");
  };

  const pageLabel = PAGE_LABELS[location.pathname] || "";

  return (
    <div className="sl-root">
      <style>{FONTS}{CSS}</style>

      <div className={`sl-overlay${isOpen&&window.innerWidth<900?" visible":""}`} onClick={()=>setIsOpen(false)}/>

      {/* ══ SIDEBAR ══ */}
      <aside className={`sl-sidebar${isOpen?"":" closed"}`}>

        {/* Brand */}
        <div className="sl-brand">
          <BrandLogo/>
          <Wordmark/>
          <button className="sl-sidebar-close" onClick={()=>setIsOpen(false)}>{Ico.close}</button>
        </div>

        <nav className="sl-nav">

          {/* 1. Dashboard */}
          {can("/dashboard") && (
            <Link to="/dashboard" className={`sl-direct-link${isAt("/dashboard")?" active":""}`} onClick={closeMobile}>
              <span className="sl-direct-icon">{Ico.home}</span>Dashboard
            </Link>
          )}

          {/* 2. Accounts */}
          {(can("/create-account")||can("/view-accounts")) && (
            <MenuSection icon={Ico.accounts} label="Accounts" menuKey="accounts" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/create-account" label="Add Account"       isActive={isAt("/create-account")} hasAccess={can("/create-account")}/>
              <SubLink to="/view-accounts"  label="Chart of Accounts" isActive={isAt("/view-accounts")}  hasAccess={can("/view-accounts")}/>
            </MenuSection>
          )}

          {/* 3. Cash Management */}
          {(can("/general-entries")||can("/cashbook")||can("/cashbook-report")) && (
            <MenuSection icon={Ico.cash} label="Cash Management" menuKey="cash" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/general-entries" label="Journal Entries" isActive={isAt("/general-entries")} hasAccess={can("/general-entries")}/>
              <SubLink to="/cashbook"        label="Cashbook Entry"  isActive={isAt("/cashbook")}        hasAccess={can("/cashbook")}/>
              <SubLink to="#"                label="Fund Transfer"   isActive={false}                    hasAccess={true} soon/>
              <SubLink to="/cashbook-report" label="Daily Cashbook"  isActive={isAt("/cashbook-report")} hasAccess={can("/cashbook-report")}/>
            </MenuSection>
          )}

          {/* 4. Bank Management */}
          <MenuSection icon={Ico.bank} label="Bank Management" menuKey="bank" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
            <SubLink to="#"                    label="Add Bank Account"    isActive={false}                           hasAccess={true} soon/>
            <SubLink to="/cheque-book/create"  label="Create Cheque Book"  isActive={isAt("/cheque-book/create")}     hasAccess={true}/>
            <SubLink to="/cheque-book/entry"   label="Issue Cheque"        isActive={isAt("/cheque-book/entry")}      hasAccess={true}/>
            <SubLink to="/cheque-book/view"    label="Cheque Management"   isActive={isAt("/cheque-book/view")}       hasAccess={true}/>
            <SubLink to="#"                    label="Bank Reconciliation" isActive={false}                           hasAccess={true} soon/>
          </MenuSection>

          {/* 5. Purchase */}
          {(can("/add-invoice-purchase")||can("/view-purchase-invoices")) && (
            <MenuSection icon={Ico.purchase} label="Purchase" menuKey="purchase" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/add-invoice-purchase"   label="New Purchase Order" isActive={isAt("/add-invoice-purchase")}   hasAccess={can("/add-invoice-purchase")}/>
              <SubLink to="/view-purchase-invoices" label="All Purchases"      isActive={isAt("/view-purchase-invoices")} hasAccess={can("/view-purchase-invoices")}/>
            </MenuSection>
          )}

          {/* 6. Sales */}
          {(can("/add-invoice-sales")||can("/view-sales-invoices")) && (
            <MenuSection icon={Ico.sales} label="Sales" menuKey="sales" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/add-invoice-sales"   label="Create Invoice" isActive={isAt("/add-invoice-sales")}   hasAccess={can("/add-invoice-sales")}/>
              <SubLink to="/view-sales-invoices" label="Sales History"  isActive={isAt("/view-sales-invoices")} hasAccess={can("/view-sales-invoices")}/>
            </MenuSection>
          )}

          {/* 7. Products */}
          {(can("/products")||can("/stock")) && (
            <MenuSection icon={Ico.products} label="Products" menuKey="products" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/products" label="Products List" isActive={isAt("/products")} hasAccess={can("/products")}/>
              <SubLink to="/stock"    label="Inventory"     isActive={isAt("/stock")}    hasAccess={can("/stock")}/>
            </MenuSection>
          )}

          {/* 8. Weight Bridge */}
          {(can("/weight-bridge")||can("/weight-bridge/invoices")) && (
            <MenuSection icon={Ico.weight} label="Weight Bridge" menuKey="weight" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/weight-bridge"          label="WB Entry"    isActive={isAt("/weight-bridge")}          hasAccess={can("/weight-bridge")}/>
              <SubLink to="/weight-bridge/invoices" label="WB Invoices" isActive={isAt("/weight-bridge/invoices")} hasAccess={can("/weight-bridge/invoices")}/>
            </MenuSection>
          )}

          {/* 9. Employees */}
          {(can("/employees")||can("/employees/new")) && (
            <MenuSection icon={Ico.employees} label="Employees" menuKey="employees" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/employees/new" label="New Employee"  isActive={isAt("/employees/new")} hasAccess={can("/employees/new")}/>
              <SubLink to="/employees"     label="All Employees" isActive={isAt("/employees")}     hasAccess={can("/employees")}/>
            </MenuSection>
          )}

          {/* 10. Reports */}
          {(can("/trialbalance")||can("/balancesheet")||can("/incomestatement")) && (
            <MenuSection icon={Ico.reports} label="Reports" menuKey="reports" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/trialbalance"    label="Trial Balance"    isActive={isAt("/trialbalance")}    hasAccess={can("/trialbalance")}/>
              <SubLink to="/balancesheet"    label="Balance Sheet"    isActive={isAt("/balancesheet")}    hasAccess={can("/balancesheet")}/>
              <SubLink to="/incomestatement" label="Income Statement" isActive={isAt("/incomestatement")} hasAccess={can("/incomestatement")}/>
            </MenuSection>
          )}

        </nav>

        {/* User chip */}
        <div className="sl-sidebar-foot">
          <div className="sl-user-chip">
            <div className="sl-user-avatar">{initials(name)}</div>
            <div className="sl-user-info">
              <div className="sl-user-name">{name}</div>
              <div className="sl-user-role">{role}</div>
            </div>
            {isAdmin && (
              <button className="sl-profile-btn" title="Profile" onClick={()=>{navigate("/profile");closeMobile();}}>
                {Ico.profile}
              </button>
            )}
            <button className="sl-user-logout" title="Sign Out" onClick={handleLogout}>
              {Ico.logout}
            </button>
          </div>
        </div>
      </aside>

      {/* ══ MAIN ══ */}
      <div className={`sl-main-wrap${isOpen?" sidebar-open":""}`}>

        <header className="sl-topbar">
          <div className="sl-topbar-left">
            <button className="sl-hamburger" onClick={()=>setIsOpen(o=>!o)}>{Ico.menu}</button>
            {location.pathname !== "/dashboard" && (
              <button className="sl-back-btn" onClick={()=>navigate(-1)}>{Ico.back}</button>
            )}
            <div className="sl-company-pill">
              <CompanyLogo businessName={businessName}/>
              <span className="sl-company-name">{businessName}</span>
            </div>
            {pageLabel && (
              <>
                <span className="sl-topbar-sep">·</span>
                <span className="sl-topbar-title">{pageLabel}</span>
              </>
            )}
          </div>

          <div className="sl-topbar-right">
            <span className="sl-welcome">{getGreeting()}, <strong>{name.split(" ")[0]}</strong></span>
            <div ref={profileRef} style={{ position:"relative" }}>
              <button onClick={()=>setProfileOpen(o=>!o)} title={name}
                style={{ width:32, height:32, borderRadius:"50%", border:"2px solid #e5e7eb", background:"#111827", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:"#4ade80", transition:".12s", flexShrink:0 }}>
                {initials(name)}
              </button>
              {profileOpen && (
                <div style={{ position:"absolute", right:0, top:"calc(100% + 6px)", width:170, zIndex:200, background:"#fff", border:"1px solid #e5e7eb", borderRadius:9, boxShadow:"0 8px 24px rgba(0,0,0,.1)", overflow:"hidden" }}>
                  <div style={{ padding:"9px 13px 7px", borderBottom:"1px solid #f3f4f6" }}>
                    <div style={{ fontSize:12.5, fontWeight:700, color:"#111827" }}>{name}</div>
                    <div style={{ fontSize:11, color:"#6b7280" }}>{role}</div>
                  </div>
                  {isAdmin && (
                    <button onClick={()=>{navigate("/profile");setProfileOpen(false);}}
                      style={{ width:"100%", padding:"8px 13px", background:"none", border:"none", textAlign:"left", fontSize:12.5, color:"#1f2937", cursor:"pointer", display:"flex", alignItems:"center", gap:7, fontWeight:500 }}
                      onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"}
                      onMouseLeave={e=>e.currentTarget.style.background="none"}>
                      {Ico.profile} My Profile
                    </button>
                  )}
                  <button onClick={handleLogout}
                    style={{ width:"100%", padding:"8px 13px", background:"none", border:"none", borderTop:"1px solid #f3f4f6", textAlign:"left", fontSize:12.5, color:"#dc2626", cursor:"pointer", display:"flex", alignItems:"center", gap:7, fontWeight:500 }}
                    onMouseEnter={e=>e.currentTarget.style.background="#fef2f2"}
                    onMouseLeave={e=>e.currentTarget.style.background="none"}>
                    {Ico.logout} Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="sl-content">{children}</main>
      </div>
    </div>
  );
}