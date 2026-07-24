import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const [formData, setFormData] = useState({
    name: "Suraj",
    phone: "",
    address: "",
    pincode: "",
    upiId: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const baseUrl = (import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000/api").replace(/\/+$/, "");
        const response = await axios.get(`${baseUrl}/cart/`, {
          headers: { Authorization: `Token ${token}` },
        });

        if (Array.isArray(response.data) && response.data.length > 0) {
          setCartItems(response.data);
          const total = response.data.reduce(
            (acc, item) => acc + Number(item.menu_price || item.menu?.price || 0) * item.quantity,
            0
          );
          setSubTotal(total);
        } else {
          setSubTotal(340);
          setCartItems([
            { id: 1, menu_name: "Signature Caramel Latte", quantity: 1, menu_price: 200 },
            { id: 2, menu_name: "Artisanal Butter Croissant", quantity: 1, menu_price: 140 },
          ]);
        }
      } catch (err) {
        setSubTotal(340);
        setCartItems([
          { id: 1, menu_name: "Signature Caramel Latte", quantity: 1, menu_price: 200 },
          { id: 2, menu_name: "Artisanal Butter Croissant", quantity: 1, menu_price: 140 },
        ]);
      }
    };

    fetchCartDetails();
  }, [token]);

  const deliveryFee = subTotal > 0 ? 40 : 0;
  const grandTotal = subTotal + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const triggerAudioAndVoice = (name) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.12);
      osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.24);

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.log("Audio Error:", e);
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const userName = name.trim() || "Suraj";
      const text = `${userName} pay... Payment of rupees ${grandTotal} successful on Coffee House.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.88;
      utterance.pitch = 1.0;
      utterance.lang = "en-IN";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if ("speechSynthesis" in window) {
      const dummyUtterance = new SpeechSynthesisUtterance("");
      window.speechSynthesis.speak(dummyUtterance);
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowReceipt(true);
      triggerAudioAndVoice(formData.name);
    }, 1800);
  };

  const txnId = "CH-TXN-" + Math.floor(100000 + Math.random() * 900000);
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#090503] text-[#F3EFEA] px-4 py-10 sm:py-16 relative overflow-hidden font-sans">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D97706]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#B45309]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* DIGITAL RECEIPT MODAL */}
      {showReceipt && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="bg-[#140C09] border border-[#F59E0B]/50 rounded-[2.5rem] p-8 max-w-md w-full shadow-[0_0_80px_rgba(245,158,11,0.2)] space-y-6 text-center relative animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-tr from-[#92400E] via-[#D97706] to-[#F59E0B] text-white rounded-full flex items-center justify-center mx-auto text-4xl shadow-xl ring-4 ring-[#F59E0B]/20">
              ✓
            </div>

            <div>
              <span className="px-4 py-1 bg-[#F59E0B]/10 text-[#F59E0B] text-[11px] font-black uppercase tracking-widest rounded-full border border-[#F59E0B]/30">
                Verified Digital Receipt
              </span>
              <h2 className="text-3xl font-black text-white mt-3 tracking-tight">Payment Successful</h2>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                {txnId}
              </p>
            </div>

            <div className="bg-[#0B0604] p-5 rounded-2xl border border-[#2A1710] text-left text-xs space-y-3">
              <div className="flex justify-between text-slate-400">
                <span>Customer:</span>
                <span className="text-white font-bold">{formData.name || "Suraj"}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Contact:</span>
                <span className="text-white font-bold">{formData.phone}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Payment Mode:</span>
                <span className="text-[#F59E0B] font-extrabold uppercase">{paymentMethod}</span>
              </div>
              <div className="border-t border-[#2A1710] pt-3 flex justify-between font-extrabold text-sm">
                <span className="text-white">Amount Settled:</span>
                <span className="text-emerald-400 text-base">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-[#1F100A] border border-[#F59E0B]/25 p-3.5 rounded-xl text-left">
              <p className="text-[11px] text-[#F59E0B] font-extrabold">ℹ️ Trial Simulator Notice:</p>
              <p className="text-[10px] text-slate-300 mt-0.5 leading-relaxed">
                Yeh sandbox testing environment hai. Aapke bank account se koi real fund deduct nahi hua hai. Enjoy your coffee!
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="w-full bg-gradient-to-r from-[#92400E] via-[#D97706] to-[#F59E0B] hover:opacity-95 text-white font-black py-4 rounded-2xl transition text-xs tracking-wider uppercase cursor-pointer shadow-xl shadow-amber-900/30"
            >
              Return To Home ☕
            </button>
          </div>
        </div>
      )}

      {/* Main Terminal Grid */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#140C09] border border-[#2A1710] rounded-full text-[#F59E0B] text-xs font-black uppercase tracking-widest mb-4 shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-ping" />
            Secure Encrypted Gateway
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#F3EFEA]">
            Express <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#D97706] to-[#92400E]">Checkout</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-md mx-auto">
            Complete your delivery destination and finalize secure payment.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Panel */}
          <div className="lg:col-span-7 bg-[#110A07]/95 backdrop-blur-2xl border border-[#2A1710] rounded-[2.5rem] p-6 sm:p-10 shadow-2xl space-y-8">
            <form onSubmit={handlePayment} className="space-y-8">
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-[#2A1710]">
                  <span className="w-8 h-8 rounded-xl bg-[#D97706]/20 text-[#F59E0B] border border-[#F59E0B]/30 flex items-center justify-center font-black text-xs">
                    1
                  </span>
                  <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                    Shipping Details
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Suraj"
                      className="w-full px-4 py-3.5 bg-[#070403] border border-[#2A1710] rounded-2xl text-white text-xs outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mobile Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="w-full px-4 py-3.5 bg-[#070403] border border-[#2A1710] rounded-2xl text-white text-xs outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Delivery Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Hostel / House No, Street Name"
                      className="w-full px-4 py-3.5 bg-[#070403] border border-[#2A1710] rounded-2xl text-white text-xs outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="751024"
                      className="w-full px-4 py-3.5 bg-[#070403] border border-[#2A1710] rounded-2xl text-white text-xs outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-[#2A1710]">
                  <span className="w-8 h-8 rounded-xl bg-[#D97706]/20 text-[#F59E0B] border border-[#F59E0B]/30 flex items-center justify-center font-black text-xs">
                    2
                  </span>
                  <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                    Payment Channel
                  </h2>
                </div>

                <div className="grid grid-cols-3 gap-3.5">
                  <div
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col items-center gap-2 text-center select-none ${
                      paymentMethod === "upi"
                        ? "bg-gradient-to-b from-[#92400E]/30 to-[#070403] border-[#F59E0B] text-white shadow-[0_0_25px_rgba(245,158,11,0.2)] scale-[1.02]"
                        : "bg-[#070403] border-[#2A1710] text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-2xl">📱</span>
                    <span className="text-xs font-extrabold">UPI / QR</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col items-center gap-2 text-center select-none ${
                      paymentMethod === "card"
                        ? "bg-gradient-to-b from-[#92400E]/30 to-[#070403] border-[#F59E0B] text-white shadow-[0_0_25px_rgba(245,158,11,0.2)] scale-[1.02]"
                        : "bg-[#070403] border-[#2A1710] text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-2xl">💳</span>
                    <span className="text-xs font-extrabold">Card</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col items-center gap-2 text-center select-none ${
                      paymentMethod === "cod"
                        ? "bg-gradient-to-b from-[#92400E]/30 to-[#070403] border-[#F59E0B] text-white shadow-[0_0_25px_rgba(245,158,11,0.2)] scale-[1.02]"
                        : "bg-[#070403] border-[#2A1710] text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-2xl">💵</span>
                    <span className="text-xs font-extrabold">Cash</span>
                  </div>
                </div>

                {paymentMethod === "upi" && (
                  <div className="bg-[#070403] p-5 rounded-2xl border border-[#2A1710] text-center space-y-4">
                    <p className="text-xs text-slate-400 font-medium">Scan QR code with any UPI App</p>
                    <div className="w-36 h-36 bg-white rounded-2xl mx-auto p-2 border border-slate-300 flex items-center justify-center shadow-lg">
                      <div className="text-center text-slate-900">
                        <p className="text-[9px] font-black uppercase tracking-wider text-[#92400E]">Coffee House</p>
                        <p className="text-xs font-black text-[#D97706] mt-1">[ SECURE QR ]</p>
                        <p className="text-[8px] text-slate-500 mt-1">Instant Pay</p>
                      </div>
                    </div>
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleChange}
                      placeholder="Enter UPI ID (e.g. user@paytm)"
                      className="w-full px-4 py-3 bg-[#110A07] border border-[#2A1710] rounded-xl text-white text-xs outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="bg-[#070403] p-5 rounded-2xl border border-[#2A1710] space-y-3.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="4532 •••• •••• 8901"
                        maxLength="16"
                        className="w-full px-4 py-3 bg-[#110A07] border border-[#2A1710] rounded-xl text-white text-xs outline-none focus:border-[#F59E0B]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 bg-[#110A07] border border-[#2A1710] rounded-xl text-white text-xs outline-none focus:border-[#F59E0B]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">CVV Code</label>
                        <input
                          type="password"
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={handleChange}
                          placeholder="•••"
                          maxLength="3"
                          className="w-full px-4 py-3 bg-[#110A07] border border-[#2A1710] rounded-xl text-white text-xs outline-none focus:border-[#F59E0B]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="bg-[#070403] p-4 rounded-2xl border border-[#2A1710] text-center text-xs text-slate-300">
                    💵 Pay via cash or UPI directly when your barista delivers your order.
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#92400E] via-[#D97706] to-[#F59E0B] hover:opacity-95 text-white font-black py-4 rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(217,119,6,0.3)] active:scale-[0.99] cursor-pointer tracking-wider text-sm disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing Payment...
                  </span>
                ) : (
                  `Pay ₹${grandTotal.toFixed(2)} & Place Order ☕`
                )}
              </button>
            </form>
          </div>

          {/* Right Summary Panel */}
          <div className="lg:col-span-5 bg-[#110A07]/95 backdrop-blur-2xl border border-[#2A1710] rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-6 sticky top-6">
            <h2 className="text-base font-extrabold text-white flex items-center justify-between pb-4 border-b border-[#2A1710]">
              <span>Order Summary</span>
              <span className="text-xs bg-[#F59E0B]/10 text-[#F59E0B] px-3 py-1 rounded-full border border-[#F59E0B]/30 font-black">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items
              </span>
            </h2>

            <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1 divide-y divide-[#2A1710]/60">
              {cartItems.map((item, idx) => (
                <div key={idx} className="pt-3 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-extrabold text-white">{item.menu_name || item.name || "Coffee Item"}</p>
                    <p className="text-slate-400 mt-0.5">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-extrabold text-[#F59E0B]">
                    ₹{(Number(item.menu_price || item.price || 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-[#070403] p-5 rounded-2xl border border-[#2A1710] space-y-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Items Subtotal</span>
                <span className="text-white font-bold">₹{subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Express Delivery Fee</span>
                <span className="text-white font-bold">₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-[#2A1710] pt-3 flex justify-between text-sm font-black">
                <span className="text-white">Total Payable</span>
                <span className="text-[#F59E0B] text-base">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-[#1A0E08] p-3.5 rounded-2xl border border-[#F59E0B]/20 text-[11px] text-slate-300 flex items-center gap-3">
              <span className="text-base">🛡️</span>
              <span>End-to-End SSL Secure Sandbox Transaction</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
