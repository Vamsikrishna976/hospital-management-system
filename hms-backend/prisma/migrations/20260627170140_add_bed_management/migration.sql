/*
  Warnings:

  - You are about to drop the column `bedNumber` on the `IPAdmission` table. All the data in the column will be lost.
  - You are about to drop the column `roomNumber` on the `IPAdmission` table. All the data in the column will be lost.
  - You are about to drop the column `ward` on the `IPAdmission` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BedStatus" AS ENUM ('AVAILABLE', 'OCCUPIED', 'MAINTENANCE');

-- AlterTable
ALTER TABLE "IPAdmission" DROP COLUMN "bedNumber",
DROP COLUMN "roomNumber",
DROP COLUMN "ward",
ADD COLUMN     "bedId" TEXT;

-- CreateTable
CREATE TABLE "Bed" (
    "id" TEXT NOT NULL,
    "bedNumber" TEXT NOT NULL,
    "ward" TEXT NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "status" "BedStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bed_bedNumber_key" ON "Bed"("bedNumber");

-- AddForeignKey
ALTER TABLE "IPAdmission" ADD CONSTRAINT "IPAdmission_bedId_fkey" FOREIGN KEY ("bedId") REFERENCES "Bed"("id") ON DELETE SET NULL ON UPDATE CASCADE;
