import{a as R,A as B,j as s,S}from"./index-0AjI2EP2.js";import{b as c,R as E}from"./react-BBT0yyZ1.js";import{h as A,E as C}from"./html2canvas.esm-CD4SVlYO.js";const z=`
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
`,L=`
  .bsx-wrap *, .bsx-wrap *::before, .bsx-wrap *::after { box-sizing: border-box; }

  .bsx-wrap {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
    width: 100%;
    max-width: 1080px;
  }

  /* eyebrow + title */
  .bsx-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: .12em;
    text-transform: uppercase; color: #9ca3af; margin-bottom: 6px;
  }
  .bsx-title {
    font-family: 'Lora', serif; font-size: 26px; font-weight: 700;
    color: #0f172a; letter-spacing: -.3px; line-height: 1.15;
    display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  }
  .bsx-subtitle { font-size: 13px; color: #94a3b8; margin-top: 5px; }

  /* balanced badge */
  .bsx-badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; font-style: normal;
    background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0;
  }
  .bsx-badge-warn { background: #fff7ed; color: #c2410c; border-color: #fed7aa; }

  /* export button */
  .bsx-export-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px; border-radius: 10px; border: none; cursor: pointer;
    background: #0f172a; color: #fff; font-size: 13px; font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    box-shadow: 0 2px 8px rgba(15,23,42,.18);
    transition: background .15s, box-shadow .15s; white-space: nowrap;
  }
  .bsx-export-btn:hover:not(:disabled) { background: #1e293b; box-shadow: 0 4px 14px rgba(15,23,42,.26); }
  .bsx-export-btn:disabled { opacity: .5; cursor: not-allowed; }

  /* nav pills */
  .bsx-nav-pill {
    padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600;
    border: 1.5px solid #e2e8f0; background: #fff; color: #64748b;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .12s;
    white-space: nowrap;
  }
  .bsx-nav-pill:hover { border-color: #94a3b8; color: #334155; background: #f8fafc; }

  /* equation bar */
  .bsx-eq-bar {
    display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
    background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px;
    padding: 11px 18px; margin-bottom: 20px;
  }
  .bsx-eq-label {
    font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
    color: #94a3b8; font-family: 'DM Sans', sans-serif;
  }
  .bsx-eq-sep { color: #cbd5e1; font-size: 15px; font-family: 'DM Mono', monospace; }
  .bsx-eq-num { font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 500; }
  .bsx-eq-status {
    margin-left: auto; font-size: 11.5px; font-weight: 600; font-family: 'DM Sans', sans-serif;
  }

  /* summary cards */
  .bsx-card {
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px;
    padding: 18px 20px; cursor: pointer; transition: box-shadow .15s, transform .15s;
    width: 100%; text-align: left; position: relative; overflow: hidden;
    display: block;
  }
  .bsx-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 4px; border-radius: 14px 0 0 14px; background: var(--bsx-accent, #6366f1);
  }
  .bsx-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,.07); transform: translateY(-1px); }
  .bsx-card-lbl {
    font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
    color: #94a3b8; margin-bottom: 8px;
  }
  .bsx-card-val {
    font-family: 'DM Mono', monospace; font-size: 20px; font-weight: 500;
    color: #0f172a; letter-spacing: -.4px; line-height: 1;
  }
  .bsx-delta {
    display: inline-flex; align-items: center; gap: 3px;
    margin-top: 9px; font-size: 11px; font-weight: 600; padding: 2px 7px;
    border-radius: 6px; font-family: 'DM Sans', sans-serif;
  }
  .bsx-delta-up   { background: #ecfdf5; color: #059669; }
  .bsx-delta-dn   { background: #fef2f2; color: #dc2626; }
  .bsx-delta-flat { background: #f1f5f9; color: #94a3b8; }

  /* report panel */
  .bsx-report-panel {
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 16px;
    overflow: hidden; box-shadow: 0 1px 6px rgba(0,0,0,.05);
  }
  .bsx-report-head {
    display: flex; align-items: center; justify-content: center; gap: 14px;
    padding: 20px 24px; border-bottom: 1.5px solid #f1f5f9;
    background: linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%);
  }
  .bsx-company-name { font-family: 'Lora', serif; font-size: 16px; font-weight: 600; color: #0f172a; }
  .bsx-report-date  { font-size: 11.5px; color: #94a3b8; margin-top: 2px; }

  /* two columns */
  .bsx-two-col { display: grid; grid-template-columns: 1fr 1fr; }
  .bsx-col-left { border-right: 1.5px solid #f1f5f9; }

  /* section */
  .bsx-sec-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 22px; background: var(--bsx-bg,#f8fafc); border-bottom: 1.5px solid var(--bsx-border,#f1f5f9);
  }
  .bsx-sec-name {
    display: flex; align-items: center; gap: 7px;
    font-family: 'Lora', serif; font-size: 14px; font-weight: 600;
    color: var(--bsx-accent,#6366f1); font-style: italic;
  }
  .bsx-sec-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--bsx-accent,#6366f1); flex-shrink: 0;
  }
  .bsx-sec-count {
    font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
    color: #94a3b8; font-style: normal; margin-left: 3px;
  }
  .bsx-sec-total {
    font-family: 'DM Mono', monospace; font-size: 14px; font-weight: 500;
    color: var(--bsx-accent,#6366f1);
  }

  /* row */
  .bsx-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 22px; border-bottom: 1px solid #f8fafc; transition: background .08s;
  }
  .bsx-row:last-of-type { border-bottom: none; }
  .bsx-row:hover { background: #f8fafc; }
  .bsx-row-name   { font-size: 13px; color: #334155; font-weight: 400; }
  .bsx-row-amount {
    font-family: 'DM Mono', monospace; font-size: 12.5px; color: #0f172a;
    font-weight: 500; white-space: nowrap; margin-left: 14px;
  }

  /* section footer */
  .bsx-sec-foot {
    display: flex; align-items: center; justify-content: space-between;
    padding: 11px 22px; background: var(--bsx-bg,#f8fafc); border-top: 2px solid var(--bsx-border,#f1f5f9);
  }
  .bsx-sec-foot-lbl {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .06em; color: #64748b;
  }
  .bsx-sec-foot-val {
    font-family: 'DM Mono', monospace; font-size: 13.5px; font-weight: 500;
    color: var(--bsx-accent,#6366f1);
  }

  /* prev period line */
  .bsx-prev-line {
    display: flex; align-items: center; justify-content: space-between;
    padding: 7px 22px; border-top: 1px solid #f1f5f9; background: #fafcff;
  }
  .bsx-prev-txt { font-size: 11px; color: #94a3b8; font-weight: 500; }
  .bsx-chip {
    font-size: 10.5px; font-weight: 600; padding: 1px 7px; border-radius: 5px;
  }
  .bsx-chip-up   { background: #ecfdf5; color: #059669; }
  .bsx-chip-dn   { background: #fef2f2; color: #dc2626; }
  .bsx-chip-flat { background: #f1f5f9; color: #94a3b8; }

  /* empty */
  .bsx-empty-row { padding: 16px 22px; font-size: 13px; color: #cbd5e1; font-style: italic; }

  /* totals bar */
  .bsx-totals-bar {
    display: grid; grid-template-columns: repeat(3,1fr);
    border-top: 2px solid #f1f5f9; background: #fafcff;
  }
  .bsx-total-cell { padding: 15px 22px; text-align: center; }
  .bsx-total-cell + .bsx-total-cell { border-left: 1.5px solid #f1f5f9; }
  .bsx-total-cell-lbl {
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: #94a3b8; margin-bottom: 5px;
  }
  .bsx-total-cell-val {
    font-family: 'DM Mono', monospace; font-size: 15px; font-weight: 500; letter-spacing: -.3px;
  }

  /* skeleton */
  @keyframes bsx-shimmer { to { background-position: -200% 0; } }
  .bsx-sk {
    background: linear-gradient(90deg,#f1f5f9 25%,#f8fafc 50%,#f1f5f9 75%);
    background-size: 200% 100%; animation: bsx-shimmer 1.4s infinite; border-radius: 8px;
  }
  @keyframes bsx-rotate { to { transform: rotate(360deg); } }
  .bsx-spin { animation: bsx-rotate 1s linear infinite; display: inline-block; }

  /* responsive */
  @media (max-width: 680px) {
    .bsx-two-col { grid-template-columns: 1fr !important; }
    .bsx-col-left { border-right: none !important; border-bottom: 1.5px solid #f1f5f9 !important; }
    .bsx-totals-bar { grid-template-columns: 1fr !important; }
    .bsx-total-cell + .bsx-total-cell { border-left: none !important; border-top: 1.5px solid #f1f5f9 !important; }
    .bsx-cards { grid-template-columns: 1fr !important; }
  }
`,o=e=>"Rs "+Number(e||0).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0}),D=e=>e>0?"up":e<0?"dn":"flat",q=e=>e>0?"↑":e<0?"↓":"—";function v({label:e,value:i,prev:d,accent:x,onClick:f}){const l=i-d,p=D(l);return s.jsxs("button",{className:"bsx-card",style:{"--bsx-accent":x},onClick:f,children:[s.jsx("p",{className:"bsx-card-lbl",children:e}),s.jsx("p",{className:"bsx-card-val",children:o(i)}),s.jsxs("span",{className:`bsx-delta bsx-delta-${p}`,children:[q(l)," ",l===0?"No change from last period":`${o(Math.abs(l))} ${l>0?"more":"less"} than last`]})]})}const N=E.forwardRef(({title:e,rows:i,total:d,prevTotal:x,accent:f,bg:l,border:p},m)=>{const r=d-x,h=D(r);return s.jsxs("div",{ref:m,style:{"--bsx-accent":f,"--bsx-bg":l,"--bsx-border":p},children:[s.jsxs("div",{className:"bsx-sec-head",children:[s.jsxs("div",{className:"bsx-sec-name",children:[s.jsx("span",{className:"bsx-sec-dot"}),e,s.jsxs("span",{className:"bsx-sec-count",children:[i.length," item",i.length!==1?"s":""]})]}),s.jsx("span",{className:"bsx-sec-total",children:o(d)})]}),i.length===0?s.jsx("p",{className:"bsx-empty-row",children:"No entries"}):i.map((n,j)=>s.jsxs("div",{className:"bsx-row",children:[s.jsx("span",{className:"bsx-row-name",children:n.name}),s.jsx("span",{className:"bsx-row-amount",children:o(Number(n.amount)||0)})]},n.id||j)),s.jsxs("div",{className:"bsx-sec-foot",children:[s.jsxs("span",{className:"bsx-sec-foot-lbl",children:["Total ",e]}),s.jsx("span",{className:"bsx-sec-foot-val",children:o(d)})]}),x>0&&s.jsxs("div",{className:"bsx-prev-line",children:[s.jsxs("span",{className:"bsx-prev-txt",children:["Prev: ",s.jsx("span",{style:{fontFamily:"'DM Mono',monospace"},children:o(x)})]}),s.jsxs("span",{className:`bsx-chip bsx-chip-${h}`,children:[q(r)," ",r===0?"No change":`${o(Math.abs(r))} ${r>0?"more":"less"}`]})]})]})});function F(){return s.jsxs(S,{children:[s.jsxs("style",{children:[z,L]}),s.jsxs("div",{className:"bsx-wrap",children:[s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:26,alignItems:"flex-end",flexWrap:"wrap",gap:12},children:[s.jsxs("div",{children:[s.jsx("div",{className:"bsx-sk",style:{width:90,height:10,marginBottom:10}}),s.jsx("div",{className:"bsx-sk",style:{width:200,height:28}})]}),s.jsx("div",{className:"bsx-sk",style:{width:130,height:38,borderRadius:10}})]}),s.jsx("div",{className:"bsx-cards",style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:18},children:[0,1,2].map(e=>s.jsxs("div",{style:{background:"#fff",border:"1.5px solid #e2e8f0",borderRadius:14,padding:"18px 20px"},children:[s.jsx("div",{className:"bsx-sk",style:{width:"50%",height:10,marginBottom:11}}),s.jsx("div",{className:"bsx-sk",style:{width:"70%",height:22,marginBottom:10}}),s.jsx("div",{className:"bsx-sk",style:{width:"85%",height:9}})]},e))}),s.jsx("div",{className:"bsx-sk",style:{height:44,borderRadius:12,marginBottom:20}}),s.jsxs("div",{className:"bsx-report-panel",style:{minHeight:280},children:[s.jsxs("div",{style:{padding:"20px 24px",background:"#f8fafc",borderBottom:"1.5px solid #f1f5f9",display:"flex",justifyContent:"center",gap:14,alignItems:"center"},children:[s.jsx("div",{className:"bsx-sk",style:{width:44,height:44,borderRadius:8}}),s.jsxs("div",{children:[s.jsx("div",{className:"bsx-sk",style:{width:150,height:14,marginBottom:7}}),s.jsx("div",{className:"bsx-sk",style:{width:110,height:11}})]})]}),s.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr"},children:[0,1].map(e=>s.jsxs("div",{style:{borderRight:e===0?"1.5px solid #f1f5f9":"none"},children:[s.jsx("div",{style:{padding:"13px 22px",background:"#f8fafc",borderBottom:"1.5px solid #f1f5f9"},children:s.jsx("div",{className:"bsx-sk",style:{width:70,height:12}})}),[0,1,2,3].map(i=>s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"10px 22px",borderBottom:"1px solid #f8fafc"},children:[s.jsx("div",{className:"bsx-sk",style:{width:"55%",height:13}}),s.jsx("div",{className:"bsx-sk",style:{width:"22%",height:13}})]},i))]},e))})]})]})]})}function I(){const[e,i]=c.useState(null),[d,x]=c.useState(!0),[f,l]=c.useState(!1),p=c.useRef(null),m=c.useRef(null),r=c.useRef(null),h=c.useRef(null);c.useEffect(()=>{(async()=>{try{const a=await R(`${B}/balance-sheet`),u=await a.json();if(!a.ok)throw new Error(u?.message||"Failed");i(u)}catch(a){console.error(a)}finally{x(!1)}})()},[]);const n=a=>a.current?.scrollIntoView({behavior:"smooth",block:"start"}),j=async()=>{if(p.current){l(!0);try{const a=await A(p.current,{scale:2,backgroundColor:"#ffffff"}),u=a.toDataURL("image/png"),y=new C("landscape","mm","a4"),k=y.internal.pageSize.getWidth(),M=y.internal.pageSize.getHeight(),w=Math.min(k/a.width,M/a.height)*.95;y.addImage(u,"PNG",(k-a.width*w)/2,(M-a.height*w)/2,a.width*w,a.height*w),y.save(`balance-sheet-${new Date().toISOString().slice(0,10)}.pdf`)}catch(a){console.error(a)}l(!1)}};if(d)return s.jsx(F,{});if(!e)return null;const t=e?.current||e,b=e?.previous||{totalAssets:0,totalLiabilities:0,totalEquity:0},g=e.isBalanced||Math.abs(t.totalAssets-(t.totalLiabilities+t.totalEquity))<1;return s.jsxs(S,{children:[s.jsxs("style",{children:[z,L]}),s.jsxs("div",{className:"bsx-wrap",children:[s.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:14,marginBottom:26},children:[s.jsxs("div",{children:[s.jsx("p",{className:"bsx-eyebrow",children:"Financial Reports"}),s.jsxs("h1",{className:"bsx-title",children:["Balance Sheet",s.jsx("span",{className:`bsx-badge${g?"":" bsx-badge-warn"}`,children:g?s.jsxs(s.Fragment,{children:[s.jsx("svg",{width:10,height:10,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:3,style:{display:"inline-block",verticalAlign:"middle"},children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})," Balanced"]}):"⚠ Out of balance"})]}),s.jsxs("p",{className:"bsx-subtitle",children:["As at ",new Date().toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"})]})]}),s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[s.jsx("button",{className:"bsx-nav-pill",onClick:()=>n(m),children:"Assets"}),s.jsx("button",{className:"bsx-nav-pill",onClick:()=>n(r),children:"Liabilities"}),s.jsx("button",{className:"bsx-nav-pill",onClick:()=>n(h),children:"Equity"}),s.jsx("button",{className:"bsx-export-btn",onClick:j,disabled:f,children:f?s.jsxs(s.Fragment,{children:[s.jsx("span",{className:"bsx-spin",children:s.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})})," Exporting…"]}):s.jsxs(s.Fragment,{children:[s.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"})})," Export PDF"]})})]})]}),s.jsxs("div",{className:"bsx-cards",style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:18},children:[s.jsx(v,{label:"What we own",value:t.totalAssets,prev:b.totalAssets,accent:"#4f46e5",onClick:()=>n(m)}),s.jsx(v,{label:"What we owe",value:t.totalLiabilities,prev:b.totalLiabilities,accent:"#d97706",onClick:()=>n(r)}),s.jsx(v,{label:"Net worth",value:t.totalEquity,prev:b.totalEquity,accent:"#059669",onClick:()=>n(h)})]}),s.jsxs("div",{className:"bsx-eq-bar",children:[s.jsx("span",{className:"bsx-eq-label",children:"Formula"}),s.jsx("span",{className:"bsx-eq-num",style:{color:"#4f46e5"},children:o(t.totalAssets)}),s.jsx("span",{className:"bsx-eq-sep",children:"="}),s.jsx("span",{className:"bsx-eq-num",style:{color:"#d97706"},children:o(t.totalLiabilities)}),s.jsx("span",{className:"bsx-eq-sep",children:"+"}),s.jsx("span",{className:"bsx-eq-num",style:{color:"#059669"},children:o(t.totalEquity)}),s.jsx("span",{className:"bsx-eq-status",style:{color:g?"#059669":"#dc2626"},children:g?"✓ Assets = Liabilities + Equity":"✗ Does not balance"})]}),s.jsxs("div",{ref:p,className:"bsx-report-panel",children:[s.jsxs("div",{className:"bsx-report-head",children:[s.jsx("img",{src:"/logo.png",alt:"logo",style:{width:44,height:44,objectFit:"contain",borderRadius:8,border:"1px solid #e2e8f0"},onError:a=>{a.currentTarget.style.display="none"}}),s.jsxs("div",{style:{textAlign:"center"},children:[s.jsx("p",{className:"bsx-company-name",children:"Al Rehman Rice Mills"}),s.jsxs("p",{className:"bsx-report-date",children:["Balance Sheet · ",new Date().toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"})]})]})]}),s.jsxs("div",{className:"bsx-two-col",children:[s.jsx("div",{className:"bsx-col-left",children:s.jsx(N,{ref:m,title:"Assets",rows:t.assets,total:t.totalAssets,prevTotal:b.totalAssets,accent:"#4f46e5",bg:"#f5f5ff",border:"#e0e7ff"})}),s.jsxs("div",{children:[s.jsx(N,{ref:r,title:"Liabilities",rows:t.liabilities,total:t.totalLiabilities,prevTotal:b.totalLiabilities,accent:"#d97706",bg:"#fffbeb",border:"#fde68a"}),s.jsx("div",{style:{borderTop:"2px solid #f1f5f9"},children:s.jsx(N,{ref:h,title:"Equity",rows:t.equity,total:t.totalEquity,prevTotal:b.totalEquity,accent:"#059669",bg:"#f0fdf4",border:"#bbf7d0"})})]})]}),s.jsxs("div",{className:"bsx-totals-bar",children:[s.jsxs("div",{className:"bsx-total-cell",children:[s.jsx("p",{className:"bsx-total-cell-lbl",children:"Total Assets"}),s.jsx("p",{className:"bsx-total-cell-val",style:{color:"#4f46e5"},children:o(t.totalAssets)})]}),s.jsxs("div",{className:"bsx-total-cell",children:[s.jsx("p",{className:"bsx-total-cell-lbl",children:"Total Liabilities"}),s.jsx("p",{className:"bsx-total-cell-val",style:{color:"#d97706"},children:o(t.totalLiabilities)})]}),s.jsxs("div",{className:"bsx-total-cell",children:[s.jsx("p",{className:"bsx-total-cell-lbl",children:"Net Worth (Equity)"}),s.jsx("p",{className:"bsx-total-cell-val",style:{color:"#059669"},children:o(t.totalEquity)})]})]})]})]})]})}export{I as default};
