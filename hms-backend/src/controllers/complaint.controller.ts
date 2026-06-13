import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const createComplaint = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      opRecordId,
      chiefComplaint,
      symptoms,
      duration,
      previousMedication,
      clinicalNotes,
    } = req.body;

    const complaint = await prisma.complaint.create({
      data: {
        opRecordId,
        chiefComplaint,
        symptoms,
        duration,
        previousMedication,
        clinicalNotes,
      },
    });

    return res.status(201).json(complaint);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create complaint",
      error,
    });
  }
};