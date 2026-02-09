import React, { useEffect, useRef, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

/* ---------- utils ---------- */
const fmt = (v) =>
  Number(v || 0).toLocaleString("en-PK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

export default function IncomeStatement() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  const reportRef = useRef(null);
  const revenueRef = useRef(null);
  const expenseRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/incomestatement`)
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

    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("portrait", "mm", "a4");

    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pageW / canvas.width, pageH / canvas.height) * 0.95;

    pdf.addImage(
      img,
      "PNG",
      (pageW - canvas.width * ratio) / 2,
      10,
      canvas.width * ratio,
      canvas.height * ratio
    );

    pdf.save(`income-statement-${new Date().toISOString().slice(0, 10)}.pdf`);
    setExporting(false);
  };

  if (loading) {
    return (
      <SidebarLayout>
        <div className="max-w-5xl mx-auto h-96 animate-pulse bg-white border rounded-xl" />
      </SidebarLayout>
    );
  }

  if (!data) return null;

  const isProfit = data.netIncome >= 0;

  return (
    <SidebarLayout>
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Income Statement
          </h2>

          <button
            onClick={handleExportPdf}
            disabled={exporting}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            {exporting ? "Exporting…" : "Export as PDF"}
          </button>
        </div>

        {/* TOP SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 print:hidden">
          <SummaryCard
            label="Total Revenue"
            value={data.totalRevenue}
            onClick={() => scrollTo(revenueRef)}
          />
          <SummaryCard
            label="Total Expenses"
            value={data.totalExpenses}
            onClick={() => scrollTo(expenseRef)}
          />
          <SummaryCard
            label={isProfit ? "Net Profit" : "Net Loss"}
            value={data.netIncome}
            highlight
            positive={isProfit}
          />
        </div>

        {/* REPORT */}
        <div
          ref={reportRef}
          className="bg-white border rounded-xl shadow-sm overflow-hidden"
        >
          {/* REPORT HEADER */}
          <div className="flex justify-center items-center gap-4 py-6 border-b bg-gray-50">
            <img src="/logo.png" className="w-14 h-14 object-contain" />
            <div className="text-center">
              <h1 className="font-semibold text-gray-800">
                Al Rehman Rice Mills
              </h1>
              <p className="text-sm text-gray-500">
                For the period ending{" "}
                {new Date().toLocaleDateString("en-PK")}
              </p>
            </div>
          </div>

          {/* REVENUE */}
          <SectionTable
            ref={revenueRef}
            title="Revenue"
            rows={data.revenueAccounts}
            total={data.totalRevenue}
          />

          {/* EXPENSES */}
          <SectionTable
            ref={expenseRef}
            title="Expenses"
            rows={data.expenseAccounts}
            total={data.totalExpenses}
          />

          {/* NET INCOME */}
          <div
            className={`flex justify-between px-6 py-4 font-bold text-lg border-t-2 ${
              isProfit
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            <span>{isProfit ? "Net Profit" : "Net Loss"}</span>
            <span className="font-mono tabular-nums">
              {fmt(data.netIncome)}
            </span>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}

/* ---------- COMPONENTS ---------- */

const SummaryCard = ({ label, value, onClick, highlight, positive }) => (
  <button
    onClick={onClick}
    className={`text-left border rounded-lg px-4 py-3 transition ${
      highlight
        ? positive
          ? "bg-green-50 border-green-300"
          : "bg-red-50 border-red-300"
        : "bg-white hover:bg-gray-50"
    }`}
  >
    <div className="text-sm font-semibold text-gray-600">{label}</div>
    <div className="text-lg font-bold font-mono tabular-nums">
      {fmt(value)}
    </div>
  </button>
);

const SectionTable = React.forwardRef(({ title, rows, total }, ref) => (
  <div ref={ref} className="border-t">
    <div className="bg-blue-800 text-white px-6 py-3 font-semibold uppercase text-sm">
      {title}
    </div>

    <table className="w-full border-collapse">
      <tbody>
        {rows.map((r) => (
          <tr key={r.id} className="hover:bg-gray-50">
            <td className="px-6 py-2 border-b text-gray-700">
              {r.name}
            </td>
            <td className="px-6 py-2 border-b text-right font-mono tabular-nums">
              {fmt(r.amount)}
            </td>
          </tr>
        ))}

        <tr className="bg-gray-100 font-semibold">
          <td className="px-6 py-3 border-t">Total {title}</td>
          <td className="px-6 py-3 border-t text-right font-mono tabular-nums">
            {fmt(total)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
));
