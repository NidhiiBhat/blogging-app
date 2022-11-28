import React, { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { Outlet, Navigate } from "react-router-dom";
import App from "../../App";
import { auth } from "../../firebase-config";

export default function RequireAuth() {
  let contextData = useContext(AppContext);

  return localStorage.getItem("IsAuthenticated") === "true" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
}
