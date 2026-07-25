import React from "react";
import Hero from "../../components/home/Hero";

const Home = () => {
  return (
    <main className="bg-[#0B0F17] min-h-screen text-slate-100 flex flex-col justify-between">
      <Hero />
      <section className="py-10 px-6 bg-[#0F172A] border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-[#111827] p-5 rounded-2xl border border-slate-800">
            <p className="text-2xl mb-1">⚡</p>
            <h3 className="font-bold text-sm text-white">Fast Delivery</h3>
            <p className="text-xs text-slate-400 mt-1">Hot coffee at your doorstep in minutes</p>
          </div>
          <div className="bg-[#111827] p-5 rounded-2xl border border-slate-800">
            <p className="text-2xl mb-1">🌱</p>
            <h3 className="font-bold text-sm text-white">100% Organic</h3>
            <p className="text-xs text-slate-400 mt-1">Sourced from top artisanal farms</p>
          </div>
          <div className="bg-[#111827] p-5 rounded-2xl border border-slate-800">
            <p className="text-2xl mb-1">🛡️</p>
            <h3 className="font-bold text-sm text-white">Quality Assured</h3>
            <p className="text-xs text-slate-400 mt-1">Freshly brewed by expert baristas</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
