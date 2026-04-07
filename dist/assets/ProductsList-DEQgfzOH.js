import{a,j as e}from"./vendor-react-BFXNeceC.js";import{a as M,A,S as V,N as G}from"./index-CaKzjFRj.js";import"./vendor-react-dom-DDWplefk.js";import"./vendor-DDAwBBib.js";const U="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",J=`
  .pl *, .pl *::before, .pl *::after { box-sizing: border-box; }
  .pl { font-family: 'DM Sans', sans-serif; color: #111827; }

  /* ── stat cards ── */
  .pl-stat {
    background: #fff; border: 1px solid #e5e7eb; border-radius: 8px;
    padding: 14px 16px; position: relative; overflow: hidden;
  }
  .pl-stat::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  }
  .pl-stat.s-total::before  { background: #111827; }
  .pl-stat.s-active::before { background: #15803d; }
  .pl-stat.s-pending::before{ background: #d1d5db; }

  /* ── type filter pills ── */
  .pl-pill {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 5px 11px; border-radius: 6px; font-size: 12px; font-weight: 500;
    border: 1px solid #e5e7eb; background: #fff; color: #6b7280;
    cursor: pointer; transition: all .1s; white-space: nowrap;
    font-family: 'DM Sans', sans-serif;
  }
  .pl-pill:hover { border-color: #9ca3af; color: #374151; }
  .pl-pill.on {
    background: var(--tc-bg); color: var(--tc);
    border-color: var(--tc-bd); font-weight: 600;
  }

  /* ── variety card ── */
  .pl-variety {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; overflow: visible; transition: box-shadow .1s;
  }
  .pl-variety:hover { box-shadow: 0 2px 8px rgba(0,0,0,.05); }
  .pl-variety.v-live { border-left: 3px solid #15803d; }

  .pl-vhead {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 14px; cursor: pointer;
    border: none; background: none; width: 100%; text-align: left;
    transition: background .08s; border-radius: 8px;
  }
  .pl-vhead:hover { background: #f9fafb; }

  .pl-track { flex: 1; height: 3px; background: #e5e7eb; border-radius: 3px; overflow: hidden; min-width: 50px; max-width: 100px; }
  .pl-fill  { height: 100%; border-radius: 3px; background: #d1d5db; transition: width .35s; }
  .pl-fill.full { background: #15803d; }

  /* ── product table ── */
  .pl-table { width: 100%; border-collapse: collapse; }
  .pl-table thead th {
    padding: 7px 14px; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .07em; color: #9ca3af;
    background: #f9fafb; text-align: left;
    border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb;
    font-family: 'DM Sans', sans-serif;
  }
  .pl-table thead th:last-child { text-align: right; }
  .pl-table tbody tr { border-bottom: 1px solid #f9fafb; transition: background .07s; }
  .pl-table tbody tr:last-child { border-bottom: none; }
  .pl-table tbody tr:hover { background: #fafafa; }
  .pl-table tbody tr.r-live { background: #f0fdf4; }
  .pl-table tbody tr.r-live:hover { background: #dcfce7; }
  .pl-table tbody td { padding: 9px 14px; font-size: 12.5px; color: #374151; vertical-align: middle; }
  .pl-table tbody td:last-child { text-align: right; }

  /* ── action buttons ── */
  .pl-btn-act {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 11px; border-radius: 6px; font-size: 12px; font-weight: 500;
    background: #fff; color: #374151; border: 1px solid #d1d5db;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .1s;
  }
  .pl-btn-act:hover:not(:disabled) { background: #111827; color: #fff; border-color: #111827; }
  .pl-btn-act:disabled { opacity: .4; cursor: not-allowed; }

  .pl-btn-all {
    display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px;
    border-radius: 6px; font-size: 11.5px; font-weight: 500;
    background: #f9fafb; color: #374151; border: 1px solid #e5e7eb;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .1s;
  }
  .pl-btn-all:hover { background: #f3f4f6; border-color: #d1d5db; }

  .pl-badge-live {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 8px; border-radius: 5px; font-size: 11px; font-weight: 600;
    background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0;
    font-family: 'DM Mono', monospace;
  }

  .pl-acct {
    display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px;
    border-radius: 4px; font-size: 11px; font-weight: 500;
    background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;
    font-family: 'DM Mono', monospace; max-width: 200px;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }

  /* ── skeleton ── */
  @keyframes pl-shimmer { to { background-position: -200% 0; } }
  .pl-skel {
    border-radius: 5px; height: 11px;
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    background-size: 200% 100%; animation: pl-shimmer 1.4s infinite;
  }

  @keyframes pl-slide { from { opacity:0; transform:translateY(-3px); } to { opacity:1; transform:translateY(0); } }
  .pl-slide { animation: pl-slide .13s ease both; }

  @keyframes pl-spin { to { transform: rotate(360deg); } }
  .pl-spin-ico { display: inline-block; animation: pl-spin .65s linear infinite; }
`,W=["Rice","Broken","Paddy","Polish","Phukar"],$={Rice:{color:"#1d4ed8",bg:"#eff6ff",bd:"#bfdbfe",dot:"#3b82f6"},Broken:{color:"#7c3aed",bg:"#f5f3ff",bd:"#ddd6fe",dot:"#8b5cf6"},Paddy:{color:"#15803d",bg:"#f0fdf4",bd:"#bbf7d0",dot:"#22c55e"},Polish:{color:"#c2410c",bg:"#fff7ed",bd:"#fed7aa",dot:"#f97316"},Phukar:{color:"#9f1239",bg:"#fff1f2",bd:"#fecdd3",dot:"#f43f5e"}},K={Brown:{bg:"#fefce8",color:"#854d0e",bd:"#fde68a"},"White (Raw)":{bg:"#f8fafc",color:"#475569",bd:"#e2e8f0"},"White (Double Polish)":{bg:"#e0f2fe",color:"#0369a1",bd:"#bae6fd"},"White (Silky-Water Polish)":{bg:"#eff6ff",color:"#1e40af",bd:"#bfdbfe"},Steamed:{bg:"#f0fdf4",color:"#065f46",bd:"#6ee7b7"},"Sella (Creamy)":{bg:"#fefce8",color:"#92400e",bd:"#fde68a"},"Sella (Golden)":{bg:"#fefce8",color:"#78350f",bd:"#fcd34d"}};function P({text:n="",q:l=""}){if(!l||!n.toLowerCase().includes(l.toLowerCase()))return e.jsx(e.Fragment,{children:n});const x=n.toLowerCase().indexOf(l.toLowerCase());return e.jsxs(e.Fragment,{children:[n.slice(0,x),e.jsx("mark",{style:{background:"#fef08a",borderRadius:2,padding:"0 1px"},children:n.slice(x,x+l.length)}),n.slice(x+l.length)]})}function I(){return e.jsx("span",{className:"pl-spin-ico",style:{width:9,height:9,border:"2px solid #e5e7eb",borderTopColor:"#9ca3af",borderRadius:"50%",display:"inline-block"}})}function te(){const[n,l]=a.useState([]),[x,y]=a.useState(!0),[f,z]=a.useState(!1),[F,v]=a.useState(null),[j,k]=a.useState(null),[c,u]=a.useState(""),[b,w]=a.useState(""),[g,i]=a.useState(""),[m,p]=a.useState({message:"",type:"info"}),d=(t,o="success")=>p({message:t,type:o}),S=async()=>{y(!0);try{const o=await(await M(`${A}/products`)).json();o.success&&(o.products.length?l(o.products):await B(!0))}catch{d("Failed to load products.","error")}finally{y(!1)}},B=async(t=!1)=>{z(!0);try{const s=await(await M(`${A}/products/seed`,{method:"POST"})).json();if(s.success){t||d(s.message);const r=await(await M(`${A}/products`)).json();r.success&&l(r.products)}else d(s.message||"Seed failed.","error")}catch{d("Seed error.","error")}finally{z(!1)}},E=a.useCallback(async t=>{if(!t.isActive){v(t._id);try{const s=await(await M(`${A}/products/${t._id}/activate`,{method:"PATCH"})).json();s.success?(l(h=>h.map(r=>r._id===t._id?{...r,...s.product}:r)),d(s.message)):d(s.message||"Failed.","error")}catch{d("Server error.","error")}finally{v(null)}}},[]),O=a.useCallback(async(t,o)=>{if(o.length){k(t);for(const s of o)try{const r=await(await M(`${A}/products/${s._id}/activate`,{method:"PATCH"})).json();r.success&&l(D=>D.map(T=>T._id===s._id?{...T,...r.product}:T))}catch{}d(`All ${t} products activated!`),k(null)}},[]);a.useEffect(()=>{S()},[]);const N=n.filter(t=>t.isActive).length,H=n.length-N,L=a.useMemo(()=>{let t=n;if(b&&(t=t.filter(o=>o.type===b)),g==="active"&&(t=t.filter(o=>o.isActive)),g==="inactive"&&(t=t.filter(o=>!o.isActive)),c.trim()){const o=c.trim().toLowerCase();t=t.filter(s=>s.variety?.toLowerCase().includes(o)||s.productName?.toLowerCase().includes(o)||s.type?.toLowerCase().includes(o)||s.subType?.toLowerCase().includes(o))}return t},[n,b,g,c]),_=a.useMemo(()=>{const t=new Map;for(const o of L)t.has(o.variety)||t.set(o.variety,[]),t.get(o.variety).push(o);for(const[,o]of t)o.sort((s,h)=>{const r=W.indexOf(s.type)-W.indexOf(h.type);return r!==0?r:(s.subType||"").localeCompare(h.subType||"")});return t},[L]),C=[..._.keys()],R=c||b||g,Y=n.length>0?Math.round(N/n.length*100):0;return e.jsxs(e.Fragment,{children:[e.jsxs(V,{children:[e.jsxs("style",{children:[U,J]}),e.jsxs("div",{className:"pl",style:{maxWidth:960,margin:"0 auto"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:20},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase"},children:"Mill Products"}),e.jsx("h1",{style:{margin:0,fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px"},children:"Product Catalogue"})]}),e.jsxs("button",{onClick:()=>B(!1),disabled:f,style:{display:"inline-flex",alignItems:"center",gap:7,padding:"8px 14px",borderRadius:7,border:"1px solid #e5e7eb",background:f?"#f9fafb":"#111827",color:f?"#9ca3af":"#fff",fontSize:12.5,fontWeight:600,fontFamily:"'DM Sans',sans-serif",cursor:f?"not-allowed":"pointer",transition:"background .1s"},onMouseEnter:t=>{f||(t.currentTarget.style.background="#1f2937")},onMouseLeave:t=>{f||(t.currentTarget.style.background=f?"#f9fafb":"#111827")},children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,style:f?{animation:"pl-spin .8s linear infinite"}:{},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})}),f?"Seeding…":"Re-seed Catalogue"]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:14},children:[{cls:"s-total",label:"Total Products",val:n.length,note:`${new Set(n.map(t=>t.variety)).size} varieties`,color:"#111827"},{cls:"s-active",label:"Activated",val:N,note:`${Y}% of catalogue complete`,color:"#15803d"},{cls:"s-pending",label:"Not Activated",val:H,note:"awaiting activation",color:"#6b7280"}].map(t=>e.jsxs("div",{className:`pl-stat ${t.cls}`,children:[e.jsx("p",{style:{margin:"0 0 4px",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af"},children:t.label}),e.jsx("p",{style:{margin:"0 0 3px",fontSize:22,fontWeight:700,color:t.color,lineHeight:1,fontFamily:"'DM Mono',monospace"},children:t.val}),e.jsx("p",{style:{margin:0,fontSize:11,color:"#9ca3af"},children:t.note})]},t.cls))}),e.jsxs("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10},children:[e.jsx("button",{className:`pl-pill${b===""?" on":""}`,style:{"--tc":"#111827","--tc-bg":"#f3f4f6","--tc-bd":"#d1d5db"},onClick:()=>w(""),children:"All Types"}),W.map(t=>{const o=$[t],s=n.filter(r=>r.type===t).length,h=n.filter(r=>r.type===t&&r.isActive).length;return e.jsxs("button",{className:`pl-pill${b===t?" on":""}`,style:{"--tc":o.color,"--tc-bg":o.bg,"--tc-bd":o.bd},onClick:()=>w(b===t?"":t),children:[e.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:o.dot,flexShrink:0}}),t,e.jsxs("span",{style:{fontSize:10,opacity:.55,fontFamily:"'DM Mono',monospace"},children:[h,"/",s]})]},t)})]}),e.jsxs("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:"9px 11px",marginBottom:12,display:"flex",flexWrap:"wrap",gap:7,alignItems:"center"},children:[e.jsxs("div",{style:{position:"relative",flex:1,minWidth:180},children:[e.jsx("svg",{style:{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"},width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"})}),e.jsx("input",{value:c,onChange:t=>u(t.target.value),placeholder:"Search variety, type, sub-type…",style:{width:"100%",padding:"7px 10px 7px 27px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:13,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#111827",background:"#f9fafb",transition:"all .12s"},onFocus:t=>{t.target.style.borderColor="#6b7280",t.target.style.background="#fff",t.target.style.boxShadow="0 0 0 2px rgba(107,114,128,.1)"},onBlur:t=>{t.target.style.borderColor="#e5e7eb",t.target.style.background="#f9fafb",t.target.style.boxShadow="none"}})]}),e.jsxs("select",{value:g,onChange:t=>i(t.target.value),style:{padding:"7px 10px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:13,outline:"none",background:"#f9fafb",fontFamily:"'DM Sans',sans-serif",color:"#374151",cursor:"pointer"},children:[e.jsx("option",{value:"",children:"All Status"}),e.jsx("option",{value:"active",children:"Active Only"}),e.jsx("option",{value:"inactive",children:"Pending Only"})]}),R&&e.jsx("button",{onClick:()=>{u(""),w(""),i("")},style:{padding:"7px 11px",borderRadius:6,border:"1px solid #fecaca",background:"#fef2f2",fontSize:12,fontWeight:600,color:"#dc2626",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"},children:"Clear"}),e.jsxs("span",{style:{marginLeft:"auto",fontSize:11.5,color:"#9ca3af",fontFamily:"'DM Mono',monospace",whiteSpace:"nowrap"},children:[L.length," product",L.length!==1?"s":"",C.length>0&&` · ${C.length} variet${C.length!==1?"ies":"y"}`]})]}),x?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[...Array(4)].map((t,o)=>e.jsxs("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:16},children:[e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center",marginBottom:14},children:[e.jsx("div",{className:"pl-skel",style:{width:150}}),e.jsx("div",{className:"pl-skel",style:{width:70,marginLeft:"auto"}})]}),[...Array(3)].map((s,h)=>e.jsx("div",{style:{display:"flex",gap:10,marginBottom:9},children:[28,80,130,160,90].map((r,D)=>e.jsx("div",{className:"pl-skel",style:{width:r}},D))},h))]},o))}):C.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"56px 0",background:"#fff",border:"1px solid #e5e7eb",borderRadius:8},children:[e.jsx("div",{style:{fontSize:34,marginBottom:10},children:"🌾"}),e.jsx("p",{style:{fontSize:13.5,fontWeight:700,color:"#374151",margin:"0 0 4px"},children:R?"No products match your filters":"No products found"}),e.jsx("p",{style:{fontSize:12.5,color:"#9ca3af"},children:R?"Clear filters to see all products":"Click Re-seed Catalogue to load the product list"})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:7},children:C.map(t=>e.jsx(X,{variety:t,products:_.get(t),togglingId:F,isBulking:j===t,searchQ:c.trim().toLowerCase(),onActivate:E,onActivateAll:O,autoExpand:!!c.trim()},t))})]})]}),e.jsx(G,{message:m.message,type:m.type,onClose:()=>p({message:"",type:"info"})})]})}function X({variety:n,products:l,togglingId:x,isBulking:y,searchQ:f,onActivate:z,onActivateAll:F,autoExpand:v}){const[j,k]=a.useState(!1),c=l.length,u=l.filter(i=>i.isActive).length,b=l.filter(i=>!i.isActive),w=c>0?Math.round(u/c*100):0,g=u===c;return a.useEffect(()=>{k(v)},[v]),e.jsxs("div",{className:`pl-variety${u>0?" v-live":""}`,children:[e.jsxs("button",{className:"pl-vhead",onClick:()=>k(i=>!i),children:[e.jsxs("div",{style:{flex:1,textAlign:"left",minWidth:0},children:[e.jsx("div",{style:{fontSize:13.5,fontWeight:600,color:"#111827",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.jsx(P,{text:n,q:f})}),e.jsxs("div",{style:{fontSize:10.5,color:"#9ca3af",marginTop:1,fontFamily:"'DM Mono',monospace"},children:[c," product",c!==1?"s":""]})]}),e.jsx("div",{style:{display:"flex",gap:3,flexShrink:0,flexWrap:"wrap",marginRight:8},children:W.map(i=>{const m=l.filter(d=>d.type===i&&d.isActive).length;if(!m)return null;const p=$[i];return e.jsxs("span",{style:{fontSize:10,fontWeight:600,padding:"2px 6px",borderRadius:4,background:p.bg,color:p.color,border:`1px solid ${p.bd}`,fontFamily:"'DM Mono',monospace"},children:[i.slice(0,2),m]},i)})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,marginRight:8,flexShrink:0,minWidth:82},children:[e.jsx("div",{className:"pl-track",children:e.jsx("div",{className:`pl-fill${g?" full":""}`,style:{width:`${w}%`}})}),e.jsxs("span",{style:{fontSize:10.5,fontWeight:600,minWidth:28,textAlign:"right",fontFamily:"'DM Mono',monospace",color:g?"#15803d":"#9ca3af"},children:[u,"/",c]})]}),!g&&j?e.jsx("button",{className:"pl-btn-all",onClick:i=>{i.stopPropagation(),F(n,b)},disabled:y,style:{marginRight:6,flexShrink:0},children:y?e.jsxs(e.Fragment,{children:[e.jsx(I,{})," Working…"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13 10V3L4 14h7v7l9-11h-7z"})}),"Activate All"]})}):g?e.jsxs("span",{style:{fontSize:10.5,fontWeight:600,color:"#15803d",marginRight:6,flexShrink:0,background:"#f0fdf4",border:"1px solid #bbf7d0",padding:"2px 8px",borderRadius:5,fontFamily:"'DM Mono',monospace",display:"inline-flex",alignItems:"center",gap:4},children:[e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:3,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})}),"All Active"]}):null,e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"#d1d5db",strokeWidth:2.5,style:{flexShrink:0,transition:"transform .16s",transform:j?"rotate(180deg)":"none"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),j&&e.jsx("div",{className:"pl-slide",children:e.jsxs("table",{className:"pl-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:30},children:"#"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Sub-Type"}),e.jsx("th",{children:"Linked Account"}),e.jsx("th",{children:"Status"})]})}),e.jsx("tbody",{children:l.map((i,m)=>{const p=$[i.type]||{color:"#374151",bg:"#f3f4f6",bd:"#e5e7eb",dot:"#d1d5db"},d=K[i.subType],S=x===i._id||y;return e.jsxs("tr",{className:i.isActive?"r-live":"",children:[e.jsx("td",{style:{color:"#d1d5db",fontSize:11,fontFamily:"'DM Mono',monospace",userSelect:"none"},children:String(m+1).padStart(2,"0")}),e.jsx("td",{children:e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 9px",borderRadius:5,fontSize:11.5,fontWeight:600,background:p.bg,color:p.color,border:`1px solid ${p.bd}`},children:[e.jsx("span",{style:{width:5,height:5,borderRadius:"50%",background:p.dot,flexShrink:0}}),e.jsx(P,{text:i.type,q:f})]})}),e.jsx("td",{children:i.subType?e.jsx("span",{style:{display:"inline-block",padding:"3px 9px",borderRadius:5,fontSize:11.5,fontWeight:500,background:d?.bg||"#f3f4f6",color:d?.color||"#374151",border:`1px solid ${d?.bd||"#e5e7eb"}`},children:e.jsx(P,{text:i.subType,q:f})}):e.jsx("span",{style:{fontSize:12,color:"#d1d5db"},children:"—"})}),e.jsx("td",{children:i.isActive&&i.linkedAccountId?e.jsx("span",{className:"pl-acct",children:i.linkedAccountId.accountName||i.productName}):e.jsx("span",{style:{fontSize:12,color:"#d1d5db"},children:"—"})}),e.jsx("td",{children:i.isActive?e.jsxs("span",{className:"pl-badge-live",children:[e.jsx("svg",{width:8,height:8,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:3,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})}),"Active"]}):e.jsxs("button",{className:"pl-btn-act",onClick:()=>z(i),disabled:S,children:[S?e.jsx(I,{}):e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13 10V3L4 14h7v7l9-11h-7z"})}),S?"Activating…":"Activate"]})})]},i._id)})})]})})]})}export{te as default};
