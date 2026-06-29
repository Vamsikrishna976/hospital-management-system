import { useEffect, useState } from "react";
import { getPatientContext } from "../services/ai.service";

export default function usePatientContext(patientId: string) {
  const [context, setContext] = useState<any>(null);
  const [loadingContext, setLoadingContext] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!patientId) {
      setContext(null);
      return;
    }

    const loadContext = async () => {
      try {
        setLoadingContext(true);
        setError("");

        const data = await getPatientContext(patientId);

        setContext(data);
      } catch (err) {
        console.error(err);

        setError("Failed to load patient context.");
      } finally {
        setLoadingContext(false);
      }
    };

    loadContext();
  }, [patientId]);

  return {
    context,
    loadingContext,
    error,
  };
}