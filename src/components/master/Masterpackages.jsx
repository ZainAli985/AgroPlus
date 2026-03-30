// src/components/master/MasterPackages.jsx
import React, { useState, useCallback } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { Spin, ConfirmDialog, fmtPKR, ALL_ROUTES_GROUPED, ROUTE_LABELS, PLAN_TYPES } from "./masterStyles.jsx";
import { authFetch } from "./Masterportal.jsx";

const TIER_OPTIONS = ["STARTER","STANDARD","PROFESSIONAL","PREMIUM","ENTERPRISE","CUSTOM"];
const COLOR_OPTIONS = [
  "#6366f1","#8b5cf6","#ec4899","#ef4444","#f97316",
  "#f59e0b","#eab308","#22c55e","#15803d","#14b8a6",
  "#0ea5e9","#3b82f6","#111827","#6b7280",
];

function PackageForm({ initial, onSave, onCancel, showToast, isBusy }) {
  const [name,     setName]     = useState(initial?.name     || "");
  const [tier,     setTier]     = useState(initial?.tier     || "CUSTOM");
  const [price,    setPrice]    = useState(initial?.price    != null ? String(initial.price) : "");
  const [color,    setColor]    = useState(initial?.color    || "#6366f1");
  const [features, setFeatures] = useState((initial?.features || []).join("\n"));
  const [routes,   setRoutes]   = useState(new Set(initial?.allowedRoutes || []));

  const toggleRoute = (path) => {
    setRoutes(prev => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const selectGroup = (group, allPaths) => {
    const allOn = allPaths.every(p => routes.has(p));
    setRoutes(prev => {
      const next = new Set(prev);
      allPaths.forEach(p => allOn ? next.delete(p) : next.add(p));
      return next;
    });
  };

  const selectAll = () => {
    const all = Object.values(ALL_ROUTES_GROUPED).flat();
    const allOn = all.every(p => routes.has(p));
    setRoutes(new Set(allOn ? [] : all));
  };

  // Payment plan calculations
  const numPrice  = Number(price) || 0;
  const quarterly = numPrice > 0 ? Math.round(numPrice / 4)  : 0;
  const biannual  = numPrice > 0 ? Math.round(numPrice / 2)  : 0;
  const annual    = numPrice > 0 ? numPrice                    : 0;

  const handleSubmit = () => {
    if (!name.trim())       return showToast("Package name is required", false);
    if (!numPrice || numPrice <= 0) return showToast("Valid price required", false);
    if (routes.size === 0)  return showToast("Select at least one route", false);
    onSave({
      name:          name.trim(),
      tier:          tier.trim(),
      price:         numPrice,
      color,
      features:      features.split("\n").map(f => f.trim()).filter(Boolean),
      allowedRoutes: [...routes],
    });
  };

  return (
    <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, overflow:"hidden" }}>
      <div className="mp-card-hd" style={{ borderBottom:"1px solid #e5e7eb", padding:"13px 20px" }}>
        <span>{initial ? "Edit Package" : "New Package"}</span>
        {onCancel && <button className="mp-btn mp-btn-outline mp-btn-sm" onClick={onCancel}>Cancel</button>}
      </div>
      <div style={{ padding:"20px" }}>
        {/* Basic info */}
        <div className="mp-g2" style={{ marginBottom:18 }}>
          <div className="mp-field">
            <label className="mp-lbl">Package Name <em>*</em></label>
            <input className="mp-inp" placeholder="e.g. Starter, Professional…" value={name} onChange={e=>setName(e.target.value)}/>
          </div>
          <div className="mp-field">
            <label className="mp-lbl">Tier Label</label>
            <select className="mp-sel" value={tier} onChange={e=>setTier(e.target.value)}>
              {TIER_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="mp-field">
            <label className="mp-lbl">Setup Price (Rs) <em>*</em></label>
            <input className="mp-inp mono" type="number" min="0" placeholder="250000" value={price} onChange={e=>setPrice(e.target.value)}/>
          </div>
          <div className="mp-field">
            <label className="mp-lbl">Accent Color</label>
            <div style={{ display:"flex", gap:5, flexWrap:"wrap", paddingTop:4 }}>
              {COLOR_OPTIONS.map(c => (
                <button key={c} type="button" onClick={()=>setColor(c)}
                  style={{ width:24, height:24, borderRadius:5, background:c, border:`2px solid ${color===c?"#111827":"transparent"}`, cursor:"pointer", outline:"none", transition:".1s" }}/>
              ))}
            </div>
          </div>
        </div>

        {/* Payment plan preview */}
        {numPrice > 0 && (
          <div style={{ background:"#f9fafb", border:"1px solid #e5e7eb", borderRadius:7, padding:"14px 16px", marginBottom:18 }}>
            <div style={{ fontSize:9.5, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#9ca3af", fontFamily:"'DM Mono',monospace", marginBottom:10 }}>
              Auto-calculated payment plans based on Rs {numPrice.toLocaleString()}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
              {[
                { label:"Full Payment", sub:"One-time",     value:numPrice,  color:"#111827" },
                { label:"Quarterly",    sub:"Every 3 mo.",  value:quarterly, color:"#6366f1" },
                { label:"Bi-Annual",    sub:"Every 6 mo.",  value:biannual,  color:"#0ea5e9" },
                { label:"Annual",       sub:"Per year",     value:annual,    color:"#15803d" },
              ].map(p => (
                <div key={p.label} style={{ textAlign:"center", background:"#fff", border:`1px solid ${p.color}22`, borderRadius:6, padding:"10px 8px" }}>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:16, fontWeight:700, color:p.color }}>{fmtPKR(p.value)}</div>
                  <div style={{ fontSize:11, fontWeight:700, color:"#374151", marginTop:3 }}>{p.label}</div>
                  <div style={{ fontSize:10, color:"#9ca3af" }}>{p.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mp-field" style={{ marginBottom:18 }}>
          <label className="mp-lbl">Features (one per line)</label>
          <textarea className="mp-textarea" rows={5}
            placeholder={"Dashboard & Analytics\nChart of Accounts\nPurchase & Sales Invoices\n…"}
            value={features} onChange={e=>setFeatures(e.target.value)}/>
          <div style={{ fontSize:10.5, color:"#9ca3af", marginTop:4 }}>These will appear as bullet points on the package card.</div>
        </div>

        {/* Route access */}
        <div className="mp-field" style={{ marginBottom:18 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
            <label className="mp-lbl">Route Access <em>*</em></label>
            <div style={{ display:"flex", gap:6 }}>
              <button type="button" onClick={selectAll} className="mp-btn mp-btn-outline mp-btn-sm" style={{ fontSize:11 }}>
                Toggle All
              </button>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#15803d", fontWeight:700, padding:"5px 8px", background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:5 }}>
                {routes.size} selected
              </span>
            </div>
          </div>
          {Object.entries(ALL_ROUTES_GROUPED).map(([group, paths]) => {
            const allGroupOn = paths.every(p => routes.has(p));
            const someOn     = paths.some(p => routes.has(p));
            return (
              <div key={group} className="mp-route-group">
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                  <button type="button" onClick={() => selectGroup(group, paths)}
                    style={{ display:"flex", alignItems:"center", gap:5, background:"none", border:"none", cursor:"pointer", padding:0 }}>
                    <div style={{ width:14, height:14, border:`1.5px solid ${allGroupOn?"#15803d":someOn?"#6b7280":"#d1d5db"}`, borderRadius:3, background:allGroupOn?"#15803d":someOn?"rgba(107,114,128,.15)":"#fff", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {allGroupOn && <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                      {someOn && !allGroupOn && <div style={{ width:6, height:6, background:"#6b7280", borderRadius:1 }}/>}
                    </div>
                  </button>
                  <div className="mp-route-group-lbl">{group}</div>
                </div>
                <div className="mp-route-grid">
                  {paths.map(path => (
                    <div key={path} className={`mp-route-item${routes.has(path) ? " checked" : ""}`} onClick={() => toggleRoute(path)}>
                      <div className="mp-route-cb">
                        {routes.has(path) && <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                      </div>
                      <span>{ROUTE_LABELS[path] || path.split("/").pop()}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit */}
        <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
          {onCancel && <button className="mp-btn mp-btn-outline" onClick={onCancel}>Cancel</button>}
          <button className="mp-btn mp-btn-primary" onClick={handleSubmit} disabled={isBusy}>
            {isBusy ? <><Spin/> Saving…</> : initial ? "Update Package" : "Create Package"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Package display card ──────────────────────────────────────────────────────
function PkgCard({ pkg, onEdit, onDelete }) {
  const numPrice  = pkg.price || 0;
  const quarterly = Math.round(numPrice / 4);
  const biannual  = Math.round(numPrice / 2);

  return (
    <div style={{ background:"#fff", border:`1.5px solid ${pkg.color}22`, borderRadius:9, overflow:"hidden", position:"relative" }}>
      <div style={{ height:4, background:pkg.color }}/>
      <div style={{ padding:"16px 18px" }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, marginBottom:10 }}>
          <div>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:pkg.color, fontFamily:"'DM Mono',monospace", marginBottom:3 }}>{pkg.tier}</div>
            <div style={{ fontSize:16, fontWeight:700, color:"#111827", marginBottom:6 }}>{pkg.name}</div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:18, fontWeight:700, color:"#111827" }}>
              {fmtPKR(numPrice)}
              <span style={{ fontSize:11, color:"#9ca3af", fontWeight:400 }}> setup</span>
            </div>
          </div>
          <div style={{ display:"flex", gap:5, flexShrink:0 }}>
            <button className="mp-btn mp-btn-outline mp-btn-sm" onClick={onEdit}>Edit</button>
            <button className="mp-btn mp-btn-sm" style={{ background:"#fef2f2", color:"#dc2626", border:"1px solid #fecaca" }} onClick={onDelete}>Delete</button>
          </div>
        </div>

        {/* Plan previews */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6, marginBottom:14 }}>
          {[
            { label:"Quarterly", value:quarterly },
            { label:"Bi-Annual", value:biannual },
            { label:"Annual",    value:numPrice },
          ].map(p => (
            <div key={p.label} style={{ background:"#f9fafb", border:"1px solid #e5e7eb", borderRadius:6, padding:"7px 8px", textAlign:"center" }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, color:pkg.color }}>{fmtPKR(p.value)}</div>
              <div style={{ fontSize:9.5, color:"#9ca3af", marginTop:2 }}>{p.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        {(pkg.features || []).length > 0 && (
          <div style={{ marginBottom:12 }}>
            {pkg.features.slice(0, 5).map((f, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4, fontSize:12, color:"#374151" }}>
                <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke={pkg.color} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                {f}
              </div>
            ))}
            {pkg.features.length > 5 && (
              <div style={{ fontSize:11, color:"#9ca3af", marginLeft:17 }}>+{pkg.features.length - 5} more features</div>
            )}
          </div>
        )}

        {/* Routes count */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 10px", background:"#f9fafb", borderRadius:6, border:"1px solid #e5e7eb" }}>
          <span style={{ fontSize:11, color:"#6b7280" }}>Route access</span>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, fontWeight:700, color:pkg.color }}>
            {(pkg.allowedRoutes||[]).length} routes
          </span>
        </div>
      </div>
    </div>
  );
}

export default function MasterPackages({ packages, showToast, fetchPackages }) {
  const [showForm, setShowForm] = useState(false);
  const [editing,  setEditing]  = useState(null); // package object or null
  const [busy,     setBusy]     = useState(false);
  const [confirm,  setConfirm]  = useState(null); // { pkg }

  const save = useCallback(async (data) => {
    setBusy(true);
    try {
      const isEdit = !!editing;
      const url    = isEdit ? `${API_BASE_URL}/master/packages/${editing._id}` : `${API_BASE_URL}/master/packages`;
      const r      = await authFetch(url, { method: isEdit ? "PUT" : "POST", body: JSON.stringify(data) });
      const d      = await r.json();
      if (!r.ok) throw new Error(d.message);
      showToast(d.message, true);
      fetchPackages();
      setShowForm(false);
      setEditing(null);
    } catch (e) { showToast(e.message, false); }
    setBusy(false);
  }, [editing, fetchPackages, showToast]);

  const doDelete = useCallback(async (pkg) => {
    setBusy(true);
    try {
      const r = await authFetch(`${API_BASE_URL}/master/packages/${pkg._id}`, { method:"DELETE" });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message);
      showToast(d.message, true);
      fetchPackages();
    } catch (e) { showToast(e.message, false); }
    setBusy(false);
  }, [fetchPackages, showToast]);

  return (
    <div>
      {confirm && (
        <ConfirmDialog
          open
          title="Delete Package"
          message={`Delete package "${confirm.pkg.name}"? This cannot be undone. Any mills already assigned to this package will retain their settings.`}
          danger
          onConfirm={() => { doDelete(confirm.pkg); setConfirm(null); }}
          onCancel={() => setConfirm(null)}
        />
      )}

      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom:4 }}>
        <div>
          <div className="mp-page-h">Packages</div>
          <div className="mp-page-sub">Create and manage subscription packages — assigned at mill registration</div>
        </div>
        {!showForm && !editing && (
          <button className="mp-btn mp-btn-primary" style={{ flexShrink:0, marginTop:2 }} onClick={() => setShowForm(true)}>
            <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
            New Package
          </button>
        )}
      </div>

      {/* New/Edit form */}
      {(showForm || editing) && (
        <div style={{ marginBottom:24 }}>
          <PackageForm
            initial={editing || undefined}
            onSave={save}
            isBusy={busy}
            showToast={showToast}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        </div>
      )}

      {/* Package cards */}
      {packages.length === 0 && !showForm ? (
        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, padding:"44px", textAlign:"center" }}>
          <div style={{ fontSize:32, marginBottom:12 }}>📦</div>
          <div style={{ fontSize:14, fontWeight:600, color:"#374151", marginBottom:6 }}>No packages created yet</div>
          <div style={{ fontSize:13, color:"#9ca3af", marginBottom:18 }}>Create your first package to enable mill registration.</div>
          <button className="mp-btn mp-btn-primary" onClick={() => setShowForm(true)}>Create First Package</button>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:14 }}>
          {packages.map(pkg => (
            <PkgCard
              key={pkg._id}
              pkg={pkg}
              onEdit={() => { setEditing(pkg); setShowForm(false); window.scrollTo(0, 0); }}
              onDelete={() => setConfirm({ pkg })}
            />
          ))}
        </div>
      )}

      {/* Info box */}
      {packages.length > 0 && (
        <div className="mp-info-box" style={{ marginTop:16 }}>
          💡 Packages are selected during mill registration. Price breakdowns (Quarterly, Bi-Annual, Annual) are calculated automatically from the setup price.
        </div>
      )}
    </div>
  );
}