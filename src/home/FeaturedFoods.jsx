import FoodCard from "../components/restaurant/FoodCard";

const foods = [
  {
    id: 1,
    name: "Pepperoni Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    rating: 4.9,
    reviews: 250,
    price: 299,
    oldPrice: 399,
    offer: "20% OFF",
  },
  {
    id: 2,
    name: "Cheese Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    rating: 4.8,
    reviews: 190,
    price: 249,
    oldPrice: 349,
    offer: "15% OFF",
  },
  {
    id: 3,
    name: "Chicken Biryani",
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800",
    rating: 4.7,
    reviews: 320,
    price: 279,
    oldPrice: 359,
    offer: "25% OFF",
  },
  {
    id: 4,
    name: "Chocolate Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
    rating: 4.9,
    reviews: 140,
    price: 199,
    oldPrice: 249,
    offer: "10% OFF",
  },
];

const FeaturedFoods = () => {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">

        <div className="mb-12">
          <p className="text-orange-500 font-semibold">Featured Menu</p>
          <h2 className="text-4xl font-bold mt-2">
            Today's Best Deals
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedFoods;