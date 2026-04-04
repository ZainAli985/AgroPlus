import{a as l,j as e}from"./vendor-react-BFXNeceC.js";import{a as S,A as z,S as j}from"./index-C7cxDwLg.js";import{h as M,E as D}from"./vendor-DDAwBBib.js";import"./vendor-react-dom-DDWplefk.js";const y="@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",k=`
  .tbx * { box-sizing: border-box; }
  .tbx {
    font-family: 'DM Sans', sans-serif; color: #1a1a2e;
    width: 100%; max-width: 860px; margin: 0 auto;
  }
  .tbx-eyebrow  { font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: #9ca3af; margin-bottom: 6px; }
  .tbx-title    { font-family: 'Lora', serif; font-size: 26px; font-weight: 700; color: #0f172a; letter-spacing: -.3px; line-height: 1.15; display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
  .tbx-subtitle { font-size: 13px; color: #94a3b8; margin-top: 5px; }

  .tbx-badge { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:600; font-family:'DM Sans',sans-serif; background:#ecfdf5; color:#059669; border:1px solid #a7f3d0; }
  .tbx-badge-warn { background:#fff7ed; color:#c2410c; border-color:#fed7aa; }

  .tbx-export-btn { display:inline-flex; align-items:center; gap:7px; padding:9px 18px; border-radius:10px; border:none; cursor:pointer; background:#0f172a; color:#fff; font-size:13px; font-weight:600; font-family:'DM Sans',sans-serif; box-shadow:0 2px 8px rgba(15,23,42,.18); transition:background .15s; white-space:nowrap; }
  .tbx-export-btn:hover:not(:disabled) { background:#1e293b; }
  .tbx-export-btn:disabled { opacity:.5; cursor:not-allowed; }

  /* summary cards */
  .tbx-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:18px; }
  .tbx-card { background:#fff; border:1.5px solid #e2e8f0; border-radius:14px; padding:18px 20px; position:relative; overflow:hidden; }
  .tbx-card::before { content:''; position:absolute; left:0; top:0; bottom:0; width:4px; border-radius:14px 0 0 14px; background:var(--c,#6366f1); }
  .tbx-card-lbl { font-size:11px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:#94a3b8; margin-bottom:8px; }
  .tbx-card-val { font-family:'DM Mono',monospace; font-size:22px; font-weight:500; color:#0f172a; letter-spacing:-.4px; line-height:1; }
  .tbx-card-sub { font-size:12px; color:#94a3b8; margin-top:7px; }

  .tbx-match-chip { display:inline-flex; align-items:center; gap:6px; padding:11px 18px; border-radius:12px; font-size:12.5px; font-weight:600; font-family:'DM Sans',sans-serif; white-space:nowrap; }
  .tbx-chip-ok   { background:#f0fdf4; color:#059669; border:1.5px solid #bbf7d0; }
  .tbx-chip-warn { background:#fef9c3; color:#854d0e; border:1.5px solid #fde68a; }

  /* report panel */
  .tbx-panel { background:#fff; border:1.5px solid #e2e8f0; border-radius:16px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,.06); }
  .tbx-panel-head { display:flex; align-items:center; justify-content:center; gap:14px; padding:20px 24px; border-bottom:1.5px solid #f1f5f9; background:linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%); }
  .tbx-co-name  { font-family:'Lora',serif; font-size:17px; font-weight:700; color:#0f172a; }
  .tbx-rep-sub  { font-family:'Lora',serif; font-size:13px; font-style:italic; font-weight:500; color:#64748b; margin-top:2px; }
  .tbx-rep-date { font-size:11.5px; color:#94a3b8; margin-top:2px; }
  .tbx-co-logo  { width:46px; height:46px; border-radius:9px; object-fit:cover; border:1px solid #e2e8f0; flex-shrink:0; }
  .tbx-co-logo-fb { width:46px; height:46px; border-radius:9px; background:#1e293b; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:800; color:#4ade80; flex-shrink:0; font-family:'DM Sans',sans-serif; }

  /* collapsible group */
  .tbx-group-head {
    display:flex; align-items:center; justify-content:space-between;
    padding:10px 18px; cursor:pointer; user-select:none;
    background:#f8fafc; border-top:2px solid #f1f5f9;
    transition:background .1s;
  }
  .tbx-group-head:hover { background:#f1f5f9; }
  .tbx-group-head:first-child { border-top:none; }
  .tbx-group-label { font-size:10.5px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:#64748b; display:flex; align-items:center; gap:8px; }
  .tbx-group-right { display:flex; align-items:center; gap:0; }
  .tbx-group-count { font-size:10.5px; font-weight:600; color:#94a3b8; background:#e2e8f0; padding:1px 7px; border-radius:4px; font-family:'DM Mono',monospace; margin-left:8px; }
  .tbx-chevron { color:#94a3b8; transition:transform .2s; flex-shrink:0; margin-left:10px; }
  .tbx-chevron.open { transform:rotate(180deg); }

  /* rows container — scrollable */
  .tbx-rows-wrap { overflow:hidden; transition:max-height .25s ease; }
  .tbx-rows-scroll { max-height:260px; overflow-y:auto; scrollbar-width:thin; scrollbar-color:#e2e8f0 transparent; }
  .tbx-rows-scroll::-webkit-scrollbar { width:4px; }
  .tbx-rows-scroll::-webkit-scrollbar-thumb { background:#d1d5db; border-radius:4px; }

  /* account row */
  .tbx-row { display:flex; align-items:center; padding:9px 18px; border-bottom:1px solid #f8fafc; transition:background .08s; }
  .tbx-row:hover { background:#fafafa; }
  .tbx-row-name  { flex:1; font-size:13px; color:#334155; padding-left:12px; }
  .tbx-row-ref   { width:100px; text-align:center; font-family:'DM Mono',monospace; font-size:11px; color:#94a3b8; flex-shrink:0; }
  .tbx-row-num   { width:120px; text-align:right; font-family:'DM Mono',monospace; font-size:12.5px; color:#0f172a; font-weight:500; white-space:nowrap; flex-shrink:0; }
  .tbx-row-empty { width:120px; text-align:right; color:#e5e7eb; flex-shrink:0; font-size:12.5px; }

  /* group subtotal */
  .tbx-subtotal { display:flex; align-items:center; justify-content:space-between; padding:9px 18px; background:#f5f5ff; border-top:1.5px solid #e0e7ff; }
  .tbx-subtotal-lbl { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:#6366f1; padding-left:12px; }
  .tbx-subtotal-nums { display:flex; gap:0; }
  .tbx-subtotal-num  { width:120px; text-align:right; font-family:'DM Mono',monospace; font-size:13px; font-weight:600; color:#4f46e5; }

  /* grand total */
  .tbx-grand { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; background:#1e293b; border-top:2px solid #0f172a; }
  .tbx-grand-lbl { font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:.08em; color:rgba(255,255,255,.6); padding-left:12px; }
  .tbx-grand-nums { display:flex; gap:0; }
  .tbx-grand-num  { width:120px; text-align:right; font-family:'DM Mono',monospace; font-size:14px; font-weight:600; color:#fff; white-space:nowrap; }

  /* table header */
  .tbx-thead { display:flex; align-items:center; padding:10px 18px; background:#1e293b; }
  .tbx-thead-name { flex:1; font-size:11px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:rgba(255,255,255,.65); padding-left:12px; }
  .tbx-thead-ref  { width:100px; text-align:center; font-size:11px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:rgba(255,255,255,.45); flex-shrink:0; }
  .tbx-thead-num  { width:120px; text-align:right; font-size:11px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:rgba(255,255,255,.65); flex-shrink:0; }

  @keyframes tbx-shimmer { to{background-position:-200% 0} }
  .tbx-sk { background:linear-gradient(90deg,#f1f5f9 25%,#f8fafc 50%,#f1f5f9 75%); background-size:200% 100%; animation:tbx-shimmer 1.4s infinite; border-radius:8px; }
  @keyframes tbx-spin { to{transform:rotate(360deg)} }
  .tbx-spin { animation:tbx-spin 1s linear infinite; display:inline-block; }

  @media(max-width:600px) {
    .tbx-cards { grid-template-columns:1fr !important; }
    .tbx-row-ref { display:none; }
    .tbx-thead-ref { display:none; }
  }
`,r=t=>Number(t||0).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0}),h=t=>"Rs "+r(t),C=6;function L({open:t}){return e.jsx("svg",{className:`tbx-chevron${t?" open":""}`,width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})}function R({group:t}){const[o,x]=l.useState(t.rows.length<=C),i=t.rows.reduce((a,d)=>a+(d.debit||0),0),n=t.rows.reduce((a,d)=>a+(d.credit||0),0),p=t.rows.length>8;return e.jsxs("div",{children:[e.jsxs("div",{className:"tbx-group-head",onClick:()=>x(a=>!a),children:[e.jsxs("span",{className:"tbx-group-label",children:[t.type,e.jsxs("span",{className:"tbx-group-count",children:[t.rows.length," accounts"]})]}),e.jsxs("div",{className:"tbx-group-right",children:[i>0&&e.jsx("span",{style:{width:120,textAlign:"right",fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:600,color:"#4f46e5",flexShrink:0},children:r(i)}),i===0&&e.jsx("span",{style:{width:120,textAlign:"right",fontSize:12,color:"#e2e8f0",flexShrink:0},children:"—"}),n>0&&e.jsx("span",{style:{width:120,textAlign:"right",fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:600,color:"#059669",flexShrink:0},children:r(n)}),n===0&&e.jsx("span",{style:{width:120,textAlign:"right",fontSize:12,color:"#e2e8f0",flexShrink:0},children:"—"}),e.jsx(L,{open:o})]})]}),e.jsxs("div",{className:"tbx-rows-wrap",style:{maxHeight:o?"9999px":0,overflow:"hidden"},children:[e.jsx("div",{className:p?"tbx-rows-scroll":"",children:t.rows.map(a=>e.jsxs("div",{className:"tbx-row",children:[e.jsx("span",{className:"tbx-row-name",children:a.name}),e.jsx("span",{className:"tbx-row-ref",children:a.ledgerRef||"—"}),e.jsx("span",{className:a.debit?"tbx-row-num":"tbx-row-empty",children:a.debit?r(a.debit):"—"}),e.jsx("span",{className:a.credit?"tbx-row-num":"tbx-row-empty",children:a.credit?r(a.credit):"—"})]},a.id))}),e.jsxs("div",{className:"tbx-subtotal",children:[e.jsxs("span",{className:"tbx-subtotal-lbl",children:["Subtotal — ",t.type]}),e.jsxs("div",{className:"tbx-subtotal-nums",children:[e.jsx("span",{className:"tbx-subtotal-num",children:i>0?r(i):"—"}),e.jsx("span",{className:"tbx-subtotal-num",children:n>0?r(n):"—"})]})]})]})]})}function B({name:t}){const o=localStorage.getItem("logoUrl")||"",[x,i]=l.useState(!1),n=(t||"R").slice(0,2).toUpperCase();return o&&!x?e.jsx("img",{src:o,alt:t,className:"tbx-co-logo",onError:()=>i(!0)}):e.jsx("div",{className:"tbx-co-logo-fb",children:n})}function I(){const[t,o]=l.useState(null),[x,i]=l.useState(!0),[n,p]=l.useState(!1),a=l.useRef(null),d=localStorage.getItem("businessName")||"Rice Mill";l.useEffect(()=>{(async()=>{try{const s=await S(`${z}/trial-balance`),c=await s.json();if(!s.ok)throw new Error(c?.message||"Failed");o(c)}catch(s){console.error(s)}finally{i(!1)}})()},[]);const v=async()=>{if(a.current){p(!0);try{const s=await M(a.current,{scale:2,backgroundColor:"#ffffff",useCORS:!0}),c=s.toDataURL("image/png"),b=new D("portrait","mm","a4"),w=b.internal.pageSize.getWidth(),N=b.internal.pageSize.getHeight(),m=Math.min(w*.92/s.width,(N-20)/s.height);b.addImage(c,"PNG",(w-s.width*m)/2,10,s.width*m,s.height*m),b.save(`trial-balance-${new Date().toISOString().slice(0,10)}.pdf`)}catch(s){console.error(s)}p(!1)}};if(x)return e.jsxs(j,{children:[e.jsxs("style",{children:[y,k]}),e.jsxs("div",{className:"tbx",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:24,alignItems:"flex-end",flexWrap:"wrap",gap:12},children:[e.jsxs("div",{children:[e.jsx("div",{className:"tbx-sk",style:{width:80,height:10,marginBottom:10}}),e.jsx("div",{className:"tbx-sk",style:{width:200,height:28}})]}),e.jsx("div",{className:"tbx-sk",style:{width:130,height:38,borderRadius:10}})]}),e.jsx("div",{className:"tbx-cards",children:[0,1,2].map(s=>e.jsxs("div",{style:{background:"#fff",border:"1.5px solid #e2e8f0",borderRadius:14,padding:"18px 20px"},children:[e.jsx("div",{className:"tbx-sk",style:{width:"50%",height:10,marginBottom:11}}),e.jsx("div",{className:"tbx-sk",style:{width:"70%",height:22,marginBottom:10}}),e.jsx("div",{className:"tbx-sk",style:{width:"60%",height:9}})]},s))}),e.jsxs("div",{className:"tbx-panel",style:{minHeight:260},children:[e.jsxs("div",{style:{padding:"20px 24px",background:"#f8fafc",borderBottom:"1.5px solid #f1f5f9",display:"flex",justifyContent:"center",gap:14,alignItems:"center"},children:[e.jsx("div",{className:"tbx-sk",style:{width:46,height:46,borderRadius:9}}),e.jsxs("div",{children:[e.jsx("div",{className:"tbx-sk",style:{width:150,height:14,marginBottom:7}}),e.jsx("div",{className:"tbx-sk",style:{width:110,height:11}})]})]}),e.jsx("div",{style:{height:42,background:"#1e293b"}}),[0,1,2,3,4,5].map(s=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"10px 18px",borderBottom:"1px solid #f8fafc"},children:[e.jsx("div",{className:"tbx-sk",style:{width:s%4===0?"30%":"50%",height:s%4===0?10:13}}),e.jsxs("div",{style:{display:"flex",gap:40},children:[e.jsx("div",{className:"tbx-sk",style:{width:80,height:13}}),e.jsx("div",{className:"tbx-sk",style:{width:80,height:13}})]})]},s))]})]})]});if(!t)return null;const f=Math.abs((t.totalDebit||0)-(t.totalCredit||0))<1,g=t.groups?.reduce((s,c)=>s+(c.rows?.length||0),0)||0,u=new Date().toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"});return e.jsxs(j,{children:[e.jsxs("style",{children:[y,k]}),e.jsxs("div",{className:"tbx",children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:14,marginBottom:24},children:[e.jsxs("div",{children:[e.jsx("p",{className:"tbx-eyebrow",children:"Financial Reports"}),e.jsxs("h1",{className:"tbx-title",children:["Trial Balance",e.jsx("span",{className:`tbx-badge${f?"":" tbx-badge-warn"}`,children:f?e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:10,height:10,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:3,style:{display:"inline-block",verticalAlign:"middle"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})," Balanced"]}):"⚠ Out of balance"})]}),e.jsxs("p",{className:"tbx-subtitle",children:["As at ",u]})]}),e.jsx("button",{className:"tbx-export-btn",onClick:v,disabled:n,children:n?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"tbx-spin",children:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})})," Exporting…"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"})})," Export PDF"]})})]}),e.jsxs("div",{className:"tbx-cards",children:[e.jsxs("div",{className:"tbx-card",style:{"--c":"#4f46e5"},children:[e.jsx("p",{className:"tbx-card-lbl",children:"Total Debit"}),e.jsx("p",{className:"tbx-card-val",children:h(t.totalDebit)}),e.jsx("p",{className:"tbx-card-sub",children:"Sum of all debit balances"})]}),e.jsxs("div",{className:"tbx-card",style:{"--c":"#059669"},children:[e.jsx("p",{className:"tbx-card-lbl",children:"Total Credit"}),e.jsx("p",{className:"tbx-card-val",children:h(t.totalCredit)}),e.jsx("p",{className:"tbx-card-sub",children:"Sum of all credit balances"})]}),e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("div",{className:`tbx-match-chip ${f?"tbx-chip-ok":"tbx-chip-warn"}`,children:f?e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})}),"Debits = Credits"]}):e.jsxs(e.Fragment,{children:["Difference: Rs ",r(Math.abs((t.totalDebit||0)-(t.totalCredit||0)))]})})})]}),e.jsxs("div",{ref:a,className:"tbx-panel",children:[e.jsxs("div",{className:"tbx-panel-head",children:[e.jsx(B,{name:d}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("p",{className:"tbx-co-name",children:d}),e.jsx("p",{className:"tbx-rep-sub",children:"Trial Balance"}),e.jsxs("p",{className:"tbx-rep-date",children:["As at ",u]})]})]}),e.jsxs("div",{className:"tbx-thead",children:[e.jsx("span",{className:"tbx-thead-name",children:"Account Title"}),e.jsx("span",{className:"tbx-thead-ref",children:"Ledger Ref (L.F.)"}),e.jsx("span",{className:"tbx-thead-num",children:"Debit (PKR)"}),e.jsx("span",{className:"tbx-thead-num",children:"Credit (PKR)"})]}),t.groups?.map(s=>e.jsx(R,{group:s},s.type)),e.jsxs("div",{className:"tbx-grand",children:[e.jsxs("span",{className:"tbx-grand-lbl",children:["Totals · ",g," accounts"]}),e.jsxs("div",{className:"tbx-grand-nums",children:[e.jsx("span",{className:"tbx-grand-num",children:h(t.totalDebit)}),e.jsx("span",{className:"tbx-grand-num",children:h(t.totalCredit)})]})]})]}),e.jsxs("p",{style:{textAlign:"center",color:"#94a3b8",fontSize:12,marginTop:14,fontFamily:"'DM Mono',monospace"},children:[g," account",g!==1?"s":""," · ",t.groups?.length||0," categories"," · ",e.jsx("span",{style:{color:"#94a3b8",fontSize:12,fontFamily:"'DM Mono',monospace"},children:"Tip: click a category header to expand / collapse"})]})]})]})}export{I as default};
