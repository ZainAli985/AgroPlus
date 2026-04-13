const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Masterportal-DkieHd9m.js","assets/vendor-react-CVRJsYjy.js","assets/vendor-react-dom-BIx1r6lP.js","assets/vendor-D8Rt7Tv7.js","assets/CreateAccount-DuSTBDaG.js","assets/ViewAccounts-DPpLkeaz.js","assets/GeneralJournalEntry-BqcvsbHi.js","assets/JournalTopNav-B4h2nWDO.js","assets/ViewGeneralEntries-BP5BbBrd.js","assets/InoviceDashboard-FrqcX477.js","assets/SalesInvoice-C6mjJtcy.js","assets/PurchaseInvoiceForm-BK2osY0E.js","assets/PurchaseQuotation-atfVLVa_.js","assets/ViewSalesInvoices-CjPz_YQv.js","assets/ViewPurchaseInvoices-BeDDsguH.js","assets/AccountsPage-CsPsI97_.js","assets/LedgerSearch-D62B-gYv.js","assets/LedgerByReference-3RppwibZ.js","assets/LedgerByAccount-BeoisYWm.js","assets/ProductsList-CvAGVs_f.js","assets/BalanceSheet-CRY1ko88.js","assets/TrialBalance-CPx1zNjE.js","assets/IncomeStatement-DZbrGIJd.js","assets/CreateEmployee-1mmt9R74.js","assets/ViewEmployees-BRpsbEa7.js","assets/WeightBridge-wwhYDOpw.js","assets/WeightBridgeInvoice-DbTWgwqm.js","assets/CashbookForm-R08PtZxf.js","assets/CashbookReport-Cmfx2Atc.js","assets/CreateChequeBook-C8s3vosH.js","assets/ChequeTopNav-BSXoatL8.js","assets/CreateChequeEntry-DeqDEWLd.js","assets/ViewChequeBooks-DtzHbTco.js","assets/Adminprofile-C83eDBjq.js","assets/Stockmanagement-g1CaFMn-.js"])))=>i.map(i=>d[i]);
import{j as e,a as r,u as ce,N as ge,b as We,R as se,L as be,B as ot,d as st,e as m}from"./vendor-react-CVRJsYjy.js";import{c as nt}from"./vendor-react-dom-BIx1r6lP.js";import{_ as y}from"./vendor-D8Rt7Tv7.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const h of c.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&a(h)}).observe(document,{childList:!0,subtree:!0});function n(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(i){if(i.ep)return;i.ep=!0;const c=n(i);fetch(i.href,c)}})();const rt=({show:o=!0,message:s})=>o?e.jsxs("div",{className:"fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm","aria-live":"polite","aria-busy":"true",role:"status",children:[e.jsx("div",{className:"loader-pulse flex items-center justify-center",children:e.jsx("img",{src:"/logo.png",alt:"",className:"loader-spin h-20 w-20 object-contain sm:h-24 sm:w-24",width:96,height:96})}),s&&e.jsx("p",{className:"mt-4 text-sm font-medium text-gray-600",children:s}),e.jsx("span",{className:"sr-only",children:"Loading…"})]}):null,at=r.createContext(null);function it({children:o}){const[s,n]=r.useState(!1),[a,i]=r.useState(""),c=r.useCallback((h,f="")=>{n(!!h),i(f||"")},[]);return e.jsxs(at.Provider,{value:{loading:s,setLoading:c,message:a},children:[o,e.jsx(rt,{show:s,message:a})]})}function x({children:o}){const s=localStorage.getItem("token"),n=ce();if(!s)return e.jsx(ge,{to:"/",replace:!0});let a=[];try{a=JSON.parse(localStorage.getItem("allowedRoutes"))||[]}catch{a=[]}if(!a.length||a.includes("*"))return o;const i=n.pathname;return a.some(h=>{if(h===i||h.endsWith("/*")&&i.startsWith(h.replace("/*","")))return!0;const f=h.split("/"),j=i.split("/");return f.length!==j.length?!1:f.every((N,S)=>N.startsWith(":")||N===j[S])})?o:e.jsx(ge,{to:"/dashboard",replace:!0})}const q="/api";if(typeof document<"u"&&!document.getElementById("ntf-css")){const o=document.createElement("style");o.id="ntf-css",o.textContent=`
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
  `,document.head.appendChild(o)}const Ne={success:{label:"Success",accent:"#15803d",barBg:"#bbf7d0",iconBg:"#f0fdf4",iconBorder:"#bbf7d0",iconColor:"#15803d",topBar:"#15803d",icon:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})},error:{label:"Error",accent:"#dc2626",barBg:"#fecaca",iconBg:"#fef2f2",iconBorder:"#fecaca",iconColor:"#dc2626",topBar:"#dc2626",icon:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})},warning:{label:"Warning",accent:"#d97706",barBg:"#fde68a",iconBg:"#fffbeb",iconBorder:"#fde68a",iconColor:"#d97706",topBar:"#d97706",icon:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"})})},info:{label:"Info",accent:"#374151",barBg:"#e5e7eb",iconBg:"#f9fafb",iconBorder:"#e5e7eb",iconColor:"#374151",topBar:"#6b7280",icon:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}},Se=3800;function lt({message:o,type:s="info",onClose:n}){const[a,i]=r.useState("idle"),[c,h]=r.useState({message:"",type:"info"}),[f,j]=r.useState(0),N=r.useRef(null),S=()=>{clearTimeout(N.current),i("out"),setTimeout(()=>{i("idle"),n?.()},240)};if(r.useEffect(()=>{if(!o)return;clearTimeout(N.current);const v=()=>{h({message:o,type:s}),j(P=>P+1),i("in"),N.current=setTimeout(S,Se)};return a==="in"?(i("out"),setTimeout(v,240)):v(),()=>clearTimeout(N.current)},[o]),a==="idle")return null;const k=Ne[c.type]||Ne.info;return e.jsx("div",{className:"ntf-host",children:e.jsxs("div",{role:"alert","aria-live":"polite",className:`ntf-card ${a==="out"?"ntf-out":"ntf-in"}`,children:[e.jsx("div",{style:{height:3,background:k.topBar,borderRadius:"9px 9px 0 0"}}),e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:11,padding:"12px 13px 14px"},children:[e.jsx("div",{style:{width:32,height:32,borderRadius:7,flexShrink:0,background:k.iconBg,border:`1px solid ${k.iconBorder}`,display:"flex",alignItems:"center",justifyContent:"center",color:k.iconColor},children:k.icon}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontFamily:"'DM Mono', monospace",fontSize:9.5,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:k.accent,marginBottom:4},children:k.label}),e.jsx("div",{style:{fontFamily:"'DM Sans', sans-serif",fontSize:13,fontWeight:500,lineHeight:1.5,color:"#111827",wordBreak:"break-word"},children:c.message})]}),e.jsx("button",{className:"ntf-close",onClick:S,title:"Dismiss",children:e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})})]}),e.jsx("div",{style:{height:2,background:k.barBg,position:"relative",overflow:"hidden"},children:e.jsx("div",{style:{position:"absolute",inset:0,transformOrigin:"left",background:k.accent,animation:`ntf-bar ${Se}ms linear both`}},`p-${f}`)})]},f)})}const ct="@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",dt=`
  .lg-root *, .lg-root *::before, .lg-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lg-root {
    min-height: 100vh;
    display: flex;
    font-family: 'DM Sans', sans-serif;
    background: #0b1120;
  }

  /* ══ LEFT ══ */
  .lg-left {
    flex: 1;
    background: #0b1120;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    min-width: 0;
  }

  .lg-left::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #065f46, #10b981, #065f46);
    background-size: 200% 100%;
    animation: lg-shimmer 4s linear infinite;
    z-index: 2;
  }
  @keyframes lg-shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .lg-left::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(16,185,129,.065) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
    z-index: 0;
  }

  .lg-glow {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 520px; height: 520px;
    background: radial-gradient(circle at center, rgba(6,95,70,.22) 0%, transparent 68%);
    pointer-events: none;
    z-index: 0;
  }

  .lg-left-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 44px 52px 40px;
    min-height: 100vh;
  }

  /* Company badge */
  .lg-company-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 40px;
    padding: 6px 14px 6px 6px;
    align-self: flex-start;
    animation: lg-fade-down .6s ease both;
  }
  .lg-company-logo-wrap {
    width: 28px; height: 28px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.12);
    background: #065f46;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .lg-company-logo-wrap img { width: 100%; height: 100%;  display: block; }
  .lg-company-logo-fb {
    font-family: 'DM Sans', sans-serif;
    font-size: 8px; font-weight: 800; color: #fff; letter-spacing: .04em;
  }
  .lg-company-name {
    font-size: 10px; font-weight: 700;
    letter-spacing: .16em; text-transform: uppercase;
    color: rgba(255,255,255,.42);
  }

  /* Hero */
  .lg-hero {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 32px 0 24px;
  }

  /* Product logo */
  .lg-product-logo-ring {
    position: relative;
    width: 140px; height: 140px;
    margin-bottom: 30px;
    animation: lg-fade-up .7s .1s ease both;
  }
  .lg-product-logo-ring::before {
    content: '';
    position: absolute;
    inset: -9px;
    border-radius: 38px;
    border: 1px solid rgba(16,185,129,.22);
    animation: lg-pulse-ring 3s ease-in-out infinite;
  }
  .lg-product-logo-ring::after {
    content: '';
    position: absolute;
    inset: -20px;
    border-radius: 46px;
    border: 1px solid rgba(16,185,129,.07);
    animation: lg-pulse-ring 3s .6s ease-in-out infinite;
  }
  @keyframes lg-pulse-ring {
    0%, 100% { transform: scale(1);    opacity: 1; }
    50%       { transform: scale(1.05); opacity: .45; }
  }
  .lg-product-logo-frame {
    width: 140px; height: 140px;
    border-radius: 30px;
    overflow: hidden;
    border: 1.5px solid rgba(255,255,255,.1);
    box-shadow: 0 0 56px rgba(6,95,70,.42), 0 24px 48px rgba(0,0,0,.55);
    // background: #111827;
    display: flex; align-items: center; justify-content: center;
  }
  .lg-product-logo-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .lg-product-logo-fb {
    font-family: 'Cormorant Garamond', serif;
    font-size: 52px; font-weight: 700; color: #10b981;
  }

  /* Product name */
  .lg-product-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 74px; font-weight: 700;
    color: #ffffff;
    line-height: .92;
    letter-spacing: -2.5px;
    margin-bottom: 8px;
    animation: lg-fade-up .7s .2s ease both;
  }
  .lg-product-name-green { color: #10b981; }
  .lg-product-plus {
    font-family: 'DM Mono', monospace;
    font-size: 36px; font-weight: 500; color: #065f46;
    vertical-align: super; line-height: 1;
    position: relative; top: -4px; margin-left: 2px;
  }

  /* Category pill */
  .lg-product-category {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(6,95,70,.18);
    border: 1px solid rgba(16,185,129,.25);
    border-radius: 20px;
    padding: 5px 14px;
    font-size: 10px; font-weight: 700;
    letter-spacing: .18em; text-transform: uppercase;
    color: #6ee7b7;
    margin-top: 10px;
    margin-bottom: 22px;
    animation: lg-fade-up .7s .3s ease both;
  }
  .lg-category-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #10b981;
    animation: lg-blink 2s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes lg-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: .25; }
  }

  /* Tagline */
  .lg-tagline-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 21px; font-style: italic; font-weight: 400;
    color: rgba(255,255,255,.32);
    letter-spacing: .01em;
    margin-bottom: 34px;
    animation: lg-fade-up .7s .35s ease both;
  }

  /* Feature pills */
  .lg-features {
    display: flex; flex-wrap: wrap; gap: 7px;
    justify-content: center; max-width: 400px;
    animation: lg-fade-up .7s .42s ease both;
  }
  .lg-feat-pill {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.07);
    border-radius: 20px; padding: 5px 11px;
    font-size: 11px; font-weight: 500; color: rgba(255,255,255,.32);
    white-space: nowrap;
  }
  .lg-feat-dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: #065f46; flex-shrink: 0;
  }

  /* Bottom stamp */
  .lg-bottom-stamp {
    display: flex; align-items: center; justify-content: space-between;
    animation: lg-fade-up .7s .5s ease both;
  }
  .lg-stamp-left { display: flex; align-items: center; gap: 8px; }
  .lg-stamp-bar  { width: 18px; height: 2px; background: rgba(16,185,129,.35); border-radius: 2px; }
  .lg-stamp-text {
    font-size: 8.5px; font-weight: 700;
    letter-spacing: .18em; text-transform: uppercase;
    color: rgba(255,255,255,.16);
  }
  .lg-stamp-year {
    font-family: 'DM Mono', monospace;
    font-size: 8.5px; color: rgba(255,255,255,.11); letter-spacing: .1em;
  }

  /* ══ RIGHT ══ */
  .lg-right {
    width: 460px;
    flex-shrink: 0;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 56px 52px;
    border-left: 1px solid rgba(255,255,255,.06);
    box-shadow: -12px 0 48px rgba(0,0,0,.35);
    position: relative;
  }
  .lg-right::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: #065f46;
  }

  .lg-form-wrap { width: 100%; }

  .lg-form-logo-row {
    display: flex; align-items: center; gap: 11px;
    margin-bottom: 26px;
  }
  .lg-form-logo-frame {
    width: 40px; height: 40px;
    border-radius: 10px; overflow: hidden;
    border: 1.5px solid #e5e7eb;
    // background: #111827;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .lg-form-logo-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .lg-form-logo-fb {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px; font-weight: 700; color: #10b981;
  }
  .lg-form-logo-text { display: flex; flex-direction: column; }
  .lg-form-logo-name {
    font-size: 15px; font-weight: 700; color: #111827;
    line-height: 1.2; letter-spacing: -.2px;
  }
  .lg-form-logo-by {
    font-size: 8.5px; font-weight: 700; letter-spacing: .14em;
    text-transform: uppercase; color: #9ca3af; margin-top: 1px;
  }

  .lg-rule { width: 100%; height: 1px; background: #f3f4f6; margin-bottom: 24px; }

  .lg-eyebrow {
    font-size: 10px; font-weight: 700; letter-spacing: .18em;
    text-transform: uppercase; color: #065f46;
    margin-bottom: 5px;
    display: flex; align-items: center; gap: 8px;
  }
  .lg-eyebrow::before {
    content: '';
    display: inline-block; width: 15px; height: 2px;
    background: #065f46; border-radius: 2px;
  }
  .lg-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 29px; font-weight: 700; font-style: italic;
    color: #111827; letter-spacing: -.4px; line-height: 1.1;
    margin-bottom: 5px;
  }
  .lg-sub {
    font-size: 12.5px; color: #9ca3af;
    margin-bottom: 26px; line-height: 1.5;
  }

  .lg-field { margin-bottom: 18px; }
  .lg-lbl {
    display: flex; align-items: center; gap: 7px;
    font-size: 10px; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: #9ca3af; margin-bottom: 7px;
  }
  .lg-lbl-bar { width: 10px; height: 2px; border-radius: 2px; background: #065f46; }

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

  .lg-eye {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    color: #d1d5db; display: flex; padding: 3px; transition: color .12s;
  }
  .lg-eye:hover { color: #065f46; }

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

  .lg-form-foot {
    margin-top: 26px; padding-top: 18px;
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

  @keyframes lg-fade-down {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes lg-fade-up {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 960px) {
    .lg-left  { display: none; }
    .lg-right { width: 100%; border-left: none; box-shadow: none; padding: 48px 36px; }
    .lg-right::before { border-radius: 0; }
  }
  @media (max-width: 480px) { .lg-right { padding: 36px 24px; } }
`;function Le(o){const s=o.replace(/\D/g,"").slice(0,13);return s.length<=5?s:s.length<=12?`${s.slice(0,5)}-${s.slice(5)}`:`${s.slice(0,5)}-${s.slice(5,12)}-${s.slice(12)}`}const pt=["Accounting & Ledger","Purchase & Sales","Weight Bridge","Cheque Management","Payroll & HR","Inventory"];function ht(){const[o,s]=r.useState(""),[n,a]=r.useState(""),[i,c]=r.useState(!1),[h,f]=r.useState(!1),[j,N]=r.useState(!1),[S,k]=r.useState(!1),[v,P]=r.useState(!1),[g,L]=r.useState({message:"",type:"info"}),I=We(),A=(C,p,T=3500)=>{L({message:C,type:p}),setTimeout(()=>L({message:"",type:"info"}),T)},l=o.replace(/\D/g,"").length,u=l===13,B=C=>s(Le(C.target.value.replace(/\D/g,""))),D=C=>{if(C.key==="Backspace"){const p=o.replace(/\D/g,"");p.length>0&&(C.preventDefault(),s(Le(p.slice(0,-1))))}},W=async C=>{C.preventDefault();const p=o.replace(/\D/g,"");if(p.length!==13){A("Please enter a valid 13-digit CNIC","warning");return}if(!n.trim()){A("Please enter your password","warning");return}f(!0);try{const T=await fetch(`${q}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({cnic:p,password:n})}),z=await T.json();T.ok?(localStorage.setItem("token",z.token),localStorage.setItem("role",z.role),localStorage.setItem("name",z.name),localStorage.setItem("millId",z.millId),localStorage.setItem("businessName",z.businessName),localStorage.setItem("logoUrl",z.logoUrl||""),localStorage.setItem("allowedRoutes",JSON.stringify(z.allowedRoutes)),A(z.message||"Welcome back!","success"),setTimeout(()=>I(z.portal==="master"?"/master":"/dashboard"),900)):(A(z.message||"Invalid credentials","error"),f(!1))}catch{A("Server error — please try again","warning"),f(!1)}};return e.jsxs(e.Fragment,{children:[e.jsxs("style",{children:[ct,dt]}),e.jsx(lt,{message:g.message,type:g.type,onClose:()=>L({message:"",type:"info"})}),e.jsxs("div",{className:"lg-root",children:[e.jsxs("div",{className:"lg-left",children:[e.jsx("div",{className:"lg-glow"}),e.jsxs("div",{className:"lg-left-inner",children:[e.jsxs("div",{className:"lg-hero",children:[e.jsx("div",{className:"lg-product-logo-ring",children:e.jsx("div",{className:"lg-product-logo-frame",children:j?e.jsx("span",{className:"lg-product-logo-fb",children:"A+"}):e.jsx("img",{src:"/logo-cropped.png",alt:"Agro Plus",onError:()=>N(!0)})})}),e.jsxs("h1",{className:"lg-product-name",children:["Agro",e.jsx("span",{className:"lg-product-name-green",children:" Plus"}),e.jsx("span",{className:"lg-product-plus",children:"+"})]}),e.jsxs("div",{className:"lg-product-category",children:[e.jsx("span",{className:"lg-category-dot"}),"Rice Mill Management Platform"]}),e.jsx("p",{className:"lg-tagline-text",children:"Operations, Simplified."}),e.jsx("div",{className:"lg-features",children:pt.map(C=>e.jsxs("span",{className:"lg-feat-pill",children:[e.jsx("span",{className:"lg-feat-dot"}),C]},C))})]}),e.jsxs("div",{className:"lg-bottom-stamp",children:[e.jsxs("div",{className:"lg-stamp-left",children:[e.jsx("div",{className:"lg-stamp-bar"}),e.jsx("span",{className:"lg-stamp-text",children:"Powered by ORCA"})]}),e.jsxs("span",{className:"lg-stamp-year",children:["© ",new Date().getFullYear()]})]})]})]}),e.jsxs("div",{className:"lg-right",children:[e.jsxs("div",{style:{position:"absolute",top:22,right:26,display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:"50%",overflow:"hidden",border:"1.5px solid #e5e7eb",background:"#f3f4f6",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:S?e.jsx("span",{style:{fontSize:10,fontWeight:800,color:"#065f46",fontFamily:"'DM Sans',sans-serif"},children:"OT"}):e.jsx("img",{src:"/c-logo.png",alt:"ORCA TECH",onError:()=>k(!0),style:{width:"100%",height:"100%",display:"block"}})}),e.jsxs("div",{style:{lineHeight:1.3},children:[e.jsx("div",{style:{fontSize:10,fontWeight:800,letterSpacing:".16em",textTransform:"uppercase",color:"#374151"},children:"ORCA TECH."}),e.jsx("div",{style:{fontSize:9,fontWeight:700,letterSpacing:".13em",textTransform:"uppercase",color:"#9ca3af"},children:"AND VENTURES"})]})]}),e.jsxs("div",{className:"lg-form-wrap",children:[e.jsx("p",{className:"lg-eyebrow",children:"Secure Access"}),e.jsx("h2",{className:"lg-heading",children:"Welcome back"}),e.jsx("p",{className:"lg-sub",children:"Sign in with your CNIC and password"}),e.jsxs("form",{onSubmit:W,children:[e.jsxs("div",{className:"lg-field",children:[e.jsxs("label",{className:"lg-lbl",children:[e.jsx("span",{className:"lg-lbl-bar"}),"CNIC Number"]}),e.jsxs("div",{className:"lg-inp-wrap",children:[e.jsx("span",{className:"lg-inp-icon",children:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0"})})}),e.jsx("input",{className:"lg-inp lg-cnic-inp",type:"text",inputMode:"numeric",placeholder:"xxxxx-xxxxxxx-x",value:o,onChange:B,onKeyDown:D,maxLength:15,autoFocus:!0,autoComplete:"off"})]}),e.jsxs("div",{className:"lg-track",children:[Array.from({length:13},(C,p)=>e.jsx("div",{className:`lg-seg${p<l?u?" complete":" filled":""}`},p)),e.jsxs("span",{className:"lg-count",style:u?{color:"#059669"}:{},children:[l,"/13"]})]})]}),e.jsxs("div",{className:"lg-field",children:[e.jsxs("label",{className:"lg-lbl",children:[e.jsx("span",{className:"lg-lbl-bar"}),"Password"]}),e.jsxs("div",{className:"lg-inp-wrap",children:[e.jsx("span",{className:"lg-inp-icon",children:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"})})}),e.jsx("input",{className:"lg-inp",type:i?"text":"password",placeholder:"Enter your password",value:n,onChange:C=>a(C.target.value),autoComplete:"current-password",style:{paddingRight:42}}),e.jsx("button",{type:"button",className:"lg-eye",onClick:()=>c(C=>!C),tabIndex:-1,children:i?e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"})}):e.jsxs("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"})]})})]})]}),e.jsx("button",{type:"submit",className:"lg-btn",disabled:h,children:h?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"lg-spin"})," Authenticating…"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"})}),"Sign In to Dashboard"]})})]}),e.jsxs("div",{className:"lg-form-foot",children:[e.jsx("span",{className:"lg-form-foot-brand",children:"ORCA TECH. & VENTURES"}),e.jsxs("span",{className:"lg-form-foot-copy",children:["© ",new Date().getFullYear()," Agro Plus"]})]})]})]})]})]})}const ft="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",gt=`
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
`,ut={"/dashboard":"Dashboard","/create-account":"Add Account","/view-accounts":"Chart of Accounts","/general-entries":"Journal Entries","/cashbook":"Cashbook Entry","/cashbook-report":"Daily Cashbook","/cheque-book/create":"Create Cheque Book","/cheque-book/entry":"Issue Cheque","/cheque-book/view":"Cheque Management","/add-invoice-purchase":"New Purchase","/view-purchase-invoices":"All Purchases","/purchase-quotation":"Purchase Quotations","/add-invoice-sales":"Create Invoice","/view-sales-invoices":"Sales History","/products":"Products","/stock":"Inventory","/weight-bridge":"Weight Bridge","/weight-bridge/invoices":"WB Invoices","/employees/new":"New Employee","/employees":"All Employees","/trialbalance":"Trial Balance","/balancesheet":"Balance Sheet","/incomestatement":"Income Statement","/profile":"My Profile","/ledger":"Ledger"},he=[{code:"en",native:"English",flag:"🇬🇧"},{code:"ur",native:"اردو",flag:"🇵🇰"},{code:"hi",native:"हिन्दी",flag:"🇮🇳"}],M={home:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15.75a.75.75 0 01-.75-.75v-4.5h-6V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"})}),accounts:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})}),cash:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),bank:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"})}),purchase:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"})}),sales:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"})}),products:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"})}),weight:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"})}),employees:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"})}),reports:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})}),chevron:e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})}),back:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10 19l-7-7m0 0l7-7m-7 7h18"})}),menu:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 6h16M4 12h16M4 18h16"})}),close:e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})}),install:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"})}),profile:e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})}),logout:e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"})})},Oe=o=>(o||"U").split(" ").map(s=>s[0]).join("").slice(0,2).toUpperCase(),mt=()=>{const o=new Date().getHours();return o<12?"Good morning":o<17?"Good afternoon":o<21?"Good evening":"Good night"};let fe=!1;function bt(){const o=window.location.hostname;["",o,"."+o,o.replace(/^www\./,".")].forEach(n=>{const a=n?`; domain=${n}`:"";document.cookie=`googtrans=; path=/${a}; expires=Thu, 01 Jan 1970 00:00:00 UTC`,document.cookie=`googtrans=; path=${a}; expires=Thu, 01 Jan 1970 00:00:00 UTC`})}function xt(o){const s=window.location.hostname;document.cookie=`googtrans=/en/${o}; path=/`,document.cookie=`googtrans=/en/${o}; path=/; domain=.${s}`}function Ce(){if(document.getElementById("gt-suppress-style"))return;const o=document.createElement("style");o.id="gt-suppress-style",o.textContent=[".goog-te-banner-frame{display:none!important}","iframe.goog-te-banner-frame{display:none!important}","iframe.skiptranslate{display:none!important}",".goog-te-menu-frame{display:none!important}","#goog-gt-tt{display:none!important}",".goog-tooltip{display:none!important}",".goog-text-highlight{background:none!important;box-shadow:none!important}","body{top:0!important}"].join(" "),document.head.appendChild(o)}function Me(){window.__slBodyWatcher||(window.__slBodyWatcher=setInterval(()=>{document.body?.style?.top&&document.body.style.top!=="0px"&&document.body.style.setProperty("top","0","important")},400))}function yt(){if(!fe&&(fe=!0,Ce(),Me(),window.googleTranslateElementInit=()=>{window.google?.translate?.TranslateElement&&(new window.google.translate.TranslateElement({pageLanguage:"en",includedLanguages:"en,ur,hi",autoDisplay:!1},"gt-element"),Ce(),Me())},!document.getElementById("gt-script"))){const o=document.createElement("script");o.id="gt-script",o.src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",o.async=!0,o.onerror=()=>{fe=!1},document.body.appendChild(o)}}function jt(o){bt(),localStorage.setItem("ap-lang",o),o!=="en"&&xt(o),setTimeout(()=>window.location.reload(),60)}function kt({businessName:o,size:s=20}){const n=localStorage.getItem("logoUrl")||"",[a,i]=r.useState(!1),c=(o||"A").slice(0,2).toUpperCase();return n&&!a?e.jsx("img",{src:n,alt:o,onError:()=>i(!0),style:{width:s,height:s,borderRadius:4,objectFit:"cover",border:"1px solid #e5e7eb",flexShrink:0}}):e.jsx("div",{style:{width:s,height:s,borderRadius:4,background:"#111827",display:"flex",alignItems:"center",justifyContent:"center",fontSize:Math.round(s*.38),fontWeight:800,color:"#4ade80",flexShrink:0},children:c})}function vt(){const[o,s]=r.useState(!1);return o?e.jsx("div",{className:"sl-brand-logo-fb",children:"A+"}):e.jsx("img",{src:"/logo.png",alt:"AgroPlus+",className:"sl-brand-logo",onError:()=>s(!0)})}function xe(){const[o,s]=r.useState(()=>localStorage.getItem("adminPic")||"");return r.useEffect(()=>{const n=localStorage.getItem("token");n&&fetch(`${q}/profile`,{headers:{Authorization:`Bearer ${n}`}}).then(a=>a.ok?a.json():null).then(a=>{const i=a?.profile||a,c=i?.profilePic||i?.avatarUrl||i?.adminProfilePic||"";c&&(s(c),localStorage.setItem("adminPic",c))}).catch(()=>{})},[]),o}function wt({name:o}){const s=xe(),[n,a]=r.useState(!1);return s&&!n?e.jsx("div",{className:"sl-user-avatar",children:e.jsx("img",{src:s,alt:o,onError:()=>a(!0),style:{width:"100%",height:"100%",objectFit:"cover"}})}):e.jsx("div",{className:"sl-user-avatar",children:Oe(o)})}function Nt({name:o,onClick:s}){const n=xe(),[a,i]=r.useState(!1);return n&&!a?e.jsx("button",{onClick:s,title:"View profile",style:{width:32,height:32,borderRadius:"50%",border:"2px solid #e5e7eb",background:"#1f2937",cursor:"pointer",flexShrink:0,overflow:"hidden",padding:0},children:e.jsx("img",{src:n,alt:o,onError:()=>i(!0),style:{width:"100%",height:"100%",objectFit:"cover"}})}):e.jsx("button",{onClick:s,title:o,style:{width:32,height:32,borderRadius:"50%",border:"2px solid #e5e7eb",background:"#111827",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"#4ade80",transition:".12s",flexShrink:0},children:Oe(o)})}function St(){return e.jsxs("div",{className:"sl-wordmark",children:[e.jsx("span",{className:"sl-wordmark-agro",children:"Agro"}),e.jsx("span",{className:"sl-wordmark-p",children:"P"}),e.jsx("span",{className:"sl-wordmark-lus",children:"lus"}),e.jsx("span",{className:"sl-wordmark-plus",children:"+"})]})}function Lt(){const[o,s]=r.useState(!1),[n,a]=r.useState(()=>localStorage.getItem("ap-lang")||"en"),i=r.useRef(null),c=he.find(f=>f.code===n)||he[0];r.useEffect(()=>{yt()},[]),r.useEffect(()=>{const f=j=>{i.current&&!i.current.contains(j.target)&&s(!1)};return document.addEventListener("mousedown",f),()=>document.removeEventListener("mousedown",f)},[]);const h=f=>{a(f),s(!1),jt(f)};return e.jsxs("div",{ref:i,className:"sl-lang-wrap",children:[o&&e.jsx("div",{className:"sl-lang-panel",children:he.map(f=>e.jsxs("div",{className:`sl-lang-item${n===f.code?" active":""}`,onClick:()=>h(f.code),children:[e.jsx("span",{style:{fontSize:17},children:f.flag}),e.jsx("span",{style:{flex:1,fontSize:13,fontWeight:n===f.code?700:500},children:f.native}),n===f.code&&e.jsx("svg",{width:10,height:10,fill:"none",viewBox:"0 0 24 24",stroke:"#4ade80",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})]},f.code))}),e.jsxs("button",{className:"sl-lang-btn",onClick:()=>s(f=>!f),children:[e.jsx("span",{className:"sl-menu-icon",style:{fontSize:14},children:c.flag}),e.jsx("span",{style:{flex:1},children:c.native}),e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"rgba(255,255,255,.25)",strokeWidth:2.5,style:{flexShrink:0,transition:".12s",transform:o?"rotate(180deg)":"none"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),e.jsx("div",{id:"gt-element"})]})}function V({icon:o,label:s,menuKey:n,activeMenu:a,setActiveMenu:i,children:c}){const h=a===n;return e.jsxs("div",{children:[e.jsxs("button",{className:`sl-menu-btn${h?" open":""}`,onClick:()=>i(h?"":n),children:[e.jsx("span",{className:"sl-menu-icon",children:o}),e.jsx("span",{className:"sl-menu-label",children:s}),e.jsx("span",{className:"sl-menu-chevron",children:M.chevron})]}),e.jsx("div",{className:`sl-sub${h?" open":""}`,children:e.jsx("div",{className:"sl-sub-inner",children:c})})]})}function w({to:o,label:s,isActive:n,hasAccess:a,soon:i}){return a?i?e.jsxs("span",{className:"sl-sub-link soon",children:[e.jsx("span",{className:"sl-sub-dot"}),s,e.jsx("span",{className:"sl-soon-badge",children:"soon"})]}):e.jsxs(be,{to:o,className:`sl-sub-link${n?" active":""}`,children:[e.jsx("span",{className:"sl-sub-dot"}),s]}):null}let H=null,$e=typeof window<"u"&&(window.matchMedia?.("(display-mode: standalone)").matches||window.navigator?.standalone===!0);typeof window<"u"&&(window.addEventListener("beforeinstallprompt",o=>{o.preventDefault(),H=o,window.dispatchEvent(new Event("pwa-install-ready"))}),window.addEventListener("appinstalled",()=>{H=null,$e=!0,window.dispatchEvent(new Event("pwa-installed"))}));function Ct(){const[o,s]=se.useState(()=>!!H),[n,a]=se.useState(()=>$e);if(se.useEffect(()=>{if(n)return;const c=()=>s(!0),h=()=>{s(!1),a(!0)};return window.addEventListener("pwa-install-ready",c),window.addEventListener("pwa-installed",h),H&&s(!0),()=>{window.removeEventListener("pwa-install-ready",c),window.removeEventListener("pwa-installed",h)}},[n]),n||!o)return null;const i=async()=>{if(!H)return;H.prompt();const{outcome:c}=await H.userChoice;c==="accepted"&&(H=null,s(!1),a(!0))};return e.jsxs("button",{className:"sl-install-btn",onClick:i,title:"Install Agro Plus as an app",children:[e.jsx("span",{className:"sl-menu-icon",style:{background:"rgba(74,222,128,.12)",color:"#4ade80"},children:M.install}),e.jsx("span",{style:{flex:1},children:"Install App"})]})}function Mt({src:o,name:s,onClose:n}){return r.useEffect(()=>{const a=i=>{i.key==="Escape"&&n()};return window.addEventListener("keydown",a),()=>window.removeEventListener("keydown",a)},[n]),e.jsx("div",{className:"sl-lightbox",onClick:n,children:e.jsxs("div",{className:"sl-lightbox-inner",onClick:a=>a.stopPropagation(),children:[e.jsx("img",{src:o,alt:s,style:{maxWidth:"min(380px, 88vw)",maxHeight:"88vh",borderRadius:16,objectFit:"cover",display:"block",boxShadow:"0 24px 80px rgba(0,0,0,.7)",border:"2.5px solid rgba(255,255,255,.15)"}}),e.jsx("div",{style:{position:"absolute",top:-10,right:-10},children:e.jsx("button",{onClick:n,style:{width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"},children:M.close})}),e.jsx("div",{style:{position:"absolute",bottom:-30,left:0,right:0,textAlign:"center"},children:e.jsx("span",{style:{fontSize:12,color:"rgba(255,255,255,.4)"},children:"Click anywhere or Esc to close"})})]})})}function At({children:o}){const[s,n]=r.useState(!0),[a,i]=r.useState(""),[c,h]=r.useState(!1),[f,j]=r.useState(!1),N=ce(),S=We(),k=r.useRef(null),v=xe(),P=localStorage.getItem("role")||"Admin",g=localStorage.getItem("name")||"User",L=localStorage.getItem("businessName")||"Agro Plus",I=P==="Admin",A=se.useMemo(()=>{try{return JSON.parse(localStorage.getItem("allowedRoutes"))||[]}catch{return[]}},[]),l=se.useCallback(p=>!A?.length||A.includes("*")?!0:A.some(T=>T===p||p.startsWith(T.replace("/*",""))),[A]),u=p=>N.pathname===p;r.useEffect(()=>{const p=N.pathname;p==="/dashboard"?i("dashboard"):p.includes("account")||p.includes("ledger")?i("accounts"):p.includes("cashbook")||p.includes("general-entries")?i("cash"):p.includes("cheque")||p.includes("bank")?i("bank"):p.includes("purchase")||p.includes("quotation")?i("purchase"):p.includes("sales")||p.includes("sales-invoices")?i("sales"):p.includes("product")||p.includes("stock")?i("products"):p.includes("weight-bridge")?i("weight"):p.includes("employee")?i("employees"):(p.includes("balance")||p.includes("income")||p.includes("trial"))&&i("reports")},[N.pathname]),r.useEffect(()=>{const p=T=>{k.current&&!k.current.contains(T.target)&&h(!1)};return document.addEventListener("mousedown",p),()=>document.removeEventListener("mousedown",p)},[]);const B=()=>{window.innerWidth<900&&n(!1)},D=()=>{["token","role","name","allowedRoutes","millId","businessName","logoUrl","adminPic"].forEach(p=>localStorage.removeItem(p)),S("/")},W=ut[N.pathname]||"",C=()=>h(p=>!p);return e.jsxs("div",{className:"sl-root",children:[e.jsxs("style",{children:[ft,gt]}),e.jsx("div",{className:`sl-overlay${s&&window.innerWidth<900?" visible":""}`,onClick:()=>n(!1)}),e.jsxs("aside",{className:`sl-sidebar${s?"":" closed"}`,children:[e.jsxs("div",{className:"sl-brand",children:[e.jsx(vt,{}),e.jsx(St,{}),e.jsx("button",{className:"sl-sidebar-close",onClick:()=>n(!1),children:M.close})]}),e.jsxs("nav",{className:"sl-nav",children:[l("/dashboard")&&e.jsxs(be,{to:"/dashboard",className:`sl-direct-link${u("/dashboard")?" active":""}`,onClick:B,children:[e.jsx("span",{className:"sl-direct-icon",children:M.home}),"Dashboard"]}),(l("/create-account")||l("/view-accounts"))&&e.jsxs(V,{icon:M.accounts,label:"Accounts",menuKey:"accounts",activeMenu:a,setActiveMenu:i,children:[e.jsx(w,{to:"/create-account",label:"Add Account",isActive:u("/create-account"),hasAccess:l("/create-account")}),e.jsx(w,{to:"/view-accounts",label:"Chart of Accounts",isActive:u("/view-accounts"),hasAccess:l("/view-accounts")})]}),(l("/general-entries")||l("/cashbook")||l("/cashbook-report"))&&e.jsxs(V,{icon:M.cash,label:"Cash Management",menuKey:"cash",activeMenu:a,setActiveMenu:i,children:[e.jsx(w,{to:"/general-entries",label:"Journal Entries",isActive:u("/general-entries"),hasAccess:l("/general-entries")}),e.jsx(w,{to:"/cashbook",label:"Cashbook Entry",isActive:u("/cashbook"),hasAccess:l("/cashbook")}),e.jsx(w,{to:"#",label:"Fund Transfer",isActive:!1,hasAccess:!0,soon:!0}),e.jsx(w,{to:"/cashbook-report",label:"Daily Cashbook",isActive:u("/cashbook-report"),hasAccess:l("/cashbook-report")})]}),e.jsxs(V,{icon:M.bank,label:"Bank Management",menuKey:"bank",activeMenu:a,setActiveMenu:i,children:[e.jsx(w,{to:"#",label:"Add Bank Account",isActive:!1,hasAccess:!0,soon:!0}),e.jsx(w,{to:"/cheque-book/create",label:"Create Cheque Book",isActive:u("/cheque-book/create"),hasAccess:!0}),e.jsx(w,{to:"/cheque-book/entry",label:"Issue Cheque",isActive:u("/cheque-book/entry"),hasAccess:!0}),e.jsx(w,{to:"/cheque-book/view",label:"Cheque Management",isActive:u("/cheque-book/view"),hasAccess:!0}),e.jsx(w,{to:"#",label:"Bank Reconciliation",isActive:!1,hasAccess:!0,soon:!0})]}),(l("/add-invoice-purchase")||l("/view-purchase-invoices")||l("/purchase-quotation"))&&e.jsxs(V,{icon:M.purchase,label:"Purchase",menuKey:"purchase",activeMenu:a,setActiveMenu:i,children:[e.jsx(w,{to:"/add-invoice-purchase",label:"New Purchase Order",isActive:u("/add-invoice-purchase"),hasAccess:l("/add-invoice-purchase")}),e.jsx(w,{to:"/view-purchase-invoices",label:"All Purchases",isActive:u("/view-purchase-invoices"),hasAccess:l("/view-purchase-invoices")}),e.jsx(w,{to:"/purchase-quotation",label:"Purchase Quotations",isActive:u("/purchase-quotation"),hasAccess:!0})]}),(l("/add-invoice-sales")||l("/view-sales-invoices"))&&e.jsxs(V,{icon:M.sales,label:"Sales",menuKey:"sales",activeMenu:a,setActiveMenu:i,children:[e.jsx(w,{to:"/add-invoice-sales",label:"Create Invoice",isActive:u("/add-invoice-sales"),hasAccess:l("/add-invoice-sales")}),e.jsx(w,{to:"/view-sales-invoices",label:"Sales History",isActive:u("/view-sales-invoices"),hasAccess:l("/view-sales-invoices")})]}),(l("/products")||l("/stock"))&&e.jsxs(V,{icon:M.products,label:"Products",menuKey:"products",activeMenu:a,setActiveMenu:i,children:[e.jsx(w,{to:"/products",label:"Products List",isActive:u("/products"),hasAccess:l("/products")}),e.jsx(w,{to:"/stock",label:"Inventory",isActive:u("/stock"),hasAccess:l("/stock")})]}),(l("/weight-bridge")||l("/weight-bridge/invoices"))&&e.jsxs(V,{icon:M.weight,label:"Weight Bridge",menuKey:"weight",activeMenu:a,setActiveMenu:i,children:[e.jsx(w,{to:"/weight-bridge",label:"WB Entry",isActive:u("/weight-bridge"),hasAccess:l("/weight-bridge")}),e.jsx(w,{to:"/weight-bridge/invoices",label:"WB Invoices",isActive:u("/weight-bridge/invoices"),hasAccess:l("/weight-bridge/invoices")})]}),(l("/employees")||l("/employees/new"))&&e.jsxs(V,{icon:M.employees,label:"Employees",menuKey:"employees",activeMenu:a,setActiveMenu:i,children:[e.jsx(w,{to:"/employees/new",label:"New Employee",isActive:u("/employees/new"),hasAccess:l("/employees/new")}),e.jsx(w,{to:"/employees",label:"All Employees",isActive:u("/employees"),hasAccess:l("/employees")})]}),(l("/trialbalance")||l("/balancesheet")||l("/incomestatement"))&&e.jsxs(V,{icon:M.reports,label:"Reports",menuKey:"reports",activeMenu:a,setActiveMenu:i,children:[e.jsx(w,{to:"/trialbalance",label:"Trial Balance",isActive:u("/trialbalance"),hasAccess:l("/trialbalance")}),e.jsx(w,{to:"/balancesheet",label:"Balance Sheet",isActive:u("/balancesheet"),hasAccess:l("/balancesheet")}),e.jsx(w,{to:"/incomestatement",label:"Income Statement",isActive:u("/incomestatement"),hasAccess:l("/incomestatement")})]})]}),e.jsxs("div",{className:"sl-sidebar-foot",children:[e.jsx(Ct,{}),e.jsx(Lt,{}),e.jsx("div",{style:{height:1,background:"rgba(255,255,255,.06)",margin:"6px 0"}}),e.jsxs("div",{className:"sl-user-chip",children:[e.jsx(wt,{name:g}),e.jsxs("div",{className:"sl-user-info",children:[e.jsx("div",{className:"sl-user-name",children:g}),e.jsx("div",{className:"sl-user-role",children:P})]}),I&&e.jsx("button",{className:"sl-profile-btn",title:"Profile",onClick:()=>{S("/profile"),B()},children:M.profile}),e.jsx("button",{className:"sl-user-logout",title:"Sign Out",onClick:D,children:M.logout})]})]})]}),e.jsxs("div",{className:`sl-main-wrap${s?" sidebar-open":""}`,children:[e.jsxs("header",{className:"sl-topbar",children:[e.jsxs("div",{className:"sl-topbar-left",children:[e.jsx("button",{className:"sl-hamburger",onClick:()=>n(p=>!p),children:M.menu}),N.pathname!=="/dashboard"&&e.jsx("button",{className:"sl-back-btn",onClick:()=>S(-1),children:M.back}),e.jsxs("div",{className:"sl-company-pill",children:[e.jsx(kt,{businessName:L,size:20}),e.jsx("span",{className:"sl-company-name",children:L})]}),W&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"sl-topbar-sep",children:"·"}),e.jsx("span",{className:"sl-topbar-title",children:W})]})]}),e.jsxs("div",{className:"sl-topbar-right",children:[e.jsxs("span",{className:"sl-welcome",children:[mt(),", ",e.jsx("strong",{children:g.split(" ")[0]})]}),e.jsxs("div",{ref:k,style:{position:"relative"},children:[e.jsx(Nt,{name:g,onClick:C}),c&&e.jsxs("div",{style:{position:"absolute",right:0,top:"calc(100% + 6px)",width:175,zIndex:200,background:"#fff",border:"1px solid #e5e7eb",borderRadius:9,boxShadow:"0 8px 24px rgba(0,0,0,.1)",overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"9px 13px 7px",borderBottom:"1px solid #f3f4f6"},children:[v&&e.jsx("img",{src:v,alt:g,style:{width:48,height:48,borderRadius:8,objectFit:"cover",marginBottom:7,border:"1px solid #e5e7eb",display:"block"}}),e.jsx("div",{style:{fontSize:12.5,fontWeight:700,color:"#111827"},children:g}),e.jsx("div",{style:{fontSize:11,color:"#6b7280"},children:P})]}),I&&e.jsxs("button",{onClick:()=>{S("/profile"),h(!1)},style:{width:"100%",padding:"8px 13px",background:"none",border:"none",textAlign:"left",fontSize:12.5,color:"#1f2937",cursor:"pointer",display:"flex",alignItems:"center",gap:7,fontWeight:500,fontFamily:"'DM Sans',sans-serif"},onMouseEnter:p=>p.currentTarget.style.background="#f9fafb",onMouseLeave:p=>p.currentTarget.style.background="none",children:[M.profile," My Profile"]}),e.jsxs("button",{onClick:D,style:{width:"100%",padding:"8px 13px",background:"none",border:"none",borderTop:"1px solid #f3f4f6",textAlign:"left",fontSize:12.5,color:"#dc2626",cursor:"pointer",display:"flex",alignItems:"center",gap:7,fontWeight:500,fontFamily:"'DM Sans',sans-serif"},onMouseEnter:p=>p.currentTarget.style.background="#fef2f2",onMouseLeave:p=>p.currentTarget.style.background="none",children:[M.logout," Sign Out"]})]})]})]})]}),e.jsx("main",{className:"sl-content",children:o})]}),f&&v&&e.jsx(Mt,{src:v,name:g,onClose:()=>j(!1)})]})}const te=async(o,s={})=>{const n=localStorage.getItem("token"),a=await fetch(o,{...s,headers:{Authorization:`Bearer ${n}`,...s.headers}});return a.status===401&&(localStorage.removeItem("token"),window.location.href="/"),a},Et="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",Bt=`
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
`,ue=[{id:1,abbr:"NBP",fullName:"National Bank of Pakistan",color:"#007940",bg:"#e6f4ec",keys:["national bank","nbp"]},{id:2,abbr:"BOP",fullName:"The Bank of Punjab",color:"#1a237e",bg:"#e8eaf6",keys:["bank of punjab","bop"]},{id:3,abbr:"BOK",fullName:"The Bank of Khyber",color:"#2e4057",bg:"#eaecf0",keys:["bank of khyber","bok"]},{id:4,abbr:"SBL",fullName:"Sindh Bank Limited",color:"#374151",bg:"#f3f4f6",keys:["sindh bank","sbl"]},{id:5,abbr:"FWBL",fullName:"First Women Bank Limited",color:"#7c3aed",bg:"#f5f3ff",keys:["first women","fwbl"]},{id:6,abbr:"HBL",fullName:"Habib Bank Limited",color:"#006633",bg:"#e6f4ed",keys:["habib bank","hbl"]},{id:7,abbr:"UBL",fullName:"United Bank Limited",color:"#003087",bg:"#e8eef8",keys:["united bank","ubl"]},{id:8,abbr:"MCB",fullName:"MCB Bank Limited",color:"#c8102e",bg:"#fce8ec",keys:["mcb bank","mcb"]},{id:9,abbr:"ABL",fullName:"Allied Bank Limited",color:"#b8860b",bg:"#fdf6e3",keys:["allied bank","abl"]},{id:10,abbr:"BAFL",fullName:"Bank Alfalah Limited",color:"#c8102e",bg:"#fce8ec",keys:["bank alfalah","alfalah","bafl"]},{id:11,abbr:"BAHL",fullName:"Bank Al Habib Limited",color:"#00703c",bg:"#e6f4ed",keys:["bank al habib","bahl"]},{id:12,abbr:"AKBL",fullName:"Askari Bank Limited",color:"#004225",bg:"#e6f0ea",keys:["askari","akbl"]},{id:13,abbr:"HMB",fullName:"Habib Metropolitan Bank Limited",color:"#1a3c6e",bg:"#eaf0f8",keys:["habib metropolitan","hmb","habibmetro"]},{id:14,abbr:"SNBL",fullName:"Soneri Bank Limited",color:"#8b0000",bg:"#fce8e8",keys:["soneri","snbl"]},{id:15,abbr:"JSBL",fullName:"JS Bank Limited",color:"#d4380d",bg:"#fff2ed",keys:["js bank","jsbl"]},{id:16,abbr:"SAMB",fullName:"Samba Bank Limited",color:"#d4001c",bg:"#fce8e8",keys:["samba","samb"]},{id:17,abbr:"SILK",fullName:"Silkbank Limited",color:"#7c3aed",bg:"#f5f3ff",keys:["silkbank","silk"]},{id:18,abbr:"SMBL",fullName:"Summit Bank Limited",color:"#374151",bg:"#f3f4f6",keys:["summit","smbl"]},{id:19,abbr:"MEBL",fullName:"Meezan Bank Limited",color:"#1a5276",bg:"#eaf0f8",keys:["meezan","mebl"]},{id:20,abbr:"FABL",fullName:"Faysal Bank Limited",color:"#7b3f00",bg:"#f5ece4",keys:["faysal","fabl"]},{id:21,abbr:"BIPL",fullName:"BankIslami Pakistan Limited",color:"#065f46",bg:"#f0fdf4",keys:["bankislami","bipl"]},{id:22,abbr:"DIBPL",fullName:"Dubai Islamic Bank Pakistan Limited",color:"#c8102e",bg:"#fce8ec",keys:["dubai islamic","dibpl","dib"]},{id:23,abbr:"ABPL",fullName:"Al Baraka Bank (Pakistan) Limited",color:"#2d6a4f",bg:"#e6f4ed",keys:["al baraka","abpl"]},{id:24,abbr:"MIBL",fullName:"MCB Islamic Bank Limited",color:"#c8102e",bg:"#fce8ec",keys:["mcb islamic","mibl"]},{id:25,abbr:"SCBPL",fullName:"Standard Chartered Bank (Pakistan) Limited",color:"#0e5c96",bg:"#e8f0f8",keys:["standard chartered","scbpl","scb"]},{id:26,abbr:"BML",fullName:"Bank Makramah Limited",color:"#374151",bg:"#f3f4f6",keys:["bank makramah","bml"]}],Ae=Object.fromEntries(ue.map(o=>[o.id,o]));function Fe(o){if(o?.bankLogoIndex&&Ae[o.bankLogoIndex])return Ae[o.bankLogoIndex];if(o?.bankName){const n=o.bankName.toLowerCase();for(const a of ue)if(a.fullName.toLowerCase()===n||a.keys.some(i=>n.includes(i)))return a}const s=(o?.accountName||"").toLowerCase();for(const n of ue)if(n.keys.some(a=>s.includes(a)))return n;return null}function zt(o){const s=Fe(o),n=o?.accountName||"",a=o?.remarkNote?` — ${o.remarkNote}`:"",i=`${n}${a}`;return s?{line1:s.fullName,line2:i,abbr:s.abbr,color:s.color,bg:s.bg,logoIndex:o?.bankLogoIndex||null}:{line1:n,line2:o?.remarkNote||"",abbr:(n.match(/[A-Z]/g)||[]).join("").slice(0,5)||"BNK",color:"#6b7280",bg:"#f3f4f6",logoIndex:null}}function _t({account:o}){const s=Fe(o),n=s?.abbr||"BNK",a=s?.color||"#6b7280",i=o?.bankLogoIndex,[c,h]=r.useState(!0);return i&&c?e.jsx("div",{className:"db-bank-badge",children:e.jsx("img",{src:`/${i}.png`,alt:n,onError:()=>h(!1)})}):e.jsx("div",{className:"db-bank-badge",style:{color:a,background:`${a}14`,borderColor:`${a}30`},children:n.slice(0,5)})}const E=o=>"Rs "+Number(o||0).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0}),oe=()=>new Date().toISOString().slice(0,10),Pt=()=>{const o=new Date;return o.setDate(o.getDate()-o.getDay()),o.toISOString().slice(0,10)},It=()=>new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().slice(0,10),Ee=(o,s,n)=>{if(!o)return!1;const a=(o||"").slice(0,10);return(!s||a>=s)&&(!n||a<=n)};function Be(o="today"){const[s,n]=r.useState(o),[a,i]=r.useState({from:oe(),to:oe()}),{from:c,to:h}=r.useMemo(()=>s==="today"?{from:oe(),to:oe()}:s==="week"?{from:Pt(),to:oe()}:s==="month"?{from:It(),to:oe()}:s==="custom"?{from:a.from,to:a.to}:{from:null,to:null},[s,a]);return{mode:s,setMode:n,from:c,to:h,custom:a,setCustom:i}}function ze({p:o}){const s=["today","week","month","all"],n={today:"Today",week:"Week",month:"Month",all:"All time"};return e.jsxs("div",{className:"db-filter",children:[s.map(a=>e.jsx("button",{className:`db-fpill${o.mode===a?" on":""}`,onClick:()=>o.setMode(a),children:n[a]},a)),e.jsx("button",{className:`db-fpill${o.mode==="custom"?" on":""}`,onClick:()=>o.setMode("custom"),children:"Custom"}),o.mode==="custom"&&e.jsxs(e.Fragment,{children:[e.jsx("input",{type:"date",className:"db-fpill-date",value:o.custom.from,onChange:a=>o.setCustom(i=>({...i,from:a.target.value}))}),e.jsx("input",{type:"date",className:"db-fpill-date",value:o.custom.to,onChange:a=>o.setCustom(i=>({...i,to:a.target.value}))})]})]})}function _e({data:o,color:s}){const n=Math.max(...o.map(a=>a.value),1);return e.jsx("div",{style:{marginTop:10},children:o.map((a,i)=>e.jsxs("div",{className:"db-bar-row",children:[e.jsx("span",{className:"db-bar-lbl",children:a.label}),e.jsx("div",{className:"db-bar-track",children:e.jsx("div",{className:"db-bar-fill",style:{width:`${Math.round(a.value/n*100)}%`,background:s||"#111827"}})}),e.jsx("span",{className:"db-bar-val",children:E(a.value)})]},i))})}function Pe({products:o,selected:s,onChange:n}){const[a,i]=r.useState(!1),[c,h]=r.useState(""),f=r.useRef(null),j=r.useRef(null),[N,S]=r.useState({top:0,left:0,width:0});r.useEffect(()=>{const g=L=>{!f.current?.contains(L.target)&&!j.current?.contains(L.target)&&i(!1)};return document.addEventListener("mousedown",g),()=>document.removeEventListener("mousedown",g)},[]),r.useEffect(()=>{if(!a)return;const g=()=>{const L=f.current?.getBoundingClientRect();L&&S({top:L.bottom+3,left:L.left,width:L.width})};return g(),window.addEventListener("scroll",g,!0),window.addEventListener("resize",g),()=>{window.removeEventListener("scroll",g,!0),window.removeEventListener("resize",g)}},[a]);const k=o.filter(g=>g.toLowerCase().includes(c.toLowerCase())),v=s.length===0?"All Products":s.length===1?s[0]:`${s.length} products`,P=g=>{s.includes(g)?n(s.filter(L=>L!==g)):n([...s,g])};return e.jsxs("div",{className:"db-prod-wrap",children:[e.jsxs("button",{ref:f,className:`db-prod-btn${a?" open":""}`,onClick:()=>i(g=>!g),children:[e.jsxs("span",{style:{color:s.length>0?"#15803d":"#9ca3af",fontWeight:s.length>0?600:400},children:[s.length>0&&"🔽 ",v]}),e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2.5,style:{flexShrink:0,transition:".12s",transform:a?"rotate(180deg)":"none"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),a&&e.jsxs("div",{ref:j,className:"db-prod-panel",style:{top:N.top,left:N.left,width:Math.max(N.width,200)},children:[e.jsx("input",{autoFocus:!0,className:"db-prod-search",placeholder:"Search product…",value:c,onChange:g=>h(g.target.value)}),e.jsxs("div",{style:{maxHeight:180,overflowY:"auto"},children:[e.jsxs("div",{className:`db-prod-item${s.length===0?" sel":""}`,onClick:()=>{n([]),i(!1)},children:[e.jsx("div",{className:`db-prod-check${s.length===0?" on":""}`,children:s.length===0&&e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"#fff",strokeWidth:3,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})}),"All Products"]}),k.map(g=>e.jsxs("div",{className:`db-prod-item${s.includes(g)?" sel":""}`,onClick:()=>P(g),children:[e.jsx("div",{className:`db-prod-check${s.includes(g)?" on":""}`,children:s.includes(g)&&e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"#fff",strokeWidth:3,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})}),g]},g)),k.length===0&&e.jsx("div",{style:{padding:"10px 12px",fontSize:12,color:"#9ca3af",textAlign:"center"},children:"No products"})]})]})]})}function Dt(){const o=localStorage.getItem("name")||"User",s=localStorage.getItem("businessName")||"",[n,a]=r.useState(!0),[i,c]=r.useState([]),[h,f]=r.useState([]),[j,N]=r.useState([]),[S,k]=r.useState(null),[v,P]=r.useState([]),[g,L]=r.useState([]),I=Be("today"),A=Be("today"),[l,u]=r.useState(!1),[B,D]=r.useState(!1),[W,C]=r.useState(!1),[p,T]=r.useState(!1),[z,Ve]=r.useState(!1),[G,qe]=r.useState([]),[K,He]=r.useState([]);r.useEffect(()=>{(async()=>(a(!0),await Promise.allSettled([te(`${q}/accounts`).then(t=>t.ok&&t.json()).then(t=>t&&c(Array.isArray(t)?t:[])),te(`${q}/sales-invoice`).then(t=>t.ok&&t.json()).then(t=>{t&&f(t.invoices||(Array.isArray(t)?t:[]))}),te(`${q}/purchase-invoice`).then(t=>t.ok&&t.json()).then(t=>{t&&N(t.invoices||(Array.isArray(t)?t:[]))}),te(`${q}/cashbook-report`).then(t=>t.ok&&t.json()).then(t=>{t&&k(t.currentBalance??0)}),te(`${q}/cheque-entries`).then(t=>t.ok&&t.json()).then(t=>{t&&P((t.chequeEntries||[]).filter(d=>d.status==="issued"))}),te(`${q}/weight-bridge`).then(t=>t.ok&&t.json()).then(t=>{t&&L(t.entries||(Array.isArray(t)?t:[]))})]),a(!1)))()},[]);const U=r.useMemo(()=>i.filter(t=>t.category==="Bank"||t.accountType==="Assets"&&t.LedgerRef?.toLowerCase().includes("bank")),[i]),Q=r.useMemo(()=>U.reduce((t,d)=>t+(d.balance||0),0),[U]),ye=(S??0)+Q,O=r.useMemo(()=>i.filter(t=>t.category?.toLowerCase().includes("invest")||t.accountName?.toLowerCase().includes("investor")),[i]),Ge=r.useMemo(()=>O.reduce((t,d)=>t+Math.abs(d.balance||0),0),[O]),$=r.useMemo(()=>i.filter(t=>t.category==="Loan Given"),[i]),je=r.useMemo(()=>$.reduce((t,d)=>t+Math.abs(d.balance||0),0),[$]),F=r.useMemo(()=>i.filter(t=>t.category==="Loan Taken"),[i]),ke=r.useMemo(()=>F.reduce((t,d)=>t+Math.abs(d.balance||0),0),[F]),ne=je-ke,Z=r.useMemo(()=>i.filter(t=>t.accountType==="Expense"),[i]),Ke=r.useMemo(()=>Z.reduce((t,d)=>t+Math.abs(d.balance||0),0),[Z]),ve=r.useMemo(()=>{const t=new Set;return h.forEach(d=>{const b=d.productName||d.product;b&&t.add(b),(d.items||[]).forEach(_=>{_.productName&&t.add(_.productName)})}),[...t].sort()},[h]),we=r.useMemo(()=>{const t=new Set;return j.forEach(d=>{const b=d.productName||d.product;b&&t.add(b),(d.items||[]).forEach(_=>{_.productName&&t.add(_.productName)})}),[...t].sort()},[j]),re=(t,d)=>{if(d.length===0)return!0;const b=t.productName||t.product||"";return d.includes(b)?!0:(t.items||[]).some(_=>d.includes(_.productName))},ae=r.useMemo(()=>h.filter(t=>Ee(t.date||t.createdAt,I.from,I.to)&&re(t,G)),[h,I.from,I.to,G]),ie=r.useMemo(()=>j.filter(t=>Ee(t.date||t.createdAt,A.from,A.to)&&re(t,K)),[j,A.from,A.to,K]),Ue=r.useMemo(()=>ae.reduce((t,d)=>t+(Number(d.totalAmount||d.amount)||0),0),[ae]),Ye=r.useMemo(()=>ie.reduce((t,d)=>t+(Number(d.totalAmount||d.finalAmount||d.amount)||0),0),[ie]),Y=r.useMemo(()=>g.filter(t=>t.completed),[g]),Je=r.useMemo(()=>Y.reduce((t,d)=>t+(d.rate||0),0),[Y]),de=r.useMemo(()=>{const t={};return Y.forEach(d=>{const b=d.vehicleType||"Unknown";t[b]||(t[b]={count:0,total:0}),t[b].count++,t[b].total+=d.rate||0}),Object.entries(t).sort((d,b)=>b[1].total-d[1].total)},[Y]),Xe=r.useMemo(()=>v.reduce((t,d)=>t+(d.amount||0),0),[v]),Qe=r.useMemo(()=>Array.from({length:7},(t,d)=>{const b=new Date;b.setDate(b.getDate()-(6-d));const _=b.toISOString().slice(0,10);return{label:b.toLocaleDateString("en-PK",{weekday:"short"}),value:h.filter(R=>(R.date||R.createdAt||"").slice(0,10)===_&&re(R,G)).reduce((R,ee)=>R+(Number(ee.totalAmount||ee.amount)||0),0)}}),[h,G]),Ze=r.useMemo(()=>Array.from({length:7},(t,d)=>{const b=new Date;b.setDate(b.getDate()-(6-d));const _=b.toISOString().slice(0,10);return{label:b.toLocaleDateString("en-PK",{weekday:"short"}),value:j.filter(R=>(R.date||R.createdAt||"").slice(0,10)===_&&re(R,K)).reduce((R,ee)=>R+(Number(ee.totalAmount||ee.finalAmount||ee.amount)||0),0)}}),[j,K]),et=new Date().toLocaleDateString("en-PK",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),tt=(()=>{const t=new Date().getHours();return t<12?"Good morning":t<17?"Good afternoon":t<21?"Good evening":"Good night"})(),J=()=>e.jsx("div",{className:"db-sk",style:{width:"60%",height:20}});return e.jsxs(At,{children:[e.jsxs("style",{children:[Et,Bt]}),e.jsxs("div",{className:"db",children:[e.jsx("div",{style:{marginBottom:20,display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:12},children:e.jsxs("div",{children:[e.jsxs("p",{style:{fontSize:10.5,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#9ca3af",margin:"0 0 3px"},children:[s||"Agro Plus"," · Operations"]}),e.jsxs("h1",{style:{fontSize:22,fontWeight:700,color:"#111827",letterSpacing:"-.4px",margin:0},children:[tt,", ",e.jsx("span",{style:{color:"#6b7280",fontWeight:400,fontStyle:"italic"},children:o.split(" ")[0]})]}),e.jsx("p",{style:{fontSize:12,color:"#9ca3af",margin:"3px 0 0"},children:et})]})}),e.jsx("p",{className:"db-sec",children:"Cash & Bank Position"}),e.jsxs("div",{className:"db-g3",children:[e.jsxs("div",{className:"db-card",style:{display:"flex",flexDirection:"column",justifyContent:"space-between"},children:[e.jsx("div",{className:"db-accent",style:{background:"#15803d"}}),e.jsxs("div",{children:[e.jsx("p",{className:"db-lbl",children:"Total Liquidity"}),n?e.jsx(J,{}):e.jsx("p",{className:`db-val ${ye>=0?"pos":"neg"}`,style:{fontSize:28},children:E(ye)}),e.jsx("p",{className:"db-sub",children:"Cash in hand + all bank accounts"})]}),!n&&e.jsx("div",{style:{marginTop:16,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[{label:"Cash in Hand",value:S??0,color:(S??0)>=0?"#15803d":"#b91c1c",accent:(S??0)>=0?"#f0fdf4":"#fef2f2",border:(S??0)>=0?"#bbf7d0":"#fecaca"},{label:"Total Bank",value:Q,color:Q>=0?"#1f2937":"#b91c1c",accent:Q>=0?"#f9fafb":"#fef2f2",border:Q>=0?"#e5e7eb":"#fecaca"}].map(({label:t,value:d,color:b,accent:_,border:pe})=>e.jsxs("div",{style:{background:_,border:`1px solid ${pe}`,borderRadius:7,padding:"10px 12px"},children:[e.jsx("p",{style:{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#9ca3af",margin:"0 0 4px"},children:t}),e.jsx("p",{style:{fontFamily:"'DM Mono',monospace",fontSize:15,fontWeight:700,color:b,margin:0,letterSpacing:"-.3px"},children:E(d)})]},t))})]}),e.jsxs("div",{className:"db-card",style:{gridColumn:"span 2"},children:[e.jsx("div",{className:"db-accent",style:{background:"#1f2937"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10},children:[e.jsx("p",{className:"db-lbl",style:{margin:0},children:"Bank Accounts"}),!n&&e.jsx("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:13,fontWeight:700,color:"#1f2937"},children:E(Q)})]}),n?[0,1].map(t=>e.jsx("div",{className:"db-sk",style:{width:"100%",height:11,marginBottom:6}},t)):U.length===0?e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"No bank accounts found."}):e.jsxs(e.Fragment,{children:[(l?U:U.slice(0,4)).map(t=>{const d=zt(t);return e.jsxs("div",{className:"db-bank-row",children:[e.jsx(_t,{account:t}),e.jsxs("div",{className:"db-bank-info",children:[e.jsx("div",{className:"db-bank-full",children:d.line1}),e.jsx("div",{className:"db-bank-name",children:d.line2})]}),e.jsx("span",{className:`db-rb ${(t.balance||0)>=0?"pos":"neg"}`,children:E(t.balance||0)})]},t._id)}),U.length>4&&e.jsx("button",{className:"db-more",onClick:()=>u(t=>!t),children:l?"▲ Less":`▼ ${U.length-4} more`})]})]})]}),e.jsx("p",{className:"db-sec",children:"Sales & Purchases"}),e.jsxs("div",{className:"db-g2",children:[e.jsxs("div",{className:"db-card",children:[e.jsx("div",{className:"db-accent",style:{background:"#15803d"}}),e.jsx("p",{className:"db-lbl",children:"Net Sales"}),n?e.jsx(J,{}):e.jsx("p",{className:"db-val pos",children:E(Ue)}),e.jsxs("p",{className:"db-sub",children:[ae.length," invoice",ae.length!==1?"s":"",G.length>0?` · ${G.join(", ")}`:` · ${h.length} total`]}),e.jsx(ze,{p:I}),!n&&ve.length>0&&e.jsx(Pe,{products:ve,selected:G,onChange:qe}),!n&&e.jsx(_e,{data:Qe,color:"#15803d"})]}),e.jsxs("div",{className:"db-card",children:[e.jsx("div",{className:"db-accent",style:{background:"#1f2937"}}),e.jsx("p",{className:"db-lbl",children:"Net Purchases"}),n?e.jsx(J,{}):e.jsx("p",{className:"db-val dk",children:E(Ye)}),e.jsxs("p",{className:"db-sub",children:[ie.length," invoice",ie.length!==1?"s":"",K.length>0?` · ${K.join(", ")}`:` · ${j.length} total`]}),e.jsx(ze,{p:A}),!n&&we.length>0&&e.jsx(Pe,{products:we,selected:K,onChange:He}),!n&&e.jsx(_e,{data:Ze,color:"#374151"})]})]}),e.jsx("p",{className:"db-sec",children:"Financial Position"}),e.jsxs("div",{className:"db-card",style:{padding:0,overflow:"hidden"},children:[e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderBottom:"1px solid #f3f4f6"},children:[{label:"Receivables",value:je,color:"#15803d",accent:"#15803d"},{label:"Payables",value:ke,color:"#b91c1c",accent:"#b91c1c"},{label:"Net Position",value:Math.abs(ne),color:ne>=0?"#15803d":"#b91c1c",accent:ne>=0?"#15803d":"#b91c1c",sub:ne>=0?"Receivables exceed payables":"Payables exceed receivables"}].map((t,d)=>e.jsxs("div",{style:{padding:"14px 16px",position:"relative",overflow:"hidden",borderRight:d<2?"1px solid #f3f4f6":"none"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:3,background:t.accent}}),e.jsx("p",{className:"db-lbl",children:t.label}),n?e.jsx(J,{}):e.jsx("p",{className:"db-val",style:{color:t.color},children:E(t.value)}),t.sub&&e.jsx("p",{className:"db-sub",style:{fontSize:10.5},children:t.sub})]},t.label))}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr"},children:[e.jsxs("div",{style:{padding:"12px 16px",borderRight:"1px solid #f3f4f6"},children:[e.jsxs("p",{style:{fontSize:10,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8},children:[$.length," Receivable Account",$.length!==1?"s":""]}),n?e.jsx("div",{className:"db-sk",style:{width:"80%",height:10}}):$.length===0?e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"No receivables."}):e.jsxs(e.Fragment,{children:[(B?$:$.slice(0,5)).map(t=>e.jsxs("div",{className:"db-row",children:[e.jsx("span",{className:"db-rn",children:t.accountName}),e.jsx("span",{className:"db-rb pos",children:E(t.balance||0)})]},t._id)),$.length>5&&e.jsx("button",{className:"db-more",onClick:()=>D(t=>!t),children:B?"▲ Less":`▼ +${$.length-5}`})]})]}),e.jsxs("div",{style:{padding:"12px 16px"},children:[e.jsxs("p",{style:{fontSize:10,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8},children:[F.length," Payable Account",F.length!==1?"s":""]}),n?e.jsx("div",{className:"db-sk",style:{width:"80%",height:10}}):F.length===0?e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"No payables."}):e.jsxs(e.Fragment,{children:[(W?F:F.slice(0,5)).map(t=>e.jsxs("div",{className:"db-row",children:[e.jsx("span",{className:"db-rn",children:t.accountName}),e.jsx("span",{className:"db-rb neg",children:E(Math.abs(t.balance||0))})]},t._id)),F.length>5&&e.jsx("button",{className:"db-more",onClick:()=>C(t=>!t),children:W?"▲ Less":`▼ +${F.length-5}`})]})]})]})]}),e.jsx("p",{className:"db-sec",children:"Investment & Expenses"}),e.jsxs("div",{className:"db-g2",children:[e.jsxs("div",{className:"db-card",children:[e.jsx("div",{className:"db-accent",style:{background:"#1f2937"}}),e.jsx("p",{className:"db-lbl",children:"Investment"}),n?e.jsx(J,{}):e.jsx("p",{className:"db-val dk",children:E(Ge)}),e.jsxs("p",{className:"db-sub",children:[O.length," investor account",O.length!==1?"s":""]}),!n&&O.length>0&&e.jsxs(e.Fragment,{children:[(p?O:O.slice(0,4)).map(t=>e.jsxs("div",{className:"db-row",children:[e.jsx("span",{className:"db-rn",children:t.accountName}),e.jsx("span",{className:"db-rb pos",children:E(Math.abs(t.balance||0))})]},t._id)),O.length>4&&e.jsx("button",{className:"db-more",onClick:()=>T(t=>!t),children:p?"▲ Less":`▼ +${O.length-4}`})]})]}),e.jsxs("div",{className:"db-card",children:[e.jsx("div",{className:"db-accent",style:{background:"#7c3aed"}}),e.jsx("p",{className:"db-lbl",children:"Expenses"}),n?e.jsx(J,{}):e.jsx("p",{className:"db-val",style:{color:"#7c3aed"},children:E(Ke)}),e.jsxs("p",{className:"db-sub",children:[Z.length," expense account",Z.length!==1?"s":""]}),!n&&Z.length>0&&e.jsx(e.Fragment,{children:Z.slice(0,5).map(t=>e.jsxs("div",{className:"db-row",children:[e.jsx("span",{className:"db-rn",children:t.accountName.replace(" — Expense","")}),e.jsx("span",{className:"db-rb neg",children:E(Math.abs(t.balance||0))})]},t._id))})]})]}),e.jsx("p",{className:"db-sec",children:"Operations"}),e.jsxs("div",{className:"db-g2",children:[e.jsxs("div",{className:"db-card",children:[e.jsx("div",{className:"db-accent",style:{background:"#1f2937"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10},children:[e.jsxs("div",{children:[e.jsx("p",{className:"db-lbl",style:{margin:0},children:"Pending Cheques"}),n?e.jsx("div",{className:"db-sk",style:{width:"50%",height:18,marginTop:5}}):e.jsx("p",{className:"db-val dk",style:{marginTop:4},children:E(Xe)})]}),!n&&e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:20,fontWeight:700,color:v.length>0?"#b91c1c":"#15803d"},children:v.length}),e.jsx("p",{style:{fontSize:9.5,color:"#9ca3af",margin:0},children:"issued"})]})]}),!n&&v.length===0&&e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"✓ No pending cheques"}),!n&&v.length>0&&e.jsxs(e.Fragment,{children:[(z?v:v.slice(0,4)).map(t=>e.jsxs("div",{className:"db-cq",children:[e.jsxs("span",{className:"db-cq-no",children:["#",t.chequeNo]}),e.jsx("span",{className:"db-cq-name",children:t.payeeAccountName}),e.jsx("span",{className:"db-cq-amt",children:E(t.amount)}),e.jsx("span",{className:"db-cq-badge",children:"ISSUED"})]},t._id)),v.length>4&&e.jsx("button",{className:"db-more",onClick:()=>Ve(t=>!t),children:z?"▲ Less":`▼ +${v.length-4} more`})]})]}),e.jsxs("div",{className:"db-card",children:[e.jsx("div",{className:"db-accent",style:{background:"#15803d"}}),e.jsx("p",{className:"db-lbl",children:"Weight Bridge Earnings"}),n?e.jsx(J,{}):e.jsx("p",{className:"db-val pos",children:E(Je)}),e.jsxs("p",{className:"db-sub",children:[Y.length," completed invoice",Y.length!==1?"s":""," · ",g.length-Y.length," pending"]}),!n&&de.length>0&&(()=>{const t=Math.max(...de.map(([,d])=>d.total),1);return e.jsx("div",{style:{marginTop:12},children:de.slice(0,5).map(([d,b])=>e.jsxs("div",{className:"db-bar-row",children:[e.jsx("span",{style:{fontSize:10,color:"#9ca3af",minWidth:80,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:d}),e.jsx("div",{className:"db-bar-track",children:e.jsx("div",{className:"db-bar-fill",style:{width:`${Math.round(b.total/t*100)}%`,background:"#15803d"}})}),e.jsxs("span",{style:{fontSize:10,color:"#9ca3af",minWidth:80,fontFamily:"'DM Mono',monospace"},children:[E(b.total)," ",e.jsx("span",{style:{color:"#d1d5db"},children:"·"})," ",b.count,"×"]})]},d))})})()]})]}),e.jsx("div",{style:{height:32}})]})]})}const Tt=()=>e.jsxs("div",{className:"flex h-screen w-screen animate-pulse bg-gray-50",children:[e.jsxs("aside",{className:"w-64 bg-gray-200 p-4 flex flex-col gap-4",children:[e.jsx("div",{className:"h-10 bg-gray-300 rounded"}),e.jsx("div",{className:"h-10 bg-gray-300 rounded"}),e.jsx("div",{className:"h-10 bg-gray-300 rounded"}),e.jsx("div",{className:"h-10 bg-gray-300 rounded"})]}),e.jsxs("div",{className:"flex-1 flex flex-col",children:[e.jsxs("header",{className:"h-16 bg-gray-200 px-6 flex items-center gap-4",children:[e.jsx("div",{className:"h-6 w-32 bg-gray-300 rounded"}),e.jsx("div",{className:"h-6 w-16 bg-gray-300 rounded ml-auto"})]}),e.jsx("main",{className:"flex-1 p-6 flex flex-col gap-4",children:Array.from({length:8}).map((o,s)=>e.jsx("div",{className:"h-10 bg-gray-300 rounded w-full"},s))})]})]}),Rt=`
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
  .fl-core:hover { background: #1f2937; box-shadow: 0 6px 22px rgba(0,0,0,.35); transform: scale(1.06); }
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
    position: absolute; right: calc(100% + 9px); top: 50%; transform: translateY(-50%);
    background: #111827; color: #f9fafb;
    font-size: 9.5px; font-weight: 600; white-space: nowrap;
    padding: 3px 8px; border-radius: 5px; pointer-events: none;
    opacity: 0; transition: opacity .1s; letter-spacing: .06em;
    text-transform: uppercase; font-family: 'DM Mono', monospace;
    box-shadow: 0 2px 8px rgba(0,0,0,.18);
    left: auto; z-index: 1;
  }
  .fl-sat:hover .fl-tip { opacity: 1; }
`,Wt=[{path:"/dashboard",label:"Home",icon:e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15.75a.75.75 0 01-.75-.75v-4.5h-6V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"})})},{path:"/cashbook",label:"Cashbook",icon:e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})},{path:"/add-invoice-purchase",label:"Purchase",icon:e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"})})},{path:"/add-invoice-sales",label:"Sales",icon:e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"})})},{path:"/weight-bridge",label:"W·Bridge",icon:e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"})})}],le={right:20,bottom:20},Ot=56,me=50,X=42,Ie=10,$t=14;function Ft(o,s,n){const a=X+Ie;return Array.from({length:n},(i,c)=>{const h=s-me/2-Ie-X/2-c*a,f=o,j=Math.max(Ot+$t+X/2,h);return{left:f-X/2,top:j-X/2,tipAbove:!1}})}function De(){const o=document.documentElement.clientWidth,s=window.innerHeight;return{cx:o-le.right-me/2,cy:s-le.bottom-me/2}}function Vt(){const o=ce();if(o.pathname.startsWith("/master"))return null;const n=(localStorage.getItem("role")||"Admin")==="Admin",a=r.useMemo(()=>{try{return JSON.parse(localStorage.getItem("allowedRoutes"))||[]}catch{return[]}},[]),i=Wt.filter(l=>n||a.includes(l.path)),[c,h]=r.useState(!1),[f,j]=r.useState(!1),[N,S]=r.useState([]),k=r.useCallback(()=>{const{cx:l,cy:u}=De();S(Ft(l,u,i.length))},[i.length]);r.useEffect(()=>{c&&k()},[c,k]),r.useEffect(()=>{const l=()=>{c&&k()};return window.addEventListener("resize",l),()=>window.removeEventListener("resize",l)},[c,k]),r.useEffect(()=>{const l=u=>{const B=u.target.closest(".fl-wrap"),D=u.target.closest(".fl-sat");!B&&!D&&v()};return document.addEventListener("mousedown",l),()=>document.removeEventListener("mousedown",l)},[]);const v=()=>{j(!0),h(!1),setTimeout(()=>j(!1),500)},P=()=>{c?v():h(!0)},{cx:g,cy:L}=De(),I=g-X/2,A=L-X/2;return o.pathname==="/"?null:e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Rt}),e.jsx("div",{className:["fl-wrap",c?"fl-open":""].filter(Boolean).join(" "),style:{right:le.right,bottom:le.bottom},children:e.jsxs("div",{className:"fl-core",onClick:P,children:[e.jsx("span",{className:"fl-ico fl-ico-menu",children:e.jsxs("svg",{width:18,height:18,fill:"none",viewBox:"0 0 24 24",stroke:"rgba(255,255,255,.85)",strokeWidth:1.7,children:[e.jsx("rect",{x:3,y:5,width:7,height:7,rx:1.5,fill:"rgba(255,255,255,.1)",stroke:"rgba(255,255,255,.8)",strokeWidth:1.5}),e.jsx("rect",{x:14,y:5,width:7,height:7,rx:1.5,fill:"rgba(255,255,255,.1)",stroke:"rgba(255,255,255,.8)",strokeWidth:1.5}),e.jsx("rect",{x:3,y:14,width:7,height:7,rx:1.5,fill:"rgba(255,255,255,.1)",stroke:"rgba(255,255,255,.8)",strokeWidth:1.5}),e.jsx("rect",{x:14,y:14,width:7,height:7,rx:1.5,fill:"rgba(255,255,255,.1)",stroke:"rgba(255,255,255,.8)",strokeWidth:1.5})]})}),e.jsx("span",{className:"fl-ico fl-ico-close",children:e.jsx("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"rgba(255,255,255,.85)",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})})]})}),i.map((l,u)=>{const B=N[u],D=c&&B,W=["fl-sat",`fl-s${u+1}`,D?"fl-visible":"",f?"fl-closing":"",o.pathname===l.path||o.pathname.startsWith(l.path+"/")?"fl-active":""].filter(Boolean).join(" ");return e.jsxs(be,{to:l.path,className:W,style:{left:D?B.left:I,top:D?B.top:A},onClick:()=>v(),draggable:!1,children:[e.jsx("span",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:l.icon}),e.jsx("span",{className:"fl-tip",children:l.label})]},l.path)})]})}(function(){if(typeof Node>"u")return;const s=Node.prototype.removeChild;Node.prototype.removeChild=function(a){return a&&a.parentNode===this?s.call(this,a):a};const n=Node.prototype.insertBefore;Node.prototype.insertBefore=function(a,i){return i&&i.parentNode!==this?this.appendChild(a):n.call(this,a,i)}})();const qt=r.lazy(()=>y(()=>import("./Masterportal-DkieHd9m.js"),__vite__mapDeps([0,1,2,3]))),Ht=r.lazy(()=>y(()=>import("./CreateAccount-DuSTBDaG.js"),__vite__mapDeps([4,1,2,3]))),Gt=r.lazy(()=>y(()=>import("./ViewAccounts-DPpLkeaz.js"),__vite__mapDeps([5,1,2,3]))),Te=r.lazy(()=>y(()=>import("./GeneralJournalEntry-BqcvsbHi.js"),__vite__mapDeps([6,1,7,2,3]))),Kt=r.lazy(()=>y(()=>import("./ViewGeneralEntries-BP5BbBrd.js"),__vite__mapDeps([8,1,7,2,3]))),Ut=r.lazy(()=>y(()=>import("./InoviceDashboard-FrqcX477.js"),__vite__mapDeps([9,1,2,3]))),Yt=r.lazy(()=>y(()=>import("./SalesInvoice-C6mjJtcy.js"),__vite__mapDeps([10,1,2,3]))),Jt=r.lazy(()=>y(()=>import("./PurchaseInvoiceForm-BK2osY0E.js"),__vite__mapDeps([11,1,2,3]))),Xt=r.lazy(()=>y(()=>import("./PurchaseQuotation-atfVLVa_.js"),__vite__mapDeps([12,1,2,3]))),Qt=r.lazy(()=>y(()=>import("./ViewSalesInvoices-CjPz_YQv.js"),__vite__mapDeps([13,1,2,3]))),Zt=r.lazy(()=>y(()=>import("./ViewPurchaseInvoices-BeDDsguH.js"),__vite__mapDeps([14,1,2,3]))),eo=r.lazy(()=>y(()=>import("./AccountsPage-CsPsI97_.js"),__vite__mapDeps([15,1,4,2,3,5]))),to=r.lazy(()=>y(()=>import("./LedgerSearch-D62B-gYv.js"),__vite__mapDeps([16,1,7,2,3]))),oo=r.lazy(()=>y(()=>import("./LedgerByReference-3RppwibZ.js"),__vite__mapDeps([17,1,2,3]))),so=r.lazy(()=>y(()=>import("./LedgerByAccount-BeoisYWm.js"),__vite__mapDeps([18,1,2,3]))),no=r.lazy(()=>y(()=>import("./ProductsList-CvAGVs_f.js"),__vite__mapDeps([19,1,2,3]))),ro=r.lazy(()=>y(()=>import("./BalanceSheet-CRY1ko88.js"),__vite__mapDeps([20,1,3,2]))),ao=r.lazy(()=>y(()=>import("./TrialBalance-CPx1zNjE.js"),__vite__mapDeps([21,1,3,2]))),io=r.lazy(()=>y(()=>import("./IncomeStatement-DZbrGIJd.js"),__vite__mapDeps([22,1,3,2]))),lo=r.lazy(()=>y(()=>import("./CreateEmployee-1mmt9R74.js"),__vite__mapDeps([23,1,3,2]))),co=r.lazy(()=>y(()=>import("./ViewEmployees-BRpsbEa7.js"),__vite__mapDeps([24,1,3,2]))),po=r.lazy(()=>y(()=>import("./WeightBridge-wwhYDOpw.js"),__vite__mapDeps([25,1,2,3]))),ho=r.lazy(()=>y(()=>import("./WeightBridgeInvoice-DbTWgwqm.js"),__vite__mapDeps([26,1,2,3]))),fo=r.lazy(()=>y(()=>import("./CashbookForm-R08PtZxf.js"),__vite__mapDeps([27,1,2,3]))),go=r.lazy(()=>y(()=>import("./CashbookReport-Cmfx2Atc.js"),__vite__mapDeps([28,1,2,3]))),uo=r.lazy(()=>y(()=>import("./CreateChequeBook-C8s3vosH.js"),__vite__mapDeps([29,1,30,2,3]))),mo=r.lazy(()=>y(()=>import("./CreateChequeEntry-DeqDEWLd.js"),__vite__mapDeps([31,1,30,2,3]))),bo=r.lazy(()=>y(()=>import("./ViewChequeBooks-DtzHbTco.js"),__vite__mapDeps([32,1,30,2,3]))),xo=r.lazy(()=>y(()=>import("./Adminprofile-C83eDBjq.js"),__vite__mapDeps([33,1,2,3]))),yo=r.lazy(()=>y(()=>import("./Stockmanagement-g1CaFMn-.js"),__vite__mapDeps([34,1,2,3])));class Re extends r.Component{constructor(s){super(s),this.state={hasError:!1,isChunkError:!1}}static getDerivedStateFromError(s){const n=s?.message||"",a=s?.name||"",i=a==="NotFoundError"||n.includes("removeChild")||n.includes("insertBefore")||n.includes("is not a child of this node"),c=a==="ChunkLoadError"||n.includes("Failed to fetch dynamically imported module")||n.includes("Loading chunk")||n.includes("dynamically imported module");if(i||c){const h="agro-error-reload",f=Number(sessionStorage.getItem(h)||0);Date.now()-f>15e3&&(sessionStorage.setItem(h,String(Date.now())),window.location.reload())}return{hasError:!i,isChunkError:c}}componentDidCatch(s){const n=s?.message||"",a=s?.name||"",i=a==="NotFoundError"||n.includes("removeChild")||n.includes("insertBefore")||n.includes("is not a child of this node"),c=a==="ChunkLoadError"||n.includes("Failed to fetch dynamically imported module")||n.includes("Loading chunk")||n.includes("dynamically imported module");if(i||c||n.includes("aborted")||n.includes("NetworkError")||n.includes("Load failed")||n.includes("Failed to fetch")){const f="agro-error-reload",j=Number(sessionStorage.getItem(f)||0);Date.now()-j>15e3&&(sessionStorage.setItem(f,String(Date.now())),window.location.reload())}}render(){return this.state.hasError?e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#f9fafb",fontFamily:"'DM Sans', sans-serif"},children:e.jsxs("div",{style:{textAlign:"center",maxWidth:360,padding:"0 24px"},children:[e.jsx("div",{style:{fontSize:40,marginBottom:14},children:"⚠️"}),e.jsx("h2",{style:{fontSize:17,fontWeight:700,color:"#111827",marginBottom:8},children:this.state.isChunkError?"Page failed to load":"Something went wrong"}),e.jsx("p",{style:{fontSize:13,color:"#6b7280",marginBottom:22,lineHeight:1.6},children:this.state.isChunkError?"A network issue prevented this page from loading. Check your connection and try again.":"An unexpected error occurred. Reloading usually fixes this."}),e.jsx("button",{onClick:()=>window.location.reload(),style:{padding:"10px 28px",borderRadius:8,border:"none",background:"#111827",color:"#fff",fontSize:13.5,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans', sans-serif"},children:"Reload Page"})]})}):this.props.children}}function jo(){return e.jsx(Tt,{})}function ko(){return ce().pathname.startsWith("/master")?null:e.jsx(Vt,{})}function vo(){const o=localStorage.getItem("token");return window.history.length>1?(window.history.back(),null):e.jsx(ge,{to:o?"/dashboard":"/",replace:!0})}function wo(){return e.jsx(Re,{children:e.jsx(it,{children:e.jsxs(ot,{children:[e.jsx(ko,{}),e.jsx(Re,{children:e.jsx(r.Suspense,{fallback:e.jsx(jo,{}),children:e.jsxs(st,{children:[e.jsx(m,{path:"/",element:e.jsx(ht,{})}),e.jsx(m,{path:"/master",element:e.jsx(qt,{})}),e.jsx(m,{path:"/dashboard",element:e.jsx(x,{children:e.jsx(Dt,{})})}),e.jsx(m,{path:"/create-account",element:e.jsx(x,{children:e.jsx(Ht,{})})}),e.jsx(m,{path:"/view-accounts",element:e.jsx(x,{children:e.jsx(Gt,{})})}),e.jsx(m,{path:"/ledger",element:e.jsx(x,{children:e.jsx(to,{})})}),e.jsx(m,{path:"/ledger/account/:accountId",element:e.jsx(x,{children:e.jsx(so,{})})}),e.jsx(m,{path:"/ledger/ref/:ref",element:e.jsx(x,{children:e.jsx(oo,{})})}),e.jsx(m,{path:"/general-entries",element:e.jsx(x,{children:e.jsx(Te,{})})}),e.jsx(m,{path:"/general-journal-entry",element:e.jsx(x,{children:e.jsx(Te,{})})}),e.jsx(m,{path:"/view-general-entries",element:e.jsx(x,{children:e.jsx(Kt,{})})}),e.jsx(m,{path:"/add-invoice",element:e.jsx(x,{children:e.jsx(Ut,{})})}),e.jsx(m,{path:"/add-invoice-sales",element:e.jsx(x,{children:e.jsx(Yt,{})})}),e.jsx(m,{path:"/view-sales-invoices",element:e.jsx(x,{children:e.jsx(Qt,{})})}),e.jsx(m,{path:"/add-invoice-purchase",element:e.jsx(x,{children:e.jsx(Jt,{})})}),e.jsx(m,{path:"/purchase-quotation",element:e.jsx(Xt,{})}),e.jsx(m,{path:"/view-purchase-invoices",element:e.jsx(x,{children:e.jsx(Zt,{})})}),e.jsx(m,{path:"/accounts/*",element:e.jsx(x,{children:e.jsx(eo,{})})}),e.jsx(m,{path:"/products",element:e.jsx(x,{children:e.jsx(no,{})})}),e.jsx(m,{path:"/balancesheet",element:e.jsx(x,{children:e.jsx(ro,{})})}),e.jsx(m,{path:"/trialbalance",element:e.jsx(x,{children:e.jsx(ao,{})})}),e.jsx(m,{path:"/incomestatement",element:e.jsx(x,{children:e.jsx(io,{})})}),e.jsx(m,{path:"/employees/new",element:e.jsx(x,{children:e.jsx(lo,{})})}),e.jsx(m,{path:"/employees",element:e.jsx(x,{children:e.jsx(co,{})})}),e.jsx(m,{path:"/weight-bridge",element:e.jsx(x,{children:e.jsx(po,{})})}),e.jsx(m,{path:"/weight-bridge/invoices",element:e.jsx(x,{children:e.jsx(ho,{})})}),e.jsx(m,{path:"/cashbook",element:e.jsx(x,{children:e.jsx(fo,{})})}),e.jsx(m,{path:"/cashbook-report",element:e.jsx(x,{children:e.jsx(go,{})})}),e.jsx(m,{path:"/cheque-book/create",element:e.jsx(x,{children:e.jsx(uo,{})})}),e.jsx(m,{path:"/cheque-book/entry",element:e.jsx(x,{children:e.jsx(mo,{})})}),e.jsx(m,{path:"/cheque-book/view",element:e.jsx(x,{children:e.jsx(bo,{})})}),e.jsx(m,{path:"/stock",element:e.jsx(x,{children:e.jsx(yo,{})})}),e.jsx(m,{path:"/profile",element:e.jsx(x,{children:e.jsx(xo,{})})}),e.jsx(m,{path:"*",element:e.jsx(vo,{})})]})})})]})})})}nt.createRoot(document.getElementById("root")).render(e.jsx(r.StrictMode,{children:e.jsx(wo,{})}));export{q as A,lt as N,At as S,te as a};
