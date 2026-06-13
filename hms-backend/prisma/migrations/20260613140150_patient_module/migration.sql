/*
  Warnings:

  - Added the required column `updatedAt` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `Patient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "alternateMobile" TEXT,
ADD COLUMN     "bloodGroup" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "emergencyContact" TEXT,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "pincode" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "address" SET NOT NULL;
