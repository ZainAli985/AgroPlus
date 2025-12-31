import fs from "fs";
import mongoose from "mongoose";
import Account from "../models/Account.js";

// Load JSON from Excel export
const rawData = JSON.parse(fs.readFileSync("excel.json", "utf-8"));

// Helper: clean numbers from strings like " 1,965,591 "
const parseNumber = (str) => Number(str.replace(/,/g, "").trim()) || 0;

// Load all accounts from MongoDB to create a name → ObjectId map
const accountMap = {}; // { "Investment": "ObjectId", ... }

const initAccountMap = async () => {
  const accounts = await Account.find();
  accounts.forEach(acc => {
    accountMap[acc.accountName.trim()] = acc._id.toString();
  });
};

// Group rows by Date + Description + Comments
const groupEntries = (data) => {
  const grouped = {};

  data.forEach(row => {
    const key = `${row.Date}||${row.Description || ""}||${row.Comments || ""}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(row);
  });

  return grouped;
};

// Transform grouped rows into your GeneralJournalEntry schema
const transformEntries = (grouped) => {
  const entries = [];

  for (const key in grouped) {
    const rows = grouped[key];
    const firstRow = rows[0];

    // Find debit row(s)
    const debitRows = rows.filter(r => r[" Debit "] && r[" Debit "].trim() !== "");
    if (debitRows.length === 0) {
      console.warn(`No debit row for ${key}`);
      continue;
    }

    // If multiple debit rows, sum amounts (optional: pick first if you want one debit)
    const debitAmount = debitRows.reduce((sum, r) => sum + parseNumber(r[" Debit "]), 0);
    const debitAccountName = debitRows[0].Account.trim(); // pick first debit account
    const debitAccountId = accountMap[debitAccountName];
    if (!debitAccountId) {
      console.warn(`Debit account not found: ${debitAccountName}`);
      continue;
    }

    // Collect credit entries
    const creditEntries = rows
      .filter(r => r[" Credit "] && r[" Credit "].trim() !== "")
      .map(r => {
        const accountName = r.Account.trim();
        const accountId = accountMap[accountName];
        if (!accountId) {
          console.warn(`Credit account not found: ${accountName}`);
        }
        return {
          account: accountId,
          amount: parseNumber(r[" Credit "])
        };
      })
      .filter(c => c.account); // remove entries with missing account

    if (creditEntries.length === 0) {
      console.warn(`No credit entries for ${key}`);
      continue;
    }

    // Parse date (convert "Thursday, August 14, 2025" → ISO string)
    const entryDate = new Date(firstRow.Date);

    const totalCredit = creditEntries.reduce((sum, c) => sum + c.amount, 0);
    const isBalanced = debitAmount === totalCredit;

    entries.push({
      description: firstRow.Description || "",
      comments: firstRow.Comments || "",
      debitAccount: debitAccountId,
      debitAmount,
      creditEntries,
      entryDate,
      totalCredit,
      isBalanced
    });
  }

  return entries;
};

const run = async () => {
  // Connect to MongoDB just to fetch accounts
  await mongoose.connect("mongodb://localhost:27017/YOUR_DB_NAME", {});

  await initAccountMap();

  const grouped = groupEntries(rawData);
  const transformedEntries = transformEntries(grouped);

  console.log(`Transformed ${transformedEntries.length} entries.`);

  // Write refined JSON to file
  fs.writeFileSync("refined_journal_entries.json", JSON.stringify(transformedEntries, null, 2));
  console.log("Refined JSON written to refined_journal_entries.json");

  process.exit();
};

run();
