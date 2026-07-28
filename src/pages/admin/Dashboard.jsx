import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/common/Logo";

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Admin";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col">
      {/* Clean Single Admin Top Header */}
      <header className="bg-[#111827] border-b border-amber-500/20 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Logo />
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Administrator</p>
            <p className="text-sm font-semibold text-white">{username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Manage your Coffee House users, menu, and carts from one place.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-amber-500/50 transition duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 text-xl font-bold mb-4">
              👥
            </div>
            <h3 className="text-lg font-bold text-white">Users</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">View and manage all registered Coffee House users.</p>
            <Link to="/admin/users" className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 hover:text-amber-400 transition">
              Manage Users &rarr;
            </Link>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-amber-500/50 transition duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 text-xl font-bold mb-4">
              ☕
            </div>
            <h3 className="text-lg font-bold text-white">Menu</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">Add, update and manage your Coffee House menu items.</p>
            <Link to="/admin/menu" className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 hover:text-amber-400 transition">
              Manage Menu &rarr;
            </Link>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-amber-500/50 transition duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 text-xl font-bold mb-4">
              🛒
            </div>
            <h3 className="text-lg font-bold text-white">Carts</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">View user carts and pending order selections.</p>
            <Link to="/admin/carts" className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 hover:text-amber-400 transition">
              Manage Carts &rarr;
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
