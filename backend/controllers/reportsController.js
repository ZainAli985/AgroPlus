// controllers/reportsController.js
// ─────────────────────────────────────────────────────────────────────────────
// FIX: All report functions now include opening balances (account.totalDebit /
// account.totalCredit) on top of journal entry movements.
//
// RULE: account.totalDebit / account.totalCredit = OPENING BALANCE ONLY.
//       They are set at account creation and never modified by journal entries.
//       Reports must add journal movements ON TOP of these stored opening values.
// ─────────────────────────────────────────────────────────────────────────────
import mongoose from "mongoose";
import { getModels } from "../config/millDB.js";

// ── Shared aggregation helper ─────────────────────────────────────────────────
async function buildJournalTotals(GeneralJournalEntry, match = {}) {
  const totals = await GeneralJournalEntry.aggregate([
    { $match: match },
    {
      $facet: {
        debitTotals: [
          { $group: { _id: "$debitAccount", total: { $sum: "$debitAmount" } } },
        ],
        creditTotals: [
          { $unwind: "$creditEntries" },
          { $group: { _id: "$creditEntries.account", total: { $sum: "$creditEntries.amount" } } },
        ],
      },
    },
  ]);
  const debitMap = {}, creditMap = {};
  (totals[0]?.debitTotals  || []).forEach(d => { debitMap[d._id?.toString()]  = d.total; });
  (totals[0]?.creditTotals || []).forEach(c => { creditMap[c._id?.toString()] = c.total; });
  return { debitMap, creditMap };
}

// ── Compute signed balance for one account ────────────────────────────────────
// Assets / Expense:  balance = (obDebit + jeDebit) − (obCredit + jeCredit)
// Liabilities / Equity / Revenue: balance = (obCredit + jeCredit) − (obDebit + jeDebit)
// Negative result = account is on its ABNORMAL side (e.g. bank overdraft)
function computeBalance(account, jeDebit, jeCredit) {
  const obDebit  = account.totalDebit  || 0;   // opening balance debit
  const obCredit = account.totalCredit || 0;   // opening balance credit
  const totalD   = obDebit  + jeDebit;
  const totalC   = obCredit + jeCredit;
  const at = account.accountType;
  return (at === "Assets" || at === "Expense")
    ? totalD - totalC
    : totalC - totalD;
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/balance-sheet
// FIX: now includes account opening balances in every row
// ─────────────────────────────────────────────────────────────────────────────
async function buildBalanceSheet(millId, match = {}) {
  const { Account, GeneralJournalEntry } = getModels(millId);
  const accounts = await Account.find();
  const { debitMap, creditMap } = await buildJournalTotals(GeneralJournalEntry, match);

  const assets = [], liabilities = [], equity = [];
  let totalAssets = 0, totalLiabilities = 0, totalEquity = 0;

  accounts.forEach(acc => {
    const id      = acc._id.toString();
    const jeD     = debitMap[id]  || 0;
    const jeC     = creditMap[id] || 0;
    const balance = computeBalance(acc, jeD, jeC);

    // Show signed value — negative means abnormal side (e.g. bank overdraft)
    const row = {
      id:       acc._id,
      name:     acc.accountName,
      amount:   balance,              // signed — frontend can display with − if needed
      absAmount: Math.abs(balance),  // for layout purposes
    };

    if (acc.accountType === "Assets")      { assets.push(row);      totalAssets      += balance; }
    if (acc.accountType === "Liabilities") { liabilities.push(row); totalLiabilities += balance; }
    if (acc.accountType === "Equity")      { equity.push(row);      totalEquity      += balance; }
  });

  return { assets, liabilities, equity, totalAssets, totalLiabilities, totalEquity };
}

export const getBalanceSheet = async (req, res) => {
  try {
    const current  = await buildBalanceSheet(req.millId);
    const previous = await buildBalanceSheet(req.millId, {
      createdAt: { $lt: new Date(new Date().getFullYear(), 0, 1) }, // before this year
    });
    res.json({
      current, previous,
      isBalanced: Math.abs(current.totalAssets - (current.totalLiabilities + current.totalEquity)) < 0.01,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/trial-balance
// FIX: now includes account opening balances
// ─────────────────────────────────────────────────────────────────────────────
export const getTrialBalance = async (req, res) => {
  try {
    const { Account, GeneralJournalEntry } = getModels(req.millId);
    const accounts = await Account.find();
    const { debitMap, creditMap } = await buildJournalTotals(GeneralJournalEntry);

    const groupsMap  = {};
    let totalDebit = 0, totalCredit = 0;

    accounts.forEach(acc => {
      const id      = acc._id.toString();
      const jeD     = debitMap[id]  || 0;
      const jeC     = creditMap[id] || 0;
      const obD     = acc.totalDebit  || 0;
      const obC     = acc.totalCredit || 0;
      const totalD  = obD + jeD;
      const totalC  = obC + jeC;
      const balance = totalD - totalC;  // raw difference

      // Classify net balance as debit or credit column
      let netDebit = 0, netCredit = 0;
      if (["Assets", "Expense"].includes(acc.accountType)) {
        if (balance > 0) netDebit  = balance;
        else             netCredit = Math.abs(balance);
      } else {
        // Liabilities, Equity, Revenue — credit-normal
        if (balance < 0) netDebit  = Math.abs(balance); // abnormal (debit balance)
        else             netCredit = balance;
      }

      if (netDebit === 0 && netCredit === 0) return; // skip zero accounts

      if (!groupsMap[acc.accountType]) groupsMap[acc.accountType] = [];
      groupsMap[acc.accountType].push({
        id:         acc._id,
        name:       acc.accountName,
        totalDebit:  totalD,
        totalCredit: totalC,
        debit:       netDebit,
        credit:      netCredit,
      });
      totalDebit  += netDebit;
      totalCredit += netCredit;
    });

    const ACCOUNT_ORDER = ["Assets", "Liabilities", "Equity", "Revenue", "Expense"];
    const groups = ACCOUNT_ORDER.filter(t => groupsMap[t]).map(t => ({ type: t, rows: groupsMap[t] }));

    res.json({
      groups, totalDebit, totalCredit,
      isBalanced: Math.abs(totalDebit - totalCredit) < 0.01,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/income-statement
// FIX: now includes opening balances on Revenue/Expense accounts
// ─────────────────────────────────────────────────────────────────────────────
export const getIncomeStatement = async (req, res) => {
  try {
    const { Account, GeneralJournalEntry } = getModels(req.millId);
    const accounts = await Account.find({ accountType: { $in: ["Revenue", "Expense"] } });
    const { debitMap, creditMap } = await buildJournalTotals(GeneralJournalEntry);

    const revenueAccounts = [], expenseAccounts = [];
    let totalRevenue = 0, totalExpenses = 0;

    accounts.forEach(acc => {
      const id      = acc._id.toString();
      const jeD     = debitMap[id]  || 0;
      const jeC     = creditMap[id] || 0;
      const balance = computeBalance(acc, jeD, jeC);

      // Positive balance = normal side (Revenue: positive = more credits; Expense: positive = more debits)
      const row = { id: acc._id, name: acc.accountName, amount: balance, absAmount: Math.abs(balance) };

      if (acc.accountType === "Revenue") { revenueAccounts.push(row); totalRevenue  += balance; }
      else                               { expenseAccounts.push(row); totalExpenses += balance; }
    });

    res.json({
      revenueAccounts, expenseAccounts, totalRevenue, totalExpenses,
      netIncome: totalRevenue - totalExpenses,
      isProfitable: totalRevenue >= totalExpenses,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};