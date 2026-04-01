// controllers/cashbookController.js
import mongoose from "mongoose";
import { getModels } from "../config/millDB.js";

const PKT_OFFSET_MS = 5 * 60 * 60 * 1000; // UTC+5

// ─── Get the mill's protected CASH IN HAND account (lazy-create if missing) ──
async function getCashAccount(millId) {
  const { Account } = getModels(millId);
  let acc = await Account.findOne({ isProtected: true });
  if (acc) return acc;
  const lastAcc = await Account.findOne().sort({ createdAt: -1 });
  let lastNum = 0;
  if (lastAcc?.autoAccountId) lastNum = parseInt(lastAcc.autoAccountId.split("-")[1] || "0");
  const autoAccountId = "ACC-" + (lastNum + 1).toString().padStart(6, "0");
  acc = await Account.create({
    autoAccountId, manualAccountId: "CASH-001",
    accountType: "Assets", subAccountType: "Current Assets",
    accountName: "CASH IN HAND", LedgerRef: "CASH",
    isProtected: true, balance: 0,
  });
  console.log(`✅ CASH IN HAND lazily created for ${millId}: ${acc._id}`);
  return acc;
}

// ─── PKT-aware date range ─────────────────────────────────────────────────────
// Returns UTC start/end that correspond to a PKT calendar day.
// PKT midnight = UTC midnight - 5h  →  startUtc = Date.UTC(yr,mo,dy) - 5h
function getPKTDateRange(dateStr) {
  let yr, mo, dy;
  if (dateStr) {
    [yr, mo, dy] = dateStr.split("-").map(Number);
  } else {
    const pkt = new Date(Date.now() + PKT_OFFSET_MS);
    yr = pkt.getUTCFullYear();
    mo = pkt.getUTCMonth() + 1;
    dy = pkt.getUTCDate();
  }
  const pktMidnightMs = Date.UTC(yr, mo - 1, dy);
  const startUtc = new Date(pktMidnightMs - PKT_OFFSET_MS);          // prev-day 19:00 UTC
  const endUtc   = new Date(startUtc.getTime() + 24 * 60 * 60 * 1000 - 1);
  return { startUtc, endUtc, yr, mo, dy };
}

function isOpeningBalanceEntry(j) {
  return j.debitLineDesc === "Opening Balance" || j.comments === "Opening Balance for the year";
}

// ─── BUG FIX #1 ──────────────────────────────────────────────────────────────
// Root cause: activateSeason creates a Season document but never creates the
// Cashbook document. CashbookForm calls /cashbook-report, finds no Cashbook
// for the current year, and shows "Set Opening Balance".
//
// Fix: lazily create Cashbook from the active Season on first access.
// Called at the top of getCashbookReport AND getDailyCashbook so both entry
// points are covered without requiring a Profilecontroller change.
async function ensureCashbookForYear(millId, year) {
  const { Cashbook, Season, Account } = getModels(millId);
  let cashbook = await Cashbook.findOne({ year });
  if (cashbook) return cashbook;

  const activeSeason = await Season.findOne({ isActive: true });
  if (!activeSeason) return null;

  const openingBalance = activeSeason.openingBalance || 0;
  cashbook = await Cashbook.create({ year, openingBalance, entries: [] });
  console.log(`✅ Cashbook auto-created for mill ${millId} year ${year} (opening: Rs ${openingBalance})`);

  // Sync Cash In Hand balance only when it is still 0 (first-time init)
  const cashAcc = await Account.findOne({ isProtected: true });
  if (cashAcc && cashAcc.balance === 0 && openingBalance > 0) {
    await Account.findByIdAndUpdate(cashAcc._id, {
      balance: openingBalance, totalDebit: openingBalance, totalCredit: 0,
    });
    console.log(`✅ Cash In Hand initialised to Rs ${openingBalance} for mill ${millId}`);
  }
  return cashbook;
}

// ─── Recompute Cash In Hand balance from all journal entries ──────────────────
async function recomputeAndSaveCashBalance(millId, cashAccountId) {
  const { Cashbook, GeneralJournalEntry, Account } = getModels(millId);
  const cashId = new mongoose.Types.ObjectId(cashAccountId);
  const year   = new Date().getFullYear();

  // Ensure cashbook exists before computing (Bug #1 fix also applied here)
  await ensureCashbookForYear(millId, year);
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
    totalDebit: openingBalance + allTimeCashIn, totalCredit: allTimeCashOut, balance,
  });
  return balance;
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/cashbook  AND  GET /api/cashbook-daily
// ─────────────────────────────────────────────────────────────────────────────
export const getDailyCashbook = async (req, res) => {
  try {
    const cashAcc = await getCashAccount(req.millId);
    const cashAccountId = cashAcc._id.toString();
    const { GeneralJournalEntry } = getModels(req.millId);

    // BUG FIX #2: Use PKT-correct date range.
    // Old code: getTodayUtcRange() computed startUtc as pktMidnightMs - PKT_OFFSET_MS which is correct,
    // but for the ?date= branch it did NOT subtract PKT_OFFSET, so entries appeared on the wrong day.
    const { startUtc, endUtc, yr, mo, dy } = getPKTDateRange(req.query.date || null);
    const year = yr;

    // BUG FIX #1: Ensure cashbook exists for this year before computing balance
    await ensureCashbookForYear(req.millId, year);
    const { Cashbook } = getModels(req.millId);
    const cashbook = await Cashbook.findOne({ year });
    const openingBalance = cashbook ? cashbook.openingBalance : 0;

    // For today: recompute live so edits/deletes from journal page are reflected immediately
    // For historical dates: use stored balance (fast path)
    const isHistorical = !!req.query.date;
    const currentBalance = isHistorical
      ? (cashAcc.balance ?? 0)
      : await recomputeAndSaveCashBalance(req.millId, cashAccountId);

    const cashId = new mongoose.Types.ObjectId(cashAccountId);

    // BUG FIX #3: Query captures ALL journal entries involving Cash In Hand regardless
    // of origin (CashbookForm, GeneralJournalEntry form, cheque book, etc.)
    // The daily cashbook IS the ledger of the Cash In Hand account.
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

    const cashEntries = todayJournals.filter(j => !isOpeningBalanceEntry(j));
    let totalCashIn = 0, totalCashOut = 0;

    const entries = cashEntries.map(j => {
      const isCashDebit = j.debitAccount?._id?.toString() === cashAccountId;
      let accounts, description, amount, type;

      if (isCashDebit) {
        type        = "credit";  // cash IN
        amount      = j.debitAmount;
        accounts    = j.creditEntries.map(ce => ce.account?.accountName || "Unknown");
        description = j.creditEntries.map(ce => ce.description).filter(Boolean).join(", ") || j.debitLineDesc || "";
        totalCashIn += amount;
      } else {
        type    = "debit";  // cash OUT
        const cashCredit = j.creditEntries.find(ce => ce.account?._id?.toString() === cashAccountId);
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

    res.status(200).json({
      date:           `${yr}-${String(mo).padStart(2,"0")}-${String(dy).padStart(2,"0")}`,
      openingBalance,
      currentBalance,
      cashAccountId,
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
    const year = new Date().getFullYear();

    // BUG FIX #1: Auto-create cashbook from active season BEFORE fetching
    // This is the entry point CashbookForm hits — must run here.
    await ensureCashbookForYear(req.millId, year);

    const { Cashbook } = getModels(req.millId);
    const cashbooks      = await Cashbook.find();
    const currentBalance = await recomputeAndSaveCashBalance(req.millId, cashAccountId);

    res.status(200).json({ cashbooks, currentBalance, cashAccountId });
  } catch (err) {
    res.status(500).json({ message: "Server error fetching cashbooks" });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/cashbook-entry  (manual opening balance — only if no active season)
// ─────────────────────────────────────────────────────────────────────────────
export const createCashbookEntry = async (req, res) => {
  try {
    const { openingBalance, openingBalanceAccountId } = req.body;
    if (!openingBalance || Number(openingBalance) <= 0)
      return res.status(400).json({ message: "Opening balance must be greater than 0" });

    const { Cashbook, GeneralJournalEntry, Account } = getModels(req.millId);
    const year = new Date().getFullYear();

    const existing = await Cashbook.findOne({ year });
    if (existing)
      return res.status(400).json({ message: "Opening balance already set for this year" });

    const cashAcc = await getCashAccount(req.millId);
    const cashAccountId = cashAcc._id.toString();

    const cashbook = new Cashbook({ year, openingBalance: Number(openingBalance), entries: [] });
    await cashbook.save();

    await Account.findByIdAndUpdate(cashAccountId, {
      balance: Number(openingBalance), totalDebit: Number(openingBalance), totalCredit: 0,
    });

    let openingJournal = null;
    if (openingBalanceAccountId) {
      openingJournal = new GeneralJournalEntry({
        entryDate:     new Date(),
        comments:      "Opening Balance for the year",
        debitAccount:  cashAccountId,
        debitAmount:   Number(openingBalance),
        debitLineDesc: "Opening Balance",
        creditEntries: [{ account: openingBalanceAccountId, amount: Number(openingBalance), description: "Opening Balance" }],
      });
      await openingJournal.save();
    }

    const currentBalance = await recomputeAndSaveCashBalance(req.millId, cashAccountId);
    res.status(201).json({ message: "Opening balance set successfully", cashbook, openingJournal, currentBalance, cashAccountId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error saving opening balance" });
  }
};