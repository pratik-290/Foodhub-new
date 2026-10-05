import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Offers = () => {
  return (
    <section className="py-20 bg-slate-950">

      <div className="max-w-7xl mx-auto px-4">

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-10 via-orange-0 to-red-500">

          {/* Background Blur */}
          <div className="absolute w-80 h-80 bg-white/10 rounded-full -top-32 -left-20 blur-3xl"></div>
          <div className="absolute w-72 h-72 bg-black/10 rounded-full -bottom-24 right-0 blur-3xl"></div>

          <div className="relative grid lg:grid-cols-2 gap-10 items-center p-10 lg:p-16">

            {/* Left */}
            <div>

              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                🔥 Limited Time Offer
              </span>

              <h2 className="text-4xl lg:text-6xl font-extrabold mt-6 leading-tight">
                50% OFF
                <br />
                Your First Order
              </h2>

              <p className="mt-6 text-orange-100 text-lg">
                Get delicious food delivered to your doorstep with
                exclusive discounts.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 items-center">

                <div className="bg-white text-orange-600 font-bold px-6 py-3 rounded-xl">
                  FOOD50
                </div>
                <NavLink to="/restaurants">
                <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-slate-900 transition">
                  Order Now
                  <FaArrowRight />
                </button>
                </NavLink>

              </div>

            </div>

            {/* Right */}

            <div className="flex justify-center">

              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800"
                alt="Burger"
                className="w-full max-w-md drop-shadow-2xl rounded-3xl"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Offers;