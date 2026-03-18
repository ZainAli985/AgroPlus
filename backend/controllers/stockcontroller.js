// controllers/stockController.js
import { getModels } from "../config/millDB.js";

/* Build full product display name from populated productId or stored productName */
function resolveProductName(inv) {
  // New records already store full "Name - Type - SubType"
  if (inv.productName && inv.productName.includes(" - ")) return inv.productName;
  // Old records: productId populated with type + subType
  const pop = inv.productId;
  if (pop && typeof pop === "object" && pop.productName) {
    return [pop.productName, pop.type, pop.subType].filter(Boolean).join(" - ");
  }
  return inv.productName || "—";
}

/* GET /stock/entries
   Returns merged purchase + sales invoice data as stock journal entries.
   
   Accounting logic:
     Purchase Invoice → Stock received:
       DR  Stock / Product           (amount = finalAmount)
       CR  Accounts Payable (Vendor) (amount = finalAmount)
   
     Sales Invoice → Stock dispatched:
       DR  Accounts Receivable (Customer) (amount = totalAmount2)
       CR  Stock / Product                (amount = totalAmount2)
*/
export const getStockEntries = async (req, res) => {
  try {
    const { PurchaseInvoice, SalesInvoice } = getModels(req.millId);

    const [purchases, sales] = await Promise.all([
      PurchaseInvoice.find()
        .sort({ date: 1, sr: 1 })
        .populate("productId", "productName type subType"),
      SalesInvoice.find()
        .sort({ date: 1, sr: 1 })
        .populate("productId", "productName type subType"),
    ]);

    /* ── Map purchase invoices → stock-in entries ── */
    const purchaseEntries = purchases.map(inv => {
      const amount = Number(inv.finalAmount || inv.totalAmount || inv.amount || 0);
      return {
        _id:       String(inv._id),
        type:      "purchase",
        date:      inv.date || "",
        sr:        inv.sr,
        invoiceNo: `#${String(inv.sr || "").padStart(4, "0")}`,
        productName: resolveProductName(inv),
        vendorName:  inv.vendorName || "—",
        vehicleNo:   inv.vehicleNumber || inv.vehicleNo || "—",
        builtyNo:    inv.builtyNumber  || inv.builtyNo  || "—",
        quantity:    Number(inv.quantity     || 0),
        rate:        Number(inv.rateRows?.[0]?.rate || inv.rate40kg || 0),
        maund:       Number(inv.netWeightMaund || inv.netWeight40KG || 0),
        netWeightKg: Number(inv.netWeightKg    || inv.netWeight     || 0),
        bagStatus:   inv.bagStatus || "added",
        debit:       amount,   // Stock / Product debited
        credit:      amount,   // Vendor Payable credited
        amount,
      };
    });

    /* ── Map sales invoices → stock-out entries ── */
    const salesEntries = sales.map(inv => {
      const amount = Number(inv.totalAmount2 || inv.totalWithBardana || inv.totalAmount || inv.amount || 0);
      return {
        _id:       String(inv._id),
        type:      "sale",
        date:      inv.date || "",
        sr:        inv.sr,
        invoiceNo: `#${String(inv.sr || "").padStart(4, "0")}`,
        productName: resolveProductName(inv),
        vendorName:  inv.vendorName || "—",
        vehicleNo:   inv.vehicleNo  || "—",
        builtyNo:    inv.builtyNo   || "—",
        quantity:    Number(inv.quantity   || 0),
        rate:        Number(inv.rate40     || 0),
        maund:       Number(inv.netWeight40 || 0),
        netWeightKg: Number(inv.netWeight   || 0),
        debit:       amount,   // Customer / Receivable debited
        credit:      amount,   // Stock / Product credited
        amount,
      };
    });

    /* ── Merge and sort by date, then by sr ── */
    const all = [...purchaseEntries, ...salesEntries].sort((a, b) => {
      const da = new Date(a.date); const db = new Date(b.date);
      if (da < db) return -1; if (da > db) return 1;
      // same date: purchases before sales
      if (a.type !== b.type) return a.type === "purchase" ? -1 : 1;
      return (a.sr || 0) - (b.sr || 0);
    });

    /* ── Summary ── */
    const totalStockIn    = purchaseEntries.reduce((s, e) => s + e.amount, 0);
    const totalStockOut   = salesEntries.reduce((s, e) => s + e.amount, 0);
    const totalMaundIn    = purchaseEntries.reduce((s, e) => s + e.maund, 0);
    const totalMaundOut   = salesEntries.reduce((s, e) => s + e.maund, 0);
    const totalQtyIn      = purchaseEntries.reduce((s, e) => s + e.quantity, 0);
    const totalQtyOut     = salesEntries.reduce((s, e) => s + e.quantity, 0);

    res.json({
      success: true,
      entries: all,
      summary: {
        totalStockIn,
        totalStockOut,
        netBalance:   totalStockIn - totalStockOut,
        totalMaundIn,
        totalMaundOut,
        netMaund:     totalMaundIn - totalMaundOut,
        totalQtyIn,
        totalQtyOut,
        netQty:       totalQtyIn - totalQtyOut,
        purchaseCount: purchaseEntries.length,
        salesCount:    salesEntries.length,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};