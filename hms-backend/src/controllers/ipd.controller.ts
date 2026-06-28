import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

/**
 * Admit a patient
 */
export const admitPatient = async (req: Request, res: Response) => {
  try {
    const { patientId, roomNumber, ward, bedNumber } = req.body;

    const bed = await prisma.bed.findUnique({
      where: {
        id: req.body.bedId,
      },
    });

    if (!bed) {
      return res.status(404).json({
        message: "Bed not found",
      });
    }

    if (bed.status !== "AVAILABLE") {
      return res.status(400).json({
        message: "Bed is already occupied",
      });
    }

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
        patientId: req.body.patientId,
        bedId: req.body.bedId,
      },
      include: {
        patient: true,
        bed: true,
      },
    });

    await prisma.bed.update({
      where: {
        id: req.body.bedId,
      },
      data: {
        status: "OCCUPIED",
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

// Get Admission details

export const getAdmissions = async (req: Request, res: Response) => {
  try {
    const admissions = await prisma.iPAdmission.findMany({
      include: {
        patient: true,
        bed: true,
        bill: true,
      },
      orderBy: {
        admittedDate: "desc",
      },
    });

    return res.json(admissions);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch admissions",
    });
  }
};

//Discharge patients
export const dischargePatient = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const admission = await prisma.iPAdmission.findUnique({
      where: {
        id,
      },
    });

    const bill = await prisma.iPDBill.findUnique({
      where: {
        admissionId: id,
      },
    });

    if (!bill) {
      return res.status(400).json({
        message: "Generate the IPD bill before discharging the patient.",
      });
    }

    if (bill.paymentStatus !== "PAID") {
      return res.status(400).json({
        message: "Patient cannot be discharged until the bill is fully paid.",
      });
    }

    if (!admission) {
      return res.status(404).json({
        message: "Admission not found",
      });
    }

    if (admission.bedId) {
      await prisma.bed.update({
        where: {
          id: admission.bedId,
        },
        data: {
          status: "AVAILABLE",
        },
      });
    }

    const updatedAdmission = await prisma.iPAdmission.update({
      where: {
        id,
      },
      data: {
        status: "DISCHARGED",
        dischargeDate: new Date(),
      },
      include: {
        patient: true,
      },
    });

    return res.json(updatedAdmission);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to discharge patient",
    });
  }
};

// IPD Status
export const getIPDStats = async (req: Request, res: Response) => {
  try {
    const totalAdmissions = await prisma.iPAdmission.count();

    const admittedPatients = await prisma.iPAdmission.count({
      where: {
        status: "ADMITTED",
      },
    });

    const dischargedPatients = await prisma.iPAdmission.count({
      where: {
        status: "DISCHARGED",
      },
    });

    return res.json({
      totalAdmissions,
      admittedPatients,
      dischargedPatients,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch IPD statistics",
    });
  }
};
