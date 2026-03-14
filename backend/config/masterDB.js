// config/masterDB.js
import mongoose from "mongoose";
import dotenv   from "dotenv";
dotenv.config();

export async function connectMaster() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Master DB connected");
}

// ─── Route lists per plan ─────────────────────────────────────────────────────
const BASIC_ROUTES = [
  "/dashboard",
  "/create-account","/view-accounts","/accounts/*",
  "/ledger","/ledger/account/:accountId","/ledger/ref/:ref",
  "/general-entries","/general-journal-entry","/view-general-entries",
  "/add-invoice","/add-invoice-sales","/view-sales-invoices",
  "/add-invoice-purchase","/view-purchase-invoices",
  "/products/new","/products",
  "/trialbalance","/balancesheet","/incomestatement",
  "/cashbook","/cashbook-report",
  "/profile",
];

const STANDARD_ROUTES = [
  ...BASIC_ROUTES,
  "/employees/new","/employees",
];

export const PACKAGES = {
  starter: {
    name:"Starter", tier:"BASIC", price:250000,
    monthly:7500, customization:30000, color:"#6366f1",
    gradient:"linear-gradient(135deg,#6366f1,#8b5cf6)",
    features:["Dashboard & Analytics","Chart of Accounts","Products Management",
              "Journal Entries","Purchase & Sales Invoices",
              "Financial Reports (BS, TB, IS)","Ledger & References",
              "Cashbook & Daily Register","Profile Management"],
    extras:["Free onboarding session","Email support"],
    excludes:["Employee Management","Weight Bridge"],
    allowedRoutes: BASIC_ROUTES,
  },
  professional: {
    name:"Professional", tier:"STANDARD", price:400000,
    monthly:7500, customization:30000, color:"#059669",
    gradient:"linear-gradient(135deg,#059669,#34d399)",
    features:["Everything in Starter","Employee Management",
              "Role-Based Access Control","Priority Support",
              "Staff Training Session","Custom Ledger References"],
    extras:["2 onboarding sessions","Priority support","Staff training"],
    excludes:["Weight Bridge"],
    allowedRoutes: STANDARD_ROUTES,
  },
  enterprise: {
    name:"Enterprise", tier:"PREMIUM", price:650000,
    monthly:7500, customization:30000, color:"#f59e0b",
    gradient:"linear-gradient(135deg,#f59e0b,#fbbf24)",
    features:["Everything in Professional","Weight Bridge System",
              "Custom Vehicle Types & Rates","Season-Based Management",
              "Dedicated Support Line","Custom Feature Requests",
              "Unlimited Staff Accounts","Data Export Tools"],
    extras:["Dedicated account manager","Unlimited onboarding",
            "Custom feature requests","On-site support (if needed)"],
    excludes:[],
    allowedRoutes: ["*"],
  },
};

// ─── Payment record sub-schema ────────────────────────────────────────────────
const paymentRecordSchema = new mongoose.Schema({
  category:      { type:String, enum:["package","monthly","installment","other"], default:"monthly" },
  amount:        { type:Number, default:0 },
  tid:           { type:String, default:"" },
  senderBank:    { type:String, default:"" },
  senderTitle:   { type:String, default:"" },
  senderAccount: { type:String, default:"" },
  receivingBank: { type:String, default:"" },
  notes:         { type:String, default:"" },
  paidDate:      { type:Date,   default:Date.now },
  recordedAt:    { type:Date,   default:Date.now },
}, { _id:true });

const installmentSchema = new mongoose.Schema({
  installmentNumber: Number,
  amount:    Number,
  dueDate:   Date,
  paid:      { type:Boolean, default:false },
  paidDate:  Date,
  tid:       { type:String, default:"" },
  notes:     { type:String, default:"" },
});

const documentSchema = new mongoose.Schema({
  name:    { type:String, default:"" },
  fileUrl: { type:String, default:"" },
});

const globalRequestSchema = new mongoose.Schema({
  millId:       { type:String, required:true },
  businessName: String,
  type:    { type:String, enum:["complaint","feedback","deletion_request"], default:"complaint" },
  subject: { type:String, required:true },
  message: { type:String, required:true },
  status:  { type:String, enum:["open","in_review","resolved"], default:"open" },
  masterNotes: { type:String, default:"" },
}, { timestamps:true });

const millSchema = new mongoose.Schema({
  millId:        { type:String, required:true, unique:true },
  businessName:  { type:String, required:true },
  ownerName:     { type:String, required:true },
  email:         { type:String, required:true, unique:true },
  cnic:          { type:String, required:true, unique:true },
  adminCnic:     { type:String, required:true, unique:true },
  phone:         { type:String, default:"" },
  ntnNumber:     { type:String, default:"" },
  logoUrl:       { type:String, default:"" },
  adminPassword: { type:String, required:true },
  documents:     { type:[documentSchema], default:[] },
  approvalStatus:{ type:String, enum:["pending","approved","restricted"], default:"pending" },
  isActive:      { type:Boolean, default:false },
  activatedAt:   { type:Date, default:null },
  createdByMaster:{ type:Boolean, default:false },
  plan:          { type:String, enum:["starter","professional","enterprise"], default:"starter" },
  packagePrice:  { type:Number, default:0 },
  allowedRoutes: { type:[String], default:[] },
  paymentType:   { type:String, enum:["full","installment"], default:"full" },
  installmentTenure:{ type:Number, default:0 },
  installmentPlan:  { type:[installmentSchema], default:[] },
  // Unified payment ledger — every recorded payment goes here
  payments:      { type:[paymentRecordSchema], default:[] },
  // Legacy
  paymentProof:  { type:mongoose.Schema.Types.Mixed, default:()=>({}) },
  paymentHistory:{ type:[mongoose.Schema.Types.Mixed], default:[] },
  monthlyPayments:{ type:[mongoose.Schema.Types.Mixed], default:[] },
  planExpiry:    { type:Date, default:()=>new Date(Date.now()+30*86400000) },
  billingDate:   { type:Date, default:()=>new Date(Date.now()+30*86400000) },
  lastReminderSent:{ type:Date, default:null },
}, { timestamps:true });

export function getMasterModels() {
  const db = mongoose.connection;
  return {
    Mill:          db.models.Mill          || db.model("Mill",          millSchema),
    GlobalRequest: db.models.GlobalRequest || db.model("GlobalRequest", globalRequestSchema),
  };
}