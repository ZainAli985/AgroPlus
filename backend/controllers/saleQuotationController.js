// controllers/salesQuotationController.js
import { getModels } from "../config/millDB.js";

const toNum = (v) => { const n = Number(v); return isNaN(n) ? null : n; };

// ── Shared SR resolver ────────────────────────────────────────────────────────
// Queries BOTH SalesInvoice and SalesQuotation so SR is always unique
// across the entire sales sequence.
async function getNextSr(millId) {
  const { SalesInvoice, SalesQuotation } = getModels(millId);
  const [lastInv, lastQuot] = await Promise.all([
    SalesInvoice.findOne().sort({ sr: -1 }),
    SalesQuotation.findOne().sort({ sr: -1 }),
  ]);
  const maxInv  = lastInv?.sr  || 1000;
  const maxQuot = lastQuot?.sr || 1000;
  return Math.max(maxInv, maxQuot) + 1;
}

// ── POST /api/sales-quotation/create ─────────────────────────────────────────
export const createSalesQuotation = async (req, res) => {
  try {
    const { SalesQuotation } = getModels(req.millId);
    const d = req.body;

    const sr = await getNextSr(req.millId);

    const quotation = new SalesQuotation({
      sr,
      date:             d.date             || "",
      vehicleNo:        d.vehicleNo        || "",
      builtyNo:         d.builtyNo         || "",
      vendorName:       d.vendorName       || "",
      vendorAccountId:  d.vendorAccountId  || null,
      brokerName:       d.brokerName       || "",
      productId:        d.productId        || null,
      productName:      d.productName      || "",
      paddyType:        d.paddyType        || "",
      quantity:         toNum(d.quantity),
      weight:           toNum(d.weight),
      bagWeight:        toNum(d.bagWeight),
      netWeight:        toNum(d.netWeight),
      netWeight40:      toNum(d.netWeight40),
      rate40:           toNum(d.rate40),
      amount:           toNum(d.amount),
      sutliSilaiRate:   toNum(d.sutliSilaiRate),
      sutliSilaiAmount: toNum(d.sutliSilaiAmount),
      totalAmount:      toNum(d.totalAmount),
      bardanaRate:      toNum(d.bardanaRate),
      bardanaAmount:    toNum(d.bardanaAmount),
      totalWithBardana: toNum(d.totalWithBardana),
      brokeryRate:      toNum(d.brokeryRate),
      brokery:          toNum(d.brokery),
      totalAmount2:     toNum(d.totalAmount2),
      notes:            d.notes || "",
      status:           "pending",
    });

    await quotation.save();
    res.status(201).json({
      success: true,
      message: `Sales Quotation #${String(sr).padStart(4, "0")} created.`,
      quotation,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/sales-quotation ──────────────────────────────────────────────────
export const getAllSalesQuotations = async (req, res) => {
  try {
    const { SalesQuotation } = getModels(req.millId);
    const quotations = await SalesQuotation
      .find({ status: "pending" })
      .populate("productId", "productName type subType")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, quotations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/sales-quotation/:id ──────────────────────────────────────────────
export const getSalesQuotationById = async (req, res) => {
  try {
    const { SalesQuotation } = getModels(req.millId);
    const quotation = await SalesQuotation
      .findById(req.params.id)
      .populate("productId", "productName type subType");
    if (!quotation) return res.status(404).json({ success: false, message: "Quotation not found" });
    res.status(200).json({ success: true, quotation });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── DELETE /api/sales-quotation/:id ──────────────────────────────────────────
// Called when:
//   1. User explicitly deletes from the view list
//   2. Automatically by AddSalesInvoice after successful conversion
export const deleteSalesQuotation = async (req, res) => {
  try {
    const { SalesQuotation } = getModels(req.millId);
    const quotation = await SalesQuotation.findByIdAndDelete(req.params.id);
    if (!quotation) return res.status(404).json({ success: false, message: "Quotation not found" });
    res.status(200).json({ success: true, message: "Quotation deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/sales-quotation/next-sr ─────────────────────────────────────────
export const getNextSalesQuotationSr = async (req, res) => {
  try {
    const sr = await getNextSr(req.millId);
    res.status(200).json({ success: true, nextSr: sr });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};