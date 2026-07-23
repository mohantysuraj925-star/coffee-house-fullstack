import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminCart = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCarts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${BASE_URL}/cart/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setCarts(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch cart details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 md:p-10 text-white">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/admin/dashboard/")}
          className="mb-6 flex items-center gap-2 text-[#94A3B8] hover:text-[#38BDF8] font-semibold transition cursor-pointer"
        >
          <span className="text-xl">←</span>
          Back to Dashboard
        </button>

        <div className="mb-8">
          <p className="text-[#38BDF8] text-sm font-semibold uppercase tracking-wider mb-2">
            Coffee House Admin
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Cart Management
          </h1>

          <p className="text-[#94A3B8] mt-2">
            View customer items currently in cart.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/60 text-red-300 border border-red-800 rounded-xl">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-slate-700 border-t-[#38BDF8] rounded-full animate-spin mx-auto" />
            <p className="text-[#94A3B8] mt-4">Loading cart items...</p>
          </div>
        ) : carts.length === 0 ? (
          <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-12 text-center">
            <p className="text-[#94A3B8]">No items found in cart.</p>
          </div>
        ) : (
          <div className="bg-[#1E293B] border border-slate-700 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[#38BDF8] text-sm uppercase">
                    <th className="p-4">Item</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-sm">
                  {carts.map((item) => (
                    <tr key={item.id} className="hover:bg-[#0F172A]/50 transition">
                      <td className="p-4 font-semibold text-white">{item.menu_name}</td>
                      <td className="p-4 text-[#94A3B8]">{item.menu_category}</td>
                      <td className="p-4 text-[#38BDF8] font-bold">₹{item.menu_price}</td>
                      <td className="p-4 text-white font-bold">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCart;
