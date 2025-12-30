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
      enum: ["Peddy", "Rice", "Polish", "Phukar"],
    },

    subType: {
      type: String,
      required: true,
      enum: ["Brown", "White", "Saila", "Basmati", "Steamed"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
