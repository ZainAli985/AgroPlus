// controllers/reportsController.js
import mongoose from "mongoose";
import { getModels } from "../config/millDB.js";

// ── Shared aggregation helper ─────────────────────────────────────────────────
async function buildJournalTotals(GeneralJournalEntry, match = {}) {
  const totals = await GeneralJournalEntry.aggregate([
    { $match: match },
    {
      $facet: {
        debitTotals:  [{ $group: { _id: "$debitAccount", total: { $sum: "$debitAmount" } } }],
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

// ── Compute signed balance ─────────────────────────────────────────────────────
function computeBalance(account, jeDebit, jeCredit) {
  const obD  = account.totalDebit  || 0;
  const obC  = account.totalCredit || 0;
  const at   = account.accountType;
  return (at === "Assets" || at === "Expense")
    ? (obD + jeDebit) - (obC + jeCredit)
    : (obC + jeCredit) - (obD + jeDebit);
}

// ── Build enriched row ─────────────────────────────────────────────────────────
function makeRow(acc, balance) {
  return {
    id:             acc._id,
    name:           acc.accountName,
    amount:         balance,
    absAmount:      Math.abs(balance),
    subAccountType: acc.subAccountType || "",
    category:       acc.category       || "",
    ledgerRef:      acc.LedgerRef      || "",
    accountType:    acc.accountType,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/balance-sheet
// Returns assets/liabilities/equity grouped by subAccountType.
// Within Current Assets, further grouped by category for Cash/Bank/etc.
// ─────────────────────────────────────────────────────────────────────────────
async function buildBalanceSheet(millId, match = {}) {
  const { Account, GeneralJournalEntry } = getModels(millId);
  const accounts = await Account.find();
  const { debitMap, creditMap } = await buildJournalTotals(GeneralJournalEntry, match);

  // Collect rows by type + subType
  const groups = {};
  let totalAssets = 0, totalLiabilities = 0, totalEquity = 0;

  accounts.forEach(acc => {
    const id      = acc._id.toString();
    const balance = computeBalance(acc, debitMap[id] || 0, creditMap[id] || 0);
    const row     = makeRow(acc, balance);
    const key     = `${acc.accountType}__${acc.subAccountType || "Other"}`;

    if (!groups[key]) groups[key] = { accountType: acc.accountType, subAccountType: acc.subAccountType || "Other", rows: [], total: 0 };
    groups[key].rows.push(row);
    groups[key].total += balance;

    if (acc.accountType === "Assets")      totalAssets      += balance;
    if (acc.accountType === "Liabilities") totalLiabilities += balance;
    if (acc.accountType === "Equity")      totalEquity      += balance;
  });

  // Sort and structure asset groups (Fixed first, then Current)
  const ASSET_ORDER = ["Fixed Assets", "Current Assets"];
  const LIA_ORDER   = ["Fixed Liabilities", "Current Liabilities"];
  const EQ_ORDER    = ["Equity", "Owner's Capital", "Shareholders Account"];

  const assetGroups      = ASSET_ORDER
    .map(st => groups[`Assets__${st}`] || { accountType:"Assets", subAccountType:st, rows:[], total:0 })
    .filter(g => g.rows.length > 0 || ASSET_ORDER.includes(g.subAccountType));

  const liabilityGroups  = LIA_ORDER
    .map(st => groups[`Liabilities__${st}`] || { accountType:"Liabilities", subAccountType:st, rows:[], total:0 })
    .filter(g => g.rows.length > 0);

  const equityGroups = EQ_ORDER
    .map(st => groups[`Equity__${st}`] || { accountType:"Equity", subAccountType:st, rows:[], total:0 })
    .concat(
      Object.values(groups).filter(g => g.accountType === "Equity" && !EQ_ORDER.includes(g.subAccountType))
    )
    .filter(g => g.rows.length > 0);

  return { assetGroups, liabilityGroups, equityGroups, totalAssets, totalLiabilities, totalEquity };
}

export const getBalanceSheet = async (req, res) => {
  try {
    const current  = await buildBalanceSheet(req.millId);
    const previous = await buildBalanceSheet(req.millId, {
      createdAt: { $lt: new Date(new Date().getFullYear(), 0, 1) },
    });
    res.json({
      current, previous,
      isBalanced: Math.abs(current.totalAssets - (current.totalLiabilities + current.totalEquity)) < 1,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/trial-balance
// Includes LedgerRef, openingDebit, openingCredit in each row
// ─────────────────────────────────────────────────────────────────────────────
export const getTrialBalance = async (req, res) => {
  try {
    const { Account, GeneralJournalEntry } = getModels(req.millId);
    const accounts = await Account.find();
    const { debitMap, creditMap } = await buildJournalTotals(GeneralJournalEntry);

    const groupsMap = {};
    let totalDebit = 0, totalCredit = 0;

    accounts.forEach(acc => {
      const id      = acc._id.toString();
      const jeD     = debitMap[id]  || 0;
      const jeC     = creditMap[id] || 0;
      const obD     = acc.totalDebit  || 0;
      const obC     = acc.totalCredit || 0;
      const totalD  = obD + jeD;
      const totalC  = obC + jeC;
      const balance = totalD - totalC;

      let netDebit = 0, netCredit = 0;
      if (["Assets", "Expense"].includes(acc.accountType)) {
        if (balance > 0) netDebit  = balance; else netCredit = Math.abs(balance);
      } else {
        if (balance < 0) netDebit  = Math.abs(balance); else netCredit = balance;
      }

      if (netDebit === 0 && netCredit === 0) return;

      if (!groupsMap[acc.accountType]) groupsMap[acc.accountType] = [];
      groupsMap[acc.accountType].push({
        id:          acc._id,
        name:        acc.accountName,
        ledgerRef:   acc.LedgerRef || "",
        totalDebit:  totalD,
        totalCredit: totalC,
        debit:       netDebit,
        credit:      netCredit,
      });
      totalDebit  += netDebit;
      totalCredit += netCredit;
    });

    const ORDER = ["Assets", "Liabilities", "Equity", "Revenue", "Expense"];
    const groups = ORDER.filter(t => groupsMap[t]).map(t => ({ type: t, rows: groupsMap[t] }));

    res.json({ groups, totalDebit, totalCredit, isBalanced: Math.abs(totalDebit - totalCredit) < 1 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/incomestatement  (also /api/income-statement)
// Returns revenue + expenses with subAccountType/category for grouping
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
      const balance = computeBalance(acc, debitMap[id] || 0, creditMap[id] || 0);
      const row     = makeRow(acc, balance);

      if (acc.accountType === "Revenue") { revenueAccounts.push(row); totalRevenue  += balance; }
      else                               { expenseAccounts.push(row); totalExpenses += balance; }
    });

    res.json({
      revenueAccounts, expenseAccounts,
      totalRevenue, totalExpenses,
      netIncome:    totalRevenue - totalExpenses,
      isProfitable: totalRevenue >= totalExpenses,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};