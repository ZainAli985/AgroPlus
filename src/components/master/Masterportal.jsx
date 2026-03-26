// MasterPortal.jsx — ORCA TECH Master Dashboard
// Theme: DM Sans + DM Mono | #111827 dark | #4ade80 green accent
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../config/API_BASE_URL.js";

/* ─────────────────────────── Auth helpers ─────────────────────────── */
const getToken  = () => localStorage.getItem("token");
const authHdr   = () => ({ Authorization:`Bearer ${getToken()}`, "Content-Type":"application/json" });
const authFetch = (url, opts={}) =>
  fetch(url, { ...opts, headers:{ ...authHdr(), ...(opts.headers||{}) } });

/* ─────────────────────────── Formatters ───────────────────────────── */
const fmtDate = d => d ? new Date(d).toLocaleDateString("en-PK",{year:"numeric",month:"short",day:"numeric"}) : "—";
const fmtFull = d => d ? new Date(d).toLocaleString("en-PK",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}) : "—";
const fmtPKR  = n => `Rs ${Number(n||0).toLocaleString()}`;
const fmtCnic = raw => {
  const d = raw.replace(/\D/g,"").slice(0,13);
  if (d.length<=5)  return d;
  if (d.length<=12) return `${d.slice(0,5)}-${d.slice(5)}`;
  return `${d.slice(0,5)}-${d.slice(5,12)}-${d.slice(12)}`;
};
const fileUrl = p => {
  if (!p) return null;
  if (p.startsWith("http")) return p;
  return `${API_BASE_URL.replace(/\/api\/?$/,"")}/${p.replace(/^\/+/,"")}`;
};

/* ─────────────────────────── Password strength ────────────────────── */
function pwdScore(p) {
  let s = 0;
  if (p.length >= 8)  s++;
  if (p.length >= 12) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)) s++;
  return s;
}
const PWD_LABELS = ["","Weak","Fair","Good","Strong"];
const PWD_COLORS = ["","#dc2626","#d97706","#ca8a04","#15803d"];

/* ─────────────────────────── Package catalogue ─────────────────────── */
const PACKAGES = {
  starter: {
    name:"Starter", tier:"BASIC", price:250000, monthly:7500, color:"#6366f1",
    features:["Dashboard & Analytics","Chart of Accounts","Products & Inventory",
              "Journal Entries","Purchase & Sales Invoices",
              "Financial Reports (BS, TB, IS)","Cashbook & Daily Register","Profile Management"],
    excludes:["Employee Management","Weight Bridge"],
  },
  professional: {
    name:"Professional", tier:"STANDARD", price:400000, monthly:7500, color:"#15803d",
    features:["Everything in Starter","Employee Management","Role-Based Access",
              "Priority Support","Staff Training Session","Custom Ledger References"],
    excludes:["Weight Bridge"],
  },
  enterprise: {
    name:"Enterprise", tier:"PREMIUM", price:650000, monthly:7500, color:"#b45309",
    features:["Everything in Professional","Weight Bridge System","Custom Vehicle Types",
              "Season-Based Management","Dedicated Support","Custom Feature Requests",
              "Unlimited Staff Accounts","Data Export Tools"],
    excludes:[],
  },
};

const PAY_STYLE = {
  monthly:     {bg:"#f0fdf4",color:"#15803d",border:"#bbf7d0",label:"Monthly"},
  installment: {bg:"#fffbeb",color:"#d97706",border:"#fde68a",label:"Installment"},
  package:     {bg:"#eff6ff",color:"#1d4ed8",border:"#bfdbfe",label:"Package"},
  full_package:{bg:"#eff6ff",color:"#1d4ed8",border:"#bfdbfe",label:"Package"},
  other:       {bg:"#f5f3ff",color:"#7c3aed",border:"#ddd6fe",label:"Other"},
};

/* ─────────────────────────── Global fonts + CSS ───────────────────── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  @keyframes mp-up   {from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
  @keyframes mp-in   {from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:none}}
  @keyframes mp-spin {to{transform:rotate(360deg)}}

  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  .mp{min-height:100vh;background:#f9fafb;font-family:'DM Sans',sans-serif;color:#111827;display:flex;flex-direction:column;}

  /* ── TOP BAR ── */
  .mp-bar{height:56px;display:flex;align-items:center;gap:12px;padding:0 20px;background:#111827;border-bottom:1px solid rgba(255,255,255,.07);position:sticky;top:0;z-index:300;flex-shrink:0;box-shadow:0 2px 10px rgba(0,0,0,.25);}
  .mp-logo{font-size:15.5px;font-weight:700;letter-spacing:-.2px;display:flex;align-items:baseline;}
  .mp-logo-w{color:#fff;}.mp-logo-p{color:#4ade80;}.mp-logo-plus{color:#4ade80;}
  .mp-chip{background:rgba(74,222,128,.12);color:#4ade80;font-size:9px;font-weight:700;padding:3px 9px;border-radius:4px;letter-spacing:.1em;text-transform:uppercase;font-family:'DM Mono',monospace;border:1px solid rgba(74,222,128,.2);}
  .mp-bar-sep{flex:1;}
  .mp-bar-org{font-size:11px;color:rgba(255,255,255,.3);font-family:'DM Mono',monospace;}
  .mp-bar-out{background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.25);color:#f87171;border-radius:6px;padding:6px 14px;font-size:12px;font-family:'DM Sans',sans-serif;cursor:pointer;transition:.12s;font-weight:600;}
  .mp-bar-out:hover{background:rgba(239,68,68,.22);color:#fca5a5;}

  /* ── LAYOUT ── */
  .mp-body{display:flex;flex:1;height:calc(100vh - 56px);overflow:hidden;}

  /* ── SIDEBAR ── */
  .mp-side{width:212px;flex-shrink:0;background:#fff;border-right:1px solid #e5e7eb;display:flex;flex-direction:column;overflow-y:auto;padding:10px 8px;}
  .mp-side::-webkit-scrollbar{width:3px;}
  .mp-side::-webkit-scrollbar-thumb{background:#e5e7eb;border-radius:3px;}
  .mp-side-lbl{font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#9ca3af;padding:0 9px;margin:13px 0 4px;font-family:'DM Mono',monospace;}
  .mp-nav{display:flex;align-items:center;gap:8px;padding:8px 9px;border-radius:6px;cursor:pointer;color:#6b7280;font-size:13px;font-weight:500;transition:.1s;border:1px solid transparent;width:100%;background:none;text-align:left;font-family:'DM Sans',sans-serif;}
  .mp-nav:hover{background:#f9fafb;color:#111827;}
  .mp-nav.on{background:#f0fdf4;color:#15803d;border-color:#bbf7d0;font-weight:600;}
  .mp-nav-ico{width:20px;height:20px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .mp-nav-badge{margin-left:auto;background:#fffbeb;color:#d97706;font-size:9px;font-weight:700;padding:1px 7px;border-radius:4px;font-family:'DM Mono',monospace;border:1px solid #fde68a;}
  .mp-nav-badge.red{background:#fef2f2;color:#dc2626;border-color:#fecaca;}
  .mp-side-foot{margin-top:auto;padding:12px 8px 6px;border-top:1px solid #f3f4f6;}
  .mp-side-foot-txt{font-size:9.5px;color:#9ca3af;text-align:center;font-family:'DM Mono',monospace;line-height:1.7;}

  /* ── MAIN ── */
  .mp-main{flex:1;overflow-y:auto;padding:20px 22px;min-width:0;}
  .mp-main::-webkit-scrollbar{width:4px;}
  .mp-main::-webkit-scrollbar-thumb{background:#e5e7eb;border-radius:4px;}

  .mp-h1{font-size:19px;font-weight:700;color:#111827;letter-spacing:-.3px;margin-bottom:2px;}
  .mp-h2{font-size:12.5px;color:#9ca3af;margin-bottom:16px;}

  /* ── STAT CARDS ── */
  .mp-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px;}
  @media(max-width:900px){.mp-stats{grid-template-columns:1fr 1fr;}}
  .mp-sc{background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:13px 15px;position:relative;overflow:hidden;}
  .mp-sc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--ac,#e5e7eb);}
  .mp-sc-lbl{font-size:9.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#9ca3af;font-family:'DM Mono',monospace;margin-bottom:5px;}
  .mp-sc-num{font-family:'DM Mono',monospace;font-size:25px;font-weight:700;line-height:1;color:var(--ac,#374151);}

  /* ── BADGES ── */
  .badge{display:inline-flex;align-items:center;gap:4px;border-radius:4px;padding:2px 8px;font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;font-family:'DM Mono',monospace;border:1px solid;}
  .badge-dot{width:5px;height:5px;border-radius:50%;}
  .badge-pending{background:#fffbeb;color:#d97706;border-color:#fde68a;}.badge-pending .badge-dot{background:#f59e0b;}
  .badge-approved{background:#f0fdf4;color:#15803d;border-color:#bbf7d0;}.badge-approved .badge-dot{background:#22c55e;}
  .badge-restricted{background:#fef2f2;color:#dc2626;border-color:#fecaca;}.badge-restricted .badge-dot{background:#ef4444;}

  /* ── TABLE ── */
  .mp-tbl-wrap{background:#fff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;}
  .mp-toolbar{display:flex;gap:7px;margin-bottom:12px;flex-wrap:wrap;align-items:center;}
  .mp-srch{flex:1;min-width:180px;position:relative;}
  .mp-srch-ico{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:#9ca3af;pointer-events:none;}
  .mp-srch input{width:100%;padding:7px 11px 7px 31px;background:#fff;border:1px solid #d1d5db;border-radius:6px;font-size:13px;color:#111827;font-family:'DM Sans',sans-serif;outline:none;transition:.12s;}
  .mp-srch input:focus{border-color:#6b7280;box-shadow:0 0 0 2px rgba(107,114,128,.1);}
  .mp-srch input::placeholder{color:#9ca3af;}
  .mp-tab{padding:6px 12px;border-radius:6px;border:1px solid #e5e7eb;background:#fff;font-size:12px;font-weight:600;color:#6b7280;font-family:'DM Sans',sans-serif;cursor:pointer;transition:.1s;white-space:nowrap;}
  .mp-tab:hover{border-color:#d1d5db;color:#111827;}
  .mp-tab.on{background:#111827;border-color:#111827;color:#fff;}
  .mp-tab.on-p{background:#fffbeb;border-color:#fde68a;color:#d97706;}
  .mp-tab.on-r{background:#fef2f2;border-color:#fecaca;color:#dc2626;}

  table{width:100%;border-collapse:collapse;}
  thead th{padding:9px 13px;text-align:left;font-size:9.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#9ca3af;background:#f9fafb;border-bottom:1px solid #e5e7eb;font-family:'DM Mono',monospace;white-space:nowrap;}
  tbody tr{border-bottom:1px solid #f9fafb;cursor:pointer;transition:background .08s;}
  tbody tr:hover{background:#fafafa;}
  tbody tr.sel{background:#f0fdf4!important;}
  tbody tr:last-child{border-bottom:none;}
  tbody td{padding:10px 13px;font-size:13px;vertical-align:middle;}
  .t-biz{font-weight:700;color:#111827;font-size:13px;line-height:1.2;}
  .t-id{font-family:'DM Mono',monospace;font-size:9px;color:#9ca3af;margin-top:1px;}
  .t-dim{color:#6b7280;font-size:12px;}
  .t-pkg{font-size:9px;font-weight:700;padding:2px 7px;border-radius:4px;font-family:'DM Mono',monospace;letter-spacing:.05em;text-transform:uppercase;border:1px solid;}

  /* Action buttons */
  .qbtn{padding:4px 9px;border-radius:5px;font-size:11px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:.1s;border:1px solid;}
  .qbtn-app{background:#f0fdf4;color:#15803d;border-color:#bbf7d0;}.qbtn-app:hover{background:#15803d;color:#fff;}
  .qbtn-res{background:#fef2f2;color:#dc2626;border-color:#fecaca;}.qbtn-res:hover{background:#dc2626;color:#fff;}
  .qbtn-unr{background:#f0fdf4;color:#15803d;border-color:#bbf7d0;}.qbtn-unr:hover{background:#15803d;color:#fff;}
  .qbtn-del{background:#fff;color:#9ca3af;border-color:#e5e7eb;}.qbtn-del:hover{background:#fef2f2;color:#dc2626;border-color:#fecaca;}
  .qbtns{display:flex;gap:4px;flex-wrap:wrap;}
  .mp-empty{padding:40px;text-align:center;color:#9ca3af;font-size:13px;}

  /* ── SPLIT LAYOUT ── */
  .mp-split{display:flex;gap:16px;}
  .mp-split-L{flex:1;min-width:0;}
  .mp-split-R{width:400px;flex-shrink:0;}
  @media(max-width:1180px){.mp-split-R{display:none;}}

  /* ── DETAIL PANEL ── */
  .mp-panel{background:#fff;border:1px solid #e5e7eb;border-radius:8px;animation:mp-in .18s ease;position:sticky;top:0;max-height:calc(100vh - 78px);overflow-y:auto;}
  .mp-panel::-webkit-scrollbar{width:3px;}
  .mp-panel::-webkit-scrollbar-thumb{background:#e5e7eb;}

  /* Panel header */
  .mp-ph{padding:13px 15px;border-bottom:1px solid #e5e7eb;background:#f9fafb;position:sticky;top:0;z-index:5;}
  .mp-ph-name{font-size:14px;font-weight:700;color:#111827;margin-bottom:6px;padding-right:26px;line-height:1.3;}
  .mp-ph-meta{display:flex;align-items:center;gap:6px;flex-wrap:wrap;}
  .mp-ph-close{position:absolute;top:11px;right:11px;width:24px;height:24px;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:5px;color:#6b7280;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.1s;font-size:11px;}
  .mp-ph-close:hover{background:#fef2f2;color:#dc2626;border-color:#fecaca;}

  /* Panel body */
  .mp-pb{padding:13px 15px;}
  .mp-sec{margin-bottom:18px;}
  .mp-sec-hd{font-size:9.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#9ca3af;font-family:'DM Mono',monospace;padding-bottom:7px;margin-bottom:10px;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;gap:6px;}
  .mp-sec-hd::before{content:'';width:3px;height:11px;background:#111827;border-radius:2px;}
  .mp-sec-cnt{margin-left:auto;background:#f3f4f6;color:#6b7280;padding:1px 7px;border-radius:4px;font-size:9px;border:1px solid #e5e7eb;}

  /* Info grid */
  .mp-ig{display:grid;grid-template-columns:1fr 1fr;gap:6px;}
  .mp-if{background:#f9fafb;border:1px solid #f3f4f6;border-radius:6px;padding:8px 10px;}
  .mp-ik{font-family:'DM Mono',monospace;font-size:8.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#9ca3af;margin-bottom:3px;}
  .mp-iv{font-size:12.5px;color:#111827;font-weight:500;word-break:break-all;line-height:1.4;}
  .mp-iv.mono{font-family:'DM Mono',monospace;font-size:11.5px;color:#374151;}
  .mp-iv.grn{color:#15803d;}

  /* ── CREDENTIAL BOX ── */
  .mp-cred{background:#111827;border-radius:7px;padding:13px 14px;margin-bottom:8px;}
  .mp-cred-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:7px;}
  .mp-cred-row:last-child{margin-bottom:0;}
  .mp-cred-lbl{font-family:'DM Mono',monospace;font-size:8.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.3);}
  .mp-cred-val{font-family:'DM Mono',monospace;font-size:12.5px;font-weight:500;color:#4ade80;word-break:break-all;}
  .mp-cred-val.dim{color:rgba(255,255,255,.55);}
  .mp-cred-val.muted{color:rgba(255,255,255,.35);letter-spacing:2px;}
  .mp-cred-copy{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:4px;padding:2px 8px;font-size:10px;color:rgba(255,255,255,.45);cursor:pointer;font-family:'DM Mono',monospace;transition:.1s;flex-shrink:0;}
  .mp-cred-copy:hover{background:rgba(74,222,128,.15);color:#4ade80;border-color:rgba(74,222,128,.3);}
  .mp-reveal{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:4px;padding:2px 9px;font-size:10px;color:rgba(255,255,255,.4);cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:600;transition:.1s;flex-shrink:0;}
  .mp-reveal:hover{background:rgba(239,68,68,.15);color:#f87171;border-color:rgba(239,68,68,.25);}

  /* Reset password inline */
  .mp-reset-box{background:#fef2f2;border:1px solid #fecaca;border-radius:6px;padding:10px 11px;margin-top:6px;animation:mp-up .15s ease;}
  .mp-reset-title{font-size:10px;font-weight:700;color:#dc2626;letter-spacing:.07em;text-transform:uppercase;font-family:'DM Mono',monospace;margin-bottom:8px;}
  .mp-reset-row{display:flex;gap:6px;}

  /* ── PAYMENT ENTRIES ── */
  .mp-pe{background:#f9fafb;border:1px solid #e5e7eb;border-radius:7px;margin-bottom:5px;overflow:hidden;cursor:pointer;transition:border-color .1s;}
  .mp-pe:hover{border-color:#d1d5db;}
  .mp-pe-top{display:flex;align-items:center;gap:7px;padding:8px 11px;}
  .mp-pe-cat{font-size:9px;font-weight:700;padding:2px 7px;border-radius:4px;border:1px solid;font-family:'DM Mono',monospace;letter-spacing:.05em;text-transform:uppercase;flex-shrink:0;}
  .mp-pe-amt{font-weight:700;color:#111827;font-size:13px;flex:1;font-family:'DM Mono',monospace;}
  .mp-pe-date{font-size:10px;color:#9ca3af;font-family:'DM Mono',monospace;white-space:nowrap;}
  .mp-pe-body{padding:8px 11px 10px;background:#fff;border-top:1px solid #f3f4f6;display:grid;grid-template-columns:1fr 1fr;gap:4px;}
  .mp-pe-row{font-size:11px;color:#6b7280;}.mp-pe-row span{font-weight:600;color:#111827;}
  .mp-no-pay{padding:14px;text-align:center;color:#9ca3af;font-size:12.5px;background:#f9fafb;border-radius:6px;border:1px dashed #e5e7eb;}

  /* Record payment button */
  .mp-rec-btn{width:100%;padding:8px 12px;border-radius:6px;border:1px dashed #d1d5db;background:#f9fafb;color:#374151;font-size:12px;font-weight:600;cursor:pointer;transition:.12s;font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:center;gap:5px;margin-top:6px;}
  .mp-rec-btn:hover{background:#f0fdf4;border-color:#15803d;color:#15803d;}

  /* ── RECORD PAYMENT FORM ── */
  .mp-pay-form{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:7px;padding:13px;margin-top:7px;animation:mp-up .16s ease;}
  .mp-pay-form-hd{font-size:10.5px;font-weight:700;color:#15803d;letter-spacing:.08em;text-transform:uppercase;font-family:'DM Mono',monospace;margin-bottom:11px;}
  .pf-lbl{font-size:9.5px;font-weight:700;color:#6b7280;letter-spacing:.07em;text-transform:uppercase;font-family:'DM Mono',monospace;display:block;margin-bottom:3px;}
  .pf-inp{width:100%;padding:7px 10px;background:#fff;border:1px solid #d1d5db;border-radius:6px;font-size:13px;color:#111827;font-family:'DM Sans',sans-serif;outline:none;transition:.12s;}
  .pf-inp:focus{border-color:#6b7280;box-shadow:0 0 0 2px rgba(107,114,128,.1);}
  .pf-inp.mono{font-family:'DM Mono',monospace;font-size:12px;}
  .pf-sel{width:100%;padding:7px 10px;background:#fff;border:1px solid #d1d5db;border-radius:6px;font-size:13px;color:#111827;font-family:'DM Sans',sans-serif;outline:none;cursor:pointer;appearance:none;}

  /* ── DOC GRID ── */
  .mp-doc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;}
  .mp-doc-card{background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:8px;text-align:center;text-decoration:none;transition:.1s;display:block;}
  .mp-doc-card:hover{border-color:#d1d5db;background:#fff;}
  .mp-doc-thumb{width:100%;height:42px;object-fit:cover;border-radius:4px;margin-bottom:4px;}
  .mp-doc-name{font-size:9.5px;color:#6b7280;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .mp-mill-logo{width:48px;height:48px;border-radius:7px;object-fit:cover;border:1px solid #e5e7eb;margin-bottom:9px;}

  /* ── PANEL ACTIONS ── */
  .mp-pact{padding:10px 13px;border-top:1px solid #e5e7eb;display:flex;gap:6px;flex-wrap:wrap;background:#f9fafb;}
  .mp-pa{flex:1;min-width:96px;padding:8px 10px;border-radius:6px;font-size:12px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:5px;transition:.12s;border:1px solid;}
  .mp-pa-app{background:#f0fdf4;color:#15803d;border-color:#bbf7d0;}.mp-pa-app:hover{background:#15803d;color:#fff;}
  .mp-pa-res{background:#fef2f2;color:#dc2626;border-color:#fecaca;}.mp-pa-res:hover{background:#dc2626;color:#fff;}
  .mp-pa-unr{background:#f0fdf4;color:#15803d;border-color:#bbf7d0;}.mp-pa-unr:hover{background:#15803d;color:#fff;}
  .mp-pa-del{background:#fff;color:#9ca3af;border-color:#e5e7eb;flex:0;padding:8px 11px;}.mp-pa-del:hover{background:#fef2f2;color:#dc2626;border-color:#fecaca;}
  .mp-pa:disabled{opacity:.5;cursor:not-allowed;}

  /* ── WIZARD ── */
  .mp-wiz{max-width:720px;}
  .mp-wiz-steps{display:flex;align-items:flex-start;margin-bottom:22px;}
  .mp-wiz-col{display:flex;flex-direction:column;align-items:center;}
  .mp-wiz-circle{width:28px;height:28px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #e5e7eb;color:#9ca3af;background:#fff;transition:.18s;font-family:'DM Mono',monospace;}
  .mp-wiz-circle.done{border-color:#15803d;background:#15803d;color:#fff;}
  .mp-wiz-circle.active{border-color:#111827;color:#111827;background:#f9fafb;}
  .mp-wiz-line{flex:1;height:2px;background:#e5e7eb;margin:12px 4px 0;transition:.2s;}
  .mp-wiz-line.done{background:#15803d;}
  .mp-wiz-lbl{font-size:8.5px;font-weight:700;color:#9ca3af;letter-spacing:.05em;text-transform:uppercase;margin-top:4px;white-space:nowrap;font-family:'DM Mono',monospace;}
  .mp-wiz-lbl.active,.mp-wiz-lbl.done{color:#111827;}
  .mp-card{background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:22px 24px;}
  .mp-card-h1{font-size:16px;font-weight:700;color:#111827;margin-bottom:3px;letter-spacing:-.2px;}
  .mp-card-h2{font-size:12.5px;color:#9ca3af;margin-bottom:18px;}
  .mp-g2{display:grid;grid-template-columns:1fr 1fr;gap:13px;}
  .mp-g1{display:flex;flex-direction:column;gap:12px;}
  .mp-fld{display:flex;flex-direction:column;gap:4px;}
  .mp-lbl{font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#6b7280;font-family:'DM Mono',monospace;}
  .mp-lbl em{color:#ef4444;font-style:normal;margin-left:2px;}
  .mp-inp{padding:9px 12px;background:#fff;border:1px solid #d1d5db;border-radius:6px;font-size:13px;color:#111827;font-family:'DM Sans',sans-serif;outline:none;transition:.12s;}
  .mp-inp::placeholder{color:#9ca3af;}
  .mp-inp:focus{border-color:#6b7280;box-shadow:0 0 0 2px rgba(107,114,128,.1);}
  .mp-inp.mono{font-family:'DM Mono',monospace;font-size:12.5px;}
  .mp-inp:disabled{background:#f9fafb;color:#9ca3af;cursor:not-allowed;}
  .mp-sel{padding:9px 12px;background:#fff;border:1px solid #d1d5db;border-radius:6px;font-size:13px;color:#111827;font-family:'DM Sans',sans-serif;outline:none;cursor:pointer;width:100%;appearance:none;}
  .mp-sel:focus{border-color:#6b7280;}

  /* Validation hints */
  .hint-ok{font-size:11px;color:#15803d;margin-top:3px;}
  .hint-er{font-size:11px;color:#dc2626;margin-top:3px;}

  /* Package cards */
  .pkg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:11px;}
  @media(max-width:960px){.pkg-grid{grid-template-columns:1fr;}}
  .pkg-c{border:1.5px solid #e5e7eb;border-radius:8px;padding:15px;cursor:pointer;background:#fff;transition:.15s;position:relative;overflow:hidden;}
  .pkg-c:hover{border-color:#d1d5db;box-shadow:0 2px 10px rgba(0,0,0,.06);}
  .pkg-c.sel{border-color:var(--pc);background:#fafffe;}
  .pkg-accent{position:absolute;top:0;left:0;right:0;height:3px;background:var(--pc);}
  .pkg-tier{font-size:8.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-family:'DM Mono',monospace;color:var(--pc);margin-bottom:3px;}
  .pkg-name{font-size:15px;font-weight:700;color:#111827;margin-bottom:2px;}
  .pkg-price{font-family:'DM Mono',monospace;font-size:14px;font-weight:700;color:#111827;margin-bottom:9px;}
  .pkg-price span{font-size:10.5px;color:#9ca3af;}
  .pkg-feat{font-size:11.5px;color:#6b7280;display:flex;align-items:flex-start;gap:5px;margin-bottom:4px;line-height:1.4;}
  .pkg-tick{color:var(--pc);flex-shrink:0;}.pkg-x{color:#d1d5db;flex-shrink:0;}
  .pkg-chk{position:absolute;top:11px;right:11px;width:18px;height:18px;border-radius:50%;background:var(--pc);display:flex;align-items:center;justify-content:center;opacity:0;transition:.15s;}
  .pkg-c.sel .pkg-chk{opacity:1;}

  /* Pay type */
  .pay-type-g{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:14px;}
  .pay-tc{border:1.5px solid #e5e7eb;border-radius:7px;padding:13px;cursor:pointer;background:#fff;transition:.13s;}
  .pay-tc:hover{border-color:#d1d5db;}
  .pay-tc.sel{border-color:#111827;background:#f9fafb;}
  .pay-tc-h{font-size:13.5px;font-weight:700;color:#111827;margin-bottom:2px;}
  .pay-tc-d{font-size:11.5px;color:#6b7280;}
  .pay-sum{background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:11px;}
  .pay-sum-row{display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid #f3f4f6;font-size:12.5px;color:#6b7280;}
  .pay-sum-row:last-child{border-bottom:none;}
  .pay-sum-row.tot{font-weight:700;color:#111827;padding-top:7px;}

  /* Wizard nav */
  .mp-wiz-nav{display:flex;gap:9px;margin-top:18px;}
  .mp-btn-bk{padding:9px 15px;border-radius:7px;border:1px solid #e5e7eb;background:#fff;color:#6b7280;font-size:13px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:.1s;}
  .mp-btn-bk:hover{border-color:#d1d5db;color:#111827;}
  .mp-btn-nx{flex:1;padding:10px;border-radius:7px;border:none;background:#111827;color:#fff;font-size:13px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;transition:.12s;display:flex;align-items:center;justify-content:center;gap:7px;}
  .mp-btn-nx:hover:not(:disabled){background:#1f2937;}
  .mp-btn-nx:disabled{background:#f3f4f6;color:#9ca3af;cursor:not-allowed;}
  .mp-btn-nx.grn{background:#15803d;}.mp-btn-nx.grn:hover:not(:disabled){background:#166534;}

  /* Upload area */
  .mp-drop{border:1.5px dashed #d1d5db;border-radius:7px;padding:13px;text-align:center;cursor:pointer;transition:.13s;background:#f9fafb;position:relative;}
  .mp-drop:hover{border-color:#9ca3af;background:#fff;}
  .mp-drop input{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;}
  .mp-doc-list{display:flex;flex-direction:column;gap:5px;margin-top:8px;}
  .mp-doc-item{display:flex;align-items:center;gap:7px;background:#fff;border:1px solid #e5e7eb;border-radius:5px;padding:5px 9px;font-size:12px;color:#374151;}
  .mp-doc-rm{margin-left:auto;background:none;border:none;color:#9ca3af;cursor:pointer;font-size:13px;transition:.1s;}
  .mp-doc-rm:hover{color:#dc2626;}
  .mp-doc-phase{margin-bottom:14px;}
  .mp-doc-phase-hd{font-size:11px;font-weight:700;color:#374151;margin-bottom:7px;display:flex;align-items:center;gap:6px;}
  .mp-doc-phase-hd::before{content:'';width:3px;height:12px;background:#111827;border-radius:2px;flex-shrink:0;}

  /* Password bars */
  .mp-pwd-bars{display:flex;gap:3px;margin-top:4px;}
  .mp-pwd-bar{flex:1;height:3px;border-radius:2px;background:#f3f4f6;transition:.2s;}
  .mp-cnic-dots{display:flex;gap:2px;margin-top:4px;}
  .mp-cnic-dot{width:5px;height:5px;border-radius:50%;background:#e5e7eb;transition:.15s;}
  .mp-cnic-dot.on{background:#111827;}

  /* Billing row */
  .mp-bill-row{display:flex;gap:7px;align-items:center;}
  .mp-bill-row input{flex:1;padding:7px 10px;background:#fff;border:1px solid #d1d5db;border-radius:6px;font-size:13px;color:#111827;outline:none;transition:.12s;}
  .mp-bill-row input:focus{border-color:#6b7280;}
  .mp-bill-row button{padding:7px 13px;background:#111827;border:none;border-radius:6px;color:#fff;font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:.1s;white-space:nowrap;}
  .mp-bill-row button:hover{background:#1f2937;}

  /* Revenue strip */
  .mp-rev{background:#111827;border-radius:8px;padding:13px 16px;margin-bottom:16px;display:flex;align-items:center;gap:16px;}
  .mp-rev-main{flex:1;}
  .mp-rev-lbl{font-size:9.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.35);font-family:'DM Mono',monospace;margin-bottom:3px;}
  .mp-rev-num{font-family:'DM Mono',monospace;font-size:22px;font-weight:700;color:#4ade80;}
  .mp-rev-note{text-align:right;}
  .mp-rev-note-a{font-size:10px;color:rgba(255,255,255,.3);font-family:'DM Mono',monospace;margin-bottom:2px;}
  .mp-rev-note-b{font-size:12px;color:rgba(255,255,255,.45);}

  /* Banners */
  .mp-info{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:10px 12px;font-size:12.5px;color:#166534;line-height:1.6;margin-top:11px;}
  .mp-warn{background:#fffbeb;border:1px solid #fde68a;border-radius:6px;padding:10px 12px;font-size:12.5px;color:#92400e;line-height:1.6;margin-top:10px;}
  .mp-divider{height:1px;background:#f3f4f6;margin:13px 0;}

  /* Toast */
  .mp-toast{position:fixed;bottom:20px;right:20px;z-index:9999;padding:10px 15px;border-radius:7px;font-size:13px;font-weight:600;background:#fff;border:1px solid #e5e7eb;color:#111827;box-shadow:0 4px 18px rgba(0,0,0,.12);animation:mp-up .18s ease;display:flex;align-items:center;gap:7px;max-width:320px;}
  .mp-toast.ok{border-color:#bbf7d0;border-top:3px solid #15803d;color:#15803d;}
  .mp-toast.err{border-color:#fecaca;border-top:3px solid #dc2626;color:#dc2626;}

  /* Support */
  .mp-req{background:#fff;border:1px solid #e5e7eb;border-radius:7px;padding:13px 15px;margin-bottom:8px;transition:.1s;}
  .mp-req:hover{border-color:#d1d5db;}
  .mp-req-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:7px;gap:7px;flex-wrap:wrap;}
  .mp-req-sub{font-size:13.5px;font-weight:700;color:#111827;}
  .mp-req-body{font-size:12.5px;color:#6b7280;line-height:1.6;}
  .mp-req-mill{font-size:10.5px;color:#9ca3af;font-family:'DM Mono',monospace;margin-top:5px;}
  .mp-req-st{font-size:9px;font-weight:700;padding:2px 7px;border-radius:4px;border:1px solid;font-family:'DM Mono',monospace;letter-spacing:.07em;text-transform:uppercase;}
  .req-open{background:#fffbeb;color:#d97706;border-color:#fde68a;}
  .req-review{background:#f0fdf4;color:#15803d;border-color:#bbf7d0;}
  .req-resolved{background:#f3f4f6;color:#6b7280;border-color:#e5e7eb;}

  /* Misc */
  .mp-spin{animation:mp-spin .8s linear infinite;display:inline-block;}
  @media(max-width:1024px){.mp-side{display:none;}}
  @media(max-width:640px){.mp-g2{grid-template-columns:1fr;}.mp-stats{grid-template-columns:1fr 1fr;}}
`;

/* ── Micro components ─────────────────────────────────────────────── */
const Spin  = () => <span className="mp-spin">⟳</span>;
const Badge = ({ status }) => (
  <span className={`badge badge-${status}`}><span className="badge-dot"/>{status}</span>
);
const Toast = ({ msg, ok }) => (
  <div className={`mp-toast ${ok?"ok":"err"}`}>
    {ok
      ? <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
      : <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>}
    {msg}
  </div>
);

const copy = (text, cb) =>
  navigator.clipboard?.writeText(text)
    .then(()=>cb("Copied!",true))
    .catch(()=>cb("Failed to copy",false));

/* ═══════════════════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════════════════ */
function DashboardSection({ stats, mills }) {
  const recent = [...mills].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,6);
  const revenue = (stats.approved||0) * 7500;
  return (
    <div>
      <div className="mp-h1">Master Dashboard</div>
      <div className="mp-h2">Agro Plus platform overview — real-time across all mills</div>
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
      <div className="mp-rev">
        <div className="mp-rev-main">
          <div className="mp-rev-lbl">Estimated Monthly Revenue</div>
          <div className="mp-rev-num">Rs {revenue.toLocaleString()}</div>
        </div>
        <div className="mp-rev-note">
          <div className="mp-rev-note-a">Active mills × Rs 7,500/month</div>
          <div className="mp-rev-note-b">{stats.approved||0} active mills</div>
        </div>
      </div>
      <div className="mp-tbl-wrap">
        <div style={{padding:"11px 14px",borderBottom:"1px solid #e5e7eb",fontSize:13,fontWeight:700,color:"#111827"}}>
          Recent Registrations
        </div>
        {recent.length===0
          ? <div className="mp-empty">No mills registered yet.</div>
          : <table>
              <thead><tr><th>Mill</th><th>Owner</th><th>Package</th><th>Status</th><th>Registered</th></tr></thead>
              <tbody>
                {recent.map(m=>(
                  <tr key={m._id} style={{cursor:"default"}}>
                    <td><div className="t-biz">{m.businessName}</div><div className="t-id">{m.millId}</div></td>
                    <td className="t-dim">{m.ownerName}</td>
                    <td>{m.plan&&<span className="t-pkg" style={{color:PACKAGES[m.plan]?.color||"#374151",borderColor:(PACKAGES[m.plan]?.color||"#374151")+"33",background:(PACKAGES[m.plan]?.color||"#374151")+"10"}}>{PACKAGES[m.plan]?.tier||m.plan}</span>}</td>
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

/* ═══════════════════════════════════════════════════════════════════
   REGISTER MILL — 5-step wizard
═══════════════════════════════════════════════════════════════════ */
const STEPS = ["Business Info","Security","Company Docs","Personal Docs","Package & Plan"];

function RegisterMill({ onCreated, showToast }) {
  const [step, setStep]           = useState(1);
  const [busy, setBusy]           = useState(false);
  const [biz,  setBiz]            = useState({businessName:"",ownerName:"",email:"",phone:"",ntnNumber:"",address:""});
  const [logo, setLogo]           = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [sec,  setSec]            = useState({cnic:"",password:"",confirmPwd:""});
  const [showPwd,   setShowPwd]   = useState(false);
  const [showConf,  setShowConf]  = useState(false);
  const [compDocs,  setCompDocs]  = useState([]);
  const [persDocs,  setPersDocs]  = useState([]);
  const [pkg,       setPkg]       = useState("");
  const [payType,   setPayType]   = useState("full");
  const [tenure,    setTenure]    = useState(3);

  const score    = pwdScore(sec.password);
  const cnicDigs = sec.cnic.replace(/\D/g,"").length;
  const pkgInfo  = PACKAGES[pkg];
  const instAmt  = pkgInfo ? Math.round(pkgInfo.price / tenure) : 0;

  const handleCnic = e => {
    const raw = e.target.value.replace(/\D/g,"").slice(0,13);
    setSec(p=>({...p, cnic:fmtCnic(raw)}));
  };

  const addFiles = (files, setter) =>
    setter(p=>[...p,...Array.from(files).map(f=>({file:f,name:f.name}))]);
  const rmFile = (i, setter) => setter(p=>p.filter((_,j)=>j!==i));

  const validate = () => {
    if (step===1) {
      if (!biz.businessName.trim()) return "Business name is required";
      if (!biz.ownerName.trim())    return "Owner name is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(biz.email)) return "Valid email address is required";
      if (biz.phone && !/^\+92[3]\d{9}$/.test(biz.phone)) return "Phone must be in +923XXXXXXXXX format";
      return null;
    }
    if (step===2) {
      if (cnicDigs!==13)              return "CNIC must be exactly 13 digits";
      if (sec.password.length<8)      return "Password must be at least 8 characters";
      if (score<2)                    return "Password is too weak — use uppercase, numbers, and symbols";
      if (sec.password!==sec.confirmPwd) return "Passwords do not match";
      return null;
    }
    if (step===5 && !pkg) return "Please select a package";
    return null;
  };

  const next = () => {
    const err = validate();
    if (err) { showToast(err,false); return; }
    setStep(s=>s+1);
  };

  const reset = () => {
    setStep(1);
    setBiz({businessName:"",ownerName:"",email:"",phone:"",ntnNumber:"",address:""});
    setLogo(null); setLogoPreview("");
    setSec({cnic:"",password:"",confirmPwd:""});
    setCompDocs([]); setPersDocs([]);
    setPkg(""); setPayType("full"); setTenure(3);
  };

  const submit = async () => {
    if (!pkg) { showToast("Please select a package",false); return; }
    setBusy(true);
    try {
      const fd = new FormData();
      Object.entries(biz).forEach(([k,v])=>fd.append(k,v));
      fd.append("cnic",     sec.cnic.replace(/\D/g,""));
      fd.append("password", sec.password);
      fd.append("plan",     pkg);
      fd.append("paymentType", payType);
      fd.append("installmentTenure", payType==="installment" ? tenure : 0);
      if (logo) fd.append("logo", logo);
      let di = 0;
      [...compDocs,...persDocs].forEach(d=>{ fd.append(`doc_${di}`,d.file); di++; });
      const r = await fetch(`${API_BASE_URL}/master/mills`,{
        method:"POST",
        headers:{ Authorization:`Bearer ${getToken()}` },
        body: fd,
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.message);
      showToast(`${biz.businessName} created! Welcome email sent to ${biz.email} 🎉`,true);
      onCreated && onCreated();
      reset();
    } catch(e) { showToast(e.message,false); }
    setBusy(false);
  };

  /* doc-phase sub-component */
  const DocPhase = ({title, hint, docs, setter}) => (
    <div className="mp-doc-phase">
      <div className="mp-doc-phase-hd">{title}</div>
      {hint && <div style={{fontSize:11.5,color:"#9ca3af",marginBottom:7}}>{hint}</div>}
      <div className="mp-drop">
        <input type="file" multiple accept="image/*,.pdf" onChange={e=>addFiles(e.target.files,setter)}/>
        <div style={{fontSize:12.5,color:"#6b7280"}}>Click to upload or drag & drop</div>
        <div style={{fontSize:11,color:"#9ca3af",marginTop:2}}>Images & PDF — max 10 MB each</div>
      </div>
      {docs.length>0 && (
        <div className="mp-doc-list">
          {docs.map((d,i)=>(
            <div key={i} className="mp-doc-item">
              <span style={{fontSize:14}}>📄</span>
              <span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:12}}>{d.name}</span>
              <button className="mp-doc-rm" onClick={()=>rmFile(i,setter)}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  /* step renderer */
  const renderStep = () => {
    /* ── Step 1 ── */
    if (step===1) return (
      <div className="mp-card">
        <div className="mp-card-h1">Business Information</div>
        <div className="mp-card-h2">Basic details about the mill and its owner</div>
        <div className="mp-g2">
          {[
            {label:"Business Name",   key:"businessName",  ph:"Al Rehman Rice Mills",   req:true},
            {label:"Owner Name",      key:"ownerName",     ph:"Muhammad Zain Ali",       req:true},
            {label:"Email Address",   key:"email",         ph:"owner@mill.com",           req:true, type:"email"},
            {label:"Phone (+923…)",   key:"phone",         ph:"+923001234567"},
            {label:"NTN Number",      key:"ntnNumber",     ph:"1234567-8 (optional)"},
            {label:"Business Address",key:"address",       ph:"City, District"},
          ].map(f=>(
            <div key={f.key} className="mp-fld">
              <label className="mp-lbl">{f.label}{f.req&&<em>*</em>}</label>
              <input className="mp-inp" type={f.type||"text"} placeholder={f.ph}
                value={biz[f.key]} onChange={e=>setBiz(p=>({...p,[f.key]:e.target.value}))}/>
            </div>
          ))}
        </div>
        <div className="mp-divider"/>
        <div className="mp-fld">
          <label className="mp-lbl">Mill Logo (optional)</label>
          <div className="mp-drop" style={{minHeight:60}}>
            <input type="file" accept="image/*" onChange={e=>{const f=e.target.files[0];if(f){setLogo(f);setLogoPreview(URL.createObjectURL(f));}}}/>
            {logoPreview
              ? <div style={{display:"flex",alignItems:"center",gap:9}}>
                  <img src={logoPreview} style={{width:38,height:38,objectFit:"cover",borderRadius:6,border:"1px solid #e5e7eb"}}/>
                  <div>
                    <div style={{fontSize:12.5,fontWeight:600,color:"#111827"}}>{logo?.name}</div>
                    <div style={{fontSize:11,color:"#9ca3af"}}>Click to change</div>
                  </div>
                </div>
              : <div style={{fontSize:12.5,color:"#9ca3af"}}>Click to upload a logo image</div>}
          </div>
        </div>
        <div className="mp-wiz-nav">
          <button className="mp-btn-nx" onClick={next}>Next: Security →</button>
        </div>
      </div>
    );

    /* ── Step 2 ── */
    if (step===2) return (
      <div className="mp-card">
        <div className="mp-card-h1">Security Credentials</div>
        <div className="mp-card-h2">CNIC is the login key — password will be emailed to the owner</div>
        <div className="mp-g1">
          <div className="mp-fld">
            <label className="mp-lbl">CNIC (13 digits) <em>*</em></label>
            <input className="mp-inp mono" type="text" inputMode="numeric"
              placeholder="XXXXX-XXXXXXX-X" maxLength={15}
              value={sec.cnic} onChange={handleCnic}/>
            <div className="mp-cnic-dots">
              {Array.from({length:13},(_,i)=>(
                <div key={i} className={`mp-cnic-dot${i<cnicDigs?" on":""}`}/>
              ))}
              <span style={{fontSize:9.5,color:"#9ca3af",marginLeft:5,fontFamily:"'DM Mono',monospace"}}>{cnicDigs}/13</span>
            </div>
            {cnicDigs===13 && <div className="hint-ok">✓ Valid CNIC format</div>}
          </div>
          <div className="mp-fld">
            <label className="mp-lbl">Password <em>*</em></label>
            <div style={{position:"relative"}}>
              <input className="mp-inp" type={showPwd?"text":"password"}
                placeholder="Minimum 8 characters" value={sec.password}
                onChange={e=>setSec(p=>({...p,password:e.target.value}))}
                style={{paddingRight:36}}/>
              <button type="button" onClick={()=>setShowPwd(s=>!s)}
                style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:14}}>
                {showPwd?"🙈":"👁"}
              </button>
            </div>
            {sec.password.length>0 && (
              <>
                <div className="mp-pwd-bars">
                  {[1,2,3,4].map(n=>(
                    <div key={n} className="mp-pwd-bar" style={{background:score>=n?PWD_COLORS[score]:"#f3f4f6"}}/>
                  ))}
                </div>
                <div style={{fontSize:10.5,color:PWD_COLORS[score]||"#9ca3af",marginTop:2,fontWeight:600}}>
                  {PWD_LABELS[score]} {score>=3&&"✓"}
                </div>
              </>
            )}
          </div>
          <div className="mp-fld">
            <label className="mp-lbl">Confirm Password <em>*</em></label>
            <div style={{position:"relative"}}>
              <input className="mp-inp" type={showConf?"text":"password"}
                placeholder="Repeat password" value={sec.confirmPwd}
                onChange={e=>setSec(p=>({...p,confirmPwd:e.target.value}))}
                style={{paddingRight:36}}/>
              <button type="button" onClick={()=>setShowConf(s=>!s)}
                style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#9ca3af",fontSize:14}}>
                {showConf?"🙈":"👁"}
              </button>
            </div>
            {sec.confirmPwd.length>0 && (
              sec.password===sec.confirmPwd
                ? <div className="hint-ok">✓ Passwords match</div>
                : <div className="hint-er">✗ Passwords do not match</div>
            )}
          </div>
        </div>
        <div className="mp-warn" style={{marginTop:13}}>
          🔒 Password is hashed on creation and is <strong>not recoverable</strong>. Store it securely before proceeding. It will be sent to <strong>{biz.email}</strong>.
        </div>
        <div className="mp-wiz-nav">
          <button className="mp-btn-bk" onClick={()=>setStep(1)}>← Back</button>
          <button className="mp-btn-nx" onClick={next}>Next: Company Docs →</button>
        </div>
      </div>
    );

    /* ── Step 3 — Company Docs ── */
    if (step===3) return (
      <div className="mp-card">
        <div className="mp-card-h1">Company Documents</div>
        <div className="mp-card-h2">Upload business registration, NTN certificate, trade license, GST docs (all optional)</div>
        <DocPhase
          title="Business Registration & Licenses"
          hint="NTN certificate · Business registration certificate · Trade license · GST certificate · Chamber of Commerce letter"
          docs={compDocs} setter={setCompDocs}
        />
        <div className="mp-wiz-nav">
          <button className="mp-btn-bk" onClick={()=>setStep(2)}>← Back</button>
          <button className="mp-btn-nx" onClick={next}>Next: Personal Docs →</button>
        </div>
      </div>
    );

    /* ── Step 4 — Personal Docs ── */
    if (step===4) return (
      <div className="mp-card">
        <div className="mp-card-h1">Personal Documents</div>
        <div className="mp-card-h2">Owner's personal identification and verification documents (all optional)</div>
        <DocPhase
          title="Owner ID & Personal Verification"
          hint="CNIC front & back · Owner photograph · Any other personal ID documents"
          docs={persDocs} setter={setPersDocs}
        />
        <div className="mp-wiz-nav">
          <button className="mp-btn-bk" onClick={()=>setStep(3)}>← Back</button>
          <button className="mp-btn-nx" onClick={next}>Next: Package & Plan →</button>
        </div>
      </div>
    );

    /* ── Step 5 ── */
    if (step===5) return (
      <div className="mp-card">
        <div className="mp-card-h1">Package & Payment Plan</div>
        <div className="mp-card-h2">Choose the right plan and configure the setup fee payment</div>

        {/* Package cards */}
        <div className="pkg-grid" style={{marginBottom:18}}>
          {Object.entries(PACKAGES).map(([key,p])=>(
            <div key={key} className={`pkg-c${pkg===key?" sel":""}`}
              style={{"--pc":p.color}} onClick={()=>setPkg(key)}>
              <div className="pkg-accent"/>
              <div className="pkg-chk">
                <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div className="pkg-tier">{p.tier}</div>
              <div className="pkg-name">{p.name}</div>
              <div className="pkg-price">Rs {p.price.toLocaleString()} <span>setup</span></div>
              {p.features.map(f=><div key={f} className="pkg-feat"><span className="pkg-tick">✓</span><span>{f}</span></div>)}
              {p.excludes.map(f=><div key={f} className="pkg-feat"><span className="pkg-x">✗</span><span style={{color:"#d1d5db"}}>{f}</span></div>)}
              <div style={{marginTop:8,paddingTop:8,borderTop:"1px solid #f3f4f6",fontSize:11,color:"#9ca3af"}}>
                Monthly: <strong style={{color:"#374151"}}>Rs {p.monthly.toLocaleString()}</strong>
              </div>
            </div>
          ))}
        </div>

        {pkg && (<>
          <div className="mp-divider"/>
          <div style={{fontSize:12.5,fontWeight:700,color:"#374151",marginBottom:11}}>Payment Plan for Setup Fee</div>
          <div className="pay-type-g">
            {[
              {key:"full",       title:"Full Payment",   desc:`Pay Rs ${pkgInfo.price.toLocaleString()} upfront`},
              {key:"installment",title:"Installments",   desc:"Split into 3, 6, or 12 monthly payments"},
            ].map(t=>(
              <div key={t.key} className={`pay-tc${payType===t.key?" sel":""}`} onClick={()=>setPayType(t.key)}>
                <div className="pay-tc-h">{t.title}</div>
                <div className="pay-tc-d">{t.desc}</div>
              </div>
            ))}
          </div>

          {payType==="installment" && (
            <div className="mp-fld" style={{marginBottom:14}}>
              <label className="mp-lbl">Installment Tenure</label>
              <div style={{display:"flex",gap:7}}>
                {[3,6,12].map(t=>(
                  <button key={t} type="button" onClick={()=>setTenure(t)}
                    style={{flex:1,padding:"9px 6px",borderRadius:6,border:`1.5px solid ${tenure===t?"#111827":"#e5e7eb"}`,background:tenure===t?"#111827":"#fff",color:tenure===t?"#fff":"#6b7280",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:".12s"}}>
                    {t} months
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pay-sum">
            <div style={{fontSize:9.5,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#9ca3af",fontFamily:"'DM Mono',monospace",marginBottom:7}}>
              Payment Summary
            </div>
            {payType==="full" ? (<>
              <div className="pay-sum-row"><span>Setup Fee</span><span style={{fontFamily:"'DM Mono',monospace",fontWeight:700}}>Rs {pkgInfo.price.toLocaleString()}</span></div>
              <div className="pay-sum-row"><span>First Monthly</span><span style={{fontFamily:"'DM Mono',monospace"}}>Rs {pkgInfo.monthly.toLocaleString()}</span></div>
              <div className="pay-sum-row tot"><span>First Payment Due</span><span style={{fontFamily:"'DM Mono',monospace",color:"#15803d"}}>Rs {(pkgInfo.price+pkgInfo.monthly).toLocaleString()}</span></div>
            </>) : (<>
              <div className="pay-sum-row"><span>Per Installment</span><span style={{fontFamily:"'DM Mono',monospace",fontWeight:700}}>Rs {instAmt.toLocaleString()}</span></div>
              <div className="pay-sum-row"><span>Monthly Maintenance</span><span style={{fontFamily:"'DM Mono',monospace"}}>Rs {pkgInfo.monthly.toLocaleString()}</span></div>
              <div className="pay-sum-row tot"><span>Monthly Total</span><span style={{fontFamily:"'DM Mono',monospace",color:"#15803d"}}>Rs {(instAmt+pkgInfo.monthly).toLocaleString()}</span></div>
            </>)}
          </div>
        </>)}

        <div className="mp-info">
          📧 Welcome email with login credentials, package details, and HBL / UBL bank transfer instructions will be automatically sent to <strong>{biz.email}</strong> upon creation.
        </div>

        <div className="mp-wiz-nav">
          <button className="mp-btn-bk" onClick={()=>setStep(4)}>← Back</button>
          <button className={`mp-btn-nx grn`} onClick={submit} disabled={busy||!pkg}>
            {busy ? <><Spin/> Creating Mill…</> : "✓ Create Mill & Send Email"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="mp-wiz">
      <div className="mp-h1">Register New Mill</div>
      <div className="mp-h2">Manually onboard a mill — credentials emailed to the owner on creation</div>

      {/* Stepper */}
      <div className="mp-wiz-steps">
        {STEPS.map((lbl,i)=>{
          const n=i+1; const cls = step>n?"done":step===n?"active":"";
          return (
            <React.Fragment key={i}>
              <div className="mp-wiz-col">
                <div className={`mp-wiz-circle ${cls}`}>
                  {cls==="done"
                    ? <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    : n}
                </div>
                <div className={`mp-wiz-lbl ${cls}`}>{lbl}</div>
              </div>
              {i<STEPS.length-1 && <div className={`mp-wiz-line${step>n?" done":""}`}/>}
            </React.Fragment>
          );
        })}
      </div>

      {renderStep()}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAYMENT ENTRY (expandable)
═══════════════════════════════════════════════════════════════════ */
function PaymentEntry({ payment }) {
  const [open, setOpen] = useState(false);
  const s = PAY_STYLE[payment.category] || PAY_STYLE.other;
  return (
    <div className="mp-pe" onClick={()=>setOpen(o=>!o)}>
      <div className="mp-pe-top">
        <span className="mp-pe-cat" style={{background:s.bg,color:s.color,borderColor:s.border}}>{s.label}</span>
        <span className="mp-pe-amt">{fmtPKR(payment.amount)}</span>
        <span className="mp-pe-date">{fmtDate(payment.paidDate)}</span>
        <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2.5}
          style={{flexShrink:0,transition:"transform .14s",transform:open?"rotate(180deg)":"none"}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
      {open && (
        <div className="mp-pe-body">
          {payment.tid           && <div className="mp-pe-row">TID: <span>{payment.tid}</span></div>}
          {payment.senderBank    && <div className="mp-pe-row">From: <span>{payment.senderBank}</span></div>}
          {payment.receivingBank && <div className="mp-pe-row">To: <span>{payment.receivingBank}</span></div>}
          {payment.senderTitle   && <div className="mp-pe-row">Sender: <span>{payment.senderTitle}</span></div>}
          {payment.senderAccount && <div className="mp-pe-row">A/C: <span style={{fontFamily:"'DM Mono',monospace"}}>{payment.senderAccount}</span></div>}
          {payment.notes         && <div className="mp-pe-row">Notes: <span>{payment.notes}</span></div>}
          <div className="mp-pe-row">Recorded: <span>{fmtFull(payment.recordedAt)}</span></div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   RECORD PAYMENT FORM
═══════════════════════════════════════════════════════════════════ */
function RecordPaymentForm({ mill, onSaved, showToast, onClose }) {
  const [cat,           setCat]           = useState("monthly");
  const [tid,           setTid]           = useState("");
  const [amount,        setAmount]        = useState("7500");
  const [notes,         setNotes]         = useState("");
  const [senderBank,    setSenderBank]    = useState("");
  const [senderTitle,   setSenderTitle]   = useState("");
  const [senderAcc,     setSenderAcc]     = useState("");
  const [receivingBank, setReceivingBank] = useState("HBL");
  const [paidDate,      setPaidDate]      = useState(new Date().toISOString().split("T")[0]);
  const [busy,          setBusy]          = useState(false);

  const defaultAmt = {monthly:7500, full_package:mill.packagePrice||0, installment:0, other:0};
  useEffect(()=>{ setAmount(String(defaultAmt[cat]||"")); },[cat]);

  const submit = async () => {
    if (!tid.trim())    return showToast("Transaction ID is required",false);
    if (!Number(amount)) return showToast("Enter a valid amount",false);
    setBusy(true);
    try {
      const body = {
        paymentCategory:cat, tid, amount:Number(amount), notes, paidDate,
        senderBank, senderTitle, senderAccount:senderAcc, receivingBank,
      };
      const r = await authFetch(`${API_BASE_URL}/master/mills/${mill.millId}/record-payment`,
        { method:"POST", body:JSON.stringify(body) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message);
      showToast("Payment recorded ✓",true);
      onSaved && onSaved(d.mill);
      onClose && onClose();
    } catch(e) { showToast(e.message,false); }
    setBusy(false);
  };

  const Row = ({children}) => <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>{children}</div>;
  const F = ({lbl,children}) => <div className="mp-fld"><label className="pf-lbl">{lbl}</label>{children}</div>;

  return (
    <div className="mp-pay-form">
      <div className="mp-pay-form-hd">+ Record Payment</div>
      <div style={{marginBottom:8}} className="mp-fld">
        <label className="pf-lbl">Payment Category</label>
        <select className="pf-sel" value={cat} onChange={e=>setCat(e.target.value)}>
          <option value="monthly">Monthly Maintenance — Rs 7,500</option>
          {mill.paymentType==="installment"&&<option value="installment">Package Installment</option>}
          {mill.paymentType==="full"&&<option value="full_package">Package Full Payment</option>}
          <option value="other">Other</option>
        </select>
      </div>
      <Row>
        <F lbl="Transaction ID *"><input className="pf-inp mono" placeholder="TID / Ref" value={tid} onChange={e=>setTid(e.target.value)}/></F>
        <F lbl="Amount (Rs)"><input className="pf-inp mono" type="number" value={amount} onChange={e=>setAmount(e.target.value)}/></F>
      </Row>
      <Row>
        <F lbl="Sender Bank"><input className="pf-inp" placeholder="e.g. UBL" value={senderBank} onChange={e=>setSenderBank(e.target.value)}/></F>
        <F lbl="Received Into">
          <select className="pf-sel" value={receivingBank} onChange={e=>setReceivingBank(e.target.value)}>
            <option value="HBL">HBL — ALI RAZA SALEEM</option>
            <option value="UBL">UBL — MUHAMMAD ZAIN ALI</option>
          </select>
        </F>
      </Row>
      <Row>
        <F lbl="Sender Name"><input className="pf-inp" placeholder="Account holder" value={senderTitle} onChange={e=>setSenderTitle(e.target.value)}/></F>
        <F lbl="Sender A/C"><input className="pf-inp mono" placeholder="Account no." value={senderAcc} onChange={e=>setSenderAcc(e.target.value)}/></F>
      </Row>
      <Row>
        <F lbl="Date Paid"><input className="pf-inp" type="date" value={paidDate} onChange={e=>setPaidDate(e.target.value)}/></F>
        <F lbl="Notes"><input className="pf-inp" placeholder="Optional" value={notes} onChange={e=>setNotes(e.target.value)}/></F>
      </Row>
      <div style={{display:"flex",gap:7,marginTop:4}}>
        <button className="mp-btn-bk" style={{padding:"7px 13px",fontSize:12}} onClick={onClose}>Cancel</button>
        <button className="mp-btn-nx grn" style={{padding:"7px 13px",fontSize:12}} onClick={submit} disabled={busy}>
          {busy?<><Spin/> Saving…</>:"✓ Record Payment"}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MILL DETAIL PANEL
═══════════════════════════════════════════════════════════════════ */
function MillPanel({ mill:initMill, acting, onAction, onClose, onSaveBilling, showToast }) {
  const [mill,        setMill]        = useState(initMill);
  const [billing,     setBilling]     = useState(initMill.billingDate?new Date(initMill.billingDate).toISOString().split("T")[0]:"");
  const [showPayForm, setShowPayForm] = useState(false);
  const [pwdVis,      setPwdVis]      = useState(false);
  const [showReset,   setShowReset]   = useState(false);
  const [resetPwd,    setResetPwd]    = useState("");
  const [resetBusy,   setResetBusy]   = useState(false);

  useEffect(()=>{
    setMill(initMill);
    setBilling(initMill.billingDate?new Date(initMill.billingDate).toISOString().split("T")[0]:"");
    setShowPayForm(false); setPwdVis(false); setShowReset(false); setResetPwd("");
  },[initMill]);

  const pkg      = PACKAGES[mill.plan]||{};
  const busyNow  = acting===mill.millId;
  const payments = [...(mill.payments||[])].sort((a,b)=>new Date(b.paidDate)-new Date(a.paidDate));
  const docs     = mill.documents||[];
  const logoSrc  = fileUrl(mill.logoUrl);
  const totalPaid= payments.reduce((s,p)=>s+(p.amount||0),0);

  const doReset = async () => {
    if (!resetPwd||resetPwd.length<8) return showToast("Password must be at least 8 characters",false);
    setResetBusy(true);
    try {
      const r = await authFetch(`${API_BASE_URL}/master/mills/${mill.millId}/reset-password`,
        { method:"POST", body:JSON.stringify({newPassword:resetPwd}) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message);
      showToast("Password reset successfully ✓",true);
      setShowReset(false); setResetPwd("");
    } catch(e) { showToast(e.message,false); }
    setResetBusy(false);
  };

  return (
    <div className="mp-panel">
      {/* Header */}
      <div className="mp-ph" style={{position:"relative"}}>
        <button className="mp-ph-close" onClick={onClose}>✕</button>
        <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:8}}>
          {logoSrc && <img src={logoSrc} alt="logo" className="mp-mill-logo" onError={e=>{e.target.style.display="none";}}/>}
          <div>
            <div className="mp-ph-name">{mill.businessName}</div>
            <div style={{fontSize:10,color:"#9ca3af",fontFamily:"'DM Mono',monospace"}}>{mill.millId}</div>
          </div>
        </div>
        <div className="mp-ph-meta">
          <Badge status={mill.approvalStatus}/>
          {mill.plan&&<span className="t-pkg" style={{color:pkg.color||"#374151",borderColor:(pkg.color||"#374151")+"33",background:(pkg.color||"#374151")+"10"}}>{pkg.tier||mill.plan}</span>}
          <span style={{fontSize:10,color:mill.isActive?"#15803d":"#9ca3af",fontFamily:"'DM Mono',monospace",fontWeight:600}}>
            {mill.isActive?"● Live":"○ Inactive"}
          </span>
        </div>
      </div>

      <div className="mp-pb">

        {/* ── Admin Credentials ── */}
        <div className="mp-sec">
          <div className="mp-sec-hd">Admin Credentials</div>
          <div className="mp-cred">
            {/* CNIC */}
            <div className="mp-cred-row">
              <div>
                <div className="mp-cred-lbl">Login CNIC</div>
                <div className="mp-cred-val">
                  {mill.adminCnic
                    ? `${mill.adminCnic.slice(0,5)}-${mill.adminCnic.slice(5,12)}-${mill.adminCnic.slice(12)}`
                    : "—"}
                </div>
              </div>
              <button className="mp-cred-copy" onClick={()=>copy(mill.adminCnic||"",showToast)}>Copy</button>
            </div>
            {/* Password */}
            <div className="mp-cred-row">
              <div>
                <div className="mp-cred-lbl">Password</div>
                <div className={`mp-cred-val${pwdVis?"":" muted"}`}>
                  {pwdVis
                    ? (mill.plainPassword || "[hashed — not recoverable after creation]")
                    : "••••••••••••••"}
                </div>
              </div>
              <button className="mp-reveal" onClick={()=>setPwdVis(v=>!v)}>
                {pwdVis?"Hide":"Show"}
              </button>
            </div>
            {/* Email */}
            <div className="mp-cred-row">
              <div>
                <div className="mp-cred-lbl">Email</div>
                <div className="mp-cred-val dim">{mill.email}</div>
              </div>
              <button className="mp-cred-copy" onClick={()=>copy(mill.email||"",showToast)}>Copy</button>
            </div>
          </div>

          {/* Reset password */}
          {!showReset
            ? <button onClick={()=>setShowReset(true)}
                style={{width:"100%",padding:"7px 11px",borderRadius:6,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:".1s",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#d1d5db";e.currentTarget.style.background="#f9fafb";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#e5e7eb";e.currentTarget.style.background="#fff";}}>
                🔑 Reset Admin Password
              </button>
            : <div className="mp-reset-box">
                <div className="mp-reset-title">Reset Password</div>
                <div className="mp-reset-row">
                  <input className="pf-inp mono" type="text" placeholder="New password (min 8 chars)"
                    style={{flex:1,padding:"7px 10px",borderRadius:6,border:"1px solid #fecaca",background:"#fff",fontSize:12.5,fontFamily:"'DM Mono',monospace",outline:"none",color:"#111827"}}
                    value={resetPwd} onChange={e=>setResetPwd(e.target.value)}/>
                  <button onClick={doReset} disabled={resetBusy}
                    style={{padding:"7px 12px",background:"#dc2626",border:"none",borderRadius:6,color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap",marginLeft:5}}>
                    {resetBusy?"…":"Set"}
                  </button>
                  <button onClick={()=>{setShowReset(false);setResetPwd("");}}
                    style={{padding:"7px 9px",background:"#fff",border:"1px solid #e5e7eb",borderRadius:6,color:"#6b7280",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",marginLeft:5}}>
                    ✕
                  </button>
                </div>
              </div>
          }
        </div>

        {/* ── Business Info ── */}
        <div className="mp-sec">
          <div className="mp-sec-hd">Business & Owner</div>
          <div className="mp-ig">
            {[
              {k:"Owner",       v:mill.ownerName,                      mono:false},
              {k:"Phone",       v:mill.phone||"—",                     mono:false},
              {k:"NTN",         v:mill.ntnNumber||"—",                 mono:true},
              {k:"Package",     v:pkg.name||mill.plan||"—",            mono:false},
              {k:"Pay Type",    v:mill.paymentType==="full"?"Full Payment":"Installments", mono:false},
              {k:"Tenure",      v:mill.installmentTenure?`${mill.installmentTenure} months`:"—", mono:false},
              {k:"Registered",  v:fmtDate(mill.createdAt),             mono:false},
              {k:"Activated",   v:mill.activatedAt?fmtDate(mill.activatedAt):"Not yet", mono:false},
              {k:"Billing Date",v:fmtDate(mill.billingDate),           mono:false},
              {k:"Plan Expiry", v:fmtDate(mill.planExpiry),            mono:false},
            ].map(f=>(
              <div key={f.k} className="mp-if">
                <div className="mp-ik">{f.k}</div>
                <div className={`mp-iv${f.mono?" mono":""}`}>{f.v||"—"}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Documents ── */}
        <div className="mp-sec">
          <div className="mp-sec-hd">Documents<span className="mp-sec-cnt">{docs.length}</span></div>
          {docs.length===0
            ? <div style={{fontSize:12,color:"#9ca3af",padding:"6px 0"}}>No documents uploaded</div>
            : <div className="mp-doc-grid">
                {docs.map((doc,i)=>{
                  const u    = fileUrl(doc.fileUrl);
                  const isImg= /\.(png|jpg|jpeg|webp|gif)$/i.test(doc.fileUrl||"");
                  return (
                    <a key={i} href={u||"#"} target="_blank" rel="noreferrer" className="mp-doc-card">
                      {isImg&&u
                        ? <img src={u} alt={doc.name} className="mp-doc-thumb" onError={e=>{e.target.style.display="none";}}/>
                        : <div style={{height:42,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:4}}>📄</div>}
                      <div className="mp-doc-name">{doc.name||`Doc ${i+1}`}</div>
                    </a>
                  );
                })}
              </div>
          }
        </div>

        {/* ── Payment History ── */}
        <div className="mp-sec">
          <div className="mp-sec-hd">
            Payment History
            <span className="mp-sec-cnt">{payments.length}</span>
            <span style={{marginLeft:"auto",fontFamily:"'DM Mono',monospace",fontSize:11,color:"#15803d",fontWeight:600}}>
              Rs {totalPaid.toLocaleString()}
            </span>
          </div>
          {payments.length===0
            ? <div className="mp-no-pay">No payments recorded yet</div>
            : payments.slice(0,10).map((p,i)=><PaymentEntry key={i} payment={p}/>)
          }
          {!showPayForm
            ? <button className="mp-rec-btn" onClick={()=>setShowPayForm(true)}>+ Record Payment</button>
            : <RecordPaymentForm mill={mill} showToast={showToast}
                onSaved={upd=>setMill(m=>({...m,...upd}))}
                onClose={()=>setShowPayForm(false)}/>
          }
        </div>

        {/* ── Billing Date ── */}
        <div className="mp-sec">
          <div className="mp-sec-hd">Billing Date</div>
          <div className="mp-bill-row">
            <input type="date" value={billing} onChange={e=>setBilling(e.target.value)}/>
            <button onClick={()=>onSaveBilling(mill.millId, billing)}>Update</button>
          </div>
        </div>

      </div>

      {/* Actions */}
      <div className="mp-pact">
        {mill.approvalStatus==="pending"    && <button className="mp-pa mp-pa-app" disabled={busyNow} onClick={()=>onAction(mill.millId,"approve")}>✓ {busyNow?"…":"Approve"}</button>}
        {mill.approvalStatus==="approved"   && <button className="mp-pa mp-pa-res" disabled={busyNow} onClick={()=>onAction(mill.millId,"restrict")}>🚫 {busyNow?"…":"Restrict"}</button>}
        {mill.approvalStatus==="restricted" && <button className="mp-pa mp-pa-unr" disabled={busyNow} onClick={()=>onAction(mill.millId,"unrestrict")}>✅ {busyNow?"…":"Restore"}</button>}
        <button className="mp-pa mp-pa-del" onClick={()=>{ if(window.confirm(`Permanently delete "${mill.businessName}"?`)) onAction(mill.millId,"delete"); }}>🗑</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   VIEW MILLS
═══════════════════════════════════════════════════════════════════ */
function ViewMills({ mills, loading, filter, setFilter, search, setSearch, selected, setSelected, acting, onAction, onSaveBilling, showToast }) {
  const tabCls = f => {
    if (filter!==f) return "mp-tab";
    if (f==="pending")    return "mp-tab on-p";
    if (f==="restricted") return "mp-tab on-r";
    return "mp-tab on";
  };

  const openPanel = async mill => {
    try {
      const r = await authFetch(`${API_BASE_URL}/master/mills/${mill.millId}`);
      const d = await r.json();
      if (r.ok) setSelected(d); else setSelected(mill);
    } catch { setSelected(mill); }
  };

  return (
    <div>
      <div className="mp-h1">Mill Management</div>
      <div className="mp-h2">Click any row to open the full detail panel — approve, restrict, manage payments</div>
      <div className="mp-split">
        <div className="mp-split-L">
          <div className="mp-toolbar">
            <div className="mp-srch">
              <span className="mp-srch-ico">
                <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
              </span>
              <input placeholder="Search mill name, owner, email…" value={search} onChange={e=>setSearch(e.target.value)}/>
            </div>
            {["all","pending","approved","restricted"].map(f=>(
              <button key={f} className={tabCls(f)} onClick={()=>setFilter(f)}>
                {f==="all"?"All":f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            ))}
          </div>
          <div className="mp-tbl-wrap">
            {loading
              ? <div className="mp-empty">Loading mills…</div>
              : mills.length===0
                ? <div className="mp-empty">No mills match your filter.</div>
                : <table>
                    <thead>
                      <tr><th>Business</th><th>Owner</th><th>Package</th><th>Status</th><th>Billing</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {mills.map(m=>(
                        <tr key={m._id} className={selected?.millId===m.millId?"sel":""} onClick={()=>openPanel(m)}>
                          <td>
                            <div className="t-biz">{m.businessName}</div>
                            <div className="t-id">{m.millId}</div>
                          </td>
                          <td className="t-dim">{m.ownerName}</td>
                          <td>
                            {m.plan&&<span className="t-pkg" style={{color:PACKAGES[m.plan]?.color||"#374151",borderColor:(PACKAGES[m.plan]?.color||"#374151")+"33",background:(PACKAGES[m.plan]?.color||"#374151")+"10"}}>
                              {PACKAGES[m.plan]?.tier||m.plan}
                            </span>}
                          </td>
                          <td><Badge status={m.approvalStatus}/></td>
                          <td className="t-dim">{fmtDate(m.billingDate)}</td>
                          <td onClick={e=>e.stopPropagation()}>
                            <div className="qbtns">
                              {m.approvalStatus==="pending"    && <button className="qbtn qbtn-app" disabled={acting===m.millId} onClick={()=>onAction(m.millId,"approve")}>{acting===m.millId?"…":"Approve"}</button>}
                              {m.approvalStatus==="approved"   && <button className="qbtn qbtn-res" disabled={acting===m.millId} onClick={()=>onAction(m.millId,"restrict")}>Restrict</button>}
                              {m.approvalStatus==="restricted" && <button className="qbtn qbtn-unr" disabled={acting===m.millId} onClick={()=>onAction(m.millId,"unrestrict")}>Restore</button>}
                              <button className="qbtn qbtn-del" onClick={()=>{ if(window.confirm(`Delete ${m.businessName}?`)) onAction(m.millId,"delete"); }}>🗑</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
            }
          </div>
        </div>
        <div className="mp-split-R">
          {selected
            ? <MillPanel mill={selected} acting={acting} onAction={onAction}
                onClose={()=>setSelected(null)} onSaveBilling={onSaveBilling} showToast={showToast}/>
            : <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:280,color:"#9ca3af",fontSize:13,textAlign:"center",gap:9,background:"#fff",border:"1px solid #e5e7eb",borderRadius:8}}>
                <svg width={36} height={36} fill="none" viewBox="0 0 24 24" stroke="#e5e7eb" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
                Select a mill row to view full details
              </div>
          }
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SUPPORT
═══════════════════════════════════════════════════════════════════ */
function Support({ showToast }) {
  const [requests, setRequests] = useState([]);
  const [stats,    setStats]    = useState({});
  const [type,     setType]     = useState("all");
  const [loading,  setLoading]  = useState(true);
  const [updating, setUpdating] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const p = new URLSearchParams();
    if (type!=="all") p.set("type",type);
    const r = await authFetch(`${API_BASE_URL}/master/support?${p}`);
    const d = await r.json();
    if (r.ok) { setRequests(d.requests||[]); setStats(d.stats||{}); }
    setLoading(false);
  },[type]);
  useEffect(()=>{ load(); },[load]);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    const r = await authFetch(`${API_BASE_URL}/master/support/${id}`,{method:"PUT",body:JSON.stringify({status})});
    const d = await r.json();
    if (r.ok) { showToast("Status updated",true); load(); } else showToast(d.message,false);
    setUpdating("");
  };

  const typeIcon  = {complaint:"🚨",feedback:"💬",deletion_request:"🗑️"};
  const statusCls = {open:"req-open",in_review:"req-review",resolved:"req-resolved"};

  return (
    <div>
      <div className="mp-h1">Support Inbox</div>
      <div className="mp-h2">Complaints, feedback, and deletion requests from mill admins</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
        {[
          {lbl:"Complaints",  cnt:stats.complaints||0, ac:"#dc2626"},
          {lbl:"Feedback",    cnt:stats.feedback||0,   ac:"#1d4ed8"},
          {lbl:"Deletions",   cnt:stats.deletions||0,  ac:"#d97706"},
          {lbl:"Open",        cnt:stats.open||0,       ac:"#15803d"},
        ].map(s=>(
          <div key={s.lbl} className="mp-sc" style={{"--ac":s.ac}}>
            <div className="mp-sc-lbl">{s.lbl}</div>
            <div className="mp-sc-num">{s.cnt}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:7,marginBottom:13,flexWrap:"wrap",alignItems:"center"}}>
        {["all","complaint","feedback","deletion_request"].map(t=>(
          <button key={t} className={`mp-tab${type===t?" on":""}`} onClick={()=>setType(t)}>
            {t==="all"?"All":t==="deletion_request"?"Deletions":t.charAt(0).toUpperCase()+t.slice(1)+"s"}
          </button>
        ))}
        <button className="mp-tab" onClick={load} style={{marginLeft:"auto"}}>⟳ Refresh</button>
      </div>
      {loading
        ? <div className="mp-empty">Loading…</div>
        : requests.length===0
          ? <div className="mp-empty">No requests found.</div>
          : requests.map(req=>(
              <div key={req._id} className="mp-req">
                <div className="mp-req-top">
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3,flexWrap:"wrap"}}>
                      <span>{typeIcon[req.type]||"📋"}</span>
                      <span className="mp-req-sub">{req.subject}</span>
                      <span className={`mp-req-st ${statusCls[req.status]||"req-open"}`}>{req.status?.replace("_"," ")}</span>
                    </div>
                    <div className="mp-req-mill">🏭 {req.businessName||req.millId} · {fmtFull(req.createdAt)}</div>
                  </div>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                    {req.status!=="resolved"&&(<>
                      {req.status==="open"&&(
                        <button className="qbtn" style={{background:"#f0fdf4",color:"#15803d",borderColor:"#bbf7d0",fontSize:11}}
                          disabled={updating===req._id} onClick={()=>updateStatus(req._id,"in_review")}>
                          Mark In Review
                        </button>
                      )}
                      <button className="qbtn qbtn-app" style={{fontSize:11}} disabled={updating===req._id}
                        onClick={()=>updateStatus(req._id,"resolved")}>
                        ✓ Resolve
                      </button>
                    </>)}
                  </div>
                </div>
                <div className="mp-req-body">{req.message}</div>
                {req.masterNotes&&<div style={{marginTop:5,fontSize:11.5,color:"#9ca3af",fontStyle:"italic"}}>Note: {req.masterNotes}</div>}
              </div>
            ))
      }
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════ */
export default function MasterPortal() {
  const navigate = useNavigate();
  const [section,      setSection]      = useState("dashboard");
  const [mills,        setMills]        = useState([]);
  const [stats,        setStats]        = useState({total:0,pending:0,approved:0,restricted:0});
  const [loading,      setLoading]      = useState(true);
  const [filter,       setFilter]       = useState("all");
  const [search,       setSearch]       = useState("");
  const [selected,     setSelected]     = useState(null);
  const [acting,       setActing]       = useState("");
  const [toast,        setToast]        = useState(null);
  const [supportOpen,  setSupportOpen]  = useState(0);
  const searchTimer = useRef(null);

  const showToast = (msg, ok=true) => {
    setToast({msg,ok}); setTimeout(()=>setToast(null),3800);
  };

  const fetchMills = useCallback(async (q=search, f=filter) => {
    setLoading(true);
    try {
      const p = new URLSearchParams();
      if (f!=="all")  p.set("status",f);
      if (q.trim())   p.set("search",q.trim());
      const r = await authFetch(`${API_BASE_URL}/master/mills?${p}`);
      if (r.status===401||r.status===403) { localStorage.clear(); navigate("/"); return; }
      const d = await r.json();
      setMills(d.mills||[]); setStats(d.stats||{});
    } catch { showToast("Failed to load mills",false); }
    setLoading(false);
  },[filter, navigate]);

  useEffect(()=>{ fetchMills(search,filter); },[filter]);
  useEffect(()=>{
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(()=>fetchMills(search,filter),350);
  },[search]);
  useEffect(()=>{
    const iv = setInterval(()=>fetchMills(search,filter), 30000);
    return ()=>clearInterval(iv);
  },[filter,search]);
  useEffect(()=>{
    authFetch(`${API_BASE_URL}/master/support?status=open`)
      .then(r=>r.json()).then(d=>setSupportOpen(d.stats?.open||0)).catch(()=>{});
  },[]);

  const doAction = async (millId, action, body={}) => {
    setActing(millId);
    try {
      const method = action==="delete"?"DELETE":"POST";
      const url    = action==="delete"
        ? `${API_BASE_URL}/master/mills/${millId}`
        : `${API_BASE_URL}/master/mills/${millId}/${action}`;
      const r = await authFetch(url,{method,body:method==="POST"?JSON.stringify(body):undefined});
      const d = await r.json();
      showToast(d.message||"Done ✓",true);
      if (action==="delete") setSelected(null);
      else if (selected?.millId===millId) {
        const r2 = await authFetch(`${API_BASE_URL}/master/mills/${millId}`);
        if (r2.ok) setSelected(await r2.json());
      }
      fetchMills(search,filter);
    } catch { showToast("Action failed",false); }
    setActing("");
  };

  const saveBilling = (millId, date) => { if (!date) return; doAction(millId,"billing-date",{billingDate:date}); };
  const sendReminders = async () => {
    try {
      const r = await authFetch(`${API_BASE_URL}/master/send-reminders`,{method:"POST"});
      const d = await r.json();
      showToast(d.message||"Reminders sent ✓",true);
    } catch { showToast("Failed to send reminders",false); }
  };

  const NAV = [
    {id:"dashboard",label:"Dashboard",
      icon:<svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x={3} y={3} width={7} height={7} rx={1}/><rect x={14} y={3} width={7} height={7} rx={1}/><rect x={3} y={14} width={7} height={7} rx={1}/><rect x={14} y={14} width={7} height={7} rx={1}/></svg>},
    {id:"register", label:"Register Mill",
      icon:<svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>},
    {id:"mills",    label:"View Mills", badge:stats.pending||0,
      icon:<svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>},
    {id:"support",  label:"Support", badge:supportOpen, badgeRed:true,
      icon:<svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>},
  ];

  return (
    <>
      <style>{FONTS}{CSS}</style>
      <div className="mp">

        {/* Topbar */}
        <div className="mp-bar">
          <div className="mp-logo">
            <span className="mp-logo-w">Agro</span>
            <span className="mp-logo-p">P</span>
            <span className="mp-logo-w">lus</span>
            <span className="mp-logo-plus">+</span>
          </div>
          <div className="mp-chip">Master Portal</div>
          <div className="mp-bar-sep"/>
          <div className="mp-bar-org">ORCA TECH. AND VENTURES</div>
          <button className="mp-bar-out" onClick={()=>{localStorage.clear();navigate("/");}}>Sign Out</button>
        </div>

        <div className="mp-body">

          {/* Sidebar */}
          <aside className="mp-side">
            <div className="mp-side-lbl">Navigation</div>
            {NAV.map(item=>(
              <button key={item.id} className={`mp-nav${section===item.id?" on":""}`} onClick={()=>setSection(item.id)}>
                <span className="mp-nav-ico">{item.icon}</span>
                <span style={{flex:1}}>{item.label}</span>
                {(item.badge||0)>0 && <span className={`mp-nav-badge${item.badgeRed?" red":""}`}>{item.badge}</span>}
              </button>
            ))}
            <div className="mp-side-lbl" style={{marginTop:16}}>Tools</div>
            <button className="mp-nav" onClick={sendReminders}>
              <span className="mp-nav-ico">
                <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              </span>
              Send Billing Reminders
            </button>
            <button className="mp-nav" onClick={()=>fetchMills(search,filter)}>
              <span className="mp-nav-ico">
                <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              </span>
              Refresh Data
            </button>

            <div className="mp-side-foot">
              <div className="mp-side-foot-txt">
                ORCA TECH. AND VENTURES<br/>
                <span style={{color:"#d1d5db"}}>© {new Date().getFullYear()} Agro Plus</span>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="mp-main">
            {section==="dashboard" && <DashboardSection stats={stats} mills={mills}/>}
            {section==="register"  && <RegisterMill showToast={showToast} onCreated={()=>{ fetchMills(); setSection("mills"); }}/>}
            {section==="mills"     && <ViewMills mills={mills} loading={loading} filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} selected={selected} setSelected={setSelected} acting={acting} onAction={doAction} onSaveBilling={saveBilling} showToast={showToast}/>}
            {section==="support"   && <Support showToast={showToast}/>}
          </main>

        </div>

        {toast && <Toast msg={toast.msg} ok={toast.ok}/>}
      </div>
    </>
  );
}