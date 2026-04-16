import{a as s,j as n,R as xe}from"./vendor-react-CVRJsYjy.js";import{a as oe,A as se,S as ye,N as je}from"./index-DAaqPt1z.js";import{J as ve}from"./JournalTopNav-B4h2nWDO.js";import"./vendor-react-dom-BIx1r6lP.js";import"./vendor-D8Rt7Tv7.js";const we="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",De=`
  * { box-sizing: border-box; }

  .gj-input[type=number]                              { -moz-appearance: textfield; }
  .gj-input[type=number]::-webkit-inner-spin-button,
  .gj-input[type=number]::-webkit-outer-spin-button  { -webkit-appearance: none; }

  .gj-input {
    width: 100%;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 7px 10px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: #111827;
    background: #fff;
    outline: none;
    transition: border-color .15s, box-shadow .15s;
  }
  .gj-input::placeholder { color: #9ca3af; font-style: normal; }
  .gj-input:focus {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .gj-input.mono { font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 400; }

  .gj-btn {
    width: 100%;
    text-align: left;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 7px 10px;
    background: #fff;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: #111827;
    cursor: pointer;
    outline: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: border-color .15s, box-shadow .15s;
  }
  .gj-btn:hover  { border-color: #9ca3af; }
  .gj-btn:focus,
  .gj-btn.open   {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }

  .gj-panel {
    position: absolute;
    z-index: 200;
    top: calc(100% + 2px);
    left: 0; right: 0;
    background: #fff;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,.1);
    max-height: 240px;
    overflow-y: auto;
  }
  .gj-panel::-webkit-scrollbar       { width: 4px; }
  .gj-panel::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }

  .gj-search {
    width: 100%;
    border: none;
    border-bottom: 1px solid #e5e7eb;
    padding: 8px 12px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    background: #f9fafb;
    color: #111827;
    position: sticky;
    top: 0;
    border-radius: 8px 8px 0 0;
  }

  .gj-item {
    padding: 7px 12px;
    font-size: 13px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #374151;
    transition: background .08s;
    border-bottom: 1px solid #f9fafb;
  }
  .gj-item:last-child  { border-bottom: none; }
  .gj-item:hover       { background: #f3f4f6; }
  .gj-item.hi          { background: #f3f4f6; font-weight: 600; color: #111827; }

  .gj-type-badge {
    font-size: 10px;
    color: #6b7280;
    font-family: 'DM Mono', monospace;
    background: #f3f4f6;
    padding: 1px 5px;
    border-radius: 3px;
    flex-shrink: 0;
    margin-left: auto;
  }

  @keyframes gj-fadein { from { opacity:0; transform:translateY(2px); } to { opacity:1; transform:translateY(0); } }
  .gj-fadein { animation: gj-fadein .12s ease-out; }

  @keyframes gj-rowslide { from { opacity:0; } to { opacity:1; } }
  .gj-rowslide { animation: gj-rowslide .15s ease-out; }
`,re=({open:c})=>n.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2.5,style:{flexShrink:0,transition:"transform .15s",transform:c?"rotate(180deg)":"none"},children:n.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})}),ae=()=>n.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:n.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})}),ke=()=>n.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:1.8,children:n.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})}),Se=()=>n.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:n.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4v16m8-8H4"})});function Ce({text:c,required:u,note:p}){return n.jsxs("div",{style:{marginBottom:5,display:"flex",alignItems:"baseline",gap:5},children:[n.jsx("span",{style:{fontSize:11,fontWeight:600,color:"#374151",textTransform:"uppercase",letterSpacing:".06em",fontFamily:"'DM Sans',sans-serif"},children:c}),u&&n.jsx("span",{style:{fontSize:11,color:"#dc2626"},children:"*"}),p&&n.jsx("span",{style:{fontSize:11,color:"#9ca3af",fontWeight:400,textTransform:"none",letterSpacing:0},children:p})]})}function ie({label:c,tag:u,count:p,children:v}){return n.jsxs("div",{style:{border:"1px solid #e5e7eb",borderRadius:8,overflow:"visible"},children:[n.jsxs("div",{style:{background:"#f9fafb",borderBottom:"1px solid #e5e7eb",padding:"8px 16px",display:"flex",alignItems:"center",gap:10,borderRadius:"7px 7px 0 0"},children:[n.jsx("span",{style:{fontSize:10,fontWeight:700,letterSpacing:".04em",background:"#e5e7eb",color:"#374151",padding:"1px 6px",borderRadius:3,fontFamily:"'DM Mono',monospace"},children:u}),n.jsx("span",{style:{fontSize:12,fontWeight:600,color:"#374151",fontFamily:"'DM Sans',sans-serif"},children:c}),p!=null&&n.jsxs("span",{style:{marginLeft:"auto",fontSize:11,color:"#9ca3af",fontFamily:"'DM Mono',monospace"},children:[p," row",p!==1?"s":""]})]}),n.jsx("div",{style:{padding:"14px 16px"},children:v})]})}function ce(){const c={fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",fontFamily:"'DM Sans',sans-serif"};return n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:7},children:[n.jsxs("span",{style:c,children:["Account ",n.jsx("span",{style:{color:"#dc2626",fontWeight:400},children:"*"})]}),n.jsxs("span",{style:c,children:["Amount  ",n.jsx("span",{style:{color:"#dc2626",fontWeight:400},children:"*"})]}),n.jsx("span",{style:c,children:"Description"})]})}function Ae(){const c=s.useRef(null),u=s.useRef(null),p=s.useRef(null),v=s.useRef(null),F=s.useRef(null),O=s.useRef(null),J=s.useRef(null),w=s.useRef([]),W=s.useRef([]),R=s.useRef([]),T=s.useRef([]),I=s.useRef([]),[B,le]=s.useState([]),[g,K]=s.useState(""),[N,A]=s.useState(""),[x,d]=s.useState(!1),[Y,D]=s.useState(0),[P,k]=s.useState({}),[S,U]=s.useState(""),[z,H]=s.useState(""),[V,q]=s.useState(""),[G,de]=s.useState(()=>new Date().toISOString().slice(0,10)),[l,f]=s.useState([{account:"",amount:"",lineDesc:"",search:"",open:!1,isNew:!1}]),[fe,$]=s.useState(""),[ue,pe]=s.useState(""),_=l.reduce((e,t)=>e+(parseFloat(t.amount)||0),0),C=parseFloat(S)||0,Q=C-_,h=C>0&&Math.abs(Q)<=.001,m=(e,t="info")=>{$(""),setTimeout(()=>{$(e),pe(t)},20)},ge=e=>{const t=e.replace(/\D/g,"");return t.length<=4?t:t.length<=6?`${t.slice(0,4)}-${t.slice(4)}`:`${t.slice(0,4)}-${t.slice(4,6)}-${t.slice(6,8)}`},X=e=>e.toLocaleString("en-PK",{minimumFractionDigits:2,maximumFractionDigits:2}),j=e=>B.filter(t=>t.accountName.toLowerCase().includes(e.toLowerCase())||t.accountType.toLowerCase().includes(e.toLowerCase())).sort((t,o)=>(o.starred?1:0)-(t.starred?1:0)),M=()=>{f(e=>e.map(t=>({...t,open:!1}))),d(!0),A(""),D(0),setTimeout(()=>p.current?.focus(),0)},b=e=>{d(!1),f(t=>t.map((o,r)=>({...o,open:r===e}))),k(t=>({...t,[e]:0})),setTimeout(()=>W.current[e]?.focus(),0)},E=e=>f(t=>t.map((o,r)=>r===e?{...o,open:!1}:o)),Z=(e,t)=>{f(o=>o.map((r,a)=>a===e?{...r,account:t,search:"",open:!1}:r)),setTimeout(()=>T.current[e]?.focus(),0)},L=(e,t,o)=>f(r=>{const a=[...r];return a[e]={...a[e],[t]:o},a}),he=e=>{if(l.length===1){m("At least one credit row required","warning");return}f(t=>t.filter((o,r)=>r!==e))},ee=(e="")=>{const t=l.length;f(o=>[...o,{account:e,amount:"",lineDesc:"",search:"",open:!1,isNew:!0}]),setTimeout(()=>b(t),0)};s.useEffect(()=>{(async()=>{try{const e=await oe(`${se}/accounts`),t=await e.json();e.ok?le(t):m("Failed to load accounts","error")}catch{m("Error loading accounts","error")}})()},[]),s.useEffect(()=>{setTimeout(()=>c.current?.focus(),100)},[]);const te=()=>{K(""),U(""),H(""),q(""),f([{account:"",amount:"",lineDesc:"",search:"",open:!1,isNew:!1}]),w.current=[],T.current=[],W.current=[],I.current=[],setTimeout(()=>c.current?.focus(),80)},ne=async e=>{if(e?.preventDefault&&e.preventDefault(),!g||!S||!z.trim()){m("Fill all required fields","warning");return}const t=parseFloat(S)||0;if(Math.abs(t-_)>.001){m("Debit and credit must be equal","error");return}for(const o of l)if(!o.account||!o.amount||!o.lineDesc?.trim()){m("Fill all credit fields","warning");return}try{const o=await oe(`${se}/create-journal-entry`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({description:z,debitLineDesc:z,debitAccount:g,debitAmount:t,creditEntries:l.map(a=>({account:a.account,amount:parseFloat(a.amount),description:a.lineDesc||""})),comments:V,entryDate:G})}),r=await o.json();if(o.ok)m(r.message||"Entry saved","success"),te();else throw new Error(r?.message||"Failed")}catch(o){m(o.message,"error")}};return s.useEffect(()=>{const e=t=>{v.current&&!v.current.contains(t.target)&&u.current&&!u.current.contains(t.target)&&d(!1),R.current.forEach((o,r)=>{o&&!o.contains(t.target)&&w.current[r]&&!w.current[r].contains(t.target)&&f(a=>a.map((i,y)=>y===r?{...i,open:!1}:i))})};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[l]),s.useEffect(()=>{const e=t=>{const o=t.ctrlKey||t.metaKey;o&&t.shiftKey&&t.key==="D"&&(t.preventDefault(),x?(d(!1),u.current?.focus()):M()),o&&t.shiftKey&&t.key==="C"&&(t.preventDefault(),l.some(a=>a.open)?(f(a=>a.map(i=>({...i,open:!1}))),w.current[0]?.focus()):b(0))};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[x,l]),n.jsxs(ye,{children:[n.jsxs("style",{children:[we,De]}),n.jsx(ve,{}),n.jsxs("div",{style:{maxWidth:900,margin:"0 auto",paddingBottom:64,fontFamily:"'DM Sans',sans-serif"},children:[n.jsxs("div",{style:{marginBottom:20},children:[n.jsxs("p",{style:{fontSize:11,color:"#9ca3af",marginBottom:4},children:["Accounts ",n.jsx("span",{style:{margin:"0 4px"},children:"›"})," Journal Entry"]}),n.jsx("h1",{style:{margin:0,fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px"},children:"New Journal Entry"})]}),n.jsxs("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:"10px 16px",marginBottom:12,gap:12},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[n.jsx("label",{style:{fontSize:12,fontWeight:600,color:"#374151"},children:"Date"}),n.jsx("input",{ref:c,type:"text",value:G,onChange:e=>de(ge(e.target.value)),placeholder:"YYYY-MM-DD",maxLength:10,className:"gj-input mono",style:{width:120,padding:"5px 9px"},onKeyDown:e=>{e.key==="Enter"&&(e.preventDefault(),M())}})]}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:0},children:[[{label:"DR",val:C},{label:"CR",val:_}].map(({label:e,val:t},o)=>n.jsxs(xe.Fragment,{children:[o>0&&n.jsx("div",{style:{width:1,height:28,background:"#e5e7eb",margin:"0 6px"}}),n.jsxs("div",{style:{textAlign:"center",padding:"0 8px"},children:[n.jsx("div",{style:{fontSize:10,fontWeight:700,color:"#9ca3af",letterSpacing:".08em",marginBottom:1},children:e}),n.jsx("div",{style:{fontSize:13,fontWeight:400,color:e==="DR"?"#15803d":"#b91c1c",fontFamily:"'DM Mono',monospace"},children:X(t)})]})]},e)),n.jsx("div",{style:{width:1,height:28,background:"#e5e7eb",margin:"0 6px"}}),n.jsx("div",{style:{padding:"0 8px"},children:h?n.jsxs("span",{style:{display:"flex",alignItems:"center",gap:5,fontSize:12,fontWeight:600,color:"#065f46",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:5,padding:"3px 9px"},children:[n.jsx(ae,{})," Balanced"]}):n.jsx("span",{style:{fontSize:12,fontWeight:500,color:C>0?"#92400e":"#9ca3af",fontFamily:"'DM Mono',monospace"},children:C>0?`Diff ${X(Math.abs(Q))}`:"—"})})]})]}),n.jsxs("form",{onSubmit:ne,style:{display:"flex",flexDirection:"column",gap:8},children:[n.jsxs(ie,{tag:"DR",label:"Debit Entry",children:[n.jsx(ce,{}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8},children:[n.jsxs("div",{style:{position:"relative"},children:[n.jsxs("button",{ref:u,type:"button",className:`gj-btn${x?" open":""}`,onClick:()=>x?d(!1):M(),onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),x?d(!1):M()),e.key==="ArrowDown"&&(e.preventDefault(),M()),e.key==="Escape"&&d(!1)},children:[n.jsx("span",{style:{color:g?"#111827":"#9ca3af"},children:g?B.find(e=>e._id===g)?.accountName||"—":"Select account…"}),n.jsx(re,{open:x})]}),x&&n.jsxs("div",{ref:v,className:"gj-panel gj-fadein",children:[n.jsx("input",{ref:p,type:"text",value:N,onChange:e=>{A(e.target.value),D(0)},placeholder:"Search…",className:"gj-search",onKeyDown:e=>{const t=j(N);if(e.key==="ArrowDown"&&(e.preventDefault(),D(o=>Math.min(o+1,t.length-1))),e.key==="ArrowUp"&&(e.preventDefault(),D(o=>Math.max(o-1,0))),e.key==="Enter"){e.preventDefault();const o=t[Y];o&&(K(o._id),d(!1),A(""),setTimeout(()=>F.current?.focus(),0))}e.key==="Escape"&&(d(!1),u.current?.focus()),e.key==="Tab"&&d(!1)}}),j(N).map((e,t)=>n.jsxs("div",{className:`gj-item${t===Y?" hi":""}`,onMouseEnter:()=>D(t),onClick:()=>{K(e._id),d(!1),A(""),F.current?.focus()},children:[e.starred&&n.jsx("span",{style:{color:"#f59e0b",fontSize:10,flexShrink:0},children:"★"}),n.jsx("span",{style:{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.accountName}),n.jsx("span",{className:"gj-type-badge",children:e.accountType})]},e._id)),j(N).length===0&&n.jsx("div",{style:{padding:"10px 12px",fontSize:12,color:"#9ca3af",textAlign:"center"},children:"No results"})]})]}),n.jsx("input",{ref:F,type:"number",min:"0",step:"0.01",value:S,onChange:e=>U(e.target.value),placeholder:"0.00",className:"gj-input mono",onKeyDown:e=>{e.key==="Enter"&&(e.preventDefault(),O.current?.focus())}}),n.jsx("input",{ref:O,type:"text",value:z,onChange:e=>H(e.target.value),placeholder:"Narration…",className:"gj-input",onKeyDown:e=>{e.key==="Enter"&&(e.preventDefault(),b(0))}})]})]}),n.jsxs(ie,{tag:"CR",label:"Credit Entries",count:l.length,children:[n.jsx(ce,{}),n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:0},children:l.map((e,t)=>n.jsxs("div",{className:e.isNew?"gj-rowslide":"",style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,paddingTop:t>0?10:0,marginTop:t>0?10:0,borderTop:t>0?"1px solid #f3f4f6":"none"},children:[n.jsxs("div",{style:{position:"relative"},children:[n.jsxs("button",{ref:o=>w.current[t]=o,type:"button",className:`gj-btn${e.open?" open":""}`,onClick:()=>e.open?E(t):b(t),onKeyDown:o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),e.open?E(t):b(t)),o.key==="ArrowDown"&&(o.preventDefault(),b(t)),o.key==="Escape"&&E(t)},children:[n.jsx("span",{style:{color:e.account?"#111827":"#9ca3af",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.account?B.find(o=>o._id===e.account)?.accountName||"—":"Select account…"}),n.jsx(re,{open:e.open})]}),e.open&&n.jsxs("div",{ref:o=>R.current[t]=o,className:"gj-panel gj-fadein",children:[n.jsx("input",{ref:o=>W.current[t]=o,type:"text",value:e.search,onChange:o=>{L(t,"search",o.target.value),k(r=>({...r,[t]:0}))},placeholder:"Search… (Esc = use debit account)",className:"gj-search",onKeyDown:o=>{const r=j(e.search),a=P[t]||0;if(o.key==="ArrowDown"){o.preventDefault();const i=Math.min(a+1,r.length-1);k(y=>({...y,[t]:i})),R.current[t]?.children[i+1]?.scrollIntoView({block:"nearest"})}if(o.key==="ArrowUp"){o.preventDefault();const i=Math.max(a-1,0);k(y=>({...y,[t]:i})),R.current[t]?.children[i+1]?.scrollIntoView({block:"nearest"})}if(o.key==="Enter"){o.preventDefault();const i=r[a];Z(t,i?i._id:e.account||g||"")}if(o.key==="Escape"){const i=e.account||g||"";!e.account&&i&&L(t,"account",i),E(t),setTimeout(()=>T.current[t]?.focus(),0)}o.key==="Tab"&&E(t)}}),j(e.search).map((o,r)=>n.jsxs("div",{className:`gj-item${r===(P[t]||0)?" hi":""}`,onMouseEnter:()=>k(a=>({...a,[t]:r})),onClick:()=>Z(t,o._id),children:[o.starred&&n.jsx("span",{style:{color:"#f59e0b",fontSize:10,flexShrink:0},children:"★"}),n.jsx("span",{style:{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:o.accountName}),n.jsx("span",{className:"gj-type-badge",children:o.accountType})]},o._id)),j(e.search).length===0&&n.jsx("div",{style:{padding:"10px 12px",fontSize:12,color:"#9ca3af",textAlign:"center"},children:"No results"})]})]}),n.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center"},children:[n.jsx("input",{ref:o=>T.current[t]=o,type:"number",value:e.amount,placeholder:"0.00",className:"gj-input mono",style:{flex:1},onChange:o=>L(t,"amount",o.target.value),onKeyDown:o=>{if(o.key==="Enter"){if(o.preventDefault(),!e.account){b(t);return}I.current[t]?.focus()}}}),l.length>1&&n.jsx("button",{type:"button",onClick:()=>he(t),style:{flexShrink:0,width:28,height:28,borderRadius:5,background:"#fef2f2",color:"#dc2626",border:"1px solid #fecaca",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"background .1s",outline:"none"},onMouseEnter:o=>o.currentTarget.style.background="#fee2e2",onMouseLeave:o=>o.currentTarget.style.background="#fef2f2",children:n.jsx(ke,{})})]}),n.jsx("input",{ref:o=>I.current[t]=o,type:"text",value:e.lineDesc,onChange:o=>L(t,"lineDesc",o.target.value),placeholder:"Narration…",className:"gj-input",onKeyDown:o=>{if(o.key!=="Enter")return;o.preventDefault();const r=t===l.length-1,a=parseFloat(S)||0,i=l.reduce((me,be)=>me+(parseFloat(be.amount)||0),0),y=a>0&&Math.abs(a-i)<=.001;r?y?J.current?.focus():ee(e.account||g||""):b(t+1)}})]},t))}),n.jsxs("button",{type:"button",onClick:()=>ee(),style:{marginTop:10,width:"100%",padding:"6px 0",border:"1px dashed #d1d5db",borderRadius:6,background:"transparent",cursor:"pointer",color:"#6b7280",fontSize:12.5,fontWeight:500,fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:6,transition:"background .1s, border-color .1s"},onMouseEnter:e=>{e.currentTarget.style.background="#f9fafb",e.currentTarget.style.borderColor="#9ca3af"},onMouseLeave:e=>{e.currentTarget.style.background="transparent",e.currentTarget.style.borderColor="#d1d5db"},children:[n.jsx(Se,{})," Add Credit Row"]})]}),n.jsxs("div",{style:{border:"1px solid #e5e7eb",borderRadius:8,background:"#fff",padding:"12px 16px"},children:[n.jsx(Ce,{text:"Narration / Comments",note:"optional"}),n.jsx("textarea",{ref:J,value:V,onChange:e=>q(e.target.value),rows:2,placeholder:"Additional notes… (Enter to save, Shift+Enter for new line)",style:{width:"100%",border:"1px solid #d1d5db",borderRadius:6,padding:"7px 10px",fontSize:13,fontFamily:"'DM Sans',sans-serif",color:"#111827",outline:"none",resize:"vertical",transition:"border-color .15s"},onFocus:e=>{e.target.style.borderColor="#6b7280",e.target.style.boxShadow="0 0 0 2px rgba(107,114,128,.12)"},onBlur:e=>{e.target.style.borderColor="#d1d5db",e.target.style.boxShadow="none"},onKeyDown:e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),ne(e))}})]}),n.jsxs("div",{style:{display:"flex",gap:8},children:[n.jsx("button",{type:"button",onClick:te,style:{padding:"9px 18px",borderRadius:7,border:"1px solid #d1d5db",background:"#fff",color:"#374151",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"background .1s"},onMouseEnter:e=>e.currentTarget.style.background="#f9fafb",onMouseLeave:e=>e.currentTarget.style.background="#fff",children:"Clear"}),n.jsx("button",{type:"submit",disabled:!h,style:{flex:1,padding:"9px 0",borderRadius:7,border:"none",cursor:h?"pointer":"not-allowed",fontSize:13,fontWeight:600,fontFamily:"'DM Sans',sans-serif",background:h?"#111827":"#f3f4f6",color:h?"#fff":"#9ca3af",transition:"background .15s, opacity .15s",display:"flex",alignItems:"center",justifyContent:"center",gap:7},onMouseEnter:e=>{h&&(e.currentTarget.style.background="#1f2937")},onMouseLeave:e=>{h&&(e.currentTarget.style.background="#111827")},children:h?n.jsxs(n.Fragment,{children:[n.jsx(ae,{})," Save Journal Entry"]}):"Complete the entry to save"})]}),n.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:10,paddingTop:4},children:[["Ctrl+Shift+D","Debit DD"],["Ctrl+Shift+C","Credit DD"],["Enter","Advance"],["↑↓","Navigate list"],["Esc","Use debit acct"]].map(([e,t])=>n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5},children:[n.jsx("kbd",{style:{background:"#f3f4f6",border:"1px solid #e5e7eb",borderRadius:4,padding:"1px 6px",fontSize:10,fontFamily:"'DM Mono',monospace",color:"#374151"},children:e}),n.jsx("span",{style:{fontSize:11,color:"#9ca3af"},children:t})]},e))})]})]}),n.jsx(je,{message:fe,type:ue,onClose:()=>$("")})]})}export{Ae as default};
