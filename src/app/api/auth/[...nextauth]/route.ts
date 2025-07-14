// src/app/api/auth/[...nextauth]/route.ts

// 🔒 Auth temporarily disabled for build/testing
// import { authOptions } from "@/lib/api/auth/auth";
// import NextAuth from "next-auth";

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

// ✅ Placeholder to prevent route crash during build
export async function GET() {
  return Response.json({ message: "Auth temporarily disabled (GET)" });
}

export async function POST() {
  return Response.json({ message: "Auth temporarily disabled (POST)" });
}
