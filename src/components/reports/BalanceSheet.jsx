import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";

export default function BalanceSheet() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/balance-sheet`)
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <SidebarLayout>Loading...</SidebarLayout>;

  return (
    <SidebarLayout>
      <div className="bg-white p-8 max-w-6xl mx-auto border">

        {/* HEADER */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <img src="/logo.png" className="w-14" />
          <div className="text-center">
            <h1 className="font-semibold">Al Rehman Rice Mills</h1>
            <h2 className="text-2xl font-bold text-blue-700">Balance Sheet</h2>
            <p className="text-sm">
              As at {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 border">

          {/* ASSETS */}
          <div className="border-r">

            <Header title="Assets" />

            {data.assets.map(a =>
              <Row key={a.id} label={a.name} value={a.amount} />
            )}

            <TotalRow label="Total Assets" value={data.totalAssets} />

          </div>

          {/* LIABILITIES + EQUITY */}
          <div>

            <Header title="Liabilities" />

            {data.liabilities.map(l =>
              <Row key={l.id} label={l.name} value={l.amount} />
            )}

            <TotalRow label="Total Liabilities" value={data.totalLiabilities} />

            <Header title="Equity" />

            {data.equity.map(e =>
              <Row key={e.id} label={e.name} value={e.amount} />
            )}

            <TotalRow label="Total Equity" value={data.totalEquity} />

          </div>

        </div>

        {/* FOOTER TOTALS */}
        <div className="grid grid-cols-2 border-t font-bold bg-gray-100">
          <div className="p-3">
            Total Assets: {data.totalAssets.toLocaleString()}
          </div>
          <div className="p-3 border-l">
            Total Liabilities + Equity:
            {(data.totalLiabilities + data.totalEquity).toLocaleString()}
          </div>
        </div>

      </div>
    </SidebarLayout>
  );
}

/* UI COMPONENTS */

const Header = ({ title }) => (
  <div className="bg-blue-700 text-white px-3 py-2 font-semibold">
    {title}
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between px-3 py-1 border-b">
    <span>{label}</span>
    <span>{Number(value).toLocaleString()}</span>
  </div>
);

const TotalRow = ({ label, value }) => (
  <div className="flex justify-between px-3 py-2 font-semibold bg-gray-50">
    <span>{label}</span>
    <span>{Number(value).toLocaleString()}</span>
  </div>
);
