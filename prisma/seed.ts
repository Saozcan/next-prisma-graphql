import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "admin",
      email: "blabla@gmail.com",
      role: "ADMIN",
    },
  });
}

main()
  .catch((e) => {
    console.log("seed Error", e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
