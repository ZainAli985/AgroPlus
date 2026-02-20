import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // can change later
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ===============================
   SEND EMPLOYEE CREDENTIALS
================================== */
export const sendEmployeeCredentials = async (
  email,
  firstName,
  username,
  password,
  role
) => {
  try {
    await transporter.sendMail({
      from: `"AL REHMAN RICE MILL" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Account Has Been Created",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Welcome ${firstName},</h2>
          <p>Your account has been successfully created.</p>

          <h3>Login Details:</h3>
          <p><strong>Username:</strong> ${username}</p>
          <p><strong>Password:</strong> ${password}</p>
          <p><strong>Role:</strong> ${role}</p>

          <br/>
          <p>Please change your password after login.</p>

          <br/>
          <p>Regards,<br/>AL REHMAN RICE MILL</p>
        </div>
      `,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email sending failed:", error.message);
  }
};