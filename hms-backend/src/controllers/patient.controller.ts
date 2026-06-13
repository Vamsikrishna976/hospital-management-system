import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const searchPatient = async (
  req: Request,
  res: Response
) => {
  try {
    const mobile = req.query.mobile as string;

    const patient =
      await prisma.patient.findUnique({
        where: {
          mobile,
        },
      });

    if (!patient) {
      return res.json({
        exists: false,
      });
    }

    return res.json({
      exists: true,
      patient,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createPatient = async (
  req: Request,
  res: Response
) => {
  try {
    const count =
      await prisma.patient.count();

    const patientNumber =
      `PAT-2026-${String(
        count + 1
      ).padStart(5, "0")}`;

    const patient =
      await prisma.patient.create({
        data: {
          patientNumber,
          ...req.body,
        },
      });

    return res.status(201).json(patient);
  } catch (error) {
    return res.status(500).json(error);
  }
};