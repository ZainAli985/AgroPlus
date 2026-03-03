// models/Cashbook.js
import mongoose from "mongoose";

const cashbookSchema = new mongoose.Schema({
  year: { type: Number, required: true, unique: true },
  openingBalance: { type: Number, required: true },
  entries: [
    {
      date: { type: Date, required: true },
      debitAccount: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
      debitAmount: Number,
      creditEntries: [
        {
          account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
          amount: Number,
          description: String,
        },
      ],
      comment: String,
    },
  ],
});

export default mongoose.model("Cashbook", cashbookSchema);