import { useEffect, useState } from "react";

import Navbar from "../components/comon/Navbar";
import Footer from "../components/comon/Footer";

import { FaBoxOpen } from "react-icons/fa";
import {
  FiClock,
  FiCheckCircle,
  FiPackage,
  FiArrowLeft,
} from "react-icons/fi";

import { getOrders } from "../api/orderApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();

      setOrders(res.data);
    } catch (err) {
      console.log(err);

      toast.error("Unable to load orders");
    } finally {
      setLoading(false);
    }
  };

  
  const getStatusStyle = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-500/10 text-green-400 border border-green-500/20";

      case "PENDING":
        return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";

      case "PREPARING":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";

      case "OUT_FOR_DELIVERY":
        return "bg-purple-500/10 text-purple-400 border border-purple-500/20";

      case "DELIVERED":
        return "bg-green-500/10 text-green-400 border border-green-500/20";

      default:
        return "bg-slate-500/10 text-slate-400 border border-slate-500/20";
    }
  };

 
    const getStatusIcon = (status) => {
    switch (status) {
      case "CONFIRMED":
        return <FiCheckCircle size={16} />;

      case "PENDING":
        return <FiClock size={16} />;

      default:
        return <FiPackage size={16} />;
    }
  };


  
  const formatStatus = (status) => {
    if (!status) return "UNKNOWN";

    return status
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };


  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">

        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center">

          <div className="text-center">

            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-orange-500"></div>

            <p className="mt-5 text-slate-400">
              Loading your orders...
            </p>

          </div>

        </div>

        <Footer />

      </div>
    );
  }


  
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10">

        {/* HEADER */}

        <div className="mb-10">

          <button
            onClick={() => navigate("/restaurants")}
            className="mb-6 flex items-center gap-2 text-sm text-slate-400 transition hover:text-orange-500"
          >
            <FiArrowLeft />

            Continue Shopping
          </button>

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-orange-500/10 p-4">

              <FaBoxOpen
                size={30}
                className="text-orange-500"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold md:text-4xl">
                My Orders
              </h1>

              <p className="mt-1 text-slate-400">
                Track and view your recent orders.
              </p>

            </div>

          </div>

        </div>

        {/* NO ORDERS */}

        {orders.length === 0 ? (

          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-slate-800 bg-slate-900">

            <div className="rounded-full bg-orange-500/10 p-7">

              <FaBoxOpen
                size={55}
                className="text-orange-500"
              />

            </div>

            <h2 className="mt-6 text-2xl font-bold">
              No Orders Yet
            </h2>

            <p className="mt-2 text-center text-slate-400">
              You haven't placed any orders yet.
            </p>

            <button
              onClick={() => navigate("/restaurants")}
              className="mt-6 rounded-xl bg-orange-500 px-7 py-3 font-semibold transition hover:bg-orange-600"
            >
              Browse Restaurants
            </button>

          </div>

        ) : (


          
          <div className="space-y-5">

            {orders.map((order) => (

              <div
                key={order.id}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-5 transition hover:border-orange-500/30 md:p-7"
              >



                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">



                  <div className="flex items-center gap-4">

                    <div className="rounded-2xl bg-orange-500/10 p-4">

                      <FaBoxOpen
                        size={25}
                        className="text-orange-500"
                      />

                    </div>

                    <div>

                      <h2 className="text-xl font-bold">
                        Order #{order.id}
                      </h2>

                      <p className="mt-1 text-sm text-slate-400">
                        Placed on{" "}
                        {new Date(
                          order.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>

                  </div>

                  {/* STATUS */}

                  <div
                    className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${getStatusStyle(
                      order.status
                    )}`}
                  >

                    {getStatusIcon(order.status)}

                    {formatStatus(order.status)}

                  </div>

                </div>

                {/* DIVIDER */}

                <div className="my-6 border-t border-slate-800"></div>

                {/* BOTTOM */}

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p className="text-sm text-slate-500">
                      Order ID
                    </p>

                    <p className="mt-1 font-semibold text-slate-300">
                      #{order.id}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-slate-500">
                      Order Status
                    </p>

                    <p className="mt-1 font-semibold">
                      {formatStatus(order.status)}
                    </p>

                  </div>

                  <div className="sm:text-right">

                    <p className="text-sm text-slate-500">
                      Total Amount
                    </p>

                    <p className="mt-1 text-2xl font-bold text-orange-500">
                      ₹{order.totalAmount}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

      <Footer />

    </div>
  );
};

export default Orders;