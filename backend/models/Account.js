import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    autoAccountId: {
      type: String,
      required: true,
      unique: true,
    },

    manualAccountId: {
      type: String,
      default: "",
    },

    accountType: {
      type: String,
      required: true,
      enum: ["Assets", "Liabilities", "Equity", "Revenue", "Expense"],
    },

    subAccountType: {
      type: String,
      required: true,
      enum: [
        "Current Assets",
        "Fixed Assets",
        "Current Liabilities",
        "Fixed Liabilities",
        "Equity",
        "Shareholders Account",
        "Expense",
        "Owner's Capital",
        "Expenses",
        "Revenue",
        "Contra Revenue",
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
    },
    starred: { type: Boolean, default: false },
    totalDebit: {
      type: Number,
      default: 0,
    },

    totalCredit: {
      type: Number,
      default: 0,
    },

    balance: {
      type: Number,
      default: 0,
    },

  },
  { timestamps: true }
);

export default mongoose.model("Account", accountSchema);
