import { PrismaClient } from "@prisma/client";

export const prisma_1 = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
