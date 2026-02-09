import mongoose from "mongoose";
import Account from "../models/Account.js";
import GeneralJournalEntry from "../models/GeneralJournalEntry.js";
const buildBalanceSheet = async (match = {}) => {
  const accounts = await Account.find();

  const totals = await GeneralJournalEntry.aggregate([
    { $match: match },
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

  totals[0].debitTotals.forEach((d) => (debitMap[d._id] = d.totalDebit));
  totals[0].creditTotals.forEach((c) => (creditMap[c._id] = c.totalCredit));

  const assets = [];
  const liabilities = [];
  const equity = [];

  let totalAssets = 0;
  let totalLiabilities = 0;
  let totalEquity = 0;

  accounts.forEach((acc) => {
    const debit = debitMap[acc._id] || 0;
    const credit = creditMap[acc._id] || 0;
    const balance = debit - credit;

    const row = {
      id: acc._id,
      name: acc.accountName,
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

  return {
    assets,
    liabilities,
    equity,
    totalAssets,
    totalLiabilities,
    totalEquity,
  };
};

export const getBalanceSheet = async (req, res) => {
  try {
    const current = await buildBalanceSheet();
    const previous = await buildBalanceSheet({
      createdAt: { $lt: new Date("2024-01-01") },
    });

    res.json({
      current,
      previous,
      isBalanced:
        current.totalAssets === current.totalLiabilities + current.totalEquity,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTrialBalance = async (req, res) => {
  try {
    // 1. Get all accounts
    const accounts = await Account.find();

    // 2. Aggregate debit & credit totals
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

    // 3. Grouped Trial Balance
    const groupsMap = {};
    let totalDebit = 0;
    let totalCredit = 0;

    accounts.forEach((acc) => {
      const debit = debitMap[acc._id] || 0;
      const credit = creditMap[acc._id] || 0;

      // Net balance logic
      let netDebit = 0;
      let netCredit = 0;

      const balance = debit - credit;

      // Accounting rules
      if (["Assets", "Expense"].includes(acc.accountType)) {
        if (balance > 0) netDebit = balance;
        else netCredit = Math.abs(balance);
      } else {
        if (balance > 0) netCredit = balance;
        else netDebit = Math.abs(balance);
      }

      // Skip zero balances
      if (netDebit === 0 && netCredit === 0) return;

      if (!groupsMap[acc.accountType]) {
        groupsMap[acc.accountType] = [];
      }

      groupsMap[acc.accountType].push({
        id: acc._id,
        name: acc.accountName,
        debit: netDebit,
        credit: netCredit,
      });

      totalDebit += netDebit;
      totalCredit += netCredit;
    });

    // 4. Convert map → array (ordered)
    const ACCOUNT_ORDER = [
      "Assets",
      "Liabilities",
      "Equity",
      "Revenue",
      "Expense",
    ];

    const groups = ACCOUNT_ORDER.filter((type) => groupsMap[type]).map(
      (type) => ({
        type,
        rows: groupsMap[type],
      }),
    );

    res.json({
      groups,
      totalDebit,
      totalCredit,
      isBalanced: totalDebit === totalCredit,
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
      const balance =
        acc.accountType === "Revenue" ? credit - debit : debit - credit;

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
