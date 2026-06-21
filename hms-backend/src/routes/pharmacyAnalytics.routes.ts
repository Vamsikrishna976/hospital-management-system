import { Router } from "express";

import { getPharmacyAnalytics } from "../controllers/pharmacyAnalytics.controller.ts";

const router = Router();

router.get("/", getPharmacyAnalytics);

export default router;