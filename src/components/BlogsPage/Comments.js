import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../firebase-config";
import {
  getCommentsById,
  postComment,
  updateUpvotes,
} from "../../redux/actions/blogs.action";

export default function Comments({ allComments }) {
  let { id } = useParams();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [upvotes, setUpvotes] = useState(10);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const options = { month: "short", day: "numeric" };

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
  async function likeComments(id) {
    dispatch(
      updateUpvotes(id, {
        upvotes: allComments?.comment?.upvotes + 1,
      })
    );
  }
  useEffect(() => {
    setUpvotes(allComments?.comment?.upvotes);
  }, [upvotes]);

  const handleComment = async () => {
    if (value !== "") {
      let response = await dispatch(
        postComment({
          body: value,
          upvotes: 0,
          userId: auth.currentUser.uid,
          username: auth.currentUser.displayName,
          date: new Date(),
          postId: id,
        })
      );
      console.log(response);
      navigate(`/blogs/${id}`);
      setValue("");
      dispatch(getCommentsById(id));
    } else {
      setError(true);
    }
  };

  return (
    <div className="bg-white p-4">
      {auth.currentUser ? (
        <form>
          <div>
            <input
              type="textarea"
              placeholder="Add Comment"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(false);
              }}
              className="border w-full p-2 my-2 focus:outline-none"
            />
          </div>
          <div>
            {error ? <p className="text-sm text-red-600">Enter Comment</p> : ""}
          </div>
          <div>
            <button
              type="button"
              onClick={handleComment}
              className="px-4 py-2 bg-green-600 text-white rounded-full"
              onKeyDown={handleComment}
            >
              Post Comment
            </button>
          </div>
        </form>
      ) : (
        <span>
          <p>Login to Comment</p>
        </span>
      )}
      <div className="p-2 my-4">
        <div className="my-4 italic border-b-2">Comments</div>
        <div>
          {allComments?.map((comment) => {
            return (
              <div
                className="flex flex-col gap-1 my-6 border-b last:border-none p-2"
                key={comment.id}
              >
                <div className="text-sm text-gray-700 flex gap-4 italic">
                  <h3 className="">{comment.username}</h3>
                  <h4 className="">{getTime(new Date(comment.date))}</h4>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p>{comment.body}</p>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <div>{comment.upvotes}</div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => {
                          likeComments(comment.id);
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </div> */}
                  {/* </div> */}
                </div>
                {/* <div>
                  {comment.username === auth.currentUser.displayName ? (
                    <button className="delete-comment py-1 bg-red-400 text-sm px-3 rounded-md">
                      Delete Comment
                    </button>
                  ) : (
                    ""
                  )}
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
