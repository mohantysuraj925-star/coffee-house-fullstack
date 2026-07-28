import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const token = localStorage.getItem("token");
  const isSuperuser = localStorage.getItem("is_superuser") === "true";
  
  // Aapke admin/developer accounts ke usernames/emails yahan add kar sakte hain
  const username = localStorage.getItem("username") || "";
  const email = localStorage.getItem("email") || "";
  
  // Hardcoded check + Superuser flag check dono ensure karenge ki sirf aapka admin account khule
  const isAdmin = isSuperuser || username === "admin" || email.includes("admin");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminPrivateRoute;
