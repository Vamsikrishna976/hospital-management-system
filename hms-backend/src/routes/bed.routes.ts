import { Router } from "express";
import {
  createBed,
  getBeds,
  getAvailableBeds,
  getBedStats,
  updateBedStatus,
  getBedPatient,
} from "../controllers/bed.controller.ts";

const router = Router();

router.post("/", createBed);

router.get("/", getBeds);

router.get("/available", getAvailableBeds);

router.get("/stats", getBedStats);

router.put("/:id/status", updateBedStatus);

router.get("/:id/patient", getBedPatient);

export default router;