import Navbar from "../components/comon/Navbar";
import Footer from "../components/comon/Footer";
import RestaurantCard from "../home/RestrauntCard";
import { FiSearch, FiLoader } from "react-icons/fi";
import { getRestaurants } from "../api/restaurantApi";
import { useEffect, useState } from "react";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);

      const res = await getRestaurants();
      console.log("RESTAURANT API RESPONSE:", res);
      console.log("RESTAURANT DATA:", res.data);

      setRestaurants(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 py-10">

        <h1 className="text-4xl font-bold">
          Restaurants Near You
        </h1>

        <p className="text-slate-400 mt-2">
          Discover delicious food from top-rated restaurants.
        </p>

        <div className="relative mt-8">
          <FiSearch
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            size={22}
          />

          <input
            type="text"
            placeholder="Search restaurants..."
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 pl-14 outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
          {[
            "All",
            "Burger",
            "Pizza",
            "Indian",
            "Chinese",
            "Cafe",
            "Desserts",
          ].map((item) => (
            <button
              key={item}
              className="px-5 py-2 rounded-full bg-slate-900 border border-slate-700 hover:bg-orange-500 hover:border-orange-500 transition whitespace-nowrap"
            >
              {item}
            </button>
          ))}
        </div>

     

        {loading ? (

          <div className="flex flex-col items-center justify-center py-32">

            <FiLoader
              size={50}
              className="text-orange-500 animate-spin"
            />

            <p className="mt-6 text-xl font-semibold text-white">
              Loading restaurants...
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Please wait while we fetch the restaurants.
            </p>

          </div>

        ) : restaurants.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant._id}
                restaurant={restaurant}
              />
            ))}

          </div>

        ) : (

          <div className="py-32 text-center">

            <p className="text-xl text-slate-400">
              No restaurants found.
            </p>

          </div>

        )}

      </section>

      <Footer />
    </div>
  );
};

export default Restaurant;