import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
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
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const closeMobile = () => {
    if (window.innerWidth < 768) setIsOpen(false);
  };

  const handleBackNavigation = () => navigate(-1);

  const MenuButton = ({ icon, label, menuKey }) => (
    <button
      onClick={() => setActiveMenu(activeMenu === menuKey ? "" : menuKey)}
      className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-800 transition"
    >
      <div className="flex items-center space-x-3">
        {icon}
        <span>{label}</span>
      </div>
      {activeMenu === menuKey ? <FiChevronUp /> : <FiChevronDown />}
    </button>
  );

  const SubLink = ({ to, label }) => (
    <Link
      to={to}
      onClick={closeMobile}
      className={`block px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition ${
        isActive(to) ? "bg-gray-800" : ""
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ===== SIDEBAR ===== */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h1 className="text-xl font-bold whitespace-nowrap">ADMIN PANEL</h1>
          <button
            onClick={toggleSidebar}
            className="md:hidden flex items-center justify-center p-1 rounded hover:bg-gray-800"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-1 px-4 text-sm overflow-y-auto max-h-[calc(100vh-64px)] pr-2">
          <Link
            to="/dashboard"
            onClick={closeMobile}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition ${
              isActive("/dashboard") ? "bg-gray-800" : ""
            }`}
          >
            <FiHome />
            <span>Dashboard</span>
          </Link>

          {/* ACCOUNTS */}
          <MenuButton icon={<FiUser />} label="Accounts" menuKey="accounts" />
          {activeMenu === "accounts" && (
            <div className="ml-8 space-y-1">
              <SubLink to="/create-account" label="Add Account" />
              <SubLink to="/view-accounts" label="Accounts List" />
              <SubLink to="/ledger" label="General Ledger" />
              <SubLink to="/general-entries" label="Journal Entries" />
            </div>
          )}

          {/* PRODUCTS */}
          <MenuButton icon={<FiBox />} label="Products" menuKey="products" />
          {activeMenu === "products" && (
            <div className="ml-8 space-y-1">
              <SubLink to="/products/new" label="Add New" />
              <SubLink to="/products" label="Products List" />
            </div>
          )}

          {/* PURCHASE */}
          <MenuButton icon={<FiShoppingCart />} label="Purchase" menuKey="purchase" />
          {activeMenu === "purchase" && (
            <div className="ml-8 space-y-1">
              <SubLink to="/add-invoice-purchase" label="New Purchase Order" />
              <SubLink to="/view-purchase-invoices" label="All Purchases" />
            </div>
          )}

          {/* SALES */}
          <MenuButton icon={<FiFileText />} label="Sales" menuKey="sales" />
          {activeMenu === "sales" && (
            <div className="ml-8 space-y-1">
              <SubLink to="/add-invoice-sales" label="Create Invoice" />
              <SubLink to="/view-sales-invoices" label="Sales History" />
            </div>
          )}

          {/* STOCK */}
          <MenuButton icon={<FiLayers />} label="Stock" menuKey="stock" />
          {activeMenu === "stock" && (
            <div className="ml-8 space-y-1">
              <SubLink to="#" label="Stock Management" />
            </div>
          )}

          {/* EMPLOYEES */}
          <MenuButton icon={<FiUsers />} label="Employees" menuKey="employees" />
          {activeMenu === "employees" && (
            <div className="ml-8 space-y-1">
              <SubLink to="#" label="New Employee" />
              <SubLink to="#" label="All Employees" />
            </div>
          )}

          {/* REPORTS */}
          <MenuButton icon={<FiBarChart2 />} label="Reports" menuKey="reports" />
          {activeMenu === "reports" && (
            <div className="ml-8 space-y-1">
              <SubLink to="/trialbalance" label="Trial Balance" />
              <SubLink to="/balancesheet" label="Balance Sheet" />
              <SubLink to="/incomestatement" label="Income Statement" />
            </div>
          )}
        </nav>
      </aside>

      {/* ===== MAIN ===== */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        {/* Header */}
        <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-3">
            {/* Back button visible on all screens except dashboard */}
            {location.pathname !== "/dashboard" && (
              <button
                onClick={handleBackNavigation}
                className="flex items-center justify-center p-1 rounded hover:bg-gray-200"
              >
                <FiArrowLeft size={22} />
              </button>
            )}

            {/* Hamburger toggle visible only on mobile */}
            <button
              onClick={toggleSidebar}
              className="md:hidden flex items-center justify-center p-1 rounded hover:bg-gray-200"
            >
              <FiMenu size={22} />
            </button>

            {/* Logo */}
            <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl font-semibold whitespace-nowrap">
              AL REHMAN RICE MILL
            </h1>
          </div>

          {/* Desktop welcome */}
          <p className="text-gray-600 hidden sm:block">
            Welcome, <span className="font-semibold text-blue-600">Ali Raza</span>
          </p>
        </header>

        <main className="grow p-6">{children}</main>
      </div>
    </div>
  );
}
