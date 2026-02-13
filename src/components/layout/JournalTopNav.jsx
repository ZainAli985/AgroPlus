import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function JournalNav({ className = "", maxWidth = "max-w-xl" }) {
  const location = useLocation();

  const links = [
    { to: "/general-journal-entry", label: "✏️ Create Journal Entry" },
    { to: "/view-general-entries", label: "📋 View Journal Entries" },
    { to: "/ledger", label: "📘 Ledger" },
  ];

  return (
    <div
      className={`flex justify-center gap-3 ${maxWidth} mx-auto p-2 bg-gray-50 rounded-lg shadow-sm mb-4 ${className}`}
    >
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`px-4 py-1.5 rounded-md font-medium transition-colors duration-200 
            ${
              location.pathname === link.to
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
