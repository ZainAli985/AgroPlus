// controllers/purchaseQuotationController.js
import { getModels } from "../config/millDB.js";

const toNum = (v) => { const n = Number(v); return isNaN(n) ? null : n; };

// ── Shared SR resolver ───────────────────────────────────────────────────────
// Queries BOTH collections so a reserved quotation SR is never reused by an invoice.
async function getNextSr(millId) {
  const { PurchaseInvoice, PurchaseQuotation } = getModels(millId);
  const [lastInv, lastQuot] = await Promise.all([
    PurchaseInvoice.findOne().sort({ sr: -1 }),
    PurchaseQuotation.findOne().sort({ sr: -1 }),
  ]);
  const maxInv  = lastInv?.sr  || 1000;
  const maxQuot = lastQuot?.sr || 1000;
  return Math.max(maxInv, maxQuot) + 1;
}

// ── POST /api/purchase-quotation/create ──────────────────────────────────────
export const createQuotation = async (req, res) => {
  try {
    const { PurchaseQuotation } = getModels(req.millId);
    const d = req.body;

    const sr = await getNextSr(req.millId);

    const quotation = new PurchaseQuotation({
      sr,
      date:            d.date            || "",
      vendorName:      d.vendorName      || "",
      vendorAccountId: d.vendorAccountId || null,
      vehicleNumber:   d.vehicleNumber   || "",
      builtyNumber:    d.builtyNumber    || "",
      productId:       d.productId       || null,
      productName:     d.productName     || "",
      bagStatus:       d.bagStatus       || "added",
      quantity:        toNum(d.quantity),
      grossWeight:     toNum(d.grossWeight),
      bagTypeId:       d.bagTypeId       || null,
      bagTypeName:     d.bagTypeName     || "",
      bagWeightPerBag: toNum(d.bagWeightPerBag),
      totalBagWeight:  toNum(d.totalBagWeight),
      moisturePercent: toNum(d.moisturePercent),
      baseMoisture:    toNum(d.baseMoisture),
      weightCut:       toNum(d.weightCut),
      moistureAdjustment: toNum(d.moistureAdjustment),
      moistureOverride:   Boolean(d.moistureOverride),
      netWeightKg:     toNum(d.netWeightKg),
      netWeightMaund:  toNum(d.netWeightMaund),
      rateRows:        Array.isArray(d.rateRows) ? d.rateRows : [],
      totalAmount:     toNum(d.totalAmount),
      rentAdjustment:  toNum(d.rentAdjustment),
      finalAmount:     toNum(d.finalAmount),
      notes:           d.notes || "",
      status:          "pending",
    });

    await quotation.save();
    res.status(201).json({
      success: true,
      message: `Quotation #${String(sr).padStart(4, "0")} created.`,
      quotation,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/purchase-quotation ──────────────────────────────────────────────
export const getAllQuotations = async (req, res) => {
  try {
    const { PurchaseQuotation } = getModels(req.millId);
    const quotations = await PurchaseQuotation
      .find({ status: "pending" })
      .populate("productId", "productName type subType")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, quotations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/purchase-quotation/:id ─────────────────────────────────────────
export const getQuotationById = async (req, res) => {
  try {
    const { PurchaseQuotation } = getModels(req.millId);
    const quotation = await PurchaseQuotation
      .findById(req.params.id)
      .populate("productId", "productName type subType");
    if (!quotation)
      return res.status(404).json({ success: false, message: "Quotation not found" });
    res.status(200).json({ success: true, quotation });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── DELETE /api/purchase-quotation/:id ──────────────────────────────────────
// Scenario 1: user manually deletes from view list
// Scenario 2: auto-called by AddPurchaseInvoice after successful conversion
export const deleteQuotation = async (req, res) => {
  try {
    const { PurchaseQuotation } = getModels(req.millId);
    const quotation = await PurchaseQuotation.findByIdAndDelete(req.params.id);
    if (!quotation)
      return res.status(404).json({ success: false, message: "Quotation not found" });
    res.status(200).json({ success: true, message: "Quotation deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/purchase-quotation/next-sr ─────────────────────────────────────
// MUST be registered in router BEFORE /:id to avoid Express treating
// the literal string "next-sr" as an ObjectId parameter.
export const getNextQuotationSr = async (req, res) => {
  try {
    const sr = await getNextSr(req.millId);
    res.status(200).json({ success: true, nextSr: sr });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};