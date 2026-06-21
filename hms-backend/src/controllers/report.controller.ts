import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const getReports = async (req: Request, res: Response) => {
  try {
    const totalPatients = await prisma.patient.count();

    const totalDoctors = await prisma.doctor.count();

    const totalAppointments = await prisma.appointment.count();

    const totalBills = await prisma.billing.count();

    const revenue = await prisma.billing.aggregate({
      where: {
        paymentStatus: "PAID",
      },
      _sum: {
        totalAmount: true,
      },
    });

    const bills = await prisma.billing.findMany({
      where: {
        paymentStatus: "PAID",
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

    const monthlyRevenue = months.map((month) => ({
      month,
      revenue: 0,
    }));

    const monthlyPatients = [
      { month: "Jan", patients: 0 },
      { month: "Feb", patients: 0 },
      { month: "Mar", patients: 0 },
      { month: "Apr", patients: 0 },
      { month: "May", patients: 0 },
      { month: "Jun", patients: 0 },
      { month: "Jul", patients: 0 },
      { month: "Aug", patients: 0 },
      { month: "Sep", patients: 0 },
      { month: "Oct", patients: 0 },
      { month: "Nov", patients: 0 },
      { month: "Dec", patients: 0 },
    ];

    const patients = await prisma.patient.findMany({
      select: {
        createdAt: true,
      },
    });

    patients.forEach((patient) => {
      const month = new Date(patient.createdAt).getMonth();

      monthlyPatients[month].patients++;
    });

    bills.forEach((bill) => {
      const monthIndex = new Date(bill.createdAt).getMonth();

      monthlyRevenue[monthIndex].revenue += bill.totalAmount;
    });

    // const monthlyRevenue = await prisma.billing.groupBy({
    //   by: ["createdAt"],
    //   _sum: {
    //     totalAmount: true,
    //   },
    // });

    return res.json({
      totalPatients,
      totalDoctors,
      totalAppointments,
      totalBills,
      totalRevenue: revenue._sum.totalAmount || 0,
      monthlyPatients,

      monthlyRevenue,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch reports",
    });
  }
};
