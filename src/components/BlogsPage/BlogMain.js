import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../BlogsPage/BlogCard";
import {
  filteredArray,
  getBlogs,
  searchInputBlog,
  getBlogsByCategory,
} from "../../redux/actions/blogs.action";
import { ClipLoader } from "react-spinners";
import AppContext from "../../context/AppContext";
import { toast, ToastContainer } from "react-toastify";
// import CategoryHeader from "./CategoryHeader";
// import AppContext from "../context/AppContext";

export default function BlogMain() {
  let { blogs, filteredBlogs, loading } = useSelector((state) => state.blogs);

  let { blogsByCategory } = useSelector((state) => state.blogsByCategory);
  let { blogsBySearch } = useSelector((state) => state.blogsBySearch);
  let contextData = useContext(AppContext);

  // let { blogsByCategory } = useSelector((state) => state.blogsByCategory);

  let [showMore, setShowMore] = useState(10);
  const dispatch = useDispatch();
  let [selectedCategory, setSelectedCategory] = useState("");
  let [btnActive, setBtnActive] = useState(false);
  let [searchBlog, setSearchBlog] = useState("");

  //   let contextData = useContext(AppContext);

  let interests = [
    "Children",
    "Drama",
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
    "Health",
  ];

  useEffect(() => {
    setTimeout(() => {
      getBlogs(dispatch);
      console.log(blogs);
      console.log(blogs.length);
    }, 1000);
    localStorage.setItem("IsAuthenticated", true);
    contextData.setIsAuthenticated(true);
    // setFilteredBlogs(blogs);
   
  }, []);

  const handleShowMore = () => {
    console.log(showMore);
    setShowMore(showMore + 10);
  };

  const handleClick = async (event) => {
    dispatch(getBlogsByCategory(event.target.value));
    setSelectedCategory(event.target.value);
    setBtnActive(true);
  };

  // useEffect(() => {
  //   dispatch(getBlogsByCategory(selectedCategory));
  //   console.log(selectedCategory);
  //   console.log(blogsByCategory);
  // }, [selectedCategory]);

  const handleSearch = (event) => {
    setSearchBlog(event.target.value);
    dispatch(searchInputBlog(searchBlog));
  };

  return (
    <div className="w-3/4 mx-auto text-black ">
      <ToastContainer />
      <div className="w-3/4 ml-20 px-10 mt-2 py-2">
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
      {/* <div>
        <CategoryHeader />
      </div> */}
      <div className="flex">
        <div className="w-3/4 pl-20">
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
              {selectedCategory
                ? // blogsByCategory === [] ?
                  blogsByCategory?.slice(0, showMore).map((blog) => {
                    return <BlogCard key={blog.id} blog={blog} />;
                  })
                : //  : (
                //   <p className="text-2xl mt-10 text-center">
                //     No Blogs available
                //   </p>
                // )
                searchBlog
                ? blogsBySearch.slice(0, showMore).map((blog) => {
                    return <BlogCard key={blog.id} blog={blog} />;
                  })
                : blogs.slice(0, showMore).map((blog) => {
                    return <BlogCard key={blog.id} blog={blog} />;
                  })}
            </div>
          )}

          <div className="text-center pb-20">
            {blogsByCategory?.length >>> showMore ||
            blogs?.length >>> showMore ? (
              <button
                className="text-gray-600 underline underline-offset-4"
                onClick={handleShowMore}
              >
                Show More....{" "}
              </button>
            ) : (
              <p className="hidden">List Completed</p>
            )}
          </div>
        </div>

        <div className="w-1/4 pl-10">
          {/* <div>
            <input
              type="text"
              className="py-2 px-4 rounded-full"
              placeholder="Search.."
              onChange={handleSearch}
            />
          </div> */}
          <h3 className="uppercase font-bold text-sm mt-4">
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
        </div>
      </div>
    </div>
  );
}
