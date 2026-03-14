// controllers/registrationController.js
// ─────────────────────────────────────────────────────────────────────────────
// Handles new mill sign-up and payment proof submission.
//
// POST /api/register
//   → Creates Mill record with approvalStatus = "pending", isActive = false
//   → Sends "request received" email to owner
//   → Sends notification email to master admin
//
// POST /api/register/payment-proof
//   → Attaches payment screenshot + TID + bank details to the Mill record
//   → Sends "payment received, pending verification" email to owner
// ─────────────────────────────────────────────────────────────────────────────
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { getMasterModels } from "../config/masterDB.js";

// ─── Email transporter ────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
export const rawCnic = (c) => c.replace(/-/g, "").trim();

export function toMillId(businessName) {
  const slug = businessName
    .toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 40);
  return `mill_${slug}_${crypto.randomBytes(4).toString("hex")}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Email templates
// ─────────────────────────────────────────────────────────────────────────────
export async function sendRequestReceivedEmail({ to, ownerName, businessName }) {
  await transporter.sendMail({
    from: `"Agro Plus" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Registration Received — Pending Approval",
    html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
        <div style="background:linear-gradient(135deg,#059669,#047857);padding:32px 40px;">
          <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;">Agro Plus</h1>
          <p style="margin:4px 0 0;color:rgba(255,255,255,.7);font-size:12px;letter-spacing:.1em;text-transform:uppercase;">Rice Mill Management Platform</p>
        </div>
        <div style="padding:32px 40px;">
          <h2 style="margin:0 0 8px;color:#0f172a;font-size:18px;">Hi ${ownerName},</h2>
          <p style="color:#64748b;font-size:14px;line-height:1.7;margin:0 0 20px;">
            Thank you for registering <strong style="color:#0f172a;">${businessName}</strong> on Agro Plus.
            We've received your registration request and it is currently <strong style="color:#d97706;">pending review</strong>.
          </p>
          <div style="background:#fffbeb;border-left:3px solid #f59e0b;padding:14px 18px;border-radius:6px;margin-bottom:20px;">
            <p style="margin:0;font-size:13px;color:#92400e;line-height:1.6;">
              <strong>Next Step:</strong> Please complete your payment of <strong>Rs. 7,000</strong> via bank transfer and submit your payment proof through the registration page. Your account will be activated once your payment is verified.
            </p>
          </div>
          <p style="color:#94a3b8;font-size:12px;margin:0;">If you have any questions, reply to this email or contact us directly.</p>
        </div>
        <div style="padding:16px 40px;border-top:1px solid #f1f5f9;text-align:center;">
          <p style="margin:0;color:#cbd5e1;font-size:11px;">A product of <strong style="color:#94a3b8;">ORCA TECH. AND VENTURES</strong> · © ${new Date().getFullYear()} Agro Plus</p>
        </div>
      </div>
    `,
  });
}

export async function sendPaymentProofReceivedEmail({ to, ownerName, businessName, tid }) {
  await transporter.sendMail({
    from: `"Agro Plus" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Payment Proof Received — Under Review",
    html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
        <div style="background:linear-gradient(135deg,#059669,#047857);padding:32px 40px;">
          <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;">Agro Plus</h1>
        </div>
        <div style="padding:32px 40px;">
          <h2 style="margin:0 0 8px;color:#0f172a;font-size:18px;">Hi ${ownerName},</h2>
          <p style="color:#64748b;font-size:14px;line-height:1.7;margin:0 0 20px;">
            We've received your payment proof for <strong style="color:#0f172a;">${businessName}</strong>.
          </p>
          <div style="background:#f8fafc;border-radius:10px;padding:16px 20px;margin-bottom:20px;border:1px solid #e2e8f0;">
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
              <tr><td style="padding:5px 0;color:#64748b;width:140px;">Transaction ID</td><td style="color:#0f172a;font-weight:700;font-family:monospace;">${tid}</td></tr>
              <tr><td style="padding:5px 0;color:#64748b;">Amount</td><td style="color:#0f172a;font-weight:600;">Rs. 7,000</td></tr>
              <tr><td style="padding:5px 0;color:#64748b;">Status</td><td style="color:#d97706;font-weight:600;">Under Review</td></tr>
            </table>
          </div>
          <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0;">
            Our team will verify your payment within 24 hours. Once approved, you will receive a welcome email with your login details and your account will be fully activated.
          </p>
        </div>
        <div style="padding:16px 40px;border-top:1px solid #f1f5f9;text-align:center;">
          <p style="margin:0;color:#cbd5e1;font-size:11px;">A product of <strong style="color:#94a3b8;">ORCA TECH. AND VENTURES</strong> · © ${new Date().getFullYear()} Agro Plus</p>
        </div>
      </div>
    `,
  });
}

export async function sendWelcomeEmail({ to, ownerName, businessName, plan, billingDate }) {
  const billingStr = new Date(billingDate).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" });
  await transporter.sendMail({
    from: `"Agro Plus" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Welcome to Agro Plus — ${businessName} is Now Active!`,
    html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
        <div style="background:linear-gradient(135deg,#059669,#047857);padding:32px 40px;">
          <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;">Welcome to Agro Plus 🎉</h1>
          <p style="margin:4px 0 0;color:rgba(255,255,255,.7);font-size:12px;letter-spacing:.1em;text-transform:uppercase;">Your mill is now live</p>
        </div>
        <div style="padding:32px 40px;">
          <h2 style="margin:0 0 8px;color:#0f172a;font-size:18px;">You're all set, ${ownerName}!</h2>
          <p style="color:#64748b;font-size:14px;line-height:1.7;margin:0 0 20px;">
            Your mill <strong style="color:#0f172a;">${businessName}</strong> has been approved and your account is now fully active. You can log in immediately using your <strong>CNIC and password</strong>.
          </p>
          <div style="background:#f0fdf4;border-radius:10px;padding:16px 20px;margin-bottom:20px;border:1px solid #bbf7d0;">
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
              <tr><td style="padding:5px 0;color:#64748b;width:140px;">Login Method</td><td style="color:#0f172a;font-weight:600;">CNIC + Password</td></tr>
              <tr><td style="padding:5px 0;color:#64748b;">Plan</td><td style="color:#0f172a;font-weight:600;text-transform:capitalize;">${plan} · Rs. 7,000/month</td></tr>
              <tr><td style="padding:5px 0;color:#64748b;">Next Billing</td><td style="color:#0f172a;font-weight:600;">${billingStr}</td></tr>
            </table>
          </div>
          <div style="background:#fff7ed;border-left:3px solid #f97316;padding:12px 16px;border-radius:6px;margin-bottom:20px;">
            <p style="margin:0;font-size:13px;color:#92400e;line-height:1.6;">
              <strong>Billing Reminder:</strong> Please ensure your next payment of <strong>Rs. 7,000</strong> is submitted before ${billingStr} to avoid any service interruption.
            </p>
          </div>
          <a href="${process.env.APP_URL || "#"}" style="display:inline-block;background:#0f172a;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:700;">
            Go to Dashboard →
          </a>
        </div>
        <div style="padding:16px 40px;border-top:1px solid #f1f5f9;text-align:center;">
          <p style="margin:0;color:#cbd5e1;font-size:11px;">A product of <strong style="color:#94a3b8;">ORCA TECH. AND VENTURES</strong> · © ${new Date().getFullYear()} Agro Plus</p>
        </div>
      </div>
    `,
  });
}

export async function sendBillingReminderEmail({ to, ownerName, businessName, billingDate }) {
  const billingStr = new Date(billingDate).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" });
  await transporter.sendMail({
    from: `"Agro Plus Billing" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Payment Due in 3 Days — ${businessName}`,
    html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
        <div style="background:linear-gradient(135deg,#d97706,#b45309);padding:32px 40px;">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">Payment Reminder</h1>
          <p style="margin:4px 0 0;color:rgba(255,255,255,.8);font-size:13px;">Agro Plus — ${businessName}</p>
        </div>
        <div style="padding:32px 40px;">
          <p style="color:#374151;font-size:14px;line-height:1.7;margin:0 0 16px;">
            Hi <strong>${ownerName}</strong>, your monthly subscription payment is due in <strong style="color:#d97706;">3 days</strong> on <strong>${billingStr}</strong>.
          </p>
          <div style="background:#fffbeb;border-radius:10px;padding:16px 20px;margin-bottom:20px;border:1px solid #fde68a;">
            <div style="display:flex;justify-content:space-between;font-size:14px;">
              <span style="color:#64748b;">Amount Due</span>
              <strong style="color:#0f172a;">Rs. 7,000</strong>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:14px;margin-top:8px;">
              <span style="color:#64748b;">Due Date</span>
              <strong style="color:#d97706;">${billingStr}</strong>
            </div>
          </div>
          <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0 0 16px;">
            Please transfer <strong>Rs. 7,000</strong> to one of our bank accounts and submit your payment proof through the platform before the due date to avoid any interruption.
          </p>
          <div style="background:#f8fafc;border-radius:8px;padding:14px 18px;font-size:12.5px;color:#374151;line-height:1.8;border:1px solid #e2e8f0;">
            <strong style="display:block;margin-bottom:6px;color:#0f172a;">Bank Transfer Details:</strong>
            <strong>HBL</strong> · A/C Title: ALI RAZA SALEEM · A/C: 0296701869503<br/>
            <strong>UBL</strong> · A/C Title: MUHAMMAD ZAIN ALI · A/C: 0094315078538
          </div>
        </div>
        <div style="padding:16px 40px;border-top:1px solid #f1f5f9;text-align:center;">
          <p style="margin:0;color:#cbd5e1;font-size:11px;">A product of <strong style="color:#94a3b8;">ORCA TECH. AND VENTURES</strong> · © ${new Date().getFullYear()} Agro Plus</p>
        </div>
      </div>
    `,
  });
}

// Also send notification to master admin when a new registration comes in
async function notifyMasterAdmin({ businessName, ownerName, email, cnic }) {
  await transporter.sendMail({
    from: `"Agro Plus System" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New Mill Registration — ${businessName}`,
    html: `
      <div style="font-family:monospace;max-width:560px;margin:0 auto;padding:24px;background:#0f172a;color:#e2e8f0;border-radius:10px;">
        <h2 style="color:#34d399;margin:0 0 16px;">New Registration Request</h2>
        <p style="margin:4px 0;"><span style="color:#94a3b8;">Business:</span> ${businessName}</p>
        <p style="margin:4px 0;"><span style="color:#94a3b8;">Owner:</span> ${ownerName}</p>
        <p style="margin:4px 0;"><span style="color:#94a3b8;">Email:</span> ${email}</p>
        <p style="margin:4px 0;"><span style="color:#94a3b8;">CNIC:</span> ${cnic}</p>
        <p style="margin:16px 0 0;color:#94a3b8;font-size:12px;">Login to your master portal to review and approve this registration.</p>
      </div>
    `,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/register
// ─────────────────────────────────────────────────────────────────────────────
export const registerMill = async (req, res) => {
  try {
    const { businessName, ownerName, email, cnic, phone, password } = req.body;

    if (!businessName || !ownerName || !email || !cnic || !password) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const normalizedCnic = rawCnic(cnic);
    if (!/^\d{13}$/.test(normalizedCnic)) {
      return res.status(400).json({ message: "CNIC must be 13 digits." });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }

    const { Mill } = getMasterModels();

    const existing = await Mill.findOne({ $or: [{ email }, { adminCnic: normalizedCnic }] });
    if (existing) {
      return res.status(400).json({ message: "An account with this email or CNIC already exists." });
    }

    let millId;
    let attempts = 0;
    do {
      millId = toMillId(businessName);
      if (++attempts > 10) return res.status(500).json({ message: "Could not generate unique Mill ID." });
    } while (await Mill.findOne({ millId }));

    const hashedPassword = await bcrypt.hash(password, 10);
    const logoUrl   = req.file ? req.file.path : "";
    const billingDate = new Date(Date.now() + 30 * 86400000);

    await Mill.create({
      millId,
      businessName,
      ownerName,
      email,
      adminCnic:     normalizedCnic,
      cnic:          normalizedCnic,
      phone:         phone || "",
      logoUrl,
      adminPassword: hashedPassword,
      plan:          "monthly",
      billingDate,
      planExpiry:    billingDate,
      approvalStatus: "pending",
      isActive:      false,
    });

    // Non-blocking emails
    sendRequestReceivedEmail({ to: email, ownerName, businessName })
      .catch(e => console.error("Registration email failed:", e));
    notifyMasterAdmin({ businessName, ownerName, email, cnic: normalizedCnic })
      .catch(e => console.error("Admin notify email failed:", e));

    res.status(201).json({
      message: "Registration submitted successfully.",
      millId,
    });
  } catch (error) {
    console.error("Register Mill Error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/register/payment-proof
// Saves payment proof to the Mill record.
// Body: millId, senderBank, senderTitle, senderAccount, receivingBank, amountSent, tid
// File: screenshot (multer)
// ─────────────────────────────────────────────────────────────────────────────
export const submitPaymentProof = async (req, res) => {
  try {
    const { millId, senderBank, senderTitle, senderAccount, receivingBank, amountSent, tid } = req.body;

    if (!millId || !senderBank || !senderTitle || !senderAccount || !receivingBank || !tid) {
      return res.status(400).json({ message: "All payment fields are required." });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Payment screenshot is required." });
    }

    const { Mill } = getMasterModels();
    const mill = await Mill.findOne({ millId });
    if (!mill) return res.status(404).json({ message: "Mill not found." });

    const proof = {
      senderBank,
      senderTitle,
      senderAccount,
      receivingBank,
      amountSent:    Number(amountSent) || 7000,
      tid,
      screenshotUrl: req.file.path,
      submittedAt:   new Date(),
    };

    // Save as current + push to history
    mill.paymentProof = proof;
    mill.paymentHistory.push(proof);
    await mill.save();

    // Non-blocking confirmation email
    sendPaymentProofReceivedEmail({ to: mill.email, ownerName: mill.ownerName, businessName: mill.businessName, tid })
      .catch(e => console.error("Payment proof email failed:", e));

    // Notify master admin
    transporter.sendMail({
      from: `"Agro Plus System" <${process.env.EMAIL_USER}>`,
      to:   process.env.EMAIL_USER,
      subject: `Payment Proof Submitted — ${mill.businessName}`,
      html: `<div style="font-family:monospace;padding:20px;background:#0f172a;color:#e2e8f0;border-radius:8px;">
        <h3 style="color:#34d399;margin:0 0 12px;">Payment Proof Received</h3>
        <p style="margin:3px 0;"><span style="color:#94a3b8;">Business:</span> ${mill.businessName}</p>
        <p style="margin:3px 0;"><span style="color:#94a3b8;">TID:</span> ${tid}</p>
        <p style="margin:3px 0;"><span style="color:#94a3b8;">Sender Bank:</span> ${senderBank}</p>
        <p style="margin:3px 0;"><span style="color:#94a3b8;">Sender Account:</span> ${senderTitle} / ${senderAccount}</p>
        <p style="margin:3px 0;"><span style="color:#94a3b8;">Sent To:</span> ${receivingBank}</p>
        <p style="margin:3px 0;"><span style="color:#94a3b8;">Amount:</span> Rs. ${amountSent}</p>
        <p style="margin:12px 0 0;color:#94a3b8;font-size:12px;">Login to the master portal to review and approve.</p>
      </div>`,
    }).catch(() => {});

    res.status(200).json({ message: "Payment proof submitted. Your account will be activated after verification." });
  } catch (error) {
    console.error("Submit Payment Proof Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};