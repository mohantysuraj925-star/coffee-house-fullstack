import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const token = localStorage.getItem("token");
  const isSuperuser = localStorage.getItem("is_superuser") === "true";

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!isSuperuser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminPrivateRoute;