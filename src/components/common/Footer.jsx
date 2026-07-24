import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white border-t border-slate-800/80 mt-auto">
      {/* Top Interactive Banner */}
      <div className="bg-gradient-to-r from-[#1E293B] via-[#0284C7]/20 to-[#1E293B] border-b border-slate-800 py-6 px-6 text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>☕</span> Craving Special Handcrafted Coffee?
            </h3>
            <p className="text-[#94A3B8] text-xs mt-0.5">
              Explore our online menu for fresh brews & delicious snacks delivered hot!
            </p>
          </div>
          <Link
            to="/menu"
            className="px-5 py-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-xl transition shadow-lg shrink-0"
          >
            Order Now →
          </Link>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Socials */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={logo}
                alt="Coffee House"
                className="w-14 h-14 object-contain"
              />
              <div>
                <h2 className="text-xl font-bold text-white">Coffee House</h2>
                <p className="text-[#38BDF8] text-xs font-medium">Better Taste, Better Life</p>
              </div>
            </Link>

            <p className="text-[#94A3B8] text-xs leading-relaxed mt-4 max-w-sm">
              Freshly brewed coffee, premium tea blends, handmade snacks, and delicious desserts.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-5">
              <a href="#" className="w-9 h-9 bg-[#1E293B] border border-slate-700/80 rounded-xl flex items-center justify-center text-[#38BDF8] hover:bg-[#0284C7] hover:text-white transition">
                📸
              </a>
              <a href="#" className="w-9 h-9 bg-[#1E293B] border border-slate-700/80 rounded-xl flex items-center justify-center text-[#38BDF8] hover:bg-[#0284C7] hover:text-white transition">
                🌐
              </a>
              <a href="#" className="w-9 h-9 bg-[#1E293B] border border-slate-700/80 rounded-xl flex items-center justify-center text-[#38BDF8] hover:bg-[#0284C7] hover:text-white transition">
                🎥
              </a>
              <a href="#" className="w-9 h-9 bg-[#1E293B] border border-slate-700/80 rounded-xl flex items-center justify-center text-[#38BDF8] hover:bg-[#0284C7] hover:text-white transition">
                💬
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#38BDF8] mb-4">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2.5 text-xs text-[#94A3B8]">
              <Link to="/" className="hover:text-white transition">Home</Link>
              <Link to="/about" className="hover:text-white transition">About Us</Link>
              <Link to="/menu" className="hover:text-white transition">Our Menu</Link>
              <Link to="/cart" className="hover:text-white transition">My Cart</Link>
            </div>
          </div>

          {/* Menu Highlights */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#38BDF8] mb-4">
              Categories
            </h3>
            <div className="flex flex-col gap-2.5 text-xs text-[#94A3B8]">
              <Link to="/menu" className="hover:text-white transition">Espresso & Latte</Link>
              <Link to="/menu" className="hover:text-white transition">Cold Brews</Link>
              <Link to="/menu" className="hover:text-white transition">Fresh Snacks</Link>
              <Link to="/menu" className="hover:text-white transition">Sweet Desserts</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Gap Protection */}
      <div className="border-t border-slate-800/80 bg-[#0B1120]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#94A3B8]">
          <p>© {new Date().getFullYear()} Coffee House. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Handcrafted with <span className="text-red-500">♥</span> & Coffee ☕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
