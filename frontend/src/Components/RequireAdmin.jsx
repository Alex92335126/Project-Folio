import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RequireAdmin(props) {
  const isAdmin = localStorage.getItem("ROLE")
  console.log('isAdmin', isAdmin)
  return isAdmin === '1' ? props.children : <Navigate to="/" />;
}