import { askGemini, getPatientContext } from "../ai.service.ts";
import { buildDiagnosisPrompt } from "./diagnosisPrompt.ts";
import { parseDiagnosisResponse } from "./diagnosisParser.ts";

export async function generateDiagnosisService(
  prompt: string,
  patientId?: string,
) {
  let finalPrompt = prompt;

  if (patientId) {
    const patientContext = await getPatientContext(patientId);

    if (!patientContext) {
      throw new Error("Patient not found");
    }

    finalPrompt = buildDiagnosisPrompt({
      prompt,
      patientContext,
    });
  }

  const aiResponse = await askGemini(finalPrompt);

  console.log("================================");
  console.log("RAW GEMINI RESPONSE");
  console.log("================================");
  console.log(aiResponse);
  console.log("================================");

  return parseDiagnosisResponse(aiResponse);
}
