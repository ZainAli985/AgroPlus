import{j as e,S as B,N as I,A as O}from"./index-BagoE-05.js";import{b as c,R as z}from"./react-BBT0yyZ1.js";/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=(...o)=>o.filter((t,a,n)=>!!t&&t.trim()!==""&&n.indexOf(t)===a).join(" ").trim();/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=o=>o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=o=>o.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,a,n)=>n?n.toUpperCase():a.toLowerCase());/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=o=>{const t=U(o);return t.charAt(0).toUpperCase()+t.slice(1)};/**
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
 */const Z=c.forwardRef(({color:o="currentColor",size:t=24,strokeWidth:a=2,absoluteStrokeWidth:n,className:m="",children:d,iconNode:v,...f},k)=>c.createElement("svg",{ref:k,...q,width:t,height:t,stroke:o,strokeWidth:n?Number(a)*24/Number(t):a,className:A("lucide",m),...!d&&!H(f)&&{"aria-hidden":"true"},...f},[...v.map(([x,y])=>c.createElement(x,y)),...Array.isArray(d)?d:[d]]));/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=(o,t)=>{const a=c.forwardRef(({className:n,...m},d)=>c.createElement(Z,{ref:d,iconNode:t,className:A(`lucide-${_(D(o))}`,`lucide-${o}`,n),...m}));return a.displayName=D(o),a};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],J=W("eye-off",G);/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],K=W("eye",Y),Q="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",V=`
  *, *::before, *::after { box-sizing: border-box; }
  .ce { font-family: 'DM Sans', sans-serif; color: #111827; max-width: 860px; margin: 0 auto; }

  .ce-lbl { display: block; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: #6b7280; margin-bottom: 5px; }

  .ce-inp, .ce-sel {
    width: 100%; border: 1px solid #d1d5db; border-radius: 7px;
    padding: 8px 11px; font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s; appearance: none;
  }
  .ce-inp::placeholder { color: #9ca3af; }
  .ce-inp:focus, .ce-sel:focus {
    border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .ce-inp.mono { font-family: 'DM Mono', monospace; font-size: 12.5px; }
  .ce-inp.err  { border-color: #fca5a5; background: #fff5f5; }
  .ce-inp.err:focus { box-shadow: 0 0 0 2px rgba(239,68,68,.12); }

  /* section card */
  .ce-section {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; overflow: hidden; margin-bottom: 12px;
  }
  .ce-section-head {
    display: flex; align-items: center; gap: 9px;
    padding: 10px 16px; border-bottom: 1px solid #e5e7eb;
    background: #f9fafb;
  }
  .ce-section-dot { width: 7px; height: 7px; border-radius: "50%"; flex-shrink: 0; }
  .ce-section-title { font-size: 10.5px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: .08em; }
  .ce-section-badge {
    margin-left: auto; font-size: 10.5px; font-weight: 700;
    background: #f3f4f6; color: #374151; padding: "1px 7px";
    border-radius: 4px; border: 1px solid #e5e7eb;
    font-family: 'DM Mono', monospace; min-width: 22px; text-align: center;
  }
  .ce-section-body { padding: 16px; }

  /* route pills */
  .ce-route-pill {
    display: flex; align-items: center; gap: 7px; padding: 6px 9px;
    border-radius: 6px; cursor: pointer; border: 1px solid #e5e7eb;
    background: #f9fafb; transition: all .1s; user-select: none;
  }
  .ce-route-pill:hover  { border-color: #d1d5db; background: #f3f4f6; }
  .ce-route-pill.active { border-color: #d1d5db; background: #f3f4f6; }
  .ce-route-check {
    width: 13px; height: 13px; border-radius: 3px; flex-shrink: 0;
    border: 1px solid #d1d5db; background: #fff;
    display: flex; align-items: center; justify-content: center; transition: all .1s;
  }
  .ce-route-pill.active .ce-route-check { background: #111827; border-color: #111827; }
  .ce-route-label {
    font-size: 11px; font-weight: 500; color: #4b5563;
    font-family: 'DM Mono', monospace; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis;
  }
  .ce-route-pill.active .ce-route-label { color: #111827; font-weight: 600; }

  /* role card */
  .ce-role-card {
    border: 1px solid #e5e7eb; border-radius: 7px; padding: 11px 14px; cursor: pointer;
    transition: all .1s; display: flex; align-items: center; gap: 10px; background: #f9fafb;
  }
  .ce-role-card:hover { border-color: #d1d5db; }
  .ce-role-card.sel   { border-color: #d1d5db; background: #f3f4f6; }
  .ce-role-dot {
    width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid #d1d5db;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all .1s;
  }
  .ce-role-card.sel .ce-role-dot { border-color: #111827; background: #111827; }

  /* dropzone */
  .ce-dropzone {
    border: 1px dashed #d1d5db; border-radius: 8px; padding: 22px;
    text-align: center; cursor: pointer; transition: border-color .12s, background .12s;
    background: #f9fafb; position: relative;
  }
  .ce-dropzone:hover { border-color: #9ca3af; background: #f3f4f6; }
  .ce-dropzone input[type=file] { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; }

  /* password strength */
  .ce-pwd-bar { flex: 1; height: 3px; border-radius: 3px; transition: background .3s; }

  /* submit */
  .ce-submit {
    width: 100%; padding: 10px 0; border-radius: 7px; border: none;
    background: #111827; color: #fff; font-size: 13.5px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background .12s;
  }
  .ce-submit:hover:not(:disabled) { background: #1f2937; }
  .ce-submit:disabled { opacity: .6; cursor: not-allowed; }

  @keyframes ce-spin { to { transform: rotate(360deg); } }
  .ce-spin { animation: ce-spin .8s linear infinite; display: inline-block; }

  .ce-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .ce-g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
  .ce-routes-preview {
    margin-top: 12px; padding: 9px 12px; border-radius: 7px;
    background: #f0fdf4; border: 1px solid #bbf7d0;
    font-size: 11.5px; color: #15803d; font-family: 'DM Mono', monospace;
    line-height: 1.7; word-break: break-all;
  }
  @media (max-width: 640px) { .ce-g2, .ce-g3 { grid-template-columns: 1fr; } }
`,X=o=>o.replace(/^\//,"").replace(/-/g," ").replace(/\b\w/g,t=>t.toUpperCase())||"Dashboard",ee=o=>{if(!o)return{score:0,label:"",color:"#e5e7eb"};let t=0;return o.length>=8&&t++,/[A-Z]/.test(o)&&t++,/[0-9]/.test(o)&&t++,/[^A-Za-z0-9]/.test(o)&&t++,[{score:1,label:"Weak",color:"#f87171"},{score:2,label:"Fair",color:"#fb923c"},{score:3,label:"Good",color:"#34d399"},{score:4,label:"Strong",color:"#15803d"}][t-1]||{score:0,label:"",color:"#e5e7eb"}};function b({dot:o,title:t,badge:a,children:n}){return e.jsxs("div",{className:"ce-section",children:[e.jsxs("div",{className:"ce-section-head",children:[e.jsx("div",{className:"ce-section-dot",style:{background:o,borderRadius:"50%",width:7,height:7}}),e.jsx("span",{className:"ce-section-title",children:t}),a!=null&&e.jsx("span",{className:"ce-section-badge",style:{marginLeft:"auto",fontSize:10.5,fontWeight:700,background:"#f3f4f6",color:"#374151",padding:"1px 7px",borderRadius:4,border:"1px solid #e5e7eb",fontFamily:"'DM Mono',monospace"},children:a})]}),e.jsx("div",{className:"ce-section-body",children:n})]})}function h({label:o,error:t,children:a}){return e.jsxs("div",{children:[o&&e.jsx("label",{className:"ce-lbl",children:o}),a,t&&e.jsx("p",{style:{fontSize:11,color:"#ef4444",marginTop:3,fontWeight:500},children:t})]})}function te(){const[o,t]=c.useState({firstName:"",lastName:"",cnic:"",address:"",mobile:"+92",email:"",role:"",password:"",allowedRoutes:[]}),[a,n]=c.useState([]),[m,d]=c.useState([]),[v,f]=c.useState(""),[k,x]=c.useState(""),[y,E]=c.useState(!1),[g,N]=c.useState({}),[M,R]=c.useState(!1),L=["/dashboard","/create-account","/view-accounts","/ledger","/general-entries","/view-general-entries","/products","/products/new","/add-invoice-purchase","/view-purchase-invoices","/add-invoice-sales","/view-sales-invoices","/trialbalance","/balancesheet","/incomestatement","/cashbook","/cashbook-report","/employees","/employees/new","/weight-bridge","/weight-bridge/invoices"],w=z.useMemo(()=>{try{return JSON.parse(localStorage.getItem("allowedRoutes"))||[]}catch{return[]}},[]),S=z.useMemo(()=>!w.length||w.includes("*")?L:L.filter(r=>w.includes(r)),[w]),$=[{value:"Accountant",label:"Accountant",desc:"Full financial access"},{value:"Worker",label:"Worker",desc:"Limited operational access"}],u=r=>{const{name:s,value:p}=r.target;if(N(i=>({...i,[s]:""})),s==="cnic"){const i=p.replace(/\D/g,"").slice(0,13);let l=i;i.length>5&&(l=`${i.slice(0,5)}-${i.slice(5)}`),i.length>12&&(l=`${i.slice(0,5)}-${i.slice(5,12)}-${i.slice(12)}`),t(C=>({...C,cnic:l}));return}if(s==="mobile"){let i=p.replace(/\D/g,"");i.startsWith("92")&&(i=i.slice(2)),i.length>10&&(i=i.slice(0,10)),t(l=>({...l,mobile:`+92${i}`}));return}t(i=>({...i,[s]:p}))},F=r=>t(s=>({...s,allowedRoutes:s.allowedRoutes.includes(r)?s.allowedRoutes.filter(p=>p!==r):[...s.allowedRoutes,r]})),P=r=>{const s=Array.from(r.target.files);n(s),d(s.map(p=>URL.createObjectURL(p)))},T=async r=>{r.preventDefault();const s={};if(o.cnic.replace(/\D/g,"").length!==13&&(s.cnic="Must be exactly 13 digits"),o.mobile.replace(/\D/g,"").slice(2).length!==10&&(s.mobile="Must be 10 digits after +92"),o.role||(s.role="Please select a role"),Object.keys(s).length){N(s);return}const p=localStorage.getItem("token"),i=new FormData;["firstName","lastName","cnic","address","mobile","email","role","password"].forEach(l=>i.append(l,o[l])),i.append("allowedRoutes",JSON.stringify(o.allowedRoutes)),o.allowedRoutes.forEach(l=>i.append("allowedRoutes[]",l)),a.forEach(l=>i.append("documents",l)),R(!0);try{const l=await fetch(`${O}/employees`,{method:"POST",headers:{Authorization:`Bearer ${p}`},body:i}),C=await l.json();l.ok?(f(`Employee created — ${o.allowedRoutes.length} route(s) assigned`),x("success"),t({firstName:"",lastName:"",cnic:"",address:"",mobile:"+92",email:"",role:"",password:"",allowedRoutes:[]}),n([]),d([])):(f(C.message||"Failed to create employee"),x("error"))}catch{f("Server error"),x("error")}finally{R(!1),setTimeout(()=>f(""),4e3)}},j=ee(o.password);return e.jsxs(B,{children:[e.jsxs("style",{children:[Q,V]}),e.jsx(I,{message:v,type:k}),e.jsxs("div",{className:"ce",children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"HR Management"}),e.jsx("h1",{style:{fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px",margin:0},children:"Create New Employee"})]}),e.jsxs("form",{onSubmit:T,style:{display:"flex",flexDirection:"column"},children:[e.jsxs(b,{dot:"#3b82f6",title:"Personal Information",children:[e.jsxs("div",{className:"ce-g2",style:{marginBottom:12},children:[e.jsx(h,{label:"First Name",children:e.jsx("input",{name:"firstName",value:o.firstName,onChange:u,placeholder:"e.g. Muhammad",className:"ce-inp",required:!0})}),e.jsx(h,{label:"Last Name",children:e.jsx("input",{name:"lastName",value:o.lastName,onChange:u,placeholder:"e.g. Ali",className:"ce-inp",required:!0})})]}),e.jsxs("div",{className:"ce-g2",style:{marginBottom:12},children:[e.jsx(h,{label:"CNIC",error:g.cnic,children:e.jsx("input",{name:"cnic",value:o.cnic,onChange:u,placeholder:"xxxxx-xxxxxxx-x",className:`ce-inp mono${g.cnic?" err":""}`,required:!0})}),e.jsx(h,{label:"Mobile",error:g.mobile,children:e.jsx("input",{name:"mobile",value:o.mobile,onChange:u,className:`ce-inp mono${g.mobile?" err":""}`,required:!0})})]}),e.jsxs("div",{className:"ce-g2",children:[e.jsx(h,{label:"Email Address",children:e.jsx("input",{name:"email",type:"email",value:o.email,onChange:u,placeholder:"name@example.com",className:"ce-inp",required:!0})}),e.jsx(h,{label:"Home Address",children:e.jsx("input",{name:"address",value:o.address,onChange:u,placeholder:"Street, City",className:"ce-inp"})})]})]}),e.jsxs(b,{dot:"#f59e0b",title:"Role & Access Level",children:[g.role&&e.jsx("p",{style:{fontSize:11.5,color:"#ef4444",marginBottom:10,fontWeight:500},children:g.role}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9},children:$.map(r=>e.jsxs("div",{className:`ce-role-card${o.role===r.value?" sel":""}`,onClick:()=>{t(s=>({...s,role:r.value})),N(s=>({...s,role:""}))},children:[e.jsx("div",{className:"ce-role-dot",children:o.role===r.value&&e.jsx("svg",{width:8,height:8,viewBox:"0 0 10 10",fill:"none",children:e.jsx("path",{d:"M2 5l2.5 2.5L8 3",stroke:"#fff",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:13,fontWeight:600,color:o.role===r.value?"#111827":"#374151"},children:r.label}),e.jsx("div",{style:{fontSize:11.5,color:"#9ca3af",marginTop:1},children:r.desc})]})]},r.value))})]}),e.jsx(b,{dot:"#10b981",title:"Login Credentials",children:e.jsx("div",{style:{maxWidth:420},children:e.jsxs(h,{label:"Password",children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("input",{name:"password",type:y?"text":"password",value:o.password,onChange:u,placeholder:"Min. 8 characters",className:"ce-inp",style:{paddingRight:42},required:!0}),e.jsx("button",{type:"button",onClick:()=>E(r=>!r),style:{position:"absolute",right:11,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#9ca3af",display:"flex",alignItems:"center",transition:"color .12s"},onMouseEnter:r=>r.currentTarget.style.color="#374151",onMouseLeave:r=>r.currentTarget.style.color="#9ca3af",children:y?e.jsx(J,{size:16}):e.jsx(K,{size:16})})]}),o.password&&e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:3,marginTop:6},children:[1,2,3,4].map(r=>e.jsx("div",{className:"ce-pwd-bar",style:{background:r<=j.score?j.color:"#f3f4f6"}},r))}),e.jsx("p",{style:{fontSize:10.5,marginTop:3,fontWeight:600,color:j.color},children:j.label})]})]})})}),e.jsxs(b,{dot:"#8b5cf6",title:"Page Permissions",badge:o.allowedRoutes.length,children:[e.jsxs("div",{style:{display:"flex",gap:7,marginBottom:10},children:[e.jsx("button",{type:"button",onClick:()=>t(r=>({...r,allowedRoutes:[...S]})),style:{fontSize:11.5,fontWeight:500,padding:"4px 10px",borderRadius:5,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",fontFamily:"'DM Sans',sans-serif",cursor:"pointer"},children:"Select All"}),e.jsx("button",{type:"button",onClick:()=>t(r=>({...r,allowedRoutes:[]})),style:{fontSize:11.5,fontWeight:500,padding:"4px 10px",borderRadius:5,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",fontFamily:"'DM Sans',sans-serif",cursor:"pointer"},children:"Clear All"}),e.jsxs("span",{style:{marginLeft:"auto",fontSize:11.5,color:"#9ca3af",alignSelf:"center"},children:[o.allowedRoutes.length," / ",S.length]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:5,maxHeight:230,overflowY:"auto",scrollbarWidth:"thin"},children:S.map(r=>{const s=o.allowedRoutes.includes(r);return e.jsxs("div",{className:`ce-route-pill${s?" active":""}`,onClick:()=>F(r),title:r,children:[e.jsx("div",{className:"ce-route-check",children:s&&e.jsx("svg",{width:8,height:8,viewBox:"0 0 10 10",fill:"none",children:e.jsx("path",{d:"M2 5l2.5 2.5L8 3",stroke:"#fff",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx("span",{className:"ce-route-label",children:X(r)})]},r)})}),o.allowedRoutes.length>0&&e.jsxs("div",{className:"ce-routes-preview",children:[e.jsx("strong",{style:{fontFamily:"'DM Sans',sans-serif"},children:"Will be assigned: "}),o.allowedRoutes.join(", ")]})]}),e.jsxs(b,{dot:"#0ea5e9",title:"Documents",children:[e.jsxs("div",{className:"ce-dropzone",children:[e.jsx("input",{type:"file",multiple:!0,onChange:P,accept:"image/*,.pdf"}),e.jsx("svg",{width:28,height:28,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:1.5,style:{margin:"0 auto 9px",display:"block"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"})}),e.jsxs("p",{style:{fontSize:13,fontWeight:500,color:"#6b7280",margin:"0 0 3px"},children:["Drop files here or ",e.jsx("span",{style:{color:"#374151",fontWeight:600},children:"browse"})]}),e.jsx("p",{style:{fontSize:11.5,color:"#9ca3af",margin:0},children:"PNG, JPG, PDF accepted"})]}),m.length>0&&e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:9,marginTop:12,alignItems:"center"},children:[m.map((r,s)=>e.jsx("div",{style:{width:56,height:56,borderRadius:7,border:"1px solid #e5e7eb",overflow:"hidden",flexShrink:0},children:e.jsx("img",{src:r,alt:`doc-${s}`,style:{width:"100%",height:"100%",objectFit:"cover"}})},s)),e.jsxs("span",{style:{fontSize:12,color:"#9ca3af"},children:[a.length," file",a.length!==1?"s":""," selected"]})]})]}),e.jsx("div",{style:{marginTop:4},children:e.jsx("button",{type:"submit",className:"ce-submit",disabled:M,children:M?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ce-spin",children:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})})," Creating Employee…"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4v16m8-8H4"})})," Create Employee"]})})})]})]})]})}export{te as default};
