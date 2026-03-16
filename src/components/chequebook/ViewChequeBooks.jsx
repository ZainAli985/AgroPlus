import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout";
import ChequeTopNav from "./ChequeTopNav";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";
import Notification from "../Notification";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');`;

const fmt = (n) => Number(n||0).toLocaleString("en-PK", { minimumFractionDigits:2, maximumFractionDigits:2 });
const fmtDate = (d) => d ? new Date(d).toLocaleDateString("en-PK", { day:"2-digit", month:"short", year:"numeric" }) : "—";

const STATUS_STYLE = {
  issued:  { bg:"#eff6ff", color:"#1d4ed8", border:"#bfdbfe", label:"Issued" },
  cleared: { bg:"#f0fdf4", color:"#15803d", border:"#bbf7d0", label:"Cleared" },
  bounced: { bg:"#fef2f2", color:"#dc2626", border:"#fecaca", label:"Bounced" },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.issued;
  return (
    <span style={{
      background:s.bg, color:s.color, border:`1px solid ${s.border}`,
      padding:"2px 9px", borderRadius:20, fontSize:11.5, fontWeight:700,
      fontFamily:"'JetBrains Mono',monospace", letterSpacing:".06em",
    }}>{s.label}</span>
  );
}

export default function ViewChequeBooks() {
  const navigate = useNavigate();
  const [books,   setBooks]   = useState([]);
  const [entries, setEntries] = useState([]);
  const [view,    setView]    = useState("books"); // "books" | "entries"
  const [filterBook, setFilterBook] = useState("");
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "info" });

  const load = async () => {
    setLoading(true);
    const [bRes, eRes] = await Promise.all([
      authFetch(`${API_BASE_URL}/cheque-books`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/cheque-entries`).then(r => r.json()),
    ]);
    setBooks(bRes.chequeBooks || []);
    setEntries(eRes.chequeEntries || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filteredEntries = filterBook
    ? entries.filter(e => e.chequeBookId === filterBook)
    : entries;

  const updateStatus = async (entryId, status) => {
    const res  = await authFetch(`${API_BASE_URL}/cheque-entries/${entryId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) { setNotification({ message: "Status updated.", type: "success" }); load(); }
    else { const d = await res.json(); setNotification({ message: d.message, type: "error" }); }
  };

  return (
    <SidebarLayout>
      <style>{FONTS}</style>
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "info" })}/>
      <ChequeTopNav active="view"/>

      <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif", color:"#111827"}}>

        {/* ── Sub tabs ── */}
        <div style={{display:"flex", gap:8, marginBottom:20}}>
          {[
            { key:"books",   label:`📒 Cheque Books (${books.length})` },
            { key:"entries", label:`✍️ Issued Cheques (${entries.length})` },
          ].map(t => (
            <button key={t.key} onClick={() => setView(t.key)}
              style={{
                padding:"8px 18px", borderRadius:9, border:"1.5px solid",
                borderColor: view===t.key ? "#1e3a5f" : "#e5e7eb",
                background:  view===t.key ? "#1e3a5f" : "#fff",
                color:       view===t.key ? "#fff" : "#6b7280",
                fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:600, cursor:"pointer",
              }}>{t.label}</button>
          ))}
        </div>

        {/* ══ CHEQUE BOOKS TAB ══ */}
        {view === "books" && (
          <div style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:16, overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,.05)"}}>
            <div style={{padding:"16px 20px", borderBottom:"1px solid #f3f4f6", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
              <div>
                <div style={{fontSize:15, fontWeight:800, color:"#111827"}}>Cheque Books</div>
                <div style={{fontSize:12, color:"#9ca3af", marginTop:1}}>All registered cheque books</div>
              </div>
              <button onClick={() => navigate("/cheque-book/create")}
                style={{
                  padding:"8px 16px", borderRadius:9, border:"none", cursor:"pointer",
                  background:"linear-gradient(135deg,#1e3a5f,#2563eb)", color:"#fff",
                  fontSize:12.5, fontWeight:700, fontFamily:"'Plus Jakarta Sans',sans-serif",
                  boxShadow:"0 2px 8px rgba(37,99,235,.3)",
                }}>+ New Cheque Book</button>
            </div>

            {loading ? (
              <div style={{padding:48, textAlign:"center", color:"#9ca3af"}}>Loading…</div>
            ) : books.length === 0 ? (
              <div style={{padding:48, textAlign:"center", color:"#9ca3af"}}>
                <div style={{fontSize:36, marginBottom:12}}>📒</div>
                <div style={{fontSize:14, fontWeight:600, color:"#6b7280"}}>No cheque books created yet</div>
              </div>
            ) : (
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%", borderCollapse:"collapse", fontSize:13.5}}>
                  <thead>
                    <tr style={{background:"#f8fafc"}}>
                      {["Book ID","Bank Account","Branch","Account No.","Leaf Range","Leaves","Last Issued","Status"].map(h => (
                        <th key={h} style={{padding:"10px 14px", textAlign:"left", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", borderBottom:"1px solid #f1f5f9", whiteSpace:"nowrap"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {books.map(b => {
                      const issued = b.lastIssuedLeaf ? parseInt(b.lastIssuedLeaf) - parseInt(b.startLeaf) + 1 : 0;
                      const remaining = b.totalLeaves - issued;
                      return (
                        <tr key={b._id} style={{borderBottom:"1px solid #f8fafc"}}
                          onMouseEnter={e => e.currentTarget.style.background="#fafafa"}
                          onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                          <td style={{padding:"12px 14px"}}>
                            <span style={{fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:"#1e3a5f", fontSize:13}}>{b.chequeBookId}</span>
                          </td>
                          <td style={{padding:"12px 14px", fontWeight:600}}>{b.bankAccountName}</td>
                          <td style={{padding:"12px 14px", color:"#6b7280"}}>
                            <div style={{fontSize:13}}>{b.branchName}</div>
                            <div style={{fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:"#9ca3af"}}>Code: {b.branchCode}</div>
                          </td>
                          <td style={{padding:"12px 14px", fontFamily:"'JetBrains Mono',monospace", fontSize:12.5, color:"#374151"}}>{b.accountNumber}</td>
                          <td style={{padding:"12px 14px", fontFamily:"'JetBrains Mono',monospace", fontSize:12.5, color:"#374151"}}>{b.startLeaf} – {b.endLeaf}</td>
                          <td style={{padding:"12px 14px"}}>
                            <div style={{fontSize:13, fontWeight:600}}>{remaining} left</div>
                            <div style={{fontSize:11, color:"#9ca3af"}}>{issued} issued / {b.totalLeaves} total</div>
                          </td>
                          <td style={{padding:"12px 14px", fontFamily:"'JetBrains Mono',monospace", fontSize:12.5, color:"#374151"}}>
                            {b.lastIssuedLeaf || "—"}
                          </td>
                          <td style={{padding:"12px 14px"}}>
                            <span style={{
                              background: remaining > 0 ? "#f0fdf4":"#fff7ed",
                              color:      remaining > 0 ? "#15803d":"#d97706",
                              border:`1px solid ${remaining > 0 ? "#bbf7d0":"#fde68a"}`,
                              padding:"2px 9px", borderRadius:20, fontSize:11.5, fontWeight:700,
                              fontFamily:"'JetBrains Mono',monospace",
                            }}>
                              {remaining > 0 ? "Active" : "Exhausted"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ══ CHEQUE ENTRIES TAB ══ */}
        {view === "entries" && (
          <div style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:16, overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,.05)"}}>
            <div style={{padding:"16px 20px", borderBottom:"1px solid #f3f4f6", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12}}>
              <div>
                <div style={{fontSize:15, fontWeight:800, color:"#111827"}}>Issued Cheques</div>
                <div style={{fontSize:12, color:"#9ca3af", marginTop:1}}>All cheque entries with journal entries</div>
              </div>
              <div style={{display:"flex", gap:10, alignItems:"center", flexWrap:"wrap"}}>
                <select value={filterBook} onChange={e => setFilterBook(e.target.value)}
                  style={{
                    padding:"8px 12px", border:"1.5px solid #e5e7eb", borderRadius:9,
                    fontSize:13, fontFamily:"'Plus Jakarta Sans',sans-serif", color:"#374151",
                    background:"#fff", outline:"none", appearance:"none", cursor:"pointer",
                  }}>
                  <option value="">All Cheque Books</option>
                  {books.map(b => <option key={b._id} value={b._id}>{b.chequeBookId} — {b.bankAccountName}</option>)}
                </select>
                <button onClick={() => navigate("/cheque-book/entry")}
                  style={{
                    padding:"8px 16px", borderRadius:9, border:"none", cursor:"pointer",
                    background:"linear-gradient(135deg,#1e3a5f,#2563eb)", color:"#fff",
                    fontSize:12.5, fontWeight:700, fontFamily:"'Plus Jakarta Sans',sans-serif",
                    boxShadow:"0 2px 8px rgba(37,99,235,.3)",
                  }}>+ Issue Cheque</button>
              </div>
            </div>

            {loading ? (
              <div style={{padding:48, textAlign:"center", color:"#9ca3af"}}>Loading…</div>
            ) : filteredEntries.length === 0 ? (
              <div style={{padding:48, textAlign:"center", color:"#9ca3af"}}>
                <div style={{fontSize:36, marginBottom:12}}>✍️</div>
                <div style={{fontSize:14, fontWeight:600, color:"#6b7280"}}>No cheques issued yet</div>
              </div>
            ) : (
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%", borderCollapse:"collapse", fontSize:13.5}}>
                  <thead>
                    <tr style={{background:"#f8fafc"}}>
                      {["Cheque No.","Date","Bank","Branch","Payee","Amount","Status","Update"].map(h => (
                        <th key={h} style={{padding:"10px 14px", textAlign:"left", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", borderBottom:"1px solid #f1f5f9", whiteSpace:"nowrap"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEntries.map(e => (
                      <tr key={e._id} style={{borderBottom:"1px solid #f8fafc"}}
                        onMouseEnter={ev => ev.currentTarget.style.background="#fafafa"}
                        onMouseLeave={ev => ev.currentTarget.style.background="transparent"}>
                        <td style={{padding:"12px 14px"}}>
                          <span style={{fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:"#1e3a5f", fontSize:13}}>{e.chequeNo}</span>
                        </td>
                        <td style={{padding:"12px 14px", color:"#374151"}}>{fmtDate(e.date)}</td>
                        <td style={{padding:"12px 14px", fontWeight:600, color:"#1e293b"}}>
                          <div>{e.bankAccountName}</div>
                          <div style={{fontSize:11, color:"#9ca3af", fontFamily:"'JetBrains Mono',monospace"}}>{e.branchName}</div>
                        </td>
                        <td style={{padding:"12px 14px"}}>
                          <div style={{fontSize:12.5, color:"#6b7280"}}>{e.branchName}</div>
                          <div style={{fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:"#9ca3af"}}>Code: {e.branchCode}</div>
                        </td>
                        <td style={{padding:"12px 14px"}}>
                          <div style={{fontWeight:600}}>{e.payeeAccountName}</div>
                          {e.remarks && <div style={{fontSize:11.5, color:"#9ca3af", marginTop:1}}>{e.remarks}</div>}
                        </td>
                        <td style={{padding:"12px 14px"}}>
                          <div style={{fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:"#1e3a5f"}}>PKR {fmt(e.amount)}</div>
                          <div style={{fontSize:11, color:"#9ca3af", maxWidth:160, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{e.amountInWords}</div>
                        </td>
                        <td style={{padding:"12px 14px"}}><StatusBadge status={e.status}/></td>
                        <td style={{padding:"12px 14px"}}>
                          <select
                            value={e.status}
                            onChange={ev => updateStatus(e._id, ev.target.value)}
                            style={{
                              padding:"5px 9px", border:"1.5px solid #e5e7eb", borderRadius:7,
                              fontSize:12, fontFamily:"'Plus Jakarta Sans',sans-serif",
                              color:"#374151", background:"#fff", outline:"none", cursor:"pointer",
                            }}>
                            <option value="issued">Issued</option>
                            <option value="cleared">Cleared</option>
                            <option value="bounced">Bounced</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{background:"#f8fafc", borderTop:"2px solid #e5e7eb"}}>
                      <td colSpan={5} style={{padding:"10px 14px", fontSize:12, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:".07em"}}>
                        Total ({filteredEntries.length} cheques)
                      </td>
                      <td style={{padding:"10px 14px", fontFamily:"'JetBrains Mono',monospace", fontWeight:800, color:"#1e3a5f"}}>
                        PKR {fmt(filteredEntries.reduce((s, e) => s + (e.amount||0), 0))}
                      </td>
                      <td colSpan={2}/>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}