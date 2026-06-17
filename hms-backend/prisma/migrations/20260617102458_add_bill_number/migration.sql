/*
  Warnings:

  - The `paymentStatus` column on the `Billing` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[billNumber]` on the table `Billing` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Billing" ADD COLUMN     "billNumber" TEXT,
DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "Billing_billNumber_key" ON "Billing"("billNumber");
