// ─────────────────────────────────────────────────────────────────────────────
// PATCH for Profilecontroller.js — activateSeason
//
// 1. Add these two imports at the top of Profilecontroller.js:
//      import { archiveAndTransition, initSeasonCashbook } from "../utils/seasonArchiveUtil.js";
//
// 2. Replace your existing activateSeason function with the one below.
//    Everything else in Profilecontroller.js is untouched.
// ─────────────────────────────────────────────────────────────────────────────

import { archiveAndTransition, initSeasonCashbook } from "../utils/seasonArchiveUtil.js";
import { getModels } from "../config/millDB.js";

export const activateSeason = async (req, res) => {
  try {
    const { Season } = getModels(req.millId);

    const newSeason = await Season.findById(req.params.id);
    if (!newSeason) return res.status(404).json({ success: false, message: "Season not found" });

    const currentlyActive = await Season.findOne({ isActive: true });

    if (currentlyActive && currentlyActive._id.toString() === newSeason._id.toString()) {
      return res.status(400).json({ success: false, message: "This season is already active." });
    }

    if (currentlyActive) {
      // Archive the current season + carry all account balances to the new one
      await archiveAndTransition(req.millId, newSeason);
    } else {
      // First season ever — just create cashbook, no archiving needed
      await initSeasonCashbook(req.millId, newSeason);
    }

    // Deactivate all, activate the chosen season
    await Season.updateMany({}, { isActive: false });
    const activated = await Season.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true });

    res.json({
      success: true,
      message: currentlyActive
        ? `Season "${activated.name || activated._id}" activated. Previous season data archived.`
        : `Season "${activated.name || activated._id}" activated.`,
      season: activated,
    });
  } catch (err) {
    console.error("activateSeason error:", err);
    res.status(500).json({ success: false, message: err.message || "Server error activating season" });
  }
};

// Optional: add this to your routes if you want an in-app archive viewer
export const getSeasonArchives = async (req, res) => {
  try {
    const { SeasonArchiveMeta } = getModels(req.millId);
    const archives = await SeasonArchiveMeta.find().sort({ archivedAt: -1 });
    res.json({ success: true, archives });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};