import { Router } from "express";
import { generateIPDBill, getIPDBill, markBillAsPaid } from "../controllers/ipdBilling.controller.ts";

const router = Router();

router.post("/generate", generateIPDBill);

router.get("/:admissionId", getIPDBill);

router.put("/:billId/pay", markBillAsPaid);

export default router;