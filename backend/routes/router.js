// routes/router.js
import express from "express";
import multer  from "multer";

import { protect, protectMaster }           from "../middlewares/protect.js";
import { login }                             from "../controllers/auth.js";
import { registerMill, submitPaymentProof }  from "../controllers/Registrationcontroller.js";

import {
  getAllMills, getMillDetails, approveMill, restrictMill,
  unrestrictMill, deleteMill, updateBillingDate, sendBillingReminders,
  createMillByMaster, recordPayment,
  getSupportRequests, updateSupportRequest,
} from "../controllers/masterPortalController.js";

import { createAccount, getAccounts, updateAccount, deleteAccount, getAccountOptions, toggleStarAccount, ensureDefaultAccounts }
  from "../controllers/accountController.js";

import {
  createGeneralEntry, getGeneralEntries,
  updateGeneralEntry, deleteGeneralEntry, bulkUploadJournalEntries,
} from "../controllers/generalJournalController.js";

import { getDailyCashbook, getCashbookReport, createCashbookEntry }
  from "../controllers/cashbookController.js";

import { seedProducts, getProducts, activateProduct }
  from "../controllers/productController.js";

import {
  createPurchaseInvoice, getAllPurchaseInvoices, getPurchaseInvoiceById,
  updatePurchaseInvoice, deletePurchaseInvoice,
  getNextInvoiceNumber,
} from "../controllers/purchaseInvoiceController.js";

import {
  createQuotation,
  getAllQuotations,
  getQuotationById,
  deleteQuotation,
  getNextQuotationSr,
} from "../controllers/purchaseQuotationController.js";

import {
  createSalesInvoice, getAllSalesInvoices, getSalesInvoiceById,
  updateSalesInvoice, deleteSalesInvoice, getNextSalesInvoiceNumber,
} from "../controllers/salesInvoiceController.js";

import {
  createWeightBridgeFirst, updateWeightBridgeSecond,
  getWeightBridgeByCode, getWeightBridgeEntries,
} from "../controllers/weightBridgeController.js";

import { createEmployee, getEmployees, updateEmployee, deleteEmployee, toggleEmployeeStatus }
  from "../controllers/employeeController.js";

import { getLedger, getLedgerByAccount, getLedgerByReference, getReferences }
  from "../controllers/ledgerController.js";

import { getBalanceSheet, getTrialBalance, getIncomeStatement }
  from "../controllers/reportsController.js";
import { getStockEntries } from "../controllers/stockcontroller.js";

// ⚠ Filename is "Profilecontroller.js" — matches your actual file on disk
import {
  createChequeBook, getChequeBooks, getNextChequeNo, updateChequeBook,
  createChequeEntry, getChequeEntries, updateChequeStatus,
} from "../controllers/chequebookcontroller.js";

import {
  getProfile, updateProfile, changePassword, updateProfileLogo,
  getVehicles, addVehicle, updateVehicle, deleteVehicle,
  getSeasons, getActiveSeason, addSeason, activateSeason, updateSeason, deleteSeason,
  getSeasonArchives,
  getPaymentHistory,
  submitComplaint, getComplaints,
  getBagTypes, addBagType, updateBagType, deleteBagType,
  getMillSettings, updateMillSettings,
} from "../controllers/Profilecontroller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename:    (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// createMillByMaster: logo (1) + doc_0…doc_19 (up to 20 docs)
const millDocFields = [
  { name: "logo", maxCount: 1 },
  ...Array.from({ length: 20 }, (_, i) => ({ name: `doc_${i}`, maxCount: 1 })),
];
const uploadMillDocs = upload.fields(millDocFields);

// ── Public ────────────────────────────────────────────────────────────────────
router.post("/login",                   upload.none(),               login);
router.post("/register",                upload.single("logo"),       registerMill);
router.post("/register/payment-proof",  upload.single("screenshot"), submitPaymentProof);

// ── Master Portal ─────────────────────────────────────────────────────────────
router.get   ("/master/mills",                       protectMaster, getAllMills);
router.get   ("/master/mills/:millId",               protectMaster, getMillDetails);
router.post  ("/master/mills/:millId/approve",       protectMaster, approveMill);
router.post  ("/master/mills/:millId/restrict",      protectMaster, restrictMill);
router.post  ("/master/mills/:millId/unrestrict",    protectMaster, unrestrictMill);
router.delete("/master/mills/:millId",               protectMaster, deleteMill);
router.post  ("/master/mills/:millId/billing-date",  protectMaster, updateBillingDate);
router.post  ("/master/send-reminders",              protectMaster, sendBillingReminders);
router.post  ("/master/mills",                       protectMaster, uploadMillDocs, createMillByMaster);
router.post  ("/master/mills/:millId/record-payment",protectMaster, recordPayment);
router.get   ("/master/support",                     protectMaster, getSupportRequests);
router.put   ("/master/support/:requestId",          protectMaster, updateSupportRequest);

// ── Admin Profile ─────────────────────────────────────────────────────────────
router.get ("/profile",              protect, getProfile);
router.put ("/profile",              protect, updateProfile);
router.put ("/profile/logo",         protect, upload.single("logo"), updateProfileLogo);
router.put ("/profile/password",     protect, changePassword);

// Vehicles
router.get   ("/profile/vehicles",       protect, getVehicles);
router.post  ("/profile/vehicles",       protect, addVehicle);
router.put   ("/profile/vehicles/:id",   protect, updateVehicle);
router.delete("/profile/vehicles/:id",   protect, deleteVehicle);

// Seasons — static routes MUST come before /:id to avoid Express matching "archives"/"active" as an id
router.get   ("/profile/seasons",                protect, getSeasons);
router.get   ("/profile/seasons/archives",       protect, getSeasonArchives);   // ← static, must be before /:id
router.get   ("/profile/seasons/active",         protect, getActiveSeason);     // ← static, must be before /:id
router.post  ("/profile/seasons",                protect, addSeason);
router.post  ("/profile/seasons/:id/activate",   protect, activateSeason);
router.put   ("/profile/seasons/:id",            protect, updateSeason);
router.delete("/profile/seasons/:id",            protect, deleteSeason);

// Payments & support
router.get ("/profile/payments",     protect, getPaymentHistory);
router.get ("/profile/complaints",   protect, getComplaints);
router.post("/profile/complaint",    protect, submitComplaint);

// ── Accounts ──────────────────────────────────────────────────────────────────
router.post  ("/accounts",       protect, createAccount);
router.get   ("/accounts",       protect, getAccounts);
router.put   ("/accounts/:id",   protect, updateAccount);
router.delete("/accounts/:id",   protect, deleteAccount);
// Frontend alias
router.post  ("/create-account", protect, createAccount);

// ── General Journal ───────────────────────────────────────────────────────────
router.post  ("/journal",             protect, createGeneralEntry);
router.get   ("/journal",             protect, getGeneralEntries);
router.put   ("/journal/:id",         protect, updateGeneralEntry);
router.delete("/journal/:id",         protect, deleteGeneralEntry);
router.post  ("/journal/bulk-upload", protect, upload.single("file"), bulkUploadJournalEntries);

// ── Cashbook ──────────────────────────────────────────────────────────────────
router.get ("/cashbook",           protect, getDailyCashbook);
router.get ("/cashbook-daily",     protect, getDailyCashbook);   // alias for DailyCashbook page
router.get ("/cashbook/report",    protect, getCashbookReport);
router.get ("/cashbook-report",    protect, getCashbookReport);  // alias
router.post("/cashbook-entry",     protect, createCashbookEntry);

// ── Products (hardcoded catalogue; users only activate/deactivate) ────────────
// IMPORTANT: static routes (/seed) MUST come before param routes (/:id/...)
router.post ("/products/seed",           protect, seedProducts);       // static — must be first
router.get  ("/products",                protect, getProducts);
router.patch("/products/:id/activate",   protect, activateProduct);

// ── Purchase Invoices ─────────────────────────────────────────────────────────
router.post  ("/purchase-invoices",      protect, createPurchaseInvoice);
router.get   ("/purchase-invoices",      protect, getAllPurchaseInvoices);
router.get   ("/purchase-invoice",       protect, getAllPurchaseInvoices);  // alias
router.get   ("/purchase-invoices/:id",  protect, getPurchaseInvoiceById);
router.put   ("/purchase-invoices/:id",  protect, updatePurchaseInvoice);
router.delete("/purchase-invoices/:id",  protect, deletePurchaseInvoice);

// ── Sales Invoices ────────────────────────────────────────────────────────────
router.get   ("/sales-invoice/next-sr",protect, getNextSalesInvoiceNumber);
router.post  ("/sales-invoices",      protect, createSalesInvoice);
router.get   ("/sales-invoices",      protect, getAllSalesInvoices);
router.get   ("/sales-invoice",       protect, getAllSalesInvoices);  // alias
router.get   ("/sales-invoices/:id",  protect, getSalesInvoiceById);
router.put   ("/sales-invoices/:id",  protect, updateSalesInvoice);
router.delete("/sales-invoices/:id",  protect, deleteSalesInvoice);

// ── Weight Bridge ─────────────────────────────────────────────────────────────
router.get ("/weight-bridge",               protect, getWeightBridgeEntries);
router.post("/weight-bridge/first",         protect, createWeightBridgeFirst);
router.put ("/weight-bridge/second",        protect, updateWeightBridgeSecond);
router.get ("/weight-bridge/:invoiceCode",  protect, getWeightBridgeByCode);

// ── Employees ─────────────────────────────────────────────────────────────────
router.get   ("/employees",      protect, getEmployees);
router.post  ("/employees",      protect, upload.array("documents", 10), createEmployee);
router.put   ("/employees/:id",  protect, upload.none(), updateEmployee);
router.delete("/employees/:id",  protect, deleteEmployee);

// ── Ledger ────────────────────────────────────────────────────────────────────
router.get("/ledger",                    protect, getLedger);
router.get("/ledger/account/:accountId", protect, getLedgerByAccount);
router.get("/ledger/ref/:ref",           protect, getLedgerByReference);
router.get("/ledger/references",         protect, getReferences);

// ── Stock Management ─────────────────────────────────────────────────────────────
router.get("/stock/entries", protect, getStockEntries);

// ── Reports ───────────────────────────────────────────────────────────────────
router.get("/reports/balance-sheet",    protect, getBalanceSheet);
router.get("/reports/trial-balance",    protect, getTrialBalance);
router.get("/reports/income-statement", protect, getIncomeStatement);

// ─── FRONTEND COMPATIBILITY ALIASES ──────────────────────────────────────────
// Map alternate frontend call paths to canonical handlers

// Journal
router.post  ("/create-journal-entry",        protect, createGeneralEntry);
router.get   ("/get-journal-entries",         protect, getGeneralEntries);
router.delete("/delete-journal-entry/:id",    protect, deleteGeneralEntry);
router.put   ("/update-journal-entry/:id",    protect, updateGeneralEntry);
router.post  ("/bulk-upload-journal-entries", protect, upload.single("file"), bulkUploadJournalEntries);

// Accounts
router.get   ("/account-options",     protect, getAccountOptions);
router.delete("/delete-account/:id",  protect, deleteAccount);
router.put   ("/update-account/:id",  protect, updateAccount);
router.patch ("/accounts/:id/star",   protect, toggleStarAccount);
router.post  ("/setup-default-accounts", protect, ensureDefaultAccounts);

// Products & Invoices
router.post  ("/purchase-invoice/create",  protect, createPurchaseInvoice);
router.get   ("/purchase-invoice/next-sr", protect, getNextInvoiceNumber);

// ── Purchase Quotations ───────────────────────────────────────────────────────
// `protect` is required — sets req.millId from JWT.
// `next-sr` MUST be before `/:id` to prevent Express treating it as an id param.
router.get   ("/purchase-quotation/next-sr", protect, getNextQuotationSr);
router.post  ("/purchase-quotation/create",  protect, createQuotation);
router.get   ("/purchase-quotation",          protect, getAllQuotations);
router.get   ("/purchase-quotation/:id",      protect, getQuotationById);
router.delete("/purchase-quotation/:id",      protect, deleteQuotation);
router.post  ("/sales-invoice/create",     protect, createSalesInvoice);
router.get   ("/references",               protect, getReferences);

// Employees
router.patch ("/employees/:id/toggle", protect, toggleEmployeeStatus);

// Reports
router.get   ("/balance-sheet",    protect, getBalanceSheet);
router.get   ("/trial-balance",    protect, getTrialBalance);
router.get   ("/incomestatement",  protect, getIncomeStatement);

// ── Bag Types ─────────────────────────────────────────────────────────────────
router.get   ("/profile/bag-types",       protect, getBagTypes);
router.post  ("/profile/bag-types",       protect, addBagType);
router.put   ("/profile/bag-types/:id",   protect, updateBagType);
router.delete("/profile/bag-types/:id",   protect, deleteBagType);

// ── Mill Settings ─────────────────────────────────────────────────────────────
router.get("/profile/mill-settings",      protect, getMillSettings);
router.put("/profile/mill-settings",      protect, updateMillSettings);

// ── Cheque Book ───────────────────────────────────────────────────────────────
router.post ("/cheque-books",                    protect, createChequeBook);
router.get  ("/cheque-books",                    protect, getChequeBooks);
router.put  ("/cheque-books/:id",                 protect, updateChequeBook);
router.get  ("/cheque-books/:id/next-cheque-no", protect, getNextChequeNo);
router.post ("/cheque-entries",                  protect, createChequeEntry);
router.get  ("/cheque-entries",                  protect, getChequeEntries);
router.patch("/cheque-entries/:id/status",       protect, updateChequeStatus);

export default router;
