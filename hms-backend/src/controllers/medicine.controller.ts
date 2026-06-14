import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const addMedicine = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      prescriptionId,
      medicineName,
      dosage,
      frequency,
      duration,
    } = req.body;

    const medicine =
      await prisma.medicine.create({
        data: {
          prescriptionId,
          medicineName,
          dosage,
          frequency,
          duration,
        },
      });

    return res.status(201).json({
      message: "Medicine Added",
      data: medicine,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to add medicine",
    });
  }
};