import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-[#0F172A] overflow-hidden flex flex-col justify-center">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0284C7]/10 rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-[#2563EB]/10 rounded-full pointer-events-none" />

      <div className="w-full bg-[#1E293B] border-b border-[#38BDF8]/20 py-2 px-4 text-center text-xs md:text-sm font-medium text-[#38BDF8] flex items-center justify-center gap-2 relative z-20">
        <span>✨</span>
        <span>Welcome to Coffee House • Handcrafted Beans & Special Brews Everyday!</span>
        <span>☕</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          <div>
            <div className="inline-flex items-center gap-2 bg-[#1E293B] text-[#38BDF8] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
              <span>☕</span>
              Freshly Brewed, Just for You
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Start Your Day
              <span className="block text-[#38BDF8]">
                With Great Coffee.
              </span>
            </h1>

            <p className="text-[#94A3B8] text-sm md:text-base leading-relaxed mt-4 max-w-xl">
              Discover the perfect blend of rich flavors, fresh ingredients,
              and warm moments. From handcrafted coffee to delicious snacks,
              there's something here for everyone.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link
                to="/menu"
                className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-6 py-3 rounded-xl font-semibold transition-all hover:-translate-y-1"
              >
                Explore Our Menu →
              </Link>

              <Link
                to="/about"
                className="border-2 border-white text-white hover:bg-white hover:text-[#0F172A] px-6 py-2.5 rounded-xl font-semibold transition-all"
              >
                About Us
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-[#1E293B]">
              <div>
                <p className="text-white font-bold text-base">Fresh 🌿</p>
                <p className="text-[#94A3B8] text-xs">Quality Ingredients</p>
              </div>

              <div className="w-px bg-[#1E293B]" />

              <div>
                <p className="text-white font-bold text-base">Premium ☕</p>
                <p className="text-[#94A3B8] text-xs">Coffee Beans</p>
              </div>

              <div className="w-px bg-[#1E293B]" />

              <div>
                <p className="text-white font-bold text-base">Made With ❤️</p>
                <p className="text-[#94A3B8] text-xs">Love & Care</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#1E293B] rounded-[2.5rem] rotate-3" />

            <div className="relative w-full max-w-md h-[340px] md:h-[420px] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
                alt="Fresh Coffee"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 bg-[#1E293B]/90 backdrop-blur-md p-4 rounded-xl border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#38BDF8] text-xs font-semibold">
                      Today's Special 🔥
                    </p>

                    <h3 className="text-white text-lg font-bold mt-0.5">
                      Freshly Brewed Coffee
                    </h3>
                  </div>

                  <div className="w-10 h-10 bg-[#0284C7] text-white rounded-full flex items-center justify-center text-lg">
                    ☕
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-3 -right-2 bg-[#2563EB] text-white px-4 py-2 rounded-xl shadow-lg rotate-3">
              <p className="font-semibold text-xs">Better Taste ✨</p>
              <p className="text-[10px] opacity-80">Better Life</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
