import{a as v,j as e,S as C,N as A,A as B}from"./index-DUFKhaqd.js";import{c as M,b as l,R as I}from"./react-BBT0yyZ1.js";import{C as P}from"./ChequeTopNav-k_uYOjUM.js";const z="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",T=`
  *, *::before, *::after { box-sizing: border-box; }
  .ccb { font-family: 'DM Sans', sans-serif; color: #111827; max-width: 640px; margin: 0 auto; }

  .ccb-inp {
    width: 100%; padding: 8px 11px;
    border: 1px solid #d1d5db; border-radius: 7px;
    font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s; appearance: none;
  }
  .ccb-inp::placeholder { color: #9ca3af; }
  .ccb-inp:focus { border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12); }
  .ccb-inp.mono { font-family: 'DM Mono', monospace; font-size: 12.5px; }

  .ccb-lbl {
    display: block; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .07em;
    color: #6b7280; margin-bottom: 5px;
  }
  .ccb-lbl em { color: #ef4444; font-style: normal; margin-left: 2px; }

  .ccb-section { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 10px; }
  .ccb-section-head {
    padding: 9px 14px; background: #f9fafb; border-bottom: 1px solid #e5e7eb;
    display: flex; align-items: center; gap: 7px;
  }
  .ccb-section-body { padding: 14px; display: flex; flex-direction: column; gap: 12px; }

  .ccb-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .ccb-leaf-row { display: grid; grid-template-columns: 1fr 22px 1fr; gap: 8px; align-items: end; }
  .ccb-leaf-sep { display: flex; align-items: center; justify-content: center; padding-bottom: 9px; color: #9ca3af; font-weight: 600; font-size: 14px; }

  /* dropdown */
  .ccb-dd-btn {
    width: 100%; text-align: left; padding: 8px 11px;
    border: 1px solid #d1d5db; border-radius: 7px;
    font-size: 13px; font-family: 'DM Sans', sans-serif; color: #111827;
    background: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: space-between; gap: 8px;
    transition: border-color .12s, box-shadow .12s; outline: none;
  }
  .ccb-dd-btn.open { border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12); }
  .ccb-dd-panel {
    position: absolute; left: 0; top: calc(100% + 3px);
    width: 100%; z-index: 300; background: #fff;
    border: 1px solid #d1d5db; border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,.1); overflow: hidden;
  }
  .ccb-dd-item {
    padding: 8px 12px; font-size: 13px; cursor: pointer;
    border-bottom: 1px solid #f9fafb; color: #111827;
    display: flex; align-items: center; gap: 9px;
    transition: background .08s;
  }
  .ccb-dd-item:hover { background: #f3f4f6; }
  .ccb-dd-item.sel { background: #f3f4f6; font-weight: 600; }

  /* preview box */
  .ccb-preview {
    background: #f0fdf4; border: 1px solid #bbf7d0;
    border-radius: 7px; padding: 10px 14px;
    display: flex; align-items: center; justify-content: space-between;
    margin-top: 8px;
  }

  /* submit */
  .ccb-submit {
    padding: 9px 20px; border-radius: 7px; border: none;
    background: #111827; color: #fff; font-size: 13px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    display: inline-flex; align-items: center; gap: 7px;
    transition: background .12s;
  }
  .ccb-submit:hover:not(:disabled) { background: #1f2937; }
  .ccb-submit:disabled { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; }

  .ccb-cancel {
    padding: 9px 16px; border-radius: 7px;
    border: 1px solid #e5e7eb; background: #fff;
    color: #374151; font-size: 13px; font-weight: 500;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    transition: background .1s;
  }
  .ccb-cancel:hover { background: #f9fafb; }

  @keyframes ccb-spin { to { transform: rotate(360deg); } }
  .ccb-spin { display: inline-block; animation: ccb-spin .7s linear infinite; }

  @media (max-width: 560px) { .ccb-g2, .ccb-leaf-row { grid-template-columns: 1fr; } .ccb-leaf-sep { display: none; } }
`,q=[{id:1,name:"National Bank of Pakistan",abbr:"NBP",color:"#007940",bg:"#e6f4ec"},{id:2,name:"The Bank of Punjab",abbr:"BOP",color:"#1a237e",bg:"#e8eaf6"},{id:3,name:"The Bank of Khyber",abbr:"BOK",color:"#2e4057",bg:"#eaecf0"},{id:4,name:"Sindh Bank Limited",abbr:"SBL",color:"#374151",bg:"#f3f4f6"},{id:5,name:"First Women Bank Limited",abbr:"FWBL",color:"#7c3aed",bg:"#f5f3ff"},{id:6,name:"Habib Bank Limited",abbr:"HBL",color:"#006633",bg:"#e6f4ed"},{id:7,name:"United Bank Limited",abbr:"UBL",color:"#003087",bg:"#e8eef8"},{id:8,name:"MCB Bank Limited",abbr:"MCB",color:"#c8102e",bg:"#fce8ec"},{id:9,name:"Allied Bank Limited",abbr:"ABL",color:"#b8860b",bg:"#fdf6e3"},{id:10,name:"Bank Alfalah Limited",abbr:"BAFL",color:"#c8102e",bg:"#fce8ec"},{id:11,name:"Bank Al Habib Limited",abbr:"BAHL",color:"#00703c",bg:"#e6f4ed"},{id:12,name:"Askari Bank Limited",abbr:"AKBL",color:"#004225",bg:"#e6f0ea"},{id:13,name:"Habib Metropolitan Bank Limited",abbr:"HMB",color:"#1a3c6e",bg:"#eaf0f8"},{id:14,name:"Soneri Bank Limited",abbr:"SNBL",color:"#8b0000",bg:"#fce8e8"},{id:15,name:"JS Bank Limited",abbr:"JSBL",color:"#d4380d",bg:"#fff2ed"},{id:16,name:"Samba Bank Limited",abbr:"SAMB",color:"#d4001c",bg:"#fce8e8"},{id:17,name:"Silkbank Limited",abbr:"SILK",color:"#7c3aed",bg:"#f5f3ff"},{id:18,name:"Summit Bank Limited",abbr:"SMBL",color:"#374151",bg:"#f3f4f6"},{id:19,name:"Meezan Bank Limited",abbr:"MEBL",color:"#1a5276",bg:"#eaf0f8"},{id:20,name:"Faysal Bank Limited",abbr:"FABL",color:"#7b3f00",bg:"#f5ece4"},{id:21,name:"BankIslami Pakistan Limited",abbr:"BIPL",color:"#065f46",bg:"#f0fdf4"},{id:22,name:"Dubai Islamic Bank Pakistan Limited",abbr:"DIBPL",color:"#c8102e",bg:"#fce8ec"},{id:23,name:"Al Baraka Bank (Pakistan) Limited",abbr:"ABPL",color:"#2d6a4f",bg:"#e6f4ed"},{id:24,name:"MCB Islamic Bank Limited",abbr:"MIBL",color:"#c8102e",bg:"#fce8ec"},{id:25,name:"Standard Chartered Bank (Pakistan) Limited",abbr:"SCBPL",color:"#0e5c96",bg:"#e8f0f8"},{id:26,name:"Bank Makramah Limited",abbr:"BML",color:"#374151",bg:"#f3f4f6"}],N=new Set(["bank","limited","pakistan","the","of","al","islamic","metropolitan"]);function w(c){if(!c)return{abbr:"BNK",color:"#374151",bg:"#f3f4f6"};const i=c.toLowerCase().trim();for(const t of q){const m=t.abbr.toLowerCase();if(new RegExp(`(^|[^a-z])${m}($|[^a-z])`).test(i))return{abbr:t.abbr,color:t.color,bg:t.bg};const b=t.name.toLowerCase().split(/\s+/).filter(o=>o.length>5&&!N.has(o));if(b.length>0&&b.some(o=>i.includes(o)))return{abbr:t.abbr,color:t.color,bg:t.bg}}return{abbr:c.split(/\s+/).filter(t=>t.length>1&&!N.has(t.toLowerCase())).map(t=>t[0].toUpperCase()).join("").slice(0,5)||"BNK",color:"#374151",bg:"#f3f4f6"}}function S({name:c,logoIndex:i,size:d=28}){const t=w(c),[m,b]=I.useState(!0);return i&&m?e.jsx("img",{src:`/${i}.png`,alt:t.abbr,style:{width:d,height:d,objectFit:"contain",borderRadius:Math.round(d*.25),border:"1px solid #e5e7eb",background:"#fff",padding:2,flexShrink:0},onError:()=>b(!1)}):e.jsx("div",{style:{width:d,height:d,borderRadius:Math.round(d*.25),flexShrink:0,background:t.bg,border:`1px solid ${t.color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:d*.27,fontWeight:700,color:t.color,fontFamily:"'DM Mono',monospace"},children:t.abbr.slice(0,3)})}function E({options:c,value:i,onChange:d,placeholder:t,renderOption:m,renderSelected:b}){const[o,s]=l.useState(!1),[r,j]=l.useState(""),[x,y]=l.useState({top:0,left:0,width:0}),f=l.useRef(null),g=l.useRef(null);l.useEffect(()=>{const n=a=>{if(!o)return;const p=document.getElementById("ccb-dd-portal");f.current&&!f.current.contains(a.target)&&(!p||!p.contains(a.target))&&s(!1)};return document.addEventListener("mousedown",n),()=>document.removeEventListener("mousedown",n)},[o]),l.useEffect(()=>{o&&setTimeout(()=>g.current?.focus(),0)},[o]),l.useEffect(()=>{if(!o)return;const n=()=>{const a=f.current?.getBoundingClientRect();a&&y({top:a.bottom+4,left:a.left,width:a.width})};return n(),window.addEventListener("scroll",n,!0),window.addEventListener("resize",n),()=>{window.removeEventListener("scroll",n,!0),window.removeEventListener("resize",n)}},[o]);const k=c.filter(n=>JSON.stringify(n).toLowerCase().includes(r.toLowerCase())),h=c.find(n=>n._id===i||n.value===i);return e.jsxs(e.Fragment,{children:[e.jsxs("button",{ref:f,type:"button",className:`ccb-dd-btn${o?" open":""}`,onClick:()=>s(n=>!n),children:[e.jsx("span",{style:{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textAlign:"left",color:h?"#111827":"#9ca3af"},children:h?b?b(h):h.label||h.accountName:e.jsx("span",{style:{fontStyle:"italic"},children:t})}),e.jsx("svg",{width:10,height:10,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2.5,style:{flexShrink:0,transition:".15s",transform:o?"rotate(180deg)":"none"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),o&&e.jsxs("div",{id:"ccb-dd-portal",style:{position:"fixed",top:x.top,left:x.left,width:Math.max(x.width,280),zIndex:9999,background:"#fff",border:"1px solid #d1d5db",borderRadius:8,boxShadow:"0 4px 16px rgba(0,0,0,.12)",overflow:"hidden"},children:[e.jsx("div",{style:{padding:6,borderBottom:"1px solid #f3f4f6",background:"#f9fafb"},children:e.jsx("input",{ref:g,value:r,onChange:n=>j(n.target.value),placeholder:"Search…",style:{width:"100%",padding:"6px 9px",border:"1px solid #e5e7eb",borderRadius:5,fontSize:12.5,outline:"none",fontFamily:"'DM Sans',sans-serif"}})}),e.jsx("ul",{style:{maxHeight:210,overflowY:"auto",margin:0,padding:0,listStyle:"none"},children:k.length===0?e.jsx("li",{style:{padding:"9px 12px",fontSize:12.5,color:"#9ca3af",textAlign:"center"},children:"No results"}):k.map(n=>e.jsx("li",{className:`ccb-dd-item${(n._id||n.value)===i?" sel":""}`,onClick:()=>{d(n),s(!1),j("")},children:m?m(n):n.label||n.accountName},n._id||n.value))})]})]})}function L({dot:c,title:i}){return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7},children:[e.jsx("div",{style:{width:7,height:7,borderRadius:"50%",background:c,flexShrink:0}}),e.jsx("span",{style:{fontSize:10.5,fontWeight:700,color:"#374151",textTransform:"uppercase",letterSpacing:".08em"},children:i})]})}function W(){const c=M(),[i,d]=l.useState([]),[t,m]=l.useState(!1),[b,o]=l.useState({message:"",type:"info"}),[s,r]=l.useState({bankAccountId:"",bankAccountName:"",branchName:"",branchCode:"",accountNumber:"",iban:"",accountTitle:"",startLeaf:"00000001",endLeaf:"00000100"});l.useEffect(()=>{v(`${B}/accounts?category=Bank`).then(n=>n.json()).then(n=>{const a=Array.isArray(n)?n:n.accounts||[],p=a.filter(u=>!u.isProtected&&!u.isProductAccount&&u.category==="Bank");d(p.length>0?p:a.filter(u=>!u.isProtected&&!u.isProductAccount&&u.accountType==="Assets"&&u.subAccountType==="Current Assets"))})},[]);const j=Math.max(s.startLeaf.length,s.endLeaf.length,8),x=parseInt(s.startLeaf)||0,y=parseInt(s.endLeaf)||0,f=y>x?y-x+1:0,g=i.find(n=>n._id===s.bankAccountId),k=n=>{const a=parseInt(n);return isNaN(a)?n:String(a).padStart(j,"0")},h=async n=>{if(n.preventDefault(),!s.bankAccountId)return o({message:"Please select a bank account.",type:"error"});if(f<=0)return o({message:"End leaf must be greater than start leaf.",type:"error"});if(f>500)return o({message:"Maximum 500 leaves per cheque book.",type:"error"});m(!0);const a=await v(`${B}/cheque-books`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),p=await a.json();m(!1),a.ok?(o({message:`Cheque book ${p.chequeBook.chequeBookId} created!`,type:"success"}),setTimeout(()=>c("/cheque-book/view"),1400)):o({message:p.message||"Failed to create.",type:"error"})};return e.jsxs(C,{children:[e.jsxs("style",{children:[z,T]}),e.jsx(A,{message:b.message,type:b.type,onClose:()=>o({message:"",type:"info"})}),e.jsx(P,{active:"create-book"}),e.jsxs("div",{className:"ccb",children:[e.jsxs("div",{style:{marginBottom:16},children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"Cheque Management"}),e.jsx("h1",{style:{margin:0,fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px"},children:"Create New Cheque Book"})]}),e.jsxs("form",{onSubmit:h,children:[e.jsxs("div",{className:"ccb-section",children:[e.jsx("div",{className:"ccb-section-head",children:e.jsx(L,{dot:"#3b82f6",title:"Bank Account"})}),e.jsx("div",{className:"ccb-section-body",children:e.jsxs("div",{children:[e.jsxs("label",{className:"ccb-lbl",children:["Select Bank Account ",e.jsx("em",{children:"*"})]}),e.jsx(E,{options:i,value:s.bankAccountId,placeholder:"Search and select bank account…",onChange:n=>r(a=>({...a,bankAccountId:n._id,bankAccountName:n.accountName,bankLogoIndex:n.bankLogoIndex||null})),renderOption:n=>{const a=w(n.accountName);return e.jsxs(e.Fragment,{children:[e.jsx(S,{name:n.accountName,logoIndex:n.bankLogoIndex}),e.jsxs("div",{style:{minWidth:0},children:[e.jsxs("div",{style:{fontWeight:700,fontSize:12.5,color:"#111827"},children:[e.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:10,color:a.color,fontWeight:700,marginRight:5},children:["[",a.abbr,"]"]}),n.accountName]}),n.remarkNote&&e.jsx("div",{style:{fontSize:10.5,color:"#9ca3af",marginTop:1},children:n.remarkNote})]})]})},renderSelected:n=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx(S,{name:n.accountName,logoIndex:n.bankLogoIndex,size:22}),e.jsx("span",{style:{fontWeight:600},children:n.accountName})]})}),g&&e.jsxs("div",{style:{marginTop:7,padding:"7px 11px",background:"#f0fdf4",borderRadius:6,border:"1px solid #bbf7d0",fontSize:12.5,color:"#15803d",fontWeight:500},children:["Balance: ",e.jsxs("strong",{children:["PKR ",Number(g.balance||0).toLocaleString("en-PK",{minimumFractionDigits:2})]})]})]})})]}),e.jsxs("div",{className:"ccb-section",children:[e.jsx("div",{className:"ccb-section-head",children:e.jsx(L,{dot:"#f59e0b",title:"Branch Details"})}),e.jsx("div",{className:"ccb-section-body",children:e.jsxs("div",{className:"ccb-g2",children:[e.jsxs("div",{children:[e.jsxs("label",{className:"ccb-lbl",children:["Branch Name ",e.jsx("em",{children:"*"})]}),e.jsx("input",{className:"ccb-inp",placeholder:"e.g. Main Branch Lahore",value:s.branchName,onChange:n=>r(a=>({...a,branchName:n.target.value})),required:!0})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"ccb-lbl",children:["Branch Code ",e.jsx("em",{children:"*"})]}),e.jsx("input",{className:"ccb-inp mono",placeholder:"e.g. 0296",value:s.branchCode,onChange:n=>r(a=>({...a,branchCode:n.target.value})),required:!0})]})]})})]}),e.jsxs("div",{className:"ccb-section",children:[e.jsx("div",{className:"ccb-section-head",children:e.jsx(L,{dot:"#10b981",title:"Account Information"})}),e.jsxs("div",{className:"ccb-section-body",children:[e.jsxs("div",{children:[e.jsxs("label",{className:"ccb-lbl",children:["Account Title ",e.jsx("em",{children:"*"})]}),e.jsx("input",{className:"ccb-inp",placeholder:"e.g. AL REHMAN RICE MILLS (PVT) LTD",value:s.accountTitle,onChange:n=>r(a=>({...a,accountTitle:n.target.value})),required:!0})]}),e.jsxs("div",{className:"ccb-g2",children:[e.jsxs("div",{children:[e.jsxs("label",{className:"ccb-lbl",children:["Account Number ",e.jsx("em",{children:"*"})]}),e.jsx("input",{className:"ccb-inp mono",placeholder:"0000000000000",value:s.accountNumber,onChange:n=>r(a=>({...a,accountNumber:n.target.value})),required:!0})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"ccb-lbl",children:["IBAN ",e.jsx("em",{children:"*"})]}),e.jsx("input",{className:"ccb-inp mono",placeholder:"PK36HABB0000296701869503",value:s.iban,onChange:n=>r(a=>({...a,iban:n.target.value.toUpperCase()})),required:!0})]})]})]})]}),e.jsxs("div",{className:"ccb-section",children:[e.jsx("div",{className:"ccb-section-head",children:e.jsx(L,{dot:"#8b5cf6",title:"Cheque Leaf Range"})}),e.jsxs("div",{className:"ccb-section-body",children:[e.jsxs("div",{className:"ccb-leaf-row",children:[e.jsxs("div",{children:[e.jsxs("label",{className:"ccb-lbl",children:["Start Leaf ",e.jsx("em",{children:"*"})]}),e.jsx("input",{className:"ccb-inp mono",value:s.startLeaf,onChange:n=>r(a=>({...a,startLeaf:n.target.value})),onBlur:()=>r(n=>({...n,startLeaf:k(n.startLeaf)})),required:!0})]}),e.jsx("div",{className:"ccb-leaf-sep",children:"→"}),e.jsxs("div",{children:[e.jsxs("label",{className:"ccb-lbl",children:["End Leaf ",e.jsx("em",{children:"*"})]}),e.jsx("input",{className:"ccb-inp mono",value:s.endLeaf,onChange:n=>r(a=>({...a,endLeaf:n.target.value})),onBlur:()=>r(n=>({...n,endLeaf:k(n.endLeaf)})),required:!0})]})]}),f>0&&e.jsxs("div",{className:"ccb-preview",children:[e.jsxs("span",{style:{fontSize:12,color:"#15803d",fontWeight:600,display:"flex",alignItems:"center",gap:6},children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"#15803d",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})}),"Total Cheque Leaves"]}),e.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:14,fontWeight:700,color:"#15803d"},children:[f," leaves"]})]})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:8,marginTop:4},children:[e.jsx("button",{type:"button",className:"ccb-cancel",onClick:()=>c("/cheque-book/view"),children:"Cancel"}),e.jsx("button",{type:"submit",className:"ccb-submit",disabled:t||f<=0||!s.bankAccountId,children:t?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ccb-spin",children:"⟳"})," Creating…"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})," Create Cheque Book"]})})]})]})]})]})}export{W as default};
