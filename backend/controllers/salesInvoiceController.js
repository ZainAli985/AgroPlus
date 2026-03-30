// controllers/salesInvoiceController.js
import mongoose from "mongoose";
import { getModels } from "../config/millDB.js";

const toNum = (v) => { const n = Number(v); return isNaN(n) ? undefined : n; };

async function getNextSr(SalesInvoice) {
  const last = await SalesInvoice.findOne().sort({ sr: -1 });
  return last ? last.sr + 1 : 1001;
}

export const createSalesInvoice = async (req, res) => {
  try {
    const { SalesInvoice, Product, Account, GeneralJournalEntry } = getModels(req.millId);
    const d = req.body;

    if (!d.productId || !d.date || !d.vehicleNo || !d.vendorName || !d.builtyNo)
      return res.status(400).json({ success: false, message: "Required fields are missing" });

    const nextSr  = await getNextSr(SalesInvoice);
    const product = await Product.findById(d.productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const displayName = [product.productName, product.type, product.subType].filter(Boolean).join(" - ");

    const invoice = new SalesInvoice({
      sr:               Number(d.sr) || nextSr,
      date:             d.date,
      vehicleNo:        d.vehicleNo,
      builtyNo:         d.builtyNo,
      vendorName:       d.vendorName,
      vendorAccountId:  d.vendorAccountId || undefined,
      brokerName:       d.brokerName,
      productId:        d.productId,
      productName:      displayName,
      paddyType:        d.paddyType,
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
    });
    await invoice.save();

    /* ─── Auto General Journal Entry ─────────────────────────────────────────
       Sales: DR Customer Account (receivable — they owe us)
              CR Product Account  (stock decreases)
    ────────────────────────────────────────────────────────────────────────── */
    const jeAmount = Number(invoice.totalAmount2 || invoice.totalWithBardana || invoice.totalAmount || 0);
    const productAccount  = product.linkedAccountId
      ? await Account.findById(product.linkedAccountId)
      : null;
    const customerAccount = d.vendorAccountId
      ? await Account.findById(d.vendorAccountId)
      : null;

    if (jeAmount > 0 && productAccount && customerAccount) {
      try {
        const invoiceLabel = "#" + String(invoice.sr).padStart(4, "0");
        const maund = Number(invoice.netWeight40 || 0);
        const rate  = Number(invoice.rate40 || 0);
        const desc  = `Sales Invoice ${invoiceLabel} — ${displayName} | ${invoice.quantity} bags | ${maund.toFixed(4)} Maund | Rate Rs ${rate} | Vehicle: ${invoice.vehicleNo}`;

        const jEntry = new GeneralJournalEntry({
          entryDate:     new Date(invoice.date),
          comments:      desc,
          debitAccount:  customerAccount._id,
          debitAmount:   jeAmount,
          debitLineDesc: `Receivable from ${invoice.vendorName} — Sales Invoice ${invoiceLabel}`,
          creditEntries: [{
            account:     productAccount._id,
            amount:      jeAmount,
            description: desc,
          }],
          totalCredit: jeAmount,
          isBalanced: true,
          meta: {
            invoiceType: "sale",
            invoiceNo:   invoice.sr,
            invoiceLabel,
            productId:   String(product._id),
            productName: displayName,
            vendorName:  invoice.vendorName,
            bags:        Number(invoice.quantity || 0),
            maund,
            rate,
            vehicleNo:   invoice.vehicleNo || "—",
            netWeightKg: Number(invoice.netWeight || 0),
          },
        });
        const saved = await jEntry.save();

        // ── FIX: Only update `balance` via $inc — NEVER $inc totalDebit/totalCredit ──
        // totalDebit/totalCredit must stay as OPENING BALANCE ONLY.
        // Incrementing them causes double-counting when recalcBalance() is later called.
        await Account.findByIdAndUpdate(customerAccount._id, {
          $inc: { balance: jeAmount },
        });
        await Account.findByIdAndUpdate(productAccount._id, {
          $inc: { balance: -jeAmount },
        });

        invoice.journalEntryId = saved._id;
        await invoice.save();
      } catch (jeErr) {
        console.error("JE creation failed (invoice still saved):", jeErr.message);
      }
    }

    res.status(201).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNextSalesInvoiceNumber = async (req, res) => {
  try {
    const { SalesInvoice } = getModels(req.millId);
    res.status(200).json({ success: true, nextSr: await getNextSr(SalesInvoice) });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const getAllSalesInvoices = async (req, res) => {
  try {
    const { SalesInvoice } = getModels(req.millId);
    const invoices = await SalesInvoice.find().sort({ sr: -1 }).populate("productId", "productName type subType");
    res.status(200).json({ success: true, invoices });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const getSalesInvoiceById = async (req, res) => {
  try {
    const { SalesInvoice } = getModels(req.millId);
    const invoice = await SalesInvoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });
    res.status(200).json({ success: true, invoice });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const updateSalesInvoice = async (req, res) => {
  try {
    const { SalesInvoice } = getModels(req.millId);
    const invoice = await SalesInvoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });
    res.status(200).json({ success: true, invoice });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const deleteSalesInvoice = async (req, res) => {
  try {
    const { SalesInvoice } = getModels(req.millId);
    const invoice = await SalesInvoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });
    res.status(200).json({ success: true, message: "Invoice deleted" });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};