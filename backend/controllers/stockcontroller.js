// controllers/stockController.js
// Stock Ledger: queries GeneralJournalEntries via product accounts.
// DR on product account = stock in (purchase)
// CR on product account = stock out (sale)
import { getModels } from "../config/millDB.js";

export const getStockEntries = async (req, res) => {
  try {
    const { Account, GeneralJournalEntry } = getModels(req.millId);

    // ── 1. Get all product accounts ──
    const productAccounts = await Account.find({ isProductAccount: true });
    if (!productAccounts.length) {
      return res.json({ success: true, entries: [], perProduct: [], summary: {
        totalStockIn: 0, totalStockOut: 0, netBalance: 0,
        totalMaundIn: 0, totalMaundOut: 0, netMaund: 0,
        totalQtyIn: 0, totalQtyOut: 0,
      }});
    }

    const productAccountIds = productAccounts.map(a => a._id);

    // ── 2. Fetch all JEs touching any product account ──
    const journalEntries = await GeneralJournalEntry.find({
      $or: [
        { debitAccount: { $in: productAccountIds } },
        { "creditEntries.account": { $in: productAccountIds } },
      ],
    })
      .populate("debitAccount", "accountName isProductAccount")
      .populate("creditEntries.account", "accountName isProductAccount")
      .sort({ entryDate: 1 });

    // ── 3. Build flat entry list with DR/CR context ──
    const entries = [];
    for (const je of journalEntries) {
      const m = je.meta || {};
      // Primary: use stored invoiceType from meta
      // Fallback: if debitAccount is a product account it's a purchase; if not, it's a sale
      const invoiceTypeMeta = m.invoiceType; // "purchase" | "sale" | undefined
      const isPurchase = invoiceTypeMeta === "purchase"
        ? true
        : invoiceTypeMeta === "sale"
        ? false
        : je.debitAccount?.isProductAccount === true;

      // For each JE: identify the product account and the counter account
      let productAccName = "", counterAccName = "", type = "purchase";
      let debitAmt = 0, creditAmt = 0, productId = m.productId || null;

      if (isPurchase) {
        // DR = product account, CR = vendor
        productAccName  = je.debitAccount?.accountName || m.productName || "—";
        counterAccName  = je.creditEntries?.[0]?.account?.accountName || m.vendorName || "—";
        debitAmt        = je.debitAmount;
        creditAmt       = je.debitAmount;
        type            = "purchase";
      } else {
        // DR = customer, CR = product account
        const crProductEntry = je.creditEntries?.find(c => c.account?.isProductAccount);
        productAccName  = crProductEntry?.account?.accountName || m.productName || "—";
        counterAccName  = je.debitAccount?.accountName || m.vendorName || "—";
        debitAmt        = je.debitAmount;
        creditAmt       = je.debitAmount;
        type            = "sale";
      }

      entries.push({
        _id:          String(je._id),
        date:         je.entryDate ? je.entryDate.toISOString().slice(0, 10) : "",
        type,
        invoiceNo:    m.invoiceLabel || `#${String(m.invoiceNo || "").padStart(4, "0")}`,
        invoiceSr:    m.invoiceNo || 0,
        productName:  m.productName || productAccName,
        productId:    productId || "",
        vendorName:   m.vendorName || counterAccName,
        // Accounting
        drAccountName: isPurchase ? productAccName : counterAccName,
        crAccountName: isPurchase ? counterAccName : productAccName,
        debit:  debitAmt,
        credit: creditAmt,
        amount: debitAmt,
        // Detail from meta
        bags:       m.bags       || 0,
        maund:      m.maund      || 0,
        rate:       m.rate       || 0,
        vehicleNo:  m.vehicleNo  || "—",
        netWeightKg: m.netWeightKg || 0,
      });
    }

    // ── 4. Per-product summary ──
    const productMap = {};
    for (const acc of productAccounts) {
      productMap[String(acc._id)] = {
        accountId:   String(acc._id),
        productId:   acc.linkedProductId ? String(acc.linkedProductId) : null,
        productName: acc.accountName,
        totalStockIn: 0, totalStockOut: 0,
        totalMaundIn: 0, totalMaundOut: 0,
        totalQtyIn: 0, totalQtyOut: 0,
        entries: [],
      };
    }

    // Build a Set of product account ID strings for fast lookup
    const productAccountIdSet = new Set(productAccountIds.map(id => String(id)));

    for (const e of entries) {
      // Find which product account this belongs to — use ID set, not isProductAccount flag
      let key = null;
      if (e.type === "purchase") {
        const je = journalEntries.find(j => String(j._id) === e._id);
        const debitId = je?.debitAccount?._id ? String(je.debitAccount._id) : null;
        if (debitId && productAccountIdSet.has(debitId)) key = debitId;
      } else {
        const je = journalEntries.find(j => String(j._id) === e._id);
        const cr = je?.creditEntries?.find(c => {
          const cId = c.account?._id ? String(c.account._id) : String(c.account || "");
          return productAccountIdSet.has(cId);
        });
        if (cr) {
          const cId = cr.account?._id ? String(cr.account._id) : String(cr.account);
          key = cId;
        }
      }

      if (key && productMap[key]) {
        const pm = productMap[key];
        if (e.type === "purchase") {
          pm.totalStockIn  += e.amount;
          pm.totalMaundIn  += e.maund;
          pm.totalQtyIn    += e.bags;
        } else {
          pm.totalStockOut += e.amount;
          pm.totalMaundOut += e.maund;
          pm.totalQtyOut   += e.bags;
        }
        pm.entries.push(e);
      }
    }

    const perProduct = Object.values(productMap).map(pm => ({
      ...pm,
      netBalance: pm.totalStockIn - pm.totalStockOut,
      netMaund:   pm.totalMaundIn - pm.totalMaundOut,
      netQty:     pm.totalQtyIn   - pm.totalQtyOut,
      entryCount: pm.entries.length,
    })).filter(pm => pm.entryCount > 0 || true); // show all products even with 0 entries

    // ── 5. Grand summary ──
    const summary = {
      totalStockIn:  entries.filter(e => e.type === "purchase").reduce((s, e) => s + e.amount, 0),
      totalStockOut: entries.filter(e => e.type === "sale").reduce((s, e) => s + e.amount, 0),
      totalMaundIn:  entries.filter(e => e.type === "purchase").reduce((s, e) => s + e.maund, 0),
      totalMaundOut: entries.filter(e => e.type === "sale").reduce((s, e) => s + e.maund, 0),
      totalQtyIn:    entries.filter(e => e.type === "purchase").reduce((s, e) => s + e.bags, 0),
      totalQtyOut:   entries.filter(e => e.type === "sale").reduce((s, e) => s + e.bags, 0),
      purchaseCount: entries.filter(e => e.type === "purchase").length,
      salesCount:    entries.filter(e => e.type === "sale").length,
    };
    summary.netBalance = summary.totalStockIn - summary.totalStockOut;
    summary.netMaund   = summary.totalMaundIn - summary.totalMaundOut;

    res.json({ success: true, entries, perProduct, summary });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};