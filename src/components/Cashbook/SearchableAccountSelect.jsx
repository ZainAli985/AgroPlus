import React, { useState, useRef, useEffect } from "react";

export default function SearchableAccountSelect({
  accounts,
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  const filteredAccounts = accounts.filter((acc) =>
    acc.accountName.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected Box */}
      <div
        onClick={() => setOpen(!open)}
        className="border rounded-lg px-3 py-2 bg-white cursor-pointer flex justify-between items-center focus:ring-2 focus:ring-blue-500"
      >
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value || "Select Account"}
        </span>
        <span className="text-gray-400 text-sm">▼</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 mt-1 w-full bg-white border rounded-lg shadow-lg">

          {/* Account List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((acc) => (
                <div
                  key={acc._id}
                  onClick={() => {
                    onChange(acc.accountName);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                >
                  {acc.accountName}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-400">
                No accounts found
              </div>
            )}
          </div>

          {/* Search Input (Below List as requested) */}
          <div className="border-t p-2">
            <input
              type="text"
              placeholder="Search account..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}