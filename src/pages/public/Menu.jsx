import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://coffeehouse-backend-xtle.onrender.com";

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [cartQuantities, setCartQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [foodType, setFoodType] = useState("all");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("app_cart_items");
    if (savedCart) {
      try {
        setCartQuantities(JSON.parse(savedCart));
      } catch (e) {}
    }
  }, []);

  const saveCart = (newCart) => {
    setCartQuantities(newCart);
    localStorage.setItem("app_cart_items", JSON.stringify(newCart));
  };

  useEffect(() => {
    setLoading(true);
    const fetchMenuData = async () => {
      try {
        let res = await axios.get(`${API_BASE_URL}/api/menu/`).catch(() => null);
        if (!res || !res.data) {
          res = await axios.get(`${API_BASE_URL}/menu/`).catch(() => null);
        }

        if (res && res.data) {
          const rawData = res.data;
          const items = Array.isArray(rawData)
            ? rawData
            : rawData.results || rawData.data || rawData.menus || [];
          setMenus(items);
        } else {
          setMenus([]);
        }
      } catch (err) {
        console.error("Menu fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const handleAddToCart = (e, menuId) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
      return;
    }
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
    return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const categories = [
    "All",
    ...new Set(
      menus
        .map((m) => (typeof m.category === "object" ? m.category?.name : m.category))
        .filter(Boolean)
    ),
  ];

  let filteredMenus = menus.filter((m) => {
    const itemCat = typeof m.category === "object" ? m.category?.name : m.category;
    const matchesCategory = selectedCategory === "All" || itemCat === selectedCategory;
    const matchesSearch =
      (m.name || m.title || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (m.description || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const isItemNonVeg = m.is_veg === false || m.type === "nonveg" || (m.category && String(m.category).toLowerCase().includes("non"));

    let matchesType = true;
    if (foodType === "veg") {
      matchesType = !isItemNonVeg;
    } else if (foodType === "nonveg") {
      matchesType = isItemNonVeg;
    }

    return matchesCategory && matchesSearch && matchesType;
  });

  if (sortOrder === "lowToHigh") {
    filteredMenus = [...filteredMenus].sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortOrder === "highToLow") {
    filteredMenus = [...filteredMenus].sort((a, b) => Number(b.price) - Number(a.price));
  }

  const totalCartItems = Object.values(cartQuantities).reduce((a, b) => a + b, 0);

  const sortLabels = {
    default: "Sort: Featured",
    lowToHigh: "Price: Low to High",
    highToLow: "Price: High to Low"
  };

  return (
    <div className="bg-[#1a0f07] text-amber-50 min-h-screen overflow-x-hidden w-full">
      {/* Header Banner */}
      <section className="relative py-8 md:py-10 border-b border-amber-600/30 bg-gradient-to-b from-[#120B07] via-[#1a0f07] to-amber-950/30 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-2 bg-amber-950/80 border border-amber-500/40 text-amber-300 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Crafted To Perfection
          </span>

          <h1 className="text-2xl md:text-4xl font-black text-amber-50 leading-tight">
            Savor The Exceptional <span className="text-amber-400">Coffee & Bites</span>
          </h1>

          <p className="text-amber-200/70 max-w-xl mx-auto text-xs font-light">
            Indulge in artisanal single-origin brews, pizzas, burgers, and fresh delights.
          </p>

          <div className="max-w-md mx-auto relative pt-2">
            <input
              type="text"
              placeholder="Search coffee, pizza, burger, pastries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-amber-950/80 border border-amber-600/30 focus:border-amber-400 text-amber-50 px-4 py-2.5 rounded-xl text-xs outline-none transition placeholder:text-amber-200/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-300 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-6 px-4 md:px-8 max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-amber-600/30 gap-4">
          <div>
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest">Barista & Kitchen Specials</p>
            <h2 className="text-xl md:text-2xl font-black text-amber-50 mt-0.5">Our Full Menu</h2>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Filter Buttons with Dot Indicators */}
            <div className="flex items-center bg-amber-950/80 border border-amber-600/30 rounded-xl p-1 text-xs gap-1">
              <button
                onClick={() => setFoodType("all")}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  foodType === "all" ? "bg-amber-600 text-white" : "text-amber-200/70 hover:text-white"
                }`}
              >
                All
              </button>

              <button
                onClick={() => setFoodType("veg")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  foodType === "veg" ? "bg-amber-600 text-white" : "text-amber-200/70 hover:text-white"
                }`}
              >
                <span className="w-2.5 h-2.5 border border-green-500 flex items-center justify-center p-0.5 rounded-sm">
                  <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                </span>
                Veg
              </button>

              <button
                onClick={() => setFoodType("nonveg")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  foodType === "nonveg" ? "bg-amber-600 text-white" : "text-amber-200/70 hover:text-white"
                }`}
              >
                <span className="w-2.5 h-2.5 border border-red-500 flex items-center justify-center p-0.5 rounded-sm">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                </span>
                Non-Veg
              </button>
            </div>

            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="bg-amber-950/90 border border-amber-600/40 text-amber-200 text-xs font-bold px-3 py-1.5 rounded-xl outline-none cursor-pointer flex items-center gap-1.5"
              >
                <span>{sortLabels[sortOrder]}</span>
                <span className="text-[10px] text-amber-400">▼</span>
              </button>

              {isSortOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-[#180E0A] border border-amber-600/40 rounded-xl shadow-2xl py-1 z-50">
                  <button
                    onClick={() => { setSortOrder("default"); setIsSortOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-bold transition ${
                      sortOrder === "default" ? "text-amber-400 bg-amber-950/60" : "text-amber-200/80 hover:bg-amber-950/40"
                    }`}
                  >
                    Sort: Featured
                  </button>
                  <button
                    onClick={() => { setSortOrder("lowToHigh"); setIsSortOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-bold transition ${
                      sortOrder === "lowToHigh" ? "text-amber-400 bg-amber-950/60" : "text-amber-200/80 hover:bg-amber-950/40"
                    }`}
                  >
                    Price: Low to High
                  </button>
                  <button
                    onClick={() => { setSortOrder("highToLow"); setIsSortOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-bold transition ${
                      sortOrder === "highToLow" ? "text-amber-400 bg-amber-950/60" : "text-amber-200/80 hover:bg-amber-950/40"
                    }`}
                  >
                    Price: High to Low
                  </button>
                </div>
              )}
            </div>

            {totalCartItems > 0 && (
              <button
                onClick={() => navigate("/cart")}
                className="flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-amber-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-md"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Cart</span>
                <span className="bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full text-[10px] font-black">
                  {totalCartItems}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        {categories.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-amber-600 text-white shadow-md"
                    : "bg-amber-950/60 text-amber-200/70 border border-amber-600/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Menu Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="bg-amber-950/40 border border-amber-600/20 rounded-2xl h-56 animate-pulse" />
            ))}
          </div>
        ) : filteredMenus.length === 0 ? (
          <div className="text-center py-12 text-amber-200/50 text-xs font-semibold">
            No menu items found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMenus.map((menu) => {
              const itemId = menu.id || menu._id;
              const qty = cartQuantities[itemId] || 0;
              const categoryName = typeof menu.category === "object" ? menu.category?.name : menu.category;
              const itemName = menu.name || menu.title;
              const isNonVeg = menu.is_veg === false || menu.type === "nonveg" || (menu.category && String(menu.category).toLowerCase().includes("non"));

              return (
                <div
                  key={itemId}
                  className="group bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 hover:border-amber-400/60 rounded-2xl overflow-hidden flex flex-col justify-between transition duration-300 shadow-md"
                >
                  <div>
                    <div className="relative h-36 w-full overflow-hidden bg-[#180E0A] shrink-0">
                      <img
                        src={formatImageUrl(menu.image || menu.item_image)}
                        alt={itemName}
                        loading="eager"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Show Red Non-Veg Badge ONLY if item is Non-Veg */}
                      {isNonVeg && (
                        <span className="absolute top-2 left-2 bg-red-950/90 text-red-300 border border-red-500/50 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase flex items-center gap-1">
                          <span className="w-2 h-2 border border-red-500 flex items-center justify-center p-0.5 rounded-sm">
                            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                          </span>
                          Non-Veg
                        </span>
                      )}

                      {categoryName && !isNonVeg && (
                        <span className="absolute top-2 left-2 bg-amber-950/90 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase">
                          {categoryName}
                        </span>
                      )}
                    </div>

                    <div className="p-3">
                      <h3 className="text-xs font-bold text-amber-50 truncate">
                        {itemName}
                      </h3>
                      <p className="text-amber-200/60 text-[11px] mt-1 line-clamp-2 leading-tight font-light h-7">
                        {menu.description || "Freshly prepared specialty item."}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 pt-0">
                    <div className="flex items-center justify-between pt-2 border-t border-amber-600/20">
                      <div>
                        <p className="text-sm font-black text-amber-400">₹{menu.price}</p>
                      </div>

                      <div>
                        {qty > 0 ? (
                          <div className="flex items-center bg-amber-950 border border-amber-500/40 rounded-lg overflow-hidden">
                            <button
                              type="button"
                              onClick={(e) => handleDecrease(e, itemId)}
                              className="px-2 py-0.5 text-amber-300 hover:bg-amber-600 hover:text-white font-black text-xs transition select-none"
                            >
                              −
                            </button>
                            <span className="px-2 text-amber-50 font-bold text-xs select-none">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => handleIncrease(e, itemId)}
                              className="px-2 py-0.5 text-amber-300 hover:bg-amber-600 hover:text-white font-black text-xs transition select-none"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => handleAddToCart(e, itemId)}
                            className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white transition shadow-sm cursor-pointer"
                          >
                            Add
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
      </section>
    </div>
  );
};

export default Menu;
