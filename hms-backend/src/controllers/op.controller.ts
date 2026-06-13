import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const createOP = async (req: Request, res: Response) => {
  try {
    const count = await prisma.oPRecord.count();
    console.log(req.body);

    const opNumber = `OP-2026-${String(count + 1).padStart(5, "0")}`;

    const {
      patientId,
      bloodPressure,
      sugarLevel,
      weight,
      height,
      temperature,
      pulseRate,
      spo2,
    } = req.body;

    const bmi = weight && height ? weight / Math.pow(height / 100, 2) : null;

    const op = await prisma.oPRecord.create({
      data: {
        opNumber,
        patientId,
        bloodPressure,
        sugarLevel,
        weight,
        height,
        bmi,
        temperature,
        pulseRate,
        spo2,
      },
    });

    return res.status(201).json(op);
  } catch (error) {
    console.error("OP CREATE ERROR:");
    console.error(error);

    return res.status(500).json({
      message: "Failed to create OP",
      error,
    });
  }
};
