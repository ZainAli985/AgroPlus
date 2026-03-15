// controllers/cashbookController.js
import mongoose from "mongoose";
import { getModels } from "../config/millDB.js";

const PKT_OFFSET_MS = 5 * 60 * 60 * 1000; // UTC+5

// ─── Get the mill's protected CASH IN HAND account ───────────────────────────
// Creates it automatically if it doesn't exist yet (lazy fallback for legacy mills)
async function getCashAccount(millId) {
  const { Account } = getModels(millId);
  let acc = await Account.findOne({ isProtected: true });
  if (acc) return acc;

  // Lazy-create for mills that were approved before this feature was added
  const lastAcc = await Account.findOne().sort({ createdAt: -1 });
  let lastNum = 0;
  if (lastAcc?.autoAccountId) {
    const parts = lastAcc.autoAccountId.split("-");
    lastNum = parseInt(parts[1] || "0");
  }
  const autoAccountId = "ACC-" + (lastNum + 1).toString().padStart(6, "0");
  acc = await Account.create({
    autoAccountId,
    manualAccountId: "CASH-001",
    accountType:    "Assets",
    subAccountType: "Current Assets",
    accountName:    "CASH IN HAND",
    LedgerRef:      "CASH",
    isProtected:    true,
    balance:        0,
  });
  return acc;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getTodayUtcRange() {
  const nowUtc = Date.now();
  const nowPkt = new Date(nowUtc + PKT_OFFSET_MS);
  const pktMidnightMs = Date.UTC(
    nowPkt.getUTCFullYear(), nowPkt.getUTCMonth(), nowPkt.getUTCDate()
  );
  const startUtc = new Date(pktMidnightMs - PKT_OFFSET_MS);
  const endUtc   = new Date(startUtc.getTime() + 24 * 60 * 60 * 1000 - 1);
  return { startUtc, endUtc, nowPkt };
}

function isOpeningBalanceEntry(j) {
  return (
    j.debitLineDesc === "Opening Balance" ||
    j.comments      === "Opening Balance for the year"
  );
}

/**
 * Recompute Cash In Hand balance from scratch:
 *   balance = openingBalance + allTimeCashIn - allTimeCashOut
 * Writes result back to the Account document.
 */
async function recomputeAndSaveCashBalance(millId, cashAccountId) {
  const { Cashbook, GeneralJournalEntry, Account } = getModels(millId);
  const cashId = new mongoose.Types.ObjectId(cashAccountId);
  const year   = new Date().getFullYear();

  const cashbook = await Cashbook.findOne({ year });
  const openingBalance = cashbook ? cashbook.openingBalance : 0;

  const [debitAgg, creditAgg] = await Promise.all([
    GeneralJournalEntry.aggregate([
      { $match: { debitAccount: cashId, debitLineDesc: { $ne: "Opening Balance" } } },
      { $group: { _id: null, total: { $sum: "$debitAmount" } } },
    ]),
    GeneralJournalEntry.aggregate([
      { $match: { debitLineDesc: { $ne: "Opening Balance" } } },
      { $unwind: "$creditEntries" },
      { $match: { "creditEntries.account": cashId } },
      { $group: { _id: null, total: { $sum: "$creditEntries.amount" } } },
    ]),
  ]);

  const allTimeCashIn  = debitAgg[0]?.total  || 0;
  const allTimeCashOut = creditAgg[0]?.total || 0;
  const balance        = openingBalance + allTimeCashIn - allTimeCashOut;

  await Account.findByIdAndUpdate(cashAccountId, {
    totalDebit:  openingBalance + allTimeCashIn,
    totalCredit: allTimeCashOut,
    balance,
  });

  return balance;
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/cashbook  AND  GET /api/cashbook-daily   (aliases → same handler)
// Returns today's transactions involving the CASH IN HAND account.
// ─────────────────────────────────────────────────────────────────────────────
export const getDailyCashbook = async (req, res) => {
  try {
    const cashAcc = await getCashAccount(req.millId);
    const cashAccountId = cashAcc._id.toString();

    const { GeneralJournalEntry, Cashbook } = getModels(req.millId);

    // Support optional ?date=YYYY-MM-DD for browsing past days
    let startUtc, endUtc, nowPkt, year;
    if (req.query.date) {
      const [yr, mo, dy] = req.query.date.split("-").map(Number);
      // Treat as PKT midnight
      const pktMidnightMs = Date.UTC(yr, mo - 1, dy);
      startUtc = new Date(pktMidnightMs - PKT_OFFSET_MS);
      endUtc   = new Date(startUtc.getTime() + 24 * 60 * 60 * 1000 - 1);
      nowPkt   = new Date(pktMidnightMs);
      year     = yr;
    } else {
      ({ startUtc, endUtc, nowPkt } = getTodayUtcRange());
      year = nowPkt.getUTCFullYear();
    }

    const cashbook       = await Cashbook.findOne({ year });
    const openingBalance = cashbook ? cashbook.openingBalance : 0;
    const currentBalance = await recomputeAndSaveCashBalance(req.millId, cashAccountId);

    const cashId = new mongoose.Types.ObjectId(cashAccountId);

    const todayJournals = await GeneralJournalEntry.find({
      entryDate: { $gte: startUtc, $lte: endUtc },
      $or: [
        { debitAccount: cashId },
        { "creditEntries.account": cashId },
      ],
    })
      .populate("debitAccount", "accountName")
      .populate("creditEntries.account", "accountName")
      .sort({ entryDate: 1 });

    const cashEntries = todayJournals.filter((j) => !isOpeningBalanceEntry(j));

    let totalCashIn = 0, totalCashOut = 0;

    const entries = cashEntries.map((j) => {
      const isCashDebit = j.debitAccount?._id?.toString() === cashAccountId;
      let accounts, description, amount, type;

      if (isCashDebit) {
        type        = "credit";  // cash coming IN
        amount      = j.debitAmount;
        accounts    = j.creditEntries.map((ce) => ce.account?.accountName || "Unknown");
        description = j.creditEntries.map((ce) => ce.description).filter(Boolean).join(", ") || j.debitLineDesc || "";
        totalCashIn += amount;
      } else {
        type    = "debit";  // cash going OUT
        const cashCredit = j.creditEntries.find((ce) => ce.account?._id?.toString() === cashAccountId);
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
      date:           `${yyyy}-${mm}-${dd}`,
      openingBalance,
      currentBalance,
      cashAccountId,   // return so frontend can use it
      totalCredit:    totalCashIn,
      totalDebit:     totalCashOut,
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
    const cashAcc = await getCashAccount(req.millId);
    const cashAccountId = cashAcc._id.toString();

    const { Cashbook } = getModels(req.millId);
    const cashbooks      = await Cashbook.find();
    const currentBalance = await recomputeAndSaveCashBalance(req.millId, cashAccountId);

    res.status(200).json({ cashbooks, currentBalance, cashAccountId });
  } catch (err) {
    res.status(500).json({ message: "Server error fetching cashbooks" });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/cashbook-entry
// Sets the opening balance for a year and updates Cash In Hand balance.
// ─────────────────────────────────────────────────────────────────────────────
export const createCashbookEntry = async (req, res) => {
  try {
    const { openingBalance, openingBalanceAccountId } = req.body;

    if (!openingBalance || Number(openingBalance) <= 0) {
      return res.status(400).json({ message: "Opening balance must be greater than 0" });
    }

    const { Cashbook, GeneralJournalEntry, Account } = getModels(req.millId);
    const year = new Date().getFullYear();

    const existingCashbook = await Cashbook.findOne({ year });
    if (existingCashbook)
      return res.status(400).json({ message: "Opening balance already set for this year" });

    // Auto-find (or create) the CASH IN HAND account
    const cashAcc = await getCashAccount(req.millId);
    const cashAccountId = cashAcc._id.toString();

    const cashbook = new Cashbook({ year, openingBalance: Number(openingBalance), entries: [] });
    await cashbook.save();

    // Set Cash In Hand balance = opening balance
    await Account.findByIdAndUpdate(cashAccountId, {
      balance:     Number(openingBalance),
      totalDebit:  Number(openingBalance),
      totalCredit: 0,
    });

    // Create opening balance journal entry
    // Debit: Cash In Hand | Credit: Opening Balance equity account (if provided)
    let openingJournal = null;
    if (openingBalanceAccountId) {
      openingJournal = new GeneralJournalEntry({
        entryDate:     new Date(),
        comments:      "Opening Balance for the year",
        debitAccount:  cashAccountId,
        debitAmount:   Number(openingBalance),
        debitLineDesc: "Opening Balance",
        creditEntries: [{
          account:     openingBalanceAccountId,
          amount:      Number(openingBalance),
          description: "Opening Balance",
        }],
      });
      await openingJournal.save();
    }

    const currentBalance = await recomputeAndSaveCashBalance(req.millId, cashAccountId);

    res.status(201).json({
      message:       "Opening balance set successfully",
      cashbook,
      openingJournal,
      currentBalance,
      cashAccountId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error saving opening balance" });
  }
};