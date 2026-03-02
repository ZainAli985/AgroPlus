import express from "express";
import { login } from "../controllers/auth.js";
import upload from "../middlewares/uploadMiddleware.js";
import { protect, authorizeRoles } from "../middlewares/protect.js";

import {
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
  getAccountOptions,
  toggleStarAccount,
} from "../controllers/accounts.js";

import {
  bulkUploadJournalEntries,
  createGeneralEntry,
  deleteGeneralEntry,
  getGeneralEntries,
  updateGeneralEntry,
} from "../controllers/generalJournalController.js";

import {
  createSalesInvoice,
  getAllSalesInvoices,
  getSalesInvoiceById,
  updateSalesInvoice,
  deleteSalesInvoice,
} from "../controllers/salesInvoiceController.js";

import {
  createPurchaseInvoice,
  getAllPurchaseInvoices,
  getPurchaseInvoiceById,
  updatePurchaseInvoice,
  deletePurchaseInvoice,
  getNextInvoiceNumber,
} from "../controllers/purchaseInvoiceController.js";

import {
  getLedger,
  getLedgerByAccount,
  getLedgerByReference,
  getReferences,
} from "../controllers/ledgerController.js";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";

import {
  getBalanceSheet,
  getIncomeStatement,
  getTrialBalance,
} from "../controllers/reportsController.js";

import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees,
  toggleEmployeeStatus,
  updateEmployee,
} from "../controllers/employeeController.js";
import {
  createWeightBridge,
  getWeightBridgeEntries,
} from "../controllers/weightBridgeController.js";
import {
  createCashbook,
  getCashbookById,
  getCashbooks,
} from "../controllers/cashbookController.js";

const router = express.Router();

/* ===============================
   🔐 AUTH ROUTE (Public)
================================== */
router.post("/login", login);

/* ===============================
   🏦 ACCOUNTS (Admin + Accountant)
================================== */
router.post(
  "/create-account",
  protect,
  authorizeRoles("Admin", "Accountant"),
  createAccount,
);
router.get("/accounts", protect, getAccounts);
router.put(
  "/update-account/:id",
  protect,
  authorizeRoles("Admin", "Accountant"),
  updateAccount,
);
router.delete(
  "/delete-account/:id",
  protect,
  authorizeRoles("Admin"),
  deleteAccount,
);
router.get("/account-options", protect, getAccountOptions);
router.patch("/accounts/:id/star", protect, toggleStarAccount);

/* ===============================
   📒 GENERAL JOURNAL
================================== */
router.post(
  "/create-journal-entry",
  protect,
  authorizeRoles("Admin", "Accountant"),
  createGeneralEntry,
);
router.get("/get-journal-entries", protect, getGeneralEntries);
router.delete(
  "/delete-journal-entry/:id",
  protect,
  authorizeRoles("Admin"),
  deleteGeneralEntry,
);
router.put(
  "/update-journal-entry/:id",
  protect,
  authorizeRoles("Admin", "Accountant"),
  updateGeneralEntry,
);
router.post(
  "/bulk-upload-journal-entries",
  protect,
  authorizeRoles("Admin", "Accountant"),
  upload.single("file"),
  bulkUploadJournalEntries,
);

/* ===============================
   🧾 SALES INVOICE
================================== */
router.post(
  "/sales-invoice/create",
  protect,
  authorizeRoles("Admin", "Accountant"),
  createSalesInvoice,
);
router.get("/sales-invoice", protect, getAllSalesInvoices);
router.get("/sales-invoice/:id", protect, getSalesInvoiceById);
router.put(
  "/sales-invoice/:id",
  protect,
  authorizeRoles("Admin", "Accountant"),
  updateSalesInvoice,
);
router.delete(
  "/sales-invoice/:id",
  protect,
  authorizeRoles("Admin"),
  deleteSalesInvoice,
);

/* ===============================
   🛒 PURCHASE INVOICE
================================== */
router.get("/purchase-invoice/next-sr", getNextInvoiceNumber);
router.post(
  "/purchase-invoice/create",
  protect,
  authorizeRoles("Admin", "Accountant"),
  createPurchaseInvoice,
);
router.get("/purchase-invoice", protect, getAllPurchaseInvoices);
router.get("/purchase-invoice/:id", protect, getPurchaseInvoiceById);
router.put(
  "/purchase-invoice/:id",
  protect,
  authorizeRoles("Admin", "Accountant"),
  updatePurchaseInvoice,
);
router.delete(
  "/purchase-invoice/:id",
  protect,
  authorizeRoles("Admin"),
  deletePurchaseInvoice,
);

/* ===============================
   📊 LEDGER
================================== */
router.get("/ledger", protect, getLedger);
router.get("/ledger/account/:accountId", protect, getLedgerByAccount);
router.get("/ledger/ref/:ref", protect, getLedgerByReference);
router.get("/references", protect, getReferences);

/* ===============================
   📦 PRODUCTS
================================== */
router.post(
  "/create-products",
  protect,
  authorizeRoles("Admin"),
  createProduct,
);
router.get("/products", protect, getProducts);
router.put("/products/:id", protect, authorizeRoles("Admin"), updateProduct);
router.delete("/products/:id", protect, authorizeRoles("Admin"), deleteProduct);

/* ===============================
   📈 REPORTS
================================== */
router.get("/balance-sheet", protect, getBalanceSheet);
router.get("/trial-balance", protect, getTrialBalance);
router.get("/incomestatement", protect, getIncomeStatement);

/* ===============================
   📈 WEIGHT BRIDGE
================================== */

router.post(
  "/weight-bridge",
  protect,
  authorizeRoles("Admin", "Accountant"),
  createWeightBridge,
);
router.get(
  "/weight-bridge",
  protect,
  authorizeRoles("Admin", "Accountant"),
  getWeightBridgeEntries,
);

/* ===============================
   💰 CASHBOOK
================================== */
router.post(
  "/cashbook",
  protect,
  authorizeRoles("Admin", "Accountant"),
  createCashbook,
);
router.get(
  "/cashbook-report",
  protect,
  authorizeRoles("Admin", "Accountant"),
  getCashbooks,
);
router.get(
  "/cashbook/:id",
  protect,
  authorizeRoles("Admin", "Accountant"),
  getCashbookById,
);

/* ===============================
   👥 EMPLOYEES (Admin Only)
================================== */
router.post(
  "/employees",
  protect,
  authorizeRoles("Admin"),
  upload.array("documents"),
  createEmployee,
);
router.get("/employees", protect, authorizeRoles("Admin"), getEmployees);
router.get("/employees/:id", protect, authorizeRoles("Admin"), getEmployeeById);
router.put("/employees/:id", protect, authorizeRoles("Admin"), updateEmployee);
router.delete(
  "/employees/:id",
  protect,
  authorizeRoles("Admin"),
  deleteEmployee,
);
router.patch(
  "/employees/:id/toggle",
  protect,
  authorizeRoles("Admin"),
  toggleEmployeeStatus,
);

export default router;
