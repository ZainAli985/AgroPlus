import{a as v,A as j,j as e,N as O,S as R}from"./index-YpCB_77g.js";import{b as r}from"./react-BBT0yyZ1.js";const q="@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');",T=`
  .pi-wrap *, .pi-wrap *::before, .pi-wrap *::after { box-sizing: border-box; }
  .pi-wrap {
    font-family: 'Barlow', sans-serif;
    color: #1a1a2e;
    max-width: 1100px;
    margin: 0 auto;
    padding: 16px;
  }

  /* ── Header ── */
  .pi-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 14px;
  }
  .pi-header-left { display: flex; align-items: baseline; gap: 10px; }
  .pi-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 22px; font-weight: 800; letter-spacing: -.3px;
    color: #0f172a; line-height: 1;
  }
  .pi-invoice-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; font-weight: 500;
    background: #0f172a; color: #34d399;
    padding: 3px 9px; border-radius: 4px; letter-spacing: .03em;
  }
  .pi-fullscreen-btn {
    font-size: 11px; font-weight: 700; font-family: 'Barlow', sans-serif;
    padding: 5px 12px; border-radius: 6px;
    border: 1.5px solid #e2e8f0; background: #fff;
    color: #64748b; cursor: pointer; transition: all .15s;
    text-transform: uppercase; letter-spacing: .05em;
  }
  .pi-fullscreen-btn:hover { border-color: #94a3b8; color: #1e293b; }

  /* ── Grid layout ── */
  .pi-grid {
    display: grid;
    grid-template-columns: 1.05fr 1fr 0.95fr;
    gap: 10px;
    align-items: start;
  }

  /* ── Panel (card) ── */
  .pi-panel {
    background: #fff;
    border: 1.5px solid #e8eaf0;
    border-radius: 10px;
    overflow: hidden;
  }
  .pi-panel-head {
    display: flex; align-items: center; gap: 7px;
    padding: 8px 12px;
    background: #f8fafc;
    border-bottom: 1.5px solid #e8eaf0;
  }
  .pi-panel-dot {
    width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
  }
  .pi-panel-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .1em;
    color: #64748b;
  }
  .pi-panel-body { padding: 10px 12px; display: flex; flex-direction: column; gap: 8px; }

  /* ── Field ── */
  .pi-field { display: flex; flex-direction: column; gap: 3px; }
  .pi-field-row { display: grid; gap: 8px; }
  .pi-field-row.col2 { grid-template-columns: 1fr 1fr; }
  .pi-field-row.col3 { grid-template-columns: 1fr 1fr 1fr; }

  .pi-label {
    font-size: 10px; font-weight: 700; letter-spacing: .07em;
    text-transform: uppercase; color: #94a3b8;
  }
  .pi-input, .pi-select {
    width: 100%; padding: 7px 9px;
    border: 1.5px solid #e2e8f0; border-radius: 7px;
    font-size: 13px; font-family: 'Barlow', sans-serif;
    color: #1e293b; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s;
    appearance: none;
  }
  .pi-input::placeholder { color: #c4cad4; }
  .pi-input:focus, .pi-select:focus {
    border-color: #3b82f6; box-shadow: 0 0 0 2.5px rgba(59,130,246,.14);
  }
  .pi-input.ro {
    background: #f8fafc; color: #475569;
    border-color: #edf0f5; cursor: default;
    font-family: 'JetBrains Mono', monospace; font-size: 12px;
  }

  /* highlight computed amount */
  .pi-input.highlight {
    background: #f0fdf4; color: #16a34a; border-color: #bbf7d0;
    font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 500;
  }

  /* ── Select wrapper ── */
  .pi-select-wrap { position: relative; }
  .pi-select-wrap::after {
    content: ''; position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
    pointer-events: none;
    border-left: 4px solid transparent; border-right: 4px solid transparent;
    border-top: 5px solid #94a3b8;
  }

  /* ── Submit row ── */
  .pi-actions {
    display: flex; align-items: center; justify-content: flex-end;
    gap: 10px; margin-top: 4px;
  }
  .pi-submit {
    padding: 9px 22px; border-radius: 8px; border: none; cursor: pointer;
    background: #0f172a; color: #fff;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px; font-weight: 700; letter-spacing: .05em;
    text-transform: uppercase;
    display: flex; align-items: center; gap: 8px;
    transition: background .15s, box-shadow .15s, transform .1s;
    box-shadow: 0 3px 10px rgba(15,23,42,.2);
  }
  .pi-submit:hover { background: #1e293b; box-shadow: 0 5px 16px rgba(15,23,42,.28); }
  .pi-submit:active { transform: scale(.99); }
  .pi-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }
  @keyframes pi-spin { to { transform: rotate(360deg); } }
  .pi-spin { animation: pi-spin .8s linear infinite; display: inline-block; }

  /* ── Divider ── */
  .pi-divider {
    height: 1px; background: #f1f5f9; margin: 2px 0;
  }

  /* fullscreen host */
  .pi-fullscreen {
    position: fixed; inset: 0; z-index: 50;
    background: #f1f5f9; overflow-y: auto; padding: 20px;
  }
`;function i({label:u,name:m,value:t,onChange:l,readOnly:c,type:x="text",placeholder:b,max:f,highlight:d}){return e.jsxs("div",{className:"pi-field",children:[e.jsx("label",{className:"pi-label",children:u}),e.jsx("input",{type:x,name:m,value:t??"",onChange:l,readOnly:c,max:f,placeholder:b,className:`pi-input${c?" ro":""}${d?" highlight":""}`})]})}const G=()=>{const u=new Date().toISOString().split("T")[0],m={date:u,vehicleNumber:"",builtyNumber:"",vendorName:"",productId:"",paddyType:"",quantity:"",bagWeight:"",subtractWeight:"",finalWeight:"",moisturePercent:"",moistureAdjCal:"",netWeight:"",netWeight40KG:"",rate40kg:"",amountCal:"",amount:"",rentAdjustment:""},[t,l]=r.useState(m),[c,x]=r.useState([]),[b,f]=r.useState(""),[d,I]=r.useState(""),[h,N]=r.useState(!1),[w,k]=r.useState(!1),[S,p]=r.useState({message:"",type:"info"}),C=r.useRef(null);localStorage.getItem("token");const E=a=>{if(a.key!=="Enter")return;const s=C.current?.querySelectorAll("input:not([type=submit]):not([readonly]), select");if(!s?.length)return;const n=[...s].indexOf(a.target);n>=0&&n<s.length-1&&(a.preventDefault(),s[n+1].focus())};r.useEffect(()=>{v(`${j}/products`).then(a=>a.json()).then(a=>{a.success&&x(a.products)}).catch(console.error)},[]);const W=()=>v(`${j}/purchase-invoice/next-sr`).then(a=>a.json()).then(a=>{a.success&&a.nextSr!=null&&I(String(a.nextSr))}).catch(console.error);r.useEffect(()=>{W()},[]),r.useEffect(()=>{const a=Number(t.quantity)||0,s=Number(t.bagWeight)||0,n=Number(t.moisturePercent)||0,y=Number(t.rate40kg)||0,g=a*s,A=g*n/100,F=g-A,P=F/40,z=P*y;l(L=>({...L,subtractWeight:g.toFixed(2),finalWeight:g.toFixed(2),moistureAdjCal:A.toFixed(2),netWeight:F.toFixed(2),netWeight40KG:P.toFixed(2),amountCal:z.toFixed(2),amount:z.toFixed(2)}))},[t.quantity,t.bagWeight,t.moisturePercent,t.rate40kg]);const o=a=>{const{name:s,value:n}=a.target;l(y=>({...y,[s]:n}))},M=async a=>{if(a.preventDefault(),!t.productId||!t.date||!t.vehicleNumber||!t.vendorName||!t.builtyNumber)return p({message:"Please fill all required fields",type:"error"});k(!0);try{const n=await(await v(`${j}/purchase-invoice/create`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...t,sr:Number(d)})})).json();n.success?(p({message:"Purchase invoice saved!",type:"success"}),l(m),f(""),await W()):p({message:n.message||"Failed to save invoice",type:"error"})}catch{p({message:"Server error — please try again",type:"error"})}finally{k(!1)}};r.useEffect(()=>{const a=s=>{s.key==="Escape"&&h&&N(!1)};return window.addEventListener("keydown",a),()=>window.removeEventListener("keydown",a)},[h]);const B=e.jsxs(e.Fragment,{children:[e.jsxs("style",{children:[q,T]}),e.jsx(O,{message:S.message,type:S.type,onClose:()=>p({message:"",type:"info"})}),e.jsxs("div",{className:"pi-wrap",children:[e.jsxs("div",{className:"pi-header",children:[e.jsxs("div",{className:"pi-header-left",children:[e.jsx("h1",{className:"pi-title",children:"Purchase Invoice"}),e.jsxs("span",{className:"pi-invoice-tag",children:["#",d?String(d).padStart(4,"0"):"----"]})]}),e.jsx("button",{className:"pi-fullscreen-btn",type:"button",onClick:()=>N(a=>!a),children:h?"⊠ Exit":"⊞ Full Screen"})]}),e.jsx("form",{ref:C,onSubmit:M,onKeyDown:E,children:e.jsxs("div",{className:"pi-grid",children:[e.jsxs("div",{className:"pi-panel",children:[e.jsxs("div",{className:"pi-panel-head",children:[e.jsx("div",{className:"pi-panel-dot",style:{background:"#3b82f6"}}),e.jsx("span",{className:"pi-panel-label",children:"Basic Information"})]}),e.jsxs("div",{className:"pi-panel-body",children:[e.jsxs("div",{className:"pi-field-row col2",children:[e.jsx(i,{label:"Date",name:"date",type:"date",value:t.date,onChange:o,max:u}),e.jsx(i,{label:"Invoice #",name:"sr",value:d||"…",readOnly:!0})]}),e.jsxs("div",{className:"pi-field-row col2",children:[e.jsx(i,{label:"Vehicle No.",name:"vehicleNumber",value:t.vehicleNumber,onChange:o,placeholder:"e.g. LEA-1234"}),e.jsx(i,{label:"Builty No.",name:"builtyNumber",value:t.builtyNumber,onChange:o,placeholder:"e.g. B-001"})]}),e.jsx(i,{label:"Vendor Name",name:"vendorName",value:t.vendorName,onChange:o,placeholder:"Supplier / Party name"}),e.jsxs("div",{className:"pi-field",children:[e.jsx("label",{className:"pi-label",children:"Product"}),e.jsx("div",{className:"pi-select-wrap",children:e.jsxs("select",{value:b,className:"pi-select",required:!0,onChange:a=>{const s=c.find(n=>n._id===a.target.value);f(a.target.value),l(n=>({...n,paddyType:s?.productName||"",productId:s?._id||""}))},children:[e.jsx("option",{value:"",children:"Select product…"}),c.map(a=>e.jsx("option",{value:a._id,children:a.productName},a._id))]})})]}),e.jsxs("div",{className:"pi-field-row col2",children:[e.jsx(i,{label:"Bag Qty",name:"quantity",type:"number",value:t.quantity,onChange:o,placeholder:"0"}),e.jsx(i,{label:"Bag Weight (kg)",name:"bagWeight",type:"number",value:t.bagWeight,onChange:o,placeholder:"0"})]})]})]}),e.jsxs("div",{className:"pi-panel",children:[e.jsxs("div",{className:"pi-panel-head",children:[e.jsx("div",{className:"pi-panel-dot",style:{background:"#f59e0b"}}),e.jsx("span",{className:"pi-panel-label",children:"Weight & Moisture"})]}),e.jsxs("div",{className:"pi-panel-body",children:[e.jsxs("div",{className:"pi-field-row col2",children:[e.jsx(i,{label:"Total Bag Wt (kg)",name:"subtractWeight",value:t.subtractWeight,readOnly:!0}),e.jsx(i,{label:"Gross Weight (kg)",name:"finalWeight",value:t.finalWeight,readOnly:!0})]}),e.jsx("div",{className:"pi-divider"}),e.jsx(i,{label:"Moisture %",name:"moisturePercent",type:"number",value:t.moisturePercent,onChange:o,placeholder:"e.g. 2.5"}),e.jsxs("div",{className:"pi-field-row col2",children:[e.jsx(i,{label:"Moisture Adj (kg)",name:"moistureAdjCal",value:t.moistureAdjCal,readOnly:!0}),e.jsx(i,{label:"Net Weight (kg)",name:"netWeight",value:t.netWeight,readOnly:!0})]}),e.jsx("div",{className:"pi-divider"}),e.jsx(i,{label:"Net Weight (Maund / 40 kg)",name:"netWeight40KG",value:t.netWeight40KG,readOnly:!0})]})]}),e.jsxs("div",{className:"pi-panel",children:[e.jsxs("div",{className:"pi-panel-head",children:[e.jsx("div",{className:"pi-panel-dot",style:{background:"#10b981"}}),e.jsx("span",{className:"pi-panel-label",children:"Pricing & Summary"})]}),e.jsxs("div",{className:"pi-panel-body",children:[e.jsx(i,{label:"Rate / 40 kg (Rs.)",name:"rate40kg",type:"number",value:t.rate40kg,onChange:o,placeholder:"0"}),e.jsx("div",{className:"pi-divider"}),e.jsx(i,{label:"Calculated Amount (Rs.)",name:"amountCal",value:t.amountCal,readOnly:!0}),e.jsx(i,{label:"Final Amount (Rs.)",name:"amount",value:t.amount,readOnly:!0,highlight:!0}),e.jsx("div",{className:"pi-divider"}),e.jsx(i,{label:"Rent Adjustment (Rs.)",name:"rentAdjustment",type:"number",value:t.rentAdjustment,onChange:o,placeholder:"0"}),e.jsx("div",{style:{marginTop:4,padding:"9px 11px",borderRadius:8,background:"#f0fdf4",border:"1.5px solid #bbf7d0"},children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:".06em"},children:"Net Payable"}),e.jsxs("span",{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:16,fontWeight:700,color:"#16a34a"},children:["Rs. ",((Number(t.amount)||0)-(Number(t.rentAdjustment)||0)).toLocaleString("en-PK",{minimumFractionDigits:2})]})]})}),e.jsx("div",{className:"pi-actions",children:e.jsx("button",{type:"submit",className:"pi-submit",disabled:w,style:{width:"100%",justifyContent:"center"},children:w?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"pi-spin",children:e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})}),"Saving…"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{width:13,height:13,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})}),"Save Invoice"]})})})]})]})]})})]})]});return h?e.jsx("div",{className:"pi-fullscreen",children:B}):e.jsx(R,{children:B})};export{G as default};
