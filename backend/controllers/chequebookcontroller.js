// controllers/chequebookController.js
// ─────────────────────────────────────────────────────────────────────────────
// CHEQUE FLOW:
//   CREATE  → status="pending"   + Journal Entry created immediately (DR payee / CR bank)
//             Bank balance deducted right away to prevent fraud/double-use.
//   CLEARED → status="cleared"   + JE narration updated (no balance change needed)
//   DISCARD → status="discarded" + Reversal JE created (DR bank / CR payee),
//             isLocked=true, leaf added to discardedLeaves (permanently destroyed),
//             balances restored.
//
// LOCKS: Discarded entries are permanently frozen — no edits to cheque entry or JE.
// ─────────────────────────────────────────────────────────────────────────────
import mongoose from "mongoose";
import { getModels } from "../config/millDB.js";

// ── Helpers ───────────────────────────────────────────────────────────────────

function padLeaf(num, digits = 8) {
  return String(num).padStart(digits, "0");
}

async function nextChequeBookId(ChequeBook) {
  const last = await ChequeBook.findOne().sort({ createdAt: -1 });
  const n = last?.chequeBookId ? parseInt(last.chequeBookId.split("-")[1]) + 1 : 1;
  return "CB-" + String(n).padStart(4, "0");
}

function amountToWords(amount) {
  const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine",
    "Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  function convert(n) {
    if (n === 0)       return "";
    if (n < 20)        return ones[n] + " ";
    if (n < 100)       return tens[Math.floor(n/10)] + " " + (n%10 ? ones[n%10] + " " : "");
    if (n < 1000)      return ones[Math.floor(n/100)] + " Hundred " + convert(n%100);
    if (n < 100000)    return convert(Math.floor(n/1000)) + "Thousand " + convert(n%1000);
    if (n < 10000000)  return convert(Math.floor(n/100000)) + "Lakh " + convert(n%100000);
    return convert(Math.floor(n/10000000)) + "Crore " + convert(n%10000000);
  }
  const [intPart, decPart] = amount.toFixed(2).split(".");
  let words = convert(parseInt(intPart)).trim() || "Zero";
  words += " Rupees";
  if (parseInt(decPart) > 0) words += " and " + convert(parseInt(decPart)).trim() + " Paisa";
  return words + " Only";
}

async function recalcAccountBalance(millId, accountId) {
  const { GeneralJournalEntry, Account, Cashbook } = getModels(millId);
  const accId   = new mongoose.Types.ObjectId(accountId);
  const account = await Account.findById(accountId);
  if (!account) return null;

  if (account.isProtected) {
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
    const balance = ob + (dAgg[0]?.total || 0) - (cAgg[0]?.total || 0);
    await Account.findByIdAndUpdate(accountId, {
      totalDebit: ob + (dAgg[0]?.total || 0), totalCredit: cAgg[0]?.total || 0, balance,
    });
    return balance;
  }

  const obD = account.totalDebit  || 0;
  const obC = account.totalCredit || 0;
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
  const at = account.accountType;
  const balance = (at === "Assets" || at === "Expense")
    ? (obD + (dAgg[0]?.total||0)) - (obC + (cAgg[0]?.total||0))
    : (obC + (cAgg[0]?.total||0)) - (obD + (dAgg[0]?.total||0));
  await Account.findByIdAndUpdate(accountId, { balance });
  return balance;
}

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
    const { bankAccountId, bankAccountName, branchName, branchCode,
            accountNumber, iban, accountTitle, startLeaf, endLeaf, bankLogoIndex } = req.body;

    if (!bankAccountId || !branchName || !branchCode || !accountNumber || !iban || !accountTitle || !startLeaf || !endLeaf)
      return res.status(400).json({ message: "All fields are required." });

    const start = parseInt(startLeaf), end = parseInt(endLeaf);
    if (isNaN(start) || isNaN(end) || end <= start)
      return res.status(400).json({ message: "Invalid leaf range." });

    const digits = Math.max(startLeaf.length, endLeaf.length);
    const book   = await ChequeBook.create({
      chequeBookId:    await nextChequeBookId(ChequeBook),
      bankAccountId, bankAccountName,
      branchName, branchCode, accountNumber, iban, accountTitle,
      startLeaf:       padLeaf(start, digits),
      endLeaf:         padLeaf(end,   digits),
      totalLeaves:     end - start + 1,
      lastIssuedLeaf:  null,
      discardedLeaves: [],
      bankLogoIndex:   bankLogoIndex || null,
      isActive:        true,
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
// Skips discarded leaves — they are permanently destroyed, never reused
export const getNextChequeNo = async (req, res) => {
  try {
    const { ChequeBook } = getModels(req.millId);
    const book = await ChequeBook.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Cheque book not found." });

    const digits    = book.startLeaf.length;
    const end       = parseInt(book.endLeaf);
    const discarded = new Set((book.discardedLeaves || []).map(l => parseInt(l)));

    let candidate = book.lastIssuedLeaf
      ? parseInt(book.lastIssuedLeaf) + 1
      : parseInt(book.startLeaf);

    // Skip over any discarded leaves
    while (candidate <= end && discarded.has(candidate)) candidate++;

    if (candidate > end)
      return res.status(400).json({ message: "All cheque leaves have been issued or discarded." });

    res.json({ nextChequeNo: padLeaf(candidate, digits), book });
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

    const leafNo = parseInt(chequeNo);
    if (leafNo < parseInt(book.startLeaf) || leafNo > parseInt(book.endLeaf))
      return res.status(400).json({ message: `Cheque no. ${chequeNo} is outside this book's range.` });

    // Reject discarded leaves
    if ((book.discardedLeaves || []).includes(chequeNo))
      return res.status(400).json({ message: `Cheque no. ${chequeNo} has been discarded and cannot be reused.` });

    // Reject already-used leaves
    if (await ChequeEntry.findOne({ chequeBookId, chequeNo }))
      return res.status(400).json({ message: `Cheque no. ${chequeNo} has already been issued.` });

    const payeeAcc = await Account.findById(payeeAccountId);
    if (!payeeAcc) return res.status(404).json({ message: "Payee account not found." });

    // ── Sufficient bank balance check ─────────────────────────────────────────
    const bankAccCheck = await Account.findById(book.bankAccountId);
    const availableBalance = bankAccCheck ? (bankAccCheck.balance || 0) : 0;
    if (amt > availableBalance) {
      return res.status(400).json({
        message: `Insufficient balance. Bank has Rs ${availableBalance.toLocaleString("en-PK")} available; cheque is Rs ${amt.toLocaleString("en-PK")}.`,
        insufficientBalance: true,
        available: availableBalance,
      });
    }

    const entryDate = new Date(date);

    // ── Create Journal Entry immediately (DR payee / CR bank) ────────────────
    // Balance is deducted NOW — even while cheque is pending — to prevent fraud.
    const journalEntry = await GeneralJournalEntry.create({
      entryDate,
      comments:      `Cheque No. ${chequeNo} — ${book.bankAccountName} — Issued to ${payeeAccountName} [PENDING]`,
      debitAccount:  payeeAccountId,
      debitAmount:   amt,
      debitLineDesc: `Cheque No. ${chequeNo} — Pending Clearance`,
      creditEntries: [{
        account:     book.bankAccountId,
        amount:      amt,
        description: `Cheque No. ${chequeNo} — ${book.branchName} (${book.branchCode}) [PENDING]`,
      }],
    });

    const entry = await ChequeEntry.create({
      chequeBookId, chequeNo, date: entryDate,
      payeeAccountId, payeeAccountName,
      amount: amt, amountInWords: amountToWords(amt),
      bankAccountId:   book.bankAccountId,
      bankAccountName: book.bankAccountName,
      journalEntryId:  journalEntry._id,
      status:          "pending",
      isLocked:        false,
      remarks:         remarks || "",
      branchName:    book.branchName,   branchCode:    book.branchCode,
      accountNumber: book.accountNumber, iban:          book.iban,
      accountTitle:  book.accountTitle,  bankLogoIndex: book.bankLogoIndex || null,
    });

    // Update lastIssuedLeaf on the book
    const digits = book.startLeaf.length;
    if (!book.lastIssuedLeaf || leafNo > parseInt(book.lastIssuedLeaf)) {
      book.lastIssuedLeaf = padLeaf(leafNo, digits);
      await book.save();
    }

    await recalcAccountBalance(req.millId, book.bankAccountId.toString());
    await recalcAccountBalance(req.millId, payeeAccountId.toString());

    res.status(201).json({ message: "Cheque entry created. Status: Pending.", chequeEntry: entry });
  } catch (err) {
    console.error("createChequeEntry error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /api/cheque-entries/:id/status
// ─────────────────────────────────────────────────────────────────────────────
export const updateChequeStatus = async (req, res) => {
  try {
    const { ChequeEntry, ChequeBook, GeneralJournalEntry } = getModels(req.millId);
    const { status } = req.body;

    if (!["pending","cleared","discarded"].includes(status))
      return res.status(400).json({ message: "Invalid status. Allowed: pending, cleared, discarded." });

    const entry = await ChequeEntry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Cheque entry not found." });

    if (entry.isLocked)
      return res.status(400).json({ message: "This cheque is locked (discarded) and cannot be modified." });

    if (entry.status === "cleared" && status === "pending")
      return res.status(400).json({ message: "A cleared cheque cannot be reverted to pending." });

    // ── CLEARED ──────────────────────────────────────────────────────────────
    if (status === "cleared") {
      // Balance already deducted at creation — just update narration and status
      if (entry.journalEntryId) {
        await GeneralJournalEntry.findByIdAndUpdate(entry.journalEntryId, {
          $set: {
            comments:      `Cheque No. ${entry.chequeNo} — ${entry.bankAccountName} — Cleared to ${entry.payeeAccountName}`,
            debitLineDesc: `Cheque No. ${entry.chequeNo} — Cleared`,
            "creditEntries.$[].description": `Cheque No. ${entry.chequeNo} — ${entry.branchName} (${entry.branchCode}) CLEARED`,
          },
        });
      }
      entry.status = "cleared";
      await entry.save();
      return res.json({ message: `Cheque No. ${entry.chequeNo} cleared.`, chequeEntry: entry });
    }

    // ── DISCARDED ─────────────────────────────────────────────────────────────
    if (status === "discarded") {
      const book = await ChequeBook.findById(entry.chequeBookId);

      // Mark original JE as discarded (for audit trail — it stays in the ledger)
      if (entry.journalEntryId) {
        await GeneralJournalEntry.findByIdAndUpdate(entry.journalEntryId, {
          comments:      `[DISCARDED] Cheque No. ${entry.chequeNo} — ${entry.bankAccountName} — ${entry.payeeAccountName}`,
          debitLineDesc: `Cheque No. ${entry.chequeNo} DISCARDED`,
          "meta.isDiscardedCheque": true,
          "meta.chequeNo":          entry.chequeNo,
        });
      }

      // Create REVERSAL JE (DR bank / CR payee) — restores both balances
      const reversalJE = await GeneralJournalEntry.create({
        entryDate:     new Date(),
        comments:      `Cheque No. ${entry.chequeNo} Discarded — Reversal | ${entry.bankAccountName} → ${entry.payeeAccountName} | PKR ${entry.amount.toLocaleString()}`,
        debitAccount:  entry.bankAccountId,
        debitAmount:   entry.amount,
        debitLineDesc: `Cheque No. ${entry.chequeNo} Discarded — Bank Balance Restored`,
        creditEntries: [{
          account:     entry.payeeAccountId,
          amount:      entry.amount,
          description: `Cheque No. ${entry.chequeNo} Discarded — Amount reversed from ${entry.payeeAccountName}`,
        }],
        meta: {
          isDiscardedCheque:    true,
          chequeNo:             entry.chequeNo,
          isReversalEntry:      true,
        },
      });

      // Lock permanently
      entry.status                 = "discarded";
      entry.isLocked               = true;
      entry.reversalJournalEntryId = reversalJE._id;
      await entry.save();

      // Add leaf to discardedLeaves on the book (permanently destroyed — never reused)
      if (book) {
        const leafStr = padLeaf(parseInt(entry.chequeNo), book.startLeaf.length);
        if (!book.discardedLeaves.includes(leafStr)) {
          book.discardedLeaves.push(leafStr);
          await book.save();
        }
      }

      // ── Restore balances: direct $inc THEN full recalc ─────────────────────
      // Direct $inc is immediate and reliable; recalcAccountBalance verifies from all JEs.
      const { Account: AccountModel } = getModels(req.millId);
      const bankId  = entry.bankAccountId?.toString?.()  || String(entry.bankAccountId);
      const payeeId = entry.payeeAccountId?.toString?.() || String(entry.payeeAccountId);

      // Bank was CREDITED in original JE (balance decreased) → reversal DEBITS bank → balance increases
      await AccountModel.findByIdAndUpdate(bankId, { $inc: { balance: entry.amount } });

      // Payee was DEBITED in original JE → reversal CREDITS payee
      // For Assets/Expense (debit-normal): credit DECREASES balance
      // For Liabilities/Equity/Revenue (credit-normal): credit INCREASES balance
      const payeeDoc = await AccountModel.findById(payeeId);
      if (payeeDoc) {
        const isDebitNormal = payeeDoc.accountType === "Assets" || payeeDoc.accountType === "Expense";
        const delta = isDebitNormal ? -entry.amount : entry.amount;
        await AccountModel.findByIdAndUpdate(payeeId, { $inc: { balance: delta } });
      }

      // Full recalc overwrites with accurate aggregation-based result
      try { await recalcAccountBalance(req.millId, bankId);  } catch(e) { console.warn("recalc bank failed:", e.message); }
      try { await recalcAccountBalance(req.millId, payeeId); } catch(e) { console.warn("recalc payee failed:", e.message); }

      return res.json({
        message:     `Cheque No. ${entry.chequeNo} discarded. Balances restored. Entry locked permanently.`,
        chequeEntry: entry,
        reversalJEId: reversalJE._id,
      });
    }
  } catch (err) {
    console.error("updateChequeStatus error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/cheque-entries/:id  —  Edit (only if status="pending" and not locked)
// ─────────────────────────────────────────────────────────────────────────────
export const editChequeEntry = async (req, res) => {
  try {
    const { ChequeBook, ChequeEntry, GeneralJournalEntry, Account } = getModels(req.millId);
    const { date, payeeAccountId, payeeAccountName, amount, remarks } = req.body;

    if (!date || !payeeAccountId || !amount)
      return res.status(400).json({ message: "date, payeeAccountId, and amount are required." });

    const entry = await ChequeEntry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Cheque entry not found." });

    if (entry.isLocked)
      return res.status(400).json({ message: "This entry is locked (discarded) and cannot be edited." });

    if (entry.status !== "pending")
      return res.status(400).json({ message: `Only pending cheques can be edited. Status: "${entry.status}".` });

    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) return res.status(400).json({ message: "Invalid amount." });
    if (amt > 100000000000)     return res.status(400).json({ message: "Amount exceeds maximum limit." });

    const newPayee = await Account.findById(payeeAccountId);
    if (!newPayee) return res.status(404).json({ message: "Payee account not found." });

    const book = await ChequeBook.findById(entry.chequeBookId);
    if (!book) return res.status(404).json({ message: "Cheque book not found." });

    const accountsToRecalc = new Set([
      book.bankAccountId.toString(),
      entry.payeeAccountId.toString(),
      payeeAccountId.toString(),
    ]);

    if (entry.journalEntryId) {
      const oldJE = await GeneralJournalEntry.findById(entry.journalEntryId);
      if (oldJE) {
        getJEAccountIds(oldJE).forEach(id => accountsToRecalc.add(id));
        await GeneralJournalEntry.findByIdAndDelete(entry.journalEntryId);
      }
    }

    const entryDate = new Date(date);
    const payeeName = payeeAccountName || newPayee.accountName;

    const newJE = await GeneralJournalEntry.create({
      entryDate,
      comments:      `Cheque No. ${entry.chequeNo} — ${book.bankAccountName} — Issued to ${payeeName} [PENDING]`,
      debitAccount:  payeeAccountId,
      debitAmount:   amt,
      debitLineDesc: `Cheque No. ${entry.chequeNo} — Pending Clearance`,
      creditEntries: [{
        account:     book.bankAccountId,
        amount:      amt,
        description: `Cheque No. ${entry.chequeNo} — ${book.branchName} (${book.branchCode}) [PENDING]`,
      }],
    });

    getJEAccountIds(newJE).forEach(id => accountsToRecalc.add(id));

    entry.date             = entryDate;
    entry.payeeAccountId   = payeeAccountId;
    entry.payeeAccountName = payeeName;
    entry.amount           = amt;
    entry.amountInWords    = amountToWords(amt);
    entry.remarks          = remarks || "";
    entry.journalEntryId   = newJE._id;
    await entry.save();

    for (const accId of accountsToRecalc) {
      try { await recalcAccountBalance(req.millId, accId); } catch(e) {}
    }

    res.json({ message: `Cheque No. ${entry.chequeNo} updated.`, chequeEntry: entry });
  } catch (err) {
    console.error("editChequeEntry error:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET /api/cheque-entries
export const getChequeEntries = async (req, res) => {
  try {
    const { ChequeEntry } = getModels(req.millId);
    const filter  = req.query.chequeBookId ? { chequeBookId: req.query.chequeBookId } : {};
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