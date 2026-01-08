import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function JournalTopNav() {
  const location = useLocation();

  const navItem = (to, label, icon) => (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg font-semibold transition ${
        location.pathname === to
          ? "bg-blue-600 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {icon} {label}
    </Link>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex space-x-4">
      {navItem("/general-journal-entry", "Create Journal Entry", "✏️")}
      {navItem("/view-general-entries", "View Journal Entries", "📋")}
      {navItem("/ledger", "Ledger", "📘")}
    </div>
  );
}
