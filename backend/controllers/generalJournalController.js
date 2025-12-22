import GeneralJournalEntry from "../models/GeneralJournalEntry.js";
import Account from "../models/Account.js";

// ✅ Create a new general journal entry (WITH MANUAL DATE SUPPORT)
export const createGeneralEntry = async (req, res) => {
  try {
    const {
      description,
      comments,
      debitAccount,
      debitAmount,
      creditEntries,
      entryDate, // 🔹 optional manual date
    } = req.body;

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
      0
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
