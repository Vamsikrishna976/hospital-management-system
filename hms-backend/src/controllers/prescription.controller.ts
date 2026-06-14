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

export const getPrescription = async (
  req: Request,
  res: Response
) => {
  try {
    const prescription =
      await prisma.prescription.findUnique({
        where: {
          id: String(req.params.id),
        },
        include: {
          medicines: true,

          appointment: {
            include: {
              doctor: true,

              opRecord: {
                include: {
                  patient: true,
                },
              },
            },
          },
        },
      });

    return res.json(prescription);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch prescription",
    });
  }
};
