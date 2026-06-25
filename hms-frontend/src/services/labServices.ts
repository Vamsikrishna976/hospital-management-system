import axios from "axios";

const API = "http://localhost:5000/api/lab";

export const getLabTests = () =>
  axios.get(`${API}/tests`);

export const getPendingOrders = () =>
  axios.get(`${API}/orders/pending`);

export const getAllOrders = () =>
  axios.get(`${API}/orders`);

export const createLabOrder = (data: any) =>
  axios.post(`${API}/orders`, data);

export const uploadResult = (
  itemId: string,
  data: any
) =>
  axios.put(`${API}/results/${itemId}`, data);