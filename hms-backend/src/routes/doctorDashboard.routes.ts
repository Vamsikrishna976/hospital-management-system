import { Router } from "express";
import { getAssignedPatients } from "../controllers/doctorDashboard.controller.ts";

const router = Router();

router.get(
  "/:doctorId/patients",
  getAssignedPatients
);

export default router;