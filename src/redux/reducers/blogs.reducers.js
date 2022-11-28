import { stepButtonClasses } from "@mui/material";
import { initial } from "lodash";
import {
  GET_BLOGS,
  BLOGS_SUCCESS,
  BLOGS_FAILURE,
  GET_BLOG,
  BLOG_SUCCESS,
  BLOG_FAILURE,
  GET_FILTERED_BLOGS,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAILURE,
  SEARCH_BLOGS_SUCCESS,
  SEARCH_BLOGS_FAILURE,
  GET_SEARCH_BLOGS,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
  GET_CATEGORY_BLOGS_SUCCESS,
  GET_CATEGORY_BLOGS_FAILURE,
  GET_CATEGORY_BLOGS,
} from "../action.type";

const initialState = {
  blogs: [],
  blog: {},
  editBlogId: "",
  blogsByCategory: [],
  filteredBlogs: [],
  loading: true,
  error: false,
  errorMessage: "",
  commentsById: [],
  blogsBySearch: [],
};

export const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
        loading: true,
      };
    case BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: action.payload,
      };
    case BLOGS_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.payload,
      };
    case GET_FILTERED_BLOGS:
      return {
        ...state,
        filteredBlogs: action.payload,
        loading: false,
      };

    // case GET_BLOG:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // case BLOG_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     blog: action.payload,
    //   };
    // case BLOG_FAILURE:
    //   return {
    //     ...state,
    //     error: true,
    //     loading: false,
    //     errorMessage: action.payload,
    //   };
    default:
      return state;
  }
};

export const blogsBySearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_BLOGS:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        searchBlogsArray: action.payload,
      };
    case SEARCH_BLOGS_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const blogsByCategoryReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_CATEGORY_BLOGS:
      return {
        ...state,
        loading: true,
      };
    case GET_CATEGORY_BLOGS_SUCCESS:
      return {
        ...state,
        blogsByCategory: action.payload,
        loading: false,
      };
    case GET_CATEGORY_BLOGS_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
export const commentsByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        commentsById: action.payload,
        loading: false,
      };
    case GET_COMMENT_FAILURE: {
      return {
        ...stepButtonClasses,
        error: true,
        loading: false,
        errorMessage: action.payload,
      };
    }
    default:
      return state;
  }
};
export const blogsByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOG:
      return {
        ...state,
        loading: true,
      };
    case BLOG_SUCCESS:
      return {
        ...state,
        blog: action.payload,
        loading: false,
      };
    case BLOGS_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const editBlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        editPostId: action.payload,
        loading: false,
      };
    case EDIT_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
