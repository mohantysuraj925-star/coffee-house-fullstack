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
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [orderType, setOrderType] = useState("dinein");
  const [tableNo, setTableNo] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [cookingInstructions, setCookingInstructions] = useState({
    lessSugar: false,
    extraHot: false,
    noIce: false,
    addNapkins: true,
  });

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

  const applyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "COFFEE10" || couponCode.trim().toUpperCase() === "COFFEE20") {
      setDiscount(20);
      setCouponMessage("20% Discount applied!");
    } else {
      setCouponMessage("Invalid Coupon (Try: COFFEE20)");
    }
  };

  const formatImageUrl = (url) => {
    if (!url) return "https://images.unsplash.com/photo-1572442388796-11668ba67e53";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    const baseUrl = "https://coffeehouse-backend-xtle.onrender.com" || "";
    const cleanUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    return `${cleanUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const allMenus = getSavedMenus();
  const suggestions = allMenus.filter(m => !cartItems.some(ci => ci.id === m.id));
  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price || 0) * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const gstAmount = (subtotal * 0.05);
  const grandTotal = Math.max(0, subtotal - discountAmount + gstAmount);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-[#1a0f07] text-amber-50 min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header Title */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-amber-600/30 pb-4">
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">
              Review & Checkout
            </span>
            <h1 className="text-2xl md:text-3xl font-black mt-1 text-amber-50">Your Order Cart</h1>
          </div>

          <Link
            to="/menu"
            className="text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1.5 transition"
          >
            ← Add More Items
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 rounded-3xl p-8 space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center text-3xl mx-auto border border-amber-500/30">
              🛒
            </div>
            <h2 className="text-lg font-bold text-amber-50">Your Cart is Empty</h2>
            <p className="text-xs text-amber-200/60">Looks like you haven't added any coffee or bites yet.</p>
            <Link
              to="/menu"
              className="inline-block bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-lg shadow-amber-600/30"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 items-start">

            {/* Left Column - Cart List & Preferences */}
            <div className="lg:col-span-2 space-y-4">

              {/* Order Type Toggle */}
              <div className="bg-gradient-to-b from-amber-950/80 to-amber-900/40 border border-amber-600/30 p-2 rounded-2xl flex gap-2">
                <button
                  type="button"
                  onClick={() => setOrderType("dinein")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    orderType === "dinein" ? "bg-amber-600 text-white shadow-md" : "text-amber-200/70 hover:text-white"
                  }`}
                >
                  <span>🍽️ Dine-In / Table Service</span>
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

              {/* Cart Items List */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 rounded-2xl p-4 flex gap-4 items-center shadow-xl"
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
                    <h3 className="text-sm font-bold text-amber-50 truncate">
                      {item.name}
                    </h3>

                    <p className="text-amber-400 font-black text-sm mt-0.5">
                      ₹{item.price}{" "}
                      <span className="text-amber-200/50 font-normal text-xs ml-1">
                        (Total: ₹{(Number(item.price) * item.quantity).toFixed(2)})
                      </span>
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-[#120B07] border border-amber-500/40 rounded-xl overflow-hidden">
                        <button
                          type="button"
                          onClick={(e) => updateQty(e, item.id, -1)}
                          className="w-7 h-7 text-amber-300 hover:bg-amber-600 hover:text-white font-black text-sm cursor-pointer select-none transition"
                        >
                          −
                        </button>
                        <span className="w-7 text-center font-bold text-xs text-amber-50">
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

                      <button
                        type="button"
                        onClick={(e) => removeItem(e, item.id)}
                        className="text-red-400 text-xs font-bold cursor-pointer hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Table Number Option */}
              {orderType === "dinein" && (
                <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 p-4 rounded-2xl space-y-2">
                  <span className="text-xs font-bold text-amber-200 block">
                    📍 Seating Location / Table Number
                  </span>
                  <input
                    type="text"
                    value={tableNo}
                    onChange={(e) => setTableNo(e.target.value)}
                    placeholder="Enter Table No. or Zone (e.g. Table 04 / Balcony)"
                    className="w-full bg-amber-950/80 border border-amber-600/30 text-amber-50 px-3.5 py-2 rounded-xl text-xs outline-none focus:border-amber-400 placeholder:text-amber-200/40"
                  />
                </div>
              )}

              {/* Preparation Preferences */}
              <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 p-4 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-amber-200 block">
                  ☕ Kitchen Preparation Preferences
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs text-amber-200/70">
                  <label className="flex items-center gap-2 cursor-pointer bg-amber-950/80 p-2.5 rounded-xl border border-amber-600/20 hover:border-amber-500/40">
                    <input
                      type="checkbox"
                      checked={cookingInstructions.lessSugar}
                      onChange={(e) => setCookingInstructions({...cookingInstructions, lessSugar: e.target.checked})}
                      className="accent-amber-500"
                    />
                    <span>Less Sugar</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer bg-amber-950/80 p-2.5 rounded-xl border border-amber-600/20 hover:border-amber-500/40">
                    <input
                      type="checkbox"
                      checked={cookingInstructions.extraHot}
                      onChange={(e) => setCookingInstructions({...cookingInstructions, extraHot: e.target.checked})}
                      className="accent-amber-500"
                    />
                    <span>Serve Extra Hot</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer bg-amber-950/80 p-2.5 rounded-xl border border-amber-600/20 hover:border-amber-500/40">
                    <input
                      type="checkbox"
                      checked={cookingInstructions.noIce}
                      onChange={(e) => setCookingInstructions({...cookingInstructions, noIce: e.target.checked})}
                      className="accent-amber-500"
                    />
                    <span>No Ice / Less Ice</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer bg-amber-950/80 p-2.5 rounded-xl border border-amber-600/20 hover:border-amber-500/40">
                    <input
                      type="checkbox"
                      checked={cookingInstructions.addNapkins}
                      onChange={(e) => setCookingInstructions({...cookingInstructions, addNapkins: e.target.checked})}
                      className="accent-amber-500"
                    />
                    <span>Extra Napkins</span>
                  </label>
                </div>
              </div>

              {/* Special Note */}
              <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 p-4 rounded-2xl space-y-2">
                <label className="text-xs font-bold text-amber-200 block">
                  📝 Special Instructions
                </label>
                <textarea
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="e.g. Extra hot, less sugar, serve with extra napkins..."
                  rows="2"
                  className="w-full bg-amber-950/80 border border-amber-600/30 text-amber-50 p-2.5 rounded-xl text-xs outline-none focus:border-amber-400 placeholder:text-amber-200/40 resize-none"
                />
              </div>

              {/* Promo Code Form */}
              <form onSubmit={applyCoupon} className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 p-4 rounded-2xl flex flex-col gap-2">
                <span className="text-xs font-bold text-amber-200">Have a promo code? (Try: COFFEE20)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="bg-amber-950/80 border border-amber-600/30 text-amber-50 px-3.5 py-2 rounded-xl text-xs flex-1 outline-none uppercase placeholder:text-amber-200/40"
                  />
                  <button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-md shadow-amber-600/20"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p className={`text-[10px] font-bold ${discount > 0 ? "text-green-400" : "text-amber-400"}`}>
                    {couponMessage}
                  </p>
                )}
              </form>

              {/* Pairings Suggestions */}
              {suggestions.length > 0 && (
                <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 border border-amber-600/30 p-4 rounded-2xl">
                  <p className="text-xs font-bold text-amber-50 mb-3">🥐 Add Popular Pairings</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {suggestions.slice(0, 4).map((sug) => (
                      <div key={sug.id} className="flex items-center justify-between bg-amber-950/80 p-2.5 rounded-xl border border-amber-600/20">
                        <div className="flex items-center gap-2.5">
                          <img src={formatImageUrl(sug.image)} alt={sug.name} className="w-10 h-10 object-cover rounded-lg" />
                          <div>
                            <p className="text-xs font-bold text-amber-50">{sug.name}</p>
                            <p className="text-[10px] text-amber-400 font-bold">₹{sug.price}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => addItemDirect(sug)}
                          className="bg-amber-600/20 border border-amber-500/40 text-amber-300 hover:bg-amber-600 hover:text-white px-3 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column - Summary & Order Action */}
            <div className="space-y-4">

              {/* Rewards Banner */}
              <div className="bg-gradient-to-r from-amber-700/30 via-amber-600/20 to-amber-800/30 border border-amber-500/40 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <p className="text-xs font-bold text-amber-300">Coffee House Rewards</p>
                    <p className="text-[10px] text-amber-200/70">Earn +{Math.floor(grandTotal / 10)} Coins on this order</p>
                  </div>
                </div>
              </div>

              {/* Bill Details */}
              <div className="bg-gradient-to-b from-amber-950/80 to-amber-900/40 border border-amber-600/30 rounded-2xl p-5 shadow-2xl space-y-4">
                <h2 className="text-sm font-bold text-amber-50 border-b border-amber-600/30 pb-2">
                  Bill Summary
                </h2>

                <div className="space-y-2 text-amber-200/80 text-xs">
                  <div className="flex justify-between">
                    <span>Item Total ({totalCount} items)</span>
                    <span className="font-bold text-amber-50">₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400 font-semibold">
                      <span>Promo Discount ({discount}%)</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Government Taxes (GST 5%)</span>
                    <span className="font-bold text-amber-50">₹{gstAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-amber-600/30 pt-3 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-amber-200/50 tracking-wider">Grand Total</p>
                    <p className="text-xl font-black text-amber-400">₹{grandTotal.toFixed(2)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert(`Order Placed! Total: ₹${grandTotal.toFixed(2)}`)}
                    className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-black px-6 py-3 rounded-xl text-xs transition shadow-lg shadow-amber-600/30 cursor-pointer"
                  >
                    Proceed to Pay →
                  </button>
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
