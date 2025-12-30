import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";

export default function LedgerSearch() {
  const [accounts, setAccounts] = useState([]);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [refSearch, setRefSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/accounts`)
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setAccounts(data));
  }, []);

  const suggestions = accounts.filter((acc) =>
    acc.accountName.toLowerCase().includes(query.toLowerCase())
  );

  const openAccountLedger = (accountId) => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    window.open(
      `/ledger/account/${accountId}?${params.toString()}`,
      "_blank"
    );
  };

  const openReferenceLedger = () => {
    if (!refSearch.trim()) return;

    window.open(
      `/ledger/ref/${refSearch.trim()}`,
      "_blank"
    );
  };


  return (
    <SidebarLayout>
      <h2 className="text-2xl font-bold mb-6">Ledger Finder</h2>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl">

        {/* Account Search */}
        <div className="bg-white rounded-xl shadow p-5">
          <label className="block text-sm font-semibold mb-2">
            Search by Account
          </label>

          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            placeholder="Type account name..."
            className="w-full border rounded-lg px-3 py-2"
          />

          {showSuggestions && query && (
            <div className="border rounded-lg mt-2 max-h-48 overflow-y-auto">
              {suggestions.map((acc) => (
                <div
                  key={acc._id}
                  onClick={() => {
                    setShowSuggestions(false);
                    openAccountLedger(acc._id);
                  }}

                  className="px-3 py-2 cursor-pointer hover:bg-blue-50"
                >
                  {acc.accountName}
                </div>
              ))}

              {suggestions.length === 0 && (
                <div className="px-3 py-2 text-gray-400">
                  No matching accounts
                </div>
              )}
            </div>
          )}
        </div>

        {/* Reference Search */}
        <div className="bg-white rounded-xl shadow p-5">
          <label className="block text-sm font-semibold mb-2">
            Search by Ledger Reference
          </label>

          <input
            value={refSearch}
            onChange={(e) => setRefSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && openReferenceLedger()}
            placeholder="Journal ID or Reference"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Date Filters */}
        <div className="bg-white rounded-xl shadow p-5 col-span-full">
          <label className="block text-sm font-semibold mb-2">
            Date Range (Optional)
          </label>

          <div className="flex gap-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
