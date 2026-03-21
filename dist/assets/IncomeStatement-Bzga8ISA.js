import{a as z,A as S,j as e,S as v}from"./index-C8VCkJyG.js";import{b as a,R}from"./react-BBT0yyZ1.js";import{h as D,E as C}from"./html2canvas.esm-K0GpuJoA.js";const k=`
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
`,N=`
  .isx-wrap *, .isx-wrap *::before, .isx-wrap *::after { box-sizing: border-box; }

  .isx-wrap {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
    width: 100%;
    max-width: 900px;
  }

  /* eyebrow + title */
  .isx-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: .12em;
    text-transform: uppercase; color: #9ca3af; margin-bottom: 6px;
  }
  .isx-title {
    font-family: 'Lora', serif; font-size: 26px; font-weight: 700;
    color: #0f172a; letter-spacing: -.3px; line-height: 1.15;
  }
  .isx-subtitle { font-size: 13px; color: #94a3b8; margin-top: 5px; }

  /* export button */
  .isx-export-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px; border-radius: 10px; border: none; cursor: pointer;
    background: #0f172a; color: #fff; font-size: 13px; font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    box-shadow: 0 2px 8px rgba(15,23,42,.18);
    transition: background .15s, box-shadow .15s; white-space: nowrap;
  }
  .isx-export-btn:hover:not(:disabled) { background: #1e293b; box-shadow: 0 4px 14px rgba(15,23,42,.26); }
  .isx-export-btn:disabled { opacity: .5; cursor: not-allowed; }

  /* nav pills */
  .isx-nav-pill {
    padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600;
    border: 1.5px solid #e2e8f0; background: #fff; color: #64748b;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .12s;
    white-space: nowrap;
  }
  .isx-nav-pill:hover { border-color: #94a3b8; color: #334155; background: #f8fafc; }

  /* summary cards */
  .isx-card {
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px;
    padding: 18px 20px; cursor: pointer; transition: box-shadow .15s, transform .15s;
    width: 100%; text-align: left; position: relative; overflow: hidden;
    display: block;
  }
  .isx-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 4px; border-radius: 14px 0 0 14px; background: var(--isx-accent, #6366f1);
  }
  .isx-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,.07); transform: translateY(-1px); }
  .isx-card-static { cursor: default; }
  .isx-card-static:hover { box-shadow: none; transform: none; }
  .isx-card-lbl {
    font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
    color: #94a3b8; margin-bottom: 8px;
  }
  .isx-card-val {
    font-family: 'DM Mono', monospace; font-size: 20px; font-weight: 500;
    color: #0f172a; letter-spacing: -.4px; line-height: 1;
  }
  .isx-card-desc { font-size: 12px; color: #94a3b8; margin-top: 8px; }

  /* profit/loss chip */
  .isx-net-chip {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 6px; font-size: 11.5px; font-weight: 700;
    margin-top: 8px; font-family: 'DM Sans', sans-serif;
  }
  .isx-net-chip-profit { background: #ecfdf5; color: #059669; }
  .isx-net-chip-loss   { background: #fef2f2; color: #dc2626; }

  /* report panel */
  .isx-report-panel {
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 16px;
    overflow: hidden; box-shadow: 0 1px 6px rgba(0,0,0,.05);
  }
  .isx-report-head {
    display: flex; align-items: center; justify-content: center; gap: 14px;
    padding: 20px 24px; border-bottom: 1.5px solid #f1f5f9;
    background: linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%);
  }
  .isx-company-name { font-family: 'Lora', serif; font-size: 16px; font-weight: 600; color: #0f172a; }
  .isx-report-date  { font-size: 11.5px; color: #94a3b8; margin-top: 2px; }

  /* section head */
  .isx-sec-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 22px; background: var(--isx-bg,#f8fafc);
    border-bottom: 1.5px solid var(--isx-border,#f1f5f9);
  }
  .isx-sec-name {
    display: flex; align-items: center; gap: 7px;
    font-family: 'Lora', serif; font-size: 14px; font-weight: 600;
    color: var(--isx-accent,#6366f1); font-style: italic;
  }
  .isx-sec-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--isx-accent,#6366f1); flex-shrink: 0;
  }
  .isx-sec-count {
    font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
    color: #94a3b8; font-style: normal; margin-left: 3px;
  }
  .isx-sec-total {
    font-family: 'DM Mono', monospace; font-size: 14px; font-weight: 500;
    color: var(--isx-accent,#6366f1);
  }

  /* row */
  .isx-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 22px; border-bottom: 1px solid #f8fafc; transition: background .08s;
  }
  .isx-row:last-of-type { border-bottom: none; }
  .isx-row:hover { background: #f8fafc; }
  .isx-row-name   { font-size: 13px; color: #334155; font-weight: 400; }
  .isx-row-amount {
    font-family: 'DM Mono', monospace; font-size: 12.5px; color: #0f172a;
    font-weight: 500; white-space: nowrap; margin-left: 14px;
  }

  /* section footer */
  .isx-sec-foot {
    display: flex; align-items: center; justify-content: space-between;
    padding: 11px 22px; background: var(--isx-bg,#f8fafc);
    border-top: 2px solid var(--isx-border,#f1f5f9);
  }
  .isx-sec-foot-lbl {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .06em; color: #64748b;
  }
  .isx-sec-foot-val {
    font-family: 'DM Mono', monospace; font-size: 13.5px; font-weight: 500;
    color: var(--isx-accent,#6366f1);
  }

  /* empty */
  .isx-empty-row { padding: 16px 22px; font-size: 13px; color: #cbd5e1; font-style: italic; }

  /* divider */
  .isx-divider { border: none; border-top: 2px solid #f1f5f9; margin: 0; }

  /* net income footer */
  .isx-net-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding: 17px 22px; border-top: 2px solid #f1f5f9;
  }
  .isx-net-footer-profit { background: #f0fdf4; }
  .isx-net-footer-loss   { background: #fef2f2; }
  .isx-net-footer-lbl {
    display: flex; align-items: center; gap: 10px;
  }
  .isx-net-icon {
    width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .isx-net-icon-profit { background: #dcfce7; color: #059669; }
  .isx-net-icon-loss   { background: #fee2e2; color: #dc2626; }
  .isx-net-title {
    font-family: 'Lora', serif; font-size: 15px; font-weight: 600;
  }
  .isx-net-title-profit { color: #059669; }
  .isx-net-title-loss   { color: #dc2626; }
  .isx-net-sub { font-size: 12px; color: #94a3b8; margin-top: 2px; }
  .isx-net-val {
    font-family: 'DM Mono', monospace; font-size: 20px; font-weight: 500;
    letter-spacing: -.5px;
  }
  .isx-net-val-profit { color: #059669; }
  .isx-net-val-loss   { color: #dc2626; }

  /* margin strip */
  .isx-margin-strip {
    display: flex; align-items: center; justify-content: space-between;
    padding: 9px 22px; border-top: 1px solid #f1f5f9; background: #fafcff;
  }
  .isx-margin-txt { font-size: 12px; color: #94a3b8; font-weight: 500; }
  .isx-margin-chip {
    font-size: 11.5px; font-weight: 700; padding: 2px 8px; border-radius: 6px;
  }
  .isx-margin-chip-profit { background: #ecfdf5; color: #059669; }
  .isx-margin-chip-loss   { background: #fef2f2; color: #dc2626; }

  /* skeleton */
  @keyframes isx-shimmer { to { background-position: -200% 0; } }
  .isx-sk {
    background: linear-gradient(90deg,#f1f5f9 25%,#f8fafc 50%,#f1f5f9 75%);
    background-size: 200% 100%; animation: isx-shimmer 1.4s infinite; border-radius: 8px;
  }
  @keyframes isx-rotate { to { transform: rotate(360deg); } }
  .isx-spin { animation: isx-rotate 1s linear infinite; display: inline-block; }

  /* responsive */
  @media (max-width: 600px) {
    .isx-cards { grid-template-columns: 1fr !important; }
  }
`,r=s=>"Rs "+Number(s||0).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0}),y=R.forwardRef(({title:s,rows:n,total:p,accent:b,bg:f,border:m},c)=>e.jsxs("div",{ref:c,style:{"--isx-accent":b,"--isx-bg":f,"--isx-border":m},children:[e.jsxs("div",{className:"isx-sec-head",children:[e.jsxs("div",{className:"isx-sec-name",children:[e.jsx("span",{className:"isx-sec-dot"}),s,e.jsxs("span",{className:"isx-sec-count",children:[n.length," item",n.length!==1?"s":""]})]}),e.jsx("span",{className:"isx-sec-total",children:r(p)})]}),n.length===0?e.jsx("p",{className:"isx-empty-row",children:"No entries in this category"}):n.map((o,d)=>e.jsxs("div",{className:"isx-row",children:[e.jsx("span",{className:"isx-row-name",children:o.name}),e.jsx("span",{className:"isx-row-amount",children:r(Number(o.amount)||0)})]},o.id||d)),e.jsxs("div",{className:"isx-sec-foot",children:[e.jsxs("span",{className:"isx-sec-foot-lbl",children:["Total ",s]}),e.jsx("span",{className:"isx-sec-foot-val",children:r(p)})]})]}));function B(){return e.jsxs(v,{children:[e.jsxs("style",{children:[k,N]}),e.jsxs("div",{className:"isx-wrap",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:26,alignItems:"flex-end",flexWrap:"wrap",gap:12},children:[e.jsxs("div",{children:[e.jsx("div",{className:"isx-sk",style:{width:90,height:10,marginBottom:10}}),e.jsx("div",{className:"isx-sk",style:{width:210,height:28}})]}),e.jsx("div",{className:"isx-sk",style:{width:130,height:38,borderRadius:10}})]}),e.jsx("div",{className:"isx-cards",style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:22},children:[0,1,2].map(s=>e.jsxs("div",{style:{background:"#fff",border:"1.5px solid #e2e8f0",borderRadius:14,padding:"18px 20px"},children:[e.jsx("div",{className:"isx-sk",style:{width:"50%",height:10,marginBottom:11}}),e.jsx("div",{className:"isx-sk",style:{width:"70%",height:22,marginBottom:10}}),e.jsx("div",{className:"isx-sk",style:{width:"80%",height:9}})]},s))}),e.jsxs("div",{className:"isx-report-panel",style:{minHeight:260},children:[e.jsxs("div",{style:{padding:"20px 24px",background:"#f8fafc",borderBottom:"1.5px solid #f1f5f9",display:"flex",justifyContent:"center",gap:14,alignItems:"center"},children:[e.jsx("div",{className:"isx-sk",style:{width:44,height:44,borderRadius:8}}),e.jsxs("div",{children:[e.jsx("div",{className:"isx-sk",style:{width:150,height:14,marginBottom:7}}),e.jsx("div",{className:"isx-sk",style:{width:110,height:11}})]})]}),[0,1].map(s=>e.jsxs("div",{children:[e.jsx("div",{style:{padding:"13px 22px",background:"#f8fafc",borderBottom:"1.5px solid #f1f5f9"},children:e.jsx("div",{className:"isx-sk",style:{width:70,height:12}})}),[0,1,2].map(n=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"10px 22px",borderBottom:"1px solid #f8fafc"},children:[e.jsx("div",{className:"isx-sk",style:{width:"55%",height:13}}),e.jsx("div",{className:"isx-sk",style:{width:"22%",height:13}})]},n))]},s))]})]})]})}function A(){const[s,n]=a.useState(null),[p,b]=a.useState(!0),[f,m]=a.useState(!1),c=a.useRef(null),o=a.useRef(null),d=a.useRef(null);a.useEffect(()=>{(async()=>{try{const i=await z(`${S}/incomestatement`),g=await i.json();if(!i.ok)throw new Error(g?.message||"Failed");n(g)}catch(i){console.error(i)}finally{b(!1)}})()},[]);const h=i=>i.current?.scrollIntoView({behavior:"smooth",block:"start"}),M=async()=>{if(c.current){m(!0);try{const i=await D(c.current,{scale:2,backgroundColor:"#ffffff"}),g=i.toDataURL("image/png"),u=new C("portrait","mm","a4"),w=u.internal.pageSize.getWidth(),L=u.internal.pageSize.getHeight(),j=Math.min(w/i.width,L/i.height)*.95;u.addImage(g,"PNG",(w-i.width*j)/2,10,i.width*j,i.height*j),u.save(`income-statement-${new Date().toISOString().slice(0,10)}.pdf`)}catch(i){console.error(i)}m(!1)}};if(p)return e.jsx(B,{});if(!s)return null;const t=s.netIncome>=0,l=t?"profit":"loss",x=s.totalRevenue>0?(s.netIncome/s.totalRevenue*100).toFixed(1):null;return e.jsxs(v,{children:[e.jsxs("style",{children:[k,N]}),e.jsxs("div",{className:"isx-wrap",children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:14,marginBottom:26},children:[e.jsxs("div",{children:[e.jsx("p",{className:"isx-eyebrow",children:"Financial Reports"}),e.jsx("h1",{className:"isx-title",children:"Income Statement"}),e.jsxs("p",{className:"isx-subtitle",children:["For the period ending ",new Date().toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[e.jsx("button",{className:"isx-nav-pill",onClick:()=>h(o),children:"Revenue"}),e.jsx("button",{className:"isx-nav-pill",onClick:()=>h(d),children:"Expenses"}),e.jsx("button",{className:"isx-export-btn",onClick:M,disabled:f,children:f?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"isx-spin",children:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})})," Exporting…"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"})})," Export PDF"]})})]})]}),e.jsxs("div",{className:"isx-cards",style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:22},children:[e.jsxs("button",{className:"isx-card",style:{"--isx-accent":"#4f46e5"},onClick:()=>h(o),children:[e.jsx("p",{className:"isx-card-lbl",children:"Money earned"}),e.jsx("p",{className:"isx-card-val",children:r(s.totalRevenue)}),e.jsxs("p",{className:"isx-card-desc",children:[s.revenueAccounts?.length||0," revenue account",s.revenueAccounts?.length!==1?"s":""]})]}),e.jsxs("button",{className:"isx-card",style:{"--isx-accent":"#d97706"},onClick:()=>h(d),children:[e.jsx("p",{className:"isx-card-lbl",children:"Money spent"}),e.jsx("p",{className:"isx-card-val",children:r(s.totalExpenses)}),e.jsxs("p",{className:"isx-card-desc",children:[s.expenseAccounts?.length||0," expense account",s.expenseAccounts?.length!==1?"s":""]})]}),e.jsxs("div",{className:"isx-card isx-card-static",style:{"--isx-accent":t?"#059669":"#dc2626"},children:[e.jsx("p",{className:"isx-card-lbl",children:t?"Net profit":"Net loss"}),e.jsx("p",{className:"isx-card-val",style:{color:t?"#059669":"#dc2626"},children:r(Math.abs(s.netIncome))}),e.jsx("span",{className:`isx-net-chip isx-net-chip-${l}`,children:t?e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:10,height:10,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:3,style:{display:"inline-block",verticalAlign:"middle"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})," Profitable period"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:10,height:10,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:3,style:{display:"inline-block",verticalAlign:"middle"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})," Loss period"]})}),x!==null&&e.jsxs("p",{className:"isx-card-desc",style:{marginTop:6},children:[Math.abs(x),"% ",t?"profit":"loss"," margin"]})]})]}),e.jsxs("div",{ref:c,className:"isx-report-panel",children:[e.jsxs("div",{className:"isx-report-head",children:[e.jsx("img",{src:"/logo.png",alt:"logo",style:{width:44,height:44,objectFit:"contain",borderRadius:8,border:"1px solid #e2e8f0"},onError:i=>{i.currentTarget.style.display="none"}}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("p",{className:"isx-company-name",children:"Al Rehman Rice Mills"}),e.jsxs("p",{className:"isx-report-date",children:["Income Statement · For the period ending"," ",new Date().toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"})]})]})]}),e.jsx(y,{ref:o,title:"Revenue",rows:s.revenueAccounts,total:s.totalRevenue,accent:"#4f46e5",bg:"#f5f5ff",border:"#e0e7ff"}),e.jsx("hr",{className:"isx-divider"}),e.jsx(y,{ref:d,title:"Expenses",rows:s.expenseAccounts,total:s.totalExpenses,accent:"#d97706",bg:"#fffbeb",border:"#fde68a"}),e.jsxs("div",{className:`isx-net-footer isx-net-footer-${l}`,children:[e.jsxs("div",{className:"isx-net-footer-lbl",children:[e.jsx("div",{className:`isx-net-icon isx-net-icon-${l}`,children:t?e.jsx("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"})}):e.jsx("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"})})}),e.jsxs("div",{children:[e.jsx("p",{className:`isx-net-title isx-net-title-${l}`,children:t?"Net Profit":"Net Loss"}),e.jsx("p",{className:"isx-net-sub",children:"Revenue minus Expenses"})]})]}),e.jsx("span",{className:`isx-net-val isx-net-val-${l}`,children:r(s.netIncome)})]}),x!==null&&e.jsxs("div",{className:"isx-margin-strip",children:[e.jsxs("span",{className:"isx-margin-txt",children:[t?"Profit":"Loss"," margin — ",Math.abs(x),"% of revenue"]}),e.jsxs("span",{className:`isx-margin-chip isx-margin-chip-${l}`,children:[t?"+":"-",Math.abs(x),"%"]})]})]})]})]})}export{A as default};
