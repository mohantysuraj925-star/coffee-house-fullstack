import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiLogOut, FiLayout, FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="bg-[#0F172A] border-b-4 border-[#38BDF8] relative z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Coffee House"
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
          />
          <div>
            <h1 className="text-white text-lg md:text-xl font-bold">Coffee House</h1>
            <p className="text-[#38BDF8] text-[10px] md:text-xs">Better Taste, Better Life</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
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

        {/* Right Side Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {token && isSuperuser && (
            <Link
              to="/admin/dashboard/"
              className="px-4 py-2 text-white font-medium hover:text-[#38BDF8] transition flex items-center gap-2"
            >
              <FiLayout className="text-lg" />
              Dashboard
            </Link>
          )}

          {!token && (
            <Link
              to="/login"
              className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-5 py-2 rounded-lg font-semibold transition flex items-center gap-2"
            >
              <FiUser className="text-lg" />
              Login
            </Link>
          )}

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

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {token && (
            <Link to="/cart" className="text-white p-2 text-xl">
              <FiShoppingCart />
            </Link>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 text-2xl focus:outline-none"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1E293B] border-b-2 border-[#38BDF8] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `font-medium py-1 text-base transition ${
                  isActive ? "text-[#38BDF8]" : "text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {token && isSuperuser && (
            <Link
              to="/admin/dashboard/"
              onClick={() => setIsOpen(false)}
              className="text-white py-1 font-medium flex items-center gap-2"
            >
              <FiLayout />
              Dashboard
            </Link>
          )}

          {!token ? (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="bg-[#0284C7] text-white px-4 py-2 rounded-lg text-center font-semibold flex items-center justify-center gap-2"
            >
              <FiUser />
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="bg-[#2563EB] text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <FiLogOut />
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
