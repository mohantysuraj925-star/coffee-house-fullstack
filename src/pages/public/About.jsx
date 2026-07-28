import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-[#1a0f07] text-amber-50">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              Our Story
            </p>

            <h1 className="text-4xl md:text-6xl font-black text-amber-50 leading-tight">
              More Than Just
              <span className="text-amber-400"> Coffee</span>
            </h1>

            <p className="text-amber-100/80 text-base md:text-lg leading-relaxed mt-6">
              Coffee House is a place where great taste meets warm moments.
              We believe every cup of coffee has the power to bring people
              together and make everyday moments a little more special.
            </p>
          </div>
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="bg-amber-950/40 border-y border-amber-600/20 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-amber-600/20 rounded-[2rem] border border-amber-500/30" />
              <div className="relative h-[400px] md:h-[480px] rounded-[2rem] overflow-hidden shadow-2xl border border-amber-500/30">
                <img
                  src="https://images.unsplash.com/photo-1445116572660-236099ec97a0"
                  alt="Coffee House"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f07] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-amber-50 text-xl md:text-2xl font-black">
                    Coffee. Comfort. Community.
                  </p>

                  <p className="text-amber-200/80 text-xs md:text-sm mt-1">
                    That's what we're all about.
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                Welcome to Coffee House
              </p>

              <h2 className="text-3xl md:text-4xl font-black text-amber-50 leading-tight">
                Crafted With Passion,
                <span className="text-amber-400"> Served With Love.</span>
              </h2>

              <p className="text-amber-100/80 leading-relaxed mt-5 text-sm md:text-base">
                At Coffee House, we're passionate about serving quality coffee
                and delicious food in a warm and welcoming environment. Every
                cup is carefully prepared to deliver a rich and memorable
                experience.
              </p>

              <p className="text-amber-100/80 leading-relaxed mt-3 text-sm md:text-base">
                Whether you're starting your morning, catching up with friends,
                or simply taking a break from a busy day, we want Coffee House
                to feel like your favorite place to relax and enjoy.
              </p>

              {/* Small Features with Vector Icons */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 rounded-xl p-4">
                  <div className="w-8 h-8 bg-amber-500/20 border border-amber-500/30 rounded-lg flex items-center justify-center text-amber-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2 19h18v2H2v-2zm2-7V5h14v7c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4zm16-5h2v3c0 1.1-.9 2-2 2v-5zM6 3h2v1H6V3zm4 0h2v1h-2V3zm4 0h2v1h-2V3z"/>
                    </svg>
                  </div>
                  <p className="text-amber-50 font-bold text-sm mt-3">
                    Premium Coffee
                  </p>
                  <p className="text-amber-200/60 text-xs mt-1">
                    Rich flavors in every cup.
                  </p>
                </div>

                <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 rounded-xl p-4">
                  <div className="w-8 h-8 bg-amber-500/20 border border-amber-500/30 rounded-lg flex items-center justify-center text-amber-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 009-9H3a9 9 0 009 9zM12 3v9" />
                    </svg>
                  </div>
                  <p className="text-amber-50 font-bold text-sm mt-3">
                    Fresh Ingredients
                  </p>
                  <p className="text-amber-200/60 text-xs mt-1">
                    Quality you can taste.
                  </p>
                </div>
              </div>

              <Link
                to="/menu"
                className="inline-flex mt-6 bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-xl font-bold text-xs transition duration-300 shadow-lg shadow-amber-600/30"
              >
                Explore Our Menu →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              Why Choose Us
            </p>

            <h2 className="text-3xl md:text-4xl font-black text-amber-50">
              What Makes Us Special
            </h2>

            <p className="text-amber-100/80 text-sm mt-3">
              We focus on quality, freshness, and creating a welcoming
              experience every time you visit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 rounded-2xl p-6 hover:border-amber-400/60 transition duration-300">
              <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 19h18v2H2v-2zm2-7V5h14v7c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4zm16-5h2v3c0 1.1-.9 2-2 2v-5zM6 3h2v1H6V3zm4 0h2v1h-2V3zm4 0h2v1h-2V3z"/>
                </svg>
              </div>

              <h3 className="text-lg font-bold text-amber-50 mt-4">
                Quality Coffee
              </h3>

              <p className="text-amber-200/70 text-xs leading-relaxed mt-2">
                We carefully prepare every cup using quality coffee to give you
                a rich and satisfying experience.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 rounded-2xl p-6 hover:border-amber-400/60 transition duration-300">
              <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V3m0 5l-4-3m4 3l4-3" />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-amber-50 mt-4">
                Fresh & Delicious
              </h3>

              <p className="text-amber-200/70 text-xs leading-relaxed mt-2">
                From tasty snacks to sweet desserts, our menu is created to
                perfectly complement your favorite drink.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 rounded-2xl p-6 hover:border-amber-400/60 transition duration-300">
              <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>

              <h3 className="text-lg font-bold text-amber-50 mt-4">
                Made With Care
              </h3>

              <p className="text-amber-200/70 text-xs leading-relaxed mt-2">
                We put care into everything we serve, making every visit feel
                comfortable, enjoyable, and memorable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-amber-950/40 border-y border-amber-600/20 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-amber-400">
                100%
              </h3>
              <p className="text-amber-200/70 text-xs mt-1">
                Freshly Prepared
              </p>
            </div>

            <div>
              <h3 className="text-3xl md:text-4xl font-black text-amber-400">
                5+
              </h3>
              <p className="text-amber-200/70 text-xs mt-1">
                Menu Categories
              </p>
            </div>

            <div>
              <h3 className="text-3xl md:text-4xl font-black text-amber-400">
                100+
              </h3>
              <p className="text-amber-200/70 text-xs mt-1">
                Happy Customers
              </p>
            </div>

            <div>
              <div className="inline-flex items-center justify-center w-8 h-8 text-amber-400 mb-1">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <p className="text-amber-200/70 text-xs">
                Endless Coffee Love
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="relative overflow-hidden bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 rounded-3xl px-6 md:px-12 py-12 text-center shadow-2xl border border-amber-400/30">
            <div className="relative z-10 max-w-2xl mx-auto">
              <p className="text-amber-200 text-xs font-bold uppercase tracking-wider">
                Ready for a Coffee?
              </p>

              <h2 className="text-2xl md:text-4xl font-black text-white mt-2">
                Discover Your Next Favorite
              </h2>

              <p className="text-amber-100/90 text-xs md:text-sm mt-3 leading-relaxed">
                Explore our menu and find the perfect coffee, tea, snack, or
                dessert to make your day a little better.
              </p>

              <Link
                to="/menu"
                className="inline-flex mt-6 bg-amber-950 text-amber-300 hover:bg-black font-black px-7 py-3 rounded-xl text-xs transition duration-300 border border-amber-500/40 shadow-lg"
              >
                View Our Menu →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
