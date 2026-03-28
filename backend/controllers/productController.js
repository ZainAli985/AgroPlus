// controllers/productController.js
import { getModels } from "../config/millDB.js";

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

function buildCatalogue() {
  const list = [];
  for (const variety of VARIETIES) {
    for (const subType of RICE_SUBTYPES) {
      list.push({ variety, type: "Rice",   subType });
      list.push({ variety, type: "Broken", subType });
    }
    list.push({ variety, type: "Paddy",  subType: "" });
    list.push({ variety, type: "Polish", subType: "" });
    list.push({ variety, type: "Phukar", subType: "" });
  }
  return list; // 19 × 17 = 323
}

export function productDisplayName(variety, type, subType) {
  return subType ? `${variety} - ${type} - ${subType}` : `${variety} - ${type}`;
}

// ── POST /api/products/seed ───────────────────────────────────────────────────
export const seedProducts = async (req, res) => {
  try {
    const { Product } = getModels(req.millId);

    // Step 0: Migrate legacy "Broken Rice" → "Broken"
    try {
      await Product.collection.updateMany(
        { type: "Broken Rice" },
        { $set: { type: "Broken" } }
      );
    } catch (_) {}

    try {
      const brokenRiceDocs = await Product.collection.find({ productName: /Broken Rice/ }).toArray();
      for (const doc of brokenRiceDocs) {
        const fixed = doc.productName.replace(/Broken Rice/g, "Broken");
        await Product.collection.updateOne({ _id: doc._id }, { $set: { productName: fixed } });
      }
    } catch (_) {}

    // Step 1: Drop conflicting indexes
    try { await Product.collection.dropIndex("type_1_subType_1"); } catch (_) {}
    try { await Product.collection.dropIndex("variety_1_type_1_subType_1"); } catch (_) {}

    // Step 2: Recreate correct unique index
    try {
      await Product.collection.createIndex(
        { variety: 1, type: 1, subType: 1 },
        { unique: true, background: true }
      );
    } catch (_) {}

    // Step 3: Deduplicate
    try {
      const allProducts = await Product.collection.find({}).toArray();
      const seen = new Map();
      const toDelete = [];
      for (const doc of allProducts) {
        const key = `${doc.variety}||${doc.type}||${doc.subType}`;
        if (seen.has(key)) {
          const existing = seen.get(key);
          if (doc.isActive) { toDelete.push(existing._id); seen.set(key, doc); }
          else toDelete.push(doc._id);
        } else {
          seen.set(key, doc);
        }
      }
      if (toDelete.length > 0)
        await Product.collection.deleteMany({ _id: { $in: toDelete } });
    } catch (_) {}

    // Step 4: Upsert catalogue products
    // ── FIX: productName must NOT appear in both $set and $setOnInsert ──────
    // $set runs on every upsert (insert + update), $setOnInsert only on insert.
    // Having the same field in both operators causes:
    //   "Updating the path 'productName' would create a conflict at 'productName'"
    const catalogue = buildCatalogue();
    let inserted = 0, updated = 0;

    for (const p of catalogue) {
      try {
        const displayName = productDisplayName(p.variety, p.type, p.subType);
        const result = await Product.collection.updateOne(
          { variety: p.variety, type: p.type, subType: p.subType },
          {
            // $set applies on both insert and update — keeps productName in sync
            $set: {
              productName: displayName,
              updatedAt:   new Date(),
            },
            // $setOnInsert applies ONLY when a new document is created
            $setOnInsert: {
              variety:     p.variety,
              type:        p.type,
              subType:     p.subType,
              isHardcoded: true,
              isActive:    false,
              createdAt:   new Date(),
              // Note: productName intentionally NOT repeated here — $set handles it
            },
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
export const activateProduct = async (req, res) => {
  try {
    const { Product, Account } = getModels(req.millId);
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found." });
    if (product.isActive) return res.json({ success: true, message: "Already active.", product });

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