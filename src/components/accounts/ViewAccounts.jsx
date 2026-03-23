import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import StarCheckbox from "../layout/StarIcon.jsx";
import { authFetch } from "../../utils/authFetch.js";

// ── Helpers ───────────────────────────────────────────────────────────────────
const safeDisplay = (value, isDate = false) => {
  if (!value) return "—";
  if (isDate) {
    const d = new Date(value);
    return isNaN(d) ? "—" : d.toLocaleDateString();
  }
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const TYPE_COLORS = {
  Assets:      { bg: "bg-blue-100",   text: "text-blue-700",   dot: "bg-blue-500"   },
  Liabilities: { bg: "bg-red-100",    text: "text-red-700",    dot: "bg-red-500"    },
  Equity:      { bg: "bg-purple-100", text: "text-purple-700", dot: "bg-purple-500" },
  Expense:     { bg: "bg-orange-100", text: "text-orange-700", dot: "bg-orange-500" },
  Revenue:     { bg: "bg-green-100",  text: "text-green-700",  dot: "bg-green-500"  },
};

// ── Account catalogue (mirrors CreateAccount) ─────────────────────────────────
const ACCOUNT_CATALOGUE = [
  { label:"Bank",                  accountType:"Assets",      subAccountType:"Current Assets",      icon:"🏦" },
  { label:"Customer",              accountType:"Assets",      subAccountType:"Current Assets",      icon:"👤" },
  { label:"Inventory",             accountType:"Assets",      subAccountType:"Current Assets",      icon:"📦" },
  { label:"Loan Given",            accountType:"Assets",      subAccountType:"Current Assets",      icon:"💳" },
  { label:"Cash In Hand",          accountType:"Assets",      subAccountType:"Current Assets",      icon:"💵" },
  { label:"Building",              accountType:"Assets",      subAccountType:"Fixed Assets",        icon:"🏢" },
  { label:"Vehicle",               accountType:"Assets",      subAccountType:"Fixed Assets",        icon:"🚛" },
  { label:"Equipment",             accountType:"Assets",      subAccountType:"Fixed Assets",        icon:"⚙️" },
  { label:"Tool",                  accountType:"Assets",      subAccountType:"Fixed Assets",        icon:"🔧" },
  { label:"Furniture",             accountType:"Assets",      subAccountType:"Fixed Assets",        icon:"🪑" },
  { label:"Employee",              accountType:"Liabilities", subAccountType:"Current Liabilities", icon:"👷" },
  { label:"Supplier",              accountType:"Liabilities", subAccountType:"Current Liabilities", icon:"🏭" },
  { label:"Loan Taken",            accountType:"Liabilities", subAccountType:"Current Liabilities", icon:"🏦" },
  { label:"Tax Payable",           accountType:"Liabilities", subAccountType:"Current Liabilities", icon:"🧾" },
  { label:"Accrued Expenses",      accountType:"Liabilities", subAccountType:"Current Liabilities", icon:"📝" },
  { label:"Installments",          accountType:"Liabilities", subAccountType:"Fixed Liabilities",   icon:"📅" },
  { label:"Investor",              accountType:"Equity",      subAccountType:"Equity",              icon:"💼" },
  { label:"Shareholder's Account", accountType:"Equity",      subAccountType:"Shareholders Account",icon:"📊" },
  { label:"Other Income",          accountType:"Revenue",     subAccountType:"Revenue",             icon:"📈" },
  { label:"Expense",               accountType:"Expense",     subAccountType:"Expenses",            icon:"💸" },
];

const CATEGORY_META = {
  "Product":           { label: "Product",            icon: "📦" },
  "Bank":              { label: "Bank",                icon: "🏦" },
  "Customer":          { label: "Customer",            icon: "👤" },
  "Inventory":         { label: "Inventory",           icon: "📦" },
  "Loan Given":        { label: "Loan Given",          icon: "💳" },
  "Cash In Hand":      { label: "Cash In Hand",        icon: "💵" },
  "Building":          { label: "Building",            icon: "🏢" },
  "Vehicle":           { label: "Vehicle",             icon: "🚛" },
  "Equipment":         { label: "Equipment",           icon: "⚙️"  },
  "Tool":              { label: "Tool",                icon: "🔧" },
  "Furniture":         { label: "Furniture",           icon: "🪑" },
  "Employee":          { label: "Employee",            icon: "👷" },
  "Supplier":          { label: "Supplier",            icon: "🏭" },
  "Loan Taken":        { label: "Loan Taken",          icon: "🏦" },
  "Tax Payable":       { label: "Tax Payable",         icon: "🧾" },
  "Accrued Expenses":  { label: "Accrued Expenses",    icon: "📝" },
  "Installments":      { label: "Installments",        icon: "📅" },
  "Investor":          { label: "Investor",            icon: "💼" },
  "Shareholder's Account": { label: "Shareholder's Account", icon: "📊" },
  "Other Income":      { label: "Other Income",        icon: "📈" },
  "Expense":           { label: "Expense",             icon: "💸" },
};

function getCategory(account) {
  // 1. Use stored category field if present — most accurate
  if (account.category) {
    const meta = CATEGORY_META[account.category];
    if (meta) return { ...meta, accountType: account.accountType, subAccountType: account.subAccountType };
    // Unknown category string — still show it
    return { label: account.category, icon: "🏷️", accountType: account.accountType, subAccountType: account.subAccountType };
  }
  // 2. Protected cash account
  if (account.isProtected || account.accountName === "CASH IN HAND") {
    return { label: "Cash In Hand", icon: "💵", accountType: "Assets", subAccountType: "Current Assets" };
  }
  // 3. Product account without category field (legacy)
  if (account.isProductAccount) {
    return { label: "Product", icon: "📦", accountType: "Assets", subAccountType: "Current Assets" };
  }
  // 4. Fallback: match by accountType + subAccountType + name keyword
  const candidates = ACCOUNT_CATALOGUE.filter(
    ca => ca.accountType === account.accountType && ca.subAccountType === account.subAccountType
  );
  if (!candidates.length) return null;
  const nameLower = account.accountName.toLowerCase();
  const byName = candidates.find(ca => nameLower.includes(ca.label.toLowerCase()));
  return byName || null;   // return null if no keyword match — don't guess
}

function TypeBadge({ type }) {
  const c = TYPE_COLORS[type] || { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {type || "—"}
    </span>
  );
}

// ── Edit Modal ────────────────────────────────────────────────────────────────
function EditModal({ account, editForm, onChange, onSave, onCancel, accountTypeOptions, subAccountTypeOptions, onToggleStar }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div style={{background:"#141A1F",padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"2px solid #929183"}}>
          <div>
            <h3 style={{color:"#ffffff",fontWeight:700,fontSize:15,fontFamily:"'DM Sans',sans-serif",margin:0}}>
              {account.isProductAccount ? "Rename Product Account"
                : account.accountName?.includes("Tankhwa") ? "Tankhwa Expense Account"
                : "Edit Account"}
            </h3>
            <p style={{color:"#A5A8A6",fontSize:11,marginTop:2,fontFamily:"'DM Mono',monospace"}}>
              #{safeDisplay(account.autoAccountId)}
              {account.isProductAccount && " · Name only — type is locked"}
              {account.accountName?.includes("Tankhwa") && " · Ledger ref only"}
            </p>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-white transition text-xl leading-none">✕</button>
        </div>

        <div style={{padding:"20px 24px",display:"flex",flexDirection:"column",gap:14}}>
          {/* Account Name — hidden for Tankhwa (only LedgerRef editable) */}
          {!account.accountName?.includes("Tankhwa") && (
            <div>
              <label style={{display:"block",fontSize:9.5,fontWeight:700,color:"#A5A8A6",textTransform:"uppercase",letterSpacing:".12em",marginBottom:6,fontFamily:"'DM Sans',sans-serif"}}>Account Name</label>
              <input
                type="text" name="accountName"
                value={editForm.accountName} onChange={onChange}
                style={{width:"100%",border:"1.5px solid #E3E3E3",borderRadius:9,padding:"9px 14px",fontSize:13,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#141A1F",transition:".12s"}} onFocus={e=>{e.target.style.borderColor="#212A37";e.target.style.boxShadow="0 0 0 3px rgba(33,42,55,.08)"}} onBlur={e=>{e.target.style.borderColor="#E3E3E3";e.target.style.boxShadow="none"}}
              />
            </div>
          )}
          {account.accountName?.includes("Tankhwa") && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700 font-medium">
              💰 Default salary expense account — only Ledger Reference can be changed.
            </div>
          )}

          {/* Ledger Ref — not shown for product accounts */}
          {!account.isProductAccount && (
            <div>
              <label style={{display:"block",fontSize:9.5,fontWeight:700,color:"#A5A8A6",textTransform:"uppercase",letterSpacing:".12em",marginBottom:6,fontFamily:"'DM Sans',sans-serif"}}>Ledger Reference</label>
              <input
                type="text" name="LedgerRef"
                value={editForm.LedgerRef} onChange={onChange}
                style={{width:"100%",border:"1.5px solid #E3E3E3",borderRadius:9,padding:"9px 14px",fontSize:13,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#141A1F",transition:".12s"}} onFocus={e=>{e.target.style.borderColor="#212A37";e.target.style.boxShadow="0 0 0 3px rgba(33,42,55,.08)"}} onBlur={e=>{e.target.style.borderColor="#E3E3E3";e.target.style.boxShadow="none"}}
              />
            </div>
          )}

          {/* Account Type + Sub — locked for product accounts */}
          {!account.isProductAccount && (
            <>
              <div>
                <label style={{display:"block",fontSize:9.5,fontWeight:700,color:"#A5A8A6",textTransform:"uppercase",letterSpacing:".12em",marginBottom:6,fontFamily:"'DM Sans',sans-serif"}}>Account Type</label>
                <select
                  name="accountType" value={editForm.accountType} onChange={onChange}
                  style={{width:"100%",border:"1.5px solid #E3E3E3",borderRadius:9,padding:"9px 14px",fontSize:13,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#141A1F",background:"#fff",transition:".12s"}} onFocus={e=>{e.target.style.borderColor="#212A37"}} onBlur={e=>{e.target.style.borderColor="#E3E3E3"}}
                >
                  <option value="">Select Account Type</option>
                  {accountTypeOptions.map(opt => (
                    <option key={opt.type} value={opt.type}>{opt.type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{display:"block",fontSize:9.5,fontWeight:700,color:"#A5A8A6",textTransform:"uppercase",letterSpacing:".12em",marginBottom:6,fontFamily:"'DM Sans',sans-serif"}}>Sub Account Type</label>
                <select
                  name="subAccountType" value={editForm.subAccountType} onChange={onChange}
                  style={{width:"100%",border:"1.5px solid #E3E3E3",borderRadius:9,padding:"9px 14px",fontSize:13,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#141A1F",background:"#fff",transition:".12s"}} onFocus={e=>{e.target.style.borderColor="#212A37"}} onBlur={e=>{e.target.style.borderColor="#E3E3E3"}}
                >
                  <option value="">Select Sub Account Type</option>
                  {subAccountTypeOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </>
          )}
          {account.isProductAccount && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700 font-medium">
              📦 Product Account — Type and sub-type are locked.<br/>
              <span className="text-emerald-600 text-xs font-normal">Rename here to sync across Products &amp; Invoices.</span>
            </div>
          )}

          {/* Favourite toggle */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
            <div>
              <p className="text-sm font-semibold text-gray-700">Mark as Favourite</p>
              <p className="text-xs text-gray-400 mt-0.5">Starred accounts appear at top</p>
            </div>
            <StarCheckbox
              checked={account.starred}
              onChange={async () => {
                await onToggleStar(account._id);
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{padding:"12px 24px",borderTop:"1px solid #ECECEC",display:"flex",justifyContent:"flex-end",gap:10,background:"#F5F5F5"}}>
          <button onClick={onCancel} style={{padding:"8px 18px",borderRadius:9,border:"1.5px solid #DADADA",background:"#fff",color:"#6E7170",fontSize:12.5,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
            Cancel
          </button>
          <button onClick={onSave} style={{padding:"8px 20px",borderRadius:9,background:"#212A37",color:"#fff",fontSize:12.5,fontWeight:700,border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"background .12s"}} onMouseEnter={e=>e.target.style.background="#141A1F"} onMouseLeave={e=>e.target.style.background="#212A37"}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Modal ──────────────────────────────────────────────────────────────
function DeleteModal({ account, onDelete, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-6 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Account?</h3>
          <p className="text-sm text-gray-500">
            You're about to permanently delete{" "}
            <span className="font-semibold text-gray-800">{account.accountName}</span>.
            This cannot be undone.
          </p>
        </div>
        <div className="px-6 pb-6 flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={onDelete} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ViewAccounts() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  const [sortBy,  setSortBy]  = useState("createdAt"); // "accountName" | "autoAccountId" | "LedgerRef" | "balance" | "createdAt"
  const [sortDir, setSortDir] = useState("desc");        // "asc" | "desc"
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [modalType, setModalType] = useState("");
  const [editForm, setEditForm] = useState({ accountName: "", accountType: "", subAccountType: "", LedgerRef: "" });
  const [accountTypeOptions, setAccountTypeOptions] = useState([]);
  const [subAccountTypeOptions, setSubAccountTypeOptions] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await authFetch(`${API_BASE_URL}/accounts`);
        const data = await res.json();
        if (res.ok) { setAccounts(data); setFilteredAccounts(data); }
        else { setNotificationMessage("Failed to fetch accounts."); setNotificationType("error"); }
      } catch { setNotificationMessage("Server error while fetching accounts."); setNotificationType("error"); }
      finally { setLoading(false); }
    };
    const fetchAccountOptions = async () => {
      try {
        const res = await authFetch(`${API_BASE_URL}/account-options`);
        const data = await res.json();
        setAccountTypeOptions(data.accountTypes || []);
      } catch (e) { console.error("Failed to load account options:", e); }
    };
    fetchAccounts();
    fetchAccountOptions();
  }, []);

  useEffect(() => {
    if (editForm.accountType && accountTypeOptions.length) {
      const selected = accountTypeOptions.find(opt => opt.type === editForm.accountType);
      setSubAccountTypeOptions(selected?.subTypes || []);
      if (!selected?.subTypes.includes(editForm.subAccountType))
        setEditForm(p => ({ ...p, subAccountType: "" }));
    }
  }, [editForm.accountType, accountTypeOptions]);

  useEffect(() => {
    let temp = [...accounts];
    if (filterType) temp = temp.filter(a => a.accountType === filterType);
    if (searchText) {
      const s = searchText.toLowerCase();
      temp = temp.filter(a => Object.values(a).some(v => safeDisplay(v).toLowerCase().includes(s)));
    }
    // Sort
    temp.sort((a, b) => {
      let va, vb;
      if (sortBy === "accountName") { va = (a.accountName||"").toLowerCase(); vb = (b.accountName||"").toLowerCase(); }
      else if (sortBy === "autoAccountId") { va = parseInt((a.autoAccountId||"0").split("-")[1]||"0"); vb = parseInt((b.autoAccountId||"0").split("-")[1]||"0"); }
      else if (sortBy === "LedgerRef") { va = (a.LedgerRef||"").toLowerCase(); vb = (b.LedgerRef||"").toLowerCase(); }
      else if (sortBy === "balance") { va = a.balance||0; vb = b.balance||0; }
      else { va = new Date(a.createdAt||0); vb = new Date(b.createdAt||0); }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredAccounts(temp);
  }, [filterType, searchText, accounts, sortBy, sortDir]);

  const toggleSort = (field) => {
    if (sortBy === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortBy(field); setSortDir("asc"); }
  };
  const SortIcon = ({ field }) => {
    if (sortBy !== field) return <span style={{opacity:.3,marginLeft:3}}>↕</span>;
    return <span style={{marginLeft:3}}>{sortDir==="asc"?"↑":"↓"}</span>;
  };

  const openModal = (account, type) => {
    setSelectedAccount(account);
    setModalType(type);
    if (type === "edit") setEditForm({
      accountName: account.accountName,
      accountType: account.accountType,
      subAccountType: account.subAccountType,
      LedgerRef: account.LedgerRef,
    });
  };

  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/update-account/${selectedAccount._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (data.success) {
        setNotificationMessage("Account updated successfully!"); setNotificationType("success");
        setAccounts(accounts.map(a => a._id === selectedAccount._id ? { ...a, ...editForm } : a));
        setModalType("");
      } else { setNotificationMessage(data.message || "Failed to update"); setNotificationType("error"); }
    } catch { setNotificationMessage("Server error"); setNotificationType("error"); }
  };

  const handleDelete = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/delete-account/${selectedAccount._id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setNotificationMessage("Account deleted successfully!"); setNotificationType("success");
        setAccounts(accounts.filter(a => a._id !== selectedAccount._id));
        setModalType("");
      } else { setNotificationMessage(data.message || "Failed to delete"); setNotificationType("error"); }
    } catch { setNotificationMessage("Server error"); setNotificationType("error"); }
  };

  const handleToggleStar = async (accountId) => {
    try {
      const res = await authFetch(`${API_BASE_URL}/accounts/${accountId}/star`, { method: "PATCH" });
      const data = await res.json();
      if (data.success) {
        setAccounts(accounts.map(a => a._id === accountId ? { ...a, starred: data.starred } : a));
        setNotificationMessage(data.starred ? "Account starred!" : "Account unstarred!");
        setNotificationType("success");
        if (selectedAccount?._id === accountId)
          setSelectedAccount(p => ({ ...p, starred: data.starred }));
      } else { setNotificationMessage("Failed to update starred status"); setNotificationType("error"); }
    } catch { setNotificationMessage("Server error"); setNotificationType("error"); }
  };

  // Summary counts
  const typeCounts = ["Assets", "Liabilities", "Equity", "Expense", "Revenue"].map(t => ({
    type: t, count: accounts.filter(a => a.accountType === t).length,
  }));

  return (
    <>
      <SidebarLayout>
        {/* ── Page Header ── */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
          <div>
            <p style={{fontSize:10,fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:"#929183",marginBottom:4,fontFamily:"'DM Sans',sans-serif"}}>Accounts Module</p>
            <h1 style={{fontSize:24,fontWeight:700,color:"#0B0C0D",letterSpacing:"-.4px",fontFamily:"'Cormorant Garamond',serif"}}>Accounts Overview</h1>
          </div>
          <span style={{fontSize:11,fontFamily:"'DM Mono',monospace",color:"#6E7170",background:"#fff",border:"1.5px solid #DADADA",borderRadius:10,padding:"5px 12px",fontWeight:500}}>
            {filteredAccounts.length} account{filteredAccounts.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── Type summary pills — ORCA ── */}
        <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:20}}>
          {[{label:`All (${accounts.length})`, value:""}, ...typeCounts.map(t=>({label:`${t.type} (${t.count})`, value:t.type}))].map(pill => (
            <button key={pill.value} onClick={() => setFilterType(pill.value)}
              style={{
                fontSize:11, fontWeight:700, padding:"5px 13px", borderRadius:20,
                border:`1.5px solid ${filterType===pill.value ? "#212A37" : "#DADADA"}`,
                background: filterType===pill.value ? "#212A37" : "#fff",
                color: filterType===pill.value ? "#fff" : "#6E7170",
                cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all .12s",
              }}>
              {pill.label}
            </button>
          ))}
        </div>

        {/* ── Search + Filter bar — ORCA ── */}
        <div style={{background:"#fff",borderRadius:12,border:"1.5px solid #E3E3E3",padding:"10px 14px",marginBottom:14,display:"flex",flexWrap:"wrap",gap:8,alignItems:"center",boxShadow:"0 1px 4px rgba(11,12,13,.04)"}}>
          <div style={{position:"relative",flex:1,minWidth:200}}>
            <svg style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#A5A8A6",pointerEvents:"none"}} width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"/>
            </svg>
            <input type="text" placeholder="Search by name, type, ledger ref…"
              value={searchText} onChange={e => setSearchText(e.target.value)}
              style={{width:"100%",paddingLeft:30,paddingRight:10,paddingTop:7,paddingBottom:7,border:"1.5px solid #E3E3E3",borderRadius:8,fontSize:12.5,outline:"none",fontFamily:"'DM Sans',sans-serif",color:"#141A1F",transition:".12s"}}
              onFocus={e=>{e.target.style.borderColor="#212A37";e.target.style.boxShadow="0 0 0 3px rgba(33,42,55,.08)"}}
              onBlur={e=>{e.target.style.borderColor="#E3E3E3";e.target.style.boxShadow="none"}}/>
          </div>
          <select value={filterType} onChange={e => setFilterType(e.target.value)}
            style={{padding:"7px 10px",border:"1.5px solid #E3E3E3",borderRadius:8,fontSize:12.5,outline:"none",background:"#fff",fontFamily:"'DM Sans',sans-serif",color:"#334455"}}>
            <option value="">All Types</option>
            {["Assets","Liabilities","Equity","Expense","Revenue"].map(t=><option key={t} value={t}>{t}</option>)}
          </select>
          <select value={`${sortBy}:${sortDir}`} onChange={e=>{const[f,d]=e.target.value.split(":");setSortBy(f);setSortDir(d);}}
            style={{padding:"7px 10px",border:"1.5px solid #E3E3E3",borderRadius:8,fontSize:12.5,outline:"none",background:"#fff",fontFamily:"'DM Sans',sans-serif",color:"#334455"}}>
            <option value="createdAt:desc">Newest First</option>
            <option value="createdAt:asc">Oldest First</option>
            <option value="accountName:asc">Name A→Z</option>
            <option value="accountName:desc">Name Z→A</option>
            <option value="autoAccountId:asc">ID Ascending</option>
            <option value="autoAccountId:desc">ID Descending</option>
            <option value="balance:desc">Balance High→Low</option>
            <option value="balance:asc">Balance Low→High</option>
          </select>
          {(searchText || filterType) && (
            <button onClick={()=>{setSearchText("");setFilterType("");}}
              style={{padding:"7px 12px",border:"1.5px solid #fecaca",borderRadius:8,background:"#fef2f2",fontSize:12,fontWeight:600,color:"#dc2626",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
              Clear ✕
            </button>
          )}
          <span style={{marginLeft:"auto",fontSize:11,fontFamily:"'DM Mono',monospace",color:"#A5A8A6"}}>
            {filteredAccounts.length} shown
          </span>
        </div>

        {/* ── Table ── */}
        <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E3E3E3",overflow:"hidden",boxShadow:"0 2px 8px rgba(11,12,13,.05)"}}>
          {loading ? (
            <div style={{padding:20}}>
              {[...Array(6)].map((_,i)=>(
                <div key={i} style={{display:"flex",gap:12,marginBottom:10}}>
                  {[60,80,160,120,100,70].map((w,j)=>(
                    <div key={j} style={{height:12,borderRadius:6,background:"#F5F5F5",width:w,animation:"shimmer 1.4s infinite",backgroundImage:"linear-gradient(90deg,#F5F5F5 25%,#ECECEC 50%,#F5F5F5 75%)",backgroundSize:"200% 100%"}}/>
                  ))}
                </div>
              ))}
              <style>{`@keyframes shimmer{to{background-position:-200% 0}}`}</style>
            </div>
          ) : filteredAccounts.length === 0 ? (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",textAlign:"center"}}>
              <div style={{fontSize:36,marginBottom:10}}>🗂️</div>
              <p style={{fontSize:13,fontWeight:700,color:"#334455",marginBottom:4,fontFamily:"'DM Sans',sans-serif"}}>No accounts found</p>
              <p style={{fontSize:12,color:"#A5A8A6",fontFamily:"'DM Sans',sans-serif"}}>Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th style={{padding:"9px 10px",textAlign:"left",fontSize:10,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".06em",cursor:"pointer",userSelect:"none",whiteSpace:"nowrap"}}
                      onClick={() => toggleSort("autoAccountId")}>
                      ID <SortIcon field="autoAccountId"/>
                    </th>
                    <th style={{padding:"9px 10px",textAlign:"left",fontSize:10,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".06em",cursor:"pointer",userSelect:"none",whiteSpace:"nowrap"}}
                      onClick={() => toggleSort("LedgerRef")}>
                      Ref <SortIcon field="LedgerRef"/>
                    </th>
                    <th style={{padding:"9px 10px",textAlign:"left",fontSize:10,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".06em",cursor:"pointer",userSelect:"none"}}
                      onClick={() => toggleSort("accountName")}>
                      Account Name <SortIcon field="accountName"/>
                    </th>
                    <th style={{padding:"9px 10px",textAlign:"left",fontSize:10,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".06em",whiteSpace:"nowrap"}}>Category</th>
                    <th style={{padding:"9px 10px",textAlign:"left",fontSize:10,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".06em",whiteSpace:"nowrap"}}>Sub Type</th>
                    <th style={{padding:"9px 10px",textAlign:"right",fontSize:10,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".06em",cursor:"pointer",userSelect:"none",whiteSpace:"nowrap"}}
                      onClick={() => toggleSort("balance")}>
                      Balance <SortIcon field="balance"/>
                    </th>
                    <th style={{padding:"9px 8px",textAlign:"center",fontSize:10,fontWeight:700,color:"#94a3b8",width:32}}>
                      <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{display:"inline"}}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                      </svg>
                    </th>
                    <th style={{padding:"9px 10px",textAlign:"center",fontSize:10,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".06em",whiteSpace:"nowrap"}}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredAccounts.map((acc) => {
                    const cat = getCategory(acc);
                    return (
                    <tr key={acc._id}
                      className="hover:bg-gray-50 transition-colors group"
                      style={{cursor:"default"}}>
                      <td style={{padding:"8px 10px",fontSize:11,color:"#94a3b8",fontFamily:"monospace",cursor:"pointer",whiteSpace:"nowrap"}}
                        onClick={() => navigate(`/ledger/account/${acc._id}`)}>
                        {acc.autoAccountId ? parseInt(acc.autoAccountId.split("-")[1] || "0") : "—"}
                      </td>
                      <td style={{padding:"8px 10px",whiteSpace:"nowrap"}}>
                        {acc.LedgerRef ? (
                          <span style={{fontSize:11,color:"#475569",fontFamily:"monospace"}}>{acc.LedgerRef}</span>
                        ) : (
                          <span style={{fontSize:11,color:"#e2e8f0"}}>—</span>
                        )}
                        <button onClick={() => navigate(`/ledger/account/${acc._id}`)}
                          title="Open Ledger"
                          style={{display:"inline-flex",alignItems:"center",gap:2,marginLeft:5,
                            fontSize:9,fontWeight:700,color:"#6366f1",padding:"1px 5px",borderRadius:5,
                            background:"#eef2ff",border:"1px solid #c7d2fe",cursor:"pointer",
                            whiteSpace:"nowrap",verticalAlign:"middle"}}>
                          <svg width={8} height={8} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                          </svg>
                          Ledger
                        </button>
                      </td>
                      <td style={{padding:"8px 10px",cursor:"pointer",maxWidth:220}}
                        onClick={() => navigate(`/ledger/account/${acc._id}`)}>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          {acc.category === "Bank" && acc.bankLogoIndex && (
                            <img src={`/${acc.bankLogoIndex}.png`} alt="bank"
                              style={{width:18,height:18,objectFit:"contain",borderRadius:3,
                                border:"1px solid #e2e8f0",background:"#fff",padding:1,flexShrink:0}}
                              onError={e => e.currentTarget.style.display="none"}/>
                          )}
                          <span style={{fontWeight:600,fontSize:12.5,color:"#111827",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                            {safeDisplay(acc.accountName)}
                          </span>
                
                        </div>
                      </td>
                      <td style={{padding:"8px 10px",whiteSpace:"nowrap"}}>
                        {acc.isProductAccount ? (
                          <span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:10.5,fontWeight:700,
                            background:"#f0fdf4",color:"#065f46",border:"1px solid #bbf7d0",padding:"2px 7px",borderRadius:20}}>
                            📦 Product
                          </span>
                        ) : cat ? (
                          <span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:10.5,fontWeight:600,
                            color:"#475569",background:"#f1f5f9",padding:"2px 7px",borderRadius:20}}>
                            <span>{cat.icon}</span>{cat.label}
                          </span>
                        ) : (
                          <span style={{fontSize:11,color:"#cbd5e1"}}>—</span>
                        )}
                      </td>
                      <td style={{padding:"8px 10px"}}>
                        {(() => {
                          const subColors = {
                            "Current Assets":       { bg:"#eff6ff", color:"#1d4ed8" },
                            "Fixed Assets":         { bg:"#dbeafe", color:"#1e40af" },
                            "Current Liabilities":  { bg:"#fef2f2", color:"#b91c1c" },
                            "Fixed Liabilities":    { bg:"#fee2e2", color:"#9f1239" },
                            "Equity":               { bg:"#faf5ff", color:"#6d28d9" },
                            "Shareholders Account": { bg:"#ede9fe", color:"#5b21b6" },
                            "Owner's Capital":      { bg:"#f5f3ff", color:"#7c3aed" },
                            "Revenue":              { bg:"#ecfdf5", color:"#065f46" },
                            "Contra Revenue":       { bg:"#d1fae5", color:"#047857" },
                            "Expenses":             { bg:"#fff7ed", color:"#c2410c" },
                          };
                          const st = acc.subAccountType;
                          const sc = subColors[st] || { bg:"#f3f4f6", color:"#374151" };
                          return (
                            <span style={{ display:"inline-block", padding:"2px 7px", borderRadius:20,
                              fontSize:10, fontWeight:700, background:sc.bg, color:sc.color,
                              letterSpacing:".02em", whiteSpace:"nowrap" }}>
                              {st || "—"}
                            </span>
                          );
                        })()}
                      </td>
                      <td style={{padding:"8px 10px",textAlign:"right",whiteSpace:"nowrap"}}>
                        <span style={{
                          fontFamily:"'JetBrains Mono',monospace", fontSize:11.5, fontWeight:700,
                          color: (acc.balance||0) > 0 ? "#16a34a" : (acc.balance||0) < 0 ? "#dc2626" : "#94a3b8"
                        }}>
                          {(acc.balance||0) === 0 ? "—" : `Rs ${Math.abs(acc.balance||0).toLocaleString("en-PK",{minimumFractionDigits:0,maximumFractionDigits:0})}`}
                        </span>

                      </td>
                      <td style={{padding:"8px 8px",textAlign:"center",width:32}}>
                        <button onClick={() => handleToggleStar(acc._id)}
                          style={{ background:"none", border:"none", cursor:"pointer", padding:2,
                            color: acc.starred ? "#f59e0b" : "#d1d5db",
                            transition:"color .15s" }}>
                          <svg width={16} height={16} viewBox="0 0 24 24"
                            fill={acc.starred ? "currentColor" : "none"}
                            stroke="currentColor" strokeWidth={acc.starred ? 0 : 1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                          </svg>
                        </button>
                      </td>
                      <td style={{padding:"8px 10px",textAlign:"center",whiteSpace:"nowrap"}}>
                        {acc.isProtected ? (
                          <span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:10.5,fontWeight:700,padding:"3px 8px",borderRadius:7,background:"#eff6ff",color:"#1d4ed8",border:"1px solid #bfdbfe"}}>
                            🔒 System
                          </span>
                        ) : acc.isProductAccount ? (
                          <span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:10,fontWeight:700,
                            padding:"3px 8px",borderRadius:7,background:"#f0fdf4",color:"#15803d",
                            border:"1px solid #bbf7d0"}}>
                            <svg width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                            </svg>
                            Active
                          </span>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => openModal(acc, "edit")}
                              style={{fontSize:10.5,fontWeight:700,padding:"3px 8px",borderRadius:7,background:"#fefce8",color:"#92400e",border:"1px solid #fde68a",cursor:"pointer"}}>Edit</button>
                            <button onClick={() => openModal(acc, "delete")}
                              title="Delete account"
                              style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:26,height:26,borderRadius:7,background:"#fef2f2",color:"#dc2626",border:"1px solid #fecaca",cursor:"pointer",padding:0}}>
                              <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Modals ── */}
        {modalType === "edit" && selectedAccount && (
          <EditModal
            account={selectedAccount}
            editForm={editForm}
            onChange={handleEditChange}
            onSave={handleUpdate}
            onCancel={() => setModalType("")}
            accountTypeOptions={accountTypeOptions}
            subAccountTypeOptions={subAccountTypeOptions}
            onToggleStar={handleToggleStar}
          />
        )}
        {modalType === "delete" && selectedAccount && (
          <DeleteModal
            account={selectedAccount}
            onDelete={handleDelete}
            onCancel={() => setModalType("")}
          />
        )}
      </SidebarLayout>

      <Notification message={notificationMessage} type={notificationType} />
    </>
  );
}