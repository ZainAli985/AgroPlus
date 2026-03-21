import React, { useEffect, useState, useMemo } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import { authFetch } from "../../utils/authFetch.js";

// ── Helpers ───────────────────────────────────────────────────────────────────
const TYPE_ORDER = ["Rice", "Broken", "Paddy", "Polish", "Phukar"];

function typeDisplay(type) { return type; }

const TYPE_STYLE = {
  "Rice":        { bg: "#eff6ff", color: "#1d4ed8", dot: "#3b82f6" },
  "Broken": { bg: "#faf5ff", color: "#6d28d9", dot: "#8b5cf6" },
  "Paddy":       { bg: "#f0fdf4", color: "#15803d", dot: "#22c55e" },
  "Polish":      { bg: "#fff7ed", color: "#c2410c", dot: "#f97316" },
  "Phukar":      { bg: "#fef2f2", color: "#b91c1c", dot: "#ef4444" },
};

const SUBTYPE_BADGES = {
  "Brown":                    { bg: "#fef9c3", color: "#92400e" },
  "White (Raw)":              { bg: "#f1f5f9", color: "#334155" },
  "White (Double Polish)":    { bg: "#e0f2fe", color: "#0369a1" },
  "White (Silky-Water Polish)":{ bg: "#dbeafe", color: "#1e40af" },
  "Steamed":                  { bg: "#ecfdf5", color: "#065f46" },
  "Sella (Creamy)":           { bg: "#fef3c7", color: "#92400e" },
  "Sella (Golden)":           { bg: "#fef08a", color: "#713f12" },
};

// ── Main Component ────────────────────────────────────────────────────────────
export default function ProductsList() {
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [seeding, setSeeding]       = useState(false);
  const [togglingId, setTogglingId] = useState(null); // tracks in-flight activate only
  const [search, setSearch]         = useState("");
  const [typeFilter, setTypeFilter] = useState(""); // "", "Rice", "Broken", "Paddy", "Polish", "Phukar"
  const [statusFilter, setStatusFilter] = useState(""); // "", "active", "inactive"
  const [notification, setNotification] = useState({ message: "", type: "info" });

  const notify = (message, type = "success") => setNotification({ message, type });

  // Fetch + auto-seed if empty
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res  = await authFetch(`${API_BASE_URL}/products`);
      const data = await res.json();
      if (data.success) {
        if (data.products.length === 0) {
          // First load — seed the catalogue
          await handleSeed(true);
        } else {
          setProducts(data.products);
        }
      }
    } catch { notify("Failed to load products.", "error"); }
    finally { setLoading(false); }
  };

  const handleSeed = async (silent = false) => {
    setSeeding(true);
    try {
      const res  = await authFetch(`${API_BASE_URL}/products/seed`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        if (!silent) notify(data.message);
        // Reload
        const r2   = await authFetch(`${API_BASE_URL}/products`);
        const d2   = await r2.json();
        if (d2.success) setProducts(d2.products);
      } else { notify(data.message || "Seed failed.", "error"); }
    } catch { notify("Seed error.", "error"); }
    finally { setSeeding(false); }
  };

  const handleActivate = async (product) => {
    if (product.isActive) return; // already active — cannot deactivate
    setTogglingId(product._id);
    try {
      const res  = await authFetch(`${API_BASE_URL}/products/${product._id}/activate`, { method: "PATCH" });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.map(p => p._id === product._id ? { ...p, ...data.product } : p));
        notify(data.message);
      } else { notify(data.message || "Failed.", "error"); }
    } catch { notify("Server error.", "error"); }
    finally { setTogglingId(null); }
  };

  useEffect(() => { fetchProducts(); }, []);

  // ── Derived stats ──────────────────────────────────────────────────────────
  const totalActive   = products.filter(p => p.isActive).length;
  const totalInactive = products.length - totalActive;

  // ── Filtered + grouped ─────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = products;
    if (typeFilter)   list = list.filter(p => p.type === typeFilter);
    if (statusFilter === "active")   list = list.filter(p =>  p.isActive);
    if (statusFilter === "inactive") list = list.filter(p => !p.isActive);
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

  // Group by variety
  const grouped = useMemo(() => {
    const map = new Map();
    for (const p of filtered) {
      if (!map.has(p.variety)) map.set(p.variety, []);
      map.get(p.variety).push(p);
    }
    // Sort within each variety by TYPE_ORDER then subType
    for (const [, arr] of map) {
      arr.sort((a, b) => {
        const ti = TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type);
        if (ti !== 0) return ti;
        return (a.subType || "").localeCompare(b.subType || "");
      });
    }
    return map;
  }, [filtered]);

  const varieties = [...grouped.keys()];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <SidebarLayout>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20 }}>
          <div>
            <p style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#94a3b8", marginBottom:3 }}>
              Mill Catalogue
            </p>
            <h1 style={{ fontSize:22, fontWeight:800, color:"#0f172a", margin:0, letterSpacing:"-.3px" }}>
              Products
            </h1>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {/* Stats pills */}
            <span style={{ fontSize:11.5, fontWeight:700, padding:"4px 10px", borderRadius:20,
              background:"#f0fdf4", color:"#15803d", border:"1px solid #bbf7d0" }}>
              ✓ {totalActive} Active
            </span>
            <span style={{ fontSize:11.5, fontWeight:700, padding:"4px 10px", borderRadius:20,
              background:"#f8fafc", color:"#64748b", border:"1px solid #e2e8f0" }}>
              {totalInactive} Inactive
            </span>
            <button onClick={() => handleSeed(false)} disabled={seeding}
              style={{ fontSize:11.5, fontWeight:700, padding:"6px 12px", borderRadius:8,
                background: seeding ? "#f1f5f9" : "#0f172a", color: seeding ? "#94a3b8" : "#fff",
                border:"none", cursor: seeding ? "not-allowed" : "pointer", display:"flex",
                alignItems:"center", gap:5, transition:".12s" }}>
              {seeding ? "Seeding…" : "↻ Re-seed"}
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:12,
          padding:"10px 14px", marginBottom:16, display:"flex", flexWrap:"wrap", gap:8, alignItems:"center" }}>
          {/* Search */}
          <div style={{ position:"relative", flex:1, minWidth:200 }}>
            <svg style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)",
              color:"#94a3b8", pointerEvents:"none" }} width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"/>
            </svg>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search variety, type, sub-type…"
              style={{ width:"100%", padding:"7px 10px 7px 30px", border:"1.5px solid #e2e8f0",
                borderRadius:8, fontSize:12.5, outline:"none", fontFamily:"inherit" }}/>
          </div>
          {/* Type filter */}
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
            style={{ padding:"7px 10px", border:"1.5px solid #e2e8f0", borderRadius:8,
              fontSize:12.5, outline:"none", background:"#fff", fontFamily:"inherit" }}>
            <option value="">All Types</option>
            {TYPE_ORDER.map(t => <option key={t} value={t}>{typeDisplay(t)}</option>)}
          </select>
          {/* Status filter */}
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            style={{ padding:"7px 10px", border:"1.5px solid #e2e8f0", borderRadius:8,
              fontSize:12.5, outline:"none", background:"#fff", fontFamily:"inherit" }}>
            <option value="">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
          {(search || typeFilter || statusFilter) && (
            <button onClick={() => { setSearch(""); setTypeFilter(""); setStatusFilter(""); }}
              style={{ padding:"7px 10px", border:"1.5px solid #e2e8f0", borderRadius:8,
                background:"#fff", fontSize:12, fontWeight:600, color:"#64748b", cursor:"pointer" }}>
              Clear ✕
            </button>
          )}
          <span style={{ marginLeft:"auto", fontSize:11.5, color:"#94a3b8", fontWeight:600 }}>
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} · {varieties.length} variet{varieties.length !== 1 ? "ies" : "y"}
          </span>
        </div>

        {/* Loading */}
        {loading ? (
          <div style={{ display:"flex", justifyContent:"center", padding:"60px 0" }}>
            <div style={{ width:28, height:28, border:"3px solid #e2e8f0",
              borderTopColor:"#6366f1", borderRadius:"50%", animation:"pl-spin .7s linear infinite" }}/>
            <style>{`@keyframes pl-spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : varieties.length === 0 ? (
          <div style={{ textAlign:"center", padding:"60px 0", color:"#94a3b8" }}>
            <div style={{ fontSize:36, marginBottom:10 }}>🌾</div>
            <p style={{ fontSize:14, fontWeight:600 }}>No products found</p>
            <p style={{ fontSize:12 }}>Try adjusting your filters or click Re-seed</p>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {varieties.map(variety => {
              const group = grouped.get(variety);
              const activeCount = group.filter(p => p.isActive).length;
              return (
                <VarietyCard key={variety} variety={variety} products={group}
                  activeCount={activeCount} togglingId={togglingId}
                  onToggle={handleActivate} />
              );
            })}
          </div>
        )}
      </SidebarLayout>
      <Notification message={notification.message} type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })} />
    </>
  );
}

// ── Variety Card ──────────────────────────────────────────────────────────────
function VarietyCard({ variety, products, activeCount, togglingId, onToggle }) {
  const [expanded, setExpanded] = useState(false);
  const total = products.length;

  return (
    <div style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:12, overflow:"hidden" }}>
      {/* Variety Header */}
      <button onClick={() => setExpanded(e => !e)}
        style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 14px",
          background: activeCount > 0 ? "#f8fafc" : "#fafafa",
          border:"none", cursor:"pointer", textAlign:"left", borderBottom: expanded ? "1px solid #f1f5f9" : "none" }}>
        <span style={{ fontSize:16, flexShrink:0 }}>🌾</span>
        <span style={{ flex:1, fontSize:13.5, fontWeight:700, color:"#0f172a" }}>{variety}</span>
        {activeCount > 0 && (
          <span style={{ fontSize:10.5, fontWeight:700, padding:"2px 8px", borderRadius:20,
            background:"#dcfce7", color:"#15803d", border:"1px solid #bbf7d0" }}>
            {activeCount}/{total} active
          </span>
        )}
        {activeCount === 0 && (
          <span style={{ fontSize:10.5, fontWeight:600, color:"#cbd5e1" }}>
            {total} products
          </span>
        )}
        <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={2.5}
          style={{ flexShrink:0, transition:".2s", transform: expanded ? "rotate(180deg)" : "none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {/* Product rows */}
      {expanded && (
        <div>
          {products.map((p, i) => (
            <ProductRow key={p._id} product={p} isLast={i === products.length - 1}
              toggling={togglingId === p._id} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Product Row ───────────────────────────────────────────────────────────────
function ProductRow({ product, isLast, toggling, onToggle }) {
  const ts  = TYPE_STYLE[product.type]  || { bg:"#f3f4f6", color:"#374151", dot:"#9ca3af" };
  const sbs = SUBTYPE_BADGES[product.subType];
  const isActive = product.isActive;

  return (
    <div style={{
      display:"flex", alignItems:"center", gap:10, padding:"8px 14px",
      borderBottom: isLast ? "none" : "1px solid #f8fafc",
      background: isActive ? "linear-gradient(90deg, #f0fdf420, transparent)" : "transparent",
      transition:"background .15s",
    }}>
      {/* Active dot */}
      <span style={{ width:6, height:6, borderRadius:"50%", flexShrink:0,
        background: isActive ? "#22c55e" : "#e2e8f0" }} />

      {/* Type badge */}
      <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:10, fontWeight:700,
        padding:"2px 7px", borderRadius:20, background:ts.bg, color:ts.color,
        border:`1px solid ${ts.dot}33`, whiteSpace:"nowrap", flexShrink:0, minWidth:60 }}>
        <span style={{ width:5, height:5, borderRadius:"50%", background:ts.dot, flexShrink:0 }}/>
        {typeDisplay(product.type)}
      </span>

      {/* SubType or em-dash */}
      <span style={{ flex:1, fontSize:12, fontWeight: product.subType ? 600 : 400,
        color: product.subType ? "#374151" : "#cbd5e1" }}>
        {product.subType ? (
          <span style={{ display:"inline-block", padding:"1px 7px", borderRadius:20, fontSize:11,
            background: sbs?.bg || "#f3f4f6", color: sbs?.color || "#374151",
            border:"1px solid transparent", fontWeight:600 }}>
            {product.subType}
          </span>
        ) : (
          <span style={{ color:"#94a3b8", fontStyle:"italic", fontSize:11 }}>no subtype</span>
        )}
      </span>

      {/* Account name if active */}
      {isActive && product.linkedAccountId && (
        <span style={{ fontSize:10.5, color:"#6366f1", fontFamily:"monospace",
          background:"#eef2ff", padding:"1px 6px", borderRadius:5, border:"1px solid #c7d2fe",
          maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {product.linkedAccountId.accountName || product.productName}
        </span>
      )}

      {/* Activate button — one-way; once active it becomes a locked badge */}
      {isActive ? (
        <span style={{
          flexShrink:0, fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:7,
          background:"#f0fdf4", color:"#15803d", border:"1px solid #bbf7d0",
          display:"inline-flex", alignItems:"center", gap:4, whiteSpace:"nowrap"
        }}>
          <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
          Active
        </span>
      ) : (
        <button onClick={() => onToggle(product)} disabled={toggling}
          style={{
            flexShrink:0, fontSize:10.5, fontWeight:700, padding:"4px 12px", borderRadius:7,
            cursor: toggling ? "not-allowed" : "pointer",
            border:"none", transition:"all .12s",
            background: toggling ? "#f1f5f9" : "#f0fdf4",
            color:       toggling ? "#94a3b8" : "#15803d",
            outline:"1px solid #bbf7d0",
          }}>
          {toggling ? "…" : "Activate"}
        </button>
      )}
    </div>
  );
}