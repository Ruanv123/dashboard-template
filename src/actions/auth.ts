"use server";

import { signIn } from "@/lib/auth";
import { SignInSchema } from "@/lib/zod";
import { AuthError } from "next-auth";

export async function loginAction(data: SignInSchema) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
