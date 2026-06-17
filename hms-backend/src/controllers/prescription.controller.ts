import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const createPrescription = async (req: Request, res: Response) => {
  console.log("🚀 CREATE PRESCRIPTION API HIT");
  try {
    const { appointmentId, diagnosis, notes, followUpDate, medicines } =
      req.body;

    // Create Prescription
    const prescription = await prisma.prescription.create({
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

    // Find Appointment
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
    });

    if (appointment) {
      // Check Existing Bill
      const existingBill = await prisma.billing.findFirst({
        where: {
          opRecordId: appointment.opRecordId,
        },
      });

      if (!existingBill) {
        const billCount = await prisma.billing.count();

        const billNumber = `BILL-${new Date().getFullYear()}-${String(billCount + 1).padStart(5, "0")}`;
        console.log("Generated Bill Number:", billNumber);
        
        const bill = await prisma.billing.create({
          data: {
            billNumber,
            opRecordId: appointment.opRecordId,
            consultationFee: 500,
            medicineFee: 300,
            labFee: 0,
            otherFee: 0,
            totalAmount: 800,
          },
        });

        console.log("Bill Created:", bill);
      } else {
        console.log(
          "Bill already exists for OP Record:",
          appointment.opRecordId,
        );
      }
    }

    return res.status(201).json({
      message: "Prescription Created Successfully",
      data: prescription,
    });
  } catch (error) {
    console.error("Prescription Error:", error);

    return res.status(500).json({
      message: "Failed to create prescription",
      error,
    });
  }
};

export const getPrescription = async (req: Request, res: Response) => {
  try {
    const prescription = await prisma.prescription.findUnique({
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

    if (!prescription) {
      return res.status(404).json({
        message: "Prescription not found",
      });
    }

    return res.json(prescription);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch prescription",
    });
  }
};
