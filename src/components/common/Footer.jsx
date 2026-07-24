import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

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
    <footer className="bg-[#0B1120] text-slate-300 border-t border-slate-800/80 mt-auto w-full">
      <div className="bg-[#0F172A] border-b border-slate-800 py-4 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
          <div>⚡ Express Delivery</div>
          <div>🌱 100% Organic Beans</div>
          <div>🛡️ Safe & Hygienic</div>
          <div>☕ Freshly Brewed</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={logo} alt="Coffee House" className="w-12 h-12 object-contain" />
              <div>
                <h2 className="text-xl font-bold text-white">Coffee House</h2>
                <p className="text-[#38BDF8] text-xs">Better Taste, Better Life</p>
              </div>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm">
              Handcrafted coffees, artisanal teas, and freshly baked pastries made daily with premium ingredients.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#38BDF8] mb-3">Navigation</h3>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <Link to="/" className="hover:text-white">Home</Link>
              <Link to="/about" className="hover:text-white">About Us</Link>
              <Link to="/menu" className="hover:text-white">Menu</Link>
              <Link to="/cart" className="hover:text-white">Cart</Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#38BDF8] mb-3">Categories</h3>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <Link to="/menu" className="hover:text-white">Espresso & Coffee</Link>
              <Link to="/menu" className="hover:text-white">Tea Blends</Link>
              <Link to="/menu" className="hover:text-white">Pastries</Link>
              <Link to="/menu" className="hover:text-white">Desserts</Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#38BDF8] mb-3">Support</h3>
            <div className="space-y-2 text-xs text-slate-400">
              <p>Hours: 8 AM - 10 PM</p>
              <p>Email: mohantysuraj925@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 grid md:grid-cols-2 items-center gap-4">
          <div>
            <h4 className="text-xs font-bold text-white">Direct Email Connect ☕</h4>
            <p className="text-[11px] text-slate-400">Enter your email to send a direct message to Suraj.</p>
          </div>
          <form onSubmit={handleMailto} className="flex gap-2">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              required
              className="bg-[#0F172A] border border-slate-700 px-3 py-2 rounded-xl text-xs text-white outline-none w-full" 
            />
            <button type="submit" className="bg-[#0284C7] text-white text-xs font-bold px-4 py-2 rounded-xl shrink-0 cursor-pointer">
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-[#070C18] py-4 px-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Coffee House App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
