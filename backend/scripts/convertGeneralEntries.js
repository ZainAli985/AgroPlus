import fs from "fs";

// Load flat raw entries (Excel → JSON)
const rawEntries = JSON.parse(fs.readFileSync("entries.json", "utf8"));

// Load account map (Account Name → ObjectId)
const accountMap = JSON.parse(fs.readFileSync("accountMap.json", "utf8"));

function getAccountId(name) {
  if (!accountMap[name]) return null;
  return accountMap[name];
}

// -------------------------
// 1. GROUP BY DATE + DESCRIPTION
// -------------------------

const grouped = {};

for (const row of rawEntries) {
  const desc = row.Description ?? "";
  const date = row.Date ?? "";

  const key = `${date}|${desc}`;

  if (!grouped[key]) grouped[key] = { debit: [], credit: [], description: desc, date: date };

  if (row.Debit) grouped[key].debit.push(row);
  if (row.Credit) grouped[key].credit.push(row);
}

// -------------------------
// 2. Prepare output buckets
// -------------------------

const balanced = [];
const missingAccounts = [];
const unbalanced = [];
const unknownErrors = [];

// -------------------------
// 3. PROCESS EACH GROUP
// -------------------------

for (const key of Object.keys(grouped)) {
  const { debit, credit, description, date } = grouped[key];

  // Process each debit entry inside this group
  for (const d of debit) {
    try {
      const debitAccountId = getAccountId(d.Account);

      // Missing debit account?
      if (!debitAccountId) {
        missingAccounts.push({ reason: "Missing Debit Account", row: d });
        continue;
      }

      const debitAmount = d.Debit;
      if (!debitAmount) {
        unknownErrors.push({ reason: "Debit has no amount", row: d });
        continue;
      }

      // Process credits
      const creditEntries = credit.map(c => {
        const id = getAccountId(c.Account);
        return {
          original: c,
          account: id,
          amount: c.Credit ?? 0
        };
      });

      // Detect missing credit account IDs
      const creditMissing = creditEntries.filter(c => c.account === null);
      if (creditMissing.length > 0) {
        missingAccounts.push({
          reason: "Missing Credit Account",
          debit: d,
          missingCreditAccounts: creditMissing.map(c => c.original.Account)
        });
        continue;
      }

      // Calculate total credit
      const totalCredit = creditEntries.reduce((sum, c) => sum + c.amount, 0);

      // Balance check
      if (totalCredit !== debitAmount) {
        unbalanced.push({
          description,
          date,
          debitAmount,
          totalCredit,
          debitRow: d,
          creditRows: credit
        });
        continue;
      }

      // FULLY BALANCED ENTRY → READY FOR IMPORT
      balanced.push({
        description,
        comments: "",
        debitAccount: debitAccountId,
        debitAmount,
        creditEntries: creditEntries.map(c => ({
          account: c.account,
          amount: c.amount
        })),
        totalCredit,
        isBalanced: true
      });

    } catch (err) {
      unknownErrors.push({
        reason: "Unexpected Error",
        error: err.toString(),
        row: d
      });
    }
  }
}

// -------------------------
// 4. Write output files
// -------------------------

fs.writeFileSync("balanced_entries.json", JSON.stringify(balanced, null, 2));
fs.writeFileSync("missing_accounts.json", JSON.stringify(missingAccounts, null, 2));
fs.writeFileSync("unbalanced_entries.json", JSON.stringify(unbalanced, null, 2));
fs.writeFileSync("unknown_errors.json", JSON.stringify(unknownErrors, null, 2));

console.log("🎉 Conversion Complete!");
console.log(`✔ Balanced entries: ${balanced.length}`);
console.log(`⚠ Missing account entries: ${missingAccounts.length}`);
console.log(`❌ Unbalanced entries: ${unbalanced.length}`);
console.log(`❗ Unknown errors: ${unknownErrors.length}`);
