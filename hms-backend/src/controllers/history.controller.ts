import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const getPatientHistory = async (req: Request, res: Response) => {
  try {
    const mobile = req.params.mobile as string;

    const patient = await prisma.patient.findUnique({
      where: {
        mobile,
      },

      include: {
        opRecords: {
          include: {
            complaint: true,

            appointment: {
              include: {
                doctor: true,

                prescription: {
                  include: {
                    medicines: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    return res.json(patient);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch history",
    });
  }
};
