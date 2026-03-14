// Register.jsx
// ─────────────────────────────────────────────────────────────────────────────
// 4-step mill registration — NO Stripe, payment is manual bank transfer.
//
// Step 1 — Your Details     (businessName, ownerName, email, phone, logo)
// Step 2 — Security         (CNIC + password + strength meter)
// Step 3 — Payment          (bank account receipt, sender details, TID, screenshot)
// Step 4 — Done             (success screen — pending approval)
//
// Backend calls:
//   POST /api/register             → creates mill (pending), returns millId
//   POST /api/register/payment-proof → attaches TID + screenshot to mill record
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";

// ─── Pakistani Banks ──────────────────────────────────────────────────────────
const PK_BANKS = [
  "HBL – Habib Bank Limited",
  "UBL – United Bank Limited",
  "MCB – Muslim Commercial Bank",
  "ABL – Allied Bank Limited",
  "NBP – National Bank of Pakistan",
  "Meezan Bank",
  "Bank Alfalah",
  "Standard Chartered Pakistan",
  "Faysal Bank",
  "Silk Bank",
  "Bank Al Habib",
  "Askari Bank",
  "Habib Metropolitan Bank",
  "Soneri Bank",
  "JS Bank",
  "Summit Bank",
  "SAMBA Bank",
  "Dubai Islamic Bank Pakistan",
  "Bank Islami Pakistan",
  "Al Baraka Bank Pakistan",
  "First Women Bank",
  "Zarai Taraqiati Bank (ZTBL)",
  "Industrial Development Bank (IDBP)",
  "SME Bank",
  "NRSP Microfinance Bank",
  "Khushhali Microfinance Bank",
  "Easypaisa (Telenor Microfinance Bank)",
  "JazzCash (Mobilink Microfinance Bank)",
  "U Microfinance Bank",
  "FINCA Microfinance Bank",
  "Other",
];

// ─── Our receiving bank accounts ─────────────────────────────────────────────
const OUR_ACCOUNTS = [
  {
    id:      "hbl",
    bank:    "HBL – Habib Bank Limited",
    title:   "ALI RAZA SALEEM",
    account: "0296701869503",
    iban:    "PK73HABB0002967901869503",
    color:   "#006633",
    logo:    "🏦",
  },
  {
    id:      "ubl",
    bank:    "UBL – United Bank Limited",
    title:   "MUHAMMAD ZAIN ALI",
    account: "0094315078538",
    iban:    "PK15UNIL0109000315078538",
    color:   "#003087",
    logo:    "🏛",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function pwdStrength(p) {
  let s = 0;
  if (p.length >= 8)  s++;
  if (p.length >= 12) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)) s++;
  return s;
}
const PWD_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const PWD_COLORS = ["", "#ef4444", "#f97316", "#eab308", "#059669"];

function formatCnic(raw) {
  const d = raw.replace(/\D/g, "").slice(0, 13);
  if (d.length <= 5)  return d;
  if (d.length <= 12) return `${d.slice(0,5)}-${d.slice(5)}`;
  return `${d.slice(0,5)}-${d.slice(5,12)}-${d.slice(12)}`;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const EyeOff = () => <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>;
const EyeOn  = () => <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>;
const ChevR  = () => <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>;
const ChevL  = () => <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>;
const Spin   = () => <span style={{ animation: "rg-spin .8s linear infinite", display: "inline-block" }}><svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg></span>;
const Copy   = ({ done }) => done
  ? <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
  : <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  @keyframes rg-spin { to { transform: rotate(360deg); } }
  @keyframes rg-shimmer { to { background-position: 200%; } }
  @keyframes rg-fade-in { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
  .rg-root *, .rg-root *::before, .rg-root *::after { box-sizing:border-box; margin:0; padding:0; }
  .rg-root { min-height:100vh; display:flex; font-family:'DM Sans',sans-serif; background:#0c0f1a; }

  /* LEFT */
  .rg-left { flex:1; position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:center; padding:64px 56px; }
  .rg-left-bg { position:absolute; inset:0; background:linear-gradient(160deg,#0d1425 0%,#0f1f14 50%,#111827 100%); }
  .rg-glow-1 { position:absolute; left:-100px; top:20%; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle,rgba(16,185,129,.15) 0%,transparent 65%); pointer-events:none; }
  .rg-glow-2 { position:absolute; right:-80px; bottom:10%; width:380px; height:380px; border-radius:50%; background:radial-gradient(circle,rgba(99,102,241,.12) 0%,transparent 65%); pointer-events:none; }
  .rg-grain { position:absolute; inset:0; pointer-events:none; opacity:.4; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"); background-repeat:repeat; background-size:200px; mix-blend-mode:overlay; }
  .rg-rice-art { position:absolute; inset:0; pointer-events:none; opacity:.08; }
  .rg-brand { position:relative; z-index:2; }
  .rg-logo-wrap { width:64px; height:64px; border-radius:16px; margin-bottom:28px; overflow:hidden; border:1.5px solid rgba(255,255,255,.1); box-shadow:0 8px 32px rgba(0,0,0,.4); }
  .rg-logo { width:100%; height:100%; object-fit:cover; display:block; }
  .rg-logo-fallback { width:100%; height:100%; background:linear-gradient(135deg,#059669,#6366f1); display:flex; align-items:center; justify-content:center; font-family:'Lora',serif; font-size:20px; font-weight:700; color:#fff; }
  .rg-eyebrow { font-size:10px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:rgba(16,185,129,.8); margin-bottom:12px; }
  .rg-headline { font-family:'Lora',serif; font-size:40px; font-weight:700; color:#fff; line-height:1.1; letter-spacing:-.8px; margin-bottom:16px; }
  .rg-headline em { font-style:italic; color:#34d399; }
  .rg-sub { font-size:15px; color:rgba(255,255,255,.38); line-height:1.7; max-width:380px; margin-bottom:44px; }
  .rg-features { position:relative; z-index:2; display:flex; flex-direction:column; gap:16px; }
  .rg-feature { display:flex; align-items:flex-start; gap:14px; }
  .rg-feature-icon { width:36px; height:36px; border-radius:10px; flex-shrink:0; background:rgba(16,185,129,.12); border:1px solid rgba(16,185,129,.2); display:flex; align-items:center; justify-content:center; color:#34d399; }
  .rg-feature-title { font-size:13px; font-weight:700; color:#fff; margin-bottom:2px; }
  .rg-feature-desc { font-size:12px; color:rgba(255,255,255,.3); line-height:1.5; }
  .rg-bottom { position:relative; z-index:2; margin-top:48px; font-size:11px; color:rgba(255,255,255,.18); }

  /* RIGHT */
  .rg-right { width:540px; flex-shrink:0; background:#fff; display:flex; flex-direction:column; position:relative; overflow-y:auto; }
  .rg-right::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; z-index:10; background:linear-gradient(90deg,#059669,#6366f1,#059669); background-size:200%; animation:rg-shimmer 3s linear infinite; }
  .rg-form-wrap { padding:36px 44px; flex:1; display:flex; flex-direction:column; }

  /* Step bar */
  .rg-steps { display:flex; align-items:flex-start; margin-bottom:26px; }
  .rg-step-col { display:flex; flex-direction:column; align-items:center; }
  .rg-step-circle { width:28px; height:28px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; border:2px solid #e2e8f0; color:#94a3b8; background:#fff; transition:all .2s; }
  .rg-step-circle.active { border-color:#059669; color:#059669; background:#f0fdf4; }
  .rg-step-circle.done { border-color:#059669; background:#059669; color:#fff; }
  .rg-step-line { flex:1; height:2px; background:#e2e8f0; margin:13px 5px 0; transition:background .2s; }
  .rg-step-line.done { background:#059669; }
  .rg-step-label { font-size:9.5px; font-weight:700; color:#94a3b8; letter-spacing:.05em; text-transform:uppercase; margin-top:4px; white-space:nowrap; }
  .rg-step-label.active, .rg-step-label.done { color:#059669; }

  /* Form elements */
  .rg-form-eyebrow { font-size:10px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:#059669; margin-bottom:5px; }
  .rg-form-title { font-family:'Lora',serif; font-size:21px; font-weight:700; color:#0f172a; letter-spacing:-.4px; margin-bottom:3px; }
  .rg-form-sub { font-size:13px; color:#94a3b8; margin-bottom:20px; line-height:1.5; }
  .rg-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:11px; }
  .rg-grid-1 { display:grid; grid-template-columns:1fr; gap:11px; }
  .rg-field { display:flex; flex-direction:column; }
  .rg-label { font-size:10.5px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:#64748b; margin-bottom:5px; }
  .rg-input-wrap { position:relative; }
  .rg-input-icon { position:absolute; left:11px; top:50%; transform:translateY(-50%); color:#94a3b8; pointer-events:none; display:flex; transition:color .15s; }
  .rg-input { width:100%; padding:10px 12px 10px 34px; border:1.5px solid #e2e8f0; border-radius:9px; font-size:13px; font-family:'DM Sans',sans-serif; color:#0f172a; background:#f8fafc; outline:none; transition:border-color .15s,box-shadow .15s,background .15s; }
  .rg-input::placeholder { color:#c4cbd8; }
  .rg-input:focus { border-color:#059669; box-shadow:0 0 0 3px rgba(5,150,105,.1); background:#fff; }
  .rg-input-wrap:focus-within .rg-input-icon { color:#059669; }
  .rg-input-mono { font-family:'DM Mono',monospace !important; font-size:12px !important; }
  .rg-select { width:100%; padding:10px 12px 10px 34px; border:1.5px solid #e2e8f0; border-radius:9px; font-size:13px; font-family:'DM Sans',sans-serif; color:#0f172a; background:#f8fafc; outline:none; transition:border-color .15s,box-shadow .15s; appearance:none; cursor:pointer; }
  .rg-select:focus { border-color:#059669; box-shadow:0 0 0 3px rgba(5,150,105,.1); background:#fff; }
  .rg-select option { color:#0f172a; background:#fff; }
  .rg-pwd-toggle { position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:#94a3b8; display:flex; padding:2px; }
  .rg-cnic-dots { display:flex; gap:3px; margin-top:5px; padding-left:2px; }
  .rg-cnic-dot { width:5px; height:5px; border-radius:50%; background:#e2e8f0; transition:background .15s; }
  .rg-cnic-dot.filled { background:#059669; }
  .rg-pwd-strength { display:flex; gap:4px; margin-top:5px; }
  .rg-pwd-bar { flex:1; height:3px; border-radius:2px; background:#e2e8f0; transition:background .2s; }

  /* Upload */
  .rg-upload-area { border:2px dashed #e2e8f0; border-radius:9px; padding:13px; text-align:center; cursor:pointer; transition:border-color .2s,background .2s; background:#f8fafc; position:relative; }
  .rg-upload-area:hover,.rg-upload-area.drag { border-color:#059669; background:#f0fdf4; }
  .rg-upload-area input { position:absolute; inset:0; opacity:0; cursor:pointer; width:100%; height:100%; }
  .rg-upload-preview { display:flex; align-items:center; gap:10px; justify-content:center; }
  .rg-upload-preview img { width:34px; height:34px; border-radius:7px; object-fit:cover; border:1.5px solid #e2e8f0; }
  .rg-remove { font-size:11px; color:#94a3b8; cursor:pointer; text-decoration:underline; margin-top:2px; display:block; background:none; border:none; }

  /* Bank accounts receipt */
  .rg-bank-cards { display:flex; flex-direction:column; gap:10px; margin-bottom:16px; }
  .rg-bank-card { border:2px solid #e2e8f0; border-radius:12px; overflow:hidden; transition:border-color .2s,box-shadow .2s; cursor:pointer; }
  .rg-bank-card:hover { border-color:#94a3b8; }
  .rg-bank-card.selected { border-color:#059669; box-shadow:0 0 0 3px rgba(5,150,105,.12); }
  .rg-bank-header { padding:10px 16px; display:flex; align-items:center; gap:10px; }
  .rg-bank-name { font-size:13px; font-weight:700; color:#fff; }
  .rg-bank-body { padding:12px 16px 14px; background:#f8fafc; border-top:1px solid #e2e8f0; }
  .rg-bank-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; }
  .rg-bank-key { font-size:10.5px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:#64748b; }
  .rg-bank-val { font-family:'DM Mono',monospace; font-size:12px; color:#0f172a; font-weight:500; display:flex; align-items:center; gap:6px; }
  .rg-copy-btn { background:none; border:none; cursor:pointer; color:#94a3b8; display:flex; align-items:center; padding:2px; transition:color .15s; }
  .rg-copy-btn:hover { color:#059669; }
  .rg-amount-badge { display:inline-flex; align-items:center; gap:6px; background:#fef9c3; border:1.5px solid #fde047; border-radius:8px; padding:8px 14px; margin-bottom:16px; }
  .rg-amount-badge span { font-size:13px; font-weight:700; color:#713f12; }
  .rg-amount-badge strong { font-size:18px; color:#0f172a; font-family:'Lora',serif; }
  .rg-divider { border:none; border-top:1px dashed #e2e8f0; margin:12px 0; }
  .rg-proof-section { animation:rg-fade-in .25s ease; }

  /* Screenshot upload */
  .rg-ss-area { border:2px dashed #e2e8f0; border-radius:9px; padding:16px; text-align:center; cursor:pointer; transition:border-color .2s,background .2s; background:#f8fafc; position:relative; min-height:80px; display:flex; flex-direction:column; align-items:center; justify-content:center; }
  .rg-ss-area:hover,.rg-ss-area.drag { border-color:#059669; background:#f0fdf4; }
  .rg-ss-area input { position:absolute; inset:0; opacity:0; cursor:pointer; width:100%; height:100%; }
  .rg-ss-preview { width:100%; border-radius:8px; max-height:140px; object-fit:cover; display:block; }

  /* Buttons */
  .rg-btn-row { display:flex; gap:10px; margin-top:18px; }
  .rg-btn-back { flex:0 0 auto; padding:11px 16px; border-radius:9px; border:1.5px solid #e2e8f0; background:#fff; color:#475569; font-size:13px; font-weight:700; font-family:'DM Sans',sans-serif; cursor:pointer; display:flex; align-items:center; gap:7px; transition:border-color .15s,color .15s; }
  .rg-btn-back:hover { border-color:#94a3b8; color:#0f172a; }
  .rg-btn-next { flex:1; padding:12px; border-radius:9px; border:none; cursor:pointer; background:#0f172a; color:#fff; font-size:13.5px; font-weight:700; font-family:'DM Sans',sans-serif; letter-spacing:.04em; text-transform:uppercase; display:flex; align-items:center; justify-content:center; gap:8px; transition:background .15s,box-shadow .15s,transform .1s; box-shadow:0 4px 14px rgba(15,23,42,.22); position:relative; overflow:hidden; }
  .rg-btn-next::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent); transform:translateX(-100%); transition:transform .4s; }
  .rg-btn-next:hover::after { transform:translateX(100%); }
  .rg-btn-next:hover { background:#1e293b; }
  .rg-btn-next:active { transform:scale(.99); }
  .rg-btn-next:disabled { opacity:.6; cursor:not-allowed; transform:none; }
  .rg-login-link { margin-top:18px; text-align:center; font-size:13px; color:#94a3b8; }
  .rg-login-link a { color:#059669; font-weight:700; text-decoration:none; }
  .rg-login-link a:hover { text-decoration:underline; }

  @media (max-width:1024px) { .rg-left { display:none; } .rg-right { width:100%; } }
  @media (max-width:560px) { .rg-form-wrap { padding:24px 18px; } .rg-grid-2 { grid-template-columns:1fr; } }
`;

const FEATURES = [
  { icon:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title:"Everything in One Place", desc:"Invoices, accounts, weight bridge, payroll, and reports — all in one place." },
  { icon:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", title:"Team Access Control", desc:"Add staff with their own login and permissions." },
  { icon:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", title:"Your Data, Fully Private", desc:"Each mill has completely isolated, secure storage." },
];

const RiceGrains = () => (
  <svg className="rg-rice-art" viewBox="0 0 700 900" fill="none">
    {[[80,80,4,12,-30],[200,160,3,9,20],[340,80,5,14,-15],[480,50,3,8,40],[600,140,4,11,-25],[60,260,5,13,30],[190,340,3,8,-20],[310,240,4,12,-35],[440,300,3,9,25],[580,260,5,14,-10],[100,460,4,11,-25],[240,520,3,9,20],[380,440,5,13,-15],[510,500,4,11,30],[640,460,3,8,-30],[80,640,5,14,15],[220,700,3,9,-20],[360,640,4,12,25],[500,680,3,8,-35],[620,620,5,13,10]]
      .map(([cx,cy,rx,ry,a],i) => <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="white" transform={`rotate(${a} ${cx} ${cy})`}/>)}
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function Register() {
  const navigate   = useNavigate();
  const fileRef    = useRef(null);
  const ssRef      = useRef(null);

  const [step,         setStep]         = useState(1);
  const [notification, setNotification] = useState({ message:"", type:"info" });
  const [loading,      setLoading]      = useState(false);
  const [sideLogoErr,  setSideLogoErr]  = useState(false);
  const [copied,       setCopied]       = useState({});

  // Step 1 & 2
  const [form, setForm] = useState({
    businessName:"", ownerName:"", email:"", phone:"",
    cnic:"", password:"", confirmPassword:"",
  });
  const [logo,        setLogo]        = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [drag,        setDrag]        = useState(false);
  const [showPwd,     setShowPwd]     = useState(false);
  const [showCPwd,    setShowCPwd]    = useState(false);

  // Step 3 — payment
  const [selectedBank,    setSelectedBank]    = useState(""); // "hbl" or "ubl"
  const [senderBank,      setSenderBank]      = useState("");
  const [senderTitle,     setSenderTitle]     = useState("");
  const [senderAccount,   setSenderAccount]   = useState("");
  const [amountSent,      setAmountSent]      = useState("7000");
  const [tid,             setTid]             = useState("");
  const [screenshot,      setScreenshot]      = useState(null);
  const [ssPreview,       setSsPreview]       = useState("");
  const [ssDrag,          setSsDrag]          = useState(false);
  const [registeredMillId, setRegisteredMillId] = useState("");

  const notify = (msg, type, ms=4500) => {
    setNotification({ message:msg, type });
    setTimeout(() => setNotification({ message:"", type:"info" }), ms);
  };
  const set = f => e => setForm(p => ({ ...p, [f]:e.target.value }));
  const score = pwdStrength(form.password);
  const cnicDigits = form.cnic.replace(/\D/g,"").length;

  const handleCnicChange = e => setForm(p => ({ ...p, cnic:formatCnic(e.target.value.replace(/\D/g,"")) }));
  const handleCnicKeyDown = e => {
    if (e.key === "Backspace") {
      const raw = form.cnic.replace(/\D/g,"");
      if (raw.length > 0) { e.preventDefault(); setForm(p => ({ ...p, cnic:formatCnic(raw.slice(0,-1)) })); }
    }
  };

  const handleLogoChange = file => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { notify("Please upload an image file","warning"); return; }
    if (file.size > 5*1024*1024) { notify("Logo must be under 5 MB","warning"); return; }
    setLogo(file); setLogoPreview(URL.createObjectURL(file));
  };

  const handleSsChange = file => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { notify("Please upload an image file","warning"); return; }
    if (file.size > 10*1024*1024) { notify("Screenshot must be under 10 MB","warning"); return; }
    setScreenshot(file); setSsPreview(URL.createObjectURL(file));
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(p => ({ ...p, [key]:true }));
      setTimeout(() => setCopied(p => ({ ...p, [key]:false })), 2000);
    });
  };

  // ── Step validation ──────────────────────────────────────────────────────────
  const goStep2 = () => {
    if (!form.businessName.trim()) { notify("Please enter your business name","warning"); return; }
    if (!form.ownerName.trim())    { notify("Please enter the owner's name","warning"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { notify("Please enter a valid email","warning"); return; }
    setStep(2);
  };

  const goStep3 = () => {
    if (cnicDigits !== 13)                              { notify("Please enter a valid 13-digit CNIC","warning"); return; }
    if (form.password.length < 8)                      { notify("Password must be at least 8 characters","warning"); return; }
    if (form.password !== form.confirmPassword)        { notify("Passwords do not match","warning"); return; }
    setStep(3);
  };

  // ── Step 3: register mill first, then submit payment proof ──────────────────
  const handleSubmitPayment = async () => {
    if (!selectedBank)    { notify("Please select which bank account you are transferring to","warning"); return; }
    if (!senderBank)      { notify("Please select your bank","warning"); return; }
    if (!senderTitle.trim())   { notify("Please enter your account title","warning"); return; }
    if (!senderAccount.trim()) { notify("Please enter your account number","warning"); return; }
    if (!tid.trim())      { notify("Please enter the Transaction ID (TID)","warning"); return; }
    if (!screenshot)      { notify("Please upload a screenshot of your payment","warning"); return; }

    setLoading(true);
    try {
      // 1. Register the mill
      const fd1 = new FormData();
      fd1.append("businessName", form.businessName);
      fd1.append("ownerName",    form.ownerName);
      fd1.append("email",        form.email);
      fd1.append("cnic",         form.cnic.replace(/\D/g,""));
      fd1.append("phone",        form.phone);
      fd1.append("password",     form.password);
      if (logo) fd1.append("logo", logo);

      const r1 = await fetch(`${API_BASE_URL}/register`, { method:"POST", body:fd1 });
      const d1 = await r1.json();
      if (!r1.ok) { notify(d1.message || "Registration failed","error"); setLoading(false); return; }

      const millId = d1.millId;
      setRegisteredMillId(millId);

      // 2. Submit payment proof
      const receivingAcc = OUR_ACCOUNTS.find(a => a.id === selectedBank);
      const fd2 = new FormData();
      fd2.append("millId",         millId);
      fd2.append("senderBank",     senderBank);
      fd2.append("senderTitle",    senderTitle);
      fd2.append("senderAccount",  senderAccount);
      fd2.append("receivingBank",  receivingAcc?.bank || selectedBank);
      fd2.append("amountSent",     amountSent);
      fd2.append("tid",            tid);
      fd2.append("screenshot",     screenshot);

      const r2 = await fetch(`${API_BASE_URL}/register/payment-proof`, { method:"POST", body:fd2 });
      const d2 = await r2.json();
      if (!r2.ok) { notify(d2.message || "Could not submit payment proof","error"); setLoading(false); return; }

      setStep(4); // success
    } catch {
      notify("Something went wrong — please try again","error");
    }
    setLoading(false);
  };

  const STEPS = ["Your Details","Security","Payment","Done"];
  const selectedAcc = OUR_ACCOUNTS.find(a => a.id === selectedBank);

  return (
    <>
      <style>{FONTS}{CSS}</style>
      <div className="rg-root">

        {/* ── LEFT PANEL ── */}
        <div className="rg-left">
          <div className="rg-left-bg"/><div className="rg-glow-1"/><div className="rg-glow-2"/>
          <div className="rg-grain"/><RiceGrains/>
          <div className="rg-brand">
            <div className="rg-logo-wrap">
              {!sideLogoErr
                ? <img src="/logo.png" alt="Agro Plus" className="rg-logo" onError={() => setSideLogoErr(true)}/>
                : <div className="rg-logo-fallback">A+</div>}
            </div>
            <p className="rg-eyebrow">Agro Plus</p>
            <h1 className="rg-headline">Run your mill<br/><em>smarter</em></h1>
            <p className="rg-sub">The complete management platform built for rice mills — invoicing, accounts, weight bridge, payroll, and reports all in one place.</p>
          </div>
          <div className="rg-features">
            {FEATURES.map((f,i) => (
              <div className="rg-feature" key={i}>
                <div className="rg-feature-icon">
                  <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={f.icon}/></svg>
                </div>
                <div>
                  <div className="rg-feature-title">{f.title}</div>
                  <div className="rg-feature-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="rg-bottom">A product of ORCA TECH. AND VENTURES · © {new Date().getFullYear()} Agro Plus</div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="rg-right">
          <div className="rg-form-wrap">
            <p className="rg-form-eyebrow">New Account</p>
            <h2 className="rg-form-title">
              {step === 1 ? "Tell us about your mill"
               : step === 2 ? "Secure your account"
               : step === 3 ? "Complete your payment"
               : "Request submitted!"}
            </h2>
            <p className="rg-form-sub">
              {step === 1 ? "Just a few details to get you started."
               : step === 2 ? "Your CNIC and password will be used to log in."
               : step === 3 ? "Transfer Rs. 7,000 to one of our accounts below, then fill in your payment details."
               : "We've received your request. You'll get an email once your payment is verified."}
            </p>

            {/* Step bar */}
            {step < 4 && (
              <div className="rg-steps">
                {STEPS.map((label,i) => {
                  const n = i+1;
                  const cls = step > n ? "done" : step === n ? "active" : "";
                  return (
                    <React.Fragment key={i}>
                      <div className="rg-step-col">
                        <div className={`rg-step-circle ${cls}`}>
                          {cls === "done"
                            ? <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                            : n}
                        </div>
                        <div className={`rg-step-label ${cls}`}>{label}</div>
                      </div>
                      {i < STEPS.length-1 && <div className={`rg-step-line${step > n ? " done" : ""}`}/>}
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            {/* ═══ STEP 1 — Your Details ═══ */}
            {step === 1 && (
              <div className="rg-grid-1">
                <div className="rg-grid-2">
                  <div className="rg-field">
                    <label className="rg-label">Business Name *</label>
                    <div className="rg-input-wrap">
                      <input className="rg-input" placeholder="Al Rehman Rice Mill" value={form.businessName} onChange={set("businessName")} autoFocus/>
                      <span className="rg-input-icon"><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg></span>
                    </div>
                  </div>
                  <div className="rg-field">
                    <label className="rg-label">Your Name *</label>
                    <div className="rg-input-wrap">
                      <input className="rg-input" placeholder="Muhammad Zain" value={form.ownerName} onChange={set("ownerName")}/>
                      <span className="rg-input-icon"><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></span>
                    </div>
                  </div>
                  <div className="rg-field">
                    <label className="rg-label">Email *</label>
                    <div className="rg-input-wrap">
                      <input className="rg-input" type="email" placeholder="owner@yourmill.com" value={form.email} onChange={set("email")}/>
                      <span className="rg-input-icon"><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></span>
                    </div>
                  </div>
                  <div className="rg-field">
                    <label className="rg-label">Phone <span style={{color:"#94a3b8",fontWeight:400,textTransform:"none"}}>(optional)</span></label>
                    <div className="rg-input-wrap">
                      <input className="rg-input" placeholder="+923001234567" value={form.phone} onChange={set("phone")}/>
                      <span className="rg-input-icon"><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg></span>
                    </div>
                  </div>
                </div>
                {/* Logo */}
                <div className="rg-field">
                  <label className="rg-label">Mill Logo <span style={{color:"#94a3b8",fontWeight:400,textTransform:"none"}}>(optional)</span></label>
                  <div className={`rg-upload-area${drag ? " drag" : ""}`}
                    onDragOver={e => { e.preventDefault(); setDrag(true); }}
                    onDragLeave={() => setDrag(false)}
                    onDrop={e => { e.preventDefault(); setDrag(false); handleLogoChange(e.dataTransfer.files[0]); }}>
                    <input ref={fileRef} type="file" accept="image/*" onChange={e => handleLogoChange(e.target.files[0])}/>
                    {logoPreview
                      ? <div className="rg-upload-preview">
                          <img src={logoPreview} alt="preview"/>
                          <div>
                            <div style={{ fontSize:12, color:"#059669", fontWeight:700 }}>{logo?.name}</div>
                            <button className="rg-remove" onClick={e => { e.stopPropagation(); setLogo(null); setLogoPreview(""); }}>Remove</button>
                          </div>
                        </div>
                      : <>
                          <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={1.5} style={{ margin:"0 auto 4px", display:"block" }}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                          <div style={{ fontSize:12, color:"#64748b", fontWeight:500 }}>Click or drag your mill's logo here</div>
                          <div style={{ fontSize:11, color:"#94a3b8", marginTop:2 }}>PNG or JPG, up to 5 MB</div>
                        </>}
                  </div>
                </div>
                <div className="rg-btn-row">
                  <button className="rg-btn-next" onClick={goStep2}>Continue <ChevR/></button>
                </div>
              </div>
            )}

            {/* ═══ STEP 2 — Security ═══ */}
            {step === 2 && (
              <div className="rg-grid-1">
                <div className="rg-field">
                  <label className="rg-label">CNIC *</label>
                  <div className="rg-input-wrap">
                    <input className="rg-input rg-input-mono" type="text" inputMode="numeric" placeholder="xxxxx-xxxxxxx-x" maxLength={15}
                      value={form.cnic} onChange={handleCnicChange} onKeyDown={handleCnicKeyDown} autoFocus autoComplete="off"/>
                    <span className="rg-input-icon"><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/></svg></span>
                  </div>
                  <div className="rg-cnic-dots">
                    {Array.from({ length:13 },(_,i) => <div key={i} className={`rg-cnic-dot${i < cnicDigits ? " filled" : ""}`}/>)}
                  </div>
                </div>
                <div className="rg-field">
                  <label className="rg-label">Password *</label>
                  <div className="rg-input-wrap">
                    <input className="rg-input" type={showPwd ? "text" : "password"} placeholder="At least 8 characters"
                      value={form.password} onChange={set("password")} autoComplete="new-password" style={{ paddingRight:36 }}/>
                    <span className="rg-input-icon"><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg></span>
                    <button type="button" className="rg-pwd-toggle" onClick={() => setShowPwd(s => !s)} tabIndex={-1}>{showPwd ? <EyeOff/> : <EyeOn/>}</button>
                  </div>
                  {form.password.length > 0 && (
                    <>
                      <div className="rg-pwd-strength">
                        {[1,2,3,4].map(n => <div key={n} className="rg-pwd-bar" style={{ background: score >= n ? PWD_COLORS[score] : "#e2e8f0" }}/>)}
                      </div>
                      <div style={{ fontSize:10.5, color:"#94a3b8", marginTop:3 }}>{PWD_LABELS[score]} password</div>
                    </>
                  )}
                </div>
                <div className="rg-field">
                  <label className="rg-label">Confirm Password *</label>
                  <div className="rg-input-wrap">
                    <input className="rg-input" type={showCPwd ? "text" : "password"} placeholder="Same password again"
                      value={form.confirmPassword} onChange={set("confirmPassword")} autoComplete="new-password" style={{ paddingRight:36 }}/>
                    <span className="rg-input-icon"><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg></span>
                    <button type="button" className="rg-pwd-toggle" onClick={() => setShowCPwd(s => !s)} tabIndex={-1}>{showCPwd ? <EyeOff/> : <EyeOn/>}</button>
                  </div>
                  {form.confirmPassword.length > 0 && form.password !== form.confirmPassword && (
                    <div style={{ fontSize:11.5, color:"#ef4444", marginTop:3 }}>Passwords don't match</div>
                  )}
                </div>
                <div className="rg-btn-row">
                  <button className="rg-btn-back" onClick={() => setStep(1)}><ChevL/> Back</button>
                  <button className="rg-btn-next" onClick={goStep3}>Continue <ChevR/></button>
                </div>
              </div>
            )}

            {/* ═══ STEP 3 — Payment ═══ */}
            {step === 3 && (
              <div className="rg-grid-1">
                {/* Amount badge */}
                <div className="rg-amount-badge">
                  <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                  <span>Please transfer</span>
                  <strong>Rs. 7,000</strong>
                  <span>to one of these accounts:</span>
                </div>

                {/* Bank account cards */}
                <div className="rg-bank-cards">
                  {OUR_ACCOUNTS.map(acc => (
                    <div key={acc.id} className={`rg-bank-card${selectedBank === acc.id ? " selected" : ""}`}
                      onClick={() => setSelectedBank(acc.id)}>
                      <div className="rg-bank-header" style={{ background:acc.color }}>
                        <span style={{ fontSize:20 }}>{acc.logo}</span>
                        <div>
                          <div className="rg-bank-name">{acc.bank}</div>
                          {selectedBank === acc.id && (
                            <div style={{ fontSize:10, color:"rgba(255,255,255,.7)", fontWeight:600, letterSpacing:".05em" }}>✓ SELECTED</div>
                          )}
                        </div>
                        <div style={{ marginLeft:"auto" }}>
                          <div style={{ width:20, height:20, borderRadius:"50%", border:"2px solid rgba(255,255,255,.5)", background: selectedBank === acc.id ? "#fff" : "transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
                            {selectedBank === acc.id && <div style={{ width:8, height:8, borderRadius:"50%", background:acc.color }}/>}
                          </div>
                        </div>
                      </div>
                      <div className="rg-bank-body">
                        {[
                          { k:"Account Title", v:acc.title,   key:`title-${acc.id}` },
                          { k:"Account No",    v:acc.account, key:`acct-${acc.id}`  },
                          { k:"IBAN",          v:acc.iban,    key:`iban-${acc.id}`  },
                        ].map(row => (
                          <div className="rg-bank-row" key={row.k}>
                            <span className="rg-bank-key">{row.k}</span>
                            <span className="rg-bank-val">
                              {row.v}
                              <button className="rg-copy-btn" onClick={e => { e.stopPropagation(); copyToClipboard(row.v, row.key); }} title="Copy">
                                <Copy done={copied[row.key]}/>
                              </button>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="rg-divider"/>

                {/* Sender details */}
                <p style={{ fontSize:12, fontWeight:700, color:"#0f172a", letterSpacing:".05em", textTransform:"uppercase", marginBottom:2 }}>Your Payment Details</p>
                <p style={{ fontSize:12, color:"#94a3b8", marginBottom:10 }}>Fill in after completing the bank transfer.</p>

                <div className="rg-proof-section rg-grid-1">
                  <div className="rg-field">
                    <label className="rg-label">Your Bank *</label>
                    <div className="rg-input-wrap">
                      <select className="rg-select" value={senderBank} onChange={e => setSenderBank(e.target.value)}>
                        <option value="">Select your bank</option>
                        {PK_BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                      <span className="rg-input-icon" style={{ pointerEvents:"none" }}>
                        <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                      </span>
                    </div>
                  </div>

                  <div className="rg-grid-2">
                    <div className="rg-field">
                      <label className="rg-label">Your Account Title *</label>
                      <div className="rg-input-wrap">
                        <input className="rg-input" placeholder="As on your bank account" value={senderTitle} onChange={e => setSenderTitle(e.target.value)}/>
                        <span className="rg-input-icon"><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></span>
                      </div>
                    </div>
                    <div className="rg-field">
                      <label className="rg-label">Your Account Number *</label>
                      <div className="rg-input-wrap">
                        <input className="rg-input rg-input-mono" placeholder="Account number" value={senderAccount} onChange={e => setSenderAccount(e.target.value.replace(/\D/g,""))}/>
                        <span className="rg-input-icon"><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/></svg></span>
                      </div>
                    </div>
                  </div>

                  <div className="rg-grid-2">
                    <div className="rg-field">
                      <label className="rg-label">Amount Sent (PKR) *</label>
                      <div className="rg-input-wrap">
                        <input className="rg-input rg-input-mono" placeholder="7000" value={amountSent} onChange={e => setAmountSent(e.target.value.replace(/\D/g,""))}/>
                        <span className="rg-input-icon"><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></span>
                      </div>
                    </div>
                    <div className="rg-field">
                      <label className="rg-label">Transaction ID (TID) *</label>
                      <div className="rg-input-wrap">
                        <input className="rg-input rg-input-mono" placeholder="e.g. TXN123456789" value={tid} onChange={e => setTid(e.target.value)}/>
                        <span className="rg-input-icon"><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg></span>
                      </div>
                    </div>
                  </div>

                  <div className="rg-field">
                    <label className="rg-label">Payment Screenshot *</label>
                    <div className={`rg-ss-area${ssDrag ? " drag" : ""}`}
                      onDragOver={e => { e.preventDefault(); setSsDrag(true); }}
                      onDragLeave={() => setSsDrag(false)}
                      onDrop={e => { e.preventDefault(); setSsDrag(false); handleSsChange(e.dataTransfer.files[0]); }}>
                      <input ref={ssRef} type="file" accept="image/*" onChange={e => handleSsChange(e.target.files[0])}/>
                      {ssPreview
                        ? <div style={{ width:"100%", position:"relative" }}>
                            <img src={ssPreview} className="rg-ss-preview" alt="Payment screenshot"/>
                            <button className="rg-remove" onClick={e => { e.stopPropagation(); setScreenshot(null); setSsPreview(""); }}>Remove</button>
                          </div>
                        : <>
                            <svg width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={1.5} style={{ marginBottom:6 }}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                            <div style={{ fontSize:12.5, color:"#64748b", fontWeight:600 }}>Upload payment screenshot</div>
                            <div style={{ fontSize:11, color:"#94a3b8", marginTop:3 }}>Click or drag — PNG or JPG, up to 10 MB</div>
                          </>}
                    </div>
                  </div>
                </div>

                <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:8, padding:"10px 14px", marginTop:4, fontSize:12.5, color:"#166534", lineHeight:1.6 }}>
                  ✅ After submitting, our team will verify your payment within <strong>24 hours</strong>. You'll receive a welcome email with your login details once approved.
                </div>

                <div className="rg-btn-row">
                  <button className="rg-btn-back" onClick={() => setStep(2)} disabled={loading}><ChevL/> Back</button>
                  <button className="rg-btn-next" onClick={handleSubmitPayment} disabled={loading}>
                    {loading ? <><Spin/> Submitting…</> : <>
                      <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      Submit Payment Proof
                    </>}
                  </button>
                </div>
              </div>
            )}

            {/* ═══ STEP 4 — Success ═══ */}
            {step === 4 && (
              <div style={{ animation:"rg-fade-in .3s ease" }}>
                <div style={{ width:64, height:64, borderRadius:"50%", background:"#f0fdf4", border:"2px solid #86efac", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
                  <svg width={30} height={30} fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>

                <div style={{ background:"#f8fafc", border:"1.5px solid #e2e8f0", borderRadius:12, padding:"18px 22px", marginBottom:16 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:"#0f172a", marginBottom:12 }}>What happens next?</div>
                  {[
                    { n:"1", t:"Payment Verification", d:"Our team will check your screenshot and TID within 24 hours." },
                    { n:"2", t:"Account Activation",   d:"Once verified, your mill account will be activated." },
                    { n:"3", t:"Welcome Email",         d:"You'll receive an email with your login link and all details." },
                  ].map(s => (
                    <div key={s.n} style={{ display:"flex", gap:12, marginBottom:12 }}>
                      <div style={{ width:26, height:26, borderRadius:"50%", background:"#059669", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0 }}>{s.n}</div>
                      <div>
                        <div style={{ fontSize:12.5, fontWeight:700, color:"#0f172a" }}>{s.t}</div>
                        <div style={{ fontSize:12, color:"#64748b", lineHeight:1.5 }}>{s.d}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:8, padding:"10px 14px", fontSize:12.5, color:"#92400e", lineHeight:1.6, marginBottom:18 }}>
                  📧 A confirmation email has been sent to <strong>{form.email}</strong>. Check your inbox (and spam folder).
                </div>

                <button className="rg-btn-next" style={{ width:"100%" }} onClick={() => navigate("/")}>
                  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14"/></svg>
                  Back to Login
                </button>
              </div>
            )}

            {step < 4 && (
              <div className="rg-login-link">
                Already have an account? <Link to="/">Sign in here</Link>
              </div>
            )}

            <Notification message={notification.message} type={notification.type}
              onClose={() => setNotification({ message:"", type:"info" })}/>
          </div>
        </div>
      </div>
    </>
  );
}