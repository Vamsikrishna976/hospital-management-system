import { Router } from "express";
import {
  createPatient,
  searchPatient,
} from "../controllers/patient.controller.ts";

const router = Router();

router.post("/", createPatient);

router.get("/search", searchPatient);

export default router;