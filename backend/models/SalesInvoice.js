import mongoose from "mongoose";

const salesInvoiceSchema = new mongoose.Schema(
  {
    sr: Number,
    date: String,
    vehicleNo: String,
    builtyNo: String,
    vendorName: String,
    brokerName: String,

    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // NEW
    productName: String, // NEW
    paddyType: String, // optional, can still use for display

    quantity: Number,
    weight: Number,
    bagWeight: Number,
    netWeight: Number,
    netWeight40: Number,
    rate40: Number,
    amount: Number,
    sutliSilaiRate: Number,
    sutliSilaiAmount: Number,
    totalAmount: Number,
    brokeryRate: Number,
    brokery: Number,
    totalAmount2: Number,
  },
  { timestamps: true }
);

const SalesInvoice =
  mongoose.models.SalesInvoice ||
  mongoose.model("SalesInvoice", salesInvoiceSchema);

export default SalesInvoice;
