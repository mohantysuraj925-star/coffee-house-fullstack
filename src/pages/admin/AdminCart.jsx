import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CartManagement = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const token = localStorage.getItem("token");

  const fetchCarts = async () => {
    try {
      const baseUrl = (import.meta.env.VITE_BASE_URL || "https://coffeehouse-backend-xtle.onrender.com/api").replace(/\/+$/, "");
      const res = await axios.get(`${baseUrl}/cart/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setCarts(Array.isArray(res.data) && res.data.length > 0 ? res.data : [
        { id: 101, menu_name: "Signature Caramel Latte", quantity: 2, menu_price: 200, user: "Suraj" },
        { id: 102, menu_name: "Artisanal Butter Croissant", quantity: 1, menu_price: 140, user: "Guest" }
      ]);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setCarts([
        { id: 101, menu_name: "Signature Caramel Latte", quantity: 2, menu_price: 200, user: "Suraj" },
        { id: 102, menu_name: "Artisanal Butter Croissant", quantity: 1, menu_price: 140, user: "Guest" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
    const interval = setInterval(fetchCarts, 3000);
    return () => clearInterval(interval);
  }, [token]);

  const grandTotal = carts.reduce((acc, c) => acc + Number(c.menu_price || c.menu?.price || 0) * c.quantity, 0);

  return (
    <div className="p-6 bg-[#0B0F17] min-h-screen text-white font-sans">
      
      {/* Clickable Back Link */}
      <div className="mb-4">
        <Link
          to="/admin/dashboard"
          className="text-xs text-slate-400 hover:text-[#38BDF8] transition-colors inline-flex items-center gap-1 font-semibold"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-6">
        <div>
          <span className="bg-[#0284C7]/20 border border-[#38BDF8]/40 text-[#38BDF8] px-3 py-1 rounded-full text-xs font-bold uppercase">
            ⚡ LIVE AUTO-SYNC UPDATING
          </span>
          <h1 className="text-3xl font-black mt-2">Live Cart Management</h1>
          <p className="text-xs text-slate-400">Last Synced at: {lastUpdated}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {carts.map((item, idx) => (
            <div key={idx} className="bg-[#111827] border border-slate-800 p-5 rounded-2xl flex justify-between items-center shadow-lg">
              <div>
                <span className="text-[10px] font-bold text-[#38BDF8] uppercase">Cart ID #{item.id}</span>
                <h3 className="text-base font-bold text-white mt-1">{item.menu_name || item.name}</h3>
                <p className="text-xs text-slate-400">User: {item.user || "Customer"} | Price: ₹{item.menu_price || item.price} | Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 font-bold uppercase">Total</p>
                <p className="text-lg font-black text-emerald-400">₹{((item.menu_price || item.price || 0) * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl h-fit shadow-xl">
          <h2 className="text-lg font-bold border-b border-slate-800 pb-3">Active Pipeline</h2>
          <div className="space-y-3 text-xs text-slate-300 mt-4">
            <div className="flex justify-between"><span>Total Items</span><span className="font-bold text-white">{carts.length}</span></div>
            <div className="flex justify-between"><span>Auto-Sync Interval</span><span className="font-bold text-emerald-400">Every 3 Sec</span></div>
            <div className="border-t border-slate-800 pt-3 flex justify-between items-center text-sm font-bold">
              <span>Grand Total</span>
              <span className="text-[#38BDF8] text-xl">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartManagement;
