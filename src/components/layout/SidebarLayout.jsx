import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  :root {
    --pr-green:   #065f46;
    --pr-dark:    #1f2937;
    --pr-bg:      #f9fafb;
    --pr-amber:   #92400e;
    --pr-yellow:  #e6b800;
    --pr-mid:     #6b7280;
    --pr-light:   #e5e7eb;
    --pr-lighter: #f3f4f6;
    --pr-white:   #ffffff;
    --pr-text:    #111827;
  }

  .sl-root *, .sl-root *::before, .sl-root *::after { box-sizing: border-box; }
  .sl-root {
    display: flex; min-height: 100vh;
    background: var(--pr-bg);
    font-family: 'DM Sans', sans-serif;
  }

  /* ══ SIDEBAR ══════════════════════════════════════════════════════ */
  .sl-sidebar {
    position: fixed; top: 0; left: 0; height: 100vh; width: 248px;
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
    padding: 0 18px;
    border-bottom: 1px solid rgba(255,255,255,.07);
    background: #0d1117;
  }
  .sl-brand-logo {
    width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
    object-fit: cover; border: 1px solid rgba(255,255,255,.1);
  }
  .sl-brand-logo-fallback {
    width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
    background: #065f46;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px; font-weight: 700; color: #ffffff;
  }
  .sl-brand-text { overflow: hidden; flex: 1; }
  .sl-brand-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px; font-weight: 700;
    color: #ffffff; line-height: 1.2;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    letter-spacing: -.1px;
  }
  .sl-brand-role {
    font-size: 9.5px; font-weight: 600; letter-spacing: .1em;
    text-transform: uppercase; color: rgba(255,255,255,.35);
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
    padding: 10px 10px 16px;
    scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.08) transparent;
  }
  .sl-nav::-webkit-scrollbar { width: 3px; }
  .sl-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,.08); border-radius: 3px; }

  /* section label */
  .sl-nav-section {
    font-size: 9px; font-weight: 700; letter-spacing: .13em;
    text-transform: uppercase; color: rgba(255,255,255,.25);
    padding: 16px 10px 5px; user-select: none;
  }

  /* collapsible menu button */
  .sl-menu-btn {
    width: 100%; display: flex; align-items: center; gap: 9px;
    padding: 8px 10px; border-radius: 7px; border: none; cursor: pointer;
    background: transparent; color: rgba(255,255,255,.6);
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
    transition: all .12s; text-align: left;
  }
  .sl-menu-btn:hover { background: rgba(255,255,255,.07); color: #ffffff; }
  .sl-menu-btn.open  {
    background: rgba(6,95,70,.2); color: #ffffff;
    border: 1px solid rgba(6,95,70,.35);
  }
  .sl-menu-icon {
    width: 26px; height: 26px; border-radius: 6px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,.05); transition: background .12s;
  }
  .sl-menu-btn:hover .sl-menu-icon  { background: rgba(255,255,255,.09); }
  .sl-menu-btn.open .sl-menu-icon   { background: rgba(6,95,70,.3); }
  .sl-menu-label { flex: 1; }
  .sl-menu-chevron {
    flex-shrink: 0; transition: transform .2s; color: rgba(255,255,255,.3);
  }
  .sl-menu-btn.open .sl-menu-chevron { transform: rotate(180deg); color: rgba(255,255,255,.5); }

  /* sub-menu */
  .sl-sub { overflow: hidden; transition: max-height .22s cubic-bezier(.4,0,.2,1), opacity .18s; max-height: 0; opacity: 0; }
  .sl-sub.open { max-height: 400px; opacity: 1; }
  .sl-sub-inner { padding: 2px 0 2px 12px; display: flex; flex-direction: column; gap: 1px; }
  .sl-sub-link {
    display: flex; align-items: center; gap: 8px;
    padding: 7px 10px; border-radius: 6px;
    font-size: 12.5px; font-weight: 500;
    color: rgba(255,255,255,.55); text-decoration: none; transition: all .12s;
    position: relative;
  }
  .sl-sub-link::before {
    content: ''; position: absolute; left: -4px; top: 50%; transform: translateY(-50%);
    width: 1px; height: 65%; background: rgba(255,255,255,.1); border-radius: 1px;
  }
  .sl-sub-link:hover { background: rgba(255,255,255,.07); color: #ffffff; }
  .sl-sub-link.active {
    background: #065f46; color: #ffffff; font-weight: 600;
    box-shadow: 0 1px 6px rgba(6,95,70,.4);
  }
  .sl-sub-link.active::before { background: #34d399; }

  /* direct link */
  .sl-direct-link {
    display: flex; align-items: center; gap: 9px;
    padding: 8px 10px; border-radius: 7px;
    font-size: 13px; font-weight: 500;
    color: rgba(255,255,255,.6); text-decoration: none; transition: all .12s;
  }
  .sl-direct-link:hover { background: rgba(255,255,255,.07); color: #ffffff; text-decoration: none; }
  .sl-direct-link.active {
    background: #065f46; color: #ffffff; font-weight: 600;
    box-shadow: 0 1px 6px rgba(6,95,70,.4);
  }
  .sl-direct-icon {
    width: 26px; height: 26px; border-radius: 6px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,.05);
  }
  .sl-direct-link.active .sl-direct-icon { background: rgba(255,255,255,.12); }

  /* user chip */
  .sl-sidebar-foot {
    padding: 10px 10px 12px;
    border-top: 1px solid rgba(255,255,255,.07); flex-shrink: 0;
  }
  .sl-user-chip {
    display: flex; align-items: center; gap: 9px;
    padding: 8px 10px; border-radius: 8px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.07);
  }
  .sl-user-avatar {
    width: 30px; height: 30px; border-radius: 7px; flex-shrink: 0;
    background: #065f46;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; color: #ffffff;
  }
  .sl-user-info { flex: 1; overflow: hidden; }
  .sl-user-name {
    font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,.88);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .sl-user-role {
    font-size: 9.5px; font-weight: 600; letter-spacing: .08em;
    text-transform: uppercase; color: rgba(255,255,255,.3); margin-top: 1px;
  }
  .sl-user-logout {
    flex-shrink: 0; width: 26px; height: 26px; border-radius: 6px;
    background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.18);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: rgba(239,68,68,.6); transition: all .12s;
  }
  .sl-user-logout:hover { background: rgba(239,68,68,.2); color: #ef4444; }

  /* ══ TOPBAR ═══════════════════════════════════════════════════════ */
  .sl-topbar {
    height: 60px; background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 24px; position: sticky; top: 0; z-index: 40;
    box-shadow: 0 1px 3px rgba(0,0,0,.06); flex-shrink: 0;
  }
  .sl-topbar-left  { display: flex; align-items: center; gap: 10px; }
  .sl-topbar-right { display: flex; align-items: center; gap: 10px; }

  .sl-hamburger {
    background: none; border: 1px solid #e5e7eb; border-radius: 7px;
    width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #6b7280; transition: all .12s;
  }
  .sl-hamburger:hover { border-color: #065f46; color: #065f46; background: #f0fdf4; }

  .sl-back-btn {
    background: none; border: 1px solid #e5e7eb; border-radius: 7px;
    width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #6b7280; transition: all .12s;
  }
  .sl-back-btn:hover { border-color: #065f46; color: #065f46; background: #f0fdf4; }

  .sl-topbar-title {
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
    color: #111827; letter-spacing: -.1px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 300px;
  }
  .sl-topbar-sep { color: #d1d5db; font-size: 14px; user-select: none; }

  .sl-company-pill {
    display: flex; align-items: center; gap: 7px;
    padding: 5px 11px; border-radius: 7px;
    background: #f3f4f6; border: 1px solid #e5e7eb;
  }
  .sl-company-logo     { width: 20px; height: 20px; border-radius: 5px; object-fit: cover; flex-shrink: 0; }
  .sl-company-logo-fb  {
    width: 20px; height: 20px; border-radius: 5px; flex-shrink: 0;
    background: #065f46;
    display: flex; align-items: center; justify-content: center;
    font-size: 8px; font-weight: 700; color: #fff;
  }
  .sl-company-name     { font-size: 12px; font-weight: 700; color: #111827; white-space: nowrap; }

  .sl-welcome          { font-size: 12.5px; color: #6b7280; font-weight: 500; white-space: nowrap; }
  .sl-welcome strong   { color: #111827; font-weight: 700; }

  /* ══ MAIN ═════════════════════════════════════════════════════════ */
  .sl-main-wrap { flex: 1; display: flex; flex-direction: column; transition: margin-left .25s cubic-bezier(.4,0,.2,1); min-width: 0; }
  .sl-main-wrap.sidebar-open { margin-left: 248px; }
  .sl-content { flex: 1; padding: 28px; }

  .sl-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 49; backdrop-filter: blur(2px); }
  .sl-overlay.visible { display: block; }

  @media (max-width: 900px) {
    .sl-main-wrap.sidebar-open { margin-left: 0 !important; }
    .sl-sidebar-close { display: flex !important; }
    .sl-topbar-title  { display: none; }
    .sl-topbar-sep    { display: none; }
    .sl-company-name  { display: none; }
    .sl-welcome       { display: none; }
  }
  @media (max-width: 500px) { .sl-content { padding: 16px; } }
`;

const PAGE_LABELS = {
  "/dashboard":"Dashboard","/create-account":"New Account","/view-accounts":"Accounts",
  "/ledger":"Ledger","/general-entries":"Journal Entries","/products":"Products",
  "/add-invoice-purchase":"New Purchase","/view-purchase-invoices":"Purchase Invoices",
  "/add-invoice-sales":"New Sales Invoice","/view-sales-invoices":"Sales Invoices",
  "/employees/new":"New Employee","/employees":"Employees",
  "/trialbalance":"Trial Balance","/balancesheet":"Balance Sheet","/incomestatement":"Income Statement",
  "/weight-bridge":"Weight Bridge","/weight-bridge/invoices":"WB Invoices",
  "/cashbook":"Cashbook","/cashbook-report":"Daily Cashbook",
  "/cheque-book/create":"New Cheque Book","/cheque-book/entry":"Issue Cheque","/cheque-book/view":"Cheque Book",
  "/stock":"Stock Ledger","/profile":"Profile",
};

const Ico = {
  home:      <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15.75a.75.75 0 01-.75-.75v-4.5h-6V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"/></svg>,
  accounts:  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>,
  products:  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/></svg>,
  purchase:  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
  sales:     <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/></svg>,
  employees: <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  reports:   <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
  weight:    <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>,
  cashbook:  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  chevron:   <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>,
  back:      <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>,
  menu:      <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>,
  close:     <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>,
  stock:     <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/></svg>,
  cheque:    <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="2" y="6" width="20" height="12" rx="2"/><path strokeLinecap="round" strokeLinejoin="round" d="M6 10h4M6 14h8"/></svg>,
  dot:       <svg width={4} height={4} viewBox="0 0 4 4" fill="currentColor"><circle cx={2} cy={2} r={2}/></svg>,
};

const initials   = n => (n||"U").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
const getGreeting = () => { const h=new Date().getHours(); return h<12?"Good morning":h<17?"Good afternoon":h<21?"Good evening":"Good night"; };

function MenuSection({ icon, label, menuKey, activeMenu, setActiveMenu, children }) {
  const open = activeMenu === menuKey;
  return (
    <div>
      <button className={`sl-menu-btn${open?" open":""}`} onClick={() => setActiveMenu(open?"":menuKey)}>
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

function SubLink({ to, label, isActive, hasAccess }) {
  if (!hasAccess) return null;
  return (
    <Link to={to} className={`sl-sub-link${isActive?" active":""}`}>
      {Ico.dot}{label}
    </Link>
  );
}

function SidebarLogo({ logoUrl, name }) {
  const [err, setErr] = React.useState(false);
  const fb = (name||"A").slice(0,2).toUpperCase();
  if (!err && logoUrl) return <img src={logoUrl} alt={name} className="sl-brand-logo" onError={()=>setErr(true)}/>;
  return <LogoPngFallback size={32} fb={fb} className="sl-brand-logo"/>;
}
function MillLogo({ logoUrl, name }) {
  const [err, setErr] = React.useState(false);
  const fb = (name||"A").slice(0,2).toUpperCase();
  if (!err && logoUrl) return <img src={logoUrl} alt={name} className="sl-company-logo" onError={()=>setErr(true)}/>;
  return <LogoPngFallback size={20} fb={fb} className="sl-company-logo"/>;
}
function LogoPngFallback({ size, fb, className }) {
  const [err, setErr] = React.useState(false);
  if (!err) return <img src="/logo.png" alt="Logo" className={className} style={{width:size,height:size}} onError={()=>setErr(true)}/>;
  return <div className="sl-company-logo-fb" style={{width:size,height:size,fontSize:size>24?9:7,borderRadius:size>24?7:4}}>{fb}</div>;
}

export default function SidebarLayout({ children }) {
  const [isOpen,     setIsOpen]     = useState(true);
  const [activeMenu, setActiveMenu] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const role          = localStorage.getItem("role") || "Admin";
  const name          = localStorage.getItem("name") || "User";
  const isAdmin       = role === "Admin";
  const businessName  = localStorage.getItem("businessName") || "Agro Plus";
  const millLogoUrl   = localStorage.getItem("logoUrl") || "";
  const allowedRoutes = React.useMemo(() => { try { return JSON.parse(localStorage.getItem("allowedRoutes"))||[]; } catch { return []; } }, []);

  const can = React.useCallback(path => {
    if (!allowedRoutes?.length) return true;
    if (allowedRoutes.includes("*")) return true;
    return allowedRoutes.some(r => r===path || path.startsWith(r.replace("/*","")));
  }, [allowedRoutes]);

  const isActive = path => location.pathname === path;

  useEffect(() => {
    const p = location.pathname;
    if (p==="/dashboard") setActiveMenu("dashboard");
    else if (p.includes("account")||p.includes("ledger")||p.includes("general")) setActiveMenu("accounts");
    else if (p.includes("product")) setActiveMenu("products");
    else if (p.includes("purchase")) setActiveMenu("purchase");
    else if (p.includes("sales")) setActiveMenu("sales");
    else if (p.includes("employee")) setActiveMenu("employees");
    else if (p.includes("balance")||p.includes("income")||p.includes("trial")) setActiveMenu("reports");
    else if (p.includes("weight-bridge")) setActiveMenu("weightBridge");
    else if (p.includes("cashbook")) setActiveMenu("cashbook");
    else if (p.includes("cheque-book")) setActiveMenu("chequebook");
  }, [location.pathname]);

  const closeMobile = () => { if (window.innerWidth<900) setIsOpen(false); };

  const handleLogout = () => {
    ["token","role","name","allowedRoutes","millId","businessName","logoUrl"].forEach(k=>localStorage.removeItem(k));
    navigate("/");
  };

  const [profileOpen, setProfileOpen] = React.useState(false);
  const profileRef = React.useRef(null);
  React.useEffect(() => {
    const h = e => { if (profileRef.current&&!profileRef.current.contains(e.target)) setProfileOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const pageLabel = PAGE_LABELS[location.pathname] || "";

  return (
    <div className="sl-root">
      <style>{FONTS}{CSS}</style>

      <div className={`sl-overlay${isOpen&&window.innerWidth<900?" visible":""}`} onClick={()=>setIsOpen(false)}/>

      {/* ══ SIDEBAR ══ */}
      <aside className={`sl-sidebar${isOpen?"":" closed"}`}>
        <div className="sl-brand">
          <SidebarLogo logoUrl={millLogoUrl} name={businessName}/>
          <div className="sl-brand-text">
            <div className="sl-brand-title">{businessName}</div>
            <div className="sl-brand-role">{role} Panel</div>
          </div>
          <button className="sl-sidebar-close" onClick={()=>setIsOpen(false)}>{Ico.close}</button>
        </div>

        <nav className="sl-nav">
          {can("/dashboard") && (
            <Link to="/dashboard" className={`sl-direct-link${isActive("/dashboard")?" active":""}`} onClick={closeMobile}>
              <span className="sl-direct-icon">{Ico.home}</span>Dashboard
            </Link>
          )}

          {(can("/create-account")||can("/view-accounts")||can("/general-entries")) && (
            <MenuSection icon={Ico.accounts} label="Accounts" menuKey="accounts" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/create-account"  label="Add Account"     isActive={isActive("/create-account")}  hasAccess={can("/create-account")}/>
              <SubLink to="/view-accounts"   label="Accounts List"   isActive={isActive("/view-accounts")}   hasAccess={can("/view-accounts")}/>
              <SubLink to="/general-entries" label="Journal Entries" isActive={isActive("/general-entries")} hasAccess={can("/general-entries")}/>
            </MenuSection>
          )}

          {can("/products") && (
            <MenuSection icon={Ico.products} label="Products" menuKey="products" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/products" label="Products" isActive={isActive("/products")} hasAccess={can("/products")}/>
            </MenuSection>
          )}

          {(can("/add-invoice-purchase")||can("/view-purchase-invoices")) && (
            <MenuSection icon={Ico.purchase} label="Purchase" menuKey="purchase" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/add-invoice-purchase"   label="New Purchase"    isActive={isActive("/add-invoice-purchase")}   hasAccess={can("/add-invoice-purchase")}/>
              <SubLink to="/view-purchase-invoices" label="All Purchases"   isActive={isActive("/view-purchase-invoices")} hasAccess={can("/view-purchase-invoices")}/>
            </MenuSection>
          )}

          {(can("/add-invoice-sales")||can("/view-sales-invoices")) && (
            <MenuSection icon={Ico.sales} label="Sales" menuKey="sales" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/add-invoice-sales"   label="Create Invoice" isActive={isActive("/add-invoice-sales")}   hasAccess={can("/add-invoice-sales")}/>
              <SubLink to="/view-sales-invoices" label="Sales History"  isActive={isActive("/view-sales-invoices")} hasAccess={can("/view-sales-invoices")}/>
            </MenuSection>
          )}

          {(can("/employees")||can("/employees/new")) && (
            <MenuSection icon={Ico.employees} label="Employees" menuKey="employees" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/employees/new" label="New Employee"  isActive={isActive("/employees/new")} hasAccess={can("/employees/new")}/>
              <SubLink to="/employees"     label="All Employees" isActive={isActive("/employees")}     hasAccess={can("/employees")}/>
            </MenuSection>
          )}

          {(can("/trialbalance")||can("/balancesheet")||can("/incomestatement")) && (
            <MenuSection icon={Ico.reports} label="Reports" menuKey="reports" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/trialbalance"    label="Trial Balance"    isActive={isActive("/trialbalance")}    hasAccess={can("/trialbalance")}/>
              <SubLink to="/balancesheet"    label="Balance Sheet"    isActive={isActive("/balancesheet")}    hasAccess={can("/balancesheet")}/>
              <SubLink to="/incomestatement" label="Income Statement" isActive={isActive("/incomestatement")} hasAccess={can("/incomestatement")}/>
            </MenuSection>
          )}

          {(can("/weight-bridge")||can("/weight-bridge/invoices")) && (
            <MenuSection icon={Ico.weight} label="Weight Bridge" menuKey="weightBridge" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/weight-bridge"          label="WB Entry"    isActive={isActive("/weight-bridge")}          hasAccess={can("/weight-bridge")}/>
              <SubLink to="/weight-bridge/invoices" label="WB Invoices" isActive={isActive("/weight-bridge/invoices")} hasAccess={can("/weight-bridge/invoices")}/>
            </MenuSection>
          )}

          {(can("/cashbook")||can("/cashbook-report")) && (
            <MenuSection icon={Ico.cashbook} label="Cashbook" menuKey="cashbook" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/cashbook"        label="New Entry"      isActive={isActive("/cashbook")}        hasAccess={can("/cashbook")}/>
              <SubLink to="/cashbook-report" label="Daily Cashbook" isActive={isActive("/cashbook-report")} hasAccess={can("/cashbook-report")}/>
            </MenuSection>
          )}

          {can("/stock") && (
            <Link to="/stock" className={`sl-direct-link${isActive("/stock")?" active":""}`} onClick={closeMobile}>
              <span className="sl-direct-icon">{Ico.stock}</span>Stock Ledger
            </Link>
          )}

          <MenuSection icon={Ico.cheque} label="Cheque Book" menuKey="chequebook" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
            <SubLink to="/cheque-book/create" label="Create Book"  isActive={isActive("/cheque-book/create")} hasAccess={true}/>
            <SubLink to="/cheque-book/entry"  label="Issue Cheque" isActive={isActive("/cheque-book/entry")}  hasAccess={true}/>
            <SubLink to="/cheque-book/view"   label="View All"     isActive={isActive("/cheque-book/view")}   hasAccess={true}/>
          </MenuSection>
        </nav>

        <div className="sl-sidebar-foot">
          <div className="sl-user-chip">
            <div className="sl-user-avatar">{initials(name)}</div>
            <div className="sl-user-info">
              <div className="sl-user-name">{name}</div>
              <div className="sl-user-role">{role}</div>
            </div>
            <div style={{display:"flex",gap:4}}>
              {isAdmin && (
                <button onClick={()=>{navigate("/profile");closeMobile();}} title="Profile"
                  style={{padding:5,borderRadius:6,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.05)",cursor:"pointer",display:"flex",alignItems:"center",color:"rgba(255,255,255,.4)",transition:".15s"}}>
                  <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </button>
              )}
              <button className="sl-user-logout" onClick={handleLogout} title="Logout">
                <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ══ MAIN ══ */}
      <div className={`sl-main-wrap${isOpen?" sidebar-open":""}`}>
        <header className="sl-topbar">
          <div className="sl-topbar-left">
            <button className="sl-hamburger" onClick={()=>setIsOpen(o=>!o)}>{Ico.menu}</button>
            {location.pathname!=="/dashboard" && (
              <button className="sl-back-btn" onClick={()=>navigate(-1)}>{Ico.back}</button>
            )}
            <div className="sl-company-pill">
              <MillLogo logoUrl={millLogoUrl} name={businessName}/>
              <span className="sl-company-name">{businessName}</span>
            </div>
            {pageLabel && <>
              <span className="sl-topbar-sep">·</span>
              <span className="sl-topbar-title">{pageLabel}</span>
            </>}
          </div>

          <div className="sl-topbar-right">
            <span className="sl-welcome">{getGreeting()}, <strong>{name}</strong></span>
            <div ref={profileRef} style={{position:"relative"}}>
              <button onClick={()=>setProfileOpen(o=>!o)}
                style={{width:32,height:32,borderRadius:"50%",border:"2px solid #e5e7eb",background:"#065f46",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff",transition:".15s",flexShrink:0}}>
                {initials(name)}
              </button>
              {profileOpen && (
                <div style={{position:"absolute",right:0,top:"calc(100% + 6px)",width:180,zIndex:200,background:"#fff",border:"1px solid #e5e7eb",borderRadius:10,boxShadow:"0 8px 24px rgba(0,0,0,.1)",overflow:"hidden"}}>
                  <div style={{padding:"10px 14px 8px",borderBottom:"1px solid #f3f4f6"}}>
                    <div style={{fontSize:12.5,fontWeight:700,color:"#111827"}}>{name}</div>
                    <div style={{fontSize:11,color:"#6b7280"}}>{role}</div>
                  </div>
                  {isAdmin && (
                    <button onClick={()=>{navigate("/profile");setProfileOpen(false);}}
                      style={{width:"100%",padding:"9px 14px",background:"none",border:"none",textAlign:"left",fontSize:13,color:"#1f2937",cursor:"pointer",display:"flex",alignItems:"center",gap:8,fontWeight:500}}
                      onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"}
                      onMouseLeave={e=>e.currentTarget.style.background="none"}>
                      <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#065f46" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                      My Profile
                    </button>
                  )}
                  <button onClick={handleLogout}
                    style={{width:"100%",padding:"9px 14px",background:"none",border:"none",borderTop:"1px solid #f3f4f6",textAlign:"left",fontSize:13,color:"#dc2626",cursor:"pointer",display:"flex",alignItems:"center",gap:8,fontWeight:500}}
                    onMouseEnter={e=>e.currentTarget.style.background="#fef2f2"}
                    onMouseLeave={e=>e.currentTarget.style.background="none"}>
                    <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    Sign Out
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