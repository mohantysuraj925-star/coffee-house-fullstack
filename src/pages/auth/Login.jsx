import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        "http://127.0.0.1:8000/api/login/",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "is_superuser",
          response.data.is_superuser ? "true" : "false"
        );

        if (response.data.is_superuser) {
          navigate("/admin/dashboard/");
        } else {
          navigate("/");
        }
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          "Login failed. Check server logs."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0F172A] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#0284C7]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-[#1E293B]/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl shadow-2xl p-6 sm:p-8">
        <div className="flex justify-center mb-3">
          <div className="w-20 h-20 p-2 bg-[#0F172A]/60 rounded-2xl border border-slate-700/50 shadow-inner flex items-center justify-center">
            <img
              src={logo}
              alt="Coffee House"
              className="w-full h-full object-contain drop-shadow"
            />
          </div>
        </div>

        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 bg-[#38BDF8]/10 text-[#38BDF8] text-[11px] font-bold uppercase tracking-wider rounded-full mb-2 border border-[#38BDF8]/20">
            Welcome Back ☕
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Sign In to <span className="text-[#38BDF8]">Coffee House</span>
          </h1>
          <p className="text-[#94A3B8] text-xs sm:text-sm mt-1">
            Enjoy your favorite handcrafted coffee in one click.
          </p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-950/70 border border-red-800/80 text-red-300 text-xs rounded-xl shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-3 bg-[#0F172A]/80 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 bg-[#0F172A]/80 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-[#0284C7] to-[#2563EB] hover:from-[#0369A1] hover:to-[#1D4ED8] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-cyan-500/20 active:scale-[0.99] cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2 text-sm">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                Authenticating...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="text-center mt-6 pt-5 border-t border-slate-800">
          <p className="text-xs text-[#94A3B8]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#38BDF8] hover:text-[#0284C7] font-semibold transition"
            >
              Create Account
            </Link>
          </p>
        </div>

        <div className="text-center mt-3">
          <Link
            to="/"
            className="text-xs text-slate-400 hover:text-white transition inline-flex items-center gap-1"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
