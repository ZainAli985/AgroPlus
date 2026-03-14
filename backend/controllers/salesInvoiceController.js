// controllers/salesInvoiceController.js
import { getModels } from "../config/millDB.js";

export const createSalesInvoice = async (req, res) => {
  try {
    const { SalesInvoice, Product } = getModels(req.millId);
    const d = req.body;

    if (!d.productId || !d.date || !d.vendorName || !d.vehicleNo) {
      return res.status(400).json({ success: false, message: "Required fields are missing" });
    }

    const lastInvoice = await SalesInvoice.findOne().sort({ sr: -1 });
    const nextSr = lastInvoice ? lastInvoice.sr + 1 : 1001;

    const product = await Product.findById(d.productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const invoice = new SalesInvoice({ ...d, sr: nextSr, productName: product.productName });
    await invoice.save();
    res.status(201).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllSalesInvoices = async (req, res) => {
  try {
    const { SalesInvoice } = getModels(req.millId);
    const invoices = await SalesInvoice.find().sort({ createdAt: -1 });
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