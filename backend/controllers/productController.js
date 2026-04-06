// controllers/productController.js
import { getModels } from "../config/millDB.js";

// ── Hardcoded catalogue — 323 products exactly as specified ───────────────────
// Types: Rice, Broken, Paddy, Polish, Phukar
// SubTypes for Rice/Broken: Brown, White (Raw), White (Double Polish),
//   White (Silky-Water Polish), Steamed, Sella (Creamy), Sella (Golden)
// Paddy / Polish / Phukar: no subType

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

// Builds the full 323-product catalogue.
// Types stored exactly as shown in the spec: Rice | Broken | Paddy | Polish | Phukar
function buildCatalogue() {
  const list = [];
  for (const variety of VARIETIES) {
    for (const subType of RICE_SUBTYPES) {
      list.push({ variety, type: "Rice",    subType });
      list.push({ variety, type: "Broken",  subType });
    }
    list.push({ variety, type: "Paddy",  subType: "" });
    list.push({ variety, type: "Polish", subType: "" });
    list.push({ variety, type: "Phukar", subType: "" });
  }
  return list; // 19 × 17 = 323
}

// Display name: "Variety - Type - SubType" or "Variety - Type" when no subtype
export function productDisplayName(variety, type, subType) {
  return subType ? `${variety} - ${type} - ${subType}` : `${variety} - ${type}`;
}

// ── POST /api/products/seed ───────────────────────────────────────────────────
// Idempotent. Drops old conflicting index, ensures correct index, migrates legacy
// "Broken Rice" → "Broken" type values, then inserts missing products.
export const seedProducts = async (req, res) => {
  try {
    const { Product } = getModels(req.millId);

    // ── Step 0: Migrate old "Broken Rice" → "Broken" directly in MongoDB ──────
    // Use updateMany with { strict:false } to bypass enum validation on old docs.
    try {
      await Product.collection.updateMany(
        { type: "Broken Rice" },
        { $set: { type: "Broken" } }
      );
    } catch (_) {}

    // Also fix productName strings that contain " - Broken Rice - " or " - Broken Rice"
    try {
      const brokenRiceDocs = await Product.collection.find({ productName: /Broken Rice/ }).toArray();
      for (const doc of brokenRiceDocs) {
        const fixed = doc.productName.replace(/Broken Rice/g, "Broken");
        await Product.collection.updateOne({ _id: doc._id }, { $set: { productName: fixed } });
      }
    } catch (_) {}

    // ── Step 1: Drop old conflicting indexes ──────────────────────────────────
    try { await Product.collection.dropIndex("type_1_subType_1"); } catch (_) {}
    try { await Product.collection.dropIndex("variety_1_type_1_subType_1"); } catch (_) {}

    // ── Step 2: Recreate correct unique index ─────────────────────────────────
    try {
      await Product.collection.createIndex(
        { variety: 1, type: 1, subType: 1 },
        { unique: true, background: true }
      );
    } catch (_) {}

    // ── Step 3: Deduplicate — remove any duplicate Broken docs created before migration ──
    // After migration, if both an old migrated doc AND a newly-inserted doc exist
    // for the same variety+type+subType, remove the newer duplicate (keep the one
    // that may already have isActive=true from a previous activation).
    try {
      const allProducts = await Product.collection.find({}).toArray();
      const seen = new Map();
      const toDelete = [];
      for (const doc of allProducts) {
        const key = `${doc.variety}||${doc.type}||${doc.subType}`;
        if (seen.has(key)) {
          // Keep the one with isActive=true, delete the other. If neither active, keep older.
          const existing = seen.get(key);
          if (doc.isActive) {
            toDelete.push(existing._id);
            seen.set(key, doc);
          } else {
            toDelete.push(doc._id);
          }
        } else {
          seen.set(key, doc);
        }
      }
      if (toDelete.length > 0) {
        await Product.collection.deleteMany({ _id: { $in: toDelete } });
      }
    } catch (_) {}

    // ── Step 4: Upsert all catalogue products (bypass Mongoose validation) ───
    const catalogue = buildCatalogue();
    let inserted = 0;
    let updated  = 0;

    for (const p of catalogue) {
      try {
        const displayName = productDisplayName(p.variety, p.type, p.subType);
        const result = await Product.collection.updateOne(
          { variety: p.variety, type: p.type, subType: p.subType },
          {
            $setOnInsert: {
              variety:     p.variety,
              type:        p.type,
              subType:     p.subType,
              productName: displayName,
              isHardcoded: true,
              isActive:    false,
              createdAt:   new Date(),
              updatedAt:   new Date(),
            },
            $set: { productName: displayName },  // always sync display name
          },
          { upsert: true }
        );
        if (result.upsertedCount > 0) inserted++;
        else updated++;
      } catch (e) {
        if (e.code !== 11000) throw e;
      }
    }

    res.json({
      success: true, inserted, updated, total: catalogue.length,
      message: `Seeded: ${inserted} new, ${updated} updated, ${catalogue.length} total.`,
    });
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
// One-way — creates Inventory account (Assets > Current Assets) and links it.
// Cannot be undone.
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
      category:          "Product",
      isProductAccount:  true,
      linkedProductId:   product._id,
      totalDebit: 0, totalCredit: 0, balance: 0,
    });

    // Use collection.updateOne to bypass Mongoose enum validation on legacy docs
    // (guards against any remaining "Broken Rice" type that migration hasn't caught yet)
    await Product.collection.updateOne(
      { _id: product._id },
      { $set: {
          isActive:        true,
          linkedAccountId: account._id,
          productName:     displayName,
          type:            product.type === "Broken Rice" ? "Broken" : product.type,
      }}
    );

    const updated = await Product.findById(product._id).populate("linkedAccountId", "accountName balance");
    res.json({ success: true, message: "Product activated.", product: updated, account });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Deactivation intentionally not supported — activated products are permanent.