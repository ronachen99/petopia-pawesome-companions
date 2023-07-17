import React from "react";

// simple header that will be imported to the app componenet
const Header = () => {
  return (
    <header className="py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-full">
          <h1 className="text-white text-3xl font-bold uppercase">Petopia</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
