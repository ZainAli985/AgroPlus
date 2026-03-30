// src/components/master/MasterSupport.jsx
import React, { useState, useEffect, useCallback } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { Spin, ConfirmDialog, fmtFull } from "./masterStyles.jsx";
import { authFetch } from "./Masterportal.jsx";

const STATUS_STYLE = {
  open:       { bg:"#fffbeb", color:"#d97706", border:"#fde68a", label:"Open" },
  in_review:  { bg:"#eff6ff", color:"#1d4ed8", border:"#bfdbfe", label:"In Review" },
  resolved:   { bg:"#f0fdf4", color:"#15803d", border:"#bbf7d0", label:"Resolved" },
};

const TYPE_STYLE = {
  complaint:        { color:"#dc2626", bg:"#fef2f2", border:"#fecaca", icon:"⚠️", label:"Complaint" },
  feedback:         { color:"#1d4ed8", bg:"#eff6ff", border:"#bfdbfe", icon:"💬", label:"Feedback" },
  deletion_request: { color:"#d97706", bg:"#fffbeb", border:"#fde68a", icon:"🗑",  label:"Deletion Request" },
};

function RequestCard({ req, onStatusChange, onDelete, updating }) {
  const [expanded, setExpanded] = useState(false);
  const [notes,    setNotes]    = useState(req.masterNotes || "");
  const [notesBusy, setNotesBusy] = useState(false);
  const ts = TYPE_STYLE[req.type]    || TYPE_STYLE.complaint;
  const ss = STATUS_STYLE[req.status] || STATUS_STYLE.open;

  const saveNotes = async () => {
    setNotesBusy(true);
    await onStatusChange(req._id, req.status, notes);
    setNotesBusy(false);
  };

  return (
    <div style={{ background:"#fff", border:`1px solid ${req.status==="resolved"?"#e5e7eb":"#e5e7eb"}`, borderLeft:`3px solid ${ts.color}`, borderRadius:7, overflow:"hidden", marginBottom:8, transition:".1s" }}>
      {/* Header row */}
      <div style={{ padding:"12px 16px", display:"flex", alignItems:"flex-start", gap:12, cursor:"pointer" }} onClick={() => setExpanded(o => !o)}>
        <div style={{ flexShrink:0, width:34, height:34, borderRadius:7, background:ts.bg, border:`1px solid ${ts.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>
          {ts.icon}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:4, flexWrap:"wrap" }}>
            <span style={{ fontSize:13.5, fontWeight:700, color:"#111827" }}>{req.subject}</span>
            <span style={{ fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:4, fontFamily:"'DM Mono',monospace", letterSpacing:".06em", textTransform:"uppercase", border:`1px solid ${ts.border}`, background:ts.bg, color:ts.color }}>
              {ts.label}
            </span>
            <span style={{ fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:4, fontFamily:"'DM Mono',monospace", letterSpacing:".06em", textTransform:"uppercase", border:`1px solid ${ss.border}`, background:ss.bg, color:ss.color }}>
              {ss.label}
            </span>
          </div>
          <div style={{ fontSize:11, color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>
            {req.businessName || req.millId} · {fmtFull(req.createdAt)}
          </div>
        </div>
        <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2.5} style={{ flexShrink:0, marginTop:4, transition:"transform .14s", transform:expanded?"rotate(180deg)":"none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div style={{ borderTop:"1px solid #f3f4f6", padding:"14px 16px" }}>
          <div style={{ fontSize:13, color:"#374151", lineHeight:1.7, marginBottom:16, background:"#f9fafb", borderRadius:6, padding:"12px 14px", border:"1px solid #e5e7eb" }}>
            {req.message}
          </div>

          {/* Notes */}
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:9.5, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#9ca3af", fontFamily:"'DM Mono',monospace", display:"block", marginBottom:5 }}>
              Internal Notes
            </label>
            <div style={{ display:"flex", gap:7 }}>
              <textarea
                style={{ flex:1, padding:"8px 11px", border:"1px solid #d1d5db", borderRadius:6, fontSize:12.5, color:"#111827", fontFamily:"'DM Sans',sans-serif", outline:"none", resize:"vertical", minHeight:60 }}
                placeholder="Add internal notes visible only to master admin…"
                value={notes} onChange={e=>setNotes(e.target.value)}/>
              <button className="mp-btn mp-btn-outline mp-btn-sm" style={{ alignSelf:"flex-end", flexShrink:0 }} onClick={saveNotes} disabled={notesBusy}>
                {notesBusy ? <Spin/> : "Save"}
              </button>
            </div>
          </div>

          {/* Status actions */}
          <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
            {req.status === "open" && (
              <button className="mp-btn mp-btn-sm" style={{ background:"#eff6ff", color:"#1d4ed8", border:"1px solid #bfdbfe" }}
                disabled={updating===req._id}
                onClick={() => onStatusChange(req._id, "in_review", notes)}>
                {updating===req._id ? <Spin/> : "Mark In Review"}
              </button>
            )}
            {req.status !== "resolved" && (
              <button className="mp-btn mp-btn-green mp-btn-sm"
                disabled={updating===req._id}
                onClick={() => onStatusChange(req._id, "resolved", notes)}>
                {updating===req._id ? <Spin/> : "✓ Mark Resolved"}
              </button>
            )}
            {req.status === "resolved" && (
              <button className="mp-btn mp-btn-sm" style={{ background:"#fffbeb", color:"#d97706", border:"1px solid #fde68a" }}
                disabled={updating===req._id}
                onClick={() => onStatusChange(req._id, "open", notes)}>
                Reopen
              </button>
            )}
            <button className="mp-btn mp-btn-sm" style={{ marginLeft:"auto", background:"#fef2f2", color:"#dc2626", border:"1px solid #fecaca" }}
              onClick={() => onDelete(req)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MasterSupport({ showToast, onBadgeUpdate }) {
  const [requests, setRequests] = useState([]);
  const [stats,    setStats]    = useState({});
  const [filter,   setFilter]   = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [loading,  setLoading]  = useState(true);
  const [updating, setUpdating] = useState("");
  const [confirm,  setConfirm]  = useState(null); // { req }

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const p = new URLSearchParams();
      if (filter     !== "all") p.set("status", filter);
      if (typeFilter !== "all") p.set("type",   typeFilter);
      const r = await authFetch(`${API_BASE_URL}/master/support?${p}`);
      const d = await r.json();
      if (r.ok) { setRequests(d.requests || []); setStats(d.stats || {}); }
      else showToast(d.message, false);
    } catch { showToast("Failed to load support requests", false); }
    setLoading(false);
  }, [filter, typeFilter, showToast]);

  useEffect(() => { load(); }, [load]);

  const handleStatusChange = useCallback(async (id, status, masterNotes) => {
    setUpdating(id);
    const r = await authFetch(`${API_BASE_URL}/master/support/${id}`, {
      method:"PUT", body: JSON.stringify({ status, masterNotes }),
    });
    const d = await r.json();
    if (r.ok) {
      showToast("Updated ✓", true);
      setRequests(prev => prev.map(req => req._id === id ? { ...req, status, masterNotes } : req));
      onBadgeUpdate && onBadgeUpdate();
    } else showToast(d.message, false);
    setUpdating("");
  }, [showToast, onBadgeUpdate]);

  const handleDelete = useCallback(async (req) => {
    const r = await authFetch(`${API_BASE_URL}/master/support/${req._id}`, { method:"DELETE" });
    const d = await r.json();
    if (r.ok) {
      showToast("Deleted ✓", true);
      setRequests(prev => prev.filter(x => x._id !== req._id));
      onBadgeUpdate && onBadgeUpdate();
    } else showToast(d.message, false);
  }, [showToast, onBadgeUpdate]);

  const STATUS_FILTERS  = ["all","open","in_review","resolved"];
  const TYPE_FILTERS    = ["all","complaint","feedback","deletion_request"];
  const TYPE_FLABELS    = { all:"All Types", complaint:"Complaints", feedback:"Feedback", deletion_request:"Deletions" };

  return (
    <div>
      {confirm && (
        <ConfirmDialog
          open
          title="Delete Request"
          message={`Delete request "${confirm.req.subject}" from ${confirm.req.businessName || confirm.req.millId}? This cannot be undone.`}
          danger
          onConfirm={() => { handleDelete(confirm.req); setConfirm(null); }}
          onCancel={() => setConfirm(null)}
        />
      )}

      <div className="mp-page-h">Support Inbox</div>
      <div className="mp-page-sub">Complaints, feedback, and deletion requests from mill admins</div>

      {/* Stats */}
      <div className="mp-stats" style={{ gridTemplateColumns:"repeat(4,1fr)", marginBottom:18 }}>
        {[
          { lbl:"Open",       cnt:stats.open||0,       ac:"#d97706" },
          { lbl:"Complaints", cnt:stats.complaints||0, ac:"#dc2626" },
          { lbl:"Feedback",   cnt:stats.feedback||0,   ac:"#1d4ed8" },
          { lbl:"Deletions",  cnt:stats.deletions||0,  ac:"#7c3aed" },
        ].map(s => (
          <div key={s.lbl} className="mp-sc" style={{ "--ac":s.ac }}>
            <div className="mp-sc-lbl">{s.lbl}</div>
            <div className="mp-sc-num">{s.cnt}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display:"flex", gap:7, marginBottom:16, flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
          {STATUS_FILTERS.map(f => (
            <button key={f} className={`mp-tab-btn${filter===f?(f==="open"?" on-warn":f==="in_review"?" on":" on"):""}`}
              onClick={() => setFilter(f)}>
              {f==="all"?"All Statuses":f==="in_review"?"In Review":f.charAt(0).toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>
        <div style={{ width:1, height:22, background:"#e5e7eb", margin:"0 2px" }}/>
        <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
          {TYPE_FILTERS.map(t => (
            <button key={t} className={`mp-tab-btn${typeFilter===t?" on":""}`}
              onClick={() => setTypeFilter(t)}>
              {TYPE_FLABELS[t]}
            </button>
          ))}
        </div>
        <button className="mp-tab-btn" onClick={load} style={{ marginLeft:"auto" }}>
          {loading ? <Spin/> : "↺ Refresh"}
        </button>
      </div>

      {/* Request list */}
      {loading ? (
        <div className="mp-empty" style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8 }}>
          <Spin/> Loading requests…
        </div>
      ) : requests.length === 0 ? (
        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, padding:"44px", textAlign:"center" }}>
          <div style={{ fontSize:28, marginBottom:10 }}>📭</div>
          <div style={{ fontSize:13.5, fontWeight:600, color:"#374151", marginBottom:6 }}>No requests found</div>
          <div style={{ fontSize:12.5, color:"#9ca3af" }}>No support requests match your current filters.</div>
        </div>
      ) : (
        requests.map(req => (
          <RequestCard
            key={req._id}
            req={req}
            updating={updating}
            onStatusChange={handleStatusChange}
            onDelete={req => setConfirm({ req })}
          />
        ))
      )}
    </div>
  );
}