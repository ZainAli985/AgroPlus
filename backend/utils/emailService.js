// utils/emailService.js
// ─────────────────────────────────────────────────────────────────────────────
// Email via Resend API — my-agroplus.com domain
//
// Resend is used because:
//   - Domain my-agroplus.com is already verified on Resend
//   - More reliable delivery than Gmail SMTP on Railway
//   - No SMTP port issues (uses HTTPS REST API)
//
// .env requirements:
//   RESEND_API_KEY=re_...
//   FROM_EMAIL=support@my-agroplus.com
// ─────────────────────────────────────────────────────────────────────────────

const RESEND_API_URL = "https://api.resend.com/emails";

function getFromEmail() {
  return process.env.FROM_EMAIL || "support@my-agroplus.com";
}

// ── Core send helper ─────────────────────────────────────────────────────────
export async function sendMail({ to, subject, html, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("⚠️  RESEND_API_KEY missing — email skipped");
    return false;
  }

  try {
    const res = await fetch(RESEND_API_URL, {
      method:  "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type":  "application/json",
      },
      body: JSON.stringify({
        from:     `Agro Plus <${getFromEmail()}>`,
        to:       Array.isArray(to) ? to : [to],
        subject,
        html,
        ...(replyTo && { reply_to: replyTo }),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(`❌ Resend error → ${to}:`, data);
      return false;
    }

    console.log(`✅ Email sent → ${to}: ${subject} (id: ${data.id})`);
    return true;
  } catch (err) {
    console.error(`❌ Email failed → ${to}:`, err.message);
    return false;
  }
}

// ── Employee welcome email ────────────────────────────────────────────────────
export const sendEmployeeCredentials = async (
  email, firstName, username, password, role
) => {
  return sendMail({
    to:      email,
    subject: "Your Account Has Been Created — Agro Plus",
    html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:520px;margin:auto;
                  background:#f9fafb;border-radius:10px;overflow:hidden;
                  border:1px solid #e5e7eb;">
        <div style="background:#111827;padding:28px 32px;">
          <h2 style="color:#fff;margin:0;font-size:20px;font-weight:700;">Agro Plus</h2>
          <p style="color:#9ca3af;margin:6px 0 0;font-size:13px;">by ORCA TECH. AND VENTURES</p>
        </div>
        <div style="padding:32px;">
          <h3 style="color:#111827;margin:0 0 8px;font-size:18px;">Welcome, ${firstName}!</h3>
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
              <td style="padding:10px 14px;background:#f3f4f6;color:#6b7280;font-weight:600;">Password</td>
              <td style="padding:10px 14px;background:#f9fafb;font-family:monospace;color:#111827;">${password}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;background:#f3f4f6;border-radius:0 0 0 6px;
                          color:#6b7280;font-weight:600;">Role</td>
              <td style="padding:10px 14px;background:#f9fafb;border-radius:0 0 6px 0;
                          color:#111827;">${role}</td>
            </tr>
          </table>
          <p style="color:#9ca3af;font-size:12px;margin:20px 0 0;line-height:1.6;">
            Please change your password after your first login.<br/>
            Sign in at: <a href="${process.env.APP_URL || "https://www.my-agroplus.com"}"
              style="color:#065f46;font-weight:600;">${process.env.APP_URL || "https://www.my-agroplus.com"}</a>
          </p>
        </div>
        <div style="background:#f3f4f6;padding:14px 32px;border-top:1px solid #e5e7eb;">
          <p style="color:#d1d5db;font-size:11px;margin:0;">
            © ${new Date().getFullYear()} Agro Plus · ORCA TECH. AND VENTURES ·
            <a href="mailto:support@my-agroplus.com" style="color:#9ca3af;text-decoration:none;">
              support@my-agroplus.com
            </a>
          </p>
        </div>
      </div>
    `,
  });
};

// ── Billing reminder email ────────────────────────────────────────────────────
export const sendBillingReminder = async (email, businessName, dueDate, amount) => {
  return sendMail({
    to:      email,
    subject: `Payment Reminder — ${businessName}`,
    html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:520px;margin:auto;
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
            Your subscription payment of <strong>Rs ${Number(amount||0).toLocaleString()}</strong>
            is due on <strong>${dueDate}</strong>.
          </p>
          <p style="color:#6b7280;font-size:13.5px;line-height:1.6;margin:0;">
            Transfer to: <strong>HBL — ALI RAZA SALEEM — A/C: 02967901869503</strong>
          </p>
        </div>
        <div style="background:#f3f4f6;padding:14px 32px;border-top:1px solid #e5e7eb;">
          <p style="color:#d1d5db;font-size:11px;margin:0;">
            © ${new Date().getFullYear()} Agro Plus · support@my-agroplus.com
          </p>
        </div>
      </div>
    `,
  });
};