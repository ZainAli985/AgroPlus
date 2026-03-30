// controllers/ledgerController.js
// ─────────────────────────────────────────────────────────────────────────────
// FIX: getLedgerByAccount now returns SIGNED balance (negative = overdraft/deficit)
// and separates openingDebit/openingCredit so the frontend can display running OB.
// ─────────────────────────────────────────────────────────────────────────────
import mongoose from "mongoose";
import { getModels } from "../config/millDB.js";

export const getLedger = async (req, res) => {
  try {
    const { GeneralJournalEntry } = getModels(req.millId);
    const { startDate, endDate, account } = req.query;
    let query = {};

    if (startDate || endDate) {
      query.entryDate = {};
      if (startDate) query.entryDate.$gte = new Date(startDate);
      if (endDate)   query.entryDate.$lte = new Date(endDate);
    }

    let entries = await GeneralJournalEntry.find(query)
      .populate("debitAccount", "accountName")
      .populate("creditEntries.account", "accountName")
      .sort({ entryDate: 1 });

    if (account) {
      const acc = account.toLowerCase();
      entries = entries.filter(
        e =>
          e.debitAccount?.accountName.toLowerCase().includes(acc) ||
          e.creditEntries.some(c => c.account?.accountName.toLowerCase().includes(acc))
      );
    }

    res.status(200).json({ success: true, entries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLedgerByAccount = async (req, res) => {
  try {
    const { GeneralJournalEntry, Account } = getModels(req.millId);
    const { accountId } = req.params;
    const { startDate, endDate } = req.query;

    if (!mongoose.Types.ObjectId.isValid(accountId))
      return res.status(400).json({ success: false, message: "Invalid account ID" });

    let dateFilter = {};
    if (startDate || endDate) {
      dateFilter.entryDate = {};
      if (startDate) dateFilter.entryDate.$gte = new Date(startDate);
      if (endDate)   dateFilter.entryDate.$lte = new Date(endDate);
    }

    const [entries, account] = await Promise.all([
      GeneralJournalEntry.find({
        ...dateFilter,
        $or: [{ debitAccount: accountId }, { "creditEntries.account": accountId }],
      })
        .populate("debitAccount", "accountName accountType")
        .populate("creditEntries.account", "accountName accountType")
        .sort({ entryDate: 1, createdAt: 1 }),
      Account.findById(accountId),
    ]);

    if (!account) return res.status(404).json({ success: false, message: "Account not found" });

    const accObjId = new mongoose.Types.ObjectId(accountId);

    // Aggregate journal movements for this account
    const [debitAgg, creditAgg] = await Promise.all([
      GeneralJournalEntry.aggregate([
        { $match: { ...dateFilter, debitAccount: accObjId } },
        { $group: { _id: null, total: { $sum: "$debitAmount" } } },
      ]),
      GeneralJournalEntry.aggregate([
        { $match: dateFilter },
        { $unwind: "$creditEntries" },
        { $match: { "creditEntries.account": accObjId } },
        { $group: { _id: null, total: { $sum: "$creditEntries.amount" } } },
      ]),
    ]);

    const journalDebit  = debitAgg[0]?.total  || 0;
    const journalCredit = creditAgg[0]?.total || 0;

    // ── Balance logic ────────────────────────────────────────────────────────
    // RULE: account.totalDebit/totalCredit = OPENING BALANCE ONLY (never modified by JEs)
    // For protected CASH IN HAND: its stored totalDebit/totalCredit/balance are
    //   already maintained by recomputeAndSaveCashBalance — use them directly.
    // For all other accounts: compute balance from stored opening + journal movements.
    let totalDebit, totalCredit, balance, openingDebit, openingCredit;

    if (account.isProtected) {
      // Cash In Hand — opening already factored into stored totals
      totalDebit    = account.totalDebit  || 0;
      totalCredit   = account.totalCredit || 0;
      balance       = account.balance     || 0;  // signed — can be negative
      openingDebit  = 0;
      openingCredit = 0;
    } else {
      // Opening balances (stored, never modified by JEs)
      openingDebit  = account.totalDebit  || 0;
      openingCredit = account.totalCredit || 0;
      totalDebit    = openingDebit  + journalDebit;
      totalCredit   = openingCredit + journalCredit;
      const at = account.accountType;
      // SIGNED balance — negative means abnormal side (e.g. bank overdraft)
      balance = (at === "Assets" || at === "Expense")
        ? totalDebit - totalCredit
        : totalCredit - totalDebit;
    }

    res.status(200).json({
      success: true,
      account: {
        ...account.toObject(),
        totalDebit,      // cumulative DR (opening + journal)
        totalCredit,     // cumulative CR (opening + journal)
        balance,         // SIGNED — negative = deficit/overdraft
        openingDebit,    // opening balance debit component
        openingCredit,   // opening balance credit component
        journalDebit,    // period journal DR movements
        journalCredit,   // period journal CR movements
      },
      entries,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLedgerByReference = async (req, res) => {
  try {
    const { GeneralJournalEntry } = getModels(req.millId);
    const { ref } = req.params;
    let entry;

    if (mongoose.Types.ObjectId.isValid(ref)) {
      entry = await GeneralJournalEntry.findById(ref)
        .populate("debitAccount", "accountName")
        .populate("creditEntries.account", "accountName");
    } else {
      entry = await GeneralJournalEntry.findOne({ reference: ref })
        .populate("debitAccount", "accountName")
        .populate("creditEntries.account", "accountName");
    }

    if (!entry) return res.status(404).json({ success: false, message: "Ledger entry not found" });
    res.status(200).json({ success: true, entry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getReferences = async (req, res) => {
  try {
    const { Account } = getModels(req.millId);
    const accounts = await Account.find().select("_id accountName LedgerRef");
    const result = accounts
      .filter(a => a.LedgerRef)
      .map(a => ({ ref: a.LedgerRef.toString(), accountId: a._id, accountName: a.accountName }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};