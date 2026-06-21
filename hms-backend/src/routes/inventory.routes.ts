import { Router } from "express";
import {
  createMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
  updateStock,
  getAuditLogs,
} from "../controllers/inventory.controller.ts";

const router = Router();

router.post("/", createMedicine);
router.get("/", getMedicines);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);
router.put("/:id/stock", updateStock);
router.get("/audit-logs", getAuditLogs);
export default router;
