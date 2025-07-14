import { AuthOptions, User, Account, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { sendVerificationEmail } from "./mailer";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    // 🔐 Email + Password login
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.emailVerified || !user.password) return null;

        const isValid = await compare(credentials.password, user.password);
        return isValid ? user : null;
      },
    }),

    // 🌐 Google login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth",
    verifyRequest: "/auth?mode=verify",
    error: "/auth?mode=error",
  },

  callbacks: {
    // 🧠 Runs when JWT is created or updated
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: User | null;
      account?: Account | null;
    }): Promise<JWT> {
      if (user) {
        token.sub = user.id;

        // 🌟 Handle first-time Google login
        if (account?.provider === "google" && user.email) {
          const existing = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (existing && !existing.emailVerified) {
            await prisma.user.update({
              where: { email: user.email },
              data: { emailVerified: new Date() },
            });

            await sendVerificationEmail({
              email: user.email,
              fullName: user.name ?? "User",
              verificationUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
            });
          }
        }
      }

      return token;
    },

    // 📦 Attach user ID to session
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (token?.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
