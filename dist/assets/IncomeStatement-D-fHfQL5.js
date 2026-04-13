import{a as r,j as e}from"./vendor-react-CVRJsYjy.js";import{a as F,A as B,S as R}from"./index-CVtmj0Eg.js";import{h as P,E as T}from"./vendor-D8Rt7Tv7.js";import"./vendor-react-dom-BIx1r6lP.js";const D="@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",E=`
  .isx * { box-sizing: border-box; }
  .isx { font-family:'DM Sans',sans-serif; color:#1a1a2e; width:100%; max-width:820px; margin:0 auto; }

  .isx-eyebrow  { font-size:11px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:#9ca3af; margin-bottom:6px; }
  .isx-title    { font-family:'Lora',serif; font-size:26px; font-weight:700; color:#0f172a; letter-spacing:-.3px; line-height:1.15; }
  .isx-subtitle { font-size:13px; color:#94a3b8; margin-top:5px; }

  .isx-export-btn { display:inline-flex; align-items:center; gap:7px; padding:9px 18px; border-radius:10px; border:none; cursor:pointer; background:#0f172a; color:#fff; font-size:13px; font-weight:600; font-family:'DM Sans',sans-serif; box-shadow:0 2px 8px rgba(15,23,42,.18); transition:background .15s; white-space:nowrap; }
  .isx-export-btn:hover:not(:disabled) { background:#1e293b; }
  .isx-export-btn:disabled { opacity:.5; cursor:not-allowed; }
  .isx-nav-pill { padding:6px 14px; border-radius:20px; font-size:12px; font-weight:600; border:1.5px solid #e2e8f0; background:#fff; color:#64748b; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .12s; white-space:nowrap; }
  .isx-nav-pill:hover { border-color:#94a3b8; color:#334155; }

  /* summary cards */
  .isx-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:22px; }
  .isx-card { background:#fff; border:1.5px solid #e2e8f0; border-radius:14px; padding:18px 20px; cursor:pointer; transition:box-shadow .15s,transform .15s; width:100%; text-align:left; position:relative; overflow:hidden; display:block; }
  .isx-card::before { content:''; position:absolute; left:0; top:0; bottom:0; width:4px; border-radius:14px 0 0 14px; background:var(--c,#6366f1); }
  .isx-card:hover { box-shadow:0 6px 20px rgba(0,0,0,.07); transform:translateY(-1px); }
  .isx-card-static { cursor:default; }
  .isx-card-static:hover { box-shadow:none; transform:none; }
  .isx-card-lbl  { font-size:11px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:#94a3b8; margin-bottom:8px; }
  .isx-card-val  { font-family:'DM Mono',monospace; font-size:20px; font-weight:500; color:#0f172a; letter-spacing:-.4px; line-height:1; }
  .isx-card-desc { font-size:12px; color:#94a3b8; margin-top:8px; }
  .isx-chip { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:6px; font-size:11.5px; font-weight:700; margin-top:8px; font-family:'DM Sans',sans-serif; }
  .isx-chip-profit { background:#ecfdf5; color:#059669; }
  .isx-chip-loss   { background:#fef2f2; color:#dc2626; }

  /* report panel */
  .isx-panel { background:#fff; border:1.5px solid #e2e8f0; border-radius:16px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,.06); }
  .isx-panel-head { display:flex; align-items:center; justify-content:center; gap:14px; padding:20px 24px; border-bottom:1.5px solid #f1f5f9; background:linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%); }
  .isx-co-name  { font-family:'Lora',serif; font-size:17px; font-weight:700; color:#0f172a; }
  .isx-rep-sub  { font-family:'Lora',serif; font-size:13px; font-style:italic; font-weight:500; color:#64748b; margin-top:2px; }
  .isx-rep-date { font-size:11.5px; color:#94a3b8; margin-top:2px; }
  .isx-co-logo  { width:46px; height:46px; border-radius:9px; object-fit:cover; border:1px solid #e2e8f0; flex-shrink:0; }
  .isx-co-logo-fb { width:46px; height:46px; border-radius:9px; background:#1e293b; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:800; color:#4ade80; flex-shrink:0; font-family:'DM Sans',sans-serif; }

  /* collapsible section */
  .isx-sec-head {
    display:flex; align-items:center; justify-content:space-between;
    padding:12px 22px; cursor:pointer; user-select:none;
    background:var(--bg,#f8fafc); border-bottom:1.5px solid var(--bdr,#f1f5f9);
    transition:filter .1s;
  }
  .isx-sec-head:hover { filter:brightness(.97); }
  .isx-sec-name  { display:flex; align-items:center; gap:7px; font-family:'Lora',serif; font-size:14px; font-weight:600; color:var(--ac,#6366f1); font-style:italic; }
  .isx-sec-dot   { width:7px; height:7px; border-radius:50%; background:var(--ac,#6366f1); flex-shrink:0; }
  .isx-sec-right { display:flex; align-items:center; gap:8px; }
  .isx-sec-total { font-family:'DM Mono',monospace; font-size:14px; font-weight:500; color:var(--ac,#6366f1); }
  .isx-sec-count { font-size:10.5px; font-weight:600; color:#94a3b8; background:#e2e8f0; padding:1px 6px; border-radius:4px; font-family:'DM Mono',monospace; }
  .isx-chevron   { color:#94a3b8; transition:transform .2s; flex-shrink:0; }
  .isx-chevron.open { transform:rotate(180deg); }

  /* rows */
  .isx-rows-collapse { overflow:hidden; }
  .isx-rows-scroll   { max-height:240px; overflow-y:auto; scrollbar-width:thin; scrollbar-color:#e2e8f0 transparent; }
  .isx-rows-scroll::-webkit-scrollbar { width:3px; }
  .isx-rows-scroll::-webkit-scrollbar-thumb { background:#d1d5db; border-radius:4px; }
  .isx-row { display:flex; align-items:center; justify-content:space-between; padding:10px 22px; border-bottom:1px solid #f8fafc; transition:background .08s; }
  .isx-row:hover { background:#f8fafc; }
  .isx-row-name   { font-size:13px; color:#334155; flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .isx-row-amount { font-family:'DM Mono',monospace; font-size:12.5px; color:#0f172a; font-weight:500; white-space:nowrap; margin-left:14px; flex-shrink:0; }
  .isx-empty-row  { padding:16px 22px; font-size:12.5px; color:#cbd5e1; font-style:italic; }

  /* section footer */
  .isx-sec-foot { display:flex; align-items:center; justify-content:space-between; padding:11px 22px; background:var(--bg,#f8fafc); border-top:2px solid var(--bdr,#f1f5f9); }
  .isx-sec-foot-lbl { font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:#64748b; }
  .isx-sec-foot-val { font-family:'DM Mono',monospace; font-size:13.5px; font-weight:500; color:var(--ac,#6366f1); }

  /* computed line (Operating Income etc.) */
  .isx-computed { display:flex; align-items:center; justify-content:space-between; padding:13px 22px; background:var(--cbg,#f0fdf4); border-top:2px solid var(--cbdr,#bbf7d0); }
  .isx-computed-lbl { font-family:'Lora',serif; font-size:14px; font-weight:600; color:var(--ccolor,#059669); font-style:italic; }
  .isx-computed-val { font-family:'DM Mono',monospace; font-size:15px; font-weight:600; color:var(--ccolor,#059669); }

  .isx-divider { border:none; border-top:2px solid #f1f5f9; margin:0; }

  /* net footer */
  .isx-net-footer { display:flex; align-items:center; justify-content:space-between; padding:17px 22px; border-top:2px solid #f1f5f9; }
  .isx-net-profit { background:#f0fdf4; }
  .isx-net-loss   { background:#fef2f2; }
  .isx-net-lbl    { display:flex; align-items:center; gap:10px; }
  .isx-net-icon { width:34px; height:34px; border-radius:10px; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
  .isx-net-icon-profit { background:#dcfce7; color:#059669; }
  .isx-net-icon-loss   { background:#fee2e2; color:#dc2626; }
  .isx-net-title { font-family:'Lora',serif; font-size:15px; font-weight:600; }
  .isx-net-title-profit { color:#059669; }
  .isx-net-title-loss   { color:#dc2626; }
  .isx-net-sub { font-size:12px; color:#94a3b8; margin-top:2px; }
  .isx-net-val { font-family:'DM Mono',monospace; font-size:20px; font-weight:500; letter-spacing:-.5px; }
  .isx-net-val-profit { color:#059669; }
  .isx-net-val-loss   { color:#dc2626; }

  .isx-margin-strip { display:flex; align-items:center; justify-content:space-between; padding:9px 22px; border-top:1px solid #f1f5f9; background:#fafcff; }
  .isx-margin-txt  { font-size:12px; color:#94a3b8; font-weight:500; }
  .isx-margin-chip { font-size:11.5px; font-weight:700; padding:2px 8px; border-radius:6px; }
  .isx-margin-profit { background:#ecfdf5; color:#059669; }
  .isx-margin-loss   { background:#fef2f2; color:#dc2626; }

  @keyframes isx-shimmer { to{background-position:-200% 0} }
  .isx-sk { background:linear-gradient(90deg,#f1f5f9 25%,#f8fafc 50%,#f1f5f9 75%); background-size:200% 100%; animation:isx-shimmer 1.4s infinite; border-radius:8px; }
  @keyframes isx-spin { to{transform:rotate(360deg)} }
  .isx-spin { animation:isx-spin 1s linear infinite; display:inline-block; }
  @media(max-width:600px) { .isx-cards { grid-template-columns:1fr !important; } }
`,l=s=>"Rs "+Number(s||0).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0}),W=5;function O({open:s}){return e.jsx("svg",{className:`isx-chevron${s?" open":""}`,width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})}function M({title:s,rows:o,total:c,accent:f,bg:x,border:u,refProp:m}){const[d,h]=r.useState(o.length<=W),b=o.length>8;return e.jsxs("div",{ref:m,style:{"--ac":f,"--bg":x,"--bdr":u},children:[e.jsxs("div",{className:"isx-sec-head",onClick:()=>h(n=>!n),children:[e.jsxs("div",{className:"isx-sec-name",children:[e.jsx("span",{className:"isx-sec-dot"}),s]}),e.jsxs("div",{className:"isx-sec-right",children:[e.jsxs("span",{className:"isx-sec-count",children:[o.length," items"]}),e.jsx("span",{className:"isx-sec-total",children:l(Math.abs(c))}),e.jsx(O,{open:d})]})]}),e.jsxs("div",{className:"isx-rows-collapse",style:{maxHeight:d?"9999px":0,overflow:"hidden"},children:[o.length===0?e.jsx("p",{className:"isx-empty-row",children:"No entries"}):e.jsx("div",{className:b?"isx-rows-scroll":"",children:o.map((n,w)=>e.jsxs("div",{className:"isx-row",children:[e.jsx("span",{className:"isx-row-name",children:n.name}),e.jsx("span",{className:"isx-row-amount",children:l(Math.abs(Number(n.amount)||0))})]},n.id||w))}),e.jsxs("div",{className:"isx-sec-foot",children:[e.jsxs("span",{className:"isx-sec-foot-lbl",children:["Total ",s]}),e.jsx("span",{className:"isx-sec-foot-val",children:l(Math.abs(c))})]})]})]})}function $({name:s}){const o=localStorage.getItem("logoUrl")||"",[c,f]=r.useState(!1),x=(s||"R").slice(0,2).toUpperCase();return o&&!c?e.jsx("img",{src:o,alt:s,className:"isx-co-logo",onError:()=>f(!0)}):e.jsx("div",{className:"isx-co-logo-fb",children:x})}const I=["tax","income tax","market fee","social security","stamp","duty","zakat","levy","cess","withholding"];function V(){const[s,o]=r.useState(null),[c,f]=r.useState(!0),[x,u]=r.useState(!1),m=r.useRef(null),d=r.useRef(null),h=r.useRef(null),b=localStorage.getItem("businessName")||"Rice Mill";r.useEffect(()=>{(async()=>{try{const i=await F(`${B}/incomestatement`),t=await i.json();if(!i.ok)throw new Error(t?.message||"Failed");o(t)}catch(i){console.error(i)}finally{f(!1)}})()},[]);const n=i=>i.current?.scrollIntoView({behavior:"smooth",block:"start"}),w=async()=>{if(m.current){u(!0);try{const i=await P(m.current,{scale:2,backgroundColor:"#ffffff",useCORS:!0}),t=i.toDataURL("image/png"),k=new T("portrait","mm","a4"),C=k.internal.pageSize.getWidth(),N=C*.92/i.width;k.addImage(t,"PNG",(C-i.width*N)/2,10,i.width*N,i.height*N),k.save(`income-statement-${new Date().toISOString().slice(0,10)}.pdf`)}catch(i){console.error(i)}u(!1)}};if(c)return e.jsxs(R,{children:[e.jsxs("style",{children:[D,E]}),e.jsxs("div",{className:"isx",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:24,alignItems:"flex-end",flexWrap:"wrap",gap:12},children:[e.jsxs("div",{children:[e.jsx("div",{className:"isx-sk",style:{width:80,height:10,marginBottom:10}}),e.jsx("div",{className:"isx-sk",style:{width:210,height:28}})]}),e.jsx("div",{className:"isx-sk",style:{width:130,height:38,borderRadius:10}})]}),e.jsxs("div",{className:"isx-panel",style:{minHeight:260},children:[e.jsxs("div",{style:{padding:"20px 24px",background:"#f8fafc",borderBottom:"1.5px solid #f1f5f9",display:"flex",justifyContent:"center",gap:14,alignItems:"center"},children:[e.jsx("div",{className:"isx-sk",style:{width:46,height:46,borderRadius:9}}),e.jsxs("div",{children:[e.jsx("div",{className:"isx-sk",style:{width:150,height:14,marginBottom:7}}),e.jsx("div",{className:"isx-sk",style:{width:110,height:11}})]})]}),[0,1,2,3].map(i=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"10px 22px",borderBottom:"1px solid #f8fafc"},children:[e.jsx("div",{className:"isx-sk",style:{width:"55%",height:13}}),e.jsx("div",{className:"isx-sk",style:{width:"22%",height:13}})]},i))]})]})]});if(!s)return null;const a=s.netIncome>=0,p=a?"profit":"loss",g=s.totalRevenue>0?(s.netIncome/s.totalRevenue*100).toFixed(1):null,L=new Date().toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"}),y=(s.expenseAccounts||[]).filter(i=>I.some(t=>i.name.toLowerCase().includes(t))),S=(s.expenseAccounts||[]).filter(i=>!I.some(t=>i.name.toLowerCase().includes(t))),z=S.reduce((i,t)=>i+(Number(t.amount)||0),0),A=y.reduce((i,t)=>i+(Number(t.amount)||0),0),j=y.length>0,v=s.totalRevenue-z;return e.jsxs(R,{children:[e.jsxs("style",{children:[D,E]}),e.jsxs("div",{className:"isx",children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:14,marginBottom:24},children:[e.jsxs("div",{children:[e.jsx("p",{className:"isx-eyebrow",children:"Financial Reports"}),e.jsx("h1",{className:"isx-title",children:"Income Statement"}),e.jsxs("p",{className:"isx-subtitle",children:["For the period ending ",L]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[e.jsx("button",{className:"isx-nav-pill",onClick:()=>n(d),children:"Revenue"}),e.jsx("button",{className:"isx-nav-pill",onClick:()=>n(h),children:"Expenses"}),e.jsx("button",{className:"isx-export-btn",onClick:w,disabled:x,children:x?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"isx-spin",children:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})})," Exporting…"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"})})," Export PDF"]})})]})]}),e.jsxs("div",{className:"isx-cards",children:[e.jsxs("button",{className:"isx-card",style:{"--c":"#4f46e5"},onClick:()=>n(d),children:[e.jsx("p",{className:"isx-card-lbl",children:"Total Revenue"}),e.jsx("p",{className:"isx-card-val",children:l(s.totalRevenue)}),e.jsxs("p",{className:"isx-card-desc",children:[s.revenueAccounts?.length||0," revenue accounts"]})]}),e.jsxs("button",{className:"isx-card",style:{"--c":"#d97706"},onClick:()=>n(h),children:[e.jsx("p",{className:"isx-card-lbl",children:"Total Expenses"}),e.jsx("p",{className:"isx-card-val",children:l(s.totalExpenses)}),e.jsxs("p",{className:"isx-card-desc",children:[s.expenseAccounts?.length||0," expense accounts"]})]}),e.jsxs("div",{className:"isx-card isx-card-static",style:{"--c":a?"#059669":"#dc2626"},children:[e.jsx("p",{className:"isx-card-lbl",children:a?"Net Profit":"Net Loss"}),e.jsx("p",{className:"isx-card-val",style:{color:a?"#059669":"#dc2626"},children:l(Math.abs(s.netIncome))}),e.jsx("span",{className:`isx-chip isx-chip-${p}`,children:a?e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:10,height:10,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:3,style:{display:"inline-block",verticalAlign:"middle"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})," Profitable period"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:10,height:10,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:3,style:{display:"inline-block",verticalAlign:"middle"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})," Loss period"]})}),g!==null&&e.jsxs("p",{className:"isx-card-desc",style:{marginTop:6},children:[Math.abs(g),"% ",a?"profit":"loss"," margin"]})]})]}),e.jsxs("div",{ref:m,className:"isx-panel",children:[e.jsxs("div",{className:"isx-panel-head",children:[e.jsx($,{name:b}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("p",{className:"isx-co-name",children:b}),e.jsx("p",{className:"isx-rep-sub",children:"Income Statement"}),e.jsxs("p",{className:"isx-rep-date",children:["For the period ending ",L]})]})]}),e.jsx(M,{refProp:d,title:"Sale / Revenue",rows:s.revenueAccounts||[],total:s.totalRevenue,accent:"#4f46e5",bg:"#f5f5ff",border:"#e0e7ff"}),e.jsx("hr",{className:"isx-divider"}),e.jsx(M,{refProp:h,title:j?"Operating Expenses":"Expenses",rows:j?S:s.expenseAccounts||[],total:j?z:s.totalExpenses,accent:"#d97706",bg:"#fffbeb",border:"#fde68a"}),e.jsxs("div",{className:"isx-computed",style:{"--cbg":v>=0?"#f0fdf4":"#fef2f2","--cbdr":v>=0?"#bbf7d0":"#fecaca","--ccolor":v>=0?"#059669":"#dc2626"},children:[e.jsx("span",{className:"isx-computed-lbl",children:"Operating Income"}),e.jsx("span",{className:"isx-computed-val",children:l(v)})]}),j&&e.jsxs(e.Fragment,{children:[e.jsx("hr",{className:"isx-divider"}),e.jsx(M,{title:"Tax & Other Expenses",rows:y,total:A,accent:"#7c3aed",bg:"#faf5ff",border:"#e9d5ff"})]}),e.jsxs("div",{className:`isx-net-footer isx-net-${p}`,children:[e.jsxs("div",{className:"isx-net-lbl",children:[e.jsx("div",{className:`isx-net-icon isx-net-icon-${p}`,children:a?e.jsx("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"})}):e.jsx("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"})})}),e.jsxs("div",{children:[e.jsx("p",{className:`isx-net-title isx-net-title-${p}`,children:a?"Net Profit":"Net Loss"}),e.jsx("p",{className:"isx-net-sub",children:"Revenue minus Total Expenses"})]})]}),e.jsx("span",{className:`isx-net-val isx-net-val-${p}`,children:l(s.netIncome)})]}),g!==null&&e.jsxs("div",{className:"isx-margin-strip",children:[e.jsxs("span",{className:"isx-margin-txt",children:[a?"Profit":"Loss"," margin — ",Math.abs(g),"% of total revenue"]}),e.jsxs("span",{className:`isx-margin-chip isx-margin-${p}`,children:[a?"+":"-",Math.abs(g),"%"]})]})]}),e.jsx("p",{style:{textAlign:"center",color:"#94a3b8",fontSize:11.5,marginTop:13,fontFamily:"'DM Mono',monospace"},children:"Click any section header to expand or collapse"})]})]})}export{V as default};
