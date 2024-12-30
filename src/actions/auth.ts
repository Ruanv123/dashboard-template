"use server";

import { signIn } from "@/lib/auth";
import { SignInSchema } from "@/lib/zod";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function loginAction(data: SignInSchema) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      redirectTo: "/",
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error.type === "CredentialsSignin") {
      return { success: false, message: "Dados de login incorretos." };
    }

    console.log(error);
    return { success: false, message: "Ops, algum erro aconteceu!" };
  }
}
