-- CreateTable
CREATE TABLE "PharmacyBill" (
    "id" TEXT NOT NULL,
    "billNumber" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PharmacyBill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PharmacyBill_billNumber_key" ON "PharmacyBill"("billNumber");
