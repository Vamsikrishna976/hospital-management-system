import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const assignDoctor = async (
  req: Request,
  res: Response
) => {
  try {
    const { doctorId, opRecordId } = req.body;

    const count =
      await prisma.appointment.count();

    const appointmentNo =
      `APT-${String(
        count + 1
      ).padStart(5, "0")}`;

    const appointment =
      await prisma.appointment.create({
        data: {
          appointmentNo,
          doctorId,
          opRecordId,
        },
      });

    return res.status(201).json(
      appointment
    );
  } catch (error) {
    return res.status(500).json(error);
  }
};