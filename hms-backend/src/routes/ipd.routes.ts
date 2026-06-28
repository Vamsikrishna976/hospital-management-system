import { Router } from "express";
import {
  admitPatient,
  getAdmissions,
  dischargePatient,
  getIPDStats
} from "../controllers/ipd.controller.ts";

const router = Router();

// Admit Patient
router.post("/admit", admitPatient);

router.get("/", getAdmissions);

router.put("/discharge/:id", dischargePatient);

router.get("/stats", getIPDStats);

export default router;
