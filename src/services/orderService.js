import axiosInstance from "../utils/axiosInstance";

export const getMyOrders = async () => {
  const response = await axiosInstance.get("/myorders");
  return response.data;
};
