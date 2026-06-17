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

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

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

    // AUTO BILLING
    // AUTO BILLING
    const existingBill = await prisma.billing.findFirst({
      where: {
        opRecordId: appointment.opRecordId,
      },
    });

    if (!existingBill) {
      const billCount = await prisma.billing.count();

      const billNumber = `BILL-${new Date().getFullYear()}-${String(
        billCount + 1,
      ).padStart(5, "0")}`;

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
      console.log("Bill already exists for:", appointment.opRecordId);
    }

    return res.status(201).json({
      message: "Consultation saved successfully",
      prescription,
    });
  } catch (error) {
    console.error("CONSULTATION ERROR:", error);

    return res.status(500).json({
      message: "Failed to save consultation",
      error,
    });
  }
};
