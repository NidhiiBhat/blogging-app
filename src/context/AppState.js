import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";

export default function AppState(props) {
  let [userName, setUserName] = useState("");
  let [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AppContext.Provider
      value={{ userName, setUserName, isAuthenticated, setIsAuthenticated }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
