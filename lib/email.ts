// src/lib/email.ts
"use server";
import nodemailer from "nodemailer";

export async function sendEmail({
  to,
  subject,
  text,
  html, // Optionally add HTML support
}: {
  to: string;
  subject: string;
  text: string;
  html?: string; // Make HTML optional
}) {

  const user = process.env.EMAIL_SERVER_USER;
  const pass = process.env.EMAIL_SERVER_APP_PASSWORD;
  const fromAddress = process.env.EMAIL_FROM || user; // Fallback to user email

  if (!user || !pass) {
     console.error("Email credentials (EMAIL_SERVER_USER or EMAIL_SERVER_APP_PASSWORD) are missing in .env");
     return {
        success: false,
        message: "Email server credentials not configured.",
     }
  }

  // Gmail SMTP server configuration
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Use 465 for SSL
    secure: true, // Use SSL
    auth: {
      user: user,
      pass: pass, // Use the App Password here
    },
    // Optional: Add connection timeout if needed
    // connectionTimeout: 10000, // 10 seconds
    // greetingTimeout: 10000, // 10 seconds
    // socketTimeout: 10000, // 10 seconds
  });

  // Define mail options
  const mailOptions: nodemailer.SendMailOptions = {
      from: `"DermaScan" <${fromAddress}>`, // Set a friendly 'from' name
      to: to.toLowerCase().trim(),
      subject: subject.trim(),
      text: text.trim(),
  };

  // Add HTML to mail options if provided
  if (html) {
      mailOptions.html = html;
  }

  try {
    console.log(`Sending email via Gmail from ${fromAddress} to ${to}...`);
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully via Gmail:", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); // Only works with ethereal test accounts

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error sending email via Gmail:", error);
    // Log specific details if available
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Nodemailer error details:", errorMessage);
    if ((error as any)?.code) console.error("Nodemailer error code:", (error as any).code);
    if ((error as any)?.command) console.error("Nodemailer error command:", (error as any).command);

    return {
      success: false,
      message: `Failed to send email via Gmail: ${errorMessage}`, // Include error message
    };
  }
}