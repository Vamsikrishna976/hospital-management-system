import { Router } from "express";

import {
  createPharmacyBill,
  getPharmacyBills,
  getPharmacyRevenue,
  createMedicineBill,
  
} from "../controllers/pharmacyBilling.controller.ts";
import { downloadPharmacyBill } from "../controllers/pharmacyPdf.controller.ts";

const router = Router();

router.post("/", createPharmacyBill);

router.get("/", getPharmacyBills);

router.get("/pdf/:id", downloadPharmacyBill);

router.get("/revenue", getPharmacyRevenue);

router.post("/medicine-bill", createMedicineBill);

export default router;
