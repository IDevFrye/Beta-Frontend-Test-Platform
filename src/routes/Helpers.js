// Helpers.js
import { redirect } from "react-router-dom";

export const isAuthenticated = async () => {
  const token = localStorage.getItem("token");
  if (token) throw redirect("/");
  return null;
};



