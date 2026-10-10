import React from "react";

import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>This page does not exist</p>

      <Link to="/">Go Back</Link>
    </div>
  );
};

export default NotFoundPage;
