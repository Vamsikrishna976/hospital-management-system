export interface DiagnosisResult {
  summary: string;

  confidence: number;

  recommendedTests: string[];

  redFlags: string[];

  suggestedSpecialist: string;

  disclaimer: string;
}