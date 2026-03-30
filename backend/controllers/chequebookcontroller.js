// controllers/chequebookController.js
import mongoose from "mongoose";
import { getModels } from "../config/millDB.js";

// ── Auto-ID generator ─────────────────────────────────────────────────────────
async function nextChequeBookId(ChequeBook) {
  const last = await ChequeBook.findOne().sort({ createdAt: -1 });
  let n = 1;
  if (last?.chequeBookId) n = parseInt(last.chequeBookId.split("-")[1]) + 1;
  return "CB-" + String(n).padStart(4, "0");
}

function padLeaf(num, digits = 8) {
  return String(num).padStart(digits, "0");
}

// ── Amount to words ───────────────────────────────────────────────────────────
function amountToWords(amount) {
  const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine",
    "Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  function convert(n) {
    if (n === 0) return "";
    if (n < 20)  return ones[n] + " ";
    if (n < 100) return tens[Math.floor(n/10)] + " " + (n%10 ? ones[n%10] + " " : "");
    if (n < 1000) return ones[Math.floor(n/100)] + " Hundred " + convert(n%100);
    if (n < 100000) return convert(Math.floor(n/1000)) + "Thousand " + convert(n%1000);
    if (n < 10000000) return convert(Math.floor(n/100000)) + "Lakh " + convert(n%100000);
    return convert(Math.floor(n/10000000)) + "Crore " + convert(n%10000000);
  }
  const [intPart, decPart] = amount.toFixed(2).split(".");
  let words = convert(parseInt(intPart)).trim() || "Zero";
  words += " Rupees";
  if (parseInt(decPart) > 0) words += " and " + convert(parseInt(decPart)).trim() + " Paisa";
  words += " Only";
  return words;
}

// ── Recompute a single account's balance from journal entries + stored opening ─
// IMPORTANT: totalDebit/totalCredit on Account = OPENING BALANCE ONLY.
// Invoice controllers must NOT use $inc on totalDebit/totalCredit — only $inc balance.
// This function reads the stored opening balance and aggregates all JEs from scratch.
async function recalcAccountBalance(millId, accountId) {
  const { GeneralJournalEntry, Account, Cashbook } = getModels(millId);
  const accId   = new mongoose.Types.ObjectId(accountId);
  const account = await Account.findById(accountId);
  if (!account) return null;

  if (account.isProtected) {
    // CASH IN HAND: uses cashbook opening balance
    const year     = new Date().getFullYear();
    const cashbook = await Cashbook.findOne({ year });
    const ob       = cashbook ? cashbook.openingBalance : 0;
    const [dAgg, cAgg] = await Promise.all([
      GeneralJournalEntry.aggregate([
        { $match: { debitAccount: accId, debitLineDesc: { $ne: "Opening Balance" } } },
        { $group: { _id: null, total: { $sum: "$debitAmount" } } },
      ]),
      GeneralJournalEntry.aggregate([
        { $match: { debitLineDesc: { $ne: "Opening Balance" } } },
        { $unwind: "$creditEntries" },
        { $match: { "creditEntries.account": accId } },
        { $group: { _id: null, total: { $sum: "$creditEntries.amount" } } },
      ]),
    ]);
    const totalIn  = dAgg[0]?.total || 0;
    const totalOut = cAgg[0]?.total || 0;
    const balance  = ob + totalIn - totalOut;
    await Account.findByIdAndUpdate(accountId, {
      totalDebit: ob + totalIn, totalCredit: totalOut, balance,
    });
    return balance;
  }

  // Regular account: totalDebit/totalCredit = OPENING BALANCE (never modified by JEs)
  const openingDebit  = account.totalDebit  || 0;
  const openingCredit = account.totalCredit || 0;

  const [dAgg, cAgg] = await Promise.all([
    GeneralJournalEntry.aggregate([
      { $match: { debitAccount: accId } },
      { $group: { _id: null, total: { $sum: "$debitAmount" } } },
    ]),
    GeneralJournalEntry.aggregate([
      { $unwind: "$creditEntries" },
      { $match: { "creditEntries.account": accId } },
      { $group: { _id: null, total: { $sum: "$creditEntries.amount" } } },
    ]),
  ]);

  const journalDebit  = dAgg[0]?.total || 0;
  const journalCredit = cAgg[0]?.total || 0;
  const at = account.accountType;

  const balance = (at === "Assets" || at === "Expense")
    ? (openingDebit + journalDebit) - (openingCredit + journalCredit)
    : (openingCredit + journalCredit) - (openingDebit + journalDebit);

  await Account.findByIdAndUpdate(accountId, { balance });
  return balance;
}

// ── Helper: collect all account IDs touched by a journal entry ────────────────
function getJEAccountIds(je) {
  const ids = new Set();
  if (je?.debitAccount) ids.add(je.debitAccount.toString());
  (je?.creditEntries || []).forEach(ce => {
    const id = ce?.account?._id?.toString() || ce?.account?.toString();
    if (id) ids.add(id);
  });
  return ids;
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/cheque-books
// ─────────────────────────────────────────────────────────────────────────────
export const createChequeBook = async (req, res) => {
  try {
    const { ChequeBook } = getModels(req.millId);
    const {
      bankAccountId, bankAccountName, branchName, branchCode,
      accountNumber, iban, accountTitle, startLeaf, endLeaf, bankLogoIndex,
    } = req.body;

    if (!bankAccountId || !branchName || !branchCode || !accountNumber || !iban || !accountTitle || !startLeaf || !endLeaf)
      return res.status(400).json({ message: "All fields are required." });

    const start = parseInt(startLeaf);
    const end   = parseInt(endLeaf);
    if (isNaN(start) || isNaN(end) || end <= start)
      return res.status(400).json({ message: "Invalid leaf range." });

    const chequeBookId = await nextChequeBookId(ChequeBook);
    const totalLeaves  = end - start + 1;
    const digits       = Math.max(startLeaf.length, endLeaf.length);

    const book = await ChequeBook.create({
      chequeBookId,
      bankAccountId, bankAccountName,
      branchName, branchCode, accountNumber, iban, accountTitle,
      startLeaf:  padLeaf(start, digits),
      endLeaf:    padLeaf(end,   digits),
      totalLeaves,
      lastIssuedLeaf: null,
      bankLogoIndex:  bankLogoIndex || null,
      isActive: true,
    });

    res.status(201).json({ message: "Cheque book created successfully.", chequeBook: book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/cheque-books
export const getChequeBooks = async (req, res) => {
  try {
    const { ChequeBook } = getModels(req.millId);
    res.json({ chequeBooks: await ChequeBook.find().sort({ createdAt: -1 }) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/cheque-books/:id/next-cheque-no
export const getNextChequeNo = async (req, res) => {
  try {
    const { ChequeBook } = getModels(req.millId);
    const book = await ChequeBook.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Cheque book not found." });

    const digits = book.startLeaf.length;
    let nextNo;
    if (!book.lastIssuedLeaf) {
      nextNo = book.startLeaf;
    } else {
      const last = parseInt(book.lastIssuedLeaf);
      const end  = parseInt(book.endLeaf);
      if (last >= end)
        return res.status(400).json({ message: "All cheque leaves have been issued." });
      nextNo = padLeaf(last + 1, digits);
    }
    res.json({ nextChequeNo: nextNo, book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/cheque-entries
// ─────────────────────────────────────────────────────────────────────────────
export const createChequeEntry = async (req, res) => {
  try {
    const { ChequeBook, ChequeEntry, GeneralJournalEntry, Account } = getModels(req.millId);
    const { chequeBookId, chequeNo, date, payeeAccountId, payeeAccountName, amount, remarks } = req.body;

    if (!chequeBookId || !chequeNo || !date || !payeeAccountId || !amount)
      return res.status(400).json({ message: "All required fields must be filled." });

    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) return res.status(400).json({ message: "Invalid amount." });
    if (amt > 100000000000)     return res.status(400).json({ message: "Amount exceeds maximum limit (1000 Crore)." });

    const book = await ChequeBook.findById(chequeBookId);
    if (!book) return res.status(404).json({ message: "Cheque book not found." });

    const start  = parseInt(book.startLeaf);
    const end    = parseInt(book.endLeaf);
    const leafNo = parseInt(chequeNo);
    if (leafNo < start || leafNo > end)
      return res.status(400).json({ message: `Cheque no. ${chequeNo} is outside this book's range.` });

    const alreadyUsed = await ChequeEntry.findOne({ chequeBookId, chequeNo });
    if (alreadyUsed)
      return res.status(400).json({ message: `Cheque no. ${chequeNo} has already been issued.` });

    const payeeAcc = await Account.findById(payeeAccountId);
    if (!payeeAcc) return res.status(404).json({ message: "Payee account not found." });

    const amountInWords = amountToWords(amt);
    const entryDate     = new Date(date);

    // Journal Entry: DR Payee, CR Bank
    const journalEntry = await GeneralJournalEntry.create({
      entryDate,
      comments:      `Cheque No. ${chequeNo} — ${book.bankAccountName} — Issued to ${payeeAccountName}`,
      debitAccount:  payeeAccountId,
      debitAmount:   amt,
      debitLineDesc: `Cheque No. ${chequeNo} Issued`,
      creditEntries: [{
        account:     book.bankAccountId,
        amount:      amt,
        description: `Cheque No. ${chequeNo} — ${book.branchName} (${book.branchCode})`,
      }],
    });

    const entry = await ChequeEntry.create({
      chequeBookId, chequeNo, date: entryDate,
      payeeAccountId, payeeAccountName,
      amount: amt, amountInWords,
      bankAccountId:   book.bankAccountId,
      bankAccountName: book.bankAccountName,
      journalEntryId:  journalEntry._id,
      status:   "issued",
      remarks:  remarks || "",
      branchName:    book.branchName,
      branchCode:    book.branchCode,
      accountNumber: book.accountNumber,
      iban:          book.iban,
      accountTitle:  book.accountTitle,
      bankLogoIndex: book.bankLogoIndex || null,
    });

    // Update lastIssuedLeaf
    const digits = book.startLeaf.length;
    if (!book.lastIssuedLeaf || leafNo > parseInt(book.lastIssuedLeaf)) {
      book.lastIssuedLeaf = padLeaf(leafNo, digits);
      await book.save();
    }

    // Recalculate balances for BOTH affected accounts
    await recalcAccountBalance(req.millId, book.bankAccountId.toString());
    await recalcAccountBalance(req.millId, payeeAccountId.toString());

    res.status(201).json({ message: "Cheque entry saved.", chequeEntry: entry });
  } catch (err) {
    console.error("createChequeEntry error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/cheque-entries/:id  —  Edit a cheque entry
// Deletes old journal entry, creates new one, recalculates all affected balances
// ─────────────────────────────────────────────────────────────────────────────
export const editChequeEntry = async (req, res) => {
  try {
    const { ChequeBook, ChequeEntry, GeneralJournalEntry, Account } = getModels(req.millId);
    const { id } = req.params;
    const { date, payeeAccountId, payeeAccountName, amount, remarks } = req.body;

    if (!date || !payeeAccountId || !amount)
      return res.status(400).json({ message: "date, payeeAccountId, and amount are required." });

    const entry = await ChequeEntry.findById(id);
    if (!entry) return res.status(404).json({ message: "Cheque entry not found." });
    if (entry.status !== "issued")
      return res.status(400).json({ message: `Cannot edit a cheque with status "${entry.status}". Only issued cheques can be edited.` });

    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) return res.status(400).json({ message: "Invalid amount." });
    if (amt > 100000000000)     return res.status(400).json({ message: "Amount exceeds maximum limit." });

    const newPayee = await Account.findById(payeeAccountId);
    if (!newPayee) return res.status(404).json({ message: "Payee account not found." });

    const book = await ChequeBook.findById(entry.chequeBookId);
    if (!book) return res.status(404).json({ message: "Cheque book not found." });

    // Collect ALL account IDs that will need balance recalculation
    const accountsToRecalc = new Set([
      book.bankAccountId.toString(),
      entry.payeeAccountId.toString(),
      payeeAccountId.toString(),
    ]);

    // Delete old journal entry (reverses the accounting)
    if (entry.journalEntryId) {
      const oldJE = await GeneralJournalEntry.findById(entry.journalEntryId);
      if (oldJE) {
        getJEAccountIds(oldJE).forEach(id => accountsToRecalc.add(id));
        await GeneralJournalEntry.findByIdAndDelete(entry.journalEntryId);
      }
    }

    // Create new journal entry with updated values
    const entryDate         = new Date(date);
    const newAmountInWords  = amountToWords(amt);
    const payeeName         = payeeAccountName || newPayee.accountName;

    const newJE = await GeneralJournalEntry.create({
      entryDate,
      comments:      `Cheque No. ${entry.chequeNo} — ${book.bankAccountName} — Issued to ${payeeName}`,
      debitAccount:  payeeAccountId,
      debitAmount:   amt,
      debitLineDesc: `Cheque No. ${entry.chequeNo} Issued`,
      creditEntries: [{
        account:     book.bankAccountId,
        amount:      amt,
        description: `Cheque No. ${entry.chequeNo} — ${book.branchName} (${book.branchCode})`,
      }],
    });

    // Collect new JE accounts
    getJEAccountIds(newJE).forEach(id => accountsToRecalc.add(id));

    // Update the cheque entry document
    entry.date            = entryDate;
    entry.payeeAccountId  = payeeAccountId;
    entry.payeeAccountName = payeeName;
    entry.amount          = amt;
    entry.amountInWords   = newAmountInWords;
    entry.remarks         = remarks || "";
    entry.journalEntryId  = newJE._id;
    await entry.save();

    // Recalculate all affected account balances
    for (const accId of accountsToRecalc) {
      try {
        await recalcAccountBalance(req.millId, accId);
      } catch (e) {
        console.warn(`Balance recalc failed for ${accId}:`, e.message);
      }
    }

    res.json({ message: `Cheque No. ${entry.chequeNo} updated successfully.`, chequeEntry: entry });
  } catch (err) {
    console.error("editChequeEntry error:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET /api/cheque-entries
export const getChequeEntries = async (req, res) => {
  try {
    const { ChequeEntry } = getModels(req.millId);
    const filter = req.query.chequeBookId ? { chequeBookId: req.query.chequeBookId } : {};
    const entries = await ChequeEntry.find(filter).sort({ date: -1, createdAt: -1 });
    res.json({ chequeEntries: entries });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/cheque-books/:id
export const updateChequeBook = async (req, res) => {
  try {
    const { ChequeBook } = getModels(req.millId);
    const { branchName, branchCode, accountNumber, iban, accountTitle, isActive } = req.body;
    const book = await ChequeBook.findByIdAndUpdate(
      req.params.id,
      { branchName, branchCode, accountNumber, iban, accountTitle, isActive },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: "Cheque book not found." });
    res.json({ message: "Cheque book updated.", chequeBook: book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/cheque-entries/:id/status
export const updateChequeStatus = async (req, res) => {
  try {
    const { ChequeEntry } = getModels(req.millId);
    const { status } = req.body;
    if (!["issued","cleared","bounced"].includes(status))
      return res.status(400).json({ message: "Invalid status." });

    const entry = await ChequeEntry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!entry) return res.status(404).json({ message: "Entry not found." });
    res.json({ message: "Status updated.", chequeEntry: entry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};