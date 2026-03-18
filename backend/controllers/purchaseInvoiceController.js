// controllers/purchaseInvoiceController.js
import { getModels } from "../config/millDB.js";

const toNum = (v) => { const n = Number(v); return isNaN(n) ? undefined : n; };

export const createPurchaseInvoice = async (req, res) => {
  try {
    const { PurchaseInvoice, Product } = getModels(req.millId);
    const d = req.body;

    if (!d.productId || !d.date || !d.vendorName || !d.vehicleNumber) {
      return res.status(400).json({ success:false, message:"Required fields missing" });
    }

    const lastInvoice = await PurchaseInvoice.findOne().sort({ sr:-1 });
    const nextSr = lastInvoice ? lastInvoice.sr + 1 : 1001;

    const product = await Product.findById(d.productId);
    if (!product) return res.status(404).json({ success:false, message:"Product not found" });

    const invoice = new PurchaseInvoice({
      sr: Number(d.sr) || nextSr,
      date: d.date,
      vendorName: d.vendorName,
      vendorAccountId: d.vendorAccountId || undefined,
      vehicleNumber: d.vehicleNumber,
      builtyNumber: d.builtyNumber,
      productId: d.productId,
      productName: product.productName,
      bagStatus: d.bagStatus || "added",
      quantity:        toNum(d.quantity),
      grossWeight:     toNum(d.grossWeight),
      bagTypeId:       d.bagTypeId || undefined,
      bagTypeName:     d.bagTypeName,
      bagWeightPerBag: toNum(d.bagWeightPerBag),
      totalBagWeight:  toNum(d.totalBagWeight),
      moisturePercent: toNum(d.moisturePercent),
      baseMoisture:    toNum(d.baseMoisture),
      weightCut:       toNum(d.weightCut),
      moistureAdjustment: toNum(d.moistureAdjustment),
      moistureOverride: Boolean(d.moistureOverride),
      netWeightKg:     toNum(d.netWeightKg),
      netWeightMaund:  toNum(d.netWeightMaund),
      rateRows:        Array.isArray(d.rateRows) ? d.rateRows : [],
      totalAmount:     toNum(d.totalAmount),
      rentAdjustment:  toNum(d.rentAdjustment),
      finalAmount:     toNum(d.finalAmount),
      // legacy compat
      bagWeight: toNum(d.bagWeight), finalWeight: toNum(d.finalWeight),
      netWeight: toNum(d.netWeight), netWeight40KG: toNum(d.netWeight40KG),
      amount: toNum(d.amount),
    });
    await invoice.save();

    /* ── Auto-create General Journal Entry ── */
    /* Purchase: DR Stock/Purchases account | CR Vendor account */
    if (d.vendorAccountId) {
      try {
        const { GeneralJournalEntry, Account } = getModels(req.millId);
        // Find a stock/purchases account for the debit side
        const stockAccount = await Account.findOne({
          $or: [
            { accountName: { $regex: /stock|inventory|purchase|paddy|raw material/i } },
            { accountType: "Expense" },
            { subAccountType: "Current Assets" },
          ],
          _id: { $ne: d.vendorAccountId },
        });
        if (stockAccount) {
          const displayName = [product.productName, product.type, product.subType].filter(Boolean).join(" - ");
          const jeAmount = Number(invoice.finalAmount || invoice.totalAmount || 0);
          const invoiceLabel = "#" + String(invoice.sr).padStart(4, "0");
          const entryDesc = `Purchase Invoice ${invoiceLabel} — ${displayName} | ${invoice.quantity} bags | ${Number(invoice.netWeightMaund||0).toFixed(4)} Maund | Vehicle: ${invoice.vehicleNumber||"—"}`;
          const jEntry = new GeneralJournalEntry({
            entryDate:     new Date(invoice.date),
            comments:      entryDesc,
            debitAccount:  stockAccount._id,
            debitAmount:   jeAmount,
            debitLineDesc: entryDesc,
            creditEntries: [{
              account:     d.vendorAccountId,
              amount:      jeAmount,
              description: `Payable to ${invoice.vendorName} — Purchase Invoice ${invoiceLabel}`,
            }],
            totalCredit: jeAmount,
            isBalanced: true,
          });
          const saved = await jEntry.save();
          if (saved) {
            invoice.journalEntryId = saved._id;
            await invoice.save();
            // Update account balance fields so ledger header shows correct balance
            await Account.findByIdAndUpdate(stockAccount._id,
              { $inc: { totalDebit: jeAmount, balance: jeAmount } });
            await Account.findByIdAndUpdate(d.vendorAccountId,
              { $inc: { totalCredit: jeAmount, balance: -jeAmount } });
          }
        }
      } catch (_) { /* journal entry failure does not block invoice save */ }
    }

    res.status(201).json({ success:true, invoice });
  } catch (err) {
    res.status(500).json({ success:false, message:err.message });
  }
};

export const getAllPurchaseInvoices = async (req, res) => {
  try {
    const { PurchaseInvoice } = getModels(req.millId);
    const invoices = await PurchaseInvoice.find().sort({ sr:1 }).populate("productId","productName type subType");
    res.status(200).json({ success:true, invoices });
  } catch (err) { res.status(500).json({ success:false, message:err.message }); }
};

export const getPurchaseInvoiceById = async (req, res) => {
  try {
    const { PurchaseInvoice } = getModels(req.millId);
    const invoice = await PurchaseInvoice.findById(req.params.id).populate("productId","productName type subType");
    if (!invoice) return res.status(404).json({ success:false, message:"Not found" });
    res.status(200).json({ success:true, invoice });
  } catch (err) { res.status(500).json({ success:false, message:err.message }); }
};

export const updatePurchaseInvoice = async (req, res) => {
  try {
    const { PurchaseInvoice, Product } = getModels(req.millId);
    const d = req.body;
    if (d.productId) {
      const p = await Product.findById(d.productId);
      if (!p) return res.status(404).json({ success:false, message:"Product not found" });
      d.productName = [p.productName, p.type, p.subType].filter(Boolean).join(' - ');
    }
    const invoice = await PurchaseInvoice.findByIdAndUpdate(req.params.id, d, { new:true });
    if (!invoice) return res.status(404).json({ success:false, message:"Not found" });
    res.status(200).json({ success:true, invoice });
  } catch (err) { res.status(500).json({ success:false, message:err.message }); }
};

export const deletePurchaseInvoice = async (req, res) => {
  try {
    const { PurchaseInvoice } = getModels(req.millId);
    const invoice = await PurchaseInvoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ success:false, message:"Not found" });
    res.status(200).json({ success:true, message:"Deleted" });
  } catch (err) { res.status(500).json({ success:false, message:err.message }); }
};

export const getNextInvoiceNumber = async (req, res) => {
  try {
    const { PurchaseInvoice } = getModels(req.millId);
    const last = await PurchaseInvoice.findOne().sort({ sr:-1 });
    res.status(200).json({ success:true, nextSr: last ? last.sr + 1 : 1001 });
  } catch (err) { res.status(500).json({ success:false, message:err.message }); }
};