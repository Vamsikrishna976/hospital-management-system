import type { Request, Response } from "express";
import prisma from "../utils/prisma";

/**
 * Admit a patient
 */
export const admitPatient = async (req: Request, res: Response) => {
  try {
    const { patientId, roomNumber, ward, bedNumber } = req.body;

    // Validate patient
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    // Generate Admission Number
    const count = await prisma.iPAdmission.count();

    const admissionNo = `IP-${new Date().getFullYear()}-${String(count + 1).padStart(5, "0")}`;

    const admission = await prisma.iPAdmission.create({
      data: {
        admissionNo,
        patientId,
        roomNumber,
        ward,
        bedNumber,
      },
      include: {
        patient: true,
      },
    });

    return res.status(201).json(admission);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to admit patient",
    });
  }
};
