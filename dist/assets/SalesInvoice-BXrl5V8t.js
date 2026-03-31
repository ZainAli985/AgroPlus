import{a as i,j as e}from"./vendor-react-BFXNeceC.js";import{a as I,N as Ie,S as De,A as D}from"./index-ENuaVSaE.js";import"./vendor-react-dom-DDWplefk.js";import"./vendor-DDAwBBib.js";const Pe="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",Me=`
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
`;function Fe(s){const r=s.toUpperCase().replace(/[^A-Z0-9]/g,"");if(r.length>0&&/^[0-9]/.test(r))return"";const f=r.match(/^[A-Z]+/),c=f?f[0]:"",g=r.slice(c.length);return c?g?`${c}-${g}`:c:""}function Le(s){s.target.blur()}function Te(s){(s.key==="ArrowUp"||s.key==="ArrowDown")&&s.preventDefault()}function ke({options:s,value:r,onChange:f,placeholder:c,labelKey:g="label",error:y}){const[m,v]=i.useState(!1),[w,N]=i.useState(""),W=i.useRef(null),C=i.useRef(null);i.useEffect(()=>{const n=Q=>{W.current&&!W.current.contains(Q.target)&&v(!1)};return document.addEventListener("mousedown",n),()=>document.removeEventListener("mousedown",n)},[]),i.useEffect(()=>{m&&setTimeout(()=>C.current?.focus(),0)},[m]);const P=s.filter(n=>(n[g]||"").toLowerCase().includes(w.toLowerCase())),A=s.find(n=>n._id===r||n.value===r);return e.jsxs("div",{ref:W,style:{position:"relative"},children:[e.jsxs("button",{type:"button",onClick:()=>v(n=>!n),className:`si-sd-btn${A?" sel":""}${y?" err":""}${m?" open":""}`,children:[e.jsx("span",{style:{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textAlign:"left"},children:A?A[g]:c}),e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2.5,style:{flexShrink:0,transition:".15s",transform:m?"rotate(180deg)":"none"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),m&&e.jsxs("div",{className:"si-sd-panel",children:[e.jsx("div",{style:{padding:7,borderBottom:"1px solid #f3f4f6",background:"#f9fafb"},children:e.jsx("input",{ref:C,value:w,onChange:n=>N(n.target.value),placeholder:"Search…",style:{width:"100%",padding:"6px 9px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12.5,outline:"none",fontFamily:"'DM Sans',sans-serif"}})}),e.jsx("ul",{style:{maxHeight:210,overflowY:"auto",margin:0,padding:0,listStyle:"none"},children:P.length===0?e.jsx("li",{style:{padding:"9px 12px",fontSize:12.5,color:"#9ca3af",textAlign:"center"},children:"No results"}):P.map(n=>e.jsx("li",{className:`si-sd-item${(n._id||n.value)===r?" sel":""}`,onClick:()=>{f(n),v(!1),N("")},children:n[g]},n._id||n.value))})]})]})}function a({label:s,required:r,error:f,children:c}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsxs("div",{className:`si-lbl${f?" err":""}`,children:[s,r&&e.jsx("span",{className:"req",children:"*"}),f&&e.jsx("span",{className:"errtag",children:"Required"})]}),c]})}function te({title:s,dot:r,children:f}){return e.jsxs("div",{className:"si-panel",children:[e.jsxs("div",{className:"si-panel-head",children:[e.jsx("div",{style:{width:7,height:7,borderRadius:"50%",background:r,flexShrink:0}}),e.jsx("span",{style:{fontSize:10.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#374151"},children:s})]}),e.jsx("div",{className:"si-panel-body",children:f})]})}function qe(s){return{name:s?.businessName||localStorage.getItem("businessName")||"Mill",logo:s?.logoUrl||localStorage.getItem("logoUrl")||"",address:s?.address||s?.millAddress||"",phone1:s?.phone||s?.phone1||"",phone2:s?.phone2||""}}function Ee(s,r,f){const c=f||{},g=c.name||localStorage.getItem("businessName")||"Mill",y=c.logo||localStorage.getItem("logoUrl")||"",m=c.address||"",v=[c.phone1,c.phone2].filter(Boolean).join("  |  "),w=String(r).padStart(4,"0"),N=y?`<img src="${y}" alt="logo" style="height:48px;width:48px;object-fit:contain;border-radius:6px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);padding:3px;"/>`:`<div style="width:48px;height:48px;border-radius:8px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#fff;">${g.charAt(0)}</div>`;return`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Sales #${w}</title>
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
  <div class="hd">${N}<div class="hd-info"><div class="hd-name">${g}</div>${m?`<div class="hd-sub">${m}</div>`:""} ${v?`<div class="hd-sub">${v}</div>`:""}</div><div class="hd-right"><div class="hd-type">Sales</div><div class="hd-no">#${w}</div><div class="hd-date">${s.date||""}</div></div></div>
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
</div><script>window.print()<\/script></body></html>`}const z={display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},Oe={display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10},u=s=>isNaN(Number(s))?0:Number(s)||0,p=(s,r=2)=>u(s).toLocaleString("en-PK",{minimumFractionDigits:r,maximumFractionDigits:r}),se=e.jsx("div",{className:"si-divider"}),x=s=>({className:`si-inp si-no-spin${s?" err":""}`,onFocus:r=>{s||(r.target.style.borderColor="#6b7280",r.target.style.boxShadow="0 0 0 2px rgba(107,114,128,.12)")},onBlur:r=>{s||(r.target.style.borderColor="#d1d5db",r.target.style.boxShadow="none")},onWheel:Le,onKeyDown:Te}),h=(s=!1)=>({className:`si-ro${s?" hi":""}`,readOnly:!0});function He(){const s=new Date().toISOString().split("T")[0],[r,f]=i.useState([]),[c,g]=i.useState([]),[y,m]=i.useState(""),[v,w]=i.useState(s),[N,W]=i.useState(""),[C,P]=i.useState(""),[A,n]=i.useState(""),[Q,ie]=i.useState(""),[oe,re]=i.useState(""),[Y,ae]=i.useState(""),[Re,ne]=i.useState(""),[Z,le]=i.useState(""),[J,de]=i.useState(""),[G,ce]=i.useState(""),[V,ue]=i.useState(""),[X,pe]=i.useState(""),[M,fe]=i.useState(""),[F,ge]=i.useState(""),[l,b]=i.useState({}),[me,be]=i.useState(!1),[xe,L]=i.useState({message:"",type:"info"}),[U,he]=i.useState(!1),[_,ye]=i.useState(null),[$e,Ae]=i.useState({}),ve=i.useRef(null),je=u(J),Se=u(G),S=je-Se,k=S>0?S/40:0,ee=u(Z),T=k*u(V),q=u(X)*ee,H=T+q,E=u(M)*ee,O=H+E,B=k*u(F),K=O-B;i.useEffect(()=>{Promise.all([I(`${D}/products`).then(t=>t.json()),I(`${D}/accounts?excludeProducts=true`).then(t=>t.json()),I(`${D}/sales-invoice/next-sr`).then(t=>t.json()),I(`${D}/profile`).then(t=>t.json()).catch(()=>({}))]).then(([t,o,j,R])=>{R&&Ae(R.profile||R||{}),t.success&&f(t.products.map(d=>({...d,label:d.displayName||[d.productName,d.type,d.subType].filter(Boolean).join(" - ")})));const $=Array.isArray(o)?o:o.accounts||[],Ne=$.filter(d=>!d.isProtected&&!d.isProductAccount&&(d.category==="Customer"||!d.category&&d.accountType==="Assets"&&d.subAccountType==="Current Assets"));g((Ne.length>0?Ne:$.filter(d=>!d.isProtected&&!d.isProductAccount)).map(d=>({...d,label:d.accountName}))),j.success&&j.nextSr&&m(String(j.nextSr))})},[]),i.useEffect(()=>{if(!_)return;const t=window.open("","_blank");t&&(t.document.write(Ee(_,_.sr,qe($e))),t.document.close()),ye(null)},[_]);const ze=()=>{const t={};return v||(t.date=!0),N||(t.vehicleNo=!0),C||(t.builtyNo=!0),A||(t.vendorId=!0),Y||(t.productId=!0),Z||(t.quantity=!0),J||(t.weight=!0),G||(t.bagWeight=!0),V||(t.rate40=!0),b(t),Object.keys(t).length===0},We=t=>{if(t.key!=="Enter")return;const o=ve.current?.querySelectorAll("input:not([readonly]):not([type=submit]),select");if(!o?.length)return;const j=[...o].indexOf(t.target);j>=0&&j<o.length-1&&(t.preventDefault(),o[j+1].focus())},Ce=()=>{w(s),W(""),P(""),n(""),ie(""),re(""),ae(""),ne(""),le(""),de(""),ce(""),ue(""),pe(""),fe(""),ge(""),b({})},Be=async t=>{if(t.preventDefault(),!ze()){L({message:"Please fill all required fields",type:"error"});return}be(!0);try{const o={date:v,vehicleNo:N,builtyNo:C,vendorName:Q,vendorAccountId:A||void 0,brokerName:oe,productId:Y,paddyType:Re,quantity:ee,weight:je,bagWeight:Se,netWeight:S>0?S:0,netWeight40:k>0?k:0,rate40:u(V),amount:T,sutliSilaiRate:u(X),sutliSilaiAmount:q,totalAmount:H,bardanaRate:u(M)||void 0,bardanaAmount:E||void 0,totalWithBardana:O,brokeryRate:u(F)||void 0,brokery:B||void 0,totalAmount2:K,sr:Number(y)},R=await(await I(`${D}/sales-invoice/create`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})).json();R.success?(L({message:`Invoice #${String(R.invoice.sr).padStart(4,"0")} saved!`,type:"success"}),ye(R.invoice),Ce(),I(`${D}/sales-invoice/next-sr`).then($=>$.json()).then($=>{$.success&&$.nextSr&&m(String($.nextSr))})):L({message:R.message||"Failed to save.",type:"error"})}catch{L({message:"Server error.",type:"error"})}finally{be(!1)}};i.useEffect(()=>{const t=o=>{o.key==="Escape"&&U&&he(!1)};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[U]);const we=e.jsxs(e.Fragment,{children:[e.jsxs("style",{children:[Pe,Me]}),e.jsx(Ie,{message:xe.message,type:xe.type,onClose:()=>L({message:"",type:"info"})}),e.jsxs("div",{className:"si-wrap",style:{maxWidth:1100,margin:"0 auto"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,gap:10,flexWrap:"wrap"},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"Sales"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("h1",{style:{fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px",margin:0},children:"Sales Invoice"}),e.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:600,background:"#f3f4f6",color:"#374151",padding:"2px 8px",borderRadius:5,border:"1px solid #e5e7eb"},children:["#",y?String(y).padStart(4,"0"):"——"]})]})]}),e.jsx("button",{type:"button",onClick:()=>he(t=>!t),style:{fontSize:11.5,fontWeight:500,padding:"6px 12px",borderRadius:6,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",cursor:"pointer"},children:U?"Exit Full Screen":"Full Screen"})]}),e.jsx("form",{ref:ve,onSubmit:Be,onKeyDown:We,children:e.jsxs("div",{className:"inv-grid",style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:12,alignItems:"start"},children:[e.jsxs(te,{title:"Basic Information",dot:"#6366f1",children:[e.jsxs("div",{style:z,children:[e.jsx(a,{label:"Date",required:!0,error:l.date,children:e.jsx("input",{type:"date",value:v,max:s,onChange:t=>{w(t.target.value),b(o=>({...o,date:!1}))},...x(l.date)})}),e.jsx(a,{label:"Invoice #",children:e.jsx("input",{value:y?`#${String(y).padStart(4,"0")}`:"—",...h(!1)})})]}),e.jsxs("div",{style:z,children:[e.jsx(a,{label:"Broker Name",children:e.jsx("input",{value:oe,onChange:t=>re(t.target.value),placeholder:"Optional",...x(!1)})}),e.jsx(a,{label:"Builty No.",required:!0,error:l.builtyNo,children:e.jsx("input",{value:C,onChange:t=>{P(t.target.value),b(o=>({...o,builtyNo:!1}))},placeholder:"e.g. B-001",...x(l.builtyNo)})})]}),e.jsx(a,{label:"Vehicle No.",required:!0,error:l.vehicleNo,children:e.jsx("input",{value:N,onChange:t=>{W(Fe(t.target.value)),b(o=>({...o,vehicleNo:!1}))},placeholder:"e.g. LEA-1234",...x(l.vehicleNo)})}),e.jsx(a,{label:"Customer",required:!0,error:l.vendorId,children:e.jsx(ke,{options:c,value:A,labelKey:"label",placeholder:"Select customer…",error:l.vendorId,onChange:t=>{n(t._id),ie(t.accountName),b(o=>({...o,vendorId:!1}))}})}),e.jsx(a,{label:"Product",required:!0,error:l.productId,children:e.jsx(ke,{options:r,value:Y,labelKey:"label",placeholder:"Select product…",error:l.productId,onChange:t=>{ae(t._id),ne(t.label||t.productName),b(o=>({...o,productId:!1}))}})}),e.jsxs("div",{style:Oe,children:[e.jsx(a,{label:"Qty (Bags)",required:!0,error:l.quantity,children:e.jsx("input",{type:"number",min:"0",value:Z,onChange:t=>{le(t.target.value),b(o=>({...o,quantity:!1}))},placeholder:"0",...x(l.quantity)})}),e.jsx(a,{label:"Total Wt (kg)",required:!0,error:l.weight,children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:J,onChange:t=>{de(t.target.value),b(o=>({...o,weight:!1}))},placeholder:"0.00",...x(l.weight)})}),e.jsx(a,{label:"Bag Wt (kg)",required:!0,error:l.bagWeight,children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:G,onChange:t=>{ce(t.target.value),b(o=>({...o,bagWeight:!1}))},placeholder:"0.00",...x(l.bagWeight)})})]})]}),e.jsxs(te,{title:"Weight & Rates",dot:"#f59e0b",children:[e.jsxs("div",{style:z,children:[e.jsx(a,{label:"Net Weight (kg)",children:e.jsx("input",{value:S>0?p(S):"—",...h(S>0)})}),e.jsx(a,{label:"Net Weight (Maund)",children:e.jsx("input",{value:k>0?k.toString():"—",...h(!1)})})]}),e.jsx(a,{label:"Net Weight (Ton)",children:e.jsx("input",{value:S>0?(S/1e3).toString():"—",...h(!1)})}),se,e.jsx(a,{label:"Rate / 40 kg (Rs.)",required:!0,error:l.rate40,children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:V,onChange:t=>{ue(t.target.value),b(o=>({...o,rate40:!1}))},placeholder:"0.00",...x(l.rate40)})}),e.jsxs("div",{style:z,children:[e.jsx(a,{label:"Amount (Rs.)",children:e.jsx("input",{value:T>0?p(T):"—",...h(!1)})}),e.jsx(a,{label:"Sutli Rate (Rs./bag)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:X,onChange:t=>pe(t.target.value),placeholder:"0.00",...x(!1)})})]}),e.jsxs("div",{style:z,children:[e.jsx(a,{label:"Sutli Amount (Rs.)",children:e.jsx("input",{value:q>0?p(q):"—",...h(!1)})}),e.jsx(a,{label:"Total w/ Sutli (Rs.)",children:e.jsx("input",{value:H>0?p(H):"—",...h(!1)})})]}),se,e.jsxs("div",{style:z,children:[e.jsx(a,{label:"Bardana Rate (Rs./bag)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:M,onChange:t=>fe(t.target.value),placeholder:"Optional",...x(!1)})}),e.jsx(a,{label:"Bardana Amount (Rs.)",children:e.jsx("input",{value:E>0?p(E):"—",...h(!1)})})]}),u(M)>0&&e.jsx(a,{label:"Total w/ Bardana (Rs.)",children:e.jsx("input",{value:O>0?p(O):"—",...h(!1)})})]}),e.jsxs(te,{title:"Brokery & Summary",dot:"#10b981",children:[e.jsx(a,{label:"Brokery Rate (Rs./Maund)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:F,onChange:t=>ge(t.target.value),placeholder:"e.g. 2.50",...x(!1)})}),u(F)>0&&e.jsxs("div",{style:{fontSize:11.5,color:"#6b7280",lineHeight:1.6},children:[k>0?k.toFixed(4):"0"," Maund × Rs ",u(F)," ="," ",e.jsxs("strong",{style:{color:"#374151"},children:["Rs ",p(B)]})]}),e.jsxs("div",{style:z,children:[e.jsx(a,{label:"Brokery Amount (Rs.)",children:e.jsx("input",{value:B>0?p(B):"—",...h(!1)})}),e.jsx(a,{label:"Net After Brokery",children:e.jsx("input",{value:K!==0?p(K):"—",...h(K>0)})})]}),se,e.jsx("div",{className:"si-summary-box",children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:7},children:[[["Amount",p(T),"#374151"],["+ Sutli",p(q),"#374151"],...u(M)>0?[["+ Bardana",p(E),"#374151"]]:[],["Subtotal",p(O),"#111827"],["− Brokery",p(B),"#dc2626"]].map(([t,o,j])=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".06em"},children:t}),e.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:12.5,color:j,fontWeight:t==="Subtotal"?600:400},children:["Rs ",o]})]},t)),e.jsx("div",{style:{height:1,background:"#e5e7eb",margin:"2px 0"}}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:".06em"},children:"Net Payable"}),e.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:18,fontWeight:700,color:"#111827"},children:["Rs ",p(K)]})]})]})}),e.jsx("button",{type:"submit",disabled:me,className:"si-submit",children:me?"Saving…":e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})}),"Save & Print Invoice"]})})]})]})})]})]});return U?e.jsx("div",{style:{position:"fixed",inset:0,zIndex:50,background:"#f9fafb",overflowY:"auto",padding:20},children:we}):e.jsx(De,{children:we})}export{He as default};
