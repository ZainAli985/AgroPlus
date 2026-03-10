import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["Peddy", "Rice", "Broken Rice", "Polish", "Phukar"],
    },

    // Optional — Peddy, Polish, Phukar have no sub-type
    subType: {
      type: String,
      required: false,
      default: "",
      enum: ["", "Brown", "White", "Steamed", "Sella"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);