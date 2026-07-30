import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://coffeehouse-backend-xtle.onrender.com";

const INITIAL_FALLBACK_MENUS = [
  { id: "m1", name: "Cappuccino", category: "Coffee", type: "veg", price: "122.50", description: "Rich espresso blended with velvety steamed milk and topped with a thick layer of silky foam.", image: "https://images.unsplash.com/photo-1534778101976-62847782c213", is_available: true },
  { id: "m2", name: "French Fries", category: "Snack", type: "veg", price: "50.00", description: "Crispy golden french fries served hot and fresh, lightly seasoned to perfection.", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877", is_available: true },
  { id: "m3", name: "Artisanal Espresso", category: "Coffee", type: "veg", price: "180.00", description: "Rich, bold double shot espresso crafted from roasted Arabica beans.", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04", is_available: true },
  { id: "m4", name: "Nitro Cold Brew", category: "Coffee", type: "veg", price: "260.00", description: "Slow-steeped cold brew infused with nitrogen for a silky pour.", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c", is_available: true },
  { id: "m5", name: "Butter Croissant", category: "Snack", type: "veg", price: "150.00", description: "Flaky, golden French croissant baked fresh every morning.", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a", is_available: true },
  { id: "m6", name: "Dark Chocolate Muffin", category: "Dessert", type: "veg", price: "190.00", description: "Decadent dark chocolate muffin loaded with belgian chocolate chips.", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa", is_available: true }
];

const deduplicateMenus = (itemList) => {
  const seen = new Map();
  itemList.forEach((item) => {
    if (!item) return;
    const key = String(item.id || item.name).trim().toLowerCase();
    if (!seen.has(key)) {
      seen.set(key, item);
    }
  });
  return Array.from(seen.values());
};

const Menu = () => {
  const [menus, setMenus] = useState(() => {
    try {
      const cached = localStorage.getItem("app_permanent_menus");
      if (cached) {
        const parsed = JSON.parse(cached);
        return deduplicateMenus(parsed);
      }
      return INITIAL_FALLBACK_MENUS;
    } catch {
      return INITIAL_FALLBACK_MENUS;
    }
  });

  const [cartQuantities, setCartQuantities] = useState(() => {
    try {
      const savedCart = localStorage.getItem("app_cart_items");
      return savedCart ? JSON.parse(savedCart) : {};
    } catch {
      return {};
    }
  });

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [foodType, setFoodType] = useState("all"); // 'all', 'veg', 'nonveg'
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigate = useNavigate();

  const fetchMenuFromApi = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Token ${token}` } : {};
      const res = await axios.get(`${API_BASE_URL}/menu/`, { headers, timeout: 5000 });
      const apiItems = Array.isArray(res.data) ? res.data : (res.data?.results || res.data?.data || []);
      
      if (apiItems && apiItems.length > 0) {
        const existing = JSON.parse(localStorage.getItem("app_permanent_menus") || "[]");
        const combined = [...existing, ...apiItems, ...INITIAL_FALLBACK_MENUS];
        const cleanList = deduplicateMenus(combined);
        setMenus(cleanList);
        localStorage.setItem("app_permanent_menus", JSON.stringify(cleanList));
      }
    } catch (err) {
      console.warn("Using offline cached catalog");
    } finally {
      if (isManual) {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  };

  useEffect(() => {
    fetchMenuFromApi(false);
  }, []);

  const triggerLoginModal = useCallback(() => {
    setShowLoginModal(true);
    setTimeout(() => {
      navigate("/login");
    }, 100);
  }, [navigate]);

  const updateQuantity = useCallback((menuId, delta) => {
    const token = localStorage.getItem("token");
    if (!token) {
      triggerLoginModal();
      return;
    }

    setCartQuantities((prev) => {
      const current = prev[menuId] || 0;
      const next = Math.max(0, current + delta);
      const updated = { ...prev };
      if (next === 0) delete updated[menuId];
      else updated[menuId] = next;

      localStorage.setItem("app_cart_items", JSON.stringify(updated));
      return updated;
    });
  }, [triggerLoginModal]);

  const formatImageUrl = useCallback((url) => {
    if (!url) return "https://images.unsplash.com/photo-1572442388796-11668ba67e53";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  }, []);

  const filteredMenus = menus.filter((m) => {
    const matchesCat = selectedCategory === "All" || m.category === selectedCategory;
    const matchesSearch = (m.name || "").toLowerCase().includes(searchQuery.toLowerCase());
    
    // Veg / Non-Veg filter check
    const itemType = (m.type || "veg").toLowerCase();
    const matchesType = 
      foodType === "all" || 
      (foodType === "veg" && (itemType === "veg" || itemType === "vegetarian")) || 
      (foodType === "nonveg" && (itemType === "nonveg" || itemType === "non-veg"));

    return matchesCat && matchesSearch && matchesType;
  });

  const totalCartCount = Object.values(cartQuantities).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-[#1a0f07] text-amber-50 min-h-screen py-8 px-4 md:px-8 font-sans relative">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header with Refresh Icon */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-amber-600/40 pb-5">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-amber-400 text-xs font-black uppercase tracking-widest block">
                ☕ Crafted With Passion
              </span>
              <h1 className="text-3xl md:text-5xl font-black mt-1 text-amber-50 tracking-tight">
                Our Fresh Catalog
              </h1>
            </div>

            {/* Manual Menu Refresh Icon Button */}
            <button
              onClick={() => fetchMenuFromApi(true)}
              title="Refresh Menu Catalog"
              className="mt-4 p-2.5 rounded-2xl bg-amber-950/80 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-white transition shadow-lg cursor-pointer"
            >
              <svg 
                className={`w-5 h-5 ${isRefreshing ? "animate-spin text-amber-400" : ""}`} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => {
              const token = localStorage.getItem("token");
              if (!token) {
                triggerLoginModal();
              } else {
                navigate("/cart");
              }
            }}
            className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-3 rounded-2xl font-black text-xs md:text-sm transition flex items-center gap-3 shadow-xl shadow-amber-600/30 cursor-pointer"
          >
            <span>🛒 Go to Cart</span>
            {totalCartCount > 0 && (
              <span className="bg-amber-950 border border-amber-400 text-amber-300 px-2.5 py-0.5 rounded-full text-xs font-black">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>

        {/* Filters, Search & Veg/Non-Veg Toggles */}
        <div className="bg-gradient-to-b from-amber-950/80 to-amber-900/40 border-2 border-amber-600/40 p-4 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          
          <input
            type="text"
            placeholder="🔍 Search cappuccino, croissant, pizza..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-72 bg-amber-950/90 border-2 border-amber-600/40 text-amber-50 px-4 py-3 rounded-2xl text-xs font-bold outline-none focus:border-amber-400 placeholder:text-amber-200/40"
          />

          {/* Veg / Non-Veg Selector Tabs */}
          <div className="flex items-center gap-1.5 bg-amber-950/90 border border-amber-600/40 p-1.5 rounded-2xl">
            <button
              onClick={() => setFoodType("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                foodType === "all" ? "bg-amber-600 text-white shadow-md" : "text-amber-200/70 hover:text-white"
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setFoodType("veg")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                foodType === "veg" ? "bg-emerald-700 text-white shadow-md" : "text-emerald-400/80 hover:text-white"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Veg
            </button>
            <button
              onClick={() => setFoodType("nonveg")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                foodType === "nonveg" ? "bg-rose-700 text-white shadow-md" : "text-rose-400/80 hover:text-white"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" /> Non-Veg
            </button>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {["All", "Coffee", "Tea", "Pizza", "Burger", "Snack", "Ice-Cream", "Dessert"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap cursor-pointer transition ${
                  selectedCategory === cat ? "bg-amber-600 text-white shadow-lg shadow-amber-600/40" : "bg-amber-950 text-amber-200/70 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenus.map((item) => {
            const qty = cartQuantities[item.id] || 0;
            const isVeg = (item.type || "veg").toLowerCase() === "veg" || (item.type || "").toLowerCase() === "vegetarian";

            return (
              <div
                key={item.id}
                className="bg-gradient-to-b from-amber-950/80 to-amber-900/40 border-2 border-amber-600/40 hover:border-amber-400/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="h-56 bg-[#0d0704] relative overflow-hidden flex items-center justify-center border-b-2 border-amber-600/30">
                    <img
                      src={formatImageUrl(item.image)}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center"
                    />
                    
                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 bg-amber-950/90 backdrop-blur-md text-amber-300 border border-amber-500/40 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider z-10 shadow-md">
                      {item.category}
                    </span>

                    {/* Veg / Non-Veg Badge */}
                    <span className={`absolute top-3 right-3 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider z-10 shadow-md flex items-center gap-1.5 border ${
                      isVeg ? "bg-emerald-950/90 text-emerald-300 border-emerald-500/50" : "bg-rose-950/90 text-rose-300 border-rose-500/50"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${isVeg ? "bg-emerald-400" : "bg-rose-400"}`} />
                      {isVeg ? "Veg" : "Non-Veg"}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-black text-amber-50 leading-tight">
                        {item.name}
                      </h3>
                      <span className="text-xl font-black text-amber-400 shrink-0">₹{item.price}</span>
                    </div>
                    <p className="text-amber-200/70 text-xs line-clamp-3 leading-relaxed font-semibold">
                      {item.description || "Freshly prepared specialty dish crafted with organic ingredients."}
                    </p>
                  </div>
                </div>

                <div className="p-4 border-t-2 border-amber-600/30 flex items-center justify-between bg-amber-950/80 mt-2">
                  <span className="text-xs font-black text-amber-300">
                    {qty > 0 ? `In Cart: ${qty}` : "Fresh Preparation"}
                  </span>

                  {qty === 0 ? (
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-xl font-black text-xs transition cursor-pointer shadow-lg shadow-amber-600/40"
                    >
                      + Add Item
                    </button>
                  ) : (
                    <div className="flex items-center bg-[#120B07] border border-amber-500/50 rounded-xl overflow-hidden p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 bg-amber-950 hover:bg-amber-600 text-amber-300 hover:text-white font-black text-lg rounded-lg flex items-center justify-center cursor-pointer transition"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-black text-xs text-amber-50">{qty}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 bg-amber-950 hover:bg-amber-600 text-amber-300 hover:text-white font-black text-lg rounded-lg flex items-center justify-center cursor-pointer transition"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#2d180b] via-[#1a0f07] to-[#120b07] border-2 border-amber-500/60 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center text-3xl mx-auto border-2 border-amber-500/40">
              🔐
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-amber-50">Login Required</h3>
              <p className="text-xs font-extrabold text-amber-200/80 leading-relaxed">
                Please log in to your account to add delicious items to your cart.
              </p>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-black py-3.5 rounded-2xl text-sm uppercase tracking-wider transition shadow-xl shadow-amber-600/40 cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
