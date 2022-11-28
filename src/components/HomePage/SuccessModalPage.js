// import usePagination from "@mui/material/usePagination/usePagination";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// import { getBlogs, deleteBlog } from "../../redux/actions/blogs.action";
import { auth } from "../../firebase-config";
import AppContext from "../../context/AppContext";

export default function SuccessModalPage() {
  let contextData = useContext(AppContext);
  // let { id } = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogin = () => {
    auth.signOut();
    contextData.setIsAuthenticated(true);
    localStorage.setItem("IsAuthenticated", true);
    navigate("/blogs");
  };
  return (
    <div className="bg-white p-2 flex flex-col items-center gap-4">
      <h3 className="text-xl font-bold capitalize!">Success!</h3>
      <div className="flex justify-center">
        <button
          className="px-4 py-2 bg-blue-600 rounded-full text-white"
          onClick={handleLogin}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
