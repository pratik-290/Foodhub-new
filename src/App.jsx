import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Restaurants from "../src/pages/Restaurant";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import RestaurantDetails from "../src/pages/RestaurantDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/restaurants/:id" element={<RestaurantDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
}

export default App;