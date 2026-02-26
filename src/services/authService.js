import axiosInstance from "../utils/axiosInstance.js";

export const fetchCart = async () => {
  const response = await axiosInstance.get("/cart/");
  return response.data.items || [];
};

// Add item to cart in backend
export const addToCartBackend = async (item) => {
  const response = await axiosInstance.post("/cart/add", item);
  return response.data.items || [];
};

// Update item quantity in backend
export const updateCartItemBackend = async ({ foodItem, size, quantity }) => {
  const response = await axiosInstance.put("/cart/update", { foodItem, size, quantity });
  return response.data.items || [];
};

// Remove item from cart in backend
export const removeFromCartBackend = async ({ foodItem, size }) => {
  const response = await axiosInstance.delete("/cart/remove", { data: { foodItem, size } });
  return response.data.items || [];
};

// Clear cart in backend (after checkout)
export const clearCartBackend = async () => {
  // No direct endpoint, but after checkout, backend clears cart
  return [];
};

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

export const checkout = async (orderData) => {
  const response = await axiosInstance.post("/orderData", {
    order_data: orderData,
    order_date: new Date().toDateString()
  });
  return response.data;
};