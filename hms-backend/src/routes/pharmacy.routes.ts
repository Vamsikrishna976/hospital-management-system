import express from "express";
import {
  getPendingPrescriptions,
  dispensePrescription,
  getPharmacyAuditLogs,
} from "../controllers/pharmacy.controller.ts";

const router = express.Router();

router.get("/prescriptions", getPendingPrescriptions);

router.put("/dispense/:id", dispensePrescription);

router.get("/audit-logs", getPharmacyAuditLogs);
export default router;
