// controllers/stockController.js
import { getModels } from "../config/millDB.js";

function resolveProductName(inv) {
  if (inv.productName && inv.productName.includes(" - ")) return inv.productName;
  const pop = inv.productId;
  if (pop && typeof pop === "object" && pop.productName) {
    return [pop.productName, pop.type, pop.subType].filter(Boolean).join(" - ");
  }
  return inv.productName || "—";
}

export const getStockEntries = async (req, res) => {
  try {
    const { PurchaseInvoice, SalesInvoice, GeneralJournalEntry } = getModels(req.millId);

    const [purchases, sales] = await Promise.all([
      PurchaseInvoice.find().sort({ date: 1, sr: 1 }).populate("productId", "productName type subType"),
      SalesInvoice.find().sort({ date: 1, sr: 1 }).populate("productId", "productName type subType"),
    ]);

    // Fetch all associated journal entries in one query
    const allJEIds = [
      ...purchases.filter(i => i.journalEntryId).map(i => i.journalEntryId),
      ...sales.filter(i => i.journalEntryId).map(i => i.journalEntryId),
    ];
    const journalEntries = allJEIds.length
      ? await GeneralJournalEntry.find({ _id: { $in: allJEIds } })
          .populate("debitAccount", "accountName")
          .populate("creditEntries.account", "accountName")
      : [];
    const jeMap = {};
    journalEntries.forEach(je => { jeMap[String(je._id)] = je; });

    function getJEAccounts(inv) {
      if (!inv.journalEntryId) return { drAccount: null, crAccount: null };
      const je = jeMap[String(inv.journalEntryId)];
      if (!je) return { drAccount: null, crAccount: null };
      return {
        drAccount: je.debitAccount?.accountName || null,
        crAccount: je.creditEntries?.[0]?.account?.accountName || null,
      };
    }

    // Purchase: DR Stock/Purchases | CR Vendor (Accounts Payable)
    const purchaseEntries = purchases.map(inv => {
      const amount = Number(inv.finalAmount || inv.totalAmount || inv.amount || 0);
      const { drAccount, crAccount } = getJEAccounts(inv);
      return {
        _id: String(inv._id),
        journalEntryId: inv.journalEntryId ? String(inv.journalEntryId) : null,
        type: "purchase",
        date: inv.date || "",
        sr: inv.sr,
        invoiceNo: `#${String(inv.sr || "").padStart(4, "0")}`,
        productName: resolveProductName(inv),
        vendorName: inv.vendorName || "—",
        vehicleNo: inv.vehicleNumber || inv.vehicleNo || "—",
        builtyNo: inv.builtyNumber || inv.builtyNo || "—",
        quantity: Number(inv.quantity || 0),
        rate: Number(inv.rateRows?.[0]?.rate || inv.rate40kg || 0),
        maund: Number(inv.netWeightMaund || inv.netWeight40KG || 0),
        netWeightKg: Number(inv.netWeightKg || inv.netWeight || 0),
        bagStatus: inv.bagStatus || "added",
        drAccountName: drAccount || "Stock / Purchases",
        crAccountName: crAccount || inv.vendorName || "—",
        debit: amount,   // DR side amount
        credit: amount,  // CR side amount (same — balanced entry)
        amount,
      };
    });

    // Sales: DR Customer (Accounts Receivable) | CR Revenue/Sales
    const salesEntries = sales.map(inv => {
      const amount = Number(inv.totalAmount2 || inv.totalWithBardana || inv.totalAmount || inv.amount || 0);
      const { drAccount, crAccount } = getJEAccounts(inv);
      return {
        _id: String(inv._id),
        journalEntryId: inv.journalEntryId ? String(inv.journalEntryId) : null,
        type: "sale",
        date: inv.date || "",
        sr: inv.sr,
        invoiceNo: `#${String(inv.sr || "").padStart(4, "0")}`,
        productName: resolveProductName(inv),
        vendorName: inv.vendorName || "—",
        vehicleNo: inv.vehicleNo || "—",
        builtyNo: inv.builtyNo || "—",
        quantity: Number(inv.quantity || 0),
        rate: Number(inv.rate40 || 0),
        maund: Number(inv.netWeight40 || 0),
        netWeightKg: Number(inv.netWeight || 0),
        drAccountName: drAccount || inv.vendorName || "—",
        crAccountName: crAccount || "Sales Revenue",
        debit: amount,
        credit: amount,
        amount,
      };
    });

    const all = [...purchaseEntries, ...salesEntries].sort((a, b) => {
      const da = new Date(a.date); const db = new Date(b.date);
      if (da < db) return -1; if (da > db) return 1;
      if (a.type !== b.type) return a.type === "purchase" ? -1 : 1;
      return (a.sr || 0) - (b.sr || 0);
    });

    const totalStockIn  = purchaseEntries.reduce((s, e) => s + e.amount, 0);
    const totalStockOut = salesEntries.reduce((s, e) => s + e.amount, 0);
    const totalMaundIn  = purchaseEntries.reduce((s, e) => s + e.maund, 0);
    const totalMaundOut = salesEntries.reduce((s, e) => s + e.maund, 0);
    const totalQtyIn    = purchaseEntries.reduce((s, e) => s + e.quantity, 0);
    const totalQtyOut   = salesEntries.reduce((s, e) => s + e.quantity, 0);

    res.json({
      success: true,
      entries: all,
      summary: {
        totalStockIn, totalStockOut, netBalance: totalStockIn - totalStockOut,
        totalMaundIn, totalMaundOut, netMaund: totalMaundIn - totalMaundOut,
        totalQtyIn, totalQtyOut, netQty: totalQtyIn - totalQtyOut,
        purchaseCount: purchaseEntries.length,
        salesCount: salesEntries.length,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};