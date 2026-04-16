import{u as Fe,b as Le,a as i,j as e}from"./vendor-react-CVRJsYjy.js";import{a as $,N as Te,S as Ee,A as I}from"./index-DAaqPt1z.js";import"./vendor-react-dom-BIx1r6lP.js";import"./vendor-D8Rt7Tv7.js";const Oe="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",Ke=`
  *, *::before, *::after { box-sizing: border-box; }
  .si-wrap { font-family: 'DM Sans', sans-serif; color: #111827; }
  .si-no-spin::-webkit-inner-spin-button,
  .si-no-spin::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  .si-no-spin { -moz-appearance: textfield; }

  .si-panel {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; overflow: hidden;
  }
  .si-panel-head {
    padding: 9px 14px; background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    display: flex; align-items: center; gap: 8px;
  }
  .si-panel-body {
    padding: 14px; display: flex;
    flex-direction: column; gap: 11px;
  }

  .si-inp, .si-ro {
    width: 100%; padding: 8px 11px;
    border: 1px solid #d1d5db; border-radius: 7px;
    font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s;
  }
  .si-inp::placeholder { color: #9ca3af; }
  .si-inp:focus {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .si-inp.err { border-color: #fca5a5; background: #fff5f5; }
  .si-inp.err:focus { box-shadow: 0 0 0 2px rgba(239,68,68,.12); }
  .si-ro {
    background: #f9fafb; color: #6b7280;
    font-family: 'DM Mono', monospace; cursor: default;
  }
  .si-ro.hi {
    background: #f0fdf4; color: #15803d;
    border-color: #bbf7d0; font-weight: 600;
  }

  .si-sd-btn {
    width: 100%; padding: 8px 11px;
    border: 1px solid #d1d5db; border-radius: 7px;
    background: #fff; font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: #9ca3af; cursor: pointer; outline: none;
    display: flex; align-items: center;
    justify-content: space-between; gap: 6px;
    transition: border-color .12s, box-shadow .12s;
  }
  .si-sd-btn.sel { color: #111827; }
  .si-sd-btn.err { border-color: #fca5a5; background: #fff5f5; }
  .si-sd-btn:focus, .si-sd-btn.open {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .si-sd-panel {
    position: absolute; left: 0; top: calc(100% + 3px);
    width: max(100%, 260px); z-index: 300;
    background: #fff; border: 1px solid #d1d5db;
    border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,.1);
    overflow: hidden;
  }
  .si-sd-item {
    padding: 8px 12px; font-size: 13px; cursor: pointer;
    border-bottom: 1px solid #f9fafb; color: #111827;
    transition: background .08s;
  }
  .si-sd-item:last-child { border-bottom: none; }
  .si-sd-item:hover { background: #f3f4f6; }
  .si-sd-item.sel { background: #f3f4f6; font-weight: 600; }

  .si-lbl {
    display: flex; align-items: center; gap: 4px;
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: #6b7280; margin-bottom: 5px;
  }
  .si-lbl.err { color: #ef4444; }
  .si-lbl span.req { color: #ef4444; font-size: 12px; line-height: 1; }
  .si-lbl span.errtag {
    font-size: 9.5px; background: #fef2f2; color: #ef4444;
    padding: 1px 5px; border-radius: 4px; border: 1px solid #fecaca;
    font-weight: 700; letter-spacing: .03em;
  }

  .si-divider { height: 1px; background: #f3f4f6; margin: 2px 0; }

  .si-summary-box {
    background: #f9fafb; border: 1px solid #e5e7eb;
    border-radius: 8px; padding: 12px 14px;
  }

  .si-submit {
    width: 100%; padding: 10px 0; border-radius: 7px; border: none;
    background: #111827; color: #fff; font-size: 13.5px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background .12s;
  }
  .si-submit:hover:not(:disabled) { background: #1f2937; }
  .si-submit:disabled { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; }

  @media (max-width: 900px)  { .inv-grid { grid-template-columns: 1fr !important; } }
  @media (max-width: 1200px) { .inv-grid { grid-template-columns: 1fr 1fr !important; } }
`;function _e(s){const a=s.toUpperCase().replace(/[^A-Z0-9]/g,"");if(a.length>0&&/^[0-9]/.test(a))return"";const p=a.match(/^[A-Z]+/),l=p?p[0]:"",f=a.slice(l.length);return l?f?`${l}-${f}`:l:""}function Ve(s){s.target.blur()}function Qe(s){(s.key==="ArrowUp"||s.key==="ArrowDown")&&s.preventDefault()}function Ie({options:s,value:a,onChange:p,placeholder:l,labelKey:f="label",error:W}){const[x,j]=i.useState(!1),[k,A]=i.useState(""),v=i.useRef(null),C=i.useRef(null);i.useEffect(()=>{const n=q=>{v.current&&!v.current.contains(q.target)&&j(!1)};return document.addEventListener("mousedown",n),()=>document.removeEventListener("mousedown",n)},[]),i.useEffect(()=>{x&&setTimeout(()=>C.current?.focus(),0)},[x]);const B=s.filter(n=>(n[f]||"").toLowerCase().includes(k.toLowerCase())),R=s.find(n=>n._id===a||n.value===a);return e.jsxs("div",{ref:v,style:{position:"relative"},children:[e.jsxs("button",{type:"button",onClick:()=>j(n=>!n),className:`si-sd-btn${R?" sel":""}${W?" err":""}${x?" open":""}`,children:[e.jsx("span",{style:{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textAlign:"left"},children:R?R[f]:l}),e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2.5,style:{flexShrink:0,transition:".15s",transform:x?"rotate(180deg)":"none"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),x&&e.jsxs("div",{className:"si-sd-panel",children:[e.jsx("div",{style:{padding:7,borderBottom:"1px solid #f3f4f6",background:"#f9fafb"},children:e.jsx("input",{ref:C,value:k,onChange:n=>A(n.target.value),placeholder:"Search…",style:{width:"100%",padding:"6px 9px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12.5,outline:"none",fontFamily:"'DM Sans',sans-serif"}})}),e.jsx("ul",{style:{maxHeight:210,overflowY:"auto",margin:0,padding:0,listStyle:"none"},children:B.length===0?e.jsx("li",{style:{padding:"9px 12px",fontSize:12.5,color:"#9ca3af",textAlign:"center"},children:"No results"}):B.map(n=>e.jsx("li",{className:`si-sd-item${(n._id||n.value)===a?" sel":""}`,onClick:()=>{p(n),j(!1),A("")},children:n[f]},n._id||n.value))})]})]})}function r({label:s,required:a,error:p,children:l}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsxs("div",{className:`si-lbl${p?" err":""}`,children:[s,a&&e.jsx("span",{className:"req",children:"*"}),p&&e.jsx("span",{className:"errtag",children:"Required"})]}),l]})}function be({title:s,dot:a,children:p}){return e.jsxs("div",{className:"si-panel",children:[e.jsxs("div",{className:"si-panel-head",children:[e.jsx("div",{style:{width:7,height:7,borderRadius:"50%",background:a,flexShrink:0}}),e.jsx("span",{style:{fontSize:10.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#374151"},children:s})]}),e.jsx("div",{className:"si-panel-body",children:p})]})}function Ue(s){return{name:s?.businessName||localStorage.getItem("businessName")||"Mill",logo:s?.logoUrl||localStorage.getItem("logoUrl")||"",address:s?.address||s?.millAddress||"",phone1:s?.phone||s?.phone1||"",phone2:s?.phone2||""}}function He(s,a,p){const l=p||{},f=l.name||localStorage.getItem("businessName")||"Mill",W=l.logo||localStorage.getItem("logoUrl")||"",x=l.address||"",j=[l.phone1,l.phone2].filter(Boolean).join("  |  "),k=String(a).padStart(4,"0"),A=W?`<img src="${W}" alt="logo" style="height:48px;width:48px;object-fit:contain;border-radius:6px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);padding:3px;"/>`:`<div style="width:48px;height:48px;border-radius:8px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#fff;">${f.charAt(0)}</div>`;return`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Sales #${k}</title>
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
  tr.sub td{background:#f9fafb;font-weight:700}tr.red td{color:#dc2626}
  .total-box{border:2px solid #111827;border-radius:0 0 7px 7px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;margin-top:-1px}
  .total-lbl{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#6b7280}
  .total-val{font-size:18px;font-weight:800;color:#111827;font-family:"Courier New",monospace}
  .ft{display:flex;justify-content:space-between;margin-top:12px;padding-top:8px;border-top:1px dashed #e5e7eb}
  .sig-line{width:44%;text-align:center}.sig-line .line{border-top:1px solid #374151;padding-top:3px;margin-top:20px;font-size:8px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body>
<div class="wrap">
  <div class="hd">${A}<div class="hd-info"><div class="hd-name">${f}</div>${x?`<div class="hd-sub">${x}</div>`:""} ${j?`<div class="hd-sub">${j}</div>`:""}</div><div class="hd-right"><div class="hd-type">Sales</div><div class="hd-no">#${k}</div><div class="hd-date">${s.date||""}</div></div></div>
  <div class="meta">
    <div class="meta-cell"><div class="mc-lbl">Customer</div><div class="mc-val">${s.vendorName||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Vehicle</div><div class="mc-val mono">${s.vehicleNo||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Product</div><div class="mc-val">${s.paddyType||s.productName||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Builty #</div><div class="mc-val mono">${s.builtyNo||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Broker</div><div class="mc-val">${s.brokerName||"—"}</div></div>
    <div class="meta-cell"><div class="mc-lbl">Qty (Bags)</div><div class="mc-val mono">${Number(s.quantity||0)}</div></div>
  </div>
  <div class="sec-head">Weight & Rate</div>
  <table>
    <tr><th>Description</th><th>Value</th></tr>
    <tr><td>Total Weight</td><td>${Number(s.weight||0).toFixed(2)} kg</td></tr>
    <tr><td>Bag Deduction</td><td>− ${Number(s.bagWeight||0).toFixed(2)} kg</td></tr>
    <tr class="sub"><td>Net Weight</td><td>${Number(s.netWeight||0).toFixed(2)} kg</td></tr>
    <tr class="sub"><td>Net Maund</td><td>${Number(s.netWeight40||0).toFixed(4)} Mn</td></tr>
    <tr><td>Rate / 40 kg</td><td>Rs ${Number(s.rate40||0).toLocaleString("en-PK")}</td></tr>
    <tr><td>Amount</td><td>Rs ${Number(s.amount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>
    <tr><td>Sutli / Silai (Rs ${Number(s.sutliSilaiRate||0)} × ${Number(s.quantity||0)} bags)</td><td>Rs ${Number(s.sutliSilaiAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>
    ${Number(s.bardanaRate||0)>0?`<tr><td>Bardana (Rs ${Number(s.bardanaRate)} × ${Number(s.quantity||0)} bags)</td><td>Rs ${Number(s.bardanaAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
    <tr class="sub"><td>Subtotal${Number(s.bardanaRate||0)>0?" + Bardana":""}</td><td>Rs ${Number(s.totalWithBardana||s.totalAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>
    ${Number(s.brokeryRate||0)>0?`<tr class="red"><td>− Brokery (${Number(s.netWeight40||0).toFixed(4)} Mn × Rs ${Number(s.brokeryRate||0)})</td><td>− Rs ${Number(s.brokery||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}
  </table>
  <div class="total-box"><div><div class="total-lbl">Net Payable</div></div><div class="total-val">Rs ${Number(s.totalAmount2||s.totalWithBardana||s.totalAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</div></div>
  <div class="ft"><div class="sig-line"><div class="line">Customer Signature</div></div><div style="font-size:8px;color:#d1d5db;align-self:flex-end">Powered by Agro Plus</div><div class="sig-line"><div class="line">Authorised Signatory</div></div></div>
</div><script>window.print()<\/script></body></html>`}const z={display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},Ye={display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10},c=s=>isNaN(Number(s))?0:Number(s)||0,u=(s,a=2)=>c(s).toLocaleString("en-PK",{minimumFractionDigits:a,maximumFractionDigits:a}),xe=e.jsx("div",{className:"si-divider"}),m=s=>({className:`si-inp si-no-spin${s?" err":""}`,onFocus:a=>{s||(a.target.style.borderColor="#6b7280",a.target.style.boxShadow="0 0 0 2px rgba(107,114,128,.12)")},onBlur:a=>{s||(a.target.style.borderColor="#d1d5db",a.target.style.boxShadow="none")},onWheel:Ve,onKeyDown:Qe}),b=(s=!1)=>({className:`si-ro${s?" hi":""}`,readOnly:!0});function et(){const s=new Date().toISOString().split("T")[0],a=Fe(),p=Le(),l=a.state?.fromQuotation??null,[f,W]=i.useState(l?._id??null),[x,j]=i.useState([]),[k,A]=i.useState([]),[v,C]=i.useState(""),[B,R]=i.useState(s),[n,q]=i.useState(""),[Y,Z]=i.useState(""),[J,G]=i.useState(""),[ze,X]=i.useState(""),[he,ee]=i.useState(""),[te,se]=i.useState(""),[We,ie]=i.useState(""),[oe,ae]=i.useState(""),[re,ne]=i.useState(""),[le,de]=i.useState(""),[V,ce]=i.useState(""),[ue,pe]=i.useState(""),[P,fe]=i.useState(""),[F,ge]=i.useState(""),[d,g]=i.useState({}),[ye,ve]=i.useState(!1),[Se,L]=i.useState({message:"",type:"info"}),[Q,je]=i.useState(!1),[U,we]=i.useState(null),[Ae,Ce]=i.useState({}),Ne=i.useRef(null);i.useEffect(()=>{if(!l)return;const t=l;t.date&&R(t.date),t.vehicleNo&&q(t.vehicleNo),t.builtyNo&&Z(t.builtyNo),t.vendorAccountId&&t.vendorName&&(G(typeof t.vendorAccountId=="object"?t.vendorAccountId._id:t.vendorAccountId),X(t.vendorName)),t.brokerName&&ee(t.brokerName),t.productId&&t.productName&&(se(typeof t.productId=="object"?t.productId._id:t.productId),ie(t.paddyType||t.productName)),t.quantity&&ae(String(t.quantity)),t.weight&&ne(String(t.weight)),t.bagWeight&&de(String(t.bagWeight)),t.rate40&&ce(String(t.rate40)),t.sutliSilaiRate&&pe(String(t.sutliSilaiRate)),t.bardanaRate&&fe(String(t.bardanaRate)),t.brokeryRate&&ge(String(t.brokeryRate)),t.sr&&C(String(t.sr))},[]);const ke=c(re),Re=c(le),S=ke-Re,w=S>0?S/40:0,me=c(oe),T=w*c(V),E=c(ue)*me,H=T+E,O=c(P)*me,K=H+O,D=w*c(F),_=K-D;i.useEffect(()=>{Promise.all([$(`${I}/products?activeOnly=true`).then(t=>t.json()),$(`${I}/accounts?excludeProducts=true`).then(t=>t.json()),$(`${I}/sales-invoice/next-sr`).then(t=>t.json()),$(`${I}/profile`).then(t=>t.json()).catch(()=>({}))]).then(([t,o,h,N])=>{N&&Ce(N.profile||N||{}),t.success&&j(t.products.map(y=>({...y,label:y.displayName||[y.productName,y.type,y.subType].filter(Boolean).join(" - ")})));const Pe=(Array.isArray(o)?o:o.accounts||[]).filter(y=>y.category==="Customer");A(Pe.map(y=>({...y,label:y.accountName}))),h.success&&h.nextSr&&C(String(h.nextSr))})},[]),i.useEffect(()=>{if(!U)return;const t=window.open("","_blank");t&&(t.document.write(He(U,U.sr,Ue(Ae))),t.document.close()),we(null)},[U]);const Be=()=>{const t={};return B||(t.date=!0),n||(t.vehicleNo=!0),Y||(t.builtyNo=!0),J||(t.vendorId=!0),te||(t.productId=!0),oe||(t.quantity=!0),re||(t.weight=!0),le||(t.bagWeight=!0),V||(t.rate40=!0),g(t),Object.keys(t).length===0},De=t=>{if(t.key!=="Enter")return;const o=Ne.current?.querySelectorAll("input:not([readonly]):not([type=submit]),select");if(!o?.length)return;const h=[...o].indexOf(t.target);h>=0&&h<o.length-1&&(t.preventDefault(),o[h+1].focus())},Me=()=>{R(s),q(""),Z(""),G(""),X(""),ee(""),se(""),ie(""),ae(""),ne(""),de(""),ce(""),pe(""),fe(""),ge(""),g({})},qe=async t=>{if(t.preventDefault(),!Be()){L({message:"Please fill all required fields",type:"error"});return}ve(!0);try{const o={date:B,vehicleNo:n,builtyNo:Y,vendorName:ze,vendorAccountId:J||void 0,brokerName:he,productId:te,paddyType:We,quantity:me,weight:ke,bagWeight:Re,netWeight:S>0?S:0,netWeight40:w>0?w:0,rate40:c(V),amount:T,sutliSilaiRate:c(ue),sutliSilaiAmount:E,totalAmount:H,bardanaRate:c(P)||void 0,bardanaAmount:O||void 0,totalWithBardana:K,brokeryRate:c(F)||void 0,brokery:D||void 0,totalAmount2:_,sr:Number(v)},N=await(await $(`${I}/sales-invoice/create`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})).json();N.success?(L({message:`Invoice #${String(N.invoice.sr).padStart(4,"0")} saved!`,type:"success"}),we(N.invoice),f&&($(`${I}/sales-quotation/${f}`,{method:"DELETE"}).catch(()=>{}),W(null),window.history.replaceState({},document.title,window.location.pathname)),Me(),$(`${I}/sales-invoice/next-sr`).then(M=>M.json()).then(M=>{M.success&&M.nextSr&&C(String(M.nextSr))})):L({message:N.message||"Failed to save.",type:"error"})}catch{L({message:"Server error.",type:"error"})}finally{ve(!1)}};i.useEffect(()=>{const t=o=>{o.key==="Escape"&&Q&&je(!1)};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[Q]);const $e=e.jsxs(e.Fragment,{children:[e.jsxs("style",{children:[Oe,Ke]}),e.jsx(Te,{message:Se.message,type:Se.type,onClose:()=>L({message:"",type:"info"})}),e.jsxs("div",{className:"si-wrap",style:{maxWidth:1100,margin:"0 auto"},children:[l&&e.jsxs("div",{style:{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:"10px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:10},children:[e.jsx("span",{style:{fontSize:18},children:"📋"}),e.jsxs("div",{style:{flex:1},children:[e.jsxs("div",{style:{fontSize:12.5,fontWeight:700,color:"#065f46"},children:["Converting Sales Quotation #",String(l.sr).padStart(4,"0")," to Invoice"]}),e.jsx("div",{style:{fontSize:11.5,color:"#059669",marginTop:1},children:"Pre-filled from quotation. Verify the details and save — the quotation will be deleted automatically."})]}),e.jsx("button",{type:"button",onClick:()=>p("/sales-quotation"),style:{fontSize:11.5,fontWeight:500,padding:"5px 11px",border:"1px solid #bbf7d0",borderRadius:6,background:"#fff",color:"#059669",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"},children:"Back to Quotations"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,gap:10,flexWrap:"wrap"},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"Sales"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("h1",{style:{fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px",margin:0},children:"Sales Invoice"}),e.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:600,background:"#f3f4f6",color:"#374151",padding:"2px 8px",borderRadius:5,border:"1px solid #e5e7eb"},children:["#",v?String(v).padStart(4,"0"):"——"]})]})]}),e.jsx("button",{type:"button",onClick:()=>je(t=>!t),style:{fontSize:11.5,fontWeight:500,padding:"6px 12px",borderRadius:6,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",cursor:"pointer"},children:Q?"Exit Full Screen":"Full Screen"})]}),e.jsx("form",{ref:Ne,onSubmit:qe,onKeyDown:De,children:e.jsxs("div",{className:"inv-grid",style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:12,alignItems:"start"},children:[e.jsxs(be,{title:"Basic Information",dot:"#6366f1",children:[e.jsxs("div",{style:z,children:[e.jsx(r,{label:"Date",required:!0,error:d.date,children:e.jsx("input",{type:"date",value:B,max:s,onChange:t=>{R(t.target.value),g(o=>({...o,date:!1}))},...m(d.date)})}),e.jsx(r,{label:"Invoice #",children:e.jsx("input",{value:v?`#${String(v).padStart(4,"0")}`:"—",...b(!1)})})]}),e.jsxs("div",{style:z,children:[e.jsx(r,{label:"Broker Name",children:e.jsx("input",{value:he,onChange:t=>ee(t.target.value),placeholder:"Optional",...m(!1)})}),e.jsx(r,{label:"Builty No.",required:!0,error:d.builtyNo,children:e.jsx("input",{value:Y,onChange:t=>{Z(t.target.value),g(o=>({...o,builtyNo:!1}))},placeholder:"e.g. B-001",...m(d.builtyNo)})})]}),e.jsx(r,{label:"Vehicle No.",required:!0,error:d.vehicleNo,children:e.jsx("input",{value:n,onChange:t=>{q(_e(t.target.value)),g(o=>({...o,vehicleNo:!1}))},placeholder:"e.g. LEA-1234",...m(d.vehicleNo)})}),e.jsx(r,{label:"Customer",required:!0,error:d.vendorId,children:e.jsx(Ie,{options:k,value:J,labelKey:"label",placeholder:"Select customer…",error:d.vendorId,onChange:t=>{G(t._id),X(t.accountName),g(o=>({...o,vendorId:!1}))}})}),e.jsx(r,{label:"Product",required:!0,error:d.productId,children:e.jsx(Ie,{options:x,value:te,labelKey:"label",placeholder:"Select product…",error:d.productId,onChange:t=>{se(t._id),ie(t.label||t.productName),g(o=>({...o,productId:!1}))}})}),e.jsxs("div",{style:Ye,children:[e.jsx(r,{label:"Qty (Bags)",required:!0,error:d.quantity,children:e.jsx("input",{type:"number",min:"0",value:oe,onChange:t=>{ae(t.target.value),g(o=>({...o,quantity:!1}))},placeholder:"0",...m(d.quantity)})}),e.jsx(r,{label:"Total Wt (kg)",required:!0,error:d.weight,children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:re,onChange:t=>{ne(t.target.value),g(o=>({...o,weight:!1}))},placeholder:"0.00",...m(d.weight)})}),e.jsx(r,{label:"Bag Wt (kg)",required:!0,error:d.bagWeight,children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:le,onChange:t=>{de(t.target.value),g(o=>({...o,bagWeight:!1}))},placeholder:"0.00",...m(d.bagWeight)})})]})]}),e.jsxs(be,{title:"Weight & Rates",dot:"#f59e0b",children:[e.jsxs("div",{style:z,children:[e.jsx(r,{label:"Net Weight (kg)",children:e.jsx("input",{value:S>0?u(S):"—",...b(S>0)})}),e.jsx(r,{label:"Net Weight (Maund)",children:e.jsx("input",{value:w>0?w.toString():"—",...b(!1)})})]}),e.jsx(r,{label:"Net Weight (Ton)",children:e.jsx("input",{value:S>0?(S/1e3).toString():"—",...b(!1)})}),xe,e.jsx(r,{label:"Rate / 40 kg (Rs.)",required:!0,error:d.rate40,children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:V,onChange:t=>{ce(t.target.value),g(o=>({...o,rate40:!1}))},placeholder:"0.00",...m(d.rate40)})}),e.jsxs("div",{style:z,children:[e.jsx(r,{label:"Amount (Rs.)",children:e.jsx("input",{value:T>0?u(T):"—",...b(!1)})}),e.jsx(r,{label:"Sutli Rate (Rs./bag)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:ue,onChange:t=>pe(t.target.value),placeholder:"0.00",...m(!1)})})]}),e.jsxs("div",{style:z,children:[e.jsx(r,{label:"Sutli Amount (Rs.)",children:e.jsx("input",{value:E>0?u(E):"—",...b(!1)})}),e.jsx(r,{label:"Total w/ Sutli (Rs.)",children:e.jsx("input",{value:H>0?u(H):"—",...b(!1)})})]}),xe,e.jsxs("div",{style:z,children:[e.jsx(r,{label:"Bardana Rate (Rs./bag)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:P,onChange:t=>fe(t.target.value),placeholder:"Optional",...m(!1)})}),e.jsx(r,{label:"Bardana Amount (Rs.)",children:e.jsx("input",{value:O>0?u(O):"—",...b(!1)})})]}),c(P)>0&&e.jsx(r,{label:"Total w/ Bardana (Rs.)",children:e.jsx("input",{value:K>0?u(K):"—",...b(!1)})})]}),e.jsxs(be,{title:"Brokery & Summary",dot:"#10b981",children:[e.jsx(r,{label:"Brokery Rate (Rs./Maund)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:F,onChange:t=>ge(t.target.value),placeholder:"e.g. 2.50",...m(!1)})}),c(F)>0&&e.jsxs("div",{style:{fontSize:11.5,color:"#6b7280",lineHeight:1.6},children:[w>0?w.toFixed(4):"0"," Maund × Rs ",c(F)," ="," ",e.jsxs("strong",{style:{color:"#374151"},children:["Rs ",u(D)]})]}),e.jsxs("div",{style:z,children:[e.jsx(r,{label:"Brokery Amount (Rs.)",children:e.jsx("input",{value:D>0?u(D):"—",...b(!1)})}),e.jsx(r,{label:"Net After Brokery",children:e.jsx("input",{value:_!==0?u(_):"—",...b(_>0)})})]}),xe,e.jsx("div",{className:"si-summary-box",children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:7},children:[[["Amount",u(T),"#374151"],["+ Sutli",u(E),"#374151"],...c(P)>0?[["+ Bardana",u(O),"#374151"]]:[],["Subtotal",u(K),"#111827"],["− Brokery",u(D),"#dc2626"]].map(([t,o,h])=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".06em"},children:t}),e.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:12.5,color:h,fontWeight:t==="Subtotal"?600:400},children:["Rs ",o]})]},t)),e.jsx("div",{style:{height:1,background:"#e5e7eb",margin:"2px 0"}}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:".06em"},children:"Net Payable"}),e.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:18,fontWeight:700,color:"#111827"},children:["Rs ",u(_)]})]})]})}),e.jsx("button",{type:"submit",disabled:ye,className:"si-submit",children:ye?"Saving…":e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})}),"Save & Print Invoice"]})})]})]})})]})]});return Q?e.jsx("div",{style:{position:"fixed",inset:0,zIndex:50,background:"#f9fafb",overflowY:"auto",padding:20},children:$e}):e.jsx(Ee,{children:$e})}export{et as default};
