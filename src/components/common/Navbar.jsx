import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiLogOut, FiLayout } from "react-icons/fi";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isSuperuser = localStorage.getItem("is_superuser") === "true";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_superuser");

    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Menu", path: "/menu" },
  ];

  return (
    <nav className="bg-[#0F172A] border-b-4 border-[#38BDF8]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Coffee House"
            className="w-16 h-16 object-contain"
          />

          <div className="hidden sm:block">
            <h1 className="text-white text-xl font-bold">Coffee House</h1>

            <p className="text-[#38BDF8] text-xs">Better Taste, Better Life</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `font-medium transition ${
                  isActive
                    ? "text-[#38BDF8]"
                    : "text-white hover:text-[#38BDF8]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          {token && (
            <Link
              to="/cart"
              className="text-white hover:text-[#38BDF8] font-medium transition flex items-center gap-1.5"
            >
              <FiShoppingCart className="text-lg" />
              Cart
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Admin Dashboard */}
          {token && isSuperuser && (
            <Link
              to="/admin/dashboard/"
              className="px-4 py-2 text-white font-medium hover:text-[#38BDF8] transition flex items-center gap-2"
            >
              <FiLayout className="text-lg" />
              Dashboard
            </Link>
          )}

          {/* Login */}
          {!token && (
            <Link
              to="/login"
              className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-5 py-2 rounded-lg font-semibold transition flex items-center gap-2"
            >
              <FiUser className="text-lg" />
              Login
            </Link>
          )}

          {/* Logout */}
          {token && (
            <button
              onClick={handleLogout}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2 rounded-lg font-semibold transition cursor-pointer flex items-center gap-2"
            >
              <FiLogOut className="text-lg" />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
