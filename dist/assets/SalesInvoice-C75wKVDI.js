import{a as i,j as e}from"./vendor-react-BFXNeceC.js";import{a as I,N as Ie,S as De,A as D}from"./index-cZ7zb13t.js";import"./vendor-react-dom-DDWplefk.js";import"./vendor-DDAwBBib.js";const Me="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",Pe=`
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
`;function Fe(s){const a=s.toUpperCase().replace(/[^A-Z0-9]/g,"");if(a.length>0&&/^[0-9]/.test(a))return"";const p=a.match(/^[A-Z]+/),d=p?p[0]:"",f=a.slice(d.length);return d?f?`${d}-${f}`:d:""}function Le(s){s.target.blur()}function qe(s){(s.key==="ArrowUp"||s.key==="ArrowDown")&&s.preventDefault()}function Ne({options:s,value:a,onChange:p,placeholder:d,labelKey:f="label",error:h}){const[g,v]=i.useState(!1),[w,N]=i.useState(""),W=i.useRef(null),A=i.useRef(null);i.useEffect(()=>{const n=Q=>{W.current&&!W.current.contains(Q.target)&&v(!1)};return document.addEventListener("mousedown",n),()=>document.removeEventListener("mousedown",n)},[]),i.useEffect(()=>{g&&setTimeout(()=>A.current?.focus(),0)},[g]);const M=s.filter(n=>(n[f]||"").toLowerCase().includes(w.toLowerCase())),$=s.find(n=>n._id===a||n.value===a);return e.jsxs("div",{ref:W,style:{position:"relative"},children:[e.jsxs("button",{type:"button",onClick:()=>v(n=>!n),className:`si-sd-btn${$?" sel":""}${h?" err":""}${g?" open":""}`,children:[e.jsx("span",{style:{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textAlign:"left"},children:$?$[f]:d}),e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2.5,style:{flexShrink:0,transition:".15s",transform:g?"rotate(180deg)":"none"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),g&&e.jsxs("div",{className:"si-sd-panel",children:[e.jsx("div",{style:{padding:7,borderBottom:"1px solid #f3f4f6",background:"#f9fafb"},children:e.jsx("input",{ref:A,value:w,onChange:n=>N(n.target.value),placeholder:"Search…",style:{width:"100%",padding:"6px 9px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12.5,outline:"none",fontFamily:"'DM Sans',sans-serif"}})}),e.jsx("ul",{style:{maxHeight:210,overflowY:"auto",margin:0,padding:0,listStyle:"none"},children:M.length===0?e.jsx("li",{style:{padding:"9px 12px",fontSize:12.5,color:"#9ca3af",textAlign:"center"},children:"No results"}):M.map(n=>e.jsx("li",{className:`si-sd-item${(n._id||n.value)===a?" sel":""}`,onClick:()=>{p(n),v(!1),N("")},children:n[f]},n._id||n.value))})]})]})}function o({label:s,required:a,error:p,children:d}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsxs("div",{className:`si-lbl${p?" err":""}`,children:[s,a&&e.jsx("span",{className:"req",children:"*"}),p&&e.jsx("span",{className:"errtag",children:"Required"})]}),d]})}function te({title:s,dot:a,children:p}){return e.jsxs("div",{className:"si-panel",children:[e.jsxs("div",{className:"si-panel-head",children:[e.jsx("div",{style:{width:7,height:7,borderRadius:"50%",background:a,flexShrink:0}}),e.jsx("span",{style:{fontSize:10.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#374151"},children:s})]}),e.jsx("div",{className:"si-panel-body",children:p})]})}function Te(s){return{name:s?.businessName||localStorage.getItem("businessName")||"Mill",logo:s?.logoUrl||localStorage.getItem("logoUrl")||"",address:s?.address||s?.millAddress||"",phone1:s?.phone||s?.phone1||"",phone2:s?.phone2||""}}function Ee(s,a,p){const d=p||{},f=d.name||localStorage.getItem("businessName")||"Mill",h=d.logo||localStorage.getItem("logoUrl")||"",g=d.address||"",v=[d.phone1,d.phone2].filter(Boolean).join("  |  "),w=String(a).padStart(4,"0"),N=h?`<img src="${h}" alt="logo" style="height:48px;width:48px;object-fit:contain;border-radius:6px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);padding:3px;"/>`:`<div style="width:48px;height:48px;border-radius:8px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#fff;">${f.charAt(0)}</div>`;return`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Sales #${w}</title>
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
  <div class="hd">${N}<div class="hd-info"><div class="hd-name">${f}</div>${g?`<div class="hd-sub">${g}</div>`:""} ${v?`<div class="hd-sub">${v}</div>`:""}</div><div class="hd-right"><div class="hd-type">Sales</div><div class="hd-no">#${w}</div><div class="hd-date">${s.date||""}</div></div></div>
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
</div><script>window.print()<\/script></body></html>`}const z={display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},Oe={display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10},c=s=>isNaN(Number(s))?0:Number(s)||0,u=(s,a=2)=>c(s).toLocaleString("en-PK",{minimumFractionDigits:a,maximumFractionDigits:a}),se=e.jsx("div",{className:"si-divider"}),b=s=>({className:`si-inp si-no-spin${s?" err":""}`,onFocus:a=>{s||(a.target.style.borderColor="#6b7280",a.target.style.boxShadow="0 0 0 2px rgba(107,114,128,.12)")},onBlur:a=>{s||(a.target.style.borderColor="#d1d5db",a.target.style.boxShadow="none")},onWheel:Le,onKeyDown:qe}),x=(s=!1)=>({className:`si-ro${s?" hi":""}`,readOnly:!0});function He(){const s=new Date().toISOString().split("T")[0],[a,p]=i.useState([]),[d,f]=i.useState([]),[h,g]=i.useState(""),[v,w]=i.useState(s),[N,W]=i.useState(""),[A,M]=i.useState(""),[$,n]=i.useState(""),[Q,ie]=i.useState(""),[re,ae]=i.useState(""),[Y,oe]=i.useState(""),[ke,ne]=i.useState(""),[Z,le]=i.useState(""),[J,de]=i.useState(""),[G,ce]=i.useState(""),[V,ue]=i.useState(""),[X,pe]=i.useState(""),[P,fe]=i.useState(""),[F,ge]=i.useState(""),[l,m]=i.useState({}),[me,be]=i.useState(!1),[xe,L]=i.useState({message:"",type:"info"}),[U,he]=i.useState(!1),[_,ve]=i.useState(null),[Re,$e]=i.useState({}),ye=i.useRef(null),je=c(J),Se=c(G),S=je-Se,k=S>0?S/40:0,ee=c(Z),q=k*c(V),T=c(X)*ee,H=q+T,E=c(P)*ee,O=H+E,C=k*c(F),K=O-C;i.useEffect(()=>{Promise.all([I(`${D}/products?activeOnly=true`).then(t=>t.json()),I(`${D}/accounts?excludeProducts=true`).then(t=>t.json()),I(`${D}/sales-invoice/next-sr`).then(t=>t.json()),I(`${D}/profile`).then(t=>t.json()).catch(()=>({}))]).then(([t,r,y,R])=>{R&&$e(R.profile||R||{}),t.success&&p(t.products.map(j=>({...j,label:j.displayName||[j.productName,j.type,j.subType].filter(Boolean).join(" - ")})));const Be=(Array.isArray(r)?r:r.accounts||[]).filter(j=>j.category==="Customer");f(Be.map(j=>({...j,label:j.accountName}))),y.success&&y.nextSr&&g(String(y.nextSr))})},[]),i.useEffect(()=>{if(!_)return;const t=window.open("","_blank");t&&(t.document.write(Ee(_,_.sr,Te(Re))),t.document.close()),ve(null)},[_]);const ze=()=>{const t={};return v||(t.date=!0),N||(t.vehicleNo=!0),A||(t.builtyNo=!0),$||(t.vendorId=!0),Y||(t.productId=!0),Z||(t.quantity=!0),J||(t.weight=!0),G||(t.bagWeight=!0),V||(t.rate40=!0),m(t),Object.keys(t).length===0},We=t=>{if(t.key!=="Enter")return;const r=ye.current?.querySelectorAll("input:not([readonly]):not([type=submit]),select");if(!r?.length)return;const y=[...r].indexOf(t.target);y>=0&&y<r.length-1&&(t.preventDefault(),r[y+1].focus())},Ae=()=>{w(s),W(""),M(""),n(""),ie(""),ae(""),oe(""),ne(""),le(""),de(""),ce(""),ue(""),pe(""),fe(""),ge(""),m({})},Ce=async t=>{if(t.preventDefault(),!ze()){L({message:"Please fill all required fields",type:"error"});return}be(!0);try{const r={date:v,vehicleNo:N,builtyNo:A,vendorName:Q,vendorAccountId:$||void 0,brokerName:re,productId:Y,paddyType:ke,quantity:ee,weight:je,bagWeight:Se,netWeight:S>0?S:0,netWeight40:k>0?k:0,rate40:c(V),amount:q,sutliSilaiRate:c(X),sutliSilaiAmount:T,totalAmount:H,bardanaRate:c(P)||void 0,bardanaAmount:E||void 0,totalWithBardana:O,brokeryRate:c(F)||void 0,brokery:C||void 0,totalAmount2:K,sr:Number(h)},R=await(await I(`${D}/sales-invoice/create`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).json();R.success?(L({message:`Invoice #${String(R.invoice.sr).padStart(4,"0")} saved!`,type:"success"}),ve(R.invoice),Ae(),I(`${D}/sales-invoice/next-sr`).then(B=>B.json()).then(B=>{B.success&&B.nextSr&&g(String(B.nextSr))})):L({message:R.message||"Failed to save.",type:"error"})}catch{L({message:"Server error.",type:"error"})}finally{be(!1)}};i.useEffect(()=>{const t=r=>{r.key==="Escape"&&U&&he(!1)};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[U]);const we=e.jsxs(e.Fragment,{children:[e.jsxs("style",{children:[Me,Pe]}),e.jsx(Ie,{message:xe.message,type:xe.type,onClose:()=>L({message:"",type:"info"})}),e.jsxs("div",{className:"si-wrap",style:{maxWidth:1100,margin:"0 auto"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,gap:10,flexWrap:"wrap"},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"Sales"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("h1",{style:{fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px",margin:0},children:"Sales Invoice"}),e.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:600,background:"#f3f4f6",color:"#374151",padding:"2px 8px",borderRadius:5,border:"1px solid #e5e7eb"},children:["#",h?String(h).padStart(4,"0"):"——"]})]})]}),e.jsx("button",{type:"button",onClick:()=>he(t=>!t),style:{fontSize:11.5,fontWeight:500,padding:"6px 12px",borderRadius:6,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",cursor:"pointer"},children:U?"Exit Full Screen":"Full Screen"})]}),e.jsx("form",{ref:ye,onSubmit:Ce,onKeyDown:We,children:e.jsxs("div",{className:"inv-grid",style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:12,alignItems:"start"},children:[e.jsxs(te,{title:"Basic Information",dot:"#6366f1",children:[e.jsxs("div",{style:z,children:[e.jsx(o,{label:"Date",required:!0,error:l.date,children:e.jsx("input",{type:"date",value:v,max:s,onChange:t=>{w(t.target.value),m(r=>({...r,date:!1}))},...b(l.date)})}),e.jsx(o,{label:"Invoice #",children:e.jsx("input",{value:h?`#${String(h).padStart(4,"0")}`:"—",...x(!1)})})]}),e.jsxs("div",{style:z,children:[e.jsx(o,{label:"Broker Name",children:e.jsx("input",{value:re,onChange:t=>ae(t.target.value),placeholder:"Optional",...b(!1)})}),e.jsx(o,{label:"Builty No.",required:!0,error:l.builtyNo,children:e.jsx("input",{value:A,onChange:t=>{M(t.target.value),m(r=>({...r,builtyNo:!1}))},placeholder:"e.g. B-001",...b(l.builtyNo)})})]}),e.jsx(o,{label:"Vehicle No.",required:!0,error:l.vehicleNo,children:e.jsx("input",{value:N,onChange:t=>{W(Fe(t.target.value)),m(r=>({...r,vehicleNo:!1}))},placeholder:"e.g. LEA-1234",...b(l.vehicleNo)})}),e.jsx(o,{label:"Customer",required:!0,error:l.vendorId,children:e.jsx(Ne,{options:d,value:$,labelKey:"label",placeholder:"Select customer…",error:l.vendorId,onChange:t=>{n(t._id),ie(t.accountName),m(r=>({...r,vendorId:!1}))}})}),e.jsx(o,{label:"Product",required:!0,error:l.productId,children:e.jsx(Ne,{options:a,value:Y,labelKey:"label",placeholder:"Select product…",error:l.productId,onChange:t=>{oe(t._id),ne(t.label||t.productName),m(r=>({...r,productId:!1}))}})}),e.jsxs("div",{style:Oe,children:[e.jsx(o,{label:"Qty (Bags)",required:!0,error:l.quantity,children:e.jsx("input",{type:"number",min:"0",value:Z,onChange:t=>{le(t.target.value),m(r=>({...r,quantity:!1}))},placeholder:"0",...b(l.quantity)})}),e.jsx(o,{label:"Total Wt (kg)",required:!0,error:l.weight,children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:J,onChange:t=>{de(t.target.value),m(r=>({...r,weight:!1}))},placeholder:"0.00",...b(l.weight)})}),e.jsx(o,{label:"Bag Wt (kg)",required:!0,error:l.bagWeight,children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:G,onChange:t=>{ce(t.target.value),m(r=>({...r,bagWeight:!1}))},placeholder:"0.00",...b(l.bagWeight)})})]})]}),e.jsxs(te,{title:"Weight & Rates",dot:"#f59e0b",children:[e.jsxs("div",{style:z,children:[e.jsx(o,{label:"Net Weight (kg)",children:e.jsx("input",{value:S>0?u(S):"—",...x(S>0)})}),e.jsx(o,{label:"Net Weight (Maund)",children:e.jsx("input",{value:k>0?k.toString():"—",...x(!1)})})]}),e.jsx(o,{label:"Net Weight (Ton)",children:e.jsx("input",{value:S>0?(S/1e3).toString():"—",...x(!1)})}),se,e.jsx(o,{label:"Rate / 40 kg (Rs.)",required:!0,error:l.rate40,children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:V,onChange:t=>{ue(t.target.value),m(r=>({...r,rate40:!1}))},placeholder:"0.00",...b(l.rate40)})}),e.jsxs("div",{style:z,children:[e.jsx(o,{label:"Amount (Rs.)",children:e.jsx("input",{value:q>0?u(q):"—",...x(!1)})}),e.jsx(o,{label:"Sutli Rate (Rs./bag)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:X,onChange:t=>pe(t.target.value),placeholder:"0.00",...b(!1)})})]}),e.jsxs("div",{style:z,children:[e.jsx(o,{label:"Sutli Amount (Rs.)",children:e.jsx("input",{value:T>0?u(T):"—",...x(!1)})}),e.jsx(o,{label:"Total w/ Sutli (Rs.)",children:e.jsx("input",{value:H>0?u(H):"—",...x(!1)})})]}),se,e.jsxs("div",{style:z,children:[e.jsx(o,{label:"Bardana Rate (Rs./bag)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:P,onChange:t=>fe(t.target.value),placeholder:"Optional",...b(!1)})}),e.jsx(o,{label:"Bardana Amount (Rs.)",children:e.jsx("input",{value:E>0?u(E):"—",...x(!1)})})]}),c(P)>0&&e.jsx(o,{label:"Total w/ Bardana (Rs.)",children:e.jsx("input",{value:O>0?u(O):"—",...x(!1)})})]}),e.jsxs(te,{title:"Brokery & Summary",dot:"#10b981",children:[e.jsx(o,{label:"Brokery Rate (Rs./Maund)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:F,onChange:t=>ge(t.target.value),placeholder:"e.g. 2.50",...b(!1)})}),c(F)>0&&e.jsxs("div",{style:{fontSize:11.5,color:"#6b7280",lineHeight:1.6},children:[k>0?k.toFixed(4):"0"," Maund × Rs ",c(F)," ="," ",e.jsxs("strong",{style:{color:"#374151"},children:["Rs ",u(C)]})]}),e.jsxs("div",{style:z,children:[e.jsx(o,{label:"Brokery Amount (Rs.)",children:e.jsx("input",{value:C>0?u(C):"—",...x(!1)})}),e.jsx(o,{label:"Net After Brokery",children:e.jsx("input",{value:K!==0?u(K):"—",...x(K>0)})})]}),se,e.jsx("div",{className:"si-summary-box",children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:7},children:[[["Amount",u(q),"#374151"],["+ Sutli",u(T),"#374151"],...c(P)>0?[["+ Bardana",u(E),"#374151"]]:[],["Subtotal",u(O),"#111827"],["− Brokery",u(C),"#dc2626"]].map(([t,r,y])=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".06em"},children:t}),e.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:12.5,color:y,fontWeight:t==="Subtotal"?600:400},children:["Rs ",r]})]},t)),e.jsx("div",{style:{height:1,background:"#e5e7eb",margin:"2px 0"}}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:".06em"},children:"Net Payable"}),e.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:18,fontWeight:700,color:"#111827"},children:["Rs ",u(K)]})]})]})}),e.jsx("button",{type:"submit",disabled:me,className:"si-submit",children:me?"Saving…":e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})}),"Save & Print Invoice"]})})]})]})})]})]});return U?e.jsx("div",{style:{position:"fixed",inset:0,zIndex:50,background:"#f9fafb",overflowY:"auto",padding:20},children:we}):e.jsx(De,{children:we})}export{He as default};
