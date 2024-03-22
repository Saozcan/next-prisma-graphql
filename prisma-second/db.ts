import { PrismaClient } from "@internal/prisma-second/client";

export const prisma_2 = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
