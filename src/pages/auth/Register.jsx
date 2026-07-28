import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const API_BASE_URL = "https://coffeehouse-backend-xtle.onrender.com";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pre-warm the backend server immediately on page mount
  useEffect(() => {
    axios.get(`${API_BASE_URL}/`).catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/register/`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.token || response.status === 201) {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        navigate("/login");
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0F172A] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#0284C7]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-[#1E293B]/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl shadow-2xl p-6 sm:p-8">
        <div className="flex justify-center mb-3">
          <div className="w-20 h-20 p-2 bg-[#0F172A]/60 rounded-2xl border border-slate-700/50 shadow-inner flex items-center justify-center">
            <img src={logo} alt="Coffee House" className="w-full h-full object-contain drop-shadow" />
          </div>
        </div>

        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 bg-[#38BDF8]/10 text-[#38BDF8] text-[11px] font-bold uppercase tracking-wider rounded-full mb-2 border border-[#38BDF8]/20">
            Join Us ☕
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Create an <span className="text-[#38BDF8]">Account</span>
          </h1>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-950/70 border border-red-800/80 text-red-300 text-xs rounded-xl shadow-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
              className="w-full px-4 py-3 bg-[#0F172A]/80 border border-slate-700 rounded-xl text-white text-sm outline-none focus:border-[#38BDF8]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 bg-[#0F172A]/80 border border-slate-700 rounded-xl text-white text-sm outline-none focus:border-[#38BDF8]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              className="w-full px-4 py-3 bg-[#0F172A]/80 border border-slate-700 rounded-xl text-white text-sm outline-none focus:border-[#38BDF8]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-[#0284C7] to-[#2563EB] hover:from-[#0369A1] hover:to-[#1D4ED8] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all duration-300 cursor-pointer"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-6 pt-5 border-t border-slate-800">
          <p className="text-xs text-[#94A3B8]">
            Already have an account?{" "}
            <Link to="/login" className="text-[#38BDF8] hover:text-[#0284C7] font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
