import{a as O,j as e,N as Ce,S as De,A as K}from"./index-X7I1Q5Te.js";import{b as r}from"./react-BBT0yyZ1.js";const ze="@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');",Be=`
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
`;function Ie(s){const a=s.toUpperCase().replace(/[^A-Z0-9]/g,"");if(a.length>0&&/^[0-9]/.test(a))return"";const p=a.match(/^[A-Z]+/),x=p?p[0]:"",y=a.slice(x.length);return x?y?`${x}-${y}`:x:""}function Pe(s){s.target.blur()}function Me(s){(s.key==="ArrowUp"||s.key==="ArrowDown")&&s.preventDefault()}function Ne({options:s,value:a,onChange:p,placeholder:x,labelKey:y="label",error:w}){const[v,N]=r.useState(!1),[z,$]=r.useState(""),W=r.useRef(null),C=r.useRef(null);r.useEffect(()=>{const o=Y=>{W.current&&!W.current.contains(Y.target)&&N(!1)};return document.addEventListener("mousedown",o),()=>document.removeEventListener("mousedown",o)},[]),r.useEffect(()=>{v&&setTimeout(()=>C.current?.focus(),0)},[v]);const B=s.filter(o=>(o[y]||"").toLowerCase().includes(z.toLowerCase())),k=s.find(o=>o._id===a||o.value===a);return e.jsxs("div",{ref:W,style:{position:"relative"},children:[e.jsxs("button",{type:"button",onClick:()=>N(o=>!o),className:`si-sd-btn${k?" sel":""}${w?" err":""}${v?" open":""}`,children:[e.jsx("span",{style:{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textAlign:"left"},children:k?k[y]:x}),e.jsx("svg",{width:11,height:11,fill:"none",viewBox:"0 0 24 24",stroke:"#9ca3af",strokeWidth:2.5,style:{flexShrink:0,transition:".15s",transform:v?"rotate(180deg)":"none"},children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),v&&e.jsxs("div",{className:"si-sd-panel",children:[e.jsx("div",{style:{padding:7,borderBottom:"1px solid #f3f4f6",background:"#f9fafb"},children:e.jsx("input",{ref:C,value:z,onChange:o=>$(o.target.value),placeholder:"Search…",style:{width:"100%",padding:"6px 9px",border:"1px solid #e5e7eb",borderRadius:6,fontSize:12.5,outline:"none",fontFamily:"'DM Sans',sans-serif"}})}),e.jsx("ul",{style:{maxHeight:210,overflowY:"auto",margin:0,padding:0,listStyle:"none"},children:B.length===0?e.jsx("li",{style:{padding:"9px 12px",fontSize:12.5,color:"#9ca3af",textAlign:"center"},children:"No results"}):B.map(o=>e.jsx("li",{className:`si-sd-item${(o._id||o.value)===a?" sel":""}`,onClick:()=>{p(o),N(!1),$("")},children:o[y]},o._id||o.value))})]})]})}function n({label:s,required:a,error:p,children:x}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsxs("div",{className:`si-lbl${p?" err":""}`,children:[s,a&&e.jsx("span",{className:"req",children:"*"}),p&&e.jsx("span",{className:"errtag",children:"Required"})]}),x]})}function te({title:s,dot:a,children:p}){return e.jsxs("div",{className:"si-panel",children:[e.jsxs("div",{className:"si-panel-head",children:[e.jsx("div",{style:{width:7,height:7,borderRadius:"50%",background:a,flexShrink:0}}),e.jsx("span",{style:{fontSize:10.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#374151"},children:s})]}),e.jsx("div",{className:"si-panel-body",children:p})]})}function Fe(s,a){return`<!DOCTYPE html><html><head><title>Sales Invoice #${String(a).padStart(4,"0")}</title>
<style>@page{size:A4;margin:12mm}body{font-family:"Segoe UI",Arial,sans-serif;background:#fff;color:#111}.wrap{max-width:660px;margin:auto}.head{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #1e3a8a;padding-bottom:10px;margin-bottom:16px}.logo{display:flex;align-items:center;gap:10px}.logo img{height:55px}.logo h1{font-size:20px;margin:0;color:#1e3a8a}.logo p{font-size:10px;margin:2px 0}.meta{text-align:right}.meta h2{margin:0;font-size:18px;color:#1e40af}.meta table{font-size:11px;margin-top:6px}.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}.box{border:1px solid #e5e7eb;padding:8px;border-radius:6px}.box h4{margin:0 0 6px;font-size:12px;color:#1e3a8a;border-bottom:1px solid #e5e7eb;padding-bottom:3px}.box p{font-size:11px;margin:3px 0}table{width:100%;border-collapse:collapse;font-size:11px;margin-top:10px}th{background:#1e3a8a;color:#fff;padding:5px 6px;text-align:left}td{border:1px solid #d1d5db;padding:5px 6px}tr.sub td{font-weight:700;background:#f8fafc}tr.grand td{font-weight:800;font-size:13px;color:#1e3a8a}.sig{margin-top:36px;display:flex;justify-content:space-between;font-size:11px}.sig div{width:45%;text-align:center}.sig span{display:block;margin-top:36px;border-top:1px solid #000;padding-top:4px}</style></head><body>
<div class="wrap"><div class="head"><div class="logo"><img src="/logo.png" onerror="this.style.display='none'"/><div><h1>Al Rehman Rice Mills</h1><p>Deepalpur Road, Babarkhai, Arzanipur</p><p>Chunian, Kasur – Pakistan</p><p><b>0301-4349041</b> | <b>0300-8402130</b></p></div></div><div class="meta"><h2>SALES INVOICE</h2><table><tr><td><b>Invoice #</b></td><td>${String(a).padStart(4,"0")}</td></tr><tr><td><b>Date</b></td><td>${s.date}</td></tr><tr><td><b>Builty #</b></td><td>${s.builtyNo||"—"}</td></tr></table></div></div>
<div class="info-grid"><div class="box"><h4>CUSTOMER</h4><p><b>Name:</b> ${s.vendorName}</p><p><b>Vehicle:</b> ${s.vehicleNo}</p><p><b>Broker:</b> ${s.brokerName||"—"}</p></div><div class="box"><h4>PRODUCT</h4><p><b>Product:</b> ${s.paddyType}</p><p><b>Rate / 40 kg:</b> Rs ${Number(s.rate40||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</p><p><b>Quantity:</b> ${Number(s.quantity||0)} bags</p></div></div>
<table><tr><th>Description</th><th style="text-align:right">Value</th></tr><tr><td>Total Weight (kg)</td><td style="text-align:right">${Number(s.weight||0).toFixed(2)}</td></tr><tr><td>Bag Weight (kg)</td><td style="text-align:right">− ${Number(s.bagWeight||0).toFixed(2)}</td></tr><tr class="sub"><td>Net Weight (kg)</td><td style="text-align:right">${Number(s.netWeight||0).toFixed(2)}</td></tr><tr><td>Net Weight (Maund)</td><td style="text-align:right">${Number(s.netWeight40||0).toFixed(6)}</td></tr><tr><td>Amount (${Number(s.netWeight40||0).toFixed(4)} Maund × Rs ${Number(s.rate40||0).toLocaleString("en-PK")})</td><td style="text-align:right">Rs ${Number(s.amount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr><tr><td>Sutli / Silai (Rs ${Number(s.sutliSilaiRate||0)} × ${Number(s.quantity||0)} bags)</td><td style="text-align:right">Rs ${Number(s.sutliSilaiAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>${s.bardanaRate?`<tr><td>Bardana (Rs ${Number(s.bardanaRate||0)} × ${Number(s.quantity||0)} bags)</td><td style="text-align:right">Rs ${Number(s.bardanaAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}<tr class="sub"><td>Total w/ Sutli${s.bardanaRate?" + Bardana":""}</td><td style="text-align:right">Rs ${Number(s.totalWithBardana||s.totalAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>${s.brokeryRate?`<tr><td>Brokery (${Number(s.netWeight40||0).toFixed(4)} Maund × Rs ${Number(s.brokeryRate||0)})</td><td style="text-align:right">− Rs ${Number(s.brokery||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr>`:""}<tr class="grand"><td>NET PAYABLE</td><td style="text-align:right">Rs ${Number(s.totalAmount2||0).toLocaleString("en-PK",{minimumFractionDigits:2})}</td></tr></table>
<div class="sig"><div><span>Customer Signature</span></div><div><span>Authorised Signatory</span></div></div>
<p style="text-align:center;margin-top:28px;font-size:12px">Thank you for your business — Al Rehman Rice Mills</p>
</div><script>window.print()<\/script></body></html>`}const A={display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},Te={display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10},c=s=>isNaN(Number(s))?0:Number(s)||0,u=(s,a=2)=>c(s).toLocaleString("en-PK",{minimumFractionDigits:a,maximumFractionDigits:a}),se=e.jsx("div",{className:"si-divider"}),f=s=>({className:`si-inp si-no-spin${s?" err":""}`,onFocus:a=>{s||(a.target.style.borderColor="#6b7280",a.target.style.boxShadow="0 0 0 2px rgba(107,114,128,.12)")},onBlur:a=>{s||(a.target.style.borderColor="#d1d5db",a.target.style.boxShadow="none")},onWheel:Pe,onKeyDown:Me}),b=(s=!1)=>({className:`si-ro${s?" hi":""}`,readOnly:!0});function Ee(){const s=new Date().toISOString().split("T")[0],[a,p]=r.useState([]),[x,y]=r.useState([]),[w,v]=r.useState(""),[N,z]=r.useState(s),[$,W]=r.useState(""),[C,B]=r.useState(""),[k,o]=r.useState(""),[Y,re]=r.useState(""),[ie,ae]=r.useState(""),[H,ne]=r.useState(""),[ke,oe]=r.useState(""),[Z,le]=r.useState(""),[J,de]=r.useState(""),[G,ce]=r.useState(""),[V,ue]=r.useState(""),[X,pe]=r.useState(""),[I,ge]=r.useState(""),[P,fe]=r.useState(""),[l,g]=r.useState({}),[be,xe]=r.useState(!1),[he,M]=r.useState({message:"",type:"info"}),[_,me]=r.useState(!1),[U,ye]=r.useState(null),ve=r.useRef(null),je=c(J),Se=c(G),m=je-Se,j=m>0?m/40:0,ee=c(Z),F=j*c(V),T=c(X)*ee,Q=F+T,L=c(I)*ee,q=Q+L,D=j*c(P),E=q-D;r.useEffect(()=>{Promise.all([O(`${K}/products`).then(t=>t.json()),O(`${K}/accounts?excludeProducts=true`).then(t=>t.json()),O(`${K}/sales-invoice/next-sr`).then(t=>t.json())]).then(([t,i,h])=>{t.success&&p(t.products.map(d=>({...d,label:d.displayName||[d.productName,d.type,d.subType].filter(Boolean).join(" - ")})));const R=Array.isArray(i)?i:i.accounts||[],S=R.filter(d=>!d.isProtected&&!d.isProductAccount&&(d.category==="Customer"||!d.category&&d.accountType==="Assets"&&d.subAccountType==="Current Assets"));y((S.length>0?S:R.filter(d=>!d.isProtected&&!d.isProductAccount)).map(d=>({...d,label:d.accountName}))),h.success&&h.nextSr&&v(String(h.nextSr))})},[]),r.useEffect(()=>{if(!U)return;const t=window.open("","_blank");t&&(t.document.write(Fe(U,U.sr)),t.document.close()),ye(null)},[U]);const Re=()=>{const t={};return N||(t.date=!0),$||(t.vehicleNo=!0),C||(t.builtyNo=!0),k||(t.vendorId=!0),H||(t.productId=!0),Z||(t.quantity=!0),J||(t.weight=!0),G||(t.bagWeight=!0),V||(t.rate40=!0),g(t),Object.keys(t).length===0},Ae=t=>{if(t.key!=="Enter")return;const i=ve.current?.querySelectorAll("input:not([readonly]):not([type=submit]),select");if(!i?.length)return;const h=[...i].indexOf(t.target);h>=0&&h<i.length-1&&(t.preventDefault(),i[h+1].focus())},$e=()=>{z(s),W(""),B(""),o(""),re(""),ae(""),ne(""),oe(""),le(""),de(""),ce(""),ue(""),pe(""),ge(""),fe(""),g({})},We=async t=>{if(t.preventDefault(),!Re()){M({message:"Please fill all required fields",type:"error"});return}xe(!0);try{const i={date:N,vehicleNo:$,builtyNo:C,vendorName:Y,vendorAccountId:k||void 0,brokerName:ie,productId:H,paddyType:ke,quantity:ee,weight:je,bagWeight:Se,netWeight:m>0?m:0,netWeight40:j>0?j:0,rate40:c(V),amount:F,sutliSilaiRate:c(X),sutliSilaiAmount:T,totalAmount:Q,bardanaRate:c(I)||void 0,bardanaAmount:L||void 0,totalWithBardana:q,brokeryRate:c(P)||void 0,brokery:D||void 0,totalAmount2:E,sr:Number(w)},R=await(await O(`${K}/sales-invoice/create`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})).json();R.success?(M({message:`Invoice #${String(R.invoice.sr).padStart(4,"0")} saved!`,type:"success"}),ye(R.invoice),$e(),O(`${K}/sales-invoice/next-sr`).then(S=>S.json()).then(S=>{S.success&&S.nextSr&&v(String(S.nextSr))})):M({message:R.message||"Failed to save.",type:"error"})}catch{M({message:"Server error.",type:"error"})}finally{xe(!1)}};r.useEffect(()=>{const t=i=>{i.key==="Escape"&&_&&me(!1)};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[_]);const we=e.jsxs(e.Fragment,{children:[e.jsxs("style",{children:[ze,Be]}),e.jsx(Ce,{message:he.message,type:he.type,onClose:()=>M({message:"",type:"info"})}),e.jsxs("div",{className:"si-wrap",style:{maxWidth:1100,margin:"0 auto"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,gap:10,flexWrap:"wrap"},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:11,color:"#9ca3af",margin:"0 0 3px"},children:"Sales"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("h1",{style:{fontSize:20,fontWeight:700,color:"#111827",letterSpacing:"-.3px",margin:0},children:"Sales Invoice"}),e.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:600,background:"#f3f4f6",color:"#374151",padding:"2px 8px",borderRadius:5,border:"1px solid #e5e7eb"},children:["#",w?String(w).padStart(4,"0"):"——"]})]})]}),e.jsx("button",{type:"button",onClick:()=>me(t=>!t),style:{fontSize:11.5,fontWeight:500,padding:"6px 12px",borderRadius:6,border:"1px solid #e5e7eb",background:"#fff",color:"#374151",cursor:"pointer"},children:_?"Exit Full Screen":"Full Screen"})]}),e.jsx("form",{ref:ve,onSubmit:We,onKeyDown:Ae,children:e.jsxs("div",{className:"inv-grid",style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:12,alignItems:"start"},children:[e.jsxs(te,{title:"Basic Information",dot:"#6366f1",children:[e.jsxs("div",{style:A,children:[e.jsx(n,{label:"Date",required:!0,error:l.date,children:e.jsx("input",{type:"date",value:N,max:s,onChange:t=>{z(t.target.value),g(i=>({...i,date:!1}))},...f(l.date)})}),e.jsx(n,{label:"Invoice #",children:e.jsx("input",{value:w?`#${String(w).padStart(4,"0")}`:"—",...b(!1)})})]}),e.jsxs("div",{style:A,children:[e.jsx(n,{label:"Broker Name",children:e.jsx("input",{value:ie,onChange:t=>ae(t.target.value),placeholder:"Optional",...f(!1)})}),e.jsx(n,{label:"Builty No.",required:!0,error:l.builtyNo,children:e.jsx("input",{value:C,onChange:t=>{B(t.target.value),g(i=>({...i,builtyNo:!1}))},placeholder:"e.g. B-001",...f(l.builtyNo)})})]}),e.jsx(n,{label:"Vehicle No.",required:!0,error:l.vehicleNo,children:e.jsx("input",{value:$,onChange:t=>{W(Ie(t.target.value)),g(i=>({...i,vehicleNo:!1}))},placeholder:"e.g. LEA-1234",...f(l.vehicleNo)})}),e.jsx(n,{label:"Customer",required:!0,error:l.vendorId,children:e.jsx(Ne,{options:x,value:k,labelKey:"label",placeholder:"Select customer…",error:l.vendorId,onChange:t=>{o(t._id),re(t.accountName),g(i=>({...i,vendorId:!1}))}})}),e.jsx(n,{label:"Product",required:!0,error:l.productId,children:e.jsx(Ne,{options:a,value:H,labelKey:"label",placeholder:"Select product…",error:l.productId,onChange:t=>{ne(t._id),oe(t.label||t.productName),g(i=>({...i,productId:!1}))}})}),e.jsxs("div",{style:Te,children:[e.jsx(n,{label:"Qty (Bags)",required:!0,error:l.quantity,children:e.jsx("input",{type:"number",min:"0",value:Z,onChange:t=>{le(t.target.value),g(i=>({...i,quantity:!1}))},placeholder:"0",...f(l.quantity)})}),e.jsx(n,{label:"Total Wt (kg)",required:!0,error:l.weight,children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:J,onChange:t=>{de(t.target.value),g(i=>({...i,weight:!1}))},placeholder:"0.00",...f(l.weight)})}),e.jsx(n,{label:"Bag Wt (kg)",required:!0,error:l.bagWeight,children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:G,onChange:t=>{ce(t.target.value),g(i=>({...i,bagWeight:!1}))},placeholder:"0.00",...f(l.bagWeight)})})]})]}),e.jsxs(te,{title:"Weight & Rates",dot:"#f59e0b",children:[e.jsxs("div",{style:A,children:[e.jsx(n,{label:"Net Weight (kg)",children:e.jsx("input",{value:m>0?u(m):"—",...b(m>0)})}),e.jsx(n,{label:"Net Weight (Maund)",children:e.jsx("input",{value:j>0?j.toString():"—",...b(!1)})})]}),e.jsx(n,{label:"Net Weight (Ton)",children:e.jsx("input",{value:m>0?(m/1e3).toString():"—",...b(!1)})}),se,e.jsx(n,{label:"Rate / 40 kg (Rs.)",required:!0,error:l.rate40,children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:V,onChange:t=>{ue(t.target.value),g(i=>({...i,rate40:!1}))},placeholder:"0.00",...f(l.rate40)})}),e.jsxs("div",{style:A,children:[e.jsx(n,{label:"Amount (Rs.)",children:e.jsx("input",{value:F>0?u(F):"—",...b(!1)})}),e.jsx(n,{label:"Sutli Rate (Rs./bag)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:X,onChange:t=>pe(t.target.value),placeholder:"0.00",...f(!1)})})]}),e.jsxs("div",{style:A,children:[e.jsx(n,{label:"Sutli Amount (Rs.)",children:e.jsx("input",{value:T>0?u(T):"—",...b(!1)})}),e.jsx(n,{label:"Total w/ Sutli (Rs.)",children:e.jsx("input",{value:Q>0?u(Q):"—",...b(!1)})})]}),se,e.jsxs("div",{style:A,children:[e.jsx(n,{label:"Bardana Rate (Rs./bag)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:I,onChange:t=>ge(t.target.value),placeholder:"Optional",...f(!1)})}),e.jsx(n,{label:"Bardana Amount (Rs.)",children:e.jsx("input",{value:L>0?u(L):"—",...b(!1)})})]}),c(I)>0&&e.jsx(n,{label:"Total w/ Bardana (Rs.)",children:e.jsx("input",{value:q>0?u(q):"—",...b(!1)})})]}),e.jsxs(te,{title:"Brokery & Summary",dot:"#10b981",children:[e.jsx(n,{label:"Brokery Rate (Rs./Maund)",children:e.jsx("input",{type:"number",min:"0",step:"0.01",value:P,onChange:t=>fe(t.target.value),placeholder:"e.g. 2.50",...f(!1)})}),c(P)>0&&e.jsxs("div",{style:{fontSize:11.5,color:"#6b7280",lineHeight:1.6},children:[j>0?j.toFixed(4):"0"," Maund × Rs ",c(P)," ="," ",e.jsxs("strong",{style:{color:"#374151"},children:["Rs ",u(D)]})]}),e.jsxs("div",{style:A,children:[e.jsx(n,{label:"Brokery Amount (Rs.)",children:e.jsx("input",{value:D>0?u(D):"—",...b(!1)})}),e.jsx(n,{label:"Net After Brokery",children:e.jsx("input",{value:E!==0?u(E):"—",...b(E>0)})})]}),se,e.jsx("div",{className:"si-summary-box",children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:7},children:[[["Amount",u(F),"#374151"],["+ Sutli",u(T),"#374151"],...c(I)>0?[["+ Bardana",u(L),"#374151"]]:[],["Subtotal",u(q),"#111827"],["− Brokery",u(D),"#dc2626"]].map(([t,i,h])=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:10,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".06em"},children:t}),e.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:12.5,color:h,fontWeight:t==="Subtotal"?600:400},children:["Rs ",i]})]},t)),e.jsx("div",{style:{height:1,background:"#e5e7eb",margin:"2px 0"}}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:".06em"},children:"Net Payable"}),e.jsxs("span",{style:{fontFamily:"'DM Mono',monospace",fontSize:18,fontWeight:700,color:"#111827"},children:["Rs ",u(E)]})]})]})}),e.jsx("button",{type:"submit",disabled:be,className:"si-submit",children:be?"Saving…":e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})}),"Save & Print Invoice"]})})]})]})})]})]});return _?e.jsx("div",{style:{position:"fixed",inset:0,zIndex:50,background:"#f9fafb",overflowY:"auto",padding:20},children:we}):e.jsx(De,{children:we})}export{Ee as default};
