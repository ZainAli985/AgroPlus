import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    accountType: {
      type: String,
      required: true,
      enum: ["Assets", "Liabilities", "Equity", "Revenue", "Expense"],
    },

    subAccountType: {
      type: String,
      required: true,
      enum: [
        // Existing schema values
        "Current Assets",
        "Fixed Assets",
        "Current Liabilities",
        "Fixed Liabilities",
        "Equity",
        "Expenses",
        "Revenue",
        "Contra Revenue",

        // Added based on your sheet
        "Owner's Capital",
        "Expense",
        "Shareholder's Account",
        "Owner's Equity",
        "Owner's Capital",
        "Revenue",
      ],
    },

    accountName: {
      type: String,
      required: true,
      trim: true,
    },

    LedgerRef: {
      type: String,
      default: "",
    }
  },
);

const Account = mongoose.model("Account", accountSchema);
export default Account;
