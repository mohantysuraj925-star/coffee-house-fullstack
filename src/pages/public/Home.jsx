import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hero from "../../components/home/Hero";

const SPECIAL_ITEMS = [
  { id: "m1", name: "Cappuccino", price: "122.50", category: "Coffee", image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&q=75&auto=format", rating: "4.9" },
  { id: "m2", name: "French Fries", price: "50.00", category: "Snack", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&q=75&auto=format", rating: "4.8" },
  { id: "m3", name: "Artisanal Espresso", price: "180.00", category: "Coffee", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=300&q=75&auto=format", rating: "5.0" },
  { id: "m4", name: "Nitro Cold Brew", price: "260.00", category: "Coffee", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300&q=75&auto=format", rating: "4.9" }
];

const Home = () => {
  const navigate = useNavigate();
  const [addedMsg, setAddedMsg] = useState("");

  const handleQuickAdd = (item) => {
    try {
      const saved = JSON.parse(localStorage.getItem("app_cart_items") || "{}");
      saved[item.id] = (saved[item.id] || 0) + 1;
      localStorage.setItem("app_cart_items", JSON.stringify(saved));
      setAddedMsg(`${item.name} added to cart!`);
      setTimeout(() => setAddedMsg(""), 2000);
    } catch {
      navigate("/cart");
    }
  };

  return (
    <main className="bg-[#0B0F17] text-slate-100 h-auto pb-2">
      <Hero />

      {addedMsg && (
        <div className="fixed bottom-4 right-4 bg-[#0284C7] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xl z-50">
          ✓ {addedMsg}
        </div>
      )}

      <section className="bg-[#111827] border-y border-slate-800 py-3 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
          <div className="p-1"><span className="text-[#38BDF8] font-black text-base block">10K+</span><span className="text-slate-400 text-[10px]">Happy Customers</span></div>
          <div className="p-1"><span className="text-[#38BDF8] font-black text-base block">4.9 ★</span><span className="text-slate-400 text-[10px]">Top Rated Beans</span></div>
          <div className="p-1"><span className="text-[#38BDF8] font-black text-base block">12 Mins</span><span className="text-slate-400 text-[10px]">Avg Prep Time</span></div>
          <div className="p-1"><span className="text-[#38BDF8] font-black text-base block">100%</span><span className="text-slate-400 text-[10px]">Fresh Roasted</span></div>
        </div>
      </section>

      <section className="pt-6 pb-4 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[#38BDF8] text-[10px] font-bold uppercase tracking-wider block">Explore Menu</span>
            <h2 className="text-lg font-black text-white">Popular Categories</h2>
          </div>
          <Link to="/menu" className="text-[#38BDF8] text-xs font-bold hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { title: "Hot Brews ☕", desc: "Espresso, Latte & More" },
            { title: "Cold Brews 🧊", desc: "Iced Coffees & Frappes" },
            { title: "Fresh Bakery 🥐", desc: "Croissants & Muffins" },
            { title: "Snacks & Fries 🍟", desc: "Quick Crispy Bites" }
          ].map((cat, i) => (
            <Link key={i} to="/menu" className="bg-[#111827] border border-slate-800 hover:border-[#38BDF8]/50 p-3.5 rounded-2xl transition group">
              <p className="text-xs font-bold text-white group-hover:text-[#38BDF8]">{cat.title}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="pt-4 pb-2 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[#38BDF8] text-[10px] font-bold uppercase tracking-wider block">Must Try</span>
            <h2 className="text-lg font-black text-white">Featured Bestsellers</h2>
          </div>
          <Link to="/menu" className="text-[#38BDF8] text-xs font-bold hover:underline">Full Menu →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {SPECIAL_ITEMS.map((item) => (
            <div key={item.id} className="bg-[#111827] border border-slate-800/80 rounded-2xl p-3 flex flex-col justify-between shadow-lg min-h-[220px]">
              <div>
                <div className="h-28 bg-[#1F2937] rounded-xl overflow-hidden mb-2.5 relative shrink-0">
                  <img src={item.image} alt={item.name} loading="eager" className="w-full h-full object-cover" />
                  <span className="absolute top-2 right-2 bg-black/70 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    ★ {item.rating}
                  </span>
                </div>
                <p className="text-[10px] font-bold text-[#38BDF8] uppercase tracking-wider">{item.category}</p>
                <h3 className="text-xs font-bold text-white truncate">{item.name}</h3>
              </div>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800">
                <span className="text-xs font-black text-white">₹{item.price}</span>
                <button
                  type="button"
                  onClick={() => handleQuickAdd(item)}
                  className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer"
                >
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
