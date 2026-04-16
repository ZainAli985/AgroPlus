import{a as p,j as s,R as j}from"./vendor-react-CVRJsYjy.js";import{a as M,A as z,S as N}from"./index-DAaqPt1z.js";import{h as S,E as A}from"./vendor-D8Rt7Tv7.js";import"./vendor-react-dom-BIx1r6lP.js";const k="@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",L=`
  .bsx * { box-sizing: border-box; }
  .bsx { font-family:'DM Sans',sans-serif; color:#1a1a2e; width:100%; max-width:1060px; margin:0 auto; }

  .bsx-eyebrow  { font-size:11px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:#9ca3af; margin-bottom:6px; }
  .bsx-title    { font-family:'Lora',serif; font-size:26px; font-weight:700; color:#0f172a; letter-spacing:-.3px; line-height:1.15; display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
  .bsx-subtitle { font-size:13px; color:#94a3b8; margin-top:5px; }

  .bsx-badge { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:600; font-family:'DM Sans',sans-serif; font-style:normal; background:#ecfdf5; color:#059669; border:1px solid #a7f3d0; }
  .bsx-badge-warn { background:#fff7ed; color:#c2410c; border-color:#fed7aa; }

  .bsx-export-btn { display:inline-flex; align-items:center; gap:7px; padding:9px 18px; border-radius:10px; border:none; cursor:pointer; background:#0f172a; color:#fff; font-size:13px; font-weight:600; font-family:'DM Sans',sans-serif; box-shadow:0 2px 8px rgba(15,23,42,.18); transition:background .15s; white-space:nowrap; }
  .bsx-export-btn:hover:not(:disabled) { background:#1e293b; }
  .bsx-export-btn:disabled { opacity:.5; cursor:not-allowed; }

  /* summary cards */
  .bsx-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:16px; }
  .bsx-card { background:#fff; border:1.5px solid #e2e8f0; border-radius:14px; padding:18px 20px; position:relative; overflow:hidden; }
  .bsx-card::before { content:''; position:absolute; left:0; top:0; bottom:0; width:4px; border-radius:14px 0 0 14px; background:var(--c,#6366f1); }
  .bsx-card-lbl { font-size:11px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:#94a3b8; margin-bottom:8px; }
  .bsx-card-val { font-family:'DM Mono',monospace; font-size:20px; font-weight:500; color:#0f172a; letter-spacing:-.4px; line-height:1; }

  /* equation bar */
  .bsx-eq { display:flex; align-items:center; gap:10px; flex-wrap:wrap; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:12px; padding:11px 18px; margin-bottom:20px; }
  .bsx-eq-lbl  { font-size:11px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:#94a3b8; }
  .bsx-eq-sep  { color:#cbd5e1; font-size:15px; font-family:'DM Mono',monospace; }
  .bsx-eq-num  { font-family:'DM Mono',monospace; font-size:13px; font-weight:500; }
  .bsx-eq-stat { margin-left:auto; font-size:11.5px; font-weight:600; }

  /* main panel */
  .bsx-panel { background:#fff; border:1.5px solid #e2e8f0; border-radius:16px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,.06); }
  .bsx-panel-head { display:flex; align-items:center; justify-content:center; gap:14px; padding:20px 24px; border-bottom:1.5px solid #f1f5f9; background:linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%); }
  .bsx-co-name  { font-family:'Lora',serif; font-size:17px; font-weight:700; color:#0f172a; }
  .bsx-rep-sub  { font-family:'Lora',serif; font-size:13px; font-style:italic; font-weight:500; color:#64748b; margin-top:2px; }
  .bsx-rep-date { font-size:11.5px; color:#94a3b8; margin-top:2px; }
  .bsx-co-logo  { width:46px; height:46px; border-radius:9px; object-fit:cover; border:1px solid #e2e8f0; flex-shrink:0; }
  .bsx-co-logo-fb { width:46px; height:46px; border-radius:9px; background:#1e293b; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:800; color:#4ade80; flex-shrink:0; font-family:'DM Sans',sans-serif; }

  /* two-column grid */
  .bsx-cols { display:grid; grid-template-columns:1fr 1fr; }
  .bsx-col-l { border-right:1.5px solid #f1f5f9; }

  /* column title bar */
  .bsx-col-title { padding:10px 20px 9px; background:#f8fafc; border-bottom:1.5px solid #e2e8f0; }
  .bsx-col-title-text { font-family:'Lora',serif; font-size:14px; font-weight:700; color:#0f172a; font-style:italic; }

  /* collapsible sub-section */
  .bsx-sec-head {
    display:flex; align-items:center; justify-content:space-between;
    padding:10px 20px; cursor:pointer; user-select:none;
    background:var(--bg,#f8fafc); border-bottom:1.5px solid var(--bdr,#f1f5f9);
    border-top:1.5px solid var(--bdr,#f1f5f9); transition:filter .1s;
  }
  .bsx-sec-head:hover { filter:brightness(.97); }
  .bsx-sec-name { display:flex; align-items:center; gap:7px; font-family:'Lora',serif; font-size:13px; font-weight:600; color:var(--ac,#6366f1); font-style:italic; }
  .bsx-sec-dot  { width:7px; height:7px; border-radius:50%; background:var(--ac,#6366f1); flex-shrink:0; }
  .bsx-sec-right { display:flex; align-items:center; gap:8px; }
  .bsx-sec-total { font-family:'DM Mono',monospace; font-size:13px; font-weight:500; color:var(--ac,#6366f1); }
  .bsx-sec-count { font-size:10.5px; font-weight:600; color:#94a3b8; background:#e2e8f0; padding:1px 6px; border-radius:4px; font-family:'DM Mono',monospace; }
  .bsx-chevron  { color:#94a3b8; transition:transform .2s; flex-shrink:0; }
  .bsx-chevron.open { transform:rotate(180deg); }

  /* rows area */
  .bsx-rows-collapse { overflow:hidden; }
  .bsx-rows-scroll   { max-height:240px; overflow-y:auto; scrollbar-width:thin; scrollbar-color:#e2e8f0 transparent; }
  .bsx-rows-scroll::-webkit-scrollbar { width:3px; }
  .bsx-rows-scroll::-webkit-scrollbar-thumb { background:#d1d5db; border-radius:4px; }

  /* category label within section */
  .bsx-cat-label { padding:5px 20px 4px 30px; font-size:10px; font-weight:800; letter-spacing:.09em; text-transform:uppercase; color:#94a3b8; background:#fafcff; border-bottom:1px solid #f1f5f9; }

  /* individual row */
  .bsx-row { display:flex; align-items:center; justify-content:space-between; padding:9px 20px; border-bottom:1px solid #f8fafc; transition:background .07s; }
  .bsx-row:hover { background:#f8fafc; }
  .bsx-row-name   { font-size:12.5px; color:#334155; flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .bsx-row-amount { font-family:'DM Mono',monospace; font-size:12.5px; color:#0f172a; font-weight:500; white-space:nowrap; margin-left:10px; flex-shrink:0; }
  .bsx-row-indent { padding-left:34px; }
  .bsx-empty-row  { padding:13px 20px; font-size:12.5px; color:#cbd5e1; font-style:italic; }

  /* section footer */
  .bsx-sec-foot { display:flex; align-items:center; justify-content:space-between; padding:9px 20px; background:var(--bg,#f8fafc); border-top:2px solid var(--bdr,#f1f5f9); }
  .bsx-sec-foot-lbl { font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:#64748b; }
  .bsx-sec-foot-val { font-family:'DM Mono',monospace; font-size:13px; font-weight:600; color:var(--ac,#6366f1); }

  /* total rows at bottom of columns */
  .bsx-col-total { display:flex; align-items:center; justify-content:space-between; padding:13px 20px; background:#1e293b; border-top:2px solid #0f172a; }
  .bsx-col-total-lbl { font-size:10.5px; font-weight:800; text-transform:uppercase; letter-spacing:.08em; color:rgba(255,255,255,.6); }
  .bsx-col-total-val { font-family:'DM Mono',monospace; font-size:14px; font-weight:600; color:#fff; }

  /* totals bar */
  .bsx-totals { display:grid; grid-template-columns:repeat(3,1fr); border-top:2px solid #f1f5f9; background:#fafcff; }
  .bsx-tot-cell { padding:14px 20px; text-align:center; }
  .bsx-tot-cell + .bsx-tot-cell { border-left:1.5px solid #f1f5f9; }
  .bsx-tot-lbl { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:#94a3b8; margin-bottom:5px; }
  .bsx-tot-val { font-family:'DM Mono',monospace; font-size:15px; font-weight:500; letter-spacing:-.3px; }

  /* sub-section divider */
  .bsx-divider { border:none; border-top:1.5px solid #e2e8f0; margin:0; }

  @keyframes bsx-shimmer { to{background-position:-200% 0} }
  .bsx-sk { background:linear-gradient(90deg,#f1f5f9 25%,#f8fafc 50%,#f1f5f9 75%); background-size:200% 100%; animation:bsx-shimmer 1.4s infinite; border-radius:8px; }
  @keyframes bsx-spin { to{transform:rotate(360deg)} }
  .bsx-spin { animation:bsx-spin 1s linear infinite; display:inline-block; }

  @media(max-width:700px) {
    .bsx-cols  { grid-template-columns:1fr !important; }
    .bsx-col-l { border-right:none !important; border-bottom:1.5px solid #f1f5f9; }
    .bsx-totals { grid-template-columns:1fr !important; }
    .bsx-tot-cell + .bsx-tot-cell { border-left:none !important; border-top:1.5px solid #f1f5f9; }
    .bsx-cards  { grid-template-columns:1fr !important; }
  }
`,n=t=>"Rs "+Number(t||0).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0}),C=5,E={Cash:"Cash",Bank:"Banks","Accounts Receivable":"Accounts Receivables","Loans Given":"Loans Given",Inventory:"Inventory"};function D(t=""){const o=t.toLowerCase();return o.startsWith("cash")?"Cash":o.startsWith("bank |")||o.startsWith("bank|")?"Bank":o.startsWith("customer |")?"Accounts Receivable":o.startsWith("transaction |")||o.startsWith("loan")?"Loans Given":o.startsWith("stock |")||o.startsWith("inventory |")?"Inventory":""}function q(t){const o={};t.forEach(i=>{const c=i.category||D(i.name);o[c]||(o[c]=[]),o[c].push(i)});const d=["Cash","Bank","Accounts Receivable","Loans Given","Inventory",""],r=[];return d.forEach(i=>{o[i]&&r.push({cat:i,rows:o[i]})}),Object.keys(o).filter(i=>!d.includes(i)).forEach(i=>r.push({cat:i,rows:o[i]})),r}function B({open:t}){return s.jsx("svg",{className:`bsx-chevron${t?" open":""}`,width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})}function y({grp:t,accent:o,bg:d,border:r,useCats:i}){const[c,b]=p.useState(t.rows.length<=C),m=t.rows.length>8,h=i?q(t.rows):null;return s.jsxs("div",{style:{"--ac":o,"--bg":d,"--bdr":r},children:[s.jsxs("div",{className:"bsx-sec-head",onClick:()=>b(e=>!e),children:[s.jsxs("div",{className:"bsx-sec-name",children:[s.jsx("span",{className:"bsx-sec-dot"}),t.subAccountType]}),s.jsxs("div",{className:"bsx-sec-right",children:[s.jsx("span",{className:"bsx-sec-count",children:t.rows.length}),s.jsx("span",{className:"bsx-sec-total",children:n(Math.abs(t.total))}),s.jsx(B,{open:c})]})]}),s.jsxs("div",{className:"bsx-rows-collapse",style:{maxHeight:c?"9999px":0,overflow:"hidden"},children:[t.rows.length===0&&s.jsx("p",{className:"bsx-empty-row",children:"No entries"}),h?s.jsx("div",{className:m?"bsx-rows-scroll":"",children:h.map(({cat:e,rows:x})=>s.jsxs(j.Fragment,{children:[e&&s.jsx("div",{className:"bsx-cat-label",children:E[e]||e}),x.map((f,a)=>s.jsxs("div",{className:`bsx-row${e?" bsx-row-indent":""}`,children:[s.jsx("span",{className:"bsx-row-name",children:f.name}),s.jsx("span",{className:"bsx-row-amount",children:n(Math.abs(f.amount||0))})]},f.id||a))]},e))}):s.jsx("div",{className:m?"bsx-rows-scroll":"",children:t.rows.map((e,x)=>s.jsxs("div",{className:"bsx-row",children:[s.jsx("span",{className:"bsx-row-name",children:e.name}),s.jsx("span",{className:"bsx-row-amount",children:n(Math.abs(e.amount||0))})]},e.id||x))}),s.jsxs("div",{className:"bsx-sec-foot",children:[s.jsxs("span",{className:"bsx-sec-foot-lbl",children:["Total ",t.subAccountType]}),s.jsx("span",{className:"bsx-sec-foot-val",children:n(Math.abs(t.total))})]})]})]})}function R({name:t}){const o=localStorage.getItem("logoUrl")||"",[d,r]=p.useState(!1),i=(t||"R").slice(0,2).toUpperCase();return o&&!d?s.jsx("img",{src:o,alt:t,className:"bsx-co-logo",onError:()=>r(!0)}):s.jsx("div",{className:"bsx-co-logo-fb",children:i})}function G(){const[t,o]=p.useState(null),[d,r]=p.useState(!0),[i,c]=p.useState(!1),b=p.useRef(null),m=localStorage.getItem("businessName")||"Rice Mill";p.useEffect(()=>{(async()=>{try{const a=await M(`${z}/balance-sheet`),l=await a.json();if(!a.ok)throw new Error(l?.message||"Failed");o(l)}catch(a){console.error(a)}finally{r(!1)}})()},[]);const h=async()=>{if(b.current){c(!0);try{const a=await S(b.current,{scale:2,backgroundColor:"#ffffff",useCORS:!0}),l=a.toDataURL("image/png"),g=new A("landscape","mm","a4"),w=g.internal.pageSize.getWidth(),v=g.internal.pageSize.getHeight(),u=Math.min(w/a.width,v/a.height)*.93;g.addImage(l,"PNG",(w-a.width*u)/2,(v-a.height*u)/2,a.width*u,a.height*u),g.save(`balance-sheet-${new Date().toISOString().slice(0,10)}.pdf`)}catch(a){console.error(a)}c(!1)}};if(d)return s.jsxs(N,{children:[s.jsxs("style",{children:[k,L]}),s.jsxs("div",{className:"bsx",children:[s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:24,alignItems:"flex-end",flexWrap:"wrap",gap:12},children:[s.jsxs("div",{children:[s.jsx("div",{className:"bsx-sk",style:{width:80,height:10,marginBottom:10}}),s.jsx("div",{className:"bsx-sk",style:{width:200,height:28}})]}),s.jsx("div",{className:"bsx-sk",style:{width:130,height:38,borderRadius:10}})]}),s.jsxs("div",{className:"bsx-panel",style:{minHeight:320},children:[s.jsxs("div",{style:{padding:"20px 24px",background:"#f8fafc",borderBottom:"1.5px solid #f1f5f9",display:"flex",justifyContent:"center",gap:14,alignItems:"center"},children:[s.jsx("div",{className:"bsx-sk",style:{width:46,height:46,borderRadius:9}}),s.jsxs("div",{children:[s.jsx("div",{className:"bsx-sk",style:{width:150,height:14,marginBottom:7}}),s.jsx("div",{className:"bsx-sk",style:{width:110,height:11}})]})]}),s.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr"},children:[0,1].map(a=>s.jsx("div",{style:{borderRight:a===0?"1.5px solid #f1f5f9":"none",padding:"14px 0"},children:[0,1,2,3].map(l=>s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"10px 20px",borderBottom:"1px solid #f8fafc"},children:[s.jsx("div",{className:"bsx-sk",style:{width:"55%",height:13}}),s.jsx("div",{className:"bsx-sk",style:{width:"22%",height:13}})]},l))},a))})]})]})]});if(!t)return null;const e=t?.current||t,x=t.isBalanced||Math.abs(e.totalAssets-(e.totalLiabilities+e.totalEquity))<1,f=new Date().toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"});return s.jsxs(N,{children:[s.jsxs("style",{children:[k,L]}),s.jsxs("div",{className:"bsx",children:[s.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:14,marginBottom:22},children:[s.jsxs("div",{children:[s.jsx("p",{className:"bsx-eyebrow",children:"Financial Reports"}),s.jsxs("h1",{className:"bsx-title",children:["Balance Sheet",s.jsx("span",{className:`bsx-badge${x?"":" bsx-badge-warn"}`,children:x?s.jsxs(s.Fragment,{children:[s.jsx("svg",{width:10,height:10,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:3,style:{display:"inline-block",verticalAlign:"middle"},children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})," Balanced"]}):"⚠ Out of balance"})]}),s.jsxs("p",{className:"bsx-subtitle",children:["As at ",f]})]}),s.jsx("button",{className:"bsx-export-btn",onClick:h,disabled:i,children:i?s.jsxs(s.Fragment,{children:[s.jsx("span",{className:"bsx-spin",children:s.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})})," Exporting…"]}):s.jsxs(s.Fragment,{children:[s.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"})})," Export PDF"]})})]}),s.jsxs("div",{className:"bsx-cards",children:[s.jsxs("div",{className:"bsx-card",style:{"--c":"#4f46e5"},children:[s.jsx("p",{className:"bsx-card-lbl",children:"Total Assets"}),s.jsx("p",{className:"bsx-card-val",children:n(e.totalAssets)})]}),s.jsxs("div",{className:"bsx-card",style:{"--c":"#d97706"},children:[s.jsx("p",{className:"bsx-card-lbl",children:"Total Liabilities"}),s.jsx("p",{className:"bsx-card-val",children:n(e.totalLiabilities)})]}),s.jsxs("div",{className:"bsx-card",style:{"--c":"#059669"},children:[s.jsx("p",{className:"bsx-card-lbl",children:"Net Worth (Equity)"}),s.jsx("p",{className:"bsx-card-val",children:n(e.totalEquity)})]})]}),s.jsxs("div",{className:"bsx-eq",children:[s.jsx("span",{className:"bsx-eq-lbl",children:"Equation"}),s.jsx("span",{className:"bsx-eq-num",style:{color:"#4f46e5"},children:n(e.totalAssets)}),s.jsx("span",{className:"bsx-eq-sep",children:"="}),s.jsx("span",{className:"bsx-eq-num",style:{color:"#d97706"},children:n(e.totalLiabilities)}),s.jsx("span",{className:"bsx-eq-sep",children:"+"}),s.jsx("span",{className:"bsx-eq-num",style:{color:"#059669"},children:n(e.totalEquity)}),s.jsx("span",{className:"bsx-eq-stat",style:{color:x?"#059669":"#dc2626"},children:x?"✓ Assets = Liabilities + Equity":"✗ Does not balance"})]}),s.jsxs("div",{ref:b,className:"bsx-panel",children:[s.jsxs("div",{className:"bsx-panel-head",children:[s.jsx(R,{name:m}),s.jsxs("div",{style:{textAlign:"center"},children:[s.jsx("p",{className:"bsx-co-name",children:m}),s.jsx("p",{className:"bsx-rep-sub",children:"Balance Sheet"}),s.jsxs("p",{className:"bsx-rep-date",children:["As at ",f]})]})]}),s.jsxs("div",{className:"bsx-cols",children:[s.jsxs("div",{className:"bsx-col-l",children:[s.jsx("div",{className:"bsx-col-title",children:s.jsx("span",{className:"bsx-col-title-text",children:"Assets"})}),(e.assetGroups||[]).map((a,l)=>s.jsxs(j.Fragment,{children:[l>0&&s.jsx("hr",{className:"bsx-divider"}),s.jsx(y,{grp:a,accent:"#4f46e5",bg:"#f5f5ff",border:"#e0e7ff",useCats:a.subAccountType==="Current Assets"})]},l)),s.jsxs("div",{className:"bsx-col-total",children:[s.jsx("span",{className:"bsx-col-total-lbl",children:"Total Assets"}),s.jsx("span",{className:"bsx-col-total-val",children:n(e.totalAssets)})]})]}),s.jsxs("div",{children:[s.jsx("div",{className:"bsx-col-title",children:s.jsx("span",{className:"bsx-col-title-text",children:"Liabilities + Equity"})}),(e.liabilityGroups||[]).map((a,l)=>s.jsxs(j.Fragment,{children:[l>0&&s.jsx("hr",{className:"bsx-divider"}),s.jsx(y,{grp:a,accent:"#d97706",bg:"#fffbeb",border:"#fde68a",useCats:!1})]},l)),e.liabilityGroups?.length>0&&s.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 20px",background:"#fffbeb",borderTop:"2px solid #fde68a"},children:[s.jsx("span",{style:{fontSize:10.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",color:"#92400e"},children:"Total Liabilities"}),s.jsx("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:13.5,fontWeight:600,color:"#d97706"},children:n(e.totalLiabilities)})]}),s.jsx("hr",{className:"bsx-divider"}),(e.equityGroups||[]).map((a,l)=>s.jsxs(j.Fragment,{children:[l>0&&s.jsx("hr",{className:"bsx-divider"}),s.jsx(y,{grp:a,accent:"#059669",bg:"#f0fdf4",border:"#bbf7d0",useCats:!1})]},l)),s.jsxs("div",{className:"bsx-col-total",children:[s.jsx("span",{className:"bsx-col-total-lbl",children:"Total Liabilities & Equity"}),s.jsx("span",{className:"bsx-col-total-val",children:n(e.totalLiabilities+e.totalEquity)})]})]})]}),s.jsxs("div",{className:"bsx-totals",children:[s.jsxs("div",{className:"bsx-tot-cell",children:[s.jsx("p",{className:"bsx-tot-lbl",children:"Total Assets"}),s.jsx("p",{className:"bsx-tot-val",style:{color:"#4f46e5"},children:n(e.totalAssets)})]}),s.jsxs("div",{className:"bsx-tot-cell",children:[s.jsx("p",{className:"bsx-tot-lbl",children:"Total Liabilities"}),s.jsx("p",{className:"bsx-tot-val",style:{color:"#d97706"},children:n(e.totalLiabilities)})]}),s.jsxs("div",{className:"bsx-tot-cell",children:[s.jsx("p",{className:"bsx-tot-lbl",children:"Net Worth (Equity)"}),s.jsx("p",{className:"bsx-tot-val",style:{color:"#059669"},children:n(e.totalEquity)})]})]})]}),s.jsx("p",{style:{textAlign:"center",color:"#94a3b8",fontSize:11.5,marginTop:13,fontFamily:"'DM Mono',monospace"},children:"Click any section header to expand or collapse"})]})]})}export{G as default};
