import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoaderProvider } from './context/LoaderContext.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import React, { Suspense, lazy } from 'react';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard.jsx';
import SkeletonLoader from './components/layout/SkeletonLoader.jsx';
import FloatingLauncher from './components/layout/FloatingLauncher.jsx';

const MasterPortal         = lazy(() => import('./components/master/Masterportal.jsx'));
const CreateAccount        = lazy(() => import('./components/accounts/CreateAccount'));
const ViewAccounts         = lazy(() => import('./components/accounts/ViewAccounts'));
const GeneralJournalEntry  = lazy(() => import('./components/general-entries/GeneralJournalEntry'));
const ViewGeneralEntries   = lazy(() => import('./components/general-entries/ViewGeneralEntries'));
const InvoiceDashboard     = lazy(() => import('./components/invoices/InoviceDashboard'));
const SalesInvoice         = lazy(() => import('./components/invoices/SalesInvoice.jsx'));
const PurchaseInvoiceForm  = lazy(() => import('./components/invoices/PurchaseInvoiceForm.jsx'));
const ViewSalesInvoices    = lazy(() => import('./components/invoices/ViewSalesInvoices.jsx'));
const ViewPurchaseInvoices = lazy(() => import('./components/invoices/ViewPurchaseInvoices.jsx'));
const AccountsPage         = lazy(() => import('./components/accounts/AccountsPage.jsx'));
const LedgerSearch         = lazy(() => import('./components/Ledger/LedgerSearch.jsx'));
const LedgerByReference    = lazy(() => import('./components/Ledger/LedgerByReference.jsx'));
const LedgerByAccount      = lazy(() => import('./components/Ledger/LedgerByAccount.jsx'));
const AddProduct           = lazy(() => import('./components/Products/AddProduct.jsx'));
const ProductsList         = lazy(() => import('./components/Products/ProductsList.jsx'));
const BalanceSheet         = lazy(() => import('./components/reports/BalanceSheet.jsx'));
const TrialBalance         = lazy(() => import('./components/reports/TrialBalance.jsx'));
const IncomeStatement      = lazy(() => import('./components/reports/IncomeStatement.jsx'));
const CreateEmployee       = lazy(() => import('./components/employees/CreateEmployee.jsx'));
const ViewEmployees        = lazy(() => import('./components/employees/ViewEmployees.jsx'));
const WeightBridgeForm     = lazy(() => import('./components/WeightBridge/WeightBridge.jsx'));
const WeightBridgeReport   = lazy(() => import('./components/reports/WeightBridgeInvoice.jsx'));
const CashbookForm         = lazy(() => import('./components/Cashbook/CashbookForm.jsx'));
const DailyCashbook        = lazy(() => import('./components/Cashbook/CashbookReport.jsx'));
const AdminProfile         = lazy(() => import('./components/profile/Adminprofile.jsx'));

/* ─── Catch-all redirect ─────────────────────────────────────────────────── */
// Unknown route → go back to wherever the user already was (history -1).
// If there's no history (fresh tab with a bad URL), fall back to / or /dashboard.
function CatchAll() {
  const token = localStorage.getItem("token");
  if (window.history.length > 1) {
    window.history.back();
    return null;
  }
  return <Navigate to={token ? "/dashboard" : "/"} replace />;
}

function App() {
  return (
    <LoaderProvider>
      <BrowserRouter>
        <FloatingLauncher />
        <Suspense fallback={<SkeletonLoader />}>
          <Routes>
            {/* ── Public ── */}
            <Route path="/" element={<Login />} />
            <Route path="/master" element={<MasterPortal />} />

            {/* ── Protected ── */}
            <Route path="/dashboard"              element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/create-account"         element={<ProtectedRoute><CreateAccount /></ProtectedRoute>} />
            <Route path="/view-accounts"          element={<ProtectedRoute><ViewAccounts /></ProtectedRoute>} />
            <Route path="/ledger"                 element={<ProtectedRoute><LedgerSearch /></ProtectedRoute>} />
            <Route path="/ledger/account/:accountId" element={<ProtectedRoute><LedgerByAccount /></ProtectedRoute>} />
            <Route path="/ledger/ref/:ref"        element={<ProtectedRoute><LedgerByReference /></ProtectedRoute>} />
            <Route path="/general-entries"        element={<ProtectedRoute><GeneralJournalEntry /></ProtectedRoute>} />
            <Route path="/general-journal-entry"  element={<ProtectedRoute><GeneralJournalEntry /></ProtectedRoute>} />
            <Route path="/view-general-entries"   element={<ProtectedRoute><ViewGeneralEntries /></ProtectedRoute>} />
            <Route path="/add-invoice"            element={<ProtectedRoute><InvoiceDashboard /></ProtectedRoute>} />
            <Route path="/add-invoice-sales"      element={<ProtectedRoute><SalesInvoice /></ProtectedRoute>} />
            <Route path="/view-sales-invoices"    element={<ProtectedRoute><ViewSalesInvoices /></ProtectedRoute>} />
            <Route path="/add-invoice-purchase"   element={<ProtectedRoute><PurchaseInvoiceForm /></ProtectedRoute>} />
            <Route path="/view-purchase-invoices" element={<ProtectedRoute><ViewPurchaseInvoices /></ProtectedRoute>} />
            <Route path="/accounts/*"             element={<ProtectedRoute><AccountsPage /></ProtectedRoute>} />
            <Route path="/products/new"           element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
            <Route path="/products"               element={<ProtectedRoute><ProductsList /></ProtectedRoute>} />
            <Route path="/balancesheet"           element={<ProtectedRoute><BalanceSheet /></ProtectedRoute>} />
            <Route path="/trialbalance"           element={<ProtectedRoute><TrialBalance /></ProtectedRoute>} />
            <Route path="/incomestatement"        element={<ProtectedRoute><IncomeStatement /></ProtectedRoute>} />
            <Route path="/employees/new"          element={<ProtectedRoute><CreateEmployee /></ProtectedRoute>} />
            <Route path="/employees"              element={<ProtectedRoute><ViewEmployees /></ProtectedRoute>} />
            <Route path="/weight-bridge"          element={<ProtectedRoute><WeightBridgeForm /></ProtectedRoute>} />
            <Route path="/weight-bridge/invoices" element={<ProtectedRoute><WeightBridgeReport /></ProtectedRoute>} />
            <Route path="/cashbook"               element={<ProtectedRoute><CashbookForm /></ProtectedRoute>} />
            <Route path="/cashbook-report"        element={<ProtectedRoute><DailyCashbook /></ProtectedRoute>} />
            <Route path="/profile"               element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />

            {/* ── Catch-all: unknown routes ── */}
            <Route path="*" element={<CatchAll />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LoaderProvider>
  );
}

export default App;