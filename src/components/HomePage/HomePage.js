import React, { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import BlogPage from "./BlogPage";
import HomeHeader from "./HomeHeader";
import HomeMain from "./HomeMain";
import RecommendedPost from "./RecommendedPost";

export default function HomePage() {
  return (
    <div>
      <HomeHeader />
      <HomeMain />
      <RecommendedPost />
      <div className="mx-20 sm:mx-0 xs:mx-0">
        <BlogPage />
      </div>
    </div>
  );
}
