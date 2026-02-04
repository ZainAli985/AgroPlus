import mongoose from "mongoose";
import Account from "../models/Account.js";
import GeneralJournalEntry from "../models/GeneralJournalEntry.js";

export const getBalanceSheet = async (req, res) => {
  try {

    // -------------------------
    // 1. Get all accounts
    // -------------------------
    const accounts = await Account.find();

    // -------------------------
    // 2. Aggregate totals per account
    // -------------------------
    const totals = await GeneralJournalEntry.aggregate([
      {
        $facet: {

          debitTotals: [
            {
              $group: {
                _id: "$debitAccount",
                totalDebit: { $sum: "$debitAmount" },
              },
            },
          ],

          creditTotals: [
            { $unwind: "$creditEntries" },
            {
              $group: {
                _id: "$creditEntries.account",
                totalCredit: { $sum: "$creditEntries.amount" },
              },
            },
          ],
        },
      },
    ]);

    const debitMap = {};
    const creditMap = {};

    totals[0].debitTotals.forEach(d => {
      debitMap[d._id.toString()] = d.totalDebit;
    });

    totals[0].creditTotals.forEach(c => {
      creditMap[c._id.toString()] = c.totalCredit;
    });

    // -------------------------
    // 3. Build Balance Sheet
    // -------------------------
    const assets = [];
    const liabilities = [];
    const equity = [];

    let totalAssets = 0;
    let totalLiabilities = 0;
    let totalEquity = 0;

    accounts.forEach(acc => {
      const debit = debitMap[acc._id] || 0;
      const credit = creditMap[acc._id] || 0;
      const balance = debit - credit;

      const row = {
        id: acc._id,
        name: acc.accountName,
        subType: acc.subAccountType,
        amount: Math.abs(balance),
      };

      if (acc.accountType === "Assets") {
        assets.push(row);
        totalAssets += balance;
      }

      if (acc.accountType === "Liabilities") {
        liabilities.push(row);
        totalLiabilities += Math.abs(balance);
      }

      if (acc.accountType === "Equity") {
        equity.push(row);
        totalEquity += Math.abs(balance);
      }
    });

    res.json({
      assets,
      liabilities,
      equity,
      totalAssets,
      totalLiabilities,
      totalEquity,
      isBalanced: totalAssets === (totalLiabilities + totalEquity),
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getTrialBalance = async (req, res) => {
  try {

    // Get all accounts
    const accounts = await Account.find();

    // Aggregate debit & credit totals
    const totals = await GeneralJournalEntry.aggregate([
      {
        $facet: {

          debitTotals: [
            {
              $group: {
                _id: "$debitAccount",
                totalDebit: { $sum: "$debitAmount" }
              }
            }
          ],

          creditTotals: [
            { $unwind: "$creditEntries" },
            {
              $group: {
                _id: "$creditEntries.account",
                totalCredit: { $sum: "$creditEntries.amount" }
              }
            }
          ]

        }
      }
    ]);

    const debitMap = {};
    const creditMap = {};

    totals[0].debitTotals.forEach(d => {
      debitMap[d._id.toString()] = d.totalDebit;
    });

    totals[0].creditTotals.forEach(c => {
      creditMap[c._id.toString()] = c.totalCredit;
    });

    // Build rows
    const rows = [];
    let totalDebit = 0;
    let totalCredit = 0;

    accounts.forEach(acc => {
      const debit = debitMap[acc._id] || 0;
      const credit = creditMap[acc._id] || 0;

      if (debit !== 0 || credit !== 0) {
        rows.push({
          id: acc._id,
          name: acc.accountName,
          debit,
          credit
        });

        totalDebit += debit;
        totalCredit += credit;
      }
    });

    res.json({
      rows,
      totalDebit,
      totalCredit,
      isBalanced: totalDebit === totalCredit
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const normalize = (str) => str?.toString().toLowerCase().trim();

export const getIncomeStatement = async (req, res) => {
  try {
    // Get all revenue & expense accounts
    const accounts = await Account.find({
      accountType: { $in: ["Revenue", "Expense"] },
    });

    // Aggregate totals per account
    const totals = await GeneralJournalEntry.aggregate([
      {
        $facet: {
          debitTotals: [
            {
              $group: {
                _id: "$debitAccount",
                totalDebit: { $sum: "$debitAmount" },
              },
            },
          ],
          creditTotals: [
            { $unwind: "$creditEntries" },
            {
              $group: {
                _id: "$creditEntries.account",
                totalCredit: { $sum: "$creditEntries.amount" },
              },
            },
          ],
        },
      },
    ]);

    const debitMap = {};
    const creditMap = {};

    totals[0].debitTotals.forEach((d) => {
      debitMap[d._id.toString()] = d.totalDebit;
    });
    totals[0].creditTotals.forEach((c) => {
      creditMap[c._id.toString()] = c.totalCredit;
    });

    // Split accounts by type
    const revenueAccounts = [];
    const expenseAccounts = [];

    let totalRevenue = 0;
    let totalExpenses = 0;

    accounts.forEach((acc) => {
      const debit = debitMap[acc._id] || 0;
      const credit = creditMap[acc._id] || 0;
      const balance = acc.accountType === "Revenue" ? credit - debit : debit - credit;

      const row = {
        id: acc._id,
        name: acc.accountName,
        amount: Math.abs(balance),
      };

      if (acc.accountType === "Revenue") {
        revenueAccounts.push(row);
        totalRevenue += balance;
      } else if (acc.accountType === "Expense") {
        expenseAccounts.push(row);
        totalExpenses += balance;
      }
    });

    const netIncome = totalRevenue - totalExpenses;

    res.json({
      revenueAccounts,
      expenseAccounts,
      totalRevenue,
      totalExpenses,
      netIncome,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};