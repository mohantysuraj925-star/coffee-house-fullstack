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
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

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

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toLowerCase() === "coffee50" || couponCode.trim().toLowerCase() === "suraj") {
      setCouponApplied(true);
    } else {
      alert("Invalid Coupon Code! Try 'CRAZY' or 'SURAJ'");
    }
  };

  const allMenus = getSavedMenus();
  const suggestions = allMenus.filter(m => !cartItems.some(ci => ci.id === m.id));
  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price || 0) * item.quantity, 0);
  const discountAmount = couponApplied ? 50 : 0;
  const gstAmount = Math.max(0, (subtotal - discountAmount) * 0.05);
  const grandTotal = Math.max(0, subtotal - discountAmount + gstAmount);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleProceedToPayment = () => {
    localStorage.setItem("checkout_subtotal", subtotal.toString());
    localStorage.setItem("checkout_gst", gstAmount.toString());
    localStorage.setItem("checkout_grandtotal", grandTotal.toString());
    navigate("/checkout");
  };

  return (
    <div className="bg-[#1a0f07] text-amber-50 min-h-screen py-10 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Title */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-amber-600/40 pb-6">
          <div>
            <span className="text-amber-400 text-sm font-black uppercase tracking-widest block">
              🛒 Complete Your Order
            </span>
            <h1 className="text-3xl md:text-5xl font-black mt-1 text-amber-50 tracking-tight">
              Your Shopping Cart
            </h1>
          </div>

          <Link
            to="/menu"
            className="text-amber-300 hover:text-white text-sm md:text-base font-extrabold flex items-center gap-2 transition bg-amber-950/90 px-5 py-3 rounded-2xl border-2 border-amber-600/50 shadow-xl"
          >
            ← Add More Delights
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-b from-amber-950/80 to-amber-900/40 border-2 border-amber-600/40 rounded-3xl p-10 space-y-6 max-w-xl mx-auto shadow-2xl">
            <div className="w-24 h-24 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center text-5xl mx-auto border-2 border-amber-500/40 shadow-inner">
              🛒
            </div>
            <h2 className="text-2xl font-black text-amber-50">Your Cart is Currently Empty</h2>
            <p className="text-sm md:text-base text-amber-200/70 leading-relaxed">
              Explore our wide variety of coffees, fresh snacks, and desserts to fill your cart!
            </p>
            <Link
              to="/menu"
              className="inline-block bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-black px-10 py-4 rounded-2xl text-sm uppercase tracking-wider transition shadow-2xl shadow-amber-600/40"
            >
              Explore Full Menu
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start">

            {/* Left Column - Big Feature-Packed Cart Item Cards */}
            <div className="lg:col-span-7 space-y-6">

              {/* Live Delivery Info Banner */}
              <div className="bg-gradient-to-r from-amber-900/80 via-amber-950/90 to-amber-900/80 border-2 border-amber-500/40 p-4 rounded-3xl flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <p className="text-xs font-black text-amber-400 uppercase tracking-widest">Preparation & Serving Time</p>
                    <p className="text-sm font-extrabold text-amber-50">Ready in approx. 15-20 Mins</p>
                  </div>
                </div>
                <span className="bg-green-950/90 border border-green-500/40 text-green-400 text-xs font-bold px-3 py-1.5 rounded-xl uppercase">
                  Freshly Brewed
                </span>
              </div>

              {/* Order Mode Toggle */}
              <div className="bg-gradient-to-b from-amber-950/90 to-amber-900/50 border-2 border-amber-600/40 p-2.5 rounded-3xl flex gap-3 shadow-xl">
                <button
                  type="button"
                  onClick={() => setOrderType("dinein")}
                  className={`flex-1 py-3.5 rounded-2xl text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
                    orderType === "dinein" ? "bg-amber-600 text-white shadow-lg shadow-amber-600/50 scale-[1.02]" : "text-amber-200/70 hover:text-white"
                  }`}
                >
                  <span className="text-lg">🍽️</span> <span>Dine-In / Table</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType("takeaway")}
                  className={`flex-1 py-3.5 rounded-2xl text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
                    orderType === "takeaway" ? "bg-amber-600 text-white shadow-lg shadow-amber-600/50 scale-[1.02]" : "text-amber-200/70 hover:text-white"
                  }`}
                >
                  <span className="text-lg">🛍️</span> <span>Express Takeaway</span>
                </button>
              </div>

              {/* Big Prominent Cart Item Cards */}
              <div className="space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gradient-to-b from-amber-950/80 to-amber-900/40 border-2 border-amber-600/40 rounded-3xl p-6 flex flex-col sm:flex-row gap-6 items-center shadow-2xl transition hover:border-amber-400/80 relative overflow-hidden"
                  >
                    <div className="w-28 h-28 bg-[#120B07] rounded-2xl overflow-hidden shrink-0 border-2 border-amber-600/40 shadow-inner">
                      <img
                        src={formatImageUrl(item.image)}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    <div className="flex-1 w-full space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="bg-amber-600/30 border border-amber-500/40 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-widest">
                            {item.category || "Specialty"}
                          </span>
                          <h3 className="text-lg md:text-xl font-black text-amber-50 leading-tight mt-1.5">
                            {item.name}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => removeItem(e, item.id)}
                          className="bg-red-950/90 border-2 border-red-500/40 text-red-400 hover:bg-red-900 hover:text-white text-xs font-black px-3.5 py-2 rounded-xl cursor-pointer transition shrink-0 shadow-md"
                        >
                          ✕ Remove
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-amber-600/30">
                        <div>
                          <span className="text-amber-200/60 text-xs block font-semibold">Unit Price: ₹{item.price}</span>
                          <span className="text-amber-400 font-black text-xl">
                            ₹{(Number(item.price) * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Extra Large Plus Minus Controls */}
                        <div className="flex items-center bg-[#120B07] border-2 border-amber-500/60 rounded-2xl overflow-hidden shadow-2xl p-1">
                          <button
                            type="button"
                            onClick={(e) => updateQty(e, item.id, -1)}
                            className="w-11 h-11 bg-amber-950 hover:bg-amber-600 text-amber-300 hover:text-white font-black text-2xl rounded-xl flex items-center justify-center cursor-pointer select-none transition"
                          >
                            −
                          </button>
                          <span className="w-12 text-center font-black text-base text-amber-50">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => updateQty(e, item.id, 1)}
                            className="w-11 h-11 bg-amber-950 hover:bg-amber-600 text-amber-300 hover:text-white font-black text-2xl rounded-xl flex items-center justify-center cursor-pointer select-none transition"
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
                <div className="bg-gradient-to-b from-amber-950/80 to-amber-900/40 border-2 border-amber-600/40 p-6 rounded-3xl space-y-3 shadow-xl">
                  <label className="text-sm font-black text-amber-200 block uppercase tracking-wider flex items-center gap-2">
                    <span>📍</span> Table Number / Seating Zone
                  </label>
                  <input
                    type="text"
                    value={tableNo}
                    onChange={(e) => setTableNo(e.target.value)}
                    placeholder="e.g. Table 04 / Balcony Lounge"
                    className="w-full bg-amber-950/90 border-2 border-amber-600/40 text-amber-50 px-5 py-3.5 rounded-2xl text-sm outline-none focus:border-amber-400 placeholder:text-amber-200/40 font-bold"
                  />
                </div>
              )}

              {/* Kitchen Note */}
              <div className="bg-gradient-to-b from-amber-950/80 to-amber-900/40 border-2 border-amber-600/40 p-6 rounded-3xl space-y-3 shadow-xl">
                <label className="text-sm font-black text-amber-200 block uppercase tracking-wider flex items-center gap-2">
                  <span>📝</span> Barista / Kitchen Instructions
                </label>
                <textarea
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="e.g. Extra hot, less sugar, serve with extra napkins..."
                  rows="2"
                  className="w-full bg-amber-950/90 border-2 border-amber-600/40 text-amber-50 p-4 rounded-2xl text-sm outline-none focus:border-amber-400 placeholder:text-amber-200/40 resize-none font-bold"
                />
              </div>

              {/* Promo Code Feature */}
              <div className="bg-gradient-to-b from-amber-950/80 to-amber-900/40 border-2 border-amber-600/40 p-6 rounded-3xl space-y-3 shadow-xl">
                <label className="text-sm font-black text-amber-200 block uppercase tracking-wider flex items-center gap-2">
                  <span>🎟️</span> Apply Promo / Gift Coupon
                </label>
                <form onSubmit={handleApplyCoupon} className="flex gap-3">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Code (e.g. SURAJ)"
                    className="flex-1 bg-amber-950/90 border-2 border-amber-600/40 text-amber-50 px-5 py-3 rounded-2xl text-xs font-bold outline-none uppercase placeholder:normal-case placeholder:text-amber-200/40"
                  />
                  <button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-500 text-white font-black px-6 py-3 rounded-2xl text-xs uppercase tracking-wider transition cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {couponApplied && (
                  <p className="text-xs font-bold text-green-400 mt-1 flex items-center gap-1">
                    ✓ Coupon Applied! You saved ₹50.00 extra!
                  </p>
                )}
              </div>

              {/* Suggestions Pairings */}
              {suggestions.length > 0 && (
                <div className="bg-gradient-to-b from-amber-950/80 to-amber-900/40 border-2 border-amber-600/40 p-6 rounded-3xl space-y-4 shadow-xl">
                  <p className="text-sm font-black text-amber-50 uppercase tracking-wider flex items-center gap-2">
                    <span>🥐</span> Frequently Ordered Together
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {suggestions.slice(0, 4).map((sug) => (
                      <div key={sug.id} className="flex items-center justify-between bg-amber-950/90 p-3.5 rounded-2xl border-2 border-amber-600/30">
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={formatImageUrl(sug.image)} alt={sug.name} className="w-14 h-14 object-cover rounded-xl shrink-0 border border-amber-600/40" />
                          <div className="truncate">
                            <p className="text-xs font-black text-amber-50 truncate">{sug.name}</p>
                            <p className="text-xs text-amber-400 font-black">₹{sug.price}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => addItemDirect(sug)}
                          className="bg-amber-600/30 border-2 border-amber-500/50 text-amber-300 hover:bg-amber-600 hover:text-white px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer shrink-0 ml-2"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column - Prominent Zoomed Bill Breakdown */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">

              <div className="bg-gradient-to-b from-amber-950/95 via-amber-900/80 to-amber-950/95 border-2 border-amber-400/60 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b-2 border-amber-600/40 pb-4">
                  <h2 className="text-lg font-black text-amber-50 tracking-wide uppercase flex items-center gap-2">
                    <span>📜</span> Bill Summary
                  </h2>
                  <span className="bg-amber-600/40 border border-amber-500/60 text-amber-300 text-xs font-black px-3.5 py-1.5 rounded-full uppercase">
                    {totalCount} Items Total
                  </span>
                </div>

                {/* Structured Numbering List */}
                <div className="space-y-4 font-mono">

                  <div className="flex items-center justify-between p-4 bg-amber-950/90 rounded-2xl border border-amber-600/30">
                    <div className="flex items-center gap-3 text-xs font-black text-amber-200">
                      <span className="w-7 h-7 rounded-xl bg-amber-600/40 text-amber-300 flex items-center justify-center text-xs font-black font-sans">1</span>
                      <span>Items Subtotal</span>
                    </div>
                    <span className="text-lg font-black text-amber-50">₹{subtotal.toFixed(2)}</span>
                  </div>

                  {couponApplied && (
                    <div className="flex items-center justify-between p-4 bg-green-950/60 rounded-2xl border border-green-500/40">
                      <div className="flex items-center gap-3 text-xs font-black text-green-300">
                        <span className="w-7 h-7 rounded-xl bg-green-600/40 text-green-200 flex items-center justify-center text-xs font-black font-sans">✓</span>
                        <span>Promo Discount</span>
                      </div>
                      <span className="text-lg font-black text-green-400">-₹50.00</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-4 bg-amber-950/90 rounded-2xl border border-amber-600/30">
                    <div className="flex items-center gap-3 text-xs font-black text-amber-200">
                      <span className="w-7 h-7 rounded-xl bg-amber-600/40 text-amber-300 flex items-center justify-center text-xs font-black font-sans">2</span>
                      <span>Government GST (5%)</span>
                    </div>
                    <span className="text-lg font-black text-amber-50">₹{gstAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-amber-950/90 rounded-2xl border border-amber-600/30">
                    <div className="flex items-center gap-3 text-xs font-black text-amber-200">
                      <span className="w-7 h-7 rounded-xl bg-amber-600/40 text-amber-300 flex items-center justify-center text-xs font-black font-sans">3</span>
                      <span>Delivery / Service Charge</span>
                    </div>
                    <span className="text-xs font-black text-green-400 uppercase font-sans bg-green-950/90 border border-green-500/50 px-3 py-1 rounded-xl">FREE</span>
                  </div>

                </div>

                {/* Highlighted & Zoomed Grand Total Box */}
                <div className="p-6 bg-gradient-to-r from-amber-900/90 to-amber-950/90 border-2 border-amber-400/80 rounded-3xl space-y-1 text-center shadow-2xl">
                  <span className="text-xs font-black uppercase text-amber-300 tracking-widest block">
                    TOTAL AMOUNT PAYABLE
                  </span>
                  <p className="text-5xl font-black text-amber-400 font-mono tracking-tight mt-1">
                    ₹{grandTotal.toFixed(2)}
                  </p>
                  <p className="text-xs text-amber-200/70 font-sans mt-2">
                    Includes all taxes & delivery fees
                  </p>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-white font-black py-4.5 rounded-2xl text-sm md:text-base uppercase tracking-wider transition shadow-2xl shadow-amber-600/50 cursor-pointer flex items-center justify-center gap-3"
                >
                  <span>Proceed To Payment</span>
                  <span className="text-xl">→</span>
                </button>

                {/* Trust Badge */}
                <div className="text-center pt-2 border-t border-amber-600/30">
                  <p className="text-[11px] text-amber-200/60 font-bold flex items-center justify-center gap-1.5">
                    <span>🔒</span> 100% Safe & Encrypted Checkout
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
