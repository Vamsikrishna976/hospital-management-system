import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalPatients = await prisma.patient.count();

    const totalDoctors = await prisma.doctor.count();

    const totalOPRecords = await prisma.oPRecord.count();

    const totalBills = await prisma.billing.count();

    const paidRevenue = await prisma.billing.aggregate({
      where: {
        paymentStatus: "PAID",
      },
      _sum: {
        totalAmount: true,
      },
    });

    const pendingBills = await prisma.billing.count({
      where: {
        paymentStatus: "PENDING",
      },
    });

    res.json({
      totalPatients,
      totalDoctors,
      totalOPRecords,
      totalBills,
      totalRevenue: paidRevenue._sum.totalAmount || 0,
      pendingBills,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Dashboard fetch failed",
    });
  }
};

export const getRecentPatients = async (req: Request, res: Response) => {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    return res.json(patients);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch patients",
    });
  }
};

export const getRecentBills = async (req: Request, res: Response) => {
  try {
    const bills = await prisma.billing.findMany({
      include: {
        opRecord: {
          include: {
            patient: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 5,
    });

    return res.json(bills);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch recent bills",
    });
  }
};

export const getTodayStats = async (req: Request, res: Response) => {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const todayPatients = await prisma.patient.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    const todayOPRecords = await prisma.oPRecord.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    const todayBills = await prisma.billing.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    const todayAppointments = await prisma.appointment.count({
      where: {
        assignedAt: {
          gte: today,
        },
      },
    });

    const todayRevenue = await prisma.billing.aggregate({
      where: {
        createdAt: {
          gte: today,
        },

        paymentStatus: "PAID",
      },

      _sum: {
        totalAmount: true,
      },
    });

    return res.json({
      todayPatients,
      todayOPRecords,
      todayAppointments,
      todayBills,
      todayRevenue: todayRevenue._sum.totalAmount || 0,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch today's stats",
    });
  }
};

export const getDoctorWorkload = async (req: Request, res: Response) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        appointments: true,
      },
    });

    const workload = doctors.map((doctor) => ({
      id: doctor.id,
      doctorName: doctor.fullName,
      specialization: doctor.specialization,
      totalAppointments: doctor.appointments.length,
    }));

    return res.json(workload);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch workload",
    });
  }
};
