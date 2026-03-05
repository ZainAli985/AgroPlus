import mongoose from "mongoose";

const weightBridgeSchema = new mongoose.Schema(
  {
    invoiceCode: { type: String, required: true, unique: true },
    date: { type: Date, required: true, default: Date.now },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: { type: String },

    vendorName:    { type: String, required: true },
    vehicleNumber: { type: String, default: "" },     // ← new field
    rate:          { type: Number, required: true },
    vehicleType: {
      type: String,
      enum: [
        "22 Wheeler",
        "10 Wheeler",
        "06 Wheeler",
        "Phukar Tralla",
        "Tractor Tralla",
        "Mazda",
        "Shehzor",
        "Rickshaw/Ggari",
      ],
      required: true,
    },

    firstWeight:           { type: Number, required: true },
    firstWeightWithDriver: { type: Boolean, default: false },
    firstWeightTime:       { type: Date, default: Date.now },

    secondWeight:           { type: Number },
    secondWeightWithDriver: { type: Boolean },
    secondWeightTime:       { type: Date },

    netWeight:      { type: Number },
    netWeightMaund: { type: Number },
    netWeightTon:   { type: Number },

    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("WeightBridge", weightBridgeSchema);