import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiBox,
  FiShoppingCart,
  FiFileText,
  FiLayers,
  FiUsers,
  FiBarChart2,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

export default function SidebarLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const [openAccounts, setOpenAccounts] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [openPurchase, setOpenPurchase] = useState(false);
  const [openSales, setOpenSales] = useState(false);
  const [openStock, setOpenStock] = useState(false);
  const [openEmployees, setOpenEmployees] = useState(false);
  const [openReports, setOpenReports] = useState(false);

  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const closeMobile = () => setIsOpen(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const MenuButton = ({ icon, label, open, setOpen }) => (
    <button
      onClick={() => setOpen(!open)}
      className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-800 transition"
    >
      <div className="flex items-center space-x-3">
        {icon}
        <span>{label}</span>
      </div>
      {open ? <FiChevronUp /> : <FiChevronDown />}
    </button>
  );

  const SubLink = ({ to, label }) => (
    <Link
      to={to}
      onClick={closeMobile}
      className={`block px-4 py-2 rounded-md text-sm hover:bg-gray-800 ${isActive(to) ? "bg-gray-800" : ""
        }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ===== SIDEBAR ===== */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:translate-x-0 z-50`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">ADMIN PANEL</h1>
          <button className="md:hidden" onClick={toggleSidebar}>
            <FiX size={24} />
          </button>
        </div>

        {/* Navigation */}
        {/* Navigation */}
        <nav className="mt-4 space-y-1 px-4 text-sm overflow-y-auto max-h-[calc(100vh-64px)] pr-2">


          {/* DASHBOARD */}
          <Link
            to="/dashboard"
            onClick={closeMobile}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 ${isActive("/dashboard") ? "bg-gray-800" : ""
              }`}
          >
            <FiHome />
            <span>Dashboard</span>
          </Link>

          {/* ACCOUNTS */}
          <MenuButton
            icon={<FiUser />}
            label="Accounts"
            open={openAccounts}
            setOpen={setOpenAccounts}
          />
          {openAccounts && (
            <div className="ml-8 space-y-1">
              <SubLink to="/create-account" label="Add Account" />
              <SubLink to="/view-accounts" label="Accounts List" />
              <SubLink to="/ledger" label="General Ledger" />
            </div>
          )}

          {/* PRODUCTS */}
          <MenuButton
            icon={<FiBox />}
            label="Products"
            open={openProducts}
            setOpen={setOpenProducts}
          />
          {openProducts && (
            <div className="ml-8 space-y-1">
              <SubLink to="#" label="Add New" />
              <SubLink to="#" label="Products List" />
            </div>
          )}

          {/* PURCHASE */}
          <MenuButton
            icon={<FiShoppingCart />}
            label="Purchase"
            open={openPurchase}
            setOpen={setOpenPurchase}
          />
          {openPurchase && (
            <div className="ml-8 space-y-1">
              <SubLink to="#" label="New Purchase Order" />
              <SubLink to="/view-purchase-invoices" label="All Purchases" />
            </div>
          )}

          {/* SALES */}
          <MenuButton
            icon={<FiFileText />}
            label="Sales"
            open={openSales}
            setOpen={setOpenSales}
          />
          {openSales && (
            <div className="ml-8 space-y-1">
              <SubLink to="/add-invoice-sales" label="Create Invoice" />
              <SubLink to="/view-sales-invoices" label="Sales History" />
            </div>
          )}

          {/* STOCK */}
          <MenuButton
            icon={<FiLayers />}
            label="Stock"
            open={openStock}
            setOpen={setOpenStock}
          />
          {openStock && (
            <div className="ml-8 space-y-1">
              <SubLink to="#" label="Stock Management" />
            </div>
          )}

          {/* EMPLOYEES */}
          <MenuButton
            icon={<FiUsers />}
            label="Employees"
            open={openEmployees}
            setOpen={setOpenEmployees}
          />
          {openEmployees && (
            <div className="ml-8 space-y-1">
              <SubLink to="#" label="New Employee" />
              <SubLink to="#" label="All Employees" />
            </div>
          )}

          {/* REPORTS */}
          <MenuButton
            icon={<FiBarChart2 />}
            label="Reports"
            open={openReports}
            setOpen={setOpenReports}
          />
          {openReports && (
            <div className="ml-8 space-y-1">
              <SubLink to="#" label="Trial Balance" />
              <SubLink to="#" label="Balance Sheet" />
              <SubLink to="#" label="Income Statement" />
              <SubLink to="#" label="Receivables Report" />
              <SubLink to="#" label="Payables Report" />
              <SubLink to="#" label="Daily Cash Book" />
              <SubLink to="#" label="Stock Ledger" />
              <SubLink to="#" label="Purchase Report" />
              <SubLink to="#" label="Sales Report" />
              <SubLink to="#" label="User Management" />
            </div>
          )}

        </nav>
      </aside>

      {/* ===== MAIN ===== */}
      <div className="flex-1 flex flex-col md:ml-64">
        <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-3">
            <button className="md:hidden" onClick={toggleSidebar}>
              <FiMenu size={24} />
            </button>
            <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl font-semibold">AL REHMAN RICE MILL</h1>
          </div>

          <p className="text-gray-600 hidden sm:block">
            Welcome, <span className="font-semibold text-blue-600">Ali Raza</span>
          </p>
        </header>

        <main className="grow p-6">{children}</main>
      </div>
    </div>
  );
}
