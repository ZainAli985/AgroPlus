import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";

export default function LedgerSearch() {
  const [accounts, setAccounts] = useState([]);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [refSearch, setRefSearch] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/accounts`)
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setAccounts(data));
  }, []);

  const suggestions = accounts.filter((acc) =>
    acc.accountName.toLowerCase().includes(query.toLowerCase())
  );

  const openAccountLedger = (accountId) => {
    window.open(`/ledger/account/${accountId}`, "_blank");
  };

  const openReferenceLedger = () => {
    if (!refSearch.trim()) return;
    window.open(`/ledger/ref/${refSearch.trim()}`, "_blank");
  };

  return (
    <SidebarLayout>
      <div className="flex justify-center items-start py-16 px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Ledger Finder
          </h2>

          {/* Account Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search by Account
            </label>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              placeholder="Type account name..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {showSuggestions && query && (
              <div className="border border-gray-200 rounded-lg mt-2 max-h-60 overflow-y-auto shadow-sm">
                {suggestions.map((acc) => (
                  <div
                    key={acc._id}
                    onClick={() => {
                      setShowSuggestions(false);
                      openAccountLedger(acc._id);
                    }}
                    className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition"
                  >
                    {acc.accountName}
                  </div>
                ))}
                {suggestions.length === 0 && (
                  <div className="px-4 py-3 text-gray-400">
                    No matching accounts
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Reference Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search by Ledger Reference
            </label>
            <input
              value={refSearch}
              onChange={(e) => setRefSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && openReferenceLedger()}
              placeholder="Journal ID or Reference"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center mt-4">
            <button
              onClick={openReferenceLedger}
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Search Reference
            </button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
