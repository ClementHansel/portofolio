// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// 🔒 Disabled DB for build safety
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // const user = await prisma.user.findUnique({
    //   where: { email },
    // });

    // if (!user || !user.password) {
    //   return NextResponse.json(
    //     { error: "Invalid credentials." },
    //     { status: 401 }
    //   );
    // }

    // const passwordMatch = await bcrypt.compare(password, user.password);

    // if (!passwordMatch) {
    //   return NextResponse.json(
    //     { error: "Invalid credentials." },
    //     { status: 401 }
    //   );
    // }

    // ✅ Simulated success response
    return NextResponse.json(
      {
        message: "Simulated login successful",
        user: {
          id: "mock-id",
          name: "Mock User",
          email: email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
