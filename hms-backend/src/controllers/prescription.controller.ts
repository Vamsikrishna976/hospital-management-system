import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const createPrescription = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      appointmentId,
      diagnosis,
      notes,
      followUpDate,
      medicines,
    } = req.body;

    const prescription =
      await prisma.prescription.create({
        data: {
          appointmentId,
          diagnosis,
          notes,
          followUpDate,
          medicines: {
            create: medicines,
          },
        },
        include: {
          medicines: true,
        },
      });

    return res.status(201).json(
      prescription
    );
  } catch (error) {
    return res.status(500).json(error);
  }
};