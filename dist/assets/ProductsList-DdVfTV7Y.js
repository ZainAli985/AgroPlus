import{a as y,A as j,j as e,S as B}from"./index-YpCB_77g.js";import{b as a}from"./react-BBT0yyZ1.js";const W=`
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
`,A=`
  .plx-wrap *, .plx-wrap *::before, .plx-wrap *::after { box-sizing: border-box; }
  .plx-wrap {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
    width: 100%;
    max-width: 1060px;
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
    display: inline-flex; align-items: center; justify-content: center;
    width: 32px; height: 32px; border-radius: 8px; border: 1.5px solid #e0e7ff;
    background: #f5f5ff; color: #4f46e5; cursor: pointer;
    transition: all .12s;
  }
  .plx-btn-edit:hover { background: #4f46e5; color: #fff; border-color: #4f46e5; }
  .plx-btn-del {
    display: inline-flex; align-items: center; justify-content: center;
    width: 32px; height: 32px; border-radius: 8px; border: 1.5px solid #fee2e2;
    background: #fef2f2; color: #dc2626; cursor: pointer;
    transition: all .12s;
  }
  .plx-btn-del:hover { background: #dc2626; color: #fff; border-color: #dc2626; }

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

  /* skeleton */
  @keyframes plx-shimmer { to { background-position: -200% 0; } }
  .plx-sk {
    background: linear-gradient(90deg,#f1f5f9 25%,#f8fafc 50%,#f1f5f9 75%);
    background-size: 200% 100%; animation: plx-shimmer 1.4s infinite; border-radius: 6px;
  }
`,R={Peddy:{bg:"#fff7ed",color:"#c2410c"},Rice:{bg:"#ecfdf5",color:"#059669"},Polish:{bg:"#f5f5ff",color:"#4f46e5"},Phukar:{bg:"#fef9c3",color:"#854d0e"}},p={Peddy:["Brown","White"],Rice:["Saila","Basmati","Steamed"],Polish:["White"],Phukar:["Brown"]},_=()=>e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"})}),I=()=>e.jsx("svg",{width:22,height:22,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"})}),F=()=>e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})}),$=()=>e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})}),O=()=>e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})});function L({type:o}){const i=R[o]||{bg:"#f1f5f9",color:"#64748b"};return e.jsx("span",{className:"plx-type-badge",style:{"--plx-bg":i.bg,"--plx-color":i.color},children:o})}function Y(){return e.jsx(e.Fragment,{children:[0,1,2,3,4,5].map(o=>e.jsxs("tr",{className:"plx-row",children:[e.jsx("td",{children:e.jsx("div",{className:"plx-sk",style:{width:"60%",height:14}})}),e.jsx("td",{children:e.jsx("div",{className:"plx-sk",style:{width:60,height:20,borderRadius:6}})}),e.jsx("td",{children:e.jsx("div",{className:"plx-sk",style:{width:50,height:18,borderRadius:6}})}),e.jsx("td",{className:"plx-td-right",children:e.jsx("div",{className:"plx-sk",style:{width:70,height:13,marginLeft:"auto"}})}),e.jsx("td",{className:"plx-td-right",children:e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:8},children:[e.jsx("div",{className:"plx-sk",style:{width:32,height:32,borderRadius:8}}),e.jsx("div",{className:"plx-sk",style:{width:32,height:32,borderRadius:8}})]})})]},o))})}function J(){const[o,i]=a.useState([]),[b,w]=a.useState([]),[m,C]=a.useState(!0),[v,k]=a.useState(!1),[n,N]=a.useState(""),[r,g]=a.useState(""),[d,x]=a.useState(""),[S,c]=a.useState(null),[s,f]=a.useState({productName:"",type:"",subType:""});a.useEffect(()=>{(async()=>{try{const t=await(await y(`${j}/products`)).json();t.success&&(i(t.products),w(t.products))}catch(l){console.error(l)}finally{C(!1)}})()},[]),a.useEffect(()=>{let l=o;n&&(l=l.filter(t=>t.productName.toLowerCase().includes(n.toLowerCase()))),r&&(l=l.filter(t=>t.type===r)),d&&(l=l.filter(t=>t.subType===d)),w(l)},[n,r,d,o]);const P=()=>{N(""),g(""),x("")},T=n||r||d,z=l=>{c(l),f({productName:l.productName,type:l.type,subType:l.subType})},M=async()=>{if(!(!s.productName||!s.type||!s.subType)){k(!0);try{const t=await(await y(`${j}/products/${S._id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})).json();if(!t.success){alert(t.message||"Update failed");return}const h=o.map(u=>u._id===t.product._id?t.product:u);i(h),c(null)}catch(l){console.error(l)}finally{k(!1)}}},E=async l=>{if(window.confirm("Delete this product permanently?"))try{const h=await(await y(`${j}/products/${l}`,{method:"DELETE"})).json();h.success?i(u=>u.filter(D=>D._id!==l)):alert(h.message||"Delete failed")}catch(t){console.error(t)}};return e.jsxs(B,{children:[e.jsxs("style",{children:[W,A]}),e.jsxs("div",{className:"plx-wrap",children:[e.jsxs("div",{style:{marginBottom:24},children:[e.jsx("p",{className:"plx-eyebrow",children:"Inventory"}),e.jsx("h1",{className:"plx-title",children:"Products"}),e.jsx("p",{className:"plx-subtitle",children:m?"Loading…":`${o.length} product${o.length!==1?"s":""} in inventory`})]}),e.jsxs("div",{className:"plx-filter-bar",style:{marginBottom:14},children:[e.jsxs("div",{className:"plx-field",style:{minWidth:200},children:[e.jsx("label",{className:"plx-label",children:"Search"}),e.jsxs("div",{className:"plx-search-wrap",children:[e.jsx("span",{className:"plx-search-icon",children:e.jsx(_,{})}),e.jsx("input",{className:"plx-input plx-input-search",placeholder:"Product name…",value:n,onChange:l=>N(l.target.value)})]})]}),e.jsxs("div",{className:"plx-field",children:[e.jsx("label",{className:"plx-label",children:"Type"}),e.jsxs("select",{className:"plx-select",value:r,onChange:l=>{g(l.target.value),x("")},children:[e.jsx("option",{value:"",children:"All Types"}),Object.keys(p).map(l=>e.jsx("option",{value:l,children:l},l))]})]}),e.jsxs("div",{className:"plx-field",children:[e.jsx("label",{className:"plx-label",children:"Sub Type"}),e.jsxs("select",{className:"plx-select",value:d,disabled:!r,onChange:l=>x(l.target.value),children:[e.jsx("option",{value:"",children:"All Sub Types"}),r&&p[r].map(l=>e.jsx("option",{value:l,children:l},l))]})]}),e.jsxs("span",{className:"plx-count-chip",children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 6h16M4 12h16M4 18h16"})}),m?"…":b.length," shown"]}),T&&e.jsx("button",{className:"plx-clear-btn",onClick:P,children:"Clear filters"})]}),e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16},children:["",...Object.keys(p)].map(l=>e.jsx("button",{className:`plx-pill${r===l?" plx-pill-active":""}`,onClick:()=>{g(l),x("")},children:l||"All Types"},l||"all"))}),e.jsx("div",{className:"plx-panel",children:e.jsxs("table",{className:"plx-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Product Name"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Sub Type"}),e.jsx("th",{className:"plx-th-right",children:"Created"}),e.jsx("th",{className:"plx-th-right",children:"Actions"})]})}),e.jsx("tbody",{children:m?e.jsx(Y,{}):b.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:5,children:e.jsxs("div",{className:"plx-empty",children:[e.jsx("div",{className:"plx-empty-icon",children:e.jsx(I,{})}),e.jsx("p",{className:"plx-empty-title",children:"No products found"}),e.jsx("p",{className:"plx-empty-sub",children:T?"Try clearing your filters":"No products have been added yet"})]})})}):b.map(l=>e.jsxs("tr",{className:"plx-row",children:[e.jsx("td",{children:e.jsx("span",{className:"plx-product-name",children:l.productName})}),e.jsx("td",{children:e.jsx(L,{type:l.type})}),e.jsx("td",{children:e.jsx("span",{className:"plx-subtype-badge",children:l.subType})}),e.jsx("td",{className:"plx-td-right plx-td-mono",children:new Date(l.createdAt).toLocaleDateString("en-PK",{day:"numeric",month:"short",year:"numeric"})}),e.jsx("td",{className:"plx-td-right",children:e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:8},children:[e.jsx("button",{className:"plx-btn-edit",onClick:()=>z(l),title:"Edit",children:e.jsx(F,{})}),e.jsx("button",{className:"plx-btn-del",onClick:()=>E(l._id),title:"Delete",children:e.jsx($,{})})]})})]},l._id))})]})}),S&&e.jsx("div",{className:"plx-backdrop",onClick:l=>{l.target===l.currentTarget&&c(null)},children:e.jsxs("div",{className:"plx-modal",children:[e.jsxs("div",{className:"plx-modal-head",children:[e.jsx("span",{className:"plx-modal-title",children:"Edit Product"}),e.jsx("button",{className:"plx-modal-close",onClick:()=>c(null),children:e.jsx(O,{})})]}),e.jsxs("div",{className:"plx-modal-body",children:[e.jsxs("div",{className:"plx-field",style:{minWidth:"unset"},children:[e.jsx("label",{className:"plx-label",children:"Product Name"}),e.jsx("input",{className:"plx-input",placeholder:"Product name",value:s.productName,onChange:l=>f(t=>({...t,productName:l.target.value}))})]}),e.jsxs("div",{className:"plx-field",style:{minWidth:"unset"},children:[e.jsx("label",{className:"plx-label",children:"Type"}),e.jsxs("select",{className:"plx-select",value:s.type,onChange:l=>f(t=>({...t,type:l.target.value,subType:""})),children:[e.jsx("option",{value:"",children:"Select type…"}),Object.keys(p).map(l=>e.jsx("option",{value:l,children:l},l))]})]}),e.jsxs("div",{className:"plx-field",style:{minWidth:"unset"},children:[e.jsx("label",{className:"plx-label",children:"Sub Type"}),e.jsxs("select",{className:"plx-select",value:s.subType,disabled:!s.type,onChange:l=>f(t=>({...t,subType:l.target.value})),children:[e.jsx("option",{value:"",children:"Select sub type…"}),s.type&&p[s.type].map(l=>e.jsx("option",{value:l,children:l},l))]})]}),s.type&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:"#f8fafc",borderRadius:10,border:"1.5px solid #f1f5f9"},children:[e.jsx("span",{style:{fontSize:12,color:"#94a3b8",fontWeight:600},children:"Preview:"}),e.jsx(L,{type:s.type}),s.subType&&e.jsx("span",{className:"plx-subtype-badge",children:s.subType})]})]}),e.jsxs("div",{className:"plx-modal-foot",children:[e.jsx("button",{className:"plx-btn-cancel",onClick:()=>c(null),children:"Cancel"}),e.jsx("button",{className:"plx-btn-save",onClick:M,disabled:v||!s.productName||!s.type||!s.subType,children:v?"Saving…":"Save changes"})]})]})})]})]})}export{J as default};
