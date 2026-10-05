import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import { toast } from "react-toastify";

import { registerUser } from "../api/authApi";
import AuthLayout from "../components/auth/AuthLayout";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    if (
      !user.name ||
      !user.email ||
      !user.phone ||
      !user.password ||
      !confirmPassword
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (user.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await registerUser(user);

      toast.success(res.data.message);

      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="mt-2 text-slate-400">
          Join FoodHub and start ordering delicious food.
        </p>

        {/* Name */}
        <div className="relative mt-8">
          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none focus:border-orange-500"
          />
        </div>

        {/* Email */}
        <div className="relative mt-5">
          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none focus:border-orange-500"
          />
        </div>

        {/* Phone */}
        <div className="relative mt-5">
          <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none focus:border-orange-500"
          />
        </div>

        {/* Password */}
        <div className="relative mt-5">
          <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none focus:border-orange-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="relative mt-5">
          <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none focus:border-orange-500"
          />
        </div>

        <button
          onClick={handleRegister}
          className="mt-8 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Register
        </button>

        <p className="mt-6 text-center text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-orange-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;