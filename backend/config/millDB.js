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
    isProtected:      { type: Boolean, default: false },  // CASH IN HAND account — cannot be edited or deleted
    isProductAccount: { type: Boolean, default: false },  // auto-created alongside Product — name-only editable
    linkedProductId:  { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: null },
    category:         { type: String, default: "" },   // e.g. "Bank", "Supplier", "Product", "Customer" — display label
    bankLogoIndex:    { type: Number, default: null },  // 1-26 — maps to /1.png ... /26.png in public folder
    remarkNote:       { type: String, default: "" },    // optional memory note e.g. "Ali - Lahore" — shown in dropdowns
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
    meta: { type: mongoose.Schema.Types.Mixed, default: {} },  // stores invoiceType, bags, maund, rate, vehicleNo, invoiceNo
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
// All products are hardcoded via seedProducts(); users only activate/deactivate.
// Activating creates an Inventory account (Assets > Current Assets) for the product.
const productSchema = new mongoose.Schema(
  {
    variety:     { type: String, required: true, trim: true },  // e.g. "Super Kernel Basmati"
    type:        { type: String, required: true,
                   enum: ["Rice", "Broken", "Paddy", "Polish", "Phukar"] },
    subType:     { type: String, default: "",
                   enum: ["", "Brown", "White (Raw)", "White (Double Polish)",
                          "White (Silky-Water Polish)", "Steamed",
                          "Sella (Creamy)", "Sella (Golden)"] },
    productName:     { type: String, default: "", trim: true }, // auto-set: "variety - type - subType"
    isHardcoded:     { type: Boolean, default: true },          // always true — no manual products
    isActive:        { type: Boolean, default: false },         // toggled by user; creates account on activate
    linkedAccountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", default: null },
  },
  { timestamps: true }
);
// Unique per variety + type + subType
productSchema.index({ variety: 1, type: 1, subType: 1 }, { unique: true });

// ── Purchase Invoice ──────────────────────────────────────────────────────────
const rateRowSchema = new mongoose.Schema({
  maund:  { type: Number, default: 0 },
  rate:   { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
}, { _id: false });

const purchaseInvoiceSchema = new mongoose.Schema(
  {
    sr:             { type: Number, required: true, index: true },
    date:           { type: String, required: true },
    vendorName:     { type: String, required: true },
    vendorAccountId:{ type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    vehicleNumber:  { type: String, required: true },
    builtyNumber:   String,
    productId:      { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName:    String,
    bagStatus:      { type: String, enum: ["added","return"], default: "added" },
    quantity:       Number,   // number of bags
    grossWeight:    Number,   // user input kg
    bagTypeId:      { type: mongoose.Schema.Types.ObjectId, ref: "BagType" },
    bagTypeName:    String,
    bagWeightPerBag:Number,   // kg per bag (from BagType)
    totalBagWeight: Number,   // quantity * bagWeightPerBag
    moisturePercent:Number,
    baseMoisture:   Number,   // snapshot from MillSettings
    weightCut:      Number,   // snapshot from MillSettings
    moistureAdjustment: Number,
    moistureOverride:   { type: Boolean, default: false },
    netWeightKg:    Number,
    netWeightMaund: Number,
    rateRows:       { type: [rateRowSchema], default: [] },
    totalAmount:    Number,
    rentAdjustment: Number,
    finalAmount:    Number,
    // Legacy fields kept for old records
    subtractWeight: Number, bagWeight: Number, finalWeight: Number,
    moistureAdjCal: Number, netWeight: Number, netWeight40KG: Number, weightKG: Number,
    rate40kg: Number, amountCal: Number, amount: Number,
  },
  { timestamps: true }
);

// ── Sales Invoice ─────────────────────────────────────────────────────────────
const salesInvoiceSchema = new mongoose.Schema(
  {
    sr:               Number,
    date:             String,
    vehicleNo:        String,
    builtyNo:         String,
    vendorName:       String,
    vendorAccountId:  { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    brokerName:       String,
    productId:        { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName:      String,
    paddyType:        String,
    quantity:         Number,   // bags
    weight:           Number,   // total weight kg
    bagWeight:        Number,   // weight per bag kg (manual input)
    netWeight:        Number,   // weight - (bagWeight * quantity)  ← corrected
    netWeight40:      Number,   // netWeight / 40 (maund, no rounding)
    rate40:           Number,
    amount:           Number,   // netWeight40 * rate40
    sutliSilaiRate:   Number,
    sutliSilaiAmount: Number,   // sutliSilaiRate * quantity
    totalAmount:      Number,   // amount + sutliSilaiAmount
    bardanaRate:      Number,
    bardanaAmount:    Number,   // bardanaRate * quantity
    totalWithBardana: Number,   // totalAmount + bardanaAmount
    brokeryRate:      Number,   // flat rate per maund (not %)
    brokery:          Number,   // netWeight40 * brokeryRate
    totalAmount2:     Number,   // totalWithBardana - brokery
    journalEntryId:   { type: mongoose.Schema.Types.ObjectId, default: null },
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

// ══════════════════════════════════════════════════════════════════════════════
// BagType — admin-defined bag types with weight
// ══════════════════════════════════════════════════════════════════════════════
const bagTypeSchema = new mongoose.Schema(
  {
    bagTypeName:   { type: String, required: true, trim: true },
    bagWeight:     { type: Number, required: true, min: 0 },  // weight per bag in kg
    isActive:      { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ══════════════════════════════════════════════════════════════════════════════
// MillSettings — singleton settings per mill
// baseMoisture: acceptable moisture % (no deduction at or below)
// weightCut: kg to cut per unit above base per bag
// ══════════════════════════════════════════════════════════════════════════════
const millSettingsSchema = new mongoose.Schema(
  {
    baseMoisture: { type: Number, default: 0 },   // e.g. 24
    weightCut:    { type: Number, default: 0 },   // e.g. 0.5 kg per % point per bag
  },
  { timestamps: true }
);

// ══════════════════════════════════════════════════════════════════════════════
// ChequeBook — physical cheque book record
// ══════════════════════════════════════════════════════════════════════════════
const chequeBookSchema = new mongoose.Schema(
  {
    chequeBookId:    { type: String, required: true, unique: true }, // CB-0001
    bankAccountId:   { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    bankAccountName: { type: String, required: true },
    branchName:      { type: String, required: true },
    branchCode:      { type: String, required: true },
    accountNumber:   { type: String, required: true },
    iban:            { type: String, required: true },
    accountTitle:    { type: String, required: true },
    startLeaf:       { type: String, required: true },   // e.g. "00000001"
    endLeaf:         { type: String, required: true },   // e.g. "00000100"
    totalLeaves:     { type: Number, required: true },
    lastIssuedLeaf:  { type: String, default: null },    // last issued cheque no.
    bankLogoIndex:   { type: Number, default: null },   // mirrors the bank account's logo index
    isActive:        { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ══════════════════════════════════════════════════════════════════════════════
// ChequeEntry — individual cheque issued from a cheque book
// ══════════════════════════════════════════════════════════════════════════════
const chequeEntrySchema = new mongoose.Schema(
  {
    chequeBookId:    { type: mongoose.Schema.Types.ObjectId, ref: "ChequeBook", required: true },
    chequeNo:        { type: String, required: true },   // e.g. "00000001"
    date:            { type: Date, required: true },
    payeeAccountId:  { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    payeeAccountName:{ type: String, required: true },
    amount:          { type: Number, required: true },
    amountInWords:   { type: String, required: true },
    bankAccountId:   { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    bankAccountName: { type: String, required: true },
    journalEntryId:  { type: mongoose.Schema.Types.ObjectId, default: null },
    status:          { type: String, enum: ["issued","cleared","bounced"], default: "issued" },
    remarks:         { type: String, default: "" },
    // Snapshot of cheque book details at time of entry
    branchName:      { type: String, default: "" },
    branchCode:      { type: String, default: "" },
    accountNumber:   { type: String, default: "" },
    iban:            { type: String, default: "" },
    accountTitle:    { type: String, default: "" },
    bankLogoIndex:   { type: Number, default: null },  // snapshot from cheque book
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
    ChequeBook:  m("ChequeBook",  chequeBookSchema),
    ChequeEntry: m("ChequeEntry", chequeEntrySchema),
    BagType:     m("BagType",     bagTypeSchema),
    MillSettings:m("MillSettings",millSettingsSchema),
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// ARCHIVE DB FACTORY — ${millId}_archive
// Each season's data is stored in collections like: s001_entries, s001_invoices
// ═══════════════════════════════════════════════════════════════════════════════
export function getArchiveDb(millId) {
  return mongoose.connection.useDb(`${millId}_archive`, { useCache: true });
}