import{a as v,A as N,j as t,S as m}from"./index-hwQOHyIG.js";import{b as d,R as D}from"./react-CVH9iSHU.js";import{h as S,E as M}from"./html2canvas.esm-CBfjJsA2.js";const g=`
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
`,u=`
  .tbx-wrap *, .tbx-wrap *::before, .tbx-wrap *::after { box-sizing: border-box; }

  .tbx-wrap {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
    width: 100%;
    max-width: 1000px;
  }

  /* eyebrow + title */
  .tbx-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: .12em;
    text-transform: uppercase; color: #9ca3af; margin-bottom: 6px;
  }
  .tbx-title {
    font-family: 'Lora', serif; font-size: 26px; font-weight: 700;
    color: #0f172a; letter-spacing: -.3px; line-height: 1.15;
  }
  .tbx-subtitle { font-size: 13px; color: #94a3b8; margin-top: 5px; }

  /* balanced badge */
  .tbx-badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0;
    margin-left: 10px; vertical-align: middle;
  }
  .tbx-badge-warn { background: #fff7ed; color: #c2410c; border-color: #fed7aa; }

  /* export button */
  .tbx-export-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px; border-radius: 10px; border: none; cursor: pointer;
    background: #0f172a; color: #fff; font-size: 13px; font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    box-shadow: 0 2px 8px rgba(15,23,42,.18);
    transition: background .15s, box-shadow .15s; white-space: nowrap;
  }
  .tbx-export-btn:hover:not(:disabled) { background: #1e293b; box-shadow: 0 4px 14px rgba(15,23,42,.26); }
  .tbx-export-btn:disabled { opacity: .5; cursor: not-allowed; }

  /* summary cards */
  .tbx-card {
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px;
    padding: 18px 20px; position: relative; overflow: hidden;
  }
  .tbx-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 4px; border-radius: 14px 0 0 14px; background: var(--tbx-accent, #6366f1);
  }
  .tbx-card-lbl {
    font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
    color: #94a3b8; margin-bottom: 8px;
  }
  .tbx-card-val {
    font-family: 'DM Mono', monospace; font-size: 22px; font-weight: 500;
    color: #0f172a; letter-spacing: -.4px; line-height: 1;
  }
  .tbx-card-sub { font-size: 12px; color: #94a3b8; margin-top: 7px; }

  /* balanced chip on totals */
  .tbx-match-chip {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 10px 20px; border-radius: 12px; font-size: 12.5px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; white-space: nowrap;
  }
  .tbx-match-chip-ok   { background: #f0fdf4; color: #059669; border: 1.5px solid #bbf7d0; }
  .tbx-match-chip-warn { background: #fef9c3; color: #854d0e; border: 1.5px solid #fde68a; }

  /* report panel */
  .tbx-report-panel {
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 16px;
    overflow: hidden; box-shadow: 0 1px 6px rgba(0,0,0,.05);
  }
  .tbx-report-head {
    display: flex; align-items: center; justify-content: center; gap: 14px;
    padding: 20px 24px; border-bottom: 1.5px solid #f1f5f9;
    background: linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%);
  }
  .tbx-company-name { font-family: 'Lora', serif; font-size: 16px; font-weight: 600; color: #0f172a; }
  .tbx-report-date  { font-size: 11.5px; color: #94a3b8; margin-top: 2px; }

  /* table */
  .tbx-table { width: 100%; border-collapse: collapse; }

  .tbx-table thead tr { background: #1e293b; }
  .tbx-table thead th {
    padding: 11px 18px; font-size: 11px; font-weight: 700; letter-spacing: .07em;
    text-transform: uppercase; color: rgba(255,255,255,.7);
    font-family: 'DM Sans', sans-serif; border: none; white-space: nowrap;
  }
  .tbx-table thead th:first-child { border-radius: 0; text-align: left; }
  .tbx-table thead th.tbx-th-num  { text-align: right; width: 140px; }

  /* group header row */
  .tbx-group-row td {
    padding: 9px 18px; font-size: 10.5px; font-weight: 800; letter-spacing: .1em;
    text-transform: uppercase; color: #64748b; background: #f8fafc;
    border-bottom: 1px solid #f1f5f9; border-top: 2px solid #f1f5f9;
  }

  /* account rows */
  .tbx-row { border-bottom: 1px solid #f8fafc; transition: background .08s; }
  .tbx-row:hover { background: #fafafa; }
  .tbx-row td { padding: 10px 18px; font-size: 13px; color: #334155; }
  .tbx-row td.tbx-td-num {
    text-align: right; font-family: 'DM Mono', monospace;
    font-size: 12.5px; color: #0f172a; font-weight: 500; white-space: nowrap;
  }
  .tbx-row td.tbx-td-num-empty { text-align: right; color: #e5e7eb; }

  /* group subtotal row */
  .tbx-subtotal-row td {
    padding: 9px 18px; background: #f5f5ff; border-top: 1.5px solid #e0e7ff;
    border-bottom: 1.5px solid #e0e7ff;
  }
  .tbx-subtotal-row td:first-child {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .06em; color: #6366f1;
  }
  .tbx-subtotal-row td.tbx-td-num {
    font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 600;
    color: #4f46e5; text-align: right;
  }

  /* grand total footer */
  .tbx-grand-row td {
    padding: 13px 18px; background: #1e293b; border-top: 2px solid #0f172a;
  }
  .tbx-grand-row td:first-child {
    font-size: 11px; font-weight: 800; text-transform: uppercase;
    letter-spacing: .08em; color: rgba(255,255,255,.6);
  }
  .tbx-grand-row td.tbx-td-grand {
    text-align: right; font-family: 'DM Mono', monospace;
    font-size: 14px; font-weight: 600; color: #fff; white-space: nowrap;
  }

  /* skeleton */
  @keyframes tbx-shimmer { to { background-position: -200% 0; } }
  .tbx-sk {
    background: linear-gradient(90deg,#f1f5f9 25%,#f8fafc 50%,#f1f5f9 75%);
    background-size: 200% 100%; animation: tbx-shimmer 1.4s infinite; border-radius: 8px;
  }
  @keyframes tbx-rotate { to { transform: rotate(360deg); } }
  .tbx-spin { animation: tbx-rotate 1s linear infinite; display: inline-block; }

  /* responsive */
  @media (max-width: 580px) {
    .tbx-cards { grid-template-columns: 1fr !important; }
  }
`,o=a=>Number(a||0).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0}),c=a=>"Rs "+o(a);function z(){return t.jsxs(m,{children:[t.jsxs("style",{children:[g,u]}),t.jsxs("div",{className:"tbx-wrap",children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:26,alignItems:"flex-end",flexWrap:"wrap",gap:12},children:[t.jsxs("div",{children:[t.jsx("div",{className:"tbx-sk",style:{width:90,height:10,marginBottom:10}}),t.jsx("div",{className:"tbx-sk",style:{width:200,height:28}})]}),t.jsx("div",{className:"tbx-sk",style:{width:130,height:38,borderRadius:10}})]}),t.jsx("div",{className:"tbx-cards",style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:20},children:[0,1,2].map(a=>t.jsxs("div",{style:{background:"#fff",border:"1.5px solid #e2e8f0",borderRadius:14,padding:"18px 20px"},children:[t.jsx("div",{className:"tbx-sk",style:{width:"50%",height:10,marginBottom:11}}),t.jsx("div",{className:"tbx-sk",style:{width:"70%",height:22,marginBottom:10}}),t.jsx("div",{className:"tbx-sk",style:{width:"60%",height:9}})]},a))}),t.jsxs("div",{className:"tbx-report-panel",children:[t.jsxs("div",{style:{padding:"20px 24px",background:"#f8fafc",borderBottom:"1.5px solid #f1f5f9",display:"flex",justifyContent:"center",gap:14,alignItems:"center"},children:[t.jsx("div",{className:"tbx-sk",style:{width:44,height:44,borderRadius:8}}),t.jsxs("div",{children:[t.jsx("div",{className:"tbx-sk",style:{width:150,height:14,marginBottom:7}}),t.jsx("div",{className:"tbx-sk",style:{width:110,height:11}})]})]}),t.jsxs("div",{style:{padding:"0"},children:[t.jsx("div",{style:{height:42,background:"#1e293b"}}),[0,1,2,3,4,5,6].map(a=>t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"10px 18px",borderBottom:"1px solid #f8fafc"},children:[t.jsx("div",{className:"tbx-sk",style:{width:a%4===0?"30%":"50%",height:a%4===0?10:13}}),t.jsxs("div",{style:{display:"flex",gap:40},children:[t.jsx("div",{className:"tbx-sk",style:{width:80,height:13}}),t.jsx("div",{className:"tbx-sk",style:{width:80,height:13}})]})]},a))]})]})]})]})}function R(){const[a,w]=d.useState(null),[j,y]=d.useState(!0),[f,h]=d.useState(!1),x=d.useRef(null);d.useEffect(()=>{(async()=>{try{const e=await v(`${N}/trial-balance`),r=await e.json();if(!e.ok)throw new Error(r?.message||"Failed");w(r)}catch(e){console.error(e)}finally{y(!1)}})()},[]);const k=async()=>{if(x.current){h(!0);try{const e=await S(x.current,{scale:2,backgroundColor:"#ffffff"}),r=e.toDataURL("image/png"),i=new M("portrait","mm","a4"),s=i.internal.pageSize.getWidth(),n=i.internal.pageSize.getHeight(),b=Math.min(s/e.width,n/e.height)*.95;i.addImage(r,"PNG",(s-e.width*b)/2,10,e.width*b,e.height*b),i.save(`trial-balance-${new Date().toISOString().slice(0,10)}.pdf`)}catch(e){console.error(e)}h(!1)}};if(j)return t.jsx(z,{});if(!a)return null;const l=Math.abs((a.totalDebit||0)-(a.totalCredit||0))<1,p=a.groups?.reduce((e,r)=>e+(r.rows?.length||0),0)||0;return t.jsxs(m,{children:[t.jsxs("style",{children:[g,u]}),t.jsxs("div",{className:"tbx-wrap",children:[t.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:14,marginBottom:26},children:[t.jsxs("div",{children:[t.jsx("p",{className:"tbx-eyebrow",children:"Financial Reports"}),t.jsxs("h1",{className:"tbx-title",children:["Trial Balance",t.jsx("span",{className:`tbx-badge${l?"":" tbx-badge-warn"}`,children:l?t.jsxs(t.Fragment,{children:[t.jsx("svg",{width:10,height:10,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:3,style:{display:"inline-block",verticalAlign:"middle"},children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})," Balanced"]}):"⚠ Out of balance"})]}),t.jsxs("p",{className:"tbx-subtitle",children:["As at ",new Date().toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"})]})]}),t.jsx("button",{className:"tbx-export-btn",onClick:k,disabled:f,children:f?t.jsxs(t.Fragment,{children:[t.jsx("span",{className:"tbx-spin",children:t.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})})," Exporting…"]}):t.jsxs(t.Fragment,{children:[t.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"})})," Export PDF"]})})]}),t.jsxs("div",{className:"tbx-cards",style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:18},children:[t.jsxs("div",{className:"tbx-card",style:{"--tbx-accent":"#4f46e5"},children:[t.jsx("p",{className:"tbx-card-lbl",children:"Total Debit"}),t.jsx("p",{className:"tbx-card-val",children:c(a.totalDebit)}),t.jsx("p",{className:"tbx-card-sub",children:"Sum of all debit balances"})]}),t.jsxs("div",{className:"tbx-card",style:{"--tbx-accent":"#059669"},children:[t.jsx("p",{className:"tbx-card-lbl",children:"Total Credit"}),t.jsx("p",{className:"tbx-card-val",children:c(a.totalCredit)}),t.jsx("p",{className:"tbx-card-sub",children:"Sum of all credit balances"})]}),t.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:t.jsx("div",{className:`tbx-match-chip tbx-match-chip-${l?"ok":"warn"}`,children:l?t.jsxs(t.Fragment,{children:[t.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})}),"Debits = Credits · Books are balanced"]}):t.jsxs(t.Fragment,{children:[t.jsx("svg",{width:15,height:15,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}),"Difference: Rs ",o(Math.abs((a.totalDebit||0)-(a.totalCredit||0)))]})})})]}),t.jsxs("div",{ref:x,className:"tbx-report-panel",children:[t.jsxs("div",{className:"tbx-report-head",children:[t.jsx("img",{src:"/logo.png",alt:"logo",style:{width:44,height:44,objectFit:"contain",borderRadius:8,border:"1px solid #e2e8f0"},onError:e=>{e.currentTarget.style.display="none"}}),t.jsxs("div",{style:{textAlign:"center"},children:[t.jsx("p",{className:"tbx-company-name",children:"Al Rehman Rice Mills"}),t.jsxs("p",{className:"tbx-report-date",children:["Trial Balance · As at"," ",new Date().toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"})]})]})]}),t.jsxs("table",{className:"tbx-table",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{style:{textAlign:"left",paddingLeft:18},children:"Account"}),t.jsx("th",{className:"tbx-th-num",children:"Debit"}),t.jsx("th",{className:"tbx-th-num",children:"Credit"})]})}),t.jsxs("tbody",{children:[a.groups?.map(e=>{const r=e.rows?.reduce((s,n)=>s+(Number(n.debit)||0),0)||0,i=e.rows?.reduce((s,n)=>s+(Number(n.credit)||0),0)||0;return t.jsxs(D.Fragment,{children:[t.jsx("tr",{className:"tbx-group-row",children:t.jsx("td",{colSpan:3,children:e.type})}),e.rows?.map(s=>t.jsxs("tr",{className:"tbx-row",children:[t.jsx("td",{style:{paddingLeft:28},children:s.name}),t.jsx("td",{className:s.debit?"tbx-td-num":"tbx-td-num tbx-td-num-empty",children:s.debit?o(s.debit):"—"}),t.jsx("td",{className:s.credit?"tbx-td-num":"tbx-td-num tbx-td-num-empty",children:s.credit?o(s.credit):"—"})]},s.id)),e.rows?.length>0&&t.jsxs("tr",{className:"tbx-subtotal-row",children:[t.jsxs("td",{style:{paddingLeft:28},children:["Subtotal — ",e.type]}),t.jsx("td",{className:"tbx-td-num",children:r>0?o(r):"—"}),t.jsx("td",{className:"tbx-td-num",children:i>0?o(i):"—"})]})]},e.type)}),t.jsxs("tr",{className:"tbx-grand-row",children:[t.jsxs("td",{children:["Grand Total  ·  ",p," accounts"]}),t.jsx("td",{className:"tbx-td-grand",children:c(a.totalDebit)}),t.jsx("td",{className:"tbx-td-grand",children:c(a.totalCredit)})]})]})]})]}),t.jsxs("p",{style:{textAlign:"center",color:"#94a3b8",fontSize:12,marginTop:14,fontFamily:"'DM Mono',monospace"},children:[p," account",p!==1?"s":""," across ",a.groups?.length||0," categories"]})]})]})}export{R as default};
