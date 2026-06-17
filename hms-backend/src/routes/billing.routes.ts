import { Router } from "express";

import {
  createBilling,
  getBilling,
  payBill,
  getBillingHistory,
} from "../controllers/billing.controller.ts";

const router = Router();

router.post("/", createBilling);

router.get("/history", getBillingHistory);

router.get("/:search", getBilling);

router.put("/pay/:id", payBill);


export default router;
