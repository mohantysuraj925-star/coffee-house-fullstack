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
      const baseUrl = (import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000/api").replace(/\/+$/, "");
      const res = await axios.get(`${baseUrl}/cart/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setCarts(Array.isArray(res.data) ? res.data : []);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
    const interval = setInterval(() => {
      fetchCarts();
    }, 4000);
    return () => clearInterval(interval);
  }, [token]);

  const grandTotal = carts.reduce((acc, c) => acc + (Number(c.menu_price || c.menu?.price || 0) * c.quantity), 0);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Simple Link - Back to Dashboard */}
        <div>
          <Link
            to="/admin"
            className="text-xs font-semibold text-[#38BDF8] hover:underline inline-flex items-center gap-1"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Top Header Section */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div>
            <span className="text-[10px] font-bold text-[#38BDF8] bg-[#0284C7]/20 border border-[#38BDF8]/30 px-3 py-1 rounded-full uppercase tracking-wider">
              Admin Real-Time Control
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-white mt-2">
              Live Cart Management
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Active customer cart sync and monitoring
            </p>
          </div>

          <div className="bg-[#0B0F17] border border-slate-800 px-4 py-2 rounded-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs text-slate-300 font-mono">Sync: {lastUpdated}</span>
          </div>
        </div>

        {/* Main Content Area */}
        {loading ? (
          <div className="py-20 text-center text-slate-400 text-sm">
            Loading active carts...
          </div>
        ) : carts.length === 0 ? (
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-12 text-center text-slate-400 shadow-lg">
            <p className="text-base font-bold text-white">No Active Carts</p>
            <p className="text-xs text-slate-500 mt-1">There are no items currently in user carts.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            
            {/* Left Column: Cart Cards */}
            <div className="lg:col-span-2 space-y-4">
              {carts.map((item, index) => {
                const itemPrice = Number(item.menu_price || item.menu?.price || 0);
                const totalItemPrice = itemPrice * item.quantity;

                return (
                  <div
                    key={item.id || index}
                    className="bg-[#111827] border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-wrap sm:flex-nowrap justify-between items-center gap-4 hover:border-slate-700 transition"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-[#38BDF8] bg-[#0284C7]/10 px-2 py-0.5 rounded-md uppercase">
                        Item ID #{item.id || index + 1}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1">
                        {item.menu_name || item.menu?.name || "Coffee Item"}
                      </h3>
                      <p className="text-xs text-slate-400">
                        Price: ₹{itemPrice} | Quantity: <span className="text-white font-bold">{item.quantity}</span>
                      </p>
                    </div>

                    <div className="text-right ml-auto sm:ml-0">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total</p>
                      <p className="text-lg font-extrabold text-emerald-400">₹{totalItemPrice.toFixed(2)}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Overview Card */}
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 sticky top-6">
              <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                Cart Summary
              </h2>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Cart Items</span>
                  <span className="font-bold text-white">{carts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Quantity Units</span>
                  <span className="font-bold text-white">
                    {carts.reduce((acc, c) => acc + Number(c.quantity), 0)}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-3 flex justify-between items-center">
                <span className="text-xs font-bold text-white">Grand Total</span>
                <span className="text-xl font-black text-[#38BDF8]">
                  ₹{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default CartManagement;
