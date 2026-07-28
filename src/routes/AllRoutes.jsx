import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Menu from "../pages/public/Menu";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminPrivateRoute from "./AdminPrivateRoute";
import AdminUser from "../pages/admin/AdminUser";
import AdminMenue from "../pages/admin/AdminMenue";
import Cart from "../pages/public/Cart";
import AdminCart from "../pages/admin/AdminCart";
import Checkout from "../pages/public/Checkout";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* Redirect /admin to /admin/dashboard */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

      <Route element={<AdminPrivateRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/dashboard/" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUser />} />
        <Route path="/admin/users/" element={<AdminUser />} />
        <Route path="/admin/menu" element={<AdminMenue />} />
        <Route path="/admin/menu/" element={<AdminMenue />} />
        <Route path="/admin/cart" element={<AdminCart />} />
        <Route path="/admin/cart/" element={<AdminCart />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
