import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const getSavedCart = () => {
    try {
      return JSON.parse(localStorage.getItem("app_cart_items") || "{}");
    } catch {
      return {};
    }
  };

  const saveCartState = (updatedMap) => {
    localStorage.setItem("app_cart_items", JSON.stringify(updatedMap));
  };

  useEffect(() => {
    if (!token) { navigate("/login"); return; }

    axios.get(`${import.meta.env.VITE_BASE_URL}/menu/`, { timeout: 4000 })
      .then((res) => {
        const menus = res.data || [];
        const savedMap = getSavedCart();
        const list = [];

        menus.forEach((m) => {
          const q = savedMap[m.id];
          if (q && q > 0) {
            list.push({ ...m, quantity: q });
          }
        });

        setCartItems(list);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const updateQty = (e, menuId, change) => {
    e.preventDefault();
    const savedMap = getSavedCart();
    const current = savedMap[menuId] || 1;
    const newQty = current + change;

    if (newQty <= 0) {
      delete savedMap[menuId];
      setCartItems((prev) => prev.filter((item) => item.id !== menuId));
    } else {
      savedMap[menuId] = newQty;
      setCartItems((prev) => prev.map((item) => item.id === menuId ? { ...item, quantity: newQty } : item));
    }

    saveCartState(savedMap);
  };

  const removeItem = (e, menuId) => {
    e.preventDefault();
    const savedMap = getSavedCart();
    delete savedMap[menuId];
    setCartItems((prev) => prev.filter((item) => item.id !== menuId));
    saveCartState(savedMap);
  };

  const formatImageUrl = (url) => {
    if (!url) return "https://images.unsplash.com/photo-1572442388796-11668ba67e53";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${import.meta.env.VITE_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const grandTotal = cartItems.reduce((sum, item) => sum + Number(item.price || 0) * item.quantity, 0);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col justify-between overflow-x-hidden">
      <div className="py-8 md:py-12 flex-1">
        <div className="max-w-6xl mx-auto px-6 md:px-10">

          {/* Header */}
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div>
              <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-widest">
                Review & Checkout
              </span>
              <h1 className="text-2xl md:text-4xl font-black mt-1 text-white">Your Order Cart</h1>
              <p className="text-slate-400 text-xs md:text-sm mt-1 font-light">
                Confirm your handcrafted coffee items before proceeding to payment.
              </p>
            </div>

            {cartItems.length > 0 && (
              <Link
                to="/menu"
                className="text-[#38BDF8] hover:text-[#60A5FA] text-xs font-bold flex items-center gap-1.5 transition"
              >
                ← Add More Items
              </Link>
            )}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-slate-800 border-t-[#38BDF8] rounded-full animate-spin mx-auto" />
              <p className="text-slate-400 text-xs mt-3 font-medium">Fetching your order...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="bg-[#111827]/70 border border-slate-800/80 rounded-3xl p-10 text-center max-w-lg mx-auto shadow-2xl backdrop-blur-xl">
              <div className="w-16 h-16 bg-[#0B0F17] border border-slate-800 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-inner">
                🛒
              </div>
              <h2 className="text-xl font-bold text-white">Your cart is empty</h2>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed font-light">
                Discover our signature coffees and fresh treats to start an order.
              </p>
              <Link
                to="/menu"
                className="inline-block mt-6 bg-gradient-to-r from-[#0284C7] to-[#2563EB] hover:from-[#0369A1] hover:to-[#1D4ED8] text-white px-7 py-3 rounded-2xl font-bold text-xs transition-all shadow-xl shadow-[#0284C7]/20 active:scale-95"
              >
                Explore Menu
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 items-start">

              {/* Cart List */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#111827]/80 border border-slate-800/80 hover:border-[#0284C7]/60 rounded-3xl p-4 flex gap-4 md:gap-5 items-center transition-all shadow-xl backdrop-blur-md"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-[#0B0F17] rounded-2xl overflow-hidden shrink-0 border border-slate-800">
                      <img
                        src={formatImageUrl(item.image)}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      {item.category && (
                        <span className="text-[9px] font-bold text-[#38BDF8] uppercase tracking-widest">
                          {item.category}
                        </span>
                      )}
                      <h3 className="text-base font-bold text-white truncate mt-0.5">
                        {item.name}
                      </h3>

                      <p className="text-[#38BDF8] font-black text-base mt-1">
                        ₹{item.price}{" "}
                        <span className="text-slate-400 font-normal text-xs ml-2">
                          (Total: ₹{(Number(item.price) * item.quantity).toFixed(2)})
                        </span>
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-[#0B0F17] border border-slate-800 rounded-2xl overflow-hidden shadow-inner">
                          <button
                            type="button"
                            onClick={(e) => updateQty(e, item.id, -1)}
                            className="w-8 h-8 text-[#38BDF8] hover:bg-[#0284C7] hover:text-white transition font-black select-none text-base cursor-pointer"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-bold text-xs select-none text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => updateQty(e, item.id, 1)}
                            className="w-8 h-8 text-[#38BDF8] hover:bg-[#0284C7] hover:text-white transition font-black select-none text-base cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => removeItem(e, item.id)}
                          className="text-red-400 hover:text-red-300 text-xs font-bold cursor-pointer transition hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-[#111827]/90 border border-slate-800/80 rounded-3xl p-6 sticky top-6 shadow-2xl backdrop-blur-xl">
                <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                  Order Summary
                </h2>

                <div className="space-y-3 text-slate-300 text-xs mt-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-light">Total Selected Quantity</span>
                    <span className="font-bold text-white">{totalCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-light">Unique Products</span>
                    <span className="font-bold text-white">{cartItems.length}</span>
                  </div>
                </div>

                <div className="border-t border-slate-800 my-4" />

                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-white">Grand Total</span>
                  <span className="text-xl font-black text-[#38BDF8]">
                    ₹{grandTotal.toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/checkout")}
                  className="w-full mt-5 bg-gradient-to-r from-[#0284C7] to-[#2563EB] hover:from-[#0369A1] hover:to-[#1D4ED8] text-white py-3 rounded-2xl font-bold text-xs transition-all shadow-xl shadow-[#0284C7]/25 cursor-pointer active:scale-98"
                >
                  Proceed to Checkout →
                </button>

                <Link
                  to="/menu"
                  className="block text-center text-[#38BDF8] hover:underline font-bold text-xs mt-3"
                >
                  Continue Shopping
                </Link>
              </div>

            </div>
          )}

          {/* Space Fill Feature: Guarantee Badges */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800/80 pt-8">
            <div className="bg-[#111827] border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
              <span className="text-xl">☕</span>
              <div>
                <p className="text-xs font-bold text-white">Freshly Brewed</p>
                <p className="text-[10px] text-slate-400">Made on order</p>
              </div>
            </div>
            <div className="bg-[#111827] border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
              <span className="text-xl">⚡</span>
              <div>
                <p className="text-xs font-bold text-white">Quick Prep</p>
                <p className="text-[10px] text-slate-400">Ready in 15 mins</p>
              </div>
            </div>
            <div className="bg-[#111827] border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
              <span className="text-xl">🛡️</span>
              <div>
                <p className="text-xs font-bold text-white">Secure Checkout</p>
                <p className="text-[10px] text-slate-400">Encrypted payment</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
