// controllers/productController.js
import { getModels } from "../config/millDB.js";

const NO_SUBTYPE_TYPES = ["Peddy", "Polish", "Phukar"];

export const createProduct = async (req, res) => {
  try {
    const { Product } = getModels(req.millId);
    const { productName, type, subType } = req.body;

    if (!productName || !type) return res.status(400).json({ success: false, message: "Product name and type are required" });
    if (!NO_SUBTYPE_TYPES.includes(type) && !subType) {
      return res.status(400).json({ success: false, message: "Sub-type is required for this product type" });
    }

    const product = await Product.create({
      productName, type,
      subType: NO_SUBTYPE_TYPES.includes(type) ? "" : subType,
    });
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { Product } = getModels(req.millId);
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { Product } = getModels(req.millId);
    const { productName, type, subType } = req.body;

    if (!productName || !type) return res.status(400).json({ success: false, message: "Product name and type are required" });
    if (!NO_SUBTYPE_TYPES.includes(type) && !subType) {
      return res.status(400).json({ success: false, message: "Sub-type is required for this product type" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { productName, type, subType: NO_SUBTYPE_TYPES.includes(type) ? "" : subType },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { Product } = getModels(req.millId);
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};