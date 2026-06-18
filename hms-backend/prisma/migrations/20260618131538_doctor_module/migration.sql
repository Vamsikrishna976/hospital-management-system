/*
  Warnings:

  - You are about to drop the column `availability` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `doctorNumber` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Doctor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[doctorCode]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `doctorCode` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Doctor_doctorNumber_key";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "availability",
DROP COLUMN "department",
DROP COLUMN "doctorNumber",
DROP COLUMN "experience",
DROP COLUMN "name",
ADD COLUMN     "doctorCode" TEXT NOT NULL,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "mobile" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "qualification" DROP NOT NULL,
ALTER COLUMN "consultationFee" SET DEFAULT 500;

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_doctorCode_key" ON "Doctor"("doctorCode");
