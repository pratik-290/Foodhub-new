import API from "./authApi";

export const placeOrder = () =>
  API.post("/orders");

export const getOrders = () =>
  API.get("/orders");

export const getOrderById = (id) => {
  return API.get(`/orders/${id}`);
};