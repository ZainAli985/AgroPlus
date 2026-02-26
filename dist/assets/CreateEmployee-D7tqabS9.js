import{j as s,S as E,N as D,A as $}from"./index-BhzCxMFg.js";import{b as c}from"./react-CVH9iSHU.js";/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=(...e)=>e.filter((t,l,n)=>!!t&&t.trim()!==""&&n.indexOf(t)===l).join(" ").trim();/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,l,n)=>n?n.toUpperCase():l.toLowerCase());/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=e=>{const t=P(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var q={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=c.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:l=2,absoluteStrokeWidth:n,className:g="",children:d,iconNode:b,...m},w)=>c.createElement("svg",{ref:w,...q,width:t,height:t,stroke:e,strokeWidth:n?Number(l)*24/Number(t):l,className:j("lucide",g),...!d&&!M(m)&&{"aria-hidden":"true"},...m},[...b.map(([x,f])=>c.createElement(x,f)),...Array.isArray(d)?d:[d]]));/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=(e,t)=>{const l=c.forwardRef(({className:n,...g},d)=>c.createElement(U,{ref:d,iconNode:t,className:j(`lucide-${L(N(e))}`,`lucide-${e}`,n),...g}));return l.displayName=N(e),l};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],I=v("eye-off",_);/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],T=v("eye",O);function F(){const[e,t]=c.useState({firstName:"",lastName:"",cnic:"",address:"",mobile:"+92",email:"",role:"",username:"",password:"",allowedRoutes:[]}),[l,n]=c.useState([]),[g,d]=c.useState([]),[b,m]=c.useState(""),[w,x]=c.useState(""),[f,y]=c.useState(!1),C=["/dashboard","/create-account","/view-accounts","/ledger","/general-entries","/products","/products/new","/add-invoice-purchase","/view-purchase-invoices","/add-invoice-sales","/view-sales-invoices","/stock-management","/trialbalance","/balancesheet","/incomestatement"],u=r=>{const{name:o,value:p}=r.target;if(o==="cnic"){const a=p.replace(/\D/g,"").slice(0,13);let h=a;a.length>5&&a.length<=12&&(h=`${a.slice(0,5)}-${a.slice(5)}`),a.length>12&&(h=`${a.slice(0,5)}-${a.slice(5,12)}-${a.slice(12)}`),t({...e,cnic:h});return}if(o==="mobile"){let a=p.replace(/\D/g,"");a.startsWith("92")&&(a=a.slice(2)),a.length>10&&(a=a.slice(0,10)),t({...e,mobile:`+92${a}`});return}t({...e,[o]:p})},k=r=>{const o=e.allowedRoutes.includes(r)?e.allowedRoutes.filter(p=>p!==r):[...e.allowedRoutes,r];t({...e,allowedRoutes:o})},R=r=>{const o=Array.from(r.target.files);n(o);const p=o.map(a=>URL.createObjectURL(a));d(p)},S=async r=>{if(r.preventDefault(),e.cnic.replace(/\D/g,"").length!==13){m("CNIC must be exactly 13 digits"),x("error");return}if(e.mobile.replace(/\D/g,"").slice(2).length!==10){m("Mobile number must be 10 digits after +92"),x("error");return}const a=localStorage.getItem("token"),h=new FormData;Object.keys(e).forEach(i=>{i==="allowedRoutes"?h.append(i,JSON.stringify(e[i])):h.append(i,e[i])}),l.forEach(i=>h.append("documents",i));try{const i=await fetch(`${$}/employees`,{method:"POST",headers:{Authorization:`Bearer ${a}`},body:h}),A=await i.json();i.ok?(m("Employee Created Successfully"),x("success"),t({firstName:"",lastName:"",cnic:"",address:"",mobile:"+92",email:"",role:"",username:"",password:"",allowedRoutes:[]}),n([]),d([])):(m(A.message),x("error"))}catch{m("Server Error"),x("error")}setTimeout(()=>m(""),3e3)};return s.jsxs(E,{children:[s.jsxs("div",{className:"max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl",children:[s.jsx("h2",{className:"text-3xl font-bold mb-6 text-gray-800",children:"Create New Employee"}),s.jsxs("form",{onSubmit:S,className:"space-y-6",children:[s.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[s.jsx("input",{name:"firstName",value:e.firstName,onChange:u,placeholder:"First Name",className:"input",required:!0}),s.jsx("input",{name:"lastName",value:e.lastName,onChange:u,placeholder:"Last Name",className:"input",required:!0}),s.jsx("input",{name:"cnic",value:e.cnic,onChange:u,placeholder:"CNIC (xxxxx-xxxxxxx-x)",className:"input",required:!0}),s.jsx("input",{name:"mobile",value:e.mobile,onChange:u,placeholder:"Mobile (+92xxxxxxxxxx)",className:"input",required:!0}),s.jsx("input",{name:"email",value:e.email,onChange:u,placeholder:"Email",className:"input",required:!0}),s.jsx("input",{name:"address",value:e.address,onChange:u,placeholder:"Address",className:"input"})]}),s.jsxs("div",{children:[s.jsx("label",{className:"font-semibold block mb-2",children:"Role"}),s.jsxs("select",{name:"role",value:e.role,onChange:u,className:"input",required:!0,children:[s.jsx("option",{value:"",children:"Select Role"}),s.jsx("option",{value:"Accountant",children:"Accountant"}),s.jsx("option",{value:"Worker",children:"Worker"})]})]}),s.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[s.jsx("input",{name:"username",value:e.username,onChange:u,placeholder:"Username",className:"input",required:!0}),s.jsxs("div",{className:"relative",children:[s.jsx("input",{name:"password",type:f?"text":"password",value:e.password,onChange:u,placeholder:"Password",className:"input pr-12",required:!0}),s.jsx("button",{type:"button",onClick:()=>y(!f),className:"absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700",children:f?s.jsx(I,{size:20}):s.jsx(T,{size:20})})]})]}),s.jsxs("div",{children:[s.jsx("label",{className:"font-semibold block mb-3",children:"Allowed Routes"}),s.jsx("div",{className:"grid md:grid-cols-3 gap-3 max-h-64 overflow-y-auto border p-4 rounded-lg",children:C.map(r=>s.jsxs("label",{className:"flex items-center space-x-2",children:[s.jsx("input",{type:"checkbox",checked:e.allowedRoutes.includes(r),onChange:()=>k(r)}),s.jsx("span",{className:"text-sm",children:r})]},r))})]}),s.jsxs("div",{children:[s.jsx("label",{className:"font-semibold block mb-2",children:"Upload Documents"}),s.jsx("input",{type:"file",multiple:!0,onChange:R,className:"input"}),s.jsx("div",{className:"flex flex-wrap mt-2 gap-2",children:g.map((r,o)=>s.jsx("div",{className:"w-16 h-16 border p-1 rounded overflow-hidden",children:s.jsx("img",{src:r,alt:`preview-${o}`,className:"w-full h-full object-cover"})},o))})]}),s.jsx("button",{type:"submit",className:"bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition",children:"Create Employee"})]})]}),s.jsx(D,{message:b,type:w})]})}export{F as default};
