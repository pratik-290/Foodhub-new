import restaurants from "../components/data/restaurant";
import RestaurantCard from "../pages/Restaurant";

const RestaurantGrid = () => {
  return (
    <div className="grid gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-3">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
        />
      ))}
    </div>
  );
};

export default RestaurantGrid;