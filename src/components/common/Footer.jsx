import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white border-t border-slate-800">
      {/* Top Banner - Fills Gap Before Footer */}
      <div className="bg-gradient-to-r from-[#1E293B] via-[#0284C7]/20 to-[#1E293B] border-b border-slate-800 py-8 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-3xl">🎁☕✨</span>
          <h3 className="text-xl md:text-2xl font-bold text-white mt-2">
            Craving Special Handcrafted Coffee?
          </h3>
          <p className="text-[#94A3B8] text-sm mt-1">
            Visit our outlet or explore our online menu for fresh brews & delicious snacks everyday! 🚀
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={logo}
                alt="Coffee House"
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Coffee House
                </h2>

                <p className="text-[#38BDF8] text-sm mt-1">
                  Better Taste, Better Life
                </p>
              </div>
            </Link>

            <p className="text-[#94A3B8] text-sm leading-relaxed mt-5 max-w-md">
              Enjoy freshly brewed coffee, refreshing tea, delicious snacks,
              and sweet desserts made to make every moment special.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-5 text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-[#94A3B8] hover:text-[#38BDF8] transition"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="text-[#94A3B8] hover:text-[#38BDF8] transition"
              >
                About Us
              </Link>

              <Link
                to="/menu"
                className="text-[#94A3B8] hover:text-[#38BDF8] transition"
              >
                Our Menu
              </Link>

              <Link
                to="/login"
                className="text-[#94A3B8] hover:text-[#38BDF8] transition"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Menu Categories */}
          <div>
            <h3 className="text-lg font-bold mb-5 text-white">
              Our Menu
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                to="/menu?category=Coffee"
                className="text-[#94A3B8] hover:text-[#38BDF8] transition"
              >
                Coffee
              </Link>

              <Link
                to="/menu?category=Tea"
                className="text-[#94A3B8] hover:text-[#38BDF8] transition"
              >
                Tea
              </Link>

              <Link
                to="/menu?category=Snack"
                className="text-[#94A3B8] hover:text-[#38BDF8] transition"
              >
                Snacks
              </Link>

              <Link
                to="/menu?category=Dessert"
                className="text-[#94A3B8] hover:text-[#38BDF8] transition"
              >
                Desserts
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#94A3B8] text-sm">
            © {new Date().getFullYear()} Coffee House. All rights reserved.
          </p>

          <p className="text-[#94A3B8] text-sm">
            Made with <span className="text-[#38BDF8]">♥</span> and Coffee ☕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
