import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_BASE_URL = "https://coffeehouse-backend-xtle.onrender.com";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { username, password } = formData;

    // Direct Developer/Admin Master Login
    if (username.trim() === "admin1" && password === "Admin1234") {
      localStorage.setItem("token", "admin_master_token_coffeehouse");
      localStorage.setItem("user_role", "admin");
      localStorage.setItem("username", "admin1");
      setLoading(false);
      navigate("/admin/dashboard");
      return;
    }

    // Normal Customer Login via Backend Database
    try {
      const res = await axios.post(`${API_BASE_URL}/api/login/`, {
        username,
        password,
      });

      if (res.data && (res.data.token || res.data.access)) {
        const token = res.data.token || res.data.access;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);

        if (res.data.is_staff || res.data.is_superuser) {
          localStorage.setItem("user_role", "admin");
          navigate("/admin/dashboard");
        } else {
          localStorage.setItem("user_role", "customer");
          navigate("/");
        }
      } else {
        setError("Invalid Username or Password!");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Login failed! Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-[#111827] border border-slate-800 p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-white">Welcome Back</h2>
          <p className="text-xs text-slate-400 mt-1">Sign in to continue to Coffee House</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl text-center font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Username</label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full bg-[#1E293B] border border-slate-700 text-white px-4 py-3 rounded-xl text-xs outline-none focus:border-[#38BDF8]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full bg-[#1E293B] border border-slate-700 text-white px-4 py-3 rounded-xl text-xs outline-none focus:border-[#38BDF8]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#0284C7] to-[#2563EB] hover:from-[#0369A1] text-white rounded-xl text-xs font-bold transition shadow-lg active:scale-95 cursor-pointer"
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#38BDF8] font-bold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
