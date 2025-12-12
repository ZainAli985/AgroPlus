import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import { FiPlusCircle, FiEye, FiShoppingCart, FiFileText } from "react-icons/fi";

const InvoiceDashboard = () => {
  const navigate = useNavigate();

  const boxes = [
    {
      label: "Add Sales Invoice",
      path: "/add-invoice-sales",
      icon: <FiPlusCircle size={38} className="text-blue-600" />,
      bg: "bg-blue-50",
      border: "border-blue-200"
    },
    {
      label: "View Sales Invoices",
      path: "/view-sales-invoices",
      icon: <FiEye size={38} className="text-green-600" />,
      bg: "bg-green-50",
      border: "border-green-200"
    },
    {
      label: "Add Purchase Invoice",
      path: "/add-invoice-purchase",
      icon: <FiShoppingCart size={38} className="text-yellow-600" />,
      bg: "bg-yellow-50",
      border: "border-yellow-200"
    },
    {
      label: "View Purchase Invoices",
      path: "/view-purchase-invoices",
      icon: <FiFileText size={38} className="text-red-600" />,
      bg: "bg-red-50",
      border: "border-red-200"
    }
  ];

  return (
    <SidebarLayout>
      <div className="max-w-7xl mx-auto py-10 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Invoices Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {boxes.map((box) => (
            <div
              key={box.label}
              onClick={() => navigate(box.path)}
              className={`
                ${box.bg} ${box.border}
                cursor-pointer border rounded-2xl p-8 shadow-md 
                hover:shadow-xl transition-all duration-300 
                flex flex-col items-center text-center
                hover:-translate-y-1
              `}
            >
              <div className="mb-4">
                <div className="p-4 bg-white rounded-xl shadow-sm border">
                  {box.icon}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                {box.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default InvoiceDashboard;
