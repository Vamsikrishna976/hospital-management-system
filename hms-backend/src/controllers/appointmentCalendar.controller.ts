import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const getAppointmentCalendar = async (
  req: Request,
  res: Response,
) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        doctor: true,
        opRecord: {
          include: {
            patient: true,
          },
        },
      },
      orderBy: {
        assignedAt: "asc",
      },
    });

    return res.json(appointments);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch appointments",
    });
  }
};