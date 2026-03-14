// controllers/reportsController.js
import { getModels } from "../config/millDB.js";

// ─── Balance Sheet ────────────────────────────────────────────────────────────
async function buildBalanceSheet(millId, match = {}) {
  const { Account, GeneralJournalEntry } = getModels(millId);
  const accounts = await Account.find();

  const totals = await GeneralJournalEntry.aggregate([
    { $match: match },
    {
      $facet: {
        debitTotals:  [{ $group: { _id: "$debitAccount", totalDebit: { $sum: "$debitAmount" } } }],
        creditTotals: [
          { $unwind: "$creditEntries" },
          { $group: { _id: "$creditEntries.account", totalCredit: { $sum: "$creditEntries.amount" } } },
        ],
      },
    },
  ]);

  const debitMap = {}, creditMap = {};
  totals[0].debitTotals.forEach((d)  => { debitMap[d._id]  = d.totalDebit; });
  totals[0].creditTotals.forEach((c) => { creditMap[c._id] = c.totalCredit; });

  const assets = [], liabilities = [], equity = [];
  let totalAssets = 0, totalLiabilities = 0, totalEquity = 0;

  accounts.forEach((acc) => {
    const debit   = debitMap[acc._id]  || 0;
    const credit  = creditMap[acc._id] || 0;
    const balance = debit - credit;
    const row     = { id: acc._id, name: acc.accountName, amount: Math.abs(balance) };

    if (acc.accountType === "Assets")      { assets.push(row);      totalAssets      += balance; }
    if (acc.accountType === "Liabilities") { liabilities.push(row); totalLiabilities += Math.abs(balance); }
    if (acc.accountType === "Equity")      { equity.push(row);      totalEquity      += Math.abs(balance); }
  });

  return { assets, liabilities, equity, totalAssets, totalLiabilities, totalEquity };
}

export const getBalanceSheet = async (req, res) => {
  try {
    const current  = await buildBalanceSheet(req.millId);
    const previous = await buildBalanceSheet(req.millId, { createdAt: { $lt: new Date("2024-01-01") } });
    res.json({
      current, previous,
      isBalanced: current.totalAssets === current.totalLiabilities + current.totalEquity,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── Trial Balance ────────────────────────────────────────────────────────────
export const getTrialBalance = async (req, res) => {
  try {
    const { Account, GeneralJournalEntry } = getModels(req.millId);
    const accounts = await Account.find();

    const totals = await GeneralJournalEntry.aggregate([
      {
        $facet: {
          debitTotals:  [{ $group: { _id: "$debitAccount", totalDebit: { $sum: "$debitAmount" } } }],
          creditTotals: [
            { $unwind: "$creditEntries" },
            { $group: { _id: "$creditEntries.account", totalCredit: { $sum: "$creditEntries.amount" } } },
          ],
        },
      },
    ]);

    const debitMap = {}, creditMap = {};
    totals[0].debitTotals.forEach((d)  => { debitMap[d._id.toString()]  = d.totalDebit; });
    totals[0].creditTotals.forEach((c) => { creditMap[c._id.toString()] = c.totalCredit; });

    const groupsMap = {};
    let totalDebit = 0, totalCredit = 0;

    accounts.forEach((acc) => {
      const debit   = debitMap[acc._id]  || 0;
      const credit  = creditMap[acc._id] || 0;
      const balance = debit - credit;
      let netDebit = 0, netCredit = 0;

      if (["Assets", "Expense"].includes(acc.accountType)) {
        if (balance > 0) netDebit = balance; else netCredit = Math.abs(balance);
      } else {
        if (balance > 0) netCredit = balance; else netDebit = Math.abs(balance);
      }
      if (netDebit === 0 && netCredit === 0) return;

      if (!groupsMap[acc.accountType]) groupsMap[acc.accountType] = [];
      groupsMap[acc.accountType].push({ id: acc._id, name: acc.accountName, debit: netDebit, credit: netCredit });
      totalDebit  += netDebit;
      totalCredit += netCredit;
    });

    const ACCOUNT_ORDER = ["Assets", "Liabilities", "Equity", "Revenue", "Expense"];
    const groups = ACCOUNT_ORDER.filter((t) => groupsMap[t]).map((t) => ({ type: t, rows: groupsMap[t] }));

    res.json({ groups, totalDebit, totalCredit, isBalanced: totalDebit === totalCredit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Income Statement ─────────────────────────────────────────────────────────
export const getIncomeStatement = async (req, res) => {
  try {
    const { Account, GeneralJournalEntry } = getModels(req.millId);
    const accounts = await Account.find({ accountType: { $in: ["Revenue", "Expense"] } });

    const totals = await GeneralJournalEntry.aggregate([
      {
        $facet: {
          debitTotals:  [{ $group: { _id: "$debitAccount", totalDebit: { $sum: "$debitAmount" } } }],
          creditTotals: [
            { $unwind: "$creditEntries" },
            { $group: { _id: "$creditEntries.account", totalCredit: { $sum: "$creditEntries.amount" } } },
          ],
        },
      },
    ]);

    const debitMap = {}, creditMap = {};
    totals[0].debitTotals.forEach((d)  => { debitMap[d._id.toString()]  = d.totalDebit; });
    totals[0].creditTotals.forEach((c) => { creditMap[c._id.toString()] = c.totalCredit; });

    const revenueAccounts = [], expenseAccounts = [];
    let totalRevenue = 0, totalExpenses = 0;

    accounts.forEach((acc) => {
      const debit   = debitMap[acc._id]  || 0;
      const credit  = creditMap[acc._id] || 0;
      const balance = acc.accountType === "Revenue" ? credit - debit : debit - credit;
      const row     = { id: acc._id, name: acc.accountName, amount: Math.abs(balance) };

      if (acc.accountType === "Revenue") { revenueAccounts.push(row); totalRevenue  += balance; }
      else                               { expenseAccounts.push(row); totalExpenses += balance; }
    });

    res.json({ revenueAccounts, expenseAccounts, totalRevenue, totalExpenses, netIncome: totalRevenue - totalExpenses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};