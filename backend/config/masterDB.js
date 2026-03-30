// config/masterDB.js
import mongoose from "mongoose";
import dotenv   from "dotenv";
dotenv.config();

let masterConn = null;

export async function connectMaster() {
  if (masterConn) return masterConn;
  const conn = await mongoose.connect(process.env.MONGO_URI);
  masterConn = conn.connection;
  console.log("✅ Master DB connected");
  return masterConn;
}

// ─── Route catalogue (all available routes in the system) ────────────────────
export const ALL_ROUTES = [
  { path:"/dashboard",              label:"Dashboard" },
  { path:"/create-account",         label:"Create Account" },
  { path:"/view-accounts",          label:"View Accounts" },
  { path:"/accounts/*",             label:"Account Detail" },
  { path:"/ledger",                 label:"Ledger Search" },
  { path:"/ledger/account/:id",     label:"Ledger by Account" },
  { path:"/ledger/ref/:ref",        label:"Ledger by Reference" },
  { path:"/general-entries",        label:"General Entries" },
  { path:"/general-journal-entry",  label:"New Journal Entry" },
  { path:"/view-general-entries",   label:"View Journal Entries" },
  { path:"/add-invoice",            label:"Invoice Dashboard" },
  { path:"/add-invoice-sales",      label:"New Sales Invoice" },
  { path:"/view-sales-invoices",    label:"View Sales Invoices" },
  { path:"/add-invoice-purchase",   label:"New Purchase Invoice" },
  { path:"/view-purchase-invoices", label:"View Purchase Invoices" },
  { path:"/products",               label:"Products" },
  { path:"/trialbalance",           label:"Trial Balance" },
  { path:"/balancesheet",           label:"Balance Sheet" },
  { path:"/incomestatement",        label:"Income Statement" },
  { path:"/cashbook",               label:"Cashbook" },
  { path:"/cashbook-report",        label:"Cashbook Report" },
  { path:"/employees/new",          label:"Add Employee" },
  { path:"/employees",              label:"View Employees" },
  { path:"/weight-bridge",          label:"Weight Bridge" },
  { path:"/weight-bridge/invoices", label:"Weight Bridge Reports" },
  { path:"/cheque-book/create",     label:"Create Cheque Book" },
  { path:"/cheque-book/entry",      label:"Issue Cheque" },
  { path:"/cheque-book/view",       label:"View Cheque Books" },
  { path:"/stock",                  label:"Stock Management" },
  { path:"/profile",                label:"Profile" },
];

// ─── Package schema ───────────────────────────────────────────────────────────
// Packages are created dynamically by the master admin.
// price         = one-time setup fee (Rs)
// maintenanceQtrly = maintenance fee billed per quarter (Rs)
//   biannual    = maintenanceQtrly × 2
//   annual      = maintenanceQtrly × 4
const packageSchema = new mongoose.Schema(
  {
    name:          { type: String, required: true, trim: true },
    tier:          { type: String, default: "CUSTOM", trim: true },
    price:         { type: Number, required: true, min: 0 },   // setup/one-time fee
    maintenanceQtrly: { type: Number, default: 0 },             // quarterly maintenance (Rs)
    color:         { type: String, default: "#374151" },
    features:      { type: [String], default: [] },
    maintenanceFee:{ type: Number, default: 0 },   // per-month fee collected quarterly/biannually/annually
    allowedRoutes: { type: [String], default: [] },
    isActive:      { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ─── Invoice schema ───────────────────────────────────────────────────────────
const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true }, // INV-0001
    millId:        { type: String, required: true },
    businessName:  { type: String, default: "" },
    ownerName:     { type: String, default: "" },
    ownerEmail:    { type: String, default: "" },
    amount:        { type: Number, required: true },
    category:      {
      type: String,
      enum: ["setup_full","setup_installment","maintenance_quarterly","maintenance_biannual","maintenance_annual","other"],
      default: "other",
    },
    periodLabel:   { type: String, default: "" },   // e.g. "Q1 2025", "H1 2025", "2025"
    paidDate:      { type: Date, default: Date.now },
    emailSentTo:   { type: String, default: "" },
    cloudinaryUrl: { type: String, default: "" },
    cloudinaryPublicId: { type: String, default: "" },
  },
  { timestamps: true }
);

// ─── Scheduled payment schema (sub-document in Mill) ─────────────────────────
const scheduledPaymentSchema = new mongoose.Schema({
  dueDate:     { type: Date, required: true },
  amount:      { type: Number, required: true },
  category:    { type: String, enum: ["setup","maintenance"], default: "maintenance" },
  cycle:       { type: String, enum: ["quarterly","biannual","annual","full","installment"], default: "quarterly" },
  periodLabel: { type: String, default: "" },
  paid:        { type: Boolean, default: false },
  paidDate:    { type: Date,  default: null },
  invoiceId:   { type: String, default: "" },
  invoiceUrl:  { type: String, default: "" },
}, { _id: true });

// ─── Payment record sub-schema ────────────────────────────────────────────────
const paymentRecordSchema = new mongoose.Schema({
  category:      { type: String, enum: ["setup_full","setup_installment","maintenance_quarterly","maintenance_biannual","maintenance_annual","other"], default: "other" },
  amount:        { type: Number, default: 0 },
  tid:           { type: String, default: "" },
  senderBank:    { type: String, default: "" },
  senderTitle:   { type: String, default: "" },
  senderAccount: { type: String, default: "" },
  receivingBank: { type: String, default: "HBL" },
  notes:         { type: String, default: "" },
  periodLabel:   { type: String, default: "" },
  paidDate:      { type: Date, default: Date.now },
  recordedAt:    { type: Date, default: Date.now },
  invoiceId:     { type: String, default: "" },
  invoiceUrl:    { type: String, default: "" },
}, { _id: true });

const documentSchema = new mongoose.Schema({
  name:     { type: String, default: "" },
  fileUrl:  { type: String, default: "" },
  publicId: { type: String, default: "" },
});

const globalRequestSchema = new mongoose.Schema({
  millId:       { type: String, required: true },
  businessName: String,
  type:    { type: String, enum: ["complaint","feedback","deletion_request"], default: "complaint" },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status:  { type: String, enum: ["open","in_review","resolved"], default: "open" },
  masterNotes: { type: String, default: "" },
}, { timestamps: true });

// ─── Mill schema ──────────────────────────────────────────────────────────────
const millSchema = new mongoose.Schema(
  {
    millId:       { type: String, required: true, unique: true },
    businessName: { type: String, required: true },
    ownerName:    { type: String, required: true },
    email:        { type: String, required: true, unique: true },
    cnic:         { type: String, required: true, unique: true },
    adminCnic:    { type: String, required: true, unique: true },
    phone:        { type: String, default: "" },
    ntnNumber:    { type: String, default: "" },

    // Images
    logoUrl:    { type: String, default: "" },
    profilePic: { type: String, default: "" },

    // Auth
    adminPassword: { type: String, required: true },

    // Documents
    documents: { type: [documentSchema], default: [] },

    // Status
    approvalStatus:  { type: String, enum: ["pending","approved","restricted"], default: "pending" },
    isActive:        { type: Boolean, default: false },
    activatedAt:     { type: Date,    default: null },
    createdByMaster: { type: Boolean, default: false },

    // Package reference (dynamic packages)
    packageId:    { type: mongoose.Schema.Types.ObjectId, ref: "Package", default: null },
    packageName:  { type: String, default: "" },    // snapshot at registration
    packagePrice: { type: Number, default: 0 },     // snapshot at registration

    // Payment structure
    paymentCycle:    { type: String, enum: ["quarterly","biannual","annual"], default: "quarterly" },
    paymentType:     { type: String, enum: ["full","installment"], default: "full" },
    installmentCount:{ type: Number, default: 1 },   // how many setup installments

    // Payment gate — mill cannot be approved until this is true
    firstPaymentReceived: { type: Boolean, default: false },

    // Scheduled payment calendar
    paymentSchedule: { type: [scheduledPaymentSchema], default: [] },

    // All recorded payments
    payments: { type: [paymentRecordSchema], default: [] },

    // Allowed routes (copied from package at registration)
    allowedRoutes: { type: [String], default: [] },

    // Billing
    billingDate:      { type: Date, default: () => new Date(Date.now() + 90 * 86400000) }, // 3 months default
    lastReminderSent: { type: Date, default: null },

    // Legacy compat (kept so existing mills don't break)
    plan:           { type: String, default: "" },
    paymentProof:   { type: mongoose.Schema.Types.Mixed, default: () => ({}) },
    paymentHistory: { type: [mongoose.Schema.Types.Mixed], default: [] },
    monthlyPayments:{ type: [mongoose.Schema.Types.Mixed], default: [] },
    installmentPlan:{ type: [mongoose.Schema.Types.Mixed], default: [] },
    planExpiry:     { type: Date, default: () => new Date(Date.now() + 90 * 86400000) },
    installmentTenure: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ─── Model factory ────────────────────────────────────────────────────────────
export function getMasterModels() {
  const db = mongoose.connection;
  const m  = (name, schema) => db.models[name] || db.model(name, schema);
  return {
    Mill:          m("Mill",          millSchema),
    Package:       m("Package",       packageSchema),
    Invoice:       m("Invoice",       invoiceSchema),
    GlobalRequest: m("GlobalRequest", globalRequestSchema),
  };
}