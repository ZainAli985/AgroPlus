import PurchaseInvoice from "../models/PurchaseInvoice.js";
import Product from "../models/Product.js"; // For fetching product name

const toNumber = (v) => {
  const n = Number(v);
  return isNaN(n) ? undefined : n;
};

/**
 * CREATE Purchase Invoice
 */
export const createPurchaseInvoice = async (req, res) => {
  try {
    const d = req.body;

    if (!d.productId || !d.date || !d.vendorName || !d.vehicleNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing" });
    }

    // Get last SR
    const lastInvoice = await PurchaseInvoice.findOne().sort({ sr: -1 });
    const nextSr = lastInvoice ? lastInvoice.sr + 1 : 1001;

    // Get product name snapshot
    const product = await Product.findById(d.productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const invoice = new PurchaseInvoice({
      sr: nextSr,
      date: d.date,
      vendorName: d.vendorName,
      // brokerName: d.brokerName,
      vehicleNumber: d.vehicleNumber,
      builtyNumber: d.builtyNumber,
      productId: d.productId,           // store reference
      productName: product.productName, // snapshot for reporting
      quantity: toNumber(d.quantity),
      // emptyVehicleWeight: toNumber(d.emptyVehicleWeight),
      // filledVehicleWeight: toNumber(d.filledVehicleWeight),
      subtractWeight: toNumber(d.subtractWeight),
      bagWeight: toNumber(d.bagWeight),
      finalWeight: toNumber(d.finalWeight),
      moisturePercent: toNumber(d.moisturePercent),
      moistureAdjCal: toNumber(d.moistureAdjCal),
      moistureAdjustment: toNumber(d.moistureAdjustment),
      netWeightCal: toNumber(d.netWeightCal),
      netWeight: toNumber(d.netWeight),
      netWeight40KG: toNumber(d.netWeight40KG),
      weightKG: toNumber(d.weightKG),
      rate40kg: toNumber(d.rate40kg),
      amountCal: toNumber(d.amountCal),
      amount: toNumber(d.amount),
      // difference: toNumber(d.difference),
      rentAdjustment: toNumber(d.rentAdjustment),
      // ledgerReference: d.ledgerReference,
    });

    await invoice.save();
    res.status(201).json({ success: true, invoice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * READ ALL Purchase Invoices
 */
export const getAllPurchaseInvoices = async (req, res) => {
  try {
    const invoices = await PurchaseInvoice.find()
      .sort({ sr: 1 })
      .populate("productId", "productName"); // optional: populate product details
    res.status(200).json({ success: true, invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET single invoice by ID
 */
export const getPurchaseInvoiceById = async (req, res) => {
  try {
    const invoice = await PurchaseInvoice.findById(req.params.id).populate(
      "productId",
      "productName"
    );
    if (!invoice)
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    res.status(200).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * UPDATE invoice
 */
export const updatePurchaseInvoice = async (req, res) => {
  try {
    const d = req.body;

    // If productId is being updated, get new productName snapshot
    if (d.productId) {
      const product = await Product.findById(d.productId);
      if (!product)
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      d.productName = product.productName;
    }

    const invoice = await PurchaseInvoice.findByIdAndUpdate(req.params.id, d, {
      new: true,
    });

    if (!invoice)
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });

    res.status(200).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * DELETE invoice
 */
export const deletePurchaseInvoice = async (req, res) => {
  try {
    const invoice = await PurchaseInvoice.findByIdAndDelete(req.params.id);
    if (!invoice)
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    res.status(200).json({ success: true, message: "Invoice deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



/**
 * GET next invoice number (sr)
 */
export const getNextInvoiceNumber = async (req, res) => {
  try {
    const lastInvoice = await PurchaseInvoice.findOne().sort({ sr: -1 });
    const nextSr = lastInvoice ? lastInvoice.sr + 1 : 1001;
    res.status(200).json({ success: true, nextSr });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};