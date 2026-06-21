import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const assignDoctor = async (req: Request, res: Response) => {
  try {
    const { doctorId, opRecordId, appointmentDate, appointmentTime } = req.body;
    const count = await prisma.appointment.count();

    const appointmentNo = `APT-${String(count + 1).padStart(5, "0")}`;

    const appointment = await prisma.appointment.create({
      data: {
        appointmentNo,
        doctorId,
        opRecordId,
        appointmentDate: appointmentDate ? new Date(appointmentDate) : null,

        appointmentTime,
      },
    });

    return res.status(201).json(appointment);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAppointments = async (req: Request, res: Response) => {
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
        assignedAt: "desc",
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

export const completeAppointment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const appointment = await prisma.appointment.update({
      where: {
        id,
      },

      data: {
        status: "COMPLETED",
      },
    });

    return res.json(appointment);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to complete appointment",
    });
  }
};

export const cancelAppointment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const appointment = await prisma.appointment.update({
      where: {
        id,
      },

      data: {
        status: "CANCELLED",
      },
    });

    return res.json(appointment);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to cancel appointment",
    });
  }
};
