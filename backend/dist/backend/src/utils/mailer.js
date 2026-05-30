"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var mailer_exports = {};
__export(mailer_exports, {
  sendEmail: () => sendEmail,
  sendPasswordResetEmail: () => sendPasswordResetEmail
});
module.exports = __toCommonJS(mailer_exports);
var import_nodemailer = __toESM(require("nodemailer"));
let transporter = null;
async function getTransporter() {
  if (transporter) {
    return transporter;
  }
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (host && user && pass) {
    console.log("Using configured SMTP settings for mail delivery.");
    transporter = import_nodemailer.default.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE === "true" || port === 465,
      auth: {
        user,
        pass
      }
    });
    return transporter;
  }
  console.log("No SMTP configuration found. Creating an Ethereal.email test account...");
  try {
    const testAccount = await import_nodemailer.default.createTestAccount();
    transporter = import_nodemailer.default.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    console.log(`Ethereal test account created successfully: User: ${testAccount.user}`);
    return transporter;
  } catch (error) {
    console.error("Failed to create Ethereal test account, creating stub transporter:", error);
    return {
      sendMail: async (mailOptions) => {
        console.log("=== STUB MAIL SENDER ===");
        console.log(`To: ${mailOptions.to}`);
        console.log(`Subject: ${mailOptions.subject}`);
        console.log(`Body: ${mailOptions.text}`);
        console.log("========================");
        return { messageId: "stub-id" };
      }
    };
  }
}
async function sendEmail(options) {
  try {
    const mailTransporter = await getTransporter();
    const fromAddress = process.env.SMTP_FROM || '"ExpiryWise" <noreply@expirywise.com>';
    const info = await mailTransporter.sendMail({
      from: fromAddress,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    });
    console.log(`Email sent successfully! Message ID: ${info.messageId}`);
    const previewUrl = import_nodemailer.default.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`===========================================================`);
      console.log(`\u{1F4E7}  Email Preview URL (Ethereal): ${previewUrl}`);
      console.log(`===========================================================`);
    }
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email. Please try again.");
  }
}
async function sendPasswordResetEmail(email, resetToken) {
  const clientUrl = process.env.CLIENT_URL || "http://localhost:4200";
  const resetLink = `${clientUrl}/reset-password?token=${resetToken}`;
  const subject = "Reset your ExpiryWise Password";
  const text = `Hello,

We received a request to reset your password for your ExpiryWise account.
Copy and paste this link in your browser to reset your password:
${resetLink}

Your reset token is:
${resetToken}

This link and token will expire in 15 minutes.
If you did not request a password reset, please ignore this email.

Best regards,
The ExpiryWise Team`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #f8fafc;
          color: #0f172a;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
        }
        .container {
          max-width: 580px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .card {
          background-color: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          padding: 40px;
        }
        .logo-container {
          display: flex;
          align-items: center;
          margin-bottom: 24px;
        }
        .logo {
          font-size: 24px;
          margin-right: 8px;
        }
        .brand-name {
          font-size: 20px;
          font-weight: 700;
          color: #6366f1;
          letter-spacing: -0.025em;
        }
        h1 {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin-top: 0;
          margin-bottom: 16px;
        }
        p {
          font-size: 16px;
          line-height: 24px;
          color: #475569;
          margin-top: 0;
          margin-bottom: 24px;
        }
        .btn-container {
          margin-bottom: 24px;
          text-align: center;
        }
        .btn {
          display: inline-block;
          background-color: #6366f1;
          color: #ffffff !important;
          font-weight: 600;
          font-size: 16px;
          text-decoration: none;
          padding: 12px 32px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          transition: all 0.2s ease;
        }
        .btn:hover {
          background-color: #4f46e5;
        }
        .token-box {
          background-color: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
          text-align: center;
        }
        .token-title {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
          margin-bottom: 8px;
        }
        .token-value {
          font-family: 'Courier New', Courier, monospace;
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          word-break: break-all;
        }
        .warning-text {
          font-size: 14px;
          color: #64748b;
          margin-top: 24px;
          border-top: 1px solid #e2e8f0;
          padding-top: 24px;
        }
        .footer {
          text-align: center;
          margin-top: 32px;
          font-size: 12px;
          color: #94a3b8;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="logo-container">
            <span class="logo">\u{1F4E6}</span>
            <span class="brand-name">ExpiryWise</span>
          </div>
          <h1>Password Reset Request</h1>
          <p>Hello,</p>
          <p>We received a request to reset the password for your ExpiryWise account. Click the button below to choose a secure new password:</p>
          
          <div class="btn-container">
            <a href="${resetLink}" target="_blank" class="btn">Reset Password</a>
          </div>

          <p>If the button doesn't work, you can copy and paste the reset token directly in the application:</p>
          
          <div class="token-box">
            <div class="token-title">Reset Token</div>
            <div class="token-value">${resetToken}</div>
          </div>

          <p>Or paste this full URL into your web browser:</p>
          <p style="font-size: 13px; word-break: break-all; color: #6366f1;">
            <a href="${resetLink}" target="_blank" style="color: #6366f1; text-decoration: underline;">${resetLink}</a>
          </p>

          <p class="warning-text">This link and token will expire in <strong>15 minutes</strong>. If you did not request this, you can safely ignore this email \u2014 your password will remain secure.</p>
        </div>
        <div class="footer">
          &copy; ${(/* @__PURE__ */ new Date()).getFullYear()} ExpiryWise. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
  await sendEmail({
    to: email,
    subject,
    text,
    html
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendEmail,
  sendPasswordResetEmail
});
//# sourceMappingURL=mailer.js.map
