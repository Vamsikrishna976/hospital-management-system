import { Router } from "express";
import {
  createDoctor,
  getDoctors,
} from "../controllers/doctor.controller.ts";

const router = Router();

router.post("/", createDoctor);

router.get("/", getDoctors);

export default router;