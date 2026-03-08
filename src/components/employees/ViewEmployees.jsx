import React, { useEffect, useState } from "react";
import SidebarLayout from "../../components/layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import Notification from "../../components/Notification";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .ve-wrap { font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; }

  .ve-input, .ve-select {
    width: 100%; border: 1.5px solid #e5e7eb; border-radius: 10px;
    padding: 9px 12px; font-size: 13.5px; font-family: 'Plus Jakarta Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .15s, box-shadow .15s; appearance: none;
  }
  .ve-input::placeholder { color: #9ca3af; }
  .ve-input:focus, .ve-select:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.12); }
  .ve-input.mono { font-family: 'JetBrains Mono', monospace; font-size: 13px; }

  .ve-select-wrap { position: relative; }
  .ve-select-wrap::after {
    content: ''; position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    pointer-events: none; border-left: 4px solid transparent;
    border-right: 4px solid transparent; border-top: 5px solid #9ca3af;
  }

  .ve-table { width: 100%; border-collapse: collapse; }
  .ve-table thead tr { background: #1e293b; }
  .ve-table thead th {
    padding: 11px 16px; font-size: 11px; font-weight: 700;
    font-family: 'Plus Jakarta Sans', sans-serif; text-transform: uppercase;
    letter-spacing: .07em; color: rgba(255,255,255,.7); text-align: left;
    white-space: nowrap; border: none;
  }
  .ve-table thead th:first-child { border-radius: 10px 0 0 0; }
  .ve-table thead th:last-child  { border-radius: 0 10px 0 0; text-align: center; }
  .ve-table tbody tr { background: #fff; border-bottom: 1px solid #f3f4f6; transition: background .1s; }
  .ve-table tbody tr:hover { background: #fafafa; }
  .ve-table tbody td { padding: 13px 16px; font-size: 13.5px; color: #374151; vertical-align: middle; }
  .ve-table tbody td.mono { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: #6b7280; }

  .ve-avatar {
    width: 34px; height: 34px; border-radius: 10px; display: flex;
    align-items: center; justify-content: center;
    font-size: 13px; font-weight: 800; flex-shrink: 0; color: #fff;
  }

  .ve-status { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px;
    border-radius: 20px; font-size: 12px; font-weight: 700; white-space: nowrap; }
  .ve-status.active   { background: #d1fae5; color: #065f46; }
  .ve-status.inactive { background: #fee2e2; color: #991b1b; }

  .ve-role { display: inline-block; padding: 2px 9px; border-radius: 6px; font-size: 12px; font-weight: 700; letter-spacing: .02em; }
  .ve-role.admin      { background: #e0e7ff; color: #3730a3; }
  .ve-role.accountant { background: #fef9c3; color: #854d0e; }
  .ve-role.worker     { background: #f3f4f6; color: #374151; }

  .ve-btn {
    display: inline-flex; align-items: center; gap: 5px; padding: 6px 11px;
    border-radius: 8px; border: 1.5px solid transparent; font-size: 12px; font-weight: 600;
    font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer;
    transition: all .12s; white-space: nowrap;
  }
  .ve-btn.toggle-on  { background: #fff7ed; color: #c2410c; border-color: #fed7aa; }
  .ve-btn.toggle-on:hover  { background: #ffedd5; border-color: #fb923c; }
  .ve-btn.toggle-off { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
  .ve-btn.toggle-off:hover { background: #dcfce7; border-color: #86efac; }
  .ve-btn.edit  { background: #eef2ff; color: #4338ca; border-color: #c7d2fe; }
  .ve-btn.edit:hover  { background: #e0e7ff; border-color: #a5b4fc; }
  .ve-btn.del   { background: #fff1f2; color: #be123c; border-color: #fecdd3; }
  .ve-btn.del:hover   { background: #ffe4e6; border-color: #fda4af; }

  .ve-clear-btn {
    background: none; border: 1.5px solid #e5e7eb; border-radius: 10px;
    padding: 9px 14px; font-size: 13px; font-weight: 600; color: #6b7280;
    font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer; transition: all .15s; width: 100%;
  }
  .ve-clear-btn:hover { border-color: #d1d5db; color: #374151; }

  @keyframes ve-shimmer { to { background-position: -200% 0; } }
  @keyframes ve-spin { to { transform: rotate(360deg); } }
  .ve-skeleton {
    background: linear-gradient(90deg,#f3f4f6 25%,#fafafa 50%,#f3f4f6 75%);
    background-size: 200% 100%; animation: ve-shimmer 1.3s infinite; border-radius: 6px;
  }

  .ve-overlay {
    position: fixed; inset: 0; background: rgba(15,23,42,.45);
    backdrop-filter: blur(4px); display: flex; align-items: center;
    justify-content: center; z-index: 50; padding: 20px;
  }
  .ve-lightbox-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,.9);
    display: flex; align-items: center; justify-content: center;
    z-index: 200; padding: 24px; cursor: zoom-out;
  }
  @keyframes ve-modal-in {
    from { opacity:0; transform:scale(.97) translateY(6px); }
    to   { opacity:1; transform:scale(1)  translateY(0); }
  }
  .ve-modal {
    background: #fff; border-radius: 18px; width: 100%;
    box-shadow: 0 24px 60px rgba(0,0,0,.2); animation: ve-modal-in .2s ease-out;
    display: flex; flex-direction: column; overflow: hidden;
  }
  .ve-modal-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 24px; border-bottom: 1.5px solid #f3f4f6; background: #fafafa;
    flex-shrink: 0;
  }
  .ve-modal-title { font-size: 16px; font-weight: 800; color: #111827; }
  .ve-modal-body  { padding: 24px; overflow-y: auto; flex: 1; min-height: 0; }
  .ve-modal-foot  {
    display: flex; justify-content: flex-end; gap: 10px;
    padding: 16px 24px; border-top: 1.5px solid #f3f4f6; background: #fafafa;
    flex-shrink: 0;
  }

  .ve-modal-cancel {
    padding: 9px 18px; border-radius: 10px; border: 1.5px solid #e5e7eb;
    background: #fff; font-size: 13.5px; font-weight: 600; color: #6b7280;
    font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer; transition: all .12s;
  }
  .ve-modal-cancel:hover { border-color: #d1d5db; color: #374151; }
  .ve-modal-save {
    padding: 9px 20px; border-radius: 10px; border: none;
    background: linear-gradient(135deg,#4f46e5,#6366f1); color: #fff;
    font-size: 13.5px; font-weight: 700; font-family: 'Plus Jakarta Sans', sans-serif;
    cursor: pointer; box-shadow: 0 4px 12px rgba(99,102,241,.3); transition: all .12s;
  }
  .ve-modal-save:hover { opacity: .9; }
  .ve-modal-delete-btn {
    padding: 9px 20px; border-radius: 10px; border: none;
    background: #dc2626; color: #fff; font-size: 13.5px; font-weight: 700;
    font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer; transition: all .12s;
  }
  .ve-modal-delete-btn:hover { background: #b91c1c; }

  .ve-section-label {
    font-size: 10.5px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .08em; color: #9ca3af; margin-bottom: 12px;
    padding-bottom: 6px; border-bottom: 1.5px solid #f3f4f6;
    display: flex; align-items: center; justify-content: space-between;
  }
  .ve-field-label {
    display: block; font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: #9ca3af; margin-bottom: 6px;
  }

  .ve-route-pill {
    display: flex; align-items: center; gap: 8px; padding: 7px 10px;
    border-radius: 9px; cursor: pointer; border: 1.5px solid #f3f4f6;
    background: #fafafa; transition: all .12s; user-select: none;
  }
  .ve-route-pill:hover  { border-color: #e0e7ff; background: #eef2ff; }
  .ve-route-pill.active { border-color: #c7d2fe; background: #eef2ff; }
  .ve-route-check {
    width: 15px; height: 15px; border-radius: 4px; flex-shrink: 0;
    border: 1.5px solid #d1d5db; background: #fff;
    display: flex; align-items: center; justify-content: center; transition: all .12s;
  }
  .ve-route-pill.active .ve-route-check { background: #6366f1; border-color: #6366f1; }
  .ve-route-text {
    font-size: 11.5px; font-weight: 500; color: #4b5563;
    font-family: 'JetBrains Mono', monospace; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis;
  }
  .ve-route-pill.active .ve-route-text { color: #4338ca; font-weight: 600; }

  .ve-empty { text-align: center; padding: 60px 20px; color: #9ca3af; }

  /* ── Document card ── */
  .ve-doc-card {
    display: flex; flex-direction: column; border-radius: 12px;
    border: 1.5px solid #e5e7eb; overflow: hidden;
    transition: box-shadow .15s, transform .15s; background: #fff; width: 120px; flex-shrink: 0;
  }
  .ve-doc-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,.1); transform: translateY(-2px); }
  .ve-doc-thumb { width: 120px; height: 90px; object-fit: cover; display: block; cursor: zoom-in; }
  .ve-doc-placeholder {
    width: 120px; height: 90px; display: flex; flex-direction: column;
    align-items: center; justify-content: center; background: #f8fafc;
    gap: 5px; cursor: pointer;
  }
  .ve-doc-foot {
    padding: 6px 8px; border-top: 1px solid #f3f4f6;
    display: flex; align-items: center; gap: 5px;
  }
  .ve-doc-fname {
    font-size: 10.5px; font-weight: 600; color: #374151;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1;
  }
  .ve-doc-open {
    display: inline-flex; align-items: center; justify-content: center;
    width: 20px; height: 20px; border-radius: 5px; flex-shrink: 0;
    background: #eef2ff; color: #6366f1; border: none; cursor: pointer;
    transition: background .12s; text-decoration: none;
  }
  .ve-doc-open:hover { background: #e0e7ff; }

  /* doc count badge in table */
  .ve-doc-badge {
    display: inline-flex; align-items: center; gap: 3px;
    padding: 1px 7px; border-radius: 20px; font-size: 10.5px; font-weight: 700;
    background: #f0f9ff; color: #0369a1; border: 1px solid #bae6fd;
    margin-left: 7px; cursor: pointer; transition: background .12s; vertical-align: middle;
  }
  .ve-doc-badge:hover { background: #e0f2fe; }

  /* empty docs */
  .ve-docs-empty {
    padding: 22px; border-radius: 12px; border: 1.5px dashed #e5e7eb;
    text-align: center; color: #9ca3af; background: #fafafa;
  }

  .ve-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media (max-width: 600px) { .ve-grid-2 { grid-template-columns: 1fr; } }
`;

/* ── Helpers ── */
const avatarColors = ["#6366f1","#0ea5e9","#10b981","#f59e0b","#ec4899","#8b5cf6","#14b8a6"];
const avatarColor  = (n) => avatarColors[(n?.charCodeAt(0)||0) % avatarColors.length];
const initials     = (f,l) => `${f?.[0]||""}${l?.[0]||""}`.toUpperCase();
const prettyRoute  = (r) => r.replace(/^\//,"").replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase()) || "Dashboard";
const isImg        = (u) => /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(u||"");
const docLabel     = (d) => d.name || d.fileUrl?.split("/").pop() || "Document";

const routesList = [
  "/dashboard","/create-account","/view-accounts","/ledger",
  "/general-entries","/products","/products/new",
  "/add-invoice-purchase","/view-purchase-invoices",
  "/add-invoice-sales","/view-sales-invoices",
  "/stock-management","/trialbalance","/balancesheet",
  "/incomestatement","/weight-bridge","/weight-bridge/invoices",
  "/cashbook","/cashbook-report",
];

/* ── Icons ── */
const CloseIcon = () => (
  <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
  </svg>
);
const ExtIcon = () => (
  <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
  </svg>
);

/* ── DocCard ── */
function DocCard({ doc, url, onPreview }) {
  const name = docLabel(doc);
  const img  = isImg(url);
  const [imgBroken, setImgBroken] = React.useState(false);

  return (
    <div className="ve-doc-card">
      {img && !imgBroken ? (
        <img
          src={url}
          alt={name}
          className="ve-doc-thumb"
          onClick={() => onPreview(url, name)}
          onError={() => setImgBroken(true)}
        />
      ) : (
        /* non-image OR broken image → file placeholder */
        <div className="ve-doc-placeholder" onClick={() => window.open(url, "_blank")}>
          <svg width={26} height={26} fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span style={{ fontSize:9.5, color:"#94a3b8", fontWeight:700, textTransform:"uppercase", letterSpacing:".05em" }}>
            {url.split(".").pop()?.toUpperCase().slice(0,6) || "FILE"}
          </span>
        </div>
      )}
      <div className="ve-doc-foot">
        <span className="ve-doc-fname" title={name}>{name}</span>
        {/* Open in new tab */}
        <a href={url} target="_blank" rel="noopener noreferrer"
          className="ve-doc-open" title="Open in new tab"
          onClick={e => e.stopPropagation()}>
          <ExtIcon/>
        </a>
        {/* Download */}
        <a href={url} download={name}
          className="ve-doc-open" title="Download"
          style={{ background:"#f0fdf4", color:"#16a34a" }}
          onClick={e => e.stopPropagation()}>
          <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ── Lightbox ── */
function Lightbox({ src, name, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key==="Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div className="ve-lightbox-overlay" onClick={onClose}>
      <div style={{ position:"relative", maxWidth:"90vw", maxHeight:"90vh" }}
        onClick={e => e.stopPropagation()}>
        <img src={src} alt={name}
          style={{ maxWidth:"90vw", maxHeight:"85vh", borderRadius:10,
            objectFit:"contain", display:"block", boxShadow:"0 32px 80px rgba(0,0,0,.6)" }}/>
        {/* bottom bar */}
        <div style={{ position:"absolute", bottom:-36, left:0, right:0,
          display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:13, color:"rgba(255,255,255,.65)", fontWeight:500 }}>{name}</span>
          <span style={{ fontSize:11.5, color:"rgba(255,255,255,.35)" }}>Esc or click to close</span>
        </div>
        {/* close btn */}
        <button onClick={onClose} style={{
          position:"absolute", top:-12, right:-12, width:30, height:30,
          borderRadius:"50%", background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.18)",
          display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"pointer", color:"#fff",
        }}><CloseIcon/></button>
      </div>
    </div>
  );
}

/* ── MAIN ── */
export default function ViewEmployees() {
  const token = localStorage.getItem("token");

  const [employees,         setEmployees]         = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search,            setSearch]            = useState("");
  const [roleFilter,        setRoleFilter]        = useState("");
  const [statusFilter,      setStatusFilter]      = useState("");
  const [loading,           setLoading]           = useState(true);

  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType,    setNotificationType]    = useState("");

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editData,         setEditData]         = useState({});
  const [showModal,        setShowModal]        = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTargetId,   setDeleteTargetId]   = useState(null);
  const [deleteTargetName, setDeleteTargetName] = useState("");

  const [lightbox, setLightbox] = useState(null);

  const [saving, setSaving] = useState(false);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res  = await fetch(`${API_BASE_URL}/employees`, { headers:{ Authorization:`Bearer ${token}` } });
      const data = await res.json();
      setEmployees(data); setFilteredEmployees(data);
    } catch {
      setNotificationMessage("Failed to load employees"); setNotificationType("error");
    } finally { setLoading(false); }
  };
  useEffect(() => { fetchEmployees(); }, []);

  useEffect(() => {
    let f = [...employees];
    if (search)       f = f.filter(e => `${e.firstName} ${e.lastName} ${e.email} ${e.username}`.toLowerCase().includes(search.toLowerCase()));
    if (roleFilter)   f = f.filter(e => e.role === roleFilter);
    if (statusFilter) f = f.filter(e => e.isActive === (statusFilter === "Active"));
    setFilteredEmployees(f);
  }, [search, roleFilter, statusFilter, employees]);

  const openEditModal = (emp) => { setSelectedEmployee(emp); setEditData(emp); setShowModal(true); };
  const closeModal    = () => { setSelectedEmployee(null); setShowModal(false); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name==="mobile") {
      let d = value.replace(/\D/g,"");
      if (d.startsWith("92")) d = d.slice(2);
      if (d.length>10) d = d.slice(0,10);
      setEditData(p=>({...p,mobile:`+92${d}`})); return;
    }
    if (name==="cnic") {
      const d = value.replace(/\D/g,"").slice(0,13);
      let fv = d;
      if (d.length>5)  fv = `${d.slice(0,5)}-${d.slice(5)}`;
      if (d.length>12) fv = `${d.slice(0,5)}-${d.slice(5,12)}-${d.slice(12)}`;
      setEditData(p=>({...p,cnic:fv})); return;
    }
    setEditData(p=>({...p,[name]:value}));
  };

  const toggleRoute = (route) => setEditData(p=>({
    ...p, allowedRoutes: p.allowedRoutes?.includes(route)
      ? p.allowedRoutes.filter(r=>r!==route)
      : [...(p.allowedRoutes||[]), route],
  }));

  const updateEmployee = async () => {
    setSaving(true);
    try {
      const res  = await fetch(`${API_BASE_URL}/employees/${selectedEmployee._id}`, {
        method:"PUT", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setNotificationMessage("Employee updated successfully"); setNotificationType("success");
      fetchEmployees(); closeModal();
    } catch(err) { setNotificationMessage(err.message); setNotificationType("error"); }
    finally { setSaving(false); }
  };

  const toggleRestrict = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/employees/${id}/toggle`,{method:"PATCH",headers:{Authorization:`Bearer ${token}`}});
      fetchEmployees(); setNotificationMessage("Employee status updated"); setNotificationType("success");
    } catch { setNotificationMessage("Failed to update status"); setNotificationType("error"); }
  };

  const confirmDelete  = (id,name) => { setDeleteTargetId(id); setDeleteTargetName(name); setShowDeleteDialog(true); };
  const cancelDelete   = () => { setDeleteTargetId(null); setDeleteTargetName(""); setShowDeleteDialog(false); };
  const deleteEmployee = async () => {
    try {
      await fetch(`${API_BASE_URL}/employees/${deleteTargetId}`,{method:"DELETE",headers:{Authorization:`Bearer ${token}`}});
      fetchEmployees(); setNotificationMessage("Employee deleted"); setNotificationType("success");
    } catch { setNotificationMessage("Delete failed"); setNotificationType("error"); }
    setShowDeleteDialog(false); setDeleteTargetId(null);
  };

  // Multer saves files to disk with paths like "uploads\filename.jpg" or "uploads/filename.jpg"
  // API_BASE_URL is e.g. "http://localhost:5000/api" — strip /api to get server root
  const serverRoot = API_BASE_URL.replace(/\/api\/?$/, "");
  const getFileUrl = (fp) => {
    if (!fp) return "";
    const clean = fp.replace(/\\/g, "/");          // normalise Windows backslashes
    // If already a full URL, use as-is
    if (/^https?:\/\//.test(clean)) return clean;
    // Remove any leading slash so we don't double-slash
    return `${serverRoot}/${clean.replace(/^\//, "")}`;
  };

  const hasFilters   = search||roleFilter||statusFilter;
  const clearFilters = () => { setSearch(""); setRoleFilter(""); setStatusFilter(""); };

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification message={notificationMessage} type={notificationType}/>

      <div className="ve-wrap">

        {/* header */}
        <div style={{marginBottom:24,display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <div>
            <p style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"#9ca3af",marginBottom:4}}>HR Management</p>
            <h1 style={{fontSize:26,fontWeight:800,color:"#111827",letterSpacing:"-.5px",lineHeight:1}}>Employees</h1>
          </div>
          {!loading&&(
            <div style={{background:"#f3f4f6",borderRadius:10,padding:"7px 14px",fontSize:13,fontWeight:600,color:"#6b7280",fontFamily:"'JetBrains Mono',monospace"}}>
              {filteredEmployees.length}
              {filteredEmployees.length!==employees.length&&<span style={{color:"#9ca3af",fontWeight:400}}> / {employees.length}</span>}
              <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",marginLeft:5,fontWeight:500}}>employee{filteredEmployees.length!==1?"s":""}</span>
            </div>
          )}
        </div>

        {/* filters */}
        <div style={{background:"#fff",border:"1.5px solid #f3f4f6",borderRadius:14,padding:"14px 16px",marginBottom:18,boxShadow:"0 1px 3px rgba(0,0,0,.04)"}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr auto",gap:10,alignItems:"end"}}>
            <div>
              <label style={lbl}>Search</label>
              <div style={{position:"relative"}}>
                <span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",display:"flex"}}>
                  <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}><circle cx={11} cy={11} r={8}/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/></svg>
                </span>
                <input className="ve-input" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Name, email, username…" style={{paddingLeft:34}}/>
              </div>
            </div>
            <div>
              <label style={lbl}>Role</label>
              <div className="ve-select-wrap">
                <select className="ve-select" value={roleFilter} onChange={e=>setRoleFilter(e.target.value)}>
                  <option value="">All roles</option>
                  <option>Admin</option><option>Accountant</option><option>Worker</option>
                </select>
              </div>
            </div>
            <div>
              <label style={lbl}>Status</label>
              <div className="ve-select-wrap">
                <select className="ve-select" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
                  <option value="">All statuses</option>
                  <option>Active</option><option>Inactive</option>
                </select>
              </div>
            </div>
            <div>
              <button className="ve-clear-btn" onClick={clearFilters} style={{opacity:hasFilters?1:.35,pointerEvents:hasFilters?"auto":"none"}}>Clear</button>
            </div>
          </div>
        </div>

        {/* table */}
        <div style={{background:"#fff",border:"1.5px solid #f3f4f6",borderRadius:14,overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,.04)"}}>
          <table className="ve-table">
            <thead>
              <tr>
                <th>Employee</th><th>Email</th><th>Username</th>
                <th>Role</th><th>Status</th><th style={{textAlign:"center"}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({length:5}).map((_,i)=>(
                  <tr key={i}>{[200,180,120,80,70,140].map((w,j)=>(
                    <td key={j} style={{padding:13}}><div className="ve-skeleton" style={{height:14,width:`${w}px`,maxWidth:"100%"}}/></td>
                  ))}</tr>
                ))
              ) : filteredEmployees.length===0 ? (
                <tr><td colSpan={6}>
                  <div className="ve-empty">
                    <svg width={44} height={44} fill="none" viewBox="0 0 24 24" stroke="#e5e7eb" strokeWidth={1.2} style={{margin:"0 auto 12px",display:"block"}}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <p style={{fontSize:15,fontWeight:700,color:"#6b7280",marginBottom:4}}>No employees found</p>
                    <p style={{fontSize:13,color:"#9ca3af"}}>Try adjusting your filters</p>
                  </div>
                </td></tr>
              ) : filteredEmployees.map(emp=>(
                <tr key={emp._id}>
                  {/* employee + doc badge */}
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div className="ve-avatar" style={{background:avatarColor(emp.firstName)}}>
                        {initials(emp.firstName,emp.lastName)}
                      </div>
                      <div>
                        <div style={{display:"flex",alignItems:"center",flexWrap:"wrap",gap:0}}>
                          <span style={{fontWeight:700,color:"#111827",fontSize:13.5}}>
                            {emp.firstName} {emp.lastName}
                          </span>
                          {emp.documents?.length>0 && (
                            <span className="ve-doc-badge" onClick={()=>openEditModal(emp)}
                              title={`${emp.documents.length} doc${emp.documents.length!==1?"s":""} — click to view`}>
                              <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
                              </svg>
                              {emp.documents.length}
                            </span>
                          )}
                        </div>
                        <div style={{fontSize:11.5,color:"#9ca3af",fontFamily:"'JetBrains Mono',monospace"}}>{emp.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{color:"#6b7280",fontSize:13}}>{emp.email}</td>
                  <td className="mono">{emp.username}</td>
                  <td><span className={`ve-role ${emp.role?.toLowerCase()}`}>{emp.role}</span></td>
                  <td>
                    <span className={`ve-status ${emp.isActive?"active":"inactive"}`}>
                      <span style={{width:6,height:6,borderRadius:"50%",background:emp.isActive?"#10b981":"#ef4444",display:"inline-block"}}/>
                      {emp.isActive?"Active":"Inactive"}
                    </span>
                  </td>
                  <td>
                    <div style={{display:"flex",gap:6,justifyContent:"center"}}>
                      <button className={`ve-btn ${emp.isActive?"toggle-on":"toggle-off"}`} onClick={()=>toggleRestrict(emp._id)}>
                        {emp.isActive
                          ? <><svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>Restrict</>
                          : <><svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Enable</>
                        }
                      </button>
                      <button className="ve-btn edit" onClick={()=>openEditModal(emp)}>
                        <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        Edit
                      </button>
                      <button className="ve-btn del" onClick={()=>confirmDelete(emp._id,`${emp.firstName} ${emp.lastName}`)}>
                        <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!loading&&filteredEmployees.length>0&&(
          <p style={{textAlign:"center",color:"#9ca3af",fontSize:12.5,marginTop:14,fontFamily:"'JetBrains Mono',monospace"}}>
            {filteredEmployees.length} employee{filteredEmployees.length!==1?"s":""}
            {hasFilters?` · filtered from ${employees.length} total`:""}
          </p>
        )}
      </div>

      {/* ═══ EDIT MODAL ═══ */}
      {showModal&&selectedEmployee&&(
        <div className="ve-overlay" onClick={closeModal}>
          <div className="ve-modal" style={{maxWidth:700,height:"92vh",maxHeight:860}} onClick={e=>e.stopPropagation()}>

            <div className="ve-modal-head">
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div className="ve-avatar" style={{background:avatarColor(selectedEmployee.firstName)}}>
                  {initials(selectedEmployee.firstName,selectedEmployee.lastName)}
                </div>
                <div>
                  <div className="ve-modal-title">{selectedEmployee.firstName} {selectedEmployee.lastName}</div>
                  <div style={{fontSize:12,color:"#9ca3af",fontFamily:"'JetBrains Mono',monospace"}}>{selectedEmployee.employeeId}</div>
                </div>
              </div>
              <button onClick={closeModal} style={{background:"#f3f4f6",border:"none",borderRadius:9,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#6b7280"}}
                onMouseEnter={e=>e.currentTarget.style.background="#e5e7eb"}
                onMouseLeave={e=>e.currentTarget.style.background="#f3f4f6"}
              ><CloseIcon/></button>
            </div>

            <div className="ve-modal-body">

              <p className="ve-section-label"><span>Personal Information</span></p>
              <div className="ve-grid-2" style={{marginBottom:20}}>
                <div><label className="ve-field-label">First Name</label><input name="firstName" value={editData.firstName||""} onChange={handleChange} className="ve-input"/></div>
                <div><label className="ve-field-label">Last Name</label><input name="lastName" value={editData.lastName||""} onChange={handleChange} className="ve-input"/></div>
                <div><label className="ve-field-label">CNIC</label><input name="cnic" value={editData.cnic||""} onChange={handleChange} className="ve-input mono"/></div>
                <div><label className="ve-field-label">Mobile</label><input name="mobile" value={editData.mobile||"+92"} onChange={handleChange} className="ve-input mono"/></div>
                <div><label className="ve-field-label">Email</label><input name="email" value={editData.email||""} onChange={handleChange} className="ve-input"/></div>
                <div><label className="ve-field-label">Username</label><input name="username" value={editData.username||""} onChange={handleChange} className="ve-input mono"/></div>
                <div style={{gridColumn:"span 2"}}><label className="ve-field-label">Address</label><input name="address" value={editData.address||""} onChange={handleChange} className="ve-input"/></div>
              </div>

              <p className="ve-section-label"><span>Role</span></p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:20}}>
                {["Admin","Accountant","Worker"].map(r=>(
                  <div key={r} onClick={()=>setEditData(p=>({...p,role:r}))}
                    style={{padding:"10px 14px",borderRadius:10,cursor:"pointer",
                      border:`1.5px solid ${editData.role===r?"#c7d2fe":"#f3f4f6"}`,
                      background:editData.role===r?"#eef2ff":"#fafafa",
                      display:"flex",alignItems:"center",gap:8,transition:"all .12s"}}>
                    <div style={{width:16,height:16,borderRadius:"50%",flex:"0 0 auto",
                      border:`2px solid ${editData.role===r?"#6366f1":"#d1d5db"}`,
                      background:editData.role===r?"#6366f1":"#fff",
                      display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {editData.role===r&&<svg width={8} height={8} viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <span style={{fontSize:13,fontWeight:700,color:editData.role===r?"#4338ca":"#374151"}}>{r}</span>
                  </div>
                ))}
              </div>

              <p className="ve-section-label">
                <span>Page Permissions</span>
                <span style={{fontSize:11.5,fontWeight:600,color:"#6366f1",fontFamily:"'JetBrains Mono',monospace"}}>
                  {editData.allowedRoutes?.length||0}/{routesList.length}
                </span>
              </p>
              <div style={{display:"flex",gap:8,marginBottom:10}}>
                {["Select All","Clear All"].map((label,i)=>(
                  <button key={label} type="button" onClick={()=>setEditData(p=>({...p,allowedRoutes:i===0?[...routesList]:[]}))}
                    style={{fontSize:11.5,fontWeight:600,padding:"4px 11px",borderRadius:7,border:"1.5px solid #e5e7eb",background:"#fff",color:"#6b7280",fontFamily:"'Plus Jakarta Sans',sans-serif",cursor:"pointer"}}>
                    {label}
                  </button>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,maxHeight:190,overflowY:"auto",padding:"2px 0",marginBottom:24,scrollbarWidth:"thin"}}>
                {routesList.map(route=>{
                  const active=editData.allowedRoutes?.includes(route);
                  return(
                    <div key={route} className={`ve-route-pill${active?" active":""}`} onClick={()=>toggleRoute(route)} title={route}>
                      <div className="ve-route-check">
                        {active&&<svg width={9} height={9} viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <span className="ve-route-text">{prettyRoute(route)}</span>
                    </div>
                  );
                })}
              </div>

              {/* ── DOCUMENTS — always visible ── */}
              <p className="ve-section-label">
                <span>Documents</span>
                {selectedEmployee.documents?.length>0&&(
                  <span style={{fontSize:11.5,fontWeight:600,color:"#0369a1",fontFamily:"'JetBrains Mono',monospace"}}>
                    {selectedEmployee.documents.length} file{selectedEmployee.documents.length!==1?"s":""}
                  </span>
                )}
              </p>

              {!selectedEmployee.documents?.length ? (
                <div className="ve-docs-empty">
                  <svg width={30} height={30} fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={1.5} style={{margin:"0 auto 8px",display:"block"}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <p style={{fontSize:13,fontWeight:600,color:"#9ca3af"}}>No documents uploaded for this employee</p>
                </div>
              ) : (
                <div style={{display:"flex",flexWrap:"wrap",gap:12}}>
                  {selectedEmployee.documents.map((doc,idx)=>(
                    <DocCard
                      key={idx}
                      doc={doc}
                      url={getFileUrl(doc.fileUrl)}
                      onPreview={(src,name)=>setLightbox({src,name})}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="ve-modal-foot">
              <button className="ve-modal-cancel" onClick={closeModal} disabled={saving}>Cancel</button>
              <button className="ve-modal-save" onClick={updateEmployee} disabled={saving}
                style={{ opacity: saving ? .7 : 1, display:"inline-flex", alignItems:"center", gap:7 }}>
                {saving ? (
                  <><svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                    style={{animation:"ve-spin 1s linear infinite", display:"inline-block"}}
                  ><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>Saving…</>
                ) : (
                  <><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>Save Changes</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ DELETE MODAL ═══ */}
      {showDeleteDialog&&(
        <div className="ve-overlay" onClick={cancelDelete}>
          <div className="ve-modal" style={{maxWidth:400}} onClick={e=>e.stopPropagation()}>
            <div className="ve-modal-head">
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:36,height:36,borderRadius:10,background:"#fee2e2",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                </div>
                <span className="ve-modal-title">Delete Employee</span>
              </div>
              <button onClick={cancelDelete} style={{background:"#f3f4f6",border:"none",borderRadius:9,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#6b7280"}}><CloseIcon/></button>
            </div>
            <div className="ve-modal-body">
              <p style={{fontSize:14,color:"#4b5563",lineHeight:1.6}}>
                Are you sure you want to delete <strong style={{color:"#111827"}}>{deleteTargetName}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="ve-modal-foot">
              <button className="ve-modal-cancel" onClick={cancelDelete}>Cancel</button>
              <button className="ve-modal-delete-btn" onClick={deleteEmployee}>Delete Employee</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ LIGHTBOX ═══ */}
      {lightbox&&<Lightbox src={lightbox.src} name={lightbox.name} onClose={()=>setLightbox(null)}/>}

    </SidebarLayout>
  );
}

const lbl = {
  display:"block",fontSize:11,fontWeight:700,textTransform:"uppercase",
  letterSpacing:".07em",color:"#9ca3af",marginBottom:6,
};