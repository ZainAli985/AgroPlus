import{j as e,S as re,N as de,A as y}from"./index-YpCB_77g.js";import{b as l,R as ce}from"./react-BBT0yyZ1.js";const fe="@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');",pe=`
  *, *::before, *::after { box-sizing: border-box; }
  .ve-wrap { font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; }

  .ve-input, .ve-select {
    width: 100%; border: 1.5px solid #e5e7eb; border-radius: 10px;
    padding: 9px 12px; font-size: 13.5px; font-family: 'Plus Jakarta Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .15s, box-shadow .15s; appearance: none;
  }
  .ve-input::placeholder { color: #9ca3af; }
  .ve-input:focus, .ve-select:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.12); }
  .ve-input.mono { font-family: 'JetBrains Mono', monospace; font-size: 13px; }

  .ve-select-wrap { position: relative; }
  .ve-select-wrap::after {
    content: ''; position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    pointer-events: none; border-left: 4px solid transparent;
    border-right: 4px solid transparent; border-top: 5px solid #9ca3af;
  }

  .ve-table { width: 100%; border-collapse: collapse; }
  .ve-table thead tr { background: #1e293b; }
  .ve-table thead th {
    padding: 11px 16px; font-size: 11px; font-weight: 700;
    font-family: 'Plus Jakarta Sans', sans-serif; text-transform: uppercase;
    letter-spacing: .07em; color: rgba(255,255,255,.7); text-align: left;
    white-space: nowrap; border: none;
  }
  .ve-table thead th:first-child { border-radius: 10px 0 0 0; }
  .ve-table thead th:last-child  { border-radius: 0 10px 0 0; text-align: center; }
  .ve-table tbody tr { background: #fff; border-bottom: 1px solid #f3f4f6; transition: background .1s; }
  .ve-table tbody tr:hover { background: #fafafa; }
  .ve-table tbody td { padding: 13px 16px; font-size: 13.5px; color: #374151; vertical-align: middle; }
  .ve-table tbody td.mono { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: #6b7280; }

  .ve-avatar {
    width: 34px; height: 34px; border-radius: 10px; display: flex;
    align-items: center; justify-content: center;
    font-size: 13px; font-weight: 800; flex-shrink: 0; color: #fff;
  }

  .ve-status { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px;
    border-radius: 20px; font-size: 12px; font-weight: 700; white-space: nowrap; }
  .ve-status.active   { background: #d1fae5; color: #065f46; }
  .ve-status.inactive { background: #fee2e2; color: #991b1b; }

  .ve-role { display: inline-block; padding: 2px 9px; border-radius: 6px; font-size: 12px; font-weight: 700; letter-spacing: .02em; }
  .ve-role.admin      { background: #e0e7ff; color: #3730a3; }
  .ve-role.accountant { background: #fef9c3; color: #854d0e; }
  .ve-role.worker     { background: #f3f4f6; color: #374151; }

  .ve-btn {
    display: inline-flex; align-items: center; gap: 5px; padding: 6px 11px;
    border-radius: 8px; border: 1.5px solid transparent; font-size: 12px; font-weight: 600;
    font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer;
    transition: all .12s; white-space: nowrap;
  }
  .ve-btn.toggle-on  { background: #fff7ed; color: #c2410c; border-color: #fed7aa; }
  .ve-btn.toggle-on:hover  { background: #ffedd5; border-color: #fb923c; }
  .ve-btn.toggle-off { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
  .ve-btn.toggle-off:hover { background: #dcfce7; border-color: #86efac; }
  .ve-btn.edit  { background: #eef2ff; color: #4338ca; border-color: #c7d2fe; }
  .ve-btn.edit:hover  { background: #e0e7ff; border-color: #a5b4fc; }
  .ve-btn.del   { background: #fff1f2; color: #be123c; border-color: #fecdd3; }
  .ve-btn.del:hover   { background: #ffe4e6; border-color: #fda4af; }

  .ve-clear-btn {
    background: none; border: 1.5px solid #e5e7eb; border-radius: 10px;
    padding: 9px 14px; font-size: 13px; font-weight: 600; color: #6b7280;
    font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer; transition: all .15s; width: 100%;
  }
  .ve-clear-btn:hover { border-color: #d1d5db; color: #374151; }

  @keyframes ve-shimmer { to { background-position: -200% 0; } }
  @keyframes ve-spin { to { transform: rotate(360deg); } }
  .ve-skeleton {
    background: linear-gradient(90deg,#f3f4f6 25%,#fafafa 50%,#f3f4f6 75%);
    background-size: 200% 100%; animation: ve-shimmer 1.3s infinite; border-radius: 6px;
  }

  .ve-overlay {
    position: fixed; inset: 0; background: rgba(15,23,42,.45);
    backdrop-filter: blur(4px); display: flex; align-items: center;
    justify-content: center; z-index: 50; padding: 20px;
  }
  .ve-lightbox-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,.9);
    display: flex; align-items: center; justify-content: center;
    z-index: 200; padding: 24px; cursor: zoom-out;
  }
  @keyframes ve-modal-in {
    from { opacity:0; transform:scale(.97) translateY(6px); }
    to   { opacity:1; transform:scale(1)  translateY(0); }
  }
  .ve-modal {
    background: #fff; border-radius: 18px; width: 100%;
    box-shadow: 0 24px 60px rgba(0,0,0,.2); animation: ve-modal-in .2s ease-out;
    display: flex; flex-direction: column; overflow: hidden;
  }
  .ve-modal-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 24px; border-bottom: 1.5px solid #f3f4f6; background: #fafafa;
    flex-shrink: 0;
  }
  .ve-modal-title { font-size: 16px; font-weight: 800; color: #111827; }
  .ve-modal-body  { padding: 24px; overflow-y: auto; flex: 1; min-height: 0; }
  .ve-modal-foot  {
    display: flex; justify-content: flex-end; gap: 10px;
    padding: 16px 24px; border-top: 1.5px solid #f3f4f6; background: #fafafa;
    flex-shrink: 0;
  }

  .ve-modal-cancel {
    padding: 9px 18px; border-radius: 10px; border: 1.5px solid #e5e7eb;
    background: #fff; font-size: 13.5px; font-weight: 600; color: #6b7280;
    font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer; transition: all .12s;
  }
  .ve-modal-cancel:hover { border-color: #d1d5db; color: #374151; }
  .ve-modal-save {
    padding: 9px 20px; border-radius: 10px; border: none;
    background: linear-gradient(135deg,#4f46e5,#6366f1); color: #fff;
    font-size: 13.5px; font-weight: 700; font-family: 'Plus Jakarta Sans', sans-serif;
    cursor: pointer; box-shadow: 0 4px 12px rgba(99,102,241,.3); transition: all .12s;
  }
  .ve-modal-save:hover { opacity: .9; }
  .ve-modal-delete-btn {
    padding: 9px 20px; border-radius: 10px; border: none;
    background: #dc2626; color: #fff; font-size: 13.5px; font-weight: 700;
    font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer; transition: all .12s;
  }
  .ve-modal-delete-btn:hover { background: #b91c1c; }

  .ve-section-label {
    font-size: 10.5px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .08em; color: #9ca3af; margin-bottom: 12px;
    padding-bottom: 6px; border-bottom: 1.5px solid #f3f4f6;
    display: flex; align-items: center; justify-content: space-between;
  }
  .ve-field-label {
    display: block; font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: #9ca3af; margin-bottom: 6px;
  }

  .ve-route-pill {
    display: flex; align-items: center; gap: 8px; padding: 7px 10px;
    border-radius: 9px; cursor: pointer; border: 1.5px solid #f3f4f6;
    background: #fafafa; transition: all .12s; user-select: none;
  }
  .ve-route-pill:hover  { border-color: #e0e7ff; background: #eef2ff; }
  .ve-route-pill.active { border-color: #c7d2fe; background: #eef2ff; }
  .ve-route-check {
    width: 15px; height: 15px; border-radius: 4px; flex-shrink: 0;
    border: 1.5px solid #d1d5db; background: #fff;
    display: flex; align-items: center; justify-content: center; transition: all .12s;
  }
  .ve-route-pill.active .ve-route-check { background: #6366f1; border-color: #6366f1; }
  .ve-route-text {
    font-size: 11.5px; font-weight: 500; color: #4b5563;
    font-family: 'JetBrains Mono', monospace; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis;
  }
  .ve-route-pill.active .ve-route-text { color: #4338ca; font-weight: 600; }

  .ve-empty { text-align: center; padding: 60px 20px; color: #9ca3af; }

  /* ── Document card ── */
  .ve-doc-card {
    display: flex; flex-direction: column; border-radius: 12px;
    border: 1.5px solid #e5e7eb; overflow: hidden;
    transition: box-shadow .15s, transform .15s; background: #fff; width: 120px; flex-shrink: 0;
  }
  .ve-doc-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,.1); transform: translateY(-2px); }
  .ve-doc-thumb { width: 120px; height: 90px; object-fit: cover; display: block; cursor: zoom-in; }
  .ve-doc-placeholder {
    width: 120px; height: 90px; display: flex; flex-direction: column;
    align-items: center; justify-content: center; background: #f8fafc;
    gap: 5px; cursor: pointer;
  }
  .ve-doc-foot {
    padding: 6px 8px; border-top: 1px solid #f3f4f6;
    display: flex; align-items: center; gap: 5px;
  }
  .ve-doc-fname {
    font-size: 10.5px; font-weight: 600; color: #374151;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1;
  }
  .ve-doc-open {
    display: inline-flex; align-items: center; justify-content: center;
    width: 20px; height: 20px; border-radius: 5px; flex-shrink: 0;
    background: #eef2ff; color: #6366f1; border: none; cursor: pointer;
    transition: background .12s; text-decoration: none;
  }
  .ve-doc-open:hover { background: #e0e7ff; }

  /* doc count badge in table */
  .ve-doc-badge {
    display: inline-flex; align-items: center; gap: 3px;
    padding: 1px 7px; border-radius: 20px; font-size: 10.5px; font-weight: 700;
    background: #f0f9ff; color: #0369a1; border: 1px solid #bae6fd;
    margin-left: 7px; cursor: pointer; transition: background .12s; vertical-align: middle;
  }
  .ve-doc-badge:hover { background: #e0f2fe; }

  /* empty docs */
  .ve-docs-empty {
    padding: 22px; border-radius: 12px; border: 1.5px dashed #e5e7eb;
    text-align: center; color: #9ca3af; background: #fafafa;
  }

  .ve-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media (max-width: 600px) { .ve-grid-2 { grid-template-columns: 1fr; } }
`,U=["#6366f1","#0ea5e9","#10b981","#f59e0b","#ec4899","#8b5cf6","#14b8a6"],V=a=>U[(a?.charCodeAt(0)||0)%U.length],Y=(a,n)=>`${a?.[0]||""}${n?.[0]||""}`.toUpperCase(),he=a=>a.replace(/^\//,"").replace(/-/g," ").replace(/\b\w/g,n=>n.toUpperCase())||"Dashboard",xe=a=>/\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(a||""),ge=a=>a.name||a.fileUrl?.split("/").pop()||"Document",E=["/dashboard","/create-account","/view-accounts","/ledger","/general-entries","/products","/products/new","/add-invoice-purchase","/view-purchase-invoices","/add-invoice-sales","/view-sales-invoices","/stock-management","/trialbalance","/balancesheet","/incomestatement","/weight-bridge","/weight-bridge/invoices","/cashbook","/cashbook-report"],A=()=>e.jsx("svg",{width:18,height:18,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})}),ue=()=>e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"})});function me({doc:a,url:n,onPreview:p}){const i=ge(a),m=xe(n),[h,k]=ce.useState(!1);return e.jsxs("div",{className:"ve-doc-card",children:[m&&!h?e.jsx("img",{src:n,alt:i,className:"ve-doc-thumb",onClick:()=>p(n,i),onError:()=>k(!0)}):e.jsxs("div",{className:"ve-doc-placeholder",onClick:()=>window.open(n,"_blank"),children:[e.jsx("svg",{width:26,height:26,fill:"none",viewBox:"0 0 24 24",stroke:"#94a3b8",strokeWidth:1.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),e.jsx("span",{style:{fontSize:9.5,color:"#94a3b8",fontWeight:700,textTransform:"uppercase",letterSpacing:".05em"},children:n.split(".").pop()?.toUpperCase().slice(0,6)||"FILE"})]}),e.jsxs("div",{className:"ve-doc-foot",children:[e.jsx("span",{className:"ve-doc-fname",title:i,children:i}),e.jsx("a",{href:n,target:"_blank",rel:"noopener noreferrer",className:"ve-doc-open",title:"Open in new tab",onClick:f=>f.stopPropagation(),children:e.jsx(ue,{})}),e.jsx("a",{href:n,download:i,className:"ve-doc-open",title:"Download",style:{background:"#f0fdf4",color:"#16a34a"},onClick:f=>f.stopPropagation(),children:e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"})})})]})]})}function ve({src:a,name:n,onClose:p}){return l.useEffect(()=>{const i=m=>{m.key==="Escape"&&p()};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[p]),e.jsx("div",{className:"ve-lightbox-overlay",onClick:p,children:e.jsxs("div",{style:{position:"relative",maxWidth:"90vw",maxHeight:"90vh"},onClick:i=>i.stopPropagation(),children:[e.jsx("img",{src:a,alt:n,style:{maxWidth:"90vw",maxHeight:"85vh",borderRadius:10,objectFit:"contain",display:"block",boxShadow:"0 32px 80px rgba(0,0,0,.6)"}}),e.jsxs("div",{style:{position:"absolute",bottom:-36,left:0,right:0,display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:13,color:"rgba(255,255,255,.65)",fontWeight:500},children:n}),e.jsx("span",{style:{fontSize:11.5,color:"rgba(255,255,255,.35)"},children:"Esc or click to close"})]}),e.jsx("button",{onClick:p,style:{position:"absolute",top:-12,right:-12,width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.18)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"},children:e.jsx(A,{})})]})})}function ye(){const a=localStorage.getItem("token"),[n,p]=l.useState([]),[i,m]=l.useState([]),[h,k]=l.useState(""),[f,I]=l.useState(""),[b,R]=l.useState(""),[S,F]=l.useState(!0),[O,x]=l.useState(""),[q,g]=l.useState(""),[d,D]=l.useState(null),[r,u]=l.useState({}),[G,J]=l.useState(!1),[K,L]=l.useState(!1),[Q,z]=l.useState(null),[X,P]=l.useState(""),[M,T]=l.useState(null),[w,H]=l.useState(!1),N=async()=>{try{F(!0);const o=await(await fetch(`${y}/employees`,{headers:{Authorization:`Bearer ${a}`}})).json();p(o),m(o)}catch{x("Failed to load employees"),g("error")}finally{F(!1)}};l.useEffect(()=>{N()},[]),l.useEffect(()=>{let t=[...n];h&&(t=t.filter(o=>`${o.firstName} ${o.lastName} ${o.email} ${o.cnic}`.toLowerCase().includes(h.toLowerCase()))),f&&(t=t.filter(o=>o.role===f)),b&&(t=t.filter(o=>o.isActive===(b==="Active"))),m(t)},[h,f,b,n]);const _=t=>{D(t),u(t),J(!0)},C=()=>{D(null),J(!1)},v=t=>{const{name:o,value:c}=t.target;if(o==="mobile"){let s=c.replace(/\D/g,"");s.startsWith("92")&&(s=s.slice(2)),s.length>10&&(s=s.slice(0,10)),u(j=>({...j,mobile:`+92${s}`}));return}if(o==="cnic"){const s=c.replace(/\D/g,"").slice(0,13);let j=s;s.length>5&&(j=`${s.slice(0,5)}-${s.slice(5)}`),s.length>12&&(j=`${s.slice(0,5)}-${s.slice(5,12)}-${s.slice(12)}`),u(le=>({...le,cnic:j}));return}u(s=>({...s,[o]:c}))},Z=t=>u(o=>({...o,allowedRoutes:o.allowedRoutes?.includes(t)?o.allowedRoutes.filter(c=>c!==t):[...o.allowedRoutes||[],t]})),ee=async()=>{H(!0);try{const t=await fetch(`${y}/employees/${d._id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(r)}),o=await t.json();if(!t.ok)throw new Error(o.message);x("Employee updated successfully"),g("success"),N(),C()}catch(t){x(t.message),g("error")}finally{H(!1)}},te=async t=>{try{await fetch(`${y}/employees/${t}/toggle`,{method:"PATCH",headers:{Authorization:`Bearer ${a}`}}),N(),x("Employee status updated"),g("success")}catch{x("Failed to update status"),g("error")}},oe=(t,o)=>{z(t),P(o),L(!0)},W=()=>{z(null),P(""),L(!1)},se=async()=>{try{await fetch(`${y}/employees/${Q}`,{method:"DELETE",headers:{Authorization:`Bearer ${a}`}}),N(),x("Employee deleted"),g("success")}catch{x("Delete failed"),g("error")}L(!1),z(null)},ne=y.replace(/\/api\/?$/,""),ae=t=>{if(!t)return"";const o=t.replace(/\\/g,"/");return/^https?:\/\//.test(o)?o:`${ne}/${o.replace(/^\//,"")}`},B=h||f||b,ie=()=>{k(""),I(""),R("")};return e.jsxs(re,{children:[e.jsxs("style",{children:[fe,pe]}),e.jsx(de,{message:O,type:q}),e.jsxs("div",{className:"ve-wrap",children:[e.jsxs("div",{style:{marginBottom:24,display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:10},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"#9ca3af",marginBottom:4},children:"HR Management"}),e.jsx("h1",{style:{fontSize:26,fontWeight:800,color:"#111827",letterSpacing:"-.5px",lineHeight:1},children:"Employees"})]}),!S&&e.jsxs("div",{style:{background:"#f3f4f6",borderRadius:10,padding:"7px 14px",fontSize:13,fontWeight:600,color:"#6b7280",fontFamily:"'JetBrains Mono',monospace"},children:[i.length,i.length!==n.length&&e.jsxs("span",{style:{color:"#9ca3af",fontWeight:400},children:[" / ",n.length]}),e.jsxs("span",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",marginLeft:5,fontWeight:500},children:["employee",i.length!==1?"s":""]})]})]}),e.jsx("div",{style:{background:"#fff",border:"1.5px solid #f3f4f6",borderRadius:14,padding:"14px 16px",marginBottom:18,boxShadow:"0 1px 3px rgba(0,0,0,.04)"},children:e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr 1fr auto",gap:10,alignItems:"end"},children:[e.jsxs("div",{children:[e.jsx("label",{style:$,children:"Search"}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",display:"flex"},children:e.jsxs("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2,children:[e.jsx("circle",{cx:11,cy:11,r:8}),e.jsx("path",{strokeLinecap:"round",d:"M21 21l-4.35-4.35"})]})}),e.jsx("input",{className:"ve-input",value:h,onChange:t=>k(t.target.value),placeholder:"Name, email, CNIC…",style:{paddingLeft:34}})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:$,children:"Role"}),e.jsx("div",{className:"ve-select-wrap",children:e.jsxs("select",{className:"ve-select",value:f,onChange:t=>I(t.target.value),children:[e.jsx("option",{value:"",children:"All roles"}),e.jsx("option",{children:"Admin"}),e.jsx("option",{children:"Accountant"}),e.jsx("option",{children:"Worker"})]})})]}),e.jsxs("div",{children:[e.jsx("label",{style:$,children:"Status"}),e.jsx("div",{className:"ve-select-wrap",children:e.jsxs("select",{className:"ve-select",value:b,onChange:t=>R(t.target.value),children:[e.jsx("option",{value:"",children:"All statuses"}),e.jsx("option",{children:"Active"}),e.jsx("option",{children:"Inactive"})]})})]}),e.jsx("div",{children:e.jsx("button",{className:"ve-clear-btn",onClick:ie,style:{opacity:B?1:.35,pointerEvents:B?"auto":"none"},children:"Clear"})})]})}),e.jsx("div",{style:{background:"#fff",border:"1.5px solid #f3f4f6",borderRadius:14,overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,.04)"},children:e.jsxs("table",{className:"ve-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Employee"}),e.jsx("th",{children:"CNIC"}),e.jsx("th",{children:"Email"}),e.jsx("th",{children:"Role"}),e.jsx("th",{children:"Status"}),e.jsx("th",{style:{textAlign:"center"},children:"Actions"})]})}),e.jsx("tbody",{children:S?Array.from({length:5}).map((t,o)=>e.jsx("tr",{children:[200,180,120,80,70,140].map((c,s)=>e.jsx("td",{style:{padding:13},children:e.jsx("div",{className:"ve-skeleton",style:{height:14,width:`${c}px`,maxWidth:"100%"}})},s))},o)):i.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:6,children:e.jsxs("div",{className:"ve-empty",children:[e.jsx("svg",{width:44,height:44,fill:"none",viewBox:"0 0 24 24",stroke:"#e5e7eb",strokeWidth:1.2,style:{margin:"0 auto 12px",display:"block"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"})}),e.jsx("p",{style:{fontSize:15,fontWeight:700,color:"#6b7280",marginBottom:4},children:"No employees found"}),e.jsx("p",{style:{fontSize:13,color:"#9ca3af"},children:"Try adjusting your filters"})]})})}):i.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{className:"ve-avatar",style:{background:V(t.firstName)},children:Y(t.firstName,t.lastName)}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:0},children:[e.jsxs("span",{style:{fontWeight:700,color:"#111827",fontSize:13.5},children:[t.firstName," ",t.lastName]}),t.documents?.length>0&&e.jsxs("span",{className:"ve-doc-badge",onClick:()=>_(t),title:`${t.documents.length} doc${t.documents.length!==1?"s":""} — click to view`,children:[e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"})}),t.documents.length]})]}),e.jsxs("div",{style:{fontSize:11.5,color:"#9ca3af",fontFamily:"'JetBrains Mono',monospace"},children:[t.employeeId," · CNIC: ",t.cnic||"—"]})]})]})}),e.jsx("td",{style:{color:"#6b7280",fontSize:13,fontFamily:"'JetBrains Mono',monospace"},children:t.cnic||"—"}),e.jsx("td",{style:{color:"#6b7280",fontSize:13},children:t.email}),e.jsx("td",{children:e.jsx("span",{className:`ve-role ${t.role?.toLowerCase()}`,children:t.role})}),e.jsx("td",{children:e.jsxs("span",{className:`ve-status ${t.isActive?"active":"inactive"}`,children:[e.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:t.isActive?"#10b981":"#ef4444",display:"inline-block"}}),t.isActive?"Active":"Inactive"]})}),e.jsx("td",{children:e.jsxs("div",{style:{display:"flex",gap:6,justifyContent:"center"},children:[e.jsx("button",{className:`ve-btn ${t.isActive?"toggle-on":"toggle-off"}`,onClick:()=>te(t._id),children:t.isActive?e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"})}),"Restrict"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})}),"Enable"]})}),e.jsxs("button",{className:"ve-btn edit",onClick:()=>_(t),children:[e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})}),"Edit"]}),e.jsxs("button",{className:"ve-btn del",onClick:()=>oe(t._id,`${t.firstName} ${t.lastName}`),children:[e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})}),"Delete"]})]})})]},t._id))})]})}),!S&&i.length>0&&e.jsxs("p",{style:{textAlign:"center",color:"#9ca3af",fontSize:12.5,marginTop:14,fontFamily:"'JetBrains Mono',monospace"},children:[i.length," employee",i.length!==1?"s":"",B?` · filtered from ${n.length} total`:""]})]}),G&&d&&e.jsx("div",{className:"ve-overlay",onClick:C,children:e.jsxs("div",{className:"ve-modal",style:{maxWidth:700,height:"92vh",maxHeight:860},onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"ve-modal-head",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{className:"ve-avatar",style:{background:V(d.firstName)},children:Y(d.firstName,d.lastName)}),e.jsxs("div",{children:[e.jsxs("div",{className:"ve-modal-title",children:[d.firstName," ",d.lastName]}),e.jsx("div",{style:{fontSize:12,color:"#9ca3af",fontFamily:"'JetBrains Mono',monospace"},children:d.employeeId})]})]}),e.jsx("button",{onClick:C,style:{background:"#f3f4f6",border:"none",borderRadius:9,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#6b7280"},onMouseEnter:t=>t.currentTarget.style.background="#e5e7eb",onMouseLeave:t=>t.currentTarget.style.background="#f3f4f6",children:e.jsx(A,{})})]}),e.jsxs("div",{className:"ve-modal-body",children:[e.jsx("p",{className:"ve-section-label",children:e.jsx("span",{children:"Personal Information"})}),e.jsxs("div",{className:"ve-grid-2",style:{marginBottom:20},children:[e.jsxs("div",{children:[e.jsx("label",{className:"ve-field-label",children:"First Name"}),e.jsx("input",{name:"firstName",value:r.firstName||"",onChange:v,className:"ve-input"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"ve-field-label",children:"Last Name"}),e.jsx("input",{name:"lastName",value:r.lastName||"",onChange:v,className:"ve-input"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"ve-field-label",children:"CNIC"}),e.jsx("input",{name:"cnic",value:r.cnic||"",onChange:v,className:"ve-input mono"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"ve-field-label",children:"Mobile"}),e.jsx("input",{name:"mobile",value:r.mobile||"+92",onChange:v,className:"ve-input mono"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"ve-field-label",children:"Email"}),e.jsx("input",{name:"email",value:r.email||"",onChange:v,className:"ve-input"})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"ve-field-label",children:["CNIC ",e.jsx("span",{style:{fontSize:10,color:"#9ca3af",fontWeight:400},children:"(login ID — read only)"})]}),e.jsx("input",{value:r.cnic||"—",disabled:!0,className:"ve-input mono",style:{background:"#f9fafb",color:"#9ca3af"}})]}),e.jsxs("div",{style:{gridColumn:"span 2"},children:[e.jsx("label",{className:"ve-field-label",children:"Address"}),e.jsx("input",{name:"address",value:r.address||"",onChange:v,className:"ve-input"})]})]}),e.jsx("p",{className:"ve-section-label",children:e.jsx("span",{children:"Role"})}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:20},children:["Admin","Accountant","Worker"].map(t=>e.jsxs("div",{onClick:()=>u(o=>({...o,role:t})),style:{padding:"10px 14px",borderRadius:10,cursor:"pointer",border:`1.5px solid ${r.role===t?"#c7d2fe":"#f3f4f6"}`,background:r.role===t?"#eef2ff":"#fafafa",display:"flex",alignItems:"center",gap:8,transition:"all .12s"},children:[e.jsx("div",{style:{width:16,height:16,borderRadius:"50%",flex:"0 0 auto",border:`2px solid ${r.role===t?"#6366f1":"#d1d5db"}`,background:r.role===t?"#6366f1":"#fff",display:"flex",alignItems:"center",justifyContent:"center"},children:r.role===t&&e.jsx("svg",{width:8,height:8,viewBox:"0 0 10 10",fill:"none",children:e.jsx("path",{d:"M2 5l2.5 2.5L8 3",stroke:"#fff",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx("span",{style:{fontSize:13,fontWeight:700,color:r.role===t?"#4338ca":"#374151"},children:t})]},t))}),e.jsxs("p",{className:"ve-section-label",children:[e.jsx("span",{children:"Page Permissions"}),e.jsxs("span",{style:{fontSize:11.5,fontWeight:600,color:"#6366f1",fontFamily:"'JetBrains Mono',monospace"},children:[r.allowedRoutes?.length||0,"/",E.length]})]}),e.jsx("div",{style:{display:"flex",gap:8,marginBottom:10},children:["Select All","Clear All"].map((t,o)=>e.jsx("button",{type:"button",onClick:()=>u(c=>({...c,allowedRoutes:o===0?[...E]:[]})),style:{fontSize:11.5,fontWeight:600,padding:"4px 11px",borderRadius:7,border:"1.5px solid #e5e7eb",background:"#fff",color:"#6b7280",fontFamily:"'Plus Jakarta Sans',sans-serif",cursor:"pointer"},children:t},t))}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,maxHeight:190,overflowY:"auto",padding:"2px 0",marginBottom:24,scrollbarWidth:"thin"},children:E.map(t=>{const o=r.allowedRoutes?.includes(t);return e.jsxs("div",{className:`ve-route-pill${o?" active":""}`,onClick:()=>Z(t),title:t,children:[e.jsx("div",{className:"ve-route-check",children:o&&e.jsx("svg",{width:9,height:9,viewBox:"0 0 10 10",fill:"none",children:e.jsx("path",{d:"M2 5l2.5 2.5L8 3",stroke:"#fff",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx("span",{className:"ve-route-text",children:he(t)})]},t)})}),e.jsxs("p",{className:"ve-section-label",children:[e.jsx("span",{children:"Documents"}),d.documents?.length>0&&e.jsxs("span",{style:{fontSize:11.5,fontWeight:600,color:"#0369a1",fontFamily:"'JetBrains Mono',monospace"},children:[d.documents.length," file",d.documents.length!==1?"s":""]})]}),d.documents?.length?e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:12},children:d.documents.map((t,o)=>e.jsx(me,{doc:t,url:ae(t.fileUrl),onPreview:(c,s)=>T({src:c,name:s})},o))}):e.jsxs("div",{className:"ve-docs-empty",children:[e.jsx("svg",{width:30,height:30,fill:"none",viewBox:"0 0 24 24",stroke:"#d1d5db",strokeWidth:1.5,style:{margin:"0 auto 8px",display:"block"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),e.jsx("p",{style:{fontSize:13,fontWeight:600,color:"#9ca3af"},children:"No documents uploaded for this employee"})]})]}),e.jsxs("div",{className:"ve-modal-foot",children:[e.jsx("button",{className:"ve-modal-cancel",onClick:C,disabled:w,children:"Cancel"}),e.jsx("button",{className:"ve-modal-save",onClick:ee,disabled:w,style:{opacity:w?.7:1,display:"inline-flex",alignItems:"center",gap:7},children:w?e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,style:{animation:"ve-spin 1s linear infinite",display:"inline-block"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})}),"Saving…"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})}),"Save Changes"]})})]})]})}),K&&e.jsx("div",{className:"ve-overlay",onClick:W,children:e.jsxs("div",{className:"ve-modal",style:{maxWidth:400},onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"ve-modal-head",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{style:{width:36,height:36,borderRadius:10,background:"#fee2e2",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("svg",{width:18,height:18,fill:"none",viewBox:"0 0 24 24",stroke:"#dc2626",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})})}),e.jsx("span",{className:"ve-modal-title",children:"Delete Employee"})]}),e.jsx("button",{onClick:W,style:{background:"#f3f4f6",border:"none",borderRadius:9,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#6b7280"},children:e.jsx(A,{})})]}),e.jsx("div",{className:"ve-modal-body",children:e.jsxs("p",{style:{fontSize:14,color:"#4b5563",lineHeight:1.6},children:["Are you sure you want to delete ",e.jsx("strong",{style:{color:"#111827"},children:X}),"? This action cannot be undone."]})}),e.jsxs("div",{className:"ve-modal-foot",children:[e.jsx("button",{className:"ve-modal-cancel",onClick:W,children:"Cancel"}),e.jsx("button",{className:"ve-modal-delete-btn",onClick:se,children:"Delete Employee"})]})]})}),M&&e.jsx(ve,{src:M.src,name:M.name,onClose:()=>T(null)})]})}const $={display:"block",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:6};export{ye as default};
