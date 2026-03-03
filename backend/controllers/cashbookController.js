// controllers/cashbookController.js
import Cashbook from "../models/Cashbook.js";
import Account from "../models/Account.js";
import GeneralJournalEntry from "../models/GeneralJournalEntry.js";

// GET /api/cashbook-report
export const getCashbookReport = async (req, res) => {
  try {
    const cashbooks = await Cashbook.find();
    res.status(200).json({ cashbooks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching cashbooks" });
  }
};

// POST /api/cashbook-entry
export const createCashbookEntry = async (req, res) => {
  try {
    const { openingBalance } = req.body;

    if (!openingBalance || Number(openingBalance) <= 0) {
      return res.status(400).json({ message: "Opening balance must be greater than 0" });
    }

    const year = new Date().getFullYear();

    // Check if opening balance already exists
    let existingCashbook = await Cashbook.findOne({ year });
    if (existingCashbook) {
      return res.status(400).json({ message: "Opening balance already set for this year" });
    }

    // Create Cashbook entry
    const cashbook = new Cashbook({
      year,
      openingBalance,
      entries: [],
    });

    await cashbook.save();

    // 🔹 Update Cash In Hand account balance
    const CASH_ACCOUNT_ID = "692fca6790d96dd63e44b12a"; // Hardcoded Cash in Hand account ID
    const OPENING_BALANCE_ACCOUNT_ID = "692fca6790d96dd63e44b34c"; // Equity account

    // Create single General Journal Entry for opening balance
    const openingJournal = new GeneralJournalEntry({
      entryDate: new Date(),
      description: "Opening Balance",
      comments: "Opening Balance for the year",
      debitAccount: CASH_ACCOUNT_ID,
      debitAmount: Number(openingBalance),
      debitLineDesc: "Opening Balance",
      creditEntries: [
        {
          account: OPENING_BALANCE_ACCOUNT_ID,
          amount: Number(openingBalance),
          description: "Opening Balance",
        },
      ],
    });

    await openingJournal.save();

    // Update Cash in Hand account balance
    const cashAccount = await Account.findById(CASH_ACCOUNT_ID);
    cashAccount.totalDebit = Number(openingBalance);
    cashAccount.totalCredit = 0;
    cashAccount.balance = cashAccount.totalDebit - cashAccount.totalCredit;
    await cashAccount.save();

    res.status(201).json({
      message: "Opening balance set successfully",
      cashbook,
      openingJournal,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error saving opening balance" });
  }
};