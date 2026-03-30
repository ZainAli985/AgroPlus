// src/components/master/MasterPackages.jsx
import React, { useState, useCallback } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { Spin, ConfirmDialog, fmtPKR, ALL_ROUTES_GROUPED, ROUTE_LABELS } from "./masterStyles.jsx";
import { authFetch } from "./Masterportal.jsx";

const TIER_OPTIONS = ["STARTER","STANDARD","PROFESSIONAL","PREMIUM","ENTERPRISE","CUSTOM"];
const COLORS = ["#6366f1","#8b5cf6","#ec4899","#ef4444","#f97316","#f59e0b","#22c55e","#15803d","#14b8a6","#0ea5e9","#3b82f6","#111827","#6b7280"];

// ── PackageForm is defined OUTSIDE all other components ──────────────────────
// This is critical — if defined inside MasterPackages it would re-create on
// every render, losing focus.
function PackageForm({ initial, onSave, onCancel, showToast, isBusy }) {
  const [name,           setName]           = useState(initial?.name           || "");
  const [tier,           setTier]           = useState(initial?.tier           || "CUSTOM");
  const [price,          setPrice]          = useState(initial?.price          != null ? String(initial.price) : "");
  const [maintenanceFee, setMaintenanceFee] = useState(initial?.maintenanceFee != null ? String(initial.maintenanceFee) : "");
  const [color,          setColor]          = useState(initial?.color          || "#6366f1");
  const [features,       setFeatures]       = useState((initial?.features || []).join("\n"));
  const [routes,         setRoutes]         = useState(new Set(initial?.allowedRoutes || []));

  const numPrice = Number(price) || 0;
  const numMaint = Number(maintenanceFee) || 0;

  const toggleRoute = path => setRoutes(prev => { const n=new Set(prev); n.has(path)?n.delete(path):n.add(path); return n; });

  const selectGroup = (group, paths) => {
    const allOn = paths.every(p => routes.has(p));
    setRoutes(prev => { const n=new Set(prev); paths.forEach(p => allOn?n.delete(p):n.add(p)); return n; });
  };

  const selectAll = () => {
    const all = Object.values(ALL_ROUTES_GROUPED).flat();
    setRoutes(new Set(all.every(p=>routes.has(p)) ? [] : all));
  };

  const handleSubmit = () => {
    if (!name.trim())            return showToast("Package name is required", false);
    if (!numPrice || numPrice<=0) return showToast("Valid setup price required", false);
    if (routes.size === 0)       return showToast("Select at least one route", false);
    onSave({ name:name.trim(), tier:tier.trim(), price:numPrice, maintenanceFee:numMaint, color, features:features.split("\n").map(f=>f.trim()).filter(Boolean), allowedRoutes:[...routes] });
  };

  // Payment plan preview
  const plans = [
    { label:"Full",      sub:"One-time",    value:numPrice,                   color:"#111827" },
    { label:"Quarterly", sub:"Every 3 mo.", value:Math.round(numPrice/4),    color:"#6366f1" },
    { label:"Bi-Annual", sub:"Every 6 mo.", value:Math.round(numPrice/2),    color:"#0ea5e9" },
    { label:"Annual",    sub:"Per year",    value:numPrice,                   color:"#15803d" },
  ];
  // Maintenance collected per period
  const maintPlans = numMaint > 0 ? [
    { label:"Quarterly maintenance",  value:numMaint*3 },
    { label:"Bi-Annual maintenance",  value:numMaint*6 },
    { label:"Annual maintenance",     value:numMaint*12 },
  ] : [];

  return (
    <div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden"}}>
      <div className="mp-card-hd">
        <span>{initial?"Edit Package":"New Package"}</span>
        {onCancel && <button className="mp-btn mp-btn-outline mp-btn-sm" onClick={onCancel}>Cancel</button>}
      </div>
      <div style={{padding:"18px 20px"}}>

        {/* ── Row 1: Name + Tier ── */}
        <div className="mp-g2" style={{marginBottom:12}}>
          <div className="mp-field" style={{marginBottom:0}}>
            <label className="mp-lbl">Package Name <em>*</em></label>
            <input className="mp-inp" placeholder="e.g. Starter" value={name} onChange={e=>setName(e.target.value)}/>
          </div>
          <div className="mp-field" style={{marginBottom:0}}>
            <label className="mp-lbl">Tier Label</label>
            <select className="mp-sel" value={tier} onChange={e=>setTier(e.target.value)}>
              {TIER_OPTIONS.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* ── Row 2: Setup Price + Maintenance Fee ── */}
        <div className="mp-g2" style={{marginBottom:12}}>
          <div className="mp-field" style={{marginBottom:0}}>
            <label className="mp-lbl">Setup Price (Rs) <em>*</em></label>
            <input className="mp-inp mono" type="number" min="0" placeholder="e.g. 250000" value={price} onChange={e=>setPrice(e.target.value)}/>
            <div style={{fontSize:10,color:"#9ca3af",marginTop:3}}>One-time installation fee</div>
          </div>
          <div className="mp-field" style={{marginBottom:0}}>
            <label className="mp-lbl">Monthly Maintenance (Rs)</label>
            <input className="mp-inp mono" type="number" min="0" placeholder="e.g. 7500" value={maintenanceFee} onChange={e=>setMaintenanceFee(e.target.value)}/>
            <div style={{fontSize:10,color:"#9ca3af",marginTop:3}}>Collected quarterly / bi-annually / annually</div>
          </div>
        </div>

        {/* ── Payment plan auto-preview ── */}
        {numPrice > 0 && (
          <div style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:7,padding:"11px 14px",marginBottom:12}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#9ca3af",fontFamily:"'DM Mono',monospace",marginBottom:8}}>
              Auto-calculated setup payment plans
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:numMaint>0?10:0}}>
              {plans.map(p=>(
                <div key={p.label} style={{textAlign:"center",background:"#fff",border:`1px solid ${p.color}22`,borderRadius:6,padding:"8px 6px"}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:14,fontWeight:700,color:p.color}}>{fmtPKR(p.value)}</div>
                  <div style={{fontSize:10,fontWeight:700,color:"#374151",marginTop:2}}>{p.label}</div>
                  <div style={{fontSize:9.5,color:"#9ca3af"}}>{p.sub}</div>
                </div>
              ))}
            </div>
            {numMaint > 0 && maintPlans.length > 0 && (
              <>
                <div style={{fontSize:9,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#9ca3af",fontFamily:"'DM Mono',monospace",marginBottom:7}}>
                  Maintenance collection amounts
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
                  {maintPlans.map(p=>(
                    <div key={p.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"#fff",border:"1px solid #e5e7eb",borderRadius:6,padding:"7px 10px"}}>
                      <span style={{fontSize:11,color:"#6b7280"}}>{p.label}</span>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:700,color:"#15803d"}}>{fmtPKR(p.value)}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Row 3: Accent Color ── */}
        <div className="mp-field" style={{marginBottom:12}}>
          <label className="mp-lbl">Accent Color</label>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",paddingTop:4}}>
            {COLORS.map(c=>(
              <button key={c} type="button" onClick={()=>setColor(c)}
                style={{width:22,height:22,borderRadius:4,background:c,border:`2px solid ${color===c?"#111827":"transparent"}`,cursor:"pointer",outline:"none",transition:".1s"}}/>
            ))}
          </div>
        </div>

        {/* ── Features ── */}
        <div className="mp-field" style={{marginBottom:12}}>
          <label className="mp-lbl">Features <span style={{fontWeight:400,textTransform:"none",letterSpacing:0}}>(one per line)</span></label>
          <textarea className="mp-textarea" rows={4}
            placeholder={"Dashboard & Analytics\nChart of Accounts\nPurchase & Sales Invoices\n…"}
            value={features} onChange={e=>setFeatures(e.target.value)}/>
        </div>

        {/* ── Route Access ── */}
        <div className="mp-field" style={{marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <label className="mp-lbl">Route Access <em>*</em></label>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <button type="button" onClick={selectAll} className="mp-btn mp-btn-outline mp-btn-sm" style={{fontSize:10.5}}>Toggle All</button>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:10.5,color:"#15803d",fontWeight:700,padding:"4px 8px",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:5}}>
                {routes.size} selected
              </span>
            </div>
          </div>
          {Object.entries(ALL_ROUTES_GROUPED).map(([group,paths])=>{
            const allOn = paths.every(p=>routes.has(p));
            const someOn = paths.some(p=>routes.has(p));
            return (
              <div key={group} className="mp-route-group">
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}>
                  <button type="button" onClick={()=>selectGroup(group,paths)} style={{display:"flex",alignItems:"center",gap:5,background:"none",border:"none",cursor:"pointer",padding:0}}>
                    <div style={{width:13,height:13,border:`1.5px solid ${allOn?"#15803d":someOn?"#6b7280":"#d1d5db"}`,borderRadius:3,background:allOn?"#15803d":someOn?"rgba(107,114,128,.15)":"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {allOn && <svg width={8} height={8} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                      {someOn&&!allOn && <div style={{width:5,height:5,background:"#6b7280",borderRadius:1}}/>}
                    </div>
                  </button>
                  <div className="mp-route-group-lbl">{group}</div>
                </div>
                <div className="mp-route-grid">
                  {paths.map(path=>(
                    <div key={path} className={`mp-route-item${routes.has(path)?" checked":""}`} onClick={()=>toggleRoute(path)}>
                      <div className="mp-route-cb">
                        {routes.has(path)&&<svg width={8} height={8} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                      </div>
                      <span style={{fontSize:11}}>{ROUTE_LABELS[path]||path.split("/").pop()}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
          {onCancel && <button className="mp-btn mp-btn-outline" onClick={onCancel}>Cancel</button>}
          <button className="mp-btn mp-btn-primary" onClick={handleSubmit} disabled={isBusy}>
            {isBusy?<><Spin/> Saving…</>:initial?"Update Package":"Create Package"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Package display card ──────────────────────────────────────────────────────
function PkgCard({ pkg, onEdit, onDelete }) {
  const p = pkg.price || 0;
  const m = pkg.maintenanceFee || 0;
  return (
    <div style={{background:"#fff",border:`1.5px solid ${pkg.color}22`,borderRadius:9,overflow:"hidden",position:"relative"}}>
      <div style={{height:4,background:pkg.color}}/>
      <div style={{padding:"14px 16px"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:10}}>
          <div>
            <div style={{fontSize:8.5,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:pkg.color,fontFamily:"'DM Mono',monospace",marginBottom:2}}>{pkg.tier}</div>
            <div style={{fontSize:15,fontWeight:700,color:"#111827",marginBottom:4}}>{pkg.name}</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:17,fontWeight:700,color:"#111827"}}>
              {fmtPKR(p)} <span style={{fontSize:10,color:"#9ca3af",fontWeight:400}}>setup</span>
            </div>
            {m>0 && <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:pkg.color,marginTop:3}}>{fmtPKR(m)}<span style={{fontSize:10,color:"#9ca3af"}}>/mo maintenance</span></div>}
          </div>
          <div style={{display:"flex",gap:5,flexShrink:0}}>
            <button className="mp-btn mp-btn-outline mp-btn-sm" onClick={onEdit}>Edit</button>
            <button className="mp-btn mp-btn-sm" style={{background:"#fef2f2",color:"#dc2626",border:"1px solid #fecaca"}} onClick={onDelete}>Delete</button>
          </div>
        </div>

        {/* Setup plan previews */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5,marginBottom:10}}>
          {[
            {label:"Full",      value:p},
            {label:"Quarterly", value:Math.round(p/4)},
            {label:"Bi-Annual", value:Math.round(p/2)},
            {label:"Annual",    value:p},
          ].map(x=>(
            <div key={x.label} style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:5,padding:"5px 6px",textAlign:"center"}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:11.5,fontWeight:700,color:pkg.color}}>{fmtPKR(x.value)}</div>
              <div style={{fontSize:9,color:"#9ca3af",marginTop:1}}>{x.label}</div>
            </div>
          ))}
        </div>

        {/* Maintenance collection */}
        {m>0 && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:5,marginBottom:10}}>
            {[{label:"Quarterly",value:m*3},{label:"Bi-Annual",value:m*6},{label:"Annual",value:m*12}].map(x=>(
              <div key={x.label} style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:5,padding:"5px 6px",textAlign:"center"}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11.5,fontWeight:700,color:"#15803d"}}>{fmtPKR(x.value)}</div>
                <div style={{fontSize:9,color:"#9ca3af",marginTop:1}}>{x.label} maint.</div>
              </div>
            ))}
          </div>
        )}

        {/* Features */}
        {(pkg.features||[]).length>0 && (
          <div style={{marginBottom:10}}>
            {pkg.features.slice(0,4).map((f,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:5,marginBottom:3,fontSize:11.5,color:"#374151"}}>
                <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke={pkg.color} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                {f}
              </div>
            ))}
            {pkg.features.length>4 && <div style={{fontSize:10.5,color:"#9ca3af",marginLeft:15}}>+{pkg.features.length-4} more</div>}
          </div>
        )}

        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 9px",background:"#f9fafb",borderRadius:5,border:"1px solid #e5e7eb"}}>
          <span style={{fontSize:10.5,color:"#6b7280"}}>Route access</span>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:11.5,fontWeight:700,color:pkg.color}}>{(pkg.allowedRoutes||[]).length} routes</span>
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function MasterPackages({ packages, showToast, fetchPackages }) {
  const [showForm, setShowForm] = useState(false);
  const [editing,  setEditing]  = useState(null);
  const [busy,     setBusy]     = useState(false);
  const [confirm,  setConfirm]  = useState(null);

  const save = useCallback(async (data) => {
    setBusy(true);
    try {
      const isEdit = !!editing;
      const url    = isEdit ? `${API_BASE_URL}/master/packages/${editing._id}` : `${API_BASE_URL}/master/packages`;
      const r      = await authFetch(url, { method:isEdit?"PUT":"POST", body:JSON.stringify(data) });
      const d      = await r.json();
      if (!r.ok) throw new Error(d.message);
      showToast(d.message, true);
      fetchPackages();
      setShowForm(false);
      setEditing(null);
    } catch(e) { showToast(e.message, false); }
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
    } catch(e) { showToast(e.message, false); }
    setBusy(false);
  }, [fetchPackages, showToast]);

  return (
    <div>
      {confirm && (
        <ConfirmDialog
          open title="Delete Package"
          message={`Delete "${confirm.pkg.name}"? Mills already using this package retain their current settings.`}
          danger
          onConfirm={() => { doDelete(confirm.pkg); setConfirm(null); }}
          onCancel={() => setConfirm(null)}
        />
      )}

      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,marginBottom:4}}>
        <div>
          <div className="mp-page-h">Packages</div>
          <div className="mp-page-sub">Create and manage subscription packages — assigned at mill registration</div>
        </div>
        {!showForm && !editing && (
          <button className="mp-btn mp-btn-primary" style={{flexShrink:0,marginTop:2}} onClick={()=>setShowForm(true)}>
            <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
            New Package
          </button>
        )}
      </div>

      {(showForm||editing) && (
        <div style={{marginBottom:22}}>
          <PackageForm
            initial={editing||undefined}
            onSave={save}
            isBusy={busy}
            showToast={showToast}
            onCancel={()=>{ setShowForm(false); setEditing(null); }}
          />
        </div>
      )}

      {packages.length===0 && !showForm ? (
        <div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:"40px",textAlign:"center"}}>
          <div style={{fontSize:30,marginBottom:10}}>📦</div>
          <div style={{fontSize:14,fontWeight:600,color:"#374151",marginBottom:5}}>No packages yet</div>
          <div style={{fontSize:12.5,color:"#9ca3af",marginBottom:16}}>Create your first package to enable mill registration.</div>
          <button className="mp-btn mp-btn-primary" onClick={()=>setShowForm(true)}>Create First Package</button>
        </div>
      ) : (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:12}}>
          {packages.map(pkg=>(
            <PkgCard key={pkg._id} pkg={pkg}
              onEdit={()=>{ setEditing(pkg); setShowForm(false); window.scrollTo(0,0); }}
              onDelete={()=>setConfirm({pkg})}
            />
          ))}
        </div>
      )}
    </div>
  );
}