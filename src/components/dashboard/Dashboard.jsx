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

  /* ── header ── */
  .dbx-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: .12em;
    text-transform: uppercase; color: #9ca3af; margin-bottom: 6px;
  }
  .dbx-title {
    font-family: 'Lora', serif; font-size: 26px; font-weight: 700;
    color: #0f172a; letter-spacing: -.3px; line-height: 1.15;
  }
  .dbx-date {
    font-size: 13px; color: #94a3b8; margin-top: 4px;
  }

  /* ── section label ── */
  .dbx-section-lbl {
    font-size: 11px; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: #94a3b8; margin-bottom: 12px;
    display: flex; align-items: center; gap: 8px;
  }
  .dbx-section-lbl::after {
    content: ''; flex: 1; height: 1px; background: #f1f5f9;
  }

  /* ── stat cards ── */
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
  .dbx-stat-sub {
    font-size: 11.5px; color: #94a3b8; margin-top: 7px;
  }
  .dbx-stat-icon {
    position: absolute; right: 16px; top: 50%; transform: translateY(-50%);
    width: 36px; height: 36px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    background: var(--dbx-icon-bg, #f5f5ff); color: var(--dbx-accent, #6366f1);
    opacity: .8;
  }
  .dbx-stat-delta {
    display: inline-flex; align-items: center; gap: 3px;
    padding: 2px 7px; border-radius: 6px; font-size: 10.5px; font-weight: 700;
    margin-top: 6px; font-family: 'DM Sans', sans-serif;
  }
  .dbx-delta-up   { background: #ecfdf5; color: #059669; }
  .dbx-delta-down { background: #fef2f2; color: #dc2626; }
  .dbx-delta-flat { background: #f1f5f9; color: #94a3b8; }

  /* ── cash balance banner ── */
  .dbx-cash-banner {
    background: #0f172a;
    border-radius: 16px;
    padding: 22px 28px;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 14px;
    position: relative; overflow: hidden;
  }
  .dbx-cash-banner::before {
    content: '';
    position: absolute; right: -40px; top: -40px;
    width: 180px; height: 180px; border-radius: 50%;
    background: rgba(99,102,241,.12);
  }
  .dbx-cash-banner::after {
    content: '';
    position: absolute; right: 60px; bottom: -50px;
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
    font-family: 'DM Sans', sans-serif;
  }

  /* ── nav cards ── */
  .dbx-nav {
    display: flex; flex-direction: column; align-items: flex-start;
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 16px;
    padding: 20px 22px; text-decoration: none; position: relative;
    overflow: hidden; transition: box-shadow .15s, transform .15s, border-color .15s;
  }
  .dbx-nav:hover {
    box-shadow: 0 8px 28px rgba(0,0,0,.09);
    transform: translateY(-2px);
    border-color: var(--dbx-accent, #6366f1);
    text-decoration: none;
  }
  .dbx-nav-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    background: var(--dbx-icon-bg, #f5f5ff);
    color: var(--dbx-accent, #6366f1);
    margin-bottom: 14px; flex-shrink: 0;
    transition: background .15s;
  }
  .dbx-nav:hover .dbx-nav-icon {
    background: var(--dbx-accent, #6366f1);
    color: #fff;
  }
  .dbx-nav-title {
    font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 3px;
    font-family: 'DM Sans', sans-serif;
  }
  .dbx-nav-desc {
    font-size: 12px; color: #94a3b8; line-height: 1.45;
  }
  .dbx-nav-arrow {
    position: absolute; right: 18px; top: 50%; transform: translateY(-50%);
    color: #e2e8f0; transition: color .15s, transform .15s;
  }
  .dbx-nav:hover .dbx-nav-arrow {
    color: var(--dbx-accent, #6366f1);
    transform: translateY(-50%) translateX(2px);
  }

  /* ── payables/receivables row ── */
  .dbx-pr-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 16px; border-radius: 10px; margin-bottom: 6px;
    background: #f8fafc; border: 1px solid #f1f5f9;
    transition: background .1s;
  }
  .dbx-pr-row:last-child { margin-bottom: 0; }
  .dbx-pr-row:hover { background: #f1f5f9; }
  .dbx-pr-name { font-size: 13px; color: #334155; font-weight: 500; }
  .dbx-pr-amount {
    font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 500;
    white-space: nowrap;
  }
  .dbx-pr-amount-payable   { color: #dc2626; }
  .dbx-pr-amount-receivable { color: #059669; }

  .dbx-panel {
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 16px;
    overflow: hidden;
  }
  .dbx-panel-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 18px; border-bottom: 1.5px solid #f1f5f9;
    background: #f8fafc;
  }
  .dbx-panel-title {
    font-size: 13px; font-weight: 700; color: #334155;
    display: flex; align-items: center; gap: 7px;
  }
  .dbx-panel-body { padding: 14px; }
  .dbx-panel-empty {
    padding: 24px; text-align: center; font-size: 13px;
    color: #cbd5e1; font-style: italic;
  }
  .dbx-view-link {
    font-size: 11.5px; font-weight: 600; color: #6366f1;
    text-decoration: none; transition: color .12s;
  }
  .dbx-view-link:hover { color: #4f46e5; text-decoration: underline; }

  /* ── totals in panel head ── */
  .dbx-panel-total {
    font-family: 'DM Mono', monospace; font-size: 12.5px; font-weight: 500;
    padding: 3px 9px; border-radius: 6px;
  }
  .dbx-panel-total-red   { background: #fef2f2; color: #dc2626; }
  .dbx-panel-total-green { background: #ecfdf5; color: #059669; }

  /* ── skeleton ── */
  @keyframes dbx-shimmer { to { background-position: -200% 0; } }
  .dbx-sk {
    background: linear-gradient(90deg,#f1f5f9 25%,#f8fafc 50%,#f1f5f9 75%);
    background-size: 200% 100%; animation: dbx-shimmer 1.4s infinite; border-radius: 8px;
  }

  /* ── grid helpers ── */
  .dbx-stats-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
  }
  .dbx-nav-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
  }
  .dbx-bottom-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
  }

  @media (max-width: 1024px) {
    .dbx-stats-grid { grid-template-columns: repeat(2, 1fr); }
    .dbx-nav-grid   { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .dbx-stats-grid  { grid-template-columns: 1fr; }
    .dbx-nav-grid    { grid-template-columns: 1fr; }
    .dbx-bottom-grid { grid-template-columns: 1fr; }
    .dbx-cash-val    { font-size: 24px; }
  }
`;

/* ─── Helpers ── */
const fmtR = (v) => "Rs " + Number(v||0).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0});
const fmt  = (v) => Number(v||0).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0});

/* ─── Icons (inline SVG) ── */
const Icon = {
  sales:     <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/></svg>,
  purchase:  <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
  cash:      <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
  entries:   <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>,
  addInv:    <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>,
  viewInv:   <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>,
  accounts:  <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>,
  journal:   <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>,
  reports:   <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
  employees: <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  cashbook:  <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  weight:    <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>,
  arrow:     <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>,
  payable:   <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6"/></svg>,
  receivable:<svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12"/></svg>,
};

/* ─── Nav card data ── */
const NAV_CARDS = [
  { to:"/add-invoice",       title:"Add Invoice",      desc:"Create purchase or sales invoice",   accent:"#4f46e5", iconBg:"#f5f5ff", icon:"addInv"    },
  { to:"/view-sales",        title:"Sales Invoices",   desc:"Browse and manage sales records",    accent:"#059669", iconBg:"#ecfdf5", icon:"viewInv"   },
  { to:"/view-purchases",    title:"Purchase Invoices",desc:"Browse and manage purchase records", accent:"#d97706", iconBg:"#fffbeb", icon:"purchase"  },
  { to:"/general-entries",   title:"Journal Entry",    desc:"Record general journal entries",     accent:"#0891b2", iconBg:"#ecfeff", icon:"journal"   },
  { to:"/cashbook",          title:"Cashbook",         desc:"Daily cash in/out ledger",           accent:"#7c3aed", iconBg:"#faf5ff", icon:"cashbook"  },
  { to:"/view-accounts",     title:"View Accounts",    desc:"Chart of accounts overview",         accent:"#db2777", iconBg:"#fdf2f8", icon:"accounts"  },
  { to:"/create-account",    title:"Create Account",   desc:"Add a new ledger account",           accent:"#16a34a", iconBg:"#f0fdf4", icon:"addInv"    },
  { to:"/employees",         title:"Employees",        desc:"Staff records and documents",        accent:"#ea580c", iconBg:"#fff7ed", icon:"employees" },
  { to:"/weight-bridge",     title:"Weight Bridge",    desc:"Vehicle weighing and records",       accent:"#ca8a04", iconBg:"#fefce8", icon:"weight"    },
  { to:"/income-statement",  title:"Income Statement", desc:"Revenue and expenses report",        accent:"#0f172a", iconBg:"#f8fafc", icon:"reports"   },
  { to:"/balance-sheet",     title:"Balance Sheet",    desc:"Assets, liabilities and equity",    accent:"#334155", iconBg:"#f8fafc", icon:"reports"   },
  { to:"/trial-balance",     title:"Trial Balance",    desc:"Debit/credit verification report",  accent:"#475569", iconBg:"#f8fafc", icon:"reports"   },
];

/* ─── Stat card component ── */
function StatCard({ label, value, sub, accent, iconBg, icon, loading }) {
  return (
    <div className="dbx-stat" style={{ "--dbx-accent":accent, "--dbx-icon-bg":iconBg }}>
      <div className="dbx-stat-icon">{Icon[icon]}</div>
      <p className="dbx-stat-lbl">{label}</p>
      {loading
        ? <div className="dbx-sk" style={{ width:"70%", height:22, marginBottom:8 }}/>
        : <p className="dbx-stat-val">{value}</p>
      }
      {!loading && sub && <p className="dbx-stat-sub">{sub}</p>}
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function Dashboard() {
  const [stats,    setStats]    = useState(null);
  const [loadStat, setLoadStat] = useState(true);

  /* fetch dashboard stats */
  useEffect(() => {
    (async () => {
      try {
        /* ── Today's invoices ── */
        const [salesRes, purchaseRes, cashRes, accountsRes] = await Promise.allSettled([
          authFetch(`${API_BASE_URL}/sales-invoices`),
          authFetch(`${API_BASE_URL}/purchase-invoices`),
          authFetch(`${API_BASE_URL}/cashbook-report`),
          authFetch(`${API_BASE_URL}/accounts`),
        ]);

        const todayStr = new Date().toISOString().slice(0, 10);

        /* sales */
        let todaySales = 0, totalSalesInvoices = 0;
        if (salesRes.status === "fulfilled" && salesRes.value.ok) {
          const j = await salesRes.value.json();
          const invoices = j.invoices || j || [];
          totalSalesInvoices = invoices.length;
          todaySales = invoices
            .filter(inv => (inv.date||inv.createdAt||"").slice(0,10) === todayStr)
            .reduce((s, inv) => s + (Number(inv.totalAmount)||Number(inv.amount)||0), 0);
        }

        /* purchases */
        let todayPurchases = 0, totalPurchaseInvoices = 0;
        if (purchaseRes.status === "fulfilled" && purchaseRes.value.ok) {
          const j = await purchaseRes.value.json();
          const invoices = j.invoices || j || [];
          totalPurchaseInvoices = invoices.length;
          todayPurchases = invoices
            .filter(inv => (inv.date||inv.createdAt||"").slice(0,10) === todayStr)
            .reduce((s, inv) => s + (Number(inv.totalAmount)||Number(inv.amount)||0), 0);
        }

        /* cash balance */
        let cashBalance = 0;
        if (cashRes.status === "fulfilled" && cashRes.value.ok) {
          const j = await cashRes.value.json();
          cashBalance = Number(j.cashBalance || j.balance || j.closingBalance || 0);
        }

        /* payables & receivables from accounts */
        let payables = [], receivables = [];
        if (accountsRes.status === "fulfilled" && accountsRes.value.ok) {
          const j = await accountsRes.value.json();
          const accounts = j.accounts || j || [];
          /* Liabilities with credit balance = payable; Assets with debit balance = receivable */
          accounts.forEach(acc => {
            const bal = Number(acc.balance || 0);
            if (bal <= 0) return;
            if (acc.accountType === "Liability" || acc.accountType === "Payable") {
              payables.push({ name: acc.accountName, amount: bal });
            } else if (acc.accountType === "Asset" || acc.accountType === "Receivable") {
              receivables.push({ name: acc.accountName, amount: bal });
            }
          });
          /* Sort by amount desc, keep top 5 */
          payables    = payables.sort((a,b) => b.amount - a.amount).slice(0, 5);
          receivables = receivables.sort((a,b) => b.amount - a.amount).slice(0, 5);
        }

        setStats({
          todaySales, todayPurchases, cashBalance,
          totalSalesInvoices, totalPurchaseInvoices,
          payables, receivables,
          totalPayable:    payables.reduce((s,p) => s + p.amount, 0),
          totalReceivable: receivables.reduce((s,p) => s + p.amount, 0),
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoadStat(false);
      }
    })();
  }, []);

  const today = new Date().toLocaleDateString("en-PK",{ weekday:"long", year:"numeric", month:"long", day:"numeric" });

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>

      <div className="dbx-wrap">

        {/* ── Page header ── */}
        <div style={{ marginBottom:28 }}>
          <p className="dbx-eyebrow">Al Rehman Rice Mills</p>
          <h1 className="dbx-title">Dashboard</h1>
          <p className="dbx-date">{today}</p>
        </div>

        {/* ── Cash balance banner ── */}
        <div className="dbx-cash-banner" style={{ marginBottom:28 }}>
          <div style={{ zIndex:1 }}>
            <p className="dbx-cash-lbl">Current Cash Balance</p>
            {loadStat
              ? <div className="dbx-sk" style={{ width:200, height:36, background:"rgba(255,255,255,.1)" }}/>
              : <p className="dbx-cash-val">{fmtR(stats?.cashBalance ?? 0)}</p>
            }
            <p className="dbx-cash-sub">Live figure from cashbook ledger</p>
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", zIndex:1 }}>
            <Link to="/cashbook" className="dbx-cash-chip">
              {Icon.cashbook}&nbsp;Open Cashbook
            </Link>
            <Link to="/daily-cashbook" className="dbx-cash-chip">
              {Icon.entries}&nbsp;Daily Report
            </Link>
          </div>
        </div>

        {/* ── Today's quick stats ── */}
        <p className="dbx-section-lbl">Today's Activity</p>
        <div className="dbx-stats-grid" style={{ marginBottom:28 }}>
          <StatCard
            label="Today's Sales"
            value={fmtR(stats?.todaySales ?? 0)}
            sub={`${stats?.totalSalesInvoices ?? "—"} total invoices`}
            accent="#059669" iconBg="#ecfdf5" icon="sales"
            loading={loadStat}
          />
          <StatCard
            label="Today's Purchases"
            value={fmtR(stats?.todayPurchases ?? 0)}
            sub={`${stats?.totalPurchaseInvoices ?? "—"} total invoices`}
            accent="#d97706" iconBg="#fffbeb" icon="purchase"
            loading={loadStat}
          />
          <StatCard
            label="Total Receivable"
            value={fmtR(stats?.totalReceivable ?? 0)}
            sub={`${stats?.receivables?.length ?? "—"} accounts`}
            accent="#4f46e5" iconBg="#f5f5ff" icon="entries"
            loading={loadStat}
          />
          <StatCard
            label="Total Payable"
            value={fmtR(stats?.totalPayable ?? 0)}
            sub={`${stats?.payables?.length ?? "—"} accounts`}
            accent="#dc2626" iconBg="#fef2f2" icon="cash"
            loading={loadStat}
          />
        </div>

        {/* ── Payables & Receivables panels ── */}
        <div className="dbx-bottom-grid" style={{ marginBottom:32 }}>

          {/* Receivables */}
          <div className="dbx-panel">
            <div className="dbx-panel-head">
              <span className="dbx-panel-title">
                <span style={{ color:"#4f46e5" }}>{Icon.receivable}</span>
                Top Receivables
              </span>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                {!loadStat && (
                  <span className="dbx-panel-total dbx-panel-total-green">
                    {fmtR(stats?.totalReceivable ?? 0)}
                  </span>
                )}
                <Link to="/view-accounts" className="dbx-view-link">View all →</Link>
              </div>
            </div>
            <div className="dbx-panel-body">
              {loadStat ? (
                [0,1,2].map(i => (
                  <div key={i} className="dbx-pr-row">
                    <div className="dbx-sk" style={{ width:"55%", height:13 }}/>
                    <div className="dbx-sk" style={{ width:"28%", height:13 }}/>
                  </div>
                ))
              ) : stats?.receivables?.length > 0 ? (
                stats.receivables.map((r, i) => (
                  <div key={i} className="dbx-pr-row">
                    <span className="dbx-pr-name">{r.name}</span>
                    <span className="dbx-pr-amount dbx-pr-amount-receivable">{fmtR(r.amount)}</span>
                  </div>
                ))
              ) : (
                <p className="dbx-panel-empty">No receivable accounts found</p>
              )}
            </div>
          </div>

          {/* Payables */}
          <div className="dbx-panel">
            <div className="dbx-panel-head">
              <span className="dbx-panel-title">
                <span style={{ color:"#dc2626" }}>{Icon.payable}</span>
                Top Payables
              </span>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                {!loadStat && (
                  <span className="dbx-panel-total dbx-panel-total-red">
                    {fmtR(stats?.totalPayable ?? 0)}
                  </span>
                )}
                <Link to="/view-accounts" className="dbx-view-link">View all →</Link>
              </div>
            </div>
            <div className="dbx-panel-body">
              {loadStat ? (
                [0,1,2].map(i => (
                  <div key={i} className="dbx-pr-row">
                    <div className="dbx-sk" style={{ width:"55%", height:13 }}/>
                    <div className="dbx-sk" style={{ width:"28%", height:13 }}/>
                  </div>
                ))
              ) : stats?.payables?.length > 0 ? (
                stats.payables.map((p, i) => (
                  <div key={i} className="dbx-pr-row">
                    <span className="dbx-pr-name">{p.name}</span>
                    <span className="dbx-pr-amount dbx-pr-amount-payable">{fmtR(p.amount)}</span>
                  </div>
                ))
              ) : (
                <p className="dbx-panel-empty">No payable accounts found</p>
              )}
            </div>
          </div>
        </div>

        {/* ── Quick navigation ── */}
        <p className="dbx-section-lbl">Quick Access</p>
        <div className="dbx-nav-grid">
          {NAV_CARDS.map((card) => (
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

      </div>
    </SidebarLayout>
  );
}