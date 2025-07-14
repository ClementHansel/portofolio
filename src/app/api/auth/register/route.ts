// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/api/auth/mailer";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { fullName, email, password, confirmPassword, phone, title } =
      await req.json();

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

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
        phone,
        title,
        emailVerified: null, // email still needs verification
      },
    });

    // 🔐 Optional: generate token for later verification (implement separately if needed)
    // const token = crypto.randomUUID();

    // Save token in DB if you want to manually verify via link:
    // await prisma.verificationToken.create({ data: { identifier: email, token, expires: ... } });

    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify?email=${email}`; // or with token param

    await sendVerificationEmail({
      email,
      fullName,
      verificationUrl,
    });

    return NextResponse.json(
      {
        message: "Registration successful. Check your email to verify.",
        userId: newUser.id,
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
