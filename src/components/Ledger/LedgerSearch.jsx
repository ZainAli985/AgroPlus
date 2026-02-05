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

  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(1); // 1 = select , 2 = open

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
      setSelected(null);
      setStep(1);
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
      .filter((r) =>
        r.ref?.toString().includes(query)
      )
      .map((r) => ({
        type: "reference",
        label: r.ref,
        value: r.accountId,   // IMPORTANT
        accountName: r.accountName,
      }));



    setSuggestions([...accMatches, ...refMatches]);
    setSelected(null);
    setStep(1);
  }, [query, accounts, references]);

  // ---------------- ACTION ----------------
  const handleAction = () => {
    // STEP 1 → select first suggestion
    if (step === 1 && suggestions.length) {
      setSelected(suggestions[0]);
      setQuery(suggestions[0].label);
      setStep(2);
      return;
    }

    // STEP 2 → navigate
    if (step === 2 && selected) {
      if (selected.type === "account") {
        navigate(`/ledger/account/${selected.value}`);
      } else {
        navigate(`/ledger/account/${selected.value}`);
      }
    }
  };

  // ---------------- CLICK SELECT ----------------
  const selectSuggestion = (item) => {
    setSelected(item);
    setQuery(item.label);
    setStep(2);
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
            onKeyDown={(e) => e.key === "Enter" && handleAction()}
            placeholder="Search account or reference..."
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />

          {/* BUTTON */}
          <button
            onClick={handleAction}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {step === 1 ? "Select" : "Open Ledger"}
          </button>

          {/* SUGGESTIONS */}
          {step === 1 && query && (
            <div className="border rounded-lg mt-2 max-h-60 overflow-y-auto">

              {suggestions.length === 0 && (
                <div className="px-4 py-3 text-gray-400 text-center">
                  No matches found
                </div>
              )}

              {suggestions.map((item, i) => (
                <div
                  key={i}
                  onClick={() => selectSuggestion(item)}
                  className="px-4 py-3 cursor-pointer hover:bg-blue-50 flex justify-between"
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
