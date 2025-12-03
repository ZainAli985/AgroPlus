import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Account from "../models/Account.js";
import GeneralJournalEntry from "../models/GeneralJournalEntry.js";

const __dirname = path.resolve();
const filePath = path.join(__dirname, "/data/GENERAL-ENTRIES.json");

// Replace with your actual Mongo URI
const MONGO_URL = "mongodb+srv://zainalibusiness05:QjsikASROc0fmujT@management-system.s3u3hik.mongodb.net/al-rehman-rice-mill";

async function start() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URL);
    console.log("Connected!");

    const rawData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Group by Date + Description
    const grouped = {};
    for (let row of rawData) {
      const key = `${row.Date}||${row.Description}`;

      if (!grouped[key]) {
        grouped[key] = {
          date: row.Date,
          description: row.Description,
          debit: null,
          credits: []
        };
      }

      // Debit row
      if (row.Debit) {
        grouped[key].debit = {
          account: row.Account,
          amount: row.Debit
        };
      }

      // Credit row
      if (row.Credit) {
        grouped[key].credits.push({
          account: row.Account,
          amount: row.Credit
        });
      }
    }

    let count = 0;

    for (let key of Object.keys(grouped)) {
      const g = grouped[key];

      if (!g.debit) {
        console.log(`⚠ Skipped (No debit row): ${key}`);
        continue;
      }

      const totalCredit = g.credits.reduce((s, c) => s + c.amount, 0);
      if (totalCredit !== g.debit.amount) {
        console.log(`⚠ Skipped (Debit != Credit): ${key}`);
        continue;
      }

      // --- Process debit account ---
      let debitAccountValue;
      const debitDoc = await Account.findOne({ accountName: g.debit.account.trim() });
      if (debitDoc) debitAccountValue = debitDoc._id;
      else debitAccountValue = g.debit.account.trim();

      // --- Process credit accounts ---
      const creditEntries = [];
      for (let c of g.credits) {
        const creditDoc = await Account.findOne({ accountName: c.account.trim() });
        const accountValue = creditDoc ? creditDoc._id : c.account.trim();
        creditEntries.push({
          account: accountValue,
          amount: c.amount
        });
      }

      // --- Save entry ---
      const entry = new GeneralJournalEntry({
        date: new Date(g.date),
        description: g.description,
        debitAccount: debitAccountValue,
        debitAmount: g.debit.amount,
        creditEntries
      });

      await entry.save();
      count++;
      console.log(`✔ Imported: ${key}`);
    }

    console.log(`\n🎉 IMPORT COMPLETE — ${count} journal entries saved.`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
