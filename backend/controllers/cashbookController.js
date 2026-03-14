// controllers/cashbookController.js
import mongoose from "mongoose";
import { getModels } from "../config/millDB.js";

const PKT_OFFSET_MS = 5 * 60 * 60 * 1000; // UTC+5

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
 * Recomputes cash balance from scratch using all journal entries.
 * Formula: openingBalance + allTimeCashIn − allTimeCashOut
 * Writes result back to Account so ledger/reports stay in sync.
 *
 * @param {string} millId
 * @param {string} cashAccountId  - the mill's Cash account _id as string
 */
async function computeAndSaveCashBalance(millId, cashAccountId) {
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
// GET /api/cashbook-daily
// ─────────────────────────────────────────────────────────────────────────────
export const getDailyCashbook = async (req, res) => {
  try {
    // cashAccountId is optional — if not provided, balance computation is skipped
    const cashAccountId = req.query.cashAccountId || null;

    const { GeneralJournalEntry, Cashbook } = getModels(req.millId);
    const { startUtc, endUtc, nowPkt } = getTodayUtcRange();
    const year = nowPkt.getUTCFullYear();

    const cashbook       = await Cashbook.findOne({ year });
    const openingBalance = cashbook ? cashbook.openingBalance : 0;
    const currentBalance = cashAccountId
      ? await computeAndSaveCashBalance(req.millId, cashAccountId)
      : openingBalance;

    const todayJournals = await GeneralJournalEntry.find({
      entryDate: { $gte: startUtc, $lte: endUtc },
      $or: [
        { debitAccount: cashAccountId },
        { "creditEntries.account": cashAccountId },
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
        type        = "credit";
        amount      = j.debitAmount;
        accounts    = j.creditEntries.map((ce) => ce.account?.accountName || "Unknown");
        description = j.creditEntries.map((ce) => ce.description).filter(Boolean).join(", ") || j.debitLineDesc || "";
        totalCashIn += amount;
      } else {
        type    = "debit";
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

    res.status(200).json({ date: `${yyyy}-${mm}-${dd}`, openingBalance, currentBalance, totalCredit: totalCashIn, totalDebit: totalCashOut, entries });
  } catch (err) {
    console.error("getDailyCashbook error:", err);
    res.status(500).json({ message: "Server error fetching daily cashbook" });
  }
};

// GET /api/cashbook-report
export const getCashbookReport = async (req, res) => {
  try {
    const cashAccountId = req.query.cashAccountId || null;
    const { Cashbook } = getModels(req.millId);
    const cashbooks = await Cashbook.find();
    const currentBalance = cashAccountId
      ? await computeAndSaveCashBalance(req.millId, cashAccountId)
      : null;
    res.status(200).json({ cashbooks, currentBalance });
  } catch (err) {
    res.status(500).json({ message: "Server error fetching cashbooks" });
  }
};

// POST /api/cashbook-entry
export const createCashbookEntry = async (req, res) => {
  try {
    // cashAccountId and openingBalanceAccountId are optional — can be set later via seasons
    const cashAccountId       = req.body.cashAccountId       || null;
    const openingBalAccountId = req.body.openingBalanceAccountId || null;

    const { openingBalance } = req.body;
    if (!openingBalance || Number(openingBalance) <= 0) {
      return res.status(400).json({ message: "Opening balance must be greater than 0" });
    }

    const { Cashbook, GeneralJournalEntry, Account } = getModels(req.millId);
    const year = new Date().getFullYear();

    const existingCashbook = await Cashbook.findOne({ year });
    if (existingCashbook) return res.status(400).json({ message: "Opening balance already set for this year" });

    const cashbook = new Cashbook({ year, openingBalance: Number(openingBalance), entries: [] });
    await cashbook.save();

    let openingJournal = null;
    let currentBalance = Number(openingBalance);

    if (cashAccountId && openingBalAccountId) {
      openingJournal = new GeneralJournalEntry({
        entryDate:     new Date(),
        comments:      "Opening Balance for the year",
        debitAccount:  cashAccountId,
        debitAmount:   Number(openingBalance),
        debitLineDesc: "Opening Balance",
        creditEntries: [{ account: openingBalAccountId, amount: Number(openingBalance), description: "Opening Balance" }],
      });
      await openingJournal.save();
      currentBalance = await computeAndSaveCashBalance(req.millId, cashAccountId);
    }

    res.status(201).json({ message: "Opening balance set successfully", cashbook, openingJournal, currentBalance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error saving opening balance" });
  }
};