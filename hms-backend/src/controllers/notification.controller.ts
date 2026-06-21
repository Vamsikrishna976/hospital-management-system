import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const getNotifications = async (
  req: Request,
  res: Response
) => {
  try {
    const medicines =
      await prisma.medicineInventory.findMany();

    const lowStock = medicines.filter(
      (medicine) => medicine.stockQuantity < 20
    );

    const expiringSoon = medicines.filter(
      (medicine) => {
        if (!medicine.expiryDate) return false;

        const expiry = new Date(
          medicine.expiryDate
        );

        const today = new Date();

        const diffDays =
          (expiry.getTime() -
            today.getTime()) /
          (1000 * 60 * 60 * 24);

        return (
          diffDays <= 30 &&
          diffDays >= 0
        );
      }
    );

    return res.json({
      lowStockCount: lowStock.length,
      expiringSoonCount:
        expiringSoon.length,
      lowStock,
      expiringSoon,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message:
        "Failed to load notifications",
    });
  }
};