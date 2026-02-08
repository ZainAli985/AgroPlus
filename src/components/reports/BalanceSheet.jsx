import React, { useEffect, useState, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const fmt = (value) =>
  Number(value).toLocaleString("en-PK", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

export default function BalanceSheet() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const reportRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/balance-sheet`)
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const handleExportPdf = async () => {
    if (!reportRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pageW / canvas.width, pageH / canvas.height) * 0.95;
      const w = canvas.width * ratio;
      const h = canvas.height * ratio;
      pdf.addImage(imgData, "PNG", (pageW - w) / 2, (pageH - h) / 2, w, h);
      pdf.save(`balance-sheet-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <SidebarLayout>
        <div className="max-w-5xl mx-auto animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-6" />
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="h-10 bg-gray-200" />
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="flex justify-between px-4 py-3 border-b border-gray-100">
                    <div className="h-4 w-32 bg-gray-100 rounded" />
                    <div className="h-4 w-20 bg-gray-100 rounded" />
                  </div>
                ))}
                <div className="h-12 bg-gray-100" />
              </div>
            ))}
          </div>
        </div>
      </SidebarLayout>
    );
  }

  if (!data) return null;

  return (
    <SidebarLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Balance Sheet
          </h2>
          <button
            type="button"
            onClick={handleExportPdf}
            disabled={exporting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {exporting ? (
              "Exporting…"
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export as PDF
              </>
            )}
          </button>
        </div>

        <div
          ref={reportRef}
          className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden print:shadow-none"
        >
          {/* Report header */}
          <div className="flex justify-center items-center gap-4 py-6 px-6 border-b border-gray-200/60 bg-gray-50/50">
            <img src="/logo.png" alt="" className="w-14 h-14 object-contain" />
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-800">Al Rehman Rice Mills</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                As at {new Date().toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </div>

          {/* Two-column table layout – light tabular borders */}
          <div className="grid grid-cols-1 md:grid-cols-2 [&_table]:border-collapse">
            {/* ASSETS */}
            <div className="border-b md:border-b-0 md:border-r border-black/10">
              <table className="w-full text-left balance-sheet-table">
                <thead>
                  <tr>
                    <th className="bg-blue-800 text-white px-4 py-3 text-sm font-semibold uppercase tracking-wide border border-black/10">
                      Assets
                    </th>
                    <th className="bg-blue-800 text-white px-4 py-3 text-right text-sm font-semibold w-32 border border-black/10">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.assets.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50/80">
                      <td className="px-4 py-2.5 text-gray-800 border border-black/10">{a.name}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-gray-700 tabular-nums border border-black/10">
                        {fmt(a.amount)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50/50">
                    <td className="px-4 py-3 font-semibold text-gray-900 border border-black/10">Total Assets</td>
                    <td className="px-4 py-3 text-right font-semibold font-mono tabular-nums text-gray-900 border border-black/10">
                      {fmt(data.totalAssets)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* LIABILITIES + EQUITY */}
            <div>
              <table className="w-full text-left balance-sheet-table">
                <thead>
                  <tr>
                    <th className="bg-blue-800 text-white px-4 py-3 text-sm font-semibold uppercase tracking-wide border border-black/10">
                      Liabilities
                    </th>
                    <th className="bg-blue-800 text-white px-4 py-3 text-right text-sm font-semibold w-32 border border-black/10">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.liabilities.map((l) => (
                    <tr key={l.id} className="hover:bg-gray-50/80">
                      <td className="px-4 py-2.5 text-gray-800 border border-black/10">{l.name}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-gray-700 tabular-nums border border-black/10">
                        {fmt(l.amount)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100/80">
                    <td className="px-4 py-2.5 font-semibold text-gray-900 border border-black/10">Total Liabilities</td>
                    <td className="px-4 py-2.5 text-right font-semibold font-mono tabular-nums text-gray-900 border border-black/10">
                      {fmt(data.totalLiabilities)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="w-full text-left balance-sheet-table border-t border-black/10">
                <thead>
                  <tr>
                    <th className="bg-slate-700 text-white px-4 py-3 text-sm font-semibold uppercase tracking-wide border border-black/10">
                      Equity
                    </th>
                    <th className="bg-slate-700 text-white px-4 py-3 text-right text-sm font-semibold w-32 border border-black/10">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.equity.map((e) => (
                    <tr key={e.id} className="hover:bg-gray-50/80">
                      <td className="px-4 py-2.5 text-gray-800 border border-black/10">{e.name}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-gray-700 tabular-nums border border-black/10">
                        {fmt(e.amount)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50/80">
                    <td className="px-4 py-3 font-semibold text-gray-900 border border-black/10">Total Equity</td>
                    <td className="px-4 py-3 text-right font-semibold font-mono tabular-nums text-gray-900 border border-black/10">
                      {fmt(data.totalEquity)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer: reconciliation */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-t-2 border-black/20 bg-gray-100 font-semibold">
            <div className="px-4 py-3 text-gray-800 border-r border-black/10">
              Total Assets
              <span className="ml-2 font-mono tabular-nums text-gray-900">{fmt(data.totalAssets)}</span>
            </div>
            <div className="px-4 py-3 text-gray-800">
              Total Liabilities + Equity
              <span className="ml-2 font-mono tabular-nums text-gray-900">
                {fmt(data.totalLiabilities + data.totalEquity)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
