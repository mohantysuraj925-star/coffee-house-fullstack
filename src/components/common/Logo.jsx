import React from "react";
import { Link } from "react-router-dom";
import { FiCoffee } from "react-icons/fi";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 group select-none">
      <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-900/40 group-hover:scale-105 transition duration-300">
        <div className="w-full h-full bg-[#120B07] rounded-[14px] flex items-center justify-center text-amber-400 text-xl">
          <FiCoffee />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-base md:text-lg font-black tracking-tight text-amber-50 group-hover:text-amber-300 transition">
          COFFEE <span className="text-amber-500">HOUSE</span>
        </span>
        <span className="text-[9px] text-amber-400/70 tracking-widest font-bold uppercase -mt-1">
          Brewed Fresh
        </span>
      </div>
    </Link>
  );
};

export default Logo;
