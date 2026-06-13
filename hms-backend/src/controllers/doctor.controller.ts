import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const createDoctor = async (
  req: Request,
  res: Response
) => {
  try {
    const count = await prisma.doctor.count();

    const doctorNumber =
      `DOC-${String(count + 1).padStart(5, "0")}`;

    const doctor = await prisma.doctor.create({
      data: {
        doctorNumber,
        ...req.body,
      },
    });

    return res.status(201).json(doctor);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getDoctors = async (
  req: Request,
  res: Response
) => {
  const doctors = await prisma.doctor.findMany();

  return res.json(doctors);
};