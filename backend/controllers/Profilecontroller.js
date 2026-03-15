// controllers/profileController.js
// ─────────────────────────────────────────────────────────────────────────────
// Admin profile: view/edit credentials, seasons, vehicles, payments, complaints
// ─────────────────────────────────────────────────────────────────────────────
import bcrypt            from "bcryptjs";
import mongoose           from "mongoose";
import { getMasterModels } from "../config/masterDB.js";
import { getModels, getArchiveDb } from "../config/millDB.js";

// ─── Get/create the mill's protected CASH IN HAND account ──────────────────
async function getCashInHandAccount(millId) {
  const { Account } = getModels(millId);
  let acc = await Account.findOne({ isProtected: true });
  if (acc) return acc;
  const lastAcc = await Account.findOne().sort({ createdAt: -1 });
  let lastNum = 0;
  if (lastAcc?.autoAccountId) lastNum = parseInt((lastAcc.autoAccountId.split("-")[1])||"0");
  const autoAccountId = "ACC-" + (lastNum + 1).toString().padStart(6, "0");
  acc = await Account.create({
    autoAccountId, manualAccountId: "CASH-001",
    accountType: "Assets", subAccountType: "Current Assets",
    accountName: "CASH IN HAND", LedgerRef: "CASH",
    isProtected: true, balance: 0,
  });
  return acc;
}

// ─── helpers ─────────────────────────────────────────────────────────────────
const mill = async (millId) => {
  const { Mill } = getMasterModels();
  return Mill.findOne({ millId });
};

// ═════════════════════════════════════════════════════════════════════════════
// PROFILE INFO
// ═════════════════════════════════════════════════════════════════════════════

// GET /api/profile
export const getProfile = async (req, res) => {
  try {
    const m = await mill(req.millId);
    if (!m) return res.status(404).json({ message: "Mill not found" });
    const { adminPassword, ...safe } = m.toObject();
    res.json({ profile: safe });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/profile
export const updateProfile = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const { businessName, ownerName, email, phone } = req.body;
    const updated = await Mill.findOneAndUpdate(
      { millId: req.millId },
      { businessName, ownerName, email, phone },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Mill not found" });
    const { adminPassword, ...safe } = updated.toObject();
    // Reflect name change in localStorage (send back to frontend)
    res.json({ message: "Profile updated successfully", profile: safe });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/profile/logo  (multipart — single file)
export const updateProfileLogo = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const logoUrl = req.file.path.replace(/\\/g, "/");
    const updated = await Mill.findOneAndUpdate(
      { millId: req.millId },
      { logoUrl },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Mill not found" });
    res.json({ message: "Profile picture updated", logoUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/profile/password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: "Both current and new password are required" });
    if (newPassword.length < 8)
      return res.status(400).json({ message: "New password must be at least 8 characters" });

    const m = await mill(req.millId);
    if (!m) return res.status(404).json({ message: "Mill not found" });

    const match = await bcrypt.compare(currentPassword, m.adminPassword);
    if (!match) return res.status(401).json({ message: "Current password is incorrect" });

    m.adminPassword = await bcrypt.hash(newPassword, 10);
    await m.save();
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// VEHICLES & RATES  (per-mill custom vehicles — reflected in Weight Bridge)
// ═════════════════════════════════════════════════════════════════════════════

// GET /api/profile/vehicles
export const getVehicles = async (req, res) => {
  try {
    const { Vehicle } = getModels(req.millId);
    const vehicles = await Vehicle.find().sort({ createdAt: 1 });
    res.json({ vehicles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/profile/vehicles
export const addVehicle = async (req, res) => {
  try {
    const { Vehicle } = getModels(req.millId);
    const { vehicleType, rate } = req.body;
    if (!vehicleType || rate === undefined)
      return res.status(400).json({ message: "vehicleType and rate are required" });
    const v = await Vehicle.create({ vehicleType: vehicleType.trim(), rate: Number(rate) });
    res.status(201).json({ message: "Vehicle added", vehicle: v });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/profile/vehicles/:id
export const updateVehicle = async (req, res) => {
  try {
    const { Vehicle } = getModels(req.millId);
    const { vehicleType, rate, isActive } = req.body;
    const v = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { vehicleType, rate: Number(rate), isActive },
      { new: true }
    );
    if (!v) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle updated", vehicle: v });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/profile/vehicles/:id
export const deleteVehicle = async (req, res) => {
  try {
    const { Vehicle } = getModels(req.millId);
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Vehicle removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// SEASONS  (admin-defined date ranges + opening balance)
// ═════════════════════════════════════════════════════════════════════════════

// GET /api/profile/seasons
export const getSeasons = async (req, res) => {
  try {
    const { Season } = getModels(req.millId);
    const seasons = await Season.find().sort({ startDate: -1 });
    res.json({ seasons });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/profile/seasons/active  (used by cashbook to get OB)
export const getActiveSeason = async (req, res) => {
  try {
    const { Season } = getModels(req.millId);
    const season = await Season.findOne({ isActive: true });
    res.json({ season: season || null });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/profile/seasons
export const addSeason = async (req, res) => {
  try {
    const { Season } = getModels(req.millId);
    const { startDate, endDate, openingBalance } = req.body;
    if (!startDate || !endDate)
      return res.status(400).json({ message: "startDate and endDate are required" });

    // Server-side guard: block if any season end date is still in the future
    const today = new Date(); today.setHours(0,0,0,0);
    const ongoingSeason = await Season.findOne({ endDate: { $gt: today } });
    if (ongoingSeason) {
      return res.status(400).json({
        message: `Cannot add a new season while "${ongoingSeason.name}" is still active (ends ${new Date(ongoingSeason.endDate).toLocaleDateString()}).`
      });
    }

    // Auto-generate season code based on count
    const count = await Season.countDocuments();
    const seasonCode = String(count + 1).padStart(3, "0");
    const name       = `S-${seasonCode}`;

    const season = await Season.create({
      name, seasonCode, startDate, endDate,
      openingBalance: Number(openingBalance || 0),
      isActive: false,
    });
    res.status(201).json({ message: "Season added", season });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── Archive season data into ${millId}_archive DB ──────────────────────────
async function archiveSeasonData(millId, prevSeason) {
  try {
    const models = getModels(millId);
    const archiveDb = getArchiveDb(millId);
    const code = prevSeason.seasonCode || "000";

    const [entries, cashbooks, purchaseInvoices, salesInvoices, weightBridges, accounts] =
      await Promise.all([
        models.GeneralJournalEntry.find().lean(),
        models.Cashbook.find().lean(),
        models.PurchaseInvoice.find().lean(),
        models.SalesInvoice.find().lean(),
        models.WeightBridge.find().lean(),
        models.Account.find().lean(),
      ]);

    // Dynamic collection helpers for archive DB
    const mongoose = (await import("mongoose")).default;
    const raw = (name, data) => {
      if (!data.length) return Promise.resolve();
      const col = archiveDb.collection(`s${code}_${name}`);
      return col.insertMany(data);
    };

    await Promise.all([
      raw("entries",          entries),
      raw("cashbooks",        cashbooks),
      raw("purchase_invoices",purchaseInvoices),
      raw("sales_invoices",   salesInvoices),
      raw("weight_bridge",    weightBridges),
      raw("accounts_snapshot",accounts),
    ]);

    // Save archive metadata
    await models.SeasonArchiveMeta.create({
      seasonId:      prevSeason._id,
      seasonCode:    prevSeason.seasonCode,
      seasonName:    prevSeason.name,
      startDate:     prevSeason.startDate,
      endDate:       prevSeason.endDate,
      archivedAt:    new Date(),
      entryCount:    entries.length,
      invoiceCount:  purchaseInvoices.length + salesInvoices.length,
      accountSnapshot: accounts.reduce((m,a) => { m[a.accountName] = a.balance; return m; }, {}),
      cashInHandClosingBalance: accounts.find(a => a.isProtected)?.balance || 0,
    });

    console.log(`✅ Archived season ${prevSeason.name} for ${millId}: ${entries.length} entries, ${purchaseInvoices.length+salesInvoices.length} invoices`);
    return { entries: entries.length, invoices: purchaseInvoices.length + salesInvoices.length };
  } catch (err) {
    console.error("Archive failed (non-fatal):", err.message);
    return { error: err.message };
  }
}

// ─── Wipe all operational data (keep accounts + employees + seasons) ─────────
async function wipeOperationalData(millId) {
  const models = getModels(millId);
  await Promise.all([
    models.GeneralJournalEntry.deleteMany({}),
    models.Cashbook.deleteMany({}),
    models.PurchaseInvoice.deleteMany({}),
    models.SalesInvoice.deleteMany({}),
    models.WeightBridge.deleteMany({}),
  ]);
  console.log(`✅ Operational data wiped for ${millId}`);
}

// ─── Carry forward account balances as new opening balances ──────────────────
// Each account's last balance becomes its new stored totalDebit/totalCredit.
// Cash In Hand gets: closingBalance + newSeasonOpeningBalance.
async function rolloverAccountBalances(millId, newCashOpeningBalance) {
  const { Account } = getModels(millId);
  const accounts = await Account.find();

  for (const acc of accounts) {
    const closing = acc.balance || 0;

    if (acc.isProtected) {
      // CASH IN HAND: carry forward closing + add new season opening balance
      const newBalance = closing + Number(newCashOpeningBalance);
      await Account.findByIdAndUpdate(acc._id, {
        totalDebit:  newBalance >= 0 ? newBalance : 0,
        totalCredit: newBalance < 0  ? Math.abs(newBalance) : 0,
        balance:     newBalance,
      });
    } else {
      // All other accounts: closing balance becomes new opening balance
      // Determine which side to put it on based on sign + account normal balance
      const at = acc.accountType;
      const isDebitNormal = at === "Assets" || at === "Expense";

      let newTotalDebit = 0, newTotalCredit = 0;
      if (closing >= 0) {
        // Positive balance = debit side for Assets/Expense, credit for others
        if (isDebitNormal) { newTotalDebit = closing;  }
        else               { newTotalCredit = closing; }
      } else {
        // Negative balance = credit side for Assets/Expense, debit for others
        const abs = Math.abs(closing);
        if (isDebitNormal) { newTotalCredit = abs; }
        else               { newTotalDebit  = abs; }
      }

      await Account.findByIdAndUpdate(acc._id, {
        totalDebit:  newTotalDebit,
        totalCredit: newTotalCredit,
        balance:     closing,  // balance unchanged — it's now the opening
      });
    }
  }
  console.log(`✅ Account balances rolled over for ${millId}`);
}

// POST /api/profile/seasons/:id/activate
// Full rollover flow:
//   1. Archive previous season data to ${millId}_archive DB
//   2. Carry forward all account balances as new opening balances
//   3. Cash In Hand = closing + new season opening balance
//   4. Wipe all operational data from live DB
//   5. Create fresh cashbook for new season year
//   6. Activate the new season
export const activateSeason = async (req, res) => {
  try {
    const { Season, Cashbook } = getModels(req.millId);
    const season = await Season.findById(req.params.id);
    if (!season) return res.status(404).json({ message: "Season not found" });

    // Find the previously active season (if any)
    const prevSeason = await Season.findOne({ isActive: true });
    let archiveResult = null;

    if (prevSeason && prevSeason._id.toString() !== season._id.toString()) {
      // 1. Archive previous season's live data
      archiveResult = await archiveSeasonData(req.millId, prevSeason);

      // 2. Roll over all account balances (including Cash In Hand)
      await rolloverAccountBalances(req.millId, season.openingBalance);

      // 3. Wipe operational data
      await wipeOperationalData(req.millId);
    } else {
      // First-ever season activation — just set Cash In Hand balance directly
      const cashAcc = await getCashInHandAccount(req.millId);
      const { Account } = getModels(req.millId);
      const ob = Number(season.openingBalance);
      await Account.findByIdAndUpdate(cashAcc._id, {
        balance: ob, totalDebit: ob >= 0 ? ob : 0, totalCredit: ob < 0 ? Math.abs(ob) : 0,
      });
    }

    // Deactivate all, activate new
    await Season.updateMany({}, { isActive: false });
    season.isActive = true;
    await season.save();

    // Create fresh cashbook for new season year
    const year = new Date(season.startDate).getFullYear();
    await Cashbook.deleteMany({ year });
    await Cashbook.create({ year, openingBalance: season.openingBalance, entries: [] });

    res.json({
      message: `Season ${season.name} activated.${archiveResult ? ` Previous season archived (${archiveResult.entries} entries, ${archiveResult.invoices} invoices).` : ""} New opening balance: Rs ${season.openingBalance.toLocaleString()}.`,
      season,
      archiveResult,
    });
  } catch (err) {
    console.error("activateSeason error:", err);
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/profile/seasons/:id
export const updateSeason = async (req, res) => {
  try {
    const { Season } = getModels(req.millId);
    const { startDate, endDate, openingBalance } = req.body;
    const s = await Season.findByIdAndUpdate(
      req.params.id,
      { startDate, endDate, openingBalance: Number(openingBalance || 0) },
      { new: true }
    );
    if (!s) return res.status(404).json({ message: "Season not found" });
    res.json({ message: "Season updated", season: s });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/profile/seasons/archives  — lists all archived seasons
export const getSeasonArchives = async (req, res) => {
  try {
    const { SeasonArchiveMeta } = getModels(req.millId);
    const archives = await SeasonArchiveMeta.find().sort({ archivedAt: -1 }).lean();
    res.json({ archives });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/profile/seasons/:id
export const deleteSeason = async (req, res) => {
  try {
    const { Season } = getModels(req.millId);
    await Season.findByIdAndDelete(req.params.id);
    res.json({ message: "Season deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// PAYMENT HISTORY  (read from masterDB)
// ═════════════════════════════════════════════════════════════════════════════

// GET /api/profile/payments
export const getPaymentHistory = async (req, res) => {
  try {
    const m = await mill(req.millId);
    if (!m) return res.status(404).json({ message: "Mill not found" });
    const history = [...(m.paymentHistory || [])].sort(
      (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
    );
    res.json({ payments: history, billingDate: m.billingDate, planExpiry: m.planExpiry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// COMPLAINTS / FEEDBACK / DELETION REQUESTS
// ═════════════════════════════════════════════════════════════════════════════

// POST /api/profile/complaint
export const submitComplaint = async (req, res) => {
  try {
    const { Complaint } = getModels(req.millId);
    const { type, subject, message } = req.body;
    if (!subject || !message)
      return res.status(400).json({ message: "Subject and message are required" });

    const c = await Complaint.create({
      type: type || "complaint",
      subject: subject.trim(),
      message: message.trim(),
    });

    // Forward to master DB inbox
    try {
      const { Mill, GlobalRequest } = getMasterModels();
      const mill = await Mill.findOne({ millId: req.millId }).select("businessName");
      await GlobalRequest.create({
        millId:       req.millId,
        businessName: mill?.businessName || req.millId,
        type:         type || "complaint",
        subject:      subject.trim(),
        message:      message.trim(),
      });
    } catch (fwdErr) {
      console.warn("Failed to forward complaint to master DB:", fwdErr.message);
    }

    res.status(201).json({ message: "Submitted successfully. We will respond within 2-3 business days.", complaint: c });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/profile/complaints
export const getComplaints = async (req, res) => {
  try {
    const { Complaint } = getModels(req.millId);
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json({ complaints });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};