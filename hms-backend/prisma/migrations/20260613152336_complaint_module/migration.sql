-- CreateTable
CREATE TABLE "Complaint" (
    "id" TEXT NOT NULL,
    "opRecordId" TEXT NOT NULL,
    "chiefComplaint" TEXT NOT NULL,
    "symptoms" TEXT NOT NULL,
    "duration" TEXT,
    "previousMedication" TEXT,
    "clinicalNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Complaint_opRecordId_key" ON "Complaint"("opRecordId");

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_opRecordId_fkey" FOREIGN KEY ("opRecordId") REFERENCES "OPRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
