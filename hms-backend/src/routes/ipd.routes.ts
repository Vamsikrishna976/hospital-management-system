import { Router } from "express";
import { admitPatient } from "../controllers/ipd.controller";

const router = Router();

// Admit Patient
router.post("/admit", admitPatient);

export default router;