import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signInSchema } from "./zod";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { v4 as uuidv4 } from "uuid";

import { Adapter } from "next-auth/adapters";

const credentials = Credentials({
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    try {
      const validate = await signInSchema.parseAsync(credentials);
      const { email, password } = validate;

      const user = await db.user.findUnique({
        where: { email },
        include: { accounts: true },
      });

      if (!user || !user.password) {
        throw "account dont exist";
      }

      if (user.accounts[0]?.provider !== "credentials") {
        throw `Please sign in with ${user.accounts[0]?.provider}`;
      }

      const passwordmatch = await bcrypt.compare(password, user.password);

      if (!passwordmatch) {
        throw "invalid password";
      }

      return user;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientInitializationError ||
        error instanceof Prisma.PrismaClientUnknownRequestError
      ) {
        throw new Error("System Error Occured. Please Contact Support Team");
      }

      if (error instanceof ZodError) {
        throw new Error(error.errors[0].message!);
      }

      throw error;
    }
  },
});

const config = {
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: "database",
  },
  providers: [credentials],
  callbacks: {
    async jwt({ account, user, token }) {
      if (account?.provider === "credentials") {
        const sessionToken = uuidv4();
        const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);

        const session = await PrismaAdapter(db).createSession!({
          userId: user.id!,
          sessionToken,
          expires,
        });
        token.sessionId = session.sessionToken;
      }
      return token;
    },
    session({ session }) {
      if (!session.user) return session;
      const user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        emailVerified: session.user.emailVerified,
        image: session.user.image,
        role: session.user.role,
      };
      session.user = user;
      return session;
    },
  },
  jwt: {
    async encode({ token }) {
      return token?.sessionId as unknown as string;
    },
  },
  events: {
    async signOut(message) {
      if ("session" in message && message.session?.sessionToken) {
        await db.session.deleteMany({
          where: {
            sessionToken: message.session.sessionToken,
          },
        });
      }
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/",
  },
  trustHost: true,
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);
