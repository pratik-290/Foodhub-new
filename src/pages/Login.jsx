import { Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { useState } from "react";
import API from '../api/authApi';
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Login = () => {
const navigate = useNavigate();
const {login } = useAuth();

const [formData, setFormData] = useState({
  email: "",
  password: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", formData);

   login(res.data.token);


    toast.success("Login Successful ");

    navigate("/");

  } catch (err) {
    toast.error(err.response?.data?.message || "Login Failed");
    console.log(err.response.data);
  }
};
  return (
    <AuthLayout>
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-white">
          Welcome Back 
        </h1>

        <p className="mt-2 text-slate-400">
          Sign in to continue ordering your favorite food.
        </p>

        {/* Email */}
        <div className="relative mt-8">
          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            name = "email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none focus:border-orange-500"
          />
        </div>

        {/* Password */}
        <div className="relative mt-5">
          <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none focus:border-orange-500"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button className="text-sm text-orange-500 hover:underline">
            Forgot Password?
          </button>
        </div>

        <button onClick={handleLogin} className="mt-6 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600">
          Login
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-slate-700"></div>
          <span className="px-4 text-slate-400 text-sm">OR</span>
          <div className="h-px flex-1 bg-slate-700"></div>
        </div>

        

        <p className="mt-6 text-center text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-orange-500 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </AuthLayout>
  );
};

export default Login;