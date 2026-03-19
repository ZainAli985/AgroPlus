import React, { useEffect, useState } from "react";
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
        <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-base">
              {account.isProductAccount ? "Rename Product Account" : "Edit Account"}
            </h3>
            <p className="text-gray-400 text-xs mt-0.5">
              #{safeDisplay(account.autoAccountId)}
              {account.isProductAccount && " · Name only — type is locked"}
            </p>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-white transition text-xl leading-none">✕</button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Account Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Account Name</label>
            <input
              type="text" name="accountName"
              value={editForm.accountName} onChange={onChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Ledger Ref — not shown for product accounts */}
          {!account.isProductAccount && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Ledger Reference</label>
              <input
                type="text" name="LedgerRef"
                value={editForm.LedgerRef} onChange={onChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          )}

          {/* Account Type + Sub — locked for product accounts */}
          {!account.isProductAccount && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Account Type</label>
                <select
                  name="accountType" value={editForm.accountType} onChange={onChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                >
                  <option value="">Select Account Type</option>
                  {accountTypeOptions.map(opt => (
                    <option key={opt.type} value={opt.type}>{opt.type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Sub Account Type</label>
                <select
                  name="subAccountType" value={editForm.subAccountType} onChange={onChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
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
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onCancel} className="px-5 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-100 transition">
            Cancel
          </button>
          <button onClick={onSave} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition">
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
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

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
    setFilteredAccounts(temp);
  }, [filterType, searchText, accounts]);

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
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Accounts Module</p>
            <h1 className="text-2xl font-bold text-gray-800">Accounts Overview</h1>
          </div>
          <span className="text-sm text-gray-400 bg-white border border-gray-200 rounded-xl px-3 py-1.5 font-medium">
            {filteredAccounts.length} account{filteredAccounts.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── Type summary pills ── */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilterType("")}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition ${
              filterType === "" ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
            }`}
          >
            All ({accounts.length})
          </button>
          {typeCounts.map(({ type, count }) => {
            const c = TYPE_COLORS[type] || {};
            return (
              <button
                key={type}
                onClick={() => setFilterType(filterType === type ? "" : type)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition inline-flex items-center gap-1.5 ${
                  filterType === type
                    ? `${c.bg} ${c.text} border-transparent`
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                {type} ({count})
              </button>
            );
          })}
        </div>

        {/* ── Search + Filter bar ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4 mb-5 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text" placeholder="Search by name, type, ledger ref..."
              value={searchText} onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
          <select
            value={filterType} onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
          >
            <option value="">All Types</option>
            <option value="Assets">Assets</option>
            <option value="Liabilities">Liabilities</option>
            <option value="Equity">Equity</option>
            <option value="Expense">Expense</option>
            <option value="Revenue">Revenue</option>
          </select>
          {(searchText || filterType) && (
            <button
              onClick={() => { setSearchText(""); setFilterType(""); }}
              className="text-sm text-gray-400 hover:text-gray-700 px-3 py-2 rounded-xl hover:bg-gray-100 transition font-medium"
            >
              Clear ✕
            </button>
          )}
        </div>

        {/* ── Table ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="animate-pulse p-6 space-y-3">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-5 bg-gray-100 rounded w-12" />
                  <div className="h-5 bg-gray-100 rounded w-20" />
                  <div className="h-5 bg-gray-100 rounded w-24" />
                  <div className="h-5 bg-gray-100 rounded flex-1" />
                  <div className="h-5 bg-gray-100 rounded w-20" />
                </div>
              ))}
            </div>
          ) : filteredAccounts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-2xl">🗂️</div>
              <p className="text-sm font-semibold text-gray-500">No accounts found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-5 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">ID</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Ledger Ref</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Account Name</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Sub Type</th>
                    <th className="px-5 py-3.5 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">⭐</th>
                    <th className="px-5 py-3.5 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredAccounts.map((acc) => {
                    const cat = getCategory(acc);
                    return (
                    <tr key={acc._id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-5 py-3.5 text-xs text-gray-400 font-mono">{safeDisplay(acc.autoAccountId)}</td>
                      <td className="px-5 py-3.5 text-xs text-gray-500 font-mono">{safeDisplay(acc.LedgerRef)}</td>
                      <td className="px-5 py-3.5">
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          {acc.category === "Bank" && acc.bankLogoIndex && (
                            <img src={`/${acc.bankLogoIndex}.png`} alt="bank"
                              style={{ width:22, height:22, objectFit:"contain", borderRadius:4,
                                border:"1px solid #e2e8f0", background:"#fff", padding:1, flexShrink:0 }}
                              onError={e => e.currentTarget.style.display="none"}/>
                          )}
                          <span className="font-semibold text-gray-800">{safeDisplay(acc.accountName)}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        {acc.isProductAccount ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold"
                            style={{background:"#f0fdf4",color:"#065f46",border:"1px solid #bbf7d0",
                              padding:"2px 9px",borderRadius:20}}>
                            <span>📦</span>Product
                          </span>
                        ) : cat ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                            <span>{cat.icon}</span>{cat.label}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <TypeBadge type={acc.accountType} />
                      </td>
                      <td className="px-5 py-3.5 text-xs text-gray-500">{safeDisplay(acc.subAccountType)}</td>
                      <td className="px-5 py-3.5 text-center">
                        <StarCheckbox
                          checked={acc.starred}
                          onChange={() => handleToggleStar(acc._id)}
                        />
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        {acc.isProtected ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
                            🔒 System Account
                          </span>
                        ) : acc.isProductAccount ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openModal(acc, "edit")}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100 transition"
                              title="Only account name can be changed"
                            >
                              Rename
                            </button>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
                              📦 Product
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openModal(acc, "edit")}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100 transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => openModal(acc, "delete")}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition"
                            >
                              Delete
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