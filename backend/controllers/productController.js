import Product from "../models/Product.js";

/**
 * 🔹 POST /products
 * Create new product
 */
export const createProduct = async (req, res) => {
  try {
    const { productName, type, subType } = req.body;

    if (!productName || !type || !subType) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const product = await Product.create({
      productName,
      type,
      subType,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * 🔹 GET /products
 * List all products
 */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
