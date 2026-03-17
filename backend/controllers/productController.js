// controllers/productController.js
import { getModels } from "../config/millDB.js";

const NO_SUBTYPE_TYPES = ["Peddy", "Polish", "Phukar"];

/* Build the display name: "Eeri 06 - Rice - Brown" */
function buildDisplayName(productName, type, subType) {
  return [productName, type, subType].filter(Boolean).join(" - ");
}

/* Attach displayName to a plain product object */
function withDisplay(product) {
  const p = typeof product.toObject === "function" ? product.toObject() : { ...product };
  p.displayName = buildDisplayName(p.productName, p.type, p.subType);
  return p;
}

export const createProduct = async (req, res) => {
  try {
    const { Product } = getModels(req.millId);
    const { productName, type, subType } = req.body;

    if (!productName || !type)
      return res.status(400).json({ success: false, message: "Product name and type are required" });

    if (!NO_SUBTYPE_TYPES.includes(type) && !subType)
      return res.status(400).json({ success: false, message: "Sub-type is required for this product type" });

    const product = await Product.create({
      productName: productName.trim(),
      type,
      subType: NO_SUBTYPE_TYPES.includes(type) ? "" : subType,
    });

    res.status(201).json({ success: true, product: withDisplay(product) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { Product } = getModels(req.millId);
    const raw = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, products: raw.map(withDisplay) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { Product } = getModels(req.millId);
    const { productName, type, subType } = req.body;

    if (!productName || !type)
      return res.status(400).json({ success: false, message: "Product name and type are required" });

    if (!NO_SUBTYPE_TYPES.includes(type) && !subType)
      return res.status(400).json({ success: false, message: "Sub-type is required for this product type" });

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productName: productName.trim(),
        type,
        subType: NO_SUBTYPE_TYPES.includes(type) ? "" : subType,
      },
      { new: true, runValidators: true }
    );

    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, product: withDisplay(product) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { Product } = getModels(req.millId);
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};