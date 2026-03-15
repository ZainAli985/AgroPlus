// controllers/accountController.js
import mongoose from "mongoose";
import { getModels } from "../config/millDB.js";

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

// POST /api/create-account
export const createAccount = async (req, res) => {
  try {
    const { Account } = getModels(req.millId);
    const {
      accountType, subAccountType, accountName, manualAccountId, LedgerRef,
      openingBalance, openingBalanceType,  // "debit" | "credit" | ""
    } = req.body;

    if (!accountType || !subAccountType || !accountName) {
      return res.status(400).json({ message: "accountType, subAccountType and accountName are required." });
    }

    const allowed = allowedSubAccountOptions[accountType];
    if (!allowed || !allowed.includes(subAccountType)) {
      return res.status(400).json({ message: "Invalid subAccountType for selected accountType." });
    }

    const lastAccount = await Account.findOne().sort({ createdAt: -1 });
    let lastNum = 0;
    if (lastAccount?.autoAccountId) {
      lastNum = parseInt(lastAccount.autoAccountId.split("-")[1]);
    }
    const autoAccountId = generateAutoId(lastNum);

    // Compute initial balance from opening balance entry
    const obAmt = Number(openingBalance) || 0;
    let totalDebit  = 0;
    let totalCredit = 0;
    let balance     = 0;

    if (obAmt > 0 && openingBalanceType) {
      if (openingBalanceType === "debit") {
        // Debit side increases: +obAmt to debit, balance = totalDebit - totalCredit = obAmt
        totalDebit = obAmt;
        balance    = obAmt;
      } else if (openingBalanceType === "credit") {
        // Credit side increases: +obAmt to credit, balance = totalDebit - totalCredit = -obAmt
        totalCredit = obAmt;
        balance     = -obAmt;
      }
    }

    const account = new Account({
      autoAccountId,
      manualAccountId: manualAccountId || "",
      accountType,
      subAccountType,
      accountName,
      LedgerRef:   LedgerRef || "",
      totalDebit,
      totalCredit,
      balance,
    });

    await account.save();
    res.status(201).json({ message: "Account created successfully!", account });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Server error while creating account." });
  }
};

// GET /api/accounts
export const getAccounts = async (req, res) => {
  try {
    const { Account } = getModels(req.millId);
    const accounts = await Account.find().sort({ createdAt: -1 });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching accounts." });
  }
};

// PUT /api/update-account/:id
export const updateAccount = async (req, res) => {
  try {
    const { Account } = getModels(req.millId);
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid account ID" });
    }

    const existing = await Account.findById(id);
    if (!existing) return res.status(404).json({ success: false, message: "Account not found" });
    if (existing.isProtected)
      return res.status(403).json({ success: false, message: "This account is system-protected and cannot be edited." });

    const { accountName, accountType, subAccountType, LedgerRef } = req.body;
    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      { accountName, accountType, subAccountType, LedgerRef },
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
    if (!account) return res.status(404).json({ success: false, message: "Account not found" });
    if (account.isProtected)
      return res.status(403).json({ success: false, message: "This account is system-protected and cannot be deleted." });
    await account.deleteOne();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error while deleting account" });
  }
};

// GET /api/account-options  (static — no DB needed)
export const getAccountOptions = (req, res) => {
  res.status(200).json({
    accountTypes: [
      { type: "Assets",      subTypes: ["Current Assets", "Fixed Assets"] },
      { type: "Liabilities", subTypes: ["Current Liabilities", "Fixed Liabilities"] },
      { type: "Equity",      subTypes: ["Equity", "Owner's Capital", "Shareholders Account", "Expense"] },
      { type: "Revenue",     subTypes: ["Revenue", "Contra Revenue"] },
      { type: "Expense",     subTypes: ["Expenses"] },
    ],
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