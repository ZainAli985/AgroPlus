import React, { useState, useEffect, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";
import Notification from "../Notification.jsx";

export default function CashbookForm() {
  const [accounts, setAccounts] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("info");
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    openingBalance: "",
    debitLineDesc: "",
    debitAccount: "692fca6790d96dd63e44b12a",
    debitAmount: "",
    creditEntries: [
      { lineDesc: "", account: "", amount: "", open: false, search: "" }
    ],
    comment: "",
  });

  const [debitDropdownOpen, setDebitDropdownOpen] = useState(false);
  const [debitSearch, setDebitSearch] = useState("");
  const [debitActiveIndex, setDebitActiveIndex] = useState(0);

  const debitAmountRef = useRef();
  const debitDescRef = useRef();
  const debitSearchRef = useRef();
  const debitListRef = useRef();
  const creditAmountRefs = useRef([]);
  const creditSearchRefs = useRef([]);
  const creditListRefs = useRef([]);
  const commentsRef = useRef();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const res = await authFetch(`${API_BASE_URL}/accounts`);
    const data = await res.json();
    setAccounts(data);
  };

  const filterAccounts = (search) =>
    accounts.filter((a) => a.accountName.toLowerCase().includes(search.toLowerCase()));

  const calcTotalCredit = () =>
    form.creditEntries.reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);

  const balanced = Math.round((parseFloat(form.debitAmount || 0) - calcTotalCredit()) * 100) === 0;

  // Handle credit field changes
  const handleCreditChange = (index, field, value) => {
    const updated = [...form.creditEntries];
    updated[index][field] = value;
    setForm({ ...form, creditEntries: updated });
  };

  // Add a new credit row
  const addCreditRow = () => {
    setForm({
      ...form,
      creditEntries: [
        ...form.creditEntries,
        { lineDesc: "", account: "", amount: "", open: false, search: "" }
      ]
    });
    setNotificationMessage("New credit line added");
    setNotificationType("info");
  };

  // Delete a credit row
  const deleteCreditRow = (index) => {
    if (form.creditEntries.length === 1) {
      setNotificationMessage("Cannot delete the last credit line");
      setNotificationType("warning");
      return;
    }

    const updated = form.creditEntries.filter((_, i) => i !== index);
    setForm({ ...form, creditEntries: updated });
    setNotificationMessage("Credit line removed");
    setNotificationType("info");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if debit and total credit are balanced
    if (!balanced) {
      setNotificationMessage("Cannot save! Debit and total Credit are not balanced.");
      setNotificationType("error");
      return;
    }

    const transactions = form.creditEntries.map((row) => ({
      date: form.date,
      account: row.account,
      description: row.lineDesc,
      debit: 0,
      credit: parseFloat(row.amount || 0)
    }));

    // Add debit transaction at the start
    transactions.unshift({
      date: form.date,
      account: form.debitAccount,
      description: form.debitLineDesc,
      debit: parseFloat(form.debitAmount || 0),
      credit: 0
    });

    const payload = {
      date: form.date,
      openingBalance: parseFloat(form.openingBalance || 0),
      transactions,
      comment: form.comment
    };

    try {
      const res = await authFetch(`${API_BASE_URL}/cashbook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        setNotificationMessage("Cashbook saved successfully!");
        setNotificationType("success");

        // Optionally reset form after save
        setForm({
          date: new Date().toISOString().slice(0, 10),
          openingBalance: "",
          debitLineDesc: "",
          debitAccount: "692fca6790d96dd63e44b12a",
          debitAmount: "",
          creditEntries: [{ lineDesc: "", account: "", amount: "", open: false, search: "" }],
          comment: ""
        });
      } else {
        setNotificationMessage(data.message || "Failed to save cashbook.");
        setNotificationType("error");
      }
    } catch (err) {
      console.error(err);
      setNotificationMessage("Error occurred while saving cashbook.");
      setNotificationType("error");
    }
  };

  return (
    <SidebarLayout>
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
        <h1 className="text-2xl font-bold mb-6">Cashbook Entry</h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Date & Opening Balance */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Date</label>
              <input
                type="date"
                value={form.date}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 transition"
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Opening Balance</label>
              <input
                type="number"
                value={form.openingBalance}
                placeholder="Enter opening balance"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 transition"
                onChange={(e) => setForm({ ...form, openingBalance: e.target.value })}
              />
            </div>
          </div>

          {/* Debit Section */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="font-semibold text-gray-800">Debit</h2>
            <div className="grid md:grid-cols-3 gap-4 items-end">

              {/* Debit Line Description */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Line Description</label>
                <input
                  type="text"
                  ref={debitDescRef}
                  value={form.debitLineDesc}
                  placeholder="Debit line description"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 transition"
                  onChange={(e) => setForm({ ...form, debitLineDesc: e.target.value })}
                />
              </div>

              {/* Debit Account Dropdown */}
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-1">Debit Account *</label>
                <button
                  type="button"
                  className="w-full text-left border border-gray-300 rounded-lg px-4 py-2 bg-white flex justify-between items-center hover:ring-2 hover:ring-blue-400 focus:outline-none transition"
                  onClick={() => setDebitDropdownOpen((p) => !p)}
                >
                  <span>{form.debitAccount ? accounts.find(a => a._id === form.debitAccount)?.accountName : "Select Debit Account"}</span>
                  <span className="text-gray-400">&#9662;</span>
                </button>
                {debitDropdownOpen && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1">
                    <input
                      ref={debitSearchRef}
                      type="text"
                      value={debitSearch}
                      placeholder="Search account..."
                      className="w-full border-b px-3 py-2 text-sm focus:outline-none"
                      onChange={(e) => { setDebitSearch(e.target.value); setDebitActiveIndex(0); }}
                    />
                    {filterAccounts(debitSearch).map((acc, i) => (
                      <div
                        key={acc._id}
                        className={`px-4 py-2 cursor-pointer ${i === debitActiveIndex ? "bg-blue-100" : "hover:bg-blue-50"}`}
                        onClick={() => {
                          setForm({ ...form, debitAccount: acc._id });
                          setDebitDropdownOpen(false);
                          debitAmountRef.current?.focus();
                        }}
                      >
                        {acc.accountName} ({acc.accountType})
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Debit Amount */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Debit Amount *</label>
                <input
                  ref={debitAmountRef}
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.debitAmount}
                  placeholder="Enter debit amount"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 transition"
                  onChange={(e) => setForm({ ...form, debitAmount: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Credit Section */}
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-800">Credit</h2>
            {form.creditEntries.map((entry, index) => (
              <div key={index} className="grid md:grid-cols-3 gap-4 items-end">

                {/* Credit Line Description */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Line Description</label>
                  <input
                    type="text"
                    value={entry.lineDesc}
                    placeholder="Credit line description"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 transition"
                    onChange={(e) => handleCreditChange(index, "lineDesc", e.target.value)}
                  />
                </div>

                {/* Credit Account Dropdown */}
                <div className="relative">
                  <label className="block text-gray-700 font-semibold mb-1">Credit Account *</label>
                  <button
                    type="button"
                    className="w-full text-left border border-gray-300 rounded-lg px-4 py-2 bg-white flex justify-between items-center hover:ring-2 hover:ring-green-400 focus:outline-none transition"
                    onClick={() => handleCreditChange(index, "open", !entry.open)}
                  >
                    <span>{entry.account ? accounts.find(a => a._id === entry.account)?.accountName : "Select Credit Account"}</span>
                    <span className="text-gray-400">&#9662;</span>
                  </button>
                  {entry.open && (
                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1">
                      <input
                        ref={(el) => creditSearchRefs.current[index] = el}
                        type="text"
                        value={entry.search}
                        placeholder="Search account..."
                        className="w-full border-b px-3 py-2 text-sm focus:outline-none"
                        onChange={(e) => handleCreditChange(index, "search", e.target.value)}
                      />
                      {filterAccounts(entry.search).map((acc) => (
                        <div
                          key={acc._id}
                          className="px-4 py-2 cursor-pointer hover:bg-green-50"
                          onClick={() => {
                            handleCreditChange(index, "account", acc._id);
                            handleCreditChange(index, "open", false);
                            creditAmountRefs.current[index]?.focus();
                          }}
                        >
                          {acc.accountName} ({acc.accountType})
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Credit Amount + Delete */}
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <label className="block text-gray-700 font-semibold mb-1">Amount *</label>
                    <input
                      ref={(el) => creditAmountRefs.current[index] = el}
                      type="number"
                      value={entry.amount}
                      placeholder="Enter amount"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 transition"
                      onChange={(e) => handleCreditChange(index, "amount", e.target.value)}
                    />
                  </div>
                  {form.creditEntries.length > 1 && (
                    <button
                      type="button"
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      onClick={() => deleteCreditRow(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              className="text-blue-600 font-semibold hover:underline"
              onClick={addCreditRow}
            >
              + Add Credit Line
            </button>
          </div>

          {/* Comments */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Comments</label>
            <textarea
              ref={commentsRef}
              value={form.comment}
              placeholder="Enter comment"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-400 transition"
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
            />
          </div>

          {/* Summary */}
          <div className="flex justify-between bg-gray-50 p-3 rounded shadow items-center">
            <span>Debit: <b className="text-blue-600">{form.debitAmount || 0}</b></span>
            <span>Credit: <b className="text-green-600">{calcTotalCredit()}</b></span>
            <span>
              {balanced
                ? <span className="text-green-700 font-semibold">Balanced ✓</span>
                : <span className="text-red-600 font-semibold">Not balanced</span>}
            </span>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={!balanced}
              className={`px-12 py-3 rounded-lg font-semibold text-white transition shadow-lg ${balanced
                ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              Save Cashbook
            </button>
          </div>
        </form>
      </div>
    </SidebarLayout>
  );
}