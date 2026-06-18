import bcrypt from "bcryptjs";
import prisma from "./src/utils/prisma.ts";

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Administrator",
      email: "admin@hms.com",
      phone: "9999999999",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin created:", admin);
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });