import{a as c,R as z,j as e}from"./vendor-react-CVRJsYjy.js";import{S as T,N as P,A as $}from"./index-DAaqPt1z.js";import{a as B,b as q}from"./vendor-D8Rt7Tv7.js";import"./vendor-react-dom-BIx1r6lP.js";const O="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",I=`
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
`,H=s=>s.replace(/^\//,"").replace(/-/g," ").replace(/\b\w/g,i=>i.toUpperCase())||"Dashboard",U=s=>{if(!s)return{score:0,label:"",color:"#e5e7eb"};let i=0;return s.length>=8&&i++,/[A-Z]/.test(s)&&i++,/[0-9]/.test(s)&&i++,/[^A-Za-z0-9]/.test(s)&&i++,[{score:1,label:"Weak",color:"#f87171"},{score:2,label:"Fair",color:"#fb923c"},{score:3,label:"Good",color:"#34d399"},{score:4,label:"Strong",color:"#15803d"}][i-1]||{score:0,label:"",color:"#e5e7eb"}};function u({dot:s,title:i,badge:n,children:h}){return e.jsxs("div",{className:"ce-section",children:[e.jsxs("div",{className:"ce-section-head",children:[e.jsx("div",{className:"ce-section-dot",style:{background:s,borderRadius:"50%",width:7,height:7}}),e.jsx("span",{className:"ce-section-title",children:i}),n!=null&&e.jsx("span",{className:"ce-section-badge",style:{marginLeft:"auto",fontSize:10.5,fontWeight:700,background:"#f3f4f6",color:"#374151",padding:"1px 7px",borderRadius:4,border:"1px solid #e5e7eb",fontFamily:"'DM Mono',monospace"},children:n})]}),e.jsx("div",{className:"ce-section-body",children:h})]})}function p({label:s,error:i,children:n}){return e.jsxs("div",{children:[s&&e.jsx("label",{className:"ce-lbl",children:s}),n,i&&e.jsx("p",{style:{fontSize:11,color:"#ef4444",marginTop:3,fontWeight:500},children:i})]})}function Z(){const[s,i]=c.useState({firstName:"",lastName:"",cnic:"",address:"",mobile:"+92",email:"",role:"",password:"",allowedRoutes:[]}),[n,h]=c.useState([]),[v,k]=c.useState([]),[C,m]=c.useState(""),[D,b]=c.useState(""),[S,L]=c.useState(!1),[f,y]=c.useState({}),[N,M]=c.useState(!1),R=["/dashboard","/create-account","/view-accounts","/ledger","/general-entries","/view-general-entries","/products","/products/new","/add-invoice-purchase","/view-purchase-invoices","/purchase-quotation","/add-invoice-sales","/view-sales-invoices","/sales-quotation","/trialbalance","/balancesheet","/incomestatement","/cashbook","/cashbook-report","/employees","/employees/new","/weight-bridge","/weight-bridge/invoices","/cheque-book/create","/cheque-book/entry","/cheque-book/view","/stock"],g=z.useMemo(()=>{try{return JSON.parse(localStorage.getItem("allowedRoutes"))||[]}catch{return[]}},[]),j=z.useMemo(()=>!g.length||g.includes("*")?R:R.filter(o=>g.includes(o)),[g]),W=[{value:"Accountant",label:"Accountant",desc:"Full financial access"},{value:"Worker",label:"Worker",desc:"Limited operational access"}],d=o=>{const{name:r,value:a}=o.target;if(y(t=>({...t,[r]:""})),r==="cnic"){const t=a.replace(/\D/g,"").slice(0,13);let l=t;t.length>5&&(l=`${t.slice(0,5)}-${t.slice(5)}`),t.length>12&&(l=`${t.slice(0,5)}-${t.slice(5,12)}-${t.slice(12)}`),i(w=>({...w,cnic:l}));return}if(r==="mobile"){let t=a.replace(/\D/g,"");t.startsWith("92")&&(t=t.slice(2)),t.length>10&&(t=t.slice(0,10)),i(l=>({...l,mobile:`+92${t}`}));return}i(t=>({...t,[r]:a}))},A=o=>i(r=>({...r,allowedRoutes:r.allowedRoutes.includes(o)?r.allowedRoutes.filter(a=>a!==o):[...r.allowedRoutes,o]})),E=o=>{const r=Array.from(o.target.files);h(r),k(r.map(a=>URL.createObjectURL(a)))},F=async o=>{o.preventDefault();const r={};if(s.cnic.replace(/\D/g,"").length!==13&&(r.cnic="Must be exactly 13 digits"),s.mobile.replace(/\D/g,"").slice(2).length!==10&&(r.mobile="Must be 10 digits after +92"),s.role||(r.role="Please select a role"),Object.keys(r).length){y(r);return}const a=localStorage.getItem("token"),t=new FormData;["firstName","lastName","cnic","address","mobile","email","role","password"].forEach(l=>t.append(l,s[l])),t.append("allowedRoutes",JSON.stringify(s.allowedRoutes)),s.allowedRoutes.forEach(l=>t.append("allowedRoutes[]",l)),n.forEach(l=>t.append("documents",l)),M(!0);try{const l=await fetch(`${$}/employees`,{method:"POST",headers:{Authorization:`Bearer ${a}`},body:t}),w=await l.json();l.ok?(m(`Employee created — ${s.allowedRoutes.length} route(s) assigned`),b("success"),i({firstName:"",lastName:"",cnic:"",address:"",mobile:"+92",email:"",role:"",password:"",allowedRoutes:[]}),h([]),k([])):(m(w.message||"Failed to create employee"),b("error"))}catch{m("Server error"),b("error")}finally{M(!1),setTimeout(()=>m(""),4e3)}},x=U(s.password);return e.jsxs(T,{children:[e.jsxs("style",{children:[O,I]}),e.jsx(P,{message:C,type:D}),e.jsxs("div",{className:"ce",children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"HR Management"}),e.jsx("h1",{style:{fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px",margin:0},children:"Create New Employee"})]}),e.jsxs("form",{onSubmit:F,style:{display:"flex",flexDirection:"column"},children:[e.jsxs(u,{dot:"#3b82f6",title:"Personal Information",children:[e.jsxs("div",{className:"ce-g2",style:{marginBottom:12},children:[e.jsx(p,{label:"First Name",children:e.jsx("input",{name:"firstName",value:s.firstName,onChange:d,placeholder:"e.g. Muhammad",className:"ce-inp",required:!0})}),e.jsx(p,{label:"Last Name",children:e.jsx("input",{name:"lastName",value:s.lastName,onChange:d,placeholder:"e.g. Ali",className:"ce-inp",required:!0})})]}),e.jsxs("div",{className:"ce-g2",style:{marginBottom:12},children:[e.jsx(p,{label:"CNIC",error:f.cnic,children:e.jsx("input",{name:"cnic",value:s.cnic,onChange:d,placeholder:"xxxxx-xxxxxxx-x",className:`ce-inp mono${f.cnic?" err":""}`,required:!0})}),e.jsx(p,{label:"Mobile",error:f.mobile,children:e.jsx("input",{name:"mobile",value:s.mobile,onChange:d,className:`ce-inp mono${f.mobile?" err":""}`,required:!0})})]}),e.jsxs("div",{className:"ce-g2",children:[e.jsx(p,{label:"Email Address",children:e.jsx("input",{name:"email",type:"email",value:s.email,onChange:d,placeholder:"name@example.com",className:"ce-inp",required:!0})}),e.jsx(p,{label:"Home Address",children:e.jsx("input",{name:"address",value:s.address,onChange:d,placeholder:"Street, City",className:"ce-inp"})})]})]}),e.jsxs(u,{dot:"#f59e0b",title:"Role & Access Level",children:[f.role&&e.jsx("p",{style:{fontSize:11.5,color:"#ef4444",marginBottom:10,fontWeight:500},children:f.role}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9},children:W.map(o=>e.jsxs("div",{className:`ce-role-card${s.role===o.value?" sel":""}`,onClick:()=>{i(r=>({...r,role:o.value})),y(r=>({...r,role:""}))},children:[e.jsx("div",{className:"ce-role-dot",children:s.role===o.value&&e.jsx("svg",{width:8,height:8,viewBox:"0 0 10 10",fill:"none",children:e.jsx("path",{d:"M2 5l2.5 2.5L8 3",stroke:"#fff",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:13,fontWeight:600,color:s.role===o.value?"#111827":"#374151"},children:o.label}),e.jsx("div",{style:{fontSize:11.5,color:"#9ca3af",marginTop:1},children:o.desc})]})]},o.value))})]}),e.jsx(u,{dot:"#10b981",title:"Login Credentials",children:e.jsx("div",{style:{maxWidth:420},children:e.jsxs(p,{label:"Password",children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("input",{name:"password",type:S?"text":"password",value:s.password,onChange:d,placeholder:"Min. 8 characters",className:"ce-inp",style:{paddingRight:42},required:!0}),e.jsx("button",{type:"button",onClick:()=>L(o=>!o),style:{position:"absolute",right:11,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#9ca3af",display:"flex",alignItems:"center",transition:"color .12s"},onMouseEnter:o=>o.currentTarget.style.color="#374151",onMouseLeave:o=>o.currentTarget.style.color="#9ca3af",children:S?e.jsx(B,{size:16}):e.jsx(q,{size:16})})]}),s.password&&e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:3,marginTop:6},children:[1,2,3,4].map(o=>e.jsx("div",{className:"ce-pwd-bar",style:{background:o<=x.score?x.color:"#f3f4f6"}},o))}),e.jsx("p",{style:{fontSize:10.5,marginTop:3,fontWeight:600,color:x.color},children:x.label})]})]})})}),e.jsxs(u,{dot:"#8b5cf6",title:"Page Permissions",badge:s.allowedRoutes.length,children:[e.jsxs("div",{style:{display:"flex",gap:7,marginBottom:10},children:[e.jsx("button",{type:"button",onClick:()=>i(o=>({...o,allowedRoutes:[...j]})),style:{fontSize:11.5,fontWeight:500,padding:"4px 10px",borderRadius:5,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",fontFamily:"'DM Sans',sans-serif",cursor:"pointer"},children:"Select All"}),e.jsx("button",{type:"button",onClick:()=>i(o=>({...o,allowedRoutes:[]})),style:{fontSize:11.5,fontWeight:500,padding:"4px 10px",borderRadius:5,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",fontFamily:"'DM Sans',sans-serif",cursor:"pointer"},children:"Clear All"}),e.jsxs("span",{style:{marginLeft:"auto",fontSize:11.5,color:"#9ca3af",alignSelf:"center"},children:[s.allowedRoutes.length," / ",j.length]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:5,maxHeight:230,overflowY:"auto",scrollbarWidth:"thin"},children:j.map(o=>{const r=s.allowedRoutes.includes(o);return e.jsxs("div",{className:`ce-route-pill${r?" active":""}`,onClick:()=>A(o),title:o,children:[e.jsx("div",{className:"ce-route-check",children:r&&e.jsx("svg",{width:8,height:8,viewBox:"0 0 10 10",fill:"none",children:e.jsx("path",{d:"M2 5l2.5 2.5L8 3",stroke:"#fff",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx("span",{className:"ce-route-label",children:H(o)})]},o)})}),s.allowedRoutes.length>0&&e.jsxs("div",{className:"ce-routes-preview",children:[e.jsx("strong",{style:{fontFamily:"'DM Sans',sans-serif"},children:"Will be assigned: "}),s.allowedRoutes.join(", ")]})]}),e.jsxs(u,{dot:"#0ea5e9",title:"Documents",children:[e.jsxs("div",{className:"ce-dropzone",children:[e.jsx("input",{type:"file",multiple:!0,onChange:E,accept:"image/*,.pdf"}),e.jsx("svg",{width:28,height:28,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:1.5,style:{margin:"0 auto 9px",display:"block"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"})}),e.jsxs("p",{style:{fontSize:13,fontWeight:500,color:"#6b7280",margin:"0 0 3px"},children:["Drop files here or ",e.jsx("span",{style:{color:"#374151",fontWeight:600},children:"browse"})]}),e.jsx("p",{style:{fontSize:11.5,color:"#9ca3af",margin:0},children:"PNG, JPG, PDF accepted"})]}),v.length>0&&e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:9,marginTop:12,alignItems:"center"},children:[v.map((o,r)=>e.jsx("div",{style:{width:56,height:56,borderRadius:7,border:"1px solid #e5e7eb",overflow:"hidden",flexShrink:0},children:e.jsx("img",{src:o,alt:`doc-${r}`,style:{width:"100%",height:"100%",objectFit:"cover"}})},r)),e.jsxs("span",{style:{fontSize:12,color:"#9ca3af"},children:[n.length," file",n.length!==1?"s":""," selected"]})]})]}),e.jsx("div",{style:{marginTop:4},children:e.jsx("button",{type:"submit",className:"ce-submit",disabled:N,children:N?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ce-spin",children:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})})," Creating Employee…"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4v16m8-8H4"})})," Create Employee"]})})})]})]})]})}export{Z as default};
