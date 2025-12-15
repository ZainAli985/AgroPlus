import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";

export default function GeneralJournalEntry() {
  const [accounts, setAccounts] = useState([]);
  const [debitAccount, setDebitAccount] = useState("");
  const [debitSearch, setDebitSearch] = useState("");
  const [debitDropdownOpen, setDebitDropdownOpen] = useState(false);

  const [creditEntries, setCreditEntries] = useState([
    { account: "", amount: "", search: "", open: false },
  ]);
  const [entryDate, setEntryDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // yyyy-mm-dd
  });


  const [debitAmount, setDebitAmount] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");

  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  const triggerNotification = (msg, type = "info") => {
    setNotificationMessage("");
    setTimeout(() => {
      setNotificationMessage(msg);
      setNotificationType(type);
    }, 20);
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/accounts`);
        const data = await res.json();
        if (res.ok) setAccounts(data);
        else throw new Error(data?.message || "Failed to fetch accounts");
      } catch (error) {
        console.error(error);
        triggerNotification("Error fetching accounts", "error");
      }
    };
    fetchAccounts();
  }, []);

  const handleAddCreditRow = () => {
    setCreditEntries((prev) => [
      ...prev,
      { account: "", amount: "", search: "", open: false },
    ]);
  };

  const handleDeleteCreditRow = (index) => {
    if (creditEntries.length === 1) {
      triggerNotification("At least one credit entry is required!", "warning");
      return;
    }
    setCreditEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreditChange = (index, field, value) => {
    setCreditEntries((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const calcTotalCredit = () =>
    creditEntries.reduce((sum, c) => {
      const n = parseFloat(String(c.amount).trim()) || 0;
      return sum + n;
    }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!debitAccount || String(debitAmount).trim() === "") {
      triggerNotification("Fill all required fields (*)", "warning");
      return;
    }

    const debit = Number(parseFloat(String(debitAmount).trim()) || 0);
    const totalCredit = Number(calcTotalCredit());

    if (Math.abs(debit - totalCredit) > 0.001) {
      triggerNotification("Debit and Credit amounts must be equal!", "error");
      return;
    }

    for (let i = 0; i < creditEntries.length; i++) {
      const c = creditEntries[i];
      if (!c.account || String(c.amount).trim() === "") {
        triggerNotification("Each credit line requires account and amount", "warning");
        return;
      }
      if (Number(parseFloat(String(c.amount))) <= 0) {
        triggerNotification("Credit amounts must be greater than 0", "warning");
        return;
      }
    }

    const entryData = {
      debitAccount,
      debitAmount: debit,
      creditEntries: creditEntries.map((c) => ({
        account: c.account,
        amount: Number(parseFloat(String(c.amount))),
      })),
      description,
      comments,

      // 🔹 TEMPORARY (for old data posting)
      entryDate,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/create-journal-entry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entryData),
      });

      const data = await res.json();
      if (res.ok) {
        triggerNotification(data.message || "Journal entry created!", "success");
        setDebitAccount("");
        setDebitAmount("");
        setCreditEntries([{ account: "", amount: "", search: "", open: false }]);
        setDescription("");
        setComments("");
      } else {
        throw new Error(data?.message || "Failed to create journal entry");
      }
    } catch (error) {
      console.error(error);
      triggerNotification(error.message || "Server error while creating entry", "error");
    }
  };

  const totalCredit = calcTotalCredit();
  const debitNumeric = Number(parseFloat(String(debitAmount).trim()) || 0);
  const balanced = Math.abs(debitNumeric - totalCredit) <= 0.001;

  const filterAccounts = (query) =>
    accounts.filter(
      (a) =>
        a.accountName.toLowerCase().includes(query.toLowerCase()) ||
        a.accountType.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <SidebarLayout>
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex space-x-4">

        {/* Create Journal Entry */}
        <Link
          to="/general-journal-entry"
          className={`px-4 py-2 rounded-lg font-semibold transition 
      ${location.pathname === "/general-journal-entry"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          ✏️ Create Journal Entry
        </Link>

        {/* View Journal Entries */}
        <Link
          to="/view-general-entries"
          className={`px-4 py-2 rounded-lg font-semibold transition 
      ${location.pathname === "/view-general-entries"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          📋 View Journal Entries
        </Link>

        {/* Ledger */}
        <Link
          to="/ledger"
          className={`px-4 py-2 rounded-lg font-semibold transition 
      ${location.pathname === "/ledger"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          📘 Ledger
        </Link>

      </div>

      {/* Main Form Card */}
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12 space-y-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center tracking-tight">
          General Journal Entry
        </h2>
        {/* Entry Date (Temporary for Old Data Entry) */}
        <div className="flex justify-center">
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-6 py-4 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
            <label className="font-semibold text-blue-800">
              Entry Date
            </label>

            <input
              type="date"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
              className="border border-blue-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-400 transition"
            />

            <span className="text-sm text-blue-600 italic">
              (For posting previous records)
            </span>
          </div>
        </div>


        {/* Summary */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 rounded-lg px-6 py-4 text-gray-700 text-sm md:text-base shadow-inner">
          <span>Debit: <b className="text-blue-600">${debitNumeric.toFixed(2)}</b></span>
          <span>Credit: <b className="text-green-600">${totalCredit.toFixed(2)}</b></span>
          <span>
            {balanced ? (
              <span className="text-green-700 font-semibold">Balanced ✓</span>
            ) : (
              <span className="text-red-600 font-semibold">Not balanced</span>
            )}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Debit Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Debit Account */}
            <div className="relative">
              <label className="block font-semibold text-gray-700 mb-2">
                Debit Account *
              </label>
              <div
                className="border border-gray-300 rounded-lg px-4 py-3 bg-white cursor-pointer hover:ring-2 hover:ring-blue-400 transition flex justify-between items-center"
                onClick={() => setDebitDropdownOpen((p) => !p)}
              >
                <span>
                  {debitAccount
                    ? accounts.find((a) => a._id === debitAccount)?.accountName || "Select Debit Account"
                    : "Select Debit Account"}
                </span>
                <span className="text-gray-400">&#9662;</span>
              </div>
              {debitDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <input
                    type="text"
                    value={debitSearch}
                    onChange={(e) => setDebitSearch(e.target.value)}
                    placeholder="Search account..."
                    className="w-full border-b border-gray-200 px-3 py-2 text-sm focus:outline-none"
                  />
                  {filterAccounts(debitSearch).map((acc) => (
                    <div
                      key={acc._id}
                      className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer transition"
                      onClick={() => {
                        setDebitAccount(acc._id);
                        setDebitDropdownOpen(false);
                        setDebitSearch("");
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
              <label className="block font-semibold text-gray-700 mb-2">
                Debit Amount *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={debitAmount}
                onChange={(e) => setDebitAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
          </div>

          {/* Credit Section */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Credit Accounts *
            </label>
            {creditEntries.map((entry, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-4 mb-3 items-center">
                {/* Credit Account Dropdown */}
                <div className="relative">
                  <div
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white cursor-pointer hover:ring-2 hover:ring-green-400 transition flex justify-between items-center"
                    onClick={() =>
                      setCreditEntries((prev) =>
                        prev.map((e, i) => ({ ...e, open: i === index ? !e.open : false }))
                      )
                    }
                  >
                    <span>
                      {entry.account
                        ? accounts.find((a) => a._id === entry.account)?.accountName || "Select Credit Account"
                        : "Select Credit Account"}
                    </span>
                    <span className="text-gray-400">&#9662;</span>
                  </div>
                  {entry.open && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <input
                        type="text"
                        value={entry.search}
                        onChange={(e) => handleCreditChange(index, "search", e.target.value)}
                        placeholder="Search account..."
                        className="w-full border-b border-gray-200 px-3 py-2 text-sm focus:outline-none"
                      />
                      {filterAccounts(entry.search).map((acc) => (
                        <div
                          key={acc._id}
                          className="px-4 py-2 text-sm hover:bg-green-50 cursor-pointer transition"
                          onClick={() => {
                            handleCreditChange(index, "account", acc._id);
                            handleCreditChange(index, "open", false);
                            handleCreditChange(index, "search", "");
                          }}
                        >
                          {acc.accountName} ({acc.accountType})
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Credit Amount */}
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={entry.amount}
                    onChange={(e) => handleCreditChange(index, "amount", e.target.value)}
                    placeholder="Enter amount"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 transition"
                  />
                  {creditEntries.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteCreditRow(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddCreditRow}
              className="mt-2 px-5 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
            >
              + Add Another Credit Account
            </button>
          </div>

          {/* Description & Comments */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Comments
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-400 transition"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-12 py-3 rounded-lg font-semibold shadow-lg transition"
            >
              Save Journal Entry
            </button>
          </div>
        </form>
      </div>

      <Notification
        message={notificationMessage}
        type={notificationType}
        onClose={() => setNotificationMessage("")}
      />
    </SidebarLayout>
  );
}
