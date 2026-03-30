// controllers/masterPortalController.js
import bcrypt     from "bcryptjs";
import crypto     from "crypto";
import nodemailer from "nodemailer";
import { getMasterModels, ALL_ROUTES, PLAN_TYPES } from "../config/masterDB.js";
import { getModels }   from "../config/millDB.js";
import {
  uploadToCloudinary, deleteFromCloudinary,
  extractPublicId, UPLOAD_CONTEXT,
} from "../utils/cloudinaryUpload.js";
import { ensureDefaultAccountsForMill } from "./accountController.js";

// ── Email transporter (port 465 / SSL — works on Railway) ────────────────────
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

async function safeMail(opts) {
  try {
    await transporter.sendMail({ from: `"Agro Plus" <${process.env.EMAIL_USER}>`, ...opts });
    return true;
  } catch (e) {
    console.error("Email failed:", e.message);
    return false;
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function rawCnic(c)    { return c.replace(/-/g,"").trim(); }
function toMillId(name) {
  const slug = name.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").slice(0,40);
  return `mill_${slug}_${crypto.randomBytes(4).toString("hex")}`;
}

function fmtCnic(c) {
  const d = c.replace(/\D/g,"").slice(0,13);
  if (d.length<=5)  return d;
  if (d.length<=12) return `${d.slice(0,5)}-${d.slice(5)}`;
  return `${d.slice(0,5)}-${d.slice(5,12)}-${d.slice(12)}`;
}

function buildInstallmentSchedule(price, planType, startDate) {
  const months = PLAN_TYPES[planType]?.months || 3;
  const count  = Math.round(12 / months); // installments per year
  return Array.from({ length: count }, (_, i) => {
    const due = new Date(startDate);
    due.setMonth(due.getMonth() + months * i);
    const isLast = i === count - 1;
    const perAmt = Math.round(price / count);
    return {
      installmentNumber: i + 1,
      amount: isLast ? price - perAmt * (count - 1) : perAmt,
      dueDate: due,
      paid: false,
    };
  });
}

function calcNextBillingDate(planType, fromDate = new Date()) {
  const months = PLAN_TYPES[planType]?.months || 3;
  if (months === 0) return null; // full payment — no recurrence
  const d = new Date(fromDate);
  d.setMonth(d.getMonth() + months);
  return d;
}

// ── Invoice HTML generator ────────────────────────────────────────────────────
function buildInvoiceHtml(data) {
  const { invoiceNo, businessName, ownerName, ownerEmail, amount, paymentCategory,
          transactionId, bankName, paidDate, issuedAt } = data;
  const fmt = d => d ? new Date(d).toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"}) : "—";
  const catLabel = {
    setup_full:         "Package Setup — Full Payment",
    setup_installment:  "Package Setup — Installment",
    quarterly:          "Quarterly Maintenance",
    biannual:           "Bi-Annual Maintenance",
    annual:             "Annual Maintenance",
    other:              "Payment",
  }[paymentCategory] || paymentCategory;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:'Segoe UI',Arial,sans-serif;background:#f9fafb;color:#111827;}
  .wrap{max-width:680px;margin:32px auto;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;}
  .hdr{background:#111827;padding:28px 32px;display:flex;align-items:center;justify-content:space-between;}
  .brand{font-size:22px;font-weight:800;color:#fff;}
  .brand span{color:#4ade80;}
  .inv-lbl{font-size:11px;color:rgba(255,255,255,.4);letter-spacing:.1em;text-transform:uppercase;margin-top:2px;}
  .inv-no{font-size:18px;font-weight:700;color:#4ade80;font-family:monospace;}
  .body{padding:28px 32px;}
  .accent{height:3px;background:linear-gradient(90deg,#4ade80,#22c55e);}
  .row{display:flex;gap:24px;margin-bottom:22px;}
  .col{flex:1;}
  .lbl{font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#9ca3af;margin-bottom:4px;}
  .val{font-size:14px;color:#111827;font-weight:500;}
  .val.mono{font-family:monospace;font-size:13px;}
  .divider{height:1px;background:#f3f4f6;margin:18px 0;}
  .amount-row{display:flex;justify-content:space-between;align-items:center;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px 20px;}
  .amt-lbl{font-size:11px;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:.08em;}
  .amt-val{font-size:26px;font-weight:800;color:#15803d;font-family:monospace;}
  .footer{padding:16px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;font-size:11px;color:#9ca3af;}
  .status{display:inline-block;background:#f0fdf4;color:#15803d;border:1px solid #bbf7d0;border-radius:4px;padding:2px 10px;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;font-family:monospace;}
</style>
</head>
<body>
<div class="wrap">
  <div class="hdr">
    <div><div class="brand">Agro<span>Plus</span></div><div class="inv-lbl">ORCA TECH. AND VENTURES</div></div>
    <div style="text-align:right"><div class="inv-lbl">Invoice</div><div class="inv-no">${invoiceNo}</div></div>
  </div>
  <div class="accent"></div>
  <div class="body">
    <div class="row">
      <div class="col"><div class="lbl">Billed To</div><div class="val">${businessName}</div><div style="font-size:12px;color:#6b7280;margin-top:2px;">${ownerName}</div><div style="font-size:12px;color:#6b7280;">${ownerEmail}</div></div>
      <div class="col" style="text-align:right">
        <div class="lbl">Date Issued</div><div class="val">${fmt(issuedAt)}</div>
        <div class="lbl" style="margin-top:10px">Payment Date</div><div class="val">${fmt(paidDate)}</div>
        <div style="margin-top:8px"><span class="status">PAID</span></div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="row">
      <div class="col"><div class="lbl">Service</div><div class="val">${catLabel}</div></div>
      <div class="col"><div class="lbl">Transaction ID</div><div class="val mono">${transactionId || "—"}</div></div>
    </div>
    <div class="row">
      <div class="col"><div class="lbl">Received By</div><div class="val">ALI RAZA SALEEM</div><div style="font-size:12px;color:#6b7280;">${bankName} — A/C: 02967901869503</div></div>
    </div>
    <div class="divider"></div>
    <div class="amount-row">
      <div class="amt-lbl">Total Amount Paid</div>
      <div class="amt-val">Rs ${Number(amount||0).toLocaleString()}</div>
    </div>
  </div>
  <div class="footer">This is a computer-generated invoice. For queries contact ${process.env.EMAIL_USER || "support@agroplus.pk"}<br/>© ${new Date().getFullYear()} Agro Plus · ORCA TECH. AND VENTURES</div>
</div>
</body>
</html>`;
}

// ── Generate invoice number ───────────────────────────────────────────────────
async function nextInvoiceNo() {
  const { MillInvoice } = getMasterModels();
  const count = await MillInvoice.countDocuments();
  const yr    = new Date().getFullYear();
  return `INV-${yr}-${String(count + 1).padStart(4,"0")}`;
}

// ── Create invoice, upload to Cloudinary, email to owner ─────────────────────
async function createAndSendInvoice(mill, paymentData) {
  const { MillInvoice } = getMasterModels();
  const invoiceNo = await nextInvoiceNo();
  const html      = buildInvoiceHtml({
    invoiceNo, businessName: mill.businessName, ownerName: mill.ownerName,
    ownerEmail: mill.email, ...paymentData,
  });

  let cloudinaryUrl = "", cloudinaryPublicId = "";
  try {
    const buf    = Buffer.from(html);
    const result = await uploadToCloudinary(buf, UPLOAD_CONTEXT.MASTER_LOGS, null, `invoice_${invoiceNo}`, { resource_type:"raw" });
    cloudinaryUrl      = result.url;
    cloudinaryPublicId = result.publicId;
  } catch (e) {
    console.warn("Invoice Cloudinary upload failed:", e.message);
  }

  const inv = await MillInvoice.create({
    invoiceNo, millId: mill.millId, businessName: mill.businessName,
    ownerName: mill.ownerName, ownerEmail: mill.email,
    paymentCategory: paymentData.paymentCategory,
    amount: paymentData.amount, bankName: "HBL",
    transactionId: paymentData.transactionId || "",
    notes: paymentData.notes || "",
    cloudinaryUrl, cloudinaryPublicId,
    issuedAt: new Date(),
  });

  // Send invoice email
  const emailSent = await safeMail({
    to: mill.email,
    subject: `Payment Invoice ${invoiceNo} — Agro Plus`,
    html: html + `
      <div style="font-family:sans-serif;max-width:680px;margin:12px auto;padding:12px 16px;background:#fffbeb;border-radius:6px;border:1px solid #fde68a;font-size:12.5px;color:#92400e;">
        📎 Invoice <strong>${invoiceNo}</strong> for Rs ${Number(paymentData.amount||0).toLocaleString()} has been recorded.
        ${cloudinaryUrl ? `<br/><a href="${cloudinaryUrl}" style="color:#d97706;">Download Invoice →</a>` : ""}
      </div>
    `,
  });

  await MillInvoice.findByIdAndUpdate(inv._id, { emailSent });
  return { invoiceNo, cloudinaryUrl };
}

// ═══════════════════════════════════════════════════════════════════
// PACKAGES
// ═══════════════════════════════════════════════════════════════════

export const getPackages = async (req, res) => {
  try {
    const { Package } = getMasterModels();
    const pkgs = await Package.find({ isActive: true }).sort({ price: 1 });
    res.json({ packages: pkgs });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const createPackage = async (req, res) => {
  try {
    const { Package } = getMasterModels();
    const { name, tier, price, color, features, allowedRoutes } = req.body;
    if (!name?.trim() || !price) return res.status(400).json({ message: "name and price are required." });
    const pkg = await Package.create({
      name: name.trim(), tier: tier?.trim() || "CUSTOM",
      price: Number(price), color: color || "#6366f1",
      features: features || [], allowedRoutes: allowedRoutes || [],
    });
    res.status(201).json({ message: "Package created.", package: pkg });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const updatePackage = async (req, res) => {
  try {
    const { Package } = getMasterModels();
    const { name, tier, price, color, features, allowedRoutes, isActive } = req.body;
    const pkg = await Package.findByIdAndUpdate(
      req.params.id,
      { name, tier, price: Number(price), color, features, allowedRoutes, isActive },
      { new: true }
    );
    if (!pkg) return res.status(404).json({ message: "Package not found." });
    res.json({ message: "Package updated.", package: pkg });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const deletePackage = async (req, res) => {
  try {
    const { Package, Mill } = getMasterModels();
    const inUse = await Mill.exists({ packageId: req.params.id });
    if (inUse) return res.status(400).json({ message: "Cannot delete — package is assigned to active mills." });
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: "Package deleted." });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ═══════════════════════════════════════════════════════════════════
// MILLS — READ / LIST
// ═══════════════════════════════════════════════════════════════════

export const getAllMills = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const { status, search } = req.query;
    const q = {};
    if (status && status !== "all") q.approvalStatus = status;
    if (search) q.$or = [
      { businessName: { $regex: search, $options:"i" } },
      { ownerName:    { $regex: search, $options:"i" } },
      { email:        { $regex: search, $options:"i" } },
    ];
    const mills = await Mill.find(q).select("-adminPassword").sort({ createdAt:-1 }).populate("packageId");
    const stats = {
      total:      await Mill.countDocuments(),
      pending:    await Mill.countDocuments({ approvalStatus:"pending" }),
      approved:   await Mill.countDocuments({ approvalStatus:"approved" }),
      restricted: await Mill.countDocuments({ approvalStatus:"restricted" }),
    };
    res.json({ mills, stats });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const getMillDetails = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const mill = await Mill.findOne({ millId: req.params.millId }).select("-adminPassword").populate("packageId");
    if (!mill) return res.status(404).json({ message: "Mill not found." });
    res.json(mill);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ═══════════════════════════════════════════════════════════════════
// CREATE MILL
// ═══════════════════════════════════════════════════════════════════

export const createMillByMaster = async (req, res) => {
  try {
    const {
      businessName, ownerName, email, cnic, phone, ntnNumber,
      password, packageId, paymentPlanType,
    } = req.body;

    if (!businessName || !ownerName || !email || !cnic || !password || !packageId)
      return res.status(400).json({ message: "Required fields missing." });

    const normalizedCnic = rawCnic(cnic);
    if (!/^\d{13}$/.test(normalizedCnic))
      return res.status(400).json({ message: "CNIC must be 13 digits." });
    if (password.length < 8)
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ message: "Invalid email address." });
    if (phone && !/^\+923\d{9}$/.test(phone))
      return res.status(400).json({ message: "Phone must be +923XXXXXXXXX (10 digits after +923)." });

    const { Mill, Package } = getMasterModels();
    const existing = await Mill.findOne({ $or:[{email},{adminCnic:normalizedCnic}] });
    if (existing) return res.status(400).json({ message: "Email or CNIC already registered." });

    const pkg = await Package.findById(packageId);
    if (!pkg) return res.status(400).json({ message: "Invalid package." });

    let millId; let tries = 0;
    do { millId = toMillId(businessName); } while (await Mill.findOne({ millId }) && ++tries < 10);

    const hashedPwd = await bcrypt.hash(password, 10);

    // Upload logo
    let logoUrl = "";
    if (req.files?.logo?.[0]) {
      try {
        const r = await uploadToCloudinary(req.files.logo[0].buffer, UPLOAD_CONTEXT.MASTER_LOGS, null, `logo_${normalizedCnic}`);
        logoUrl = r.url;
      } catch (e) { console.error("Logo upload failed:", e.message); }
    }

    // Upload documents
    const docEntries = [];
    const docFiles = Object.entries(req.files||{}).filter(([k])=>k.startsWith("doc_"));
    await Promise.all(docFiles.map(async ([,arr]) => {
      const f = arr[0];
      try {
        const r = await uploadToCloudinary(f.buffer, UPLOAD_CONTEXT.MASTER_LOGS, null, f.originalname);
        docEntries.push({ name:f.originalname, fileUrl:r.url, publicId:r.publicId });
      } catch (e) { console.error("Doc upload failed:", e.message); }
    }));

    const planType     = paymentPlanType || "full";
    const now          = new Date();
    const billingDate  = calcNextBillingDate(planType, now) || new Date(Date.now() + 365 * 86400000);
    const installments = planType !== "full" ? buildInstallmentSchedule(pkg.price, planType, now) : [];

    const mill = await Mill.create({
      millId, businessName, ownerName, email,
      cnic: normalizedCnic, adminCnic: normalizedCnic,
      phone: phone || "", ntnNumber: ntnNumber || "",
      logoUrl, adminPassword: hashedPwd, plainPassword: password,
      documents: docEntries,
      packageId: pkg._id, plan: pkg.name,
      packagePrice: pkg.price, allowedRoutes: pkg.allowedRoutes,
      paymentPlanType: planType, installmentPlan: installments,
      billingDate, planExpiry: billingDate,
      approvalStatus: "pending", isActive: false, createdByMaster: true,
    });

    // Welcome email
    safeMail({
      to: email,
      subject: `Welcome to Agro Plus — ${businessName}`,
      html: `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
  <div style="background:#111827;padding:28px 36px;">
    <div style="font-size:24px;font-weight:800;color:#fff;">Agro<span style="color:#4ade80;">Plus</span></div>
    <div style="font-size:11px;color:rgba(255,255,255,.4);letter-spacing:.12em;text-transform:uppercase;margin-top:3px;">ORCA TECH. AND VENTURES</div>
  </div>
  <div style="padding:28px 36px;">
    <h2 style="color:#111827;margin:0 0 8px;">Welcome, ${ownerName}!</h2>
    <p style="color:#6b7280;font-size:14px;line-height:1.7;margin:0 0 22px;">
      Your mill <strong style="color:#111827;">${businessName}</strong> has been registered on Agro Plus.
      Your account will be activated once your first payment is verified.
    </p>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:18px 22px;margin-bottom:20px;">
      <div style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#15803d;margin-bottom:10px;">Login Credentials</div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr><td style="padding:4px 0;color:#6b7280;width:120px;">Login URL</td><td style="color:#111827;font-weight:700;">${process.env.APP_URL||"https://your-domain.com"}</td></tr>
        <tr><td style="padding:4px 0;color:#6b7280;">CNIC</td><td style="font-family:monospace;color:#111827;font-weight:700;">${fmtCnic(normalizedCnic)}</td></tr>
        <tr><td style="padding:4px 0;color:#6b7280;">Password</td><td style="font-family:monospace;color:#dc2626;font-weight:700;">${password}</td></tr>
      </table>
      <p style="margin:10px 0 0;font-size:11px;color:#15803d;">⚠️ Change your password after first login.</p>
    </div>
    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px 22px;margin-bottom:20px;">
      <div style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6b7280;margin-bottom:10px;">Package Details</div>
      <table style="width:100%;font-size:13px;border-collapse:collapse;">
        <tr><td style="padding:4px 0;color:#6b7280;width:120px;">Package</td><td style="color:#111827;font-weight:600;">${pkg.name} (${pkg.tier})</td></tr>
        <tr><td style="padding:4px 0;color:#6b7280;">Setup Fee</td><td style="color:#111827;font-weight:600;">Rs ${pkg.price.toLocaleString()}</td></tr>
        <tr><td style="padding:4px 0;color:#6b7280;">Payment Plan</td><td style="color:#111827;">${PLAN_TYPES[planType]?.label || planType}</td></tr>
      </table>
    </div>
    <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:14px 18px;font-size:13px;color:#991b1b;line-height:1.6;">
      📸 After payment, share your screenshot via WhatsApp:<br/>
      📱 ${process.env.WHATSAPP_1||"+92XXXXXXXXXX"}<br/>
      📧 ${process.env.EMAIL_USER||""}
    </div>
  </div>
  <div style="padding:14px 36px;border-top:1px solid #f1f5f9;text-align:center;">
    <p style="margin:0;color:#d1d5db;font-size:11px;">ORCA TECH. AND VENTURES · © ${new Date().getFullYear()} Agro Plus</p>
  </div>
</div>`,
    }).catch(e=>console.error("Welcome email failed:", e.message));

    res.status(201).json({
      message: `${businessName} created. Welcome email sent to ${email}.`,
      millId: mill.millId,
    });
  } catch (e) {
    console.error("createMillByMaster:", e);
    res.status(500).json({ message: e.message });
  }
};

// ═══════════════════════════════════════════════════════════════════
// APPROVE / RESTRICT / UNRESTRICT / DELETE
// ═══════════════════════════════════════════════════════════════════

export const approveMill = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const mill = await Mill.findOne({ millId: req.params.millId });
    if (!mill) return res.status(404).json({ message: "Mill not found." });

    // Block approval until first payment recorded
    if (!mill.payments || mill.payments.length === 0) {
      return res.status(400).json({
        message: "Cannot approve mill until at least one payment has been recorded. Record the first payment first.",
      });
    }

    const billing = calcNextBillingDate(mill.paymentPlanType) || new Date(Date.now() + 90*86400000);
    mill.approvalStatus = "approved";
    mill.isActive       = true;
    mill.activatedAt    = new Date();
    mill.billingDate    = billing;
    mill.planExpiry     = billing;
    mill.nextBillingDate = billing;
    await mill.save();

    try { await ensureDefaultAccountsForMill(mill.millId); } catch (e) { console.warn("Default accounts:", e.message); }

    safeMail({
      to: mill.email,
      subject: `✅ Your Agro Plus account is ACTIVE — ${mill.businessName}`,
      html: `<div style="font-family:sans-serif;padding:32px;max-width:580px;margin:auto;">
        <h2 style="color:#15803d;">Your mill is live! 🚀</h2>
        <p><strong>${mill.businessName}</strong> has been activated. Sign in with your CNIC and password.</p>
        <a href="${process.env.APP_URL||"#"}" style="display:inline-block;background:#111827;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;margin-top:16px;">Open Dashboard →</a>
      </div>`,
    });

    res.json({ message: `${mill.businessName} approved and activated.` });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const restrictMill = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const mill = await Mill.findOneAndUpdate(
      { millId: req.params.millId },
      { approvalStatus:"restricted", isActive:false },
      { new:true }
    );
    if (!mill) return res.status(404).json({ message: "Mill not found." });
    res.json({ message: `${mill.businessName} restricted.` });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const unrestrictMill = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const mill = await Mill.findOneAndUpdate(
      { millId: req.params.millId },
      { approvalStatus:"approved", isActive:true },
      { new:true }
    );
    if (!mill) return res.status(404).json({ message: "Mill not found." });
    res.json({ message: `${mill.businessName} restored.` });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const deleteMill = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const mill = await Mill.findOneAndDelete({ millId: req.params.millId });
    if (!mill) return res.status(404).json({ message: "Mill not found." });
    if (mill.logoUrl) deleteFromCloudinary(extractPublicId(mill.logoUrl)).catch(()=>{});
    res.json({ message: `${mill.businessName} deleted.` });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ═══════════════════════════════════════════════════════════════════
// RESET PASSWORD
// ═══════════════════════════════════════════════════════════════════

export const resetMillPassword = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 8)
      return res.status(400).json({ message: "Password must be at least 8 characters." });

    const mill = await Mill.findOne({ millId: req.params.millId });
    if (!mill) return res.status(404).json({ message: "Mill not found." });

    mill.adminPassword = await bcrypt.hash(newPassword, 10);
    mill.plainPassword = newPassword;
    await mill.save();

    safeMail({
      to: mill.email,
      subject: `Your Agro Plus password has been reset — ${mill.businessName}`,
      html: `<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:560px;margin:auto;padding:32px;background:#fff;border-radius:10px;border:1px solid #e5e7eb;">
        <h2 style="color:#111827;margin:0 0 12px;">Password Reset</h2>
        <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0 0 20px;">
          Your admin password for <strong>${mill.businessName}</strong> has been reset by ORCA TECH support.
        </p>
        <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:14px 18px;margin-bottom:20px;">
          <div style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#dc2626;margin-bottom:8px;">New Credentials</div>
          <table style="width:100%;font-size:13px;border-collapse:collapse;">
            <tr><td style="padding:4px 0;color:#6b7280;width:100px;">CNIC</td><td style="font-family:monospace;font-weight:700;">${fmtCnic(mill.adminCnic)}</td></tr>
            <tr><td style="padding:4px 0;color:#6b7280;">New Password</td><td style="font-family:monospace;color:#dc2626;font-weight:700;">${newPassword}</td></tr>
          </table>
        </div>
        <p style="color:#9ca3af;font-size:12px;">Please change your password immediately after login.</p>
        <a href="${process.env.APP_URL||"#"}" style="display:inline-block;background:#111827;color:#fff;padding:10px 22px;border-radius:7px;text-decoration:none;font-weight:700;margin-top:14px;">Login Now →</a>
      </div>`,
    });

    res.json({ message: "Password reset and email sent." });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ═══════════════════════════════════════════════════════════════════
// RECORD PAYMENT + GENERATE INVOICE
// ═══════════════════════════════════════════════════════════════════

export const recordPayment = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const { millId } = req.params;
    const {
      paymentCategory, tid, amount, notes, paidDate, senderBank, senderTitle, senderAccount,
    } = req.body;

    if (!tid?.trim())    return res.status(400).json({ message: "Transaction ID is required." });
    if (!Number(amount)) return res.status(400).json({ message: "Valid amount is required." });

    const mill = await Mill.findOne({ millId });
    if (!mill) return res.status(404).json({ message: "Mill not found." });

    const recordDate = paidDate ? new Date(paidDate) : new Date();
    const paidAmt    = Number(amount);

    // Update installment if applicable
    if (mill.installmentPlan?.length > 0) {
      const unpaid = mill.installmentPlan.find(i => !i.paid);
      if (unpaid) {
        unpaid.paid    = true;
        unpaid.paidDate = recordDate;
        unpaid.tid     = tid || "";
      }
    }

    // Calculate next billing date
    if (mill.paymentPlanType && mill.paymentPlanType !== "full") {
      mill.nextBillingDate = calcNextBillingDate(mill.paymentPlanType, recordDate);
      mill.billingDate     = mill.nextBillingDate;
    }
    mill.lastPaymentDate = recordDate;

    // Generate invoice
    const invoiceData = {
      paymentCategory: paymentCategory || "other",
      amount: paidAmt, transactionId: tid,
      paidDate: recordDate, notes: notes || "",
      issuedAt: new Date(),
    };
    const { invoiceNo, cloudinaryUrl } = await createAndSendInvoice(mill, invoiceData);

    mill.payments.push({
      category: paymentCategory || "other",
      planType: mill.paymentPlanType || "full",
      amount: paidAmt, tid,
      senderBank: senderBank || "HBL",
      senderTitle: senderTitle || "",
      senderAccount: senderAccount || "",
      notes: notes || "",
      paidDate: recordDate, recordedAt: new Date(),
      invoiceNo, invoiceUrl: cloudinaryUrl,
    });

    await mill.save();
    res.json({
      message: `Payment of Rs ${paidAmt.toLocaleString()} recorded. Invoice ${invoiceNo} sent.`,
      mill: { payments: mill.payments, installmentPlan: mill.installmentPlan, nextBillingDate: mill.nextBillingDate },
      invoiceNo,
    });
  } catch (e) {
    console.error("recordPayment:", e);
    res.status(500).json({ message: e.message });
  }
};

// ═══════════════════════════════════════════════════════════════════
// INVOICES
// ═══════════════════════════════════════════════════════════════════

export const getInvoices = async (req, res) => {
  try {
    const { MillInvoice } = getMasterModels();
    const filter = req.query.millId ? { millId: req.query.millId } : {};
    const invoices = await MillInvoice.find(filter).sort({ issuedAt:-1 }).limit(200);
    res.json({ invoices });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ═══════════════════════════════════════════════════════════════════
// ANALYTICS
// ═══════════════════════════════════════════════════════════════════

export const getAnalytics = async (req, res) => {
  try {
    const { Mill, MillInvoice } = getMasterModels();
    const { from, to, expenseMode = "monthly" } = req.query;

    const allMills = await Mill.find().select("payments businessName millId approvalStatus paymentPlanType nextBillingDate lastPaymentDate packagePrice createdAt");
    const allInvoices = await MillInvoice.find().sort({ issuedAt:-1 });

    // Date filter
    const fromDate = from ? new Date(from) : null;
    const toDate   = to   ? new Date(to)   : null;
    const inRange = d => {
      if (!d) return false;
      const dt = new Date(d);
      if (fromDate && dt < fromDate) return false;
      if (toDate)   { const te = new Date(toDate); te.setHours(23,59,59,999); if (dt > te) return false; }
      return true;
    };

    // Revenue totals
    let totalCollected   = 0;
    let periodCollected  = 0;
    const byCategory    = { setup_full:0, setup_installment:0, quarterly:0, biannual:0, annual:0, other:0 };

    for (const mill of allMills) {
      for (const p of mill.payments || []) {
        totalCollected += p.amount || 0;
        if (inRange(p.paidDate || p.recordedAt)) {
          periodCollected += p.amount || 0;
          const cat = p.category || "other";
          byCategory[cat in byCategory ? cat : "other"] += p.amount || 0;
        }
      }
    }

    // Outstanding mills (overdue)
    const today = new Date();
    const overdueMills = allMills.filter(m => {
      if (m.approvalStatus !== "approved") return false;
      if (!m.nextBillingDate) return false;
      return new Date(m.nextBillingDate) < today;
    }).map(m => ({
      millId: m.millId,
      businessName: m.businessName,
      nextBillingDate: m.nextBillingDate,
      lastPaymentDate: m.lastPaymentDate,
      daysOverdue: Math.floor((today - new Date(m.nextBillingDate)) / 86400000),
    }));

    // Outstanding amount estimate (overdue mills * their avg payment)
    const outstandingEstimate = overdueMills.reduce((s, m) => {
      const fullMill = allMills.find(x => x.millId === m.millId);
      const avgPay   = fullMill?.payments?.length
        ? fullMill.payments.reduce((a,p)=>a+(p.amount||0),0) / fullMill.payments.length
        : 0;
      return s + avgPay;
    }, 0);

    // Expenses
    const MONTHLY_EXPENSE = expenseMode === "annual" ? 28720 : 40763;
    const periodMonths    = fromDate && toDate
      ? Math.max(1, Math.round((toDate - fromDate) / (1000 * 60 * 60 * 24 * 30)))
      : 1;
    const periodExpenses  = MONTHLY_EXPENSE * periodMonths;
    const netProfit       = periodCollected - periodExpenses;

    // Revenue by week/month for trend chart (last 12 periods)
    const trend = [];
    for (let i = 11; i >= 0; i--) {
      const d     = new Date(); d.setMonth(d.getMonth() - i);
      const label = d.toLocaleDateString("en-PK",{month:"short",year:"numeric"});
      const mFrom = new Date(d.getFullYear(), d.getMonth(), 1);
      const mTo   = new Date(d.getFullYear(), d.getMonth()+1, 0, 23, 59, 59);
      let rev = 0;
      for (const mill of allMills) {
        for (const p of mill.payments||[]) {
          const pd = new Date(p.paidDate||p.recordedAt);
          if (pd >= mFrom && pd <= mTo) rev += p.amount||0;
        }
      }
      trend.push({ label, revenue: rev, expense: MONTHLY_EXPENSE, profit: rev - MONTHLY_EXPENSE });
    }

    res.json({
      totalCollected,
      periodCollected,
      byCategory,
      overdueMills,
      outstandingEstimate: Math.round(outstandingEstimate),
      stats: {
        total:      allMills.length,
        approved:   allMills.filter(m=>m.approvalStatus==="approved").length,
        pending:    allMills.filter(m=>m.approvalStatus==="pending").length,
        restricted: allMills.filter(m=>m.approvalStatus==="restricted").length,
      },
      expenses: {
        monthly: MONTHLY_EXPENSE,
        period:  periodExpenses,
      },
      netProfit,
      trend,
      invoicesIssued: allInvoices.length,
    });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ═══════════════════════════════════════════════════════════════════
// BILLING
// ═══════════════════════════════════════════════════════════════════

export const updateBillingDate = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const { billingDate } = req.body;
    if (!billingDate) return res.status(400).json({ message: "billingDate required." });
    const mill = await Mill.findOneAndUpdate(
      { millId: req.params.millId },
      { billingDate: new Date(billingDate), nextBillingDate: new Date(billingDate) },
      { new: true }
    );
    if (!mill) return res.status(404).json({ message: "Mill not found." });
    res.json({ message: "Billing date updated.", billingDate: mill.billingDate });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const sendBillingReminders = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const now  = new Date();
    const in7  = new Date(now.getTime() + 7 * 86400000);
    const mills = await Mill.find({
      approvalStatus:"approved", isActive:true,
      nextBillingDate: { $lte: in7 },
      $or:[{ lastReminderSent:null },{ lastReminderSent:{ $lt: new Date(now.getTime()-86400000) } }],
    });
    let sent = 0;
    for (const mill of mills) {
      const daysLeft = Math.ceil((new Date(mill.nextBillingDate) - now) / 86400000);
      const ok = await safeMail({
        to: mill.email,
        subject: `Payment Reminder — ${mill.businessName}`,
        html: `<div style="font-family:sans-serif;padding:28px;max-width:560px;margin:auto;border:1px solid #e5e7eb;border-radius:10px;">
          <h3 style="color:#d97706;">⏰ Payment Reminder</h3>
          <p>Hi <strong>${mill.ownerName}</strong>, your next payment for <strong>${mill.businessName}</strong> is due in <strong>${daysLeft} day${daysLeft!==1?"s":""}</strong>.</p>
          <p>Transfer to: <strong>HBL — ALI RAZA SALEEM — A/C: 02967901869503</strong><br/>Then share screenshot via WhatsApp <strong>${process.env.WHATSAPP_1||""}</strong>.</p>
        </div>`,
      });
      if (ok) { mill.lastReminderSent = now; await mill.save(); sent++; }
    }
    res.json({ message: `${sent} reminder(s) sent.`, sent });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ═══════════════════════════════════════════════════════════════════
// SUPPORT
// ═══════════════════════════════════════════════════════════════════

export const getSupportRequests = async (req, res) => {
  try {
    const { GlobalRequest } = getMasterModels();
    const { type, status } = req.query;
    const q = {};
    if (type && type !== "all")   q.type   = type;
    if (status && status !== "all") q.status = status;
    const requests = await GlobalRequest.find(q).sort({ createdAt:-1 });
    const stats = {
      complaints: await GlobalRequest.countDocuments({ type:"complaint" }),
      feedback:   await GlobalRequest.countDocuments({ type:"feedback" }),
      deletions:  await GlobalRequest.countDocuments({ type:"deletion_request" }),
      open:       await GlobalRequest.countDocuments({ status:"open" }),
    };
    res.json({ requests, stats });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const updateSupportRequest = async (req, res) => {
  try {
    const { GlobalRequest } = getMasterModels();
    const { status, masterNotes } = req.body;
    const r = await GlobalRequest.findByIdAndUpdate(req.params.requestId, { status, masterNotes }, { new:true });
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