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

    let grandTotal = 0;

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

      const totalPrice = medicine.unitPrice * item.quantity;

      grandTotal += totalPrice;

      billItemsData.push({
        medicineId: medicine.id,
        quantity: item.quantity,
        unitPrice: medicine.unitPrice,
        totalPrice,
      });
    }

    const bill = await prisma.pharmacyBill.create({
      data: {
        billNumber,
        patientName,
        totalAmount: grandTotal,
      },
    });

    for (const item of billItemsData) {
      console.log("Creating item:", item);

      await prisma.pharmacyBillItem.create({
        data: {
          billId: bill.id,
          medicineId: item.medicineId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
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

      await prisma.pharmacyAuditLog.create({
        data: {
          medicineName:
            (
              await prisma.medicineInventory.findUnique({
                where: {
                  id: item.medicineId,
                },
              })
            )?.medicineName || "Unknown",

          action: "BILLED",

          quantity: item.quantity,
        },
      });
    }

    return res.json({
      bill,
      items: billItemsData,
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

    return res.json(bill);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch bill",
    });
  }
};
