// src/components/master/masterStyles.js
// Shared CSS, fonts, constants for the Master Portal

export const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

export const CSS = `
@keyframes mp-up   {from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes mp-in   {from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:none}}
@keyframes mp-spin {to{transform:rotate(360deg)}}
@keyframes mp-fade {from{opacity:0}to{opacity:1}}

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body,#root{height:100%;}
.mp{min-height:100vh;background:#f3f4f6;font-family:'DM Sans',sans-serif;color:#111827;display:flex;flex-direction:column;}

/* ── TOP BAR ── */
.mp-bar{height:54px;display:flex;align-items:center;gap:12px;padding:0 22px;background:#111827;position:sticky;top:0;z-index:400;flex-shrink:0;box-shadow:0 2px 12px rgba(0,0,0,.3);}
.mp-logo{font-size:16px;font-weight:800;letter-spacing:-.2px;display:flex;align-items:baseline;gap:0;}
.mp-logo-g{color:#fff;}.mp-logo-p{color:#4ade80;}
.mp-chip{background:rgba(74,222,128,.12);color:#4ade80;font-size:9px;font-weight:700;padding:3px 9px;border-radius:4px;letter-spacing:.12em;text-transform:uppercase;font-family:'DM Mono',monospace;border:1px solid rgba(74,222,128,.2);}
.mp-bar-sep{flex:1;}
.mp-bar-sub{font-size:10.5px;color:rgba(255,255,255,.25);font-family:'DM Mono',monospace;}
.mp-bar-btn{padding:6px 14px;border-radius:6px;font-size:12px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:.12s;border:1px solid;}
.mp-bar-out{background:rgba(239,68,68,.1);border-color:rgba(239,68,68,.2);color:#f87171;}
.mp-bar-out:hover{background:rgba(239,68,68,.2);color:#fca5a5;}

/* ── LAYOUT ── */
.mp-body{display:flex;flex:1;overflow:hidden;height:calc(100vh - 54px);}

/* ── SIDEBAR ── */
.mp-side{width:216px;flex-shrink:0;background:#fff;border-right:1px solid #e5e7eb;display:flex;flex-direction:column;overflow-y:auto;padding:12px 8px;}
.mp-side::-webkit-scrollbar{width:3px;}
.mp-side::-webkit-scrollbar-thumb{background:#e5e7eb;border-radius:3px;}
.mp-side-lbl{font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#9ca3af;padding:0 10px;margin:14px 0 5px;font-family:'DM Mono',monospace;}
.mp-nav{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:7px;cursor:pointer;color:#6b7280;font-size:13px;font-weight:500;transition:.1s;border:1px solid transparent;width:100%;background:none;text-align:left;font-family:'DM Sans',sans-serif;}
.mp-nav:hover{background:#f9fafb;color:#111827;}
.mp-nav.on{background:#f0fdf4;color:#15803d;border-color:#bbf7d0;font-weight:700;}
.mp-nav-ico{width:18px;height:18px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.mp-nav-badge{margin-left:auto;background:#fffbeb;color:#d97706;font-size:9px;font-weight:700;padding:1px 6px;border-radius:4px;font-family:'DM Mono',monospace;border:1px solid #fde68a;}
.mp-nav-badge.red{background:#fef2f2;color:#dc2626;border-color:#fecaca;}
.mp-side-foot{margin-top:auto;padding:12px 8px 6px;border-top:1px solid #f3f4f6;font-size:9px;color:#9ca3af;text-align:center;font-family:'DM Mono',monospace;line-height:1.7;}

/* ── MAIN ── */
.mp-main{flex:1;overflow-y:auto;padding:22px 24px;min-width:0;}
.mp-main::-webkit-scrollbar{width:4px;}
.mp-main::-webkit-scrollbar-thumb{background:#e5e7eb;border-radius:4px;}
.mp-page-h{font-size:20px;font-weight:700;color:#111827;letter-spacing:-.3px;margin-bottom:2px;}
.mp-page-sub{font-size:12.5px;color:#9ca3af;margin-bottom:18px;}

/* ── STAT CARDS ── */
.mp-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px;}
.mp-sc{background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:14px 16px;position:relative;overflow:hidden;}
.mp-sc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--ac,#e5e7eb);}
.mp-sc-lbl{font-size:9.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#9ca3af;font-family:'DM Mono',monospace;margin-bottom:5px;}
.mp-sc-num{font-family:'DM Mono',monospace;font-size:26px;font-weight:700;line-height:1;color:var(--ac,#374151);}
.mp-sc-sub{font-size:11px;color:#9ca3af;margin-top:4px;}

/* ── BADGES ── */
.badge{display:inline-flex;align-items:center;gap:4px;border-radius:4px;padding:2px 8px;font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;font-family:'DM Mono',monospace;border:1px solid;}
.badge-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0;}
.badge-pending{background:#fffbeb;color:#d97706;border-color:#fde68a;}.badge-pending .badge-dot{background:#f59e0b;}
.badge-approved{background:#f0fdf4;color:#15803d;border-color:#bbf7d0;}.badge-approved .badge-dot{background:#22c55e;}
.badge-restricted{background:#fef2f2;color:#dc2626;border-color:#fecaca;}.badge-restricted .badge-dot{background:#ef4444;}

/* ── TABLE ── */
.mp-card{background:#fff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;}
.mp-card-hd{padding:12px 16px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:700;color:#111827;display:flex;align-items:center;justify-content:space-between;gap:8px;}
.mp-toolbar{display:flex;gap:7px;margin-bottom:12px;flex-wrap:wrap;align-items:center;}
.mp-srch{flex:1;min-width:180px;position:relative;}
.mp-srch-ico{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:#9ca3af;pointer-events:none;display:flex;}
.mp-srch input{width:100%;padding:8px 12px 8px 32px;background:#fff;border:1px solid #e5e7eb;border-radius:7px;font-size:13px;color:#111827;font-family:'DM Sans',sans-serif;outline:none;transition:.12s;}
.mp-srch input:focus{border-color:#6b7280;box-shadow:0 0 0 2px rgba(107,114,128,.1);}
.mp-tab-btn{padding:7px 13px;border-radius:7px;border:1px solid #e5e7eb;background:#fff;font-size:12px;font-weight:600;color:#6b7280;font-family:'DM Sans',sans-serif;cursor:pointer;transition:.1s;white-space:nowrap;}
.mp-tab-btn:hover{border-color:#d1d5db;color:#111827;}
.mp-tab-btn.on{background:#111827;border-color:#111827;color:#fff;}
.mp-tab-btn.on-warn{background:#fffbeb;border-color:#fde68a;color:#d97706;}
.mp-tab-btn.on-err{background:#fef2f2;border-color:#fecaca;color:#dc2626;}
.mp-tbl-wrap{border-radius:0;overflow:hidden;}
table{width:100%;border-collapse:collapse;}
thead th{padding:9px 14px;text-align:left;font-size:9.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#9ca3af;background:#f9fafb;border-bottom:1px solid #e5e7eb;font-family:'DM Mono',monospace;white-space:nowrap;}
tbody tr{border-bottom:1px solid #f9fafb;transition:background .08s;}
tbody tr:hover{background:#fafafa;}
tbody tr.selected{background:#f0fdf4!important;border-bottom-color:#dcfce7;}
tbody tr:last-child{border-bottom:none;}
tbody td{padding:10px 14px;font-size:13px;vertical-align:middle;}
.t-biz{font-weight:700;color:#111827;font-size:13px;line-height:1.3;}
.t-id{font-family:'DM Mono',monospace;font-size:9.5px;color:#9ca3af;margin-top:2px;}
.t-dim{color:#6b7280;font-size:12.5px;}
.t-pkg{font-size:9px;font-weight:700;padding:2px 7px;border-radius:4px;font-family:'DM Mono',monospace;letter-spacing:.05em;text-transform:uppercase;border:1px solid;}
.mp-empty{padding:44px;text-align:center;color:#9ca3af;font-size:13px;}

/* Action buttons */
.qbtn{padding:4px 9px;border-radius:5px;font-size:11px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:.1s;border:1px solid;white-space:nowrap;}
.qbtn-app{background:#f0fdf4;color:#15803d;border-color:#bbf7d0;}.qbtn-app:hover:not(:disabled){background:#15803d;color:#fff;}
.qbtn-res{background:#fef2f2;color:#dc2626;border-color:#fecaca;}.qbtn-res:hover:not(:disabled){background:#dc2626;color:#fff;}
.qbtn-unr{background:#f0fdf4;color:#15803d;border-color:#bbf7d0;}.qbtn-unr:hover:not(:disabled){background:#15803d;color:#fff;}
.qbtn-del{background:#fff;color:#9ca3af;border-color:#e5e7eb;}.qbtn-del:hover:not(:disabled){background:#fef2f2;color:#dc2626;border-color:#fecaca;}
.qbtns{display:flex;gap:4px;flex-wrap:wrap;}
.qbtn:disabled{opacity:.45;cursor:not-allowed;}

/* ── FORM FIELDS ── */
.mp-field{display:flex;flex-direction:column;gap:4px;margin-bottom:14px;}
.mp-lbl{font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#6b7280;font-family:'DM Mono',monospace;}
.mp-lbl em{color:#ef4444;font-style:normal;margin-left:2px;}
.mp-inp{padding:9px 12px;background:#fff;border:1px solid #d1d5db;border-radius:7px;font-size:13px;color:#111827;font-family:'DM Sans',sans-serif;outline:none;transition:.12s;width:100%;}
.mp-inp::placeholder{color:#9ca3af;}
.mp-inp:focus{border-color:#6b7280;box-shadow:0 0 0 2px rgba(107,114,128,.1);}
.mp-inp:disabled{background:#f9fafb;color:#9ca3af;cursor:not-allowed;}
.mp-inp.mono{font-family:'DM Mono',monospace;font-size:12.5px;}
.mp-sel{padding:9px 12px;background:#fff;border:1px solid #d1d5db;border-radius:7px;font-size:13px;color:#111827;font-family:'DM Sans',sans-serif;outline:none;cursor:pointer;width:100%;appearance:none;}
.mp-sel:focus{border-color:#6b7280;box-shadow:0 0 0 2px rgba(107,114,128,.1);}
.mp-textarea{width:100%;padding:9px 12px;border:1px solid #d1d5db;border-radius:7px;font-size:13px;color:#111827;font-family:'DM Sans',sans-serif;outline:none;transition:.12s;resize:vertical;min-height:80px;}
.mp-textarea:focus{border-color:#6b7280;box-shadow:0 0 0 2px rgba(107,114,128,.1);}
.mp-hint-ok{font-size:11px;color:#15803d;margin-top:3px;}
.mp-hint-er{font-size:11px;color:#dc2626;margin-top:3px;}
.mp-g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.mp-g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}

/* ── BUTTONS ── */
.mp-btn{padding:9px 18px;border-radius:7px;border:none;font-size:13px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:.12s;display:inline-flex;align-items:center;gap:6px;}
.mp-btn-primary{background:#111827;color:#fff;}
.mp-btn-primary:hover:not(:disabled){background:#1f2937;}
.mp-btn-green{background:#15803d;color:#fff;}
.mp-btn-green:hover:not(:disabled){background:#166534;}
.mp-btn-outline{background:#fff;border:1px solid #e5e7eb;color:#374151;}
.mp-btn-outline:hover:not(:disabled){background:#f9fafb;border-color:#d1d5db;}
.mp-btn-danger{background:#fef2f2;border:1px solid #fecaca;color:#dc2626;}
.mp-btn-danger:hover:not(:disabled){background:#dc2626;color:#fff;}
.mp-btn-sm{padding:6px 12px;font-size:12px;}
.mp-btn:disabled{opacity:.45;cursor:not-allowed;}

/* ── MODAL OVERLAY ── */
.mp-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:800;display:flex;align-items:center;justify-content:center;padding:20px;animation:mp-fade .15s ease;}
.mp-modal{background:#fff;border-radius:10px;max-width:520px;width:100%;max-height:90vh;overflow-y:auto;animation:mp-up .18s ease;box-shadow:0 20px 60px rgba(0,0,0,.25);}
.mp-modal-hd{padding:16px 20px;border-bottom:1px solid #e5e7eb;display:flex;align-items:center;justify-content:space-between;}
.mp-modal-title{font-size:15px;font-weight:700;color:#111827;}
.mp-modal-close{width:28px;height:28px;border-radius:6px;background:#f3f4f6;border:1px solid #e5e7eb;color:#6b7280;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;transition:.1s;}
.mp-modal-close:hover{background:#fef2f2;color:#dc2626;border-color:#fecaca;}
.mp-modal-body{padding:20px;}
.mp-modal-foot{padding:14px 20px;border-top:1px solid #f3f4f6;display:flex;gap:8px;justify-content:flex-end;}

/* ── TOAST ── */
.mp-toast{position:fixed;bottom:22px;right:22px;z-index:9999;padding:11px 16px;border-radius:8px;font-size:13px;font-weight:600;background:#fff;border:1px solid #e5e7eb;color:#111827;box-shadow:0 4px 20px rgba(0,0,0,.14);animation:mp-up .18s ease;display:flex;align-items:center;gap:8px;max-width:340px;font-family:'DM Sans',sans-serif;}
.mp-toast.ok{border-color:#bbf7d0;border-top:3px solid #15803d;color:#15803d;}
.mp-toast.err{border-color:#fecaca;border-top:3px solid #dc2626;color:#dc2626;}

/* ── MISC ── */
.mp-spin{animation:mp-spin .8s linear infinite;display:inline-block;}
.mp-divider{height:1px;background:#f3f4f6;margin:16px 0;}
.mp-info-box{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:7px;padding:11px 14px;font-size:12.5px;color:#166534;line-height:1.6;}
.mp-warn-box{background:#fffbeb;border:1px solid #fde68a;border-radius:7px;padding:11px 14px;font-size:12.5px;color:#92400e;line-height:1.6;}
.mp-err-box{background:#fef2f2;border:1px solid #fecaca;border-radius:7px;padding:11px 14px;font-size:12.5px;color:#dc2626;line-height:1.6;margin-bottom:14px;}

/* Password input */
.mp-pwd-wrap{position:relative;}
.mp-pwd-wrap input{padding-right:38px;}
.mp-eye{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#9ca3af;display:flex;align-items:center;padding:3px;transition:color .12s;}
.mp-eye:hover{color:#374151;}
.mp-pwd-bars{display:flex;gap:3px;margin-top:5px;}
.mp-pwd-bar{flex:1;height:3px;border-radius:2px;background:#f3f4f6;transition:background .2s;}

/* Document upload */
.mp-dropzone{border:1.5px dashed #d1d5db;border-radius:7px;padding:14px;text-align:center;cursor:pointer;transition:.13s;background:#f9fafb;position:relative;min-height:56px;}
.mp-dropzone:hover{border-color:#9ca3af;background:#fff;}
.mp-dropzone input{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;}
.mp-doc-item{display:flex;align-items:center;gap:8px;background:#fff;border:1px solid #e5e7eb;border-radius:6px;padding:6px 10px;font-size:12px;color:#374151;margin-top:6px;}
.mp-doc-rm{margin-left:auto;background:none;border:none;color:#9ca3af;cursor:pointer;font-size:14px;line-height:1;transition:color .1s;display:flex;align-items:center;padding:2px;}
.mp-doc-rm:hover{color:#dc2626;}

/* Payment entry */
.mp-pe{background:#f9fafb;border:1px solid #e5e7eb;border-radius:7px;margin-bottom:6px;overflow:hidden;transition:border-color .1s;cursor:pointer;}
.mp-pe:hover{border-color:#d1d5db;}
.mp-pe-top{display:flex;align-items:center;gap:7px;padding:9px 12px;}
.mp-pe-cat{font-size:9px;font-weight:700;padding:2px 7px;border-radius:4px;border:1px solid;font-family:'DM Mono',monospace;letter-spacing:.05em;text-transform:uppercase;flex-shrink:0;}
.mp-pe-body{padding:9px 12px 11px;background:#fff;border-top:1px solid #f3f4f6;display:grid;grid-template-columns:1fr 1fr;gap:5px;}
.mp-pe-row{font-size:11px;color:#6b7280;line-height:1.5;}.mp-pe-row span{font-weight:600;color:#111827;}

/* Revenue strip */
.mp-rev{background:#111827;border-radius:8px;padding:14px 18px;margin-bottom:18px;display:flex;align-items:center;gap:18px;}
.mp-rev-lbl{font-size:9.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.35);font-family:'DM Mono',monospace;margin-bottom:3px;}
.mp-rev-num{font-family:'DM Mono',monospace;font-size:24px;font-weight:700;color:#4ade80;}
.mp-rev-sub{font-size:11px;color:rgba(255,255,255,.3);margin-top:3px;}

/* Routes checklist */
.mp-route-group{margin-bottom:14px;}
.mp-route-group-lbl{font-size:9.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:#9ca3af;font-family:'DM Mono',monospace;margin-bottom:7px;}
.mp-route-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;}
.mp-route-item{display:flex;align-items:center;gap:6px;padding:6px 9px;border-radius:6px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;font-size:11.5px;color:#374151;transition:.1s;user-select:none;}
.mp-route-item:hover{border-color:#d1d5db;background:#f9fafb;}
.mp-route-item.checked{background:#f0fdf4;border-color:#bbf7d0;color:#15803d;font-weight:600;}
.mp-route-cb{width:14px;height:14px;border-radius:3px;border:1.5px solid #d1d5db;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:.1s;}
.mp-route-item.checked .mp-route-cb{background:#15803d;border-color:#15803d;}

/* Package card */
.pkg-card{border:1.5px solid #e5e7eb;border-radius:9px;padding:16px;cursor:pointer;background:#fff;transition:.15s;position:relative;overflow:hidden;}
.pkg-card:hover{box-shadow:0 2px 12px rgba(0,0,0,.08);border-color:#d1d5db;}
.pkg-card.selected{border-color:var(--pc);background:color-mix(in srgb,var(--pc) 5%,#fff);}
.pkg-card-accent{position:absolute;top:0;left:0;right:0;height:3px;background:var(--pc);}
.pkg-card-sel-dot{position:absolute;top:12px;right:12px;width:18px;height:18px;border-radius:50%;background:var(--pc);display:flex;align-items:center;justify-content:center;opacity:0;transition:.15s;}
.pkg-card.selected .pkg-card-sel-dot{opacity:1;}

/* Analytics chart */
.mp-chart-bar{display:flex;align-items:flex-end;gap:4px;height:80px;}
.mp-chart-col{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;}
.mp-chart-fill{width:100%;border-radius:3px 3px 0 0;min-height:2px;transition:height .4s ease;}
.mp-chart-lbl{font-size:8.5px;color:#9ca3af;font-family:'DM Mono',monospace;white-space:nowrap;}

@media(max-width:1024px){.mp-side{display:none;}.mp-stats{grid-template-columns:1fr 1fr;}}
@media(max-width:640px){.mp-g2,.mp-g3{grid-template-columns:1fr;}.mp-stats{grid-template-columns:1fr 1fr;}}
`;

// ── Shared constants ──────────────────────────────────────────────────────────
export const PAY_STYLE = {
  setup_full:        { bg:"#eff6ff", color:"#1d4ed8", border:"#bfdbfe", label:"Setup — Full" },
  setup_installment: { bg:"#f5f3ff", color:"#7c3aed", border:"#ddd6fe", label:"Setup — Installment" },
  quarterly:         { bg:"#f0fdf4", color:"#15803d", border:"#bbf7d0", label:"Quarterly" },
  biannual:          { bg:"#fffbeb", color:"#d97706", border:"#fde68a", label:"Bi-Annual" },
  annual:            { bg:"#fff7ed", color:"#c2410c", border:"#fed7aa", label:"Annual" },
  other:             { bg:"#f9fafb", color:"#374151", border:"#e5e7eb", label:"Other" },
};

export const ALL_ROUTES_GROUPED = {
  Core:       ["/dashboard","/profile"],
  Accounts:   ["/create-account","/view-accounts","/accounts/*"],
  Ledger:     ["/ledger","/ledger/account/:id","/ledger/ref/:ref"],
  Journal:    ["/general-entries","/general-journal-entry","/view-general-entries"],
  Invoices:   ["/add-invoice","/add-invoice-sales","/view-sales-invoices","/add-invoice-purchase","/view-purchase-invoices"],
  Products:   ["/products"],
  Reports:    ["/trialbalance","/balancesheet","/incomestatement"],
  Cashbook:   ["/cashbook","/cashbook-report"],
  Employees:  ["/employees","/employees/new"],
  Operations: ["/weight-bridge","/weight-bridge/invoices","/stock"],
  Cheques:    ["/cheque-book/create","/cheque-book/entry","/cheque-book/view"],
};

export const ROUTE_LABELS = {
  "/dashboard":"Dashboard","/profile":"Profile",
  "/create-account":"Create Account","/view-accounts":"View Accounts","/accounts/*":"Account Details",
  "/ledger":"Ledger","/ledger/account/:id":"Account Ledger","/ledger/ref/:ref":"Ref Ledger",
  "/general-entries":"Journal Entries","/general-journal-entry":"New Entry","/view-general-entries":"View Entries",
  "/add-invoice":"Invoice Dashboard","/add-invoice-sales":"New Sales Invoice","/view-sales-invoices":"View Sales",
  "/add-invoice-purchase":"New Purchase Invoice","/view-purchase-invoices":"View Purchases",
  "/products":"Products",
  "/trialbalance":"Trial Balance","/balancesheet":"Balance Sheet","/incomestatement":"Income Statement",
  "/cashbook":"Cashbook","/cashbook-report":"Cashbook Report",
  "/employees":"View Employees","/employees/new":"Create Employee",
  "/weight-bridge":"Weight Bridge","/weight-bridge/invoices":"WB Invoices","/stock":"Stock",
  "/cheque-book/create":"Create Cheque Book","/cheque-book/entry":"Issue Cheque","/cheque-book/view":"View Cheques",
};

// ── Micro components ──────────────────────────────────────────────────────────
export const Spin = () => <span className="mp-spin">⟳</span>;

export const Badge = ({ status }) => (
  <span className={`badge badge-${status}`}>
    <span className="badge-dot"/>
    {status}
  </span>
);

export const Toast = ({ msg, ok }) => (
  <div className={`mp-toast ${ok?"ok":"err"}`}>
    {ok
      ? <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
      : <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>}
    {msg}
  </div>
);

export const EyeBtn = ({ show, onToggle }) => (
  <button type="button" className="mp-eye" onClick={onToggle}>
    {show
      ? <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
      : <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
    }
  </button>
);

export const ConfirmDialog = ({ open, title, message, onConfirm, onCancel, danger = true }) => {
  if (!open) return null;
  return (
    <div className="mp-modal-overlay" onClick={onCancel}>
      <div className="mp-modal" style={{ maxWidth:400 }} onClick={e=>e.stopPropagation()}>
        <div className="mp-modal-hd">
          <div className="mp-modal-title">{title}</div>
          <button className="mp-modal-close" onClick={onCancel}>✕</button>
        </div>
        <div className="mp-modal-body">
          <p style={{ fontSize:13.5, color:"#374151", lineHeight:1.6 }}>{message}</p>
        </div>
        <div className="mp-modal-foot">
          <button className="mp-btn mp-btn-outline mp-btn-sm" onClick={onCancel}>Cancel</button>
          <button className={`mp-btn mp-btn-sm ${danger?"mp-btn-danger":"mp-btn-green"}`} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Formatters
export const fmtDate = d => d ? new Date(d).toLocaleDateString("en-PK",{year:"numeric",month:"short",day:"numeric"}) : "—";
export const fmtFull = d => d ? new Date(d).toLocaleString("en-PK",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}) : "—";
export const fmtPKR  = n => `Rs ${Number(n||0).toLocaleString()}`;
export const fmtCnic = raw => {
  const d = (raw||"").replace(/\D/g,"").slice(0,13);
  if (d.length<=5)  return d;
  if (d.length<=12) return `${d.slice(0,5)}-${d.slice(5)}`;
  return `${d.slice(0,5)}-${d.slice(5,12)}-${d.slice(12)}`;
};