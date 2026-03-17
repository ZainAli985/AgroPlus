// controllers/salesInvoiceController.js
import { getModels } from "../config/millDB.js";

const toNum = (v) => { const n = Number(v); return isNaN(n) ? undefined : n; };

// Auto-increment — starts at 1001
async function getNextSr(SalesInvoice) {
  const last = await SalesInvoice.findOne().sort({ sr: -1 });
  return last ? last.sr + 1 : 1001;
}

export const createSalesInvoice = async (req, res) => {
  try {
    const { SalesInvoice, Product } = getModels(req.millId);
    const d = req.body;

    if (!d.productId || !d.date || !d.vehicleNo || !d.vendorName || !d.builtyNo) {
      return res.status(400).json({ success: false, message: "Required fields are missing" });
    }

    const nextSr  = await getNextSr(SalesInvoice);
    const product = await Product.findById(d.productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const invoice = new SalesInvoice({
      sr:               Number(d.sr) || nextSr,
      date:             d.date,
      vehicleNo:        d.vehicleNo,
      builtyNo:         d.builtyNo,
      vendorName:       d.vendorName,
      vendorAccountId:  d.vendorAccountId || undefined,
      brokerName:       d.brokerName,
      productId:        d.productId,
      productName:      [product.productName, product.type, product.subType].filter(Boolean).join(' - '),
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
    res.status(201).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNextSalesInvoiceNumber = async (req, res) => {
  try {
    const { SalesInvoice } = getModels(req.millId);
    const nextSr = await getNextSr(SalesInvoice);
    res.status(200).json({ success: true, nextSr });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllSalesInvoices = async (req, res) => {
  try {
    const { SalesInvoice } = getModels(req.millId);
    const invoices = await SalesInvoice.find().sort({ sr: -1 }).populate('productId','productName type subType');
    res.status(200).json({ success: true, invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSalesInvoiceById = async (req, res) => {
  try {
    const { SalesInvoice } = getModels(req.millId);
    const invoice = await SalesInvoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });
    res.status(200).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSalesInvoice = async (req, res) => {
  try {
    const { SalesInvoice } = getModels(req.millId);
    const invoice = await SalesInvoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });
    res.status(200).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSalesInvoice = async (req, res) => {
  try {
    const { SalesInvoice } = getModels(req.millId);
    const invoice = await SalesInvoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });
    res.status(200).json({ success: true, message: "Invoice deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};