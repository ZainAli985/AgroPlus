import{u as it,b as st,a as s,j as t}from"./vendor-react-BFXNeceC.js";import{a as W,N as nt,S as rt,A}from"./index-CaKzjFRj.js";import"./vendor-react-dom-DDWplefk.js";import"./vendor-DDAwBBib.js";const at="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",lt=`
  *, *::before, *::after { box-sizing: border-box; }
  .pi-wrap { font-family: 'DM Sans', sans-serif; color: #111827; }
  .pi-no-spin::-webkit-inner-spin-button,
  .pi-no-spin::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  .pi-no-spin { -moz-appearance: textfield; }

  .pi-panel {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; overflow: hidden;
  }
  .pi-panel-head {
    padding: 9px 14px; background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    display: flex; align-items: center; gap: 8px;
  }
  .pi-panel-body {
    padding: 14px; display: flex;
    flex-direction: column; gap: 11px;
  }

  .pi-inp, .pi-ro {
    width: 100%; padding: 8px 11px;
    border: 1px solid #d1d5db; border-radius: 7px;
    font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s;
  }
  .pi-inp::placeholder { color: #9ca3af; }
  .pi-inp:focus {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .pi-inp.err { border-color: #fca5a5; background: #fff5f5; }
  .pi-inp.err:focus { box-shadow: 0 0 0 2px rgba(239,68,68,.12); }
  .pi-ro {
    background: #f9fafb; color: #6b7280;
    font-family: 'DM Mono', monospace;
    cursor: default;
  }
  .pi-ro.hi {
    background: #f0fdf4; color: #15803d;
    border-color: #bbf7d0; font-weight: 600;
  }

  .pi-sd-btn {
    width: 100%; padding: 8px 11px;
    border: 1px solid #d1d5db; border-radius: 7px;
    background: #fff; font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: #9ca3af; cursor: pointer; outline: none;
    display: flex; align-items: center;
    justify-content: space-between; gap: 6px;
    transition: border-color .12s, box-shadow .12s;
  }
  .pi-sd-btn.sel { color: #111827; }
  .pi-sd-btn.err { border-color: #fca5a5; background: #fff5f5; }
  .pi-sd-btn:focus, .pi-sd-btn.open {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .pi-sd-panel {
    position: absolute; left: 0; top: calc(100% + 3px);
    width: max(100%, 260px); z-index: 300;
    background: #fff; border: 1px solid #d1d5db;
    border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,.1);
    overflow: hidden;
  }
  .pi-sd-item {
    padding: 8px 12px; font-size: 13px; cursor: pointer;
    border-bottom: 1px solid #f9fafb; color: #111827;
    transition: background .08s;
  }
  .pi-sd-item:last-child { border-bottom: none; }
  .pi-sd-item:hover { background: #f3f4f6; }
  .pi-sd-item.sel { background: #f3f4f6; font-weight: 600; }

  .pi-lbl {
    display: flex; align-items: center; gap: 4px;
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: #6b7280; margin-bottom: 5px;
  }
  .pi-lbl.err { color: #ef4444; }
  .pi-lbl span.req { color: #ef4444; font-size: 12px; line-height: 1; }
  .pi-lbl span.errtag {
    font-size: 9.5px; background: #fef2f2; color: #ef4444;
    padding: 1px 5px; border-radius: 4px; border: 1px solid #fecaca;
    font-weight: 700; letter-spacing: .03em;
  }

  .pi-divider { height: 1px; background: #f3f4f6; margin: 2px 0; }

  .pi-net-box {
    background: #f9fafb; border: 1px solid #e5e7eb;
    border-radius: 8px; padding: 12px 14px;
    display: flex; justify-content: space-between; align-items: center;
  }

  .pi-submit {
    width: 100%; padding: 10px 0; border-radius: 7px; border: none;
    background: #111827; color: #fff; font-size: 13.5px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background .12s;
  }
  .pi-submit:hover:not(:disabled) { background: #1f2937; }
  .pi-submit:disabled { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; }

  @media (max-width: 900px)  { .inv-grid { grid-template-columns: 1fr !important; } }
  @media (max-width: 1200px) { .inv-grid { grid-template-columns: 1fr 1fr !important; } }
`;function dt(o){const n=o.toUpperCase().replace(/[^A-Z0-9]/g,"");if(n.length>0&&/^[0-9]/.test(n))return"";const b=n.match(/^[A-Z]+/),l=b?b[0]:"",h=n.slice(l.length);return l?h?`${l}-${h}`:l:""}function ct(o){o.target.blur()}function ut(o){(o.key==="ArrowUp"||o.key==="ArrowDown")&&o.preventDefault()}function Re({options:o,value:n,onChange:b,placeholder:l,labelKey:h="label",error:C,disabled:z}){const[x,T]=s.useState(!1),[D,w]=s.useState(""),M=s.useRef(null),f=s.useRef(null);s.useEffect(()=>{const r=V=>{M.current&&!M.current.contains(V.target)&&T(!1)};return document.addEventListener("mousedown",r),()=>document.removeEventListener("mousedown",r)},[]),s.useEffect(()=>{x&&setTimeout(()=>f.current?.focus(),0)},[x]);const F=o.filter(r=>(r[h]||"").toLowerCase().includes(D.toLowerCase())),B=o.find(r=>r._id===n||r.value===n);return t.jsxs("div",{ref:M,style:{position:"relative"},children:[t.jsxs("button",{type:"button",disabled:z,onClick:()=>!z&&T(r=>!r),className:`pi-sd-btn${B?" sel":""}${C?" err":""}${x?" open":""}`,children:[t.jsx("span",{style:{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textAlign:"left"},children:B?B[h]:l}),t.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2.5,style:{flexShrink:0,transition:".15s",transform:x?"rotate(180deg)":"none"},children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),x&&t.jsxs("div",{className:"pi-sd-panel",children:[t.jsx("div",{style:{padding:7,borderBottom:"1px solid #f3f4f6",background:"#f9fafb"},children:t.jsx("input",{ref:f,value:D,onChange:r=>w(r.target.value),placeholder:"Search…",style:{width:"100%",padding:"6px 9px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12.5,outline:"none",fontFamily:"'DM Sans',sans-serif"}})}),t.jsx("ul",{style:{maxHeight:210,overflowY:"auto",margin:0,padding:0,listStyle:"none"},children:F.length===0?t.jsx("li",{style:{padding:"9px 12px",fontSize:12.5,color:"#9ca3af",textAlign:"center"},children:"No results"}):F.map(r=>t.jsx("li",{className:`pi-sd-item${(r._id||r.value)===n?" sel":""}`,onClick:()=>{b(r),T(!1),w("")},children:r[h]},r._id||r.value))})]})]})}function a({label:o,required:n,error:b,children:l}){return t.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[t.jsxs("div",{className:`pi-lbl${b?" err":""}`,children:[o,n&&t.jsx("span",{className:"req",children:"*"}),b&&t.jsx("span",{className:"errtag",children:"Required"})]}),l]})}function We({title:o,dot:n,children:b}){return t.jsxs("div",{className:"pi-panel",children:[t.jsxs("div",{className:"pi-panel-head",children:[t.jsx("div",{style:{width:7,height:7,borderRadius:"50%",background:n,flexShrink:0}}),t.jsx("span",{style:{fontSize:10.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#374151"},children:o})]}),t.jsx("div",{className:"pi-panel-body",children:b})]})}function pt(o){return{name:o?.businessName||localStorage.getItem("businessName")||"Mill",logo:o?.logoUrl||localStorage.getItem("logoUrl")||"",address:o?.address||o?.millAddress||"",phone1:o?.phone||o?.phone1||"",phone2:o?.phone2||""}}function ft(o,n,b){const l=b||{},h=l.name||localStorage.getItem("businessName")||"Mill",C=l.logo||localStorage.getItem("logoUrl")||"",z=l.address||"",x=[l.phone1,l.phone2].filter(Boolean).join("  |  "),D=(Array.isArray(o.rateRows)&&o.rateRows.length?o.rateRows:[{maund:Number(o.netWeightMaund||0),rate:Number(o.rate40kg||0),amount:Number(o.totalAmount||0)}]).filter(f=>f.maund||f.rate).map(f=>`<tr><td>${Number(f.maund||0).toFixed(4)} Mn × ${Number(f.rate||0).toLocaleString("en-PK")}</td><td>${Number(f.amount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`).join(""),w=C?`<img src="${C}" alt="logo" style="height:48px;width:48px;object-fit:contain;border-radius:6px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);padding:3px;"/>`:`<div style="width:48px;height:48px;border-radius:8px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#fff;">${h.charAt(0)}</div>`,M=String(n).padStart(4,"0");return`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Purchase #${M}</title>
<style>
  @page{size:A5;margin:7mm}*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Segoe UI",Arial,sans-serif;background:#fff;color:#111;font-size:10.5px}.wrap{max-width:130mm;margin:0 auto}
  .hd{background:#111827;padding:10px 12px;border-radius:7px 7px 0 0;display:flex;align-items:center;gap:10px}
  .hd-info{flex:1;min-width:0}.hd-name{font-size:14px;font-weight:800;color:#fff;letter-spacing:-.2px;line-height:1.2}
  .hd-sub{font-size:8.5px;color:rgba(255,255,255,.45);margin-top:2px}
  .hd-right{text-align:right;flex-shrink:0}.hd-type{font-size:9px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#4ade80;margin-bottom:4px}
  .hd-no{font-size:18px;font-weight:800;color:#fff;font-family:"Courier New",monospace;letter-spacing:1px}
  .hd-date{font-size:8.5px;color:rgba(255,255,255,.4);margin-top:2px}
  .meta{display:grid;grid-template-columns:1fr 1fr;border:1px solid #e5e7eb;border-top:none}
  .meta-cell{padding:6px 9px;border-right:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6}
  .meta-cell:nth-child(2n){border-right:none}.meta-cell:nth-last-child(-n+2){border-bottom:none}
  .mc-lbl{font-size:7.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;margin-bottom:2px}
  .mc-val{font-size:11px;font-weight:600;color:#111}.mc-val.mono{font-family:"Courier New",monospace}
  .sec-head{background:#f9fafb;border:1px solid #e5e7eb;border-bottom:none;padding:4px 9px;font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#6b7280;margin-top:6px;border-radius:5px 5px 0 0}
  table{width:100%;border-collapse:collapse;font-size:10.5px}table td,table th{padding:5px 8px;border:1px solid #e5e7eb}
  table th{background:#f3f4f6;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#6b7280}
  table td:last-child,table th:last-child{text-align:right}
  tr.sub td{background:#f9fafb;font-weight:700}
  .total-box{border:2px solid #111827;border-radius:0 0 7px 7px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;margin-top:-1px}
  .total-lbl{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#6b7280}
  .total-val{font-size:18px;font-weight:800;color:#111827;font-family:"Courier New",monospace}
  .ft{display:flex;justify-content:space-between;margin-top:12px;padding-top:8px;border-top:1px dashed #e5e7eb}
  .sig-line{width:44%;text-align:center}.sig-line .line{border-top:1px solid #374151;padding-top:3px;margin-top:20px;font-size:8px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body>
<div class="wrap">
  <div class="hd">${w}<div class="hd-info"><div class="hd-name">${h}</div>${z?`<div class="hd-sub">${z}</div>`:""} ${x?`<div class="hd-sub">${x}</div>`:""}</div><div class="hd-right"><div class="hd-type">Purchase</div><div class="hd-no">#${M}</div><div class="hd-date">${o.date||""}</div></div></div>
  <div class="meta">
    <div class="meta-cell"><div class="mc-lbl">Vendor</div><div class="mc-val">${o.vendorName||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Vehicle</div><div class="mc-val mono">${o.vehicleNumber||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Product</div><div class="mc-val">${o.productName||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Builty #</div><div class="mc-val mono">${o.builtyNumber||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Bag Type</div><div class="mc-val">${o.bagTypeName||"—"}${o.bagWeightPerBag?` (${o.bagWeightPerBag}kg)`:""}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Moisture</div><div class="mc-val mono">${o.moisturePercent||0}% (Base ${o.baseMoisture||0}%)</div></div>
  </div>
  <div class="sec-head">Weight Breakdown</div>
  <table>
    <tr><th>Description</th><th>Value</th></tr>
    <tr><td>Qty (Bags)</td><td>${Number(o.quantity||0)}</td></tr>
    <tr><td>Gross Weight</td><td>${Number(o.grossWeight||0).toFixed(2)} kg</td></tr>
    <tr><td>Bag Deduction</td><td>− ${Number(o.totalBagWeight||0).toFixed(2)} kg</td></tr>
    <tr><td>Moisture Adj.</td><td>− ${Number(o.moistureAdjustment||0).toFixed(0)} kg</td></tr>
    <tr class="sub"><td>Net Weight</td><td>${Number(o.netWeightKg||0).toFixed(2)} kg</td></tr>
    <tr class="sub"><td>Net Maund</td><td>${Number(o.netWeightMaund||0).toFixed(4)} Mn</td></tr>
  </table>
  <div class="sec-head" style="margin-top:5px">Rate & Amount</div>
  <table>
    <tr><th>Rate Breakdown</th><th>Amount (Rs)</th></tr>
    ${D}
    <tr class="sub"><td>Total Amount</td><td>${Number(o.totalAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>
    ${Number(o.rentAdjustment||0)>0?`<tr><td>− Rent Adj.</td><td>${Number(o.rentAdjustment).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
  </table>
  <div class="total-box"><div><div class="total-lbl">Net Payable</div></div><div class="total-val">Rs ${Number(o.finalAmount||o.totalAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</div></div>
  <div class="ft"><div class="sig-line"><div class="line">Supplier Signature</div></div><div style="font-size:8px;color:#d1d5db;align-self:flex-end">Powered by Agro Plus</div><div class="sig-line"><div class="line">Authorised Signatory</div></div></div>
</div><script>window.print()<\/script></body></html>`}const I={display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},d=o=>isNaN(Number(o))?0:Number(o)||0,P=(o,n=2)=>d(o).toLocaleString("en-PK",{minimumFractionDigits:n,maximumFractionDigits:n}),Ae=t.jsx("div",{className:"pi-divider"}),j=o=>({className:`pi-inp pi-no-spin${o?" err":""}`,onFocus:n=>{o||(n.target.style.borderColor="#6b7280",n.target.style.boxShadow="0 0 0 2px rgba(107,114,128,.12)")},onBlur:n=>{o||(n.target.style.borderColor="#d1d5db",n.target.style.boxShadow="none")},onWheel:ct,onKeyDown:ut}),S=(o=!1)=>({className:`pi-ro${o?" hi":""}`,readOnly:!0});function vt(){const o=new Date().toISOString().split("T")[0],n=it(),b=st(),l=n.state?.fromQuotation??null,[h,C]=s.useState([]),[z,x]=s.useState([]),[T,D]=s.useState([]),[w,M]=s.useState({baseMoisture:0,weightCut:0}),[f,F]=s.useState(""),[B,r]=s.useState(o),[V,X]=s.useState(""),[ee,te]=s.useState(""),[oe,ie]=s.useState(""),[Ke,se]=s.useState(""),[ne,re]=s.useState(""),[_e,ae]=s.useState(""),[q,le]=s.useState("added"),[de,ce]=s.useState(""),[ue,pe]=s.useState(""),[Me,fe]=s.useState(""),[Ve,ge]=s.useState(""),[L,me]=s.useState(0),[$,be]=s.useState(""),[m,he]=s.useState(!1),[$e,H]=s.useState(""),[xe,ye]=s.useState(""),[ve,je]=s.useState(!1),[E,Se]=s.useState(""),[G,O]=s.useState([{id:1,maund:"",rate:"",amount:""}]),[c,y]=s.useState({}),[Ie,ze]=s.useState(!1),[Be,Q]=s.useState({message:"",type:"info"}),[Y,Pe]=s.useState(!1),[Z,Ce]=s.useState(null),[Qe,Ue]=s.useState({}),[Te,He]=s.useState(l?._id??null),De=s.useRef(null);s.useEffect(()=>{if(!l)return;const e=l;if(e.date&&r(e.date),e.vehicleNumber&&X(e.vehicleNumber),e.builtyNumber&&te(e.builtyNumber),e.vendorAccountId&&e.vendorName&&(ie(typeof e.vendorAccountId=="object"?e.vendorAccountId._id:e.vendorAccountId),se(e.vendorName)),e.productId&&e.productName&&(re(typeof e.productId=="object"?e.productId._id:e.productId),ae(e.productName)),e.bagStatus&&le(e.bagStatus),e.quantity&&ce(String(e.quantity)),e.grossWeight&&pe(String(e.grossWeight)),e.bagTypeId&&e.bagTypeName&&(fe(typeof e.bagTypeId=="object"?e.bagTypeId._id:e.bagTypeId),ge(e.bagTypeName),e.bagWeightPerBag&&me(e.bagWeightPerBag)),e.moisturePercent!=null&&be(String(e.moisturePercent)),e.moistureOverride&&he(!0),e.moistureAdjustment!=null&&H(String(e.moistureAdjustment)),e.rentAdjustment&&ye(String(e.rentAdjustment)),e.rateRows?.length){const i=e.rateRows[0];i?.rate&&Se(String(i.rate))}F(String(e.sr))},[]);const K=d(de),we=d(ue),U=K*L,J=d(w.baseMoisture),Fe=d(w.weightCut),Ge=$!==""&&d($)>J?(d($)-J)*Fe*K:0,qe=Math.round(Ge),Le=m?d($e):qe,N=we-(q==="added"?U:0)-Le,v=N>0?N/40:0;let k=0,_=[];if(ve)_=G.map(e=>({...e,amount:d(e.maund)*d(e.rate)})),k=_.reduce((e,i)=>e+i.amount,0);else{const e=v*d(E);k=e,_=[{id:1,maund:v,rate:d(E),amount:e}]}const Ne=k-d(xe);s.useEffect(()=>{m||H(String(qe))},[$,K,w,m]),s.useEffect(()=>{Promise.all([W(`${A}/products?activeOnly=true`).then(e=>e.json()),W(`${A}/accounts?excludeProducts=true`).then(e=>e.json()),W(`${A}/profile/bag-types`).then(e=>e.json()),W(`${A}/profile/mill-settings`).then(e=>e.json()),W(`${A}/purchase-invoice/next-sr`).then(e=>e.json()),W(`${A}/profile`).then(e=>e.json()).catch(()=>({}))]).then(([e,i,g,R,u,ke])=>{ke&&Ue(ke.profile||ke||{}),e.success&&C(e.products.map(p=>({...p,label:p.displayName||[p.productName,p.type,p.subType].filter(Boolean).join(" - ")})));const ot=(Array.isArray(i)?i:i.accounts||[]).filter(p=>p.category==="Supplier");x(ot.map(p=>({...p,label:p.accountName}))),g.bagTypes&&D(g.bagTypes.filter(p=>p.isActive).map(p=>({...p,label:`${p.bagTypeName} (${p.bagWeight} kg)`}))),R.settings&&M(R.settings),u.success&&u.nextSr&&F(String(u.nextSr))})},[]),s.useEffect(()=>{if(!Z)return;const e=window.open("","_blank");e&&(e.document.write(ft(Z,Z.sr,pt(Qe))),e.document.close()),Ce(null)},[Z]);const Ye=()=>{const e={};return B||(e.date=!0),V||(e.vehicleNo=!0),ee||(e.builtyNo=!0),oe||(e.vendorId=!0),ne||(e.productId=!0),de||(e.quantity=!0),ue||(e.grossWeight=!0),!ve&&!E&&(e.singleRate=!0),y(e),Object.keys(e).length===0},Ze=e=>{if(e.key!=="Enter")return;const i=De.current?.querySelectorAll("input:not([readonly]):not([type=submit]),select");if(!i?.length)return;const g=[...i].indexOf(e.target);g>=0&&g<i.length-1&&(e.preventDefault(),i[g+1].focus())},Je=()=>O(e=>[...e,{id:Date.now(),maund:"",rate:"",amount:""}]),Xe=e=>O(i=>i.filter(g=>g.id!==e)),Ee=(e,i,g)=>O(R=>R.map(u=>u.id===e?{...u,[i]:g}:u)),et=()=>{r(o),X(""),te(""),ie(""),se(""),re(""),ae(""),le("added"),ce(""),pe(""),fe(""),ge(""),me(0),be(""),he(!1),H(""),ye(""),Se(""),je(!1),O([{id:1,maund:"",rate:"",amount:""}]),y({})},tt=async e=>{if(e.preventDefault(),!Ye()){Q({message:"Please fill all required fields",type:"error"});return}ze(!0);try{const i={sr:Number(f),date:B,vendorName:Ke,vendorAccountId:oe||void 0,vehicleNumber:V,builtyNumber:ee,productId:ne,productName:_e,bagStatus:q,quantity:K,grossWeight:we,bagTypeId:Me||void 0,bagTypeName:Ve,bagWeightPerBag:L,totalBagWeight:U,moisturePercent:d($),baseMoisture:J,weightCut:Fe,moistureAdjustment:Le,moistureOverride:m,netWeightKg:N>0?N:0,netWeightMaund:v>0?v:0,rateRows:_.filter(u=>u.maund||u.rate),totalAmount:k,rentAdjustment:d(xe),finalAmount:Ne,netWeight:N>0?N:0,netWeight40KG:v>0?v:0,amount:k,bagWeight:U,finalWeight:we,rate40kg:d(E)||_[0]?.rate||0},R=await(await W(`${A}/purchase-invoice/create`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})).json();R.success?(Q({message:`Invoice #${String(R.invoice.sr).padStart(4,"0")} saved!`,type:"success"}),Ce(R.invoice),Te&&(W(`${A}/purchase-quotation/${Te}`,{method:"DELETE"}).catch(()=>{}),He(null),window.history.replaceState({},document.title,window.location.pathname)),et(),W(`${A}/purchase-invoice/next-sr`).then(u=>u.json()).then(u=>{u.success&&u.nextSr&&F(String(u.nextSr))})):Q({message:R.message||"Failed to save.",type:"error"})}catch{Q({message:"Server error.",type:"error"})}finally{ze(!1)}};s.useEffect(()=>{const e=i=>{i.key==="Escape"&&Y&&Pe(!1)};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[Y]);const Oe=t.jsxs(t.Fragment,{children:[t.jsxs("style",{children:[at,lt]}),t.jsx(nt,{message:Be.message,type:Be.type,onClose:()=>Q({message:"",type:"info"})}),t.jsxs("div",{className:"pi-wrap",style:{maxWidth:1100,margin:"0 auto"},children:[l&&t.jsxs("div",{style:{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"10px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:10},children:[t.jsx("span",{style:{fontSize:18},children:"📋"}),t.jsxs("div",{style:{flex:1},children:[t.jsxs("div",{style:{fontSize:12.5,fontWeight:700,color:"#92400e"},children:["Converting Quotation #",String(l.sr).padStart(4,"0")," to Invoice"]}),t.jsx("div",{style:{fontSize:11.5,color:"#b45309",marginTop:1},children:"Pre-filled from quotation. Fill in the remaining details and save — the quotation will be deleted automatically."})]}),t.jsx("button",{type:"button",onClick:()=>b("/purchase-quotation"),style:{fontSize:11.5,fontWeight:500,padding:"5px 11px",border:"1px solid #fde68a",borderRadius:6,background:"#fff",color:"#b45309",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"},children:"Back to Quotations"})]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,gap:10,flexWrap:"wrap"},children:[t.jsxs("div",{children:[t.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"Procurement"}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[t.jsx("h1",{style:{fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px",margin:0},children:"Purchase Invoice"}),t.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:600,background:"#f3f4f6",color:"#374151",padding:"2px 8px",borderRadius:5,border:"1px solid #e5e7eb"},children:["#",f?String(f).padStart(4,"0"):"——"]})]})]}),t.jsx("button",{type:"button",onClick:()=>Pe(e=>!e),style:{fontSize:11.5,fontWeight:500,padding:"6px 12px",borderRadius:6,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",cursor:"pointer"},children:Y?"Exit Full Screen":"Full Screen"})]}),t.jsx("form",{ref:De,onSubmit:tt,onKeyDown:Ze,children:t.jsxs("div",{className:"inv-grid",style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:12,alignItems:"start"},children:[t.jsxs(We,{title:"Basic Information",dot:"#3b82f6",children:[t.jsxs("div",{style:I,children:[t.jsx(a,{label:"Date",required:!0,error:c.date,children:t.jsx("input",{type:"date",value:B,max:o,onChange:e=>{r(e.target.value),y(i=>({...i,date:!1}))},...j(c.date)})}),t.jsx(a,{label:"Invoice #",children:t.jsx("input",{value:f?`#${String(f).padStart(4,"0")}`:"—",...S(!1)})})]}),t.jsxs("div",{style:I,children:[t.jsx(a,{label:"Vehicle No.",required:!0,error:c.vehicleNo,children:t.jsx("input",{value:V,onChange:e=>{X(dt(e.target.value)),y(i=>({...i,vehicleNo:!1}))},placeholder:"e.g. LEA-1234",...j(c.vehicleNo)})}),t.jsx(a,{label:"Builty No.",required:!0,error:c.builtyNo,children:t.jsx("input",{value:ee,onChange:e=>{te(e.target.value),y(i=>({...i,builtyNo:!1}))},placeholder:"e.g. B-001",...j(c.builtyNo)})})]}),t.jsx(a,{label:"Vendor",required:!0,error:c.vendorId,children:t.jsx(Re,{options:z,value:oe,labelKey:"label",placeholder:"Select vendor…",error:c.vendorId,onChange:e=>{ie(e._id),se(e.accountName),y(i=>({...i,vendorId:!1}))}})}),t.jsx(a,{label:"Product",required:!0,error:c.productId,children:t.jsx(Re,{options:h,value:ne,labelKey:"label",placeholder:"Select product…",error:c.productId,onChange:e=>{re(e._id),ae(e.displayName||[e.productName,e.type,e.subType].filter(Boolean).join(" - ")),y(i=>({...i,productId:!1}))}})}),t.jsx(a,{label:"Bag Status",children:t.jsx("div",{style:{display:"flex",gap:7},children:[["added","Bag Added"],["return","Bag Return"]].map(([e,i])=>t.jsx("button",{type:"button",onClick:()=>le(e),style:{flex:1,padding:"8px 0",borderRadius:7,cursor:"pointer",border:`1px solid ${q===e?"#111827":"#e5e7eb"}`,background:q===e?"#111827":"#fff",color:q===e?"#fff":"#6b7280",fontSize:12.5,fontWeight:500,fontFamily:"'DM Sans',sans-serif",transition:"all .1s"},children:i},e))})}),t.jsx(a,{label:"Quantity (Bags)",required:!0,error:c.quantity,children:t.jsx("input",{type:"number",min:"0",value:de,onChange:e=>{ce(e.target.value),y(i=>({...i,quantity:!1}))},placeholder:"0",...j(c.quantity)})})]}),t.jsxs(We,{title:"Weight & Moisture",dot:"#f59e0b",children:[t.jsx(a,{label:"Gross Weight (kg)",required:!0,error:c.grossWeight,children:t.jsx("input",{type:"number",min:"0",step:"0.01",value:ue,onChange:e=>{pe(e.target.value),y(i=>({...i,grossWeight:!1}))},placeholder:"0.00",...j(c.grossWeight)})}),t.jsxs("div",{style:I,children:[t.jsx(a,{label:"Bag Type",children:t.jsx(Re,{options:T,value:Me,labelKey:"label",placeholder:"Select bag type…",onChange:e=>{fe(e._id),ge(e.bagTypeName),me(e.bagWeight)}})}),t.jsx(a,{label:"Bag Wt / Bag",children:t.jsx("input",{value:L?`${L} kg`:"—",...S(!1)})})]}),t.jsxs("div",{style:I,children:[t.jsx(a,{label:"Total Bag Weight",children:t.jsx("input",{value:K&&L?`${P(U)} kg`:"—",...S(!1)})}),t.jsx(a,{label:"Bag Deduction",children:t.jsx("input",{value:q==="added"?K&&L?`− ${P(U)} kg`:"—":"None",...S(!1)})})]}),Ae,t.jsxs("div",{style:I,children:[t.jsx(a,{label:"Moisture %",children:t.jsx("input",{type:"number",min:"0",step:"0.01",value:$,onChange:e=>be(e.target.value),placeholder:`Base: ${w.baseMoisture}%`,...j(!1)})}),t.jsxs(a,{label:"Moisture Adj. (kg)",children:[t.jsxs("div",{style:{position:"relative"},children:[t.jsx("input",{type:"number",step:"1",value:$e,readOnly:!m,onChange:e=>m&&H(e.target.value),className:`pi-no-spin${m?" pi-inp":" pi-ro"}`,style:{width:"100%",paddingRight:64,padding:"8px 64px 8px 11px",border:"1px solid #d1d5db",borderRadius:7,fontSize:13,fontFamily:m?"'DM Sans',sans-serif":"'DM Mono',monospace",outline:"none",background:m?"#fff":"#f9fafb",color:m?"#111827":"#6b7280"}}),t.jsx("button",{type:"button",onClick:()=>he(e=>!e),style:{position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",padding:"2px 7px",borderRadius:5,border:"1px solid #e5e7eb",background:m?"#fef9c3":"#f9fafb",color:m?"#92400e":"#9ca3af",fontSize:10,fontWeight:600,cursor:"pointer"},children:m?"Manual":"Auto"})]}),!m&&d($)>0&&d($)<=J&&t.jsx("div",{style:{fontSize:10.5,color:"#15803d",marginTop:2},children:"✓ Within base — no deduction"})]})]}),Ae,t.jsxs("div",{style:I,children:[t.jsx(a,{label:"Net Weight (kg)",children:t.jsx("input",{value:N>0?P(N):"—",...S(N>0)})}),t.jsx(a,{label:"Net Weight (Maund)",children:t.jsx("input",{value:v>0?v.toFixed(4):"—",...S(!1)})})]})]}),t.jsxs(We,{title:"Pricing & Summary",dot:"#10b981",children:[ve?t.jsxs(t.Fragment,{children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2},children:[t.jsx("label",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#6b7280"},children:"Rate Rows"}),t.jsxs("div",{style:{display:"flex",gap:6},children:[t.jsx("button",{type:"button",onClick:Je,style:{fontSize:11.5,fontWeight:500,color:"#374151",background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:5,padding:"3px 9px",cursor:"pointer"},children:"+ Row"}),t.jsx("button",{type:"button",onClick:()=>{je(!1),O([{id:1,maund:"",rate:"",amount:""}])},style:{fontSize:11.5,fontWeight:500,color:"#6b7280",background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:5,padding:"3px 9px",cursor:"pointer"},children:"Single Rate"})]})]}),t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:7},children:_.map((e,i)=>t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr auto",gap:7,alignItems:"center"},children:[t.jsxs("div",{children:[i===0&&t.jsx("div",{style:{fontSize:9.5,color:"#9ca3af",fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",marginBottom:3},children:"Maund"}),t.jsx("input",{type:"number",min:"0",step:"0.01",value:G[i]?.maund||"",onChange:g=>Ee(e.id,"maund",g.target.value),placeholder:"0.000",...j(!1)})]}),t.jsxs("div",{children:[i===0&&t.jsx("div",{style:{fontSize:9.5,color:"#9ca3af",fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",marginBottom:3},children:"Rate (Rs/40kg)"}),t.jsx("input",{type:"number",min:"0",step:"0.01",value:G[i]?.rate||"",onChange:g=>Ee(e.id,"rate",g.target.value),placeholder:"0.00",...j(!1)})]}),t.jsxs("div",{children:[i===0&&t.jsx("div",{style:{fontSize:9.5,color:"#9ca3af",fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",marginBottom:3},children:"Amount"}),t.jsx("input",{value:e.amount>0?P(e.amount):"—",...S(!1)})]}),t.jsx("div",{style:{paddingTop:i===0?18:0},children:G.length>1&&t.jsx("button",{type:"button",onClick:()=>Xe(e.id),style:{width:28,height:28,borderRadius:6,border:"1px solid #fecaca",background:"#fef2f2",color:"#dc2626",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14},children:"×"})})]},e.id))})]}):t.jsxs(t.Fragment,{children:[t.jsx(a,{label:"Rate / 40 kg (Rs.)",required:!0,error:c.singleRate,children:t.jsx("input",{type:"number",min:"0",step:"0.01",value:E,onChange:e=>{Se(e.target.value),y(i=>({...i,singleRate:!1}))},placeholder:"0.00",...j(c.singleRate)})}),t.jsxs("div",{style:I,children:[t.jsx(a,{label:"Net Maund (auto)",children:t.jsx("input",{value:v>0?v.toFixed(4):"—",...S(!1)})}),t.jsx(a,{label:"Amount (Rs.)",children:t.jsx("input",{value:k>0?P(k):"—",...S(!1)})})]}),t.jsxs("button",{type:"button",onClick:()=>{je(!0),O([{id:1,maund:"",rate:E,amount:""}])},style:{fontSize:12,fontWeight:500,color:"#374151",background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:7,padding:"7px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,width:"fit-content"},children:[t.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4v16m8-8H4"})}),"Add multiple rates"]})]}),Ae,t.jsxs("div",{style:I,children:[t.jsx(a,{label:"Total Amount (Rs)",children:t.jsx("input",{value:k>0?P(k):"—",...S(!1)})}),t.jsx(a,{label:"Rent Adjustment (Rs)",children:t.jsx("input",{type:"number",min:"0",step:"0.01",value:xe,onChange:e=>ye(e.target.value),placeholder:"0.00",...j(!1)})})]}),t.jsxs("div",{className:"pi-net-box",children:[t.jsx("span",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#6b7280"},children:"Net Payable"}),t.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:18,fontWeight:700,color:"#111827"},children:["Rs ",Ne>0?P(Ne):"0.00"]})]}),t.jsx("button",{type:"submit",disabled:Ie,className:"pi-submit",children:Ie?"Saving…":t.jsxs(t.Fragment,{children:[t.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})}),"Save & Print Invoice"]})})]})]})})]})]});return Y?t.jsx("div",{style:{position:"fixed",inset:0,zIndex:50,background:"#f9fafb",overflowY:"auto",padding:20},children:Oe}):t.jsx(rt,{children:Oe})}export{vt as default};
