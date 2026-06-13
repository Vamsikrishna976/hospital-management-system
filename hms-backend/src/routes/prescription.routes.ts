import { Router } from "express";
import { createPrescription } from "../controllers/prescription.controller.ts";

const router = Router();

router.post("/", createPrescription);

export default router;