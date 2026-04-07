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
    isProtected:      { type: Boolean, default: false },
    isProductAccount: { type: Boolean, default: false },
    linkedProductId:  { type: mongoose.Schema.Types.ObjectId, ref: "Product",  default: null },
    linkedEmployeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", default: null },
    category:         { type: String, default: "" },
    bankLogoIndex:    { type: Number, default: null },
    remarkNote:       { type: String, default: "" },
    bankName:         { type: String, default: "" },
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
    meta: { type: mongoose.Schema.Types.Mixed, default: {} },
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
    date:          { type: Date, required: true },
    debitAccount:  { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    debitAmount:   Number,
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
    variety:     { type: String, required: true, trim: true },
    type:        { type: String, required: true,
                   enum: ["Rice", "Broken", "Paddy", "Polish", "Phukar"] },
    subType:     { type: String, default: "",
                   enum: ["", "Brown", "White (Raw)", "White (Double Polish)",
                          "White (Silky-Water Polish)", "Steamed",
                          "Sella (Creamy)", "Sella (Golden)"] },
    productName:     { type: String, default: "", trim: true },
    isHardcoded:     { type: Boolean, default: true },
    isActive:        { type: Boolean, default: false },
    linkedAccountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", default: null },
  },
  { timestamps: true }
);
productSchema.index({ variety: 1, type: 1, subType: 1 }, { unique: true });

// ── Purchase Invoice ──────────────────────────────────────────────────────────
const rateRowSchema = new mongoose.Schema({
  maund:  { type: Number, default: 0 },
  rate:   { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
}, { _id: false });

const purchaseInvoiceSchema = new mongoose.Schema(
  {
    sr:              { type: Number, required: true, index: true },
    date:            { type: String, required: true },
    vendorName:      { type: String, required: true },
    vendorAccountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    vehicleNumber:   { type: String, required: true },
    builtyNumber:    String,
    productId:       { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName:     String,
    bagStatus:       { type: String, enum: ["added","return"], default: "added" },
    quantity:        Number,
    grossWeight:     Number,
    bagTypeId:       { type: mongoose.Schema.Types.ObjectId, ref: "BagType" },
    bagTypeName:     String,
    bagWeightPerBag: Number,
    totalBagWeight:  Number,
    moisturePercent: Number,
    baseMoisture:    Number,
    weightCut:       Number,
    moistureAdjustment: Number,
    moistureOverride:   { type: Boolean, default: false },
    netWeightKg:     Number,
    netWeightMaund:  Number,
    rateRows:        { type: [rateRowSchema], default: [] },
    totalAmount:     Number,
    rentAdjustment:  Number,
    finalAmount:     Number,
    subtractWeight: Number, bagWeight: Number, finalWeight: Number,
    moistureAdjCal: Number, netWeight: Number, netWeight40KG: Number, weightKG: Number,
    rate40kg: Number, amountCal: Number, amount: Number,
  },
  { timestamps: true }
);

// ── Sales Invoice ─────────────────────────────────────────────────────────────
const salesInvoiceSchema = new mongoose.Schema(
  {
    sr: Number, date: String, vehicleNo: String, builtyNo: String,
    vendorName: String, vendorAccountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    brokerName: String, productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName: String, paddyType: String,
    quantity: Number, weight: Number, bagWeight: Number,
    netWeight: Number, netWeight40: Number, rate40: Number, amount: Number,
    sutliSilaiRate: Number, sutliSilaiAmount: Number, totalAmount: Number,
    bardanaRate: Number, bardanaAmount: Number, totalWithBardana: Number,
    brokeryRate: Number, brokery: Number, totalAmount2: Number,
    journalEntryId: { type: mongoose.Schema.Types.ObjectId, default: null },
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
    vehicleType:   { type: String, required: true },
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
const documentSubSchema = new mongoose.Schema(
  { name: String, fileUrl: String, publicId: String },
  { _id: false }
);

const employeeSchema = new mongoose.Schema(
  {
    employeeId:    { type: String, unique: true },
    firstName:     { type: String, required: true },
    lastName:      { type: String, required: true },
    cnic:          { type: String, required: true, unique: true },
    address:       String,
    mobile:        String,
    email:         { type: String, required: true, unique: true },
    role:          { type: String, enum: ["Admin","Accountant","Worker","Standard"], required: true },

    // Standard employee — no login, no routes
    isStandard:    { type: Boolean, default: false },
    notes:         { type: String, default: "" },

    allowedRoutes: [String],
    password:      { type: String, default: "" },

    // Profile picture (single Cloudinary URL)
    profilePicUrl: { type: String, default: "" },

    // Three separate document buckets
    professionalDocs: { type: [documentSubSchema], default: [] },  // CV, certificates
    supportingDocs:   { type: [documentSubSchema], default: [] },  // CNIC copy, other
    documents:        { type: [documentSubSchema], default: [] },  // legacy — kept for existing data

    isActive:         { type: Boolean, default: true },

    // Bi-directional link to the auto-created Current Liabilities account
    linkedAccountId:  { type: mongoose.Schema.Types.ObjectId, ref: "Account", default: null },
  },
  { timestamps: true }
);

// ── Vehicle ───────────────────────────────────────────────────────────────────
const vehicleSchema = new mongoose.Schema(
  {
    vehicleType: { type: String, required: true, trim: true },
    rate:        { type: Number, required: true, min: 0 },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ── Season ────────────────────────────────────────────────────────────────────
const seasonSchema = new mongoose.Schema(
  {
    name:          { type: String, default: "", trim: true },
    seasonCode:    { type: String, default: "" },
    startDate:     { type: Date, required: true },
    endDate:       { type: Date, required: true },
    openingBalance:{ type: Number, required: true, default: 0 },
    isActive:      { type: Boolean, default: false },
    journalEntryId:{ type: mongoose.Schema.Types.ObjectId, default: null },
  },
  { timestamps: true }
);

// ── Complaint ─────────────────────────────────────────────────────────────────
const complaintSchema = new mongoose.Schema(
  {
    type:    { type: String, enum: ["complaint","feedback","deletion_request"], default: "complaint" },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status:  { type: String, enum: ["open","in_review","resolved"], default: "open" },
  },
  { timestamps: true }
);

// ── SeasonArchiveMeta ─────────────────────────────────────────────────────────
const seasonArchiveMetaSchema = new mongoose.Schema(
  {
    seasonId:       { type: mongoose.Schema.Types.ObjectId, required: true },
    seasonCode:     { type: String, required: true },
    seasonName:     { type: String, required: true },
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

// ── BagType ───────────────────────────────────────────────────────────────────
const bagTypeSchema = new mongoose.Schema(
  {
    bagTypeName: { type: String, required: true, trim: true },
    bagWeight:   { type: Number, required: true, min: 0 },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ── MillSettings ──────────────────────────────────────────────────────────────
const millSettingsSchema = new mongoose.Schema(
  { baseMoisture: { type: Number, default: 0 }, weightCut: { type: Number, default: 0 } },
  { timestamps: true }
);

// ── PurchaseQuotation ────────────────────────────────────────────────────────────
// Holds partial purchase invoice data while awaiting delivery/weighing confirmation.
// SR is reserved from the shared PurchaseInvoice sequence at creation time,
// so the converted invoice carries the same number — no gaps, no conflicts.
const purchaseQuotationSchema = new mongoose.Schema(
  {
    sr:              { type: Number, required: true, index: true },
    date:            { type: String, default: "" },
    vendorName:      { type: String, default: "" },
    vendorAccountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", default: null },
    vehicleNumber:   { type: String, default: "" },
    builtyNumber:    { type: String, default: "" },
    driverName:      { type: String, default: "" },          // extra field for quotation
    productId:       { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: null },
    productName:     { type: String, default: "" },
    bagStatus:       { type: String, enum: ["added","return"], default: "added" },
    quantity:        { type: Number, default: null },
    grossWeight:     { type: Number, default: null },
    bagTypeId:       { type: mongoose.Schema.Types.ObjectId, ref: "BagType", default: null },
    bagTypeName:     { type: String, default: "" },
    bagWeightPerBag: { type: Number, default: null },
    totalBagWeight:  { type: Number, default: null },
    moisturePercent: { type: Number, default: null },
    baseMoisture:    { type: Number, default: null },
    weightCut:       { type: Number, default: null },
    moistureAdjustment: { type: Number, default: null },
    moistureOverride:   { type: Boolean, default: false },
    netWeightKg:     { type: Number, default: null },
    netWeightMaund:  { type: Number, default: null },
    rateRows:        { type: [rateRowSchema], default: [] },
    totalAmount:     { type: Number, default: null },
    rentAdjustment:  { type: Number, default: null },
    finalAmount:     { type: Number, default: null },
    notes:           { type: String, default: "" },
    status:          { type: String, enum: ["pending"], default: "pending" },
  },
  { timestamps: true }
);

// ── ChequeBook ────────────────────────────────────────────────────────────────
const chequeBookSchema = new mongoose.Schema(
  {
    chequeBookId:    { type: String, required: true, unique: true },
    bankAccountId:   { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    bankAccountName: { type: String, required: true },
    branchName:      { type: String, required: true },
    branchCode:      { type: String, required: true },
    accountNumber:   { type: String, required: true },
    iban:            { type: String, required: true },
    accountTitle:    { type: String, required: true },
    startLeaf:       { type: String, required: true },
    endLeaf:         { type: String, required: true },
    totalLeaves:     { type: Number, required: true },
    lastIssuedLeaf:  { type: String, default: null },
    discardedLeaves: { type: [String], default: [] },
    bankLogoIndex:   { type: Number, default: null },
    isActive:        { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ── ChequeEntry ───────────────────────────────────────────────────────────────
const chequeEntrySchema = new mongoose.Schema(
  {
    chequeBookId:     { type: mongoose.Schema.Types.ObjectId, ref: "ChequeBook", required: true },
    chequeNo:         { type: String, required: true },
    date:             { type: Date, required: true },
    payeeAccountId:   { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    payeeAccountName: { type: String, required: true },
    amount:           { type: Number, required: true },
    amountInWords:    { type: String, required: true },
    bankAccountId:    { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    bankAccountName:  { type: String, required: true },
    journalEntryId:         { type: mongoose.Schema.Types.ObjectId, default: null },
    reversalJournalEntryId: { type: mongoose.Schema.Types.ObjectId, default: null },
    status:                 { type: String, enum: ["pending","cleared","discarded"], default: "pending" },
    isLocked:               { type: Boolean, default: false },
    remarks:     { type: String, default: "" },
    branchName:  { type: String, default: "" },
    branchCode:  { type: String, default: "" },
    accountNumber:{ type: String, default: "" },
    iban:        { type: String, default: "" },
    accountTitle:{ type: String, default: "" },
    bankLogoIndex:{ type: Number, default: null },
  },
  { timestamps: true }
);

// ═══════════════════════════════════════════════════════════════════════════════
// MODEL FACTORY
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
    PurchaseInvoice:        m("PurchaseInvoice",        purchaseInvoiceSchema),
    PurchaseQuotation:      m("PurchaseQuotation",      purchaseQuotationSchema),
    SalesInvoice:        m("SalesInvoice",        salesInvoiceSchema),
    WeightBridge:        m("WeightBridge",        weightBridgeSchema),
    Employee:            m("Employee",            employeeSchema),
    Vehicle:             m("Vehicle",             vehicleSchema),
    Season:              m("Season",              seasonSchema),
    Complaint:           m("Complaint",           complaintSchema),
    SeasonArchiveMeta:   m("SeasonArchiveMeta",   seasonArchiveMetaSchema),
    ChequeBook:          m("ChequeBook",          chequeBookSchema),
    ChequeEntry:         m("ChequeEntry",         chequeEntrySchema),
    BagType:             m("BagType",             bagTypeSchema),
    MillSettings:        m("MillSettings",        millSettingsSchema),
  };
}

export function getArchiveDb(millId) {
  return mongoose.connection.useDb(`${millId}_archive`, { useCache: true });
}