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
    pincode: "",
    upiId: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
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
      }, 3000);
    }, 1800);
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#120B09] flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-[#D97706]/15 rounded-full blur-[130px] pointer-events-none animate-pulse" />
        
        <div className="relative z-10 bg-[#1C120E]/90 backdrop-blur-2xl border border-[#D97706]/30 rounded-3xl p-8 sm:p-10 max-w-md w-full text-center shadow-[0_0_60px_rgba(217,119,6,0.2)]">
          <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#F59E0B]/20 rounded-full animate-ping" />
            <div className="relative w-20 h-20 bg-gradient-to-tr from-[#B45309] via-[#D97706] to-[#F59E0B] text-white rounded-full flex items-center justify-center text-4xl shadow-xl">
              ✓
            </div>
          </div>
          
          <span className="inline-block px-4 py-1.5 bg-[#F59E0B]/10 text-[#F59E0B] text-[11px] font-black uppercase tracking-widest rounded-full mb-3 border border-[#F59E0B]/30">
            Order Confirmed ☕
          </span>
          
          <h2 className="text-3xl font-black text-[#FFF8F0] mb-2 tracking-tight">
            Payment Successful!
          </h2>
          
          <p className="text-[#D1C7BD] text-xs sm:text-sm mb-6 leading-relaxed">
            Your coffee order has been sent to our barista. Your drink is being prepared!
          </p>
          
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#F59E0B] bg-[#120B09]/80 py-3 rounded-2xl border border-[#3D2920]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-ping" />
            Redirecting to Home Page...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#120B09] text-[#FFF8F0] px-4 py-10 relative overflow-hidden font-sans">
      {/* Background Coffee Atmosphere Blows */}
      <div className="absolute -top-32 -left-32 w-[450px] h-[450px] bg-[#B45309]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#D97706]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        
        {/* Header Badge */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1C120E] border border-[#3D2920] rounded-full text-[#F59E0B] text-xs font-black uppercase tracking-widest shadow-inner mb-3">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
            Handcrafted Coffee Checkout
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#FFF8F0]">
            Complete Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#D97706] to-[#B45309]">Order</span>
          </h1>
          <p className="text-[#A89A8C] text-xs sm:text-sm mt-1">
            Fill in delivery details & choose your preferred payment option.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#1C120E]/85 backdrop-blur-2xl border border-[#3D2920] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-8">
          <form onSubmit={handlePayment} className="space-y-8">
            
            {/* Step 1: Delivery Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#3D2920]">
                <span className="w-8 h-8 bg-[#D97706]/20 border border-[#F59E0B]/40 text-[#F59E0B] text-xs font-black rounded-xl flex items-center justify-center">
                  1
                </span>
                <h2 className="text-sm font-bold text-[#FFF8F0] uppercase tracking-wider">
                  Delivery Details
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D1C7BD] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3.5 bg-[#120B09] border border-[#3D2920] rounded-xl text-white text-sm placeholder:text-[#6B5A50] outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D1C7BD] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit phone number"
                    className="w-full px-4 py-3.5 bg-[#120B09] border border-[#3D2920] rounded-xl text-white text-sm placeholder:text-[#6B5A50] outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#D1C7BD] mb-1.5">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House / Hostel No, Street, Area"
                    className="w-full px-4 py-3.5 bg-[#120B09] border border-[#3D2920] rounded-xl text-white text-sm placeholder:text-[#6B5A50] outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D1C7BD] mb-1.5">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    className="w-full px-4 py-3.5 bg-[#120B09] border border-[#3D2920] rounded-xl text-white text-sm placeholder:text-[#6B5A50] outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#3D2920]">
                <span className="w-8 h-8 bg-[#D97706]/20 border border-[#F59E0B]/40 text-[#F59E0B] text-xs font-black rounded-xl flex items-center justify-center">
                  2
                </span>
                <h2 className="text-sm font-bold text-[#FFF8F0] uppercase tracking-wider">
                  Payment Method
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col items-center gap-2 text-center select-none ${
                    paymentMethod === "upi"
                      ? "bg-gradient-to-b from-[#D97706]/25 to-[#120B09] border-[#F59E0B] text-white shadow-[0_0_25px_rgba(245,158,11,0.2)] scale-[1.02]"
                      : "bg-[#120B09]/80 border-[#3D2920] text-[#A89A8C] hover:border-[#5C4235]"
                  }`}
                >
                  <span className="text-2xl">📱</span>
                  <span className="text-xs font-bold">UPI / PhonePe</span>
                </div>

                <div
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col items-center gap-2 text-center select-none ${
                    paymentMethod === "card"
                      ? "bg-gradient-to-b from-[#D97706]/25 to-[#120B09] border-[#F59E0B] text-white shadow-[0_0_25px_rgba(245,158,11,0.2)] scale-[1.02]"
                      : "bg-[#120B09]/80 border-[#3D2920] text-[#A89A8C] hover:border-[#5C4235]"
                  }`}
                >
                  <span className="text-2xl">💳</span>
                  <span className="text-xs font-bold">Debit / Credit</span>
                </div>

                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col items-center gap-2 text-center select-none ${
                    paymentMethod === "cod"
                      ? "bg-gradient-to-b from-[#D97706]/25 to-[#120B09] border-[#F59E0B] text-white shadow-[0_0_25px_rgba(245,158,11,0.2)] scale-[1.02]"
                      : "bg-[#120B09]/80 border-[#3D2920] text-[#A89A8C] hover:border-[#5C4235]"
                  }`}
                >
                  <span className="text-2xl">💵</span>
                  <span className="text-xs font-bold">Pay on Delivery</span>
                </div>
              </div>

              {/* Dynamic Payment Option Cards */}
              {paymentMethod === "upi" && (
                <div className="bg-[#120B09] p-5 rounded-2xl border border-[#3D2920] space-y-4 text-center">
                  <p className="text-xs font-medium text-[#A89A8C]">
                    Scan QR code using GPay, PhonePe, or Paytm
                  </p>
                  
                  <div className="w-36 h-36 bg-[#FFF8F0] p-2 mx-auto rounded-2xl shadow-lg flex flex-col items-center justify-center">
                    <div className="w-full h-full border-2 border-dashed border-[#3D2920] rounded-xl flex flex-col items-center justify-center text-slate-900">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#B45309]">Coffee House</span>
                      <span className="text-xs font-extrabold text-[#D97706] mt-0.5">[ UPI QR ]</span>
                      <span className="text-[9px] text-slate-500 mt-1">Scan & Pay</span>
                    </div>
                  </div>

                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    placeholder="Enter UPI ID (e.g. mobile@upi)"
                    className="w-full px-4 py-3 bg-[#1C120E] border border-[#3D2920] rounded-xl text-white text-xs placeholder:text-[#6B5A50] outline-none focus:border-[#F59E0B]"
                  />
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="bg-[#120B09] p-5 rounded-2xl border border-[#3D2920] space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#A89A8C] mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="4532 •••• •••• 8901"
                      maxLength="16"
                      className="w-full px-4 py-3 bg-[#1C120E] border border-[#3D2920] rounded-xl text-white text-xs outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-[#A89A8C] mb-1">Expiry Date</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-[#1C120E] border border-[#3D2920] rounded-xl text-white text-xs outline-none focus:border-[#F59E0B]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#A89A8C] mb-1">CVV Code</label>
                      <input
                        type="password"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleChange}
                        placeholder="•••"
                        maxLength="3"
                        className="w-full px-4 py-3 bg-[#1C120E] border border-[#3D2920] rounded-xl text-white text-xs outline-none focus:border-[#F59E0B]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="bg-[#120B09] p-5 rounded-2xl border border-[#3D2920] text-center text-xs text-[#D1C7BD]">
                  ☕ Pay with cash or UPI directly when your coffee arrives.
                </div>
              )}
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#F59E0B] hover:opacity-95 text-white font-black py-4 rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(217,119,6,0.35)] active:scale-[0.99] cursor-pointer tracking-wide text-sm disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Brewing Your Order...
                </span>
              ) : (
                "Place Order & Pay Now ☕"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
