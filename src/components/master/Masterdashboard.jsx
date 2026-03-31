// src/components/master/MasterDashboard.jsx
import React, { useState, useCallback } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { Badge, Spin, ConfirmDialog, fmtDate, fmtFull, fmtPKR, fmtCnic, PAY_STYLE } from "./masterStyles.jsx";
import { authFetch } from "./Masterportal.jsx";

// ── Expandable payment entry ──────────────────────────────────────────────────
function PaymentEntry({ p }) {
  const [open, setOpen] = useState(false);
  const s = PAY_STYLE[p.category] || PAY_STYLE.other;
  return (
    <div className="mp-pe" onClick={()=>setOpen(o=>!o)}>
      <div className="mp-pe-top">
        <span className="mp-pe-cat" style={{background:s.bg,color:s.color,borderColor:s.border}}>{s.label}</span>
        <span style={{flex:1,fontFamily:"'DM Mono',monospace",fontSize:13,fontWeight:700,color:"#111827"}}>{fmtPKR(p.amount)}</span>
        <span style={{fontSize:10,color:"#9ca3af",fontFamily:"'DM Mono',monospace"}}>{fmtDate(p.paidDate||p.recordedAt)}</span>
        <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2.5}
          style={{flexShrink:0,transition:"transform .14s",transform:open?"rotate(180deg)":"none"}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
      {open && (
        <div className="mp-pe-body">
          {p.tid           && <div className="mp-pe-row">TID: <span>{p.tid}</span></div>}
          {p.senderBank    && <div className="mp-pe-row">Sender Bank: <span>{p.senderBank}</span></div>}
          {p.senderTitle   && <div className="mp-pe-row">Sender: <span>{p.senderTitle}</span></div>}
          {p.senderAccount && <div className="mp-pe-row">A/C: <span style={{fontFamily:"'DM Mono',monospace"}}>{p.senderAccount}</span></div>}
          {p.notes         && <div className="mp-pe-row">Notes: <span>{p.notes}</span></div>}
          {p.invoiceNo     && <div className="mp-pe-row">Invoice: <span style={{color:"#15803d"}}>{p.invoiceNo}</span></div>}
          {p.invoiceUrl    && <div className="mp-pe-row" style={{gridColumn:"span 2"}}><a href={p.invoiceUrl} target="_blank" rel="noreferrer" style={{color:"#1d4ed8",fontSize:11}}>↗ Download Invoice</a></div>}
          <div className="mp-pe-row">Recorded: <span>{fmtFull(p.recordedAt)}</span></div>
        </div>
      )}
    </div>
  );
}

// ── Record Payment Modal ──────────────────────────────────────────────────────
function RecordPaymentModal({ mill, onClose, onSaved, showToast }) {
  const [form, setForm] = useState({
    paymentCategory: mill.paymentPlanType==="full"?"setup_full":"setup_installment",
    tid:"", amount:"", senderBank:"", senderTitle:"", senderAccount:"", notes:"",
    paidDate: new Date().toISOString().split("T")[0],
  });
  const [busy, setBusy] = useState(false);
  const upd = k => e => setForm(p=>({...p,[k]:e.target.value}));

  const submit = async () => {
    if (!form.tid.trim())    return showToast("Transaction ID required", false);
    if (!Number(form.amount)) return showToast("Valid amount required", false);
    setBusy(true);
    try {
      const r = await authFetch(`${API_BASE_URL}/master/mills/${mill.millId}/record-payment`, { method:"POST", body:JSON.stringify(form) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message);
      showToast(d.message, true);
      onSaved && onSaved(d.mill);
      onClose();
    } catch(e) { showToast(e.message, false); }
    setBusy(false);
  };

  return (
    <div className="mp-modal-overlay" onClick={onClose}>
      <div className="mp-modal" style={{maxWidth:500}} onClick={e=>e.stopPropagation()}>
        <div className="mp-modal-hd">
          <div className="mp-modal-title">Record Payment — {mill.businessName}</div>
          <button className="mp-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="mp-modal-body">
          <div className="mp-g2">
            <div className="mp-field">
              <label className="mp-lbl">Payment Type</label>
              <select className="mp-sel" value={form.paymentCategory} onChange={upd("paymentCategory")}>
                <option value="setup_full">Setup — Full Payment</option>
                <option value="setup_installment">Setup — Installment</option>
                <option value="quarterly">Quarterly Maintenance</option>
                <option value="biannual">Bi-Annual Maintenance</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mp-field">
              <label className="mp-lbl">Amount (Rs) <em>*</em></label>
              <input className="mp-inp mono" type="number" placeholder="0" value={form.amount} onChange={upd("amount")}/>
            </div>
            <div className="mp-field">
              <label className="mp-lbl">Transaction ID <em>*</em></label>
              <input className="mp-inp mono" placeholder="TID / Ref No." value={form.tid} onChange={upd("tid")}/>
            </div>
            <div className="mp-field">
              <label className="mp-lbl">Date Paid</label>
              <input className="mp-inp" type="date" value={form.paidDate} onChange={upd("paidDate")}/>
            </div>
            <div className="mp-field">
              <label className="mp-lbl">Sender Bank</label>
              <input className="mp-inp" placeholder="e.g. UBL" value={form.senderBank} onChange={upd("senderBank")}/>
            </div>
            <div className="mp-field">
              <label className="mp-lbl">Sender Name</label>
              <input className="mp-inp" placeholder="Account holder" value={form.senderTitle} onChange={upd("senderTitle")}/>
            </div>
            <div className="mp-field" style={{gridColumn:"span 2"}}>
              <label className="mp-lbl">Sender Account No.</label>
              <input className="mp-inp mono" placeholder="Account number" value={form.senderAccount} onChange={upd("senderAccount")}/>
            </div>
            <div className="mp-field" style={{gridColumn:"span 2"}}>
              <label className="mp-lbl">Notes</label>
              <input className="mp-inp" placeholder="Optional" value={form.notes} onChange={upd("notes")}/>
            </div>
          </div>
          <div className="mp-info-box" style={{marginTop:4}}>
            Received into: <strong>HBL — ALI RAZA SALEEM — A/C: 02967901869503</strong><br/>
            Invoice auto-generated and emailed to <strong>{mill.email}</strong>.
          </div>
        </div>
        <div className="mp-modal-foot">
          <button className="mp-btn mp-btn-outline mp-btn-sm" onClick={onClose}>Cancel</button>
          <button className="mp-btn mp-btn-green mp-btn-sm" onClick={submit} disabled={busy}>
            {busy?<><Spin/> Recording…</>:"✓ Record Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Mill Detail Modal (full modal dialog, not sidebar) ────────────────────────
function MillModal({ mill: initMill, onClose, onAction, showToast, onMillUpdate }) {
  const [mill,      setMill]      = useState(initMill);
  const [billing,   setBilling]   = useState(initMill.billingDate?new Date(initMill.billingDate).toISOString().split("T")[0]:"");
  const [showPay,   setShowPay]   = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetPwd,  setResetPwd]  = useState("");
  const [resetBusy, setResetBusy] = useState(false);
  const [confirm,   setConfirm]   = useState(null);
  const [actBusy,   setActBusy]   = useState("");

  const payments   = [...(mill.payments||[])].sort((a,b)=>new Date(b.paidDate||b.recordedAt)-new Date(a.paidDate||a.recordedAt));
  const totalPaid  = payments.reduce((s,p)=>s+(p.amount||0),0);
  const pkg        = mill.packageId || {};
  const docs       = mill.documents || [];
  const hasPay     = payments.length > 0;

  const doAction = async action => {
    setActBusy(action);
    const ok = await onAction(mill.millId, action);
    if (ok && action==="delete") { onClose(); return; }
    if (ok) {
      try {
        const r = await authFetch(`${API_BASE_URL}/master/mills/${mill.millId}`);
        if (r.ok) { const d = await r.json(); setMill(d); onMillUpdate&&onMillUpdate(d); }
      } catch {}
    }
    setActBusy("");
  };

  const doReset = async () => {
    if (!resetPwd||resetPwd.length<8) return showToast("Min 8 characters", false);
    setResetBusy(true);
    const r = await authFetch(`${API_BASE_URL}/master/mills/${mill.millId}/reset-password`, { method:"POST", body:JSON.stringify({newPassword:resetPwd}) });
    const d = await r.json();
    if (r.ok) { showToast("Password reset & email sent ✓",true); setShowReset(false); setResetPwd(""); }
    else showToast(d.message,false);
    setResetBusy(false);
  };

  const saveBilling = async () => {
    if (!billing) return;
    const r = await authFetch(`${API_BASE_URL}/master/mills/${mill.millId}/billing-date`, { method:"POST", body:JSON.stringify({billingDate:billing}) });
    const d = await r.json();
    showToast(d.message, r.ok);
  };

  const Section = ({title}) => (
    <div style={{fontSize:9,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#9ca3af",fontFamily:"'DM Mono',monospace",paddingBottom:6,marginBottom:9,marginTop:16,borderBottom:"1px solid #f3f4f6",display:"flex",alignItems:"center",gap:5}}>
      <span style={{width:3,height:10,background:"#111827",borderRadius:2,display:"inline-block"}}/>
      {title}
    </div>
  );

  return (
    <>
      {confirm && (
        <ConfirmDialog
          open title={`Confirm — ${confirm.label}`}
          message={confirm.action==="delete"
            ? `Permanently delete "${mill.businessName}"? This cannot be undone.`
            : `Are you sure you want to ${confirm.label.toLowerCase()} "${mill.businessName}"?`}
          danger={confirm.action==="delete"||confirm.action==="restrict"}
          onConfirm={()=>{ doAction(confirm.action); setConfirm(null); }}
          onCancel={()=>setConfirm(null)}
        />
      )}

      {/* Modal overlay — clicking outside closes */}
      <div className="mp-modal-overlay" style={{alignItems:"flex-start",paddingTop:32}} onClick={onClose}>
        <div className="mp-modal" style={{maxWidth:760,width:"100%"}} onClick={e=>e.stopPropagation()}>
          {/* ── Header ── */}
          <div className="mp-modal-hd" style={{background:"#f9fafb"}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:5}}>
                <div style={{fontSize:16,fontWeight:700,color:"#111827"}}>{mill.businessName}</div>
                <Badge status={mill.approvalStatus}/>
                {pkg.name&&<span className="t-pkg" style={{color:pkg.color||"#374151",borderColor:(pkg.color||"#374151")+"33",background:(pkg.color||"#374151")+"10"}}>{pkg.tier||pkg.name}</span>}
                <span style={{fontSize:10,color:mill.isActive?"#15803d":"#9ca3af",fontFamily:"'DM Mono',monospace",fontWeight:600}}>{mill.isActive?"● Live":"○ Inactive"}</span>
              </div>
              <div style={{fontSize:10,color:"#9ca3af",fontFamily:"'DM Mono',monospace"}}>{mill.millId}</div>
            </div>
            <button className="mp-modal-close" onClick={onClose}>✕</button>
          </div>

          {/* ── Body ── */}
          <div style={{padding:"16px 20px",maxHeight:"72vh",overflowY:"auto"}}>

            {!hasPay && (
              <div className="mp-warn-box" style={{marginBottom:12}}>
                ⚠️ No payment recorded. Approval is blocked until at least one payment is entered.
              </div>
            )}

            {/* Info grid */}
            <Section title="Business & Plan"/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
              {[
                ["Owner",        mill.ownerName],
                ["Email",        mill.email],
                ["Phone",        mill.phone||"—"],
                ["CNIC",         fmtCnic(mill.adminCnic||"")],
                ["Package",      pkg.name||mill.plan||"—"],
                ["Plan Type",    mill.paymentPlanType||"full"],
                ["Package Price",fmtPKR(mill.packagePrice)],
                ["Maintenance",  mill.packageId?.maintenanceFee>0?fmtPKR(mill.packageId.maintenanceFee)+"/mo":"—"],
                ["Next Billing", fmtDate(mill.nextBillingDate||mill.billingDate)],
                ["Registered",   fmtDate(mill.createdAt)],
                ["Activated",    mill.activatedAt?fmtDate(mill.activatedAt):"Not yet"],
                ["NTN",          mill.ntnNumber||"—"],
              ].map(([k,v])=>(
                <div key={k} style={{background:"#f9fafb",border:"1px solid #f3f4f6",borderRadius:5,padding:"6px 9px"}}>
                  <div style={{fontSize:8,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#9ca3af",fontFamily:"'DM Mono',monospace",marginBottom:2}}>{k}</div>
                  <div style={{fontSize:12,color:"#111827",fontWeight:500,wordBreak:"break-all",lineHeight:1.4}}>{v}</div>
                </div>
              ))}
            </div>

            {/* Password reset */}
            <Section title="Access"/>
            {!showReset ? (
              <button onClick={()=>setShowReset(true)} className="mp-btn mp-btn-outline mp-btn-sm">🔑 Reset Admin Password</button>
            ) : (
              <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:7,padding:"11px 13px"}}>
                <div style={{fontSize:9.5,fontWeight:700,color:"#dc2626",letterSpacing:".07em",textTransform:"uppercase",fontFamily:"'DM Mono',monospace",marginBottom:7}}>Set New Password</div>
                <div style={{display:"flex",gap:6}}>
                  <input className="mp-inp mono" type="text" placeholder="Min 8 characters" style={{flex:1,border:"1px solid #fecaca"}} value={resetPwd} onChange={e=>setResetPwd(e.target.value)}/>
                  <button onClick={doReset} disabled={resetBusy} className="mp-btn mp-btn-danger mp-btn-sm">{resetBusy?<Spin/>:"Set"}</button>
                  <button onClick={()=>{setShowReset(false);setResetPwd("");}} className="mp-btn mp-btn-outline mp-btn-sm">✕</button>
                </div>
                <div style={{fontSize:10,color:"#dc2626",marginTop:5}}>New password will be emailed to the admin.</div>
              </div>
            )}

            {/* Documents */}
            {docs.length>0 && (
              <>
                <Section title={`Documents (${docs.length})`}/>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}}>
                  {docs.map((doc,i)=>{
                    const isImg=/\.(png|jpg|jpeg|webp|gif)$/i.test(doc.fileUrl||"");
                    return (
                      <a key={i} href={doc.fileUrl||"#"} target="_blank" rel="noreferrer"
                        style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:5,padding:7,textDecoration:"none",display:"block",textAlign:"center"}}>
                        {isImg?<img src={doc.fileUrl} alt="" style={{width:"100%",height:36,objectFit:"cover",borderRadius:3,marginBottom:3}} onError={e=>e.target.style.display="none"}/>:<div style={{height:36,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,marginBottom:3}}>📄</div>}
                        <div style={{fontSize:9,color:"#6b7280",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{doc.name||`Doc ${i+1}`}</div>
                      </a>
                    );
                  })}
                </div>
              </>
            )}

            {/* Payments */}
            <Section title="Payments"/>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
              <span style={{fontSize:11,color:"#6b7280"}}>{payments.length} payment(s)</span>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:700,color:"#15803d"}}>{fmtPKR(totalPaid)} total</span>
            </div>
            {payments.length===0
              ? <div style={{padding:"12px",textAlign:"center",color:"#9ca3af",fontSize:12.5,background:"#f9fafb",borderRadius:6,border:"1px dashed #e5e7eb"}}>No payments recorded yet</div>
              : payments.slice(0,6).map((p,i)=><PaymentEntry key={i} p={p}/>)
            }
            <button onClick={()=>setShowPay(true)} className="mp-btn mp-btn-outline mp-btn-sm" style={{width:"100%",marginTop:7,justifyContent:"center"}}>
              + Record Payment
            </button>

            {/* Billing date */}
            <Section title="Next Billing Date"/>
            <div style={{display:"flex",gap:7,maxWidth:360}}>
              <input type="date" className="mp-inp" value={billing} onChange={e=>setBilling(e.target.value)} style={{flex:1}}/>
              <button onClick={saveBilling} className="mp-btn mp-btn-primary mp-btn-sm">Update</button>
            </div>

          </div>

          {/* ── Footer actions ── */}
          <div style={{padding:"11px 20px",borderTop:"1px solid #e5e7eb",display:"flex",gap:7,flexWrap:"wrap",background:"#f9fafb"}}>
            {mill.approvalStatus==="pending" && (
              <button
                className="mp-btn mp-btn-green mp-btn-sm"
                style={{flex:1,justifyContent:"center",opacity:!hasPay?0.45:1,cursor:!hasPay?"not-allowed":"pointer"}}
                disabled={actBusy==="approve"||!hasPay}
                onClick={()=>hasPay?setConfirm({action:"approve",label:"Approve Mill"}):showToast("Record first payment before approving",false)}>
                {actBusy==="approve"?<><Spin/> …</>:"✓ Approve Mill"}
              </button>
            )}
            {mill.approvalStatus==="approved" && (
              <button className="mp-btn mp-btn-danger mp-btn-sm" style={{flex:1,justifyContent:"center"}} disabled={actBusy==="restrict"}
                onClick={()=>setConfirm({action:"restrict",label:"Restrict Mill"})}>
                {actBusy==="restrict"?<><Spin/> …</>:"🚫 Restrict"}
              </button>
            )}
            {mill.approvalStatus==="restricted" && (
              <button className="mp-btn mp-btn-green mp-btn-sm" style={{flex:1,justifyContent:"center"}} disabled={actBusy==="unrestrict"}
                onClick={()=>setConfirm({action:"unrestrict",label:"Restore Mill"})}>
                {actBusy==="unrestrict"?<><Spin/> …</>:"✅ Restore"}
              </button>
            )}
            <button className="mp-btn mp-btn-outline mp-btn-sm" style={{padding:"6px 10px"}}
              onClick={()=>setConfirm({action:"delete",label:"Delete Mill"})}>
              <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </div>
      </div>

      {showPay && (
        <RecordPaymentModal
          mill={mill}
          onClose={()=>setShowPay(false)}
          showToast={showToast}
          onSaved={upd=>{
            setMill(m=>({...m,...upd}));
            onMillUpdate&&onMillUpdate({...mill,...upd});
          }}
        />
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN EXPORT — full-width table, mill opens as centered modal
// ═══════════════════════════════════════════════════════════════════
export default function MasterDashboard({ mills, stats, packages, loading, filter, setFilter, search, setSearch, doAction, showToast, fetchMills, onRegister }) {
  const [selected, setSelected] = useState(null);

  const openMill = useCallback(async m => {
    try {
      const r = await authFetch(`${API_BASE_URL}/master/mills/${m.millId}`);
      if (r.ok) setSelected(await r.json());
      else setSelected(m);
    } catch { setSelected(m); }
  }, []);

  const revenue = (stats.approved||0) * 7500;

  return (
    <div>
      <div className="mp-page-h">Dashboard</div>
      <div className="mp-page-sub">Platform overview and mill management</div>

      <div className="mp-stats">
        {[
          {lbl:"Total Mills",  num:stats.total||0,      ac:"#374151"},
          {lbl:"Pending",      num:stats.pending||0,    ac:"#d97706"},
          {lbl:"Active",       num:stats.approved||0,   ac:"#15803d"},
          {lbl:"Restricted",   num:stats.restricted||0, ac:"#dc2626"},
        ].map(s=>(
          <div key={s.lbl} className="mp-sc" style={{"--ac":s.ac}}>
            <div className="mp-sc-lbl">{s.lbl}</div>
            <div className="mp-sc-num">{s.num}</div>
          </div>
        ))}
      </div>

      <div className="mp-rev" style={{marginBottom:18}}>
        <div style={{flex:1}}>
          <div className="mp-rev-lbl">Estimated Monthly Revenue</div>
          <div className="mp-rev-num">{fmtPKR(revenue)}</div>
          <div className="mp-rev-sub">{stats.approved||0} active mills</div>
        </div>
        <button onClick={onRegister} className="mp-btn mp-btn-green">
          <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          Register New Mill
        </button>
      </div>

      {/* Toolbar */}
      <div className="mp-toolbar">
        <div className="mp-srch">
          <span className="mp-srch-ico"><svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></span>
          <input placeholder="Search mill, owner, email…" value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        {["all","pending","approved","restricted"].map(f=>(
          <button key={f} className={`mp-tab-btn${filter===f?(f==="pending"?" on-warn":f==="restricted"?" on-err":" on"):""}`} onClick={()=>setFilter(f)}>
            {f==="all"?"All":f.charAt(0).toUpperCase()+f.slice(1)}
          </button>
        ))}
      </div>

      {/* Full-width table */}
      <div className="mp-card">
        {loading ? (
          <div className="mp-empty"><Spin/> Loading…</div>
        ) : mills.length===0 ? (
          <div className="mp-empty">No mills found.</div>
        ) : (
          <table>
            <thead>
              <tr><th>Business</th><th>Owner</th><th>Package</th><th>Status</th><th>Next Billing</th><th>Payments</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {mills.map(m=>{
                const pkg = m.packageId||{};
                return (
                  <tr key={m._id} onClick={()=>openMill(m)} style={{cursor:"pointer"}}>
                    <td>
                      <div className="t-biz">{m.businessName}</div>
                      <div className="t-id">{m.millId}</div>
                    </td>
                    <td className="t-dim">{m.ownerName}</td>
                    <td>
                      {pkg.name&&<span className="t-pkg" style={{color:pkg.color||"#374151",borderColor:(pkg.color||"#374151")+"33",background:(pkg.color||"#374151")+"10"}}>{pkg.tier||pkg.name}</span>}
                    </td>
                    <td><Badge status={m.approvalStatus}/></td>
                    <td className="t-dim">{fmtDate(m.nextBillingDate||m.billingDate)}</td>
                    <td>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:600,color:(m.payments?.length||0)>0?"#15803d":"#9ca3af"}}>
                        {m.payments?.length||0} recorded
                      </span>
                    </td>
                    <td onClick={e=>e.stopPropagation()}>
                      <div className="qbtns">
                        {m.approvalStatus==="pending"    && <button className="qbtn qbtn-app" onClick={()=>{if((m.payments?.length||0)>0)doAction(m.millId,"approve");else showToast("Record payment first",false);}}>Approve</button>}
                        {m.approvalStatus==="approved"   && <button className="qbtn qbtn-res" onClick={()=>doAction(m.millId,"restrict")}>Restrict</button>}
                        {m.approvalStatus==="restricted" && <button className="qbtn qbtn-unr" onClick={()=>doAction(m.millId,"unrestrict")}>Restore</button>}
                        <button className="qbtn" style={{background:"#f9fafb",borderColor:"#e5e7eb",color:"#374151",fontSize:10}} onClick={()=>openMill(m)}>View →</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Mill detail modal */}
      {selected && (
        <MillModal
          mill={selected}
          onClose={()=>setSelected(null)}
          onAction={doAction}
          showToast={showToast}
          onMillUpdate={upd=>{
            setSelected(upd);
            fetchMills();
          }}
        />
      )}
    </div>
  );
}