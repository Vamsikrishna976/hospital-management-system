import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const createMedicine = async (req: Request, res: Response) => {
  try {
    const {
      medicineCode,
      medicineName,
      category,
      stockQuantity,
      unitPrice,
      expiryDate,
    } = req.body;

    const medicine = await prisma.medicineInventory.create({
      data: {
        medicineCode,
        medicineName,
        category,
        stockQuantity,
        unitPrice,

        expiryDate: expiryDate ? new Date(expiryDate) : null,
      },
    });

    return res.status(201).json(medicine);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create medicine",
    });
  }
};

export const getMedicines = async (req: Request, res: Response) => {
  try {
    const medicines = await prisma.medicineInventory.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(medicines);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch medicines",
    });
  }
};

export const updateMedicine = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const medicine = await prisma.medicineInventory.update({
      where: { id },
      data: {
        medicineCode: req.body.medicineCode,
        medicineName: req.body.medicineName,
        category: req.body.category,
        stockQuantity: Number(req.body.stockQuantity),
        unitPrice: Number(req.body.unitPrice),
        expiryDate: req.body.expiryDate ? new Date(req.body.expiryDate) : null,
      },
    });

    return res.json(medicine);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Update failed",
    });
  }
};

export const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    await prisma.medicineInventory.delete({
      where: { id },
    });

    return res.json({
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Delete failed",
    });
  }
};

export const updateStock = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const { quantity, type } = req.body;

    const medicine = await prisma.medicineInventory.findUnique({
      where: { id },
    });

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    let newStock = medicine.stockQuantity;

    if (type === "IN") {
      newStock += Number(quantity);
    }

    if (type === "OUT") {
      newStock -= Number(quantity);
    }

    if (newStock < 0) {
      return res.status(400).json({
        message: "Insufficient stock",
      });
    }

    const updated = await prisma.medicineInventory.update({
      where: { id },
      data: {
        stockQuantity: newStock,
      },
    });

    await prisma.pharmacyAuditLog.create({
      data: {
        medicineName: medicine.medicineName,
        action: type === "IN" ? "STOCK_IN" : "STOCK_OUT",
        quantity: Number(quantity),
      },
    });

    await prisma.pharmacyAuditLog.create({
      data: {
        medicineName: medicine.medicineName,

        action: type === "IN" ? "STOCK_IN" : "STOCK_OUT",

        quantity: Number(quantity),
      },
    });

    return res.json(updated);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Stock update failed",
    });
  }
};

export const getAuditLogs = async (req: Request, res: Response) => {
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
      message: "Failed to fetch logs",
    });
  }
};
