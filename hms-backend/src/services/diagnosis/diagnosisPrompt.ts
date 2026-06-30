import {
  buildPatientInfo,
  buildVitals,
  buildComplaint,
  buildPrescription,
  buildLabResults,
  buildPreviousVisits,
} from "./prompt";

interface BuildDiagnosisPromptProps {
  prompt: string;
  patientContext: any;
}

export function buildDiagnosisPrompt({
  prompt,
  patientContext,
}: BuildDiagnosisPromptProps): string {
  const latestOP = patientContext.opRecords?.[0];

  const prescription = latestOP?.appointment?.[0]?.prescription;

  const latestLab = patientContext.labOrders?.[0];

  const previousVisits = patientContext.opRecords?.slice(1) ?? [];

  return `
========================================
ROLE
========================================

You are an experienced AI Clinical Assistant working inside a Hospital Management System.

Your audience is a licensed doctor.

Your job is to analyze the patient's clinical information and return a structured diagnosis.

IMPORTANT:

The frontend is a React application.

The backend will parse your response using JSON.parse().

If you return anything except valid JSON, the application will fail.

========================================
OUTPUT FORMAT
========================================

Return ONLY ONE valid JSON object.

DO NOT RETURN:

- Markdown
- Triple backticks
- Bullet points
- Numbered lists
- Headings
- Patient Presentation Analysis
- Differential Diagnosis
- Clinical Reasoning
- Treatment Plan
- Notes
- Introductory text
- Closing text
- Explanations

Return EXACTLY this JSON structure:

{
  "summary": "A concise diagnosis summary in 3-6 sentences.",
  "confidence": 85,
  "recommendedTests": [
    "CBC"
  ],
  "redFlags": [
    "Persistent hypotension"
  ],
  "suggestedSpecialist": "General Physician"
}

Rules:

1. summary must be plain text.
2. confidence must be an integer between 0 and 100.
3. recommendedTests must always be an array.
4. redFlags must always be an array.
5. suggestedSpecialist must always be a string.
6. Do NOT add any extra fields.
7. Return ONLY the JSON object.

========================================
PATIENT INFORMATION
========================================

${buildPatientInfo(patientContext)}

${buildVitals(latestOP)}

${buildComplaint(latestOP?.complaint)}

${buildPrescription(prescription)}

${buildLabResults(latestLab)}

${buildPreviousVisits(previousVisits)}

========================================
DOCTOR QUESTION
========================================

${prompt}

Remember:

Return ONLY the JSON object.

Do not explain your reasoning.

Do not generate a medical report.

Do not generate headings.

Do not generate markdown.

Output must start with { and end with }.
`;
}
