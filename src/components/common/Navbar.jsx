import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiLogOut, FiLayout, FiMenu, FiX } from "react-icons/fi";
import Logo from "./Logo";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("token");
  const isSuperuser = localStorage.getItem("is_superuser") === "true";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Menu", path: "/menu" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-amber-950/40 backdrop-blur-md border-b border-amber-500/40 z-50 shadow-lg shadow-amber-950/40 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 md:h-16 flex items-center justify-between">
        <Logo />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `font-bold text-xs md:text-sm tracking-wide transition ${
                  isActive
                    ? "text-amber-300 border-b-2 border-amber-400 pb-0.5 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                    : "text-amber-100/90 hover:text-amber-300"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          {token && (
            <Link
              to="/cart"
              className="text-amber-100/90 hover:text-amber-300 font-bold text-xs md:text-sm transition flex items-center gap-1"
            >
              <FiShoppingCart className="text-sm text-amber-400" />
              Cart
            </Link>
          )}
        </div>

        {/* Right Desktop */}
        <div className="hidden md:flex items-center gap-2.5">
          {token && isSuperuser && (
            <Link
              to="/admin/dashboard/"
              className="px-3 py-1 text-amber-300 font-bold hover:text-amber-100 transition flex items-center gap-1 border border-amber-500/50 bg-amber-900/40 backdrop-blur-sm rounded-lg text-xs shadow-md"
            >
              <FiLayout className="text-sm text-amber-400" />
              Dashboard
            </Link>
          )}

          {!token && (
            <Link
              to="/login"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-black px-3.5 py-1.5 rounded-lg text-xs transition flex items-center gap-1 shadow-md shadow-amber-500/20 active:scale-95"
            >
              <FiUser className="text-xs text-amber-950" />
              Login
            </Link>
          )}

          {token && (
            <button
              onClick={handleLogout}
              className="bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-500/40 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1"
            >
              <FiLogOut className="text-xs" />
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-1.5">
          {token && (
            <Link to="/cart" className="text-amber-400 p-1.5 text-base">
              <FiShoppingCart />
            </Link>
          )}
          {token && isSuperuser && (
            <Link to="/admin/dashboard/" className="text-amber-400 p-1.5 text-base">
              <FiLayout />
            </Link>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-amber-300 p-1.5 text-xl focus:outline-none"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-amber-950/95 backdrop-blur-xl border-b border-amber-500/40 px-5 py-3 flex flex-col gap-2.5 shadow-2xl">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `font-bold py-1 text-xs transition ${
                  isActive ? "text-amber-300 font-black" : "text-amber-100/80"
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
              className="text-amber-300 py-1 font-bold text-xs flex items-center gap-1.5"
            >
              <FiLayout className="text-amber-400 text-sm" />
              Dashboard (Admin)
            </Link>
          )}

          {!token ? (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 px-3 py-1.5 rounded-lg text-center text-xs font-black flex items-center justify-center gap-1.5 shadow-md"
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
              className="bg-red-950/80 text-red-300 border border-red-500/40 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5"
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
