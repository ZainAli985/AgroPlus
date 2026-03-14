import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";

/* ─── Fonts ─────────────────────────────────────────────────────────────── */
const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
`;

/* ─── CSS ────────────────────────────────────────────────────────────────── */
const CSS = `
  .dbx-wrap *, .dbx-wrap *::before, .dbx-wrap *::after { box-sizing: border-box; }

  .dbx-wrap {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
    width: 100%;
    max-width: 1100px;
  }

  .dbx-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: .12em;
    text-transform: uppercase; color: #9ca3af; margin-bottom: 6px;
  }
  .dbx-title {
    font-family: 'Lora', serif; font-size: 26px; font-weight: 700;
    color: #0f172a; letter-spacing: -.3px; line-height: 1.15;
  }
  .dbx-date { font-size: 13px; color: #94a3b8; margin-top: 4px; }

  .dbx-section-lbl {
    font-size: 11px; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: #94a3b8; margin-bottom: 12px;
    display: flex; align-items: center; gap: 8px;
  }
  .dbx-section-lbl::after { content: ''; flex: 1; height: 1px; background: #f1f5f9; }

  /* stat cards */
  .dbx-stat {
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px;
    padding: 18px 20px; position: relative; overflow: hidden;
    transition: box-shadow .15s, transform .15s;
  }
  .dbx-stat:hover { box-shadow: 0 6px 20px rgba(0,0,0,.07); transform: translateY(-1px); }
  .dbx-stat::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 4px; border-radius: 14px 0 0 14px; background: var(--dbx-accent, #6366f1);
  }
  .dbx-stat-lbl {
    font-size: 10.5px; font-weight: 700; letter-spacing: .07em;
    text-transform: uppercase; color: #94a3b8; margin-bottom: 8px;
  }
  .dbx-stat-val {
    font-family: 'DM Mono', monospace; font-size: 20px; font-weight: 500;
    color: #0f172a; letter-spacing: -.4px; line-height: 1;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .dbx-stat-sub { font-size: 11.5px; color: #94a3b8; margin-top: 7px; }
  .dbx-stat-icon {
    position: absolute; right: 16px; top: 50%; transform: translateY(-50%);
    width: 36px; height: 36px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    background: var(--dbx-icon-bg, #f5f5ff); color: var(--dbx-accent, #6366f1);
    opacity: .8;
  }

  /* cash banner */
  .dbx-cash-banner {
    background: #0f172a; border-radius: 16px; padding: 22px 28px;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 14px; position: relative; overflow: hidden;
  }
  .dbx-cash-banner::before {
    content: ''; position: absolute; right: -40px; top: -40px;
    width: 180px; height: 180px; border-radius: 50%;
    background: rgba(99,102,241,.12);
  }
  .dbx-cash-banner::after {
    content: ''; position: absolute; right: 60px; bottom: -50px;
    width: 130px; height: 130px; border-radius: 50%;
    background: rgba(5,150,105,.1);
  }
  .dbx-cash-lbl {
    font-size: 11px; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: rgba(255,255,255,.45); margin-bottom: 6px;
  }
  .dbx-cash-val {
    font-family: 'DM Mono', monospace; font-size: 32px; font-weight: 500;
    color: #fff; letter-spacing: -.5px; line-height: 1;
  }
  .dbx-cash-sub { font-size: 12.5px; color: rgba(255,255,255,.4); margin-top: 6px; }
  .dbx-cash-chip {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 600;
    background: rgba(255,255,255,.1); color: rgba(255,255,255,.8);
    border: 1px solid rgba(255,255,255,.1); z-index: 1;
    font-family: 'DM Sans', sans-serif; text-decoration: none;
    transition: background .12s;
  }
  .dbx-cash-chip:hover { background: rgba(255,255,255,.18); text-decoration: none; }

  /* nav cards */
  .dbx-nav {
    display: flex; flex-direction: column; align-items: flex-start;
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 16px;
    padding: 20px 22px; text-decoration: none; position: relative;
    overflow: hidden; transition: box-shadow .15s, transform .15s, border-color .15s;
  }
  .dbx-nav:hover {
    box-shadow: 0 8px 28px rgba(0,0,0,.09); transform: translateY(-2px);
    border-color: var(--dbx-accent, #6366f1); text-decoration: none;
  }
  .dbx-nav-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    background: var(--dbx-icon-bg, #f5f5ff); color: var(--dbx-accent, #6366f1);
    margin-bottom: 14px; flex-shrink: 0; transition: background .15s, color .15s;
  }
  .dbx-nav:hover .dbx-nav-icon { background: var(--dbx-accent, #6366f1); color: #fff; }
  .dbx-nav-title { font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 3px; }
  .dbx-nav-desc  { font-size: 12px; color: #94a3b8; line-height: 1.45; }
  .dbx-nav-arrow {
    position: absolute; right: 18px; top: 50%; transform: translateY(-50%);
    color: #e2e8f0; transition: color .15s, transform .15s;
  }
  .dbx-nav:hover .dbx-nav-arrow {
    color: var(--dbx-accent, #6366f1);
    transform: translateY(-50%) translateX(2px);
  }

  /* skeleton */
  @keyframes dbx-shimmer { to { background-position: -200% 0; } }
  .dbx-sk {
    background: linear-gradient(90deg,#f1f5f9 25%,#f8fafc 50%,#f1f5f9 75%);
    background-size: 200% 100%; animation: dbx-shimmer 1.4s infinite; border-radius: 8px;
  }

  /* grids */
  .dbx-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .dbx-nav-grid   { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }

  /* empty state */
  .dbx-empty {
    padding: 56px 24px; text-align: center;
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 16px;
  }
  .dbx-empty-icon {
    width: 52px; height: 52px; border-radius: 14px; background: #f5f5ff;
    color: #a5b4fc; display: flex; align-items: center; justify-content: center;
    margin: 0 auto 12px;
  }
  .dbx-empty-title { font-size: 14px; font-weight: 700; color: #334155; margin-bottom: 4px; }
  .dbx-empty-sub   { font-size: 12.5px; color: #94a3b8; }

  @media (max-width: 1024px) { .dbx-nav-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 768px)  {
    .dbx-stats-grid { grid-template-columns: 1fr 1fr; }
    .dbx-nav-grid   { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 500px)  {
    .dbx-stats-grid { grid-template-columns: 1fr; }
    .dbx-nav-grid   { grid-template-columns: 1fr; }
    .dbx-cash-val   { font-size: 24px; }
  }
`;

/* ─── Helpers ── */
const fmtR = (v) => "Rs " + Number(v||0).toLocaleString("en-PK",{ minimumFractionDigits:0, maximumFractionDigits:0 });

/* ─── Icons ── */
const Icon = {
  sales:    <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/></svg>,
  purchase: <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
  cashbook: <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  entries:  <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>,
  addInv:   <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>,
  viewInv:  <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>,
  accounts: <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>,
  journal:  <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>,
  reports:  <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
  employees:<svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  weight:   <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>,
  product:  <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/></svg>,
  ledger:   <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>,
  arrow:    <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>,
  lock:     <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>,
};

/*
 * All possible nav cards.
 * `route`  = the string stored in employee's allowedRoutes array (from CreateEmployee)
 * `to`     = the React Router path to navigate to
 * `__admin__` = shown only to Admin role, never shown to employees regardless of routes
 *
 * API routes confirmed from router.js:
 *   GET /sales-invoice        → view sales
 *   GET /purchase-invoice     → view purchases
 *   GET /cashbook-report      → cashbook gate
 *   GET /cashbook-daily       → daily cashbook
 *   GET /weight-bridge        → weight bridge entries
 *   GET /accounts             → accounts list
 *   GET /get-journal-entries  → journal entries
 *   GET /ledger               → ledger
 *   GET /products             → products
 *   GET /trial-balance        → trial balance
 *   GET /balance-sheet        → balance sheet
 *   GET /incomestatement      → income statement
 *   GET /employees            → employees (admin only)
 */
const ALL_NAV_CARDS = [
  { route:"/view-sales-invoices",    to:"/view-sales-invoices",    title:"Sales Invoices",     desc:"Browse and manage sales records",     accent:"#059669", iconBg:"#ecfdf5", icon:"viewInv"   },
  { route:"/add-invoice-sales",      to:"/add-invoice-sales",      title:"New Sales Invoice",  desc:"Create a new sales invoice",          accent:"#0891b2", iconBg:"#ecfeff", icon:"addInv"    },
  { route:"/view-purchase-invoices", to:"/view-purchase-invoices", title:"Purchase Invoices",  desc:"Browse and manage purchase records",  accent:"#d97706", iconBg:"#fffbeb", icon:"purchase"  },
  { route:"/add-invoice-purchase",   to:"/add-invoice-purchase",   title:"New Purchase",       desc:"Create a new purchase order",         accent:"#ca8a04", iconBg:"#fefce8", icon:"addInv"    },
  { route:"/general-entries",        to:"/general-entries",        title:"Journal Entries",    desc:"Record and view general journal",     accent:"#4f46e5", iconBg:"#f5f5ff", icon:"journal"   },
  { route:"/view-accounts",          to:"/view-accounts",          title:"View Accounts",      desc:"Chart of accounts overview",          accent:"#db2777", iconBg:"#fdf2f8", icon:"accounts"  },
  { route:"/create-account",         to:"/create-account",         title:"Create Account",     desc:"Add a new ledger account",            accent:"#16a34a", iconBg:"#f0fdf4", icon:"addInv"    },
  { route:"/ledger",                 to:"/ledger",                 title:"General Ledger",     desc:"Browse full ledger by account",       accent:"#0f766e", iconBg:"#f0fdfa", icon:"ledger"    },
  { route:"/cashbook",               to:"/cashbook",               title:"Cashbook",           desc:"Open or set cashbook for the year",   accent:"#7c3aed", iconBg:"#faf5ff", icon:"cashbook"  },
  { route:"/cashbook-report",        to:"/cashbook-report",        title:"Daily Cashbook",     desc:"Today's cash in/out entries",         accent:"#6d28d9", iconBg:"#f5f3ff", icon:"entries"   },
  { route:"/weight-bridge",          to:"/weight-bridge",          title:"Weight Bridge",      desc:"Vehicle weighing entry form",         accent:"#b45309", iconBg:"#fef3c7", icon:"weight"    },
  { route:"/weight-bridge/invoices", to:"/weight-bridge/invoices", title:"Weight Invoices",    desc:"All completed weight bridge records", accent:"#92400e", iconBg:"#fffbeb", icon:"weight"    },
  { route:"/products",               to:"/products",               title:"Products List",      desc:"View and manage products",            accent:"#0284c7", iconBg:"#eff6ff", icon:"product"   },
  { route:"/products/new",           to:"/products/new",           title:"Add Product",        desc:"Register a new product type",         accent:"#0369a1", iconBg:"#f0f9ff", icon:"addInv"    },
  { route:"/trialbalance",           to:"/trialbalance",           title:"Trial Balance",      desc:"Debit/credit verification report",    accent:"#475569", iconBg:"#f8fafc", icon:"reports"   },
  { route:"/balancesheet",           to:"/balancesheet",           title:"Balance Sheet",      desc:"Assets, liabilities and equity",      accent:"#334155", iconBg:"#f8fafc", icon:"reports"   },
  { route:"/incomestatement",        to:"/incomestatement",        title:"Income Statement",   desc:"Revenue and expenses summary",        accent:"#1e293b", iconBg:"#f8fafc", icon:"reports"   },
  // Employee routes — visible only if plan allows (allowedRoutes includes /employees)
  { route:"/employees",              to:"/employees",              title:"Employees",          desc:"Staff records and permissions",       accent:"#ea580c", iconBg:"#fff7ed", icon:"employees" },
  { route:"/employees/new",          to:"/employees/new",          title:"New Employee",       desc:"Create a new employee account",       accent:"#c2410c", iconBg:"#fff7ed", icon:"addInv"    },
];

/* ─── Stat card component ── */
function StatCard({ label, value, sub, accent, iconBg, icon }) {
  return (
    <div className="dbx-stat" style={{ "--dbx-accent":accent, "--dbx-icon-bg":iconBg }}>
      <div className="dbx-stat-icon">{Icon[icon]}</div>
      <p className="dbx-stat-lbl">{label}</p>
      <p className="dbx-stat-val">{value}</p>
      {sub && <p className="dbx-stat-sub">{sub}</p>}
    </div>
  );
}

function StatSkeleton() {
  return (
    <div className="dbx-stat" style={{ "--dbx-accent":"#e2e8f0" }}>
      <div className="dbx-sk" style={{ width:"45%", height:10, marginBottom:10 }}/>
      <div className="dbx-sk" style={{ width:"70%", height:22, marginBottom:8 }}/>
      <div className="dbx-sk" style={{ width:"55%", height:10 }}/>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function Dashboard() {
  const [stats,    setStats]    = useState(null);
  const [loadStat, setLoadStat] = useState(true);

  /* ── Auth from localStorage (written at login) ── */
  const role    = localStorage.getItem("role") || "";
  const name    = localStorage.getItem("name") || "User";
  const isAdmin = role === "Admin";

  const allowedRoutes = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem("allowedRoutes")) || []; }
    catch { return []; }
  }, []);

  /* helper: does this user have access to a frontend route? */
  const canAccess = (route) => isAdmin || allowedRoutes.includes(route);

  /* ── Filter nav cards ── */
  const visibleCards = ALL_NAV_CARDS.filter(card => canAccess(card.route));

  /* ── Fetch only stats the user is allowed to see ── */
  useEffect(() => {
    (async () => {
      const todayStr = new Date().toISOString().slice(0, 10);
      const result   = {};

      /* Sales — route: /sales-invoice (router.js line: GET /sales-invoice) */
      if (canAccess("/view-sales-invoices") || canAccess("/add-invoice-sales")) {
        try {
          const res = await authFetch(`${API_BASE_URL}/sales-invoice`);
          if (res.ok) {
            const j        = await res.json();
            const invoices = j.invoices || (Array.isArray(j) ? j : []);
            result.totalSalesCount = invoices.length;
            result.todaySales      = invoices
              .filter(inv => (inv.date || inv.createdAt || "").slice(0, 10) === todayStr)
              .reduce((s, inv) => s + (Number(inv.amount) || 0), 0);
            result.showSales = true;
          }
        } catch (e) { console.warn("sales", e); }
      }

      /* Purchases — route: /purchase-invoice */
      if (canAccess("/view-purchase-invoices") || canAccess("/add-invoice-purchase")) {
        try {
          const res = await authFetch(`${API_BASE_URL}/purchase-invoice`);
          if (res.ok) {
            const j        = await res.json();
            const invoices = j.invoices || (Array.isArray(j) ? j : []);
            result.totalPurchaseCount = invoices.length;
            result.todayPurchases     = invoices
              .filter(inv => (inv.date || inv.createdAt || "").slice(0, 10) === todayStr)
              .reduce((s, inv) => s + (Number(inv.amount) || 0), 0);
            result.showPurchases = true;
          }
        } catch (e) { console.warn("purchases", e); }
      }

      /* Cash balance — route: /cashbook-report
         Controller returns: { cashbooks, currentBalance } */
      if (canAccess("/cashbook") || canAccess("/cashbook-report")) {
        try {
          const res = await authFetch(`${API_BASE_URL}/cashbook-report`);
          if (res.ok) {
            const j           = await res.json();
            result.cashBalance = Number(j.currentBalance ?? 0);
            result.showCash    = true;
          }
        } catch (e) { console.warn("cashbook", e); }
      }

      setStats(result);
      setLoadStat(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const today = new Date().toLocaleDateString("en-PK", { weekday:"long", year:"numeric", month:"long", day:"numeric" });

  /* ── Build stat cards list (only what we fetched) ── */
  const statCards = !loadStat && stats ? [
    stats.showSales     && { label:"Today's Sales",     value:fmtR(stats.todaySales),     sub:`${stats.totalSalesCount} total invoice${stats.totalSalesCount !== 1 ? "s" : ""}`,    accent:"#059669", iconBg:"#ecfdf5", icon:"sales"    },
    stats.showPurchases && { label:"Today's Purchases", value:fmtR(stats.todayPurchases), sub:`${stats.totalPurchaseCount} total invoice${stats.totalPurchaseCount !== 1 ? "s" : ""}`, accent:"#d97706", iconBg:"#fffbeb", icon:"purchase" },
    stats.showCash      && { label:"Cash Balance",      value:fmtR(stats.cashBalance),    sub:"Recomputed from cashbook ledger",                                                       accent:"#7c3aed", iconBg:"#faf5ff", icon:"cashbook" },
  ].filter(Boolean) : [];

  const showStats  = loadStat || statCards.length > 0;
  const showBanner = !loadStat && stats?.showCash;

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>

      <div className="dbx-wrap">

        {/* ── Header ── */}
        <div style={{ marginBottom:28 }}>
          <p className="dbx-eyebrow">Al Rehman Rice Mills</p>
          <h1 className="dbx-title">Welcome back, {name}</h1>
          <p className="dbx-date">{today}</p>
        </div>

        {/* ── Cash banner — only if user has cashbook access ── */}
        {showBanner && (
          <div className="dbx-cash-banner" style={{ marginBottom:28 }}>
            <div style={{ zIndex:1 }}>
              <p className="dbx-cash-lbl">Current Cash Balance</p>
              <p className="dbx-cash-val">{fmtR(stats.cashBalance)}</p>
              <p className="dbx-cash-sub">Recomputed live from cashbook ledger</p>
            </div>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", zIndex:1 }}>
              {canAccess("/cashbook")        && <Link to="/cashbook"        className="dbx-cash-chip">{Icon.cashbook}&nbsp;Open Cashbook</Link>}
              {canAccess("/cashbook-report") && <Link to="/cashbook-report" className="dbx-cash-chip">{Icon.entries}&nbsp;Daily Report</Link>}
            </div>
          </div>
        )}

        {/* ── Today's stats — only rendered if at least one stat is visible ── */}
        {showStats && (
          <>
            <p className="dbx-section-lbl">Today's Activity</p>
            <div className="dbx-stats-grid" style={{ marginBottom:28 }}>
              {loadStat
                ? [0,1,2].map(i => <StatSkeleton key={i}/>)
                : statCards.map((c, i) => <StatCard key={i} {...c}/>)
              }
            </div>
          </>
        )}

        {/* ── Quick access ── */}
        <p className="dbx-section-lbl">Quick Access</p>

        {visibleCards.length === 0 ? (
          <div className="dbx-empty">
            <div className="dbx-empty-icon">{Icon.lock}</div>
            <p className="dbx-empty-title">No pages assigned yet</p>
            <p className="dbx-empty-sub">Ask your administrator to grant you access to pages.</p>
          </div>
        ) : (
          <div className="dbx-nav-grid">
            {visibleCards.map(card => (
              <Link
                key={card.to}
                to={card.to}
                className="dbx-nav"
                style={{ "--dbx-accent":card.accent, "--dbx-icon-bg":card.iconBg }}
              >
                <div className="dbx-nav-icon">{Icon[card.icon]}</div>
                <p className="dbx-nav-title">{card.title}</p>
                <p className="dbx-nav-desc">{card.desc}</p>
                <span className="dbx-nav-arrow">{Icon.arrow}</span>
              </Link>
            ))}
          </div>
        )}

      </div>
    </SidebarLayout>
  );
}