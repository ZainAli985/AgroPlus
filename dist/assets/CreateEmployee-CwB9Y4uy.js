import{j as e,S as T,N as F,A as J}from"./index-Boeq2w4o.js";import{b as l}from"./react-CVH9iSHU.js";/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=(...o)=>o.filter((t,i,n)=>!!t&&t.trim()!==""&&n.indexOf(t)===i).join(" ").trim();/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=o=>o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=o=>o.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,i,n)=>n?n.toUpperCase():i.toLowerCase());/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=o=>{const t=O(o);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var q={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=o=>{for(const t in o)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=l.forwardRef(({color:o="currentColor",size:t=24,strokeWidth:i=2,absoluteStrokeWidth:n,className:p="",children:d,iconNode:k,...x},N)=>l.createElement("svg",{ref:N,...q,width:t,height:t,stroke:o,strokeWidth:n?Number(i)*24/Number(t):i,className:z("lucide",p),...!d&&!H(x)&&{"aria-hidden":"true"},...x},[...k.map(([j,v])=>l.createElement(j,v)),...Array.isArray(d)?d:[d]]));/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=(o,t)=>{const i=l.forwardRef(({className:n,...p},d)=>l.createElement(U,{ref:d,iconNode:t,className:z(`lucide-${I(L(o))}`,`lucide-${o}`,n),...p}));return i.displayName=L(o),i};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],G=A("eye-off",_);/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],Z=A("eye",Y),V="@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');",K=`
  *, *::before, *::after { box-sizing: border-box; }
  .ce-wrap { font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; max-width: 860px; margin: 0 auto; }

  /* ── Field ── */
  .ce-label {
    display: block; font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .07em;
    color: #9ca3af; margin-bottom: 6px;
  }
  .ce-input, .ce-select {
    width: 100%; border: 1.5px solid #e5e7eb; border-radius: 10px;
    padding: 10px 13px; font-size: 14px; font-family: 'Plus Jakarta Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .15s, box-shadow .15s; appearance: none;
  }
  .ce-input::placeholder { color: #c4c4c4; }
  .ce-input:focus, .ce-select:focus {
    border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.12);
  }
  .ce-input.mono { font-family: 'JetBrains Mono', monospace; font-size: 13px; }
  .ce-input-err { border-color: #f87171 !important; box-shadow: 0 0 0 3px rgba(248,113,113,.1) !important; }

  /* ── Select wrapper ── */
  .ce-select-wrap { position: relative; }
  .ce-select-wrap::after {
    content: ''; position: absolute; right: 13px; top: 50%;
    transform: translateY(-50%); pointer-events: none;
    border-left: 4px solid transparent; border-right: 4px solid transparent;
    border-top: 5px solid #9ca3af;
  }

  /* ── Section card ── */
  .ce-section {
    background: #fff; border: 1.5px solid #f3f4f6; border-radius: 16px;
    overflow: hidden; margin-bottom: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,.04);
  }
  .ce-section-head {
    display: flex; align-items: center; gap: 10px;
    padding: 14px 20px; border-bottom: 1.5px solid #f3f4f6;
    background: #fafafa;
  }
  .ce-section-icon {
    width: 32px; height: 32px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .ce-section-title {
    font-size: 13px; font-weight: 700; color: #374151;
    text-transform: uppercase; letter-spacing: .06em;
  }
  .ce-section-body { padding: 20px; }

  /* ── Route toggle pills ── */
  .ce-route-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
    max-height: 260px; overflow-y: auto;
    scrollbar-width: thin; scrollbar-color: #e5e7eb transparent;
  }
  .ce-route-pill {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 11px; border-radius: 9px; cursor: pointer;
    border: 1.5px solid #f3f4f6; background: #fafafa;
    transition: all .12s; user-select: none;
  }
  .ce-route-pill:hover { border-color: #e0e7ff; background: #eef2ff; }
  .ce-route-pill.active {
    border-color: #c7d2fe; background: #eef2ff; color: #4338ca;
  }
  .ce-route-check {
    width: 16px; height: 16px; border-radius: 5px; flex-shrink: 0;
    border: 1.5px solid #d1d5db; background: #fff;
    display: flex; align-items: center; justify-content: center;
    transition: all .12s;
  }
  .ce-route-pill.active .ce-route-check {
    background: #6366f1; border-color: #6366f1;
  }
  .ce-route-label {
    font-size: 12px; font-weight: 500; color: #4b5563;
    font-family: 'JetBrains Mono', monospace; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis;
  }
  .ce-route-pill.active .ce-route-label { color: #4338ca; font-weight: 600; }

  /* ── Route select all ── */
  .ce-route-actions {
    display: flex; gap: 8px; margin-bottom: 12px;
  }
  .ce-route-action-btn {
    font-size: 11.5px; font-weight: 600; padding: 5px 12px;
    border-radius: 7px; border: 1.5px solid #e5e7eb; background: #fff;
    color: #6b7280; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all .12s;
  }
  .ce-route-action-btn:hover { border-color: #c7d2fe; color: #4338ca; background: #eef2ff; }

  /* ── File upload zone ── */
  .ce-dropzone {
    border: 2px dashed #e5e7eb; border-radius: 12px;
    padding: 24px; text-align: center; cursor: pointer;
    transition: border-color .15s, background .15s; background: #fafafa;
    position: relative;
  }
  .ce-dropzone:hover { border-color: #a5b4fc; background: #f5f3ff; }
  .ce-dropzone input[type=file] {
    position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%;
  }

  /* ── Doc preview ── */
  .ce-doc-preview {
    width: 60px; height: 60px; border-radius: 9px;
    border: 1.5px solid #e5e7eb; overflow: hidden; flex-shrink: 0;
    position: relative; background: #f3f4f6;
  }

  /* ── Submit btn ── */
  .ce-submit {
    width: 100%; padding: 13px; border-radius: 12px; border: none;
    background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
    color: #fff; font-size: 15px; font-weight: 700;
    font-family: 'Plus Jakarta Sans', sans-serif;
    cursor: pointer; transition: opacity .15s, box-shadow .15s, transform .15s;
    box-shadow: 0 4px 14px rgba(99,102,241,.35);
    letter-spacing: .01em;
  }
  .ce-submit:hover {
    opacity: .93; box-shadow: 0 6px 20px rgba(99,102,241,.45);
    transform: translateY(-1px);
  }
  .ce-submit:active { transform: translateY(0); }

  /* ── Role cards ── */
  .ce-role-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .ce-role-card {
    border: 1.5px solid #f3f4f6; border-radius: 12px;
    padding: 14px 16px; cursor: pointer; transition: all .15s;
    display: flex; align-items: center; gap: 12px; background: #fafafa;
  }
  .ce-role-card:hover { border-color: #c7d2fe; background: #eef2ff; }
  .ce-role-card.selected {
    border-color: #6366f1; background: #eef2ff;
    box-shadow: 0 0 0 3px rgba(99,102,241,.12);
  }
  .ce-role-dot {
    width: 20px; height: 20px; border-radius: 50%; border: 2px solid #d1d5db;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    transition: all .15s;
  }
  .ce-role-card.selected .ce-role-dot {
    border-color: #6366f1; background: #6366f1;
  }
  .ce-role-name { font-size: 14px; font-weight: 700; color: #374151; }
  .ce-role-desc { font-size: 12px; color: #9ca3af; margin-top: 1px; }
  .ce-role-card.selected .ce-role-name { color: #4338ca; }

  /* ── Password strength ── */
  .ce-pwd-bar { height: 3px; border-radius: 3px; margin-top: 6px; transition: all .3s; }

  /* ── Grid helpers ── */
  .ce-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .ce-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  @media (max-width: 640px) {
    .ce-grid-2, .ce-grid-3 { grid-template-columns: 1fr; }
    .ce-route-grid { grid-template-columns: 1fr 1fr; }
    .ce-role-grid { grid-template-columns: 1fr; }
  }

  /* ── Badge count ── */
  .ce-badge {
    display: inline-flex; align-items: center; justify-content: center;
    min-width: 20px; height: 20px; padding: 0 6px;
    border-radius: 10px; font-size: 11px; font-weight: 700;
    background: #6366f1; color: #fff;
  }
`,Q=o=>o.replace(/^\//,"").replace(/-/g," ").replace(/\b\w/g,t=>t.toUpperCase())||"Dashboard",X=o=>{if(!o)return{score:0,label:"",color:"#e5e7eb"};let t=0;return o.length>=8&&t++,/[A-Z]/.test(o)&&t++,/[0-9]/.test(o)&&t++,/[^A-Za-z0-9]/.test(o)&&t++,[{score:1,label:"Weak",color:"#f87171"},{score:2,label:"Fair",color:"#fb923c"},{score:3,label:"Good",color:"#34d399"},{score:4,label:"Strong",color:"#10b981"}][t-1]||{score:0,label:"",color:"#e5e7eb"}};function w({icon:o,iconBg:t,title:i,badge:n,children:p}){return e.jsxs("div",{className:"ce-section",children:[e.jsxs("div",{className:"ce-section-head",children:[e.jsx("div",{className:"ce-section-icon",style:{background:t},children:o}),e.jsx("span",{className:"ce-section-title",children:i}),n!=null&&e.jsx("span",{className:"ce-badge",style:{marginLeft:"auto"},children:n})]}),e.jsx("div",{className:"ce-section-body",children:p})]})}function h({label:o,error:t,children:i}){return e.jsxs("div",{children:[o&&e.jsx("label",{className:"ce-label",children:o}),i,t&&e.jsx("p",{style:{fontSize:11.5,color:"#ef4444",marginTop:4,fontWeight:500},children:t})]})}function te(){const[o,t]=l.useState({firstName:"",lastName:"",cnic:"",address:"",mobile:"+92",email:"",role:"",username:"",password:"",allowedRoutes:[]}),[i,n]=l.useState([]),[p,d]=l.useState([]),[k,x]=l.useState(""),[N,j]=l.useState(""),[v,M]=l.useState(!1),[m,S]=l.useState({}),C=["/dashboard","/create-account","/view-accounts","/ledger","/general-entries","/products","/products/new","/add-invoice-purchase","/view-purchase-invoices","/add-invoice-sales","/view-sales-invoices","/stock-management","/trialbalance","/balancesheet","/incomestatement","/weight-bridge","/weight-bridge/invoices","/cashbook","/cashbook-report"],R=[{value:"Accountant",label:"Accountant",desc:"Full financial access"},{value:"Worker",label:"Worker",desc:"Limited operational access"}],f=r=>{const{name:s,value:u}=r.target;if(S(a=>({...a,[s]:""})),s==="cnic"){const a=u.replace(/\D/g,"").slice(0,13);let g=a;a.length>5&&(g=`${a.slice(0,5)}-${a.slice(5)}`),a.length>12&&(g=`${a.slice(0,5)}-${a.slice(5,12)}-${a.slice(12)}`),t(b=>({...b,cnic:g}));return}if(s==="mobile"){let a=u.replace(/\D/g,"");a.startsWith("92")&&(a=a.slice(2)),a.length>10&&(a=a.slice(0,10)),t(g=>({...g,mobile:`+92${a}`}));return}t(a=>({...a,[s]:u}))},B=r=>{t(s=>({...s,allowedRoutes:s.allowedRoutes.includes(r)?s.allowedRoutes.filter(u=>u!==r):[...s.allowedRoutes,r]}))},P=()=>t(r=>({...r,allowedRoutes:[...C]})),W=()=>t(r=>({...r,allowedRoutes:[]})),D=r=>{const s=Array.from(r.target.files);n(s),d(s.map(u=>URL.createObjectURL(u)))},E=async r=>{r.preventDefault();const s={};if(o.cnic.replace(/\D/g,"").length!==13&&(s.cnic="Must be exactly 13 digits"),o.mobile.replace(/\D/g,"").slice(2).length!==10&&(s.mobile="Must be 10 digits after +92"),o.role||(s.role="Please select a role"),Object.keys(s).length){S(s);return}const g=localStorage.getItem("token"),b=new FormData;Object.keys(o).forEach(c=>{c==="allowedRoutes"?b.append(c,JSON.stringify(o[c])):b.append(c,o[c])}),i.forEach(c=>b.append("documents",c));try{const c=await fetch(`${J}/employees`,{method:"POST",headers:{Authorization:`Bearer ${g}`},body:b}),$=await c.json();c.ok?(x("Employee created successfully"),j("success"),t({firstName:"",lastName:"",cnic:"",address:"",mobile:"+92",email:"",role:"",username:"",password:"",allowedRoutes:[]}),n([]),d([])):(x($.message),j("error"))}catch{x("Server error"),j("error")}setTimeout(()=>x(""),3500)},y=X(o.password);return e.jsxs(T,{children:[e.jsxs("style",{children:[V,K]}),e.jsx(F,{message:k,type:N}),e.jsxs("div",{className:"ce-wrap",children:[e.jsxs("div",{style:{marginBottom:24},children:[e.jsx("p",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"#9ca3af",marginBottom:4},children:"HR Management"}),e.jsx("h1",{style:{fontSize:26,fontWeight:800,color:"#111827",letterSpacing:"-.5px",lineHeight:1},children:"Create New Employee"})]}),e.jsxs("form",{onSubmit:E,style:{display:"flex",flexDirection:"column",gap:0},children:[e.jsxs(w,{icon:e.jsx("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"#6366f1",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})}),iconBg:"#eef2ff",title:"Personal Information",children:[e.jsxs("div",{className:"ce-grid-2",style:{marginBottom:16},children:[e.jsx(h,{label:"First Name",children:e.jsx("input",{name:"firstName",value:o.firstName,onChange:f,placeholder:"e.g. Muhammad",className:"ce-input",required:!0})}),e.jsx(h,{label:"Last Name",children:e.jsx("input",{name:"lastName",value:o.lastName,onChange:f,placeholder:"e.g. Ali",className:"ce-input",required:!0})})]}),e.jsxs("div",{className:"ce-grid-2",style:{marginBottom:16},children:[e.jsx(h,{label:"CNIC",error:m.cnic,children:e.jsx("input",{name:"cnic",value:o.cnic,onChange:f,placeholder:"xxxxx-xxxxxxx-x",className:`ce-input mono${m.cnic?" ce-input-err":""}`,required:!0})}),e.jsx(h,{label:"Mobile",error:m.mobile,children:e.jsx("input",{name:"mobile",value:o.mobile,onChange:f,className:`ce-input mono${m.mobile?" ce-input-err":""}`,required:!0})})]}),e.jsxs("div",{className:"ce-grid-2",children:[e.jsx(h,{label:"Email Address",children:e.jsx("input",{name:"email",type:"email",value:o.email,onChange:f,placeholder:"name@example.com",className:"ce-input",required:!0})}),e.jsx(h,{label:"Home Address",children:e.jsx("input",{name:"address",value:o.address,onChange:f,placeholder:"Street, City",className:"ce-input"})})]})]}),e.jsxs(w,{icon:e.jsx("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"#f59e0b",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})}),iconBg:"#fffbeb",title:"Role & Access Level",children:[m.role&&e.jsx("p",{style:{fontSize:11.5,color:"#ef4444",marginBottom:10,fontWeight:500},children:m.role}),e.jsx("div",{className:"ce-role-grid",children:R.map(r=>e.jsxs("div",{className:`ce-role-card${o.role===r.value?" selected":""}`,onClick:()=>{t(s=>({...s,role:r.value})),S(s=>({...s,role:""}))},children:[e.jsx("div",{className:"ce-role-dot",children:o.role===r.value&&e.jsx("svg",{width:10,height:10,viewBox:"0 0 10 10",fill:"#fff",children:e.jsx("path",{d:"M2 5l2.5 2.5L8 3",stroke:"#fff",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round",fill:"none"})})}),e.jsxs("div",{children:[e.jsx("div",{className:"ce-role-name",children:r.label}),e.jsx("div",{className:"ce-role-desc",children:r.desc})]})]},r.value))})]}),e.jsx(w,{icon:e.jsx("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"#10b981",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"})}),iconBg:"#ecfdf5",title:"Login Credentials",children:e.jsxs("div",{className:"ce-grid-2",children:[e.jsx(h,{label:"Username",children:e.jsx("input",{name:"username",value:o.username,onChange:f,placeholder:"e.g. m.ali",className:"ce-input mono",required:!0})}),e.jsxs(h,{label:"Password",children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("input",{name:"password",type:v?"text":"password",value:o.password,onChange:f,placeholder:"Min. 8 characters",className:"ce-input",style:{paddingRight:44},required:!0}),e.jsx("button",{type:"button",onClick:()=>M(r=>!r),style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#9ca3af",display:"flex",alignItems:"center",transition:"color .15s"},onMouseEnter:r=>r.currentTarget.style.color="#6366f1",onMouseLeave:r=>r.currentTarget.style.color="#9ca3af",children:v?e.jsx(G,{size:18}):e.jsx(Z,{size:18})})]}),o.password&&e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:4,marginTop:7},children:[1,2,3,4].map(r=>e.jsx("div",{style:{flex:1,height:3,borderRadius:3,background:r<=y.score?y.color:"#f3f4f6",transition:"background .3s"}},r))}),e.jsx("p",{style:{fontSize:11,marginTop:4,fontWeight:600,color:y.color},children:y.label})]})]})]})}),e.jsxs(w,{icon:e.jsx("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"#8b5cf6",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"})}),iconBg:"#f5f3ff",title:"Page Permissions",badge:o.allowedRoutes.length,children:[e.jsxs("div",{className:"ce-route-actions",children:[e.jsx("button",{type:"button",className:"ce-route-action-btn",onClick:P,children:"Select All"}),e.jsx("button",{type:"button",className:"ce-route-action-btn",onClick:W,children:"Clear All"}),e.jsxs("span",{style:{marginLeft:"auto",fontSize:12,color:"#9ca3af",alignSelf:"center"},children:[o.allowedRoutes.length," / ",C.length," selected"]})]}),e.jsx("div",{className:"ce-route-grid",children:C.map(r=>{const s=o.allowedRoutes.includes(r);return e.jsxs("div",{className:`ce-route-pill${s?" active":""}`,onClick:()=>B(r),title:r,children:[e.jsx("div",{className:"ce-route-check",children:s&&e.jsx("svg",{width:10,height:10,viewBox:"0 0 10 10",fill:"none",children:e.jsx("path",{d:"M2 5l2.5 2.5L8 3",stroke:"#fff",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx("span",{className:"ce-route-label",children:Q(r)})]},r)})})]}),e.jsxs(w,{icon:e.jsx("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"#0ea5e9",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"})}),iconBg:"#f0f9ff",title:"Documents",children:[e.jsxs("div",{className:"ce-dropzone",children:[e.jsx("input",{type:"file",multiple:!0,onChange:D,accept:"image/*,.pdf"}),e.jsx("svg",{width:32,height:32,fill:"none",viewBox:"0 0 24 24",stroke:"#c7d2fe",strokeWidth:1.5,style:{margin:"0 auto 10px",display:"block"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"})}),e.jsxs("p",{style:{fontSize:13.5,fontWeight:600,color:"#6b7280",marginBottom:3},children:["Drop files here or ",e.jsx("span",{style:{color:"#6366f1"},children:"browse"})]}),e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"PNG, JPG, PDF accepted"})]}),p.length>0&&e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:10,marginTop:14},children:[p.map((r,s)=>e.jsx("div",{className:"ce-doc-preview",children:e.jsx("img",{src:r,alt:`doc-${s}`,style:{width:"100%",height:"100%",objectFit:"cover"}})},s)),e.jsx("div",{style:{display:"flex",alignItems:"center"},children:e.jsxs("span",{style:{fontSize:12,color:"#9ca3af"},children:[i.length," file",i.length!==1?"s":""," selected"]})})]})]}),e.jsx("div",{style:{marginTop:4},children:e.jsx("button",{type:"submit",className:"ce-submit",children:"Create Employee"})})]})]})]})}export{te as default};
