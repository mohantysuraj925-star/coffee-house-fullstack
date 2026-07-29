import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DEFAULT_PLACEHOLDER = "https://images.unsplash.com/photo-1572442388796-11668ba67e53?auto=format&fit=crop&w=600&q=80";

const INITIAL_MENUS = [
  { id: "m1", name: "Cappuccino", category: "Coffee", type: "veg", price: "122.50", description: "Rich espresso blended with velvety steamed milk and topped with a thick layer of silky foam.", image: "https://images.unsplash.com/photo-1534778101976-62847782c213", is_available: true },
  { id: "m2", name: "French Fries", category: "Snack", type: "veg", price: "50.00", description: "Crispy golden french fries served hot and fresh, lightly seasoned to perfection.", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877", is_available: true },
  { id: "m3", name: "Artisanal Espresso", category: "Coffee", type: "veg", price: "180.00", description: "Rich, bold double shot espresso crafted from roasted Arabica beans.", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04", is_available: true },
  { id: "m4", name: "Nitro Cold Brew", category: "Coffee", type: "veg", price: "260.00", description: "Slow-steeped cold brew infused with nitrogen for a silky pour.", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c", is_available: true },
  { id: "m5", name: "Butter Croissant", category: "Snack", type: "veg", price: "150.00", description: "Flaky, golden French croissant baked fresh every morning.", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a", is_available: true },
  { id: "m6", name: "Dark Chocolate Muffin", category: "Dessert", type: "veg", price: "190.00", description: "Decadent dark chocolate muffin loaded with belgian chocolate chips.", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa", is_available: true }
];

const AdminMenue = () => {
  const BASE_URL = "https://coffeehouse-backend-xtle.onrender.com" || "";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const initialFormData = {
    name: "",
    category: "Coffee",
    type: "veg",
    description: "",
    price: "",
    image: "",
    is_available: true,
  };

  const [menus, setMenus] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const saveLocalData = (data) => {
    setMenus(data);
    localStorage.setItem("app_permanent_menus", JSON.stringify(data));
  };

  const mergeMenus = (apiItems) => {
    const apiIds = new Set(apiItems.map(i => String(i.id)));
    const remainingDefaults = INITIAL_MENUS.filter(m => !apiIds.has(String(m.id)) && !apiItems.some(a => a.name === m.name));
    return [...apiItems, ...remainingDefaults];
  };

  const fetchMenus = async () => {
    setFetching(true);
    setError("");

    const saved = localStorage.getItem("app_permanent_menus");
    let currentData = saved ? JSON.parse(saved) : INITIAL_MENUS;

    if (BASE_URL) {
      try {
        const cleanUrl = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
        const headers = token ? { Authorization: `Token ${token}` } : {};
        const response = await axios.get(`${cleanUrl}/menu/`, { headers, timeout: 3000 });

        const apiItems = Array.isArray(response.data) ? response.data : (response.data?.data || response.data?.menus || []);
        if (apiItems && apiItems.length > 0) {
          currentData = mergeMenus(apiItems);
        }
      } catch (err) {
        console.warn("API fetch error, using combined local data:", err);
      }
    }

    saveLocalData(currentData);
    setFetching(false);
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
    setLoading(true);
    setError("");
    setMessage("");

    let updatedList = [];
    if (editingId) {
      updatedList = menus.map((m) => (m.id === editingId ? { ...formData, id: editingId } : m));
      setMessage("Menu item updated successfully.");
    } else {
      const newId = `m_${Date.now()}`;
      const newItem = { ...formData, id: newId };
      updatedList = [newItem, ...menus];
      setMessage("New menu item added successfully.");
    }

    saveLocalData(updatedList);

    if (BASE_URL) {
      try {
        const cleanUrl = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
        const headers = token ? { Authorization: `Token ${token}` } : {};
        if (editingId) {
          await axios.put(`${cleanUrl}/menu-detail/${editingId}/`, formData, { headers, timeout: 2500 });
        } else {
          await axios.post(`${cleanUrl}/menu/`, formData, { headers, timeout: 2500 });
        }
      } catch (err) {}
    }

    setFormData(initialFormData);
    setEditingId(null);
    setShowForm(false);
    setLoading(false);
  };

  const handleEdit = (menu) => {
    setEditingId(menu.id);
    setFormData({
      name: menu.name || "",
      category: menu.category || "Coffee",
      type: menu.type || (menu.is_veg === false ? "nonveg" : "veg"),
      description: menu.description || "",
      price: menu.price || "",
      image: menu.image || "",
      is_available: menu.is_available ?? true,
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
    const confirmDelete = window.confirm("Are you sure you want to delete this menu item?");
    if (!confirmDelete) return;

    setError("");
    setMessage("");

    const updatedList = menus.filter((menu) => menu.id !== id);
    saveLocalData(updatedList);
    setMessage("Menu item deleted successfully.");

    if (BASE_URL) {
      try {
        const cleanUrl = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
        const headers = token ? { Authorization: `Token ${token}` } : {};
        await axios.delete(`${cleanUrl}/menu-detail/${id}/`, { headers, timeout: 2000 });
      } catch (err) {}
    }

    if (editingId === id) {
      setEditingId(null);
      setFormData(initialFormData);
      setShowForm(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData(initialFormData);
    setError("");
    setShowForm(false);
  };

  const formatImageUrl = (url) => {
    if (!url || typeof url !== "string" || !url.trim()) return DEFAULT_PLACEHOLDER;
    const cleanUrl = url.trim();
    if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) return cleanUrl;
    return `${BASE_URL}${cleanUrl.startsWith("/") ? "" : "/"}${cleanUrl}`;
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}` : null;
  };

  const isDirectVideoUrl = (url) => {
    if (!url) return false;
    const clean = url.toLowerCase();
    return clean.endsWith(".mp4") || clean.endsWith(".webm") || clean.endsWith(".ogg");
  };

  const renderTVContent = (url) => {
    const ytEmbed = getYouTubeEmbedUrl(url);
    if (ytEmbed) {
      return (
        <iframe
          src={ytEmbed}
          title="TV Preview"
          className="w-full h-full object-cover pointer-events-none"
          allow="autoplay; encrypted-media"
        />
      );
    }

    if (isDirectVideoUrl(url)) {
      return (
        <video
          src={url}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      );
    }

    return (
      <img
        src={formatImageUrl(url)}
        alt="TV Preview"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = DEFAULT_PLACEHOLDER;
        }}
      />
    );
  };

  const filteredMenus = menus.filter((m) => {
    const matchesCategory = selectedCategory === "All" || m.category === selectedCategory;
    const matchesSearch = (m.name || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#1a0f07] text-amber-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">

        <div>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="mb-4 flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold text-xs transition cursor-pointer"
          >
            ← Back to Control Center
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-amber-600/30 pb-6">
            <div>
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
                Catalog & Inventory
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-amber-50 mt-1">
                Menu Management
              </h1>
              <p className="text-amber-200/70 text-xs md:text-sm mt-1">
                Add new dishes, set Veg/Non-Veg tags, live TV media preview & pricing.
              </p>
            </div>

            <button
              onClick={handleAddMenu}
              className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-xl font-bold text-xs cursor-pointer transition flex items-center justify-center gap-2 shadow-lg shadow-amber-600/30"
            >
              <span className="text-lg">+</span>
              Add New Dish / Drink
            </button>
          </div>
        </div>

        {message && (
          <div className="p-4 bg-green-950/80 text-green-300 border border-green-600/40 rounded-2xl text-xs font-semibold">
            {message}
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-950/80 text-red-300 border border-red-600/40 rounded-2xl text-xs font-semibold">
            {error}
          </div>
        )}

        {showForm && (
          <div className="bg-gradient-to-b from-amber-950/90 to-amber-900/50 border border-amber-600/40 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-amber-600/30 pb-4">
              <div>
                <h2 className="text-xl font-black text-amber-50">
                  {editingId ? "Update Item Details" : "Create New Menu Item"}
                </h2>
                <p className="text-xs text-amber-200/60 mt-1">
                  Fill in dish info, media link, live TV preview & pricing.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCancel}
                className="w-9 h-9 rounded-full bg-amber-950 text-amber-400 hover:bg-red-900 hover:text-white transition cursor-pointer flex items-center justify-center text-sm font-bold border border-amber-600/30"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                <div className="lg:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-amber-200 mb-1.5">
                        Dish / Drink Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Cheese Burst Pizza / Caramel Latte"
                        required
                        className="w-full px-4 py-2.5 bg-amber-950/80 border border-amber-600/30 rounded-xl text-amber-50 text-xs outline-none focus:border-amber-400 placeholder:text-amber-200/40"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-amber-200 mb-1.5">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-amber-950/80 border border-amber-600/30 rounded-xl text-amber-50 text-xs outline-none focus:border-amber-400 cursor-pointer"
                      >
                        <option value="Coffee" className="bg-[#180E0A]">☕ Coffee</option>
                        <option value="Tea" className="bg-[#180E0A]">🍵 Tea & Blends</option>
                        <option value="Pizza" className="bg-[#180E0A]">🍕 Pizza</option>
                        <option value="Burger" className="bg-[#180E0A]">🍔 Burger</option>
                        <option value="Snack" className="bg-[#180E0A]">🍟 Snacks & Fries</option>
                        <option value="Ice-Cream" className="bg-[#180E0A]">🍨 Ice Creams</option>
                        <option value="Dessert" className="bg-[#180E0A]">🍰 Pastries & Desserts</option>
                        <option value="Other" className="bg-[#180E0A]">🍽️ Other Items</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-amber-200 mb-1.5">
                        Dietary Classification
                      </label>
                      <div className="flex bg-amber-950/80 border border-amber-600/30 rounded-xl p-1">
                        <button
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, type: "veg" }))}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                            formData.type === "veg" ? "bg-green-700 text-white" : "text-amber-200/60 hover:text-white"
                          }`}
                        >
                          🌱 Pure Veg
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, type: "nonveg" }))}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                            formData.type === "nonveg" ? "bg-red-700 text-white" : "text-amber-200/60 hover:text-white"
                          }`}
                        >
                          🍗 Non-Veg
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-amber-200 mb-1.5">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="e.g. 180"
                        min="0"
                        step="0.01"
                        required
                        className="w-full px-4 py-2.5 bg-amber-950/80 border border-amber-600/30 rounded-xl text-amber-50 text-xs outline-none focus:border-amber-400 placeholder:text-amber-200/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amber-200 mb-1.5 flex items-center justify-between">
                      <span>Image or Video Stream URL</span>
                      <span className="text-[10px] text-amber-400 font-mono">JPG, PNG, MP4, YouTube</span>
                    </label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="Paste Image URL or Video Link here..."
                      className="w-full px-4 py-2.5 bg-amber-950/80 border border-amber-600/30 rounded-xl text-amber-50 text-xs outline-none focus:border-amber-400 placeholder:text-amber-200/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amber-200 mb-1.5">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe flavor profile, ingredients..."
                      rows="2"
                      className="w-full px-4 py-2.5 bg-amber-950/80 border border-amber-600/30 rounded-xl text-amber-50 text-xs outline-none focus:border-amber-400 placeholder:text-amber-200/40 resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="is_available"
                      name="is_available"
                      checked={formData.is_available}
                      onChange={handleChange}
                      className="w-4 h-4 accent-amber-500 cursor-pointer"
                    />
                    <label htmlFor="is_available" className="text-amber-50 text-xs font-bold cursor-pointer">
                      Available for Live Orders
                    </label>
                  </div>
                </div>

                {/* 📺 Retro Compact Old-School TV Frame */}
                <div className="flex flex-col items-center justify-center bg-amber-950/80 border border-amber-600/40 rounded-2xl p-4 w-full max-w-[260px] mx-auto shadow-2xl">
                  
                  {/* Antenna */}
                  <div className="flex items-center justify-center gap-4 -mb-1 z-10">
                    <div className="w-12 h-1 bg-amber-700 -rotate-45 origin-right rounded-full" />
                    <div className="w-12 h-1 bg-amber-700 rotate-45 origin-left rounded-full" />
                  </div>

                  <div className="w-full flex items-center justify-between mb-1.5 px-1">
                    <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" /> RETRO TV
                    </span>
                    <span className="text-[9px] text-amber-200/60 font-mono">CH-01</span>
                  </div>

                  {/* Wooden/Plastic TV Body */}
                  <div className="w-full bg-[#2a170a] border-4 border-amber-900 rounded-2xl p-2.5 shadow-2xl relative">
                    
                    {/* TV Screen Glass Frame */}
                    <div className="w-full h-56 bg-black rounded-xl border-2 border-amber-950 overflow-hidden relative flex items-center justify-center shadow-inner">
                      {renderTVContent(formData.image)}

                      {/* Glass Glare Layer */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* TV Speaker Grille & Knobs */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-amber-900/60 px-1">
                      <div className="flex gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-800 border border-amber-600/50 shadow" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-800 border border-amber-600/50 shadow" />
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-1 bg-amber-800/80 rounded" />
                        <div className="w-4 h-1 bg-amber-800/80 rounded" />
                        <div className="w-4 h-1 bg-amber-800/80 rounded" />
                      </div>
                    </div>
                  </div>

                  {/* TV Stand Legs */}
                  <div className="flex justify-between w-36 -mt-0.5">
                    <div className="w-2 h-3 bg-amber-900 -rotate-12 rounded-b" />
                    <div className="w-2 h-3 bg-amber-900 rotate-12 rounded-b" />
                  </div>
                </div>

              </div>

              <div className="flex justify-end gap-3 border-t border-amber-600/30 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-2 rounded-xl border border-amber-600/30 text-amber-200/70 hover:text-white text-xs font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition cursor-pointer shadow-lg shadow-amber-600/30"
                >
                  {loading ? "Saving..." : editingId ? "Update Item" : "Publish Item"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-gradient-to-b from-amber-950/80 to-amber-900/40 border border-amber-600/30 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Filter menu item by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-80 bg-amber-950/90 border border-amber-600/30 text-amber-50 px-4 py-2 rounded-xl text-xs outline-none focus:border-amber-400 placeholder:text-amber-200/40"
          />

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {["All", "Coffee", "Tea", "Pizza", "Burger", "Snack", "Ice-Cream", "Dessert"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap cursor-pointer transition ${
                  selectedCategory === cat ? "bg-amber-600 text-white" : "bg-amber-950 text-amber-200/60 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {fetching && menus.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-amber-600/30 border-t-amber-400 rounded-full animate-spin mx-auto" />
            <p className="text-amber-200/60 text-xs font-bold">Fetching Live Menu Catalog...</p>
          </div>
        ) : filteredMenus.length === 0 ? (
          <div className="bg-amber-950/40 border border-amber-600/30 rounded-3xl p-12 text-center text-amber-200/60 text-xs">
            No menu items found matching filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenus.map((menu) => (
              <div
                key={menu.id}
                className="group bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 hover:border-amber-400/60 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition duration-300"
              >
                <div>
                  <div className="h-44 bg-[#0d0704] relative overflow-hidden flex items-center justify-center p-1">
                    {renderTVContent(menu.image)}

                    <span className="absolute top-3 left-3 bg-amber-950/90 backdrop-blur-md text-amber-300 border border-amber-500/30 text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider z-10">
                      {menu.category}
                    </span>

                    <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[9px] font-bold border backdrop-blur-md uppercase tracking-wider z-10 ${
                      menu.type === "nonveg" || menu.is_veg === false
                        ? "bg-red-950/90 text-red-400 border-red-500/40"
                        : "bg-green-950/90 text-green-400 border-green-500/40"
                    }`}>
                      {menu.type === "nonveg" || menu.is_veg === false ? "🍗 Non-Veg" : "🌱 Veg"}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-amber-50 group-hover:text-amber-400 transition-colors">
                        {menu.name}
                      </h3>
                      <span className="text-base font-black text-amber-400">₹{menu.price}</span>
                    </div>
                    <p className="text-amber-200/60 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {menu.description || "Freshly prepared specialty item."}
                    </p>
                  </div>
                </div>

                <div className="p-4 border-t border-amber-600/20 flex items-center justify-between bg-amber-950/60">
                  <button
                    onClick={() => handleEdit(menu)}
                    className="bg-amber-600/20 border border-amber-500/40 text-amber-300 hover:bg-amber-600 hover:text-white px-3.5 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer"
                  >
                    Edit Item
                  </button>
                  <button
                    onClick={() => handleDelete(menu.id)}
                    className="text-red-400 hover:text-red-300 font-bold text-xs cursor-pointer hover:underline"
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
