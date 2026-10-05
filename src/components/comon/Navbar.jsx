import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { totalItems } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Restaurants", path: "/restaurants" },
    { name: "Orders", path: "/orders" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">

      <nav className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>

          {/* Logo */}
          <NavLink to="/">
            <h2 className="text-2xl font-bold text-white">
              Food<span className="text-orange-500">Hub</span>
            </h2>
          </NavLink>

        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-semibold"
                    : "text-slate-300 hover:text-orange-500 transition"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* Mobile Login / Logout */}
          {isLoggedIn ? (
            <button
              className="md:hidden"
              onClick={handleLogout}
            >
              <FiLogOut size={22} />
            </button>
          ) : (
            <NavLink to="/login" className="md:hidden">
              <FiUser size={22} />
            </NavLink>
          )}

          {/* Desktop Login / Logout */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login">
                <FiUser
                  size={23}
                  className="hover:text-orange-500 transition"
                />
              </NavLink>
            )}
          </div>

          {/* Cart */}
          <NavLink to="/cart">
            <button className="relative">
              <FiShoppingCart
                size={24}
                className="hover:text-orange-500 transition"
              />

              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                {totalItems}
              </span>
            </button>
          </NavLink>

        </div>

      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">

          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-4 ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <NavLink
            to="/cart"
            onClick={() => setOpen(false)}
            className="flex justify-between items-center px-6 py-4 text-slate-300 hover:bg-slate-800"
          >
            <span>Cart</span>

            <span className="bg-orange-500 rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {totalItems}
            </span>
          </NavLink>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full text-left px-6 py-4 text-red-400 hover:bg-slate-800"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="block px-6 py-4 text-slate-300 hover:bg-slate-800"
            >
              Login
            </NavLink>
          )}

        </div>
      )}

    </header>
  );
};

export default Navbar;