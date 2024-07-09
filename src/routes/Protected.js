import React from "react";
import { Outlet, Navigate, redirect } from "react-router-dom";

export const Protected = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export const handleProtected = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }
  return null; 
};
