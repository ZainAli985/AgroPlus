import WeightBridge from "../models/WeightBridge.js";
import Product from "../models/Product.js";

// Create Weight Bridge Entry
export const createWeightBridge = async (req, res) => {
  try {
    const {
      productId,
      vendorName,
      rate,
      vehicleType,
      mode,
      firstWeight,
      firstWeightWithDriver,
      secondWeight,
      secondWeightWithDriver,
    } = req.body;

    if (!productId || !vendorName || !rate || !vehicleType || !mode || !firstWeight || !secondWeight) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const netWeight = secondWeight - firstWeight;
    const netWeightMaund = netWeight / 40;
    const netWeightTon = netWeight / 1000;

    const entry = await WeightBridge.create({
      productId,
      productName: product.productName,
      vendorName,
      rate,
      vehicleType,
      mode,
      firstWeight,
      firstWeightWithDriver,
      secondWeight,
      secondWeightWithDriver,
      netWeight,
      netWeightMaund,
      netWeightTon,
    });

    res.status(201).json({ success: true, entry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
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