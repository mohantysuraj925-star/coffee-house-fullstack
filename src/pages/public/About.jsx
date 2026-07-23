import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-[#0F172A]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#0284C7]/10 rounded-full" />
        <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] bg-[#2563EB]/10 rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#38BDF8] text-sm font-semibold uppercase tracking-wider mb-4">
              Our Story
            </p>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              More Than Just
              <span className="text-[#38BDF8]"> Coffee</span>
            </h1>

            <p className="text-[#94A3B8] text-lg leading-relaxed mt-6">
              Coffee House is a place where great taste meets warm moments.
              We believe every cup of coffee has the power to bring people
              together and make everyday moments a little more special.
            </p>
          </div>
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="bg-[#1E293B] py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Image */}
            <div className="relative">
              <div className="absolute -top-5 -left-5 w-full h-full bg-[#0284C7] rounded-[2rem]" />

              <div className="relative h-[450px] md:h-[520px] rounded-[2rem] overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1445116572660-236099ec97a0"
                  alt="Coffee House"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6">
                  <p className="text-white text-2xl font-bold">
                    Coffee. Comfort. Community.
                  </p>

                  <p className="text-white/80 mt-1">
                    That's what we're all about.
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-[#38BDF8] text-sm font-semibold uppercase tracking-wider mb-3">
                Welcome to Coffee House
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Crafted With Passion,
                <span className="text-[#38BDF8]"> Served With Love.</span>
              </h2>

              <p className="text-[#94A3B8] leading-relaxed mt-6">
                At Coffee House, we're passionate about serving quality coffee
                and delicious food in a warm and welcoming environment. Every
                cup is carefully prepared to deliver a rich and memorable
                experience.
              </p>

              <p className="text-[#94A3B8] leading-relaxed mt-4">
                Whether you're starting your morning, catching up with friends,
                or simply taking a break from a busy day, we want Coffee House
                to feel like your favorite place to relax and enjoy.
              </p>

              {/* Small Features */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-[#0F172A] border border-slate-700 rounded-xl p-4">
                  <span className="text-2xl">☕</span>
                  <p className="text-white font-bold mt-2">
                    Premium Coffee
                  </p>
                  <p className="text-[#94A3B8] text-sm mt-1">
                    Rich flavors in every cup.
                  </p>
                </div>

                <div className="bg-[#0F172A] border border-slate-700 rounded-xl p-4">
                  <span className="text-2xl">🌿</span>
                  <p className="text-white font-bold mt-2">
                    Fresh Ingredients
                  </p>
                  <p className="text-[#94A3B8] text-sm mt-1">
                    Quality you can taste.
                  </p>
                </div>
              </div>

              <Link
                to="/menu"
                className="inline-flex mt-8 bg-[#0284C7] hover:bg-[#0369A1] text-white px-7 py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                Explore Our Menu →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[#38BDF8] text-sm font-semibold uppercase tracking-wider mb-3">
              Why Choose Us
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-white">
              What Makes Us Special
            </h2>

            <p className="text-[#94A3B8] mt-4">
              We focus on quality, freshness, and creating a welcoming
              experience every time you visit.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-7 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-[#0F172A] rounded-xl flex items-center justify-center text-2xl">
                ☕
              </div>

              <h3 className="text-xl font-bold text-white mt-5">
                Quality Coffee
              </h3>

              <p className="text-[#94A3B8] text-sm leading-relaxed mt-3">
                We carefully prepare every cup using quality coffee to give you
                a rich and satisfying experience.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-7 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-[#0F172A] rounded-xl flex items-center justify-center text-2xl">
                🍰
              </div>

              <h3 className="text-xl font-bold text-white mt-5">
                Fresh & Delicious
              </h3>

              <p className="text-[#94A3B8] text-sm leading-relaxed mt-3">
                From tasty snacks to sweet desserts, our menu is created to
                perfectly complement your favorite drink.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-7 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-[#0F172A] rounded-xl flex items-center justify-center text-2xl">
                ❤️
              </div>

              <h3 className="text-xl font-bold text-white mt-5">
                Made With Care
              </h3>

              <p className="text-[#94A3B8] text-sm leading-relaxed mt-3">
                We put care into everything we serve, making every visit feel
                comfortable, enjoyable, and memorable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-[#1E293B] border-y border-slate-800 py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#38BDF8]">
                100%
              </h3>
              <p className="text-[#94A3B8] text-sm mt-2">
                Freshly Prepared
              </p>
            </div>

            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#38BDF8]">
                5+
              </h3>
              <p className="text-[#94A3B8] text-sm mt-2">
                Menu Categories
              </p>
            </div>

            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#38BDF8]">
                100+
              </h3>
              <p className="text-[#94A3B8] text-sm mt-2">
                Happy Customers
              </p>
            </div>

            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#38BDF8]">
                ☕
              </h3>
              <p className="text-[#94A3B8] text-sm mt-2">
                Endless Coffee Love
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#0F172A] py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="relative overflow-hidden bg-[#0284C7] rounded-3xl px-6 md:px-12 py-14 text-center">
            {/* Decorations */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/5 rounded-full" />
            <div className="absolute -bottom-24 -right-20 w-72 h-72 bg-[#2563EB]/20 rounded-full" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <p className="text-[#E0F2FE] text-sm font-semibold uppercase tracking-wider">
                Ready for a Coffee?
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
                Discover Your Next Favorite
              </h2>

              <p className="text-white/80 mt-4 leading-relaxed">
                Explore our menu and find the perfect coffee, tea, snack, or
                dessert to make your day a little better.
              </p>

              <Link
                to="/menu"
                className="inline-flex mt-7 bg-[#0F172A] hover:bg-[#1E293B] text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-1"
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
