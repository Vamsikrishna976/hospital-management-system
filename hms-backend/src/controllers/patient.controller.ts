import type { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

export const searchPatient = async (req: Request, res: Response) => {
  try {
    const mobile = req.query.mobile as string;
    console.log("Searching Mobile:", mobile);
    const patient = await prisma.patient.findUnique({
      where: {
        mobile,
      },
    });
    console.log("Patient Found:", patient);

    if (!patient) {
      return res.json({
        exists: false,
      });
    }

    return res.json({
      exists: true,
      patient,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch patients",
    });
  }
};

export const createPatient = async (req: Request, res: Response) => {
  try {
    console.log("PATIENT REQUEST:");
    console.log(req.body);

    const count = await prisma.patient.count();

    const patientNumber = `PAT-2026-${String(count + 1).padStart(5, "0")}`;

    const patient = await prisma.patient.create({
      data: {
        patientNumber,
        fullName: req.body.fullName,
        mobile: req.body.mobile,
        age: Number(req.body.age),
        gender: req.body.gender,
        address: req.body.address,
      },
    });

    return res.status(201).json(patient);
  } catch (error) {
    console.error("PATIENT ERROR:");
    console.error(error);

    return res.status(500).json(error);
  }
};
