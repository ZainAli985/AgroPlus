import React, { useEffect, useState, useMemo, useCallback } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import { authFetch } from "../../utils/authFetch.js";

// ── Design tokens ─────────────────────────────────────────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;

const CSS = `
  .pl-root { font-family: 'Plus Jakarta Sans', sans-serif; }
  .pl-mono { font-family: 'IBM Plex Mono', monospace; }

  /* Stat cards */
  .pl-stat {
    background: #fff; border: 1.5px solid #e8eaf0; border-radius: 14px;
    padding: 16px 20px; display: flex; flex-direction: column; gap: 4px;
    position: relative; overflow: hidden;
  }
  .pl-stat::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    border-radius: 14px 14px 0 0;
  }
  .pl-stat.active-stat::before  { background: linear-gradient(90deg, #22c55e, #16a34a); }
  .pl-stat.total-stat::before   { background: linear-gradient(90deg, #6366f1, #8b5cf6); }
  .pl-stat.pending-stat::before { background: linear-gradient(90deg, #f59e0b, #d97706); }

  /* Type filter pills */
  .pl-type-pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600;
    border: 1.5px solid #e2e8f0; background: #fff; color: #64748b;
    cursor: pointer; transition: all .12s; font-family: 'Plus Jakarta Sans', sans-serif;
    white-space: nowrap;
  }
  .pl-type-pill:hover { border-color: #94a3b8; color: #334155; }
  .pl-type-pill.active { color: var(--tc); border-color: var(--tc); background: var(--tbg); }

  /* Variety card */
  .pl-variety {
    background: #fff; border: 1.5px solid #e8eaf0; border-radius: 14px;
    overflow: hidden; transition: box-shadow .15s;
  }
  .pl-variety:hover { box-shadow: 0 4px 20px rgba(0,0,0,.06); }
  .pl-variety.has-active { border-color: #bbf7d0; }

  .pl-variety-head {
    display: flex; align-items: center; gap: 12px; padding: 12px 16px;
    cursor: pointer; border: none; background: none; width: 100%;
    text-align: left; transition: background .1s;
  }
  .pl-variety-head:hover { background: #fafafa; }

  /* Progress bar */
  .pl-progress-track {
    flex: 1; height: 5px; background: #f1f5f9; border-radius: 10px; overflow: hidden;
    min-width: 60px; max-width: 120px;
  }
  .pl-progress-fill {
    height: 100%; border-radius: 10px; transition: width .4s cubic-bezier(.4,0,.2,1);
    background: linear-gradient(90deg, #22c55e, #16a34a);
  }

  /* Product table */
  .pl-table { width: 100%; border-collapse: collapse; }
  .pl-table thead th {
    padding: 8px 14px; font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: #94a3b8; background: #f8fafc;
    text-align: left; border-bottom: 1px solid #f1f5f9; white-space: nowrap;
  }
  .pl-table thead th:last-child { text-align: right; }
  .pl-table tbody tr {
    border-bottom: 1px solid #f8fafc; transition: background .08s;
  }
  .pl-table tbody tr:last-child { border-bottom: none; }
  .pl-table tbody tr:hover { background: #fafafa; }
  .pl-table tbody tr.row-active { background: linear-gradient(90deg, #f0fdf480, transparent 60%); }
  .pl-table tbody td { padding: 9px 14px; font-size: 12.5px; color: #334155; }
  .pl-table tbody td:last-child { text-align: right; }

  /* Activate button */
  .pl-btn-activate {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 5px 12px; border-radius: 7px; font-size: 11px; font-weight: 700;
    background: #f0fdf4; color: #15803d; border: 1.5px solid #86efac;
    cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; transition: all .12s;
    white-space: nowrap;
  }
  .pl-btn-activate:hover:not(:disabled) { background: #dcfce7; border-color: #4ade80; }
  .pl-btn-activate:disabled { opacity: .5; cursor: not-allowed; }
  .pl-btn-activate.loading { background: #f8fafc; color: #94a3b8; border-color: #e2e8f0; }

  .pl-badge-active {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 4px 10px; border-radius: 7px; font-size: 11px; font-weight: 700;
    background: #f0fdf4; color: #16a34a; border: 1.5px solid #bbf7d0;
    font-family: 'IBM Plex Mono', monospace;
  }

  /* Activate-all button */
  .pl-btn-activate-all {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 10px; border-radius: 7px; font-size: 10.5px; font-weight: 700;
    background: transparent; color: #6366f1; border: 1.5px solid #c7d2fe;
    cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; transition: all .12s;
    white-space: nowrap;
  }
  .pl-btn-activate-all:hover { background: #eef2ff; }

  /* Account chip */
  .pl-account-chip {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 2px 7px; border-radius: 5px; font-size: 10px; font-weight: 600;
    background: #eef2ff; color: #6366f1; border: 1px solid #c7d2fe;
    font-family: 'IBM Plex Mono', monospace; max-width: 180px;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }

  /* Slide animation */
  @keyframes pl-slide-down {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .pl-table-wrap { animation: pl-slide-down .15s ease both; }

  @keyframes pl-spin { to { transform: rotate(360deg); } }
  .pl-spinner {
    width: 24px; height: 24px; border: 2.5px solid #e2e8f0;
    border-top-color: #6366f1; border-radius: 50%;
    animation: pl-spin .65s linear infinite;
  }

  /* Search highlight */
  .pl-highlight { background: #fef08a; border-radius: 2px; padding: 0 1px; }
`;

// ── Type config ───────────────────────────────────────────────────────────────
const TYPE_ORDER = ["Rice", "Broken", "Paddy", "Polish", "Phukar"];
const TYPE_CONFIG = {
  Rice:   { color:"#1d4ed8", bg:"#dbeafe", dot:"#3b82f6", emoji:"🌾" },
  Broken: { color:"#6d28d9", bg:"#ede9fe", dot:"#8b5cf6", emoji:"🍚" },
  Paddy:  { color:"#15803d", bg:"#dcfce7", dot:"#22c55e", emoji:"🌿" },
  Polish: { color:"#c2410c", bg:"#ffedd5", dot:"#f97316", emoji:"✨" },
  Phukar: { color:"#b91c1c", bg:"#fee2e2", dot:"#ef4444", emoji:"🍃" },
};
const SUBTYPE_STYLE = {
  "Brown":                     { bg:"#fef9c3", color:"#854d0e", border:"#fde68a" },
  "White (Raw)":               { bg:"#f8fafc", color:"#334155", border:"#e2e8f0" },
  "White (Double Polish)":     { bg:"#e0f2fe", color:"#0369a1", border:"#bae6fd" },
  "White (Silky-Water Polish)":{ bg:"#dbeafe", color:"#1e40af", border:"#bfdbfe" },
  "Steamed":                   { bg:"#ecfdf5", color:"#065f46", border:"#6ee7b7" },
  "Sella (Creamy)":            { bg:"#fef3c7", color:"#92400e", border:"#fde68a" },
  "Sella (Golden)":            { bg:"#fef9c3", color:"#713f12", border:"#fcd34d" },
};

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ProductsList() {
  const [products,     setProducts]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [seeding,      setSeeding]      = useState(false);
  const [togglingId,   setTogglingId]   = useState(null);
  const [bulkingVar,   setBulkingVar]   = useState(null); // variety being bulk-activated
  const [search,       setSearch]       = useState("");
  const [typeFilter,   setTypeFilter]   = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [notification, setNotification] = useState({ message:"", type:"info" });

  const notify = (msg, t="success") => setNotification({ message:msg, type:t });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res  = await authFetch(`${API_BASE_URL}/products`);
      const data = await res.json();
      if (data.success) {
        if (data.products.length === 0) { await doSeed(true); }
        else { setProducts(data.products); }
      }
    } catch { notify("Failed to load products.", "error"); }
    finally { setLoading(false); }
  };

  const doSeed = async (silent=false) => {
    setSeeding(true);
    try {
      const res  = await authFetch(`${API_BASE_URL}/products/seed`, { method:"POST" });
      const data = await res.json();
      if (data.success) {
        if (!silent) notify(data.message);
        const r2 = await authFetch(`${API_BASE_URL}/products`);
        const d2 = await r2.json();
        if (d2.success) setProducts(d2.products);
      } else { notify(data.message || "Seed failed.", "error"); }
    } catch { notify("Seed error.", "error"); }
    finally { setSeeding(false); }
  };

  const handleActivate = useCallback(async (product) => {
    if (product.isActive) return;
    setTogglingId(product._id);
    try {
      const res  = await authFetch(`${API_BASE_URL}/products/${product._id}/activate`, { method:"PATCH" });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.map(p => p._id === product._id ? { ...p, ...data.product } : p));
        notify(data.message);
      } else { notify(data.message || "Failed.", "error"); }
    } catch { notify("Server error.", "error"); }
    finally { setTogglingId(null); }
  }, []);

  const handleActivateAll = useCallback(async (variety, inactiveProducts) => {
    if (!inactiveProducts.length) return;
    setBulkingVar(variety);
    for (const p of inactiveProducts) {
      try {
        const res  = await authFetch(`${API_BASE_URL}/products/${p._id}/activate`, { method:"PATCH" });
        const data = await res.json();
        if (data.success)
          setProducts(prev => prev.map(q => q._id === p._id ? { ...q, ...data.product } : q));
      } catch {}
    }
    notify(`All ${variety} products activated!`);
    setBulkingVar(null);
  }, []);

  useEffect(() => { fetchProducts(); }, []);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const totalActive   = products.filter(p => p.isActive).length;
  const totalPending  = products.length - totalActive;

  // ── Filter & group ────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = products;
    if (typeFilter)                    list = list.filter(p => p.type === typeFilter);
    if (statusFilter === "active")     list = list.filter(p =>  p.isActive);
    if (statusFilter === "inactive")   list = list.filter(p => !p.isActive);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(p =>
        p.variety?.toLowerCase().includes(q) ||
        p.productName?.toLowerCase().includes(q) ||
        p.type?.toLowerCase().includes(q) ||
        p.subType?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, typeFilter, statusFilter, search]);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const p of filtered) {
      if (!map.has(p.variety)) map.set(p.variety, []);
      map.get(p.variety).push(p);
    }
    for (const [, arr] of map) {
      arr.sort((a, b) => {
        const ti = TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type);
        return ti !== 0 ? ti : (a.subType||"").localeCompare(b.subType||"");
      });
    }
    return map;
  }, [filtered]);

  const varieties = [...grouped.keys()];
  const hasSearch  = search || typeFilter || statusFilter;

  return (
    <>
      <SidebarLayout>
        <style>{FONTS}{CSS}</style>
        <div className="pl-root">

          {/* ── Header ── */}
          <div style={{ marginBottom:20 }}>
            <p style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase",
              color:"#94a3b8", margin:"0 0 4px" }}>Mill Catalogue</p>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
              <h1 style={{ margin:0, fontSize:24, fontWeight:800, color:"#0f172a", letterSpacing:"-.4px" }}>
                Products
              </h1>
              <button onClick={() => doSeed(false)} disabled={seeding}
                style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 14px",
                  borderRadius:9, border:"1.5px solid #e2e8f0", background: seeding?"#f8fafc":"#0f172a",
                  color: seeding?"#94a3b8":"#fff", fontSize:12, fontWeight:700,
                  cursor: seeding?"not-allowed":"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif",
                  transition:"all .12s" }}>
                <span style={{ display:"inline-block", fontSize:13 }}>↻</span>
                {seeding ? "Seeding…" : "Re-seed Catalogue"}
              </button>
            </div>
          </div>

          {/* ── Stat Cards ── */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:20 }}>
            <div className="pl-stat total-stat">
              <span style={{ fontSize:11, fontWeight:700, color:"#94a3b8", letterSpacing:".06em", textTransform:"uppercase" }}>Total Products</span>
              <span className="pl-mono" style={{ fontSize:28, fontWeight:600, color:"#0f172a", lineHeight:1 }}>{products.length}</span>
              <span style={{ fontSize:11, color:"#94a3b8" }}>across {new Set(products.map(p=>p.variety)).size} varieties</span>
            </div>
            <div className="pl-stat active-stat">
              <span style={{ fontSize:11, fontWeight:700, color:"#94a3b8", letterSpacing:".06em", textTransform:"uppercase" }}>Activated</span>
              <span className="pl-mono" style={{ fontSize:28, fontWeight:600, color:"#16a34a", lineHeight:1 }}>{totalActive}</span>
              <span style={{ fontSize:11, color:"#94a3b8" }}>
                {products.length > 0 ? Math.round(totalActive/products.length*100) : 0}% of catalogue
              </span>
            </div>
            <div className="pl-stat pending-stat">
              <span style={{ fontSize:11, fontWeight:700, color:"#94a3b8", letterSpacing:".06em", textTransform:"uppercase" }}>Pending</span>
              <span className="pl-mono" style={{ fontSize:28, fontWeight:600, color:"#d97706", lineHeight:1 }}>{totalPending}</span>
              <span style={{ fontSize:11, color:"#94a3b8" }}>not yet activated</span>
            </div>
          </div>

          {/* ── Type quick-filter pills ── */}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:14 }}>
            <button className={`pl-type-pill${typeFilter===""?" active":""}`}
              style={{ "--tc":"#0f172a", "--tbg":"#f1f5f9" }}
              onClick={() => setTypeFilter("")}>
              All Types
            </button>
            {TYPE_ORDER.map(t => {
              const cfg = TYPE_CONFIG[t];
              const count = products.filter(p => p.type === t).length;
              const activeC = products.filter(p => p.type === t && p.isActive).length;
              return (
                <button key={t}
                  className={`pl-type-pill${typeFilter===t?" active":""}`}
                  style={{ "--tc": cfg.color, "--tbg": cfg.bg }}
                  onClick={() => setTypeFilter(typeFilter===t ? "" : t)}>
                  <span>{cfg.emoji}</span>
                  {t}
                  <span className="pl-mono" style={{ fontSize:9, opacity:.7 }}>{activeC}/{count}</span>
                </button>
              );
            })}
          </div>

          {/* ── Filter bar ── */}
          <div style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:12,
            padding:"10px 14px", marginBottom:16, display:"flex", flexWrap:"wrap", gap:8, alignItems:"center" }}>
            <div style={{ position:"relative", flex:1, minWidth:200 }}>
              <svg style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#94a3b8",pointerEvents:"none" }}
                width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"/>
              </svg>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search variety, type, sub-type…"
                style={{ width:"100%", padding:"7px 10px 7px 30px", border:"1.5px solid #e2e8f0",
                  borderRadius:8, fontSize:12.5, outline:"none", fontFamily:"inherit",
                  transition:".12s" }}/>
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              style={{ padding:"7px 10px", border:"1.5px solid #e2e8f0", borderRadius:8,
                fontSize:12.5, outline:"none", background:"#fff", fontFamily:"inherit" }}>
              <option value="">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Not Yet Activated</option>
            </select>
            {hasSearch && (
              <button onClick={() => { setSearch(""); setTypeFilter(""); setStatusFilter(""); }}
                style={{ padding:"7px 12px", border:"1.5px solid #fecaca", borderRadius:8,
                  background:"#fef2f2", fontSize:12, fontWeight:600, color:"#dc2626", cursor:"pointer",
                  fontFamily:"inherit" }}>
                Clear ✕
              </button>
            )}
            <span className="pl-mono" style={{ marginLeft:"auto", fontSize:11, color:"#94a3b8" }}>
              {filtered.length} products · {varieties.length} varieties
            </span>
          </div>

          {/* ── Content ── */}
          {loading ? (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"60px 0", gap:14 }}>
              <div className="pl-spinner"/>
              <p style={{ color:"#94a3b8", fontSize:13 }}>Loading catalogue…</p>
            </div>
          ) : varieties.length === 0 ? (
            <div style={{ textAlign:"center", padding:"60px 0" }}>
              <div style={{ fontSize:40, marginBottom:12 }}>🌾</div>
              <p style={{ fontSize:14, fontWeight:700, color:"#334155", margin:"0 0 4px" }}>
                {hasSearch ? "No products match your filters" : "No products found"}
              </p>
              <p style={{ fontSize:12, color:"#94a3b8" }}>
                {hasSearch ? "Try clearing your filters" : "Click Re-seed Catalogue to load products"}
              </p>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {varieties.map(variety => {
                const group     = grouped.get(variety);
                const activeC   = group.filter(p => p.isActive).length;
                const inactiveP = group.filter(p => !p.isActive);
                return (
                  <VarietyCard
                    key={variety}
                    variety={variety}
                    products={group}
                    activeCount={activeC}
                    inactiveProducts={inactiveP}
                    togglingId={togglingId}
                    isBulking={bulkingVar === variety}
                    searchQ={search.trim().toLowerCase()}
                    onActivate={handleActivate}
                    onActivateAll={handleActivateAll}
                    autoExpand={!!search.trim()}
                  />
                );
              })}
            </div>
          )}

        </div>
      </SidebarLayout>
      <Notification message={notification.message} type={notification.type}
        onClose={() => setNotification({ message:"", type:"info" })} />
    </>
  );
}

// ── Variety Card ──────────────────────────────────────────────────────────────
function VarietyCard({ variety, products, activeCount, inactiveProducts,
  togglingId, isBulking, searchQ, onActivate, onActivateAll, autoExpand }) {
  const [expanded, setExpanded] = useState(false);
  const total     = products.length;
  const pct       = total > 0 ? Math.round(activeCount / total * 100) : 0;
  const allActive = activeCount === total;

  // Auto-expand when search active
  useEffect(() => {
    if (autoExpand) setExpanded(true);
    else setExpanded(false);
  }, [autoExpand]);

  return (
    <div className={`pl-variety${activeCount > 0 ? " has-active" : ""}`}>
      {/* Header row */}
      <button className="pl-variety-head" onClick={() => setExpanded(e => !e)}>
        {/* Variety name */}
        <span style={{ flex:1, fontSize:13.5, fontWeight:700, color:"#0f172a", textAlign:"left" }}>
          {variety}
        </span>

        {/* Progress bar + label */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginRight:8 }}>
          <div className="pl-progress-track">
            <div className="pl-progress-fill" style={{ width:`${pct}%` }}/>
          </div>
          <span className="pl-mono" style={{ fontSize:10.5, color: allActive?"#16a34a":"#94a3b8",
            fontWeight:600, minWidth:42, textAlign:"right" }}>
            {activeCount}/{total}
          </span>
        </div>

        {/* Activate All button */}
        {!allActive && expanded && (
          <button className="pl-btn-activate-all"
            onClick={e => { e.stopPropagation(); onActivateAll(variety, inactiveProducts); }}
            disabled={isBulking}
            style={{ marginRight:8 }}>
            {isBulking ? (
              <><span style={{ display:"inline-block", animation:"pl-spin .65s linear infinite",
                border:"2px solid #c7d2fe", borderTopColor:"#6366f1",
                borderRadius:"50%", width:10, height:10 }}/> Activating…</>
            ) : (
              <>⚡ Activate All</>
            )}
          </button>
        )}
        {allActive && (
          <span style={{ fontSize:10, fontWeight:700, color:"#16a34a", marginRight:8,
            background:"#f0fdf4", border:"1px solid #bbf7d0", padding:"2px 8px", borderRadius:20 }}>
            ✓ Complete
          </span>
        )}

        {/* Chevron */}
        <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={2.5}
          style={{ flexShrink:0, transition:"transform .2s", transform: expanded?"rotate(180deg)":"none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {/* Product table */}
      {expanded && (
        <div className="pl-table-wrap">
          <table className="pl-table">
            <thead>
              <tr>
                <th style={{ width:32 }}>#</th>
                <th>Type</th>
                <th>Sub-Type</th>
                <th>Account</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => {
                const tc  = TYPE_CONFIG[p.type] || { color:"#374151", bg:"#f3f4f6", dot:"#94a3b8" };
                const sbs = SUBTYPE_STYLE[p.subType];
                const tog = togglingId === p._id || isBulking;
                return (
                  <tr key={p._id} className={p.isActive ? "row-active" : ""}>
                    {/* Index */}
                    <td className="pl-mono" style={{ color:"#cbd5e1", fontSize:11 }}>
                      {String(i+1).padStart(2,"0")}
                    </td>

                    {/* Type */}
                    <td>
                      <span style={{
                        display:"inline-flex", alignItems:"center", gap:5,
                        padding:"3px 9px", borderRadius:20, fontSize:11, fontWeight:700,
                        background:tc.bg, color:tc.color, border:`1px solid ${tc.dot}44`,
                      }}>
                        <span style={{ width:5, height:5, borderRadius:"50%",
                          background:tc.dot, flexShrink:0 }}/>
                        {p.type}
                      </span>
                    </td>

                    {/* SubType */}
                    <td>
                      {p.subType ? (
                        <span style={{
                          display:"inline-block", padding:"2px 8px", borderRadius:20,
                          fontSize:11, fontWeight:600,
                          background:sbs?.bg||"#f3f4f6", color:sbs?.color||"#374151",
                          border:`1px solid ${sbs?.border||"#e2e8f0"}`,
                        }}>
                          {p.subType}
                        </span>
                      ) : (
                        <span style={{ fontSize:11, color:"#cbd5e1", fontStyle:"italic" }}>—</span>
                      )}
                    </td>

                    {/* Account chip */}
                    <td>
                      {p.isActive && p.linkedAccountId ? (
                        <span className="pl-account-chip">
                          <svg width={8} height={8} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                          </svg>
                          {p.linkedAccountId.accountName || p.productName}
                        </span>
                      ) : (
                        <span style={{ fontSize:11, color:"#e2e8f0" }}>—</span>
                      )}
                    </td>

                    {/* Action */}
                    <td>
                      {p.isActive ? (
                        <span className="pl-badge-active">
                          <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                          Active
                        </span>
                      ) : (
                        <button className={`pl-btn-activate${tog?" loading":""}`}
                          onClick={() => onActivate(p)} disabled={tog}>
                          {tog ? (
                            <span style={{ display:"inline-block", width:9, height:9,
                              border:"2px solid #e2e8f0", borderTopColor:"#94a3b8",
                              borderRadius:"50%", animation:"pl-spin .65s linear infinite" }}/>
                          ) : (
                            <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                          )}
                          {tog ? "Activating…" : "Activate"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}