// routes/router.js
import express from "express";
import { protect, protectMaster } from "../middlewares/protect.js";
import { login }                   from "../controllers/auth.js";
import { registerMill, submitPaymentProof } from "../controllers/Registrationcontroller.js";

// ── Upload middleware (memory storage — no disk writes) ───────────────────────
import {
  uploadImage, uploadDoc, uploadMultiDocs, uploadMillDocs,
} from "../middlewares/upload.js";

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
  updatePurchaseInvoice, deletePurchaseInvoice, getNextInvoiceNumber,
} from "../controllers/purchaseInvoiceController.js";

import {
  createSalesInvoice, getAllSalesInvoices, getSalesInvoiceById,
  updateSalesInvoice, deleteSalesInvoice, getNextSalesInvoiceNumber,
} from "../controllers/salesInvoiceController.js";

import {
  createWeightBridgeFirst, updateWeightBridgeSecond,
  getWeightBridgeByCode, getWeightBridgeEntries,
} from "../controllers/weightBridgeController.js";

import {
  createEmployee, getEmployees, updateEmployee, deleteEmployee, toggleEmployeeStatus,
} from "../controllers/employeeController.js";

import { getLedger, getLedgerByAccount, getLedgerByReference, getReferences }
  from "../controllers/ledgerController.js";

import { getBalanceSheet, getTrialBalance, getIncomeStatement }
  from "../controllers/reportsController.js";

import { getStockEntries } from "../controllers/stockcontroller.js";

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

// ── Public ────────────────────────────────────────────────────────────────────
router.post("/login",                   uploadImage.none(),                  login);
router.post("/register",                uploadImage.single("logo"),          registerMill);
router.post("/register/payment-proof",  uploadImage.single("screenshot"),    submitPaymentProof);

// ── Master Portal ─────────────────────────────────────────────────────────────
router.get   ("/master/mills",                        protectMaster, getAllMills);
router.get   ("/master/mills/:millId",                protectMaster, getMillDetails);
router.post  ("/master/mills/:millId/approve",        protectMaster, approveMill);
router.post  ("/master/mills/:millId/restrict",       protectMaster, restrictMill);
router.post  ("/master/mills/:millId/unrestrict",     protectMaster, unrestrictMill);
router.delete("/master/mills/:millId",                protectMaster, deleteMill);
router.post  ("/master/mills/:millId/billing-date",   protectMaster, updateBillingDate);
router.post  ("/master/send-reminders",               protectMaster, sendBillingReminders);
router.post  ("/master/mills",                        protectMaster, uploadMillDocs, createMillByMaster);
router.post  ("/master/mills/:millId/record-payment", protectMaster, uploadImage.none(), recordPayment);
router.get   ("/master/support",                      protectMaster, getSupportRequests);
router.put   ("/master/support/:requestId",           protectMaster, updateSupportRequest);

// ── Admin Profile ─────────────────────────────────────────────────────────────
router.get ("/profile",          protect, getProfile);
router.put ("/profile",          protect, uploadImage.none(), updateProfile);
router.put ("/profile/logo",     protect, uploadImage.single("logo"), updateProfileLogo);
router.put ("/profile/password", protect, uploadImage.none(), changePassword);

// Vehicles
router.get   ("/profile/vehicles",      protect, getVehicles);
router.post  ("/profile/vehicles",      protect, uploadImage.none(), addVehicle);
router.put   ("/profile/vehicles/:id",  protect, uploadImage.none(), updateVehicle);
router.delete("/profile/vehicles/:id",  protect, deleteVehicle);

// Seasons (static routes before /:id)
router.get   ("/profile/seasons",                protect, getSeasons);
router.get   ("/profile/seasons/archives",       protect, getSeasonArchives);
router.get   ("/profile/seasons/active",         protect, getActiveSeason);
router.post  ("/profile/seasons",                protect, uploadImage.none(), addSeason);
router.post  ("/profile/seasons/:id/activate",   protect, activateSeason);
router.put   ("/profile/seasons/:id",            protect, uploadImage.none(), updateSeason);
router.delete("/profile/seasons/:id",            protect, deleteSeason);

// Payments & support
router.get ("/profile/payments",    protect, getPaymentHistory);
router.get ("/profile/complaints",  protect, getComplaints);
router.post("/profile/complaint",   protect, uploadImage.none(), submitComplaint);

// Bag Types
router.get   ("/profile/bag-types",      protect, getBagTypes);
router.post  ("/profile/bag-types",      protect, uploadImage.none(), addBagType);
router.put   ("/profile/bag-types/:id",  protect, uploadImage.none(), updateBagType);
router.delete("/profile/bag-types/:id",  protect, deleteBagType);

// Mill Settings
router.get("/profile/mill-settings",  protect, getMillSettings);
router.put("/profile/mill-settings",  protect, uploadImage.none(), updateMillSettings);

// ── Accounts ──────────────────────────────────────────────────────────────────
router.post  ("/accounts",       protect, createAccount);
router.get   ("/accounts",       protect, getAccounts);
router.put   ("/accounts/:id",   protect, updateAccount);
router.delete("/accounts/:id",   protect, deleteAccount);
router.post  ("/create-account", protect, createAccount);

// ── General Journal ───────────────────────────────────────────────────────────
router.post  ("/journal",             protect, createGeneralEntry);
router.get   ("/journal",             protect, getGeneralEntries);
router.put   ("/journal/:id",         protect, updateGeneralEntry);
router.delete("/journal/:id",         protect, deleteGeneralEntry);
router.post  ("/journal/bulk-upload", protect, uploadDoc.single("file"), bulkUploadJournalEntries);

// ── Cashbook ──────────────────────────────────────────────────────────────────
router.get ("/cashbook",        protect, getDailyCashbook);
router.get ("/cashbook-daily",  protect, getDailyCashbook);
router.get ("/cashbook/report", protect, getCashbookReport);
router.get ("/cashbook-report", protect, getCashbookReport);
router.post("/cashbook-entry",  protect, createCashbookEntry);

// ── Products ──────────────────────────────────────────────────────────────────
router.post  ("/products/seed",          protect, seedProducts);
router.get   ("/products",               protect, getProducts);
router.patch ("/products/:id/activate",  protect, activateProduct);

// ── Purchase Invoices ─────────────────────────────────────────────────────────
router.post  ("/purchase-invoices",      protect, createPurchaseInvoice);
router.get   ("/purchase-invoices",      protect, getAllPurchaseInvoices);
router.get   ("/purchase-invoice",       protect, getAllPurchaseInvoices);
router.get   ("/purchase-invoices/:id",  protect, getPurchaseInvoiceById);
router.put   ("/purchase-invoices/:id",  protect, updatePurchaseInvoice);
router.delete("/purchase-invoices/:id",  protect, deletePurchaseInvoice);

// ── Sales Invoices ────────────────────────────────────────────────────────────
router.get   ("/sales-invoice/next-sr", protect, getNextSalesInvoiceNumber);
router.post  ("/sales-invoices",        protect, createSalesInvoice);
router.get   ("/sales-invoices",        protect, getAllSalesInvoices);
router.get   ("/sales-invoice",         protect, getAllSalesInvoices);
router.get   ("/sales-invoices/:id",    protect, getSalesInvoiceById);
router.put   ("/sales-invoices/:id",    protect, updateSalesInvoice);
router.delete("/sales-invoices/:id",    protect, deleteSalesInvoice);

// ── Weight Bridge ─────────────────────────────────────────────────────────────
router.get ("/weight-bridge",               protect, getWeightBridgeEntries);
router.post("/weight-bridge/first",         protect, createWeightBridgeFirst);
router.put ("/weight-bridge/second",        protect, updateWeightBridgeSecond);
router.get ("/weight-bridge/:invoiceCode",  protect, getWeightBridgeByCode);

// ── Employees ─────────────────────────────────────────────────────────────────
router.get   ("/employees",      protect, getEmployees);
router.post  ("/employees",      protect, uploadMultiDocs.array("documents", 10), createEmployee);
router.put   ("/employees/:id",  protect, uploadImage.none(), updateEmployee);
router.delete("/employees/:id",  protect, deleteEmployee);
router.patch ("/employees/:id/toggle", protect, toggleEmployeeStatus);

// ── Ledger ────────────────────────────────────────────────────────────────────
router.get("/ledger",                    protect, getLedger);
router.get("/ledger/account/:accountId", protect, getLedgerByAccount);
router.get("/ledger/ref/:ref",           protect, getLedgerByReference);
router.get("/ledger/references",         protect, getReferences);

// ── Stock ─────────────────────────────────────────────────────────────────────
router.get("/stock/entries", protect, getStockEntries);

// ── Reports ───────────────────────────────────────────────────────────────────
router.get("/reports/balance-sheet",    protect, getBalanceSheet);
router.get("/reports/trial-balance",    protect, getTrialBalance);
router.get("/reports/income-statement", protect, getIncomeStatement);

// ── Cheque Book ───────────────────────────────────────────────────────────────
router.post ("/cheque-books",                     protect, createChequeBook);
router.get  ("/cheque-books",                     protect, getChequeBooks);
router.put  ("/cheque-books/:id",                 protect, updateChequeBook);
router.get  ("/cheque-books/:id/next-cheque-no",  protect, getNextChequeNo);
router.post ("/cheque-entries",                   protect, createChequeEntry);
router.get  ("/cheque-entries",                   protect, getChequeEntries);
router.patch("/cheque-entries/:id/status",        protect, updateChequeStatus);

// ── Frontend compatibility aliases ───────────────────────────────────────────
router.post  ("/create-journal-entry",        protect, createGeneralEntry);
router.get   ("/get-journal-entries",         protect, getGeneralEntries);
router.delete("/delete-journal-entry/:id",    protect, deleteGeneralEntry);
router.put   ("/update-journal-entry/:id",    protect, updateGeneralEntry);
router.post  ("/bulk-upload-journal-entries", protect, uploadDoc.single("file"), bulkUploadJournalEntries);
router.get   ("/account-options",             protect, getAccountOptions);
router.delete("/delete-account/:id",          protect, deleteAccount);
router.put   ("/update-account/:id",          protect, updateAccount);
router.patch ("/accounts/:id/star",           protect, toggleStarAccount);
router.post  ("/setup-default-accounts",      protect, ensureDefaultAccounts);
router.post  ("/purchase-invoice/create",     protect, createPurchaseInvoice);
router.get   ("/purchase-invoice/next-sr",    protect, getNextInvoiceNumber);
router.post  ("/sales-invoice/create",        protect, createSalesInvoice);
router.get   ("/references",                  protect, getReferences);
router.get   ("/balance-sheet",               protect, getBalanceSheet);
router.get   ("/trial-balance",               protect, getTrialBalance);
router.get   ("/incomestatement",             protect, getIncomeStatement);

export default router;