import{a as s,j as e,b as Te}from"./vendor-react-CVRJsYjy.js";import{S as Pe,a as k,A as N,N as ze}from"./index-CVtmj0Eg.js";import"./vendor-react-dom-BIx1r6lP.js";import"./vendor-D8Rt7Tv7.js";const Le="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",Re=`
  *, *::before, *::after { box-sizing: border-box; }
  .pq-wrap { font-family: 'DM Sans', sans-serif; color: #111827; }
  .pq-no-spin::-webkit-inner-spin-button,
  .pq-no-spin::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  .pq-no-spin { -moz-appearance: textfield; }

  /* ── Tab nav ── */
  .pq-tabs {
    display: flex; gap: 0;
    border-bottom: 2px solid #e5e7eb;
    margin-bottom: 20px;
  }
  .pq-tab {
    padding: 9px 18px; border: none; background: none; cursor: pointer;
    font-size: 13px; font-weight: 600; font-family: 'DM Sans', sans-serif;
    color: #6b7280; border-bottom: 2.5px solid transparent; margin-bottom: -2px;
    transition: all .12s; display: flex; align-items: center; gap: 7px;
  }
  .pq-tab:hover { color: #374151; }
  .pq-tab.active { color: #111827; border-bottom-color: #111827; }
  .pq-tab-badge {
    font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 10px;
    background: #f3f4f6; color: #6b7280;
  }
  .pq-tab.active .pq-tab-badge { background: #111827; color: #fff; }

  /* ── Form panels ── */
  .pq-panel { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
  .pq-panel-head {
    padding: 9px 14px; background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    display: flex; align-items: center; gap: 8px;
  }
  .pq-panel-body { padding: 14px; display: flex; flex-direction: column; gap: 11px; }

  /* ── Inputs ── */
  .pq-inp, .pq-ro {
    width: 100%; padding: 8px 11px;
    border: 1px solid #d1d5db; border-radius: 7px;
    font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s;
  }
  .pq-inp::placeholder { color: #9ca3af; }
  .pq-inp:focus { border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12); }
  .pq-ro { background: #f9fafb; color: #6b7280; font-family: 'DM Mono', monospace; cursor: default; }
  .pq-ro.hi { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; font-weight: 600; }

  /* ── SearchDrop ── */
  .pq-sd-btn {
    width: 100%; padding: 8px 11px;
    border: 1px solid #d1d5db; border-radius: 7px;
    background: #fff; font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #9ca3af; cursor: pointer; outline: none;
    display: flex; align-items: center; justify-content: space-between; gap: 6px;
    transition: border-color .12s, box-shadow .12s;
  }
  .pq-sd-btn.sel { color: #111827; }
  .pq-sd-btn:focus, .pq-sd-btn.open { border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12); }
  .pq-sd-panel {
    position: absolute; left: 0; top: calc(100% + 3px);
    width: max(100%, 260px); z-index: 300;
    background: #fff; border: 1px solid #d1d5db;
    border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,.1); overflow: hidden;
  }
  .pq-sd-item {
    padding: 8px 12px; font-size: 13px; cursor: pointer;
    border-bottom: 1px solid #f9fafb; color: #111827; transition: background .08s;
  }
  .pq-sd-item:last-child { border-bottom: none; }
  .pq-sd-item:hover { background: #f3f4f6; }
  .pq-sd-item.sel { background: #f3f4f6; font-weight: 600; }

  /* ── Field label ── */
  .pq-lbl {
    display: flex; align-items: center; gap: 4px;
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: #6b7280; margin-bottom: 5px;
  }
  .pq-divider { height: 1px; background: #f3f4f6; margin: 2px 0; }

  /* ── Submit ── */
  .pq-submit {
    width: 100%; padding: 10px 0; border-radius: 7px; border: none;
    background: #111827; color: #fff; font-size: 13.5px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background .12s;
  }
  .pq-submit:hover:not(:disabled) { background: #1f2937; }
  .pq-submit:disabled { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; }

  /* ── View list ── */
  @keyframes pq-in { from{opacity:0;transform:translateY(3px)} to{opacity:1;transform:translateY(0)} }
  .pq-card {
    background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;
    transition: box-shadow .12s; animation: pq-in .16s ease both;
    border-left: 3px solid #f59e0b;
  }
  .pq-card:hover { box-shadow: 0 2px 10px rgba(0,0,0,.07); }
  .pq-card-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 16px; border-bottom: 1px solid #f3f4f6;
    gap: 10px; flex-wrap: wrap;
  }
  .pq-card-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; }
  .pq-cell {
    padding: 10px 14px; border-right: 1px solid #f3f4f6; border-bottom: 1px solid #f3f4f6;
  }
  .pq-cell:nth-child(4n)  { border-right: none; }
  .pq-cell:nth-last-child(-n+4) { border-bottom: none; }
  .pq-clbl { font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: #9ca3af; margin-bottom: 3px; }
  .pq-cval { font-size: 12.5px; font-weight: 600; color: #111827; }
  .pq-cval.mono { font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500; color: #374151; }
  .pq-card-foot {
    display: flex; align-items: center; justify-content: space-between;
    padding: 9px 16px; background: #fffbeb; border-top: 1px solid #fef3c7;
    gap: 10px; flex-wrap: wrap;
  }

  /* ── Buttons ── */
  .pq-btn-fulfil {
    display: inline-flex; align-items: center; gap: 6px;
    background: #111827; color: #fff; border: none;
    border-radius: 6px; padding: 6px 13px;
    font-size: 12px; font-weight: 600; font-family: 'DM Sans', sans-serif;
    cursor: pointer; transition: background .1s; white-space: nowrap;
  }
  .pq-btn-fulfil:hover { background: #1f2937; }
  .pq-btn-print {
    display: inline-flex; align-items: center; gap: 5px;
    background: #fff; color: #374151;
    border: 1px solid #d1d5db; border-radius: 6px; padding: 6px 11px;
    font-size: 12px; font-weight: 500; font-family: 'DM Sans', sans-serif;
    cursor: pointer; transition: all .1s; white-space: nowrap;
  }
  .pq-btn-print:hover { background: #f9fafb; border-color: #9ca3af; }
  .pq-btn-delete {
    display: inline-flex; align-items: center; gap: 5px;
    background: #fef2f2; color: #dc2626;
    border: 1px solid #fecaca; border-radius: 6px; padding: 6px 11px;
    font-size: 12px; font-weight: 500; font-family: 'DM Sans', sans-serif;
    cursor: pointer; transition: all .1s; white-space: nowrap;
  }
  .pq-btn-delete:hover { background: #fee2e2; }

  /* ── Search bar ── */
  .pq-search-wrap {
    background: #fff; border: 1px solid #e5e7eb; border-radius: 8px;
    padding: 10px 13px; display: flex; flex-wrap: wrap; gap: 9px;
    align-items: center; margin-bottom: 12px;
  }

  /* ── Skeleton ── */
  @keyframes pq-sh { to{background-position:-200% 0} }
  .pq-sk {
    border-radius: 4px; background: linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%);
    background-size: 200% 100%; animation: pq-sh 1.3s infinite;
  }

  /* ── Pending badge ── */
  .pq-pending {
    display: inline-flex; align-items: center; gap: 4px;
    background: #fffbeb; color: #b45309; border: 1px solid #fde68a;
    border-radius: 4px; padding: 2px 8px; font-size: 11px; font-weight: 700;
  }

  /* ── OB row ── */
  .pq-ob-row { display: grid; grid-template-columns: 1fr auto; gap: 8px; align-items: start; }
  .pq-ob-type { display: flex; border-radius: 7px; overflow: hidden; border: 1px solid #e2e8f0; }
  .pq-ob-btn { padding: 7px 11px; border: none; cursor: pointer; font-family: 'DM Sans',sans-serif; font-size: 12px; font-weight: 600; background: #fff; color: #94a3b8; transition: all .12s; white-space: nowrap; }
  .pq-ob-btn.active-add { background: #f0fdf4; color: #15803d; }
  .pq-ob-btn.active-ret { background: #fef2f2; color: #dc2626; }

  /* Notes box */
  .pq-notes-box {
    background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px;
    padding: 12px 14px; display: flex; justify-content: space-between; align-items: flex-start;
  }

  @media(max-width:900px) { .pq-form-grid { grid-template-columns:1fr!important; } .pq-card-grid { grid-template-columns:1fr 1fr; } }
`;function Fe(n){const i=n.toUpperCase().replace(/[^A-Z0-9]/g,"");if(i.length>0&&/^[0-9]/.test(i))return"";const l=i.match(/^[A-Z]+/),c=l?l[0]:"",g=i.slice(c.length);return c?g?`${c}-${g}`:c:""}function Ie(n){n.target.blur()}function Qe(n){(n.key==="ArrowUp"||n.key==="ArrowDown")&&n.preventDefault()}function X({options:n,value:i,onChange:l,placeholder:c,labelKey:g="label"}){const[h,b]=s.useState(!1),[D,y]=s.useState(""),j=s.useRef(null),B=s.useRef(null);s.useEffect(()=>{const d=P=>{j.current&&!j.current.contains(P.target)&&b(!1)};return document.addEventListener("mousedown",d),()=>document.removeEventListener("mousedown",d)},[]),s.useEffect(()=>{h&&setTimeout(()=>B.current?.focus(),0)},[h]);const f=n.filter(d=>(d[g]||"").toLowerCase().includes(D.toLowerCase())),q=n.find(d=>d._id===i);return e.jsxs("div",{ref:j,style:{position:"relative"},children:[e.jsxs("button",{type:"button",onClick:()=>b(d=>!d),className:`pq-sd-btn${q?" sel":""}${h?" open":""}`,children:[e.jsx("span",{style:{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textAlign:"left"},children:q?q[g]:c}),e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2.5,style:{flexShrink:0,transition:".15s",transform:h?"rotate(180deg)":"none"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),h&&e.jsxs("div",{className:"pq-sd-panel",children:[e.jsx("div",{style:{padding:7,borderBottom:"1px solid #f3f4f6",background:"#f9fafb"},children:e.jsx("input",{ref:B,value:D,onChange:d=>y(d.target.value),placeholder:"Search…",style:{width:"100%",padding:"6px 9px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12.5,outline:"none",fontFamily:"'DM Sans',sans-serif"}})}),e.jsx("ul",{style:{maxHeight:210,overflowY:"auto",margin:0,padding:0,listStyle:"none"},children:f.length===0?e.jsx("li",{style:{padding:"9px 12px",fontSize:12.5,color:"#9ca3af",textAlign:"center"},children:"No results"}):f.map(d=>e.jsx("li",{className:`pq-sd-item${d._id===i?" sel":""}`,onClick:()=>{l(d),b(!1),y("")},children:d[g]},d._id))})]})]})}function a({label:n,children:i}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsx("div",{className:"pq-lbl",children:n}),i]})}function ee({title:n,dot:i,children:l}){return e.jsxs("div",{className:"pq-panel",children:[e.jsxs("div",{className:"pq-panel-head",children:[e.jsx("div",{style:{width:7,height:7,borderRadius:"50%",background:i,flexShrink:0}}),e.jsx("span",{style:{fontSize:10.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#374151"},children:n})]}),e.jsx("div",{className:"pq-panel-body",children:l})]})}function Ve(){return{name:localStorage.getItem("businessName")||"Mill",logo:localStorage.getItem("logoUrl")||""}}function Ee(n){const i=Ve(),l=String(n.sr||"").padStart(4,"0"),c=i.logo?`<img src="${i.logo}" alt="logo" style="height:40px;width:40px;object-fit:contain;border-radius:5px;padding:2px;"/>`:`<div style="width:40px;height:40px;border-radius:7px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;color:#fff;">${i.name.charAt(0)}</div>`;return`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Quotation #${l}</title>
<style>
  @page{size:A5;margin:8mm}*{box-sizing:border-box;margin:0;padding:0}
  body{font-family:"Segoe UI",Arial,sans-serif;background:#fff;color:#111;font-size:10.5px}
  .wrap{max-width:128mm;margin:0 auto}
  .hd{background:#111827;padding:9px 12px;border-radius:7px 7px 0 0;display:flex;align-items:center;gap:10px}
  .hd-info{flex:1;min-width:0}.hd-name{font-size:13px;font-weight:800;color:#fff}
  .hd-right{text-align:right;flex-shrink:0}
  .hd-type{font-size:9px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#fbbf24;margin-bottom:3px}
  .hd-no{font-size:18px;font-weight:800;color:#fff;font-family:"Courier New",monospace}
  .hd-date{font-size:8px;color:rgba(255,255,255,.4);margin-top:2px}
  .meta{display:grid;grid-template-columns:1fr 1fr;border:1px solid #e5e7eb;border-top:none}
  .mc{padding:6px 9px;border-right:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6}
  .mc:nth-child(2n){border-right:none}.mc:nth-last-child(-n+2){border-bottom:none}
  .mc-l{font-size:7px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;margin-bottom:2px}
  .mc-v{font-size:11px;font-weight:600;color:#111}
  .pending-banner{background:#fffbeb;border:1px solid #fde68a;border-top:none;padding:7px 12px;text-align:center;font-size:11px;font-weight:700;color:#b45309;letter-spacing:.08em;text-transform:uppercase}
  .notes{margin-top:6px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:5px;padding:8px 10px;font-size:11px;color:#374151}
  .ft{display:flex;justify-content:space-between;margin-top:12px;padding-top:8px;border-top:1px dashed #e5e7eb;font-size:8px;color:#9ca3af}
  .sig-line{width:44%;text-align:center}.sig-line .line{border-top:1px solid #374151;padding-top:3px;margin-top:18px;font-size:7.5px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body><div class="wrap">
  <div class="hd">${c}<div class="hd-info"><div class="hd-name">${i.name}</div></div>
  <div class="hd-right"><div class="hd-type">Quotation</div><div class="hd-no">#${l}</div><div class="hd-date">${n.date||"—"}</div></div></div>
  <div class="pending-banner">⏳ Pending — Awaiting Delivery &amp; Weighing</div>
  <div class="meta">
    <div class="mc"><div class="mc-l">Vendor</div><div class="mc-v">${n.vendorName||"—"}</div></div>
    <div class="mc"><div class="mc-l">Vehicle No.</div><div class="mc-v">${n.vehicleNumber||"—"}</div></div>
    <div class="mc"><div class="mc-l">Builty #</div><div class="mc-v">${n.builtyNumber||"—"}</div></div>
    <div class="mc"><div class="mc-l">Product</div><div class="mc-v">${n.productName||"—"}</div></div>
    <div class="mc"><div class="mc-l">Qty (Bags)</div><div class="mc-v">${n.quantity||"—"}</div></div>
    <div class="mc"><div class="mc-l">Bag Status</div><div class="mc-v">${n.bagStatus==="return"?"Bag Return":"Bag Added"}</div></div>
    <div class="mc"><div class="mc-l">Gross Wt.</div><div class="mc-v">${n.grossWeight!=null?`${n.grossWeight} kg`:"—"}</div></div>
  </div>
  ${n.notes?`<div class="notes"><strong>Notes:</strong> ${n.notes}</div>`:""}
  <div class="ft">
    <div class="sig-line"><div class="line">Supplier Confirmation</div></div>
    <div style="align-self:flex-end;font-size:7.5px;color:#d1d5db">Powered by Agro Plus</div>
    <div class="sig-line"><div class="line">Received By</div></div>
  </div>
</div><script>window.print()<\/script></body></html>`}const W={display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},u=n=>isNaN(Number(n))?0:Number(n)||0,V=(n,i=2)=>u(n).toLocaleString("en-PK",{minimumFractionDigits:i,maximumFractionDigits:i}),U=e.jsx("div",{className:"pq-divider"}),C=()=>({className:"pq-inp pq-no-spin",onWheel:Ie,onKeyDown:Qe}),S=(n=!1)=>({className:`pq-ro${n?" hi":""}`,readOnly:!0});function Oe({onAdded:n}){const i=new Date().toISOString().split("T")[0],[l,c]=s.useState([]),[g,h]=s.useState([]),[b,D]=s.useState([]),[y,j]=s.useState({baseMoisture:0,weightCut:0}),[B,f]=s.useState(""),[q,d]=s.useState(i),[P,w]=s.useState(""),[o,r]=s.useState(""),[m,v]=s.useState(""),[Y,E]=s.useState(""),[te,oe]=s.useState(""),[Ae,ne]=s.useState(""),[L,se]=s.useState("added"),[ie,ae]=s.useState(""),[re,le]=s.useState(""),[de,ce]=s.useState(""),[We,pe]=s.useState(""),[R,fe]=s.useState(0),[F,ue]=s.useState(""),[x,ge]=s.useState(!1),[xe,G]=s.useState(""),[O,he]=s.useState(""),[_,be]=s.useState(""),[me,ve]=s.useState(""),[ye,je]=s.useState(!1),[we,H]=s.useState({message:"",type:"info"}),I=u(ie),Se=u(re),K=I*R,Z=u(y.baseMoisture),ke=u(y.weightCut),Ce=F!==""&&u(F)>Z?(u(F)-Z)*ke*I:0,Ne=Math.round(Ce),qe=x?u(xe):Ne,$=Se-(L==="added"?K:0)-qe,M=$>0?$/40:0,z=M*u(_),Me=z-u(O);s.useEffect(()=>{x||G(String(Ne))},[F,I,y,x]),s.useEffect(()=>{Promise.all([k(`${N}/products?activeOnly=true`).then(t=>t.json()),k(`${N}/accounts?excludeProducts=true`).then(t=>t.json()),k(`${N}/profile/bag-types`).then(t=>t.json()),k(`${N}/profile/mill-settings`).then(t=>t.json()),k(`${N}/purchase-quotation/next-sr`).then(t=>t.json())]).then(([t,T,J,Q,A])=>{t.success&&c(t.products.map(p=>({...p,label:[p.productName,p.type,p.subType].filter(Boolean).join(" - ")})));const $e=Array.isArray(T)?T:T.accounts||[];h($e.filter(p=>p.category==="Supplier").map(p=>({...p,label:p.accountName}))),J.bagTypes&&D(J.bagTypes.filter(p=>p.isActive).map(p=>({...p,label:`${p.bagTypeName} (${p.bagWeight} kg)`}))),Q.settings&&j(Q.settings),A.success&&A.nextSr&&f(String(A.nextSr))})},[]);const De=()=>{d(i),w(""),r(""),v(""),E(""),oe(""),ne(""),se("added"),ae(""),le(""),ce(""),pe(""),fe(0),ue(""),ge(!1),G(""),he(""),be(""),ve("")},Be=async t=>{t.preventDefault(),je(!0);try{const T={date:q,vendorName:Y,vendorAccountId:m||void 0,vehicleNumber:P,builtyNumber:o,productId:te||void 0,productName:Ae,bagStatus:L,quantity:I||null,grossWeight:Se||null,bagTypeId:de||void 0,bagTypeName:We,bagWeightPerBag:R||null,totalBagWeight:K||null,moisturePercent:u(F)||null,baseMoisture:Z,weightCut:ke,moistureAdjustment:qe||null,moistureOverride:x,netWeightKg:$>0?$:null,netWeightMaund:M>0?M:null,rateRows:_?[{maund:M,rate:u(_),amount:z}]:[],totalAmount:z>0?z:null,rentAdjustment:u(O)>0?u(O):null,finalAmount:Me>0?Me:null,notes:me},Q=await(await k(`${N}/purchase-quotation/create`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(T)})).json();Q.success?(H({message:Q.message,type:"success"}),De(),k(`${N}/purchase-quotation/next-sr`).then(A=>A.json()).then(A=>{A.success&&f(String(A.nextSr))}),n?.()):H({message:Q.message||"Failed to create quotation.",type:"error"})}catch{H({message:"Server error.",type:"error"})}finally{je(!1)}};return e.jsxs(e.Fragment,{children:[e.jsx(ze,{message:we.message,type:we.type,onClose:()=>H({message:"",type:"info"})}),e.jsx("form",{onSubmit:Be,children:e.jsxs("div",{className:"pq-form-grid",style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,alignItems:"start"},children:[e.jsxs(ee,{title:"Dealer Information",dot:"#3b82f6",children:[e.jsxs("div",{style:W,children:[e.jsx(a,{label:"Date",children:e.jsx("input",{type:"date",value:q,max:i,onChange:t=>d(t.target.value),...C()})}),e.jsx(a,{label:"Quotation #",children:e.jsx("input",{value:B?`#${String(B).padStart(4,"0")}`:"—",...S()})})]}),e.jsxs("div",{style:W,children:[e.jsx(a,{label:"Vehicle No.",children:e.jsx("input",{value:P,onChange:t=>w(Fe(t.target.value)),placeholder:"e.g. LEA-1234",...C()})}),e.jsx(a,{label:"Builty No.",children:e.jsx("input",{value:o,onChange:t=>r(t.target.value),placeholder:"e.g. B-001",...C()})})]}),e.jsx(a,{label:"Vendor / Supplier",children:e.jsx(X,{options:g,value:m,labelKey:"label",placeholder:"Select vendor…",onChange:t=>{v(t._id),E(t.accountName)}})}),e.jsx(a,{label:"Product",children:e.jsx(X,{options:l,value:te,labelKey:"label",placeholder:"Select product…",onChange:t=>{oe(t._id),ne([t.productName,t.type,t.subType].filter(Boolean).join(" - "))}})}),e.jsx(a,{label:"Bag Status",children:e.jsx("div",{style:{display:"flex",gap:7},children:[["added","Bag Added"],["return","Bag Return"]].map(([t,T])=>e.jsx("button",{type:"button",onClick:()=>se(t),style:{flex:1,padding:"8px 0",borderRadius:7,cursor:"pointer",border:`1px solid ${L===t?"#111827":"#e5e7eb"}`,background:L===t?"#111827":"#fff",color:L===t?"#fff":"#6b7280",fontSize:12.5,fontWeight:500,fontFamily:"'DM Sans',sans-serif",transition:"all .1s"},children:T},t))})}),e.jsx(a,{label:"Quantity (Bags)",children:e.jsx("input",{type:"number",min:"0",value:ie,onChange:t=>ae(t.target.value),placeholder:"0",...C()})})]}),e.jsxs(ee,{title:"Weight & Moisture",dot:"#f59e0b",children:[e.jsx(a,{label:"Gross Weight (kg)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:re,onChange:t=>le(t.target.value),placeholder:"0.00",...C()})}),e.jsxs("div",{style:W,children:[e.jsx(a,{label:"Bag Type",children:e.jsx(X,{options:b,value:de,labelKey:"label",placeholder:"Select bag type…",onChange:t=>{ce(t._id),pe(t.bagTypeName),fe(t.bagWeight)}})}),e.jsx(a,{label:"Bag Wt / Bag",children:e.jsx("input",{value:R?`${R} kg`:"—",...S()})})]}),e.jsxs("div",{style:W,children:[e.jsx(a,{label:"Total Bag Weight",children:e.jsx("input",{value:I&&R?`${V(K)} kg`:"—",...S()})}),e.jsx(a,{label:"Bag Deduction",children:e.jsx("input",{value:L==="added"?I&&R?`− ${V(K)} kg`:"—":"None",...S()})})]}),U,e.jsxs("div",{style:W,children:[e.jsx(a,{label:"Moisture %",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:F,onChange:t=>ue(t.target.value),placeholder:`Base: ${y.baseMoisture}%`,...C()})}),e.jsx(a,{label:"Moisture Adj. (kg)",children:e.jsxs("div",{style:{position:"relative"},children:[e.jsx("input",{type:"number",step:"1",value:xe,readOnly:!x,onChange:t=>x&&G(t.target.value),className:`pq-no-spin${x?" pq-inp":" pq-ro"}`,style:{width:"100%",padding:"8px 64px 8px 11px",border:"1px solid #d1d5db",borderRadius:7,fontSize:13,fontFamily:x?"'DM Sans',sans-serif":"'DM Mono',monospace",outline:"none",background:x?"#fff":"#f9fafb",color:x?"#111827":"#6b7280"}}),e.jsx("button",{type:"button",onClick:()=>ge(t=>!t),style:{position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",padding:"2px 7px",borderRadius:5,border:"1px solid #e5e7eb",background:x?"#fef9c3":"#f9fafb",color:x?"#92400e":"#9ca3af",fontSize:10,fontWeight:600,cursor:"pointer"},children:x?"Manual":"Auto"})]})})]}),U,e.jsxs("div",{style:W,children:[e.jsx(a,{label:"Net Weight (kg)",children:e.jsx("input",{value:$>0?V($):"—",...S($>0)})}),e.jsx(a,{label:"Net Weight (Maund)",children:e.jsx("input",{value:M>0?M.toFixed(4):"—",...S()})})]})]}),e.jsxs(ee,{title:"Pricing & Notes",dot:"#10b981",children:[e.jsx(a,{label:"Rate / 40 kg (Rs.)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:_,onChange:t=>be(t.target.value),placeholder:"0.00 (optional)",...C()})}),e.jsxs("div",{style:W,children:[e.jsx(a,{label:"Net Maund (auto)",children:e.jsx("input",{value:M>0?M.toFixed(4):"—",...S()})}),e.jsx(a,{label:"Amount (Rs.)",children:e.jsx("input",{value:z>0?V(z):"—",...S()})})]}),U,e.jsxs("div",{style:W,children:[e.jsx(a,{label:"Total Amount (Rs)",children:e.jsx("input",{value:z>0?V(z):"—",...S()})}),e.jsx(a,{label:"Rent Adjustment (Rs)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:O,onChange:t=>he(t.target.value),placeholder:"0.00",...C()})})]}),U,e.jsx(a,{label:"Quotation Notes",children:e.jsx("textarea",{value:me,onChange:t=>ve(t.target.value),placeholder:"e.g. Coming from Lahore, expected 2 days, quality: Grade A…",rows:4,style:{width:"100%",padding:"8px 11px",border:"1px solid #d1d5db",borderRadius:7,fontSize:13,fontFamily:"'DM Sans',sans-serif",outline:"none",resize:"vertical",color:"#111827",transition:"border-color .12s"},onFocus:t=>{t.target.style.borderColor="#6b7280",t.target.style.boxShadow="0 0 0 2px rgba(107,114,128,.12)"},onBlur:t=>{t.target.style.borderColor="#d1d5db",t.target.style.boxShadow="none"}})}),e.jsx("button",{type:"submit",disabled:ye,className:"pq-submit",children:ye?"Saving…":e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),"Add Quotation"]})})]})]})})]})}function _e({refreshKey:n}){const i=Te(),[l,c]=s.useState([]),[g,h]=s.useState(!0),[b,D]=s.useState(""),[y,j]=s.useState({message:"",type:"info"}),B=async()=>{h(!0);try{const r=await(await k(`${N}/purchase-quotation`)).json();r.success&&c(r.quotations)}catch{}h(!1)};s.useEffect(()=>{B()},[n]);const f=l.filter(o=>{if(!b)return!0;const r=b.toLowerCase();return[o.vendorName,o.vehicleNumber,o.builtyNumber,o.productName,String(o.sr)].some(m=>m&&String(m).toLowerCase().includes(r))}),q=async(o,r)=>{if(window.confirm(`Delete Quotation #${String(r).padStart(4,"0")}? This cannot be undone.`))try{const v=await(await k(`${N}/purchase-quotation/${o}`,{method:"DELETE"})).json();v.success?(j({message:"Quotation deleted.",type:"success"}),c(Y=>Y.filter(E=>E._id!==o))):j({message:v.message||"Failed.",type:"error"})}catch{j({message:"Server error.",type:"error"})}},d=o=>{i("/add-invoice-purchase",{state:{fromQuotation:o}})},P=o=>{const r=window.open("","_blank");r&&(r.document.write(Ee(o)),r.document.close())},w=({label:o,value:r,mono:m})=>e.jsxs("div",{className:"pq-cell",children:[e.jsx("div",{className:"pq-clbl",children:o}),e.jsx("div",{className:`pq-cval${m?" mono":""}`,children:r!=null&&r!==""?r:e.jsx("span",{style:{color:"#e5e7eb"},children:"—"})})]});return e.jsxs(e.Fragment,{children:[e.jsx(ze,{message:y.message,type:y.type,onClose:()=>j({message:"",type:"info"})}),e.jsxs("div",{className:"pq-search-wrap",children:[e.jsxs("div",{style:{position:"relative",flex:1,minWidth:220},children:[e.jsxs("svg",{style:{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"},width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2,children:[e.jsx("circle",{cx:11,cy:11,r:8}),e.jsx("path",{strokeLinecap:"round",d:"M21 21l-4.35-4.35"})]}),e.jsx("input",{className:"pq-inp",style:{paddingLeft:30},placeholder:"Search vendor, vehicle, driver, product…",value:b,onChange:o=>D(o.target.value)})]}),b&&e.jsx("button",{onClick:()=>D(""),style:{padding:"6px 11px",border:"1px solid #fecaca",borderRadius:6,background:"#fef2f2",fontSize:11.5,fontWeight:600,color:"#dc2626",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"},children:"Clear ✕"}),e.jsxs("span",{style:{fontSize:11.5,fontFamily:"'DM Mono',monospace",color:"#6b7280",background:"#f3f4f6",border:"1px solid #e5e7eb",borderRadius:6,padding:"5px 11px"},children:[f.length,f.length!==l.length&&` / ${l.length}`," quotation",f.length!==1?"s":""]})]}),g?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(3)].map((o,r)=>e.jsxs("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden",borderLeft:"3px solid #fde68a"},children:[e.jsxs("div",{style:{padding:"12px 16px",borderBottom:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between",gap:10},children:[e.jsx("div",{style:{display:"flex",gap:10},children:[90,70,140,100].map((m,v)=>e.jsx("div",{className:"pq-sk",style:{height:18,width:m,borderRadius:5}},v))}),e.jsx("div",{className:"pq-sk",style:{height:30,width:90,borderRadius:6}})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)"},children:[...Array(8)].map((m,v)=>e.jsxs("div",{style:{padding:"10px 14px",borderRight:v%4!==3?"1px solid #f3f4f6":"none",borderBottom:v<4?"1px solid #f3f4f6":"none"},children:[e.jsx("div",{className:"pq-sk",style:{width:"50%",height:9,marginBottom:7}}),e.jsx("div",{className:"pq-sk",style:{width:"80%",height:13}})]},v))})]},r))}):f.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"56px 0",background:"#fff",border:"1px solid #e5e7eb",borderRadius:8},children:[e.jsx("div",{style:{fontSize:36,marginBottom:12},children:"📋"}),e.jsx("p",{style:{fontSize:13.5,fontWeight:600,color:"#374151",margin:"0 0 4px"},children:l.length===0?"No pending quotations":"No results found"}),e.jsx("p",{style:{fontSize:12.5,color:"#9ca3af"},children:l.length===0?"Quotations will appear here once added.":"Try adjusting your search."})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:f.map((o,r)=>e.jsxs("div",{className:"pq-card",style:{animationDelay:`${r*.04}s`},children:[e.jsxs("div",{className:"pq-card-head",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:5},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".07em"},children:"Quotation"}),e.jsxs("span",{style:{fontSize:16,fontWeight:700,color:"#111827",fontFamily:"'DM Mono',monospace"},children:["#",String(o.sr||"").padStart(4,"0")]})]}),e.jsx("div",{style:{width:1,height:14,background:"#e5e7eb"}}),e.jsx("span",{style:{fontSize:12.5,color:"#6b7280"},children:o.date||"No date"}),e.jsx("span",{className:"pq-pending",children:"⏳ Pending"}),o.productName&&e.jsx("span",{style:{display:"inline-flex",alignItems:"center",padding:"2px 9px",borderRadius:4,fontSize:11.5,fontWeight:600,background:"#f3f4f6",color:"#374151",border:"1px solid #e5e7eb",fontFamily:"'DM Mono',monospace",whiteSpace:"nowrap"},children:o.productName}),o.notes&&e.jsxs("span",{style:{fontSize:11.5,color:"#b45309",background:"#fffbeb",border:"1px solid #fde68a",borderRadius:4,padding:"2px 8px",maxWidth:220,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:["📝 ",o.notes]})]}),e.jsxs("div",{style:{display:"flex",gap:6,flexShrink:0},children:[e.jsxs("button",{className:"pq-btn-print",onClick:()=>P(o),children:[e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"})}),"Print"]}),e.jsxs("button",{className:"pq-btn-delete",onClick:()=>q(o._id,o.sr),children:[e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})}),"Delete"]}),e.jsxs("button",{className:"pq-btn-fulfil",onClick:()=>d(o),children:[e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})}),"Fulfil Invoice"]})]})]}),e.jsxs("div",{className:"pq-card-grid",children:[e.jsx(w,{label:"Vendor",value:o.vendorName}),e.jsx(w,{label:"Vehicle No.",value:o.vehicleNumber,mono:!0}),e.jsx(w,{label:"Builty #",value:o.builtyNumber,mono:!0}),e.jsx(w,{label:"Qty (Bags)",value:o.quantity,mono:!0}),e.jsx(w,{label:"Gross Wt. (kg)",value:o.grossWeight!=null?`${o.grossWeight} kg`:null,mono:!0}),e.jsx(w,{label:"Moisture %",value:o.moisturePercent!=null?`${o.moisturePercent}%`:null,mono:!0}),e.jsx(w,{label:"Bag Type",value:o.bagTypeName})]}),e.jsxs("div",{className:"pq-card-foot",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"},children:[o.netWeightMaund>0&&e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:1},children:"Net Maund"}),e.jsxs("div",{style:{fontSize:13,fontWeight:700,color:"#15803d",fontFamily:"'DM Mono',monospace"},children:[Number(o.netWeightMaund).toFixed(4)," Mn"]})]}),o.finalAmount>0&&e.jsxs(e.Fragment,{children:[o.netWeightMaund>0&&e.jsx("div",{style:{width:1,height:22,background:"#fde68a"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:1},children:"Est. Amount"}),e.jsxs("div",{style:{fontSize:13,fontWeight:700,color:"#374151",fontFamily:"'DM Mono',monospace"},children:["Rs ",V(o.finalAmount)]})]})]}),e.jsxs("div",{style:{fontSize:11,color:"#9ca3af",fontFamily:"'DM Mono',monospace"},children:["Added ",new Date(o.createdAt).toLocaleDateString("en-PK")]})]}),e.jsx("div",{style:{fontSize:11.5,color:"#b45309",fontWeight:600},children:'Click "Fulfil Invoice" to complete & convert →'})]})]},o._id))}),!g&&f.length>0&&e.jsxs("p",{style:{textAlign:"center",color:"#9ca3af",fontSize:11.5,marginTop:14,fontFamily:"'DM Mono',monospace"},children:[f.length," quotation",f.length!==1?"s":""," pending",b?` · filtered from ${l.length} total`:""]})]})}function Ze(){const[n,i]=s.useState("add"),[l,c]=s.useState(0),g=()=>{c(h=>h+1)};return e.jsxs(Pe,{children:[e.jsxs("style",{children:[Le,Re]}),e.jsxs("div",{className:"pq-wrap",children:[e.jsxs("div",{style:{marginBottom:18},children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"Procurement"}),e.jsx("h1",{style:{fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px",margin:0},children:"Purchase Quotations"}),e.jsx("p",{style:{fontSize:12.5,color:"#6b7280",margin:"4px 0 0"},children:"Record Partial Delivery Info"})]}),e.jsxs("div",{className:"pq-tabs",children:[e.jsxs("button",{className:`pq-tab${n==="add"?" active":""}`,onClick:()=>i("add"),children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4v16m8-8H4"})}),"Add Quotation"]}),e.jsxs("button",{className:`pq-tab${n==="view"?" active":""}`,onClick:()=>i("view"),children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})}),"View Quotations"]})]}),n==="add"&&e.jsx(Oe,{onAdded:g}),n==="view"&&e.jsx(_e,{refreshKey:l})]})]})}export{Ze as default};
