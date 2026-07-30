import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#120a04] text-amber-50 py-10 px-4 md:px-8 font-sans relative overflow-hidden">
      
      {/* Background Lighting Glow Effects */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />

      <main className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Header with Go To Home Button */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-b-2 border-amber-600/30 pb-6 backdrop-blur-sm">
          <div className="space-y-1">
            <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent text-xs font-black uppercase tracking-widest block">
              ✨ Premium Studio Workspace
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-amber-50 tracking-tight drop-shadow-md">
              Coffee House Dashboard
            </h1>
          </div>

          {/* Glowing Go To Home Button */}
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-white font-black px-6 py-3.5 rounded-2xl text-xs md:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-600/40 hover:shadow-amber-500/60 hover:scale-105 cursor-pointer flex items-center gap-2.5 border border-amber-400/50"
          >
            <span className="text-lg">🏠</span>
            <span>Go To Home Page</span>
          </button>
        </div>

        {/* Illuminated Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Menu Management */}
          <div
            onClick={() => navigate("/admin/menu")}
            className="group relative bg-gradient-to-b from-amber-950/70 via-amber-900/30 to-[#180d05] border-2 border-amber-500/40 hover:border-amber-400 rounded-3xl p-8 cursor-pointer shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2 transition-all duration-300 space-y-5 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition" />
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500/30 to-amber-950 rounded-2xl flex items-center justify-center border-2 border-amber-400/50 text-3xl shadow-lg shadow-amber-500/20 group-hover:scale-110 transition">
              ☕
            </div>
            <div>
              <h2 className="text-2xl font-black text-amber-50 group-hover:text-amber-300 transition">
                Menu Management
              </h2>
              <p className="text-amber-200/70 text-xs mt-2 leading-relaxed font-bold">
                Add, edit prices, or permanently manage catalog dishes with instant sync.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-2 text-xs font-black text-amber-400 group-hover:translate-x-1 transition">
              <span>Open Catalog Studio</span>
              <span>→</span>
            </div>
          </div>

          {/* User Management */}
          <div
            onClick={() => navigate("/admin/users")}
            className="group relative bg-gradient-to-b from-amber-950/70 via-amber-900/30 to-[#180d05] border-2 border-amber-500/40 hover:border-amber-400 rounded-3xl p-8 cursor-pointer shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2 transition-all duration-300 space-y-5 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition" />
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500/30 to-amber-950 rounded-2xl flex items-center justify-center border-2 border-amber-400/50 text-3xl shadow-lg shadow-amber-500/20 group-hover:scale-110 transition">
              👥
            </div>
            <div>
              <h2 className="text-2xl font-black text-amber-50 group-hover:text-amber-300 transition">
                User Management
              </h2>
              <p className="text-amber-200/70 text-xs mt-2 leading-relaxed font-bold">
                View registered members, check account roles, and maintain user profiles.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-2 text-xs font-black text-amber-400 group-hover:translate-x-1 transition">
              <span>Manage User List</span>
              <span>→</span>
            </div>
          </div>

          {/* Order & Cart Management */}
          <div
            onClick={() => navigate("/admin/cart")}
            className="group relative bg-gradient-to-b from-amber-950/70 via-amber-900/30 to-[#180d05] border-2 border-amber-500/40 hover:border-amber-400 rounded-3xl p-8 cursor-pointer shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2 transition-all duration-300 space-y-5 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition" />
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500/30 to-amber-950 rounded-2xl flex items-center justify-center border-2 border-amber-400/50 text-3xl shadow-lg shadow-amber-500/20 group-hover:scale-110 transition">
              🛒
            </div>
            <div>
              <h2 className="text-2xl font-black text-amber-50 group-hover:text-amber-300 transition">
                Cart & Orders
              </h2>
              <p className="text-amber-200/70 text-xs mt-2 leading-relaxed font-bold">
                Track live customer orders, table checkouts, and active billing totals.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-2 text-xs font-black text-amber-400 group-hover:translate-x-1 transition">
              <span>Manage Active Orders</span>
              <span>→</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
