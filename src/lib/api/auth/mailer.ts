// src/lib/api/auth/mailer.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail({
  email,
  fullName,
  verificationUrl,
}: {
  email: string;
  fullName: string;
  verificationUrl: string;
}) {
  try {
    const result = await resend.emails.send({
      from: "no-reply@yourdomain.com", // 🔁 replace with your verified sender
      to: [email],
      subject: "Welcome to Our Platform – Please Verify Your Email",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2>Welcome, ${fullName}!</h2>
          <p>Thanks for signing up. Please verify your email address to activate your account.</p>
          <p>
            <a href="${verificationUrl}" style="background-color: #0070f3; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
              Verify My Email
            </a>
          </p>
          <p>If you didn’t create an account, you can safely ignore this email.</p>
          <hr />
          <p style="font-size: 12px;">© ${new Date().getFullYear()} Your Company Name</p>
        </div>
      `,
    });

    return result;
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw new Error("Failed to send verification email");
  }
}
