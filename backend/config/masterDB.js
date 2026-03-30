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

// ── All routes available in the app for package access control ───────────────
export const ALL_ROUTES = [
  { path:"/dashboard",              label:"Dashboard",              group:"Core" },
  { path:"/profile",                label:"Profile",                group:"Core" },
  { path:"/create-account",         label:"Create Account",         group:"Accounts" },
  { path:"/view-accounts",          label:"View Accounts",          group:"Accounts" },
  { path:"/accounts/*",             label:"Account Details",        group:"Accounts" },
  { path:"/ledger",                 label:"Ledger Search",          group:"Ledger" },
  { path:"/ledger/account/:id",     label:"Account Ledger",         group:"Ledger" },
  { path:"/ledger/ref/:ref",        label:"Reference Ledger",       group:"Ledger" },
  { path:"/general-entries",        label:"Journal Entries",        group:"Journal" },
  { path:"/general-journal-entry",  label:"Create Journal Entry",   group:"Journal" },
  { path:"/view-general-entries",   label:"View Journal Entries",   group:"Journal" },
  { path:"/add-invoice",            label:"Invoice Dashboard",      group:"Invoices" },
  { path:"/add-invoice-sales",      label:"New Sales Invoice",      group:"Invoices" },
  { path:"/view-sales-invoices",    label:"View Sales Invoices",    group:"Invoices" },
  { path:"/add-invoice-purchase",   label:"New Purchase Invoice",   group:"Invoices" },
  { path:"/view-purchase-invoices", label:"View Purchase Invoices", group:"Invoices" },
  { path:"/products",               label:"Products",               group:"Products" },
  { path:"/trialbalance",           label:"Trial Balance",          group:"Reports" },
  { path:"/balancesheet",           label:"Balance Sheet",          group:"Reports" },
  { path:"/incomestatement",        label:"Income Statement",       group:"Reports" },
  { path:"/cashbook",               label:"Cashbook",               group:"Cashbook" },
  { path:"/cashbook-report",        label:"Cashbook Report",        group:"Cashbook" },
  { path:"/employees",              label:"View Employees",         group:"Employees" },
  { path:"/employees/new",          label:"Create Employee",        group:"Employees" },
  { path:"/weight-bridge",          label:"Weight Bridge",          group:"Operations" },
  { path:"/weight-bridge/invoices", label:"WB Invoices",            group:"Operations" },
  { path:"/cheque-book/create",     label:"Create Cheque Book",     group:"Cheques" },
  { path:"/cheque-book/entry",      label:"Issue Cheque",           group:"Cheques" },
  { path:"/cheque-book/view",       label:"View Cheque Books",      group:"Cheques" },
  { path:"/stock",                  label:"Stock Management",       group:"Operations" },
];

// ── Payment plan intervals ────────────────────────────────────────────────────
export const PLAN_TYPES = {
  full:      { label:"Full Payment",    months:0,  description:"One-time full setup fee" },
  quarterly: { label:"Quarterly",       months:3,  description:"Every 3 months" },
  biannual:  { label:"Bi-Annual",       months:6,  description:"Every 6 months" },
  annual:    { label:"Annual",          months:12, description:"Once per year" },
};

// Platform operating expenses (hardcoded as per business)
export const PLATFORM_EXPENSES = {
  monthly: 40763,   // Rs 40,763 / month
  annual:  28720,   // Rs 28,720 / month if on annual plan (Rs 344,640 / year)
};

// ── Dynamic Package schema (admin-created) ────────────────────────────────────
const packageSchema = new mongoose.Schema(
  {
    name:          { type: String, required: true, trim: true },
    tier:          { type: String, default: "CUSTOM", trim: true },
    price:         { type: Number, required: true, min: 0 },   // setup fee
    color:         { type: String, default: "#6366f1" },
    features:      { type: [String], default: [] },
    allowedRoutes: { type: [String], default: [] },
    isActive:      { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ── Invoice schema ─────────────────────────────────────────────────────────────
const millInvoiceSchema = new mongoose.Schema(
  {
    invoiceNo:         { type: String, required: true, unique: true },
    millId:            { type: String, required: true },
    businessName:      { type: String, default: "" },
    ownerName:         { type: String, default: "" },
    ownerEmail:        { type: String, default: "" },
    paymentCategory:   { type: String, default: "other" }, // setup_full | setup_installment | quarterly | biannual | annual | other
    amount:            { type: Number, default: 0 },
    bankName:          { type: String, default: "HBL" },
    transactionId:     { type: String, default: "" },
    notes:             { type: String, default: "" },
    cloudinaryUrl:     { type: String, default: "" },
    cloudinaryPublicId:{ type: String, default: "" },
    emailSent:         { type: Boolean, default: false },
    issuedAt:          { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ── Sub-schemas ───────────────────────────────────────────────────────────────
const paymentRecordSchema = new mongoose.Schema({
  category:        { type: String, default: "other" },
  planType:        { type: String, default: "full" }, // full | quarterly | biannual | annual
  amount:          { type: Number, default: 0 },
  tid:             { type: String, default: "" },
  senderBank:      { type: String, default: "" },
  senderTitle:     { type: String, default: "" },
  senderAccount:   { type: String, default: "" },
  notes:           { type: String, default: "" },
  paidDate:        { type: Date,   default: Date.now },
  recordedAt:      { type: Date,   default: Date.now },
  invoiceNo:       { type: String, default: "" },
  invoiceUrl:      { type: String, default: "" },
}, { _id: true });

const installmentSchema = new mongoose.Schema({
  installmentNumber: Number,
  amount:    Number,
  dueDate:   Date,
  paid:      { type: Boolean, default: false },
  paidDate:  Date,
  tid:       { type: String, default: "" },
  notes:     { type: String, default: "" },
});

const documentSchema = new mongoose.Schema({
  name:     { type: String, default: "" },
  fileUrl:  { type: String, default: "" },
  publicId: { type: String, default: "" },
});

const globalRequestSchema = new mongoose.Schema({
  millId:       { type: String, required: true },
  businessName: String,
  type:         { type: String, enum:["complaint","feedback","deletion_request"], default:"complaint" },
  subject:      { type: String, required: true },
  message:      { type: String, required: true },
  status:       { type: String, enum:["open","in_review","resolved"], default:"open" },
  masterNotes:  { type: String, default: "" },
}, { timestamps: true });

// ── Mill schema ───────────────────────────────────────────────────────────────
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
    adminUsername: { type: String, default: "" },
    adminPassword: { type: String, required: true },
    plainPassword: { type: String, default: "" }, // shown in master portal (only set at creation/reset)

    // Documents
    documents: { type: [documentSchema], default: [] },

    // Status
    approvalStatus: { type: String, enum:["pending","approved","restricted"], default:"pending" },
    isActive:       { type: Boolean, default: false },
    activatedAt:    { type: Date,    default: null },
    createdByMaster:{ type: Boolean, default: false },

    // Package — references dynamic Package document
    packageId:     { type: mongoose.Schema.Types.ObjectId, ref: "Package", default: null },
    plan:          { type: String, default: "custom" },          // legacy / display name
    packagePrice:  { type: Number, default: 0 },
    allowedRoutes: { type: [String], default: [] },

    // Payment plan
    paymentPlanType:  { type: String, enum:["full","quarterly","biannual","annual"], default:"full" },
    installmentTenure:{ type: Number, default: 0 },  // number of installments if quarterly/biannual/annual
    installmentPlan:  { type: [installmentSchema], default: [] },
    nextBillingDate:  { type: Date, default: null },
    lastPaymentDate:  { type: Date, default: null },

    // Payments (unified ledger)
    payments: { type: [paymentRecordSchema], default: [] },

    // Legacy
    paymentProof:   { type: mongoose.Schema.Types.Mixed, default: () => ({}) },
    paymentHistory: { type: [mongoose.Schema.Types.Mixed], default: [] },
    monthlyPayments:{ type: [mongoose.Schema.Types.Mixed], default: [] },

    // Billing
    billingDate:      { type: Date, default: () => new Date(Date.now() + 90 * 86400000) }, // default 3 months
    planExpiry:       { type: Date, default: () => new Date(Date.now() + 90 * 86400000) },
    lastReminderSent: { type: Date, default: null },
  },
  { timestamps: true }
);

export function getMasterModels() {
  const db = mongoose.connection;
  const m = (name, schema) => db.models[name] || db.model(name, schema);
  return {
    Mill:          m("Mill",          millSchema),
    GlobalRequest: m("GlobalRequest", globalRequestSchema),
    Package:       m("Package",       packageSchema),
    MillInvoice:   m("MillInvoice",   millInvoiceSchema),
  };
}