import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const getPendingPrescriptions = async (req: Request, res: Response) => {
  try {
    const prescriptions = await prisma.prescription.findMany({
      where: {
        dispensed: false,
      },
      include: {
        medicines: true,
      },
    });

    return res.json(prescriptions);
  } catch (error) {
    console.error(error);

    return res.status(500).json(error);
  }
};

export const dispensePrescription = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const prescription = await prisma.prescription.findUnique({
      where: {
        id,
      },
      include: {
        medicines: true,
      },
    });

    if (!prescription) {
      return res.status(404).json({
        message: "Prescription not found",
      });
    }

    for (const medicine of prescription.medicines) {
      const inventoryMedicine = await prisma.medicineInventory.findFirst({
        where: {
          medicineName: medicine.medicineName,
        },
      });

      if (inventoryMedicine) {
        await prisma.medicineInventory.update({
          where: {
            id: inventoryMedicine.id,
          },
          data: {
            stockQuantity: inventoryMedicine.stockQuantity - 1,
          },
        });

        await prisma.pharmacyAuditLog.create({
          data: {
            medicineName: inventoryMedicine.medicineName,

            action: "DISPENSED",

            quantity: 1,
          },
        });
      }
    }

    await prisma.prescription.update({
      where: {
        id,
      },
      data: {
        dispensed: true,
      },
    });

    return res.json({
      message: "Prescription dispensed successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Dispense failed",
    });
  }
};

export const getPharmacyAuditLogs = async (
  req: Request,
  res: Response
) => {
  try {
    const logs = await prisma.pharmacyAuditLog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(logs);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch pharmacy logs",
    });
  }
};
