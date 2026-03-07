import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import JournalTopNav from "../layout/JournalTopNav.jsx";
import { authFetch } from "../../utils/authFetch";

const TYPE_COLORS = {
  Assets:      { bg: "bg-blue-100",   text: "text-blue-700"   },
  Liabilities: { bg: "bg-red-100",    text: "text-red-700"    },
  Equity:      { bg: "bg-purple-100", text: "text-purple-700" },
  Expense:     { bg: "bg-orange-100", text: "text-orange-700" },
  Revenue:     { bg: "bg-green-100",  text: "text-green-700"  },
};

function TypeBadge({ type }) {
  const c = TYPE_COLORS[type] || { bg: "bg-gray-100", text: "text-gray-500" };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>
      {type || "account"}
    </span>
  );
}

export default function LedgerSearch() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [accounts, setAccounts]       = useState([]);
  const [references, setReferences]   = useState([]);
  const [query, setQuery]             = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [loading, setLoading]         = useState(true);
  const [focused, setFocused]         = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Focus input on mount
  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accountsRes, refsRes] = await Promise.all([
          authFetch(`${API_BASE_URL}/accounts`),
          authFetch(`${API_BASE_URL}/references`),
        ]);
        const accountsData = await accountsRes.json();
        const refsData     = await refsRes.json();
        Array.isArray(accountsData) && setAccounts(accountsData);
        Array.isArray(refsData)     && setReferences(refsData);
      } catch (err) {
        console.error("Failed to fetch ledger data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!query.trim()) { setSuggestions([]); setHighlightIndex(-1); return; }

    const q = query.toLowerCase();

    const accMatches = accounts
      .filter((a) => a.accountName?.toLowerCase().includes(q))
      .map((a) => ({
        type: "account",
        accountType: a.accountType,
        label: a.accountName,
        sub: a.subAccountType,
        value: a._id,
      }));

    const refMatches = references
      .filter((r) => r.ref?.toLowerCase().includes(q))
      .map((r) => ({
        type: "reference",
        label: r.ref,
        sub: r.accountName,
        value: r.accountId,
        accountType: null,
      }));

    const merged = [...accMatches, ...refMatches];
    setSuggestions(merged);
    setHighlightIndex(merged.length ? 0 : -1);
  }, [query, accounts, references]);

  const openLedger = (item) => {
    if (!item) return;
    // Save recent
    setRecentSearches((prev) => {
      const filtered = prev.filter((r) => r.value !== item.value);
      return [item, ...filtered].slice(0, 5);
    });
    navigate(`/ledger/account/${item.value}`);
  };

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlightIndex((p) => (p < suggestions.length - 1 ? p + 1 : 0)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setHighlightIndex((p) => (p > 0 ? p - 1 : suggestions.length - 1)); }
    if (e.key === "Enter")     { e.preventDefault(); openLedger(suggestions[highlightIndex]); }
    if (e.key === "Escape")    { setQuery(""); setSuggestions([]); }
  };

  const showDropdown = focused && (suggestions.length > 0 || (query && suggestions.length === 0));
  const showRecents  = focused && !query && recentSearches.length > 0;

  return (
    <SidebarLayout>
      <JournalTopNav />

      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* ── Page Header ── */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Accounts Module</p>
          <h1 className="text-2xl font-bold text-gray-800">Ledger Finder</h1>
          <p className="text-sm text-gray-500 mt-1">
            Search by account name or ledger reference to open a ledger
          </p>
        </div>

        {/* ── Search Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Search input */}
          <div className="px-6 pt-6 pb-4">
            <div className={`relative flex items-center border-2 rounded-xl transition-all ${
              focused ? "border-blue-500 shadow-sm shadow-blue-100" : "border-gray-200"
            }`}>
              {/* Search icon */}
              <div className="pl-4 pr-1 flex-shrink-0">
                {loading ? (
                  <svg className="w-5 h-5 text-gray-300 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                ) : (
                  <svg className={`w-5 h-5 transition-colors ${focused ? "text-blue-500" : "text-gray-400"}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
                  </svg>
                )}
              </div>

              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                placeholder="Search account name or reference..."
                className="flex-1 px-3 py-3.5 text-sm text-gray-800 placeholder-gray-300 outline-none bg-transparent"
              />

              {/* Clear button */}
              {query && (
                <button
                  onClick={() => { setQuery(""); setSuggestions([]); inputRef.current?.focus(); }}
                  className="pr-4 text-gray-300 hover:text-gray-500 transition text-lg leading-none"
                >✕</button>
              )}

              {/* Keyboard hint */}
              {!query && !focused && (
                <span className="pr-4 text-xs text-gray-300 font-mono hidden sm:block">↵ to open</span>
              )}
            </div>

            {/* Keyboard shortcuts hint */}
            <p className="text-xs text-gray-400 mt-2 ml-1">
              Use <kbd className="bg-gray-100 border border-gray-200 rounded px-1 py-0.5 text-[10px] font-mono">↑↓</kbd> to navigate,{" "}
              <kbd className="bg-gray-100 border border-gray-200 rounded px-1 py-0.5 text-[10px] font-mono">↵</kbd> to open,{" "}
              <kbd className="bg-gray-100 border border-gray-200 rounded px-1 py-0.5 text-[10px] font-mono">Esc</kbd> to clear
            </p>
          </div>

          {/* ── Suggestions dropdown ── */}
          {showDropdown && (
            <div className="border-t border-gray-100">
              {suggestions.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl mb-2">🔍</div>
                  <p className="text-sm font-semibold text-gray-500">No matches for "{query}"</p>
                  <p className="text-xs text-gray-400 mt-0.5">Try a different name or reference</p>
                </div>
              ) : (
                <>
                  <div className="px-5 py-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {suggestions.length} result{suggestions.length !== 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-gray-300">Click or press ↵</p>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                    {suggestions.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => openLedger(item)}
                        onMouseEnter={() => setHighlightIndex(i)}
                        className={`flex items-center justify-between px-5 py-3.5 cursor-pointer transition-colors ${
                          i === highlightIndex ? "bg-blue-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Icon */}
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm ${
                            i === highlightIndex ? "bg-blue-100" : "bg-gray-100"
                          }`}>
                            {item.type === "reference" ? "🔗" : "📒"}
                          </div>
                          <div className="min-w-0">
                            <p className={`text-sm font-semibold truncate ${i === highlightIndex ? "text-blue-800" : "text-gray-800"}`}>
                              {item.label}
                            </p>
                            {item.sub && (
                              <p className="text-xs text-gray-400 truncate mt-0.5">{item.sub}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                          {item.accountType && <TypeBadge type={item.accountType} />}
                          {item.type === "reference" && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                              ref
                            </span>
                          )}
                          <svg className={`w-4 h-4 transition-colors ${i === highlightIndex ? "text-blue-400" : "text-gray-200"}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── Recent searches (shown when focused, no query) ── */}
          {showRecents && (
            <div className="border-t border-gray-100">
              <div className="px-5 py-2 bg-gray-50 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent</p>
              </div>
              <div className="divide-y divide-gray-50">
                {recentSearches.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => openLedger(item)}
                    className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-sm">🕐</div>
                      <p className="text-sm text-gray-700 font-medium">{item.label}</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Open button ── */}
          <div className="px-6 py-5 border-t border-gray-100 bg-gray-50">
            <button
              onClick={() => openLedger(suggestions[highlightIndex] || suggestions[0])}
              disabled={!suggestions.length}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition ${
                suggestions.length
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {suggestions.length
                ? `Open "${suggestions[highlightIndex]?.label || suggestions[0]?.label}" Ledger →`
                : "Search to open a ledger"}
            </button>
          </div>
        </div>

        {/* ── Stats row ── */}
        {!loading && (
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              { label: "Total Accounts", value: accounts.length, icon: "📒" },
              { label: "Ledger References", value: references.length, icon: "🔗" },
            ].map(({ label, value, icon }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-base">{icon}</div>
                <div>
                  <p className="text-xl font-bold text-gray-800">{value}</p>
                  <p className="text-xs text-gray-400">{label}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}