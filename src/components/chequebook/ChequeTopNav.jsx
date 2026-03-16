import React from "react";
import { useNavigate } from "react-router-dom";

export default function ChequeTopNav({ active }) {
  const navigate = useNavigate();
  const tabs = [
    { key: "create-book",  label: "📒 Create Cheque Book", path: "/cheque-book/create" },
    { key: "create-entry", label: "✍️ Issue Cheque",        path: "/cheque-book/entry" },
    { key: "view",         label: "📋 View All",            path: "/cheque-book/view" },
  ];
  return (
    <div style={{
      display:"flex", gap:4, background:"#f1f5f9", borderRadius:12, padding:"4px",
      marginBottom:22, flexWrap:"wrap",
      boxShadow:"inset 0 1px 3px rgba(0,0,0,.06)",
    }}>
      {tabs.map(t => (
        <button key={t.key}
          onClick={() => navigate(t.path)}
          style={{
            flex:1, minWidth:120, padding:"9px 14px", borderRadius:9, border:"none", cursor:"pointer",
            fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12.5, fontWeight:active===t.key?700:600,
            background: active === t.key ? "#fff" : "transparent",
            color:      active === t.key ? "#1e3a5f" : "#64748b",
            boxShadow:  active === t.key ? "0 2px 8px rgba(0,0,0,.08)" : "none",
            transition:".15s", whiteSpace:"nowrap",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}