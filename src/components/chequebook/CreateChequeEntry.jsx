import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout";
import ChequeTopNav from "./ChequeTopNav";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";
import Notification from "../Notification";

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Dancing+Script:wght@600;700&display=swap');
`;

/* ── Amount to words ─────────────────────────────────────────────────────── */
function amountToWords(amount) {
  const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine",
    "Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  function convert(n) {
    if (n === 0) return "";
    if (n < 20)  return ones[n] + " ";
    if (n < 100) return tens[Math.floor(n/10)] + " " + (n%10 ? ones[n%10]+" " : "");
    if (n < 1000) return ones[Math.floor(n/100)] + " Hundred " + convert(n%100);
    if (n < 100000) return convert(Math.floor(n/1000)) + "Thousand " + convert(n%1000);
    if (n < 10000000) return convert(Math.floor(n/100000)) + "Lakh " + convert(n%100000);
    return convert(Math.floor(n/10000000)) + "Crore " + convert(n%10000000);
  }
  if (!amount || isNaN(amount)) return "";
  const [intPart, decPart] = parseFloat(amount).toFixed(2).split(".");
  let w = convert(parseInt(intPart)).trim() || "Zero";
  w += " Rupees";
  if (parseInt(decPart) > 0) w += " and " + convert(parseInt(decPart)).trim() + " Paisa";
  return w + " Only";
}

/* ── Searchable dropdown ──────────────────────────────────────────────────── */
function AccountPicker({ accounts, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef(null);
  const inp = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => { if (open) setTimeout(() => inp.current?.focus(), 0); }, [open]);

  const filtered = accounts.filter(a => a.accountName.toLowerCase().includes(q.toLowerCase()));
  const selected = accounts.find(a => a._id === value);

  return (
    <div ref={ref} style={{position:"relative"}}>
      <button type="button" onClick={() => setOpen(o => !o)}
        style={{
          width:"100%", textAlign:"left", padding:"10px 14px",
          border:"2px dashed #b45309", borderRadius:0,
          background:"transparent", cursor:"pointer",
          fontFamily:"'Plus Jakarta Sans',sans-serif",
          fontSize:13.5, fontWeight:600, color: selected ? "#1e293b" : "#9ca3af",
          borderLeft:"none", borderRight:"none", borderTop:"none",
        }}>
        {selected?.accountName || <span style={{color:"#9ca3af",fontStyle:"italic"}}>Select payee…</span>}
      </button>
      {open && (
        <div style={{
          position:"absolute", left:0, top:"100%", width:"100%", minWidth:260, zIndex:100,
          background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:10,
          boxShadow:"0 8px 24px rgba(0,0,0,.14)", overflow:"hidden",
        }}>
          <div style={{padding:8, borderBottom:"1px solid #f3f4f6", background:"#f8fafc"}}>
            <input ref={inp} value={q} onChange={e => setQ(e.target.value)}
              placeholder="Search accounts…"
              style={{width:"100%", padding:"7px 10px", border:"1px solid #e5e7eb", borderRadius:7, fontSize:13, outline:"none"}}/>
          </div>
          <ul style={{maxHeight:200, overflowY:"auto", margin:0, padding:0, listStyle:"none"}}>
            {filtered.length === 0
              ? <li style={{padding:"10px 14px", fontSize:13, color:"#9ca3af"}}>No accounts found</li>
              : filtered.map(a => (
                <li key={a._id}
                  onClick={() => { onChange(a); setOpen(false); setQ(""); }}
                  style={{
                    padding:"9px 14px", fontSize:13, cursor:"pointer",
                    background: a._id === value ? "#eff6ff" : "transparent",
                    fontWeight: a._id === value ? 600 : 400, color:"#1e293b",
                  }}
                  onMouseEnter={e => { if(a._id !== value) e.currentTarget.style.background="#f8fafc"; }}
                  onMouseLeave={e => { if(a._id !== value) e.currentTarget.style.background="transparent"; }}
                >{a.accountName}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function CreateChequeEntry() {
  const navigate = useNavigate();
  const [books, setBooks]         = useState([]);
  const [accounts, setAccounts]   = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [nextNo, setNextNo]       = useState("");
  const [loading, setLoading]     = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "info" });

  const todayStr = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({
    chequeBookId: "",
    chequeNo: "",
    date: todayStr,
    payeeAccountId: "",
    payeeAccountName: "",
    amount: "",
    remarks: "",
  });

  const words = amountToWords(parseFloat(form.amount) || 0);

  /* ── Fetch initial data ── */
  useEffect(() => {
    Promise.all([
      authFetch(`${API_BASE_URL}/cheque-books`).then(r => r.json()),
      authFetch(`${API_BASE_URL}/accounts`).then(r => r.json()),
    ]).then(([booksData, accsData]) => {
      setBooks(booksData.chequeBooks || []);
      setAccounts(Array.isArray(accsData) ? accsData.filter(a => !a.isProtected) : []);
    });
  }, []);

  /* ── When cheque book changes, fetch next cheque no ── */
  useEffect(() => {
    if (!form.chequeBookId) { setNextNo(""); setSelectedBook(null); return; }
    authFetch(`${API_BASE_URL}/cheque-books/${form.chequeBookId}/next-cheque-no`)
      .then(r => r.json())
      .then(d => {
        if (d.nextChequeNo) {
          setNextNo(d.nextChequeNo);
          setForm(p => ({ ...p, chequeNo: d.nextChequeNo }));
          setSelectedBook(d.book);
        }
      });
  }, [form.chequeBookId]);

  const handleSubmit = async () => {
    if (!form.chequeBookId)    return setNotification({ message: "Select a cheque book.", type: "error" });
    if (!form.payeeAccountId)  return setNotification({ message: "Select a payee.", type: "error" });
    if (!form.amount || parseFloat(form.amount) <= 0) return setNotification({ message: "Enter a valid amount.", type: "error" });
    if (parseFloat(form.amount) > 100000000000) return setNotification({ message: "Amount exceeds maximum (1000 Crore).", type: "error" });

    setLoading(true);
    const res  = await authFetch(`${API_BASE_URL}/cheque-entries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setNotification({ message: `Cheque No. ${form.chequeNo} issued successfully!`, type: "success" });
      setForm(p => ({ ...p, payeeAccountId: "", payeeAccountName: "", amount: "", remarks: "", chequeNo: "" }));
      // Refresh next cheque no
      if (form.chequeBookId) {
        authFetch(`${API_BASE_URL}/cheque-books/${form.chequeBookId}/next-cheque-no`)
          .then(r => r.json())
          .then(d => { if (d.nextChequeNo) { setNextNo(d.nextChequeNo); setForm(p => ({...p, chequeNo: d.nextChequeNo})); } });
      }
    } else {
      setNotification({ message: data.message || "Failed to issue cheque.", type: "error" });
    }
  };

  /* ── Formatted amount display ── */
  const fmtAmt = (v) => {
    const n = parseFloat(v);
    if (isNaN(n)) return "";
    return "PKR " + n.toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const displayDate = form.date
    ? new Date(form.date + "T00:00:00").toLocaleDateString("en-PK", { day: "2-digit", month: "2-digit", year: "numeric" })
    : "__ / __ / ____";

  return (
    <SidebarLayout>
      <style>{FONTS}</style>
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "info" })}/>
      <ChequeTopNav active="create-entry"/>

      <div style={{maxWidth:780, margin:"0 auto", fontFamily:"'Plus Jakarta Sans',sans-serif"}}>

        {/* ── Cheque book selector ── */}
        <div style={{
          background:"#fff", border:"1px solid #e5e7eb", borderRadius:14, padding:"16px 20px",
          marginBottom:20, display:"flex", alignItems:"center", gap:16, flexWrap:"wrap",
          boxShadow:"0 1px 4px rgba(0,0,0,.05)",
        }}>
          <div style={{flex:"1 1 280px"}}>
            <label style={{fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#6b7280", display:"block", marginBottom:6}}>
              Select Cheque Book
            </label>
            <select
              value={form.chequeBookId}
              onChange={e => setForm(p => ({...p, chequeBookId: e.target.value}))}
              style={{
                width:"100%", padding:"10px 13px", border:"1.5px solid #e5e7eb", borderRadius:10,
                fontSize:13.5, fontFamily:"'Plus Jakarta Sans',sans-serif", color:"#111827",
                background:"#fff", outline:"none", appearance:"none", cursor:"pointer",
              }}
            >
              <option value="">Choose a cheque book…</option>
              {books.map(b => (
                <option key={b._id} value={b._id}>
                  {b.chequeBookId} — {b.bankAccountName} ({b.startLeaf}–{b.endLeaf})
                </option>
              ))}
            </select>
          </div>
          {selectedBook && (
            <div style={{display:"flex", gap:16, flexWrap:"wrap"}}>
              {[
                ["Leaves Remaining", (() => {
                  const issued = selectedBook.lastIssuedLeaf
                    ? parseInt(selectedBook.lastIssuedLeaf) - parseInt(selectedBook.startLeaf) + 1 : 0;
                  return selectedBook.totalLeaves - issued;
                })()],
                ["Next Cheque", nextNo],
              ].map(([k,v]) => (
                <div key={k} style={{background:"#f8fafc", border:"1px solid #e5e7eb", borderRadius:8, padding:"8px 14px"}}>
                  <div style={{fontSize:10, color:"#9ca3af", fontWeight:700, textTransform:"uppercase", letterSpacing:".07em"}}>{k}</div>
                  <div style={{fontSize:14, fontWeight:700, color:"#1e3a5f", fontFamily:"'JetBrains Mono',monospace", marginTop:2}}>{v}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ══ THE CHEQUE ══════════════════════════════════════════════════════ */}
        {selectedBook ? (
          <div style={{
            position:"relative", borderRadius:16, overflow:"hidden",
            boxShadow:"0 8px 40px rgba(0,0,0,.18), 0 2px 8px rgba(0,0,0,.1)",
            userSelect:"none",
          }}>
            {/* Background texture */}
            <div style={{
              position:"absolute", inset:0, zIndex:0,
              background:"linear-gradient(135deg,#faf7f0 0%,#f5f0e8 40%,#faf7f0 100%)",
              backgroundImage:`
                repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(139,90,43,.04) 8px, rgba(139,90,43,.04) 9px),
                repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(139,90,43,.03) 8px, rgba(139,90,43,.03) 9px)
              `,
            }}/>
            {/* Watermark */}
            <div style={{
              position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
              zIndex:1, pointerEvents:"none",
            }}>
              <div style={{
                fontSize:96, fontWeight:900, color:"rgba(30,58,95,.04)",
                fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:"-2px",
                transform:"rotate(-30deg)", whiteSpace:"nowrap",
              }}>CHEQUE</div>
            </div>

            {/* Border decorations */}
            <div style={{position:"absolute",inset:0,border:"3px solid rgba(30,58,95,.15)",borderRadius:16,zIndex:2,pointerEvents:"none"}}/>
            <div style={{position:"absolute",top:6,left:6,right:6,bottom:6,border:"1px solid rgba(30,58,95,.07)",borderRadius:12,zIndex:2,pointerEvents:"none"}}/>

            {/* Content */}
            <div style={{position:"relative", zIndex:3, padding:"22px 28px 18px"}}>

              {/* ── Row 1: Bank name + cheque no + date ── */}
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16}}>
                <div>
                  <div style={{
                    fontSize:20, fontWeight:800, color:"#1e3a5f", letterSpacing:"-.3px",
                    fontFamily:"'Plus Jakarta Sans',sans-serif",
                  }}>{selectedBook.bankAccountName}</div>
                  <div style={{fontSize:11.5, color:"#7c6a47", marginTop:2, fontFamily:"'JetBrains Mono',monospace"}}>
                    {selectedBook.branchName} | Code: {selectedBook.branchCode}
                  </div>
                  <div style={{fontSize:10.5, color:"#9a7c4a", marginTop:1, fontFamily:"'JetBrains Mono',monospace"}}>
                    A/C: {selectedBook.accountNumber} | IBAN: {selectedBook.iban}
                  </div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{
                    fontSize:13, fontWeight:700, color:"#1e3a5f",
                    background:"rgba(30,58,95,.07)", padding:"4px 12px", borderRadius:20,
                    fontFamily:"'JetBrains Mono',monospace", letterSpacing:".05em",
                    border:"1px solid rgba(30,58,95,.15)", marginBottom:8,
                  }}>
                    No. {form.chequeNo || nextNo || "—"}
                  </div>
                  {/* Date input */}
                  <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3}}>
                    <div style={{fontSize:10, color:"#9a7c4a", fontWeight:700, textTransform:"uppercase", letterSpacing:".07em"}}>Date</div>
                    <input type="date" value={form.date}
                      onChange={e => setForm(p => ({...p, date: e.target.value}))}
                      style={{
                        border:"none", borderBottom:"2px solid #b45309", background:"transparent",
                        fontFamily:"'JetBrains Mono',monospace", fontSize:13, fontWeight:600,
                        color:"#1e293b", outline:"none", textAlign:"right", width:140, cursor:"pointer",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* ── Pay line ── */}
              <div style={{
                display:"flex", alignItems:"flex-end", gap:12, marginBottom:6,
                borderBottom:"1.5px solid rgba(139,90,43,.3)", paddingBottom:4,
              }}>
                <div style={{
                  fontSize:13.5, fontWeight:700, color:"#7c6a47", whiteSpace:"nowrap",
                  letterSpacing:".02em", paddingBottom:2,
                }}>PAY</div>
                <div style={{flex:1}}>
                  <AccountPicker
                    accounts={accounts}
                    value={form.payeeAccountId}
                    onChange={(acc) => setForm(p => ({...p, payeeAccountId: acc._id, payeeAccountName: acc.accountName}))}
                  />
                </div>
                <div style={{
                  fontSize:11, fontWeight:600, color:"#7c6a47", whiteSpace:"nowrap",
                  paddingBottom:2, letterSpacing:".02em",
                }}>OR BEARER</div>
              </div>

              {/* ── Amount in words ── */}
              <div style={{
                display:"flex", alignItems:"flex-end", gap:12, marginBottom:16,
                borderBottom:"1.5px solid rgba(139,90,43,.3)", paddingBottom:4,
              }}>
                <div style={{
                  fontSize:13.5, fontWeight:700, color:"#7c6a47", whiteSpace:"nowrap", paddingBottom:2,
                }}>THE SUM OF</div>
                <div style={{flex:1, minHeight:28}}>
                  {words ? (
                    <div style={{
                      fontSize:13.5, fontWeight:600, color:"#1e293b", lineHeight:1.4,
                      fontFamily:"'Dancing Script',cursive", fontSize:17,
                    }}>{words}</div>
                  ) : (
                    <div style={{
                      fontSize:12, color:"#c4a47c", fontStyle:"italic",
                      borderBottom:"1px dashed rgba(139,90,43,.2)", paddingBottom:2,
                    }}>Amount in words will appear here</div>
                  )}
                </div>
                {/* PKR Amount box */}
                <div style={{
                  border:"2px solid rgba(30,58,95,.25)", borderRadius:6,
                  padding:"4px 12px", minWidth:160, flexShrink:0,
                }}>
                  <div style={{fontSize:9.5, color:"#9a7c4a", fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", marginBottom:2}}>PKR</div>
                  <input
                    type="number"
                    min="1"
                    max="100000000000"
                    step="0.01"
                    placeholder="0.00"
                    value={form.amount}
                    onChange={e => setForm(p => ({...p, amount: e.target.value}))}
                    style={{
                      width:"100%", border:"none", background:"transparent",
                      fontFamily:"'JetBrains Mono',monospace", fontSize:16, fontWeight:700,
                      color:"#1e3a5f", outline:"none", textAlign:"right",
                    }}
                  />
                </div>
              </div>

              {/* ── Account title + remarks + save ── */}
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", gap:20}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:12, fontWeight:600, color:"#7c6a47", marginBottom:8}}>
                    A/C PAYEE ONLY — {selectedBook.accountTitle}
                  </div>
                  <div style={{marginBottom:6}}>
                    <input
                      placeholder="Remarks / narration (optional)"
                      value={form.remarks}
                      onChange={e => setForm(p => ({...p, remarks: e.target.value}))}
                      style={{
                        width:"100%", border:"none", borderBottom:"1px dashed rgba(139,90,43,.3)",
                        background:"transparent", fontFamily:"'Plus Jakarta Sans',sans-serif",
                        fontSize:12.5, color:"#5c4a30", outline:"none", padding:"4px 0",
                      }}
                    />
                  </div>
                </div>

                {/* Save button styled like a stamp */}
                <div style={{flexShrink:0}}>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !form.payeeAccountId || !form.amount}
                    style={{
                      padding:"12px 28px", borderRadius:10,
                      background: loading || !form.payeeAccountId || !form.amount
                        ? "rgba(30,58,95,.15)"
                        : "linear-gradient(135deg,#1e3a5f,#2563eb)",
                      border:"2px solid rgba(30,58,95,.3)",
                      color: loading || !form.payeeAccountId || !form.amount ? "#9a7c4a" : "#fff",
                      fontSize:14, fontWeight:700, cursor: loading || !form.payeeAccountId || !form.amount ? "not-allowed":"pointer",
                      fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:".03em",
                      transition:".15s", boxShadow: "0 4px 12px rgba(30,58,95,.2)",
                    }}
                  >
                    {loading ? "Issuing…" : "✓ Issue Cheque"}
                  </button>
                  <div style={{fontSize:10, color:"#9a7c4a", textAlign:"center", marginTop:4}}>Authorised Signatory</div>
                </div>
              </div>

              {/* ── MICR band at bottom ── */}
              <div style={{
                marginTop:14, paddingTop:10,
                borderTop:"2px solid rgba(30,58,95,.12)",
                display:"flex", justifyContent:"space-between", alignItems:"center",
              }}>
                <div style={{
                  fontFamily:"'JetBrains Mono',monospace", fontSize:14, fontWeight:700,
                  color:"rgba(30,58,95,.5)", letterSpacing:"3px",
                }}>
                  ⑆{form.chequeNo || nextNo || "00000000"}⑆  {selectedBook.branchCode}⑆  {selectedBook.accountNumber.slice(-6)}
                </div>
                <div style={{fontSize:10, color:"#b8a07a", fontWeight:600, textTransform:"uppercase", letterSpacing:".1em"}}>
                  MILL NAME · {new Date().getFullYear()}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            background:"#fff", border:"2px dashed #e5e7eb", borderRadius:16,
            padding:"48px 24px", textAlign:"center", color:"#9ca3af",
          }}>
            <div style={{fontSize:40, marginBottom:12}}>📒</div>
            <div style={{fontSize:15, fontWeight:600, color:"#6b7280"}}>Select a Cheque Book to Start</div>
            <div style={{fontSize:13, marginTop:4}}>Choose a cheque book from the dropdown above to fill out a cheque</div>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}