import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

/* ─── Fonts ─────────────────────────────────────────────────────────────── */
const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
`;

/* ─── CSS — all classes prefixed .plx- ──────────────────────────────────── */
const CSS = `
  .plx-wrap *, .plx-wrap *::before, .plx-wrap *::after { box-sizing: border-box; }
  .plx-wrap {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
    width: 100%;
    max-width: 1060px;
    margin: 0 auto;
  }

  /* eyebrow / title */
  .plx-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: .12em;
    text-transform: uppercase; color: #9ca3af; margin-bottom: 6px;
  }
  .plx-title {
    font-family: 'Lora', serif; font-size: 26px; font-weight: 700;
    color: #0f172a; letter-spacing: -.3px; line-height: 1.15;
  }
  .plx-subtitle { font-size: 13px; color: #94a3b8; margin-top: 4px; }

  /* filter bar */
  .plx-filter-bar {
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px;
    padding: 16px 20px; display: flex; align-items: flex-end;
    gap: 14px; flex-wrap: wrap;
  }
  .plx-field { display: flex; flex-direction: column; gap: 5px; flex: 1; min-width: 160px; }
  .plx-label {
    font-size: 10.5px; font-weight: 700; letter-spacing: .06em;
    text-transform: uppercase; color: #94a3b8;
  }
  .plx-input, .plx-select {
    border: 1.5px solid #e2e8f0; border-radius: 9px; padding: 8px 12px;
    font-size: 13px; font-family: 'DM Sans', sans-serif; color: #0f172a;
    background: #f8fafc; outline: none; transition: border-color .15s, box-shadow .15s;
    width: 100%;
  }
  .plx-input:focus, .plx-select:focus {
    border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.1);
  }
  .plx-input-search { padding-left: 34px; }
  .plx-search-wrap { position: relative; }
  .plx-search-icon {
    position: absolute; left: 11px; top: 50%; transform: translateY(-50%);
    color: #94a3b8; pointer-events: none; display: flex; align-items: center;
  }
  .plx-select:disabled { background: #f1f5f9; color: #cbd5e1; cursor: not-allowed; }
  .plx-count-chip {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 8px 14px; border-radius: 9px; font-size: 12.5px; font-weight: 600;
    background: #f5f5ff; color: #4f46e5; border: 1.5px solid #e0e7ff;
    white-space: nowrap; height: 38px; align-self: flex-end;
  }
  .plx-clear-btn {
    padding: 8px 14px; border-radius: 9px; border: 1.5px solid #e2e8f0;
    background: #fff; font-size: 12.5px; font-weight: 600; color: #64748b;
    cursor: pointer; font-family: 'DM Sans', sans-serif; height: 38px;
    align-self: flex-end; transition: all .12s; white-space: nowrap;
  }
  .plx-clear-btn:hover { border-color: #94a3b8; color: #334155; }

  /* type pills (filter shortcuts) */
  .plx-pill {
    padding: 5px 14px; border-radius: 20px; font-size: 12px; font-weight: 600;
    border: 1.5px solid #e2e8f0; background: #fff; color: #64748b;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .12s;
    white-space: nowrap;
  }
  .plx-pill:hover { border-color: #94a3b8; color: #334155; background: #f8fafc; }
  .plx-pill-active {
    background: #4f46e5; border-color: #4f46e5; color: #fff;
  }
  .plx-pill-active:hover { background: #4338ca; border-color: #4338ca; color: #fff; }

  /* table panel */
  .plx-panel {
    background: #fff; border: 1.5px solid #e2e8f0;
    border-radius: 16px; overflow: hidden;
    box-shadow: 0 1px 6px rgba(0,0,0,.04);
  }
  .plx-table { width: 100%; border-collapse: collapse; }
  .plx-table thead tr { background: #1e293b; }
  .plx-table thead th {
    padding: 11px 18px; font-size: 11px; font-weight: 700;
    letter-spacing: .07em; text-transform: uppercase;
    color: rgba(255,255,255,.6); font-family: 'DM Sans', sans-serif;
    border: none; white-space: nowrap; text-align: left;
  }
  .plx-table thead th.plx-th-right { text-align: right; }

  .plx-row { border-bottom: 1px solid #f8fafc; transition: background .08s; }
  .plx-row:last-child { border-bottom: none; }
  .plx-row:hover { background: #fafafa; }
  .plx-row td { padding: 11px 18px; font-size: 13px; color: #334155; }
  .plx-row td.plx-td-right { text-align: right; }
  .plx-row td.plx-td-mono {
    font-family: 'DM Mono', monospace; font-size: 12px; color: #94a3b8;
  }

  /* product name cell */
  .plx-product-name {
    font-weight: 600; color: #0f172a; font-size: 13.5px;
  }

  /* type badge */
  .plx-type-badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 9px; border-radius: 6px; font-size: 11.5px; font-weight: 600;
    background: var(--plx-bg, #f5f5ff); color: var(--plx-color, #4f46e5);
  }
  .plx-subtype-badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 500;
    background: #f8fafc; color: #64748b; border: 1px solid #f1f5f9;
  }

  /* action buttons */
  .plx-btn-edit {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 5px 12px; border-radius: 8px; border: 1.5px solid #fde68a;
    background: #fefce8; color: #92400e; cursor: pointer; font-size: 12px;
    font-weight: 600; font-family: 'DM Sans', sans-serif;
    transition: all .12s; white-space: nowrap;
  }
  .plx-btn-edit:hover { background: #fef3c7; border-color: #f59e0b; }
  .plx-btn-del {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 5px 12px; border-radius: 8px; border: 1.5px solid #fecaca;
    background: #fef2f2; color: #dc2626; cursor: pointer; font-size: 12px;
    font-weight: 600; font-family: 'DM Sans', sans-serif;
    transition: all .12s; white-space: nowrap;
  }
  .plx-btn-del:hover { background: #fee2e2; border-color: #f87171; }

  /* empty state */
  .plx-empty {
    padding: 56px 24px; text-align: center;
  }
  .plx-empty-icon {
    width: 56px; height: 56px; border-radius: 16px; background: #f5f5ff;
    color: #a5b4fc; display: flex; align-items: center; justify-content: center;
    margin: 0 auto 14px;
  }
  .plx-empty-title { font-size: 14px; font-weight: 700; color: #334155; margin-bottom: 4px; }
  .plx-empty-sub   { font-size: 12.5px; color: #94a3b8; }

  /* modal backdrop */
  .plx-backdrop {
    position: fixed; inset: 0; background: rgba(15,23,42,.45);
    display: flex; align-items: center; justify-content: center;
    z-index: 50; padding: 20px;
    animation: plx-fade-in .15s ease;
  }
  @keyframes plx-fade-in { from { opacity: 0; } to { opacity: 1; } }

  /* modal */
  .plx-modal {
    background: #fff; border-radius: 18px; width: 100%; max-width: 440px;
    overflow: hidden; box-shadow: 0 24px 80px rgba(15,23,42,.22);
    animation: plx-slide-up .2s ease;
  }
  @keyframes plx-slide-up {
    from { transform: translateY(12px); opacity: 0; }
    to   { transform: translateY(0);   opacity: 1; }
  }
  .plx-modal-head {
    background: #1e293b; padding: 18px 22px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .plx-modal-title {
    font-family: 'Lora', serif; font-size: 16px; font-weight: 600;
    color: #fff; font-style: italic;
  }
  .plx-modal-close {
    width: 30px; height: 30px; border-radius: 8px; border: none;
    background: rgba(255,255,255,.1); color: rgba(255,255,255,.7);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: background .12s;
  }
  .plx-modal-close:hover { background: rgba(255,255,255,.2); color: #fff; }
  .plx-modal-body { padding: 22px; display: flex; flex-direction: column; gap: 16px; }
  .plx-modal-foot {
    padding: 14px 22px; border-top: 1.5px solid #f1f5f9;
    display: flex; justify-content: flex-end; gap: 10px;
    background: #f8fafc;
  }
  .plx-btn-cancel {
    padding: 9px 18px; border-radius: 9px; border: 1.5px solid #e2e8f0;
    background: #fff; font-size: 13px; font-weight: 600; color: #64748b;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .12s;
  }
  .plx-btn-cancel:hover { border-color: #94a3b8; color: #334155; }
  .plx-btn-save {
    padding: 9px 22px; border-radius: 9px; border: none;
    background: #4f46e5; color: #fff; font-size: 13px; font-weight: 600;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background .12s;
  }
  .plx-btn-save:hover { background: #4338ca; }
  .plx-btn-save:disabled { opacity: .5; cursor: not-allowed; }

  /* subtype pill (for edit modal, reuse same green accent as AddProduct) */
  .apx-subpill {
    padding: 6px 14px; border-radius: 20px; font-size: 12.5px; font-weight: 600;
    border: 1.5px solid #e2e8f0; background: #f8fafc; color: #64748b;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .12s; user-select: none;
  }
  .apx-subpill:hover { border-color: #6ee7b7; color: #059669; background: #f0fdf4; }
  .apx-subpill-active { border-color: #34d399; background: #ecfdf5; color: #065f46; font-weight: 700; }

  /* skeleton */
  @keyframes plx-shimmer { to { background-position: -200% 0; } }
  .plx-sk {
    background: linear-gradient(90deg,#f1f5f9 25%,#f8fafc 50%,#f1f5f9 75%);
    background-size: 200% 100%; animation: plx-shimmer 1.4s infinite; border-radius: 6px;
  }
`;

/* ─── Product type palette ── */
const TYPE_PALETTE = {
  Peddy:         { bg:"#fff7ed", color:"#c2410c" },
  Rice:          { bg:"#ecfdf5", color:"#059669" },
  "Broken Rice": { bg:"#f0fdf4", color:"#166534" },
  Polish:        { bg:"#f5f5ff", color:"#4f46e5" },
  Phukar:        { bg:"#fef9c3", color:"#854d0e" },
};

// Types with NO subtype (matches backend NO_SUBTYPE_TYPES)
const NO_SUBTYPE = new Set(["Peddy", "Polish", "Phukar"]);

const TYPE_OPTIONS = {
  Peddy:        [],                                  // no subtype
  Rice:         ["Brown","White","Steamed","Sella"],
  "Broken Rice":["Brown","White","Steamed","Sella"],
  Polish:       [],                                  // no subtype
  Phukar:       [],                                  // no subtype
};

/* ─── Icons ── */
const SearchIcon = () => (
  <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
  </svg>
);
const BoxIcon = () => (
  <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
  </svg>
);
const EditIcon = () => (
  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
  </svg>
);
const TrashIcon = () => (
  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
  </svg>
);
const CloseIcon = () => (
  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
  </svg>
);

/* ─── TypeBadge ── */
function TypeBadge({ type }) {
  const p = TYPE_PALETTE[type] || { bg:"#f1f5f9", color:"#64748b" };
  return (
    <span className="plx-type-badge" style={{ "--plx-bg":p.bg, "--plx-color":p.color }}>
      {type}
    </span>
  );
}

/* ─── Skeleton rows ── */
function SkeletonRows() {
  return (
    <>
      {[0,1,2,3,4,5].map(i => (
        <tr key={i} className="plx-row">
          <td><div className="plx-sk" style={{ width:"60%", height:14 }}/></td>
          <td><div className="plx-sk" style={{ width:60, height:20, borderRadius:6 }}/></td>
          <td><div className="plx-sk" style={{ width:50, height:18, borderRadius:6 }}/></td>
          <td className="plx-td-right"><div className="plx-sk" style={{ width:70, height:13, marginLeft:"auto" }}/></td>
          <td className="plx-td-right">
            <div style={{ display:"flex", justifyContent:"flex-end", gap:8 }}>
              <div className="plx-sk" style={{ width:32, height:32, borderRadius:8 }}/>
              <div className="plx-sk" style={{ width:32, height:32, borderRadius:8 }}/>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function ProductsList() {
  const [products,       setProducts]       = useState([]);
  const [filtered,       setFiltered]       = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [saving,         setSaving]         = useState(false);

  const [search,         setSearch]         = useState("");
  const [type,           setType]           = useState("");
  const [subType,        setSubType]        = useState("");

  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm,       setEditForm]       = useState({ productName:"", type:"", subType:"" });
  const [deleteTarget,   setDeleteTarget]   = useState(null);   // product to confirm delete

  /* ── Fetch ── */
  useEffect(() => {
    (async () => {
      try {
        const res  = await authFetch(`${API_BASE_URL}/products`);
        const data = await res.json();
        if (data.success) { setProducts(data.products); setFiltered(data.products); }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  /* ── Filters ── */
  useEffect(() => {
    let d = products;
    if (search)  d = d.filter(p => p.productName.toLowerCase().includes(search.toLowerCase()));
    if (type)    d = d.filter(p => p.type === type);
    if (subType) d = d.filter(p => p.subType === subType);
    setFiltered(d);
  }, [search, type, subType, products]);

  const clearFilters = () => { setSearch(""); setType(""); setSubType(""); };
  const hasFilter = search || type || subType;

  /* ── Edit ── */
  const openEdit = (p) => {
    setEditingProduct(p);
    const sub = NO_SUBTYPE.has(p.type)
      ? ""
      : (TYPE_OPTIONS[p.type]?.includes(p.subType) ? p.subType : (TYPE_OPTIONS[p.type]?.[0] ?? ""));
    setEditForm({ productName: p.productName, type: p.type, subType: sub });
  };

  const updateProduct = async () => {
    const needSub = !NO_SUBTYPE.has(editForm.type);
    if (!editForm.productName || !editForm.type || (needSub && !editForm.subType)) return;
    setSaving(true);
    try {
      const res  = await authFetch(`${API_BASE_URL}/products/${editingProduct._id}`, {
        method:"PUT", headers:{"Content-Type":"application/json"},
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!data.success) { alert(data.message || "Update failed"); return; }
      const updated = products.map(p => p._id === data.product._id ? data.product : p);
      setProducts(updated);
      setEditingProduct(null);
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  /* ── Delete ── */
  const confirmDelete = (p) => setDeleteTarget(p);

  const executeDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res  = await authFetch(`${API_BASE_URL}/products/${deleteTarget._id}`, { method:"DELETE" });
      const data = await res.json();
      if (data.success) setProducts(prev => prev.filter(p => p._id !== deleteTarget._id));
    } catch (e) { console.error(e); }
    finally { setDeleteTarget(null); }
  };

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>

      <div style={{ display:"flex", justifyContent:"center", width:"100%", padding:"0 16px" }}>
      <div className="plx-wrap">

        {/* ── Header ── */}
        <div style={{ marginBottom:24 }}>
          <p className="plx-eyebrow">Inventory</p>
          <h1 className="plx-title">Products</h1>
          <p className="plx-subtitle">
            {loading ? "Loading…" : `${products.length} product${products.length !== 1 ? "s" : ""} in inventory`}
          </p>
        </div>

        {/* ── Filter bar ── */}
        <div className="plx-filter-bar" style={{ marginBottom:14 }}>

          {/* Search */}
          <div className="plx-field" style={{ minWidth:200 }}>
            <label className="plx-label">Search</label>
            <div className="plx-search-wrap">
              <span className="plx-search-icon"><SearchIcon/></span>
              <input
                className="plx-input plx-input-search"
                placeholder="Product name…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Type */}
          <div className="plx-field">
            <label className="plx-label">Type</label>
            <select
              className="plx-select"
              value={type}
              onChange={e => { setType(e.target.value); setSubType(""); }}
            >
              <option value="">All Types</option>
              {Object.keys(TYPE_OPTIONS).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Sub type — hidden for no-subtype types */}
          {(!type || !NO_SUBTYPE.has(type)) && (
            <div className="plx-field">
              <label className="plx-label">Sub Type</label>
              <select
                className="plx-select"
                value={subType}
                disabled={!type || NO_SUBTYPE.has(type)}
                onChange={e => setSubType(e.target.value)}
              >
                <option value="">All Sub Types</option>
                {type && (TYPE_OPTIONS[type]||[]).map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>
          )}

          {/* Count chip */}
          <span className="plx-count-chip">
            <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            {loading ? "…" : filtered.length} shown
          </span>

          {/* Clear */}
          {hasFilter && (
            <button className="plx-clear-btn" onClick={clearFilters}>Clear filters</button>
          )}
        </div>

        {/* ── Type quick-filter pills ── */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
          {["", ...Object.keys(TYPE_OPTIONS)].map(t => (
            <button
              key={t || "all"}
              className={`plx-pill${type === t ? " plx-pill-active" : ""}`}
              onClick={() => { setType(t); setSubType(""); }}
            >
              {t || "All Types"}
            </button>
          ))}
        </div>

        {/* ── Table ── */}
        <div className="plx-panel">
          <table className="plx-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Type</th>
                <th>Sub Type</th>
                <th className="plx-th-right">Created</th>
                <th className="plx-th-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <SkeletonRows/>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="plx-empty">
                      <div className="plx-empty-icon"><BoxIcon/></div>
                      <p className="plx-empty-title">No products found</p>
                      <p className="plx-empty-sub">
                        {hasFilter ? "Try clearing your filters" : "No products have been added yet"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map(p => (
                  <tr key={p._id} className="plx-row">
                    <td><span className="plx-product-name">{p.productName}</span></td>
                    <td><TypeBadge type={p.type}/></td>
                    <td>
                      {NO_SUBTYPE.has(p.type)
                        ? <span style={{fontSize:12,color:"#cbd5e1",fontStyle:"italic"}}>—</span>
                        : <span className="plx-subtype-badge">{p.subType || "—"}</span>}
                    </td>
                    <td className="plx-td-right plx-td-mono">
                      {new Date(p.createdAt).toLocaleDateString("en-PK",{ day:"numeric", month:"short", year:"numeric" })}
                    </td>
                    <td className="plx-td-right">
                      <div style={{ display:"flex", justifyContent:"flex-end", gap:7 }}>
                        <button className="plx-btn-edit" onClick={() => openEdit(p)}>
                          <EditIcon/> Edit
                        </button>
                        <button className="plx-btn-del" onClick={() => confirmDelete(p)}>
                          <TrashIcon/> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Edit modal ── */}
        {editingProduct && (
          <div className="plx-backdrop" onClick={e => { if(e.target===e.currentTarget) setEditingProduct(null); }}>
            <div className="plx-modal">

              <div className="plx-modal-head">
                <span className="plx-modal-title">Edit Product</span>
                <button className="plx-modal-close" onClick={() => setEditingProduct(null)}>
                  <CloseIcon/>
                </button>
              </div>

              <div className="plx-modal-body">
                {/* Product Name — editable */}
                <div className="plx-field" style={{ minWidth:"unset" }}>
                  <label className="plx-label">Product Name <span style={{color:"#ef4444"}}>*</span></label>
                  <input
                    className="plx-input"
                    placeholder="e.g. Eeri 06, Super Kernel…"
                    value={editForm.productName}
                    onChange={e => setEditForm(f => ({ ...f, productName: e.target.value }))}
                  />
                </div>

                {/* Type — LOCKED, shown as info badge */}
                <div>
                  <label className="plx-label" style={{marginBottom:6,display:"block"}}>Type <span style={{color:"#94a3b8",fontWeight:400,textTransform:"none",fontSize:10}}>(locked)</span></label>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <TypeBadge type={editForm.type}/>
                    <span style={{fontSize:11,color:"#94a3b8",fontStyle:"italic"}}>Cannot be changed after creation</span>
                  </div>
                </div>

                {/* Sub Type — pill selector if applicable */}
                {!NO_SUBTYPE.has(editForm.type) && (
                  <div>
                    <label className="plx-label" style={{marginBottom:7,display:"block"}}>Sub Type <span style={{color:"#ef4444"}}>*</span></label>
                    <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                      {(TYPE_OPTIONS[editForm.type]||[]).map(st => (
                        <button
                          key={st} type="button"
                          onClick={() => setEditForm(f => ({ ...f, subType: st }))}
                          className={`apx-subpill${editForm.subType === st ? " apx-subpill-active" : ""}`}
                          style={{
                            padding:"6px 14px", borderRadius:20, fontSize:12.5, fontWeight:600,
                            border: editForm.subType === st ? "1.5px solid #34d399" : "1.5px solid #e2e8f0",
                            background: editForm.subType === st ? "#ecfdf5" : "#f8fafc",
                            color: editForm.subType === st ? "#065f46" : "#64748b",
                            cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all .12s",
                          }}>
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {NO_SUBTYPE.has(editForm.type) && (
                  <div style={{ display:"inline-flex", alignItems:"center", gap:6,
                    padding:"7px 13px", borderRadius:9, background:"#f0fdf4",
                    border:"1.5px solid #bbf7d0", fontSize:12.5, color:"#065f46", fontWeight:600 }}>
                    <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    No sub-type for {editForm.type}
                  </div>
                )}

                {/* Live preview */}
                <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 14px",
                  background:"#f8fafc", borderRadius:10, border:"1.5px solid #f1f5f9" }}>
                  <span style={{ fontSize:11, color:"#94a3b8", fontWeight:700, textTransform:"uppercase", letterSpacing:".05em" }}>Preview:</span>
                  <span style={{ fontWeight:700, fontSize:13, color:"#0f172a" }}>
                    {[editForm.productName||"…", editForm.type, editForm.subType].filter(Boolean).join(" - ")}
                  </span>
                </div>
              </div>

              <div className="plx-modal-foot">
                <button className="plx-btn-cancel" onClick={() => setEditingProduct(null)}>Cancel</button>
                <button
                  className="plx-btn-save"
                  onClick={updateProduct}
                  disabled={saving || !editForm.productName || !editForm.type || (!NO_SUBTYPE.has(editForm.type) && !editForm.subType)}
                >
                  {saving ? "Saving…" : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Delete confirmation modal ── */}
        {deleteTarget && (
          <div className="plx-backdrop" onClick={e => { if(e.target===e.currentTarget) setDeleteTarget(null); }}>
            <div className="plx-modal" style={{ maxWidth:380 }}>
              <div className="plx-modal-head" style={{ background:"#7f1d1d" }}>
                <span className="plx-modal-title">Delete Product?</span>
                <button className="plx-modal-close" onClick={() => setDeleteTarget(null)}><CloseIcon/></button>
              </div>
              <div style={{ padding:"28px 24px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", gap:12 }}>
                <div style={{ width:52, height:52, borderRadius:"50%", background:"#fef2f2",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  border:"2px solid #fecaca", color:"#dc2626" }}>
                  <TrashIcon/>
                </div>
                <p style={{ fontWeight:700, fontSize:15, color:"#0f172a", margin:0 }}>
                  Delete this product?
                </p>
                <p style={{ fontSize:13, color:"#64748b", lineHeight:1.6, margin:0 }}>
                  You're about to permanently delete{" "}
                  <strong style={{ color:"#0f172a" }}>
                    {[deleteTarget.productName, deleteTarget.type, deleteTarget.subType].filter(Boolean).join(" - ")}
                  </strong>.
                  This cannot be undone.
                </p>
              </div>
              <div className="plx-modal-foot">
                <button className="plx-btn-cancel" onClick={() => setDeleteTarget(null)}>Cancel</button>
                <button onClick={executeDelete}
                  style={{ padding:"9px 22px", borderRadius:9, border:"none",
                    background:"#dc2626", color:"#fff", fontSize:13, fontWeight:700,
                    cursor:"pointer", fontFamily:"'DM Sans', sans-serif" }}>
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
      </div>
    </SidebarLayout>
  );
}