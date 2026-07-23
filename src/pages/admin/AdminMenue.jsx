import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DEFAULT_PLACEHOLDER = "https://images.unsplash.com/photo-1572442388796-11668ba67e53?auto=format&fit=crop&w=600&q=80";

const AdminMenue = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const initialFormData = {
    name: "",
    category: "Coffee",
    description: "",
    price: "",
    image: "",
    is_available: true,
  };

  const [menus, setMenus] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchMenus = async () => {
    try {
      setFetching(true);
      setError("");

      const response = await axios.get(`${BASE_URL}/menu/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setMenus(response.data);
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("Failed to fetch menu items.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddMenu = () => {
    setEditingId(null);
    setFormData(initialFormData);
    setError("");
    setMessage("");
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setMessage("");

      if (editingId) {
        await axios.put(`${BASE_URL}/menu-detail/${editingId}/`, formData, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        setMessage("Menu item updated successfully.");
      } else {
        await axios.post(`${BASE_URL}/menu/`, formData, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        setMessage("Menu item added successfully.");
      }

      setFormData(initialFormData);
      setEditingId(null);
      setShowForm(false);

      await fetchMenus();
    } catch (error) {
      console.error("Submit Error:", error);
      setError(
        error.response?.data?.message ||
          error.response?.data?.detail ||
          "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (menu) => {
    setEditingId(menu.id);

    setFormData({
      name: menu.name || "",
      category: menu.category || "Coffee",
      description: menu.description || "",
      price: menu.price || "",
      image: menu.image || "",
      is_available: menu.is_available,
    });

    setMessage("");
    setError("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?",
    );

    if (!confirmDelete) return;

    try {
      setError("");
      setMessage("");

      await axios.delete(`${BASE_URL}/menu-detail/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setMenus((prev) => prev.filter((menu) => menu.id !== id));

      setMessage("Menu item deleted successfully.");

      if (editingId === id) {
        setEditingId(null);
        setFormData(initialFormData);
        setShowForm(false);
      }
    } catch (error) {
      console.error("Delete Error:", error);

      setError(
        error.response?.data?.message ||
          error.response?.data?.detail ||
          "Failed to delete menu item.",
      );
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData(initialFormData);
    setError("");
    setShowForm(false);
  };

  // Safe Image Formatter
  const formatImageUrl = (url) => {
    if (!url || typeof url !== "string" || !url.trim()) return DEFAULT_PLACEHOLDER;
    const cleanUrl = url.trim();
    if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) return cleanUrl;
    return `${BASE_URL}${cleanUrl.startsWith("/") ? "" : "/"}${cleanUrl}`;
  };

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 md:p-10 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/dashboard/")}
            className="mb-6 flex items-center gap-2 text-[#94A3B8] hover:text-[#38BDF8] font-semibold transition cursor-pointer"
          >
            <span className="text-xl">←</span>
            Back to Dashboard
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <p className="text-[#38BDF8] text-sm font-semibold uppercase tracking-wider mb-2">
                Coffee House Admin
              </p>

              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Menu Management
              </h1>

              <p className="text-[#94A3B8] mt-2">
                Create, update and manage your Coffee House menu.
              </p>
            </div>

            <button
              onClick={handleAddMenu}
              className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-6 py-3 rounded-xl font-semibold cursor-pointer transition flex items-center justify-center gap-2 shadow-sm"
            >
              <span className="text-xl">+</span>
              Add Menu Item
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-emerald-950/60 text-emerald-300 border border-emerald-800 rounded-xl">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-950/60 text-red-300 border border-red-800 rounded-xl">
            {error}
          </div>
        )}

        {showForm && (
          <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
            <div className="flex items-center justify-between mb-7">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {editingId ? "Update Menu Item" : "Add New Menu Item"}
                </h2>

                <p className="text-sm text-[#94A3B8] mt-1">
                  {editingId
                    ? "Update the details of your menu item."
                    : "Enter the details to add a new item to your menu."}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCancel}
                className="w-10 h-10 rounded-full bg-[#0F172A] text-white hover:bg-red-600 transition cursor-pointer flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Menu Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Cappuccino"
                    required
                    className="w-full px-4 py-3 bg-[#0F172A] border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#0284C7]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#0F172A] border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#0284C7]"
                  >
                    <option value="Coffee">Coffee</option>
                    <option value="Tea">Tea</option>
                    <option value="Snack">Snack</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 120.00"
                    min="0"
                    step="0.01"
                    required
                    className="w-full px-4 py-3 bg-[#0F172A] border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#0284C7]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Image URL
                  </label>

                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 bg-[#0F172A] border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#0284C7]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-white mb-2">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter menu item description"
                    rows="4"
                    className="w-full px-4 py-3 bg-[#0F172A] border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#0284C7] resize-none"
                  />
                </div>

                {formData.image && (
                  <div className="md:col-span-2">
                    <p className="text-sm font-semibold text-white mb-2">
                      Image Preview
                    </p>

                    <img
                      src={formatImageUrl(formData.image)}
                      alt="Menu Preview"
                      referrerPolicy="no-referrer"
                      className="w-32 h-32 object-cover rounded-xl border border-slate-700"
                    />
                  </div>
                )}

                <div className="md:col-span-2 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_available"
                    name="is_available"
                    checked={formData.is_available}
                    onChange={handleChange}
                    className="w-5 h-5 accent-[#0284C7]"
                  />
                  <label htmlFor="is_available" className="text-white font-semibold cursor-pointer">
                    Available for Order
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2.5 rounded-xl border border-slate-700 text-[#94A3B8] hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold transition"
                >
                  {loading ? "Saving..." : editingId ? "Update Item" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= LIST ================= */}
        {fetching ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-slate-700 border-t-[#38BDF8] rounded-full animate-spin mx-auto" />
            <p className="text-[#94A3B8] mt-4">Loading menu items...</p>
          </div>
        ) : menus.length === 0 ? (
          <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-12 text-center">
            <p className="text-[#94A3B8]">No menu items found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menus.map((menu) => (
              <div
                key={menu.id}
                className="bg-[#1E293B] border border-slate-700 rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 bg-[#0F172A] relative overflow-hidden flex items-center justify-center">
                    <img
                      src={formatImageUrl(menu.image)}
                      alt={menu.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-[#0F172A]/90 text-[#38BDF8] border border-slate-700 text-xs px-3 py-1 rounded-full font-semibold">
                      {menu.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">{menu.name}</h3>
                      <span className="text-xl font-bold text-[#38BDF8]">₹{menu.price}</span>
                    </div>
                    <p className="text-[#94A3B8] text-sm mt-2 line-clamp-2">
                      {menu.description || "No description provided."}
                    </p>
                  </div>
                </div>

                <div className="p-5 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => handleEdit(menu)}
                    className="text-[#38BDF8] hover:underline font-semibold text-sm cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(menu.id)}
                    className="text-red-400 hover:underline font-semibold text-sm cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMenue;
