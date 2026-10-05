import API from "./authApi";


export const getRestaurants = () => API.get("/restaurants");


export const getRestaurantById = (id) => {
  return API.get(`/restaurants/${id}`);
};