// controllers/accountController.js
import Account from "../models/Account.js";

const allowedSubAccountOptions = {
  Assets: ["Current Assets", "Fixed Assets"],
  Liabilities: ["Current Liabilities", "Fixed Liabilities"],
  Equity: ["Equity"],
  Revenue: ["Revenue", "Contra Revenue"],
  Expense: ["Expenses"],
};

// Auto-ID generator
function generateAutoId(lastNumber) {
  const num = lastNumber + 1;
  return "ACC-" + num.toString().padStart(6, "0");
}

// @desc Create new account
// @route POST /api/create-account
export const createAccount = async (req, res) => {
  try {
    const { accountType, subAccountType, accountName, manualAccountId, LedgerRef } = req.body;

    if (!accountType || !subAccountType || !accountName) {
      return res.status(400).json({ message: "All fields except Manual ID and Ledger Ref are required." });
    }

    // Validate sub account type
    const allowed = allowedSubAccountOptions[accountType];
    if (!allowed || !allowed.includes(subAccountType)) {
      return res.status(400).json({ message: "Invalid subAccountType for selected accountType." });
    }

    // Fetch last account for auto-increment
    const lastAccount = await Account.findOne().sort({ createdAt: -1 });
    let lastNum = 0;
    if (lastAccount?.autoAccountId) {
      lastNum = parseInt(lastAccount.autoAccountId.split("-")[1]);
    }
    const autoAccountId = generateAutoId(lastNum);

    // Create new account
    const account = new Account({
      autoAccountId,
      manualAccountId: manualAccountId || "",
      accountType,
      subAccountType,
      accountName,
      LedgerRef: LedgerRef || "", // Save ledger reference
    });

    await account.save();

    res.status(201).json({ message: "Account created successfully!", account });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Server error while creating account." });
  }
};

// @desc Get all accounts
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
