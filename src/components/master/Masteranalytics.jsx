// src/components/master/MasterAnalytics.jsx
import React, { useState, useEffect, useCallback } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { Spin, fmtDate, fmtPKR, PAY_STYLE } from "./masterStyles.jsx";
import { authFetch } from "./Masterportal.jsx";

const PLATFORM_EXPENSES = { monthly: 40763, annual: 28720 };

function StatCard({ label, value, sub, accent, large }) {
  return (
    <div className="mp-sc" style={{ "--ac": accent || "#374151" }}>
      <div className="mp-sc-lbl">{label}</div>
      <div className="mp-sc-num" style={{ fontSize: large ? 28 : 22 }}>{value}</div>
      {sub && <div className="mp-sc-sub">{sub}</div>}
    </div>
  );
}

// Simple bar chart using CSS
function MiniChart({ data, height = 100 }) {
  if (!data?.length) return null;
  const max = Math.max(...data.map(d => Math.max(d.revenue || 0, d.expense || 0)), 1);
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:3, height, paddingBottom:18, position:"relative" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:0, height:"100%", justifyContent:"flex-end" }}>
          <div style={{ width:"100%", display:"flex", gap:2, alignItems:"flex-end", flex:1 }}>
            <div title={`Revenue: ${fmtPKR(d.revenue)}`}
              style={{ flex:1, background:"#4ade80", borderRadius:"2px 2px 0 0", height:`${Math.round((d.revenue/max)*100)}%`, minHeight:d.revenue>0?2:0, transition:"height .4s" }}/>
            <div title={`Expense: ${fmtPKR(d.expense)}`}
              style={{ flex:1, background:"#fca5a5", borderRadius:"2px 2px 0 0", height:`${Math.round((d.expense/max)*100)}%`, minHeight:d.expense>0?2:0, transition:"height .4s" }}/>
          </div>
          <div style={{ fontSize:7.5, color:"#9ca3af", fontFamily:"'DM Mono',monospace", marginTop:3, whiteSpace:"nowrap", overflow:"hidden", maxWidth:"100%", textOverflow:"ellipsis" }}>
            {d.label?.split(" ")[0]}
          </div>
        </div>
      ))}
      <div style={{ position:"absolute", bottom:16, right:0, display:"flex", gap:8, fontSize:9, color:"#9ca3af" }}>
        <span style={{ display:"flex", alignItems:"center", gap:3 }}><span style={{ width:8, height:8, background:"#4ade80", borderRadius:2, display:"inline-block" }}/>Revenue</span>
        <span style={{ display:"flex", alignItems:"center", gap:3 }}><span style={{ width:8, height:8, background:"#fca5a5", borderRadius:2, display:"inline-block" }}/>Expense</span>
      </div>
    </div>
  );
}

export default function MasterAnalytics({ showToast }) {
  const [data,       setData]       = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [expMode,    setExpMode]    = useState("monthly"); // monthly | annual
  const [period,     setPeriod]     = useState("month");   // today | week | month | year | custom
  const [customFrom, setCustomFrom] = useState("");
  const [customTo,   setCustomTo]   = useState("");

  const getRange = useCallback(() => {
    const now = new Date();
    if (period === "today") {
      const d = now.toISOString().split("T")[0];
      return { from:d, to:d };
    }
    if (period === "week") {
      const s = new Date(now); s.setDate(now.getDate() - now.getDay());
      return { from:s.toISOString().split("T")[0], to:now.toISOString().split("T")[0] };
    }
    if (period === "month") {
      const s = new Date(now.getFullYear(), now.getMonth(), 1);
      return { from:s.toISOString().split("T")[0], to:now.toISOString().split("T")[0] };
    }
    if (period === "year") {
      const s = new Date(now.getFullYear(), 0, 1);
      return { from:s.toISOString().split("T")[0], to:now.toISOString().split("T")[0] };
    }
    if (period === "custom") return { from:customFrom, to:customTo };
    return {};
  }, [period, customFrom, customTo]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { from, to } = getRange();
      const p = new URLSearchParams({ expenseMode:expMode });
      if (from) p.set("from", from);
      if (to)   p.set("to", to);
      const r = await authFetch(`${API_BASE_URL}/master/analytics?${p}`);
      const d = await r.json();
      if (r.ok) setData(d);
      else showToast(d.message, false);
    } catch (e) { showToast(e.message, false); }
    setLoading(false);
  }, [getRange, expMode, showToast]);

  useEffect(() => { load(); }, [load]);

  const monthExp = PLATFORM_EXPENSES[expMode];

  return (
    <div>
      <div className="mp-page-h">Analytics</div>
      <div className="mp-page-sub">Revenue, expenses, profit/loss — full financial overview</div>

      {/* Controls */}
      <div style={{ display:"flex", gap:8, marginBottom:18, flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
          {["today","week","month","year","custom"].map(p => (
            <button key={p} className={`mp-tab-btn${period===p?" on":""}`} onClick={()=>setPeriod(p)}>
              {p.charAt(0).toUpperCase()+p.slice(1)}
            </button>
          ))}
        </div>
        {period === "custom" && (
          <>
            <input type="date" className="mp-inp" style={{ width:150, padding:"6px 10px" }} value={customFrom} onChange={e=>setCustomFrom(e.target.value)}/>
            <span style={{ color:"#9ca3af" }}>to</span>
            <input type="date" className="mp-inp" style={{ width:150, padding:"6px 10px" }} value={customTo} onChange={e=>setCustomTo(e.target.value)}/>
          </>
        )}
        <div style={{ marginLeft:"auto", display:"flex", gap:4, alignItems:"center" }}>
          <span style={{ fontSize:11, color:"#9ca3af" }}>Expense plan:</span>
          {["monthly","annual"].map(m => (
            <button key={m} className={`mp-tab-btn${expMode===m?" on":""}`} style={{ fontSize:11, padding:"5px 10px" }} onClick={()=>setExpMode(m)}>
              {m==="monthly"?`Monthly — ${fmtPKR(PLATFORM_EXPENSES.monthly)}`:`Annual — ${fmtPKR(PLATFORM_EXPENSES.annual)}/mo`}
            </button>
          ))}
        </div>
        <button className="mp-btn mp-btn-outline mp-btn-sm" onClick={load} disabled={loading}>
          {loading ? <Spin/> : "↺"} Refresh
        </button>
      </div>

      {loading && !data ? (
        <div className="mp-empty"><Spin/> Loading analytics…</div>
      ) : data ? (
        <>
          {/* Revenue strip */}
          <div className="mp-rev" style={{ marginBottom:18 }}>
            <div style={{ flex:1 }}>
              <div className="mp-rev-lbl">Total Collected (All Time)</div>
              <div className="mp-rev-num">{fmtPKR(data.totalCollected)}</div>
              <div className="mp-rev-sub">{data.invoicesIssued} invoice(s) issued</div>
            </div>
            <div style={{ textAlign:"right", borderLeft:"1px solid rgba(255,255,255,.1)", paddingLeft:18 }}>
              <div className="mp-rev-lbl">Period Revenue</div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:20, fontWeight:700, color:"#fff" }}>{fmtPKR(data.periodCollected)}</div>
            </div>
            {data.maintMonthly > 0 && (
              <div style={{ textAlign:"right", borderLeft:"1px solid rgba(255,255,255,.1)", paddingLeft:18 }}>
                <div className="mp-rev-lbl">Maint. Income / mo</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:20, fontWeight:700, color:"#4ade80" }}>{fmtPKR(data.maintMonthly)}</div>
              </div>
            )}
            <div style={{ textAlign:"right", borderLeft:"1px solid rgba(255,255,255,.1)", paddingLeft:18 }}>
              <div className="mp-rev-lbl">Net Profit (Period)</div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:20, fontWeight:700, color:data.netProfit>=0?"#4ade80":"#f87171" }}>
                {data.netProfit >= 0 ? "+" : ""}{fmtPKR(data.netProfit)}
              </div>
            </div>
          </div>

          {/* Key metrics */}
          <div className="mp-stats" style={{ marginBottom:18 }}>
            <StatCard label="Active Mills"     value={data.stats?.approved||0}              accent="#15803d"/>
            <StatCard label="Period Expenses"  value={fmtPKR(data.expenses?.period||monthExp)} accent="#dc2626"/>
            <StatCard label="Outstanding Est." value={fmtPKR(data.outstandingEstimate||0)}  accent="#d97706"/>
            <StatCard label="Overdue Mills"    value={data.overdueMills?.length||0}         accent={data.overdueMills?.length>0?"#dc2626":"#9ca3af"}/>
          </div>

          {/* Revenue trend */}
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:14, marginBottom:18 }}>
            <div className="mp-card">
              <div className="mp-card-hd">12-Month Revenue vs Expense Trend</div>
              <div style={{ padding:"16px 20px 8px" }}>
                <MiniChart data={data.trend} height={110}/>
              </div>
            </div>

            {/* Payment breakdown */}
            <div className="mp-card">
              <div className="mp-card-hd">Revenue by Type (Period)</div>
              <div style={{ padding:"14px 16px" }}>
                {Object.entries(data.byCategory||{}).filter(([,v])=>v>0).length === 0 ? (
                  <div style={{ fontSize:12.5, color:"#9ca3af", padding:"8px 0" }}>No payments in this period.</div>
                ) : Object.entries(data.byCategory||{}).map(([cat, amt]) => {
                  if (!amt) return null;
                  // Map maintenance categories to their display style
                  const catKey = cat === "maintenance_quarterly" ? "quarterly"
                               : cat === "maintenance_biannual"  ? "biannual"
                               : cat;
                  const s = PAY_STYLE[catKey] || PAY_STYLE.other;
                  const pct = data.periodCollected > 0 ? Math.round(amt/data.periodCollected*100) : 0;
                  return (
                    <div key={cat} style={{ marginBottom:10 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                        <span style={{ fontSize:11, fontWeight:700, color:s.color, fontFamily:"'DM Mono',monospace", background:s.bg, border:`1px solid ${s.border}`, borderRadius:4, padding:"1px 7px", letterSpacing:".05em", textTransform:"uppercase" }}>{s.label}</span>
                        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, fontWeight:700, color:"#111827" }}>{fmtPKR(amt)}</span>
                      </div>
                      <div style={{ height:4, background:"#f3f4f6", borderRadius:3, overflow:"hidden" }}>
                        <div style={{ width:`${pct}%`, height:"100%", background:s.color, borderRadius:3, transition:"width .4s" }}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* P&L breakdown */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:18 }}>
            <div className="mp-card">
              <div className="mp-card-hd">Expense Breakdown</div>
              <div style={{ padding:"14px 16px" }}>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {[
                    { label:"Monthly Platform Cost", value:PLATFORM_EXPENSES.monthly, note:"(incl. tax)" },
                    { label:"Annual Platform Cost",  value:PLATFORM_EXPENSES.annual,  note:"/month" },
                  ].map(e => (
                    <div key={e.label} style={{ display:"flex", justifyContent:"space-between", padding:"8px 12px", background:"#fef2f2", border:"1px solid #fecaca", borderRadius:7 }}>
                      <div>
                        <div style={{ fontSize:12.5, fontWeight:600, color:"#374151" }}>{e.label}</div>
                        <div style={{ fontSize:10.5, color:"#9ca3af" }}>POST-RELEASE {e.note}</div>
                      </div>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:14, fontWeight:700, color:"#dc2626" }}>{fmtPKR(e.value)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mp-card">
              <div className="mp-card-hd">P&L Summary (Period)</div>
              <div style={{ padding:"14px 16px" }}>
                {[
                  { label:"Period Revenue",  value:data.periodCollected, color:"#15803d", sign:1 },
                  { label:"Period Expenses", value:data.expenses?.period||monthExp, color:"#dc2626", sign:-1 },
                  { label:"Net Profit/Loss", value:data.netProfit, color:data.netProfit>=0?"#15803d":"#dc2626", bold:true, line:true },
                ].map((row,i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:`${row.line?"10px":"7px"} 0`, borderTop:row.line?"2px solid #e5e7eb":"1px solid #f9fafb", marginTop:row.line?4:0 }}>
                    <span style={{ fontSize:row.bold?13:12.5, color:row.bold?"#111827":"#6b7280", fontWeight:row.bold?700:400 }}>{row.label}</span>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:row.bold?15:13, fontWeight:700, color:row.color }}>
                      {row.sign===-1?"-":row.value>=0?"":""}{fmtPKR(Math.abs(row.value||0))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Overdue mills */}
          {(data.overdueMills?.length || 0) > 0 && (
            <div className="mp-card">
              <div className="mp-card-hd" style={{ background:"#fef2f2", borderBottomColor:"#fecaca" }}>
                <span style={{ color:"#dc2626" }}>⚠️ Overdue Mills — {data.overdueMills.length}</span>
                <span style={{ fontSize:11.5, fontWeight:400, color:"#dc2626" }}>Payment past due</span>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Mill</th>
                    <th>Due Date</th>
                    <th>Last Payment</th>
                    <th>Days Overdue</th>
                  </tr>
                </thead>
                <tbody>
                  {data.overdueMills.map(m => (
                    <tr key={m.millId}>
                      <td>
                        <div className="t-biz">{m.businessName}</div>
                        <div className="t-id">{m.millId}</div>
                      </td>
                      <td><span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"#dc2626", fontWeight:600 }}>{fmtDate(m.nextBillingDate)}</span></td>
                      <td className="t-dim">{m.lastPaymentDate ? fmtDate(m.lastPaymentDate) : "Never"}</td>
                      <td>
                        <span style={{ background:"#fef2f2", color:"#dc2626", border:"1px solid #fecaca", borderRadius:4, padding:"2px 8px", fontSize:11, fontFamily:"'DM Mono',monospace", fontWeight:700 }}>
                          {m.daysOverdue}d
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}