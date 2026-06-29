import axios from "axios";

const API = "http://localhost:5000/api/ai";

export const askAI = async (prompt: string, patientId?: string) => {
  const res = await axios.post(`${API}/chat`, {
    prompt,
    patientId,
  });

  return res.data;
};

export const getPatientContext = async (patientId: string) => {
  const res = await axios.get(`${API}/patient-context/${patientId}`);

  return res.data;
};
