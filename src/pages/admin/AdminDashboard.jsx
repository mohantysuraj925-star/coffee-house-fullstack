import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Top Navbar */}
      <div className="bg-[#1E293B] border-b-4 border-[#0284C7]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              onClick={() => navigate("/")}
              src={logo}
              alt="Coffee House"
              className="w-20 h-20 object-contain cursor-pointer"
            />

            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Coffee House
              </h1>
              <p className="text-[#38BDF8] text-sm">Admin Panel</p>
            </div>
          </div>

          <span className="hidden md:inline-flex bg-[#0284C7] text-white px-4 py-2 rounded-full text-sm font-medium">
            Administrator
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[#38BDF8] text-sm font-semibold uppercase tracking-wider mb-2">
            Overview
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Admin Dashboard
          </h1>

          <p className="text-[#94A3B8] mt-2">
            Manage your Coffee House users, menu, and carts from one place.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Users Card */}
          <div
            onClick={() => navigate("/admin/users/")}
            className="group bg-[#1E293B] border border-slate-700 rounded-2xl p-7
                       cursor-pointer hover:border-[#0284C7]
                       hover:shadow-xl hover:-translate-y-1
                       transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 bg-[#0F172A] text-[#38BDF8] rounded-xl flex items-center justify-center border border-slate-700">
                <span className="text-2xl">👥</span>
              </div>

              <span className="w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center text-white group-hover:bg-[#0284C7] transition-all border border-slate-700">
                →
              </span>
            </div>

            <div className="mt-7">
              <h2 className="text-2xl font-bold text-white">Users</h2>

              <p className="text-[#94A3B8] text-sm mt-2 leading-relaxed">
                View and manage all registered Coffee House users.
              </p>

              <button className="mt-6 text-[#38BDF8] font-semibold cursor-pointer group-hover:translate-x-1 transition-transform">
                Manage Users →
              </button>
            </div>
          </div>

          {/* Menu Card */}
          <div
            onClick={() => navigate("/admin/menu/")}
            className="group bg-[#1E293B] border border-slate-700 rounded-2xl p-7
                       cursor-pointer hover:border-[#0284C7]
                       hover:shadow-xl hover:-translate-y-1
                       transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 bg-[#0F172A] text-[#38BDF8] rounded-xl flex items-center justify-center border border-slate-700">
                <span className="text-2xl">☕</span>
              </div>

              <span className="w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center text-white group-hover:bg-[#0284C7] transition-all border border-slate-700">
                →
              </span>
            </div>

            <div className="mt-7">
              <h2 className="text-2xl font-bold text-white">Menu</h2>

              <p className="text-[#94A3B8] text-sm mt-2 leading-relaxed">
                Add, update and manage your Coffee House menu items.
              </p>

              <button className="mt-6 text-[#38BDF8] font-semibold cursor-pointer group-hover:translate-x-1 transition-transform">
                Manage Menu →
              </button>
            </div>
          </div>

          {/* Cart Card */}
          <div
            onClick={() => navigate("/admin/cart/")}
            className="group bg-[#1E293B] border border-slate-700 rounded-2xl p-7
                       cursor-pointer hover:border-[#0284C7]
                       hover:shadow-xl hover:-translate-y-1
                       transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 bg-[#0F172A] text-[#38BDF8] rounded-xl flex items-center justify-center border border-slate-700">
                <span className="text-2xl">🛒</span>
              </div>

              <span className="w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center text-white group-hover:bg-[#0284C7] transition-all border border-slate-700">
                →
              </span>
            </div>

            <div className="mt-7">
              <h2 className="text-2xl font-bold text-white">Carts</h2>

              <p className="text-[#94A3B8] text-sm mt-2 leading-relaxed">
                View user carts and pending order selections.
              </p>

              <button className="mt-6 text-[#38BDF8] font-semibold cursor-pointer group-hover:translate-x-1 transition-transform">
                Manage Carts →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
