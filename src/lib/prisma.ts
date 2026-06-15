import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/** SQLite : chemin absolu depuis la racine du projet (runtime Node.js uniquement). */
function resolveDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is not defined");
  }

  if (!url.startsWith("file:")) {
    return url;
  }

  const filePath = url.slice("file:".length);

  if (filePath.startsWith("/")) {
    return url;
  }

  const relative = filePath.replace(/^\.\//, "");
  return `file:${process.cwd()}/prisma/${relative}`;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: { url: resolveDatabaseUrl() },
    },
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
