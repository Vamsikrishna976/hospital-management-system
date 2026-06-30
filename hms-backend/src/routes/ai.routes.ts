import express from "express";
import { chatWithAI, patientContext } from "../controllers/ai.controller.ts";
import { generateDiagnosis } from "../controllers/diagnosis.controller.ts";

console.log("✅ AI Routes Loaded");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "AI router working",
  });
});

router.post("/chat", chatWithAI);

router.get("/patient-context/:patientId", patientContext);

router.post("/diagnosis", generateDiagnosis);

export default router;
