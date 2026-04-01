// utils/seasonArchiveUtil.js
//
// Called by activateSeason in Profilecontroller.
//
// archiveAndTransition(millId, newSeason):
//   1. Snapshots every account's closing balance
//   2. Copies all journal entries + cashbooks to millId_archive DB
//   3. Writes SeasonArchiveMeta to main DB (for in-app display)
//   4. Deletes journal entries + cashbooks from main DB (entries wiped, accounts kept)
//   5. Carries closing balance → new opening balance for EVERY account
//   6. Creates a fresh Cashbook for the new season year
//   7. Sets Cash In Hand = new season's openingBalance
//
// initSeasonCashbook(millId, season):
//   First-ever season — just create Cashbook + set Cash In Hand. No archiving.
//
// NEVER deleted: Accounts, Employees, ChequeBooks, Vehicles, BagTypes, Products.

import mongoose from "mongoose";
import { getModels, getArchiveDb } from "../config/millDB.js";

function getArchiveModel(archiveDb, modelName) {
  if (archiveDb.models[modelName]) return archiveDb.models[modelName];
  return archiveDb.model(modelName, new mongoose.Schema({}, { strict: false, timestamps: false }));
}

// ─────────────────────────────────────────────────────────────────────────────
export async function archiveAndTransition(millId, newSeason) {
  const { Account, GeneralJournalEntry, Cashbook, Season, SeasonArchiveMeta } = getModels(millId);

  // ── 1. Find the currently active season ──────────────────────────────────
  const oldSeason = await Season.findOne({ isActive: true });

  // ── 2. Snapshot every account's current balance ───────────────────────────
  const accounts = await Account.find().lean();
  const accountSnapshot = {};
  let cashInHandBalance = 0;

  for (const acc of accounts) {
    accountSnapshot[acc._id.toString()] = {
      autoAccountId:  acc.autoAccountId,
      accountName:    acc.accountName,
      accountType:    acc.accountType,
      subAccountType: acc.subAccountType,
      closingBalance: acc.balance,
    };
    if (acc.isProtected) cashInHandBalance = acc.balance;
  }

  // ── 3. Archive to millId_archive DB ──────────────────────────────────────
  if (oldSeason) {
    const archiveDb   = getArchiveDb(millId);
    const ArchiveJE   = getArchiveModel(archiveDb, "ArchivedJournalEntries");
    const ArchiveCB   = getArchiveModel(archiveDb, "ArchivedCashbooks");
    const ArchiveMeta = getArchiveModel(archiveDb, "ArchiveMeta");

    const journalEntries = await GeneralJournalEntry.find().lean();
    const cashbooks      = await Cashbook.find().lean();

    const seasonMeta = {
      seasonId:   oldSeason._id,
      seasonCode: oldSeason.seasonCode || oldSeason._id.toString(),
      seasonName: oldSeason.name || `Season ${oldSeason._id}`,
      startDate:  oldSeason.startDate,
      endDate:    oldSeason.endDate,
      archivedAt: new Date(),
    };

    if (journalEntries.length) {
      await ArchiveJE.insertMany(
        journalEntries.map(e => ({ ...e, _id: undefined, originalId: e._id.toString(), ...seasonMeta }))
      );
    }
    if (cashbooks.length) {
      await ArchiveCB.insertMany(
        cashbooks.map(cb => ({ ...cb, _id: undefined, originalId: cb._id.toString(), ...seasonMeta }))
      );
    }
    await ArchiveMeta.create({
      ...seasonMeta, journalEntryCount: journalEntries.length,
      cashbookYears: cashbooks.map(cb => cb.year),
      accountSnapshot, cashInHandClosingBalance: cashInHandBalance,
    });

    // Also write summary to main DB for in-app display
    await SeasonArchiveMeta.create({
      seasonId:   oldSeason._id,
      seasonCode: seasonMeta.seasonCode,
      seasonName: seasonMeta.seasonName,
      startDate:  oldSeason.startDate,
      endDate:    oldSeason.endDate,
      archivedAt: new Date(),
      entryCount: journalEntries.length,
      invoiceCount: 0,
      accountSnapshot,
      cashInHandClosingBalance: cashInHandBalance,
    });

    console.log(`✅ Archived season "${seasonMeta.seasonName}": ${journalEntries.length} journal entries → ${millId}_archive`);
  }

  // ── 4. Clear journal entries + cashbooks from main DB ─────────────────────
  await GeneralJournalEntry.deleteMany({});
  await Cashbook.deleteMany({});
  console.log(`🧹 Cleared journal entries and cashbooks for mill ${millId}`);

  // ── 5. Carry closing balance → new opening balance for every account ───────
  // Bank accounts, supplier payables, equity, etc. all continue from where
  // they left off. Only the raw entry history is wiped.
  for (const acc of accounts) {
    const closing = acc.balance;
    let newTotalDebit = 0, newTotalCredit = 0;

    // Normal side for Assets/Expense = Debit; for Liabilities/Equity/Revenue = Credit
    if (acc.accountType === "Assets" || acc.accountType === "Expense") {
      newTotalDebit  = closing >= 0 ? closing : 0;
      newTotalCredit = closing <  0 ? Math.abs(closing) : 0;
    } else {
      newTotalCredit = closing >= 0 ? closing : 0;
      newTotalDebit  = closing <  0 ? Math.abs(closing) : 0;
    }

    await Account.findByIdAndUpdate(acc._id, {
      totalDebit:  newTotalDebit,
      totalCredit: newTotalCredit,
      balance:     closing,  // unchanged — just carried forward
    });
  }
  console.log(`✅ ${accounts.length} account opening balances carried over for mill ${millId}`);

  // ── 6. Compute new opening balance for Cash In Hand ─────────────────────
  // Rules (as defined by admin):
  //   - If openingBalance = 0  → carry forward current CIH closing balance unchanged
  //   - If openingBalance > 0  → add that amount on top of closing balance
  //   - If openingBalance < 0  → subtract that amount from closing balance
  const newYear = new Date().getFullYear();
  const adjustment = Number(newSeason.openingBalance) || 0;
  const newOpeningBalance = cashInHandBalance + adjustment;
  // cashInHandBalance was captured in step 2 above from the account snapshot

  await Cashbook.create({ year: newYear, openingBalance: newOpeningBalance, entries: [] });

  // ── 7. Set Cash In Hand = computed new opening balance ────────────────────
  const cashAcc = await Account.findOne({ isProtected: true });
  if (cashAcc) {
    await Account.findByIdAndUpdate(cashAcc._id, {
      balance:     newOpeningBalance,
      totalDebit:  newOpeningBalance,
      totalCredit: 0,
    });
  }

  console.log(`✅ New season "${newSeason.name || newSeason._id}" active. Cash In Hand: Rs ${newOpeningBalance} (was Rs ${cashInHandBalance}, adjustment: ${adjustment >= 0 ? "+" : ""}${adjustment})`);
  return { accountsCarriedOver: accounts.length, newCashbookYear: newYear, newOpeningBalance };
}

// ─────────────────────────────────────────────────────────────────────────────
// First-ever season: just create the cashbook, nothing to archive.
// ─────────────────────────────────────────────────────────────────────────────
export async function initSeasonCashbook(millId, season) {
  const { Cashbook, Account } = getModels(millId);
  const year = new Date().getFullYear();
  const openingBalance = Number(season.openingBalance) || 0;

  const existing = await Cashbook.findOne({ year });
  if (!existing) {
    await Cashbook.create({ year, openingBalance, entries: [] });
  }

  const cashAcc = await Account.findOne({ isProtected: true });
  if (cashAcc && cashAcc.balance === 0 && openingBalance > 0) {
    await Account.findByIdAndUpdate(cashAcc._id, {
      balance: openingBalance, totalDebit: openingBalance, totalCredit: 0,
    });
  }
}