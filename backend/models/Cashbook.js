import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  account: { type: String, required: true },
  description: { type: String },
  debit: { type: Number, default: 0 },   // Payment
  credit: { type: Number, default: 0 },  // Receipt
});

const cashbookSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    openingBalance: { type: Number, required: true },
    transactions: [transactionSchema],
    comment: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Cashbook", cashbookSchema);