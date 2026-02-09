import React, { useEffect, useState, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const fmt = (v) =>
  Number(v || 0).toLocaleString("en-PK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

export default function BalanceSheet() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  const reportRef = useRef(null);
  const assetsRef = useRef(null);
  const liabilitiesRef = useRef(null);
  const equityRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/balance-sheet`)
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const scrollTo = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleExportPdf = async () => {
    if (!reportRef.current) return;
    setExporting(true);

    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "mm", "a4");

    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pageW / canvas.width, pageH / canvas.height) * 0.95;

    pdf.addImage(
      imgData,
      "PNG",
      (pageW - canvas.width * ratio) / 2,
      (pageH - canvas.height * ratio) / 2,
      canvas.width * ratio,
      canvas.height * ratio
    );

    pdf.save(`balance-sheet-${new Date().toISOString().slice(0, 10)}.pdf`);
    setExporting(false);
  };

  if (loading) {
    return (
      <SidebarLayout>
        <div className="max-w-6xl mx-auto animate-pulse h-96 bg-white rounded-xl border" />
      </SidebarLayout>
    );
  }

  if (!data) return null;

  const current = data?.current || data;
  const previous = data?.previous || {
    assets: [],
    liabilities: [],
    equity: [],
    totalAssets: 0,
    totalLiabilities: 0,
    totalEquity: 0,
  };


  const variance = (c, p) => c - p;
  const pct = (c, p) => (p ? ((c - p) / p) * 100 : 0);

  return (
    <SidebarLayout>
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-800">Balance Sheet</h2>
            {data.isBalanced && (
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Balanced
              </span>
            )}
          </div>

          <button
            onClick={handleExportPdf}
            disabled={exporting}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            {exporting ? "Exporting…" : "Export as PDF"}
          </button>
        </div>

        {/* CLICKABLE SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 print:hidden">
          <SummaryCard
            label="Total Assets"
            value={current.totalAssets}
            prev={previous.totalAssets}
            onClick={() => scrollTo(assetsRef)}
          />
          <SummaryCard
            label="Total Liabilities"
            value={current.totalLiabilities}
            prev={previous.totalLiabilities}
            onClick={() => scrollTo(liabilitiesRef)}
          />
          <SummaryCard
            label="Total Equity"
            value={current.totalEquity}
            prev={previous.totalEquity}
            onClick={() => scrollTo(equityRef)}
          />
        </div>

        {/* REPORT */}
        <div
          ref={reportRef}
          className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
        >
          {/* REPORT HEADER */}
          <div className="flex justify-center items-center gap-4 py-6 border-b bg-gray-50">
            <img src="/logo.png" className="w-14 h-14 object-contain" />
            <div className="text-center">
              <h1 className="font-semibold">Al Rehman Rice Mills</h1>
              <p className="text-sm text-gray-500">
                As at {new Date().toLocaleDateString("en-PK")}
              </p>
            </div>
          </div>

          {/* TABLES */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* ASSETS */}
            <SectionTable
              ref={assetsRef}
              title="Assets"
              rows={current.assets}
              total={current.totalAssets}
              prevTotal={previous.totalAssets}
            />

            {/* LIABILITIES + EQUITY */}
            <div>
              <SectionTable
                ref={liabilitiesRef}
                title="Liabilities"
                rows={current.liabilities}
                total={current.totalLiabilities}
                prevTotal={previous.totalLiabilities}
              />
              <SectionTable
                ref={equityRef}
                title="Equity"
                rows={current.equity}
                total={current.totalEquity}
                prevTotal={previous.totalEquity}
                dark
              />
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}

/* ---------------- COMPONENTS ---------------- */

const SummaryCard = ({ label, value, prev, onClick }) => {
  const diff = value - prev;
  return (
    <button
      onClick={onClick}
      className="text-left bg-white border rounded-lg px-4 py-3 hover:bg-gray-50 transition"
    >
      <div className="text-sm font-semibold text-gray-600">{label}</div>
      <div className="text-lg font-bold font-mono">{fmt(value)}</div>
      <div
        className={`text-xs ${diff >= 0 ? "text-green-600" : "text-red-600"
          }`}
      >
        {diff >= 0 ? "+" : ""}
        {fmt(diff)} vs previous
      </div>
    </button>
  );
};

const SectionTable = React.forwardRef(
  ({ title, rows, total, prevTotal, dark }, ref) => {
    const diff = total - prevTotal;

    return (
      <div ref={ref} className="border-b md:border-b-0 md:border-r last:border-r-0">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th
                colSpan={2}
                className={`px-4 py-3 text-left font-semibold text-white ${dark ? "bg-slate-700" : "bg-blue-800"
                  }`}
              >
                {title}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-2.5 border">{r.name}</td>
                <td className="px-4 py-2.5 text-right font-mono border">
                  {fmt(r.amount)}
                </td>
              </tr>
            ))}

            <tr className="bg-gray-100 font-semibold">
              <td className="px-4 py-3 border">Total</td>
              <td className="px-4 py-3 text-right font-mono border">
                {fmt(total)}
              </td>
            </tr>

            <tr className="text-xs bg-gray-50">
              <td className="px-4 py-2 border">Previous Period</td>
              <td className="px-4 py-2 text-right font-mono border">
                {fmt(prevTotal)}
              </td>
            </tr>

            <tr
              className={`text-xs ${diff >= 0 ? "text-green-700" : "text-red-700"
                }`}
            >
              <td className="px-4 py-2 border">Variance</td>
              <td className="px-4 py-2 text-right font-mono border">
                {diff >= 0 ? "+" : ""}
                {fmt(diff)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
);
