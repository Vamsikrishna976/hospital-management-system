import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const createPharmacyBill = async (req: Request, res: Response) => {
  try {
    const { patientName, totalAmount } = req.body;

    const count = await prisma.pharmacyBill.count();

    const billNumber = `PBILL-${String(count + 1).padStart(5, "0")}`;

    const bill = await prisma.pharmacyBill.create({
      data: {
        billNumber,
        patientName,
        totalAmount,
      },
    });

    return res.status(201).json(bill);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create pharmacy bill",
    });
  }
};

export const getPharmacyBills = async (req: Request, res: Response) => {
  try {
    const bills = await prisma.pharmacyBill.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(bills);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch bills",
    });
  }
};

export const getPharmacyRevenue = async (req: Request, res: Response) => {
  try {
    const bills = await prisma.pharmacyBill.findMany();

    const totalRevenue = bills.reduce((sum, bill) => sum + bill.totalAmount, 0);

    const totalBills = bills.length;

    return res.json({
      totalRevenue,
      totalBills,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch revenue",
    });
  }
};

export const createMedicineBill = async (req: Request, res: Response) => {
  try {
    const { patientName, items } = req.body;

    let subtotal = 0;
    let totalGST = 0;
    const discount = 0;

    const count = await prisma.pharmacyBill.count();

    const billNumber = `PBILL-${String(count + 1).padStart(5, "0")}`;

    const billItemsData = [];

    for (const item of items) {
      const medicine = await prisma.medicineInventory.findUnique({
        where: {
          id: item.medicineId,
        },
      });

      if (!medicine) {
        return res.status(404).json({
          message: "Medicine not found",
        });
      }

      // -----------------------------
      // Line Calculations
      // -----------------------------

      const lineSubtotal = medicine.unitPrice * item.quantity;

      const gst = Number((lineSubtotal * 0.12).toFixed(2));

      const totalPrice = Number((lineSubtotal + gst).toFixed(2));

      subtotal += lineSubtotal;
      totalGST += gst;

      billItemsData.push({
        medicineId: medicine.id,
        quantity: item.quantity,
        unitPrice: medicine.unitPrice,
        gst,
        totalPrice,
      });
    }

    // -----------------------------
    // Bill Summary
    // -----------------------------

    subtotal = Number(subtotal.toFixed(2));
    totalGST = Number(totalGST.toFixed(2));

    const grandTotal = Number((subtotal + totalGST - discount).toFixed(2));

    const paidAmount = grandTotal;

    const dueAmount = 0;

    const paymentStatus = "PAID";

    // -----------------------------
    // Create Bill
    // -----------------------------

    const bill = await prisma.pharmacyBill.create({
      data: {
        billNumber,
        patientName,

        subtotal,
        gstAmount: totalGST,
        discount,

        totalAmount: grandTotal,

        paidAmount,
        dueAmount,
        paymentStatus,
      },
    });

    // -----------------------------
    // Create Bill Items
    // -----------------------------

    for (const item of billItemsData) {
      await prisma.pharmacyBillItem.create({
        data: {
          billId: bill.id,
          medicineId: item.medicineId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          gst: item.gst,
          totalPrice: item.totalPrice,
        },
      });

      await prisma.medicineInventory.update({
        where: {
          id: item.medicineId,
        },
        data: {
          stockQuantity: {
            decrement: item.quantity,
          },
        },
      });

      const medicine = await prisma.medicineInventory.findUnique({
        where: {
          id: item.medicineId,
        },
      });

      await prisma.pharmacyAuditLog.create({
        data: {
          medicineName: medicine?.medicineName ?? "Unknown",
          action: "BILLED",
          quantity: item.quantity,
        },
      });
    }

    // -----------------------------
    // Return Bill
    // -----------------------------

    const completeBill = await prisma.pharmacyBill.findUnique({
      where: {
        id: bill.id,
      },
      include: {
        items: {
          include: {
            medicine: true,
          },
        },
      },
    });

    return res.status(201).json({
      message: "Medicine bill created successfully",
      data: completeBill,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create bill",
    });
  }
};

export const getBillDetails = async (req: Request, res: Response) => {
  try {
    const billId = req.params.id as string;

    const bill = await prisma.pharmacyBill.findUnique({
      where: {
        id: billId,
      },

      include: {
        items: {
          include: {
            medicine: true,
          },
        },
      },
    });

    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: bill,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bill",
    });
  }
};
