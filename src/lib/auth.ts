import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import Credentials from "next-auth/providers/credentials";

import { db } from "@/db/drizzle";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";

import { eq } from "drizzle-orm";
import { signInSchema } from "./zod";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log(credentials);

        const { email, password } = await signInSchema.parseAsync(credentials);

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        const passwordMatch = await bcrypt.compare(password, user[0].password!);

        if (passwordMatch) {
          return {
            id: user[0].id,
            name: user[0].name,
            email: user[0].email,
            image: user[0].image,
          };
        }

        return null;
      },
    }),
  ],
});
