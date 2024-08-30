import React from "react";

const HomeButton = () => {
  return (
    <Link
      to="/"
      className="fixed bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600"
    >
      Home
    </Link>
  );
};

export default HomeButton;
