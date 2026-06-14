import { Router } from "express";
import { createPrescription, getPrescription } from "../controllers/prescription.controller.ts";


const router = Router();

router.post("/", createPrescription);
router.get("/:id", getPrescription);

export default router;