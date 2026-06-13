-- CreateTable
CREATE TABLE "OPRecord" (
    "id" TEXT NOT NULL,
    "opNumber" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "bloodPressure" TEXT,
    "sugarLevel" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "bmi" DOUBLE PRECISION,
    "temperature" DOUBLE PRECISION,
    "pulseRate" INTEGER,
    "spo2" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OPRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OPRecord_opNumber_key" ON "OPRecord"("opNumber");

-- AddForeignKey
ALTER TABLE "OPRecord" ADD CONSTRAINT "OPRecord_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
