import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  .ld *, .ld *::before, .ld *::after { box-sizing: border-box; }
  .ld { font-family: 'DM Sans', sans-serif; color: #111827; }

  /* ── Stat cards ── */
  .ld-stat {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; padding: 14px 16px;
    position: relative; overflow: hidden;
  }
  .ld-stat::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  }
  .ld-stat.dr::before  { background: #1f2937; }
  .ld-stat.cr::before  { background: #dc2626; }
  .ld-stat.net::before { background: #15803d; }

  /* ── Filter inputs ── */
  .ld-date-inp {
    padding: 7px 10px; border: 1px solid #d1d5db; border-radius: 6px;
    font-size: 13px; font-family: 'DM Sans', sans-serif; color: #111827;
    background: #fff; outline: none; transition: .12s;
  }
  .ld-date-inp:focus { border-color: #6b7280; box-shadow: 0 0 0 2px rgba(107,114,128,.12); }

  /* ── Table ── */
  .ld-row { transition: background .08s; }
  .ld-row:hover { background: #fafafa; }

  /* ── Skeleton ── */
  @keyframes ld-shimmer { to { background-position: -200% 0; } }
  .ld-skel {
    border-radius: 5px; height: 12px;
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    background-size: 200% 100%; animation: ld-shimmer 1.4s infinite;
  }

  @keyframes ld-up { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:none; } }
  .ld-up { animation: ld-up .18s ease both; }
`;

/* ── Helpers ── */
const fmt = n =>
  Number(n||0).toLocaleString("en-PK", { minimumFractionDigits:2, maximumFractionDigits:2 });
const fmtDate = d =>
  new Date(d).toLocaleDateString("en-PK", { day:"2-digit", month:"short", year:"numeric" });
const fmtTime = d =>
  new Date(d).toLocaleTimeString("en-PK", { hour:"2-digit", minute:"2-digit", hour12:true });

const balColor = n => n === 0 ? "#9ca3af" : n > 0 ? "#15803d" : "#dc2626";

const TYPE_CFG = {
  Assets:      { color:"#1d4ed8", bg:"#eff6ff", bd:"#bfdbfe" },
  Liabilities: { color:"#dc2626", bg:"#fef2f2", bd:"#fecaca" },
  Equity:      { color:"#7c3aed", bg:"#f5f3ff", bd:"#ddd6fe" },
  Expense:     { color:"#c2410c", bg:"#fff7ed", bd:"#fed7aa" },
  Revenue:     { color:"#15803d", bg:"#f0fdf4", bd:"#bbf7d0" },
};

export default function LedgerByAccount() {
  const { accountId }                    = useParams();
  const [searchParams, setSearchParams]  = useSearchParams();

  const [entries,     setEntries]     = useState([]);
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [startDate,   setStartDate]   = useState(searchParams.get("startDate") || "");
  const [endDate,     setEndDate]     = useState(searchParams.get("endDate")   || "");

  const fetchLedger = async () => {
    setLoading(true);
    try {
      const res  = await authFetch(`${API_BASE_URL}/ledger/account/${accountId}?${searchParams.toString()}`);
      const data = await res.json();
      if (data.success) {
        setEntries(data.entries || []);
        setAccountInfo(data.account || null);
      }
    } catch (err) { console.error("Failed:", err); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (accountId) fetchLedger(); }, [accountId, searchParams]);

  const applyFilter = () => {
    const p = {};
    if (startDate) p.startDate = startDate;
    if (endDate)   p.endDate   = endDate;
    setSearchParams(p);
  };
  const clearFilter = () => { setStartDate(""); setEndDate(""); setSearchParams({}); };

  /* ── Running balance ── */
  const accountType = accountInfo?.accountType || "Assets";
  const obDebit     = accountInfo?.openingDebit  || 0;
  const obCredit    = accountInfo?.openingCredit || 0;
  const obMovement  = (accountType==="Assets"||accountType==="Expense")
    ? obDebit - obCredit : obCredit - obDebit;

  let runBal = obMovement;
  const rows = entries.map((entry, idx) => {
    const credits     = entry.creditEntries || [];
    const isDebit     = entry.debitAccount?._id === accountId || entry.debitAccount?._id?.toString() === accountId;
    const creditEntry = credits.find(c => c.account?._id === accountId || c.account?._id?.toString() === accountId);
    const dr = isDebit ? entry.debitAmount : 0;
    const cr = creditEntry ? creditEntry.amount : 0;
    const mv = (accountType==="Assets"||accountType==="Expense") ? dr - cr : cr - dr;
    runBal += mv;
    const counter = isDebit
      ? credits.map(c=>c.account?.accountName).filter(Boolean).join(", ")
      : entry.debitAccount?.accountName || "—";
    return { idx, entry, dr, cr, runningBal: runBal, counterParties: counter };
  });

  const accountName   = accountInfo?.accountName  || "Account Ledger";
  const totalDebit    = accountInfo?.totalDebit   || 0;
  const totalCredit   = accountInfo?.totalCredit  || 0;
  const balance       = accountInfo?.balance      || 0;
  const hasOB         = obDebit > 0 || obCredit > 0;
  const isFiltered    = searchParams.get("startDate") || searchParams.get("endDate");
  const tc            = TYPE_CFG[accountType] || TYPE_CFG.Assets;

  const periodDR = rows.reduce((s,r)=>s+r.dr, 0);
  const periodCR = rows.reduce((s,r)=>s+r.cr, 0);

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <div className="ld" style={{ maxWidth:1020, margin:"0 auto", paddingBottom:48 }}>

        {/* ── Page header ── */}
        <div style={{ marginBottom:18 }}>
          <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 3px", fontWeight:700, letterSpacing:".08em", textTransform:"uppercase" }}>
            Account Ledger
          </p>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
            <div>
              <h1 style={{ margin:0, fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px" }}>
                {accountName}
              </h1>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginTop:5, flexWrap:"wrap" }}>
                <span style={{
                  fontSize:10, fontWeight:700, padding:"2px 9px", borderRadius:4,
                  fontFamily:"'DM Mono',monospace", letterSpacing:".05em",
                  background:tc.bg, color:tc.color, border:`1px solid ${tc.bd}`,
                }}>
                  {accountType}
                </span>
                <span style={{ fontSize:11.5, color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>
                  {entries.length} transaction{entries.length!==1?"s":""}
                  {isFiltered ? " · filtered" : ""}
                </span>
              </div>
            </div>
            {/* Current balance chip */}
            {accountInfo && (
              <div style={{
                background:"#fff", border:"1px solid #e5e7eb", borderRadius:8,
                padding:"10px 16px", textAlign:"right",
              }}>
                <div style={{ fontSize:9.5, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#9ca3af", marginBottom:3, fontFamily:"'DM Mono',monospace" }}>
                  Current Balance
                </div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:20, fontWeight:700, color:balColor(balance), letterSpacing:"-.3px" }}>
                  {fmt(Math.abs(balance))}
                </div>
                <div style={{ fontSize:10, color:"#9ca3af", marginTop:2, fontFamily:"'DM Mono',monospace" }}>
                  {(accountType==="Assets"||accountType==="Expense") ? "DR normal" : "CR normal"}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="ld-up" style={{ display:"flex", flexDirection:"column", gap:12 }}>

          {/* ── Stat cards ── */}
          {accountInfo && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
              {[
                { cls:"dr",  label:"Total Debit",  val:totalDebit,           sub:"Cumulative DR",                      color:"#1f2937" },
                { cls:"cr",  label:"Total Credit", val:totalCredit,          sub:"Cumulative CR",                      color:"#dc2626" },
                { cls:"net", label:"Net Balance",  val:Math.abs(balance),    sub:balance>=0?"Positive":"Deficit",      color:balColor(balance) },
              ].map(s => (
                <div key={s.cls} className={`ld-stat ${s.cls}`}>
                  <p style={{ margin:"0 0 5px", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af" }}>
                    {s.label}
                  </p>
                  <p style={{ margin:"0 0 3px", fontFamily:"'DM Mono',monospace", fontSize:20, fontWeight:700, color:s.color, lineHeight:1 }}>
                    {fmt(s.val)}
                  </p>
                  <p style={{ margin:0, fontSize:11, color:"#9ca3af" }}>{s.sub}</p>
                </div>
              ))}
            </div>
          )}

          {/* ── Filter bar ── */}
          <div style={{
            background:"#fff", border:"1px solid #e5e7eb", borderRadius:8,
            padding:"10px 12px", display:"flex", flexWrap:"wrap", alignItems:"flex-end", gap:8,
          }}>
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#9ca3af", alignSelf:"center", marginRight:2, fontFamily:"'DM Mono',monospace" }}>
              Filter
            </span>
            {[
              { label:"From", val:startDate, set:setStartDate },
              { label:"To",   val:endDate,   set:setEndDate   },
            ].map(f => (
              <div key={f.label}>
                <div style={{ fontSize:9.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", marginBottom:4, fontFamily:"'DM Mono',monospace" }}>
                  {f.label}
                </div>
                <input type="date" className="ld-date-inp" value={f.val} onChange={e=>f.set(e.target.value)}/>
              </div>
            ))}
            <button onClick={applyFilter} style={{
              padding:"7px 16px", borderRadius:6, border:"none", cursor:"pointer",
              background:"#111827", color:"#fff", fontSize:13, fontWeight:600,
              fontFamily:"'DM Sans',sans-serif", transition:"background .1s",
            }}
              onMouseEnter={e=>e.currentTarget.style.background="#1f2937"}
              onMouseLeave={e=>e.currentTarget.style.background="#111827"}>
              Apply
            </button>
            {isFiltered && (
              <button onClick={clearFilter} style={{
                padding:"7px 12px", borderRadius:6,
                border:"1px solid #fecaca", background:"#fef2f2",
                color:"#dc2626", fontSize:13, fontWeight:600,
                fontFamily:"'DM Sans',sans-serif", cursor:"pointer",
              }}>
                Clear ✕
              </button>
            )}
            <span style={{ marginLeft:"auto", fontSize:11.5, color:"#9ca3af", fontFamily:"'DM Mono',monospace", alignSelf:"center" }}>
              {entries.length} shown
            </span>
          </div>

          {/* ── Ledger table ── */}
          <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, overflow:"hidden" }}>

            {/* Table title strip */}
            <div style={{
              padding:"9px 14px", background:"#f9fafb", borderBottom:"1px solid #e5e7eb",
              display:"flex", alignItems:"center", justifyContent:"space-between",
            }}>
              <span style={{ fontSize:13, fontWeight:700, color:"#111827" }}>Transaction History</span>
              <span style={{ fontSize:11.5, color:"#9ca3af", fontFamily:"'DM Mono',monospace" }}>
                {entries.length} entries
              </span>
            </div>

            {loading ? (
              <div style={{ padding:16 }}>
                {[...Array(5)].map((_,i) => (
                  <div key={i} style={{ display:"flex", gap:10, marginBottom:11 }}>
                    {[36,90,170,130,80,80,70].map((w,j) => (
                      <div key={j} className="ld-skel" style={{ width:w }}/>
                    ))}
                  </div>
                ))}
              </div>
            ) : rows.length === 0 ? (
              <div style={{ textAlign:"center", padding:"48px 0" }}>
                <div style={{ fontSize:32, marginBottom:10 }}>📒</div>
                <p style={{ fontSize:13.5, fontWeight:700, color:"#374151", margin:"0 0 4px" }}>
                  No transactions found
                </p>
                <p style={{ fontSize:12.5, color:"#9ca3af", margin:0 }}>
                  {isFiltered ? "Try adjusting the date filter." : "No transactions recorded yet."}
                </p>
              </div>
            ) : (
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead>
                    <tr style={{ background:"#f9fafb", borderBottom:"1px solid #e5e7eb" }}>
                      {[
                        { label:"#",           align:"left",  w:36  },
                        { label:"Date",         align:"left",  w:112 },
                        { label:"Description",  align:"left"        },
                        { label:"Counter Acct", align:"left",  w:155 },
                        { label:"Debit",        align:"right", w:115, color:"#1f2937" },
                        { label:"Credit",       align:"right", w:115, color:"#dc2626" },
                        { label:"Balance",      align:"right", w:115, color:"#15803d" },
                      ].map(h => (
                        <th key={h.label} style={{
                          padding:"8px 14px", textAlign:h.align,
                          fontSize:10, fontWeight:700, textTransform:"uppercase",
                          letterSpacing:".07em", color:h.color||"#9ca3af",
                          fontFamily:"'DM Sans',sans-serif",
                          width:h.w||"auto", whiteSpace:"nowrap",
                        }}>{h.label}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {/* Opening balance row */}
                    {hasOB && !accountInfo?.isProtected && (
                      <tr style={{ background:"#f9fafb", borderBottom:"1px solid #f3f4f6" }}>
                        <td style={{ padding:"9px 14px" }}>
                          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9.5, color:"#9ca3af", fontWeight:700 }}>OB</span>
                        </td>
                        <td style={{ padding:"9px 14px" }}>
                          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11.5, fontWeight:600, color:"#6b7280" }}>Opening</div>
                          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9.5, color:"#d1d5db", marginTop:2 }}>Account creation</div>
                        </td>
                        <td style={{ padding:"9px 14px" }}>
                          <div style={{ fontSize:13, fontWeight:600, color:"#374151" }}>Opening Balance</div>
                          <div style={{ fontSize:11, color:"#9ca3af", marginTop:2 }}>Initial balance at account creation</div>
                        </td>
                        <td style={{ padding:"9px 14px" }}>
                          <span style={{ fontSize:12, color:"#d1d5db", fontStyle:"italic" }}>—</span>
                        </td>
                        <td style={{ padding:"9px 14px", textAlign:"right" }}>
                          {obDebit > 0
                            ? <span style={{ fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, color:"#111827" }}>{fmt(obDebit)}</span>
                            : <span style={{ color:"#e5e7eb", fontSize:11 }}>—</span>}
                        </td>
                        <td style={{ padding:"9px 14px", textAlign:"right" }}>
                          {obCredit > 0
                            ? <span style={{ fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, color:"#111827" }}>{fmt(obCredit)}</span>
                            : <span style={{ color:"#e5e7eb", fontSize:11 }}>—</span>}
                        </td>
                        <td style={{ padding:"9px 14px", textAlign:"right" }}>
                          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, color:balColor(obMovement) }}>
                            {fmt(Math.abs(obMovement))}
                          </span>
                        </td>
                      </tr>
                    )}

                    {rows.map(({ idx, entry, dr, cr, runningBal, counterParties }) => (
                      <tr key={entry._id} className="ld-row" style={{ borderBottom:"1px solid #f9fafb" }}>
                        <td style={{ padding:"9px 14px" }}>
                          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#d1d5db", fontWeight:600 }}>
                            {String(idx+1).padStart(2,"0")}
                          </span>
                        </td>
                        <td style={{ padding:"9px 14px", whiteSpace:"nowrap" }}>
                          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11.5, fontWeight:600, color:"#374151" }}>
                            {fmtDate(entry.entryDate)}
                          </div>
                          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9.5, color:"#9ca3af", marginTop:2 }}>
                            {fmtTime(entry.entryDate)}
                          </div>
                        </td>
                        <td style={{ padding:"9px 14px", maxWidth:200 }}>
                          <div style={{ fontSize:13, fontWeight:500, color:"#111827", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                            {entry.debitLineDesc || entry.description || "—"}
                          </div>
                          {entry.comments && (
                            <div style={{ fontSize:11, color:"#9ca3af", marginTop:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                              {entry.comments}
                            </div>
                          )}
                        </td>
                        <td style={{ padding:"9px 14px", maxWidth:160 }}>
                          <span style={{ fontSize:11.5, color:"#6b7280", overflow:"hidden", textOverflow:"ellipsis", display:"block", whiteSpace:"nowrap" }}>
                            {counterParties || "—"}
                          </span>
                        </td>
                        <td style={{ padding:"9px 14px", textAlign:"right" }}>
                          {dr > 0
                            ? <span style={{ fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, color:"#111827" }}>{fmt(dr)}</span>
                            : <span style={{ color:"#e5e7eb", fontSize:11 }}>—</span>}
                        </td>
                        <td style={{ padding:"9px 14px", textAlign:"right" }}>
                          {cr > 0
                            ? <span style={{ fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, color:"#111827" }}>{fmt(cr)}</span>
                            : <span style={{ color:"#e5e7eb", fontSize:11 }}>—</span>}
                        </td>
                        <td style={{ padding:"9px 14px", textAlign:"right" }}>
                          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, color:balColor(runningBal) }}>
                            {fmt(Math.abs(runningBal))}
                          </span>
                          {runningBal !== 0 && (
                            <div style={{ fontSize:9, color:balColor(runningBal), opacity:.7, marginTop:1, fontFamily:"'DM Mono',monospace", letterSpacing:".06em", textAlign:"right" }}>
                              {runningBal > 0 ? "DR" : "CR"}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {/* Totals footer */}
                  <tfoot>
                    <tr style={{ borderTop:"1.5px solid #e5e7eb", background:"#f9fafb" }}>
                      <td colSpan={4} style={{ padding:"9px 14px", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af" }}>
                        Period Totals
                      </td>
                      <td style={{ padding:"9px 14px", textAlign:"right" }}>
                        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, color:"#1f2937" }}>
                          {fmt(periodDR)}
                        </span>
                      </td>
                      <td style={{ padding:"9px 14px", textAlign:"right" }}>
                        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, color:"#dc2626" }}>
                          {fmt(periodCR)}
                        </span>
                      </td>
                      <td style={{ padding:"9px 14px", textAlign:"right" }}>
                        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:14, fontWeight:700, color:balColor(balance) }}>
                          {fmt(Math.abs(balance))}
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>

          {/* ── Reconciliation strip ── */}
          {rows.length > 0 && (
            <div style={{
              background:"#111827", border:"1px solid rgba(255,255,255,.07)",
              borderRadius:8, padding:"14px 18px",
              display:"flex", alignItems:"center", justifyContent:"space-between",
              flexWrap:"wrap", gap:12,
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:18, flexWrap:"wrap" }}>
                {[
                  { label:"Total DR", val:fmt(totalDebit),  color:"rgba(255,255,255,.7)" },
                  { label:"Total CR", val:fmt(totalCredit), color:"#f87171"              },
                ].map((item,i) => (
                  <React.Fragment key={item.label}>
                    {i>0 && <span style={{ color:"rgba(255,255,255,.2)", fontSize:14 }}>−</span>}
                    <div>
                      <div style={{ fontSize:9.5, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,.3)", marginBottom:3, fontFamily:"'DM Mono',monospace" }}>
                        {item.label}
                      </div>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:15, fontWeight:700, color:item.color }}>
                        {item.val}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
                <span style={{ color:"rgba(255,255,255,.2)", fontSize:14 }}>=</span>
                <div>
                  <div style={{ fontSize:9.5, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,.3)", marginBottom:3, fontFamily:"'DM Mono',monospace" }}>
                    Net Balance
                  </div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:18, fontWeight:700, color: balance>=0 ? "#4ade80" : "#f87171" }}>
                    {fmt(Math.abs(balance))}
                  </div>
                </div>
              </div>
              <div style={{
                padding:"5px 13px", borderRadius:6,
                background: balance>=0 ? "rgba(74,222,128,.12)" : "rgba(239,68,68,.12)",
                border: `1px solid ${balance>=0 ? "rgba(74,222,128,.2)" : "rgba(239,68,68,.2)"}`,
                fontSize:11, fontWeight:700, fontFamily:"'DM Mono',monospace",
                color: balance>=0 ? "#4ade80" : "#f87171",
                letterSpacing:".06em",
              }}>
                {balance >= 0 ? "▲ DR" : "▼ CR"} BALANCE
              </div>
            </div>
          )}

        </div>
      </div>
    </SidebarLayout>
  );
}