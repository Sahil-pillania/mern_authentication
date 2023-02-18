import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1 className="back_image">404</h1>
        </div>
        <h2 className="h2">We are sorry, page not found!</h2>
        <p className="mb-5 error-desc">
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <NavLink to="/" className="toHomePage">
          Back to Homepage
        </NavLink>
      </div>
    </div>
  );
};

export default Error;
