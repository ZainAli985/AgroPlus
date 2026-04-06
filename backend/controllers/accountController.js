// controllers/accountController.js
import mongoose from "mongoose";
import { getModels } from "../config/millDB.js";
import { detectBankName, detectBankAbbr, resolveBankMeta } from "../utils/bankMeta.js";

// ─── Canonical account categories — single source of truth for the whole system ───
// These are the ONLY valid category values. "Inventory" is intentionally excluded.
// Add new categories here first before using them anywhere.
export const VALID_CATEGORIES = [
  // Assets — Current
  "Bank", "Customer", "Loan Given",
  // Assets — Fixed
  "Building", "Vehicle", "Equipment", "Tool", "Furniture",
  // Liabilities — Current
  "Employee", "Supplier", "Loan Taken", "Tax Payable", "Accrued Expenses",
  // Liabilities — Fixed
  "Installments",
  // Equity
  "Investor", "Shareholder's Account",
  // Revenue
  "Other Income",
  // Expense
  "Expense",
  // System-only (set internally, not user-selectable through CreateAccount UI)
  "Cash In Hand", "Cash", "Product",
];

const allowedSubAccountOptions = {
  Assets:      ["Current Assets", "Fixed Assets"],
  Liabilities: ["Current Liabilities", "Fixed Liabilities"],
  Equity:      ["Equity", "Owner's Capital", "Shareholders Account", "Expense"],
  Revenue:     ["Revenue", "Contra Revenue"],
  Expense:     ["Expenses"],
};

function generateAutoId(lastNumber) {
  return "ACC-" + (lastNumber + 1).toString().padStart(6, "0");
}

async function getNextAutoId(Account) {
  const last = await Account.findOne().sort({ createdAt: -1 });
  const lastNum = last?.autoAccountId ? parseInt(last.autoAccountId.split("-")[1]) || 0 : 0;
  return generateAutoId(lastNum);
}

// ── Shared balance recompute — used by recalcAllBalances ────────────────────
// RULE: totalDebit / totalCredit on Account = OPENING BALANCE ONLY.
// They are set at account creation and never modified by journal entries.
// This function reads stored opening amounts, aggregates JEs, writes balance.
async function _recalcOne(millId, account) {
  const { GeneralJournalEntry, Cashbook } = getModels(millId);
  const accId = new mongoose.Types.ObjectId(account._id);

  if (account.isProtected) {
    // CASH IN HAND — opening = Cashbook.openingBalance
    const year     = new Date().getFullYear();
    const cashbook = await Cashbook.findOne({ year });
    const ob       = cashbook ? cashbook.openingBalance : 0;
    const [dAgg, cAgg] = await Promise.all([
      GeneralJournalEntry.aggregate([
        { $match: { debitAccount: accId, debitLineDesc: { $ne: "Opening Balance" } } },
        { $group: { _id: null, total: { $sum: "$debitAmount" } } },
      ]),
      GeneralJournalEntry.aggregate([
        { $match: { debitLineDesc: { $ne: "Opening Balance" } } },
        { $unwind: "$creditEntries" },
        { $match: { "creditEntries.account": accId } },
        { $group: { _id: null, total: { $sum: "$creditEntries.amount" } } },
      ]),
    ]);
    const totalIn  = dAgg[0]?.total || 0;
    const totalOut = cAgg[0]?.total || 0;
    const balance  = ob + totalIn - totalOut;
    await getModels(millId).Account.findByIdAndUpdate(account._id, {
      totalDebit: ob + totalIn, totalCredit: totalOut, balance,
    });
    return balance;
  }

  // Regular account — opening balance is already stored in totalDebit/totalCredit
  // NEVER modify those; only recompute balance from them + journal movements
  const obDebit  = account.totalDebit  || 0;
  const obCredit = account.totalCredit || 0;

  const [dAgg, cAgg] = await Promise.all([
    GeneralJournalEntry.aggregate([
      { $match: { debitAccount: accId } },
      { $group: { _id: null, total: { $sum: "$debitAmount" } } },
    ]),
    GeneralJournalEntry.aggregate([
      { $unwind: "$creditEntries" },
      { $match: { "creditEntries.account": accId } },
      { $group: { _id: null, total: { $sum: "$creditEntries.amount" } } },
    ]),
  ]);

  const jeDebit  = dAgg[0]?.total || 0;
  const jeCredit = cAgg[0]?.total || 0;
  const at = account.accountType;

  // Signed balance: positive = normal side, negative = abnormal (e.g. bank overdraft)
  const balance = (at === "Assets" || at === "Expense")
    ? (obDebit + jeDebit) - (obCredit + jeCredit)
    : (obCredit + jeCredit) - (obDebit + jeDebit);

  await getModels(millId).Account.findByIdAndUpdate(account._id, { balance });
  return balance;
}

// POST /api/create-account
export const createAccount = async (req, res) => {
  try {
    const { Account } = getModels(req.millId);
    const {
      accountType, subAccountType, accountName, manualAccountId, LedgerRef,
      openingBalance, openingBalanceType, category, bankLogoIndex, remarkNote,
    } = req.body;

    if (!accountType || !subAccountType || !accountName)
      return res.status(400).json({ message: "accountType, subAccountType and accountName are required." });

    // Validate category if provided
    if (category && !VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({
        message: `Invalid category "${category}". Valid categories: ${VALID_CATEGORIES.join(", ")}.`,
      });
    }

    const allowed = allowedSubAccountOptions[accountType];
    if (!allowed || !allowed.includes(subAccountType))
      return res.status(400).json({ message: "Invalid subAccountType for selected accountType." });

    const autoAccountId = await getNextAutoId(Account);

    const obAmt = Math.abs(Number(openingBalance) || 0); // opening balance always positive
    let totalDebit = 0, totalCredit = 0, balance = 0;
    if (obAmt > 0 && openingBalanceType) {
      if (openingBalanceType === "debit") {
        totalDebit = obAmt;
        balance    = (accountType === "Assets" || accountType === "Expense") ?  obAmt : -obAmt;
      } else if (openingBalanceType === "credit") {
        totalCredit = obAmt;
        balance     = (accountType === "Assets" || accountType === "Expense") ? -obAmt :  obAmt;
      }
    }

    let baseName = accountName.trim();
    if (remarkNote?.trim()) baseName = `${baseName} — ${remarkNote.trim()}`;
    if (
      accountType === "Expense" &&
      !baseName.toLowerCase().endsWith("expense") &&
      !baseName.toLowerCase().includes("— expense")
    ) baseName = `${baseName} — Expense`;
    const displayAccountName = baseName;

    // Auto-detect full bank name for bank accounts — stored for searching/display
    const detectedBankName = (category === "Bank" || bankLogoIndex)
      ? detectBankName(bankLogoIndex || null, accountName)
      : "";

    const account = new Account({
      autoAccountId, manualAccountId: manualAccountId || "",
      accountType, subAccountType, accountName: displayAccountName,
      LedgerRef: LedgerRef || "", totalDebit, totalCredit, balance,
      category: category || "",
      bankLogoIndex: bankLogoIndex || null,
      remarkNote: remarkNote?.trim() || "",
      bankName: detectedBankName,
    });
    await account.save();
    res.status(201).json({ message: "Account created successfully!", account });
  } catch (error) {
    res.status(500).json({ message: "Server error while creating account." });
  }
};

// GET /api/accounts
export const getAccounts = async (req, res) => {
  try {
    const { Account } = getModels(req.millId);
    const { category, type, excludeProducts } = req.query;
    const filter = {};
    if (category)                   filter.category         = category;
    if (type)                       filter.accountType      = type;
    if (excludeProducts === "true") filter.isProductAccount = { $ne: true };
    const accounts = await Account.find(filter).sort({ createdAt: -1 });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching accounts." });
  }
};

// PUT /api/update-account/:id
export const updateAccount = async (req, res) => {
  try {
    const { Account, Product } = getModels(req.millId);
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ success: false, message: "Invalid account ID" });

    const existing = await Account.findById(id);
    if (!existing)       return res.status(404).json({ success: false, message: "Account not found" });
    if (existing.isProtected)
      return res.status(403).json({ success: false, message: "This account is system-protected and cannot be edited." });

    const { accountName, accountType, subAccountType, LedgerRef } = req.body;

    if (existing.isProductAccount) {
      if (!accountName?.trim())
        return res.status(400).json({ success: false, message: "Account name is required." });
      const updated = await Account.findByIdAndUpdate(id, { accountName: accountName.trim() }, { new: true });
      if (existing.linkedProductId) {
        const product = await Product.findById(existing.linkedProductId);
        if (product) {
          const suffix = [product.type, product.subType].filter(Boolean).join(" - ");
          const newProductName = suffix
            ? accountName.trim().replace(new RegExp(` - ${suffix.replace(/-/g,"\\-")}$`), "").trim()
            : accountName.trim();
          product.productName = newProductName || accountName.trim();
          await product.save();
        }
      }
      return res.json({ success: true, account: updated });
    }

    // Re-detect bankName in case bankLogoIndex changed
    const newBankName = (existing.category === "Bank" || existing.bankLogoIndex || req.body.bankLogoIndex)
      ? detectBankName(req.body.bankLogoIndex ?? existing.bankLogoIndex, accountName || existing.accountName)
      : existing.bankName || "";

    const updatedAccount = await Account.findByIdAndUpdate(
      id, { accountName, accountType, subAccountType, LedgerRef, bankName: newBankName },
      { new: true, runValidators: true }
    );
    res.json({ success: true, account: updatedAccount });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error while updating account" });
  }
};

// DELETE /api/delete-account/:id
export const deleteAccount = async (req, res) => {
  try {
    const { Account } = getModels(req.millId);
    const account = await Account.findById(req.params.id);
    if (!account)          return res.status(404).json({ success: false, message: "Account not found" });
    if (account.isProtected)
      return res.status(403).json({ success: false, message: "This account is system-protected and cannot be deleted." });
    if (account.isProductAccount)
      return res.status(403).json({ success: false, message: "Product accounts cannot be deleted. Delete the product instead." });
    await account.deleteOne();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error while deleting account" });
  }
};

// GET /api/account-options
export const getAccountOptions = (req, res) => {
  res.status(200).json({
    accountTypes: [
      { type: "Assets",      subTypes: ["Current Assets","Fixed Assets"] },
      { type: "Liabilities", subTypes: ["Current Liabilities","Fixed Liabilities"] },
      { type: "Equity",      subTypes: ["Equity","Owner's Capital","Shareholders Account","Expense"] },
      { type: "Revenue",     subTypes: ["Revenue","Contra Revenue"] },
      { type: "Expense",     subTypes: ["Expenses"] },
    ],
    validCategories: VALID_CATEGORIES,
  });
};

// PATCH /api/accounts/:id/star
export const toggleStarAccount = async (req, res) => {
  try {
    const { Account } = getModels(req.millId);
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ success: false, message: "Account not found" });
    account.starred = !account.starred;
    await account.save();
    res.json({ success: true, starred: account.starred });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/accounts/recalc-all
// ─────────────────────────────────────────────────────────────────────────────
// MIGRATION / REPAIR ENDPOINT
// Run this once after deploying the fix to restore correct balances for all
// accounts whose balance was corrupted by the old $inc totalDebit/totalCredit bug.
//
// Safe to run repeatedly — idempotent.
// ─────────────────────────────────────────────────────────────────────────────
export const recalcAllBalances = async (req, res) => {
  try {
    const { Account } = getModels(req.millId);
    const accounts = await Account.find();
    const results = [];
    let fixed = 0, errors = 0;

    for (const acc of accounts) {
      try {
        const newBalance = await _recalcOne(req.millId, acc);
        results.push({ name: acc.accountName, oldBalance: acc.balance, newBalance });
        if (Math.abs((acc.balance || 0) - newBalance) > 0.001) fixed++;
      } catch (e) {
        errors++;
        console.error(`recalcAllBalances failed for ${acc.accountName}:`, e.message);
      }
    }

    res.json({
      success: true,
      total: accounts.length,
      fixed,
      errors,
      message: `Recalculated ${accounts.length} accounts. ${fixed} balances corrected.`,
      results,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Internal helpers (called programmatically) ───────────────────────────────
export async function ensureDefaultAccountsForMill(millId) {
  const { Account } = getModels(millId);

  const defaults = [
    {
      name:           "Cash In Hand",
      accountType:    "Assets",
      subAccountType: "Current Assets",
      LedgerRef:      "CASH",
      category:       "Cash",
      isProtected:    true,
    },
    {
      name:           "Tankhwa Khaata",
      accountType:    "Expense",
      subAccountType: "Expenses",
      LedgerRef:      "",
      category:       "Expense",
      isProtected:    true,   // system account — salary ledger, must not be deleted/renamed
    },
  ];

  const created = [];
  for (const d of defaults) {
    const existing = await Account.findOne({ accountName: d.name });
    if (existing) {
      // Migration: ensure existing accounts have the correct isProtected flag
      // Handles mills that were created before Tankhwa was marked as protected
      if (d.isProtected && !existing.isProtected) {
        await Account.findByIdAndUpdate(existing._id, { isProtected: true });
      }
      continue;
    }
    const autoAccountId = await getNextAutoId(Account);
    await Account.create({
      autoAccountId, manualAccountId: "",
      accountType: d.accountType, subAccountType: d.subAccountType,
      accountName: d.name, LedgerRef: d.LedgerRef, category: d.category,
      isProtected: d.isProtected,
      totalDebit: 0, totalCredit: 0, balance: 0,
    });
    created.push(d.name);
  }
  return created;
}

// POST /api/setup-default-accounts  (idempotent)
export const ensureDefaultAccounts = async (req, res) => {
  try {
    const created = await ensureDefaultAccountsForMill(req.millId);
    res.json({
      success: true, created,
      message: created.length ? `Created: ${created.join(", ")}` : "All defaults already exist.",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/accounts/backfill-bank-names
// ─────────────────────────────────────────────────────────────────────────────
// MIGRATION: Back-fill bankName on all existing bank accounts for all mills.
// Run once after deploying this change. Safe to run repeatedly (idempotent).
//
// For every Account where:
//   • category === "Bank" OR bankLogoIndex is set
//   • bankName is empty or missing
// → detect bankName from bankLogoIndex (primary) or accountName (fallback)
// → save it
//
// This makes bankName permanently part of the document, so frontend search
// and display work correctly for all existing mills without any manual work.
// ─────────────────────────────────────────────────────────────────────────────
export const backfillBankNames = async (req, res) => {
  try {
    const { Account } = getModels(req.millId);
    const filter = {
      $or: [
        { category: "Bank" },
        { bankLogoIndex: { $exists: true, $ne: null } },
      ],
    };
    const accounts = await Account.find(filter);
    let updated = 0, skipped = 0, errors = 0;

    for (const acc of accounts) {
      try {
        const detected = detectBankName(acc.bankLogoIndex, acc.accountName);
        if (!detected) { skipped++; continue; }
        if (acc.bankName === detected) { skipped++; continue; }
        await Account.findByIdAndUpdate(acc._id, { bankName: detected });
        updated++;
      } catch (e) {
        errors++;
        console.error("backfillBankNames error for", acc.accountName, e.message);
      }
    }

    res.json({
      success: true,
      total:   accounts.length,
      updated,
      skipped,
      errors,
      message: `Bank name back-fill complete: ${updated} updated, ${skipped} skipped, ${errors} errors.`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};