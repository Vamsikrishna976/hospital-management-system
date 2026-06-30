import type { Request, Response } from "express";
import { generateDiagnosisService } from "../services/diagnosis/diagnosis.service.ts";


export const generateDiagnosis = async (req: Request, res: Response) => {
  try {
    const { prompt, patientId } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const answer = await generateDiagnosisService(prompt, patientId);

    return res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: "Diagnosis generation failed",
    });
  }
};
