import{b as D,a as d,j as e,R as F}from"./vendor-react-BFXNeceC.js";import{S as E,N as R,a as v,A as j}from"./index-DbDPqrWm.js";import{C as P}from"./ChequeTopNav-BwrjA0ks.js";import"./vendor-react-dom-DDWplefk.js";import"./vendor-DDAwBBib.js";const _="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",$=`
  *, *::before, *::after { box-sizing: border-box; }
  .vcb { font-family: 'DM Sans', sans-serif; color: #111827; }

  /* inputs */
  .vcb-inp, .vcb-sel {
    border: 1px solid #d1d5db; border-radius: 6px;
    padding: 7px 10px; font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s; appearance: none;
  }
  .vcb-inp:focus, .vcb-sel:focus { border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12); }
  .vcb-inp::placeholder { color: #9ca3af; }

  /* search box */
  .vcb-search {
    display: flex; align-items: center; gap: 7px;
    background: #fff; border: 1px solid #d1d5db;
    border-radius: 6px; padding: 0 10px;
    transition: border-color .12s, box-shadow .12s;
  }
  .vcb-search:focus-within { border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12); }
  .vcb-search input { border: none; outline: none; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #111827; padding: 7px 0; background: transparent; width: 180px; }
  .vcb-search input::placeholder { color: #9ca3af; }

  /* tabs */
  .vcb-tabs { display: flex; gap: 4px; background: #f3f4f6; border-radius: 8px; padding: 4px; margin-bottom: 16px; }
  .vcb-tab {
    flex: 1; padding: 8px 12px; border-radius: 6px; border: none;
    cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13px;
    font-weight: 500; transition: all .12s; display: flex;
    align-items: center; justify-content: center; gap: 6px; white-space: nowrap;
    background: transparent; color: #6b7280;
  }
  .vcb-tab.on { background: #fff; color: #111827; font-weight: 600; box-shadow: 0 1px 4px rgba(0,0,0,.08); }

  /* card */
  .vcb-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
  .vcb-card-head {
    padding: 12px 16px; border-bottom: 1px solid #f3f4f6;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 10px; background: #f9fafb;
  }

  /* table */
  .vcb-table { width: 100%; border-collapse: collapse; }
  .vcb-table thead tr { background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
  .vcb-table thead th {
    padding: 9px 14px; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .07em;
    color: #9ca3af; text-align: left; white-space: nowrap;
  }
  .vcb-table tbody tr { border-bottom: 1px solid #f9fafb; transition: background .08s; }
  .vcb-table tbody tr:last-child { border-bottom: none; }
  .vcb-table tbody tr:hover { background: #fafafa; }
  .vcb-table tbody td { padding: 12px 14px; vertical-align: middle; font-size: 13px; color: #374151; }
  .vcb-table tfoot tr { border-top: 2px solid #e5e7eb; background: #f9fafb; }
  .vcb-table tfoot td { padding: 10px 14px; }

  /* badges */
  .vcb-badge { display: inline-flex; align-items: center; padding: 2px 9px; border-radius: 4px; font-size: 11.5px; font-weight: 600; border: 1px solid; white-space: nowrap; }

  /* buttons */
  .vcb-btn-dark {
    padding: 7px 14px; border-radius: 6px; border: none;
    background: #111827; color: #fff; font-size: 12.5px; font-weight: 500;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    display: inline-flex; align-items: center; gap: 6px; transition: background .12s;
  }
  .vcb-btn-dark:hover { background: #1f2937; }
  .vcb-btn-outline {
    padding: 7px 12px; border-radius: 6px;
    border: 1px solid #e5e7eb; background: #fff; color: #374151;
    font-size: 12.5px; font-weight: 500; font-family: 'DM Sans', sans-serif;
    cursor: pointer; display: inline-flex; align-items: center; gap: 5px;
    transition: all .1s;
  }
  .vcb-btn-outline:hover { background: #f9fafb; }
  .vcb-btn-sm { padding: 5px 10px; font-size: 12px; }
  .vcb-btn-icon { width: 30px; height: 30px; padding: 0; display: flex; align-items: center; justify-content: center; border-radius: 6px; }

  /* modal */
  .vcb-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,.4);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000; padding: 16px;
  }
  @keyframes vcb-modal-in { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }
  .vcb-modal {
    background: #fff; border-radius: 10px; width: 100%; max-width: 500px;
    box-shadow: 0 16px 48px rgba(0,0,0,.14); animation: vcb-modal-in .18s ease-out;
    overflow: hidden; border: 1px solid #e5e7eb;
  }
  .vcb-modal-head {
    padding: 14px 18px; border-bottom: 1px solid #e5e7eb; background: #fff;
    display: flex; align-items: center; justify-content: space-between;
  }
  .vcb-modal-body { padding: 18px; display: flex; flex-direction: column; gap: 13px; }
  .vcb-modal-foot {
    padding: 12px 18px; border-top: 1px solid #f3f4f6;
    background: #f9fafb; display: flex; justify-content: flex-end; gap: 8px;
  }
  .vcb-modal-lbl { display: block; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: #6b7280; margin-bottom: 5px; }
  .vcb-modal-inp {
    width: 100%; padding: 8px 11px; border: 1px solid #d1d5db; border-radius: 7px;
    font-size: 13px; font-family: 'DM Sans', sans-serif; color: #111827; background: #fff; outline: none;
    transition: border-color .12s;
  }
  .vcb-modal-inp:focus { border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12); }
  .vcb-modal-inp.mono { font-family: 'DM Mono', monospace; font-size: 12.5px; }
  .vcb-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  @keyframes vcb-spin { to { transform: rotate(360deg); } }
  .vcb-spin { display: inline-block; animation: vcb-spin .7s linear infinite; }

  .vcb-empty { padding: 48px 24px; text-align: center; }
  @media (max-width: 600px) { .vcb-g2 { grid-template-columns: 1fr; } }
`,N=o=>Number(o||0).toLocaleString("en-PK",{minimumFractionDigits:2,maximumFractionDigits:2}),O=o=>o?new Date(o).toLocaleDateString("en-PK",{day:"2-digit",month:"short",year:"numeric"}):"—",S={hbl:{abbr:"HBL",bg:"#006633"},ubl:{abbr:"UBL",bg:"#003087"},mcb:{abbr:"MCB",bg:"#c8102e"},nbp:{abbr:"NBP",bg:"#007940"},meezan:{abbr:"MBL",bg:"#1a3c6e"},allied:{abbr:"ABL",bg:"#b8860b"},bop:{abbr:"BOP",bg:"#1a237e"},askari:{abbr:"ASK",bg:"#004225"},faysal:{abbr:"FAY",bg:"#7b3f00"},js:{abbr:"JSB",bg:"#d4380d"},soneri:{abbr:"SNR",bg:"#8b0000"},default:{abbr:"BNK",bg:"#374151"}};function K(o){if(!o)return S.default;const l=o.toLowerCase();for(const[r,i]of Object.entries(S))if(r!=="default"&&l.includes(r))return i;return{...S.default,abbr:o.slice(0,3).toUpperCase()}}const q={issued:{bg:"#eff6ff",color:"#1d4ed8",border:"#bfdbfe",label:"Issued"},cleared:{bg:"#f0fdf4",color:"#15803d",border:"#bbf7d0",label:"Cleared"},bounced:{bg:"#fef2f2",color:"#dc2626",border:"#fecaca",label:"Bounced"}};function I({name:o,logoIndex:l,size:r=30}){const i=K(o),[b,h]=F.useState(!0);return l&&b?e.jsx("img",{src:`/${l}.png`,alt:i.abbr,style:{width:r,height:r,objectFit:"contain",borderRadius:Math.round(r*.24),border:"1px solid #e5e7eb",background:"#fff",padding:3,flexShrink:0},onError:()=>h(!1)}):e.jsx("div",{style:{width:r,height:r,borderRadius:Math.round(r*.24),flexShrink:0,background:i.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:r*.28,fontWeight:700,color:"#fff",fontFamily:"'DM Mono',monospace"},children:i.abbr.slice(0,3)})}function U({book:o,onClose:l,onSaved:r}){const[i,b]=d.useState({branchName:o.branchName||"",branchCode:o.branchCode||"",accountNumber:o.accountNumber||"",iban:o.iban||"",accountTitle:o.accountTitle||"",isActive:o.isActive!==!1}),[h,u]=d.useState(!1),p=async n=>{n.preventDefault(),u(!0);const s=await v(`${j}/cheque-books/${o._id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}),y=await s.json();u(!1),s.ok&&r(y.chequeBook)};return e.jsx("div",{className:"vcb-overlay",onClick:n=>{n.target===n.currentTarget&&l()},children:e.jsxs("form",{className:"vcb-modal",onSubmit:p,children:[e.jsxs("div",{className:"vcb-modal-head",children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:15,fontWeight:700,color:"#111827"},children:"Edit Cheque Book"}),e.jsxs("div",{style:{fontSize:11.5,color:"#9ca3af",marginTop:2},children:[o.chequeBookId," — ",o.bankAccountName]})]}),e.jsx("button",{type:"button",onClick:l,style:{background:"#f3f4f6",border:"none",borderRadius:7,width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#6b7280"},children:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})})]}),e.jsxs("div",{className:"vcb-modal-body",children:[e.jsxs("div",{className:"vcb-g2",children:[e.jsxs("div",{children:[e.jsx("label",{className:"vcb-modal-lbl",children:"Branch Name"}),e.jsx("input",{className:"vcb-modal-inp",value:i.branchName,onChange:n=>b(s=>({...s,branchName:n.target.value}))})]}),e.jsxs("div",{children:[e.jsx("label",{className:"vcb-modal-lbl",children:"Branch Code"}),e.jsx("input",{className:"vcb-modal-inp mono",value:i.branchCode,onChange:n=>b(s=>({...s,branchCode:n.target.value}))})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"vcb-modal-lbl",children:"Account Title"}),e.jsx("input",{className:"vcb-modal-inp",value:i.accountTitle,onChange:n=>b(s=>({...s,accountTitle:n.target.value}))})]}),e.jsxs("div",{className:"vcb-g2",children:[e.jsxs("div",{children:[e.jsx("label",{className:"vcb-modal-lbl",children:"Account Number"}),e.jsx("input",{className:"vcb-modal-inp mono",value:i.accountNumber,onChange:n=>b(s=>({...s,accountNumber:n.target.value}))})]}),e.jsxs("div",{children:[e.jsx("label",{className:"vcb-modal-lbl",children:"IBAN"}),e.jsx("input",{className:"vcb-modal-inp mono",value:i.iban,onChange:n=>b(s=>({...s,iban:n.target.value.toUpperCase()}))})]})]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13,color:"#374151"},children:[e.jsx("input",{type:"checkbox",checked:i.isActive,onChange:n=>b(s=>({...s,isActive:n.target.checked})),style:{width:14,height:14,accentColor:"#111827",cursor:"pointer"}}),"Active (can issue cheques from this book)"]})]}),e.jsxs("div",{className:"vcb-modal-foot",children:[e.jsx("button",{type:"button",className:"vcb-btn-outline",onClick:l,children:"Cancel"}),e.jsx("button",{type:"submit",className:"vcb-btn-dark",disabled:h,children:h?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"vcb-spin",children:"⟳"})," Saving…"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})," Save Changes"]})})]})]})})}function G(){const o=D(),[l,r]=d.useState([]),[i,b]=d.useState([]),[h,u]=d.useState("books"),[p,n]=d.useState(""),[s,y]=d.useState(""),[m,W]=d.useState(""),[w,C]=d.useState(!0),[B,k]=d.useState(null),[L,g]=d.useState({message:"",type:"info"}),M=async()=>{C(!0);const[t,a]=await Promise.all([v(`${j}/cheque-books`).then(c=>c.json()),v(`${j}/cheque-entries`).then(c=>c.json())]);r(t.chequeBooks||[]),b(a.chequeEntries||[]),C(!1)};d.useEffect(()=>{M()},[]);const z=l.filter(t=>(t.bankAccountName+t.chequeBookId+t.branchName+t.accountNumber).toLowerCase().includes(s.toLowerCase())),f=i.filter(t=>{const a=!p||t.chequeBookId===p,c=!m||(t.chequeNo+t.payeeAccountName+t.bankAccountName+t.branchName).toLowerCase().includes(m.toLowerCase());return a&&c}),T=async(t,a)=>{const c=await v(`${j}/cheque-entries/${t}/status`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:a})});if(c.ok)g({message:"Status updated.",type:"success"}),M();else{const x=await c.json();g({message:x.message,type:"error"})}},A=f.reduce((t,a)=>t+(a.amount||0),0);return e.jsxs(E,{children:[e.jsxs("style",{children:[_,$]}),e.jsx(R,{message:L.message,type:L.type,onClose:()=>g({message:"",type:"info"})}),B&&e.jsx(U,{book:B,onClose:()=>k(null),onSaved:t=>{r(a=>a.map(c=>c._id===t._id?t:c)),k(null),g({message:"Cheque book updated.",type:"success"})}}),e.jsxs("div",{className:"vcb",children:[e.jsxs("div",{style:{marginBottom:16},children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"Cheque Management"}),e.jsx("h1",{style:{margin:0,fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px"},children:"Cheque Books"})]}),e.jsx(P,{active:"view"}),e.jsx("div",{className:"vcb-tabs",children:[{key:"books",label:`📒 Books (${l.length})`},{key:"entries",label:`✍️ Issued Cheques (${i.length})`}].map(t=>e.jsx("button",{className:`vcb-tab${h===t.key?" on":""}`,onClick:()=>u(t.key),children:t.label},t.key))}),h==="books"&&e.jsxs("div",{className:"vcb-card",children:[e.jsxs("div",{className:"vcb-card-head",children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:14,fontWeight:700,color:"#111827",margin:0},children:"Cheque Books"}),e.jsxs("p",{style:{fontSize:11.5,color:"#9ca3af",margin:"2px 0 0"},children:[l.length," registered · ",l.filter(t=>t.isActive!==!1).length," active"]})]}),e.jsxs("div",{style:{display:"flex",gap:9,alignItems:"center",flexWrap:"wrap"},children:[e.jsxs("div",{className:"vcb-search",children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})}),e.jsx("input",{value:s,onChange:t=>y(t.target.value),placeholder:"Search books…"})]}),e.jsxs("button",{onClick:()=>o("/cheque-book/create"),className:"vcb-btn-dark",children:[e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4v16m8-8H4"})}),"New Cheque Book"]})]})]}),w?e.jsx("div",{className:"vcb-empty",style:{color:"#9ca3af"},children:"Loading…"}):z.length===0?e.jsxs("div",{className:"vcb-empty",children:[e.jsx("div",{style:{fontSize:36,marginBottom:12},children:"📒"}),e.jsx("p",{style:{fontSize:13,fontWeight:600,color:"#374151",margin:"0 0 4px"},children:s?"No books match your search":"No cheque books yet"}),!s&&e.jsx("button",{onClick:()=>o("/cheque-book/create"),className:"vcb-btn-dark",style:{marginTop:12},children:"+ Create First Cheque Book"})]}):e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{className:"vcb-table",children:[e.jsx("thead",{children:e.jsx("tr",{children:["Book","Bank Account","Branch","Account No. / IBAN","Leaves","Status","Actions"].map(t=>e.jsx("th",{children:t},t))})}),e.jsx("tbody",{children:z.map(t=>{const a=t.lastIssuedLeaf?parseInt(t.lastIssuedLeaf)-parseInt(t.startLeaf)+1:0,c=t.totalLeaves-a,x=Math.round(a/t.totalLeaves*100);return e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{style:{fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:13,color:"#111827"},children:t.chequeBookId}),e.jsxs("div",{style:{fontSize:11,color:"#9ca3af",marginTop:1},children:[t.startLeaf,"–",t.endLeaf]})]}),e.jsx("td",{children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:9},children:[e.jsx(I,{name:t.bankAccountName,logoIndex:t.bankLogoIndex}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:600,fontSize:13},children:t.bankAccountName}),e.jsx("div",{style:{fontSize:11,color:"#9ca3af",marginTop:1},children:t.accountTitle})]})]})}),e.jsxs("td",{children:[e.jsx("div",{style:{fontWeight:500,fontSize:13},children:t.branchName}),e.jsxs("div",{style:{fontSize:11,fontFamily:"'DM Mono',monospace",color:"#9ca3af"},children:["Code: ",t.branchCode]})]}),e.jsxs("td",{children:[e.jsx("div",{style:{fontFamily:"'DM Mono',monospace",fontSize:12.5},children:t.accountNumber}),e.jsx("div",{style:{fontFamily:"'DM Mono',monospace",fontSize:10.5,color:"#9ca3af",marginTop:1},children:t.iban})]}),e.jsxs("td",{style:{minWidth:120},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:4},children:[e.jsxs("span",{style:{fontSize:11.5,color:"#6b7280"},children:[c," left"]}),e.jsxs("span",{style:{fontSize:11.5,color:"#9ca3af"},children:[a,"/",t.totalLeaves]})]}),e.jsx("div",{style:{height:4,background:"#f3f4f6",borderRadius:4,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",borderRadius:4,width:`${x}%`,background:x>80?"#ef4444":x>50?"#f59e0b":"#22c55e",transition:".3s"}})})]}),e.jsx("td",{children:e.jsx("span",{className:"vcb-badge",style:{background:t.isActive===!1?"#fff7ed":"#f0fdf4",color:t.isActive===!1?"#d97706":"#15803d",borderColor:t.isActive===!1?"#fed7aa":"#bbf7d0"},children:t.isActive===!1?"Inactive":"Active"})}),e.jsx("td",{children:e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("button",{className:"vcb-btn-outline vcb-btn-sm vcb-btn-icon",onClick:()=>k(t),title:"Edit",children:e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2a2 2 0 01.586-1.414z"})})}),e.jsx("button",{className:"vcb-btn-dark vcb-btn-sm",onClick:()=>o("/cheque-book/entry"),children:"Issue"})]})})]},t._id)})})]})})]}),h==="entries"&&e.jsxs("div",{className:"vcb-card",children:[e.jsxs("div",{className:"vcb-card-head",children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:14,fontWeight:700,color:"#111827",margin:0},children:"Issued Cheques"}),e.jsxs("p",{style:{fontSize:11.5,color:"#9ca3af",margin:"2px 0 0"},children:["Total: ",e.jsxs("strong",{style:{color:"#111827",fontFamily:"'DM Mono',monospace"},children:["PKR ",N(A)]})," · ",f.length," cheques"]})]}),e.jsxs("div",{style:{display:"flex",gap:9,alignItems:"center",flexWrap:"wrap"},children:[e.jsxs("div",{className:"vcb-search",children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})}),e.jsx("input",{value:m,onChange:t=>W(t.target.value),placeholder:"Search cheques…"})]}),e.jsxs("div",{style:{position:"relative"},children:[e.jsxs("select",{className:"vcb-sel",value:p,onChange:t=>n(t.target.value),style:{paddingRight:28},children:[e.jsx("option",{value:"",children:"All Books"}),l.map(t=>e.jsxs("option",{value:t._id,children:[t.chequeBookId," — ",t.bankAccountName]},t._id))]}),e.jsx("svg",{style:{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"},width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),e.jsxs("button",{onClick:()=>o("/cheque-book/entry"),className:"vcb-btn-dark",children:[e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4v16m8-8H4"})}),"Issue Cheque"]})]})]}),w?e.jsx("div",{className:"vcb-empty",style:{color:"#9ca3af"},children:"Loading…"}):f.length===0?e.jsxs("div",{className:"vcb-empty",children:[e.jsx("div",{style:{fontSize:36,marginBottom:12},children:"✍️"}),e.jsx("p",{style:{fontSize:13,fontWeight:600,color:"#374151"},children:m||p?"No cheques match your filters":"No cheques issued yet"})]}):e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{className:"vcb-table",children:[e.jsx("thead",{children:e.jsx("tr",{children:["Cheque No.","Date","Bank / Branch","Payee","Amount (PKR)","Status","Update Status"].map(t=>e.jsx("th",{children:t},t))})}),e.jsx("tbody",{children:f.map(t=>{const a=q[t.status]||q.issued;return e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("div",{style:{fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:13,color:"#111827"},children:t.chequeNo})}),e.jsx("td",{style:{color:"#374151",whiteSpace:"nowrap"},children:O(t.date)}),e.jsx("td",{children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx(I,{name:t.bankAccountName,logoIndex:t.bankLogoIndex,size:26}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:600,fontSize:13},children:t.bankAccountName}),e.jsx("div",{style:{fontSize:11,color:"#9ca3af"},children:t.branchName})]})]})}),e.jsxs("td",{children:[e.jsx("div",{style:{fontWeight:600,fontSize:13},children:t.payeeAccountName}),t.remarks&&e.jsx("div",{style:{fontSize:11.5,color:"#9ca3af",marginTop:1,maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:t.remarks})]}),e.jsxs("td",{children:[e.jsx("div",{style:{fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:13,color:"#111827"},children:N(t.amount)}),e.jsx("div",{style:{fontSize:10.5,color:"#9ca3af",maxWidth:170,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginTop:1},children:t.amountInWords})]}),e.jsx("td",{children:e.jsx("span",{className:"vcb-badge",style:{background:a.bg,color:a.color,borderColor:a.border},children:a.label})}),e.jsx("td",{children:e.jsxs("div",{style:{position:"relative"},children:[e.jsxs("select",{className:"vcb-sel",value:t.status,onChange:c=>T(t._id,c.target.value),style:{paddingRight:26,minWidth:90},children:[e.jsx("option",{value:"issued",children:"Issued"}),e.jsx("option",{value:"cleared",children:"Cleared"}),e.jsx("option",{value:"bounced",children:"Bounced"})]}),e.jsx("svg",{style:{position:"absolute",right:7,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"},width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]})})]},t._id)})}),e.jsx("tfoot",{children:e.jsxs("tr",{children:[e.jsxs("td",{colSpan:4,style:{fontSize:10.5,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:".07em"},children:["Total (",f.length,")"]}),e.jsx("td",{children:e.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:13,color:"#111827"},children:["PKR ",N(A)]})}),e.jsx("td",{colSpan:2})]})})]})})]})]})]})}export{G as default};
