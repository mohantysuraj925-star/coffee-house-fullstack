import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DEFAULT_PLACEHOLDER = "https://images.unsplash.com/photo-1572442388796-11668ba67e53?auto=format&fit=crop&w=600&q=80";

/* Premium Authentic SVG Icons for Veg / Non-Veg */
const VegIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="14" height="14" stroke="#10b981" strokeWidth="1.5" rx="3"/>
    <circle cx="8" cy="8" r="3.5" fill="#10b981"/>
  </svg>
);

const NonVegIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="14" height="14" stroke="#ef4444" strokeWidth="1.5" rx="3"/>
    <path d="M8 4.5L11.5 11H4.5L8 4.5Z" fill="#ef4444"/>
  </svg>
);

const INITIAL_MENUS = [
  { id: "m1", name: "Cappuccino", category: "Coffee", type: "veg", price: "122.50", description: "Rich espresso blended with velvety steamed milk and topped with a thick layer of silky foam.", image: "https://images.unsplash.com/photo-1534778101976-62847782c213", is_available: true },
  { id: "m2", name: "French Fries", category: "Snack", type: "veg", price: "50.00", description: "Crispy golden french fries served hot and fresh, lightly seasoned to perfection.", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877", is_available: true },
  { id: "m3", name: "Artisanal Espresso", category: "Coffee", type: "veg", price: "180.00", description: "Rich, bold double shot espresso crafted from roasted Arabica beans.", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04", is_available: true }
];

const AdminMenue = () => {
  const BASE_URL = "https://coffeehouse-backend-xtle.onrender.com" || "";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const initialFormData = {
    name: "", category: "Coffee", type: "veg", description: "", price: "", image: "", is_available: true,
  };

  const [menus, setMenus] = useState(() => {
    try {
      const saved = localStorage.getItem("app_permanent_menus");
      return saved ? JSON.parse(saved) : INITIAL_MENUS;
    } catch { return INITIAL_MENUS; }
  });

  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

  const syncLocal = (updatedList) => {
    setMenus(updatedList);
    localStorage.setItem("app_permanent_menus", JSON.stringify(updatedList));
  };

  useEffect(() => { if (!token) navigate("/login"); }, [token, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData(initialFormData);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...formData, image: formData.image.trim() || DEFAULT_PLACEHOLDER, price: String(formData.price) };
    try {
      if (editingId) {
        try { await axios.put(`${BASE_URL}/menu/${editingId}/`, payload, { headers: { Authorization: `Token ${token}` } }); } catch (e) {}
        syncLocal(menus.map((m) => (m.id === editingId ? { ...m, ...payload } : m)));
      } else {
        const newItem = { id: `custom_${Date.now()}`, ...payload };
        try {
          const res = await axios.post(`${BASE_URL}/menu/`, payload, { headers: { Authorization: `Token ${token}` } });
          if (res.data && res.data.id) newItem.id = res.data.id;
        } catch (e) {}
        syncLocal([newItem, ...menus]);
      }
      handleCancel();
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ ...item, is_available: item.is_available !== false });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* Custom Popup Delete Logic */
  const executeDelete = async () => {
    if (!deleteModal.id) return;
    try {
      await axios.delete(`${BASE_URL}/menu/${deleteModal.id}/`, { headers: { Authorization: `Token ${token}` } });
    } catch (e) {}
    syncLocal(menus.filter((m) => m.id !== deleteModal.id));
    setDeleteModal({ show: false, id: null });
  };

  const filtered = menus.filter((m) => (m.name || "").toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="bg-[#120a04] text-amber-50 min-h-screen py-10 px-4 md:px-8 font-sans relative">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-amber-600/30 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-amber-500/20 to-amber-950 border border-amber-500/40 rounded-2xl shadow-lg">
              <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <span className="text-amber-400 text-xs font-black uppercase tracking-widest block">Catalog Studio</span>
              <h1 className="text-3xl md:text-4xl font-black text-amber-50">Menu Item Management</h1>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <button onClick={() => navigate("/admin/dashboard")} className="bg-amber-950/80 hover:bg-amber-900 border border-amber-600/50 text-amber-300 font-bold px-4 py-2.5 rounded-2xl text-xs transition cursor-pointer flex items-center gap-2 shadow-lg">
              ← Dashboard
            </button>
            <button onClick={() => { if (showForm) handleCancel(); else { setEditingId(null); setFormData(initialFormData); setShowForm(true); } }} className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-white font-black px-5 py-2.5 rounded-2xl text-xs uppercase tracking-wider transition shadow-lg shadow-amber-600/30 cursor-pointer flex items-center gap-2">
              <span>{showForm ? "✕ Close Form" : "+ Add New Dish"}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Form Container */}
        {showForm && (
          <form onSubmit={handleSubmit} className="relative bg-gradient-to-b from-[#28150a] via-[#1a0f07] to-[#120a04] border-2 border-amber-500/50 rounded-3xl p-6 md:p-8 space-y-6 shadow-[0_0_30px_rgba(245,158,11,0.15)] animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-amber-600/30 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                <h2 className="text-lg font-black text-amber-300 uppercase tracking-wider">{editingId ? "✏️ Edit Dish Specification" : "✨ Add New Menu Dish"}</h2>
              </div>
              <button type="button" onClick={handleCancel} className="bg-amber-950 border border-amber-600/40 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-xl cursor-pointer hover:bg-amber-900 transition">Cancel / Close</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-black text-amber-200/90 block mb-1">Item Name</label><input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="e.g. Cold Coffee" className="w-full bg-[#120a04] border-2 border-amber-600/30 text-amber-50 px-4 py-2.5 rounded-2xl text-xs font-bold outline-none focus:border-amber-400 focus:shadow-[0_0_12px_rgba(245,158,11,0.3)] transition"/></div>
                  <div><label className="text-xs font-black text-amber-200/90 block mb-1">Category</label><select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-[#120a04] border-2 border-amber-600/30 text-amber-50 px-4 py-2.5 rounded-2xl text-xs font-bold outline-none focus:border-amber-400 transition"><option value="Coffee">☕ Coffee</option><option value="Tea">🍵 Tea</option><option value="Soft Drinks">🥤 Soft Drinks</option><option value="Drinks">🍹 Drinks</option><option value="Pizza">🍕 Pizza</option><option value="Burger">🍔 Burger</option><option value="Snack">🍟 Snack</option><option value="Ice-Cream">🍨 Ice-Cream</option><option value="Dessert">🍰 Dessert</option></select></div>
                  <div><label className="text-xs font-black text-amber-200/90 block mb-1">Food Type</label><select name="type" value={formData.type} onChange={handleInputChange} className="w-full bg-[#120a04] border-2 border-amber-600/30 text-amber-50 px-4 py-2.5 rounded-2xl text-xs font-bold outline-none focus:border-amber-400 transition"><option value="veg">Veg</option><option value="nonveg">Non-Veg</option></select></div>
                  <div><label className="text-xs font-black text-amber-200/90 block mb-1">Price (₹)</label><input type="number" name="price" required step="0.01" value={formData.price} onChange={handleInputChange} placeholder="e.g. 150.00" className="w-full bg-[#120a04] border-2 border-amber-600/30 text-amber-50 px-4 py-2.5 rounded-2xl text-xs font-bold outline-none focus:border-amber-400 transition"/></div>
                </div>
                <div><label className="text-xs font-black text-amber-200/90 block mb-1">Image URL</label><input type="url" name="image" value={formData.image} onChange={handleInputChange} placeholder="https://images.unsplash.com/..." className="w-full bg-[#120a04] border-2 border-amber-600/30 text-amber-50 px-4 py-2.5 rounded-2xl text-xs font-bold outline-none focus:border-amber-400 transition"/></div>
                <div><label className="text-xs font-black text-amber-200/90 block mb-1">Description</label><input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="Summary of organic ingredients..." className="w-full bg-[#120a04] border-2 border-amber-600/30 text-amber-50 px-4 py-2.5 rounded-2xl text-xs font-bold outline-none focus:border-amber-400 transition"/></div>
                <div className="flex items-center gap-3 pt-2">
                  <input type="checkbox" name="is_available" id="is_available" checked={formData.is_available} onChange={handleInputChange} className="w-4 h-4 accent-amber-500 rounded cursor-pointer"/>
                  <label htmlFor="is_available" className="text-xs font-black text-amber-300 cursor-pointer select-none">Available on Menu (Uncheck to hide from customers)</label>
                </div>
              </div>

              {/* Retro TV Display with Custom SVGs */}
              <div className="md:col-span-4 bg-gradient-to-b from-[#3a2212] via-[#221309] to-[#0f0803] border-4 border-[#523018] rounded-3xl p-3 shadow-2xl space-y-2 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-4 pointer-events-none">
                  <div className="w-8 h-1 bg-amber-700 rotate-[-25deg] origin-right rounded-full" />
                  <div className="w-8 h-1 bg-amber-700 rotate-[25deg] origin-left rounded-full" />
                </div>
                <div className="flex items-center justify-between px-1">
                  <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-1">📺 Retro TV</span>
                  <div className="flex gap-1"><span className="w-2 h-2 rounded-full bg-red-500 animate-ping" /><span className="w-2 h-2 rounded-full bg-amber-500" /></div>
                </div>
                <div className="bg-[#050302] border-4 border-[#1c1007] rounded-2xl overflow-hidden aspect-video relative flex items-center justify-center shadow-inner">
                  <img src={formData.image.trim() || DEFAULT_PLACEHOLDER} alt="Preview" className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/80 pointer-events-none" />
                  <div className="absolute inset-0 p-2.5 flex flex-col justify-end">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[8px] font-black uppercase text-amber-300 bg-amber-950/90 px-2 py-0.5 rounded w-max border border-amber-500/40">{formData.category || "Coffee"}</span>
                      {formData.type === 'veg' ? <VegIcon/> : <NonVegIcon/>}
                    </div>
                    <h4 className="text-xs font-black text-white truncate drop-shadow">{formData.name || "Sample Dish"}</h4>
                    <span className="text-amber-400 font-black text-xs">₹{formData.price || "0.00"}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-2 pt-1">
                  <div className="flex gap-2"><div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-950 to-amber-700 border border-amber-500/50 shadow" /><div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-950 to-amber-700 border border-amber-500/50 shadow" /></div>
                  <span className="text-[8px] font-mono text-amber-500/80 font-bold">CH-04 LIVE</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-amber-600/30">
              <button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-white font-black py-3.5 rounded-2xl text-xs uppercase tracking-wider transition shadow-lg shadow-amber-600/30 cursor-pointer">
                {loading ? "Saving..." : editingId ? "Update Dish Specifications" : "Save New Dish To Menu"}
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between gap-4">
            <input type="text" placeholder="Filter catalog items..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-amber-950/90 border border-amber-600/40 text-amber-50 px-4 py-2.5 rounded-2xl text-xs font-bold outline-none focus:border-amber-400 w-64"/>
            <span className="text-xs font-bold text-amber-300">Total Catalog: {filtered.length}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => {
              const isVeg = (item.type || "veg").toLowerCase() === "veg";
              return (
                <div key={item.id} className="bg-amber-950/70 border border-amber-600/40 rounded-3xl p-5 flex gap-4 items-center shadow-xl">
                  <img src={item.image || DEFAULT_PLACEHOLDER} alt={item.name} className="w-20 h-20 object-cover rounded-2xl border border-amber-600/40 shrink-0" />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">{item.category}</span>
                      {isVeg ? <VegIcon /> : <NonVegIcon />}
                    </div>
                    <h3 className="text-base font-black text-amber-50 truncate">{item.name}</h3>
                    <p className="text-amber-300 font-extrabold text-sm">₹{item.price}</p>
                    <div className="flex gap-2 pt-2">
                      <button onClick={() => handleEdit(item)} className="bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-bold px-3 py-1 rounded-xl cursor-pointer">Edit</button>
                      <button onClick={() => setDeleteModal({ show: true, id: item.id })} className="bg-red-950/90 border border-red-500/40 text-red-400 text-xs font-bold px-3 py-1 rounded-xl cursor-pointer">Delete</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Premium Delete Modal */}
        {deleteModal.show && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-gradient-to-b from-[#2d1111] via-[#1a0f07] to-[#120a04] border-2 border-red-500/50 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-[0_0_40px_rgba(239,68,68,0.2)] text-center space-y-5">
              <div className="w-16 h-16 mx-auto bg-red-950/80 border-2 border-red-500/50 rounded-2xl flex items-center justify-center shadow-inner">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-black text-amber-50">Delete this Dish?</h3>
                <p className="text-xs font-bold text-amber-200/70 mt-2 leading-relaxed">
                  This will permanently remove the item from your catalog. Customers won't see it anymore.
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setDeleteModal({ show: false, id: null })} className="flex-1 bg-amber-950 hover:bg-amber-900 border border-amber-600/40 text-amber-300 font-black py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer">
                  Cancel
                </button>
                <button onClick={executeDelete} className="flex-1 bg-red-600 hover:bg-red-500 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-red-600/30 cursor-pointer">
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminMenue;
