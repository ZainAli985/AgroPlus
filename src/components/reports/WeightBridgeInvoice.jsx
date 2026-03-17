import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtNum  = (n) => Number(n || 0).toLocaleString("en-PK");
const fmtDate = (v) => v ? new Date(v).toLocaleString("en-PK", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" }) : "—";
const fmtDay  = (v) => v ? new Date(v).toLocaleDateString("en-PK", { day:"2-digit", month:"short", year:"numeric" }) : "—";

/* Full product label for WeightBridge entries */
function wbProductDisplay(e) {
  if (e.productName && e.productName.includes(' - ')) return e.productName;
  const pop = e.productId;
  if (pop && typeof pop === 'object') {
    return [pop.productName || e.productName, pop.type, pop.subType].filter(Boolean).join(' - ');
  }
  return e.productName || '—';
}

// ── StatusBadge ───────────────────────────────────────────────────────────────
function StatusBadge({ completed }) {
  return completed ? (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-emerald-500 text-white px-2.5 py-1 rounded-full wbr-title">
      ✓ Complete
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full wbr-title">
      ⏳ Pending
    </span>
  );
}

// ── InvoiceCard ───────────────────────────────────────────────────────────────
function InvoiceCard({ e, onPrint }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden transition-all hover:shadow-md">

      {/* ── Card Header — dark strip with invoice + net weight ── */}
      <div className="bg-zinc-900 px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-zinc-500 text-[9px] uppercase tracking-[.18em] mb-0.5">Invoice</p>
          <p className="wbr-mono text-lg font-bold text-indigo-400 leading-none">{e.invoiceCode}</p>
        </div>

        {/* Net weight — THE most important number if completed */}
        <div className="text-center">
          {e.completed ? (
            <>
              <p className="text-zinc-500 text-[9px] uppercase tracking-widest mb-0.5">Net Weight</p>
              <p className="wbr-mono text-3xl font-bold text-white leading-none">
                {fmtNum(e.netWeight)}
              </p>
              <p className="text-zinc-500 text-[10px] mt-0.5">kg</p>
            </>
          ) : (
            <>
              <p className="text-zinc-500 text-[9px] uppercase tracking-widest mb-0.5">1st Weight</p>
              <p className="wbr-mono text-3xl font-bold text-zinc-300 leading-none">
                {fmtNum(e.firstWeight)}
              </p>
              <p className="text-zinc-600 text-[10px] mt-0.5">kg</p>
            </>
          )}
        </div>

        <StatusBadge completed={e.completed} />
      </div>

      {/* ── Key info row ── */}
      <div className="px-5 py-4 border-b border-zinc-100">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-bold text-zinc-800 text-base truncate">{wbProductDisplay(e)}</p>
            <p className="text-zinc-400 text-sm truncate">{e.vendorName}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="wbr-mono text-xs font-semibold text-zinc-500">{e.vehicleNumber || "—"}</p>
            <p className="text-zinc-400 text-xs">{e.vehicleType}</p>
          </div>
        </div>

        {/* Weight comparison bar — visual at-a-glance */}
        {e.completed && (
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center gap-3 text-xs">
              <span className="text-zinc-400 w-20 text-right wbr-mono">1st</span>
              <div className="flex-1 bg-zinc-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-zinc-400 rounded-full"
                  style={{ width: `${Math.min(100, (e.firstWeight / Math.max(e.firstWeight, e.secondWeight)) * 100)}%` }}
                />
              </div>
              <span className="wbr-mono text-zinc-500 w-20">{fmtNum(e.firstWeight)} kg</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-zinc-400 w-20 text-right wbr-mono">2nd</span>
              <div className="flex-1 bg-zinc-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-zinc-600 rounded-full"
                  style={{ width: `${Math.min(100, (e.secondWeight / Math.max(e.firstWeight, e.secondWeight)) * 100)}%` }}
                />
              </div>
              <span className="wbr-mono text-zinc-500 w-20">{fmtNum(e.secondWeight)} kg</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-zinc-400 w-20 text-right wbr-mono font-bold">Net</span>
              <div className="flex-1 bg-zinc-100 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${Math.min(100, (e.netWeight / Math.max(e.firstWeight, e.secondWeight)) * 100)}%` }}
                />
              </div>
              <span className="wbr-mono text-emerald-600 font-bold w-20">{fmtNum(e.netWeight)} kg</span>
            </div>
          </div>
        )}

        {/* Converted units if complete */}
        {e.completed && (
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-zinc-50 rounded-xl px-3 py-2 text-center">
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Maund</p>
              <p className="wbr-mono font-bold text-zinc-700 text-sm">{e.netWeightMaund?.toFixed(2)} Mn</p>
            </div>
            <div className="bg-zinc-50 rounded-xl px-3 py-2 text-center">
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Metric Ton</p>
              <p className="wbr-mono font-bold text-zinc-700 text-sm">{e.netWeightTon?.toFixed(2)} T</p>
            </div>
          </div>
        )}
      </div>

      {/* ── Meta row ── */}
      <div className="px-5 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Date</p>
            <p className="text-xs font-semibold text-zinc-600 wbr-mono">{fmtDay(e.createdAt)}</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Rate</p>
            <p className="text-xs font-semibold text-zinc-600 wbr-mono">Rs {fmtNum(e.rate)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-xs font-semibold text-zinc-400 hover:text-zinc-700 transition px-3 py-1.5 rounded-lg hover:bg-zinc-50 border border-zinc-100"
          >
            {expanded ? "Less ▲" : "Details ▼"}
          </button>
          <button
            onClick={() => onPrint(e)}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-700 px-4 py-1.5 rounded-lg transition wbr-title uppercase tracking-wider"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
        </div>
      </div>

      {/* ── Expandable detail section ── */}
      {expanded && (
        <div className="border-t border-zinc-100 px-5 py-4 bg-zinc-50 space-y-3">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Full Entry Details</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              ["Vendor", e.vendorName],
              ["Vehicle No.", e.vehicleNumber || "—"],
              ["Vehicle Type", e.vehicleType],
              ["Product", wbProductDisplay(e)],
              ["Rate", `Rs ${fmtNum(e.rate)}`],
              ["Invoice", e.invoiceCode],
              ["1st Weight", `${fmtNum(e.firstWeight)} kg`],
              ["1st Driver", e.firstWeightWithDriver ? "With Driver" : "Without Driver"],
              ["1st Time", fmtDate(e.firstWeightTime || e.createdAt)],
              ["2nd Weight", e.secondWeight ? `${fmtNum(e.secondWeight)} kg` : "—"],
              ["2nd Driver", e.secondWeight ? (e.secondWeightWithDriver ? "With Driver" : "Without Driver") : "—"],
              ["2nd Time", fmtDate(e.secondWeightTime)],
            ].map(([k, v]) => (
              <div key={k} className="bg-white rounded-xl px-3 py-2 border border-zinc-100">
                <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">{k}</p>
                <p className="font-semibold text-zinc-700 wbr-mono mt-0.5 truncate">{v}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function WeightBridgeReport() {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [filters, setFilters] = useState({ vendor: "", product: "", date: "", status: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authFetch(`${API_BASE_URL}/weight-bridge`);
        const data = await res.json();
        if (data.success) {
          setEntries(data.entries);
          setFilteredEntries(data.entries);
        }
      } catch (err) {
        console.error("Error loading report:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let data = [...entries];
    if (filters.vendor)
      data = data.filter((e) => e.vendorName?.toLowerCase().includes(filters.vendor.toLowerCase()));
    if (filters.product)
      data = data.filter((e) => wbProductDisplay(e)?.toLowerCase().includes(filters.product.toLowerCase()));
    if (filters.date)
      data = data.filter((e) => new Date(e.createdAt).toDateString() === new Date(filters.date).toDateString());
    if (filters.status === "complete")
      data = data.filter((e) => e.completed);
    if (filters.status === "pending")
      data = data.filter((e) => !e.completed);
    setFilteredEntries(data);
  }, [filters, entries]);

  const printInvoice = (entry) => {
    const firstWeight    = Number(entry.firstWeight || 0);
    const secondWeight   = Number(entry.secondWeight || 0);
    const netWeight      = Number(entry.netWeight || 0);
    const netWeightMaund = Number(entry.netWeightMaund || 0);
    const netWeightTon   = Number(entry.netWeightTon || 0);

    const content = `<!DOCTYPE html>
<html>
<head>
<title>Weight Bridge Slip — ${entry.invoiceCode}</title>
<style>
  @page { size: A4; margin: 14mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: "Segoe UI", Arial, sans-serif; color: #111; font-size: 12px; }
  .wrap { max-width: 660px; margin: auto; }

  /* Header */
  .hdr { display: flex; justify-content: space-between; align-items: flex-start;
         border-bottom: 3px solid #111; padding-bottom: 12px; margin-bottom: 16px; }
  .hdr-left h1 { font-size: 18px; font-weight: 800; color: #111; text-transform: uppercase; letter-spacing: -.3px; }
  .hdr-left p  { font-size: 10px; color: #555; margin-top: 2px; }
  .hdr-right   { text-align: right; }
  .hdr-right h2 { font-size: 14px; font-weight: 800; color: #111; text-transform: uppercase; letter-spacing: 1px; }
  .badge { display: inline-block; background: #111; color: #fff; font-size: 13px;
           font-weight: 700; padding: 4px 12px; border-radius: 6px; margin-top: 6px;
           font-family: "Courier New", monospace; letter-spacing: 1px; }

  /* Info grid */
  .info { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
  .box  { border: 1px solid #ddd; border-radius: 6px; padding: 8px 10px; }
  .box h4 { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: .12em;
            color: #555; border-bottom: 1px solid #eee; padding-bottom: 4px; margin-bottom: 6px; }
  .box p  { font-size: 11px; margin: 2px 0; }

  /* Weight table */
  table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11px; }
  thead tr { background: #111; color: #fff; }
  th { padding: 7px 8px; text-align: left; font-weight: 600; font-size: 10px;
       text-transform: uppercase; letter-spacing: .08em; }
  th.r, td.r { text-align: right; }
  td { border: 1px solid #ddd; padding: 6px 8px; }
  tr.net td { font-weight: 800; background: #f5f5f5; font-size: 13px; }
  tr.unit td { color: #555; }

  /* Signature */
  .sig { display: flex; justify-content: space-between; margin-top: 44px; font-size: 11px; }
  .sig div { text-align: center; }
  .sig span { display: block; width: 160px; border-top: 1px solid #555; padding-top: 4px; margin-top: 40px; }

  .footer { text-align: center; margin-top: 28px; font-size: 10px; color: #888; }
</style>
</head>
<body>
<div class="wrap">
  <div class="hdr">
    <div class="hdr-left">
      <h1>Al Rehman Rice Mills</h1>
      <p>Deepalpur Road, Babarkhai, Arzanipur, Chunian, Kasur – Pakistan</p>
    </div>
    <div class="hdr-right">
      <h2>Weight Bridge Slip</h2>
      <div class="badge">${entry.invoiceCode}</div>
      <p style="font-size:10px;color:#555;margin-top:6px;">${new Date(entry.createdAt).toLocaleString("en-PK")}</p>
    </div>
  </div>

  <div class="info">
    <div class="box">
      <h4>Party Details</h4>
      <p><b>Vendor:</b> ${entry.vendorName}</p>
      <p><b>Product:</b> ${ entry.productName && entry.productName.includes(' - ') ? entry.productName : (entry.productId && typeof entry.productId === 'object' ? [entry.productId.productName||entry.productName, entry.productId.type, entry.productId.subType].filter(Boolean).join(' - ') : (entry.productName||'—')) }</p>
    </div>
    <div class="box">
      <h4>Transport Details</h4>
      <p><b>Vehicle No.:</b> ${entry.vehicleNumber || "—"}</p>
      <p><b>Vehicle Type:</b> ${entry.vehicleType}</p>
      <p><b>Rate:</b> Rs ${fmtNum(entry.rate)}</p>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th class="r">Weight (kg)</th>
        <th>Driver</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>First Weight</td>
        <td class="r">${fmtNum(firstWeight)}</td>
        <td>${entry.firstWeightWithDriver ? "With Driver" : "Without Driver"}</td>
        <td>${fmtDate(entry.firstWeightTime || entry.createdAt)}</td>
      </tr>
      <tr>
        <td>Second Weight</td>
        <td class="r">${secondWeight ? fmtNum(secondWeight) : "—"}</td>
        <td>${entry.secondWeight ? (entry.secondWeightWithDriver ? "With Driver" : "Without Driver") : "—"}</td>
        <td>${fmtDate(entry.secondWeightTime)}</td>
      </tr>
      <tr class="net">
        <td>Net Weight</td>
        <td class="r">${fmtNum(netWeight)}</td>
        <td colspan="2"></td>
      </tr>
      <tr class="unit">
        <td>Net Weight (Maund)</td>
        <td class="r">${netWeightMaund.toFixed(2)} Mn</td>
        <td colspan="2"></td>
      </tr>
      <tr class="unit">
        <td>Net Weight (Metric Ton)</td>
        <td class="r">${netWeightTon.toFixed(2)} T</td>
        <td colspan="2"></td>
      </tr>
    </tbody>
  </table>

  <div class="sig">
    <div><span>Authorized Signature</span></div>
    <div><span>Receiver's Signature</span></div>
    <div><span>Stamp</span></div>
  </div>

  <p class="footer">This is a computer-generated slip. Thank you for your business.</p>
</div>
<script>window.onload = () => window.print();</script>
</body>
</html>`;

    const w = window.open("", "_blank");
    w.document.write(content);
    w.document.close();
  };

  // ── Stats ─────────────────────────────────────────────────────────────────
  const totalEntries   = filteredEntries.length;
  const completed      = filteredEntries.filter((e) => e.completed).length;
  const pending        = totalEntries - completed;
  const totalNetWeight = filteredEntries.filter((e) => e.completed).reduce((s, e) => s + (e.netWeight || 0), 0);

  const nowStr = new Date().toLocaleDateString("en-PK", {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });

  const inputCls =
    "border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition placeholder-zinc-300 bg-white font-medium";

  return (
    <SidebarLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Barlow:wght@300;400;500;600&family=Roboto+Mono:wght@400;500;600&display=swap');
        .wbr-root  { font-family: 'Barlow', sans-serif; }
        .wbr-title { font-family: 'Barlow Condensed', sans-serif; }
        .wbr-mono  { font-family: 'Roboto Mono', monospace; }
        .card-in   { animation: cardIn .2s ease both; }
        @keyframes cardIn {
          from { opacity:0; transform:translateY(6px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <div className="wbr-root min-h-screen bg-zinc-100 pb-20">

        {/* ── Masthead ── */}
        <div className="bg-zinc-900 rounded-2xl mb-6 overflow-hidden shadow-2xl">
          <div className="px-8 py-1.5 flex items-center justify-between">
            <span className="wbr-title text-white text-xs font-bold uppercase tracking-[.18em]">
              Operations Module
            </span>
            <span className="wbr-mono text-indigo-200 text-xs">{nowStr}</span>
          </div>
          <div className="px-8 py-6">
            <p className="text-zinc-500 text-xs uppercase tracking-[.2em] mb-1">Weight Bridge</p>
            <h1 className="wbr-title text-5xl font-extrabold text-white leading-none tracking-tight">
              INVOICES
            </h1>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-4 divide-x divide-zinc-800 border-t border-zinc-800">
            {[
              { label: "Total",     value: totalEntries,         unit: "entries",  color: "text-white" },
              { label: "Complete",  value: completed,            unit: "invoices", color: "text-emerald-400" },
              { label: "Pending",   value: pending,              unit: "invoices", color: "text-indigo-400" },
              { label: "Total Net", value: fmtNum(Math.round(totalNetWeight)), unit: "kg net", color: "text-zinc-300" },
            ].map((s) => (
              <div key={s.label} className="px-6 py-4 text-center">
                <p className="text-zinc-500 text-[9px] uppercase tracking-widest mb-1">{s.label}</p>
                <p className={`wbr-mono text-2xl font-bold ${s.color} leading-none`}>{s.value}</p>
                <p className="text-zinc-600 text-[10px] mt-0.5">{s.unit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Filters ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 px-6 py-4 mb-6">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Filter Invoices</p>
          <div className="flex flex-wrap gap-3 items-end">
            <input
              type="text"
              placeholder="Vendor name..."
              value={filters.vendor}
              onChange={(e) => setFilters({ ...filters, vendor: e.target.value })}
              className={inputCls}
            />
            <input
              type="text"
              placeholder="Product name..."
              value={filters.product}
              onChange={(e) => setFilters({ ...filters, product: e.target.value })}
              className={inputCls}
            />
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className={inputCls}
            />
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className={inputCls}
            >
              <option value="">All Status</option>
              <option value="complete">Complete</option>
              <option value="pending">Pending</option>
            </select>
            {(filters.vendor || filters.product || filters.date || filters.status) && (
              <button
                onClick={() => setFilters({ vendor: "", product: "", date: "", status: "" })}
                className="px-4 py-2.5 rounded-xl bg-zinc-100 text-zinc-600 text-sm font-semibold hover:bg-zinc-200 transition"
              >
                Clear ✕
              </button>
            )}
          </div>
        </div>

        {/* ── Cards ── */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-20 bg-zinc-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-zinc-100 rounded w-2/3" />
                  <div className="h-3 bg-zinc-100 rounded w-1/2" />
                  <div className="h-8 bg-zinc-100 rounded w-full mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center text-3xl mb-4">⚖️</div>
            <p className="wbr-title text-xl font-bold text-zinc-500 uppercase tracking-wide">No Invoices Found</p>
            <p className="text-sm text-zinc-400 mt-1">Try adjusting your filters.</p>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold text-zinc-400 mb-4 wbr-mono">
              Showing {filteredEntries.length} of {entries.length} entries
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              {filteredEntries.map((e, i) => (
                <div key={e._id} className="card-in" style={{ animationDelay: `${i * 0.03}s` }}>
                  <InvoiceCard e={e} onPrint={printInvoice} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </SidebarLayout>
  );
}