import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const API_BASE_URL = "https://coffeehouse-backend-xtle.onrender.com";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        `${API_BASE_URL}/api/login/`,
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
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0B132B] flex items-center justify-center px-4 py-8 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00A8E8]/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-[#1C2541] border border-sky-500/30 rounded-3xl shadow-[0_0_30px_rgba(0,168,232,0.15)] p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 p-2 bg-[#0B132B] rounded-2xl border border-sky-400/40 shadow-md mx-auto mb-4 flex items-center justify-center">
            <img src={logo} alt="Coffee House" className="w-full h-full object-contain" />
          </div>
          <span className="inline-block px-3 py-1 bg-[#00A8E8]/20 text-[#00A8E8] text-[11px] font-extrabold uppercase tracking-widest rounded-full mb-2 border border-[#00A8E8]/40">
            Encrypted Login ☕
          </span>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sky-200/70 text-xs mt-1">
            Access your Coffee House account
          </p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-900/60 border border-red-500 text-red-200 text-xs rounded-xl shadow-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-sky-200 mb-1.5 uppercase tracking-wider">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-3 bg-[#0B132B] border border-sky-500/40 rounded-xl text-white text-base placeholder:text-slate-400 outline-none focus:border-[#00A8E8] focus:ring-1 focus:ring-[#00A8E8] transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-sky-200 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 bg-[#0B132B] border border-sky-500/40 rounded-xl text-white text-base placeholder:text-slate-400 outline-none focus:border-[#00A8E8] focus:ring-1 focus:ring-[#00A8E8] transition pr-14"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-sky-500/20 hover:bg-sky-500/40 text-sky-300 px-2 py-1 rounded-md text-[11px] font-bold border border-sky-400/30 cursor-pointer transition"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#00A8E8] hover:bg-[#007EA7] active:bg-[#003459] disabled:opacity-60 text-white font-black text-xs tracking-wider uppercase py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-sky-500/30 cursor-pointer border border-sky-300/30"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-6 pt-5 border-t border-sky-900/60 space-y-2 text-xs">
          <p className="text-slate-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#00A8E8] hover:text-sky-300 underline font-extrabold">
              Create Account
            </Link>
          </p>
          <div>
            <Link to="/" className="text-sky-200/60 hover:text-white">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
