import WeightBridge from "../models/WeightBridge.js";
import Product from "../models/Product.js";

/* ===========================
   Generate Incremental Code
   =========================== */
const generateInvoiceCode = async () => {
  const lastEntry = await WeightBridge.findOne().sort({ createdAt: -1 });

  if (!lastEntry) {
    return "WB-001";
  }

  const lastNumber = parseInt(lastEntry.invoiceCode.split("-")[1]);
  const nextNumber = lastNumber + 1;
  const padded = String(nextNumber).padStart(3, "0");

  return `WB-${padded}`;
};

/* ===========================
   STEP 1 – FIRST WEIGHT
   =========================== */
export const createWeightBridgeFirst = async (req, res) => {
  try {
    const {
      productId,
      vendorName,
      vehicleType,
      firstWeight,
      firstWeightWithDriver,
    } = req.body;

    if (!productId || !vendorName || !vehicleType || !firstWeight) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const rateMap = {
      "22 Wheeler": 700,
      "10 Wheeler": 500,
      "06 Wheeler": 350,
      "Phukar Tralla": 350,
      "Tractor Tralla": 250,
      Mazda: 150,
      Shehzor: 100,
      "Rickshaw/Ggari": 100,
    };

    const rate = rateMap[vehicleType] || 0;

    const invoiceCode = await generateInvoiceCode();

    const entry = await WeightBridge.create({
      invoiceCode,
      productId,
      productName: product.productName,
      vendorName,
      vehicleType,
      rate,
      firstWeight,
      firstWeightWithDriver,
      completed: false,
    });

    res.status(201).json({
      success: true,
      message: "First weight saved successfully",
      entry,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ===========================
   STEP 2 – SECOND WEIGHT
   =========================== */
export const updateWeightBridgeSecond = async (req, res) => {
  try {
    const { invoiceCode, secondWeight, secondWeightWithDriver } = req.body;

    const entry = await WeightBridge.findOne({ invoiceCode });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    if (entry.completed) {
      return res.status(400).json({
        success: false,
        message: "Invoice already completed",
      });
    }

    const netWeight = Number(secondWeight) - Number(entry.firstWeight);
    const netWeightMaund = +(netWeight / 40).toFixed(2);
    const netWeightTon = +(netWeight / 1000).toFixed(2);

    entry.secondWeight = secondWeight;
    entry.secondWeightWithDriver = secondWeightWithDriver;
    entry.secondWeightTime = new Date();
    entry.netWeight = netWeight;
    entry.netWeightMaund = netWeightMaund;
    entry.netWeightTon = netWeightTon;
    entry.completed = true;

    await entry.save();

    res.status(200).json({
      success: true,
      message: "Second weight saved successfully",
      entry,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ===========================
   GET SINGLE INVOICE
   =========================== */
export const getWeightBridgeByCode = async (req, res) => {
  try {
    const { invoiceCode } = req.params;

    const entry = await WeightBridge.findOne({ invoiceCode });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      entry,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// Get All Weight Bridge Entries
export const getWeightBridgeEntries = async (req, res) => {
  try {
    const entries = await WeightBridge.find()
      .populate("productId", "productName")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, entries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
