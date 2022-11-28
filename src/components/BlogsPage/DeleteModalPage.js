// import usePagination from "@mui/material/usePagination/usePagination";
import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getBlogs, deleteBlog } from "../../redux/actions/blogs.action";

export default function DeleteModal() {
  let { id } = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleDelete = async () => {
    let res = await dispatch(deleteBlog(id));
    if (res) {
      navigate("/blogs");
    }
    console.log(id);
  };
  return (
    <div className="bg-white p-2 flex flex-col items-center gap-4">
      <h3 className="text-xl font-bold capitalize!">
        Blog once deleted Cannot be recovered
      </h3>
      <div className="flex justify-center">
        <button
          className="px-4 py-2 bg-red-600 rounded-full text-white"
          onClick={handleDelete}
        >
          Delete Blog
        </button>
      </div>
    </div>
  );
}
