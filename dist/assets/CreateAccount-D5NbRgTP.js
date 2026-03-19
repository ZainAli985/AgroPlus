import{j as e,S as K,N as q,a as Y,A as U}from"./index-ntoxUl7D.js";import{b as o}from"./react-BBT0yyZ1.js";const _="@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",V=`
  .ca2 *, .ca2 *::before, .ca2 *::after { box-sizing: border-box; }
  .ca2 { font-family: 'DM Sans', sans-serif; max-width: 640px; width: 100%; margin: 0 auto; }
  .ca2-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #94a3b8; margin-bottom: 4px; }
  .ca2-title   { font-family: 'Lora', serif; font-size: 24px; font-weight: 700; color: #0f172a; letter-spacing: -.3px; line-height: 1.2; }
  .ca2-sub     { font-size: 12.5px; color: #94a3b8; margin-top: 4px; }

  .ca2-search-wrap { position: relative; margin-top: 20px; margin-bottom: 18px; }
  .ca2-search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; }
  .ca2-search {
    width: 100%; padding: 11px 14px 11px 40px;
    border: 1.5px solid #e2e8f0; border-radius: 12px;
    font-size: 13.5px; font-family: 'DM Sans', sans-serif;
    color: #0f172a; background: #fff; outline: none;
    transition: border-color .15s, box-shadow .15s;
  }
  .ca2-search::placeholder { color: #cbd5e1; }
  .ca2-search:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.1); }
  .ca2-search-clear {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: #f1f5f9; border: none; border-radius: 50%; width: 22px; height: 22px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #94a3b8; transition: background .12s, color .12s;
  }
  .ca2-search-clear:hover { background: #fee2e2; color: #ef4444; }

  .ca2-group-label {
    font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
    color: #cbd5e1; margin-bottom: 8px; margin-top: 4px;
    display: flex; align-items: center; gap: 8px;
  }
  .ca2-group-label::after { content:''; flex:1; height:1px; background:#f1f5f9; }

  .ca2-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 8px; margin-bottom: 6px; }

  .ca2-card {
    display: flex; flex-direction: column; align-items: flex-start;
    padding: 13px 14px 11px; border-radius: 12px; cursor: pointer;
    border: 1.5px solid #e2e8f0; background: #fff;
    transition: border-color .15s, box-shadow .15s, transform .1s;
    text-align: left; font-family: 'DM Sans', sans-serif;
    position: relative; overflow: hidden;
  }
  .ca2-card:hover { border-color: #a5b4fc; box-shadow: 0 4px 14px rgba(99,102,241,.1); transform: translateY(-1px); }
  .ca2-card.selected { border-color: #6366f1; background: #eef2ff; box-shadow: 0 0 0 3px rgba(99,102,241,.12); }
  .ca2-card-icon  { font-size: 22px; margin-bottom: 8px; line-height: 1; }
  .ca2-card-name  { font-size: 12.5px; font-weight: 700; color: #0f172a; line-height: 1.3; }
  .ca2-card.selected .ca2-card-name { color: #4338ca; }
  .ca2-card-badge { margin-top: 5px; font-size: 9.5px; font-weight: 700; padding: 2px 7px; border-radius: 20px; letter-spacing: .04em; }
  .ca2-card-check { position: absolute; top: 8px; right: 8px; color: #6366f1; opacity: 0; transition: opacity .15s; }
  .ca2-card.selected .ca2-card-check { opacity: 1; }
  .ca2-card.match { order: -1; border-color: #6366f1; background: #fafafe; }
  .ca2-card.match:hover { border-color: #4f46e5; }
  .ca2-no-results { grid-column: 1/-1; text-align: center; padding: 32px; font-size: 13px; color: #cbd5e1; font-style: italic; }

  .badge-assets      { background: #dbeafe; color: #1d4ed8; }
  .badge-liabilities { background: #fee2e2; color: #b91c1c; }
  .badge-equity      { background: #ede9fe; color: #6d28d9; }
  .badge-revenue     { background: #d1fae5; color: #065f46; }
  .badge-expense     { background: #ffedd5; color: #c2410c; }

  .ca2-form {
    margin-top: 18px; background: #fff;
    border: 1.5px solid #e2e8f0; border-radius: 14px; overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,.05);
    animation: ca2Slide .18s cubic-bezier(.4,0,.2,1) both;
  }
  @keyframes ca2Slide { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
  .ca2-strip { display: flex; align-items: center; gap: 6px; padding: 8px 16px; border-bottom: 1px solid #f1f5f9; background: #f8fafc; }
  .ca2-strip-pill { font-size: 11px; font-weight: 700; padding: 2px 9px; border-radius: 20px; }
  .ca2-strip-sep  { color: #e2e8f0; font-size: 12px; }
  .ca2-strip-auto { font-size: 10.5px; color: #c7d2fe; font-style: italic; margin-left: auto; }
  .ca2-form-body  { padding: 16px; display: flex; flex-direction: column; gap: 14px; }

  .ca2-lbl { display: block; font-size: 11.5px; font-weight: 700; color: #475569; margin-bottom: 5px; letter-spacing: .01em; }
  .ca2-lbl em    { color: #ef4444; font-style: normal; margin-left: 2px; }
  .ca2-lbl small { color: #94a3b8; font-weight: 400; font-size: 11px; margin-left: 4px; }

  .ca2-inp {
    width: 100%; padding: 9px 13px; border-radius: 9px;
    border: 1.5px solid #e2e8f0; font-size: 13.5px; color: #0f172a;
    font-family: 'DM Sans', sans-serif; background: #fff;
    outline: none; transition: border-color .15s, box-shadow .15s;
  }
  .ca2-inp::placeholder { color: #cbd5e1; }
  .ca2-inp:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.1); }
  .ca2-inp.mono { font-family: 'DM Mono', monospace; font-size: 13px; }

  .ca2-note-box {
    background: #f8fafc; border: 1.5px solid #ede9fe; border-radius: 10px;
    padding: 12px 13px; display: flex; flex-direction: column; gap: 7px;
  }
  .ca2-note-hint    { font-size: 10.5px; color: #94a3b8; font-style: italic; }
  .ca2-note-preview { font-size: 11px; color: #6366f1; font-weight: 700; }

  .ca2-preview {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 13px; background: #f8fafc; border-radius: 9px; border: 1.5px solid #e2e8f0;
  }
  .ca2-preview-icon { font-size: 22px; flex-shrink: 0; }
  .ca2-preview-name { font-family: 'Lora', serif; font-size: 15px; font-weight: 600; color: #0f172a; font-style: italic; }
  .ca2-preview-meta { font-size: 11px; color: #94a3b8; margin-top: 1px; }
  .ca2-preview-ref  { font-family: 'DM Mono', monospace; font-size: 11px; color: #6366f1; background: #eef2ff; padding: 1px 6px; border-radius: 5px; margin-top: 3px; display: inline-block; }

  .ca2-form-foot { padding: 12px 16px; border-top: 1px solid #f1f5f9; background: #fafafa; display: flex; justify-content: flex-end; gap: 8px; }
  .ca2-btn-primary {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 20px; border-radius: 9px; border: none; cursor: pointer;
    background: #4f46e5; color: #fff; font-size: 12.5px; font-weight: 700;
    font-family: 'DM Sans', sans-serif; box-shadow: 0 2px 8px rgba(79,70,229,.25); transition: background .14s;
  }
  .ca2-btn-primary:hover:not(:disabled) { background: #4338ca; }
  .ca2-btn-primary:disabled { opacity: .45; cursor: not-allowed; }
  .ca2-btn-ghost {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 16px; border-radius: 9px; border: 1.5px solid #e2e8f0;
    cursor: pointer; background: #fff; color: #64748b; font-size: 12.5px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; transition: all .12s;
  }
  .ca2-btn-ghost:hover { border-color: #94a3b8; color: #334155; }
  @keyframes ca2-spin { to { transform: rotate(360deg); } }
  .ca2-spin { animation: ca2-spin .8s linear infinite; display: inline-block; }

  .ca2-ob-toggle {
    display: inline-flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 600;
    color: #4f46e5; cursor: pointer; border: 1.5px dashed #c7d2fe; border-radius: 8px;
    padding: 6px 12px; background: #f5f3ff; transition: all .14s; user-select: none;
  }
  .ca2-ob-toggle:hover { background: #eef2ff; border-color: #818cf8; }
  .ca2-ob-section { background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 12px; }
  .ca2-ob-label { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 5px; }
  .ca2-ob-amount { width: 100%; padding: 9px 13px; border-radius: 9px; border: 1.5px solid #e2e8f0; font-size: 14px; color: #0f172a; font-family: 'DM Mono', monospace; background: #fff; outline: none; transition: border-color .15s; }
  .ca2-ob-amount:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.1); }
  .ca2-ob-amount::placeholder { color: #cbd5e1; }
  .ca2-ob-type-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .ca2-ob-type-btn { padding: 9px 12px; border-radius: 9px; border: 1.5px solid #e2e8f0; background: #fff; font-size: 12.5px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .14s; text-align: center; color: #94a3b8; }
  .ca2-ob-type-btn.debit-active  { background:#fff7ed; border-color:#fed7aa; color:#c2410c; }
  .ca2-ob-type-btn.credit-active { background:#f0fdf4; border-color:#bbf7d0; color:#065f46; }
  .ca2-ob-type-btn:hover:not(.debit-active):not(.credit-active) { border-color:#94a3b8; color:#475569; }
  .ca2-ob-preview { display: flex; gap: 10px; flex-wrap: wrap; padding: 8px 12px; background: #fff; border-radius: 8px; border: 1px solid #f1f5f9; }
  .ca2-ob-preview-item { font-size: 11.5px; font-family: 'DM Mono', monospace; }
  .ca2-ob-preview-item span { font-weight: 700; }
  .ca2-ob-preview-item .dr { color: #c2410c; }
  .ca2-ob-preview-item .cr { color: #065f46; }
  .ca2-ob-preview-item .bal-neg { color: #dc2626; }
  .ca2-ob-preview-item .bal-pos { color: #059669; }
  @media(max-width:480px){ .ca2-grid { grid-template-columns: repeat(auto-fill, minmax(120px,1fr)); } }
`,P=[{label:"Bank",accountType:"Assets",subAccountType:"Current Assets",icon:"🏦",badgeClass:"badge-assets"},{label:"Customer",accountType:"Assets",subAccountType:"Current Assets",icon:"👤",badgeClass:"badge-assets"},{label:"Inventory",accountType:"Assets",subAccountType:"Current Assets",icon:"📦",badgeClass:"badge-assets"},{label:"Loan Given",accountType:"Assets",subAccountType:"Current Assets",icon:"💳",badgeClass:"badge-assets"},{label:"Building",accountType:"Assets",subAccountType:"Fixed Assets",icon:"🏢",badgeClass:"badge-assets"},{label:"Vehicle",accountType:"Assets",subAccountType:"Fixed Assets",icon:"🚛",badgeClass:"badge-assets"},{label:"Equipment",accountType:"Assets",subAccountType:"Fixed Assets",icon:"⚙️",badgeClass:"badge-assets"},{label:"Tool",accountType:"Assets",subAccountType:"Fixed Assets",icon:"🔧",badgeClass:"badge-assets"},{label:"Furniture",accountType:"Assets",subAccountType:"Fixed Assets",icon:"🪑",badgeClass:"badge-assets"},{label:"Employee",accountType:"Liabilities",subAccountType:"Current Liabilities",icon:"👷",badgeClass:"badge-liabilities"},{label:"Supplier",accountType:"Liabilities",subAccountType:"Current Liabilities",icon:"🏭",badgeClass:"badge-liabilities"},{label:"Loan Taken",accountType:"Liabilities",subAccountType:"Current Liabilities",icon:"🏦",badgeClass:"badge-liabilities"},{label:"Tax Payable",accountType:"Liabilities",subAccountType:"Current Liabilities",icon:"🧾",badgeClass:"badge-liabilities"},{label:"Accrued Expenses",accountType:"Liabilities",subAccountType:"Current Liabilities",icon:"📝",badgeClass:"badge-liabilities"},{label:"Installments",accountType:"Liabilities",subAccountType:"Fixed Liabilities",icon:"📅",badgeClass:"badge-liabilities"},{label:"Investor",accountType:"Equity",subAccountType:"Equity",icon:"💼",badgeClass:"badge-equity"},{label:"Shareholder's Account",accountType:"Equity",subAccountType:"Shareholders Account",icon:"📊",badgeClass:"badge-equity"},{label:"Other Income",accountType:"Revenue",subAccountType:"Revenue",icon:"📈",badgeClass:"badge-revenue"},{label:"Expense",accountType:"Expense",subAccountType:"Expenses",icon:"💸",badgeClass:"badge-expense"}],J=["Assets","Liabilities","Equity","Revenue","Expense"],G={Bank:"e.g. HBL Current Account",Customer:"e.g. Ahmed Traders",Supplier:"e.g. Ali Rice Mills",Employee:"e.g. Usman – Loader",Vehicle:"e.g. Truck LEA-1234",Building:"e.g. Warehouse – Main Gate",Expense:"e.g. Electricity Bill",Inventory:"e.g. Paddy Stock"},Q=[{id:1,name:"National Bank of Pakistan",abbr:"NBP"},{id:2,name:"The Bank of Punjab",abbr:"BOP"},{id:3,name:"The Bank of Khyber",abbr:"BOK"},{id:4,name:"Sindh Bank Limited",abbr:"SBL"},{id:5,name:"First Women Bank Limited",abbr:"FWB"},{id:6,name:"Habib Bank Limited",abbr:"HBL"},{id:7,name:"United Bank Limited",abbr:"UBL"},{id:8,name:"MCB Bank Limited",abbr:"MCB"},{id:9,name:"Allied Bank Limited",abbr:"ABL"},{id:10,name:"Bank Alfalah Limited",abbr:"BAFL"},{id:11,name:"Bank Al Habib Limited",abbr:"BAHL"},{id:12,name:"Askari Bank Limited",abbr:"ASKARI"},{id:13,name:"Habib Metropolitan Bank Limited",abbr:"HabibMet"},{id:14,name:"Soneri Bank Limited",abbr:"SNR"},{id:15,name:"JS Bank Limited",abbr:"JS"},{id:16,name:"Samba Bank Limited",abbr:"SAMBA"},{id:17,name:"Silkbank Limited",abbr:"SILK"},{id:18,name:"Summit Bank Limited",abbr:"SMBL"},{id:19,name:"Meezan Bank Limited",abbr:"MBL"},{id:20,name:"Faysal Bank Limited",abbr:"FAY"},{id:21,name:"BankIslami Pakistan Limited",abbr:"BIPL"},{id:22,name:"Dubai Islamic Bank Pakistan",abbr:"DIBP"},{id:23,name:"Al Baraka Bank (Pakistan)",abbr:"ABB"},{id:24,name:"MCB Islamic Bank Limited",abbr:"MCBI"},{id:25,name:"Standard Chartered Bank",abbr:"SCB"},{id:26,name:"Bank Makramah Limited",abbr:"BMK"}];function X({selectedBank:n,setSelectedBank:u,bankSearch:t,setBankSearch:y,accountName:p,setAccountName:x,nameRef:m}){const[l,d]=o.useState(!1),b=o.useRef(null),i=o.useRef(null);o.useEffect(()=>{const s=c=>{b.current&&!b.current.contains(c.target)&&d(!1)};return document.addEventListener("mousedown",s),()=>document.removeEventListener("mousedown",s)},[]),o.useEffect(()=>{l&&setTimeout(()=>i.current?.focus(),0)},[l]);const g=Q.filter(s=>s.name.toLowerCase().includes(t.toLowerCase())||s.abbr.toLowerCase().includes(t.toLowerCase()));return e.jsxs("div",{ref:b,style:{position:"relative"},children:[e.jsxs("button",{type:"button",onClick:()=>d(s=>!s),style:{width:"100%",padding:"9px 13px",borderRadius:9,border:`1.5px solid ${l?"#6366f1":"#e2e8f0"}`,background:"#fff",cursor:"pointer",outline:"none",fontFamily:"'DM Sans',sans-serif",fontSize:13.5,color:n?"#0f172a":"#94a3b8",display:"flex",alignItems:"center",gap:10,transition:".12s",boxShadow:l?"0 0 0 3px rgba(99,102,241,.1)":"none"},children:[n?e.jsxs(e.Fragment,{children:[e.jsx("img",{src:`/${n.id}.png`,alt:n.abbr,style:{width:22,height:22,objectFit:"contain",borderRadius:4,flexShrink:0},onError:s=>{s.currentTarget.style.display="none"}}),e.jsx("span",{style:{flex:1,textAlign:"left",fontWeight:600},children:n.name}),e.jsx("span",{style:{fontSize:10,color:"#94a3b8",fontWeight:700,letterSpacing:".06em"},children:n.abbr})]}):e.jsx("span",{style:{fontStyle:"italic"},children:"Search and select bank…"}),e.jsx("svg",{width:10,height:10,fill:"none",viewBox:"0 0 24 24",stroke:"#94a3b8",strokeWidth:2.5,style:{flexShrink:0,transition:".15s",transform:l?"rotate(180deg)":"none"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),l&&e.jsxs("div",{style:{position:"absolute",left:0,top:"calc(100% + 4px)",width:"100%",zIndex:500,background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,boxShadow:"0 12px 32px rgba(0,0,0,.14)",overflow:"hidden"},children:[e.jsx("div",{style:{padding:8,borderBottom:"1px solid #f1f5f9"},children:e.jsx("input",{ref:i,value:t,onChange:s=>y(s.target.value),placeholder:"Search bank name or abbreviation…",style:{width:"100%",padding:"7px 10px",border:"1px solid #e2e8f0",borderRadius:7,fontSize:13,outline:"none",fontFamily:"'DM Sans',sans-serif"}})}),e.jsx("ul",{style:{maxHeight:230,overflowY:"auto",margin:0,padding:0,listStyle:"none"},children:g.length===0?e.jsx("li",{style:{padding:"12px",fontSize:13,color:"#94a3b8",textAlign:"center"},children:"No banks found"}):g.map(s=>e.jsxs("li",{onClick:()=>{u(s),p.trim()||x(s.name),d(!1),y(""),setTimeout(()=>m.current?.focus(),50)},style:{padding:"9px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,fontSize:13.5,background:n?.id===s.id?"#eef2ff":"transparent",fontWeight:n?.id===s.id?700:400,color:"#1e293b",borderBottom:"1px solid #f8fafc"},onMouseEnter:c=>{n?.id!==s.id&&(c.currentTarget.style.background="#f8fafc")},onMouseLeave:c=>{n?.id!==s.id&&(c.currentTarget.style.background="transparent")},children:[e.jsx("img",{src:`/${s.id}.png`,alt:s.abbr,style:{width:22,height:22,objectFit:"contain",borderRadius:4,flexShrink:0},onError:c=>{c.currentTarget.style.display="none"}}),e.jsx("span",{style:{flex:1},children:s.name}),e.jsx("span",{style:{fontSize:10,color:"#94a3b8",fontWeight:700,letterSpacing:".06em"},children:s.abbr})]},s.id))})]})]})}function ae(){const[n,u]=o.useState(""),[t,y]=o.useState(null),[p,x]=o.useState(""),[m,l]=o.useState(""),[d,b]=o.useState(""),[i,g]=o.useState(null),[s,c]=o.useState(""),[C,w]=o.useState(!1),[h,S]=o.useState(""),[k,A]=o.useState("debit"),[B,M]=o.useState(!1),[z,N]=o.useState({message:"",type:"info"}),$=o.useRef(null),T=o.useRef(null),R=o.useRef(null);o.useEffect(()=>{t&&setTimeout(()=>{T.current?.focus(),R.current?.scrollIntoView({behavior:"smooth",block:"nearest"})},80)},[t]);const j=n.trim().toLowerCase(),L=j?P.filter(a=>a.label.toLowerCase().includes(j)):[],W=!j,O=J.map(a=>({type:a,items:P.filter(r=>r.accountType===a)})).filter(a=>a.items.length>0),E=t&&p.trim()&&(t.label!=="Bank"||i),D=()=>{y(null),x(""),l(""),b(""),g(null),c(""),w(!1),S(""),A("debit")},F=a=>{y(a),x(""),l(""),b(""),g(null),c(""),w(!1),S(""),A("debit")},H=async a=>{if(a.preventDefault(),!!E){M(!0);try{const r=t.accountType==="Cash"?"Assets":t.accountType,f=await Y(`${U}/create-account`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({accountType:r,subAccountType:t.subAccountType,accountName:p.trim(),LedgerRef:m.trim(),category:t.label,bankLogoIndex:i?.id??null,remarkNote:d.trim(),openingBalance:C&&h?Number(h):0,openingBalanceType:C&&h?k:""})}),v=await f.json();f.ok?(N({message:v.message||"Account created!",type:"success"}),u(""),D()):N({message:v.message||"Failed to create account.",type:"error"})}catch{N({message:"Server error. Try again.",type:"error"})}finally{M(!1)}}},I=({acct:a,highlight:r})=>{const f=t?.label===a.label&&t?.subAccountType===a.subAccountType;return e.jsxs("button",{type:"button",className:`ca2-card${f?" selected":""}${r?" match":""}`,onClick:()=>F(a),children:[e.jsx("span",{className:"ca2-card-icon",children:a.icon}),e.jsx("span",{className:"ca2-card-name",children:a.label}),e.jsx("span",{className:`ca2-card-badge ${a.badgeClass}`,children:a.accountType}),e.jsx("span",{className:"ca2-card-check",children:e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})})]})};return e.jsxs(K,{children:[e.jsxs("style",{children:[_,V]}),e.jsx(q,{message:z.message,type:z.type,onClose:()=>N({message:"",type:"info"})}),e.jsxs("div",{className:"ca2",children:[e.jsxs("div",{style:{marginBottom:6},children:[e.jsx("p",{className:"ca2-eyebrow",children:"Accounts"}),e.jsx("h1",{className:"ca2-title",children:"Create New Account"}),e.jsx("p",{className:"ca2-sub",children:"Pick a category — type & sub-type fill automatically"})]}),e.jsxs("div",{className:"ca2-search-wrap",children:[e.jsx("span",{className:"ca2-search-icon",children:e.jsx("svg",{width:14,height:14,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"})})}),e.jsx("input",{ref:$,className:"ca2-search",placeholder:"Search account types…",value:n,onChange:a=>u(a.target.value),onKeyDown:a=>{a.key==="Escape"&&u(""),a.key==="Enter"&&L.length===1&&F(L[0])}}),j&&e.jsx("button",{className:"ca2-search-clear",onClick:()=>u(""),title:"Clear",children:e.jsx("svg",{width:9,height:9,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:3,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})})]}),j&&e.jsx("div",{className:"ca2-grid",children:L.length===0?e.jsxs("div",{className:"ca2-no-results",children:['No results for "',n,'"']}):L.map(a=>e.jsx(I,{acct:a,highlight:!0},`${a.label}-${a.subAccountType}`))}),W&&O.map(a=>e.jsxs("div",{children:[e.jsx("div",{className:"ca2-group-label",children:a.type}),e.jsx("div",{className:"ca2-grid",children:a.items.map(r=>e.jsx(I,{acct:r,highlight:!1},`${r.label}-${r.subAccountType}`))})]},a.type)),t&&e.jsxs("div",{className:"ca2-form",ref:R,children:[e.jsxs("div",{className:"ca2-strip",children:[e.jsx("span",{className:`ca2-strip-pill ${t.badgeClass}`,children:t.accountType}),e.jsx("span",{className:"ca2-strip-sep",children:"›"}),e.jsx("span",{className:"ca2-strip-pill",style:{background:"#f1f5f9",color:"#475569"},children:t.subAccountType}),e.jsx("span",{className:"ca2-strip-auto",children:"auto-assigned"})]}),e.jsxs("form",{onSubmit:H,children:[e.jsxs("div",{className:"ca2-form-body",children:[t.label==="Bank"&&e.jsxs("div",{children:[e.jsxs("label",{className:"ca2-lbl",children:["Select Bank ",e.jsx("em",{children:"*"})]}),e.jsx(X,{selectedBank:i,setSelectedBank:g,bankSearch:s,setBankSearch:c,accountName:p,setAccountName:x,nameRef:T})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"ca2-lbl",children:[t.label==="Bank"?"Account Title / Name":"Account Name"," ",e.jsx("em",{children:"*"})]}),e.jsx("input",{ref:T,className:"ca2-inp",value:p,onChange:a=>x(a.target.value),placeholder:t.label==="Bank"?i?`e.g. ${i.name} Current Account`:"Select bank first…":G[t.label]??`e.g. ${t.label} – Main`,required:!0})]}),e.jsxs("div",{className:"ca2-note-box",children:[e.jsxs("label",{className:"ca2-lbl",style:{marginBottom:0},children:["Special Notes ",e.jsx("small",{children:"(optional)"})]}),e.jsx("input",{className:"ca2-inp",value:d,onChange:a=>b(a.target.value),placeholder:"e.g. Lahore Branch · Main Supplier · Since 2020…",maxLength:80}),d.trim()?e.jsxs("p",{className:"ca2-note-preview",children:["Saved as: ",e.jsxs("strong",{children:[t.label," | ",p.trim()||"Account Name"," — ",d.trim()]})]}):e.jsx("p",{className:"ca2-note-hint",children:'Appended to name — shows everywhere as "Category | Name — Notes"'})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"ca2-lbl",children:["Ledger Reference ",e.jsx("small",{children:"(optional)"})]}),e.jsx("input",{className:"ca2-inp mono",value:m,onChange:a=>l(a.target.value),placeholder:"e.g. ACC-001"})]}),C?e.jsxs("div",{className:"ca2-ob-section",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsx("label",{className:"ca2-ob-label",children:"Opening Balance"}),e.jsx("button",{type:"button",onClick:()=>{w(!1),S("")},style:{background:"none",border:"none",cursor:"pointer",fontSize:11,color:"#94a3b8",fontWeight:600},children:"Remove ✕"})]}),e.jsx("input",{className:"ca2-ob-amount",type:"number",min:"0",step:"0.01",value:h,onChange:a=>S(a.target.value),placeholder:"e.g. 50000"}),e.jsxs("div",{children:[e.jsx("label",{className:"ca2-ob-label",children:"This amount is a…"}),e.jsxs("div",{className:"ca2-ob-type-row",children:[e.jsx("button",{type:"button",className:`ca2-ob-type-btn${k==="debit"?" debit-active":""}`,onClick:()=>A("debit"),children:"📥 Debit (Dr)"}),e.jsx("button",{type:"button",className:`ca2-ob-type-btn${k==="credit"?" credit-active":""}`,onClick:()=>A("credit"),children:"📤 Credit (Cr)"})]})]}),Number(h)>0&&(()=>{const a=Number(h),r=k==="debit"?a:0,f=k==="credit"?a:0,v=r-f;return e.jsxs("div",{className:"ca2-ob-preview",children:[e.jsxs("div",{className:"ca2-ob-preview-item",children:["Debit: ",e.jsxs("span",{className:"dr",children:["PKR ",r.toLocaleString()]})]}),e.jsx("div",{className:"ca2-ob-preview-item",style:{color:"#94a3b8"},children:"|"}),e.jsxs("div",{className:"ca2-ob-preview-item",children:["Credit: ",e.jsxs("span",{className:"cr",children:["PKR ",f.toLocaleString()]})]}),e.jsx("div",{className:"ca2-ob-preview-item",style:{color:"#94a3b8"},children:"|"}),e.jsxs("div",{className:"ca2-ob-preview-item",children:["Balance: ",e.jsxs("span",{className:v>=0?"bal-pos":"bal-neg",children:["PKR ",v.toLocaleString()]})]})]})})()]}):e.jsxs("button",{type:"button",className:"ca2-ob-toggle",onClick:()=>w(!0),children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4v16m8-8H4"})}),"Set Opening Balance ",e.jsx("small",{style:{fontWeight:400,color:"#94a3b8"},children:"(optional)"})]}),p.trim()&&e.jsxs("div",{className:"ca2-preview",children:[t.label==="Bank"&&i?e.jsx("img",{src:`/${i.id}.png`,alt:i.abbr,style:{width:36,height:36,objectFit:"contain",borderRadius:8,border:"1px solid #e2e8f0",background:"#fff",padding:2,flexShrink:0},onError:a=>{a.currentTarget.style.display="none"}}):e.jsx("span",{className:"ca2-preview-icon",children:t.icon}),e.jsxs("div",{children:[e.jsxs("p",{className:"ca2-preview-name",children:[p.trim(),d.trim()&&e.jsxs("span",{style:{color:"#6366f1"},children:[" — ",d.trim()]})]}),e.jsxs("p",{className:"ca2-preview-meta",children:[t.label," · ",t.accountType," · ",t.subAccountType,t.label==="Bank"&&i&&` · ${i.abbr}`]}),m.trim()&&e.jsx("span",{className:"ca2-preview-ref",children:m.trim()})]})]})]}),e.jsxs("div",{className:"ca2-form-foot",children:[e.jsx("button",{type:"button",className:"ca2-btn-ghost",onClick:D,children:"Cancel"}),e.jsx("button",{type:"submit",className:"ca2-btn-primary",disabled:!E||B,children:B?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"ca2-spin",children:e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})}),"Creating…"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})}),"Create Account"]})})]})]})]})]})]})}export{ae as default};
