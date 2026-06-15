import "dotenv/config";
import { defineConfig } from "prisma/config";

// Fallback pour `prisma generate` en CI (Cloudflare build) quand DATABASE_URL
// n'est pas encore injectée — generate n'ouvre pas de connexion réelle.
const databaseUrl =
  process.env.DATABASE_URL ??
  "postgresql://placeholder:placeholder@localhost:5432/placeholder?schema=public";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: databaseUrl,
  },
});
