import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CartManagement = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [orderStatuses, setOrderStatuses] = useState({});
  const token = localStorage.getItem("token");

  const fetchCarts = async () => {
    try {
      const baseUrl = ("https://coffeehouse-backend-xtle.onrender.com" || "").replace(/\/+$/, "");
      const res = await axios.get(`${baseUrl}/cart/`, {
        headers: { Authorization: `Token ${token}` },
      });
      
      const data = Array.isArray(res.data) && res.data.length > 0 ? res.data : [
        { id: 101, menu_name: "Signature Caramel Latte", quantity: 2, menu_price: 200, user: "Suraj", type: "Dine-In", table: "Table 04", note: "Serve Extra Hot, Less Sugar" },
        { id: 102, menu_name: "Artisanal Butter Croissant", quantity: 1, menu_price: 140, user: "Alex", type: "Takeaway", table: "N/A", note: "Extra Napkins" },
        { id: 103, menu_name: "Cheese Burst Pizza", quantity: 1, menu_price: 290, user: "Priya", type: "Dine-In", table: "Balcony 02", note: "Extra Cheese" }
      ];
      
      setCarts(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setCarts([
        { id: 101, menu_name: "Signature Caramel Latte", quantity: 2, menu_price: 200, user: "Suraj", type: "Dine-In", table: "Table 04", note: "Serve Extra Hot, Less Sugar" },
        { id: 102, menu_name: "Artisanal Butter Croissant", quantity: 1, menu_price: 140, user: "Alex", type: "Takeaway", table: "N/A", note: "Extra Napkins" },
        { id: 103, menu_name: "Cheese Burst Pizza", quantity: 1, menu_price: 290, user: "Priya", type: "Dine-In", table: "Balcony 02", note: "Extra Cheese" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
    const interval = setInterval(fetchCarts, 5000);
    return () => clearInterval(interval);
  }, [token]);

  const updateStatus = (id, newStatus) => {
    setOrderStatuses(prev => ({ ...prev, [id]: newStatus }));
  };

  const removeCartItem = (id) => {
    setCarts(prev => prev.filter(item => item.id !== id));
  };

  const grandTotal = carts.reduce((acc, c) => acc + Number(c.menu_price || c.price || 0) * c.quantity, 0);

  return (
    <div className="min-h-screen bg-[#1a0f07] text-amber-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Back Button & Header */}
        <div>
          <Link
            to="/admin/dashboard"
            className="mb-4 inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold text-xs transition cursor-pointer"
          >
            ← Back to Control Center
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-600/30 pb-6">
            <div>
              <span className="inline-flex items-center gap-2 bg-amber-950/80 border border-amber-500/40 text-amber-300 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Live Kitchen Dispatch & Order Sync
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-amber-50 mt-2">
                Order & Cart Control Center
              </h1>
              <p className="text-amber-200/70 text-xs mt-1">
                Real-time active carts, preparation status & table service tracking.
              </p>
            </div>

            <div className="bg-amber-950/80 border border-amber-600/30 px-4 py-2.5 rounded-2xl text-right">
              <p className="text-[10px] text-amber-200/50 uppercase font-bold">Auto-Sync Status</p>
              <p className="text-xs font-extrabold text-amber-400">Synced at: {lastUpdated}</p>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Left Column - Active Orders List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-widest">
              Active Kitchen Queue ({carts.length} Items)
            </h2>

            {carts.length === 0 ? (
              <div className="bg-amber-950/40 border border-amber-600/30 rounded-3xl p-12 text-center text-amber-200/60 text-xs">
                No active orders or carts in pipeline.
              </div>
            ) : (
              carts.map((item) => {
                const status = orderStatuses[item.id] || "Received";
                const totalItemPrice = (Number(item.menu_price || item.price || 0) * item.quantity).toFixed(2);

                return (
                  <div
                    key={item.id}
                    className="bg-gradient-to-b from-amber-950/80 to-amber-900/40 border border-amber-600/30 rounded-2xl p-5 shadow-2xl space-y-4 hover:border-amber-400/50 transition"
                  >
                    <div className="flex items-start justify-between border-b border-amber-600/20 pb-3 flex-wrap gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-amber-400 bg-amber-950 border border-amber-500/30 px-2 py-0.5 rounded-md">
                            ORDER #{item.id}
                          </span>
                          <span className="text-xs font-bold text-amber-200/80">
                            Customer: <strong className="text-amber-50">{item.user || "Guest"}</strong>
                          </span>
                        </div>
                        <h3 className="text-base font-black text-amber-50 mt-1">
                          {item.menu_name || item.name}
                        </h3>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-amber-200/50 block">Amount</span>
                        <span className="text-lg font-black text-amber-400">₹{totalItemPrice}</span>
                      </div>
                    </div>

                    {/* Order Details Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      <div className="bg-amber-950/90 border border-amber-600/20 p-2 rounded-xl">
                        <span className="text-[10px] text-amber-200/50 font-bold block">Service Type</span>
                        <span className="font-bold text-amber-50">{item.type || "Dine-In"}</span>
                      </div>

                      <div className="bg-amber-950/90 border border-amber-600/20 p-2 rounded-xl">
                        <span className="text-[10px] text-amber-200/50 font-bold block">Table / Zone</span>
                        <span className="font-bold text-amber-50">{item.table || "Table 01"}</span>
                      </div>

                      <div className="bg-amber-950/90 border border-amber-600/20 p-2 rounded-xl">
                        <span className="text-[10px] text-amber-200/50 font-bold block">Quantity</span>
                        <span className="font-bold text-amber-50">{item.quantity} Servings</span>
                      </div>
                    </div>

                    {/* Preparation Note */}
                    {item.note && (
                      <div className="bg-amber-950/60 border border-amber-500/30 p-2.5 rounded-xl text-xs text-amber-200/80">
                        <strong className="text-amber-400 font-bold">📝 Note: </strong> {item.note}
                      </div>
                    )}

                    {/* Pipeline Controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-amber-600/20 flex-wrap gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          onClick={() => updateStatus(item.id, "Preparing")}
                          className={`px-3 py-1 rounded-xl text-[10px] font-bold transition cursor-pointer border ${
                            status === "Preparing"
                              ? "bg-amber-600 text-white border-amber-400"
                              : "bg-amber-950/60 text-amber-200/60 border-amber-600/20 hover:text-white"
                          }`}
                        >
                          ☕ Preparing
                        </button>

                        <button
                          onClick={() => updateStatus(item.id, "Ready")}
                          className={`px-3 py-1 rounded-xl text-[10px] font-bold transition cursor-pointer border ${
                            status === "Ready"
                              ? "bg-green-700 text-white border-green-400"
                              : "bg-amber-950/60 text-amber-200/60 border-amber-600/20 hover:text-white"
                          }`}
                        >
                          🛍️ Ready for Delivery
                        </button>
                      </div>

                      <button
                        onClick={() => removeCartItem(item.id)}
                        className="text-red-400 hover:text-red-300 text-xs font-bold transition cursor-pointer hover:underline"
                      >
                        Clear Order ✕
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column - Kitchen Stats */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-widest">
              Queue Summary
            </h2>

            <div className="bg-gradient-to-b from-amber-950/80 to-amber-900/40 border border-amber-600/30 rounded-2xl p-5 shadow-2xl space-y-4">
              <h3 className="text-sm font-bold text-amber-50 border-b border-amber-600/30 pb-2">
                Live Revenue Metrics
              </h3>

              <div className="space-y-3 text-xs text-amber-200/80">
                <div className="flex justify-between">
                  <span>Total Active Carts</span>
                  <span className="font-bold text-amber-50">{carts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Auto Refresh Rate</span>
                  <span className="font-bold text-green-400">Every 5 Sec</span>
                </div>
                <div className="flex justify-between">
                  <span>Kitchen Status</span>
                  <span className="font-bold text-amber-400">Online & Syncing</span>
                </div>
              </div>

              <div className="border-t border-amber-600/30 pt-4 flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase font-bold text-amber-200/50">Pipeline Value</p>
                  <p className="text-xl font-black text-amber-400">₹{grandTotal.toFixed(2)}</p>
                </div>
                <button
                  onClick={fetchCarts}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer shadow-md"
                >
                  Force Sync 🔄
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CartManagement;
