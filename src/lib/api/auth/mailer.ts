// // src/lib/api/auth/mailer.ts
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function sendVerificationEmail({
//   email,
//   fullName,
//   verificationUrl,
// }: {
//   email: string;
//   fullName: string;
//   verificationUrl: string;
// }) {
//   try {
//     const result = await resend.emails.send({
//       from: "no-reply@yourdomain.com", // 🔁 replace with your verified sender
//       to: [email],
//       subject: "Welcome to Our Platform – Please Verify Your Email",
//       html: `
//         <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
//           <h2>Welcome, ${fullName}!</h2>
//           <p>Thanks for signing up. Please verify your email address to activate your account.</p>
//           <p>
//             <a href="${verificationUrl}" style="background-color: #0070f3; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
//               Verify My Email
//             </a>
//           </p>
//           <p>If you didn’t create an account, you can safely ignore this email.</p>
//           <hr />
//           <p style="font-size: 12px;">© ${new Date().getFullYear()} Your Company Name</p>
//         </div>
//       `,
//     });

//     return result;
//   } catch (error) {
//     console.error("Failed to send verification email:", error);
//     throw new Error("Failed to send verification email");
//   }
// }

// Delete below to enable mailer as normal
// src/lib/api/auth/mailer.ts
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

let resend: Resend | null = null;

if (resendApiKey) {
  resend = new Resend(resendApiKey);
} else {
  console.warn("⚠️ RESEND_API_KEY is missing. Email sending will be skipped.");
}

/**
 * Sends a verification email to a new user.
 * Falls back to console log if no API key is provided.
 */
export async function sendVerificationEmail({
  email,
  fullName,
  verificationUrl,
}: {
  email: string;
  fullName: string;
  verificationUrl: string;
}) {
  if (!resend) {
    console.log("📭 Skipped email send:");
    console.log(`To: ${email}`);
    console.log(`Name: ${fullName}`);
    console.log(`Verify URL: ${verificationUrl}`);
    return { skipped: true };
  }

  try {
    const result = await resend.emails.send({
      from: "no-reply@yourdomain.com", // 🔁 change to your verified sender
      to: [email],
      subject: "Welcome – Please Verify Your Email",
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
    console.error("❌ Failed to send verification email:", error);
    throw new Error("Email send failed");
  }
}
