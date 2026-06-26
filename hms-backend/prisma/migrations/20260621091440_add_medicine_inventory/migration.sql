-- CreateTable
CREATE TABLE "MedicineInventory" (
    "id" TEXT NOT NULL,
    "medicineCode" TEXT NOT NULL,
    "medicineName" TEXT NOT NULL,
    "category" TEXT,
    "stockQuantity" INTEGER NOT NULL DEFAULT 0,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "expiryDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicineInventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicineInventory_medicineCode_key" ON "MedicineInventory"("medicineCode");
