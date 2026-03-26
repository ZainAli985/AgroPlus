import{j as e,S as re,N as de,A as y}from"./index-BagoE-05.js";import{b as a,R as ce}from"./react-BBT0yyZ1.js";const fe="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",pe=`
  *, *::before, *::after { box-sizing: border-box; }
  .ve { font-family: 'DM Sans', sans-serif; color: #111827; }

  .ve-inp, .ve-sel {
    width: 100%; border: 1px solid #d1d5db; border-radius: 6px;
    padding: 7px 10px; font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s; appearance: none;
  }
  .ve-inp::placeholder { color: #9ca3af; }
  .ve-inp:focus, .ve-sel:focus {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .ve-inp.mono { font-family: 'DM Mono', monospace; font-size: 12.5px; }

  .ve-sel-wrap { position: relative; }
  .ve-sel-wrap::after {
    content: ''; position: absolute; right: 10px; top: 50%;
    transform: translateY(-50%); pointer-events: none;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #9ca3af;
  }

  /* table */
  .ve-table { width: 100%; border-collapse: collapse; }
  .ve-table thead tr { background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
  .ve-table thead th {
    padding: 9px 14px; font-size: 10px; font-weight: 700;
    font-family: 'DM Sans', sans-serif; text-transform: uppercase;
    letter-spacing: .07em; color: #9ca3af; text-align: left;
    white-space: nowrap; border: none;
  }
  .ve-table thead th:last-child { text-align: center; }
  .ve-table tbody tr { background: #fff; border-bottom: 1px solid #f3f4f6; transition: background .08s; }
  .ve-table tbody tr:last-child { border-bottom: none; }
  .ve-table tbody tr:hover { background: #fafafa; }
  .ve-table tbody td { padding: 12px 14px; font-size: 13px; color: #374151; vertical-align: middle; }
  .ve-table tbody td.mono { font-family: 'DM Mono', monospace; font-size: 12px; color: #6b7280; }

  /* avatar */
  .ve-avatar {
    width: 32px; height: 32px; border-radius: 8px; display: flex;
    align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; flex-shrink: 0; color: #fff;
  }

  /* status badge */
  .ve-status { display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px;
    border-radius: 5px; font-size: 11.5px; font-weight: 600; white-space: nowrap; }
  .ve-status.active   { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
  .ve-status.inactive { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }

  /* role badge */
  .ve-role { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11.5px; font-weight: 600; }
  .ve-role.admin      { background: #eff6ff; color: #1d4ed8; }
  .ve-role.accountant { background: #fefce8; color: #854d0e; }
  .ve-role.worker     { background: #f3f4f6; color: #374151; }

  /* action buttons */
  .ve-btn {
    display: inline-flex; align-items: center; gap: 5px; padding: 5px 10px;
    border-radius: 6px; border: 1px solid transparent; font-size: 11.5px; font-weight: 500;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    transition: all .1s; white-space: nowrap;
  }
  .ve-btn.toggle-on  { background: #fff7ed; color: #c2410c; border-color: #fed7aa; }
  .ve-btn.toggle-on:hover  { background: #ffedd5; }
  .ve-btn.toggle-off { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
  .ve-btn.toggle-off:hover { background: #dcfce7; }
  .ve-btn.edit  { background: #fff; color: #374151; border-color: #d1d5db; }
  .ve-btn.edit:hover  { background: #f9fafb; }
  .ve-btn.del   { background: #fff; color: #dc2626; border-color: #fecaca; }
  .ve-btn.del:hover   { background: #fef2f2; }

  /* doc badge */
  .ve-doc-badge {
    display: inline-flex; align-items: center; gap: 3px;
    padding: 1px 7px; border-radius: 4px; font-size: 10.5px; font-weight: 600;
    background: #f0f9ff; color: #0369a1; border: 1px solid #bae6fd;
    margin-left: 6px; cursor: pointer; transition: background .1s; vertical-align: middle;
  }
  .ve-doc-badge:hover { background: #e0f2fe; }

  /* modal */
  .ve-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,.4);
    display: flex; align-items: center; justify-content: center;
    z-index: 50; padding: 20px;
  }
  @keyframes ve-modal-in { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }
  .ve-modal {
    background: #fff; border-radius: 10px; width: 100%;
    box-shadow: 0 16px 48px rgba(0,0,0,.14); animation: ve-modal-in .18s ease-out;
    display: flex; flex-direction: column; overflow: hidden;
    border: 1px solid #e5e7eb;
  }
  .ve-modal-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 20px; border-bottom: 1px solid #e5e7eb; background: #fff; flex-shrink: 0;
  }
  .ve-modal-body  { padding: 20px; overflow-y: auto; flex: 1; min-height: 0; }
  .ve-modal-foot  {
    display: flex; justify-content: flex-end; gap: 8px;
    padding: 12px 20px; border-top: 1px solid #f3f4f6;
    background: #f9fafb; flex-shrink: 0;
  }

  .ve-modal-cancel {
    padding: 8px 16px; border-radius: 7px; border: 1px solid #e5e7eb;
    background: #fff; font-size: 13px; font-weight: 500; color: #374151;
    font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all .1s;
  }
  .ve-modal-cancel:hover { background: #f9fafb; }
  .ve-modal-save {
    padding: 8px 18px; border-radius: 7px; border: none;
    background: #111827; color: #fff;
    font-size: 13px; font-weight: 600; font-family: 'DM Sans', sans-serif;
    cursor: pointer; transition: background .12s;
    display: inline-flex; align-items: center; gap: 7px;
  }
  .ve-modal-save:hover { background: #1f2937; }
  .ve-modal-save:disabled { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; }
  .ve-modal-del {
    padding: 8px 18px; border-radius: 7px; border: none;
    background: #dc2626; color: #fff;
    font-size: 13px; font-weight: 600; font-family: 'DM Sans', sans-serif;
    cursor: pointer; transition: background .12s;
  }
  .ve-modal-del:hover { background: #b91c1c; }

  /* section labels */
  .ve-slbl {
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .08em; color: #9ca3af; margin-bottom: 10px;
    padding-bottom: 6px; border-bottom: 1px solid #f3f4f6;
    display: flex; align-items: center; justify-content: space-between;
  }
  .ve-flbl {
    display: block; font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: #6b7280; margin-bottom: 5px;
  }

  /* route pills */
  .ve-route-pill {
    display: flex; align-items: center; gap: 7px; padding: 6px 9px;
    border-radius: 6px; cursor: pointer; border: 1px solid #e5e7eb;
    background: #f9fafb; transition: all .1s; user-select: none;
  }
  .ve-route-pill:hover  { border-color: #d1d5db; background: #f3f4f6; }
  .ve-route-pill.active { border-color: #d1d5db; background: #f3f4f6; }
  .ve-route-check {
    width: 14px; height: 14px; border-radius: 3px; flex-shrink: 0;
    border: 1px solid #d1d5db; background: #fff;
    display: flex; align-items: center; justify-content: center; transition: all .1s;
  }
  .ve-route-pill.active .ve-route-check { background: #111827; border-color: #111827; }
  .ve-route-text {
    font-size: 11px; font-weight: 500; color: #4b5563;
    font-family: 'DM Mono', monospace; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis;
  }
  .ve-route-pill.active .ve-route-text { color: #111827; font-weight: 600; }

  /* doc card */
  .ve-doc-card {
    display: flex; flex-direction: column; border-radius: 8px;
    border: 1px solid #e5e7eb; overflow: hidden;
    transition: box-shadow .12s; background: #fff; width: 110px; flex-shrink: 0;
  }
  .ve-doc-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,.08); }
  .ve-doc-thumb { width: 110px; height: 80px; object-fit: cover; display: block; cursor: zoom-in; }
  .ve-doc-placeholder {
    width: 110px; height: 80px; display: flex; flex-direction: column;
    align-items: center; justify-content: center; background: #f9fafb;
    gap: 4px; cursor: pointer;
  }
  .ve-doc-foot {
    padding: 5px 7px; border-top: 1px solid #f3f4f6;
    display: flex; align-items: center; gap: 4px;
  }
  .ve-doc-fname {
    font-size: 10px; font-weight: 500; color: #374151;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1;
  }
  .ve-doc-btn {
    display: inline-flex; align-items: center; justify-content: center;
    width: 18px; height: 18px; border-radius: 4px; flex-shrink: 0;
    border: none; cursor: pointer; transition: background .1s; text-decoration: none;
    font-size: 10px;
  }

  /* lightbox */
  .ve-lightbox {
    position: fixed; inset: 0; background: rgba(0,0,0,.88);
    display: flex; align-items: center; justify-content: center;
    z-index: 200; padding: 24px; cursor: zoom-out;
  }

  /* skeleton */
  @keyframes ve-shimmer { to { background-position: -200% 0; } }
  .ve-skel {
    background: linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%);
    background-size: 200% 100%; animation: ve-shimmer 1.3s infinite; border-radius: 5px;
  }

  @keyframes ve-spin { to { transform: rotate(360deg); } }
  .ve-spin-ico { display: inline-block; animation: ve-spin 1s linear infinite; }

  .ve-empty { text-align: center; padding: 56px 20px; color: #9ca3af; }
  .ve-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  @media (max-width: 600px) { .ve-g2 { grid-template-columns: 1fr; } }

  .ve-docs-empty {
    padding: 18px; border-radius: 8px; border: 1px dashed #e5e7eb;
    text-align: center; color: #9ca3af; background: #fafafa;
  }

  /* role selector in modal */
  .ve-role-opt {
    padding: 9px 12px; border-radius: 7px; cursor: pointer;
    border: 1px solid #e5e7eb; background: #f9fafb;
    display: flex; align-items: center; gap: 8px; transition: all .1s;
  }
  .ve-role-opt:hover  { border-color: #d1d5db; }
  .ve-role-opt.sel    { border-color: #d1d5db; background: #f3f4f6; }
  .ve-role-radio {
    width: 14px; height: 14px; border-radius: "50%"; flex-shrink: 0;
    border: 1.5px solid #d1d5db; background: #fff;
    display: flex; align-items: center; justify-content: center; transition: all .1s;
  }
  .ve-role-opt.sel .ve-role-radio { border-color: #111827; background: #111827; }
`,V=["#374151","#1d4ed8","#15803d","#b45309","#7c3aed","#0e7490","#be185d"],Y=n=>V[(n?.charCodeAt(0)||0)%V.length],O=(n,i)=>`${n?.[0]||""}${i?.[0]||""}`.toUpperCase(),he=n=>n.replace(/^\//,"").replace(/-/g," ").replace(/\b\w/g,i=>i.toUpperCase())||"Dashboard",xe=n=>/\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(n||""),ge=n=>n.name||n.fileUrl?.split("/").pop()||"Document",W=["/dashboard","/create-account","/view-accounts","/ledger","/general-entries","/products","/products/new","/add-invoice-purchase","/view-purchase-invoices","/add-invoice-sales","/view-sales-invoices","/stock-management","/trialbalance","/balancesheet","/incomestatement","/weight-bridge","/weight-bridge/invoices","/cashbook","/cashbook-report"],$=()=>e.jsx("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})});function me({doc:n,url:i,onPreview:f}){const l=ge(n),v=xe(i),[p,k]=ce.useState(!1);return e.jsxs("div",{className:"ve-doc-card",children:[v&&!p?e.jsx("img",{src:i,alt:l,className:"ve-doc-thumb",onClick:()=>f(i,l),onError:()=>k(!0)}):e.jsxs("div",{className:"ve-doc-placeholder",onClick:()=>window.open(i,"_blank"),children:[e.jsx("svg",{width:22,height:22,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:1.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),e.jsx("span",{style:{fontSize:9,color:"#9ca3af",fontWeight:700,textTransform:"uppercase",letterSpacing:".05em"},children:i.split(".").pop()?.toUpperCase().slice(0,6)||"FILE"})]}),e.jsxs("div",{className:"ve-doc-foot",children:[e.jsx("span",{className:"ve-doc-fname",title:l,children:l}),e.jsx("a",{href:i,target:"_blank",rel:"noopener noreferrer",className:"ve-doc-btn",style:{background:"#f0f9ff",color:"#0369a1"},onClick:h=>h.stopPropagation(),children:e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"})})})]})]})}function ve({src:n,name:i,onClose:f}){return a.useEffect(()=>{const l=v=>{v.key==="Escape"&&f()};return window.addEventListener("keydown",l),()=>window.removeEventListener("keydown",l)},[f]),e.jsx("div",{className:"ve-lightbox",onClick:f,children:e.jsxs("div",{style:{position:"relative",maxWidth:"88vw",maxHeight:"88vh"},onClick:l=>l.stopPropagation(),children:[e.jsx("img",{src:n,alt:i,style:{maxWidth:"88vw",maxHeight:"84vh",borderRadius:8,objectFit:"contain",display:"block",boxShadow:"0 24px 64px rgba(0,0,0,.5)"}}),e.jsxs("div",{style:{position:"absolute",bottom:-32,left:0,right:0,display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:12.5,color:"rgba(255,255,255,.6)"},children:i}),e.jsx("span",{style:{fontSize:11,color:"rgba(255,255,255,.3)"},children:"Esc or click to close"})]}),e.jsx("button",{onClick:f,style:{position:"absolute",top:-10,right:-10,width:26,height:26,borderRadius:"50%",background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.18)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"},children:e.jsx($,{})})]})})}const A={display:"block",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#6b7280",marginBottom:5};function je(){const n=localStorage.getItem("token"),[i,f]=a.useState([]),[l,v]=a.useState([]),[p,k]=a.useState(""),[h,R]=a.useState(""),[u,B]=a.useState(""),[S,I]=a.useState(!0),[J,x]=a.useState(""),[q,g]=a.useState(""),[r,F]=a.useState(null),[d,m]=a.useState({}),[G,T]=a.useState(!1),[K,C]=a.useState(!1),[Q,M]=a.useState(null),[X,H]=a.useState(""),[z,P]=a.useState(null),[L,_]=a.useState(!1),w=async()=>{try{I(!0);const t=await(await fetch(`${y}/employees`,{headers:{Authorization:`Bearer ${n}`}})).json();f(t),v(t)}catch{x("Failed to load employees"),g("error")}finally{I(!1)}};a.useEffect(()=>{w()},[]),a.useEffect(()=>{let o=[...i];p&&(o=o.filter(t=>`${t.firstName} ${t.lastName} ${t.email} ${t.cnic}`.toLowerCase().includes(p.toLowerCase()))),h&&(o=o.filter(t=>t.role===h)),u&&(o=o.filter(t=>t.isActive===(u==="Active"))),v(o)},[p,h,u,i]);const U=o=>{F(o),m(o),T(!0)},N=()=>{F(null),T(!1)},b=o=>{const{name:t,value:c}=o.target;if(t==="mobile"){let s=c.replace(/\D/g,"");s.startsWith("92")&&(s=s.slice(2)),s.length>10&&(s=s.slice(0,10)),m(j=>({...j,mobile:`+92${s}`}));return}if(t==="cnic"){const s=c.replace(/\D/g,"").slice(0,13);let j=s;s.length>5&&(j=`${s.slice(0,5)}-${s.slice(5)}`),s.length>12&&(j=`${s.slice(0,5)}-${s.slice(5,12)}-${s.slice(12)}`),m(le=>({...le,cnic:j}));return}m(s=>({...s,[t]:c}))},Z=o=>m(t=>({...t,allowedRoutes:t.allowedRoutes?.includes(o)?t.allowedRoutes.filter(c=>c!==o):[...t.allowedRoutes||[],o]})),ee=async()=>{_(!0);try{const o=await fetch(`${y}/employees/${r._id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(d)}),t=await o.json();if(!o.ok)throw new Error(t.message);x("Employee updated"),g("success"),w(),N()}catch(o){x(o.message),g("error")}finally{_(!1)}},oe=async o=>{try{await fetch(`${y}/employees/${o}/toggle`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`}}),w(),x("Status updated"),g("success")}catch{x("Failed to update status"),g("error")}},te=(o,t)=>{M(o),H(t),C(!0)},D=()=>{M(null),H(""),C(!1)},se=async()=>{try{await fetch(`${y}/employees/${Q}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}}),w(),x("Employee deleted"),g("success")}catch{x("Delete failed"),g("error")}C(!1),M(null)},ne=y.replace(/\/api\/?$/,""),ie=o=>{if(!o)return"";const t=o.replace(/\\/g,"/");return/^https?:\/\//.test(t)?t:`${ne}/${t.replace(/^\//,"")}`},E=p||h||u,ae=()=>{k(""),R(""),B("")};return e.jsxs(re,{children:[e.jsxs("style",{children:[fe,pe]}),e.jsx(de,{message:J,type:q}),e.jsxs("div",{className:"ve",children:[e.jsxs("div",{style:{marginBottom:18,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"HR Management"}),e.jsx("h1",{style:{fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px",margin:0},children:"Employees"})]}),!S&&e.jsxs("span",{style:{fontSize:12,color:"#9ca3af",fontFamily:"'DM Mono',monospace"},children:[l.length,l.length!==i.length&&e.jsxs("span",{children:[" / ",i.length]}),e.jsxs("span",{style:{fontFamily:"'DM Sans',sans-serif",marginLeft:4,fontWeight:500},children:["employee",l.length!==1?"s":""]})]})]}),e.jsx("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:"12px 14px",marginBottom:14},children:e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr 1fr auto",gap:10,alignItems:"end"},children:[e.jsxs("div",{children:[e.jsx("label",{style:A,children:"Search"}),e.jsxs("div",{style:{position:"relative"},children:[e.jsxs("svg",{style:{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"},width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2,children:[e.jsx("circle",{cx:11,cy:11,r:8}),e.jsx("path",{strokeLinecap:"round",d:"M21 21l-4.35-4.35"})]}),e.jsx("input",{className:"ve-inp",value:p,onChange:o=>k(o.target.value),placeholder:"Name, email, CNIC…",style:{paddingLeft:30}})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:A,children:"Role"}),e.jsx("div",{className:"ve-sel-wrap",children:e.jsxs("select",{className:"ve-sel",value:h,onChange:o=>R(o.target.value),children:[e.jsx("option",{value:"",children:"All roles"}),e.jsx("option",{children:"Admin"}),e.jsx("option",{children:"Accountant"}),e.jsx("option",{children:"Worker"})]})})]}),e.jsxs("div",{children:[e.jsx("label",{style:A,children:"Status"}),e.jsx("div",{className:"ve-sel-wrap",children:e.jsxs("select",{className:"ve-sel",value:u,onChange:o=>B(o.target.value),children:[e.jsx("option",{value:"",children:"All statuses"}),e.jsx("option",{children:"Active"}),e.jsx("option",{children:"Inactive"})]})})]}),e.jsx("div",{style:{paddingTop:20},children:e.jsx("button",{onClick:ae,style:{padding:"7px 12px",borderRadius:6,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",fontSize:12.5,fontWeight:500,cursor:E?"pointer":"default",opacity:E?1:.35,fontFamily:"'DM Sans',sans-serif"},children:"Clear"})})]})}),e.jsx("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden"},children:e.jsxs("table",{className:"ve-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Employee"}),e.jsx("th",{children:"CNIC"}),e.jsx("th",{children:"Email"}),e.jsx("th",{children:"Role"}),e.jsx("th",{children:"Status"}),e.jsx("th",{style:{textAlign:"center"},children:"Actions"})]})}),e.jsx("tbody",{children:S?[...Array(5)].map((o,t)=>e.jsx("tr",{children:[200,160,180,80,70,140].map((c,s)=>e.jsx("td",{style:{padding:12},children:e.jsx("div",{className:"ve-skel",style:{height:13,width:c,maxWidth:"100%"}})},s))},t)):l.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:6,children:e.jsxs("div",{className:"ve-empty",children:[e.jsx("svg",{width:40,height:40,fill:"none",viewBox:"0 0 24 24",stroke:"#d1d5db",strokeWidth:1.2,style:{margin:"0 auto 12px",display:"block"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"})}),e.jsx("p",{style:{fontSize:13,fontWeight:600,color:"#374151",margin:"0 0 4px"},children:"No employees found"}),e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"Try adjusting your filters"})]})})}):l.map(o=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:9},children:[e.jsx("div",{className:"ve-avatar",style:{background:Y(o.firstName)},children:O(o.firstName,o.lastName)}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",flexWrap:"wrap"},children:[e.jsxs("span",{style:{fontWeight:600,color:"#111827",fontSize:13},children:[o.firstName," ",o.lastName]}),o.documents?.length>0&&e.jsxs("span",{className:"ve-doc-badge",onClick:()=>U(o),children:[e.jsx("svg",{width:8,height:8,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"})}),o.documents.length]})]}),e.jsx("div",{style:{fontSize:11,color:"#9ca3af",fontFamily:"'DM Mono',monospace"},children:o.employeeId})]})]})}),e.jsx("td",{className:"mono",children:o.cnic||"—"}),e.jsx("td",{style:{fontSize:12.5,color:"#6b7280"},children:o.email}),e.jsx("td",{children:e.jsx("span",{className:`ve-role ${o.role?.toLowerCase()}`,children:o.role})}),e.jsx("td",{children:e.jsxs("span",{className:`ve-status ${o.isActive?"active":"inactive"}`,children:[e.jsx("span",{style:{width:5,height:5,borderRadius:"50%",background:o.isActive?"#15803d":"#dc2626",display:"inline-block"}}),o.isActive?"Active":"Inactive"]})}),e.jsx("td",{children:e.jsxs("div",{style:{display:"flex",gap:5,justifyContent:"center"},children:[e.jsx("button",{className:`ve-btn ${o.isActive?"toggle-on":"toggle-off"}`,onClick:()=>oe(o._id),children:o.isActive?"Restrict":"Enable"}),e.jsxs("button",{className:"ve-btn edit",onClick:()=>U(o),children:[e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})}),"Edit"]}),e.jsxs("button",{className:"ve-btn del",onClick:()=>te(o._id,`${o.firstName} ${o.lastName}`),children:[e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})}),"Delete"]})]})})]},o._id))})]})}),!S&&l.length>0&&e.jsxs("p",{style:{textAlign:"center",color:"#9ca3af",fontSize:12,marginTop:14,fontFamily:"'DM Mono',monospace"},children:[l.length," employee",l.length!==1?"s":"",E?` · filtered from ${i.length} total`:""]})]}),G&&r&&e.jsx("div",{className:"ve-overlay",onClick:N,children:e.jsxs("div",{className:"ve-modal",style:{maxWidth:680,height:"90vh",maxHeight:820},onClick:o=>o.stopPropagation(),children:[e.jsxs("div",{className:"ve-modal-head",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{className:"ve-avatar",style:{background:Y(r.firstName)},children:O(r.firstName,r.lastName)}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:15,fontWeight:700,color:"#111827"},children:[r.firstName," ",r.lastName]}),e.jsx("div",{style:{fontSize:11,color:"#9ca3af",fontFamily:"'DM Mono',monospace"},children:r.employeeId})]})]}),e.jsx("button",{onClick:N,style:{background:"#f3f4f6",border:"none",borderRadius:7,width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#6b7280"},children:e.jsx($,{})})]}),e.jsxs("div",{className:"ve-modal-body",children:[e.jsx("p",{className:"ve-slbl",children:e.jsx("span",{children:"Personal Information"})}),e.jsxs("div",{className:"ve-g2",style:{marginBottom:16},children:[e.jsxs("div",{children:[e.jsx("label",{className:"ve-flbl",children:"First Name"}),e.jsx("input",{name:"firstName",value:d.firstName||"",onChange:b,className:"ve-inp"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"ve-flbl",children:"Last Name"}),e.jsx("input",{name:"lastName",value:d.lastName||"",onChange:b,className:"ve-inp"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"ve-flbl",children:"CNIC"}),e.jsx("input",{name:"cnic",value:d.cnic||"",onChange:b,className:"ve-inp mono"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"ve-flbl",children:"Mobile"}),e.jsx("input",{name:"mobile",value:d.mobile||"+92",onChange:b,className:"ve-inp mono"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"ve-flbl",children:"Email"}),e.jsx("input",{name:"email",value:d.email||"",onChange:b,className:"ve-inp"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"ve-flbl",children:"Address"}),e.jsx("input",{name:"address",value:d.address||"",onChange:b,className:"ve-inp"})]})]}),e.jsx("p",{className:"ve-slbl",children:e.jsx("span",{children:"Role"})}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,marginBottom:16},children:["Admin","Accountant","Worker"].map(o=>e.jsxs("div",{className:`ve-role-opt${d.role===o?" sel":""}`,onClick:()=>m(t=>({...t,role:o})),children:[e.jsx("div",{className:"ve-role-radio",style:{borderRadius:"50%"},children:d.role===o&&e.jsx("svg",{width:8,height:8,viewBox:"0 0 10 10",fill:"none",children:e.jsx("path",{d:"M2 5l2.5 2.5L8 3",stroke:"#fff",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx("span",{style:{fontSize:13,fontWeight:600,color:d.role===o?"#111827":"#374151"},children:o})]},o))}),e.jsxs("p",{className:"ve-slbl",children:[e.jsx("span",{children:"Page Permissions"}),e.jsxs("span",{style:{fontSize:11,fontWeight:600,color:"#374151",fontFamily:"'DM Mono',monospace"},children:[d.allowedRoutes?.length||0,"/",W.length]})]}),e.jsx("div",{style:{display:"flex",gap:7,marginBottom:9},children:[["Select All",!0],["Clear All",!1]].map(([o,t])=>e.jsx("button",{type:"button",onClick:()=>m(c=>({...c,allowedRoutes:t?[...W]:[]})),style:{fontSize:11.5,fontWeight:500,padding:"4px 10px",borderRadius:5,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",fontFamily:"'DM Sans',sans-serif",cursor:"pointer"},children:o},o))}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:5,maxHeight:180,overflowY:"auto",marginBottom:20},children:W.map(o=>{const t=d.allowedRoutes?.includes(o);return e.jsxs("div",{className:`ve-route-pill${t?" active":""}`,onClick:()=>Z(o),title:o,children:[e.jsx("div",{className:"ve-route-check",children:t&&e.jsx("svg",{width:8,height:8,viewBox:"0 0 10 10",fill:"none",children:e.jsx("path",{d:"M2 5l2.5 2.5L8 3",stroke:"#fff",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx("span",{className:"ve-route-text",children:he(o)})]},o)})}),e.jsxs("p",{className:"ve-slbl",children:[e.jsx("span",{children:"Documents"}),r.documents?.length>0&&e.jsxs("span",{style:{fontSize:11,fontWeight:600,color:"#6b7280",fontFamily:"'DM Mono',monospace"},children:[r.documents.length," file",r.documents.length!==1?"s":""]})]}),r.documents?.length?e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:10},children:r.documents.map((o,t)=>e.jsx(me,{doc:o,url:ie(o.fileUrl),onPreview:(c,s)=>P({src:c,name:s})},t))}):e.jsx("div",{className:"ve-docs-empty",children:e.jsx("p",{style:{fontSize:12.5,fontWeight:500,color:"#9ca3af",margin:0},children:"No documents uploaded"})})]}),e.jsxs("div",{className:"ve-modal-foot",children:[e.jsx("button",{className:"ve-modal-cancel",onClick:N,disabled:L,children:"Cancel"}),e.jsx("button",{className:"ve-modal-save",onClick:ee,disabled:L,children:L?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ve-spin-ico",children:e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})})," Saving…"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})," Save Changes"]})})]})]})}),K&&e.jsx("div",{className:"ve-overlay",onClick:D,children:e.jsxs("div",{className:"ve-modal",style:{maxWidth:380},onClick:o=>o.stopPropagation(),children:[e.jsxs("div",{className:"ve-modal-head",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:9},children:[e.jsx("div",{style:{width:34,height:34,borderRadius:8,background:"#fef2f2",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"#dc2626",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})}),e.jsx("span",{style:{fontSize:15,fontWeight:700,color:"#111827"},children:"Delete Employee"})]}),e.jsx("button",{onClick:D,style:{background:"#f3f4f6",border:"none",borderRadius:7,width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#6b7280"},children:e.jsx($,{})})]}),e.jsx("div",{className:"ve-modal-body",children:e.jsxs("p",{style:{fontSize:13.5,color:"#4b5563",lineHeight:1.6,margin:0},children:["Are you sure you want to delete ",e.jsx("strong",{style:{color:"#111827"},children:X}),"? This action cannot be undone."]})}),e.jsxs("div",{className:"ve-modal-foot",children:[e.jsx("button",{className:"ve-modal-cancel",onClick:D,children:"Cancel"}),e.jsx("button",{className:"ve-modal-del",onClick:se,children:"Delete Employee"})]})]})}),z&&e.jsx(ve,{src:z.src,name:z.name,onClose:()=>P(null)})]})}export{je as default};
