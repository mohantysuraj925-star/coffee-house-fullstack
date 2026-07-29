import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const INITIAL_MENUS = [
  { id: "m1", name: "Cappuccino", category: "Coffee", price: "122.50", image: "https://images.unsplash.com/photo-1534778101976-62847782c213" },
  { id: "m2", name: "French Fries", category: "Snack", price: "50.00", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877" },
  { id: "m3", name: "Artisanal Espresso", category: "Coffee", price: "180.00", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04" },
  { id: "m4", name: "Nitro Cold Brew", category: "Coffee", price: "260.00", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c" },
  { id: "m5", name: "Butter Croissant", category: "Snack", price: "150.00", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a" },
  { id: "m6", name: "Dark Chocolate Muffin", category: "Dessert", price: "190.00", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa" }
];

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [orderType, setOrderType] = useState("dinein");
  const [tableNo, setTableNo] = useState("");
  const [orderNote, setOrderNote] = useState("");

  const token = localStorage.getItem("token");

  const getSavedCart = () => {
    try {
      return JSON.parse(localStorage.getItem("app_cart_items") || "{}");
    } catch {
      return {};
    }
  };

  const getSavedMenus = () => {
    try {
      const saved = localStorage.getItem("app_permanent_menus");
      return saved ? JSON.parse(saved) : INITIAL_MENUS;
    } catch {
      return INITIAL_MENUS;
    }
  };

  const saveCartState = (updatedMap) => {
    localStorage.setItem("app_cart_items", JSON.stringify(updatedMap));
  };

  const loadCartData = () => {
    const menus = getSavedMenus();
    const savedMap = getSavedCart();
    let list = [];

    menus.forEach((m) => {
      const q = savedMap[m.id];
      if (q && q > 0) {
        list.push({ ...m, quantity: q });
      }
    });

    setCartItems(list);
  };

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    loadCartData();
  }, []);

  const updateQty = (e, menuId, change) => {
    e.preventDefault();
    const savedMap = getSavedCart();
    const current = savedMap[menuId] || 1;
    const newQty = current + change;

    if (newQty <= 0) {
      delete savedMap[menuId];
      setCartItems((prev) => prev.filter((item) => item.id !== menuId));
    } else {
      savedMap[menuId] = newQty;
      setCartItems((prev) => prev.map((item) => item.id === menuId ? { ...item, quantity: newQty } : item));
    }

    saveCartState(savedMap);
  };

  const addItemDirect = (item) => {
    const savedMap = getSavedCart();
    const current = savedMap[item.id] || 0;
    savedMap[item.id] = current + 1;
    saveCartState(savedMap);
    loadCartData();
  };

  const removeItem = (e, menuId) => {
    e.preventDefault();
    const savedMap = getSavedCart();
    delete savedMap[menuId];
    setCartItems((prev) => prev.filter((item) => item.id !== menuId));
    saveCartState(savedMap);
  };

  const formatImageUrl = (url) => {
    if (!url) return "https://images.unsplash.com/photo-1572442388796-11668ba67e53";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    const baseUrl = "https://coffeehouse-backend-xtle.onrender.com" || "";
    const cleanUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    return `${cleanUrl}${url.startsWith("/") ? "" : "/"}${cleanUrl}`;
  };

  const allMenus = getSavedMenus();
  const suggestions = allMenus.filter(m => !cartItems.some(ci => ci.id === m.id));
  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price || 0) * item.quantity, 0);
  const gstAmount = (subtotal * 0.05);
  const grandTotal = Math.max(0, subtotal + gstAmount);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleProceedToPayment = () => {
    localStorage.setItem("checkout_subtotal", subtotal.toString());
    localStorage.setItem("checkout_gst", gstAmount.toString());
    localStorage.setItem("checkout_grandtotal", grandTotal.toString());
    navigate("/checkout");
  };

  return (
    <div className="bg-[#1a0f07] text-amber-50 min-h-screen py-8 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header Title */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-amber-600/30 pb-4">
          <div>
            <span className="text-amber-400 text-xs font-black uppercase tracking-widest block">
              Order Review & Summary
            </span>
            <h1 className="text-2xl md:text-3xl font-black mt-1 text-amber-50">Your Shopping Cart</h1>
          </div>

          <Link
            to="/menu"
            className="text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1.5 transition bg-amber-950/60 px-3.5 py-2 rounded-xl border border-amber-600/30"
          >
            ← Add More Delights
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 rounded-3xl p-8 space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center text-3xl mx-auto border border-amber-500/30">
              🛒
            </div>
            <h2 className="text-lg font-bold text-amber-50">Your Cart is Currently Empty</h2>
            <p className="text-xs text-amber-200/60">Discover fresh coffees, snacks, and treats from our menu.</p>
            <Link
              to="/menu"
              className="inline-block bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-lg shadow-amber-600/30"
            >
              Explore Full Menu
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* Left Column - Clean Organized Items List */}
            <div className="lg:col-span-7 space-y-4">

              {/* Order Mode Toggle */}
              <div className="bg-gradient-to-b from-amber-950/80 to-amber-900/40 border border-amber-600/30 p-2 rounded-2xl flex gap-2 shadow-md">
                <button
                  type="button"
                  onClick={() => setOrderType("dinein")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    orderType === "dinein" ? "bg-amber-600 text-white shadow-md" : "text-amber-200/70 hover:text-white"
                  }`}
                >
                  <span>🍽️ Dine-In / Table</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType("takeaway")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    orderType === "takeaway" ? "bg-amber-600 text-white shadow-md" : "text-amber-200/70 hover:text-white"
                  }`}
                >
                  <span>🛍️ Express Takeaway</span>
                </button>
              </div>

              {/* Cart Items Cards */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 rounded-2xl p-4 flex gap-4 items-center shadow-lg transition hover:border-amber-500/40"
                  >
                    <div className="w-16 h-16 bg-[#120B07] rounded-xl overflow-hidden shrink-0 border border-amber-600/20">
                      <img
                        src={formatImageUrl(item.image)}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-bold text-amber-50 truncate">
                          {item.name}
                        </h3>
                        <button
                          type="button"
                          onClick={(e) => removeItem(e, item.id)}
                          className="text-red-400 hover:text-red-300 text-xs font-bold cursor-pointer transition shrink-0"
                        >
                          ✕ Remove
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="text-amber-400 font-black text-sm">
                          ₹{item.price}
                          <span className="text-amber-200/50 font-normal text-xs ml-1.5">
                            × {item.quantity} = <strong className="text-amber-300 font-bold">₹{(Number(item.price) * item.quantity).toFixed(2)}</strong>
                          </span>
                        </div>

                        <div className="flex items-center bg-[#120B07] border border-amber-500/40 rounded-xl overflow-hidden">
                          <button
                            type="button"
                            onClick={(e) => updateQty(e, item.id, -1)}
                            className="w-7 h-7 text-amber-300 hover:bg-amber-600 hover:text-white font-black text-sm cursor-pointer select-none transition"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-bold text-xs text-amber-50">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => updateQty(e, item.id, 1)}
                            className="w-7 h-7 text-amber-300 hover:bg-amber-600 hover:text-white font-black text-sm cursor-pointer select-none transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Seating / Table Option */}
              {orderType === "dinein" && (
                <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 p-4 rounded-2xl space-y-2">
                  <span className="text-xs font-bold text-amber-200 block">
                    📍 Table Number / Seating Zone
                  </span>
                  <input
                    type="text"
                    value={tableNo}
                    onChange={(e) => setTableNo(e.target.value)}
                    placeholder="e.g. Table 04 / Balcony"
                    className="w-full bg-amber-950/80 border border-amber-600/30 text-amber-50 px-3.5 py-2.5 rounded-xl text-xs outline-none focus:border-amber-400 placeholder:text-amber-200/40"
                  />
                </div>
              )}

              {/* Kitchen Note */}
              <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 p-4 rounded-2xl space-y-2">
                <label className="text-xs font-bold text-amber-200 block">
                  📝 Note for Kitchen / Barista (Optional)
                </label>
                <textarea
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="e.g. Extra hot, less sugar, serve with extra napkins..."
                  rows="2"
                  className="w-full bg-amber-950/80 border border-amber-600/30 text-amber-50 p-2.5 rounded-xl text-xs outline-none focus:border-amber-400 placeholder:text-amber-200/40 resize-none"
                />
              </div>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 p-4 rounded-2xl">
                  <p className="text-xs font-bold text-amber-50 mb-3">🥐 Popular Pairings to Add</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {suggestions.slice(0, 4).map((sug) => (
                      <div key={sug.id} className="flex items-center justify-between bg-amber-950/80 p-2.5 rounded-xl border border-amber-600/20">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img src={formatImageUrl(sug.image)} alt={sug.name} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                          <div className="truncate">
                            <p className="text-xs font-bold text-amber-50 truncate">{sug.name}</p>
                            <p className="text-[10px] text-amber-400 font-bold">₹{sug.price}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => addItemDirect(sug)}
                          className="bg-amber-600/20 border border-amber-500/40 text-amber-300 hover:bg-amber-600 hover:text-white px-3 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer shrink-0 ml-2"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column - Prominent Zoomed Bill Summary */}
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-6">

              <div className="bg-gradient-to-b from-amber-950/90 via-amber-900/60 to-amber-950/90 border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-amber-600/30 pb-3">
                  <h2 className="text-base font-black text-amber-50 tracking-wide uppercase flex items-center gap-2">
                    <span>📜</span> Bill Breakdown
                  </h2>
                  <span className="bg-amber-600/30 border border-amber-500/40 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    {totalCount} Items Selected
                  </span>
                </div>

                {/* Structured Numbering List */}
                <div className="space-y-3 font-mono">

                  <div className="flex items-center justify-between p-3 bg-amber-950/60 rounded-xl border border-amber-600/20">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-200">
                      <span className="w-5 h-5 rounded-md bg-amber-600/30 text-amber-300 flex items-center justify-center text-[10px] font-extrabold font-sans">1</span>
                      <span>Items Subtotal</span>
                    </div>
                    <span className="text-sm font-extrabold text-amber-50">₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-amber-950/60 rounded-xl border border-amber-600/20">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-200">
                      <span className="w-5 h-5 rounded-md bg-amber-600/30 text-amber-300 flex items-center justify-center text-[10px] font-extrabold font-sans">2</span>
                      <span>Government Taxes (GST 5%)</span>
                    </div>
                    <span className="text-sm font-extrabold text-amber-50">₹{gstAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-amber-950/60 rounded-xl border border-amber-600/20">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-200">
                      <span className="w-5 h-5 rounded-md bg-amber-600/30 text-amber-300 flex items-center justify-center text-[10px] font-extrabold font-sans">3</span>
                      <span>Delivery / Service Charge</span>
                    </div>
                    <span className="text-xs font-extrabold text-green-400 uppercase font-sans">FREE</span>
                  </div>

                </div>

                {/* Highlighted & Zoomed Grand Total Box */}
                <div className="p-4 bg-gradient-to-r from-amber-900/80 to-amber-950/80 border-2 border-amber-400/60 rounded-2xl space-y-1 text-center shadow-xl">
                  <span className="text-[10px] font-black uppercase text-amber-300 tracking-widest block">
                    TOTAL AMOUNT PAYABLE
                  </span>
                  <p className="text-3xl font-black text-amber-400 font-mono tracking-tight">
                    ₹{grandTotal.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-amber-200/50 font-sans">
                    Includes all applicable taxes & service charges
                  </p>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-white font-black py-4 rounded-2xl text-xs uppercase tracking-wider transition shadow-xl shadow-amber-600/30 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Proceed To Payment Gateway</span>
                  <span className="text-lg">→</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
