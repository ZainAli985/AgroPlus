import React from "react";
import SidebarLayout from "../layout/SidebarLayout";

export default function TrialBalance() {
  return (
    <SidebarLayout>
      <div className="bg-white p-8 max-w-5xl mx-auto border border-gray-300">

        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-16 h-16 object-contain"
          />

          <div className="text-center">
            <h1 className="text-xl font-semibold">Al Rehman Rice Mills</h1>
            <h2 className="text-2xl font-bold text-blue-700">Trial Balance</h2>
            <p className="text-sm">Date: (Current Date)</p>
          </div>
        </div>

        {/* ===== TABLE ===== */}
        <div className="border border-gray-400">

          {/* Column Headers */}
          <div className="grid grid-cols-3 bg-blue-700 text-white font-bold px-3 py-2">
            <span>Assets</span>
            <span className="text-right">2020</span>
            <span className="text-right">2019</span>
          </div>

          {/* ===== CURRENT ASSETS ===== */}
          <Section title="Current Assets" />

          <Row label="Cash" y2020="11,874" />
          <Row label="Accounts receivable" />
          <Row label="Inventory" />
          <Row label="Prepaid expenses" />
          <Row label="Short-term investments" />

          <TotalRow label="Total current assets" y2020="Rs11,874.00" y2019="Rs0.00" />

          {/* ===== FIXED ASSETS ===== */}
          <Section title="Fixed (Long-Term) Assets" />

          <Row label="Long-term investments" y2020="1,208" />
          <Row label="Property, plant, and equipment" y2020="15,340" />
          <Row label="(Less accumulated depreciation)" y2020="(2,200)" />
          <Row label="Intangible assets" />

          <TotalRow label="Total fixed assets" y2020="Rs14,348.00" y2019="Rs0.00" />

          {/* ===== OTHER ASSETS ===== */}
          <Section title="Other Assets" />

          <Row label="Deferred income tax" />
          <Row label="Other" />

          <TotalRow label="Total Other Assets" y2020="Rs0.00" y2019="Rs0.00" />

          {/* TOTAL ASSETS */}
          <GrandTotalRow label="Total Assets" y2020="Rs26,222.00" y2019="Rs0.00" />

          {/* ===== LIABILITIES HEADER ===== */}
          <div className="bg-blue-700 text-white font-bold px-3 py-2 mt-4">
            Liabilities and Owner's Equity
          </div>

          {/* ===== CURRENT LIABILITIES ===== */}
          <Section title="Current Liabilities" />

          <Row label="Accounts payable" y2020="8,060" />
          <Row label="Short-term loans" />
          <Row label="Income taxes payable" y2020="3,145" />
          <Row label="Accrued salaries and wages" />
          <Row label="Unearned revenue" />
          <Row label="Current portion of long-term debt" />

          <TotalRow label="Total current liabilities" y2020="Rs11,205.00" y2019="Rs0.00" />

          {/* ===== LONG TERM LIABILITIES ===== */}
          <Section title="Long-Term Liabilities" />

          <Row label="Long-term debt" y2020="3,450" />
          <Row label="Deferred income tax" />
          <Row label="Other" />

          <TotalRow label="Total long-term liabilities" y2020="Rs3,450.00" y2019="Rs0.00" />

          {/* ===== OWNER EQUITY ===== */}
          <Section title="Owner's Equity" />

          <Row label="Owner's investment" y2020="7,178" />
          <Row label="Retained earnings" y2020="4,389" />
          <Row label="Other" />

          <TotalRow label="Total owner's equity" y2020="Rs11,567.00" y2019="Rs0.00" />

          {/* GRAND TOTAL */}
          <GrandTotalRow
            label="Total Liabilities and Owner's Equity"
            y2020="Rs26,222.00"
            y2019="Rs0.00"
          />

        </div>
      </div>
    </SidebarLayout>
  );
}

/* ===== SMALL COMPONENTS ===== */

const Section = ({ title }) => (
  <div className="bg-blue-100 font-semibold px-3 py-1">
    {title}
  </div>
);

const Row = ({ label, y2020 = "", y2019 = "" }) => (
  <div className="grid grid-cols-3 px-3 py-1 text-sm border-b border-gray-200">
    <span className="pl-4">{label}</span>
    <span className="text-right">{y2020}</span>
    <span className="text-right">{y2019}</span>
  </div>
);

const TotalRow = ({ label, y2020, y2019 }) => (
  <div className="grid grid-cols-3 px-3 py-1 italic font-semibold border-t border-gray-400">
    <span className="pl-4">{label}</span>
    <span className="text-right">{y2020}</span>
    <span className="text-right">{y2019}</span>
  </div>
);

const GrandTotalRow = ({ label, y2020, y2019 }) => (
  <div className="grid grid-cols-3 px-3 py-2 font-bold bg-gray-100 border-t-2 border-gray-500">
    <span>{label}</span>
    <span className="text-right">{y2020}</span>
    <span className="text-right">{y2019}</span>
  </div>
);
