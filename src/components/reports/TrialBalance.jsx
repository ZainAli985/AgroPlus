import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";

export default function TrialBalance() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/trial-balance`)
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <SidebarLayout>Loading...</SidebarLayout>;

  return (
    <SidebarLayout>
      <div className="bg-white p-8 max-w-4xl mx-auto border">

        {/* HEADER */}
        <div className="flex justify-center gap-4 mb-6">
          <img src="/logo.png" className="w-14" />
          <div className="text-center">
            <h1 className="font-semibold">Al Rehman Rice Mills</h1>
            <h2 className="text-2xl font-bold text-blue-700">Trial Balance</h2>
            <p className="text-sm">
              As at {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* TABLE */}
        <div className="border">

          <div className="grid grid-cols-3 bg-blue-700 text-white px-3 py-2 font-bold">
            <span>Account</span>
            <span className="text-right">Debit</span>
            <span className="text-right">Credit</span>
          </div>

          {data.rows.map(r => (
            <Row
              key={r.id}
              label={r.name}
              debit={r.debit}
              credit={r.credit}
            />
          ))}

          <GrandTotalRow
            debit={data.totalDebit}
            credit={data.totalCredit}
          />

        </div>

      </div>
    </SidebarLayout>
  );
}

/* UI PARTS */

const Row = ({ label, debit, credit }) => (
  <div className="grid grid-cols-3 px-3 py-1 border-b">
    <span>{label}</span>
    <span className="text-right">
      {debit ? debit.toLocaleString() : ""}
    </span>
    <span className="text-right">
      {credit ? credit.toLocaleString() : ""}
    </span>
  </div>
);

const GrandTotalRow = ({ debit, credit }) => (
  <div className="grid grid-cols-3 px-3 py-2 font-bold bg-gray-100 border-t">
    <span>Total</span>
    <span className="text-right">{debit.toLocaleString()}</span>
    <span className="text-right">{credit.toLocaleString()}</span>
  </div>
);
