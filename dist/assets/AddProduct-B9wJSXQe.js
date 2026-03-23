import{a as h,j as e,S as C,N as B,A as u}from"./index-C5rt_xmB.js";import{b as t}from"./react-BBT0yyZ1.js";const $=`
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
`,W=`
  .apx-wrap *, .apx-wrap *::before, .apx-wrap *::after { box-sizing: border-box; }

  .apx-wrap {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
    width: 100%;
    max-width: 560px;
    margin: 0 auto;
  }

  /* eyebrow + title */
  .apx-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: .12em;
    text-transform: uppercase; color: #9ca3af; margin-bottom: 6px;
  }
  .apx-title {
    font-family: 'Lora', serif; font-size: 26px; font-weight: 700;
    color: #0f172a; letter-spacing: -.3px; line-height: 1.15;
  }
  .apx-subtitle { font-size: 13px; color: #94a3b8; margin-top: 5px; }

  /* card */
  .apx-card {
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 16px;
    overflow: hidden; box-shadow: 0 1px 6px rgba(0,0,0,.05);
  }
  .apx-card-head {
    padding: 18px 24px; border-bottom: 1.5px solid #f1f5f9;
    background: linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%);
    display: flex; align-items: center; gap: 12px;
  }
  .apx-card-head-icon {
    width: 38px; height: 38px; border-radius: 10px;
    background: #f5f5ff; color: #4f46e5;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .apx-card-head-title {
    font-family: 'Lora', serif; font-size: 15px; font-weight: 600;
    color: #0f172a; font-style: italic;
  }
  .apx-card-head-sub {
    font-size: 11.5px; color: #94a3b8; margin-top: 1px;
  }
  .apx-card-body { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
  .apx-card-foot {
    padding: 16px 24px; border-top: 1.5px solid #f1f5f9;
    background: #f8fafc; display: flex; justify-content: flex-end; gap: 10px;
  }

  /* field */
  .apx-field-lbl {
    display: block; font-size: 12px; font-weight: 600;
    color: #374151; margin-bottom: 7px; letter-spacing: .01em;
  }
  .apx-field-lbl span { color: #ef4444; margin-left: 2px; }

  .apx-input, .apx-select {
    width: 100%; padding: 10px 14px; border-radius: 10px;
    border: 1.5px solid #e2e8f0; font-size: 13.5px; color: #0f172a;
    font-family: 'DM Sans', sans-serif; background: #fff;
    transition: border-color .15s, box-shadow .15s; outline: none;
    appearance: none; -webkit-appearance: none;
  }
  .apx-input::placeholder { color: #cbd5e1; }
  .apx-input:focus, .apx-select:focus {
    border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.12);
  }
  .apx-select-wrap { position: relative; }
  .apx-select-wrap::after {
    content: '';
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    width: 0; height: 0;
    border-left: 4px solid transparent; border-right: 4px solid transparent;
    border-top: 5px solid #94a3b8; pointer-events: none;
  }
  .apx-select.disabled { background: #f8fafc; color: #94a3b8; cursor: not-allowed; }

  /* type pills */
  .apx-pills { display: flex; flex-wrap: wrap; gap: 8px; }
  .apx-pill {
    padding: 7px 16px; border-radius: 20px; font-size: 13px; font-weight: 600;
    border: 1.5px solid #e2e8f0; background: #f8fafc; color: #64748b;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .12s;
    user-select: none;
  }
  .apx-pill:hover { border-color: #c7d2fe; color: #4f46e5; background: #f5f5ff; }
  .apx-pill-active {
    border-color: #6366f1; background: #eef2ff; color: #4338ca; font-weight: 700;
  }

  /* subtype pills (smaller, green accent) */
  .apx-subpill {
    padding: 6px 14px; border-radius: 20px; font-size: 12.5px; font-weight: 600;
    border: 1.5px solid #e2e8f0; background: #f8fafc; color: #64748b;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .12s;
    user-select: none;
  }
  .apx-subpill:hover { border-color: #6ee7b7; color: #059669; background: #f0fdf4; }
  .apx-subpill-active {
    border-color: #34d399; background: #ecfdf5; color: #065f46; font-weight: 700;
  }

  /* preview tile */
  .apx-preview {
    background: #f8fafc; border: 1.5px dashed #e2e8f0; border-radius: 12px;
    padding: 14px 18px; display: flex; align-items: center; gap: 12px;
    transition: border-color .2s, background .2s;
  }
  .apx-preview-filled {
    background: #f5f5ff; border-color: #c7d2fe; border-style: solid;
  }
  .apx-preview-dot {
    width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
    background: #eef2ff; color: #6366f1;
    display: flex; align-items: center; justify-content: center;
  }
  .apx-preview-name {
    font-family: 'Lora', serif; font-size: 15px; font-weight: 600;
    color: #0f172a; line-height: 1.2;
  }
  .apx-preview-meta {
    font-size: 12px; color: #94a3b8; margin-top: 2px;
  }
  .apx-preview-empty {
    font-size: 13px; color: #cbd5e1; font-style: italic;
  }

  /* buttons */
  .apx-btn-primary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 10px 22px; border-radius: 10px; border: none; cursor: pointer;
    background: #4f46e5; color: #fff; font-size: 13px; font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    box-shadow: 0 2px 8px rgba(79,70,229,.25);
    transition: background .15s, box-shadow .15s;
  }
  .apx-btn-primary:hover:not(:disabled) {
    background: #4338ca; box-shadow: 0 4px 14px rgba(79,70,229,.35);
  }
  .apx-btn-primary:disabled { opacity: .5; cursor: not-allowed; }

  .apx-btn-ghost {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 10px 18px; border-radius: 10px; border: 1.5px solid #e2e8f0;
    cursor: pointer; background: #fff; color: #64748b; font-size: 13px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; transition: all .12s;
  }
  .apx-btn-ghost:hover { border-color: #94a3b8; color: #334155; background: #f8fafc; }

  @keyframes apx-spin { to { transform: rotate(360deg); } }
  .apx-spin { animation: apx-spin 1s linear infinite; display: inline-block; }
`,i={Peddy:[],Rice:["Brown","White","Steamed","Sella"],"Broken Rice":["Brown","White","Steamed","Sella"],Polish:[],Phukar:[]},D={Peddy:e.jsx("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"})}),Rice:e.jsxs("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:[e.jsx("circle",{cx:"12",cy:"12",r:"3"}),e.jsx("path",{strokeLinecap:"round",d:"M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"})]}),"Broken Rice":e.jsx("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M8 6h.01M16 18h.01M12 12h.01"})}),Polish:e.jsx("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"})}),Phukar:e.jsx("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"})})};function R(){const[n,b]=t.useState(""),[s,g]=t.useState(""),[o,c]=t.useState(""),[m,y]=t.useState(!1),[j,p]=t.useState({message:"",type:"info"}),[v,w]=t.useState([]);t.useEffect(()=>{h(`${u}/products`).then(r=>r.json()).then(r=>{r.success&&w(r.products)}).catch(()=>{})},[]);const x=(r,a)=>v.some(l=>l.type===r&&l.subType===(a||"")),k=r=>i[r].length===0&&v.some(a=>a.type===r),M=r=>i[r].length>0&&i[r].every(a=>x(r,a)),f=s?i[s].length>0:!1,T=s&&i[s].length>0&&o&&x(s,o),P=s&&k(s),S=n.trim()&&s&&(!f||o)&&!T&&!P,N=()=>{b(""),g(""),c("")},z=async r=>{if(r.preventDefault(),!!S){y(!0);try{const l=await(await h(`${u}/create-products`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({productName:n,type:s,subType:o})})).json();l.success?(p({message:"Product created successfully",type:"success"}),N(),h(`${u}/products`).then(d=>d.json()).then(d=>{d.success&&w(d.products)}).catch(()=>{})):p({message:l.message||"Failed to create product",type:"error"})}catch{p({message:"Server error. Please try again.",type:"error"})}finally{y(!1)}}},L=n.trim()?`${n}${s?` · ${s}`:""}${o?` / ${o}`:""}`:null;return e.jsxs(C,{children:[e.jsxs("style",{children:[$,W]}),e.jsxs("div",{style:{display:"flex",justifyContent:"center",width:"100%",padding:"0 16px"},children:[e.jsx(B,{message:j.message,type:j.type,onClose:()=>p({message:"",type:"info"})}),e.jsxs("div",{className:"apx-wrap",children:[e.jsxs("div",{style:{marginBottom:28},children:[e.jsx("p",{className:"apx-eyebrow",children:"Products"}),e.jsx("h1",{className:"apx-title",children:"Add New Product"}),e.jsx("p",{className:"apx-subtitle",children:"Define a product type and sub-type for use in invoices"})]}),e.jsx("form",{onSubmit:z,children:e.jsxs("div",{className:"apx-card",children:[e.jsxs("div",{className:"apx-card-head",children:[e.jsx("div",{className:"apx-card-head-icon",children:e.jsx("svg",{width:18,height:18,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"})})}),e.jsxs("div",{children:[e.jsx("p",{className:"apx-card-head-title",children:"Product Information"}),e.jsx("p",{className:"apx-card-head-sub",children:"Saved as: Name - Type - SubType"})]})]}),e.jsxs("div",{className:"apx-card-body",children:[e.jsxs("div",{children:[e.jsxs("label",{className:"apx-field-lbl",children:["Product Name ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"apx-input",value:n,onChange:r=>b(r.target.value),placeholder:"e.g. Eeri 06, Super Kernel…",required:!0})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"apx-field-lbl",children:["Type ",e.jsx("span",{children:"*"})]}),e.jsx("div",{className:"apx-pills",children:Object.keys(i).map(r=>{const a=k(r)||M(r);return e.jsxs("button",{type:"button",className:`apx-pill${s===r?" apx-pill-active":""}`,onClick:()=>{a||(g(r),c(""))},title:a?`All ${r} sub-types already exist`:"",style:{opacity:a?.45:1,cursor:a?"not-allowed":"pointer"},children:[e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:6,verticalAlign:"middle"},children:[D[r],r]}),a&&e.jsx("span",{style:{marginLeft:5,fontSize:9,fontWeight:700,letterSpacing:".04em",color:"#94a3b8",textTransform:"uppercase"},children:"Full"})]},r)})})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"apx-field-lbl",style:{color:s?"#374151":"#cbd5e1"},children:["Sub Type ",f&&e.jsx("span",{children:"*"})]}),s?f?e.jsx("div",{className:"apx-pills",children:i[s].map(r=>{const a=x(s,r);return e.jsxs("button",{type:"button",className:`apx-subpill${o===r&&!a?" apx-subpill-active":""}`,onClick:()=>{a||c(r)},title:a?`${s} – ${r} already exists`:"",style:{opacity:a?.4:1,cursor:a?"not-allowed":"pointer"},children:[r,a&&e.jsx("span",{style:{marginLeft:5,fontSize:9,color:"#94a3b8",fontWeight:700},children:"✓ exists"})]},r)})}):e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:20,fontSize:12.5,fontWeight:600,border:"1.5px solid #bbf7d0",background:"#f0fdf4",color:"#065f46"},children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})}),"None (not applicable)"]}):e.jsx("p",{style:{fontSize:13,color:"#cbd5e1",fontStyle:"italic"},children:"Select a type first to see sub-types"})]}),e.jsxs("div",{className:`apx-preview${L?" apx-preview-filled":""}`,children:[e.jsx("div",{className:"apx-preview-dot",children:e.jsx("svg",{width:17,height:17,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"})})}),L?e.jsxs("div",{children:[e.jsx("p",{className:"apx-preview-name",children:[n.trim(),s,o].filter(Boolean).join(" - ")}),e.jsx("p",{className:"apx-preview-meta",children:s?o?`${s} · ${o}`:s:""})]}):e.jsx("p",{className:"apx-preview-empty",children:"Product preview will appear here"})]})]}),e.jsxs("div",{className:"apx-card-foot",children:[e.jsx("button",{type:"button",className:"apx-btn-ghost",onClick:N,children:"Clear"}),e.jsx("button",{type:"submit",className:"apx-btn-primary",disabled:!S||m,children:m?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"apx-spin",children:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})}),"Saving…"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})}),"Save Product"]})})]})]})})]})]})]})}export{R as default};
