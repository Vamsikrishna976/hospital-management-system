import axios from "axios";

const API = "http://localhost:5000/api/patients";

export const searchPatient = async (
  mobile: string
) => {
  const res = await axios.get(
    `${API}/search?mobile=${mobile}`
  );

  return res.data;
};

export const createPatient = async (
  patientData: any
) => {
  const res = await axios.post(
    API,
    patientData
  );

  return res.data;
};