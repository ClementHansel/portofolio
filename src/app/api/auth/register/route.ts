// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/api/auth/mailer";

// 🔒 Disabled for now to allow build without DB
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { fullName, email, password, confirmPassword } = await req.json();

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Required fields missing." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 }
      );
    }

    // const existingUser = await prisma.user.findUnique({
    //   where: { email },
    // });

    // if (existingUser) {
    //   return NextResponse.json(
    //     { error: "User with this email already exists." },
    //     { status: 409 }
    //   );
    // }

    // const hashedPassword = await bcrypt.hash(password, 10);

    // const newUser = await prisma.user.create({
    //   data: {
    //     name: fullName,
    //     email,
    //     password: hashedPassword,
    //     phone,
    //     title,
    //     emailVerified: null,
    //   },
    // });

    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify?email=${email}`;

    await sendVerificationEmail({
      email,
      fullName,
      verificationUrl,
    });

    return NextResponse.json(
      {
        message:
          "Registration simulated. Check your email to verify (email may not send if key is unset).",
        // userId: newUser.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
