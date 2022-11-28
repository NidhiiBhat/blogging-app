import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../BlogsPage/BlogCard";
import {
  filteredArray,
  getBlogs,
  getBlogsByCategory,
} from "../../redux/actions/blogs.action";
import AppContext from "../../context/AppContext";

import { ClipLoader } from "react-spinners";
// import AppContext from "../context/AppContext";

export default function BlogPage() {
  let { blogs, filteredBlogs, loading } = useSelector((state) => state.blogs);
  let { blogsByCategory } = useSelector((state) => state.blogsByCategory);

  let [showMore, setShowMore] = useState(10);
  const dispatch = useDispatch();
  let [selectedCategory, setSelectedCategory] = useState("");
  let [btnActive, setBtnActive] = useState(false);

  //   let contextData = useContext(AppContext);

  let interests = [
    "All Blogs",
    "Children",
    "Drama",
    "Romance",
    "Documentary",
    "Comedy",
    "Food",
    "Travel",
    "Web Development",
    "Sports",
    "Yoga",
    "Art",
    "Politics",
    "Movies",
    "Swimming",
  ];
  let contextData = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => {
      getBlogs(dispatch);
      // get("blogs").then((response) => {
      //   console.log(response);
      // });
      localStorage.setItem("IsAuthenticated", false);
      contextData.setIsAuthenticated(false);
      console.log(blogs.length);
    }, 1000);
  }, []);

  const handleShowMore = () => {
    console.log(showMore);
    setShowMore(showMore + 10);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
    setBtnActive(true);
    // dispatch(getBlogsByCategory(event.target.value));
    console.log(blogsByCategory);
  };

  return (
    <div className="w-full mx-auto text-black ">
      <div className="post-top mx-20 px-10 sm:mx:2 sm:px-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
          />
        </svg>
        <span className="uppercase">Trending on M..</span>
        <div className="rec-post-wrapper">
          <div className="rec-post-container">
            {/* <div className="rec-posts">
                <div className="rec-post-left"></div>
              </div> */}
          </div>
        </div>
      </div>
      <div className="w-full ml-20 px-10 mt-4 py-2">
        {selectedCategory ? (
          <div className="border py-2 w-fit px-2 bg-gray-200 shadow-sm">
            {selectedCategory}
          </div>
        ) : (
          <div className="border py-2 w-fit px-2 bg-gray-200 shadow-sm">
            All Blogs
          </div>
        )}
      </div>
      <div className="flex">
        <div className=" px-20">
          {loading ? (
            <div className="w-full flex justify-center items-center align-middle h-full">
              <ClipLoader
                color={"#D00B12"}
                loading={loading}
                size={100}
                className=""
              />
            </div>
          ) : (
            <div>
              {selectedCategory ? (
                blogsByCategory ? (
                  blogsByCategory.slice(0, showMore).map((blog) => {
                    return <BlogCard key={blog.id} blog={blog} />;
                  })
                ) : (
                  <p className="text-xl mt-10">No Blogs available</p>
                )
              ) : (
                blogs.slice(0, showMore).map((blog) => {
                  return <BlogCard key={blog.id} blog={blog} />;
                })
              )}
            </div>
          )}

          <div className="text-center pb-20">
            {blogsByCategory.length >>> showMore ||
            blogs.length >>> showMore ? (
              <button
                className="text-xl text-gray-600 underline underline-offset-4"
                onClick={handleShowMore}
              >
                Show More....{" "}
              </button>
            ) : (
              <p className="hidden">List Completed</p>
            )}
          </div>
        </div>

        {/* <div className="w-1/4 mt-2 py-10 pl-10">
          <h3 className="uppercase font-bold text-sm">
            Discover more of what happens to you
          </h3>
          <div className="mt-2 text-gray-600">
            {interests.map((interest, index) => {
              return (
                <button
                  key={index}
                  className="border my-1 mr-2 p-2 text-sm"
                  value={interest}
                  onClick={handleClick}
                  style={{ btnActive: "true" ? "bg-gray-400" : "bg-white" }}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div> */}
      </div>
    </div>
  );
}
