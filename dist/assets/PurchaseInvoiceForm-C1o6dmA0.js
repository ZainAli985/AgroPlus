import{a as i,j as e}from"./vendor-react-BFXNeceC.js";import{a as W,N as Je,S as Xe,A}from"./index-cZ7zb13t.js";import"./vendor-react-dom-DDWplefk.js";import"./vendor-DDAwBBib.js";const et="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",tt=`
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
`;function st(s){const n=s.toUpperCase().replace(/[^A-Z0-9]/g,"");if(n.length>0&&/^[0-9]/.test(n))return"";const m=n.match(/^[A-Z]+/),d=m?m[0]:"",x=n.slice(d.length);return d?x?`${d}-${x}`:d:""}function ot(s){s.target.blur()}function it(s){(s.key==="ArrowUp"||s.key==="ArrowDown")&&s.preventDefault()}function de({options:s,value:n,onChange:m,placeholder:d,labelKey:x="label",error:I,disabled:B}){const[b,D]=i.useState(!1),[v,C]=i.useState(""),y=i.useRef(null),h=i.useRef(null);i.useEffect(()=>{const a=H=>{y.current&&!y.current.contains(H.target)&&D(!1)};return document.addEventListener("mousedown",a),()=>document.removeEventListener("mousedown",a)},[]),i.useEffect(()=>{b&&setTimeout(()=>h.current?.focus(),0)},[b]);const T=s.filter(a=>(a[x]||"").toLowerCase().includes(v.toLowerCase())),F=s.find(a=>a._id===n||a.value===n);return e.jsxs("div",{ref:y,style:{position:"relative"},children:[e.jsxs("button",{type:"button",disabled:B,onClick:()=>!B&&D(a=>!a),className:`pi-sd-btn${F?" sel":""}${I?" err":""}${b?" open":""}`,children:[e.jsx("span",{style:{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textAlign:"left"},children:F?F[x]:d}),e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2.5,style:{flexShrink:0,transition:".15s",transform:b?"rotate(180deg)":"none"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),b&&e.jsxs("div",{className:"pi-sd-panel",children:[e.jsx("div",{style:{padding:7,borderBottom:"1px solid #f3f4f6",background:"#f9fafb"},children:e.jsx("input",{ref:h,value:v,onChange:a=>C(a.target.value),placeholder:"Search…",style:{width:"100%",padding:"6px 9px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12.5,outline:"none",fontFamily:"'DM Sans',sans-serif"}})}),e.jsx("ul",{style:{maxHeight:210,overflowY:"auto",margin:0,padding:0,listStyle:"none"},children:T.length===0?e.jsx("li",{style:{padding:"9px 12px",fontSize:12.5,color:"#9ca3af",textAlign:"center"},children:"No results"}):T.map(a=>e.jsx("li",{className:`pi-sd-item${(a._id||a.value)===n?" sel":""}`,onClick:()=>{m(a),D(!1),C("")},children:a[x]},a._id||a.value))})]})]})}function r({label:s,required:n,error:m,children:d}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsxs("div",{className:`pi-lbl${m?" err":""}`,children:[s,n&&e.jsx("span",{className:"req",children:"*"}),m&&e.jsx("span",{className:"errtag",children:"Required"})]}),d]})}function ce({title:s,dot:n,children:m}){return e.jsxs("div",{className:"pi-panel",children:[e.jsxs("div",{className:"pi-panel-head",children:[e.jsx("div",{style:{width:7,height:7,borderRadius:"50%",background:n,flexShrink:0}}),e.jsx("span",{style:{fontSize:10.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#374151"},children:s})]}),e.jsx("div",{className:"pi-panel-body",children:m})]})}function nt(s){return{name:s?.businessName||localStorage.getItem("businessName")||"Mill",logo:s?.logoUrl||localStorage.getItem("logoUrl")||"",address:s?.address||s?.millAddress||"",phone1:s?.phone||s?.phone1||"",phone2:s?.phone2||""}}function at(s,n,m){const d=m||{},x=d.name||localStorage.getItem("businessName")||"Mill",I=d.logo||localStorage.getItem("logoUrl")||"",B=d.address||"",b=[d.phone1,d.phone2].filter(Boolean).join("  |  "),v=(Array.isArray(s.rateRows)&&s.rateRows.length?s.rateRows:[{maund:Number(s.netWeightMaund||0),rate:Number(s.rate40kg||0),amount:Number(s.totalAmount||0)}]).filter(h=>h.maund||h.rate).map(h=>`<tr><td>${Number(h.maund||0).toFixed(4)} Mn × ${Number(h.rate||0).toLocaleString("en-PK")}</td><td>${Number(h.amount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`).join(""),C=I?`<img src="${I}" alt="logo" style="height:48px;width:48px;object-fit:contain;border-radius:6px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);padding:3px;"/>`:`<div style="width:48px;height:48px;border-radius:8px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#fff;">${x.charAt(0)}</div>`,y=String(n).padStart(4,"0");return`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Purchase #${y}</title>
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
  <div class="hd">${C}<div class="hd-info"><div class="hd-name">${x}</div>${B?`<div class="hd-sub">${B}</div>`:""} ${b?`<div class="hd-sub">${b}</div>`:""}</div><div class="hd-right"><div class="hd-type">Purchase</div><div class="hd-no">#${y}</div><div class="hd-date">${s.date||""}</div></div></div>
  <div class="meta">
    <div class="meta-cell"><div class="mc-lbl">Vendor</div><div class="mc-val">${s.vendorName||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Vehicle</div><div class="mc-val mono">${s.vehicleNumber||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Product</div><div class="mc-val">${s.productName||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Builty #</div><div class="mc-val mono">${s.builtyNumber||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Bag Type</div><div class="mc-val">${s.bagTypeName||"—"}${s.bagWeightPerBag?` (${s.bagWeightPerBag}kg)`:""}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Moisture</div><div class="mc-val mono">${s.moisturePercent||0}% (Base ${s.baseMoisture||0}%)</div></div>
  </div>
  <div class="sec-head">Weight Breakdown</div>
  <table>
    <tr><th>Description</th><th>Value</th></tr>
    <tr><td>Qty (Bags)</td><td>${Number(s.quantity||0)}</td></tr>
    <tr><td>Gross Weight</td><td>${Number(s.grossWeight||0).toFixed(2)} kg</td></tr>
    <tr><td>Bag Deduction</td><td>− ${Number(s.totalBagWeight||0).toFixed(2)} kg</td></tr>
    <tr><td>Moisture Adj.</td><td>− ${Number(s.moistureAdjustment||0).toFixed(0)} kg</td></tr>
    <tr class="sub"><td>Net Weight</td><td>${Number(s.netWeightKg||0).toFixed(2)} kg</td></tr>
    <tr class="sub"><td>Net Maund</td><td>${Number(s.netWeightMaund||0).toFixed(4)} Mn</td></tr>
  </table>
  <div class="sec-head" style="margin-top:5px">Rate & Amount</div>
  <table>
    <tr><th>Rate Breakdown</th><th>Amount (Rs)</th></tr>
    ${v}
    <tr class="sub"><td>Total Amount</td><td>${Number(s.totalAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>
    ${Number(s.rentAdjustment||0)>0?`<tr><td>− Rent Adj.</td><td>${Number(s.rentAdjustment).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
  </table>
  <div class="total-box"><div><div class="total-lbl">Net Payable</div></div><div class="total-val">Rs ${Number(s.finalAmount||s.totalAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</div></div>
  <div class="ft"><div class="sig-line"><div class="line">Supplier Signature</div></div><div style="font-size:8px;color:#d1d5db;align-self:flex-end">Powered by Agro Plus</div><div class="sig-line"><div class="line">Authorised Signatory</div></div></div>
</div><script>window.print()<\/script></body></html>`}const z={display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},l=s=>isNaN(Number(s))?0:Number(s)||0,P=(s,n=2)=>l(s).toLocaleString("en-PK",{minimumFractionDigits:n,maximumFractionDigits:n}),pe=e.jsx("div",{className:"pi-divider"}),w=s=>({className:`pi-inp pi-no-spin${s?" err":""}`,onFocus:n=>{s||(n.target.style.borderColor="#6b7280",n.target.style.boxShadow="0 0 0 2px rgba(107,114,128,.12)")},onBlur:n=>{s||(n.target.style.borderColor="#d1d5db",n.target.style.boxShadow="none")},onWheel:ot,onKeyDown:it}),N=(s=!1)=>({className:`pi-ro${s?" hi":""}`,readOnly:!0});function ft(){const s=new Date().toISOString().split("T")[0],[n,m]=i.useState([]),[d,x]=i.useState([]),[I,B]=i.useState([]),[b,D]=i.useState({baseMoisture:0,weightCut:0}),[v,C]=i.useState(""),[y,h]=i.useState(s),[T,F]=i.useState(""),[a,H]=i.useState(""),[J,ue]=i.useState(""),[Le,fe]=i.useState(""),[X,ge]=i.useState(""),[qe,me]=i.useState(""),[L,be]=i.useState("added"),[ee,he]=i.useState(""),[te,xe]=i.useState(""),[ve,ye]=i.useState(""),[Ee,je]=i.useState(""),[q,Se]=i.useState(0),[$,we]=i.useState(""),[g,Ne]=i.useState(!1),[ke,se]=i.useState(""),[oe,Re]=i.useState(""),[ie,ne]=i.useState(!1),[E,Me]=i.useState(""),[G,K]=i.useState([{id:1,maund:"",rate:"",amount:""}]),[c,j]=i.useState({}),[$e,We]=i.useState(!1),[Ae,_]=i.useState({message:"",type:"info"}),[Q,ze]=i.useState(!1),[Y,Be]=i.useState(null),[Ke,Oe]=i.useState({}),Ce=i.useRef(null),O=l(ee),ae=l(te),U=O*q,Z=l(b.baseMoisture),Pe=l(b.weightCut),Ve=$!==""&&l($)>Z?(l($)-Z)*Pe*O:0,Ie=Math.round(Ve),De=g?l(ke):Ie,k=ae-(L==="added"?U:0)-De,S=k>0?k/40:0;let R=0,V=[];if(ie)V=G.map(t=>({...t,amount:l(t.maund)*l(t.rate)})),R=V.reduce((t,o)=>t+o.amount,0);else{const t=S*l(E);R=t,V=[{id:1,maund:S,rate:l(E),amount:t}]}const re=R-l(oe);i.useEffect(()=>{g||se(String(Ie))},[$,O,b,g]),i.useEffect(()=>{Promise.all([W(`${A}/products?activeOnly=true`).then(t=>t.json()),W(`${A}/accounts?excludeProducts=true`).then(t=>t.json()),W(`${A}/profile/bag-types`).then(t=>t.json()),W(`${A}/profile/mill-settings`).then(t=>t.json()),W(`${A}/purchase-invoice/next-sr`).then(t=>t.json()),W(`${A}/profile`).then(t=>t.json()).catch(()=>({}))]).then(([t,o,f,M,p,le])=>{le&&Oe(le.profile||le||{}),t.success&&m(t.products.map(u=>({...u,label:u.displayName||[u.productName,u.type,u.subType].filter(Boolean).join(" - ")})));const Ze=(Array.isArray(o)?o:o.accounts||[]).filter(u=>u.category==="Supplier");x(Ze.map(u=>({...u,label:u.accountName}))),f.bagTypes&&B(f.bagTypes.filter(u=>u.isActive).map(u=>({...u,label:`${u.bagTypeName} (${u.bagWeight} kg)`}))),M.settings&&D(M.settings),p.success&&p.nextSr&&C(String(p.nextSr))})},[]),i.useEffect(()=>{if(!Y)return;const t=window.open("","_blank");t&&(t.document.write(at(Y,Y.sr,nt(Ke))),t.document.close()),Be(null)},[Y]);const _e=()=>{const t={};return y||(t.date=!0),T||(t.vehicleNo=!0),a||(t.builtyNo=!0),J||(t.vendorId=!0),X||(t.productId=!0),ee||(t.quantity=!0),te||(t.grossWeight=!0),!ie&&!E&&(t.singleRate=!0),j(t),Object.keys(t).length===0},Ue=t=>{if(t.key!=="Enter")return;const o=Ce.current?.querySelectorAll("input:not([readonly]):not([type=submit]),select");if(!o?.length)return;const f=[...o].indexOf(t.target);f>=0&&f<o.length-1&&(t.preventDefault(),o[f+1].focus())},He=()=>K(t=>[...t,{id:Date.now(),maund:"",rate:"",amount:""}]),Ge=t=>K(o=>o.filter(f=>f.id!==t)),Te=(t,o,f)=>K(M=>M.map(p=>p.id===t?{...p,[o]:f}:p)),Qe=()=>{h(s),F(""),H(""),ue(""),fe(""),ge(""),me(""),be("added"),he(""),xe(""),ye(""),je(""),Se(0),we(""),Ne(!1),se(""),Re(""),Me(""),ne(!1),K([{id:1,maund:"",rate:"",amount:""}]),j({})},Ye=async t=>{if(t.preventDefault(),!_e()){_({message:"Please fill all required fields",type:"error"});return}We(!0);try{const o={sr:Number(v),date:y,vendorName:Le,vendorAccountId:J||void 0,vehicleNumber:T,builtyNumber:a,productId:X,productName:qe,bagStatus:L,quantity:O,grossWeight:ae,bagTypeId:ve||void 0,bagTypeName:Ee,bagWeightPerBag:q,totalBagWeight:U,moisturePercent:l($),baseMoisture:Z,weightCut:Pe,moistureAdjustment:De,moistureOverride:g,netWeightKg:k>0?k:0,netWeightMaund:S>0?S:0,rateRows:V.filter(p=>p.maund||p.rate),totalAmount:R,rentAdjustment:l(oe),finalAmount:re,netWeight:k>0?k:0,netWeight40KG:S>0?S:0,amount:R,bagWeight:U,finalWeight:ae,rate40kg:l(E)||V[0]?.rate||0},M=await(await W(`${A}/purchase-invoice/create`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})).json();M.success?(_({message:`Invoice #${String(M.invoice.sr).padStart(4,"0")} saved!`,type:"success"}),Be(M.invoice),Qe(),W(`${A}/purchase-invoice/next-sr`).then(p=>p.json()).then(p=>{p.success&&p.nextSr&&C(String(p.nextSr))})):_({message:M.message||"Failed to save.",type:"error"})}catch{_({message:"Server error.",type:"error"})}finally{We(!1)}};i.useEffect(()=>{const t=o=>{o.key==="Escape"&&Q&&ze(!1)};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[Q]);const Fe=e.jsxs(e.Fragment,{children:[e.jsxs("style",{children:[et,tt]}),e.jsx(Je,{message:Ae.message,type:Ae.type,onClose:()=>_({message:"",type:"info"})}),e.jsxs("div",{className:"pi-wrap",style:{maxWidth:1100,margin:"0 auto"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,gap:10,flexWrap:"wrap"},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"Procurement"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("h1",{style:{fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px",margin:0},children:"Purchase Invoice"}),e.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:600,background:"#f3f4f6",color:"#374151",padding:"2px 8px",borderRadius:5,border:"1px solid #e5e7eb"},children:["#",v?String(v).padStart(4,"0"):"——"]})]})]}),e.jsx("button",{type:"button",onClick:()=>ze(t=>!t),style:{fontSize:11.5,fontWeight:500,padding:"6px 12px",borderRadius:6,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",cursor:"pointer"},children:Q?"Exit Full Screen":"Full Screen"})]}),e.jsx("form",{ref:Ce,onSubmit:Ye,onKeyDown:Ue,children:e.jsxs("div",{className:"inv-grid",style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:12,alignItems:"start"},children:[e.jsxs(ce,{title:"Basic Information",dot:"#3b82f6",children:[e.jsxs("div",{style:z,children:[e.jsx(r,{label:"Date",required:!0,error:c.date,children:e.jsx("input",{type:"date",value:y,max:s,onChange:t=>{h(t.target.value),j(o=>({...o,date:!1}))},...w(c.date)})}),e.jsx(r,{label:"Invoice #",children:e.jsx("input",{value:v?`#${String(v).padStart(4,"0")}`:"—",...N(!1)})})]}),e.jsxs("div",{style:z,children:[e.jsx(r,{label:"Vehicle No.",required:!0,error:c.vehicleNo,children:e.jsx("input",{value:T,onChange:t=>{F(st(t.target.value)),j(o=>({...o,vehicleNo:!1}))},placeholder:"e.g. LEA-1234",...w(c.vehicleNo)})}),e.jsx(r,{label:"Builty No.",required:!0,error:c.builtyNo,children:e.jsx("input",{value:a,onChange:t=>{H(t.target.value),j(o=>({...o,builtyNo:!1}))},placeholder:"e.g. B-001",...w(c.builtyNo)})})]}),e.jsx(r,{label:"Vendor",required:!0,error:c.vendorId,children:e.jsx(de,{options:d,value:J,labelKey:"label",placeholder:"Select vendor…",error:c.vendorId,onChange:t=>{ue(t._id),fe(t.accountName),j(o=>({...o,vendorId:!1}))}})}),e.jsx(r,{label:"Product",required:!0,error:c.productId,children:e.jsx(de,{options:n,value:X,labelKey:"label",placeholder:"Select product…",error:c.productId,onChange:t=>{ge(t._id),me(t.displayName||[t.productName,t.type,t.subType].filter(Boolean).join(" - ")),j(o=>({...o,productId:!1}))}})}),e.jsx(r,{label:"Bag Status",children:e.jsx("div",{style:{display:"flex",gap:7},children:[["added","Bag Added"],["return","Bag Return"]].map(([t,o])=>e.jsx("button",{type:"button",onClick:()=>be(t),style:{flex:1,padding:"8px 0",borderRadius:7,cursor:"pointer",border:`1px solid ${L===t?"#111827":"#e5e7eb"}`,background:L===t?"#111827":"#fff",color:L===t?"#fff":"#6b7280",fontSize:12.5,fontWeight:500,fontFamily:"'DM Sans',sans-serif",transition:"all .1s"},children:o},t))})}),e.jsx(r,{label:"Quantity (Bags)",required:!0,error:c.quantity,children:e.jsx("input",{type:"number",min:"0",value:ee,onChange:t=>{he(t.target.value),j(o=>({...o,quantity:!1}))},placeholder:"0",...w(c.quantity)})})]}),e.jsxs(ce,{title:"Weight & Moisture",dot:"#f59e0b",children:[e.jsx(r,{label:"Gross Weight (kg)",required:!0,error:c.grossWeight,children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:te,onChange:t=>{xe(t.target.value),j(o=>({...o,grossWeight:!1}))},placeholder:"0.00",...w(c.grossWeight)})}),e.jsxs("div",{style:z,children:[e.jsx(r,{label:"Bag Type",children:e.jsx(de,{options:I,value:ve,labelKey:"label",placeholder:"Select bag type…",onChange:t=>{ye(t._id),je(t.bagTypeName),Se(t.bagWeight)}})}),e.jsx(r,{label:"Bag Wt / Bag",children:e.jsx("input",{value:q?`${q} kg`:"—",...N(!1)})})]}),e.jsxs("div",{style:z,children:[e.jsx(r,{label:"Total Bag Weight",children:e.jsx("input",{value:O&&q?`${P(U)} kg`:"—",...N(!1)})}),e.jsx(r,{label:"Bag Deduction",children:e.jsx("input",{value:L==="added"?O&&q?`− ${P(U)} kg`:"—":"None",...N(!1)})})]}),pe,e.jsxs("div",{style:z,children:[e.jsx(r,{label:"Moisture %",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:$,onChange:t=>we(t.target.value),placeholder:`Base: ${b.baseMoisture}%`,...w(!1)})}),e.jsxs(r,{label:"Moisture Adj. (kg)",children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("input",{type:"number",step:"1",value:ke,readOnly:!g,onChange:t=>g&&se(t.target.value),className:`pi-no-spin${g?" pi-inp":" pi-ro"}`,style:{width:"100%",paddingRight:64,padding:"8px 64px 8px 11px",border:"1px solid #d1d5db",borderRadius:7,fontSize:13,fontFamily:g?"'DM Sans',sans-serif":"'DM Mono',monospace",outline:"none",background:g?"#fff":"#f9fafb",color:g?"#111827":"#6b7280"}}),e.jsx("button",{type:"button",onClick:()=>Ne(t=>!t),style:{position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",padding:"2px 7px",borderRadius:5,border:"1px solid #e5e7eb",background:g?"#fef9c3":"#f9fafb",color:g?"#92400e":"#9ca3af",fontSize:10,fontWeight:600,cursor:"pointer"},children:g?"Manual":"Auto"})]}),!g&&l($)>0&&l($)<=Z&&e.jsx("div",{style:{fontSize:10.5,color:"#15803d",marginTop:2},children:"✓ Within base — no deduction"})]})]}),pe,e.jsxs("div",{style:z,children:[e.jsx(r,{label:"Net Weight (kg)",children:e.jsx("input",{value:k>0?P(k):"—",...N(k>0)})}),e.jsx(r,{label:"Net Weight (Maund)",children:e.jsx("input",{value:S>0?S.toFixed(4):"—",...N(!1)})})]})]}),e.jsxs(ce,{title:"Pricing & Summary",dot:"#10b981",children:[ie?e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2},children:[e.jsx("label",{style:{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#6b7280"},children:"Rate Rows"}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("button",{type:"button",onClick:He,style:{fontSize:11.5,fontWeight:500,color:"#374151",background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:5,padding:"3px 9px",cursor:"pointer"},children:"+ Row"}),e.jsx("button",{type:"button",onClick:()=>{ne(!1),K([{id:1,maund:"",rate:"",amount:""}])},style:{fontSize:11.5,fontWeight:500,color:"#6b7280",background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:5,padding:"3px 9px",cursor:"pointer"},children:"Single Rate"})]})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:7},children:V.map((t,o)=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr auto",gap:7,alignItems:"center"},children:[e.jsxs("div",{children:[o===0&&e.jsx("div",{style:{fontSize:9.5,color:"#9ca3af",fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",marginBottom:3},children:"Maund"}),e.jsx("input",{type:"number",min:"0",step:"0.01",value:G[o]?.maund||"",onChange:f=>Te(t.id,"maund",f.target.value),placeholder:"0.000",...w(!1)})]}),e.jsxs("div",{children:[o===0&&e.jsx("div",{style:{fontSize:9.5,color:"#9ca3af",fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",marginBottom:3},children:"Rate (Rs/40kg)"}),e.jsx("input",{type:"number",min:"0",step:"0.01",value:G[o]?.rate||"",onChange:f=>Te(t.id,"rate",f.target.value),placeholder:"0.00",...w(!1)})]}),e.jsxs("div",{children:[o===0&&e.jsx("div",{style:{fontSize:9.5,color:"#9ca3af",fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",marginBottom:3},children:"Amount"}),e.jsx("input",{value:t.amount>0?P(t.amount):"—",...N(!1)})]}),e.jsx("div",{style:{paddingTop:o===0?18:0},children:G.length>1&&e.jsx("button",{type:"button",onClick:()=>Ge(t.id),style:{width:28,height:28,borderRadius:6,border:"1px solid #fecaca",background:"#fef2f2",color:"#dc2626",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14},children:"×"})})]},t.id))})]}):e.jsxs(e.Fragment,{children:[e.jsx(r,{label:"Rate / 40 kg (Rs.)",required:!0,error:c.singleRate,children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:E,onChange:t=>{Me(t.target.value),j(o=>({...o,singleRate:!1}))},placeholder:"0.00",...w(c.singleRate)})}),e.jsxs("div",{style:z,children:[e.jsx(r,{label:"Net Maund (auto)",children:e.jsx("input",{value:S>0?S.toFixed(4):"—",...N(!1)})}),e.jsx(r,{label:"Amount (Rs.)",children:e.jsx("input",{value:R>0?P(R):"—",...N(!1)})})]}),e.jsxs("button",{type:"button",onClick:()=>{ne(!0),K([{id:1,maund:"",rate:E,amount:""}])},style:{fontSize:12,fontWeight:500,color:"#374151",background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:7,padding:"7px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,width:"fit-content"},children:[e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4v16m8-8H4"})}),"Add multiple rates"]})]}),pe,e.jsxs("div",{style:z,children:[e.jsx(r,{label:"Total Amount (Rs)",children:e.jsx("input",{value:R>0?P(R):"—",...N(!1)})}),e.jsx(r,{label:"Rent Adjustment (Rs)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:oe,onChange:t=>Re(t.target.value),placeholder:"0.00",...w(!1)})})]}),e.jsxs("div",{className:"pi-net-box",children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"#6b7280"},children:"Net Payable"}),e.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:18,fontWeight:700,color:"#111827"},children:["Rs ",re>0?P(re):"0.00"]})]}),e.jsx("button",{type:"submit",disabled:$e,className:"pi-submit",children:$e?"Saving…":e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})}),"Save & Print Invoice"]})})]})]})})]})]});return Q?e.jsx("div",{style:{position:"fixed",inset:0,zIndex:50,background:"#f9fafb",overflowY:"auto",padding:20},children:Fe}):e.jsx(Xe,{children:Fe})}export{ft as default};
