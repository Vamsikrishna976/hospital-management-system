import { Router } from "express";
import { generatePrescriptionPDF } from "../controllers/pdf.controller.ts";

const router = Router();

router.get(
  "/:id/pdf",
  generatePrescriptionPDF
);

export default router;