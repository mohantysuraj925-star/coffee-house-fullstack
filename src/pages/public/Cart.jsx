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

    if (list.length === 0 && Object.keys(savedMap).length === 0) {
      savedMap["m2"] = 7;
      saveCartState(savedMap);
      const ff = menus.find(m => m.name === "French Fries") || menus[0];
      list = [{ ...ff, quantity: 7 }];
    }

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
    if (couponCode.trim().toUpperCase() === "COFFEE10") {
      setDiscount(10);
      setCouponMessage("10% Discount applied!");
    } else {
      setCouponMessage("Invalid Coupon (Try: COFFEE10)");
    }
  };

  const formatImageUrl = (url) => {
    if (!url) return "https://images.unsplash.com/photo-1572442388796-11668ba67e53";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    const baseUrl = import.meta.env.VITE_BASE_URL || "";
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
    <div className="bg-[#0B0F17] text-slate-100 py-6 md:py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-widest">
              Review & Checkout
            </span>
            <h1 className="text-2xl md:text-3xl font-black mt-1 text-white">Your Order Cart</h1>
          </div>

          <Link
            to="/menu"
            className="text-[#38BDF8] hover:text-[#60A5FA] text-xs font-bold flex items-center gap-1.5 transition"
          >
            ← Add More Items
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          
          <div className="lg:col-span-2 space-y-4">
            
            <div className="bg-[#111827] border border-slate-800 p-2.5 rounded-2xl flex gap-2">
              <button
                type="button"
                onClick={() => setOrderType("dinein")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  orderType === "dinein" ? "bg-[#0284C7] text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                <span>🍽️ Dine-In / Table Service</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType("takeaway")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  orderType === "takeaway" ? "bg-[#0284C7] text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                <span>🛍️ Express Takeaway</span>
              </button>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#111827]/80 border border-slate-800/80 rounded-2xl p-4 flex gap-4 items-center shadow-lg"
              >
                <div className="w-16 h-16 bg-[#0B0F17] rounded-xl overflow-hidden shrink-0 border border-slate-800">
                  <img
                    src={formatImageUrl(item.image)}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">
                    {item.name}
                  </h3>

                  <p className="text-[#38BDF8] font-black text-sm mt-0.5">
                    ₹{item.price}{" "}
                    <span className="text-slate-400 font-normal text-xs ml-1">
                      (Total: ₹{(Number(item.price) * item.quantity).toFixed(2)})
                    </span>
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-[#0B0F17] border border-slate-800 rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={(e) => updateQty(e, item.id, -1)}
                        className="w-7 h-7 text-[#38BDF8] hover:bg-[#0284C7] hover:text-white font-black text-sm cursor-pointer select-none"
                      >
                        −
                      </button>
                      <span className="w-7 text-center font-bold text-xs text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => updateQty(e, item.id, 1)}
                        className="w-7 h-7 text-[#38BDF8] hover:bg-[#0284C7] hover:text-white font-black text-sm cursor-pointer select-none"
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

            {orderType === "dinein" && (
              <div className="bg-[#111827] border border-slate-800 p-4 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-slate-300 block">
                  📍 Seating Location / Table Number
                </span>
                <input
                  type="text"
                  value={tableNo}
                  onChange={(e) => setTableNo(e.target.value)}
                  placeholder="Enter Table No. or Zone (e.g. Table 04 / Balcony)"
                  className="w-full bg-[#0B0F17] border border-slate-700 text-white px-3 py-2 rounded-xl text-xs outline-none focus:border-[#38BDF8]"
                />
              </div>
            )}

            <div className="bg-[#111827] border border-slate-800 p-4 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-slate-300 block">
                ☕ Kitchen Preparation Preferences
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer bg-[#0B0F17] p-2 rounded-xl border border-slate-800">
                  <input
                    type="checkbox"
                    checked={cookingInstructions.lessSugar}
                    onChange={(e) => setCookingInstructions({...cookingInstructions, lessSugar: e.target.checked})}
                    className="accent-[#38BDF8]"
                  />
                  <span>Less Sugar</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-[#0B0F17] p-2 rounded-xl border border-slate-800">
                  <input
                    type="checkbox"
                    checked={cookingInstructions.extraHot}
                    onChange={(e) => setCookingInstructions({...cookingInstructions, extraHot: e.target.checked})}
                    className="accent-[#38BDF8]"
                  />
                  <span>Serve Extra Hot</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-[#0B0F17] p-2 rounded-xl border border-slate-800">
                  <input
                    type="checkbox"
                    checked={cookingInstructions.noIce}
                    onChange={(e) => setCookingInstructions({...cookingInstructions, noIce: e.target.checked})}
                    className="accent-[#38BDF8]"
                  />
                  <span>No Ice / Less Ice</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-[#0B0F17] p-2 rounded-xl border border-slate-800">
                  <input
                    type="checkbox"
                    checked={cookingInstructions.addNapkins}
                    onChange={(e) => setCookingInstructions({...cookingInstructions, addNapkins: e.target.checked})}
                    className="accent-[#38BDF8]"
                  />
                  <span>Extra Napkins</span>
                </label>
              </div>
            </div>

            <div className="bg-[#111827] border border-slate-800 p-4 rounded-2xl space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                📝 Special Cooking / Serving Instructions
              </label>
              <textarea
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="e.g. Extra hot, less sugar, serve with extra napkins..."
                rows="2"
                className="w-full bg-[#0B0F17] border border-slate-700 text-white p-2.5 rounded-xl text-xs outline-none focus:border-[#38BDF8] resize-none"
              />
            </div>

            <form onSubmit={applyCoupon} className="bg-[#111827] border border-slate-800 p-4 rounded-2xl flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-300">Have a promo code? (Use: COFFEE10)</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="bg-[#0B0F17] border border-slate-700 text-white px-3 py-1.5 rounded-xl text-xs flex-1 outline-none uppercase"
                />
                <button
                  type="submit"
                  className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <p className={`text-[10px] font-bold ${discount > 0 ? "text-emerald-400" : "text-amber-400"}`}>
                  {couponMessage}
                </p>
              )}
            </form>

            {suggestions.length > 0 && (
              <div className="bg-[#111827] border border-slate-800 p-4 rounded-2xl">
                <p className="text-xs font-bold text-white mb-3">🥐 Add Popular Pairings</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {suggestions.map((sug) => (
                    <div key={sug.id} className="flex items-center justify-between bg-[#0B0F17] p-2.5 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <img src={formatImageUrl(sug.image)} alt={sug.name} className="w-10 h-10 object-cover rounded-lg" />
                        <div>
                          <p className="text-xs font-bold text-white">{sug.name}</p>
                          <p className="text-[10px] text-[#38BDF8] font-bold">₹{sug.price}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => addItemDirect(sug)}
                        className="bg-[#0284C7]/20 border border-[#38BDF8]/30 text-[#38BDF8] hover:bg-[#0284C7] hover:text-white px-3 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          <div className="space-y-4">
            
            <div className="bg-gradient-to-r from-amber-500/10 via-[#111827] to-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎁</span>
                <div>
                  <p className="text-xs font-bold text-amber-300">Coffee House Rewards</p>
                  <p className="text-[10px] text-slate-400">Earn +{Math.floor(grandTotal / 10)} Coins on this order</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
              <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
                Bill Details
              </h2>

              <div className="space-y-2 text-slate-300 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Item Total ({totalCount} items)</span>
                  <span className="font-bold text-white">₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({discount}%)</span>
                    <span className="font-bold">-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Gourmet GST (5%)</span>
                  <span className="font-bold text-white">₹{gstAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Table Delivery Charge</span>
                  <span className="font-bold text-emerald-400">FREE</span>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-3 flex justify-between items-center">
                <span className="font-bold text-xs text-white">Grand Total</span>
                <span className="text-lg font-black text-[#38BDF8]">
                  ₹{grandTotal.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="w-full bg-gradient-to-r from-[#0284C7] to-[#2563EB] text-white py-3 rounded-xl font-bold text-xs shadow-md cursor-pointer active:scale-95"
              >
                Proceed to Checkout →
              </button>
            </div>

            <div className="bg-[#111827] border border-slate-800 p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Barista Status
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Estimated prep time: <strong className="text-white">10 - 15 mins</strong>. Table delivery / Express pickup is active.
              </p>
            </div>

            <div className="bg-[#111827] border border-slate-800 p-4 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span>💬</span>
                <span>Barista Help Desk</span>
              </div>
              <span className="text-[#38BDF8] font-bold cursor-pointer hover:underline">
                Call Counter →
              </span>
            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800/80 pt-6">
          <div className="bg-[#111827] border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
            <span className="text-2xl">☕</span>
            <div>
              <p className="text-xs font-bold text-white">Freshly Brewed</p>
              <p className="text-[10px] text-slate-400">Made on order</p>
            </div>
          </div>
          <div className="bg-[#111827] border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="text-xs font-bold text-white">Express Delivery</p>
              <p className="text-[10px] text-slate-400">Ready in 15 mins</p>
            </div>
          </div>
          <div className="bg-[#111827] border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <p className="text-xs font-bold text-white">Secure Payment</p>
              <p className="text-[10px] text-slate-400">Encrypted checkout</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
