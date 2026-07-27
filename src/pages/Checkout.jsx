import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    upiId: "",
    cardNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 2500);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#0F172A] flex items-center justify-center px-4">
        <div className="bg-[#1E293B] border border-slate-700 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
          <p className="text-slate-400 text-sm mb-6">
            Your coffee order has been placed successfully and is being brewed with love ☕.
          </p>
          <div className="text-xs text-[#38BDF8] animate-pulse">
            Redirecting to home...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0F172A] px-4 py-10">
      <div className="max-w-xl mx-auto bg-[#1E293B] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Secure <span className="text-[#38BDF8]">Checkout</span> 💳
        </h1>

        <form onSubmit={handlePayment} className="space-y-5">
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              1. Delivery Information
            </h2>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-[#0F172A] border border-slate-700 rounded-xl text-white text-sm outline-none focus:border-[#38BDF8]"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className="w-full px-4 py-3 bg-[#0F172A] border border-slate-700 rounded-xl text-white text-sm outline-none focus:border-[#38BDF8]"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Delivery Address</label>
              <textarea
                name="address"
                required
                rows="2"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street, City, Pincode"
                className="w-full px-4 py-3 bg-[#0F172A] border border-slate-700 rounded-xl text-white text-sm outline-none focus:border-[#38BDF8]"
              ></textarea>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              2. Select Payment Method
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`py-3 px-4 rounded-xl border text-xs font-semibold transition ${
                  paymentMethod === "upi"
                    ? "bg-[#0284C7]/20 border-[#0284C7] text-[#38BDF8]"
                    : "bg-[#0F172A] border-slate-700 text-slate-400"
                }`}
              >
                UPI / QR
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`py-3 px-4 rounded-xl border text-xs font-semibold transition ${
                  paymentMethod === "card"
                    ? "bg-[#0284C7]/20 border-[#0284C7] text-[#38BDF8]"
                    : "bg-[#0F172A] border-slate-700 text-slate-400"
                }`}
              >
                Debit/Credit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`py-3 px-4 rounded-xl border text-xs font-semibold transition ${
                  paymentMethod === "cod"
                    ? "bg-[#0284C7]/20 border-[#0284C7] text-[#38BDF8]"
                    : "bg-[#0F172A] border-slate-700 text-slate-400"
                }`}
              >
                Cash on Delivery
              </button>
            </div>
          </div>

          {paymentMethod === "upi" && (
            <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-700 text-center space-y-3">
              <p className="text-xs text-slate-400">Scan QR Code or Enter UPI ID</p>
              <div className="w-32 h-32 bg-white mx-auto rounded-lg flex items-center justify-center text-slate-900 font-bold text-xs shadow-inner">
                [ UPI QR CODE ]
              </div>
              <input
                type="text"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                placeholder="username@upi"
                className="w-full px-4 py-2.5 bg-[#1E293B] border border-slate-700 rounded-xl text-white text-sm outline-none focus:border-[#38BDF8]"
              />
            </div>
          )}

          {paymentMethod === "card" && (
            <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-700 space-y-3">
              <label className="block text-xs text-slate-400">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="4532 •••• •••• 8901"
                maxLength="16"
                className="w-full px-4 py-2.5 bg-[#1E293B] border border-slate-700 rounded-xl text-white text-sm outline-none focus:border-[#38BDF8]"
              />
            </div>
          )}

          {paymentMethod === "cod" && (
            <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-700 text-center text-xs text-slate-300">
              💵 Pay with cash when your delicious coffee is delivered to your doorstep.
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#0284C7] to-[#2563EB] hover:from-[#0369A1] hover:to-[#1D4ED8] text-white font-semibold py-3.5 rounded-xl transition shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                Processing Payment...
              </span>
            ) : (
              "Pay Securely & Place Order"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
