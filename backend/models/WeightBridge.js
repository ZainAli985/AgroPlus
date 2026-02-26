import mongoose from "mongoose";

const weightBridgeSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true, default: Date.now }, // auto date/time
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    productName: { type: String }, // snapshot for reporting

    vendorName: { type: String, required: true },
    rate: { type: Number, required: true },
    vehicleType: { type: String, enum: ["Truck", "Pickup", "Other"], required: true },
    mode: { type: String, enum: ["Auto", "Manual"], required: true },

    // Weight measurements
    firstWeight: { type: Number, required: true },
    firstWeightWithDriver: { type: Boolean, default: false },
    firstWeightTime: { type: Date, default: Date.now },

    secondWeight: { type: Number, required: true },
    secondWeightWithDriver: { type: Boolean, default: false },
    secondWeightTime: { type: Date, default: Date.now },

    netWeight: { type: Number }, // secondWeight - firstWeight
    netWeightMaund: { type: Number }, // 1 maund = 40 kg
    netWeightTon: { type: Number }, // 1 ton = 1000 kg
  },
  { timestamps: true }
);

export default mongoose.model("WeightBridge", weightBridgeSchema);