import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read the JSON file from data folder
const jsonData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../backend/data/tableConvert.com_kpsswx.json"), "utf-8")
);

// Map account types and sub-account types
const accountTypeMap = {
  "Assets": "Assets",
  "Liabilities": "Liabilities",
  "Owner's Equity": "Equity",
  "Revenue": "Revenue",
  "Expense": "Expense",
};

const subAccountTypeMap = {
  "Current Assets": "Current Assets",
  "Fixed Assets": "Fixed Assets",
  "Current Liabilities": "Current Liabilities",
  "Fixed Liabilities": "Fixed Liabilities",
  "Owner's Capital": "Equity",
  "Shareholder's Account": "Equity",
  "Expense": "Expenses",
  "Revenue": "Revenue",
  "Contra Revenue": "Contra Revenue",
};

// Transform data
const transformedAccounts = jsonData.map((account, index) => {
  const accountNumber = String(index + 1).padStart(4, "0");
  
  return {
    autoAccountId: `ACC-${accountNumber}`,
    manualAccountId: account["Led. Ref."] || "",
    accountType: accountTypeMap[account["Accounts"]] || "Assets",
    subAccountType: subAccountTypeMap[account["Sub Accounts"]] || "Current Assets",
    accountName: account["Individual Accounts"]?.trim() || "",
    LedgerRef: account["Led. Ref."] || "",
  };
});

// Write to new file in backend/data folder
fs.writeFileSync(
  path.join(__dirname, "../backend/data/accounts_transformed.json"),
  JSON.stringify(transformedAccounts, null, 2)
);

console.log(`✓ Transformed ${transformedAccounts.length} accounts`);
console.log("✓ Saved to: backend/data/accounts_transformed.json");