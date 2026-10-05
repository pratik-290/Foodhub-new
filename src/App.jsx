import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Restaurants from "../src/pages/Restaurant";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import RestaurantDetails from "../src/pages/RestaurantDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import { useEffect } from "react";
import socket from "./socket";
import { toast } from "react-toastify";

function App() {
 useEffect(() => {
  socket.on("connect", () => {
    console.log("Connected:", socket.id);
  });

  socket.on("orderPlaced", (data) => {
    console.log("Order Update:", data);

    toast.success(data.status);
  });

  return () => {
    socket.off("connect");
    socket.off("orderPlaced");
  };
}, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path ="/login" element={<Login/>}/>
      <Route path ="/register" element={<Register/>}/>
      <Route path = "/restaurants/:id" element={<RestaurantDetails/>}/>
      <Route path = "/cart" element={<Cart/>}/>
      <Route path = "/checkout" element={<Checkout/>}/>
      <Route path = "/orders" element={<Orders/>}/>

 
    </Routes>
  );
}

export default App;