import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleMailto = (e) => {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent("Coffee House Newsletter / Message");
    const body = encodeURIComponent(`Hello Suraj,\n\nI want to connect or subscribe using this email: ${email}`);
    window.location.href = `mailto:mohantysuraj925@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="bg-[#120B07] text-amber-100/80 border-t border-amber-600/30 mt-auto w-full">
      {/* Top Feature Ribbon */}
      <div className="bg-amber-950/60 border-b border-amber-600/20 py-3.5 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-[11px] font-bold text-amber-300">
          <div>⚡ Express Delivery</div>
          <div>🌱 100% Organic Beans</div>
          <div>🛡️ Safe & Hygienic</div>
          <div>☕ Freshly Brewed</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & New Modern Icon Badge */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              {/* Modern Vector Steam Coffee Cup Logo */}
              <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-600/30 border border-amber-400/40 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-amber-950" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 19h18v2H2v-2zm2-7V5h14v7c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4zm16-5h2v3c0 1.1-.9 2-2 2v-5zM6 3h2v1H6V3zm4 0h2v1h-2V3zm4 0h2v1h-2V3z"/>
                </svg>
              </div>

              <div>
                <h2 className="text-xl font-black text-amber-50 tracking-wide group-hover:text-amber-400 transition">
                  Coffee House
                </h2>
                <p className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  Better Taste, Better Life
                </p>
              </div>
            </Link>

            <p className="text-xs text-amber-200/60 max-w-sm leading-relaxed font-light">
              Handcrafted coffees, artisanal teas, and freshly baked pastries made daily with premium ingredients.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Navigation</h3>
            <div className="flex flex-col gap-2 text-xs text-amber-200/70 font-medium">
              <Link to="/" className="hover:text-amber-300 transition">Home</Link>
              <Link to="/about" className="hover:text-amber-300 transition">About Us</Link>
              <Link to="/menu" className="hover:text-amber-300 transition">Menu</Link>
              <Link to="/cart" className="hover:text-amber-300 transition">Cart</Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Categories</h3>
            <div className="flex flex-col gap-2 text-xs text-amber-200/70 font-medium">
              <Link to="/menu" className="hover:text-amber-300 transition">Espresso & Coffee</Link>
              <Link to="/menu" className="hover:text-amber-300 transition">Tea Blends</Link>
              <Link to="/menu" className="hover:text-amber-300 transition">Pastries & Pizza</Link>
              <Link to="/menu" className="hover:text-amber-300 transition">Ice Creams & Desserts</Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Support</h3>
            <div className="space-y-2 text-xs text-amber-200/70 font-medium">
              <p>Hours: 8 AM - 10 PM</p>
              <p>Email: mohantysuraj925@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Direct Connect Form */}
        <div className="mt-8 pt-6 border-t border-amber-600/20 grid md:grid-cols-2 items-center gap-4">
          <div>
            <h4 className="text-xs font-bold text-amber-50">Direct Email Connect ☕</h4>
            <p className="text-[11px] text-amber-200/60">Enter your email to send a direct message to Suraj.</p>
          </div>
          <form onSubmit={handleMailto} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="bg-amber-950/80 border border-amber-600/30 px-3 py-2 rounded-xl text-xs text-amber-50 placeholder-amber-200/40 outline-none focus:border-amber-400 w-full"
            />
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-xl shrink-0 cursor-pointer transition shadow-md shadow-amber-600/30"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-amber-600/20 bg-[#0A0604] py-4 px-6 text-center text-xs text-amber-200/40 font-medium">
        © {new Date().getFullYear()} Coffee House App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
