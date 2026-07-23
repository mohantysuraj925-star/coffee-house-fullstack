import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // ============================
  // FETCH CART
  // ============================
  const fetchCart = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/cart/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setCart(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchCart();
  }, []);

  // ============================
  // INSTANT OPTIMISTIC UPDATE
  // ============================
  const updateQuantity = (e, id, currentQuantity, change) => {
    e.preventDefault();
    e.stopPropagation();

    const newQuantity = currentQuantity + change;

    if (newQuantity < 1) {
      removeItem(e, id);
      return;
    }

    // Instant UI Update (Zero Delay)
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    // Silent API Call in Background
    axios.put(
      `${import.meta.env.VITE_BASE_URL}/cart/${id}/`,
      { quantity: newQuantity },
      { headers: { Authorization: `Token ${token}` } }
    ).catch((err) => {
      console.error("Failed to update quantity on server:", err);
    });
  };

  // ============================
  // DELETE ITEM
  // ============================
  const removeItem = (e, id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Instant UI Removal
    setCart((prev) => prev.filter((item) => item.id !== id));

    // Silent API Delete
    axios.delete(
      `${import.meta.env.VITE_BASE_URL}/cart/${id}/`,
      { headers: { Authorization: `Token ${token}` } }
    ).catch((error) => console.error(error));
  };

  // ============================
  // GRAND TOTAL
  // ============================
  const grandTotal = cart.reduce(
    (total, item) => total + Number(item.menu_price || 0) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#0F172A] py-14">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[#38BDF8] text-sm font-semibold uppercase tracking-wider">
            Coffee House
          </p>

          <h1 className="text-4xl font-bold text-white mt-2">
            Your Cart
          </h1>

          <p className="text-[#94A3B8] mt-2">
            Review your delicious selections.
          </p>
        </div>

        {error && (
          <div className="bg-red-950/50 text-red-300 border border-red-800 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-slate-700 border-t-[#38BDF8] rounded-full animate-spin mx-auto" />

            <p className="text-[#94A3B8] mt-4">
              Loading your cart...
            </p>
          </div>
        ) : cart.length === 0 ? (
          /* EMPTY CART */
          <div className="bg-[#1E293B] rounded-2xl p-12 text-center border border-slate-700">
            <div className="text-6xl">
              🛒
            </div>

            <h2 className="text-2xl font-bold text-white mt-5">
              Your cart is empty
            </h2>

            <p className="text-[#94A3B8] mt-2">
              Add something delicious from our menu.
            </p>

            <Link
              to="/menu"
              className="inline-block mt-6 bg-[#0284C7] hover:bg-[#0369A1] text-white px-7 py-3 rounded-xl font-semibold transition"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-7">
            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#1E293B] border border-slate-700 rounded-2xl p-4 flex gap-5"
                >
                  {/* Image */}
                  <div className="w-28 h-28 bg-[#0F172A] rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                    {item.menu_image ? (
                      <img
                        src={item.menu_image}
                        alt={item.menu_name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        ☕
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-[#38BDF8]">
                      {item.menu_category}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">
                      {item.menu_name}
                    </h3>

                    <p className="text-[#38BDF8] font-bold mt-1">
                      ₹{item.menu_price}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-[#0F172A]">
                        <button
                          type="button"
                          onClick={(e) => updateQuantity(e, item.id, item.quantity, -1)}
                          className="w-9 h-9 text-white hover:bg-slate-800 cursor-pointer font-bold select-none"
                        >
                          −
                        </button>

                        <span className="w-10 text-center font-semibold text-white select-none">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => updateQuantity(e, item.id, item.quantity, 1)}
                          className="w-9 h-9 text-white hover:bg-slate-800 cursor-pointer font-bold select-none"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={(e) => removeItem(e, item.id)}
                        className="text-red-400 hover:text-red-300 text-sm font-semibold cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div>
              <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-6 sticky top-6">
                <h2 className="text-xl font-bold text-white">
                  Order Summary
                </h2>

                <div className="flex justify-between text-[#94A3B8] mt-6">
                  <span>Items</span>
                  <span>
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                </div>

                <div className="border-t border-slate-800 my-5" />

                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">Total</span>

                  <span className="text-2xl font-bold text-[#38BDF8]">
                    ₹{grandTotal.toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/checkout")}
                  className="w-full mt-6 bg-[#0284C7] hover:bg-[#0369A1] text-white py-3 rounded-xl font-semibold cursor-pointer transition"
                >
                  Proceed to Checkout
                </button>

                <Link
                  to="/menu"
                  className="block text-center text-[#38BDF8] hover:underline font-semibold text-sm mt-4"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
