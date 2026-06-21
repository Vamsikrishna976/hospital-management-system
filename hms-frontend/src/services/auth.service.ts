import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const loginUser = async (
  email: string,
  password: string
) => {
  console.log("LOGIN URL:", `${API}/login`);
  const response = await axios.post(
    `${API}/login`,
    {
      email,
      password,
    }
  );

  return response.data;
};