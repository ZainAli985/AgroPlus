import React from "react";
import SidebarLayout from "../layout/SidebarLayout";

export default function IncomeStatement() {
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
            <h2 className="text-2xl font-bold text-blue-700">
              Income Statement
            </h2>
            <p className="text-sm">
              For the Years Ending [Jul 01, 2025 and Jun 30, 2026]
            </p>
          </div>
        </div>

        {/* ===== TABLE ===== */}
        <div className="border border-gray-400">

          {/* ===== REVENUE ===== */}
          <Section title="Revenue" />

          <Row label="Gross sales" value="181,683" />
          <Row label="(Less sales returns and allowances)" value="(10,000)" />
          <NetRow label="Net Sales" value="171,683" />

          {/* ===== COGS ===== */}
          <Section title="Cost of Goods Sold" />

          <Row label="Beginning inventory" />
          <Row label="Goods purchased" />
          <Row label="Goods manufactured: Raw materials" value="30,028" />
          <Row label="Goods manufactured: Direct Labor" value="100,000" />
          <Row label="Total Goods Available" value="130,028" />
          <Row label="(Less ending inventory)" />
          <NetRow label="Cost of Goods Sold" value="130,028" />

          {/* ===== GROSS PROFIT ===== */}
          <GrandLine label="Gross Profit (Loss)" value="41,655" />

          {/* ===== EXPENSES ===== */}
          <Section title="Expenses" />

          <Row label="Advertising" />
          <Row label="Bad debt" />
          <Row label="Commissions" />
          <Row label="Depreciation" value="16,616" />
          <Row label="Employee benefits" />
          <Row label="Furniture and equipment" />
          <Row label="Insurance" />
          <Row label="Maintenance and repairs" />
          <Row label="Office supplies" />
          <Row label="Payroll taxes" />
          <Row label="Rent" />
          <Row label="Research and development" />
          <Row label="Salaries and wages" />
          <Row label="Software" />
          <Row label="Travel" />
          <Row label="Utilities" />
          <Row label="Web hosting and domains" />
          <Row label="Other" value="16,192" />

          <NetRow label="Total Operating Expenses" value="32,808" />

          {/* ===== OPERATING INCOME ===== */}
          <GrandLine label="Operating Income (Loss)" value="8,847" />

          <Row
            label="Non-operating revenues, expenses, gains, losses"
            value="12,762"
          />
          <Row label="(Less interest expense)" value="(6,113)" />

          <NetRow label="Income Before Taxes" value="15,496" />
          <Row label="(Less income tax expense)" value="(1,069)" />

          {/* ===== CONTINUING OPERATIONS ===== */}
          <GrandLine
            label="Income From Continuing Operations"
            value="14,427"
          />

          {/* ===== BELOW THE LINE ===== */}
          <Section title="Below-the-Line Items" />

          <Row label="Income from discontinued operations" />
          <Row label="Extraordinary items" />
          <Row label="Cumulative effect of accounting changes" />

          {/* ===== NET INCOME ===== */}
          <FinalTotal label="Net Income" value="14,427" />

        </div>
      </div>
    </SidebarLayout>
  );
}

/* ===== SMALL COMPONENTS ===== */

const Section = ({ title }) => (
  <div className="bg-blue-700 text-white font-bold px-3 py-2">
    {title}
  </div>
);

const Row = ({ label, value = "" }) => (
  <div className="flex justify-between px-3 py-1 text-sm border-b border-gray-200">
    <span className="pl-4">{label}</span>
    <span className="w-32 text-right border border-gray-300 px-2">
      {value}
    </span>
  </div>
);

const NetRow = ({ label, value }) => (
  <div className="flex justify-between px-3 py-1 font-semibold italic border-t border-gray-400">
    <span className="pl-4">{label}</span>
    <span className="w-32 text-right border border-gray-400 px-2">
      {value}
    </span>
  </div>
);

const GrandLine = ({ label, value }) => (
  <div className="flex justify-between px-3 py-2 font-bold bg-gray-100 border-t-2 border-gray-500">
    <span>{label}</span>
    <span className="w-32 text-right border border-gray-400 px-2">
      {value}
    </span>
  </div>
);

const FinalTotal = ({ label, value }) => (
  <div className="flex justify-between px-3 py-2 font-bold bg-blue-100 border-t-2 border-gray-600">
    <span>{label}</span>
    <span className="w-32 text-right border border-gray-600 px-2">
      {value}
    </span>
  </div>
);
