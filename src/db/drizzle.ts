import { config } from "dotenv";
import { drizzle } from "drizzle-orm/better-sqlite3";

config({ path: ".env" }); // or .env.local

export const db = drizzle(process.env.DATABASE_URL!);
