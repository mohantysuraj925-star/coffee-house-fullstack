import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Coffee",
    icon: "☕",
    description: "Freshly brewed coffee crafted from premium beans.",
  },
  {
    id: 2,
    name: "Tea",
    icon: "🍵",
    description: "Refreshing tea blends for a calm and relaxing moment.",
  },
  {
    id: 3,
    name: "Snack",
    icon: "🥪",
    description: "Delicious snacks that pair perfectly with your drink.",
  },
  {
    id: 4,
    name: "Dessert",
    icon: "🍰",
    description: "Sweet treats to make every coffee break special.",
  },
  {
    id: 5,
    name: "Other",
    icon: "🥤",
    description: "Explore more delicious choices from our menu.",
  },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategory = (category) => {
    navigate(`/menu`);
  };

  return (
    <section className="bg-[#1E293B] py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[#38BDF8] text-sm font-semibold uppercase tracking-wider mb-3">
            Explore Our Menu
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Find Your Favorite
          </h2>

          <p className="text-[#94A3B8] mt-4 leading-relaxed">
            From freshly brewed coffee to delicious snacks and desserts,
            explore something for every taste.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategory(category.name)}
              className="group bg-[#0F172A] border border-slate-700 rounded-2xl p-6 text-center cursor-pointer
                         hover:bg-[#0284C7] hover:-translate-y-2 hover:shadow-xl
                         transition-all duration-300"
            >
              {/* Icon */}
              <div
                className="w-16 h-16 mx-auto bg-[#1E293B] rounded-full flex items-center justify-center
                           text-3xl shadow-sm group-hover:bg-white
                           transition-all duration-300"
              >
                {category.icon}
              </div>

              {/* Name */}
              <h3
                className="text-xl font-bold text-white mt-5
                           group-hover:text-white transition"
              >
                {category.name}
              </h3>

              {/* Description */}
              <p
                className="text-[#94A3B8] text-sm leading-relaxed mt-2
                           group-hover:text-slate-100 transition"
              >
                {category.description}
              </p>

              {/* Arrow */}
              <div
                className="mt-5 text-[#38BDF8] font-semibold group-hover:text-white
                           group-hover:translate-x-1 transition-transform"
              >
                Explore →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
