import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminUser = () => {
  const BASE_URL = "https://coffeehouse-backend-xtle.onrender.com";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userStatusMap, setUserStatusMap] = useState({});

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${BASE_URL}/users/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const data = Array.isArray(response.data) ? response.data : response.data.results || [];
      setUsers(data);

      // Default Status Sync
      const initialStatus = {};
      data.forEach(u => {
        initialStatus[u.id] = u.is_active !== false ? "Active" : "Frozen";
      });
      setUserStatusMap(initialStatus);

    } catch (error) {
      console.error(error);
      setError("Failed to fetch registered users from backend API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleUserStatus = (userId) => {
    setUserStatusMap(prev => ({
      ...prev,
      [userId]: prev[userId] === "Active" ? "Frozen" : "Active"
    }));
  };

  const filteredUsers = users.filter(u => {
    const matchesQuery = 
      (u.username || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(u.id).includes(searchQuery);
    
    if (roleFilter === "admin") return matchesQuery && (u.is_staff || u.is_superuser);
    if (roleFilter === "customer") return matchesQuery && !(u.is_staff || u.is_superuser);
    return matchesQuery;
  });

  const totalUsers = users.length;
  const adminCount = users.filter(u => u.is_staff || u.is_superuser).length;

  return (
    <div className="min-h-screen bg-[#1a0f07] text-amber-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-amber-600/30 pb-6">
          <div>
            <button
              onClick={() => navigate("/admin/dashboard/")}
              className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold text-xs transition cursor-pointer mb-2"
            >
              ← Back to Control Center
            </button>
            <h1 className="text-3xl md:text-4xl font-black text-amber-50">
              User Intelligence & Access Control
            </h1>
            <p className="text-amber-200/70 text-xs md:text-sm mt-1">
              AI-monitored user roster, access permissions, and account safety controls.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex gap-3">
            <div className="bg-amber-950/80 border border-amber-600/30 px-4 py-2 rounded-2xl text-center">
              <p className="text-[10px] text-amber-200/60 uppercase font-bold">Total Accounts</p>
              <p className="text-lg font-black text-amber-400">{totalUsers}</p>
            </div>
            <div className="bg-amber-950/80 border border-amber-600/30 px-4 py-2 rounded-2xl text-center">
              <p className="text-[10px] text-amber-200/60 uppercase font-bold">Admins</p>
              <p className="text-lg font-black text-amber-400">{adminCount}</p>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-gradient-to-b from-amber-950/80 to-amber-900/40 border border-amber-600/30 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search user ID, handle, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-amber-950/90 border border-amber-600/30 text-amber-50 px-4 py-2 rounded-xl text-xs outline-none focus:border-amber-400 placeholder:text-amber-200/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-amber-200/60 font-bold">Role:</span>
            <div className="flex bg-amber-950 border border-amber-600/30 rounded-xl p-1">
              <button
                onClick={() => setRoleFilter("all")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  roleFilter === "all" ? "bg-amber-600 text-white" : "text-amber-200/70 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setRoleFilter("customer")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  roleFilter === "customer" ? "bg-amber-600 text-white" : "text-amber-200/70 hover:text-white"
                }`}
              >
                Customers
              </button>
              <button
                onClick={() => setRoleFilter("admin")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  roleFilter === "admin" ? "bg-amber-600 text-white" : "text-amber-200/70 hover:text-white"
                }`}
              >
                Admins
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-950/80 text-red-300 border border-red-600/40 rounded-2xl text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Users Table / List */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-amber-600/30 border-t-amber-400 rounded-full animate-spin mx-auto" />
            <p className="text-amber-200/60 text-xs font-bold">Scanning User Roster...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 rounded-3xl p-12 text-center">
            <p className="text-amber-200/60 text-xs">No matching user records found.</p>
          </div>
        ) : (
          <div className="bg-gradient-to-b from-amber-950/80 to-amber-900/40 border border-amber-600/30 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-amber-600/30 bg-amber-950/90 text-amber-400 text-[11px] font-bold uppercase tracking-wider">
                    <th className="p-4">User Details</th>
                    <th className="p-4">Role Badge</th>
                    <th className="p-4">Risk & Status</th>
                    <th className="p-4 text-right">Security Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-600/20 text-xs">
                  {filteredUsers.map((u) => {
                    const isAdmin = u.is_staff || u.is_superuser;
                    const status = userStatusMap[u.id] || "Active";

                    return (
                      <tr key={u.id} className="hover:bg-amber-900/20 transition">
                        {/* User Details */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-amber-950 border border-amber-500/40 rounded-xl flex items-center justify-center font-black text-amber-300 text-sm">
                              {(u.username || "U")[0].toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-amber-50 text-sm flex items-center gap-2">
                                {u.username}
                                <span className="text-[10px] text-amber-200/40 font-mono">#{u.id}</span>
                              </p>
                              <p className="text-amber-200/60 text-[11px]">{u.email || "No email linked"}</p>
                            </div>
                          </div>
                        </td>

                        {/* Role Badge */}
                        <td className="p-4">
                          {isAdmin ? (
                            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest inline-flex items-center gap-1">
                              🛡️ Administrator
                            </span>
                          ) : (
                            <span className="bg-amber-950 text-amber-200/70 border border-amber-600/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                              ☕ Customer
                            </span>
                          )}
                        </td>

                        {/* Status Toggle */}
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase inline-flex items-center gap-1 ${
                              status === "Active"
                                ? "bg-green-950/80 text-green-400 border border-green-500/30"
                                : "bg-red-950/80 text-red-400 border border-red-500/30"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${status === "Active" ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
                            {status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => toggleUserStatus(u.id)}
                              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition cursor-pointer border ${
                                status === "Active"
                                  ? "bg-red-950/60 text-red-300 border-red-600/30 hover:bg-red-900/80"
                                  : "bg-green-950/60 text-green-300 border-green-600/30 hover:bg-green-900/80"
                              }`}
                            >
                              {status === "Active" ? "Freeze Account" : "Unfreeze"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedUser(u)}
                              className="bg-amber-600/20 border border-amber-500/40 text-amber-300 hover:bg-amber-600 hover:text-white px-3 py-1.5 rounded-xl text-[10px] font-bold transition cursor-pointer"
                            >
                              Inspect 🔍
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* User Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-[#180E0A] border border-amber-600/40 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
              <div className="flex justify-between items-center border-b border-amber-600/30 pb-3">
                <h3 className="text-sm font-black text-amber-50">User Profile Analytics</h3>
                <button onClick={() => setSelectedUser(null)} className="text-amber-400 hover:text-white font-bold text-xs">
                  ✕ Close
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between bg-amber-950/80 p-2.5 rounded-xl border border-amber-600/20">
                  <span className="text-amber-200/60">Account Handle</span>
                  <span className="font-bold text-amber-50">{selectedUser.username}</span>
                </div>
                <div className="flex justify-between bg-amber-950/80 p-2.5 rounded-xl border border-amber-600/20">
                  <span className="text-amber-200/60">Email Address</span>
                  <span className="font-bold text-amber-50">{selectedUser.email || "N/A"}</span>
                </div>
                <div className="flex justify-between bg-amber-950/80 p-2.5 rounded-xl border border-amber-600/20">
                  <span className="text-amber-200/60">System Role</span>
                  <span className="font-bold text-amber-400">{selectedUser.is_staff ? "System Admin" : "Standard Customer"}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedUser(null)}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-lg"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminUser;
