import React from "react";
import ReactDOM from "react-dom/client";
// import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import App from "./App";

import "./index.css";
import "antd/dist/reset.css";
import { BrowserRouter } from "react-router-dom";
import AppState from "./context/AppState";

// const container = document.getElementById("root");
// const root = createRoot(container);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppState>
        <App />
      </AppState>
    </BrowserRouter>
  </Provider>
);
