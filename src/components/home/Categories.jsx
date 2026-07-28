import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Coffee",
    type: "coffee",
    description: "Freshly brewed coffee crafted from premium beans.",
  },
  {
    id: 2,
    name: "Tea",
    type: "tea",
    description: "Refreshing tea blends for a calm and relaxing moment.",
  },
  {
    id: 3,
    name: "Snack",
    type: "snack",
    description: "Delicious snacks that pair perfectly with your drink.",
  },
  {
    id: 4,
    name: "Dessert",
    type: "dessert",
    description: "Sweet treats to make every coffee break special.",
  },
  {
    id: 5,
    name: "Other",
    type: "other",
    description: "Explore more delicious choices from our menu.",
  },
];

const renderIcon = (type) => {
  switch (type) {
    case "coffee":
      return (
        <svg className="w-7 h-7 text-amber-400 group-hover:text-amber-950 transition" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2 19h18v2H2v-2zm2-7V5h14v7c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4zm16-5h2v3c0 1.1-.9 2-2 2v-5zM6 3h2v1H6V3zm4 0h2v1h-2V3zm4 0h2v1h-2V3z"/>
        </svg>
      );
    case "tea":
      return (
        <svg className="w-7 h-7 text-amber-400 group-hover:text-amber-950 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 009-9H3a9 9 0 009 9zM12 3v9" />
        </svg>
      );
    case "snack":
      return (
        <svg className="w-7 h-7 text-amber-400 group-hover:text-amber-950 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V3m0 5l-4-3m4 3l4-3" />
        </svg>
      );
    case "dessert":
      return (
        <svg className="w-7 h-7 text-amber-400 group-hover:text-amber-950 transition" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      );
    default:
      return (
        <svg className="w-7 h-7 text-amber-400 group-hover:text-amber-950 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
  }
};

const Categories = () => {
  const navigate = useNavigate();

  const handleCategory = () => {
    navigate(`/menu`);
  };

  return (
    <section className="bg-[#120B07] py-16 md:py-20 border-b border-amber-600/30">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            Explore Our Menu
          </p>

          <h2 className="text-3xl md:text-4xl font-black text-amber-50">
            Find Your Favorite
          </h2>

          <p className="text-amber-200/70 mt-3 text-xs md:text-sm leading-relaxed">
            From freshly brewed coffee to delicious snacks and desserts,
            explore something for every taste.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={handleCategory}
              className="group bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 hover:border-amber-400/60 rounded-2xl p-6 text-center cursor-pointer hover:bg-amber-600 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-14 h-14 mx-auto bg-amber-950/80 border border-amber-500/30 rounded-2xl flex items-center justify-center shadow-md group-hover:bg-amber-400 group-hover:border-amber-300 transition-all duration-300"
                >
                  {renderIcon(category.type)}
                </div>

                <h3 className="text-base font-bold text-amber-50 mt-4 group-hover:text-amber-950 transition">
                  {category.name}
                </h3>

                <p className="text-amber-200/60 text-xs leading-relaxed mt-2 group-hover:text-amber-900 transition">
                  {category.description}
                </p>
              </div>

              <div className="mt-4 text-amber-400 text-xs font-bold group-hover:text-amber-950 group-hover:translate-x-1 transition-all">
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
