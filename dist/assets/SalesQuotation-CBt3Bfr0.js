import{a,j as e,b as Ne}from"./vendor-react-CVRJsYjy.js";import{S as ze,a as W,A as B,N as je}from"./index-DAaqPt1z.js";import"./vendor-react-dom-BIx1r6lP.js";import"./vendor-D8Rt7Tv7.js";const Ae="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",Ce=`
  *, *::before, *::after { box-sizing: border-box; }
  .pq-wrap { font-family: 'DM Sans', sans-serif; color: #111827; }
  .pq-no-spin::-webkit-inner-spin-button,
  .pq-no-spin::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  .pq-no-spin { -moz-appearance: textfield; }

  /* ── Tab nav ── */
  .pq-tabs { display:flex; gap:0; border-bottom:2px solid #e5e7eb; margin-bottom:20px; }
  .pq-tab {
    padding:9px 18px; border:none; background:none; cursor:pointer;
    font-size:13px; font-weight:600; font-family:'DM Sans',sans-serif;
    color:#6b7280; border-bottom:2.5px solid transparent; margin-bottom:-2px;
    transition:all .12s; display:flex; align-items:center; gap:7px;
  }
  .pq-tab:hover { color:#374151; }
  .pq-tab.active { color:#111827; border-bottom-color:#111827; }
  .pq-tab-badge {
    font-size:10px; font-weight:700; padding:1px 6px; border-radius:10px;
    background:#f3f4f6; color:#6b7280;
  }
  .pq-tab.active .pq-tab-badge { background:#111827; color:#fff; }

  /* ── Form panels ── */
  .pq-panel { background:#fff; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; }
  .pq-panel-head {
    padding:9px 14px; background:#f9fafb; border-bottom:1px solid #e5e7eb;
    display:flex; align-items:center; gap:8px;
  }
  .pq-panel-body { padding:14px; display:flex; flex-direction:column; gap:11px; }

  /* ── Inputs ── */
  .pq-inp, .pq-ro {
    width:100%; padding:8px 11px;
    border:1px solid #d1d5db; border-radius:7px;
    font-size:13px; font-family:'DM Sans',sans-serif;
    color:#111827; background:#fff; outline:none;
    transition:border-color .12s, box-shadow .12s;
  }
  .pq-inp::placeholder { color:#9ca3af; }
  .pq-inp:focus { border-color:#6b7280; box-shadow:0 0 0 2px rgba(107,114,128,.12); }
  .pq-ro { background:#f9fafb; color:#6b7280; font-family:'DM Mono',monospace; cursor:default; }
  .pq-ro.hi { background:#f0fdf4; color:#15803d; border-color:#bbf7d0; font-weight:600; }

  /* ── SearchDrop ── */
  .pq-sd-btn {
    width:100%; padding:8px 11px;
    border:1px solid #d1d5db; border-radius:7px;
    background:#fff; font-size:13px; font-family:'DM Sans',sans-serif;
    color:#9ca3af; cursor:pointer; outline:none;
    display:flex; align-items:center; justify-content:space-between; gap:6px;
    transition:border-color .12s, box-shadow .12s;
  }
  .pq-sd-btn.sel { color:#111827; }
  .pq-sd-btn:focus, .pq-sd-btn.open { border-color:#6b7280; box-shadow:0 0 0 2px rgba(107,114,128,.12); }
  .pq-sd-panel {
    position:absolute; left:0; top:calc(100% + 3px);
    width:max(100%, 260px); z-index:300;
    background:#fff; border:1px solid #d1d5db;
    border-radius:8px; box-shadow:0 4px 16px rgba(0,0,0,.1); overflow:hidden;
  }
  .pq-sd-item {
    padding:8px 12px; font-size:13px; cursor:pointer;
    border-bottom:1px solid #f9fafb; color:#111827; transition:background .08s;
  }
  .pq-sd-item:last-child { border-bottom:none; }
  .pq-sd-item:hover { background:#f3f4f6; }
  .pq-sd-item.sel { background:#f3f4f6; font-weight:600; }

  /* ── Field label ── */
  .pq-lbl {
    display:flex; align-items:center; gap:4px;
    font-size:10px; font-weight:700; text-transform:uppercase;
    letter-spacing:.07em; color:#6b7280; margin-bottom:5px;
  }
  .pq-divider { height:1px; background:#f3f4f6; margin:2px 0; }

  /* ── Submit ── */
  .pq-submit {
    width:100%; padding:10px 0; border-radius:7px; border:none;
    background:#111827; color:#fff; font-size:13.5px; font-weight:600;
    font-family:'DM Sans',sans-serif; cursor:pointer;
    display:flex; align-items:center; justify-content:center; gap:8px;
    transition:background .12s;
  }
  .pq-submit:hover:not(:disabled) { background:#1f2937; }
  .pq-submit:disabled { background:#f3f4f6; color:#9ca3af; cursor:not-allowed; }

  /* ── View list cards ── */
  @keyframes pq-in { from{opacity:0;transform:translateY(3px)} to{opacity:1;transform:translateY(0)} }
  .pq-card {
    background:#fff; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;
    transition:box-shadow .12s; animation:pq-in .16s ease both;
    border-left:3px solid #10b981;
  }
  .pq-card:hover { box-shadow:0 2px 10px rgba(0,0,0,.07); }
  .pq-card-head {
    display:flex; align-items:center; justify-content:space-between;
    padding:12px 16px; border-bottom:1px solid #f3f4f6;
    gap:10px; flex-wrap:wrap;
  }
  .pq-card-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
  .pq-cell {
    padding:10px 14px; border-right:1px solid #f3f4f6; border-bottom:1px solid #f3f4f6;
  }
  .pq-cell:nth-child(4n)       { border-right:none; }
  .pq-cell:nth-last-child(-n+4){ border-bottom:none; }
  .pq-clbl { font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:#9ca3af; margin-bottom:3px; }
  .pq-cval { font-size:12.5px; font-weight:600; color:#111827; }
  .pq-cval.mono { font-family:'DM Mono',monospace; font-size:12px; font-weight:500; color:#374151; }
  .pq-card-foot {
    display:flex; align-items:center; justify-content:space-between;
    padding:9px 16px; background:#f0fdf4; border-top:1px solid #bbf7d0;
    gap:10px; flex-wrap:wrap;
  }

  /* ── Action buttons ── */
  .pq-btn-fulfil {
    display:inline-flex; align-items:center; gap:6px;
    background:#111827; color:#fff; border:none;
    border-radius:6px; padding:6px 13px;
    font-size:12px; font-weight:600; font-family:'DM Sans',sans-serif;
    cursor:pointer; transition:background .1s; white-space:nowrap;
  }
  .pq-btn-fulfil:hover { background:#1f2937; }
  .pq-btn-print {
    display:inline-flex; align-items:center; gap:5px;
    background:#fff; color:#374151;
    border:1px solid #d1d5db; border-radius:6px; padding:6px 11px;
    font-size:12px; font-weight:500; font-family:'DM Sans',sans-serif;
    cursor:pointer; transition:all .1s; white-space:nowrap;
  }
  .pq-btn-print:hover { background:#f9fafb; border-color:#9ca3af; }
  .pq-btn-delete {
    display:inline-flex; align-items:center; gap:5px;
    background:#fef2f2; color:#dc2626;
    border:1px solid #fecaca; border-radius:6px; padding:6px 11px;
    font-size:12px; font-weight:500; font-family:'DM Sans',sans-serif;
    cursor:pointer; transition:all .1s; white-space:nowrap;
  }
  .pq-btn-delete:hover { background:#fee2e2; }

  /* ── Search bar ── */
  .pq-search-wrap {
    background:#fff; border:1px solid #e5e7eb; border-radius:8px;
    padding:10px 13px; display:flex; flex-wrap:wrap; gap:9px;
    align-items:center; margin-bottom:12px;
  }

  /* ── Skeleton ── */
  @keyframes pq-sh { to{background-position:-200% 0} }
  .pq-sk {
    border-radius:4px; background:linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%);
    background-size:200% 100%; animation:pq-sh 1.3s infinite;
  }

  /* ── Pending badge ── */
  .pq-pending {
    display:inline-flex; align-items:center; gap:4px;
    background:#f0fdf4; color:#059669; border:1px solid #bbf7d0;
    border-radius:4px; padding:2px 8px; font-size:11px; font-weight:700;
  }

  @media(max-width:900px) { .pq-form-grid { grid-template-columns:1fr!important; } .pq-card-grid { grid-template-columns:1fr 1fr; } }
`;function $e(t){const i=t.toUpperCase().replace(/[^A-Z0-9]/g,"");if(i.length>0&&/^[0-9]/.test(i))return"";const l=i.match(/^[A-Z]+/),p=l?l[0]:"",c=i.slice(p.length);return p?c?`${p}-${c}`:p:""}function Me(t){t.target.blur()}function De(t){(t.key==="ArrowUp"||t.key==="ArrowDown")&&t.preventDefault()}const b=t=>isNaN(Number(t))?0:Number(t)||0,S=(t,i=2)=>b(t).toLocaleString("en-PK",{minimumFractionDigits:i,maximumFractionDigits:i}),D={display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},H=e.jsx("div",{className:"pq-divider"}),m=()=>({className:"pq-inp pq-no-spin",onWheel:Me,onKeyDown:De}),w=(t=!1)=>({className:`pq-ro${t?" hi":""}`,readOnly:!0});function ye({options:t,value:i,onChange:l,placeholder:p,labelKey:c="label"}){const[u,f]=a.useState(!1),[N,z]=a.useState(""),v=a.useRef(null),C=a.useRef(null);a.useEffect(()=>{const d=R=>{v.current&&!v.current.contains(R.target)&&f(!1)};return document.addEventListener("mousedown",d),()=>document.removeEventListener("mousedown",d)},[]),a.useEffect(()=>{u&&setTimeout(()=>C.current?.focus(),0)},[u]);const g=t.filter(d=>(d[c]||"").toLowerCase().includes(N.toLowerCase())),A=t.find(d=>d._id===i);return e.jsxs("div",{ref:v,style:{position:"relative"},children:[e.jsxs("button",{type:"button",onClick:()=>f(d=>!d),className:`pq-sd-btn${A?" sel":""}${u?" open":""}`,children:[e.jsx("span",{style:{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textAlign:"left"},children:A?A[c]:p}),e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2.5,style:{flexShrink:0,transition:".15s",transform:u?"rotate(180deg)":"none"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),u&&e.jsxs("div",{className:"pq-sd-panel",children:[e.jsx("div",{style:{padding:7,borderBottom:"1px solid #f3f4f6",background:"#f9fafb"},children:e.jsx("input",{ref:C,value:N,onChange:d=>z(d.target.value),placeholder:"Search…",style:{width:"100%",padding:"6px 9px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12.5,outline:"none",fontFamily:"'DM Sans',sans-serif"}})}),e.jsx("ul",{style:{maxHeight:210,overflowY:"auto",margin:0,padding:0,listStyle:"none"},children:g.length===0?e.jsx("li",{style:{padding:"9px 12px",fontSize:12.5,color:"#9ca3af",textAlign:"center"},children:"No results"}):g.map(d=>e.jsx("li",{className:`pq-sd-item${d._id===i?" sel":""}`,onClick:()=>{l(d),f(!1),z("")},children:d[c]},d._id))})]})]})}function s({label:t,children:i}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsx("div",{className:"pq-lbl",children:t}),i]})}function X({title:t,dot:i,children:l}){return e.jsxs("div",{className:"pq-panel",children:[e.jsxs("div",{className:"pq-panel-head",children:[e.jsx("div",{style:{width:7,height:7,borderRadius:"50%",background:i,flexShrink:0}}),e.jsx("span",{style:{fontSize:10.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#374151"},children:t})]}),e.jsx("div",{className:"pq-panel-body",children:l})]})}function We(){return{name:localStorage.getItem("businessName")||"Mill",logo:localStorage.getItem("logoUrl")||""}}function Be(t){const i=We(),l=String(t.sr||"").padStart(4,"0"),p=i.logo?`<img src="${i.logo}" alt="logo" style="height:40px;width:40px;object-fit:contain;border-radius:5px;padding:2px;"/>`:`<div style="width:40px;height:40px;border-radius:7px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;color:#fff;">${i.name.charAt(0)}</div>`,c=Number(t.netWeight40||0).toFixed(4),u=t.totalAmount2||t.totalWithBardana||t.totalAmount||0,f=u>0;return`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Sales Quotation #${l}</title>
<style>
  @page{size:A5;margin:8mm}*{box-sizing:border-box;margin:0;padding:0}
  body{font-family:"Segoe UI",Arial,sans-serif;background:#fff;color:#111;font-size:10.5px}
  .wrap{max-width:128mm;margin:0 auto}
  .hd{background:#111827;padding:9px 12px;border-radius:7px 7px 0 0;display:flex;align-items:center;gap:10px}
  .hd-info{flex:1;min-width:0}.hd-name{font-size:13px;font-weight:800;color:#fff}
  .hd-right{text-align:right;flex-shrink:0}
  .hd-type{font-size:9px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#4ade80;margin-bottom:3px}
  .hd-no{font-size:18px;font-weight:800;color:#fff;font-family:"Courier New",monospace}
  .hd-date{font-size:8px;color:rgba(255,255,255,.4);margin-top:2px}
  .meta{display:grid;grid-template-columns:1fr 1fr;border:1px solid #e5e7eb;border-top:none}
  .mc{padding:6px 9px;border-right:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6}
  .mc:nth-child(2n){border-right:none}.mc:nth-last-child(-n+2){border-bottom:none}
  .mc-l{font-size:7px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;margin-bottom:2px}
  .mc-v{font-size:11px;font-weight:600;color:#111}
  .pending-banner{background:#f0fdf4;border:1px solid #bbf7d0;border-top:none;padding:7px 12px;text-align:center;font-size:11px;font-weight:700;color:#059669;letter-spacing:.08em;text-transform:uppercase}
  table{width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-top:none;font-size:10.5px}
  th{background:#f9fafb;padding:5px 8px;text-align:left;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#6b7280}
  td{padding:5px 8px;border-top:1px solid #f3f4f6}
  tr.sub td{background:#f9fafb;font-weight:700}
  tr.red td{color:#dc2626}
  .notes{margin-top:6px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:5px;padding:8px 10px;font-size:11px;color:#374151}
  .ft{display:flex;justify-content:space-between;margin-top:12px;padding-top:8px;border-top:1px dashed #e5e7eb;font-size:8px;color:#9ca3af}
  .sig-line{width:44%;text-align:center}.sig-line .line{border-top:1px solid #374151;padding-top:3px;margin-top:18px;font-size:7.5px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body><div class="wrap">
  <div class="hd">${p}<div class="hd-info"><div class="hd-name">${i.name}</div></div>
  <div class="hd-right"><div class="hd-type">Sales Quotation</div><div class="hd-no">#${l}</div><div class="hd-date">${t.date||"—"}</div></div></div>
  <div class="pending-banner">⏳ Pending — Awaiting Dispatch &amp; Confirmation</div>
  <div class="meta">
    <div class="mc"><div class="mc-l">Customer</div><div class="mc-v">${t.vendorName||"—"}</div></div>
    <div class="mc"><div class="mc-l">Vehicle No.</div><div class="mc-v">${t.vehicleNo||"—"}</div></div>
    <div class="mc"><div class="mc-l">Builty #</div><div class="mc-v">${t.builtyNo||"—"}</div></div>
    <div class="mc"><div class="mc-l">Broker</div><div class="mc-v">${t.brokerName||"—"}</div></div>
    <div class="mc"><div class="mc-l">Product</div><div class="mc-v">${t.paddyType||t.productName||"—"}</div></div>
    <div class="mc"><div class="mc-l">Qty (Bags)</div><div class="mc-v">${t.quantity||"—"}</div></div>
  </div>
  <table>
    <tr><th>Description</th><th style="text-align:right">Value</th></tr>
    <tr><td>Gross Weight</td><td style="text-align:right">${Number(t.weight||0).toFixed(2)} kg</td></tr>
    <tr><td>Bag Deduction</td><td style="text-align:right">− ${Number(t.bagWeight||0).toFixed(2)} kg</td></tr>
    <tr class="sub"><td>Net Weight</td><td style="text-align:right">${Number(t.netWeight||0).toFixed(2)} kg · ${c} Mn</td></tr>
    ${t.rate40>0?`<tr><td>Rate / 40 kg</td><td style="text-align:right">Rs ${Number(t.rate40||0).toLocaleString("en-PK")}</td></tr>`:""}
    ${t.amount>0?`<tr><td>Amount</td><td style="text-align:right">Rs ${Number(t.amount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
    ${Number(t.sutliSilaiRate||0)>0?`<tr><td>Sutli / Silai (Rs ${Number(t.sutliSilaiRate||0)} × ${Number(t.quantity||0)} bags)</td><td style="text-align:right">Rs ${Number(t.sutliSilaiAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
    ${Number(t.bardanaRate||0)>0?`<tr><td>Bardana (Rs ${Number(t.bardanaRate)} × ${Number(t.quantity||0)} bags)</td><td style="text-align:right">Rs ${Number(t.bardanaAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
    ${Number(t.brokeryRate||0)>0?`<tr class="red"><td>− Brokery (${c} Mn × Rs ${Number(t.brokeryRate||0)})</td><td style="text-align:right">− Rs ${Number(t.brokery||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
    ${f?`<tr class="sub"><td>FINAL AMOUNT</td><td style="text-align:right;font-size:13px;color:#059669">Rs ${Number(u).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
  </table>
  ${t.notes?`<div class="notes"><strong>Notes:</strong> ${t.notes}</div>`:""}
  <div class="ft">
    <div class="sig-line"><div class="line">Customer Confirmation</div></div>
    <div style="align-self:flex-end;font-size:7.5px;color:#d1d5db">Powered by Agro Plus</div>
    <div class="sig-line"><div class="line">Issued By</div></div>
  </div>
</div><script>window.print()<\/script></body></html>`}function Re({onAdded:t}){const i=new Date().toISOString().split("T")[0],[l,p]=a.useState([]),[c,u]=a.useState([]),[f,N]=a.useState(""),[z,v]=a.useState(i),[C,g]=a.useState(""),[A,d]=a.useState(""),[R,y]=a.useState(""),[o,r]=a.useState(""),[x,j]=a.useState(""),[V,_]=a.useState(""),[we,ee]=a.useState(""),[te,oe]=a.useState(""),[ne,ae]=a.useState(""),[ie,se]=a.useState(""),[re,le]=a.useState(""),[U,de]=a.useState(""),[G,ce]=a.useState(""),[Y,pe]=a.useState(""),[Z,ue]=a.useState(""),[fe,ge]=a.useState(""),[xe,he]=a.useState(!1),[me,K]=a.useState({message:"",type:"info"}),be=b(ie),ve=b(re),$=be-ve,M=$>0?$/40:0,J=b(ne),q=M*b(U),L=b(G)*J,F=q+L,T=b(Y)*J,k=F+T,P=M*b(Z),I=k-P;a.useEffect(()=>{Promise.all([W(`${B}/products?activeOnly=true`).then(n=>n.json()),W(`${B}/accounts?excludeProducts=true`).then(n=>n.json()),W(`${B}/sales-quotation/next-sr`).then(n=>n.json())]).then(([n,Q,O])=>{n.success&&p(n.products.map(h=>({...h,label:[h.productName,h.type,h.subType].filter(Boolean).join(" - ")})));const E=Array.isArray(Q)?Q:Q.accounts||[];u(E.filter(h=>h.category==="Customer").map(h=>({...h,label:h.accountName}))),O.success&&O.nextSr&&N(String(O.nextSr))})},[]);const Se=()=>{v(i),g(""),d(""),y(""),r(""),j(""),_(""),ee(""),oe(""),ae(""),se(""),le(""),de(""),ce(""),pe(""),ue(""),ge("")},ke=async n=>{n.preventDefault(),he(!0);try{const Q={date:z,vehicleNo:C,builtyNo:A,vendorName:o,vendorAccountId:R||void 0,brokerName:x,productId:V||void 0,productName:we,paddyType:te,quantity:J||null,weight:be||null,bagWeight:ve||null,netWeight:$>0?$:null,netWeight40:M>0?M:null,rate40:b(U)||null,amount:q>0?q:null,sutliSilaiRate:b(G)||null,sutliSilaiAmount:L>0?L:null,totalAmount:F>0?F:null,bardanaRate:b(Y)||null,bardanaAmount:T>0?T:null,totalWithBardana:k>0?k:null,brokeryRate:b(Z)||null,brokery:P>0?P:null,totalAmount2:I>0?I:null,notes:fe},E=await(await W(`${B}/sales-quotation/create`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Q)})).json();E.success?(K({message:E.message,type:"success"}),Se(),W(`${B}/sales-quotation/next-sr`).then(h=>h.json()).then(h=>{h.success&&N(String(h.nextSr))}),t?.()):K({message:E.message||"Failed to create quotation.",type:"error"})}catch{K({message:"Server error.",type:"error"})}finally{he(!1)}};return e.jsxs(e.Fragment,{children:[e.jsx(je,{message:me.message,type:me.type,onClose:()=>K({message:"",type:"info"})}),e.jsx("form",{onSubmit:ke,children:e.jsxs("div",{className:"pq-form-grid",style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,alignItems:"start"},children:[e.jsxs(X,{title:"Customer Information",dot:"#3b82f6",children:[e.jsxs("div",{style:D,children:[e.jsx(s,{label:"Date",children:e.jsx("input",{type:"date",value:z,max:i,onChange:n=>v(n.target.value),...m()})}),e.jsx(s,{label:"Quotation #",children:e.jsx("input",{value:f?`#${String(f).padStart(4,"0")}`:"—",...w()})})]}),e.jsxs("div",{style:D,children:[e.jsx(s,{label:"Vehicle No.",children:e.jsx("input",{value:C,onChange:n=>g($e(n.target.value)),placeholder:"e.g. LEA-1234",...m()})}),e.jsx(s,{label:"Builty No.",children:e.jsx("input",{value:A,onChange:n=>d(n.target.value),placeholder:"e.g. B-001",...m()})})]}),e.jsx(s,{label:"Customer",children:e.jsx(ye,{options:c,value:R,labelKey:"label",placeholder:"Select customer…",onChange:n=>{y(n._id),r(n.accountName)}})}),e.jsx(s,{label:"Broker Name (optional)",children:e.jsx("input",{value:x,onChange:n=>j(n.target.value),placeholder:"Broker / agent name",...m()})}),e.jsx(s,{label:"Product",children:e.jsx(ye,{options:l,value:V,labelKey:"label",placeholder:"Select product…",onChange:n=>{_(n._id),ee([n.productName,n.type,n.subType].filter(Boolean).join(" - "))}})}),e.jsx(s,{label:"Paddy Type / Grade",children:e.jsx("input",{value:te,onChange:n=>oe(n.target.value),placeholder:"e.g. Super Basmati, Grade A",...m()})}),e.jsx(s,{label:"Quantity (Bags)",children:e.jsx("input",{type:"number",min:"0",value:ne,onChange:n=>ae(n.target.value),placeholder:"0",...m()})})]}),e.jsxs(X,{title:"Weight & Calculation",dot:"#f59e0b",children:[e.jsx(s,{label:"Total / Gross Weight (kg)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:ie,onChange:n=>se(n.target.value),placeholder:"0.00",...m()})}),e.jsx(s,{label:"Bag Weight / Deduction (kg)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:re,onChange:n=>le(n.target.value),placeholder:"0.00",...m()})}),H,e.jsxs("div",{style:D,children:[e.jsx(s,{label:"Net Weight (kg)",children:e.jsx("input",{value:$>0?S($):"—",...w($>0)})}),e.jsx(s,{label:"Net Maund (auto)",children:e.jsx("input",{value:M>0?M.toFixed(4):"—",...w(M>0)})})]}),H,e.jsx(s,{label:"Rate / 40 kg (Rs.)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:U,onChange:n=>de(n.target.value),placeholder:"0.00",...m()})}),e.jsxs("div",{style:D,children:[e.jsx(s,{label:"Amount (auto)",children:e.jsx("input",{value:q>0?S(q):"—",...w(q>0)})}),e.jsx(s,{label:"Sutli / Silai (per bag)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:G,onChange:n=>ce(n.target.value),placeholder:"0.00",...m()})})]}),e.jsxs("div",{style:D,children:[e.jsx(s,{label:"Sutli Amount (auto)",children:e.jsx("input",{value:L>0?S(L):"—",...w()})}),e.jsx(s,{label:"Sub-Total (auto)",children:e.jsx("input",{value:F>0?S(F):"—",...w(F>0)})})]})]}),e.jsxs(X,{title:"Charges & Final Amount",dot:"#10b981",children:[e.jsx(s,{label:"Bardana Rate (per bag, optional)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:Y,onChange:n=>pe(n.target.value),placeholder:"0.00",...m()})}),e.jsxs("div",{style:D,children:[e.jsx(s,{label:"Bardana Amount (auto)",children:e.jsx("input",{value:T>0?S(T):"—",...w()})}),e.jsx(s,{label:"After Bardana (auto)",children:e.jsx("input",{value:k>0?S(k):"—",...w(k>0)})})]}),H,e.jsx(s,{label:"Brokery Rate (per maund, optional)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:Z,onChange:n=>ue(n.target.value),placeholder:"0.00",...m()})}),e.jsxs("div",{style:D,children:[e.jsx(s,{label:"Brokery Amount (auto)",children:e.jsx("input",{value:P>0?`− ${S(P)}`:"—",...w()})}),e.jsx(s,{label:"Final Amount (auto)",children:e.jsx("input",{value:I>0?S(I):k>0?S(k):"—",...w(I>0||k>0)})})]}),H,e.jsx(s,{label:"Quotation Notes",children:e.jsx("textarea",{value:fe,onChange:n=>ge(n.target.value),placeholder:"e.g. Pending confirmation, customer requested Grade A, expected dispatch in 2 days…",rows:4,style:{width:"100%",padding:"8px 11px",border:"1px solid #d1d5db",borderRadius:7,fontSize:13,fontFamily:"'DM Sans',sans-serif",outline:"none",resize:"vertical",color:"#111827",transition:"border-color .12s"},onFocus:n=>{n.target.style.borderColor="#6b7280",n.target.style.boxShadow="0 0 0 2px rgba(107,114,128,.12)"},onBlur:n=>{n.target.style.borderColor="#d1d5db",n.target.style.boxShadow="none"}})}),e.jsx("button",{type:"submit",disabled:xe,className:"pq-submit",children:xe?"Saving…":e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),"Add Sales Quotation"]})})]})]})})]})}function qe({refreshKey:t}){const i=Ne(),[l,p]=a.useState([]),[c,u]=a.useState(!0),[f,N]=a.useState(""),[z,v]=a.useState({message:"",type:"info"}),C=async()=>{u(!0);try{const r=await(await W(`${B}/sales-quotation`)).json();r.success&&p(r.quotations)}catch{}u(!1)};a.useEffect(()=>{C()},[t]);const g=l.filter(o=>{if(!f)return!0;const r=f.toLowerCase();return[o.vendorName,o.vehicleNo,o.builtyNo,o.productName,o.paddyType,o.brokerName,String(o.sr)].some(x=>x&&String(x).toLowerCase().includes(r))}),A=async(o,r)=>{if(window.confirm(`Delete Sales Quotation #${String(r).padStart(4,"0")}? This cannot be undone.`))try{const j=await(await W(`${B}/sales-quotation/${o}`,{method:"DELETE"})).json();j.success?(v({message:"Quotation deleted.",type:"success"}),p(V=>V.filter(_=>_._id!==o))):v({message:j.message||"Failed.",type:"error"})}catch{v({message:"Server error.",type:"error"})}},d=o=>{i("/add-invoice-sales",{state:{fromQuotation:o}})},R=o=>{const r=window.open("","_blank");r&&(r.document.write(Be(o)),r.document.close())},y=({label:o,value:r,mono:x})=>e.jsxs("div",{className:"pq-cell",children:[e.jsx("div",{className:"pq-clbl",children:o}),e.jsx("div",{className:`pq-cval${x?" mono":""}`,children:r!=null&&r!==""?r:e.jsx("span",{style:{color:"#e5e7eb"},children:"—"})})]});return e.jsxs(e.Fragment,{children:[e.jsx(je,{message:z.message,type:z.type,onClose:()=>v({message:"",type:"info"})}),e.jsxs("div",{className:"pq-search-wrap",children:[e.jsxs("div",{style:{position:"relative",flex:1,minWidth:220},children:[e.jsxs("svg",{style:{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"},width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2,children:[e.jsx("circle",{cx:11,cy:11,r:8}),e.jsx("path",{strokeLinecap:"round",d:"M21 21l-4.35-4.35"})]}),e.jsx("input",{className:"pq-inp",style:{paddingLeft:30},placeholder:"Search customer, vehicle, product, broker…",value:f,onChange:o=>N(o.target.value)})]}),f&&e.jsx("button",{onClick:()=>N(""),style:{padding:"6px 11px",border:"1px solid #fecaca",borderRadius:6,background:"#fef2f2",fontSize:11.5,fontWeight:600,color:"#dc2626",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"},children:"Clear ✕"}),e.jsxs("span",{style:{fontSize:11.5,fontFamily:"'DM Mono',monospace",color:"#6b7280",background:"#f3f4f6",border:"1px solid #e5e7eb",borderRadius:6,padding:"5px 11px"},children:[g.length,g.length!==l.length&&` / ${l.length}`," quotation",g.length!==1?"s":""]})]}),c?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(3)].map((o,r)=>e.jsxs("div",{style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden",borderLeft:"3px solid #bbf7d0"},children:[e.jsxs("div",{style:{padding:"12px 16px",borderBottom:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between",gap:10},children:[e.jsx("div",{style:{display:"flex",gap:10},children:[90,70,140,100].map((x,j)=>e.jsx("div",{className:"pq-sk",style:{height:18,width:x,borderRadius:5}},j))}),e.jsx("div",{className:"pq-sk",style:{height:30,width:90,borderRadius:6}})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)"},children:[...Array(8)].map((x,j)=>e.jsxs("div",{style:{padding:"10px 14px",borderRight:j%4!==3?"1px solid #f3f4f6":"none",borderBottom:j<4?"1px solid #f3f4f6":"none"},children:[e.jsx("div",{className:"pq-sk",style:{width:"50%",height:9,marginBottom:7}}),e.jsx("div",{className:"pq-sk",style:{width:"80%",height:13}})]},j))})]},r))}):g.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"56px 0",background:"#fff",border:"1px solid #e5e7eb",borderRadius:8},children:[e.jsx("div",{style:{fontSize:36,marginBottom:12},children:"📋"}),e.jsx("p",{style:{fontSize:13.5,fontWeight:600,color:"#374151",margin:"0 0 4px"},children:l.length===0?"No pending sales quotations":"No results found"}),e.jsx("p",{style:{fontSize:12.5,color:"#9ca3af"},children:l.length===0?"Quotations will appear here once added.":"Try adjusting your search."})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:g.map((o,r)=>{const x=o.totalAmount2||o.totalWithBardana||o.totalAmount||0;return e.jsxs("div",{className:"pq-card",style:{animationDelay:`${r*.04}s`},children:[e.jsxs("div",{className:"pq-card-head",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:5},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".07em"},children:"Sales Quotation"}),e.jsxs("span",{style:{fontSize:16,fontWeight:700,color:"#111827",fontFamily:"'DM Mono',monospace"},children:["#",String(o.sr||"").padStart(4,"0")]})]}),e.jsx("div",{style:{width:1,height:14,background:"#e5e7eb"}}),e.jsx("span",{style:{fontSize:12.5,color:"#6b7280"},children:o.date||"No date"}),e.jsx("span",{className:"pq-pending",children:"⏳ Pending"}),o.paddyType&&e.jsx("span",{style:{display:"inline-flex",alignItems:"center",padding:"2px 9px",borderRadius:4,fontSize:11.5,fontWeight:600,background:"#f3f4f6",color:"#374151",border:"1px solid #e5e7eb",fontFamily:"'DM Mono',monospace",whiteSpace:"nowrap"},children:o.paddyType}),!o.paddyType&&o.productName&&e.jsx("span",{style:{display:"inline-flex",alignItems:"center",padding:"2px 9px",borderRadius:4,fontSize:11.5,fontWeight:600,background:"#f3f4f6",color:"#374151",border:"1px solid #e5e7eb",fontFamily:"'DM Mono',monospace",whiteSpace:"nowrap"},children:o.productName}),o.notes&&e.jsxs("span",{style:{fontSize:11.5,color:"#059669",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:4,padding:"2px 8px",maxWidth:220,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:["📝 ",o.notes]})]}),e.jsxs("div",{style:{display:"flex",gap:6,flexShrink:0},children:[e.jsxs("button",{className:"pq-btn-print",onClick:()=>R(o),children:[e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"})}),"Print"]}),e.jsxs("button",{className:"pq-btn-delete",onClick:()=>A(o._id,o.sr),children:[e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})}),"Delete"]}),e.jsxs("button",{className:"pq-btn-fulfil",onClick:()=>d(o),children:[e.jsx("svg",{width:12,height:12,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})}),"Fulfil Invoice"]})]})]}),e.jsxs("div",{className:"pq-card-grid",children:[e.jsx(y,{label:"Customer",value:o.vendorName}),e.jsx(y,{label:"Vehicle No.",value:o.vehicleNo,mono:!0}),e.jsx(y,{label:"Builty #",value:o.builtyNo,mono:!0}),e.jsx(y,{label:"Broker",value:o.brokerName}),e.jsx(y,{label:"Qty (Bags)",value:o.quantity,mono:!0}),e.jsx(y,{label:"Gross Wt. (kg)",value:o.weight!=null?`${o.weight} kg`:null,mono:!0}),e.jsx(y,{label:"Net Maund",value:o.netWeight40!=null?`${Number(o.netWeight40).toFixed(4)} Mn`:null,mono:!0}),e.jsx(y,{label:"Rate / 40 kg",value:o.rate40!=null?`Rs ${Number(o.rate40).toLocaleString("en-PK")}`:null,mono:!0})]}),e.jsxs("div",{className:"pq-card-foot",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"},children:[o.netWeight40>0&&e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:1},children:"Net Maund"}),e.jsxs("div",{style:{fontSize:13,fontWeight:700,color:"#15803d",fontFamily:"'DM Mono',monospace"},children:[Number(o.netWeight40).toFixed(4)," Mn"]})]}),x>0&&e.jsxs(e.Fragment,{children:[o.netWeight40>0&&e.jsx("div",{style:{width:1,height:22,background:"#bbf7d0"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#9ca3af",marginBottom:1},children:"Est. Amount"}),e.jsxs("div",{style:{fontSize:13,fontWeight:700,color:"#374151",fontFamily:"'DM Mono',monospace"},children:["Rs ",S(x)]})]})]}),e.jsxs("div",{style:{fontSize:11,color:"#9ca3af",fontFamily:"'DM Mono',monospace"},children:["Added ",new Date(o.createdAt).toLocaleDateString("en-PK")]})]}),e.jsx("div",{style:{fontSize:11.5,color:"#059669",fontWeight:600},children:'Click "Fulfil Invoice" to complete & convert →'})]})]},o._id)})}),!c&&g.length>0&&e.jsxs("p",{style:{textAlign:"center",color:"#9ca3af",fontSize:11.5,marginTop:14,fontFamily:"'DM Mono',monospace"},children:[g.length," quotation",g.length!==1?"s":""," pending",f?` · filtered from ${l.length} total`:""]})]})}function Ie(){const[t,i]=a.useState("add"),[l,p]=a.useState(0),c=()=>{p(u=>u+1)};return e.jsxs(ze,{children:[e.jsxs("style",{children:[Ae,Ce]}),e.jsxs("div",{className:"pq-wrap",children:[e.jsxs("div",{style:{marginBottom:18},children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"Sales"}),e.jsx("h1",{style:{fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px",margin:0},children:"Sales Quotations"}),e.jsx("p",{style:{fontSize:12.5,color:"#6b7280",margin:"4px 0 0"},children:"Pre-record a sale before final weighing — convert to a full invoice once confirmed and dispatched."})]}),e.jsxs("div",{className:"pq-tabs",children:[e.jsxs("button",{className:`pq-tab${t==="add"?" active":""}`,onClick:()=>i("add"),children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4v16m8-8H4"})}),"Add Quotation"]}),e.jsxs("button",{className:`pq-tab${t==="view"?" active":""}`,onClick:()=>i("view"),children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})}),"View Quotations"]})]}),t==="add"&&e.jsx(Re,{onAdded:c}),t==="view"&&e.jsx(qe,{refreshKey:l})]})]})}export{Ie as default};
