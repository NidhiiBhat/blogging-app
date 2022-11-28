import React from "react";
import { Outlet } from "react-router-dom";
import HomePage from "./HomePage";

export default function PublicPage() {
  return <Outlet />;
}
