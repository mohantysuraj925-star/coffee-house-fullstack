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

  const [tip, setTip] = useState(0);
  const [deliveryNote, setDeliveryNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoCodeApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const [formData, setFormData] = useState({
    name: "Suraj",
    phone: "",
    address: "",
    pincode: "",
    upiId: "Pushpanjali@upi",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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
  const grandTotal = Math.max(0, subTotal + deliveryFee + tip - discount);

  const upiPayString = `upi://pay?pa=Pushpanjali@upi&pn=Coffee%20House&am=${grandTotal.toFixed(2)}&cu=INR`;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiPayString)}`;

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCopyVpa = () => {
    navigator.clipboard.writeText("Pushpanjali@upi");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPromoCode = (e) => {
    e.preventDefault();
    if (promoApplied) return;
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === "COFFEE50" || cleanCode === "WELCOME10") {
      setDiscount(50);
      setPromoCodeApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid Code! Try COFFEE50");
    }
  };

  const triggerAudioAndVoice = (name) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
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
    } catch (e) {}

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

      {showReceipt && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="bg-[#140C09] border border-[#F59E0B]/50 rounded-[2.5rem] p-8 max-w-md w-full shadow-[0_0_80px_rgba(245,158,11,0.2)] space-y-6 text-center relative">
            <div className="w-20 h-20 bg-gradient-to-tr from-[#92400E] via-[#D97706] to-[#F59E0B] text-white rounded-full flex items-center justify-center mx-auto text-4xl shadow-xl ring-4 ring-[#F59E0B]/20">✓</div>
            <div>
              <span className="px-4 py-1 bg-[#F59E0B]/10 text-[#F59E0B] text-[11px] font-black uppercase tracking-widest rounded-full border border-[#F59E0B]/30">Verified Digital Receipt</span>
              <h2 className="text-3xl font-black text-white mt-3 tracking-tight">Payment Successful</h2>
              <p className="text-xs text-slate-400 mt-1 font-mono">{txnId}</p>
            </div>
            <div className="bg-[#0B0604] p-5 rounded-2xl border border-[#2A1710] text-left text-xs space-y-3">
              <div className="flex justify-between text-slate-400"><span>Customer:</span><span className="text-white font-bold">{formData.name || "Suraj"}</span></div>
              <div className="flex justify-between text-slate-400"><span>Contact:</span><span className="text-white font-bold">{formData.phone}</span></div>
              <div className="flex justify-between text-slate-400"><span>Payment Mode:</span><span className="text-[#F59E0B] font-extrabold uppercase">{paymentMethod}</span></div>
              {tip > 0 && <div className="flex justify-between text-slate-400"><span>Partner Tip:</span><span className="text-amber-400 font-bold">₹{tip}</span></div>}
              <div className="border-t border-[#2A1710] pt-3 flex justify-between font-extrabold text-sm"><span className="text-white">Amount Settled:</span><span className="text-emerald-400 text-base">₹{grandTotal.toFixed(2)}</span></div>
            </div>
            <button onClick={() => navigate("/")} className="w-full bg-gradient-to-r from-[#92400E] via-[#D97706] to-[#F59E0B] text-white font-black py-4 rounded-2xl transition text-xs tracking-wider uppercase shadow-xl shadow-amber-900/30">Return To Home ☕</button>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#140C09] border border-[#2A1710] rounded-full text-[#F59E0B] text-xs font-black uppercase tracking-widest mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-ping" />Secure Encrypted Gateway
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#F3EFEA]">Express <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#D97706] to-[#92400E]">Checkout</span></h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-[#110A07]/95 backdrop-blur-2xl border border-[#2A1710] rounded-[2.5rem] p-6 sm:p-10 shadow-2xl space-y-8">
            <form onSubmit={handlePayment} className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-[#2A1710]">
                  <span className="w-8 h-8 rounded-xl bg-[#D97706]/20 text-[#F59E0B] border border-[#F59E0B]/30 flex items-center justify-center font-black text-xs">1</span>
                  <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Shipping Details</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full px-4 py-3.5 bg-[#070403] border border-[#2A1710] rounded-2xl text-white text-xs outline-none focus:border-[#F59E0B]" />
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="Mobile Number" className="w-full px-4 py-3.5 bg-[#070403] border border-[#2A1710] rounded-2xl text-white text-xs outline-none focus:border-[#F59E0B]" />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <input type="text" name="address" required value={formData.address} onChange={handleChange} placeholder="Address" className="sm:col-span-2 px-4 py-3.5 bg-[#070403] border border-[#2A1710] rounded-2xl text-white text-xs outline-none focus:border-[#F59E0B]" />
                  <input type="text" name="pincode" required value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="px-4 py-3.5 bg-[#070403] border border-[#2A1710] rounded-2xl text-white text-xs outline-none focus:border-[#F59E0B]" />
                </div>
                <div>
                  <input type="text" value={deliveryNote} onChange={(e) => setDeliveryNote(e.target.value)} placeholder="Delivery / Cooking Instructions (Optional)" className="w-full px-4 py-3 bg-[#070403] border border-[#2A1710] rounded-xl text-white text-xs outline-none focus:border-[#F59E0B]" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-[#2A1710]">
                  <span className="w-8 h-8 rounded-xl bg-[#D97706]/20 text-[#F59E0B] border border-[#F59E0B]/30 flex items-center justify-center font-black text-xs">2</span>
                  <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Payment Options</h2>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button type="button" onClick={() => setPaymentMethod("upi")} className={`p-3 rounded-2xl border text-[11px] font-extrabold ${paymentMethod === "upi" ? "bg-[#D97706]/20 border-[#F59E0B] text-[#F59E0B]" : "bg-[#070403] border-[#2A1710] text-slate-400"}`}>📱 UPI QR</button>
                  <button type="button" onClick={() => setPaymentMethod("card")} className={`p-3 rounded-2xl border text-[11px] font-extrabold ${paymentMethod === "card" ? "bg-[#D97706]/20 border-[#F59E0B] text-[#F59E0B]" : "bg-[#070403] border-[#2A1710] text-slate-400"}`}>💳 Card</button>
                  <button type="button" onClick={() => setPaymentMethod("cod")} className={`p-3 rounded-2xl border text-[11px] font-extrabold ${paymentMethod === "cod" ? "bg-[#D97706]/20 border-[#F59E0B] text-[#F59E0B]" : "bg-[#070403] border-[#2A1710] text-slate-400"}`}>💵 Cash</button>
                </div>

                {paymentMethod === "upi" && (
                  <div className="bg-[#070403] border border-[#2A1710] rounded-2xl p-5 space-y-4 text-center">
                    <div className="flex items-center justify-between bg-[#140C09] px-4 py-2 rounded-xl border border-[#2A1710] text-xs">
                      <span className="text-slate-400 text-[11px]">Expires In:</span>
                      <span className="text-[#F59E0B] font-mono font-black text-xs">⏱️ {formatTime(timeLeft)}</span>
                    </div>
                    <div className="bg-[#140C09] p-4 rounded-2xl border border-[#2A1710] inline-block shadow-inner">
                      <img src={qrApiUrl} alt="UPI QR Code" className="w-48 h-48 mx-auto rounded-xl border border-slate-800 p-2 bg-white" />
                      <p className="text-xs font-bold text-[#F59E0B] mt-3">Coffee House (Pushpanjali@upi)</p>
                    </div>
                    <div className="flex gap-2">
                      <input type="text" readOnly value="Pushpanjali@upi" className="w-full px-4 py-3 bg-[#0B0604] border border-[#2A1710] rounded-xl text-white text-xs font-mono outline-none" />
                      <button type="button" onClick={handleCopyVpa} className="px-4 py-3 bg-[#2A1710] text-[#F59E0B] rounded-xl text-xs font-bold border border-[#F59E0B]/30">{copied ? "Copied! ✓" : "Copy VPA"}</button>
                    </div>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="bg-[#070403] border border-[#2A1710] rounded-2xl p-4 text-xs text-slate-300">
                    💵 Pay with cash upon doorstep delivery. Please keep exact change ready.
                  </div>
                )}
              </div>

              {/* Delivery Tip */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">Add Delivery Partner Tip</label>
                <div className="flex gap-2">
                  {[0, 20, 30, 50].map((amount) => (
                    <button key={amount} type="button" onClick={() => setTip(amount)} className={`px-4 py-2 rounded-xl border text-xs font-bold ${tip === amount ? "bg-[#F59E0B] text-black border-[#F59E0B]" : "bg-[#070403] border-[#2A1710] text-slate-300"}`}>
                      {amount === 0 ? "No Tip" : `+₹${amount}`}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#92400E] via-[#D97706] to-[#F59E0B] text-white font-black py-4 rounded-2xl text-xs uppercase shadow-xl shadow-amber-900/20">{loading ? "Processing..." : `Pay ₹${grandTotal.toFixed(2)} Now`}</button>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#110A07]/95 border border-[#2A1710] rounded-[2.5rem] p-6 sm:p-8 space-y-6 shadow-2xl">
              <h2 className="text-lg font-black text-white pb-3 border-b border-[#2A1710]">Order Summary</h2>
              <div className="space-y-3 max-h-56 overflow-y-auto">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div><p className="font-bold text-white">{item.menu_name || item.name || "Coffee Item"}</p><p className="text-slate-400 text-[10px]">Qty: {item.quantity}</p></div>
                    <p className="font-extrabold text-[#F59E0B]">₹{((item.menu_price || item.price || 0) * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#2A1710] pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>₹{subTotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-slate-400"><span>Delivery Charge</span><span>₹{deliveryFee.toFixed(2)}</span></div>
                {tip > 0 && <div className="flex justify-between text-amber-400 font-bold"><span>Delivery Tip</span><span>+ ₹{tip.toFixed(2)}</span></div>}
                <div className="border-t border-[#2A1710] pt-3 flex justify-between items-center font-black text-sm"><span className="text-white">Total Amount</span><span className="text-emerald-400 text-lg">₹{grandTotal.toFixed(2)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
