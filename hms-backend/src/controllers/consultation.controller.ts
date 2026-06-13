import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const createConsultation = async (req: Request, res: Response) => {
  try {
    const { appointmentId, diagnosis, notes, followUpDate } = req.body;

    console.log("Received appointmentId:", appointmentId);

    const appointment = await prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
    });

    console.log("Appointment found:", appointment);

    const prescription = await prisma.prescription.upsert({
      where: {
        appointmentId,
      },
      update: {
        diagnosis,
        notes,
        followUpDate: followUpDate ? new Date(followUpDate) : null,
      },
      create: {
        appointmentId,
        diagnosis,
        notes,
        followUpDate: followUpDate ? new Date(followUpDate) : null,
      },
    });

    return res.status(201).json({
      message: "Consultation saved successfully",
      data: prescription,
    });
  } catch (error) {
    console.error("CONSULTATION ERROR:", error);

    return res.status(500).json({
      message: "Failed to save consultation",
      error,
    });
  }
};
