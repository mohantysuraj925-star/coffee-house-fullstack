import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [cartQuantities, setCartQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchMenusAndCart = async () => {
    try {
      setLoading(true);
      setError("");

      const menuRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/menu/`);
      setMenus(menuRes.data);

      if (token) {
        try {
          const cartRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart/`, {
            headers: { Authorization: `Token ${token}` },
          });

          const qtyMap = {};
          cartRes.data.forEach((item) => {
            const id = typeof item.menu === "object" ? item.menu.id : item.menu;
            qtyMap[id] = item.quantity || 1;
          });
          setCartQuantities(qtyMap);
        } catch (cErr) {
          console.error("Cart Fetch Error:", cErr);
        }
      }
    } catch (err) {
      console.error("Error fetching menu:", err);
      setError("Failed to load menu items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenusAndCart();
  }, []);

  const handleAddToCart = (e, menuId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      navigate("/login");
      return;
    }

    setCartQuantities((prev) => ({ ...prev, [menuId]: 1 }));

    axios.post(
      `${import.meta.env.VITE_BASE_URL}/cart/`,
      { menu: menuId, quantity: 1 },
      { headers: { Authorization: `Token ${token}` } }
    ).catch((err) => console.error("Add to cart error:", err));
  };

  const handleIncrease = (e, menuId) => {
    e.preventDefault();
    e.stopPropagation();

    const currentQty = cartQuantities[menuId] || 1;
    const newQty = currentQty + 1;

    setCartQuantities((prev) => ({ ...prev, [menuId]: newQty }));

    axios.post(
      `${import.meta.env.VITE_BASE_URL}/cart/`,
      { menu: menuId, quantity: 1 },
      { headers: { Authorization: `Token ${token}` } }
    ).catch((err) => console.error("Increase error:", err));
  };

  const handleDecrease = (e, menuId) => {
    e.preventDefault();
    e.stopPropagation();

    const currentQty = cartQuantities[menuId] || 1;

    if (currentQty <= 1) {
      setCartQuantities((prev) => {
        const updated = { ...prev };
        delete updated[menuId];
        return updated;
      });
    } else {
      setCartQuantities((prev) => ({ ...prev, [menuId]: currentQty - 1 }));
    }
  };

  const formatImageUrl = (url) => {
    if (!url) return "https://images.unsplash.com/photo-1572442388796-11668ba67e53";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${import.meta.env.VITE_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0284C7]/10 rounded-full" />
        <div className="absolute -bottom-40 -right-32 w-[500px] h-[500px] bg-[#2563EB]/10 rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center">
          <p className="text-[#38BDF8] text-sm font-semibold uppercase tracking-wider mb-3">
            Explore Our Menu
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Something Delicious <span className="text-[#38BDF8]">For Everyone</span>
          </h1>
          <p className="text-[#94A3B8] mt-5 max-w-2xl mx-auto leading-relaxed">
            Discover freshly brewed coffee, refreshing tea, delicious snacks, and sweet desserts.
          </p>
        </div>
      </section>

      <section className="bg-[#1E293B] py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#38BDF8] text-sm font-semibold uppercase tracking-wider">
                Our Selection
              </p>
              <h2 className="text-3xl font-bold text-white mt-2">Our Menu</h2>
            </div>
            {!loading && (
              <div className="hidden sm:block bg-[#0F172A] text-[#38BDF8] border border-slate-700 px-4 py-2 rounded-full text-sm font-semibold">
                {menus.length} Items
              </div>
            )}
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-950/50 border border-red-800 text-red-300 rounded-xl">
              {error}
            </div>
          )}

          {loading ? (
            <div className="py-20 text-center">
              <div className="w-10 h-10 border-4 border-slate-700 border-t-[#38BDF8] rounded-full animate-spin mx-auto" />
              <p className="text-[#94A3B8] mt-4">Loading menu items...</p>
            </div>
          ) : menus.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-[#94A3B8]">No menu items found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {menus.map((menu) => {
                const qty = cartQuantities[menu.id] || 0;

                return (
                  <div
                    key={menu.id}
                    className="group bg-[#0F172A] border border-slate-700 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-56 overflow-hidden bg-[#1E293B]">
                      <img
                        src={formatImageUrl(menu.image)}
                        alt={menu.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-[#0F172A]/90 text-[#38BDF8] px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-700">
                        {menu.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-white">{menu.name}</h3>
                      <p className="text-[#94A3B8] text-sm mt-2 line-clamp-2 min-h-10">
                        {menu.description || "A delicious choice from our menu."}
                      </p>

                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-800">
                        <div>
                          <p className="text-xs text-[#94A3B8]">Price</p>
                          <p className="text-xl font-bold text-[#38BDF8]">₹{menu.price}</p>
                        </div>

                        <div>
                          {!menu.is_available ? (
                            <button
                              type="button"
                              disabled
                              className="p-2.5 px-4 rounded-xl font-semibold bg-slate-800 text-slate-500 cursor-not-allowed"
                            >
                              Unavailable
                            </button>
                          ) : qty > 0 ? (
                            <div className="flex items-center bg-[#1E293B] border border-[#0284C7] rounded-xl overflow-hidden">
                              <button
                                type="button"
                                onClick={(e) => handleDecrease(e, menu.id)}
                                className="px-3 py-2 text-[#38BDF8] hover:bg-[#0284C7] hover:text-white transition font-bold cursor-pointer select-none"
                              >
                                -
                              </button>
                              <span className="px-3 text-white font-semibold text-sm select-none">
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => handleIncrease(e, menu.id)}
                                className="px-3 py-2 text-[#38BDF8] hover:bg-[#0284C7] hover:text-white transition font-bold cursor-pointer select-none"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => handleAddToCart(e, menu.id)}
                              className="p-2.5 px-4 rounded-xl font-semibold bg-[#0284C7] hover:bg-[#0369A1] text-white cursor-pointer transition shadow-sm"
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
    </div>
  );
};

export default Menu;
