import React, { useState, useEffect, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";
import Notification from "../Notification.jsx";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .wb { font-family: 'DM Sans', sans-serif; color: #111827; }
  .wb-mono { font-family: 'DM Mono', monospace; }

  /* inputs */
  .wb-inp {
    width: 100%; padding: 8px 11px;
    border: 1px solid #d1d5db; border-radius: 7px;
    font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: #111827; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s;
  }
  .wb-inp::placeholder { color: #9ca3af; }
  .wb-inp:focus {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .wb-inp.mono { font-family: 'DM Mono', monospace; }

  /* dropdown */
  .wb-sd-btn {
    width: 100%; padding: 8px 11px;
    border: 1px solid #d1d5db; border-radius: 7px;
    background: #fff; font-size: 13px;
    font-family: 'DM Sans', sans-serif; color: #9ca3af;
    cursor: pointer; outline: none;
    display: flex; align-items: center; justify-content: space-between; gap: 6px;
    transition: border-color .12s, box-shadow .12s;
  }
  .wb-sd-btn.sel { color: #111827; }
  .wb-sd-btn:focus, .wb-sd-btn.open {
    border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }
  .wb-sd-btn:disabled { background: #f9fafb; cursor: default; }
  .wb-sd-panel {
    position: absolute; left: 0; top: calc(100% + 3px);
    width: max(100%, 260px); z-index: 400;
    background: #fff; border: 1px solid #d1d5db;
    border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,.1);
    overflow: hidden;
  }
  .wb-sd-item {
    padding: 8px 12px; font-size: 13px; cursor: pointer;
    border-bottom: 1px solid #f9fafb; color: #111827;
    transition: background .08s;
  }
  .wb-sd-item:hover { background: #f3f4f6; }
  .wb-sd-item.sel { background: #f3f4f6; font-weight: 600; }

  /* section card */
  .wb-card {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; overflow: visible; margin-bottom: 10px;
  }
  .wb-card-head {
    padding: 9px 14px; background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    display: flex; align-items: center; gap: 8px;
  }
  .wb-card-body { padding: 14px; display: flex; flex-direction: column; gap: 11px; }

  /* tabs */
  .wb-tabs {
    display: flex; gap: 6px; background: #f3f4f6;
    border-radius: 8px; padding: 4px; margin-bottom: 18px;
  }
  .wb-tab {
    flex: 1; padding: 8px 0; border-radius: 6px; border: none;
    font-size: 12.5px; font-weight: 600; cursor: pointer;
    font-family: 'DM Sans', sans-serif; transition: all .12s;
    background: transparent; color: #6b7280;
  }
  .wb-tab.on {
    background: #fff; color: #111827;
    box-shadow: 0 1px 4px rgba(0,0,0,.08);
  }

  /* field label */
  .wb-lbl {
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: #6b7280; margin-bottom: 5px;
    display: flex; align-items: baseline; justify-content: space-between;
  }
  .wb-hint { font-size: 10px; color: #9ca3af; font-weight: 400; text-transform: none; letter-spacing: 0; }

  /* toggle */
  .wb-toggle { display: inline-flex; align-items: center; gap: 9px; cursor: pointer; user-select: none; background: none; border: none; padding: 0; }
  .wbt-track { width: 40px; height: 22px; border-radius: 999px; background: #e5e7eb; transition: background .15s; position: relative; flex-shrink: 0; }
  .wbt-thumb { position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; border-radius: 50%; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.15); transition: left .15s; }
  .wb-toggle.on .wbt-track { background: #111827; }
  .wb-toggle.on .wbt-thumb { left: 21px; }

  /* result box */
  .wb-result { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 14px; }

  /* info tile */
  .wb-tile {
    background: #f9fafb; border: 1px solid #e5e7eb;
    border-radius: 7px; padding: 9px 12px;
  }

  /* submit */
  .wb-submit {
    width: 100%; padding: 10px 0; border-radius: 7px; border: none;
    background: #111827; color: #fff; font-size: 13.5px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 7px;
    transition: background .12s;
  }
  .wb-submit:hover { background: #1f2937; }
  .wb-submit.green { background: #15803d; }
  .wb-submit.green:hover { background: #166534; }

  /* divider */
  .wb-divider { display: flex; align-items: center; gap: 10px; margin: 8px 0; }
  .wb-divider-line { flex: 1; height: 1px; background: #f3f4f6; }

  /* success code */
  .wb-code { background: #111827; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 10px; }

  @keyframes wb-in { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }
  .wb-in { animation: wb-in .16s ease-out both; }

  .wb-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .wb-g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
`;

function productLabel(p) {
  if (!p) return "—";
  return p.displayName || [p.productName, p.type, p.subType].filter(Boolean).join(" - ");
}

function SearchDrop({ options, value, onChange, placeholder, labelKey="label", disabled }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef(null); const inp = useRef(null);
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => { if (open) setTimeout(() => inp.current?.focus(), 0); }, [open]);
  const filtered = options.filter(o => (o[labelKey]||"").toLowerCase().includes(q.toLowerCase()));
  const sel = options.find(o => (o._id||o.value) === value);
  return (
    <div ref={ref} style={{ position:"relative" }}>
      <button type="button" disabled={disabled}
        onClick={() => !disabled && setOpen(o=>!o)}
        className={`wb-sd-btn${sel?" sel":""}${open?" open":""}`}>
        <span style={{ flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", textAlign:"left" }}>
          {sel ? sel[labelKey] : placeholder}
        </span>
        <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2.5}
          style={{ flexShrink:0, transition:".15s", transform:open?"rotate(180deg)":"none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <div className="wb-sd-panel">
          <div style={{ padding:7, borderBottom:"1px solid #f3f4f6", background:"#f9fafb" }}>
            <input ref={inp} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search…"
              style={{ width:"100%", padding:"6px 9px", border:"1px solid #e5e7eb", borderRadius:6, fontSize:12.5, outline:"none", fontFamily:"'DM Sans',sans-serif" }}/>
          </div>
          <ul style={{ maxHeight:210, overflowY:"auto", margin:0, padding:0, listStyle:"none" }}>
            {filtered.length===0
              ? <li style={{ padding:"9px 12px", fontSize:12.5, color:"#9ca3af", textAlign:"center" }}>No results</li>
              : filtered.map(o=>(
                <li key={o._id||o.value}
                  className={`wb-sd-item${(o._id||o.value)===value?" sel":""}`}
                  onClick={()=>{onChange(o);setOpen(false);setQ("");}}>
                  {o[labelKey]}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Fld({ label, hint, children }) {
  return (
    <div style={{ display:"flex", flexDirection:"column" }}>
      <div className="wb-lbl">
        {label}
        {hint && <span className="wb-hint">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Tile({ label, value }) {
  return (
    <div className="wb-tile">
      <p style={{ fontSize:9.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".08em", color:"#9ca3af", marginBottom:3 }}>{label}</p>
      <p style={{ fontSize:12.5, fontWeight:600, color:"#374151", fontFamily:"'DM Mono',monospace", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{value}</p>
    </div>
  );
}

function SHead({ dot, title }) {
  return (
    <p style={{ fontSize:10, fontWeight:700, color:"#374151", textTransform:"uppercase", letterSpacing:".08em", margin:"0 0 10px", display:"flex", alignItems:"center", gap:7 }}>
      <span style={{ width:7, height:7, borderRadius:"50%", background:dot, flexShrink:0 }}/>
      {title}
    </p>
  );
}

export default function WeightBridge() {
  const [view, setView] = useState("new");
  const [products, setProducts] = useState([]);
  const [vendors,  setVendors]  = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [vehiclesLoading, setVehiclesLoading] = useState(true);
  const [notification, setNotification] = useState({ message:"", type:"info" });
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    invoiceCode:"", productId:"", productName:"",
    vendorId:"", vendorName:"", vehicleNumber:"", vehicleType:"", rate:"",
    firstWeight:"", firstWeightWithDriver:true, firstWeightTime:"",
    secondWeight:"", secondWeightWithDriver:true, secondWeightTime:"",
    netWeight:"", netWeightMaund:"", netWeightTon:"", completed:false,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, vRes, aRes] = await Promise.all([
          authFetch(`${API_BASE_URL}/products`),
          authFetch(`${API_BASE_URL}/profile/vehicles`),
          authFetch(`${API_BASE_URL}/accounts?excludeProducts=true`),
        ]);
        const pData = await pRes.json();
        const vData = await vRes.json();
        const aData = await aRes.json();
        if (pData.success || Array.isArray(pData.products)) {
          setProducts((pData.products||pData).map(p=>({...p,label:productLabel(p)})));
        }
        setVehicles((vData.vehicles||[]).filter(v=>v.isActive));
        const arr = Array.isArray(aData)?aData:(aData.accounts||[]);
        const vendorList = arr.filter(a=>!a.isProtected&&!a.isProductAccount&&(a.category==="Supplier"||(!a.category&&a.accountType==="Liabilities")));
        setVendors((vendorList.length>0?vendorList:arr.filter(a=>!a.isProtected&&!a.isProductAccount)).map(a=>({...a,label:a.accountName})));
      } catch {}
      finally { setVehiclesLoading(false); }
    };
    load();
  }, []);

  useEffect(() => {
    if (view!=="second") return;
    authFetch(`${API_BASE_URL}/weight-bridge`).then(r=>r.json()).then(data=>{
      if (data.success) {
        setPendingInvoices((data.entries||[]).filter(e=>!e.completed).map(e=>({
          ...e, label:`${e.invoiceCode} — ${e.vendorName} (${e.productName||"—"})`, value:e.invoiceCode,
        })));
      }
    }).catch(()=>{});
  }, [view]);

  const handleChange = e => {
    const {name,value,type,checked}=e.target;
    setForm(p=>({...p,[name]:type==="checkbox"?checked:value}));
  };

  const handleVehicleChange = e => {
    const vehicleType=e.target.value;
    const v=vehicles.find(x=>x.vehicleType===vehicleType);
    setForm(p=>({...p,vehicleType,rate:v?v.rate:0}));
  };

  const handleVehicleNumberChange = e => {
    const clean=e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"");
    if(clean.length>0&&/^[0-9]/.test(clean))return;
    const letters=(clean.match(/^[A-Z]+/)||[""])[0];
    const nums=clean.slice(letters.length);
    if(!letters)return;
    setForm(p=>({...p,vehicleNumber:nums?`${letters}-${nums}`:letters}));
  };

  const handleFirstSubmit = async e => {
    e.preventDefault();
    try {
      const res=await authFetch(`${API_BASE_URL}/weight-bridge/first`,{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({productId:form.productId,vendorName:form.vendorName,vehicleNumber:form.vehicleNumber,vehicleType:form.vehicleType,firstWeight:form.firstWeight,firstWeightWithDriver:form.firstWeightWithDriver}),
      });
      const data=await res.json();
      if(data.success){
        setForm(p=>({...p,invoiceCode:data.entry.invoiceCode,firstWeightTime:new Date(data.entry.createdAt).toLocaleString("en-PK")}));
        setSubmitted(true);
        setNotification({message:data.message,type:"success"});
      } else setNotification({message:data.message,type:"error"});
    } catch { setNotification({message:"Server error",type:"error"}); }
  };

  const resetForm = () => {
    setForm({invoiceCode:"",productId:"",productName:"",vendorId:"",vendorName:"",vehicleNumber:"",vehicleType:"",rate:"",firstWeight:"",firstWeightWithDriver:true,firstWeightTime:"",secondWeight:"",secondWeightWithDriver:true,secondWeightTime:"",netWeight:"",netWeightMaund:"",netWeightTon:"",completed:false});
    setSubmitted(false);
  };

  const loadInvoice = async code => {
    const invoiceCode=code||form.invoiceCode;
    if(!invoiceCode)return setNotification({message:"Select or enter invoice",type:"error"});
    try {
      const res=await authFetch(`${API_BASE_URL}/weight-bridge/${invoiceCode}`);
      const data=await res.json();
      if(data.success){
        setForm(p=>({...p,...data.entry,firstWeightTime:new Date(data.entry.createdAt).toLocaleString("en-PK"),secondWeightTime:data.entry.secondWeightTime?new Date(data.entry.secondWeightTime).toLocaleString("en-PK"):""}));
      } else setNotification({message:data.message,type:"error"});
    } catch { setNotification({message:"Server error",type:"error"}); }
  };

  const handleSecondSubmit = async e => {
    e.preventDefault();
    try {
      const res=await authFetch(`${API_BASE_URL}/weight-bridge/second`,{
        method:"PUT",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({invoiceCode:form.invoiceCode,secondWeight:form.secondWeight,secondWeightWithDriver:form.secondWeightWithDriver}),
      });
      const data=await res.json();
      if(data.success){
        setForm(p=>({...p,secondWeightTime:new Date().toLocaleString("en-PK"),netWeight:data.entry.netWeight,netWeightMaund:data.entry.netWeightMaund,netWeightTon:data.entry.netWeightTon,completed:true}));
        setPendingInvoices(prev=>prev.filter(x=>x.invoiceCode!==form.invoiceCode));
        setNotification({message:data.message,type:"success"});
      } else setNotification({message:data.message,type:"error"});
    } catch { setNotification({message:"Server error",type:"error"}); }
  };

  const hasNetWeight = form.netWeight!==""&&form.netWeight!==undefined;

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification message={notification.message} type={notification.type}
        onClose={()=>setNotification({message:"",type:"info"})}/>

      <div className="wb" style={{ maxWidth:640, margin:"0 auto", paddingBottom:64 }}>

        {/* Header */}
        <div style={{ marginBottom:18 }}>
          <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 3px" }}>Operations</p>
          <h1 style={{ margin:0, fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px" }}>
            Weight Bridge
          </h1>
        </div>

        {/* Tabs */}
        <div className="wb-tabs">
          {[{id:"new",label:"① New Entry"},{id:"second",label:"② Second Weight"}].map(tab=>(
            <button key={tab.id} className={`wb-tab${view===tab.id?" on":""}`}
              onClick={()=>{setView(tab.id);resetForm();}}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── FIRST WEIGHT ── */}
        {view==="new" && !submitted && (
          <div className="wb-in">

            <div className="wb-card">
              <div className="wb-card-head"><SHead dot="#3b82f6" title="Vehicle & Vendor"/></div>
              <div className="wb-card-body">
                <div className="wb-g2">
                  <Fld label="Vendor">
                    <SearchDrop options={vendors} value={form.vendorId||""} labelKey="label"
                      placeholder="Select vendor…"
                      onChange={v=>setForm(p=>({...p,vendorId:v._id,vendorName:v.accountName}))}/>
                  </Fld>
                  <Fld label="Vehicle No." hint="Plate No.">
                    <input type="text" placeholder="LEA-1234" value={form.vehicleNumber}
                      onChange={handleVehicleNumberChange}
                      className="wb-inp mono" style={{ textTransform:"uppercase", letterSpacing:".06em" }}/>
                  </Fld>
                </div>
              </div>
            </div>

            <div className="wb-card">
              <div className="wb-card-head"><SHead dot="#f59e0b" title="Cargo & Transport"/></div>
              <div className="wb-card-body">
                <Fld label="Product">
                  <SearchDrop options={products} value={form.productId} labelKey="label"
                    placeholder="Select product…"
                    onChange={p=>setForm(prev=>({...prev,productId:p._id,productName:p.label}))}/>
                </Fld>
                <div className="wb-g2">
                  <Fld label="Vehicle Type">
                    {vehiclesLoading ? (
                      <div className="wb-inp" style={{ background:"#f9fafb", color:"#9ca3af" }}>Loading…</div>
                    ) : vehicles.length===0 ? (
                      <div>
                        <div className="wb-inp" style={{ background:"#fef9c3", color:"#854d0e", fontSize:12 }}>No vehicles configured</div>
                        <p style={{ fontSize:10.5, color:"#9ca3af", marginTop:3 }}>Add in Profile → Mill Config</p>
                      </div>
                    ) : (
                      <select value={form.vehicleType} onChange={handleVehicleChange}
                        className="wb-inp" style={{ cursor:"pointer", appearance:"none" }} required>
                        <option value="">Select Type</option>
                        {vehicles.map(v=><option key={v._id} value={v.vehicleType}>{v.vehicleType}</option>)}
                      </select>
                    )}
                  </Fld>
                  <Fld label="Rate" hint="Auto-filled">
                    <div className="wb-inp" style={{ background:"#f9fafb", display:"flex", alignItems:"center", gap:7 }}>
                      <span style={{ fontSize:11, fontWeight:600, color:"#9ca3af" }}>Rs</span>
                      <span className="wb-mono" style={{ fontWeight:700, color:"#111827", fontSize:14 }}>
                        {form.rate ? Number(form.rate).toLocaleString() : "—"}
                      </span>
                    </div>
                  </Fld>
                </div>
              </div>
            </div>

            <div className="wb-card">
              <div className="wb-card-head"><SHead dot="#10b981" title="Weight Reading"/></div>
              <div className="wb-card-body">
                <div className="wb-g2" style={{ alignItems:"end" }}>
                  <Fld label="First Weight" hint="kg">
                    <div style={{ position:"relative" }}>
                      <input type="number" name="firstWeight" placeholder="0"
                        value={form.firstWeight} onChange={handleChange}
                        className="wb-inp mono"
                        style={{ fontSize:20, fontWeight:700, paddingRight:44, paddingTop:10, paddingBottom:10 }}
                        required/>
                      <span style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", fontSize:10.5, fontWeight:700, color:"#9ca3af", pointerEvents:"none" }}>KG</span>
                    </div>
                  </Fld>
                  <Fld label="Driver">
                    <button type="button"
                      onClick={()=>setForm(p=>({...p,firstWeightWithDriver:!p.firstWeightWithDriver}))}
                      className={`wb-toggle${form.firstWeightWithDriver?" on":""}`}>
                      <span className="wbt-track"><span className="wbt-thumb"/></span>
                      <span style={{ fontSize:13, fontWeight:500, color:form.firstWeightWithDriver?"#111827":"#9ca3af" }}>
                        {form.firstWeightWithDriver?"With Driver":"Without Driver"}
                      </span>
                    </button>
                  </Fld>
                </div>
                <button onClick={handleFirstSubmit} className="wb-submit">
                  <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  Save First Weight
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── SUCCESS ── */}
        {view==="new" && submitted && (
          <div className="wb-in" style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <div className="wb-code">
              <p style={{ fontSize:10, color:"#6b7280", textTransform:"uppercase", letterSpacing:".14em", marginBottom:8 }}>Invoice Generated</p>
              <p className="wb-mono" style={{ fontSize:44, fontWeight:700, color:"#fff", letterSpacing:"-.5px", margin:"0 0 6px" }}>{form.invoiceCode}</p>
              <p style={{ fontSize:11, color:"#6b7280", fontFamily:"'DM Mono',monospace" }}>{form.firstWeightTime}</p>
            </div>
            <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, padding:"12px 14px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
                <div style={{ textAlign:"center", padding:"10px 0", borderRight:"1px solid #f3f4f6" }}>
                  <p style={{ fontSize:9.5, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".1em", marginBottom:5 }}>First Weight</p>
                  <p className="wb-mono" style={{ fontSize:22, fontWeight:700, color:"#111827" }}>{Number(form.firstWeight).toLocaleString()}</p>
                  <p style={{ fontSize:10, color:"#9ca3af" }}>kg</p>
                </div>
                <div style={{ textAlign:"center", padding:"10px 0" }}>
                  <p style={{ fontSize:9.5, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".1em", marginBottom:5 }}>Driver</p>
                  <p style={{ fontSize:13, fontWeight:600, color:"#111827" }}>{form.firstWeightWithDriver?"With Driver":"Without Driver"}</p>
                </div>
              </div>
            </div>
            <div className="wb-g3">
              {[["Vendor",form.vendorName],["Vehicle",form.vehicleNumber||"—"],["Product",form.productName||"—"],["Type",form.vehicleType],["Rate",`Rs ${Number(form.rate||0).toLocaleString()}`],["Time",form.firstWeightTime]].map(([k,v])=><Tile key={k} label={k} value={v}/>)}
            </div>
            <button onClick={resetForm}
              style={{ width:"100%", padding:"9px 0", borderRadius:7, border:"1px solid #e5e7eb", background:"#fff", color:"#374151", fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"background .1s" }}
              onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"}
              onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
              + New Entry
            </button>
          </div>
        )}

        {/* ── SECOND WEIGHT ── */}
        {view==="second" && (
          <div className="wb-in" style={{ display:"flex", flexDirection:"column", gap:10 }}>

            <div className="wb-card">
              <div className="wb-card-head"><SHead dot="#374151" title="Load Invoice"/></div>
              <div className="wb-card-body">
                {pendingInvoices.length>0 && (
                  <Fld label={`Pending invoices (${pendingInvoices.length})`}>
                    <SearchDrop options={pendingInvoices} value={form.invoiceCode} labelKey="label"
                      placeholder="Select pending invoice…"
                      onChange={inv=>{setForm(p=>({...p,invoiceCode:inv.invoiceCode}));loadInvoice(inv.invoiceCode);}}/>
                  </Fld>
                )}
                {pendingInvoices.length>0 && (
                  <div className="wb-divider">
                    <div className="wb-divider-line"/>
                    <span style={{ fontSize:11, color:"#9ca3af", fontWeight:500, whiteSpace:"nowrap" }}>or enter manually</span>
                    <div className="wb-divider-line"/>
                  </div>
                )}
                <div style={{ display:"flex", gap:8 }}>
                  <div style={{ flex:1, display:"flex", alignItems:"center", border:"1px solid #d1d5db", borderRadius:7, overflow:"hidden" }}>
                    <span className="wb-mono" style={{ padding:"8px 11px", fontSize:12.5, fontWeight:700, color:"#9ca3af", background:"#f9fafb", borderRight:"1px solid #d1d5db", whiteSpace:"nowrap" }}>WB-</span>
                    <input type="text"
                      value={form.invoiceCode.replace(/^WB-?/i,"")}
                      onChange={e=>setForm(p=>({...p,invoiceCode:`WB-${e.target.value}`}))}
                      placeholder="001"
                      className="wb-mono"
                      style={{ flex:1, padding:"8px 11px", fontSize:14, fontWeight:700, color:"#111827", outline:"none", border:"none", background:"transparent" }}
                      onKeyDown={e=>e.key==="Enter"&&loadInvoice()}/>
                  </div>
                  <button onClick={()=>loadInvoice()}
                    style={{ padding:"8px 16px", borderRadius:7, border:"none", background:"#111827", color:"#fff", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"background .1s" }}
                    onMouseEnter={e=>e.currentTarget.style.background="#1f2937"}
                    onMouseLeave={e=>e.currentTarget.style.background="#111827"}>
                    Load
                  </button>
                </div>
              </div>
            </div>

            {form.productName && (
              <>
                {/* Invoice header strip */}
                <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, padding:"12px 14px" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
                    <div>
                      <p style={{ fontSize:9.5, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".1em", marginBottom:3 }}>Invoice</p>
                      <p className="wb-mono" style={{ fontSize:16, fontWeight:700, color:"#111827" }}>{form.invoiceCode}</p>
                    </div>
                    <div style={{ textAlign:"center" }}>
                      <p style={{ fontSize:9.5, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".1em", marginBottom:3 }}>First Weight</p>
                      <p className="wb-mono" style={{ fontSize:22, fontWeight:700, color:"#111827" }}>
                        {Number(form.firstWeight||0).toLocaleString()}
                      </p>
                      <p style={{ fontSize:10, color:"#9ca3af" }}>kg</p>
                    </div>
                    <span style={{
                      padding:"3px 10px", borderRadius:5, fontSize:11.5, fontWeight:600,
                      background:form.completed?"#f0fdf4":"#f3f4f6",
                      color:form.completed?"#15803d":"#374151",
                      border:`1px solid ${form.completed?"#bbf7d0":"#e5e7eb"}`,
                    }}>
                      {form.completed?"✓ Done":"Pending"}
                    </span>
                  </div>
                </div>

                {/* Info tiles */}
                <div className="wb-g3">
                  {[["Vendor",form.vendorName],["Vehicle",form.vehicleNumber||"—"],["Product",form.productName],["Type",form.vehicleType],["Rate",`Rs ${Number(form.rate||0).toLocaleString()}`],["1st Time",form.firstWeightTime]].map(([k,v])=><Tile key={k} label={k} value={v}/>)}
                </div>

                {/* 2nd weight form */}
                {!form.completed && (
                  <div className="wb-card">
                    <div className="wb-card-head"><SHead dot="#10b981" title="Second Weight"/></div>
                    <div className="wb-card-body">
                      <div className="wb-g2" style={{ alignItems:"end" }}>
                        <Fld label="Second Weight" hint="kg">
                          <div style={{ position:"relative" }}>
                            <input type="number" name="secondWeight" placeholder="0"
                              value={form.secondWeight} onChange={handleChange}
                              className="wb-inp mono"
                              style={{ fontSize:20, fontWeight:700, paddingRight:44, paddingTop:10, paddingBottom:10 }}
                              required/>
                            <span style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", fontSize:10.5, fontWeight:700, color:"#9ca3af", pointerEvents:"none" }}>KG</span>
                          </div>
                        </Fld>
                        <Fld label="Driver">
                          <button type="button"
                            onClick={()=>setForm(p=>({...p,secondWeightWithDriver:!p.secondWeightWithDriver}))}
                            className={`wb-toggle${form.secondWeightWithDriver?" on":""}`}>
                            <span className="wbt-track"><span className="wbt-thumb"/></span>
                            <span style={{ fontSize:13, fontWeight:500, color:form.secondWeightWithDriver?"#111827":"#9ca3af" }}>
                              {form.secondWeightWithDriver?"With Driver":"Without Driver"}
                            </span>
                          </button>
                        </Fld>
                      </div>
                      <button onClick={handleSecondSubmit} className="wb-submit green">
                        <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                        Save Second Weight
                      </button>
                    </div>
                  </div>
                )}

                {/* Net weight result */}
                {hasNetWeight && (
                  <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, overflow:"hidden" }}>
                    <div style={{ background:"#15803d", padding:"8px 14px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <span style={{ fontSize:11, fontWeight:700, color:"#fff", textTransform:"uppercase", letterSpacing:".1em" }}>✓ Net Weight Result</span>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"rgba(255,255,255,.7)" }}>{form.secondWeightTime}</span>
                    </div>
                    <div style={{ padding:"20px 16px", textAlign:"center", borderBottom:"1px solid #f3f4f6" }}>
                      <p style={{ fontSize:10, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".12em", marginBottom:6 }}>Net Weight</p>
                      <p className="wb-mono" style={{ fontSize:52, fontWeight:700, color:"#111827", lineHeight:1 }}>
                        {Number(form.netWeight).toLocaleString()}
                      </p>
                      <p style={{ fontSize:13, color:"#9ca3af", marginTop:5 }}>kilograms</p>
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", borderBottom:"1px solid #f3f4f6" }}>
                      {[["Maund",`${form.netWeightMaund} Mn`],["Metric Ton",`${form.netWeightTon} T`]].map(([l,v])=>(
                        <div key={l} style={{ padding:"14px 16px", textAlign:"center", borderRight:"1px solid #f3f4f6" }}>
                          <p style={{ fontSize:9.5, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".1em", marginBottom:6 }}>{l}</p>
                          <p className="wb-mono" style={{ fontSize:22, fontWeight:700, color:"#374151" }}>{v}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding:"10px 16px", background:"#f9fafb", display:"flex", alignItems:"center", justifyContent:"center", gap:14, flexWrap:"wrap" }}>
                      {[["2nd",`${Number(form.secondWeight).toLocaleString()} kg`],["−",null],["1st",`${Number(form.firstWeight).toLocaleString()} kg`],["=",null],["Net",`${Number(form.netWeight).toLocaleString()} kg`]].map(([l,v],i)=>
                        v===null
                          ? <span key={i} className="wb-mono" style={{ color:"#d1d5db", fontSize:16 }}>{l}</span>
                          : (
                            <div key={l} style={{ textAlign:"center" }}>
                              <p style={{ fontSize:9.5, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".08em", marginBottom:1 }}>{l}</p>
                              <p className="wb-mono" style={{ fontSize:12.5, fontWeight:700, color:l==="Net"?"#15803d":"#374151" }}>{v}</p>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}