import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  blogsReducer,
  commentsByIdReducer,
  editBlogReducer,
  blogsByIdReducer,
  blogsByCategoryReducer,
  blogsBySearchReducer,
} from "./reducers/blogs.reducers";

const rootReducer = combineReducers({
  blogs: blogsReducer,
  commentsById: commentsByIdReducer,
  editBlogId: editBlogReducer,
  blog: blogsByIdReducer,
  blogsByCategory: blogsByCategoryReducer,
  blogsBySearch: blogsBySearchReducer,
});
const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
