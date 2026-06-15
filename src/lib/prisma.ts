import { cache } from "react";
import { PrismaClient } from "../../generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

function resolveAccelerateUrl(): string {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is not defined");
  }

  if (url.startsWith("prisma+") || url.startsWith("prisma://")) {
    return url;
  }

  throw new Error(
    "DATABASE_URL must be a Prisma Accelerate URL (prisma+postgres://...) for Cloudflare Workers. " +
      "Enable Accelerate in console.prisma.io and use DIRECT_DATABASE_URL for migrations/seed."
  );
}

/**
 * Client Prisma via Accelerate (HTTP) — compatible Cloudflare Workers, sans driver pg.
 */
export const getPrisma = cache(() => {
  const accelerateUrl = resolveAccelerateUrl();
  return new PrismaClient({ accelerateUrl }).$extends(
    withAccelerate()
  ) as unknown as PrismaClient;
});

/** Accès lazy — délègue à getPrisma() à chaque appel. */
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrisma();
    const value = client[prop as keyof PrismaClient];
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(client)
      : value;
  },
});

export default prisma;
