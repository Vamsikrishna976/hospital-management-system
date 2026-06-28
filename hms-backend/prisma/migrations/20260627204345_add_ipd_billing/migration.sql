-- CreateTable
CREATE TABLE "IPDBill" (
    "id" TEXT NOT NULL,
    "billNumber" TEXT NOT NULL,
    "admissionId" TEXT NOT NULL,
    "roomCharges" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "doctorCharges" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "labCharges" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "pharmacyCharges" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "otherCharges" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IPDBill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IPDBill_billNumber_key" ON "IPDBill"("billNumber");

-- CreateIndex
CREATE UNIQUE INDEX "IPDBill_admissionId_key" ON "IPDBill"("admissionId");

-- AddForeignKey
ALTER TABLE "IPDBill" ADD CONSTRAINT "IPDBill_admissionId_fkey" FOREIGN KEY ("admissionId") REFERENCES "IPAdmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
