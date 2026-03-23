import{a as A,A as C,j as e,S as V,N as Y}from"./index-PWmeZ259.js";import{b as n}from"./react-BBT0yyZ1.js";const G="@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",H=`
  :root {
    --oc-black:#0B0C0D; --oc-dark:#141A1F; --oc-navy:#212A37;
    --oc-slate:#253240; --oc-steel:#334455; --oc-mid:#6E7170;
    --oc-silver:#A5A8A6; --oc-light:#DADADA; --oc-bg:#F5F5F5; --oc-bg2:#ECECEC;
    --oc-gold:#929183; --oc-g2:#7A7970; --oc-g3:#A8A79F;
  }

  .pl * { box-sizing:border-box; }
  .pl { font-family:'DM Sans',sans-serif; color:var(--oc-black); }
  .pl-mono { font-family:'DM Mono',monospace; }
  .pl-title { font-family:'Cormorant Garamond',serif; }

  /* ── Stat cards ── */
  .pl-stat {
    background:#fff; border:1.5px solid var(--oc-bg2); border-radius:14px;
    padding:18px 20px; position:relative; overflow:hidden;
    box-shadow:0 2px 8px rgba(11,12,13,.04); transition:box-shadow .15s;
  }
  .pl-stat:hover { box-shadow:0 4px 16px rgba(11,12,13,.08); }
  .pl-stat::before {
    content:''; position:absolute; top:0; left:0; right:0; height:3px; border-radius:14px 14px 0 0;
  }
  .pl-stat.s-total::before   { background:linear-gradient(90deg,var(--oc-navy),#929183); }
  .pl-stat.s-active::before  { background:linear-gradient(90deg,#22c55e,#15803d); }
  .pl-stat.s-pending::before { background:linear-gradient(90deg,#929183,#7A7970); }

  /* ── Type pills ── */
  .pl-pill {
    display:inline-flex; align-items:center; gap:6px; padding:6px 14px;
    border-radius:20px; font-size:12px; font-weight:600; border:1.5px solid var(--oc-bg2);
    background:#fff; color:var(--oc-mid); cursor:pointer; transition:all .12s;
    white-space:nowrap; font-family:'DM Sans',sans-serif;
  }
  .pl-pill:hover { border-color:var(--oc-light); color:var(--oc-navy); }
  .pl-pill.on { color:var(--tc); border-color:var(--tc); background:var(--tbg); font-weight:700; }

  /* ── Variety card ── */
  .pl-variety {
    background:#fff; border:1.5px solid var(--oc-bg2); border-radius:14px;
    overflow:hidden; transition:box-shadow .15s;
  }
  .pl-variety:hover { box-shadow:0 4px 16px rgba(11,12,13,.07); }
  .pl-variety.v-live { border-color:rgba(34,197,94,.3); }

  .pl-vhead {
    display:flex; align-items:center; gap:12px; padding:13px 18px;
    cursor:pointer; border:none; background:none; width:100%; text-align:left;
    transition:background .1s;
  }
  .pl-vhead:hover { background:var(--oc-bg); }

  /* ── Progress bar ── */
  .pl-track { flex:1; height:4px; background:var(--oc-bg2); border-radius:10px; overflow:hidden; min-width:70px; max-width:130px; }
  .pl-fill  { height:100%; border-radius:10px; background:linear-gradient(90deg,#929183,#7A7970); transition:width .4s cubic-bezier(.4,0,.2,1); }
  .pl-fill.full { background:linear-gradient(90deg,#22c55e,#15803d); }

  /* ── Product rows ── */
  .pl-table { width:100%; border-collapse:collapse; }
  .pl-table thead th {
    padding:7px 14px; font-size:9.5px; font-weight:700; text-transform:uppercase;
    letter-spacing:.1em; color:var(--oc-silver); background:var(--oc-bg);
    text-align:left; border-bottom:1px solid var(--oc-bg2); white-space:nowrap;
    font-family:'DM Sans',sans-serif;
  }
  .pl-table thead th:last-child { text-align:right; }
  .pl-table tbody tr { border-bottom:1px solid var(--oc-bg); transition:background .08s; }
  .pl-table tbody tr:last-child { border-bottom:none; }
  .pl-table tbody tr:hover { background:rgba(146,145,131,.035); }
  .pl-table tbody tr.r-live { background:rgba(34,197,94,.03); }
  .pl-table tbody td { padding:9px 14px; font-size:12.5px; color:var(--oc-steel); vertical-align:middle; }
  .pl-table tbody td:last-child { text-align:right; }

  /* ── Activate button ── */
  .pl-btn-act {
    display:inline-flex; align-items:center; gap:5px;
    padding:5px 12px; border-radius:7px; font-size:11px; font-weight:700;
    background:var(--oc-bg); color:var(--oc-navy); border:1.5px solid var(--oc-bg2);
    cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .12s; white-space:nowrap;
  }
  .pl-btn-act:hover:not(:disabled) {
    background:var(--oc-navy); color:#fff; border-color:var(--oc-navy);
    box-shadow:0 2px 8px rgba(33,42,55,.25);
  }
  .pl-btn-act:disabled { opacity:.45; cursor:not-allowed; }

  .pl-badge-live {
    display:inline-flex; align-items:center; gap:4px;
    padding:4px 10px; border-radius:7px; font-size:11px; font-weight:700;
    background:rgba(34,197,94,.08); color:#15803d; border:1.5px solid rgba(34,197,94,.25);
    font-family:'DM Mono',monospace; letter-spacing:.04em;
  }

  /* ── Activate-all ── */
  .pl-btn-all {
    display:inline-flex; align-items:center; gap:5px; padding:4px 10px;
    border-radius:7px; font-size:10.5px; font-weight:700;
    background:rgba(146,145,131,.08); color:#7A7970; border:1.5px solid rgba(146,145,131,.25);
    cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .12s; white-space:nowrap;
  }
  .pl-btn-all:hover { background:rgba(146,145,131,.15); border-color:#929183; }

  /* ── Account chip ── */
  .pl-acct {
    display:inline-flex; align-items:center; gap:4px; padding:2px 8px;
    border-radius:5px; font-size:10px; font-weight:600;
    background:rgba(33,42,55,.06); color:var(--oc-navy); border:1px solid rgba(33,42,55,.12);
    font-family:'DM Mono',monospace; max-width:180px;
    overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
  }

  /* ── Animations ── */
  @keyframes pl-slide { from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)} }
  .pl-slide { animation:pl-slide .15s ease both; }
  @keyframes pl-spin { to{transform:rotate(360deg)} }
  .pl-spin-ico { display:inline-block; animation:pl-spin .65s linear infinite; }
  @keyframes pl-shimmer { to{background-position:-200% 0} }
  .pl-skel {
    border-radius:6px; height:12px;
    background:linear-gradient(90deg,#F5F5F5 25%,#ECECEC 50%,#F5F5F5 75%);
    background-size:200% 100%; animation:pl-shimmer 1.4s infinite;
  }
`,z=["Rice","Broken","Paddy","Polish","Phukar"],D={Rice:{color:"#1d4ed8",bg:"#dbeafe44",border:"#bfdbfe",dot:"#3b82f6",label:"Rice"},Broken:{color:"#7c3aed",bg:"#ede9fe44",border:"#ddd6fe",dot:"#8b5cf6",label:"Broken"},Paddy:{color:"#166534",bg:"#dcfce744",border:"#bbf7d0",dot:"#22c55e",label:"Paddy"},Polish:{color:"#c2410c",bg:"#ffedd544",border:"#fed7aa",dot:"#f97316",label:"Polish"},Phukar:{color:"#9f1239",bg:"#fee2e244",border:"#fecaca",dot:"#ef4444",label:"Phukar"}},U={Brown:{bg:"#fef9c3",color:"#854d0e",border:"#fde68a"},"White (Raw)":{bg:"#f8fafc",color:"#334155",border:"#e2e8f0"},"White (Double Polish)":{bg:"#e0f2fe",color:"#0369a1",border:"#bae6fd"},"White (Silky-Water Polish)":{bg:"#dbeafe",color:"#1e40af",border:"#bfdbfe"},Steamed:{bg:"#ecfdf5",color:"#065f46",border:"#6ee7b7"},"Sella (Creamy)":{bg:"#fef3c7",color:"#92400e",border:"#fde68a"},"Sella (Golden)":{bg:"#fef9c3",color:"#713f12",border:"#fcd34d"}};function T({text:i="",q:l=""}){if(!l||!i.toLowerCase().includes(l.toLowerCase()))return e.jsx(e.Fragment,{children:i});const x=i.toLowerCase().indexOf(l.toLowerCase());return e.jsxs(e.Fragment,{children:[i.slice(0,x),e.jsx("mark",{style:{background:"rgba(146,145,131,.35)",borderRadius:2,padding:"0 1px"},children:i.slice(x,x+l.length)}),i.slice(x+l.length)]})}function Z(){const[i,l]=n.useState([]),[x,m]=n.useState(!0),[b,M]=n.useState(!1),[N,y]=n.useState(null),[j,k]=n.useState(null),[c,u]=n.useState(""),[h,w]=n.useState(""),[g,r]=n.useState(""),[v,p]=n.useState({message:"",type:"info"}),d=(t,o="success")=>p({message:t,type:o}),S=async()=>{m(!0);try{const o=await(await A(`${C}/products`)).json();o.success&&(o.products.length?l(o.products):await B(!0))}catch{d("Failed to load products.","error")}finally{m(!1)}},B=async(t=!1)=>{M(!0);try{const a=await(await A(`${C}/products/seed`,{method:"POST"})).json();if(a.success){t||d(a.message);const s=await(await A(`${C}/products`)).json();s.success&&l(s.products)}else d(a.message||"Seed failed.","error")}catch{d("Seed error.","error")}finally{M(!1)}},_=n.useCallback(async t=>{if(!t.isActive){y(t._id);try{const a=await(await A(`${C}/products/${t._id}/activate`,{method:"PATCH"})).json();a.success?(l(f=>f.map(s=>s._id===t._id?{...s,...a.product}:s)),d(a.message)):d(a.message||"Failed.","error")}catch{d("Server error.","error")}finally{y(null)}}},[]),I=n.useCallback(async(t,o)=>{if(o.length){k(t);for(const a of o)try{const s=await(await A(`${C}/products/${a._id}/activate`,{method:"PATCH"})).json();s.success&&l(R=>R.map(L=>L._id===a._id?{...L,...s.product}:L))}catch{}d(`All ${t} products activated!`),k(null)}},[]);n.useEffect(()=>{S()},[]);const E=i.filter(t=>t.isActive).length,O=i.length-E,F=n.useMemo(()=>{let t=i;if(h&&(t=t.filter(o=>o.type===h)),g==="active"&&(t=t.filter(o=>o.isActive)),g==="inactive"&&(t=t.filter(o=>!o.isActive)),c.trim()){const o=c.trim().toLowerCase();t=t.filter(a=>a.variety?.toLowerCase().includes(o)||a.productName?.toLowerCase().includes(o)||a.type?.toLowerCase().includes(o)||a.subType?.toLowerCase().includes(o))}return t},[i,h,g,c]),$=n.useMemo(()=>{const t=new Map;for(const o of F)t.has(o.variety)||t.set(o.variety,[]),t.get(o.variety).push(o);for(const[,o]of t)o.sort((a,f)=>{const s=z.indexOf(a.type)-z.indexOf(f.type);return s!==0?s:(a.subType||"").localeCompare(f.subType||"")});return t},[F]),P=[...$.keys()],W=c||h||g;return e.jsxs(e.Fragment,{children:[e.jsxs(V,{children:[e.jsxs("style",{children:[G,H]}),e.jsxs("div",{className:"pl",style:{maxWidth:960,margin:"0 auto"},children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("p",{style:{fontSize:10,fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:"#929183",margin:"0 0 4px"},children:"Mill Catalogue"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10},children:[e.jsx("h1",{className:"pl-title",style:{margin:0,fontSize:26,fontWeight:700,color:"var(--oc-black)",letterSpacing:"-.4px"},children:"Product Catalogue"}),e.jsxs("button",{onClick:()=>B(!1),disabled:b,style:{display:"flex",alignItems:"center",gap:7,padding:"8px 16px",borderRadius:9,border:"1.5px solid var(--oc-bg2)",cursor:b?"not-allowed":"pointer",background:b?"var(--oc-bg)":"var(--oc-navy)",color:b?"var(--oc-silver)":"#fff",fontSize:12,fontWeight:700,fontFamily:"'DM Sans',sans-serif",transition:".12s"},children:[e.jsx("span",{style:{display:"inline-block",fontSize:14},children:"↻"}),b?"Seeding…":"Re-seed"]})]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20},children:[{cls:"s-total",label:"Total Products",val:i.length,color:"var(--oc-black)"},{cls:"s-active",label:"Activated",val:E,color:"#15803d"},{cls:"s-pending",label:"Pending",val:O,color:"#7A7970"}].map(t=>e.jsxs("div",{className:`pl-stat ${t.cls}`,children:[e.jsx("span",{style:{fontSize:9.5,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"var(--oc-silver)"},children:t.label}),e.jsx("span",{className:"pl-mono",style:{fontSize:26,fontWeight:700,color:t.color,lineHeight:1,marginTop:6},children:t.val})]},t.cls))}),e.jsxs("div",{style:{display:"flex",gap:7,flexWrap:"wrap",marginBottom:14},children:[e.jsx("button",{className:`pl-pill${h===""?" on":""}`,style:{"--tc":"var(--oc-navy)","--tbg":"rgba(33,42,55,.08)"},onClick:()=>w(""),children:"All Types"}),z.map(t=>{const o=D[t],a=i.filter(s=>s.type===t).length,f=i.filter(s=>s.type===t&&s.isActive).length;return e.jsxs("button",{className:`pl-pill${h===t?" on":""}`,style:{"--tc":o.color,"--tbg":o.bg},onClick:()=>w(h===t?"":t),children:[e.jsx("span",{style:{width:7,height:7,borderRadius:"50%",background:o.dot,flexShrink:0}}),t,e.jsxs("span",{className:"pl-mono",style:{fontSize:9,opacity:.65,marginLeft:2},children:[f,"/",a]})]},t)})]}),e.jsxs("div",{style:{background:"#fff",border:"1.5px solid var(--oc-bg2)",borderRadius:12,padding:"10px 14px",marginBottom:16,display:"flex",flexWrap:"wrap",gap:8,alignItems:"center",boxShadow:"0 1px 4px rgba(11,12,13,.04)"},children:[e.jsxs("div",{style:{position:"relative",flex:1,minWidth:200},children:[e.jsx("svg",{style:{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"var(--oc-silver)",pointerEvents:"none"},width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"})}),e.jsx("input",{value:c,onChange:t=>u(t.target.value),placeholder:"Search variety, type, sub-type…",style:{width:"100%",padding:"7px 10px 7px 30px",border:"1.5px solid var(--oc-bg2)",borderRadius:8,fontSize:12.5,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"var(--oc-black)",background:"var(--oc-bg)",transition:".12s"},onFocus:t=>{t.target.style.borderColor="var(--oc-navy)",t.target.style.background="#fff"},onBlur:t=>{t.target.style.borderColor="var(--oc-bg2)",t.target.style.background="var(--oc-bg)"}})]}),e.jsxs("select",{value:g,onChange:t=>r(t.target.value),style:{padding:"7px 10px",border:"1.5px solid var(--oc-bg2)",borderRadius:8,fontSize:12.5,outline:"none",background:"var(--oc-bg)",fontFamily:"'DM Sans',sans-serif",color:"var(--oc-steel)"},children:[e.jsx("option",{value:"",children:"All Status"}),e.jsx("option",{value:"active",children:"Active Only"}),e.jsx("option",{value:"inactive",children:"Pending Only"})]}),W&&e.jsx("button",{onClick:()=>{u(""),w(""),r("")},style:{padding:"7px 12px",border:"1.5px solid #fecaca",borderRadius:8,background:"#fef2f2",fontSize:12,fontWeight:600,color:"#dc2626",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"},children:"Clear ✕"}),e.jsxs("span",{className:"pl-mono",style:{marginLeft:"auto",fontSize:10.5,color:"var(--oc-silver)"},children:[F.length," products · ",P.length," varieties"]})]}),x?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(4)].map((t,o)=>e.jsxs("div",{style:{background:"#fff",border:"1.5px solid var(--oc-bg2)",borderRadius:14,padding:18},children:[e.jsxs("div",{style:{display:"flex",gap:14,alignItems:"center",marginBottom:14},children:[e.jsx("div",{className:"pl-skel",style:{width:120}}),e.jsx("div",{className:"pl-skel",style:{width:80,marginLeft:"auto"}})]}),[...Array(3)].map((a,f)=>e.jsx("div",{style:{display:"flex",gap:14,marginBottom:10},children:[30,90,120,140,80].map((s,R)=>e.jsx("div",{className:"pl-skel",style:{width:s}},R))},f))]},o))}):P.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"60px 0"},children:[e.jsx("div",{style:{fontSize:40,marginBottom:12},children:"🌾"}),e.jsx("p",{style:{fontSize:14,fontWeight:700,color:"var(--oc-steel)",margin:"0 0 4px"},children:W?"No products match your filters":"No products found"}),e.jsx("p",{style:{fontSize:12,color:"var(--oc-silver)"},children:W?"Clear filters to see all products":"Click Re-seed to load the catalogue"})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:P.map(t=>e.jsx(J,{variety:t,products:$.get(t),togglingId:N,isBulking:j===t,searchQ:c.trim().toLowerCase(),onActivate:_,onActivateAll:I,autoExpand:!!c.trim()},t))})]})]}),e.jsx(Y,{message:v.message,type:v.type,onClose:()=>p({message:"",type:"info"})})]})}function J({variety:i,products:l,togglingId:x,isBulking:m,searchQ:b,onActivate:M,onActivateAll:N,autoExpand:y}){const[j,k]=n.useState(!1),c=l.length,u=l.filter(r=>r.isActive).length,h=l.filter(r=>!r.isActive),w=c>0?Math.round(u/c*100):0,g=u===c;return n.useEffect(()=>{k(y)},[y]),e.jsxs("div",{className:`pl-variety${u>0?" v-live":""}`,children:[e.jsxs("button",{className:"pl-vhead",onClick:()=>k(r=>!r),children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",flex:1,textAlign:"left"},children:[e.jsx("span",{style:{fontSize:14,fontWeight:700,color:"var(--oc-black)",letterSpacing:"-.1px"},children:e.jsx(T,{text:i,q:b})}),e.jsxs("span",{className:"pl-mono",style:{fontSize:9.5,color:"var(--oc-silver)",marginTop:1},children:[c," product",c!==1?"s":""]})]}),e.jsx("div",{style:{display:"flex",gap:4,alignItems:"center",marginRight:12,flexWrap:"wrap"},children:z.map(r=>{const v=l.filter(d=>d.type===r).length;if(!v)return null;const p=D[r];return e.jsxs("span",{style:{fontSize:9.5,fontWeight:700,padding:"2px 7px",borderRadius:20,background:p.bg,color:p.color,border:`1px solid ${p.border}`,fontFamily:"'DM Mono',monospace"},children:[r[0],v]},r)})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginRight:10,minWidth:100},children:[e.jsx("div",{className:"pl-track",children:e.jsx("div",{className:`pl-fill${g?" full":""}`,style:{width:`${w}%`}})}),e.jsxs("span",{className:"pl-mono",style:{fontSize:10.5,fontWeight:700,minWidth:36,textAlign:"right",color:g?"#15803d":"var(--oc-silver)"},children:[u,"/",c]})]}),!g&&j?e.jsx("button",{className:"pl-btn-all",onClick:r=>{r.stopPropagation(),N(i,h)},disabled:m,style:{marginRight:8},children:m?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"pl-spin-ico",style:{display:"inline-block",width:9,height:9,border:"2px solid rgba(146,145,131,.3)",borderTopColor:"#929183",borderRadius:"50%"}})," Activating…"]}):e.jsx(e.Fragment,{children:"⚡ Activate All"})}):g?e.jsx("span",{style:{fontSize:10,fontWeight:700,color:"#15803d",marginRight:8,background:"rgba(34,197,94,.08)",border:"1px solid rgba(34,197,94,.25)",padding:"2px 8px",borderRadius:20,fontFamily:"'DM Mono',monospace"},children:"✓ All Active"}):null,e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"var(--oc-light)",strokeWidth:2.5,style:{flexShrink:0,transition:"transform .2s",transform:j?"rotate(180deg)":"none"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),j&&e.jsx("div",{className:"pl-slide",children:e.jsxs("table",{className:"pl-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:34},children:"#"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Sub-Type"}),e.jsx("th",{children:"Account"}),e.jsx("th",{children:"Status"})]})}),e.jsx("tbody",{children:l.map((r,v)=>{const p=D[r.type]||{color:"var(--oc-steel)",bg:"var(--oc-bg)",border:"var(--oc-bg2)",dot:"var(--oc-light)"},d=U[r.subType],S=x===r._id||m;return e.jsxs("tr",{className:r.isActive?"r-live":"",children:[e.jsx("td",{className:"pl-mono",style:{fontSize:11,color:"var(--oc-light)",userSelect:"none"},children:String(v+1).padStart(2,"0")}),e.jsx("td",{children:e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700,background:p.bg,color:p.color,border:`1px solid ${p.border}`},children:[e.jsx("span",{style:{width:5,height:5,borderRadius:"50%",background:p.dot,flexShrink:0}}),e.jsx(T,{text:r.type,q:b})]})}),e.jsx("td",{children:r.subType?e.jsx("span",{style:{display:"inline-block",padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:600,background:d?.bg||"var(--oc-bg)",color:d?.color||"var(--oc-steel)",border:`1px solid ${d?.border||"var(--oc-bg2)"}`},children:e.jsx(T,{text:r.subType,q:b})}):e.jsx("span",{style:{fontSize:11,color:"var(--oc-bg2)",fontStyle:"italic"},children:"—"})}),e.jsx("td",{children:r.isActive&&r.linkedAccountId?e.jsxs("span",{className:"pl-acct",children:[e.jsx("svg",{width:8,height:8,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"})}),r.linkedAccountId.accountName||r.productName]}):e.jsx("span",{style:{fontSize:11,color:"var(--oc-bg2)"},children:"—"})}),e.jsx("td",{children:r.isActive?e.jsxs("span",{className:"pl-badge-live",children:[e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:3,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})}),"Active"]}):e.jsxs("button",{className:"pl-btn-act",onClick:()=>M(r),disabled:S,children:[S?e.jsx("span",{className:"pl-spin-ico",style:{display:"inline-block",width:9,height:9,border:"2px solid var(--oc-bg2)",borderTopColor:"var(--oc-silver)",borderRadius:"50%"}}):e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13 10V3L4 14h7v7l9-11h-7z"})}),S?"Activating…":"Activate"]})})]},r._id)})})]})})]})}export{Z as default};
