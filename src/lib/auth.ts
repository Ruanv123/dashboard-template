import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signInSchema } from "./zod";

const adapter = PrismaAdapter(db);

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {},
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const validatedFields = signInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await db.user.findUnique({ where: { email } });
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
  // callbacks: {
  //   async signIn({ user, account }) {
  //     if (account?.provider !== "credentials") return true;

  //     const existingUser = await db.user.findUnique({
  //       where: { id: user.id },
  //     });

  //     if (!existingUser) return false;

  //     return true;
  //   },
  //   async session({ session, token }) {
  //     if (token.sub && session.user) {
  //       session.user.id = token.sub;
  //     }

  //     if (token.role && session.user) {
  //       session.user.role = token.role as string;
  //     }

  //     if (session.user) {
  //       session.user.name = token.name;
  //       session.user.email = token.email as string;
  //       session.user.image = token.picture;
  //     }

  //     return session;
  //   },
  //   async jwt({ token }) {
  //     if (!token.sub) return token;

  //     const existingUser = await db.user.findUnique({
  //       where: {
  //         id: token.sub as string,
  //       },
  //     });

  //     if (!existingUser) return token;

  //     token.name = existingUser.name;
  //     token.email = existingUser.email;
  //     token.picture = existingUser.image;
  //     token.role = existingUser.role;

  //     return token;
  //   },
  // },
});
