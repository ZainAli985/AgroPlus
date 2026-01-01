import express from "express";
import { login } from "../controllers/auth.js";
import { createAccount, getAccounts,  updateAccount, 
  deleteAccount, 
  getAccountOptions  } from "../controllers/accounts.js";
import { createGeneralEntry, deleteGeneralEntry, getGeneralEntries, updateGeneralEntry } from "../controllers/generalJournalController.js";
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
} from "../controllers/purchaseInvoiceController.js";
import { getLedger, getLedgerByAccount, getLedgerByReference } from "../controllers/ledgerController.js";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController.js";

const router = express.Router();

// Auth routes
router.post('/login', login);

// Accounts routes
router.post("/create-account", createAccount);
router.get("/accounts", getAccounts);
router.put("/update-account/:id", updateAccount);
router.delete("/delete-account/:id", deleteAccount);
router.get("/account-options", getAccountOptions);

// General Journal routes
router.post("/create-journal-entry", createGeneralEntry);
router.get("/get-journal-entries", getGeneralEntries);
router.delete("/delete-journal-entry/:id", deleteGeneralEntry);
router.put("/update-journal-entry/:id", updateGeneralEntry);

// Sales Invoice routes
router.post("/sales-invoice/create", createSalesInvoice);
router.get("/sales-invoice", getAllSalesInvoices);
router.get("/sales-invoice/:id", getSalesInvoiceById);
router.put("/sales-invoice/:id", updateSalesInvoice);
router.delete("/sales-invoice/:id", deleteSalesInvoice);

// Purchase Invoice routes
router.post("/purchase-invoice/create", createPurchaseInvoice);
router.get("/purchase-invoice", getAllPurchaseInvoices);
router.get("/purchase-invoice/:id", getPurchaseInvoiceById);
router.put("/purchase-invoice/:id", updatePurchaseInvoice);
router.delete("/purchase-invoice/:id", deletePurchaseInvoice);


// Ledger 
router.get("/ledger", getLedger);
router.get("/ledger/account/:accountId", getLedgerByAccount);
router.get("/ledger/ref/:ref", getLedgerByReference);

// Product Routes 
router.post("/products", createProduct);          
router.get("/products", getProducts);            
router.put("/products/:id", updateProduct);      
router.delete("/products/:id", deleteProduct); 

export default router;
