import PurchaseInvoice from "../models/PurchaseInvoice.js";

const toNumber = (v) => {
  const n = Number(v);
  return isNaN(n) ? undefined : n;
};

export const createPurchaseInvoice = async (req, res) => {
  try {
    const d = req.body;

    // Get last sr
    const lastInvoice = await PurchaseInvoice.findOne().sort({ sr: -1 });
    const nextSr = lastInvoice ? lastInvoice.sr + 1 : 1001; // starting sr if none exist

    const invoice = new PurchaseInvoice({
      sr: nextSr, // auto sr
      date: d.date,
      vendorName: d.vendorName,
      brokerName: d.brokerName,
      vehicleNumber: d.vehicleNumber,
      builtyNumber: d.builtyNumber,
      paddyType: d.paddyType,
      quantity: toNumber(d.quantity),
      emptyVehicleWeight: toNumber(d.emptyVehicleWeight),
      filledVehicleWeight: toNumber(d.filledVehicleWeight),
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
      difference: toNumber(d.difference),
      rentAdjustment: toNumber(d.rentAdjustment),
      ledgerReference: d.ledgerReference,
    });

    await invoice.save();
    res.status(201).json({ success: true, invoice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// READ ALL
export const getAllPurchaseInvoices = async (req, res) => {
  const invoices = await PurchaseInvoice.find().sort({ sr: 1 });
  res.json({ success: true, invoices });
};

// // Get all purchase invoices
// export const getAllPurchaseInvoices = async (req, res) => {
//   try {
//     const invoices = await PurchaseInvoice.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, invoices });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// Get single invoice by ID
export const getPurchaseInvoiceById = async (req, res) => {
  try {
    const invoice = await PurchaseInvoice.findById(req.params.id);
    if (!invoice)
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    res.status(200).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update invoice
export const updatePurchaseInvoice = async (req, res) => {
  try {
    const invoice = await PurchaseInvoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
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

// Delete invoice
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
