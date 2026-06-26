import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const getPharmacyAnalytics = async (req: Request, res: Response) => {
  try {
    const bills = await prisma.pharmacyBill.findMany();

    const totalRevenue = bills.reduce((sum, bill) => sum + bill.totalAmount, 0);

    const totalBills = bills.length;

    const billItems = await prisma.pharmacyBillItem.findMany();

    const medicinesSold = billItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

    const monthlyBills = await prisma.pharmacyBill.findMany({
      select: {
        totalAmount: true,
        createdAt: true,
      },
    });

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const revenueMap = new Array(12).fill(0);

    monthlyBills.forEach((bill) => {
      const monthIndex = new Date(bill.createdAt).getMonth();
      revenueMap[monthIndex] += bill.totalAmount;
    });

    const revenueChart = months.map((month, index) => ({
      month,
      revenue: revenueMap[index],
    }));

    const topSelling = await prisma.pharmacyBillItem.groupBy({
      by: ["medicineId"],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 5,
    });

    const topSellingMedicines = await Promise.all(
      topSelling.map(async (item) => {
        const medicine = await prisma.medicineInventory.findUnique({
          where: {
            id: item.medicineId,
          },
        });

        return {
          medicineName: medicine?.medicineName || "Unknown",
          quantity: item._sum.quantity || 0,
        };
      }),
    );

    return res.json({
      totalRevenue,
      totalBills,
      medicinesSold,
      revenueChart,
      topSellingMedicines,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch analytics",
    });
  }
};
