-- CreateTable
CREATE TABLE "PharmacyBillItem" (
    "id" TEXT NOT NULL,
    "billId" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PharmacyBillItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PharmacyBillItem" ADD CONSTRAINT "PharmacyBillItem_billId_fkey" FOREIGN KEY ("billId") REFERENCES "PharmacyBill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyBillItem" ADD CONSTRAINT "PharmacyBillItem_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "MedicineInventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
