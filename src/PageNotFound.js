import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div>
      <h2 className="text-xl text-center">Page Not Found</h2>
      <Link to={"/blogs"}>
        <p className="text-blue-700 underline-offset-1">Go to Home Page?</p>
      </Link>
    </div>
  );
}
