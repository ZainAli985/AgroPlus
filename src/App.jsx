import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LoaderProvider } from './context/LoaderContext.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import React, { Suspense, lazy, Component } from 'react';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard.jsx';
import SkeletonLoader from './components/layout/SkeletonLoader.jsx';
import FloatingLauncher from './components/layout/FloatingLauncher.jsx';

// ── Google Translate + React DOM conflict fix ─────────────────────────────
// GT wraps React-rendered text nodes in <font> elements. When React then
// tries to removeChild/insertBefore those nodes from their original parent,
// it throws NotFoundError because GT has reparented them.
// Patch both methods to silently ignore the case where the node is no longer
// a direct child of `this`. This is the standard industry fix.
(function patchNodeForGoogleTranslate() {
  if (typeof Node === 'undefined') return;

  const _removeChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child && child.parentNode === this) {
      return _removeChild.call(this, child);
    }
    // GT reparented this node — silently ignore, return the child as spec allows
    return child;
  };

  const _insertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, ref) {
    if (ref && ref.parentNode !== this) {
      // ref has been reparented by GT — append instead of crashing
      return this.appendChild(newNode);
    }
    return _insertBefore.call(this, newNode, ref);
  };
})();

// ── Lazy-loaded pages ──────────────────────────────────────────────────────
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
const CreateChequeBook     = lazy(() => import('./components/chequebook/CreateChequeBook'));
const CreateChequeEntry    = lazy(() => import('./components/chequebook/CreateChequeEntry'));
const ViewChequeBooks      = lazy(() => import('./components/chequebook/ViewChequeBooks'));
const AdminProfile         = lazy(() => import('./components/profile/Adminprofile.jsx'));
const StockManagement      = lazy(() => import('./components/stock/Stockmanagement.jsx'));

// ── Error Boundary — catches chunk-load failures + React render errors ─────
class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, isChunkError: false };
  }

  static getDerivedStateFromError(error) {
    const msg  = error?.message || '';
    const name = error?.name    || '';

    // Google Translate DOM errors — the Node patch should stop these, but if
    // one slips through, treat as transient (auto-reload) not a real crash.
    const isGTDom =
      name === 'NotFoundError' ||
      msg.includes('removeChild') ||
      msg.includes('insertBefore') ||
      msg.includes('is not a child of this node');

    const isChunk =
      name === 'ChunkLoadError' ||
      msg.includes('Failed to fetch dynamically imported module') ||
      msg.includes('Loading chunk') ||
      msg.includes('dynamically imported module');

    // Transient errors: auto-reload, never show error UI
    if (isGTDom || isChunk) {
      const reloadKey = 'agro-error-reload';
      const last = Number(sessionStorage.getItem(reloadKey) || 0);
      if (Date.now() - last > 15000) {
        sessionStorage.setItem(reloadKey, String(Date.now()));
        window.location.reload();
      }
    }

    return { hasError: !isGTDom, isChunkError: isChunk };
  }

  componentDidCatch(error) {
    const msg  = error?.message || '';
    const name = error?.name    || '';

    const isGTDom =
      name === 'NotFoundError' ||
      msg.includes('removeChild') ||
      msg.includes('insertBefore') ||
      msg.includes('is not a child of this node');

    const isChunk =
      name === 'ChunkLoadError' ||
      msg.includes('Failed to fetch dynamically imported module') ||
      msg.includes('Loading chunk') ||
      msg.includes('dynamically imported module');

    const isTransient = isGTDom || isChunk ||
      msg.includes('aborted') ||
      msg.includes('NetworkError') ||
      msg.includes('Load failed') ||
      msg.includes('Failed to fetch');

    if (isTransient) {
      const reloadKey = 'agro-error-reload';
      const last = Number(sessionStorage.getItem(reloadKey) || 0);
      if (Date.now() - last > 15000) {
        sessionStorage.setItem(reloadKey, String(Date.now()));
        window.location.reload();
      }
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: '#f9fafb', fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ textAlign: 'center', maxWidth: 360, padding: '0 24px' }}>
          <div style={{ fontSize: 40, marginBottom: 14 }}>⚠️</div>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
            {this.state.isChunkError ? 'Page failed to load' : 'Something went wrong'}
          </h2>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 22, lineHeight: 1.6 }}>
            {this.state.isChunkError
              ? 'A network issue prevented this page from loading. Check your connection and try again.'
              : 'An unexpected error occurred. Reloading usually fixes this.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 28px', borderRadius: 8, border: 'none',
              background: '#111827', color: '#fff', fontSize: 13.5,
              fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            }}>
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}

// ── Loading skeleton for slow chunks ──────────────────────────────────────
function PageLoader() {
  return <SkeletonLoader />;
}

// ── FloatingLauncher — hidden on master portal ─────────────────────────────
function ClientFloatingLauncher() {
  const location = useLocation();
  if (location.pathname.startsWith('/master')) return null;
  return <FloatingLauncher />;
}

// ── Catch-all: go back or redirect ────────────────────────────────────────
function CatchAll() {
  const token = localStorage.getItem('token');
  if (window.history.length > 1) { window.history.back(); return null; }
  return <Navigate to={token ? '/dashboard' : '/'} replace />;
}

// ── App ────────────────────────────────────────────────────────────────────
function App() {
  return (
    <AppErrorBoundary>
      <LoaderProvider>
        <BrowserRouter>
          <ClientFloatingLauncher />
          <AppErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* ── Public ── */}
                <Route path="/"       element={<Login />} />
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
                <Route path="/cheque-book/create"     element={<ProtectedRoute><CreateChequeBook /></ProtectedRoute>} />
                <Route path="/cheque-book/entry"      element={<ProtectedRoute><CreateChequeEntry /></ProtectedRoute>} />
                <Route path="/cheque-book/view"       element={<ProtectedRoute><ViewChequeBooks /></ProtectedRoute>} />
                <Route path="/stock"                  element={<ProtectedRoute><StockManagement /></ProtectedRoute>} />
                <Route path="/profile"                element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />

                {/* ── Catch-all ── */}
                <Route path="*" element={<CatchAll />} />
              </Routes>
            </Suspense>
          </AppErrorBoundary>
        </BrowserRouter>
      </LoaderProvider>
    </AppErrorBoundary>
  );
}

export default App;