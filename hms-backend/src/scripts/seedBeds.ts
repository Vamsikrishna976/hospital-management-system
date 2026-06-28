import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const wards = [
    "General",
    "ICU",
    "VIP",
    "Emergency",
    "Pediatrics",
  ];

  for (const ward of wards) {
    for (let room = 1; room <= 5; room++) {
      for (let bed = 1; bed <= 2; bed++) {
        await prisma.bed.create({
          data: {
            ward,
            roomNumber: `${room}`,
            bedNumber: `${ward}-${room}-${bed}`,
          },
        });
      }
    }
  }

  console.log("✅ Beds seeded successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });