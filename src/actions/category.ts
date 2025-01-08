"use server";

import { db } from "@/lib/db";

interface Formdata {
  name: string;
  description?: string;
}

export async function createCategory({ name, description }: Formdata) {
  try {
    await db.category.create({
      data: {
        name: name,
        description: description,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
