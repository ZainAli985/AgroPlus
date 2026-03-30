// src/components/master/MasterSupport.jsx
import React, { useState, useEffect, useCallback } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { Spin, ConfirmDialog, fmtFull } from "./masterStyles.jsx";
import { authFetch } from "./Masterportal.jsx";

const STATUS_STYLE = {
  open:      {bg:"#fffbeb",color:"#d97706",border:"#fde68a",label:"Open"},
  in_review: {bg:"#eff6ff",color:"#1d4ed8",border:"#bfdbfe",label:"In Review"},
  resolved:  {bg:"#f0fdf4",color:"#15803d",border:"#bbf7d0",label:"Resolved"},
};
const TYPE_STYLE = {
  complaint:        {color:"#dc2626",bg:"#fef2f2",border:"#fecaca",icon:"⚠️",label:"Complaint"},
  feedback:         {color:"#1d4ed8",bg:"#eff6ff",border:"#bfdbfe",icon:"💬",label:"Feedback"},
  deletion_request: {color:"#d97706",bg:"#fffbeb",border:"#fde68a",icon:"🗑",label:"Deletion"},
};

function RequestCard({ req, onStatusChange, onDelete, updating }) {
  const [open,      setOpen]      = useState(false);
  const [notes,     setNotes]     = useState(req.masterNotes||"");
  const [notesBusy, setNotesBusy] = useState(false);
  const ts = TYPE_STYLE[req.type]    || TYPE_STYLE.complaint;
  const ss = STATUS_STYLE[req.status] || STATUS_STYLE.open;

  const saveNotes = async () => { setNotesBusy(true); await onStatusChange(req._id, req.status, notes); setNotesBusy(false); };

  return (
    <div style={{background:"#fff",border:"1px solid #e5e7eb",borderLeft:`3px solid ${ts.color}`,borderRadius:7,overflow:"hidden",marginBottom:7}}>
      <div style={{padding:"11px 15px",display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer"}} onClick={()=>setOpen(o=>!o)}>
        <div style={{flexShrink:0,width:32,height:32,borderRadius:6,background:ts.bg,border:`1px solid ${ts.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{ts.icon}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3,flexWrap:"wrap"}}>
            <span style={{fontSize:13.5,fontWeight:700,color:"#111827"}}>{req.subject}</span>
            <span style={{fontSize:8.5,fontWeight:700,padding:"2px 6px",borderRadius:4,fontFamily:"'DM Mono',monospace",letterSpacing:".06em",textTransform:"uppercase",border:`1px solid ${ts.border}`,background:ts.bg,color:ts.color}}>{ts.label}</span>
            <span style={{fontSize:8.5,fontWeight:700,padding:"2px 6px",borderRadius:4,fontFamily:"'DM Mono',monospace",letterSpacing:".06em",textTransform:"uppercase",border:`1px solid ${ss.border}`,background:ss.bg,color:ss.color}}>{ss.label}</span>
          </div>
          <div style={{fontSize:10.5,color:"#9ca3af",fontFamily:"'DM Mono',monospace"}}>{req.businessName||req.millId} · {fmtFull(req.createdAt)}</div>
        </div>
        <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2.5} style={{flexShrink:0,marginTop:4,transition:"transform .14s",transform:open?"rotate(180deg)":"none"}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>

      {open && (
        <div style={{borderTop:"1px solid #f3f4f6",padding:"12px 15px"}}>
          <div style={{fontSize:12.5,color:"#374151",lineHeight:1.7,marginBottom:12,background:"#f9fafb",borderRadius:5,padding:"10px 12px",border:"1px solid #e5e7eb"}}>
            {req.message}
          </div>
          <div style={{marginBottom:11}}>
            <label style={{fontSize:9,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#9ca3af",fontFamily:"'DM Mono',monospace",display:"block",marginBottom:4}}>Internal Notes</label>
            <div style={{display:"flex",gap:6}}>
              <textarea style={{flex:1,padding:"7px 10px",border:"1px solid #d1d5db",borderRadius:6,fontSize:12.5,color:"#111827",fontFamily:"'DM Sans',sans-serif",outline:"none",resize:"vertical",minHeight:52}}
                placeholder="Notes visible only to master admin…"
                value={notes} onChange={e=>setNotes(e.target.value)}/>
              <button className="mp-btn mp-btn-outline mp-btn-sm" style={{alignSelf:"flex-end",flexShrink:0}} onClick={saveNotes} disabled={notesBusy}>
                {notesBusy?<Spin/>:"Save"}
              </button>
            </div>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {req.status==="open" && (
              <button className="mp-btn mp-btn-sm" style={{background:"#eff6ff",color:"#1d4ed8",border:"1px solid #bfdbfe"}}
                disabled={updating===req._id} onClick={()=>onStatusChange(req._id,"in_review",notes)}>
                {updating===req._id?<Spin/>:"Mark In Review"}
              </button>
            )}
            {req.status!=="resolved" && (
              <button className="mp-btn mp-btn-green mp-btn-sm" disabled={updating===req._id}
                onClick={()=>onStatusChange(req._id,"resolved",notes)}>
                {updating===req._id?<Spin/>:"✓ Resolve"}
              </button>
            )}
            {req.status==="resolved" && (
              <button className="mp-btn mp-btn-sm" style={{background:"#fffbeb",color:"#d97706",border:"1px solid #fde68a"}}
                disabled={updating===req._id} onClick={()=>onStatusChange(req._id,"open",notes)}>
                Reopen
              </button>
            )}
            <button className="mp-btn mp-btn-sm" style={{marginLeft:"auto",background:"#fef2f2",color:"#dc2626",border:"1px solid #fecaca"}}
              onClick={()=>onDelete(req)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MasterSupport({ showToast, onBadgeUpdate }) {
  const [requests,    setRequests]    = useState([]);
  const [stats,       setStats]       = useState({});
  const [statusFlt,   setStatusFlt]   = useState("all");
  const [typeFlt,     setTypeFlt]     = useState("all");
  const [loading,     setLoading]     = useState(true);
  const [updating,    setUpdating]    = useState("");
  const [confirm,     setConfirm]     = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const p = new URLSearchParams();
      if (statusFlt!=="all") p.set("status", statusFlt);
      if (typeFlt!=="all")   p.set("type",   typeFlt);
      const r = await authFetch(`${API_BASE_URL}/master/support?${p}`);
      const d = await r.json();
      if (r.ok) { setRequests(d.requests||[]); setStats(d.stats||{}); }
      else showToast(d.message, false);
    } catch { showToast("Failed to load requests", false); }
    setLoading(false);
  }, [statusFlt, typeFlt, showToast]);

  useEffect(()=>{ load(); },[load]);

  const handleStatusChange = useCallback(async (id, status, masterNotes) => {
    setUpdating(id);
    const r = await authFetch(`${API_BASE_URL}/master/support/${id}`, { method:"PUT", body:JSON.stringify({status,masterNotes}) });
    const d = await r.json();
    if (r.ok) {
      showToast("Updated ✓", true);
      setRequests(prev=>prev.map(req=>req._id===id?{...req,status,masterNotes}:req));
      onBadgeUpdate&&onBadgeUpdate();
    } else showToast(d.message, false);
    setUpdating("");
  }, [showToast, onBadgeUpdate]);

  const handleDelete = useCallback(async req => {
    const r = await authFetch(`${API_BASE_URL}/master/support/${req._id}`, {method:"DELETE"});
    const d = await r.json();
    if (r.ok) {
      showToast("Deleted ✓", true);
      setRequests(prev=>prev.filter(x=>x._id!==req._id));
      onBadgeUpdate&&onBadgeUpdate();
    } else showToast(d.message, false);
  }, [showToast, onBadgeUpdate]);

  return (
    <div>
      {confirm && (
        <ConfirmDialog open title="Delete Request"
          message={`Delete "${confirm.req.subject}" from ${confirm.req.businessName||confirm.req.millId}?`}
          danger
          onConfirm={()=>{ handleDelete(confirm.req); setConfirm(null); }}
          onCancel={()=>setConfirm(null)}
        />
      )}

      <div className="mp-page-h">Support Inbox</div>
      <div className="mp-page-sub">Complaints, feedback and deletion requests from mill admins</div>

      {/* Stats */}
      <div className="mp-stats" style={{gridTemplateColumns:"repeat(4,1fr)",marginBottom:16}}>
        {[
          {lbl:"Open",       cnt:stats.open||0,       ac:"#d97706"},
          {lbl:"Complaints", cnt:stats.complaints||0, ac:"#dc2626"},
          {lbl:"Feedback",   cnt:stats.feedback||0,   ac:"#1d4ed8"},
          {lbl:"Deletions",  cnt:stats.deletions||0,  ac:"#7c3aed"},
        ].map(s=>(
          <div key={s.lbl} className="mp-sc" style={{"--ac":s.ac}}>
            <div className="mp-sc-lbl">{s.lbl}</div>
            <div className="mp-sc-num">{s.cnt}</div>
          </div>
        ))}
      </div>

      {/* ── Filters — two rows, always visible ── */}
      <div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:"12px 14px",marginBottom:14}}>
        {/* Row 1: Status filters */}
        <div style={{marginBottom:10}}>
          <div style={{fontSize:9,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#9ca3af",fontFamily:"'DM Mono',monospace",marginBottom:6}}>Filter by Status</div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {[
              {k:"all",       label:"All Statuses"},
              {k:"open",      label:"Open"},
              {k:"in_review", label:"In Review"},
              {k:"resolved",  label:"Resolved"},
            ].map(({k,label})=>(
              <button key={k}
                className={`mp-tab-btn${statusFlt===k?(k==="open"?" on-warn":k==="in_review"?" on":" on"):""}`}
                onClick={()=>setStatusFlt(k)}>
                {label}
              </button>
            ))}
          </div>
        </div>
        {/* Row 2: Type filters */}
        <div style={{borderTop:"1px solid #f3f4f6",paddingTop:10,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#9ca3af",fontFamily:"'DM Mono',monospace",marginBottom:6}}>Filter by Type</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {[
                {k:"all",             label:"All Types"},
                {k:"complaint",       label:"Complaints"},
                {k:"feedback",        label:"Feedback"},
                {k:"deletion_request",label:"Deletions"},
              ].map(({k,label})=>(
                <button key={k}
                  className={`mp-tab-btn${typeFlt===k?(k==="complaint"?" on-err":k==="deletion_request"?" on-warn":" on"):""}`}
                  onClick={()=>setTypeFlt(k)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <button className="mp-btn mp-btn-outline mp-btn-sm" onClick={load} style={{alignSelf:"flex-end"}}>
            {loading?<Spin/>:"↺"} Refresh
          </button>
        </div>
      </div>

      {/* Request list */}
      {loading ? (
        <div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:"36px",textAlign:"center",color:"#9ca3af",fontSize:13}}>
          <Spin/> Loading requests…
        </div>
      ) : requests.length===0 ? (
        <div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:"40px",textAlign:"center"}}>
          <div style={{fontSize:26,marginBottom:8}}>📭</div>
          <div style={{fontSize:13.5,fontWeight:600,color:"#374151",marginBottom:5}}>No requests found</div>
          <div style={{fontSize:12.5,color:"#9ca3af"}}>No support requests match the current filters.</div>
        </div>
      ) : (
        requests.map(req=>(
          <RequestCard key={req._id} req={req} updating={updating}
            onStatusChange={handleStatusChange}
            onDelete={req=>setConfirm({req})}
          />
        ))
      )}
    </div>
  );
}