// src/components/master/MasterAdmins.jsx
import React, { useState } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { Badge, Spin, EyeBtn, ConfirmDialog, fmtDate, fmtCnic, fmtPKR } from "./masterStyles.jsx";
import { authFetch } from "./Masterportal.jsx";

function ResetPasswordModal({ mill, onClose, showToast }) {
  const [pwd,  setPwd]  = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  const strength = (() => {
    let s = 0;
    if (pwd.length >= 8) s++;
    if (pwd.length >= 12) s++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) s++;
    if (/\d/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  })();
  const strColor = ["","#dc2626","#d97706","#2563eb","#15803d"][strength] || "#9ca3af";
  const strLabel = ["","Weak","Fair","Good","Strong"][strength] || "";

  const submit = async () => {
    if (!pwd || pwd.length < 8) return showToast("Password must be at least 8 characters", false);
    setBusy(true);
    const r = await authFetch(`${API_BASE_URL}/master/mills/${mill.millId}/reset-password`, {
      method:"POST", body: JSON.stringify({ newPassword: pwd }),
    });
    const d = await r.json();
    if (r.ok) { showToast("Password reset. Email sent to admin ✓", true); onClose(); }
    else showToast(d.message, false);
    setBusy(false);
  };

  return (
    <div className="mp-modal-overlay" onClick={onClose}>
      <div className="mp-modal" style={{ maxWidth:420 }} onClick={e=>e.stopPropagation()}>
        <div className="mp-modal-hd">
          <div className="mp-modal-title">Reset Password — {mill.businessName}</div>
          <button className="mp-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="mp-modal-body">
          <p style={{ fontSize:13, color:"#6b7280", marginBottom:16, lineHeight:1.6 }}>
            Set a new password for <strong>{mill.ownerName}</strong>. The new password will be emailed to <strong>{mill.email}</strong>.
          </p>
          <div className="mp-field">
            <label className="mp-lbl">New Password <em>*</em></label>
            <div className="mp-pwd-wrap">
              <input className="mp-inp" type={show?"text":"password"} placeholder="Minimum 8 characters" value={pwd} onChange={e=>setPwd(e.target.value)} style={{ paddingRight:38 }}/>
              <EyeBtn show={show} onToggle={() => setShow(s=>!s)}/>
            </div>
            {pwd.length > 0 && (
              <div style={{ marginTop:5 }}>
                <div className="mp-pwd-bars">
                  {[1,2,3,4].map(n=>(
                    <div key={n} className="mp-pwd-bar" style={{ background:strength>=n?strColor:"#f3f4f6" }}/>
                  ))}
                </div>
                <div style={{ fontSize:10.5, color:strColor, marginTop:3, fontWeight:600 }}>{strLabel}</div>
              </div>
            )}
          </div>
          <div className="mp-warn-box">
            ⚠️ The admin will receive the new password via email and should change it immediately after login.
          </div>
        </div>
        <div className="mp-modal-foot">
          <button className="mp-btn mp-btn-outline mp-btn-sm" onClick={onClose}>Cancel</button>
          <button className="mp-btn mp-btn-primary mp-btn-sm" onClick={submit} disabled={busy||!pwd||pwd.length<8}>
            {busy ? <><Spin/> Sending…</> : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MasterAdmins({ mills, stats, loading, showToast }) {
  const [search,     setSearch]     = useState("");
  const [selected,   setSelected]   = useState(null);
  const [resetMill,  setResetMill]  = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = mills.filter(m => {
    if (filterStatus !== "all" && m.approvalStatus !== filterStatus) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      m.businessName?.toLowerCase().includes(q) ||
      m.ownerName?.toLowerCase().includes(q) ||
      m.email?.toLowerCase().includes(q) ||
      m.adminCnic?.includes(q)
    );
  });

  return (
    <div>
      {resetMill && (
        <ResetPasswordModal
          mill={resetMill}
          onClose={() => setResetMill(null)}
          showToast={showToast}
        />
      )}

      <div className="mp-page-h">Mill Admins</div>
      <div className="mp-page-sub">View all registered mill administrators — manage access and credentials</div>

      {/* Stats */}
      <div className="mp-stats" style={{ gridTemplateColumns:"repeat(3,1fr)", marginBottom:18 }}>
        {[
          { lbl:"Total Admins",  num:stats.total||0,    ac:"#374151" },
          { lbl:"Active",        num:stats.approved||0, ac:"#15803d" },
          { lbl:"Pending",       num:stats.pending||0,  ac:"#d97706" },
        ].map(s => (
          <div key={s.lbl} className="mp-sc" style={{ "--ac":s.ac }}>
            <div className="mp-sc-lbl">{s.lbl}</div>
            <div className="mp-sc-num">{s.num}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"flex", gap:16 }}>
        {/* Table */}
        <div style={{ flex:1, minWidth:0 }}>
          <div className="mp-toolbar">
            <div className="mp-srch">
              <span className="mp-srch-ico"><svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></span>
              <input placeholder="Search by name, email or CNIC…" value={search} onChange={e=>setSearch(e.target.value)}/>
            </div>
            {["all","pending","approved","restricted"].map(f => (
              <button key={f} className={`mp-tab-btn${filterStatus===f?(f==="pending"?" on-warn":f==="restricted"?" on-err":" on"):""}`}
                onClick={() => setFilterStatus(f)}>
                {f==="all"?"All":f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            ))}
          </div>

          <div className="mp-card">
            {loading ? (
              <div className="mp-empty"><Spin/> Loading…</div>
            ) : filtered.length === 0 ? (
              <div className="mp-empty">No admins found.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Admin / Mill</th>
                    <th>CNIC</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(m => (
                    <tr key={m._id} className={selected?._id===m._id?"selected":""} onClick={()=>setSelected(m)} style={{ cursor:"pointer" }}>
                      <td>
                        <div className="t-biz">{m.ownerName}</div>
                        <div className="t-id">{m.businessName}</div>
                      </td>
                      <td><span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"#374151" }}>{fmtCnic(m.adminCnic||"")}</span></td>
                      <td>
                        <div className="t-dim" style={{ fontSize:12 }}>{m.email}</div>
                        {m.phone && <div className="t-id">{m.phone}</div>}
                      </td>
                      <td><Badge status={m.approvalStatus}/></td>
                      <td className="t-dim">{fmtDate(m.createdAt)}</td>
                      <td onClick={e=>e.stopPropagation()}>
                        <button className="qbtn" style={{ background:"#f9fafb", borderColor:"#e5e7eb", color:"#374151", fontSize:11 }}
                          onClick={() => setResetMill(m)}>
                          🔑 Reset Password
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Admin Detail Panel */}
        {selected && (
          <div style={{ width:320, flexShrink:0 }}>
            <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, overflow:"hidden", animation:"mp-in .18s ease", position:"sticky", top:0 }}>
              <div style={{ padding:"13px 16px", borderBottom:"1px solid #e5e7eb", background:"#f9fafb", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:"#111827" }}>{selected.ownerName}</div>
                  <div style={{ fontSize:11, color:"#9ca3af", fontFamily:"'DM Mono',monospace", marginTop:1 }}>{selected.businessName}</div>
                </div>
                <button onClick={()=>setSelected(null)} style={{ width:26, height:26, border:"1px solid #e5e7eb", borderRadius:5, background:"#fff", cursor:"pointer", color:"#6b7280", fontSize:12, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
              </div>
              <div style={{ padding:"14px 16px" }}>
                <div style={{ marginBottom:14 }}>
                  <Badge status={selected.approvalStatus}/>
                  {selected.isActive && <span style={{ marginLeft:8, fontSize:10, color:"#15803d", fontFamily:"'DM Mono',monospace", fontWeight:600 }}>● Live</span>}
                </div>
                {[
                  ["Email",       selected.email],
                  ["Phone",       selected.phone||"—"],
                  ["CNIC",        fmtCnic(selected.adminCnic||"")],
                  ["Mill ID",     selected.millId],
                  ["Package",     selected.packageId?.name||selected.plan||"—"],
                  ["Plan",        selected.paymentPlanType||"full"],
                  ["Payments",    selected.payments?.length || 0],
                  ["Last Payment",fmtDate(selected.lastPaymentDate)],
                  ["Next Billing",fmtDate(selected.nextBillingDate||selected.billingDate)],
                  ["Registered",  fmtDate(selected.createdAt)],
                  ["Activated",   selected.activatedAt ? fmtDate(selected.activatedAt) : "Not yet"],
                ].map(([k,v]) => (
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid #f9fafb", fontSize:12.5 }}>
                    <span style={{ color:"#9ca3af", fontFamily:"'DM Mono',monospace", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em" }}>{k}</span>
                    <span style={{ color:"#111827", fontWeight:500, textAlign:"right", maxWidth:180, wordBreak:"break-all" }}>{v}</span>
                  </div>
                ))}

                <button
                  className="mp-btn mp-btn-primary mp-btn-sm"
                  style={{ width:"100%", justifyContent:"center", marginTop:16 }}
                  onClick={() => setResetMill(selected)}>
                  🔑 Reset Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}