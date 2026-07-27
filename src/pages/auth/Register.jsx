import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
        "http://127.0.0.1:8000/api/register/",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 8000
        }
      );

      if (response.data && (response.data.user || response.data.message?.includes("Successfully"))) {
        navigate("/login");
      } else {
        const errorMsg = typeof response.data === "object" 
          ? Object.values(response.data).flat().join(" ") 
          : "Registration failed";
        setError(errorMsg);
      }
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        setError("Server response timed out. Please check backend.");
      } else {
        setError(
          err.response?.data?.message ||
          err.response?.data?.username?.[0] ||
          err.response?.data?.email?.[0] ||
          "Registration failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0F172A] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0284C7]/10 rounded-full"></div>
      <div className="absolute -bottom-40 -right-32 w-[500px] h-[500px] bg-[#2563EB]/10 rounded-full"></div>

      <div className="relative z-10 w-full max-w-md bg-[#1E293B] border border-slate-700 rounded-3xl shadow-xl p-7 md:p-9">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 flex items-center justify-center">
            <img
              src={logo}
              alt="Coffee House"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-[#38BDF8] text-xs font-semibold uppercase tracking-widest mb-2">
            Coffee House
          </p>
          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>
          <p className="text-[#94A3B8] text-sm mt-2">
            Sign up to start ordering your favorite coffee.
          </p>
        </div>

        {error && (
          <div className="mb-5 px-4 py-3 bg-red-950/60 border border-red-800 text-red-300 text-sm rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-3.5 bg-[#0F172A] border border-slate-700 rounded-xl text-white placeholder:text-[#64748B] outline-none focus:ring-2 focus:ring-[#0284C7]/30 focus:border-[#0284C7] transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3.5 bg-[#0F172A] border border-slate-700 rounded-xl text-white placeholder:text-[#64748B] outline-none focus:ring-2 focus:ring-[#0284C7]/30 focus:border-[#0284C7] transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3.5 bg-[#0F172A] border border-slate-700 rounded-xl text-white placeholder:text-[#64748B] outline-none focus:ring-2 focus:ring-[#0284C7]/30 focus:border-[#0284C7] transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0284C7] hover:bg-[#0369A1] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 cursor-pointer disabled:cursor-not-allowed hover:shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                Creating account...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="text-center mt-7 pt-6 border-t border-slate-800">
          <p className="text-sm text-[#94A3B8]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#38BDF8] hover:underline font-semibold"
            >
              Sign In
            </Link>
          </p>
        </div>

        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-sm text-[#94A3B8] hover:text-[#38BDF8] transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
