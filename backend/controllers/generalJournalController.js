import GeneralJournalEntry from "../models/GeneralJournalEntry.js";
import Account from "../models/Account.js";
import Cashbook from "../models/Cashbook.js";
import XLSX from "xlsx";
import mongoose from "mongoose";

const CASH_ACCOUNT_ID = "692fca6790d96dd63e44b12a";

const normalize = (str) =>
  str?.toString().replace(/\s+/g, " ").trim().toLowerCase();

const parseExcelDate = (value) => {
  if (!value) return new Date();
  if (value instanceof Date) return value;
  if (typeof value === "number") {
    const excelEpoch = new Date(1899, 11, 30);
    return new Date(excelEpoch.getTime() + value * 86400000);
  }
  return new Date(value);
};

/**
 * Single source of truth for cash balance.
 * Formula: openingBalance + allTimeCashIn - allTimeCashOut
 *
 * Excludes the opening balance journal entry on both sides to avoid double-counting.
 * Writes result back to Account document so ledger/reports stay in sync.
 */
const recalcCashBalance = async () => {
  const cashId = new mongoose.Types.ObjectId(CASH_ACCOUNT_ID);
  const year   = new Date().getFullYear();

  const cashbook = await Cashbook.findOne({ year });
  const openingBalance = cashbook ? cashbook.openingBalance : 0;

  const [debitAgg, creditAgg] = await Promise.all([
    // DR cash entries = cash coming IN (exclude opening balance)
    GeneralJournalEntry.aggregate([
      {
        $match: {
          debitAccount:  cashId,
          description:   { $ne: "Opening Balance" },
          debitLineDesc: { $ne: "Opening Balance" },
        },
      },
      { $group: { _id: null, total: { $sum: "$debitAmount" } } },
    ]),
    // CR cash entries = cash going OUT (exclude opening balance)
    GeneralJournalEntry.aggregate([
      {
        $match: {
          description:   { $ne: "Opening Balance" },
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

  await Account.findByIdAndUpdate(CASH_ACCOUNT_ID, {
    totalDebit:  openingBalance + allTimeCashIn,
    totalCredit: allTimeCashOut,
    balance,
  });

  return balance;
};

// ─────────────────────────────────────────────────────────────────────────────
// Bulk Upload
// ─────────────────────────────────────────────────────────────────────────────
export const bulkUploadJournalEntries = async (req, res) => {
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ message: "No Excel file uploaded" });
  }

  try {
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    if (!rows.length) return res.status(400).json({ message: "Excel file is empty" });

    const accounts = await Account.find();
    const accountMap = {};
    accounts.forEach((a) => { accountMap[normalize(a.accountName)] = a._id; });

    const errors = [];
    const entriesToInsert = [];

    rows.forEach((row, index) => {
      const rowNumber = index + 2;
      try {
        const { entryDate, description, comments = "", debitAccount, debitAmount, ...rest } = row;

        if (!entryDate || !description || !debitAccount || !debitAmount) throw `Missing required fields`;

        const debitAccId = accountMap[normalize(debitAccount)];
        if (!debitAccId) throw `Invalid debit account: ${debitAccount}`;

        const debit = Number(debitAmount);
        if (isNaN(debit) || debit <= 0) throw `Invalid debit amount: ${debitAmount}`;

        const creditEntries = [];
        let totalCredit = 0;

        Object.keys(rest).forEach((key) => {
          if (key.startsWith("creditAccount")) {
            const idx = key.replace("creditAccount", "");
            const creditAccName = rest[key];
            const creditAmt = rest[`creditAmount${idx}`];
            if (!creditAccName || !creditAmt) return;
            const creditAccId = accountMap[normalize(creditAccName)];
            if (!creditAccId) throw `Invalid credit account: ${creditAccName}`;
            const amt = Number(creditAmt);
            if (isNaN(amt) || amt <= 0) throw `Invalid credit amount for ${creditAccName}: ${creditAmt}`;
            totalCredit += amt;
            creditEntries.push({ account: creditAccId, amount: amt });
          }
        });

        if (!creditEntries.length) throw "At least one credit entry required";
        if (Math.abs(debit - totalCredit) > 0.001) throw `Debit (${debit}) does not match total credit (${totalCredit})`;

        entriesToInsert.push({ entryDate: parseExcelDate(entryDate), description, comments, debitAccount: debitAccId, debitAmount: debit, creditEntries });
      } catch (err) {
        errors.push({ row: rowNumber, error: err });
      }
    });

    if (!entriesToInsert.length) return res.status(400).json({ message: "No valid rows found", errors });

    await GeneralJournalEntry.insertMany(entriesToInsert);
    await recalcCashBalance();

    return res.json({ message: `${entriesToInsert.length} journal entries uploaded successfully`, failedRows: errors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Failed to process Excel file" });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Create General Journal Entry
// ─────────────────────────────────────────────────────────────────────────────
export const createGeneralEntry = async (req, res) => {
  try {
    const { description, comments, debitAccount, debitAmount, debitLineDesc, creditEntries, entryDate } = req.body;

    if (!debitLineDesc || !debitLineDesc.trim()) {
      return res.status(400).json({ message: "Debit line description is required" });
    }

    if (!debitAccount || !debitAmount || !creditEntries || creditEntries.length === 0) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const totalCredit = creditEntries.reduce((sum, c) => sum + (Number(c.amount) || 0), 0);

    if (Number(debitAmount) !== totalCredit) {
      return res.status(400).json({ message: "Debit and Credit amounts must be equal." });
    }

    // Store as PKT midnight in UTC so daily cashbook date-range queries work correctly
    let parsedEntryDate = new Date();
    if (entryDate) {
      const [year, month, day] = entryDate.split("-").map(Number);
      const PKT_OFFSET_MS = 5 * 60 * 60 * 1000;
      parsedEntryDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0) - PKT_OFFSET_MS);
    }

    const newEntry = new GeneralJournalEntry({
      description, comments, debitAccount, debitAmount, debitLineDesc, creditEntries,
      entryDate: parsedEntryDate,
    });

    await newEntry.save();

    // Recompute and return authoritative balance
    const currentBalance = await recalcCashBalance();

    res.status(201).json({
      message: "Journal entry recorded successfully.",
      entry: newEntry,
      currentBalance,
    });
  } catch (error) {
    console.error("Error creating journal entry:", error);
    res.status(500).json({ message: error.message || "Server error while saving journal entry." });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Get All General Journal Entries
// ─────────────────────────────────────────────────────────────────────────────
export const getGeneralEntries = async (req, res) => {
  try {
    const entries = await GeneralJournalEntry.find()
      .populate("debitAccount", "accountName accountType")
      .populate("creditEntries.account", "accountName accountType")
      .sort({ entryDate: -1 });
    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    res.status(500).json({ message: "Failed to fetch journal entries." });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Delete General Journal Entry
// ─────────────────────────────────────────────────────────────────────────────
export const deleteGeneralEntry = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Entry ID is required." });

    const entry = await GeneralJournalEntry.findById(id);
    if (!entry) return res.status(404).json({ message: "Journal entry not found." });

    await entry.deleteOne();
    await recalcCashBalance();

    res.status(200).json({ message: "Journal entry deleted successfully." });
  } catch (error) {
    console.error("Error deleting journal entry:", error);
    res.status(500).json({ message: "Server error while deleting journal entry." });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Update General Journal Entry
// ─────────────────────────────────────────────────────────────────────────────
export const updateGeneralEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEntry = await GeneralJournalEntry.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEntry) return res.status(404).json({ message: "Entry not found." });

    await recalcCashBalance();

    res.json({ message: "Updated successfully", entry: updatedEntry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};