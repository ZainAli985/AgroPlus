import fs from "fs";
import path from "path";

const RAW_FILE = path.join(process.cwd(), "backend/data/general_Entries.json");
const OUTPUT_FILE = path.join(process.cwd(), "backend/data/transformed_general_entries.json");

// Helper: convert "1,965,591" -> 1965591
const toNumber = (str) => Number(String(str || "0").replace(/[, ]+/g, "").trim());

// Load raw entries
const rawEntries = JSON.parse(fs.readFileSync(RAW_FILE, "utf8"));

// Step 1: Group by Date + Description
const grouped = {};

rawEntries.forEach((row) => {
  const key = `${row.Date || ""}||${row.Description || ""}`;
  if (!grouped[key]) grouped[key] = [];
  grouped[key].push(row);
});

const transformed = [];

Object.values(grouped).forEach((rows) => {
  // Find debit row (Debit > 0)
  const debitRow = rows.find(r => toNumber(r.Debit || r[" Debit "]) > 0);
  // Find all credit rows (Credit > 0)
  const creditRows = rows.filter(r => toNumber(r.Credit || r[" Credit "]) > 0);

  if (!debitRow || creditRows.length === 0) {
    console.warn("Skipping unbalanced entry:", rows[0].Description);
    return;
  }

  const debitAmount = toNumber(debitRow.Debit || debitRow[" Debit "]);

  const creditEntries = creditRows.map(r => ({
    account: r.Account || "UNKNOWN_ACCOUNT", // placeholder string
    amount: toNumber(r.Credit || r[" Credit "])
  }));

  const totalCredit = creditEntries.reduce((sum, c) => sum + c.amount, 0);

  transformed.push({
    description: debitRow.Description || "",
    comments: debitRow.Comments || "",
    debitAccount: debitRow.Account || "UNKNOWN_ACCOUNT",
    debitAmount: debitAmount,
    creditEntries: creditEntries,
    totalCredit: totalCredit,
    isBalanced: debitAmount === totalCredit,
    createdAt: new Date(debitRow.Date || Date.now()),
    updatedAt: new Date(debitRow.Date || Date.now()),
  });
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(transformed, null, 2));
console.log(`✅ Transformed ${transformed.length} journal entries saved to: ${OUTPUT_FILE}`);
