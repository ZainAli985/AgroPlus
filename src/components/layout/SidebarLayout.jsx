// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   FiMenu,
//   FiX,
//   FiHome,
//   FiUser,
//   FiFileText,
//   FiLayers,
// } from "react-icons/fi";
// import { MdLibraryBooks } from "react-icons/md";

// export default function SidebarLayout({ children }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const links = [
//     { to: "/dashboard", label: "Dashboard", icon: <FiHome /> },
//     { to: "/accounts", label: "Accounts", icon: <FiUser /> },
//     { to: "/add-invoice", label: "Invoices", icon: <FiFileText /> },
//     { to: "/general-entries", label: "General Entries", icon: <FiLayers /> },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 md:translate-x-0 z-50`}
//       >
//         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
//           <h1 className="text-xl font-bold tracking-wide">ADMIN PANEL</h1>
//           <button
//             className="text-white md:hidden focus:outline-none"
//             onClick={toggleSidebar}
//           >
//             <FiX size={24} />
//           </button>
//         </div>

//         <nav className="mt-6 space-y-2 px-4">
//           {links.map((link) => (
//             <Link
//               key={link.to}
//               to={link.to}
//               className={`flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition ${
//                 location.pathname === link.to ? "bg-gray-800" : ""
//               }`}
//               onClick={() => setIsOpen(false)}
//             >
//               <span className="text-lg">{link.icon}</span>
//               <span className="font-medium">{link.label}</span>
//             </Link>
//           ))}
//         </nav>
//       </aside>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col md:ml-64">

//         {/* Top Bar */}
//         <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-40">

//           {/* Left Section — Logo + Name */}
//           <div className="flex items-center space-x-3">
//             {/* Mobile Menu Button */}
//             <button
//               className="text-gray-800 md:hidden focus:outline-none"
//               onClick={toggleSidebar}
//             >
//               <FiMenu size={24} />
//             </button>

//             {/* Logo + Name */}
//             <div className="flex items-center space-x-3">
//               <img
//                 src="/logo.png"
//                 alt="Company Logo"
//                 className="w-10 h-10 rounded-full object-cover border border-gray-200"
//               />
//               <h1 className="text-2xl font-semibold text-gray-800 tracking-wide">
//                 AL REHMAN RICE MILL
//               </h1>
//             </div>
//           </div>

//           {/* Right Section — Welcome Text Only */}
//           <div className="flex items-center">
//             <p className="text-gray-600 text-lg font-medium hidden sm:block">
//               Welcome, <span className="font-semibold text-blue-600">Ali Raza</span>
//             </p>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="grow p-6">{children}</main>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiFileText,
  FiLayers,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

export default function SidebarLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const [openAccounts, setOpenAccounts] = useState(false);
  const [openInvoices, setOpenInvoices] = useState(false);
  const [openGeneral, setOpenGeneral] = useState(false);

  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path;

  const closeMobile = () => setIsOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ===== SIDEBAR ===== */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:translate-x-0 z-50`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h1 className="text-xl font-bold tracking-wide">ADMIN PANEL</h1>
          <button
            className="text-white md:hidden"
            onClick={toggleSidebar}
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-1 px-4">

          {/* ===== DASHBOARD ===== */}
          <Link
            to="/dashboard"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition ${isActive("/dashboard") ? "bg-gray-800" : ""
              }`}
            onClick={closeMobile}
          >
            <FiHome />
            <span>Dashboard</span>
          </Link>

          {/* ===== ACCOUNTS ===== */}
          <button
            onClick={() => setOpenAccounts(!openAccounts)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            <div className="flex items-center space-x-3">
              <FiUser />
              <span>Accounts</span>
            </div>
            {openAccounts ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openAccounts && (
            <div className="ml-8 space-y-1">
              <Link
                to="/create-account"
                className={`block px-4 py-2 rounded-md text-sm hover:bg-gray-800 ${isActive("/create-account") ? "bg-gray-800" : ""
                  }`}
                onClick={closeMobile}
              >
                Create Account
              </Link>
              <Link
                to="/view-accounts"
                className={`block px-4 py-2 rounded-md text-sm hover:bg-gray-800 ${isActive("/view-accounts") ? "bg-gray-800" : ""
                  }`}
                onClick={closeMobile}
              >
                View Accounts
              </Link>
            </div>
          )}

          {/* ===== INVOICES ===== */}
          <button
            onClick={() => setOpenInvoices(!openInvoices)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            <div className="flex items-center space-x-3">
              <FiFileText />
              <span>Invoices</span>
            </div>
            {openInvoices ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openInvoices && (
            <div className="ml-8 space-y-1">
              <Link
                to="/add-invoice-sales"
                className={`block px-4 py-2 rounded-md text-sm hover:bg-gray-800 ${isActive("/add-invoice-sales") ? "bg-gray-800" : ""
                  }`}
                onClick={closeMobile}
              >
                Add Sales
              </Link>
              <Link
                to="/add-invoice-purchase"
                className={`block px-4 py-2 rounded-md text-sm hover:bg-gray-800 ${isActive("/add-invoice-purchase") ? "bg-gray-800" : ""
                  }`}
                onClick={closeMobile}
              >
                Add Purchase
              </Link>
              <Link
                to="/view-sales-invoices"
                className={`block px-4 py-2 rounded-md text-sm hover:bg-gray-800 ${isActive("/view-sales-invoices") ? "bg-gray-800" : ""
                  }`}
                onClick={closeMobile}
              >
                View Sales
              </Link>
              <Link
                to="/view-purchase-invoices"
                className={`block px-4 py-2 rounded-md text-sm hover:bg-gray-800 ${isActive("/view-purchase-invoices") ? "bg-gray-800" : ""
                  }`}
                onClick={closeMobile}
              >
                View Purchase
              </Link>
            </div>
          )}

          {/* ===== GENERAL ENTRIES ===== */}
          <button
            onClick={() => setOpenGeneral(!openGeneral)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            <div className="flex items-center space-x-3">
              <FiLayers />
              <span>General Entries</span>
            </div>
            {openGeneral ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openGeneral && (
            <div className="ml-8 space-y-1">
              <Link
                to="/general-journal-entry"
                className={`block px-4 py-2 rounded-md text-sm hover:bg-gray-800 ${isActive("/general-journal-entry") ? "bg-gray-800" : ""
                  }`}
                onClick={closeMobile}
              >
                Add General Entry
              </Link>
              <Link
                to="/ledger"
                className={`block px-4 py-2 rounded-md text-sm hover:bg-gray-800 ${isActive("/ledger") ? "bg-gray-800" : ""
                  }`}
                onClick={closeMobile}
              >
                Ledger
              </Link>
              <Link
                to="/view-general-entries"
                className={`block px-4 py-2 rounded-md text-sm hover:bg-gray-800 ${isActive("/view-general-entries") ? "bg-gray-800" : ""
                  }`}
                onClick={closeMobile}
              >
                View General Entries
              </Link>
            </div>
          )}

        </nav>
      </aside>

      {/* ===== MAIN ===== */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-3">
            <button
              className="text-gray-800 md:hidden"
              onClick={toggleSidebar}
            >
              <FiMenu size={24} />
            </button>

            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="Company Logo"
                className="w-10 h-10 rounded-full border"
              />
              <h1 className="text-2xl font-semibold text-gray-800 tracking-wide">
                AL REHMAN RICE MILL
              </h1>
            </div>
          </div>

          <p className="text-gray-600 text-lg hidden sm:block">
            Welcome, <span className="font-semibold text-blue-600">Ali Raza</span>
          </p>
        </header>

        <main className="grow p-6">{children}</main>
      </div>
    </div>
  );
}
