import { useCallback, useState } from "react";
import { generateDiagnosis } from "../services/diagnosis.service";
import type { DiagnosisResult } from "../../types/diagnosis";

export default function useDiagnosis() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const analyzeDiagnosis = useCallback(
    async (prompt: string, patientId?: string) => {
      try {
        setLoading(true);
        setError("");

        const response = await generateDiagnosis(prompt, patientId);

        setResult(response);
      } catch (err) {
        console.error(err);

        setError("Failed to generate diagnosis.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const resetDiagnosis = useCallback(() => {
    setResult(null);
    setError("");
  }, []);

  return {
    loading,
    error,
    result,
    analyzeDiagnosis,
    resetDiagnosis,
  };
}