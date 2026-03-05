// controllers/cashbookController.js
import Cashbook from "../models/Cashbook.js";
import Account from "../models/Account.js";
import GeneralJournalEntry from "../models/GeneralJournalEntry.js";
import mongoose from "mongoose";

const CASH_ACCOUNT_ID       = "692fca6790d96dd63e44b12a";
const OPENING_BALANCE_ACCOUNT_ID = "692fca6790d96dd63e44b34c";
const PKT_OFFSET_MS         = 5 * 60 * 60 * 1000; // UTC+5

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getTodayUtcRange() {
  const nowUtc = Date.now();
  const nowPkt = new Date(nowUtc + PKT_OFFSET_MS);
  const pktMidnightMs = Date.UTC(
    nowPkt.getUTCFullYear(), nowPkt.getUTCMonth(), nowPkt.getUTCDate(),
    0, 0, 0, 0
  );
  const startUtc = new Date(pktMidnightMs - PKT_OFFSET_MS);
  const endUtc   = new Date(startUtc.getTime() + 24 * 60 * 60 * 1000 - 1);
  return { startUtc, endUtc, nowPkt };
}

function isOpeningBalanceEntry(j) {
  return (
    j.description   === "Opening Balance" ||
    j.debitLineDesc  === "Opening Balance" ||
    j.comments       === "Opening Balance for the year"
  );
}

/**
 * Computes the authoritative cash balance from source data every time.
 * Formula: openingBalance + allTimeCashIn - allTimeCashOut
 *
 * "All time" means every normal (non-opening-balance) journal entry ever saved.
 * This never drifts — it's always recomputed from scratch.
 *
 * Also writes the result back to Account so other parts of the app stay in sync.
 */
async function computeAndSaveCashBalance() {
  const cashId = new mongoose.Types.ObjectId(CASH_ACCOUNT_ID);
  const year   = new Date().getFullYear();

  const cashbook = await Cashbook.findOne({ year });
  const openingBalance = cashbook ? cashbook.openingBalance : 0;

  const [debitAgg, creditAgg] = await Promise.all([
    // All-time: entries that DR cash (cash coming IN), excluding opening balance
    GeneralJournalEntry.aggregate([
      {
        $match: {
          debitAccount: cashId,
          description:  { $ne: "Opening Balance" },
          debitLineDesc: { $ne: "Opening Balance" },
        },
      },
      { $group: { _id: null, total: { $sum: "$debitAmount" } } },
    ]),
    // All-time: entries that CR cash (cash going OUT), excluding opening balance
    GeneralJournalEntry.aggregate([
      {
        $match: {
          description:  { $ne: "Opening Balance" },
          debitLineDesc: { $ne: "Opening Balance" },
        },
      },
      { $unwind: "$creditEntries" },
      { $match: { "creditEntries.account": cashId } },
      { $group: { _id: null, total: { $sum: "$creditEntries.amount" } } },
    ]),
  ]);

  const allTimeCashIn  = debitAgg[0]?.total  || 0;
  const allTimeCashOut = creditAgg[0]?.total || 0;
  const balance        = openingBalance + allTimeCashIn - allTimeCashOut;

  // Write back so ledger / reports stay in sync
  await Account.findByIdAndUpdate(CASH_ACCOUNT_ID, {
    totalDebit:  openingBalance + allTimeCashIn,
    totalCredit: allTimeCashOut,
    balance,
  });

  return balance;
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/cashbook-daily
// ─────────────────────────────────────────────────────────────────────────────
export const getDailyCashbook = async (req, res) => {
  try {
    const { startUtc, endUtc, nowPkt } = getTodayUtcRange();
    const year = nowPkt.getUTCFullYear();

    const cashbook       = await Cashbook.findOne({ year });
    const openingBalance = cashbook ? cashbook.openingBalance : 0;

    // ✅ Always recompute — never trust a potentially stale Account.balance
    const currentBalance = await computeAndSaveCashBalance();

    const todayJournals = await GeneralJournalEntry.find({
      entryDate: { $gte: startUtc, $lte: endUtc },
      $or: [
        { debitAccount: CASH_ACCOUNT_ID },
        { "creditEntries.account": CASH_ACCOUNT_ID },
      ],
    })
      .populate("debitAccount", "accountName")
      .populate("creditEntries.account", "accountName")
      .sort({ entryDate: 1 });

    const cashEntries = todayJournals.filter((j) => !isOpeningBalanceEntry(j));

    let totalCashIn  = 0;
    let totalCashOut = 0;

    const entries = cashEntries.map((j) => {
      const isCashDebit = j.debitAccount?._id?.toString() === CASH_ACCOUNT_ID;

      let accounts = [], description = "", amount = 0, type = "";

      if (isCashDebit) {
        type        = "credit";
        amount      = j.debitAmount;
        accounts    = j.creditEntries.map((ce) => ce.account?.accountName || "Unknown");
        description = j.creditEntries.map((ce) => ce.description).filter(Boolean).join(", ") || j.debitLineDesc || "";
        totalCashIn += amount;
      } else {
        type    = "debit";
        const cashCredit = j.creditEntries.find(
          (ce) => ce.account?._id?.toString() === CASH_ACCOUNT_ID
        );
        amount       = cashCredit ? cashCredit.amount : j.debitAmount;
        accounts     = [j.debitAccount?.accountName || "Unknown"];
        description  = j.debitLineDesc || "";
        totalCashOut += amount;
      }

      const pktTime = new Date(new Date(j.entryDate).getTime() + PKT_OFFSET_MS);

      return {
        _id: j._id,
        time: pktTime.toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit", hour12: true }),
        type, accounts, description, amount,
        comments: j.comments || "",
      };
    });

    const yyyy = String(nowPkt.getUTCFullYear());
    const mm   = String(nowPkt.getUTCMonth() + 1).padStart(2, "0");
    const dd   = String(nowPkt.getUTCDate()).padStart(2, "0");

    res.status(200).json({
      date: `${yyyy}-${mm}-${dd}`,
      openingBalance,
      currentBalance,
      totalCredit: totalCashIn,
      totalDebit:  totalCashOut,
      entries,
    });
  } catch (err) {
    console.error("getDailyCashbook error:", err);
    res.status(500).json({ message: "Server error fetching daily cashbook" });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/cashbook-report
// ─────────────────────────────────────────────────────────────────────────────
export const getCashbookReport = async (req, res) => {
  try {
    const cashbooks = await Cashbook.find();
    // ✅ Recompute here too so CashbookForm always loads the correct balance
    const currentBalance = await computeAndSaveCashBalance();
    res.status(200).json({ cashbooks, currentBalance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching cashbooks" });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/cashbook-entry  (opening balance — one time per year)
// ─────────────────────────────────────────────────────────────────────────────
export const createCashbookEntry = async (req, res) => {
  try {
    const { openingBalance } = req.body;

    if (!openingBalance || Number(openingBalance) <= 0) {
      return res.status(400).json({ message: "Opening balance must be greater than 0" });
    }

    const year = new Date().getFullYear();
    const existingCashbook = await Cashbook.findOne({ year });
    if (existingCashbook) {
      return res.status(400).json({ message: "Opening balance already set for this year" });
    }

    const cashbook = new Cashbook({ year, openingBalance: Number(openingBalance), entries: [] });
    await cashbook.save();

    const openingJournal = new GeneralJournalEntry({
      entryDate:    new Date(),
      description:  "Opening Balance",
      comments:     "Opening Balance for the year",
      debitAccount: CASH_ACCOUNT_ID,
      debitAmount:  Number(openingBalance),
      debitLineDesc: "Opening Balance",
      creditEntries: [{
        account:     OPENING_BALANCE_ACCOUNT_ID,
        amount:      Number(openingBalance),
        description: "Opening Balance",
      }],
    });
    await openingJournal.save();

    // Seed the account, then let computeAndSaveCashBalance confirm it
    const cashAccount        = await Account.findById(CASH_ACCOUNT_ID);
    cashAccount.totalDebit   = Number(openingBalance);
    cashAccount.totalCredit  = 0;
    cashAccount.balance      = Number(openingBalance);
    await cashAccount.save();

    // Run full recompute to ensure consistency
    const currentBalance = await computeAndSaveCashBalance();

    res.status(201).json({
      message: "Opening balance set successfully",
      cashbook,
      openingJournal,
      currentBalance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error saving opening balance" });
  }
};