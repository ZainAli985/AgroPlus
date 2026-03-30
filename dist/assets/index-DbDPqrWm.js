const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Masterportal-DpRmp67F.js","assets/vendor-react-BFXNeceC.js","assets/vendor-react-dom-DDWplefk.js","assets/vendor-DDAwBBib.js","assets/CreateAccount-Df9Z3vEe.js","assets/ViewAccounts-Dm96BXhg.js","assets/GeneralJournalEntry-BMLCUSdT.js","assets/JournalTopNav-BlpLUyTY.js","assets/ViewGeneralEntries-hVW5_OuK.js","assets/InoviceDashboard-BMw74juo.js","assets/SalesInvoice-D_CAzaOk.js","assets/PurchaseInvoiceForm-BUzV0-LP.js","assets/ViewSalesInvoices-jgbHakHv.js","assets/ViewPurchaseInvoices-BYKGS37e.js","assets/AccountsPage-0roc7TnA.js","assets/LedgerSearch-CRpI5I3J.js","assets/LedgerByReference-CWxNcNWp.js","assets/LedgerByAccount-B9b4PxeJ.js","assets/ProductsList-BegjqY_m.js","assets/BalanceSheet-BVLxx15m.js","assets/TrialBalance-BWeHAs4l.js","assets/IncomeStatement-DwHeHSh8.js","assets/CreateEmployee-CNSxAuIp.js","assets/ViewEmployees-DipnHreF.js","assets/WeightBridge-CiAuN25E.js","assets/WeightBridgeInvoice-BDSfR2OI.js","assets/CashbookForm-B-oM8EFg.js","assets/CashbookReport-CT_eaPSg.js","assets/CreateChequeBook-DrZeJB-c.js","assets/ChequeTopNav-BwrjA0ks.js","assets/CreateChequeEntry-D9B6sO17.js","assets/ViewChequeBooks-qxm-h7s6.js","assets/Adminprofile-DM-PNORR.js","assets/Stockmanagement-BYg4C0iU.js"])))=>i.map(i=>d[i]);
import{j as e,a as n,u as fe,N as le,b as De,R as Z,L as ge,B as ot,d as st,e as u}from"./vendor-react-BFXNeceC.js";import{c as nt}from"./vendor-react-dom-DDWplefk.js";import{_ as N}from"./vendor-DDAwBBib.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const p of r)if(p.type==="childList")for(const h of p.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function a(r){const p={};return r.integrity&&(p.integrity=r.integrity),r.referrerPolicy&&(p.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?p.credentials="include":r.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function i(r){if(r.ep)return;r.ep=!0;const p=a(r);fetch(r.href,p)}})();const at=({show:o=!0,message:s})=>o?e.jsxs("div",{className:"fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm","aria-live":"polite","aria-busy":"true",role:"status",children:[e.jsx("div",{className:"loader-pulse flex items-center justify-center",children:e.jsx("img",{src:"/logo.png",alt:"",className:"loader-spin h-20 w-20 object-contain sm:h-24 sm:w-24",width:96,height:96})}),s&&e.jsx("p",{className:"mt-4 text-sm font-medium text-gray-600",children:s}),e.jsx("span",{className:"sr-only",children:"Loading…"})]}):null,rt=n.createContext(null);function it({children:o}){const[s,a]=n.useState(!1),[i,r]=n.useState(""),p=n.useCallback((h,f="")=>{a(!!h),r(f||"")},[]);return e.jsxs(rt.Provider,{value:{loading:s,setLoading:p,message:i},children:[o,e.jsx(at,{show:s,message:i})]})}function w({children:o}){const s=localStorage.getItem("token"),a=fe();if(!s)return e.jsx(le,{to:"/",replace:!0});let i=[];try{i=JSON.parse(localStorage.getItem("allowedRoutes"))||[]}catch{i=[]}if(!i.length||i.includes("*"))return o;const r=a.pathname;return i.some(h=>{if(h===r||h.endsWith("/*")&&r.startsWith(h.replace("/*","")))return!0;const f=h.split("/"),j=r.split("/");return f.length!==j.length?!1:f.every((L,k)=>L.startsWith(":")||L===j[k])})?o:e.jsx(le,{to:"/dashboard",replace:!0})}const $="/api";if(typeof document<"u"&&!document.getElementById("ntf-css")){const o=document.createElement("style");o.id="ntf-css",o.textContent=`
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
  `,document.head.appendChild(o)}const ye={success:{label:"Success",accent:"#15803d",barBg:"#bbf7d0",iconBg:"#f0fdf4",iconBorder:"#bbf7d0",iconColor:"#15803d",topBar:"#15803d",icon:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})},error:{label:"Error",accent:"#dc2626",barBg:"#fecaca",iconBg:"#fef2f2",iconBorder:"#fecaca",iconColor:"#dc2626",topBar:"#dc2626",icon:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})},warning:{label:"Warning",accent:"#d97706",barBg:"#fde68a",iconBg:"#fffbeb",iconBorder:"#fde68a",iconColor:"#d97706",topBar:"#d97706",icon:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"})})},info:{label:"Info",accent:"#374151",barBg:"#e5e7eb",iconBg:"#f9fafb",iconBorder:"#e5e7eb",iconColor:"#374151",topBar:"#6b7280",icon:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}},we=3800;function lt({message:o,type:s="info",onClose:a}){const[i,r]=n.useState("idle"),[p,h]=n.useState({message:"",type:"info"}),[f,j]=n.useState(0),L=n.useRef(null),k=()=>{clearTimeout(L.current),r("out"),setTimeout(()=>{r("idle"),a?.()},240)};if(n.useEffect(()=>{if(!o)return;clearTimeout(L.current);const S=()=>{h({message:o,type:s}),j(B=>B+1),r("in"),L.current=setTimeout(k,we)};return i==="in"?(r("out"),setTimeout(S,240)):S(),()=>clearTimeout(L.current)},[o]),i==="idle")return null;const v=ye[p.type]||ye.info;return e.jsx("div",{className:"ntf-host",children:e.jsxs("div",{role:"alert","aria-live":"polite",className:`ntf-card ${i==="out"?"ntf-out":"ntf-in"}`,children:[e.jsx("div",{style:{height:3,background:v.topBar,borderRadius:"9px 9px 0 0"}}),e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:11,padding:"12px 13px 14px"},children:[e.jsx("div",{style:{width:32,height:32,borderRadius:7,flexShrink:0,background:v.iconBg,border:`1px solid ${v.iconBorder}`,display:"flex",alignItems:"center",justifyContent:"center",color:v.iconColor},children:v.icon}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:"'DM Mono', monospace",fontSize:9.5,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:v.accent,marginBottom:4},children:v.label}),e.jsx("div",{style:{fontFamily:"'DM Sans', sans-serif",fontSize:13,fontWeight:500,lineHeight:1.5,color:"#111827",wordBreak:"break-word"},children:p.message})]}),e.jsx("button",{className:"ntf-close",onClick:k,title:"Dismiss",children:e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})})]}),e.jsx("div",{style:{height:2,background:v.barBg,position:"relative",overflow:"hidden"},children:e.jsx("div",{style:{position:"absolute",inset:0,transformOrigin:"left",background:v.accent,animation:`ntf-bar ${we}ms linear both`}},`p-${f}`)})]},f)})}const ct="@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",dt=`
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
`;function Ne(o){const s=o.replace(/\D/g,"").slice(0,13);return s.length<=5?s:s.length<=12?`${s.slice(0,5)}-${s.slice(5)}`:`${s.slice(0,5)}-${s.slice(5,12)}-${s.slice(12)}`}const pt=["Precision accounting & general ledger","Purchase & sales invoicing","Weight bridge management","Cheque book tracking","Employee payroll & HR"];function ht(){const[o,s]=n.useState(""),[a,i]=n.useState(""),[r,p]=n.useState(!1),[h,f]=n.useState(!1),[j,L]=n.useState(!1),[k,v]=n.useState({message:"",type:"info"}),S=De(),B=(x,l,z=3500)=>{v({message:x,type:l}),setTimeout(()=>v({message:"",type:"info"}),z)},g=o.replace(/\D/g,"").length,c=g===13,b=x=>s(Ne(x.target.value.replace(/\D/g,""))),m=x=>{if(x.key==="Backspace"){const l=o.replace(/\D/g,"");l.length>0&&(x.preventDefault(),s(Ne(l.slice(0,-1))))}},E=async x=>{x.preventDefault();const l=o.replace(/\D/g,"");if(l.length!==13){B("Please enter a valid 13-digit CNIC","warning");return}if(!a.trim()){B("Please enter your password","warning");return}f(!0);try{const z=await fetch(`${$}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({cnic:l,password:a})}),_=await z.json();z.ok?(localStorage.setItem("token",_.token),localStorage.setItem("role",_.role),localStorage.setItem("name",_.name),localStorage.setItem("millId",_.millId),localStorage.setItem("businessName",_.businessName),localStorage.setItem("logoUrl",_.logoUrl||""),localStorage.setItem("allowedRoutes",JSON.stringify(_.allowedRoutes)),B(_.message||"Welcome back!","success"),setTimeout(()=>S(_.portal==="master"?"/master":"/dashboard"),900)):(B(_.message||"Invalid credentials","error"),f(!1))}catch{B("Server error — please try again","warning"),f(!1)}};return e.jsxs(e.Fragment,{children:[e.jsxs("style",{children:[ct,dt]}),e.jsx(lt,{message:k.message,type:k.type,onClose:()=>v({message:"",type:"info"})}),e.jsxs("div",{className:"lg-root",children:[e.jsx("div",{className:"lg-left",children:e.jsxs("div",{className:"lg-left-inner",children:[e.jsxs("div",{className:"lg-brand",children:[e.jsx("div",{className:"lg-brand-logo",children:j?e.jsx("div",{className:"lg-brand-fb",children:"A+"}):e.jsx("img",{src:"/logo.png",alt:"Agro Plus",onError:()=>L(!0)})}),e.jsxs("div",{className:"lg-brand-text",children:[e.jsx("div",{className:"lg-brand-name",children:"Agro Plus"}),e.jsx("div",{className:"lg-brand-by",children:"by ORCA TECH. AND VENTURES"})]})]}),e.jsxs("div",{className:"lg-copy",children:[e.jsx("div",{className:"lg-tagline",children:"Rice Mill Platform"}),e.jsxs("h2",{className:"lg-headline",children:["Operations,",e.jsx("br",{}),e.jsx("em",{children:"Simplified."})]}),e.jsx("p",{className:"lg-desc",children:"The all-in-one management platform for rice mills — precision accounting, invoicing, weight bridge, and full team control in one place."}),e.jsx("div",{className:"lg-features",children:pt.map(x=>e.jsxs("div",{className:"lg-feat",children:[e.jsx("span",{className:"lg-feat-dot"}),x]},x))})]}),e.jsx("div",{className:"lg-left-stamp",children:"ORCA TECH. AND VENTURES · AGRO PLUS"})]})}),e.jsx("div",{className:"lg-right",children:e.jsxs("div",{className:"lg-form-wrap",children:[e.jsx("p",{className:"lg-eyebrow",children:"Secure Access"}),e.jsx("h1",{className:"lg-heading",children:"Welcome back"}),e.jsx("p",{className:"lg-sub",children:"Sign in with your CNIC and password"}),e.jsx("div",{className:"lg-rule"}),e.jsxs("form",{onSubmit:E,children:[e.jsxs("div",{className:"lg-field",children:[e.jsxs("label",{className:"lg-lbl",children:[e.jsx("span",{className:"lg-lbl-bar"}),"CNIC Number"]}),e.jsxs("div",{className:"lg-inp-wrap",children:[e.jsx("span",{className:"lg-inp-icon",children:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0"})})}),e.jsx("input",{className:"lg-inp lg-cnic-inp",type:"text",inputMode:"numeric",placeholder:"xxxxx-xxxxxxx-x",value:o,onChange:b,onKeyDown:m,maxLength:15,autoFocus:!0,autoComplete:"off"})]}),e.jsxs("div",{className:"lg-track",children:[Array.from({length:13},(x,l)=>e.jsx("div",{className:`lg-seg${l<g?c?" complete":" filled":""}`},l)),e.jsxs("span",{className:"lg-count",style:c?{color:"#059669"}:{},children:[g,"/13"]})]})]}),e.jsxs("div",{className:"lg-field",children:[e.jsxs("label",{className:"lg-lbl",children:[e.jsx("span",{className:"lg-lbl-bar"}),"Password"]}),e.jsxs("div",{className:"lg-inp-wrap",children:[e.jsx("span",{className:"lg-inp-icon",children:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"})})}),e.jsx("input",{className:"lg-inp",type:r?"text":"password",placeholder:"Enter your password",value:a,onChange:x=>i(x.target.value),autoComplete:"current-password",style:{paddingRight:42}}),e.jsx("button",{type:"button",className:"lg-eye",onClick:()=>p(x=>!x),tabIndex:-1,children:r?e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"})}):e.jsxs("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"})]})})]})]}),e.jsx("button",{type:"submit",className:"lg-btn",disabled:h,children:h?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"lg-spin"})," Authenticating…"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"})}),"Sign In to Dashboard"]})})]}),e.jsxs("div",{className:"lg-form-foot",children:[e.jsx("span",{className:"lg-form-foot-brand",children:"ORCA TECH. & VENTURES"}),e.jsxs("span",{className:"lg-form-foot-copy",children:["© ",new Date().getFullYear()," Agro Plus"]})]})]})})]})]})}const ft="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",gt=`
  *, *::before, *::after { box-sizing: border-box; }
  .sl-root {
    display: flex; min-height: 100vh;
    background: #f9fafb;
    font-family: 'DM Sans', sans-serif;
  }

  /* ══ SIDEBAR ══ */
  .sl-sidebar {
    position: fixed; top: 0; left: 0; height: 100vh; width: 242px;
    background: #111827;
    display: flex; flex-direction: column;
    z-index: 50;
    transition: transform .25s cubic-bezier(.4,0,.2,1);
    border-right: 1px solid rgba(255,255,255,.06);
    box-shadow: 4px 0 24px rgba(0,0,0,.35);
  }
  .sl-sidebar.closed { transform: translateX(-100%); }

  /* brand bar */
  .sl-brand {
    height: 60px; flex-shrink: 0;
    display: flex; align-items: center; gap: 10px;
    padding: 0 14px 0 12px;
    border-bottom: 1px solid rgba(255,255,255,.07);
    background: #0d1117;
  }
  .sl-brand-logo {
    width: 30px; height: 30px; border-radius: 7px; flex-shrink: 0;
    object-fit: cover; border: 1px solid rgba(255,255,255,.1);
  }
  .sl-brand-logo-fb {
    width: 30px; height: 30px; border-radius: 7px; flex-shrink: 0;
    background: #1f2937; border: 1px solid rgba(255,255,255,.08);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; color: #fff;
  }

  .sl-wordmark {
    flex: 1; display: flex; align-items: baseline; gap: 0;
    font-size: 15px; font-weight: 700; letter-spacing: -.2px;
    line-height: 1; user-select: none;
  }
  .sl-wordmark-agro { color: #ffffff; }
  .sl-wordmark-p    { color: #4ade80; }
  .sl-wordmark-lus  { color: #ffffff; }
  .sl-wordmark-plus { color: #4ade80; }

  .sl-sidebar-close {
    margin-left: auto; flex-shrink: 0;
    background: rgba(255,255,255,.06); border: none; border-radius: 6px;
    width: 26px; height: 26px; display: none;
    align-items: center; justify-content: center;
    cursor: pointer; color: rgba(255,255,255,.4); transition: all .12s;
  }
  .sl-sidebar-close:hover { background: rgba(255,255,255,.12); color: #fff; }

  /* nav */
  .sl-nav {
    flex: 1; overflow-y: auto; overflow-x: hidden;
    padding: 8px 8px 14px;
    scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.07) transparent;
  }
  .sl-nav::-webkit-scrollbar { width: 3px; }
  .sl-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,.07); border-radius: 3px; }

  .sl-section-lbl {
    font-size: 8.5px; font-weight: 700; letter-spacing: .13em;
    text-transform: uppercase; color: rgba(255,255,255,.2);
    padding: 14px 10px 4px; user-select: none;
  }

  .sl-menu-btn {
    width: 100%; display: flex; align-items: center; gap: 8px;
    padding: 7px 9px; border-radius: 6px; border: none; cursor: pointer;
    background: transparent; color: rgba(255,255,255,.55);
    font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500;
    transition: all .12s; text-align: left;
  }
  .sl-menu-btn:hover { background: rgba(255,255,255,.07); color: #ffffff; }
  .sl-menu-btn.open  { background: rgba(255,255,255,.06); color: #ffffff; }
  .sl-menu-icon {
    width: 24px; height: 24px; border-radius: 5px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,.05);
  }
  .sl-menu-btn.open .sl-menu-icon { background: rgba(255,255,255,.09); }
  .sl-menu-label { flex: 1; }
  .sl-menu-chevron { flex-shrink: 0; transition: transform .18s; color: rgba(255,255,255,.25); }
  .sl-menu-btn.open .sl-menu-chevron { transform: rotate(180deg); color: rgba(255,255,255,.4); }

  .sl-sub { overflow: hidden; transition: max-height .2s cubic-bezier(.4,0,.2,1), opacity .16s; max-height: 0; opacity: 0; }
  .sl-sub.open { max-height: 500px; opacity: 1; }
  .sl-sub-inner { padding: 2px 0 2px 10px; display: flex; flex-direction: column; gap: 1px; }
  .sl-sub-link {
    display: flex; align-items: center; gap: 7px;
    padding: 6px 10px; border-radius: 5px;
    font-size: 12px; font-weight: 500;
    color: rgba(255,255,255,.5); text-decoration: none; transition: all .1s;
    position: relative;
  }
  .sl-sub-link::before {
    content: ''; position: absolute; left: -2px; top: 50%; transform: translateY(-50%);
    width: 1px; height: 60%; background: rgba(255,255,255,.08); border-radius: 1px;
  }
  .sl-sub-link:hover { background: rgba(255,255,255,.07); color: #fff; }
  .sl-sub-link.active { background: rgba(74,222,128,.12); color: #4ade80; font-weight: 600; }
  .sl-sub-link.active::before { background: #4ade80; }
  .sl-sub-link.soon { opacity: .45; cursor: default; }
  .sl-sub-link.soon:hover { background: transparent; color: rgba(255,255,255,.5); }

  .sl-direct-link {
    display: flex; align-items: center; gap: 8px;
    padding: 7px 9px; border-radius: 6px;
    font-size: 12.5px; font-weight: 500;
    color: rgba(255,255,255,.55); text-decoration: none; transition: all .12s;
  }
  .sl-direct-link:hover { background: rgba(255,255,255,.07); color: #fff; }
  .sl-direct-link.active { background: rgba(74,222,128,.12); color: #4ade80; font-weight: 600; }
  .sl-direct-icon {
    width: 24px; height: 24px; border-radius: 5px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,.05);
  }

  /* ── Language selector ── */
  .sl-lang-wrap { position: relative; }
  .sl-lang-btn {
    width: 100%; display: flex; align-items: center; gap: 8px;
    padding: 7px 9px; border-radius: 6px; border: none; cursor: pointer;
    background: transparent; color: rgba(255,255,255,.55);
    font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500;
    transition: all .12s;
  }
  .sl-lang-btn:hover { background: rgba(255,255,255,.07); color: #fff; }
  .sl-lang-panel {
    position: absolute; bottom: calc(100% + 4px); left: 8px; right: 8px;
    background: #1f2937; border: 1px solid rgba(255,255,255,.1);
    border-radius: 8px; overflow: hidden;
    box-shadow: 0 -8px 24px rgba(0,0,0,.4);
  }
  .sl-lang-item {
    display: flex; align-items: center; gap: 9px;
    padding: 9px 12px; cursor: pointer; font-size: 12.5px;
    color: rgba(255,255,255,.65); transition: background .08s;
    border-bottom: 1px solid rgba(255,255,255,.05);
  }
  .sl-lang-item:last-child { border-bottom: none; }
  .sl-lang-item:hover { background: rgba(255,255,255,.08); color: #fff; }
  .sl-lang-item.active { color: #4ade80; font-weight: 600; background: rgba(74,222,128,.08); }
  .sl-lang-flag { font-size: 16px; flex-shrink: 0; }
  .sl-lang-name { flex: 1; }
  .sl-lang-code { font-family: 'DM Mono',monospace; font-size: 10px; color: rgba(255,255,255,.25); }

  /* ── Install button ── */
  .sl-install-btn {
    display: flex; align-items: center; gap: 7px;
    padding: 7px 9px; border-radius: 6px; border: none; cursor: pointer;
    background: rgba(74,222,128,.1); color: #4ade80;
    font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600;
    transition: all .12s; width: 100%; margin-bottom: 3px;
    border: 1px solid rgba(74,222,128,.2);
  }
  .sl-install-btn:hover { background: rgba(74,222,128,.18); border-color: rgba(74,222,128,.4); }

  /* user chip */
  .sl-sidebar-foot {
    padding: 8px 8px 10px;
    border-top: 1px solid rgba(255,255,255,.07); flex-shrink: 0;
  }
  .sl-user-chip {
    display: flex; align-items: center; gap: 8px;
    padding: 7px 9px; border-radius: 7px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.07);
  }
  .sl-user-avatar {
    width: 28px; height: 28px; border-radius: 6px; flex-shrink: 0;
    background: #1f2937; border: 1px solid rgba(255,255,255,.12);
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 700; color: #4ade80;
  }
  .sl-user-info { flex: 1; overflow: hidden; }
  .sl-user-name { font-size: 12px; font-weight: 600; color: rgba(255,255,255,.85); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sl-user-role { font-size: 9px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: rgba(255,255,255,.28); margin-top: 1px; }
  .sl-user-logout {
    flex-shrink: 0; width: 24px; height: 24px; border-radius: 5px;
    background: rgba(239,68,68,.09); border: 1px solid rgba(239,68,68,.15);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: rgba(239,68,68,.55); transition: all .12s;
  }
  .sl-user-logout:hover { background: rgba(239,68,68,.18); color: #ef4444; }
  .sl-profile-btn {
    flex-shrink: 0; width: 24px; height: 24px; border-radius: 5px;
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
    box-shadow: 0 1px 3px rgba(0,0,0,.05); flex-shrink: 0;
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
  .sl-topbar-title { font-size: 13.5px; font-weight: 600; color: #111827; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 280px; }
  .sl-topbar-sep   { color: #d1d5db; font-size: 14px; user-select: none; }

  .sl-company-pill {
    display: flex; align-items: center; gap: 6px;
    padding: 4px 10px; border-radius: 6px;
    background: #f3f4f6; border: 1px solid #e5e7eb;
  }
  .sl-company-logo    { width: 18px; height: 18px; border-radius: 4px; object-fit: cover; flex-shrink: 0; }
  .sl-company-logo-fb {
    width: 18px; height: 18px; border-radius: 4px; flex-shrink: 0;
    background: #1f2937; display: flex; align-items: center; justify-content: center;
    font-size: 7px; font-weight: 700; color: #4ade80;
  }
  .sl-company-name { font-size: 12px; font-weight: 700; color: #111827; white-space: nowrap; }
  .sl-welcome      { font-size: 12px; color: #6b7280; font-weight: 500; white-space: nowrap; }
  .sl-welcome strong { color: #111827; font-weight: 700; }

  /* ══ MAIN ══ */
  .sl-main-wrap { flex: 1; display: flex; flex-direction: column; transition: margin-left .25s cubic-bezier(.4,0,.2,1); min-width: 0; }
  .sl-main-wrap.sidebar-open { margin-left: 242px; }
  .sl-content { flex: 1; padding: 24px; }

  .sl-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 49; }
  .sl-overlay.visible { display: block; }

  .sl-soon-badge {
    font-size: 8px; font-weight: 700; padding: 1px 5px; border-radius: 3px;
    background: rgba(255,255,255,.08); color: rgba(255,255,255,.3);
    letter-spacing: .06em; text-transform: uppercase; margin-left: auto;
  }

  /* ── Google Translate overrides ── */
  /* Hide the toolbar banner GT injects at top of page */
  .goog-te-banner-frame.skiptranslate { display: none !important; }
  body { top: 0 !important; }
  /* Hide the GT element div */
  #gt-element { display: none !important; }

  @media (max-width: 900px) {
    .sl-main-wrap.sidebar-open { margin-left: 0 !important; }
    .sl-sidebar-close { display: flex !important; }
    .sl-topbar-title  { display: none; }
    .sl-topbar-sep    { display: none; }
    .sl-company-name  { display: none; }
    .sl-welcome       { display: none; }
  }
  @media (max-width: 500px) { .sl-content { padding: 14px; } }
`,bt={"/dashboard":"Dashboard","/create-account":"Add Account","/view-accounts":"Chart of Accounts","/general-entries":"Journal Entries","/cashbook":"Cashbook Entry","/cashbook-report":"Daily Cashbook","/add-account-bank":"Add Bank Account","/cheque-book/create":"Create Cheque Book","/cheque-book/entry":"Issue Cheque","/cheque-book/view":"Cheque Management","/add-invoice-purchase":"New Purchase","/view-purchase-invoices":"All Purchases","/add-invoice-sales":"Create Invoice","/view-sales-invoices":"Sales History","/products":"Products List","/stock":"Inventory","/weight-bridge":"Weight Bridge Entry","/weight-bridge/invoices":"WB Invoices","/employees/new":"New Employee","/employees":"All Employees","/trialbalance":"Trial Balance","/balancesheet":"Balance Sheet","/incomestatement":"Income Statement","/profile":"My Profile","/ledger":"Ledger"},ie=[{code:"en",native:"English"},{code:"ur",native:"اردو"},{code:"hi",native:"हिन्दी"}],A={home:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15.75a.75.75 0 01-.75-.75v-4.5h-6V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"})}),accounts:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})}),cash:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),bank:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"})}),purchase:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"})}),sales:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"})}),products:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"})}),weight:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"})}),employees:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"})}),reports:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})}),chevron:e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})}),back:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10 19l-7-7m0 0l7-7m-7 7h18"})}),menu:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 6h16M4 12h16M4 18h16"})}),close:e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})}),dot:e.jsx("svg",{width:4,height:4,viewBox:"0 0 4 4",fill:"currentColor",children:e.jsx("circle",{cx:2,cy:2,r:2})}),profile:e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})}),logout:e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"})}),globe:e.jsxs("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:[e.jsx("circle",{cx:12,cy:12,r:10}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"})]}),install:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"})})},Te=o=>(o||"U").split(" ").map(s=>s[0]).join("").slice(0,2).toUpperCase(),mt=()=>{const o=new Date().getHours();return o<12?"Good morning":o<17?"Good afternoon":o<21?"Good evening":"Good night"};let Le=!1;function ut(){if(Le||document.getElementById("gt-script"))return;Le=!0,de(),window.googleTranslateElementInit=function(){if(window.google?.translate?.TranslateElement){new window.google.translate.TranslateElement({pageLanguage:"en",includedLanguages:"en,ur,hi",autoDisplay:!1,layout:window.google.translate.TranslateElement.InlineLayout.SIMPLE},"gt-element"),de();const s=localStorage.getItem("ap-lang");s&&s!=="en"&&setTimeout(()=>ce(s),800)}};const o=document.createElement("script");o.id="gt-script",o.src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",o.async=!0,document.body.appendChild(o)}function ce(o){if(localStorage.setItem("ap-lang",o),o==="en"){const a=document.querySelector(".goog-te-combo");a&&(a.value="",a.dispatchEvent(new Event("change")));return}const s=(a=0)=>{const i=document.querySelector(".goog-te-combo");if(i){i.value=o,i.dispatchEvent(new Event("change")),de();return}a<30&&setTimeout(()=>s(a+1),250)};s()}function de(){const o=[".goog-te-banner-frame{display:none!important}",".goog-te-menu-frame{display:none!important}","body{top:0!important;position:static!important}","#goog-gt-tt{display:none!important}",".goog-tooltip{display:none!important}",".goog-tooltip:hover{display:none!important}",".goog-text-highlight{background:none!important;box-shadow:none!important}","iframe.goog-te-banner-frame{display:none!important}","iframe.skiptranslate{display:none!important}"].join("");if(!document.getElementById("gt-suppress")){const a=document.createElement("style");a.id="gt-suppress",a.textContent=o,document.head.appendChild(a)}if(window.__gtMO)return;const s=()=>{document.body&&document.body.style.top&&document.body.style.top!=="0px"&&document.body.style.setProperty("top","0px","important"),document.querySelectorAll(".goog-te-banner-frame, .goog-te-menu-frame, iframe.goog-te-banner-frame, iframe.skiptranslate, #goog-gt-tt, .goog-tooltip").forEach(a=>a.style.setProperty("display","none","important"))};window.__gtMO=new MutationObserver(s),window.__gtMO.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["style"]})}function xt({businessName:o}){const s=localStorage.getItem("logoUrl")||"",[a,i]=n.useState(!1),r=(o||"A").slice(0,2).toUpperCase();return s&&!a?e.jsx("img",{src:s,alt:o,className:"sl-company-logo",onError:()=>i(!0)}):e.jsx("div",{className:"sl-company-logo-fb",children:r})}function jt(){const[o,s]=n.useState(!1);return o?e.jsx("div",{className:"sl-brand-logo-fb",children:"A+"}):e.jsx("img",{src:"/logo.png",alt:"AgroPlus+",className:"sl-brand-logo",onError:()=>s(!0)})}function Re(){const[o,s]=Z.useState(()=>localStorage.getItem("adminPic")||"");return Z.useEffect(()=>{const a=localStorage.getItem("token");a&&fetch(`${$}/profile`,{headers:{Authorization:`Bearer ${a}`}}).then(i=>i.ok?i.json():null).then(i=>{const r=i?.profile||i,p=r?.profilePic||r?.avatarUrl||r?.adminProfilePic||"";p&&(s(p),localStorage.setItem("adminPic",p))}).catch(()=>{})},[]),o}function kt({name:o}){const s=Re(),[a,i]=Z.useState(!1);return s&&!a?e.jsx("div",{className:"sl-user-avatar",style:{overflow:"hidden",padding:0,background:"#1f2937"},children:e.jsx("img",{src:s,alt:o,onError:()=>i(!0),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:5}})}):e.jsx("div",{className:"sl-user-avatar",children:Te(o)})}function vt({name:o,onClick:s}){const a=Re(),[i,r]=Z.useState(!1);return a&&!i?e.jsx("button",{onClick:s,title:o,style:{width:32,height:32,borderRadius:"50%",border:"2px solid #e5e7eb",background:"#1f2937",cursor:"pointer",flexShrink:0,overflow:"hidden",padding:0},children:e.jsx("img",{src:a,alt:o,onError:()=>r(!0),style:{width:"100%",height:"100%",objectFit:"cover"}})}):e.jsx("button",{onClick:s,title:o,style:{width:32,height:32,borderRadius:"50%",border:"2px solid #e5e7eb",background:"#111827",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"#4ade80",transition:".12s",flexShrink:0},children:Te(o)})}function yt(){return e.jsxs("div",{className:"sl-wordmark",children:[e.jsx("span",{className:"sl-wordmark-agro",children:"Agro"}),e.jsx("span",{className:"sl-wordmark-p",children:"P"}),e.jsx("span",{className:"sl-wordmark-lus",children:"lus"}),e.jsx("span",{className:"sl-wordmark-plus",children:"+"})]})}function wt(){const[o,s]=n.useState(!1),[a,i]=n.useState(localStorage.getItem("ap-lang")||"en"),r=n.useRef(null),p=ie.find(f=>f.code===a)||ie[0];n.useEffect(()=>{ut(),a!=="en"&&setTimeout(()=>ce(a),1500)},[]),n.useEffect(()=>{const f=j=>{r.current&&!r.current.contains(j.target)&&s(!1)};return document.addEventListener("mousedown",f),()=>document.removeEventListener("mousedown",f)},[]);const h=f=>{i(f),s(!1),ce(f)};return e.jsxs("div",{ref:r,className:"sl-lang-wrap",children:[o&&e.jsx("div",{className:"sl-lang-panel",children:ie.map(f=>e.jsxs("div",{className:`sl-lang-item${a===f.code?" active":""}`,onClick:()=>h(f.code),children:[e.jsx("span",{style:{fontSize:13.5,fontWeight:a===f.code?700:500,flex:1,color:a===f.code?"#4ade80":"rgba(255,255,255,.75)"},children:f.native}),a===f.code&&e.jsx("svg",{width:10,height:10,fill:"none",viewBox:"0 0 24 24",stroke:"#4ade80",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})]},f.code))}),e.jsxs("button",{className:"sl-lang-btn",onClick:()=>s(f=>!f),children:[e.jsx("span",{className:"sl-menu-icon",children:A.globe}),e.jsx("span",{className:"sl-menu-label",children:p.native}),e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"rgba(255,255,255,.3)",strokeWidth:2.5,style:{flexShrink:0,transition:".12s",transform:o?"rotate(180deg)":"none"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),e.jsx("div",{id:"gt-element"})]})}function O({icon:o,label:s,menuKey:a,activeMenu:i,setActiveMenu:r,children:p}){const h=i===a;return e.jsxs("div",{children:[e.jsxs("button",{className:`sl-menu-btn${h?" open":""}`,onClick:()=>r(h?"":a),children:[e.jsx("span",{className:"sl-menu-icon",children:o}),e.jsx("span",{className:"sl-menu-label",children:s}),e.jsx("span",{className:"sl-menu-chevron",children:A.chevron})]}),e.jsx("div",{className:`sl-sub${h?" open":""}`,children:e.jsx("div",{className:"sl-sub-inner",children:p})})]})}function M({to:o,label:s,isActive:a,hasAccess:i,soon:r}){return i?r?e.jsxs("span",{className:"sl-sub-link soon",children:[A.dot,s,e.jsx("span",{className:"sl-soon-badge",children:"soon"})]}):e.jsxs(ge,{to:o,className:`sl-sub-link${a?" active":""}`,children:[A.dot,s]}):null}function Nt(){const[o,s]=n.useState(null),[a,i]=n.useState(!1);if(n.useEffect(()=>{if(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0){i(!0);return}const p=h=>{h.preventDefault(),s(h)};return window.addEventListener("beforeinstallprompt",p),window.addEventListener("appinstalled",()=>{s(null),i(!0)}),()=>window.removeEventListener("beforeinstallprompt",p)},[]),a||!o)return null;const r=async()=>{if(!o)return;o.prompt();const{outcome:p}=await o.userChoice;p==="accepted"&&(s(null),i(!0))};return e.jsxs("button",{className:"sl-install-btn",onClick:r,title:"Install Agro Plus as an app",children:[e.jsx("span",{className:"sl-menu-icon",style:{background:"rgba(74,222,128,.15)"},children:A.install}),e.jsx("span",{style:{flex:1},children:"Install App"}),e.jsx("span",{style:{fontSize:9,fontWeight:500,color:"rgba(74,222,128,.6)",background:"rgba(74,222,128,.1)",padding:"1px 5px",borderRadius:3},children:"FREE"})]})}function Lt({children:o}){const[s,a]=n.useState(!0),[i,r]=n.useState(""),[p,h]=n.useState(!1),f=fe(),j=De(),L=n.useRef(null),k=localStorage.getItem("role")||"Admin",v=localStorage.getItem("name")||"User",S=localStorage.getItem("businessName")||"Agro Plus",B=k==="Admin",g=Z.useMemo(()=>{try{return JSON.parse(localStorage.getItem("allowedRoutes"))||[]}catch{return[]}},[]),c=Z.useCallback(l=>!g?.length||g.includes("*")?!0:g.some(z=>z===l||l.startsWith(z.replace("/*",""))),[g]),b=l=>f.pathname===l;n.useEffect(()=>{const l=f.pathname;l==="/dashboard"?r("dashboard"):l.includes("account")||l.includes("ledger")?r("accounts"):l.includes("cashbook")||l.includes("general-entries")||l.includes("journal")?r("cash"):l.includes("cheque")||l.includes("bank")?r("bank"):l.includes("purchase")?r("purchase"):l.includes("sales")||l.includes("sales-invoices")?r("sales"):l.includes("product")||l.includes("stock")?r("products"):l.includes("weight-bridge")?r("weight"):l.includes("employee")?r("employees"):(l.includes("balance")||l.includes("income")||l.includes("trial"))&&r("reports")},[f.pathname]),n.useEffect(()=>{const l=z=>{L.current&&!L.current.contains(z.target)&&h(!1)};return document.addEventListener("mousedown",l),()=>document.removeEventListener("mousedown",l)},[]);const m=()=>{window.innerWidth<900&&a(!1)},E=()=>{["token","role","name","allowedRoutes","millId","businessName","logoUrl","adminPic"].forEach(l=>localStorage.removeItem(l)),j("/")},x=bt[f.pathname]||"";return e.jsxs("div",{className:"sl-root",children:[e.jsxs("style",{children:[ft,gt]}),e.jsx("div",{className:`sl-overlay${s&&window.innerWidth<900?" visible":""}`,onClick:()=>a(!1)}),e.jsxs("aside",{className:`sl-sidebar${s?"":" closed"}`,children:[e.jsxs("div",{className:"sl-brand",children:[e.jsx(jt,{}),e.jsx(yt,{}),e.jsx("button",{className:"sl-sidebar-close",onClick:()=>a(!1),children:A.close})]}),e.jsxs("nav",{className:"sl-nav",children:[c("/dashboard")&&e.jsxs(ge,{to:"/dashboard",className:`sl-direct-link${b("/dashboard")?" active":""}`,onClick:m,children:[e.jsx("span",{className:"sl-direct-icon",children:A.home}),"Dashboard"]}),(c("/create-account")||c("/view-accounts"))&&e.jsxs(O,{icon:A.accounts,label:"Accounts",menuKey:"accounts",activeMenu:i,setActiveMenu:r,children:[e.jsx(M,{to:"/create-account",label:"Add Account",isActive:b("/create-account"),hasAccess:c("/create-account")}),e.jsx(M,{to:"/view-accounts",label:"Chart of Accounts",isActive:b("/view-accounts"),hasAccess:c("/view-accounts")})]}),(c("/general-entries")||c("/cashbook")||c("/cashbook-report"))&&e.jsxs(O,{icon:A.cash,label:"Cash Management",menuKey:"cash",activeMenu:i,setActiveMenu:r,children:[e.jsx(M,{to:"/general-entries",label:"Journal Entries",isActive:b("/general-entries"),hasAccess:c("/general-entries")}),e.jsx(M,{to:"/cashbook",label:"Cashbook Entry",isActive:b("/cashbook"),hasAccess:c("/cashbook")}),e.jsx(M,{to:"#",label:"Fund Transfer",isActive:!1,hasAccess:!0,soon:!0}),e.jsx(M,{to:"/cashbook-report",label:"Daily Cashbook",isActive:b("/cashbook-report"),hasAccess:c("/cashbook-report")})]}),e.jsxs(O,{icon:A.bank,label:"Bank Management",menuKey:"bank",activeMenu:i,setActiveMenu:r,children:[e.jsx(M,{to:"#",label:"Add Bank Account",isActive:!1,hasAccess:!0,soon:!0}),e.jsx(M,{to:"/cheque-book/create",label:"Create Cheque Book",isActive:b("/cheque-book/create"),hasAccess:!0}),e.jsx(M,{to:"/cheque-book/entry",label:"Issue Cheque",isActive:b("/cheque-book/entry"),hasAccess:!0}),e.jsx(M,{to:"/cheque-book/view",label:"Cheque Management",isActive:b("/cheque-book/view"),hasAccess:!0}),e.jsx(M,{to:"#",label:"Bank Reconciliation",isActive:!1,hasAccess:!0,soon:!0})]}),(c("/add-invoice-purchase")||c("/view-purchase-invoices"))&&e.jsxs(O,{icon:A.purchase,label:"Purchase",menuKey:"purchase",activeMenu:i,setActiveMenu:r,children:[e.jsx(M,{to:"/add-invoice-purchase",label:"New Purchase Order",isActive:b("/add-invoice-purchase"),hasAccess:c("/add-invoice-purchase")}),e.jsx(M,{to:"/view-purchase-invoices",label:"All Purchases",isActive:b("/view-purchase-invoices"),hasAccess:c("/view-purchase-invoices")})]}),(c("/add-invoice-sales")||c("/view-sales-invoices"))&&e.jsxs(O,{icon:A.sales,label:"Sales",menuKey:"sales",activeMenu:i,setActiveMenu:r,children:[e.jsx(M,{to:"/add-invoice-sales",label:"Create Invoice",isActive:b("/add-invoice-sales"),hasAccess:c("/add-invoice-sales")}),e.jsx(M,{to:"/view-sales-invoices",label:"Sales History",isActive:b("/view-sales-invoices"),hasAccess:c("/view-sales-invoices")})]}),(c("/products")||c("/stock"))&&e.jsxs(O,{icon:A.products,label:"Products",menuKey:"products",activeMenu:i,setActiveMenu:r,children:[e.jsx(M,{to:"/products",label:"Products List",isActive:b("/products"),hasAccess:c("/products")}),e.jsx(M,{to:"/stock",label:"Inventory",isActive:b("/stock"),hasAccess:c("/stock")})]}),(c("/weight-bridge")||c("/weight-bridge/invoices"))&&e.jsxs(O,{icon:A.weight,label:"Weight Bridge",menuKey:"weight",activeMenu:i,setActiveMenu:r,children:[e.jsx(M,{to:"/weight-bridge",label:"WB Entry",isActive:b("/weight-bridge"),hasAccess:c("/weight-bridge")}),e.jsx(M,{to:"/weight-bridge/invoices",label:"WB Invoices",isActive:b("/weight-bridge/invoices"),hasAccess:c("/weight-bridge/invoices")})]}),(c("/employees")||c("/employees/new"))&&e.jsxs(O,{icon:A.employees,label:"Employees",menuKey:"employees",activeMenu:i,setActiveMenu:r,children:[e.jsx(M,{to:"/employees/new",label:"New Employee",isActive:b("/employees/new"),hasAccess:c("/employees/new")}),e.jsx(M,{to:"/employees",label:"All Employees",isActive:b("/employees"),hasAccess:c("/employees")})]}),(c("/trialbalance")||c("/balancesheet")||c("/incomestatement"))&&e.jsxs(O,{icon:A.reports,label:"Reports",menuKey:"reports",activeMenu:i,setActiveMenu:r,children:[e.jsx(M,{to:"/trialbalance",label:"Trial Balance",isActive:b("/trialbalance"),hasAccess:c("/trialbalance")}),e.jsx(M,{to:"/balancesheet",label:"Balance Sheet",isActive:b("/balancesheet"),hasAccess:c("/balancesheet")}),e.jsx(M,{to:"/incomestatement",label:"Income Statement",isActive:b("/incomestatement"),hasAccess:c("/incomestatement")})]})]}),e.jsxs("div",{className:"sl-sidebar-foot",children:[e.jsx(Nt,{}),e.jsx(wt,{}),e.jsx("div",{style:{height:1,background:"rgba(255,255,255,.06)",margin:"6px 0"}}),e.jsxs("div",{className:"sl-user-chip",children:[e.jsx(kt,{name:v}),e.jsxs("div",{className:"sl-user-info",children:[e.jsx("div",{className:"sl-user-name",children:v}),e.jsx("div",{className:"sl-user-role",children:k})]}),B&&e.jsx("button",{className:"sl-profile-btn",title:"Profile",onClick:()=>{j("/profile"),m()},children:A.profile}),e.jsx("button",{className:"sl-user-logout",title:"Sign Out",onClick:E,children:A.logout})]})]})]}),e.jsxs("div",{className:`sl-main-wrap${s?" sidebar-open":""}`,children:[e.jsxs("header",{className:"sl-topbar",children:[e.jsxs("div",{className:"sl-topbar-left",children:[e.jsx("button",{className:"sl-hamburger",onClick:()=>a(l=>!l),children:A.menu}),f.pathname!=="/dashboard"&&e.jsx("button",{className:"sl-back-btn",onClick:()=>j(-1),children:A.back}),e.jsxs("div",{className:"sl-company-pill",children:[e.jsx(xt,{businessName:S}),e.jsx("span",{className:"sl-company-name",children:S})]}),x&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"sl-topbar-sep",children:"·"}),e.jsx("span",{className:"sl-topbar-title",children:x})]})]}),e.jsxs("div",{className:"sl-topbar-right",children:[e.jsxs("span",{className:"sl-welcome",children:[mt(),", ",e.jsx("strong",{children:v.split(" ")[0]})]}),e.jsxs("div",{ref:L,style:{position:"relative"},children:[e.jsx(vt,{name:v,onClick:()=>h(l=>!l)}),p&&e.jsxs("div",{style:{position:"absolute",right:0,top:"calc(100% + 6px)",width:170,zIndex:200,background:"#fff",border:"1px solid #e5e7eb",borderRadius:9,boxShadow:"0 8px 24px rgba(0,0,0,.1)",overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"9px 13px 7px",borderBottom:"1px solid #f3f4f6"},children:[e.jsx("div",{style:{fontSize:12.5,fontWeight:700,color:"#111827"},children:v}),e.jsx("div",{style:{fontSize:11,color:"#6b7280"},children:k})]}),B&&e.jsxs("button",{onClick:()=>{j("/profile"),h(!1)},style:{width:"100%",padding:"8px 13px",background:"none",border:"none",textAlign:"left",fontSize:12.5,color:"#1f2937",cursor:"pointer",display:"flex",alignItems:"center",gap:7,fontWeight:500},onMouseEnter:l=>l.currentTarget.style.background="#f9fafb",onMouseLeave:l=>l.currentTarget.style.background="none",children:[A.profile," My Profile"]}),e.jsxs("button",{onClick:E,style:{width:"100%",padding:"8px 13px",background:"none",border:"none",borderTop:"1px solid #f3f4f6",textAlign:"left",fontSize:12.5,color:"#dc2626",cursor:"pointer",display:"flex",alignItems:"center",gap:7,fontWeight:500},onMouseEnter:l=>l.currentTarget.style.background="#fef2f2",onMouseLeave:l=>l.currentTarget.style.background="none",children:[A.logout," Sign Out"]})]})]})]})]}),e.jsx("main",{className:"sl-content",children:o})]})]})}const J=async(o,s={})=>{const a=localStorage.getItem("token"),i=await fetch(o,{...s,headers:{Authorization:`Bearer ${a}`,...s.headers}});return i.status===401&&(localStorage.removeItem("token"),window.location.href="/"),i},St="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",Mt=`
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
`,pe=[{id:1,abbr:"NBP",fullName:"National Bank of Pakistan",color:"#007940",bg:"#e6f4ec",keys:["national bank","nbp"]},{id:2,abbr:"BOP",fullName:"The Bank of Punjab",color:"#1a237e",bg:"#e8eaf6",keys:["bank of punjab","bop"]},{id:3,abbr:"BOK",fullName:"The Bank of Khyber",color:"#2e4057",bg:"#eaecf0",keys:["bank of khyber","bok"]},{id:4,abbr:"SBL",fullName:"Sindh Bank Limited",color:"#374151",bg:"#f3f4f6",keys:["sindh bank","sbl"]},{id:5,abbr:"FWBL",fullName:"First Women Bank Limited",color:"#7c3aed",bg:"#f5f3ff",keys:["first women","fwbl"]},{id:6,abbr:"HBL",fullName:"Habib Bank Limited",color:"#006633",bg:"#e6f4ed",keys:["habib bank","hbl"]},{id:7,abbr:"UBL",fullName:"United Bank Limited",color:"#003087",bg:"#e8eef8",keys:["united bank","ubl"]},{id:8,abbr:"MCB",fullName:"MCB Bank Limited",color:"#c8102e",bg:"#fce8ec",keys:["mcb bank","mcb"]},{id:9,abbr:"ABL",fullName:"Allied Bank Limited",color:"#b8860b",bg:"#fdf6e3",keys:["allied bank","abl"]},{id:10,abbr:"BAFL",fullName:"Bank Alfalah Limited",color:"#c8102e",bg:"#fce8ec",keys:["bank alfalah","alfalah","bafl"]},{id:11,abbr:"BAHL",fullName:"Bank Al Habib Limited",color:"#00703c",bg:"#e6f4ed",keys:["bank al habib","bahl"]},{id:12,abbr:"AKBL",fullName:"Askari Bank Limited",color:"#004225",bg:"#e6f0ea",keys:["askari","akbl"]},{id:13,abbr:"HMB",fullName:"Habib Metropolitan Bank Limited",color:"#1a3c6e",bg:"#eaf0f8",keys:["habib metropolitan","hmb","habibmetro"]},{id:14,abbr:"SNBL",fullName:"Soneri Bank Limited",color:"#8b0000",bg:"#fce8e8",keys:["soneri","snbl"]},{id:15,abbr:"JSBL",fullName:"JS Bank Limited",color:"#d4380d",bg:"#fff2ed",keys:["js bank","jsbl"]},{id:16,abbr:"SAMB",fullName:"Samba Bank Limited",color:"#d4001c",bg:"#fce8e8",keys:["samba","samb"]},{id:17,abbr:"SILK",fullName:"Silkbank Limited",color:"#7c3aed",bg:"#f5f3ff",keys:["silkbank","silk"]},{id:18,abbr:"SMBL",fullName:"Summit Bank Limited",color:"#374151",bg:"#f3f4f6",keys:["summit","smbl"]},{id:19,abbr:"MEBL",fullName:"Meezan Bank Limited",color:"#1a5276",bg:"#eaf0f8",keys:["meezan","mebl"]},{id:20,abbr:"FABL",fullName:"Faysal Bank Limited",color:"#7b3f00",bg:"#f5ece4",keys:["faysal","fabl"]},{id:21,abbr:"BIPL",fullName:"BankIslami Pakistan Limited",color:"#065f46",bg:"#f0fdf4",keys:["bankislami","bipl"]},{id:22,abbr:"DIBPL",fullName:"Dubai Islamic Bank Pakistan Limited",color:"#c8102e",bg:"#fce8ec",keys:["dubai islamic","dibpl","dib"]},{id:23,abbr:"ABPL",fullName:"Al Baraka Bank (Pakistan) Limited",color:"#2d6a4f",bg:"#e6f4ed",keys:["al baraka","abpl"]},{id:24,abbr:"MIBL",fullName:"MCB Islamic Bank Limited",color:"#c8102e",bg:"#fce8ec",keys:["mcb islamic","mibl"]},{id:25,abbr:"SCBPL",fullName:"Standard Chartered Bank (Pakistan) Limited",color:"#0e5c96",bg:"#e8f0f8",keys:["standard chartered","scbpl","scb"]},{id:26,abbr:"BML",fullName:"Bank Makramah Limited",color:"#374151",bg:"#f3f4f6",keys:["bank makramah","bml"]}],Se=Object.fromEntries(pe.map(o=>[o.id,o]));function We(o){if(o?.bankLogoIndex&&Se[o.bankLogoIndex])return Se[o.bankLogoIndex];if(o?.bankName){const a=o.bankName.toLowerCase();for(const i of pe)if(i.fullName.toLowerCase()===a||i.keys.some(r=>a.includes(r)))return i}const s=(o?.accountName||"").toLowerCase();for(const a of pe)if(a.keys.some(i=>s.includes(i)))return a;return null}function At(o){const s=We(o),a=o?.accountName||"",i=o?.remarkNote?` — ${o.remarkNote}`:"",r=`${a}${i}`;return s?{line1:s.fullName,line2:r,abbr:s.abbr,color:s.color,bg:s.bg,logoIndex:o?.bankLogoIndex||null}:{line1:a,line2:o?.remarkNote||"",abbr:(a.match(/[A-Z]/g)||[]).join("").slice(0,5)||"BNK",color:"#6b7280",bg:"#f3f4f6",logoIndex:null}}function Ct({account:o}){const s=We(o),a=s?.abbr||"BNK",i=s?.color||"#6b7280",r=o?.bankLogoIndex,[p,h]=n.useState(!0);return r&&p?e.jsx("div",{className:"db-bank-badge",children:e.jsx("img",{src:`/${r}.png`,alt:a,onError:()=>h(!1)})}):e.jsx("div",{className:"db-bank-badge",style:{color:i,background:`${i}14`,borderColor:`${i}30`},children:a.slice(0,5)})}const C=o=>"Rs "+Number(o||0).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0}),Q=()=>new Date().toISOString().slice(0,10),Bt=()=>{const o=new Date;return o.setDate(o.getDate()-o.getDay()),o.toISOString().slice(0,10)},Et=()=>new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().slice(0,10),Me=(o,s,a)=>{if(!o)return!1;const i=(o||"").slice(0,10);return(!s||i>=s)&&(!a||i<=a)};function Ae(o="today"){const[s,a]=n.useState(o),[i,r]=n.useState({from:Q(),to:Q()}),{from:p,to:h}=n.useMemo(()=>s==="today"?{from:Q(),to:Q()}:s==="week"?{from:Bt(),to:Q()}:s==="month"?{from:Et(),to:Q()}:s==="custom"?{from:i.from,to:i.to}:{from:null,to:null},[s,i]);return{mode:s,setMode:a,from:p,to:h,custom:i,setCustom:r}}function Ce({p:o}){const s=["today","week","month","all"],a={today:"Today",week:"Week",month:"Month",all:"All time"};return e.jsxs("div",{className:"db-filter",children:[s.map(i=>e.jsx("button",{className:`db-fpill${o.mode===i?" on":""}`,onClick:()=>o.setMode(i),children:a[i]},i)),e.jsx("button",{className:`db-fpill${o.mode==="custom"?" on":""}`,onClick:()=>o.setMode("custom"),children:"Custom"}),o.mode==="custom"&&e.jsxs(e.Fragment,{children:[e.jsx("input",{type:"date",className:"db-fpill-date",value:o.custom.from,onChange:i=>o.setCustom(r=>({...r,from:i.target.value}))}),e.jsx("input",{type:"date",className:"db-fpill-date",value:o.custom.to,onChange:i=>o.setCustom(r=>({...r,to:i.target.value}))})]})]})}function Be({data:o,color:s}){const a=Math.max(...o.map(i=>i.value),1);return e.jsx("div",{style:{marginTop:10},children:o.map((i,r)=>e.jsxs("div",{className:"db-bar-row",children:[e.jsx("span",{className:"db-bar-lbl",children:i.label}),e.jsx("div",{className:"db-bar-track",children:e.jsx("div",{className:"db-bar-fill",style:{width:`${Math.round(i.value/a*100)}%`,background:s||"#111827"}})}),e.jsx("span",{className:"db-bar-val",children:C(i.value)})]},r))})}function Ee({products:o,selected:s,onChange:a}){const[i,r]=n.useState(!1),[p,h]=n.useState(""),f=n.useRef(null),j=n.useRef(null),[L,k]=n.useState({top:0,left:0,width:0});n.useEffect(()=>{const g=c=>{!f.current?.contains(c.target)&&!j.current?.contains(c.target)&&r(!1)};return document.addEventListener("mousedown",g),()=>document.removeEventListener("mousedown",g)},[]),n.useEffect(()=>{if(!i)return;const g=()=>{const c=f.current?.getBoundingClientRect();c&&k({top:c.bottom+3,left:c.left,width:c.width})};return g(),window.addEventListener("scroll",g,!0),window.addEventListener("resize",g),()=>{window.removeEventListener("scroll",g,!0),window.removeEventListener("resize",g)}},[i]);const v=o.filter(g=>g.toLowerCase().includes(p.toLowerCase())),S=s.length===0?"All Products":s.length===1?s[0]:`${s.length} products`,B=g=>{s.includes(g)?a(s.filter(c=>c!==g)):a([...s,g])};return e.jsxs("div",{className:"db-prod-wrap",children:[e.jsxs("button",{ref:f,className:`db-prod-btn${i?" open":""}`,onClick:()=>r(g=>!g),children:[e.jsxs("span",{style:{color:s.length>0?"#15803d":"#9ca3af",fontWeight:s.length>0?600:400},children:[s.length>0&&"🔽 ",S]}),e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2.5,style:{flexShrink:0,transition:".12s",transform:i?"rotate(180deg)":"none"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),i&&e.jsxs("div",{ref:j,className:"db-prod-panel",style:{top:L.top,left:L.left,width:Math.max(L.width,200)},children:[e.jsx("input",{autoFocus:!0,className:"db-prod-search",placeholder:"Search product…",value:p,onChange:g=>h(g.target.value)}),e.jsxs("div",{style:{maxHeight:180,overflowY:"auto"},children:[e.jsxs("div",{className:`db-prod-item${s.length===0?" sel":""}`,onClick:()=>{a([]),r(!1)},children:[e.jsx("div",{className:`db-prod-check${s.length===0?" on":""}`,children:s.length===0&&e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"#fff",strokeWidth:3,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})}),"All Products"]}),v.map(g=>e.jsxs("div",{className:`db-prod-item${s.includes(g)?" sel":""}`,onClick:()=>B(g),children:[e.jsx("div",{className:`db-prod-check${s.includes(g)?" on":""}`,children:s.includes(g)&&e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"#fff",strokeWidth:3,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})}),g]},g)),v.length===0&&e.jsx("div",{style:{padding:"10px 12px",fontSize:12,color:"#9ca3af",textAlign:"center"},children:"No products"})]})]})]})}function zt(){const o=localStorage.getItem("name")||"User",s=localStorage.getItem("businessName")||"",[a,i]=n.useState(!0),[r,p]=n.useState([]),[h,f]=n.useState([]),[j,L]=n.useState([]),[k,v]=n.useState(null),[S,B]=n.useState([]),[g,c]=n.useState([]),b=Ae("today"),m=Ae("today"),[E,x]=n.useState(!1),[l,z]=n.useState(!1),[_,$e]=n.useState(!1),[be,Ve]=n.useState(!1),[me,qe]=n.useState(!1),[q,Fe]=n.useState([]),[F,He]=n.useState([]);n.useEffect(()=>{(async()=>(i(!0),await Promise.allSettled([J(`${$}/accounts`).then(t=>t.ok&&t.json()).then(t=>t&&p(Array.isArray(t)?t:[])),J(`${$}/sales-invoice`).then(t=>t.ok&&t.json()).then(t=>{t&&f(t.invoices||(Array.isArray(t)?t:[]))}),J(`${$}/purchase-invoice`).then(t=>t.ok&&t.json()).then(t=>{t&&L(t.invoices||(Array.isArray(t)?t:[]))}),J(`${$}/cashbook-report`).then(t=>t.ok&&t.json()).then(t=>{t&&v(t.currentBalance??0)}),J(`${$}/cheque-entries`).then(t=>t.ok&&t.json()).then(t=>{t&&B((t.chequeEntries||[]).filter(d=>d.status==="issued"))}),J(`${$}/weight-bridge`).then(t=>t.ok&&t.json()).then(t=>{t&&c(t.entries||(Array.isArray(t)?t:[]))})]),i(!1)))()},[]);const H=n.useMemo(()=>r.filter(t=>t.category==="Bank"||t.accountType==="Assets"&&t.LedgerRef?.toLowerCase().includes("bank")),[r]),K=n.useMemo(()=>H.reduce((t,d)=>t+(d.balance||0),0),[H]),ue=(k??0)+K,T=n.useMemo(()=>r.filter(t=>t.category?.toLowerCase().includes("invest")||t.accountName?.toLowerCase().includes("investor")),[r]),Ge=n.useMemo(()=>T.reduce((t,d)=>t+Math.abs(d.balance||0),0),[T]),R=n.useMemo(()=>r.filter(t=>!t.isProtected&&!t.isProductAccount&&(t.balance||0)>0&&(t.accountType==="Assets"||t.category?.toLowerCase().includes("loan given"))&&t.category!=="Bank"&&!t.LedgerRef?.toLowerCase().includes("bank")),[r]),xe=n.useMemo(()=>R.reduce((t,d)=>t+(d.balance||0),0),[R]),W=n.useMemo(()=>r.filter(t=>!t.isProtected&&(t.balance||0)!==0&&(t.accountType==="Liabilities"||t.category?.toLowerCase().includes("loan taken"))&&!t.category?.includes("Employee")),[r]),je=n.useMemo(()=>W.reduce((t,d)=>t+Math.abs(d.balance||0),0),[W]),ee=xe-je,Y=n.useMemo(()=>r.filter(t=>t.accountType==="Expense"),[r]),Ue=n.useMemo(()=>Y.reduce((t,d)=>t+Math.abs(d.balance||0),0),[Y]),ke=n.useMemo(()=>{const t=new Set;return h.forEach(d=>{const y=d.productName||d.product;y&&t.add(y),(d.items||[]).forEach(P=>{P.productName&&t.add(P.productName)})}),[...t].sort()},[h]),ve=n.useMemo(()=>{const t=new Set;return j.forEach(d=>{const y=d.productName||d.product;y&&t.add(y),(d.items||[]).forEach(P=>{P.productName&&t.add(P.productName)})}),[...t].sort()},[j]),te=(t,d)=>{if(d.length===0)return!0;const y=t.productName||t.product||"";return d.includes(y)?!0:(t.items||[]).some(P=>d.includes(P.productName))},oe=n.useMemo(()=>h.filter(t=>Me(t.date||t.createdAt,b.from,b.to)&&te(t,q)),[h,b.from,b.to,q]),se=n.useMemo(()=>j.filter(t=>Me(t.date||t.createdAt,m.from,m.to)&&te(t,F)),[j,m.from,m.to,F]),Ke=n.useMemo(()=>oe.reduce((t,d)=>t+(Number(d.totalAmount||d.amount)||0),0),[oe]),Ye=n.useMemo(()=>se.reduce((t,d)=>t+(Number(d.totalAmount||d.finalAmount||d.amount)||0),0),[se]),G=n.useMemo(()=>g.filter(t=>t.completed),[g]),Xe=n.useMemo(()=>G.reduce((t,d)=>t+(d.rate||0),0),[G]),ae=n.useMemo(()=>{const t={};return G.forEach(d=>{const y=d.vehicleType||"Unknown";t[y]||(t[y]={count:0,total:0}),t[y].count++,t[y].total+=d.rate||0}),Object.entries(t).sort((d,y)=>y[1].total-d[1].total)},[G]),Je=n.useMemo(()=>S.reduce((t,d)=>t+(d.amount||0),0),[S]),Qe=n.useMemo(()=>Array.from({length:7},(t,d)=>{const y=new Date;y.setDate(y.getDate()-(6-d));const P=y.toISOString().slice(0,10);return{label:y.toLocaleDateString("en-PK",{weekday:"short"}),value:h.filter(D=>(D.date||D.createdAt||"").slice(0,10)===P&&te(D,q)).reduce((D,X)=>D+(Number(X.totalAmount||X.amount)||0),0)}}),[h,q]),Ze=n.useMemo(()=>Array.from({length:7},(t,d)=>{const y=new Date;y.setDate(y.getDate()-(6-d));const P=y.toISOString().slice(0,10);return{label:y.toLocaleDateString("en-PK",{weekday:"short"}),value:j.filter(D=>(D.date||D.createdAt||"").slice(0,10)===P&&te(D,F)).reduce((D,X)=>D+(Number(X.totalAmount||X.finalAmount||X.amount)||0),0)}}),[j,F]),et=new Date().toLocaleDateString("en-PK",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),tt=(()=>{const t=new Date().getHours();return t<12?"Good morning":t<17?"Good afternoon":t<21?"Good evening":"Good night"})(),U=()=>e.jsx("div",{className:"db-sk",style:{width:"60%",height:20}});return e.jsxs(Lt,{children:[e.jsxs("style",{children:[St,Mt]}),e.jsxs("div",{className:"db",children:[e.jsx("div",{style:{marginBottom:20,display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:12},children:e.jsxs("div",{children:[e.jsxs("p",{style:{fontSize:10.5,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#9ca3af",margin:"0 0 3px"},children:[s||"Agro Plus"," · Operations"]}),e.jsxs("h1",{style:{fontSize:22,fontWeight:700,color:"#111827",letterSpacing:"-.4px",margin:0},children:[tt,", ",e.jsx("span",{style:{color:"#6b7280",fontWeight:400,fontStyle:"italic"},children:o.split(" ")[0]})]}),e.jsx("p",{style:{fontSize:12,color:"#9ca3af",margin:"3px 0 0"},children:et})]})}),e.jsx("p",{className:"db-sec",children:"Cash & Bank Position"}),e.jsxs("div",{className:"db-g3",children:[e.jsxs("div",{className:"db-card",style:{display:"flex",flexDirection:"column",justifyContent:"space-between"},children:[e.jsx("div",{className:"db-accent",style:{background:"#15803d"}}),e.jsxs("div",{children:[e.jsx("p",{className:"db-lbl",children:"Total Liquidity"}),a?e.jsx(U,{}):e.jsx("p",{className:`db-val ${ue>=0?"pos":"neg"}`,style:{fontSize:28},children:C(ue)}),e.jsx("p",{className:"db-sub",children:"Cash in hand + all bank accounts"})]}),!a&&e.jsx("div",{style:{marginTop:16,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[{label:"Cash in Hand",value:k??0,color:(k??0)>=0?"#15803d":"#b91c1c",accent:(k??0)>=0?"#f0fdf4":"#fef2f2",border:(k??0)>=0?"#bbf7d0":"#fecaca"},{label:"Total Bank",value:K,color:K>=0?"#1f2937":"#b91c1c",accent:K>=0?"#f9fafb":"#fef2f2",border:K>=0?"#e5e7eb":"#fecaca"}].map(({label:t,value:d,color:y,accent:P,border:re})=>e.jsxs("div",{style:{background:P,border:`1px solid ${re}`,borderRadius:7,padding:"10px 12px"},children:[e.jsx("p",{style:{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#9ca3af",margin:"0 0 4px"},children:t}),e.jsx("p",{style:{fontFamily:"'DM Mono',monospace",fontSize:15,fontWeight:700,color:y,margin:0,letterSpacing:"-.3px"},children:C(d)})]},t))})]}),e.jsxs("div",{className:"db-card",style:{gridColumn:"span 2"},children:[e.jsx("div",{className:"db-accent",style:{background:"#1f2937"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10},children:[e.jsx("p",{className:"db-lbl",style:{margin:0},children:"Bank Accounts"}),!a&&e.jsx("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:13,fontWeight:700,color:"#1f2937"},children:C(K)})]}),a?[0,1].map(t=>e.jsx("div",{className:"db-sk",style:{width:"100%",height:11,marginBottom:6}},t)):H.length===0?e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"No bank accounts found."}):e.jsxs(e.Fragment,{children:[(E?H:H.slice(0,4)).map(t=>{const d=At(t);return e.jsxs("div",{className:"db-bank-row",children:[e.jsx(Ct,{account:t}),e.jsxs("div",{className:"db-bank-info",children:[e.jsx("div",{className:"db-bank-full",children:d.line1}),e.jsx("div",{className:"db-bank-name",children:d.line2})]}),e.jsx("span",{className:`db-rb ${(t.balance||0)>=0?"pos":"neg"}`,children:C(t.balance||0)})]},t._id)}),H.length>4&&e.jsx("button",{className:"db-more",onClick:()=>x(t=>!t),children:E?"▲ Less":`▼ ${H.length-4} more`})]})]})]}),e.jsx("p",{className:"db-sec",children:"Sales & Purchases"}),e.jsxs("div",{className:"db-g2",children:[e.jsxs("div",{className:"db-card",children:[e.jsx("div",{className:"db-accent",style:{background:"#15803d"}}),e.jsx("p",{className:"db-lbl",children:"Net Sales"}),a?e.jsx(U,{}):e.jsx("p",{className:"db-val pos",children:C(Ke)}),e.jsxs("p",{className:"db-sub",children:[oe.length," invoice",oe.length!==1?"s":"",q.length>0?` · ${q.join(", ")}`:` · ${h.length} total`]}),e.jsx(Ce,{p:b}),!a&&ke.length>0&&e.jsx(Ee,{products:ke,selected:q,onChange:Fe}),!a&&e.jsx(Be,{data:Qe,color:"#15803d"})]}),e.jsxs("div",{className:"db-card",children:[e.jsx("div",{className:"db-accent",style:{background:"#1f2937"}}),e.jsx("p",{className:"db-lbl",children:"Net Purchases"}),a?e.jsx(U,{}):e.jsx("p",{className:"db-val dk",children:C(Ye)}),e.jsxs("p",{className:"db-sub",children:[se.length," invoice",se.length!==1?"s":"",F.length>0?` · ${F.join(", ")}`:` · ${j.length} total`]}),e.jsx(Ce,{p:m}),!a&&ve.length>0&&e.jsx(Ee,{products:ve,selected:F,onChange:He}),!a&&e.jsx(Be,{data:Ze,color:"#374151"})]})]}),e.jsx("p",{className:"db-sec",children:"Financial Position"}),e.jsxs("div",{className:"db-card",style:{padding:0,overflow:"hidden"},children:[e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderBottom:"1px solid #f3f4f6"},children:[{label:"Receivables",value:xe,color:"#15803d",accent:"#15803d"},{label:"Payables",value:je,color:"#b91c1c",accent:"#b91c1c"},{label:"Net Position",value:Math.abs(ee),color:ee>=0?"#15803d":"#b91c1c",accent:ee>=0?"#15803d":"#b91c1c",sub:ee>=0?"Receivables exceed payables":"Payables exceed receivables"}].map((t,d)=>e.jsxs("div",{style:{padding:"14px 16px",position:"relative",overflow:"hidden",borderRight:d<2?"1px solid #f3f4f6":"none"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:3,background:t.accent}}),e.jsx("p",{className:"db-lbl",children:t.label}),a?e.jsx(U,{}):e.jsx("p",{className:"db-val",style:{color:t.color},children:C(t.value)}),t.sub&&e.jsx("p",{className:"db-sub",style:{fontSize:10.5},children:t.sub})]},t.label))}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr"},children:[e.jsxs("div",{style:{padding:"12px 16px",borderRight:"1px solid #f3f4f6"},children:[e.jsxs("p",{style:{fontSize:10,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8},children:[R.length," Receivable Account",R.length!==1?"s":""]}),a?e.jsx("div",{className:"db-sk",style:{width:"80%",height:10}}):R.length===0?e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"No receivables."}):e.jsxs(e.Fragment,{children:[(l?R:R.slice(0,5)).map(t=>e.jsxs("div",{className:"db-row",children:[e.jsx("span",{className:"db-rn",children:t.accountName}),e.jsx("span",{className:"db-rb pos",children:C(t.balance||0)})]},t._id)),R.length>5&&e.jsx("button",{className:"db-more",onClick:()=>z(t=>!t),children:l?"▲ Less":`▼ +${R.length-5}`})]})]}),e.jsxs("div",{style:{padding:"12px 16px"},children:[e.jsxs("p",{style:{fontSize:10,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8},children:[W.length," Payable Account",W.length!==1?"s":""]}),a?e.jsx("div",{className:"db-sk",style:{width:"80%",height:10}}):W.length===0?e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"No payables."}):e.jsxs(e.Fragment,{children:[(_?W:W.slice(0,5)).map(t=>e.jsxs("div",{className:"db-row",children:[e.jsx("span",{className:"db-rn",children:t.accountName}),e.jsx("span",{className:"db-rb neg",children:C(Math.abs(t.balance||0))})]},t._id)),W.length>5&&e.jsx("button",{className:"db-more",onClick:()=>$e(t=>!t),children:_?"▲ Less":`▼ +${W.length-5}`})]})]})]})]}),e.jsx("p",{className:"db-sec",children:"Investment & Expenses"}),e.jsxs("div",{className:"db-g2",children:[e.jsxs("div",{className:"db-card",children:[e.jsx("div",{className:"db-accent",style:{background:"#1f2937"}}),e.jsx("p",{className:"db-lbl",children:"Investment"}),a?e.jsx(U,{}):e.jsx("p",{className:"db-val dk",children:C(Ge)}),e.jsxs("p",{className:"db-sub",children:[T.length," investor account",T.length!==1?"s":""]}),!a&&T.length>0&&e.jsxs(e.Fragment,{children:[(be?T:T.slice(0,4)).map(t=>e.jsxs("div",{className:"db-row",children:[e.jsx("span",{className:"db-rn",children:t.accountName}),e.jsx("span",{className:"db-rb pos",children:C(Math.abs(t.balance||0))})]},t._id)),T.length>4&&e.jsx("button",{className:"db-more",onClick:()=>Ve(t=>!t),children:be?"▲ Less":`▼ +${T.length-4}`})]})]}),e.jsxs("div",{className:"db-card",children:[e.jsx("div",{className:"db-accent",style:{background:"#7c3aed"}}),e.jsx("p",{className:"db-lbl",children:"Expenses"}),a?e.jsx(U,{}):e.jsx("p",{className:"db-val",style:{color:"#7c3aed"},children:C(Ue)}),e.jsxs("p",{className:"db-sub",children:[Y.length," expense account",Y.length!==1?"s":""]}),!a&&Y.length>0&&e.jsx(e.Fragment,{children:Y.slice(0,5).map(t=>e.jsxs("div",{className:"db-row",children:[e.jsx("span",{className:"db-rn",children:t.accountName.replace(" — Expense","")}),e.jsx("span",{className:"db-rb neg",children:C(Math.abs(t.balance||0))})]},t._id))})]})]}),e.jsx("p",{className:"db-sec",children:"Operations"}),e.jsxs("div",{className:"db-g2",children:[e.jsxs("div",{className:"db-card",children:[e.jsx("div",{className:"db-accent",style:{background:"#1f2937"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10},children:[e.jsxs("div",{children:[e.jsx("p",{className:"db-lbl",style:{margin:0},children:"Pending Cheques"}),a?e.jsx("div",{className:"db-sk",style:{width:"50%",height:18,marginTop:5}}):e.jsx("p",{className:"db-val dk",style:{marginTop:4},children:C(Je)})]}),!a&&e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:20,fontWeight:700,color:S.length>0?"#b91c1c":"#15803d"},children:S.length}),e.jsx("p",{style:{fontSize:9.5,color:"#9ca3af",margin:0},children:"issued"})]})]}),!a&&S.length===0&&e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"✓ No pending cheques"}),!a&&S.length>0&&e.jsxs(e.Fragment,{children:[(me?S:S.slice(0,4)).map(t=>e.jsxs("div",{className:"db-cq",children:[e.jsxs("span",{className:"db-cq-no",children:["#",t.chequeNo]}),e.jsx("span",{className:"db-cq-name",children:t.payeeAccountName}),e.jsx("span",{className:"db-cq-amt",children:C(t.amount)}),e.jsx("span",{className:"db-cq-badge",children:"ISSUED"})]},t._id)),S.length>4&&e.jsx("button",{className:"db-more",onClick:()=>qe(t=>!t),children:me?"▲ Less":`▼ +${S.length-4} more`})]})]}),e.jsxs("div",{className:"db-card",children:[e.jsx("div",{className:"db-accent",style:{background:"#15803d"}}),e.jsx("p",{className:"db-lbl",children:"Weight Bridge Earnings"}),a?e.jsx(U,{}):e.jsx("p",{className:"db-val pos",children:C(Xe)}),e.jsxs("p",{className:"db-sub",children:[G.length," completed invoice",G.length!==1?"s":""," · ",g.length-G.length," pending"]}),!a&&ae.length>0&&(()=>{const t=Math.max(...ae.map(([,d])=>d.total),1);return e.jsx("div",{style:{marginTop:12},children:ae.slice(0,5).map(([d,y])=>e.jsxs("div",{className:"db-bar-row",children:[e.jsx("span",{style:{fontSize:10,color:"#9ca3af",minWidth:80,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:d}),e.jsx("div",{className:"db-bar-track",children:e.jsx("div",{className:"db-bar-fill",style:{width:`${Math.round(y.total/t*100)}%`,background:"#15803d"}})}),e.jsxs("span",{style:{fontSize:10,color:"#9ca3af",minWidth:80,fontFamily:"'DM Mono',monospace"},children:[C(y.total)," ",e.jsx("span",{style:{color:"#d1d5db"},children:"·"})," ",y.count,"×"]})]},d))})})()]})]}),e.jsx("div",{style:{height:32}})]})]})}const _t=()=>e.jsxs("div",{className:"flex h-screen w-screen animate-pulse bg-gray-50",children:[e.jsxs("aside",{className:"w-64 bg-gray-200 p-4 flex flex-col gap-4",children:[e.jsx("div",{className:"h-10 bg-gray-300 rounded"}),e.jsx("div",{className:"h-10 bg-gray-300 rounded"}),e.jsx("div",{className:"h-10 bg-gray-300 rounded"}),e.jsx("div",{className:"h-10 bg-gray-300 rounded"})]}),e.jsxs("div",{className:"flex-1 flex flex-col",children:[e.jsxs("header",{className:"h-16 bg-gray-200 px-6 flex items-center gap-4",children:[e.jsx("div",{className:"h-6 w-32 bg-gray-300 rounded"}),e.jsx("div",{className:"h-6 w-16 bg-gray-300 rounded ml-auto"})]}),e.jsx("main",{className:"flex-1 p-6 flex flex-col gap-4",children:Array.from({length:8}).map((o,s)=>e.jsx("div",{className:"h-10 bg-gray-300 rounded w-full"},s))})]})]}),Pt=`
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
`,It=[{path:"/dashboard",label:"Home",icon:e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15.75a.75.75 0 01-.75-.75v-4.5h-6V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"})})},{path:"/cashbook",label:"Cashbook",icon:e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})},{path:"/add-invoice-purchase",label:"Purchase",icon:e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"})})},{path:"/add-invoice-sales",label:"Sales",icon:e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"})})},{path:"/weight-bridge",label:"W·Bridge",icon:e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"})})}],ne={right:28,bottom:72},Oe=240,he=56,ze=50,I=42,_e=90,Dt=28,V=14;function Tt(o,s){const a=window.innerWidth,i=window.innerHeight,r=Math.max(0,o-Oe-V-I/2),p=Math.max(0,a-o-V-I/2),h=Math.max(0,s-he-V-I/2),f=Math.max(0,i-s-V-I/2),j=p-r,L=h-f;let k=Math.atan2(L,j)*(180/Math.PI);return k=Math.round(k/5)*5,k}function Rt(o,s,a,i){const r=Math.max((a-1)*Dt+10,90),p=a>1?r/(a-1):0,h=i-r/2,f=window.innerWidth,j=window.innerHeight,L=Oe+V+I/2,k=f-V-I/2,v=he+V+I/2,S=j-V-I/2;return Array.from({length:a},(B,g)=>{const c=(h+p*g)*Math.PI/180;let b=o+Math.cos(c)*_e,m=s-Math.sin(c)*_e;return b=Math.max(L,Math.min(k,b)),m=Math.max(v,Math.min(S,m)),{left:b-I/2,top:m-I/2,tipAbove:m>he+70}})}function Pe(){return{cx:window.innerWidth-ne.right-ze/2,cy:window.innerHeight-ne.bottom-ze/2}}function Wt(){const o=fe(),s=(localStorage.getItem("role")||"Admin")==="Admin",a=n.useMemo(()=>{try{return JSON.parse(localStorage.getItem("allowedRoutes"))||[]}catch{return[]}},[]),i=It.filter(m=>s||a.includes(m.path)),[r,p]=n.useState(!1),[h,f]=n.useState(!1),[j,L]=n.useState([]),k=n.useCallback(()=>{const{cx:m,cy:E}=Pe(),x=Tt(m,E);L(Rt(m,E,i.length,x))},[i.length]);n.useEffect(()=>{r&&k()},[r,k]),n.useEffect(()=>{const m=()=>{r&&k()};return window.addEventListener("resize",m),()=>window.removeEventListener("resize",m)},[r,k]),n.useEffect(()=>{const m=E=>{const x=E.target.closest(".fl-wrap"),l=E.target.closest(".fl-sat");!x&&!l&&v()};return document.addEventListener("mousedown",m),()=>document.removeEventListener("mousedown",m)},[]);const v=()=>{f(!0),p(!1),setTimeout(()=>f(!1),500)},S=()=>{r?v():p(!0)},{cx:B,cy:g}=Pe(),c=B-I/2,b=g-I/2;return o.pathname==="/"?null:e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Pt}),e.jsx("div",{className:["fl-wrap",r?"fl-open":""].filter(Boolean).join(" "),style:{right:ne.right,bottom:ne.bottom},children:e.jsxs("div",{className:"fl-core",onClick:S,children:[e.jsx("span",{className:"fl-ico fl-ico-menu",children:e.jsxs("svg",{width:18,height:18,fill:"none",viewBox:"0 0 24 24",stroke:"rgba(255,255,255,.85)",strokeWidth:1.7,children:[e.jsx("rect",{x:3,y:5,width:7,height:7,rx:1.5,fill:"rgba(255,255,255,.1)",stroke:"rgba(255,255,255,.8)",strokeWidth:1.5}),e.jsx("rect",{x:14,y:5,width:7,height:7,rx:1.5,fill:"rgba(255,255,255,.1)",stroke:"rgba(255,255,255,.8)",strokeWidth:1.5}),e.jsx("rect",{x:3,y:14,width:7,height:7,rx:1.5,fill:"rgba(255,255,255,.1)",stroke:"rgba(255,255,255,.8)",strokeWidth:1.5}),e.jsx("rect",{x:14,y:14,width:7,height:7,rx:1.5,fill:"rgba(255,255,255,.1)",stroke:"rgba(255,255,255,.8)",strokeWidth:1.5})]})}),e.jsx("span",{className:"fl-ico fl-ico-close",children:e.jsx("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"rgba(255,255,255,.85)",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})})]})}),i.map((m,E)=>{const x=j[E],l=r&&x,z=["fl-sat",`fl-s${E+1}`,l?"fl-visible":"",h?"fl-closing":"",o.pathname===m.path||o.pathname.startsWith(m.path+"/")?"fl-active":""].filter(Boolean).join(" ");return e.jsxs(ge,{to:m.path,className:z,style:{left:l?x.left:c,top:l?x.top:b},onClick:()=>v(),draggable:!1,children:[e.jsx("span",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:m.icon}),e.jsx("span",{className:`fl-tip${x&&!x.tipAbove?" below":""}`,children:m.label})]},m.path)})]})}const Ot=n.lazy(()=>N(()=>import("./Masterportal-DpRmp67F.js"),__vite__mapDeps([0,1,2,3]))),$t=n.lazy(()=>N(()=>import("./CreateAccount-Df9Z3vEe.js"),__vite__mapDeps([4,1,2,3]))),Vt=n.lazy(()=>N(()=>import("./ViewAccounts-Dm96BXhg.js"),__vite__mapDeps([5,1,2,3]))),Ie=n.lazy(()=>N(()=>import("./GeneralJournalEntry-BMLCUSdT.js"),__vite__mapDeps([6,1,7,2,3]))),qt=n.lazy(()=>N(()=>import("./ViewGeneralEntries-hVW5_OuK.js"),__vite__mapDeps([8,1,7,2,3]))),Ft=n.lazy(()=>N(()=>import("./InoviceDashboard-BMw74juo.js"),__vite__mapDeps([9,1,2,3]))),Ht=n.lazy(()=>N(()=>import("./SalesInvoice-D_CAzaOk.js"),__vite__mapDeps([10,1,2,3]))),Gt=n.lazy(()=>N(()=>import("./PurchaseInvoiceForm-BUzV0-LP.js"),__vite__mapDeps([11,1,2,3]))),Ut=n.lazy(()=>N(()=>import("./ViewSalesInvoices-jgbHakHv.js"),__vite__mapDeps([12,1,2,3]))),Kt=n.lazy(()=>N(()=>import("./ViewPurchaseInvoices-BYKGS37e.js"),__vite__mapDeps([13,1,2,3]))),Yt=n.lazy(()=>N(()=>import("./AccountsPage-0roc7TnA.js"),__vite__mapDeps([14,1,4,2,3,5]))),Xt=n.lazy(()=>N(()=>import("./LedgerSearch-CRpI5I3J.js"),__vite__mapDeps([15,1,7,2,3]))),Jt=n.lazy(()=>N(()=>import("./LedgerByReference-CWxNcNWp.js"),__vite__mapDeps([16,1,2,3]))),Qt=n.lazy(()=>N(()=>import("./LedgerByAccount-B9b4PxeJ.js"),__vite__mapDeps([17,1,2,3]))),Zt=n.lazy(()=>N(()=>import("./ProductsList-BegjqY_m.js"),__vite__mapDeps([18,1,2,3]))),eo=n.lazy(()=>N(()=>import("./BalanceSheet-BVLxx15m.js"),__vite__mapDeps([19,1,3,2]))),to=n.lazy(()=>N(()=>import("./TrialBalance-BWeHAs4l.js"),__vite__mapDeps([20,1,3,2]))),oo=n.lazy(()=>N(()=>import("./IncomeStatement-DwHeHSh8.js"),__vite__mapDeps([21,1,3,2]))),so=n.lazy(()=>N(()=>import("./CreateEmployee-CNSxAuIp.js"),__vite__mapDeps([22,1,3,2]))),no=n.lazy(()=>N(()=>import("./ViewEmployees-DipnHreF.js"),__vite__mapDeps([23,1,2,3]))),ao=n.lazy(()=>N(()=>import("./WeightBridge-CiAuN25E.js"),__vite__mapDeps([24,1,2,3]))),ro=n.lazy(()=>N(()=>import("./WeightBridgeInvoice-BDSfR2OI.js"),__vite__mapDeps([25,1,2,3]))),io=n.lazy(()=>N(()=>import("./CashbookForm-B-oM8EFg.js"),__vite__mapDeps([26,1,2,3]))),lo=n.lazy(()=>N(()=>import("./CashbookReport-CT_eaPSg.js"),__vite__mapDeps([27,1,2,3]))),co=n.lazy(()=>N(()=>import("./CreateChequeBook-DrZeJB-c.js"),__vite__mapDeps([28,1,29,2,3]))),po=n.lazy(()=>N(()=>import("./CreateChequeEntry-D9B6sO17.js"),__vite__mapDeps([30,1,29,2,3]))),ho=n.lazy(()=>N(()=>import("./ViewChequeBooks-qxm-h7s6.js"),__vite__mapDeps([31,1,29,2,3]))),fo=n.lazy(()=>N(()=>import("./Adminprofile-DM-PNORR.js"),__vite__mapDeps([32,1,2,3]))),go=n.lazy(()=>N(()=>import("./Stockmanagement-BYg4C0iU.js"),__vite__mapDeps([33,1,2,3])));function bo(){const o=localStorage.getItem("token");return window.history.length>1?(window.history.back(),null):e.jsx(le,{to:o?"/dashboard":"/",replace:!0})}function mo(){return e.jsx(it,{children:e.jsxs(ot,{children:[e.jsx(Wt,{}),e.jsx(n.Suspense,{fallback:e.jsx(_t,{}),children:e.jsxs(st,{children:[e.jsx(u,{path:"/",element:e.jsx(ht,{})}),e.jsx(u,{path:"/master",element:e.jsx(Ot,{})}),e.jsx(u,{path:"/dashboard",element:e.jsx(w,{children:e.jsx(zt,{})})}),e.jsx(u,{path:"/create-account",element:e.jsx(w,{children:e.jsx($t,{})})}),e.jsx(u,{path:"/view-accounts",element:e.jsx(w,{children:e.jsx(Vt,{})})}),e.jsx(u,{path:"/ledger",element:e.jsx(w,{children:e.jsx(Xt,{})})}),e.jsx(u,{path:"/ledger/account/:accountId",element:e.jsx(w,{children:e.jsx(Qt,{})})}),e.jsx(u,{path:"/ledger/ref/:ref",element:e.jsx(w,{children:e.jsx(Jt,{})})}),e.jsx(u,{path:"/general-entries",element:e.jsx(w,{children:e.jsx(Ie,{})})}),e.jsx(u,{path:"/general-journal-entry",element:e.jsx(w,{children:e.jsx(Ie,{})})}),e.jsx(u,{path:"/view-general-entries",element:e.jsx(w,{children:e.jsx(qt,{})})}),e.jsx(u,{path:"/add-invoice",element:e.jsx(w,{children:e.jsx(Ft,{})})}),e.jsx(u,{path:"/add-invoice-sales",element:e.jsx(w,{children:e.jsx(Ht,{})})}),e.jsx(u,{path:"/view-sales-invoices",element:e.jsx(w,{children:e.jsx(Ut,{})})}),e.jsx(u,{path:"/add-invoice-purchase",element:e.jsx(w,{children:e.jsx(Gt,{})})}),e.jsx(u,{path:"/view-purchase-invoices",element:e.jsx(w,{children:e.jsx(Kt,{})})}),e.jsx(u,{path:"/accounts/*",element:e.jsx(w,{children:e.jsx(Yt,{})})}),e.jsx(u,{path:"/products",element:e.jsx(w,{children:e.jsx(Zt,{})})}),e.jsx(u,{path:"/balancesheet",element:e.jsx(w,{children:e.jsx(eo,{})})}),e.jsx(u,{path:"/trialbalance",element:e.jsx(w,{children:e.jsx(to,{})})}),e.jsx(u,{path:"/incomestatement",element:e.jsx(w,{children:e.jsx(oo,{})})}),e.jsx(u,{path:"/employees/new",element:e.jsx(w,{children:e.jsx(so,{})})}),e.jsx(u,{path:"/employees",element:e.jsx(w,{children:e.jsx(no,{})})}),e.jsx(u,{path:"/weight-bridge",element:e.jsx(w,{children:e.jsx(ao,{})})}),e.jsx(u,{path:"/weight-bridge/invoices",element:e.jsx(w,{children:e.jsx(ro,{})})}),e.jsx(u,{path:"/cashbook",element:e.jsx(w,{children:e.jsx(io,{})})}),e.jsx(u,{path:"/cashbook-report",element:e.jsx(w,{children:e.jsx(lo,{})})}),e.jsx(u,{path:"/cheque-book/create",element:e.jsx(w,{children:e.jsx(co,{})})}),e.jsx(u,{path:"/cheque-book/entry",element:e.jsx(w,{children:e.jsx(po,{})})}),e.jsx(u,{path:"/cheque-book/view",element:e.jsx(w,{children:e.jsx(ho,{})})}),e.jsx(u,{path:"/stock",element:e.jsx(w,{children:e.jsx(go,{})})}),e.jsx(u,{path:"/profile",element:e.jsx(w,{children:e.jsx(fo,{})})}),e.jsx(u,{path:"*",element:e.jsx(bo,{})})]})})]})})}nt.createRoot(document.getElementById("root")).render(e.jsx(n.StrictMode,{children:e.jsx(mo,{})}));export{$ as A,lt as N,Lt as S,J as a};
