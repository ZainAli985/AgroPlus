import React, { useState, useEffect } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";
import Notification from "../Notification";
import SearchableAccountSelect from "./SearchableAccountSelect.jsx";

export default function CashbookForm() {
  const [accounts, setAccounts] = useState([]);
  const [openingRequired, setOpeningRequired] = useState(false);
  const [cashMode, setCashMode] = useState("debit");
  const [notification, setNotification] = useState({ message: "", type: "info" });

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    openingBalance: "",
    openingDate: "",
    amount: "",
    entries: [{ account: "", description: "", amount: "" }],
    comment: "",
  });

  useEffect(() => {
    fetchAccounts();
    checkOpeningBalance();
  }, []);

  const fetchAccounts = async () => {
    const res = await authFetch(`${API_BASE_URL}/accounts`);
    const data = await res.json();
    setAccounts(data);
  };

  const checkOpeningBalance = async () => {
    const res = await authFetch(`${API_BASE_URL}/cashbook-report`);
    const data = await res.json();
    const year = new Date().getFullYear();
    const cb = data.cashbooks?.find((cb) => cb.year === year);

    if (cb) {
      setForm((prev) => ({
        ...prev,
        openingBalance: cb.openingBalance,
        openingDate: cb.entries?.[0]?.date
          ? new Date(cb.entries[0].date).toISOString().slice(0, 10)
          : prev.date,
      }));
      setOpeningRequired(false);
    } else {
      setOpeningRequired(true);
    }
  };

  const totalAmount = form.entries.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );
  const balanced = Number(form.amount || 0) === totalAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!balanced) {
      setNotification({ message: "Entry not balanced!", type: "error" });
      return;
    }

    try {
      const CASH_ACCOUNT_ID = "692fca6790d96dd63e44b12a";
      const OPENING_BALANCE_ACCOUNT_ID = "692fca6790d96dd63e44b34c";

      // 🔹 Handle opening balance first
      if (openingRequired && Number(form.openingBalance) > 0) {
        const year = new Date().getFullYear();
        const openingPayload = {
          year,
          openingBalance: Number(form.openingBalance),
        };

        await authFetch(`${API_BASE_URL}/cashbook-entry`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(openingPayload),
        });

        setOpeningRequired(false);
        setNotification({ message: "Opening balance set successfully!", type: "success" });
        return; // opening balance is a separate step
      }

      // 🔹 Normal cash entries
      let debitAccount, debitAmount, debitLineDesc;
      let creditEntries = [];

      if (cashMode === "debit") {
        debitAccount = CASH_ACCOUNT_ID;
        debitAmount = Number(form.amount);
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
      } else {
        const firstAccount = accounts.find(
          (a) => a.accountName === form.entries[0].account
        );
        if (!firstAccount) throw new Error("Counter account not selected");

        debitAccount = firstAccount._id;
        debitAmount = Number(form.amount);
        debitLineDesc = form.entries[0].description || "Cash Payment";

        creditEntries = [
          {
            account: CASH_ACCOUNT_ID,
            amount: Number(form.amount),
            description: "Cash Paid",
          },
        ];
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

      // Reset form entries only, not opening balance
      setForm((prev) => ({
        ...prev,
        amount: "",
        entries: [{ account: "", description: "", amount: "" }],
        comment: "",
      }));
    } catch (err) {
      setNotification({ message: err.message, type: "error" });
    }
  };

  return (
    <SidebarLayout>
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-8">

          <div className="border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Cashbook Entry
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Record cash transactions with automatic balance control.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Opening Balance */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Opening Balance
                </label>
                {openingRequired ? (
                  <input
                    type="number"
                    placeholder="Enter opening balance"
                    value={form.openingBalance}
                    onChange={(e) =>
                      setForm({ ...form, openingBalance: e.target.value })
                    }
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                ) : (
                  <input
                    type="number"
                    value={form.openingBalance}
                    readOnly
                    className="w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
                  />
                )}
                {!openingRequired && form.openingDate && (
                  <p className="text-sm text-gray-500 mt-1">
                    Set on: {form.openingDate}
                  </p>
                )}
              </div>
            </div>

            {/* Cash Mode Toggle */}
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-600">
                Cash Direction
              </label>
              <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
                <button
                  type="button"
                  onClick={() => setCashMode("debit")}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition ${cashMode === "debit"
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-500"
                    }`}
                >
                  Cash Debited
                </button>
                <button
                  type="button"
                  onClick={() => setCashMode("credit")}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition ${cashMode === "credit"
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-500"
                    }`}
                >
                  Cash Credited
                </button>
              </div>
            </div>

            {/* Cash Amount */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Cash Amount
              </label>
              <input
                type="number"
                placeholder="Enter cash amount"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                disabled={openingRequired} // disable if opening balance is required first
              />
            </div>

            {/* Entries */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Counter Accounts
              </h2>

              {form.entries.map((row, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg"
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
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
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
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              ))}

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
            </div>

            {/* Summary */}
            <div className="bg-gray-100 rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Cash Amount</p>
                <p className="font-semibold">{form.amount || 0}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Total Other</p>
                <p className="font-semibold">{totalAmount}</p>
              </div>

              <div>
                {balanced ? (
                  <span className="text-green-600 font-semibold">
                    Balanced ✓
                  </span>
                ) : (
                  <span className="text-red-500 font-semibold">
                    Not Balanced
                  </span>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="text-right">
              <button
                type="submit"
                disabled={openingRequired && !form.openingBalance}
                className={`px-8 py-2 rounded-lg text-white font-semibold transition ${balanced
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                Save Entry
              </button>
            </div>
          </form>
        </div>

        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() =>
            setNotification({ message: "", type: "info" })
          }
        />
      </div>
    </SidebarLayout>
  );
}