import mongoose from "mongoose";

const weightBridgeSchema = new mongoose.Schema(
  {
    invoiceCode: { type: String, required: true, unique: true }, // auto-generated
    date: { type: Date, required: true, default: Date.now }, // initial entry time

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: { type: String },

    vendorName: { type: String, required: true },
    rate: { type: Number, required: true },
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

    firstWeight: { type: Number, required: true },
    firstWeightWithDriver: { type: Boolean, default: false },
    firstWeightTime: { type: Date, default: Date.now },

    secondWeight: { type: Number },
    secondWeightWithDriver: { type: Boolean },
    secondWeightTime: { type: Date },

    netWeight: { type: Number },
    netWeightMaund: { type: Number },
    netWeightTon: { type: Number },

    completed: { type: Boolean, default: false }, // locks invoice after second weight
  },
  { timestamps: true },
);

export default mongoose.model("WeightBridge", weightBridgeSchema);
