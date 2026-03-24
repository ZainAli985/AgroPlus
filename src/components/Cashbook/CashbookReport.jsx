import React, { useState, useEffect } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .dcb { font-family: 'DM Sans', sans-serif; color: #111827; }
  .dcb-mono { font-family: 'DM Mono', monospace; }

  /* inputs */
  .dcb-inp, .dcb-sel {
    border: 1px solid #d1d5db; border-radius: 6px;
    padding: 6px 9px; font-size: 12.5px;
    font-family: 'DM Sans', sans-serif; color: #111827;
    background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s; appearance: none;
  }
  .dcb-inp:focus, .dcb-sel:focus {
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107,114,128,.12);
  }

  /* stat cards */
  .dcb-stat {
    background: #fff; border: 1px solid #e5e7eb;
    border-radius: 8px; padding: 14px 16px;
    position: relative; overflow: hidden;
  }
  .dcb-stat::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; }
  .dcb-stat.s-open::before  { background: #d1d5db; }
  .dcb-stat.s-in::before    { background: #15803d; }
  .dcb-stat.s-out::before   { background: #dc2626; }
  .dcb-stat.s-bal::before   { background: #1f2937; }

  /* table */
  .dcb-table { width: 100%; border-collapse: collapse; }
  .dcb-table thead tr { background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
  .dcb-table thead th {
    padding: 8px 12px; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .07em;
    color: #9ca3af; text-align: left; white-space: nowrap;
  }
  .dcb-table thead th.r { text-align: right; }
  .dcb-table tbody tr { border-bottom: 1px solid #f9fafb; transition: background .08s; }
  .dcb-table tbody tr:hover { background: #fafafa; }
  .dcb-table tbody td { padding: 10px 12px; font-size: 12.5px; color: #374151; vertical-align: middle; }
  .dcb-table tbody td.r { text-align: right; }
  .dcb-table tfoot tr { border-top: 2px solid #e5e7eb; background: #f9fafb; }
  .dcb-table tfoot td { padding: 9px 12px; font-size: 12.5px; }

  /* badge */
  .dcb-badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 2px 8px; border-radius: 4px;
    font-size: 11.5px; font-weight: 600; white-space: nowrap;
  }
  .dcb-badge.in  { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
  .dcb-badge.out { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }

  /* nav btn */
  .dcb-nav {
    width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;
    border-radius: 6px; border: 1px solid #e5e7eb; background: #fff; color: #374151;
    cursor: pointer; font-size: 14px; font-weight: 700; transition: background .1s;
  }
  .dcb-nav:hover:not(:disabled) { background: #f9fafb; }
  .dcb-nav:disabled { opacity: .3; cursor: not-allowed; }

  /* pill btn */
  .dcb-pill {
    padding: 4px 10px; border-radius: 5px; border: 1px solid #e5e7eb;
    background: #fff; color: #374151; font-size: 12px; font-weight: 500;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .1s;
  }
  .dcb-pill:hover { background: #f9fafb; }
  .dcb-pill.active { background: #111827; color: #fff; border-color: #111827; }

  @keyframes dcb-spin { to { transform: rotate(360deg); } }
  .dcb-spin { display: inline-block; animation: dcb-spin .8s linear infinite; }

  /* skeleton */
  @keyframes dcb-shimmer { to { background-position: -200% 0; } }
  .dcb-skel {
    border-radius: 5px; height: 11px;
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    background-size: 200% 100%; animation: dcb-shimmer 1.4s infinite;
  }
`;

const fmt = n => Number(n||0).toLocaleString("en-PK",{minimumFractionDigits:2,maximumFractionDigits:2});
const fmtN = n => Number(n||0).toLocaleString("en-PK");

function Badge({ type }) {
  return type==="credit"
    ? <span className="dcb-badge in">▲ Cash In</span>
    : <span className="dcb-badge out">▼ Cash Out</span>;
}

export default function DailyCashbook() {
  const [loading,       setLoading]       = useState(true);
  const [data,          setData]          = useState(null);
  const [error,         setError]         = useState(null);
  const [selectedDate,  setSelectedDate]  = useState(new Date().toISOString().slice(0,10));
  const [rangeMode,     setRangeMode]     = useState(false);
  const [rangeFrom,     setRangeFrom]     = useState("");
  const [rangeTo,       setRangeTo]       = useState("");
  const [rangeData,     setRangeData]     = useState(null);

  const todayStr = new Date().toISOString().slice(0,10);
  const isToday  = selectedDate===todayStr;

  const fmtDisplayDate = str => {
    const [y,m,d] = str.split("-").map(Number);
    return new Date(y,m-1,d).toLocaleDateString("en-PK",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
  };

  useEffect(() => { if(!rangeMode) fetchDailyReport(selectedDate); }, [selectedDate,rangeMode]);

  const fetchDailyReport = async date => {
    setLoading(true); setError(null);
    try {
      const qs = date&&date!==todayStr?`?date=${date}`:"";
      const res  = await authFetch(`${API_BASE_URL}/cashbook-daily${qs}`);
      const text = await res.text();
      let json; try{json=JSON.parse(text);}catch{throw new Error("Invalid server response");}
      if(!res.ok)throw new Error(json.message||"Failed to fetch daily cashbook");
      setData(json);
    } catch(err){setError(err.message);}
    finally{setLoading(false);}
  };

  const fetchRange = async () => {
    if(!rangeFrom||!rangeTo||rangeFrom>rangeTo)return;
    setLoading(true);setError(null);setRangeData(null);
    try {
      const dates=[];
      let [y,m,d]=rangeFrom.split("-").map(Number);
      const [ye,me,de]=rangeTo.split("-").map(Number);
      while(true){
        const s=`${y}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
        dates.push(s);
        if(s===`${ye}-${String(me).padStart(2,"0")}-${String(de).padStart(2,"0")}`)break;
        const next=new Date(y,m-1,d+1);
        y=next.getFullYear();m=next.getMonth()+1;d=next.getDate();
        if(dates.length>366)break;
      }
      const results=await Promise.all(dates.map(async date=>{
        const qs=date!==todayStr?`?date=${date}`:"";
        const res=await authFetch(`${API_BASE_URL}/cashbook-daily${qs}`);
        return res.json();
      }));
      const allEntries=results.flatMap((r,i)=>(r.entries||[]).map(e=>({...e,date:dates[i]})));
      const totalCashIn  = allEntries.filter(e=>e.type==="credit").reduce((s,e)=>s+e.amount,0);
      const totalCashOut = allEntries.filter(e=>e.type==="debit").reduce((s,e)=>s+e.amount,0);
      setRangeData({entries:allEntries,totalCredit:totalCashIn,totalDebit:totalCashOut,openingBalance:results[0]?.openingBalance??0,currentBalance:results[results.length-1]?.currentBalance??0});
    }catch(err){setError(err.message);}
    finally{setLoading(false);}
  };

  const navDate = days => {
    const [y,m,d]=selectedDate.split("-").map(Number);
    const dt=new Date(y,m-1,d+days);
    const next=`${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,"0")}-${String(dt.getDate()).padStart(2,"0")}`;
    if(next<=todayStr)setSelectedDate(next);
  };

  const activeData = (rangeMode&&rangeData)?rangeData:(data||{});
  const {openingBalance=0,currentBalance=0,totalDebit=0,totalCredit=0,entries=[]} = activeData;
  const netMovement = totalCredit-totalDebit;

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>

      <div className="dcb" style={{ maxWidth:980, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:18 }}>
          <div>
            <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 3px" }}>Finance</p>
            <h1 style={{ margin:0, fontSize:20, fontWeight:700, color:"#111827", letterSpacing:"-.3px" }}>Daily Cashbook</h1>
            <p style={{ fontSize:12, color:"#9ca3af", marginTop:3 }}>
              {rangeMode&&rangeData ? `${rangeFrom} → ${rangeTo}` : fmtDisplayDate(selectedDate)}
            </p>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap" }}>
            {/* Date nav */}
            <button className="dcb-nav" onClick={()=>navDate(-1)} title="Previous day">‹</button>
            <input type="date" value={selectedDate} max={todayStr}
              onChange={e=>setSelectedDate(e.target.value)}
              className="dcb-inp"/>
            <button className="dcb-nav" onClick={()=>navDate(1)} disabled={isToday} title="Next day">›</button>
            {!isToday && (
              <button className="dcb-pill" onClick={()=>setSelectedDate(todayStr)}>Today</button>
            )}
            <button className="dcb-pill" onClick={()=>fetchDailyReport(selectedDate)}
              style={{ display:"flex", alignItems:"center", gap:5 }}>
              <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Range filter */}
        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, padding:"10px 14px", marginBottom:14, display:"flex", flexWrap:"wrap", gap:10, alignItems:"center" }}>
          <button className={`dcb-pill${rangeMode?" active":""}`} onClick={()=>{setRangeMode(p=>!p);setRangeData(null);}}>
            Date Range
          </button>
          {rangeMode && (
            <>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <label style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#6b7280" }}>From</label>
                <input type="date" value={rangeFrom} onChange={e=>setRangeFrom(e.target.value)} className="dcb-inp"/>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <label style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#6b7280" }}>To</label>
                <input type="date" value={rangeTo} onChange={e=>setRangeTo(e.target.value)} className="dcb-inp"/>
              </div>
              <button onClick={fetchRange}
                style={{ padding:"6px 14px", borderRadius:6, border:"none", background:"#111827", color:"#fff", fontSize:12.5, fontWeight:500, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                Load Range
              </button>
            </>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:180, color:"#9ca3af", fontSize:13, gap:9 }}>
            <span className="dcb-spin">
              <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </span>
            Loading cashbook…
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div style={{ textAlign:"center", padding:"40px 0", color:"#dc2626", fontSize:13 }}>{error}</div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Stats */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:14 }}>
              <div className="dcb-stat s-open">
                <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", margin:"0 0 5px" }}>Opening Balance</p>
                <p className="dcb-mono" style={{ fontSize:18, fontWeight:700, color:"#374151", margin:0 }}>{fmt(openingBalance)}</p>
              </div>
              <div className="dcb-stat s-in">
                <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", margin:"0 0 5px" }}>Cash In ▲</p>
                <p className="dcb-mono" style={{ fontSize:18, fontWeight:700, color:"#15803d", margin:0 }}>+ {fmt(totalCredit)}</p>
              </div>
              <div className="dcb-stat s-out">
                <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", margin:"0 0 5px" }}>Cash Out ▼</p>
                <p className="dcb-mono" style={{ fontSize:18, fontWeight:700, color:"#dc2626", margin:0 }}>− {fmt(totalDebit)}</p>
              </div>
              <div className="dcb-stat s-bal">
                <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", color:"#9ca3af", margin:"0 0 5px" }}>Current Balance</p>
                <p className="dcb-mono" style={{ fontSize:18, fontWeight:700, color:"#111827", margin:0 }}>{fmt(currentBalance)}</p>
                {netMovement!==0 && (
                  <p style={{ fontSize:11, color:netMovement>=0?"#15803d":"#dc2626", margin:"3px 0 0" }}>
                    {netMovement>=0?"▲":"▼"} {fmt(Math.abs(netMovement))} net
                  </p>
                )}
              </div>
            </div>

            {/* Table */}
            <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, overflow:"hidden" }}>
              <div style={{ padding:"11px 14px", borderBottom:"1px solid #e5e7eb", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <p style={{ fontSize:13, fontWeight:600, color:"#111827", margin:0 }}>
                  {rangeMode&&rangeData?`Range: ${rangeFrom} → ${rangeTo}`:"Today's Transactions"}
                </p>
                <span style={{ fontSize:11.5, color:"#9ca3af", background:"#f3f4f6", borderRadius:4, padding:"2px 8px", fontFamily:"'DM Mono',monospace" }}>
                  {entries.length} entr{entries.length===1?"y":"ies"}
                </span>
              </div>

              {entries.length===0 ? (
                <div style={{ textAlign:"center", padding:"56px 0" }}>
                  <div style={{ fontSize:32, marginBottom:10 }}>📋</div>
                  <p style={{ fontSize:13, fontWeight:600, color:"#374151", margin:"0 0 4px" }}>No entries for today</p>
                  <p style={{ fontSize:12, color:"#9ca3af" }}>Cash transactions recorded today will appear here.</p>
                </div>
              ) : (
                <div style={{ overflowX:"auto" }}>
                  <table className="dcb-table">
                    <thead>
                      <tr>
                        <th style={{ width:32 }}>#</th>
                        <th>Time</th>
                        {rangeMode&&rangeData&&<th>Date</th>}
                        <th>Type</th>
                        <th>Account(s)</th>
                        <th>Description</th>
                        <th className="r" style={{ color:"#15803d" }}>Cash In ▲</th>
                        <th className="r" style={{ color:"#dc2626" }}>Cash Out ▼</th>
                        <th>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((entry,idx)=>(
                        <tr key={entry._id||idx}>
                          <td style={{ color:"#d1d5db", fontSize:11, fontFamily:"'DM Mono',monospace" }}>
                            {String(idx+1).padStart(2,"0")}
                          </td>
                          <td style={{ fontSize:12, color:"#6b7280", fontFamily:"'DM Mono',monospace", whiteSpace:"nowrap" }}>
                            {entry.time||"—"}
                          </td>
                          {rangeMode&&rangeData&&(
                            <td style={{ fontSize:12, color:"#6b7280", fontFamily:"'DM Mono',monospace", whiteSpace:"nowrap" }}>{entry.date||"—"}</td>
                          )}
                          <td><Badge type={entry.type}/></td>
                          <td style={{ maxWidth:180 }}>
                            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                              {entry.accounts?.map((acc,i)=>(
                                <span key={i} style={{ fontSize:12.5, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{acc}</span>
                              ))}
                            </div>
                          </td>
                          <td style={{ fontSize:12.5, color:"#6b7280", maxWidth:160, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                            {entry.description||"—"}
                          </td>
                          <td className="r">
                            {entry.type==="credit"
                              ? <span className="dcb-mono" style={{ fontWeight:600, color:"#15803d" }}>{fmt(entry.amount)}</span>
                              : <span style={{ color:"#d1d5db" }}>—</span>}
                          </td>
                          <td className="r">
                            {entry.type==="debit"
                              ? <span className="dcb-mono" style={{ fontWeight:600, color:"#dc2626" }}>{fmt(entry.amount)}</span>
                              : <span style={{ color:"#d1d5db" }}>—</span>}
                          </td>
                          <td style={{ fontSize:12, color:"#9ca3af", maxWidth:140, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                            {entry.comments||"—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={rangeMode&&rangeData?6:5} style={{ fontSize:10.5, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:".07em" }}>
                          Totals
                        </td>
                        <td className="r">
                          <span className="dcb-mono" style={{ fontWeight:700, color:"#15803d", fontSize:13 }}>{fmt(totalCredit)}</span>
                        </td>
                        <td className="r">
                          <span className="dcb-mono" style={{ fontWeight:700, color:"#dc2626", fontSize:13 }}>{fmt(totalDebit)}</span>
                        </td>
                        <td/>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>

            {/* Reconciliation */}
            {entries.length>0 && (
              <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, padding:"11px 14px", marginTop:10 }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8, fontSize:12.5 }}>
                  <span style={{ color:"#6b7280" }}>
                    Opening{" "}
                    <span className="dcb-mono" style={{ fontWeight:600, color:"#374151" }}>{fmt(openingBalance)}</span>
                    {" "}+ Cash In{" "}
                    <span className="dcb-mono" style={{ fontWeight:600, color:"#15803d" }}>{fmt(totalCredit)}</span>
                    {" "}− Cash Out{" "}
                    <span className="dcb-mono" style={{ fontWeight:600, color:"#dc2626" }}>{fmt(totalDebit)}</span>
                  </span>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontWeight:700, color:"#111827", fontSize:14 }}>
                    = {fmt(currentBalance)}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </SidebarLayout>
  );
}