import React from "react";
import SidebarLayout from "../layout/SidebarLayout";
export default function BalanceSheet() {
    return (
        <SidebarLayout>
            <div className="bg-white p-8 max-w-6xl mx-auto border border-gray-300">

                {/* Header */}
                <div className="flex items-center justify-center gap-4 mb-6">

                    {/* Logo */}
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="w-16 h-16 object-contain"
                    />

                    {/* Titles */}
                    <div className="text-center">
                        <h1 className="text-xl font-semibold">Al Rehman Rice Mills</h1>
                        <h2 className="text-2xl font-bold text-blue-700">Balance Sheet</h2>
                        <p className="text-sm">Date: (Current Date)</p>
                    </div>

                </div>



                {/* Main Table */}
                <div className="grid grid-cols-2 border border-gray-400">

                    {/* ASSETS COLUMN */}
                    <div className="border-r border-gray-400">

                        {/* Assets Header */}
                        <div className="bg-blue-700 text-white font-bold px-3 py-2">
                            Assets
                        </div>

                        {/* Current Assets */}
                        <div className="bg-blue-100 font-semibold px-3 py-1">
                            Current Assets
                        </div>

                        <Row label="Cash" value="11,874" />
                        <Row label="Accounts receivable" />
                        <Row label="Inventory" />
                        <Row label="Prepaid expenses" />
                        <Row label="Short-term investments" />

                        <TotalRow label="Total current assets" value="Rs11,874.00" />

                        {/* Fixed Assets */}
                        <div className="bg-blue-100 font-semibold px-3 py-1 mt-1">
                            Fixed (Long-Term) Assets
                        </div>

                        <Row label="Long-term investments" value="1,208" />
                        <Row label="Property, plant, and equipment" value="15,340" />
                        <Row label="(Less accumulated depreciation)" value="(2,200)" />
                        <Row label="Intangible assets" />

                        <TotalRow label="Total fixed assets" value="Rs14,348.00" />

                        {/* Other Assets */}
                        <div className="bg-blue-100 font-semibold px-3 py-1 mt-1">
                            Other Assets
                        </div>

                        <Row label="Deferred income tax" />
                        <Row label="Other" />

                        <TotalRow label="Total Other Assets" value="Rs0.00" />

                    </div>

                    {/* LIABILITIES COLUMN */}
                    <div>

                        {/* Liabilities Header */}
                        <div className="bg-blue-700 text-white font-bold px-3 py-2">
                            Liabilities and Owner's Equity
                        </div>

                        {/* Current Liabilities */}
                        <div className="bg-blue-100 font-semibold px-3 py-1">
                            Current Liabilities
                        </div>

                        <Row label="Accounts payable" value="8,060" />
                        <Row label="Short-term loans" />
                        <Row label="Income taxes payable" value="3,145" />
                        <Row label="Accrued salaries and wages" />
                        <Row label="Unearned revenue" />
                        <Row label="Current portion of long-term debt" />

                        <TotalRow label="Total current liabilities" value="Rs11,205.00" />

                        {/* Long-Term Liabilities */}
                        <div className="bg-blue-100 font-semibold px-3 py-1 mt-1">
                            Long-Term Liabilities
                        </div>

                        <Row label="Long-term debt" value="3,450" />
                        <Row label="Deferred income tax" />
                        <Row label="Other" />

                        <TotalRow label="Total long-term liabilities" value="Rs3,450.00" />

                        {/* Owner's Equity */}
                        <div className="bg-blue-100 font-semibold px-3 py-1 mt-1">
                            Owner's Equity
                        </div>

                        <Row label="Owner's investment" value="7,178" />
                        <Row label="Retained earnings" value="4,389" />
                        <Row label="Other" />

                        <TotalRow label="Total owner's equity" value="Rs11,567.00" />

                    </div>

                </div>

                {/* Bottom Totals */}
                <div className="grid grid-cols-2 border border-t-0 border-gray-400">

                    <div className="flex justify-between px-3 py-2 font-bold bg-gray-100">
                        <span>Total Assets</span>
                        <span>Rs26,222.00</span>
                    </div>

                    <div className="flex justify-between px-3 py-2 font-bold bg-gray-100 border-l border-gray-400">
                        <span>Total Liabilities and Owner's Equity</span>
                        <span>Rs26,222.00</span>
                    </div>

                </div>

            </div>
        </SidebarLayout>
    );
}

/* Reusable Row Component */
const Row = ({ label, value }) => (
    <div className="flex justify-between px-3 py-1 text-sm border-b border-gray-300">
        <span>{label}</span>
        <span>{value || ""}</span>
    </div>
);

/* Reusable Total Row */
const TotalRow = ({ label, value }) => (
    <div className="flex justify-between px-3 py-1 italic font-semibold bg-gray-50 border-b border-gray-400">
        <span>{label}</span>
        <span>{value}</span>
    </div>
);
