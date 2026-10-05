import Burger from "../assets/images/Burger.jpg"

const Hero = () => {
  return (
    <section className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div>

            <span className="inline-block bg-orange-500/10 text-orange-400 px-4 py-2 rounded-full text-sm">
              🍽️ Multi Vendor Food Delivery
            </span>

            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Delicious Food
              <br />
              <span className="text-orange-500">
                Delivered Fast
              </span>
            </h1>

            <p className="mt-6 text-slate-400 text-lg">
              Discover the best restaurants around you.
              Order food in seconds and track your order live.
            </p>

            {/* Search */}
            <div className="mt-8 flex bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">

              <input
                type="text"
                placeholder="Search food or restaurant..."
                className="flex-1 px-5 py-4 bg-transparent outline-none"
              />

              <button className="bg-orange-500 hover:bg-orange-600 px-8 transition">
                Search
              </button>

            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 mt-8">

              {["🍕 Pizza","🍔 Burger","🍜 Chinese","🍰 Dessert"].map((item)=>(
                <span
                  key={item}
                  className="px-4 py-2 rounded-full bg-slate-900 border border-slate-700"
                >
                  {item}
                </span>
              ))}

            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10">

              <div>
                <h2 className="text-2xl font-bold text-orange-500">500+</h2>
                <p className="text-slate-400 text-sm">Restaurants</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-orange-500">30 min</h2>
                <p className="text-slate-400 text-sm">Average Delivery</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-orange-500">50K+</h2>
                <p className="text-slate-400 text-sm">Happy Customers</p>
              </div>

            </div>

          </div>

          {/* Right */}
          <div className="flex justify-center">

            <img
              src={Burger}
              alt="Burger"
              className="rounded-3xl shadow-2xl w-full max-w-md object-cover"
            />

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;