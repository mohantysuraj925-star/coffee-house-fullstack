import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-80px)] bg-[#0F172A] overflow-hidden flex items-center">
      {/* Decorative Circle */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0284C7]/10 rounded-full" />
      <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-[#2563EB]/10 rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            {/* Small Tag */}
            <div className="inline-flex items-center gap-2 bg-[#1E293B] text-[#38BDF8] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span>☕</span>
              Freshly Brewed, Just for You
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
              Start Your Day
              <span className="block text-[#38BDF8]">
                With Great Coffee.
              </span>
            </h1>

            {/* Description */}
            <p className="text-[#94A3B8] text-lg leading-relaxed mt-6 max-w-xl">
              Discover the perfect blend of rich flavors, fresh ingredients,
              and warm moments. From handcrafted coffee to delicious snacks,
              there's something here for everyone.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link
                to="/menu"
                className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-7 py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                Explore Our Menu →
              </Link>

              <Link
                to="/about"
                className="border-2 border-white text-white hover:bg-white hover:text-[#0F172A] px-7 py-3 rounded-xl font-semibold transition-all"
              >
                About Us
              </Link>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-[#1E293B]">
              <div>
                <p className="text-white font-bold text-lg">
                  Fresh
                </p>
                <p className="text-[#94A3B8] text-sm">
                  Quality Ingredients
                </p>
              </div>

              <div className="w-px bg-[#1E293B]" />

              <div>
                <p className="text-white font-bold text-lg">
                  Premium
                </p>
                <p className="text-[#94A3B8] text-sm">
                  Coffee Beans
                </p>
              </div>

              <div className="w-px bg-[#1E293B]" />

              <div>
                <p className="text-white font-bold text-lg">
                  Made With
                </p>
                <p className="text-[#94A3B8] text-sm">
                  Love & Care
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Background Shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#1E293B] rounded-[3rem] rotate-3" />

            {/* Image */}
            <div className="relative w-full max-w-lg h-[520px] rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
                alt="Fresh Coffee"
                className="w-full h-full object-cover"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />

              {/* Floating Content */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#1E293B]/90 backdrop-blur-md p-5 rounded-2xl border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#38BDF8] text-sm font-semibold">
                      Today's Special
                    </p>

                    <h3 className="text-white text-xl font-bold mt-1">
                      Freshly Brewed Coffee
                    </h3>
                  </div>

                  <div className="w-12 h-12 bg-[#0284C7] text-white rounded-full flex items-center justify-center text-xl">
                    ☕
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-5 -right-3 bg-[#2563EB] text-white px-5 py-3 rounded-xl shadow-lg rotate-3">
              <p className="font-semibold text-sm">
                Better Taste
              </p>
              <p className="text-xs opacity-80">
                Better Life
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
