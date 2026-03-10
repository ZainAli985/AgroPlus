import{a as z,A as L,j as e,N as q,S as J}from"./index-DXV00GXI.js";import{b as l}from"./react-CVH9iSHU.js";const _="@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');",K=`
  .si-wrap *, .si-wrap *::before, .si-wrap *::after { box-sizing: border-box; }
  .si-wrap {
    font-family: 'Barlow', sans-serif;
    color: #1a1a2e;
    max-width: 1100px;
    margin: 0 auto;
    padding: 16px;
  }

  /* ── Header ── */
  .si-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 14px;
  }
  .si-header-left { display: flex; align-items: baseline; gap: 10px; }
  .si-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 22px; font-weight: 800; letter-spacing: -.3px;
    color: #0f172a; line-height: 1;
  }
  .si-invoice-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; font-weight: 500;
    background: #0f172a; color: #818cf8;
    padding: 3px 9px; border-radius: 4px; letter-spacing: .03em;
  }
  .si-fullscreen-btn {
    font-size: 11px; font-weight: 700; font-family: 'Barlow', sans-serif;
    padding: 5px 12px; border-radius: 6px;
    border: 1.5px solid #e2e8f0; background: #fff;
    color: #64748b; cursor: pointer; transition: all .15s;
    text-transform: uppercase; letter-spacing: .05em;
  }
  .si-fullscreen-btn:hover { border-color: #94a3b8; color: #1e293b; }

  /* ── Grid layout ── */
  .si-grid {
    display: grid;
    grid-template-columns: 1.05fr 1fr 0.95fr;
    gap: 10px;
    align-items: start;
  }

  /* ── Panel ── */
  .si-panel {
    background: #fff;
    border: 1.5px solid #e8eaf0;
    border-radius: 10px;
    overflow: hidden;
  }
  .si-panel-head {
    display: flex; align-items: center; gap: 7px;
    padding: 8px 12px;
    background: #f8fafc;
    border-bottom: 1.5px solid #e8eaf0;
  }
  .si-panel-dot {
    width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
  }
  .si-panel-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .1em;
    color: #64748b;
  }
  .si-panel-body { padding: 10px 12px; display: flex; flex-direction: column; gap: 8px; }

  /* ── Fields ── */
  .si-field { display: flex; flex-direction: column; gap: 3px; }
  .si-field-row { display: grid; gap: 8px; }
  .si-field-row.col2 { grid-template-columns: 1fr 1fr; }
  .si-field-row.col3 { grid-template-columns: 1fr 1fr 1fr; }

  .si-label {
    font-size: 10px; font-weight: 700; letter-spacing: .07em;
    text-transform: uppercase; color: #94a3b8;
  }
  .si-input, .si-select {
    width: 100%; padding: 7px 9px;
    border: 1.5px solid #e2e8f0; border-radius: 7px;
    font-size: 13px; font-family: 'Barlow', sans-serif;
    color: #1e293b; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s;
    appearance: none;
  }
  .si-input::placeholder { color: #c4cad4; }
  .si-input:focus, .si-select:focus {
    border-color: #6366f1; box-shadow: 0 0 0 2.5px rgba(99,102,241,.14);
  }
  .si-input.ro {
    background: #f8fafc; color: #475569;
    border-color: #edf0f5; cursor: default;
    font-family: 'JetBrains Mono', monospace; font-size: 12px;
  }
  .si-input.highlight {
    background: #faf5ff; color: #7c3aed; border-color: #ddd6fe;
    font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 500;
  }

  /* ── Select wrapper ── */
  .si-select-wrap { position: relative; }
  .si-select-wrap::after {
    content: ''; position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
    pointer-events: none;
    border-left: 4px solid transparent; border-right: 4px solid transparent;
    border-top: 5px solid #94a3b8;
  }

  /* ── Divider ── */
  .si-divider { height: 1px; background: #f1f5f9; margin: 2px 0; }

  /* ── Submit ── */
  .si-submit {
    width: 100%; padding: 9px 22px; border-radius: 8px; border: none; cursor: pointer;
    background: #4f46e5; color: #fff;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px; font-weight: 700; letter-spacing: .05em;
    text-transform: uppercase;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background .15s, box-shadow .15s, transform .1s;
    box-shadow: 0 3px 10px rgba(79,70,229,.25);
  }
  .si-submit:hover { background: #4338ca; box-shadow: 0 5px 16px rgba(79,70,229,.35); }
  .si-submit:active { transform: scale(.99); }
  .si-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }
  @keyframes si-spin { to { transform: rotate(360deg); } }
  .si-spin { animation: si-spin .8s linear infinite; display: inline-block; }

  /* fullscreen */
  .si-fullscreen {
    position: fixed; inset: 0; z-index: 50;
    background: #f1f5f9; overflow-y: auto; padding: 20px;
  }
`;function a({label:m,name:f,value:s,onChange:r,readOnly:c,type:b="text",placeholder:y,max:x,highlight:d}){return e.jsxs("div",{className:"si-field",children:[e.jsx("label",{className:"si-label",children:m}),e.jsx("input",{type:b,name:f,value:s??"",onChange:r,readOnly:c,max:x,placeholder:y,className:`si-input${c?" ro":""}${d?" highlight":""}`})]})}const G=()=>{const m=new Date().toISOString().split("T")[0],f={date:m,vehicleNo:"",builtyNo:"",vendorName:"",brokerName:"",productId:"",paddyType:"",quantity:"",weight:"",bagWeight:"",netWeight:"",netWeight40:"",rate40:"",amount:"",sutliSilaiRate:"",sutliSilaiAmount:"",totalAmount:"",brokeryRate:"",brokery:"",totalAmount2:""},[s,r]=l.useState(f),[c,b]=l.useState([]),[y,x]=l.useState(""),[d,w]=l.useState(!1),[k,S]=l.useState(!1),[F,p]=l.useState({message:"",type:"info"}),B=l.useRef(null),P=t=>{if(t.key!=="Enter")return;const i=B.current?.querySelectorAll("input:not([type=submit]):not([readonly]), select");if(!i?.length)return;const n=[...i].indexOf(t.target);n>=0&&n<i.length-1&&(t.preventDefault(),i[n+1].focus())};l.useEffect(()=>{z(`${L}/products`).then(t=>t.json()).then(t=>{t.success&&b(t.products)}).catch(console.error)},[]),l.useEffect(()=>{const t=Number(s.quantity)||0,i=Number(s.weight)||0,n=Number(s.bagWeight)||0,v=Number(s.rate40)||0,M=Number(s.sutliSilaiRate)||0,C=Number(s.brokeryRate)||0,g=i-n*t,j=g>0?(g/40).toFixed(2):"",N=j?(j*v).toFixed(2):"",W=t>0?(M*t).toFixed(2):"",u=N?(parseFloat(N)+parseFloat(W||0)).toFixed(2):"",R=u&&C?(parseFloat(u)*C/100).toFixed(2):"",T=u?(parseFloat(u)-parseFloat(R||0)).toFixed(2):"";r(I=>({...I,netWeight:g>0?g.toFixed(2):"",netWeight40:j,amount:N,sutliSilaiAmount:W,totalAmount:u,brokery:R,totalAmount2:T}))},[s.weight,s.bagWeight,s.quantity,s.rate40,s.sutliSilaiRate,s.brokeryRate]);const o=t=>{const{name:i,value:n}=t.target;r(v=>({...v,[i]:n}))},E=async t=>{if(t.preventDefault(),!s.productId||!s.date||!s.vehicleNo||!s.vendorName||!s.builtyNo)return p({message:"Please fill all required fields",type:"error"});S(!0);try{const n=await(await z(`${L}/sales-invoice/create`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})).json();n.success?(p({message:"Sales invoice saved!",type:"success"}),r(f),x("")):p({message:n.message||"Failed to save invoice",type:"error"})}catch{p({message:"Server error — please try again",type:"error"})}finally{S(!1)}};l.useEffect(()=>{const t=i=>{i.key==="Escape"&&d&&w(!1)};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[d]);const h=Number(s.netWeight)||0,O=h>0?(h/40).toFixed(2):"—",D=h>0?(h/1e3).toFixed(3):"—",A=e.jsxs(e.Fragment,{children:[e.jsxs("style",{children:[_,K]}),e.jsx(q,{message:F.message,type:F.type,onClose:()=>p({message:"",type:"info"})}),e.jsxs("div",{className:"si-wrap",children:[e.jsxs("div",{className:"si-header",children:[e.jsxs("div",{className:"si-header-left",children:[e.jsx("h1",{className:"si-title",children:"Sales Invoice"}),e.jsx("span",{className:"si-invoice-tag",children:"SALES"})]}),e.jsx("button",{className:"si-fullscreen-btn",type:"button",onClick:()=>w(t=>!t),children:d?"⊠ Exit":"⊞ Full Screen"})]}),e.jsx("form",{ref:B,onSubmit:E,onKeyDown:P,children:e.jsxs("div",{className:"si-grid",children:[e.jsxs("div",{className:"si-panel",children:[e.jsxs("div",{className:"si-panel-head",children:[e.jsx("div",{className:"si-panel-dot",style:{background:"#6366f1"}}),e.jsx("span",{className:"si-panel-label",children:"Basic Information"})]}),e.jsxs("div",{className:"si-panel-body",children:[e.jsxs("div",{className:"si-field-row col2",children:[e.jsx(a,{label:"Date",name:"date",type:"date",value:s.date,onChange:o,max:m}),e.jsx(a,{label:"Vehicle No.",name:"vehicleNo",value:s.vehicleNo,onChange:o,placeholder:"e.g. LEA-1234"})]}),e.jsxs("div",{className:"si-field-row col2",children:[e.jsx(a,{label:"Builty No.",name:"builtyNo",value:s.builtyNo,onChange:o,placeholder:"e.g. B-001"}),e.jsx(a,{label:"Vendor Name",name:"vendorName",value:s.vendorName,onChange:o,placeholder:"Party name"})]}),e.jsx(a,{label:"Broker Name",name:"brokerName",value:s.brokerName,onChange:o,placeholder:"Optional"}),e.jsxs("div",{className:"si-field",children:[e.jsx("label",{className:"si-label",children:"Product"}),e.jsx("div",{className:"si-select-wrap",children:e.jsxs("select",{value:y,className:"si-select",required:!0,onChange:t=>{const i=c.find(n=>n._id===t.target.value);x(t.target.value),r(n=>({...n,paddyType:i?.productName||"",productId:i?._id||""}))},children:[e.jsx("option",{value:"",children:"Select product…"}),c.map(t=>e.jsx("option",{value:t._id,children:t.productName},t._id))]})})]}),e.jsxs("div",{className:"si-field-row col3",children:[e.jsx(a,{label:"Quantity (Bags)",name:"quantity",type:"number",value:s.quantity,onChange:o,placeholder:"0"}),e.jsx(a,{label:"Total Wt (kg)",name:"weight",type:"number",value:s.weight,onChange:o,placeholder:"0"}),e.jsx(a,{label:"Bag Wt (kg)",name:"bagWeight",type:"number",value:s.bagWeight,onChange:o,placeholder:"0"})]})]})]}),e.jsxs("div",{className:"si-panel",children:[e.jsxs("div",{className:"si-panel-head",children:[e.jsx("div",{className:"si-panel-dot",style:{background:"#f59e0b"}}),e.jsx("span",{className:"si-panel-label",children:"Weight & Rates"})]}),e.jsxs("div",{className:"si-panel-body",children:[e.jsxs("div",{className:"si-field-row col2",children:[e.jsx(a,{label:"Net Weight (kg)",name:"netWeight",value:s.netWeight||"—",readOnly:!0}),e.jsx(a,{label:"Net (Maund)",name:"_maund",value:O,readOnly:!0})]}),e.jsx(a,{label:"Net Weight (Ton)",name:"_ton",value:D,readOnly:!0}),e.jsx("div",{className:"si-divider"}),e.jsx(a,{label:"Rate / 40 kg (Rs.)",name:"rate40",type:"number",value:s.rate40,onChange:o,placeholder:"0"}),e.jsxs("div",{className:"si-field-row col2",children:[e.jsx(a,{label:"Amount (Rs.)",name:"amount",value:s.amount||"—",readOnly:!0}),e.jsx(a,{label:"Sutli Rate (Rs.)",name:"sutliSilaiRate",type:"number",value:s.sutliSilaiRate,onChange:o,placeholder:"0"})]}),e.jsxs("div",{className:"si-field-row col2",children:[e.jsx(a,{label:"Sutli Amount",name:"sutliSilaiAmount",value:s.sutliSilaiAmount||"—",readOnly:!0}),e.jsx(a,{label:"Total w/ Sutli",name:"totalAmount",value:s.totalAmount||"—",readOnly:!0})]})]})]}),e.jsxs("div",{className:"si-panel",children:[e.jsxs("div",{className:"si-panel-head",children:[e.jsx("div",{className:"si-panel-dot",style:{background:"#10b981"}}),e.jsx("span",{className:"si-panel-label",children:"Brokery & Summary"})]}),e.jsxs("div",{className:"si-panel-body",children:[e.jsx(a,{label:"Brokery %",name:"brokeryRate",type:"number",value:s.brokeryRate,onChange:o,placeholder:"e.g. 1.5"}),e.jsxs("div",{className:"si-field-row col2",children:[e.jsx(a,{label:"Brokery Amt (Rs.)",name:"brokery",value:s.brokery||"—",readOnly:!0}),e.jsx(a,{label:"Net after Brokery",name:"totalAmount2",value:s.totalAmount2||"—",readOnly:!0,highlight:!0})]}),e.jsx("div",{className:"si-divider"}),e.jsx("div",{style:{padding:"9px 11px",borderRadius:8,background:"#f5f3ff",border:"1.5px solid #ddd6fe"},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("span",{style:{fontSize:10,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".06em"},children:"Gross Amount"}),e.jsxs("span",{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:"#475569"},children:["Rs. ",Number(s.totalAmount||0).toLocaleString("en-PK",{minimumFractionDigits:2})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("span",{style:{fontSize:10,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".06em"},children:"Brokery Deduct"}),e.jsxs("span",{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:"#ef4444"},children:["− Rs. ",Number(s.brokery||0).toLocaleString("en-PK",{minimumFractionDigits:2})]})]}),e.jsx("div",{style:{height:1,background:"#ddd6fe"}}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#6d28d9",textTransform:"uppercase",letterSpacing:".06em"},children:"Net Payable"}),e.jsxs("span",{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:16,fontWeight:700,color:"#6d28d9"},children:["Rs. ",Number(s.totalAmount2||0).toLocaleString("en-PK",{minimumFractionDigits:2})]})]})]})}),e.jsx("button",{type:"submit",className:"si-submit",disabled:k,children:k?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"si-spin",children:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})}),"Saving…"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})}),"Save Invoice"]})})]})]})]})})]})]});return d?e.jsx("div",{className:"si-fullscreen",children:A}):e.jsx(J,{children:A})};export{G as default};
