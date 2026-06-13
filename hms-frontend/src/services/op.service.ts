import axios from "axios";

const API = "http://localhost:5000/api/op";

export const createOP = async (data: any) => {
  const response = await axios.post(API, data);
  return response.data;
};