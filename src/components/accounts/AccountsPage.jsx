import React from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout";

import CreateAccount from "./CreateAccount";
import ViewAccounts from "./ViewAccounts";

export default function AccountsPage() {
  const location = useLocation();

  const tabs = [
    { to: "/accounts/create", label: "Create Account" },
    { to: "/accounts/view", label: "View Accounts" },
  ];

  return (
    <SidebarLayout>
      {/* TOP TAB BAR */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex space-x-4">
        {tabs.map((tab) => (
          <Link
            key={tab.to}
            to={tab.to}
            className={`px-4 py-2 rounded-lg font-semibold transition 
              ${location.pathname === tab.to
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* ACCOUNT CONTENT BELOW */}
      <Routes>
        <Route path="create" element={<CreateAccount />} />
        <Route path="view" element={<ViewAccounts />} />

        {/* Default: show Create Account */}
        <Route path="*" element={<CreateAccount />} />
      </Routes>
    </SidebarLayout>
  );
}
