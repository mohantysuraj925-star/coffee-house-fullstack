import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const INITIAL_MENUS = [
  { id: "m1", name: "Cappuccino", category: "Coffee", price: "122.50", description: "Rich espresso blended with velvety steamed milk and topped with a thick layer of silky foam.", image: "https://images.unsplash.com/photo-1534778101976-62847782c213", is_available: true },
  { id: "m2", name: "French Fries", category: "Snack", price: "50.00", description: "Crispy golden french fries served hot and fresh, lightly seasoned to perfection. (₹50 per plate)", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877", is_available: true },
  { id: "m3", name: "Artisanal Espresso", category: "Coffee", price: "180.00", description: "Rich, bold double shot espresso crafted from roasted Arabica beans.", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04", is_available: true },
  { id: "m4", name: "Nitro Cold Brew", category: "Coffee", price: "260.00", description: "Slow-steeped cold brew infused with nitrogen for a silky pour.", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c", is_available: true },
  { id: "m5", name: "Butter Croissant", category: "Snack", price: "150.00", description: "Flaky, golden French croissant baked fresh every morning.", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a", is_available: true },
  { id: "m6", name: "Dark Chocolate Muffin", category: "Dessert", price: "190.00", description: "Decadent dark chocolate muffin loaded with belgian chocolate chips.", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa", is_available: true }
];

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [cartQuantities, setCartQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const mergeMenus = (apiItems) => {
    const apiIds = new Set(apiItems.map(i => String(i.id)));
    const remainingDefaults = INITIAL_MENUS.filter(m => !apiIds.has(String(m.id)) && !apiItems.some(a => a.name === m.name));
    return [...apiItems, ...remainingDefaults];
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("app_cart_items");
    if (savedCart) {
      try { setCartQuantities(JSON.parse(savedCart)); } catch (e) {}
    }

    const savedMenus = localStorage.getItem("app_permanent_menus");
    if (savedMenus) {
      try { setMenus(JSON.parse(savedMenus)); } catch (e) { setMenus(INITIAL_MENUS); }
    } else {
      setMenus(INITIAL_MENUS);
      localStorage.setItem("app_permanent_menus", JSON.stringify(INITIAL_MENUS));
    }
  }, []);

  const saveCart = (newCart) => {
    setCartQuantities(newCart);
    localStorage.setItem("app_cart_items", JSON.stringify(newCart));
  };

  useEffect(() => {
    const baseUrl = "https://coffeehouse-backend-xtle.onrender.com" || "";
    const cleanUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

    axios.get(`${cleanUrl}/menu`, { timeout: 3000 })
      .then(res => {
        const items = Array.isArray(res.data) ? res.data : (res.data?.data || res.data?.menus || []);
        if (items.length > 0) {
          const merged = mergeMenus(items);
          setMenus(merged);
          localStorage.setItem("app_permanent_menus", JSON.stringify(merged));
        }
      })
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
    const baseUrl = "https://coffeehouse-backend-xtle.onrender.com" || "";
    const cleanUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    return `${cleanUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const categories = ["All", ...new Set(menus.map((m) => m.category).filter(Boolean))];

  const filteredMenus = menus.filter((m) => {
    const matchesCategory = selectedCategory === "All" || m.category === selectedCategory;
    const matchesSearch = m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalCartItems = Object.values(cartQuantities).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-[#0B0F17] text-slate-100 overflow-x-hidden min-h-screen">
      <section className="relative overflow-hidden py-8 md:py-12 border-b border-slate-800/80 bg-gradient-to-br from-[#0F172A] via-[#0B0F17] to-[#0284C7]/10">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center">
          <span className="inline-flex items-center gap-2 bg-[#0284C7]/15 border border-[#38BDF8]/30 text-[#38BDF8] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg mb-3">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
            Crafted To Perfection
          </span>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Savor The Exceptional <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#0284C7] bg-clip-text text-transparent">
              Coffee Experience
            </span>
          </h1>

          <p className="text-slate-400 mt-2 max-w-2xl mx-auto text-xs md:text-sm font-light">
            Indulge in artisanal single-origin brews, velvet espresso blends, and freshly baked delights.
          </p>

          <div className="mt-6 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search coffee, tea, pastries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111827] border border-slate-700 focus:border-[#38BDF8] text-white px-5 py-3 rounded-2xl text-xs outline-none transition shadow-inner placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="py-8 px-6 md:px-10 bg-[#0B0F17]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-3 border-b border-slate-800/80 gap-4">
            <div>
              <p className="text-[#38BDF8] text-xs font-bold uppercase tracking-widest">Barista Speciality</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-0.5">Our Premium Menu</h2>
            </div>

            {totalCartItems > 0 && (
              <button
                onClick={() => navigate("/cart")}
                className="flex items-center gap-2 bg-gradient-to-r from-[#0284C7] to-[#2563EB] text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-lg active:scale-95 cursor-pointer self-start md:self-auto"
              >
                <span>🛒 View Cart</span>
                <span className="bg-white text-[#0284C7] px-2 py-0.5 rounded-full text-[10px] font-extrabold">
                  {totalCartItems}
                </span>
              </button>
            )}
          </div>

          {categories.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#0284C7] text-white shadow-lg"
                      : "bg-[#111827] text-slate-400 border border-slate-800 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMenus.map((menu) => {
              const qty = cartQuantities[menu.id] || 0;

              return (
                <div
                  key={menu.id}
                  className="group bg-[#111827]/80 border border-slate-800/80 hover:border-[#38BDF8]/60 rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between backdrop-blur-md"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden bg-[#1E293B]">
                      <img
                        src={formatImageUrl(menu.image)}
                        alt={menu.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {menu.category && (
                        <span className="absolute top-3 left-3 bg-[#0B0F17]/80 backdrop-blur-xl text-[#38BDF8] border border-slate-700/80 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                          {menu.category}
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                        {menu.name}
                      </h3>
                      <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed font-light min-h-[2.25rem]">
                        {menu.description || "Freshly prepared with handpicked beans and premium ingredients."}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/80">
                      <div>
                        <p className="text-[8px] uppercase font-bold text-slate-500 tracking-widest">Price</p>
                        <p className="text-lg font-black text-[#38BDF8]">₹{menu.price}</p>
                      </div>

                      <div>
                        {qty > 0 ? (
                          <div className="flex items-center bg-[#0B0F17] border border-[#0284C7] rounded-xl overflow-hidden shadow-md">
                            <button
                              type="button"
                              onClick={(e) => handleDecrease(e, menu.id)}
                              className="px-2.5 py-1 text-[#38BDF8] hover:bg-[#0284C7] hover:text-white transition font-black text-xs cursor-pointer select-none"
                            >
                              −
                            </button>
                            <span className="px-2.5 text-white font-bold text-xs select-none">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => handleIncrease(e, menu.id)}
                              className="px-2.5 py-1 text-[#38BDF8] hover:bg-[#0284C7] hover:text-white transition font-black text-xs cursor-pointer select-none"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => handleAddToCart(e, menu.id)}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#0284C7] to-[#2563EB] hover:from-[#0369A1] hover:to-[#1D4ED8] text-white transition-all shadow-md active:scale-95 cursor-pointer"
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
        </div>
      </section>

      <section className="py-10 px-6 md:px-10 bg-[#0F172A]/60 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-[#111827] rounded-2xl border border-slate-800">
            <span className="text-2xl">☕</span>
            <p className="text-xs font-bold text-white mt-1">Handpicked Beans</p>
            <p className="text-[10px] text-slate-400">100% Arabica</p>
          </div>
          <div className="p-4 bg-[#111827] rounded-2xl border border-slate-800">
            <span className="text-2xl">🚀</span>
            <p className="text-xs font-bold text-white mt-1">Fast Table Prep</p>
            <p className="text-[10px] text-slate-400">Under 10 mins</p>
          </div>
          <div className="p-4 bg-[#111827] rounded-2xl border border-slate-800">
            <span className="text-2xl">🥐</span>
            <p className="text-xs font-bold text-white mt-1">Fresh Bakery</p>
            <p className="text-[10px] text-slate-400">Baked daily</p>
          </div>
          <div className="p-4 bg-[#111827] rounded-2xl border border-slate-800">
            <span className="text-2xl">❤️</span>
            <p className="text-xs font-bold text-white mt-1">Made With Care</p>
            <p className="text-[10px] text-slate-400">Master Baristas</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
