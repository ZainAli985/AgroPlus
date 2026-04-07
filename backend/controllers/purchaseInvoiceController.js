// controllers/purchaseInvoiceController.js
import mongoose from "mongoose";
import { getModels } from "../config/millDB.js";

const toNum = (v) => { const n = Number(v); return isNaN(n) ? undefined : n; };

// ── Shared balance recompute ─────────────────────────────────────────────────
// RULE: totalDebit/totalCredit on Account = OPENING BALANCE ONLY.
// Never use $inc on totalDebit/totalCredit outside of account creation.
// This function recomputes balance from opening + all journal entries.
async function recalcBalance(millId, accountId) {
  const { GeneralJournalEntry, Account } = getModels(millId);
  if (!accountId) return;
  const accId   = new mongoose.Types.ObjectId(accountId.toString());
  const account = await Account.findById(accountId);
  if (!account || account.isProtected) return;

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
}

export const createPurchaseInvoice = async (req, res) => {
  try {
    const { PurchaseInvoice, Product, Account, GeneralJournalEntry } = getModels(req.millId);
    const d = req.body;

    if (!d.productId || !d.date || !d.vendorName || !d.vehicleNumber)
      return res.status(400).json({ success: false, message: "Required fields missing" });

    const lastInvoice = await PurchaseInvoice.findOne().sort({ sr: -1 });
    const nextSr = lastInvoice ? lastInvoice.sr + 1 : 1001;

    const product = await Product.findById(d.productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const displayName = [product.productName, product.type, product.subType].filter(Boolean).join(" - ");

    const invoice = new PurchaseInvoice({
      sr: Number(d.sr) || nextSr,
      date: d.date,
      vendorName: d.vendorName,
      vendorAccountId: d.vendorAccountId || undefined,
      vehicleNumber: d.vehicleNumber,
      builtyNumber: d.builtyNumber,
      productId: d.productId,
      productName: displayName,
      bagStatus: d.bagStatus || "added",
      quantity:           toNum(d.quantity),
      grossWeight:        toNum(d.grossWeight),
      bagTypeId:          d.bagTypeId || undefined,
      bagTypeName:        d.bagTypeName,
      bagWeightPerBag:    toNum(d.bagWeightPerBag),
      totalBagWeight:     toNum(d.totalBagWeight),
      moisturePercent:    toNum(d.moisturePercent),
      baseMoisture:       toNum(d.baseMoisture),
      weightCut:          toNum(d.weightCut),
      moistureAdjustment: toNum(d.moistureAdjustment),
      moistureOverride:   Boolean(d.moistureOverride),
      netWeightKg:        toNum(d.netWeightKg),
      netWeightMaund:     toNum(d.netWeightMaund),
      rateRows:           Array.isArray(d.rateRows) ? d.rateRows : [],
      totalAmount:        toNum(d.totalAmount),
      rentAdjustment:     toNum(d.rentAdjustment),
      finalAmount:        toNum(d.finalAmount),
      // legacy
      bagWeight: toNum(d.bagWeight), finalWeight: toNum(d.finalWeight),
      netWeight: toNum(d.netWeight), netWeight40KG: toNum(d.netWeight40KG),
      amount: toNum(d.amount),
    });
    await invoice.save();

    /* ─── Auto General Journal Entry ─────────────────────────────────────────
       Purchase: DR Product Account (stock increases)
                 CR Vendor Account  (payable to vendor)
    ────────────────────────────────────────────────────────────────────────── */
    const jeAmount = Number(invoice.finalAmount || invoice.totalAmount || 0);
    const productAccount = product.linkedAccountId
      ? await Account.findById(product.linkedAccountId)
      : null;
    const vendorAccount = d.vendorAccountId
      ? await Account.findById(d.vendorAccountId)
      : null;

    if (jeAmount > 0 && productAccount && vendorAccount) {
      try {
        const invoiceLabel = "#" + String(invoice.sr).padStart(4, "0");
        const maund = Number(invoice.netWeightMaund || 0);
        const rate  = Number(invoice.rateRows?.[0]?.rate || 0);
        const desc  = `Purchase Invoice ${invoiceLabel} — ${displayName} | ${invoice.quantity} bags | ${maund.toFixed(4)} Maund | Rate Rs ${rate} | Vehicle: ${invoice.vehicleNumber}`;

        const jEntry = new GeneralJournalEntry({
          entryDate:     new Date(invoice.date),
          comments:      desc,
          debitAccount:  productAccount._id,
          debitAmount:   jeAmount,
          debitLineDesc: desc,
          creditEntries: [{
            account:     vendorAccount._id,
            amount:      jeAmount,
            description: `Payable to ${invoice.vendorName} — Purchase Invoice ${invoiceLabel}`,
          }],
          totalCredit: jeAmount,
          isBalanced: true,
          meta: {
            invoiceType: "purchase",
            invoiceNo:   invoice.sr,
            invoiceLabel,
            productId:   String(product._id),
            productName: displayName,
            vendorName:  invoice.vendorName,
            bags:        Number(invoice.quantity || 0),
            maund,
            rate,
            vehicleNo:   invoice.vehicleNumber || "—",
            netWeightKg: Number(invoice.netWeightKg || 0),
          },
        });
        const saved = await jEntry.save();

        // ── FIX: Only update `balance` via $inc — NEVER $inc totalDebit/totalCredit ──
        // totalDebit/totalCredit must remain as OPENING BALANCE ONLY so that
        // recalcBalance() can safely use them as the opening amount when called later.
        await Account.findByIdAndUpdate(productAccount._id, {
          $inc: { balance: jeAmount },
        });
        await Account.findByIdAndUpdate(vendorAccount._id, {
          $inc: { balance: -jeAmount },
        });

        invoice.journalEntryId = saved._id;
        await invoice.save();
      } catch (jeErr) {
        console.error("JE creation failed (invoice still saved):", jeErr.message);
      }
    }

    res.status(201).json({ success: true, invoice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllPurchaseInvoices = async (req, res) => {
  try {
    const { PurchaseInvoice } = getModels(req.millId);
    const invoices = await PurchaseInvoice.find().sort({ sr: 1 }).populate("productId", "productName type subType");
    res.status(200).json({ success: true, invoices });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

export const getPurchaseInvoiceById = async (req, res) => {
  try {
    const { PurchaseInvoice } = getModels(req.millId);
    const invoice = await PurchaseInvoice.findById(req.params.id).populate("productId", "productName type subType");
    if (!invoice) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, invoice });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

export const updatePurchaseInvoice = async (req, res) => {
  try {
    const { PurchaseInvoice, Product } = getModels(req.millId);
    const d = req.body;
    if (d.productId) {
      const p = await Product.findById(d.productId);
      if (!p) return res.status(404).json({ success: false, message: "Product not found" });
      d.productName = [p.productName, p.type, p.subType].filter(Boolean).join(" - ");
    }
    const invoice = await PurchaseInvoice.findByIdAndUpdate(req.params.id, d, { new: true });
    if (!invoice) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, invoice });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

export const deletePurchaseInvoice = async (req, res) => {
  try {
    const { PurchaseInvoice } = getModels(req.millId);
    const invoice = await PurchaseInvoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

export const getNextInvoiceNumber = async (req, res) => {
  try {
    // Checks BOTH collections so a reserved quotation SR is never reused.
    const { PurchaseInvoice, PurchaseQuotation } = getModels(req.millId);
    const [lastInv, lastQuot] = await Promise.all([
      PurchaseInvoice.findOne().sort({ sr: -1 }),
      PurchaseQuotation.findOne().sort({ sr: -1 }),
    ]);
    const maxInv  = lastInv?.sr  || 1000;
    const maxQuot = lastQuot?.sr || 1000;
    res.status(200).json({ success: true, nextSr: Math.max(maxInv, maxQuot) + 1 });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};