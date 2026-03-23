import React, { useEffect, useState, useMemo, useCallback } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import { authFetch } from "../../utils/authFetch.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  :root {
    --oc-black:#0B0C0D; --oc-dark:#141A1F; --oc-navy:#212A37;
    --oc-slate:#253240; --oc-steel:#334455; --oc-mid:#6E7170;
    --oc-silver:#A5A8A6; --oc-light:#DADADA; --oc-bg:#F5F5F5; --oc-bg2:#ECECEC;
    --oc-gold:#929183; --oc-g2:#7A7970; --oc-g3:#A8A79F;
  }

  .pl * { box-sizing:border-box; }
  .pl { font-family:'DM Sans',sans-serif; color:var(--oc-black); }
  .pl-mono { font-family:'DM Mono',monospace; }
  .pl-title { font-family:'Cormorant Garamond',serif; }

  /* ── Stat cards ── */
  .pl-stat {
    background:#fff; border:1.5px solid var(--oc-bg2); border-radius:14px;
    padding:18px 20px; position:relative; overflow:hidden;
    box-shadow:0 2px 8px rgba(11,12,13,.04); transition:box-shadow .15s;
  }
  .pl-stat:hover { box-shadow:0 4px 16px rgba(11,12,13,.08); }
  .pl-stat::before {
    content:''; position:absolute; top:0; left:0; right:0; height:3px; border-radius:14px 14px 0 0;
  }
  .pl-stat.s-total::before   { background:linear-gradient(90deg,var(--oc-navy),#929183); }
  .pl-stat.s-active::before  { background:linear-gradient(90deg,#22c55e,#15803d); }
  .pl-stat.s-pending::before { background:linear-gradient(90deg,#929183,#7A7970); }

  /* ── Type pills ── */
  .pl-pill {
    display:inline-flex; align-items:center; gap:6px; padding:6px 14px;
    border-radius:20px; font-size:12px; font-weight:600; border:1.5px solid var(--oc-bg2);
    background:#fff; color:var(--oc-mid); cursor:pointer; transition:all .12s;
    white-space:nowrap; font-family:'DM Sans',sans-serif;
  }
  .pl-pill:hover { border-color:var(--oc-light); color:var(--oc-navy); }
  .pl-pill.on { color:var(--tc); border-color:var(--tc); background:var(--tbg); font-weight:700; }

  /* ── Variety card ── */
  .pl-variety {
    background:#fff; border:1.5px solid var(--oc-bg2); border-radius:14px;
    overflow:hidden; transition:box-shadow .15s;
  }
  .pl-variety:hover { box-shadow:0 4px 16px rgba(11,12,13,.07); }
  .pl-variety.v-live { border-color:rgba(34,197,94,.3); }

  .pl-vhead {
    display:flex; align-items:center; gap:12px; padding:13px 18px;
    cursor:pointer; border:none; background:none; width:100%; text-align:left;
    transition:background .1s;
  }
  .pl-vhead:hover { background:var(--oc-bg); }

  /* ── Progress bar ── */
  .pl-track { flex:1; height:4px; background:var(--oc-bg2); border-radius:10px; overflow:hidden; min-width:70px; max-width:130px; }
  .pl-fill  { height:100%; border-radius:10px; background:linear-gradient(90deg,#929183,#7A7970); transition:width .4s cubic-bezier(.4,0,.2,1); }
  .pl-fill.full { background:linear-gradient(90deg,#22c55e,#15803d); }

  /* ── Product rows ── */
  .pl-table { width:100%; border-collapse:collapse; }
  .pl-table thead th {
    padding:7px 14px; font-size:9.5px; font-weight:700; text-transform:uppercase;
    letter-spacing:.1em; color:var(--oc-silver); background:var(--oc-bg);
    text-align:left; border-bottom:1px solid var(--oc-bg2); white-space:nowrap;
    font-family:'DM Sans',sans-serif;
  }
  .pl-table thead th:last-child { text-align:right; }
  .pl-table tbody tr { border-bottom:1px solid var(--oc-bg); transition:background .08s; }
  .pl-table tbody tr:last-child { border-bottom:none; }
  .pl-table tbody tr:hover { background:rgba(146,145,131,.035); }
  .pl-table tbody tr.r-live { background:rgba(34,197,94,.03); }
  .pl-table tbody td { padding:9px 14px; font-size:12.5px; color:var(--oc-steel); vertical-align:middle; }
  .pl-table tbody td:last-child { text-align:right; }

  /* ── Activate button ── */
  .pl-btn-act {
    display:inline-flex; align-items:center; gap:5px;
    padding:5px 12px; border-radius:7px; font-size:11px; font-weight:700;
    background:var(--oc-bg); color:var(--oc-navy); border:1.5px solid var(--oc-bg2);
    cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .12s; white-space:nowrap;
  }
  .pl-btn-act:hover:not(:disabled) {
    background:var(--oc-navy); color:#fff; border-color:var(--oc-navy);
    box-shadow:0 2px 8px rgba(33,42,55,.25);
  }
  .pl-btn-act:disabled { opacity:.45; cursor:not-allowed; }

  .pl-badge-live {
    display:inline-flex; align-items:center; gap:4px;
    padding:4px 10px; border-radius:7px; font-size:11px; font-weight:700;
    background:rgba(34,197,94,.08); color:#15803d; border:1.5px solid rgba(34,197,94,.25);
    font-family:'DM Mono',monospace; letter-spacing:.04em;
  }

  /* ── Activate-all ── */
  .pl-btn-all {
    display:inline-flex; align-items:center; gap:5px; padding:4px 10px;
    border-radius:7px; font-size:10.5px; font-weight:700;
    background:rgba(146,145,131,.08); color:#7A7970; border:1.5px solid rgba(146,145,131,.25);
    cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .12s; white-space:nowrap;
  }
  .pl-btn-all:hover { background:rgba(146,145,131,.15); border-color:#929183; }

  /* ── Account chip ── */
  .pl-acct {
    display:inline-flex; align-items:center; gap:4px; padding:2px 8px;
    border-radius:5px; font-size:10px; font-weight:600;
    background:rgba(33,42,55,.06); color:var(--oc-navy); border:1px solid rgba(33,42,55,.12);
    font-family:'DM Mono',monospace; max-width:180px;
    overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
  }

  /* ── Animations ── */
  @keyframes pl-slide { from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)} }
  .pl-slide { animation:pl-slide .15s ease both; }
  @keyframes pl-spin { to{transform:rotate(360deg)} }
  .pl-spin-ico { display:inline-block; animation:pl-spin .65s linear infinite; }
  @keyframes pl-shimmer { to{background-position:-200% 0} }
  .pl-skel {
    border-radius:6px; height:12px;
    background:linear-gradient(90deg,#F5F5F5 25%,#ECECEC 50%,#F5F5F5 75%);
    background-size:200% 100%; animation:pl-shimmer 1.4s infinite;
  }
`;

// ── Config ────────────────────────────────────────────────────────────────────
const TYPE_ORDER = ["Rice","Broken","Paddy","Polish","Phukar"];

const TYPE_CFG = {
  Rice:   { color:"#1d4ed8", bg:"#dbeafe44", border:"#bfdbfe", dot:"#3b82f6",  label:"Rice"   },
  Broken: { color:"#7c3aed", bg:"#ede9fe44", border:"#ddd6fe", dot:"#8b5cf6",  label:"Broken" },
  Paddy:  { color:"#166534", bg:"#dcfce744", border:"#bbf7d0", dot:"#22c55e",  label:"Paddy"  },
  Polish: { color:"#c2410c", bg:"#ffedd544", border:"#fed7aa", dot:"#f97316",  label:"Polish" },
  Phukar: { color:"#9f1239", bg:"#fee2e244", border:"#fecaca", dot:"#ef4444",  label:"Phukar" },
};

const SUBTYPE_CFG = {
  "Brown":                      { bg:"#fef9c3", color:"#854d0e", border:"#fde68a" },
  "White (Raw)":                { bg:"#f8fafc", color:"#334155", border:"#e2e8f0" },
  "White (Double Polish)":      { bg:"#e0f2fe", color:"#0369a1", border:"#bae6fd" },
  "White (Silky-Water Polish)": { bg:"#dbeafe", color:"#1e40af", border:"#bfdbfe" },
  "Steamed":                    { bg:"#ecfdf5", color:"#065f46", border:"#6ee7b7" },
  "Sella (Creamy)":             { bg:"#fef3c7", color:"#92400e", border:"#fde68a" },
  "Sella (Golden)":             { bg:"#fef9c3", color:"#713f12", border:"#fcd34d" },
};

// ── Highlight matched text ────────────────────────────────────────────────────
function Hl({ text = "", q = "" }) {
  if (!q || !text.toLowerCase().includes(q.toLowerCase())) return <>{text}</>;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  return (
    <>{text.slice(0,i)}<mark style={{ background:"rgba(146,145,131,.35)", borderRadius:2, padding:"0 1px" }}>{text.slice(i,i+q.length)}</mark>{text.slice(i+q.length)}</>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
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

  // ── Derived ───────────────────────────────────────────────────────────────
  const totalActive  = products.filter(p => p.isActive).length;
  const totalPending = products.length - totalActive;

  const filtered = useMemo(() => {
    let list = products;
    if (typeFilter)                  list = list.filter(p => p.type===typeFilter);
    if (statusFilter==="active")     list = list.filter(p =>  p.isActive);
    if (statusFilter==="inactive")   list = list.filter(p => !p.isActive);
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
        const ti = TYPE_ORDER.indexOf(a.type)-TYPE_ORDER.indexOf(b.type);
        return ti!==0 ? ti : (a.subType||"").localeCompare(b.subType||"");
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

          {/* ── Header ── */}
          <div style={{ marginBottom:20 }}>
            <p style={{ fontSize:10, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#929183", margin:"0 0 4px" }}>
              Mill Catalogue
            </p>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
              <h1 className="pl-title" style={{ margin:0, fontSize:26, fontWeight:700, color:"var(--oc-black)", letterSpacing:"-.4px" }}>
                Product Catalogue
              </h1>
              <button onClick={() => doSeed(false)} disabled={seeding} style={{
                display:"flex", alignItems:"center", gap:7, padding:"8px 16px",
                borderRadius:9, border:"1.5px solid var(--oc-bg2)", cursor:seeding?"not-allowed":"pointer",
                background:seeding?"var(--oc-bg)":"var(--oc-navy)",
                color:seeding?"var(--oc-silver)":"#fff",
                fontSize:12, fontWeight:700, fontFamily:"'DM Sans',sans-serif", transition:".12s",
              }}>
                <span style={{ display:"inline-block", fontSize:14 }}>↻</span>
                {seeding ? "Seeding…" : "Re-seed"}
              </button>
            </div>
          </div>

          {/* ── Stats ── */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:20 }}>
            {[
              { cls:"s-total",  label:"Total Products", val:products.length,  color:"var(--oc-black)" },
              { cls:"s-active", label:"Activated",       val:totalActive,      color:"#15803d" },
              { cls:"s-pending",label:"Pending",         val:totalPending,     color:"#7A7970" },
            ].map(s => (
              <div key={s.cls} className={`pl-stat ${s.cls}`}>
                <span style={{ fontSize:9.5, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"var(--oc-silver)" }}>{s.label}</span>
                <span className="pl-mono" style={{ fontSize:26, fontWeight:700, color:s.color, lineHeight:1, marginTop:6 }}>{s.val}</span>
              </div>
            ))}
          </div>

          {/* ── Type pills ── */}
          <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:14 }}>
            <button className={`pl-pill${typeFilter===""?" on":""}`}
              style={{ "--tc":"var(--oc-navy)", "--tbg":"rgba(33,42,55,.08)" }}
              onClick={() => setTypeFilter("")}>
              All Types
            </button>
            {TYPE_ORDER.map(t => {
              const cfg = TYPE_CFG[t];
              const cnt = products.filter(p=>p.type===t).length;
              const act = products.filter(p=>p.type===t&&p.isActive).length;
              return (
                <button key={t}
                  className={`pl-pill${typeFilter===t?" on":""}`}
                  style={{ "--tc":cfg.color, "--tbg":cfg.bg }}
                  onClick={() => setTypeFilter(typeFilter===t?"":t)}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:cfg.dot, flexShrink:0 }}/>
                  {t}
                  <span className="pl-mono" style={{ fontSize:9, opacity:.65, marginLeft:2 }}>{act}/{cnt}</span>
                </button>
              );
            })}
          </div>

          {/* ── Filter bar ── */}
          <div style={{
            background:"#fff", border:"1.5px solid var(--oc-bg2)", borderRadius:12,
            padding:"10px 14px", marginBottom:16,
            display:"flex", flexWrap:"wrap", gap:8, alignItems:"center",
            boxShadow:"0 1px 4px rgba(11,12,13,.04)",
          }}>
            <div style={{ position:"relative", flex:1, minWidth:200 }}>
              <svg style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"var(--oc-silver)",pointerEvents:"none" }}
                width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"/>
              </svg>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search variety, type, sub-type…"
                style={{ width:"100%", padding:"7px 10px 7px 30px", border:"1.5px solid var(--oc-bg2)",
                  borderRadius:8, fontSize:12.5, outline:"none", fontFamily:"'DM Sans',sans-serif",
                  color:"var(--oc-black)", background:"var(--oc-bg)", transition:".12s" }}
                onFocus={e=>{e.target.style.borderColor="var(--oc-navy)";e.target.style.background="#fff";}}
                onBlur={e=>{e.target.style.borderColor="var(--oc-bg2)";e.target.style.background="var(--oc-bg)";}}
              />
            </div>
            <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}
              style={{ padding:"7px 10px", border:"1.5px solid var(--oc-bg2)", borderRadius:8,
                fontSize:12.5, outline:"none", background:"var(--oc-bg)", fontFamily:"'DM Sans',sans-serif", color:"var(--oc-steel)" }}>
              <option value="">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Pending Only</option>
            </select>
            {hasFilter && (
              <button onClick={() => { setSearch(""); setTypeFilter(""); setStatusFilter(""); }}
                style={{ padding:"7px 12px", border:"1.5px solid #fecaca", borderRadius:8,
                  background:"#fef2f2", fontSize:12, fontWeight:600, color:"#dc2626",
                  cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                Clear ✕
              </button>
            )}
            <span className="pl-mono" style={{ marginLeft:"auto", fontSize:10.5, color:"var(--oc-silver)" }}>
              {filtered.length} products · {varieties.length} varieties
            </span>
          </div>

          {/* ── Content ── */}
          {loading ? (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[...Array(4)].map((_,i) => (
                <div key={i} style={{ background:"#fff", border:"1.5px solid var(--oc-bg2)", borderRadius:14, padding:18 }}>
                  <div style={{ display:"flex", gap:14, alignItems:"center", marginBottom:14 }}>
                    <div className="pl-skel" style={{ width:120 }}/>
                    <div className="pl-skel" style={{ width:80, marginLeft:"auto" }}/>
                  </div>
                  {[...Array(3)].map((_,j) => (
                    <div key={j} style={{ display:"flex", gap:14, marginBottom:10 }}>
                      {[30,90,120,140,80].map((w,k)=><div key={k} className="pl-skel" style={{ width:w }}/>)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : varieties.length===0 ? (
            <div style={{ textAlign:"center", padding:"60px 0" }}>
              <div style={{ fontSize:40, marginBottom:12 }}>🌾</div>
              <p style={{ fontSize:14, fontWeight:700, color:"var(--oc-steel)", margin:"0 0 4px" }}>
                {hasFilter ? "No products match your filters" : "No products found"}
              </p>
              <p style={{ fontSize:12, color:"var(--oc-silver)" }}>
                {hasFilter ? "Clear filters to see all products" : "Click Re-seed to load the catalogue"}
              </p>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
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

// ── Variety Card ──────────────────────────────────────────────────────────────
function VarietyCard({ variety, products, togglingId, isBulking, searchQ, onActivate, onActivateAll, autoExpand }) {
  const [open, setOpen] = useState(false);
  const total      = products.length;
  const activeC    = products.filter(p=>p.isActive).length;
  const inactiveP  = products.filter(p=>!p.isActive);
  const pct        = total>0 ? Math.round(activeC/total*100) : 0;
  const allActive  = activeC===total;

  useEffect(() => {
    setOpen(autoExpand);
  }, [autoExpand]);

  return (
    <div className={`pl-variety${activeC>0?" v-live":""}`}>

      {/* ── Header ── */}
      <button className="pl-vhead" onClick={() => setOpen(o=>!o)}>

        {/* Variety name + count */}
        <div style={{ display:"flex", flexDirection:"column", flex:1, textAlign:"left" }}>
          <span style={{ fontSize:14, fontWeight:700, color:"var(--oc-black)", letterSpacing:"-.1px" }}>
            <Hl text={variety} q={searchQ}/>
          </span>
          <span className="pl-mono" style={{ fontSize:9.5, color:"var(--oc-silver)", marginTop:1 }}>
            {total} product{total!==1?"s":""}
          </span>
        </div>

        {/* Type breakdown chips */}
        <div style={{ display:"flex", gap:4, alignItems:"center", marginRight:12, flexWrap:"wrap" }}>
          {TYPE_ORDER.map(t => {
            const cnt = products.filter(p=>p.type===t).length;
            if (!cnt) return null;
            const cfg = TYPE_CFG[t];
            return (
              <span key={t} style={{
                fontSize:9.5, fontWeight:700, padding:"2px 7px", borderRadius:20,
                background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`,
                fontFamily:"'DM Mono',monospace",
              }}>
                {t[0]}{cnt}
              </span>
            );
          })}
        </div>

        {/* Progress */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginRight:10, minWidth:100 }}>
          <div className="pl-track">
            <div className={`pl-fill${allActive?" full":""}`} style={{ width:`${pct}%` }}/>
          </div>
          <span className="pl-mono" style={{
            fontSize:10.5, fontWeight:700, minWidth:36, textAlign:"right",
            color: allActive?"#15803d":"var(--oc-silver)",
          }}>{activeC}/{total}</span>
        </div>

        {/* Activate-all / complete badge */}
        {!allActive && open ? (
          <button className="pl-btn-all"
            onClick={e=>{e.stopPropagation();onActivateAll(variety,inactiveP);}}
            disabled={isBulking} style={{ marginRight:8 }}>
            {isBulking ? (
              <><span className="pl-spin-ico" style={{ display:"inline-block",width:9,height:9,border:"2px solid rgba(146,145,131,.3)",borderTopColor:"#929183",borderRadius:"50%" }}/> Activating…</>
            ) : <>⚡ Activate All</>}
          </button>
        ) : allActive ? (
          <span style={{ fontSize:10, fontWeight:700, color:"#15803d", marginRight:8,
            background:"rgba(34,197,94,.08)", border:"1px solid rgba(34,197,94,.25)",
            padding:"2px 8px", borderRadius:20, fontFamily:"'DM Mono',monospace" }}>
            ✓ All Active
          </span>
        ) : null}

        {/* Chevron */}
        <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="var(--oc-light)" strokeWidth={2.5}
          style={{ flexShrink:0, transition:"transform .2s", transform:open?"rotate(180deg)":"none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {/* ── Product table ── */}
      {open && (
        <div className="pl-slide">
          <table className="pl-table">
            <thead>
              <tr>
                <th style={{ width:34 }}>#</th>
                <th>Type</th>
                <th>Sub-Type</th>
                <th>Account</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => {
                const tc  = TYPE_CFG[p.type] || { color:"var(--oc-steel)", bg:"var(--oc-bg)", border:"var(--oc-bg2)", dot:"var(--oc-light)" };
                const sbs = SUBTYPE_CFG[p.subType];
                const tog = togglingId===p._id || isBulking;
                return (
                  <tr key={p._id} className={p.isActive?"r-live":""}>

                    {/* Index */}
                    <td className="pl-mono" style={{ fontSize:11, color:"var(--oc-light)", userSelect:"none" }}>
                      {String(i+1).padStart(2,"0")}
                    </td>

                    {/* Type badge */}
                    <td>
                      <span style={{
                        display:"inline-flex", alignItems:"center", gap:5,
                        padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:700,
                        background:tc.bg, color:tc.color, border:`1px solid ${tc.border}`,
                      }}>
                        <span style={{ width:5,height:5,borderRadius:"50%",background:tc.dot,flexShrink:0 }}/>
                        <Hl text={p.type} q={searchQ}/>
                      </span>
                    </td>

                    {/* Sub-type badge */}
                    <td>
                      {p.subType ? (
                        <span style={{
                          display:"inline-block", padding:"3px 9px", borderRadius:20,
                          fontSize:11, fontWeight:600,
                          background:sbs?.bg||"var(--oc-bg)", color:sbs?.color||"var(--oc-steel)",
                          border:`1px solid ${sbs?.border||"var(--oc-bg2)"}`,
                        }}>
                          <Hl text={p.subType} q={searchQ}/>
                        </span>
                      ) : (
                        <span style={{ fontSize:11, color:"var(--oc-bg2)", fontStyle:"italic" }}>—</span>
                      )}
                    </td>

                    {/* Account chip */}
                    <td>
                      {p.isActive && p.linkedAccountId ? (
                        <span className="pl-acct">
                          <svg width={8} height={8} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                          </svg>
                          {p.linkedAccountId.accountName || p.productName}
                        </span>
                      ) : (
                        <span style={{ fontSize:11, color:"var(--oc-bg2)" }}>—</span>
                      )}
                    </td>

                    {/* Status / action */}
                    <td>
                      {p.isActive ? (
                        <span className="pl-badge-live">
                          <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                          Active
                        </span>
                      ) : (
                        <button className="pl-btn-act" onClick={() => onActivate(p)} disabled={tog}>
                          {tog ? (
                            <span className="pl-spin-ico" style={{ display:"inline-block",width:9,height:9,border:"2px solid var(--oc-bg2)",borderTopColor:"var(--oc-silver)",borderRadius:"50%" }}/>
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