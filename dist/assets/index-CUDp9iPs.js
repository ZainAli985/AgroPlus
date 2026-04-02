const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Masterportal-Dsoylc14.js","assets/vendor-react-BFXNeceC.js","assets/vendor-react-dom-DDWplefk.js","assets/vendor-DDAwBBib.js","assets/CreateAccount-Dxj_dbRw.js","assets/ViewAccounts-gLju_2Kv.js","assets/GeneralJournalEntry-PkoxPUOm.js","assets/JournalTopNav-BlpLUyTY.js","assets/ViewGeneralEntries-9f86-1wj.js","assets/InoviceDashboard-CrCcRgUq.js","assets/SalesInvoice-CxXhLsrd.js","assets/PurchaseInvoiceForm-w_6qKOlR.js","assets/ViewSalesInvoices-Da835scz.js","assets/ViewPurchaseInvoices-B5d9TqZV.js","assets/AccountsPage--Rr3QK7e.js","assets/LedgerSearch-CghfyUSy.js","assets/LedgerByReference-D0DiY1y7.js","assets/LedgerByAccount-BdiGnzAU.js","assets/ProductsList-C9vID_g_.js","assets/BalanceSheet-CyeSMuZs.js","assets/TrialBalance-1J05ew1K.js","assets/IncomeStatement-TaeoCD3Y.js","assets/CreateEmployee-CArjiIzc.js","assets/ViewEmployees-DVXYwirT.js","assets/WeightBridge-PvNUb364.js","assets/WeightBridgeInvoice-HHrufScc.js","assets/CashbookForm-CLoEKwRE.js","assets/CashbookReport-CjrEHkS3.js","assets/CreateChequeBook-B95BEooA.js","assets/ChequeTopNav-BwrjA0ks.js","assets/CreateChequeEntry-4NqhGHz4.js","assets/ViewChequeBooks-Hfd_1wBe.js","assets/Adminprofile-DZeBIUmZ.js","assets/Stockmanagement-BUVy-vrj.js"])))=>i.map(i=>d[i]);
import{j as e,a as o,u as ge,N as pe,b as Re,R as we,L as be,B as st,d as ot,e as u}from"./vendor-react-BFXNeceC.js";import{c as nt}from"./vendor-react-dom-DDWplefk.js";import{_ as v}from"./vendor-DDAwBBib.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const h of c.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&a(h)}).observe(document,{childList:!0,subtree:!0});function i(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(r){if(r.ep)return;r.ep=!0;const c=i(r);fetch(r.href,c)}})();const at=({show:s=!0,message:n})=>s?e.jsxs("div",{className:"fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm","aria-live":"polite","aria-busy":"true",role:"status",children:[e.jsx("div",{className:"loader-pulse flex items-center justify-center",children:e.jsx("img",{src:"/logo.png",alt:"",className:"loader-spin h-20 w-20 object-contain sm:h-24 sm:w-24",width:96,height:96})}),n&&e.jsx("p",{className:"mt-4 text-sm font-medium text-gray-600",children:n}),e.jsx("span",{className:"sr-only",children:"Loading…"})]}):null,rt=o.createContext(null);function it({children:s}){const[n,i]=o.useState(!1),[a,r]=o.useState(""),c=o.useCallback((h,g="")=>{i(!!h),r(g||"")},[]);return e.jsxs(rt.Provider,{value:{loading:n,setLoading:c,message:a},children:[s,e.jsx(at,{show:n,message:a})]})}function k({children:s}){const n=localStorage.getItem("token"),i=ge();if(!n)return e.jsx(pe,{to:"/",replace:!0});let a=[];try{a=JSON.parse(localStorage.getItem("allowedRoutes"))||[]}catch{a=[]}if(!a.length||a.includes("*"))return s;const r=i.pathname;return a.some(h=>{if(h===r||h.endsWith("/*")&&r.startsWith(h.replace("/*","")))return!0;const g=h.split("/"),w=r.split("/");return g.length!==w.length?!1:g.every((N,x)=>N.startsWith(":")||N===w[x])})?s:e.jsx(pe,{to:"/dashboard",replace:!0})}const V="/api";if(typeof document<"u"&&!document.getElementById("ntf-css")){const s=document.createElement("style");s.id="ntf-css",s.textContent=`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

    @keyframes ntf-in {
      0%   { opacity:0; transform:translateX(calc(100% + 24px)); }
      70%  { opacity:1; transform:translateX(-4px); }
      100% { opacity:1; transform:translateX(0); }
    }
    @keyframes ntf-out {
      0%   { opacity:1; transform:translateX(0); }
      100% { opacity:0; transform:translateX(calc(100% + 24px)); }
    }
    @keyframes ntf-bar {
      from { transform:scaleX(1); }
      to   { transform:scaleX(0); }
    }

    .ntf-host {
      position: fixed !important;
      top: 18px !important;
      right: 18px !important;
      z-index: 2147483647 !important;
      width: 340px;
      background: none !important;
      border: none !important;
      padding: 0 !important;
      margin: 0 !important;
      pointer-events: none;
    }
    .ntf-card {
      pointer-events: auto;
      position: relative;
      overflow: hidden;
      border-radius: 9px;
      background: #fff;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 20px rgba(0,0,0,.1), 0 1px 4px rgba(0,0,0,.06);
      font-family: 'DM Sans', sans-serif;
    }
    .ntf-card.ntf-in  { animation: ntf-in  .32s cubic-bezier(.22,1.2,.5,1) both; }
    .ntf-card.ntf-out { animation: ntf-out .22s cubic-bezier(.55,0,1,1) both; }

    .ntf-close {
      background: none; border: none; cursor: pointer;
      padding: 4px; border-radius: 5px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      color: #9ca3af; transition: color .1s, background .1s;
    }
    .ntf-close:hover { color: #374151; background: #f3f4f6; }
  `,document.head.appendChild(s)}const Ne={success:{label:"Success",accent:"#15803d",barBg:"#bbf7d0",iconBg:"#f0fdf4",iconBorder:"#bbf7d0",iconColor:"#15803d",topBar:"#15803d",icon:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})},error:{label:"Error",accent:"#dc2626",barBg:"#fecaca",iconBg:"#fef2f2",iconBorder:"#fecaca",iconColor:"#dc2626",topBar:"#dc2626",icon:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})},warning:{label:"Warning",accent:"#d97706",barBg:"#fde68a",iconBg:"#fffbeb",iconBorder:"#fde68a",iconColor:"#d97706",topBar:"#d97706",icon:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"})})},info:{label:"Info",accent:"#374151",barBg:"#e5e7eb",iconBg:"#f9fafb",iconBorder:"#e5e7eb",iconColor:"#374151",topBar:"#6b7280",icon:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}},Se=3800;function lt({message:s,type:n="info",onClose:i}){const[a,r]=o.useState("idle"),[c,h]=o.useState({message:"",type:"info"}),[g,w]=o.useState(0),N=o.useRef(null),x=()=>{clearTimeout(N.current),r("out"),setTimeout(()=>{r("idle"),i?.()},240)};if(o.useEffect(()=>{if(!s)return;clearTimeout(N.current);const S=()=>{h({message:s,type:n}),w(B=>B+1),r("in"),N.current=setTimeout(x,Se)};return a==="in"?(r("out"),setTimeout(S,240)):S(),()=>clearTimeout(N.current)},[s]),a==="idle")return null;const y=Ne[c.type]||Ne.info;return e.jsx("div",{className:"ntf-host",children:e.jsxs("div",{role:"alert","aria-live":"polite",className:`ntf-card ${a==="out"?"ntf-out":"ntf-in"}`,children:[e.jsx("div",{style:{height:3,background:y.topBar,borderRadius:"9px 9px 0 0"}}),e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:11,padding:"12px 13px 14px"},children:[e.jsx("div",{style:{width:32,height:32,borderRadius:7,flexShrink:0,background:y.iconBg,border:`1px solid ${y.iconBorder}`,display:"flex",alignItems:"center",justifyContent:"center",color:y.iconColor},children:y.icon}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:"'DM Mono', monospace",fontSize:9.5,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:y.accent,marginBottom:4},children:y.label}),e.jsx("div",{style:{fontFamily:"'DM Sans', sans-serif",fontSize:13,fontWeight:500,lineHeight:1.5,color:"#111827",wordBreak:"break-word"},children:c.message})]}),e.jsx("button",{className:"ntf-close",onClick:x,title:"Dismiss",children:e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})})]}),e.jsx("div",{style:{height:2,background:y.barBg,position:"relative",overflow:"hidden"},children:e.jsx("div",{style:{position:"absolute",inset:0,transformOrigin:"left",background:y.accent,animation:`ntf-bar ${Se}ms linear both`}},`p-${g}`)})]},g)})}const ct="@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",dt=`
  .lg-root *, .lg-root *::before, .lg-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lg-root {
    min-height: 100vh;
    display: flex;
    font-family: 'DM Sans', sans-serif;
    background: #f9fafb;
  }

  /* ══ LEFT — dark branding panel ══ */
  .lg-left {
    flex: 1;
    background: #111827;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 52px 60px 48px;
    position: relative;
    overflow: hidden;
    min-width: 0;
  }

  /* top accent bar */
  .lg-left::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: #065f46;
  }

  /* subtle dot grid */
  .lg-left::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,.04) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
    z-index: 0;
  }

  .lg-left-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }

  /* brand */
  .lg-brand { display: flex; align-items: center; gap: 12px; }
  .lg-brand-logo {
    width: 40px; height: 40px; border-radius: 9px;
    border: 1px solid rgba(255,255,255,.1);
    overflow: hidden; flex-shrink: 0;
  }
  .lg-brand-logo img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .lg-brand-fb {
    width: 100%; height: 100%;
    background: #065f46;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 14px; font-weight: 700; color: #ffffff;
  }
  .lg-brand-text { display: flex; flex-direction: column; }
  .lg-brand-name {
    font-family: 'DM Sans', sans-serif;
    font-size: 17px; font-weight: 700;
    color: rgba(255,255,255,.92); line-height: 1.2;
  }
  .lg-brand-by {
    font-size: 9px; font-weight: 700;
    letter-spacing: .15em; text-transform: uppercase;
    color: rgba(255,255,255,.28); margin-top: 2px;
  }

  /* copy block */
  .lg-copy { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 48px 0 32px; }
  .lg-tagline {
    font-size: 10px; font-weight: 700; letter-spacing: .18em;
    text-transform: uppercase; color: #065f46;
    margin-bottom: 18px;
    display: flex; align-items: center; gap: 10px;
  }
  .lg-tagline::before {
    content: '';
    display: inline-block;
    width: 24px; height: 2px;
    background: #065f46; border-radius: 2px;
  }
  .lg-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: 46px; font-weight: 700;
    color: rgba(255,255,255,.92);
    line-height: 1.1; letter-spacing: -.6px;
    margin-bottom: 18px;
  }
  .lg-headline em { font-style: italic; color: #6ee7b7; }
  .lg-desc {
    font-size: 13.5px; color: rgba(255,255,255,.45);
    line-height: 1.75; font-weight: 400;
    max-width: 360px; margin-bottom: 32px;
  }

  /* feature list */
  .lg-features { display: flex; flex-direction: column; gap: 10px; }
  .lg-feat {
    display: flex; align-items: center; gap: 10px;
    font-size: 13px; color: rgba(255,255,255,.4); font-weight: 500;
  }
  .lg-feat-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #065f46; flex-shrink: 0;
  }

  /* stamp */
  .lg-left-stamp {
    font-size: 9px; font-weight: 700;
    letter-spacing: .16em; text-transform: uppercase;
    color: rgba(255,255,255,.15);
  }

  /* ══ RIGHT — form panel ══ */
  .lg-right {
    width: 440px;
    flex-shrink: 0;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 52px 52px;
    border-left: 1px solid #e5e7eb;
    box-shadow: -6px 0 24px rgba(0,0,0,.05);
  }

  .lg-form-wrap { width: 100%; }

  /* eyebrow */
  .lg-eyebrow {
    font-size: 10px; font-weight: 700;
    letter-spacing: .2em; text-transform: uppercase;
    color: #065f46; margin-bottom: 7px;
    display: flex; align-items: center; gap: 8px;
  }
  .lg-eyebrow::before {
    content: '';
    display: inline-block;
    width: 18px; height: 2px;
    background: #065f46; border-radius: 2px;
  }

  .lg-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px; font-weight: 700; font-style: italic;
    color: #111827; letter-spacing: -.4px; line-height: 1.1;
    margin-bottom: 6px;
  }
  .lg-sub {
    font-size: 13px; color: #6b7280;
    margin-bottom: 32px; line-height: 1.5;
  }

  /* rule */
  .lg-rule {
    width: 32px; height: 2px;
    background: #e5e7eb; border-radius: 2px;
    margin-bottom: 28px;
  }

  /* field */
  .lg-field { margin-bottom: 20px; }
  .lg-lbl {
    display: flex; align-items: center; gap: 7px;
    font-size: 10px; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: #9ca3af; margin-bottom: 8px;
  }
  .lg-lbl-bar { width: 12px; height: 2px; border-radius: 2px; background: #065f46; }

  .lg-inp-wrap { position: relative; }
  .lg-inp-icon {
    position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
    color: #d1d5db; pointer-events: none; display: flex;
    transition: color .15s;
  }
  .lg-inp {
    width: 100%; padding: 11px 14px 11px 40px;
    border: 1.5px solid #e5e7eb; border-radius: 8px;
    font-size: 13.5px; font-family: 'DM Sans', sans-serif;
    color: #111827; background: #f9fafb;
    outline: none; transition: border-color .15s, background .12s, box-shadow .15s;
  }
  .lg-inp::placeholder { color: #d1d5db; font-style: italic; }
  .lg-inp:focus {
    border-color: #065f46;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(6,95,70,.09);
  }
  .lg-inp-wrap:focus-within .lg-inp-icon { color: #065f46; }

  .lg-cnic-inp {
    font-family: 'DM Mono', monospace !important;
    font-size: 14px !important;
    letter-spacing: .06em;
  }

  /* CNIC progress track */
  .lg-track { display: flex; gap: 3px; margin-top: 7px; align-items: center; }
  .lg-seg {
    flex: 1; height: 3px; border-radius: 3px;
    background: #e5e7eb; transition: background .14s, transform .1s;
  }
  .lg-seg.filled   { background: #6b7280; transform: scaleY(1.15); }
  .lg-seg.complete { background: #059669; transform: scaleY(1.2); box-shadow: 0 0 6px rgba(5,150,105,.25); }
  .lg-count {
    font-family: 'DM Mono', monospace; font-size: 9.5px;
    color: #d1d5db; margin-left: 6px; flex-shrink: 0;
    min-width: 28px; text-align: right; transition: color .15s;
  }

  /* eye toggle */
  .lg-eye {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    color: #d1d5db; display: flex; padding: 3px; transition: color .12s;
  }
  .lg-eye:hover { color: #065f46; }

  /* submit */
  .lg-btn {
    width: 100%; padding: 12px;
    border-radius: 8px; border: none; cursor: pointer;
    background: #065f46; color: #fff;
    font-size: 12.5px; font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: .07em; text-transform: uppercase;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    margin-top: 4px;
    box-shadow: 0 1px 8px rgba(6,95,70,.25);
    transition: background .15s, box-shadow .15s, transform .1s;
  }
  .lg-btn:hover:not(:disabled) {
    background: #047857;
    box-shadow: 0 3px 16px rgba(6,95,70,.35);
    transform: translateY(-1px);
  }
  .lg-btn:active:not(:disabled) { transform: translateY(0); }
  .lg-btn:disabled { opacity: .5; cursor: not-allowed; }

  /* form footer */
  .lg-form-foot {
    margin-top: 32px; padding-top: 20px;
    border-top: 1px solid #f3f4f6;
    display: flex; align-items: center; justify-content: space-between;
  }
  .lg-form-foot-brand { font-size: 8.5px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #d1d5db; }
  .lg-form-foot-copy  { font-size: 8.5px; color: #d1d5db; }

  .lg-spin {
    display: inline-block; width: 13px; height: 13px;
    border: 2px solid rgba(255,255,255,.3); border-top-color: #fff;
    border-radius: 50%; animation: lg-spin .7s linear infinite;
  }
  @keyframes lg-spin { to { transform: rotate(360deg); } }

  @media (max-width: 900px) {
    .lg-left  { display: none; }
    .lg-right { width: 100%; border-left: none; box-shadow: none; padding: 48px 36px; }
  }
  @media (max-width: 480px) { .lg-right { padding: 36px 24px; } }
`;function Le(s){const n=s.replace(/\D/g,"").slice(0,13);return n.length<=5?n:n.length<=12?`${n.slice(0,5)}-${n.slice(5)}`:`${n.slice(0,5)}-${n.slice(5,12)}-${n.slice(12)}`}const pt=["Precision accounting & general ledger","Purchase & sales invoicing","Weight bridge management","Cheque book tracking","Employee payroll & HR"];function ht(){const[s,n]=o.useState(""),[i,a]=o.useState(""),[r,c]=o.useState(!1),[h,g]=o.useState(!1),[w,N]=o.useState(!1),[x,y]=o.useState({message:"",type:"info"}),S=Re(),B=(p,A,D=3500)=>{y({message:p,type:A}),setTimeout(()=>y({message:"",type:"info"}),D)},f=s.replace(/\D/g,"").length,M=f===13,z=p=>n(Le(p.target.value.replace(/\D/g,""))),m=p=>{if(p.key==="Backspace"){const A=s.replace(/\D/g,"");A.length>0&&(p.preventDefault(),n(Le(A.slice(0,-1))))}},d=async p=>{p.preventDefault();const A=s.replace(/\D/g,"");if(A.length!==13){B("Please enter a valid 13-digit CNIC","warning");return}if(!i.trim()){B("Please enter your password","warning");return}g(!0);try{const D=await fetch(`${V}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({cnic:A,password:i})}),_=await D.json();D.ok?(localStorage.setItem("token",_.token),localStorage.setItem("role",_.role),localStorage.setItem("name",_.name),localStorage.setItem("millId",_.millId),localStorage.setItem("businessName",_.businessName),localStorage.setItem("logoUrl",_.logoUrl||""),localStorage.setItem("allowedRoutes",JSON.stringify(_.allowedRoutes)),B(_.message||"Welcome back!","success"),setTimeout(()=>S(_.portal==="master"?"/master":"/dashboard"),900)):(B(_.message||"Invalid credentials","error"),g(!1))}catch{B("Server error — please try again","warning"),g(!1)}};return e.jsxs(e.Fragment,{children:[e.jsxs("style",{children:[ct,dt]}),e.jsx(lt,{message:x.message,type:x.type,onClose:()=>y({message:"",type:"info"})}),e.jsxs("div",{className:"lg-root",children:[e.jsx("div",{className:"lg-left",children:e.jsxs("div",{className:"lg-left-inner",children:[e.jsxs("div",{className:"lg-brand",children:[e.jsx("div",{className:"lg-brand-logo",children:w?e.jsx("div",{className:"lg-brand-fb",children:"A+"}):e.jsx("img",{src:"/logo.png",alt:"Agro Plus",onError:()=>N(!0)})}),e.jsxs("div",{className:"lg-brand-text",children:[e.jsx("div",{className:"lg-brand-name",children:"Agro Plus"}),e.jsx("div",{className:"lg-brand-by",children:"by ORCA TECH. AND VENTURES"})]})]}),e.jsxs("div",{className:"lg-copy",children:[e.jsx("div",{className:"lg-tagline",children:"Rice Mill Platform"}),e.jsxs("h2",{className:"lg-headline",children:["Operations,",e.jsx("br",{}),e.jsx("em",{children:"Simplified."})]}),e.jsx("p",{className:"lg-desc",children:"The all-in-one management platform for rice mills — precision accounting, invoicing, weight bridge, and full team control in one place."}),e.jsx("div",{className:"lg-features",children:pt.map(p=>e.jsxs("div",{className:"lg-feat",children:[e.jsx("span",{className:"lg-feat-dot"}),p]},p))})]}),e.jsx("div",{className:"lg-left-stamp",children:"ORCA TECH. AND VENTURES · AGRO PLUS"})]})}),e.jsx("div",{className:"lg-right",children:e.jsxs("div",{className:"lg-form-wrap",children:[e.jsx("p",{className:"lg-eyebrow",children:"Secure Access"}),e.jsx("h1",{className:"lg-heading",children:"Welcome back"}),e.jsx("p",{className:"lg-sub",children:"Sign in with your CNIC and password"}),e.jsx("div",{className:"lg-rule"}),e.jsxs("form",{onSubmit:d,children:[e.jsxs("div",{className:"lg-field",children:[e.jsxs("label",{className:"lg-lbl",children:[e.jsx("span",{className:"lg-lbl-bar"}),"CNIC Number"]}),e.jsxs("div",{className:"lg-inp-wrap",children:[e.jsx("span",{className:"lg-inp-icon",children:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0"})})}),e.jsx("input",{className:"lg-inp lg-cnic-inp",type:"text",inputMode:"numeric",placeholder:"xxxxx-xxxxxxx-x",value:s,onChange:z,onKeyDown:m,maxLength:15,autoFocus:!0,autoComplete:"off"})]}),e.jsxs("div",{className:"lg-track",children:[Array.from({length:13},(p,A)=>e.jsx("div",{className:`lg-seg${A<f?M?" complete":" filled":""}`},A)),e.jsxs("span",{className:"lg-count",style:M?{color:"#059669"}:{},children:[f,"/13"]})]})]}),e.jsxs("div",{className:"lg-field",children:[e.jsxs("label",{className:"lg-lbl",children:[e.jsx("span",{className:"lg-lbl-bar"}),"Password"]}),e.jsxs("div",{className:"lg-inp-wrap",children:[e.jsx("span",{className:"lg-inp-icon",children:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"})})}),e.jsx("input",{className:"lg-inp",type:r?"text":"password",placeholder:"Enter your password",value:i,onChange:p=>a(p.target.value),autoComplete:"current-password",style:{paddingRight:42}}),e.jsx("button",{type:"button",className:"lg-eye",onClick:()=>c(p=>!p),tabIndex:-1,children:r?e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"})}):e.jsxs("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"})]})})]})]}),e.jsx("button",{type:"submit",className:"lg-btn",disabled:h,children:h?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"lg-spin"})," Authenticating…"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"})}),"Sign In to Dashboard"]})})]}),e.jsxs("div",{className:"lg-form-foot",children:[e.jsx("span",{className:"lg-form-foot-brand",children:"ORCA TECH. & VENTURES"}),e.jsxs("span",{className:"lg-form-foot-copy",children:["© ",new Date().getFullYear()," Agro Plus"]})]})]})})]})]})}const ft="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",gt=`
*, *::before, *::after { box-sizing: border-box; }
.sl-root {
  display: flex; min-height: 100vh;
  background: #f9fafb;
  font-family: 'DM Sans', sans-serif;
}

/* ══ SIDEBAR ══ */
.sl-sidebar {
  position: fixed; top: 0; left: 0; height: 100vh; width: 252px;
  background: #0d1117;
  display: flex; flex-direction: column;
  z-index: 50;
  transition: transform .25s cubic-bezier(.4,0,.2,1);
  border-right: 1px solid rgba(255,255,255,.07);
  box-shadow: 4px 0 28px rgba(0,0,0,.45);
}
.sl-sidebar.closed { transform: translateX(-100%); }

/* ── Brand ── */
.sl-brand {
  height: 70px; flex-shrink: 0;
  display: flex; align-items: center; gap: 11px;
  padding: 0 14px 0 13px;
  border-bottom: 1px solid rgba(255,255,255,.08);
  background: linear-gradient(135deg, #0d1117 60%, #111827 100%);
}
.sl-brand-logo {
  width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
  object-fit: cover;
  border: 1.5px solid rgba(255,255,255,.15);
  box-shadow: 0 2px 12px rgba(0,0,0,.4);
}
.sl-brand-logo-fb {
  width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
  background: #1f2937; border: 1.5px solid rgba(255,255,255,.1);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 800; color: #4ade80;
  box-shadow: 0 2px 12px rgba(0,0,0,.4);
}
.sl-wordmark {
  flex: 1; display: flex; align-items: baseline; gap: 0;
  font-size: 17px; font-weight: 800; letter-spacing: -.3px;
  line-height: 1; user-select: none;
}
.sl-wordmark-agro { color: #ffffff; }
.sl-wordmark-p    { color: #4ade80; }
.sl-wordmark-lus  { color: #e5e7eb; }
.sl-wordmark-plus { color: #4ade80; font-size: 20px; }
.sl-sidebar-close {
  margin-left: auto; flex-shrink: 0;
  background: rgba(255,255,255,.07); border: none; border-radius: 6px;
  width: 26px; height: 26px; display: none;
  align-items: center; justify-content: center;
  cursor: pointer; color: rgba(255,255,255,.4); transition: all .12s;
}
.sl-sidebar-close:hover { background: rgba(255,255,255,.14); color: #fff; }

/* ── Nav ── */
.sl-nav {
  flex: 1; overflow-y: auto; overflow-x: hidden;
  padding: 8px 8px 14px;
  scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.06) transparent;
}
.sl-nav::-webkit-scrollbar { width: 3px; }
.sl-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,.07); border-radius: 3px; }

.sl-section-lbl {
  font-size: 8.5px; font-weight: 700; letter-spacing: .13em;
  text-transform: uppercase; color: rgba(255,255,255,.18);
  padding: 14px 10px 4px; user-select: none;
}

/* ── Section toggle button ── */
.sl-menu-btn {
  width: 100%; display: flex; align-items: center; gap: 9px;
  padding: 7.5px 9px; border-radius: 6px; border: none; cursor: pointer;
  background: transparent; color: rgba(255,255,255,.5);
  font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600;
  transition: all .12s; text-align: left;
}
.sl-menu-btn:hover { background: rgba(255,255,255,.07); color: rgba(255,255,255,.85); }
.sl-menu-btn.open {
  background: rgba(74,222,128,.1);
  color: #ffffff;
  border-left: 2.5px solid #4ade80;
  padding-left: 6.5px;
}
.sl-menu-icon {
  width: 24px; height: 24px; border-radius: 5px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,.05);
  color: rgba(255,255,255,.45);
}
.sl-menu-btn.open .sl-menu-icon  { background: rgba(74,222,128,.15); color: #4ade80; }
.sl-menu-btn:hover .sl-menu-icon { color: rgba(255,255,255,.8); }
.sl-menu-label   { flex: 1; }
.sl-menu-chevron { flex-shrink: 0; transition: transform .18s; color: rgba(255,255,255,.2); }
.sl-menu-btn.open .sl-menu-chevron { transform: rotate(180deg); color: rgba(74,222,128,.6); }

/* ── Sub-links ── */
.sl-sub { overflow: hidden; transition: max-height .2s cubic-bezier(.4,0,.2,1), opacity .16s; max-height: 0; opacity: 0; }
.sl-sub.open { max-height: 500px; opacity: 1; }
.sl-sub-inner {
  padding: 3px 0 4px 11px;
  display: flex; flex-direction: column; gap: 1px;
  border-left: 1.5px solid rgba(74,222,128,.18);
  margin-left: 20px;
}
.sl-sub-link {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 10px; border-radius: 5px;
  font-size: 12px; font-weight: 500;
  color: rgba(255,255,255,.45); text-decoration: none; transition: all .1s;
}
.sl-sub-link:hover { background: rgba(255,255,255,.07); color: rgba(255,255,255,.9); }
.sl-sub-link.active {
  background: rgba(74,222,128,.14);
  color: #4ade80; font-weight: 700;
  border-left: 2px solid #4ade80;
  padding-left: 8px;
}
.sl-sub-link.soon { opacity: .35; cursor: default; }
.sl-sub-link.soon:hover { background: transparent; color: rgba(255,255,255,.35); }

/* sub-link dot */
.sl-sub-dot {
  width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
  background: rgba(255,255,255,.2); transition: background .1s;
}
.sl-sub-link.active .sl-sub-dot { background: #4ade80; }
.sl-sub-link:hover .sl-sub-dot  { background: rgba(255,255,255,.6); }

/* ── Direct link ── */
.sl-direct-link {
  display: flex; align-items: center; gap: 9px;
  padding: 7.5px 9px; border-radius: 6px;
  font-size: 12.5px; font-weight: 600;
  color: rgba(255,255,255,.5); text-decoration: none; transition: all .12s;
}
.sl-direct-link:hover { background: rgba(255,255,255,.07); color: rgba(255,255,255,.85); }
.sl-direct-link.active {
  background: rgba(74,222,128,.12); color: #4ade80; font-weight: 700;
  border-left: 2.5px solid #4ade80; padding-left: 6.5px;
}
.sl-direct-icon {
  width: 24px; height: 24px; border-radius: 5px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,.05);
}
.sl-direct-link.active .sl-direct-icon { background: rgba(74,222,128,.15); color: #4ade80; }

/* ── Language selector ── */
.sl-lang-wrap { position: relative; }
.sl-lang-btn {
  width: 100%; display: flex; align-items: center; gap: 9px;
  padding: 7px 9px; border-radius: 6px; border: none; cursor: pointer;
  background: transparent; color: rgba(255,255,255,.5);
  font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500;
  transition: all .12s;
}
.sl-lang-btn:hover { background: rgba(255,255,255,.07); color: rgba(255,255,255,.85); }
.sl-lang-panel {
  position: absolute; bottom: calc(100% + 6px); left: 0; right: 0;
  background: #1a2332; border: 1px solid rgba(255,255,255,.12);
  border-radius: 9px; overflow: hidden;
  box-shadow: 0 -12px 32px rgba(0,0,0,.5); z-index: 100;
}
.sl-lang-item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 13px; cursor: pointer; font-size: 13px;
  color: rgba(255,255,255,.6); transition: background .08s;
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.sl-lang-item:last-child { border-bottom: none; }
.sl-lang-item:hover { background: rgba(255,255,255,.07); color: #fff; }
.sl-lang-item.active { color: #4ade80; font-weight: 700; background: rgba(74,222,128,.08); }

/* ── Install button ── */
.sl-install-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 10px; border-radius: 7px; cursor: pointer;
  background: rgba(74,222,128,.08); color: rgba(74,222,128,.9);
  font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600;
  transition: all .12s; width: 100%; margin-bottom: 4px;
  border: 1px solid rgba(74,222,128,.18);
}
.sl-install-btn:hover { background: rgba(74,222,128,.16); border-color: rgba(74,222,128,.35); }

/* ── Footer / user chip ── */
.sl-sidebar-foot {
  padding: 8px 8px 10px;
  border-top: 1px solid rgba(255,255,255,.07); flex-shrink: 0;
}
.sl-user-chip {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 9px; border-radius: 7px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.07);
  margin-top: 6px;
}
.sl-user-avatar {
  width: 30px; height: 30px; border-radius: 7px; flex-shrink: 0;
  background: #1f2937; border: 1px solid rgba(255,255,255,.12);
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700; color: #4ade80;
  overflow: hidden;
}
.sl-user-info { flex: 1; overflow: hidden; }
.sl-user-name { font-size: 12px; font-weight: 600; color: rgba(255,255,255,.85); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sl-user-role { font-size: 9px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: rgba(255,255,255,.25); margin-top: 1px; }
.sl-user-logout {
  flex-shrink: 0; width: 25px; height: 25px; border-radius: 5px;
  background: rgba(239,68,68,.09); border: 1px solid rgba(239,68,68,.15);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: rgba(239,68,68,.55); transition: all .12s;
}
.sl-user-logout:hover { background: rgba(239,68,68,.18); color: #ef4444; }
.sl-profile-btn {
  flex-shrink: 0; width: 25px; height: 25px; border-radius: 5px;
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: rgba(255,255,255,.35); transition: all .12s; margin-right: 3px;
}
.sl-profile-btn:hover { background: rgba(255,255,255,.1); color: #fff; }

/* ══ TOPBAR ══ */
.sl-topbar {
  height: 56px; background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px; position: sticky; top: 0; z-index: 40;
  box-shadow: 0 1px 3px rgba(0,0,0,.06); flex-shrink: 0;
}
.sl-topbar-left  { display: flex; align-items: center; gap: 8px; }
.sl-topbar-right { display: flex; align-items: center; gap: 8px; }
.sl-hamburger {
  background: none; border: 1px solid #e5e7eb; border-radius: 6px;
  width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #6b7280; transition: all .12s;
}
.sl-hamburger:hover { border-color: #374151; color: #111827; background: #f9fafb; }
.sl-back-btn {
  background: none; border: 1px solid #e5e7eb; border-radius: 6px;
  width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #6b7280; transition: all .12s;
}
.sl-back-btn:hover { border-color: #374151; color: #111827; background: #f9fafb; }
.sl-topbar-title { font-size: 13px; font-weight: 600; color: #6b7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px; }
.sl-topbar-sep   { color: #d1d5db; font-size: 14px; user-select: none; }

/* ── Topbar company pill ── */
.sl-company-pill {
  display: flex; align-items: center; gap: 8px;
  padding: 5px 10px; border-radius: 7px;
  background: #f3f4f6; border: 1px solid #e5e7eb;
}
.sl-company-logo    { width: 20px; height: 20px; border-radius: 4px; object-fit: cover; flex-shrink: 0; border: 1px solid #e5e7eb; }
.sl-company-logo-fb {
  width: 20px; height: 20px; border-radius: 4px; flex-shrink: 0;
  background: #111827; display: flex; align-items: center; justify-content: center;
  font-size: 7.5px; font-weight: 800; color: #4ade80;
}
.sl-company-name { font-size: 12.5px; font-weight: 700; color: #111827; white-space: nowrap; letter-spacing: -.1px; }
.sl-welcome      { font-size: 12px; color: #6b7280; font-weight: 500; white-space: nowrap; }
.sl-welcome strong { color: #111827; font-weight: 700; }

/* ══ MAIN ══ */
.sl-main-wrap { flex: 1; display: flex; flex-direction: column; transition: margin-left .25s cubic-bezier(.4,0,.2,1); min-width: 0; }
.sl-main-wrap.sidebar-open { margin-left: 252px; }
.sl-content { flex: 1; padding: 24px; }
.sl-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 49; }
.sl-overlay.visible { display: block; }

.sl-soon-badge {
  font-size: 8px; font-weight: 700; padding: 1px 5px; border-radius: 3px;
  background: rgba(255,255,255,.07); color: rgba(255,255,255,.25);
  letter-spacing: .06em; text-transform: uppercase; margin-left: auto;
}

/* ── Profile lightbox ── */
.sl-lightbox {
  position: fixed; inset: 0; background: rgba(0,0,0,.88);
  display: flex; align-items: center; justify-content: center;
  z-index: 1200; cursor: zoom-out;
}
@keyframes sl-lb-in { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }
.sl-lightbox-inner {
  position: relative; animation: sl-lb-in .18s ease-out;
}

/* ── Google Translate suppression ── */
.goog-te-banner-frame.skiptranslate, iframe.goog-te-banner-frame { display:none!important; }
body { top: 0!important; }
#gt-element { position:absolute; left:-9999px; top:-9999px; visibility:hidden; }

@media (max-width: 900px) {
  .sl-main-wrap.sidebar-open { margin-left: 0!important; }
  .sl-sidebar-close { display: flex!important; }
  .sl-topbar-title  { display: none; }
  .sl-topbar-sep    { display: none; }
  .sl-company-name  { display: none; }
  .sl-welcome       { display: none; }
}
@media (max-width: 500px) { .sl-content { padding: 14px; } }
`,bt={"/dashboard":"Dashboard","/create-account":"Add Account","/view-accounts":"Chart of Accounts","/general-entries":"Journal Entries","/cashbook":"Cashbook Entry","/cashbook-report":"Daily Cashbook","/cheque-book/create":"Create Cheque Book","/cheque-book/entry":"Issue Cheque","/cheque-book/view":"Cheque Management","/add-invoice-purchase":"New Purchase","/view-purchase-invoices":"All Purchases","/add-invoice-sales":"Create Invoice","/view-sales-invoices":"Sales History","/products":"Products","/stock":"Inventory","/weight-bridge":"Weight Bridge","/weight-bridge/invoices":"WB Invoices","/employees/new":"New Employee","/employees":"All Employees","/trialbalance":"Trial Balance","/balancesheet":"Balance Sheet","/incomestatement":"Income Statement","/profile":"My Profile","/ledger":"Ledger"},de=[{code:"en",native:"English",flag:"🇬🇧"},{code:"ur",native:"اردو",flag:"🇵🇰"},{code:"hi",native:"हिन्दी",flag:"🇮🇳"}],C={home:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15.75a.75.75 0 01-.75-.75v-4.5h-6V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"})}),accounts:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})}),cash:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),bank:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"})}),purchase:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"})}),sales:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"})}),products:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"})}),weight:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"})}),employees:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"})}),reports:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})}),chevron:e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})}),back:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10 19l-7-7m0 0l7-7m-7 7h18"})}),menu:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 6h16M4 12h16M4 18h16"})}),close:e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})}),install:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"})}),profile:e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})}),logout:e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"})})},We=s=>(s||"U").split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase(),mt=()=>{const s=new Date().getHours();return s<12?"Good morning":s<17?"Good afternoon":s<21?"Good evening":"Good night"};let Me=!1;function ae(){if(document.getElementById("gt-suppress-style"))return;const s=document.createElement("style");s.id="gt-suppress-style",s.textContent=[".goog-te-banner-frame{display:none!important}","iframe.goog-te-banner-frame{display:none!important}","iframe.skiptranslate{display:none!important}",".goog-te-menu-frame{display:none!important}","#goog-gt-tt{display:none!important}",".goog-tooltip{display:none!important}",".goog-text-highlight{background:none!important;box-shadow:none!important}","body{top:0!important;}"].join(" "),document.head.appendChild(s)}function ut(){window.__slBodyWatcher||(window.__slBodyWatcher=setInterval(()=>{document.body?.style?.top&&document.body.style.top!=="0px"&&document.body.style.setProperty("top","0","important")},300))}function xt(){if(!Me&&(Me=!0,ae(),ut(),window.googleTranslateElementInit=()=>{if(!window.google?.translate?.TranslateElement)return;new window.google.translate.TranslateElement({pageLanguage:"en",includedLanguages:"en,ur,hi",autoDisplay:!1},"gt-element"),ae();const s=localStorage.getItem("ap-lang");s&&s!=="en"&&setTimeout(()=>Oe(s),1200)},!document.getElementById("gt-script"))){const s=document.createElement("script");s.id="gt-script",s.src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",s.async=!0,document.body.appendChild(s)}}function Oe(s){if(localStorage.setItem("ap-lang",s),ae(),s==="en"){document.cookie="googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",document.cookie="googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=."+window.location.hostname+";",window.location.reload();return}const n=(i=0)=>{const a=document.querySelector(".goog-te-combo");if(a){a.value=s,a.dispatchEvent(new Event("change")),setTimeout(ae,500);return}i<40&&setTimeout(()=>n(i+1),200)};n()}function jt({businessName:s,size:n=20}){const i=localStorage.getItem("logoUrl")||"",[a,r]=o.useState(!1),c=(s||"A").slice(0,2).toUpperCase();return i&&!a?e.jsx("img",{src:i,alt:s,onError:()=>r(!0),style:{width:n,height:n,borderRadius:4,objectFit:"cover",border:"1px solid #e5e7eb",flexShrink:0}}):e.jsx("div",{style:{width:n,height:n,borderRadius:4,background:"#111827",display:"flex",alignItems:"center",justifyContent:"center",fontSize:Math.round(n*.38),fontWeight:800,color:"#4ade80",flexShrink:0},children:c})}function kt(){const[s,n]=o.useState(!1);return s?e.jsx("div",{className:"sl-brand-logo-fb",children:"A+"}):e.jsx("img",{src:"/logo.png",alt:"AgroPlus+",className:"sl-brand-logo",onError:()=>n(!0)})}function me(){const[s,n]=o.useState(()=>localStorage.getItem("adminPic")||"");return o.useEffect(()=>{const i=localStorage.getItem("token");i&&fetch(`${V}/profile`,{headers:{Authorization:`Bearer ${i}`}}).then(a=>a.ok?a.json():null).then(a=>{const r=a?.profile||a,c=r?.profilePic||r?.avatarUrl||r?.adminProfilePic||"";c&&(n(c),localStorage.setItem("adminPic",c))}).catch(()=>{})},[]),s}function vt({name:s}){const n=me(),[i,a]=o.useState(!1);return n&&!i?e.jsx("div",{className:"sl-user-avatar",children:e.jsx("img",{src:n,alt:s,onError:()=>a(!0),style:{width:"100%",height:"100%",objectFit:"cover"}})}):e.jsx("div",{className:"sl-user-avatar",children:We(s)})}function yt({name:s,onClick:n}){const i=me(),[a,r]=o.useState(!1);return i&&!a?e.jsx("button",{onClick:n,title:"View profile",style:{width:32,height:32,borderRadius:"50%",border:"2px solid #e5e7eb",background:"#1f2937",cursor:"pointer",flexShrink:0,overflow:"hidden",padding:0},children:e.jsx("img",{src:i,alt:s,onError:()=>r(!0),style:{width:"100%",height:"100%",objectFit:"cover"}})}):e.jsx("button",{onClick:n,title:s,style:{width:32,height:32,borderRadius:"50%",border:"2px solid #e5e7eb",background:"#111827",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"#4ade80",transition:".12s",flexShrink:0},children:We(s)})}function wt(){return e.jsxs("div",{className:"sl-wordmark",children:[e.jsx("span",{className:"sl-wordmark-agro",children:"Agro"}),e.jsx("span",{className:"sl-wordmark-p",children:"P"}),e.jsx("span",{className:"sl-wordmark-lus",children:"lus"}),e.jsx("span",{className:"sl-wordmark-plus",children:"+"})]})}function Nt(){const[s,n]=o.useState(!1),[i,a]=o.useState(()=>localStorage.getItem("ap-lang")||"en"),r=o.useRef(null),c=de.find(g=>g.code===i)||de[0];o.useEffect(()=>{xt()},[]),o.useEffect(()=>{const g=w=>{r.current&&!r.current.contains(w.target)&&n(!1)};return document.addEventListener("mousedown",g),()=>document.removeEventListener("mousedown",g)},[]);const h=g=>{a(g),n(!1),Oe(g)};return e.jsxs("div",{ref:r,className:"sl-lang-wrap",children:[s&&e.jsx("div",{className:"sl-lang-panel",children:de.map(g=>e.jsxs("div",{className:`sl-lang-item${i===g.code?" active":""}`,onClick:()=>h(g.code),children:[e.jsx("span",{style:{fontSize:17},children:g.flag}),e.jsx("span",{style:{flex:1,fontSize:13,fontWeight:i===g.code?700:500},children:g.native}),i===g.code&&e.jsx("svg",{width:10,height:10,fill:"none",viewBox:"0 0 24 24",stroke:"#4ade80",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})]},g.code))}),e.jsxs("button",{className:"sl-lang-btn",onClick:()=>n(g=>!g),children:[e.jsx("span",{className:"sl-menu-icon",style:{fontSize:14},children:c.flag}),e.jsx("span",{style:{flex:1},children:c.native}),e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"rgba(255,255,255,.25)",strokeWidth:2.5,style:{flexShrink:0,transition:".12s",transform:s?"rotate(180deg)":"none"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),e.jsx("div",{id:"gt-element"})]})}function $({icon:s,label:n,menuKey:i,activeMenu:a,setActiveMenu:r,children:c}){const h=a===i;return e.jsxs("div",{children:[e.jsxs("button",{className:`sl-menu-btn${h?" open":""}`,onClick:()=>r(h?"":i),children:[e.jsx("span",{className:"sl-menu-icon",children:s}),e.jsx("span",{className:"sl-menu-label",children:n}),e.jsx("span",{className:"sl-menu-chevron",children:C.chevron})]}),e.jsx("div",{className:`sl-sub${h?" open":""}`,children:e.jsx("div",{className:"sl-sub-inner",children:c})})]})}function L({to:s,label:n,isActive:i,hasAccess:a,soon:r}){return a?r?e.jsxs("span",{className:"sl-sub-link soon",children:[e.jsx("span",{className:"sl-sub-dot"}),n,e.jsx("span",{className:"sl-soon-badge",children:"soon"})]}):e.jsxs(be,{to:s,className:`sl-sub-link${i?" active":""}`,children:[e.jsx("span",{className:"sl-sub-dot"}),n]}):null}function St(){const[s,n]=o.useState(null),[i,a]=o.useState(!1);if(o.useEffect(()=>{if(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone){a(!0);return}const c=h=>{h.preventDefault(),n(h)};return window.addEventListener("beforeinstallprompt",c),window.addEventListener("appinstalled",()=>{n(null),a(!0)}),()=>window.removeEventListener("beforeinstallprompt",c)},[]),i||!s)return null;const r=async()=>{if(!s)return;s.prompt();const{outcome:c}=await s.userChoice;c==="accepted"&&(n(null),a(!0))};return e.jsxs("button",{className:"sl-install-btn",onClick:r,title:"Install Agro Plus as an app",children:[e.jsx("span",{className:"sl-menu-icon",style:{background:"rgba(74,222,128,.12)",color:"#4ade80"},children:C.install}),e.jsx("span",{style:{flex:1},children:"Install App"})]})}function Lt({src:s,name:n,onClose:i}){return o.useEffect(()=>{const a=r=>{r.key==="Escape"&&i()};return window.addEventListener("keydown",a),()=>window.removeEventListener("keydown",a)},[i]),e.jsx("div",{className:"sl-lightbox",onClick:i,children:e.jsxs("div",{className:"sl-lightbox-inner",onClick:a=>a.stopPropagation(),children:[e.jsx("img",{src:s,alt:n,style:{maxWidth:"min(380px, 88vw)",maxHeight:"88vh",borderRadius:16,objectFit:"cover",display:"block",boxShadow:"0 24px 80px rgba(0,0,0,.7)",border:"2.5px solid rgba(255,255,255,.15)"}}),e.jsx("div",{style:{position:"absolute",top:-10,right:-10},children:e.jsx("button",{onClick:i,style:{width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"},children:C.close})}),e.jsx("div",{style:{position:"absolute",bottom:-30,left:0,right:0,textAlign:"center"},children:e.jsx("span",{style:{fontSize:12,color:"rgba(255,255,255,.4)"},children:"Click anywhere or Esc to close"})})]})})}function Mt({children:s}){const[n,i]=o.useState(!0),[a,r]=o.useState(""),[c,h]=o.useState(!1),[g,w]=o.useState(!1),N=ge(),x=Re(),y=o.useRef(null),S=me(),B=localStorage.getItem("role")||"Admin",f=localStorage.getItem("name")||"User",M=localStorage.getItem("businessName")||"Agro Plus",z=B==="Admin",m=we.useMemo(()=>{try{return JSON.parse(localStorage.getItem("allowedRoutes"))||[]}catch{return[]}},[]),d=we.useCallback(b=>!m?.length||m.includes("*")?!0:m.some(J=>J===b||b.startsWith(J.replace("/*",""))),[m]),p=b=>N.pathname===b;o.useEffect(()=>{const b=N.pathname;b==="/dashboard"?r("dashboard"):b.includes("account")||b.includes("ledger")?r("accounts"):b.includes("cashbook")||b.includes("general-entries")?r("cash"):b.includes("cheque")||b.includes("bank")?r("bank"):b.includes("purchase")?r("purchase"):b.includes("sales")||b.includes("sales-invoices")?r("sales"):b.includes("product")||b.includes("stock")?r("products"):b.includes("weight-bridge")?r("weight"):b.includes("employee")?r("employees"):(b.includes("balance")||b.includes("income")||b.includes("trial"))&&r("reports")},[N.pathname]),o.useEffect(()=>{const b=J=>{y.current&&!y.current.contains(J.target)&&h(!1)};return document.addEventListener("mousedown",b),()=>document.removeEventListener("mousedown",b)},[]);const A=()=>{window.innerWidth<900&&i(!1)},D=()=>{["token","role","name","allowedRoutes","millId","businessName","logoUrl","adminPic"].forEach(b=>localStorage.removeItem(b)),x("/")},_=bt[N.pathname]||"",ie=()=>h(b=>!b);return e.jsxs("div",{className:"sl-root",children:[e.jsxs("style",{children:[ft,gt]}),e.jsx("div",{className:`sl-overlay${n&&window.innerWidth<900?" visible":""}`,onClick:()=>i(!1)}),e.jsxs("aside",{className:`sl-sidebar${n?"":" closed"}`,children:[e.jsxs("div",{className:"sl-brand",children:[e.jsx(kt,{}),e.jsx(wt,{}),e.jsx("button",{className:"sl-sidebar-close",onClick:()=>i(!1),children:C.close})]}),e.jsxs("nav",{className:"sl-nav",children:[d("/dashboard")&&e.jsxs(be,{to:"/dashboard",className:`sl-direct-link${p("/dashboard")?" active":""}`,onClick:A,children:[e.jsx("span",{className:"sl-direct-icon",children:C.home}),"Dashboard"]}),(d("/create-account")||d("/view-accounts"))&&e.jsxs($,{icon:C.accounts,label:"Accounts",menuKey:"accounts",activeMenu:a,setActiveMenu:r,children:[e.jsx(L,{to:"/create-account",label:"Add Account",isActive:p("/create-account"),hasAccess:d("/create-account")}),e.jsx(L,{to:"/view-accounts",label:"Chart of Accounts",isActive:p("/view-accounts"),hasAccess:d("/view-accounts")})]}),(d("/general-entries")||d("/cashbook")||d("/cashbook-report"))&&e.jsxs($,{icon:C.cash,label:"Cash Management",menuKey:"cash",activeMenu:a,setActiveMenu:r,children:[e.jsx(L,{to:"/general-entries",label:"Journal Entries",isActive:p("/general-entries"),hasAccess:d("/general-entries")}),e.jsx(L,{to:"/cashbook",label:"Cashbook Entry",isActive:p("/cashbook"),hasAccess:d("/cashbook")}),e.jsx(L,{to:"#",label:"Fund Transfer",isActive:!1,hasAccess:!0,soon:!0}),e.jsx(L,{to:"/cashbook-report",label:"Daily Cashbook",isActive:p("/cashbook-report"),hasAccess:d("/cashbook-report")})]}),e.jsxs($,{icon:C.bank,label:"Bank Management",menuKey:"bank",activeMenu:a,setActiveMenu:r,children:[e.jsx(L,{to:"#",label:"Add Bank Account",isActive:!1,hasAccess:!0,soon:!0}),e.jsx(L,{to:"/cheque-book/create",label:"Create Cheque Book",isActive:p("/cheque-book/create"),hasAccess:!0}),e.jsx(L,{to:"/cheque-book/entry",label:"Issue Cheque",isActive:p("/cheque-book/entry"),hasAccess:!0}),e.jsx(L,{to:"/cheque-book/view",label:"Cheque Management",isActive:p("/cheque-book/view"),hasAccess:!0}),e.jsx(L,{to:"#",label:"Bank Reconciliation",isActive:!1,hasAccess:!0,soon:!0})]}),(d("/add-invoice-purchase")||d("/view-purchase-invoices"))&&e.jsxs($,{icon:C.purchase,label:"Purchase",menuKey:"purchase",activeMenu:a,setActiveMenu:r,children:[e.jsx(L,{to:"/add-invoice-purchase",label:"New Purchase Order",isActive:p("/add-invoice-purchase"),hasAccess:d("/add-invoice-purchase")}),e.jsx(L,{to:"/view-purchase-invoices",label:"All Purchases",isActive:p("/view-purchase-invoices"),hasAccess:d("/view-purchase-invoices")})]}),(d("/add-invoice-sales")||d("/view-sales-invoices"))&&e.jsxs($,{icon:C.sales,label:"Sales",menuKey:"sales",activeMenu:a,setActiveMenu:r,children:[e.jsx(L,{to:"/add-invoice-sales",label:"Create Invoice",isActive:p("/add-invoice-sales"),hasAccess:d("/add-invoice-sales")}),e.jsx(L,{to:"/view-sales-invoices",label:"Sales History",isActive:p("/view-sales-invoices"),hasAccess:d("/view-sales-invoices")})]}),(d("/products")||d("/stock"))&&e.jsxs($,{icon:C.products,label:"Products",menuKey:"products",activeMenu:a,setActiveMenu:r,children:[e.jsx(L,{to:"/products",label:"Products List",isActive:p("/products"),hasAccess:d("/products")}),e.jsx(L,{to:"/stock",label:"Inventory",isActive:p("/stock"),hasAccess:d("/stock")})]}),(d("/weight-bridge")||d("/weight-bridge/invoices"))&&e.jsxs($,{icon:C.weight,label:"Weight Bridge",menuKey:"weight",activeMenu:a,setActiveMenu:r,children:[e.jsx(L,{to:"/weight-bridge",label:"WB Entry",isActive:p("/weight-bridge"),hasAccess:d("/weight-bridge")}),e.jsx(L,{to:"/weight-bridge/invoices",label:"WB Invoices",isActive:p("/weight-bridge/invoices"),hasAccess:d("/weight-bridge/invoices")})]}),(d("/employees")||d("/employees/new"))&&e.jsxs($,{icon:C.employees,label:"Employees",menuKey:"employees",activeMenu:a,setActiveMenu:r,children:[e.jsx(L,{to:"/employees/new",label:"New Employee",isActive:p("/employees/new"),hasAccess:d("/employees/new")}),e.jsx(L,{to:"/employees",label:"All Employees",isActive:p("/employees"),hasAccess:d("/employees")})]}),(d("/trialbalance")||d("/balancesheet")||d("/incomestatement"))&&e.jsxs($,{icon:C.reports,label:"Reports",menuKey:"reports",activeMenu:a,setActiveMenu:r,children:[e.jsx(L,{to:"/trialbalance",label:"Trial Balance",isActive:p("/trialbalance"),hasAccess:d("/trialbalance")}),e.jsx(L,{to:"/balancesheet",label:"Balance Sheet",isActive:p("/balancesheet"),hasAccess:d("/balancesheet")}),e.jsx(L,{to:"/incomestatement",label:"Income Statement",isActive:p("/incomestatement"),hasAccess:d("/incomestatement")})]})]}),e.jsxs("div",{className:"sl-sidebar-foot",children:[e.jsx(St,{}),e.jsx(Nt,{}),e.jsx("div",{style:{height:1,background:"rgba(255,255,255,.06)",margin:"6px 0"}}),e.jsxs("div",{className:"sl-user-chip",children:[e.jsx(vt,{name:f}),e.jsxs("div",{className:"sl-user-info",children:[e.jsx("div",{className:"sl-user-name",children:f}),e.jsx("div",{className:"sl-user-role",children:B})]}),z&&e.jsx("button",{className:"sl-profile-btn",title:"Profile",onClick:()=>{x("/profile"),A()},children:C.profile}),e.jsx("button",{className:"sl-user-logout",title:"Sign Out",onClick:D,children:C.logout})]})]})]}),e.jsxs("div",{className:`sl-main-wrap${n?" sidebar-open":""}`,children:[e.jsxs("header",{className:"sl-topbar",children:[e.jsxs("div",{className:"sl-topbar-left",children:[e.jsx("button",{className:"sl-hamburger",onClick:()=>i(b=>!b),children:C.menu}),N.pathname!=="/dashboard"&&e.jsx("button",{className:"sl-back-btn",onClick:()=>x(-1),children:C.back}),e.jsxs("div",{className:"sl-company-pill",children:[e.jsx(jt,{businessName:M,size:20}),e.jsx("span",{className:"sl-company-name",children:M})]}),_&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"sl-topbar-sep",children:"·"}),e.jsx("span",{className:"sl-topbar-title",children:_})]})]}),e.jsxs("div",{className:"sl-topbar-right",children:[e.jsxs("span",{className:"sl-welcome",children:[mt(),", ",e.jsx("strong",{children:f.split(" ")[0]})]}),e.jsxs("div",{ref:y,style:{position:"relative"},children:[e.jsx(yt,{name:f,onClick:ie}),c&&e.jsxs("div",{style:{position:"absolute",right:0,top:"calc(100% + 6px)",width:175,zIndex:200,background:"#fff",border:"1px solid #e5e7eb",borderRadius:9,boxShadow:"0 8px 24px rgba(0,0,0,.1)",overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"9px 13px 7px",borderBottom:"1px solid #f3f4f6"},children:[S&&e.jsx("img",{src:S,alt:f,style:{width:48,height:48,borderRadius:8,objectFit:"cover",marginBottom:7,border:"1px solid #e5e7eb",display:"block"}}),e.jsx("div",{style:{fontSize:12.5,fontWeight:700,color:"#111827"},children:f}),e.jsx("div",{style:{fontSize:11,color:"#6b7280"},children:B})]}),z&&e.jsxs("button",{onClick:()=>{x("/profile"),h(!1)},style:{width:"100%",padding:"8px 13px",background:"none",border:"none",textAlign:"left",fontSize:12.5,color:"#1f2937",cursor:"pointer",display:"flex",alignItems:"center",gap:7,fontWeight:500,fontFamily:"'DM Sans',sans-serif"},onMouseEnter:b=>b.currentTarget.style.background="#f9fafb",onMouseLeave:b=>b.currentTarget.style.background="none",children:[C.profile," My Profile"]}),e.jsxs("button",{onClick:D,style:{width:"100%",padding:"8px 13px",background:"none",border:"none",borderTop:"1px solid #f3f4f6",textAlign:"left",fontSize:12.5,color:"#dc2626",cursor:"pointer",display:"flex",alignItems:"center",gap:7,fontWeight:500,fontFamily:"'DM Sans',sans-serif"},onMouseEnter:b=>b.currentTarget.style.background="#fef2f2",onMouseLeave:b=>b.currentTarget.style.background="none",children:[C.logout," Sign Out"]})]})]})]})]}),e.jsx("main",{className:"sl-content",children:s})]}),g&&S&&e.jsx(Lt,{src:S,name:f,onClose:()=>w(!1)})]})}const Z=async(s,n={})=>{const i=localStorage.getItem("token"),a=await fetch(s,{...n,headers:{Authorization:`Bearer ${i}`,...n.headers}});return a.status===401&&(localStorage.removeItem("token"),window.location.href="/"),a},At="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",Ct=`
  *, *::before, *::after { box-sizing: border-box; }
  .db { font-family: 'DM Sans', sans-serif; color: #111827; max-width: 1180px; margin: 0 auto; }

  /* ── Section header ── */
  .db-sec {
    font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
    color: #9ca3af; margin: 22px 0 10px;
    display: flex; align-items: center; gap: 10px;
  }
  .db-sec::after { content:''; flex:1; height:1px; background:#e5e7eb; }

  /* ── Card ── */
  .db-card {
    background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;
    position: relative; overflow: hidden; transition: box-shadow .15s;
  }
  .db-card:hover { box-shadow: 0 3px 14px rgba(0,0,0,.07); }
  .db-accent { position: absolute; top: 0; left: 0; right: 0; height: 3px; }

  /* ── Card heading ── */
  .db-lbl {
    font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
    color: #6b7280; margin-bottom: 6px;
  }
  .db-val {
    font-family: 'DM Mono', monospace; font-size: 22px; font-weight: 700;
    color: #111827; letter-spacing: -.5px; line-height: 1;
  }
  .db-val.pos { color: #15803d; }
  .db-val.neg { color: #b91c1c; }
  .db-val.dk  { color: #1f2937; }
  .db-sub { font-size: 11.5px; color: #9ca3af; margin-top: 5px; }

  /* ── Period pills ── */
  .db-filter { display: flex; gap: 4px; flex-wrap: wrap; margin-top: 10px; }
  .db-fpill {
    padding: 3px 9px; border-radius: 5px; font-size: 10px; font-weight: 600;
    border: 1px solid #e5e7eb; background: #fff; color: #6b7280;
    cursor: pointer; transition: all .1s; font-family: 'DM Sans', sans-serif;
  }
  .db-fpill:hover { border-color: #374151; color: #111827; }
  .db-fpill.on { background: #111827; color: #fff; border-color: #111827; }
  .db-fpill-date {
    padding: 3px 7px; border-radius: 5px; font-size: 10px;
    border: 1px solid #e5e7eb; background: #fff; color: #111827;
    outline: none; font-family: 'DM Mono', monospace;
  }
  .db-fpill-date:focus { border-color: #6b7280; }

  /* ── Account row ── */
  .db-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 5px 0; border-bottom: 1px solid #f9fafb; font-size: 12px;
  }
  .db-row:last-child { border-bottom: none; }
  .db-rn { color: #374151; font-weight: 500; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .db-rb { font-family: 'DM Mono', monospace; font-size: 11.5px; font-weight: 600; flex-shrink: 0; margin-left: 8px; }
  .db-rb.pos { color: #15803d; }
  .db-rb.neg { color: #b91c1c; }

  /* ── Expand btn ── */
  .db-more {
    width: 100%; margin-top: 7px; padding: 4px; border: 1px solid #e5e7eb;
    border-radius: 5px; background: #f9fafb; color: #6b7280;
    font-size: 11px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all .1s; display: flex; align-items: center; justify-content: center; gap: 4px;
  }
  .db-more:hover { background: #e5e7eb; color: #111827; }

  /* ── Cheque row ── */
  .db-cq { display: flex; align-items: center; gap: 7px; padding: 6px 8px; border-radius: 6px; background: #f9fafb; margin-bottom: 4px; font-size: 11.5px; }
  .db-cq:last-child { margin-bottom: 0; }
  .db-cq-no   { font-family: 'DM Mono', monospace; font-size: 10px; color: #9ca3af; flex-shrink: 0; }
  .db-cq-name { flex: 1; color: #374151; font-weight: 500; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .db-cq-amt  { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 600; color: #1f2937; flex-shrink: 0; }
  .db-cq-badge { font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: #fffbeb; color: #92400e; border: 1px solid #fde68a; flex-shrink: 0; }

  /* ── Mini bar ── */
  .db-bar-row { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; }
  .db-bar-lbl { font-size: 10px; color: #9ca3af; min-width: 32px; text-align: right; font-family: 'DM Mono', monospace; }
  .db-bar-track { flex: 1; height: 5px; background: #f3f4f6; border-radius: 3px; overflow: hidden; }
  .db-bar-fill  { height: 100%; border-radius: 3px; transition: width .4s ease; }
  .db-bar-val   { font-size: 10px; color: #9ca3af; min-width: 60px; font-family: 'DM Mono', monospace; }

  /* ── Skeleton ── */
  @keyframes db-sk { to { background-position: -200% 0; } }
  .db-sk {
    background: linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%);
    background-size: 200% 100%; animation: db-sk 1.4s infinite; border-radius: 5px;
  }

  /* ── Bank row ── */
  .db-bank-row {
    display: flex; align-items: center; gap: 9px;
    padding: 6px 0; border-bottom: 1px solid #f9fafb; font-size: 12px;
  }
  .db-bank-row:last-child { border-bottom: none; }
  .db-bank-badge {
    width: 28px; height: 28px; border-radius: 6px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Mono', monospace; font-size: 8px; font-weight: 700;
    border: 1px solid #e5e7eb; overflow: hidden; background: #f9fafb;
  }
  .db-bank-badge img { width: 100%; height: 100%; object-fit: contain; padding: 2px; }
  .db-bank-info { flex: 1; min-width: 0; }
  .db-bank-full { font-size: 10px; font-weight: 600; color: #6b7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .db-bank-name { font-size: 12px; font-weight: 700; color: #111827; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  /* ── Product filter dropdown ── */
  .db-prod-wrap { position: relative; margin-top: 10px; }
  .db-prod-btn {
    width: 100%; text-align: left; padding: 6px 10px;
    border: 1px solid #e5e7eb; border-radius: 6px;
    font-size: 11.5px; font-family: 'DM Sans', sans-serif; color: #374151;
    background: #f9fafb; cursor: pointer;
    display: flex; align-items: center; justify-content: space-between; gap: 6px;
    transition: border-color .12s;
  }
  .db-prod-btn:hover { border-color: #d1d5db; background: #fff; }
  .db-prod-btn.open { border-color: #6b7280; background: #fff; box-shadow: 0 0 0 2px rgba(107,114,128,.1); }
  .db-prod-panel {
    position: fixed; z-index: 9500;
    background: #fff; border: 1px solid #d1d5db; border-radius: 7px;
    box-shadow: 0 4px 16px rgba(0,0,0,.1); overflow: hidden;
  }
  .db-prod-search {
    width: 100%; padding: 7px 10px; border: none; border-bottom: 1px solid #f3f4f6;
    font-size: 12px; font-family: 'DM Sans', sans-serif; outline: none;
    background: #f9fafb;
  }
  .db-prod-item {
    padding: 7px 12px; font-size: 12px; cursor: pointer; color: #374151;
    border-bottom: 1px solid #f9fafb; transition: background .08s;
    display: flex; align-items: center; gap: 7px;
  }
  .db-prod-item:hover { background: #f3f4f6; }
  .db-prod-item.sel { background: #f0fdf4; color: #15803d; font-weight: 600; }
  .db-prod-item:last-child { border-bottom: none; }
  .db-prod-check { width: 14px; height: 14px; border-radius: 3px; border: 1.5px solid #d1d5db; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .db-prod-check.on { background: #15803d; border-color: #15803d; }

  /* ── Grids ── */
  .db-g3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
  .db-g2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }
  .db-g4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }

  @media (max-width: 1024px) { .db-g4{grid-template-columns:repeat(2,1fr);} .db-g3{grid-template-columns:repeat(2,1fr);} }
  @media (max-width: 640px)  { .db-g4,.db-g3,.db-g2{grid-template-columns:1fr;} .db-val{font-size:18px;} }
`,he=[{id:1,abbr:"NBP",fullName:"National Bank of Pakistan",color:"#007940",bg:"#e6f4ec",keys:["national bank","nbp"]},{id:2,abbr:"BOP",fullName:"The Bank of Punjab",color:"#1a237e",bg:"#e8eaf6",keys:["bank of punjab","bop"]},{id:3,abbr:"BOK",fullName:"The Bank of Khyber",color:"#2e4057",bg:"#eaecf0",keys:["bank of khyber","bok"]},{id:4,abbr:"SBL",fullName:"Sindh Bank Limited",color:"#374151",bg:"#f3f4f6",keys:["sindh bank","sbl"]},{id:5,abbr:"FWBL",fullName:"First Women Bank Limited",color:"#7c3aed",bg:"#f5f3ff",keys:["first women","fwbl"]},{id:6,abbr:"HBL",fullName:"Habib Bank Limited",color:"#006633",bg:"#e6f4ed",keys:["habib bank","hbl"]},{id:7,abbr:"UBL",fullName:"United Bank Limited",color:"#003087",bg:"#e8eef8",keys:["united bank","ubl"]},{id:8,abbr:"MCB",fullName:"MCB Bank Limited",color:"#c8102e",bg:"#fce8ec",keys:["mcb bank","mcb"]},{id:9,abbr:"ABL",fullName:"Allied Bank Limited",color:"#b8860b",bg:"#fdf6e3",keys:["allied bank","abl"]},{id:10,abbr:"BAFL",fullName:"Bank Alfalah Limited",color:"#c8102e",bg:"#fce8ec",keys:["bank alfalah","alfalah","bafl"]},{id:11,abbr:"BAHL",fullName:"Bank Al Habib Limited",color:"#00703c",bg:"#e6f4ed",keys:["bank al habib","bahl"]},{id:12,abbr:"AKBL",fullName:"Askari Bank Limited",color:"#004225",bg:"#e6f0ea",keys:["askari","akbl"]},{id:13,abbr:"HMB",fullName:"Habib Metropolitan Bank Limited",color:"#1a3c6e",bg:"#eaf0f8",keys:["habib metropolitan","hmb","habibmetro"]},{id:14,abbr:"SNBL",fullName:"Soneri Bank Limited",color:"#8b0000",bg:"#fce8e8",keys:["soneri","snbl"]},{id:15,abbr:"JSBL",fullName:"JS Bank Limited",color:"#d4380d",bg:"#fff2ed",keys:["js bank","jsbl"]},{id:16,abbr:"SAMB",fullName:"Samba Bank Limited",color:"#d4001c",bg:"#fce8e8",keys:["samba","samb"]},{id:17,abbr:"SILK",fullName:"Silkbank Limited",color:"#7c3aed",bg:"#f5f3ff",keys:["silkbank","silk"]},{id:18,abbr:"SMBL",fullName:"Summit Bank Limited",color:"#374151",bg:"#f3f4f6",keys:["summit","smbl"]},{id:19,abbr:"MEBL",fullName:"Meezan Bank Limited",color:"#1a5276",bg:"#eaf0f8",keys:["meezan","mebl"]},{id:20,abbr:"FABL",fullName:"Faysal Bank Limited",color:"#7b3f00",bg:"#f5ece4",keys:["faysal","fabl"]},{id:21,abbr:"BIPL",fullName:"BankIslami Pakistan Limited",color:"#065f46",bg:"#f0fdf4",keys:["bankislami","bipl"]},{id:22,abbr:"DIBPL",fullName:"Dubai Islamic Bank Pakistan Limited",color:"#c8102e",bg:"#fce8ec",keys:["dubai islamic","dibpl","dib"]},{id:23,abbr:"ABPL",fullName:"Al Baraka Bank (Pakistan) Limited",color:"#2d6a4f",bg:"#e6f4ed",keys:["al baraka","abpl"]},{id:24,abbr:"MIBL",fullName:"MCB Islamic Bank Limited",color:"#c8102e",bg:"#fce8ec",keys:["mcb islamic","mibl"]},{id:25,abbr:"SCBPL",fullName:"Standard Chartered Bank (Pakistan) Limited",color:"#0e5c96",bg:"#e8f0f8",keys:["standard chartered","scbpl","scb"]},{id:26,abbr:"BML",fullName:"Bank Makramah Limited",color:"#374151",bg:"#f3f4f6",keys:["bank makramah","bml"]}],Ae=Object.fromEntries(he.map(s=>[s.id,s]));function $e(s){if(s?.bankLogoIndex&&Ae[s.bankLogoIndex])return Ae[s.bankLogoIndex];if(s?.bankName){const i=s.bankName.toLowerCase();for(const a of he)if(a.fullName.toLowerCase()===i||a.keys.some(r=>i.includes(r)))return a}const n=(s?.accountName||"").toLowerCase();for(const i of he)if(i.keys.some(a=>n.includes(a)))return i;return null}function Bt(s){const n=$e(s),i=s?.accountName||"",a=s?.remarkNote?` — ${s.remarkNote}`:"",r=`${i}${a}`;return n?{line1:n.fullName,line2:r,abbr:n.abbr,color:n.color,bg:n.bg,logoIndex:s?.bankLogoIndex||null}:{line1:i,line2:s?.remarkNote||"",abbr:(i.match(/[A-Z]/g)||[]).join("").slice(0,5)||"BNK",color:"#6b7280",bg:"#f3f4f6",logoIndex:null}}function Et({account:s}){const n=$e(s),i=n?.abbr||"BNK",a=n?.color||"#6b7280",r=s?.bankLogoIndex,[c,h]=o.useState(!0);return r&&c?e.jsx("div",{className:"db-bank-badge",children:e.jsx("img",{src:`/${r}.png`,alt:i,onError:()=>h(!1)})}):e.jsx("div",{className:"db-bank-badge",style:{color:a,background:`${a}14`,borderColor:`${a}30`},children:i.slice(0,5)})}const E=s=>"Rs "+Number(s||0).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0}),ee=()=>new Date().toISOString().slice(0,10),zt=()=>{const s=new Date;return s.setDate(s.getDate()-s.getDay()),s.toISOString().slice(0,10)},_t=()=>new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().slice(0,10),Ce=(s,n,i)=>{if(!s)return!1;const a=(s||"").slice(0,10);return(!n||a>=n)&&(!i||a<=i)};function Be(s="today"){const[n,i]=o.useState(s),[a,r]=o.useState({from:ee(),to:ee()}),{from:c,to:h}=o.useMemo(()=>n==="today"?{from:ee(),to:ee()}:n==="week"?{from:zt(),to:ee()}:n==="month"?{from:_t(),to:ee()}:n==="custom"?{from:a.from,to:a.to}:{from:null,to:null},[n,a]);return{mode:n,setMode:i,from:c,to:h,custom:a,setCustom:r}}function Ee({p:s}){const n=["today","week","month","all"],i={today:"Today",week:"Week",month:"Month",all:"All time"};return e.jsxs("div",{className:"db-filter",children:[n.map(a=>e.jsx("button",{className:`db-fpill${s.mode===a?" on":""}`,onClick:()=>s.setMode(a),children:i[a]},a)),e.jsx("button",{className:`db-fpill${s.mode==="custom"?" on":""}`,onClick:()=>s.setMode("custom"),children:"Custom"}),s.mode==="custom"&&e.jsxs(e.Fragment,{children:[e.jsx("input",{type:"date",className:"db-fpill-date",value:s.custom.from,onChange:a=>s.setCustom(r=>({...r,from:a.target.value}))}),e.jsx("input",{type:"date",className:"db-fpill-date",value:s.custom.to,onChange:a=>s.setCustom(r=>({...r,to:a.target.value}))})]})]})}function ze({data:s,color:n}){const i=Math.max(...s.map(a=>a.value),1);return e.jsx("div",{style:{marginTop:10},children:s.map((a,r)=>e.jsxs("div",{className:"db-bar-row",children:[e.jsx("span",{className:"db-bar-lbl",children:a.label}),e.jsx("div",{className:"db-bar-track",children:e.jsx("div",{className:"db-bar-fill",style:{width:`${Math.round(a.value/i*100)}%`,background:n||"#111827"}})}),e.jsx("span",{className:"db-bar-val",children:E(a.value)})]},r))})}function _e({products:s,selected:n,onChange:i}){const[a,r]=o.useState(!1),[c,h]=o.useState(""),g=o.useRef(null),w=o.useRef(null),[N,x]=o.useState({top:0,left:0,width:0});o.useEffect(()=>{const f=M=>{!g.current?.contains(M.target)&&!w.current?.contains(M.target)&&r(!1)};return document.addEventListener("mousedown",f),()=>document.removeEventListener("mousedown",f)},[]),o.useEffect(()=>{if(!a)return;const f=()=>{const M=g.current?.getBoundingClientRect();M&&x({top:M.bottom+3,left:M.left,width:M.width})};return f(),window.addEventListener("scroll",f,!0),window.addEventListener("resize",f),()=>{window.removeEventListener("scroll",f,!0),window.removeEventListener("resize",f)}},[a]);const y=s.filter(f=>f.toLowerCase().includes(c.toLowerCase())),S=n.length===0?"All Products":n.length===1?n[0]:`${n.length} products`,B=f=>{n.includes(f)?i(n.filter(M=>M!==f)):i([...n,f])};return e.jsxs("div",{className:"db-prod-wrap",children:[e.jsxs("button",{ref:g,className:`db-prod-btn${a?" open":""}`,onClick:()=>r(f=>!f),children:[e.jsxs("span",{style:{color:n.length>0?"#15803d":"#9ca3af",fontWeight:n.length>0?600:400},children:[n.length>0&&"🔽 ",S]}),e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2.5,style:{flexShrink:0,transition:".12s",transform:a?"rotate(180deg)":"none"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),a&&e.jsxs("div",{ref:w,className:"db-prod-panel",style:{top:N.top,left:N.left,width:Math.max(N.width,200)},children:[e.jsx("input",{autoFocus:!0,className:"db-prod-search",placeholder:"Search product…",value:c,onChange:f=>h(f.target.value)}),e.jsxs("div",{style:{maxHeight:180,overflowY:"auto"},children:[e.jsxs("div",{className:`db-prod-item${n.length===0?" sel":""}`,onClick:()=>{i([]),r(!1)},children:[e.jsx("div",{className:`db-prod-check${n.length===0?" on":""}`,children:n.length===0&&e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"#fff",strokeWidth:3,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})}),"All Products"]}),y.map(f=>e.jsxs("div",{className:`db-prod-item${n.includes(f)?" sel":""}`,onClick:()=>B(f),children:[e.jsx("div",{className:`db-prod-check${n.includes(f)?" on":""}`,children:n.includes(f)&&e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"#fff",strokeWidth:3,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})}),f]},f)),y.length===0&&e.jsx("div",{style:{padding:"10px 12px",fontSize:12,color:"#9ca3af",textAlign:"center"},children:"No products"})]})]})]})}function Pt(){const s=localStorage.getItem("name")||"User",n=localStorage.getItem("businessName")||"",[i,a]=o.useState(!0),[r,c]=o.useState([]),[h,g]=o.useState([]),[w,N]=o.useState([]),[x,y]=o.useState(null),[S,B]=o.useState([]),[f,M]=o.useState([]),z=Be("today"),m=Be("today"),[d,p]=o.useState(!1),[A,D]=o.useState(!1),[_,ie]=o.useState(!1),[b,J]=o.useState(!1),[ue,Fe]=o.useState(!1),[q,qe]=o.useState([]),[H,He]=o.useState([]);o.useEffect(()=>{(async()=>(a(!0),await Promise.allSettled([Z(`${V}/accounts`).then(t=>t.ok&&t.json()).then(t=>t&&c(Array.isArray(t)?t:[])),Z(`${V}/sales-invoice`).then(t=>t.ok&&t.json()).then(t=>{t&&g(t.invoices||(Array.isArray(t)?t:[]))}),Z(`${V}/purchase-invoice`).then(t=>t.ok&&t.json()).then(t=>{t&&N(t.invoices||(Array.isArray(t)?t:[]))}),Z(`${V}/cashbook-report`).then(t=>t.ok&&t.json()).then(t=>{t&&y(t.currentBalance??0)}),Z(`${V}/cheque-entries`).then(t=>t.ok&&t.json()).then(t=>{t&&B((t.chequeEntries||[]).filter(l=>l.status==="issued"))}),Z(`${V}/weight-bridge`).then(t=>t.ok&&t.json()).then(t=>{t&&M(t.entries||(Array.isArray(t)?t:[]))})]),a(!1)))()},[]);const U=o.useMemo(()=>r.filter(t=>t.category==="Bank"||t.accountType==="Assets"&&t.LedgerRef?.toLowerCase().includes("bank")),[r]),X=o.useMemo(()=>U.reduce((t,l)=>t+(l.balance||0),0),[U]),xe=(x??0)+X,R=o.useMemo(()=>r.filter(t=>t.category?.toLowerCase().includes("invest")||t.accountName?.toLowerCase().includes("investor")),[r]),Ue=o.useMemo(()=>R.reduce((t,l)=>t+Math.abs(l.balance||0),0),[R]),W=o.useMemo(()=>r.filter(t=>!t.isProtected&&!t.isProductAccount&&(t.balance||0)>0&&(t.accountType==="Assets"||t.category?.toLowerCase().includes("loan given"))&&t.category!=="Bank"&&!t.LedgerRef?.toLowerCase().includes("bank")),[r]),je=o.useMemo(()=>W.reduce((t,l)=>t+(l.balance||0),0),[W]),O=o.useMemo(()=>r.filter(t=>!t.isProtected&&(t.balance||0)!==0&&(t.accountType==="Liabilities"||t.category?.toLowerCase().includes("loan taken"))&&!t.category?.includes("Employee")),[r]),ke=o.useMemo(()=>O.reduce((t,l)=>t+Math.abs(l.balance||0),0),[O]),te=je-ke,Y=o.useMemo(()=>r.filter(t=>t.accountType==="Expense"),[r]),Ge=o.useMemo(()=>Y.reduce((t,l)=>t+Math.abs(l.balance||0),0),[Y]),ve=o.useMemo(()=>{const t=new Set;return h.forEach(l=>{const j=l.productName||l.product;j&&t.add(j),(l.items||[]).forEach(P=>{P.productName&&t.add(P.productName)})}),[...t].sort()},[h]),ye=o.useMemo(()=>{const t=new Set;return w.forEach(l=>{const j=l.productName||l.product;j&&t.add(j),(l.items||[]).forEach(P=>{P.productName&&t.add(P.productName)})}),[...t].sort()},[w]),se=(t,l)=>{if(l.length===0)return!0;const j=t.productName||t.product||"";return l.includes(j)?!0:(t.items||[]).some(P=>l.includes(P.productName))},oe=o.useMemo(()=>h.filter(t=>Ce(t.date||t.createdAt,z.from,z.to)&&se(t,q)),[h,z.from,z.to,q]),ne=o.useMemo(()=>w.filter(t=>Ce(t.date||t.createdAt,m.from,m.to)&&se(t,H)),[w,m.from,m.to,H]),Ke=o.useMemo(()=>oe.reduce((t,l)=>t+(Number(l.totalAmount||l.amount)||0),0),[oe]),Je=o.useMemo(()=>ne.reduce((t,l)=>t+(Number(l.totalAmount||l.finalAmount||l.amount)||0),0),[ne]),G=o.useMemo(()=>f.filter(t=>t.completed),[f]),Xe=o.useMemo(()=>G.reduce((t,l)=>t+(l.rate||0),0),[G]),le=o.useMemo(()=>{const t={};return G.forEach(l=>{const j=l.vehicleType||"Unknown";t[j]||(t[j]={count:0,total:0}),t[j].count++,t[j].total+=l.rate||0}),Object.entries(t).sort((l,j)=>j[1].total-l[1].total)},[G]),Ye=o.useMemo(()=>S.reduce((t,l)=>t+(l.amount||0),0),[S]),Qe=o.useMemo(()=>Array.from({length:7},(t,l)=>{const j=new Date;j.setDate(j.getDate()-(6-l));const P=j.toISOString().slice(0,10);return{label:j.toLocaleDateString("en-PK",{weekday:"short"}),value:h.filter(T=>(T.date||T.createdAt||"").slice(0,10)===P&&se(T,q)).reduce((T,Q)=>T+(Number(Q.totalAmount||Q.amount)||0),0)}}),[h,q]),Ze=o.useMemo(()=>Array.from({length:7},(t,l)=>{const j=new Date;j.setDate(j.getDate()-(6-l));const P=j.toISOString().slice(0,10);return{label:j.toLocaleDateString("en-PK",{weekday:"short"}),value:w.filter(T=>(T.date||T.createdAt||"").slice(0,10)===P&&se(T,H)).reduce((T,Q)=>T+(Number(Q.totalAmount||Q.finalAmount||Q.amount)||0),0)}}),[w,H]),et=new Date().toLocaleDateString("en-PK",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),tt=(()=>{const t=new Date().getHours();return t<12?"Good morning":t<17?"Good afternoon":t<21?"Good evening":"Good night"})(),K=()=>e.jsx("div",{className:"db-sk",style:{width:"60%",height:20}});return e.jsxs(Mt,{children:[e.jsxs("style",{children:[At,Ct]}),e.jsxs("div",{className:"db",children:[e.jsx("div",{style:{marginBottom:20,display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:12},children:e.jsxs("div",{children:[e.jsxs("p",{style:{fontSize:10.5,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#9ca3af",margin:"0 0 3px"},children:[n||"Agro Plus"," · Operations"]}),e.jsxs("h1",{style:{fontSize:22,fontWeight:700,color:"#111827",letterSpacing:"-.4px",margin:0},children:[tt,", ",e.jsx("span",{style:{color:"#6b7280",fontWeight:400,fontStyle:"italic"},children:s.split(" ")[0]})]}),e.jsx("p",{style:{fontSize:12,color:"#9ca3af",margin:"3px 0 0"},children:et})]})}),e.jsx("p",{className:"db-sec",children:"Cash & Bank Position"}),e.jsxs("div",{className:"db-g3",children:[e.jsxs("div",{className:"db-card",style:{display:"flex",flexDirection:"column",justifyContent:"space-between"},children:[e.jsx("div",{className:"db-accent",style:{background:"#15803d"}}),e.jsxs("div",{children:[e.jsx("p",{className:"db-lbl",children:"Total Liquidity"}),i?e.jsx(K,{}):e.jsx("p",{className:`db-val ${xe>=0?"pos":"neg"}`,style:{fontSize:28},children:E(xe)}),e.jsx("p",{className:"db-sub",children:"Cash in hand + all bank accounts"})]}),!i&&e.jsx("div",{style:{marginTop:16,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[{label:"Cash in Hand",value:x??0,color:(x??0)>=0?"#15803d":"#b91c1c",accent:(x??0)>=0?"#f0fdf4":"#fef2f2",border:(x??0)>=0?"#bbf7d0":"#fecaca"},{label:"Total Bank",value:X,color:X>=0?"#1f2937":"#b91c1c",accent:X>=0?"#f9fafb":"#fef2f2",border:X>=0?"#e5e7eb":"#fecaca"}].map(({label:t,value:l,color:j,accent:P,border:ce})=>e.jsxs("div",{style:{background:P,border:`1px solid ${ce}`,borderRadius:7,padding:"10px 12px"},children:[e.jsx("p",{style:{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#9ca3af",margin:"0 0 4px"},children:t}),e.jsx("p",{style:{fontFamily:"'DM Mono',monospace",fontSize:15,fontWeight:700,color:j,margin:0,letterSpacing:"-.3px"},children:E(l)})]},t))})]}),e.jsxs("div",{className:"db-card",style:{gridColumn:"span 2"},children:[e.jsx("div",{className:"db-accent",style:{background:"#1f2937"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10},children:[e.jsx("p",{className:"db-lbl",style:{margin:0},children:"Bank Accounts"}),!i&&e.jsx("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:13,fontWeight:700,color:"#1f2937"},children:E(X)})]}),i?[0,1].map(t=>e.jsx("div",{className:"db-sk",style:{width:"100%",height:11,marginBottom:6}},t)):U.length===0?e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"No bank accounts found."}):e.jsxs(e.Fragment,{children:[(d?U:U.slice(0,4)).map(t=>{const l=Bt(t);return e.jsxs("div",{className:"db-bank-row",children:[e.jsx(Et,{account:t}),e.jsxs("div",{className:"db-bank-info",children:[e.jsx("div",{className:"db-bank-full",children:l.line1}),e.jsx("div",{className:"db-bank-name",children:l.line2})]}),e.jsx("span",{className:`db-rb ${(t.balance||0)>=0?"pos":"neg"}`,children:E(t.balance||0)})]},t._id)}),U.length>4&&e.jsx("button",{className:"db-more",onClick:()=>p(t=>!t),children:d?"▲ Less":`▼ ${U.length-4} more`})]})]})]}),e.jsx("p",{className:"db-sec",children:"Sales & Purchases"}),e.jsxs("div",{className:"db-g2",children:[e.jsxs("div",{className:"db-card",children:[e.jsx("div",{className:"db-accent",style:{background:"#15803d"}}),e.jsx("p",{className:"db-lbl",children:"Net Sales"}),i?e.jsx(K,{}):e.jsx("p",{className:"db-val pos",children:E(Ke)}),e.jsxs("p",{className:"db-sub",children:[oe.length," invoice",oe.length!==1?"s":"",q.length>0?` · ${q.join(", ")}`:` · ${h.length} total`]}),e.jsx(Ee,{p:z}),!i&&ve.length>0&&e.jsx(_e,{products:ve,selected:q,onChange:qe}),!i&&e.jsx(ze,{data:Qe,color:"#15803d"})]}),e.jsxs("div",{className:"db-card",children:[e.jsx("div",{className:"db-accent",style:{background:"#1f2937"}}),e.jsx("p",{className:"db-lbl",children:"Net Purchases"}),i?e.jsx(K,{}):e.jsx("p",{className:"db-val dk",children:E(Je)}),e.jsxs("p",{className:"db-sub",children:[ne.length," invoice",ne.length!==1?"s":"",H.length>0?` · ${H.join(", ")}`:` · ${w.length} total`]}),e.jsx(Ee,{p:m}),!i&&ye.length>0&&e.jsx(_e,{products:ye,selected:H,onChange:He}),!i&&e.jsx(ze,{data:Ze,color:"#374151"})]})]}),e.jsx("p",{className:"db-sec",children:"Financial Position"}),e.jsxs("div",{className:"db-card",style:{padding:0,overflow:"hidden"},children:[e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderBottom:"1px solid #f3f4f6"},children:[{label:"Receivables",value:je,color:"#15803d",accent:"#15803d"},{label:"Payables",value:ke,color:"#b91c1c",accent:"#b91c1c"},{label:"Net Position",value:Math.abs(te),color:te>=0?"#15803d":"#b91c1c",accent:te>=0?"#15803d":"#b91c1c",sub:te>=0?"Receivables exceed payables":"Payables exceed receivables"}].map((t,l)=>e.jsxs("div",{style:{padding:"14px 16px",position:"relative",overflow:"hidden",borderRight:l<2?"1px solid #f3f4f6":"none"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:3,background:t.accent}}),e.jsx("p",{className:"db-lbl",children:t.label}),i?e.jsx(K,{}):e.jsx("p",{className:"db-val",style:{color:t.color},children:E(t.value)}),t.sub&&e.jsx("p",{className:"db-sub",style:{fontSize:10.5},children:t.sub})]},t.label))}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr"},children:[e.jsxs("div",{style:{padding:"12px 16px",borderRight:"1px solid #f3f4f6"},children:[e.jsxs("p",{style:{fontSize:10,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8},children:[W.length," Receivable Account",W.length!==1?"s":""]}),i?e.jsx("div",{className:"db-sk",style:{width:"80%",height:10}}):W.length===0?e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"No receivables."}):e.jsxs(e.Fragment,{children:[(A?W:W.slice(0,5)).map(t=>e.jsxs("div",{className:"db-row",children:[e.jsx("span",{className:"db-rn",children:t.accountName}),e.jsx("span",{className:"db-rb pos",children:E(t.balance||0)})]},t._id)),W.length>5&&e.jsx("button",{className:"db-more",onClick:()=>D(t=>!t),children:A?"▲ Less":`▼ +${W.length-5}`})]})]}),e.jsxs("div",{style:{padding:"12px 16px"},children:[e.jsxs("p",{style:{fontSize:10,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8},children:[O.length," Payable Account",O.length!==1?"s":""]}),i?e.jsx("div",{className:"db-sk",style:{width:"80%",height:10}}):O.length===0?e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"No payables."}):e.jsxs(e.Fragment,{children:[(_?O:O.slice(0,5)).map(t=>e.jsxs("div",{className:"db-row",children:[e.jsx("span",{className:"db-rn",children:t.accountName}),e.jsx("span",{className:"db-rb neg",children:E(Math.abs(t.balance||0))})]},t._id)),O.length>5&&e.jsx("button",{className:"db-more",onClick:()=>ie(t=>!t),children:_?"▲ Less":`▼ +${O.length-5}`})]})]})]})]}),e.jsx("p",{className:"db-sec",children:"Investment & Expenses"}),e.jsxs("div",{className:"db-g2",children:[e.jsxs("div",{className:"db-card",children:[e.jsx("div",{className:"db-accent",style:{background:"#1f2937"}}),e.jsx("p",{className:"db-lbl",children:"Investment"}),i?e.jsx(K,{}):e.jsx("p",{className:"db-val dk",children:E(Ue)}),e.jsxs("p",{className:"db-sub",children:[R.length," investor account",R.length!==1?"s":""]}),!i&&R.length>0&&e.jsxs(e.Fragment,{children:[(b?R:R.slice(0,4)).map(t=>e.jsxs("div",{className:"db-row",children:[e.jsx("span",{className:"db-rn",children:t.accountName}),e.jsx("span",{className:"db-rb pos",children:E(Math.abs(t.balance||0))})]},t._id)),R.length>4&&e.jsx("button",{className:"db-more",onClick:()=>J(t=>!t),children:b?"▲ Less":`▼ +${R.length-4}`})]})]}),e.jsxs("div",{className:"db-card",children:[e.jsx("div",{className:"db-accent",style:{background:"#7c3aed"}}),e.jsx("p",{className:"db-lbl",children:"Expenses"}),i?e.jsx(K,{}):e.jsx("p",{className:"db-val",style:{color:"#7c3aed"},children:E(Ge)}),e.jsxs("p",{className:"db-sub",children:[Y.length," expense account",Y.length!==1?"s":""]}),!i&&Y.length>0&&e.jsx(e.Fragment,{children:Y.slice(0,5).map(t=>e.jsxs("div",{className:"db-row",children:[e.jsx("span",{className:"db-rn",children:t.accountName.replace(" — Expense","")}),e.jsx("span",{className:"db-rb neg",children:E(Math.abs(t.balance||0))})]},t._id))})]})]}),e.jsx("p",{className:"db-sec",children:"Operations"}),e.jsxs("div",{className:"db-g2",children:[e.jsxs("div",{className:"db-card",children:[e.jsx("div",{className:"db-accent",style:{background:"#1f2937"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10},children:[e.jsxs("div",{children:[e.jsx("p",{className:"db-lbl",style:{margin:0},children:"Pending Cheques"}),i?e.jsx("div",{className:"db-sk",style:{width:"50%",height:18,marginTop:5}}):e.jsx("p",{className:"db-val dk",style:{marginTop:4},children:E(Ye)})]}),!i&&e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:20,fontWeight:700,color:S.length>0?"#b91c1c":"#15803d"},children:S.length}),e.jsx("p",{style:{fontSize:9.5,color:"#9ca3af",margin:0},children:"issued"})]})]}),!i&&S.length===0&&e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"✓ No pending cheques"}),!i&&S.length>0&&e.jsxs(e.Fragment,{children:[(ue?S:S.slice(0,4)).map(t=>e.jsxs("div",{className:"db-cq",children:[e.jsxs("span",{className:"db-cq-no",children:["#",t.chequeNo]}),e.jsx("span",{className:"db-cq-name",children:t.payeeAccountName}),e.jsx("span",{className:"db-cq-amt",children:E(t.amount)}),e.jsx("span",{className:"db-cq-badge",children:"ISSUED"})]},t._id)),S.length>4&&e.jsx("button",{className:"db-more",onClick:()=>Fe(t=>!t),children:ue?"▲ Less":`▼ +${S.length-4} more`})]})]}),e.jsxs("div",{className:"db-card",children:[e.jsx("div",{className:"db-accent",style:{background:"#15803d"}}),e.jsx("p",{className:"db-lbl",children:"Weight Bridge Earnings"}),i?e.jsx(K,{}):e.jsx("p",{className:"db-val pos",children:E(Xe)}),e.jsxs("p",{className:"db-sub",children:[G.length," completed invoice",G.length!==1?"s":""," · ",f.length-G.length," pending"]}),!i&&le.length>0&&(()=>{const t=Math.max(...le.map(([,l])=>l.total),1);return e.jsx("div",{style:{marginTop:12},children:le.slice(0,5).map(([l,j])=>e.jsxs("div",{className:"db-bar-row",children:[e.jsx("span",{style:{fontSize:10,color:"#9ca3af",minWidth:80,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:l}),e.jsx("div",{className:"db-bar-track",children:e.jsx("div",{className:"db-bar-fill",style:{width:`${Math.round(j.total/t*100)}%`,background:"#15803d"}})}),e.jsxs("span",{style:{fontSize:10,color:"#9ca3af",minWidth:80,fontFamily:"'DM Mono',monospace"},children:[E(j.total)," ",e.jsx("span",{style:{color:"#d1d5db"},children:"·"})," ",j.count,"×"]})]},l))})})()]})]}),e.jsx("div",{style:{height:32}})]})]})}const It=()=>e.jsxs("div",{className:"flex h-screen w-screen animate-pulse bg-gray-50",children:[e.jsxs("aside",{className:"w-64 bg-gray-200 p-4 flex flex-col gap-4",children:[e.jsx("div",{className:"h-10 bg-gray-300 rounded"}),e.jsx("div",{className:"h-10 bg-gray-300 rounded"}),e.jsx("div",{className:"h-10 bg-gray-300 rounded"}),e.jsx("div",{className:"h-10 bg-gray-300 rounded"})]}),e.jsxs("div",{className:"flex-1 flex flex-col",children:[e.jsxs("header",{className:"h-16 bg-gray-200 px-6 flex items-center gap-4",children:[e.jsx("div",{className:"h-6 w-32 bg-gray-300 rounded"}),e.jsx("div",{className:"h-6 w-16 bg-gray-300 rounded ml-auto"})]}),e.jsx("main",{className:"flex-1 p-6 flex flex-col gap-4",children:Array.from({length:8}).map((s,n)=>e.jsx("div",{className:"h-10 bg-gray-300 rounded w-full"},n))})]})]}),Dt=`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600;700&family=DM+Mono:wght@500&display=swap');

  @media (max-width: 1023px) { .fl-wrap, .fl-sat { display: none !important; } }

  .fl-wrap {
    position: fixed; z-index: 9000;
    width: 50px; height: 50px;
    user-select: none;
  }
  .fl-core {
    width: 50px; height: 50px; border-radius: 50%;
    background: #111827; border: 1.5px solid #374151;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; position: relative;
    box-shadow: 0 4px 16px rgba(0,0,0,.3), 0 1px 4px rgba(0,0,0,.18);
    transition: transform .18s cubic-bezier(.34,1.4,.64,1), box-shadow .15s, background .15s;
  }
  .fl-core:hover { background: #1f2937; box-shadow: 0 6px 22px rgba(0,0,0,.35); transform: scale(1.07); }
  .fl-open .fl-core {
    background: #1f2937; border-color: #4b5563;
    transform: scale(1.05) rotate(45deg);
    box-shadow: 0 0 0 7px rgba(107,114,128,.12), 0 6px 24px rgba(0,0,0,.3);
  }

  .fl-ico {
    position: absolute; display: flex; align-items: center; justify-content: center;
    transition: opacity .18s, transform .2s cubic-bezier(.34,1.4,.64,1);
  }
  .fl-ico-menu  { opacity:1; transform:scale(1) rotate(0); }
  .fl-ico-close { opacity:0; transform:scale(.25) rotate(-90deg); }
  .fl-open .fl-ico-menu  { opacity:0; transform:scale(.25) rotate(90deg); }
  .fl-open .fl-ico-close { opacity:1; transform:scale(1) rotate(0); }

  .fl-sat {
    position: fixed; z-index: 8999;
    width: 42px; height: 42px; border-radius: 50%;
    background: #fff; border: 1px solid #e5e7eb; color: #374151;
    display: flex; align-items: center; justify-content: center;
    text-decoration: none; pointer-events: none; opacity: 0;
    box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 1px 3px rgba(0,0,0,.07);
    transition:
      left    .32s cubic-bezier(.34,1.55,.64,1),
      top     .32s cubic-bezier(.34,1.55,.64,1),
      opacity .22s ease,
      transform .15s ease;
  }
  .fl-sat.fl-s1 { transition-delay:.00s }
  .fl-sat.fl-s2 { transition-delay:.05s }
  .fl-sat.fl-s3 { transition-delay:.10s }
  .fl-sat.fl-s4 { transition-delay:.15s }
  .fl-sat.fl-s5 { transition-delay:.20s }
  .fl-sat.fl-closing.fl-s1 { transition-delay:.20s }
  .fl-sat.fl-closing.fl-s2 { transition-delay:.15s }
  .fl-sat.fl-closing.fl-s3 { transition-delay:.10s }
  .fl-sat.fl-closing.fl-s4 { transition-delay:.05s }
  .fl-sat.fl-closing.fl-s5 { transition-delay:.00s }

  .fl-sat.fl-visible { opacity:1; pointer-events:auto; }
  .fl-sat:hover {
    background: #f9fafb; border-color: #d1d5db; color: #111827;
    box-shadow: 0 4px 16px rgba(0,0,0,.14), 0 0 0 5px rgba(107,114,128,.08);
    transform: scale(1.1);
  }
  .fl-sat.fl-active { background: #f3f4f6; border-color: #9ca3af; color: #111827; }

  .fl-tip {
    position: absolute; left: 50%; transform: translateX(-50%);
    background: #111827; color: #f9fafb;
    font-size: 9.5px; font-weight: 600; white-space: nowrap;
    padding: 3px 8px; border-radius: 5px; pointer-events: none;
    opacity: 0; transition: opacity .1s; letter-spacing: .06em;
    text-transform: uppercase; font-family: 'DM Mono', monospace;
    box-shadow: 0 2px 8px rgba(0,0,0,.18);
    bottom: calc(100% + 6px); z-index: 1;
  }
  .fl-tip.below { bottom: auto; top: calc(100% + 6px); }
  .fl-sat:hover .fl-tip { opacity: 1; }
`,Tt=[{path:"/dashboard",label:"Home",icon:e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15.75a.75.75 0 01-.75-.75v-4.5h-6V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"})})},{path:"/cashbook",label:"Cashbook",icon:e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})},{path:"/add-invoice-purchase",label:"Purchase",icon:e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"})})},{path:"/add-invoice-sales",label:"Sales",icon:e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"})})},{path:"/weight-bridge",label:"W·Bridge",icon:e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"})})}],re={right:28,bottom:72},Ve=240,fe=56,Pe=50,I=42,Ie=90,Rt=28,F=14;function Wt(s,n){const i=window.innerWidth,a=window.innerHeight,r=Math.max(0,s-Ve-F-I/2),c=Math.max(0,i-s-F-I/2),h=Math.max(0,n-fe-F-I/2),g=Math.max(0,a-n-F-I/2),w=c-r,N=h-g;let x=Math.atan2(N,w)*(180/Math.PI);return x=Math.round(x/5)*5,x}function Ot(s,n,i,a){const r=Math.max((i-1)*Rt+10,90),c=i>1?r/(i-1):0,h=a-r/2,g=window.innerWidth,w=window.innerHeight,N=Ve+F+I/2,x=g-F-I/2,y=fe+F+I/2,S=w-F-I/2;return Array.from({length:i},(B,f)=>{const M=(h+c*f)*Math.PI/180;let z=s+Math.cos(M)*Ie,m=n-Math.sin(M)*Ie;return z=Math.max(N,Math.min(x,z)),m=Math.max(y,Math.min(S,m)),{left:z-I/2,top:m-I/2,tipAbove:m>fe+70}})}function De(){return{cx:window.innerWidth-re.right-Pe/2,cy:window.innerHeight-re.bottom-Pe/2}}function $t(){const s=ge(),n=(localStorage.getItem("role")||"Admin")==="Admin",i=o.useMemo(()=>{try{return JSON.parse(localStorage.getItem("allowedRoutes"))||[]}catch{return[]}},[]),a=Tt.filter(m=>n||i.includes(m.path)),[r,c]=o.useState(!1),[h,g]=o.useState(!1),[w,N]=o.useState([]),x=o.useCallback(()=>{const{cx:m,cy:d}=De(),p=Wt(m,d);N(Ot(m,d,a.length,p))},[a.length]);o.useEffect(()=>{r&&x()},[r,x]),o.useEffect(()=>{const m=()=>{r&&x()};return window.addEventListener("resize",m),()=>window.removeEventListener("resize",m)},[r,x]),o.useEffect(()=>{const m=d=>{const p=d.target.closest(".fl-wrap"),A=d.target.closest(".fl-sat");!p&&!A&&y()};return document.addEventListener("mousedown",m),()=>document.removeEventListener("mousedown",m)},[]);const y=()=>{g(!0),c(!1),setTimeout(()=>g(!1),500)},S=()=>{r?y():c(!0)},{cx:B,cy:f}=De(),M=B-I/2,z=f-I/2;return s.pathname==="/"?null:e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Dt}),e.jsx("div",{className:["fl-wrap",r?"fl-open":""].filter(Boolean).join(" "),style:{right:re.right,bottom:re.bottom},children:e.jsxs("div",{className:"fl-core",onClick:S,children:[e.jsx("span",{className:"fl-ico fl-ico-menu",children:e.jsxs("svg",{width:18,height:18,fill:"none",viewBox:"0 0 24 24",stroke:"rgba(255,255,255,.85)",strokeWidth:1.7,children:[e.jsx("rect",{x:3,y:5,width:7,height:7,rx:1.5,fill:"rgba(255,255,255,.1)",stroke:"rgba(255,255,255,.8)",strokeWidth:1.5}),e.jsx("rect",{x:14,y:5,width:7,height:7,rx:1.5,fill:"rgba(255,255,255,.1)",stroke:"rgba(255,255,255,.8)",strokeWidth:1.5}),e.jsx("rect",{x:3,y:14,width:7,height:7,rx:1.5,fill:"rgba(255,255,255,.1)",stroke:"rgba(255,255,255,.8)",strokeWidth:1.5}),e.jsx("rect",{x:14,y:14,width:7,height:7,rx:1.5,fill:"rgba(255,255,255,.1)",stroke:"rgba(255,255,255,.8)",strokeWidth:1.5})]})}),e.jsx("span",{className:"fl-ico fl-ico-close",children:e.jsx("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"rgba(255,255,255,.85)",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})})]})}),a.map((m,d)=>{const p=w[d],A=r&&p,D=["fl-sat",`fl-s${d+1}`,A?"fl-visible":"",h?"fl-closing":"",s.pathname===m.path||s.pathname.startsWith(m.path+"/")?"fl-active":""].filter(Boolean).join(" ");return e.jsxs(be,{to:m.path,className:D,style:{left:A?p.left:M,top:A?p.top:z},onClick:()=>y(),draggable:!1,children:[e.jsx("span",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:m.icon}),e.jsx("span",{className:`fl-tip${p&&!p.tipAbove?" below":""}`,children:m.label})]},m.path)})]})}const Vt=o.lazy(()=>v(()=>import("./Masterportal-Dsoylc14.js"),__vite__mapDeps([0,1,2,3]))),Ft=o.lazy(()=>v(()=>import("./CreateAccount-Dxj_dbRw.js"),__vite__mapDeps([4,1,2,3]))),qt=o.lazy(()=>v(()=>import("./ViewAccounts-gLju_2Kv.js"),__vite__mapDeps([5,1,2,3]))),Te=o.lazy(()=>v(()=>import("./GeneralJournalEntry-PkoxPUOm.js"),__vite__mapDeps([6,1,7,2,3]))),Ht=o.lazy(()=>v(()=>import("./ViewGeneralEntries-9f86-1wj.js"),__vite__mapDeps([8,1,7,2,3]))),Ut=o.lazy(()=>v(()=>import("./InoviceDashboard-CrCcRgUq.js"),__vite__mapDeps([9,1,2,3]))),Gt=o.lazy(()=>v(()=>import("./SalesInvoice-CxXhLsrd.js"),__vite__mapDeps([10,1,2,3]))),Kt=o.lazy(()=>v(()=>import("./PurchaseInvoiceForm-w_6qKOlR.js"),__vite__mapDeps([11,1,2,3]))),Jt=o.lazy(()=>v(()=>import("./ViewSalesInvoices-Da835scz.js"),__vite__mapDeps([12,1,2,3]))),Xt=o.lazy(()=>v(()=>import("./ViewPurchaseInvoices-B5d9TqZV.js"),__vite__mapDeps([13,1,2,3]))),Yt=o.lazy(()=>v(()=>import("./AccountsPage--Rr3QK7e.js"),__vite__mapDeps([14,1,4,2,3,5]))),Qt=o.lazy(()=>v(()=>import("./LedgerSearch-CghfyUSy.js"),__vite__mapDeps([15,1,7,2,3]))),Zt=o.lazy(()=>v(()=>import("./LedgerByReference-D0DiY1y7.js"),__vite__mapDeps([16,1,2,3]))),es=o.lazy(()=>v(()=>import("./LedgerByAccount-BdiGnzAU.js"),__vite__mapDeps([17,1,2,3]))),ts=o.lazy(()=>v(()=>import("./ProductsList-C9vID_g_.js"),__vite__mapDeps([18,1,2,3]))),ss=o.lazy(()=>v(()=>import("./BalanceSheet-CyeSMuZs.js"),__vite__mapDeps([19,1,3,2]))),os=o.lazy(()=>v(()=>import("./TrialBalance-1J05ew1K.js"),__vite__mapDeps([20,1,3,2]))),ns=o.lazy(()=>v(()=>import("./IncomeStatement-TaeoCD3Y.js"),__vite__mapDeps([21,1,3,2]))),as=o.lazy(()=>v(()=>import("./CreateEmployee-CArjiIzc.js"),__vite__mapDeps([22,1,3,2]))),rs=o.lazy(()=>v(()=>import("./ViewEmployees-DVXYwirT.js"),__vite__mapDeps([23,1,3,2]))),is=o.lazy(()=>v(()=>import("./WeightBridge-PvNUb364.js"),__vite__mapDeps([24,1,2,3]))),ls=o.lazy(()=>v(()=>import("./WeightBridgeInvoice-HHrufScc.js"),__vite__mapDeps([25,1,2,3]))),cs=o.lazy(()=>v(()=>import("./CashbookForm-CLoEKwRE.js"),__vite__mapDeps([26,1,2,3]))),ds=o.lazy(()=>v(()=>import("./CashbookReport-CjrEHkS3.js"),__vite__mapDeps([27,1,2,3]))),ps=o.lazy(()=>v(()=>import("./CreateChequeBook-B95BEooA.js"),__vite__mapDeps([28,1,29,2,3]))),hs=o.lazy(()=>v(()=>import("./CreateChequeEntry-4NqhGHz4.js"),__vite__mapDeps([30,1,29,2,3]))),fs=o.lazy(()=>v(()=>import("./ViewChequeBooks-Hfd_1wBe.js"),__vite__mapDeps([31,1,29,2,3]))),gs=o.lazy(()=>v(()=>import("./Adminprofile-DZeBIUmZ.js"),__vite__mapDeps([32,1,2,3]))),bs=o.lazy(()=>v(()=>import("./Stockmanagement-BUVy-vrj.js"),__vite__mapDeps([33,1,2,3])));function ms(){const s=localStorage.getItem("token");return window.history.length>1?(window.history.back(),null):e.jsx(pe,{to:s?"/dashboard":"/",replace:!0})}function us(){return e.jsx(it,{children:e.jsxs(st,{children:[e.jsx($t,{}),e.jsx(o.Suspense,{fallback:e.jsx(It,{}),children:e.jsxs(ot,{children:[e.jsx(u,{path:"/",element:e.jsx(ht,{})}),e.jsx(u,{path:"/master",element:e.jsx(Vt,{})}),e.jsx(u,{path:"/dashboard",element:e.jsx(k,{children:e.jsx(Pt,{})})}),e.jsx(u,{path:"/create-account",element:e.jsx(k,{children:e.jsx(Ft,{})})}),e.jsx(u,{path:"/view-accounts",element:e.jsx(k,{children:e.jsx(qt,{})})}),e.jsx(u,{path:"/ledger",element:e.jsx(k,{children:e.jsx(Qt,{})})}),e.jsx(u,{path:"/ledger/account/:accountId",element:e.jsx(k,{children:e.jsx(es,{})})}),e.jsx(u,{path:"/ledger/ref/:ref",element:e.jsx(k,{children:e.jsx(Zt,{})})}),e.jsx(u,{path:"/general-entries",element:e.jsx(k,{children:e.jsx(Te,{})})}),e.jsx(u,{path:"/general-journal-entry",element:e.jsx(k,{children:e.jsx(Te,{})})}),e.jsx(u,{path:"/view-general-entries",element:e.jsx(k,{children:e.jsx(Ht,{})})}),e.jsx(u,{path:"/add-invoice",element:e.jsx(k,{children:e.jsx(Ut,{})})}),e.jsx(u,{path:"/add-invoice-sales",element:e.jsx(k,{children:e.jsx(Gt,{})})}),e.jsx(u,{path:"/view-sales-invoices",element:e.jsx(k,{children:e.jsx(Jt,{})})}),e.jsx(u,{path:"/add-invoice-purchase",element:e.jsx(k,{children:e.jsx(Kt,{})})}),e.jsx(u,{path:"/view-purchase-invoices",element:e.jsx(k,{children:e.jsx(Xt,{})})}),e.jsx(u,{path:"/accounts/*",element:e.jsx(k,{children:e.jsx(Yt,{})})}),e.jsx(u,{path:"/products",element:e.jsx(k,{children:e.jsx(ts,{})})}),e.jsx(u,{path:"/balancesheet",element:e.jsx(k,{children:e.jsx(ss,{})})}),e.jsx(u,{path:"/trialbalance",element:e.jsx(k,{children:e.jsx(os,{})})}),e.jsx(u,{path:"/incomestatement",element:e.jsx(k,{children:e.jsx(ns,{})})}),e.jsx(u,{path:"/employees/new",element:e.jsx(k,{children:e.jsx(as,{})})}),e.jsx(u,{path:"/employees",element:e.jsx(k,{children:e.jsx(rs,{})})}),e.jsx(u,{path:"/weight-bridge",element:e.jsx(k,{children:e.jsx(is,{})})}),e.jsx(u,{path:"/weight-bridge/invoices",element:e.jsx(k,{children:e.jsx(ls,{})})}),e.jsx(u,{path:"/cashbook",element:e.jsx(k,{children:e.jsx(cs,{})})}),e.jsx(u,{path:"/cashbook-report",element:e.jsx(k,{children:e.jsx(ds,{})})}),e.jsx(u,{path:"/cheque-book/create",element:e.jsx(k,{children:e.jsx(ps,{})})}),e.jsx(u,{path:"/cheque-book/entry",element:e.jsx(k,{children:e.jsx(hs,{})})}),e.jsx(u,{path:"/cheque-book/view",element:e.jsx(k,{children:e.jsx(fs,{})})}),e.jsx(u,{path:"/stock",element:e.jsx(k,{children:e.jsx(bs,{})})}),e.jsx(u,{path:"/profile",element:e.jsx(k,{children:e.jsx(gs,{})})}),e.jsx(u,{path:"*",element:e.jsx(ms,{})})]})})]})})}nt.createRoot(document.getElementById("root")).render(e.jsx(o.StrictMode,{children:e.jsx(us,{})}));export{V as A,lt as N,Mt as S,Z as a};
