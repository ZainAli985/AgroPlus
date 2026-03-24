import React from "react";
import { useNavigate } from "react-router-dom";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`;

export default function ChequeTopNav({ active }) {
  const navigate = useNavigate();

  const tabs = [
    {
      key: "create-book",
      label: "Create Cheque Book",
      path: "/cheque-book/create",
      icon: (
        <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
      ),
    },
    {
      key: "create-entry",
      label: "Issue Cheque",
      path: "/cheque-book/entry",
      icon: (
        <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2a2 2 0 01.586-1.414z"/>
        </svg>
      ),
    },
    {
      key: "view",
      label: "View All",
      path: "/cheque-book/view",
      icon: (
        <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{FONTS}</style>
      <div style={{
        display: "flex", gap: 4, flexWrap: "wrap",
        background: "#f3f4f6", borderRadius: 8,
        padding: 4, marginBottom: 20,
      }}>
        {tabs.map(t => {
          const isActive = active === t.key;
          return (
            <button key={t.key} onClick={() => navigate(t.path)}
              style={{
                flex: 1, minWidth: 130, padding: "8px 14px",
                borderRadius: 6, border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, fontWeight: isActive ? 600 : 500,
                background: isActive ? "#fff" : "transparent",
                color: isActive ? "#111827" : "#6b7280",
                boxShadow: isActive ? "0 1px 4px rgba(0,0,0,.08)" : "none",
                transition: "all .12s",
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: 6, whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#374151"; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "#6b7280"; }}>
              <span style={{ opacity: isActive ? 1 : 0.6 }}>{t.icon}</span>
              {t.label}
            </button>
          );
        })}
      </div>
    </>
  );
}