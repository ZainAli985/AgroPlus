import React, { useEffect, useState, useMemo, useCallback } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";

/* ─── Fonts ─────────────────────────────────────────────────────────────── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

/* ─── ORCA CSS ──────────────────────────────────────────────────────────── */
const CSS = `
  :root {
    --oc-black:    #0B0C0D; --oc-dark:  #141A1F; --oc-navy: #212A37;
    --oc-slate:    #253240; --oc-steel: #334455; --oc-mid:  #6E7170;
    --oc-silver:   #A5A8A6; --oc-light: #DADADA; --oc-bg:   #F5F5F5;
    --oc-bg2:      #ECECEC; --oc-white: #FFFFFF;
    --oc-gold:     #C9A85A; --oc-gold2: #B8964A; --oc-gold3: #D1B36A;
    --oc-green:    #22c55e; --oc-red: #ef4444;
  }

  .db *, .db *::before, .db *::after { box-sizing: border-box; }
  .db {
    font-family: 'DM Sans', sans-serif;
    color: var(--oc-dark);
    width: 100%; max-width: 1160px;
    margin: 0 auto;
  }

  /* ── Header ── */
  .db-header { margin-bottom: 28px; }
  .db-eyebrow {
    font-size: 10px; font-weight: 700; letter-spacing: .18em;
    text-transform: uppercase; color: var(--oc-gold); margin-bottom: 5px;
  }
  .db-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 700; color: var(--oc-black);
    letter-spacing: -.4px; line-height: 1.1; margin-bottom: 4px;
  }
  .db-title em { font-style: italic; color: var(--oc-gold2); }
  .db-subtitle { font-size: 13px; color: var(--oc-mid); font-weight: 400; }

  /* ── Section label ── */
  .db-sec {
    font-size: 9.5px; font-weight: 700; letter-spacing: .14em;
    text-transform: uppercase; color: var(--oc-silver);
    margin: 28px 0 14px; display: flex; align-items: center; gap: 10px;
  }
  .db-sec::after { content: ''; flex: 1; height: 1px; background: var(--oc-bg2); }

  /* ── Card base ── */
  .db-card {
    background: var(--oc-white); border: 1.5px solid var(--oc-bg2);
    border-radius: 14px; padding: 20px;
    position: relative; overflow: hidden;
    transition: box-shadow .15s, transform .12s;
  }
  .db-card:hover { box-shadow: 0 6px 24px rgba(11,12,13,.07); transform: translateY(-1px); }
  .db-card-accent {
    position: absolute; top: 0; left: 0; right: 0; height: 3px; border-radius: 14px 14px 0 0;
  }

  /* ── Stat label / value ── */
  .db-lbl {
    font-size: 10px; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: var(--oc-silver); margin-bottom: 6px;
  }
  .db-val {
    font-family: 'DM Mono', monospace; font-size: 22px; font-weight: 500;
    color: var(--oc-black); letter-spacing: -.4px; line-height: 1;
  }
  .db-val.green  { color: #15803d; }
  .db-val.red    { color: #b91c1c; }
  .db-val.gold   { color: var(--oc-gold2); }
  .db-val.navy   { color: var(--oc-navy); }
  .db-sub { font-size: 11.5px; color: var(--oc-silver); margin-top: 6px; }

  /* ── Period filter pills ── */
  .db-filter {
    display: flex; gap: 5px; flex-wrap: wrap; margin-top: 12px;
  }
  .db-fpill {
    padding: 3px 10px; border-radius: 20px; font-size: 10px; font-weight: 600;
    border: 1.5px solid var(--oc-bg2); background: var(--oc-white);
    color: var(--oc-mid); cursor: pointer; transition: all .1s;
    font-family: 'DM Sans', sans-serif;
  }
  .db-fpill.on {
    background: var(--oc-navy); color: var(--oc-white);
    border-color: var(--oc-navy);
  }
  .db-fpill-date {
    padding: 3px 8px; border-radius: 6px; font-size: 10px;
    border: 1.5px solid var(--oc-bg2); background: var(--oc-white);
    color: var(--oc-dark); cursor: pointer; outline: none;
    font-family: 'DM Mono', monospace;
  }
  .db-fpill-date:focus { border-color: var(--oc-navy); }

  /* ── Account dropdown ── */
  .db-acct-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 7px 0; border-bottom: 1px solid var(--oc-bg); font-size: 12.5px;
  }
  .db-acct-row:last-child { border-bottom: none; }
  .db-acct-name { color: var(--oc-dark); font-weight: 500; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .db-acct-bal {
    font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500;
    flex-shrink: 0; margin-left: 10px;
  }
  .db-acct-bal.pos { color: #15803d; }
  .db-acct-bal.neg { color: #b91c1c; }

  /* ── Toggle expand ── */
  .db-expand-btn {
    width: 100%; margin-top: 10px; padding: 6px;
    border: 1.5px solid var(--oc-bg2); border-radius: 8px;
    background: var(--oc-bg); color: var(--oc-mid);
    font-size: 11px; font-weight: 600; cursor: pointer;
    font-family: 'DM Sans', sans-serif; transition: all .1s;
    display: flex; align-items: center; justify-content: center; gap: 5px;
  }
  .db-expand-btn:hover { background: var(--oc-bg2); color: var(--oc-navy); }

  /* ── Cheque chip ── */
  .db-cheque-row {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 10px; border-radius: 8px; background: var(--oc-bg);
    margin-bottom: 5px; font-size: 12px;
  }
  .db-cheque-row:last-child { margin-bottom: 0; }
  .db-cheque-no {
    font-family: 'DM Mono', monospace; font-size: 11px;
    color: var(--oc-mid); flex-shrink: 0;
  }
  .db-cheque-name { flex: 1; color: var(--oc-dark); font-weight: 500; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .db-cheque-amt {
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 600;
    color: var(--oc-navy); flex-shrink: 0;
  }

  /* ── Mini bar chart ── */
  .db-chart-wrap { margin-top: 14px; }
  .db-chart-bar-row { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
  .db-chart-bar-lbl { font-size: 10px; color: var(--oc-mid); min-width: 28px; text-align: right; font-family: 'DM Mono', monospace; }
  .db-chart-bar-track { flex: 1; height: 8px; background: var(--oc-bg); border-radius: 4px; overflow: hidden; }
  .db-chart-bar-fill  { height: 100%; border-radius: 4px; transition: width .4s cubic-bezier(.4,0,.2,1); }
  .db-chart-bar-val   { font-size: 10px; color: var(--oc-mid); min-width: 56px; font-family: 'DM Mono', monospace; }

  /* ── Skeleton ── */
  @keyframes db-shimmer { to { background-position: -200% 0; } }
  .db-sk {
    background: linear-gradient(90deg,var(--oc-bg) 25%,var(--oc-bg2) 50%,var(--oc-bg) 75%);
    background-size: 200% 100%; animation: db-shimmer 1.4s infinite;
    border-radius: 6px;
  }

  /* ── Grids ── */
  .db-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
  .db-grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; }
  .db-grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }

  @media (max-width: 1024px) {
    .db-grid-4 { grid-template-columns: repeat(2,1fr); }
    .db-grid-3 { grid-template-columns: repeat(2,1fr); }
  }
  @media (max-width: 680px) {
    .db-grid-4, .db-grid-3, .db-grid-2 { grid-template-columns: 1fr; }
    .db-val { font-size: 18px; }
  }
`;

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
const Rs = (v) => "Rs " + Number(v || 0).toLocaleString("en-PK", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const today = () => new Date().toISOString().slice(0, 10);
const startOfWeek = () => {
  const d = new Date(); d.setDate(d.getDate() - d.getDay()); return d.toISOString().slice(0,10);
};
const startOfMonth = () => new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0,10);

function inRange(dateStr, from, to) {
  if (!dateStr) return false;
  const d = (dateStr || "").slice(0, 10);
  return (!from || d >= from) && (!to || d <= to);
}

/* ─── Period Filter hook ─────────────────────────────────────────────────── */
function usePeriod(defaultMode = "today") {
  const [mode, setMode] = useState(defaultMode);
  const [custom, setCustom] = useState({ from: today(), to: today() });

  const { from, to } = useMemo(() => {
    if (mode === "today")   return { from: today(),        to: today() };
    if (mode === "week")    return { from: startOfWeek(),  to: today() };
    if (mode === "month")   return { from: startOfMonth(), to: today() };
    if (mode === "custom")  return { from: custom.from,    to: custom.to };
    return { from: null, to: null }; // "all"
  }, [mode, custom]);

  return { mode, setMode, from, to, custom, setCustom };
}

/* ─── Period Picker ──────────────────────────────────────────────────────── */
function PeriodPicker({ p, extraPills }) {
  const pills = ["today", "week", "month", "all", ...(extraPills || [])];
  const labels = { today:"Today", week:"This Week", month:"This Month", all:"All Time", custom:"Custom" };
  return (
    <div className="db-filter">
      {pills.map(m => (
        <button key={m} className={`db-fpill${p.mode===m?" on":""}`} onClick={() => p.setMode(m)}>
          {labels[m] || m}
        </button>
      ))}
      <button className={`db-fpill${p.mode==="custom"?" on":""}`} onClick={() => p.setMode("custom")}>
        Custom
      </button>
      {p.mode === "custom" && (
        <>
          <input type="date" className="db-fpill-date" value={p.custom.from}
            onChange={e => p.setCustom(c => ({...c, from: e.target.value}))}/>
          <input type="date" className="db-fpill-date" value={p.custom.to}
            onChange={e => p.setCustom(c => ({...c, to: e.target.value}))}/>
        </>
      )}
    </div>
  );
}

/* ─── Mini Bar Chart ─────────────────────────────────────────────────────── */
function MiniBar({ data, color }) {
  // data: [{label, value}]
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="db-chart-wrap">
      {data.map((d, i) => (
        <div key={i} className="db-chart-bar-row">
          <span className="db-chart-bar-lbl">{d.label}</span>
          <div className="db-chart-bar-track">
            <div className="db-chart-bar-fill"
              style={{ width: `${Math.round((d.value/max)*100)}%`, background: color || "var(--oc-navy)" }}/>
          </div>
          <span className="db-chart-bar-val">{Rs(d.value)}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Skeleton card ──────────────────────────────────────────────────────── */
function SkCard() {
  return (
    <div className="db-card">
      <div className="db-sk" style={{width:"40%",height:9,marginBottom:10}}/>
      <div className="db-sk" style={{width:"65%",height:20,marginBottom:8}}/>
      <div className="db-sk" style={{width:"50%",height:8}}/>
    </div>
  );
}

/* ─── Main Dashboard ─────────────────────────────────────────────────────── */
export default function Dashboard() {
  const name         = localStorage.getItem("name") || "User";
  const businessName = localStorage.getItem("businessName") || "";
  const isAdmin      = localStorage.getItem("role") === "Admin";

  // ── Data state ──────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(true);
  const [accounts,  setAccounts]  = useState([]);
  const [sales,     setSales]     = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [cashBal,   setCashBal]   = useState(null);
  const [cheques,   setCheques]   = useState([]);
  const [wbEntries, setWbEntries] = useState([]);

  // ── Period filters ───────────────────────────────────────────────────────
  const salesP     = usePeriod("today");
  const purchaseP  = usePeriod("today");
  const expenseP   = usePeriod("today");

  // ── UI state ─────────────────────────────────────────────────────────────
  const [showBankList,   setShowBankList]   = useState(false);
  const [showRcvList,    setShowRcvList]    = useState(false);
  const [showPayList,    setShowPayList]    = useState(false);
  const [showLoanOut,    setShowLoanOut]    = useState(false);
  const [showLoanIn,     setShowLoanIn]     = useState(false);
  const [showInvList,    setShowInvList]    = useState(false);
  const [showChequeList, setShowChequeList] = useState(false);

  // ── Fetch all data in parallel ───────────────────────────────────────────
  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.allSettled([
        authFetch(`${API_BASE_URL}/accounts`).then(r => r.ok && r.json()).then(d => d && setAccounts(Array.isArray(d) ? d : [])),
        authFetch(`${API_BASE_URL}/sales-invoice`).then(r => r.ok && r.json()).then(d => {
          if (d) setSales(d.invoices || (Array.isArray(d) ? d : []));
        }),
        authFetch(`${API_BASE_URL}/purchase-invoice`).then(r => r.ok && r.json()).then(d => {
          if (d) setPurchases(d.invoices || (Array.isArray(d) ? d : []));
        }),
        authFetch(`${API_BASE_URL}/cashbook-report`).then(r => r.ok && r.json()).then(d => {
          if (d) setCashBal(d.currentBalance ?? 0);
        }),
        authFetch(`${API_BASE_URL}/cheque-entries`).then(r => r.ok && r.json()).then(d => {
          if (d) setCheques((d.chequeEntries || []).filter(c => c.status === "issued"));
        }),
        authFetch(`${API_BASE_URL}/weight-bridge`).then(r => r.ok && r.json()).then(d => {
          if (d) setWbEntries(d.entries || (Array.isArray(d) ? d : []));
        }),
      ]);
      setLoading(false);
    })();
  }, []);

  // ── Account categories ───────────────────────────────────────────────────
  const bankAccounts = useMemo(() =>
    accounts.filter(a => a.category === "Bank" || (a.accountType === "Assets" && a.LedgerRef?.toLowerCase().includes("bank"))),
    [accounts]
  );
  const totalBankBalance = useMemo(() => bankAccounts.reduce((s, a) => s + (a.balance || 0), 0), [bankAccounts]);
  const totalCash = (cashBal ?? 0) + totalBankBalance;

  const investorAccounts = useMemo(() =>
    accounts.filter(a =>
      a.category?.toLowerCase().includes("invest") ||
      a.accountName?.toLowerCase().includes("investor") ||
      a.accountName?.toLowerCase().includes("investment")
    ), [accounts]
  );
  const totalInvestment = useMemo(() => investorAccounts.reduce((s,a) => s + Math.abs(a.balance||0), 0), [investorAccounts]);

  // Receivables: Assets accounts with positive balance (excluding bank, product, cash)
  const receivableAccounts = useMemo(() =>
    accounts.filter(a =>
      a.accountType === "Assets" && !a.isProductAccount && !a.isProtected &&
      a.category !== "Bank" && (a.balance || 0) > 0 &&
      !a.LedgerRef?.toLowerCase().includes("bank")
    ), [accounts]
  );
  const totalReceivables = useMemo(() => receivableAccounts.reduce((s,a) => s + (a.balance||0), 0), [receivableAccounts]);

  // Payables: Liabilities accounts
  const payableAccounts = useMemo(() =>
    accounts.filter(a => a.accountType === "Liabilities" && !a.category?.includes("Employee") && (a.balance||0) !== 0),
    [accounts]
  );
  const totalPayables = useMemo(() => payableAccounts.reduce((s,a) => s + Math.abs(a.balance||0), 0), [payableAccounts]);

  // Loans
  const loanGivenAccounts  = useMemo(() => accounts.filter(a => a.accountName?.toLowerCase().includes("loan given")  || a.category?.toLowerCase() === "loan given"),  [accounts]);
  const loanTakenAccounts  = useMemo(() => accounts.filter(a => a.accountName?.toLowerCase().includes("loan taken")  || a.category?.toLowerCase() === "loan taken"),  [accounts]);
  const totalLoanGiven = useMemo(() => loanGivenAccounts.reduce((s,a) => s + Math.abs(a.balance||0), 0), [loanGivenAccounts]);
  const totalLoanTaken = useMemo(() => loanTakenAccounts.reduce((s,a) => s + Math.abs(a.balance||0), 0), [loanTakenAccounts]);

  // ── Period-filtered aggregators ──────────────────────────────────────────
  function filterInvoices(list, period) {
    return list.filter(inv => inRange(inv.date || inv.createdAt, period.from, period.to));
  }

  const filteredSales     = useMemo(() => filterInvoices(sales,     salesP),    [sales, salesP.from, salesP.to]);
  const filteredPurchases = useMemo(() => filterInvoices(purchases, purchaseP), [purchases, purchaseP.from, purchaseP.to]);

  const salesTotalAmt     = useMemo(() => filteredSales.reduce((s,inv)     => s + (Number(inv.totalAmount||inv.amount)||0), 0), [filteredSales]);
  const purchaseTotalAmt  = useMemo(() => filteredPurchases.reduce((s,inv) => s + (Number(inv.totalAmount||inv.finalAmount||inv.amount)||0), 0), [filteredPurchases]);

  // Expenses: Expense accounts, sum balances (no period filter on account balances)
  const expenseAccounts = useMemo(() => accounts.filter(a => a.accountType === "Expense"), [accounts]);
  const totalExpenses   = useMemo(() => expenseAccounts.reduce((s,a) => s + Math.abs(a.balance||0), 0), [expenseAccounts]);
  // For expense period filter — use journal entries would be ideal but we filter by "today" from balance not available without journal
  // Show total expense balance with info note

  // ── Weight Bridge ────────────────────────────────────────────────────────
  const wbCompleted = useMemo(() => wbEntries.filter(e => e.completed), [wbEntries]);
  const wbEarning   = useMemo(() => wbCompleted.reduce((s,e) => s + ((e.rate||0) * 1), 0), [wbCompleted]);
  // Rate is per vehicle, so total = sum of rates for completed entries
  const wbActualEarning = useMemo(() => wbCompleted.reduce((s,e) => s + (e.rate||0), 0), [wbCompleted]);

  // ── Chart data (last 7 days sales) ──────────────────────────────────────
  const salesChart = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const ds = d.toISOString().slice(0,10);
      const lbl = d.toLocaleDateString("en-PK", { weekday:"short" });
      const amt = sales.filter(s => (s.date||s.createdAt||"").slice(0,10) === ds)
                       .reduce((sum, s) => sum + (Number(s.totalAmount||s.amount)||0), 0);
      days.push({ label: lbl, value: amt });
    }
    return days;
  }, [sales]);

  const purchaseChart = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const ds = d.toISOString().slice(0,10);
      const lbl = d.toLocaleDateString("en-PK", { weekday:"short" });
      const amt = purchases.filter(p => (p.date||p.createdAt||"").slice(0,10) === ds)
                           .reduce((sum, p) => sum + (Number(p.totalAmount||p.finalAmount||p.amount)||0), 0);
      days.push({ label: lbl, value: amt });
    }
    return days;
  }, [purchases]);

  // ── Pending cheques total ────────────────────────────────────────────────
  const pendingChequeTotal = useMemo(() => cheques.reduce((s,c) => s + (c.amount||0), 0), [cheques]);

  // ── Date display ─────────────────────────────────────────────────────────
  const dateStr = new Date().toLocaleDateString("en-PK", { weekday:"long", year:"numeric", month:"long", day:"numeric" });
  const greeting = (() => { const h = new Date().getHours(); return h<12?"Good Morning":h<17?"Good Afternoon":h<21?"Good Evening":"Good Night"; })();

  // ── Net position ─────────────────────────────────────────────────────────
  const netPosition = totalReceivables - totalPayables;

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <div className="db">

        {/* ── Header ── */}
        <div className="db-header">
          <p className="db-eyebrow">{businessName || "Agro Plus"} · Operations Dashboard</p>
          <h1 className="db-title">{greeting}, <em>{name.split(" ")[0]}</em></h1>
          <p className="db-subtitle">{dateStr}</p>
        </div>

        {/* ══ SECTION 1: Cash & Banks ══════════════════════════════════════ */}
        <p className="db-sec">Cash & Bank Position</p>
        <div className="db-grid-3">

          {/* Total Cash + Bank combined */}
          <div className="db-card" style={{ gridColumn: "span 1" }}>
            <div className="db-card-accent" style={{ background: "linear-gradient(90deg,#C9A85A,#D1B36A)" }}/>
            <p className="db-lbl">Total Liquidity</p>
            {loading ? <div className="db-sk" style={{width:"70%",height:22}}/> : (
              <p className="db-val gold">{Rs(totalCash)}</p>
            )}
            <p className="db-sub">Cash in hand + all bank accounts</p>
            {!loading && (
              <div style={{marginTop:10,paddingTop:10,borderTop:"1px solid var(--oc-bg)"}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--oc-mid)",marginBottom:4}}>
                  <span>Cash in Hand</span>
                  <span style={{fontFamily:"'DM Mono',monospace",color:"var(--oc-dark)"}}>{Rs(cashBal??0)}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--oc-mid)"}}>
                  <span>Total Bank</span>
                  <span style={{fontFamily:"'DM Mono',monospace",color:"var(--oc-dark)"}}>{Rs(totalBankBalance)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Bank accounts breakdown */}
          <div className="db-card" style={{ gridColumn: "span 2" }}>
            <div className="db-card-accent" style={{ background: "linear-gradient(90deg,#212A37,#334455)" }}/>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <p className="db-lbl" style={{margin:0}}>Bank Accounts</p>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:13,fontWeight:600,color:"var(--oc-navy)"}}>{Rs(totalBankBalance)}</span>
            </div>
            {loading ? (
              [0,1].map(i => <div key={i} className="db-sk" style={{width:"100%",height:12,marginBottom:6}}/>)
            ) : bankAccounts.length === 0 ? (
              <p style={{fontSize:12,color:"var(--oc-silver)"}}>No bank accounts found. Add accounts with category "Bank".</p>
            ) : (
              <>
                {(showBankList ? bankAccounts : bankAccounts.slice(0,3)).map(a => (
                  <div key={a._id} className="db-acct-row">
                    <span className="db-acct-name">{a.accountName}</span>
                    <span className={`db-acct-bal ${(a.balance||0)>=0?"pos":"neg"}`}>{Rs(a.balance||0)}</span>
                  </div>
                ))}
                {bankAccounts.length > 3 && (
                  <button className="db-expand-btn" onClick={() => setShowBankList(v => !v)}>
                    {showBankList ? "▲ Show Less" : `▼ Show ${bankAccounts.length - 3} More`}
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* ══ SECTION 2: Sales & Purchases ════════════════════════════════ */}
        <p className="db-sec">Sales & Purchases</p>
        <div className="db-grid-2">

          {/* Sales */}
          <div className="db-card">
            <div className="db-card-accent" style={{ background: "linear-gradient(90deg,#059669,#22c55e)" }}/>
            <p className="db-lbl">Net Sales</p>
            {loading ? <div className="db-sk" style={{width:"60%",height:22}}/> : (
              <p className="db-val green">{Rs(salesTotalAmt)}</p>
            )}
            <p className="db-sub">{filteredSales.length} invoice{filteredSales.length!==1?"s":""} · {sales.length} total all time</p>
            <PeriodPicker p={salesP}/>
            {!loading && <MiniBar data={salesChart} color="#22c55e"/>}
          </div>

          {/* Purchases */}
          <div className="db-card">
            <div className="db-card-accent" style={{ background: "linear-gradient(90deg,#d97706,#C9A85A)" }}/>
            <p className="db-lbl">Net Purchases</p>
            {loading ? <div className="db-sk" style={{width:"60%",height:22}}/> : (
              <p className="db-val gold">{Rs(purchaseTotalAmt)}</p>
            )}
            <p className="db-sub">{filteredPurchases.length} invoice{filteredPurchases.length!==1?"s":""} · {purchases.length} total all time</p>
            <PeriodPicker p={purchaseP}/>
            {!loading && <MiniBar data={purchaseChart} color="#C9A85A"/>}
          </div>
        </div>

        {/* ══ SECTION 3: Financials ════════════════════════════════════════ */}
        <p className="db-sec">Financial Position</p>
        <div className="db-grid-4">

          {/* Receivables */}
          <div className="db-card">
            <div className="db-card-accent" style={{ background:"linear-gradient(90deg,#0891b2,#06b6d4)" }}/>
            <p className="db-lbl">Total Receivables</p>
            {loading ? <div className="db-sk" style={{width:"55%",height:20}}/> : (
              <p className="db-val navy">{Rs(totalReceivables)}</p>
            )}
            <p className="db-sub">{receivableAccounts.length} account{receivableAccounts.length!==1?"s":""}</p>
            {!loading && receivableAccounts.length > 0 && (
              <>
                {(showRcvList ? receivableAccounts : receivableAccounts.slice(0,3)).map(a => (
                  <div key={a._id} className="db-acct-row" style={{fontSize:11.5}}>
                    <span className="db-acct-name">{a.accountName}</span>
                    <span className="db-acct-bal pos">{Rs(a.balance||0)}</span>
                  </div>
                ))}
                {receivableAccounts.length > 3 && (
                  <button className="db-expand-btn" onClick={() => setShowRcvList(v=>!v)}>
                    {showRcvList ? "▲ Less" : `▼ +${receivableAccounts.length-3} more`}
                  </button>
                )}
              </>
            )}
          </div>

          {/* Payables */}
          <div className="db-card">
            <div className="db-card-accent" style={{ background:"linear-gradient(90deg,#ef4444,#f87171)" }}/>
            <p className="db-lbl">Total Payables</p>
            {loading ? <div className="db-sk" style={{width:"55%",height:20}}/> : (
              <p className="db-val red">{Rs(totalPayables)}</p>
            )}
            <p className="db-sub">{payableAccounts.length} account{payableAccounts.length!==1?"s":""}</p>
            {!loading && payableAccounts.length > 0 && (
              <>
                {(showPayList ? payableAccounts : payableAccounts.slice(0,3)).map(a => (
                  <div key={a._id} className="db-acct-row" style={{fontSize:11.5}}>
                    <span className="db-acct-name">{a.accountName}</span>
                    <span className="db-acct-bal neg">{Rs(Math.abs(a.balance||0))}</span>
                  </div>
                ))}
                {payableAccounts.length > 3 && (
                  <button className="db-expand-btn" onClick={() => setShowPayList(v=>!v)}>
                    {showPayList ? "▲ Less" : `▼ +${payableAccounts.length-3} more`}
                  </button>
                )}
              </>
            )}
          </div>

          {/* Net Position */}
          <div className="db-card">
            <div className="db-card-accent" style={{ background:`linear-gradient(90deg,${netPosition>=0?"#22c55e":"#ef4444"},${netPosition>=0?"#16a34a":"#dc2626"})` }}/>
            <p className="db-lbl">Net Position</p>
            {loading ? <div className="db-sk" style={{width:"55%",height:20}}/> : (
              <p className={`db-val ${netPosition>=0?"green":"red"}`}>{Rs(Math.abs(netPosition))}</p>
            )}
            <p className="db-sub">{netPosition>=0?"Receivables exceed payables":"Payables exceed receivables"}</p>
            {!loading && (
              <div style={{marginTop:12}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--oc-mid)",marginBottom:3}}>
                  <span>Receivable</span><span style={{fontFamily:"'DM Mono',monospace",color:"#15803d"}}>{Rs(totalReceivables)}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--oc-mid)"}}>
                  <span>Payable</span><span style={{fontFamily:"'DM Mono',monospace",color:"#b91c1c"}}>{Rs(totalPayables)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Expenses */}
          <div className="db-card">
            <div className="db-card-accent" style={{ background:"linear-gradient(90deg,#7c3aed,#8b5cf6)" }}/>
            <p className="db-lbl">Total Expenses</p>
            {loading ? <div className="db-sk" style={{width:"55%",height:20}}/> : (
              <p className="db-val">{Rs(totalExpenses)}</p>
            )}
            <p className="db-sub">{expenseAccounts.length} expense account{expenseAccounts.length!==1?"s":""}</p>
            {!loading && expenseAccounts.length > 0 && (
              <div style={{marginTop:10}}>
                {expenseAccounts.slice(0,4).map(a => (
                  <div key={a._id} className="db-acct-row" style={{fontSize:11}}>
                    <span className="db-acct-name">{a.accountName.replace(" — Expense","")}</span>
                    <span className="db-acct-bal neg">{Rs(Math.abs(a.balance||0))}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ══ SECTION 4: Investment & Loans ═══════════════════════════════ */}
        <p className="db-sec">Investment & Loans</p>
        <div className="db-grid-3">

          {/* Investment */}
          <div className="db-card">
            <div className="db-card-accent" style={{ background:"linear-gradient(90deg,#C9A85A,#0B0C0D)" }}/>
            <p className="db-lbl">Total Investment</p>
            {loading ? <div className="db-sk" style={{width:"55%",height:20}}/> : (
              <p className="db-val gold">{Rs(totalInvestment)}</p>
            )}
            <p className="db-sub">{investorAccounts.length} investor account{investorAccounts.length!==1?"s":""}</p>
            {!loading && investorAccounts.length > 0 && (
              <>
                {(showInvList ? investorAccounts : investorAccounts.slice(0,3)).map(a => (
                  <div key={a._id} className="db-acct-row" style={{fontSize:11.5}}>
                    <span className="db-acct-name">{a.accountName}</span>
                    <span className="db-acct-bal pos">{Rs(Math.abs(a.balance||0))}</span>
                  </div>
                ))}
                {investorAccounts.length > 3 && (
                  <button className="db-expand-btn" onClick={() => setShowInvList(v=>!v)}>
                    {showInvList ? "▲ Less" : `▼ +${investorAccounts.length-3} more`}
                  </button>
                )}
              </>
            )}
          </div>

          {/* Loans Given */}
          <div className="db-card">
            <div className="db-card-accent" style={{ background:"linear-gradient(90deg,#0891b2,#0369a1)" }}/>
            <p className="db-lbl">Loan Given</p>
            {loading ? <div className="db-sk" style={{width:"55%",height:20}}/> : (
              <p className="db-val navy">{Rs(totalLoanGiven)}</p>
            )}
            <p className="db-sub">{loanGivenAccounts.length} account{loanGivenAccounts.length!==1?"s":""}</p>
            {!loading && loanGivenAccounts.length > 0 && (
              <>
                {(showLoanOut ? loanGivenAccounts : loanGivenAccounts.slice(0,4)).map(a => (
                  <div key={a._id} className="db-acct-row" style={{fontSize:11.5}}>
                    <span className="db-acct-name">{a.accountName}</span>
                    <span className="db-acct-bal pos">{Rs(Math.abs(a.balance||0))}</span>
                  </div>
                ))}
                {loanGivenAccounts.length > 4 && (
                  <button className="db-expand-btn" onClick={() => setShowLoanOut(v=>!v)}>
                    {showLoanOut ? "▲ Less" : `▼ +${loanGivenAccounts.length-4} more`}
                  </button>
                )}
              </>
            )}
            {!loading && loanGivenAccounts.length === 0 && (
              <p style={{fontSize:11.5,color:"var(--oc-silver)",marginTop:6}}>No loan given accounts. Label accounts "Loan Given" to see here.</p>
            )}
          </div>

          {/* Loans Taken */}
          <div className="db-card">
            <div className="db-card-accent" style={{ background:"linear-gradient(90deg,#ef4444,#b91c1c)" }}/>
            <p className="db-lbl">Loan Taken</p>
            {loading ? <div className="db-sk" style={{width:"55%",height:20}}/> : (
              <p className="db-val red">{Rs(totalLoanTaken)}</p>
            )}
            <p className="db-sub">{loanTakenAccounts.length} account{loanTakenAccounts.length!==1?"s":""}</p>
            {!loading && loanTakenAccounts.length > 0 && (
              <>
                {(showLoanIn ? loanTakenAccounts : loanTakenAccounts.slice(0,4)).map(a => (
                  <div key={a._id} className="db-acct-row" style={{fontSize:11.5}}>
                    <span className="db-acct-name">{a.accountName}</span>
                    <span className="db-acct-bal neg">{Rs(Math.abs(a.balance||0))}</span>
                  </div>
                ))}
                {loanTakenAccounts.length > 4 && (
                  <button className="db-expand-btn" onClick={() => setShowLoanIn(v=>!v)}>
                    {showLoanIn ? "▲ Less" : `▼ +${loanTakenAccounts.length-4} more`}
                  </button>
                )}
              </>
            )}
            {!loading && loanTakenAccounts.length === 0 && (
              <p style={{fontSize:11.5,color:"var(--oc-silver)",marginTop:6}}>No loan taken accounts. Label accounts "Loan Taken" to see here.</p>
            )}
          </div>
        </div>

        {/* ══ SECTION 5: Operations ════════════════════════════════════════ */}
        <p className="db-sec">Operations</p>
        <div className="db-grid-2">

          {/* Pending Cheques */}
          <div className="db-card">
            <div className="db-card-accent" style={{ background:"linear-gradient(90deg,#334455,#212A37)" }}/>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div>
                <p className="db-lbl" style={{margin:0}}>Pending Cheques</p>
                {loading ? <div className="db-sk" style={{width:"50%",height:18,marginTop:6}}/> : (
                  <p className="db-val navy" style={{marginTop:4}}>{Rs(pendingChequeTotal)}</p>
                )}
              </div>
              {!loading && (
                <div style={{textAlign:"right"}}>
                  <span style={{
                    fontFamily:"'DM Mono',monospace", fontSize:22, fontWeight:600,
                    color: cheques.length > 0 ? "#b91c1c" : "#15803d"
                  }}>{cheques.length}</span>
                  <p style={{fontSize:10,color:"var(--oc-silver)",margin:0}}>issued</p>
                </div>
              )}
            </div>
            {!loading && cheques.length === 0 && (
              <p style={{fontSize:12,color:"var(--oc-silver)"}}>✓ No pending cheques</p>
            )}
            {!loading && cheques.length > 0 && (
              <>
                {(showChequeList ? cheques : cheques.slice(0,4)).map(c => (
                  <div key={c._id} className="db-cheque-row">
                    <span className="db-cheque-no">#{c.chequeNo}</span>
                    <span className="db-cheque-name">{c.payeeAccountName}</span>
                    <span className="db-cheque-amt">{Rs(c.amount)}</span>
                    <span style={{
                      fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:4,
                      background:"#fef3c7", color:"#92400e",
                    }}>ISSUED</span>
                  </div>
                ))}
                {cheques.length > 4 && (
                  <button className="db-expand-btn" onClick={() => setShowChequeList(v=>!v)}>
                    {showChequeList ? "▲ Less" : `▼ +${cheques.length-4} more pending`}
                  </button>
                )}
              </>
            )}
          </div>

          {/* Weight Bridge */}
          <div className="db-card">
            <div className="db-card-accent" style={{ background:"linear-gradient(90deg,#b45309,#C9A85A)" }}/>
            <p className="db-lbl">Weight Bridge</p>
            {loading ? <div className="db-sk" style={{width:"55%",height:20}}/> : (
              <p className="db-val gold">{Rs(wbActualEarning)}</p>
            )}
            <p className="db-sub">{wbCompleted.length} completed entry{wbCompleted.length!==1?"ies":"y"} · {wbEntries.length - wbCompleted.length} pending</p>
            {!loading && wbCompleted.length > 0 && (
              <div style={{marginTop:12}}>
                {/* Breakdown by vehicle type */}
                {(() => {
                  const byType = {};
                  wbCompleted.forEach(e => {
                    byType[e.vehicleType] = (byType[e.vehicleType]||0) + (e.rate||0);
                  });
                  const types = Object.entries(byType).sort((a,b) => b[1]-a[1]).slice(0,4);
                  const max = Math.max(...types.map(t => t[1]), 1);
                  return types.map(([type, total]) => (
                    <div key={type} className="db-chart-bar-row">
                      <span style={{fontSize:10,color:"var(--oc-mid)",minWidth:80,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{type}</span>
                      <div className="db-chart-bar-track">
                        <div className="db-chart-bar-fill"
                          style={{width:`${Math.round(total/max*100)}%`, background:"var(--oc-gold)"}}/>
                      </div>
                      <span className="db-chart-bar-val">{Rs(total)}</span>
                    </div>
                  ));
                })()}
              </div>
            )}
          </div>
        </div>

        {/* Bottom spacer */}
        <div style={{ height: 32 }}/>
      </div>
    </SidebarLayout>
  );
}