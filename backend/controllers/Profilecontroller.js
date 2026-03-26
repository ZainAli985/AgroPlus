// controllers/profileController.js
import bcrypt              from "bcryptjs";
import { getMasterModels } from "../config/masterDB.js";
import { getModels, getArchiveDb } from "../config/millDB.js";
import {
  uploadToCloudinary, deleteFromCloudinary,
  extractPublicId,   UPLOAD_CONTEXT,
} from "../utils/cloudinaryUpload.js";

// ── helpers ───────────────────────────────────────────────────────────────────
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

const mill = async (millId) => {
  const { Mill } = getMasterModels();
  return Mill.findOne({ millId });
};

// ═════════════════════════════════════════════════════════════════════════════
// PROFILE INFO
// ═════════════════════════════════════════════════════════════════════════════

export const getProfile = async (req, res) => {
  try {
    const m = await mill(req.millId);
    if (!m) return res.status(404).json({ message: "Mill not found" });
    const { adminPassword, ...safe } = m.toObject();
    res.json({ profile: safe });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

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
    res.json({ message: "Profile updated successfully", profile: safe });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// PUT /api/profile/logo  — uploads to agro-plus/mills/{millId}/admin/
export const updateProfileLogo = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Delete old logo from Cloudinary if it exists
    const existing = await Mill.findOne({ millId: req.millId });
    if (existing?.logoUrl) {
      const oldId = extractPublicId(existing.logoUrl);
      if (oldId) deleteFromCloudinary(oldId).catch(() => {});
    }

    // Upload new logo: agro-plus/mills/{millId}/admin/logo_{ts}
    const result = await uploadToCloudinary(
      req.file.buffer,
      UPLOAD_CONTEXT.MILL_ADMIN,
      req.millId,
      `logo_${req.millId}`,
      { width: 400, crop: "limit" }
    );

    const updated = await Mill.findOneAndUpdate(
      { millId: req.millId },
      { logoUrl: result.url },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Mill not found" });
    res.json({ message: "Profile picture updated", logoUrl: result.url, thumbnailUrl: result.thumbnailUrl });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: "Both passwords are required" });
    if (newPassword.length < 8)
      return res.status(400).json({ message: "New password must be at least 8 characters" });
    const m = await mill(req.millId);
    if (!m) return res.status(404).json({ message: "Mill not found" });
    const match = await bcrypt.compare(currentPassword, m.adminPassword);
    if (!match) return res.status(401).json({ message: "Current password is incorrect" });
    m.adminPassword = await bcrypt.hash(newPassword, 10);
    await m.save();
    res.json({ message: "Password changed successfully" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ═════════════════════════════════════════════════════════════════════════════
// VEHICLES
// ═════════════════════════════════════════════════════════════════════════════

export const getVehicles = async (req, res) => {
  try {
    const { Vehicle } = getModels(req.millId);
    res.json({ vehicles: await Vehicle.find().sort({ createdAt: 1 }) });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const addVehicle = async (req, res) => {
  try {
    const { Vehicle } = getModels(req.millId);
    const { vehicleType, rate } = req.body;
    if (!vehicleType || rate === undefined)
      return res.status(400).json({ message: "vehicleType and rate are required" });
    const v = await Vehicle.create({ vehicleType: vehicleType.trim(), rate: Number(rate) });
    res.status(201).json({ message: "Vehicle added", vehicle: v });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const updateVehicle = async (req, res) => {
  try {
    const { Vehicle } = getModels(req.millId);
    const { vehicleType, rate, isActive } = req.body;
    const v = await Vehicle.findByIdAndUpdate(
      req.params.id, { vehicleType, rate: Number(rate), isActive }, { new: true }
    );
    if (!v) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle updated", vehicle: v });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const deleteVehicle = async (req, res) => {
  try {
    const { Vehicle } = getModels(req.millId);
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Vehicle removed" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ═════════════════════════════════════════════════════════════════════════════
// SEASONS
// ═════════════════════════════════════════════════════════════════════════════

export const getSeasons = async (req, res) => {
  try {
    const { Season } = getModels(req.millId);
    res.json({ seasons: await Season.find().sort({ startDate: -1 }) });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getActiveSeason = async (req, res) => {
  try {
    const { Season } = getModels(req.millId);
    res.json({ season: await Season.findOne({ isActive: true }) || null });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const addSeason = async (req, res) => {
  try {
    const { Season } = getModels(req.millId);
    const { startDate, endDate, openingBalance } = req.body;
    if (!startDate || !endDate)
      return res.status(400).json({ message: "startDate and endDate are required" });
    const today = new Date(); today.setHours(0,0,0,0);
    const ongoingSeason = await Season.findOne({ endDate: { $gt: today } });
    if (ongoingSeason)
      return res.status(400).json({ message: `Cannot add a new season while "${ongoingSeason.name}" is still active.` });
    const count      = await Season.countDocuments();
    const seasonCode = String(count + 1).padStart(3, "0");
    const season     = await Season.create({
      name: `S-${seasonCode}`, seasonCode, startDate, endDate,
      openingBalance: Number(openingBalance || 0), isActive: false,
    });
    res.status(201).json({ message: "Season added", season });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

async function archiveSeasonData(millId, prevSeason) {
  try {
    const models    = getModels(millId);
    const archiveDb = getArchiveDb(millId);
    const code      = prevSeason.seasonCode || "000";
    const [entries, cashbooks, purchaseInvoices, salesInvoices, weightBridges, accounts] =
      await Promise.all([
        models.GeneralJournalEntry.find().lean(),
        models.Cashbook.find().lean(),
        models.PurchaseInvoice.find().lean(),
        models.SalesInvoice.find().lean(),
        models.WeightBridge.find().lean(),
        models.Account.find().lean(),
      ]);
    const raw = (name, data) => {
      if (!data.length) return Promise.resolve();
      return archiveDb.collection(`s${code}_${name}`).insertMany(data);
    };
    await Promise.all([
      raw("entries", entries), raw("cashbooks", cashbooks),
      raw("purchase_invoices", purchaseInvoices), raw("sales_invoices", salesInvoices),
      raw("weight_bridge", weightBridges), raw("accounts_snapshot", accounts),
    ]);
    await models.SeasonArchiveMeta.create({
      seasonId: prevSeason._id, seasonCode: prevSeason.seasonCode,
      seasonName: prevSeason.name, startDate: prevSeason.startDate,
      endDate: prevSeason.endDate, archivedAt: new Date(),
      entryCount: entries.length,
      invoiceCount: purchaseInvoices.length + salesInvoices.length,
      accountSnapshot: accounts.reduce((m,a) => { m[a.accountName] = a.balance; return m; }, {}),
      cashInHandClosingBalance: accounts.find(a => a.isProtected)?.balance || 0,
    });
    return { entries: entries.length, invoices: purchaseInvoices.length + salesInvoices.length };
  } catch (err) {
    console.error("Archive failed:", err.message);
    return { error: err.message };
  }
}

async function wipeOperationalData(millId) {
  const models = getModels(millId);
  await Promise.all([
    models.GeneralJournalEntry.deleteMany({}),
    models.Cashbook.deleteMany({}),
    models.PurchaseInvoice.deleteMany({}),
    models.SalesInvoice.deleteMany({}),
    models.WeightBridge.deleteMany({}),
  ]);
}

async function rolloverAccountBalances(millId, newCashOpeningBalance) {
  const { Account } = getModels(millId);
  const accounts = await Account.find();
  for (const acc of accounts) {
    const closing = acc.balance || 0;
    if (acc.isProtected) {
      const newBalance = closing + Number(newCashOpeningBalance);
      await Account.findByIdAndUpdate(acc._id, {
        totalDebit:  newBalance >= 0 ? newBalance : 0,
        totalCredit: newBalance <  0 ? Math.abs(newBalance) : 0,
        balance:     newBalance,
      });
    } else {
      const isDebitNormal = acc.accountType === "Assets" || acc.accountType === "Expense";
      let newTotalDebit = 0, newTotalCredit = 0;
      if (closing >= 0) {
        if (isDebitNormal) newTotalDebit  = closing;
        else               newTotalCredit = closing;
      } else {
        const abs = Math.abs(closing);
        if (isDebitNormal) newTotalCredit = abs;
        else               newTotalDebit  = abs;
      }
      await Account.findByIdAndUpdate(acc._id, { totalDebit: newTotalDebit, totalCredit: newTotalCredit, balance: closing });
    }
  }
}

export const activateSeason = async (req, res) => {
  try {
    const { Season, Cashbook } = getModels(req.millId);
    const season = await Season.findById(req.params.id);
    if (!season) return res.status(404).json({ message: "Season not found" });
    const prevSeason = await Season.findOne({ isActive: true });
    let archiveResult = null;
    if (prevSeason && prevSeason._id.toString() !== season._id.toString()) {
      archiveResult = await archiveSeasonData(req.millId, prevSeason);
      await rolloverAccountBalances(req.millId, season.openingBalance);
      await wipeOperationalData(req.millId);
    } else {
      const cashAcc = await getCashInHandAccount(req.millId);
      const { Account } = getModels(req.millId);
      const ob = Number(season.openingBalance);
      await Account.findByIdAndUpdate(cashAcc._id, {
        balance: ob, totalDebit: ob >= 0 ? ob : 0, totalCredit: ob < 0 ? Math.abs(ob) : 0,
      });
    }
    await Season.updateMany({}, { isActive: false });
    season.isActive = true;
    await season.save();
    const year = new Date(season.startDate).getFullYear();
    await Cashbook.deleteMany({ year });
    await Cashbook.create({ year, openingBalance: season.openingBalance, entries: [] });
    res.json({
      message: `Season ${season.name} activated.${archiveResult ? ` Archived (${archiveResult.entries} entries, ${archiveResult.invoices} invoices).` : ""} Opening balance: Rs ${season.openingBalance.toLocaleString()}.`,
      season, archiveResult,
    });
  } catch (err) {
    console.error("activateSeason:", err);
    res.status(500).json({ message: err.message });
  }
};

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
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getSeasonArchives = async (req, res) => {
  try {
    const { SeasonArchiveMeta } = getModels(req.millId);
    res.json({ archives: await SeasonArchiveMeta.find().sort({ archivedAt: -1 }).lean() });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const deleteSeason = async (req, res) => {
  try {
    const { Season } = getModels(req.millId);
    await Season.findByIdAndDelete(req.params.id);
    res.json({ message: "Season deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ═════════════════════════════════════════════════════════════════════════════
// PAYMENTS / COMPLAINTS / BAG TYPES / MILL SETTINGS
// ═════════════════════════════════════════════════════════════════════════════

export const getPaymentHistory = async (req, res) => {
  try {
    const m = await mill(req.millId);
    if (!m) return res.status(404).json({ message: "Mill not found" });
    const history = [...(m.paymentHistory || [])].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    res.json({ payments: history, billingDate: m.billingDate, planExpiry: m.planExpiry });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const submitComplaint = async (req, res) => {
  try {
    const { Complaint } = getModels(req.millId);
    const { type, subject, message } = req.body;
    if (!subject || !message)
      return res.status(400).json({ message: "Subject and message are required" });
    const c = await Complaint.create({ type: type || "complaint", subject: subject.trim(), message: message.trim() });
    try {
      const { Mill, GlobalRequest } = getMasterModels();
      const m = await Mill.findOne({ millId: req.millId }).select("businessName");
      await GlobalRequest.create({ millId: req.millId, businessName: m?.businessName || req.millId, type: type || "complaint", subject: subject.trim(), message: message.trim() });
    } catch (e) { console.warn("Forward to master DB failed:", e.message); }
    res.status(201).json({ message: "Submitted. We will respond within 2-3 business days.", complaint: c });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getComplaints = async (req, res) => {
  try {
    const { Complaint } = getModels(req.millId);
    res.json({ complaints: await Complaint.find().sort({ createdAt: -1 }) });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getBagTypes = async (req, res) => {
  try {
    const { BagType } = getModels(req.millId);
    res.json({ bagTypes: await BagType.find().sort({ createdAt: 1 }) });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const addBagType = async (req, res) => {
  try {
    const { BagType } = getModels(req.millId);
    const { bagTypeName, bagWeight } = req.body;
    if (!bagTypeName || bagWeight === undefined)
      return res.status(400).json({ message: "bagTypeName and bagWeight are required" });
    const b = await BagType.create({ bagTypeName: bagTypeName.trim(), bagWeight: Number(bagWeight) });
    res.status(201).json({ message: "Bag type added", bagType: b });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const updateBagType = async (req, res) => {
  try {
    const { BagType } = getModels(req.millId);
    const { bagTypeName, bagWeight, isActive } = req.body;
    const b = await BagType.findByIdAndUpdate(req.params.id, { bagTypeName, bagWeight: Number(bagWeight), isActive }, { new: true });
    if (!b) return res.status(404).json({ message: "Bag type not found" });
    res.json({ message: "Updated", bagType: b });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const deleteBagType = async (req, res) => {
  try {
    const { BagType } = getModels(req.millId);
    await BagType.findByIdAndDelete(req.params.id);
    res.json({ message: "Bag type removed" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getMillSettings = async (req, res) => {
  try {
    const { MillSettings } = getModels(req.millId);
    let settings = await MillSettings.findOne();
    if (!settings) settings = await MillSettings.create({ baseMoisture: 0, weightCut: 0 });
    res.json({ settings });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const updateMillSettings = async (req, res) => {
  try {
    const { MillSettings } = getModels(req.millId);
    const { baseMoisture, weightCut } = req.body;
    let settings = await MillSettings.findOne();
    if (!settings) {
      settings = await MillSettings.create({ baseMoisture: Number(baseMoisture||0), weightCut: Number(weightCut||0) });
    } else {
      settings.baseMoisture = Number(baseMoisture||0);
      settings.weightCut    = Number(weightCut||0);
      await settings.save();
    }
    res.json({ message: "Settings updated", settings });
  } catch (err) { res.status(500).json({ message: err.message }); }
};