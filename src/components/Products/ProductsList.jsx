import React, { useEffect, useState, useMemo, useCallback } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import { authFetch } from "../../utils/authFetch.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  .pl *, .pl *::before, .pl *::after { box-sizing: border-box; }
  .pl { font-family: 'DM Sans', sans-serif; color: #111827; }
  .pl-mono { font-family: 'DM Mono', monospace; }

  .pl-stat {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; padding: 14px 16px;
    position: relative; overflow: hidden;
  }
  .pl-stat::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 3px;
  }
  .pl-stat.s-total::before  { background: #1f2937; }
  .pl-stat.s-active::before { background: #15803d; }
  .pl-stat.s-pending::before{ background: #d1d5db; }

  .pl-pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 12px; border-radius: 6px;
    font-size: 12px; font-weight: 500;
    border: 1px solid #e5e7eb; background: #fff; color: #6b7280;
    cursor: pointer; transition: all .1s; white-space: nowrap;
    font-family: 'DM Sans', sans-serif;
  }
  .pl-pill:hover { border-color: #9ca3af; color: #374151; }
  .pl-pill.on {
    background: var(--tc-bg); color: var(--tc);
    border-color: var(--tc-bd); font-weight: 600;
  }

  .pl-variety {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; overflow: hidden; transition: box-shadow .12s;
  }
  .pl-variety:hover { box-shadow: 0 2px 8px rgba(0,0,0,.06); }
  .pl-variety.v-live { border-left: 3px solid #15803d; }

  .pl-vhead {
    display: flex; align-items: center; gap: 12px;
    padding: 11px 16px; cursor: pointer;
    border: none; background: none; width: 100%; text-align: left;
    transition: background .1s;
  }
  .pl-vhead:hover { background: #f9fafb; }

  .pl-track { flex: 1; height: 3px; background: #e5e7eb; border-radius: 4px; overflow: hidden; min-width: 60px; max-width: 110px; }
  .pl-fill  { height: 100%; border-radius: 4px; background: #d1d5db; transition: width .4s; }
  .pl-fill.full { background: #15803d; }

  .pl-table { width: 100%; border-collapse: collapse; }
  .pl-table thead th {
    padding: 7px 14px; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .07em; color: #9ca3af;
    background: #f9fafb; text-align: left;
    border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb;
    font-family: 'DM Sans', sans-serif;
  }
  .pl-table thead th:last-child { text-align: right; }
  .pl-table tbody tr { border-bottom: 1px solid #f9fafb; transition: background .08s; }
  .pl-table tbody tr:last-child { border-bottom: none; }
  .pl-table tbody tr:hover { background: #fafafa; }
  .pl-table tbody tr.r-live { background: #f0fdf4; }
  .pl-table tbody tr.r-live:hover { background: #dcfce7; }
  .pl-table tbody td { padding: 9px 14px; font-size: 12.5px; color: #374151; vertical-align: middle; }
  .pl-table tbody td:last-child { text-align: right; }

  .pl-btn-act {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 11px; border-radius: 6px; font-size: 12px; font-weight: 500;
    background: #fff; color: #374151; border: 1px solid #d1d5db;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .1s;
  }
  .pl-btn-act:hover:not(:disabled) { background: #111827; color: #fff; border-color: #111827; }
  .pl-btn-act:disabled { opacity: .4; cursor: not-allowed; }

  .pl-badge-live {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 9px; border-radius: 5px; font-size: 12px; font-weight: 600;
    background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0;
    font-family: 'DM Mono', monospace;
  }

  .pl-btn-all {
    display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px;
    border-radius: 6px; font-size: 11.5px; font-weight: 500;
    background: #f9fafb; color: #374151; border: 1px solid #e5e7eb;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .1s;
  }
  .pl-btn-all:hover { background: #f3f4f6; border-color: #d1d5db; }

  .pl-acct {
    display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px;
    border-radius: 4px; font-size: 11px; font-weight: 500;
    background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;
    font-family: 'DM Mono', monospace; max-width: 180px;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }

  @keyframes pl-shimmer { to { background-position: -200% 0; } }
  .pl-skel {
    border-radius: 5px; height: 11px;
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    background-size: 200% 100%; animation: pl-shimmer 1.4s infinite;
  }
  @keyframes pl-slide { from { opacity:0; transform:translateY(-3px); } to { opacity:1; transform:translateY(0); } }
  .pl-slide { animation: pl-slide .14s ease both; }
  @keyframes pl-spin { to { transform: rotate(360deg); } }
  .pl-spin-ico { display: inline-block; animation: pl-spin .65s linear infinite; }
`;

const TYPE_ORDER = ["Rice","Broken","Paddy","Polish","Phukar"];

const TYPE_CFG = {
  Rice:   { color:"#1d4ed8", bg:"#eff6ff", bd:"#bfdbfe", dot:"#3b82f6" },
  Broken: { color:"#7c3aed", bg:"#f5f3ff", bd:"#ddd6fe", dot:"#8b5cf6" },
  Paddy:  { color:"#166534", bg:"#f0fdf4", bd:"#bbf7d0", dot:"#22c55e" },
  Polish: { color:"#c2410c", bg:"#fff7ed", bd:"#fed7aa", dot:"#f97316" },
  Phukar: { color:"#9f1239", bg:"#fff1f2", bd:"#fecdd3", dot:"#f43f5e" },
};

const SUBTYPE_CFG = {
  "Brown":                      { bg:"#fefce8", color:"#854d0e", bd:"#fde68a" },
  "White (Raw)":                { bg:"#f8fafc", color:"#475569", bd:"#e2e8f0" },
  "White (Double Polish)":      { bg:"#e0f2fe", color:"#0369a1", bd:"#bae6fd" },
  "White (Silky-Water Polish)": { bg:"#eff6ff", color:"#1e40af", bd:"#bfdbfe" },
  "Steamed":                    { bg:"#f0fdf4", color:"#065f46", bd:"#6ee7b7" },
  "Sella (Creamy)":             { bg:"#fefce8", color:"#92400e", bd:"#fde68a" },
  "Sella (Golden)":             { bg:"#fefce8", color:"#78350f", bd:"#fcd34d" },
};

function Hl({ text = "", q = "" }) {
  if (!q || !text.toLowerCase().includes(q.toLowerCase())) return <>{text}</>;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  return (
    <>{text.slice(0,i)}<mark style={{ background:"#fef08a", borderRadius:2, padding:"0 1px" }}>{text.slice(i,i+q.length)}</mark>{text.slice(i+q.length)}</>
  );
}

export default function ProductsList() {
  const [products,     setProducts]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [seeding,      setSeeding]      = useState(false);
  const [togglingId,   setTogglingId]   = useState(null);
  const [bulkingVar,   setBulkingVar]   = useState(null);
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
        if (!data.products.length) await doSeed(true);
        else setProducts(data.products);
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
      } else notify(data.message||"Seed failed.", "error");
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
        setProducts(prev => prev.map(p => p._id===product._id ? { ...p,...data.product } : p));
        notify(data.message);
      } else notify(data.message||"Failed.", "error");
    } catch { notify("Server error.", "error"); }
    finally { setTogglingId(null); }
  }, []);

  const handleActivateAll = useCallback(async (variety, inactiveList) => {
    if (!inactiveList.length) return;
    setBulkingVar(variety);
    for (const p of inactiveList) {
      try {
        const res  = await authFetch(`${API_BASE_URL}/products/${p._id}/activate`, { method:"PATCH" });
        const data = await res.json();
        if (data.success)
          setProducts(prev => prev.map(q => q._id===p._id ? { ...q,...data.product } : q));
      } catch {}
    }
    notify(`All ${variety} products activated!`);
    setBulkingVar(null);
  }, []);

  useEffect(() => { fetchProducts(); }, []);

  const totalActive  = products.filter(p => p.isActive).length;
  const totalPending = products.length - totalActive;

  const filtered = useMemo(() => {
    let list = products;
    if (typeFilter)                list = list.filter(p => p.type===typeFilter);
    if (statusFilter==="active")   list = list.filter(p => p.isActive);
    if (statusFilter==="inactive") list = list.filter(p => !p.isActive);
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
    for (const [, arr] of map)
      arr.sort((a,b) => {
        const ti = TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type);
        return ti !== 0 ? ti : (a.subType||"").localeCompare(b.subType||"");
      });
    return map;
  }, [filtered]);

  const varieties = [...grouped.keys()];
  const hasFilter = search || typeFilter || statusFilter;

  return (
    <>
      <SidebarLayout>
        <style>{FONTS}{CSS}</style>
        <div className="pl" style={{ maxWidth:960, margin:"0 auto" }}>

          {/* header */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:20 }}>
            <div>
              <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 3px" }}>Mill Products</p>
              <h1 style={{ margin:0, fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px" }}>
                Product Catalogue
              </h1>
            </div>
            <button
              onClick={() => doSeed(false)} disabled={seeding}
              style={{
                display:"flex", alignItems:"center", gap:7, padding:"8px 14px",
                borderRadius:7, border:"1px solid #e5e7eb",
                cursor:seeding?"not-allowed":"pointer",
                background:seeding?"#f9fafb":"#111827",
                color:seeding?"#9ca3af":"#fff",
                fontSize:12.5, fontWeight:500,
                fontFamily:"'DM Sans',sans-serif", transition:"background .1s",
              }}
              onMouseEnter={e=>{ if(!seeding) e.currentTarget.style.background="#1f2937"; }}
              onMouseLeave={e=>{ if(!seeding) e.currentTarget.style.background="#111827"; }}>
              <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                style={seeding?{animation:"pl-spin .8s linear infinite"}:{}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              {seeding ? "Seeding…" : "Re-seed Catalogue"}
            </button>
          </div>

          {/* stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:16 }}>
            {[
              { cls:"s-total",   label:"Total Products", val:products.length,
                note:`${new Set(products.map(p=>p.variety)).size} varieties`, color:"#111827" },
              { cls:"s-active",  label:"Activated",       val:totalActive,
                note:`${products.length>0?Math.round(totalActive/products.length*100):0}% complete`, color:"#15803d" },
              { cls:"s-pending", label:"Not Activated",   val:totalPending,
                note:"awaiting activation", color:"#6b7280" },
            ].map(s => (
              <div key={s.cls} className={`pl-stat ${s.cls}`}>
                <p style={{ margin:"0 0 5px", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af" }}>
                  {s.label}
                </p>
                <p className="pl-mono" style={{ margin:"0 0 3px", fontSize:22, fontWeight:700, color:s.color, lineHeight:1 }}>
                  {s.val}
                </p>
                <p style={{ margin:0, fontSize:11, color:"#9ca3af" }}>{s.note}</p>
              </div>
            ))}
          </div>

          {/* type pills */}
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
            <button
              className={`pl-pill${typeFilter===""?" on":""}`}
              style={{ "--tc":"#111827", "--tc-bg":"#f3f4f6", "--tc-bd":"#d1d5db" }}
              onClick={() => setTypeFilter("")}>
              All
            </button>
            {TYPE_ORDER.map(t => {
              const cfg = TYPE_CFG[t];
              const cnt = products.filter(p=>p.type===t).length;
              const act = products.filter(p=>p.type===t&&p.isActive).length;
              return (
                <button key={t}
                  className={`pl-pill${typeFilter===t?" on":""}`}
                  style={{ "--tc":cfg.color, "--tc-bg":cfg.bg, "--tc-bd":cfg.bd }}
                  onClick={() => setTypeFilter(typeFilter===t?"":t)}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:cfg.dot, flexShrink:0 }}/>
                  {t}
                  <span style={{ fontSize:10.5, opacity:.6, fontFamily:"'DM Mono',monospace" }}>{act}/{cnt}</span>
                </button>
              );
            })}
          </div>

          {/* search + filter */}
          <div style={{
            background:"#fff", border:"1px solid #e5e7eb", borderRadius:8,
            padding:"10px 12px", marginBottom:12,
            display:"flex", flexWrap:"wrap", gap:8, alignItems:"center",
          }}>
            <div style={{ position:"relative", flex:1, minWidth:200 }}>
              <svg style={{ position:"absolute", left:9, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}
                width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"/>
              </svg>
              <input
                value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search variety, type, sub-type…"
                style={{
                  width:"100%", padding:"7px 10px 7px 28px",
                  border:"1px solid #e5e7eb", borderRadius:7, fontSize:13,
                  outline:"none", fontFamily:"'DM Sans',sans-serif",
                  color:"#111827", background:"#f9fafb", transition:"all .12s",
                }}
                onFocus={e=>{ e.target.style.borderColor="#6b7280"; e.target.style.background="#fff"; }}
                onBlur={e=>{ e.target.style.borderColor="#e5e7eb"; e.target.style.background="#f9fafb"; }}
              />
            </div>
            <select
              value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}
              style={{
                padding:"7px 10px", border:"1px solid #e5e7eb", borderRadius:7,
                fontSize:13, outline:"none", background:"#f9fafb",
                fontFamily:"'DM Sans',sans-serif", color:"#374151", cursor:"pointer",
              }}>
              <option value="">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Pending Only</option>
            </select>
            {hasFilter && (
              <button
                onClick={() => { setSearch(""); setTypeFilter(""); setStatusFilter(""); }}
                style={{
                  padding:"7px 12px", borderRadius:7, border:"1px solid #fecaca",
                  background:"#fef2f2", fontSize:12.5, fontWeight:500, color:"#dc2626",
                  cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
                }}>
                Clear
              </button>
            )}
            <span style={{ marginLeft:"auto", fontSize:11.5, color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>
              {filtered.length} product{filtered.length!==1?"s":""}
              {varieties.length > 0 && ` · ${varieties.length} variet${varieties.length!==1?"ies":"y"}`}
            </span>
          </div>

          {/* content */}
          {loading ? (
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {[...Array(4)].map((_,i) => (
                <div key={i} style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, padding:16 }}>
                  <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:12 }}>
                    <div className="pl-skel" style={{ width:140 }}/>
                    <div className="pl-skel" style={{ width:60, marginLeft:"auto" }}/>
                  </div>
                  {[...Array(3)].map((_,j) => (
                    <div key={j} style={{ display:"flex", gap:12, marginBottom:9 }}>
                      {[28,80,120,150,80].map((w,k)=><div key={k} className="pl-skel" style={{ width:w }}/>)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : varieties.length===0 ? (
            <div style={{ textAlign:"center", padding:"56px 0", background:"#fff", border:"1px solid #e5e7eb", borderRadius:8 }}>
              <div style={{ fontSize:36, marginBottom:10 }}>🌾</div>
              <p style={{ fontSize:13, fontWeight:600, color:"#374151", margin:"0 0 4px" }}>
                {hasFilter ? "No products match" : "No products found"}
              </p>
              <p style={{ fontSize:12, color:"#9ca3af" }}>
                {hasFilter ? "Clear filters to see all products" : "Click Re-seed Catalogue to load products"}
              </p>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {varieties.map(variety => (
                <VarietyCard
                  key={variety}
                  variety={variety}
                  products={grouped.get(variety)}
                  togglingId={togglingId}
                  isBulking={bulkingVar===variety}
                  searchQ={search.trim().toLowerCase()}
                  onActivate={handleActivate}
                  onActivateAll={handleActivateAll}
                  autoExpand={!!search.trim()}
                />
              ))}
            </div>
          )}
        </div>
      </SidebarLayout>
      <Notification message={notification.message} type={notification.type}
        onClose={() => setNotification({ message:"", type:"info" })} />
    </>
  );
}

function VarietyCard({ variety, products, togglingId, isBulking, searchQ, onActivate, onActivateAll, autoExpand }) {
  const [open, setOpen] = useState(false);
  const total     = products.length;
  const activeC   = products.filter(p=>p.isActive).length;
  const inactiveP = products.filter(p=>!p.isActive);
  const pct       = total>0 ? Math.round(activeC/total*100) : 0;
  const allActive = activeC===total;

  useEffect(() => { setOpen(autoExpand); }, [autoExpand]);

  return (
    <div className={`pl-variety${activeC>0?" v-live":""}`}>

      <button className="pl-vhead" onClick={() => setOpen(o=>!o)}>
        {/* name */}
        <div style={{ display:"flex", flexDirection:"column", flex:1, textAlign:"left", minWidth:0 }}>
          <span style={{ fontSize:13.5, fontWeight:600, color:"#111827", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
            <Hl text={variety} q={searchQ}/>
          </span>
          <span style={{ fontSize:10.5, color:"#9ca3af", marginTop:1, fontFamily:"'DM Mono',monospace" }}>
            {total} product{total!==1?"s":""}
          </span>
        </div>

        {/* type chips */}
        <div style={{ display:"flex", gap:4, alignItems:"center", marginRight:10, flexWrap:"wrap", flexShrink:0 }}>
          {TYPE_ORDER.map(t => {
            const cnt = products.filter(p=>p.type===t).length;
            if (!cnt) return null;
            const cfg = TYPE_CFG[t];
            return (
              <span key={t} style={{
                fontSize:10, fontWeight:600, padding:"2px 7px", borderRadius:4,
                background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.bd}`,
                fontFamily:"'DM Mono',monospace",
              }}>
                {t.slice(0,2)}{cnt}
              </span>
            );
          })}
        </div>

        {/* progress */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginRight:8, flexShrink:0, minWidth:88 }}>
          <div className="pl-track">
            <div className={`pl-fill${allActive?" full":""}`} style={{ width:`${pct}%` }}/>
          </div>
          <span style={{
            fontSize:10.5, fontWeight:600, minWidth:30, textAlign:"right",
            fontFamily:"'DM Mono',monospace",
            color:allActive?"#15803d":"#9ca3af",
          }}>{activeC}/{total}</span>
        </div>

        {/* activate all / all-active badge */}
        {!allActive && open ? (
          <button className="pl-btn-all"
            onClick={e=>{ e.stopPropagation(); onActivateAll(variety,inactiveP); }}
            disabled={isBulking} style={{ marginRight:6 }}>
            {isBulking
              ? <><span className="pl-spin-ico" style={{ width:9,height:9,border:"2px solid #e5e7eb",borderTopColor:"#9ca3af",borderRadius:"50%",display:"inline-block" }}/> Working…</>
              : <>
                  <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  Activate All
                </>
            }
          </button>
        ) : allActive ? (
          <span style={{
            fontSize:10.5, fontWeight:600, color:"#15803d", marginRight:6,
            background:"#f0fdf4", border:"1px solid #bbf7d0",
            padding:"2px 8px", borderRadius:5, fontFamily:"'DM Mono',monospace",
            display:"inline-flex", alignItems:"center", gap:4,
          }}>
            <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            All Active
          </span>
        ) : null}

        {/* chevron */}
        <svg width={13} height={13} fill="none" viewBox="0 0 24 24"
          stroke="#d1d5db" strokeWidth={2.5}
          style={{ flexShrink:0, transition:"transform .18s", transform:open?"rotate(180deg)":"none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {open && (
        <div className="pl-slide">
          <table className="pl-table">
            <thead>
              <tr>
                <th style={{ width:32 }}>#</th>
                <th>Type</th>
                <th>Sub-Type</th>
                <th>Linked Account</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => {
                const tc  = TYPE_CFG[p.type] || { color:"#374151", bg:"#f3f4f6", bd:"#e5e7eb", dot:"#d1d5db" };
                const sbs = SUBTYPE_CFG[p.subType];
                const tog = togglingId===p._id || isBulking;
                return (
                  <tr key={p._id} className={p.isActive?"r-live":""}>
                    <td style={{ color:"#d1d5db", fontSize:11, fontFamily:"'DM Mono',monospace", userSelect:"none" }}>
                      {String(i+1).padStart(2,"0")}
                    </td>
                    <td>
                      <span style={{
                        display:"inline-flex", alignItems:"center", gap:5,
                        padding:"3px 10px", borderRadius:5, fontSize:11.5, fontWeight:600,
                        background:tc.bg, color:tc.color, border:`1px solid ${tc.bd}`,
                      }}>
                        <span style={{ width:5, height:5, borderRadius:"50%", background:tc.dot, flexShrink:0 }}/>
                        <Hl text={p.type} q={searchQ}/>
                      </span>
                    </td>
                    <td>
                      {p.subType ? (
                        <span style={{
                          display:"inline-block", padding:"3px 9px", borderRadius:5,
                          fontSize:11.5, fontWeight:500,
                          background:sbs?.bg||"#f3f4f6", color:sbs?.color||"#374151",
                          border:`1px solid ${sbs?.bd||"#e5e7eb"}`,
                        }}>
                          <Hl text={p.subType} q={searchQ}/>
                        </span>
                      ) : (
                        <span style={{ fontSize:12, color:"#d1d5db" }}>—</span>
                      )}
                    </td>
                    <td>
                      {p.isActive && p.linkedAccountId ? (
                        <span className="pl-acct">
                          {p.linkedAccountId.accountName || p.productName}
                        </span>
                      ) : (
                        <span style={{ fontSize:12, color:"#d1d5db" }}>—</span>
                      )}
                    </td>
                    <td>
                      {p.isActive ? (
                        <span className="pl-badge-live">
                          <svg width={8} height={8} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                          Active
                        </span>
                      ) : (
                        <button className="pl-btn-act" onClick={() => onActivate(p)} disabled={tog}>
                          {tog ? (
                            <span className="pl-spin-ico" style={{ width:9,height:9,border:"2px solid #e5e7eb",borderTopColor:"#9ca3af",borderRadius:"50%",display:"inline-block" }}/>
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