import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TABS = [
  {
    path: "/general-entries",
    label: "New Entry",
    icon: (
      <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
      </svg>
    ),
  },
  {
    path: "/view-general-entries",
    label: "View Journal",
    icon: (
      <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      </svg>
    ),
  },
];

export default function JournalNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginBottom: 28,
    }}>
      <div style={{
        display: "flex",
        gap: 2,
        background: "#ECECEC",
        borderRadius: 10,
        padding: 3,
        border: "1.5px solid #DADADA",
      }}>
        {TABS.map(tab => {
          const isActive = location.pathname === tab.path ||
            (tab.path === "/general-entries" && location.pathname === "/general-journal-entry");
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              style={{
                padding: "7px 20px",
                borderRadius: 7,
                border: "none",
                cursor: "pointer",
                fontSize: 12.5,
                fontWeight: isActive ? 600 : 400,
                fontFamily: "'DM Sans', sans-serif",
                display: "flex", alignItems: "center", gap: 6,
                whiteSpace: "nowrap",
                transition: "all .15s",
                background: isActive ? "#fff" : "transparent",
                color: isActive ? "#212A37" : "#6E7170",
                boxShadow: isActive ? "0 1px 4px rgba(11,12,13,.1)" : "none",
              }}
            >
              <span style={{ opacity: isActive ? 0.8 : 0.5 }}>{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}