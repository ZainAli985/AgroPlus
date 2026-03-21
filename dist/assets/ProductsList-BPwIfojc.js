import{a as k,A as S,j as e,S as O,N as H}from"./index-BWY0DqWv.js";import{b as r}from"./react-BBT0yyZ1.js";const J="@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');",V=`
  .pl-root { font-family: 'Plus Jakarta Sans', sans-serif; }
  .pl-mono { font-family: 'IBM Plex Mono', monospace; }

  /* Stat cards */
  .pl-stat {
    background: #fff; border: 1.5px solid #e8eaf0; border-radius: 14px;
    padding: 16px 20px; display: flex; flex-direction: column; gap: 4px;
    position: relative; overflow: hidden;
  }
  .pl-stat::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    border-radius: 14px 14px 0 0;
  }
  .pl-stat.active-stat::before  { background: linear-gradient(90deg, #22c55e, #16a34a); }
  .pl-stat.total-stat::before   { background: linear-gradient(90deg, #6366f1, #8b5cf6); }
  .pl-stat.pending-stat::before { background: linear-gradient(90deg, #f59e0b, #d97706); }

  /* Type filter pills */
  .pl-type-pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600;
    border: 1.5px solid #e2e8f0; background: #fff; color: #64748b;
    cursor: pointer; transition: all .12s; font-family: 'Plus Jakarta Sans', sans-serif;
    white-space: nowrap;
  }
  .pl-type-pill:hover { border-color: #94a3b8; color: #334155; }
  .pl-type-pill.active { color: var(--tc); border-color: var(--tc); background: var(--tbg); }

  /* Variety card */
  .pl-variety {
    background: #fff; border: 1.5px solid #e8eaf0; border-radius: 14px;
    overflow: hidden; transition: box-shadow .15s;
  }
  .pl-variety:hover { box-shadow: 0 4px 20px rgba(0,0,0,.06); }
  .pl-variety.has-active { border-color: #bbf7d0; }

  .pl-variety-head {
    display: flex; align-items: center; gap: 12px; padding: 12px 16px;
    cursor: pointer; border: none; background: none; width: 100%;
    text-align: left; transition: background .1s;
  }
  .pl-variety-head:hover { background: #fafafa; }

  /* Progress bar */
  .pl-progress-track {
    flex: 1; height: 5px; background: #f1f5f9; border-radius: 10px; overflow: hidden;
    min-width: 60px; max-width: 120px;
  }
  .pl-progress-fill {
    height: 100%; border-radius: 10px; transition: width .4s cubic-bezier(.4,0,.2,1);
    background: linear-gradient(90deg, #22c55e, #16a34a);
  }

  /* Product table */
  .pl-table { width: 100%; border-collapse: collapse; }
  .pl-table thead th {
    padding: 8px 14px; font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: #94a3b8; background: #f8fafc;
    text-align: left; border-bottom: 1px solid #f1f5f9; white-space: nowrap;
  }
  .pl-table thead th:last-child { text-align: right; }
  .pl-table tbody tr {
    border-bottom: 1px solid #f8fafc; transition: background .08s;
  }
  .pl-table tbody tr:last-child { border-bottom: none; }
  .pl-table tbody tr:hover { background: #fafafa; }
  .pl-table tbody tr.row-active { background: linear-gradient(90deg, #f0fdf480, transparent 60%); }
  .pl-table tbody td { padding: 9px 14px; font-size: 12.5px; color: #334155; }
  .pl-table tbody td:last-child { text-align: right; }

  /* Activate button */
  .pl-btn-activate {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 5px 12px; border-radius: 7px; font-size: 11px; font-weight: 700;
    background: #f0fdf4; color: #15803d; border: 1.5px solid #86efac;
    cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; transition: all .12s;
    white-space: nowrap;
  }
  .pl-btn-activate:hover:not(:disabled) { background: #dcfce7; border-color: #4ade80; }
  .pl-btn-activate:disabled { opacity: .5; cursor: not-allowed; }
  .pl-btn-activate.loading { background: #f8fafc; color: #94a3b8; border-color: #e2e8f0; }

  .pl-badge-active {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 4px 10px; border-radius: 7px; font-size: 11px; font-weight: 700;
    background: #f0fdf4; color: #16a34a; border: 1.5px solid #bbf7d0;
    font-family: 'IBM Plex Mono', monospace;
  }

  /* Activate-all button */
  .pl-btn-activate-all {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 10px; border-radius: 7px; font-size: 10.5px; font-weight: 700;
    background: transparent; color: #6366f1; border: 1.5px solid #c7d2fe;
    cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; transition: all .12s;
    white-space: nowrap;
  }
  .pl-btn-activate-all:hover { background: #eef2ff; }

  /* Account chip */
  .pl-account-chip {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 2px 7px; border-radius: 5px; font-size: 10px; font-weight: 600;
    background: #eef2ff; color: #6366f1; border: 1px solid #c7d2fe;
    font-family: 'IBM Plex Mono', monospace; max-width: 180px;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }

  /* Slide animation */
  @keyframes pl-slide-down {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .pl-table-wrap { animation: pl-slide-down .15s ease both; }

  @keyframes pl-spin { to { transform: rotate(360deg); } }
  .pl-spinner {
    width: 24px; height: 24px; border: 2.5px solid #e2e8f0;
    border-top-color: #6366f1; border-radius: 50%;
    animation: pl-spin .65s linear infinite;
  }

  /* Search highlight */
  .pl-highlight { background: #fef08a; border-radius: 2px; padding: 0 1px; }
`,M=["Rice","Broken","Paddy","Polish","Phukar"],I={Rice:{color:"#1d4ed8",bg:"#dbeafe",dot:"#3b82f6",emoji:"🌾"},Broken:{color:"#6d28d9",bg:"#ede9fe",dot:"#8b5cf6",emoji:"🍚"},Paddy:{color:"#15803d",bg:"#dcfce7",dot:"#22c55e",emoji:"🌿"},Polish:{color:"#c2410c",bg:"#ffedd5",dot:"#f97316",emoji:"✨"},Phukar:{color:"#b91c1c",bg:"#fee2e2",dot:"#ef4444",emoji:"🍃"}},D={Brown:{bg:"#fef9c3",color:"#854d0e",border:"#fde68a"},"White (Raw)":{bg:"#f8fafc",color:"#334155",border:"#e2e8f0"},"White (Double Polish)":{bg:"#e0f2fe",color:"#0369a1",border:"#bae6fd"},"White (Silky-Water Polish)":{bg:"#dbeafe",color:"#1e40af",border:"#bfdbfe"},Steamed:{bg:"#ecfdf5",color:"#065f46",border:"#6ee7b7"},"Sella (Creamy)":{bg:"#fef3c7",color:"#92400e",border:"#fde68a"},"Sella (Golden)":{bg:"#fef9c3",color:"#713f12",border:"#fcd34d"}};function K(){const[n,h]=r.useState([]),[b,w]=r.useState(!0),[g,u]=r.useState(!1),[R,A]=r.useState(null),[C,v]=r.useState(null),[c,m]=r.useState(""),[l,j]=r.useState(""),[f,i]=r.useState(""),[z,x]=r.useState({message:"",type:"info"}),d=(t,o="success")=>x({message:t,type:o}),y=async()=>{w(!0);try{const o=await(await k(`${S}/products`)).json();o.success&&(o.products.length===0?await B(!0):h(o.products))}catch{d("Failed to load products.","error")}finally{w(!1)}},B=async(t=!1)=>{u(!0);try{const a=await(await k(`${S}/products/seed`,{method:"POST"})).json();if(a.success){t||d(a.message);const s=await(await k(`${S}/products`)).json();s.success&&h(s.products)}else d(a.message||"Seed failed.","error")}catch{d("Seed error.","error")}finally{u(!1)}},$=r.useCallback(async t=>{if(!t.isActive){A(t._id);try{const a=await(await k(`${S}/products/${t._id}/activate`,{method:"PATCH"})).json();a.success?(h(p=>p.map(s=>s._id===t._id?{...s,...a.product}:s)),d(a.message)):d(a.message||"Failed.","error")}catch{d("Server error.","error")}finally{A(null)}}},[]),_=r.useCallback(async(t,o)=>{if(o.length){v(t);for(const a of o)try{const s=await(await k(`${S}/products/${a._id}/activate`,{method:"PATCH"})).json();s.success&&h(Y=>Y.map(L=>L._id===a._id?{...L,...s.product}:L))}catch{}d(`All ${t} products activated!`),v(null)}},[]);r.useEffect(()=>{y()},[]);const N=n.filter(t=>t.isActive).length,E=n.length-N,P=r.useMemo(()=>{let t=n;if(l&&(t=t.filter(o=>o.type===l)),f==="active"&&(t=t.filter(o=>o.isActive)),f==="inactive"&&(t=t.filter(o=>!o.isActive)),c.trim()){const o=c.trim().toLowerCase();t=t.filter(a=>a.variety?.toLowerCase().includes(o)||a.productName?.toLowerCase().includes(o)||a.type?.toLowerCase().includes(o)||a.subType?.toLowerCase().includes(o))}return t},[n,l,f,c]),F=r.useMemo(()=>{const t=new Map;for(const o of P)t.has(o.variety)||t.set(o.variety,[]),t.get(o.variety).push(o);for(const[,o]of t)o.sort((a,p)=>{const s=M.indexOf(a.type)-M.indexOf(p.type);return s!==0?s:(a.subType||"").localeCompare(p.subType||"")});return t},[P]),W=[...F.keys()],T=c||l||f;return e.jsxs(e.Fragment,{children:[e.jsxs(O,{children:[e.jsxs("style",{children:[J,V]}),e.jsxs("div",{className:"pl-root",children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("p",{style:{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#94a3b8",margin:"0 0 4px"},children:"Mill Catalogue"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10},children:[e.jsx("h1",{style:{margin:0,fontSize:24,fontWeight:800,color:"#0f172a",letterSpacing:"-.4px"},children:"Products"}),e.jsxs("button",{onClick:()=>B(!1),disabled:g,style:{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:9,border:"1.5px solid #e2e8f0",background:g?"#f8fafc":"#0f172a",color:g?"#94a3b8":"#fff",fontSize:12,fontWeight:700,cursor:g?"not-allowed":"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all .12s"},children:[e.jsx("span",{style:{display:"inline-block",fontSize:13},children:"↻"}),g?"Seeding…":"Re-seed Catalogue"]})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20},children:[e.jsxs("div",{className:"pl-stat total-stat",children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#94a3b8",letterSpacing:".06em",textTransform:"uppercase"},children:"Total Products"}),e.jsx("span",{className:"pl-mono",style:{fontSize:28,fontWeight:600,color:"#0f172a",lineHeight:1},children:n.length}),e.jsxs("span",{style:{fontSize:11,color:"#94a3b8"},children:["across ",new Set(n.map(t=>t.variety)).size," varieties"]})]}),e.jsxs("div",{className:"pl-stat active-stat",children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#94a3b8",letterSpacing:".06em",textTransform:"uppercase"},children:"Activated"}),e.jsx("span",{className:"pl-mono",style:{fontSize:28,fontWeight:600,color:"#16a34a",lineHeight:1},children:N}),e.jsxs("span",{style:{fontSize:11,color:"#94a3b8"},children:[n.length>0?Math.round(N/n.length*100):0,"% of catalogue"]})]}),e.jsxs("div",{className:"pl-stat pending-stat",children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#94a3b8",letterSpacing:".06em",textTransform:"uppercase"},children:"Pending"}),e.jsx("span",{className:"pl-mono",style:{fontSize:28,fontWeight:600,color:"#d97706",lineHeight:1},children:E}),e.jsx("span",{style:{fontSize:11,color:"#94a3b8"},children:"not yet activated"})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14},children:[e.jsx("button",{className:`pl-type-pill${l===""?" active":""}`,style:{"--tc":"#0f172a","--tbg":"#f1f5f9"},onClick:()=>j(""),children:"All Types"}),M.map(t=>{const o=I[t],a=n.filter(s=>s.type===t).length,p=n.filter(s=>s.type===t&&s.isActive).length;return e.jsxs("button",{className:`pl-type-pill${l===t?" active":""}`,style:{"--tc":o.color,"--tbg":o.bg},onClick:()=>j(l===t?"":t),children:[e.jsx("span",{children:o.emoji}),t,e.jsxs("span",{className:"pl-mono",style:{fontSize:9,opacity:.7},children:[p,"/",a]})]},t)})]}),e.jsxs("div",{style:{background:"#fff",border:"1.5px solid #e2e8f0",borderRadius:12,padding:"10px 14px",marginBottom:16,display:"flex",flexWrap:"wrap",gap:8,alignItems:"center"},children:[e.jsxs("div",{style:{position:"relative",flex:1,minWidth:200},children:[e.jsx("svg",{style:{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#94a3b8",pointerEvents:"none"},width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"})}),e.jsx("input",{value:c,onChange:t=>m(t.target.value),placeholder:"Search variety, type, sub-type…",style:{width:"100%",padding:"7px 10px 7px 30px",border:"1.5px solid #e2e8f0",borderRadius:8,fontSize:12.5,outline:"none",fontFamily:"inherit",transition:".12s"}})]}),e.jsxs("select",{value:f,onChange:t=>i(t.target.value),style:{padding:"7px 10px",border:"1.5px solid #e2e8f0",borderRadius:8,fontSize:12.5,outline:"none",background:"#fff",fontFamily:"inherit"},children:[e.jsx("option",{value:"",children:"All Status"}),e.jsx("option",{value:"active",children:"Active Only"}),e.jsx("option",{value:"inactive",children:"Not Yet Activated"})]}),T&&e.jsx("button",{onClick:()=>{m(""),j(""),i("")},style:{padding:"7px 12px",border:"1.5px solid #fecaca",borderRadius:8,background:"#fef2f2",fontSize:12,fontWeight:600,color:"#dc2626",cursor:"pointer",fontFamily:"inherit"},children:"Clear ✕"}),e.jsxs("span",{className:"pl-mono",style:{marginLeft:"auto",fontSize:11,color:"#94a3b8"},children:[P.length," products · ",W.length," varieties"]})]}),b?e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",padding:"60px 0",gap:14},children:[e.jsx("div",{className:"pl-spinner"}),e.jsx("p",{style:{color:"#94a3b8",fontSize:13},children:"Loading catalogue…"})]}):W.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"60px 0"},children:[e.jsx("div",{style:{fontSize:40,marginBottom:12},children:"🌾"}),e.jsx("p",{style:{fontSize:14,fontWeight:700,color:"#334155",margin:"0 0 4px"},children:T?"No products match your filters":"No products found"}),e.jsx("p",{style:{fontSize:12,color:"#94a3b8"},children:T?"Try clearing your filters":"Click Re-seed Catalogue to load products"})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:W.map(t=>{const o=F.get(t),a=o.filter(s=>s.isActive).length,p=o.filter(s=>!s.isActive);return e.jsx(G,{variety:t,products:o,activeCount:a,inactiveProducts:p,togglingId:R,isBulking:C===t,searchQ:c.trim().toLowerCase(),onActivate:$,onActivateAll:_,autoExpand:!!c.trim()},t)})})]})]}),e.jsx(H,{message:z.message,type:z.type,onClose:()=>x({message:"",type:"info"})})]})}function G({variety:n,products:h,activeCount:b,inactiveProducts:w,togglingId:g,isBulking:u,searchQ:R,onActivate:A,onActivateAll:C,autoExpand:v}){const[c,m]=r.useState(!1),l=h.length,j=l>0?Math.round(b/l*100):0,f=b===l;return r.useEffect(()=>{m(!!v)},[v]),e.jsxs("div",{className:`pl-variety${b>0?" has-active":""}`,children:[e.jsxs("button",{className:"pl-variety-head",onClick:()=>m(i=>!i),children:[e.jsx("span",{style:{flex:1,fontSize:13.5,fontWeight:700,color:"#0f172a",textAlign:"left"},children:n}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginRight:8},children:[e.jsx("div",{className:"pl-progress-track",children:e.jsx("div",{className:"pl-progress-fill",style:{width:`${j}%`}})}),e.jsxs("span",{className:"pl-mono",style:{fontSize:10.5,color:f?"#16a34a":"#94a3b8",fontWeight:600,minWidth:42,textAlign:"right"},children:[b,"/",l]})]}),!f&&c&&e.jsx("button",{className:"pl-btn-activate-all",onClick:i=>{i.stopPropagation(),C(n,w)},disabled:u,style:{marginRight:8},children:u?e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{display:"inline-block",animation:"pl-spin .65s linear infinite",border:"2px solid #c7d2fe",borderTopColor:"#6366f1",borderRadius:"50%",width:10,height:10}})," Activating…"]}):e.jsx(e.Fragment,{children:"⚡ Activate All"})}),f&&e.jsx("span",{style:{fontSize:10,fontWeight:700,color:"#16a34a",marginRight:8,background:"#f0fdf4",border:"1px solid #bbf7d0",padding:"2px 8px",borderRadius:20},children:"✓ Complete"}),e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"#94a3b8",strokeWidth:2.5,style:{flexShrink:0,transition:"transform .2s",transform:c?"rotate(180deg)":"none"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),c&&e.jsx("div",{className:"pl-table-wrap",children:e.jsxs("table",{className:"pl-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:32},children:"#"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Sub-Type"}),e.jsx("th",{children:"Account"}),e.jsx("th",{children:"Status"})]})}),e.jsx("tbody",{children:h.map((i,z)=>{const x=I[i.type]||{color:"#374151",bg:"#f3f4f6",dot:"#94a3b8"},d=D[i.subType],y=g===i._id||u;return e.jsxs("tr",{className:i.isActive?"row-active":"",children:[e.jsx("td",{className:"pl-mono",style:{color:"#cbd5e1",fontSize:11},children:String(z+1).padStart(2,"0")}),e.jsx("td",{children:e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,background:x.bg,color:x.color,border:`1px solid ${x.dot}44`},children:[e.jsx("span",{style:{width:5,height:5,borderRadius:"50%",background:x.dot,flexShrink:0}}),i.type]})}),e.jsx("td",{children:i.subType?e.jsx("span",{style:{display:"inline-block",padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:600,background:d?.bg||"#f3f4f6",color:d?.color||"#374151",border:`1px solid ${d?.border||"#e2e8f0"}`},children:i.subType}):e.jsx("span",{style:{fontSize:11,color:"#cbd5e1",fontStyle:"italic"},children:"—"})}),e.jsx("td",{children:i.isActive&&i.linkedAccountId?e.jsxs("span",{className:"pl-account-chip",children:[e.jsx("svg",{width:8,height:8,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"})}),i.linkedAccountId.accountName||i.productName]}):e.jsx("span",{style:{fontSize:11,color:"#e2e8f0"},children:"—"})}),e.jsx("td",{children:i.isActive?e.jsxs("span",{className:"pl-badge-active",children:[e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:3,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})}),"Active"]}):e.jsxs("button",{className:`pl-btn-activate${y?" loading":""}`,onClick:()=>A(i),disabled:y,children:[y?e.jsx("span",{style:{display:"inline-block",width:9,height:9,border:"2px solid #e2e8f0",borderTopColor:"#94a3b8",borderRadius:"50%",animation:"pl-spin .65s linear infinite"}}):e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13 10V3L4 14h7v7l9-11h-7z"})}),y?"Activating…":"Activate"]})})]},i._id)})})]})})]})}export{K as default};
