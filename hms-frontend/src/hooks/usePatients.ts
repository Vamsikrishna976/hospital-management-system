import { useEffect, useState } from "react";
import { getPatients } from "../services/patient.service";
import type { Patient } from "../../types/ai";

export default function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingPatients(false);
      }
    };

    load();
  }, []);

  return {
    patients,
    loadingPatients,
  };
}