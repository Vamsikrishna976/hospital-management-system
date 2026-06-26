import { Router } from "express";
import {
  createPatient,
  searchPatient,
  getAllPatients,
} from "../controllers/patient.controller.ts";

const router = Router();

router.post("/", createPatient);

router.get("/search", searchPatient);

router.get("/", getAllPatients);
export default router;
