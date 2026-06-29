import axios from "axios";
import type { DiagnosisResult } from "../../types/diagnosis";

const API_URL = "http://localhost:5000/api/ai";

export async function generateDiagnosis(
  prompt: string,
  patientId?: string
): Promise<DiagnosisResult> {
  const { data } = await axios.post(`${API_URL}/diagnosis`, {
    prompt,
    patientId,
  });

  return data;
}