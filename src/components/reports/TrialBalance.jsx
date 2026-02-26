import React, { useEffect, useState, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { authFetch } from "../../utils/authFetch";

const fmt = (value) =>
  Number(value || 0).toLocaleString("en-PK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

export default function TrialBalance() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const reportRef = useRef(null);

  useEffect(() => {
    const fetchTrialBalance = async () => {
      try {
        const res = await authFetch(`${API_BASE_URL}/trial-balance`);
        const data = await res.json();

        if (!res.ok) throw new Error(data?.message || "Failed to load trial balance");

        setData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrialBalance();
  }, []);

  const handleExportPdf = async () => {
    if (!reportRef.current) return;
    setExporting(true);

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "mm", "a4");

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pageW / canvas.width, pageH / canvas.height) * 0.95;

      const w = canvas.width * ratio;
      const h = canvas.height * ratio;

      pdf.addImage(imgData, "PNG", (pageW - w) / 2, 10, w, h);
      pdf.save(`trial-balance-${new Date().toISOString().slice(0, 10)}.pdf`);
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <SidebarLayout>
        <div className="max-w-5xl mx-auto animate-pulse">
          <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
          <div className="bg-white rounded-xl h-96 border" />
        </div>
      </SidebarLayout>
    );
  }

  if (!data) return null;

  return (
    <SidebarLayout>
      <div className="max-w-5xl mx-auto">
        {/* HEADER + EXPORT */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Trial Balance
          </h2>

          <button
            onClick={handleExportPdf}
            disabled={exporting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            {exporting ? "Exporting…" : "Export as PDF"}
          </button>
        </div>

        {/* TOTALS AT TOP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 font-semibold">
            Total Debit
            <span className="float-right font-mono">
              {fmt(data.totalDebit)}
            </span>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 font-semibold">
            Total Credit
            <span className="float-right font-mono">
              {fmt(data.totalCredit)}
            </span>
          </div>
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
              <h1 className="font-semibold text-gray-800">
                Al Rehman Rice Mills
              </h1>
              <p className="text-sm text-gray-500">
                As at{" "}
                {new Date().toLocaleDateString("en-PK", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* GROUPED TABLE */}
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-slate-800 text-white px-4 py-3 text-left border">
                  Account
                </th>
                <th className="bg-slate-800 text-white px-4 py-3 text-right border w-36">
                  Debit
                </th>
                <th className="bg-slate-800 text-white px-4 py-3 text-right border w-36">
                  Credit
                </th>
              </tr>
            </thead>

            <tbody>
              {data.groups.map((group) => (
                <React.Fragment key={group.type}>
                  {/* GROUP HEADER */}
                  <tr className="bg-gray-100">
                    <td
                      colSpan={3}
                      className="px-4 py-2 font-semibold text-gray-700 uppercase border"
                    >
                      {group.type}
                    </td>
                  </tr>

                  {group.rows.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2.5 border">{r.name}</td>
                      <td className="px-4 py-2.5 text-right font-mono border">
                        {r.debit ? fmt(r.debit) : ""}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono border">
                        {r.credit ? fmt(r.credit) : ""}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SidebarLayout>
  );
}
