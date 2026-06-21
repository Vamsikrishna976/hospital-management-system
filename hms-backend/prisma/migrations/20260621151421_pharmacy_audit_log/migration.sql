-- CreateTable
CREATE TABLE "PharmacyAuditLog" (
    "id" TEXT NOT NULL,
    "medicineName" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PharmacyAuditLog_pkey" PRIMARY KEY ("id")
);
