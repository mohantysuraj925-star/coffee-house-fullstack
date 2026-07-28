import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1a0f07] text-amber-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between flex-wrap gap-4 border-b border-amber-600/30 pb-6">
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
              Control Panel
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-amber-50 mt-1">
              Admin Dashboard
            </h1>
            <p className="text-amber-200/70 text-sm mt-1">
              Manage your Coffee House users, menu, and orders from one place.
            </p>
          </div>

          <span className="bg-amber-950/80 border border-amber-500/40 text-amber-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
            🛡️ Administrator Mode
          </span>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Users Card */}
          <div
            onClick={() => navigate("/admin/users/")}
            className="group bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 rounded-2xl p-7 cursor-pointer hover:border-amber-400/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 bg-amber-950 text-amber-400 rounded-xl flex items-center justify-center border border-amber-500/30">
                <span className="text-2xl">👥</span>
              </div>

              <span className="w-9 h-9 rounded-full bg-amber-950 flex items-center justify-center text-amber-300 group-hover:bg-amber-600 group-hover:text-white transition-all border border-amber-500/30">
                →
              </span>
            </div>

            <div className="mt-7">
              <h2 className="text-2xl font-bold text-amber-50">Users</h2>

              <p className="text-amber-200/70 text-sm mt-2 leading-relaxed">
                View, modify permissions, and manage all registered Coffee House users.
              </p>

              <button className="mt-6 text-amber-400 font-bold text-xs cursor-pointer group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Manage Users →
              </button>
            </div>
          </div>

          {/* Menu Card */}
          <div
            onClick={() => navigate("/admin/menu/")}
            className="group bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 rounded-2xl p-7 cursor-pointer hover:border-amber-400/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 bg-amber-950 text-amber-400 rounded-xl flex items-center justify-center border border-amber-500/30">
                <span className="text-2xl">☕</span>
              </div>

              <span className="w-9 h-9 rounded-full bg-amber-950 flex items-center justify-center text-amber-300 group-hover:bg-amber-600 group-hover:text-white transition-all border border-amber-500/30">
                →
              </span>
            </div>

            <div className="mt-7">
              <h2 className="text-2xl font-bold text-amber-50">Menu</h2>

              <p className="text-amber-200/70 text-sm mt-2 leading-relaxed">
                Add new items (Pizza, Burgers, Coffee), update prices, images & categories.
              </p>

              <button className="mt-6 text-amber-400 font-bold text-xs cursor-pointer group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Manage Menu →
              </button>
            </div>
          </div>

          {/* Cart Card */}
          <div
            onClick={() => navigate("/admin/cart/")}
            className="group bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 rounded-2xl p-7 cursor-pointer hover:border-amber-400/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 bg-amber-950 text-amber-400 rounded-xl flex items-center justify-center border border-amber-500/30">
                <span className="text-2xl">🛒</span>
              </div>

              <span className="w-9 h-9 rounded-full bg-amber-950 flex items-center justify-center text-amber-300 group-hover:bg-amber-600 group-hover:text-white transition-all border border-amber-500/30">
                →
              </span>
            </div>

            <div className="mt-7">
              <h2 className="text-2xl font-bold text-amber-50">Carts & Orders</h2>

              <p className="text-amber-200/70 text-sm mt-2 leading-relaxed">
                Track active customer carts, live orders, and table service requests.
              </p>

              <button className="mt-6 text-amber-400 font-bold text-xs cursor-pointer group-hover:translate-x-1 transition-transform flex items-center gap-1">
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
