// controllers/profileController.js
// ─────────────────────────────────────────────────────────────────────────────
// Admin profile: view/edit credentials, seasons, vehicles, payments, complaints
// ─────────────────────────────────────────────────────────────────────────────
import bcrypt            from "bcryptjs";
import { getMasterModels } from "../config/masterDB.js";
import { getModels }       from "../config/millDB.js";

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
    const { name, startDate, endDate, openingBalance, cashAccountId, openingBalanceAccountId } = req.body;
    if (!name || !startDate || !endDate)
      return res.status(400).json({ message: "name, startDate and endDate are required" });

    const season = await Season.create({
      name, startDate, endDate,
      openingBalance: Number(openingBalance || 0),
      cashAccountId: cashAccountId || null,
      openingBalanceAccountId: openingBalanceAccountId || null,
      isActive: false,
    });
    res.status(201).json({ message: "Season added", season });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/profile/seasons/:id/activate
// Deactivates all other seasons, activates this one.
// If cashAccountId + openingBalanceAccountId provided, creates the OB journal entry.
export const activateSeason = async (req, res) => {
  try {
    const { Season, Cashbook, GeneralJournalEntry } = getModels(req.millId);
    const season = await Season.findById(req.params.id);
    if (!season) return res.status(404).json({ message: "Season not found" });

    // Deactivate all
    await Season.updateMany({}, { isActive: false });
    season.isActive = true;
    await season.save();

    // If both account IDs are known, create the journal opening balance entry
    const cashId = season.cashAccountId || req.body.cashAccountId;
    const obId   = season.openingBalanceAccountId || req.body.openingBalanceAccountId;

    if (cashId && obId && season.openingBalance > 0) {
      try {
        const year = new Date(season.startDate).getFullYear();
        // Clear existing OB cashbook for this year if any
        await Cashbook.deleteOne({ year });
        await Cashbook.create({ year, openingBalance: season.openingBalance, entries: [] });

        const entry = await GeneralJournalEntry.create({
          entryDate:     season.startDate,
          comments:      `Opening Balance — ${season.name}`,
          debitAccount:  cashId,
          debitAmount:   season.openingBalance,
          debitLineDesc: "Opening Balance",
          creditEntries: [{
            account:     obId,
            amount:      season.openingBalance,
            description: "Opening Balance",
          }],
        });
        season.journalEntryId = entry._id;
        season.cashAccountId  = cashId;
        season.openingBalanceAccountId = obId;
        await season.save();
      } catch (e) {
        // Journal entry failed (maybe already exists) — still activate season
        console.warn("OB journal entry warning:", e.message);
      }
    }

    res.json({ message: `Season "${season.name}" activated`, season });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/profile/seasons/:id
export const updateSeason = async (req, res) => {
  try {
    const { Season } = getModels(req.millId);
    const { name, startDate, endDate, openingBalance, cashAccountId, openingBalanceAccountId } = req.body;
    const s = await Season.findByIdAndUpdate(
      req.params.id,
      { name, startDate, endDate, openingBalance: Number(openingBalance || 0), cashAccountId, openingBalanceAccountId },
      { new: true }
    );
    if (!s) return res.status(404).json({ message: "Season not found" });
    res.json({ message: "Season updated", season: s });
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