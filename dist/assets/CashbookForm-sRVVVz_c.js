import{a as c,j as e}from"./vendor-react-BFXNeceC.js";import{a as I,A as z,S as E,N as H}from"./index-CaKzjFRj.js";import"./vendor-react-dom-DDWplefk.js";import"./vendor-DDAwBBib.js";const F="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",P=`
  *, *::before, *::after { box-sizing: border-box; }
  .cb { font-family: 'DM Sans', sans-serif; color: #111827; }
  .cb-mono { font-family: 'DM Mono', monospace; }

  .cb-inp {
    width: 100%; padding: 7px 10px;
    border: 1px solid #d1d5db; border-radius: 6px;
    font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s;
  }
  .cb-inp::placeholder { color: #9ca3af; }
  .cb-inp:focus {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .cb-inp.mono { font-family: 'DM Mono', monospace; }

  /* account dropdown */
  .cb-sd-btn {
    width: 100%; padding: 7px 10px;
    border: 1px solid #d1d5db; border-radius: 6px;
    background: #fff; font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #9ca3af; cursor: pointer; outline: none;
    display: flex; align-items: center; justify-content: space-between; gap: 6px;
    transition: border-color .12s, box-shadow .12s;
  }
  .cb-sd-btn.sel { color: #111827; }
  .cb-sd-btn:focus, .cb-sd-btn.open {
    border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .cb-sd-panel {
    position: absolute; left: 0; top: calc(100% + 3px); z-index: 300;
    width: max(100%, 240px); background: #fff;
    border: 1px solid #d1d5db; border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,.1); overflow: hidden;
  }
  .cb-sd-item {
    padding: 7px 11px; font-size: 13px; cursor: pointer;
    border-bottom: 1px solid #f9fafb; color: #111827;
    transition: background .08s;
  }
  .cb-sd-item:hover { background: #f3f4f6; }
  .cb-sd-item.sel { background: #f3f4f6; font-weight: 600; }

  /* stat cards */
  .cb-stat {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; padding: 14px 16px;
    position: relative; overflow: hidden;
  }
  .cb-stat::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 3px;
  }
  .cb-stat.s-open::before  { background: #d1d5db; }
  .cb-stat.s-curr::before  { background: #1f2937; }
  .cb-stat.s-after::before { background: #15803d; }
  .cb-stat.s-neg::before   { background: #dc2626; }

  /* entry row */
  .cb-row {
    display: grid;
    grid-template-columns: 120px 1fr 1fr 120px 32px;
    gap: 8px; padding: 10px; border-radius: 7px;
    border: 1px solid #e5e7eb; background: #fff;
    align-items: start;
  }
  .cb-row.in  { background: #f0fdf4; border-color: #bbf7d0; }
  .cb-row.out { background: #fef2f2; border-color: #fecaca; }

  /* mode toggle */
  .cb-mode {
    display: flex; border-radius: 6px; overflow: hidden;
    border: 1px solid #e5e7eb; background: #fff; height: 34px;
  }
  .cb-mode-btn {
    flex: 1; display: flex; align-items: center; justify-content: center;
    gap: 4px; font-size: 11.5px; font-weight: 600; cursor: pointer;
    border: none; background: transparent; font-family: 'DM Sans', sans-serif;
    color: #9ca3af; transition: all .1s;
  }
  .cb-mode-btn.in-on  { background: #15803d; color: #fff; }
  .cb-mode-btn.out-on { background: #dc2626; color: #fff; }

  /* add row btn */
  .cb-add-row {
    width: 100%; padding: 8px 0;
    border: 1px dashed #d1d5db; border-radius: 7px;
    background: transparent; color: #6b7280;
    font-size: 12.5px; font-weight: 500;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    transition: background .1s, border-color .1s;
  }
  .cb-add-row:hover { background: #f9fafb; border-color: #9ca3af; }

  /* save btn */
  .cb-save {
    padding: 9px 22px; border-radius: 7px; border: none;
    background: #111827; color: #fff; font-size: 13px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    display: inline-flex; align-items: center; gap: 7px;
    transition: background .12s;
  }
  .cb-save:hover:not(:disabled) { background: #1f2937; }
  .cb-save:disabled { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; }

  @keyframes cb-spin { to { transform: rotate(360deg); } }
  .cb-spin { display: inline-block; animation: cb-spin .8s linear infinite; }
`;function K({accounts:p,value:x,onChange:v}){const[l,m]=c.useState(!1),[S,f]=c.useState(""),u=c.useRef(null),y=c.useRef(null),b=p.filter(r=>r.accountName.toLowerCase().includes(S.toLowerCase()));return c.useEffect(()=>{l&&u.current&&setTimeout(()=>u.current?.focus(),0)},[l]),c.useEffect(()=>{const r=d=>{y.current&&!y.current.contains(d.target)&&(m(!1),f(""))};return document.addEventListener("mousedown",r),()=>document.removeEventListener("mousedown",r)},[]),e.jsxs("div",{style:{position:"relative"},ref:y,children:[e.jsxs("button",{type:"button",onClick:()=>m(r=>!r),className:`cb-sd-btn${x?" sel":""}${l?" open":""}`,children:[e.jsx("span",{style:{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textAlign:"left"},children:x||"Select account…"}),e.jsx("svg",{width:10,height:10,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2.5,style:{flexShrink:0,transform:l?"rotate(180deg)":"none",transition:".15s"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),l&&e.jsxs("div",{className:"cb-sd-panel",children:[e.jsx("div",{style:{padding:6,borderBottom:"1px solid #f3f4f6",background:"#f9fafb"},children:e.jsx("input",{ref:u,type:"text",value:S,onChange:r=>f(r.target.value),placeholder:"Search accounts…",style:{width:"100%",padding:"6px 9px",border:"1px solid #e5e7eb",borderRadius:5,fontSize:12.5,outline:"none",fontFamily:"'DM Sans',sans-serif"}})}),e.jsx("ul",{style:{maxHeight:200,overflowY:"auto",margin:0,padding:0,listStyle:"none"},children:b.length===0?e.jsx("li",{style:{padding:"8px 11px",fontSize:12.5,color:"#9ca3af",textAlign:"center"},children:"No results"}):b.map(r=>e.jsx("li",{className:`cb-sd-item${x===r.accountName?" sel":""}`,onClick:()=>{v(r.accountName),m(!1),f("")},children:r.accountName},r._id))})]})]})}const R=()=>({account:"",description:"",amount:"",mode:"debit"}),L=p=>Number(p||0).toLocaleString("en-PK");function Z(){const[p,x]=c.useState([]),[v,l]=c.useState(null),[m,S]=c.useState(0),[f,u]=c.useState(0),[y,b]=c.useState(localStorage.getItem("cashAccountId")||""),[r,d]=c.useState({message:"",type:"info"}),[W,w]=c.useState(!1),[M,O]=c.useState(new Date().toISOString().slice(0,10)),[a,C]=c.useState([R()]),[D,$]=c.useState("");c.useEffect(()=>{_(),q()},[]);const _=async()=>{try{const t=await I(`${z}/accounts`),o=await t.json();if(!t.ok)throw new Error(o.message||"Failed to fetch accounts");x(Array.isArray(o)?o.filter(n=>!n.isProtected):[])}catch(t){d({message:t.message,type:"error"})}},q=async()=>{try{const t=await I(`${z}/cashbook-report`),o=await t.json();if(!t.ok)throw new Error(o.message||"Failed to load cashbook");const n=new Date().getFullYear(),s=o.cashbooks?.find(i=>i.year===n);s?(S(s.openingBalance),u(o.currentBalance??s.openingBalance),o.cashAccountId&&(localStorage.setItem("cashAccountId",o.cashAccountId),b(o.cashAccountId)),l(!1)):(o.cashAccountId&&(localStorage.setItem("cashAccountId",o.cashAccountId),b(o.cashAccountId)),l(!0))}catch(t){d({message:t.message,type:"error"}),l(!0)}},j=(t,o,n)=>C(s=>s.map((i,h)=>h===t?{...i,[o]:n}:i)),G=t=>{a.length!==1&&C(o=>o.filter((n,s)=>s!==t))},T=a.reduce((t,o)=>{const n=Number(o.amount)||0;return o.mode==="debit"?t+n:t-n},f),k=T-f,A=a.some(t=>Number(t.amount)>0),Y=async()=>{for(let s=0;s<a.length;s++){const i=a[s];if(!i.account){d({message:`Entry ${s+1}: Select a counter account.`,type:"error"});return}if(!Number(i.amount)||Number(i.amount)<=0){d({message:`Entry ${s+1}: Enter a valid amount.`,type:"error"});return}}let t=y||localStorage.getItem("cashAccountId")||"";if(!t)try{const i=await(await I(`${z}/cashbook-report`)).json();i.cashAccountId&&(t=i.cashAccountId,b(i.cashAccountId),localStorage.setItem("cashAccountId",i.cashAccountId))}catch{}if(!t){d({message:"CASH IN HAND account not found. Please reload.",type:"error"});return}w(!0);let o=0,n=f;for(const s of a){const i=p.find(g=>g.accountName===s.account);if(!i)continue;const h=Number(s.amount),J=s.mode==="debit"?{entryDate:M,comments:D,debitAccount:t,debitAmount:h,debitLineDesc:s.description||"Cash Received",creditEntries:[{account:i._id,amount:h,description:s.description||"Cash Received"}],cashAccountId:t}:{entryDate:M,comments:D,debitAccount:i._id,debitAmount:h,debitLineDesc:s.description||"Cash Payment",creditEntries:[{account:t,amount:h,description:s.description||"Cash Payment"}],cashAccountId:t};try{const g=await I(`${z}/create-journal-entry`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(J)}),B=await g.json();if(!g.ok){d({message:`Entry failed: ${B.message}`,type:"error"}),w(!1);return}B.currentBalance!==void 0&&(n=B.currentBalance),o++}catch(g){d({message:g.message,type:"error"}),w(!1);return}}u(n),C([R()]),$(""),d({message:`${o} entr${o===1?"y":"ies"} saved!`,type:"success"}),w(!1)};if(v===null)return e.jsx(E,{children:e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:200,color:"#9ca3af",fontSize:13,gap:10,fontFamily:"'DM Sans',sans-serif"},children:[e.jsx("svg",{style:{animation:"cb-spin .8s linear infinite",display:"inline-block"},width:16,height:16,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})}),e.jsx("style",{children:"@keyframes cb-spin{to{transform:rotate(360deg)}}"}),"Loading cashbook…"]})});if(v)return e.jsxs(E,{children:[e.jsxs("style",{children:[F,P]}),e.jsx("div",{className:"cb",style:{maxWidth:440,margin:"60px auto"},children:e.jsxs("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:10,padding:"28px 28px 24px",boxShadow:"0 4px 16px rgba(0,0,0,.06)"},children:[e.jsx("div",{style:{width:48,height:48,background:"#fefce8",border:"1px solid #fde68a",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:22},children:"📅"}),e.jsx("h1",{style:{fontSize:16,fontWeight:700,color:"#111827",textAlign:"center",margin:"0 0 8px"},children:"No Active Season"}),e.jsxs("p",{style:{fontSize:13,color:"#6b7280",textAlign:"center",lineHeight:1.6,margin:"0 0 18px"},children:["Create and activate a season in Profile → Seasons first.",e.jsx("br",{}),"This sets the opening balance for your CASH IN HAND account."]}),e.jsxs("div",{style:{background:"#f0f9ff",border:"1px solid #bae6fd",borderRadius:7,padding:"12px 14px",fontSize:12.5,color:"#0369a1",lineHeight:1.8,marginBottom:18},children:[e.jsx("p",{style:{fontWeight:600,margin:"0 0 4px"},children:"How to set up:"}),e.jsxs("p",{style:{margin:0},children:["1. Go to ",e.jsx("strong",{children:"Profile → Seasons"}),e.jsx("br",{}),"2. Click ",e.jsx("strong",{children:"+ New Season"}),", set dates + opening balance",e.jsx("br",{}),"3. Click ",e.jsx("strong",{children:"Activate"}),e.jsx("br",{}),"4. Come back here to record entries"]})]}),e.jsx("a",{href:"/profile",style:{display:"block",width:"100%",padding:"9px 0",borderRadius:7,background:"#111827",color:"#fff",fontSize:13,fontWeight:600,textAlign:"center",textDecoration:"none",transition:"background .12s"},children:"Go to Profile → Seasons →"})]})}),e.jsx(H,{message:r.message,type:r.type,onClose:()=>d({message:"",type:"info"})})]});const N={fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af"};return e.jsxs(E,{children:[e.jsxs("style",{children:[F,P]}),e.jsxs("div",{className:"cb",style:{maxWidth:960,margin:"0 auto"},children:[e.jsxs("div",{style:{marginBottom:16},children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"Finance"}),e.jsx("h1",{style:{margin:0,fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px"},children:"Cashbook Entries"})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:16},children:[e.jsxs("div",{className:"cb-stat s-open",children:[e.jsx("p",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",margin:"0 0 5px"},children:"Opening Balance"}),e.jsxs("p",{className:"cb-mono",style:{fontSize:18,fontWeight:700,color:"#374151",margin:0},children:["Rs ",L(m)]})]}),e.jsxs("div",{className:"cb-stat s-curr",children:[e.jsx("p",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",margin:"0 0 5px"},children:"Current Balance"}),e.jsxs("p",{className:"cb-mono",style:{fontSize:18,fontWeight:700,color:"#111827",margin:0},children:["Rs ",L(f)]})]}),e.jsxs("div",{className:`cb-stat ${A?k>=0?"s-after":"s-neg":"s-open"}`,children:[e.jsx("p",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",margin:"0 0 5px"},children:"After Save"}),e.jsx("p",{className:"cb-mono",style:{fontSize:18,fontWeight:700,color:A?k>=0?"#15803d":"#dc2626":"#9ca3af",margin:0},children:A?`Rs ${L(T)}`:"—"}),A&&e.jsxs("p",{style:{fontSize:11,color:k>=0?"#15803d":"#dc2626",marginTop:3},children:[k>=0?"+":"",L(k)," net change"]})]})]}),e.jsxs("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"12px 16px",borderBottom:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:13.5,fontWeight:700,color:"#111827",margin:0},children:"Record Entries"}),e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"2px 0 0"},children:"Each line saves as an individual journal entry"})]}),e.jsx("input",{type:"date",value:M,onChange:t=>O(t.target.value),style:{border:"1px solid #d1d5db",borderRadius:6,padding:"6px 9px",fontSize:12.5,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#111827"}})]}),e.jsxs("div",{style:{padding:"14px 16px",display:"flex",flexDirection:"column",gap:8},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"120px 1fr 1fr 120px 32px",gap:8,padding:"0 2px"},children:[e.jsx("span",{style:N,children:"Type"}),e.jsx("span",{style:N,children:"Counter Account"}),e.jsx("span",{style:N,children:"Description"}),e.jsx("span",{style:N,children:"Amount (Rs)"}),e.jsx("span",{})]}),a.map((t,o)=>e.jsxs("div",{className:`cb-row${t.mode==="debit"?" in":" out"}`,children:[e.jsxs("div",{className:"cb-mode",children:[e.jsxs("button",{type:"button",onClick:()=>j(o,"mode","debit"),className:`cb-mode-btn${t.mode==="debit"?" in-on":""}`,children:[e.jsx("svg",{width:8,height:8,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:3,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 15l7-7 7 7"})}),"Cash In"]}),e.jsxs("button",{type:"button",onClick:()=>j(o,"mode","credit"),className:`cb-mode-btn${t.mode==="credit"?" out-on":""}`,children:[e.jsx("svg",{width:8,height:8,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:3,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})}),"Cash Out"]})]}),e.jsx(K,{accounts:p,value:t.account,onChange:n=>j(o,"account",n)}),e.jsx("input",{type:"text",placeholder:"Description (optional)",value:t.description,onChange:n=>j(o,"description",n.target.value),className:"cb-inp",style:{fontSize:13}}),e.jsx("input",{type:"number",min:"0",placeholder:"0",value:t.amount,onChange:n=>j(o,"amount",n.target.value),style:{width:"100%",padding:"7px 10px",border:`1px solid ${t.mode==="debit"?"#bbf7d0":"#fecaca"}`,borderRadius:6,fontSize:13,fontFamily:"'DM Mono',monospace",fontWeight:600,outline:"none",color:t.mode==="debit"?"#15803d":"#dc2626",background:"#fff",transition:"border-color .12s"}}),e.jsx("button",{type:"button",onClick:()=>G(o),disabled:a.length===1,style:{width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,border:"1px solid #e5e7eb",background:"#fff",color:"#9ca3af",cursor:a.length===1?"not-allowed":"pointer",opacity:a.length===1?.3:1,transition:"all .1s"},onMouseEnter:n=>{a.length>1&&(n.currentTarget.style.background="#fef2f2",n.currentTarget.style.color="#dc2626")},onMouseLeave:n=>{n.currentTarget.style.background="#fff",n.currentTarget.style.color="#9ca3af"},children:e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})})]},o)),e.jsxs("button",{type:"button",onClick:()=>C(t=>[...t,R()]),className:"cb-add-row",children:[e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4v16m8-8H4"})}),"Add Another Entry"]}),e.jsx("input",{type:"text",placeholder:"Remarks / comments (optional, applies to all entries)",value:D,onChange:t=>$(t.target.value),className:"cb-inp",style:{fontSize:13}}),a.some(t=>Number(t.amount)>0)&&e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6},children:a.filter(t=>Number(t.amount)>0).map((t,o)=>e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 9px",borderRadius:4,fontSize:11.5,fontWeight:600,background:t.mode==="debit"?"#f0fdf4":"#fef2f2",color:t.mode==="debit"?"#15803d":"#dc2626",border:`1px solid ${t.mode==="debit"?"#bbf7d0":"#fecaca"}`},children:[t.mode==="debit"?"▲":"▼"," ",t.account||"…"," · Rs ",Number(t.amount).toLocaleString()]},o))})]}),e.jsxs("div",{style:{padding:"11px 16px",borderTop:"1px solid #f3f4f6",background:"#f9fafb",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("p",{style:{fontSize:12.5,color:"#6b7280",margin:0},children:[e.jsx("span",{style:{fontWeight:600,color:"#111827"},children:a.length})," entr",a.length===1?"y":"ies"," — saved individually"]}),e.jsx("button",{type:"button",onClick:Y,disabled:W,className:"cb-save",children:W?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"cb-spin",children:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})})," Saving…"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})," Save ",a.length>1?`${a.length} Entries`:"Entry"]})})]})]}),e.jsx(H,{message:r.message,type:r.type,onClose:()=>d({message:"",type:"info"})})]})]})}export{Z as default};
