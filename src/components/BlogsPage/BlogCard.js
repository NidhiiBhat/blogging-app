import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
// import { get } from "../../ApiCalls";
import AppContext from "../../context/AppContext";
import { auth } from "../../firebase-config";
import { getBlogs } from "../../redux/actions/blogs.action";
import AuthModal from "../modal/AuthModal";

export default function BlogCard({ blog }) {
  // let { id } = useParams();
  let contextData = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const options = { month: "short", day: "numeric" };
  let { blogs, loading } = useSelector((state) => state.blogs);
  let dispatch = useDispatch();

  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleOk = () => {
    setIsOpen(false);
  };
  const showModal = () => {
    setIsOpen(true);
  };
  const updateLikes = async (id) => {
    let data, error;
    try {
      const response = fetch(`http://localhost:/3000/blogs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          claps: blog.claps + 1,
        }),
      });
      data = await response.json();
      console.log("Likes: (patch)", data);
    } catch (e) {
      error = e;
    }
  };
  function countWords(str) {
    return str?.trim().split(/\s+/).length;
  }
  const wpm = 225;

  function getTime(d) {
    var hr = d.getHours();
    var min = d.getMinutes();
    if (min < 10) {
      min = "0" + min;
    }
    var ampm = "am";
    if (hr > 12) {
      hr -= 12;
      ampm = "pm";
    }
    return hr + ":" + min + ampm;
  }

  useEffect(() => {
    // getBlogs(dispatch);
  }, []);

  return (
    <div className="border-b-2 my-6 py-6 px-10">
      {" "}
      <div className="flex justify-between">
        <div className="w-full">
          <div className="flex items-center gap-2 w-full">
            <div className="flex items-center gap-2">
              <img
                type="file"
                src={blog.authorImage}
                className="w-10 rounded-full"
                alt="avatar"
              />
              <h2 className="text-md">{blog.author}</h2>
            </div>
            <div className="">
              <p className="text-gray-600  text-sm">
                {new Date(blog.timestamp).toLocaleDateString(
                  undefined,
                  options
                )}
              </p>
            </div>
          </div>
          {contextData.isAuthenticated ? (
            <Link to={`${blog.id}`}>
              {" "}
              <div className="whitespace-normal">
                <h2 className="text-xl font-bold mt-2">{blog.title}</h2>
              </div>{" "}
            </Link>
          ) : (
            <div
              className="whitespace-normal cursor-pointer"
              onClick={showModal}
            >
              <h2 className="text-xl font-bold mt-2">{blog.title}</h2>
            </div>
          )}

          <p className="text-gray-600 text-sm">{blog.subtitle}</p>
          <div className=" mt-4 flex align-middle items-center gap-4">
            <div className=" text-gray-600">
              <span className="text-sm border rounded-full p-1 px-2 bg-gray-200">
                {blog.category}
              </span>
            </div>
            <div>
              <p className="italic text-gray-700 text-sm">
                {countWords(blog?.content) > "500"
                  ? Math.floor(countWords(blog?.content) / wpm) +
                    " " +
                    "min read"
                  : "2 min read"}
              </p>
            </div>
          </div>
        </div>

        <div className="ml-4">
          <img src={blog.image} className="w-32 h-24" alt={blog.title} />
        </div>
      </div>
      <AuthModal
        isOpen={isOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </div>
  );
}
