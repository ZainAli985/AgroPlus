// controllers/masterPortalController.js
import bcrypt     from "bcryptjs";
import crypto     from "crypto";
import nodemailer from "nodemailer";
import { getMasterModels } from "../config/masterDB.js";
import { getModels }       from "../config/millDB.js";
import {
  uploadToCloudinary, deleteFromCloudinary,
  extractPublicId, UPLOAD_CONTEXT,
} from "../utils/cloudinaryUpload.js";
import { ensureDefaultAccountsForMill } from "./accountController.js";

// ─── Email transporter (port 465 SSL — Railway compatible) ───────────────────
const transporter = nodemailer.createTransport({
  host:   "smtp.gmail.com",
  port:   465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: (process.env.EMAIL_PASS || "").replace(/\s/g, ""),
  },
  connectionTimeout: 15000,
  greetingTimeout:   10000,
  socketTimeout:     15000,
});

async function sendMail({ to, subject, html }) {
  if (!process.env.EMAIL_USER) return false;
  try {
    await transporter.sendMail({
      from: `"Agro Plus – ORCA TECH" <${process.env.EMAIL_USER}>`,
      to, subject, html,
    });
    console.log(`✅ Email → ${to}: ${subject}`);
    return true;
  } catch (e) {
    console.error(`❌ Email failed → ${to}:`, e.message);
    return false;
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function rawCnic(c) {
  return c.replace(/-/g, "").trim();
}

function toMillId(name) {
  const slug = name.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 40);
  return `mill_${slug}_${crypto.randomBytes(4).toString("hex")}`;
}

// Generate next sequential number (INV-0001, INV-0002, …)
async function nextInvoiceNumber(Invoice) {
  const last = await Invoice.findOne().sort({ createdAt: -1 });
  let n = 1;
  if (last?.invoiceNumber) {
    const num = parseInt(last.invoiceNumber.split("-")[1]);
    if (!isNaN(num)) n = num + 1;
  }
  return `INV-${String(n).padStart(4, "0")}`;
}

// ─── Period label helper ──────────────────────────────────────────────────────
function getPeriodLabel(cycle, dueDate) {
  const d = new Date(dueDate);
  const y = d.getFullYear();
  const m = d.getMonth(); // 0-indexed
  if (cycle === "quarterly") {
    const q = Math.floor(m / 3) + 1;
    return `Q${q} ${y}`;
  }
  if (cycle === "biannual") {
    return m < 6 ? `H1 ${y}` : `H2 ${y}`;
  }
  return `${y}`;
}

// ─── Build payment schedule from registration ─────────────────────────────────
function buildPaymentSchedule(packagePrice, maintenanceQtrly, paymentType, installmentCount, paymentCycle, startDate) {
  const schedule = [];
  const start = new Date(startDate);

  // 1. Setup fee entries
  if (paymentType === "full") {
    schedule.push({
      dueDate:     start,
      amount:      packagePrice,
      category:    "setup",
      cycle:       "full",
      periodLabel: "Setup — Full Payment",
      paid:        false,
    });
  } else {
    const perInstallment = Math.round(packagePrice / installmentCount);
    for (let i = 0; i < installmentCount; i++) {
      const due = new Date(start);
      due.setMonth(due.getMonth() + i);
      const isLast = i === installmentCount - 1;
      schedule.push({
        dueDate:     due,
        amount:      isLast ? packagePrice - perInstallment * (installmentCount - 1) : perInstallment,
        category:    "setup",
        cycle:       "installment",
        periodLabel: `Setup — Installment ${i + 1} of ${installmentCount}`,
        paid:        false,
      });
    }
  }

  // 2. Maintenance schedule — 8 periods into the future
  const cycleMonths = { quarterly: 3, biannual: 6, annual: 12 };
  const months  = cycleMonths[paymentCycle] || 3;
  const maintAmt = maintenanceQtrly * (months / 3);
  for (let i = 1; i <= 8; i++) {
    const due = new Date(start);
    due.setMonth(due.getMonth() + months * i);
    schedule.push({
      dueDate:     due,
      amount:      maintAmt,
      category:    "maintenance",
      cycle:       paymentCycle,
      periodLabel: getPeriodLabel(paymentCycle, due),
      paid:        false,
    });
  }

  return schedule;
}

// ─── Invoice HTML template ────────────────────────────────────────────────────
function generateInvoiceHTML({ invoiceNumber, businessName, ownerName, ownerEmail, amount, category, periodLabel, paidDate, millId }) {
  const categoryLabels = {
    setup_full:               "Package Setup — Full Payment",
    setup_installment:        "Package Setup — Installment",
    maintenance_quarterly:    "Maintenance — Quarterly",
    maintenance_biannual:     "Maintenance — Bi-Annual",
    maintenance_annual:       "Maintenance — Annual",
    other:                    "Payment",
  };
  const catLabel = categoryLabels[category] || category;
  const dateStr  = new Date(paidDate).toLocaleDateString("en-PK", { year:"numeric", month:"long", day:"numeric" });

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/>
<style>
  body { font-family:'Segoe UI',Arial,sans-serif; margin:0; background:#f9fafb; color:#111827; }
  .wrap { max-width:620px; margin:40px auto; background:#fff; border-radius:12px; overflow:hidden; border:1px solid #e5e7eb; box-shadow:0 4px 24px rgba(0,0,0,.07); }
  .hdr  { background:#111827; padding:32px 40px; }
  .hdr h1 { margin:0; color:#fff; font-size:24px; font-weight:800; }
  .hdr p  { margin:4px 0 0; color:rgba(255,255,255,.4); font-size:11px; letter-spacing:.1em; text-transform:uppercase; }
  .body  { padding:32px 40px; }
  .inv-row { display:flex; justify-content:space-between; margin-bottom:24px; }
  .inv-block h3 { margin:0 0 4px; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#9ca3af; }
  .inv-block p  { margin:0; font-size:14px; color:#111827; font-weight:600; }
  .inv-block p.mono { font-family:monospace; font-size:13px; }
  .divider { height:1px; background:#f3f4f6; margin:20px 0; }
  .amount-box { background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:20px 24px; margin:20px 0; display:flex; justify-content:space-between; align-items:center; }
  .amount-box .lbl { font-size:12px; font-weight:700; color:#15803d; text-transform:uppercase; letter-spacing:.08em; }
  .amount-box .amt { font-size:28px; font-weight:800; color:#15803d; font-family:monospace; }
  .detail-table { width:100%; border-collapse:collapse; }
  .detail-table td { padding:9px 12px; font-size:13px; border-bottom:1px solid #f9fafb; }
  .detail-table td:first-child { color:#6b7280; font-weight:500; width:40%; }
  .detail-table td:last-child { color:#111827; font-weight:600; }
  .footer { background:#f9fafb; border-top:1px solid #e5e7eb; padding:16px 40px; text-align:center; font-size:11px; color:#9ca3af; }
</style>
</head>
<body>
<div class="wrap">
  <div class="hdr">
    <h1>Agro Plus</h1>
    <p>ORCA TECH. AND VENTURES · Official Payment Invoice</p>
  </div>
  <div class="body">
    <div class="inv-row">
      <div class="inv-block">
        <h3>Invoice No.</h3>
        <p class="mono">${invoiceNumber}</p>
      </div>
      <div class="inv-block" style="text-align:right">
        <h3>Date</h3>
        <p>${dateStr}</p>
      </div>
    </div>
    <div class="divider"/>
    <div class="inv-row">
      <div class="inv-block">
        <h3>Billed To</h3>
        <p>${businessName}</p>
        <p style="color:#6b7280;font-weight:400;font-size:13px;">${ownerName}</p>
        <p style="color:#6b7280;font-weight:400;font-size:13px;">${ownerEmail}</p>
      </div>
      <div class="inv-block" style="text-align:right">
        <h3>Mill ID</h3>
        <p class="mono" style="font-size:12px">${millId}</p>
      </div>
    </div>
    <div class="amount-box">
      <div>
        <div class="lbl">Amount Paid</div>
        <div style="font-size:13px;color:#15803d;margin-top:4px;">${catLabel} · ${periodLabel || ""}</div>
      </div>
      <div class="amt">Rs ${Number(amount).toLocaleString()}</div>
    </div>
    <table class="detail-table">
      <tr><td>Category</td><td>${catLabel}</td></tr>
      <tr><td>Period</td><td>${periodLabel || "—"}</td></tr>
      <tr><td>Payment Date</td><td>${dateStr}</td></tr>
      <tr><td>Received By</td><td>ORCA TECH. AND VENTURES</td></tr>
      <tr><td>Bank</td><td>HBL — ALI RAZA SALEEM (A/C: 02967901869503)</td></tr>
    </table>
  </div>
  <div class="footer">
    ORCA TECH. AND VENTURES · Agro Plus Platform · © ${new Date().getFullYear()}
    <br/>This is an official receipt for your records.
  </div>
</div>
</body>
</html>`;
}

// ─── Create and store an invoice ─────────────────────────────────────────────
async function createInvoice({ millId, businessName, ownerName, ownerEmail, amount, category, periodLabel, paidDate }) {
  const { Invoice } = getMasterModels();
  const invoiceNumber = await nextInvoiceNumber(Invoice);
  const html = generateInvoiceHTML({ invoiceNumber, millId, businessName, ownerName, ownerEmail, amount, category, periodLabel, paidDate });

  // Upload HTML to Cloudinary as raw file
  let cloudinaryUrl = "", cloudinaryPublicId = "";
  try {
    const buffer = Buffer.from(html, "utf-8");
    const result = await uploadToCloudinary(buffer, UPLOAD_CONTEXT.MASTER_PROOF, null, `invoice_${invoiceNumber}`, { resource_type: "raw" });
    cloudinaryUrl     = result.url;
    cloudinaryPublicId = result.publicId;
  } catch (e) {
    console.error("Invoice Cloudinary upload failed:", e.message);
  }

  const invoice = await Invoice.create({
    invoiceNumber, millId, businessName, ownerName, ownerEmail,
    amount, category, periodLabel, paidDate: new Date(paidDate),
    emailSentTo: ownerEmail, cloudinaryUrl, cloudinaryPublicId,
  });

  // Email invoice to mill owner
  await sendMail({
    to: ownerEmail,
    subject: `Payment Invoice ${invoiceNumber} — ${businessName}`,
    html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <div style="background:#111827;border-radius:10px 10px 0 0;padding:24px 32px;">
          <h2 style="margin:0;color:#fff;font-size:20px;">Payment Invoice</h2>
          <p style="margin:4px 0 0;color:rgba(255,255,255,.4);font-size:11px;letter-spacing:.1em;text-transform:uppercase;">ORCA TECH. AND VENTURES</p>
        </div>
        <div style="background:#fff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 10px 10px;padding:24px 32px;">
          <p style="color:#374151;font-size:14px;line-height:1.7;">Dear <strong>${ownerName}</strong>,</p>
          <p style="color:#374151;font-size:14px;line-height:1.7;">
            This confirms receipt of your payment of <strong style="color:#15803d;">Rs ${Number(amount).toLocaleString()}</strong> for <strong>${businessName}</strong>.
          </p>
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px 20px;margin:16px 0;">
            <table style="width:100%;font-size:13px;border-collapse:collapse;">
              <tr><td style="color:#6b7280;padding:4px 0;width:140px;">Invoice No.</td><td style="color:#111827;font-weight:700;font-family:monospace;">${invoiceNumber}</td></tr>
              <tr><td style="color:#6b7280;padding:4px 0;">Amount</td><td style="color:#15803d;font-weight:700;">Rs ${Number(amount).toLocaleString()}</td></tr>
              <tr><td style="color:#6b7280;padding:4px 0;">Category</td><td style="color:#111827;">${category.replace(/_/g," ")}</td></tr>
              <tr><td style="color:#6b7280;padding:4px 0;">Period</td><td style="color:#111827;">${periodLabel || "—"}</td></tr>
            </table>
          </div>
          ${cloudinaryUrl ? `<p style="color:#374151;font-size:13px;margin-top:16px;">
            <a href="${cloudinaryUrl}" style="color:#1d4ed8;text-decoration:none;font-weight:600;">📄 View / Download Invoice →</a>
          </p>` : ""}
          <p style="color:#9ca3af;font-size:11.5px;margin-top:20px;">Please retain this for your records.</p>
        </div>
        <p style="text-align:center;color:#d1d5db;font-size:11px;margin-top:12px;">ORCA TECH. AND VENTURES · © ${new Date().getFullYear()} Agro Plus</p>
      </div>
    `,
  });

  return { invoiceNumber, invoiceId: invoice._id.toString(), invoiceUrl: cloudinaryUrl };
}

// ═════════════════════════════════════════════════════════════════════════════
// PACKAGE CRUD
// ═════════════════════════════════════════════════════════════════════════════

export const getPackages = async (req, res) => {
  try {
    const { Package } = getMasterModels();
    const pkgs = await Package.find().sort({ createdAt: 1 });
    res.json({ packages: pkgs });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const createPackage = async (req, res) => {
  try {
    const { Package } = getMasterModels();
    const { name, tier, price, maintenanceFee, color, features, allowedRoutes } = req.body;
    if (!name || price === undefined)
      return res.status(400).json({ message: "name and price are required" });
    const pkg = await Package.create({
      name: name.trim(),
      tier: (tier || "CUSTOM").toUpperCase().trim(),
      price: Number(price),
      maintenanceFee: Number(maintenanceFee || 0),
      color: color || "#374151",
      features: Array.isArray(features) ? features.filter(Boolean) : [],
      allowedRoutes: Array.isArray(allowedRoutes) ? allowedRoutes : [],
    });
    res.status(201).json({ message: "Package created", package: pkg });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const updatePackage = async (req, res) => {
  try {
    const { Package } = getMasterModels();
    const { name, tier, price, maintenanceFee, color, features, allowedRoutes, isActive } = req.body;
    const pkg = await Package.findByIdAndUpdate(
      req.params.id,
      {
        name, tier: (tier || "CUSTOM").toUpperCase(),
        price: Number(price), maintenanceFee: Number(maintenanceFee || 0),
        color, features, allowedRoutes,
        ...(isActive !== undefined && { isActive }),
      },
      { new: true }
    );
    if (!pkg) return res.status(404).json({ message: "Package not found" });
    res.json({ message: "Package updated", package: pkg });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const deletePackage = async (req, res) => {
  try {
    const { Package, Mill } = getMasterModels();
    const inUse = await Mill.countDocuments({ packageId: req.params.id });
    if (inUse > 0)
      return res.status(400).json({ message: `Cannot delete — ${inUse} mill(s) use this package` });
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: "Package deleted" });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ═════════════════════════════════════════════════════════════════════════════
// MILLS — LIST / DETAIL
// ═════════════════════════════════════════════════════════════════════════════

export const getAllMills = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const { status, search } = req.query;
    const q = {};
    if (status && status !== "all") q.approvalStatus = status;
    if (search) q.$or = [
      { businessName: { $regex: search, $options: "i" } },
      { ownerName:    { $regex: search, $options: "i" } },
      { email:        { $regex: search, $options: "i" } },
      { millId:       { $regex: search, $options: "i" } },
    ];
    const mills = await Mill.find(q).select("-adminPassword").sort({ createdAt: -1 });
    const stats = {
      total:      await Mill.countDocuments(),
      pending:    await Mill.countDocuments({ approvalStatus: "pending" }),
      approved:   await Mill.countDocuments({ approvalStatus: "approved" }),
      restricted: await Mill.countDocuments({ approvalStatus: "restricted" }),
    };
    res.json({ mills, stats });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const getMillDetails = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const mill = await Mill.findOne({ millId: req.params.millId }).select("-adminPassword");
    if (!mill) return res.status(404).json({ message: "Mill not found." });
    res.json(mill);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ═════════════════════════════════════════════════════════════════════════════
// CREATE MILL
// ═════════════════════════════════════════════════════════════════════════════

export const createMillByMaster = async (req, res) => {
  try {
    const { businessName, ownerName, email, cnic, phone, ntnNumber,
            password, packageId, paymentType, installmentCount, paymentCycle } = req.body;

    if (!businessName || !ownerName || !email || !cnic || !password || !packageId)
      return res.status(400).json({ message: "Required fields missing." });

    const normalizedCnic = rawCnic(cnic);
    if (!/^\d{13}$/.test(normalizedCnic))
      return res.status(400).json({ message: "CNIC must be 13 digits." });
    if (phone && !/^\+923\d{9}$/.test(phone))
      return res.status(400).json({ message: "Phone must be in +923XXXXXXXXX format." });
    if (password.length < 8)
      return res.status(400).json({ message: "Password must be at least 8 characters." });

    const { Mill, Package } = getMasterModels();
    const existing = await Mill.findOne({ $or: [{ email }, { adminCnic: normalizedCnic }] });
    if (existing) return res.status(400).json({ message: "Email or CNIC already registered." });

    const pkg = await Package.findById(packageId);
    if (!pkg || !pkg.isActive) return res.status(400).json({ message: "Invalid or inactive package." });

    let millId; let tries = 0;
    do { millId = toMillId(businessName); } while (await Mill.findOne({ millId }) && ++tries < 10);

    const hashedPwd = await bcrypt.hash(password, 10);

    // Upload logo
    let logoUrl = "";
    if (req.files?.logo?.[0]) {
      try {
        const r = await uploadToCloudinary(req.files.logo[0].buffer, UPLOAD_CONTEXT.MASTER_LOGS, null, `logo_${normalizedCnic}`, { width: 400, crop: "limit" });
        logoUrl = r.url;
      } catch (e) { console.error("Logo upload failed:", e.message); }
    }

    // Upload docs
    const docEntries = [];
    for (const [key, arr] of Object.entries(req.files || {})) {
      if (!key.startsWith("doc_")) continue;
      const f = arr[0];
      try {
        const r = await uploadToCloudinary(f.buffer, UPLOAD_CONTEXT.MASTER_LOGS, null, f.originalname);
        docEntries.push({ name: f.originalname, fileUrl: r.url, publicId: r.publicId });
      } catch (e) { console.error(`Doc upload failed (${f.originalname}):`, e.message); }
    }

    const now      = new Date();
    const instCount = paymentType === "installment" ? Math.max(2, Math.min(Number(installmentCount) || 2, 12)) : 1;
    const cycle     = ["quarterly","biannual","annual"].includes(paymentCycle) ? paymentCycle : "quarterly";

    const paymentSchedule = buildPaymentSchedule(
      pkg.price, pkg.maintenanceQtrly, paymentType, instCount, cycle, now
    );

    // Next billing = first maintenance due date
    const firstMaint = paymentSchedule.find(p => p.category === "maintenance");
    const billingDate = firstMaint ? firstMaint.dueDate : new Date(Date.now() + 90 * 86400000);

    const mill = await Mill.create({
      millId, businessName, ownerName, email,
      cnic: normalizedCnic, adminCnic: normalizedCnic,
      phone: phone || "", ntnNumber: ntnNumber || "",
      logoUrl, adminPassword: hashedPwd,
      documents: docEntries,
      packageId: pkg._id,
      packageName: pkg.name,
      packagePrice: pkg.price,
      paymentType,
      installmentCount: instCount,
      paymentCycle: cycle,
      allowedRoutes: pkg.allowedRoutes,
      paymentSchedule,
      billingDate,
      planExpiry: billingDate,
      firstPaymentReceived: false,
      approvalStatus: "pending",
      isActive: false,
      createdByMaster: true,
      plan: pkg.name,
    });

    // Welcome email
    const cycleLabels = { quarterly:"Quarterly", biannual:"Bi-Annual", annual:"Annual" };
    await sendMail({
      to: email,
      subject: `Welcome to Agro Plus — ${businessName} Account Created`,
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:620px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
          <div style="background:#111827;padding:28px 36px;">
            <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;">Agro Plus</h1>
            <p style="margin:4px 0 0;color:rgba(255,255,255,.4);font-size:11px;letter-spacing:.12em;text-transform:uppercase;">ORCA TECH. AND VENTURES</p>
          </div>
          <div style="padding:28px 36px;">
            <h2 style="color:#111827;margin:0 0 6px;font-size:18px;">Welcome, ${ownerName}! 🎉</h2>
            <p style="color:#6b7280;font-size:14px;line-height:1.7;margin:0 0 20px;">
              Your mill <strong style="color:#111827;">${businessName}</strong> has been registered on Agro Plus.
              Complete your setup payment to activate your account.
            </p>
            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px 20px;margin-bottom:18px;">
              <div style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#059669;margin-bottom:8px;">Login Credentials</div>
              <table style="width:100%;font-size:13px;border-collapse:collapse;">
                <tr><td style="color:#6b7280;padding:4px 0;width:120px;">URL</td><td style="color:#111827;font-weight:700;">${process.env.APP_URL || "https://your-domain.com"}</td></tr>
                <tr><td style="color:#6b7280;padding:4px 0;">CNIC</td><td style="color:#111827;font-weight:700;font-family:monospace;">${normalizedCnic.slice(0,5)}-${normalizedCnic.slice(5,12)}-${normalizedCnic.slice(12)}</td></tr>
                <tr><td style="color:#6b7280;padding:4px 0;">Password</td><td style="color:#dc2626;font-weight:700;font-family:monospace;">${password}</td></tr>
              </table>
              <p style="margin:8px 0 0;font-size:11px;color:#065f46;">⚠ Change your password after first login.</p>
            </div>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 18px;margin-bottom:18px;">
              <div style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6366f1;margin-bottom:8px;">Package — ${pkg.name}</div>
              <table style="width:100%;font-size:13px;border-collapse:collapse;">
                <tr><td style="color:#6b7280;padding:3px 0;width:160px;">Setup Fee</td><td style="color:#111827;font-weight:700;">Rs ${pkg.price.toLocaleString()}</td></tr>
                <tr><td style="color:#6b7280;padding:3px 0;">Payment Type</td><td style="color:#111827;">${paymentType === "full" ? "Full Payment" : `${instCount} Installments`}</td></tr>
                <tr><td style="color:#6b7280;padding:3px 0;">Maintenance</td><td style="color:#111827;">${cycleLabels[cycle]} — Rs ${(pkg.maintenanceQtrly * (cycle === "quarterly" ? 1 : cycle === "biannual" ? 2 : 4)).toLocaleString()}</td></tr>
              </table>
            </div>
            <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px 16px;font-size:13px;color:#991b1b;">
              <strong>Next Step:</strong> Transfer your setup payment to:<br/>
              HBL · Account Title: <strong>ALI RAZA SALEEM</strong> · A/C: <strong>02967901869503</strong>
            </div>
          </div>
          <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:14px 36px;text-align:center;">
            <p style="margin:0;color:#d1d5db;font-size:11px;">ORCA TECH. AND VENTURES · © ${new Date().getFullYear()} Agro Plus</p>
          </div>
        </div>
      `,
    });

    res.status(201).json({ message: `${businessName} registered. Welcome email sent to ${email}.`, millId: mill.millId });
  } catch (e) {
    console.error("createMillByMaster:", e);
    res.status(500).json({ message: e.message });
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// APPROVE / RESTRICT / UNRESTRICT / DELETE
// ═════════════════════════════════════════════════════════════════════════════

export const approveMill = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const mill = await Mill.findOne({ millId: req.params.millId });
    if (!mill) return res.status(404).json({ message: "Mill not found." });
    if (!mill.firstPaymentReceived)
      return res.status(400).json({ message: "Cannot approve — no payment recorded yet. Record the first payment before approving." });

    mill.approvalStatus = "approved";
    mill.isActive       = true;
    mill.activatedAt    = new Date();
    await mill.save();

    try { await ensureDefaultAccountsForMill(mill.millId); } catch (e) { console.warn(e.message); }

    await sendMail({
      to: mill.email,
      subject: `✅ Your Agro Plus account is now ACTIVE — ${mill.businessName}`,
      html: `<div style="font-family:'Segoe UI',Arial,sans-serif;padding:32px;max-width:600px;margin:auto;background:#fff;border-radius:10px;border:1px solid #e5e7eb;">
        <h2 style="color:#059669;margin:0 0 10px;">Your mill is now live, ${mill.ownerName}! 🚀</h2>
        <p style="color:#374151;"><strong>${mill.businessName}</strong> has been activated. Login with your CNIC and password.</p>
        <a href="${process.env.APP_URL || "#"}" style="display:inline-block;background:#111827;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;margin-top:16px;">Go to Dashboard →</a>
      </div>`,
    });

    res.json({ message: `${mill.businessName} approved and activated.` });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const restrictMill = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const mill = await Mill.findOneAndUpdate({ millId: req.params.millId }, { approvalStatus: "restricted", isActive: false }, { new: true });
    if (!mill) return res.status(404).json({ message: "Mill not found." });
    res.json({ message: `${mill.businessName} restricted.` });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const unrestrictMill = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const mill = await Mill.findOneAndUpdate({ millId: req.params.millId }, { approvalStatus: "approved", isActive: true }, { new: true });
    if (!mill) return res.status(404).json({ message: "Mill not found." });
    res.json({ message: `${mill.businessName} restored.` });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const deleteMill = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const mill = await Mill.findOneAndDelete({ millId: req.params.millId });
    if (!mill) return res.status(404).json({ message: "Mill not found." });
    if (mill.logoUrl) deleteFromCloudinary(extractPublicId(mill.logoUrl)).catch(() => {});
    res.json({ message: `${mill.businessName} deleted.` });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ═════════════════════════════════════════════════════════════════════════════
// RESET MILL ADMIN PASSWORD
// ═════════════════════════════════════════════════════════════════════════════

export const resetMillPassword = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 8)
      return res.status(400).json({ message: "Password must be at least 8 characters." });

    const mill = await Mill.findOne({ millId: req.params.millId });
    if (!mill) return res.status(404).json({ message: "Mill not found." });

    mill.adminPassword = await bcrypt.hash(newPassword, 10);
    await mill.save();

    // Email the mill owner with new password
    await sendMail({
      to: mill.email,
      subject: `Password Reset — ${mill.businessName} · Agro Plus`,
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:540px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;">
          <div style="background:#111827;padding:24px 32px;">
            <h2 style="margin:0;color:#fff;font-size:18px;">Password Reset Notification</h2>
            <p style="margin:4px 0 0;color:rgba(255,255,255,.4);font-size:11px;letter-spacing:.1em;text-transform:uppercase;">Agro Plus · ORCA TECH</p>
          </div>
          <div style="padding:24px 32px;">
            <p style="color:#374151;font-size:14px;line-height:1.7;">Hi <strong>${mill.ownerName}</strong>,</p>
            <p style="color:#374151;font-size:14px;line-height:1.7;">
              Your Agro Plus password for <strong>${mill.businessName}</strong> has been reset by your account manager.
            </p>
            <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px 20px;margin:16px 0;">
              <table style="width:100%;font-size:13px;border-collapse:collapse;">
                <tr><td style="color:#6b7280;padding:4px 0;width:120px;">CNIC (Login)</td><td style="color:#111827;font-weight:700;font-family:monospace;">${mill.adminCnic.slice(0,5)}-${mill.adminCnic.slice(5,12)}-${mill.adminCnic.slice(12)}</td></tr>
                <tr><td style="color:#6b7280;padding:4px 0;">New Password</td><td style="color:#dc2626;font-weight:800;font-family:monospace;font-size:15px;">${newPassword}</td></tr>
              </table>
            </div>
            <p style="color:#9ca3af;font-size:12px;margin-top:12px;">
              Please log in and change your password immediately from your Profile settings.
            </p>
          </div>
          <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:12px 32px;text-align:center;">
            <p style="margin:0;color:#d1d5db;font-size:11px;">ORCA TECH. AND VENTURES · © ${new Date().getFullYear()} Agro Plus</p>
          </div>
        </div>
      `,
    });

    res.json({ message: `Password reset successfully. Email sent to ${mill.email}.` });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ═════════════════════════════════════════════════════════════════════════════
// RECORD PAYMENT (with invoice generation)
// ═════════════════════════════════════════════════════════════════════════════

export const recordPayment = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const { millId } = req.params;
    const {
      category, amount, tid, notes, paidDate,
      senderBank, senderTitle, senderAccount, periodLabel,
      scheduleItemId,
    } = req.body;

    const mill = await Mill.findOne({ millId });
    if (!mill) return res.status(404).json({ message: "Mill not found." });

    const paidAmt  = Number(amount);
    if (!paidAmt || paidAmt <= 0) return res.status(400).json({ message: "Invalid amount." });
    if (!tid?.trim())              return res.status(400).json({ message: "Transaction ID is required." });

    const recordDate = paidDate ? new Date(paidDate) : new Date();

    // Generate invoice
    const { invoiceNumber, invoiceId, invoiceUrl } = await createInvoice({
      millId,
      businessName: mill.businessName,
      ownerName:    mill.ownerName,
      ownerEmail:   mill.email,
      amount:       paidAmt,
      category:     category || "other",
      periodLabel:  periodLabel || "",
      paidDate:     recordDate,
    });

    // Add to payments array
    mill.payments.push({
      category:      category || "other",
      amount:        paidAmt,
      tid:           tid.trim(),
      senderBank:    senderBank || "HBL",
      senderTitle:   senderTitle || "",
      senderAccount: senderAccount || "",
      receivingBank: "HBL",
      notes:         notes || "",
      periodLabel:   periodLabel || "",
      paidDate:      recordDate,
      recordedAt:    new Date(),
      invoiceId,
      invoiceUrl,
    });

    // Mark schedule item as paid if scheduleItemId provided
    if (scheduleItemId) {
      const item = mill.paymentSchedule.id(scheduleItemId);
      if (item) {
        item.paid      = true;
        item.paidDate  = recordDate;
        item.invoiceId = invoiceId;
        item.invoiceUrl= invoiceUrl;
      }
    } else {
      // Auto-match: find first unpaid schedule item in that category
      const unpaid = mill.paymentSchedule.find(
        s => !s.paid && (
          (category?.includes("setup") && s.category === "setup") ||
          (category?.includes("maintenance") && s.category === "maintenance") ||
          !category
        )
      );
      if (unpaid) {
        unpaid.paid      = true;
        unpaid.paidDate  = recordDate;
        unpaid.invoiceId = invoiceId;
        unpaid.invoiceUrl= invoiceUrl;
      }
    }

    // Mark first payment received gate
    if (!mill.firstPaymentReceived) {
      mill.firstPaymentReceived = true;
    }

    // Update next billing date to next unpaid maintenance due date
    const nextMaint = mill.paymentSchedule.find(s => !s.paid && s.category === "maintenance");
    if (nextMaint) {
      mill.billingDate = nextMaint.dueDate;
      mill.planExpiry  = nextMaint.dueDate;
    }

    await mill.save();

    res.json({
      message: `Payment recorded. Invoice ${invoiceNumber} generated and emailed to ${mill.email}.`,
      invoiceNumber, invoiceUrl,
      mill: { payments: mill.payments, paymentSchedule: mill.paymentSchedule, firstPaymentReceived: mill.firstPaymentReceived },
    });
  } catch (e) {
    console.error("recordPayment:", e);
    res.status(500).json({ message: e.message });
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// ANALYTICS
// ═════════════════════════════════════════════════════════════════════════════
// Monthly operating expenses (post-release):
//   - Monthly billing cycle: Rs 40,763
//   - Annual billing plan: Rs 28,720
const MONTHLY_EXPENSE = 40763;

export const getAnalytics = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const { from, to } = req.query;
    const fromDate = from ? new Date(from) : new Date(Date.now() - 365 * 86400000);
    const toDate   = to   ? new Date(to)   : new Date();
    toDate.setHours(23, 59, 59, 999);

    const allMills = await Mill.find({ approvalStatus: { $ne: "deleted" } }).select("-adminPassword");

    // Collect all payments within date range
    const paymentsInRange = [];
    allMills.forEach(mill => {
      (mill.payments || []).forEach(p => {
        const pd = new Date(p.paidDate || p.recordedAt);
        if (pd >= fromDate && pd <= toDate) {
          paymentsInRange.push({ ...p.toObject(), millName: mill.businessName, millId: mill.millId });
        }
      });
    });

    // Revenue totals
    const totalRevenue = paymentsInRange.reduce((s, p) => s + (p.amount || 0), 0);
    const revenueByCategory = {};
    paymentsInRange.forEach(p => {
      const cat = p.category || "other";
      revenueByCategory[cat] = (revenueByCategory[cat] || 0) + (p.amount || 0);
    });

    // Expenses for the date range
    const months = Math.max(1, Math.round((toDate - fromDate) / (30 * 86400000)));
    const totalExpenses = MONTHLY_EXPENSE * months;
    const profit = totalRevenue - totalExpenses;

    // Overdue/owed payments
    const now = new Date();
    const overdueItems = [];
    let totalOwed = 0;
    allMills.forEach(mill => {
      (mill.paymentSchedule || []).forEach(s => {
        if (!s.paid && new Date(s.dueDate) < now) {
          const daysLate = Math.floor((now - new Date(s.dueDate)) / 86400000);
          overdueItems.push({
            millId:       mill.millId,
            businessName: mill.businessName,
            ownerName:    mill.ownerName,
            email:        mill.email,
            amount:       s.amount,
            dueDate:      s.dueDate,
            category:     s.category,
            periodLabel:  s.periodLabel,
            daysLate,
          });
          totalOwed += s.amount;
        }
      });
    });
    overdueItems.sort((a, b) => b.daysLate - a.daysLate);

    // Active mills count
    const activeMills = allMills.filter(m => m.approvalStatus === "approved").length;

    // Payment timeline (group by month)
    const timeline = {};
    paymentsInRange.forEach(p => {
      const key = new Date(p.paidDate).toLocaleDateString("en-PK", { month:"short", year:"numeric" });
      timeline[key] = (timeline[key] || 0) + (p.amount || 0);
    });

    // Mills still owe (has unpaid overdue)
    const millsOwing = [...new Set(overdueItems.map(o => o.millId))].length;

    res.json({
      summary: {
        totalRevenue,
        totalExpenses,
        profit,
        profitMargin: totalRevenue > 0 ? ((profit / totalRevenue) * 100).toFixed(1) : 0,
        totalOwed,
        activeMills,
        millsOwing,
        paymentsCount: paymentsInRange.length,
      },
      revenueByCategory,
      overdueItems: overdueItems.slice(0, 50),
      timeline,
      expenses: { monthly: MONTHLY_EXPENSE, forPeriod: totalExpenses, months },
    });
  } catch (e) {
    console.error("getAnalytics:", e);
    res.status(500).json({ message: e.message });
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// INVOICES
// ═════════════════════════════════════════════════════════════════════════════

export const getInvoices = async (req, res) => {
  try {
    const { Invoice } = getMasterModels();
    const { millId } = req.query;
    const q = millId ? { millId } : {};
    const invoices = await Invoice.find(q).sort({ createdAt: -1 }).limit(200);
    res.json({ invoices });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ═════════════════════════════════════════════════════════════════════════════
// BILLING DATE
// ═════════════════════════════════════════════════════════════════════════════

export const updateBillingDate = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const { billingDate } = req.body;
    if (!billingDate) return res.status(400).json({ message: "billingDate required." });
    const mill = await Mill.findOneAndUpdate(
      { millId: req.params.millId },
      { billingDate: new Date(billingDate), planExpiry: new Date(billingDate) },
      { new: true }
    );
    if (!mill) return res.status(404).json({ message: "Mill not found." });
    res.json({ message: "Billing date updated.", billingDate: mill.billingDate });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ═════════════════════════════════════════════════════════════════════════════
// SEND BILLING REMINDERS
// ═════════════════════════════════════════════════════════════════════════════

export const sendBillingReminders = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const now  = new Date();
    const in7  = new Date(now.getTime() + 7 * 86400000);
    const mills = await Mill.find({ approvalStatus: "approved", isActive: true });
    let sent = 0;

    for (const mill of mills) {
      const upcoming = (mill.paymentSchedule || []).find(
        s => !s.paid && new Date(s.dueDate) <= in7 && new Date(s.dueDate) >= now
      );
      if (!upcoming) continue;
      const yesterday = new Date(now.getTime() - 86400000);
      if (mill.lastReminderSent && mill.lastReminderSent > yesterday) continue;

      const daysUntil = Math.ceil((new Date(upcoming.dueDate) - now) / 86400000);
      await sendMail({
        to: mill.email,
        subject: `Payment Due in ${daysUntil} Day${daysUntil !== 1 ? "s" : ""} — ${mill.businessName}`,
        html: `<div style="font-family:'Segoe UI',Arial,sans-serif;padding:28px;max-width:560px;margin:auto;border:1px solid #e5e7eb;border-radius:10px;">
          <h3 style="color:#d97706;margin:0 0 10px;">⏰ Payment Reminder</h3>
          <p style="color:#374151;">Hi <strong>${mill.ownerName}</strong>, your payment of <strong>Rs ${upcoming.amount.toLocaleString()}</strong> (${upcoming.periodLabel || upcoming.category}) is due in ${daysUntil} day${daysUntil !== 1 ? "s" : ""}.</p>
          <p style="color:#374151;">Transfer to: <strong>HBL — ALI RAZA SALEEM — A/C: 02967901869503</strong></p>
        </div>`,
      });
      mill.lastReminderSent = now;
      await mill.save();
      sent++;
    }
    res.json({ message: `${sent} reminder(s) sent.`, sent });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ═════════════════════════════════════════════════════════════════════════════
// SUPPORT REQUESTS
// ═════════════════════════════════════════════════════════════════════════════

export const getSupportRequests = async (req, res) => {
  try {
    const { GlobalRequest } = getMasterModels();
    const { type, status } = req.query;
    const q = {};
    if (type   && type   !== "all") q.type   = type;
    if (status && status !== "all") q.status = status;
    const requests = await GlobalRequest.find(q).sort({ createdAt: -1 });
    const stats = {
      complaints: await GlobalRequest.countDocuments({ type: "complaint" }),
      feedback:   await GlobalRequest.countDocuments({ type: "feedback" }),
      deletions:  await GlobalRequest.countDocuments({ type: "deletion_request" }),
      open:       await GlobalRequest.countDocuments({ status: "open" }),
    };
    res.json({ requests, stats });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const updateSupportRequest = async (req, res) => {
  try {
    const { GlobalRequest } = getMasterModels();
    const { status, masterNotes } = req.body;
    const r = await GlobalRequest.findByIdAndUpdate(req.params.requestId, { status, masterNotes }, { new: true });
    if (!r) return res.status(404).json({ message: "Request not found." });
    res.json({ message: "Updated.", request: r });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
export const deleteSupportRequest = async (req, res) => {
  try {
    const { GlobalRequest } = getMasterModels();
    await GlobalRequest.findByIdAndDelete(req.params.requestId);
    res.json({ message: "Request deleted." });
  } catch (e) { res.status(500).json({ message: e.message }); }
};