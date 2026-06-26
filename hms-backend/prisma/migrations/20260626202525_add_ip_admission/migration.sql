-- CreateTable
CREATE TABLE "IPAdmission" (
    "id" TEXT NOT NULL,
    "admissionNo" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "ward" TEXT NOT NULL,
    "bedNumber" TEXT NOT NULL,
    "admittedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dischargeDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'ADMITTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IPAdmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IPAdmission_admissionNo_key" ON "IPAdmission"("admissionNo");

-- AddForeignKey
ALTER TABLE "IPAdmission" ADD CONSTRAINT "IPAdmission_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
