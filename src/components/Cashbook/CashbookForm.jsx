import React, { useState, useEffect, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";
import Notification from "../Notification";

// ─── Inline SearchableAccountSelect ──────────────────────────────────────────
function SearchableAccountSelect({ accounts, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);
  const containerRef = useRef(null);

  const filtered = accounts.filter((a) =>
    a.accountName.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm truncate"
      >
        {value || <span className="text-gray-400">Select Account</span>}
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg overflow-hidden">
          <div className="p-2 border-b bg-gray-50">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search accounts..."
              className="w-full text-sm px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <ul className="max-h-48 overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-gray-400">No accounts found</li>
            ) : (
              filtered.map((a) => (
                <li
                  key={a._id}
                  onClick={() => {
                    onChange(a.accountName);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
                    value === a.accountName ? "bg-blue-100 font-medium" : ""
                  }`}
                >
                  {a.accountName}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CashbookForm() {
  const [accounts, setAccounts] = useState([]);
  const [openingRequired, setOpeningRequired] = useState(null); // null = loading
  const [cashMode, setCashMode] = useState("debit");
  const [openingBalance, setOpeningBalance] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [openingBalanceInput, setOpeningBalanceInput] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "info" });
  const [submittingOpening, setSubmittingOpening] = useState(false);

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    entries: [{ account: "", description: "", amount: "" }],
    comment: "",
  });

  useEffect(() => {
    fetchAccounts();
    checkOpeningBalance();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/accounts`);
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { throw new Error("Invalid server response"); }
      if (!res.ok) throw new Error(data.message || "Failed to fetch accounts");
      setAccounts(data);
    } catch (err) {
      setNotification({ message: err.message, type: "error" });
    }
  };

  const checkOpeningBalance = async () => {
    try {
      // ✅ Use /cashbook-report which returns { cashbooks: [...], currentBalance }
      const res = await authFetch(`${API_BASE_URL}/cashbook-report`);
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { throw new Error("Invalid server response"); }
      if (!res.ok) throw new Error(data.message || "Failed to load cashbook");

      const year = new Date().getFullYear();
      const cb = data.cashbooks?.find((cb) => cb.year === year);

      if (cb) {
        setOpeningBalance(cb.openingBalance);
        // Use live balance from account if provided, else fall back to opening
        setCurrentBalance(
          data.currentBalance !== undefined && data.currentBalance !== null
            ? data.currentBalance
            : cb.openingBalance
        );
        setOpeningRequired(false);
      } else {
        setOpeningRequired(true);
      }
    } catch (err) {
      setNotification({ message: err.message, type: "error" });
      setOpeningRequired(true); // default to gate so user isn't stuck on loader
    }
  };

  const handleSetOpeningBalance = async () => {
    const val = Number(openingBalanceInput);
    if (!val || val <= 0) {
      setNotification({ message: "Opening balance must be greater than 0.", type: "error" });
      return;
    }
    setSubmittingOpening(true);
    try {
      const year = new Date().getFullYear();
      const res = await authFetch(`${API_BASE_URL}/cashbook-entry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year, openingBalance: val }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to set opening balance");
      setOpeningBalance(val);
      setCurrentBalance(data.currentBalance ?? val);
      setOpeningRequired(false);
      setNotification({ message: "Opening balance set successfully!", type: "success" });
    } catch (err) {
      setNotification({ message: err.message, type: "error" });
    } finally {
      setSubmittingOpening(false);
    }
  };

  // Auto-computed cash amount = sum of all entry amounts
  const totalAmount = form.entries.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const balanced = totalAmount > 0;

  // Preview balance after entry:
  // Cash Debited = cash going OUT → subtract from balance
  // Cash Credited = cash coming IN → add to balance
  const projectedBalance =
    cashMode === "debit"
      ? currentBalance - totalAmount
      : currentBalance + totalAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!balanced) {
      setNotification({ message: "Please add at least one entry with an amount.", type: "error" });
      return;
    }

    try {
      const CASH_ACCOUNT_ID = "692fca6790d96dd63e44b12a";

      let debitAccount, debitAmount, debitLineDesc;
      let creditEntries = [];

      if (cashMode === "debit") {
        // Cash Debited = cash going OUT → debit expense/other, credit cash
        const firstAccount = accounts.find(
          (a) => a.accountName === form.entries[0].account
        );
        if (!firstAccount) throw new Error("Counter account not selected");
        debitAccount = firstAccount._id;
        debitAmount = totalAmount;
        debitLineDesc = form.entries[0].description || "Cash Payment";
        creditEntries = [
          { account: CASH_ACCOUNT_ID, amount: totalAmount, description: "Cash Paid" },
        ];
      } else {
        // Cash Credited = cash coming IN → debit cash, credit income/other
        debitAccount = CASH_ACCOUNT_ID;
        debitAmount = totalAmount;
        debitLineDesc = "Cash Received";
        creditEntries = form.entries.map((row) => {
          const acc = accounts.find((a) => a.accountName === row.account);
          if (!acc) throw new Error(`Account not found: ${row.account}`);
          return {
            account: acc._id,
            amount: Number(row.amount),
            description: row.description,
          };
        });
      }

      const payload = {
        entryDate: form.date,
        comments: form.comment,
        debitAccount,
        debitAmount,
        debitLineDesc,
        creditEntries,
      };

      const response = await authFetch(`${API_BASE_URL}/create-journal-entry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      let data;
      try { data = JSON.parse(text); } catch { data = {}; }
      if (!response.ok) throw new Error(data.message || "Failed to create entry");

      setNotification({ message: "Journal Entry Created Successfully!", type: "success" });

      // Use server-returned balance if available, else update locally
      if (data.currentBalance !== undefined) {
        setCurrentBalance(data.currentBalance);
      } else {
        setCurrentBalance((prev) =>
          cashMode === "debit" ? prev - totalAmount : prev + totalAmount
        );
      }

      setForm((prev) => ({
        ...prev,
        entries: [{ account: "", description: "", amount: "" }],
        comment: "",
      }));
    } catch (err) {
      setNotification({ message: err.message, type: "error" });
    }
  };

  // ── Loading ──
  if (openingRequired === null) {
    return (
      <SidebarLayout>
        <div className="max-w-5xl mx-auto flex items-center justify-center h-48 text-gray-400 text-sm">
          Loading cashbook data...
        </div>
      </SidebarLayout>
    );
  }

  // ── Opening Balance Gate ──
  if (openingRequired) {
    return (
      <SidebarLayout>
        <div className="max-w-md mx-auto mt-20">
          <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">Set Opening Balance</h1>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                No cashbook found for <strong>{new Date().getFullYear()}</strong>.<br />
                Set your opening cash balance to get started.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Opening Balance (Cash In Hand)
              </label>
              <input
                type="number"
                placeholder="e.g. 50000"
                value={openingBalanceInput}
                onChange={(e) => setOpeningBalanceInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSetOpeningBalance()}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-lg font-semibold"
                autoFocus
              />
            </div>

            <button
              onClick={handleSetOpeningBalance}
              disabled={submittingOpening || !openingBalanceInput}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {submittingOpening ? "Setting..." : "Set Opening Balance & Continue →"}
            </button>
          </div>
        </div>

        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "info" })}
        />
      </SidebarLayout>
    );
  }

  // ── Main Cashbook Form ──
  const cashAmountLabel =
    cashMode === "debit"
      ? "Cash Out (Being Debited)"
      : "Cash In (Being Credited)";

  return (
    <SidebarLayout>
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">

          {/* Header */}
          <div className="border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">Cashbook Entry</h1>
            <p className="text-sm text-gray-500 mt-1">
              Record cash transactions with automatic balance control.
            </p>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-400 mb-1">
                Opening Balance
              </p>
              <p className="text-xl font-bold text-blue-700">
                {Number(openingBalance).toLocaleString()}
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400 mb-1">
                Current Balance
              </p>
              <p className="text-xl font-bold text-emerald-700">
                {Number(currentBalance).toLocaleString()}
              </p>
            </div>

            <div
              className={`border rounded-xl p-4 transition-colors ${
                totalAmount > 0
                  ? cashMode === "credit"
                    ? "bg-green-50 border-green-100"
                    : "bg-orange-50 border-orange-100"
                  : "bg-gray-50 border-gray-100"
              }`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                  totalAmount > 0
                    ? cashMode === "credit" ? "text-green-400" : "text-orange-400"
                    : "text-gray-400"
                }`}
              >
                Balance After Entry
              </p>
              <p
                className={`text-xl font-bold ${
                  totalAmount > 0
                    ? cashMode === "credit" ? "text-green-700" : "text-orange-700"
                    : "text-gray-400"
                }`}
              >
                {totalAmount > 0 ? Number(projectedBalance).toLocaleString() : "—"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Top Row: Date + Mode Toggle + Auto Amount */}
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-none">
                <label className="block text-sm font-medium mb-1 text-gray-600">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex-none">
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Cash Direction
                </label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setCashMode("debit")}
                    className={`px-5 py-1.5 rounded-lg text-sm font-medium transition ${
                      cashMode === "debit" ? "bg-white shadow text-blue-600" : "text-gray-500"
                    }`}
                  >
                    Cash Debited
                  </button>
                  <button
                    type="button"
                    onClick={() => setCashMode("credit")}
                    className={`px-5 py-1.5 rounded-lg text-sm font-medium transition ${
                      cashMode === "credit" ? "bg-white shadow text-blue-600" : "text-gray-500"
                    }`}
                  >
                    Cash Credited
                  </button>
                </div>
              </div>

              <div className="flex-none">
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  {cashAmountLabel}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={totalAmount > 0 ? totalAmount.toLocaleString() : ""}
                    readOnly
                    placeholder="Auto"
                    className="w-36 border rounded-lg px-3 py-2 bg-gray-50 cursor-not-allowed text-gray-700 font-semibold text-sm focus:outline-none"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 bg-gray-200 rounded px-1 select-none">
                    auto
                  </span>
                </div>
              </div>
            </div>

            {/* Counter Account Entries */}
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-gray-700">Counter Accounts</h2>

              {form.entries.map((row, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-3 gap-3 bg-gray-50 p-3 rounded-lg"
                >
                  <SearchableAccountSelect
                    accounts={accounts}
                    value={row.account}
                    onChange={(selected) => {
                      const updated = [...form.entries];
                      updated[index].account = selected;
                      setForm({ ...form, entries: updated });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={row.description}
                    onChange={(e) => {
                      const updated = [...form.entries];
                      updated[index].description = e.target.value;
                      setForm({ ...form, entries: updated });
                    }}
                    className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    value={row.amount}
                    onChange={(e) => {
                      const updated = [...form.entries];
                      updated[index].amount = e.target.value;
                      setForm({ ...form, entries: updated });
                    }}
                    className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              ))}

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      entries: [
                        ...form.entries,
                        { account: "", description: "", amount: "" },
                      ],
                    })
                  }
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  + Add Another Line
                </button>

                <button
                  type="submit"
                  disabled={!balanced}
                  className={`px-8 py-2 rounded-lg text-white font-semibold transition text-sm ${
                    balanced
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Save Entry
                </button>
              </div>
            </div>

            {/* Comments */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Comments{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Add any notes or remarks about this entry..."
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
          </form>
        </div>

        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "info" })}
        />
      </div>
    </SidebarLayout>
  );
}