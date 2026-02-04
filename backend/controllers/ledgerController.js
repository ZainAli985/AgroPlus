import GeneralJournal from "../models/GeneralJournalEntry.js";
import PurchaseInvoice from "../models/PurchaseInvoice.js";
import SalesInvoice from "../models/SalesInvoice.js";
import mongoose from "mongoose";
import Account from "../models/Account.js";

/**
 * 🔹 GET /ledger
 * Optional query params:
 * startDate, endDate, account
 * (Mostly for reports / exports)
 */
export const getLedger = async (req, res) => {
  try {
    const { startDate, endDate, account } = req.query;

    let query = {};

    if (startDate || endDate) {
      query.entryDate = {};
      if (startDate) query.entryDate.$gte = new Date(startDate);
      if (endDate) query.entryDate.$lte = new Date(endDate);
    }

    let entries = await GeneralJournal.find(query)
      .populate("debitAccount", "accountName")
      .populate("creditEntries.account", "accountName")
      .sort({ entryDate: 1 });

    if (account) {
      const acc = account.toLowerCase();
      entries = entries.filter(
        (e) =>
          e.debitAccount?.accountName.toLowerCase().includes(acc) ||
          e.creditEntries.some((c) =>
            c.account?.accountName.toLowerCase().includes(acc),
          ),
      );
    }

    res.status(200).json({
      success: true,
      entries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/**
 * 🔹 GET /ledger/account/:accountId
 * Query params:
 * startDate, endDate
 */
export const getLedgerByAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { startDate, endDate } = req.query;

    if (!mongoose.Types.ObjectId.isValid(accountId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid account ID",
      });
    }

    let dateFilter = {};
    if (startDate || endDate) {
      dateFilter.entryDate = {};
      if (startDate) dateFilter.entryDate.$gte = new Date(startDate);
      if (endDate) dateFilter.entryDate.$lte = new Date(endDate);
    }

    // ------------------ ENTRIES ------------------
    const entries = await GeneralJournal.find({
      ...dateFilter,
      $or: [
        { debitAccount: accountId },
        { "creditEntries.account": accountId },
      ],
    })
      .populate("debitAccount", "accountName")
      .populate("creditEntries.account", "accountName")
      .sort({ entryDate: 1 });

    // ------------------ TOTAL DEBIT ------------------
    const debitAgg = await GeneralJournal.aggregate([
      {
        $match: {
          ...dateFilter,
          debitAccount: new mongoose.Types.ObjectId(accountId),
        },
      },
      { $group: { _id: null, total: { $sum: "$debitAmount" } } },
    ]);

    const totalDebit = debitAgg[0]?.total || 0;

    // ------------------ TOTAL CREDIT ------------------
    const creditAgg = await GeneralJournal.aggregate([
      { $match: { ...dateFilter } },
      { $unwind: "$creditEntries" },
      {
        $match: {
          "creditEntries.account": new mongoose.Types.ObjectId(accountId),
        },
      },
      { $group: { _id: null, total: { $sum: "$creditEntries.amount" } } },
    ]);

    const totalCredit = creditAgg[0]?.total || 0;

    const balance = totalDebit - totalCredit;

    const account = await Account.findById(accountId);

    res.status(200).json({
      success: true,
      account: {
        ...account.toObject(),
        totalDebit,
        totalCredit,
        balance,
      },
      entries,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * 🔹 GET /ledger/ref/:ref
 * ref = journal _id or future reference code
 */
export const getLedgerByReference = async (req, res) => {
  try {
    const { ref } = req.params;

    let entry;

    if (mongoose.Types.ObjectId.isValid(ref)) {
      entry = await GeneralJournal.findById(ref)
        .populate("debitAccount", "accountName")
        .populate("creditEntries.account", "accountName");
    } else {
      entry = await GeneralJournal.findOne({ reference: ref })
        .populate("debitAccount", "accountName")
        .populate("creditEntries.account", "accountName");
    }

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Ledger entry not found",
      });
    }

    res.status(200).json({
      success: true,
      entry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
