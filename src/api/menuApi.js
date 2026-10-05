import API from "./authApi";

export const getMenu = (restaurantId) => {
  return API.get(`/restaurants/${restaurantId}/foods`);
};