import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const getAssignedPatients = async (
  req: Request,
  res: Response
) => {
  try {
    const doctorId = req.params.doctorId;

    const appointments =
      await prisma.appointment.findMany({
        where: {
          doctorId,
        },
        include: {
          doctor: true,
          opRecord: {
            include: {
              patient: true,
              complaint: true,
            },
          },
        },
      });

    return res.json(appointments);
  } catch (error) {
    return res.status(500).json(error);
  }
};