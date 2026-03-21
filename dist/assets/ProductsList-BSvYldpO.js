import{a as k,A as v,j as e,S as F}from"./index-DwSFuQlu.js";import{b as a}from"./react-BBT0yyZ1.js";const $=`
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
`,O=`
  .plx-wrap *, .plx-wrap *::before, .plx-wrap *::after { box-sizing: border-box; }
  .plx-wrap {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
    width: 100%;
    max-width: 1060px;
    margin: 0 auto;
  }

  /* eyebrow / title */
  .plx-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: .12em;
    text-transform: uppercase; color: #9ca3af; margin-bottom: 6px;
  }
  .plx-title {
    font-family: 'Lora', serif; font-size: 26px; font-weight: 700;
    color: #0f172a; letter-spacing: -.3px; line-height: 1.15;
  }
  .plx-subtitle { font-size: 13px; color: #94a3b8; margin-top: 4px; }

  /* filter bar */
  .plx-filter-bar {
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px;
    padding: 16px 20px; display: flex; align-items: flex-end;
    gap: 14px; flex-wrap: wrap;
  }
  .plx-field { display: flex; flex-direction: column; gap: 5px; flex: 1; min-width: 160px; }
  .plx-label {
    font-size: 10.5px; font-weight: 700; letter-spacing: .06em;
    text-transform: uppercase; color: #94a3b8;
  }
  .plx-input, .plx-select {
    border: 1.5px solid #e2e8f0; border-radius: 9px; padding: 8px 12px;
    font-size: 13px; font-family: 'DM Sans', sans-serif; color: #0f172a;
    background: #f8fafc; outline: none; transition: border-color .15s, box-shadow .15s;
    width: 100%;
  }
  .plx-input:focus, .plx-select:focus {
    border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.1);
  }
  .plx-input-search { padding-left: 34px; }
  .plx-search-wrap { position: relative; }
  .plx-search-icon {
    position: absolute; left: 11px; top: 50%; transform: translateY(-50%);
    color: #94a3b8; pointer-events: none; display: flex; align-items: center;
  }
  .plx-select:disabled { background: #f1f5f9; color: #cbd5e1; cursor: not-allowed; }
  .plx-count-chip {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 8px 14px; border-radius: 9px; font-size: 12.5px; font-weight: 600;
    background: #f5f5ff; color: #4f46e5; border: 1.5px solid #e0e7ff;
    white-space: nowrap; height: 38px; align-self: flex-end;
  }
  .plx-clear-btn {
    padding: 8px 14px; border-radius: 9px; border: 1.5px solid #e2e8f0;
    background: #fff; font-size: 12.5px; font-weight: 600; color: #64748b;
    cursor: pointer; font-family: 'DM Sans', sans-serif; height: 38px;
    align-self: flex-end; transition: all .12s; white-space: nowrap;
  }
  .plx-clear-btn:hover { border-color: #94a3b8; color: #334155; }

  /* type pills (filter shortcuts) */
  .plx-pill {
    padding: 5px 14px; border-radius: 20px; font-size: 12px; font-weight: 600;
    border: 1.5px solid #e2e8f0; background: #fff; color: #64748b;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .12s;
    white-space: nowrap;
  }
  .plx-pill:hover { border-color: #94a3b8; color: #334155; background: #f8fafc; }
  .plx-pill-active {
    background: #4f46e5; border-color: #4f46e5; color: #fff;
  }
  .plx-pill-active:hover { background: #4338ca; border-color: #4338ca; color: #fff; }

  /* table panel */
  .plx-panel {
    background: #fff; border: 1.5px solid #e2e8f0;
    border-radius: 16px; overflow: hidden;
    box-shadow: 0 1px 6px rgba(0,0,0,.04);
  }
  .plx-table { width: 100%; border-collapse: collapse; }
  .plx-table thead tr { background: #1e293b; }
  .plx-table thead th {
    padding: 11px 18px; font-size: 11px; font-weight: 700;
    letter-spacing: .07em; text-transform: uppercase;
    color: rgba(255,255,255,.6); font-family: 'DM Sans', sans-serif;
    border: none; white-space: nowrap; text-align: left;
  }
  .plx-table thead th.plx-th-right { text-align: right; }

  .plx-row { border-bottom: 1px solid #f8fafc; transition: background .08s; }
  .plx-row:last-child { border-bottom: none; }
  .plx-row:hover { background: #fafafa; }
  .plx-row td { padding: 11px 18px; font-size: 13px; color: #334155; }
  .plx-row td.plx-td-right { text-align: right; }
  .plx-row td.plx-td-mono {
    font-family: 'DM Mono', monospace; font-size: 12px; color: #94a3b8;
  }

  /* product name cell */
  .plx-product-name {
    font-weight: 600; color: #0f172a; font-size: 13.5px;
  }

  /* type badge */
  .plx-type-badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 9px; border-radius: 6px; font-size: 11.5px; font-weight: 600;
    background: var(--plx-bg, #f5f5ff); color: var(--plx-color, #4f46e5);
  }
  .plx-subtype-badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 500;
    background: #f8fafc; color: #64748b; border: 1px solid #f1f5f9;
  }

  /* action buttons */
  .plx-btn-edit {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 5px 12px; border-radius: 8px; border: 1.5px solid #fde68a;
    background: #fefce8; color: #92400e; cursor: pointer; font-size: 12px;
    font-weight: 600; font-family: 'DM Sans', sans-serif;
    transition: all .12s; white-space: nowrap;
  }
  .plx-btn-edit:hover { background: #fef3c7; border-color: #f59e0b; }
  .plx-btn-del {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 5px 12px; border-radius: 8px; border: 1.5px solid #fecaca;
    background: #fef2f2; color: #dc2626; cursor: pointer; font-size: 12px;
    font-weight: 600; font-family: 'DM Sans', sans-serif;
    transition: all .12s; white-space: nowrap;
  }
  .plx-btn-del:hover { background: #fee2e2; border-color: #f87171; }

  /* empty state */
  .plx-empty {
    padding: 56px 24px; text-align: center;
  }
  .plx-empty-icon {
    width: 56px; height: 56px; border-radius: 16px; background: #f5f5ff;
    color: #a5b4fc; display: flex; align-items: center; justify-content: center;
    margin: 0 auto 14px;
  }
  .plx-empty-title { font-size: 14px; font-weight: 700; color: #334155; margin-bottom: 4px; }
  .plx-empty-sub   { font-size: 12.5px; color: #94a3b8; }

  /* modal backdrop */
  .plx-backdrop {
    position: fixed; inset: 0; background: rgba(15,23,42,.45);
    display: flex; align-items: center; justify-content: center;
    z-index: 50; padding: 20px;
    animation: plx-fade-in .15s ease;
  }
  @keyframes plx-fade-in { from { opacity: 0; } to { opacity: 1; } }

  /* modal */
  .plx-modal {
    background: #fff; border-radius: 18px; width: 100%; max-width: 440px;
    overflow: hidden; box-shadow: 0 24px 80px rgba(15,23,42,.22);
    animation: plx-slide-up .2s ease;
  }
  @keyframes plx-slide-up {
    from { transform: translateY(12px); opacity: 0; }
    to   { transform: translateY(0);   opacity: 1; }
  }
  .plx-modal-head {
    background: #1e293b; padding: 18px 22px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .plx-modal-title {
    font-family: 'Lora', serif; font-size: 16px; font-weight: 600;
    color: #fff; font-style: italic;
  }
  .plx-modal-close {
    width: 30px; height: 30px; border-radius: 8px; border: none;
    background: rgba(255,255,255,.1); color: rgba(255,255,255,.7);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: background .12s;
  }
  .plx-modal-close:hover { background: rgba(255,255,255,.2); color: #fff; }
  .plx-modal-body { padding: 22px; display: flex; flex-direction: column; gap: 16px; }
  .plx-modal-foot {
    padding: 14px 22px; border-top: 1.5px solid #f1f5f9;
    display: flex; justify-content: flex-end; gap: 10px;
    background: #f8fafc;
  }
  .plx-btn-cancel {
    padding: 9px 18px; border-radius: 9px; border: 1.5px solid #e2e8f0;
    background: #fff; font-size: 13px; font-weight: 600; color: #64748b;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .12s;
  }
  .plx-btn-cancel:hover { border-color: #94a3b8; color: #334155; }
  .plx-btn-save {
    padding: 9px 22px; border-radius: 9px; border: none;
    background: #4f46e5; color: #fff; font-size: 13px; font-weight: 600;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background .12s;
  }
  .plx-btn-save:hover { background: #4338ca; }
  .plx-btn-save:disabled { opacity: .5; cursor: not-allowed; }

  /* subtype pill (for edit modal, reuse same green accent as AddProduct) */
  .apx-subpill {
    padding: 6px 14px; border-radius: 20px; font-size: 12.5px; font-weight: 600;
    border: 1.5px solid #e2e8f0; background: #f8fafc; color: #64748b;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .12s; user-select: none;
  }
  .apx-subpill:hover { border-color: #6ee7b7; color: #059669; background: #f0fdf4; }
  .apx-subpill-active { border-color: #34d399; background: #ecfdf5; color: #065f46; font-weight: 700; }

  /* skeleton */
  @keyframes plx-shimmer { to { background-position: -200% 0; } }
  .plx-sk {
    background: linear-gradient(90deg,#f1f5f9 25%,#f8fafc 50%,#f1f5f9 75%);
    background-size: 200% 100%; animation: plx-shimmer 1.4s infinite; border-radius: 6px;
  }
`,Y={Peddy:{bg:"#fff7ed",color:"#c2410c"},Rice:{bg:"#ecfdf5",color:"#059669"},"Broken Rice":{bg:"#f0fdf4",color:"#166534"},Polish:{bg:"#f5f5ff",color:"#4f46e5"},Phukar:{bg:"#fef9c3",color:"#854d0e"}},n=new Set(["Peddy","Polish","Phukar"]),p={Peddy:[],Rice:["Brown","White","Steamed","Sella"],"Broken Rice":["Brown","White","Steamed","Sella"],Polish:[],Phukar:[]},U=()=>e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"})}),H=()=>e.jsx("svg",{width:22,height:22,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"})}),K=()=>e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})}),M=()=>e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})}),D=()=>e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})});function B({type:r}){const d=Y[r]||{bg:"#f1f5f9",color:"#64748b"};return e.jsx("span",{className:"plx-type-badge",style:{"--plx-bg":d.bg,"--plx-color":d.color},children:r})}function J(){return e.jsx(e.Fragment,{children:[0,1,2,3,4,5].map(r=>e.jsxs("tr",{className:"plx-row",children:[e.jsx("td",{children:e.jsx("div",{className:"plx-sk",style:{width:"60%",height:14}})}),e.jsx("td",{children:e.jsx("div",{className:"plx-sk",style:{width:60,height:20,borderRadius:6}})}),e.jsx("td",{children:e.jsx("div",{className:"plx-sk",style:{width:50,height:18,borderRadius:6}})}),e.jsx("td",{className:"plx-td-right",children:e.jsx("div",{className:"plx-sk",style:{width:70,height:13,marginLeft:"auto"}})}),e.jsx("td",{className:"plx-td-right",children:e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:8},children:[e.jsx("div",{className:"plx-sk",style:{width:32,height:32,borderRadius:8}}),e.jsx("div",{className:"plx-sk",style:{width:32,height:32,borderRadius:8}})]})})]},r))})}function G(){const[r,d]=a.useState([]),[g,N]=a.useState([]),[m,W]=a.useState(!0),[S,T]=a.useState(!1),[x,C]=a.useState(""),[o,y]=a.useState(""),[f,b]=a.useState(""),[z,h]=a.useState(null),[t,j]=a.useState({productName:"",type:"",subType:""}),[i,u]=a.useState(null);a.useEffect(()=>{(async()=>{try{const s=await(await k(`${v}/products`)).json();s.success&&(d(s.products),N(s.products))}catch(l){console.error(l)}finally{W(!1)}})()},[]),a.useEffect(()=>{let l=r;x&&(l=l.filter(s=>s.productName.toLowerCase().includes(x.toLowerCase()))),o&&(l=l.filter(s=>s.type===o)),f&&(l=l.filter(s=>s.subType===f)),N(l)},[x,o,f,r]);const E=()=>{C(""),y(""),b("")},L=x||o||f,R=l=>{h(l);const s=n.has(l.type)?"":p[l.type]?.includes(l.subType)?l.subType:p[l.type]?.[0]??"";j({productName:l.productName,type:l.type,subType:s})},A=async()=>{const l=!n.has(t.type);if(!(!t.productName||!t.type||l&&!t.subType)){T(!0);try{const c=await(await k(`${v}/products/${z._id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).json();if(!c.success){alert(c.message||"Update failed");return}const w=r.map(P=>P._id===c.product._id?c.product:P);d(w),h(null)}catch(s){console.error(s)}finally{T(!1)}}},I=l=>u(l),_=async()=>{if(i)try{(await(await k(`${v}/products/${i._id}`,{method:"DELETE"})).json()).success&&d(c=>c.filter(w=>w._id!==i._id))}catch(l){console.error(l)}finally{u(null)}};return e.jsxs(F,{children:[e.jsxs("style",{children:[$,O]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",width:"100%",padding:"0 16px"},children:e.jsxs("div",{className:"plx-wrap",children:[e.jsxs("div",{style:{marginBottom:24},children:[e.jsx("p",{className:"plx-eyebrow",children:"Inventory"}),e.jsx("h1",{className:"plx-title",children:"Products"}),e.jsx("p",{className:"plx-subtitle",children:m?"Loading…":`${r.length} product${r.length!==1?"s":""} in inventory`})]}),e.jsxs("div",{className:"plx-filter-bar",style:{marginBottom:14},children:[e.jsxs("div",{className:"plx-field",style:{minWidth:200},children:[e.jsx("label",{className:"plx-label",children:"Search"}),e.jsxs("div",{className:"plx-search-wrap",children:[e.jsx("span",{className:"plx-search-icon",children:e.jsx(U,{})}),e.jsx("input",{className:"plx-input plx-input-search",placeholder:"Product name…",value:x,onChange:l=>C(l.target.value)})]})]}),e.jsxs("div",{className:"plx-field",children:[e.jsx("label",{className:"plx-label",children:"Type"}),e.jsxs("select",{className:"plx-select",value:o,onChange:l=>{y(l.target.value),b("")},children:[e.jsx("option",{value:"",children:"All Types"}),Object.keys(p).map(l=>e.jsx("option",{value:l,children:l},l))]})]}),(!o||!n.has(o))&&e.jsxs("div",{className:"plx-field",children:[e.jsx("label",{className:"plx-label",children:"Sub Type"}),e.jsxs("select",{className:"plx-select",value:f,disabled:!o||n.has(o),onChange:l=>b(l.target.value),children:[e.jsx("option",{value:"",children:"All Sub Types"}),o&&(p[o]||[]).map(l=>e.jsx("option",{value:l,children:l},l))]})]}),e.jsxs("span",{className:"plx-count-chip",children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 6h16M4 12h16M4 18h16"})}),m?"…":g.length," shown"]}),L&&e.jsx("button",{className:"plx-clear-btn",onClick:E,children:"Clear filters"})]}),e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16},children:["",...Object.keys(p)].map(l=>e.jsx("button",{className:`plx-pill${o===l?" plx-pill-active":""}`,onClick:()=>{y(l),b("")},children:l||"All Types"},l||"all"))}),e.jsx("div",{className:"plx-panel",children:e.jsxs("table",{className:"plx-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Product Name"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Sub Type"}),e.jsx("th",{className:"plx-th-right",children:"Created"}),e.jsx("th",{className:"plx-th-right",children:"Actions"})]})}),e.jsx("tbody",{children:m?e.jsx(J,{}):g.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:5,children:e.jsxs("div",{className:"plx-empty",children:[e.jsx("div",{className:"plx-empty-icon",children:e.jsx(H,{})}),e.jsx("p",{className:"plx-empty-title",children:"No products found"}),e.jsx("p",{className:"plx-empty-sub",children:L?"Try clearing your filters":"No products have been added yet"})]})})}):g.map(l=>e.jsxs("tr",{className:"plx-row",children:[e.jsx("td",{children:e.jsx("span",{className:"plx-product-name",children:l.productName})}),e.jsx("td",{children:e.jsx(B,{type:l.type})}),e.jsx("td",{children:n.has(l.type)?e.jsx("span",{style:{fontSize:12,color:"#cbd5e1",fontStyle:"italic"},children:"—"}):e.jsx("span",{className:"plx-subtype-badge",children:l.subType||"—"})}),e.jsx("td",{className:"plx-td-right plx-td-mono",children:new Date(l.createdAt).toLocaleDateString("en-PK",{day:"numeric",month:"short",year:"numeric"})}),e.jsx("td",{className:"plx-td-right",children:e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:7},children:[e.jsxs("button",{className:"plx-btn-edit",onClick:()=>R(l),children:[e.jsx(K,{})," Edit"]}),e.jsxs("button",{className:"plx-btn-del",onClick:()=>I(l),children:[e.jsx(M,{})," Delete"]})]})})]},l._id))})]})}),z&&e.jsx("div",{className:"plx-backdrop",onClick:l=>{l.target===l.currentTarget&&h(null)},children:e.jsxs("div",{className:"plx-modal",children:[e.jsxs("div",{className:"plx-modal-head",children:[e.jsx("span",{className:"plx-modal-title",children:"Edit Product"}),e.jsx("button",{className:"plx-modal-close",onClick:()=>h(null),children:e.jsx(D,{})})]}),e.jsxs("div",{className:"plx-modal-body",children:[e.jsxs("div",{className:"plx-field",style:{minWidth:"unset"},children:[e.jsxs("label",{className:"plx-label",children:["Product Name ",e.jsx("span",{style:{color:"#ef4444"},children:"*"})]}),e.jsx("input",{className:"plx-input",placeholder:"e.g. Eeri 06, Super Kernel…",value:t.productName,onChange:l=>j(s=>({...s,productName:l.target.value}))})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"plx-label",style:{marginBottom:6,display:"block"},children:["Type ",e.jsx("span",{style:{color:"#94a3b8",fontWeight:400,textTransform:"none",fontSize:10},children:"(locked)"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx(B,{type:t.type}),e.jsx("span",{style:{fontSize:11,color:"#94a3b8",fontStyle:"italic"},children:"Cannot be changed after creation"})]})]}),!n.has(t.type)&&e.jsxs("div",{children:[e.jsxs("label",{className:"plx-label",style:{marginBottom:7,display:"block"},children:["Sub Type ",e.jsx("span",{style:{color:"#ef4444"},children:"*"})]}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:7},children:(p[t.type]||[]).map(l=>e.jsx("button",{type:"button",onClick:()=>j(s=>({...s,subType:l})),className:`apx-subpill${t.subType===l?" apx-subpill-active":""}`,style:{padding:"6px 14px",borderRadius:20,fontSize:12.5,fontWeight:600,border:t.subType===l?"1.5px solid #34d399":"1.5px solid #e2e8f0",background:t.subType===l?"#ecfdf5":"#f8fafc",color:t.subType===l?"#065f46":"#64748b",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all .12s"},children:l},l))})]}),n.has(t.type)&&e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6,padding:"7px 13px",borderRadius:9,background:"#f0fdf4",border:"1.5px solid #bbf7d0",fontSize:12.5,color:"#065f46",fontWeight:600},children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})}),"No sub-type for ",t.type]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:"#f8fafc",borderRadius:10,border:"1.5px solid #f1f5f9"},children:[e.jsx("span",{style:{fontSize:11,color:"#94a3b8",fontWeight:700,textTransform:"uppercase",letterSpacing:".05em"},children:"Preview:"}),e.jsx("span",{style:{fontWeight:700,fontSize:13,color:"#0f172a"},children:[t.productName||"…",t.type,t.subType].filter(Boolean).join(" - ")})]})]}),e.jsxs("div",{className:"plx-modal-foot",children:[e.jsx("button",{className:"plx-btn-cancel",onClick:()=>h(null),children:"Cancel"}),e.jsx("button",{className:"plx-btn-save",onClick:A,disabled:S||!t.productName||!t.type||!n.has(t.type)&&!t.subType,children:S?"Saving…":"Save changes"})]})]})}),i&&e.jsx("div",{className:"plx-backdrop",onClick:l=>{l.target===l.currentTarget&&u(null)},children:e.jsxs("div",{className:"plx-modal",style:{maxWidth:380},children:[e.jsxs("div",{className:"plx-modal-head",style:{background:"#7f1d1d"},children:[e.jsx("span",{className:"plx-modal-title",children:"Delete Product?"}),e.jsx("button",{className:"plx-modal-close",onClick:()=>u(null),children:e.jsx(D,{})})]}),e.jsxs("div",{style:{padding:"28px 24px",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:12},children:[e.jsx("div",{style:{width:52,height:52,borderRadius:"50%",background:"#fef2f2",display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #fecaca",color:"#dc2626"},children:e.jsx(M,{})}),e.jsx("p",{style:{fontWeight:700,fontSize:15,color:"#0f172a",margin:0},children:"Delete this product?"}),e.jsxs("p",{style:{fontSize:13,color:"#64748b",lineHeight:1.6,margin:0},children:["You're about to permanently delete"," ",e.jsx("strong",{style:{color:"#0f172a"},children:[i.productName,i.type,i.subType].filter(Boolean).join(" - ")}),". This cannot be undone."]})]}),e.jsxs("div",{className:"plx-modal-foot",children:[e.jsx("button",{className:"plx-btn-cancel",onClick:()=>u(null),children:"Cancel"}),e.jsx("button",{onClick:_,style:{padding:"9px 22px",borderRadius:9,border:"none",background:"#dc2626",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans', sans-serif"},children:"Delete Permanently"})]})]})})]})})]})}export{G as default};
