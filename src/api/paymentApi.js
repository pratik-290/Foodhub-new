import API from "./authApi";

export const createPaymentOrder = (orderId) => {
  return API.post(`/payments/${orderId}`);
};

export const verifyPayment = (data) => {
  return API.post("/payments/verify", data);
};