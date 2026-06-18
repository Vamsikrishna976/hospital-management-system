import { Router } from "express";
import {
  getDashboardStats,
  getRecentPatients,
  getRecentBills,
  getTodayStats,
  getDoctorWorkload,
} from "../controllers/dashboard.controller.ts";

const router = Router();

router.get("/", getDashboardStats);
router.get("/recent-patients", getRecentPatients);
router.get("/recent-bills", getRecentBills);
router.get("/today", getTodayStats);
router.get("/doctor-workload", getDoctorWorkload);

export default router;
