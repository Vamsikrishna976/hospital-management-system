import express from "express";
import { chatWithAI, patientContext } from "../controllers/ai.controller.ts";

const router = express.Router();

router.post("/chat", chatWithAI);

router.get("/patient-context/:patientId", patientContext);

export default router;