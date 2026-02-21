import axiosInstance from "../utils/axiosInstance.js";

export const registerUser = async (data) => {
  const response = await axiosInstance.post("/createuser", data);
  return response.data;
};