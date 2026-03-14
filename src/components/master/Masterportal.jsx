// MasterPortal.jsx — ORCA TECH Master Dashboard — Light Theme
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../config/API_BASE_URL.js";

const getToken  = () => localStorage.getItem("token");
const authHdr   = () => ({ Authorization: `Bearer ${getToken()}`, "Content-Type": "application/json" });
const authFetch = (url, opts = {}) => fetch(url, { ...opts, headers: { ...authHdr(), ...(opts.headers||{}) } });

const fmtDate = d => d ? new Date(d).toLocaleDateString("en-PK",{year:"numeric",month:"short",day:"numeric"}) : "—";
const fmtFull = d => d ? new Date(d).toLocaleString("en-PK",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}) : "—";
const fmtPKR  = n => `PKR ${Number(n||0).toLocaleString()}`;
const rawCnic = c => c.replace(/-/g,"").trim();
const fmtCnic = raw => { const d=raw.replace(/\D/g,"").slice(0,13); if(d.length<=5)return d; if(d.length<=12)return `${d.slice(0,5)}-${d.slice(5)}`; return `${d.slice(0,5)}-${d.slice(5,12)}-${d.slice(12)}`; };
const fileUrl = p => { if(!p)return null; if(p.startsWith("http"))return p; return `${API_BASE_URL.replace(/\/api\/?$/,"")}/${p.replace(/^\/+/,"")}`; };

function pwdScore(p) {
  let s=0;
  if(p.length>=8)s++;if(p.length>=12)s++;
  if(/[A-Z]/.test(p)&&/[a-z]/.test(p))s++;
  if(/\d/.test(p)&&/[^A-Za-z0-9]/.test(p))s++;
  return s;
}
const PWD_LABELS=["","Weak","Fair","Good","Strong"];
const PWD_COLORS=["","#ef4444","#f97316","#eab308","#059669"];

const PACKAGES = {
  starter:      { name:"Starter",      tier:"BASIC",    price:250000, monthly:7500, customization:30000, color:"#6366f1", gradient:"linear-gradient(135deg,#6366f1,#8b5cf6)",
    features:["Dashboard & Analytics","Chart of Accounts","Products & Inventory","Journal Entries","Purchase & Sales Invoices","Financial Reports (BS, TB, IS)","Ledger & References","Cashbook & Daily Register","Profile Management"],
    extras:["Free onboarding session","Email support"], excludes:["Employee Management","Weight Bridge"] },
  professional: { name:"Professional", tier:"STANDARD", price:400000, monthly:7500, customization:30000, color:"#059669", gradient:"linear-gradient(135deg,#059669,#34d399)",
    features:["Everything in Starter","Employee Management","Role-Based Access Control","Priority Support","Staff Training Session","Custom Ledger References"],
    extras:["2 onboarding sessions","Priority support","Staff training"], excludes:["Weight Bridge"] },
  enterprise:   { name:"Enterprise",   tier:"PREMIUM",  price:650000, monthly:7500, customization:30000, color:"#f59e0b", gradient:"linear-gradient(135deg,#f59e0b,#fbbf24)",
    features:["Everything in Professional","Weight Bridge System","Custom Vehicle Types & Rates","Season-Based Management","Dedicated Support","Custom Feature Requests","Unlimited Staff Accounts","Data Export Tools"],
    extras:["Dedicated account manager","Unlimited onboarding","Custom feature requests","On-site support (if needed)"], excludes:[] },
};

const PAY_CAT_STYLE = {
  monthly:     { bg:"#f0fdf4", color:"#059669", border:"#bbf7d0", label:"Monthly" },
  installment: { bg:"#fefce8", color:"#ca8a04", border:"#fde68a", label:"Installment" },
  package:     { bg:"#eff6ff", color:"#2563eb", border:"#bfdbfe", label:"Package" },
  full_package:{ bg:"#eff6ff", color:"#2563eb", border:"#bfdbfe", label:"Package" },
  other:       { bg:"#f5f3ff", color:"#7c3aed", border:"#ddd6fe", label:"Other" },
};

const FONTS=`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');`;

const CSS=`
  @keyframes fadeUp  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
  @keyframes slideIn { from{transform:translateX(20px);opacity:0} to{transform:none;opacity:1} }
  @keyframes spin    { to{transform:rotate(360deg)} }

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

  .mp { min-height:100vh; background:#f1f5f9; font-family:'Plus Jakarta Sans',sans-serif; color:#0f172a; display:flex; flex-direction:column; }

  /* TOPBAR */
  .mp-bar { height:56px; display:flex; align-items:center; gap:12px; padding:0 20px; background:#fff; border-bottom:1.5px solid #e2e8f0; position:sticky; top:0; z-index:300; flex-shrink:0; box-shadow:0 1px 3px rgba(0,0,0,.04); }
  .mp-bar-logo { font-family:'Syne',sans-serif; font-size:18px; font-weight:800; color:#0f172a; }
  .mp-bar-logo em { color:#4f46e5; font-style:normal; }
  .mp-bar-chip { background:#eef2ff; color:#4f46e5; font-size:9px; font-weight:700; padding:3px 9px; border-radius:20px; letter-spacing:.1em; text-transform:uppercase; font-family:'JetBrains Mono',monospace; border:1px solid #c7d2fe; }
  .mp-bar-space { flex:1; }
  .mp-bar-org { font-size:11.5px; color:#94a3b8; display:none; }
  @media(min-width:900px){ .mp-bar-org{display:block;} }
  .mp-bar-out { background:#fee2e2; border:1px solid #fca5a5; color:#dc2626; border-radius:8px; padding:6px 14px; font-size:12px; font-family:'Plus Jakarta Sans',sans-serif; cursor:pointer; transition:.15s; font-weight:600; }
  .mp-bar-out:hover { background:#fecaca; }

  /* BODY LAYOUT */
  .mp-body { display:flex; flex:1; height:calc(100vh - 56px); overflow:hidden; }

  /* SIDEBAR */
  .mp-side { width:220px; flex-shrink:0; background:#fff; border-right:1.5px solid #e2e8f0; display:flex; flex-direction:column; overflow-y:auto; padding:14px 10px; }
  .mp-side::-webkit-scrollbar { width:3px; }
  .mp-side::-webkit-scrollbar-thumb { background:#e2e8f0; border-radius:3px; }
  .mp-side-lbl { font-size:9px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#94a3b8; padding:0 8px; margin-bottom:5px; margin-top:12px; font-family:'JetBrains Mono',monospace; }
  .mp-nav { display:flex; align-items:center; gap:9px; padding:9px 10px; border-radius:9px; cursor:pointer; color:#64748b; font-size:13px; font-weight:600; transition:.15s; border:1px solid transparent; width:100%; background:none; text-align:left; }
  .mp-nav:hover { background:#f8fafc; color:#0f172a; }
  .mp-nav.on    { background:#eef2ff; color:#4f46e5; border-color:#c7d2fe; }
  .mp-nav-badge { margin-left:auto; background:#fef3c7; color:#d97706; font-size:9px; font-weight:700; padding:1px 7px; border-radius:20px; font-family:'JetBrains Mono',monospace; border:1px solid #fde68a; }
  .mp-nav-badge.red { background:#fee2e2; color:#dc2626; border-color:#fca5a5; }

  /* MAIN */
  .mp-main { flex:1; overflow-y:auto; padding:22px 24px; min-width:0; }
  .mp-main::-webkit-scrollbar { width:4px; }
  .mp-main::-webkit-scrollbar-thumb { background:#e2e8f0; border-radius:4px; }

  .mp-pg-hd  { font-family:'Syne',sans-serif; font-size:20px; font-weight:800; color:#0f172a; margin-bottom:3px; }
  .mp-pg-sub { font-size:12.5px; color:#64748b; margin-bottom:20px; }

  /* STAT CARDS */
  .mp-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-bottom:20px; }
  @media(max-width:900px){ .mp-stats{grid-template-columns:1fr 1fr;} }
  .mp-sc { border-radius:14px; padding:16px 18px; border:1.5px solid #e2e8f0; background:#fff; position:relative; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,.04); }
  .mp-sc-accent { position:absolute; top:0; left:0; right:0; height:3px; border-radius:14px 14px 0 0; }
  .mp-sc-lbl { font-size:9.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#94a3b8; font-family:'JetBrains Mono',monospace; margin-bottom:6px; }
  .mp-sc-num { font-family:'Syne',sans-serif; font-size:30px; font-weight:800; line-height:1; }

  /* BADGE */
  .badge { display:inline-flex; align-items:center; gap:4px; border-radius:20px; padding:3px 9px; font-size:10px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; font-family:'JetBrains Mono',monospace; border:1px solid; }
  .badge-dot { width:5px; height:5px; border-radius:50%; }
  .badge-pending    { background:#fffbeb; color:#d97706; border-color:#fde68a; } .badge-pending .badge-dot { background:#f59e0b; }
  .badge-approved   { background:#f0fdf4; color:#059669; border-color:#bbf7d0; } .badge-approved .badge-dot { background:#22c55e; }
  .badge-restricted { background:#fef2f2; color:#dc2626; border-color:#fca5a5; } .badge-restricted .badge-dot { background:#ef4444; }

  /* TABLE */
  .mp-tbl-wrap { background:#fff; border:1.5px solid #e2e8f0; border-radius:14px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,.04); }
  .mp-toolbar  { display:flex; gap:8px; margin-bottom:14px; flex-wrap:wrap; align-items:center; }
  .mp-srch { flex:1; min-width:180px; position:relative; }
  .mp-srch-ico { position:absolute; left:11px; top:50%; transform:translateY(-50%); color:#94a3b8; pointer-events:none; }
  .mp-srch input { width:100%; padding:8px 12px 8px 34px; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:9px; font-size:13px; color:#0f172a; font-family:'Plus Jakarta Sans',sans-serif; outline:none; transition:.15s; }
  .mp-srch input:focus { border-color:#a5b4fc; background:#fff; }
  .mp-srch input::placeholder { color:#94a3b8; }
  .mp-tab-btn { padding:7px 14px; border-radius:8px; border:1.5px solid #e2e8f0; background:#fff; font-size:11.5px; font-weight:600; color:#64748b; font-family:'Plus Jakarta Sans',sans-serif; cursor:pointer; transition:.15s; }
  .mp-tab-btn:hover { border-color:#c7d2fe; color:#4f46e5; background:#f8fafc; }
  .mp-tab-btn.on      { background:#eef2ff; border-color:#c7d2fe; color:#4f46e5; }
  .mp-tab-btn.on-pend { background:#fffbeb; border-color:#fde68a; color:#d97706; }
  .mp-tab-btn.on-rest { background:#fef2f2; border-color:#fca5a5; color:#dc2626; }

  table { width:100%; border-collapse:collapse; }
  thead th { padding:9px 14px; text-align:left; font-size:9.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#94a3b8; background:#f8fafc; border-bottom:1.5px solid #e2e8f0; font-family:'JetBrains Mono',monospace; }
  tbody tr { border-bottom:1px solid #f1f5f9; cursor:pointer; transition:background .12s; }
  tbody tr:hover    { background:#f8fafc; }
  tbody tr.sel-row  { background:#eef2ff !important; }
  tbody tr:last-child { border-bottom:none; }
  tbody td { padding:12px 14px; font-size:13px; vertical-align:middle; }
  .t-biz { font-weight:700; color:#0f172a; font-size:13.5px; line-height:1.2; }
  .t-id  { font-family:'JetBrains Mono',monospace; font-size:9px; color:#94a3b8; margin-top:1px; }
  .t-dim { color:#64748b; font-size:12px; }
  .t-pkg-chip { font-size:9.5px; font-weight:700; padding:2px 8px; border-radius:20px; font-family:'JetBrains Mono',monospace; letter-spacing:.06em; text-transform:uppercase; border:1px solid; }
  .qbtn { padding:4px 10px; border-radius:7px; font-size:10.5px; font-weight:700; font-family:'Plus Jakarta Sans',sans-serif; cursor:pointer; transition:.12s; border:1.5px solid; }
  .qbtn-app { background:#f0fdf4; color:#059669; border-color:#bbf7d0; } .qbtn-app:hover { background:#059669; color:#fff; }
  .qbtn-res { background:#fef2f2; color:#dc2626; border-color:#fca5a5; } .qbtn-res:hover { background:#dc2626; color:#fff; }
  .qbtn-unr { background:#f0fdf4; color:#059669; border-color:#bbf7d0; } .qbtn-unr:hover { background:#059669; color:#fff; }
  .qbtn-del { background:#fff; color:#94a3b8; border-color:#e2e8f0; } .qbtn-del:hover { background:#fef2f2; color:#dc2626; border-color:#fca5a5; }
  .qbtns { display:flex; gap:5px; flex-wrap:wrap; }
  .mp-empty-tbl { padding:48px; text-align:center; color:#94a3b8; font-size:13px; }

  /* SPLIT */
  .mp-split { display:flex; gap:18px; }
  .mp-split-left  { flex:1; min-width:0; }
  .mp-split-right { width:420px; flex-shrink:0; }
  @media(max-width:1200px){ .mp-split-right{display:none;} }

  /* DETAIL PANEL */
  .mp-panel { background:#fff; border:1.5px solid #e2e8f0; border-radius:16px; overflow:hidden; animation:slideIn .2s ease; position:sticky; top:0; max-height:calc(100vh - 100px); overflow-y:auto; box-shadow:0 4px 20px rgba(0,0,0,.06); }
  .mp-panel::-webkit-scrollbar { width:3px; }
  .mp-panel::-webkit-scrollbar-thumb { background:#e2e8f0; }
  .mp-ph { padding:16px 18px 14px; border-bottom:1.5px solid #f1f5f9; position:sticky; top:0; background:#fff; z-index:5; }
  .mp-ph-name { font-family:'Syne',sans-serif; font-size:15px; font-weight:800; color:#0f172a; margin-bottom:6px; padding-right:28px; }
  .mp-ph-meta { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
  .mp-ph-close { position:absolute; top:13px; right:14px; width:26px; height:26px; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:7px; color:#64748b; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:.15s; }
  .mp-ph-close:hover { background:#fee2e2; color:#dc2626; border-color:#fca5a5; }
  .mp-pb { padding:14px 18px; }
  .mp-sec { margin-bottom:20px; }
  .mp-sec-hd { font-family:'JetBrains Mono',monospace; font-size:9px; font-weight:600; letter-spacing:.16em; text-transform:uppercase; color:#94a3b8; padding-bottom:7px; margin-bottom:10px; border-bottom:1.5px solid #f1f5f9; display:flex; align-items:center; gap:6px; }
  .mp-sec-hd::before { content:''; width:3px; height:10px; background:#4f46e5; border-radius:2px; }
  .mp-sec-badge { margin-left:auto; background:#f1f5f9; color:#64748b; padding:2px 8px; border-radius:20px; font-size:9px; border:1px solid #e2e8f0; }
  .mp-ig { display:grid; grid-template-columns:1fr 1fr; gap:7px; }
  .mp-if { background:#f8fafc; border:1.5px solid #f1f5f9; border-radius:9px; padding:9px 12px; }
  .mp-ik { font-family:'JetBrains Mono',monospace; font-size:8.5px; font-weight:600; letter-spacing:.09em; text-transform:uppercase; color:#94a3b8; margin-bottom:3px; }
  .mp-iv { font-size:12.5px; color:#0f172a; font-weight:500; word-break:break-all; }
  .mp-iv.mono { font-family:'JetBrains Mono',monospace; font-size:11px; color:#4f46e5; }

  /* PAYMENT ENTRIES */
  .mp-pay-entry { background:#f8fafc; border:1.5px solid #f1f5f9; border-radius:10px; margin-bottom:6px; overflow:hidden; cursor:pointer; transition:border-color .15s; }
  .mp-pay-entry:hover { border-color:#c7d2fe; }
  .mp-pay-entry-top { display:flex; align-items:center; gap:8px; padding:9px 12px; }
  .mp-pay-cat  { font-size:9px; font-weight:700; padding:2px 8px; border-radius:20px; border:1px solid; font-family:'JetBrains Mono',monospace; letter-spacing:.06em; text-transform:uppercase; flex-shrink:0; }
  .mp-pay-amt  { font-weight:700; color:#0f172a; font-size:13px; flex:1; font-family:'JetBrains Mono',monospace; }
  .mp-pay-date { font-size:10.5px; color:#94a3b8; font-family:'JetBrains Mono',monospace; white-space:nowrap; }
  .mp-pay-detail { padding:8px 12px 10px; background:#fff; border-top:1px solid #f1f5f9; display:grid; grid-template-columns:1fr 1fr; gap:5px; }
  .mp-pay-detail-row { font-size:11px; color:#64748b; }
  .mp-pay-detail-row span { font-weight:600; color:#0f172a; }
  .mp-empty-pay { padding:20px; text-align:center; color:#94a3b8; font-size:12.5px; background:#f8fafc; border-radius:10px; border:1.5px dashed #e2e8f0; }
  .mp-rec-pay-btn { width:100%; padding:9px 14px; border-radius:9px; border:1.5px dashed #c7d2fe; background:#f5f3ff; color:#4f46e5; font-size:12px; font-weight:700; cursor:pointer; transition:.15s; font-family:'Plus Jakarta Sans',sans-serif; display:flex; align-items:center; justify-content:center; gap:6px; margin-top:8px; }
  .mp-rec-pay-btn:hover { background:#eef2ff; border-color:#818cf8; }

  /* DOCUMENTS GRID */
  .mp-doc-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
  .mp-doc-card { background:#f8fafc; border:1.5px solid #f1f5f9; border-radius:9px; padding:10px; text-align:center; text-decoration:none; transition:.15s; display:block; }
  .mp-doc-card:hover { border-color:#c7d2fe; background:#eef2ff; }
  .mp-doc-thumb { width:100%; height:50px; object-fit:cover; border-radius:6px; margin-bottom:5px; }
  .mp-doc-name { font-size:10px; color:#64748b; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .mp-logo-img { width:56px; height:56px; border-radius:10px; object-fit:cover; border:2px solid #e2e8f0; margin-bottom:12px; }

  /* RECORD PAYMENT FORM */
  .mp-pay-form { background:#f8fafc; border:1.5px solid #c7d2fe; border-radius:12px; padding:14px; margin-top:8px; animation:fadeUp .18s ease; }
  .mp-pay-form-title { font-size:11px; font-weight:700; color:#4f46e5; letter-spacing:.08em; text-transform:uppercase; margin-bottom:12px; font-family:'JetBrains Mono',monospace; }
  .mp-pay-field { margin-bottom:10px; }
  .mp-pay-label { font-size:10px; font-weight:700; color:#64748b; letter-spacing:.07em; text-transform:uppercase; margin-bottom:4px; display:block; font-family:'JetBrains Mono',monospace; }
  .mp-pay-inp { width:100%; padding:8px 11px; background:#fff; border:1.5px solid #e2e8f0; border-radius:8px; font-size:13px; color:#0f172a; font-family:'Plus Jakarta Sans',sans-serif; outline:none; transition:.15s; }
  .mp-pay-inp:focus { border-color:#a5b4fc; box-shadow:0 0 0 3px rgba(99,102,241,.08); }
  .mp-pay-inp.mono { font-family:'JetBrains Mono',monospace; font-size:12.5px; }
  .mp-pay-select { width:100%; padding:8px 11px; background:#fff; border:1.5px solid #e2e8f0; border-radius:8px; font-size:13px; color:#0f172a; font-family:'Plus Jakarta Sans',sans-serif; outline:none; cursor:pointer; }
  .mp-pay-row { display:flex; gap:8px; margin-top:10px; }

  /* PANEL ACTIONS */
  .mp-pact { padding:12px 16px; border-top:1.5px solid #f1f5f9; display:flex; gap:7px; flex-wrap:wrap; }
  .mp-pa { flex:1; min-width:110px; padding:9px 12px; border-radius:9px; font-size:12px; font-weight:700; font-family:'Plus Jakarta Sans',sans-serif; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:5px; transition:.15s; border:1.5px solid; }
  .mp-pa-app { background:#f0fdf4; color:#059669; border-color:#bbf7d0; } .mp-pa-app:hover { background:#059669; color:#fff; }
  .mp-pa-res { background:#fef2f2; color:#dc2626; border-color:#fca5a5; } .mp-pa-res:hover { background:#dc2626; color:#fff; }
  .mp-pa-unr { background:#f0fdf4; color:#059669; border-color:#bbf7d0; } .mp-pa-unr:hover { background:#059669; color:#fff; }
  .mp-pa-del { background:#fff; color:#94a3b8; border-color:#e2e8f0; flex:0; padding:9px 12px; } .mp-pa-del:hover { background:#fef2f2; color:#dc2626; border-color:#fca5a5; }
  .mp-pa:disabled { opacity:.5; cursor:not-allowed; }

  /* WIZARD */
  .mp-wiz { max-width:720px; }
  .mp-wiz-steps { display:flex; align-items:flex-start; margin-bottom:28px; }
  .mp-wiz-step-col { display:flex; flex-direction:column; align-items:center; }
  .mp-wiz-circle { width:30px; height:30px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; border:2px solid #e2e8f0; color:#94a3b8; background:#fff; transition:.2s; }
  .mp-wiz-circle.done   { border-color:#4f46e5; background:#4f46e5; color:#fff; }
  .mp-wiz-circle.active { border-color:#4f46e5; color:#4f46e5; background:#eef2ff; }
  .mp-wiz-line { flex:1; height:2px; background:#f1f5f9; margin:13px 5px 0; transition:.2s; }
  .mp-wiz-line.done { background:#4f46e5; }
  .mp-wiz-step-lbl { font-size:9px; font-weight:700; color:#94a3b8; letter-spacing:.05em; text-transform:uppercase; margin-top:4px; white-space:nowrap; }
  .mp-wiz-step-lbl.active,.mp-wiz-step-lbl.done { color:#4f46e5; }
  .mp-wiz-card { background:#fff; border:1.5px solid #e2e8f0; border-radius:16px; padding:26px; box-shadow:0 2px 8px rgba(0,0,0,.04); }
  .mp-wiz-title { font-family:'Syne',sans-serif; font-size:18px; font-weight:800; color:#0f172a; margin-bottom:4px; }
  .mp-wiz-sub   { font-size:12.5px; color:#64748b; margin-bottom:22px; }
  .mp-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .mp-grid1 { display:flex; flex-direction:column; gap:14px; }
  .mp-field { display:flex; flex-direction:column; gap:5px; }
  .mp-label { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; color:#64748b; }
  .mp-inp { padding:10px 13px; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:10px; font-size:13.5px; color:#0f172a; font-family:'Plus Jakarta Sans',sans-serif; outline:none; transition:.15s; }
  .mp-inp::placeholder { color:#c4c4c4; }
  .mp-inp:focus { border-color:#a5b4fc; background:#fff; box-shadow:0 0 0 3px rgba(99,102,241,.08); }
  .mp-inp.mono { font-family:'JetBrains Mono',monospace; font-size:12.5px; }
  .mp-inp:disabled { opacity:.5; cursor:not-allowed; }
  .mp-select { padding:10px 13px; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:10px; font-size:13.5px; color:#0f172a; font-family:'Plus Jakarta Sans',sans-serif; outline:none; transition:.15s; cursor:pointer; width:100%; }
  .mp-select:focus { border-color:#a5b4fc; }

  /* PACKAGE CARDS */
  .pkg-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
  @media(max-width:960px){ .pkg-cards{grid-template-columns:1fr;} }
  .pkg-card { border:2px solid #e2e8f0; border-radius:14px; padding:18px; cursor:pointer; background:#fff; transition:.2s; position:relative; overflow:hidden; }
  .pkg-card:hover    { border-color:#a5b4fc; box-shadow:0 4px 16px rgba(0,0,0,.06); }
  .pkg-card.selected { border-color:var(--pkg-color); background:#fafbff; box-shadow:0 4px 16px rgba(99,102,241,.12); }
  .pkg-card-accent { position:absolute; top:0; left:0; right:0; height:3px; background:var(--pkg-gradient); }
  .pkg-card-tier  { font-size:9px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; font-family:'JetBrains Mono',monospace; margin-bottom:4px; color:var(--pkg-color); }
  .pkg-card-name  { font-family:'Syne',sans-serif; font-size:20px; font-weight:800; color:#0f172a; margin-bottom:2px; }
  .pkg-card-price { font-family:'JetBrains Mono',monospace; font-size:20px; font-weight:700; color:#0f172a; margin-bottom:12px; }
  .pkg-card-price span { font-size:12px; color:#94a3b8; }
  .pkg-feat { font-size:11.5px; color:#64748b; display:flex; align-items:flex-start; gap:6px; margin-bottom:5px; line-height:1.4; }
  .pkg-feat-tick { color:var(--pkg-color); flex-shrink:0; margin-top:1px; }
  .pkg-feat-x    { color:#d1d5db; flex-shrink:0; margin-top:1px; }
  .pkg-monthly { font-size:11px; color:#94a3b8; margin-top:10px; border-top:1px solid #f1f5f9; padding-top:10px; }
  .pkg-check { position:absolute; top:14px; right:14px; width:22px; height:22px; border-radius:50%; background:var(--pkg-color); display:flex; align-items:center; justify-content:center; opacity:0; transition:.2s; }
  .pkg-card.selected .pkg-check { opacity:1; }
  .pkg-extra { font-size:10.5px; color:#64748b; margin-bottom:4px; display:flex; align-items:flex-start; gap:5px; }

  /* PAYMENT PLAN */
  .pay-type-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:18px; }
  .pay-type-card { border:2px solid #e2e8f0; border-radius:12px; padding:16px; cursor:pointer; background:#fff; transition:.2s; }
  .pay-type-card:hover    { border-color:#a5b4fc; }
  .pay-type-card.selected { border-color:#4f46e5; background:#f5f3ff; }
  .pay-type-title { font-family:'Syne',sans-serif; font-size:15px; font-weight:800; color:#0f172a; margin-bottom:3px; }
  .pay-type-desc  { font-size:11.5px; color:#64748b; line-height:1.5; }
  .inst-preview { background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:10px; padding:14px; }
  .inst-preview-row { display:flex; justify-content:space-between; align-items:center; padding:5px 0; border-bottom:1px solid #f1f5f9; font-size:12.5px; color:#64748b; }
  .inst-preview-row:last-child { border-bottom:none; }
  .inst-preview-row.total { font-weight:700; color:#0f172a; padding-top:8px; }

  /* WIZARD NAV */
  .mp-wiz-nav { display:flex; gap:10px; margin-top:22px; }
  .mp-btn-back { padding:10px 18px; border-radius:10px; border:1.5px solid #e2e8f0; background:#fff; color:#64748b; font-size:13px; font-weight:700; font-family:'Plus Jakarta Sans',sans-serif; cursor:pointer; display:flex; align-items:center; gap:6px; transition:.15s; }
  .mp-btn-back:hover { border-color:#c7d2fe; color:#4f46e5; background:#f5f3ff; }
  .mp-btn-next { flex:1; padding:11px; border-radius:10px; border:none; background:#4f46e5; color:#fff; font-size:13.5px; font-weight:800; font-family:'Plus Jakarta Sans',sans-serif; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:.15s; letter-spacing:.02em; box-shadow:0 4px 12px rgba(79,70,229,.25); }
  .mp-btn-next:hover { background:#4338ca; }
  .mp-btn-next:disabled { background:#e2e8f0; color:#94a3b8; cursor:not-allowed; box-shadow:none; }

  /* MISC */
  .mp-pwd-bars { display:flex; gap:3px; margin-top:5px; }
  .mp-pwd-bar  { flex:1; height:3px; border-radius:2px; background:#f1f5f9; transition:.2s; }
  .mp-cnic-dots { display:flex; gap:3px; margin-top:4px; padding-left:2px; }
  .mp-cnic-dot  { width:5px; height:5px; border-radius:50%; background:#e2e8f0; transition:.15s; }
  .mp-cnic-dot.on { background:#4f46e5; }
  .mp-doc-area  { border:2px dashed #e2e8f0; border-radius:10px; padding:16px; text-align:center; cursor:pointer; transition:.2s; background:#f8fafc; position:relative; }
  .mp-doc-area:hover { border-color:#a5b4fc; background:#f5f3ff; }
  .mp-doc-area input { position:absolute; inset:0; opacity:0; cursor:pointer; width:100%; }
  .mp-doc-list { display:flex; flex-direction:column; gap:6px; margin-top:10px; }
  .mp-doc-item { display:flex; align-items:center; gap:8px; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:7px 11px; font-size:12.5px; color:#374151; }
  .mp-doc-rm   { margin-left:auto; background:none; border:none; color:#94a3b8; cursor:pointer; padding:2px; font-size:14px; transition:.15s; }
  .mp-doc-rm:hover { color:#ef4444; }

  /* TOAST */
  .mp-toast { position:fixed; bottom:24px; right:24px; z-index:9999; padding:12px 18px; border-radius:12px; font-size:13px; font-weight:600; background:#fff; border:1.5px solid #e2e8f0; color:#0f172a; box-shadow:0 8px 30px rgba(0,0,0,.12); animation:fadeUp .2s ease; display:flex; align-items:center; gap:8px; max-width:340px; }
  .mp-toast.ok  { border-color:#bbf7d0; background:#f0fdf4; color:#059669; }
  .mp-toast.err { border-color:#fca5a5; background:#fef2f2; color:#dc2626; }

  /* SUPPORT */
  .mp-req-card { background:#fff; border:1.5px solid #e2e8f0; border-radius:12px; padding:14px 16px; margin-bottom:10px; transition:.15s; box-shadow:0 1px 3px rgba(0,0,0,.04); }
  .mp-req-card:hover { border-color:#c7d2fe; }
  .mp-req-top  { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:8px; gap:8px; flex-wrap:wrap; }
  .mp-req-subject { font-size:13.5px; font-weight:700; color:#0f172a; }
  .mp-req-meta    { display:flex; align-items:center; gap:7px; flex-wrap:wrap; }
  .mp-req-body    { font-size:12.5px; color:#64748b; line-height:1.6; }
  .mp-req-mill    { font-size:11px; color:#94a3b8; font-family:'JetBrains Mono',monospace; margin-top:5px; }
  .mp-req-status  { font-size:9px; font-weight:700; padding:2px 8px; border-radius:20px; border:1px solid; font-family:'JetBrains Mono',monospace; letter-spacing:.08em; text-transform:uppercase; }
  .req-open     { background:#fffbeb; color:#d97706; border-color:#fde68a; }
  .req-review   { background:#eef2ff; color:#4f46e5; border-color:#c7d2fe; }
  .req-resolved { background:#f0fdf4; color:#059669; border-color:#bbf7d0; }

  .mp-spin { animation:spin .8s linear infinite; display:inline-block; }
  @media(max-width:1024px){ .mp-side{display:none;} }
`;

const Spinner = () => <span className="mp-spin">⟳</span>;
const Badge   = ({ status }) => (<span className={`badge badge-${status}`}><span className="badge-dot"/>{status}</span>);
const Toast   = ({ msg, ok }) => (
  <div className={`mp-toast ${ok?"ok":"err"}`}>
    {ok ? <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        : <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>}
    {msg}
  </div>
);

function DashboardSection({ stats, mills }) {
  const recent = [...mills].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,5);
  return (
    <div>
      <div className="mp-pg-hd">Master Dashboard</div>
      <div className="mp-pg-sub">Overview of all mills on the Agro Plus platform</div>
      <div className="mp-stats">
        {[
          {lbl:"Total Mills",  num:stats.total||0,      grad:"linear-gradient(90deg,#6366f1,#8b5cf6)", c:"#6366f1"},
          {lbl:"Pending",      num:stats.pending||0,    grad:"linear-gradient(90deg,#f59e0b,#fbbf24)", c:"#d97706"},
          {lbl:"Active",       num:stats.approved||0,   grad:"linear-gradient(90deg,#059669,#22c55e)", c:"#059669"},
          {lbl:"Restricted",   num:stats.restricted||0, grad:"linear-gradient(90deg,#dc2626,#f87171)", c:"#dc2626"},
        ].map(s=>(
          <div key={s.lbl} className="mp-sc">
            <div className="mp-sc-accent" style={{background:s.grad}}/>
            <div className="mp-sc-lbl">{s.lbl}</div>
            <div className="mp-sc-num" style={{color:s.c}}>{s.num}</div>
          </div>
        ))}
      </div>
      <div className="mp-tbl-wrap">
        <div style={{padding:"14px 16px",borderBottom:"1.5px solid #f1f5f9",fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:"#0f172a"}}>
          Recent Registrations
        </div>
        {recent.length===0
          ? <div className="mp-empty-tbl">No mills registered yet.</div>
          : <table>
              <thead><tr><th>Mill</th><th>Owner</th><th>Package</th><th>Status</th><th>Registered</th></tr></thead>
              <tbody>
                {recent.map(m=>(
                  <tr key={m._id} style={{cursor:"default"}}>
                    <td><div className="t-biz">{m.businessName}</div><div className="t-id">{m.millId}</div></td>
                    <td style={{color:"#334155",fontSize:13}}>{m.ownerName}</td>
                    <td>{m.plan&&<span className="t-pkg-chip" style={{color:PACKAGES[m.plan]?.color||"#64748b",borderColor:(PACKAGES[m.plan]?.color||"#64748b")+"44",background:(PACKAGES[m.plan]?.color||"#64748b")+"12"}}>{PACKAGES[m.plan]?.tier||m.plan}</span>}</td>
                    <td><Badge status={m.approvalStatus}/></td>
                    <td className="t-dim">{fmtDate(m.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        }
      </div>
    </div>
  );
}

const WIZARD_STEPS = ["Business Info","Security","Documents","Package","Payment Plan"];

function RegisterMill({ onCreated, showToast }) {
  const [step,setStep]=useState(1);const [busy,setBusy]=useState(false);
  const [biz,setBiz]=useState({businessName:"",ownerName:"",email:"",phone:"",ntnNumber:""});
  const [logo,setLogo]=useState(null);const [logoPreview,setLogoPreview]=useState("");
  const [sec,setSec]=useState({cnic:"",password:"",confirmPwd:""});
  const [showPwd,setShowPwd]=useState(false);
  const [docs,setDocs]=useState([]);const [pkg,setPkg]=useState("");
  const [payType,setPayType]=useState("full");const [tenure,setTenure]=useState(3);
  const score=pwdScore(sec.password);const cnicDigs=sec.cnic.replace(/\D/g,"").length;
  const pkgInfo=PACKAGES[pkg];
  const installmentAmt=pkgInfo?Math.round(pkgInfo.price/tenure):0;
  const handleCnicChange=e=>{const raw=e.target.value.replace(/\D/g,"").slice(0,13);setSec(p=>({...p,cnic:fmtCnic(raw)}));};
  const addDocs=files=>setDocs(p=>[...p,...Array.from(files).map(f=>({file:f,name:f.name}))]);
  const validate=()=>{
    if(step===1){if(!biz.businessName.trim())return"Business name required";if(!biz.ownerName.trim())return"Owner name required";if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(biz.email))return"Valid email required";return null;}
    if(step===2){if(cnicDigs!==13)return"CNIC must be 13 digits";if(sec.password.length<8)return"Password must be at least 8 characters";if(sec.password!==sec.confirmPwd)return"Passwords don't match";return null;}
    if(step===4){if(!pkg)return"Please select a package";return null;}
    return null;
  };
  const next=()=>{const err=validate();if(err){showToast(err,false);return;}setStep(s=>s+1);};
  const submit=async()=>{
    if(!pkg){showToast("Please select a package",false);return;}
    setBusy(true);
    try{
      const fd=new FormData();
      Object.entries(biz).forEach(([k,v])=>fd.append(k,v));
      fd.append("cnic",sec.cnic.replace(/\D/g,""));fd.append("password",sec.password);
      fd.append("plan",pkg);fd.append("paymentType",payType);
      fd.append("installmentTenure",payType==="installment"?tenure:0);
      if(logo)fd.append("logo",logo);
      docs.forEach((d,i)=>fd.append(`doc_${i}`,d.file));
      const r=await fetch(`${API_BASE_URL}/master/mills`,{method:"POST",headers:{Authorization:`Bearer ${getToken()}`},body:fd});
      const data=await r.json();
      if(!r.ok)throw new Error(data.message);
      showToast(`${biz.businessName} created! Welcome email sent. 🎉`,true);
      onCreated&&onCreated();
      setStep(1);setBiz({businessName:"",ownerName:"",email:"",phone:"",ntnNumber:""});
      setSec({cnic:"",password:"",confirmPwd:""});setDocs([]);setPkg("");setPayType("full");setTenure(3);setLogo(null);setLogoPreview("");
    }catch(e){showToast(e.message,false);}
    setBusy(false);
  };

  return (
    <div className="mp-wiz">
      <div className="mp-pg-hd">Register New Mill</div>
      <div className="mp-pg-sub">Manually onboard a new rice mill — credentials will be emailed to the owner</div>
      <div className="mp-wiz-steps">
        {WIZARD_STEPS.map((lbl,i)=>{const n=i+1;const cls=step>n?"done":step===n?"active":"";return(
          <React.Fragment key={i}>
            <div className="mp-wiz-step-col">
              <div className={`mp-wiz-circle ${cls}`}>{cls==="done"?<svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>:n}</div>
              <div className={`mp-wiz-step-lbl ${cls}`}>{lbl}</div>
            </div>
            {i<WIZARD_STEPS.length-1&&<div className={`mp-wiz-line${step>n?" done":""}`}/>}
          </React.Fragment>
        );})}
      </div>

      {step===1&&(<div className="mp-wiz-card">
        <div className="mp-wiz-title">Business Information</div>
        <div className="mp-wiz-sub">Basic details about the mill and its owner</div>
        <div className="mp-grid2">
          {[{label:"Business Name *",key:"businessName",ph:"Al Rehman Rice Mill"},{label:"Owner Name *",key:"ownerName",ph:"Muhammad Zain"},{label:"Email Address *",key:"email",ph:"owner@mill.com",type:"email"},{label:"Phone (+92…)",key:"phone",ph:"+923001234567"},{label:"NTN Number",key:"ntnNumber",ph:"1234567-8 (optional)"}].map(f=>(
            <div key={f.key} className="mp-field">
              <label className="mp-label">{f.label}</label>
              <input className="mp-inp" type={f.type||"text"} placeholder={f.ph} value={biz[f.key]} onChange={e=>setBiz(p=>({...p,[f.key]:e.target.value}))}/>
            </div>
          ))}
          <div className="mp-field">
            <label className="mp-label">Mill Logo (optional)</label>
            <div className="mp-doc-area" style={{minHeight:70}}>
              <input type="file" accept="image/*" onChange={e=>{const f=e.target.files[0];if(f){setLogo(f);setLogoPreview(URL.createObjectURL(f));}}}/>
              {logoPreview?<div style={{display:"flex",alignItems:"center",gap:10}}><img src={logoPreview} style={{width:36,height:36,objectFit:"cover",borderRadius:8,border:"1.5px solid #e2e8f0"}}/><span style={{fontSize:12,color:"#4f46e5"}}>{logo?.name}</span></div>
              :<div style={{fontSize:12,color:"#94a3b8"}}>Click to upload logo</div>}
            </div>
          </div>
        </div>
        <div className="mp-wiz-nav"><button className="mp-btn-next" onClick={next}>Next: Security →</button></div>
      </div>)}

      {step===2&&(<div className="mp-wiz-card">
        <div className="mp-wiz-title">Owner Security</div>
        <div className="mp-wiz-sub">Set the CNIC (login key) and password for the mill admin</div>
        <div className="mp-grid1">
          <div className="mp-field">
            <label className="mp-label">CNIC *</label>
            <input className="mp-inp mono" type="text" inputMode="numeric" placeholder="xxxxx-xxxxxxx-x" maxLength={15} value={sec.cnic} onChange={handleCnicChange}/>
            <div className="mp-cnic-dots">{Array.from({length:13},(_,i)=><div key={i} className={`mp-cnic-dot${i<cnicDigs?" on":""}`}/>)}</div>
          </div>
          <div className="mp-field">
            <label className="mp-label">Password *</label>
            <div style={{position:"relative"}}>
              <input className="mp-inp" type={showPwd?"text":"password"} placeholder="Minimum 8 characters" value={sec.password} onChange={e=>setSec(p=>({...p,password:e.target.value}))} style={{paddingRight:38}}/>
              <button type="button" onClick={()=>setShowPwd(s=>!s)} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:14}}>{showPwd?"🙈":"👁"}</button>
            </div>
            {sec.password.length>0&&(<>
              <div className="mp-pwd-bars">{[1,2,3,4].map(n=><div key={n} className="mp-pwd-bar" style={{background:score>=n?PWD_COLORS[score]:"#f1f5f9"}}/>)}</div>
              <div style={{fontSize:10.5,color:"#64748b",marginTop:3}}>{PWD_LABELS[score]} password</div>
            </>)}
          </div>
          <div className="mp-field">
            <label className="mp-label">Confirm Password *</label>
            <input className="mp-inp" type="password" placeholder="Repeat password" value={sec.confirmPwd} onChange={e=>setSec(p=>({...p,confirmPwd:e.target.value}))}/>
            {sec.confirmPwd.length>0&&sec.password!==sec.confirmPwd&&<div style={{fontSize:11,color:"#ef4444",marginTop:3}}>Passwords don't match</div>}
          </div>
        </div>
        <div className="mp-wiz-nav"><button className="mp-btn-back" onClick={()=>setStep(1)}>← Back</button><button className="mp-btn-next" onClick={next}>Next: Documents →</button></div>
      </div>)}

      {step===3&&(<div className="mp-wiz-card">
        <div className="mp-wiz-title">Supporting Documents</div>
        <div className="mp-wiz-sub">Upload CNIC copies, owner photo, business card, or any docs (optional)</div>
        <div className="mp-doc-area" style={{marginBottom:12}}>
          <input type="file" multiple accept="image/*,.pdf" onChange={e=>addDocs(e.target.files)}/>
          <div style={{fontSize:13,color:"#64748b"}}>Click or drag to upload documents</div>
          <div style={{fontSize:11,color:"#94a3b8",marginTop:3}}>CNIC copies, business card, owner photo, etc.</div>
        </div>
        {docs.length>0&&<div className="mp-doc-list">{docs.map((d,i)=><div key={i} className="mp-doc-item"><span style={{fontSize:16}}>📄</span><span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:12}}>{d.name}</span><button className="mp-doc-rm" onClick={()=>setDocs(p=>p.filter((_,j)=>j!==i))}>✕</button></div>)}</div>}
        <div className="mp-wiz-nav"><button className="mp-btn-back" onClick={()=>setStep(2)}>← Back</button><button className="mp-btn-next" onClick={next}>Next: Package →</button></div>
      </div>)}

      {step===4&&(<div className="mp-wiz-card">
        <div className="mp-wiz-title">Select Package</div>
        <div className="mp-wiz-sub">Choose the right plan for this mill's needs</div>
        <div className="pkg-cards">
          {Object.entries(PACKAGES).map(([key,p])=>(
            <div key={key} className={`pkg-card${pkg===key?" selected":""}`} style={{"--pkg-color":p.color,"--pkg-gradient":p.gradient}} onClick={()=>setPkg(key)}>
              <div className="pkg-card-accent"/>
              <div className="pkg-check"><svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg></div>
              <div className="pkg-card-tier">{p.tier}</div>
              <div className="pkg-card-name">{p.name}</div>
              <div className="pkg-card-price">PKR {p.price.toLocaleString()} <span>one-time</span></div>
              {p.features.map(f=><div key={f} className="pkg-feat"><span className="pkg-feat-tick">✓</span><span>{f}</span></div>)}
              {p.excludes.map(f=><div key={f} className="pkg-feat"><span className="pkg-feat-x">✗</span><span style={{color:"#94a3b8"}}>{f}</span></div>)}
              {p.extras.map(e=><div key={e} className="pkg-extra"><span>🎁</span><span>{e}</span></div>)}
              <div className="pkg-monthly">Monthly: <strong style={{color:"#0f172a"}}>PKR {p.monthly.toLocaleString()}</strong></div>
            </div>
          ))}
        </div>
        <div className="mp-wiz-nav"><button className="mp-btn-back" onClick={()=>setStep(3)}>← Back</button><button className="mp-btn-next" onClick={next} disabled={!pkg}>Next: Payment Plan →</button></div>
      </div>)}

      {step===5&&pkgInfo&&(<div className="mp-wiz-card">
        <div className="mp-wiz-title">Payment Plan</div>
        <div className="mp-wiz-sub">Choose how the client will pay for the package</div>
        <div className="pay-type-row">
          {[{key:"full",title:"Full Payment",desc:`Pay PKR ${pkgInfo.price.toLocaleString()} upfront.`},{key:"installment",title:"Installments",desc:"Split over 3, 6, or 12 months."}].map(t=>(
            <div key={t.key} className={`pay-type-card${payType===t.key?" selected":""}`} onClick={()=>setPayType(t.key)}>
              <div className="pay-type-title">{t.title}</div><div className="pay-type-desc">{t.desc}</div>
            </div>
          ))}
        </div>
        {payType==="installment"&&(<div className="mp-field" style={{marginBottom:16}}>
          <label className="mp-label">Tenure</label>
          <div style={{display:"flex",gap:8}}>
            {[3,6,12].map(t=><button key={t} type="button" onClick={()=>setTenure(t)} style={{flex:1,padding:"10px 6px",borderRadius:9,border:`1.5px solid ${tenure===t?"#4f46e5":"#e2e8f0"}`,background:tenure===t?"#eef2ff":"#fff",color:tenure===t?"#4f46e5":"#64748b",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:".15s"}}>{t} months</button>)}
          </div>
        </div>)}
        <div className="inst-preview">
          <div style={{fontSize:10,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"#94a3b8",marginBottom:10,fontFamily:"'JetBrains Mono',monospace"}}>Payment Summary</div>
          {payType==="full"?(<>
            <div className="inst-preview-row"><span>Package (Full)</span><span style={{fontFamily:"'JetBrains Mono',monospace",color:"#4f46e5",fontWeight:700}}>PKR {pkgInfo.price.toLocaleString()}</span></div>
            <div className="inst-preview-row"><span>First Monthly</span><span style={{fontFamily:"'JetBrains Mono',monospace"}}>PKR {pkgInfo.monthly.toLocaleString()}</span></div>
            <div className="inst-preview-row total"><span>First Payment Due</span><span style={{fontFamily:"'JetBrains Mono',monospace",color:"#d97706"}}>PKR {(pkgInfo.price+pkgInfo.monthly).toLocaleString()}</span></div>
          </>):(<>
            <div className="inst-preview-row"><span>Per Installment</span><span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700}}>PKR {installmentAmt.toLocaleString()}</span></div>
            <div className="inst-preview-row total"><span>Per Month (inst. + maintenance)</span><span style={{fontFamily:"'JetBrains Mono',monospace",color:"#d97706"}}>PKR {(installmentAmt+pkgInfo.monthly).toLocaleString()}</span></div>
          </>)}
        </div>
        <div style={{background:"#f0fdf4",border:"1.5px solid #bbf7d0",borderRadius:9,padding:"10px 14px",marginTop:14,fontSize:12,color:"#166534",lineHeight:1.6}}>
          📧 A welcome email with login credentials, package details, and bank transfer instructions will be sent to <strong>{biz.email}</strong>.
        </div>
        <div className="mp-wiz-nav">
          <button className="mp-btn-back" onClick={()=>setStep(4)}>← Back</button>
          <button className="mp-btn-next" onClick={submit} disabled={busy}>{busy?<><Spinner/> Creating…</>:"✓ Create Mill & Send Email"}</button>
        </div>
      </div>)}
    </div>
  );
}

// ── Payment Entry (clickable, expandable) ────────────────────────────────────
function PaymentEntry({ payment }) {
  const [open, setOpen] = useState(false);
  const s = PAY_CAT_STYLE[payment.category] || PAY_CAT_STYLE.other;
  return (
    <div className="mp-pay-entry" onClick={() => setOpen(o => !o)}>
      <div className="mp-pay-entry-top">
        <span className="mp-pay-cat" style={{background:s.bg,color:s.color,borderColor:s.border}}>{s.label}</span>
        <span className="mp-pay-amt">{fmtPKR(payment.amount)}</span>
        <span className="mp-pay-date">{fmtDate(payment.paidDate)}</span>
        <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={2.5} style={{flexShrink:0,transition:"transform .15s",transform:open?"rotate(180deg)":"none"}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
      {open && (
        <div className="mp-pay-detail">
          {payment.tid         && <div className="mp-pay-detail-row">TID: <span>{payment.tid}</span></div>}
          {payment.senderBank  && <div className="mp-pay-detail-row">From: <span>{payment.senderBank}</span></div>}
          {payment.receivingBank&&<div className="mp-pay-detail-row">To: <span>{payment.receivingBank}</span></div>}
          {payment.senderTitle && <div className="mp-pay-detail-row">Sender: <span>{payment.senderTitle}</span></div>}
          {payment.notes       && <div className="mp-pay-detail-row">Notes: <span>{payment.notes}</span></div>}
          <div className="mp-pay-detail-row">Recorded: <span>{fmtFull(payment.recordedAt)}</span></div>
        </div>
      )}
    </div>
  );
}

// ── Record Payment Form ───────────────────────────────────────────────────────
function RecordPaymentForm({ mill, onSaved, showToast, onClose }) {
  const [cat,      setCat]      = useState("monthly");
  const [tid,      setTid]      = useState("");
  const [amount,   setAmount]   = useState("");
  const [notes,    setNotes]    = useState("");
  const [senderBank,setSenderBank]=useState("");
  const [receivingBank,setReceivingBank]=useState("HBL");
  const [paidDate, setPaidDate] = useState(new Date().toISOString().split("T")[0]);
  const [busy,     setBusy]     = useState(false);

  const defaultAmts = { monthly:7500, full_package:mill.packagePrice||0, installment:0, other:0 };

  const submit = async () => {
    if (!tid.trim()) return showToast("TID is required", false);
    setBusy(true);
    try {
      const body = { paymentCategory:cat, tid, amount:Number(amount)||defaultAmts[cat]||0, notes, paidDate, senderBank, receivingBank };
      const r = await authFetch(`${API_BASE_URL}/master/mills/${mill.millId}/record-payment`, { method:"POST", body:JSON.stringify(body) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message);
      showToast("Payment recorded ✓", true);
      onSaved && onSaved(d.mill);
      onClose && onClose();
    } catch(e) { showToast(e.message, false); }
    setBusy(false);
  };

  return (
    <div className="mp-pay-form">
      <div className="mp-pay-form-title">+ Record a Payment</div>
      <div className="mp-pay-field">
        <label className="mp-pay-label">Payment Category</label>
        <select className="mp-pay-select" value={cat} onChange={e=>{setCat(e.target.value);setAmount(String(defaultAmts[e.target.value]||""));}}>
          <option value="monthly">Monthly Maintenance (PKR 7,500)</option>
          {mill.paymentType==="installment" && <option value="installment">Package Installment</option>}
          {mill.paymentType==="full"        && <option value="full_package">Package Full Payment</option>}
          <option value="other">Other</option>
        </select>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <div className="mp-pay-field">
          <label className="mp-pay-label">TID *</label>
          <input className="mp-pay-inp mono" placeholder="Transaction ID" value={tid} onChange={e=>setTid(e.target.value)}/>
        </div>
        <div className="mp-pay-field">
          <label className="mp-pay-label">Amount (PKR)</label>
          <input className="mp-pay-inp mono" type="number" placeholder={String(defaultAmts[cat]||"")} value={amount} onChange={e=>setAmount(e.target.value)}/>
        </div>
        <div className="mp-pay-field">
          <label className="mp-pay-label">Sender Bank</label>
          <input className="mp-pay-inp" placeholder="e.g. UBL" value={senderBank} onChange={e=>setSenderBank(e.target.value)}/>
        </div>
        <div className="mp-pay-field">
          <label className="mp-pay-label">Received Into</label>
          <select className="mp-pay-select" value={receivingBank} onChange={e=>setReceivingBank(e.target.value)}>
            <option value="HBL">HBL — ALI RAZA SALEEM</option>
            <option value="UBL">UBL — MUHAMMAD ZAIN ALI</option>
          </select>
        </div>
      </div>
      <div className="mp-pay-field">
        <label className="mp-pay-label">Date Paid</label>
        <input className="mp-pay-inp" type="date" value={paidDate} onChange={e=>setPaidDate(e.target.value)}/>
      </div>
      <div className="mp-pay-field">
        <label className="mp-pay-label">Notes</label>
        <input className="mp-pay-inp" placeholder="Optional remarks…" value={notes} onChange={e=>setNotes(e.target.value)}/>
      </div>
      <div className="mp-pay-row">
        <button className="mp-btn-back" style={{flex:1,padding:"9px 12px",fontSize:12.5}} onClick={onClose}>Cancel</button>
        <button className="mp-btn-next" style={{flex:2,padding:"9px 12px",fontSize:12.5}} onClick={submit} disabled={busy}>
          {busy?<><Spinner/> Recording…</>:"✓ Record Payment"}
        </button>
      </div>
    </div>
  );
}

// ── Mill Detail Panel ─────────────────────────────────────────────────────────
function MillPanel({ mill:initMill, acting, onAction, onClose, onSaveBilling, showToast }) {
  const [mill,        setMill]        = useState(initMill);
  const [billing,     setBilling]     = useState(initMill.billingDate?new Date(initMill.billingDate).toISOString().split("T")[0]:"");
  const [showPayForm, setShowPayForm] = useState(false);

  useEffect(()=>{ setMill(initMill); setBilling(initMill.billingDate?new Date(initMill.billingDate).toISOString().split("T")[0]:""); },[initMill]);

  const pkgInfo  = PACKAGES[mill.plan] || {};
  const busyPanel= acting === mill.millId;
  const payments = [...(mill.payments||[])].sort((a,b)=>new Date(b.paidDate)-new Date(a.paidDate));
  const docs     = mill.documents || [];
  const logoSrc  = fileUrl(mill.logoUrl);

  return (
    <div className="mp-panel">
      <div className="mp-ph" style={{position:"relative"}}>
        <button className="mp-ph-close" onClick={onClose}>✕</button>
        {logoSrc && <img src={logoSrc} alt="logo" className="mp-logo-img" onError={e=>{e.target.style.display="none";}}/>}
        <div className="mp-ph-name">{mill.businessName}</div>
        <div className="mp-ph-meta">
          <Badge status={mill.approvalStatus}/>
          {mill.plan && <span className="t-pkg-chip" style={{color:pkgInfo.color||"#64748b",borderColor:(pkgInfo.color||"#64748b")+"44",background:(pkgInfo.color||"#64748b")+"12"}}>{pkgInfo.tier||mill.plan}</span>}
          <span style={{fontSize:10.5,color:"#94a3b8",fontFamily:"'JetBrains Mono',monospace"}}>{mill.isActive?"🟢 Live":"🔴 Inactive"}</span>
        </div>
      </div>

      <div className="mp-pb">

        {/* Owner & Mill Info */}
        <div className="mp-sec">
          <div className="mp-sec-hd">Owner & Mill Information</div>
          <div className="mp-ig">
            {[
              {k:"Owner",      v:mill.ownerName,          mono:false},
              {k:"Email",      v:mill.email,              mono:false},
              {k:"Phone",      v:mill.phone||"—",         mono:false},
              {k:"CNIC",       v:mill.adminCnic||"—",     mono:true},
              {k:"NTN",        v:mill.ntnNumber||"—",     mono:true},
              {k:"Mill ID",    v:mill.millId,             mono:true},
              {k:"Package",    v:pkgInfo.name||mill.plan||"—", mono:false},
              {k:"Registered", v:fmtDate(mill.createdAt), mono:false},
              {k:"Payment Type",v:mill.paymentType==="full"?"Full Payment":"Installments", mono:false},
              {k:"Billing Date",v:fmtDate(mill.billingDate), mono:false},
            ].map(f=>(
              <div key={f.k} className="mp-if">
                <div className="mp-ik">{f.k}</div>
                <div className={`mp-iv${f.mono?" mono":""}`}>{f.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        {(docs.length>0||logoSrc) && (
          <div className="mp-sec">
            <div className="mp-sec-hd">Documents<span className="mp-sec-badge">{docs.length}</span></div>
            {docs.length===0
              ? <div style={{fontSize:12,color:"#94a3b8",textAlign:"center",padding:"12px 0"}}>No documents uploaded</div>
              : <div className="mp-doc-grid">
                  {docs.map((doc,i)=>{
                    const u = fileUrl(doc.fileUrl);
                    const isImg = /\.(png|jpg|jpeg|webp|gif)$/i.test(doc.fileUrl||"");
                    return (
                      <a key={i} href={u||"#"} target="_blank" rel="noreferrer" className="mp-doc-card">
                        {isImg&&u ? <img src={u} alt={doc.name} className="mp-doc-thumb" onError={e=>{e.target.style.display="none";}}/>
                          : <div style={{width:"100%",height:50,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:5}}>📄</div>}
                        <div className="mp-doc-name">{doc.name||`Document ${i+1}`}</div>
                      </a>
                    );
                  })}
                </div>
            }
          </div>
        )}

        {/* Payment History */}
        <div className="mp-sec">
          <div className="mp-sec-hd">Payment History<span className="mp-sec-badge">{payments.length} entries</span></div>
          {payments.length===0
            ? <div className="mp-empty-pay">No payments recorded yet</div>
            : payments.map((p,i)=><PaymentEntry key={i} payment={p}/>)
          }
          {!showPayForm
            ? <button className="mp-rec-pay-btn" onClick={()=>setShowPayForm(true)}>+ Record Payment</button>
            : <RecordPaymentForm mill={mill} showToast={showToast} onSaved={updated=>{setMill(m=>({...m,...updated}));}} onClose={()=>setShowPayForm(false)}/>
          }
        </div>

        {/* Billing Date */}
        <div className="mp-sec">
          <div className="mp-sec-hd">Update Billing Date</div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <input type="date" value={billing} onChange={e=>setBilling(e.target.value)}
              style={{flex:1,padding:"8px 11px",background:"#f8fafc",border:"1.5px solid #e2e8f0",borderRadius:8,fontSize:13,color:"#0f172a",outline:"none"}}/>
            <button onClick={()=>onSaveBilling(mill.millId,billing)}
              style={{padding:"8px 16px",background:"#4f46e5",border:"none",borderRadius:8,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer"}}>Update</button>
          </div>
        </div>
      </div>

      <div className="mp-pact">
        {mill.approvalStatus==="pending"    && <button className="mp-pa mp-pa-app" disabled={busyPanel} onClick={()=>onAction(mill.millId,"approve")}><svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>{busyPanel?"…":"Approve & Activate"}</button>}
        {mill.approvalStatus==="approved"   && <button className="mp-pa mp-pa-res" disabled={busyPanel} onClick={()=>onAction(mill.millId,"restrict")}>🚫 {busyPanel?"…":"Restrict"}</button>}
        {mill.approvalStatus==="restricted" && <button className="mp-pa mp-pa-unr" disabled={busyPanel} onClick={()=>onAction(mill.millId,"unrestrict")}>✅ {busyPanel?"…":"Restore"}</button>}
        <button className="mp-pa mp-pa-del" onClick={()=>{ if(window.confirm(`Delete "${mill.businessName}" permanently?`))onAction(mill.millId,"delete"); }}>🗑</button>
      </div>
    </div>
  );
}

// ── View Mills ───────────────────────────────────────────────────────────────
function ViewMills({ mills, loading, filter, setFilter, search, setSearch, selected, setSelected, acting, onAction, onSaveBilling, showToast }) {
  const tabCls = f => {
    if(filter!==f) return "mp-tab-btn";
    if(f==="pending") return "mp-tab-btn on-pend";
    if(f==="restricted") return "mp-tab-btn on-rest";
    return "mp-tab-btn on";
  };
  const openPanel = async mill => {
    try {
      const r = await authFetch(`${API_BASE_URL}/master/mills/${mill.millId}`);
      const d = await r.json();
      if(r.ok) setSelected(d); else setSelected(mill);
    } catch { setSelected(mill); }
  };
  return (
    <div>
      <div className="mp-pg-hd">Mill Management</div>
      <div className="mp-pg-sub">View, approve, restrict, and manage all mills — click a row to see full details</div>
      <div className="mp-split">
        <div className="mp-split-left">
          <div className="mp-toolbar">
            <div className="mp-srch">
              <span className="mp-srch-ico"><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></span>
              <input placeholder="Search mills, owner, email…" value={search} onChange={e=>setSearch(e.target.value)}/>
            </div>
            {["all","pending","approved","restricted"].map(f=>(
              <button key={f} className={tabCls(f)} onClick={()=>setFilter(f)}>
                {f==="all"?"All":f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            ))}
          </div>
          <div className="mp-tbl-wrap">
            {loading
              ? <div className="mp-empty-tbl">Loading mills…</div>
              : mills.length===0
                ? <div className="mp-empty-tbl">No mills match your filter.</div>
                : <table>
                    <thead><tr><th>Business</th><th>Owner</th><th>Package</th><th>Status</th><th>Billing</th><th>Actions</th></tr></thead>
                    <tbody>
                      {mills.map((m,idx)=>(
                        <tr key={m._id} className={selected?.millId===m.millId?"sel-row":""} onClick={()=>openPanel(m)} style={{animationDelay:`${idx*20}ms`}}>
                          <td><div className="t-biz">{m.businessName}</div><div className="t-id">{m.millId}</div></td>
                          <td style={{color:"#334155",fontSize:13}}>{m.ownerName}</td>
                          <td>{m.plan&&<span className="t-pkg-chip" style={{color:PACKAGES[m.plan]?.color||"#64748b",borderColor:(PACKAGES[m.plan]?.color||"#64748b")+"44",background:(PACKAGES[m.plan]?.color||"#64748b")+"12"}}>{PACKAGES[m.plan]?.tier||m.plan}</span>}</td>
                          <td><Badge status={m.approvalStatus}/></td>
                          <td className="t-dim">{fmtDate(m.billingDate)}</td>
                          <td onClick={e=>e.stopPropagation()}>
                            <div className="qbtns">
                              {m.approvalStatus==="pending"    && <button className="qbtn qbtn-app" disabled={acting===m.millId} onClick={()=>onAction(m.millId,"approve")}>{acting===m.millId?"…":"Approve"}</button>}
                              {m.approvalStatus==="approved"   && <button className="qbtn qbtn-res" disabled={acting===m.millId} onClick={()=>onAction(m.millId,"restrict")}>Restrict</button>}
                              {m.approvalStatus==="restricted" && <button className="qbtn qbtn-unr" disabled={acting===m.millId} onClick={()=>onAction(m.millId,"unrestrict")}>Restore</button>}
                              <button className="qbtn qbtn-del" disabled={acting===m.millId} onClick={()=>{ if(window.confirm(`Delete ${m.businessName}?`))onAction(m.millId,"delete"); }}>🗑</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
            }
          </div>
        </div>
        <div className="mp-split-right">
          {selected
            ? <MillPanel mill={selected} acting={acting} onAction={onAction} onClose={()=>setSelected(null)} onSaveBilling={onSaveBilling} showToast={showToast}/>
            : <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:300,color:"#94a3b8",fontSize:13,textAlign:"center",gap:10,background:"#fff",border:"1.5px solid #e2e8f0",borderRadius:16,boxShadow:"0 1px 3px rgba(0,0,0,.04)"}}>
                <svg width={40} height={40} fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                Click any mill row to view full details
              </div>
          }
        </div>
      </div>
    </div>
  );
}

// ── Support ───────────────────────────────────────────────────────────────────
function Support({ showToast }) {
  const [requests,setRequests]=useState([]);const [stats,setStats]=useState({});
  const [type,setType]=useState("all");const [loading,setLoading]=useState(true);const [updating,setUpdating]=useState("");
  const load=useCallback(async()=>{
    setLoading(true);const p=new URLSearchParams();if(type!=="all")p.set("type",type);
    const r=await authFetch(`${API_BASE_URL}/master/support?${p}`);const d=await r.json();
    if(r.ok){setRequests(d.requests||[]);setStats(d.stats||{});}setLoading(false);
  },[type]);
  useEffect(()=>{load();},[load]);
  const updateStatus=async(id,status)=>{
    setUpdating(id);
    const r=await authFetch(`${API_BASE_URL}/master/support/${id}`,{method:"PUT",body:JSON.stringify({status})});
    const d=await r.json();
    if(r.ok){showToast("Updated",true);load();}else showToast(d.message,false);
    setUpdating("");
  };
  const typeIcon={complaint:"🚨",feedback:"💬",deletion_request:"🗑"};
  const statusCls={open:"req-open",in_review:"req-review",resolved:"req-resolved"};
  return (
    <div>
      <div className="mp-pg-hd">Support Inbox</div>
      <div className="mp-pg-sub">Complaints, feedback, and deletion requests from mill admins</div>
      <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap"}}>
        {[{label:"Complaints",count:stats.complaints||0,color:"#dc2626"},{label:"Feedback",count:stats.feedback||0,color:"#4f46e5"},{label:"Deletions",count:stats.deletions||0,color:"#d97706"},{label:"Open",count:stats.open||0,color:"#059669"}].map(s=>(
          <div key={s.label} style={{background:"#fff",border:"1.5px solid #e2e8f0",borderRadius:12,padding:"10px 18px",minWidth:110,boxShadow:"0 1px 3px rgba(0,0,0,.04)"}}>
            <div style={{fontSize:9.5,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#94a3b8",fontFamily:"'JetBrains Mono',monospace",marginBottom:4}}>{s.label}</div>
            <div style={{fontSize:22,fontWeight:800,fontFamily:"'Syne',sans-serif",color:s.color}}>{s.count}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:7,marginBottom:14,flexWrap:"wrap"}}>
        {["all","complaint","feedback","deletion_request"].map(t=>(
          <button key={t} className={`mp-tab-btn${type===t?" on":""}`} onClick={()=>setType(t)}>
            {t==="all"?"All":t==="deletion_request"?"Deletions":t.charAt(0).toUpperCase()+t.slice(1)+"s"}
          </button>
        ))}
        <button className="mp-tab-btn" onClick={load} style={{marginLeft:"auto"}}>⟳ Refresh</button>
      </div>
      {loading?<div className="mp-empty-tbl">Loading…</div>:requests.length===0?<div className="mp-empty-tbl">No requests found.</div>:requests.map(req=>(
        <div key={req._id} className="mp-req-card">
          <div className="mp-req-top">
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3,flexWrap:"wrap"}}>
                <span style={{fontSize:15}}>{typeIcon[req.type]||"📋"}</span>
                <span className="mp-req-subject">{req.subject}</span>
                <span className={`mp-req-status ${statusCls[req.status]||"req-open"}`}>{req.status?.replace("_"," ")}</span>
              </div>
              <div className="mp-req-mill">🏭 {req.businessName||req.millId} · {fmtFull(req.createdAt)}</div>
            </div>
            <div className="mp-req-meta">
              {req.status!=="resolved"&&(<>
                {req.status==="open"&&<button className="qbtn" style={{background:"#eef2ff",color:"#4f46e5",borderColor:"#c7d2fe",fontSize:10.5}} disabled={updating===req._id} onClick={()=>updateStatus(req._id,"in_review")}>Mark In Review</button>}
                <button className="qbtn qbtn-app" style={{fontSize:10.5}} disabled={updating===req._id} onClick={()=>updateStatus(req._id,"resolved")}>✓ Resolve</button>
              </>)}
            </div>
          </div>
          <div className="mp-req-body">{req.message}</div>
          {req.masterNotes&&<div style={{marginTop:6,fontSize:11.5,color:"#94a3b8",fontStyle:"italic"}}>Note: {req.masterNotes}</div>}
        </div>
      ))}
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function MasterPortal() {
  const navigate = useNavigate();
  const [section,  setSection]  = useState("dashboard");
  const [mills,    setMills]    = useState([]);
  const [stats,    setStats]    = useState({total:0,pending:0,approved:0,restricted:0});
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState("all");
  const [search,   setSearch]   = useState("");
  const [selected, setSelected] = useState(null);
  const [acting,   setActing]   = useState("");
  const [toast,    setToast]    = useState(null);
  const [supportStats,setSupportStats]=useState({open:0});
  const searchTimer=useRef(null);

  const showToast=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3500);};

  const fetchMills=useCallback(async(q=search,f=filter)=>{
    setLoading(true);
    try {
      const p=new URLSearchParams();if(f!=="all")p.set("status",f);if(q.trim())p.set("search",q.trim());
      const r=await authFetch(`${API_BASE_URL}/master/mills?${p}`);
      if(r.status===401||r.status===403){localStorage.clear();navigate("/");return;}
      const d=await r.json();setMills(d.mills||[]);setStats(d.stats||{});
    }catch{showToast("Failed to load mills",false);}
    setLoading(false);
  },[filter,navigate]);

  useEffect(()=>{fetchMills(search,filter);},[filter]);
  useEffect(()=>{clearTimeout(searchTimer.current);searchTimer.current=setTimeout(()=>fetchMills(search,filter),350);},[search]);
  useEffect(()=>{const iv=setInterval(()=>fetchMills(search,filter),30000);return()=>clearInterval(iv);},[filter,search]);
  useEffect(()=>{authFetch(`${API_BASE_URL}/master/support?status=open`).then(r=>r.json()).then(d=>setSupportStats({open:d.stats?.open||0})).catch(()=>{});},[]);

  const doAction=async(millId,action,body={})=>{
    setActing(millId);
    try {
      const method=action==="delete"?"DELETE":"POST";
      const url=action==="delete"?`${API_BASE_URL}/master/mills/${millId}`:`${API_BASE_URL}/master/mills/${millId}/${action}`;
      const r=await authFetch(url,{method,body:method==="POST"?JSON.stringify(body):undefined});
      const d=await r.json();
      showToast(d.message||"Done ✓",true);
      if(action==="delete")setSelected(null);
      else if(selected?.millId===millId){const r2=await authFetch(`${API_BASE_URL}/master/mills/${millId}`);if(r2.ok)setSelected(await r2.json());}
      fetchMills(search,filter);
    }catch{showToast("Action failed",false);}
    setActing("");
  };

  const saveBilling=(millId,date)=>{if(!date)return;doAction(millId,"billing-date",{billingDate:date});};
  const sendReminders=async()=>{try{const r=await authFetch(`${API_BASE_URL}/master/send-reminders`,{method:"POST"});const d=await r.json();showToast(d.message||"Reminders sent ✓");}catch{showToast("Failed",false);}};

  const NAV_ITEMS=[
    {id:"dashboard",icon:"📊",label:"Dashboard"},
    {id:"register", icon:"➕",label:"Register Mill"},
    {id:"mills",    icon:"🏭",label:"View Mills",    badge:stats.pending||0},
    {id:"support",  icon:"💬",label:"Support Inbox", badge:supportStats.open||0, badgeRed:true},
  ];

  return (
    <>
      <style>{FONTS}{CSS}</style>
      <div className="mp">
        <div className="mp-bar">
          <div className="mp-bar-logo">Agro<em>Plus</em></div>
          <div className="mp-bar-chip">Master Portal</div>
          <div className="mp-bar-space"/>
          <div className="mp-bar-org">ORCA TECH. AND VENTURES</div>
          <button className="mp-bar-out" onClick={()=>{localStorage.clear();navigate("/");}}>Logout</button>
        </div>
        <div className="mp-body">
          <aside className="mp-side">
            <div className="mp-side-lbl">Navigation</div>
            {NAV_ITEMS.map(item=>(
              <button key={item.id} className={`mp-nav${section===item.id?" on":""}`} onClick={()=>setSection(item.id)}>
                <span style={{fontSize:15}}>{item.icon}</span>
                <span style={{flex:1}}>{item.label}</span>
                {item.badge>0&&<span className={`mp-nav-badge${item.badgeRed?" red":""}`}>{item.badge}</span>}
              </button>
            ))}
            <div className="mp-side-lbl">Tools</div>
            <button className="mp-nav" onClick={sendReminders}><span style={{fontSize:15}}>🔔</span> Send Reminders</button>
            <button className="mp-nav" onClick={()=>fetchMills(search,filter)}><span style={{fontSize:15}}>⟳</span> Refresh Data</button>
            <div style={{marginTop:"auto",padding:"14px 8px 6px",borderTop:"1.5px solid #f1f5f9"}}>
              <div style={{fontSize:10,color:"#94a3b8",textAlign:"center",fontFamily:"'JetBrains Mono',monospace",lineHeight:1.6}}>
                ORCA TECH. AND VENTURES<br/><span style={{color:"#cbd5e1"}}>© {new Date().getFullYear()} Agro Plus</span>
              </div>
            </div>
          </aside>
          <main className="mp-main">
            {section==="dashboard"&&<DashboardSection stats={stats} mills={mills}/>}
            {section==="register"&&<RegisterMill showToast={showToast} onCreated={()=>{fetchMills();setSection("mills");}}/>}
            {section==="mills"&&<ViewMills mills={mills} loading={loading} filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} selected={selected} setSelected={setSelected} acting={acting} onAction={doAction} onSaveBilling={saveBilling} showToast={showToast}/>}
            {section==="support"&&<Support showToast={showToast}/>}
          </main>
        </div>
        {toast&&<Toast msg={toast.msg} ok={toast.ok}/>}
      </div>
    </>
  );
}