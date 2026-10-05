import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/comon/Navbar";
import Footer from "../components/comon/Footer";

import { getCart, removeFromCart } from "../api/cartApi";
import { placeOrder } from "../api/orderApi";
import {
  createPaymentOrder,
  verifyPayment,
} from "../api/paymentApi";

import { toast } from "react-toastify";

import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
  FiArrowLeft,
  FiCreditCard,
} from "react-icons/fi";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Please login");
    }
  };


  
  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);

      toast.success("Item removed");

      fetchCart();
    } catch (err) {
      console.log(err);

      toast.error("Unable to remove item");
    }
  };


  
  const handlePayment = async () => {
  try {
    setLoading(true);

    console.log("1️⃣ Creating FoodUp order...");

    const orderResponse = await placeOrder();

    console.log("FoodUp order response:", orderResponse.data);

    const orderId = orderResponse.data.id;

    console.log("2️⃣ FoodUp Order ID:", orderId);

    console.log("3️⃣ Creating Razorpay order...");

    const paymentResponse = await createPaymentOrder(orderId);

    console.log(
      "Razorpay order response:",
      paymentResponse.data
    );

    const paymentData = paymentResponse.data;

    console.log("Razorpay Order ID:", paymentData.paymentId);
    console.log("Amount:", paymentData.amount);

    console.log("4️⃣ Opening Razorpay...");

    const options = {
      key: "rzp_test_TKyhtuSCioLNk0",

      amount: paymentData.amount * 100,

      currency: "INR",

      name: "FoodHub",

      description: "FoodHub Food Order",

      order_id: paymentData.paymentId,

      handler: async function (response) {
        console.log(
          "Razorpay success response:",
          response
        );

        try {
          await verifyPayment({
            razorpayOrderId:
              response.razorpay_order_id,

            razorpayPaymentId:
              response.razorpay_payment_id,

            razorpaySignature:
              response.razorpay_signature,
          });

          toast.success(
            "Payment successful!"
          );

          navigate("/orders");

        } catch (error) {
          console.error(
            "Verification error:",
            error
          );

          toast.error(
            "Payment verification failed"
          );
        }
      },

      modal: {
        ondismiss: function () {
          console.log("Razorpay closed");

          setLoading(false);
        },
      },

      theme: {
        color: "#f97316",
      },
    };

    console.log("Razorpay options:", options);

    const razorpay =
      new window.Razorpay(options);

    razorpay.open();

    setLoading(false);

  } catch (error) {

    console.error(
      "❌ PAYMENT ERROR:",
      error
    );

    console.error(
      "❌ RESPONSE:",
      error.response
    );

    console.error(
      "❌ RESPONSE DATA:",
      error.response?.data
    );

    console.error(
      "❌ STATUS:",
      error.response?.status
    );

    toast.error(
      error.response?.data?.message ||
      "Unable to start payment"
    );

    setLoading(false);
  }
};
  
  const subtotal = cart.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const deliveryFee = subtotal > 0 ? 40 : 0;

  const taxes = Math.round(subtotal * 0.05);

  const grandTotal =
    subtotal +
    deliveryFee +
    taxes;


    
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10">

        {/* HEADER */}

        <div className="mb-8">

          <button
            onClick={() => navigate("/restaurants")}
            className="mb-5 flex items-center gap-2 text-sm text-slate-400 transition hover:text-orange-500"
          >
            <FiArrowLeft />

            Continue Shopping
          </button>

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-orange-500/10 p-4">

              <FiShoppingBag
                size={28}
                className="text-orange-500"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold md:text-4xl">
                My Cart
              </h1>

              <p className="mt-1 text-slate-400">
                Review your items before checkout.
              </p>

            </div>

          </div>

        </div>

        {/* EMPTY CART */}

        {cart.length === 0 ? (

          <div className="flex min-h-[450px] flex-col items-center justify-center rounded-3xl border border-slate-800 bg-slate-900">

            <div className="rounded-full bg-orange-500/10 p-7">

              <FiShoppingBag
                size={55}
                className="text-orange-500"
              />

            </div>

            <h2 className="mt-6 text-2xl font-bold">
              Your cart is empty
            </h2>

            <p className="mt-2 text-center text-slate-400">
              Add some delicious food to get started.
            </p>

            <button
              onClick={() => navigate("/restaurants")}
              className="mt-6 rounded-xl bg-orange-500 px-7 py-3 font-semibold transition hover:bg-orange-600"
            >
              Browse Restaurants
            </button>

          </div>

        ) : (

          <div className="grid gap-8 lg:grid-cols-3">

            {/* =========================
                CART ITEMS
            ========================= */}

            <div className="lg:col-span-2">

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 md:p-7">

                <div className="mb-6 flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-bold">
                      Your Items
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      {cart.length} item
                      {cart.length > 1 ? "s" : ""}
                    </p>

                  </div>

                </div>

                <div className="space-y-5">

                  {cart.map((item) => (

                    <div
                      key={item.id}
                      className="flex flex-col gap-5 rounded-2xl border border-slate-800 bg-slate-950 p-4 transition hover:border-orange-500/40 sm:flex-row sm:items-center"
                    >

                      {/* FOOD IMAGE */}

                      <img
                        src={item.imageUrl}
                        alt={item.foodName}
                        className="h-28 w-full rounded-xl object-cover sm:h-24 sm:w-24"
                      />

                      {/* FOOD DETAILS */}

                      <div className="flex-1">

                        <h3 className="text-xl font-bold">
                          {item.foodName}
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                          ₹{item.price} per item
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                          Food ID: {item.foodId}
                        </p>

                      </div>

                      {/* QUANTITY + PRICE */}

                      <div className="flex items-center justify-between gap-5 sm:justify-end">

                        {/* QUANTITY */}

                        <div className="flex items-center rounded-xl border border-slate-700 bg-slate-900">

                          <button
                            className="p-2 text-slate-400 transition hover:text-white"
                          >
                            <FiMinus size={16} />
                          </button>

                          <span className="px-4 font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            className="p-2 text-slate-400 transition hover:text-white"
                          >
                            <FiPlus size={16} />
                          </button>

                        </div>

                        {/* PRICE */}

                        <div className="text-right">

                          <p className="text-xl font-bold text-orange-500">
                            ₹{item.totalPrice}
                          </p>

                          <button
                            onClick={() =>
                              handleRemove(item.id)
                            }
                            className="mt-2 flex items-center gap-1 text-sm text-red-400 transition hover:text-red-300"
                          >

                            <FiTrash2 size={14} />

                            Remove

                          </button>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

            {/* =========================
                ORDER SUMMARY
            ========================= */}

            <div>

              <div className="sticky top-6 rounded-3xl border border-slate-800 bg-slate-900 p-6">

                <h2 className="text-2xl font-bold">
                  Order Summary
                </h2>

                {/* PRICE BREAKDOWN */}

                <div className="mt-7 space-y-4">

                  <div className="flex justify-between text-slate-400">

                    <span>
                      Subtotal
                    </span>

                    <span className="text-white">
                      ₹{subtotal}
                    </span>

                  </div>

                  <div className="flex justify-between text-slate-400">

                    <span>
                      Delivery Fee
                    </span>

                    <span className="text-white">
                      ₹{deliveryFee}
                    </span>

                  </div>

                  <div className="flex justify-between text-slate-400">

                    <span>
                      Taxes & Charges
                    </span>

                    <span className="text-white">
                      ₹{taxes}
                    </span>

                  </div>

                </div>

                <div className="my-6 border-t border-slate-800"></div>

                {/* TOTAL */}

                <div className="flex items-center justify-between">

                  <span className="text-lg font-semibold">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-orange-500">
                    ₹{grandTotal}
                  </span>

                </div>

                {/* PAYMENT BUTTON */}

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 font-bold transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  <FiCreditCard size={20} />

                  {loading
                    ? "Starting Payment..."
                    : "Proceed to Payment"}

                </button>

                {/* CONTINUE SHOPPING */}

                <button
                  onClick={() =>
                    navigate("/restaurants")
                  }
                  className="mt-3 w-full rounded-2xl border border-slate-700 py-3 font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                  Continue Shopping
                </button>

                {/* SECURITY */}

                <div className="mt-5 rounded-xl bg-slate-950 p-4">

                  <p className="text-center text-xs text-slate-400">
                    Secure checkout
                  </p>

                  <p className="mt-1 text-center text-xs text-slate-500">
                    Your payment information is protected.
                  </p>

                </div>

              </div>

            </div>

          </div>

        )}

      </main>

      <Footer />

    </div>
  );
};

export default Cart;