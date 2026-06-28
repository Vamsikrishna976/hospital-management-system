import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

// Create Bed
export const createBed = async (req: Request, res: Response) => {
  try {
    const bed = await prisma.bed.create({
      data: req.body,
    });

    res.status(201).json(bed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create bed" });
  }
};

// Get All Beds
export const getBeds = async (_req: Request, res: Response) => {
  try {
    const beds = await prisma.bed.findMany({
      orderBy: {
        ward: "asc",
      },
    });

    res.json(beds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch beds" });
  }
};

// Get Available Beds
export const getAvailableBeds = async (_req: Request, res: Response) => {
  try {
    const beds = await prisma.bed.findMany({
      where: {
        status: "AVAILABLE",
      },
      orderBy: {
        ward: "asc",
      },
    });

    res.json(beds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch beds" });
  }
};

// Beds stats

export const getBedStats = async (req: Request, res: Response) => {
  try {
    const totalBeds = await prisma.bed.count();

    const availableBeds = await prisma.bed.count({
      where: {
        status: "AVAILABLE",
      },
    });

    const occupiedBeds = await prisma.bed.count({
      where: {
        status: "OCCUPIED",
      },
    });

    const maintenanceBeds = await prisma.bed.count({
      where: {
        status: "MAINTENANCE",
      },
    });

    const occupancyRate =
      totalBeds === 0
        ? 0
        : Number(((occupiedBeds / totalBeds) * 100).toFixed(2));

    return res.json({
      totalBeds,
      availableBeds,
      occupiedBeds,
      maintenanceBeds,
      occupancyRate,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch bed statistics",
    });
  }
};

// Interactive Bed Management

export const updateBedStatus = async (req: Request, res: Response) => {
  try {
    const id  = String(req.params.id) ;
    const { status } = req.body;

    // Check whether the bed exists
    const existingBed = await prisma.bed.findUnique({
      where: { id },
    });

    if (!existingBed) {
      return res.status(404).json({
        message: "Bed not found",
      });
    }

    const bed = await prisma.bed.update({
      where: { id },
      data: { status },
    });

    return res.json({
      message: "Bed status updated successfully",
      bed,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update bed status",
    });
  }
};

// GET BED PATIENT

export const getBedPatient = async (req: Request, res: Response) => {
  try {
    const  id  = String(req.params.id);

    const admission = await prisma.iPAdmission.findFirst({
      where: {
        bedId: id,
        status: "ADMITTED",
      },
      include: {
        patient: true,
        bed : true,
      },
    });

    if (!admission) {
      return res.status(404).json({
        message: "No patient admitted on this bed",
      });
    }

    return res.json(admission);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch bed details",
    });
  }
};
