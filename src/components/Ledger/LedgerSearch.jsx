import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import JournalTopNav from "./JournalTopNav.jsx";

export default function LedgerSearch() {
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const [references, setReferences] = useState([]);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [highlightIndex, setHighlightIndex] = useState(-1);

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    fetch(`${API_BASE_URL}/accounts`)
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setAccounts(data));

    fetch(`${API_BASE_URL}/references`)
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setReferences(data));
  }, []);

  // ---------------- FILTER ----------------
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      setHighlightIndex(-1);
      return;
    }

    const accMatches = accounts
      .filter((a) =>
        a.accountName.toLowerCase().includes(query.toLowerCase())
      )
      .map((a) => ({
        type: "account",
        label: a.accountName,
        value: a._id,
      }));

    const refMatches = references
      .filter((r) => r.ref?.toString().includes(query))
      .map((r) => ({
        type: "reference",
        label: r.ref,
        value: r.accountId,
        accountName: r.accountName,
      }));

    const merged = [...accMatches, ...refMatches];

    setSuggestions(merged);
    setHighlightIndex(merged.length ? 0 : -1); // auto-highlight first
  }, [query, accounts, references]);

  // ---------------- OPEN LEDGER ----------------
  const openLedger = (item) => {
    if (!item) return;
    navigate(`/ledger/account/${item.value}`);
  };

  // ---------------- KEYBOARD HANDLING ----------------
  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      openLedger(suggestions[highlightIndex]);
    }
  };

  // ---------------- BUTTON ACTION ----------------
  const handleAction = () => {
    openLedger(suggestions[highlightIndex] || suggestions[0]);
  };

  return (
    <SidebarLayout>
      <JournalTopNav />

      <div className="flex justify-center items-start py-16 px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Ledger Finder
          </h2>

          {/* INPUT */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search account or reference..."
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />

          {/* BUTTON */}
          <button
            onClick={handleAction}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Search Ledger
          </button>

          {/* SUGGESTIONS */}
          {query && (
            <div className="border rounded-lg mt-2 max-h-60 overflow-y-auto">
              {suggestions.length === 0 && (
                <div className="px-4 py-3 text-gray-400 text-center">
                  No matches found
                </div>
              )}

              {suggestions.map((item, i) => (
                <div
                  key={i}
                  onClick={() => openLedger(item)}
                  onMouseEnter={() => setHighlightIndex(i)}
                  className={`px-4 py-3 cursor-pointer flex justify-between
                    ${
                      i === highlightIndex
                        ? "bg-blue-100"
                        : "hover:bg-blue-50"
                    }`}
                >
                  <div>
                    <p>{item.label}</p>
                    {item.type === "reference" && (
                      <p className="text-xs text-gray-400">
                        {item.accountName}
                      </p>
                    )}
                  </div>

                  <span className="text-xs text-gray-400">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}
