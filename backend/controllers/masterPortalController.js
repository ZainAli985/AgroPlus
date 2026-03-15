// controllers/masterPortalController.js
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { getMasterModels, PACKAGES } from "../config/masterDB.js";
import { getModels }                 from "../config/millDB.js";

// ── Helper: ensure CASH IN HAND account exists for a mill ─────────────────────
async function ensureCashInHandAccount(millId) {
  const { Account } = getModels(millId);
  const existing = await Account.findOne({ isProtected: true });
  if (existing) return existing;   // already created

  // Auto-generate a sequential ID for it
  const lastAcc = await Account.findOne().sort({ createdAt: -1 });
  let lastNum = 0;
  if (lastAcc?.autoAccountId) {
    const parts = lastAcc.autoAccountId.split("-");
    lastNum = parseInt(parts[1] || "0");
  }
  const autoAccountId = "ACC-" + (lastNum + 1).toString().padStart(6, "0");

  const acc = await Account.create({
    autoAccountId,
    manualAccountId: "CASH-001",
    accountType:    "Assets",
    subAccountType: "Current Assets",
    accountName:    "Cash In Hand",
    LedgerRef:      "CASH",
    isProtected:    true,
    balance:        0,
  });
  console.log(`✅ CASH IN HAND account created for ${millId}: ${acc._id}`);
  return acc;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

const WA1 = process.env.WHATSAPP_1 || "+92XXXXXXXXXX";
const WA2 = process.env.WHATSAPP_2 || "+92XXXXXXXXXX";

function rawCnic(c) { return c.replace(/-/g,"").trim(); }
function toMillId(name) {
  const slug = name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").slice(0,40);
  return `mill_${slug}_${crypto.randomBytes(4).toString("hex")}`;
}

function buildInstallmentPlan(packagePrice, tenure, startDate) {
  const perInstallment = Math.round(packagePrice / tenure);
  return Array.from({ length: tenure }, (_, i) => {
    const due = new Date(startDate);
    due.setMonth(due.getMonth() + i);
    return {
      installmentNumber: i + 1,
      amount: i === tenure - 1 ? packagePrice - perInstallment * (tenure - 1) : perInstallment, // last takes remainder
      dueDate: due,
      paid: false,
    };
  });
}

function buildMonthlySchedule(months, startDate, monthlyAmount = 7500) {
  return Array.from({ length: months }, (_, i) => {
    const due = new Date(startDate);
    due.setMonth(due.getMonth() + i);
    const label = due.toLocaleDateString("en-PK", { month: "short", year: "numeric" });
    return { periodLabel: label, amount: monthlyAmount, dueDate: due, paid: false };
  });
}

async function sendWelcomeEmail({ to, ownerName, businessName, cnic, password, pkg, mill }) {
  const pkgInfo  = PACKAGES[pkg];
  const monthly  = (7500).toLocaleString();
  const custFee  = (30000).toLocaleString();
  const pkgPrice = pkgInfo.price.toLocaleString();

  let paymentSection = "";
  if (mill.paymentType === "full") {
    const first = (pkgInfo.price + 7500).toLocaleString();
    paymentSection = `
      <tr><td style="padding:5px 0;color:#64748b;">Payment Type</td><td style="color:#0f172a;font-weight:600;">Full Payment</td></tr>
      <tr><td style="padding:5px 0;color:#64748b;">First Payment Due</td><td style="color:#dc2626;font-weight:700;">PKR ${first} (Package + 1st Monthly)</td></tr>
      <tr><td style="padding:5px 0;color:#64748b;">Ongoing Monthly</td><td style="color:#0f172a;font-weight:600;">PKR ${monthly}</td></tr>
    `;
  } else {
    const tenure   = mill.installmentTenure;
    const perInst  = Math.round(pkgInfo.price / tenure).toLocaleString();
    const firstPay = (Math.round(pkgInfo.price / tenure) + 7500).toLocaleString();
    paymentSection = `
      <tr><td style="padding:5px 0;color:#64748b;">Payment Type</td><td style="color:#0f172a;font-weight:600;">Installment (${tenure} months)</td></tr>
      <tr><td style="padding:5px 0;color:#64748b;">Per Installment</td><td style="color:#0f172a;font-weight:600;">PKR ${perInst}</td></tr>
      <tr><td style="padding:5px 0;color:#64748b;">First Payment Due</td><td style="color:#dc2626;font-weight:700;">PKR ${firstPay} (1st Installment + 1st Monthly)</td></tr>
      <tr><td style="padding:5px 0;color:#64748b;">Monthly Maintenance</td><td style="color:#0f172a;font-weight:600;">PKR ${monthly} (every month)</td></tr>
    `;
  }

  const featuresHtml = pkgInfo.features.map(f => `<li style="margin:3px 0;color:#374151;font-size:13px;">${f}</li>`).join("");

  await transporter.sendMail({
    from: `"Agro Plus – ORCA TECH" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Welcome to Agro Plus — Your ${pkgInfo.name} Account is Ready`,
    html: `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
  <div style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:32px 40px;">
    <h1 style="margin:0;color:#fff;font-size:26px;font-weight:800;">Agro Plus</h1>
    <p style="margin:4px 0 0;color:rgba(255,255,255,.5);font-size:11px;letter-spacing:.14em;text-transform:uppercase;">Rice Mill Management Platform · ORCA TECH. AND VENTURES</p>
  </div>
  <div style="padding:32px 40px;">
    <h2 style="color:#0f172a;margin:0 0 6px;">Welcome, ${ownerName}! 🎉</h2>
    <p style="color:#64748b;font-size:14px;margin:0 0 24px;line-height:1.7;">Your mill <strong style="color:#0f172a;">${businessName}</strong> has been registered on Agro Plus. Below are your login credentials, plan details, and payment instructions.</p>

    <div style="background:#f0fdf4;border:1.5px solid #86efac;border-radius:10px;padding:18px 22px;margin-bottom:22px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#059669;margin-bottom:10px;">Login Credentials</div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr><td style="padding:4px 0;color:#64748b;width:120px;">Login URL</td><td style="color:#0f172a;font-weight:700;">${process.env.APP_URL || "https://your-domain.com"}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">CNIC</td><td style="color:#0f172a;font-weight:700;font-family:monospace;">${cnic}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">Password</td><td style="color:#dc2626;font-weight:700;font-family:monospace;">${password}</td></tr>
      </table>
      <p style="margin:10px 0 0;font-size:11.5px;color:#065f46;">⚠️ Please change your password after first login from your Profile page.</p>
    </div>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:18px 22px;margin-bottom:22px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6366f1;margin-bottom:10px;">Your Package — ${pkgInfo.name} (${pkgInfo.tier})</div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr><td style="padding:4px 0;color:#64748b;width:160px;">Package Price</td><td style="color:#0f172a;font-weight:700;">PKR ${pkgPrice}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">Monthly Maintenance</td><td style="color:#0f172a;font-weight:600;">PKR ${monthly}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;">Customization Fee</td><td style="color:#0f172a;font-weight:600;">PKR ${custFee} (one-time, if needed)</td></tr>
        ${paymentSection}
      </table>
    </div>

    <div style="background:#fff7ed;border:1px solid #fde68a;border-radius:10px;padding:16px 20px;margin-bottom:22px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#d97706;margin-bottom:10px;">What's Included</div>
      <ul style="margin:0;padding-left:18px;">${featuresHtml}</ul>
    </div>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 20px;margin-bottom:22px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#0f172a;margin-bottom:10px;">Bank Transfer Details</div>
      <table style="width:100%;border-collapse:collapse;font-size:12.5px;line-height:1.8;">
        <tr><td colspan="2" style="font-weight:700;color:#1d4ed8;padding-bottom:4px;">HBL – Habib Bank Limited</td></tr>
        <tr><td style="color:#64748b;width:130px;">Account Title</td><td style="color:#0f172a;font-weight:600;">ALI RAZA SALEEM</td></tr>
        <tr><td style="color:#64748b;">Account No</td><td style="color:#0f172a;font-family:monospace;">0296701869503</td></tr>
        <tr><td style="color:#64748b;padding-bottom:12px;">IBAN</td><td style="color:#0f172a;font-family:monospace;">PK73HABB0002967901869503</td></tr>
        <tr><td colspan="2" style="font-weight:700;color:#1e40af;padding-top:4px;padding-bottom:4px;">UBL – United Bank Limited</td></tr>
        <tr><td style="color:#64748b;">Account Title</td><td style="color:#0f172a;font-weight:600;">MUHAMMAD ZAIN ALI</td></tr>
        <tr><td style="color:#64748b;">Account No</td><td style="color:#0f172a;font-family:monospace;">0094315078538</td></tr>
        <tr><td style="color:#64748b;">IBAN</td><td style="color:#0f172a;font-family:monospace;">PK15UNIL0109000315078538</td></tr>
      </table>
    </div>

    <div style="background:#fef2f2;border:1px solid #fca5a5;border-radius:8px;padding:12px 16px;margin-bottom:20px;font-size:13px;color:#991b1b;line-height:1.6;">
      📸 <strong>After payment:</strong> Share your payment screenshot with us via WhatsApp or email. Your account will be activated within 24 hours of payment verification.<br/>
      📱 WhatsApp 1: <strong>${WA1}</strong><br/>
      📱 WhatsApp 2: <strong>${WA2}</strong><br/>
      📧 Email: <strong>${process.env.EMAIL_USER}</strong>
    </div>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 16px;font-size:11.5px;color:#64748b;line-height:1.7;">
      <strong style="color:#0f172a;display:block;margin-bottom:4px;">Privacy & Data Policy Summary</strong>
      Your data is stored securely in an isolated database exclusive to your mill. ORCA TECH does not share your data with third parties. You may request data export or deletion at any time via your Profile page. Full privacy policy available at ${process.env.APP_URL || "https://your-domain.com"}/privacy.
    </div>
  </div>
  <div style="padding:16px 40px;border-top:1px solid #f1f5f9;text-align:center;">
    <p style="margin:0;color:#cbd5e1;font-size:11px;">ORCA TECH. AND VENTURES · © ${new Date().getFullYear()} Agro Plus · All rights reserved</p>
  </div>
</div>
    `,
  });
}

// ═══════════════════════════════════════════════════════════════════
// READ / LIST
// ═══════════════════════════════════════════════════════════════════

export const getAllMills = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const { status, search } = req.query;
    const query = {};
    if (status && status !== "all") query.approvalStatus = status;
    if (search) query.$or = [
      { businessName: { $regex: search, $options: "i" } },
      { ownerName:    { $regex: search, $options: "i" } },
      { email:        { $regex: search, $options: "i" } },
    ];
    const mills = await Mill.find(query).select("-adminPassword").sort({ createdAt: -1 });
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

// ═══════════════════════════════════════════════════════════════════
// CREATE MILL (master portal only)
// ═══════════════════════════════════════════════════════════════════
export const createMillByMaster = async (req, res) => {
  try {
    const {
      businessName, ownerName, email, cnic, phone, ntnNumber,
      password, plan, paymentType, installmentTenure,
    } = req.body;

    if (!businessName || !ownerName || !email || !cnic || !password || !plan)
      return res.status(400).json({ message: "Required fields missing." });

    const normalizedCnic = rawCnic(cnic);
    if (!/^\d{13}$/.test(normalizedCnic))
      return res.status(400).json({ message: "CNIC must be 13 digits." });
    if (password.length < 8)
      return res.status(400).json({ message: "Password must be at least 8 characters." });

    const { Mill } = getMasterModels();
    const existing = await Mill.findOne({ $or: [{ email }, { adminCnic: normalizedCnic }] });
    if (existing) return res.status(400).json({ message: "Email or CNIC already registered." });

    let millId; let tries = 0;
    do { millId = toMillId(businessName); } while (await Mill.findOne({ millId }) && ++tries < 10);

    const pkgInfo    = PACKAGES[plan];
    if (!pkgInfo) return res.status(400).json({ message: "Invalid package." });

    const hashedPwd  = await bcrypt.hash(password, 10);
    // upload.fields() puts files in req.files[fieldName][0]
    const logoFile   = req.files?.logo?.[0];
    const logoUrl    = logoFile ? logoFile.path : "";
    // Collect any uploaded documents (doc_0, doc_1, …)
    const docEntries = Object.entries(req.files || {})
      .filter(([key]) => key.startsWith("doc_"))
      .map(([, arr]) => ({ name: arr[0].originalname, fileUrl: arr[0].path }));
    const now        = new Date();
    const billingDate= new Date(Date.now() + 30 * 86400000);

    // Build installment plan
    let installmentPlan = [];
    const payType = paymentType === "installment" ? "installment" : "full";
    const tenure   = payType === "installment" ? Number(installmentTenure) || 3 : 0;
    if (payType === "installment") {
      installmentPlan = buildInstallmentPlan(pkgInfo.price, tenure, now);
    }

    // Build first 12 months of monthly schedule
    const monthlyPayments = buildMonthlySchedule(13, now);

    const mill = await Mill.create({
      millId, businessName, ownerName, email,
      cnic: normalizedCnic, adminCnic: normalizedCnic,
      phone: phone || "", ntnNumber: ntnNumber || "",
      logoUrl, adminPassword: hashedPwd,
      documents: docEntries,
      plan, packagePrice: pkgInfo.price,
      allowedRoutes: pkgInfo.allowedRoutes,
      paymentType: payType, installmentTenure: tenure,
      installmentPlan, monthlyPayments,
      approvalStatus: "pending", isActive: false,
      createdByMaster: true, billingDate, planExpiry: billingDate,
    });

    // Send welcome email (non-blocking)
    sendWelcomeEmail({
      to: email, ownerName, businessName,
      cnic: `${normalizedCnic.slice(0,5)}-${normalizedCnic.slice(5,12)}-${normalizedCnic.slice(12)}`,
      password, pkg: plan, mill: { paymentType: payType, installmentTenure: tenure },
    }).catch(e => console.error("Welcome email failed:", e));

    res.status(201).json({
      message: `${businessName} created successfully. Welcome email sent to ${email}.`,
      millId: mill.millId,
    });
  } catch (e) {
    console.error("createMillByMaster:", e);
    res.status(500).json({ message: e.message });
  }
};

// ═══════════════════════════════════════════════════════════════════
// APPROVE / RESTRICT / ACTIVATE
// ═══════════════════════════════════════════════════════════════════
export const approveMill = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const mill = await Mill.findOne({ millId: req.params.millId });
    if (!mill) return res.status(404).json({ message: "Mill not found." });
    const billing = new Date(Date.now() + 30 * 86400000);
    mill.approvalStatus = "approved";
    mill.isActive       = true;
    mill.activatedAt    = new Date();
    mill.billingDate    = billing;
    mill.planExpiry     = billing;
    await mill.save();

    // Auto-create protected CASH IN HAND account in the mill's own DB
    try { await ensureCashInHandAccount(mill.millId); }
    catch (e) { console.warn("CASH IN HAND account creation warning:", e.message); }

    // send welcome/activation email
    transporter.sendMail({
      from: `"Agro Plus" <${process.env.EMAIL_USER}>`, to: mill.email,
      subject: `✅ Your Agro Plus account is now ACTIVE — ${mill.businessName}`,
      html: `<div style="font-family:sans-serif;padding:32px;max-width:600px;margin:auto;">
        <h2 style="color:#059669;">Your mill is now live, ${mill.ownerName}! 🚀</h2>
        <p>Great news — <strong>${mill.businessName}</strong> has been activated on Agro Plus. You can now log in using your CNIC and password.</p>
        <a href="${process.env.APP_URL||"#"}" style="display:inline-block;background:#0f172a;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;margin-top:16px;">Go to Dashboard →</a>
        <p style="margin-top:20px;color:#64748b;font-size:13px;">If you have any questions, WhatsApp us on ${WA1} or ${WA2}.</p>
      </div>`,
    }).catch(() => {});
    res.json({ message: `${mill.businessName} activated.` });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const restrictMill = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const mill = await Mill.findOneAndUpdate(
      { millId: req.params.millId },
      { approvalStatus: "restricted", isActive: false },
      { new: true }
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
      { approvalStatus: "approved", isActive: true },
      { new: true }
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
    res.json({ message: `${mill.businessName} deleted.` });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ═══════════════════════════════════════════════════════════════════
// PAYMENT RECORDING
// ═══════════════════════════════════════════════════════════════════
export const recordPayment = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const { millId } = req.params;
    const { paymentCategory, installmentNumber, monthlyIndex, tid, amount, notes, paidDate } = req.body;
    // paymentCategory: "installment" | "full_package" | "monthly"
    const mill = await Mill.findOne({ millId });
    if (!mill) return res.status(404).json({ message: "Mill not found." });

    const recordDate = paidDate ? new Date(paidDate) : new Date();

    if (paymentCategory === "installment" && installmentNumber) {
      const inst = mill.installmentPlan.find(i => i.installmentNumber === Number(installmentNumber));
      if (!inst) return res.status(400).json({ message: "Installment not found." });
      inst.paid      = true;
      inst.paidDate  = recordDate;
      inst.tid       = tid || "";
      inst.notes     = notes || "";
      inst.recordedAt= new Date();
    } else if (paymentCategory === "full_package") {
      // Mark all installments as paid
      mill.installmentPlan.forEach(i => { i.paid = true; i.paidDate = recordDate; i.tid = tid || ""; });
    } else if (paymentCategory === "monthly" && monthlyIndex !== undefined) {
      const mp = mill.monthlyPayments[Number(monthlyIndex)];
      if (!mp) return res.status(400).json({ message: "Monthly payment record not found." });
      mp.paid      = true;
      mp.paidDate  = recordDate;
      mp.tid       = tid || "";
      mp.amount    = Number(amount) || mp.amount;
      mp.notes     = notes || "";
      mp.recordedAt= new Date();
    }

    // Always push to unified payments[] ledger
    const paidAmt = Number(amount) ||
      (paymentCategory === "monthly"      ? 7500 :
       paymentCategory === "full_package" ? mill.packagePrice :
       paymentCategory === "installment"  ? (mill.installmentPlan.find(i => i.installmentNumber === Number(installmentNumber))?.amount || 0) : 0);

    const { senderBank = "", senderTitle = "", senderAccount = "", receivingBank = "" } = req.body;

    mill.payments.push({
      category:      paymentCategory === "full_package" ? "package" : paymentCategory,
      amount:        paidAmt,
      tid:           tid   || "",
      senderBank:    senderBank    || "",
      senderTitle:   senderTitle   || "",
      senderAccount: senderAccount || "",
      receivingBank: receivingBank || "",
      notes:         notes || "",
      paidDate:      recordDate,
      recordedAt:    new Date(),
    });

    await mill.save();
    res.json({ message: "Payment recorded.", mill: { installmentPlan: mill.installmentPlan, monthlyPayments: mill.monthlyPayments, payments: mill.payments } });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ═══════════════════════════════════════════════════════════════════
// BILLING DATE & REMINDERS
// ═══════════════════════════════════════════════════════════════════
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

export const sendBillingReminders = async (req, res) => {
  try {
    const { Mill } = getMasterModels();
    const now = new Date();
    const in3 = new Date(now.getTime() + 3 * 86400000);
    const from = new Date(in3); from.setHours(0,0,0,0);
    const to   = new Date(in3); to.setHours(23,59,59,999);
    const yesterday = new Date(now.getTime() - 86400000);
    const mills = await Mill.find({
      approvalStatus: "approved", isActive: true,
      billingDate: { $gte: from, $lte: to },
      $or: [{ lastReminderSent: null }, { lastReminderSent: { $lt: yesterday } }],
    });
    let sent = 0;
    for (const mill of mills) {
      try {
        await transporter.sendMail({
          from: `"Agro Plus Billing" <${process.env.EMAIL_USER}>`,
          to: mill.email,
          subject: `Payment Due in 3 Days — ${mill.businessName}`,
          html: `<div style="font-family:sans-serif;padding:28px;max-width:580px;margin:auto;border:1px solid #e5e7eb;border-radius:10px;">
            <h3 style="color:#d97706;">⏰ Payment Reminder</h3>
            <p>Hi <strong>${mill.ownerName}</strong>, your monthly maintenance fee of <strong>PKR 7,500</strong> is due in 3 days for <strong>${mill.businessName}</strong>.</p>
            <p>Transfer to HBL (ALI RAZA SALEEM · 0296701869503) or UBL (MUHAMMAD ZAIN ALI · 0094315078538) and share screenshot via WhatsApp <strong>${WA1}</strong> or email.</p>
          </div>`,
        });
        mill.lastReminderSent = now;
        await mill.save();
        sent++;
      } catch (e) { console.error(`Reminder failed for ${mill.businessName}:`, e); }
    }
    res.json({ message: `${sent} reminder(s) sent.`, sent });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ═══════════════════════════════════════════════════════════════════
// SUPPORT REQUESTS (GlobalRequest in master DB)
// ═══════════════════════════════════════════════════════════════════
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
    const r = await GlobalRequest.findByIdAndUpdate(
      req.params.requestId,
      { status, masterNotes },
      { new: true }
    );
    if (!r) return res.status(404).json({ message: "Request not found." });
    res.json({ message: "Updated.", request: r });
  } catch (e) { res.status(500).json({ message: e.message }); }
};