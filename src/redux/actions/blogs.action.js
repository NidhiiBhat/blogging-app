import { async } from "@firebase/util";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import {
  GET_BLOGS,
  BLOGS_SUCCESS,
  BLOGS_FAILURE,
  GET_BLOG,
  BLOG_SUCCESS,
  BLOG_FAILURE,
  GET_FILTERED_BLOGS,
  POST_BLOG,
  POST_BLOG_SUCCESS,
  POST_BLOG_FAILURE,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAILURE,
  GET_SEARCH_BLOGS,
  SEARCH_BLOGS_SUCCESS,
  SEARCH_BLOGS_FAILURE,
  EDIT_POST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
  GET_CATEGORY_BLOGS_FAILURE,
  GET_CATEGORY_BLOGS,
  GET_CATEGORY_BLOGS_SUCCESS,
} from "../action.type";
import { baseUrl } from "../../ApiCalls";

const postdata = () => `${baseUrl}/blogs`;
const blogById = (id) => `${baseUrl}/blogs/${id}`;
const getComments = (id) =>
  `${baseUrl}/comments?postId=${id}&_sort=date&_order=desc`;

const comments = (id) => `${baseUrl}/comments/${id}`;
const searchBlog = (input) => `${baseUrl}/blogs?title=${input}}`;

const blogsByCategory = (categoryName) =>
  `${baseUrl}/blogs?category=${categoryName}&_sort=timestamp&_order=desc`;

export const getBlogs = async (dispatch) => {
  dispatch({
    type: GET_BLOGS,
  });
  try {
    let response = await fetch(`${baseUrl}/blogs?_sort=timestamp&_order=desc`);
    let data = await response.json();
    dispatch({
      type: BLOGS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: BLOGS_FAILURE,
      payload: e.message,
    });
    console.log(e);
  }
};

export const filteredArray = async (dispatch, data) => {
  dispatch({
    type: GET_FILTERED_BLOGS,
    payload: data,
    loading: false,
  });
};

export const getBlog = (id) => async (dispatch) => {
  dispatch({
    type: GET_BLOG,
  });
  try {
    let response = await fetch(blogById(id));
    let data = await response.json();
    dispatch({
      type: BLOG_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: BLOG_FAILURE,
      payload: e.message,
    });
    console.log(e);
  }
};

export const getBlogsByCategory = (categoryName) => async (dispatch) => {
  dispatch({ type: GET_CATEGORY_BLOGS });
  try {
    let response = await fetch(blogsByCategory(categoryName));
    let data = await response.json();
    dispatch({
      type: GET_CATEGORY_BLOGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_CATEGORY_BLOGS_FAILURE,
      payload: error.message,
    });
  }
};

export const postBlog = (values) => async (dispatch) => {
  try {
    let req = await fetch(postdata(values), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    let data = await req.json();
    dispatch({
      type: POST_BLOG_SUCCESS,
      payload: data,
    });
    return "success";
    console.log(data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_BLOG_FAILURE,
      payload: error.message,
    });
    return "Fail";
  }
};

export const postEditedBlog = (id, values) => async (dispatch) => {
  try {
    let response = await fetch(blogById(id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const editBlogById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_POST_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: EDIT_POST_FAILURE,
      payload: error.message,
    });
    console.log(error);
  }
};

export const searchInputBlog = (input) => async (dispatch) => {
  dispatch({
    type: GET_SEARCH_BLOGS,
  });
  try {
    let response = await fetch(searchBlog(input));
    let data = await response.json();
    dispatch({
      type: SEARCH_BLOGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_BLOGS_FAILURE,
      payload: error.message,
    });
    console.log(error);
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    let response = await fetch(blogById(id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    let data = await response.json();
    return "Success";
  } catch (error) {
    console.log(error);
    return "Failure";
  }
};

export const updateClap = (id, values) => async (dispatch) => {
  try {
    let response = await fetch(blogById(id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return "Update Likes failure";
  }
};

export const getCommentsById = (id) => async (dispatch) => {
  try {
    let response = await fetch(getComments(id));
    let data = await response.json();
    dispatch({
      type: GET_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_COMMENT_FAILURE,
      payload: error.message,
    });
  }
};

export const postComment = (handleComment) => async (dispatch) => {
  try {
    let response = await fetch(getComments(), {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(handleComment),
    });
    let data = await response.json();
    console.log(data);
    return "Comment posted successfully";
  } catch (error) {
    console.log(error);
    return "Error in posting comment";
  }
};
export const updateUpvotes = (id, values) => async (dispatch) => {
  try {
    let response = await fetch(comments(id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return "Update Likes failure";
  }
};
