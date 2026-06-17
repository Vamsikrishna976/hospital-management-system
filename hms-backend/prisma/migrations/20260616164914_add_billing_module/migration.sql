/*
  Warnings:

  - You are about to drop the `Consultation` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID');

-- DropTable
DROP TABLE "Consultation";

-- CreateTable
CREATE TABLE "Billing" (
    "id" TEXT NOT NULL,
    "opRecordId" TEXT NOT NULL,
    "consultationFee" DOUBLE PRECISION NOT NULL,
    "medicineFee" DOUBLE PRECISION NOT NULL,
    "labFee" DOUBLE PRECISION NOT NULL,
    "otherFee" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Billing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Billing_opRecordId_key" ON "Billing"("opRecordId");

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_opRecordId_fkey" FOREIGN KEY ("opRecordId") REFERENCES "OPRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
