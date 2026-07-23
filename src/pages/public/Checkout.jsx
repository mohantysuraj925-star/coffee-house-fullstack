import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [cart, setCart] = useState([]);

  const [formData, setFormData] = useState({
    customer_name: "",
    phone: "",
    address: "",
    payment_method: "COD",
  });

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [error, setError] = useState("");

  // ========================================
  // FETCH CART
  // ========================================

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

      setError("Failed to load your cart.");
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

  // ========================================
  // INPUT CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ========================================
  // TOTAL
  // ========================================

  const totalAmount = cart.reduce(
    (total, item) =>
      total +
      Number(item.menu_price) * Number(item.quantity),
    0
  );

  // ========================================
  // PLACE ORDER
  // ========================================

  const handleCheckout = async (e) => {
    e.preventDefault();

    try {
      setPlacingOrder(true);
      setError("");

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/checkout/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      navigate("/order-success", {
        state: {
          orderId: response.data.order_id,
          total: response.data.total_amount,
        },
      });
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to place your order."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F1E7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#E6D5C5] border-t-[#E97824] rounded-full animate-spin mx-auto" />

          <p className="text-[#765C50] mt-4">
            Preparing checkout...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F1E7] py-14">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* ================= HEADER ================= */}

        <div className="mb-10">
          <Link
            to="/cart"
            className="text-[#765C50] hover:text-[#E97824] font-semibold text-sm"
          >
            ← Back to Cart
          </Link>

          <p className="text-[#20845E] text-sm font-semibold uppercase tracking-wider mt-6">
            Coffee House
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-[#3B120D] mt-2">
            Checkout
          </h1>

          <p className="text-[#765C50] mt-2">
            Complete your details and place your order.
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
            {error}
          </div>
        )}

        {cart.length === 0 ? (
          /* EMPTY CART */

          <div className="bg-white border border-[#E6D5C5] rounded-2xl p-12 text-center">
            <div className="text-5xl">
              🛒
            </div>

            <h2 className="text-xl font-bold text-[#3B120D] mt-4">
              Your cart is empty
            </h2>

            <p className="text-[#765C50] mt-2">
              Add something to your cart before checkout.
            </p>

            <Link
              to="/menu"
              className="inline-block mt-6 bg-[#E97824] text-white px-7 py-3 rounded-xl font-semibold"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleCheckout}
            className="grid grid-cols-1 lg:grid-cols-3 gap-7"
          >
            {/* ================= CUSTOMER DETAILS ================= */}

            <div className="lg:col-span-2">
              <div className="bg-white border border-[#E6D5C5] rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#3B120D]">
                  Customer Details
                </h2>

                <p className="text-[#765C50] text-sm mt-1 mb-7">
                  Enter the information required for your order.
                </p>

                <div className="space-y-5">
                  {/* NAME */}

                  <div>
                    <label className="block text-sm font-semibold text-[#3B120D] mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full px-4 py-3 bg-[#FFFCF8] border border-[#E6D5C5] rounded-xl outline-none focus:border-[#E97824] focus:ring-2 focus:ring-[#E97824]/20"
                    />
                  </div>

                  {/* PHONE */}

                  <div>
                    <label className="block text-sm font-semibold text-[#3B120D] mb-2">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                      className="w-full px-4 py-3 bg-[#FFFCF8] border border-[#E6D5C5] rounded-xl outline-none focus:border-[#E97824] focus:ring-2 focus:ring-[#E97824]/20"
                    />
                  </div>

                  {/* ADDRESS */}

                  <div>
                    <label className="block text-sm font-semibold text-[#3B120D] mb-2">
                      Delivery Address
                    </label>

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your complete delivery address"
                      rows="4"
                      required
                      className="w-full px-4 py-3 bg-[#FFFCF8] border border-[#E6D5C5] rounded-xl outline-none resize-none focus:border-[#E97824] focus:ring-2 focus:ring-[#E97824]/20"
                    />
                  </div>

                  {/* PAYMENT */}

                  <div>
                    <label className="block text-sm font-semibold text-[#3B120D] mb-3">
                      Payment Method
                    </label>

                    <label className="flex items-center gap-4 border border-[#E97824] bg-[#FFF8F2] rounded-xl p-4 cursor-pointer">
                      <input
                        type="radio"
                        name="payment_method"
                        value="COD"
                        checked={
                          formData.payment_method === "COD"
                        }
                        onChange={handleChange}
                        className="accent-[#E97824]"
                      />

                      <div>
                        <p className="font-semibold text-[#3B120D]">
                          Cash on Delivery
                        </p>

                        <p className="text-sm text-[#765C50]">
                          Pay when your order arrives.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= ORDER SUMMARY ================= */}

            <div>
              <div className="bg-white border border-[#E6D5C5] rounded-2xl p-6 sticky top-6">
                <h2 className="text-xl font-bold text-[#3B120D]">
                  Order Summary
                </h2>

                {/* ITEMS */}

                <div className="mt-6 space-y-4 max-h-72 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3"
                    >
                      <div className="w-14 h-14 bg-[#F8F1E7] rounded-lg overflow-hidden shrink-0">
                        {item.menu_image ? (
                          <img
                            src={item.menu_image}
                            alt={item.menu_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            ☕
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold text-sm text-[#3B120D]">
                          {item.menu_name}
                        </p>

                        <p className="text-xs text-[#765C50] mt-1">
                          ₹{item.menu_price} × {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold text-sm text-[#3B120D]">
                        ₹
                        {(
                          Number(item.menu_price) *
                          Number(item.quantity)
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E6D5C5] my-5" />

                {/* ITEMS COUNT */}

                <div className="flex justify-between text-sm text-[#765C50]">
                  <span>Items</span>

                  <span>
                    {cart.reduce(
                      (total, item) =>
                        total + Number(item.quantity),
                      0
                    )}
                  </span>
                </div>

                {/* TOTAL */}

                <div className="flex justify-between items-center mt-5">
                  <span className="font-bold text-[#3B120D]">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-[#E97824]">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>

                {/* PLACE ORDER */}

                <button
                  type="submit"
                  disabled={placingOrder}
                  className="w-full mt-6 bg-[#20845E] hover:bg-[#176B4C] disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold cursor-pointer disabled:cursor-not-allowed transition"
                >
                  {placingOrder
                    ? "Placing Order..."
                    : "Place Order"}
                </button>

                <p className="text-xs text-center text-[#765C50] mt-3">
                  By placing your order, you confirm your order details.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Checkout;