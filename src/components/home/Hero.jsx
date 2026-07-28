import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-[#1a0f07] overflow-hidden flex flex-col justify-center border-b border-amber-600/30">
      {/* Background Golden Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/20 rounded-full pointer-events-none blur-3xl" />
      <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-amber-600/20 rounded-full pointer-events-none blur-3xl" />

      {/* Top Welcome Bar */}
      <div className="w-full bg-gradient-to-r from-amber-900/60 via-amber-800/80 to-amber-900/60 border-b border-amber-500/30 py-2.5 px-4 text-center text-xs md:text-sm font-semibold text-amber-200 flex items-center justify-center gap-2 relative z-20">
        <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
        </svg>
        <span>Welcome to Coffee House • Handcrafted Beans & Special Brews Everyday!</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          <div>
            <div className="inline-flex items-center gap-2 bg-amber-950/80 border border-amber-500/40 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-lg">
              <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 19h18v2H2v-2zm2-7V5h14v7c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4zm16-5h2v3c0 1.1-.9 2-2 2v-5zM6 3h2v1H6V3zm4 0h2v1h-2V3zm4 0h2v1h-2V3z"/>
              </svg>
              Freshly Brewed, Just for You
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-amber-50 leading-tight">
              Start Your Day
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
                With Great Coffee.
              </span>
            </h1>

            <p className="text-amber-100/80 text-sm md:text-base leading-relaxed mt-4 max-w-xl">
              Discover the perfect blend of rich flavors, fresh ingredients,
              and warm moments. From handcrafted coffee to delicious snacks,
              there's something here for everyone.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link
                to="/menu"
                className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-black px-7 py-3.5 rounded-xl text-xs transition duration-300 shadow-xl shadow-amber-600/30"
              >
                Explore Our Menu →
              </Link>

              <Link
                to="/about"
                className="border-2 border-amber-400/60 text-amber-200 hover:bg-amber-500 hover:text-white px-6 py-3 rounded-xl font-bold text-xs transition duration-300"
              >
                About Us
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-amber-600/30">
              <div>
                <p className="text-amber-300 font-bold text-base">Fresh Quality</p>
                <p className="text-amber-200/70 text-xs">Organic Ingredients</p>
              </div>

              <div className="w-px bg-amber-600/30" />

              <div>
                <p className="text-amber-300 font-bold text-base">Premium Beans</p>
                <p className="text-amber-200/70 text-xs">Single Origin Coffee</p>
              </div>

              <div className="w-px bg-amber-600/30" />

              <div>
                <p className="text-amber-300 font-bold text-base">Made With Care</p>
                <p className="text-amber-200/70 text-xs">Love & Passion</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] h-[92%] bg-gradient-to-br from-amber-900/40 to-amber-950/60 rounded-[2.5rem] rotate-3 border border-amber-500/30" />

            <div className="relative w-full max-w-md h-[340px] md:h-[420px] rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-amber-500/40">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
                alt="Fresh Coffee"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f07] via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 bg-amber-950/90 backdrop-blur-md p-4 rounded-2xl border border-amber-500/40 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                      Today's Special
                    </p>

                    <h3 className="text-white text-lg font-black mt-0.5">
                      Freshly Brewed Coffee
                    </h3>
                  </div>

                  <div className="w-10 h-10 bg-amber-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-md shadow-amber-600/40">
                    <svg className="w-5 h-5 text-amber-100" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2 19h18v2H2v-2zm2-7V5h14v7c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4zm16-5h2v3c0 1.1-.9 2-2 2v-5zM6 3h2v1H6V3zm4 0h2v1h-2V3zm4 0h2v1h-2V3z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-3 -right-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white px-4 py-2 rounded-xl shadow-xl rotate-3 border border-amber-300/40">
              <p className="font-black text-xs">Better Taste</p>
              <p className="text-[10px] text-amber-100 opacity-90">Better Life</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
