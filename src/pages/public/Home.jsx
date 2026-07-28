import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Hero from "../../components/home/Hero";

const API_BASE_URL = "https://coffeehouse-backend-xtle.onrender.com";

const Home = () => {
  const navigate = useNavigate();
  const [addedMsg, setAddedMsg] = useState("");
  const [specialItems, setSpecialItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/menu/`);
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];

        if (data.length > 0) {
          const mapped = data.slice(0, 4).map((item) => ({
            id: item.id || item._id,
            name: item.name || item.title || "Special Coffee",
            price: item.price ? Number(item.price).toFixed(2) : "120.00",
            category: item.category?.name || item.category || "Coffee",
            image:
              item.image ||
              item.item_image ||
              "https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&q=75&auto=format",
            rating: item.rating || "4.9",
          }));
          setSpecialItems(mapped);
        }
      } catch (err) {
        console.error("API fetch error on Home page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, []);

  const handleQuickAdd = (item) => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("app_cart_items") || "{}"
      );
      saved[item.id] = (saved[item.id] || 0) + 1;
      localStorage.setItem("app_cart_items", JSON.stringify(saved));
      setAddedMsg(`${item.name} added to cart!`);
      setTimeout(() => setAddedMsg(""), 2000);
    } catch {
      navigate("/cart");
    }
  };

  const categories = [
    {
      title: "Hot Brews",
      desc: "Espresso, Latte & More",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80&auto=format"
    },
    {
      title: "Cold Brews",
      desc: "Iced Coffees & Frappes",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80&auto=format"
    },
    {
      title: "Fresh Bakery",
      desc: "Croissants & Muffins",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80&auto=format"
    },
    {
      title: "Snacks & Fries",
      desc: "Quick Crispy Bites",
      image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=400&q=80&auto=format"
    },
  ];

  return (
    <main className="bg-[#1a0f07] text-amber-50 h-auto pb-10">
      <Hero />

      {addedMsg && (
        <div className="fixed bottom-4 right-4 bg-amber-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-2xl z-50">
          ✓ {addedMsg}
        </div>
      )}

      {/* Stats Counter Section */}
      <section className="bg-amber-950/40 border-y border-amber-600/20 py-5 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
          <div className="p-1">
            <span className="text-amber-400 font-black text-lg block">10K+</span>
            <span className="text-amber-200/70 text-[11px]">Happy Customers</span>
          </div>
          <div className="p-1">
            <span className="text-amber-400 font-black text-lg block">4.9 ★</span>
            <span className="text-amber-200/70 text-[11px]">Top Rated Beans</span>
          </div>
          <div className="p-1">
            <span className="text-amber-400 font-black text-lg block">12 Mins</span>
            <span className="text-amber-200/70 text-[11px]">Avg Prep Time</span>
          </div>
          <div className="p-1">
            <span className="text-amber-400 font-black text-lg block">100%</span>
            <span className="text-amber-200/70 text-[11px]">Fresh Roasted</span>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="pt-8 pb-4 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider block">
              Explore Menu
            </span>
            <h2 className="text-xl font-black text-amber-50">Popular Categories</h2>
          </div>
          <Link to="/menu" className="text-amber-400 text-xs font-bold hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={i}
              to="/menu"
              className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 hover:border-amber-400 rounded-2xl overflow-hidden transition group shadow-xl flex flex-col"
            >
              <div className="h-28 w-full overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/90 via-transparent to-transparent" />
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-amber-100 group-hover:text-amber-400 transition">
                  {cat.title}
                </p>
                <p className="text-[10px] text-amber-200/60 mt-0.5">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="pt-6 pb-6 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider block">
              Must Try
            </span>
            <h2 className="text-xl font-black text-amber-50">
              Featured Bestsellers
            </h2>
          </div>
          <Link to="/menu" className="text-amber-400 text-xs font-bold hover:underline">
            Full Menu →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-amber-950/40 border border-amber-600/20 rounded-2xl p-3 h-48 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {specialItems.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-b from-amber-950/60 to-amber-900/40 border border-amber-600/30 rounded-2xl p-3 flex flex-col justify-between shadow-xl min-h-[220px] hover:border-amber-400/70 transition"
              >
                <div>
                  <div className="h-32 bg-amber-950 rounded-xl overflow-hidden mb-2.5 relative shrink-0 border border-amber-600/20">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="eager"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-amber-950/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-500/40">
                      ★ {item.rating}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    {item.category}
                  </p>
                  <h3 className="text-xs font-bold text-amber-50 truncate">
                    {item.name}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-amber-600/20">
                  <span className="text-xs font-black text-amber-300">
                    ₹{item.price}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuickAdd(item)}
                    className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition shadow-md shadow-amber-600/30"
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Special Promo Banner Section */}
      <section className="py-6 px-4 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-amber-400/30">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-amber-950/40 text-amber-200 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-amber-400/20">
              Limited Offer
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white">
              Get 20% Off Your First Coffee Order
            </h3>
            <p className="text-xs text-amber-100/80 max-w-md">
              Experience handcrafted artisan brews made with premium freshly roasted beans. Use code <span className="font-bold text-white">COFFEE20</span> at checkout.
            </p>
          </div>
          <Link
            to="/menu"
            className="bg-amber-950 text-amber-300 hover:bg-black font-black px-6 py-3 rounded-xl text-xs transition shadow-lg shrink-0 border border-amber-500/40"
          >
            Order Now →
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-6 px-4 max-w-6xl mx-auto border-t border-amber-600/30">
        <div className="text-center mb-6">
          <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider block">
            Why Coffee House
          </span>
          <h2 className="text-xl font-black text-amber-50">Crafted For Coffee Lovers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 p-5 rounded-2xl text-center space-y-2">
            <div className="w-10 h-10 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl flex items-center justify-center mx-auto text-lg font-bold">
              ☕
            </div>
            <h4 className="text-xs font-bold text-amber-100">Ethically Sourced Beans</h4>
            <p className="text-[11px] text-amber-200/60">100% single-origin arabica beans direct from sustainable farms.</p>
          </div>
          <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 p-5 rounded-2xl text-center space-y-2">
            <div className="w-10 h-10 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl flex items-center justify-center mx-auto text-lg font-bold">
              🔥
            </div>
            <h4 className="text-xs font-bold text-amber-100">Freshly Roasted</h4>
            <p className="text-[11px] text-amber-200/60">Roasted in small batches daily to ensure maximum aroma and rich flavor.</p>
          </div>
          <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 p-5 rounded-2xl text-center space-y-2">
            <div className="w-10 h-10 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl flex items-center justify-center mx-auto text-lg font-bold">
              ⚡
            </div>
            <h4 className="text-xs font-bold text-amber-100">Express Delivery</h4>
            <p className="text-[11px] text-amber-200/60">Hot and fresh coffee delivered right to your doorstep in minutes.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
