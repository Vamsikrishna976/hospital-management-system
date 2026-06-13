import { Router } from "express";
import { createConsultation} from "../controllers/consultation.controller.ts";

const router = Router();

router.post(
  "/",
  createConsultation
);

export default router;