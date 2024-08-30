import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="h-auto py-3 px-4 flex flex-row items-center justify-between">
      {" "}
      <div>
        <Link
          to="/"
          className=" bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600"
        >
          Home
        </Link>
      </div>
      <div className="text-2xl">Alemeno</div>
      <div>
        <Link
          to="/dashboard"
          className=" bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
