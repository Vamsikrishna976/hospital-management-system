import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const getPharmacyAnalytics = async (
  req: Request,
  res: Response,
) => {
  try {
    const bills = await prisma.pharmacyBill.findMany();

    const totalRevenue = bills.reduce(
      (sum, bill) => sum + bill.totalAmount,
      0,
    );

    const totalBills = bills.length;

    const billItems = await prisma.pharmacyBillItem.findMany();

    const medicinesSold = billItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

    return res.json({
      totalRevenue,
      totalBills,
      medicinesSold,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch analytics",
    });
  }
};