// config/millDB.js
import mongoose from "mongoose";

// ── Account ───────────────────────────────────────────────────────────────────
const accountSchema = new mongoose.Schema(
  {
    autoAccountId:   { type: String, required: true, unique: true },
    manualAccountId: { type: String, default: "" },
    accountType: {
      type: String, required: true,
      enum: ["Assets", "Liabilities", "Equity", "Revenue", "Expense"],
    },
    subAccountType: {
      type: String, required: true,
      enum: [
        "Current Assets", "Fixed Assets", "Current Liabilities", "Fixed Liabilities",
        "Equity", "Shareholders Account", "Expense", "Owner's Capital",
        "Expenses", "Revenue", "Contra Revenue",
      ],
    },
    accountName:  { type: String, required: true, trim: true },
    LedgerRef:    { type: String, default: "" },
    starred:      { type: Boolean, default: false },
    isProtected:  { type: Boolean, default: false },  // CASH IN HAND account — cannot be edited or deleted
    totalDebit:   { type: Number, default: 0 },
    totalCredit:  { type: Number, default: 0 },
    balance:      { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ── General Journal ───────────────────────────────────────────────────────────
const creditEntrySchema = new mongoose.Schema({
  account:     { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
  amount:      { type: Number, required: true, min: 0 },
  description: { type: String, default: "", required: true },
});

const generalJournalEntrySchema = new mongoose.Schema(
  {
    entryDate:     { type: Date, required: true },
    comments:      { type: String, trim: true, default: "" },
    debitAccount:  { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    debitAmount:   { type: Number, required: true, min: 0 },
    debitLineDesc: { type: String, default: "", required: true },
    creditEntries: {
      type: [creditEntrySchema],
      validate: [{ validator: (arr) => arr.length > 0, message: "At least one credit entry required." }],
    },
    totalCredit: { type: Number, required: true, default: 0 },
    isBalanced:  { type: Boolean, default: false },
  },
  { timestamps: true }
);
generalJournalEntrySchema.pre("save", function (next) {
  this.totalCredit = this.creditEntries.reduce((s, c) => s + c.amount, 0);
  this.isBalanced  = this.debitAmount === this.totalCredit;
  if (!this.isBalanced) return next(new Error("Debit and Credit totals must be equal."));
  next();
});

// ── Cashbook ──────────────────────────────────────────────────────────────────
const cashbookSchema = new mongoose.Schema({
  year:           { type: Number, required: true, unique: true },
  openingBalance: { type: Number, required: true },
  entries: [{
    date:         { type: Date, required: true },
    debitAccount: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    debitAmount:  Number,
    creditEntries: [{
      account:     { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
      amount:      Number,
      description: String,
    }],
    comment: String,
  }],
});

// ── Product ───────────────────────────────────────────────────────────────────
const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, trim: true },
    type:    { type: String, required: true, enum: ["Peddy", "Rice", "Broken Rice", "Polish", "Phukar"] },
    subType: { type: String, required: false, default: "", enum: ["", "Brown", "White", "Steamed", "Sella"] },
  },
  { timestamps: true }
);

// ── Purchase Invoice ──────────────────────────────────────────────────────────
const purchaseInvoiceSchema = new mongoose.Schema(
  {
    sr: { type: Number, required: true, index: true },
    date: { type: String, required: true },
    vendorName: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    builtyNumber: String,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName: String,
    quantity: Number, subtractWeight: Number, bagWeight: Number, finalWeight: Number,
    moisturePercent: Number, moistureAdjCal: Number, moistureAdjustment: Number,
    netWeightCal: Number, netWeight: Number, netWeight40KG: Number, weightKG: Number,
    rate40kg: Number, amountCal: Number, amount: Number, rentAdjustment: Number,
  },
  { timestamps: true }
);

// ── Sales Invoice ─────────────────────────────────────────────────────────────
const salesInvoiceSchema = new mongoose.Schema(
  {
    sr: Number, date: String, vehicleNo: String, builtyNo: String,
    vendorName: String, brokerName: String,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName: String, paddyType: String,
    quantity: Number, weight: Number, bagWeight: Number, netWeight: Number,
    netWeight40: Number, rate40: Number, amount: Number,
    sutliSilaiRate: Number, sutliSilaiAmount: Number, totalAmount: Number,
    brokeryRate: Number, brokery: Number, totalAmount2: Number,
  },
  { timestamps: true }
);

// ── Weight Bridge ─────────────────────────────────────────────────────────────
const weightBridgeSchema = new mongoose.Schema(
  {
    invoiceCode:   { type: String, required: true, unique: true },
    date:          { type: Date, required: true, default: Date.now },
    productId:     { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    productName:   String,
    vendorName:    { type: String, required: true },
    vehicleNumber: { type: String, default: "" },
    rate:          { type: Number, required: true },
    vehicleType:   { type: String, required: true }, // no enum — admin defines types
    firstWeight:           { type: Number, required: true },
    firstWeightWithDriver: { type: Boolean, default: false },
    firstWeightTime:       { type: Date, default: Date.now },
    secondWeight: Number, secondWeightWithDriver: Boolean, secondWeightTime: Date,
    netWeight: Number, netWeightMaund: Number, netWeightTon: Number,
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ── Employee ──────────────────────────────────────────────────────────────────
const documentSubSchema  = new mongoose.Schema({ name: String, fileUrl: String });
const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, unique: true },
    firstName:  { type: String, required: true },
    lastName:   { type: String, required: true },
    cnic:       { type: String, required: true, unique: true },
    address:    String,
    mobile:     String,
    email:      { type: String, required: true, unique: true },
    role:       { type: String, enum: ["Admin", "Accountant", "Worker"], required: true },
    allowedRoutes: [String],
    password:   { type: String, required: true },
    documents:  [documentSubSchema],
    isActive:   { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ══════════════════════════════════════════════════════════════════════════════
// NEW: Vehicle (custom per-mill — replaces hardcoded RATE_MAP in weight bridge)
// ══════════════════════════════════════════════════════════════════════════════
const vehicleSchema = new mongoose.Schema(
  {
    vehicleType: { type: String, required: true, trim: true },
    rate:        { type: Number, required: true, min: 0 },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ══════════════════════════════════════════════════════════════════════════════
// NEW: Season — admin-defined date range + opening cash balance
//  isActive = only one season active at a time
//  openingBalance = cash in hand at start of season
//  cashAccountId / openingBalanceAccountId — saved once, reused by cashbook
// ══════════════════════════════════════════════════════════════════════════════
const seasonSchema = new mongoose.Schema(
  {
    name:          { type: String, default: "", trim: true },  // auto-generated like "S-001"
    seasonCode:    { type: String, default: "" },              // "001", "002", …
    startDate:     { type: Date, required: true },
    endDate:       { type: Date, required: true },
    openingBalance:{ type: Number, required: true, default: 0 },
    isActive:      { type: Boolean, default: false },
    journalEntryId:{ type: mongoose.Schema.Types.ObjectId, default: null },
  },
  { timestamps: true }
);

// ══════════════════════════════════════════════════════════════════════════════
// NEW: Complaint / Feedback / Deletion request
// ══════════════════════════════════════════════════════════════════════════════
const complaintSchema = new mongoose.Schema(
  {
    type:    { type: String, enum: ["complaint", "feedback", "deletion_request"], default: "complaint" },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status:  { type: String, enum: ["open", "in_review", "resolved"], default: "open" },
  },
  { timestamps: true }
);

// ══════════════════════════════════════════════════════════════════════════════
// SeasonArchive — snapshot of all live data at end of each season
// Stored in a SEPARATE DB: `${millId}_archive`
// Collections are prefixed with the season code, e.g. s001_entries
// ══════════════════════════════════════════════════════════════════════════════
const seasonArchiveMetaSchema = new mongoose.Schema(
  {
    seasonId:       { type: mongoose.Schema.Types.ObjectId, required: true },
    seasonCode:     { type: String, required: true },           // "001"
    seasonName:     { type: String, required: true },           // "S-001"
    startDate:      { type: Date, required: true },
    endDate:        { type: Date, required: true },
    archivedAt:     { type: Date, default: Date.now },
    entryCount:     { type: Number, default: 0 },
    invoiceCount:   { type: Number, default: 0 },
    accountSnapshot:{ type: mongoose.Schema.Types.Mixed, default: {} },
    cashInHandClosingBalance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ═══════════════════════════════════════════════════════════════════════════════
// MODEL FACTORY — live mill DB
// ═══════════════════════════════════════════════════════════════════════════════
export function getModels(millId) {
  if (!millId) throw new Error("millId is required");
  const db = mongoose.connection.useDb(millId, { useCache: true });
  const m  = (name, schema) => db.models[name] || db.model(name, schema);
  return {
    Account:             m("Account",             accountSchema),
    GeneralJournalEntry: m("GeneralJournalEntry", generalJournalEntrySchema),
    Cashbook:            m("Cashbook",            cashbookSchema),
    Product:             m("Product",             productSchema),
    PurchaseInvoice:     m("PurchaseInvoice",     purchaseInvoiceSchema),
    SalesInvoice:        m("SalesInvoice",        salesInvoiceSchema),
    WeightBridge:        m("WeightBridge",        weightBridgeSchema),
    Employee:            m("Employee",            employeeSchema),
    Vehicle:    m("Vehicle",    vehicleSchema),
    Season:     m("Season",     seasonSchema),
    Complaint:  m("Complaint",  complaintSchema),
    SeasonArchiveMeta: m("SeasonArchiveMeta", seasonArchiveMetaSchema),
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// ARCHIVE DB FACTORY — ${millId}_archive
// Each season's data is stored in collections like: s001_entries, s001_invoices
// ═══════════════════════════════════════════════════════════════════════════════
export function getArchiveDb(millId) {
  return mongoose.connection.useDb(`${millId}_archive`, { useCache: true });
}