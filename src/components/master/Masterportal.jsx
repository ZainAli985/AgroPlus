// src/components/master/MasterPortal.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { FONTS, CSS, Toast, Spin } from "./masterStyles.jsx";
import MasterDashboard from "./Masterdashboard.jsx";
import MasterAdmins    from "./Masteradmins.jsx";
import MasterAnalytics from "./Masteranalytics.jsx";
import MasterPackages  from "./Masterpackages.jsx";
import MasterRegister  from "./Masterregister.jsx";
import MasterSupport   from "./Mastersupport.jsx";

const getToken  = () => localStorage.getItem("token");
const authHdr   = () => ({ Authorization:`Bearer ${getToken()}`, "Content-Type":"application/json" });
export const authFetch = (url, opts={}) =>
  fetch(url, { ...opts, headers:{ ...authHdr(), ...(opts.headers||{}) } });

const NAV_ITEMS = [
  {
    id:"dashboard", label:"Dashboard",
    icon:<svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x={3} y={3} width={7} height={7} rx={1}/><rect x={14} y={3} width={7} height={7} rx={1}/><rect x={3} y={14} width={7} height={7} rx={1}/><rect x={14} y={14} width={7} height={7} rx={1}/></svg>,
  },
  {
    id:"register", label:"Register Mill",
    icon:<svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>,
  },
  {
    id:"admins", label:"Mill Admins",
    icon:<svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  },
  {
    id:"packages", label:"Packages",
    icon:<svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>,
  },
  {
    id:"analytics", label:"Analytics",
    icon:<svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
  },
  {
    id:"support", label:"Support", badgeKey:"support",
    icon:<svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  },
];

export default function MasterPortal() {
  const navigate = useNavigate();
  const [section,   setSection]   = useState("dashboard");
  const [mills,     setMills]     = useState([]);
  const [packages,  setPackages]  = useState([]);
  const [stats,     setStats]     = useState({ total:0, pending:0, approved:0, restricted:0 });
  const [loading,   setLoading]   = useState(true);
  const [filter,    setFilter]    = useState("all");
  const [search,    setSearch]    = useState("");
  const [badges,    setBadges]    = useState({ support:0 });
  const [toast,     setToast]     = useState(null);
  const searchRef = useRef(null);

  const showToast = useCallback((msg, ok=true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3800);
  }, []);

  const fetchMills = useCallback(async (q = search, f = filter) => {
    setLoading(true);
    try {
      const p = new URLSearchParams();
      if (f !== "all")  p.set("status", f);
      if (q?.trim())    p.set("search", q.trim());
      const r = await authFetch(`${API_BASE_URL}/master/mills?${p}`);
      if (r.status === 401 || r.status === 403) { localStorage.clear(); navigate("/"); return; }
      const d = await r.json();
      setMills(d.mills || []);
      setStats(d.stats || {});
    } catch { showToast("Failed to load mills", false); }
    setLoading(false);
  }, [filter, navigate, showToast]);

  const fetchPackages = useCallback(async () => {
    try {
      const r = await authFetch(`${API_BASE_URL}/master/packages`);
      const d = await r.json();
      setPackages(d.packages || []);
    } catch { /* silent */ }
  }, []);

  const fetchBadges = useCallback(async () => {
    try {
      const r = await authFetch(`${API_BASE_URL}/master/support?status=open`);
      const d = await r.json();
      setBadges(b => ({ ...b, support: d.stats?.open || 0 }));
    } catch { /* silent */ }
  }, []);

  // Initial load
  useEffect(() => { fetchMills(); fetchPackages(); fetchBadges(); }, []);

  // Filter change
  useEffect(() => { fetchMills(search, filter); }, [filter]);

  // Search debounce
  useEffect(() => {
    clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => fetchMills(search, filter), 350);
    return () => clearTimeout(searchRef.current);
  }, [search]);

  // Auto-refresh
  useEffect(() => {
    const iv = setInterval(() => { fetchMills(search, filter); fetchBadges(); }, 45000);
    return () => clearInterval(iv);
  }, [filter, search]);

  const doAction = useCallback(async (millId, action, body = {}) => {
    try {
      const method = action === "delete" ? "DELETE" : "POST";
      const url    = action === "delete"
        ? `${API_BASE_URL}/master/mills/${millId}`
        : `${API_BASE_URL}/master/mills/${millId}/${action}`;
      const r  = await authFetch(url, { method, body: method === "POST" ? JSON.stringify(body) : undefined });
      const d  = await r.json();
      if (!r.ok) throw new Error(d.message);
      showToast(d.message || "Done ✓", true);
      fetchMills(search, filter);
      return true;
    } catch (e) { showToast(e.message, false); return false; }
  }, [search, filter, fetchMills, showToast]);

  const sharedProps = {
    mills, stats, packages, loading, filter, setFilter, search, setSearch,
    authFetch, showToast, doAction, fetchMills, fetchPackages,
  };

  return (
    <>
      <style>{FONTS}{CSS}</style>
      <div className="mp">

        {/* ── Top Bar ── */}
        <header className="mp-bar">
          <div className="mp-logo">
            <span className="mp-logo-g">Agro</span>
            <span className="mp-logo-p">Plus</span>
            <span className="mp-logo-p">+</span>
          </div>
          <div className="mp-chip">Master Portal</div>
          <div className="mp-bar-sep"/>
          <div className="mp-bar-sub">ORCA TECH. AND VENTURES</div>
          <button className="mp-bar-btn mp-bar-out" onClick={() => { localStorage.clear(); navigate("/"); }}>
            Sign Out
          </button>
        </header>

        <div className="mp-body">

          {/* ── Sidebar ── */}
          <aside className="mp-side">
            <div className="mp-side-lbl">Navigation</div>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                className={`mp-nav${section === item.id ? " on" : ""}`}
                onClick={() => setSection(item.id)}
              >
                <span className="mp-nav-ico">{item.icon}</span>
                <span style={{ flex:1 }}>{item.label}</span>
                {item.badgeKey && (badges[item.badgeKey] || 0) > 0 && (
                  <span className="mp-nav-badge red">{badges[item.badgeKey]}</span>
                )}
              </button>
            ))}

            <div className="mp-side-lbl" style={{ marginTop:16 }}>Tools</div>
            <button className="mp-nav" onClick={async () => {
              const r = await authFetch(`${API_BASE_URL}/master/send-reminders`, { method:"POST" });
              const d = await r.json();
              showToast(d.message || "Done", r.ok);
            }}>
              <span className="mp-nav-ico">
                <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
              </span>
              Send Reminders
            </button>
            <button className="mp-nav" onClick={() => fetchMills(search, filter)}>
              <span className="mp-nav-ico">
                <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
              </span>
              {loading ? <><Spin/> Refreshing</> : "Refresh Data"}
            </button>

            <div className="mp-side-foot">
              ORCA TECH. AND VENTURES<br/>
              <span style={{ color:"#d1d5db" }}>© {new Date().getFullYear()} Agro Plus</span>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <main className="mp-main">
            {section === "dashboard"  && <MasterDashboard  {...sharedProps} onRegister={() => setSection("register")}/>}
            {section === "register"   && <MasterRegister   {...sharedProps} onCreated={() => { fetchMills(); setSection("dashboard"); }}/>}
            {section === "admins"     && <MasterAdmins     {...sharedProps}/>}
            {section === "packages"   && <MasterPackages   {...sharedProps}/>}
            {section === "analytics"  && <MasterAnalytics  {...sharedProps}/>}
            {section === "support"    && <MasterSupport    {...sharedProps} onBadgeUpdate={fetchBadges}/>}
          </main>
        </div>

        {toast && <Toast msg={toast.msg} ok={toast.ok}/>}
      </div>
    </>
  );
}