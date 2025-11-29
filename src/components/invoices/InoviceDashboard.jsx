import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import { FiPlusCircle, FiEye, FiShoppingCart, FiFileText } from "react-icons/fi";

const InvoiceDashboard = () => {
  const navigate = useNavigate();

  const boxes = [
    { label: "Add Sales", path: "/add-invoice-sales", color: "bg-blue-500", icon: <FiPlusCircle size={40} /> },
    { label: "View Sales Invoices", path: "/view-sales-invoices", color: "bg-green-500", icon: <FiEye size={40} /> },
    { label: "Add Purchase", path: "/add-invoice-purchase", color: "bg-yellow-500", icon: <FiShoppingCart size={40} /> },
    { label: "View Purchase Invoices", path: "/view-purchase-invoices", color: "bg-red-500", icon: <FiFileText size={40} /> },
  ];

  return (
    <SidebarLayout>
      <div className="max-w-7xl mx-auto py-8 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Invoices Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {boxes.map((box) => (
            <div
              key={box.label}
              onClick={() => navigate(box.path)}
              className={`${box.color} cursor-pointer text-white p-10 rounded-2xl shadow-xl flex flex-col items-center justify-center text-xl font-semibold hover:scale-105 transform transition`}
            >
              <div className="mb-4">{box.icon}</div>
              <div className="text-center">{box.label}</div>
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default InvoiceDashboard;
