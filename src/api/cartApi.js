import API from "./authApi";

export const addToCart = (foodId, quantity) => {
  return API.post(`/cart?foodId=${foodId}&quantity=${quantity}`);
};

export const getCart = () => {
  return API.get("/cart");
};

export const removeFromCart = (id) => {
  return API.delete(`/cart/${id}`);
};