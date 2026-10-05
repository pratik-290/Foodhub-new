import Navbar from "../components/comon/Navbar";
import Hero from "../home/Hero";
import Categories from "../home/Categories";
import Restaurants from "../home/Restaurants";
import FeaturedFoods from "../home/FeaturedFoods";
import Offers from "../home/Offers";


import Footer from "../components/comon/Footer";

const Home = () => {
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <Navbar />

      <main>
        <Hero />
        <Categories />
        <Restaurants />
        <FeaturedFoods />
        <Offers />
      </main>

      <Footer />
    </div>
  );
};

export default Home;