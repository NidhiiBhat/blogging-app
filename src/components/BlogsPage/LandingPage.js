import React from "react";
import { Outlet } from "react-router-dom";
import BlogHeader from "./BlogHeader";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <BlogHeader />
      <Outlet />;
    </div>
  );
}
