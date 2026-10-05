import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { CartProvider, useCart } from "../../context/CartContext";

const FoodCard = ({ food }) => {
    const {addToCart} = useCart();
  return (
    <div className="flex items-center justify-between border-b border-slate-800 py-6">

      {/* Left */}
      <div className="flex-1 pr-5">

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>

          <h3 className="text-xl font-semibold text-white">
            {food.name}
          </h3>

          <FiHeart
            size={18}
            className="cursor-pointer text-slate-500 hover:text-red-500"
          />
        </div>

        <div className="mt-2 flex items-center gap-4">

          <span className="flex items-center gap-1 text-yellow-400 text-sm">
            <FaStar size={13} />
            {food.rating}
          </span>

          <span className="font-semibold text-orange-500">
            ₹{food.price}
          </span>

        </div>

        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
          {food.description}
        </p>

      </div>

      {/* Right */}
      <div className="relative">

        <img
          src={food.image}
          alt={food.name}
          className="h-28 w-28 rounded-2xl object-cover shadow-lg"
        />

       

      </div>

    </div>
  );
};

export default FoodCard;