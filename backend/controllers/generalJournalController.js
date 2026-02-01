import GeneralJournalEntry from "../models/GeneralJournalEntry.js";
import Account from "../models/Account.js";
import XLSX from "xlsx";
import fs from "fs";

const normalize = (str) =>
  str?.toString().replace(/\s+/g, " ").trim().toLowerCase();

// Excel date parser
const parseExcelDate = (value) => {
  if (!value) return new Date();
  if (value instanceof Date) return value;
  if (typeof value === "number") {
    const excelEpoch = new Date(1899, 11, 30);
    return new Date(excelEpoch.getTime() + value * 86400000);
  }
  return new Date(value);
};

export const bulkUploadJournalEntries = async (req, res) => {
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ message: "No Excel file uploaded" });
  }

  try {
    // 1️⃣ Read Excel
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    if (!rows.length) {
      return res.status(400).json({ message: "Excel file is empty" });
    }

    // 2️⃣ Build account map from DB
    const accounts = await Account.find();
    const accountMap = {};
    accounts.forEach((a) => {
      accountMap[normalize(a.accountName)] = a._id;
    });

    const errors = [];
    const entriesToInsert = [];

    // 3️⃣ Process rows
    rows.forEach((row, index) => {
      const rowNumber = index + 2; // Excel row number (header is row 1)
      try {
        const {
          entryDate,
          description,
          comments = "",
          debitAccount,
          debitAmount,
          ...rest
        } = row;

        // 3a️⃣ Required fields check
        if (!entryDate || !description || !debitAccount || !debitAmount) {
          throw `Missing required fields`;
        }

        // 3b️⃣ Map debit account
        const debitAccId = accountMap[normalize(debitAccount)];
        if (!debitAccId) throw `Invalid debit account: ${debitAccount}`;

        // 3c️⃣ Validate debit amount
        const debit = Number(debitAmount);
        if (isNaN(debit) || debit <= 0)
          throw `Invalid debit amount: ${debitAmount}`;

        // 3d️⃣ Map credit entries
        const creditEntries = [];
        let totalCredit = 0;

        Object.keys(rest).forEach((key) => {
          if (key.startsWith("creditAccount")) {
            const idx = key.replace("creditAccount", "");
            const creditAccName = rest[key];
            const creditAmt = rest[`creditAmount${idx}`];

            if (!creditAccName || !creditAmt) return; // skip empty

            const creditAccId = accountMap[normalize(creditAccName)];
            if (!creditAccId) throw `Invalid credit account: ${creditAccName}`;

            const amt = Number(creditAmt);
            if (isNaN(amt) || amt <= 0) {
              throw `Invalid credit amount for ${creditAccName}: ${creditAmt}`;
            }

            totalCredit += amt;
            creditEntries.push({ account: creditAccId, amount: amt });
          }
        });

        if (!creditEntries.length) throw "At least one credit entry required";

        if (Math.abs(debit - totalCredit) > 0.001) {
          throw `Debit (${debit}) does not match total credit (${totalCredit})`;
        }

        // 3e️⃣ Push valid entry
        entriesToInsert.push({
          entryDate: parseExcelDate(entryDate),
          description,
          comments,
          debitAccount: debitAccId,
          debitAmount: debit,
          creditEntries,
        });
      } catch (err) {
        errors.push({ row: rowNumber, error: err });
      }
    });

    // 4️⃣ Handle no valid rows
    if (!entriesToInsert.length) {
      return res.status(400).json({
        message: "No valid rows found",
        errors,
      });
    }

    // 5️⃣ Insert valid entries
    await GeneralJournalEntry.insertMany(entriesToInsert);

    return res.json({
      message: `${entriesToInsert.length} journal entries uploaded successfully`,
      failedRows: errors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message || "Failed to process Excel file",
    });
  }
};
// ✅ Create a new general journal entry (WITH MANUAL DATE SUPPORT)
export const createGeneralEntry = async (req, res) => {
  try {
    const {
      description,
      comments,
      debitAccount,
      debitAmount,
      debitLineDesc,
      creditEntries,
      entryDate,
    } = req.body;

    if (!debitLineDesc || !debitLineDesc.trim()) {
      return res.status(400).json({
        message: "Debit line description is required",
      });
    }


    if (
      !debitAccount ||
      !debitAmount ||
      !creditEntries ||
      creditEntries.length === 0
    ) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const totalCredit = creditEntries.reduce(
      (sum, c) => sum + (Number(c.amount) || 0),
      0,
    );

    if (Number(debitAmount) !== totalCredit) {
      return res.status(400).json({
        message: "Debit and Credit amounts must be equal.",
      });
    }

    // 🔹 Safely parse entryDate or fallback to today
    let parsedEntryDate = new Date();

    if (entryDate) {
      const [year, month, day] = entryDate.split("-").map(Number);
      parsedEntryDate = new Date(year, month - 1, day);
    }
    const newEntry = new GeneralJournalEntry({
      description,
      comments,
      debitAccount,
      debitAmount,
      debitLineDesc, // ✅ include this
      creditEntries,
      entryDate: parsedEntryDate,
    });


    await newEntry.save();

    res.status(201).json({
      message: "Journal entry recorded successfully.",
      entry: newEntry,
    });
  } catch (error) {
    console.error("Error creating journal entry:", error);
    res.status(500).json({
      message: error.message || "Server error while saving journal entry.",
    });
  }
};

// ✅ Get all general journal entries (unchanged)
export const getGeneralEntries = async (req, res) => {
  try {
    const entries = await GeneralJournalEntry.find()
      .populate("debitAccount", "accountName accountType")
      .populate("creditEntries.account", "accountName accountType")
      .sort({ entryDate: -1 }); // ✅ FIX

    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    res.status(500).json({ message: "Failed to fetch journal entries." });
  }
};
// ✅ Delete a journal entry (unchanged)
export const deleteGeneralEntry = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Entry ID is required." });
    }

    const entry = await GeneralJournalEntry.findById(id);
    if (!entry) {
      return res.status(404).json({ message: "Journal entry not found." });
    }

    await entry.deleteOne(); // safe delete

    res.status(200).json({ message: "Journal entry deleted successfully." });
  } catch (error) {
    console.error("Error deleting journal entry:", error);
    res
      .status(500)
      .json({ message: "Server error while deleting journal entry." });
  }
};
// PUT /update-journal-entry/:id
export const updateGeneralEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEntry = await GeneralJournalEntry.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
    );
    if (!updatedEntry)
      return res.status(404).json({ message: "Entry not found." });
    res.json({ message: "Updated successfully", entry: updatedEntry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
