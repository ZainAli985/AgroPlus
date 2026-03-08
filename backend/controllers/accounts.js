import mongoose from "mongoose";           // ← THIS was missing — caused the crash
import Account from "../models/Account.js";

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

// @route POST /api/create-account
export const createAccount = async (req, res) => {
  try {
    const { accountType, subAccountType, accountName, manualAccountId, LedgerRef } = req.body;

    if (!accountType || !subAccountType || !accountName) {
      return res.status(400).json({ message: "All fields except Manual ID and Ledger Ref are required." });
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

    const account = new Account({
      autoAccountId,
      manualAccountId: manualAccountId || "",
      accountType,
      subAccountType,
      accountName,
      LedgerRef: LedgerRef || "",
    });

    await account.save();
    res.status(201).json({ message: "Account created successfully!", account });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Server error while creating account." });
  }
};

// @route GET /api/accounts
export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find().sort({ createdAt: -1 });
    res.status(200).json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ message: "Server error while fetching accounts." });
  }
};

// @route PUT /api/update-account/:id
export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;

    // ← mongoose is now imported so this no longer crashes
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid account ID" });
    }

    const { accountName, accountType, subAccountType, LedgerRef } = req.body;

    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      { accountName, accountType, subAccountType, LedgerRef },
      { new: true, runValidators: true },
    );

    if (!updatedAccount) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }

    res.json({ success: true, account: updatedAccount });
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ success: false, message: "Server error while updating account" });
  }
};

// @route DELETE /api/delete-account/:id
export const deleteAccount = async (req, res) => {
  try {
    const deletedAccount = await Account.findByIdAndDelete(req.params.id);
    if (!deletedAccount) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ success: false, message: "Server error while deleting account" });
  }
};

// @route GET /api/account-options
export const getAccountOptions = (req, res) => {
  const accountOptions = [
    { type: "Assets",      subTypes: ["Current Assets", "Fixed Assets"] },
    { type: "Liabilities", subTypes: ["Current Liabilities", "Fixed Liabilities"] },
    { type: "Equity",      subTypes: ["Equity", "Owner's Capital", "Shareholders Account", "Expense"] },
    { type: "Revenue",     subTypes: ["Revenue", "Contra Revenue"] },
    { type: "Expense",     subTypes: ["Expenses"] },
  ];
  res.status(200).json({ accountTypes: accountOptions });
};

// @route PATCH /api/accounts/:id/star
export const toggleStarAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }
    account.starred = !account.starred;
    await account.save();
    res.json({ success: true, starred: account.starred });
  } catch (error) {
    console.error("Error toggling starred status:", error);
    res.status(500).json({ success: false, message: "Server error while updating starred status" });
  }
};