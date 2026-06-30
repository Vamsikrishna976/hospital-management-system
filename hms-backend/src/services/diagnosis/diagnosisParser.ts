import type { DiagnosisResult } from "./diagnosisTypes";

export function parseDiagnosisResponse(response: string): DiagnosisResult {
  try {
    // Remove markdown code fences if present
    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    if (typeof parsed !== "object" || parsed === null) {
      throw new Error("Invalid diagnosis response");
    }

    return {
      summary: parsed.summary ?? "",
      confidence:
        typeof parsed.confidence === "number"
          ? parsed.confidence
          : Number(parsed.confidence) || 0,
      recommendedTests: Array.isArray(parsed.recommendedTests)
        ? parsed.recommendedTests
        : [],
      redFlags: Array.isArray(parsed.redFlags) ? parsed.redFlags : [],
      suggestedSpecialist: parsed.suggestedSpecialist ?? "",
    };
  } catch (error) {
    console.error("Diagnosis Parser Error:", error);

    return {
      summary: "Unable to parse AI diagnosis response.",
      confidence: 0,
      recommendedTests: [],
      redFlags: [],
      suggestedSpecialist: "",
    };
  }
}
