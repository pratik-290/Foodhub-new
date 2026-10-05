import { NavLink } from "react-router-dom";
import RestaurantCard from "./RestrauntCard";
import { useEffect, useState } from "react";
import { getRestaurants } from "../api/restaurantApi";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  fetchRestaurants();
}, []);
 const fetchRestaurants = async () => {
    try {
      setLoading(true);

      const res = await getRestaurants();
      setRestaurants(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="py-20 bg-slate-950">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-orange-500 font-semibold">
              Restaurants
            </p>

            <h2 className="text-4xl font-bold mt-2">
              Popular Restaurants
            </h2>

          </div>
          <NavLink to='/restaurants'>
          <button className="text-orange-500 hover:text-orange-400">
            View All →
          </button>
          </NavLink>

        </div>

        <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">

          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default Restaurants;