// controllers/weightBridgeController.js
// Vehicle types + rates are now stored per-mill in the Vehicle collection
// (admin manages them from /profile → Vehicles tab).
// Falls back to a hardcoded RATE_MAP only if no vehicles are configured.
import { getModels } from "../config/millDB.js";

const FALLBACK_RATES = {
  "22 Wheeler": 700, "10 Wheeler": 500, "06 Wheeler": 350,
  "Phukar Tralla": 350, "Tractor Tralla": 250,
  Mazda: 150, Shehzor: 100, "Rickshaw/Ggari": 100,
};

async function generateInvoiceCode(WeightBridge) {
  const lastEntry = await WeightBridge.findOne().sort({ createdAt: -1 });
  if (!lastEntry) return "WB-001";
  const lastNumber = parseInt(lastEntry.invoiceCode.split("-")[1], 10) || 0;
  return `WB-${String(lastNumber + 1).padStart(3, "0")}`;
}

// POST /api/weight-bridge/first
export const createWeightBridgeFirst = async (req, res) => {
  try {
    const { WeightBridge, Product, Vehicle } = getModels(req.millId);
    const { productId, vendorName, vehicleNumber, vehicleType, firstWeight, firstWeightWithDriver } = req.body;

    if (!productId || !vendorName || !vehicleType || !firstWeight) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    // Look up rate from custom Vehicle list, fall back to hardcoded map
    const customVehicle = await Vehicle.findOne({ vehicleType, isActive: true });
    const rate = customVehicle ? customVehicle.rate : (FALLBACK_RATES[vehicleType] ?? 0);

    const invoiceCode = await generateInvoiceCode(WeightBridge);
    const entry = await WeightBridge.create({
      invoiceCode, productId, productName: product.productName,
      vendorName, vehicleNumber: vehicleNumber || "", vehicleType,
      rate, firstWeight, firstWeightWithDriver: Boolean(firstWeightWithDriver),
      completed: false,
    });

    res.status(201).json({ success: true, message: "First weight saved", entry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/weight-bridge/second
export const updateWeightBridgeSecond = async (req, res) => {
  try {
    const { WeightBridge } = getModels(req.millId);
    const { invoiceCode, secondWeight, secondWeightWithDriver } = req.body;

    const entry = await WeightBridge.findOne({ invoiceCode });
    if (!entry)          return res.status(404).json({ success: false, message: "Invoice not found" });
    if (entry.completed) return res.status(400).json({ success: false, message: "Invoice already completed" });

    const netWeight = Number(secondWeight) - Number(entry.firstWeight);
    entry.secondWeight           = secondWeight;
    entry.secondWeightWithDriver = Boolean(secondWeightWithDriver);
    entry.secondWeightTime       = new Date();
    entry.netWeight              = netWeight;
    entry.netWeightMaund         = +(netWeight / 40).toFixed(2);
    entry.netWeightTon           = +(netWeight / 1000).toFixed(2);
    entry.completed              = true;
    await entry.save();

    res.status(200).json({ success: true, message: "Second weight saved", entry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/weight-bridge/:invoiceCode
export const getWeightBridgeByCode = async (req, res) => {
  try {
    const { WeightBridge } = getModels(req.millId);
    const entry = await WeightBridge.findOne({ invoiceCode: req.params.invoiceCode });
    if (!entry) return res.status(404).json({ success: false, message: "Invoice not found" });
    res.status(200).json({ success: true, entry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/weight-bridge
export const getWeightBridgeEntries = async (req, res) => {
  try {
    const { WeightBridge } = getModels(req.millId);
    const entries = await WeightBridge.find()
      .populate("productId", "productName")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, entries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};