import React, { useEffect, useState } from "react";
import SidebarLayout from "../../components/layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import Notification from "../../components/Notification";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .ve { font-family: 'DM Sans', sans-serif; color: #111827; }

  .ve-inp, .ve-sel {
    width: 100%; border: 1px solid #d1d5db; border-radius: 6px;
    padding: 7px 10px; font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s; appearance: none;
  }
  .ve-inp::placeholder { color: #9ca3af; }
  .ve-inp:focus, .ve-sel:focus {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .ve-inp.mono { font-family: 'DM Mono', monospace; font-size: 12.5px; }

  .ve-sel-wrap { position: relative; }
  .ve-sel-wrap::after {
    content: ''; position: absolute; right: 10px; top: 50%;
    transform: translateY(-50%); pointer-events: none;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #9ca3af;
  }

  /* table */
  .ve-table { width: 100%; border-collapse: collapse; }
  .ve-table thead tr { background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
  .ve-table thead th {
    padding: 9px 14px; font-size: 10px; font-weight: 700;
    font-family: 'DM Sans', sans-serif; text-transform: uppercase;
    letter-spacing: .07em; color: #9ca3af; text-align: left;
    white-space: nowrap; border: none;
  }
  .ve-table thead th:last-child { text-align: center; }
  .ve-table tbody tr { background: #fff; border-bottom: 1px solid #f3f4f6; transition: background .08s; }
  .ve-table tbody tr:last-child { border-bottom: none; }
  .ve-table tbody tr:hover { background: #fafafa; }
  .ve-table tbody td { padding: 12px 14px; font-size: 13px; color: #374151; vertical-align: middle; }
  .ve-table tbody td.mono { font-family: 'DM Mono', monospace; font-size: 12px; color: #6b7280; }

  /* avatar */
  .ve-avatar {
    width: 32px; height: 32px; border-radius: 8px; display: flex;
    align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; flex-shrink: 0; color: #fff;
  }

  /* status badge */
  .ve-status { display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px;
    border-radius: 5px; font-size: 11.5px; font-weight: 600; white-space: nowrap; }
  .ve-status.active   { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
  .ve-status.inactive { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }

  /* role badge */
  .ve-role { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11.5px; font-weight: 600; }
  .ve-role.admin      { background: #eff6ff; color: #1d4ed8; }
  .ve-role.accountant { background: #fefce8; color: #854d0e; }
  .ve-role.worker     { background: #f3f4f6; color: #374151; }

  /* action buttons */
  .ve-btn {
    display: inline-flex; align-items: center; gap: 5px; padding: 5px 10px;
    border-radius: 6px; border: 1px solid transparent; font-size: 11.5px; font-weight: 500;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    transition: all .1s; white-space: nowrap;
  }
  .ve-btn.toggle-on  { background: #fff7ed; color: #c2410c; border-color: #fed7aa; }
  .ve-btn.toggle-on:hover  { background: #ffedd5; }
  .ve-btn.toggle-off { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
  .ve-btn.toggle-off:hover { background: #dcfce7; }
  .ve-btn.edit  { background: #fff; color: #374151; border-color: #d1d5db; }
  .ve-btn.edit:hover  { background: #f9fafb; }
  .ve-btn.del   { background: #fff; color: #dc2626; border-color: #fecaca; }
  .ve-btn.del:hover   { background: #fef2f2; }

  /* doc badge */
  .ve-doc-badge {
    display: inline-flex; align-items: center; gap: 3px;
    padding: 1px 7px; border-radius: 4px; font-size: 10.5px; font-weight: 600;
    background: #f0f9ff; color: #0369a1; border: 1px solid #bae6fd;
    margin-left: 6px; cursor: pointer; transition: background .1s; vertical-align: middle;
  }
  .ve-doc-badge:hover { background: #e0f2fe; }

  /* modal */
  .ve-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,.4);
    display: flex; align-items: center; justify-content: center;
    z-index: 50; padding: 20px;
  }
  @keyframes ve-modal-in { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }
  .ve-modal {
    background: #fff; border-radius: 10px; width: 100%;
    box-shadow: 0 16px 48px rgba(0,0,0,.14); animation: ve-modal-in .18s ease-out;
    display: flex; flex-direction: column; overflow: hidden;
    border: 1px solid #e5e7eb;
  }
  .ve-modal-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 20px; border-bottom: 1px solid #e5e7eb; background: #fff; flex-shrink: 0;
  }
  .ve-modal-body  { padding: 20px; overflow-y: auto; flex: 1; min-height: 0; }
  .ve-modal-foot  {
    display: flex; justify-content: flex-end; gap: 8px;
    padding: 12px 20px; border-top: 1px solid #f3f4f6;
    background: #f9fafb; flex-shrink: 0;
  }

  .ve-modal-cancel {
    padding: 8px 16px; border-radius: 7px; border: 1px solid #e5e7eb;
    background: #fff; font-size: 13px; font-weight: 500; color: #374151;
    font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all .1s;
  }
  .ve-modal-cancel:hover { background: #f9fafb; }
  .ve-modal-save {
    padding: 8px 18px; border-radius: 7px; border: none;
    background: #111827; color: #fff;
    font-size: 13px; font-weight: 600; font-family: 'DM Sans', sans-serif;
    cursor: pointer; transition: background .12s;
    display: inline-flex; align-items: center; gap: 7px;
  }
  .ve-modal-save:hover { background: #1f2937; }
  .ve-modal-save:disabled { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; }
  .ve-modal-del {
    padding: 8px 18px; border-radius: 7px; border: none;
    background: #dc2626; color: #fff;
    font-size: 13px; font-weight: 600; font-family: 'DM Sans', sans-serif;
    cursor: pointer; transition: background .12s;
  }
  .ve-modal-del:hover { background: #b91c1c; }

  /* section labels */
  .ve-slbl {
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .08em; color: #9ca3af; margin-bottom: 10px;
    padding-bottom: 6px; border-bottom: 1px solid #f3f4f6;
    display: flex; align-items: center; justify-content: space-between;
  }
  .ve-flbl {
    display: block; font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: #6b7280; margin-bottom: 5px;
  }

  /* route pills */
  .ve-route-pill {
    display: flex; align-items: center; gap: 7px; padding: 6px 9px;
    border-radius: 6px; cursor: pointer; border: 1px solid #e5e7eb;
    background: #f9fafb; transition: all .1s; user-select: none;
  }
  .ve-route-pill:hover  { border-color: #d1d5db; background: #f3f4f6; }
  .ve-route-pill.active { border-color: #d1d5db; background: #f3f4f6; }
  .ve-route-check {
    width: 14px; height: 14px; border-radius: 3px; flex-shrink: 0;
    border: 1px solid #d1d5db; background: #fff;
    display: flex; align-items: center; justify-content: center; transition: all .1s;
  }
  .ve-route-pill.active .ve-route-check { background: #111827; border-color: #111827; }
  .ve-route-text {
    font-size: 11px; font-weight: 500; color: #4b5563;
    font-family: 'DM Mono', monospace; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis;
  }
  .ve-route-pill.active .ve-route-text { color: #111827; font-weight: 600; }

  /* doc card */
  .ve-doc-card {
    display: flex; flex-direction: column; border-radius: 8px;
    border: 1px solid #e5e7eb; overflow: hidden;
    transition: box-shadow .12s; background: #fff; width: 110px; flex-shrink: 0;
  }
  .ve-doc-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,.08); }
  .ve-doc-thumb { width: 110px; height: 80px; object-fit: cover; display: block; cursor: zoom-in; }
  .ve-doc-placeholder {
    width: 110px; height: 80px; display: flex; flex-direction: column;
    align-items: center; justify-content: center; background: #f9fafb;
    gap: 4px; cursor: pointer;
  }
  .ve-doc-foot {
    padding: 5px 7px; border-top: 1px solid #f3f4f6;
    display: flex; align-items: center; gap: 4px;
  }
  .ve-doc-fname {
    font-size: 10px; font-weight: 500; color: #374151;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1;
  }
  .ve-doc-btn {
    display: inline-flex; align-items: center; justify-content: center;
    width: 18px; height: 18px; border-radius: 4px; flex-shrink: 0;
    border: none; cursor: pointer; transition: background .1s; text-decoration: none;
    font-size: 10px;
  }

  /* lightbox */
  .ve-lightbox {
    position: fixed; inset: 0; background: rgba(0,0,0,.88);
    display: flex; align-items: center; justify-content: center;
    z-index: 200; padding: 24px; cursor: zoom-out;
  }

  /* skeleton */
  @keyframes ve-shimmer { to { background-position: -200% 0; } }
  .ve-skel {
    background: linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%);
    background-size: 200% 100%; animation: ve-shimmer 1.3s infinite; border-radius: 5px;
  }

  @keyframes ve-spin { to { transform: rotate(360deg); } }
  .ve-spin-ico { display: inline-block; animation: ve-spin 1s linear infinite; }

  .ve-empty { text-align: center; padding: 56px 20px; color: #9ca3af; }
  .ve-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  @media (max-width: 600px) { .ve-g2 { grid-template-columns: 1fr; } }

  .ve-docs-empty {
    padding: 18px; border-radius: 8px; border: 1px dashed #e5e7eb;
    text-align: center; color: #9ca3af; background: #fafafa;
  }

  /* role selector in modal */
  .ve-role-opt {
    padding: 9px 12px; border-radius: 7px; cursor: pointer;
    border: 1px solid #e5e7eb; background: #f9fafb;
    display: flex; align-items: center; gap: 8px; transition: all .1s;
  }
  .ve-role-opt:hover  { border-color: #d1d5db; }
  .ve-role-opt.sel    { border-color: #d1d5db; background: #f3f4f6; }
  .ve-role-radio {
    width: 14px; height: 14px; border-radius: "50%"; flex-shrink: 0;
    border: 1.5px solid #d1d5db; background: #fff;
    display: flex; align-items: center; justify-content: center; transition: all .1s;
  }
  .ve-role-opt.sel .ve-role-radio { border-color: #111827; background: #111827; }
`;

const avatarColors = ["#374151","#1d4ed8","#15803d","#b45309","#7c3aed","#0e7490","#be185d"];
const avatarColor  = n => avatarColors[(n?.charCodeAt(0)||0) % avatarColors.length];
const initials     = (f,l) => `${f?.[0]||""}${l?.[0]||""}`.toUpperCase();
const prettyRoute  = r => r.replace(/^\//,"").replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase()) || "Dashboard";
const isImg        = u => /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(u||"");
const docLabel     = d => d.name || d.fileUrl?.split("/").pop() || "Document";

const routesList = [
  "/dashboard","/create-account","/view-accounts","/ledger",
  "/general-entries","/products","/products/new",
  "/add-invoice-purchase","/view-purchase-invoices",
  "/add-invoice-sales","/view-sales-invoices",
  "/stock-management","/trialbalance","/balancesheet",
  "/incomestatement","/weight-bridge","/weight-bridge/invoices",
  "/cashbook","/cashbook-report",
];

const CloseIcon = () => (
  <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
  </svg>
);

function DocCard({ doc, url, onPreview }) {
  const name = docLabel(doc);
  const img  = isImg(url);
  const [broken, setBroken] = React.useState(false);
  return (
    <div className="ve-doc-card">
      {img && !broken ? (
        <img src={url} alt={name} className="ve-doc-thumb"
          onClick={() => onPreview(url, name)}
          onError={() => setBroken(true)}/>
      ) : (
        <div className="ve-doc-placeholder" onClick={() => window.open(url,"_blank")}>
          <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span style={{ fontSize:9, color:"#9ca3af", fontWeight:700, textTransform:"uppercase", letterSpacing:".05em" }}>
            {url.split(".").pop()?.toUpperCase().slice(0,6)||"FILE"}
          </span>
        </div>
      )}
      <div className="ve-doc-foot">
        <span className="ve-doc-fname" title={name}>{name}</span>
        <a href={url} target="_blank" rel="noopener noreferrer"
          className="ve-doc-btn" style={{ background:"#f0f9ff", color:"#0369a1" }}
          onClick={e => e.stopPropagation()}>
          <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

function Lightbox({ src, name, onClose }) {
  useEffect(() => {
    const h = e => { if (e.key==="Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div className="ve-lightbox" onClick={onClose}>
      <div style={{ position:"relative", maxWidth:"88vw", maxHeight:"88vh" }}
        onClick={e => e.stopPropagation()}>
        <img src={src} alt={name}
          style={{ maxWidth:"88vw", maxHeight:"84vh", borderRadius:8, objectFit:"contain", display:"block", boxShadow:"0 24px 64px rgba(0,0,0,.5)" }}/>
        <div style={{ position:"absolute", bottom:-32, left:0, right:0, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:12.5, color:"rgba(255,255,255,.6)" }}>{name}</span>
          <span style={{ fontSize:11, color:"rgba(255,255,255,.3)" }}>Esc or click to close</span>
        </div>
        <button onClick={onClose} style={{ position:"absolute", top:-10, right:-10, width:26, height:26, borderRadius:"50%", background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.18)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#fff" }}>
          <CloseIcon/>
        </button>
      </div>
    </div>
  );
}

const lbl = { display:"block", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#6b7280", marginBottom:5 };

export default function ViewEmployees() {
  const token = localStorage.getItem("token");

  const [employees,         setEmployees]         = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search,            setSearch]            = useState("");
  const [roleFilter,        setRoleFilter]        = useState("");
  const [statusFilter,      setStatusFilter]      = useState("");
  const [loading,           setLoading]           = useState(true);
  const [notifMsg,          setNotifMsg]          = useState("");
  const [notifType,         setNotifType]         = useState("");
  const [selectedEmployee,  setSelectedEmployee]  = useState(null);
  const [editData,          setEditData]          = useState({});
  const [showModal,         setShowModal]         = useState(false);
  const [showDeleteDialog,  setShowDeleteDialog]  = useState(false);
  const [deleteTargetId,    setDeleteTargetId]    = useState(null);
  const [deleteTargetName,  setDeleteTargetName]  = useState("");
  const [lightbox,          setLightbox]          = useState(null);
  const [saving,            setSaving]            = useState(false);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res  = await fetch(`${API_BASE_URL}/employees`, { headers:{ Authorization:`Bearer ${token}` } });
      const data = await res.json();
      setEmployees(data); setFilteredEmployees(data);
    } catch { setNotifMsg("Failed to load employees"); setNotifType("error"); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchEmployees(); }, []);

  useEffect(() => {
    let f = [...employees];
    if (search)       f = f.filter(e => `${e.firstName} ${e.lastName} ${e.email} ${e.cnic}`.toLowerCase().includes(search.toLowerCase()));
    if (roleFilter)   f = f.filter(e => e.role === roleFilter);
    if (statusFilter) f = f.filter(e => e.isActive === (statusFilter === "Active"));
    setFilteredEmployees(f);
  }, [search, roleFilter, statusFilter, employees]);

  const openEditModal = emp => { setSelectedEmployee(emp); setEditData(emp); setShowModal(true); };
  const closeModal    = () => { setSelectedEmployee(null); setShowModal(false); };

  const handleChange = e => {
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

  const toggleRoute = route => setEditData(p=>({
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
      setNotifMsg("Employee updated"); setNotifType("success");
      fetchEmployees(); closeModal();
    } catch(err) { setNotifMsg(err.message); setNotifType("error"); }
    finally { setSaving(false); }
  };

  const toggleRestrict = async id => {
    try {
      await fetch(`${API_BASE_URL}/employees/${id}/toggle`,{method:"PATCH",headers:{Authorization:`Bearer ${token}`}});
      fetchEmployees(); setNotifMsg("Status updated"); setNotifType("success");
    } catch { setNotifMsg("Failed to update status"); setNotifType("error"); }
  };

  const confirmDelete  = (id,name) => { setDeleteTargetId(id); setDeleteTargetName(name); setShowDeleteDialog(true); };
  const cancelDelete   = () => { setDeleteTargetId(null); setDeleteTargetName(""); setShowDeleteDialog(false); };
  const deleteEmployee = async () => {
    try {
      await fetch(`${API_BASE_URL}/employees/${deleteTargetId}`,{method:"DELETE",headers:{Authorization:`Bearer ${token}`}});
      fetchEmployees(); setNotifMsg("Employee deleted"); setNotifType("success");
    } catch { setNotifMsg("Delete failed"); setNotifType("error"); }
    setShowDeleteDialog(false); setDeleteTargetId(null);
  };

  const serverRoot = API_BASE_URL.replace(/\/api\/?$/, "");
  const getFileUrl = fp => {
    if (!fp) return "";
    const clean = fp.replace(/\\/g, "/");
    if (/^https?:\/\//.test(clean)) return clean;
    return `${serverRoot}/${clean.replace(/^\//, "")}`;
  };

  const hasFilters   = search||roleFilter||statusFilter;
  const clearFilters = () => { setSearch(""); setRoleFilter(""); setStatusFilter(""); };

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification message={notifMsg} type={notifType}/>

      <div className="ve">

        {/* header */}
        <div style={{ marginBottom:18, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <div>
            <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 3px" }}>HR Management</p>
            <h1 style={{ fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px", margin:0 }}>Employees</h1>
          </div>
          {!loading && (
            <span style={{ fontSize:12, color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>
              {filteredEmployees.length}
              {filteredEmployees.length!==employees.length && <span> / {employees.length}</span>}
              <span style={{ fontFamily:"'DM Sans',sans-serif", marginLeft:4, fontWeight:500 }}>
                employee{filteredEmployees.length!==1?"s":""}
              </span>
            </span>
          )}
        </div>

        {/* filters */}
        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, padding:"12px 14px", marginBottom:14 }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr auto", gap:10, alignItems:"end" }}>
            <div>
              <label style={lbl}>Search</label>
              <div style={{ position:"relative" }}>
                <svg style={{ position:"absolute", left:9, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}
                  width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                  <circle cx={11} cy={11} r={8}/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
                </svg>
                <input className="ve-inp" value={search} onChange={e=>setSearch(e.target.value)}
                  placeholder="Name, email, CNIC…" style={{ paddingLeft:30 }}/>
              </div>
            </div>
            <div>
              <label style={lbl}>Role</label>
              <div className="ve-sel-wrap">
                <select className="ve-sel" value={roleFilter} onChange={e=>setRoleFilter(e.target.value)}>
                  <option value="">All roles</option>
                  <option>Admin</option><option>Accountant</option><option>Worker</option>
                </select>
              </div>
            </div>
            <div>
              <label style={lbl}>Status</label>
              <div className="ve-sel-wrap">
                <select className="ve-sel" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
                  <option value="">All statuses</option>
                  <option>Active</option><option>Inactive</option>
                </select>
              </div>
            </div>
            <div style={{ paddingTop:20 }}>
              <button onClick={clearFilters}
                style={{ padding:"7px 12px", borderRadius:6, border:"1px solid #e5e7eb", background:"#fff", color:"#374151", fontSize:12.5, fontWeight:500, cursor:hasFilters?"pointer":"default", opacity:hasFilters?1:.35, fontFamily:"'DM Sans',sans-serif" }}>
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* table */}
        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, overflow:"hidden" }}>
          <table className="ve-table">
            <thead>
              <tr>
                <th>Employee</th><th>CNIC</th><th>Email</th>
                <th>Role</th><th>Status</th><th style={{ textAlign:"center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_,i)=>(
                  <tr key={i}>{[200,160,180,80,70,140].map((w,j)=>(
                    <td key={j} style={{ padding:12 }}><div className="ve-skel" style={{ height:13, width:w, maxWidth:"100%" }}/></td>
                  ))}</tr>
                ))
              ) : filteredEmployees.length===0 ? (
                <tr><td colSpan={6}>
                  <div className="ve-empty">
                    <svg width={40} height={40} fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={1.2}
                      style={{ margin:"0 auto 12px", display:"block" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <p style={{ fontSize:13, fontWeight:600, color:"#374151", margin:"0 0 4px" }}>No employees found</p>
                    <p style={{ fontSize:12, color:"#9ca3af" }}>Try adjusting your filters</p>
                  </div>
                </td></tr>
              ) : filteredEmployees.map(emp => (
                <tr key={emp._id}>
                  <td>
                    <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                      <div className="ve-avatar" style={{ background:avatarColor(emp.firstName) }}>
                        {initials(emp.firstName,emp.lastName)}
                      </div>
                      <div>
                        <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap" }}>
                          <span style={{ fontWeight:600, color:"#111827", fontSize:13 }}>
                            {emp.firstName} {emp.lastName}
                          </span>
                          {emp.documents?.length>0 && (
                            <span className="ve-doc-badge" onClick={()=>openEditModal(emp)}>
                              <svg width={8} height={8} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
                              </svg>
                              {emp.documents.length}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize:11, color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>
                          {emp.employeeId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="mono">{emp.cnic||"—"}</td>
                  <td style={{ fontSize:12.5, color:"#6b7280" }}>{emp.email}</td>
                  <td><span className={`ve-role ${emp.role?.toLowerCase()}`}>{emp.role}</span></td>
                  <td>
                    <span className={`ve-status ${emp.isActive?"active":"inactive"}`}>
                      <span style={{ width:5, height:5, borderRadius:"50%", background:emp.isActive?"#15803d":"#dc2626", display:"inline-block" }}/>
                      {emp.isActive?"Active":"Inactive"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display:"flex", gap:5, justifyContent:"center" }}>
                      <button className={`ve-btn ${emp.isActive?"toggle-on":"toggle-off"}`} onClick={()=>toggleRestrict(emp._id)}>
                        {emp.isActive ? "Restrict" : "Enable"}
                      </button>
                      <button className="ve-btn edit" onClick={()=>openEditModal(emp)}>
                        <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        Edit
                      </button>
                      <button className="ve-btn del" onClick={()=>confirmDelete(emp._id,`${emp.firstName} ${emp.lastName}`)}>
                        <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!loading && filteredEmployees.length>0 && (
          <p style={{ textAlign:"center", color:"#9ca3af", fontSize:12, marginTop:14, fontFamily:"'DM Mono',monospace" }}>
            {filteredEmployees.length} employee{filteredEmployees.length!==1?"s":""}
            {hasFilters?` · filtered from ${employees.length} total`:""}
          </p>
        )}
      </div>

      {/* Edit modal */}
      {showModal && selectedEmployee && (
        <div className="ve-overlay" onClick={closeModal}>
          <div className="ve-modal" style={{ maxWidth:680, height:"90vh", maxHeight:820 }}
            onClick={e=>e.stopPropagation()}>

            <div className="ve-modal-head">
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div className="ve-avatar" style={{ background:avatarColor(selectedEmployee.firstName) }}>
                  {initials(selectedEmployee.firstName,selectedEmployee.lastName)}
                </div>
                <div>
                  <div style={{ fontSize:15, fontWeight:700, color:"#111827" }}>
                    {selectedEmployee.firstName} {selectedEmployee.lastName}
                  </div>
                  <div style={{ fontSize:11, color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>
                    {selectedEmployee.employeeId}
                  </div>
                </div>
              </div>
              <button onClick={closeModal}
                style={{ background:"#f3f4f6", border:"none", borderRadius:7, width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#6b7280" }}>
                <CloseIcon/>
              </button>
            </div>

            <div className="ve-modal-body">
              <p className="ve-slbl"><span>Personal Information</span></p>
              <div className="ve-g2" style={{ marginBottom:16 }}>
                <div><label className="ve-flbl">First Name</label><input name="firstName" value={editData.firstName||""} onChange={handleChange} className="ve-inp"/></div>
                <div><label className="ve-flbl">Last Name</label><input name="lastName" value={editData.lastName||""} onChange={handleChange} className="ve-inp"/></div>
                <div><label className="ve-flbl">CNIC</label><input name="cnic" value={editData.cnic||""} onChange={handleChange} className="ve-inp mono"/></div>
                <div><label className="ve-flbl">Mobile</label><input name="mobile" value={editData.mobile||"+92"} onChange={handleChange} className="ve-inp mono"/></div>
                <div><label className="ve-flbl">Email</label><input name="email" value={editData.email||""} onChange={handleChange} className="ve-inp"/></div>
                <div><label className="ve-flbl">Address</label><input name="address" value={editData.address||""} onChange={handleChange} className="ve-inp"/></div>
              </div>

              <p className="ve-slbl"><span>Role</span></p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:7, marginBottom:16 }}>
                {["Admin","Accountant","Worker"].map(r=>(
                  <div key={r} className={`ve-role-opt${editData.role===r?" sel":""}`}
                    onClick={()=>setEditData(p=>({...p,role:r}))}>
                    <div className="ve-role-radio" style={{ borderRadius:"50%" }}>
                      {editData.role===r && <svg width={8} height={8} viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>}
                    </div>
                    <span style={{ fontSize:13, fontWeight:600, color:editData.role===r?"#111827":"#374151" }}>{r}</span>
                  </div>
                ))}
              </div>

              <p className="ve-slbl">
                <span>Page Permissions</span>
                <span style={{ fontSize:11, fontWeight:600, color:"#374151", fontFamily:"'DM Mono',monospace" }}>
                  {editData.allowedRoutes?.length||0}/{routesList.length}
                </span>
              </p>
              <div style={{ display:"flex", gap:7, marginBottom:9 }}>
                {[["Select All",true],["Clear All",false]].map(([lbl,all])=>(
                  <button key={lbl} type="button"
                    onClick={()=>setEditData(p=>({...p,allowedRoutes:all?[...routesList]:[]}))}
                    style={{ fontSize:11.5, fontWeight:500, padding:"4px 10px", borderRadius:5, border:"1px solid #e5e7eb", background:"#fff", color:"#374151", fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}>
                    {lbl}
                  </button>
                ))}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:5, maxHeight:180, overflowY:"auto", marginBottom:20 }}>
                {routesList.map(route=>{
                  const active = editData.allowedRoutes?.includes(route);
                  return (
                    <div key={route} className={`ve-route-pill${active?" active":""}`}
                      onClick={()=>toggleRoute(route)} title={route}>
                      <div className="ve-route-check">
                        {active && <svg width={8} height={8} viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>}
                      </div>
                      <span className="ve-route-text">{prettyRoute(route)}</span>
                    </div>
                  );
                })}
              </div>

              <p className="ve-slbl">
                <span>Documents</span>
                {selectedEmployee.documents?.length > 0 && (
                  <span style={{ fontSize:11, fontWeight:600, color:"#6b7280", fontFamily:"'DM Mono',monospace" }}>
                    {selectedEmployee.documents.length} file{selectedEmployee.documents.length!==1?"s":""}
                  </span>
                )}
              </p>
              {!selectedEmployee.documents?.length ? (
                <div className="ve-docs-empty">
                  <p style={{ fontSize:12.5, fontWeight:500, color:"#9ca3af", margin:0 }}>No documents uploaded</p>
                </div>
              ) : (
                <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                  {selectedEmployee.documents.map((doc,idx)=>(
                    <DocCard key={idx} doc={doc} url={getFileUrl(doc.fileUrl)}
                      onPreview={(src,name)=>setLightbox({src,name})}/>
                  ))}
                </div>
              )}
            </div>

            <div className="ve-modal-foot">
              <button className="ve-modal-cancel" onClick={closeModal} disabled={saving}>Cancel</button>
              <button className="ve-modal-save" onClick={updateEmployee} disabled={saving}>
                {saving
                  ? <><span className="ve-spin-ico"><svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg></span> Saving…</>
                  : <><svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Save Changes</>
                }
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {showDeleteDialog && (
        <div className="ve-overlay" onClick={cancelDelete}>
          <div className="ve-modal" style={{ maxWidth:380 }} onClick={e=>e.stopPropagation()}>
            <div className="ve-modal-head">
              <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                <div style={{ width:34, height:34, borderRadius:8, background:"#fef2f2", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </div>
                <span style={{ fontSize:15, fontWeight:700, color:"#111827" }}>Delete Employee</span>
              </div>
              <button onClick={cancelDelete}
                style={{ background:"#f3f4f6", border:"none", borderRadius:7, width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#6b7280" }}>
                <CloseIcon/>
              </button>
            </div>
            <div className="ve-modal-body">
              <p style={{ fontSize:13.5, color:"#4b5563", lineHeight:1.6, margin:0 }}>
                Are you sure you want to delete <strong style={{ color:"#111827" }}>{deleteTargetName}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="ve-modal-foot">
              <button className="ve-modal-cancel" onClick={cancelDelete}>Cancel</button>
              <button className="ve-modal-del" onClick={deleteEmployee}>Delete Employee</button>
            </div>
          </div>
        </div>
      )}

      {lightbox && <Lightbox src={lightbox.src} name={lightbox.name} onClose={()=>setLightbox(null)}/>}
    </SidebarLayout>
  );
}