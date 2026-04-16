import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../config/API_BASE_URL.js";

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
  position: fixed; top: 0; left: 0; height: 100vh; width: 252px;
  background: #0d1117;
  display: flex; flex-direction: column;
  z-index: 50;
  transition: transform .25s cubic-bezier(.4,0,.2,1);
  border-right: 1px solid rgba(255,255,255,.07);
  box-shadow: 4px 0 28px rgba(0,0,0,.45);
}
.sl-sidebar.closed { transform: translateX(-100%); }

/* ── Brand ── */
.sl-brand {
  height: 70px; flex-shrink: 0;
  display: flex; align-items: center; gap: 11px;
  padding: 0 14px 0 13px;
  border-bottom: 1px solid rgba(255,255,255,.08);
  background: linear-gradient(135deg, #0d1117 60%, #111827 100%);
}
.sl-brand-logo {
  width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
  object-fit: cover;
  border: 1.5px solid rgba(255,255,255,.15);
  box-shadow: 0 2px 12px rgba(0,0,0,.4);
}
.sl-brand-logo-fb {
  width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
  background: #1f2937; border: 1.5px solid rgba(255,255,255,.1);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 800; color: #4ade80;
  box-shadow: 0 2px 12px rgba(0,0,0,.4);
}
.sl-wordmark {
  flex: 1; display: flex; align-items: baseline; gap: 0;
  font-size: 17px; font-weight: 800; letter-spacing: -.3px;
  line-height: 1; user-select: none;
}
.sl-wordmark-agro { color: #ffffff; }
.sl-wordmark-p    { color: #4ade80; }
.sl-wordmark-lus  { color: #e5e7eb; }
.sl-wordmark-plus { color: #4ade80; font-size: 20px; }
.sl-sidebar-close {
  margin-left: auto; flex-shrink: 0;
  background: rgba(255,255,255,.07); border: none; border-radius: 6px;
  width: 26px; height: 26px; display: none;
  align-items: center; justify-content: center;
  cursor: pointer; color: rgba(255,255,255,.4); transition: all .12s;
}
.sl-sidebar-close:hover { background: rgba(255,255,255,.14); color: #fff; }

/* ── Nav ── */
.sl-nav {
  flex: 1; overflow-y: auto; overflow-x: hidden;
  padding: 8px 8px 14px;
  scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.06) transparent;
}
.sl-nav::-webkit-scrollbar { width: 3px; }
.sl-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,.07); border-radius: 3px; }

.sl-section-lbl {
  font-size: 8.5px; font-weight: 700; letter-spacing: .13em;
  text-transform: uppercase; color: rgba(255,255,255,.18);
  padding: 14px 10px 4px; user-select: none;
}

/* ── Section toggle button ── */
.sl-menu-btn {
  width: 100%; display: flex; align-items: center; gap: 9px;
  padding: 7.5px 9px; border-radius: 6px; border: none; cursor: pointer;
  background: transparent; color: rgba(255,255,255,.5);
  font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600;
  transition: all .12s; text-align: left;
}
.sl-menu-btn:hover { background: rgba(255,255,255,.07); color: rgba(255,255,255,.85); }
.sl-menu-btn.open {
  background: rgba(74,222,128,.1);
  color: #ffffff;
  border-left: 2.5px solid #4ade80;
  padding-left: 6.5px;
}
.sl-menu-icon {
  width: 24px; height: 24px; border-radius: 5px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,.05);
  color: rgba(255,255,255,.45);
}
.sl-menu-btn.open .sl-menu-icon  { background: rgba(74,222,128,.15); color: #4ade80; }
.sl-menu-btn:hover .sl-menu-icon { color: rgba(255,255,255,.8); }
.sl-menu-label   { flex: 1; }
.sl-menu-chevron { flex-shrink: 0; transition: transform .18s; color: rgba(255,255,255,.2); }
.sl-menu-btn.open .sl-menu-chevron { transform: rotate(180deg); color: rgba(74,222,128,.6); }

/* ── Sub-links ── */
.sl-sub { overflow: hidden; transition: max-height .2s cubic-bezier(.4,0,.2,1), opacity .16s; max-height: 0; opacity: 0; }
.sl-sub.open { max-height: 500px; opacity: 1; }
.sl-sub-inner {
  padding: 3px 0 4px 11px;
  display: flex; flex-direction: column; gap: 1px;
  border-left: 1.5px solid rgba(74,222,128,.18);
  margin-left: 20px;
}
.sl-sub-link {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 10px; border-radius: 5px;
  font-size: 12px; font-weight: 500;
  color: rgba(255,255,255,.45); text-decoration: none; transition: all .1s;
}
.sl-sub-link:hover { background: rgba(255,255,255,.07); color: rgba(255,255,255,.9); }
.sl-sub-link.active {
  background: rgba(74,222,128,.14);
  color: #4ade80; font-weight: 700;
  border-left: 2px solid #4ade80;
  padding-left: 8px;
}
.sl-sub-link.soon { opacity: .35; cursor: default; }
.sl-sub-link.soon:hover { background: transparent; color: rgba(255,255,255,.35); }

/* sub-link dot */
.sl-sub-dot {
  width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
  background: rgba(255,255,255,.2); transition: background .1s;
}
.sl-sub-link.active .sl-sub-dot { background: #4ade80; }
.sl-sub-link:hover .sl-sub-dot  { background: rgba(255,255,255,.6); }

/* ── Direct link ── */
.sl-direct-link {
  display: flex; align-items: center; gap: 9px;
  padding: 7.5px 9px; border-radius: 6px;
  font-size: 12.5px; font-weight: 600;
  color: rgba(255,255,255,.5); text-decoration: none; transition: all .12s;
}
.sl-direct-link:hover { background: rgba(255,255,255,.07); color: rgba(255,255,255,.85); }
.sl-direct-link.active {
  background: rgba(74,222,128,.12); color: #4ade80; font-weight: 700;
  border-left: 2.5px solid #4ade80; padding-left: 6.5px;
}
.sl-direct-icon {
  width: 24px; height: 24px; border-radius: 5px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,.05);
}
.sl-direct-link.active .sl-direct-icon { background: rgba(74,222,128,.15); color: #4ade80; }

/* ── Language selector ── */
.sl-lang-wrap { position: relative; }
.sl-lang-btn {
  width: 100%; display: flex; align-items: center; gap: 9px;
  padding: 7px 9px; border-radius: 6px; border: none; cursor: pointer;
  background: transparent; color: rgba(255,255,255,.5);
  font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500;
  transition: all .12s;
}
.sl-lang-btn:hover { background: rgba(255,255,255,.07); color: rgba(255,255,255,.85); }
.sl-lang-panel {
  position: absolute; bottom: calc(100% + 6px); left: 0; right: 0;
  background: #1a2332; border: 1px solid rgba(255,255,255,.12);
  border-radius: 9px; overflow: hidden;
  box-shadow: 0 -12px 32px rgba(0,0,0,.5); z-index: 100;
}
.sl-lang-item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 13px; cursor: pointer; font-size: 13px;
  color: rgba(255,255,255,.6); transition: background .08s;
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.sl-lang-item:last-child { border-bottom: none; }
.sl-lang-item:hover { background: rgba(255,255,255,.07); color: #fff; }
.sl-lang-item.active { color: #4ade80; font-weight: 700; background: rgba(74,222,128,.08); }

/* ── Install button ── */
.sl-install-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 10px; border-radius: 7px; cursor: pointer;
  background: rgba(74,222,128,.08); color: rgba(74,222,128,.9);
  font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600;
  transition: all .12s; width: 100%; margin-bottom: 4px;
  border: 1px solid rgba(74,222,128,.18);
}
.sl-install-btn:hover { background: rgba(74,222,128,.16); border-color: rgba(74,222,128,.35); }

/* ── Footer / user chip ── */
.sl-sidebar-foot {
  padding: 8px 8px 10px;
  border-top: 1px solid rgba(255,255,255,.07); flex-shrink: 0;
}
.sl-user-chip {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 9px; border-radius: 7px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.07);
  margin-top: 6px;
}
.sl-user-avatar {
  width: 30px; height: 30px; border-radius: 7px; flex-shrink: 0;
  background: #1f2937; border: 1px solid rgba(255,255,255,.12);
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700; color: #4ade80;
  overflow: hidden;
}
.sl-user-info { flex: 1; overflow: hidden; }
.sl-user-name { font-size: 12px; font-weight: 600; color: rgba(255,255,255,.85); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sl-user-role { font-size: 9px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: rgba(255,255,255,.25); margin-top: 1px; }
.sl-user-logout {
  flex-shrink: 0; width: 25px; height: 25px; border-radius: 5px;
  background: rgba(239,68,68,.09); border: 1px solid rgba(239,68,68,.15);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: rgba(239,68,68,.55); transition: all .12s;
}
.sl-user-logout:hover { background: rgba(239,68,68,.18); color: #ef4444; }
.sl-profile-btn {
  flex-shrink: 0; width: 25px; height: 25px; border-radius: 5px;
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
  box-shadow: 0 1px 3px rgba(0,0,0,.06); flex-shrink: 0;
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
.sl-topbar-title { font-size: 13px; font-weight: 600; color: #6b7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px; }
.sl-topbar-sep   { color: #d1d5db; font-size: 14px; user-select: none; }

/* ── Topbar company pill ── */
.sl-company-pill {
  display: flex; align-items: center; gap: 8px;
  padding: 5px 10px; border-radius: 7px;
  background: #f3f4f6; border: 1px solid #e5e7eb;
}
.sl-company-logo    { width: 20px; height: 20px; border-radius: 4px; object-fit: cover; flex-shrink: 0; border: 1px solid #e5e7eb; }
.sl-company-logo-fb {
  width: 20px; height: 20px; border-radius: 4px; flex-shrink: 0;
  background: #111827; display: flex; align-items: center; justify-content: center;
  font-size: 7.5px; font-weight: 800; color: #4ade80;
}
.sl-company-name { font-size: 12.5px; font-weight: 700; color: #111827; white-space: nowrap; letter-spacing: -.1px; }
.sl-welcome      { font-size: 12px; color: #6b7280; font-weight: 500; white-space: nowrap; }
.sl-welcome strong { color: #111827; font-weight: 700; }

/* ══ MAIN ══ */
.sl-main-wrap { flex: 1; display: flex; flex-direction: column; transition: margin-left .25s cubic-bezier(.4,0,.2,1); min-width: 0; }
.sl-main-wrap.sidebar-open { margin-left: 252px; }
.sl-content { flex: 1; padding: 24px; }
.sl-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 49; }
.sl-overlay.visible { display: block; }

.sl-soon-badge {
  font-size: 8px; font-weight: 700; padding: 1px 5px; border-radius: 3px;
  background: rgba(255,255,255,.07); color: rgba(255,255,255,.25);
  letter-spacing: .06em; text-transform: uppercase; margin-left: auto;
}

/* ── Profile lightbox ── */
.sl-lightbox {
  position: fixed; inset: 0; background: rgba(0,0,0,.88);
  display: flex; align-items: center; justify-content: center;
  z-index: 1200; cursor: zoom-out;
}
@keyframes sl-lb-in { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }
.sl-lightbox-inner {
  position: relative; animation: sl-lb-in .18s ease-out;
}

/* ── Google Translate suppression ── */
.goog-te-banner-frame.skiptranslate, iframe.goog-te-banner-frame { display:none!important; }
body { top: 0!important; }
#gt-element { position:absolute; left:-9999px; top:-9999px; visibility:hidden; }

@media (max-width: 900px) {
  .sl-main-wrap.sidebar-open { margin-left: 0!important; }
  .sl-sidebar-close { display: flex!important; }
  .sl-topbar-title  { display: none; }
  .sl-topbar-sep    { display: none; }
  .sl-company-name  { display: none; }
  .sl-welcome       { display: none; }
}
@media (max-width: 500px) { .sl-content { padding: 14px; } }
`;

/* ── Page labels ── */
const PAGE_LABELS = {
  "/dashboard":"Dashboard",
  "/create-account":"Add Account","/view-accounts":"Chart of Accounts",
  "/general-entries":"Journal Entries","/cashbook":"Cashbook Entry","/cashbook-report":"Daily Cashbook",
  "/cheque-book/create":"Create Cheque Book","/cheque-book/entry":"Issue Cheque","/cheque-book/view":"Cheque Management",
  "/add-invoice-purchase":"New Purchase","/view-purchase-invoices":"All Purchases",
  "/purchase-quotation":"Purchase Quotations",
  "/sales-quotation":   "Sales Quotations",
  "/add-invoice-sales":"Create Invoice","/view-sales-invoices":"Sales History",
  "/products":"Products","/stock":"Inventory",
  "/weight-bridge":"Weight Bridge","/weight-bridge/invoices":"WB Invoices",
  "/employees/new":"New Employee","/employees":"All Employees",
  "/trialbalance":"Trial Balance","/balancesheet":"Balance Sheet","/incomestatement":"Income Statement",
  "/profile":"My Profile","/ledger":"Ledger",
};

const LANGS = [
  { code:"en", native:"English",  flag:"🇬🇧" },
  { code:"ur", native:"اردو",     flag:"🇵🇰" },
  { code:"hi", native:"हिन्दी",   flag:"🇮🇳" },
];

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
  globe:    <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx={12} cy={12} r={10}/><path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  install:  <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>,
  profile:  <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>,
  logout:   <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>,
  expand:   <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>,
};

const initials    = n => (n||"U").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
const getGreeting = () => { const h=new Date().getHours(); return h<12?"Good morning":h<17?"Good afternoon":h<21?"Good evening":"Good night"; };

// ── Google Translate ─────────────────────────────────────────────────────────
// Strategy: cookie + reload only. Never manipulate the DOM post-load.
// This avoids React reconciliation conflicts that cause white screens.
//
// How it works:
//   - Set `googtrans=/en/{code}` cookie → reload → GT auto-translates on load
//   - Clear cookie → reload → no translation
//
// The hidden #gt-element div is still needed for GT to initialise its widget.

let _gtScriptLoaded = false;

function clearGTCookies() {
  const host = window.location.hostname;
  const domains = ['', host, '.' + host, host.replace(/^www\./, '.')];
  domains.forEach(d => {
    const domainPart = d ? `; domain=${d}` : '';
    document.cookie = `googtrans=; path=/${domainPart}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    document.cookie = `googtrans=; path=${domainPart}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  });
}

function setGTCookie(code) {
  const host = window.location.hostname;
  document.cookie = `googtrans=/en/${code}; path=/`;
  document.cookie = `googtrans=/en/${code}; path=/; domain=.${host}`;
}

function injectGTSuppressCSS() {
  if (document.getElementById('gt-suppress-style')) return;
  const s = document.createElement('style');
  s.id = 'gt-suppress-style';
  s.textContent = [
    '.goog-te-banner-frame{display:none!important}',
    'iframe.goog-te-banner-frame{display:none!important}',
    'iframe.skiptranslate{display:none!important}',
    '.goog-te-menu-frame{display:none!important}',
    '#goog-gt-tt{display:none!important}',
    '.goog-tooltip{display:none!important}',
    '.goog-text-highlight{background:none!important;box-shadow:none!important}',
    'body{top:0!important}',
  ].join(' ');
  document.head.appendChild(s);
}

function watchBodyTop() {
  if (window.__slBodyWatcher) return;
  window.__slBodyWatcher = setInterval(() => {
    if (document.body?.style?.top && document.body.style.top !== '0px') {
      document.body.style.setProperty('top', '0', 'important');
    }
  }, 400);
}

function loadGT() {
  if (_gtScriptLoaded) return;
  _gtScriptLoaded = true;
  injectGTSuppressCSS();
  watchBodyTop();
  window.googleTranslateElementInit = () => {
    if (!window.google?.translate?.TranslateElement) return;
    new window.google.translate.TranslateElement(
      { pageLanguage: 'en', includedLanguages: 'en,ur,hi', autoDisplay: false },
      'gt-element'
    );
    injectGTSuppressCSS();
    watchBodyTop();
  };
  if (!document.getElementById('gt-script')) {
    const sc = document.createElement('script');
    sc.id    = 'gt-script';
    sc.src   = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    sc.async = true;
    sc.onerror = () => { _gtScriptLoaded = false; }; // allow retry if network fails
    document.body.appendChild(sc);
  }
}

// ── The ONLY language switch function used anywhere ───────────────────────────
// For ALL languages (including English): cookie manipulation + reload.
// This is the only approach that reliably avoids DOM conflicts in React.
function switchLang(code) {
  clearGTCookies();
  localStorage.setItem('ap-lang', code);
  if (code !== 'en') setGTCookie(code);
  // 60ms: enough for cookie writes to flush, no noticeable delay to the user
  setTimeout(() => window.location.reload(), 60);
}
// ── Company logo ──────────────────────────────────────────────────────────────
function CompanyLogo({ businessName, size = 20 }) {
  const logoUrl = localStorage.getItem("logoUrl") || "";
  const [err, setErr] = useState(false);
  const fb = (businessName||"A").slice(0,2).toUpperCase();
  if (logoUrl && !err)
    return <img src={logoUrl} alt={businessName} onError={()=>setErr(true)} style={{ width:size, height:size, borderRadius:4, objectFit:"cover", border:"1px solid #e5e7eb", flexShrink:0 }}/>;
  return <div style={{ width:size, height:size, borderRadius:4, background:"#111827", display:"flex", alignItems:"center", justifyContent:"center", fontSize:Math.round(size*.38), fontWeight:800, color:"#4ade80", flexShrink:0 }}>{fb}</div>;
}

function BrandLogo() {
  const [err, setErr] = useState(false);
  if (!err) return <img src="/logo.png" alt="AgroPlus+" className="sl-brand-logo" onError={()=>setErr(true)}/>;
  return <div className="sl-brand-logo-fb">A+</div>;
}

// ── Admin pic hook ────────────────────────────────────────────────────────────
function useAdminPic() {
  const [pic, setPic] = useState(() => localStorage.getItem("adminPic") || "");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(`${API_BASE_URL}/profile`, { headers:{ Authorization:`Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        const p = d?.profile || d;
        const url = p?.profilePic || p?.avatarUrl || p?.adminProfilePic || "";
        if (url) { setPic(url); localStorage.setItem("adminPic", url); }
      }).catch(() => {});
  }, []);
  return pic;
}

function SidebarAvatar({ name }) {
  const pic = useAdminPic();
  const [err, setErr] = useState(false);
  if (pic && !err)
    return <div className="sl-user-avatar"><img src={pic} alt={name} onError={()=>setErr(true)} style={{ width:"100%", height:"100%", objectFit:"cover" }}/></div>;
  return <div className="sl-user-avatar">{initials(name)}</div>;
}

function TopbarAvatar({ name, onClick }) {
  const pic = useAdminPic();
  const [err, setErr] = useState(false);
  if (pic && !err)
    return (
      <button onClick={onClick} title="View profile"
        style={{ width:32, height:32, borderRadius:"50%", border:"2px solid #e5e7eb", background:"#1f2937", cursor:"pointer", flexShrink:0, overflow:"hidden", padding:0 }}>
        <img src={pic} alt={name} onError={()=>setErr(true)} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
      </button>
    );
  return (
    <button onClick={onClick} title={name}
      style={{ width:32, height:32, borderRadius:"50%", border:"2px solid #e5e7eb", background:"#111827", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:"#4ade80", transition:".12s", flexShrink:0 }}>
      {initials(name)}
    </button>
  );
}

// ── Wordmark — AgroPlus+ only, no mill name ───────────────────────────────────
function Wordmark() {
  return (
    <div className="sl-wordmark">
      <span className="sl-wordmark-agro">Agro</span>
      <span className="sl-wordmark-p">P</span>
      <span className="sl-wordmark-lus">lus</span>
      <span className="sl-wordmark-plus">+</span>
    </div>
  );
}

// ── Language selector ─────────────────────────────────────────────────────────
function LangSelector() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(() => localStorage.getItem("ap-lang") || "en");
  const ref = useRef(null);
  const cur = LANGS.find(l => l.code === lang) || LANGS[0];

  useEffect(() => { loadGT(); }, []);

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const select = code => { setLang(code); setOpen(false); switchLang(code); };

  return (
    <div ref={ref} className="sl-lang-wrap">
      {open && (
        <div className="sl-lang-panel">
          {LANGS.map(l => (
            <div key={l.code} className={`sl-lang-item${lang===l.code?" active":""}`} onClick={()=>select(l.code)}>
              <span style={{ fontSize:17 }}>{l.flag}</span>
              <span style={{ flex:1, fontSize:13, fontWeight:lang===l.code?700:500 }}>{l.native}</span>
              {lang===l.code && <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="#4ade80" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
            </div>
          ))}
        </div>
      )}
      <button className="sl-lang-btn" onClick={()=>setOpen(o=>!o)}>
        <span className="sl-menu-icon" style={{ fontSize:14 }}>{cur.flag}</span>
        <span style={{ flex:1 }}>{cur.native}</span>
        <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,.25)" strokeWidth={2.5} style={{ flexShrink:0, transition:".12s", transform:open?"rotate(180deg)":"none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      <div id="gt-element"/>
    </div>
  );
}

// ── Collapsible menu section ──────────────────────────────────────────────────
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

function SubLink({ to, label, isActive, hasAccess, soon }) {
  if (!hasAccess) return null;
  if (soon) return (
    <span className="sl-sub-link soon">
      <span className="sl-sub-dot"/>
      {label}
      <span className="sl-soon-badge">soon</span>
    </span>
  );
  return (
    <Link to={to} className={`sl-sub-link${isActive?" active":""}`}>
      <span className="sl-sub-dot"/>
      {label}
    </Link>
  );
}

// ── PWA Install — module-level event capture ─────────────────────────────────
// beforeinstallprompt fires ONCE, early in page lifecycle.
// Must be captured at module scope — not inside a component — or it's lost.
let _deferredInstallPrompt = null;
let _pwaInstalled = (
  typeof window !== 'undefined' && (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator?.standalone === true
  )
);

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    _deferredInstallPrompt = e;
    window.dispatchEvent(new Event('pwa-install-ready'));
  });
  window.addEventListener('appinstalled', () => {
    _deferredInstallPrompt = null;
    _pwaInstalled = true;
    window.dispatchEvent(new Event('pwa-installed'));
  });
}

function InstallButton() {
  const [available, setAvailable] = React.useState(() => !!_deferredInstallPrompt);
  const [installed, setInstalled] = React.useState(() => _pwaInstalled);

  React.useEffect(() => {
    if (installed) return;
    const onReady     = () => setAvailable(true);
    const onInstalled = () => { setAvailable(false); setInstalled(true); };
    window.addEventListener('pwa-install-ready', onReady);
    window.addEventListener('pwa-installed',     onInstalled);
    // Pick up a prompt that fired before this component mounted
    if (_deferredInstallPrompt) setAvailable(true);
    return () => {
      window.removeEventListener('pwa-install-ready', onReady);
      window.removeEventListener('pwa-installed',     onInstalled);
    };
  }, [installed]);

  if (installed || !available) return null;

  const install = async () => {
    if (!_deferredInstallPrompt) return;
    _deferredInstallPrompt.prompt();
    const { outcome } = await _deferredInstallPrompt.userChoice;
    if (outcome === 'accepted') {
      _deferredInstallPrompt = null;
      setAvailable(false);
      setInstalled(true);
    }
  };

  return (
    <button className="sl-install-btn" onClick={install} title="Install Agro Plus as an app">
      <span className="sl-menu-icon" style={{ background:"rgba(74,222,128,.12)", color:"#4ade80" }}>{Ico.install}</span>
      <span style={{ flex:1 }}>Install App</span>
    </button>
  );
}
// ── Profile lightbox ──────────────────────────────────────────────────────────
function ProfileLightbox({ src, name, onClose }) {
  useEffect(() => {
    const h = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div className="sl-lightbox" onClick={onClose}>
      <div className="sl-lightbox-inner" onClick={e=>e.stopPropagation()}>
        <img src={src} alt={name}
          style={{ maxWidth:"min(380px, 88vw)", maxHeight:"88vh", borderRadius:16, objectFit:"cover", display:"block", boxShadow:"0 24px 80px rgba(0,0,0,.7)", border:"2.5px solid rgba(255,255,255,.15)" }}/>
        <div style={{ position:"absolute", top:-10, right:-10 }}>
          <button onClick={onClose}
            style={{ width:30, height:30, borderRadius:"50%", background:"rgba(255,255,255,.15)", border:"1px solid rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#fff" }}>
            {Ico.close}
          </button>
        </div>
        <div style={{ position:"absolute", bottom:-30, left:0, right:0, textAlign:"center" }}>
          <span style={{ fontSize:12, color:"rgba(255,255,255,.4)" }}>Click anywhere or Esc to close</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function SidebarLayout({ children }) {
  const [isOpen,      setIsOpen]     = useState(true);
  const [activeMenu,  setActiveMenu] = useState("");
  const [profileOpen, setProfileOpen]= useState(false);
  const [picLightbox, setPicLightbox]= useState(false);
  const location   = useLocation();
  const navigate   = useNavigate();
  const profileRef = useRef(null);
  const adminPic   = useAdminPic();

  const role         = localStorage.getItem("role")         || "Admin";
  const name         = localStorage.getItem("name")         || "User";
  const businessName = localStorage.getItem("businessName") || "Agro Plus";
  const isAdmin      = role === "Admin";

  const allowedRoutes = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem("allowedRoutes")) || []; } catch { return []; }
  }, []);

  const can = React.useCallback(path => {
    if (!allowedRoutes?.length) return true;
    if (allowedRoutes.includes("*")) return true;
    return allowedRoutes.some(r => r === path || path.startsWith(r.replace("/*", "")));
  }, [allowedRoutes]);

  const isAt = path => location.pathname === path;

  useEffect(() => {
    const p = location.pathname;
    if (p === "/dashboard") setActiveMenu("dashboard");
    else if (p.includes("account") || p.includes("ledger")) setActiveMenu("accounts");
    else if (p.includes("cashbook") || p.includes("general-entries")) setActiveMenu("cash");
    else if (p.includes("cheque") || p.includes("bank")) setActiveMenu("bank");
    else if (p.includes("sales-quotation"))                    setActiveMenu("sales");
    else if (p.includes("purchase") || p.includes("quotation")) setActiveMenu("purchase");
    else if (p.includes("sales") || p.includes("sales-invoices")) setActiveMenu("sales");
    else if (p.includes("product") || p.includes("stock")) setActiveMenu("products");
    else if (p.includes("weight-bridge")) setActiveMenu("weight");
    else if (p.includes("employee")) setActiveMenu("employees");
    else if (p.includes("balance") || p.includes("income") || p.includes("trial")) setActiveMenu("reports");
  }, [location.pathname]);

  useEffect(() => {
    const h = e => { if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const closeMobile = () => { if (window.innerWidth < 900) setIsOpen(false); };

  const handleLogout = () => {
    ["token","role","name","allowedRoutes","millId","businessName","logoUrl","adminPic"].forEach(k => localStorage.removeItem(k));
    navigate("/");
  };

  const pageLabel = PAGE_LABELS[location.pathname] || "";

  // Avatar click → always opens dropdown
  const handleAvatarClick = () => setProfileOpen(o => !o);

  return (
    <div className="sl-root">
      <style>{FONTS}{CSS}</style>

      <div className={`sl-overlay${isOpen && window.innerWidth < 900 ? " visible" : ""}`} onClick={()=>setIsOpen(false)}/>

      {/* ══ SIDEBAR ══ */}
      <aside className={`sl-sidebar${isOpen?"":" closed"}`}>

        {/* Brand — AgroPlus+ only */}
        <div className="sl-brand">
          <BrandLogo/>
          <Wordmark/>
          <button className="sl-sidebar-close" onClick={()=>setIsOpen(false)}>{Ico.close}</button>
        </div>

        <nav className="sl-nav">
          {can("/dashboard") && (
            <Link to="/dashboard" className={`sl-direct-link${isAt("/dashboard")?" active":""}`} onClick={closeMobile}>
              <span className="sl-direct-icon">{Ico.home}</span>Dashboard
            </Link>
          )}

          {(can("/create-account") || can("/view-accounts")) && (
            <MenuSection icon={Ico.accounts} label="Accounts" menuKey="accounts" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/create-account" label="Add Account"       isActive={isAt("/create-account")} hasAccess={can("/create-account")}/>
              <SubLink to="/view-accounts"  label="Chart of Accounts" isActive={isAt("/view-accounts")}  hasAccess={can("/view-accounts")}/>
            </MenuSection>
          )}

          {(can("/general-entries") || can("/cashbook") || can("/cashbook-report")) && (
            <MenuSection icon={Ico.cash} label="Cash Management" menuKey="cash" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/general-entries" label="Journal Entries" isActive={isAt("/general-entries")} hasAccess={can("/general-entries")}/>
              <SubLink to="/cashbook"        label="Cashbook Entry"  isActive={isAt("/cashbook")}        hasAccess={can("/cashbook")}/>
              <SubLink to="#"                label="Fund Transfer"   isActive={false}                    hasAccess={true} soon/>
              <SubLink to="/cashbook-report" label="Daily Cashbook"  isActive={isAt("/cashbook-report")} hasAccess={can("/cashbook-report")}/>
            </MenuSection>
          )}

          <MenuSection icon={Ico.bank} label="Bank Management" menuKey="bank" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
            <SubLink to="#"                   label="Add Bank Account"    isActive={false}                       hasAccess={true} soon/>
            <SubLink to="/cheque-book/create" label="Create Cheque Book"  isActive={isAt("/cheque-book/create")} hasAccess={true}/>
            <SubLink to="/cheque-book/entry"  label="Issue Cheque"        isActive={isAt("/cheque-book/entry")}  hasAccess={true}/>
            <SubLink to="/cheque-book/view"   label="Cheque Management"   isActive={isAt("/cheque-book/view")}   hasAccess={true}/>
            <SubLink to="#"                   label="Bank Reconciliation" isActive={false}                       hasAccess={true} soon/>
          </MenuSection>

          {(can("/add-invoice-purchase") || can("/view-purchase-invoices") || can("/purchase-quotation")) && (
            <MenuSection icon={Ico.purchase} label="Purchase" menuKey="purchase" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/add-invoice-purchase"   label="New Purchase Order"   isActive={isAt("/add-invoice-purchase")}   hasAccess={can("/add-invoice-purchase")}/>
              <SubLink to="/view-purchase-invoices" label="All Purchases"        isActive={isAt("/view-purchase-invoices")} hasAccess={can("/view-purchase-invoices")}/>
              <SubLink to="/purchase-quotation"     label="Purchase Quotations"  isActive={isAt("/purchase-quotation")}     hasAccess={true}/>
            </MenuSection>
          )}

          {(can("/add-invoice-sales") || can("/view-sales-invoices") || can("/sales-quotation")) && (
            <MenuSection icon={Ico.sales} label="Sales" menuKey="sales" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/add-invoice-sales"   label="Create Invoice"    isActive={isAt("/add-invoice-sales")}   hasAccess={can("/add-invoice-sales")}/>
              <SubLink to="/view-sales-invoices" label="Sales History"     isActive={isAt("/view-sales-invoices")} hasAccess={can("/view-sales-invoices")}/>
              <SubLink to="/sales-quotation"     label="Sales Quotations"  isActive={isAt("/sales-quotation")}     hasAccess={true}/>
            </MenuSection>
          )}

          {(can("/products") || can("/stock")) && (
            <MenuSection icon={Ico.products} label="Products" menuKey="products" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/products" label="Products List" isActive={isAt("/products")} hasAccess={can("/products")}/>
              <SubLink to="/stock"    label="Inventory"     isActive={isAt("/stock")}    hasAccess={can("/stock")}/>
            </MenuSection>
          )}

          {(can("/weight-bridge") || can("/weight-bridge/invoices")) && (
            <MenuSection icon={Ico.weight} label="Weight Bridge" menuKey="weight" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/weight-bridge"          label="WB Entry"    isActive={isAt("/weight-bridge")}          hasAccess={can("/weight-bridge")}/>
              <SubLink to="/weight-bridge/invoices" label="WB Invoices" isActive={isAt("/weight-bridge/invoices")} hasAccess={can("/weight-bridge/invoices")}/>
            </MenuSection>
          )}

          {(can("/employees") || can("/employees/new")) && (
            <MenuSection icon={Ico.employees} label="Employees" menuKey="employees" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/employees/new" label="New Employee"  isActive={isAt("/employees/new")} hasAccess={can("/employees/new")}/>
              <SubLink to="/employees"     label="All Employees" isActive={isAt("/employees")}     hasAccess={can("/employees")}/>
            </MenuSection>
          )}

          {(can("/trialbalance") || can("/balancesheet") || can("/incomestatement")) && (
            <MenuSection icon={Ico.reports} label="Reports" menuKey="reports" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
              <SubLink to="/trialbalance"    label="Trial Balance"    isActive={isAt("/trialbalance")}    hasAccess={can("/trialbalance")}/>
              <SubLink to="/balancesheet"    label="Balance Sheet"    isActive={isAt("/balancesheet")}    hasAccess={can("/balancesheet")}/>
              <SubLink to="/incomestatement" label="Income Statement" isActive={isAt("/incomestatement")} hasAccess={can("/incomestatement")}/>
            </MenuSection>
          )}
        </nav>

        {/* Footer */}
        <div className="sl-sidebar-foot">
          <InstallButton/>
          <LangSelector/>
          <div style={{ height:1, background:"rgba(255,255,255,.06)", margin:"6px 0" }}/>
          <div className="sl-user-chip">
            <SidebarAvatar name={name}/>
            <div className="sl-user-info">
              <div className="sl-user-name">{name}</div>
              <div className="sl-user-role">{role}</div>
            </div>
            {isAdmin && (
              <button className="sl-profile-btn" title="Profile" onClick={()=>{ navigate("/profile"); closeMobile(); }}>
                {Ico.profile}
              </button>
            )}
            <button className="sl-user-logout" title="Sign Out" onClick={handleLogout}>{Ico.logout}</button>
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
            {/* Company pill — no background colour, no LIVE badge */}
            <div className="sl-company-pill">
              <CompanyLogo businessName={businessName} size={20}/>
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
              <TopbarAvatar name={name} onClick={handleAvatarClick}/>
              {profileOpen && (
                <div style={{ position:"absolute", right:0, top:"calc(100% + 6px)", width:175, zIndex:200, background:"#fff", border:"1px solid #e5e7eb", borderRadius:9, boxShadow:"0 8px 24px rgba(0,0,0,.1)", overflow:"hidden" }}>
                  <div style={{ padding:"9px 13px 7px", borderBottom:"1px solid #f3f4f6" }}>
                    {adminPic && (
                      <img src={adminPic} alt={name}
                        style={{ width:48, height:48, borderRadius:8, objectFit:"cover", marginBottom:7, border:"1px solid #e5e7eb", display:"block" }}/>
                    )}
                    <div style={{ fontSize:12.5, fontWeight:700, color:"#111827" }}>{name}</div>
                    <div style={{ fontSize:11, color:"#6b7280" }}>{role}</div>
                  </div>
                  {isAdmin && (
                    <button onClick={()=>{ navigate("/profile"); setProfileOpen(false); }}
                      style={{ width:"100%", padding:"8px 13px", background:"none", border:"none", textAlign:"left", fontSize:12.5, color:"#1f2937", cursor:"pointer", display:"flex", alignItems:"center", gap:7, fontWeight:500, fontFamily:"'DM Sans',sans-serif" }}
                      onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"}
                      onMouseLeave={e=>e.currentTarget.style.background="none"}>
                      {Ico.profile} My Profile
                    </button>
                  )}
                  <button onClick={handleLogout}
                    style={{ width:"100%", padding:"8px 13px", background:"none", border:"none", borderTop:"1px solid #f3f4f6", textAlign:"left", fontSize:12.5, color:"#dc2626", cursor:"pointer", display:"flex", alignItems:"center", gap:7, fontWeight:500, fontFamily:"'DM Sans',sans-serif" }}
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

      {picLightbox && adminPic && (
        <ProfileLightbox src={adminPic} name={name} onClose={()=>setPicLightbox(false)}/>
      )}
    </div>
  );
}