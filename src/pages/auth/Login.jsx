import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FiCoffee } from "react-icons/fi";

const API_BASE_URL = "https://coffeehouse-backend-xtle.onrender.com";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        {
          headers: { "Content-Type": "application/json" }
        }
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
    <div className="flex-grow bg-[#120B07] text-amber-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-gradient-to-b from-amber-950/80 to-amber-900/40 backdrop-blur-xl border border-amber-600/30 rounded-3xl shadow-2xl p-6 sm:p-8">
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 rounded-2xl shadow-lg shadow-amber-950/80">
            <div className="w-full h-full bg-[#120B07] rounded-[14px] flex items-center justify-center text-amber-400 text-3xl">
              <FiCoffee />
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 bg-amber-950 border border-amber-500/40 text-amber-300 text-[11px] font-bold uppercase tracking-wider rounded-full mb-2 shadow-md">
            Welcome Back ☕
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-50">
            Sign In to <span className="text-amber-400">Coffee House</span>
          </h1>
          <p className="text-amber-200/60 text-xs sm:text-sm mt-1">
            Enjoy your favorite handcrafted coffee in one click.
          </p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-950/80 border border-red-600/40 text-red-300 text-xs font-semibold rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-amber-200 mb-1.5">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-3 bg-amber-950/80 border border-amber-600/30 focus:border-amber-400 text-amber-50 text-sm placeholder:text-amber-200/40 outline-none rounded-xl transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-200 mb-1.5">
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
                className="w-full px-4 py-3 pr-16 bg-amber-950/80 border border-amber-600/30 focus:border-amber-400 text-amber-50 text-sm placeholder:text-amber-200/40 outline-none rounded-xl transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-300 text-[11px] font-bold uppercase tracking-wider cursor-pointer select-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-amber-600/30 active:scale-[0.99] cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2 text-sm">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                Connecting to server...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="text-center mt-6 pt-5 border-t border-amber-600/20">
          <p className="text-xs text-amber-200/60">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-amber-400 hover:text-amber-300 font-bold transition underline"
            >
              Create Account
            </Link>
          </p>
        </div>

        <div className="text-center mt-3">
          <Link
            to="/"
            className="text-xs text-amber-200/50 hover:text-amber-300 transition inline-flex items-center gap-1"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
