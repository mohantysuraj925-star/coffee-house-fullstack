import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [cartQuantities, setCartQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("app_cart_items");
    if (saved) {
      try { setCartQuantities(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const saveCart = (newCart) => {
    setCartQuantities(newCart);
    localStorage.setItem("app_cart_items", JSON.stringify(newCart));
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/menu/`, { timeout: 4000 })
      .then(res => setMenus(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (e, menuId) => {
    e.preventDefault();
    if (!token) { navigate("/login"); return; }
    saveCart({ ...cartQuantities, [menuId]: 1 });
  };

  const handleIncrease = (e, menuId) => {
    e.preventDefault();
    const current = cartQuantities[menuId] || 1;
    saveCart({ ...cartQuantities, [menuId]: current + 1 });
  };

  const handleDecrease = (e, menuId) => {
    e.preventDefault();
    const current = cartQuantities[menuId] || 1;
    const updated = { ...cartQuantities };
    if (current - 1 <= 0) {
      delete updated[menuId];
    } else {
      updated[menuId] = current - 1;
    }
    saveCart(updated);
  };

  const formatImageUrl = (url) => {
    if (!url) return "https://images.unsplash.com/photo-1572442388796-11668ba67e53";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${import.meta.env.VITE_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const totalCartItems = Object.values(cartQuantities).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col justify-between overflow-x-hidden">
      <div className="flex-1">
        <section className="relative overflow-hidden py-10 md:py-16 border-b border-slate-800/80 bg-gradient-to-br from-[#0F172A] via-[#0B0F17] to-[#0284C7]/10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0284C7]/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-20 right-10 w-[500px] h-[500px] bg-[#38BDF8]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center">
            <span className="inline-flex items-center gap-2 bg-[#0284C7]/15 border border-[#38BDF8]/30 text-[#38BDF8] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#0284C7]/10 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
              Crafted To Perfection
            </span>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
              Savor The Exceptional <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#0284C7] bg-clip-text text-transparent">
                Coffee Experience
              </span>
            </h1>

            <p className="text-slate-400 mt-3 max-w-2xl mx-auto text-xs md:text-sm leading-relaxed font-light">
              Indulge in artisanal single-origin brews, velvet espresso blends, and freshly baked delights prepared by master baristas.
            </p>
          </div>
        </section>

        <section className="py-8 md:py-12 px-6 md:px-10 bg-[#0B0F17]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
              <div>
                <p className="text-[#38BDF8] text-xs font-bold uppercase tracking-widest">Barista Speciality</p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">Our Premium Menu</h2>
              </div>

              {totalCartItems > 0 && (
                <button
                  onClick={() => navigate("/cart")}
                  className="flex items-center gap-2.5 bg-gradient-to-r from-[#0284C7] to-[#2563EB] hover:from-[#0369A1] hover:to-[#1D4ED8] text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition shadow-xl shadow-[#0284C7]/25 active:scale-95 cursor-pointer"
                >
                  <span>🛒 View Cart</span>
                  <span className="bg-white text-[#0284C7] px-2.5 py-0.5 rounded-full text-[11px] font-extrabold">
                    {totalCartItems}
                  </span>
                </button>
              )}
            </div>

            {loading ? (
              <div className="py-20 text-center">
                <div className="w-10 h-10 border-4 border-slate-800 border-t-[#38BDF8] rounded-full animate-spin mx-auto" />
                <p className="text-slate-400 text-xs mt-3 font-medium tracking-wide">Brewing your menu items...</p>
              </div>
            ) : menus.length === 0 ? (
              <div className="py-16 text-center bg-[#111827]/60 border border-slate-800/80 rounded-3xl p-8 backdrop-blur-md">
                <span className="text-4xl">☕</span>
                <p className="text-slate-400 text-xs mt-3">No menu items available right now.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {menus.map((menu) => {
                  const qty = cartQuantities[menu.id] || 0;

                  return (
                    <div
                      key={menu.id}
                      className="group bg-[#111827]/80 border border-slate-800/80 hover:border-[#38BDF8]/60 rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0284C7]/15 transition-all duration-300 flex flex-col justify-between backdrop-blur-md"
                    >
                      <div>
                        <div className="relative h-48 overflow-hidden bg-[#1E293B]">
                          <img
                            src={formatImageUrl(menu.image)}
                            alt={menu.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-60" />
                          {menu.category && (
                            <span className="absolute top-3 left-3 bg-[#0B0F17]/80 backdrop-blur-xl text-[#38BDF8] border border-slate-700/80 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md">
                              {menu.category}
                            </span>
                          )}
                        </div>

                        <div className="p-5">
                          <h3 className="text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                            {menu.name}
                          </h3>
                          <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed font-light min-h-[2rem]">
                            {menu.description || "Freshly prepared with handpicked beans and premium ingredients."}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0">
                        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                          <div>
                            <p className="text-[9px] uppercase font-bold text-slate-500 tracking-widest">Price</p>
                            <p className="text-xl font-black text-[#38BDF8]">₹{menu.price}</p>
                          </div>

                          <div>
                            {qty > 0 ? (
                              <div className="flex items-center bg-[#0B0F17] border border-[#0284C7] rounded-2xl overflow-hidden shadow-lg shadow-[#0284C7]/20">
                                <button
                                  type="button"
                                  onClick={(e) => handleDecrease(e, menu.id)}
                                  className="px-3 py-1.5 text-[#38BDF8] hover:bg-[#0284C7] hover:text-white transition font-black text-sm cursor-pointer select-none"
                                >
                                  −
                                </button>
                                <span className="px-3 text-white font-bold text-xs select-none">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => handleIncrease(e, menu.id)}
                                  className="px-3 py-1.5 text-[#38BDF8] hover:bg-[#0284C7] hover:text-white transition font-black text-sm cursor-pointer select-none"
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => handleAddToCart(e, menu.id)}
                                className="px-4 py-2 rounded-2xl text-xs font-bold bg-gradient-to-r from-[#0284C7] to-[#2563EB] hover:from-[#0369A1] hover:to-[#1D4ED8] text-white transition-all shadow-lg shadow-[#0284C7]/20 hover:shadow-[#0284C7]/40 cursor-pointer active:scale-95"
                              >
                                Add to Cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Space Fill Feature: Special Banner */}
        <section className="pb-12 px-6 md:px-10 bg-[#0B0F17]">
          <div className="max-w-7xl mx-auto bg-[#111827] border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="bg-[#0284C7]/20 text-[#38BDF8] border border-[#38BDF8]/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase">Special Deal</span>
              <h3 className="text-xl font-bold text-white mt-2">Craving More Delights?</h3>
              <p className="text-xs text-slate-400 mt-1">Order online and enjoy instant rewards on every handcrafted brew.</p>
            </div>
            {totalCartItems > 0 && (
              <button onClick={() => navigate("/cart")} className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition">
                Proceed to Checkout ➔
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Menu;
