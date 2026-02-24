import axiosInstance from "../utils/axiosInstance.js";
export const registerUser = async (data) => {
  const response = await axiosInstance.post("/createuser", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axiosInstance.post("/login", data);
  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await axiosInstance.post("/verify-otp", { email, otp });
  return response.data;
};