import { Router } from "express";
import labReportController from "../controllers/labReport.controller.ts";

const router = Router();

router.get("/:orderId", labReportController.generateReport);

export default router;