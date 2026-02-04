import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";

export default function IncomeStatement() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/income-statement`)
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <SidebarLayout>Loading...</SidebarLayout>;

  return (
    <SidebarLayout>
      <div className="bg-white p-8 max-w-5xl mx-auto border">

        {/* HEADER */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <img src="/logo.png" className="w-16 h-16 object-contain" />
          <div className="text-center">
            <h1 className="text-xl font-semibold">Al Rehman Rice Mills</h1>
            <h2 className="text-2xl font-bold text-blue-700">Income Statement</h2>
            <p className="text-sm">For the Year Ending {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* REVENUE */}
        <Section title="Revenue" />
        {data.revenueAccounts.map(r => <Row key={r.id} label={r.name} value={r.amount} />)}
        <NetRow label="Total Revenue" value={data.totalRevenue} />

        {/* EXPENSES */}
        <Section title="Expenses" />
        {data.expenseAccounts.map(e => <Row key={e.id} label={e.name} value={e.amount} />)}
        <NetRow label="Total Expenses" value={data.totalExpenses} />

        {/* NET INCOME */}
        <GrandLine label="Net Income" value={data.netIncome} />

      </div>
    </SidebarLayout>
  );
}

/* COMPONENTS */

const Section = ({ title }) => (
  <div className="bg-blue-700 text-white font-bold px-3 py-2">{title}</div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between px-3 py-1 text-sm border-b border-gray-200">
    <span className="pl-4">{label}</span>
    <span className="w-32 text-right border border-gray-300 px-2">{value.toLocaleString()}</span>
  </div>
);

const NetRow = ({ label, value }) => (
  <div className="flex justify-between px-3 py-1 font-semibold italic border-t border-gray-400">
    <span className="pl-4">{label}</span>
    <span className="w-32 text-right border border-gray-400 px-2">{value.toLocaleString()}</span>
  </div>
);

const GrandLine = ({ label, value }) => (
  <div className="flex justify-between px-3 py-2 font-bold bg-gray-100 border-t-2 border-gray-500">
    <span>{label}</span>
    <span className="w-32 text-right border border-gray-400 px-2">{value.toLocaleString()}</span>
  </div>
);
