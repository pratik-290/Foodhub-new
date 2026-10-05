import { FaStar } from "react-icons/fa";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { FiClock, FiHeart, FiMapPin } from "react-icons/fi";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/10">

      {/* Image */}
      <div className="relative h-56 overflow-hidden">

        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />


        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />


        <div className="absolute bottom-4 left-4 rounded-full bg-orange-500 px-3 py-1 text-sm font-semibold text-white">
          {restaurant.offer}
        </div>

        {/* Favourite */}
        <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur hover:bg-orange-500 transition">
          <FiHeart size={18} />
        </button>
      </div>

     
     
      <div className="p-5">


        <div className="flex items-start justify-between">

          <div>
            <h2 className="text-xl font-bold text-white">
              {restaurant.name}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {restaurant.cuisine}
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-xl bg-green-600 px-2 py-1 text-sm font-semibold">
            <FaStar size={12} />
            {restaurant.rating}
          </div>

        </div>



        <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-400">

          <div className="flex items-center gap-2">
            <FiClock />
            {restaurant.deliveryTime}
          </div>

          <div className="flex items-center gap-2">
            <FiMapPin />
            {restaurant.distance}
          </div>

        </div>



        <div className="mt-4 flex items-center justify-between">

          <p className="text-slate-300">
            ₹{restaurant.priceForTwo} for two
          </p>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              restaurant.isOpen
                ? "bg-green-500/20 text-green-400"
                : "bg-green-500/20  text-green-400"
            }`}
          >
            {restaurant.isOpen ? "Open" : "Open"}
          </span>

        </div>


        
        < button onClick={() => 
          navigate(`/restaurants/${restaurant.id}`)} className="mt-6 w-full rounded-2xl bg-orange-500 py-3 font-semibold transition hover:bg-orange-600" >
          View Menu
        </button>
  

      </div>

    </div>
  );
};

export default RestaurantCard;