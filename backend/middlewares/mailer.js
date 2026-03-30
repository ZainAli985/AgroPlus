// utils/emailService.js
// ─────────────────────────────────────────────────────────────────────────────
// Nodemailer configured for Gmail with Railway-compatible settings.
//
// Railway (and many cloud platforms) block outbound port 587 (STARTTLS).
// Fix: use port 465 with SSL (secure: true) instead.
//
// Gmail setup:
//   1. Enable 2-Factor Authentication on your Google account
//   2. Go to myaccount.google.com → Security → App Passwords
//   3. Create an App Password (16-char code, no spaces)
//   4. Set EMAIL_USER and EMAIL_PASS in your .env
//
// .env:
//   EMAIL_USER=your@gmail.com
//   EMAIL_PASS=xxxx xxxx xxxx xxxx   ← App Password (spaces ok, nodemailer strips them)
// ─────────────────────────────────────────────────────────────────────────────
import nodemailer from "nodemailer";

// Lazy-create the transporter so missing env vars don't crash startup
let _transporter = null;

function getTransporter() {
  if (_transporter) return _transporter;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("⚠️  Email not configured: EMAIL_USER or EMAIL_PASS missing in .env");
    return null;
  }

  _transporter = nodemailer.createTransport({
    host:   "smtp.gmail.com",
    port:   465,        // ← SSL port — works on Railway (port 587/STARTTLS is often blocked)
    secure: true,       // true = SSL from the start (required for port 465)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS.replace(/\s/g, ""),  // strip spaces from App Password
    },
    // Railway can be slow to establish connections — increase timeouts
    connectionTimeout: 15000,  // 15s
    greetingTimeout:   10000,  // 10s
    socketTimeout:     15000,  // 15s
  });

  return _transporter;
}

// ── Generic send helper ───────────────────────────────────────────────────────
async function sendMail({ to, subject, html }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("Email skipped — transporter not configured");
    return false;
  }
  try {
    await transporter.sendMail({
      from: `"Agro Plus" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`✅ Email sent to ${to}: ${subject}`);
    return true;
  } catch (err) {
    console.error(`❌ Email failed to ${to}:`, err.message);
    return false;
  }
}

// ── Employee welcome email ────────────────────────────────────────────────────
export const sendEmployeeCredentials = async (
  email, firstName, username, password, role
) => {
  return sendMail({
    to: email,
    subject: "Your Account Has Been Created — Agro Plus",
    html: `
      <div style="font-family:'DM Sans',Arial,sans-serif;max-width:520px;margin:auto;
                  background:#f9fafb;border-radius:10px;overflow:hidden;
                  border:1px solid #e5e7eb;">
        <div style="background:#111827;padding:28px 32px;">
          <h2 style="color:#fff;margin:0;font-size:20px;font-weight:700;">Agro Plus</h2>
          <p style="color:#9ca3af;margin:6px 0 0;font-size:13px;">by ORCA TECH. AND VENTURES</p>
        </div>
        <div style="padding:32px;">
          <h3 style="color:#111827;margin:0 0 8px;font-size:18px;">
            Welcome, ${firstName}!
          </h3>
          <p style="color:#6b7280;font-size:13.5px;line-height:1.6;margin:0 0 24px;">
            Your account has been created. Use the credentials below to sign in.
          </p>
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <tr>
              <td style="padding:10px 14px;background:#f3f4f6;border-radius:6px 0 0 0;
                          color:#6b7280;font-weight:600;width:35%;">Username</td>
              <td style="padding:10px 14px;background:#f9fafb;border-radius:0 6px 0 0;
                          font-family:monospace;color:#111827;">${username}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;background:#f3f4f6;color:#6b7280;font-weight:600;">
                Password</td>
              <td style="padding:10px 14px;background:#f9fafb;
                          font-family:monospace;color:#111827;">${password}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;background:#f3f4f6;border-radius:0 0 0 6px;
                          color:#6b7280;font-weight:600;">Role</td>
              <td style="padding:10px 14px;background:#f9fafb;border-radius:0 0 6px 0;
                          color:#111827;">${role}</td>
            </tr>
          </table>
          <p style="color:#9ca3af;font-size:12px;margin:20px 0 0;line-height:1.6;">
            Please change your password after your first login.
          </p>
        </div>
        <div style="background:#f3f4f6;padding:14px 32px;border-top:1px solid #e5e7eb;">
          <p style="color:#d1d5db;font-size:11px;margin:0;">
            © ${new Date().getFullYear()} Agro Plus · ORCA TECH. AND VENTURES
          </p>
        </div>
      </div>
    `,
  });
};

// ── Billing reminder email ────────────────────────────────────────────────────
export const sendBillingReminder = async (email, businessName, dueDate, amount) => {
  return sendMail({
    to: email,
    subject: `Payment Reminder — ${businessName}`,
    html: `
      <div style="font-family:'DM Sans',Arial,sans-serif;max-width:520px;margin:auto;
                  background:#f9fafb;border-radius:10px;overflow:hidden;
                  border:1px solid #e5e7eb;">
        <div style="background:#111827;padding:28px 32px;">
          <h2 style="color:#fff;margin:0;font-size:20px;">Agro Plus</h2>
        </div>
        <div style="padding:32px;">
          <h3 style="color:#111827;margin:0 0 8px;">Payment Reminder</h3>
          <p style="color:#6b7280;font-size:13.5px;line-height:1.6;margin:0 0 16px;">
            Dear <strong>${businessName}</strong>,
          </p>
          <p style="color:#6b7280;font-size:13.5px;line-height:1.6;margin:0 0 16px;">
            Your monthly subscription payment of <strong>Rs ${Number(amount||0).toLocaleString()}</strong>
            is due on <strong>${dueDate}</strong>.
          </p>
          <p style="color:#9ca3af;font-size:12px;margin:0;">
            Please contact your account manager if you have any questions.
          </p>
        </div>
      </div>
    `,
  });
};