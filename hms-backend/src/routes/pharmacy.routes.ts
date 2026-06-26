import express from "express";
import { downloadPharmacyBill } from "../controllers/pharmacyPdf.controller.ts";
import { viewPharmacyBill } from "../controllers/pharmacyPdf.controller.ts";

import {
  getPendingPrescriptions,
  dispensePrescription,
  getPharmacyAuditLogs,
} from "../controllers/pharmacy.controller.ts";

const router = express.Router();

router.get("/prescriptions", getPendingPrescriptions);

router.put("/dispense/:id", dispensePrescription);

router.get("/audit-logs", getPharmacyAuditLogs);

// View PDF (opens in browser)
router.get("/pdf/:id", viewPharmacyBill);

// Download PDF
router.get("/pdf/:id/download", downloadPharmacyBill);

export default router;
