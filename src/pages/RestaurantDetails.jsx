import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiClock, FiMapPin, FiHeart, FiSearch } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

import Navbar from "../components/comon/Navbar";
import Footer from "../components/comon/Footer";

import { getRestaurantById } from "../api/restaurantApi";
import { getMenu } from "../api/menuApi";
import { addToCart } from "../api/cartApi";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";


const RestaurantDetails = () => {
  const { id } = useParams();
  const { fetchCart } = useCart();

  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const handleAddToCart = async (food) => {
  try {
    await addToCart(food.id, 1);
    
    await fetchCart();
    toast.success("Added to Cart ");

  } catch (err) {
    console.log(err);
    toast.error("Please login");
  }
};
  useEffect(() => {
    fetchRestaurant();
    fetchMenu();
  }, [id]);

  const fetchRestaurant = async () => {
    try {
      const res = await getRestaurantById(id);
      setRestaurant(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMenu = async () => {
    try {
      const res = await getMenu(id);
      setMenu(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      {/* Hero */}

      <section className="relative">

        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-[320px] w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute bottom-0 left-1/2 w-full max-w-6xl -translate-x-1/2 translate-y-1/2 px-4">

          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8">

            <div className="flex flex-col justify-between gap-6 md:flex-row">

              <div>

                <h1 className="text-4xl font-bold">
                  {restaurant.name}
                </h1>

                <p className="mt-2 text-slate-400">
                  {restaurant.cuisine}
                </p>

                <div className="mt-5 flex flex-wrap gap-6">

                  <span className="flex items-center gap-2">
                    <FaStar className="text-yellow-400" />
                    {restaurant.rating}
                  </span>

                  <span className="flex items-center gap-2">
                    <FiClock />
                    {restaurant.deliveryTime}
                  </span>

                  <span className="flex items-center gap-2">
                    <FiMapPin />
                    {restaurant.distance}
                  </span>

                  <span>
                    ₹{restaurant.priceForTwo} for two
                  </span>

                </div>

              </div>

              <div className="flex gap-3">

                <button className="rounded-xl bg-orange-500 px-6 py-3 font-semibold">
                  {restaurant.offer}
                </button>

                <button className="rounded-xl border border-slate-700 p-3 hover:bg-slate-800">
                  <FiHeart size={22} /> 
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      

      <section className="mx-auto mt-36 max-w-6xl px-4">

        <div className="relative">

          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search food..."
            className="w-full rounded-xl border border-slate-700 bg-slate-900 py-4 pl-12 pr-4 outline-none focus:border-orange-500"
          />

        </div>

      </section>

      

      <section className="mx-auto mt-10 max-w-6xl px-4">

        <div className="grid gap-6">

          {menu.length > 0 ? (
            menu.map((food) => (

              <div
                key={food.id}
                className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5 hover:border-orange-500 transition"
              >

                <div className="flex-1">

                  <p className="text-sm font-medium text-orange-500">
                    {food.category}
                  </p>

                  <h3 className="mt-1 text-xl font-semibold">
                    {food.nameUrl}
                  </h3>

                  <p className="mt-2 text-slate-400">
                    {food.description}
                  </p>

                  <div className="mt-3 flex items-center gap-5">

                    <span className="font-bold text-orange-500">
                      ₹{food.price}
                    </span>

                    

                    

                  </div>

                </div>

                <div className="relative">

                  <img
                    src={food.imageUrl}
                    alt={food.name}
                    className="h-28 w-28 rounded-xl object-cover"
                  />

                  <button onClick={()=>{handleAddToCart(food)}} className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-lg bg-orange-500 px-5 py-1 text-white hover:bg-orange-600">
                    ADD
                  </button>

                </div>

              </div>

            ))
          ) : (
            <div className="py-20 text-center text-xl text-slate-400">
              No Menu Available
            </div>
          )}

        </div>

      </section>

      <Footer />

    </div>
  );
};

export default RestaurantDetails;