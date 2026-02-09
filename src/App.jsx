import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoaderProvider } from './context/LoaderContext.jsx';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import CreateAccount from './components/accounts/CreateAccount';
import ViewAccounts from './components/accounts/ViewAccounts';
import GeneralJournalEntry from './components/general-entries/GeneralJournalEntry';
import ViewGeneralEntries from './components/general-entries/ViewGeneralEntries';
import ViewSalesInvoices from './components/invoices/ViewSalesInvoices';
import InvoiceDashboard from './components/invoices/InoviceDashboard';
import SalesInvoice from './components/invoices/SalesInvoice.jsx';
import PurchaseInvoiceForm from './components/invoices/PurchaseInvoiceForm.jsx';
import ViewPurchaseInvoices from './components/invoices/ViewPurchaseInvoices.jsx';
import AccountsPage from './components/accounts/AccountsPage.jsx';
import LedgerSearch from './components/Ledger/LedgerSearch.jsx';
import LedgerByReference from './components/Ledger/LedgerByReference.jsx';
import LedgerByAccount from './components/Ledger/LedgerByAccount.jsx';
import AddProduct from './components/Products/AddProduct.jsx';
import ProductsList from './components/Products/ProductsList.jsx';
import BalanceSheet from './components/reports/BalanceSheet.jsx';
import TrialBalance from './components/reports/TrialBalance.jsx';
import IncomeStatement from './components/reports/IncomeStatement.jsx';

function App() {
  return (
    <LoaderProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create-account' element={<CreateAccount />} />
          <Route path='/view-accounts' element={<ViewAccounts />} />
          <Route path='/ledger' element={<LedgerSearch />} />
          <Route path="/ledger/account/:accountId" element={<LedgerByAccount />} />
          <Route path="/ledger/ref/:ref" element={<LedgerByReference />} />
          <Route path='/general-entries' element={<GeneralJournalEntry />} />
          <Route path='/general-journal-entry' element={<GeneralJournalEntry />} />
          <Route path='/view-general-entries' element={<ViewGeneralEntries />} />
          <Route path='/add-invoice' element={<InvoiceDashboard />} />
          <Route path='/add-invoice-sales' element={<SalesInvoice />} />
          <Route path='/view-sales-invoices' element={<ViewSalesInvoices />} />
          <Route path='/add-invoice-purchase' element={<PurchaseInvoiceForm />} />
          <Route path='/view-purchase-invoices' element={<ViewPurchaseInvoices />} />
          <Route path="/accounts/*" element={<AccountsPage />} />
          <Route path="/products/new" element={<AddProduct />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/balancesheet" element={<BalanceSheet />} />
          <Route path="/trialbalance" element={<TrialBalance />} />
          <Route path="/incomestatement" element={<IncomeStatement />} />
          

        </Routes>
      </BrowserRouter>
    </LoaderProvider>
  )
}

export default App
