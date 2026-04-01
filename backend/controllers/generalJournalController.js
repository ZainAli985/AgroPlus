// controllers/generalJournalController.js
import mongoose from "mongoose";
import XLSX from "xlsx";
import { getModels } from "../config/millDB.js";

const normalize = (str) => str?.toString().replace(/\s+/g, " ").trim().toLowerCase();

const parseExcelDate = (value) => {
  if (!value) return new Date();
  if (value instanceof Date) return value;
  if (typeof value === "number")
    return new Date(new Date(1899, 11, 30).getTime() + value * 86400000);
  return new Date(value);
};

// ── Cash balance recompute ────────────────────────────────────────────────────
async function recalcCashBalance(millId, cashAccountId) {
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
    totalDebit: openingBalance + allTimeCashIn, totalCredit: allTimeCashOut, balance,
  });
  return balance;
}

// ── Non-cash account balance recompute ────────────────────────────────────────
async function recalcNonCashBalance(millId, accountId) {
  const { GeneralJournalEntry, Account } = getModels(millId);
  const accId   = new mongoose.Types.ObjectId(accountId.toString());
  const account = await Account.findById(accountId);
  if (!account) return null;

  const openingDebit  = account.totalDebit  || 0;
  const openingCredit = account.totalCredit || 0;

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

  const journalDebit  = dAgg[0]?.total || 0;
  const journalCredit = cAgg[0]?.total || 0;
  const at = account.accountType;

  const balance = (at === "Assets" || at === "Expense")
    ? (openingDebit + journalDebit) - (openingCredit + journalCredit)
    : (openingCredit + journalCredit) - (openingDebit + journalDebit);

  await Account.findByIdAndUpdate(accountId, { balance });
  return balance;
}

// ── Recalculate every account touched by a set of account IDs ────────────────
async function recalcAffected(millId, accountIdSet, cashAccountId) {
  const { Account } = getModels(millId);
  let currentBalance = null;
  for (const accId of accountIdSet) {
    if (!accId) continue;
    try {
      const account = await Account.findById(accId);
      if (!account) continue;
      if (account.isProtected || accId.toString() === cashAccountId?.toString()) {
        currentBalance = await recalcCashBalance(millId, accId);
      } else {
        await recalcNonCashBalance(millId, accId);
      }
    } catch (e) {
      console.warn(`recalcAffected failed for ${accId}:`, e.message);
    }
  }
  return currentBalance;
}

function collectJEAccounts(je) {
  const ids = new Set();
  if (je?.debitAccount) {
    const id = je.debitAccount?._id?.toString() || je.debitAccount?.toString();
    if (id) ids.add(id);
  }
  (je?.creditEntries || []).forEach(ce => {
    const id = ce?.account?._id?.toString() || ce?.account?.toString();
    if (id) ids.add(id);
  });
  return ids;
}

// ── POST /api/create-journal-entry ───────────────────────────────────────────
export const createGeneralEntry = async (req, res) => {
  try {
    const { GeneralJournalEntry } = getModels(req.millId);
    const { comments, debitAccount, debitAmount, debitLineDesc, creditEntries, entryDate, cashAccountId } = req.body;

    if (!debitLineDesc?.trim())
      return res.status(400).json({ message: "Debit line description is required" });
    if (!debitAccount || !debitAmount || !creditEntries?.length)
      return res.status(400).json({ message: "Required fields are missing." });

    const totalCredit = creditEntries.reduce((sum, c) => sum + (Number(c.amount) || 0), 0);
    if (Number(debitAmount) !== totalCredit)
      return res.status(400).json({ message: "Debit and Credit amounts must be equal." });

    // ── BUG FIX #2: Date timezone fix ────────────────────────────────────────
    // OLD (broken): new Date(Date.UTC(year, month-1, day, 0,0,0,0) - 5*3600000)
    //   This stores the entry at UTC 19:00 of the PREVIOUS day.
    //   For a user making an entry at any time PKT, the cashbook date query
    //   (which correctly queries PKT-midnight → PKT-23:59) misses entries stored
    //   the previous UTC day entirely, so they appear a day early.
    //
    // NEW (fixed): store at UTC 07:00 (= PKT 12:00 noon).
    //   PKT midnight → UTC 23:59 = [prev-day 19:00 UTC, same-day 18:59 UTC].
    //   UTC 07:00 is safely inside this range for every possible PKT entry time.
    let parsedEntryDate = new Date();
    if (entryDate) {
      const [year, month, day] = entryDate.split("-").map(Number);
      parsedEntryDate = new Date(Date.UTC(year, month - 1, day, 7, 0, 0, 0));
      //                                                          ↑
      //   UTC 07:00 = PKT 12:00. Always within [prev-day 19:00 UTC, day 18:59 UTC].
    }

    const newEntry = new GeneralJournalEntry({
      comments, debitAccount, debitAmount, debitLineDesc, creditEntries,
      entryDate: parsedEntryDate,
    });
    await newEntry.save();

    const affected = collectJEAccounts(newEntry);
    const currentBalance = await recalcAffected(req.millId, affected, cashAccountId);

    res.status(201).json({ message: "Journal entry recorded successfully.", entry: newEntry, currentBalance });
  } catch (error) {
    console.error("Error creating journal entry:", error);
    res.status(500).json({ message: error.message || "Server error while saving journal entry." });
  }
};

// ── GET /api/get-journal-entries ─────────────────────────────────────────────
export const getGeneralEntries = async (req, res) => {
  try {
    const { GeneralJournalEntry } = getModels(req.millId);
    const entries = await GeneralJournalEntry.find()
      .populate("debitAccount", "accountName accountType")
      .populate("creditEntries.account", "accountName accountType")
      .sort({ entryDate: -1 });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch journal entries." });
  }
};

// ── DELETE /api/delete-journal-entry/:id ─────────────────────────────────────
export const deleteGeneralEntry = async (req, res) => {
  try {
    const { GeneralJournalEntry } = getModels(req.millId);
    const { cashAccountId } = req.query;

    const entry = await GeneralJournalEntry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Journal entry not found." });

    const affected = collectJEAccounts(entry);
    await entry.deleteOne();

    // BUG FIX #3 (backend side): recalcAffected now always runs for all touched
    // accounts. cashAccountId comes from query string (?cashAccountId=xxx).
    // The frontend fix (ViewGeneralEntries.jsx) now always sends it.
    const currentBalance = await recalcAffected(req.millId, affected, cashAccountId);
    res.status(200).json({ message: "Journal entry deleted successfully.", currentBalance });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting journal entry." });
  }
};

// ── PUT /api/update-journal-entry/:id ────────────────────────────────────────
export const updateGeneralEntry = async (req, res) => {
  try {
    const { GeneralJournalEntry } = getModels(req.millId);
    const { cashAccountId, ...updateData } = req.body;

    const oldEntry = await GeneralJournalEntry.findById(req.params.id);
    if (!oldEntry) return res.status(404).json({ message: "Entry not found." });

    const affected = collectJEAccounts(oldEntry);

    // Apply the same date fix for edits
    if (updateData.entryDate && typeof updateData.entryDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(updateData.entryDate)) {
      const [year, month, day] = updateData.entryDate.split("-").map(Number);
      updateData.entryDate = new Date(Date.UTC(year, month - 1, day, 7, 0, 0, 0));
    }

    const updatedEntry = await GeneralJournalEntry.findByIdAndUpdate(
      req.params.id, updateData, { new: true }
    );

    if (updateData.debitAccount) affected.add(updateData.debitAccount?.toString());
    if (Array.isArray(updateData.creditEntries)) {
      updateData.creditEntries.forEach(ce => { if (ce?.account) affected.add(ce.account.toString()); });
    }
    if (cashAccountId) affected.add(cashAccountId.toString());

    const currentBalance = await recalcAffected(req.millId, affected, cashAccountId);

    res.json({ message: "Updated successfully", entry: updatedEntry, currentBalance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── POST /api/bulk-upload-journal-entries ────────────────────────────────────
export const bulkUploadJournalEntries = async (req, res) => {
  if (!req.file?.buffer) return res.status(400).json({ message: "No Excel file uploaded" });

  try {
    const { GeneralJournalEntry, Account } = getModels(req.millId);
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const rows     = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: "" });
    if (!rows.length) return res.status(400).json({ message: "Excel file is empty" });

    const accounts   = await Account.find();
    const accountMap = {};
    accounts.forEach(a => { accountMap[normalize(a.accountName)] = a._id; });

    const errors = [], entriesToInsert = [];

    rows.forEach((row, index) => {
      const rowNumber = index + 2;
      try {
        const { entryDate, comments = "", debitAccount, debitAmount, ...rest } = row;
        if (!entryDate || !debitAccount || !debitAmount) throw "Missing required fields";

        const debitAccId = accountMap[normalize(debitAccount)];
        if (!debitAccId) throw `Invalid debit account: ${debitAccount}`;

        const debit = Number(debitAmount);
        if (isNaN(debit) || debit <= 0) throw "Invalid debit amount";

        const creditEntries = [];
        let totalCredit = 0;

        Object.keys(rest).forEach(key => {
          if (key.startsWith("creditAccount")) {
            const idx     = key.replace("creditAccount", "");
            const accName = rest[key];
            const amt     = rest[`creditAmount${idx}`];
            if (!accName || !amt) return;
            const accId = accountMap[normalize(accName)];
            if (!accId) throw `Invalid credit account: ${accName}`;
            const n = Number(amt);
            if (isNaN(n) || n <= 0) throw `Invalid credit amount for ${accName}`;
            totalCredit += n;
            creditEntries.push({ account: accId, amount: n, description: "" });
          }
        });

        if (!creditEntries.length) throw "At least one credit entry required";
        if (Math.abs(debit - totalCredit) > 0.001) throw "Debit/Credit mismatch";

        const rawDate = parseExcelDate(entryDate);
        entriesToInsert.push({
          // Same date fix applied to bulk uploads
          entryDate: new Date(Date.UTC(rawDate.getFullYear(), rawDate.getMonth(), rawDate.getDate(), 7, 0, 0, 0)),
          comments, debitAccount: debitAccId, debitAmount: debit,
          debitLineDesc: String(row.description || ""),
          creditEntries,
        });
      } catch (err) {
        errors.push({ row: rowNumber, error: err });
      }
    });

    if (!entriesToInsert.length) return res.status(400).json({ message: "No valid rows found", errors });

    await GeneralJournalEntry.insertMany(entriesToInsert);
    res.json({ message: `${entriesToInsert.length} entries uploaded`, failedRows: errors });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to process file" });
  }
};