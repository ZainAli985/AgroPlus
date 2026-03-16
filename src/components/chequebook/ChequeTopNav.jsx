import React from "react";
import { useNavigate } from "react-router-dom";

export default function ChequeTopNav({ active }) {
  const navigate = useNavigate();
  const tabs = [
    { key:"create-book",  label:"Create Cheque Book", path:"/cheque-book/create",
      icon:<svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg> },
    { key:"create-entry", label:"Issue Cheque",        path:"/cheque-book/entry",
      icon:<svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2a2 2 0 01.586-1.414z"/></svg> },
    { key:"view",         label:"View All",            path:"/cheque-book/view",
      icon:<svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg> },
  ];
  return (
    <div style={{display:"flex",gap:3,background:"#f1f5f9",borderRadius:14,padding:"4px",marginBottom:24,flexWrap:"wrap",boxShadow:"inset 0 1px 4px rgba(0,0,0,.07)"}}>
      {tabs.map(t=>(
        <button key={t.key} onClick={()=>navigate(t.path)} style={{flex:1,minWidth:130,padding:"10px 16px",borderRadius:10,border:"none",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,fontWeight:active===t.key?700:500,background:active===t.key?"#fff":"transparent",color:active===t.key?"#1e3a5f":"#64748b",boxShadow:active===t.key?"0 2px 10px rgba(0,0,0,.08)":"none",transition:".15s",display:"flex",alignItems:"center",justifyContent:"center",gap:7,whiteSpace:"nowrap"}}>
          <span style={{opacity:active===t.key?1:0.7}}>{t.icon}</span>{t.label}
        </button>
      ))}
    </div>
  );
}