import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  :root {
    --oc-black:#0B0C0D; --oc-dark:#141A1F; --oc-navy:#212A37;
    --oc-slate:#253240; --oc-steel:#334455; --oc-mid:#6E7170;
    --oc-silver:#A5A8A6; --oc-light:#DADADA; --oc-bg:#F5F5F5; --oc-bg2:#ECECEC;
    --oc-gold:#929183; --oc-g2:#7A7970; --oc-g3:#A8A79F;
  }

  .ld * { box-sizing: border-box; }
  .ld { font-family:'DM Sans',sans-serif; color:var(--oc-black); }
  .ld-title { font-family:'Cormorant Garamond',serif; }
  .ld-mono  { font-family:'DM Mono',monospace; }

  @keyframes ld-fadein {
    from { opacity:0; transform:translateY(6px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .ld-fadein { animation:ld-fadein .22s ease both; }

  /* ── Table row hover ── */
  .ld-row { transition:background .12s; }
  .ld-row:hover { background:rgba(146,145,131,.04); }

  /* ── Stat cards ── */
  .ld-stat {
    background:#fff; border:1.5px solid var(--oc-bg2);
    border-radius:14px; padding:18px 20px;
    position:relative; overflow:hidden;
    box-shadow:0 2px 8px rgba(11,12,13,.04);
    transition:box-shadow .18s;
  }
  .ld-stat:hover { box-shadow:0 4px 16px rgba(11,12,13,.08); }
  .ld-stat::before {
    content:''; position:absolute; top:0; left:0; right:0; height:3px;
  }
  .ld-stat.dr::before   { background:#929183; }
  .ld-stat.cr::before   { background:#ef4444; }
  .ld-stat.net::before  { background:var(--oc-navy); }

  /* ── Filter bar ── */
  .ld-filter-inp {
    padding:8px 12px; border:1.5px solid var(--oc-bg2); border-radius:9px;
    font-size:12.5px; font-family:'DM Sans',sans-serif; color:var(--oc-black);
    background:var(--oc-bg); outline:none; transition:.15s;
  }
  .ld-filter-inp:focus { border-color:var(--oc-navy); box-shadow:0 0 0 3px rgba(33,42,55,.08); background:#fff; }

  /* ── Shimmer skeleton ── */
  @keyframes ld-shimmer { to { background-position:-200% 0; } }
  .ld-skel {
    border-radius:6px; height:13px;
    background:linear-gradient(90deg,#F5F5F5 25%,#ECECEC 50%,#F5F5F5 75%);
    background-size:200% 100%;
    animation:ld-shimmer 1.4s infinite;
  }

  /* ── Reconciliation banner ── */
  .ld-recon {
    background:var(--oc-dark);
    border:1px solid rgba(146,145,131,.2);
    border-radius:12px; padding:14px 22px;
    display:flex; align-items:center; justify-content:space-between;
    flex-wrap:wrap; gap:10px;
    box-shadow:0 4px 16px rgba(11,12,13,.2);
  }
`;

/* ── Helpers ── */
const fmt = (n) =>
  Number(n || 0).toLocaleString("en-PK", { minimumFractionDigits:2, maximumFractionDigits:2 });
const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-PK", { day:"2-digit", month:"short", year:"numeric" });
const fmtTime = (d) =>
  new Date(d).toLocaleTimeString("en-PK", { hour:"2-digit", minute:"2-digit", hour12:true });

const balColor = (amount) => {
  if (amount === 0) return "#A5A8A6";
  return amount > 0 ? "#22c55e" : "#ef4444";
};

export default function LedgerByAccount() {
  const { accountId }  = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [entries,     setEntries]     = useState([]);
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [startDate,   setStartDate]   = useState(searchParams.get("startDate") || "");
  const [endDate,     setEndDate]     = useState(searchParams.get("endDate")   || "");

  const fetchLedger = async () => {
    setLoading(true);
    try {
      const qs  = searchParams.toString();
      const res = await authFetch(`${API_BASE_URL}/ledger/account/${accountId}?${qs}`);
      const data = await res.json();
      if (data.success) {
        setEntries(data.entries || []);
        setAccountInfo(data.account || null);
      }
    } catch (err) {
      console.error("Failed to fetch ledger:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (accountId) fetchLedger(); }, [accountId, searchParams]);

  const applyFilter = () => {
    const p = {};
    if (startDate) p.startDate = startDate;
    if (endDate)   p.endDate   = endDate;
    setSearchParams(p);
  };
  const clearFilter = () => { setStartDate(""); setEndDate(""); setSearchParams({}); };

  /* ── Computed rows ── */
  const accountType = accountInfo?.accountType || "Assets";
  const obDebit     = accountInfo?.openingDebit  || 0;
  const obCredit    = accountInfo?.openingCredit || 0;
  const obMovement  =
    accountType === "Assets" || accountType === "Expense"
      ? obDebit - obCredit
      : obCredit - obDebit;

  let runningBal = obMovement;
  const rows = entries.map((entry, idx) => {
    const credits    = entry.creditEntries || [];
    const isDebit    = entry.debitAccount?._id === accountId || entry.debitAccount?._id?.toString() === accountId;
    const creditEntry = credits.find(c => c.account?._id === accountId || c.account?._id?.toString() === accountId);

    const dr = isDebit ? entry.debitAmount : 0;
    const cr = creditEntry ? creditEntry.amount : 0;

    const mv = accountType === "Assets" || accountType === "Expense" ? dr - cr : cr - dr;
    runningBal += mv;

    const counterParties = isDebit
      ? credits.map(c => c.account?.accountName).filter(Boolean).join(", ")
      : entry.debitAccount?.accountName || "—";

    return { idx, entry, dr, cr, runningBal, counterParties };
  });

  /* ── Derived display values ── */
  const accountName   = accountInfo?.accountName  || "Account Ledger";
  const totalDebit    = accountInfo?.totalDebit   || 0;
  const totalCredit   = accountInfo?.totalCredit  || 0;
  const balance       = accountInfo?.balance      || 0;
  const hasOB         = (accountInfo?.openingDebit || 0) > 0 || (accountInfo?.openingCredit || 0) > 0;
  const isFiltered    = searchParams.get("startDate") || searchParams.get("endDate");

  /* ── Category tag color ── */
  const typeColors = {
    Assets:      { bg:"rgba(146,145,131,.1)", color:"#929183", border:"rgba(146,145,131,.25)" },
    Liabilities: { bg:"rgba(239,68,68,.08)", color:"#ef4444", border:"rgba(239,68,68,.2)" },
    Equity:      { bg:"rgba(33,42,55,.1)",   color:"#334455", border:"rgba(33,42,55,.2)" },
    Expense:     { bg:"rgba(239,68,68,.08)", color:"#b91c1c", border:"rgba(239,68,68,.18)" },
    Revenue:     { bg:"rgba(34,197,94,.08)", color:"#15803d", border:"rgba(34,197,94,.2)" },
  };
  const tc = typeColors[accountType] || typeColors.Assets;

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>

      <div className="ld" style={{ maxWidth:1060, margin:"0 auto", paddingBottom:60 }}>

        {/* ══ MASTHEAD ══════════════════════════════════════════════════════ */}
        <div style={{
          background:"linear-gradient(140deg,#0B0C0D 0%,#141A1F 50%,#1A2230 100%)",
          borderRadius:18, padding:"28px 32px", marginBottom:20,
          border:"1px solid rgba(146,145,131,.14)",
          boxShadow:"0 16px 48px rgba(0,0,0,.35), inset 0 1px 0 rgba(146,145,131,.07)",
          position:"relative", overflow:"hidden",
        }}>
          {/* Gold accent bar */}
          <div style={{
            position:"absolute", top:0, left:0, right:0, height:3,
            background:"linear-gradient(90deg,#0B0C0D,#929183 30%,#A8A79F 55%,#334455)",
          }}/>
          {/* Orb */}
          <div style={{
            position:"absolute", right:-60, top:-60, width:280, height:280, borderRadius:"50%",
            background:"radial-gradient(circle,rgba(146,145,131,.07) 0%,transparent 65%)",
            pointerEvents:"none",
          }}/>

          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16, flexWrap:"wrap", position:"relative", zIndex:1 }}>
            <div>
              {/* Breadcrumb */}
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
                <span style={{ fontSize:9.5, fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", color:"rgba(146,145,131,.5)" }}>
                  Account Ledger
                </span>
                {accountInfo && (
                  <>
                    <span style={{ color:"rgba(146,145,131,.25)", fontSize:11 }}>›</span>
                    <span style={{ fontSize:9.5, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(165,168,166,.5)" }}>
                      {accountInfo.accountType}
                    </span>
                  </>
                )}
              </div>

              {/* Account name */}
              <h1 className="ld-title" style={{
                margin:0, fontSize:30, fontWeight:700, fontStyle:"italic",
                color:"rgba(255,255,255,.92)", letterSpacing:"-.4px", lineHeight:1.1,
                marginBottom:12,
              }}>
                {accountName}
              </h1>

              <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                {/* Type badge */}
                <span style={{
                  fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:20,
                  fontFamily:"'DM Mono',monospace", letterSpacing:".06em",
                  background:tc.bg, color:tc.color, border:`1px solid ${tc.border}`,
                }}>
                  {accountType}
                </span>
                {/* Entry count */}
                <span style={{ fontSize:11, color:"rgba(165,168,166,.55)", fontFamily:"'DM Mono',monospace" }}>
                  {entries.length} transaction{entries.length !== 1 ? "s" : ""}
                  {isFiltered ? " · filtered" : ""}
                </span>
              </div>
            </div>

            {/* Balance display */}
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:9.5, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(165,168,166,.45)", marginBottom:6, fontFamily:"'DM Mono',monospace" }}>
                Current Balance
              </div>
              <div className="ld-mono" style={{
                fontSize:28, fontWeight:700, letterSpacing:"-.5px",
                color: balColor(balance),
              }}>
                {fmt(Math.abs(balance))}
              </div>
              <div style={{ fontSize:10.5, color:"rgba(165,168,166,.4)", marginTop:3, fontFamily:"'DM Mono',monospace" }}>
                {accountType === "Assets" || accountType === "Expense" ? "DR normal" : "CR normal"}
              </div>
            </div>
          </div>
        </div>

        <div className="ld-fadein" style={{ display:"flex", flexDirection:"column", gap:14 }}>

          {/* ══ STAT CARDS ═══════════════════════════════════════════════════ */}
          {accountInfo && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
              {[
                { cls:"dr",  label:"Total Debit",  val:totalDebit,  sub:"Cumulative DR",  color:"#929183" },
                { cls:"cr",  label:"Total Credit", val:totalCredit, sub:"Cumulative CR",  color:"#ef4444" },
                { cls:"net", label:"Net Balance",  val:Math.abs(balance), sub: balance >= 0 ? "Positive ↑" : "Deficit ↓", color:balColor(balance) },
              ].map(s => (
                <div key={s.cls} className={`ld-stat ${s.cls}`}>
                  <div style={{ fontSize:9.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", color:"var(--oc-silver)", marginBottom:10 }}>
                    {s.label}
                  </div>
                  <div className="ld-mono" style={{ fontSize:22, fontWeight:700, color:s.color, letterSpacing:"-.4px", marginBottom:4 }}>
                    {fmt(s.val)}
                  </div>
                  <div style={{ fontSize:10.5, color:"var(--oc-mid)" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          )}

          {/* ══ FILTER BAR ════════════════════════════════════════════════════ */}
          <div style={{
            background:"#fff", border:"1.5px solid var(--oc-bg2)",
            borderRadius:12, padding:"12px 18px",
            display:"flex", flexWrap:"wrap", alignItems:"flex-end", gap:10,
            boxShadow:"0 1px 4px rgba(11,12,13,.04)",
          }}>
            <div style={{ fontSize:9.5, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"var(--oc-silver)", alignSelf:"center", marginRight:4, whiteSpace:"nowrap" }}>
              Filter
            </div>
            {[
              { label:"From", val:startDate, set:setStartDate },
              { label:"To",   val:endDate,   set:setEndDate   },
            ].map(f => (
              <div key={f.label}>
                <div style={{ fontSize:9.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:"var(--oc-silver)", marginBottom:5 }}>{f.label}</div>
                <input type="date" value={f.val} onChange={e => f.set(e.target.value)} className="ld-filter-inp"/>
              </div>
            ))}
            <button onClick={applyFilter} style={{
              padding:"8px 18px", borderRadius:9, border:"none", cursor:"pointer",
              background:"var(--oc-navy)", color:"#fff", fontSize:12.5, fontWeight:700,
              fontFamily:"'DM Sans',sans-serif", transition:"background .15s",
            }}
              onMouseEnter={e=>e.target.style.background="#141A1F"}
              onMouseLeave={e=>e.target.style.background="var(--oc-navy)"}
            >
              Apply
            </button>
            {isFiltered && (
              <button onClick={clearFilter} style={{
                padding:"8px 14px", borderRadius:9, border:"1.5px solid #fecaca",
                background:"#fef2f2", color:"#dc2626", fontSize:12.5, fontWeight:700,
                fontFamily:"'DM Sans',sans-serif", cursor:"pointer",
              }}>
                Clear ✕
              </button>
            )}
            <span style={{ marginLeft:"auto", fontSize:10.5, color:"var(--oc-silver)", fontFamily:"'DM Mono',monospace", alignSelf:"center" }}>
              {entries.length} shown
            </span>
          </div>

          {/* ══ LEDGER TABLE ══════════════════════════════════════════════════ */}
          <div style={{
            background:"#fff", border:"1.5px solid var(--oc-bg2)",
            borderRadius:14, overflow:"hidden",
            boxShadow:"0 2px 10px rgba(11,12,13,.05)",
          }}>
            {/* Table header */}
            <div style={{
              padding:"10px 20px",
              borderBottom:"1.5px solid var(--oc-bg2)",
              background:"var(--oc-bg)",
              display:"flex", alignItems:"center", justifyContent:"space-between",
            }}>
              <span style={{ fontSize:12.5, fontWeight:700, color:"var(--oc-navy)" }}>Transaction History</span>
              <span className="ld-mono" style={{ fontSize:10.5, color:"var(--oc-silver)" }}>{entries.length} entries</span>
            </div>

            {loading ? (
              <div style={{ padding:20 }}>
                {[...Array(5)].map((_,i) => (
                  <div key={i} style={{ display:"flex", gap:12, marginBottom:12 }}>
                    {[40,80,160,120,80,80,70].map((w,j) => (
                      <div key={j} className="ld-skel" style={{ width:w }}/>
                    ))}
                  </div>
                ))}
              </div>
            ) : rows.length === 0 ? (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"56px 0", textAlign:"center" }}>
                <div style={{ fontSize:36, marginBottom:12 }}>📒</div>
                <div style={{ fontSize:13.5, fontWeight:700, color:"var(--oc-steel)", marginBottom:4 }}>No transactions found</div>
                <div style={{ fontSize:12, color:"var(--oc-silver)" }}>
                  {isFiltered ? "Try adjusting the date filter." : "No transactions recorded yet."}
                </div>
              </div>
            ) : (
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead>
                    <tr style={{ background:"var(--oc-bg)", borderBottom:"1.5px solid var(--oc-bg2)" }}>
                      {[
                        { label:"#",            align:"left",  w:36  },
                        { label:"Date",          align:"left",  w:110 },
                        { label:"Description",   align:"left"        },
                        { label:"Counter Acct",  align:"left",  w:150 },
                        { label:"Debit",         align:"right", w:110, color:"#929183" },
                        { label:"Credit",        align:"right", w:110, color:"#ef4444" },
                        { label:"Balance",       align:"right", w:110, color:"var(--oc-navy)" },
                      ].map(h => (
                        <th key={h.label} style={{
                          padding:"8px 16px", textAlign:h.align,
                          fontSize:9.5, fontWeight:700, textTransform:"uppercase",
                          letterSpacing:".1em", color:h.color||"var(--oc-silver)",
                          fontFamily:"'DM Sans',sans-serif",
                          width:h.w||"auto", whiteSpace:"nowrap",
                        }}>{h.label}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {/* Opening balance row */}
                    {hasOB && !accountInfo?.isProtected && (
                      <tr style={{ background:"rgba(146,145,131,.04)", borderBottom:"1px solid rgba(146,145,131,.1)" }}>
                        <td style={{ padding:"10px 16px" }}>
                          <span className="ld-mono" style={{ fontSize:9.5, color:"#929183", fontWeight:600 }}>OB</span>
                        </td>
                        <td style={{ padding:"10px 16px" }}>
                          <div className="ld-mono" style={{ fontSize:11.5, color:"#929183", fontWeight:600 }}>Opening</div>
                          <div className="ld-mono" style={{ fontSize:10, color:"rgba(146,145,131,.5)", marginTop:2 }}>Account creation</div>
                        </td>
                        <td style={{ padding:"10px 16px" }}>
                          <div style={{ fontSize:13, fontWeight:600, color:"var(--oc-steel)" }}>Opening Balance</div>
                          <div style={{ fontSize:11, color:"var(--oc-silver)", marginTop:2 }}>Initial balance at account creation</div>
                        </td>
                        <td style={{ padding:"10px 16px" }}>
                          <span style={{ fontSize:11.5, color:"var(--oc-silver)", fontStyle:"italic" }}>—</span>
                        </td>
                        <td style={{ padding:"10px 16px", textAlign:"right" }}>
                          {obDebit > 0
                            ? <span className="ld-mono" style={{ fontSize:13, fontWeight:700, color:"var(--oc-black)" }}>{fmt(obDebit)}</span>
                            : <span style={{ color:"var(--oc-bg2)", fontSize:11 }}>—</span>}
                        </td>
                        <td style={{ padding:"10px 16px", textAlign:"right" }}>
                          {obCredit > 0
                            ? <span className="ld-mono" style={{ fontSize:13, fontWeight:700, color:"var(--oc-black)" }}>{fmt(obCredit)}</span>
                            : <span style={{ color:"var(--oc-bg2)", fontSize:11 }}>—</span>}
                        </td>
                        <td style={{ padding:"10px 16px", textAlign:"right" }}>
                          <span className="ld-mono" style={{ fontSize:13, fontWeight:700, color:balColor(obMovement) }}>{fmt(Math.abs(obMovement))}</span>
                        </td>
                      </tr>
                    )}

                    {rows.map(({ idx, entry, dr, cr, runningBal, counterParties }) => (
                      <tr key={entry._id} className="ld-row" style={{ borderBottom:"1px solid var(--oc-bg)" }}>
                        <td style={{ padding:"10px 16px" }}>
                          <span className="ld-mono" style={{ fontSize:10, color:"var(--oc-light)", fontWeight:600 }}>
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                        </td>
                        <td style={{ padding:"10px 16px", whiteSpace:"nowrap" }}>
                          <div className="ld-mono" style={{ fontSize:11.5, fontWeight:600, color:"var(--oc-steel)" }}>{fmtDate(entry.entryDate)}</div>
                          <div className="ld-mono" style={{ fontSize:9.5, color:"var(--oc-silver)", marginTop:2 }}>{fmtTime(entry.entryDate)}</div>
                        </td>
                        <td style={{ padding:"10px 16px", maxWidth:200 }}>
                          <div style={{ fontSize:13, fontWeight:500, color:"var(--oc-black)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                            {entry.debitLineDesc || entry.description || "—"}
                          </div>
                          {entry.comments && (
                            <div style={{ fontSize:11, color:"var(--oc-silver)", marginTop:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                              {entry.comments}
                            </div>
                          )}
                        </td>
                        <td style={{ padding:"10px 16px", maxWidth:160 }}>
                          <span style={{ fontSize:11.5, color:"var(--oc-mid)", overflow:"hidden", textOverflow:"ellipsis", display:"block", whiteSpace:"nowrap" }}>
                            {counterParties || "—"}
                          </span>
                        </td>
                        <td style={{ padding:"10px 16px", textAlign:"right" }}>
                          {dr > 0
                            ? <span className="ld-mono" style={{ fontSize:13, fontWeight:700, color:"var(--oc-black)" }}>{fmt(dr)}</span>
                            : <span style={{ color:"var(--oc-bg2)", fontSize:11 }}>—</span>}
                        </td>
                        <td style={{ padding:"10px 16px", textAlign:"right" }}>
                          {cr > 0
                            ? <span className="ld-mono" style={{ fontSize:13, fontWeight:700, color:"var(--oc-black)" }}>{fmt(cr)}</span>
                            : <span style={{ color:"var(--oc-bg2)", fontSize:11 }}>—</span>}
                        </td>
                        <td style={{ padding:"10px 16px", textAlign:"right" }}>
                          <span className="ld-mono" style={{ fontSize:13, fontWeight:700, color:balColor(runningBal) }}>
                            {fmt(Math.abs(runningBal))}
                          </span>
                          {runningBal !== 0 && (
                            <div style={{ fontSize:9, color:balColor(runningBal), opacity:.7, marginTop:1, textAlign:"right", fontFamily:"'DM Mono',monospace", letterSpacing:".06em" }}>
                              {runningBal > 0 ? "DR" : "CR"}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {/* Totals footer */}
                  <tfoot>
                    <tr style={{ borderTop:"2px solid var(--oc-bg2)", background:"var(--oc-bg)" }}>
                      <td colSpan={4} style={{ padding:"10px 16px", fontSize:9.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:"var(--oc-mid)", fontFamily:"'DM Sans',sans-serif" }}>
                        Period Totals
                      </td>
                      <td style={{ padding:"10px 16px", textAlign:"right" }}>
                        <span className="ld-mono" style={{ fontSize:13, fontWeight:700, color:"#929183" }}>
                          {fmt(rows.reduce((s,r)=>s+r.dr,0))}
                        </span>
                      </td>
                      <td style={{ padding:"10px 16px", textAlign:"right" }}>
                        <span className="ld-mono" style={{ fontSize:13, fontWeight:700, color:"#ef4444" }}>
                          {fmt(rows.reduce((s,r)=>s+r.cr,0))}
                        </span>
                      </td>
                      <td style={{ padding:"10px 16px", textAlign:"right" }}>
                        <span className="ld-mono" style={{ fontSize:14, fontWeight:700, color:balColor(balance) }}>
                          {fmt(Math.abs(balance))}
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>

          {/* ══ RECONCILIATION BANNER ════════════════════════════════════════ */}
          {rows.length > 0 && (
            <div className="ld-recon">
              <div style={{ display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
                {[
                  { label:"Total DR", val:fmt(totalDebit),  color:"#929183" },
                  { label:"Total CR", val:fmt(totalCredit), color:"#ef4444" },
                ].map((item, i) => (
                  <React.Fragment key={item.label}>
                    {i > 0 && <span style={{ color:"rgba(165,168,166,.25)", fontSize:16 }}>−</span>}
                    <div>
                      <div style={{ fontSize:9.5, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"rgba(165,168,166,.4)", marginBottom:3, fontFamily:"'DM Mono',monospace" }}>{item.label}</div>
                      <div className="ld-mono" style={{ fontSize:15, fontWeight:700, color:item.color }}>{item.val}</div>
                    </div>
                  </React.Fragment>
                ))}
                <span style={{ color:"rgba(165,168,166,.25)", fontSize:16 }}>=</span>
                <div>
                  <div style={{ fontSize:9.5, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"rgba(165,168,166,.4)", marginBottom:3, fontFamily:"'DM Mono',monospace" }}>Net Balance</div>
                  <div className="ld-mono" style={{ fontSize:18, fontWeight:700, color:balColor(balance) }}>{fmt(Math.abs(balance))}</div>
                </div>
              </div>
              <div style={{
                padding:"6px 14px", borderRadius:8,
                background: balance >= 0 ? "rgba(34,197,94,.1)" : "rgba(239,68,68,.1)",
                border: `1px solid ${balance >= 0 ? "rgba(34,197,94,.2)" : "rgba(239,68,68,.2)"}`,
                fontSize:11.5, fontWeight:700, fontFamily:"'DM Mono',monospace",
                color: balance >= 0 ? "#22c55e" : "#ef4444",
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