import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import "antd/dist/reset.css";
import RegisterPage from "./components/HomePage/RegisterPage";
import { auth } from "./firebase-config";
import LoginPage from "./components/HomePage/LoginPage";
import BlogPage from "./components/BlogsPage/BlogPage";
import RequireAuth from "./components/AuthPage/RequireAuth";
import AppContext from "./context/AppContext";
import PublicPage from "./components/HomePage/PublicPage";
import LandingPage from "./components/BlogsPage/LandingPage";
import BlogDetailPage from "./components/BlogsPage/BlogDetailPage";
import NewStory from "./components/NewBlogPage/NewStory";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewBlogPage from "./components/NewBlogPage/NewBlogPage";
import UserPage from "./components/UserPage/UserPage";
import PageNotFound from "./PageNotFound";

// toast.configure();

function App() {
  const contextData = useContext(AppContext);
  const CreatePost = React.lazy(() =>
    import("./components/NewBlogPage/NewStory")
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        contextData.setIsAuthenticated(true);
        localStorage.setItem("IsAuthenticated", true);
      }
      console.log(user);
    });
    console.log(localStorage.getItem("IsAuthenticated"));
  }, []);
  return (
    <Routes>
      <Route path="/" element={<PublicPage />}>
        <Route index element={<HomePage />} />
        <Route path={"/register"} element={<RegisterPage />} />
        <Route path={"/login"} element={<LoginPage />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route path="blogs" element={<LandingPage />}>
          <Route index element={<BlogPage />} />
          {/* <Route path="/category/:id" element={<Cat} */}
          <Route path=":id" element={<BlogDetailPage />} />
          <Route path="userpage" element={<UserPage />} />
        </Route>
        <Route path="new-story/:type" element={<NewBlogPage />}>
          {/* <Route path="new-story" element={<NewStory />} /> */}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
