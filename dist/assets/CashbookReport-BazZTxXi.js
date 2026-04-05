import{a as c,j as e}from"./vendor-react-BFXNeceC.js";import{a as R,A as B,S as U}from"./index-DAWI_HCx.js";import"./vendor-react-dom-DDWplefk.js";import"./vendor-DDAwBBib.js";const X="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",G=`
  *, *::before, *::after { box-sizing: border-box; }
  .dcb { font-family: 'DM Sans', sans-serif; color: #111827; }
  .dcb-mono { font-family: 'DM Mono', monospace; }

  /* inputs */
  .dcb-inp, .dcb-sel {
    border: 1px solid #d1d5db; border-radius: 6px;
    padding: 6px 9px; font-size: 12.5px;
    font-family: 'DM Sans', sans-serif; color: #111827;
    background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s; appearance: none;
  }
  .dcb-inp:focus, .dcb-sel:focus {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }

  /* stat cards */
  .dcb-stat {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; padding: 14px 16px;
    position: relative; overflow: hidden;
  }
  .dcb-stat::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; }
  .dcb-stat.s-open::before  { background: #d1d5db; }
  .dcb-stat.s-in::before    { background: #15803d; }
  .dcb-stat.s-out::before   { background: #dc2626; }
  .dcb-stat.s-bal::before   { background: #1f2937; }

  /* table */
  .dcb-table { width: 100%; border-collapse: collapse; }
  .dcb-table thead tr { background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
  .dcb-table thead th {
    padding: 8px 12px; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .07em;
    color: #9ca3af; text-align: left; white-space: nowrap;
  }
  .dcb-table thead th.r { text-align: right; }
  .dcb-table tbody tr { border-bottom: 1px solid #f9fafb; transition: background .08s; }
  .dcb-table tbody tr:hover { background: #fafafa; }
  .dcb-table tbody td { padding: 10px 12px; font-size: 12.5px; color: #374151; vertical-align: middle; }
  .dcb-table tbody td.r { text-align: right; }
  .dcb-table tfoot tr { border-top: 2px solid #e5e7eb; background: #f9fafb; }
  .dcb-table tfoot td { padding: 9px 12px; font-size: 12.5px; }

  /* badge */
  .dcb-badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 2px 8px; border-radius: 4px;
    font-size: 11.5px; font-weight: 600; white-space: nowrap;
  }
  .dcb-badge.in  { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
  .dcb-badge.out { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }

  /* nav btn */
  .dcb-nav {
    width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;
    border-radius: 6px; border: 1px solid #e5e7eb; background: #fff; color: #374151;
    cursor: pointer; font-size: 14px; font-weight: 700; transition: background .1s;
  }
  .dcb-nav:hover:not(:disabled) { background: #f9fafb; }
  .dcb-nav:disabled { opacity: .3; cursor: not-allowed; }

  /* pill btn */
  .dcb-pill {
    padding: 4px 10px; border-radius: 5px; border: 1px solid #e5e7eb;
    background: #fff; color: #374151; font-size: 12px; font-weight: 500;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .1s;
  }
  .dcb-pill:hover { background: #f9fafb; }
  .dcb-pill.active { background: #111827; color: #fff; border-color: #111827; }

  @keyframes dcb-spin { to { transform: rotate(360deg); } }
  .dcb-spin { display: inline-block; animation: dcb-spin .8s linear infinite; }

  /* skeleton */
  @keyframes dcb-shimmer { to { background-position: -200% 0; } }
  .dcb-skel {
    border-radius: 5px; height: 11px;
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    background-size: 200% 100%; animation: dcb-shimmer 1.4s infinite;
  }
`,s=p=>Number(p||0).toLocaleString("en-PK",{minimumFractionDigits:2,maximumFractionDigits:2});function Q({type:p}){return p==="credit"?e.jsx("span",{className:"dcb-badge in",children:"▲ Cash In"}):e.jsx("span",{className:"dcb-badge out",children:"▼ Cash Out"})}function ne(){const[p,u]=c.useState(!0),[O,L]=c.useState(null),[N,y]=c.useState(null),[f,z]=c.useState(new Date().toISOString().slice(0,10)),[l,A]=c.useState(!1),[b,E]=c.useState(""),[x,P]=c.useState(""),[h,D]=c.useState(null),g=new Date().toISOString().slice(0,10),W=f===g,H=t=>{const[a,o,r]=t.split("-").map(Number);return new Date(a,o-1,r).toLocaleDateString("en-PK",{weekday:"long",year:"numeric",month:"long",day:"numeric"})};c.useEffect(()=>{l||M(f)},[f,l]);const M=async t=>{u(!0),y(null);try{const a=t&&t!==g?`?date=${t}`:"",o=await R(`${B}/cashbook-daily${a}`),r=await o.text();let d;try{d=JSON.parse(r)}catch{throw new Error("Invalid server response")}if(!o.ok)throw new Error(d.message||"Failed to fetch daily cashbook");L(d)}catch(a){y(a.message)}finally{u(!1)}},_=async()=>{if(!(!b||!x||b>x)){u(!0),y(null),D(null);try{const t=[];let[a,o,r]=b.split("-").map(Number);const[d,w,K]=x.split("-").map(Number);for(;;){const n=`${a}-${String(o).padStart(2,"0")}-${String(r).padStart(2,"0")}`;if(t.push(n),n===`${d}-${String(w).padStart(2,"0")}-${String(K).padStart(2,"0")}`)break;const i=new Date(a,o-1,r+1);if(a=i.getFullYear(),o=i.getMonth()+1,r=i.getDate(),t.length>366)break}const k=await Promise.all(t.map(async n=>{const i=n!==g?`?date=${n}`:"";return(await R(`${B}/cashbook-daily${i}`)).json()})),C=k.flatMap((n,i)=>(n.entries||[]).map(I=>({...I,date:t[i]}))),Y=C.filter(n=>n.type==="credit").reduce((n,i)=>n+i.amount,0),J=C.filter(n=>n.type==="debit").reduce((n,i)=>n+i.amount,0);D({entries:C,totalCredit:Y,totalDebit:J,openingBalance:k[0]?.openingBalance??0,currentBalance:k[k.length-1]?.currentBalance??0})}catch(t){y(t.message)}finally{u(!1)}}},T=t=>{const[a,o,r]=f.split("-").map(Number),d=new Date(a,o-1,r+t),w=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;w<=g&&z(w)},q=l&&h?h:O||{},{openingBalance:$=0,currentBalance:F=0,totalDebit:j=0,totalCredit:S=0,entries:m=[]}=q,v=S-j;return e.jsxs(U,{children:[e.jsxs("style",{children:[X,G]}),e.jsxs("div",{className:"dcb",style:{maxWidth:980,margin:"0 auto"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:18},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"Finance"}),e.jsx("h1",{style:{margin:0,fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px"},children:"Daily Cashbook"}),e.jsx("p",{style:{fontSize:12,color:"#9ca3af",marginTop:3},children:l&&h?`${b} → ${x}`:H(f)})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap"},children:[e.jsx("button",{className:"dcb-nav",onClick:()=>T(-1),title:"Previous day",children:"‹"}),e.jsx("input",{type:"date",value:f,max:g,onChange:t=>z(t.target.value),className:"dcb-inp"}),e.jsx("button",{className:"dcb-nav",onClick:()=>T(1),disabled:W,title:"Next day",children:"›"}),!W&&e.jsx("button",{className:"dcb-pill",onClick:()=>z(g),children:"Today"}),e.jsxs("button",{className:"dcb-pill",onClick:()=>M(f),style:{display:"flex",alignItems:"center",gap:5},children:[e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})}),"Refresh"]})]})]}),e.jsxs("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:"10px 14px",marginBottom:14,display:"flex",flexWrap:"wrap",gap:10,alignItems:"center"},children:[e.jsx("button",{className:`dcb-pill${l?" active":""}`,onClick:()=>{A(t=>!t),D(null)},children:"Date Range"}),l&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx("label",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#6b7280"},children:"From"}),e.jsx("input",{type:"date",value:b,onChange:t=>E(t.target.value),className:"dcb-inp"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx("label",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#6b7280"},children:"To"}),e.jsx("input",{type:"date",value:x,onChange:t=>P(t.target.value),className:"dcb-inp"})]}),e.jsx("button",{onClick:_,style:{padding:"6px 14px",borderRadius:6,border:"none",background:"#111827",color:"#fff",fontSize:12.5,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"},children:"Load Range"})]})]}),p&&e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:180,color:"#9ca3af",fontSize:13,gap:9},children:[e.jsx("span",{className:"dcb-spin",children:e.jsx("svg",{width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})}),"Loading cashbook…"]}),!p&&N&&e.jsx("div",{style:{textAlign:"center",padding:"40px 0",color:"#dc2626",fontSize:13},children:N}),!p&&!N&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14},children:[e.jsxs("div",{className:"dcb-stat s-open",children:[e.jsx("p",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",margin:"0 0 5px"},children:"Opening Balance"}),e.jsx("p",{className:"dcb-mono",style:{fontSize:18,fontWeight:700,color:"#374151",margin:0},children:s($)})]}),e.jsxs("div",{className:"dcb-stat s-in",children:[e.jsx("p",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",margin:"0 0 5px"},children:"Cash In ▲"}),e.jsxs("p",{className:"dcb-mono",style:{fontSize:18,fontWeight:700,color:"#15803d",margin:0},children:["+ ",s(S)]})]}),e.jsxs("div",{className:"dcb-stat s-out",children:[e.jsx("p",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",margin:"0 0 5px"},children:"Cash Out ▼"}),e.jsxs("p",{className:"dcb-mono",style:{fontSize:18,fontWeight:700,color:"#dc2626",margin:0},children:["− ",s(j)]})]}),e.jsxs("div",{className:"dcb-stat s-bal",children:[e.jsx("p",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",margin:"0 0 5px"},children:"Current Balance"}),e.jsx("p",{className:"dcb-mono",style:{fontSize:18,fontWeight:700,color:"#111827",margin:0},children:s(F)}),v!==0&&e.jsxs("p",{style:{fontSize:11,color:v>=0?"#15803d":"#dc2626",margin:"3px 0 0"},children:[v>=0?"▲":"▼"," ",s(Math.abs(v))," net"]})]})]}),e.jsxs("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"11px 14px",borderBottom:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsx("p",{style:{fontSize:13,fontWeight:600,color:"#111827",margin:0},children:l&&h?`Range: ${b} → ${x}`:"Today's Transactions"}),e.jsxs("span",{style:{fontSize:11.5,color:"#9ca3af",background:"#f3f4f6",borderRadius:4,padding:"2px 8px",fontFamily:"'DM Mono',monospace"},children:[m.length," entr",m.length===1?"y":"ies"]})]}),m.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"56px 0"},children:[e.jsx("div",{style:{fontSize:32,marginBottom:10},children:"📋"}),e.jsx("p",{style:{fontSize:13,fontWeight:600,color:"#374151",margin:"0 0 4px"},children:"No entries for today"}),e.jsx("p",{style:{fontSize:12,color:"#9ca3af"},children:"Cash transactions recorded today will appear here."})]}):e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{className:"dcb-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:32},children:"#"}),e.jsx("th",{children:"Time"}),l&&h&&e.jsx("th",{children:"Date"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Account(s)"}),e.jsx("th",{children:"Description"}),e.jsx("th",{className:"r",style:{color:"#15803d"},children:"Cash In ▲"}),e.jsx("th",{className:"r",style:{color:"#dc2626"},children:"Cash Out ▼"}),e.jsx("th",{children:"Remarks"})]})}),e.jsx("tbody",{children:m.map((t,a)=>e.jsxs("tr",{children:[e.jsx("td",{style:{color:"#d1d5db",fontSize:11,fontFamily:"'DM Mono',monospace"},children:String(a+1).padStart(2,"0")}),e.jsx("td",{style:{fontSize:12,color:"#6b7280",fontFamily:"'DM Mono',monospace",whiteSpace:"nowrap"},children:t.time||"—"}),l&&h&&e.jsx("td",{style:{fontSize:12,color:"#6b7280",fontFamily:"'DM Mono',monospace",whiteSpace:"nowrap"},children:t.date||"—"}),e.jsx("td",{children:e.jsx(Q,{type:t.type})}),e.jsx("td",{style:{maxWidth:180},children:e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:2},children:t.accounts?.map((o,r)=>e.jsx("span",{style:{fontSize:12.5,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:o},r))})}),e.jsx("td",{style:{fontSize:12.5,color:"#6b7280",maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:t.description||"—"}),e.jsx("td",{className:"r",children:t.type==="credit"?e.jsx("span",{className:"dcb-mono",style:{fontWeight:600,color:"#15803d"},children:s(t.amount)}):e.jsx("span",{style:{color:"#d1d5db"},children:"—"})}),e.jsx("td",{className:"r",children:t.type==="debit"?e.jsx("span",{className:"dcb-mono",style:{fontWeight:600,color:"#dc2626"},children:s(t.amount)}):e.jsx("span",{style:{color:"#d1d5db"},children:"—"})}),e.jsx("td",{style:{fontSize:12,color:"#9ca3af",maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:t.comments||"—"})]},t._id||a))}),e.jsx("tfoot",{children:e.jsxs("tr",{children:[e.jsx("td",{colSpan:l&&h?6:5,style:{fontSize:10.5,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:".07em"},children:"Totals"}),e.jsx("td",{className:"r",children:e.jsx("span",{className:"dcb-mono",style:{fontWeight:700,color:"#15803d",fontSize:13},children:s(S)})}),e.jsx("td",{className:"r",children:e.jsx("span",{className:"dcb-mono",style:{fontWeight:700,color:"#dc2626",fontSize:13},children:s(j)})}),e.jsx("td",{})]})})]})})]}),m.length>0&&e.jsx("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:"11px 14px",marginTop:10},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8,fontSize:12.5},children:[e.jsxs("span",{style:{color:"#6b7280"},children:["Opening"," ",e.jsx("span",{className:"dcb-mono",style:{fontWeight:600,color:"#374151"},children:s($)})," ","+ Cash In"," ",e.jsx("span",{className:"dcb-mono",style:{fontWeight:600,color:"#15803d"},children:s(S)})," ","− Cash Out"," ",e.jsx("span",{className:"dcb-mono",style:{fontWeight:600,color:"#dc2626"},children:s(j)})]}),e.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontWeight:700,color:"#111827",fontSize:14},children:["= ",s(F)]})]})})]})]})]})}export{ne as default};
