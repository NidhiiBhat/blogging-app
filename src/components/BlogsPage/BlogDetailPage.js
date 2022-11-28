import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../modal/DeleteModal";
import { slice } from "lodash";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

import {
  getBlog,
  getCommentsById,
  updateClap,
} from "../../redux/actions/blogs.action";

import AppContext from "../../context/AppContext";
import { deletePost } from "../../ApiCalls";
import { auth } from "../../firebase-config";
import BaseModal from "../modal/DeleteModal";
import DeleteModal from "./DeleteModalPage";
import Comments from "./Comments";

export default function BlogDetailPage() {
  let { id } = useParams();
  let contextData = useContext(AppContext);
  let { blogs, loading } = useSelector((state) => state.blogs);
  let { blog } = useSelector((state) => state.blog);
  const [isOpen, setIsOpen] = useState(false);
  let [likes, setLikes] = useState(0);
  let { commentsById } = useSelector((state) => state.commentsById);

  let [showMore, setShowMore] = useState(10);

  const allComments = commentsById;
  // let [likes, setLikes] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleOk = () => {
    setIsOpen(false);
  };
  const showModal = () => {
    setIsOpen(true);
  };
  function countWords(str) {
    return str?.trim().split(/\s+/).length;
  }

  const wpm = 225;

  async function updateLikes(id) {
    // setLikes(likes + 1);
    setLikes(likes + 1);
  }
  useEffect(() => {
    dispatch(
      updateClap(id, {
        claps: blog.claps + 1,
      })
    );
  }, [blog.claps, likes]);

  // useEffect(() => {
  //   setLikes(blog.claps);
  // }, [likes]);

  useEffect(() => {
    // setTimeout(() => {
    //   dispatch(getBlog(id));
    //   dispatch(getCommentsById(id));
    //   console.log(blog);
    // }, 1000);
    dispatch(getBlog(id));
    dispatch(getCommentsById(id));
    console.log(blog);
    setLikes(blog.claps);

    window.scroll(0, 0);
  }, []);

  return (
    <div className="w-full mx-auto mt-20 font-sans pl-60 py-5 flex gap-2">
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
        <div className="w-4/5">
          <div className="flex gap-40 items-center">
            <div className="flex gap-2 items-center">
              <div>
                <img
                  src={blog.authorImage}
                  alt={blog.author}
                  className="w-20 rounded-full"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold">{blog.author}</h3>
                <p className="text-sm">
                  {new Date(blog.timestamp).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="italic text-gray-700 text-sm">
                  {countWords(blog?.content) > "500"
                    ? Math.floor(countWords(blog?.content) / wpm) +
                      " " +
                      "min read"
                    : "2 min read"}
                </p>
              </div>
              <div></div>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold tracking-wide">{blog.title}</h1>
          </div>
          {/* <div className="mt-4">
          {blog.image ? (
            <img src={blog.image} alt={blog.title} className="w-2/3 h-96" />
          ) : (
            ""
          )}
        </div> */}
          <div className="w-3/4 mt-4">
            <p
              className="text-xl font-serif tracking-wider leading-10"
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            ></p>
          </div>
          <div className="my-6 flex justify-between w-full p-2">
            <div className="flex gap-20">
              {blog.authorId !== auth.currentUser?.uid ? (
                <span className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mb-10 cursor-pointer"
                    onClick={updateLikes}
                  >
                    <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                  </svg>
                  {likes}
                </span>
              ) : (
                <span className="hidden">"You cannot like your own blogs</span>
              )}
              <span className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 cursor-pointer"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {allComments?.length}
              </span>
            </div>
            {/* <div>
              <span className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 cursor-pointer"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div> */}
          </div>
          <div className="flex gap-10">
            <Link to={"/new-story/edit"}>
              <div>
                {blog.authorId === auth.currentUser?.uid ? (
                  <button className="bg-blue-600 text-white py-2 px-4 rounded-md">
                    Edit Blog
                  </button>
                ) : (
                  ""
                )}
              </div>
            </Link>
            <div>
              {auth.currentUser?.uid === blog.authorId ? (
                <button
                  type="button"
                  className="border p-2 rounded-md text-white bg-red-600 hover:-translate-y-1 focus:translate-y-1 hover:bg-red-700 shadow-md"
                  onClick={() => {
                    // handleDelete(blog);
                    showModal();
                  }}
                >
                  Delete Blog
                </button>
              ) : (
                <button className="hidden">Delete Post</button>
              )}
            </div>
          </div>
          <div className="comment-section mt-6">
            <Comments allComments={allComments} />
          </div>
        </div>
      )}

      <div className="w-1/5 h-fit flex justify-center">
        <div className="mt-20 text-center flex flex-col items-center fixed rounded-md p-10 shadow-xl">
          <div>
            <h2 className="text-xl font-bold underline">Author Details</h2>
          </div>
          <div className="flex mt-4">
            <img
              src={blog.authorImage}
              alt={blog.author}
              className="rounded-full w-28"
            />
          </div>
          <div className="mt-4">
            <h4>{blog.author}</h4>
          </div>
          <button className="bg-green-600 p-2 rounded-full mt-4 px-4">
            Follow
          </button>
        </div>
      </div>

      <BaseModal
        isOpen={isOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        modal={<DeleteModal />}
      />
    </div>
  );
}
