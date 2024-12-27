"use server";

import { signIn } from "@/lib/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function loginAction(_prevState: any, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: true,
      redirectTo: "/",
    });
  } catch (error: any) {
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
