import {
  FaPizzaSlice,
  FaHamburger,
  FaCoffee,
  FaIceCream,
} from "react-icons/fa";

import {
  GiNoodles,
  GiSushis,
  GiTacos,
  GiFruitBowl,
} from "react-icons/gi";

const categories = [
  { name: "Pizza", icon: <FaPizzaSlice size={34} /> },
  { name: "Burger", icon: <FaHamburger size={34} /> },
  { name: "Chinese", icon: <GiNoodles size={34} /> },
  { name: "Healthy", icon: <GiFruitBowl size={34} /> },
  { name: "Dessert", icon: <FaIceCream size={34} /> },
  { name: "Coffee", icon: <FaCoffee size={34} /> },
  { name: "Mexican", icon: <GiTacos size={34} /> },
  { name: "Sushi", icon: <GiSushis size={34} /> },
];

const Categories = () => {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center">

          <p className="text-orange-500 font-semibold">
            Categories
          </p>

          <h2 className="text-4xl font-bold mt-2">
            Explore by Category
          </h2>

          <p className="text-slate-400 mt-3">
            Find your favorite cuisine in just one click.
          </p>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-14">

          {categories.map((item) => (
            <div
              key={item.name}
              className="group bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20"
            >
              <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                {item.name}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Categories;