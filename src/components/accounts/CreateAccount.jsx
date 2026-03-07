import React, { useState, useEffect } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import SidebarLayout from "../layout/SidebarLayout.jsx";

// ── Type config (colors match ViewAccounts) ───────────────────────────────────
const TYPE_CONFIG = {
  Assets:      { color: "blue",   icon: "🏦", desc: "Cash, receivables, property" },
  Liabilities: { color: "red",    icon: "📋", desc: "Payables, loans, obligations" },
  Equity:      { color: "purple", icon: "💼", desc: "Owner's capital, retained earnings" },
  Expense:     { color: "orange", icon: "💸", desc: "Operating costs, overheads" },
  Revenue:     { color: "green",  icon: "📈", desc: "Sales, income, earnings" },
};

const TYPE_STYLES = {
  blue:   { card: "border-blue-200 bg-blue-50",   active: "border-blue-500 bg-blue-50 ring-2 ring-blue-500", dot: "bg-blue-500",   text: "text-blue-700"   },
  red:    { card: "border-red-200 bg-red-50",     active: "border-red-500 bg-red-50 ring-2 ring-red-500",   dot: "bg-red-500",    text: "text-red-700"    },
  purple: { card: "border-purple-200 bg-purple-50", active: "border-purple-500 bg-purple-50 ring-2 ring-purple-500", dot: "bg-purple-500", text: "text-purple-700" },
  orange: { card: "border-orange-200 bg-orange-50", active: "border-orange-500 bg-orange-50 ring-2 ring-orange-500", dot: "bg-orange-500", text: "text-orange-700" },
  green:  { card: "border-green-200 bg-green-50", active: "border-green-500 bg-green-50 ring-2 ring-green-500", dot: "bg-green-500",  text: "text-green-700"  },
};

const SUB_ACCOUNT_OPTIONS = {
  Assets:      ["Current Assets", "Fixed Assets"],
  Liabilities: ["Current Liabilities", "Fixed Liabilities"],
  Equity:      ["Equity", "Owner's Capital", "Shareholders Account", "Expense"],
  Revenue:     ["Revenue", "Contra Revenue"],
  Expense:     ["Expenses"],
};

function Field({ label, hint, required, children }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <label className="block text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
        {hint && <span className="text-xs text-gray-400">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

export default function CreateAccount() {
  const [accountType, setAccountType]       = useState("");
  const [subAccountType, setSubAccountType] = useState("");
  const [accountName, setAccountName]       = useState("");
  const [ledgerRef, setLedgerRef]           = useState("");
  const [availableSubs, setAvailableSubs]   = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType]       = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setSubAccountType("");
    setAvailableSubs(accountType ? SUB_ACCOUNT_OPTIONS[accountType] || [] : []);
  }, [accountType]);

  const isValid = accountType && subAccountType && accountName.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      setNotificationMessage("Account Type, Sub Type, and Account Name are required.");
      setNotificationType("warning");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/create-account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountType, subAccountType, accountName, LedgerRef: ledgerRef }),
      });
      const data = await res.json();
      if (res.ok) {
        setNotificationMessage(data.message || "Account created successfully!");
        setNotificationType("success");
        setAccountType(""); setSubAccountType(""); setAccountName(""); setLedgerRef("");
      } else {
        setNotificationMessage(data.message || "Failed to create account.");
        setNotificationType("error");
      }
    } catch {
      setNotificationMessage("Server error. Please try again.");
      setNotificationType("error");
    } finally {
      setSubmitting(false);
    }
  };

  const activeConfig = accountType ? TYPE_CONFIG[accountType] : null;
  const activeStyles = activeConfig ? TYPE_STYLES[activeConfig.color] : null;

  const inp = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-300";

  return (
    <>
      <SidebarLayout>
        <div className="max-w-2xl mx-auto">

          {/* ── Page Header ── */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Accounts Module</p>
            <h1 className="text-2xl font-bold text-gray-800">Create New Account</h1>
            <p className="text-sm text-gray-500 mt-1">Add a new account to your chart of accounts</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {/* ── Step 1: Account Type ── */}
            <div className="px-7 pt-7 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">Select Account Type</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(TYPE_CONFIG).map(([type, cfg]) => {
                  const s = TYPE_STYLES[cfg.color];
                  const isSelected = accountType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setAccountType(type)}
                      className={`text-left border rounded-xl px-4 py-3 transition-all ${
                        isSelected ? s.active : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg leading-none">{cfg.icon}</span>
                        <span className={`text-sm font-bold ${isSelected ? s.text : "text-gray-700"}`}>{type}</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-snug">{cfg.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Step 2: Sub Type (appears after type selected) ── */}
            <div className={`px-7 py-6 border-b border-gray-100 transition-all ${accountType ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${accountType ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-400"}`}>2</div>
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">Sub Account Type</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {(availableSubs.length ? availableSubs : ["—"]).map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    disabled={!accountType}
                    onClick={() => setSubAccountType(sub)}
                    className={`text-sm font-medium px-4 py-2 rounded-xl border transition ${
                      subAccountType === sub
                        ? `${activeStyles?.active || "border-gray-900 bg-gray-900 text-white ring-2 ring-gray-400"}`
                        : "border-gray-200 text-gray-600 bg-white hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Step 3: Account Details ── */}
            <div className={`px-7 py-6 transition-all ${subAccountType ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
              <div className="flex items-center gap-2 mb-5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${subAccountType ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-400"}`}>3</div>
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">Account Details</p>
              </div>

              <div className="space-y-4">
                <Field label="Account Name" required>
                  <input
                    type="text" value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="e.g. Cash in Hand, Trade Payables..."
                    className={inp}
                    disabled={!subAccountType}
                  />
                </Field>

                <Field label="Ledger Reference" hint="Optional">
                  <input
                    type="text" value={ledgerRef}
                    onChange={(e) => setLedgerRef(e.target.value)}
                    placeholder="e.g. ACC-001"
                    className={inp}
                    disabled={!subAccountType}
                  />
                </Field>
              </div>
            </div>

            {/* ── Summary preview + Submit ── */}
            {isValid && (
              <div className="mx-7 mb-7 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Account Preview</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Account Name", accountName],
                    ["Account Type", accountType],
                    ["Sub Type", subAccountType],
                    ["Ledger Ref", ledgerRef || "—"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{k}</p>
                      <p className="text-sm font-semibold text-gray-700 mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="px-7 pb-7">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isValid || submitting}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition ${
                  isValid && !submitting
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account →"
                )}
              </button>
            </div>
          </div>
        </div>
      </SidebarLayout>

      <Notification message={notificationMessage} type={notificationType} />
    </>
  );
}