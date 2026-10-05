import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();

  const { subtotal, clearCart } = useCart();

  const [payment, setPayment] = useState("cod");

  const delivery = 40;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + gst;

  const handleOrder = () => {
    clearCart();
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12">

      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-10">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left */}

          <div className="lg:col-span-2 space-y-8">

            {/* Address */}

            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8">

              <h2 className="text-2xl font-bold mb-6">
                Delivery Address
              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                <input
                  placeholder="Full Name"
                  className="bg-slate-800 rounded-xl p-4 outline-none"
                />

                <input
                  placeholder="Phone Number"
                  className="bg-slate-800 rounded-xl p-4 outline-none"
                />

                <input
                  placeholder="City"
                  className="bg-slate-800 rounded-xl p-4 outline-none"
                />

                <input
                  placeholder="State"
                  className="bg-slate-800 rounded-xl p-4 outline-none"
                />

                <input
                  placeholder="Pincode"
                  className="bg-slate-800 rounded-xl p-4 outline-none"
                />

                <input
                  placeholder="Landmark"
                  className="bg-slate-800 rounded-xl p-4 outline-none"
                />

              </div>

              <textarea
                rows="4"
                placeholder="Full Address"
                className="w-full bg-slate-800 rounded-xl p-4 mt-5 outline-none"
              />

            </div>

            {/* Payment */}

            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8">

              <h2 className="text-2xl font-bold mb-6">
                Payment Method
              </h2>

              <div className="space-y-5">

                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="radio"
                    checked={payment === "cod"}
                    onChange={() => setPayment("cod")}
                  />

                  Cash on Delivery

                </label>

                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="radio"
                    checked={payment === "upi"}
                    onChange={() => setPayment("upi")}
                  />

                  UPI

                </label>

                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="radio"
                    checked={payment === "card"}
                    onChange={() => setPayment("card")}
                  />

                  Credit / Debit Card

                </label>

              </div>

            </div>

          </div>

          {/* Right */}

          <div>

            <div className="sticky top-24 bg-slate-900 rounded-3xl border border-slate-800 p-8">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>₹{delivery}</span>
                </div>

                <div className="flex justify-between">
                  <span>GST</span>
                  <span>₹{gst}</span>
                </div>

              </div>

              <hr className="my-6 border-slate-700"/>

              <div className="flex justify-between text-xl font-bold">

                <span>Total</span>

                <span className="text-orange-500">
                  ₹{total}
                </span>

              </div>

              <button
                onClick={handleOrder}
                className="w-full mt-8 bg-orange-500 hover:bg-orange-600 rounded-xl py-4 font-bold transition"
              >
                Place Order
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;