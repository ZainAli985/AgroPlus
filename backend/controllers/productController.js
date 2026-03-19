// controllers/productController.js
import { getModels } from "../config/millDB.js";

const NO_SUBTYPE_TYPES = ["Peddy", "Polish", "Phukar"];

function buildDisplayName(productName, type, subType) {
  return [productName, type, subType].filter(Boolean).join(" - ");
}

function withDisplay(product) {
  const p = typeof product.toObject === "function" ? product.toObject() : { ...product };
  p.displayName = buildDisplayName(p.productName, p.type, p.subType);
  return p;
}

/* Auto-generate next account ID */
async function nextAutoId(Account) {
  const last = await Account.findOne().sort({ createdAt: -1 });
  const lastNum = last?.autoAccountId ? parseInt(last.autoAccountId.split("-")[1]) || 0 : 0;
  return "ACC-" + (lastNum + 1).toString().padStart(6, "0");
}

/* POST /products */
export const createProduct = async (req, res) => {
  try {
    const { Product, Account } = getModels(req.millId);
    const { productName, type, subType } = req.body;

    if (!productName || !type)
      return res.status(400).json({ success: false, message: "Product name and type are required" });

    const resolvedSubType = NO_SUBTYPE_TYPES.includes(type) ? "" : (subType || "");
    if (!NO_SUBTYPE_TYPES.includes(type) && !resolvedSubType)
      return res.status(400).json({ success: false, message: "Sub-type is required for this product type" });

    // ── Uniqueness: same productName + type + subType cannot exist twice ──
    const duplicate = await Product.findOne({
      productName: productName.trim(), type, subType: resolvedSubType,
    });
    if (duplicate)
      return res.status(409).json({
        success: false,
        message: `Product "${buildDisplayName(productName.trim(), type, resolvedSubType)}" already exists.`,
      });

    // ── Create product first ──
    const product = await Product.create({
      productName: productName.trim(),
      type,
      subType: resolvedSubType,
    });

    // ── Auto-create linked account: Assets > Current Assets ──
    const displayName = buildDisplayName(product.productName, product.type, product.subType);
    const autoAccountId = await nextAutoId(Account);

    const account = new Account({
      autoAccountId,
      manualAccountId: "",
      accountType: "Assets",
      subAccountType: "Current Assets",
      accountName: displayName,
      LedgerRef: "",
      category: "Product",
      isProductAccount: true,
      linkedProductId: product._id,
      totalDebit: 0,
      totalCredit: 0,
      balance: 0,
    });
    await account.save();

    // ── Link account back to product ──
    product.linkedAccountId = account._id;
    await product.save();

    res.status(201).json({ success: true, product: withDisplay(product), account });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* GET /products */
export const getProducts = async (req, res) => {
  try {
    const { Product } = getModels(req.millId);
    const raw = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, products: raw.map(withDisplay) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* PUT /products/:id
   Only productName can be changed — type and subType are locked after creation.
   Syncs the name to the linked account too. */
export const updateProduct = async (req, res) => {
  try {
    const { Product, Account } = getModels(req.millId);
    const { productName } = req.body;

    if (!productName?.trim())
      return res.status(400).json({ success: false, message: "Product name is required" });

    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    // Lock type + subType — cannot be changed after creation
    product.productName = productName.trim();
    await product.save();

    // Sync name to linked account
    if (product.linkedAccountId) {
      const newDisplayName = buildDisplayName(product.productName, product.type, product.subType);
      await Account.findByIdAndUpdate(product.linkedAccountId, { accountName: newDisplayName });
    }

    res.json({ success: true, product: withDisplay(product) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* DELETE /products/:id */
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