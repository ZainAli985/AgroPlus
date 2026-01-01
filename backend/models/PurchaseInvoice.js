// import mongoose from "mongoose";

// const purchaseInvoiceSchema = new mongoose.Schema(
//   {
//     date: { type: String, required: true },
//     ledgerReference: String,
//     vehicleNumber: { type: String, required: true },
//     builtyNumber: { type: String, required: true },
//     vendorName: { type: String, required: true },
//     brokerName: String,
//     paddyType: String,
//     quantity: Number,
//     emptyVehicleWeight: Number,
//     filledVehicleWeight: Number,
//     subtractWeight: Number,
//     bagWeight: Number,
//     finalWeight: Number,
//     moisturePercent: Number,
//     moistureAdjCal: Number,
//     moistureAdjustment: Number,
//     netWeight: Number,
//     netWeight40KG: Number,
//     weightKG: Number,
//     rate40kg: Number,
//     amountCal: Number,
//     amount: Number,
//     difference: Number,
//     rentAdjustment: Number,
//   },
//   { timestamps: true }
// );

// const PurchaseInvoice =
//   mongoose.models.PurchaseInvoice ||
//   mongoose.model("PurchaseInvoice", purchaseInvoiceSchema);

// export default PurchaseInvoice;
import mongoose from "mongoose";

const purchaseInvoiceSchema = new mongoose.Schema(
  {
    // Invoice identity
    sr: { type: Number, required: true, index: true }, // ❌ removed unique
    date: { type: String, required: true },

    // Parties
    vendorName: { type: String, required: true },
    brokerName: String,

    // Transport
    vehicleNumber: { type: String, required: true },
    builtyNumber: String,

    // Product
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // reference
    productName: { type: String }, // snapshot
    quantity: Number,

    // Weights
    emptyVehicleWeight: Number,
    filledVehicleWeight: Number,
    subtractWeight: Number,
    bagWeight: Number,
    finalWeight: Number,

    moisturePercent: Number,
    moistureAdjCal: Number,
    moistureAdjustment: Number,

    netWeightCal: Number,
    netWeight: Number,
    netWeight40KG: Number,
    weightKG: Number,

    // Rate & Amount
    rate40kg: Number,
    amountCal: Number,
    amount: Number,

    // Adjustments
    difference: Number,
    rentAdjustment: Number,

    // Reference
    ledgerReference: String,
  },
  { timestamps: true }
);

export default mongoose.model("PurchaseInvoice", purchaseInvoiceSchema);
