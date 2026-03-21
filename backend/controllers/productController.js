// controllers/productController.js
import { getModels } from "../config/millDB.js";

// ── Hardcoded varieties ────────────────────────────────────────────────────────
const VARIETIES = [
  "Super Kernel Basmati",
  "1121 Basmati (Kainat)",
  "Basmati 385 (PK 385)",
  "Basmati 515",
  "D-98 (Sindhi Basmati)",
  "Basmati 2000",
  "Basmati 370",
  "Chenab Basmati",
  "IRRI-6",
  "IRRI-9 (C-9)",
  "PK 386",
  "KS-282",
  "Supri",
  "KSK 133",
  "Hybrid LP-18",
  "Super 1509",
  "Kainat 1718 / 1847",
  "Lal-86",
  "Green Super Rice (GSR)",
];

const RICE_SUBTYPES = [
  "Brown",
  "White (Raw)",
  "White (Double Polish)",
  "White (Silky-Water Polish)",
  "Steamed",
  "Sella (Creamy)",
  "Sella (Golden)",
];

// Build full catalogue — 19 varieties × 17 products = 323 total
function buildCatalogue() {
  const products = [];
  for (const variety of VARIETIES) {
    for (const subType of RICE_SUBTYPES) {
      products.push({ variety, type: "Rice",       subType });
      products.push({ variety, type: "Broken Rice", subType });
    }
    products.push({ variety, type: "Paddy",  subType: "" });
    products.push({ variety, type: "Polish", subType: "" });
    products.push({ variety, type: "Phukar", subType: "" });
  }
  return products;
}

// Display helpers (also exported so frontend can reuse)
export function typeDisplay(type) {
  return type === "Broken Rice" ? "Broken" : type;
}

export function productDisplayName(variety, type, subType) {
  const td = typeDisplay(type);
  return subType ? `${variety} - ${td} - ${subType}` : `${variety} - ${td}`;
}

// ── POST /api/products/seed ───────────────────────────────────────────────────
// Idempotent — inserts only missing products.  Safe to call on every app start.
// Also migrates the old {type,subType} unique index to {variety,type,subType}.
export const seedProducts = async (req, res) => {
  try {
    const { Product } = getModels(req.millId);

    // ── Step 1: Drop old conflicting index if it still exists ─────────────────
    // Old schema had a unique index on {type,subType} which prevents multiple
    // varieties sharing the same type+subType.  Drop it before seeding.
    try {
      await Product.collection.dropIndex("type_1_subType_1");
    } catch (_) {
      // Index doesn't exist — that's fine, continue
    }

    // ── Step 2: Ensure the correct index exists ───────────────────────────────
    try {
      await Product.collection.createIndex(
        { variety: 1, type: 1, subType: 1 },
        { unique: true, background: true }
      );
    } catch (_) {
      // Already exists — fine
    }

    // ── Step 3: Insert missing products ──────────────────────────────────────
    const catalogue = buildCatalogue();
    let inserted = 0;

    for (const p of catalogue) {
      try {
        const exists = await Product.findOne({ variety: p.variety, type: p.type, subType: p.subType });
        if (!exists) {
          await Product.create({
            variety:     p.variety,
            type:        p.type,
            subType:     p.subType,
            productName: productDisplayName(p.variety, p.type, p.subType),
            isHardcoded: true,
            isActive:    false,
          });
          inserted++;
        }
      } catch (docErr) {
        // Skip duplicate key errors on individual docs — already seeded
        if (docErr.code !== 11000) throw docErr;
      }
    }

    res.json({ success: true, inserted, total: catalogue.length,
      message: `Seeded ${inserted} new products (${catalogue.length - inserted} already existed).` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/products ─────────────────────────────────────────────────────────
// ?activeOnly=true  → only activated products (for invoice/weight-bridge dropdowns)
export const getProducts = async (req, res) => {
  try {
    const { Product } = getModels(req.millId);
    const filter = {};
    if (req.query.activeOnly === "true") filter.isActive = true;
    const products = await Product.find(filter)
      .populate("linkedAccountId", "accountName balance")
      .sort({ variety: 1, type: 1, subType: 1 });
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── PATCH /api/products/:id/activate ─────────────────────────────────────────
// Creates an Inventory account under Assets > Current Assets and links it.
export const activateProduct = async (req, res) => {
  try {
    const { Product, Account } = getModels(req.millId);
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found." });
    if (product.isActive) return res.json({ success: true, message: "Already active.", product });

    // Generate next account ID
    const lastAccount = await Account.findOne().sort({ createdAt: -1 });
    let lastNum = 0;
    if (lastAccount?.autoAccountId) lastNum = parseInt(lastAccount.autoAccountId.split("-")[1]) || 0;
    const autoAccountId = "ACC-" + (lastNum + 1).toString().padStart(6, "0");

    const displayName = productDisplayName(product.variety, product.type, product.subType);

    const account = await Account.create({
      autoAccountId,
      manualAccountId:   "",
      accountType:       "Assets",
      subAccountType:    "Current Assets",
      accountName:       displayName,
      LedgerRef:         "",
      category:          "Inventory",
      isProductAccount:  true,
      linkedProductId:   product._id,
      totalDebit: 0, totalCredit: 0, balance: 0,
    });

    product.isActive        = true;
    product.linkedAccountId = account._id;
    product.productName     = displayName;
    await product.save();

    const populated = await product.populate("linkedAccountId", "accountName balance");
    res.json({ success: true, message: "Product activated.", product: populated, account });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Deactivation is intentionally not supported — activated products are permanent.