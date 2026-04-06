import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL   from "../../../config/API_BASE_URL.js";
import Notification   from "../Notification.jsx";
import SidebarLayout  from "../layout/SidebarLayout.jsx";
import { authFetch }  from "../../utils/authFetch.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;
const CSS = `
*, *::before, *::after { box-sizing: border-box; }
.va { font-family:'DM Sans',sans-serif; color:#111827; }
.va-inp, .va-sel {
  border:1px solid #d1d5db; border-radius:7px; padding:7px 11px; font-size:12.5px;
  font-family:'DM Sans',sans-serif; color:#111827; background:#fff; outline:none;
  transition:border-color .12s, box-shadow .12s; appearance:none; width:100%;
}
.va-inp::placeholder { color:#9ca3af; }
.va-inp:focus, .va-sel:focus { border-color:#6b7280; box-shadow:0 0 0 2px rgba(107,114,128,.12); }

.va-table { width:100%; border-collapse:collapse; }
.va-table thead tr { background:#f9fafb; border-bottom:2px solid #e5e7eb; }
.va-table thead th { padding:9px 12px; font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:#9ca3af; text-align:left; white-space:nowrap; cursor:pointer; user-select:none; }
.va-table tbody tr { background:#fff; border-bottom:1px solid #f3f4f6; transition:background .07s; }
.va-table tbody tr:hover { background:#fafafa; }
.va-table tbody td { padding:10px 12px; font-size:12.5px; color:#374151; vertical-align:middle; }

.va-overlay {
  position:fixed; inset:0; background:rgba(0,0,0,.45);
  display:flex; align-items:center; justify-content:center;
  z-index:1100; padding:20px;
}
@keyframes va-in { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
.va-modal { background:#fff; border-radius:10px; width:100%; box-shadow:0 20px 60px rgba(0,0,0,.18); animation:va-in .17s ease-out; border:1px solid #e5e7eb; }
.va-modal-hd { padding:14px 20px; border-bottom:1px solid #e5e7eb; background:#f9fafb; border-radius:10px 10px 0 0; display:flex; align-items:center; justify-content:space-between; }
.va-modal-body { padding:18px 20px; }
.va-modal-ft { padding:11px 20px; border-top:1px solid #f3f4f6; background:#f9fafb; border-radius:0 0 10px 10px; display:flex; justify-content:flex-end; gap:8px; }
.va-lbl { display:block; font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:#6b7280; margin-bottom:4px; font-family:'DM Mono',monospace; }
.va-fld { margin-bottom:13px; }

.sub-ca  { background:#eff6ff; color:#1d4ed8; }
.sub-fa  { background:#dbeafe; color:#1e40af; }
.sub-cl  { background:#fef2f2; color:#b91c1c; }
.sub-fl  { background:#fee2e2; color:#9f1239; }
.sub-eq  { background:#faf5ff; color:#6d28d9; }
.sub-sa  { background:#ede9fe; color:#5b21b6; }
.sub-oc  { background:#f5f3ff; color:#7c3aed; }
.sub-rv  { background:#ecfdf5; color:#065f46; }
.sub-cr  { background:#d1fae5; color:#047857; }
.sub-ex  { background:#fff7ed; color:#c2410c; }
.sub-dflt{ background:#f3f4f6; color:#374151; }

.va-btn { display:inline-flex; align-items:center; gap:4px; padding:4px 9px; border-radius:5px; font-size:11px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; border:1px solid transparent; transition:all .1s; white-space:nowrap; }
.va-star { background:none; border:none; cursor:pointer; padding:2px; transition:color .12s; }
@keyframes sk { to { background-position:-200% 0; } }
.va-sk { background:linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%); background-size:200% 100%; animation:sk 1.3s infinite; border-radius:4px; }

/* ── Sticky filter bar (sticks below the 56px topbar) ── */
.va-filter-sticky {
  position: sticky; top: 56px; z-index: 30;
  background: #f9fafb;
  padding-top: 6px; padding-bottom: 10px;
  box-shadow: 0 3px 8px -3px rgba(0,0,0,.06);
  margin-left: -24px; margin-right: -24px;
  padding-left: 24px; padding-right: 24px;
}

/* ── Scrollable accounts table ── */
.va-scroll-table {
  max-height: calc(100vh - 400px); min-height: 300px;
  overflow: auto;
  scrollbar-width: thin; scrollbar-color: #e5e7eb transparent;
}
.va-scroll-table::-webkit-scrollbar       { width: 4px; height: 4px; }
.va-scroll-table::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
.va-scroll-table::-webkit-scrollbar-track { background: transparent; }

/* Sticky thead within scrollable table */
.va-table thead th { position: sticky; top: 0; z-index: 5; background: #f9fafb; }

@media (max-width: 900px) {
  .va-filter-sticky { margin-left: -14px; margin-right: -14px; padding-left: 14px; padding-right: 14px; top: 56px; }
  .va-scroll-table  { max-height: calc(100vh - 360px); }
}
`;

const TYPE_OPTIONS = ["Assets","Liabilities","Equity","Expense","Revenue"];

// ── Category groups per type — drives the sub-category pill row ──────────────
const CATEGORY_GROUPS = {
  Assets:      ["Bank","Customer","Loan Given","Building","Vehicle","Equipment","Tool","Furniture"],
  Liabilities: ["Employee","Supplier","Loan Taken","Tax Payable","Accrued Expenses","Installments"],
  Equity:      ["Investor","Shareholder's Account"],
  Revenue:     ["Other Income"],
  Expense:     ["Expense"],
};

// ── Smart search alias tables ────────────────────────────────────────────────
// Maps exact lowercase query → { kind, value }  (checked before text scan)
const SMART_EXACT = (() => {
  const m = {};
  // accountType aliases
  [["asset","Assets"],["assets","Assets"],
   ["liability","Liabilities"],["liabilities","Liabilities"],["liab","Liabilities"],
   ["equity","Equity"],
   ["revenue","Revenue"],["income","Revenue"],
   ["expense","Expense"],["expenses","Expense"],
  ].forEach(([k,v]) => { m[k] = { kind:"type", value:v }; });
  // category aliases
  [["bank","Bank"],["banks","Bank"],
   ["customer","Customer"],["customers","Customer"],["buyer","Customer"],["buyers","Customer"],["client","Customer"],
   ["supplier","Supplier"],["suppliers","Supplier"],["vendor","Supplier"],["vendors","Supplier"],
   ["employee","Employee"],["employees","Employee"],["staff","Employee"],
   ["loan given","Loan Given"],["loans given","Loan Given"],["given loan","Loan Given"],
   ["loan taken","Loan Taken"],["loans taken","Loan Taken"],["taken loan","Loan Taken"],
   ["tax payable","Tax Payable"],["tax","Tax Payable"],
   ["accrued","Accrued Expenses"],["accrued expenses","Accrued Expenses"],
   ["installments","Installments"],["installment","Installments"],["emi","Installments"],
   ["investor","Investor"],["investors","Investor"],
   ["shareholder","Shareholder's Account"],["shareholders","Shareholder's Account"],["shareholding","Shareholder's Account"],
   ["other income","Other Income"],
   ["equipment","Equipment"],
   ["vehicle","Vehicle"],["vehicles","Vehicle"],["truck","Vehicle"],["car","Vehicle"],
   ["furniture","Furniture"],
   ["building","Building"],["buildings","Building"],["warehouse","Building"],
   ["tool","Tool"],["tools","Tool"],
  ].forEach(([k,v]) => { m[k] = { kind:"category", value:v }; });
  // sub-account type aliases
  [["current assets","Current Assets"],["current asset","Current Assets"],
   ["fixed assets","Fixed Assets"],["fixed asset","Fixed Assets"],
   ["current liabilities","Current Liabilities"],["current liability","Current Liabilities"],
   ["fixed liabilities","Fixed Liabilities"],["fixed liability","Fixed Liabilities"],
  ].forEach(([k,v]) => { m[k] = { kind:"sub", value:v }; });
  return m;
})();
const ACCT_TYPES = [
  { type:"Assets",      subTypes:["Current Assets","Fixed Assets"] },
  { type:"Liabilities", subTypes:["Current Liabilities","Fixed Liabilities"] },
  { type:"Equity",      subTypes:["Equity","Owner's Capital","Shareholders Account","Expense"] },
  { type:"Revenue",     subTypes:["Revenue","Contra Revenue"] },
  { type:"Expense",     subTypes:["Expenses"] },
];
const CATEGORY_META = {
  "Product":{"label":"Product","icon":"📦"}, "Bank":{"label":"Bank","icon":"🏦"},
  "Customer":{"label":"Customer","icon":"👤"}, "Employee":{"label":"Employee","icon":"👷"},
  "Supplier":{"label":"Supplier","icon":"🏭"}, "Cash In Hand":{"label":"Cash In Hand","icon":"💵"},
  "Inventory":{"label":"Inventory","icon":"📦"}, "Loan Given":{"label":"Loan Given","icon":"💳"},
  "Building":{"label":"Building","icon":"🏢"}, "Vehicle":{"label":"Vehicle","icon":"🚛"},
  "Equipment":{"label":"Equipment","icon":"⚙️"}, "Tool":{"label":"Tool","icon":"🔧"},
  "Furniture":{"label":"Furniture","icon":"🪑"}, "Loan Taken":{"label":"Loan Taken","icon":"🏦"},
  "Tax Payable":{"label":"Tax Payable","icon":"🧾"}, "Accrued Expenses":{"label":"Accrued Expenses","icon":"📝"},
  "Installments":{"label":"Installments","icon":"📅"}, "Investor":{"label":"Investor","icon":"💼"},
  "Shareholder's Account":{"label":"Shareholder's","icon":"📊"}, "Other Income":{"label":"Other Income","icon":"📈"},
  "Expense":{"label":"Expense","icon":"💸"},
};
const SUB_CLASS = {
  "Current Assets":"sub-ca","Fixed Assets":"sub-fa",
  "Current Liabilities":"sub-cl","Fixed Liabilities":"sub-fl",
  "Equity":"sub-eq","Shareholders Account":"sub-sa","Owner's Capital":"sub-oc",
  "Revenue":"sub-rv","Contra Revenue":"sub-cr","Expenses":"sub-ex",
};
const BANK_KEYWORDS = {
  hbl:    ["hbl","habib bank","habib"],
  ubl:    ["ubl","united bank","united"],
  mebl:   ["mebl","mbl","meezan","meezan bank"],
  mcb:    ["mcb","mcb bank","muslim commercial"],
  alfalah:["bafl","alfalah","bank alfalah"],
  abl:    ["abl","allied","allied bank"],
  akbl:   ["akbl","askari","askari bank"],
  fabl:   ["fabl","faysal","faysal bank"],
  silk:   ["silk","silkbank"],
  bok:    ["bok","bank of khyber"],
  bop:    ["bop","bank of punjab"],
  nbp:    ["nbp","national bank"],
  scbpl:  ["scbpl","scb","standard chartered"],
  smbl:   ["smbl","summit","summit bank"],
  jsbl:   ["jsbl","js","js bank"],
  snbl:   ["snbl","soneri","soneri bank"],
  dibpl:  ["dibpl","dib","dubai islamic"],
  bahl:   ["bahl","bank al habib","al habib"],
  bipl:   ["bipl","bankislami","bank islami"],
  abpl:   ["abpl","al baraka","baraka"],
  hmb:    ["hmb","habib metropolitan","metropolitan","habib metro"],
  samb:   ["samb","samba","samba bank"],
  mibl:   ["mibl","mcb islamic"],
  sbl:    ["sbl","sindh bank"],
  fwbl:   ["fwbl","first women bank","first women"],
  bml:    ["bml","bank makramah","makramah"],
};

const fmtPKR = n => `Rs ${Math.abs(n||0).toLocaleString("en-PK",{maximumFractionDigits:0})}`;

function getCatMeta(acc) {
  if (acc.category) return CATEGORY_META[acc.category] || { label:acc.category, icon:"🏷️" };
  if (acc.isProtected) return { label:"Cash In Hand", icon:"💵" };
  if (acc.isProductAccount) return { label:"Product", icon:"📦" };
  return null;
}

// ── Single smart match function (replaces bankMatch + matchesSearch) ──────────
// Priority: exact alias → bank alias → text scan. All in-memory, zero async, O(n).
function smartMatch(acc, rawQuery) {
  if (!rawQuery) return true;
  const q = rawQuery.trim().toLowerCase();
  if (!q) return true;

  // 1. Exact alias hit (type / category / sub-account-type keyword)
  const alias = SMART_EXACT[q];
  if (alias) {
    if (alias.kind === "type")     return acc.accountType     === alias.value;
    if (alias.kind === "category") return acc.category        === alias.value;
    if (alias.kind === "sub")      return acc.subAccountType  === alias.value;
  }

  // 2. Bank-name alias match (only for Bank category accounts)
  if (acc.category === "Bank") {
    const nameLower = (acc.accountName + " " + (acc.bankName || "")).toLowerCase();
    for (const aliases of Object.values(BANK_KEYWORDS)) {
      const hitAlias = aliases.some(a => q.includes(a) || a.includes(q));
      if (hitAlias && aliases.some(a => nameLower.includes(a))) return true;
    }
  }

  // 3. Partial alias: if query is a leading substring of any alias key,
  //    check if the account belongs to that alias's value.
  //    e.g. "supp" → matches "supplier" key → category=Supplier
  //    Only kicks in for q.length >= 3 to avoid false positives on "a", "b" etc.
  if (q.length >= 3) {
    for (const [kw, hit] of Object.entries(SMART_EXACT)) {
      if (kw.startsWith(q)) {
        const v = hit.value;
        if (hit.kind === "type"     && acc.accountType    === v) return true;
        if (hit.kind === "category" && acc.category       === v) return true;
        if (hit.kind === "sub"      && acc.subAccountType === v) return true;
      }
    }
  }

  // 4. Standard text scan — accountName, id, ref, category, type, sub-type, bankName
  const haystack = [
    acc.accountName, acc.autoAccountId, acc.LedgerRef,
    acc.category, acc.accountType, acc.subAccountType, acc.bankName, acc.remarkNote,
  ].filter(Boolean).join(" ").toLowerCase();
  return haystack.includes(q);
}

function SubPill({ sub }) {
  const cls = SUB_CLASS[sub] || "sub-dflt";
  return <span className={cls} style={{ display:"inline-block", padding:"2px 7px", borderRadius:20, fontSize:10, fontWeight:700, whiteSpace:"nowrap" }}>{sub||"—"}</span>;
}

// ── Balance Sheet Glimpse ─────────────────────────────────────────────────────
function BSGlimpse({ accounts }) {
  const sum = type => accounts.filter(a => a.accountType===type).reduce((s,a)=>s+(a.balance||0),0);
  const assets = sum("Assets"), liab = sum("Liabilities"), equity = sum("Equity");
  // Use Math.abs for credit-normal accounts: equity/liabilities may be stored
  // as negative values due to direct $inc on balance field (sign depends on JE direction).
  // For the BS equation display, we always want the magnitude, not the signed value.
  const rhs    = Math.abs(liab) + Math.abs(equity);
  const diff   = assets - rhs;
  const ok     = Math.abs(diff) < 1;
  const bsCard = (label, amount, color, count) => (
    <div style={{ background:"#fff", border:`1px solid #e5e7eb`, borderLeft:`3px solid ${color}`, borderRadius:8, padding:"12px 16px", flex:1, minWidth:160 }}>
      <div style={{ fontSize:9.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".09em", color:"#9ca3af", fontFamily:"'DM Mono',monospace", marginBottom:5 }}>{label}</div>
      <div style={{ fontSize:18, fontWeight:700, color, fontFamily:"'DM Mono',monospace" }}>{fmtPKR(amount)}</div>
      <div style={{ fontSize:11, color:"#9ca3af", marginTop:3 }}>{count} accounts</div>
    </div>
  );
  return (
    <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:9, padding:"13px 16px", marginBottom:15 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:11 }}>
        <span style={{ fontSize:9.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".09em", color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>Balance Sheet Glimpse</span>
        <span style={{
          marginLeft:"auto", fontSize:10, fontWeight:700, padding:"2px 9px", borderRadius:20,
          fontFamily:"'DM Mono',monospace",
          background: ok ? "#f0fdf4" : diff > 0 ? "#eff6ff" : "#fef2f2",
          color:       ok ? "#15803d" : diff > 0 ? "#1d4ed8" : "#dc2626",
          border: `1px solid ${ok ? "#bbf7d0" : diff > 0 ? "#bfdbfe" : "#fecaca"}`,
        }}>
          {ok
            ? "✓ Balanced"
            : diff > 0
              ? `↑ +${fmtPKR(diff)} (Assets surplus)`
              : `↓ −${fmtPKR(Math.abs(diff))} (Assets deficit — check entries)`}
        </span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:9, flexWrap:"wrap" }}>
        {bsCard("Total Assets",      assets, "#1d4ed8", accounts.filter(a=>a.accountType==="Assets").length)}
        <span style={{ fontSize:20, fontWeight:700, color:"#9ca3af", flexShrink:0 }}>=</span>
        {bsCard("Total Liabilities", liab,   "#b91c1c", accounts.filter(a=>a.accountType==="Liabilities").length)}
        <span style={{ fontSize:20, fontWeight:700, color:"#9ca3af", flexShrink:0 }}>+</span>
        {bsCard("Total Equity",      equity, "#6d28d9", accounts.filter(a=>a.accountType==="Equity").length)}
      </div>
    </div>
  );
}

// ── Edit Modal ────────────────────────────────────────────────────────────────
function EditModal({ account, onClose, onSaved, showToast }) {
  const [form, setForm] = useState({ accountName:account.accountName||"", accountType:account.accountType||"", subAccountType:account.subAccountType||"", LedgerRef:account.LedgerRef||"" });
  const [saving, setSaving] = useState(false);
  const subOpts = ACCT_TYPES.find(t=>t.type===form.accountType)?.subTypes||[];
  const upd = k => e => setForm(p => { const n={...p,[k]:e.target.value}; if(k==="accountType") n.subAccountType=""; return n; });
  const isTankhwa = account.accountName?.toLowerCase().includes("tankhwa");
  const save = async () => {
    setSaving(true);
    try {
      const r = await authFetch(`${API_BASE_URL}/update-account/${account._id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      const d = await r.json();
      if (d.success) { showToast("Account updated!","success"); onSaved(account._id,form); onClose(); }
      else showToast(d.message||"Failed","error");
    } catch { showToast("Server error","error"); }
    setSaving(false);
  };
  const CloseBtn = () => (
    <button onClick={onClose} style={{background:"#f3f4f6",border:"none",borderRadius:6,width:27,height:27,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#6b7280"}}>
      <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  );
  return (
    <div className="va-overlay" onClick={onClose}>
      <div className="va-modal" style={{maxWidth:430}} onClick={e=>e.stopPropagation()}>
        <div className="va-modal-hd">
          <div>
            <div style={{fontSize:14,fontWeight:700,color:"#111827"}}>{account.isProductAccount?"Rename Product Account":isTankhwa?"Tankhwa Account":"Edit Account"}</div>
            <div style={{fontSize:11,color:"#9ca3af",fontFamily:"'DM Mono',monospace",marginTop:2}}>{account.autoAccountId}</div>
          </div>
          <CloseBtn/>
        </div>
        <div className="va-modal-body">
          {!isTankhwa && (
            <div className="va-fld">
              <label className="va-lbl">Account Name</label>
              <input className="va-inp" value={form.accountName} onChange={upd("accountName")}/>
            </div>
          )}
          {isTankhwa && <div style={{background:"#fef9c3",border:"1px solid #fde68a",borderRadius:7,padding:"9px 12px",marginBottom:13,fontSize:12.5,color:"#92400e"}}>💰 Default salary account — only Ledger Reference editable.</div>}
          {!account.isProductAccount && (
            <div className="va-fld">
              <label className="va-lbl">Ledger Reference</label>
              <input className="va-inp" value={form.LedgerRef} onChange={upd("LedgerRef")} placeholder="e.g. HBL-001"/>
            </div>
          )}
          {!account.isProductAccount && !isTankhwa && (
            <>
              <div className="va-fld">
                <label className="va-lbl">Account Type</label>
                <select className="va-sel" value={form.accountType} onChange={upd("accountType")}>
                  <option value="">Select…</option>
                  {ACCT_TYPES.map(t=><option key={t.type} value={t.type}>{t.type}</option>)}
                </select>
              </div>
              <div className="va-fld">
                <label className="va-lbl">Sub Account Type</label>
                <select className="va-sel" value={form.subAccountType} onChange={upd("subAccountType")}>
                  <option value="">Select…</option>
                  {subOpts.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </>
          )}
          {account.isProductAccount && <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:7,padding:"9px 12px",fontSize:12.5,color:"#065f46"}}>📦 Product account — type locked. Rename syncs across Products & Invoices.</div>}
        </div>
        <div className="va-modal-ft">
          <button onClick={onClose} style={{padding:"7px 14px",borderRadius:6,border:"1px solid #e5e7eb",background:"#fff",fontSize:12.5,fontWeight:500,color:"#374151",fontFamily:"'DM Sans',sans-serif",cursor:"pointer"}}>Cancel</button>
          <button onClick={save} disabled={saving} style={{padding:"7px 16px",borderRadius:6,border:"none",background:"#111827",color:"#fff",fontSize:12.5,fontWeight:600,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",opacity:saving?.6:1}}>
            {saving?"Saving…":"Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Modal ──────────────────────────────────────────────────────────────
function DeleteModal({ account, onClose, onDeleted, showToast }) {
  const [busy, setBusy] = useState(false);
  const del = async () => {
    setBusy(true);
    try {
      const r = await authFetch(`${API_BASE_URL}/delete-account/${account._id}`,{method:"DELETE"});
      const d = await r.json();
      if (d.success) { showToast("Account deleted.","success"); onDeleted(account._id); onClose(); }
      else showToast(d.message||"Cannot delete","error");
    } catch { showToast("Server error","error"); }
    setBusy(false);
  };
  return (
    <div className="va-overlay" onClick={onClose}>
      <div className="va-modal" style={{maxWidth:360}} onClick={e=>e.stopPropagation()}>
        <div className="va-modal-body" style={{textAlign:"center",paddingTop:24}}>
          <div style={{width:44,height:44,borderRadius:"50%",background:"#fef2f2",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>
            <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </div>
          <div style={{fontSize:15,fontWeight:700,color:"#111827",marginBottom:7}}>Delete Account?</div>
          <p style={{fontSize:13,color:"#6b7280",lineHeight:1.6,margin:0}}>Permanently delete <strong style={{color:"#111827"}}>{account.accountName}</strong>? This cannot be undone.</p>
        </div>
        <div className="va-modal-ft" style={{justifyContent:"center",paddingBottom:18}}>
          <button onClick={onClose} style={{padding:"7px 18px",borderRadius:6,border:"1px solid #e5e7eb",background:"#fff",fontSize:12.5,fontWeight:500,color:"#374151",fontFamily:"'DM Sans',sans-serif",cursor:"pointer"}}>Cancel</button>
          <button onClick={del} disabled={busy} style={{padding:"7px 18px",borderRadius:6,border:"none",background:"#dc2626",color:"#fff",fontSize:12.5,fontWeight:600,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",opacity:busy?.6:1}}>
            {busy?"Deleting…":"Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function ViewAccounts() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [typeF,    setTypeF]    = useState("");
  const [catF,     setCatF]     = useState("");   // sub-category within a type
  const [sortBy,   setSortBy]   = useState("createdAt");
  const [sortDir,  setSortDir]  = useState("desc");
  const [modal,    setModal]    = useState(null);
  const [toast,    setToast]    = useState({ msg:"", type:"" });

  const showToast = (msg, type) => { setToast({msg,type}); setTimeout(()=>setToast({msg:"",type:""}),4000); };

  useEffect(() => {
    (async () => {
      try {
        const r = await authFetch(`${API_BASE_URL}/accounts`);
        const d = await r.json();
        if (r.ok) setAccounts(d); else showToast("Failed to load accounts","error");
      } catch { showToast("Server error","error"); }
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    let f = accounts.filter(a =>
      (!typeF || a.accountType === typeF) &&
      (!catF  || a.category    === catF)  &&
      smartMatch(a, search)
    );
    f.sort((a,b) => {
      let va,vb;
      if (sortBy==="accountName")    { va=(a.accountName||"").toLowerCase();  vb=(b.accountName||"").toLowerCase(); }
      else if (sortBy==="autoAccountId") { va=parseInt((a.autoAccountId||"0").split("-")[1]||0); vb=parseInt((b.autoAccountId||"0").split("-")[1]||0); }
      else if (sortBy==="LedgerRef") { va=(a.LedgerRef||"").toLowerCase(); vb=(b.LedgerRef||"").toLowerCase(); }
      else if (sortBy==="balance")   { va=a.balance||0; vb=b.balance||0; }
      else                           { va=new Date(a.createdAt||0); vb=new Date(b.createdAt||0); }
      if (va<vb) return sortDir==="asc"?-1:1;
      if (va>vb) return sortDir==="asc"?1:-1;
      return 0;
    });
    return f;
  }, [accounts, search, typeF, sortBy, sortDir]);

  const toggleSort = f => { if (sortBy===f) setSortDir(d=>d==="asc"?"desc":"asc"); else { setSortBy(f); setSortDir("asc"); } };
  const SortIco = ({ field }) => sortBy!==field
    ? <span style={{opacity:.3,marginLeft:3}}>↕</span>
    : <span style={{marginLeft:3}}>{sortDir==="asc"?"↑":"↓"}</span>;

  const toggleStar = async id => {
    try {
      const r = await authFetch(`${API_BASE_URL}/accounts/${id}/star`,{method:"PATCH"});
      const d = await r.json();
      if (d.success) { setAccounts(p=>p.map(a=>a._id===id?{...a,starred:d.starred}:a)); showToast(d.starred?"Starred ★":"Unstarred","success"); }
    } catch { showToast("Server error","error"); }
  };

  const typeCounts = TYPE_OPTIONS.reduce((acc,t)=>{acc[t]=accounts.filter(a=>a.accountType===t).length;return acc;},{});

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification message={toast.msg} type={toast.type}/>

      <div className="va">
        {/* Header */}
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}>
          <div>
            <p style={{fontSize:10.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",color:"#065f46",margin:"0 0 2px",fontFamily:"'DM Mono',monospace"}}>Accounts Module</p>
            <h1 style={{fontSize:22,fontWeight:700,color:"#111827",letterSpacing:"-.4px",margin:0}}>Accounts Overview</h1>
          </div>
          <span style={{fontSize:11.5,fontFamily:"'DM Mono',monospace",color:"#6b7280",background:"#fff",border:"1px solid #e5e7eb",borderRadius:7,padding:"5px 12px"}}>
            {filtered.length}{filtered.length!==accounts.length&&` / ${accounts.length}`} account{filtered.length!==1?"s":""}
          </span>
        </div>

        {/* Balance sheet glimpse */}
        {!loading && accounts.length>0 && <BSGlimpse accounts={accounts}/>}

        {/* ── Sticky filter section — sticks below topbar on scroll ── */}
        <div className="va-filter-sticky">
          {/* Type pills */}
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
            {[{label:`All (${accounts.length})`,val:""}, ...TYPE_OPTIONS.map(t=>({label:`${t} (${typeCounts[t]||0})`,val:t}))].map(p=>(
              <button key={p.val} onClick={()=>{ setTypeF(p.val); setCatF(""); }}
                style={{fontSize:11,fontWeight:700,padding:"5px 13px",borderRadius:20,cursor:"pointer",border:`1.5px solid ${typeF===p.val?"#111827":"#e5e7eb"}`,background:typeF===p.val?"#111827":"#fff",color:typeF===p.val?"#fff":"#6b7280",fontFamily:"'DM Sans',sans-serif",transition:"all .12s"}}>
                {p.label}
              </button>
            ))}
          </div>

          {/* ── Sub-category pills — shown when a type is active ── */}
          {typeF && CATEGORY_GROUPS[typeF] && (
            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8,paddingTop:1}}>
              {CATEGORY_GROUPS[typeF].map(cat => {
                const count = accounts.filter(a => a.accountType===typeF && a.category===cat).length;
                if (count === 0) return null;
                const isActive = catF === cat;
                return (
                  <button key={cat}
                    onClick={()=>setCatF(isActive ? "" : cat)}
                    style={{
                      fontSize:10.5,fontWeight:600,padding:"3px 11px",borderRadius:20,cursor:"pointer",
                      border:`1px solid ${isActive ? "#374151" : "#e5e7eb"}`,
                      background:isActive ? "#374151" : "#fff",
                      color:isActive ? "#fff" : "#6b7280",
                      fontFamily:"'DM Sans',sans-serif",transition:"all .1s",
                      display:"flex",alignItems:"center",gap:4,
                    }}>
                    {cat}
                    <span style={{
                      fontSize:9,fontWeight:700,padding:"0 4px",borderRadius:10,
                      background:isActive ? "rgba(255,255,255,.2)" : "#f3f4f6",
                      color:isActive ? "#fff" : "#9ca3af",
                    }}>{count}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Search + sort bar */}
          <div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:9,padding:"10px 13px",display:"flex",flexWrap:"wrap",gap:9,alignItems:"center"}}>
          <div style={{position:"relative",flex:1,minWidth:220}}>
            <svg style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}} width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
              <circle cx={11} cy={11} r={8}/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
            </svg>
            <input className="va-inp" style={{paddingLeft:30}} placeholder="Search name, ref, HBL, Habib Bank…" value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <select className="va-sel" style={{width:"auto",minWidth:160}} value={`${sortBy}:${sortDir}`}
            onChange={e=>{const[f,d]=e.target.value.split(":");setSortBy(f);setSortDir(d);}}>
            <option value="createdAt:desc">Newest First</option>
            <option value="createdAt:asc">Oldest First</option>
            <option value="accountName:asc">Name A→Z</option>
            <option value="accountName:desc">Name Z→A</option>
            <option value="autoAccountId:asc">ID ↑</option>
            <option value="autoAccountId:desc">ID ↓</option>
            <option value="balance:desc">Balance High→Low</option>
            <option value="balance:asc">Balance Low→High</option>
          </select>
          {(search||typeF||catF) && (
            <button onClick={()=>{setSearch("");setTypeF("");setCatF("");}}
              style={{padding:"6px 11px",border:"1px solid #fecaca",borderRadius:6,background:"#fef2f2",fontSize:11.5,fontWeight:600,color:"#dc2626",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
              Clear ✕
            </button>
          )}
          </div>
        </div>{/* end .va-filter-sticky */}

        {/* Table */}
        <div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:10,overflow:"hidden"}}>
          {loading ? (
            <div style={{padding:18}}>
              {[...Array(7)].map((_,i)=>(
                <div key={i} style={{display:"flex",gap:12,marginBottom:11}}>
                  {[50,70,170,100,120,90,60].map((w,j)=><div key={j} className="va-sk" style={{height:12,width:w}}/>)}
                </div>
              ))}
            </div>
          ) : filtered.length===0 ? (
            <div style={{textAlign:"center",padding:"56px 20px",color:"#9ca3af"}}>
              <div style={{fontSize:32,marginBottom:10}}>🗂️</div>
              <p style={{fontSize:13.5,fontWeight:600,color:"#374151",margin:"0 0 4px"}}>No accounts found</p>
              <p style={{fontSize:12.5,margin:0}}>Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="va-scroll-table">
              <table className="va-table">
                <thead>
                  <tr>
                    <th onClick={()=>toggleSort("autoAccountId")}>ID <SortIco field="autoAccountId"/></th>
                    <th onClick={()=>toggleSort("LedgerRef")}>Ref <SortIco field="LedgerRef"/></th>
                    <th onClick={()=>toggleSort("accountName")}>Account Name <SortIco field="accountName"/></th>
                    <th>Category</th>
                    <th>Sub Type</th>
                    <th style={{textAlign:"right",cursor:"pointer"}} onClick={()=>toggleSort("balance")}>Balance <SortIco field="balance"/></th>
                    <th style={{textAlign:"center",width:36,cursor:"default"}}>★</th>
                    <th style={{textAlign:"center",cursor:"default"}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(acc => {
                    const cat = getCatMeta(acc);
                    const bal = acc.balance||0;
                    return (
                      <tr key={acc._id}>
                        <td style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"#9ca3af",cursor:"pointer",whiteSpace:"nowrap"}}
                          onClick={()=>navigate(`/ledger/account/${acc._id}`)}>
                          {acc.autoAccountId ? parseInt(acc.autoAccountId.split("-")[1]||"0") : "—"}
                        </td>
                        <td style={{whiteSpace:"nowrap"}}>
                          {acc.LedgerRef
                            ? <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"#475569"}}>{acc.LedgerRef}</span>
                            : <span style={{fontSize:11,color:"#e2e8f0"}}>—</span>}
                        </td>
                        <td style={{cursor:"pointer",maxWidth:220}} onClick={()=>navigate(`/ledger/account/${acc._id}`)}>
                          <div style={{display:"flex",alignItems:"center",gap:7}}>
                            {acc.category==="Bank" && acc.bankLogoIndex && (
                              <img src={`/${acc.bankLogoIndex}.png`} alt="" style={{width:18,height:18,objectFit:"contain",borderRadius:3,border:"1px solid #e5e7eb",padding:1,flexShrink:0}} onError={e=>e.currentTarget.style.display="none"}/>
                            )}
                            <span style={{fontWeight:600,fontSize:13,color:"#111827",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{acc.accountName}</span>
                          </div>
                          {acc.bankName && <div style={{fontSize:10.5,color:"#9ca3af",fontFamily:"'DM Mono',monospace",marginTop:2}}>{acc.bankName}</div>}
                        </td>
                        <td style={{whiteSpace:"nowrap"}}>
                          {cat
                            ? <span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:10.5,fontWeight:600,color:"#475569",background:"#f1f5f9",padding:"2px 7px",borderRadius:20}}>{cat.icon} {cat.label}</span>
                            : <span style={{fontSize:11,color:"#cbd5e1"}}>—</span>}
                        </td>
                        <td><SubPill sub={acc.subAccountType}/></td>
                        <td style={{textAlign:"right",whiteSpace:"nowrap"}}>
                          <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:700,color:bal>0?"#16a34a":bal<0?"#dc2626":"#9ca3af"}}>
                            {bal===0?"—":`Rs ${Math.abs(bal).toLocaleString("en-PK",{maximumFractionDigits:0})}`}
                          </span>
                        </td>
                        <td style={{textAlign:"center"}}>
                          <button className="va-star" onClick={()=>toggleStar(acc._id)} style={{color:acc.starred?"#f59e0b":"#d1d5db"}}>
                            <svg width={15} height={15} viewBox="0 0 24 24" fill={acc.starred?"currentColor":"none"} stroke="currentColor" strokeWidth={acc.starred?0:1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                            </svg>
                          </button>
                        </td>
                        <td style={{textAlign:"center",whiteSpace:"nowrap"}}>
                          <div style={{display:"flex",gap:5,justifyContent:"center",alignItems:"center"}}>
                            {/* Ledger icon — always visible */}
                            <button onClick={()=>navigate(`/ledger/account/${acc._id}`)} title="Open Ledger"
                              style={{width:26,height:26,border:"1px solid #bbf7d0",borderRadius:5,background:"#f0fdf4",color:"#065f46",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                              <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                              </svg>
                            </button>
                            {acc.isProtected ? (
                              <span style={{fontSize:10.5,fontWeight:700,padding:"3px 8px",borderRadius:5,background:"#eff6ff",color:"#1d4ed8",border:"1px solid #bfdbfe"}}>🔒 System</span>
                            ) : acc.isProductAccount ? (
                              <button className="va-btn" style={{background:"#fefce8",color:"#92400e",border:"1px solid #fde68a"}} onClick={()=>setModal({type:"edit",account:acc})}>Rename</button>
                            ) : (
                              <>
                                <button className="va-btn" style={{background:"#fefce8",color:"#92400e",border:"1px solid #fde68a"}} onClick={()=>setModal({type:"edit",account:acc})}>Edit</button>
                                <button className="va-btn" style={{background:"#fef2f2",color:"#dc2626",border:"1px solid #fecaca"}} onClick={()=>setModal({type:"delete",account:acc})}>
                                  <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {!loading && filtered.length>0 && (
          <p style={{textAlign:"center",fontSize:11.5,color:"#9ca3af",marginTop:13,fontFamily:"'DM Mono',monospace"}}>
            {filtered.length} account{filtered.length!==1?"s":""}{filtered.length!==accounts.length&&` filtered from ${accounts.length} total`}
          </p>
        )}
      </div>

      {modal?.type==="edit"   && <EditModal   account={modal.account} onClose={()=>setModal(null)} onSaved={(id,f)=>setAccounts(p=>p.map(a=>a._id===id?{...a,...f}:a))} showToast={showToast}/>}
      {modal?.type==="delete" && <DeleteModal account={modal.account} onClose={()=>setModal(null)} onDeleted={id=>setAccounts(p=>p.filter(a=>a._id!==id))} showToast={showToast}/>}
    </SidebarLayout>
  );
}