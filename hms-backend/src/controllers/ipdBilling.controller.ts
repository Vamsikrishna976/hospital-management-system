import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const generateIPDBill = async (req: Request, res: Response) => {
  try {
    const { admissionId } = req.body;

    // Check admission
    const admission = await prisma.iPAdmission.findUnique({
      where: {
        id: admissionId,
      },
      include: {
        patient: true,
        bed: true,
      },
    });

    if (!admission) {
      return res.status(404).json({
        message: "Admission not found",
      });
    }

    // Generate Bill Number
    const count = await prisma.iPDBill.count();

    const billNumber = `IPB-${new Date().getFullYear()}-${String(
      count + 1,
    ).padStart(5, "0")}`;

    // Calculate Stay Duration
    const admittedDate = new Date(admission.admittedDate);
    const dischargeDate = admission.dischargeDate
      ? new Date(admission.dischargeDate)
      : new Date();

    const diffInMs = dischargeDate.getTime() - admittedDate.getTime();

    const days = Math.max(1, Math.ceil(diffInMs / (1000 * 60 * 60 * 24)));

    let roomRate = 1000;

    // Room Charges
    const roomCharges = days * roomRate;

    // Doctor Charges
    const doctorCharges = days * 500;

    // Calculate Lab Charges
    const labOrders = await prisma.labOrder.findMany({
      where: {
        patientId: admission.patientId,
        status: "COMPLETED",
      },
      include: {
        items: {
          include: {
            labTest: true,
          },
        },
      },
    });

    let labCharges = 0;

    for (const order of labOrders) {
      for (const item of order.items) {
        labCharges += item.labTest.price;
      }
    }

    const pharmacyBills = await prisma.pharmacyBill.findMany({
      where: {
        patientName: admission.patient.fullName,
      },
    });

    let pharmacyCharges = 0;

    for (const bill of pharmacyBills) {
      pharmacyCharges += bill.totalAmount;
    }

    const otherCharges = 0;

    const totalAmount =
      roomCharges + doctorCharges + labCharges + pharmacyCharges + otherCharges;

    const existingBill = await prisma.iPDBill.findUnique({
      where: {
        admissionId,
      },
    });

    if (existingBill) {
      return res.status(400).json({
        message: "Bill already generated for this admission.",
      });
    }

    switch (admission.bed?.ward) {
      case "ICU":
        roomRate = 5000;
        break;

      case "VIP":
        roomRate = 3000;
        break;

      case "Emergency":
        roomRate = 2000;
        break;

      case "General":
        roomRate = 1000;
        break;

      default:
        roomRate = 1000;
    }

    const bill = await prisma.iPDBill.create({
      data: {
        billNumber,
        admissionId,

        roomCharges,
        doctorCharges,
        labCharges,
        pharmacyCharges,
        otherCharges,

        totalAmount,

        paymentStatus: "PENDING",
      },
    });

    return res.status(201).json({
      message: "IPD Bill generated successfully",
      bill,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to generate bill",
    });
  }
};

export const getIPDBill = async (req: Request, res: Response) => {
  try {
    const admissionId = String(req.params.admissionId);

    const bill = await prisma.iPDBill.findUnique({
      where: {
        admissionId,
      },
      include: {
        admission: {
          include: {
            patient: true,
            bed: true,
          },
        },
      },
    });

    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    return res.json(bill);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch bill",
    });
  }
};

export const markBillAsPaid = async (
  req: Request,
  res: Response
) => {
  try {
    const billId = String(req.params.billId);

    const bill = await prisma.iPDBill.findUnique({
      where: {
        id: billId,
      },
    });

    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    if (bill.paymentStatus === "PAID") {
      return res.status(400).json({
        message: "Bill is already paid",
      });
    }

    const updatedBill = await prisma.iPDBill.update({
      where: {
        id: billId,
      },
      data: {
        paymentStatus: "PAID",
      },
    });

    return res.json({
      message: "Payment completed successfully",
      bill: updatedBill,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update payment status",
    });
  }
};