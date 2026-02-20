import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  name: String,          // e.g. Driving License
  fileUrl: String,       // stored file path
});

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      unique: true,
    },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    cnic: { type: String, required: true, unique: true },
    address: String,
    mobile: String,
    email: { type: String, required: true, unique: true },

    role: {
      type: String,
      enum: ["Admin", "Accountant", "Worker"],
      required: true,
    },

    allowedRoutes: [String], // ['/dashboard','/products']

    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed

    documents: [documentSchema],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);